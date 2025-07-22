
// import { useState, useEffect } from "react";
// import { Button } from "@/components/ui/button";
// import { Calendar } from "@/components/ui/calendar";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import {
//   CalendarDays,
//   Users,
//   Clock,
//   User as UserIcon,
//   CalendarCheck,
//   Trash2,
//   Shield,
//   Layout,
//   Grid3X3,
//   Home,
//   ArrowLeft,
// } from "lucide-react";
// import { supabase } from "@/integrations/supabase/client";
// import { useToast } from "@/hooks/use-toast";
// import { useNavigate, Link } from "react-router-dom";
// import type { User as AuthUser } from "@supabase/supabase-js";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogDescription,
//   DialogFooter,
// } from "@/components/ui/dialog";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover";
// import { format } from "date-fns";
// import { LogOut } from "lucide-react";
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
// }

// const ESeminar = () => {
//   const [selectedDate, setSelectedDate] = useState<Date | undefined>(
//     new Date()
//   );
//   const [seminars, setSeminars] = useState<Seminar[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [user, setUser] = useState<AuthUser | null>(null);
//   const { toast } = useToast();
//   const navigate = useNavigate();
//   const [rescheduleOpen, setRescheduleOpen] = useState(false);
//   const [cancelOpen, setCancelOpen] = useState(false);
//   const [selectedSeminar, setSelectedSeminar] = useState<Seminar | null>(null);
//   const [newDate, setDate] = useState<Date | undefined>(new Date());
//   const [newTime, setNewTime] = useState("");
//   const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

//   useEffect(() => {
//     checkUser();
//     if (selectedDate) {
//       fetchSeminarsForDate(selectedDate);
//     }
//   }, [selectedDate]);

//   const checkUser = async () => {
//     try {
//       const {
//         data: { session },
//       } = await supabase.auth.getSession();
//       setUser(session?.user || null);
//     } catch (error) {
//       console.error("Error checking user:", error);
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
//       console.error("Sign out error:", error);
//       toast({
//         title: "Error",
//         description: "Failed to sign out. Please try again.",
//         variant: "destructive",
//       });
//     }
//   };

//   const handleBackNavigation = () => {
//     if (window.history.length > 1) {
//       navigate(-1);
//     } else {
//       navigate("/");
//     }
//   };

//   const fetchSeminarsForDate = async (date: Date) => {
//     setLoading(true);
//     try {
//       const dateString = date.toISOString().split("T")[0];

//       const { data, error } = await supabase
//         .from("seminars")
//         .select("*")
//         .eq("date", dateString)
//         .order("time", { ascending: true });

//       if (error) throw error;
//       setSeminars(data || []);
//     } catch (error) {
//       console.error("Error fetching seminars:", error);
//       toast({
//         title: "Error",
//         description: "Failed to fetch seminars for the selected date.",
//         variant: "destructive",
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleHostSeminar = () => {
//     if (!user) {
//       toast({
//         title: "Authentication Required",
//         description: "Please sign in to host a seminar.",
//         variant: "destructive",
//       });
//       return;
//     }
//     navigate("/host-seminar");
//   };

//   const handleTryNow = () => {
//     toast({
//       title: "Opening Calendar",
//       description: "Navigating to the calendar page...",
//     });
//     navigate("/calendar");
//   };
//   const handleSeminarClick = (seminar: Seminar) => {
//     navigate(`/seminar/${seminar.id}`);
//   };

//   // const handleSeminarClick = (seminar: Seminar) => {
//   //   const seminarUrl = `${window.location.origin}/seminar/${seminar.id}`;
//   //   const newWindow = window.open(
//   //     seminarUrl,
//   //     "_blank",
//   //     "width=1200,height=800,scrollbars=yes,resizable=yes"
//   //   );

//   //   if (!newWindow) {
//   //     toast({
//   //       title: "Popup Blocked",
//   //       description:
//   //         "Please allow popups for this site to view seminar details.",
//   //       variant: "destructive",
//   //     });
//   //     navigate(`/seminar/${seminar.id}`);
//   //   }
//   // };

//   const handleRescheduleClick = (seminar: Seminar) => {
//     if (!user || user.id !== seminar.host_id) {
//       toast({
//         title: "Unauthorized",
//         description: "Only the host can reschedule this seminar.",
//         variant: "destructive",
//       });
//       return;
//     }
//     setSelectedSeminar(seminar);
//     setDate(new Date(seminar.date));
//     setNewTime(seminar.time);
//     setRescheduleOpen(true);
//   };

//   const handleCancelClick = (seminar: Seminar) => {
//     if (!user || user.id !== seminar.host_id) {
//       toast({
//         title: "Unauthorized",
//         description: "Only the host can cancel this seminar.",
//         variant: "destructive",
//       });
//       return;
//     }
//     setSelectedSeminar(seminar);
//     setCancelOpen(true);
//   };

//   const handleRescheduleSubmit = async () => {
//     if (!selectedSeminar || !newDate || !newTime) return;

//     try {
//       const dateString = newDate.toISOString().split("T")[0];

//       const { error } = await supabase
//         .from("seminars")
//         .update({
//           date: dateString,
//           time: newTime,
//         })
//         .eq("id", selectedSeminar.id);

//       if (error) throw error;

//       toast({
//         title: "Success",
//         description: "Seminar rescheduled successfully!",
//       });

//       setRescheduleOpen(false);
//       fetchSeminarsForDate(selectedDate!);
//     } catch (error) {
//       console.error("Error rescheduling seminar:", error);
//       toast({
//         title: "Error",
//         description: "Failed to reschedule seminar.",
//         variant: "destructive",
//       });
//     }
//   };

//   const handleCancelSubmit = async () => {
//     if (!selectedSeminar) return;

//     try {
//       const { error } = await supabase
//         .from("seminars")
//         .delete()
//         .eq("id", selectedSeminar.id);

//       if (error) throw error;

//       toast({
//         title: "Success",
//         description: "Seminar cancelled successfully!",
//       });

//       setCancelOpen(false);
//       fetchSeminarsForDate(selectedDate!);
//     } catch (error) {
//       console.error("Error cancelling seminar:", error);
//       toast({
//         title: "Error",
//         description: "Failed to cancel seminar.",
//         variant: "destructive",
//       });
//     }
//   };

//   const formatTime = (time: string) => {
//     return new Date(`1970-01-01T${time}`).toLocaleTimeString([], {
//       hour: "2-digit",
//       minute: "2-digit",
//     });
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
//       {/* Header - Same as ProductPortal */}
//       {/* <header className="bg-black/30 backdrop-blur-md border-b border-white/20 sticky top-0 z-50 shadow-xl">
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
//                <div className="flex items-center space-x-2 bg-white/10 rounded-lg p-1">
//                 <Button
//                   variant={viewMode === "grid" ? "default" : "ghost"}
//                   size="sm"
//                   onClick={() => setViewMode("grid")}
//                   className={`${
//                     viewMode === "grid"
//                       ? "bg-blue-600 text-white"
//                       : "text-white hover:bg-white/20"
//                   }`}
//                 >
//                   <Grid3X3 className="h-4 w-4" />
//                 </Button>
//                 <Button
//                   variant={viewMode === "list" ? "default" : "ghost"}
//                   size="sm"
//                   onClick={() => setViewMode("list")}
//                   className={`${
//                     viewMode === "list"
//                       ? "bg-blue-600 text-white"
//                       : "text-white hover:bg-white/20"
//                   }`}
//                 >
//                   <Layout className="h-4 w-4" />
//                 </Button>
//               </div>
//               {user ? (
//                 <div className="flex items-center space-x-4">
//                   <span className="text-white text-sm bg-white/10 px-3 py-1 rounded-full">
//                     Welcome, {user.email}
//                   </span>
//                   <Button
//                     variant="outline"
//                     className="text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm"
//                     onClick={() => navigate("/profile")}
//                   >
//                     <UserIcon className="mr-2 h-4 w-4" />
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
//                       <UserIcon className="mr-2 h-4 w-4" />
//                       Sign In
//                     </Button>
//                   </Link>
//                 </>
//               )}
//               <Button
//                 variant="outline"
//                 onClick={() => navigate("/")}
//                 className="text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm"
//                 title="Go to home page"
//               >
//                 <Home className="mr-2 h-4 w-4" />
//                 Home
//               </Button>
//             </div>
//           </div>
//         </div>
//       </header> */}
//       <header className="bg-black/30 backdrop-blur-md border-b border-white/20 sticky top-0 z-50 shadow-xl">
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
//               {/* <Link to="/" className="flex items-center space-x-2">
//                 <Shield className="h-6 w-6 md:h-8 md:w-8 text-blue-400" />
//                 <h1 className="text-xl md:text-2xl font-bold text-white">
//                   MedPortal
//                 </h1>
//               </Link> */}
//               <div className="flex items-center space-x-2">
//                 {/* <Shield className="h-8 w-8 text-blue-600" />
//                                                 <h1 className="text-2xl font-bold text-gray-900">MedPortal</h1> */}
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

//       <div className="container mx-auto px-4 py-8">
//         <div className="text-center mb-8">
//           <h1 className="text-4xl font-bold text-gray-900 mb-4">
//             E-Seminar Platform
//           </h1>
//           <p className="text-xl text-gray-600 mb-6">
//             Host or join medical seminars worldwide
//           </p>

//           <div className="flex flex-col sm:flex-row gap-4 justify-center">
//             <Button
//               onClick={handleHostSeminar}
//               className="bg-blue-600 hover:bg-blue-700 px-8 py-3 text-lg"
//             >
//               <Users className="mr-2 h-5 w-5" />
//               Host a Seminar
//             </Button>
//             <Button
//               variant="outline"
//               className="border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-3 text-lg"
//               onClick={handleTryNow}
//             >
//               <CalendarDays className="mr-2 h-5 w-5" />
//               Browse Calendar
//             </Button>
//           </div>
//         </div>

//         <div className="grid lg:grid-cols-2 gap-8">
//           {/* Calendar Section */}
//           <Card>
//             <CardHeader>
//               <CardTitle className="flex items-center gap-2">
//                 <CalendarDays className="h-5 w-5" />
//                 Select Date
//               </CardTitle>
//               <CardDescription>
//                 Choose a date to view available seminars
//               </CardDescription>
//             </CardHeader>
//             <CardContent>
//               <Calendar
//                 mode="single"
//                 selected={selectedDate}
//                 onSelect={setSelectedDate}
//                 className="rounded-md border"
//               />
//             </CardContent>
//           </Card>

//           {/* Seminars for Selected Date */}
//           <Card>
//             <CardHeader>
//               <CardTitle className="flex items-center gap-2">
//                 <Clock className="h-5 w-5" />
//                 Seminars on {selectedDate?.toLocaleDateString()}
//               </CardTitle>
//               <CardDescription>
//                 {seminars.length} seminar(s) scheduled for this date
//               </CardDescription>
//             </CardHeader>
//             <CardContent>
//               {loading ? (
//                 <div className="text-center py-8">
//                   <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
//                   <p className="mt-2 text-gray-600">Loading seminars...</p>
//                 </div>
//               ) : seminars.length === 0 ? (
//                 <div className="text-center py-8">
//                   <CalendarDays className="h-12 w-12 text-gray-400 mx-auto mb-4" />
//                   <p className="text-gray-600">
//                     No seminars scheduled for this date
//                   </p>
//                 </div>
//               ) : (
//                 <div className="space-y-4">
//                   {seminars.map((seminar) => (
//                     <Card
//                       key={seminar.id}
//                       className="cursor-pointer hover:shadow-md transition-shadow border-2 hover:border-blue-300"
//                     >
//                       <CardContent className="p-4">
//                         <div className="flex justify-between items-start mb-2">
//                           <h3
//                             className="font-semibold text-lg text-blue-700 hover:text-blue-800"
//                             onClick={() => handleSeminarClick(seminar)}
//                           >
//                             {seminar.topic}
//                           </h3>
//                           <Badge variant="secondary">
//                             {formatTime(seminar.time)}
//                           </Badge>
//                         </div>
//                         <div className="flex items-center gap-2 text-gray-600 mb-2">
//                           <UserIcon className="h-4 w-4" />
//                           <span>Hosted by {seminar.host_name}</span>
//                         </div>
//                         {seminar.description && (
//                           <p className="text-gray-600 text-sm">
//                             {seminar.description}
//                           </p>
//                         )}
//                         <div className="flex justify-between mt-4">
//                           <div className="text-xs text-blue-600">
//                             Click topic to view details and register
//                           </div>
//                           {user?.id === seminar.host_id && (
//                             <div className="flex gap-2">
//                               <Link to={`/e-seminar/edit/${seminar.id}`}>
//                                 <Button variant="outline">Edit</Button>
//                               </Link>
//                               <Button
//                                 variant="ghost"
//                                 size="sm"
//                                 className="text-gray-600 hover:text-blue-600"
//                                 onClick={(e) => {
//                                   e.stopPropagation();
//                                   handleRescheduleClick(seminar);
//                                 }}
//                               >
//                                 <CalendarCheck className="h-4 w-4 mr-2" />
//                                 Reschedule
//                               </Button>
//                               {/* <Button
//                                 variant="ghost"
//                                 size="sm"
//                                 className="text-red-600 hover:text-red-800"
//                                 onClick={(e) => {
//                                   e.stopPropagation();
//                                   handleCancelClick(seminar);
//                                 }}
//                               >
//                                 <Trash2 className="h-4 w-4 mr-2" />
//                                 Cancel
//                               </Button> */}
//                             </div>
//                           )}
//                         </div>
//                       </CardContent>
//                     </Card>
//                   ))}
//                 </div>
//               )}
//             </CardContent>
//           </Card>
//         </div>

//         {/* Reschedule Dialog */}
//         <Dialog open={rescheduleOpen} onOpenChange={setRescheduleOpen}>
//           <DialogContent>
//             <DialogHeader>
//               <DialogTitle>Reschedule Seminar</DialogTitle>
//               <DialogDescription>
//                 Update the date and time for "{selectedSeminar?.topic}"
//               </DialogDescription>
//             </DialogHeader>
//             <div className="grid gap-4 py-4">
//               <div className="grid grid-cols-4 items-center gap-4">
//                 <Label htmlFor="date" className="text-right">
//                   Date
//                 </Label>
//                 <Popover>
//                   <PopoverTrigger asChild>
//                     <Button variant={"outline"} className="col-span-3">
//                       {newDate ? format(newDate, "PPP") : "Pick a date"}
//                     </Button>
//                   </PopoverTrigger>
//                   <PopoverContent className="w-auto p-0">
//                     <Calendar
//                       mode="single"
//                       selected={newDate}
//                       onSelect={setDate}
//                       initialFocus
//                     />
//                   </PopoverContent>
//                 </Popover>
//               </div>
//               <div className="grid grid-cols-4 items-center gap-4">
//                 <Label htmlFor="time" className="text-right">
//                   Time
//                 </Label>
//                 <Input
//                   id="time"
//                   type="time"
//                   value={newTime}
//                   onChange={(e) => setNewTime(e.target.value)}
//                   className="col-span-3"
//                 />
//               </div>
//             </div>
//             <DialogFooter>
//               <Button
//                 variant="outline"
//                 onClick={() => setRescheduleOpen(false)}
//               >
//                 Cancel
//               </Button>
//               <Button onClick={handleRescheduleSubmit}>
//                 Confirm Reschedule
//               </Button>
//             </DialogFooter>
//           </DialogContent>
//         </Dialog>

//         {/* Cancel Dialog */}
//         <Dialog open={cancelOpen} onOpenChange={setCancelOpen}>
//           <DialogContent>
//             <DialogHeader>
//               <DialogTitle>Cancel Seminar</DialogTitle>
//               <DialogDescription>
//                 Are you sure you want to cancel "{selectedSeminar?.topic}"?
//               </DialogDescription>
//             </DialogHeader>
//             <div className="py-4">
//               <p className="text-gray-600">
//                 This action cannot be undone. All registered participants will
//                 be notified.
//               </p>
//             </div>
//             <DialogFooter>
//               <Button variant="outline" onClick={() => setCancelOpen(false)}>
//                 Go Back
//               </Button>
//               <Button variant="destructive" onClick={handleCancelSubmit}>
//                 <Trash2 className="h-4 w-4 mr-2" />
//                 Confirm Cancellation
//               </Button>
//             </DialogFooter>
//           </DialogContent>
//         </Dialog>
//       </div>
//       <Footer />
//     </div>
//   );
// };

// export default ESeminar;

import { useState, useEffect, useRef } from "react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  CalendarDays,
  Users,
  Clock,
  User as UserIcon,
  Trash2,
  Home,
  ArrowLeft,
  CalendarCheck,
  Globe,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useNavigate, Link } from "react-router-dom";
import type { User as AuthUser } from "@supabase/supabase-js";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { LogOut } from "lucide-react";
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

interface Seminar {
  id: string;
  host_name: string;
  topic: string;
  description: string;
  date: string;
  time: string;
  host_id: string;
  host_country?: string | null;
}

const ESeminar = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date()
  );
  const [seminars, setSeminars] = useState<Seminar[]>([]);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<AuthUser | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();
  const [rescheduleOpen, setRescheduleOpen] = useState(false);
  const [cancelOpen, setCancelOpen] = useState(false);
  const [selectedSeminar, setSelectedSeminar] = useState<Seminar | null>(null);
  const [newDate, setDate] = useState<Date | undefined>(new Date());
  const [newTime, setNewTime] = useState("");
  const lastSelectedDateRef = useRef<Date | null>(null);

  useEffect(() => {
    checkUser();
    if (selectedDate) {
      fetchSeminarsForDate(selectedDate);
    }
  }, [selectedDate]);

  const checkUser = async () => {
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setUser(session?.user || null);
    } catch (error) {
      console.error("Error checking user:", error);
    }
  };

  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      setUser(null);
      toast({
        title: "Signed Out",
        description: "You have been successfully signed out.",
      });
    } catch (error) {
      console.error("Sign out error:", error);
      toast({
        title: "Error",
        description: "Failed to sign out. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleBackNavigation = () => {
    navigate("/");
  };

  const fetchSeminarsForDate = async (date: Date) => {
    setLoading(true);
    try {
      // const dateString = date.toISOString().split("T")[0];
      const dateString = date.toLocaleDateString("en-CA");

      const supabaseUrl = `https://rxyfrjfgydldjdqelixe.supabase.co/rest/v1/seminars?select=*&date=eq.${dateString}&order=time.asc`;
      console.log("Supabase Query URL:", supabaseUrl);

      const { data, error } = await supabase
        .from("seminars")
        .select("*")
        .eq("date", dateString)
        .order("time", { ascending: true });

      if (error) throw error;
      setSeminars(data || []);
    } catch (error) {
      console.error("Error fetching seminars:", error);
      toast({
        title: "Error",
        description: "Failed to fetch seminars for the selected date.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleHostSeminar = () => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to host a seminar.",
        variant: "destructive",
      });
      return;
    }
    navigate("/host-seminar");
  };

  const handleTryNow = () => {
    navigate("/calendar");
  };

  const handleSeminarClick = (seminar: Seminar) => {
    navigate(`/seminar/${seminar.id}`);
  };

  // const handleSeminarClick = (seminar: Seminar) => {
  //   const seminarUrl = `${window.location.origin}/seminar/${seminar.id}`;
  //   const newWindow = window.open(
  //     seminarUrl,
  //     "_blank",
  //     "width=1200,height=800,scrollbars=yes,resizable=yes"
  //   );

  //   if (!newWindow) {
  //     toast({
  //       title: "Popup Blocked",
  //       description:
  //         "Please allow popups for this site to view seminar details.",
  //       variant: "destructive",
  //     });
  //     navigate(`/seminar/${seminar.id}`);
  //   }
  // };


  const handleRescheduleClick = (seminar: Seminar) => {
    if (!user || user.id !== seminar.host_id) {
      toast({
        title: "Unauthorized",
        description: "Only the host can reschedule this seminar.",
        variant: "destructive",
      });
      return;
    }
    setSelectedSeminar(seminar);
    setDate(new Date(seminar.date));
    setNewTime(seminar.time);
    setRescheduleOpen(true);
  };

  const handleCancelClick = (seminar: Seminar) => {
    if (!user || user.id !== seminar.host_id) {
      toast({
        title: "Unauthorized",
        description: "Only the host can cancel this seminar.",
        variant: "destructive",
      });
      return;
    }
    setSelectedSeminar(seminar);
    setCancelOpen(true);
  };

  const handleRescheduleSubmit = async () => {
    if (!selectedSeminar || !newDate || !newTime) return;

    try {
      const dateString = newDate.toISOString().split("T")[0];

      const { error } = await supabase
        .from("seminars")
        .update({
          date: dateString,
          time: newTime,
        })
        .eq("id", selectedSeminar.id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Seminar rescheduled successfully!",
      });

      setRescheduleOpen(false);
      fetchSeminarsForDate(selectedDate!);
    } catch (error) {
      console.error("Error rescheduling seminar:", error);
      toast({
        title: "Error",
        description: "Failed to reschedule seminar.",
        variant: "destructive",
      });
    }
  };

  const handleCancelSubmit = async () => {
    if (!selectedSeminar) return;

    try {
      const { error } = await supabase
        .from("seminars")
        .delete()
        .eq("id", selectedSeminar.id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Seminar cancelled successfully!",
      });

      setCancelOpen(false);
      fetchSeminarsForDate(selectedDate!);
    } catch (error) {
      console.error("Error cancelling seminar:", error);
      toast({
        title: "Error",
        description: "Failed to cancel seminar.",
        variant: "destructive",
      });
    }
  };

  const formatTime = (time: string) => {
    return new Date(`1970-01-01T${time}`).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Fix for allowing reselecting the same date
  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      // Store the previous date
      const prevDate = lastSelectedDateRef.current;
      lastSelectedDateRef.current = date;

      // If same date is clicked, force refetch
      if (prevDate && date.getTime() === prevDate.getTime()) {
        fetchSeminarsForDate(date);
      } else {
        setSelectedDate(date);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <header className="bg-black/30 backdrop-blur-md border-b border-white/20 sticky top-0 z-50 shadow-xl">
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

              {/* <Link to="/" className="flex items-center space-x-2">
                <Shield className="h-6 w-6 md:h-8 md:w-8 text-blue-400" />
                <h1 className="text-xl md:text-2xl font-bold text-white">
                  MedPortal
                </h1>
              </Link> */}
              <div className="flex items-center space-x-2">
                {/* <Shield className="h-8 w-8 text-blue-600" />
                                                <h1 className="text-2xl font-bold text-gray-900">MedPortal</h1> */}

              

                <Link to="/">
                  <img src={logo} alt="Logo" className="h-10 w-100 mr-2" />
                </Link>
              </div>
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

      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            E-Seminar Platform
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            Host or join medical seminars worldwide
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={handleHostSeminar}
              className="bg-blue-600 hover:bg-blue-700 px-8 py-3 text-lg"
            >
              <Users className="mr-2 h-5 w-5" />
              Host a Seminar
            </Button>
            <Button
              variant="outline"
              className="border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-3 text-lg"
              onClick={handleTryNow}
            >
              <CalendarDays className="mr-2 h-5 w-5" />
              Browse Calendar
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Calendar Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CalendarDays className="h-5 w-5" />
                Select Date
              </CardTitle>
              <CardDescription>
                Choose a date to view available seminars
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={handleDateSelect} // Use the fixed handler
                className="rounded-md border"
              />
            </CardContent>
          </Card>

          {/* Seminars for Selected Date */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Seminars on {selectedDate?.toLocaleDateString()}
              </CardTitle>
              <CardDescription>
                {seminars.length} seminar(s) scheduled for this date
              </CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                  <p className="mt-2 text-gray-600">Loading seminars...</p>
                </div>
              ) : seminars.length === 0 ? (
                <div className="text-center py-8">
                  <CalendarDays className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">
                    No seminars scheduled for this date
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {seminars.map((seminar) => (
                    <Card
                      key={seminar.id}
                      className="cursor-pointer hover:shadow-md transition-shadow border-2 hover:border-blue-300"
                    >
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h3
                            className="font-semibold text-lg text-blue-700 hover:text-blue-800"
                            onClick={() => handleSeminarClick(seminar)}
                          >
                            {seminar.topic}
                          </h3>
                          <Badge variant="secondary">
                            {formatTime(seminar.time)}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600 mb-2">
                          <UserIcon className="h-4 w-4" />
                          <span>Hosted by {seminar.host_name}</span>
                        </div>
                        {seminar.description && (
                          <p className="text-gray-600 text-sm">
                            {seminar.description}
                          </p>
                        )}
                        <div className="flex items-center gap-3">
                          <Globe className="h-4 w-4 text-gray-600" />
                          <div>
                            <p className="text-gray-600">
                              Host Country:{" "}
                              <span className="text-blue-600 font-semibold">
                                {seminar.host_country}
                              </span>
                            </p>
                          </div>
                        </div>
                        <div className="flex justify-between mt-4">
                          <div className="text-xs text-blue-600">
                            Click topic to view details and register
                          </div>
                          {user?.id === seminar.host_id && (
                            <div className="flex gap-2">
                              <Link to={`/e-seminar/edit/${seminar.id}`}>
                                <Button variant="outline">Edit</Button>
                              </Link>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-gray-600 hover:text-blue-600"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleRescheduleClick(seminar);
                                }}
                              >
                                <CalendarCheck className="h-4 w-4 mr-2" />
                                Reschedule
                              </Button>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Reschedule Dialog */}
        <Dialog open={rescheduleOpen} onOpenChange={setRescheduleOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Reschedule Seminar</DialogTitle>
              <DialogDescription>
                Update the date and time for "{selectedSeminar?.topic}"
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="date" className="text-right">
                  Date
                </Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant={"outline"} className="col-span-3">
                      {newDate ? format(newDate, "PPP") : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={newDate}
                      onSelect={setDate}
                      onDayClick={(day) => setDate(day)}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="time" className="text-right">
                  Time
                </Label>
                <Input
                  id="time"
                  type="time"
                  value={newTime}
                  onChange={(e) => setNewTime(e.target.value)}
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setRescheduleOpen(false)}
              >
                Cancel
              </Button>
              <Button onClick={handleRescheduleSubmit}>
                Confirm Reschedule
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Cancel Dialog */}
        <Dialog open={cancelOpen} onOpenChange={setCancelOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Cancel Seminar</DialogTitle>
              <DialogDescription>
                Are you sure you want to cancel "{selectedSeminar?.topic}"?
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <p className="text-gray-600">
                This action cannot be undone. All registered participants will
                be notified.
              </p>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setCancelOpen(false)}>
                Go Back
              </Button>
              <Button variant="destructive" onClick={handleCancelSubmit}>
                <Trash2 className="h-4 w-4 mr-2" />
                Confirm Cancellation
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <Footer />
    </div>
  );
};

export default ESeminar;
