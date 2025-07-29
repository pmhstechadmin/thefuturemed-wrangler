




// import { useEffect, useState } from "react";
// import { Button } from "@/components/ui/button";
// import {
//     Card,
//     CardContent,
//     CardDescription,
//     CardHeader,
//     CardTitle,
// } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Badge } from "@/components/ui/badge";
// import {
//     Search,
//     MapPin,
//     GraduationCap,
//     Briefcase,
//     User,
//     Lock,
//     Crown,
//     Phone,
// } from "lucide-react";
// import { supabase } from "@/integrations/supabase/client";
// import {
//     Dialog,
//     DialogContent,
//     DialogHeader,
//     DialogTitle,
//     DialogDescription,
//     DialogFooter,
// } from "@/components/ui/dialog";
// import {
//   ArrowLeft,
//   Shield,
//   UserPlus,
//   Home,

//   Menu,
//   X,
//   LogOut,
//   FileEdit,
//   Trash2,
//   Eye,
//   EyeOff,
//   UserIcon,
// } from "lucide-react";
// import { useToast } from "@/hooks/use-toast";
// import { useNavigate, Link } from "react-router-dom";
// import logo from "@/image/thefuturemed_logo (1).jpg";
// import { DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
// import { DropdownMenu } from "@radix-ui/react-dropdown-menu";


// const MyJobProfile = () => {
//     const [searchTerm, setSearchTerm] = useState("");

//     const [jobSeeker, setJobSeeker] = useState([]);
//     const [selectedSeeker, setSelectedSeeker] = useState(null);
//     const [user, setUser] = useState<any>(null);
//      const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//     const { toast } = useToast();
//      const navigate = useNavigate();

//      const handleBackNavigation = () => {
//         navigate(-1);
//       };

//       const handleSignOut = async () => {
//         const { error } = await supabase.auth.signOut();
//         if (!error) {
//           setUser(null);
//           setMobileMenuOpen(false);
//           toast({ title: "Signed Out", description: "You have been signed out." });
//         }
//       };

//       useEffect(() => {
//         const checkUser = async () => {
//           const {
//             data: { session },
//             error,
//           } = await supabase.auth.getSession();
//           if (error) console.error("Session error:", error);
//           setUser(session?.user || null);
//         };
//         checkUser();
//       }, []);

//     useEffect(() => {
//         const fetchJobSeekerProfile = async () => {
//             const {
//                 data: { user },
//                 error: userError,
//             } = await supabase.auth.getUser();

//             if (userError || !user) return;

//             const { data, error } = await supabase
//                 .from("job_seekers")
//                 .select("*")
//                 .eq("user_id", user.id);

//             if (!error) setJobSeeker(data);
//         };

//         fetchJobSeekerProfile();
//     }, []);

//     const filteredSeekers = jobSeeker.filter((seeker) => {
//         const term = searchTerm.toLowerCase();
//         return (
//             (seeker.name || "").toLowerCase().includes(term) ||
//             (seeker.highest_qualification || "").toLowerCase().includes(term) ||
//             (seeker.specialization || "").toLowerCase().includes(term) ||
//             (seeker.skills || "").toLowerCase().includes(term)
//         );
//     });



//     return (
//        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
//            <header className="bg-black/30 backdrop-blur-md border-b border-white/20 sticky top-0 z-50 shadow-xl">
//         <div className="container mx-auto px-4 py-4">
//           <div className="flex items-center justify-between">
//             {/* Left Section - Logo and Back Button */}
//             <div className="flex items-center space-x-2 md:space-x-4">
//               <Button
//                 variant="outline"
//                 onClick={handleBackNavigation}
//                 className="text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm p-2 md:px-4 md:py-2"
//                 title="Go back"
//               >
//                 <ArrowLeft className="h-4 w-4 md:mr-2" />
//                 <span className="hidden md:inline">Back</span>
//               </Button>

//               <div className="flex items-center space-x-2">

//                 <Link to="/">
//                   <img src={logo} alt="Logo" className="h-10 w-100 mr-2" />
//                 </Link>
//               </div>
//             </div>

//             {/* Right Section - Navigation Items */}
//             <div className="flex items-center space-x-2 md:space-x-4">
//               {user ? (
//                 <>
//                   {/* Desktop View - Full User Info */}
//                   <div className="hidden lg:flex items-center space-x-4">
//                     <span className="text-white text-sm bg-white/10 px-3 py-1 rounded-full">
//                       Welcome, {user.email}
//                     </span>
//                     <Button
//                       variant="outline"
//                       className="text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm p-2 md:px-4 md:py-2"
//                       onClick={() => navigate("/profile")}
//                       title="Profile"
//                     >
//                       <UserIcon className="h-4 w-4 md:mr-2" />
//                       <span className="hidden md:inline">Profile</span>
//                     </Button>
//                     <Button
//                       variant="outline"
//                       className="text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm p-2 md:px-4 md:py-2"
//                       onClick={handleSignOut}
//                       title="Sign Out"
//                     >
//                       <span className="hidden md:inline">Sign Out</span>
//                     </Button>
//                   </div>

//                   {/* Mobile/Tablet View - User Menu Dropdown */}
//                   <div className="lg:hidden">
//                     <DropdownMenu>
//                       <DropdownMenuTrigger asChild>
//                         <Button
//                           variant="outline"
//                           size="icon"
//                           className="text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm"
//                         >
//                           <UserIcon className="h-4 w-4" />
//                         </Button>
//                       </DropdownMenuTrigger>
//                       <DropdownMenuContent className="w-56 bg-black/80 backdrop-blur-md border-white/20">
//                         <DropdownMenuLabel className="text-white">
//                           {user.email}
//                         </DropdownMenuLabel>
//                         <DropdownMenuSeparator className="bg-white/20" />
//                         <DropdownMenuItem
//                           className="text-white hover:bg-white/10"
//                           onClick={() => navigate("/profile")}
//                         >
//                           <UserIcon className="mr-2 h-4 w-4" />
//                           <span>Profile</span>
//                         </DropdownMenuItem>
//                         <DropdownMenuItem
//                           className="text-white hover:bg-white/10"
//                           onClick={handleSignOut}
//                         >
//                           <LogOut className="mr-2 h-4 w-4" />
//                           <span>Sign Out</span>
//                         </DropdownMenuItem>
//                       </DropdownMenuContent>
//                     </DropdownMenu>
//                   </div>
//                 </>
//               ) : (
//                 <>
//                   <Link to="/register">
//                     <Button
//                       variant="outline"
//                       className="hidden md:flex text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm"
//                     >
//                       Register
//                     </Button>
//                   </Link>

//                   <Link to="/">
//                     <Button
//                       className="bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl transition-all duration-200 p-2 md:px-4 md:py-2"
//                       title="Sign In"
//                     >
//                       <UserIcon className="h-4 w-4 md:mr-2" />
//                       <span className="hidden md:inline">Sign In</span>
//                     </Button>
//                   </Link>
//                 </>
//               )}

//               {/* Home Button - Icon only on mobile/tablet */}
//               <Button
//                 variant="outline"
//                 onClick={() => navigate("/")}
//                 className="text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm p-2 md:px-4 md:py-2"
//                 title="Go to home page"
//               >
//                 <Home className="h-4 w-4 md:mr-2" />
//                 <span className="hidden md:inline">Home</span>
//               </Button>
//             </div>
//           </div>
//         </div>
//       </header>
//             <div className="grid gap-4 sm:gap-6">
//                 {filteredSeekers.map((seeker) => (
//                     <Card
//                         key={seeker.id}
//                         className="hover:shadow-lg transition-shadow border-0 sm:border"
//                     >
//                         <CardHeader className="p-4 sm:p-6">
//                             <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
//                                 <div className="space-y-2">
//                                     <CardTitle className="text-lg sm:text-xl text-blue-600 flex items-center gap-2">
//                                         <User className="h-4 w-4 sm:h-5 sm:w-5" />
//                                         {seeker.name}
//                                     </CardTitle>
//                                     <CardDescription className="text-base sm:text-lg font-medium text-gray-900">
//                                         {seeker.qualification}
//                                     </CardDescription>
//                                 </div>

//                             </div>
//                         </CardHeader>
//                         <CardContent className="p-4 sm:p-6 pt-0">
//                             <div className="space-y-4">
//                                 <div className="flex flex-wrap gap-3 text-sm text-gray-600">
//                                     <div className="flex items-center">
//                                         <GraduationCap className="mr-1 h-4 w-4" />
//                                         {seeker.highest_qualification}
//                                     </div>
//                                     <div className="flex items-center">
//                                         <Briefcase className="mr-1 h-4 w-4" />
//                                         {seeker.years_of_experience} years experience
//                                     </div>
//                                     <div className="flex items-center">
//                                         <MapPin className="mr-1 h-4 w-4" />
//                                         {seeker.current_location}
//                                     </div>
//                                 </div>

//                                 <div className="space-y-2">
//                                     <h4 className="font-medium text-gray-900">
//                                         Contact Information:
//                                     </h4>
//                                     <div className="space-y-1">
//                                         <p className="text-sm text-gray-600 flex items-center">
//                                             Email: {seeker.email}
//                                         </p>
//                                         <p className="text-sm text-gray-600 flex items-center">
//                                             Phone: {seeker.phone}
//                                         </p>
//                                     </div>

//                                 </div>

//                                 <div>
//                                     <h4 className="font-medium text-gray-900 mb-2">
//                                         Key Skills:
//                                     </h4>
//                                     <div className="flex flex-wrap gap-2">
//                                         {(seeker.skills || []).slice(0, 5).map((skill, index) => (
//                                             <Badge
//                                                 key={index}
//                                                 variant="secondary"
//                                                 className="bg-green-100 text-green-800"
//                                             >
//                                                 {skill}
//                                             </Badge>
//                                         ))}
//                                         {(seeker.skills || []).length > 5 && (
//                                             <Badge
//                                                 variant="secondary"
//                                                 className="bg-green-100 text-green-800"
//                                             >
//                                                 +{(seeker.skills || []).length - 5}
//                                             </Badge>
//                                         )}
//                                     </div>
//                                 </div>

//                                 <div className="bg-gray-50 p-3 rounded-md text-sm">
//                                     <span className="font-medium text-gray-900">
//                                         Availability:{" "}
//                                     </span>
//                                     <span className="text-gray-700">{seeker.availability}</span>
//                                 </div>

//                                 <div className="flex flex-wrap gap-3 pt-4">

//                                 </div>
//                             </div>
//                         </CardContent>
//                     </Card>
//                 ))}
//             </div>

//             {/* Full Profile Dialog */}
//             <Dialog
//                 open={!!selectedSeeker}
//                 onOpenChange={(open) => !open && setSelectedSeeker(null)}
//             >
//                 <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
//                     {selectedSeeker && (
//                         <>
//                             <DialogHeader>
//                                 <DialogTitle className="text-lg sm:text-xl">
//                                     {selectedSeeker.name} Full Profile
//                                 </DialogTitle>
//                                 <DialogDescription className="text-sm sm:text-base">
//                                     {selectedSeeker.highest_qualification ||
//                                         "No qualification info"}
//                                 </DialogDescription>
//                             </DialogHeader>

//                             <div className="space-y-3 mt-4 text-sm sm:text-base">
//                                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
//                                     <div>
//                                         <p className="font-medium">Email:</p>
//                                         <p>{selectedSeeker.email}</p>
//                                     </div>
//                                     <div>
//                                         <p className="font-medium">Phone:</p>
//                                         <p>{selectedSeeker.phone}</p>
//                                     </div>
//                                     <div>
//                                         <p className="font-medium">Experience:</p>
//                                         <p>{selectedSeeker.years_of_experience} years</p>
//                                     </div>
//                                     <div>
//                                         <p className="font-medium">Location:</p>
//                                         <p>{selectedSeeker.current_location}</p>
//                                     </div>
//                                     <div>
//                                         <p className="font-medium">Availability:</p>
//                                         <p>{selectedSeeker.availability}</p>
//                                     </div>
//                                     <div>
//                                         <p className="font-medium">Specialization:</p>
//                                         <p>{selectedSeeker.specialization}</p>
//                                     </div>
//                                 </div>

//                                 <div className="pt-3">
//                                     <p className="font-medium">Skills:</p>
//                                     <div className="flex flex-wrap gap-2 mt-1">
//                                         {(selectedSeeker.skills || []).map((skill, index) => (
//                                             <Badge
//                                                 key={index}
//                                                 variant="secondary"
//                                                 className="bg-green-100 text-green-800"
//                                             >
//                                                 {skill}
//                                             </Badge>
//                                         ))}
//                                     </div>
//                                 </div>
//                             </div>

//                             <DialogFooter className="mt-6">
//                                 <Button
//                                     variant="outline"
//                                     onClick={() => setSelectedSeeker(null)}
//                                 >
//                                     Close
//                                 </Button>
//                             </DialogFooter>
//                         </>
//                     )}
//                 </DialogContent>
//             </Dialog>


//         </div>
//     );
// };


// export default MyJobProfile







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
import {
  ArrowLeft,
  Shield,
  UserPlus,
  Home,

  Menu,
  X,
  LogOut,
  FileEdit,
  Trash2,
  Eye,
  EyeOff,
  UserIcon,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate, Link } from "react-router-dom";
import logo from "@/image/thefuturemed_logo (1).jpg";
import { DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { DropdownMenu } from "@radix-ui/react-dropdown-menu";
import { mixpanelInstance } from "@/utils/mixpanel";


const MyJobProfile = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const [jobSeeker, setJobSeeker] = useState([]);
  const [selectedSeeker, setSelectedSeeker] = useState(null);
  const [user, setUser] = useState<any>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleBackNavigation = () => {
    navigate(-1);
  };

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      setUser(null);
      setMobileMenuOpen(false);
      toast({ title: "Signed Out", description: "You have been signed out." });
    }
  };

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

  const filteredSeekers = jobSeeker.filter((seeker) => {
    const term = searchTerm.toLowerCase();
    return (
      (seeker.name || "").toLowerCase().includes(term) ||
      (seeker.highest_qualification || "").toLowerCase().includes(term) ||
      (seeker.specialization || "").toLowerCase().includes(term) ||
      (seeker.skills || "").toLowerCase().includes(term)
    );
  });



  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <header className="bg-black/30 backdrop-blur-md border-b border-white/20 sticky top-0 z-50 shadow-xl">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Left Section - Logo and Back Button */}
            <div className="flex items-center space-x-2 md:space-x-4">
              <Button
                variant="outline"
                onClick={handleBackNavigation}
                className="text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm p-2 md:px-4 md:py-2"
                title="Go back"
              >
                <ArrowLeft className="h-4 w-4 md:mr-2" />
                <span className="hidden md:inline">Back</span>
              </Button>

              <div className="flex items-center space-x-2">

                <Link to="/">
                  <img src={logo} alt="Logo" className="h-10 w-100 mr-2" />
                </Link>
              </div>
            </div>

            {/* Right Section - Navigation Items */}
            <div className="flex items-center space-x-2 md:space-x-4">
              {user ? (
                <>
                  {/* Desktop View - Full User Info */}
                  <div className="hidden lg:flex items-center space-x-4">
                    <span className="text-white text-sm bg-white/10 px-3 py-1 rounded-full">
                      Welcome, {user.email}
                    </span>
                    <Button
                      variant="outline"
                      className="text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm p-2 md:px-4 md:py-2"
                      onClick={() => navigate("/profile")}
                      title="Profile"
                    >
                      <UserIcon className="h-4 w-4 md:mr-2" />
                      <span className="hidden md:inline">Profile</span>
                    </Button>
                    <Button
                      variant="outline"
                      className="text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm p-2 md:px-4 md:py-2"
                      onClick={handleSignOut}
                      title="Sign Out"
                    >
                      <span className="hidden md:inline">Sign Out</span>
                    </Button>
                  </div>

                  {/* Mobile/Tablet View - User Menu Dropdown */}
                  <div className="lg:hidden">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="outline"
                          size="icon"
                          className="text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm"
                        >
                          <UserIcon className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-56 bg-black/80 backdrop-blur-md border-white/20">
                        <DropdownMenuLabel className="text-white">
                          {user.email}
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator className="bg-white/20" />
                        <DropdownMenuItem
                          className="text-white hover:bg-white/10"
                          onClick={() => navigate("/profile")}
                        >
                          <UserIcon className="mr-2 h-4 w-4" />
                          <span>Profile</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-white hover:bg-white/10"
                          onClick={handleSignOut}
                        >
                          <LogOut className="mr-2 h-4 w-4" />
                          <span>Sign Out</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </>
              ) : (
                <>
                  <Link to="/register">
                    <Button
                      variant="outline"
                      className="hidden md:flex text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm"
                    >
                      Register
                    </Button>
                  </Link>

                  <Link to="/">
                    <Button
                      className="bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl transition-all duration-200 p-2 md:px-4 md:py-2"
                      title="Sign In"
                    >
                      <UserIcon className="h-4 w-4 md:mr-2" />
                      <span className="hidden md:inline">Sign In</span>
                    </Button>
                  </Link>
                </>
              )}

              {/* Home Button - Icon only on mobile/tablet */}
              <Button
                variant="outline"
                onClick={() => navigate("/")}
                className="text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm p-2 md:px-4 md:py-2"
                title="Go to home page"
              >
                <Home className="h-4 w-4 md:mr-2" />
                <span className="hidden md:inline">Home</span>
              </Button>
            </div>
          </div>
        </div>
      </header>
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
                      Email: {seeker.email}
                    </p>
                    <p className="text-sm text-gray-600 flex items-center">
                      Phone:{seeker.phoneno_ccode} {seeker.phone}
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
                <div className="flex flex-wrap gap-3 pt-4">
                  <Button
                    variant="outline"
                    size="sm"
                     onClick={() => {
                                                    mixpanelInstance.track(
                                                      " Job seekerform Edit page view seminer Button Clicked",
                                                      {
                                                        timestamp: new Date().toISOString(),
                                                      }
                                                    );
                                                    navigate("/job-seekerform", {
                                                      state: { seeker }, // Passing seeker object 
                                                      });
                                                  }}
                    // onClick={() =>
                    //   navigate("/job-seekerform", {
                    //     state: { seeker }, // Passing seeker object
                    //   })
                    // }
                  >
                    <FileEdit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                </div>

                <div className="flex flex-wrap gap-3 pt-4">
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
                  {selectedSeeker.name} Full Profile
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
                                                  mixpanelInstance.track(
                                                    "close view job Button Clicked",
                                                    {
                                                      timestamp: new Date().toISOString(),
                                                    }
                                                  );
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


    </div>
  );
};


export default MyJobProfile