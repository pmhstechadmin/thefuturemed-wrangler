
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { MapPin, Mail, Phone, Clock, Award, Search, Lock } from "lucide-react";

interface JobSeekerProfile {
  id: string;
  qualification: string;
  specialization: string;
  experience_years: number;
  previous_experience: string;
  email: string;
  phone: string;
  location: string;
  availability: string;
  skills: string[];
  bio: string;
  created_at: string;
  updated_at: string;
  user_id: string;
  profiles?: {
    first_name: string;
    last_name: string;
  } | null;
}

export const EnhancedJobSeekerProfiles = () => {
  const [profiles, setProfiles] = useState<JobSeekerProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasSubscription, setHasSubscription] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    fetchProfiles();
    checkSubscription();
  }, []);

  const checkSubscription = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase.rpc('has_active_subscription', {
        user_uuid: user.id
      });

      if (error) throw error;
      setHasSubscription(data);
    } catch (error) {
      console.error('Error checking subscription:', error);
    }
  };

  const fetchProfiles = async () => {
    try {
      const { data, error } = await supabase
        .from('job_seekers')
        .select(`
          *,
          profiles:user_id (
            first_name,
            last_name
          )
        `);

      if (error) throw error;
      
      // Filter and properly type the profiles
      const validProfiles = (data || []).filter((profile: any) => {
        return profile.profiles && 
               typeof profile.profiles === 'object' && 
               !Array.isArray(profile.profiles) &&
               'first_name' in profile.profiles &&
               'last_name' in profile.profiles;
      }) as JobSeekerProfile[];
      
      setProfiles(validProfiles);
    } catch (error) {
      console.error('Error fetching profiles:', error);
      toast({
        title: "Error",
        description: "Failed to load job seeker profiles.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const filteredProfiles = profiles.filter(profile =>
    profile.qualification?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    profile.specialization?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    profile.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    profile.profiles?.first_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    profile.profiles?.last_name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const maskContactInfo = (info: string) => {
    if (!hasSubscription) {
      return "••••••••••";
    }
    return info;
  };

  if (loading) {
    return <div className="text-center py-8">Loading profiles...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search by qualification, specialization, or location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        {!hasSubscription && (
          <Badge variant="outline" className="text-amber-600 border-amber-600">
            <Lock className="h-3 w-3 mr-1" />
            Subscription Required for Contact Details
          </Badge>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProfiles.map((profile) => (
          <Card key={profile.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5 text-blue-600" />
                {profile.profiles?.first_name} {profile.profiles?.last_name}
              </CardTitle>
              <CardDescription>{profile.qualification}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">{profile.specialization}</Badge>
                  <Badge variant="outline">{profile.experience_years} years exp</Badge>
                </div>
                
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <MapPin className="h-4 w-4" />
                  {profile.location || "Location not specified"}
                </div>
                
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Clock className="h-4 w-4" />
                  {profile.availability || "Availability not specified"}
                </div>
              </div>

              {profile.skills && profile.skills.length > 0 && (
                <div>
                  <p className="text-sm font-medium mb-2">Skills:</p>
                  <div className="flex flex-wrap gap-1">
                    {profile.skills.slice(0, 3).map((skill, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                    {profile.skills.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{profile.skills.length - 3} more
                      </Badge>
                    )}
                  </div>
                </div>
              )}

              <div className="space-y-2 pt-2 border-t">
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="h-4 w-4" />
                  <span className={hasSubscription ? "" : "blur-sm"}>
                    {maskContactInfo(profile.email)}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="h-4 w-4" />
                  <span className={hasSubscription ? "" : "blur-sm"}>
                    {maskContactInfo(profile.phone)}
                  </span>
                </div>
              </div>

              {!hasSubscription && (
                <Button className="w-full" variant="outline">
                  <Lock className="h-4 w-4 mr-2" />
                  Subscribe to View Contact Details
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredProfiles.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No job seeker profiles found matching your search.
        </div>
      )}
    </div>
  );
};
