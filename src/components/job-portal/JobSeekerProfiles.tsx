


// // // // // // // import { useEffect, useState } from "react";
// // // // // // // import { Button } from "@/components/ui/button";
// // // // // // // import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// // // // // // // import { Input } from "@/components/ui/input";
// // // // // // // import { Badge } from "@/components/ui/badge";
// // // // // // // import { Search, MapPin, GraduationCap, Briefcase, User, Lock, Crown } from "lucide-react";
// // // // // // // import { supabase } from "@/integrations/supabase/client";

// // // // // // // export const JobSeekerProfiles = () => {
// // // // // // //   const [searchTerm, setSearchTerm] = useState("");
// // // // // // //   const [hasSubscription, setHasSubscription] = useState(false); // This would come from user data
// // // // // // //   const [jobSeeker, setJobSeeker] = useState([]); // ✅ never undefined or null






// // // // // // //   useEffect(() => {
// // // // // // //     const fetchJobSeekerProfile = async () => {
// // // // // // //       console.log("📡 Fetching job seeker profile...");

// // // // // // //       const {
// // // // // // //         data: { user },
// // // // // // //         error: userError,
// // // // // // //       } = await supabase.auth.getUser();

// // // // // // //       if (userError) {
// // // // // // //         console.error("❌ Error getting user:", userError);
// // // // // // //         return;
// // // // // // //       }

// // // // // // //       if (!user) {
// // // // // // //         console.warn("⚠️ No user logged in.");
// // // // // // //         return;
// // // // // // //       }

// // // // // // //       const { data, error } = await supabase
// // // // // // //         .from("job_seekers")
// // // // // // //         .select("*")
// // // // // // //         .eq("user_id", user.id)  // Get the logged-in user's data

// // // // // // //       if (error) {
// // // // // // //         console.error("❌ Error fetching job seeker profile:", error);
// // // // // // //       } else {
// // // // // // //         console.log("✅ Job seeker profileeeeeeeeeeeeeeee:", data);
// // // // // // //         setJobSeeker(data);  // store the first (and only) profile

// // // // // // //       }
// // // // // // //     };

// // // // // // //     fetchJobSeekerProfile();
// // // // // // //   }, []);


// // // // // // //   const filteredSeekers = jobSeeker.filter(seeker => {
// // // // // // //     console.log("Checking seeker:", seeker); // 🪵 added log
// // // // // // //     const matchesSearch =
// // // // // // //       (seeker.name || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
// // // // // // //       (seeker.highest_qualification || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
// // // // // // //       (seeker.specialization || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
// // // // // // //       (seeker.skills || "").toLowerCase().includes(searchTerm.toLowerCase());
// // // // // // //     (seeker.experience_years || "").toLowerCase().includes(searchTerm.toLowerCase());

// // // // // // //     return matchesSearch;
// // // // // // //   });







// // // // // // //   return (
// // // // // // //     <div className="space-y-6">
// // // // // // //       {/* Subscription Notice */}
// // // // // // //       {!hasSubscription && (
// // // // // // //         <Card className="border-amber-200 bg-amber-50">
// // // // // // //           <CardHeader>
// // // // // // //             <CardTitle className="flex items-center gap-2 text-amber-800">
// // // // // // //               <Crown className="h-5 w-5" />
// // // // // // //               Premium Access Required
// // // // // // //             </CardTitle>
// // // // // // //             <CardDescription className="text-amber-700">
// // // // // // //               Subscribe to access full contact details and premium features for candidate recruitment.
// // // // // // //             </CardDescription>
// // // // // // //           </CardHeader>
// // // // // // //           <CardContent>
// // // // // // //             <Button className="bg-amber-600 hover:bg-amber-700">
// // // // // // //               Subscribe Now
// // // // // // //             </Button>
// // // // // // //           </CardContent>
// // // // // // //         </Card>
// // // // // // //       )}

// // // // // // //       {/* Search Section */}
// // // // // // //       <Card>
// // // // // // //         <CardContent className="p-6">
// // // // // // //           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// // // // // // //             <div className="relative">
// // // // // // //               <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
// // // // // // //               <Input
// // // // // // //                 placeholder="Search by name, qualification, skills..."
// // // // // // //                 value={searchTerm}
// // // // // // //                 onChange={(e) => setSearchTerm(e.target.value)}
// // // // // // //                 className="pl-10"
// // // // // // //               />
// // // // // // //             </div>
// // // // // // //             <Button className="w-full bg-blue-600 hover:bg-blue-700">
// // // // // // //               <Search className="mr-2 h-4 w-4" />
// // // // // // //               Search Candidates
// // // // // // //             </Button>
// // // // // // //           </div>
// // // // // // //         </CardContent>
// // // // // // //       </Card>

// // // // // // //       {/* Results Header */}
// // // // // // //       <div className="flex items-center justify-between">
// // // // // // //         <h2 className="text-xl font-semibold text-gray-900">
// // // // // // //           {filteredSeekers.length} Candidate{filteredSeekers.length !== 1 ? 's' : ''} Found
// // // // // // //         </h2>
// // // // // // //         <div className="flex gap-2">
// // // // // // //           <Badge variant="outline">All Specializations</Badge>
// // // // // // //           <Badge variant="outline">Available Now</Badge>
// // // // // // //           <Badge variant="outline">Experienced</Badge>
// // // // // // //         </div>
// // // // // // //       </div>

// // // // // // //       {/* Candidate Profiles */}
// // // // // // //       <div className="grid gap-6">
// // // // // // //         {filteredSeekers.map((seeker) => (
// // // // // // //           <Card key={seeker.id} className="hover:shadow-lg transition-shadow">
// // // // // // //             <CardHeader>
// // // // // // //               <div className="flex items-start justify-between">
// // // // // // //                 <div className="space-y-2">
// // // // // // //                   <CardTitle className="text-xl text-blue-600 flex items-center gap-2">
// // // // // // //                     <User className="h-5 w-5" />
// // // // // // //                     {seeker.name}
// // // // // // //                   </CardTitle>
// // // // // // //                   <CardDescription className="text-lg font-medium text-gray-900">
// // // // // // //                     {seeker.qualification}
// // // // // // //                   </CardDescription>
// // // // // // //                 </div>
// // // // // // //                 <Button variant="outline" size="sm">
// // // // // // //                   Contact Candidate
// // // // // // //                 </Button>
// // // // // // //               </div>
// // // // // // //             </CardHeader>
// // // // // // //             <CardContent>
// // // // // // //               <div className="space-y-4">
// // // // // // //                 {/* Professional Details */}
// // // // // // //                 <div className="flex flex-wrap gap-4 text-sm text-gray-600">
// // // // // // //                   <div className="flex items-center">
// // // // // // //                     <GraduationCap className="mr-1 h-4 w-4" />
// // // // // // //                     {seeker.
// // // // // // //                       highest_qualification}
// // // // // // //                   </div>
// // // // // // //                   <div className="flex items-center">
// // // // // // //                     <Briefcase className="mr-1 h-4 w-4" />
// // // // // // //                     {seeker.years_of_experience} years experience
// // // // // // //                   </div>
// // // // // // //                   <div className="flex items-center">
// // // // // // //                     <MapPin className="mr-1 h-4 w-4" />
// // // // // // //                     {seeker.current_location
// // // // // // // }
// // // // // // //                   </div>
// // // // // // //                 </div>

// // // // // // //                 {/* Contact Information */}
// // // // // // //                 <div className="space-y-2">
// // // // // // //                   <h4 className="font-medium text-gray-900">Contact Information:</h4>
// // // // // // //                   <div className="space-y-1">
// // // // // // //                     <p className="text-sm text-gray-600">
// // // // // // //                       Email: {hasSubscription ? seeker.email : "***@***.com"}
// // // // // // //                       {!hasSubscription && <Lock className="inline h-3 w-3 ml-1 text-amber-500" />}
// // // // // // //                     </p>
// // // // // // //                     <p className="text-sm text-gray-600">
// // // // // // //                       Phone: {hasSubscription ? seeker.phone : "+1 (***) ***-****"}
// // // // // // //                       {!hasSubscription && <Lock className="inline h-3 w-3 ml-1 text-amber-500" />}
// // // // // // //                     </p>
// // // // // // //                   </div>
// // // // // // //                 </div>

// // // // // // //                 {/* Skills */}
// // // // // // //                 <div>
// // // // // // //                   <h4 className="font-medium text-gray-900 mb-2">Key Skills:</h4>
// // // // // // //                   <div className="flex flex-wrap gap-2">
// // // // // // //                     {(seeker.skills || []).map((skill, index) => (
// // // // // // //                       <Badge key={index} variant="secondary" className="bg-green-100 text-green-800">
// // // // // // //                         {skill}
// // // // // // //                       </Badge>
// // // // // // //                     ))}
// // // // // // //                   </div>
// // // // // // //                 </div>


// // // // // // //                 {/* Availability */}
// // // // // // //                 <div className="bg-gray-50 p-3 rounded-md">
// // // // // // //                   <span className="font-medium text-gray-900">Availability: </span>
// // // // // // //                   <span className="text-gray-700">{seeker.availability}</span>
// // // // // // //                 </div>

// // // // // // //                 {/* Action Buttons */}
// // // // // // //                 <div className="flex gap-3 pt-4">
// // // // // // //                   <Button className="bg-blue-600 hover:bg-blue-700">
// // // // // // //                     {hasSubscription ? "Contact Now" : "Subscribe to Contact"}
// // // // // // //                   </Button>
// // // // // // //                   <Button variant="outline">
// // // // // // //                     Save Candidate
// // // // // // //                   </Button>
// // // // // // //                   <Button variant="ghost" size="sm">
// // // // // // //                     View Full Profile
// // // // // // //                   </Button>
// // // // // // //                 </div>
// // // // // // //               </div>
// // // // // // //             </CardContent>
// // // // // // //           </Card>
// // // // // // //         ))}
// // // // // // //       </div>

// // // // // // //       {/* Load More */}
// // // // // // //       <div className="text-center">
// // // // // // //         <Button variant="outline" size="lg">
// // // // // // //           Load More Candidates
// // // // // // //         </Button>
// // // // // // //       </div>
// // // // // // //     </div>
// // // // // // //   );
// // // // // // // };





// // // // // // // import { useEffect, useState } from "react";
// // // // // // // import { Button } from "@/components/ui/button";
// // // // // // // import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// // // // // // // import { Input } from "@/components/ui/input";
// // // // // // // import { Badge } from "@/components/ui/badge";
// // // // // // // import { Search, MapPin, GraduationCap, Briefcase, User, Lock, Crown } from "lucide-react";
// // // // // // // import { supabase } from "@/integrations/supabase/client";

// // // // // // // export const JobSeekerProfiles = () => {
// // // // // // //   const [searchTerm, setSearchTerm] = useState("");
// // // // // // //   const [hasSubscription, setHasSubscription] = useState(false); // This would come from user data
// // // // // // //   const [jobSeeker, setJobSeeker] = useState([]); // ✅ never undefined or null






// // // // // // //   useEffect(() => {
// // // // // // //     const fetchJobSeekerProfile = async () => {
// // // // // // //       console.log("📡 Fetching job seeker profile...");

// // // // // // //       const {
// // // // // // //         data: { user },
// // // // // // //         error: userError,
// // // // // // //       } = await supabase.auth.getUser();

// // // // // // //       if (userError) {
// // // // // // //         console.error("❌ Error getting user:", userError);
// // // // // // //         return;
// // // // // // //       }

// // // // // // //       if (!user) {
// // // // // // //         console.warn("⚠️ No user logged in.");
// // // // // // //         return;
// // // // // // //       }

// // // // // // //       const { data, error } = await supabase
// // // // // // //         .from("job_seekers")
// // // // // // //         .select("*")
// // // // // // //         .eq("user_id", user.id)  // Get the logged-in user's data

// // // // // // //       if (error) {
// // // // // // //         console.error("❌ Error fetching job seeker profile:", error);
// // // // // // //       } else {
// // // // // // //         console.log("✅ Job seeker profileeeeeeeeeeeeeeee:", data);
// // // // // // //         setJobSeeker(data);  // store the first (and only) profile

// // // // // // //       }
// // // // // // //     };

// // // // // // //     fetchJobSeekerProfile();
// // // // // // //   }, []);


// // // // // // //   const filteredSeekers = jobSeeker.filter(seeker => {
// // // // // // //     console.log("Checking seeker:", seeker); // 🪵 added log
// // // // // // //     const matchesSearch =
// // // // // // //       (seeker.name || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
// // // // // // //       (seeker.highest_qualification || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
// // // // // // //       (seeker.specialization || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
// // // // // // //       (seeker.skills || "").toLowerCase().includes(searchTerm.toLowerCase());
// // // // // // //     (seeker.experience_years || "").toLowerCase().includes(searchTerm.toLowerCase());

// // // // // // //     return matchesSearch;
// // // // // // //   });







// // // // // // //   return (
// // // // // // //     <div className="space-y-6">
// // // // // // //       {/* Subscription Notice */}
// // // // // // //       {!hasSubscription && (
// // // // // // //         <Card className="border-amber-200 bg-amber-50">
// // // // // // //           <CardHeader>
// // // // // // //             <CardTitle className="flex items-center gap-2 text-amber-800">
// // // // // // //               <Crown className="h-5 w-5" />
// // // // // // //               Premium Access Required
// // // // // // //             </CardTitle>
// // // // // // //             <CardDescription className="text-amber-700">
// // // // // // //               Subscribe to access full contact details and premium features for candidate recruitment.
// // // // // // //             </CardDescription>
// // // // // // //           </CardHeader>
// // // // // // //           <CardContent>
// // // // // // //             <Button className="bg-amber-600 hover:bg-amber-700">
// // // // // // //               Subscribe Now
// // // // // // //             </Button>
// // // // // // //           </CardContent>
// // // // // // //         </Card>
// // // // // // //       )}

// // // // // // //       {/* Search Section */}
// // // // // // //       <Card>
// // // // // // //         <CardContent className="p-6">
// // // // // // //           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// // // // // // //             <div className="relative">
// // // // // // //               <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
// // // // // // //               <Input
// // // // // // //                 placeholder="Search by name, qualification, skills..."
// // // // // // //                 value={searchTerm}
// // // // // // //                 onChange={(e) => setSearchTerm(e.target.value)}
// // // // // // //                 className="pl-10"
// // // // // // //               />
// // // // // // //             </div>
// // // // // // //             <Button className="w-full bg-blue-600 hover:bg-blue-700">
// // // // // // //               <Search className="mr-2 h-4 w-4" />
// // // // // // //               Search Candidates
// // // // // // //             </Button>
// // // // // // //           </div>
// // // // // // //         </CardContent>
// // // // // // //       </Card>

// // // // // // //       {/* Results Header */}
// // // // // // //       <div className="flex items-center justify-between">
// // // // // // //         <h2 className="text-xl font-semibold text-gray-900">
// // // // // // //           {filteredSeekers.length} Candidate{filteredSeekers.length !== 1 ? 's' : ''} Found
// // // // // // //         </h2>
// // // // // // //         <div className="flex gap-2">
// // // // // // //           <Badge variant="outline">All Specializations</Badge>
// // // // // // //           <Badge variant="outline">Available Now</Badge>
// // // // // // //           <Badge variant="outline">Experienced</Badge>
// // // // // // //         </div>
// // // // // // //       </div>

// // // // // // //       {/* Candidate Profiles */}
// // // // // // //       <div className="grid gap-6">
// // // // // // //         {filteredSeekers.map((seeker) => (
// // // // // // //           <Card key={seeker.id} className="hover:shadow-lg transition-shadow">
// // // // // // //             <CardHeader>
// // // // // // //               <div className="flex items-start justify-between">
// // // // // // //                 <div className="space-y-2">
// // // // // // //                   <CardTitle className="text-xl text-blue-600 flex items-center gap-2">
// // // // // // //                     <User className="h-5 w-5" />
// // // // // // //                     {seeker.name}
// // // // // // //                   </CardTitle>
// // // // // // //                   <CardDescription className="text-lg font-medium text-gray-900">
// // // // // // //                     {seeker.qualification}
// // // // // // //                   </CardDescription>
// // // // // // //                 </div>
// // // // // // //                 <Button variant="outline" size="sm">
// // // // // // //                   Contact Candidate
// // // // // // //                 </Button>
// // // // // // //               </div>
// // // // // // //             </CardHeader>
// // // // // // //             <CardContent>
// // // // // // //               <div className="space-y-4">
// // // // // // //                 {/* Professional Details */}
// // // // // // //                 <div className="flex flex-wrap gap-4 text-sm text-gray-600">
// // // // // // //                   <div className="flex items-center">
// // // // // // //                     <GraduationCap className="mr-1 h-4 w-4" />
// // // // // // //                     {seeker.
// // // // // // //                       highest_qualification}
// // // // // // //                   </div>
// // // // // // //                   <div className="flex items-center">
// // // // // // //                     <Briefcase className="mr-1 h-4 w-4" />
// // // // // // //                     {seeker.years_of_experience} years experience
// // // // // // //                   </div>
// // // // // // //                   <div className="flex items-center">
// // // // // // //                     <MapPin className="mr-1 h-4 w-4" />
// // // // // // //                     {seeker.current_location
// // // // // // // }
// // // // // // //                   </div>
// // // // // // //                 </div>

// // // // // // //                 {/* Contact Information */}
// // // // // // //                 <div className="space-y-2">
// // // // // // //                   <h4 className="font-medium text-gray-900">Contact Information:</h4>
// // // // // // //                   <div className="space-y-1">
// // // // // // //                     <p className="text-sm text-gray-600">
// // // // // // //                       Email: {hasSubscription ? seeker.email : "***@***.com"}
// // // // // // //                       {!hasSubscription && <Lock className="inline h-3 w-3 ml-1 text-amber-500" />}
// // // // // // //                     </p>
// // // // // // //                     <p className="text-sm text-gray-600">
// // // // // // //                       Phone: {hasSubscription ? seeker.phone : "+1 (***) ***-****"}
// // // // // // //                       {!hasSubscription && <Lock className="inline h-3 w-3 ml-1 text-amber-500" />}
// // // // // // //                     </p>
// // // // // // //                   </div>
// // // // // // //                 </div>

// // // // // // //                 {/* Skills */}
// // // // // // //                 <div>
// // // // // // //                   <h4 className="font-medium text-gray-900 mb-2">Key Skills:</h4>
// // // // // // //                   <div className="flex flex-wrap gap-2">
// // // // // // //                     {(seeker.skills || []).map((skill, index) => (
// // // // // // //                       <Badge key={index} variant="secondary" className="bg-green-100 text-green-800">
// // // // // // //                         {skill}
// // // // // // //                       </Badge>
// // // // // // //                     ))}
// // // // // // //                   </div>
// // // // // // //                 </div>


// // // // // // //                 {/* Availability */}
// // // // // // //                 <div className="bg-gray-50 p-3 rounded-md">
// // // // // // //                   <span className="font-medium text-gray-900">Availability: </span>
// // // // // // //                   <span className="text-gray-700">{seeker.availability}</span>
// // // // // // //                 </div>

// // // // // // //                 {/* Action Buttons */}
// // // // // // //                 <div className="flex gap-3 pt-4">
// // // // // // //                   <Button className="bg-blue-600 hover:bg-blue-700">
// // // // // // //                     {hasSubscription ? "Contact Now" : "Subscribe to Contact"}
// // // // // // //                   </Button>
// // // // // // //                   <Button variant="outline">
// // // // // // //                     Save Candidate
// // // // // // //                   </Button>
// // // // // // //                   <Button variant="ghost" size="sm">
// // // // // // //                     View Full Profile
// // // // // // //                   </Button>
// // // // // // //                 </div>
// // // // // // //               </div>
// // // // // // //             </CardContent>
// // // // // // //           </Card>
// // // // // // //         ))}
// // // // // // //       </div>

// // // // // // //       {/* Load More */}
// // // // // // //       <div className="text-center">
// // // // // // //         <Button variant="outline" size="lg">
// // // // // // //           Load More Candidates
// // // // // // //         </Button>
// // // // // // //       </div>
// // // // // // //     </div>
// // // // // // //   );
// // // // // // // };





// // // // // // // import { useEffect, useState } from "react";
// // // // // // // import { Button } from "@/components/ui/button";
// // // // // // // import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// // // // // // // import { Input } from "@/components/ui/input";
// // // // // // // import { Badge } from "@/components/ui/badge";
// // // // // // // import { Search, MapPin, GraduationCap, Briefcase, User, Lock, Crown } from "lucide-react";
// // // // // // // import { supabase } from "@/integrations/supabase/client";

// // // // // // // export const JobSeekerProfiles = () => {
// // // // // // //   const [searchTerm, setSearchTerm] = useState("");
// // // // // // //   const [hasSubscription, setHasSubscription] = useState(false); // This would come from user data
// // // // // // //   const [jobSeeker, setJobSeeker] = useState([]); // ✅ never undefined or null






// // // // // // //   useEffect(() => {
// // // // // // //     const fetchJobSeekerProfile = async () => {
// // // // // // //       console.log("📡 Fetching job seeker profile...");

// // // // // // //       const {
// // // // // // //         data: { user },
// // // // // // //         error: userError,
// // // // // // //       } = await supabase.auth.getUser();

// // // // // // //       if (userError) {
// // // // // // //         console.error("❌ Error getting user:", userError);
// // // // // // //         return;
// // // // // // //       }

// // // // // // //       if (!user) {
// // // // // // //         console.warn("⚠️ No user logged in.");
// // // // // // //         return;
// // // // // // //       }

// // // // // // //       const { data, error } = await supabase
// // // // // // //         .from("job_seekers")
// // // // // // //         .select("*")

// // // // // // //         .eq("user_id", user.id)


// // // // // // //         .eq("user_id", user.id)

// // // // // // //         .eq("user_id", user.id)  // Get the logged-in user's data



// // // // // // //       if (error) {
// // // // // // //         console.error("❌ Error fetching job seeker profile:", error);
// // // // // // //       } else {
// // // // // // //         console.log("✅ Job seeker profileeeeeeeeeeeeeeee:", data);
// // // // // // //         setJobSeeker(data);  // store the first (and only) profile

// // // // // // //       }
// // // // // // //     };

// // // // // // //     fetchJobSeekerProfile();
// // // // // // //   }, []);


// // // // // // //   const filteredSeekers = jobSeeker.filter(seeker => {

// // // // // // //     // console.log("Checking seeker:", seeker); // 🪵 added log


// // // // // // //     // console.log("Checking seeker:", seeker); // 🪵 added log

// // // // // // //     console.log("Checking seeker:", seeker); // 🪵 added log


// // // // // // //     const matchesSearch =
// // // // // // //       (seeker.name || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
// // // // // // //       (seeker.highest_qualification || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
// // // // // // //       (seeker.specialization || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
// // // // // // //       (seeker.skills || "").toLowerCase().includes(searchTerm.toLowerCase());
// // // // // // //     (seeker.experience_years || "").toLowerCase().includes(searchTerm.toLowerCase());

// // // // // // //     return matchesSearch;
// // // // // // //   });







// // // // // // //   return (
// // // // // // //     <div className="space-y-6">
// // // // // // //       {/* Subscription Notice */}
// // // // // // //       {!hasSubscription && (
// // // // // // //         <Card className="border-amber-200 bg-amber-50">
// // // // // // //           <CardHeader>
// // // // // // //             <CardTitle className="flex items-center gap-2 text-amber-800">
// // // // // // //               <Crown className="h-5 w-5" />
// // // // // // //               Premium Access Required
// // // // // // //             </CardTitle>
// // // // // // //             <CardDescription className="text-amber-700">
// // // // // // //               Subscribe to access full contact details and premium features for candidate recruitment.
// // // // // // //             </CardDescription>
// // // // // // //           </CardHeader>
// // // // // // //           <CardContent>
// // // // // // //             <Button className="bg-amber-600 hover:bg-amber-700">
// // // // // // //               Subscribe Now
// // // // // // //             </Button>
// // // // // // //           </CardContent>
// // // // // // //         </Card>
// // // // // // //       )}

// // // // // // //       {/* Search Section */}
// // // // // // //       <Card>
// // // // // // //         <CardContent className="p-6">
// // // // // // //           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// // // // // // //             <div className="relative">
// // // // // // //               <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
// // // // // // //               <Input
// // // // // // //                 placeholder="Search by name, qualification, skills..."
// // // // // // //                 value={searchTerm}
// // // // // // //                 onChange={(e) => setSearchTerm(e.target.value)}
// // // // // // //                 className="pl-10"
// // // // // // //               />
// // // // // // //             </div>
// // // // // // //             <Button className="w-full bg-blue-600 hover:bg-blue-700">
// // // // // // //               <Search className="mr-2 h-4 w-4" />
// // // // // // //               Search Candidates
// // // // // // //             </Button>
// // // // // // //           </div>
// // // // // // //         </CardContent>
// // // // // // //       </Card>

// // // // // // //       {/* Results Header */}
// // // // // // //       <div className="flex items-center justify-between">
// // // // // // //         <h2 className="text-xl font-semibold text-gray-900">
// // // // // // //           {filteredSeekers.length} Candidate{filteredSeekers.length !== 1 ? 's' : ''} Found
// // // // // // //         </h2>
// // // // // // //         <div className="flex gap-2">
// // // // // // //           <Badge variant="outline">All Specializations</Badge>
// // // // // // //           <Badge variant="outline">Available Now</Badge>
// // // // // // //           <Badge variant="outline">Experienced</Badge>
// // // // // // //         </div>
// // // // // // //       </div>

// // // // // // //       {/* Candidate Profiles */}
// // // // // // //       <div className="grid gap-6">
// // // // // // //         {filteredSeekers.map((seeker) => (
// // // // // // //           <Card key={seeker.id} className="hover:shadow-lg transition-shadow">
// // // // // // //             <CardHeader>
// // // // // // //               <div className="flex items-start justify-between">
// // // // // // //                 <div className="space-y-2">
// // // // // // //                   <CardTitle className="text-xl text-blue-600 flex items-center gap-2">
// // // // // // //                     <User className="h-5 w-5" />
// // // // // // //                     {seeker.name}
// // // // // // //                   </CardTitle>
// // // // // // //                   <CardDescription className="text-lg font-medium text-gray-900">
// // // // // // //                     {seeker.qualification}
// // // // // // //                   </CardDescription>
// // // // // // //                 </div>
// // // // // // //                 <Button variant="outline" size="sm">
// // // // // // //                   Contact Candidate
// // // // // // //                 </Button>
// // // // // // //               </div>
// // // // // // //             </CardHeader>
// // // // // // //             <CardContent>
// // // // // // //               <div className="space-y-4">
// // // // // // //                 {/* Professional Details */}
// // // // // // //                 <div className="flex flex-wrap gap-4 text-sm text-gray-600">
// // // // // // //                   <div className="flex items-center">
// // // // // // //                     <GraduationCap className="mr-1 h-4 w-4" />
// // // // // // //                     {seeker.
// // // // // // //                       highest_qualification}
// // // // // // //                   </div>
// // // // // // //                   <div className="flex items-center">
// // // // // // //                     <Briefcase className="mr-1 h-4 w-4" />
// // // // // // //                     {seeker.years_of_experience} years experience
// // // // // // //                   </div>
// // // // // // //                   <div className="flex items-center">
// // // // // // //                     <MapPin className="mr-1 h-4 w-4" />
// // // // // // //                     {seeker.current_location
// // // // // // // }
// // // // // // //                   </div>
// // // // // // //                 </div>

// // // // // // //                 {/* Contact Information */}
// // // // // // //                 <div className="space-y-2">
// // // // // // //                   <h4 className="font-medium text-gray-900">Contact Information:</h4>
// // // // // // //                   <div className="space-y-1">
// // // // // // //                     <p className="text-sm text-gray-600">
// // // // // // //                       Email: {hasSubscription ? seeker.email : "***@***.com"}
// // // // // // //                       {!hasSubscription && <Lock className="inline h-3 w-3 ml-1 text-amber-500" />}
// // // // // // //                     </p>
// // // // // // //                     <p className="text-sm text-gray-600">
// // // // // // //                       Phone: {hasSubscription ? seeker.phone : "+1 (***) ***-****"}
// // // // // // //                       {!hasSubscription && <Lock className="inline h-3 w-3 ml-1 text-amber-500" />}
// // // // // // //                     </p>
// // // // // // //                   </div>
// // // // // // //                 </div>

// // // // // // //                 {/* Skills */}
// // // // // // //                 <div>
// // // // // // //                   <h4 className="font-medium text-gray-900 mb-2">Key Skills:</h4>
// // // // // // //                   <div className="flex flex-wrap gap-2">
// // // // // // //                     {(seeker.skills || []).map((skill, index) => (
// // // // // // //                       <Badge key={index} variant="secondary" className="bg-green-100 text-green-800">
// // // // // // //                         {skill}
// // // // // // //                       </Badge>
// // // // // // //                     ))}
// // // // // // //                   </div>
// // // // // // //                 </div>


// // // // // // //                 {/* Availability */}
// // // // // // //                 <div className="bg-gray-50 p-3 rounded-md">
// // // // // // //                   <span className="font-medium text-gray-900">Availability: </span>
// // // // // // //                   <span className="text-gray-700">{seeker.availability}</span>
// // // // // // //                 </div>

// // // // // // //                 {/* Action Buttons */}
// // // // // // //                 <div className="flex gap-3 pt-4">
// // // // // // //                   <Button className="bg-blue-600 hover:bg-blue-700">
// // // // // // //                     {hasSubscription ? "Contact Now" : "Subscribe to Contact"}
// // // // // // //                   </Button>
// // // // // // //                   <Button variant="outline">
// // // // // // //                     Save Candidate
// // // // // // //                   </Button>
// // // // // // //                   <Button variant="ghost" size="sm">
// // // // // // //                     View Full Profile
// // // // // // //                   </Button>
// // // // // // //                 </div>
// // // // // // //               </div>
// // // // // // //             </CardContent>
// // // // // // //           </Card>
// // // // // // //         ))}
// // // // // // //       </div>

// // // // // // //       {/* Load More */}
// // // // // // //       <div className="text-center">
// // // // // // //         <Button variant="outline" size="lg">
// // // // // // //           Load More Candidates
// // // // // // //         </Button>
// // // // // // //       </div>
// // // // // // //     </div>
// // // // // // //   );
// // // // // // // };





// // // // // // // import { useEffect, useState, useRef } from "react";


// // // // // // import { useEffect, useState, useRef } from "react";



// // // // // // // import { useEffect, useState } from "react";


// // // // // // import { Button } from "@/components/ui/button";
// // // // // // import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// // // // // // import { Input } from "@/components/ui/input";
// // // // // // import { Badge } from "@/components/ui/badge";
// // // // // // import { Search, MapPin, GraduationCap, Briefcase, User, Lock, Crown } from "lucide-react";
// // // // // // import { supabase } from "@/integrations/supabase/client";
// // // // // // import {
// // // // // //   Dialog,
// // // // // //   DialogTrigger,
// // // // // //   DialogContent,
// // // // // //   DialogHeader,
// // // // // //   DialogTitle,
// // // // // //   DialogDescription,
// // // // // //   DialogFooter,
// // // // // // } from "@/components/ui/dialog";
// // // // // // import { useToast } from "@/hooks/use-toast";




// // // // // // export const JobSeekerProfiles = () => {
// // // // // //   const [searchTerm, setSearchTerm] = useState("");
// // // // // //   const [hasSubscription, setHasSubscription] = useState(false);
// // // // // //   const [jobSeeker, setJobSeeker] = useState([]);
// // // // // //   const [selectedSeeker, setSelectedSeeker] = useState(null);
// // // // // //   const { toast } = useToast();
// // // // // //   // 🔍 Ref for smooth scroll









// // // // // //   useEffect(() => {
// // // // // //     const fetchJobSeekerProfile = async () => {
// // // // // //       console.log("📡 Fetching job seeker profile...");

// // // // // //       const {
// // // // // //         data: { user },
// // // // // //         error: userError,
// // // // // //       } = await supabase.auth.getUser();

// // // // // //       if (userError || !user) {
// // // // // //         console.error("❌ Error getting user:", userError || "No user found");


// // // // // //       if (userError) {
// // // // // //         console.error("❌ Error getting user:", userError);
// // // // // //         return;
// // // // // //       }

// // // // // //       if (!user) {
// // // // // //         console.warn("⚠️ No user logged in.");


// // // // // //         return;
// // // // // //       }

// // // // // //       const { data, error } = await supabase
// // // // // //         .from("job_seekers")
// // // // // //         .select("*")

// // // // // //         .eq("user_id", user.id);






// // // // // //       if (error) {
// // // // // //         console.error("❌ Error fetching job seeker profile:", error);
// // // // // //       } else {

// // // // // //         setJobSeeker(data);


// // // // // //         setJobSeeker(data);

// // // // // //         console.log("✅ Job seeker profileeeeeeeeeeeeeeee:", data);
// // // // // //         setJobSeeker(data);  // store the first (and only) profile


// // // // // //       }
// // // // // //     };

// // // // // //     fetchJobSeekerProfile();
// // // // // //   }, []);

// // // // // //   const filteredSeekers = jobSeeker.filter((seeker) => {
// // // // // //     const term = searchTerm.toLowerCase();
// // // // // //     return (
// // // // // //       (seeker.name || "").toLowerCase().includes(term) ||
// // // // // //       (seeker.highest_qualification || "").toLowerCase().includes(term) ||
// // // // // //       (seeker.specialization || "").toLowerCase().includes(term) ||
// // // // // //       (seeker.skills || "").toLowerCase().includes(term)
// // // // // //     );
// // // // // //   });


// // // // // //   const filteredSeekers = jobSeeker.filter((seeker) => {
// // // // // //     const term = searchTerm.toLowerCase();
// // // // // //     return (
// // // // // //       (seeker.name || "").toLowerCase().includes(term) ||
// // // // // //       (seeker.highest_qualification || "").toLowerCase().includes(term) ||
// // // // // //       (seeker.specialization || "").toLowerCase().includes(term) ||
// // // // // //       (seeker.skills || "").toLowerCase().includes(term)
// // // // // //     );
// // // // // //   });


// // // // // //   const handleSaveCandidate = async (seekerId) => {
// // // // // //     const { data: { user }, error: userError } = await supabase.auth.getUser();

// // // // // //     if (userError || !user) {
// // // // // //       toast({ title: "Error", description: "User not logged in", variant: "destructive" });
// // // // // //       return;
// // // // // //     }

// // // // // //     const { data: existing } = await supabase
// // // // // //       .from("save_profiles")
// // // // // //       .select("id")
// // // // // //       .eq("user_id", user.id)
// // // // // //       .eq("job_seekers_id", seekerId)
// // // // // //       .maybeSingle();

// // // // // //     if (existing) {
// // // // // //       toast({ title: "Already Saved", description: "This profile is already saved." });
// // // // // //       return;
// // // // // //     }

// // // // // //     const { error } = await supabase.from("save_profiles").insert({
// // // // // //       user_id: user.id,
// // // // // //       job_seekers_id: seekerId,
// // // // // //     });

// // // // // //     if (error) {
// // // // // //       console.error("Save error:", error.message);
// // // // // //       toast({ title: "Error", description: "Could not save candidate", variant: "destructive" });
// // // // // //     } else {
// // // // // //       toast({ title: "Saved", description: "Candidate saved successfully." });
// // // // // //     }
// // // // // //   };



// // // // // //   const filteredSeekers = jobSeeker.filter(seeker => {
// // // // // //     // console.log("Checking seeker:", seeker); // 🪵 added log
// // // // // //     const matchesSearch =
// // // // // //       (seeker.name || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
// // // // // //       (seeker.highest_qualification || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
// // // // // //       (seeker.specialization || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
// // // // // //       (seeker.skills || "").toLowerCase().includes(searchTerm.toLowerCase());
// // // // // //     (seeker.experience_years || "").toLowerCase().includes(searchTerm.toLowerCase());


// // // // // //   const handleSaveCandidate = async (seekerId) => {
// // // // // //     const { data: { user }, error: userError } = await supabase.auth.getUser();

// // // // // //     if (userError || !user) {
// // // // // //       toast({ title: "Error", description: "User not logged in", variant: "destructive" });
// // // // // //       return;
// // // // // //     }

// // // // // //     const { data: existing } = await supabase
// // // // // //       .from("save_profiles")
// // // // // //       .select("id")
// // // // // //       .eq("user_id", user.id)
// // // // // //       .eq("job_seekers_id", seekerId)
// // // // // //       .maybeSingle();

// // // // // //     if (existing) {
// // // // // //       toast({ title: "Already Saved", description: "This profile is already saved." });
// // // // // //       return;
// // // // // //     }

// // // // // //     const { error } = await supabase.from("save_profiles").insert({
// // // // // //       user_id: user.id,
// // // // // //       job_seekers_id: seekerId,
// // // // // //     });

// // // // // //     if (error) {
// // // // // //       console.error("Save error:", error.message);
// // // // // //       toast({ title: "Error", description: "Could not save candidate", variant: "destructive" });
// // // // // //     } else {
// // // // // //       toast({ title: "Saved", description: "Candidate saved successfully." });
// // // // // //     }
// // // // // //   };






// // // // // //   return (
// // // // // //     <div className="space-y-6">
// // // // // //       {!hasSubscription && (
// // // // // //         <Card className="border-amber-200 bg-amber-50">
// // // // // //           <CardHeader>
// // // // // //             <CardTitle className="flex items-center gap-2 text-amber-800">
// // // // // //               <Crown className="h-5 w-5" />
// // // // // //               Premium Access Required
// // // // // //             </CardTitle>
// // // // // //             <CardDescription className="text-amber-700">
// // // // // //               Subscribe to access full contact details and premium features for candidate recruitment.
// // // // // //             </CardDescription>
// // // // // //           </CardHeader>
// // // // // //           <CardContent>
// // // // // //             <Button className="bg-amber-600 hover:bg-amber-700">Subscribe Now</Button>
// // // // // //           </CardContent>
// // // // // //         </Card>
// // // // // //       )}

// // // // // //       <Card>
// // // // // //         <CardContent className="p-6">
// // // // // //           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// // // // // //             <div className="relative">
// // // // // //               <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
// // // // // //               <Input
// // // // // //                 placeholder="Search by name, qualification, skills..."
// // // // // //                 value={searchTerm}
// // // // // //                 onChange={(e) => setSearchTerm(e.target.value)}
// // // // // //                 className="pl-10"
// // // // // //               />
// // // // // //             </div>
// // // // // //             <Button className="w-full bg-blue-600 hover:bg-blue-700">
// // // // // //               <Search className="mr-2 h-4 w-4" />
// // // // // //               Search Candidates
// // // // // //             </Button>
// // // // // //           </div>
// // // // // //         </CardContent>
// // // // // //       </Card>

// // // // // //       <div className="flex items-center justify-between">
// // // // // //         <h2 className="text-xl font-semibold text-gray-900">
// // // // // //           {filteredSeekers.length} Candidate{filteredSeekers.length !== 1 ? "s" : ""} Found
// // // // // //         </h2>
// // // // // //         <div className="flex gap-2">
// // // // // //           <Badge variant="outline">All Specializations</Badge>
// // // // // //           <Badge variant="outline">Available Now</Badge>
// // // // // //           <Badge variant="outline">Experienced</Badge>
// // // // // //         </div>
// // // // // //       </div>

// // // // // //       <div className="grid gap-6">
// // // // // //         {filteredSeekers.map((seeker) => (
// // // // // //           <Card key={seeker.id} className="hover:shadow-lg transition-shadow">
// // // // // //             <CardHeader>
// // // // // //               <div className="flex items-start justify-between">
// // // // // //                 <div className="space-y-2">
// // // // // //                   <CardTitle className="text-xl text-blue-600 flex items-center gap-2">
// // // // // //                     <User className="h-5 w-5" />
// // // // // //                     {seeker.name}
// // // // // //                   </CardTitle>
// // // // // //                   <CardDescription className="text-lg font-medium text-gray-900">
// // // // // //                     {seeker.qualification}
// // // // // //                   </CardDescription>
// // // // // //                 </div>
// // // // // //                 {/* {hasSubscription ? (
// // // // // //   <a href={`tel:${seeker.phone}`}>
// // // // // //     <Button variant="outline" size="sm">
// // // // // //       Contact Candidate
// // // // // //     </Button>
// // // // // //   </a>
// // // // // // ) : (
// // // // // //   <Button variant="outline" size="sm" disabled>
// // // // // //     Contact Candidate
// // // // // //   </Button>
// // // // // // )} */}
// // // // // //                 <a href={`tel:+91${seeker.phone}`}>
// // // // // //                   <Button variant="outline" size="sm">
// // // // // //                     Contact Candidate
// // // // // //                   </Button>
// // // // // //                 </a>



// // // // // //               </div>
// // // // // //             </CardHeader>
// // // // // //             <CardContent>
// // // // // //               <div className="space-y-4">
// // // // // //                 <div className="flex flex-wrap gap-4 text-sm text-gray-600">
// // // // // //                   <div className="flex items-center">
// // // // // //                     <GraduationCap className="mr-1 h-4 w-4" />

// // // // // //                     {seeker.highest_qualification}


// // // // // //                     {seeker.highest_qualification}

// // // // // //                     {seeker.
// // // // // //                       highest_qualification}

// // // // // //                   </div>
// // // // // //                   <div className="flex items-center">
// // // // // //                     <Briefcase className="mr-1 h-4 w-4" />
// // // // // //                     {seeker.years_of_experience} years experience
// // // // // //                   </div>
// // // // // //                   <div className="flex items-center">
// // // // // //                     <MapPin className="mr-1 h-4 w-4" />

// // // // // //                     {seeker.current_location}


// // // // // //                     {seeker.current_location}

// // // // // //                     {seeker.current_location
// // // // // // }


// // // // // //                   </div>
// // // // // //                 </div>

// // // // // //                 <div className="space-y-2">
// // // // // //                   <h4 className="font-medium text-gray-900">Contact Information:</h4>
// // // // // //                   <div className="space-y-1">
// // // // // //                     <p className="text-sm text-gray-600">
// // // // // //                       Email: {hasSubscription ? seeker.email : "***@***.com"}
// // // // // //                       {!hasSubscription && <Lock className="inline h-3 w-3 ml-1 text-amber-500" />}
// // // // // //                     </p>
// // // // // //                     <p className="text-sm text-gray-600">
// // // // // //                       Phone: {hasSubscription ? seeker.phone : "+1 (***) ***-****"}
// // // // // //                       {!hasSubscription && <Lock className="inline h-3 w-3 ml-1 text-amber-500" />}
// // // // // //                     </p>
// // // // // //                   </div>
// // // // // //                 </div>

// // // // // //                 <div>
// // // // // //                   <h4 className="font-medium text-gray-900 mb-2">Key Skills:</h4>
// // // // // //                   <div className="flex flex-wrap gap-2">
// // // // // //                     {(seeker.skills || []).map((skill, index) => (
// // // // // //                       <Badge key={index} variant="secondary" className="bg-green-100 text-green-800">
// // // // // //                         {skill}
// // // // // //                       </Badge>
// // // // // //                     ))}
// // // // // //                   </div>
// // // // // //                 </div>




// // // // // //                 {/* Availability */}


// // // // // //                 <div className="bg-gray-50 p-3 rounded-md">
// // // // // //                   <span className="font-medium text-gray-900">Availability: </span>
// // // // // //                   <span className="text-gray-700">{seeker.availability}</span>
// // // // // //                 </div>

// // // // // //                 <div className="flex gap-3 pt-4">
// // // // // //                   <Button className="bg-blue-600 hover:bg-blue-700">
// // // // // //                     {hasSubscription ? "Contact Now" : "Subscribe to Contact"}
// // // // // //                   </Button>
// // // // // //                   <Button variant="outline" onClick={() => handleSaveCandidate(seeker.id)}>
// // // // // //                     Save Candidate
// // // // // //                   </Button>


// // // // // //                   <Button variant="ghost" size="sm" onClick={() => setSelectedSeeker(seeker)}>
// // // // // //                     View Full Profile
// // // // // //                   </Button>

// // // // // //                 </div>
// // // // // //               </div>
// // // // // //             </CardContent>
// // // // // //           </Card>
// // // // // //         ))}
// // // // // //       </div>

// // // // // //       {/* Full Profile Section with ref */}
// // // // // //       <Dialog open={!!selectedSeeker} onOpenChange={(open) => !open && setSelectedSeeker(null)}>
// // // // // //         <DialogContent className="max-w-2xl">
// // // // // //           {selectedSeeker && (
// // // // // //             <>
// // // // // //               <DialogHeader>
// // // // // //                 <DialogTitle>{selectedSeeker.name} Full Profile</DialogTitle>
// // // // // //                 <DialogDescription>
// // // // // //                   {selectedSeeker.highest_qualification || "No qualification info"}
// // // // // //                 </DialogDescription>
// // // // // //               </DialogHeader>

// // // // // //               <div className="space-y-3 mt-4">
// // // // // //                 <p><strong>Email:</strong> {selectedSeeker.email}</p>
// // // // // //                 <p><strong>Phone:</strong> {selectedSeeker.phone}</p>
// // // // // //                 <p><strong>Experience:</strong> {selectedSeeker.years_of_experience} years</p>
// // // // // //                 <p><strong>Location:</strong> {selectedSeeker.current_location}</p>
// // // // // //                 <p><strong>Availability:</strong> {selectedSeeker.availability}</p>
// // // // // //                 <p><strong>Specialization:</strong> {selectedSeeker.specialization}</p>

// // // // // //                 <div>
// // // // // //                   <strong>Skills:</strong>
// // // // // //                   <div className="flex flex-wrap gap-2 mt-1">
// // // // // //                     {(selectedSeeker.skills || []).map((skill, index) => (
// // // // // //                       <Badge key={index} variant="secondary" className="bg-green-100 text-green-800">
// // // // // //                         {skill}
// // // // // //                       </Badge>
// // // // // //                     ))}
// // // // // //                   </div>
// // // // // //                 </div>
// // // // // //               </div>

// // // // // //               <DialogFooter className="mt-6">
// // // // // //                 <Button variant="outline" onClick={() => setSelectedSeeker(null)}>
// // // // // //                   Close
// // // // // //                 </Button>
// // // // // //               </DialogFooter>
// // // // // //             </>
// // // // // //           )}
// // // // // //         </DialogContent>
// // // // // //       </Dialog>


// // // // // //       <div className="text-center">
// // // // // //         <Button variant="outline" size="lg">
// // // // // //           Load More Candidates
// // // // // //         </Button>
// // // // // //       </div>
// // // // // //     </div>
// // // // // //   );
// // // // // // };

// // // // // import { useEffect, useState, useRef } from "react";
// // // // // import { Button } from "@/components/ui/button";
// // // // // import {
// // // // //   Card,
// // // // //   CardContent,
// // // // //   CardDescription,
// // // // //   CardHeader,
// // // // //   CardTitle,
// // // // // } from "@/components/ui/card";
// // // // // import { Input } from "@/components/ui/input";
// // // // // import { Badge } from "@/components/ui/badge";
// // // // // import {
// // // // //   Search,
// // // // //   MapPin,
// // // // //   GraduationCap,
// // // // //   Briefcase,
// // // // //   User,
// // // // //   Lock,
// // // // //   Crown,
// // // // // } from "lucide-react";
// // // // // import { supabase } from "@/integrations/supabase/client";
// // // // // import {
// // // // //   Dialog,
// // // // //   DialogTrigger,
// // // // //   DialogContent,
// // // // //   DialogHeader,
// // // // //   DialogTitle,
// // // // //   DialogDescription,
// // // // //   DialogFooter,
// // // // // } from "@/components/ui/dialog";
// // // // // import { useToast } from "@/hooks/use-toast";

// // // // // export const JobSeekerProfiles = () => {
// // // // //   const [searchTerm, setSearchTerm] = useState("");
// // // // //   const [hasSubscription, setHasSubscription] = useState(false);
// // // // //   const [jobSeeker, setJobSeeker] = useState([]);
// // // // //   const [selectedSeeker, setSelectedSeeker] = useState(null);
// // // // //   const { toast } = useToast();
// // // // //   // 🔍 Ref for smooth scroll

// // // // //   useEffect(() => {
// // // // //     const fetchJobSeekerProfile = async () => {
// // // // //       console.log("📡 Fetching job seeker profile...");

// // // // //       const {
// // // // //         data: { user },
// // // // //         error: userError,
// // // // //       } = await supabase.auth.getUser();

// // // // //       if (userError || !user) {
// // // // //         console.error("❌ Error getting user:", userError || "No user found");
// // // // //         return;
// // // // //       }

// // // // //       const { data, error } = await supabase
// // // // //         .from("job_seekers")
// // // // //         .select("*")
// // // // //         .eq("user_id", user.id);

// // // // //       if (error) {
// // // // //         console.error("❌ Error fetching job seeker profile:", error);
// // // // //       } else {
// // // // //         setJobSeeker(data);
// // // // //       }
// // // // //     };

// // // // //     fetchJobSeekerProfile();
// // // // //   }, []);

// // // // //   const filteredSeekers = jobSeeker.filter((seeker) => {
// // // // //     const term = searchTerm.toLowerCase();
// // // // //     return (
// // // // //       (seeker.name || "").toLowerCase().includes(term) ||
// // // // //       (seeker.highest_qualification || "").toLowerCase().includes(term) ||
// // // // //       (seeker.specialization || "").toLowerCase().includes(term) ||
// // // // //       (seeker.skills || "").toLowerCase().includes(term)
// // // // //     );
// // // // //   });

// // // // //   const handleSaveCandidate = async (seekerId) => {
// // // // //     const {
// // // // //       data: { user },
// // // // //       error: userError,
// // // // //     } = await supabase.auth.getUser();

// // // // //     if (userError || !user) {
// // // // //       toast({
// // // // //         title: "Error",
// // // // //         description: "User not logged in",
// // // // //         variant: "destructive",
// // // // //       });
// // // // //       return;
// // // // //     }

// // // // //     const { data: existing } = await supabase
// // // // //       .from("save_profiles")
// // // // //       .select("id")
// // // // //       .eq("user_id", user.id)
// // // // //       .eq("job_seekers_id", seekerId)
// // // // //       .maybeSingle();

// // // // //     if (existing) {
// // // // //       toast({
// // // // //         title: "Already Saved",
// // // // //         description: "This profile is already saved.",
// // // // //       });
// // // // //       return;
// // // // //     }

// // // // //     const { error } = await supabase.from("save_profiles").insert({
// // // // //       user_id: user.id,
// // // // //       job_seekers_id: seekerId,
// // // // //     });

// // // // //     if (error) {
// // // // //       console.error("Save error:", error.message);
// // // // //       toast({
// // // // //         title: "Error",
// // // // //         description: "Could not save candidate",
// // // // //         variant: "destructive",
// // // // //       });
// // // // //     } else {
// // // // //       toast({ title: "Saved", description: "Candidate saved successfully." });
// // // // //     }
// // // // //   };

// // // // //   return (
// // // // //     <div className="space-y-6">
// // // // //       {!hasSubscription && (
// // // // //         <Card className="border-amber-200 bg-amber-50">
// // // // //           <CardHeader>
// // // // //             <CardTitle className="flex items-center gap-2 text-amber-800">
// // // // //               <Crown className="h-5 w-5" />
// // // // //               Premium Access Required
// // // // //             </CardTitle>
// // // // //             <CardDescription className="text-amber-700">
// // // // //               Subscribe to access full contact details and premium features for
// // // // //               candidate recruitment.
// // // // //             </CardDescription>
// // // // //           </CardHeader>
// // // // //           <CardContent>
// // // // //             <Button className="bg-amber-600 hover:bg-amber-700">
// // // // //               Subscribe Now
// // // // //             </Button>
// // // // //           </CardContent>
// // // // //         </Card>
// // // // //       )}

// // // // //       <Card>
// // // // //         <CardContent className="p-6">
// // // // //           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// // // // //             <div className="relative">
// // // // //               <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
// // // // //               <Input
// // // // //                 placeholder="Search by name, qualification, skills..."
// // // // //                 value={searchTerm}
// // // // //                 onChange={(e) => setSearchTerm(e.target.value)}
// // // // //                 className="pl-10"
// // // // //               />
// // // // //             </div>
// // // // //             <Button className="w-full bg-blue-600 hover:bg-blue-700">
// // // // //               <Search className="mr-2 h-4 w-4" />
// // // // //               Search Candidates
// // // // //             </Button>
// // // // //           </div>
// // // // //         </CardContent>
// // // // //       </Card>

// // // // //       <div className="flex items-center justify-between">
// // // // //         <h2 className="text-xl font-semibold text-gray-900">
// // // // //           {filteredSeekers.length} Candidate
// // // // //           {filteredSeekers.length !== 1 ? "s" : ""} Found
// // // // //         </h2>
// // // // //         <div className="flex gap-2">
// // // // //           <Badge variant="outline">All Specializations</Badge>
// // // // //           <Badge variant="outline">Available Now</Badge>
// // // // //           <Badge variant="outline">Experienced</Badge>
// // // // //         </div>
// // // // //       </div>

// // // // //       <div className="grid gap-6">
// // // // //         {filteredSeekers.map((seeker) => (
// // // // //           <Card key={seeker.id} className="hover:shadow-lg transition-shadow">
// // // // //             <CardHeader>
// // // // //               <div className="flex items-start justify-between">
// // // // //                 <div className="space-y-2">
// // // // //                   <CardTitle className="text-xl text-blue-600 flex items-center gap-2">
// // // // //                     <User className="h-5 w-5" />
// // // // //                     {seeker.name}
// // // // //                   </CardTitle>
// // // // //                   <CardDescription className="text-lg font-medium text-gray-900">
// // // // //                     {seeker.qualification}
// // // // //                   </CardDescription>
// // // // //                 </div>
// // // // //                 {/* {hasSubscription ? (
// // // // //   <a href={`tel:${seeker.phone}`}>
// // // // //     <Button variant="outline" size="sm">
// // // // //       Contact Candidate
// // // // //     </Button>
// // // // //   </a>
// // // // // ) : (
// // // // //   <Button variant="outline" size="sm" disabled>
// // // // //     Contact Candidate
// // // // //   </Button>
// // // // // )} */}
// // // // //                 <a href={`tel:+91${seeker.phone}`}>
// // // // //                   <Button variant="outline" size="sm">
// // // // //                     Contact Candidate
// // // // //                   </Button>
// // // // //                 </a>
// // // // //               </div>
// // // // //             </CardHeader>
// // // // //             <CardContent>
// // // // //               <div className="space-y-4">
// // // // //                 <div className="flex flex-wrap gap-4 text-sm text-gray-600">
// // // // //                   <div className="flex items-center">
// // // // //                     <GraduationCap className="mr-1 h-4 w-4" />
// // // // //                     {seeker.highest_qualification}
// // // // //                   </div>
// // // // //                   <div className="flex items-center">
// // // // //                     <Briefcase className="mr-1 h-4 w-4" />
// // // // //                     {seeker.years_of_experience} years experience
// // // // //                   </div>
// // // // //                   <div className="flex items-center">
// // // // //                     <MapPin className="mr-1 h-4 w-4" />
// // // // //                     {seeker.current_location}
// // // // //                   </div>
// // // // //                 </div>

// // // // //                 <div className="space-y-2">
// // // // //                   <h4 className="font-medium text-gray-900">
// // // // //                     Contact Information:
// // // // //                   </h4>
// // // // //                   <div className="space-y-1">
// // // // //                     <p className="text-sm text-gray-600">
// // // // //                       Email: {hasSubscription ? seeker.email : "***@***.com"}
// // // // //                       {!hasSubscription && (
// // // // //                         <Lock className="inline h-3 w-3 ml-1 text-amber-500" />
// // // // //                       )}
// // // // //                     </p>
// // // // //                     <p className="text-sm text-gray-600">
// // // // //                       Phone:{" "}
// // // // //                       {hasSubscription ? seeker.phone : "+1 (***) ***-****"}
// // // // //                       {!hasSubscription && (
// // // // //                         <Lock className="inline h-3 w-3 ml-1 text-amber-500" />
// // // // //                       )}
// // // // //                     </p>
// // // // //                   </div>
// // // // //                 </div>

// // // // //                 <div>
// // // // //                   <h4 className="font-medium text-gray-900 mb-2">
// // // // //                     Key Skills:
// // // // //                   </h4>
// // // // //                   <div className="flex flex-wrap gap-2">
// // // // //                     {(seeker.skills || []).map((skill, index) => (
// // // // //                       <Badge
// // // // //                         key={index}
// // // // //                         variant="secondary"
// // // // //                         className="bg-green-100 text-green-800"
// // // // //                       >
// // // // //                         {skill}
// // // // //                       </Badge>
// // // // //                     ))}
// // // // //                   </div>
// // // // //                 </div>

// // // // //                 <div className="bg-gray-50 p-3 rounded-md">
// // // // //                   <span className="font-medium text-gray-900">
// // // // //                     Availability:{" "}
// // // // //                   </span>
// // // // //                   <span className="text-gray-700">{seeker.availability}</span>
// // // // //                 </div>

// // // // //                 <div className="flex gap-3 pt-4">
// // // // //                   <Button className="bg-blue-600 hover:bg-blue-700">
// // // // //                     {hasSubscription ? "Contact Now" : "Subscribe to Contact"}
// // // // //                   </Button>
// // // // //                   <Button
// // // // //                     variant="outline"
// // // // //                     onClick={() => handleSaveCandidate(seeker.id)}
// // // // //                   >
// // // // //                     Save Candidate
// // // // //                   </Button>

// // // // //                   <Button
// // // // //                     variant="ghost"
// // // // //                     size="sm"
// // // // //                     onClick={() => setSelectedSeeker(seeker)}
// // // // //                   >
// // // // //                     View Full Profile
// // // // //                   </Button>
// // // // //                 </div>
// // // // //               </div>
// // // // //             </CardContent>
// // // // //           </Card>
// // // // //         ))}
// // // // //       </div>

// // // // //       {/* Full Profile Section with ref */}
// // // // //       <Dialog
// // // // //         open={!!selectedSeeker}
// // // // //         onOpenChange={(open) => !open && setSelectedSeeker(null)}
// // // // //       >
// // // // //         <DialogContent className="max-w-2xl">
// // // // //           {selectedSeeker && (
// // // // //             <>
// // // // //               <DialogHeader>
// // // // //                 <DialogTitle>{selectedSeeker.name} Full Profile</DialogTitle>
// // // // //                 <DialogDescription>
// // // // //                   {selectedSeeker.highest_qualification ||
// // // // //                     "No qualification info"}
// // // // //                 </DialogDescription>
// // // // //               </DialogHeader>

// // // // //               <div className="space-y-3 mt-4">
// // // // //                 <p>
// // // // //                   <strong>Email:</strong> {selectedSeeker.email}
// // // // //                 </p>
// // // // //                 <p>
// // // // //                   <strong>Phone:</strong> {selectedSeeker.phone}
// // // // //                 </p>
// // // // //                 <p>
// // // // //                   <strong>Experience:</strong>{" "}
// // // // //                   {selectedSeeker.years_of_experience} years
// // // // //                 </p>
// // // // //                 <p>
// // // // //                   <strong>Location:</strong> {selectedSeeker.current_location}
// // // // //                 </p>
// // // // //                 <p>
// // // // //                   <strong>Availability:</strong> {selectedSeeker.availability}
// // // // //                 </p>
// // // // //                 <p>
// // // // //                   <strong>Specialization:</strong>{" "}
// // // // //                   {selectedSeeker.specialization}
// // // // //                 </p>

// // // // //                 <div>
// // // // //                   <strong>Skills:</strong>
// // // // //                   <div className="flex flex-wrap gap-2 mt-1">
// // // // //                     {(selectedSeeker.skills || []).map((skill, index) => (
// // // // //                       <Badge
// // // // //                         key={index}
// // // // //                         variant="secondary"
// // // // //                         className="bg-green-100 text-green-800"
// // // // //                       >
// // // // //                         {skill}
// // // // //                       </Badge>
// // // // //                     ))}
// // // // //                   </div>
// // // // //                 </div>
// // // // //               </div>

// // // // //               <DialogFooter className="mt-6">
// // // // //                 <Button
// // // // //                   variant="outline"
// // // // //                   onClick={() => setSelectedSeeker(null)}
// // // // //                 >
// // // // //                   Close
// // // // //                 </Button>
// // // // //               </DialogFooter>
// // // // //             </>
// // // // //           )}
// // // // //         </DialogContent>
// // // // //       </Dialog>

// // // // //       <div className="text-center">
// // // // //         <Button variant="outline" size="lg">
// // // // //           Load More Candidates
// // // // //         </Button>
// // // // //       </div>
// // // // //     </div>
// // // // //   );
// // // // // };


// // // // import { useEffect, useState } from "react";
// // // // import { Button } from "@/components/ui/button";
// // // // import {
// // // //   Card,
// // // //   CardContent,
// // // //   CardDescription,
// // // //   CardHeader,
// // // //   CardTitle,
// // // // } from "@/components/ui/card";
// // // // import { Input } from "@/components/ui/input";
// // // // import { Badge } from "@/components/ui/badge";
// // // // import {
// // // //   Search,
// // // //   MapPin,
// // // //   GraduationCap,
// // // //   Briefcase,
// // // //   User,
// // // //   Lock,
// // // //   Crown,
// // // //   Phone,
// // // // } from "lucide-react";
// // // // import { supabase } from "@/integrations/supabase/client";
// // // // import {
// // // //   Dialog,
// // // //   DialogContent,
// // // //   DialogHeader,
// // // //   DialogTitle,
// // // //   DialogDescription,
// // // //   DialogFooter,
// // // // } from "@/components/ui/dialog";
// // // // import { useToast } from "@/hooks/use-toast";

// // // // export const JobSeekerProfiles = () => {
// // // //   const [searchTerm, setSearchTerm] = useState("");
// // // //   const [hasSubscription, setHasSubscription] = useState(false);
// // // //   const [jobSeeker, setJobSeeker] = useState([]);
// // // //   const [selectedSeeker, setSelectedSeeker] = useState(null);
// // // //   const { toast } = useToast();

// // // //   useEffect(() => {
// // // //     const fetchJobSeekerProfile = async () => {
// // // //       const {
// // // //         data: { user },
// // // //         error: userError,
// // // //       } = await supabase.auth.getUser();


// // // //       if (userError || !user) {
// // // //         console.warn("❌ Failed to get user or user is null", userError);
// // // //         return;
// // // //       }

// // // //       if (userError || !user) return;

// // // //       console.log("✅ Logged-in User ID:", user.id);

// // // //       const { data: seekers, error } = await supabase
// // // //         .from("job_seekers")
// // // //         .select("*")
// // // //         .neq("user_id", user.id);
     


// // // //       if (error || !seekers) {
// // // //         console.error("❌ Error fetching job seekers:", error);
// // // //         return;
// // // //       }

// // // //       // 👇 Add full names using fetchProfileData
// // // //       const seekersWithNames = await Promise.all(
// // // //         seekers.map(async (seeker) => {
// // // //           const fullName = await fetchProfileData(seeker.user_id);
// // // //           return {
// // // //             ...seeker,
// // // //             fullName, // Add full name field
// // // //           };
// // // //         })
// // // //       );

// // // //       console.log("📦 Job Seekers with Names:", seekersWithNames);
// // // //       setJobSeeker(seekersWithNames);

// // // //       if (!error) setJobSeeker(data);
// // // //     };

// // // //     fetchJobSeekerProfile();
// // // //   }, []);



// // // //   const filteredSeekers = jobSeeker.filter((seeker) => {
// // // //     const term = searchTerm.toLowerCase();
// // // //     return (
// // // //       (seeker.name || "").toLowerCase().includes(term) ||
// // // //       (seeker.highest_qualification || "").toLowerCase().includes(term) ||
// // // //       (seeker.specialization || "").toLowerCase().includes(term) ||
// // // //       (seeker.skills || "").toLowerCase().includes(term)
// // // //     );
// // // //   });


  
// // // // const fetchProfileData = async (userId: string): Promise<string> => {
// // // //   console.log(`🔍 Fetching profile for userIdddddddddddddddddddd: ${userId}`); // add this

// // // //   const { data: profile, error } = await supabase
// // // //     .from("profiles")
// // // //     .select("first_name, last_name")
// // // //     .eq("id", userId)
// // // //     .maybeSingle();

// // // //   if (error || !profile) {
// // // //     console.error(`❌ Not found: ${userId}`, error);
// // // //     return "Unknown Author";
// // // //   }

// // // //   console.log(`✅ Found profile for ${userId}: ${profile.first_name} ${profile.last_name}`);
// // // //   return `${profile.first_name} ${profile.last_name}`;
// // // // };





// // // //   const handleSaveCandidate = async (seekerId) => {
// // // //     const {
// // // //       data: { user },
// // // //       error: userError,
// // // //     } = await supabase.auth.getUser();

// // // //     if (userError || !user) {
// // // //       toast({
// // // //         title: "Error",
// // // //         description: "User not logged in",
// // // //         variant: "destructive",
// // // //       });
// // // //       return;
// // // //     }

// // // //     const { data: existing } = await supabase
// // // //       .from("save_profiles")
// // // //       .select("id")
// // // //       .eq("user_id", user.id)
// // // //       .eq("job_seekers_id", seekerId)
// // // //       .maybeSingle();

// // // //     if (existing) {
// // // //       toast({
// // // //         title: "Already Saved",
// // // //         description: "This profile is already saved.",
// // // //       });
// // // //       return;
// // // //     }

// // // //     const { error } = await supabase.from("save_profiles").insert({
// // // //       user_id: user.id,
// // // //       job_seekers_id: seekerId,
// // // //     });

// // // //     if (error) {
// // // //       toast({
// // // //         title: "Error",
// // // //         description: "Could not save candidate",
// // // //         variant: "destructive",
// // // //       });
// // // //     } else {
// // // //       toast({ title: "Saved", description: "Candidate saved successfully." });
// // // //     }
// // // //   };

// // // //   return (
// // // //     <div className="space-y-6 px-2 sm:px-0">
// // // //       {/* Premium Banner */}
// // // //       {!hasSubscription && (
// // // //         <Card className="border-amber-200 bg-amber-50">
// // // //           <CardHeader className="p-4 sm:p-6">
// // // //             <CardTitle className="flex items-center gap-2 text-amber-800 text-base sm:text-xl">
// // // //               <Crown className="h-4 w-4 sm:h-5 sm:w-5" />
// // // //               Premium Access Required
// // // //             </CardTitle>
// // // //             <CardDescription className="text-amber-700 text-sm sm:text-base">
// // // //               Subscribe to access full contact details and premium features for
// // // //               candidate recruitment.
// // // //             </CardDescription>
// // // //           </CardHeader>
// // // //           <CardContent className="p-4 sm:p-6 pt-0">
// // // //             <Button className="bg-amber-600 hover:bg-amber-700 w-full sm:w-auto">
// // // //               Subscribe Now
// // // //             </Button>
// // // //           </CardContent>
// // // //         </Card>
// // // //       )}

// // // //       {/* Search Section */}
// // // //       <Card className="border-0 shadow-none sm:shadow-sm sm:border">
// // // //         <CardContent className="p-4 sm:p-6">
// // // //           <div className="flex flex-col gap-4">
// // // //             <div className="relative">
// // // //               <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
// // // //               <Input
// // // //                 placeholder="Search by name, qualification, skills..."
// // // //                 value={searchTerm}
// // // //                 onChange={(e) => setSearchTerm(e.target.value)}
// // // //                 className="pl-10"
// // // //               />
// // // //             </div>
// // // //             <Button className="w-full bg-blue-600 hover:bg-blue-700">
// // // //               <Search className="mr-2 h-4 w-4" />
// // // //               Search Candidates
// // // //             </Button>
// // // //           </div>
// // // //         </CardContent>
// // // //       </Card>

// // // //       {/* Results Header */}
// // // //       <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
// // // //         <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
// // // //           {filteredSeekers.length} Candidate
// // // //           {filteredSeekers.length !== 1 ? "s" : ""} Found
// // // //         </h2>
// // // //         <div className="flex flex-wrap gap-2">
// // // //           <Badge variant="outline">All Specializations</Badge>
// // // //           <Badge variant="outline">Available Now</Badge>
// // // //           <Badge variant="outline">Experienced</Badge>
// // // //         </div>
// // // //       </div>

// // // //       {/* Candidates List */}
// // // //       <div className="grid gap-4 sm:gap-6">
// // // //         {filteredSeekers.map((seeker) => (
// // // //           <Card
// // // //             key={seeker.id}
// // // //             className="hover:shadow-lg transition-shadow border-0 sm:border"
// // // //           >
// // // //             <CardHeader className="p-4 sm:p-6">
// // // //               <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
// // // //                 <div className="space-y-2">
// // // //                   <CardTitle className="text-lg sm:text-xl text-blue-600 flex items-center gap-2">
// // // //                     <User className="h-4 w-4 sm:h-5 sm:w-5" />

// // // //                     {/* {seeker.fullName} */}

// // // //                     {seeker.name}
// // // //                   </CardTitle>
// // // //                   <CardDescription className="text-base sm:text-lg font-medium text-gray-900">
// // // //                     {seeker.qualification}
// // // //                   </CardDescription>
// // // //                 </div>
// // // //                 <a
// // // //                   href={`tel:+91${seeker.phone}`}
// // // //                   className="self-start sm:self-auto"
// // // //                 >
// // // //                   <Button
// // // //                     variant="outline"
// // // //                     size="sm"
// // // //                     className="flex items-center gap-1"
// // // //                   >
// // // //                     <Phone className="h-4 w-4" />
// // // //                     <span className="hidden sm:inline">Contact</span>
// // // //                   </Button>
// // // //                 </a>
// // // //               </div>
// // // //             </CardHeader>
// // // //             <CardContent className="p-4 sm:p-6 pt-0">
// // // //               <div className="space-y-4">
// // // //                 <div className="flex flex-wrap gap-3 text-sm text-gray-600">
// // // //                   <div className="flex items-center">
// // // //                     <GraduationCap className="mr-1 h-4 w-4" />
// // // //                     {seeker.highest_qualification}
// // // //                   </div>
// // // //                   <div className="flex items-center">
// // // //                     <Briefcase className="mr-1 h-4 w-4" />
// // // //                     {seeker.years_of_experience} years experience
// // // //                   </div>
// // // //                   <div className="flex items-center">
// // // //                     <MapPin className="mr-1 h-4 w-4" />
// // // //                     {seeker.current_location}
// // // //                   </div>
// // // //                 </div>

// // // //                 <div className="space-y-2">
// // // //                   <h4 className="font-medium text-gray-900">
// // // //                     Contact Information:
// // // //                   </h4>
// // // //                   <div className="space-y-1">
// // // //                     <p className="text-sm text-gray-600 flex items-center">
// // // //                       Email: {hasSubscription ? seeker.email : "***@***.com"}
// // // //                       {!hasSubscription && (
// // // //                         <Lock className="inline h-3 w-3 ml-1 text-amber-500" />
// // // //                       )}
// // // //                     </p>
// // // //                     <p className="text-sm text-gray-600 flex items-center">
// // // //                       Phone:{" "}
// // // //                       {hasSubscription ? seeker.phone : "+1 (***) ***-****"}
// // // //                       {!hasSubscription && (
// // // //                         <Lock className="inline h-3 w-3 ml-1 text-amber-500" />
// // // //                       )}
// // // //                     </p>
// // // //                   </div>
// // // //                 </div>

// // // //                 <div>
// // // //                   <h4 className="font-medium text-gray-900 mb-2">
// // // //                     Key Skills:
// // // //                   </h4>
// // // //                   <div className="flex flex-wrap gap-2">
// // // //                     {(seeker.skills || []).slice(0, 5).map((skill, index) => (
// // // //                       <Badge
// // // //                         key={index}
// // // //                         variant="secondary"
// // // //                         className="bg-green-100 text-green-800"
// // // //                       >
// // // //                         {skill}
// // // //                       </Badge>
// // // //                     ))}
// // // //                     {(seeker.skills || []).length > 5 && (
// // // //                       <Badge
// // // //                         variant="secondary"
// // // //                         className="bg-green-100 text-green-800"
// // // //                       >
// // // //                         +{(seeker.skills || []).length - 5}
// // // //                       </Badge>
// // // //                     )}
// // // //                   </div>
// // // //                 </div>

// // // //                 <div className="bg-gray-50 p-3 rounded-md text-sm">
// // // //                   <span className="font-medium text-gray-900">
// // // //                     Availability:{" "}
// // // //                   </span>
// // // //                   <span className="text-gray-700">{seeker.availability}</span>
// // // //                 </div>

// // // //                 <div className="flex flex-wrap gap-3 pt-4">
// // // //                   <Button className="bg-blue-600 hover:bg-blue-700 flex-1 min-w-[140px]">
// // // //                     {hasSubscription ? "Contact Now" : "Subscribe to Contact"}
// // // //                   </Button>
// // // //                   <Button
// // // //                     variant="outline"
// // // //                     className="flex-1 min-w-[120px]"
// // // //                     onClick={() => handleSaveCandidate(seeker.id)}
// // // //                   >
// // // //                     Save Candidate
// // // //                   </Button>

// // // //                   <Button
// // // //                     variant="ghost"
// // // //                     size="sm"
// // // //                     className="flex-1 min-w-[100px]"
// // // //                     onClick={() => setSelectedSeeker(seeker)}
// // // //                   >
// // // //                     View Full
// // // //                   </Button>
// // // //                 </div>
// // // //               </div>
// // // //             </CardContent>
// // // //           </Card>
// // // //         ))}
// // // //       </div>

// // // //       {/* Full Profile Dialog */}
// // // //       <Dialog
// // // //         open={!!selectedSeeker}
// // // //         onOpenChange={(open) => !open && setSelectedSeeker(null)}
// // // //       >
// // // //         <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
// // // //           {selectedSeeker && (
// // // //             <>
// // // //               <DialogHeader>
// // // //                 <DialogTitle className="text-lg sm:text-xl">
// // // //                   {selectedSeeker.name} Full Profile
// // // //                 </DialogTitle>
// // // //                 <DialogDescription className="text-sm sm:text-base">
// // // //                   {selectedSeeker.highest_qualification ||
// // // //                     "No qualification info"}
// // // //                 </DialogDescription>
// // // //               </DialogHeader>

// // // //               <div className="space-y-3 mt-4 text-sm sm:text-base">
// // // //                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
// // // //                   <div>
// // // //                     <p className="font-medium">Email:</p>
// // // //                     <p>{selectedSeeker.email}</p>
// // // //                   </div>
// // // //                   <div>
// // // //                     <p className="font-medium">Phone:</p>
// // // //                     <p>{selectedSeeker.phone}</p>
// // // //                   </div>
// // // //                   <div>
// // // //                     <p className="font-medium">Experience:</p>
// // // //                     <p>{selectedSeeker.years_of_experience} years</p>
// // // //                   </div>
// // // //                   <div>
// // // //                     <p className="font-medium">Location:</p>
// // // //                     <p>{selectedSeeker.current_location}</p>
// // // //                   </div>
// // // //                   <div>
// // // //                     <p className="font-medium">Availability:</p>
// // // //                     <p>{selectedSeeker.availability}</p>
// // // //                   </div>
// // // //                   <div>
// // // //                     <p className="font-medium">Specialization:</p>
// // // //                     <p>{selectedSeeker.specialization}</p>
// // // //                   </div>
// // // //                 </div>

// // // //                 <div className="pt-3">
// // // //                   <p className="font-medium">Skills:</p>
// // // //                   <div className="flex flex-wrap gap-2 mt-1">
// // // //                     {(selectedSeeker.skills || []).map((skill, index) => (
// // // //                       <Badge
// // // //                         key={index}
// // // //                         variant="secondary"
// // // //                         className="bg-green-100 text-green-800"
// // // //                       >
// // // //                         {skill}
// // // //                       </Badge>
// // // //                     ))}
// // // //                   </div>
// // // //                 </div>
// // // //               </div>

// // // //               <DialogFooter className="mt-6">
// // // //                 <Button
// // // //                   variant="outline"
// // // //                   onClick={() => setSelectedSeeker(null)}
// // // //                 >
// // // //                   Close
// // // //                 </Button>
// // // //               </DialogFooter>
// // // //             </>
// // // //           )}
// // // //         </DialogContent>
// // // //       </Dialog>

// // // //       {/* Load More Button */}
// // // //       {filteredSeekers.length > 0 && (
// // // //         <div className="text-center pt-4">
// // // //           <Button variant="outline" size="lg">
// // // //             Load More Candidates
// // // //           </Button>
// // // //         </div>
// // // //       )}
// // // //     </div>
// // // //   );
// // // // };



// // // // // // import { useEffect, useState } from "react";
// // // // // // import { Button } from "@/components/ui/button";
// // // // // // import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// // // // // // import { Input } from "@/components/ui/input";
// // // // // // import { Badge } from "@/components/ui/badge";
// // // // // // import { Search, MapPin, GraduationCap, Briefcase, User, Lock, Crown } from "lucide-react";
// // // // // // import { supabase } from "@/integrations/supabase/client";

// // // // // // export const JobSeekerProfiles = () => {
// // // // // //   const [searchTerm, setSearchTerm] = useState("");
// // // // // //   const [hasSubscription, setHasSubscription] = useState(false); // This would come from user data
// // // // // //   const [jobSeeker, setJobSeeker] = useState([]); // ✅ never undefined or null






// // // // // //   useEffect(() => {
// // // // // //     const fetchJobSeekerProfile = async () => {
// // // // // //       console.log("📡 Fetching job seeker profile...");

// // // // // //       const {
// // // // // //         data: { user },
// // // // // //         error: userError,
// // // // // //       } = await supabase.auth.getUser();

// // // // // //       if (userError) {
// // // // // //         console.error("❌ Error getting user:", userError);
// // // // // //         return;
// // // // // //       }

// // // // // //       if (!user) {
// // // // // //         console.warn("⚠️ No user logged in.");
// // // // // //         return;
// // // // // //       }

// // // // // //       const { data, error } = await supabase
// // // // // //         .from("job_seekers")
// // // // // //         .select("*")
// // // // // //         .eq("user_id", user.id)  // Get the logged-in user's data

// // // // // //       if (error) {
// // // // // //         console.error("❌ Error fetching job seeker profile:", error);
// // // // // //       } else {
// // // // // //         console.log("✅ Job seeker profileeeeeeeeeeeeeeee:", data);
// // // // // //         setJobSeeker(data);  // store the first (and only) profile

// // // // // //       }
// // // // // //     };

// // // // // //     fetchJobSeekerProfile();
// // // // // //   }, []);


// // // // // //   const filteredSeekers = jobSeeker.filter(seeker => {
// // // // // //     console.log("Checking seeker:", seeker); // 🪵 added log
// // // // // //     const matchesSearch =
// // // // // //       (seeker.name || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
// // // // // //       (seeker.highest_qualification || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
// // // // // //       (seeker.specialization || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
// // // // // //       (seeker.skills || "").toLowerCase().includes(searchTerm.toLowerCase());
// // // // // //     (seeker.experience_years || "").toLowerCase().includes(searchTerm.toLowerCase());

// // // // // //     return matchesSearch;
// // // // // //   });







// // // // // //   return (
// // // // // //     <div className="space-y-6">
// // // // // //       {/* Subscription Notice */}
// // // // // //       {!hasSubscription && (
// // // // // //         <Card className="border-amber-200 bg-amber-50">
// // // // // //           <CardHeader>
// // // // // //             <CardTitle className="flex items-center gap-2 text-amber-800">
// // // // // //               <Crown className="h-5 w-5" />
// // // // // //               Premium Access Required
// // // // // //             </CardTitle>
// // // // // //             <CardDescription className="text-amber-700">
// // // // // //               Subscribe to access full contact details and premium features for candidate recruitment.
// // // // // //             </CardDescription>
// // // // // //           </CardHeader>
// // // // // //           <CardContent>
// // // // // //             <Button className="bg-amber-600 hover:bg-amber-700">
// // // // // //               Subscribe Now
// // // // // //             </Button>
// // // // // //           </CardContent>
// // // // // //         </Card>
// // // // // //       )}

// // // // // //       {/* Search Section */}
// // // // // //       <Card>
// // // // // //         <CardContent className="p-6">
// // // // // //           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// // // // // //             <div className="relative">
// // // // // //               <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
// // // // // //               <Input
// // // // // //                 placeholder="Search by name, qualification, skills..."
// // // // // //                 value={searchTerm}
// // // // // //                 onChange={(e) => setSearchTerm(e.target.value)}
// // // // // //                 className="pl-10"
// // // // // //               />
// // // // // //             </div>
// // // // // //             <Button className="w-full bg-blue-600 hover:bg-blue-700">
// // // // // //               <Search className="mr-2 h-4 w-4" />
// // // // // //               Search Candidates
// // // // // //             </Button>
// // // // // //           </div>
// // // // // //         </CardContent>
// // // // // //       </Card>

// // // // // //       {/* Results Header */}
// // // // // //       <div className="flex items-center justify-between">
// // // // // //         <h2 className="text-xl font-semibold text-gray-900">
// // // // // //           {filteredSeekers.length} Candidate{filteredSeekers.length !== 1 ? 's' : ''} Found
// // // // // //         </h2>
// // // // // //         <div className="flex gap-2">
// // // // // //           <Badge variant="outline">All Specializations</Badge>
// // // // // //           <Badge variant="outline">Available Now</Badge>
// // // // // //           <Badge variant="outline">Experienced</Badge>
// // // // // //         </div>
// // // // // //       </div>

// // // // // //       {/* Candidate Profiles */}
// // // // // //       <div className="grid gap-6">
// // // // // //         {filteredSeekers.map((seeker) => (
// // // // // //           <Card key={seeker.id} className="hover:shadow-lg transition-shadow">
// // // // // //             <CardHeader>
// // // // // //               <div className="flex items-start justify-between">
// // // // // //                 <div className="space-y-2">
// // // // // //                   <CardTitle className="text-xl text-blue-600 flex items-center gap-2">
// // // // // //                     <User className="h-5 w-5" />
// // // // // //                     {seeker.name}
// // // // // //                   </CardTitle>
// // // // // //                   <CardDescription className="text-lg font-medium text-gray-900">
// // // // // //                     {seeker.qualification}
// // // // // //                   </CardDescription>
// // // // // //                 </div>
// // // // // //                 <Button variant="outline" size="sm">
// // // // // //                   Contact Candidate
// // // // // //                 </Button>
// // // // // //               </div>
// // // // // //             </CardHeader>
// // // // // //             <CardContent>
// // // // // //               <div className="space-y-4">
// // // // // //                 {/* Professional Details */}
// // // // // //                 <div className="flex flex-wrap gap-4 text-sm text-gray-600">
// // // // // //                   <div className="flex items-center">
// // // // // //                     <GraduationCap className="mr-1 h-4 w-4" />
// // // // // //                     {seeker.
// // // // // //                       highest_qualification}
// // // // // //                   </div>
// // // // // //                   <div className="flex items-center">
// // // // // //                     <Briefcase className="mr-1 h-4 w-4" />
// // // // // //                     {seeker.years_of_experience} years experience
// // // // // //                   </div>
// // // // // //                   <div className="flex items-center">
// // // // // //                     <MapPin className="mr-1 h-4 w-4" />
// // // // // //                     {seeker.current_location
// // // // // // }
// // // // // //                   </div>
// // // // // //                 </div>

// // // // // //                 {/* Contact Information */}
// // // // // //                 <div className="space-y-2">
// // // // // //                   <h4 className="font-medium text-gray-900">Contact Information:</h4>
// // // // // //                   <div className="space-y-1">
// // // // // //                     <p className="text-sm text-gray-600">
// // // // // //                       Email: {hasSubscription ? seeker.email : "***@***.com"}
// // // // // //                       {!hasSubscription && <Lock className="inline h-3 w-3 ml-1 text-amber-500" />}
// // // // // //                     </p>
// // // // // //                     <p className="text-sm text-gray-600">
// // // // // //                       Phone: {hasSubscription ? seeker.phone : "+1 (***) ***-****"}
// // // // // //                       {!hasSubscription && <Lock className="inline h-3 w-3 ml-1 text-amber-500" />}
// // // // // //                     </p>
// // // // // //                   </div>
// // // // // //                 </div>

// // // // // //                 {/* Skills */}
// // // // // //                 <div>
// // // // // //                   <h4 className="font-medium text-gray-900 mb-2">Key Skills:</h4>
// // // // // //                   <div className="flex flex-wrap gap-2">
// // // // // //                     {(seeker.skills || []).map((skill, index) => (
// // // // // //                       <Badge key={index} variant="secondary" className="bg-green-100 text-green-800">
// // // // // //                         {skill}
// // // // // //                       </Badge>
// // // // // //                     ))}
// // // // // //                   </div>
// // // // // //                 </div>


// // // // // //                 {/* Availability */}
// // // // // //                 <div className="bg-gray-50 p-3 rounded-md">
// // // // // //                   <span className="font-medium text-gray-900">Availability: </span>
// // // // // //                   <span className="text-gray-700">{seeker.availability}</span>
// // // // // //                 </div>

// // // // // //                 {/* Action Buttons */}
// // // // // //                 <div className="flex gap-3 pt-4">
// // // // // //                   <Button className="bg-blue-600 hover:bg-blue-700">
// // // // // //                     {hasSubscription ? "Contact Now" : "Subscribe to Contact"}
// // // // // //                   </Button>
// // // // // //                   <Button variant="outline">
// // // // // //                     Save Candidate
// // // // // //                   </Button>
// // // // // //                   <Button variant="ghost" size="sm">
// // // // // //                     View Full Profile
// // // // // //                   </Button>
// // // // // //                 </div>
// // // // // //               </div>
// // // // // //             </CardContent>
// // // // // //           </Card>
// // // // // //         ))}
// // // // // //       </div>

// // // // // //       {/* Load More */}
// // // // // //       <div className="text-center">
// // // // // //         <Button variant="outline" size="lg">
// // // // // //           Load More Candidates
// // // // // //         </Button>
// // // // // //       </div>
// // // // // //     </div>
// // // // // //   );
// // // // // // };





// // // // // // import { useEffect, useState } from "react";
// // // // // // import { Button } from "@/components/ui/button";
// // // // // // import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// // // // // // import { Input } from "@/components/ui/input";
// // // // // // import { Badge } from "@/components/ui/badge";
// // // // // // import { Search, MapPin, GraduationCap, Briefcase, User, Lock, Crown } from "lucide-react";
// // // // // // import { supabase } from "@/integrations/supabase/client";

// // // // // // export const JobSeekerProfiles = () => {
// // // // // //   const [searchTerm, setSearchTerm] = useState("");
// // // // // //   const [hasSubscription, setHasSubscription] = useState(false); // This would come from user data
// // // // // //   const [jobSeeker, setJobSeeker] = useState([]); // ✅ never undefined or null






// // // // // //   useEffect(() => {
// // // // // //     const fetchJobSeekerProfile = async () => {
// // // // // //       console.log("📡 Fetching job seeker profile...");

// // // // // //       const {
// // // // // //         data: { user },
// // // // // //         error: userError,
// // // // // //       } = await supabase.auth.getUser();

// // // // // //       if (userError) {
// // // // // //         console.error("❌ Error getting user:", userError);
// // // // // //         return;
// // // // // //       }

// // // // // //       if (!user) {
// // // // // //         console.warn("⚠️ No user logged in.");
// // // // // //         return;
// // // // // //       }

// // // // // //       const { data, error } = await supabase
// // // // // //         .from("job_seekers")
// // // // // //         .select("*")
// // // // // //         .eq("user_id", user.id)  // Get the logged-in user's data

// // // // // //       if (error) {
// // // // // //         console.error("❌ Error fetching job seeker profile:", error);
// // // // // //       } else {
// // // // // //         console.log("✅ Job seeker profileeeeeeeeeeeeeeee:", data);
// // // // // //         setJobSeeker(data);  // store the first (and only) profile

// // // // // //       }
// // // // // //     };

// // // // // //     fetchJobSeekerProfile();
// // // // // //   }, []);


// // // // // //   const filteredSeekers = jobSeeker.filter(seeker => {
// // // // // //     console.log("Checking seeker:", seeker); // 🪵 added log
// // // // // //     const matchesSearch =
// // // // // //       (seeker.name || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
// // // // // //       (seeker.highest_qualification || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
// // // // // //       (seeker.specialization || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
// // // // // //       (seeker.skills || "").toLowerCase().includes(searchTerm.toLowerCase());
// // // // // //     (seeker.experience_years || "").toLowerCase().includes(searchTerm.toLowerCase());

// // // // // //     return matchesSearch;
// // // // // //   });







// // // // // //   return (
// // // // // //     <div className="space-y-6">
// // // // // //       {/* Subscription Notice */}
// // // // // //       {!hasSubscription && (
// // // // // //         <Card className="border-amber-200 bg-amber-50">
// // // // // //           <CardHeader>
// // // // // //             <CardTitle className="flex items-center gap-2 text-amber-800">
// // // // // //               <Crown className="h-5 w-5" />
// // // // // //               Premium Access Required
// // // // // //             </CardTitle>
// // // // // //             <CardDescription className="text-amber-700">
// // // // // //               Subscribe to access full contact details and premium features for candidate recruitment.
// // // // // //             </CardDescription>
// // // // // //           </CardHeader>
// // // // // //           <CardContent>
// // // // // //             <Button className="bg-amber-600 hover:bg-amber-700">
// // // // // //               Subscribe Now
// // // // // //             </Button>
// // // // // //           </CardContent>
// // // // // //         </Card>
// // // // // //       )}

// // // // // //       {/* Search Section */}
// // // // // //       <Card>
// // // // // //         <CardContent className="p-6">
// // // // // //           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// // // // // //             <div className="relative">
// // // // // //               <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
// // // // // //               <Input
// // // // // //                 placeholder="Search by name, qualification, skills..."
// // // // // //                 value={searchTerm}
// // // // // //                 onChange={(e) => setSearchTerm(e.target.value)}
// // // // // //                 className="pl-10"
// // // // // //               />
// // // // // //             </div>
// // // // // //             <Button className="w-full bg-blue-600 hover:bg-blue-700">
// // // // // //               <Search className="mr-2 h-4 w-4" />
// // // // // //               Search Candidates
// // // // // //             </Button>
// // // // // //           </div>
// // // // // //         </CardContent>
// // // // // //       </Card>

// // // // // //       {/* Results Header */}
// // // // // //       <div className="flex items-center justify-between">
// // // // // //         <h2 className="text-xl font-semibold text-gray-900">
// // // // // //           {filteredSeekers.length} Candidate{filteredSeekers.length !== 1 ? 's' : ''} Found
// // // // // //         </h2>
// // // // // //         <div className="flex gap-2">
// // // // // //           <Badge variant="outline">All Specializations</Badge>
// // // // // //           <Badge variant="outline">Available Now</Badge>
// // // // // //           <Badge variant="outline">Experienced</Badge>
// // // // // //         </div>
// // // // // //       </div>

// // // // // //       {/* Candidate Profiles */}
// // // // // //       <div className="grid gap-6">
// // // // // //         {filteredSeekers.map((seeker) => (
// // // // // //           <Card key={seeker.id} className="hover:shadow-lg transition-shadow">
// // // // // //             <CardHeader>
// // // // // //               <div className="flex items-start justify-between">
// // // // // //                 <div className="space-y-2">
// // // // // //                   <CardTitle className="text-xl text-blue-600 flex items-center gap-2">
// // // // // //                     <User className="h-5 w-5" />
// // // // // //                     {seeker.name}
// // // // // //                   </CardTitle>
// // // // // //                   <CardDescription className="text-lg font-medium text-gray-900">
// // // // // //                     {seeker.qualification}
// // // // // //                   </CardDescription>
// // // // // //                 </div>
// // // // // //                 <Button variant="outline" size="sm">
// // // // // //                   Contact Candidate
// // // // // //                 </Button>
// // // // // //               </div>
// // // // // //             </CardHeader>
// // // // // //             <CardContent>
// // // // // //               <div className="space-y-4">
// // // // // //                 {/* Professional Details */}
// // // // // //                 <div className="flex flex-wrap gap-4 text-sm text-gray-600">
// // // // // //                   <div className="flex items-center">
// // // // // //                     <GraduationCap className="mr-1 h-4 w-4" />
// // // // // //                     {seeker.
// // // // // //                       highest_qualification}
// // // // // //                   </div>
// // // // // //                   <div className="flex items-center">
// // // // // //                     <Briefcase className="mr-1 h-4 w-4" />
// // // // // //                     {seeker.years_of_experience} years experience
// // // // // //                   </div>
// // // // // //                   <div className="flex items-center">
// // // // // //                     <MapPin className="mr-1 h-4 w-4" />
// // // // // //                     {seeker.current_location
// // // // // // }
// // // // // //                   </div>
// // // // // //                 </div>

// // // // // //                 {/* Contact Information */}
// // // // // //                 <div className="space-y-2">
// // // // // //                   <h4 className="font-medium text-gray-900">Contact Information:</h4>
// // // // // //                   <div className="space-y-1">
// // // // // //                     <p className="text-sm text-gray-600">
// // // // // //                       Email: {hasSubscription ? seeker.email : "***@***.com"}
// // // // // //                       {!hasSubscription && <Lock className="inline h-3 w-3 ml-1 text-amber-500" />}
// // // // // //                     </p>
// // // // // //                     <p className="text-sm text-gray-600">
// // // // // //                       Phone: {hasSubscription ? seeker.phone : "+1 (***) ***-****"}
// // // // // //                       {!hasSubscription && <Lock className="inline h-3 w-3 ml-1 text-amber-500" />}
// // // // // //                     </p>
// // // // // //                   </div>
// // // // // //                 </div>

// // // // // //                 {/* Skills */}
// // // // // //                 <div>
// // // // // //                   <h4 className="font-medium text-gray-900 mb-2">Key Skills:</h4>
// // // // // //                   <div className="flex flex-wrap gap-2">
// // // // // //                     {(seeker.skills || []).map((skill, index) => (
// // // // // //                       <Badge key={index} variant="secondary" className="bg-green-100 text-green-800">
// // // // // //                         {skill}
// // // // // //                       </Badge>
// // // // // //                     ))}
// // // // // //                   </div>
// // // // // //                 </div>


// // // // // //                 {/* Availability */}
// // // // // //                 <div className="bg-gray-50 p-3 rounded-md">
// // // // // //                   <span className="font-medium text-gray-900">Availability: </span>
// // // // // //                   <span className="text-gray-700">{seeker.availability}</span>
// // // // // //                 </div>

// // // // // //                 {/* Action Buttons */}
// // // // // //                 <div className="flex gap-3 pt-4">
// // // // // //                   <Button className="bg-blue-600 hover:bg-blue-700">
// // // // // //                     {hasSubscription ? "Contact Now" : "Subscribe to Contact"}
// // // // // //                   </Button>
// // // // // //                   <Button variant="outline">
// // // // // //                     Save Candidate
// // // // // //                   </Button>
// // // // // //                   <Button variant="ghost" size="sm">
// // // // // //                     View Full Profile
// // // // // //                   </Button>
// // // // // //                 </div>
// // // // // //               </div>
// // // // // //             </CardContent>
// // // // // //           </Card>
// // // // // //         ))}
// // // // // //       </div>

// // // // // //       {/* Load More */}
// // // // // //       <div className="text-center">
// // // // // //         <Button variant="outline" size="lg">
// // // // // //           Load More Candidates
// // // // // //         </Button>
// // // // // //       </div>
// // // // // //     </div>
// // // // // //   );
// // // // // // };





// // // // // // import { useEffect, useState } from "react";
// // // // // // import { Button } from "@/components/ui/button";
// // // // // // import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// // // // // // import { Input } from "@/components/ui/input";
// // // // // // import { Badge } from "@/components/ui/badge";
// // // // // // import { Search, MapPin, GraduationCap, Briefcase, User, Lock, Crown } from "lucide-react";
// // // // // // import { supabase } from "@/integrations/supabase/client";

// // // // // // export const JobSeekerProfiles = () => {
// // // // // //   const [searchTerm, setSearchTerm] = useState("");
// // // // // //   const [hasSubscription, setHasSubscription] = useState(false); // This would come from user data
// // // // // //   const [jobSeeker, setJobSeeker] = useState([]); // ✅ never undefined or null






// // // // // //   useEffect(() => {
// // // // // //     const fetchJobSeekerProfile = async () => {
// // // // // //       console.log("📡 Fetching job seeker profile...");

// // // // // //       const {
// // // // // //         data: { user },
// // // // // //         error: userError,
// // // // // //       } = await supabase.auth.getUser();

// // // // // //       if (userError) {
// // // // // //         console.error("❌ Error getting user:", userError);
// // // // // //         return;
// // // // // //       }

// // // // // //       if (!user) {
// // // // // //         console.warn("⚠️ No user logged in.");
// // // // // //         return;
// // // // // //       }

// // // // // //       const { data, error } = await supabase
// // // // // //         .from("job_seekers")
// // // // // //         .select("*")

// // // // // //         .eq("user_id", user.id)


// // // // // //         .eq("user_id", user.id)

// // // // // //         .eq("user_id", user.id)  // Get the logged-in user's data



// // // // // //       if (error) {
// // // // // //         console.error("❌ Error fetching job seeker profile:", error);
// // // // // //       } else {
// // // // // //         console.log("✅ Job seeker profileeeeeeeeeeeeeeee:", data);
// // // // // //         setJobSeeker(data);  // store the first (and only) profile

// // // // // //       }
// // // // // //     };

// // // // // //     fetchJobSeekerProfile();
// // // // // //   }, []);


// // // // // //   const filteredSeekers = jobSeeker.filter(seeker => {

// // // // // //     // console.log("Checking seeker:", seeker); // 🪵 added log


// // // // // //     // console.log("Checking seeker:", seeker); // 🪵 added log

// // // // // //     console.log("Checking seeker:", seeker); // 🪵 added log


// // // // // //     const matchesSearch =
// // // // // //       (seeker.name || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
// // // // // //       (seeker.highest_qualification || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
// // // // // //       (seeker.specialization || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
// // // // // //       (seeker.skills || "").toLowerCase().includes(searchTerm.toLowerCase());
// // // // // //     (seeker.experience_years || "").toLowerCase().includes(searchTerm.toLowerCase());

// // // // // //     return matchesSearch;
// // // // // //   });







// // // // // //   return (
// // // // // //     <div className="space-y-6">
// // // // // //       {/* Subscription Notice */}
// // // // // //       {!hasSubscription && (
// // // // // //         <Card className="border-amber-200 bg-amber-50">
// // // // // //           <CardHeader>
// // // // // //             <CardTitle className="flex items-center gap-2 text-amber-800">
// // // // // //               <Crown className="h-5 w-5" />
// // // // // //               Premium Access Required
// // // // // //             </CardTitle>
// // // // // //             <CardDescription className="text-amber-700">
// // // // // //               Subscribe to access full contact details and premium features for candidate recruitment.
// // // // // //             </CardDescription>
// // // // // //           </CardHeader>
// // // // // //           <CardContent>
// // // // // //             <Button className="bg-amber-600 hover:bg-amber-700">
// // // // // //               Subscribe Now
// // // // // //             </Button>
// // // // // //           </CardContent>
// // // // // //         </Card>
// // // // // //       )}

// // // // // //       {/* Search Section */}
// // // // // //       <Card>
// // // // // //         <CardContent className="p-6">
// // // // // //           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// // // // // //             <div className="relative">
// // // // // //               <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
// // // // // //               <Input
// // // // // //                 placeholder="Search by name, qualification, skills..."
// // // // // //                 value={searchTerm}
// // // // // //                 onChange={(e) => setSearchTerm(e.target.value)}
// // // // // //                 className="pl-10"
// // // // // //               />
// // // // // //             </div>
// // // // // //             <Button className="w-full bg-blue-600 hover:bg-blue-700">
// // // // // //               <Search className="mr-2 h-4 w-4" />
// // // // // //               Search Candidates
// // // // // //             </Button>
// // // // // //           </div>
// // // // // //         </CardContent>
// // // // // //       </Card>

// // // // // //       {/* Results Header */}
// // // // // //       <div className="flex items-center justify-between">
// // // // // //         <h2 className="text-xl font-semibold text-gray-900">
// // // // // //           {filteredSeekers.length} Candidate{filteredSeekers.length !== 1 ? 's' : ''} Found
// // // // // //         </h2>
// // // // // //         <div className="flex gap-2">
// // // // // //           <Badge variant="outline">All Specializations</Badge>
// // // // // //           <Badge variant="outline">Available Now</Badge>
// // // // // //           <Badge variant="outline">Experienced</Badge>
// // // // // //         </div>
// // // // // //       </div>

// // // // // //       {/* Candidate Profiles */}
// // // // // //       <div className="grid gap-6">
// // // // // //         {filteredSeekers.map((seeker) => (
// // // // // //           <Card key={seeker.id} className="hover:shadow-lg transition-shadow">
// // // // // //             <CardHeader>
// // // // // //               <div className="flex items-start justify-between">
// // // // // //                 <div className="space-y-2">
// // // // // //                   <CardTitle className="text-xl text-blue-600 flex items-center gap-2">
// // // // // //                     <User className="h-5 w-5" />
// // // // // //                     {seeker.name}
// // // // // //                   </CardTitle>
// // // // // //                   <CardDescription className="text-lg font-medium text-gray-900">
// // // // // //                     {seeker.qualification}
// // // // // //                   </CardDescription>
// // // // // //                 </div>
// // // // // //                 <Button variant="outline" size="sm">
// // // // // //                   Contact Candidate
// // // // // //                 </Button>
// // // // // //               </div>
// // // // // //             </CardHeader>
// // // // // //             <CardContent>
// // // // // //               <div className="space-y-4">
// // // // // //                 {/* Professional Details */}
// // // // // //                 <div className="flex flex-wrap gap-4 text-sm text-gray-600">
// // // // // //                   <div className="flex items-center">
// // // // // //                     <GraduationCap className="mr-1 h-4 w-4" />
// // // // // //                     {seeker.
// // // // // //                       highest_qualification}
// // // // // //                   </div>
// // // // // //                   <div className="flex items-center">
// // // // // //                     <Briefcase className="mr-1 h-4 w-4" />
// // // // // //                     {seeker.years_of_experience} years experience
// // // // // //                   </div>
// // // // // //                   <div className="flex items-center">
// // // // // //                     <MapPin className="mr-1 h-4 w-4" />
// // // // // //                     {seeker.current_location
// // // // // // }
// // // // // //                   </div>
// // // // // //                 </div>

// // // // // //                 {/* Contact Information */}
// // // // // //                 <div className="space-y-2">
// // // // // //                   <h4 className="font-medium text-gray-900">Contact Information:</h4>
// // // // // //                   <div className="space-y-1">
// // // // // //                     <p className="text-sm text-gray-600">
// // // // // //                       Email: {hasSubscription ? seeker.email : "***@***.com"}
// // // // // //                       {!hasSubscription && <Lock className="inline h-3 w-3 ml-1 text-amber-500" />}
// // // // // //                     </p>
// // // // // //                     <p className="text-sm text-gray-600">
// // // // // //                       Phone: {hasSubscription ? seeker.phone : "+1 (***) ***-****"}
// // // // // //                       {!hasSubscription && <Lock className="inline h-3 w-3 ml-1 text-amber-500" />}
// // // // // //                     </p>
// // // // // //                   </div>
// // // // // //                 </div>

// // // // // //                 {/* Skills */}
// // // // // //                 <div>
// // // // // //                   <h4 className="font-medium text-gray-900 mb-2">Key Skills:</h4>
// // // // // //                   <div className="flex flex-wrap gap-2">
// // // // // //                     {(seeker.skills || []).map((skill, index) => (
// // // // // //                       <Badge key={index} variant="secondary" className="bg-green-100 text-green-800">
// // // // // //                         {skill}
// // // // // //                       </Badge>
// // // // // //                     ))}
// // // // // //                   </div>
// // // // // //                 </div>


// // // // // //                 {/* Availability */}
// // // // // //                 <div className="bg-gray-50 p-3 rounded-md">
// // // // // //                   <span className="font-medium text-gray-900">Availability: </span>
// // // // // //                   <span className="text-gray-700">{seeker.availability}</span>
// // // // // //                 </div>

// // // // // //                 {/* Action Buttons */}
// // // // // //                 <div className="flex gap-3 pt-4">
// // // // // //                   <Button className="bg-blue-600 hover:bg-blue-700">
// // // // // //                     {hasSubscription ? "Contact Now" : "Subscribe to Contact"}
// // // // // //                   </Button>
// // // // // //                   <Button variant="outline">
// // // // // //                     Save Candidate
// // // // // //                   </Button>
// // // // // //                   <Button variant="ghost" size="sm">
// // // // // //                     View Full Profile
// // // // // //                   </Button>
// // // // // //                 </div>
// // // // // //               </div>
// // // // // //             </CardContent>
// // // // // //           </Card>
// // // // // //         ))}
// // // // // //       </div>

// // // // // //       {/* Load More */}
// // // // // //       <div className="text-center">
// // // // // //         <Button variant="outline" size="lg">
// // // // // //           Load More Candidates
// // // // // //         </Button>
// // // // // //       </div>
// // // // // //     </div>
// // // // // //   );
// // // // // // };





// // // // // // import { useEffect, useState, useRef } from "react";


// // // // // import { useEffect, useState, useRef } from "react";



// // // // // // import { useEffect, useState } from "react";


// // // // // import { Button } from "@/components/ui/button";
// // // // // import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// // // // // import { Input } from "@/components/ui/input";
// // // // // import { Badge } from "@/components/ui/badge";
// // // // // import { Search, MapPin, GraduationCap, Briefcase, User, Lock, Crown } from "lucide-react";
// // // // // import { supabase } from "@/integrations/supabase/client";
// // // // // import {
// // // // //   Dialog,
// // // // //   DialogTrigger,
// // // // //   DialogContent,
// // // // //   DialogHeader,
// // // // //   DialogTitle,
// // // // //   DialogDescription,
// // // // //   DialogFooter,
// // // // // } from "@/components/ui/dialog";
// // // // // import { useToast } from "@/hooks/use-toast";




// // // // // export const JobSeekerProfiles = () => {
// // // // //   const [searchTerm, setSearchTerm] = useState("");
// // // // //   const [hasSubscription, setHasSubscription] = useState(false);
// // // // //   const [jobSeeker, setJobSeeker] = useState([]);
// // // // //   const [selectedSeeker, setSelectedSeeker] = useState(null);
// // // // //   const { toast } = useToast();
// // // // //   // 🔍 Ref for smooth scroll









// // // // //   useEffect(() => {
// // // // //     const fetchJobSeekerProfile = async () => {
// // // // //       console.log("📡 Fetching job seeker profile...");

// // // // //       const {
// // // // //         data: { user },
// // // // //         error: userError,
// // // // //       } = await supabase.auth.getUser();

// // // // //       if (userError || !user) {
// // // // //         console.error("❌ Error getting user:", userError || "No user found");


// // // // //       if (userError) {
// // // // //         console.error("❌ Error getting user:", userError);
// // // // //         return;
// // // // //       }

// // // // //       if (!user) {
// // // // //         console.warn("⚠️ No user logged in.");


// // // // //         return;
// // // // //       }

// // // // //       const { data, error } = await supabase
// // // // //         .from("job_seekers")
// // // // //         .select("*")

// // // // //         .eq("user_id", user.id);


       



// // // // //       if (error) {
// // // // //         console.error("❌ Error fetching job seeker profile:", error);
// // // // //       } else {

// // // // //         setJobSeeker(data);


// // // // //         setJobSeeker(data);

// // // // //         console.log("✅ Job seeker profileeeeeeeeeeeeeeee:", data);
// // // // //         setJobSeeker(data);  // store the first (and only) profile


// // // // //       }
// // // // //     };

// // // // //     fetchJobSeekerProfile();
// // // // //   }, []);

// // // // //   const filteredSeekers = jobSeeker.filter((seeker) => {
// // // // //     const term = searchTerm.toLowerCase();
// // // // //     return (
// // // // //       (seeker.name || "").toLowerCase().includes(term) ||
// // // // //       (seeker.highest_qualification || "").toLowerCase().includes(term) ||
// // // // //       (seeker.specialization || "").toLowerCase().includes(term) ||
// // // // //       (seeker.skills || "").toLowerCase().includes(term)
// // // // //     );
// // // // //   });


// // // // //   const filteredSeekers = jobSeeker.filter((seeker) => {
// // // // //     const term = searchTerm.toLowerCase();
// // // // //     return (
// // // // //       (seeker.name || "").toLowerCase().includes(term) ||
// // // // //       (seeker.highest_qualification || "").toLowerCase().includes(term) ||
// // // // //       (seeker.specialization || "").toLowerCase().includes(term) ||
// // // // //       (seeker.skills || "").toLowerCase().includes(term)
// // // // //     );
// // // // //   });


// // // // //   const handleSaveCandidate = async (seekerId) => {
// // // // //     const { data: { user }, error: userError } = await supabase.auth.getUser();

// // // // //     if (userError || !user) {
// // // // //       toast({ title: "Error", description: "User not logged in", variant: "destructive" });
// // // // //       return;
// // // // //     }

// // // // //     const { data: existing } = await supabase
// // // // //       .from("save_profiles")
// // // // //       .select("id")
// // // // //       .eq("user_id", user.id)
// // // // //       .eq("job_seekers_id", seekerId)
// // // // //       .maybeSingle();

// // // // //     if (existing) {
// // // // //       toast({ title: "Already Saved", description: "This profile is already saved." });
// // // // //       return;
// // // // //     }

// // // // //     const { error } = await supabase.from("save_profiles").insert({
// // // // //       user_id: user.id,
// // // // //       job_seekers_id: seekerId,
// // // // //     });

// // // // //     if (error) {
// // // // //       console.error("Save error:", error.message);
// // // // //       toast({ title: "Error", description: "Could not save candidate", variant: "destructive" });
// // // // //     } else {
// // // // //       toast({ title: "Saved", description: "Candidate saved successfully." });
// // // // //     }
// // // // //   };



// // // // //   const filteredSeekers = jobSeeker.filter(seeker => {
// // // // //     // console.log("Checking seeker:", seeker); // 🪵 added log
// // // // //     const matchesSearch =
// // // // //       (seeker.name || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
// // // // //       (seeker.highest_qualification || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
// // // // //       (seeker.specialization || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
// // // // //       (seeker.skills || "").toLowerCase().includes(searchTerm.toLowerCase());
// // // // //     (seeker.experience_years || "").toLowerCase().includes(searchTerm.toLowerCase());


// // // // //   const handleSaveCandidate = async (seekerId) => {
// // // // //     const { data: { user }, error: userError } = await supabase.auth.getUser();

// // // // //     if (userError || !user) {
// // // // //       toast({ title: "Error", description: "User not logged in", variant: "destructive" });
// // // // //       return;
// // // // //     }

// // // // //     const { data: existing } = await supabase
// // // // //       .from("save_profiles")
// // // // //       .select("id")
// // // // //       .eq("user_id", user.id)
// // // // //       .eq("job_seekers_id", seekerId)
// // // // //       .maybeSingle();

// // // // //     if (existing) {
// // // // //       toast({ title: "Already Saved", description: "This profile is already saved." });
// // // // //       return;
// // // // //     }

// // // // //     const { error } = await supabase.from("save_profiles").insert({
// // // // //       user_id: user.id,
// // // // //       job_seekers_id: seekerId,
// // // // //     });

// // // // //     if (error) {
// // // // //       console.error("Save error:", error.message);
// // // // //       toast({ title: "Error", description: "Could not save candidate", variant: "destructive" });
// // // // //     } else {
// // // // //       toast({ title: "Saved", description: "Candidate saved successfully." });
// // // // //     }
// // // // //   };






// // // // //   return (
// // // // //     <div className="space-y-6">
// // // // //       {!hasSubscription && (
// // // // //         <Card className="border-amber-200 bg-amber-50">
// // // // //           <CardHeader>
// // // // //             <CardTitle className="flex items-center gap-2 text-amber-800">
// // // // //               <Crown className="h-5 w-5" />
// // // // //               Premium Access Required
// // // // //             </CardTitle>
// // // // //             <CardDescription className="text-amber-700">
// // // // //               Subscribe to access full contact details and premium features for candidate recruitment.
// // // // //             </CardDescription>
// // // // //           </CardHeader>
// // // // //           <CardContent>
// // // // //             <Button className="bg-amber-600 hover:bg-amber-700">Subscribe Now</Button>
// // // // //           </CardContent>
// // // // //         </Card>
// // // // //       )}

// // // // //       <Card>
// // // // //         <CardContent className="p-6">
// // // // //           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// // // // //             <div className="relative">
// // // // //               <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
// // // // //               <Input
// // // // //                 placeholder="Search by name, qualification, skills..."
// // // // //                 value={searchTerm}
// // // // //                 onChange={(e) => setSearchTerm(e.target.value)}
// // // // //                 className="pl-10"
// // // // //               />
// // // // //             </div>
// // // // //             <Button className="w-full bg-blue-600 hover:bg-blue-700">
// // // // //               <Search className="mr-2 h-4 w-4" />
// // // // //               Search Candidates
// // // // //             </Button>
// // // // //           </div>
// // // // //         </CardContent>
// // // // //       </Card>

// // // // //       <div className="flex items-center justify-between">
// // // // //         <h2 className="text-xl font-semibold text-gray-900">
// // // // //           {filteredSeekers.length} Candidate{filteredSeekers.length !== 1 ? "s" : ""} Found
// // // // //         </h2>
// // // // //         <div className="flex gap-2">
// // // // //           <Badge variant="outline">All Specializations</Badge>
// // // // //           <Badge variant="outline">Available Now</Badge>
// // // // //           <Badge variant="outline">Experienced</Badge>
// // // // //         </div>
// // // // //       </div>

// // // // //       <div className="grid gap-6">
// // // // //         {filteredSeekers.map((seeker) => (
// // // // //           <Card key={seeker.id} className="hover:shadow-lg transition-shadow">
// // // // //             <CardHeader>
// // // // //               <div className="flex items-start justify-between">
// // // // //                 <div className="space-y-2">
// // // // //                   <CardTitle className="text-xl text-blue-600 flex items-center gap-2">
// // // // //                     <User className="h-5 w-5" />
// // // // //                     {seeker.name}
// // // // //                   </CardTitle>
// // // // //                   <CardDescription className="text-lg font-medium text-gray-900">
// // // // //                     {seeker.qualification}
// // // // //                   </CardDescription>
// // // // //                 </div>
// // // // //                 {/* {hasSubscription ? (
// // // // //   <a href={`tel:${seeker.phone}`}>
// // // // //     <Button variant="outline" size="sm">
// // // // //       Contact Candidate
// // // // //     </Button>
// // // // //   </a>
// // // // // ) : (
// // // // //   <Button variant="outline" size="sm" disabled>
// // // // //     Contact Candidate
// // // // //   </Button>
// // // // // )} */}
// // // // //                 <a href={`tel:+91${seeker.phone}`}>
// // // // //                   <Button variant="outline" size="sm">
// // // // //                     Contact Candidate
// // // // //                   </Button>
// // // // //                 </a>



// // // // //               </div>
// // // // //             </CardHeader>
// // // // //             <CardContent>
// // // // //               <div className="space-y-4">
// // // // //                 <div className="flex flex-wrap gap-4 text-sm text-gray-600">
// // // // //                   <div className="flex items-center">
// // // // //                     <GraduationCap className="mr-1 h-4 w-4" />

// // // // //                     {seeker.highest_qualification}


// // // // //                     {seeker.highest_qualification}

// // // // //                     {seeker.
// // // // //                       highest_qualification}

// // // // //                   </div>
// // // // //                   <div className="flex items-center">
// // // // //                     <Briefcase className="mr-1 h-4 w-4" />
// // // // //                     {seeker.years_of_experience} years experience
// // // // //                   </div>
// // // // //                   <div className="flex items-center">
// // // // //                     <MapPin className="mr-1 h-4 w-4" />

// // // // //                     {seeker.current_location}


// // // // //                     {seeker.current_location}

// // // // //                     {seeker.current_location
// // // // // }


// // // // //                   </div>
// // // // //                 </div>

// // // // //                 <div className="space-y-2">
// // // // //                   <h4 className="font-medium text-gray-900">Contact Information:</h4>
// // // // //                   <div className="space-y-1">
// // // // //                     <p className="text-sm text-gray-600">
// // // // //                       Email: {hasSubscription ? seeker.email : "***@***.com"}
// // // // //                       {!hasSubscription && <Lock className="inline h-3 w-3 ml-1 text-amber-500" />}
// // // // //                     </p>
// // // // //                     <p className="text-sm text-gray-600">
// // // // //                       Phone: {hasSubscription ? seeker.phone : "+1 (***) ***-****"}
// // // // //                       {!hasSubscription && <Lock className="inline h-3 w-3 ml-1 text-amber-500" />}
// // // // //                     </p>
// // // // //                   </div>
// // // // //                 </div>

// // // // //                 <div>
// // // // //                   <h4 className="font-medium text-gray-900 mb-2">Key Skills:</h4>
// // // // //                   <div className="flex flex-wrap gap-2">
// // // // //                     {(seeker.skills || []).map((skill, index) => (
// // // // //                       <Badge key={index} variant="secondary" className="bg-green-100 text-green-800">
// // // // //                         {skill}
// // // // //                       </Badge>
// // // // //                     ))}
// // // // //                   </div>
// // // // //                 </div>




// // // // //                 {/* Availability */}


// // // // //                 <div className="bg-gray-50 p-3 rounded-md">
// // // // //                   <span className="font-medium text-gray-900">Availability: </span>
// // // // //                   <span className="text-gray-700">{seeker.availability}</span>
// // // // //                 </div>

// // // // //                 <div className="flex gap-3 pt-4">
// // // // //                   <Button className="bg-blue-600 hover:bg-blue-700">
// // // // //                     {hasSubscription ? "Contact Now" : "Subscribe to Contact"}
// // // // //                   </Button>
// // // // //                   <Button variant="outline" onClick={() => handleSaveCandidate(seeker.id)}>
// // // // //                     Save Candidate
// // // // //                   </Button>


// // // // //                   <Button variant="ghost" size="sm" onClick={() => setSelectedSeeker(seeker)}>
// // // // //                     View Full Profile
// // // // //                   </Button>

// // // // //                 </div>
// // // // //               </div>
// // // // //             </CardContent>
// // // // //           </Card>
// // // // //         ))}
// // // // //       </div>

// // // // //       {/* Full Profile Section with ref */}
// // // // //       <Dialog open={!!selectedSeeker} onOpenChange={(open) => !open && setSelectedSeeker(null)}>
// // // // //         <DialogContent className="max-w-2xl">
// // // // //           {selectedSeeker && (
// // // // //             <>
// // // // //               <DialogHeader>
// // // // //                 <DialogTitle>{selectedSeeker.name} Full Profile</DialogTitle>
// // // // //                 <DialogDescription>
// // // // //                   {selectedSeeker.highest_qualification || "No qualification info"}
// // // // //                 </DialogDescription>
// // // // //               </DialogHeader>

// // // // //               <div className="space-y-3 mt-4">
// // // // //                 <p><strong>Email:</strong> {selectedSeeker.email}</p>
// // // // //                 <p><strong>Phone:</strong> {selectedSeeker.phone}</p>
// // // // //                 <p><strong>Experience:</strong> {selectedSeeker.years_of_experience} years</p>
// // // // //                 <p><strong>Location:</strong> {selectedSeeker.current_location}</p>
// // // // //                 <p><strong>Availability:</strong> {selectedSeeker.availability}</p>
// // // // //                 <p><strong>Specialization:</strong> {selectedSeeker.specialization}</p>

// // // // //                 <div>
// // // // //                   <strong>Skills:</strong>
// // // // //                   <div className="flex flex-wrap gap-2 mt-1">
// // // // //                     {(selectedSeeker.skills || []).map((skill, index) => (
// // // // //                       <Badge key={index} variant="secondary" className="bg-green-100 text-green-800">
// // // // //                         {skill}
// // // // //                       </Badge>
// // // // //                     ))}
// // // // //                   </div>
// // // // //                 </div>
// // // // //               </div>

// // // // //               <DialogFooter className="mt-6">
// // // // //                 <Button variant="outline" onClick={() => setSelectedSeeker(null)}>
// // // // //                   Close
// // // // //                 </Button>
// // // // //               </DialogFooter>
// // // // //             </>
// // // // //           )}
// // // // //         </DialogContent>
// // // // //       </Dialog>


// // // // //       <div className="text-center">
// // // // //         <Button variant="outline" size="lg">
// // // // //           Load More Candidates
// // // // //         </Button>
// // // // //       </div>
// // // // //     </div>
// // // // //   );
// // // // // };

// // // // import { useEffect, useState, useRef } from "react";
// // // // import { Button } from "@/components/ui/button";
// // // // import {
// // // //   Card,
// // // //   CardContent,
// // // //   CardDescription,
// // // //   CardHeader,
// // // //   CardTitle,
// // // // } from "@/components/ui/card";
// // // // import { Input } from "@/components/ui/input";
// // // // import { Badge } from "@/components/ui/badge";
// // // // import {
// // // //   Search,
// // // //   MapPin,
// // // //   GraduationCap,
// // // //   Briefcase,
// // // //   User,
// // // //   Lock,
// // // //   Crown,
// // // // } from "lucide-react";
// // // // import { supabase } from "@/integrations/supabase/client";
// // // // import {
// // // //   Dialog,
// // // //   DialogTrigger,
// // // //   DialogContent,
// // // //   DialogHeader,
// // // //   DialogTitle,
// // // //   DialogDescription,
// // // //   DialogFooter,
// // // // } from "@/components/ui/dialog";
// // // // import { useToast } from "@/hooks/use-toast";

// // // // export const JobSeekerProfiles = () => {
// // // //   const [searchTerm, setSearchTerm] = useState("");
// // // //   const [hasSubscription, setHasSubscription] = useState(false);
// // // //   const [jobSeeker, setJobSeeker] = useState([]);
// // // //   const [selectedSeeker, setSelectedSeeker] = useState(null);
// // // //   const { toast } = useToast();
// // // //   // 🔍 Ref for smooth scroll

// // // //   useEffect(() => {
// // // //     const fetchJobSeekerProfile = async () => {
// // // //       console.log("📡 Fetching job seeker profile...");

// // // //       const {
// // // //         data: { user },
// // // //         error: userError,
// // // //       } = await supabase.auth.getUser();

// // // //       if (userError || !user) {
// // // //         console.error("❌ Error getting user:", userError || "No user found");
// // // //         return;
// // // //       }

// // // //       const { data, error } = await supabase
// // // //         .from("job_seekers")
// // // //         .select("*")
// // // //         .eq("user_id", user.id);

// // // //       if (error) {
// // // //         console.error("❌ Error fetching job seeker profile:", error);
// // // //       } else {
// // // //         setJobSeeker(data);
// // // //       }
// // // //     };

// // // //     fetchJobSeekerProfile();
// // // //   }, []);

// // // //   const filteredSeekers = jobSeeker.filter((seeker) => {
// // // //     const term = searchTerm.toLowerCase();
// // // //     return (
// // // //       (seeker.name || "").toLowerCase().includes(term) ||
// // // //       (seeker.highest_qualification || "").toLowerCase().includes(term) ||
// // // //       (seeker.specialization || "").toLowerCase().includes(term) ||
// // // //       (seeker.skills || "").toLowerCase().includes(term)
// // // //     );
// // // //   });

// // // //   const handleSaveCandidate = async (seekerId) => {
// // // //     const {
// // // //       data: { user },
// // // //       error: userError,
// // // //     } = await supabase.auth.getUser();

// // // //     if (userError || !user) {
// // // //       toast({
// // // //         title: "Error",
// // // //         description: "User not logged in",
// // // //         variant: "destructive",
// // // //       });
// // // //       return;
// // // //     }

// // // //     const { data: existing } = await supabase
// // // //       .from("save_profiles")
// // // //       .select("id")
// // // //       .eq("user_id", user.id)
// // // //       .eq("job_seekers_id", seekerId)
// // // //       .maybeSingle();

// // // //     if (existing) {
// // // //       toast({
// // // //         title: "Already Saved",
// // // //         description: "This profile is already saved.",
// // // //       });
// // // //       return;
// // // //     }

// // // //     const { error } = await supabase.from("save_profiles").insert({
// // // //       user_id: user.id,
// // // //       job_seekers_id: seekerId,
// // // //     });

// // // //     if (error) {
// // // //       console.error("Save error:", error.message);
// // // //       toast({
// // // //         title: "Error",
// // // //         description: "Could not save candidate",
// // // //         variant: "destructive",
// // // //       });
// // // //     } else {
// // // //       toast({ title: "Saved", description: "Candidate saved successfully." });
// // // //     }
// // // //   };

// // // //   return (
// // // //     <div className="space-y-6">
// // // //       {!hasSubscription && (
// // // //         <Card className="border-amber-200 bg-amber-50">
// // // //           <CardHeader>
// // // //             <CardTitle className="flex items-center gap-2 text-amber-800">
// // // //               <Crown className="h-5 w-5" />
// // // //               Premium Access Required
// // // //             </CardTitle>
// // // //             <CardDescription className="text-amber-700">
// // // //               Subscribe to access full contact details and premium features for
// // // //               candidate recruitment.
// // // //             </CardDescription>
// // // //           </CardHeader>
// // // //           <CardContent>
// // // //             <Button className="bg-amber-600 hover:bg-amber-700">
// // // //               Subscribe Now
// // // //             </Button>
// // // //           </CardContent>
// // // //         </Card>
// // // //       )}

// // // //       <Card>
// // // //         <CardContent className="p-6">
// // // //           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// // // //             <div className="relative">
// // // //               <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
// // // //               <Input
// // // //                 placeholder="Search by name, qualification, skills..."
// // // //                 value={searchTerm}
// // // //                 onChange={(e) => setSearchTerm(e.target.value)}
// // // //                 className="pl-10"
// // // //               />
// // // //             </div>
// // // //             <Button className="w-full bg-blue-600 hover:bg-blue-700">
// // // //               <Search className="mr-2 h-4 w-4" />
// // // //               Search Candidates
// // // //             </Button>
// // // //           </div>
// // // //         </CardContent>
// // // //       </Card>

// // // //       <div className="flex items-center justify-between">
// // // //         <h2 className="text-xl font-semibold text-gray-900">
// // // //           {filteredSeekers.length} Candidate
// // // //           {filteredSeekers.length !== 1 ? "s" : ""} Found
// // // //         </h2>
// // // //         <div className="flex gap-2">
// // // //           <Badge variant="outline">All Specializations</Badge>
// // // //           <Badge variant="outline">Available Now</Badge>
// // // //           <Badge variant="outline">Experienced</Badge>
// // // //         </div>
// // // //       </div>

// // // //       <div className="grid gap-6">
// // // //         {filteredSeekers.map((seeker) => (
// // // //           <Card key={seeker.id} className="hover:shadow-lg transition-shadow">
// // // //             <CardHeader>
// // // //               <div className="flex items-start justify-between">
// // // //                 <div className="space-y-2">
// // // //                   <CardTitle className="text-xl text-blue-600 flex items-center gap-2">
// // // //                     <User className="h-5 w-5" />
// // // //                     {seeker.name}
// // // //                   </CardTitle>
// // // //                   <CardDescription className="text-lg font-medium text-gray-900">
// // // //                     {seeker.qualification}
// // // //                   </CardDescription>
// // // //                 </div>
// // // //                 {/* {hasSubscription ? (
// // // //   <a href={`tel:${seeker.phone}`}>
// // // //     <Button variant="outline" size="sm">
// // // //       Contact Candidate
// // // //     </Button>
// // // //   </a>
// // // // ) : (
// // // //   <Button variant="outline" size="sm" disabled>
// // // //     Contact Candidate
// // // //   </Button>
// // // // )} */}
// // // //                 <a href={`tel:+91${seeker.phone}`}>
// // // //                   <Button variant="outline" size="sm">
// // // //                     Contact Candidate
// // // //                   </Button>
// // // //                 </a>
// // // //               </div>
// // // //             </CardHeader>
// // // //             <CardContent>
// // // //               <div className="space-y-4">
// // // //                 <div className="flex flex-wrap gap-4 text-sm text-gray-600">
// // // //                   <div className="flex items-center">
// // // //                     <GraduationCap className="mr-1 h-4 w-4" />
// // // //                     {seeker.highest_qualification}
// // // //                   </div>
// // // //                   <div className="flex items-center">
// // // //                     <Briefcase className="mr-1 h-4 w-4" />
// // // //                     {seeker.years_of_experience} years experience
// // // //                   </div>
// // // //                   <div className="flex items-center">
// // // //                     <MapPin className="mr-1 h-4 w-4" />
// // // //                     {seeker.current_location}
// // // //                   </div>
// // // //                 </div>

// // // //                 <div className="space-y-2">
// // // //                   <h4 className="font-medium text-gray-900">
// // // //                     Contact Information:
// // // //                   </h4>
// // // //                   <div className="space-y-1">
// // // //                     <p className="text-sm text-gray-600">
// // // //                       Email: {hasSubscription ? seeker.email : "***@***.com"}
// // // //                       {!hasSubscription && (
// // // //                         <Lock className="inline h-3 w-3 ml-1 text-amber-500" />
// // // //                       )}
// // // //                     </p>
// // // //                     <p className="text-sm text-gray-600">
// // // //                       Phone:{" "}
// // // //                       {hasSubscription ? seeker.phone : "+1 (***) ***-****"}
// // // //                       {!hasSubscription && (
// // // //                         <Lock className="inline h-3 w-3 ml-1 text-amber-500" />
// // // //                       )}
// // // //                     </p>
// // // //                   </div>
// // // //                 </div>

// // // //                 <div>
// // // //                   <h4 className="font-medium text-gray-900 mb-2">
// // // //                     Key Skills:
// // // //                   </h4>
// // // //                   <div className="flex flex-wrap gap-2">
// // // //                     {(seeker.skills || []).map((skill, index) => (
// // // //                       <Badge
// // // //                         key={index}
// // // //                         variant="secondary"
// // // //                         className="bg-green-100 text-green-800"
// // // //                       >
// // // //                         {skill}
// // // //                       </Badge>
// // // //                     ))}
// // // //                   </div>
// // // //                 </div>

// // // //                 <div className="bg-gray-50 p-3 rounded-md">
// // // //                   <span className="font-medium text-gray-900">
// // // //                     Availability:{" "}
// // // //                   </span>
// // // //                   <span className="text-gray-700">{seeker.availability}</span>
// // // //                 </div>

// // // //                 <div className="flex gap-3 pt-4">
// // // //                   <Button className="bg-blue-600 hover:bg-blue-700">
// // // //                     {hasSubscription ? "Contact Now" : "Subscribe to Contact"}
// // // //                   </Button>
// // // //                   <Button
// // // //                     variant="outline"
// // // //                     onClick={() => handleSaveCandidate(seeker.id)}
// // // //                   >
// // // //                     Save Candidate
// // // //                   </Button>

// // // //                   <Button
// // // //                     variant="ghost"
// // // //                     size="sm"
// // // //                     onClick={() => setSelectedSeeker(seeker)}
// // // //                   >
// // // //                     View Full Profile
// // // //                   </Button>
// // // //                 </div>
// // // //               </div>
// // // //             </CardContent>
// // // //           </Card>
// // // //         ))}
// // // //       </div>

// // // //       {/* Full Profile Section with ref */}
// // // //       <Dialog
// // // //         open={!!selectedSeeker}
// // // //         onOpenChange={(open) => !open && setSelectedSeeker(null)}
// // // //       >
// // // //         <DialogContent className="max-w-2xl">
// // // //           {selectedSeeker && (
// // // //             <>
// // // //               <DialogHeader>
// // // //                 <DialogTitle>{selectedSeeker.name} Full Profile</DialogTitle>
// // // //                 <DialogDescription>
// // // //                   {selectedSeeker.highest_qualification ||
// // // //                     "No qualification info"}
// // // //                 </DialogDescription>
// // // //               </DialogHeader>

// // // //               <div className="space-y-3 mt-4">
// // // //                 <p>
// // // //                   <strong>Email:</strong> {selectedSeeker.email}
// // // //                 </p>
// // // //                 <p>
// // // //                   <strong>Phone:</strong> {selectedSeeker.phone}
// // // //                 </p>
// // // //                 <p>
// // // //                   <strong>Experience:</strong>{" "}
// // // //                   {selectedSeeker.years_of_experience} years
// // // //                 </p>
// // // //                 <p>
// // // //                   <strong>Location:</strong> {selectedSeeker.current_location}
// // // //                 </p>
// // // //                 <p>
// // // //                   <strong>Availability:</strong> {selectedSeeker.availability}
// // // //                 </p>
// // // //                 <p>
// // // //                   <strong>Specialization:</strong>{" "}
// // // //                   {selectedSeeker.specialization}
// // // //                 </p>

// // // //                 <div>
// // // //                   <strong>Skills:</strong>
// // // //                   <div className="flex flex-wrap gap-2 mt-1">
// // // //                     {(selectedSeeker.skills || []).map((skill, index) => (
// // // //                       <Badge
// // // //                         key={index}
// // // //                         variant="secondary"
// // // //                         className="bg-green-100 text-green-800"
// // // //                       >
// // // //                         {skill}
// // // //                       </Badge>
// // // //                     ))}
// // // //                   </div>
// // // //                 </div>
// // // //               </div>

// // // //               <DialogFooter className="mt-6">
// // // //                 <Button
// // // //                   variant="outline"
// // // //                   onClick={() => setSelectedSeeker(null)}
// // // //                 >
// // // //                   Close
// // // //                 </Button>
// // // //               </DialogFooter>
// // // //             </>
// // // //           )}
// // // //         </DialogContent>
// // // //       </Dialog>

// // // //       <div className="text-center">
// // // //         <Button variant="outline" size="lg">
// // // //           Load More Candidates
// // // //         </Button>
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // };


// // // import { useEffect, useState } from "react";
// // // import { Button } from "@/components/ui/button";
// // // import {
// // //   Card,
// // //   CardContent,
// // //   CardDescription,
// // //   CardHeader,
// // //   CardTitle,
// // // } from "@/components/ui/card";
// // // import { Input } from "@/components/ui/input";
// // // import { Badge } from "@/components/ui/badge";
// // // import {
// // //   Search,
// // //   MapPin,
// // //   GraduationCap,
// // //   Briefcase,
// // //   User,
// // //   Lock,
// // //   Crown,
// // //   Phone,
// // //   CheckCircle,
// // // } from "lucide-react";
// // // import { supabase } from "@/integrations/supabase/client";
// // // import {
// // //   Dialog,
// // //   DialogContent,
// // //   DialogHeader,
// // //   DialogTitle,
// // //   DialogDescription,
// // //   DialogFooter,
// // // } from "@/components/ui/dialog";
// // // import { useToast } from "@/hooks/use-toast";

// // // interface JobSeekerProfilesProps {
// // //   setActiveTab?: (tab: string) => void;
// // // }

// // // export const JobSeekerProfiles = ({ setActiveTab }: JobSeekerProfilesProps) => {
// // //   const [searchTerm, setSearchTerm] = useState("");
// // //   const [hasSubscription, setHasSubscription] = useState(false);
// // //   const [jobSeeker, setJobSeeker] = useState([]);
// // //   const [selectedSeeker, setSelectedSeeker] = useState(null);
// // //   const [selectedSeeker1, setSelectedSeeker1] = useState(null);
// // //   const [showPaymentSuccess, setShowPaymentSuccess] = useState(false);
// // //   const { toast } = useToast();
// // //   const [showContactInfo, setShowContactInfo] = useState(false);
// // //   const [contactSeekerId, setContactSeekerId] = useState(null);
// // //   const [isSearching, setIsSearching] = useState(false);

// // //   const handleSearch = () => {
// // //     setIsSearching(true);
// // //     // Your search is already handled by filteredSeekers
// // //     // This just provides visual feedback
// // //     setTimeout(() => setIsSearching(false), 500);
// // //   };
// // //   //  useEffect(() => {
// // //   //    const fetchData = async () => {
// // //   //      const {
// // //   //        data: { user },
// // //   //        error: userError,
// // //   //      } = await supabase.auth.getUser();

// // //   //      if (userError || !user) return;

// // //   //      // Check subscription status
// // //   //      const { data: subscriptionData } = await supabase
// // //   //        .from("provider_subscriptions")
// // //   //        .select("status, end_date")
// // //   //        .eq("user_id", user.id)
// // //   //        .gte("end_date", new Date().toISOString())
// // //   //        .order("end_date", { ascending: false })
// // //   //        .limit(1)
// // //   //        .maybeSingle();

// // //   //      setHasSubscription(subscriptionData?.status === "active");

// // //   //      // Check for payment success in URL params
// // //   //      const urlParams = new URLSearchParams(window.location.search);
// // //   //      const paymentSuccess = urlParams.get("payment_success");
// // //   //      if (paymentSuccess === "true") {
// // //   //        setShowPaymentSuccess(true);
// // //   //        // Clean up the URL
// // //   //        window.history.replaceState(
// // //   //          {},
// // //   //          document.title,
// // //   //          window.location.pathname
// // //   //        );
// // //   //      }

// // //   //      // Fetch job seekers
// // //   //      const { data, error } = await supabase
// // //   //        .from("job_seekers")
// // //   //        .select("*")
// // //   //        .eq("user_id", user.id);

// // //   //      if (!error) setJobSeeker(data);
// // //   //    };

// // //   //    fetchData();
// // //   //  }, []);
// // // useEffect(() => {
// // //   const fetchData = async () => {
// // //     const {
// // //       data: { user },
// // //       error: userError,
// // //     } = await supabase.auth.getUser();

// // //     if (userError || !user) return;

// // //     try {
// // //       // First get the provider record for this user
// // //       const { data: providerData } = await supabase
// // //         .from("job_providers")
// // //         .select("id")
// // //         .eq("user_id", user.id)
// // //         .maybeSingle();

// // //       if (!providerData) {
// // //         // No provider record found - user is not a job provider
// // //         setHasSubscription(false);
// // //         return;
// // //       }

// // //       // Check subscription status using provider_id
// // //       const { data: subscriptionData } = await supabase
// // //         .from("provider_subscriptions")
// // //         .select("status, end_date")
// // //         .eq("provider_id", providerData.id)
// // //         .gte("end_date", new Date().toISOString())
// // //         .order("end_date", { ascending: false })
// // //         .limit(1)
// // //         .maybeSingle();

// // //       setHasSubscription(subscriptionData?.status === "active");

// // //       // Check for payment success in URL params
// // //       const urlParams = new URLSearchParams(window.location.search);
// // //       const paymentSuccess = urlParams.get("payment_success");
// // //       if (paymentSuccess === "true") {
// // //         setShowPaymentSuccess(true);
// // //         // Clean up the URL
// // //         window.history.replaceState(
// // //           {},
// // //           document.title,
// // //           window.location.pathname
// // //         );
// // //       }

// // //       // Fetch job seekers
// // //       const { data, error } = await supabase
// // //         .from("job_seekers")
// // //         .select("*")
// // //         .eq("user_id", user.id);

// // //       if (!error) setJobSeeker(data);
// // //     } catch (error) {
// // //       console.error("Error fetching data:", error);
// // //       toast({
// // //         title: "Error",
// // //         description: "Failed to load data",
// // //         variant: "destructive",
// // //       });
// // //     }
// // //   };

// // //   fetchData();
// // // }, []);
// // //   useEffect(() => {
// // //     const fetchJobSeekerProfile = async () => {
// // //       const {
// // //         data: { user },
// // //         error: userError,
// // //       } = await supabase.auth.getUser();

// // //       if (userError || !user) return;

// // //       const { data, error } = await supabase
// // //         .from("job_seekers")
// // //         .select("*")
// // //         .eq("user_id", user.id);

// // //       if (!error) setJobSeeker(data);
// // //     };

// // //     fetchJobSeekerProfile();
// // //   }, []);
// // //   const handleContactNow = (seeker) => {
// // //     if (hasSubscription) {
// // //       setContactSeekerId(seeker.id);
// // //       setShowContactInfo(true);
// // //     } else {
// // //       setActiveTab("subscription");
// // //     }
// // //   };

// // //   const filteredSeekers = jobSeeker.filter((seeker) => {
// // //     const term = searchTerm.toLowerCase();
// // //     return (
// // //       (seeker.name || "").toLowerCase().includes(term) ||
// // //       (seeker.highest_qualification || "").toLowerCase().includes(term) ||
// // //       (seeker.specialization || "").toLowerCase().includes(term) ||
// // //       (seeker.skills || "").toLowerCase().includes(term)
// // //     );
// // //   });

// // //   const handleSaveCandidate = async (seekerId) => {
// // //     const {
// // //       data: { user },
// // //       error: userError,
// // //     } = await supabase.auth.getUser();

// // //     if (userError || !user) {
// // //       toast({
// // //         title: "Error",
// // //         description: "User not logged in",
// // //         variant: "destructive",
// // //       });
// // //       return;
// // //     }

// // //     const { data: existing } = await supabase
// // //       .from("save_profile")
// // //       .select("id")
// // //       .eq("user_id", user.id)
// // //       .eq("job_seekers_id", seekerId)
// // //       .maybeSingle();

// // //     if (existing) {
// // //       toast({
// // //         title: "Already Saved",
// // //         description: "This profile is already saved.",
// // //       });
// // //       return;
// // //     }

// // //     const { error } = await supabase.from("save_profiles").insert({
// // //       user_id: user.id,
// // //       job_seekers_id: seekerId,
// // //     });

// // //     if (error) {
// // //       toast({
// // //         title: "Error",
// // //         description: "Could not save candidate",
// // //         variant: "destructive",
// // //       });
// // //     } else {
// // //       toast({ title: "Saved", description: "Candidate saved successfully." });
// // //     }
// // //   };

// // //   return (
// // //     <div className="space-y-6 px-2 sm:px-0">
// // //       <Dialog open={showPaymentSuccess} onOpenChange={setShowPaymentSuccess}>
// // //         <DialogContent className="sm:max-w-[425px]">
// // //           <DialogHeader>
// // //             <div className="flex justify-center">
// // //               <CheckCircle className="h-12 w-12 text-green-500" />
// // //             </div>
// // //             <DialogTitle className="text-center">
// // //               Payment Successful!
// // //             </DialogTitle>
// // //             <DialogDescription className="text-center">
// // //               Your subscription is now active. You can access all premium
// // //               features.
// // //             </DialogDescription>
// // //           </DialogHeader>
// // //           <DialogFooter className="sm:justify-center">
// // //             <Button
// // //               onClick={() => setShowPaymentSuccess(false)}
// // //               className="w-full"
// // //             >
// // //               Continue to Profiles
// // //             </Button>
// // //           </DialogFooter>
// // //         </DialogContent>
// // //       </Dialog>
// // //       {/* Premium Banner */}
// // //       {!hasSubscription && (
// // //         <Card className="border-amber-200 bg-amber-50">
// // //           <CardHeader className="p-4 sm:p-6">
// // //             <CardTitle className="flex items-center gap-2 text-amber-800 text-base sm:text-xl">
// // //               <Crown className="h-4 w-4 sm:h-5 sm:w-5" />
// // //               Premium Access Required
// // //             </CardTitle>
// // //             <CardDescription className="text-amber-700 text-sm sm:text-base">
// // //               Subscribe to access full contact details and premium features for
// // //               candidate recruitment.
// // //             </CardDescription>
// // //           </CardHeader>
// // //           <CardContent className="p-4 sm:p-6 pt-0">
// // //             <Button
// // //               className="bg-amber-600 hover:bg-amber-700 w-full sm:w-auto"
// // //               onClick={() => setActiveTab("subscription")}
// // //             >
// // //               Subscribe Now
// // //             </Button>
// // //           </CardContent>
// // //         </Card>
// // //       )}

// // //       {/* Search Section */}
// // //       <Card className="border-0 shadow-none sm:shadow-sm sm:border">
// // //         <CardContent className="p-4 sm:p-6">
// // //           <div className="flex flex-col gap-4">
// // //             <div className="relative">
// // //               <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
// // //               <Input
// // //                 placeholder="Search by name, qualification, skills..."
// // //                 value={searchTerm}
// // //                 onChange={(e) => setSearchTerm(e.target.value)}
// // //                 className="pl-10"
// // //               />
// // //             </div>
// // //             {/* <Button className="w-full bg-blue-600 hover:bg-blue-700">
// // //               <Search className="mr-2 h-4 w-4" />
// // //               Search Candidates
// // //             </Button> */}
// // //             <Button
// // //               className="w-full bg-blue-600 hover:bg-blue-700"
// // //               onClick={handleSearch}
// // //               disabled={isSearching}
// // //             >
// // //               <Search className="mr-2 h-4 w-4" />
// // //               {isSearching ? "Searching..." : "Search Candidates"}
// // //             </Button>
// // //           </div>
// // //         </CardContent>
// // //       </Card>

// // //       {/* Results Header */}
// // //       <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
// // //         <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
// // //           {filteredSeekers.length} Candidate
// // //           {filteredSeekers.length !== 1 ? "s" : ""} Found
// // //         </h2>
// // //         <div className="flex flex-wrap gap-2">
// // //           <Badge variant="outline">All Specializations</Badge>
// // //           <Badge variant="outline">Available Now</Badge>
// // //           <Badge variant="outline">Experienced</Badge>
// // //         </div>
// // //       </div>

// // //       {/* Candidates List */}
// // //       <div className="grid gap-4 sm:gap-6">
// // //         {filteredSeekers.map((seeker) => (
// // //           <Card
// // //             key={seeker.id}
// // //             className="hover:shadow-lg transition-shadow border-0 sm:border"
// // //           >
// // //             <CardHeader className="p-4 sm:p-6">
// // //               <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
// // //                 <div className="space-y-2">
// // //                   <CardTitle className="text-lg sm:text-xl text-blue-600 flex items-center gap-2">
// // //                     <User className="h-4 w-4 sm:h-5 sm:w-5" />
// // //                     {seeker.name}
// // //                   </CardTitle>
// // //                   <CardDescription className="text-base sm:text-lg font-medium text-gray-900">
// // //                     {seeker.qualification}
// // //                   </CardDescription>
// // //                 </div>
// // //                 <a
// // //                   href={`tel:+91${seeker.phone}`}
// // //                   className="self-start sm:self-auto"
// // //                 >
// // //                   <Button
// // //                     variant="outline"
// // //                     size="sm"
// // //                     className="flex items-center gap-1"
// // //                   >
// // //                     <Phone className="h-4 w-4" />
// // //                     <span className="hidden sm:inline">Contact</span>
// // //                   </Button>
// // //                 </a>
// // //               </div>
// // //             </CardHeader>
// // //             <CardContent className="p-4 sm:p-6 pt-0">
// // //               <div className="space-y-4">
// // //                 <div className="flex flex-wrap gap-3 text-sm text-gray-600">
// // //                   <div className="flex items-center">
// // //                     <GraduationCap className="mr-1 h-4 w-4" />
// // //                     {seeker.highest_qualification}
// // //                   </div>
// // //                   <div className="flex items-center">
// // //                     <Briefcase className="mr-1 h-4 w-4" />
// // //                     {seeker.years_of_experience} years experience
// // //                   </div>
// // //                   <div className="flex items-center">
// // //                     <MapPin className="mr-1 h-4 w-4" />
// // //                     {seeker.current_location}
// // //                   </div>
// // //                 </div>

// // //                 <div className="space-y-2">
// // //                   <h4 className="font-medium text-gray-900">
// // //                     Contact Information:
// // //                   </h4>
// // //                   <div className="space-y-1">
// // //                     <p className="text-sm text-gray-600 flex items-center">
// // //                       Email: {hasSubscription ? seeker.email : "***@***.com"}
// // //                       {!hasSubscription && (
// // //                         <Lock className="inline h-3 w-3 ml-1 text-amber-500" />
// // //                       )}
// // //                     </p>
// // //                     <p className="text-sm text-gray-600 flex items-center">
// // //                       Phone:{" "}
// // //                       {hasSubscription ? seeker.phone : "+1 (***) ***-****"}
// // //                       {!hasSubscription && (
// // //                         <Lock className="inline h-3 w-3 ml-1 text-amber-500" />
// // //                       )}
// // //                     </p>
// // //                   </div>
// // //                 </div>

// // //                 <div>
// // //                   <h4 className="font-medium text-gray-900 mb-2">
// // //                     Key Skills:
// // //                   </h4>
// // //                   <div className="flex flex-wrap gap-2">
// // //                     {(seeker.skills || []).slice(0, 5).map((skill, index) => (
// // //                       <Badge
// // //                         key={index}
// // //                         variant="secondary"
// // //                         className="bg-green-100 text-green-800"
// // //                       >
// // //                         {skill}
// // //                       </Badge>
// // //                     ))}
// // //                     {(seeker.skills || []).length > 5 && (
// // //                       <Badge
// // //                         variant="secondary"
// // //                         className="bg-green-100 text-green-800"
// // //                       >
// // //                         +{(seeker.skills || []).length - 5}
// // //                       </Badge>
// // //                     )}
// // //                   </div>
// // //                 </div>

// // //                 <div className="bg-gray-50 p-3 rounded-md text-sm">
// // //                   <span className="font-medium text-gray-900">
// // //                     Availability:{" "}
// // //                   </span>
// // //                   <span className="text-gray-700">{seeker.availability}</span>
// // //                 </div>

// // //                 {/* <div className="flex flex-wrap gap-3 pt-4">
// // //                   <Button className="bg-blue-600 hover:bg-blue-700 flex-1 min-w-[140px]">
// // //                     {hasSubscription ? "Contact Now" : "Subscribe to Contact"}
// // //                   </Button>
// // //                   <Button
// // //                     variant="outline"
// // //                     className="flex-1 min-w-[120px]"
// // //                     onClick={() => handleSaveCandidate(seeker.id)}
// // //                   >
// // //                     Save Candidate
// // //                   </Button>

// // //                   <Button
// // //                     variant="ghost"
// // //                     size="sm"
// // //                     className="flex-1 min-w-[100px]"
// // //                     onClick={() => setSelectedSeeker(seeker)}
// // //                   >
// // //                     View Full
// // //                   </Button>
// // //                 </div> */}
// // //                 <div className="flex flex-wrap gap-3 pt-4">
// // //                   {hasSubscription ? (
// // //                     <>
// // //                       <Button
// // //                         className="bg-blue-600 hover:bg-blue-700 flex-1 min-w-[140px]"
// // //                         onClick={() => setSelectedSeeker(seeker)}
// // //                       >
// // //                         Contact Now
// // //                       </Button>
// // //                       <Button
// // //                         variant="outline"
// // //                         className="flex-1 min-w-[120px]"
// // //                         onClick={() => handleSaveCandidate(seeker.id)}
// // //                       >
// // //                         Save Candidate
// // //                       </Button>
// // //                       <Button
// // //                         variant="ghost"
// // //                         size="sm"
// // //                         className="flex-1 min-w-[100px]"
// // //                         onClick={() => setSelectedSeeker1(seeker)}
// // //                       >
// // //                         View Full
// // //                       </Button>
// // //                     </>
// // //                   ) : (
// // //                     <Button
// // //                       className="bg-blue-600 hover:bg-blue-700 w-full"
// // //                       onClick={() => setActiveTab("subscription")}
// // //                     >
// // //                       Subscribe to Get the Contact Details
// // //                     </Button>
// // //                   )}
// // //                 </div>
// // //               </div>
// // //             </CardContent>
// // //           </Card>
// // //         ))}
// // //       </div>

// // //       {/* Full Profile Dialog */}
// // //       <Dialog
// // //         open={!!selectedSeeker}
// // //         onOpenChange={(open) => !open && setSelectedSeeker(null)}
// // //       >
// // //         <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
// // //           {selectedSeeker && (
// // //             <>
// // //               <DialogHeader>
// // //                 <DialogTitle className="text-lg sm:text-xl">
// // //                   {selectedSeeker.name} Basic Contact Details Profile
// // //                   {/* {selectedSeeker.name} Full Profile */}
// // //                 </DialogTitle>
// // //                 <DialogDescription className="text-sm sm:text-base">
// // //                   {selectedSeeker.highest_qualification ||
// // //                     "No qualification info"}
// // //                 </DialogDescription>
// // //               </DialogHeader>

// // //               <div className="space-y-3 mt-4 text-sm sm:text-base">
// // //                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
// // //                   <div>
// // //                     <p className="font-medium">Email:</p>
// // //                     <p>{selectedSeeker.email}</p>
// // //                   </div>
// // //                   <div>
// // //                     <p className="font-medium">Phone:</p>
// // //                     <p>{selectedSeeker.phone}</p>
// // //                   </div>
// // //                   <div>
// // //                     <p className="font-medium">Experience:</p>
// // //                     <p>{selectedSeeker.years_of_experience} years</p>
// // //                   </div>
// // //                   <div>
// // //                     <p className="font-medium">Location:</p>
// // //                     <p>{selectedSeeker.current_location}</p>
// // //                   </div>
// // //                   <div>
// // //                     <p className="font-medium">Availability:</p>
// // //                     <p>{selectedSeeker.availability}</p>
// // //                   </div>
// // //                   <div>
// // //                     <p className="font-medium">Specialization:</p>
// // //                     <p>{selectedSeeker.specialization}</p>
// // //                   </div>
// // //                 </div>

// // //                 <div className="pt-3">
// // //                   <p className="font-medium">Skills:</p>
// // //                   <div className="flex flex-wrap gap-2 mt-1">
// // //                     {(selectedSeeker.skills || []).map((skill, index) => (
// // //                       <Badge
// // //                         key={index}
// // //                         variant="secondary"
// // //                         className="bg-green-100 text-green-800"
// // //                       >
// // //                         {skill}
// // //                       </Badge>
// // //                     ))}
// // //                   </div>
// // //                 </div>
// // //               </div>

// // //               <DialogFooter className="mt-6">
// // //                 <Button
// // //                   variant="outline"
// // //                   onClick={() => setSelectedSeeker(null)}
// // //                 >
// // //                   Close
// // //                 </Button>
// // //               </DialogFooter>
// // //             </>
// // //           )}
// // //         </DialogContent>
// // //       </Dialog>
// // //       <Dialog
// // //         open={!!selectedSeeker1}
// // //         onOpenChange={(open) => !open && setSelectedSeeker1(null)}
// // //       >
// // //         <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
// // //           {selectedSeeker1 && (
// // //             <>
// // //               <DialogHeader>
// // //                 <DialogTitle className="text-lg sm:text-xl">
// // //                   {selectedSeeker1.name} Full Profile
// // //                 </DialogTitle>
// // //                 {/* <DialogDescription className="text-sm sm:text-base">
// // //                   {selectedSeeker1.highest_qualification ||
// // //                     "No qualification info"}
// // //                 </DialogDescription> */}
// // //               </DialogHeader>

// // //               <div className="space-y-3 mt-4 text-sm sm:text-base">
// // //                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
// // //                   <div>
// // //                     <p className="font-medium">Email:</p>
// // //                     <p>{selectedSeeker1.email}</p>
// // //                   </div>
// // //                   <div>
// // //                     <p className="font-medium">Phone:</p>
// // //                     <p>{selectedSeeker1.phone}</p>
// // //                   </div>
// // //                   <div>
// // //                     <p className="font-medium">Highest Qualification:</p>
// // //                     <p>{selectedSeeker1.highest_qualification}</p>
// // //                   </div>
// // //                   <div>
// // //                     <p className="font-medium">Specialization:</p>
// // //                     <p>{selectedSeeker1.specialization}</p>
// // //                   </div>
// // //                   <div>
// // //                     <p className="font-medium">Years of Experience:</p>
// // //                     <p>{selectedSeeker1.years_of_experience} years</p>
// // //                   </div>
// // //                   <div>
// // //                     <p className="font-medium">Previous Work Experience:</p>
// // //                     <p>{selectedSeeker1.previous_experience || "N/A"}</p>
// // //                   </div>

// // //                   <div>
// // //                     <p className="font-medium">Current Location:</p>
// // //                     <p>{selectedSeeker1.current_location}</p>
// // //                   </div>
// // //                   <div>
// // //                     <p className="font-medium">Preferred Work Location:</p>
// // //                     <p>{selectedSeeker1.preferred_location}</p>
// // //                   </div>
// // //                   <div>
// // //                     <p className="font-medium">Availability to Start:</p>
// // //                     <p>{selectedSeeker1.availability}</p>
// // //                   </div>
// // //                 </div>

// // //                 <div className="pt-3">
// // //                   <p className="font-medium">Skills & Competencies:</p>
// // //                   <div className="flex flex-wrap gap-2 mt-1">
// // //                     {(selectedSeeker1.skills || []).map((skill, index) => (
// // //                       <Badge
// // //                         key={index}
// // //                         variant="secondary"
// // //                         className="bg-green-100 text-green-800"
// // //                       >
// // //                         {skill}
// // //                       </Badge>
// // //                     ))}
// // //                   </div>
// // //                 </div>
// // //               </div>

// // //               <DialogFooter className="mt-6">
// // //                 <Button
// // //                   variant="outline"
// // //                   onClick={() => setSelectedSeeker1(null)}
// // //                 >
// // //                   Close
// // //                 </Button>
// // //               </DialogFooter>
// // //             </>
// // //           )}
// // //         </DialogContent>
// // //       </Dialog>

// // //       {/* Load More Button */}
// // //       {filteredSeekers.length > 0 && (
// // //         <div className="text-center pt-4">
// // //           <Button variant="outline" size="lg">
// // //             Load More Candidates
// // //           </Button>
// // //         </div>
// // //       )}
// // //     </div>
// // //   );
// // // };

// // import { useEffect, useState } from "react";
// // import { Button } from "@/components/ui/button";
// // import {
// //   Card,
// //   CardContent,
// //   CardDescription,
// //   CardHeader,
// //   CardTitle,
// // } from "@/components/ui/card";
// // import { Input } from "@/components/ui/input";
// // import { Badge } from "@/components/ui/badge";
// // import {
// //   Search,
// //   MapPin,
// //   GraduationCap,
// //   Briefcase,
// //   User,
// //   Lock,
// //   Crown,
// //   Phone,
// //   CheckCircle,
// // } from "lucide-react";
// // import { supabase } from "@/integrations/supabase/client";
// // import {
// //   Dialog,
// //   DialogContent,
// //   DialogHeader,
// //   DialogTitle,
// //   DialogDescription,
// //   DialogFooter,
// // } from "@/components/ui/dialog";
// // import { useToast } from "@/hooks/use-toast";

// // interface JobSeekerProfilesProps {
// //   setActiveTab?: (tab: string) => void;
// // }

// // export const JobSeekerProfiles = ({ setActiveTab }: JobSeekerProfilesProps) => {
// //   const [searchTerm, setSearchTerm] = useState("");
// //   const [hasSubscription, setHasSubscription] = useState(false);
// //   const [jobSeekers, setJobSeekers] = useState([]);
// //   const [filteredSeekers, setFilteredSeekers] = useState([]);
// //   const [selectedSeeker, setSelectedSeeker] = useState(null);
// //   const [selectedSeeker1, setSelectedSeeker1] = useState(null);
// //   const [showPaymentSuccess, setShowPaymentSuccess] = useState(false);
// //   const { toast } = useToast();
// //   const [showContactInfo, setShowContactInfo] = useState(false);
// //   const [contactSeekerId, setContactSeekerId] = useState(null);
// //   const [isLoading, setIsLoading] = useState(true);

// //   useEffect(() => {
// //     const fetchData = async () => {
// //       const {
// //         data: { user },
// //         error: userError,
// //       } = await supabase.auth.getUser();

// //       if (userError || !user) return;

// //       try {
// //         // First get the provider record for this user
// //         const { data: providerData } = await supabase
// //           .from("job_providers")
// //           .select("id")
// //           .eq("user_id", user.id)
// //           .maybeSingle();

// //         if (!providerData) {
// //           // No provider record found - user is not a job provider
// //           setHasSubscription(false);
// //           return;
// //         }

// //         // Check subscription status using provider_id
// //         const { data: subscriptionData } = await supabase
// //           .from("provider_subscriptions")
// //           .select("status, end_date")
// //           .eq("provider_id", providerData.id)
// //           .gte("end_date", new Date().toISOString())
// //           .order("end_date", { ascending: false })
// //           .limit(1)
// //           .maybeSingle();

// //         setHasSubscription(subscriptionData?.status === "active");

// //         // Check for payment success in URL params
// //         const urlParams = new URLSearchParams(window.location.search);
// //         const paymentSuccess = urlParams.get("payment_success");
// //         if (paymentSuccess === "true") {
// //           setShowPaymentSuccess(true);
// //           // Clean up the URL
// //           window.history.replaceState(
// //             {},
// //             document.title,
// //             window.location.pathname
// //           );
// //         }

// //         // Fetch job seekers
// //         const { data, error } = await supabase.from("job_seekers").select("*").eq("user_id", user.id);

// //         if (!error) {
// //           setJobSeekers(data);
// //           setFilteredSeekers(data); // Initialize filtered seekers with all data
// //         } else {
// //           toast({
// //             title: "Error",
// //             description: "Failed to load job seekers",
// //             variant: "destructive",
// //           });
// //         }
// //       } catch (error) {
// //         console.error("Error fetching data:", error);
// //         toast({
// //           title: "Error",
// //           description: "Failed to load data",
// //           variant: "destructive",
// //         });
// //       } finally {
// //         setIsLoading(false);
// //       }
// //     };

// //     fetchData();
// //   }, []);

// //   // Handle search functionality
// //   // const handleSearch = () => {
// //   //   if (!searchTerm.trim()) {
// //   //     setFilteredSeekers(jobSeekers);
// //   //     return;
// //   //   }

// //   //   const term = searchTerm.toLowerCase();
// //   //   const filtered = jobSeekers.filter((seeker) => {
// //   //      const hasMatchingSkill = (seeker.skills || []).some((skill) =>
// //   //        skill.toLowerCase().includes(term)
// //   //      );
// //   //     return (
// //   //       (seeker.name || "").toLowerCase().includes(term) ||
// //   //       (seeker.highest_qualification || "").toLowerCase().includes(term) ||
// //   //       (seeker.specialization || "").toLowerCase().includes(term) ||
// //   //       (seeker.skills || "").toLowerCase().includes(term)
// //   //     );
// //   //   });

// //   //   setFilteredSeekers(filtered);
// //   // };
// //   const handleSearch = () => {
// //     if (!searchTerm.trim()) {
// //       setFilteredSeekers(jobSeekers);
// //       return;
// //     }

// //     const term = searchTerm.toLowerCase();
// //     const filtered = jobSeekers.filter((seeker) => {
// //       // Check if any skill matches the search term
// //       const hasMatchingSkill = (seeker.skills || []).some((skill) =>
// //         skill.toLowerCase().includes(term)
// //       );

// //       return (
// //         (seeker.name || "").toLowerCase().includes(term) ||
// //         (seeker.highest_qualification || "").toLowerCase().includes(term) ||
// //         (seeker.specialization || "").toLowerCase().includes(term) ||
// //         hasMatchingSkill
// //       );
// //     });

// //     setFilteredSeekers(filtered);
// //   };

// //   // Handle search when Enter key is pressed
// //   const handleKeyDown = (e) => {
// //     if (e.key === "Enter") {
// //       handleSearch();
// //     }
// //   };

// //   const handleContactNow = (seeker) => {
// //     if (hasSubscription) {
// //       setContactSeekerId(seeker.id);
// //       setShowContactInfo(true);
// //     } else {
// //       setActiveTab("subscription");
// //     }
// //   };

// //   const handleSaveCandidate = async (seekerId) => {
// //     const {
// //       data: { user },
// //       error: userError,
// //     } = await supabase.auth.getUser();

// //     if (userError || !user) {
// //       toast({
// //         title: "Error",
// //         description: "User not logged in",
// //         variant: "destructive",
// //       });
// //       return;
// //     }

// //     const { data: existing } = await supabase
// //       .from("save_profile")
// //       .select("id")
// //       .eq("user_id", user.id)
// //       .eq("job_seekers_id", seekerId)
// //       .maybeSingle();

// //     if (existing) {
// //       toast({
// //         title: "Already Saved",
// //         description: "This profile is already saved.",
// //       });
// //       return;
// //     }

// //     const { error } = await supabase.from("save_profiles").insert({
// //       user_id: user.id,
// //       job_seekers_id: seekerId,
// //     });

// //     if (error) {
// //       toast({
// //         title: "Error",
// //         description: "Could not save candidate",
// //         variant: "destructive",
// //       });
// //     } else {
// //       toast({ title: "Saved", description: "Candidate saved successfully." });
// //     }
// //   };

// //   if (isLoading) {
// //     return (
// //       <div className="flex justify-center items-center h-64">
// //         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="space-y-6 px-2 sm:px-0">
// //       <Dialog open={showPaymentSuccess} onOpenChange={setShowPaymentSuccess}>
// //         <DialogContent className="sm:max-w-[425px]">
// //           <DialogHeader>
// //             <div className="flex justify-center">
// //               <CheckCircle className="h-12 w-12 text-green-500" />
// //             </div>
// //             <DialogTitle className="text-center">
// //               Payment Successful!
// //             </DialogTitle>
// //             <DialogDescription className="text-center">
// //               Your subscription is now active. You can access all premium
// //               features.
// //             </DialogDescription>
// //           </DialogHeader>
// //           <DialogFooter className="sm:justify-center">
// //             <Button
// //               onClick={() => setShowPaymentSuccess(false)}
// //               className="w-full"
// //             >
// //               Continue to Profiles
// //             </Button>
// //           </DialogFooter>
// //         </DialogContent>
// //       </Dialog>

// //       {/* Premium Banner */}
// //       {!hasSubscription && (
// //         <Card className="border-amber-200 bg-amber-50">
// //           <CardHeader className="p-4 sm:p-6">
// //             <CardTitle className="flex items-center gap-2 text-amber-800 text-base sm:text-xl">
// //               <Crown className="h-4 w-4 sm:h-5 sm:w-5" />
// //               Premium Access Required
// //             </CardTitle>
// //             <CardDescription className="text-amber-700 text-sm sm:text-base">
// //               Subscribe to access full contact details and premium features for
// //               candidate recruitment.
// //             </CardDescription>
// //           </CardHeader>
// //           <CardContent className="p-4 sm:p-6 pt-0">
// //             <Button
// //               className="bg-amber-600 hover:bg-amber-700 w-full sm:w-auto"
// //               onClick={() => setActiveTab("subscription")}
// //             >
// //               Subscribe Now
// //             </Button>
// //           </CardContent>
// //         </Card>
// //       )}

// //       {/* Search Section */}
// //       <Card className="border-0 shadow-none sm:shadow-sm sm:border">
// //         <CardContent className="p-4 sm:p-6">
// //           <div className="flex flex-col gap-4">
// //             <div className="relative">
// //               <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
// //               <Input
// //                 placeholder="Search by name, qualification, skills..."
// //                 value={searchTerm}
// //                 onChange={(e) => setSearchTerm(e.target.value)}
// //                 onKeyDown={handleKeyDown}
// //                 className="pl-10"
// //               />
// //             </div>
// //             <Button
// //               className="w-full bg-blue-600 hover:bg-blue-700"
// //               onClick={handleSearch}
// //             >
// //               <Search className="mr-2 h-4 w-4" />
// //               Search Candidates
// //             </Button>
// //           </div>
// //         </CardContent>
// //       </Card>

// //       {/* Results Header */}
// //       <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
// //         <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
// //           {filteredSeekers.length} Candidate
// //           {filteredSeekers.length !== 1 ? "s" : ""} Found
// //         </h2>
// //         <div className="flex flex-wrap gap-2">
// //           <Badge variant="outline">All Specializations</Badge>
// //           <Badge variant="outline">Available Now</Badge>
// //           <Badge variant="outline">Experienced</Badge>
// //         </div>
// //       </div>

// //       {/* Candidates List */}
// //       <div className="grid gap-4 sm:gap-6">
// //         {filteredSeekers.length > 0 ? (
// //           filteredSeekers.map((seeker) => (
// //             <Card
// //               key={seeker.id}
// //               className="hover:shadow-lg transition-shadow border-0 sm:border"
// //             >
// //               <CardHeader className="p-4 sm:p-6">
// //                 <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
// //                   <div className="space-y-2">
// //                     <CardTitle className="text-lg sm:text-xl text-blue-600 flex items-center gap-2">
// //                       <User className="h-4 w-4 sm:h-5 sm:w-5" />
// //                       {seeker.name}
// //                     </CardTitle>
// //                     <CardDescription className="text-base sm:text-lg font-medium text-gray-900">
// //                       {seeker.highest_qualification}
// //                     </CardDescription>
// //                   </div>
// //                   <Button
// //                     variant="outline"
// //                     size="sm"
// //                     className="flex items-center gap-1 self-start sm:self-auto"
// //                     onClick={() => handleContactNow(seeker)}
// //                   >
// //                     <Phone className="h-4 w-4" />
// //                     <span className="hidden sm:inline">Contact</span>
// //                   </Button>
// //                 </div>
// //               </CardHeader>
// //               <CardContent className="p-4 sm:p-6 pt-0">
// //                 <div className="space-y-4">
// //                   <div className="flex flex-wrap gap-3 text-sm text-gray-600">
// //                     <div className="flex items-center">
// //                       <GraduationCap className="mr-1 h-4 w-4" />
// //                       {seeker.highest_qualification}
// //                     </div>
// //                     <div className="flex items-center">
// //                       <Briefcase className="mr-1 h-4 w-4" />
// //                       {seeker.years_of_experience} years experience
// //                     </div>
// //                     <div className="flex items-center">
// //                       <MapPin className="mr-1 h-4 w-4" />
// //                       {seeker.current_location}
// //                     </div>
// //                   </div>

// //                   <div className="space-y-2">
// //                     <h4 className="font-medium text-gray-900">
// //                       Contact Information:
// //                     </h4>
// //                     <div className="space-y-1">
// //                       <p className="text-sm text-gray-600 flex items-center">
// //                         Email: {hasSubscription ? seeker.email : "***@***.com"}
// //                         {!hasSubscription && (
// //                           <Lock className="inline h-3 w-3 ml-1 text-amber-500" />
// //                         )}
// //                       </p>
// //                       <p className="text-sm text-gray-600 flex items-center">
// //                         Phone:{" "}
// //                         {hasSubscription ? seeker.phone : "+1 (***) ***-****"}
// //                         {!hasSubscription && (
// //                           <Lock className="inline h-3 w-3 ml-1 text-amber-500" />
// //                         )}
// //                       </p>
// //                     </div>
// //                   </div>

// //                   <div>
// //                     <h4 className="font-medium text-gray-900 mb-2">
// //                       Key Skills:
// //                     </h4>
// //                     <div className="flex flex-wrap gap-2">
// //                       {(seeker.skills || []).slice(0, 5).map((skill, index) => (
// //                         <Badge
// //                           key={index}
// //                           variant="secondary"
// //                           className="bg-green-100 text-green-800"
// //                         >
// //                           {skill}
// //                         </Badge>
// //                       ))}
// //                       {(seeker.skills || []).length > 5 && (
// //                         <Badge
// //                           variant="secondary"
// //                           className="bg-green-100 text-green-800"
// //                         >
// //                           +{(seeker.skills || []).length - 5}
// //                         </Badge>
// //                       )}
// //                     </div>
// //                   </div>

// //                   <div className="bg-gray-50 p-3 rounded-md text-sm">
// //                     <span className="font-medium text-gray-900">
// //                       Availability:{" "}
// //                     </span>
// //                     <span className="text-gray-700">{seeker.availability}</span>
// //                   </div>

// //                   <div className="flex flex-wrap gap-3 pt-4">
// //                     {hasSubscription ? (
// //                       <>
// //                         <Button
// //                           className="bg-blue-600 hover:bg-blue-700 flex-1 min-w-[140px]"
// //                           onClick={() => setSelectedSeeker(seeker)}
// //                         >
// //                           Contact Now
// //                         </Button>
// //                         <Button
// //                           variant="outline"
// //                           className="flex-1 min-w-[120px]"
// //                           onClick={() => handleSaveCandidate(seeker.id)}
// //                         >
// //                           Save Candidate
// //                         </Button>
// //                         <Button
// //                           variant="ghost"
// //                           size="sm"
// //                           className="flex-1 min-w-[100px]"
// //                           onClick={() => setSelectedSeeker1(seeker)}
// //                         >
// //                           View Full
// //                         </Button>
// //                       </>
// //                     ) : (
// //                       <Button
// //                         className="bg-blue-600 hover:bg-blue-700 w-full"
// //                         onClick={() => setActiveTab("subscription")}
// //                       >
// //                         Subscribe to Get the Contact Details
// //                       </Button>
// //                     )}
// //                   </div>
// //                 </div>
// //               </CardContent>
// //             </Card>
// //           ))
// //         ) : (
// //           <Card className="border-0 shadow-none sm:shadow-sm sm:border">
// //             <CardContent className="p-8 text-center">
// //               <Search className="mx-auto h-12 w-12 text-gray-400" />
// //               <h3 className="mt-4 text-lg font-medium text-gray-900">
// //                 No candidates found
// //               </h3>
// //               <p className="mt-2 text-sm text-gray-500">
// //                 Try adjusting your search or filter to find what you're looking
// //                 for.
// //               </p>
// //             </CardContent>
// //           </Card>
// //         )}
// //       </div>

// //       {/* Full Profile Dialog */}
// //       <Dialog
// //         open={!!selectedSeeker}
// //         onOpenChange={(open) => !open && setSelectedSeeker(null)}
// //       >
// //         <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
// //           {selectedSeeker && (
// //             <>
// //               <DialogHeader>
// //                 <DialogTitle className="text-lg sm:text-xl">
// //                   {selectedSeeker.name} Basic Contact Details Profile
// //                 </DialogTitle>
// //                 <DialogDescription className="text-sm sm:text-base">
// //                   {selectedSeeker.highest_qualification ||
// //                     "No qualification info"}
// //                 </DialogDescription>
// //               </DialogHeader>

// //               <div className="space-y-3 mt-4 text-sm sm:text-base">
// //                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
// //                   <div>
// //                     <p className="font-medium">Email:</p>
// //                     <p>{selectedSeeker.email}</p>
// //                   </div>
// //                   <div>
// //                     <p className="font-medium">Phone:</p>
// //                     <p>{selectedSeeker.phone}</p>
// //                   </div>
// //                   <div>
// //                     <p className="font-medium">Experience:</p>
// //                     <p>{selectedSeeker.years_of_experience} years</p>
// //                   </div>
// //                   <div>
// //                     <p className="font-medium">Location:</p>
// //                     <p>{selectedSeeker.current_location}</p>
// //                   </div>
// //                   <div>
// //                     <p className="font-medium">Availability:</p>
// //                     <p>{selectedSeeker.availability}</p>
// //                   </div>
// //                   <div>
// //                     <p className="font-medium">Specialization:</p>
// //                     <p>{selectedSeeker.specialization}</p>
// //                   </div>
// //                 </div>

// //                 <div className="pt-3">
// //                   <p className="font-medium">Skills:</p>
// //                   <div className="flex flex-wrap gap-2 mt-1">
// //                     {(selectedSeeker.skills || []).map((skill, index) => (
// //                       <Badge
// //                         key={index}
// //                         variant="secondary"
// //                         className="bg-green-100 text-green-800"
// //                       >
// //                         {skill}
// //                       </Badge>
// //                     ))}
// //                   </div>
// //                 </div>
// //               </div>

// //               <DialogFooter className="mt-6">
// //                 <Button
// //                   variant="outline"
// //                   onClick={() => setSelectedSeeker(null)}
// //                 >
// //                   Close
// //                 </Button>
// //               </DialogFooter>
// //             </>
// //           )}
// //         </DialogContent>
// //       </Dialog>

// //       {/* Detailed Profile Dialog */}
// //       <Dialog
// //         open={!!selectedSeeker1}
// //         onOpenChange={(open) => !open && setSelectedSeeker1(null)}
// //       >
// //         <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
// //           {selectedSeeker1 && (
// //             <>
// //               <DialogHeader>
// //                 <DialogTitle className="text-lg sm:text-xl">
// //                   {selectedSeeker1.name} Full Profile
// //                 </DialogTitle>
// //               </DialogHeader>

// //               <div className="space-y-3 mt-4 text-sm sm:text-base">
// //                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
// //                   <div>
// //                     <p className="font-medium">Email:</p>
// //                     <p>{selectedSeeker1.email}</p>
// //                   </div>
// //                   <div>
// //                     <p className="font-medium">Phone:</p>
// //                     <p>{selectedSeeker1.phone}</p>
// //                   </div>
// //                   <div>
// //                     <p className="font-medium">Highest Qualification:</p>
// //                     <p>{selectedSeeker1.highest_qualification}</p>
// //                   </div>
// //                   <div>
// //                     <p className="font-medium">Specialization:</p>
// //                     <p>{selectedSeeker1.specialization}</p>
// //                   </div>
// //                   <div>
// //                     <p className="font-medium">Years of Experience:</p>
// //                     <p>{selectedSeeker1.years_of_experience} years</p>
// //                   </div>
// //                   <div>
// //                     <p className="font-medium">Previous Work Experience:</p>
// //                     <p>{selectedSeeker1.previous_experience || "N/A"}</p>
// //                   </div>

// //                   <div>
// //                     <p className="font-medium">Current Location:</p>
// //                     <p>{selectedSeeker1.current_location}</p>
// //                   </div>
// //                   <div>
// //                     <p className="font-medium">Preferred Work Location:</p>
// //                     <p>{selectedSeeker1.preferred_location}</p>
// //                   </div>
// //                   <div>
// //                     <p className="font-medium">Availability to Start:</p>
// //                     <p>{selectedSeeker1.availability}</p>
// //                   </div>
// //                 </div>

// //                 <div className="pt-3">
// //                   <p className="font-medium">Skills & Competencies:</p>
// //                   <div className="flex flex-wrap gap-2 mt-1">
// //                     {(selectedSeeker1.skills || []).map((skill, index) => (
// //                       <Badge
// //                         key={index}
// //                         variant="secondary"
// //                         className="bg-green-100 text-green-800"
// //                       >
// //                         {skill}
// //                       </Badge>
// //                     ))}
// //                   </div>
// //                 </div>
// //               </div>

// //               <DialogFooter className="mt-6">
// //                 <Button
// //                   variant="outline"
// //                   onClick={() => setSelectedSeeker1(null)}
// //                 >
// //                   Close
// //                 </Button>
// //               </DialogFooter>
// //             </>
// //           )}
// //         </DialogContent>
// //       </Dialog>

// //       {/* Load More Button */}
// //       {filteredSeekers.length > 0 && (
// //         <div className="text-center pt-4">
// //           <Button variant="outline" size="lg">
// //             Load More Candidates
// //           </Button>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// import { useEffect, useState } from "react";
// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Badge } from "@/components/ui/badge";
// import {
//   Search,
//   MapPin,
//   GraduationCap,
//   Briefcase,
//   User,
//   Lock,
//   Crown,
//   Phone,
//   CheckCircle,
// } from "lucide-react";
// import { supabase } from "@/integrations/supabase/client";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogDescription,
//   DialogFooter,
// } from "@/components/ui/dialog";
// import { useToast } from "@/hooks/use-toast";

// interface JobSeeker {
//   id: string;
//   name: string;
//   email: string;
//   phone: string;
//   highest_qualification: string;
//   specialization: string;
//   years_of_experience: number;
//   current_location: string;
//   availability: string;
//   skills: string[];
//   previous_experience?: string;
//   preferred_location?: string;
//   user_id?: string;
// }

// interface JobSeekerProfilesProps {
//   setActiveTab?: (tab: string) => void;
// }

// export const JobSeekerProfiles = ({ setActiveTab }: JobSeekerProfilesProps) => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [hasSubscription, setHasSubscription] = useState(false);
//   const [jobSeekers, setJobSeekers] = useState<JobSeeker[]>([]);
//   const [filteredSeekers, setFilteredSeekers] = useState<JobSeeker[]>([]);
//   const [selectedSeeker, setSelectedSeeker] = useState<JobSeeker | null>(null);
//   const [selectedSeeker1, setSelectedSeeker1] = useState<JobSeeker | null>(null);
//   const [showPaymentSuccess, setShowPaymentSuccess] = useState(false);
//   const { toast } = useToast();
//   const [showContactInfo, setShowContactInfo] = useState(false);
//   const [contactSeekerId, setContactSeekerId] = useState<string | null>(null);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const fetchData = async () => {
//       const {
//         data: { user },
//         error: userError,
//       } = await supabase.auth.getUser();

//       if (userError || !user) return;

//       try {
//         // First get the provider record for this user
//         const { data: providerData } = await supabase
//           .from("job_providers")
//           .select("id")
//           .eq("user_id", user.id)
//           .maybeSingle();

//         if (!providerData) {
//           // No provider record found - user is not a job provider
//           setHasSubscription(false);
//           return;
//         }

//         // Check subscription status using provider_id
//         const { data: subscriptionData } = await supabase
//           .from("provider_subscriptions")
//           .select("status, end_date")
//           .eq("provider_id", providerData.id)
//           .gte("end_date", new Date().toISOString())
//           .order("end_date", { ascending: false })
//           .limit(1)
//           .maybeSingle();

//         setHasSubscription(subscriptionData?.status === "active");

//         // Check for payment success in URL params
//         const urlParams = new URLSearchParams(window.location.search);
//         const paymentSuccess = urlParams.get("payment_success");
//         if (paymentSuccess === "true") {
//           setShowPaymentSuccess(true);
//           // Clean up the URL
//           window.history.replaceState(
//             {},
//             document.title,
//             window.location.pathname
//           );
//         }

//         // Fetch job seekers
//         const { data, error } = await supabase.from("job_seekers").select("*").eq("user_id", user.id);

//         if (!error && data) {
//           setJobSeekers(data as JobSeeker[]);
//           setFilteredSeekers(data as JobSeeker[]); // Initialize filtered seekers with all data
//         } else {
//           toast({
//             title: "Error",
//             description: "Failed to load job seekers",
//             variant: "destructive",
//           });
//         }
//       } catch (error) {
//         console.error("Error fetching data:", error);
//         toast({
//           title: "Error",
//           description: "Failed to load data",
//           variant: "destructive",
//         });
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchData();
//   }, [toast]);

//   const handleSearch = () => {
//     if (!searchTerm.trim()) {
//       setFilteredSeekers(jobSeekers);
//       return;
//     }

//     const term = searchTerm.toLowerCase();
//     const filtered = jobSeekers.filter((seeker) => {
//       // Check if any skill matches the search term
//       const hasMatchingSkill = (seeker.skills || []).some((skill) =>
//         skill.toLowerCase().includes(term)
//       );

//       return (
//         (seeker.name || "").toLowerCase().includes(term) ||
//         (seeker.highest_qualification || "").toLowerCase().includes(term) ||
//         (seeker.specialization || "").toLowerCase().includes(term) ||
//         hasMatchingSkill
//       );
//     });

//     setFilteredSeekers(filtered);
//   };

//   const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
//     if (e.key === "Enter") {
//       handleSearch();
//     }
//   };

//   const handleContactNow = (seeker: JobSeeker) => {
//     if (hasSubscription) {
//       setContactSeekerId(seeker.id);
//       setShowContactInfo(true);
//     } else if (setActiveTab) {
//       setActiveTab("subscription");
//     }
//   };

//   const handleSaveCandidate = async (seekerId: string) => {
//     const {
//       data: { user },
//       error: userError,
//     } = await supabase.auth.getUser();

//     if (userError || !user) {
//       toast({
//         title: "Error",
//         description: "User not logged in",
//         variant: "destructive",
//       });
//       return;
//     }

//     const { data: existing } = await supabase
//       .from("save_profile")
//       .select("id")
//       .eq("user_id", user.id)
//       .eq("job_seekers_id", seekerId)
//       .maybeSingle();

//     if (existing) {
//       toast({
//         title: "Already Saved",
//         description: "This profile is already saved.",
//       });
//       return;
//     }

//     const { error } = await supabase.from("save_profiles").insert({
//       user_id: user.id,
//       job_seekers_id: seekerId,
//     });

//     if (error) {
//       toast({
//         title: "Error",
//         description: "Could not save candidate",
//         variant: "destructive",
//       });
//     } else {
//       toast({ title: "Saved", description: "Candidate saved successfully." });
//     }
//   };

//   if (isLoading) {
//     return (
//       <div className="flex justify-center items-center h-64">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-6 px-2 sm:px-0">
//       <Dialog open={showPaymentSuccess} onOpenChange={setShowPaymentSuccess}>
//         <DialogContent className="sm:max-w-[425px]">
//           <DialogHeader>
//             <div className="flex justify-center">
//               <CheckCircle className="h-12 w-12 text-green-500" />
//             </div>
//             <DialogTitle className="text-center">
//               Payment Successful!
//             </DialogTitle>
//             <DialogDescription className="text-center">
//               Your subscription is now active. You can access all premium
//               features.
//             </DialogDescription>
//           </DialogHeader>
//           <DialogFooter className="sm:justify-center">
//             <Button
//               onClick={() => setShowPaymentSuccess(false)}
//               className="w-full"
//             >
//               Continue to Profiles
//             </Button>
//           </DialogFooter>
//         </DialogContent>
//       </Dialog>

//       {/* Premium Banner */}
//       {!hasSubscription && (
//         <Card className="border-amber-200 bg-amber-50">
//           <CardHeader className="p-4 sm:p-6">
//             <CardTitle className="flex items-center gap-2 text-amber-800 text-base sm:text-xl">
//               <Crown className="h-4 w-4 sm:h-5 sm:w-5" />
//               Premium Access Required
//             </CardTitle>
//             <CardDescription className="text-amber-700 text-sm sm:text-base">
//               Subscribe to access full contact details and premium features for
//               candidate recruitment.
//             </CardDescription>
//           </CardHeader>
//           <CardContent className="p-4 sm:p-6 pt-0">
//             <Button
//               className="bg-amber-600 hover:bg-amber-700 w-full sm:w-auto"
//               onClick={() => setActiveTab && setActiveTab("subscription")}
//             >
//               Subscribe Now
//             </Button>
//           </CardContent>
//         </Card>
//       )}

//       {/* Search Section */}
//       <Card className="border-0 shadow-none sm:shadow-sm sm:border">
//         <CardContent className="p-4 sm:p-6">
//           <div className="flex flex-col gap-4">
//             <div className="relative">
//               <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
//               <Input
//                 placeholder="Search by name, qualification, skills..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 onKeyDown={handleKeyDown}
//                 className="pl-10"
//               />
//             </div>
//             <Button
//               className="w-full bg-blue-600 hover:bg-blue-700"
//               onClick={handleSearch}
//             >
//               <Search className="mr-2 h-4 w-4" />
//               Search Candidates
//             </Button>
//           </div>
//         </CardContent>
//       </Card>

//       {/* Results Header */}
//       <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
//         <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
//           {filteredSeekers.length} Candidate
//           {filteredSeekers.length !== 1 ? "s" : ""} Found
//         </h2>
//         <div className="flex flex-wrap gap-2">
//           <Badge variant="outline">All Specializations</Badge>
//           <Badge variant="outline">Available Now</Badge>
//           <Badge variant="outline">Experienced</Badge>
//         </div>
//       </div>

//       {/* Candidates List */}
//       <div className="grid gap-4 sm:gap-6">
//         {filteredSeekers.length > 0 ? (
//           filteredSeekers.map((seeker) => (
//             <Card
//               key={seeker.id}
//               className="hover:shadow-lg transition-shadow border-0 sm:border"
//             >
//               <CardHeader className="p-4 sm:p-6">
//                 <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
//                   <div className="space-y-2">
//                     <CardTitle className="text-lg sm:text-xl text-blue-600 flex items-center gap-2">
//                       <User className="h-4 w-4 sm:h-5 sm:w-5" />
//                       {seeker.name}
//                     </CardTitle>
//                     <CardDescription className="text-base sm:text-lg font-medium text-gray-900">
//                       {seeker.highest_qualification}
//                     </CardDescription>
//                   </div>
//                   <Button
//                     variant="outline"
//                     size="sm"
//                     className="flex items-center gap-1 self-start sm:self-auto"
//                     onClick={() => handleContactNow(seeker)}
//                   >
//                     <Phone className="h-4 w-4" />
//                     <span className="hidden sm:inline">Contact</span>
//                   </Button>
//                 </div>
//               </CardHeader>
//               <CardContent className="p-4 sm:p-6 pt-0">
//                 <div className="space-y-4">
//                   <div className="flex flex-wrap gap-3 text-sm text-gray-600">
//                     <div className="flex items-center">
//                       <GraduationCap className="mr-1 h-4 w-4" />
//                       {seeker.highest_qualification}
//                     </div>
//                     <div className="flex items-center">
//                       <Briefcase className="mr-1 h-4 w-4" />
//                       {seeker.years_of_experience} years experience
//                     </div>
//                     <div className="flex items-center">
//                       <MapPin className="mr-1 h-4 w-4" />
//                       {seeker.current_location}
//                     </div>
//                   </div>

//                   <div className="space-y-2">
//                     <h4 className="font-medium text-gray-900">
//                       Contact Information:
//                     </h4>
//                     <div className="space-y-1">
//                       <p className="text-sm text-gray-600 flex items-center">
//                         Email: {hasSubscription ? seeker.email : "***@***.com"}
//                         {!hasSubscription && (
//                           <Lock className="inline h-3 w-3 ml-1 text-amber-500" />
//                         )}
//                       </p>
//                       <p className="text-sm text-gray-600 flex items-center">
//                         Phone:{" "}
//                         {hasSubscription ? seeker.phone : "+1 (***) ***-****"}
//                         {!hasSubscription && (
//                           <Lock className="inline h-3 w-3 ml-1 text-amber-500" />
//                         )}
//                       </p>
//                     </div>
//                   </div>

//                   <div>
//                     <h4 className="font-medium text-gray-900 mb-2">
//                       Key Skills:
//                     </h4>
//                     <div className="flex flex-wrap gap-2">
//                       {(seeker.skills || []).slice(0, 5).map((skill, index) => (
//                         <Badge
//                           key={index}
//                           variant="secondary"
//                           className="bg-green-100 text-green-800"
//                         >
//                           {skill}
//                         </Badge>
//                       ))}
//                       {(seeker.skills || []).length > 5 && (
//                         <Badge
//                           variant="secondary"
//                           className="bg-green-100 text-green-800"
//                         >
//                           +{(seeker.skills || []).length - 5}
//                         </Badge>
//                       )}
//                     </div>
//                   </div>

//                   <div className="bg-gray-50 p-3 rounded-md text-sm">
//                     <span className="font-medium text-gray-900">
//                       Availability:{" "}
//                     </span>
//                     <span className="text-gray-700">{seeker.availability}</span>
//                   </div>

//                   <div className="flex flex-wrap gap-3 pt-4">
//                     {hasSubscription ? (
//                       <>
//                         <Button
//                           className="bg-blue-600 hover:bg-blue-700 flex-1 min-w-[140px]"
//                           onClick={() => setSelectedSeeker(seeker)}
//                         >
//                           Contact Now
//                         </Button>
//                         <Button
//                           variant="outline"
//                           className="flex-1 min-w-[120px]"
//                           onClick={() => handleSaveCandidate(seeker.id)}
//                         >
//                           Save Candidate
//                         </Button>
//                         <Button
//                           variant="ghost"
//                           size="sm"
//                           className="flex-1 min-w-[100px]"
//                           onClick={() => setSelectedSeeker1(seeker)}
//                         >
//                           View Full
//                         </Button>
//                       </>
//                     ) : (
//                       <Button
//                         className="bg-blue-600 hover:bg-blue-700 w-full"
//                         onClick={() => setActiveTab && setActiveTab("subscription")}
//                       >
//                         Subscribe to Get the Contact Details
//                       </Button>
//                     )}
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//           ))
//         ) : (
//           <Card className="border-0 shadow-none sm:shadow-sm sm:border">
//             <CardContent className="p-8 text-center">
//               <Search className="mx-auto h-12 w-12 text-gray-400" />
//               <h3 className="mt-4 text-lg font-medium text-gray-900">
//                 No candidates found
//               </h3>
//               <p className="mt-2 text-sm text-gray-500">
//                 Try adjusting your search or filter to find what you're looking
//                 for.
//               </p>
//             </CardContent>
//           </Card>
//         )}
//       </div>

//       {/* Full Profile Dialog */}
//       <Dialog
//         open={!!selectedSeeker}
//         onOpenChange={(open) => !open && setSelectedSeeker(null)}
//       >
//         <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
//           {selectedSeeker && (
//             <>
//               <DialogHeader>
//                 <DialogTitle className="text-lg sm:text-xl">
//                   {selectedSeeker.name} Basic Contact Details Profile
//                 </DialogTitle>
//                 <DialogDescription className="text-sm sm:text-base">
//                   {selectedSeeker.highest_qualification ||
//                     "No qualification info"}
//                 </DialogDescription>
//               </DialogHeader>

//               <div className="space-y-3 mt-4 text-sm sm:text-base">
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
//                   <div>
//                     <p className="font-medium">Email:</p>
//                     <p>{selectedSeeker.email}</p>
//                   </div>
//                   <div>
//                     <p className="font-medium">Phone:</p>
//                     <p>{selectedSeeker.phone}</p>
//                   </div>
//                   <div>
//                     <p className="font-medium">Experience:</p>
//                     <p>{selectedSeeker.years_of_experience} years</p>
//                   </div>
//                   <div>
//                     <p className="font-medium">Location:</p>
//                     <p>{selectedSeeker.current_location}</p>
//                   </div>
//                   <div>
//                     <p className="font-medium">Availability:</p>
//                     <p>{selectedSeeker.availability}</p>
//                   </div>
//                   <div>
//                     <p className="font-medium">Specialization:</p>
//                     <p>{selectedSeeker.specialization}</p>
//                   </div>
//                 </div>

//                 <div className="pt-3">
//                   <p className="font-medium">Skills:</p>
//                   <div className="flex flex-wrap gap-2 mt-1">
//                     {(selectedSeeker.skills || []).map((skill, index) => (
//                       <Badge
//                         key={index}
//                         variant="secondary"
//                         className="bg-green-100 text-green-800"
//                       >
//                         {skill}
//                       </Badge>
//                     ))}
//                   </div>
//                 </div>
//               </div>

//               <DialogFooter className="mt-6">
//                 <Button
//                   variant="outline"
//                   onClick={() => setSelectedSeeker(null)}
//                 >
//                   Close
//                 </Button>
//               </DialogFooter>
//             </>
//           )}
//         </DialogContent>
//       </Dialog>

//       {/* Detailed Profile Dialog */}
//       <Dialog
//         open={!!selectedSeeker1}
//         onOpenChange={(open) => !open && setSelectedSeeker1(null)}
//       >
//         <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
//           {selectedSeeker1 && (
//             <>
//               <DialogHeader>
//                 <DialogTitle className="text-lg sm:text-xl">
//                   {selectedSeeker1.name} Full Profile
//                 </DialogTitle>
//               </DialogHeader>

//               <div className="space-y-3 mt-4 text-sm sm:text-base">
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
//                   <div>
//                     <p className="font-medium">Email:</p>
//                     <p>{selectedSeeker1.email}</p>
//                   </div>
//                   <div>
//                     <p className="font-medium">Phone:</p>
//                     <p>{selectedSeeker1.phone}</p>
//                   </div>
//                   <div>
//                     <p className="font-medium">Highest Qualification:</p>
//                     <p>{selectedSeeker1.highest_qualification}</p>
//                   </div>
//                   <div>
//                     <p className="font-medium">Specialization:</p>
//                     <p>{selectedSeeker1.specialization}</p>
//                   </div>
//                   <div>
//                     <p className="font-medium">Years of Experience:</p>
//                     <p>{selectedSeeker1.years_of_experience} years</p>
//                   </div>
//                   <div>
//                     <p className="font-medium">Previous Work Experience:</p>
//                     <p>{selectedSeeker1.previous_experience || "N/A"}</p>
//                   </div>

//                   <div>
//                     <p className="font-medium">Current Location:</p>
//                     <p>{selectedSeeker1.current_location}</p>
//                   </div>
//                   <div>
//                     <p className="font-medium">Preferred Work Location:</p>
//                     <p>{selectedSeeker1.preferred_location}</p>
//                   </div>
//                   <div>
//                     <p className="font-medium">Availability to Start:</p>
//                     <p>{selectedSeeker1.availability}</p>
//                   </div>
//                 </div>

//                 <div className="pt-3">
//                   <p className="font-medium">Skills & Competencies:</p>
//                   <div className="flex flex-wrap gap-2 mt-1">
//                     {(selectedSeeker1.skills || []).map((skill, index) => (
//                       <Badge
//                         key={index}
//                         variant="secondary"
//                         className="bg-green-100 text-green-800"
//                       >
//                         {skill}
//                       </Badge>
//                     ))}
//                   </div>
//                 </div>
//               </div>

//               <DialogFooter className="mt-6">
//                 <Button
//                   variant="outline"
//                   onClick={() => setSelectedSeeker1(null)}
//                 >
//                   Close
//                 </Button>
//               </DialogFooter>
//             </>
//           )}
//         </DialogContent>
//       </Dialog>

//       {/* Load More Button */}
//       {filteredSeekers.length > 0 && (
//         <div className="text-center pt-4">
//           <Button variant="outline" size="lg">
//             Load More Candidates
//           </Button>
//         </div>
//       )}
//     </div>
//   );
// };

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  MapPin,
  GraduationCap,
  Briefcase,
  User,
  Lock,
  Crown,
  Phone,
  CheckCircle,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { mixpanelInstance } from "@/utils/mixpanel";

interface JobSeekerProfilesProps {
  setActiveTab?: (tab: string) => void;
}

export const JobSeekerProfiles = ({ setActiveTab }: JobSeekerProfilesProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [hasSubscription, setHasSubscription] = useState(false);
  const [jobSeeker, setJobSeeker] = useState([]);
  const [selectedSeeker, setSelectedSeeker] = useState(null);
  const [selectedSeeker1, setSelectedSeeker1] = useState(null);
  const [showPaymentSuccess, setShowPaymentSuccess] = useState(false);
  const { toast } = useToast();
  const [showContactInfo, setShowContactInfo] = useState(false);
  const [contactSeekerId, setContactSeekerId] = useState(null);
  //  useEffect(() => {
  //    const fetchData = async () => {
  //      const {
  //        data: { user },
  //        error: userError,
  //      } = await supabase.auth.getUser();

  //      if (userError || !user) return;

  //      // Check subscription status
  //      const { data: subscriptionData } = await supabase
  //        .from("provider_subscriptions")
  //        .select("status, end_date")
  //        .eq("user_id", user.id)
  //        .gte("end_date", new Date().toISOString())
  //        .order("end_date", { ascending: false })
  //        .limit(1)
  //        .maybeSingle();

  //      setHasSubscription(subscriptionData?.status === "active");

  //      // Check for payment success in URL params
  //      const urlParams = new URLSearchParams(window.location.search);
  //      const paymentSuccess = urlParams.get("payment_success");
  //      if (paymentSuccess === "true") {
  //        setShowPaymentSuccess(true);
  //        // Clean up the URL
  //        window.history.replaceState(
  //          {},
  //          document.title,
  //          window.location.pathname
  //        );
  //      }

  //      // Fetch job seekers
  //      const { data, error } = await supabase
  //        .from("job_seekers")
  //        .select("*")
  //        .eq("user_id", user.id);

  //      if (!error) setJobSeeker(data);
  //    };

  //    fetchData();
  //  }, []);
  useEffect(() => {
    const fetchData = async () => {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) return;

      try {
        // First get the provider record for this user
        const { data: providerData } = await supabase
          .from("job_providers")
          .select("id")
          .eq("user_id", user.id)
          .maybeSingle();

        if (!providerData) {
          // No provider record found - user is not a job provider
          setHasSubscription(false);
          return;
        }

        // Check subscription status using provider_id
        const { data: subscriptionData } = await supabase
          .from("provider_subscriptions")
          .select("status, end_date")
          .eq("provider_id", providerData.id)
          .gte("end_date", new Date().toISOString())
          .order("end_date", { ascending: false })
          .limit(1)
          .maybeSingle();

        setHasSubscription(subscriptionData?.status === "active");

        // Check for payment success in URL params
        const urlParams = new URLSearchParams(window.location.search);
        const paymentSuccess = urlParams.get("payment_success");
        if (paymentSuccess === "true") {
          setShowPaymentSuccess(true);
          // Clean up the URL
          window.history.replaceState(
            {},
            document.title,
            window.location.pathname
          );
        }

        // Fetch job seekers
        const { data, error } = await supabase
          .from("job_seekers")
          .select("*")
          .eq("user_id", user.id);

        if (!error) setJobSeeker(data);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast({
          title: "Error",
          description: "Failed to load data",
          variant: "destructive",
        });
      }
    };

    fetchData();
  }, []);
  useEffect(() => {
    const fetchJobSeekerProfile = async () => {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) return;

      const { data, error } = await supabase
        .from("job_seekers")
        .select("*")
        .eq("user_id", user.id);

      if (!error) setJobSeeker(data);
    };

    fetchJobSeekerProfile();
  }, []);
  const handleContactNow = (seeker) => {
    if (hasSubscription) {
      setContactSeekerId(seeker.id);
      setShowContactInfo(true);
    } else {
      setActiveTab("subscription");
    }
  };

  // const filteredSeekers = jobSeeker.filter((seeker) => {
  //   const term = searchTerm.toLowerCase();
  //   return (
  //     (seeker.name || "").toLowerCase().includes(term) ||
  //     (seeker.highest_qualification || "").toLowerCase().includes(term) ||
  //     (seeker.specialization || "").toLowerCase().includes(term) ||
  //     (seeker.skills || "").toLowerCase().includes(term)
  //   );
  // });
const filteredSeekers = jobSeeker.filter((seeker) => {
  const term = searchTerm.toLowerCase();

  const skills = Array.isArray(seeker.skills)
    ? seeker.skills.join(" ").toLowerCase()
    : (seeker.skills || "").toLowerCase();

  return (
    (seeker.name || "").toLowerCase().includes(term) ||
    (seeker.highest_qualification || "").toLowerCase().includes(term) ||
    (seeker.specialization || "").toLowerCase().includes(term) ||
    skills.includes(term)
  );
});

  const handleSaveCandidate = async (seekerId) => {
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      toast({
        title: "Error",
        description: "User not logged in",
        variant: "destructive",
      });
      return;
    }

    const { data: existing } = await supabase
      .from("save_profile")
      .select("id")
      .eq("user_id", user.id)
      .eq("job_seekers_id", seekerId)
      .maybeSingle();

    if (existing) {
      toast({
        title: "Already Saved",
        description: "This profile is already saved.",
      });
      return;
    }

    const { error } = await supabase.from("save_profiles").insert({
      user_id: user.id,
      job_seekers_id: seekerId,
    });

    if (error) {
      toast({
        title: "Error",
        description: "Could not save candidate",
        variant: "destructive",
      });
    } else {
      toast({ title: "Saved", description: "Candidate saved successfully." });
    }
  };

  return (
    <div className="space-y-6 px-2 sm:px-0">
      <Dialog open={showPaymentSuccess} onOpenChange={setShowPaymentSuccess}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <div className="flex justify-center">
              <CheckCircle className="h-12 w-12 text-green-500" />
            </div>
            <DialogTitle className="text-center">
              Payment Successful!
            </DialogTitle>
            <DialogDescription className="text-center">
              Your subscription is now active. You can access all premium
              features.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-center">
            <Button
              onClick={() => setShowPaymentSuccess(false)}
              className="w-full"
            >
              Continue to Profiles
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      {/* Premium Banner */}
      {!hasSubscription && (
        <Card className="border-amber-200 bg-amber-50">
          <CardHeader className="p-4 sm:p-6">
            <CardTitle className="flex items-center gap-2 text-amber-800 text-base sm:text-xl">
              <Crown className="h-4 w-4 sm:h-5 sm:w-5" />
              Premium Access Required
            </CardTitle>
            <CardDescription className="text-amber-700 text-sm sm:text-base">
              Subscribe to access full contact details and premium features for
              candidate recruitment.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 pt-0">
            <Button
              className="bg-amber-600 hover:bg-amber-700 w-full sm:w-auto"
              onClick={() => setActiveTab("subscription")}
            >
              Subscribe Now
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Search Section */}
      <Card className="border-0 shadow-none sm:shadow-sm sm:border">
        <CardContent className="p-4 sm:p-6">
          <div className="flex flex-col gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="   Search by name, qualification, skills..."
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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
          {filteredSeekers.length} Candidate
          {filteredSeekers.length !== 1 ? "s" : ""} Found
        </h2>
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline">All Specializations</Badge>
          <Badge variant="outline">Available Now</Badge>
          <Badge variant="outline">Experienced</Badge>
        </div>
      </div>

      {/* Candidates List */}
      <div className="grid gap-4 sm:gap-6">
        {filteredSeekers.map((seeker) => (
          <Card
            key={seeker.id}
            className="hover:shadow-lg transition-shadow border-0 sm:border"
          >
            <CardHeader className="p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div className="space-y-2">
                  <CardTitle className="text-lg sm:text-xl text-blue-600 flex items-center gap-2">
                    <User className="h-4 w-4 sm:h-5 sm:w-5" />
                    {seeker.name}
                  </CardTitle>
                  <CardDescription className="text-base sm:text-lg font-medium text-gray-900">
                    {seeker.qualification}
                  </CardDescription>
                </div>
                <a
                  href={`tel:+91${seeker.phone}`}
                  className="self-start sm:self-auto"
                >
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-1"
                  >
                    <Phone className="h-4 w-4" />
                    <span className="hidden sm:inline">Contact</span>
                  </Button>
                </a>
              </div>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 pt-0">
              <div className="space-y-4">
                <div className="flex flex-wrap gap-3 text-sm text-gray-600">
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
                  <h4 className="font-medium text-gray-900">
                    Contact Information:
                  </h4>
                  <div className="space-y-1">
                    <p className="text-sm text-gray-600 flex items-center">
                      Email: {hasSubscription ? seeker.email : "***@***.com"}
                      {!hasSubscription && (
                        <Lock className="inline h-3 w-3 ml-1 text-amber-500" />
                      )}
                    </p>
                    <p className="text-sm text-gray-600 flex items-center">
                      Phone:{" "}
                      {hasSubscription ? seeker.phone : "+1 (***) ***-****"}
                      {!hasSubscription && (
                        <Lock className="inline h-3 w-3 ml-1 text-amber-500" />
                      )}
                    </p>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 mb-2">
                    Key Skills:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {(seeker.skills || []).slice(0, 5).map((skill, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="bg-green-100 text-green-800"
                      >
                        {skill}
                      </Badge>
                    ))}
                    {(seeker.skills || []).length > 5 && (
                      <Badge
                        variant="secondary"
                        className="bg-green-100 text-green-800"
                      >
                        +{(seeker.skills || []).length - 5}
                      </Badge>
                    )}
                  </div>
                </div>

                <div className="bg-gray-50 p-3 rounded-md text-sm">
                  <span className="font-medium text-gray-900">
                    Availability:{" "}
                  </span>
                  <span className="text-gray-700">{seeker.availability}</span>
                </div>

                {/* <div className="flex flex-wrap gap-3 pt-4">
                  <Button className="bg-blue-600 hover:bg-blue-700 flex-1 min-w-[140px]">
                    {hasSubscription ? "Contact Now" : "Subscribe to Contact"}
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1 min-w-[120px]"
                    onClick={() => handleSaveCandidate(seeker.id)}
                  >
                    Save Candidate
                  </Button>

                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex-1 min-w-[100px]"
                    onClick={() => setSelectedSeeker(seeker)}
                  >
                    View Full
                  </Button>
                </div> */}
                {/* <div className="flex flex-wrap gap-3 pt-4">
                  {hasSubscription ? (
                    <>
                      <Button
                        className="bg-blue-600 hover:bg-blue-700 flex-1 min-w-[140px]"
                        onClick={() => handleContactNow(seeker)}
                      >
                        Contact Now
                      </Button>
                      <Button
                        variant="outline"
                        className="flex-1 min-w-[120px]"
                        onClick={() => handleSaveCandidate(seeker.id)}
                      >
                        Save Candidate
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="flex-1 min-w-[100px]"
                        onClick={() => setSelectedSeeker(seeker)}
                      >
                        View Full
                      </Button>
                    </>
                  ) : (
                    <Button
                      className="bg-blue-600 hover:bg-blue-700 w-full"
                      onClick={() => setActiveTab("subscription")}
                    >
                      Subscribe to Get the Contact Details
                    </Button>
                  )}
                </div> */}
                <div className="flex flex-wrap gap-3 pt-4">
                  {hasSubscription ? (
                    <>
                      <Button
                        className="bg-blue-600 hover:bg-blue-700 flex-1 min-w-[140px]"
                        onClick={() => {
                          mixpanelInstance.track(
                            " Contact Now view job Button Clicked",
                            {
                              timestamp: new Date().toISOString(),
                            }
                          );
                          setSelectedSeeker(seeker);
                        }}
                        // onClick={() => setSelectedSeeker(seeker)}
                      >
                        Contact Now
                      </Button>
                      <Button
                        variant="outline"
                        className="flex-1 min-w-[120px]"
                        onClick={() => {
                          mixpanelInstance.track(
                            " Save Candidate view job Button Clicked",
                            {
                              timestamp: new Date().toISOString(),
                            }
                          );
                          handleSaveCandidate(seeker.id);
                        }}
                        // onClick={() => handleSaveCandidate(seeker.id)}
                      >
                        Save Candidate
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="flex-1 min-w-[100px]"
                        onClick={() => {
                          mixpanelInstance.track(
                            " View Full job Button Clicked",
                            {
                              timestamp: new Date().toISOString(),
                            }
                          );
                          setSelectedSeeker1(seeker);
                        }}
                        // onClick={() => setSelectedSeeker1(seeker)}
                      >
                        View Full
                      </Button>
                    </>
                  ) : (
                    <Button
                      className="bg-blue-600 hover:bg-blue-700 w-full"
                      onClick={() => {
                        mixpanelInstance.track(
                          " Subscribe view job Button Clicked",
                          {
                            timestamp: new Date().toISOString(),
                          }
                        );
                        setActiveTab && setActiveTab("subscription");
                      }}
                      // onClick={() =>
                      //   setActiveTab && setActiveTab("subscription")
                      // }
                    >
                      Subscribe to Get the Contact Details
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Full Profile Dialog */}
      <Dialog
        open={!!selectedSeeker}
        onOpenChange={(open) => !open && setSelectedSeeker(null)}
      >
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          {selectedSeeker && (
            <>
              <DialogHeader>
                <DialogTitle className="text-lg sm:text-xl">
                  {selectedSeeker.name} Basic Contact Details Profile
                </DialogTitle>
                <DialogDescription className="text-sm sm:text-base">
                  {selectedSeeker.highest_qualification ||
                    "No qualification info"}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-3 mt-4 text-sm sm:text-base">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <p className="font-medium">Email:</p>
                    <p>{selectedSeeker.email}</p>
                  </div>
                  <div>
                    <p className="font-medium">Phone:</p>
                    <p>{selectedSeeker.phone}</p>
                  </div>
                  <div>
                    <p className="font-medium">Experience:</p>
                    <p>{selectedSeeker.years_of_experience} years</p>
                  </div>
                  <div>
                    <p className="font-medium">Location:</p>
                    <p>{selectedSeeker.current_location}</p>
                  </div>
                  <div>
                    <p className="font-medium">Availability:</p>
                    <p>{selectedSeeker.availability}</p>
                  </div>
                  <div>
                    <p className="font-medium">Specialization:</p>
                    <p>{selectedSeeker.specialization}</p>
                  </div>
                </div>

                <div className="pt-3">
                  <p className="font-medium">Skills:</p>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {(selectedSeeker.skills || []).map((skill, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="bg-green-100 text-green-800"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              <DialogFooter className="mt-6">
                <Button
                  variant="outline"
                  onClick={() => {
                    mixpanelInstance.track(" Close view job Button Clicked", {
                      timestamp: new Date().toISOString(),
                    });
                    setSelectedSeeker(null);
                  }}
                  // onClick={() => setSelectedSeeker(null)}
                >
                  Close
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
      {/* Detailed Profile Dialog */}
      <Dialog
        open={!!selectedSeeker1}
        onOpenChange={(open) => !open && setSelectedSeeker1(null)}
      >
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          {selectedSeeker1 && (
            <>
              <DialogHeader>
                <DialogTitle className="text-lg sm:text-xl">
                  {selectedSeeker1.name} Full Profile
                </DialogTitle>
              </DialogHeader>

              <div className="space-y-3 mt-4 text-sm sm:text-base">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <p className="font-medium">Email:</p>
                    <p>{selectedSeeker1.email}</p>
                  </div>
                  <div>
                    <p className="font-medium">Phone:</p>
                    <p>{selectedSeeker1.phone}</p>
                  </div>
                  <div>
                    <p className="font-medium">Highest Qualification:</p>
                    <p>{selectedSeeker1.highest_qualification}</p>
                  </div>
                  <div>
                    <p className="font-medium">Specialization:</p>
                    <p>{selectedSeeker1.specialization}</p>
                  </div>
                  <div>
                    <p className="font-medium">Years of Experience:</p>
                    <p>{selectedSeeker1.years_of_experience} years</p>
                  </div>
                  <div>
                    <p className="font-medium">Previous Work Experience:</p>
                    <p>{selectedSeeker1.previous_experience || "N/A"}</p>
                  </div>

                  <div>
                    <p className="font-medium">Current Location:</p>
                    <p>{selectedSeeker1.current_location}</p>
                  </div>
                  <div>
                    <p className="font-medium">Preferred Work Location:</p>
                    <p>{selectedSeeker1.preferred_location}</p>
                  </div>
                  <div>
                    <p className="font-medium">Availability to Start:</p>
                    <p>{selectedSeeker1.availability}</p>
                  </div>
                </div>

                <div className="pt-3">
                  <p className="font-medium">Skills & Competencies:</p>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {(selectedSeeker1.skills || []).map((skill, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="bg-green-100 text-green-800"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              <DialogFooter className="mt-6">
                <Button
                  variant="outline"
                  onClick={() => {
                    mixpanelInstance.track(
                      " Close view job Button Clicked",
                      {
                        timestamp: new Date().toISOString(),
                      }
                    );
                    setSelectedSeeker1(null);
                  }}
                  // onClick={() => setSelectedSeeker1(null)}
                >
                  Close
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Load More Button */}
      {filteredSeekers.length > 0 && (
        <div className="text-center pt-4">
          <Button variant="outline" size="lg">
            Load More Candidates
          </Button>
        </div>
      )}
    </div>
  );
};
