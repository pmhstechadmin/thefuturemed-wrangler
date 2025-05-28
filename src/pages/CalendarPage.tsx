
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CalendarDays, Users, Clock, User, UserPlus, ArrowLeft } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import type { User as AuthUser } from '@supabase/supabase-js';

interface Seminar {
  id: string;
  host_name: string;
  topic: string;
  description: string;
  date: string;
  time: string;
  host_id: string;
}

const CalendarPage = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [seminars, setSeminars] = useState<Seminar[]>([]);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<AuthUser | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    checkUser();
    if (selectedDate) {
      fetchSeminarsForDate(selectedDate);
    }
  }, [selectedDate]);

  const checkUser = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user || null);
    } catch (error) {
      console.error('Error checking user:', error);
    }
  };

  const fetchSeminarsForDate = async (date: Date) => {
    setLoading(true);
    try {
      const dateString = date.toISOString().split('T')[0];
      
      const { data, error } = await supabase
        .from('seminars')
        .select('*')
        .eq('date', dateString)
        .order('time', { ascending: true });

      if (error) throw error;
      setSeminars(data || []);
    } catch (error) {
      console.error('Error fetching seminars:', error);
      toast({
        title: "Error",
        description: "Failed to fetch seminars for the selected date.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleHostSeminar = () => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to host a seminar.",
        variant: "destructive",
      });
      return;
    }
    navigate('/host-seminar');
  };

  const handleRegister = () => {
    navigate('/register');
  };

  const handleSeminarClick = (seminar: Seminar) => {
    console.log('Seminar clicked:', seminar.id);
    const seminarUrl = `${window.location.origin}/seminar/${seminar.id}`;
    console.log('Opening URL:', seminarUrl);
    
    const newWindow = window.open(seminarUrl, '_blank', 'width=1200,height=800,scrollbars=yes,resizable=yes');
    
    if (!newWindow) {
      toast({
        title: "Popup Blocked",
        description: "Please allow popups for this site to view seminar details.",
        variant: "destructive",
      });
      navigate(`/seminar/${seminar.id}`);
    }
  };

  const formatTime = (time: string) => {
    return new Date(`1970-01-01T${time}`).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-4 mb-4">
            <Button 
              variant="outline" 
              onClick={() => navigate('/e-seminar')}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to E-Seminar
            </Button>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Seminar Calendar</h1>
          <p className="text-xl text-gray-600 mb-6">Browse and join medical seminars</p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={handleHostSeminar}
              className="bg-blue-600 hover:bg-blue-700 px-8 py-3 text-lg"
            >
              <Users className="mr-2 h-5 w-5" />
              Host a Seminar
            </Button>
            {!user && (
              <Button 
                onClick={handleRegister}
                variant="outline" 
                className="border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-3 text-lg"
              >
                <UserPlus className="mr-2 h-5 w-5" />
                Register
              </Button>
            )}
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Calendar Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CalendarDays className="h-5 w-5" />
                Select Date
              </CardTitle>
              <CardDescription>
                Choose a date to view available seminars
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                className="rounded-md border"
              />
            </CardContent>
          </Card>

          {/* Seminars for Selected Date */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Seminars on {selectedDate?.toLocaleDateString()}
              </CardTitle>
              <CardDescription>
                {seminars.length} seminar(s) scheduled for this date
              </CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                  <p className="mt-2 text-gray-600">Loading seminars...</p>
                </div>
              ) : seminars.length === 0 ? (
                <div className="text-center py-8">
                  <CalendarDays className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">No seminars scheduled for this date</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {seminars.map((seminar) => (
                    <Card 
                      key={seminar.id} 
                      className="cursor-pointer hover:shadow-md transition-shadow border-2 hover:border-blue-300"
                      onClick={() => handleSeminarClick(seminar)}
                    >
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-semibold text-lg text-blue-700 hover:text-blue-800">
                            {seminar.topic}
                          </h3>
                          <Badge variant="secondary">
                            {formatTime(seminar.time)}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600 mb-2">
                          <User className="h-4 w-4" />
                          <span>Hosted by {seminar.host_name}</span>
                        </div>
                        {seminar.description && (
                          <p className="text-gray-600 text-sm">{seminar.description}</p>
                        )}
                        <div className="mt-2 text-xs text-blue-600">
                          Click to view details and register
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CalendarPage;
