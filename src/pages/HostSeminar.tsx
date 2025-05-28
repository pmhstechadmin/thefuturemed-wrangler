
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, Plus, Trash2, ArrowLeft } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

interface Speaker {
  name: string;
  qualification: string;
  department: string;
}

const HostSeminar = () => {
  const [hostName, setHostName] = useState('');
  const [topic, setTopic] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState<Date>();
  const [time, setTime] = useState('');
  const [speakers, setSpeakers] = useState<Speaker[]>([
    { name: '', qualification: '', department: '' }
  ]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const addSpeaker = () => {
    setSpeakers([...speakers, { name: '', qualification: '', department: '' }]);
  };

  const removeSpeaker = (index: number) => {
    if (speakers.length > 1) {
      setSpeakers(speakers.filter((_, i) => i !== index));
    }
  };

  const updateSpeaker = (index: number, field: keyof Speaker, value: string) => {
    const updatedSpeakers = [...speakers];
    updatedSpeakers[index][field] = value;
    setSpeakers(updatedSpeakers);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!date || !time || !hostName || !topic) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    // Validate speakers
    const validSpeakers = speakers.filter(speaker => 
      speaker.name && speaker.qualification && speaker.department
    );

    if (validSpeakers.length === 0) {
      toast({
        title: "Error",
        description: "Please add at least one speaker with complete details.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session?.user) {
        toast({
          title: "Error",
          description: "You must be logged in to host a seminar.",
          variant: "destructive",
        });
        return;
      }

      // Insert seminar
      const { data: seminarData, error: seminarError } = await supabase
        .from('seminars')
        .insert({
          host_id: session.user.id,
          host_name: hostName,
          topic,
          description,
          date: format(date, 'yyyy-MM-dd'),
          time
        })
        .select()
        .single();

      if (seminarError) throw seminarError;

      // Insert speakers
      const speakersToInsert = validSpeakers.map(speaker => ({
        seminar_id: seminarData.id,
        name: speaker.name,
        qualification: speaker.qualification,
        department: speaker.department
      }));

      const { error: speakersError } = await supabase
        .from('speakers')
        .insert(speakersToInsert);

      if (speakersError) throw speakersError;

      toast({
        title: "Success",
        description: "Seminar created successfully!",
      });

      // Reset form
      setHostName('');
      setTopic('');
      setDescription('');
      setDate(undefined);
      setTime('');
      setSpeakers([{ name: '', qualification: '', department: '' }]);

      // Navigate back to e-seminar page
      navigate('/e-seminar');

    } catch (error) {
      console.error('Error creating seminar:', error);
      toast({
        title: "Error",
        description: "Failed to create seminar. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="outline"
            onClick={() => navigate('/e-seminar')}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to E-Seminar
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Host a Seminar</h1>
            <p className="text-gray-600">Create and schedule your medical seminar</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle>Seminar Details</CardTitle>
              <CardDescription>
                Provide basic information about your seminar
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="hostName">Host Name *</Label>
                  <Input
                    id="hostName"
                    value={hostName}
                    onChange={(e) => setHostName(e.target.value)}
                    placeholder="Enter your name"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="topic">Seminar Topic *</Label>
                  <Input
                    id="topic"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    placeholder="Enter seminar topic"
                    required
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Provide a brief description of the seminar"
                  rows={3}
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label>Date *</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !date && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div>
                  <Label htmlFor="time">Time *</Label>
                  <Input
                    id="time"
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    required
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Speakers Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Speaker Details
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addSpeaker}
                  className="flex items-center gap-2"
                >
                  <Plus className="h-4 w-4" />
                  Add Speaker
                </Button>
              </CardTitle>
              <CardDescription>
                Add information about the speakers for this seminar
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {speakers.map((speaker, index) => (
                <div key={index} className="border rounded-lg p-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">Speaker {index + 1}</h4>
                    {speakers.length > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => removeSpeaker(index)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                  
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor={`speaker-name-${index}`}>Name</Label>
                      <Input
                        id={`speaker-name-${index}`}
                        value={speaker.name}
                        onChange={(e) => updateSpeaker(index, 'name', e.target.value)}
                        placeholder="Speaker name"
                      />
                    </div>
                    <div>
                      <Label htmlFor={`speaker-qualification-${index}`}>Qualification</Label>
                      <Input
                        id={`speaker-qualification-${index}`}
                        value={speaker.qualification}
                        onChange={(e) => updateSpeaker(index, 'qualification', e.target.value)}
                        placeholder="e.g., MD, PhD"
                      />
                    </div>
                    <div>
                      <Label htmlFor={`speaker-department-${index}`}>Department</Label>
                      <Input
                        id={`speaker-department-${index}`}
                        value={speaker.department}
                        onChange={(e) => updateSpeaker(index, 'department', e.target.value)}
                        placeholder="e.g., Cardiology"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Submit Button */}
          <div className="flex justify-end">
            <Button 
              type="submit" 
              className="bg-blue-600 hover:bg-blue-700 px-8"
              disabled={loading}
            >
              {loading ? "Creating Seminar..." : "Create Seminar"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default HostSeminar;
