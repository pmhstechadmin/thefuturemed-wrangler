// import { useState, useEffect } from "react";
// import { useParams, useNavigate, Link } from "react-router-dom";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import {
//   ArrowLeft,
//   User,
//   Clock,
//   CalendarDays,
//   Users,
//   CheckCircle,
//   Home,
//   Shield,
//   Copy,
//   Loader2,
//   Video,
//   Globe,
// } from "lucide-react";
// import { supabase } from "@/integrations/supabase/client";
// import { useToast } from "@/hooks/use-toast";
// import type { User as AuthUser } from "@supabase/supabase-js";
// import VideoMeeting from "../../components/VideoMeeting";
// import { v4 as uuidv4 } from "uuid";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import logo from "@/image/thefuturemed_logo (1).jpg";
// import Footer from "@/footer/Footer";

// interface Seminar {
//   id: string;
//   host_name: string;
//   topic: string;
//   description: string;
//   date: string;
//   time: string;
//   host_id: string;
//   meeting_id?: string | null;
//   host_country?: string | null;
//   is_host_joined: boolean;
//   host_timezone: string; // NEW: Store host's timezone
//   utc_start_time: string; // NEW: Store UTC timestamp
// }

// interface Speaker {
//   id: string;
//   name: string;
//   qualification: string;
//   department: string;
// }

// const SeminarDetails = () => {
//   const { seminarId } = useParams();
//   const navigate = useNavigate();
//   const [seminar, setSeminar] = useState<Seminar | null>(null);
//   const [speakers, setSpeakers] = useState<Speaker[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [registering, setRegistering] = useState(false);
//   const [isRegistered, setIsRegistered] = useState(false);
//   const [user, setUser] = useState<AuthUser | null>(null);
//   const { toast } = useToast();
//   const [canceling, setCanceling] = useState(false);
//   const [registrationId, setRegistrationId] = useState<string | null>(null);
//   const [showMeeting, setShowMeeting] = useState(false);
//   const [creatingMeeting, setCreatingMeeting] = useState(false);
//   const isHost = user?.id === seminar?.host_id;
//   const [timeLeft, setTimeLeft] = useState<string | null>(null);
//   const [localTime, setLocalTime] = useState<string>("");
//   const [hostTime, setHostTime] = useState<string>("");
//   const [isSeminarPast, setIsSeminarPast] = useState(false);
//  const [currentISTTime, setCurrentISTTime] = useState('');
//   const handleBackNavigation = () => {
//     navigate(-1);
//   };

//   const onNavigateProfile = () => {
//     navigate("/profile");
//   };

//   const onNavigateHome = () => {
//     navigate("/");
//   };
//   // Calculate time left and format times
//   // useEffect(() => {
//   //   if (!seminar) return;

//   //   // Calculate time left
//   //   const calculateTimeLeft = () => {
//   //     const now = new Date();
//   //     const seminarStart = new Date(seminar.utc_start_time);
//   //     const diffMs = seminarStart.getTime() - now.getTime();

//   //     if (diffMs <= 0) {
//   //       setIsSeminarPast(true);
//   //       return "Seminar has started";
//   //     }

//   //     const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
//   //     const hours = Math.floor(
//   //       (diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
//   //     );
//   //     const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
//   //     const seconds = Math.floor((diffMs % (1000 * 60)) / 1000);

//   //     return `${days}d ${hours}h ${minutes}m ${seconds}s`;
//   //   };
//   //   // Format time for display
//   //   const formatTime = (date: Date, timeZone: string) => {
//   //     return date.toLocaleTimeString([], {
//   //       hour: "2-digit",
//   //       minute: "2-digit",
//   //       timeZone: timeZone,
//   //     });
//   //   };
//   //   // Update times immediately
//   //   const seminarStart = new Date(seminar.utc_start_time);
//   //   setHostTime(formatTime(seminarStart, seminar.host_timezone));
//   //   setLocalTime(
//   //     formatTime(seminarStart, Intl.DateTimeFormat().resolvedOptions().timeZone)
//   //   );
//   //   setTimeLeft(calculateTimeLeft());

//   //   // Update countdown every second
//   //   const timer = setInterval(() => {
//   //     setTimeLeft(calculateTimeLeft());
//   //   }, 1000);

//   //   return () => clearInterval(timer);
//   // }, [seminar]);
// useEffect(() => {
//   // ... existing useEffect code ...

//   // NEW: Update current IST time
//   const updateISTTime = () => {
//     const now = new Date();
//     const istTime = now.toLocaleTimeString("en-US", {
//       timeZone: "Asia/Kolkata",
//       hour: "2-digit",
//       minute: "2-digit",
//       second: "2-digit",
//       hour12: true,
//     });
//     setCurrentISTTime(`Current IST Time: ${istTime}`);
//   };

//   updateISTTime();
//   const timer = setInterval(updateISTTime, 1000);

//   return () => clearInterval(timer);
// }, [seminarId, toast]);
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         // Get user session
//         const {
//           data: { session },
//         } = await supabase.auth.getSession();
//         setUser(session?.user || null);

//         // Fetch seminar details
//         const { data: seminarData, error: seminarError } = await supabase
//           .from("seminars")
//           .select("*")
//           .eq("id", seminarId)
//           .single();
//         console.log("✅ Host Joined Status:", seminarData.is_host_joined);
//         if (seminarError) throw seminarError;
//         setSeminar(seminarData);

//         // Fetch speakers
//         const { data: speakersData, error: speakersError } = await supabase
//           .from("speakers")
//           .select("*")
//           .eq("seminar_id", seminarId);

//         if (speakersError) throw speakersError;
//         setSpeakers(speakersData || []);

//         // Check registration if user is logged in
//         if (session?.user) {
//           await checkRegistrationStatus(session.user.id);
//         }
//       } catch (error) {
//         console.error("Error fetching data:", error);
//         toast({
//           title: "Error",
//           description: "Failed to load seminar details",
//           variant: "destructive",
//         });
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [seminarId, toast]);

//   const checkRegistrationStatus = async (userId: string) => {
//     try {
//       const { data, error } = await supabase
//         .from("seminar_registrations")
//         .select("id")
//         .eq("seminar_id", seminarId)
//         .eq("user_id", userId)
//         .maybeSingle();

//       if (error) throw error;
//       setIsRegistered(!!data);
//       if (data) setRegistrationId(data.id);
//     } catch (error) {
//       console.error("Error checking registration:", error);
//     }
//   };

//   // const createMeeting = async () => {
//   //   if (!seminarId || !isHost) return;

//   //   try {
//   //     setCreatingMeeting(true);
//   //     const newMeetingId = uuidv4();
//   //     console.log("🔍 seminarId to update:", seminarId);

//   //     const { data, error } = await supabase
//   //       .from("seminars")
//   //       .update({ is_host_joined: true, meeting_id: newMeetingId } as Seminar)
//   //       // .update({ meeting_id: newMeetingId } as Seminar)
//   //       .eq("id", seminarId)
//   //       .select()
//   //       .single();

//   //      console.log("✅ is_host_joined after update:", data?.is_host_joined);
//   //      console.log("Supabase Error (if any):", error);
//   //       // console.log(is_host_joined.length);
//   //     if (error) throw error;

//   //     // Update local state immediately
//   //     setSeminar((prev) =>
//   //       prev
//   //         ? { ...prev,is_host_joined: true, meeting_id: newMeetingId }
//   //         : null
//   //     );

//   //     // toast({
//   //     //   title: "Meeting Created",
//   //     //   description: "A new meeting ID has been generated",
//   //     // });
//   //     // setShowMeeting(true);
//   //   } catch (error) {
//   //     console.error("Error creating meeting:", error);
//   //     toast({
//   //       title: "Error",
//   //       description: "Failed to create meeting",
//   //       variant: "destructive",
//   //     });
//   //   } finally {
//   //     setCreatingMeeting(false);
//   //   }
//   // };

//   // const copyMeetingId = () => {
//   //   if (seminar?.meeting_id) {
//   //     navigator.clipboard.writeText(seminar.meeting_id);
//   //     toast({
//   //       title: "Copied",
//   //       description: "Meeting ID copied to clipboard",
//   //     });
//   //   }
//   // };

//   // const handleJoinMeeting = () => {

//   //   if (!seminar?.meeting_id) {
//   //     toast({
//   //       title: "No Meeting",
//   //       description: "Meeting not available yet",
//   //       variant: "destructive",
//   //     });
//   //     return;
//   //   }

//   //   if (!isHost && !isRegistered) {
//   //     toast({
//   //       title: "Registration Required",
//   //       description: "You must register for the seminar before joining",
//   //       variant: "destructive",
//   //     });
//   //     return;
//   //   }

//   //   setShowMeeting(true);
//   // };

//   // const handleJoinMeeting = async () => {
//   //   if (!seminarId || !isHost) return;

//   //   try {
//   //     setCreatingMeeting(true);
//   //     const newMeetingId = uuidv4();
//   //     console.log("🔍 seminarId to update:", seminarId);

//   //     const { data, error } = await supabase
//   //       .from("seminars")
//   //       .update({ is_host_joined: true, meeting_id: newMeetingId } as Seminar)
//   //       .eq("id", seminarId)
//   //       .select()
//   //       .single();

//   //     console.log("✅ is_host_joined after update:", data?.is_host_joined);
//   //     console.log("Supabase Error (if any):", error);
//   //     if (error) throw error;

//   //     setSeminar((prev) =>
//   //       prev
//   //         ? { ...prev, is_host_joined: true, meeting_id: newMeetingId }
//   //         : null
//   //     );
//   //   } catch (error) {
//   //     console.error("Error creating meeting:", error);
//   //     toast({
//   //       title: "Error",
//   //       description: "Failed to create meeting",
//   //       variant: "destructive",
//   //     });
//   //     return; // Stop here if creation fails
//   //   } finally {
//   //     setCreatingMeeting(false);
//   //   }

//   //   if (!seminar?.meeting_id) {
//   //     toast({
//   //       title: "No Meeting",
//   //       description: "Meeting not available yet",
//   //       variant: "destructive",
//   //     });
//   //     return;
//   //   }

//   //   if (!isHost && !isRegistered) {
//   //     toast({
//   //       title: "Registration Required",
//   //       description: "You must register for the seminar before joining",
//   //       variant: "destructive",
//   //     });
//   //     return;
//   //   }

//   //   setShowMeeting(true);
//   // };

//   const handleJoinMeeting = async () => {
//     // For participants
//     if (!isHost) {
//       if (!seminar?.meeting_id) {
//         toast({
//           title: "No Meeting",
//           description: "Meeting not available yet",
//           variant: "destructive",
//         });
//         return;
//       }

//       if (!isRegistered) {
//         toast({
//           title: "Registration Required",
//           description: "You must register for the seminar before joining",
//           variant: "destructive",
//         });
//         return;
//       }

//       // Join existing meeting
//       setShowMeeting(true);
//       return;
//     }

//     // For hosts
//     try {
//       setCreatingMeeting(true);
//       const newMeetingId = uuidv4();

//       // Create new meeting if needed
//       const { data, error } = await supabase
//         .from("seminars")
//         .update({
//           is_host_joined: true,
//           meeting_id: seminar?.meeting_id || newMeetingId,
//         } as Seminar)
//         .eq("id", seminarId)
//         .select()
//         .single();

//       console.log("✅ is_host_joined after update:", data?.is_host_joined);
//       console.log("Supabase Error (if any):", error);

//       if (error) throw error;

//       // Update local state
//       setSeminar((prev) =>
//         prev
//           ? {
//               ...prev,
//               is_host_joined: true,
//               meeting_id: prev.meeting_id || newMeetingId,
//             }
//           : null
//       );

//       // Join the meeting
//       setShowMeeting(true);
//     } catch (error) {
//       console.error("Error creating meeting:", error);
//       toast({
//         title: "Error",
//         description: "Failed to start meeting",
//         variant: "destructive",
//       });
//     } finally {
//       setCreatingMeeting(false);
//     }
//   };

//   const handleLeaveMeeting = () => {
//     setShowMeeting(false);
//   };

//   const handleRegister = async () => {
//     if (!user || !seminarId) return;

//     try {
//       setRegistering(true);
//       const { data, error } = await supabase
//         .from("seminar_registrations")
//         .insert({
//           seminar_id: seminarId,
//           user_id: user.id,
//         })
//         .select()
//         .single();

//       if (error) throw error;
//       setIsRegistered(true);
//       setRegistrationId(data.id);
//       toast({
//         title: "Registered",
//         description: "You are now registered for this seminar",
//       });
//     } catch (error) {
//       console.error("Registration Error:", error);
//       toast({
//         title: "Registration Failed",
//         variant: "destructive",
//       });
//     } finally {
//       setRegistering(false);
//     }
//   };

//   const handleCancelRegistration = async () => {
//     if (!registrationId) return;

//     try {
//       setCanceling(true);
//       const { error } = await supabase
//         .from("seminar_registrations")
//         .delete()
//         .eq("id", registrationId);

//       if (error) throw error;
//       setIsRegistered(false);
//       setRegistrationId(null);
//       toast({
//         title: "Registration Cancelled",
//       });
//     } catch (error) {
//       console.error("Cancellation Error:", error);
//       toast({
//         title: "Cancellation Failed",
//         variant: "destructive",
//       });
//     } finally {
//       setCanceling(false);
//     }
//   };

//   const formatDate = (dateString: string) => {
//     return new Date(dateString).toLocaleDateString("en-US", {
//       weekday: "long",
//       year: "numeric",
//       month: "long",
//       day: "numeric",
//     });
//   };

//   const formatTime = (timeString: string) => {
//     return new Date(`1970-01-01T${timeString}`).toLocaleTimeString([], {
//       hour: "2-digit",
//       minute: "2-digit",
//     });
//   };

//   if (showMeeting && seminar?.meeting_id) {
//     return (
//       <div>
//         <header className="bg-black/30 backdrop-blur-md border-b border-white/20 sticky top-0 z-50 shadow-xl">
//           <div className="container mx-auto px-4 py-4">
//             <div className="flex items-center justify-between">
//               {/* Left Section - Logo, Back Button, and Seminar Status */}
//               <div className="flex items-center space-x-2 md:space-x-4">
//                 <Button
//                   variant="outline"
//                   onClick={handleBackNavigation}
//                   className="text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm p-2 md:px-4 md:py-2"
//                   title="Go back"
//                 >
//                   <ArrowLeft className="h-4 w-4 md:mr-2" />
//                   <span className="hidden md:inline">Back</span>
//                 </Button>

//                 {/* <Link to="/" className="flex items-center space-x-2">
//                   <Shield className="h-6 w-6 md:h-8 md:w-8 text-blue-400" />
//                   <h1 className="text-xl md:text-2xl font-bold text-white">
//                     MedPortal
//                   </h1>
//                 </Link> */}
//                 <div className="flex items-center space-x-2">
//                   <Link to="/">
//                     <img src={logo} alt="Logo" className="h-10 w-100 mr-2" />
//                   </Link>
//                 </div>

//                 {seminar.meeting_id && (
//                   <div className="flex items-center space-x-2 ml-2 md:ml-4">
//                     <span className="text-white text-xs md:text-sm bg-white/10 px-2 py-1 md:px-3 md:py-1 rounded-full">
//                       {isHost ? "Hosting" : "Joined"}
//                     </span>
//                   </div>
//                 )}
//               </div>

//               {/* Right Section - Navigation Items */}
//               <div className="flex items-center space-x-2 md:space-x-4">
//                 {user ? (
//                   <>
//                     {/* Desktop View - Full User Info */}
//                     <div className="hidden lg:flex items-center space-x-4">
//                       <span className="text-white text-sm bg-white/10 px-3 py-1 rounded-full">
//                         Welcome, {user.email}
//                       </span>
//                       <Button
//                         variant="outline"
//                         className="text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm p-2 md:px-4 md:py-2"
//                         onClick={onNavigateProfile}
//                         title="Profile"
//                       >
//                         <User className="h-4 w-4 md:mr-2" />
//                         <span className="hidden md:inline">Profile</span>
//                       </Button>
//                     </div>

//                     {/* Mobile/Tablet View - User Menu Dropdown */}
//                     <div className="lg:hidden">
//                       <DropdownMenu>
//                         <DropdownMenuTrigger asChild>
//                           <Button
//                             variant="outline"
//                             size="icon"
//                             className="text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm"
//                           >
//                             <User className="h-4 w-4" />
//                           </Button>
//                         </DropdownMenuTrigger>
//                         <DropdownMenuContent className="w-56 bg-black/80 backdrop-blur-md border-white/20">
//                           <DropdownMenuLabel className="text-white">
//                             {user.email}
//                           </DropdownMenuLabel>
//                           <DropdownMenuSeparator className="bg-white/20" />
//                           <DropdownMenuItem
//                             className="text-white hover:bg-white/10"
//                             onClick={onNavigateProfile}
//                           >
//                             <User className="mr-2 h-4 w-4" />
//                             <span>Profile</span>
//                           </DropdownMenuItem>
//                         </DropdownMenuContent>
//                       </DropdownMenu>
//                     </div>
//                   </>
//                 ) : (
//                   <>
//                     <Link to="/register">
//                       <Button
//                         variant="outline"
//                         className="hidden md:flex text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm"
//                       >
//                         Register
//                       </Button>
//                     </Link>

//                     <Link to="/">
//                       <Button className="bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl transition-all duration-200 p-2 md:px-4 md:py-2">
//                         <User className="h-4 w-4 md:mr-2" />
//                         <span className="hidden md:inline">Sign In</span>
//                       </Button>
//                     </Link>
//                   </>
//                 )}

//                 {/* Home Button - Icon only on mobile/tablet */}
//                 <Button
//                   variant="outline"
//                   onClick={onNavigateHome}
//                   className="text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm p-2 md:px-4 md:py-2"
//                   title="Go to home page"
//                 >
//                   <Home className="h-4 w-4 md:mr-2" />
//                   <span className="hidden md:inline">Home</span>
//                 </Button>
//               </div>
//             </div>
//           </div>
//         </header>

//         <VideoMeeting
//           isHost={isHost}
//           apiKey="8c81aa57-9868-417a-91c2-85006735bb62"
//           meetingId={seminar.meeting_id}
//           name={user?.email || "Participant"}
//           onMeetingLeave={handleLeaveMeeting}
//           micEnabled={false}
//           webcamEnabled={false}
//           containerId="video-container"
//           style={{ marginTop: "70px" }}
//         />
//       </div>
//     );
//   }

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <Loader2 className="h-8 w-8 animate-spin" />
//       </div>
//     );
//   }

//   if (!seminar) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <p>Seminar not found</p>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <header className="bg-black/30 backdrop-blur-md border-b border-white/20 sticky top-0 z-50 shadow-xl">
//         <div className="container mx-auto px-4 py-4">
//           <div className="flex items-center justify-between">
//             {/* Left Section - Logo, Back Button, and Seminar Status */}
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

//               {/* <Link to="/" className="flex items-center space-x-2">
//                 <Shield className="h-6 w-6 md:h-8 md:w-8 text-blue-400" />
//                 <h1 className="text-xl md:text-2xl font-bold text-white">
//                   MedPortal
//                 </h1>
//               </Link> */}
//               <div className="flex items-center space-x-2">
//                 <Link to="/">
//                   <img src={logo} alt="Logo" className="h-10 w-100 mr-2" />
//                 </Link>
//               </div>

//               {seminar.meeting_id && (
//                 <div className="flex items-center space-x-2 ml-2 md:ml-4">
//                   <span className="text-white text-xs md:text-sm bg-white/10 px-2 py-1 md:px-3 md:py-1 rounded-full">
//                     {isHost ? "Hosting" : "Joined"}
//                   </span>
//                 </div>
//               )}
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
//                       onClick={onNavigateProfile}
//                       title="Profile"
//                     >
//                       <User className="h-4 w-4 md:mr-2" />
//                       <span className="hidden md:inline">Profile</span>
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
//                           <User className="h-4 w-4" />
//                         </Button>
//                       </DropdownMenuTrigger>
//                       <DropdownMenuContent className="w-56 bg-black/80 backdrop-blur-md border-white/20">
//                         <DropdownMenuLabel className="text-white">
//                           {user.email}
//                         </DropdownMenuLabel>
//                         <DropdownMenuSeparator className="bg-white/20" />
//                         <DropdownMenuItem
//                           className="text-white hover:bg-white/10"
//                           onClick={onNavigateProfile}
//                         >
//                           <User className="mr-2 h-4 w-4" />
//                           <span>Profile</span>
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
//                     <Button className="bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl transition-all duration-200 p-2 md:px-4 md:py-2">
//                       <User className="h-4 w-4 md:mr-2" />
//                       <span className="hidden md:inline">Sign In</span>
//                     </Button>
//                   </Link>
//                 </>
//               )}

//               {/* Home Button - Icon only on mobile/tablet */}
//               <Button
//                 variant="outline"
//                 onClick={onNavigateHome}
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

//       <div className="container mx-auto px-4 py-8 max-w-4xl">
//         {timeLeft && (
//           <div className="bg-blue-600 text-white py-3 px-4 rounded-lg mb-6 flex items-center">
//             <Clock className="h-5 w-5 mr-2" />
//             <span className="font-semibold">Time left: {timeLeft}</span>
//           </div>
//         )}
//         <Card className="mb-8">
//           <CardHeader>
//             <div className="flex justify-between items-start">
//               <div>
//                 <CardTitle className="text-2xl mb-2">{seminar.topic}</CardTitle>
//                 <p className="text-gray-600">{seminar.description}</p>
//               </div>
//               {isRegistered && (
//                 <Badge variant="default" className="bg-green-500">
//                   <CheckCircle className="h-4 w-4 mr-1" />
//                   Registered
//                 </Badge>
//               )}
//             </div>
//           </CardHeader>
//           <CardContent className="space-y-6">
//             <div className="grid md:grid-cols-2 gap-6">
//               <div className="space-y-4">
//                 <div className="flex items-center gap-3">
//                   <User className="h-5 w-5 text-blue-600" />
//                   <div>
//                     <p className="font-medium">Host</p>
//                     <p className="text-gray-600">{seminar.host_name}</p>
//                   </div>
//                 </div>

//                 <div className="flex items-center gap-3">
//                   <CalendarDays className="h-5 w-5 text-blue-600" />
//                   <div>
//                     <p className="font-medium">Date</p>
//                     <p className="text-gray-600">{formatDate(seminar.date)}</p>
//                   </div>
//                 </div>

//                 <div className="flex items-center gap-3">
//                   <Clock className="h-5 w-5 text-blue-600" />
//                   <div>
//                     <p className="font-medium">Time</p>
//                     <p className="text-gray-600">{formatTime(seminar.time)}</p>
//                   </div>
//                 </div>
//               </div>

//               <div className="space-y-4">
//                 <div className="flex items-center gap-3">
//                   <Users className="h-5 w-5 text-blue-600" />
//                   <div>
//                     <p className="font-medium">Speakers</p>
//                     <p className="text-gray-600">
//                       {speakers.length} speaker(s)
//                     </p>
//                   </div>
//                 </div>
//                 <div className="flex items-center gap-3">
//                   <Globe className="h-5 w-5 text-blue-600" />
//                   <div>
//                     <p className="font-medium">Host Country</p>
//                     <p className="text-gray-600">{seminar.host_country}</p>
//                   </div>
//                 </div>
//                 {/* <div className="flex items-center gap-3">
//                   <Clock className="h-5 w-5 text-blue-600" />
//                   <div>
//                     <p className="font-medium">Time Zone</p>
//                     <div className="text-gray-600">
//                       <p>
//                         Host: {hostTime} ({seminar.host_timezone})
//                       </p>
//                       <p>Your Local: {localTime}</p>
//                     </div>
//                   </div>
//                 </div> */}
//               </div>
//             </div>

//             {!isHost && (
//               <div className="flex justify-center pt-4">
//                 <Button
//                   onClick={
//                     isRegistered ? handleCancelRegistration : handleRegister
//                   }
//                   disabled={registering || canceling}
//                   className="bg-blue-600 hover:bg-blue-700 px-8 py-3 text-lg"
//                 >
//                   {registering
//                     ? "Registering..."
//                     : canceling
//                     ? "Cancelling..."
//                     : isRegistered
//                     ? "Cancel Registration"
//                     : "Register for Seminar"}
//                 </Button>
//               </div>
//             )}
//           </CardContent>
//         </Card>
//         <Card>
//           <CardHeader>
//             <CardTitle>Speakers</CardTitle>
//             <p className="text-gray-600">
//               Meet the experts who will be presenting at this seminar
//             </p>
//           </CardHeader>
//           <CardContent>
//             {speakers.length === 0 ? (
//               <p className="text-gray-600 text-center py-8">
//                 No speakers added yet.
//               </p>
//             ) : (
//               <div className="grid md:grid-cols-2 gap-6">
//                 {speakers.map((speaker) => (
//                   <Card key={speaker.id}>
//                     <CardContent className="p-4">
//                       <h3 className="font-semibold text-lg mb-2">
//                         {speaker.name}
//                       </h3>
//                       <div className="space-y-1">
//                         <p className="text-sm text-gray-600">
//                           <span className="font-medium">Qualification:</span>{" "}
//                           {speaker.qualification}
//                         </p>
//                         <p className="text-sm text-gray-600">
//                           <span className="font-medium">Department:</span>{" "}
//                           {speaker.department}
//                         </p>
//                       </div>
//                     </CardContent>
//                   </Card>
//                 ))}
//               </div>
//             )}
//           </CardContent>
//         </Card>
//         <Card className="mt-8">
//           <CardHeader>
//             <CardTitle>Live Meeting</CardTitle>
//             <p className="text-gray-600">Join the live seminar session</p>
//           </CardHeader>
//           <CardContent>
//             <div className="space-y-4">
//               {(seminar.meeting_id || isHost) && (
//                 <div className="text-center py-4 space-y-4">
//                   {!isHost &&
//                     (!seminar?.is_host_joined ? (
//                       <p className="text-sm text-gray-600">
//                         <h5>The Host is not available.</h5>
//                       </p>
//                     ) : (
//                       <p className="text-sm text-green-600">
//                         <h5>The Host is available.</h5>
//                       </p>
//                     ))}
//                   {/* {isSeminarPast ? (
//                     <p className="text-sm text-gray-600">
//                       The seminar is currently in progress
//                     </p>
//                   ) : (
//                     <p className="text-sm text-gray-600">
//                       The seminar will start in {timeLeft}
//                     </p>
//                   )} */}
//                   <div className="flex justify-center items-center gap-2">
//                     {/* <Button
//                       onClick={handleJoinMeeting}
//                       disabled={creatingMeeting}
//                       className="bg-blue-600 hover:bg-blue-700 px-8 py-3 text-lg"
//                     >
//                       {creatingMeeting ? (
//                         <>
//                           <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                           {isHost ? "Starting..." : "Joining..."}
//                         </>
//                       ) : isHost ? (
//                         seminar?.meeting_id ? (
//                           "Rejoin Meeting"
//                         ) : (
//                           "Start Meeting"
//                         )
//                       ) : (
//                         "Join Meeting"
//                       )}
//                     </Button> */}
//                     {/* <Button
//                       onClick={handleJoinMeeting}
//                       className="bg-blue-600 hover:bg-blue-700 px-8 py-3 text-lg"
//                     >
//                       {isHost ? " Start Meeting" : "Join Meeting"}
//                     </Button> */}
//                     {/* {!isHost &&
//                       (!seminar?.is_host_joined ? (
//                         <p className="text-sm text-gray-600">
//                           <h5>The Host is not available.</h5>
//                         </p>
//                       ) : (
//                         <p className="text-sm text-green-600">
//                           <h5>The Host is available.</h5>
//                         </p>
//                       ))} */}

//                     {(isHost || seminar?.meeting_id) && (
//                       <Button
//                         onClick={handleJoinMeeting}
//                         disabled={creatingMeeting}
//                         className="bg-blue-600 hover:bg-blue-700 px-8 py-3 text-lg"
//                       >
//                         {creatingMeeting ? (
//                           <>
//                             <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                             {isHost ? "Starting..." : "Joining..."}
//                           </>
//                         ) : isHost ? (
//                           "Start Meeting"
//                         ) : (
//                           "Join Meeting"
//                         )}
//                       </Button>
//                     )}
//                   </div>

//                   {!isHost && seminar?.is_host_joined && !isRegistered && (
//                     <p className="text-sm text-gray-600">
//                       You must register for the seminar before joining the
//                       meeting
//                     </p>
//                   )}
//                   {/* {!isRegistered && !isHost && (
//                     <p className="text-sm text-gray-600">
//                       You must register for the seminar before joining the
//                       meeting
//                     </p>
//                   )} */}
//                 </div>
//               )}
//             </div>
//           </CardContent>

//           {/* <CardContent>
//             <div className="space-y-4">
//               {seminar.meeting_id ? (
//                 <div className="text-center py-4 space-y-4">
//                   <div className="flex justify-center items-center gap-2">
//                     <Button
//                       onClick={handleJoinMeeting}
//                       className="bg-blue-600 hover:bg-blue-700 px-8 py-3 text-lg"
//                     >
//                       {isHost ? " Start Meeting" : "Join Meeting"}
//                     </Button>
//                   </div>
//                   {!isRegistered && !isHost && (
//                     <p className="text-sm text-gray-600">
//                       You must register for the seminar before joining the
//                       meeting
//                     </p>
//                   )}
//                 </div>
//               ) : null
//               //  (
//                 // <div className="text-center py-8">
//                 //   {isHost ? (
//                 //     <Button
//                 //       onClick={createMeeting}
//                 //       disabled={creatingMeeting}
//                 //       className="bg-blue-600 hover:bg-blue-700 px-8 py-3 text-lg"
//                 //     >
//                 //       {creatingMeeting ? (
//                 //         <>
//                 //           <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                 //           Creating Meeting...
//                 //         </>
//                 //       ) : (
//                 //         <>
//                 //           <Video className="mr-2 h-4 w-4" />
//                 //           Create New Meeting
//                 //         </>
//                 //       )}
//                 //     </Button>
//                 //   ) : (
//                 //     <div className="space-y-2">
//                 //       <p className="text-gray-600">
//                 //         The host hasn't started the meeting yet.
//                 //       </p>
//                 //       <p className="text-sm text-gray-500">
//                 //         Please check back later or contact the organizer.
//                 //       </p>
//                 //     </div>
//                 //   )}
//                 // </div>
//               // )
//               }
//             </div>
//           </CardContent> */}
//         </Card>
//         {/* <Card className="mt-8">
//           <CardHeader>
//             <CardTitle>Live Meeting</CardTitle>
//             <p className="text-gray-600">Join the live seminar session</p>
//           </CardHeader>
//           <CardContent>
//             <div className="space-y-4">
//               {seminar.meeting_id ? (
//                 <div className="text-center py-4 space-y-4">
//                   <div className="flex justify-center items-center gap-2">
//                     <Button
//                       onClick={handleJoinMeeting}
//                       className="bg-blue-600 hover:bg-blue-700 px-8 py-3 text-lg"
//                     >
//                       {isHost && seminar.is_host_joined
//                         ? "Rejoin Meeting"
//                         : isHost
//                         ? "Host Meeting"
//                         : "Join Meeting"}
//                     </Button>
//                   </div>
//                   {!isRegistered && !isHost && (
//                     <p className="text-sm text-gray-600">
//                       You must register for the seminar before joining the
//                       meeting
//                     </p>
//                   )}
//                 </div>
//               ) : (
//                 <div className="text-center py-8">
//                   {isHost ? (
//                     <Button
//                       onClick={createMeeting}
//                       disabled={creatingMeeting}
//                       className="bg-blue-600 hover:bg-blue-700 px-8 py-3 text-lg"
//                     >
//                       {creatingMeeting ? (
//                         <>
//                           <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                           Creating Meeting...
//                         </>
//                       ) : (
//                         <>
//                           <Video className="mr-2 h-4 w-4" />
//                           Create & Start Meeting
//                         </>
//                       )}
//                     </Button>
//                   ) : (
//                     <div className="space-y-2">
//                       <p className="text-gray-600">
//                         The host hasn't started the meeting yet.
//                       </p>
//                       <p className="text-sm text-gray-500">
//                         Please check back later or contact the organizer.
//                       </p>
//                     </div>
//                   )}
//                 </div>
//               )}
//             </div>
//           </CardContent>
//         </Card> */}
//       </div>
//       <Footer />
//     </div>
//   );
// };

// export default SeminarDetails;


import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  User,
  Clock,
  CalendarDays,
  Users,
  CheckCircle,
  Home,
  Shield,
  Copy,
  Loader2,
  Video,
  Globe,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import type { User as AuthUser } from "@supabase/supabase-js";
import VideoMeeting from "../../components/VideoMeeting";
import { v4 as uuidv4 } from "uuid";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import logo from "@/image/thefuturemed_logo (1).jpg";
import Footer from "@/footer/Footer";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import Header from "@/footer/Header1";
import { mixpanelInstance } from "@/utils/mixpanel";


interface Seminar {
  id: string;
  host_name: string;
  topic: string;
  description: string;
  date: string;
  time: string;
  host_id: string;
  meeting_id?: string | null;
  host_country?: string | null;
  is_host_joined: boolean;
}

interface Speaker {
  id: string;
  name: string;
  qualification: string;
  department: string;
}



const SeminarDetails = () => {
  const { seminarId } = useParams();
  const navigate = useNavigate();
  const [seminar, setSeminar] = useState<Seminar | null>(null);
  const [speakers, setSpeakers] = useState<Speaker[]>([]);
  const [loading, setLoading] = useState(true);
  const [registering, setRegistering] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [user, setUser] = useState<AuthUser | null>(null);
  const { toast } = useToast();
  const [canceling, setCanceling] = useState(false);
  const [registrationId, setRegistrationId] = useState<string | null>(null);
  const [showMeeting, setShowMeeting] = useState(false);
  const [creatingMeeting, setCreatingMeeting] = useState(false);
  const isHost = user?.id === seminar?.host_id;
  const [timeLeft, setTimeLeft] = useState<string | null>(null);
  // const [localTime, setLocalTime] = useState<string>("");
  // const [hostTime, setHostTime] = useState<string>("");
  // const [isSeminarPast, setIsSeminarPast] = useState(false);
 const [seminarStartTime, setSeminarStartTime] = useState<Date | null>(null);
const [isJoinButtonDisabled, setIsJoinButtonDisabled] = useState(true);

 // NEW: State for current time in host's timezone
 const [hostCurrentTime, setHostCurrentTime] = useState<Date | null>(null);
  // NEW: State for current IST time
  const [currentISTTime, setCurrentISTTime] = useState("");
 const [userProfile, setUserProfile] = useState<any>(null);
 const supabaseAnonKey = import.meta.env.VITE_VIDEOSDK_TOKEN;

 const [meetingOptions, setMeetingOptions] = useState({
   disableParticipantMic: false,
   disableParticipantVideo: false,
 });
  const handleBackNavigation = () => {
    navigate(-1);
  };

  const onNavigateProfile = () => {
    navigate("/profile");
  };

  const onNavigateHome = () => {
    navigate("/");
  };

  // // Calculate time left and format times
  // useEffect(() => {
  //   if (!seminar) return;

  //   // Calculate time left
  //   const calculateTimeLeft = () => {
  //     const now = new Date();
  //     const seminarStart = new Date(seminar.time);
  //     const diffMs = seminarStart.getTime() - now.getTime();

  //     if (diffMs <= 0) {
  //       setIsSeminarPast(true);
  //       return "Seminar has started";
  //     }

  //     const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  //     const hours = Math.floor(
  //       (diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  //     );
  //     const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
  //     const seconds = Math.floor((diffMs % (1000 * 60)) / 1000);

  //     return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  //   };

  //   // Format time for display
  //   const formatTime = (date: Date, timeZone: string) => {
  //     return date.toLocaleTimeString([], {
  //       hour: "2-digit",
  //       minute: "2-digit",
  //       timeZone: timeZone,
  //     });
  //   };

  //   // Update times immediately
  //   const seminarStart = new Date(seminar.time);
  //   setHostTime(formatTime(seminarStart, seminar.time));
  //   setLocalTime(
  //     formatTime(seminarStart, Intl.DateTimeFormat().resolvedOptions().timeZone)
  //   );
  //   setTimeLeft(calculateTimeLeft());

  //   // Update countdown every second
  //   const timer = setInterval(() => {
  //     setTimeLeft(calculateTimeLeft());
  //   }, 1000);

  //   return () => clearInterval(timer);
  // }, [seminar]);

  // // NEW: Update current IST time
  // useEffect(() => {
  //   // const updateISTTime = () => {
  //   //   const now = new Date();
  //   //   const istTime = now.toLocaleTimeString("en-US", {
  //   //     timeZone: "Asia/Kolkata",
  //   //     hour: "2-digit",
  //   //     minute: "2-digit",
  //   //     second: "2-digit",
  //   //     hour12: true,
  //   //   });
  //   //   setCurrentISTTime(`Current IST Time: ${istTime}`);
  //   // };
  //   const updateISTTime = () => {
  //     const now = new Date();

  //     // Convert to IST
  //     const ist = new Date(
  //       now.toLocaleString("en-US", { timeZone: "Asia/Kolkata" })
  //     );

  //     // Extract IST components
  //     const days = ist.getDate(); // or calculate remaining days if part of countdown
  //     const hours = ist.getHours();
  //     const minutes = ist.getMinutes();
  //     const seconds = ist.getSeconds();

  //     // Format time string with d, h, m, s labels
  //     const formattedTime = `${days}d ${hours}h ${minutes}m ${seconds}s`;

  //     // Or display as clock time
  //     const istTime = ist.toLocaleTimeString("en-US", {
  //       hour: "2-digit",
  //       minute: "2-digit",
  //       second: "2-digit",
  //       hour12: true,
  //     });

  //     console.log(formattedTime)
  //     console.log(istTime)

  //     setCurrentISTTime(`IST Time Left: ${formattedTime} (${istTime})`);
  //   };


  //   updateISTTime();
  //   const timer = setInterval(updateISTTime, 1000);

  //   return () => clearInterval(timer);
  // }, []);

  // useEffect(() => {
  //   if (!seminar) {
  //     console.log("Seminar data not available yet.");
  //     return;
  //   }

  //   // Step 1: Parse seminar date and time
  //   const seminarDateTime = new Date(`${seminar.date}T${seminar.time}`);
  //   console.log("Parsed Seminar DateTime (local):", seminarDateTime);

  //   setSeminarStartTime(seminarDateTime);

  //   // Step 2: Start interval for countdown
  //   const timer = setInterval(() => {
  //     const now = new Date();
  //     console.log("Current Local Time:", now);

  //     setHostCurrentTime(now);

  //     // Step 3: Calculate difference
  //     if (seminarDateTime) {
  //       const diffMs = seminarDateTime.getTime() - now.getTime();
  //       console.log("Time difference in ms:", diffMs);

  //       if (diffMs <= 0) {
  //         console.log("Seminar has already started.");
  //         // setIsSeminarPast(true);
  //         setTimeLeft("Seminar has started");
  //         return;
  //       }

  //       const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  //       const hours = Math.floor(
  //         (diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  //       );
  //       const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
  //       const seconds = Math.floor((diffMs % (1000 * 60)) / 1000);

  //       console.log(`Time left => ${days}d ${hours}h ${minutes}m ${seconds}s`);

  //       setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
  //     }
  //   }, 1000);

  //   console.log("gggggggggg")

  //   return () => {
  //     console.log("Clearing countdown interval");
  //     clearInterval(timer);
  //   };
  // }, [seminar]);

useEffect(() => {
  if (!seminar) {
    console.log("Seminar data not available yet.");
    return;
  }

  const seminarDateTime = new Date(`${seminar.date}T${seminar.time}`);
  console.log("Parsed Seminar DateTime (local):", seminarDateTime);
  setSeminarStartTime(seminarDateTime);

  const timer = setInterval(() => {
    const now = new Date();
    console.log("Current Local Time:", now);
    setHostCurrentTime(now);

    const diffMs = seminarDateTime.getTime() - now.getTime();
    console.log("Time difference in ms:", diffMs);

    if (diffMs <= 0) {
      console.log("Seminar has already started.");
      setTimeLeft("Seminar has started");

      // ✅ Enable the join button once time has passed
      setIsJoinButtonDisabled(false);
      return;
    } else {
      setIsJoinButtonDisabled(true);
    }

    const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diffMs % (1000 * 60)) / 1000);

    setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
  }, 1000);

  return () => {
    console.log("Clearing countdown interval");
    clearInterval(timer);
  };
}, [seminar]);

  const getDisplayName = () => {
    if (userProfile?.first_name && userProfile?.last_name) {
      return `${userProfile.first_name} ${userProfile.last_name}`;
    } else if (user?.email) {
      return user.email;
    } else {
      return "Participant";
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get user session
        const {
          data: { session },
        } = await supabase.auth.getSession();
        setUser(session?.user || null);

        // Fetch seminar details
        const { data: seminarData, error: seminarError } = await supabase
          .from("seminars")
          .select("*")
          .eq("id", seminarId)
          .single();
        console.log("✅ Host Joined Status:", seminarData.is_host_joined);
        if (seminarError) throw seminarError;
        setSeminar(seminarData);

        // Fetch speakers
        const { data: speakersData, error: speakersError } = await supabase
          .from("speakers")
          .select("*")
          .eq("seminar_id", seminarId);

        if (speakersError) throw speakersError;
        setSpeakers(speakersData || []);

        // Check registration if user is logged in
        if (session?.user) {
          await checkRegistrationStatus(session.user.id);
        }

         if (session?.user) {
           const { data: profileData, error: profileError } = await supabase
             .from("profiles")
             .select("*")
             .eq("id", session.user.id)
             .single();

           if (!profileError && profileData) {
             setUserProfile(profileData);
           }
         }
      } catch (error) {
        console.error("Error fetching data:", error);
        toast({
          title: "Error",
          description: "Failed to load seminar details",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [seminarId, toast]);

  const checkRegistrationStatus = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from("seminar_registrations")
        .select("id")
        .eq("seminar_id", seminarId)
        .eq("user_id", userId)
        .maybeSingle();

      if (error) throw error;
      setIsRegistered(!!data);
      if (data) setRegistrationId(data.id);
    } catch (error) {
      console.error("Error checking registration:", error);
    }
  };

  const handleJoinMeeting = async () => {
    // For participants
    if (!isHost) {
      if (!seminar?.meeting_id) {
        toast({
          title: "No Meeting",
          description: "Meeting not available yet",
          variant: "destructive",
        });
        return;
      }

      if (!isRegistered) {
        toast({
          title: "Registration Required",
          description: "You must register for the seminar before joining",
          variant: "destructive",
        });
        return;
      }
      // NEW: Check if seminar has started
      if (seminarStartTime && seminarStartTime > new Date()) {
        toast({
          title: "Meeting Not Started",
          description: "Seminar has not started yet",
          variant: "destructive",
        });
        // setShowMeeting(true);
        return;
      }

      // Join existing meeting
      setShowMeeting(true);
      return;
    }

    // For hosts
    try {
      setCreatingMeeting(true);
      const newMeetingId = uuidv4();

      // Create new meeting if needed
      const { data, error } = await supabase
        .from("seminars")
        .update({
          is_host_joined: true,
          meeting_id: newMeetingId,
        } as Seminar)
        .eq("id", seminarId)
        .select()
        .single();

      console.log("✅ is_host_joined after update:", data?.is_host_joined);
      console.log("Supabase Error (if any):", error);

      if (error) throw error;

      // Update local state
      setSeminar((prev) =>
        prev
          ? {
              ...prev,
              meeting_id: newMeetingId,
            }
          : null
      );

      // Join the meeting
      setShowMeeting(true);
    } catch (error) {
      console.error("Error creating meeting:", error);
      toast({
        title: "Error",
        description: "Failed to start meeting",
        variant: "destructive",
      });
    } finally {
      setCreatingMeeting(false);
    }
  };

  const handleLeaveMeeting = () => {
    console.log("kkkkkkkk",setShowMeeting(false))
    setShowMeeting(false);
  };

  // const handleRegister = async () => {
  //   if (!user || !seminarId) return;

  //   try {
  //     setRegistering(true);
  //     const { data, error } = await supabase
  //       .from("seminar_registrations")
  //       .insert({
  //         seminar_id: seminarId,
  //         user_id: user.id,
  //       })
  //       .select()
  //       .single();

  //     if (error) throw error;
  //     setIsRegistered(true);
  //     setRegistrationId(data.id);
  //     toast({
  //       title: "Registered",
  //       description: "You are now registered for this seminar",
  //     });
  //   } catch (error) {
  //     console.error("Registration Error:", error);
  //     toast({
  //       title: "Registration Failed",
  //       variant: "destructive",
  //     });
  //   } finally {
  //     setRegistering(false);
  //   }
  // };
const handleRegister = async () => {
  if (!user || !seminarId || !seminar) return;

  try {
    setRegistering(true);

    // First, register the user for the seminar
    const { data, error } = await supabase
      .from("seminar_registrations")
      .insert({
        seminar_id: seminarId,
        user_id: user.id,
      })
      .select()
      .single();

    if (error) throw error;

    setIsRegistered(true);
    setRegistrationId(data.id);

    // Send confirmation email
    const emailResponse = await fetch(
      `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-email`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${supabaseAnonKey}`,
        },
        body: JSON.stringify({
          email: user.email,
          subject: `Seminar Registration Confirmation: ${seminar.topic}`,
          message: `Dear Participant,<br><br>
You have successfully registered for the following seminar:<br><br>
<strong>Topic:</strong> ${seminar.topic}<br>
<strong>Date:</strong> ${formatDate(seminar.date)}<br>
<strong>Time:</strong> ${formatTime(seminar.time)}<br>
<strong>Host:</strong> ${seminar.host_name}<br><br>

<strong>Preparation Checklist:</strong><br>
- Please join 15 minutes early to set up<br>
- Test your audio/video equipment beforehand<br>
- Review the seminar description:<br>
${seminar.description}<br><br>

Looking forward to seeing you at the seminar!<br><br>

Best regards,<br>
The Seminar Team`,
        }),
      }
    );

    if (!emailResponse.ok) {
      throw new Error("Failed to send confirmation email");
    }

    toast({
      title: "Registered",
      description:
        "You are now registered for this seminar. A confirmation email has been sent.",
    });
  } catch (error) {
    console.error("Registration Error:", error);
    toast({
      title: "Registration Failed",
      description: error instanceof Error ? error.message : "An error occurred",
      variant: "destructive",
    });
  } finally {
    setRegistering(false);
  }
};
  const handleCancelRegistration = async () => {
    if (!registrationId) return;

    try {
      setCanceling(true);
      const { error } = await supabase
        .from("seminar_registrations")
        .delete()
        .eq("id", registrationId);

      if (error) throw error;
      setIsRegistered(false);
      setRegistrationId(null);
      toast({
        title: "Registration Cancelled",
      });
    } catch (error) {
      console.error("Cancellation Error:", error);
      toast({
        title: "Cancellation Failed",
        variant: "destructive",
      });
    } finally {
      setCanceling(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatTime = (timeString: string) => {
    return new Date(`1970-01-01T${timeString}`).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (showMeeting && seminar?.meeting_id) {
    return (
      <div>
        {/* <header className="bg-black/30 backdrop-blur-md border-b border-white/20 sticky top-0 z-50 shadow-xl">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
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

                <Link to="/" className="flex items-center space-x-2">
                  <Shield className="h-6 w-6 md:h-8 md:w-8 text-blue-400" />
                  <h1 className="text-xl md:text-2xl font-bold text-white">
                    MedPortal
                  </h1>
                </Link>

                <div className="flex items-center space-x-2">
                  <Link to="/">
                    <img src={logo} alt="Logo" className="h-10 w-100 mr-2" />
                  </Link>
                </div>

                {seminar.meeting_id && (
                  <div className="flex items-center space-x-2 ml-2 md:ml-4">
                    <span className="text-white text-xs md:text-sm bg-white/10 px-2 py-1 md:px-3 md:py-1 rounded-full">
                      {isHost ? "Hosting" : "Joined"}
                    </span>
                  </div>
                )}
              </div>

              <div className="flex items-center space-x-2 md:space-x-4">
                {user ? (
                  <>
                    <div className="hidden lg:flex items-center space-x-4">
                      <span className="text-white text-sm bg-white/10 px-3 py-1 rounded-full">
                        Welcome, {user.email}
                      </span>
                      <Button
                        variant="outline"
                        className="text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm p-2 md:px-4 md:py-2"
                        onClick={onNavigateProfile}
                        title="Profile"
                      >
                        <User className="h-4 w-4 md:mr-2" />
                        <span className="hidden md:inline">Profile</span>
                      </Button>
                    </div>

                    <div className="lg:hidden">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="outline"
                            size="icon"
                            className="text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm"
                          >
                            <User className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56 bg-black/80 backdrop-blur-md border-white/20">
                          <DropdownMenuLabel className="text-white">
                            {user.email}
                          </DropdownMenuLabel>
                          <DropdownMenuSeparator className="bg-white/20" />
                          <DropdownMenuItem
                            className="text-white hover:bg-white/10"
                            onClick={onNavigateProfile}
                          >
                            <User className="mr-2 h-4 w-4" />
                            <span>Profile</span>
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
                      <Button className="bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl transition-all duration-200 p-2 md:px-4 md:py-2">
                        <User className="h-4 w-4 md:mr-2" />
                        <span className="hidden md:inline">Sign In</span>
                      </Button>
                    </Link>
                  </>
                )}

                <Button
                  variant="outline"
                  onClick={onNavigateHome}
                  className="text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm p-2 md:px-4 md:py-2"
                  title="Go to home page"
                >
                  <Home className="h-4 w-4 md:mr-2" />
                  <span className="hidden md:inline">Home</span>
                </Button>
              </div>
            </div>
          </div>
        </header> */}
        <Header/>

        <VideoMeeting
          isHost={isHost}
          apiKey={import.meta.env.VITE_VIDEOSDK_API_KEY}
          // apiKey="8c81aa57-9868-417a-91c2-85006735bb62"
          meetingId={seminar.meeting_id}
          // name={user?.email || "Participant"}
          // name={
          //   userProfile?.first_name && userProfile?.last_name
          //     ? `${userProfile.first_name} ${userProfile.last_name}`
          //     : user?.email || "Participant"
          // }
          name={getDisplayName()}
          onMeetingLeave={handleLeaveMeeting}
          micEnabled={!meetingOptions.disableParticipantMic}
          webcamEnabled={!meetingOptions.disableParticipantVideo}
          // micEnabled={false}
          // webcamEnabled={false}
          containerId="video-container"
          style={{ marginTop: "70px" }}
        />
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!seminar) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Seminar not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* NEW: Current IST time display */}

      {/* <header className="bg-black/30 backdrop-blur-md border-b border-white/20 sticky top-0 z-50 shadow-xl">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
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

              {seminar.meeting_id && (
                <div className="flex items-center space-x-2 ml-2 md:ml-4">
                  <span className="text-white text-xs md:text-sm bg-white/10 px-2 py-1 md:px-3 md:py-1 rounded-full">
                    {isHost ? "Hosting" : "Joined"}
                  </span>
                </div>
              )}
            </div>

            <div className="flex items-center space-x-2 md:space-x-4">
              {user ? (
                <>
                  <div className="hidden lg:flex items-center space-x-4">
                    <span className="text-white text-sm bg-white/10 px-3 py-1 rounded-full">
                      Welcome, {user.email}
                    </span>
                    <Button
                      variant="outline"
                      className="text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm p-2 md:px-4 md:py-2"
                      onClick={onNavigateProfile}
                      title="Profile"
                    >
                      <User className="h-4 w-4 md:mr-2" />
                      <span className="hidden md:inline">Profile</span>
                    </Button>
                  </div>

                  <div className="lg:hidden">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="outline"
                          size="icon"
                          className="text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm"
                        >
                          <User className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-56 bg-black/80 backdrop-blur-md border-white/20">
                        <DropdownMenuLabel className="text-white">
                          {user.email}
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator className="bg-white/20" />
                        <DropdownMenuItem
                          className="text-white hover:bg-white/10"
                          onClick={onNavigateProfile}
                        >
                          <User className="mr-2 h-4 w-4" />
                          <span>Profile</span>
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
                    <Button className="bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl transition-all duration-200 p-2 md:px-4 md:py-2">
                      <User className="h-4 w-4 md:mr-2" />
                      <span className="hidden md:inline">Sign In</span>
                    </Button>
                  </Link>
                </>
              )}

              <Button
                variant="outline"
                onClick={onNavigateHome}
                className="text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm p-2 md:px-4 md:py-2"
                title="Go to home page"
              >
                <Home className="h-4 w-4 md:mr-2" />
                <span className="hidden md:inline">Home</span>
              </Button>
            </div>
          </div>
        </div>
      </header> */}
      <Header seminar={seminar} />

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* UPDATED: Time left display */}
        {/* {timeLeft && (
          <div className="bg-blue-600 text-white py-3 px-4 rounded-lg mb-6 flex items-center">
            <Clock className="h-5 w-5 mr-2" />
            <div className="bg-blue-900 text-white text-center py-2 text-sm font-medium">
              {currentISTTime || "Loading current time..."}
            </div>
            <span className="font-semibold">Time left: {timeLeft}</span>
          </div>
        )} */}
        {/* {seminar.host_country === "India" && timeLeft ? (
          <div className="bg-blue-600 text-white py-3 px-4 rounded-lg mb-6 flex items-center">
            <Clock className="h-5 w-5 mr-2" />
            <span className="font-semibold">{currentISTTime} (India)</span>

            <span className="font-semibold">Time left: {timeLeft} (India)</span>
          </div>
        ) : (
          <div className="bg-gray-200 text-black py-3 px-4 rounded-lg mb-6 flex items-center">
            <Clock className="h-5 w-5 mr-2" />
            <span className="font-semibold">
              Your Country : {seminar.host_country} - Please check the time
              difference manually.
              Time left:{timeLeft} ({seminar.host_country})
            </span>
          </div>
        )} */}

        {/* {timeLeft && seminarStartTime && (
          <div className="bg-blue-600 text-white py-3 px-4 rounded-lg mb-6 flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center mb-2 md:mb-0">
              <Clock className="h-5 w-5 mr-2" />
              <span className="font-semibold">Time left: {timeLeft}</span>
            </div>

            <div className="flex items-center">
              <CalendarDays className="h-5 w-5 mr-2" />
              <span className="text-sm">
                Starts: {formatDate(seminar.date)} at {formatTime(seminar.time)}
                {seminar.host_country && ` (${seminar.host_country} Time)`}
              </span>
            </div>
          </div>
        )} */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-2xl mb-2">{seminar.topic}</CardTitle>
                <p className="text-gray-600">{seminar.description}</p>
              </div>
              {isRegistered && (
                <Badge variant="default" className="bg-green-500">
                  <CheckCircle className="h-4 w-4 mr-1" />
                  Registered
                </Badge>
              )}
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <User className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="font-medium">Host</p>
                    <p className="text-gray-600">{seminar.host_name}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <CalendarDays className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="font-medium">Date</p>
                    <p className="text-gray-600">{formatDate(seminar.date)}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="font-medium">Time</p>
                    <p className="text-gray-600">{formatTime(seminar.time)}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Users className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="font-medium">Speakers</p>
                    <p className="text-gray-600">
                      {speakers.length} speaker(s)
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Globe className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="font-medium">Host Country</p>
                    <p className="text-gray-600">{seminar.host_country}</p>
                  </div>
                </div>
              </div>
            </div>

            {!isHost && (
              <div className="flex justify-center pt-4">
                <Button
                  onClick={
                    isRegistered ? handleCancelRegistration : handleRegister
                  }
                  // onClick={() => {
                  //   mixpanelInstance.track(
                  //     " handle Register view seminer Button Clicked",
                  //     {
                  //       timestamp: new Date().toISOString(),
                  //     }
                  //   );
                  //   isRegistered ? handleCancelRegistration : handleRegister;
                  // }}
                  disabled={registering || canceling}
                  className="bg-blue-600 hover:bg-blue-700 px-8 py-3 text-lg"
                >
                  {registering
                    ? "Registering..."
                    : canceling
                    ? "Cancelling..."
                    : isRegistered
                    ? "Cancel Registration"
                    : "Register for Seminar"}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Speakers</CardTitle>
            <p className="text-gray-600">
              Meet the experts who will be presenting at this seminar
            </p>
          </CardHeader>
          <CardContent>
            {speakers.length === 0 ? (
              <p className="text-gray-600 text-center py-8">
                No speakers added yet.
              </p>
            ) : (
              <div className="grid md:grid-cols-2 gap-6">
                {speakers.map((speaker) => (
                  <Card key={speaker.id}>
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-lg mb-2">
                        {speaker.name}
                      </h3>
                      <div className="space-y-1">
                        <p className="text-sm text-gray-600">
                          <span className="font-medium">Qualification:</span>{" "}
                          {speaker.qualification}
                        </p>
                        <p className="text-sm text-gray-600">
                          <span className="font-medium">Department:</span>{" "}
                          {speaker.department}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Live Meeting</CardTitle>
            <p className="text-gray-600">Join the live seminar session</p>
          </CardHeader>
          {/* <CardContent>
            <div className="space-y-4">
              {(seminar.meeting_id || isHost) && (
                <div className="text-center py-4 space-y-4">
                  {!isHost &&
                    (!seminar?.is_host_joined ? (
                      <p className="text-sm text-gray-600">
                        <h5>The Host is not available.</h5>
                      </p>
                    ) : (
                      <p className="text-sm text-green-600">
                        <h5>The Host is available.</h5>
                      </p>
                    ))}

                  <div className="flex justify-center items-center gap-2">
                    {(isHost || seminar?.meeting_id) && (
                      <Button
                        onClick={handleJoinMeeting}
                        disabled={creatingMeeting}
                        className="bg-blue-600 hover:bg-blue-700 px-8 py-3 text-lg"
                      >
                        {creatingMeeting ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            {isHost ? "Starting..." : "Joining..."}
                          </>
                        ) : isHost ? (
                          "Start Meeting"
                        ) : (
                          "Join Meeting"
                        )}
                      </Button>
                    )}
                  </div>

                  {!isHost && seminar?.is_host_joined && !isRegistered && (
                    <p className="text-sm text-gray-600">
                      You must register for the seminar before joining the
                      meeting
                    </p>
                  )}
                </div>
              )}
            </div>
          </CardContent> */}

          <CardContent>
            <div className="space-y-4">
              {timeLeft &&
              seminarStartTime &&
              seminar.host_country === "India" &&
              timeLeft ? (
                <div className="bg-blue-600 text-white py-3 px-4 rounded-lg mb-6 flex flex-col md:flex-row items-center justify-between">
                  <div className="flex items-center mb-2 md:mb-0">
                    <Clock className="h-5 w-5 mr-2" />
                    <span className="font-semibold">Time left: {timeLeft}</span>
                  </div>

                  <div className="flex items-center">
                    <CalendarDays className="h-5 w-5 mr-2" />
                    <span className="text-sm">
                      Starts: {formatDate(seminar.date)} at{" "}
                      {formatTime(seminar.time)}
                      {seminar.host_country &&
                        ` (${seminar.host_country} Time)`}
                    </span>
                  </div>
                </div>
              ) : (
                <span className="font-semibold">
                  Your Country: {seminar.host_country} — Please check the time
                  difference manually.
                </span>
              )}
            </div>
            <div className="space-y-4">
              {(seminar.meeting_id || isHost) && (
                <div className="text-center py-4 space-y-4">
                  {isHost ? (
                    <p className="text-sm text-blue-500">
                      You are hosting this seminar
                    </p>
                  ) : seminar?.is_host_joined ? (
                    <p className="text-sm text-green-600">
                      Host is available to join
                    </p>
                  ) : (
                    <p className="text-sm text-yellow-600">
                      Host has not joined yet
                    </p>
                  )}

                  {/* <div className="flex justify-center">
                    <Button
                      onClick={handleJoinMeeting}
                      // disabled={creatingMeeting || (isHost && isSeminarPast)}
                      disabled={
                        creatingMeeting || (isHost && isJoinButtonDisabled)
                      }
                      // disable={}
                      className={`px-8 py-3 text-lg ${
                        isHost
                          ? "bg-green-600 hover:bg-green-700"
                          : "bg-blue-600 hover:bg-blue-700"
                      }`}
                    >
                      {creatingMeeting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          {isHost ? "Starting..." : "Joining..."}
                        </>
                      ) : isHost ? (
                        isJoinButtonDisabled ? (
                          // isSeminarPast ? (
                          "Meeting Expired"
                        ) : (
                          {isHost && seminar?.is_host_joined && (
                    <MeetingOptions
                      isHost={isHost}
                      isHostJoined={seminar?.is_host_joined}
                      onOptionsChange={setMeetingOptions}
                    />
                  )}
                          "Start Meeting"
                        )
                      ) : (
                        "Join Meeting"
                      )}
                    </Button>
                  </div> */}
                  <div className="flex justify-center">
                    {isHost ? (
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            disabled={creatingMeeting || isJoinButtonDisabled}
                            className={`px-8 py-3 text-lg bg-green-600 hover:bg-green-700`}
                          >
                            {isJoinButtonDisabled
                              ? "Meeting Expired"
                              : "Start Meeting"}
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Meeting Options</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4 py-4">
                            <div className="flex items-center justify-between">
                              <Label htmlFor="disable-mic">
                                Disable Participants Mic
                              </Label>
                              <Switch
                                id="disable-mic"
                                checked={meetingOptions.disableParticipantMic}
                                onCheckedChange={(checked) =>
                                  setMeetingOptions((prev) => ({
                                    ...prev,
                                    disableParticipantMic: checked,
                                  }))
                                }
                              />
                            </div>
                            <div className="flex items-center justify-between">
                              <Label htmlFor="disable-video">
                                Disable Participants Video
                              </Label>
                              <Switch
                                id="disable-video"
                                checked={meetingOptions.disableParticipantVideo}
                                onCheckedChange={(checked) =>
                                  setMeetingOptions((prev) => ({
                                    ...prev,
                                    disableParticipantVideo: checked,
                                  }))
                                }
                              />
                            </div>
                          </div>
                          <DialogFooter>
                            <Button
                              onClick={() => {
                                mixpanelInstance.track(
                                  " Start Meeting view seminer Button Clicked",
                                  {
                                    timestamp: new Date().toISOString(),
                                  }
                                );
                                handleJoinMeeting();
                              }}
                              // onClick={() => {
                              //   handleJoinMeeting();
                              // }}
                              className="bg-green-600 hover:bg-green-700"
                            >
                              Start Meeting
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    ) : (
                      <Button
                        // onClick={() => {
                        //   mixpanelInstance.track(
                        //     " Join Meeting view seminer Button Clicked",
                        //     {
                        //       timestamp: new Date().toISOString(),
                        //     }
                        //   );
                        //   handleJoinMeeting();
                        // }}
                        onClick={handleJoinMeeting}
                        disabled={creatingMeeting}
                        className="px-8 py-3 text-lg bg-blue-600 hover:bg-blue-700"
                      >
                        {creatingMeeting ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Joining...
                          </>
                        ) : (
                          "Join Meeting"
                        )}
                      </Button>
                    )}
                  </div>

                  {/* NEW: Additional meeting info */}
                  {/* {seminar.meeting_id && !isHost && (
                    <div className="mt-4 text-sm">
                      <p className="text-gray-600 mb-2">
                        Meeting ID: {seminar.meeting_id}
                      </p>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          navigator.clipboard.writeText(seminar.meeting_id!);
                          toast({ title: "Meeting ID copied!" });
                        }}
                      >
                        <Copy className="h-4 w-4 mr-2" />
                        Copy Meeting ID
                      </Button>
                    </div>
                  )} */}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
      <Footer />
    </div>
  );
};

export default SeminarDetails;