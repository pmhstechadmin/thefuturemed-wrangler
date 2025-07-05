





// import { useEffect, useState } from "react";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import {
//   Search,
//   MapPin,
//   Clock,
//   DollarSign,
//   Briefcase,
//   Building,
//   X,
// } from "lucide-react";
// import { supabase } from "@/integrations/supabase/client";

// export const JobListings = () => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [locationFilter, setLocationFilter] = useState("");
//   const [jobs, setJobs] = useState([]);
//   const [jobSeekers, setJobSeekers] = useState([]);
//   const [user, setUser] = useState(null);
//   const [selectedJobId, setSelectedJobId] = useState(null);
//   const [selectedSeekerId, setSelectedSeekerId] = useState(null);
//   const [appliedSeekerIds, setAppliedSeekerIds] = useState([]);

//   useEffect(() => {
//     const checkUser = async () => {
//       const {
//         data: { session },
//         error,
//       } = await supabase.auth.getSession();
//       if (error) console.error("Session error:", error);
//       setUser(session?.user || null);
//     };
//     checkUser();
//   }, []);

//   useEffect(() => {
//     const fetchJobs = async () => {
//       const {
//         data: { user },
//       } = await supabase.auth.getUser();
//       if (!user) return;

//       const { data, error } = await supabase
//         .from("job_providers")
//         .select("*")
//         .neq("user_id", user.id);

//       if (error) {
//         console.error("Error fetching jobs:", error);
//       } else {
//         setJobs(data);
//       }
//     };
//     fetchJobs();
//   }, []);

//   useEffect(() => {
//     const fetchJobSeekers = async () => {
//       const {
//         data: { user },
//       } = await supabase.auth.getUser();
//       if (!user) return;

//       const { data, error } = await supabase
//         .from("job_seekers")
//         .select("*")
//         .eq("user_id", user.id);
//       if (error) {
//         console.error("Error fetching seekers:", error);
//       } else {
//         setJobSeekers(data);
//       }
//     };
//     fetchJobSeekers();
//   }, []);
// // 888888888888888888888
//   useEffect(() => {
//     const fetchApplications = async () => {
//       if (!selectedJobId) return;

//       const { data, error } = await supabase
//         .from("job_applications")
//         .select("job_seekers_id")
//         .eq("job_providers_id", selectedJobId);


//       if (error) {
//         console.error("Error checking applications:", error);
//       } else {
//         const ids = data.map((app) => app.job_seekers_id);
//         setAppliedSeekerIds(ids);
//       }
//     };

//     fetchApplications();
//   }, [selectedJobId]);

//   const filteredJobs = jobs.filter((job) => {
//     const org = job.organization_name || "";
//     const manager = job.manager_name || "";
//     const location = job.google_location || "";
//     const orgType = job.organization_type || "";

//     const matchesSearch =
//       org.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       manager.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       orgType.toLowerCase().includes(searchTerm.toLowerCase());

//     const matchesLocation =
//       locationFilter === "" ||
//       location.toLowerCase().includes(locationFilter.toLowerCase());

//     return matchesSearch && matchesLocation;
//   });

//   const handleApplyOnBehalf = async (seekerId) => {
//     const selectedSeeker = jobSeekers.find(seeker => seeker.id === seekerId);

//     const { data: existingApplications, error: fetchError } = await supabase
//       .from("job_applications")
//       .select("*")
//       .eq("job_providers_id", selectedJobId)

//       .eq("job_seekers_id", seekerId)
//       .limit(1);

//     if (fetchError) {
//       console.error("Error checking existing application:", fetchError);
//       alert("Error checking application status.");
//       return;
//     }

//     if (existingApplications.length > 0) {
//       alert(`⚠️ This seeker has already applied for this job.`);
//       return;
//     }

//     console.log("📤 Applying with data:", {
//       job_providers_id: selectedJobId,
//       job_seekers_id: seekerId,
//       seeker_profile: selectedSeeker,
//     });

//     try {
//       const { error } = await supabase.from("job_applications").insert([
//         {
//           job_providers_id: selectedJobId,
//           job_seekers_id: seekerId,
//           created_at: new Date().toISOString(),
//           updated_at: new Date().toISOString(),
//         }
//       ]);

//       if (error) {
//         console.error("Insert error:", error);
//         alert("Failed to apply.");
//       } else {
//         // alert("✅ Application submitted successfully.");
//         setAppliedSeekerIds((prev) => [...prev, seekerId]);
//       }
//     } catch (err) {
//       console.error("Unexpected error:", err);
//       alert("Something went wrong.");
//     }
//   };

//   return (
//     <div className="space-y-6">
//       <Card>
//         <CardContent className="p-6">
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//             <div className="relative">
//               <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
//               <Input
//                 placeholder="Search jobs, companies..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="pl-10"
//               />
//             </div>
//             <div className="relative">
//               <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
//               <Input
//                 placeholder="Location"
//                 value={locationFilter}
//                 onChange={(e) => setLocationFilter(e.target.value)}
//                 className="pl-10"
//               />
//             </div>
//             <Button className="w-full bg-blue-600 hover:bg-blue-700">
//               <Search className="mr-2 h-4 w-4" />
//               Search Jobs
//             </Button>
//           </div>
//         </CardContent>
//       </Card>

//       <div className="flex items-center justify-between">
//         <h2 className="text-xl font-semibold text-gray-900">
//           {filteredJobs.length} Job{filteredJobs.length !== 1 ? "s" : ""} Found
//         </h2>
//         <div className="flex gap-2">
//           <Badge variant="outline">All Categories</Badge>
//           <Badge variant="outline">Full-time</Badge>
//           <Badge variant="outline">Remote</Badge>
//         </div>
//       </div>

//       <div className="grid gap-6">
//         {filteredJobs.map((job) => (
//           <Card key={job.id} className="hover:shadow-lg transition-shadow">
//             <CardHeader>
//               <div className="flex items-start justify-between">
//                 <div className="space-y-2">
//                   <CardTitle className="text-xl text-blue-600 hover:text-blue-700 cursor-pointer">
//                     {job.title}
//                   </CardTitle>
//                   <CardDescription className="text-lg font-medium text-gray-900 flex items-center gap-2">
//                     <Building className="h-4 w-4" />
//                     {job.organization_name}
//                   </CardDescription>
//                 </div>
//                 <Button
//                   variant="outline"
//                   size="sm"
//                   onClick={() => {
//                     setSelectedJobId(job.id);
//                     setSelectedSeekerId(null);
//                   }}
//                 >
//                   Apply Now
//                 </Button>
//               </div>
//             </CardHeader>
//             <CardContent>
//               <div className="space-y-4">
//                 <div className="flex flex-wrap gap-4 text-sm text-gray-600">
//                   <div className="flex items-center">
//                     <MapPin className="mr-1 h-4 w-4" />
//                     {job.google_location}
//                   </div>
//                   <div className="flex items-center">
//                     <Briefcase className="mr-1 h-4 w-4" />
//                     {job.organization_type}
//                   </div>
//                   <div className="flex items-center">
//                     <DollarSign className="mr-1 h-4 w-4" />
//                     {job.salary}
//                   </div>
//                   <div className="flex items-center">
//                     <Clock className="mr-1 h-4 w-4" />
//                     Posted on{" "}
//                     {new Date(job.updated_at).toLocaleDateString("en-US", {
//                       year: "numeric",
//                       month: "long",
//                       day: "numeric",
//                     })}
//                   </div>
//                 </div>

//                 <p className="text-gray-700 leading-relaxed">{job.description}</p>

//                 <div className="flex flex-wrap gap-2">
//                   {Array.isArray(job.tags) &&
//                     job.tags.map((tag, index) => (
//                       <Badge
//                         key={index}
//                         variant="secondary"
//                         className="bg-blue-100 text-blue-800"
//                       >
//                         {tag}
//                       </Badge>
//                     ))}
//                 </div>

//                 <div className="flex gap-3 pt-4">
//                   <Button
//                     className="bg-blue-600 hover:bg-blue-700"
//                     onClick={() => {
//                       setSelectedJobId(job.id);
//                       setSelectedSeekerId(null);
//                     }}
//                   >
//                     Apply Now
//                   </Button>
//                   <Button variant="outline">Save Job</Button>
//                   {/* ########################################################################################## */}
//                   <Button variant="ghost" size="sm">
//                     View Details
//                   </Button>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         ))}
//       </div>

//       {selectedJobId && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white rounded-lg max-w-3xl w-full max-h-[80vh] overflow-y-auto p-6 relative shadow-lg">
//             <button
//               className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-200"
//               onClick={() => {
//                 setSelectedJobId(null);
//                 setSelectedSeekerId(null);
//               }}
//               aria-label="Close modal"
//             >
//               <X className="h-6 w-6" />
//             </button>

//             <h2 className="text-2xl font-bold mb-4">Job Seeker Profiles</h2>

//             {jobSeekers.map((seeker) => (
//               <Card
//                 key={seeker.id}
//                 className={`mb-4 ${selectedSeekerId === seeker.id ? "border-2 border-blue-600" : "border"}`}
//               >
//                 <CardHeader>
//                   <CardTitle>{seeker.highest_qualification}</CardTitle>
//                   <CardDescription>{seeker.specialization}</CardDescription>
//                 </CardHeader>
//                 <CardContent className="space-y-2">
//                   <p><strong>Skills:</strong> {Array.isArray(seeker.skills) ? seeker.skills.join(", ") : "N/A"}</p>
//                   <p><strong>Experience:</strong> {seeker.years_of_experience || "N/A"} years</p>
//                   <p><strong>Preferred Location:</strong> {seeker.preferred_location}</p>
//                   <p><strong>Availability:</strong> {seeker.availability}</p>
//                   <p><strong>Email:</strong> {seeker.email}</p>
//                   <p><strong>Phone:</strong> {seeker.phone}</p>

//                   {appliedSeekerIds.includes(seeker.id) ? (
//                     <Button className="mt-3 bg-gray-400 cursor-not-allowed" disabled>
//                       Already Applied
//                     </Button>
//                   ) : (
//                     <Button
//                       className="mt-3 bg-green-600 hover:bg-green-700"
//                       onClick={() => handleApplyOnBehalf(seeker.id)}
//                     >
//                       Apply Here
//                     </Button>
//                   )}
//                 </CardContent>
//               </Card>
//             ))}
//           </div>
//         </div>
//       )}

//       <div className="text-center">
//         <Button variant="outline" size="lg">
//           Load More Jobs
//         </Button>
//       </div>
//     </div>
//   );
// };





// import { useEffect, useState } from "react";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import {
//   Search,
//   MapPin,
//   Clock,
//   DollarSign,
//   Briefcase,
//   Building,
//   X,
// } from "lucide-react";
// import { supabase } from "@/integrations/supabase/client";

// export const JobListings = () => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [locationFilter, setLocationFilter] = useState("");
//   const [jobs, setJobs] = useState([]);
//   const [jobSeekers, setJobSeekers] = useState([]);
//   const [user, setUser] = useState(null);
//   const [selectedJobId, setSelectedJobId] = useState(null);
//   const [selectedSeekerId, setSelectedSeekerId] = useState(null);
//   const [appliedSeekerIds, setAppliedSeekerIds] = useState([]);
//   const [viewedJob, setViewedJob] = useState(null);


//   useEffect(() => {
//     const checkUser = async () => {
//       const {
//         data: { session },
//         error,
//       } = await supabase.auth.getSession();
//       if (error) console.error("Session error:", error);
//       setUser(session?.user || null);
//     };
//     checkUser();
//   }, []);

//   useEffect(() => {
//     const fetchJobs = async () => {
//       const {
//         data: { user },
//       } = await supabase.auth.getUser();
//       if (!user) return;

//       const { data, error } = await supabase
//         .from("job_providers")
//         .select("*")
//         .neq("user_id", user.id);

//       if (error) {
//         console.error("Error fetching jobsssssssssss:", error);
//       } else {
//           console.log("✅ Fetched Jobszzzzzzzzz:", data);
//         setJobs(data);
//       }
//     };
//     fetchJobs();
//   }, []);

//   useEffect(() => {
//     const fetchJobSeekers = async () => {
//       const {
//         data: { user },
//       } = await supabase.auth.getUser();
//       if (!user) return;

//       const { data, error } = await supabase
//         .from("job_seekers")
//         .select("*")
//         .eq("user_id", user.id);
//       if (error) {
//         console.error("Error fetching seekers:", error);
//       } else {
//         console.log("✅ Job Seekers Datazzzzzzzzzzzzzzz:", data);
//         setJobSeekers(data);
//       }
//     };
//     fetchJobSeekers();
//   }, []);
//   // 888888888888888888888
//   useEffect(() => {
//     const fetchApplications = async () => {
//       if (!selectedJobId) return;

//       const { data, error } = await supabase
//         .from("job_applications")
//         .select("job_seekers_id")
//         .eq("job_providers_id", selectedJobId);


//       if (error) {
//         console.error("Error checking applications:", error);
//       } else {
//         const ids = data.map((app) => app.job_seekers_id);
//         setAppliedSeekerIds(ids);
//       }
//     };

//     fetchApplications();
//   }, [selectedJobId]);

//   const filteredJobs = jobs.filter((job) => {
//     const org = job.organization_name || "";
//     const manager = job.manager_name || "";
//     const location = job.google_location || "";
//     const orgType = job.organization_type || "";
//       const email = job.manager_email || "";
//   const contact = job.manager_contact || "";


//     const matchesSearch =
//       org.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       manager.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       orgType.toLowerCase().includes(searchTerm.toLowerCase())||
//          email.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     contact.toLowerCase().includes(searchTerm.toLowerCase());

//     const matchesLocation =
//       locationFilter === "" ||
//       location.toLowerCase().includes(locationFilter.toLowerCase());

//     return matchesSearch && matchesLocation;
//   });

//   const handleApplyOnBehalf = async (seekerId) => {
//     const selectedSeeker = jobSeekers.find(seeker => seeker.id === seekerId);

//     const { data: existingApplications, error: fetchError } = await supabase
//       .from("job_applications")
//       .select("*")
//       .eq("job_providers_id", selectedJobId)

//       .eq("job_seekers_id", seekerId)
//       .limit(1);

//     if (fetchError) {
//       console.error("Error checking existing application:", fetchError);
//       alert("Error checking application status.");
//       return;
//     }

//     if (existingApplications.length > 0) {
//       alert(`⚠️ This seeker has already applied for this job.`);
//       return;
//     }

//     console.log("📤 Applying with data:", {
//       job_providers_id: selectedJobId,
//       job_seekers_id: seekerId,
//       seeker_profile: selectedSeeker,
//     });

//     try {
//       const { error } = await supabase.from("job_applications").insert([
//         {
//           job_providers_id: selectedJobId,
//           job_seekers_id: seekerId,
//           created_at: new Date().toISOString(),
//           updated_at: new Date().toISOString(),
//         }
//       ]);

//       if (error) {
//         console.error("Insert error:", error);
//         alert("Failed to apply.");
//       } else {
//         // alert("✅ Application submitted successfully.");
//         setAppliedSeekerIds((prev) => [...prev, seekerId]);
//       }
//     } catch (err) {
//       console.error("Unexpected error:", err);
//       alert("Something went wrong.");
//     }
//   };

//   return (
//     <div className="space-y-6">
//       <Card>
//         <CardContent className="p-6">
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//             <div className="relative">
//               <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
//               <Input
//                 placeholder="Search jobs, companies..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="pl-10"
//               />
//             </div>
//             <div className="relative">
//               <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
//               <Input
//                 placeholder="Location"
//                 value={locationFilter}
//                 onChange={(e) => setLocationFilter(e.target.value)}
//                 className="pl-10"
//               />
//             </div>
//             <Button className="w-full bg-blue-600 hover:bg-blue-700">
//               <Search className="mr-2 h-4 w-4" />
//               Search Jobs
//             </Button>
//           </div>
//         </CardContent>
//       </Card>

//       <div className="flex items-center justify-between">
//         <h2 className="text-xl font-semibold text-gray-900">
//           {filteredJobs.length} Job{filteredJobs.length !== 1 ? "s" : ""} Found
//         </h2>
//         <div className="flex gap-2">
//           <Badge variant="outline">All Categories</Badge>
//           <Badge variant="outline">Full-time</Badge>
//           <Badge variant="outline">Remote</Badge>
//         </div>
//       </div>

//       <div className="grid gap-6">
//         {filteredJobs.map((job) => (
//           <Card key={job.id} className="hover:shadow-lg transition-shadow">
//             <CardHeader>
//               <div className="flex items-start justify-between">
//                 <div className="space-y-2">
//                   <CardTitle className="text-xl text-blue-600 hover:text-blue-700 cursor-pointer">
//                     {job.title}
//                   </CardTitle>
//                   <CardDescription className="text-lg font-medium text-gray-900 flex items-center gap-2">
//                     <Building className="h-4 w-4" />
//                     {job.organization_name}
//                   </CardDescription>
//                 </div>
//                 <Button
//                   variant="outline"
//                   size="sm"
//                   onClick={() => {
//                     setSelectedJobId(job.id);
//                     setSelectedSeekerId(null);
//                   }}
//                 >
//                   Apply Now
//                 </Button>
//               </div>
//             </CardHeader>
//             <CardContent>
//               <div className="space-y-4">
//                 <div className="flex flex-wrap gap-4 text-sm text-gray-600">
//                   <div className="flex items-center">
//                     <MapPin className="mr-1 h-4 w-4" />
//                     {job.google_location}
//                   </div>
//                   <div className="flex items-center">
//                     <Briefcase className="mr-1 h-4 w-4" />
//                     {job.organization_type}
//                   </div>
//                   <div className="flex items-center">
//                     <DollarSign className="mr-1 h-4 w-4" />
//                     {job.salary}
//                   </div>
//                   <div className="flex items-center">
//                     <Clock className="mr-1 h-4 w-4" />
//                     Posted on{" "}
//                     {new Date(job.updated_at).toLocaleDateString("en-US", {
//                       year: "numeric",
//                       month: "long",
//                       day: "numeric",
//                     })}
//                   </div>
//                 </div>

//                 <p className="text-gray-700 leading-relaxed">{job.description}</p>

//                 <div className="flex flex-wrap gap-2">
//                   {Array.isArray(job.tags) &&
//                     job.tags.map((tag, index) => (
//                       <Badge
//                         key={index}
//                         variant="secondary"
//                         className="bg-blue-100 text-blue-800"
//                       >
//                         {tag}
//                       </Badge>
//                     ))}
//                 </div>

//                 <div className="flex gap-3 pt-4">
//                   <Button
//                     className="bg-blue-600 hover:bg-blue-700"
//                     onClick={() => {
//                       setSelectedJobId(job.id);
//                       setSelectedSeekerId(null);
//                     }}
//                   >
//                     Apply Now
//                   </Button>
//                   <Button variant="outline">Save Job</Button>
//                   {/* ########################################################################################## */}
//                   <Button
//                     variant="ghost"
//                     size="sm"
//                     onClick={() => setViewedJob(job)}
//                   >
//                     View Details
//                   </Button>

//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         ))}
//       </div>

//       {selectedJobId && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white rounded-lg max-w-3xl w-full max-h-[80vh] overflow-y-auto p-6 relative shadow-lg">
//             <button
//               className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-200"
//               onClick={() => {
//                 setSelectedJobId(null);
//                 setSelectedSeekerId(null);
//               }}
//               aria-label="Close modal"
//             >
//               <X className="h-6 w-6" />
//             </button>

//             <h2 className="text-2xl font-bold mb-4">Job Seeker Profiles</h2>

//             {jobSeekers.map((seeker) => (
//               <Card
//                 key={seeker.id}
//                 className={`mb-4 ${selectedSeekerId === seeker.id ? "border-2 border-blue-600" : "border"}`}
//               >
//                 <CardHeader>
//                   <CardTitle>{seeker.highest_qualification}</CardTitle>
//                   <CardDescription>{seeker.specialization}</CardDescription>
//                 </CardHeader>
//                 <CardContent className="space-y-2">
//                   <p><strong>Skills:</strong> {Array.isArray(seeker.skills) ? seeker.skills.join(", ") : "N/A"}</p>
//                   <p><strong>Experience:</strong> {seeker.years_of_experience || "N/A"} years</p>
//                   <p><strong>Preferred Location:</strong> {seeker.preferred_location}</p>
//                   <p><strong>Availability:</strong> {seeker.availability}</p>
//                   <p><strong>Email:</strong> {seeker.email}</p>
//                   <p><strong>Phone:</strong> {seeker.phone}</p>

//                   {appliedSeekerIds.includes(seeker.id) ? (
//                     <Button className="mt-3 bg-gray-400 cursor-not-allowed" disabled>
//                       Applied
//                     </Button>
//                   ) : (
//                     <Button
//                       className="mt-3 bg-green-600 hover:bg-green-700"
//                       onClick={() => handleApplyOnBehalf(seeker.id)}
//                     >
//                       Apply Here
//                     </Button>
//                   )}
//                 </CardContent>
//               </Card>
//             ))}
//           </div>
//         </div>
//       )}

//       {viewedJob && (
//   <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//     <div className="bg-white rounded-lg max-w-3xl w-full max-h-[80vh] overflow-y-auto p-6 relative shadow-lg">
//       <button
//         className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-200"
//         onClick={() => setViewedJob(null)}
//         aria-label="Close modal"
//       >
//         <X className="h-6 w-6" />
//       </button>

//       <h2 className="text-2xl font-bold mb-2">{viewedJob.title}</h2>
//       <p className="text-gray-600 mb-4">{viewedJob.description}</p>

//       <div className="space-y-2 text-sm">
//         <p><strong>Organization:</strong> {viewedJob.organization_name}</p>
//         <p><strong>Manager:</strong> {viewedJob.manager_name}</p>
//         <p><strong>Location:</strong> {viewedJob.google_location}</p>
//         <p><strong>Type:</strong> {viewedJob.organization_type}</p>
//         <p><strong>Salary:</strong> {viewedJob.salary}</p>
//         <p><strong>Email:</strong> {viewedJob.manager_email}</p>
//         <p><strong>Contact:</strong> {viewedJob.manager_contact}</p>

//         <p><strong>Last Updated:</strong> {new Date(viewedJob.updated_at).toLocaleString()}</p>
//         {Array.isArray(viewedJob.tags) && (
//           <div className="flex flex-wrap gap-2 pt-2">
//             {viewedJob.tags.map((tag, index) => (
//               <Badge key={index} variant="secondary">{tag}</Badge>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   </div>
// )}


//       <div className="text-center">
//         <Button variant="outline" size="lg">
//           Load More Jobs
//         </Button>
//       </div>
//     </div>
//   );
// };





import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Search,
  MapPin,
  Clock,
  DollarSign,
  Briefcase,
  Building,
  X,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

export const JobListings = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [jobs, setJobs] = useState([]);
  const [jobSeekers, setJobSeekers] = useState([]);
  const [user, setUser] = useState(null);
  const [selectedJobId, setSelectedJobId] = useState(null);
  const [selectedSeekerId, setSelectedSeekerId] = useState(null);
  const [appliedSeekerIds, setAppliedSeekerIds] = useState([]);
  const [viewedJob, setViewedJob] = useState(null);


  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();
      if (error) console.error("Session error:", error);
      setUser(session?.user || null);
    };
    checkUser();
  }, []);

  useEffect(() => {
    const fetchJobs = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from("job_providers")
        .select("*")
        .neq("user_id", user.id);

      if (error) {
        console.error("Error fetching jobsssssssssss:", error);
      } else {
        console.log("✅ Fetched Jobszzzzzzzzz:", data);
        setJobs(data);
      }
    };
    fetchJobs();
  }, []);

  useEffect(() => {
    const fetchJobSeekers = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from("job_seekers")
        .select("*")
        .eq("user_id", user.id);
      if (error) {
        console.error("Error fetching seekers:", error);
      } else {
        console.log("✅ Job Seekers Datazzzzzzzzzzzzzzz:", data);
        setJobSeekers(data);
      }
    };
    fetchJobSeekers();
  }, []);
  // 888888888888888888888
  useEffect(() => {
    const fetchApplications = async () => {
      if (!selectedJobId) return;

      const { data, error } = await supabase
        .from("job_applications")
        .select("job_seekers_id")
        .eq("job_providers_id", selectedJobId);


      if (error) {
        console.error("Error checking applications:", error);
      } else {
        const ids = data.map((app) => app.job_seekers_id);
        setAppliedSeekerIds(ids);
      }
    };

    fetchApplications();
  }, [selectedJobId]);

  const filteredJobs = jobs.filter((job) => {
    const org = job.organization_name || "";
    const manager = job.manager_name || "";
    const location = job.google_location || "";
    const orgType = job.organization_type || "";
    const email = job.manager_email || "";
    const contact = job.manager_contact || "";


    const matchesSearch =
      org.toLowerCase().includes(searchTerm.toLowerCase()) ||
      manager.toLowerCase().includes(searchTerm.toLowerCase()) ||
      orgType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesLocation =
      locationFilter === "" ||
      location.toLowerCase().includes(locationFilter.toLowerCase());

    return matchesSearch && matchesLocation;
  });

  const handleApplyOnBehalf = async (seekerId) => {
    const selectedSeeker = jobSeekers.find(seeker => seeker.id === seekerId);

    const { data: existingApplications, error: fetchError } = await supabase
      .from("job_applications")
      .select("*")
      .eq("job_providers_id", selectedJobId)

      .eq("job_seekers_id", seekerId)
      .limit(1);

    if (fetchError) {
      console.error("Error checking existing application:", fetchError);
      alert("Error checking application status.");
      return;
    }

    if (existingApplications.length > 0) {
      alert(`⚠️ This seeker has already applied for this job.`);
      return;
    }

    console.log("📤 Applying with data:", {
      job_providers_id: selectedJobId,
      job_seekers_id: seekerId,
      seeker_profile: selectedSeeker,
    });

    try {
      const { error } = await supabase.from("job_applications").insert([
        {
          job_providers_id: selectedJobId,
          job_seekers_id: seekerId,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        }
      ]);

      if (error) {
        console.error("Insert error:", error);
        alert("Failed to apply.");
      } else {
        // alert("✅ Application submitted successfully.");
        setAppliedSeekerIds((prev) => [...prev, seekerId]);
      }
    } catch (err) {
      console.error("Unexpected error:", err);
      alert("Something went wrong.");
    }
  };



  const handleSaveJob = async (job) => {
    if (!user) {
      alert("Please log in to save jobs.");
      return;
    }

    console.log("🔍 Attempting to save job:");
    console.log("User ID:", user.id);
    console.log("Job Details:", job);

    const jobId = job.id;

    // Check if already saved
    const { data: existing, error: fetchError } = await supabase
      .from("save_jobs")
      .select("*")
      .eq("user_id", user.id)
      .eq("job_providers_id", jobId)
      .limit(1);

    if (fetchError) {
      console.error("❌ Error checking saved job:", fetchError);
      return;
    }

    if (existing.length > 0) {
      console.warn("⚠️ Job already saved:", existing);
      alert("⚠️ You already saved this job.");
      return;
    }

    const { data: insertedData, error } = await supabase
      .from("save_jobs")
      .insert([
        {
          user_id: user.id,
          job_providers_id: jobId,
          created_at: new Date().toISOString(),
        },
      ])
      .select(); // to get back the inserted row

    if (error) {
      console.error("❌ Error saving job:", error);
      alert("❌ Failed to save job.");
    } else {
      console.log("✅ Job saved successfully:", insertedData);
      alert("✅ Job saved successfully!");
    }
  };




  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search jobs, companies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Location"
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button className="w-full bg-blue-600 hover:bg-blue-700">
              <Search className="mr-2 h-4 w-4" />
              Search Jobs
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">
          {filteredJobs.length} Job{filteredJobs.length !== 1 ? "s" : ""} Found
        </h2>
        <div className="flex gap-2">
          <Badge variant="outline">All Categories</Badge>
          <Badge variant="outline">Full-time</Badge>
          <Badge variant="outline">Remote</Badge>
        </div>
      </div>

      <div className="grid gap-6">
        {filteredJobs.map((job) => (
          <Card key={job.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <CardTitle className="text-xl text-blue-600 hover:text-blue-700 cursor-pointer">
                    {job.title}
                  </CardTitle>
                  <CardDescription className="text-lg font-medium text-gray-900 flex items-center gap-2">
                    <Building className="h-4 w-4" />
                    {job.organization_name}
                  </CardDescription>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSelectedJobId(job.id);
                    setSelectedSeekerId(null);
                  }}
                >
                  Apply Now
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                  <div className="flex items-center">
                    <MapPin className="mr-1 h-4 w-4" />
                    {job.google_location}
                  </div>
                  <div className="flex items-center">
                    <Briefcase className="mr-1 h-4 w-4" />
                    {job.organization_type}
                  </div>
                  <div className="flex items-center">
                    <DollarSign className="mr-1 h-4 w-4" />
                    {job.salary}
                  </div>
                  <div className="flex items-center">
                    <Clock className="mr-1 h-4 w-4" />
                    Posted on{" "}
                    {new Date(job.updated_at).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </div>
                </div>

                <p className="text-gray-700 leading-relaxed">{job.description}</p>

                <div className="flex flex-wrap gap-2">
                  {Array.isArray(job.tags) &&
                    job.tags.map((tag, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="bg-blue-100 text-blue-800"
                      >
                        {tag}
                      </Badge>
                    ))}
                </div>
                {/* 00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000 */}
                <div className="flex gap-3 pt-4">
                  <Button
                    className="bg-blue-600 hover:bg-blue-700"
                    onClick={() => {
                      setSelectedJobId(job.id);
                      setSelectedSeekerId(null);
                    }}
                  >
                    Apply Now
                  </Button>
                  <Button variant="outline" onClick={() => handleSaveJob(job)}>
                    Save Job
                  </Button>



                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setViewedJob(job)}
                  >
                    View Details
                  </Button>

                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      {/* !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */}

      {selectedJobId && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg max-w-3xl w-full max-h-[80vh] overflow-y-auto p-6 relative shadow-lg">
            <button
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-200"
              onClick={() => {
                setSelectedJobId(null);
                setSelectedSeekerId(null);
              }}
              aria-label="Close modal"
            >
              <X className="h-6 w-6" />
            </button>

            <h2 className="text-2xl font-bold mb-4">Job Seeker Profiles</h2>

            {jobSeekers.map((seeker) => (
              <Card
                key={seeker.id}
                className={`mb-4 ${selectedSeekerId === seeker.id ? "border-2 border-blue-600" : "border"}`}
              >
                <CardHeader>
                  <CardTitle>{seeker.highest_qualification}</CardTitle>
                  <CardDescription>{seeker.specialization}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p><strong>Skills:</strong> {Array.isArray(seeker.skills) ? seeker.skills.join(", ") : "N/A"}</p>
                  <p><strong>Experience:</strong> {seeker.years_of_experience || "N/A"} years</p>
                  <p><strong>Preferred Location:</strong> {seeker.preferred_location}</p>
                  <p><strong>Availability:</strong> {seeker.availability}</p>
                  <p><strong>Email:</strong> {seeker.email}</p>
                  <p><strong>Phone:</strong> {seeker.phone}</p>

                  {appliedSeekerIds.includes(seeker.id) ? (
                    <Button className="mt-3 bg-gray-400 cursor-not-allowed" disabled>
                      Applied
                    </Button>
                  ) : (
                    <Button
                      className="mt-3 bg-green-600 hover:bg-green-700"
                      onClick={() => handleApplyOnBehalf(seeker.id)}
                    >
                      Apply Here
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {viewedJob && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg max-w-3xl w-full max-h-[80vh] overflow-y-auto p-6 relative shadow-lg">
            <button
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-200"
              onClick={() => setViewedJob(null)}
              aria-label="Close modal"
            >
              <X className="h-6 w-6" />
            </button>

            <h2 className="text-2xl font-bold mb-2">{viewedJob.title}</h2>
            <p className="text-gray-600 mb-4">{viewedJob.description}</p>

            <div className="space-y-2 text-sm">
              <p><strong>Organization:</strong> {viewedJob.organization_name}</p>
              <p><strong>Manager:</strong> {viewedJob.manager_name}</p>
              <p><strong>Location:</strong> {viewedJob.google_location}</p>
              <p><strong>Type:</strong> {viewedJob.organization_type}</p>
              <p><strong>Salary:</strong> {viewedJob.salary}</p>
              <p><strong>Email:</strong> {viewedJob.manager_email}</p>
              <p><strong>Contact:</strong> {viewedJob.manager_contact}</p>

              <p><strong>Last Updated:</strong> {new Date(viewedJob.updated_at).toLocaleString()}</p>
              {Array.isArray(viewedJob.tags) && (
                <div className="flex flex-wrap gap-2 pt-2">
                  {viewedJob.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary">{tag}</Badge>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}


      <div className="text-center">
        <Button variant="outline" size="lg">
          Load More Jobs
        </Button>
      </div>
    </div>
  );
};
