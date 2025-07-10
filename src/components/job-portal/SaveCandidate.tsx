import React, { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { User, GraduationCap, Briefcase, MapPin, Lock } from "lucide-react";

const SaveCandidate = () => {
  const [savedProfiles, setSavedProfiles] = useState<any[]>([]);
  const hasSubscription = true; // Replace with actual logic if needed

  useEffect(() => {
    const fetchSavedCandidates = async () => {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) return;

      const { data: saved, error: savedError } = await supabase
        .from("save_profiles")
        .select("*")
        .eq("user_id", user.id);

      if (savedError || !saved) {
        console.error("Error fetching saved profiles:", savedError);
        return;
      }

      const validIds = saved
        .map((entry) => entry.job_seekers_id)
        .filter((id) => id && id !== "null" && id.length === 36);

      if (validIds.length === 0) return;

      const { data: profiles, error: profileError } = await supabase
        .from("job_seekers")
        .select("*")
        .in("id", validIds);

      if (profileError) {
        console.error("Error fetching job seekers:", profileError);
      } else {
        setSavedProfiles(profiles || []);
      }
    };

    fetchSavedCandidates();
  }, []);

  const handleSaveCandidate = async (jobSeekerId: string) => {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) return;

  // Delete the saved entry
  const { error: deleteError } = await supabase
    .from("save_profiles")
    .delete()
    .match({ user_id: user.id, job_seekers_id: jobSeekerId });

  if (deleteError) {
    console.error("Failed to unsave candidate:", deleteError);
    return;
  }

  // Update the local state to remove the unsaved profile
  setSavedProfiles((prev) =>
    prev.filter((seeker) => seeker.id !== jobSeekerId)
  );
};

  const setSelectedSeeker = (seeker: any) => {
    console.log("Viewing full profile:", seeker);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Saved Candidates</h2>
      {savedProfiles.length === 0 && <p>No candidates saved yet.</p>}
      <div className="grid gap-6">
        {savedProfiles.map((seeker) => (
          <Card key={seeker.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <CardTitle className="text-xl text-blue-600 flex items-center gap-2">
                    <User className="h-5 w-5" />
                    {seeker.name}
                  </CardTitle>
                  <CardDescription className="text-lg font-medium text-gray-900">
                    {seeker.qualification}
                  </CardDescription>
                </div>
                <a href={`tel:+91${seeker.phone}`}>
                  <Button variant="outline" size="sm">
                    Contact Candidate
                  </Button>
                </a>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                  <div className="flex items-center">
                    <GraduationCap className="mr-1 h-4 w-4" />
                    {seeker.highest_qualification}
                  </div>
                  <div className="flex items-center">
                    <Briefcase className="mr-1 h-4 w-4" />
                    {seeker.years_of_experience} years experience
                  </div>
                  <div className="flex items-center">
                    <MapPin className="mr-1 h-4 w-4" />
                    {seeker.current_location}
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium text-gray-900">Contact Information:</h4>
                  <div className="space-y-1">
                    <p className="text-sm text-gray-600">
                      Email: {hasSubscription ? seeker.email : "***@***.com"}
                      {!hasSubscription && <Lock className="inline h-3 w-3 ml-1 text-amber-500" />}
                    </p>
                    <p className="text-sm text-gray-600">
                      Phone: {hasSubscription ? seeker.phone : "+1 (***) ***-****"}
                      {!hasSubscription && <Lock className="inline h-3 w-3 ml-1 text-amber-500" />}
                    </p>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Key Skills:</h4>
                  <div className="flex flex-wrap gap-2">
                    {(seeker.skills || []).map((skill: string, index: number) => (
                      <Badge key={index} variant="secondary" className="bg-green-100 text-green-800">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="bg-gray-50 p-3 rounded-md">
                  <span className="font-medium text-gray-900">Availability: </span>
                  <span className="text-gray-700">{seeker.availability}</span>
                </div>

                <div className="flex gap-3 pt-4">
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    {hasSubscription ? "Contact Now" : "Subscribe to Contact"}
                  </Button>
                  <Button variant="outline" onClick={() => handleSaveCandidate(seeker.id)}>
                    Unsave
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => setSelectedSeeker(seeker)}>
                    View Full Profile
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SaveCandidate;
