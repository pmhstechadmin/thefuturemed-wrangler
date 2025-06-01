
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Search, MapPin, GraduationCap, Briefcase, User, Lock, Crown, Mail, Phone } from "lucide-react";

interface JobSeeker {
  id: string;
  qualification: string;
  specialization: string | null;
  experience_years: number | null;
  email: string;
  phone: string;
  location: string | null;
  availability: string | null;
  skills: string[] | null;
  bio: string | null;
  profiles?: {
    first_name: string | null;
    last_name: string | null;
  };
}

export const EnhancedJobSeekerProfiles = () => {
  const [jobSeekers, setJobSeekers] = useState<JobSeeker[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [hasSubscription, setHasSubscription] = useState(false);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    checkSubscriptionAndFetchProfiles();
  }, []);

  const checkSubscriptionAndFetchProfiles = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        setLoading(false);
        return;
      }

      // Check subscription status
      const { data: hasActiveSub } = await supabase.rpc('has_active_subscription', {
        user_uuid: user.id
      });
      
      setHasSubscription(hasActiveSub || false);

      // Fetch job seeker profiles
      const { data, error } = await supabase
        .from('job_seekers')
        .select(`
          *,
          profiles:user_id (
            first_name,
            last_name
          )
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setJobSeekers(data || []);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast({
        title: "Error",
        description: "Failed to load job seeker profiles",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const filteredSeekers = jobSeekers.filter(seeker => {
    const fullName = `${seeker.profiles?.first_name || ''} ${seeker.profiles?.last_name || ''}`.trim();
    const matchesSearch = 
      fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      seeker.qualification.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (seeker.specialization && seeker.specialization.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (seeker.skills && seeker.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase())));
    return matchesSearch;
  });

  const maskContactInfo = (info: string, type: 'email' | 'phone') => {
    if (hasSubscription) return info;
    
    if (type === 'email') {
      const [username, domain] = info.split('@');
      return `${username.substring(0, 2)}***@${domain}`;
    } else {
      return info.replace(/\d/g, '*');
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading job seeker profiles...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Subscription Notice */}
      {!hasSubscription && (
        <Card className="border-amber-200 bg-amber-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-amber-800">
              <Crown className="h-5 w-5" />
              Premium Access Required
            </CardTitle>
            <CardDescription className="text-amber-700">
              Subscribe to access full contact details and premium features for candidate recruitment.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="bg-amber-600 hover:bg-amber-700">
              Subscribe Now
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Search Section */}
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search by name, qualification, skills..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button className="w-full bg-blue-600 hover:bg-blue-700">
              <Search className="mr-2 h-4 w-4" />
              Search Candidates
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Results Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">
          {filteredSeekers.length} Candidate{filteredSeekers.length !== 1 ? 's' : ''} Found
        </h2>
        {hasSubscription && (
          <Badge className="bg-green-500">
            <Crown className="h-3 w-3 mr-1" />
            Premium Access
          </Badge>
        )}
      </div>

      {/* Candidate Profiles */}
      <div className="grid gap-6">
        {filteredSeekers.map((seeker) => (
          <Card key={seeker.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <CardTitle className="text-xl text-blue-600 flex items-center gap-2">
                    <User className="h-5 w-5" />
                    {seeker.profiles?.first_name && seeker.profiles?.last_name
                      ? `${seeker.profiles.first_name} ${seeker.profiles.last_name}`
                      : 'Professional Candidate'
                    }
                  </CardTitle>
                  <CardDescription className="text-lg font-medium text-gray-900">
                    {seeker.qualification}
                  </CardDescription>
                </div>
                <Button variant="outline" size="sm" disabled={!hasSubscription}>
                  {hasSubscription ? 'Contact Candidate' : 'Subscription Required'}
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Professional Details */}
                <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                  {seeker.specialization && (
                    <div className="flex items-center">
                      <GraduationCap className="mr-1 h-4 w-4" />
                      {seeker.specialization}
                    </div>
                  )}
                  {seeker.experience_years && (
                    <div className="flex items-center">
                      <Briefcase className="mr-1 h-4 w-4" />
                      {seeker.experience_years} years experience
                    </div>
                  )}
                  {seeker.location && (
                    <div className="flex items-center">
                      <MapPin className="mr-1 h-4 w-4" />
                      {seeker.location}
                    </div>
                  )}
                </div>

                {/* Contact Information */}
                <div className="space-y-2">
                  <h4 className="font-medium text-gray-900">Contact Information:</h4>
                  <div className="space-y-1">
                    <p className="text-sm text-gray-600 flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      {maskContactInfo(seeker.email, 'email')}
                      {!hasSubscription && <Lock className="h-3 w-3 text-amber-500" />}
                    </p>
                    <p className="text-sm text-gray-600 flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      {maskContactInfo(seeker.phone, 'phone')}
                      {!hasSubscription && <Lock className="h-3 w-3 text-amber-500" />}
                    </p>
                  </div>
                </div>

                {/* Skills */}
                {seeker.skills && seeker.skills.length > 0 && (
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Key Skills:</h4>
                    <div className="flex flex-wrap gap-2">
                      {seeker.skills.map((skill, index) => (
                        <Badge key={index} variant="secondary" className="bg-green-100 text-green-800">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Bio */}
                {seeker.bio && (
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">About:</h4>
                    <p className="text-sm text-gray-600">{seeker.bio}</p>
                  </div>
                )}

                {/* Availability */}
                {seeker.availability && (
                  <div className="bg-gray-50 p-3 rounded-md">
                    <span className="font-medium text-gray-900">Availability: </span>
                    <span className="text-gray-700">{seeker.availability}</span>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4">
                  <Button 
                    className="bg-blue-600 hover:bg-blue-700"
                    disabled={!hasSubscription}
                  >
                    {hasSubscription ? "Contact Now" : "Subscribe to Contact"}
                  </Button>
                  <Button variant="outline" disabled={!hasSubscription}>
                    Save Candidate
                  </Button>
                  <Button variant="ghost" size="sm">
                    View Full Profile
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredSeekers.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">No job seekers found matching your search criteria.</p>
        </div>
      )}
    </div>
  );
};
