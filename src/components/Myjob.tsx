


// import { useEffect, useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Badge } from "@/components/ui/badge";
// import { Search, MapPin, Clock, DollarSign, Briefcase, Building, ArrowLeft, Shield, UserPlus, Home, User } from "lucide-react";
// import { supabase } from "@/integrations/supabase/client";
// import { UNSAFE_useRouteId } from "react-router-dom";
// import { useNavigate, Link } from "react-router-dom";
// import { useToast } from "@/hooks/use-toast";


// const Myjob = () => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [locationFilter, setLocationFilter] = useState("");
//   const [jobProvider, setJobProvider] = useState(null);
//   const [jobs, setJobs] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [user, setUser] = useState(null);
//   const [loadingS, setLoadingS] = useState(true);
//   const navigate = useNavigate();
//   const { toast } = useToast();


//   const handleBackNavigation = () => {
//     if (window.history.length > 1) {
//       navigate(-1);
//     } else {
//       navigate('/');
//     }
//   };
//   const handleSignOut = async () => {
//     try {
//       const { error } = await supabase.auth.signOut();
//       if (error) throw error;
//       setUser(null);
//       toast({
//         title: "Signed Out",
//         description: "You have been successfully signed out.",
//       });
//     } catch (error) {
//       console.error('Sign out error:', error);
//       toast({
//         title: "Error",
//         description: "Failed to sign out. Please try again.",
//         variant: "destructive",
//       });
//     }
//   };


//   useEffect(() => {
//     checkUser();
//   }, []);

//   const checkUser = async () => {
//     console.log('Checking user sessionaaaaaaaaaaaa...');
//     try {
//       const { data: { session }, error } = await supabase.auth.getSession();
//       console.log('Session dataAAAAAAA:', session);
//       if (error) console.error('Supabase session error:', error);

//       setUser(session?.user || null);
//       if (session?.user) {
//         console.log('User logged in:', session.user.email);
//       } else {
//         console.log('No user session foundAAAAAAAAA.');
//       }
//     } catch (error) {
//       console.error('Error checking userAAAAAAA:', error);
//     } finally {
//       console.log('Finished checking userAAAAAAAA.');
//       setLoadingS(false);
//     }
//   };



//   useEffect(() => {
//     const fetchJobs = async () => {
//       console.log("🔍 Fetching current userMMMMMMMM...");

//       const {
//         data: { user },
//         error: userError
//       } = await supabase.auth.getUser();

//       if (userError) {
//         console.error("❌ Error getting userMMMMMMMMM:", userError);
//         return;
//       }

//       console.log("✅ Logged-in userMMMMMMMMMMMMMM:", user);

//       if (!user) {
//         console.warn("⚠️ No user found. Aborting fetchMMMMMMMMMMM.");
//         return;
//       }

//       console.log("📡 Fetching jobs where user_id MMMMMMMMMMM ≠", user.id);

//       const { data: jobList, error } = await supabase
//         .from("job_providers")
//         .select("*")
//         .eq("user_id", user.id)

//       if (error) {
//         console.error("❌ Error fetching jobsMMMMMMMMMMMMM:", error);
//       } else {
//         console.log("📦 Fetched jobs (excluding own)MMMM:", jobList);
//         setJobs(jobList);
//       }
//     };

//     fetchJobs();
//   }, [user]);






//   useEffect(() => {
//     const fetchJobs = async () => {
//       const { data: jobList, error } = await supabase
//         .from("job_providers")
//         .select("*");
//       console.log("show full job listings", jobList);
//       if (error) {
//         console.error("❌ Error fetching jobs:", error);
//       } else {
//         console.log("📦 Fetched job listings:", jobList);
//         setJobs(jobList);
//       }
//     };

//     if (user) {
//       fetchJobs();
//     }
//   }, [user]); // 👈 Now re-runs when `user` changes




//   const filteredJobs = jobs.filter((job) => {
//     const org = job.organization_name || "";
//     const manager = job.manager_name || "";
//     const location = job.google_location || "";
//     const orgType = job.organization_type || "";

//     console.log("🔍 Checking Job:", {
//       organization: org,
//       manager,
//       location,
//       organization_type: orgType,
//       searchTerm,
//       locationFilter,
//     });

//     const matchesSearch =
//       org.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       manager.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       orgType.toLowerCase().includes(searchTerm.toLowerCase()); // <-- added here

//     const matchesLocation =
//       locationFilter === "" || location.toLowerCase().includes(locationFilter.toLowerCase());

//     const isMatch = matchesSearch && matchesLocation;
//     console.log(`✅ Match: ${isMatch}`);

//     return isMatch;
//   });




//   return (
//     <div className="space-y-6">
//       {/* Search Section */}

//       <header className="bg-black border-b border-white/20 sticky top-0 z-50 shadow-xl">
//         <div className="container mx-auto px-4 py-4">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center space-x-4">
//               <Button
//                 variant="outline"
//                 onClick={handleBackNavigation}
//                 className="text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm"
//                 title="Go back"
//               >
//                 <ArrowLeft className="mr-2 h-4 w-4" />
//                 Back
//               </Button>
//               <Link to="/" className="flex items-center space-x-2">
//                 <Shield className="h-8 w-8 text-blue-400" />
//                 <h1 className="text-2xl font-bold text-white">MedPortal</h1>
//               </Link>
//             </div>
//             <div className="flex items-center space-x-4">
//               <div className="flex items-center space-x-2 bg-white/10 rounded-lg p-1">

//               </div>
//               {user ? (
//                 <div className="flex items-center space-x-4">
//                   <span className="text-white text-sm bg-white/10 px-3 py-1 rounded-full">Welcome, {user.email}</span>
//                   <Button
//                     variant="outline"
//                     className="text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm"
//                     onClick={() => navigate('/profile')}
//                   >
//                     <User className="mr-2 h-4 w-4" />
//                     Profile
//                   </Button>
//                   <Button
//                     variant="outline"
//                     className="text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm"
//                     onClick={handleSignOut}
//                   >
//                     Sign Out
//                   </Button>
//                 </div>
//               ) : (
//                 <>
//                   <Link to="/register">
//                     <Button
//                       variant="outline"
//                       className="text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm"
//                     >
//                       Register
//                     </Button>
//                   </Link>
//                   <Link to="/">
//                     <Button className="bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl transition-all duration-200">
//                       <UserPlus className="mr-2 h-4 w-4" />
//                       Sign In
//                     </Button>
//                   </Link>
//                 </>
//               )}
//               <Button
//                 variant="outline"
//                 onClick={() => navigate('/')}
//                 className="text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm"
//                 title="Go to home page"
//               >
//                 <Home className="mr-2 h-4 w-4" />
//                 Home
//               </Button>
//             </div>
//           </div>
//         </div>
//       </header>

//        <div className="bg-white shadow-sm border-b ">
//         <div className="container mx-auto px-4 py-6">
//           <div className="text-center">
//             <h1 className="text-4xl font-bold text-gray-900 mb-2">Medical Job Portal</h1>
//             <p className="text-gray-600 text-lg">Connect healthcare professionals with opportunities</p>
//           </div>
//         </div>
//       </div>

//       <Card>
//         <CardContent className="p-6">
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//             <div className="relative">
//               <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
//               <Input
//                 placeholder="    Search jobs, companies, keywords..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="pl-10"
//               />
//             </div>
//             <div className="relative">
//               <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
//               <Input
//                 placeholder="    Location"
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

//       {/* Results Header */}
//       <div className="flex items-center justify-between">
//         <h2 className="text-xl font-semibold text-gray-900">
//           {filteredJobs.length} My{filteredJobs.length !== 1 ? 's' : ''} Jobs
//         </h2>
//         <div className="flex gap-2">
//           <Badge variant="outline">All Categories</Badge>
//           <Badge variant="outline">Full-time</Badge>
//           <Badge variant="outline">Remote</Badge>
//         </div>
//       </div>

//       {/* Job Listings */}
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
//                 {/* <Button variant="outline" size="sm">
//                   Apply Now
//                 </Button> */}
//               </div>
//             </CardHeader>
//             <CardContent>
//               <div className="space-y-4">
//                 {/* Job Details */}
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
//                     Posted on {new Date(job.updated_at).toLocaleDateString('en-US', {
//                       year: 'numeric',
//                       month: 'long',
//                       day: 'numeric',
//                     })}
//                   </div>

//                 </div>

//                 {/* Job Description */}
//                 <p className="text-gray-700 leading-relaxed">
//                   {job.description}
//                 </p>

//                 {/* Tags */}
//                 <div className="flex flex-wrap gap-2">
//                   {Array.isArray(job.tags) &&
//                     job.tags.map((tag, index) => (
//                       <Badge key={index} variant="secondary" className="bg-blue-100 text-blue-800">
//                         {tag}
//                       </Badge>
//                     ))}
//                 </div>


//                 {/* Requirements Preview */}
//                 <div>
//                   <h4 className="font-medium text-gray-900 mb-2">Key Requirements:</h4>
//                   <ul className="text-sm text-gray-600 space-y-1">
//                     {Array.isArray(job.requirements) &&
//                       job.requirements.slice(0, 3).map((req, index) => (
//                         <li key={index} className="flex items-center">
//                           <span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>
//                           {req}
//                         </li>
//                       ))}
//                   </ul>
//                 </div>


//                 {/* Action Buttons */}
//                 <div className="flex gap-3 pt-4">
//                   {/* <Button className="bg-blue-600 hover:bg-blue-700">
//                     Apply Now
//                   </Button>
//                   <Button variant="outline">
//                     Save Job
//                   </Button> */}
//                   <Button variant="ghost" size="sm">
//                     View Applicants
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
//           Load More Jobs
//         </Button>
//       </div>
//     </div>
//   );
// };

// export default Myjob;





// import { useEffect, useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Badge } from "@/components/ui/badge";
// import { Search, MapPin, Clock, DollarSign, Briefcase, Building, ArrowLeft, Shield, UserPlus, Home, User } from "lucide-react";
// import { supabase } from "@/integrations/supabase/client";
// import { UNSAFE_useRouteId } from "react-router-dom";
// import { useNavigate, Link } from "react-router-dom";
// import { useToast } from "@/hooks/use-toast";


// const Myjob = () => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [locationFilter, setLocationFilter] = useState("");
//   const [jobProvider, setJobProvider] = useState(null);
//   const [jobs, setJobs] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [user, setUser] = useState(null);
//   const [loadingS, setLoadingS] = useState(true);
//   const navigate = useNavigate();
//   const { toast } = useToast();


//   const handleBackNavigation = () => {
//     if (window.history.length > 1) {
//       navigate(-1);
//     } else {
//       navigate('/');
//     }
//   };
//   const handleSignOut = async () => {
//     try {
//       const { error } = await supabase.auth.signOut();
//       if (error) throw error;
//       setUser(null);
//       toast({
//         title: "Signed Out",
//         description: "You have been successfully signed out.",
//       });
//     } catch (error) {
//       console.error('Sign out error:', error);
//       toast({
//         title: "Error",
//         description: "Failed to sign out. Please try again.",
//         variant: "destructive",
//       });
//     }
//   };


//   useEffect(() => {
//     checkUser();
//   }, []);

//   const checkUser = async () => {
//     console.log('Checking user sessionaaaaaaaaaaaa...');
//     try {
//       const { data: { session }, error } = await supabase.auth.getSession();
//       console.log('Session dataAAAAAAA:', session);
//       if (error) console.error('Supabase session error:', error);

//       setUser(session?.user || null);
//       if (session?.user) {
//         console.log('User logged in:', session.user.email);
//       } else {
//         console.log('No user session foundAAAAAAAAA.');
//       }
//     } catch (error) {
//       console.error('Error checking userAAAAAAA:', error);
//     } finally {
//       console.log('Finished checking userAAAAAAAA.');
//       setLoadingS(false);
//     }
//   };



//   useEffect(() => {
//     const fetchJobs = async () => {
//       console.log("🔍 Fetching current userMMMMMMMM...");

//       const {
//         data: { user },
//         error: userError
//       } = await supabase.auth.getUser();

//       if (userError) {
//         console.error("❌ Error getting userMMMMMMMMM:", userError);
//         return;
//       }

//       console.log("✅ Logged-in userMMMMMMMMMMMMMM:", user);

//       if (!user) {
//         console.warn("⚠️ No user found. Aborting fetchMMMMMMMMMMM.");
//         return;
//       }

//       console.log("📡 Fetching jobs where user_id MMMMMMMMMMM ≠", user.id);

//       const { data: jobList, error } = await supabase
//         .from("job_providers")
//         .select("*")
//         .eq("user_id", user.id)

//       if (error) {
//         console.error("❌ Error fetching jobsMMMMMMMMMMMMM:", error);
//       } else {
//         console.log("📦 Fetched jobs (excluding own)MMMM:", jobList);
//         setJobs(jobList);
//       }
//     };

//     fetchJobs();
//   }, [user]);






//   useEffect(() => {
//     const fetchJobs = async () => {
//       const { data: jobList, error } = await supabase
//         .from("job_providers")
//         .select("*");
//       console.log("show full job listings", jobList);
//       if (error) {
//         console.error("❌ Error fetching jobs:", error);
//       } else {
//         console.log("📦 Fetched job listings:", jobList);
//         setJobs(jobList);
//       }
//     };

//     if (user) {
//       fetchJobs();
//     }
//   }, [user]); // 👈 Now re-runs when `user` changes




//   const filteredJobs = jobs.filter((job) => {
//     const org = job.organization_name || "";
//     const manager = job.manager_name || "";
//     const location = job.google_location || "";
//     const orgType = job.organization_type || "";

//     console.log("🔍 Checking Job:", {
//       organization: org,
//       manager,
//       location,
//       organization_type: orgType,
//       searchTerm,
//       locationFilter,
//     });

//     const matchesSearch =
//       org.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       manager.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       orgType.toLowerCase().includes(searchTerm.toLowerCase()); // <-- added here

//     const matchesLocation =
//       locationFilter === "" || location.toLowerCase().includes(locationFilter.toLowerCase());

//     const isMatch = matchesSearch && matchesLocation;
//     console.log(`✅ Match: ${isMatch}`);

//     return isMatch;
//   });




//   return (
//     <div className="space-y-6">
//       {/* Search Section */}

//       <header className="bg-black border-b border-white/20 sticky top-0 z-50 shadow-xl">
//         <div className="container mx-auto px-4 py-4">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center space-x-4">
//               <Button
//                 variant="outline"
//                 onClick={handleBackNavigation}
//                 className="text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm"
//                 title="Go back"
//               >
//                 <ArrowLeft className="mr-2 h-4 w-4" />
//                 Back
//               </Button>
//               <Link to="/" className="flex items-center space-x-2">
//                 <Shield className="h-8 w-8 text-blue-400" />
//                 <h1 className="text-2xl font-bold text-white">MedPortal</h1>
//               </Link>
//             </div>
//             <div className="flex items-center space-x-4">
//               <div className="flex items-center space-x-2 bg-white/10 rounded-lg p-1">

//               </div>
//               {user ? (
//                 <div className="flex items-center space-x-4">
//                   <span className="text-white text-sm bg-white/10 px-3 py-1 rounded-full">Welcome, {user.email}</span>
//                   <Button
//                     variant="outline"
//                     className="text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm"
//                     onClick={() => navigate('/profile')}
//                   >
//                     <User className="mr-2 h-4 w-4" />
//                     Profile
//                   </Button>
//                   <Button
//                     variant="outline"
//                     className="text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm"
//                     onClick={handleSignOut}
//                   >
//                     Sign Out
//                   </Button>
//                 </div>
//               ) : (
//                 <>
//                   <Link to="/register">
//                     <Button
//                       variant="outline"
//                       className="text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm"
//                     >
//                       Register
//                     </Button>
//                   </Link>
//                   <Link to="/">
//                     <Button className="bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl transition-all duration-200">
//                       <UserPlus className="mr-2 h-4 w-4" />
//                       Sign In
//                     </Button>
//                   </Link>
//                 </>
//               )}
//               <Button
//                 variant="outline"
//                 onClick={() => navigate('/')}
//                 className="text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm"
//                 title="Go to home page"
//               >
//                 <Home className="mr-2 h-4 w-4" />
//                 Home
//               </Button>
//             </div>
//           </div>
//         </div>
//       </header>

//        <div className="bg-white shadow-sm border-b ">
//         <div className="container mx-auto px-4 py-6">
//           <div className="text-center">
//             <h1 className="text-4xl font-bold text-gray-900 mb-2">Medical Job Portal</h1>
//             <p className="text-gray-600 text-lg">Connect healthcare professionals with opportunities</p>
//           </div>
//         </div>
//       </div>

//       <Card>
//         <CardContent className="p-6">
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//             <div className="relative">
//               <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
//               <Input
//                 placeholder="    Search jobs, companies, keywords..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="pl-10"
//               />
//             </div>
//             <div className="relative">
//               <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
//               <Input
//                 placeholder="    Location"
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

//       {/* Results Header */}
//       <div className="flex items-center justify-between">
//         <h2 className="text-xl font-semibold text-gray-900">
//           {filteredJobs.length} My{filteredJobs.length !== 1 ? 's' : ''} Jobs
//         </h2>
//         <div className="flex gap-2">
//           <Badge variant="outline">All Categories</Badge>
//           <Badge variant="outline">Full-time</Badge>
//           <Badge variant="outline">Remote</Badge>
//         </div>
//       </div>

//       {/* Job Listings */}
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
//                 {/* <Button variant="outline" size="sm">
//                   Apply Now
//                 </Button> */}
//               </div>
//             </CardHeader>
//             <CardContent>
//               <div className="space-y-4">
//                 {/* Job Details */}
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
//                     Posted on {new Date(job.updated_at).toLocaleDateString('en-US', {
//                       year: 'numeric',
//                       month: 'long',
//                       day: 'numeric',
//                     })}
//                   </div>

//                 </div>

//                 {/* Job Description */}
//                 <p className="text-gray-700 leading-relaxed">
//                   {job.description}
//                 </p>

//                 {/* Tags */}
//                 <div className="flex flex-wrap gap-2">
//                   {Array.isArray(job.tags) &&
//                     job.tags.map((tag, index) => (
//                       <Badge key={index} variant="secondary" className="bg-blue-100 text-blue-800">
//                         {tag}
//                       </Badge>
//                     ))}
//                 </div>


//                 {/* Requirements Preview */}
//                 <div>
//                   <h4 className="font-medium text-gray-900 mb-2">Key Requirements:</h4>
//                   <ul className="text-sm text-gray-600 space-y-1">
//                     {Array.isArray(job.requirements) &&
//                       job.requirements.slice(0, 3).map((req, index) => (
//                         <li key={index} className="flex items-center">
//                           <span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>
//                           {req}
//                         </li>
//                       ))}
//                   </ul>
//                 </div>


//                 {/* Action Buttons */}
//                 <div className="flex gap-3 pt-4">
//                   {/* <Button className="bg-blue-600 hover:bg-blue-700">
//                     Apply Now
//                   </Button>
//                   <Button variant="outline">
//                     Save Job
//                   </Button> */}
//                   <Button variant="ghost" size="sm">
//                     View Applicants
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
//           Load More Jobs
//         </Button>
//       </div>
//     </div>
//   );
// };

// export default Myjob;





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
// } from "lucide-react";
// import { supabase } from "@/integrations/supabase/client";
// import { useNavigate, Link } from "react-router-dom";
// import { useToast } from "@/hooks/use-toast";
// import { Input } from "@/components/ui/input";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";



// const Myjob = () => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [locationFilter, setLocationFilter] = useState("");
//   const [jobs, setJobs] = useState([]);
//   const [user, setUser] = useState(null);
//   const [selectedJobId, setSelectedJobId] = useState(null);
//   const [applicants, setApplicants] = useState([]);
//   const [loadingApplicants, setLoadingApplicants] = useState(false);
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
//     const org = job.organization_name?.toLowerCase() || "";
//     const manager = job.manager_name?.toLowerCase() || "";
//     const location = job.google_location?.toLowerCase() || "";
//     const orgType = job.organization_type?.toLowerCase() || "";
//     const query = searchTerm.toLowerCase();
//     return (
//       (org.includes(query) || manager.includes(query) || orgType.includes(query)) &&
//       location.includes(locationFilter.toLowerCase())
//     );
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

//   return (
//     <div className="space-y-6">
//       {/* Header, Search, etc. */}

//        <header className="bg-black border-b border-white/20 sticky top-0 z-50 shadow-xl">
//         <div className="container mx-auto px-4 py-4 flex items-center justify-between">
//           <div className="flex items-center space-x-4">
//             <Button variant="outline" onClick={handleBackNavigation} className="text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm">
//               <ArrowLeft className="mr-2 h-4 w-4" /> Back
//             </Button>
//             <Link to="/" className="flex items-center space-x-2">
//               <Shield className="h-8 w-8 text-blue-400" />
//               <h1 className="text-2xl font-bold text-white">MedPortal</h1>
//             </Link>
//           </div>
//           <div className="flex items-center space-x-4">
//             {user ? (
//               <>
//                 <span className="text-white text-sm bg-white/10 px-3 py-1 rounded-full">Welcome, {user.email}</span>
//                 <Button variant="outline" onClick={() => navigate('/profile')} className="text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm">
//                   <User className="mr-2 h-4 w-4" /> Profile
//                 </Button>
//                 <Button variant="outline" onClick={handleSignOut} className="text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm">
//                   Sign Out
//                 </Button>
//               </>
//             ) : (
//               <>
//                 <Link to="/register">
//                   <Button variant="outline" className="text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm">Register</Button>
//                 </Link>
//                 <Link to="/">
//                   <Button className="bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl transition-all duration-200">
//                     <UserPlus className="mr-2 h-4 w-4" /> Sign In
//                   </Button>
//                 </Link>
//               </>
//             )}
//             <Button variant="outline" onClick={() => navigate('/')} className="text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm">
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
//               <Input placeholder="Search jobs, companies, keywords..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-10" />
//             </div>
//             <div className="relative">
//               <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
//               <Input placeholder="Location" value={locationFilter} onChange={(e) => setLocationFilter(e.target.value)} className="pl-10" />
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
//                   <CardDescription>{job.organization_name}</CardDescription>
//                 </div>
//               </div>
//             </CardHeader>
//             <CardContent>
//               <div className="flex flex-wrap gap-4 text-sm text-gray-600">
//                 <div className="flex items-center"><MapPin className="mr-1 h-4 w-4" />{job.google_location}</div>
//                 <div className="flex items-center"><Briefcase className="mr-1 h-4 w-4" />{job.organization_type}</div>
//                 <div className="flex items-center"><DollarSign className="mr-1 h-4 w-4" />{job.salary}</div>
//                 <div className="flex items-center"><Clock className="mr-1 h-4 w-4" />{new Date(job.updated_at).toLocaleDateString()}</div>
//               </div>
//               <p className="mt-2 text-gray-700">{job.description}</p>
//               <div className="flex gap-2 mt-4">
//                 <Button variant="ghost" size="sm" onClick={() => fetchApplicants(job.id)}>
//                   View Applicants
//                 </Button>
//               </div>
//             </CardContent>
//           </Card>
//         ))}
//       </div>

//       {/* Modal for Applicants */}
//       {selectedJobId && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white rounded-lg w-full max-w-3xl p-6 max-h-[80vh] overflow-y-auto relative">
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
//                 <Card key={seeker.id} className="mb-3">
//                   <CardHeader>
//                     <CardTitle>{seeker.highest_qualification}</CardTitle>
//                     <CardDescription>{seeker.specialization}</CardDescription>
//                   </CardHeader>
//                   <CardContent>
//                     <p><strong>Email:</strong> {seeker.email}</p>
//                     <p><strong>Skills:</strong> {seeker.skills?.join(", ")}</p>
//                     <p><strong>Experience:</strong> {seeker.years_of_experience} years</p>
//                   </CardContent>
//                 </Card>
//               ))
//             ) : (
//               <p>No applicants for this job yet.</p>
//             )}
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
  GraduationCap
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate, Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";



const Myjob = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [jobs, setJobs] = useState([]);
  const [user, setUser] = useState(null);
  const [selectedJobId, setSelectedJobId] = useState(null);
  const [applicants, setApplicants] = useState([]);
  const [loadingApplicants, setLoadingApplicants] = useState(false);
  const [hasSubscription, setHasSubscription] = useState(false);
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
    const org = job.organization_name?.toLowerCase() || "";
    const manager = job.manager_name?.toLowerCase() || "";
    const location = job.google_location?.toLowerCase() || "";
    const orgType = job.organization_type?.toLowerCase() || "";
    const query = searchTerm.toLowerCase();
    return (
      (org.includes(query) || manager.includes(query) || orgType.includes(query)) &&
      location.includes(locationFilter.toLowerCase())
    );
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

  return (
    <div className="space-y-6">
      {/* Header, Search, etc. */}

      <header className="bg-black border-b border-white/20 sticky top-0 z-50 shadow-xl">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="outline" onClick={handleBackNavigation} className="text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back
            </Button>
            <Link to="/" className="flex items-center space-x-2">
              <Shield className="h-8 w-8 text-blue-400" />
              <h1 className="text-2xl font-bold text-white">MedPortal</h1>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <span className="text-white text-sm bg-white/10 px-3 py-1 rounded-full">Welcome, {user.email}</span>
                <Button variant="outline" onClick={() => navigate('/profile')} className="text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm">
                  <User className="mr-2 h-4 w-4" /> Profile
                </Button>
                <Button variant="outline" onClick={handleSignOut} className="text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm">
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Link to="/register">
                  <Button variant="outline" className="text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm">Register</Button>
                </Link>
                <Link to="/">
                  <Button className="bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl transition-all duration-200">
                    <UserPlus className="mr-2 h-4 w-4" /> Sign In
                  </Button>
                </Link>
              </>
            )}
            <Button variant="outline" onClick={() => navigate('/')} className="text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm">
              <Home className="mr-2 h-4 w-4" /> Home
            </Button>
          </div>
        </div>
      </header>

      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input placeholder="Search jobs, companies, keywords..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-10" />
            </div>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input placeholder="Location" value={locationFilter} onChange={(e) => setLocationFilter(e.target.value)} className="pl-10" />
            </div>
            <Button className="w-full bg-blue-600 hover:bg-blue-700">
              <Search className="mr-2 h-4 w-4" /> Search Jobs
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6">
        {filteredJobs.map((job) => (
          <Card key={job.id}>
            <CardHeader>
              <div className="flex justify-between">
                <div>
                  <CardTitle>{job.title}</CardTitle>

                  <CardDescription className="text-lg font-medium text-gray-900 flex items-center gap-2">
                    <Building className="h-4 w-4" />
                    {job.organization_name}
                  </CardDescription>

                  <CardDescription>{job.organization_name}</CardDescription>

                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                <div className="flex items-center"><MapPin className="mr-1 h-4 w-4" />{job.google_location}</div>
                <div className="flex items-center"><Briefcase className="mr-1 h-4 w-4" />{job.organization_type}</div>
                <div className="flex items-center"><DollarSign className="mr-1 h-4 w-4" />{job.salary}</div>

                 <div className="flex items-center">
                    <Clock className="mr-1 h-4 w-4" />
                    Posted on{" "}
                    {new Date(job.updated_at).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </div>

                <div className="flex items-center"><Clock className="mr-1 h-4 w-4" />{new Date(job.updated_at).toLocaleDateString()}</div>

              </div>
              <p className="mt-2 text-gray-700">{job.description}</p>
              <div className="flex gap-2 mt-4">
                <Button variant="ghost" size="sm" onClick={() => fetchApplicants(job.id)}>
                  View Applicants
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Modal for Applicants */}
      {selectedJobId && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-3xl p-6 max-h-[80vh] overflow-y-auto relative" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
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
                <Card key={seeker.id} className="hover:shadow-lg transition-shadow mb-4">
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
                        <h4 className="font-medium text-gray-900">Contact Information:</h4>
                        <p className="text-sm text-gray-600">
                          Email: {hasSubscription ? seeker.email : "***@***.com"}
                          {!hasSubscription && <Lock className="inline h-3 w-3 ml-1 text-amber-500" />}
                        </p>
                        <p className="text-sm text-gray-600">
                          Phone: {hasSubscription ? seeker.phone : "+1 (***) ***-****"}
                          {!hasSubscription && <Lock className="inline h-3 w-3 ml-1 text-amber-500" />}
                        </p>
                      </div>

                      {/* Skills */}
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">Key Skills:</h4>
                        <div className="flex flex-wrap gap-2">
                          {(seeker.skills || []).map((skill, idx) => (
                            <Badge key={idx} variant="secondary" className="bg-green-100 text-green-800">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Availability */}
                      <div className="bg-gray-50 p-3 rounded-md">
                        <span className="font-medium text-gray-900">Availability: </span>
                        <span className="text-gray-700">{seeker.availability}</span>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-3 pt-4">
                        <Button className="bg-blue-600 hover:bg-blue-700">Subscribe to Contact</Button>
                        <Button variant="outline">Save Candidate</Button>
                        <Button variant="ghost" size="sm">View Full Profile</Button>
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
    </div>
  );
};

export default Myjob;

