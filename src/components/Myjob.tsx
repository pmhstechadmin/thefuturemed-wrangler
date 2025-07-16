




// import { useEffect, useState } from "react";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,

// } from "@/components/ui/card";
// import {
//   Search,
//   MapPin,
//   Clock,
//   DollarSign,
//   Briefcase,
//   Building,
//   ArrowLeft,
//   Shield,
//   UserPlus,
//   Home,
//   User,
//   X,
//   Lock,
//   GraduationCap,
//   AlarmClock,
//   Mail, Phone, Locate, School, Users, FileEdit
// } from "lucide-react";
// import {
//   FormField,
//   FormItem,
//   FormLabel,
//   FormControl,
//   FormMessage,
//   Form,
// } from "@/components/ui/form";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { supabase } from "@/integrations/supabase/client";
// import { useNavigate, Link } from "react-router-dom";
// import { useToast } from "@/hooks/use-toast";
// import { Input } from "@/components/ui/input";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import logo from "@/image/thefuturemed_logo (1).jpg";
// import { useForm } from "react-hook-form";
// import { Textarea } from "@/components/ui/textarea";

// const Myjob = () => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [locationFilter, setLocationFilter] = useState("");
//   const [jobs, setJobs] = useState([]);
//   const [user, setUser] = useState(null);
//   const [selectedJobId, setSelectedJobId] = useState(null);
//   const [applicants, setApplicants] = useState([]);
//   const [loadingApplicants, setLoadingApplicants] = useState(false);
//   const [hasSubscription, setHasSubscription] = useState(false);
//   const [editingJob, setEditingJob] = useState(null);
//   const [editForm, setEditForm] = useState({});

//    const employmentTypes = [
//     { value: "full_time", label: "Full-time" },
//     { value: "part_time", label: "Part-time" },
//     { value: "locum", label: "Locum" },

//   ];

//    const organizationTypes = [
//     { value: "trust", label: "Trust" },
//     { value: "proprietary", label: "Proprietary" },
//     { value: "llc", label: "LLC (Limited Liability Company)" },
//     { value: "llp", label: "LLP (Limited Liability Partnership)" },
//     { value: "corporation", label: "Corporation" },
//     { value: "partnership", label: "Partnership" },
//     { value: "other", label: "Other" },
//   ];

//   const form = useForm({
//     defaultValues: editForm, // start with empty or last selected job
//     mode: "onChange",
//   });


//   const { toast } = useToast();
//   const navigate = useNavigate();

//   const handleBackNavigation = () => {
//     navigate(-1);
//   };

//   const handleSignOut = async () => {
//     const { error } = await supabase.auth.signOut();
//     if (!error) {
//       setUser(null);
//       toast({ title: "Signed Out", description: "You have been signed out." });
//     }
//   };
//   useEffect(() => {
//     if (editForm) {
//       form.reset(editForm);
//     }
//   }, [editForm]);


//   useEffect(() => {
//     const checkUser = async () => {
//       const { data: { session } } = await supabase.auth.getSession();
//       setUser(session?.user || null);
//     };
//     checkUser();
//   }, []);

//   useEffect(() => {
//     const fetchJobs = async () => {
//       const { data: { user } } = await supabase.auth.getUser();
//       if (!user) return;
//       const { data, error } = await supabase
//         .from("job_providers")
//         .select("*")
//         .eq("user_id", user.id);
//       if (!error) setJobs(data);
//     };
//     if (user) fetchJobs();
//   }, [user]);



//   const filteredJobs = jobs.filter((job) => {
//     const query = searchTerm.toLowerCase();
//     const locationQuery = locationFilter.toLowerCase();

//     const searchableFields = [
//       job.title,
//       job.organization_name,
//       job.manager_name,
//       job.organization_type,
//       job.department,
//       job.qualification_required,
//       job.employment_type,
//       job.job_country,
//       job.job_state,
//       job.contract_details,
//       job.salary_range,
//     ];

//     const matchesSearch = searchableFields.some((field) =>
//       field?.toLowerCase().includes(query)
//     );

//     const matchesLocation =
//       !locationFilter || job.google_location?.toLowerCase().includes(locationQuery);

//     return matchesSearch && matchesLocation;
//   });


//   const fetchApplicants = async (jobId) => {
//     setSelectedJobId(jobId);
//     setLoadingApplicants(true);
//     const { data: applications } = await supabase
//       .from("job_applications")
//       .select("job_seekers_id")
//       .eq("job_providers_id", jobId);
//     const seekerIds = applications.map((a) => a.job_seekers_id);

//     const { data: seekers } = await supabase
//       .from("job_seekers")
//       .select("*")
//       .in("id", seekerIds);

//     setApplicants(seekers || []);
//     setLoadingApplicants(false);
//   };



//   const handleSaveCandidate = async (seekerId) => {
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
//       .from("save_profiles")
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






//   return (
//     <div className="space-y-6">
//       {/* Header, Search, etc. */}

//       <header className="bg-black border-b border-white/20 sticky top-0 z-50 shadow-xl">
//         <div className="container mx-auto px-4 py-4 flex items-center justify-between">
//           <div className="flex items-center space-x-4">
//             <Button
//               variant="outline"
//               onClick={handleBackNavigation}
//               className="text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm"
//             >
//               <ArrowLeft className="mr-2 h-4 w-4" /> Back
//             </Button>
//             {/* <Link to="/" className="flex items-center space-x-2">
//               <Shield className="h-8 w-8 text-blue-400" />
//               <h1 className="text-2xl font-bold text-white">MedPortal</h1>
//             </Link> */}
//             <div className="flex items-center space-x-2">
//               {/* <Shield className="h-8 w-8 text-blue-600" />
//               <h1 className="text-2xl font-bold text-gray-900">MedPortal</h1> */}
//               <Link to="/">
//                 <img src={logo} alt="Logo" className="h-10 w-100 mr-2" />
//               </Link>
//             </div>
//           </div>
//           <div className="flex items-center space-x-4">
//             {user ? (
//               <>
//                 <span className="text-white text-sm bg-white/10 px-3 py-1 rounded-full">
//                   Welcome, {user.email}
//                 </span>
//                 <Button
//                   variant="outline"
//                   onClick={() => navigate("/profile")}
//                   className="text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm"
//                 >
//                   <User className="mr-2 h-4 w-4" /> Profile
//                 </Button>
//                 <Button
//                   variant="outline"
//                   onClick={handleSignOut}
//                   className="text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm"
//                 >
//                   Sign Out
//                 </Button>
//               </>
//             ) : (
//               <>
//                 <Link to="/register">
//                   <Button
//                     variant="outline"
//                     className="text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm"
//                   >
//                     Register
//                   </Button>
//                 </Link>
//                 <Link to="/">
//                   <Button className="bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl transition-all duration-200">
//                     <UserPlus className="mr-2 h-4 w-4" /> Sign In
//                   </Button>
//                 </Link>
//               </>
//             )}
//             <Button
//               variant="outline"
//               onClick={() => navigate("/")}
//               className="text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm"
//             >
//               <Home className="mr-2 h-4 w-4" /> Home
//             </Button>
//           </div>
//         </div>
//       </header>

//       <Card>
//         <CardContent className="p-6">
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//             <div className="relative">
//               <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
//               <Input
//                 placeholder="Search jobs, companies, keywords..."
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
//               <Search className="mr-2 h-4 w-4" /> Search Jobs
//             </Button>
//           </div>
//         </CardContent>
//       </Card>

//       <div className="grid gap-6">
//         {filteredJobs.map((job) => (
//           <Card key={job.id}>
//             <CardHeader>
//               <div className="flex justify-between">
//                 <div>
//                   <CardTitle>{job.title}</CardTitle>
//                   <CardDescription className="text-lg font-medium text-gray-900 flex items-center gap-2">
//                     <Building className="h-4 w-4" />
//                     {job.organization_name}
//                   </CardDescription>
//                   <div className="flex items-center">
//                     <Mail className="mr-1 h-4 w-4" />
//                     {job.job_country}
//                   </div>

//                   <div className="flex items-center">
//                     <Mail className="mr-1 h-4 w-4" />
//                     {job.job_state}
//                   </div>

//                 </div>
//               </div>
//             </CardHeader>

//             <CardContent>
//               <div className="space-y-4 text-sm text-gray-700">

//                 {/* 👤 Manager Info Section */}
//                 <div className="border p-3 rounded-md bg-gray-50 space-y-2">
//                   <h4 className="text-base font-semibold text-gray-800 mb-1 flex items-center gap-2">
//                     <User className="h-4 w-4" /> Manager Information
//                   </h4>
//                   <div className="flex flex-wrap gap-4 text-gray-600">
//                     <div className="flex items-center">
//                       <User className="mr-1 h-4 w-4" />
//                       {job.manager_name}
//                     </div>
//                     <div className="flex items-center">
//                       <Mail className="mr-1 h-4 w-4" />
//                       {job.manager_email}
//                     </div>
//                     <div className="flex items-center">
//                       <Phone className="mr-1 h-4 w-4" />
//                       {job.manager_contact_ccode} {job.manager_contact}
//                     </div>
//                     <div className="flex items-center">
//                       <Locate className="mr-1 h-4 w-4" />
//                       {job.address}
//                     </div>
//                   </div>
//                 </div>

//                 {/* 🏢 Job Info Section */}
//                 <div className="flex flex-wrap gap-4 text-gray-600">
//                   <div className="flex items-center">
//                     <MapPin className="mr-1 h-4 w-4" />
//                     {job.google_location}
//                   </div>
//                   <div className="flex items-center">
//                     <Briefcase className="mr-1 h-4 w-4" />
//                     {job.organization_type}
//                   </div>
//                   <div className="flex items-center">
//                     <School className="mr-1 h-4 w-4" />
//                     {job.department}
//                   </div>
//                   <div className="flex items-center">
//                     <GraduationCap className="mr-1 h-4 w-4" />
//                     {job.qualification_required}
//                   </div>
//                   <div className="flex items-center">
//                     <AlarmClock className="mr-1 h-4 w-4" />
//                     {job.duty_hours}
//                   </div>
//                   <div className="flex items-center">
//                     <Users className="mr-1 h-4 w-4" />
//                     {job.number_of_vacancies} Vacancy{job.number_of_vacancies > 1 ? 'ies' : 'y'}
//                   </div>
//                   <div className="flex items-center">
//                     <DollarSign className="mr-1 h-4 w-4" />
//                     {job.salary_range}
//                   </div>
//                   <div className="flex items-center">
//                     <FileEdit className="mr-1 h-4 w-4" />
//                     {job.contract_details}
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

//                 {/* 📄 Job Description */}
//                 <p className="mt-2 text-gray-700">{job.description}</p>

//                 {/* 👀 Action */}
//                 <div className="flex gap-2 mt-4">
//                   <Button
//                     variant="ghost"
//                     size="sm"
//                     onClick={() => fetchApplicants(job.id)}
//                   >
//                     View Applicants
//                   </Button>

//                   <Button
//                     variant="outline"
//                     size="sm"
//                     onClick={() => {
//                       setEditingJob(job);
//                       setEditForm({ ...job }); // prefill form
//                     }}
//                   >
//                     Edit Job
//                   </Button>
//                   {/* <Button
//                     variant="destructive"
//                     onClick={() => handleDeleteJob(job)} // Pass specific job
//                   >
//                     Delete Job
//                   </Button> */}



//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         ))}
//       </div>


//       {/* Modal for Applicants */}
//       {selectedJobId && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div
//             className="bg-white rounded-lg w-full max-w-3xl p-6 max-h-[80vh] overflow-y-auto relative"
//             style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
//           >
//             <button
//               className="absolute top-4 right-4"
//               onClick={() => setSelectedJobId(null)}
//             >
//               <X className="h-6 w-6" />
//             </button>
//             <h2 className="text-2xl font-semibold mb-4">Applicants for Job</h2>
//             {loadingApplicants ? (
//               <p>Loading applicants...</p>
//             ) : applicants.length > 0 ? (
//               applicants.map((seeker) => (
//                 <Card
//                   key={seeker.id}
//                   className="hover:shadow-lg transition-shadow mb-4"
//                 >
//                   <CardHeader>
//                     <div className="flex items-start justify-between">
//                       <div className="space-y-2">
//                         <CardTitle className="text-xl text-blue-600 flex items-center gap-2">
//                           <User className="h-5 w-5" />
//                           {seeker.name || "Unnamed Seeker"}
//                         </CardTitle>
//                         <CardDescription className="text-lg font-medium text-gray-900">
//                           {seeker.qualification || seeker.highest_qualification}
//                         </CardDescription>
//                       </div>
//                     </div>
//                   </CardHeader>
//                   <CardContent>
//                     <div className="space-y-4">
//                       {/* Professional Details */}
//                       <div className="flex flex-wrap gap-4 text-sm text-gray-600">
//                         <div className="flex items-center">
//                           <GraduationCap className="mr-1 h-4 w-4" />
//                           {seeker.highest_qualification}
//                         </div>
//                         <div className="flex items-center">
//                           <Briefcase className="mr-1 h-4 w-4" />
//                           {seeker.years_of_experience} years experience
//                         </div>
//                         <div className="flex items-center">
//                           <MapPin className="mr-1 h-4 w-4" />
//                           {seeker.current_location || seeker.preferred_location}
//                         </div>
//                       </div>

//                       {/* Contact */}
//                       <div className="space-y-2">
//                         <h4 className="font-medium text-gray-900">
//                           Contact Information:
//                         </h4>
//                         <p className="text-sm text-gray-600">
//                           Email:{" "}
//                           {hasSubscription ? seeker.email : "***@***.com"}
//                           {!hasSubscription && (
//                             <Lock className="inline h-3 w-3 ml-1 text-amber-500" />
//                           )}
//                         </p>
//                         <p className="text-sm text-gray-600">
//                           Phone:{" "}
//                           {hasSubscription ? seeker.phone : "+1 (***) ***-****"}
//                           {!hasSubscription && (
//                             <Lock className="inline h-3 w-3 ml-1 text-amber-500" />
//                           )}
//                         </p>
//                       </div>

//                       {/* Skills */}
//                       <div>
//                         <h4 className="font-medium text-gray-900 mb-2">
//                           Key Skills:
//                         </h4>
//                         <div className="flex flex-wrap gap-2">
//                           {(seeker.skills || []).map((skill, idx) => (
//                             <Badge
//                               key={idx}
//                               variant="secondary"
//                               className="bg-green-100 text-green-800"
//                             >
//                               {skill}
//                             </Badge>
//                           ))}
//                         </div>
//                       </div>

//                       {/* Availability */}
//                       <div className="bg-gray-50 p-3 rounded-md">
//                         <span className="font-medium text-gray-900">
//                           Availability:{" "}
//                         </span>
//                         <span className="text-gray-700">
//                           {seeker.availability}
//                         </span>
//                       </div>

//                       {/* Actions */}
//                       <div className="flex gap-3 pt-4">
//                         <Button className="bg-blue-600 hover:bg-blue-700">
//                           Subscribe to Contact
//                         </Button>
//                         <Button
//                           variant="outline"
//                           className="flex-1 min-w-[120px]"
//                           onClick={() => handleSaveCandidate(seeker.id)}
//                         >
//                           Save Candidate
//                         </Button>

//                       </div>
//                     </div>
//                   </CardContent>
//                 </Card>
//               ))
//             ) : (
//               <p>No applicants for this job yet.</p>
//             )}
//           </div>
//         </div>
//       )}

//       {/* edit job */}
//       {editingJob && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
//           <div className="bg-white rounded-lg w-full max-w-2xl relative max-h-[90vh] overflow-y-auto p-6">
//             <button
//               className="absolute top-4 right-4"
//               onClick={() => setEditingJob(null)}
//             >
//               <X className="h-5 w-5" />
//             </button>

//             <h2 className="text-xl font-bold mb-4">Edit Job: {editingJob.title}</h2>

//             <Form {...form}>
//               <form
//                 onSubmit={form.handleSubmit(async (data) => {
//                   const { error } = await supabase
//                     .from("job_providers")
//                     .update(data)
//                     .eq("id", editingJob.id);

//                   if (!error) {
//                     toast({
//                       title: "Updated",
//                       description: "Job updated successfully.",
//                     });
//                     setJobs((prev) =>
//                       prev.map((j) => (j.id === editingJob.id ? { ...j, ...data } : j))
//                     );
//                     setEditingJob(null);
//                   } else {
//                     toast({
//                       title: "Error",
//                       description: error.message,
//                       variant: "destructive",
//                     });
//                   }
//                 })}
//                 className="space-y-6"
//               >
//                 {/* Organization Details */}
//                 <Card>
//                   <CardHeader>
//                     <CardTitle className="flex items-center gap-2">
//                       <Building className="h-4 w-4" /> Organization Details
//                     </CardTitle>
//                   </CardHeader>
//                   <CardContent className="space-y-4">
//                     <FormField
//                       control={form.control}
//                       name="organization_name"
//                       render={({ field }) => (
//                         <FormItem>
//                           <FormLabel>Organization Name</FormLabel>
//                           <FormControl>
//                             <Input placeholder="Organization Name" {...field} />
//                           </FormControl>
//                         </FormItem>
//                       )}
//                     />
//                     <FormField
//                                   control={form.control}
//                                   name="organization_type"
//                                   rules={{ required: "Organization type is required" }}
//                                   render={({ field }) => (
//                                     <FormItem>
//                                       <FormLabel>Organization Type</FormLabel>
//                                       <Select
//                                         onValueChange={field.onChange}
//                                         defaultValue={field.value}
//                                       >
//                                         <FormControl>
//                                           <SelectTrigger>
//                                             <SelectValue placeholder="Select organization type" />
//                                           </SelectTrigger>
//                                         </FormControl>
//                                         <SelectContent>
//                                           {organizationTypes.map((type) => (
//                                             <SelectItem key={type.value} value={type.value}>
//                                               {type.label}
//                                             </SelectItem>
//                                           ))}
//                                         </SelectContent>
//                                       </Select>
//                                       <FormMessage />
//                                     </FormItem>
//                                   )}
//                                 />


//                     <FormField
//                       control={form.control}
//                       name="job_country"
//                       rules={{ required: "Job country is required" }}
//                       render={({ field }) => (
//                         <FormItem>
//                           <FormLabel>Job Country</FormLabel>
//                           <FormControl>
//                             <Input placeholder="e.g. India" {...field} />
//                           </FormControl>
//                           <FormMessage />
//                         </FormItem>
//                       )}
//                     />

//                     <FormField
//                       control={form.control}
//                       name="job_state"
//                       rules={{ required: "Job state is required" }}
//                       render={({ field }) => (
//                         <FormItem>
//                           <FormLabel>Job State</FormLabel>
//                           <FormControl>
//                             <Input placeholder="e.g. Karnataka" {...field} />
//                           </FormControl>
//                           <FormMessage />
//                         </FormItem>
//                       )}
//                     />
//                   </CardContent>
//                 </Card>



//                 {/* Job Info */}
//                 <Card>
//                   <CardHeader>
//                     <CardTitle className="flex items-center gap-2">
//                       <Briefcase className="h-4 w-4" /> Job Details
//                     </CardTitle>
//                   </CardHeader>
//                   <CardContent className="space-y-4">



//                     <FormField
//                       control={form.control}
//                       name="department"
//                       render={({ field }) => (
//                         <FormItem>
//                           <FormLabel>Department</FormLabel>
//                           <FormControl>
//                             <Input placeholder="Department" {...field} />
//                           </FormControl>
//                         </FormItem>
//                       )}
//                     />

//                     <FormField
//                       control={form.control}
//                       name="qualification_required"
//                       render={({ field }) => (
//                         <FormItem>
//                           <FormLabel>Qualification</FormLabel>
//                           <FormControl>
//                             <Input placeholder="e.g. B.Pharm, D.Pharm, M.Sc" {...field} />
//                           </FormControl>
//                         </FormItem>
//                       )}
//                     />

//                        <FormField
//               control={form.control}
//               name="employment_type"
//               rules={{ required: "Employment type is required" }}
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Employment Type</FormLabel>
//                   <Select
//                     onValueChange={field.onChange}
//                     defaultValue={field.value}
//                   >
//                     <FormControl>
//                       <SelectTrigger>
//                         <SelectValue placeholder="Select employment type" />
//                       </SelectTrigger>
//                     </FormControl>
//                     <SelectContent>
//                       {employmentTypes.map((type) => (
//                         <SelectItem key={type.value} value={type.value}>
//                           {type.label}
//                         </SelectItem>
//                       ))}
//                     </SelectContent>
//                   </Select>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//                      <FormField
//               control={form.control}
//               name="number_of_vacancies"
//               rules={{
//                 required: "Number of vacancies is required",
//                 min: { value: 1, message: "Must be at least 1" },
//                 valueAsNumber: true,
//               }}
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Number of Vacancies</FormLabel>
//                   <FormControl>
//                     <Input
//                       type="number"
//                       placeholder="Enter number of job openings"
//                       {...field}
//                       onChange={(e) => field.onChange(parseInt(e.target.value, 10))}
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//                     <FormField
//                       control={form.control}
//                       name="duty_hours"
//                       render={({ field }) => (
//                         <FormItem>
//                           <FormLabel>Duty Hours</FormLabel>
//                           <FormControl>
//                             <Input placeholder="e.g. 9AM - 5PM, Mon to Fri" {...field} />
//                           </FormControl>
//                         </FormItem>
//                       )}
//                     />

//                     <FormField
//                       control={form.control}
//                       name="salary_range"
//                       render={({ field }) => (
//                         <FormItem>
//                           <FormLabel>Salary Range</FormLabel>
//                           <FormControl>
//                             <Input placeholder="₹20,000 - ₹30,000" {...field} />
//                           </FormControl>
//                         </FormItem>
//                       )}
//                     />

//                     <FormField
//                       control={form.control}
//                       name="contract_details"
//                       rules={{ required: "Contract details are required" }}
//                       render={({ field }) => (
//                         <FormItem>
//                           <FormLabel>Contract Details</FormLabel>
//                           <FormControl>
//                             <Textarea
//                               placeholder="Enter contract terms, duration, notice period, etc."
//                               className="min-h-[100px]"
//                               {...field}
//                             />
//                           </FormControl>
//                           <FormMessage />
//                         </FormItem>
//                       )}
//                     />

//                     <FormField
//                       control={form.control}
//                       name="address"
//                       rules={{ required: "Address is required" }}
//                       render={({ field }) => (
//                         <FormItem>
//                           <FormLabel>Public Address</FormLabel>
//                           <FormControl>
//                             <Textarea
//                               placeholder="Enter the address that will be visible to job seekers"
//                               className="min-h-[80px]"
//                               {...field}
//                             />
//                           </FormControl>
//                           <FormMessage />
//                         </FormItem>
//                       )}
//                     />
//                       <FormField
//                   control={form.control}
//                   name="google_location"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel className="flex items-center gap-2">
//                         Google Location/Maps Link
//                         <Lock className="h-3 w-3 text-gray-400" />
//                         <span className="text-xs text-gray-500">
//                           (Hidden from public)
//                         </span>
//                       </FormLabel>
//                       <FormControl>
//                         <Input
//                           placeholder="Enter Google Maps link or precise location"
//                           {...field}
//                         />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//                   </CardContent>
//                 </Card>








//                 {/* Manager Info */}
//                 <Card>
//                   <CardHeader>
//                     <CardTitle className="flex items-center gap-2">
//                       <User className="h-4 w-4" /> Manager Info
//                     </CardTitle>
//                   </CardHeader>
//                   <CardContent className="space-y-4">
//                     <FormField
//                       control={form.control}
//                       name="manager_name"
//                       render={({ field }) => (
//                         <FormItem>
//                           <FormLabel>Manager Name</FormLabel>
//                           <FormControl>
//                             <Input placeholder="Manager Name" {...field} />
//                           </FormControl>
//                         </FormItem>
//                       )}
//                     />
//                     <FormField
//                       control={form.control}
//                       name="manager_email"
//                       rules={{
//                         required: "Manager email is required",
//                         pattern: {
//                           value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/i,
//                           message: "Invalid email address",
//                         },
//                       }}
//                       render={({ field }) => (
//                         <FormItem>
//                           <FormLabel className="flex items-center gap-2">
//                             <Mail className="h-4 w-4" /> Manager Email
//                             <Lock className="h-3 w-3 text-gray-400" />
//                             <span className="text-xs text-gray-500">
//                               (Hidden from public)
//                             </span>
//                           </FormLabel>
//                           <FormControl>
//                             <Input
//                               type="email"
//                               placeholder="manager@organization.com"
//                               {...field}
//                             />
//                           </FormControl>
//                           <FormMessage />
//                         </FormItem>
//                       )}
//                     />
//                     <FormField
//                       control={form.control}
//                       name="manager_contact"
//                       render={({ field }) => (
//                         <FormItem>
//                           <FormLabel>Manager Contact</FormLabel>
//                           <FormControl>
//                             <Input placeholder="Contact Number" {...field} />
//                           </FormControl>
//                         </FormItem>
//                       )}
//                     />
//                   </CardContent>
//                 </Card>

//                 {/* Footer Buttons */}
//                 <div className="flex justify-end gap-2 pt-4">
//                   <Button variant="ghost" type="button" onClick={() => setEditingJob(null)}>
//                     Cancel
//                   </Button>
//                   <Button type="submit">Save Changes</Button>
//                 </div>
//               </form>
//             </Form>
//           </div>
//         </div>
//       )}







//     </div>
//   );
// };

// export default Myjob;








import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,

} from "@/components/ui/card";
import {
  Search,
  MapPin,
  Clock,
  DollarSign,
  Briefcase,
  Building,
  ArrowLeft,
  Shield,
  UserPlus,
  Home,
  User,
  X,
  Lock,
  GraduationCap,
  AlarmClock,
  Mail, Phone, Locate, School, Users, FileEdit
} from "lucide-react";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Form,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate, Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import logo from "@/image/thefuturemed_logo (1).jpg";
import { useForm } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle, CircleSlash } from "lucide-react";


const Myjob = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [jobs, setJobs] = useState([]);
  const [user, setUser] = useState(null);
  const [selectedJobId, setSelectedJobId] = useState(null);
  const [applicants, setApplicants] = useState([]);
  const [loadingApplicants, setLoadingApplicants] = useState(false);
  const [hasSubscription, setHasSubscription] = useState(false);
  const [editingJob, setEditingJob] = useState(null);
  const [editForm, setEditForm] = useState({});

  const employmentTypes = [
    { value: "full_time", label: "Full-time" },
    { value: "part_time", label: "Part-time" },
    { value: "locum", label: "Locum" },

  ];

  const organizationTypes = [
    { value: "trust", label: "Trust" },
    { value: "proprietary", label: "Proprietary" },
    { value: "llc", label: "LLC (Limited Liability Company)" },
    { value: "llp", label: "LLP (Limited Liability Partnership)" },
    { value: "corporation", label: "Corporation" },
    { value: "partnership", label: "Partnership" },
    { value: "other", label: "Other" },
  ];

  const form = useForm({
    defaultValues: editForm, // start with empty or last selected job
    mode: "onChange",
  });


  const { toast } = useToast();
  const navigate = useNavigate();

  const handleBackNavigation = () => {
    navigate(-1);
  };

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      setUser(null);
      toast({ title: "Signed Out", description: "You have been signed out." });
    }
  };
  useEffect(() => {
    if (editForm) {
      form.reset(editForm);
    }
  }, [editForm]);


  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user || null);
    };
    checkUser();
  }, []);

  useEffect(() => {
    const fetchJobs = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      const { data, error } = await supabase
        .from("job_providers")
        .select("*")
        .eq("user_id", user.id);
      if (!error) setJobs(data);
    };
    if (user) fetchJobs();
  }, [user]);



  const filteredJobs = jobs.filter((job) => {
    const query = searchTerm.toLowerCase();
    const locationQuery = locationFilter.toLowerCase();

    const searchableFields = [
      job.title,
      job.organization_name,
      job.manager_name,
      job.organization_type,
      job.department,
      job.qualification_required,
      job.employment_type,
      job.job_country,
      job.job_state,
      job.contract_details,
      job.salary_range,
    ];

    const matchesSearch = searchableFields.some((field) =>
      field?.toLowerCase().includes(query)
    );

    const matchesLocation =
      !locationFilter || job.google_location?.toLowerCase().includes(locationQuery);

    return matchesSearch && matchesLocation;
  });


  const fetchApplicants = async (jobId) => {
    setSelectedJobId(jobId);
    setLoadingApplicants(true);
    const { data: applications } = await supabase
      .from("job_applications")
      .select("job_seekers_id")
      .eq("job_providers_id", jobId);
    const seekerIds = applications.map((a) => a.job_seekers_id);

    const { data: seekers } = await supabase
      .from("job_seekers")
      .select("*")
      .in("id", seekerIds);

    setApplicants(seekers || []);
    setLoadingApplicants(false);
  };


  const handleTogglePublish = async (jobId) => {
    const jobToUpdate = jobs.find((j) => j.id === jobId);
    if (!jobToUpdate) {
      console.error("Job not found");
      return;
    }

    const currentStatus = jobToUpdate.is_published;
    const newStatus = !currentStatus;

    console.log("Toggling job ID:", jobId);
    console.log("Current status:", currentStatus);
    console.log("New status:", newStatus);

    const { error } = await supabase
      .from("job_providers")
      .update({ is_published: newStatus })
      .eq("id", jobId);

    if (error) {
      console.error("Supabase update error:", error.message);
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
      return;
    }

    // Update local job state
    setJobs((prev) =>
      prev.map((j) =>
        j.id === jobId ? { ...j, is_published: newStatus } : j
      )
    );

    toast({
      title: newStatus ? "Published" : "Unpublished",
      description: `Job successfully ${newStatus ? "published" : "unpublished"}.`,
    });
  };





  return (
    <div className="space-y-6">
      {/* Header, Search, etc. */}

      <header className="bg-black border-b border-white/20 sticky top-0 z-50 shadow-xl">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              onClick={handleBackNavigation}
              className="text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm"
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Back
            </Button>
            {/* <Link to="/" className="flex items-center space-x-2">
              <Shield className="h-8 w-8 text-blue-400" />
              <h1 className="text-2xl font-bold text-white">MedPortal</h1>
            </Link> */}
            <div className="flex items-center space-x-2">
              {/* <Shield className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">MedPortal</h1> */}
              <Link to="/">
                <img src={logo} alt="Logo" className="h-10 w-100 mr-2" />
              </Link>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <span className="text-white text-sm bg-white/10 px-3 py-1 rounded-full">
                  Welcome, {user.email}
                </span>
                <Button
                  variant="outline"
                  onClick={() => navigate("/profile")}
                  className="text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm"
                >
                  <User className="mr-2 h-4 w-4" /> Profile
                </Button>
                <Button
                  variant="outline"
                  onClick={handleSignOut}
                  className="text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm"
                >
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Link to="/register">
                  <Button
                    variant="outline"
                    className="text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm"
                  >
                    Register
                  </Button>
                </Link>
                <Link to="/">
                  <Button className="bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl transition-all duration-200">
                    <UserPlus className="mr-2 h-4 w-4" /> Sign In
                  </Button>
                </Link>
              </>
            )}
            <Button
              variant="outline"
              onClick={() => navigate("/")}
              className="text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm"
            >
              <Home className="mr-2 h-4 w-4" /> Home
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
  <div className="flex flex-col md:flex-row items-center justify-between gap-4">
    
    {/* Left-aligned Card */}
    <div className="w-full max-w-sm">
      <Card className="hover:shadow-lg transition-shadow cursor-pointer">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Jobs Posted</CardTitle>
          <Briefcase className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{jobs.length}</div>
          <p className="text-xs text-muted-foreground">+5% from last month</p>
          {/* <Button
            variant="ghost"
            size="sm"
            className="mt-2 p-0 h-auto text-blue-600 hover:text-blue-700"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <Search className="h-3 w-3 mr-1" />
            View Jobs
          </Button> */}
        </CardContent>
      </Card>
    </div>

    {/* Centered Title and Description */}
    <div className="text-center flex-1">
      <h2 className="text-2xl font-bold text-gray-800">My Posted Jobs</h2>
      <p className="text-gray-600 text-sm mt-1">
        Here are all the jobs you’ve posted. You can view applicants or edit job details.
      </p>
    </div>
    
  </div>
</div>


      


      {/* job card */}
      <div className="grid gap-6">
        {filteredJobs.map((job) => (
          <Card
            key={job.id}
            className="bg-white shadow-md border border-gray-200 rounded-lg transition hover:shadow-lg"
          >

            <CardHeader>
              <div className="flex justify-between">
                <div>
                  <CardTitle>{job.title}</CardTitle>
                  <CardDescription className="text-lg font-medium text-gray-900 flex items-center gap-2">
                    <Building className="h-4 w-4" />
                    {job.organization_name}
                  </CardDescription>
                  <div className="flex items-center gap-x-4 text-gray-500">
                    <div className="flex items-center">
                      <MapPin className="mr-1 h-4 w-4" />
                      {job.job_country}
                    </div>
                    <div className="flex items-center">
                      <MapPin className="mr-1 h-4 w-4" />
                      {job.job_state}
                    </div>
                  </div>


                </div>
              </div>
            </CardHeader>

            <CardContent>
              <div className="space-y-4 text-sm text-gray-700">

                {/* 👤 Manager Info Section */}
                <div className="border p-3 rounded-md bg-gray-50 space-y-2">
                  <h4 className="text-base font-semibold text-gray-800 mb-1 flex items-center gap-2">
                    <User className="h-4 w-4" /> Manager Information
                  </h4>
                  <div className="flex flex-wrap gap-4 text-gray-600">
                    <div className="flex items-center">
                      <User className="mr-1 h-4 w-4" />
                      {job.manager_name}
                    </div>
                    <div className="flex items-center">
                      <Mail className="mr-1 h-4 w-4" />
                      {job.manager_email}
                    </div>
                    <div className="flex items-center">
                      <Phone className="mr-1 h-4 w-4" />
                      {job.manager_contact_ccode} {job.manager_contact}
                    </div>
                    <div className="flex items-center">
                      <Locate className="mr-1 h-4 w-4" />
                      {job.address}
                    </div>
                  </div>
                </div>

                {/* 🏢 Job Info Section */}
                <div className="flex flex-wrap gap-4 text-gray-600">
                  <div className="flex items-center">
                    <MapPin className="mr-1 h-4 w-4" />
                    {job.google_location}
                  </div>
                  <div className="flex items-center">
                    <Briefcase className="mr-1 h-4 w-4" />
                    {job.organization_type}
                  </div>
                  <div className="flex items-center">
                    <School className="mr-1 h-4 w-4" />
                    {job.department}
                  </div>
                  <div className="flex items-center">
                    <GraduationCap className="mr-1 h-4 w-4" />
                    {job.qualification_required}
                  </div>
                  <div className="flex items-center">
                    <AlarmClock className="mr-1 h-4 w-4" />
                    {job.duty_hours}
                  </div>
                  <div className="flex items-center">
                    <Users className="mr-1 h-4 w-4" />
                    {job.number_of_vacancies} Vacancy{job.number_of_vacancies > 1 ? 'ies' : 'y'}
                  </div>
                  <div className="flex items-center">
                    <DollarSign className="mr-1 h-4 w-4" />
                    {job.salary_range}
                  </div>
                  <div className="flex items-center">
                    <FileEdit className="mr-1 h-4 w-4" />
                    {job.contract_details}
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

                {/* 📄 Job Description */}
                <p className="mt-2 text-gray-700">{job.description}</p>

                {/* 👀 Action */}
                <div className="flex gap-2 mt-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => fetchApplicants(job.id)}
                  >
                    View Applicants
                  </Button>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setEditingJob(job);
                      setEditForm({ ...job }); // prefill form
                    }}
                  >
                    Edit Job
                  </Button>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleTogglePublish(job.id)}
                  >
                    {job.is_published ? "Unpublish" : "Publish"}
                  </Button>




                  {/* <Button
                    variant="destructive"
                    onClick={() => handleDeleteJob(job)} // Pass specific job
                  >
                    Delete Job
                  </Button> */}



                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>


      {/* Modal for Applicants */}
      {selectedJobId && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div
            className="bg-white rounded-lg w-full max-w-3xl p-6 max-h-[80vh] overflow-y-auto relative"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            <button
              className="absolute top-4 right-4"
              onClick={() => setSelectedJobId(null)}
            >
              <X className="h-6 w-6" />
            </button>
            <h2 className="text-2xl font-semibold mb-4">Applicants for Job</h2>
            {loadingApplicants ? (
              <p>Loading applicants...</p>
            ) : applicants.length > 0 ? (
              applicants.map((seeker) => (
                <Card
                  key={seeker.id}
                  className="hover:shadow-lg transition-shadow mb-4"
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <CardTitle className="text-xl text-blue-600 flex items-center gap-2">
                          <User className="h-5 w-5" />
                          {seeker.name || "Unnamed Seeker"}
                        </CardTitle>
                        <CardDescription className="text-lg font-medium text-gray-900">
                          {seeker.qualification || seeker.highest_qualification}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {/* Professional Details */}
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
                          {seeker.current_location || seeker.preferred_location}
                        </div>
                      </div>

                      {/* Contact */}
                      <div className="space-y-2">
                        <h4 className="font-medium text-gray-900">
                          Contact Information:
                        </h4>
                        <p className="text-sm text-gray-600">
                          Email:{" "}
                          {hasSubscription ? seeker.email : "***@***.com"}
                          {!hasSubscription && (
                            <Lock className="inline h-3 w-3 ml-1 text-amber-500" />
                          )}
                        </p>
                        <p className="text-sm text-gray-600">
                          Phone:{" "}
                          {hasSubscription ? seeker.phone : "+1 (***) ***-****"}
                          {!hasSubscription && (
                            <Lock className="inline h-3 w-3 ml-1 text-amber-500" />
                          )}
                        </p>
                      </div>

                      {/* Skills */}
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">
                          Key Skills:
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {(seeker.skills || []).map((skill, idx) => (
                            <Badge
                              key={idx}
                              variant="secondary"
                              className="bg-green-100 text-green-800"
                            >
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Availability */}
                      <div className="bg-gray-50 p-3 rounded-md">
                        <span className="font-medium text-gray-900">
                          Availability:{" "}
                        </span>
                        <span className="text-gray-700">
                          {seeker.availability}
                        </span>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-3 pt-4">
                        <Button className="bg-blue-600 hover:bg-blue-700">
                          Subscribe to Contact
                        </Button>
                        <Button
                          variant="outline"
                          className="flex-1 min-w-[120px]"
                          onClick={() => handleSaveCandidate(seeker.id)}
                        >
                          Save Candidate
                        </Button>

                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <p>No applicants for this job yet.</p>
            )}
          </div>
        </div>
      )}

      {/* edit job */}
      {editingJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-lg w-full max-w-2xl relative max-h-[90vh] overflow-y-auto p-6">
            <button
              className="absolute top-4 right-4"
              onClick={() => setEditingJob(null)}
            >
              <X className="h-5 w-5" />
            </button>

            <h2 className="text-xl font-bold mb-4">Edit Job: {editingJob.title}</h2>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(async (data) => {
                  const { error } = await supabase
                    .from("job_providers")
                    .update(data)
                    .eq("id", editingJob.id);

                  if (!error) {
                    toast({
                      title: "Updated",
                      description: "Job updated successfully.",
                    });
                    setJobs((prev) =>
                      prev.map((j) => (j.id === editingJob.id ? { ...j, ...data } : j))
                    );
                    setEditingJob(null);
                  } else {
                    toast({
                      title: "Error",
                      description: error.message,
                      variant: "destructive",
                    });
                  }
                })}
                className="space-y-6"
              >
                {/* Organization Details */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Building className="h-4 w-4" /> Organization Details
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <FormField
                      control={form.control}
                      name="organization_name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Organization Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Organization Name" {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="organization_type"
                      rules={{ required: "Organization type is required" }}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Organization Type</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select organization type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {organizationTypes.map((type) => (
                                <SelectItem key={type.value} value={type.value}>
                                  {type.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />


                    <FormField
                      control={form.control}
                      name="job_country"
                      rules={{ required: "Job country is required" }}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Job Country</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g. India" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="job_state"
                      rules={{ required: "Job state is required" }}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Job State</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g. Karnataka" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>



                {/* Job Info */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Briefcase className="h-4 w-4" /> Job Details
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">



                    <FormField
                      control={form.control}
                      name="department"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Department</FormLabel>
                          <FormControl>
                            <Input placeholder="Department" {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="qualification_required"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Qualification</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g. B.Pharm, D.Pharm, M.Sc" {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="employment_type"
                      rules={{ required: "Employment type is required" }}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Employment Type</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select employment type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {employmentTypes.map((type) => (
                                <SelectItem key={type.value} value={type.value}>
                                  {type.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="number_of_vacancies"
                      rules={{
                        required: "Number of vacancies is required",
                        min: { value: 1, message: "Must be at least 1" },
                        valueAsNumber: true,
                      }}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Number of Vacancies</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="Enter number of job openings"
                              {...field}
                              onChange={(e) => field.onChange(parseInt(e.target.value, 10))}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="duty_hours"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Duty Hours</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g. 9AM - 5PM, Mon to Fri" {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="salary_range"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Salary Range</FormLabel>
                          <FormControl>
                            <Input placeholder="₹20,000 - ₹30,000" {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="contract_details"
                      rules={{ required: "Contract details are required" }}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Contract Details</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Enter contract terms, duration, notice period, etc."
                              className="min-h-[100px]"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="address"
                      rules={{ required: "Address is required" }}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Public Address</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Enter the address that will be visible to job seekers"
                              className="min-h-[80px]"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="google_location"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-2">
                            Google Location/Maps Link
                            <Lock className="h-3 w-3 text-gray-400" />
                            <span className="text-xs text-gray-500">
                              (Hidden from public)
                            </span>
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter Google Maps link or precise location"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>








                {/* Manager Info */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <User className="h-4 w-4" /> Manager Info
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <FormField
                      control={form.control}
                      name="manager_name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Manager Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Manager Name" {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="manager_email"
                      rules={{
                        required: "Manager email is required",
                        pattern: {
                          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/i,
                          message: "Invalid email address",
                        },
                      }}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-2">
                            <Mail className="h-4 w-4" /> Manager Email
                            <Lock className="h-3 w-3 text-gray-400" />
                            <span className="text-xs text-gray-500">
                              (Hidden from public)
                            </span>
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="manager@organization.com"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="manager_contact"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Manager Contact</FormLabel>
                          <FormControl>
                            <Input placeholder="Contact Number" {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>

                {/* Footer Buttons */}
                <div className="flex justify-end gap-2 pt-4">
                  <Button variant="ghost" type="button" onClick={() => setEditingJob(null)}>
                    Cancel
                  </Button>
                  <Button type="submit">Save Changes</Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      )}







    </div>
  );
};

export default Myjob;


