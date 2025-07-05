



// import { useEffect, useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Badge } from "@/components/ui/badge";
// import { Search, MapPin, GraduationCap, Briefcase, User, Lock, Crown } from "lucide-react";
// import { supabase } from "@/integrations/supabase/client";

// export const JobSeekerProfiles = () => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [hasSubscription, setHasSubscription] = useState(false); // This would come from user data
//   const [jobSeeker, setJobSeeker] = useState([]); // ✅ never undefined or null






//   useEffect(() => {
//     const fetchJobSeekerProfile = async () => {
//       console.log("📡 Fetching job seeker profile...");

//       const {
//         data: { user },
//         error: userError,
//       } = await supabase.auth.getUser();

//       if (userError) {
//         console.error("❌ Error getting user:", userError);
//         return;
//       }

//       if (!user) {
//         console.warn("⚠️ No user logged in.");
//         return;
//       }

//       const { data, error } = await supabase
//         .from("job_seekers")
//         .select("*")
//         .eq("user_id", user.id)

//       if (error) {
//         console.error("❌ Error fetching job seeker profile:", error);
//       } else {
//         console.log("✅ Job seeker profileeeeeeeeeeeeeeee:", data);
//         setJobSeeker(data);  // store the first (and only) profile

//       }
//     };

//     fetchJobSeekerProfile();
//   }, []);


//   const filteredSeekers = jobSeeker.filter(seeker => {
//     // console.log("Checking seeker:", seeker); // 🪵 added log
//     const matchesSearch =
//       (seeker.name || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
//       (seeker.highest_qualification || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
//       (seeker.specialization || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
//       (seeker.skills || "").toLowerCase().includes(searchTerm.toLowerCase());
//     (seeker.experience_years || "").toLowerCase().includes(searchTerm.toLowerCase());

//     return matchesSearch;
//   });







//   return (
//     <div className="space-y-6">
//       {/* Subscription Notice */}
//       {!hasSubscription && (
//         <Card className="border-amber-200 bg-amber-50">
//           <CardHeader>
//             <CardTitle className="flex items-center gap-2 text-amber-800">
//               <Crown className="h-5 w-5" />
//               Premium Access Required
//             </CardTitle>
//             <CardDescription className="text-amber-700">
//               Subscribe to access full contact details and premium features for candidate recruitment.
//             </CardDescription>
//           </CardHeader>
//           <CardContent>
//             <Button className="bg-amber-600 hover:bg-amber-700">
//               Subscribe Now
//             </Button>
//           </CardContent>
//         </Card>
//       )}

//       {/* Search Section */}
//       <Card>
//         <CardContent className="p-6">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div className="relative">
//               <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
//               <Input
//                 placeholder="Search by name, qualification, skills..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="pl-10"
//               />
//             </div>
//             <Button className="w-full bg-blue-600 hover:bg-blue-700">
//               <Search className="mr-2 h-4 w-4" />
//               Search Candidates
//             </Button>
//           </div>
//         </CardContent>
//       </Card>

//       {/* Results Header */}
//       <div className="flex items-center justify-between">
//         <h2 className="text-xl font-semibold text-gray-900">
//           {filteredSeekers.length} Candidate{filteredSeekers.length !== 1 ? 's' : ''} Found
//         </h2>
//         <div className="flex gap-2">
//           <Badge variant="outline">All Specializations</Badge>
//           <Badge variant="outline">Available Now</Badge>
//           <Badge variant="outline">Experienced</Badge>
//         </div>
//       </div>

//       {/* Candidate Profiles */}
//       <div className="grid gap-6">
//         {filteredSeekers.map((seeker) => (
//           <Card key={seeker.id} className="hover:shadow-lg transition-shadow">
//             <CardHeader>
//               <div className="flex items-start justify-between">
//                 <div className="space-y-2">
//                   <CardTitle className="text-xl text-blue-600 flex items-center gap-2">
//                     <User className="h-5 w-5" />
//                     {seeker.name}
//                   </CardTitle>
//                   <CardDescription className="text-lg font-medium text-gray-900">
//                     {seeker.qualification}
//                   </CardDescription>
//                 </div>
//                 <Button variant="outline" size="sm">
//                   Contact Candidate
//                 </Button>
//               </div>
//             </CardHeader>
//             <CardContent>
//               <div className="space-y-4">
//                 {/* Professional Details */}
//                 <div className="flex flex-wrap gap-4 text-sm text-gray-600">
//                   <div className="flex items-center">
//                     <GraduationCap className="mr-1 h-4 w-4" />
//                     {seeker.
//                       highest_qualification}
//                   </div>
//                   <div className="flex items-center">
//                     <Briefcase className="mr-1 h-4 w-4" />
//                     {seeker.years_of_experience} years experience
//                   </div>
//                   <div className="flex items-center">
//                     <MapPin className="mr-1 h-4 w-4" />
//                     {seeker.current_location
// }
//                   </div>
//                 </div>

//                 {/* Contact Information */}
//                 <div className="space-y-2">
//                   <h4 className="font-medium text-gray-900">Contact Information:</h4>
//                   <div className="space-y-1">
//                     <p className="text-sm text-gray-600">
//                       Email: {hasSubscription ? seeker.email : "***@***.com"}
//                       {!hasSubscription && <Lock className="inline h-3 w-3 ml-1 text-amber-500" />}
//                     </p>
//                     <p className="text-sm text-gray-600">
//                       Phone: {hasSubscription ? seeker.phone : "+1 (***) ***-****"}
//                       {!hasSubscription && <Lock className="inline h-3 w-3 ml-1 text-amber-500" />}
//                     </p>
//                   </div>
//                 </div>

//                 {/* Skills */}
//                 <div>
//                   <h4 className="font-medium text-gray-900 mb-2">Key Skills:</h4>
//                   <div className="flex flex-wrap gap-2">
//                     {(seeker.skills || []).map((skill, index) => (
//                       <Badge key={index} variant="secondary" className="bg-green-100 text-green-800">
//                         {skill}
//                       </Badge>
//                     ))}
//                   </div>
//                 </div>


//                 {/* Availability */}
//                 <div className="bg-gray-50 p-3 rounded-md">
//                   <span className="font-medium text-gray-900">Availability: </span>
//                   <span className="text-gray-700">{seeker.availability}</span>
//                 </div>

//                 {/* Action Buttons */}
//                 <div className="flex gap-3 pt-4">
//                   <Button className="bg-blue-600 hover:bg-blue-700">
//                     {hasSubscription ? "Contact Now" : "Subscribe to Contact"}
//                   </Button>
//                   <Button variant="outline">
//                     Save Candidate
//                   </Button>
//                   <Button variant="ghost" size="sm">
//                     View Full Profile
//                   </Button>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         ))}
//       </div>

//       {/* Load More */}
//       <div className="text-center">
//         <Button variant="outline" size="lg">
//           Load More Candidates
//         </Button>
//       </div>
//     </div>
//   );
// };




import { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, MapPin, GraduationCap, Briefcase, User, Lock, Crown } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";


export const JobSeekerProfiles = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [hasSubscription, setHasSubscription] = useState(false);
  const [jobSeeker, setJobSeeker] = useState([]);
  const [selectedSeeker, setSelectedSeeker] = useState(null);
  const { toast } = useToast();
  // 🔍 Ref for smooth scroll

  useEffect(() => {
    const fetchJobSeekerProfile = async () => {
      console.log("📡 Fetching job seeker profile...");

      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        console.error("❌ Error getting user:", userError || "No user found");
        return;
      }

      const { data, error } = await supabase
        .from("job_seekers")
        .select("*")
        .eq("user_id", user.id);

      if (error) {
        console.error("❌ Error fetching job seeker profile:", error);
      } else {
        setJobSeeker(data);
      }
    };

    fetchJobSeekerProfile();
  }, []);

  const filteredSeekers = jobSeeker.filter((seeker) => {
    const term = searchTerm.toLowerCase();
    return (
      (seeker.name || "").toLowerCase().includes(term) ||
      (seeker.highest_qualification || "").toLowerCase().includes(term) ||
      (seeker.specialization || "").toLowerCase().includes(term) ||
      (seeker.skills || "").toLowerCase().includes(term)
    );
  });


  const handleSaveCandidate = async (seekerId) => {
    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError || !user) {
      toast({ title: "Error", description: "User not logged in", variant: "destructive" });
      return;
    }

    const { data: existing } = await supabase
      .from("save_profiles")
      .select("id")
      .eq("user_id", user.id)
      .eq("job_seekers_id", seekerId)
      .maybeSingle();

    if (existing) {
      toast({ title: "Already Saved", description: "This profile is already saved." });
      return;
    }

    const { error } = await supabase.from("save_profiles").insert({
      user_id: user.id,
      job_seekers_id: seekerId,
    });

    if (error) {
      console.error("Save error:", error.message);
      toast({ title: "Error", description: "Could not save candidate", variant: "destructive" });
    } else {
      toast({ title: "Saved", description: "Candidate saved successfully." });
    }
  };






  return (
    <div className="space-y-6">
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
            <Button className="bg-amber-600 hover:bg-amber-700">Subscribe Now</Button>
          </CardContent>
        </Card>
      )}

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

      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">
          {filteredSeekers.length} Candidate{filteredSeekers.length !== 1 ? "s" : ""} Found
        </h2>
        <div className="flex gap-2">
          <Badge variant="outline">All Specializations</Badge>
          <Badge variant="outline">Available Now</Badge>
          <Badge variant="outline">Experienced</Badge>
        </div>
      </div>

      <div className="grid gap-6">
        {filteredSeekers.map((seeker) => (
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
                {/* {hasSubscription ? (
  <a href={`tel:${seeker.phone}`}>
    <Button variant="outline" size="sm">
      Contact Candidate
    </Button>
  </a>
) : (
  <Button variant="outline" size="sm" disabled>
    Contact Candidate
  </Button>
)} */}
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
                    {(seeker.skills || []).map((skill, index) => (
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
                    Save Candidate
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

      {/* Full Profile Section with ref */}
      <Dialog open={!!selectedSeeker} onOpenChange={(open) => !open && setSelectedSeeker(null)}>
        <DialogContent className="max-w-2xl">
          {selectedSeeker && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedSeeker.name} Full Profile</DialogTitle>
                <DialogDescription>
                  {selectedSeeker.highest_qualification || "No qualification info"}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-3 mt-4">
                <p><strong>Email:</strong> {selectedSeeker.email}</p>
                <p><strong>Phone:</strong> {selectedSeeker.phone}</p>
                <p><strong>Experience:</strong> {selectedSeeker.years_of_experience} years</p>
                <p><strong>Location:</strong> {selectedSeeker.current_location}</p>
                <p><strong>Availability:</strong> {selectedSeeker.availability}</p>
                <p><strong>Specialization:</strong> {selectedSeeker.specialization}</p>

                <div>
                  <strong>Skills:</strong>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {(selectedSeeker.skills || []).map((skill, index) => (
                      <Badge key={index} variant="secondary" className="bg-green-100 text-green-800">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              <DialogFooter className="mt-6">
                <Button variant="outline" onClick={() => setSelectedSeeker(null)}>
                  Close
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>


      <div className="text-center">
        <Button variant="outline" size="lg">
          Load More Candidates
        </Button>
      </div>
    </div>
  );
};
