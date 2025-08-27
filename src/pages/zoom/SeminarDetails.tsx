// // // import { useState, useEffect } from "react";
// // // import { useParams, useNavigate, Link } from "react-router-dom";
// // // import { Button } from "@/components/ui/button";
// // // import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// // // import { Badge } from "@/components/ui/badge";
// // // import {
// // //   ArrowLeft,
// // //   User,
// // //   Clock,
// // //   CalendarDays,
// // //   Users,
// // //   CheckCircle,
// // //   Home,
// // //   Shield,
// // //   Copy,
// // //   Loader2,
// // //   Video,
// // //   Globe,
// // // } from "lucide-react";
// // // import { supabase } from "@/integrations/supabase/client";
// // // import { useToast } from "@/hooks/use-toast";
// // // import type { User as AuthUser } from "@supabase/supabase-js";
// // // import VideoMeeting from "../../components/VideoMeeting";
// // // import { v4 as uuidv4 } from "uuid";
// // // import {
// // //   DropdownMenu,
// // //   DropdownMenuContent,
// // //   DropdownMenuItem,
// // //   DropdownMenuLabel,
// // //   DropdownMenuSeparator,
// // //   DropdownMenuTrigger,
// // // } from "@/components/ui/dropdown-menu";
// // // import logo from "@/image/thefuturemed_logo (1).jpg";
// // // import Footer from "@/footer/Footer";
// // // import {
// // //   Dialog,
// // //   DialogContent,
// // //   DialogHeader,
// // //   DialogTitle,
// // //   DialogTrigger,
// // //   DialogFooter,
// // // } from "@/components/ui/dialog";
// // // import { Switch } from "@/components/ui/switch";
// // // import { Label } from "@/components/ui/label";
// // // import Header from "@/footer/Header1";
// // // import { mixpanelInstance } from "@/utils/mixpanel";

// // // interface Seminar {
// // //   id: string;
// // //   host_name: string;
// // //   topic: string;
// // //   description: string;
// // //   date: string;
// // //   time: string;
// // //   host_id: string;
// // //   meeting_id?: string | null;
// // //   session_id?: string | null;
// // //   host_country?: string | null;
// // //   is_host_joined: boolean;
// // // }

// // // interface Speaker {
// // //   id: string;
// // //   name: string;
// // //   qualification: string;
// // //   department: string;
// // // }

// // // const SeminarDetails = () => {
// // //   const { seminarId } = useParams();
// // //   const navigate = useNavigate();
// // //   const [seminar, setSeminar] = useState<Seminar | null>(null);
// // //   const [speakers, setSpeakers] = useState<Speaker[]>([]);
// // //   const [loading, setLoading] = useState(true);
// // //   const [registering, setRegistering] = useState(false);
// // //   const [isRegistered, setIsRegistered] = useState(false);
// // //   const [user, setUser] = useState<AuthUser | null>(null);
// // //   const { toast } = useToast();
// // //   const [canceling, setCanceling] = useState(false);
// // //   const [registrationId, setRegistrationId] = useState<string | null>(null);
// // //   const [showMeeting, setShowMeeting] = useState(false);
// // //   const [creatingMeeting, setCreatingMeeting] = useState(false);
// // //   const isHost = user?.id === seminar?.host_id;
// // //   const [timeLeft, setTimeLeft] = useState<string | null>(null);
// // //   // const [localTime, setLocalTime] = useState<string>("");
// // //   // const [hostTime, setHostTime] = useState<string>("");
// // //   // const [isSeminarPast, setIsSeminarPast] = useState(false);
// // //   const [seminarStartTime, setSeminarStartTime] = useState<Date | null>(null);
// // //   const [isJoinButtonDisabled, setIsJoinButtonDisabled] = useState(true);

// // //   // NEW: State for current time in host's timezone
// // //   const [hostCurrentTime, setHostCurrentTime] = useState<Date | null>(null);
// // //   // NEW: State for current IST time
// // //   const [currentISTTime, setCurrentISTTime] = useState("");
// // //   const [userProfile, setUserProfile] = useState<any>(null);
// // //   const supabaseAnonKey = import.meta.env.VITE_VIDEOSDK_TOKEN;
// // //   const [participantCount, setParticipantCount] = useState<number>(0);

// // //   const [meetingOptions, setMeetingOptions] = useState({
// // //     disableParticipantMic: false,
// // //     disableParticipantVideo: false,
// // //   });
// // //   // const handleBackNavigation = () => {
// // //   //   navigate(-1);
// // //   // };

// // //   // const onNavigateProfile = () => {
// // //   //   navigate("/profile");
// // //   // };

// // //   // const onNavigateHome = () => {
// // //   //   navigate("/");
// // //   // };

// // //   useEffect(() => {
// // //     if (!seminar) {
// // //       console.log("Seminar data not available yet.");
// // //       return;
// // //     }

// // //     const seminarDateTime = new Date(`${seminar.date}T${seminar.time}`);
// // //     console.log("Parsed Seminar DateTime (local):", seminarDateTime);
// // //     setSeminarStartTime(seminarDateTime);

// // //     const timer = setInterval(() => {
// // //       const now = new Date();
// // //       // console.log("Current Local Time:", now);
// // //       setHostCurrentTime(now);

// // //       const diffMs = seminarDateTime.getTime() - now.getTime();
// // //       // console.log("Time difference in ms:", diffMs);

// // //       if (diffMs <= 0) {
// // //         // console.log("Seminar has already started.");
// // //         setTimeLeft("Seminar has started");

// // //         // ✅ Enable the join button once time has passed
// // //         setIsJoinButtonDisabled(false);
// // //         return;
// // //       } else {
// // //         setIsJoinButtonDisabled(true);
// // //       }

// // //       const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
// // //       const hours = Math.floor(
// // //         (diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
// // //       );
// // //       const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
// // //       const seconds = Math.floor((diffMs % (1000 * 60)) / 1000);

// // //       setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
// // //     }, 1000);

// // //     return () => {
// // //       console.log("Clearing countdown interval");
// // //       clearInterval(timer);
// // //     };
// // //   }, [seminar]);

// // //   const getDisplayName = () => {
// // //     if (userProfile?.first_name && userProfile?.last_name) {
// // //       return `${userProfile.first_name} ${userProfile.last_name}`;
// // //     } else if (user?.email) {
// // //       return user.email;
// // //     } else {
// // //       return "Participant";
// // //     }
// // //   };

// // //   useEffect(() => {
// // //     // Improved participant count fetch with better error handling
// // //     const fetchParticipantCount = async () => {
// // //       try {
// // //         const { count, error } = await supabase
// // //           .from("seminar_registrations")
// // //           .select("*", {
// // //             count: "exact",
// // //             head: true,
// // //           })
// // //           .eq("seminar_id", seminarId);
// // //           console.log("Fetching participant count for seminar:", seminarId);
// // // console.log("Participant count query:", { seminarId });

// // //         if (error) {
// // //           console.error("Error fetching participant count:", error);
// // //           throw error;
// // //         }

// // //         console.log("Participant count response:", count);

// // //         setParticipantCount(count );
// // //         return count || 0;
// // //       } catch (error) {
// // //         console.error("Failed to fetch participant count:", error);
// // //         setParticipantCount(0); // Fallback to 0 if error occurs
// // //         return 0;
// // //       }
// // //     };

// // //     const fetchData = async () => {
// // //       try {
// // //         // Get user session
// // //         const {
// // //           data: { session },
// // //         } = await supabase.auth.getSession();
// // //         setUser(session?.user || null);

// // //         // Fetch seminar details
// // //         const { data: seminarData, error: seminarError } = await supabase
// // //           .from("seminars")
// // //           .select("*")
// // //           .eq("id", seminarId)
// // //           .single();
// // //         console.log("✅ Host Joined Status:", seminarData.is_host_joined);
// // //         if (seminarError) throw seminarError;
// // //         setSeminar(seminarData);

// // //         // Fetch speakers
// // //         const { data: speakersData, error: speakersError } = await supabase
// // //           .from("speakers")
// // //           .select("*")
// // //           .eq("seminar_id", seminarId);
// // //           console.log("Speakers Data:", speakersData);

// // //         if (speakersError) throw speakersError;
// // //         setSpeakers(speakersData || []);

// // //         // Check registration if user is logged in
// // //         if (session?.user) {
// // //           await checkRegistrationStatus(session.user.id);
// // //         }

// // //         if (session?.user) {
// // //           const { data: profileData, error: profileError } = await supabase
// // //             .from("profiles")
// // //             .select("*")
// // //             .eq("id", session.user.id)
// // //             .single();

// // //           if (!profileError && profileData) {
// // //             setUserProfile(profileData);
// // //           }
// // //         }
// // //           await fetchParticipantCount();
// // //       } catch (error) {
// // //         console.error("Error fetching data:", error);
// // //         toast({
// // //           title: "Error",
// // //           description: "Failed to load seminar details",
// // //           variant: "destructive",
// // //         });
// // //       } finally {
// // //         setLoading(false);
// // //       }
// // //     };

// // //     fetchData();
// // //   }, [seminarId, toast]);

// // //   const checkRegistrationStatus = async (userId: string) => {
// // //     try {
// // //       const { data, error } = await supabase
// // //         .from("seminar_registrations")
// // //         .select("id")
// // //         .eq("seminar_id", seminarId)
// // //         .eq("user_id", userId)
// // //         .maybeSingle();
// // //         console.log("Registration Data25:", data);

// // //       if (error) throw error;
// // //       setIsRegistered(!!data);
// // //       if (data) setRegistrationId(data.id);
// // //     } catch (error) {
// // //       console.error("Error checking registration:", error);
// // //     }
// // //   };

// // //   const handleJoinMeeting = async () => {
// // //     // For participants
// // //     if (!isHost) {
// // //       if (!seminarId) {
// // //         // if (!seminar?.meeting_id) {
// // //         toast({
// // //           title: "No Meeting",
// // //           description: "Meeting not available yet",
// // //           variant: "destructive",
// // //         });
// // //         return;
// // //       }

// // //       if (!isRegistered) {
// // //         toast({
// // //           title: "Registration Required",
// // //           description: "You must register for the seminar before joining",
// // //           variant: "destructive",
// // //         });
// // //         return;
// // //       }
// // //       // NEW: Check if seminar has started
// // //       if (seminarStartTime && seminarStartTime > new Date()) {
// // //         toast({
// // //           title: "Meeting Not Started",
// // //           description: "Seminar has not started yet",
// // //           variant: "destructive",
// // //         });
// // //         // setShowMeeting(true);
// // //         return;
// // //       }

// // //       // Join existing meeting
// // //       setShowMeeting(true);
// // //       return;
// // //     }

// // //     // For hosts
// // //     try {
// // //       setCreatingMeeting(true);
// // //       // const newMeetingId = uuidv4();
// // //       // const meetingIdToUse = seminar?.meeting_id || seminarId;

// // //       // // Create new meeting if needed
// // //       // const { data, error } = await supabase
// // //       //   .from("seminars")
// // //       //   .update({
// // //       //     is_host_joined: true,
// // //       //     // meeting_id: meetingIdToUse,
// // //       //     meeting_id: seminarId,
// // //       //     // meeting_id: newMeetingId,
// // //       //   } as Seminar)
// // //       //   .eq("id", seminarId)
// // //       //   .select()
// // //       //   .single();

// // //       // console.log("✅ is_host_joined after update:", data?.is_host_joined);
// // //       // console.log("Supabase Error (if any):", error);

// // //       // if (error) throw error;

// // //       // // Update local state
// // //       // setSeminar((prev) =>
// // //       //   prev
// // //       //     ? {
// // //       //         ...prev,
// // //       //         // meeting_id: meetingIdToUse,
// // //       //         meeting_id: seminarId,
// // //       //         // meeting_id: newMeetingId,
// // //       //         is_host_joined: true,
// // //       //       }
// // //       //     : null
// // //       // );
// // //       if (!seminar?.meeting_id) {
// // //         // First time host is joining - create meeting
// // //         const { data, error } = await supabase
// // //           .from("seminars")
// // //           .update({
// // //             is_host_joined: true,
// // //             meeting_id: seminarId, // Use seminarId as meetingId
// // //             session_id: seminar?.session_id || uuidv4(),
// // //           })
// // //           .eq("id", seminarId)
// // //           .select()
// // //           .single();
// // //           console.log("Meeting Data:", data);

// // //         if (error) throw error;

// // //         setSeminar((prev) =>
// // //           prev
// // //             ? {
// // //                 ...prev,
// // //                 meeting_id: seminarId,
// // //                 is_host_joined: true,
// // //               }
// // //             : null
// // //         );
// // //       } else {
// // //         // Meeting already exists - just update host joined status
// // //         const { error } = await supabase
// // //           .from("seminars")
// // //           .update({
// // //             is_host_joined: true,
// // //           })
// // //           .eq("id", seminarId);

// // //         if (error) throw error;

// // //         setSeminar((prev) => (prev ? { ...prev, is_host_joined: true } : null));
// // //       }

// // //       // Join the meeting
// // //       setShowMeeting(true);
// // //     } catch (error) {
// // //       console.error("Error creating meeting:", error);
// // //       toast({
// // //         title: "Error",
// // //         description: "Failed to start meeting",
// // //         variant: "destructive",
// // //       });
// // //     } finally {
// // //       setCreatingMeeting(false);
// // //     }
// // //   };

// // //   const handleLeaveMeeting = () => {
// // //     console.log("kkkkkkkk", setShowMeeting(false));
// // //     setShowMeeting(false);
// // //   };
// // //   const handleMeetingEnd = async () => {
// // //     try {
// // //       // Update seminar status when host ends meeting
// // //       const { error } = await supabase
// // //         .from("seminars")
// // //         .update({
// // //           is_host_joined: false,
// // //           // Keep the same meeting_id for future rejoins
// // //         })
// // //         .eq("id", seminarId);

// // //       if (error) throw error;

// // //       setSeminar((prev) => (prev ? { ...prev, is_host_joined: false } : null));

// // //       setShowMeeting(false);
// // //       toast({
// // //         title: "Meeting Ended",
// // //         description: "The meeting has been ended successfully",
// // //       });
// // //     } catch (error) {
// // //       console.error("Error ending meeting:", error);
// // //       toast({
// // //         title: "Error",
// // //         description: "Failed to end meeting",
// // //         variant: "destructive",
// // //       });
// // //     }
// // //   };

// // //   // const handleRegister = async () => {
// // //   //   if (!user || !seminarId) return;

// // //   //   try {
// // //   //     setRegistering(true);
// // //   //     const { data, error } = await supabase
// // //   //       .from("seminar_registrations")
// // //   //       .insert({
// // //   //         seminar_id: seminarId,
// // //   //         user_id: user.id,
// // //   //       })
// // //   //       .select()
// // //   //       .single();

// // //   //     if (error) throw error;
// // //   //     setIsRegistered(true);
// // //   //     setRegistrationId(data.id);
// // //   //     toast({
// // //   //       title: "Registered",
// // //   //       description: "You are now registered for this seminar",
// // //   //     });
// // //   //   } catch (error) {
// // //   //     console.error("Registration Error:", error);
// // //   //     toast({
// // //   //       title: "Registration Failed",
// // //   //       variant: "destructive",
// // //   //     });
// // //   //   } finally {
// // //   //     setRegistering(false);
// // //   //   }
// // //   // };
// // //   const handleRegister = async () => {
// // //     // if (!user || !seminarId || !seminar) return;
// // //     if (!user || !seminarId || !seminar) {
// // //       toast({
// // //         title: "Registration Required",
// // //         description: "You must register for the seminar before joining",
// // //         variant: "destructive",
// // //       });
// // //       return;
// // //     }
// // //     try {
// // //       setRegistering(true);

// // //       // First, register the user for the seminar
// // //       const { data, error } = await supabase
// // //         .from("seminar_registrations")
// // //         .insert({
// // //           seminar_id: seminarId,
// // //           user_id: user.id,
// // //         })
// // //         .select()
// // //         .single();
// // //         console.log("Registration Data:", data);

// // //       if (error) throw error;

// // //       setIsRegistered(true);
// // //       setRegistrationId(data.id);
// // //       console.log("Registration ID:", data.id);
// // //       // setParticipantCount((prev) => {
// // //       //   const newCount = prev + 1;
// // //       //   console.log("Incremented participant count to:", newCount); // Log the new count
// // //       //   return newCount;
// // //       // });
// // //       setParticipantCount(prev => Math.max( prev - 1));

// // //       // Send confirmation email
// // //       const emailResponse = await fetch(
// // //         `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-email`,
// // //         {
// // //           method: "POST",
// // //           headers: {
// // //             "Content-Type": "application/json",
// // //             Authorization: `Bearer ${supabaseAnonKey}`,
// // //           },
// // //           body: JSON.stringify({
// // //             email: user.email,
// // //             subject: `Seminar Registration Confirmation: ${seminar.topic}`,
// // //             message: `Dear Participant,<br><br>
// // // You have successfully registered for the following seminar:<br><br>
// // // <strong>Topic:</strong> ${seminar.topic}<br>
// // // <strong>Date:</strong> ${formatDate(seminar.date)}<br>
// // // <strong>Time:</strong> ${formatTime(seminar.time)}<br>
// // // <strong>Host:</strong> ${seminar.host_name}<br><br>

// // // <strong>Preparation Checklist:</strong><br>
// // // - Please join 15 minutes early to set up<br>
// // // - Test your audio/video equipment beforehand<br>
// // // - Review the seminar description:<br>
// // // ${seminar.description}<br><br>

// // // Looking forward to seeing you at the seminar!<br><br>

// // // Best regards,<br>
// // // The Seminar Team`,
// // //           }),
// // //         }
// // //       );

// // //       if (!emailResponse.ok) {
// // //         throw new Error("Failed to send confirmation email");
// // //       }

// // //       toast({
// // //         title: "Registered",
// // //         description:
// // //           "You are now registered for this seminar. A confirmation email has been sent.",
// // //       });
// // //     } catch (error) {
// // //       console.error("Registration Error:", error);
// // //       toast({
// // //         title: "Registration Failed",
// // //         description:
// // //           error instanceof Error ? error.message : "An error occurred",
// // //         variant: "destructive",
// // //       });
// // //     } finally {
// // //       setRegistering(false);
// // //     }
// // //   };
// // //   const handleCancelRegistration = async () => {
// // //     if (!registrationId) return;

// // //     try {
// // //       setCanceling(true);
// // //       const { error } = await supabase
// // //         .from("seminar_registrations")
// // //         .delete()
// // //         .eq("id", registrationId);

// // //       if (error) throw error;
// // //       setIsRegistered(false);
// // //       setRegistrationId(null);
// // //       // setParticipantCount((prev) => prev - 1);
// // //        setParticipantCount((prev) => {
// // //          const newCount = prev - 1;
// // //          console.log("Decremented participant count to:", newCount); // Log the new count
// // //          return newCount;
// // //        });
// // //       toast({
// // //         title: "Registration Cancelled",
// // //       });
// // //     } catch (error) {
// // //       console.error("Cancellation Error:", error);
// // //       toast({
// // //         title: "Cancellation Failed",
// // //         variant: "destructive",
// // //       });
// // //     } finally {
// // //       setCanceling(false);
// // //     }
// // //   };

// // //   const formatDate = (dateString: string) => {
// // //     return new Date(dateString).toLocaleDateString("en-US", {
// // //       weekday: "long",
// // //       year: "numeric",
// // //       month: "long",
// // //       day: "numeric",
// // //     });
// // //   };

// // //   const formatTime = (timeString: string) => {
// // //     return new Date(`1970-01-01T${timeString}`).toLocaleTimeString([], {
// // //       hour: "2-digit",
// // //       minute: "2-digit",
// // //     });
// // //   };

// // //   if (showMeeting && seminarId) {
// // //     // if (showMeeting && seminar?.meeting_id) {
// // //     return (
// // //       <div>
// // //         <Header />

// // //         {/* <VideoMeeting
// // //           isHost={isHost}
// // //           apiKey={import.meta.env.VITE_VIDEOSDK_API_KEY}
// // //           // apiKey="8c81aa57-9868-417a-91c2-85006735bb62"
// // //           meetingId={seminarId}
// // //           //meetingId={seminar.meeting_id}
// // //           // meetingId="onx3-qijq-59ne"
// // //           // name={user?.email || "Participant"}
// // //           // name={
// // //           //   userProfile?.first_name && userProfile?.last_name
// // //           //     ? `${userProfile.first_name} ${userProfile.last_name}`
// // //           //     : user?.email || "Participant"
// // //           // }
// // //           name={getDisplayName()}
// // //           onMeetingLeave={handleLeaveMeeting}
// // //           micEnabled={!meetingOptions.disableParticipantMic}
// // //           webcamEnabled={!meetingOptions.disableParticipantVideo}
// // //           // micEnabled={false}
// // //           // webcamEnabled={false}
// // //           containerId="video-container"
// // //           style={{ marginTop: "70px" }}
// // //           meetingTitle={seminar.topic}
// // //         /> */}
// // //         <VideoMeeting
// // //           isHost={isHost}
// // //           apiKey={import.meta.env.VITE_VIDEOSDK_API_KEY}
// // //           meetingId={seminarId}
// // //           sessionId={seminar?.session_id || undefined}
// // //           isRejoining={!!seminar?.session_id}
// // //           name={getDisplayName()}
// // //           onMeetingLeave={handleLeaveMeeting}
// // //           // onMeetingEnd={handleMeetingEnd}
// // //           micEnabled={!meetingOptions.disableParticipantMic}
// // //           webcamEnabled={!meetingOptions.disableParticipantVideo}
// // //           containerId="video-container"
// // //           style={{ marginTop: "70px" }}
// // //           meetingTitle={seminar.topic}
// // //         />
// // //       </div>
// // //     );
// // //   }

// // //   if (loading) {
// // //     return (
// // //       <div className="flex justify-center items-center h-screen">
// // //         <Loader2 className="h-8 w-8 animate-spin" />
// // //       </div>
// // //     );
// // //   }

// // //   if (!seminar) {
// // //     return (
// // //       <div className="flex justify-center items-center h-screen">
// // //         <p>Seminar not found</p>
// // //       </div>
// // //     );
// // //   }

// // //   return (
// // //     <div className="min-h-screen bg-gray-50">
// // //       {/* NEW: Current IST time display */}

// // //       {/* <header className="bg-black/30 backdrop-blur-md border-b border-white/20 sticky top-0 z-50 shadow-xl">
// // //         <div className="container mx-auto px-4 py-4">
// // //           <div className="flex items-center justify-between">
// // //             <div className="flex items-center space-x-2 md:space-x-4">
// // //               <Button
// // //                 variant="outline"
// // //                 onClick={handleBackNavigation}
// // //                 className="text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm p-2 md:px-4 md:py-2"
// // //                 title="Go back"
// // //               >
// // //                 <ArrowLeft className="h-4 w-4 md:mr-2" />
// // //                 <span className="hidden md:inline">Back</span>
// // //               </Button>

// // //               <div className="flex items-center space-x-2">
// // //                 <Link to="/">
// // //                   <img src={logo} alt="Logo" className="h-10 w-100 mr-2" />
// // //                 </Link>
// // //               </div>

// // //               {seminar.meeting_id && (
// // //                 <div className="flex items-center space-x-2 ml-2 md:ml-4">
// // //                   <span className="text-white text-xs md:text-sm bg-white/10 px-2 py-1 md:px-3 md:py-1 rounded-full">
// // //                     {isHost ? "Hosting" : "Joined"}
// // //                   </span>
// // //                 </div>
// // //               )}
// // //             </div>

// // //             <div className="flex items-center space-x-2 md:space-x-4">
// // //               {user ? (
// // //                 <>
// // //                   <div className="hidden lg:flex items-center space-x-4">
// // //                     <span className="text-white text-sm bg-white/10 px-3 py-1 rounded-full">
// // //                       Welcome, {user.email}
// // //                     </span>
// // //                     <Button
// // //                       variant="outline"
// // //                       className="text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm p-2 md:px-4 md:py-2"
// // //                       onClick={onNavigateProfile}
// // //                       title="Profile"
// // //                     >
// // //                       <User className="h-4 w-4 md:mr-2" />
// // //                       <span className="hidden md:inline">Profile</span>
// // //                     </Button>
// // //                   </div>

// // //                   <div className="lg:hidden">
// // //                     <DropdownMenu>
// // //                       <DropdownMenuTrigger asChild>
// // //                         <Button
// // //                           variant="outline"
// // //                           size="icon"
// // //                           className="text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm"
// // //                         >
// // //                           <User className="h-4 w-4" />
// // //                         </Button>
// // //                       </DropdownMenuTrigger>
// // //                       <DropdownMenuContent className="w-56 bg-black/80 backdrop-blur-md border-white/20">
// // //                         <DropdownMenuLabel className="text-white">
// // //                           {user.email}
// // //                         </DropdownMenuLabel>
// // //                         <DropdownMenuSeparator className="bg-white/20" />
// // //                         <DropdownMenuItem
// // //                           className="text-white hover:bg-white/10"
// // //                           onClick={onNavigateProfile}
// // //                         >
// // //                           <User className="mr-2 h-4 w-4" />
// // //                           <span>Profile</span>
// // //                         </DropdownMenuItem>
// // //                       </DropdownMenuContent>
// // //                     </DropdownMenu>
// // //                   </div>
// // //                 </>
// // //               ) : (
// // //                 <>
// // //                   <Link to="/register">
// // //                     <Button
// // //                       variant="outline"
// // //                       className="hidden md:flex text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm"
// // //                     >
// // //                       Register
// // //                     </Button>
// // //                   </Link>

// // //                   <Link to="/">
// // //                     <Button className="bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl transition-all duration-200 p-2 md:px-4 md:py-2">
// // //                       <User className="h-4 w-4 md:mr-2" />
// // //                       <span className="hidden md:inline">Sign In</span>
// // //                     </Button>
// // //                   </Link>
// // //                 </>
// // //               )}

// // //               <Button
// // //                 variant="outline"
// // //                 onClick={onNavigateHome}
// // //                 className="text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm p-2 md:px-4 md:py-2"
// // //                 title="Go to home page"
// // //               >
// // //                 <Home className="h-4 w-4 md:mr-2" />
// // //                 <span className="hidden md:inline">Home</span>
// // //               </Button>
// // //             </div>
// // //           </div>
// // //         </div>
// // //       </header> */}
// // //       <Header seminar={seminar} />

// // //       <div className="container mx-auto px-4 py-8 max-w-4xl">
// // //         {/* UPDATED: Time left display */}
// // //         {/* {timeLeft && (
// // //           <div className="bg-blue-600 text-white py-3 px-4 rounded-lg mb-6 flex items-center">
// // //             <Clock className="h-5 w-5 mr-2" />
// // //             <div className="bg-blue-900 text-white text-center py-2 text-sm font-medium">
// // //               {currentISTTime || "Loading current time..."}
// // //             </div>
// // //             <span className="font-semibold">Time left: {timeLeft}</span>
// // //           </div>
// // //         )} */}
// // //         {/* {seminar.host_country === "India" && timeLeft ? (
// // //           <div className="bg-blue-600 text-white py-3 px-4 rounded-lg mb-6 flex items-center">
// // //             <Clock className="h-5 w-5 mr-2" />
// // //             <span className="font-semibold">{currentISTTime} (India)</span>

// // //             <span className="font-semibold">Time left: {timeLeft} (India)</span>
// // //           </div>
// // //         ) : (
// // //           <div className="bg-gray-200 text-black py-3 px-4 rounded-lg mb-6 flex items-center">
// // //             <Clock className="h-5 w-5 mr-2" />
// // //             <span className="font-semibold">
// // //               Your Country : {seminar.host_country} - Please check the time
// // //               difference manually.
// // //               Time left:{timeLeft} ({seminar.host_country})
// // //             </span>
// // //           </div>
// // //         )} */}

// // //         {/* {timeLeft && seminarStartTime && (
// // //           <div className="bg-blue-600 text-white py-3 px-4 rounded-lg mb-6 flex flex-col md:flex-row items-center justify-between">
// // //             <div className="flex items-center mb-2 md:mb-0">
// // //               <Clock className="h-5 w-5 mr-2" />
// // //               <span className="font-semibold">Time left: {timeLeft}</span>
// // //             </div>

// // //             <div className="flex items-center">
// // //               <CalendarDays className="h-5 w-5 mr-2" />
// // //               <span className="text-sm">
// // //                 Starts: {formatDate(seminar.date)} at {formatTime(seminar.time)}
// // //                 {seminar.host_country && ` (${seminar.host_country} Time)`}
// // //               </span>
// // //             </div>
// // //           </div>
// // //         )} */}
// // //         <Card className="mb-8">
// // //           <CardHeader>
// // //             <div className="flex justify-between items-start">
// // //               <div>
// // //                 <CardTitle className="text-2xl mb-2">{seminar.topic}</CardTitle>
// // //                 <p className="text-gray-600">{seminar.description}</p>
// // //               </div>
// // //               {isRegistered && (
// // //                 <Badge variant="default" className="bg-green-500">
// // //                   <CheckCircle className="h-4 w-4 mr-1" />
// // //                   Registered
// // //                 </Badge>
// // //               )}
// // //             </div>
// // //           </CardHeader>
// // //           <CardContent className="space-y-6">
// // //             <div className="grid md:grid-cols-2 gap-6">
// // //               <div className="space-y-4">
// // //                 <div className="flex items-center gap-3">
// // //                   <User className="h-5 w-5 text-blue-600" />
// // //                   <div>
// // //                     <p className="font-medium">Host</p>
// // //                     <p className="text-gray-600">{seminar.host_name}</p>
// // //                   </div>
// // //                 </div>

// // //                 <div className="flex items-center gap-3">
// // //                   <CalendarDays className="h-5 w-5 text-blue-600" />
// // //                   <div>
// // //                     <p className="font-medium">Date</p>
// // //                     <p className="text-gray-600">{formatDate(seminar.date)}</p>
// // //                   </div>
// // //                 </div>

// // //                 <div className="flex items-center gap-3">
// // //                   <Clock className="h-5 w-5 text-blue-600" />
// // //                   <div>
// // //                     <p className="font-medium">Time</p>
// // //                     <p className="text-gray-600">{formatTime(seminar.time)}</p>
// // //                   </div>
// // //                 </div>
// // //               </div>

// // //               <div className="space-y-4">
// // //                 <div className="flex items-center gap-3">
// // //                   <Users className="h-5 w-5 text-blue-600" />
// // //                   <div>
// // //                     <p className="font-medium">Speakers</p>
// // //                     <p className="text-gray-600">
// // //                       {speakers.length} speaker(s)
// // //                     </p>
// // //                   </div>
// // //                 </div>
// // //                 <div className="flex items-center gap-3">
// // //                   <Globe className="h-5 w-5 text-blue-600" />
// // //                   <div>
// // //                     <p className="font-medium">Host Country</p>
// // //                     <p className="text-gray-600">{seminar.host_country}</p>
// // //                   </div>
// // //                 </div>

// // //               </div>
// // //             </div>
// // //             {isHost && (
// // //               <div className="mt-6">
// // //                 <Card>
// // //                   <CardHeader>
// // //                     <CardTitle>
// // //                       Registered Participants
// // //                     </CardTitle>
// // //                   </CardHeader>
// // //                   <CardContent>
// // //                     {/* You could add a list of participants here if needed */}
// // //                     <p className="text-gray-600">
// // //                       Total registrations: {participantCount}
// // //                     </p>
// // //                   </CardContent>
// // //                 </Card>
// // //               </div>
// // //             )}

// // //             {!isHost && user && (
// // //               <div className="flex justify-center pt-4">
// // //                 <Button
// // //                   onClick={
// // //                     isRegistered ? handleCancelRegistration : handleRegister
// // //                   }
// // //                   // onClick={() => {
// // //                   //   mixpanelInstance.track(
// // //                   //     " handle Register view seminer Button Clicked",
// // //                   //     {
// // //                   //       timestamp: new Date().toISOString(),
// // //                   //     }
// // //                   //   );
// // //                   //   isRegistered ? handleCancelRegistration : handleRegister;
// // //                   // }}
// // //                   disabled={registering || canceling}
// // //                   className="bg-blue-600 hover:bg-blue-700 px-8 py-3 text-lg"
// // //                 >
// // //                   {registering
// // //                     ? "Registering..."
// // //                     : canceling
// // //                     ? "Cancelling..."
// // //                     : isRegistered
// // //                     ? "Cancel Registration"
// // //                     : "Register for Seminar"}
// // //                 </Button>
// // //               </div>
// // //             )}
// // //           </CardContent>
// // //         </Card>
// // //         <Card>
// // //           <CardHeader>
// // //             <CardTitle>Speakers</CardTitle>
// // //             <p className="text-gray-600">
// // //               Meet the experts who will be presenting at this seminar
// // //             </p>
// // //           </CardHeader>
// // //           <CardContent>
// // //             {speakers.length === 0 ? (
// // //               <p className="text-gray-600 text-center py-8">
// // //                 No speakers added yet.
// // //               </p>
// // //             ) : (
// // //               <div className="grid md:grid-cols-2 gap-6">
// // //                 {speakers.map((speaker) => (
// // //                   <Card key={speaker.id}>
// // //                     <CardContent className="p-4">
// // //                       <h3 className="font-semibold text-lg mb-2">
// // //                         {speaker.name}
// // //                       </h3>
// // //                       <div className="space-y-1">
// // //                         <p className="text-sm text-gray-600">
// // //                           <span className="font-medium">Qualification:</span>{" "}
// // //                           {speaker.qualification}
// // //                         </p>
// // //                         <p className="text-sm text-gray-600">
// // //                           <span className="font-medium">Department:</span>{" "}
// // //                           {speaker.department}
// // //                         </p>
// // //                       </div>
// // //                     </CardContent>
// // //                   </Card>
// // //                 ))}
// // //               </div>
// // //             )}
// // //           </CardContent>
// // //         </Card>
// // //         <Card className="mt-8">
// // //           <CardHeader>
// // //             <CardTitle>Live Meeting</CardTitle>
// // //             <p className="text-gray-600">Join the live seminar session</p>
// // //           </CardHeader>
// // //           {/* <CardContent>
// // //             <div className="space-y-4">
// // //               {(seminar.meeting_id || isHost) && (
// // //                 <div className="text-center py-4 space-y-4">
// // //                   {!isHost &&
// // //                     (!seminar?.is_host_joined ? (
// // //                       <p className="text-sm text-gray-600">
// // //                         <h5>The Host is not available.</h5>
// // //                       </p>
// // //                     ) : (
// // //                       <p className="text-sm text-green-600">
// // //                         <h5>The Host is available.</h5>
// // //                       </p>
// // //                     ))}

// // //                   <div className="flex justify-center items-center gap-2">
// // //                     {(isHost || seminar?.meeting_id) && (
// // //                       <Button
// // //                         onClick={handleJoinMeeting}
// // //                         disabled={creatingMeeting}
// // //                         className="bg-blue-600 hover:bg-blue-700 px-8 py-3 text-lg"
// // //                       >
// // //                         {creatingMeeting ? (
// // //                           <>
// // //                             <Loader2 className="mr-2 h-4 w-4 animate-spin" />
// // //                             {isHost ? "Starting..." : "Joining..."}
// // //                           </>
// // //                         ) : isHost ? (
// // //                           "Start Meeting"
// // //                         ) : (
// // //                           "Join Meeting"
// // //                         )}
// // //                       </Button>
// // //                     )}
// // //                   </div>

// // //                   {!isHost && seminar?.is_host_joined && !isRegistered && (
// // //                     <p className="text-sm text-gray-600">
// // //                       You must register for the seminar before joining the
// // //                       meeting
// // //                     </p>
// // //                   )}
// // //                 </div>
// // //               )}
// // //             </div>
// // //           </CardContent> */}

// // //           <CardContent>
// // //             <div className="space-y-4">
// // //               {timeLeft &&
// // //               seminarStartTime &&
// // //               seminar.host_country === "India" &&
// // //               timeLeft ? (
// // //                 <div className="bg-blue-600 text-white py-3 px-4 rounded-lg mb-6 flex flex-col md:flex-row items-center justify-between">
// // //                   <div className="flex items-center mb-2 md:mb-0">
// // //                     <Clock className="h-5 w-5 mr-2" />
// // //                     <span className="font-semibold">Time left: {timeLeft}</span>
// // //                   </div>

// // //                   <div className="flex items-center">
// // //                     <CalendarDays className="h-5 w-5 mr-2" />
// // //                     <span className="text-sm">
// // //                       Starts: {formatDate(seminar.date)} at{" "}
// // //                       {formatTime(seminar.time)}
// // //                       {seminar.host_country &&
// // //                         ` (${seminar.host_country} Time)`}
// // //                     </span>
// // //                   </div>
// // //                 </div>
// // //               ) : (
// // //                 <span className="font-semibold">
// // //                   Your Country: {seminar.host_country} — Please check the time
// // //                   difference manually.
// // //                 </span>
// // //               )}
// // //             </div>
// // //             <div className="space-y-4">
// // //               {(seminar.meeting_id || isHost) && (
// // //                 <div className="text-center py-4 space-y-4">
// // //                   {isHost ? (
// // //                     <p className="text-sm text-blue-500">
// // //                       You are hosting this seminar
// // //                     </p>
// // //                   ) : seminar?.is_host_joined ? (
// // //                     <p className="text-sm text-green-600">
// // //                       Host is available to join
// // //                     </p>
// // //                   ) : (
// // //                     <p className="text-sm text-yellow-600">
// // //                       Host has not joined yet
// // //                     </p>
// // //                   )}

// // //                   {/* <div className="flex justify-center">
// // //                     <Button
// // //                       onClick={handleJoinMeeting}
// // //                       // disabled={creatingMeeting || (isHost && isSeminarPast)}
// // //                       disabled={
// // //                         creatingMeeting || (isHost && isJoinButtonDisabled)
// // //                       }
// // //                       // disable={}
// // //                       className={`px-8 py-3 text-lg ${
// // //                         isHost
// // //                           ? "bg-green-600 hover:bg-green-700"
// // //                           : "bg-blue-600 hover:bg-blue-700"
// // //                       }`}
// // //                     >
// // //                       {creatingMeeting ? (
// // //                         <>
// // //                           <Loader2 className="mr-2 h-4 w-4 animate-spin" />
// // //                           {isHost ? "Starting..." : "Joining..."}
// // //                         </>
// // //                       ) : isHost ? (
// // //                         isJoinButtonDisabled ? (
// // //                           // isSeminarPast ? (
// // //                           "Meeting Expired"
// // //                         ) : (
// // //                           {isHost && seminar?.is_host_joined && (
// // //                     <MeetingOptions
// // //                       isHost={isHost}
// // //                       isHostJoined={seminar?.is_host_joined}
// // //                       onOptionsChange={setMeetingOptions}
// // //                     />
// // //                   )}
// // //                           "Start Meeting"
// // //                         )
// // //                       ) : (
// // //                         "Join Meeting"
// // //                       )}
// // //                     </Button>
// // //                   </div> */}
// // //                   <div className="flex justify-center">
// // //                     {isHost ? (
// // //                       <Dialog>
// // //                         <DialogTrigger asChild>
// // //                           <Button
// // //                             disabled={creatingMeeting || isJoinButtonDisabled}
// // //                             className={`px-8 py-3 text-lg bg-green-600 hover:bg-green-700`}
// // //                           >
// // //                             {isJoinButtonDisabled
// // //                               ? "Meeting Expired"
// // //                               : "Start Meeting"}
// // //                           </Button>
// // //                         </DialogTrigger>
// // //                         <DialogContent>
// // //                           <DialogHeader>
// // //                             <DialogTitle>Meeting Options</DialogTitle>
// // //                           </DialogHeader>
// // //                           <div className="space-y-4 py-4">
// // //                             <div className="flex items-center justify-between">
// // //                               <Label htmlFor="disable-mic">
// // //                                 Disable Participants Mic
// // //                               </Label>
// // //                               <Switch
// // //                                 id="disable-mic"
// // //                                 checked={meetingOptions.disableParticipantMic}
// // //                                 onCheckedChange={(checked) =>
// // //                                   setMeetingOptions((prev) => ({
// // //                                     ...prev,
// // //                                     disableParticipantMic: checked,
// // //                                   }))
// // //                                 }
// // //                               />
// // //                             </div>
// // //                             <div className="flex items-center justify-between">
// // //                               <Label htmlFor="disable-video">
// // //                                 Disable Participants Video
// // //                               </Label>
// // //                               <Switch
// // //                                 id="disable-video"
// // //                                 checked={meetingOptions.disableParticipantVideo}
// // //                                 onCheckedChange={(checked) =>
// // //                                   setMeetingOptions((prev) => ({
// // //                                     ...prev,
// // //                                     disableParticipantVideo: checked,
// // //                                   }))
// // //                                 }
// // //                               />
// // //                             </div>
// // //                           </div>
// // //                           <DialogFooter>
// // //                             <Button
// // //                               onClick={() => {
// // //                                 mixpanelInstance.track(
// // //                                   " Start Meeting view seminer Button Clicked",
// // //                                   {
// // //                                     timestamp: new Date().toISOString(),
// // //                                   }
// // //                                 );
// // //                                 handleJoinMeeting();
// // //                               }}
// // //                               // onClick={() => {
// // //                               //   handleJoinMeeting();
// // //                               // }}
// // //                               className="bg-green-600 hover:bg-green-700"
// // //                             >
// // //                               Start Meeting
// // //                             </Button>
// // //                           </DialogFooter>
// // //                         </DialogContent>
// // //                       </Dialog>
// // //                     ) : (
// // //                       <Button
// // //                         // onClick={() => {
// // //                         //   mixpanelInstance.track(
// // //                         //     " Join Meeting view seminer Button Clicked",
// // //                         //     {
// // //                         //       timestamp: new Date().toISOString(),
// // //                         //     }
// // //                         //   );
// // //                         //   handleJoinMeeting();
// // //                         // }}
// // //                         onClick={handleJoinMeeting}
// // //                         disabled={creatingMeeting}
// // //                         className="px-8 py-3 text-lg bg-blue-600 hover:bg-blue-700"
// // //                       >
// // //                         {creatingMeeting ? (
// // //                           <>
// // //                             <Loader2 className="mr-2 h-4 w-4 animate-spin" />
// // //                             Joining...
// // //                           </>
// // //                         ) : (
// // //                           "Join Meeting"
// // //                         )}
// // //                       </Button>
// // //                     )}
// // //                   </div>

// // //                   {/* NEW: Additional meeting info */}
// // //                   {/* {seminar.meeting_id && !isHost && (
// // //                     <div className="mt-4 text-sm">
// // //                       <p className="text-gray-600 mb-2">
// // //                         Meeting ID: {seminar.meeting_id}
// // //                       </p>
// // //                       <Button
// // //                         variant="outline"
// // //                         size="sm"
// // //                         onClick={() => {
// // //                           navigator.clipboard.writeText(seminar.meeting_id!);
// // //                           toast({ title: "Meeting ID copied!" });
// // //                         }}
// // //                       >
// // //                         <Copy className="h-4 w-4 mr-2" />
// // //                         Copy Meeting ID
// // //                       </Button>
// // //                     </div>
// // //                   )} */}
// // //                 </div>
// // //               )}
// // //             </div>
// // //           </CardContent>
// // //         </Card>
// // //       </div>
// // //       <Footer />
// // //     </div>
// // //   );
// // // };

// // // export default SeminarDetails;

// // import React, { useEffect, useState } from 'react'

// // const SeminarDetails = () => {
// //   const [count, setCount] = useState<number>(0);

// //   useEffect(() => {
// //     // Get the existing count from localStorage on first render
// //     const storedCount = localStorage.getItem("fixedClickCount");
// //     if (storedCount) {
// //       setCount(Number(storedCount));
// //     }
// //   }, []);

// //   const handleClick = () => {
// //     const newCount = count + 1;
// //     setCount(newCount);
// //     localStorage.setItem("fixedClickCount", newCount.toString());
// //   };

// //   return (
// //     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
// //       <h1 className="text-2xl font-bold mb-4">Click Count Tracker</h1>
// //       <p className="text-lg mb-2">Total Clicks: {count}</p>
// //       <button
// //         onClick={handleClick}
// //         className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
// //       >
// //         Click to Add Count
// //       </button>
// //     </div>
// //   );

// // };

// // export default SeminarDetails

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
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
//   DialogFooter,
// } from "@/components/ui/dialog";
// import { Switch } from "@/components/ui/switch";
// import { Label } from "@/components/ui/label";
// import Header from "@/footer/Header1";
// import { mixpanelInstance } from "@/utils/mixpanel";
// import { SocialShareButtons } from "./SocialShareButtons";
// import { Helmet } from "react-helmet-async";

// interface Seminar {
//   id: string;
//   host_name: string;
//   topic: string;
//   description: string;
//   date: string;
//   time: string;
//   host_id: string;
//   meeting_id?: string | null;
//   session_id?: string | null;
//   host_country?: string | null;
//   is_host_joined: boolean;
// }

// interface Speaker {
//   id: string;
//   name: string;
//   qualification: string;
//   department: string;
// }
// interface ParticipantProfile {
//   id: string;
//   name: string;
//   // email: string;
//   gender: string;
//   dob: string;
//   certificate_download: boolean;
// }
// interface Participant {
//   id: string;
//   first_name: string;
//   last_name: string;
//   gender: string;
//   date_of_birth: string; // 👈 Add this
// }

// const SeminarDetails = () => {
//   const { seminarId, slug } = useParams();
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
//   // const [localTime, setLocalTime] = useState<string>("");
//   // const [hostTime, setHostTime] = useState<string>("");
//   // const [isSeminarPast, setIsSeminarPast] = useState(false);
//   const [seminarStartTime, setSeminarStartTime] = useState<Date | null>(null);
//   const [isJoinButtonDisabled, setIsJoinButtonDisabled] = useState(true);

//   // NEW: State for current time in host's timezone
//   const [hostCurrentTime, setHostCurrentTime] = useState<Date | null>(null);
//   // NEW: State for current IST time
//   const [currentISTTime, setCurrentISTTime] = useState("");
//   const [participantProfiles, setParticipantProfiles] = useState<
//     ParticipantProfile[]
//   >([]);
//   const [userProfile, setUserProfile] = useState<any>(null);
//   const supabaseAnonKey = import.meta.env.VITE_VIDEOSDK_TOKEN;
//   const [seminarEndTime, setSeminarEndTime] = useState<Date | null>(null);
//   const [meetingOptions, setMeetingOptions] = useState({
//     disableParticipantMic: false,
//     disableParticipantVideo: false,
//   });
//   const handleBackNavigation = () => {
//     navigate(-1);
//   };

//   const onNavigateProfile = () => {
//     navigate("/profile");
//   };

//   const onNavigateHome = () => {
//     navigate("/");
//   };
//   // State to store selected participants
//   const [selectedProfiles, setSelectedProfiles] = useState<string[]>([]);

//   // Handle checkbox toggle
//   const handleCheckboxChange = (id: string) => {
//     setSelectedProfiles((prev) =>
//       prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id]
//     );
//   };

//   const [participantCount, setParticipantCount] = useState<number>(0);
//   const createSlug = (str: string) => {
//     return str
//       .toLowerCase()
//       .replace(/[^a-z0-9 -]/g, "")
//       .replace(/\s+/g, "-")
//       .replace(/-+/g, "-");
//   };
//   // const fetchParticipantCount = async () => {
//   //   if (!seminarId) return;
//   //   const { count, error } = await supabase
//   //     .from("seminar_registrations")
//   //     .select("*", { count: "exact", head: true })
//   //     .eq("seminar_id", seminarId);
//   //   if (!error) setParticipantCount(count || 0);
//   // };
//   // const fetchParticipantProfiles = async () => {
//   //   if (!seminarId) return;

//   //   try {
//   //     const { data, error } = await supabase
//   //       .from("seminar_registrations")
//   //       .select(
//   //         `
//   //         id,
//   //         profiles:user_id (
//   //           id,
//   //           first_name,
//   //           last_name,
//   //           email,
//   //           gender,
//   //           date_of_birth
//   //         )
//   //       `
//   //       )
//   //       .eq("seminar_id", seminarId);

//   //     if (error) {
//   //       console.error("Error fetching participant profiles:", error);
//   //       return;
//   //     }

//   //     // Transform the data to match our ParticipantProfile interface
//   //     const profiles = data
//   //       .filter((item) => item.profiles !== null)
//   //       .map((item) => ({
//   //         id: item.profiles.id,
//   //         name: `${item.profiles.first_name || ""} ${
//   //           item.profiles.last_name || ""
//   //         }`.trim(),
//   //         email: item.profiles.email,
//   //         gender: item.profiles.gender || "Not specified",
//   //         dob: item.profiles.date_of_birth || "Not specified",
//   //       }));

//   //     setParticipantProfiles(profiles);
//   //   } catch (error) {
//   //     console.error("Error in fetchParticipantProfiles:", error);
//   //   }
//   // };
//   // const fetchParticipantProfiles = async () => {
//   //   if (!seminarId) return;

//   //   try {
//   //     const { data, error } = await supabase
//   //       .from("seminar_registrations")
//   //       .select(
//   //         `
//   //       id,
//   //       profiles:user_id (
//   //         id,
//   //         first_name,
//   //         last_name,
//   //         gender,
//   //         date_of_birth
//   //       )
//   //     `
//   //       )
//   //       .eq("seminar_id", seminarId);

//   //     if (error) {
//   //       console.error("Error fetching participant profiles:", error);
//   //       return;
//   //     }

//   //     // Transform the data to match our ParticipantProfile interface
//   //     const profiles = data
//   //       .filter((item) => item.profiles !== null)
//   //       .map((item) => ({
//   //         id: item.profiles.id,
//   //         name: `${item.profiles.first_name || ""} ${
//   //           item.profiles.last_name || ""
//   //         }`.trim(),
//   //         gender: item.profiles.gender || "Not specified",
//   //         dob: item.profiles.date_of_birth || "Not specified",
//   //       }));

//   //     setParticipantProfiles(profiles);
//   //   } catch (error) {
//   //     console.error("Error in fetchParticipantProfiles:", error);
//   //   }
//   // };
//   const fetchParticipantProfiles = async () => {
//     if (!seminarId) return;

//     try {
//       // First, let's check the actual structure of your seminar_registrations table
//       const { data: registrations, error: registrationsError } = await supabase
//         .from("seminar_registrations")
//         .select("user_id,certificate_download")
//         .eq("seminar_id", seminarId);

//       if (registrationsError) {
//         console.error("Error fetching registrations:", registrationsError);
//         return;
//       }

//       console.log("Registrations found:", registrations);

//       if (registrations && registrations.length > 0) {
//         // Get all user IDs from registrations
//         const userIds = registrations
//           .map((reg) => reg.user_id)
//           .filter((id) => id);

//         if (userIds.length > 0) {
//           // Fetch user profiles directly from profiles table
//           const { data: profilesData, error: profilesError } = await supabase
//             .from("profiles")
//             .select("id, first_name, last_name, gender, date_of_birth")
//             .in("id", userIds);

//           if (profilesError) {
//             console.error("Error fetching profiles:", profilesError);
//             return;
//           }

//           console.log("Profiles data:", profilesData);

//           // Transform the data to match our ParticipantProfile interface
//           const profiles: ParticipantProfile[] = (profilesData || []).map(
//             // (profile) => ({
//             //   id: profile.id,
//             //   name: `${profile.first_name || ""} ${
//             //     profile.last_name || ""
//             //   }`.trim(),
//             //   gender: profile.gender || "Not specified",
//             //   dob: profile.date_of_birth || "Not specified",
//             //                 certificate_download: registration?.certificate_download || false, /
//             // })
//             (profile) => {
//               // Find the registration for this user to get certificate_download status
//               const registration = registrations.find(
//                 (reg) => reg.user_id === profile.id
//               );

//               return {
//                 id: profile.id,
//                 name: `${profile.first_name || ""} ${
//                   profile.last_name || ""
//                 }`.trim(),
//                 gender: profile.gender || "Not specified",
//                 dob: profile.date_of_birth || "Not specified",
//                 certificate_download:
//                   registration?.certificate_download || false, // Add this
//               };
//             }
//           );

//           setParticipantProfiles(profiles);
//         } else {
//           console.log("No user IDs found in registrations");
//           setParticipantProfiles([]);
//         }
//       } else {
//         console.log("No registrations found for this seminar");
//         setParticipantProfiles([]);
//       }
//     } catch (error) {
//       console.error("Error in fetchParticipantProfiles:", error);
//     }
//   };

//   const fetchParticipantCount = async () => {
//     if (!seminarId) return;
//     const { count, error } = await supabase
//       .from("seminar_registrations")
//       .select("*", { count: "exact", head: true })
//       .eq("seminar_id", seminarId);
//     if (!error) setParticipantCount(count || 0);
//   };
//   const handleConfirmCertificate = async (participantIds: string[]) => {
//     try {
//       // Update certificate_download status in the database
//       const { error } = await supabase
//         .from("seminar_registrations")
//         .update({ certificate_download: true })
//         .in("user_id", participantIds)
//         .eq("seminar_id", seminarId);

//       if (error) throw error;

//       // Update local state
//       setParticipantProfiles((prev) =>
//         prev.map((profile) =>
//           participantIds.includes(profile.id)
//             ? { ...profile, certificate_download: true }
//             : profile
//         )
//       );

//       toast({
//         title: "Certificate Confirmed",
//         description: `Certificate confirmed for ${participantIds.length} participant(s)`,
//       });
//     } catch (error) {
//       console.error("Error confirming certificate:", error);
//       toast({
//         title: "Error",
//         description: "Failed to confirm certificate",
//         variant: "destructive",
//       });
//     }
//   };

//   // useEffect(() => {
//   //   if (!seminar) {
//   //     console.log("Seminar data not available yet.");
//   //     return;
//   //   }

//   //   const seminarDateTime = new Date(`${seminar.date}T${seminar.time}`);
//   //   console.log("Parsed Seminar DateTime (local):", seminarDateTime);
//   //   setSeminarStartTime(seminarDateTime);

//   //   const timer = setInterval(() => {
//   //     const now = new Date();
//   //     console.log("Current Local Time:", now);
//   //     setHostCurrentTime(now);

//   //     const diffMs = seminarDateTime.getTime() - now.getTime();
//   //     console.log("Time difference in ms:", diffMs);

//   //     if (diffMs <= 0) {
//   //       console.log("Seminar has already started.");
//   //       setTimeLeft("Seminar has started");

//   //       // ✅ Enable the join button once time has passed
//   //       setIsJoinButtonDisabled(false);
//   //       return;
//   //     } else {
//   //       setIsJoinButtonDisabled(true);
//   //     }

//   //     const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
//   //     const hours = Math.floor(
//   //       (diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
//   //     );
//   //     const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
//   //     const seconds = Math.floor((diffMs % (1000 * 60)) / 1000);

//   //     setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
//   //   }, 1000);

//   //   return () => {
//   //     console.log("Clearing countdown interval");
//   //     clearInterval(timer);
//   //   };
//   // }, [seminar]);

//   useEffect(() => {
//     if (!seminar) {
//       console.log("Seminar data not available yet.");
//       return;
//     }

//     const seminarDateTime = new Date(`${seminar.date}T${seminar.time}`);
//     console.log("Parsed Seminar DateTime (local):", seminarDateTime);
//     setSeminarStartTime(seminarDateTime);

//     const seminarEndTime = new Date(seminarDateTime.getTime() + 60 * 60 * 1000); // Add 1 hour
//     const endTime = new Date(seminarDateTime.getTime() + 60 * 60 * 1000);
//     setSeminarEndTime(endTime);

//     const timer = setInterval(() => {
//       const now = new Date();
//       console.log("Current Local Time:", now);
//       setHostCurrentTime(now);

//       // If seminar has ended (1 hour passed)
//       if (now >= endTime) {
//         console.log("Seminar has ended (1 hour window passed)");
//         setTimeLeft("Seminar has ended");
//         setIsJoinButtonDisabled(true);
//         return;
//       }

//       const diffMs = seminarDateTime.getTime() - now.getTime();
//       console.log("Time difference in ms:", diffMs);

//       if (diffMs <= 0) {
//         console.log("Seminar has started.");
//         setTimeLeft("Seminar has started");
//         setIsJoinButtonDisabled(false); // Enable button when seminar starts
//         return;
//       } else {
//         setIsJoinButtonDisabled(true); // Disable before seminar starts
//       }

//       const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
//       const hours = Math.floor(
//         (diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
//       );
//       const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
//       const seconds = Math.floor((diffMs % (1000 * 60)) / 1000);

//       setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
//     }, 1000);

//     return () => {
//       console.log("Clearing countdown interval");
//       clearInterval(timer);
//     };
//   }, [seminar]);

//   const getDisplayName = () => {
//     if (userProfile?.first_name && userProfile?.last_name) {
//       return `${userProfile.first_name} ${userProfile.last_name}`;
//     } else if (user?.email) {
//       return user.email;
//     } else {
//       return "Participant";
//     }
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       // try {
//       //   // Get user session
//       //   const {
//       //     data: { session },
//       //   } = await supabase.auth.getSession();
//       //   setUser(session?.user || null);

//       //   // Fetch seminar details
//       //   const { data: seminarData, error: seminarError } = await supabase
//       //     .from("seminars")
//       //     .select("*")
//       //     .eq("id", seminarId)
//       //     .single();

//       //   console.log("✅ Host Joined Status:", seminarData.is_host_joined);
//       //   if (seminarError) throw seminarError;
//       //   // Redirect to proper slug URL if needed
//       //   if (seminarData && (!slug || slug !== createSlug(seminarData.topic))) {
//       //     navigate(`/seminar/${createSlug(seminarData.topic)}/${seminarId}`, {
//       //       replace: true,
//       //     });
//       //     return;
//       //   }
//       //   setSeminar(seminarData);
//       try {
//         const {
//           data: { session },
//         } = await supabase.auth.getSession();
//         setUser(session?.user || null);

//         const { data: seminarData, error: seminarError } = await supabase
//           .from("seminars")
//           .select("*")
//           .eq("id", seminarId)
//           .single();

//         if (seminarError) throw seminarError;

//         // Redirect if slug mismatch
//         if (seminarData && (!slug || slug !== createSlug(seminarData.topic))) {
//           navigate(`/seminar/${createSlug(seminarData.topic)}/${seminarId}`, {
//             replace: true,
//           });
//           return;
//         }

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

//         if (session?.user) {
//           const { data: profileData, error: profileError } = await supabase
//             .from("profiles")
//             .select("*")
//             .eq("id", session.user.id)
//             .single();

//           if (!profileError && profileData) {
//             setUserProfile(profileData);
//           }
//         }
//         await fetchParticipantCount();

//         // Fetch participant profiles if user is host of this seminar
//         if (session?.user && session.user.id === seminarData.host_id) {
//           await fetchParticipantProfiles();
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
//     fetchParticipantCount();
//     if (isHost) {
//       fetchParticipantProfiles();
//     }
//   }, [seminarId, slug, navigate, toast]);

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

//   const handleJoinMeeting = async () => {
//     // For participants
//     if (!isHost) {
//       if (!seminarId) {
//         // if (!seminar?.meeting_id) {
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
//       // NEW: Check if seminar has started
//       if (seminarStartTime && seminarStartTime > new Date()) {
//         toast({
//           title: "Meeting Not Started",
//           description: "Seminar has not started yet",
//           variant: "destructive",
//         });
//         // setShowMeeting(true);
//         return;
//       }

//       // Join existing meeting
//       setShowMeeting(true);
//       return;
//     }

//     // For hosts
//     try {
//       setCreatingMeeting(true);
//       // const newMeetingId = uuidv4();
//       // const meetingIdToUse = seminar?.meeting_id || seminarId;

//       // // Create new meeting if needed
//       // const { data, error } = await supabase
//       //   .from("seminars")
//       //   .update({
//       //     is_host_joined: true,
//       //     // meeting_id: meetingIdToUse,
//       //     meeting_id: seminarId,
//       //     // meeting_id: newMeetingId,
//       //   } as Seminar)
//       //   .eq("id", seminarId)
//       //   .select()
//       //   .single();

//       // console.log("✅ is_host_joined after update:", data?.is_host_joined);
//       // console.log("Supabase Error (if any):", error);

//       // if (error) throw error;

//       // // Update local state
//       // setSeminar((prev) =>
//       //   prev
//       //     ? {
//       //         ...prev,
//       //         // meeting_id: meetingIdToUse,
//       //         meeting_id: seminarId,
//       //         // meeting_id: newMeetingId,
//       //         is_host_joined: true,
//       //       }
//       //     : null
//       // );
//       if (!seminar?.meeting_id) {
//         // First time host is joining - create meeting
//         const { data, error } = await supabase
//           .from("seminars")
//           .update({
//             is_host_joined: true,
//             meeting_id: seminarId, // Use seminarId as meetingId
//             session_id: seminar?.session_id || uuidv4(),
//           })
//           .eq("id", seminarId)
//           .select()
//           .single();

//         if (error) throw error;

//         setSeminar((prev) =>
//           prev
//             ? {
//                 ...prev,
//                 meeting_id: seminarId,
//                 is_host_joined: true,
//               }
//             : null
//         );
//       } else {
//         // Meeting already exists - just update host joined status
//         const { error } = await supabase
//           .from("seminars")
//           .update({
//             is_host_joined: true,
//           })
//           .eq("id", seminarId);

//         if (error) throw error;

//         setSeminar((prev) => (prev ? { ...prev, is_host_joined: true } : null));
//       }

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
//     console.log("kkkkkkkk", setShowMeeting(false));
//     setShowMeeting(false);
//   };
//   const handleMeetingEnd = async () => {
//     try {
//       // Update seminar status when host ends meeting
//       const { error } = await supabase
//         .from("seminars")
//         .update({
//           is_host_joined: false,
//           // Keep the same meeting_id for future rejoins
//         })
//         .eq("id", seminarId);

//       if (error) throw error;

//       setSeminar((prev) => (prev ? { ...prev, is_host_joined: false } : null));

//       setShowMeeting(false);
//       toast({
//         title: "Meeting Ended",
//         description: "The meeting has been ended successfully",
//       });
//     } catch (error) {
//       console.error("Error ending meeting:", error);
//       toast({
//         title: "Error",
//         description: "Failed to end meeting",
//         variant: "destructive",
//       });
//     }
//   };

//   // const handleRegister = async () => {
//   //   if (!user || !seminarId) return;

//   //   try {
//   //     setRegistering(true);
//   //     const { data, error } = await supabase
//   //       .from("seminar_registrations")
//   //       .insert({
//   //         seminar_id: seminarId,
//   //         user_id: user.id,
//   //       })
//   //       .select()
//   //       .single();

//   //     if (error) throw error;
//   //     setIsRegistered(true);
//   //     setRegistrationId(data.id);
//   //     toast({
//   //       title: "Registered",
//   //       description: "You are now registered for this seminar",
//   //     });
//   //   } catch (error) {
//   //     console.error("Registration Error:", error);
//   //     toast({
//   //       title: "Registration Failed",
//   //       variant: "destructive",
//   //     });
//   //   } finally {
//   //     setRegistering(false);
//   //   }
//   // };
//   const handleRegister = async () => {
//     // if (!user || !seminarId || !seminar) return;
//     if (!user || !seminarId || !seminar) {
//       toast({
//         title: "Registration Required",
//         description: "You must register for the seminar before joining",
//         variant: "destructive",
//       });
//       return;
//     }
//     try {
//       setRegistering(true);

//       // First, register the user for the seminar
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
//       console.log("Registration ID:", data.id);
//       setParticipantCount((prev) => {
//         const newCount = prev + 1;
//         console.log("Incremented participant count to:", newCount); // Log the new count
//         return newCount;
//       });
//       setParticipantCount((prev) => Math.max(prev - 1));

//       // Send confirmation email
//       const emailResponse = await fetch(
//         `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-email`,
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${supabaseAnonKey}`,
//           },
//           body: JSON.stringify({
//             email: user.email,
//             subject: `Seminar Registration Confirmation: ${seminar.topic}`,
//             message: `Dear Participant,<br><br>
// You have successfully registered for the following seminar:<br><br>
// <strong>Topic:</strong> ${seminar.topic}<br>
// <strong>Date:</strong> ${formatDate(seminar.date)}<br>
// <strong>Time:</strong> ${formatTime(seminar.time)}<br>
// <strong>Host:</strong> ${seminar.host_name}<br><br>

// <strong>Preparation Checklist:</strong><br>
// - Please Login 15 minutes early to set up<br>
// - Test your audio/video equipment beforehand<br>
// - Review the seminar description:<br>
// ${seminar.description}<br><br>

// Looking forward to seeing you at the seminar!<br><br>

// Best regards,<br>
// The Seminar Team`,
//           }),
//         }
//       );

//       if (!emailResponse.ok) {
//         throw new Error("Failed to send confirmation email");
//       }

//       toast({
//         title: "Registered",
//         description:
//           "You are now registered for this seminar. A confirmation email has been sent.",
//       });
//     } catch (error) {
//       console.error("Registration Error:", error);
//       toast({
//         title: "Registration Failed",
//         description:
//           error instanceof Error ? error.message : "An error occurred",
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
//       // setParticipantCount((prev) => prev - 1);
//       setParticipantCount((prev) => {
//         const newCount = prev - 1;
//         console.log("Decremented participant count to:", newCount); // Log the new count
//         return newCount;
//       });
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

//   if (showMeeting && seminarId) {
//     // if (showMeeting && seminar?.meeting_id) {
//     return (
//       <div>
//         <Header />

//         {/* <VideoMeeting
//           isHost={isHost}
//           apiKey={import.meta.env.VITE_VIDEOSDK_API_KEY}
//           // apiKey="8c81aa57-9868-417a-91c2-85006735bb62"
//           meetingId={seminarId}
//           //meetingId={seminar.meeting_id}
//           // meetingId="onx3-qijq-59ne"
//           // name={user?.email || "Participant"}
//           // name={
//           //   userProfile?.first_name && userProfile?.last_name
//           //     ? `${userProfile.first_name} ${userProfile.last_name}`
//           //     : user?.email || "Participant"
//           // }
//           name={getDisplayName()}
//           onMeetingLeave={handleLeaveMeeting}
//           micEnabled={!meetingOptions.disableParticipantMic}
//           webcamEnabled={!meetingOptions.disableParticipantVideo}
//           // micEnabled={false}
//           // webcamEnabled={false}
//           containerId="video-container"
//           style={{ marginTop: "70px" }}
//           meetingTitle={seminar.topic}
//         /> */}
//         <VideoMeeting
//           isHost={isHost}
//           apiKey={import.meta.env.VITE_VIDEOSDK_API_KEY}
//           meetingId={seminarId}
//           sessionId={seminar?.session_id || undefined}
//           isRejoining={!!seminar?.session_id}
//           name={getDisplayName()}
//           onMeetingLeave={handleLeaveMeeting}
//           // onMeetingEnd={handleMeetingEnd}
//           micEnabled={!meetingOptions.disableParticipantMic}
//           webcamEnabled={!meetingOptions.disableParticipantVideo}
//           containerId="video-container"
//           style={{ marginTop: "70px" }}
//           meetingTitle={seminar.topic}
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
//     <>
//       <Helmet>
//         <title>{seminar.topic} | TheFUtureMed Seminar</title>
//         <meta
//           name="description"
//           content={`Join this seminar about ${seminar.topic} hosted by ${seminar.host_name}`}
//         />
//         <meta
//           property="og:url"
//           content={`${window.location.origin}/seminar/${createSlug(
//             seminar.topic
//           )}/${seminar.id}`}
//         />
//       </Helmet>
//       {/* <Helmet>
//         <title>{seminar.topic} | MedPortal Seminar</title>
//         <meta
//           name="description"
//           content={`Join this seminar about ${seminar.topic} hosted by ${seminar.host_name}`}
//         />
//         <meta
//           name="keywords"
//           content={`medical seminar, ${seminar.topic}, ${seminar.host_name}`}
//         />
//         <link
//           rel="canonical"
//           href={`${window.location.origin}/seminar/${slug}/${seminarId}`}
//         />
//         <meta property="og:title" content={seminar.topic} />
//         <meta
//           property="og:description"
//           content={`Medical seminar about ${seminar.topic}`}
//         />
//         <meta
//           property="og:url"
//           content={`${window.location.origin}/seminar/${slug}/${seminarId}`}
//         />
//       </Helmet> */}
//       <div className="min-h-screen bg-gray-50">
//         {/* NEW: Current IST time display */}

//         {/* <header className="bg-black/30 backdrop-blur-md border-b border-white/20 sticky top-0 z-50 shadow-xl">
//         <div className="container mx-auto px-4 py-4">
//           <div className="flex items-center justify-between">
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

//               {seminar.meeting_id && (
//                 <div className="flex items-center space-x-2 ml-2 md:ml-4">
//                   <span className="text-white text-xs md:text-sm bg-white/10 px-2 py-1 md:px-3 md:py-1 rounded-full">
//                     {isHost ? "Hosting" : "Joined"}
//                   </span>
//                 </div>
//               )}
//             </div>

//             <div className="flex items-center space-x-2 md:space-x-4">
//               {user ? (
//                 <>
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
//       </header> */}
//         <Header seminar={seminar} />

//         <div className="container mx-auto px-4 py-8 max-w-4xl">
//           {/* UPDATED: Time left display */}
//           {/* {timeLeft && (
//           <div className="bg-blue-600 text-white py-3 px-4 rounded-lg mb-6 flex items-center">
//             <Clock className="h-5 w-5 mr-2" />
//             <div className="bg-blue-900 text-white text-center py-2 text-sm font-medium">
//               {currentISTTime || "Loading current time..."}
//             </div>
//             <span className="font-semibold">Time left: {timeLeft}</span>
//           </div>
//         )} */}
//           {/* {seminar.host_country === "India" && timeLeft ? (
//           <div className="bg-blue-600 text-white py-3 px-4 rounded-lg mb-6 flex items-center">
//             <Clock className="h-5 w-5 mr-2" />
//             <span className="font-semibold">{currentISTTime} (India)</span>

//             <span className="font-semibold">Time left: {timeLeft} (India)</span>
//           </div>
//         ) : (
//           <div className="bg-gray-200 text-black py-3 px-4 rounded-lg mb-6 flex items-center">
//             <Clock className="h-5 w-5 mr-2" />
//             <span className="font-semibold">
//               Your Country : {seminar.host_country} - Please check the time
//               difference manually.
//               Time left:{timeLeft} ({seminar.host_country})
//             </span>
//           </div>
//         )} */}

//           {/* {timeLeft && seminarStartTime && (
//           <div className="bg-blue-600 text-white py-3 px-4 rounded-lg mb-6 flex flex-col md:flex-row items-center justify-between">
//             <div className="flex items-center mb-2 md:mb-0">
//               <Clock className="h-5 w-5 mr-2" />
//               <span className="font-semibold">Time left: {timeLeft}</span>
//             </div>

//             <div className="flex items-center">
//               <CalendarDays className="h-5 w-5 mr-2" />
//               <span className="text-sm">
//                 Starts: {formatDate(seminar.date)} at {formatTime(seminar.time)}
//                 {seminar.host_country && ` (${seminar.host_country} Time)`}
//               </span>
//             </div>
//           </div>
//         )} */}
//           {/* <Card className="mb-8">
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
//               </div>
//             </div>
//             {isHost && (
//               <div className="mt-6">
//                 <Card>
//                   <CardHeader>
//                     <CardTitle>Registered Participants</CardTitle>
//                   </CardHeader>
//                   <CardContent>
//                     <p className="text-gray-600">
//                       Total registrations : {participantCount}
//                     </p>
//                   </CardContent>
//                 </Card>
//               </div>
//             )}

//             {!isHost && (
//               <div className="flex justify-center pt-4">
//                 <Button
//                   // onClick={
//                   //   isRegistered ? handleCancelRegistration : handleRegister
//                   // }
//                   onClick={() => {
//                     mixpanelInstance.track(
//                       "Seminar Register / Cancel Button Clicked",
//                       {
//                         timestamp: new Date().toISOString(),
//                       }
//                     );
//                     // isRegistered ? handleCancelRegistration : handleRegister;
//                     if (isRegistered) {
//                       handleCancelRegistration();
//                     } else {
//                       handleRegister();
//                     }
//                   }}
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
//         </Card> */}
//           <div className="flex flex-col md:flex-row gap-6 relative">
//             {/* Left side - Seminar details card */}
//             <div className="flex-1">
//               <Card className="mb-8">
//                 <CardHeader>
//                   <div className="flex justify-between items-start">
//                     <div>
//                       <CardTitle className="text-2xl mb-2">
//                         {seminar.topic}
//                       </CardTitle>
//                       <p className="text-gray-600">{seminar.description}</p>
//                     </div>
//                     {isRegistered && (
//                       <Badge variant="default" className="bg-green-500">
//                         <CheckCircle className="h-4 w-4 mr-1" />
//                         Registered
//                       </Badge>
//                     )}
//                   </div>
//                 </CardHeader>
//                 <CardContent className="space-y-6">
//                   <div className="grid md:grid-cols-2 gap-6">
//                     <div className="space-y-4">
//                       <div className="flex items-center gap-3">
//                         <User className="h-5 w-5 text-blue-600" />
//                         <div>
//                           <p className="font-medium">Host</p>
//                           <p className="text-gray-600">{seminar.host_name}</p>
//                         </div>
//                       </div>

//                       <div className="flex items-center gap-3">
//                         <CalendarDays className="h-5 w-5 text-blue-600" />
//                         <div>
//                           <p className="font-medium">Date</p>
//                           <p className="text-gray-600">
//                             {formatDate(seminar.date)}
//                           </p>
//                         </div>
//                       </div>

//                       <div className="flex items-center gap-3">
//                         <Clock className="h-5 w-5 text-blue-600" />
//                         <div>
//                           <p className="font-medium">Time</p>
//                           <p className="text-gray-600">
//                             {formatTime(seminar.time)}
//                           </p>
//                         </div>
//                       </div>
//                     </div>

//                     <div className="space-y-4">
//                       <div className="flex items-center gap-3">
//                         <Users className="h-5 w-5 text-blue-600" />
//                         <div>
//                           <p className="font-medium">Speakers</p>
//                           <p className="text-gray-600">
//                             {speakers.length} speaker(s)
//                           </p>
//                         </div>
//                       </div>
//                       <div className="flex items-center gap-3">
//                         <Globe className="h-5 w-5 text-blue-600" />
//                         <div>
//                           <p className="font-medium">Host Country</p>
//                           <p className="text-gray-600">
//                             {seminar.host_country}
//                           </p>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                   {isHost && (
//                     <div className="mt-6">
//                       <Card>
//                         <CardHeader>
//                           <CardTitle>Registered Participants</CardTitle>
//                         </CardHeader>
//                         <CardContent>
//                           <p className="text-gray-600">
//                             Total registrations : {participantCount}
//                           </p>
//                         </CardContent>
//                       </Card>
//                     </div>
//                   )}

//                   {!isHost && (
//                     <div className="flex justify-center pt-4">
//                       <Button
//                         onClick={() => {
//                           mixpanelInstance.track(
//                             "Seminar Register / Cancel Button Clicked",
//                             {
//                               timestamp: new Date().toISOString(),
//                             }
//                           );
//                           if (isRegistered) {
//                             handleCancelRegistration();
//                           } else {
//                             handleRegister();
//                           }
//                         }}
//                         disabled={registering || canceling}
//                         className="bg-blue-600 hover:bg-blue-700 px-8 py-3 text-lg"
//                       >
//                         {registering
//                           ? "Registering..."
//                           : canceling
//                           ? "Cancelling..."
//                           : isRegistered
//                           ? "Cancel Registration"
//                           : "Register for Seminar"}
//                       </Button>
//                     </div>
//                   )}
//                 </CardContent>
//               </Card>
//             </div>

//             {/* Right side - Social share buttons */}

//             <div className="w-full md:w-48 relative">
//               <Card className="p-4 flex flex-col justify-between">
//                 <div className="flex flex-col items-center gap-4">
//                   <p className="font-medium">Share this seminar</p>
//                   <div className="flex flex-col gap-2 w-full">
//                     <SocialShareButtons
//                       // url={window.location.href}
//                       url={`${window.location.origin}/seminar/${createSlug(
//                         seminar.topic
//                       )}/${seminar.id}`}
//                       title={seminar.topic}
//                       description={seminar.description}
//                     />
//                   </div>
//                 </div>
//               </Card>
//             </div>
//           </div>
//           {/* {isHost && (
//             <Card className="my-8">
//               <CardHeader>
//                 <CardTitle>Participant Profiles</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <div className="overflow-x-auto mt-4">
//                   <table className="min-w-full border border-gray-300 rounded-lg">
//                     <thead>
//                       <tr className="bg-gray-100">
//                         <th className="px-4 py-2 border">Name</th>
//                         <th className="px-4 py-2 border">Gender</th>
//                         <th className="px-4 py-2 border">Date of Birth</th>
//                         <th className="px-4 py-2 border">Action</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {participantProfiles.length > 0 ? (
//                         participantProfiles.map((profile, index) => (
//                           <tr key={index} className="text-center">
//                             <td className="px-4 py-2 border">{profile.name}</td>

//                             <td className="px-4 py-2 border">
//                               {profile.gender}
//                             </td>
//                             <td className="px-4 py-2 border">{profile.dob}</td>
//                             <td className="px-4 py-2 border">
//                               <input
//                                 type="checkbox"
//                                 checked={selectedProfiles.includes(profile.id)}
//                                 onChange={() =>
//                                   handleCheckboxChange(profile.id)
//                                 }
//                               />
//                             </td>
//                           </tr>
//                         ))
//                       ) : (
//                         <tr>
//                           <td
//                             colSpan={4}
//                             className="px-4 py-2 border text-center"
//                           >
//                             No participants registered yet
//                           </td>
//                         </tr>
//                       )}
//                     </tbody>
//                   </table>
//                   <button
//                     className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
//                     onClick={() => handleConfirmCertificate(profile)}
//                   >
//                     Confirm Certificate
//                   </button>
//                 </div>
//               </CardContent>
//             </Card>
//           )} */}
//           {isHost && (
//             <Card className="my-8">
//               <CardHeader>
//                 <CardTitle>Participant Profiles</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <div className="overflow-x-auto mt-4">
//                   <table className="min-w-full border border-gray-300 rounded-lg">
//                     <thead>
//                       <tr className="bg-gray-100">
//                         <th className="px-4 py-2 border">Name</th>
//                         <th className="px-4 py-2 border">Gender</th>
//                         <th className="px-4 py-2 border">Date of Birth</th>
//                         <th className="px-4 py-2 border">Action</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {participantProfiles.length > 0 ? (
//                         participantProfiles.map((profile, index) => (
//                           <tr key={index} className="text-center">
//                             <td className="px-4 py-2 border">{profile.name}</td>
//                             <td className="px-4 py-2 border">
//                               {profile.gender}
//                             </td>
//                             <td className="px-4 py-2 border">{profile.dob}</td>
//                             <td className="px-4 py-2 border">
//                               <input
//                                 type="checkbox"
//                                 checked={selectedProfiles.includes(profile.id)}
//                                 onChange={() =>
//                                   handleCheckboxChange(profile.id)
//                                 }
//                               />
//                             </td>
//                           </tr>
//                         ))
//                       ) : (
//                         <tr>
//                           <td
//                             colSpan={4}
//                             className="px-4 py-2 border text-center"
//                           >
//                             No participants registered yet
//                           </td>
//                         </tr>
//                       )}
//                     </tbody>
//                   </table>

//                   {/* Confirm button only works if checkboxes selected */}
//                   <button
//                     className={`mt-4 px-3 py-1 rounded text-white ${
//                       selectedProfiles.length > 0
//                         ? "bg-blue-500 hover:bg-blue-600"
//                         : "bg-gray-400 cursor-not-allowed"
//                     }`}
//                     disabled={selectedProfiles.length === 0}
//                     onClick={() => handleConfirmCertificate(selectedProfiles)}
//                   >
//                     Confirm Certificate
//                   </button>
//                 </div>
//               </CardContent>
//             </Card>
//           )}

//           <Card>
//             <CardHeader>
//               <CardTitle>Speakers</CardTitle>
//               <p className="text-gray-600">
//                 Meet the experts who will be presenting at this seminar
//               </p>
//             </CardHeader>
//             <CardContent>
//               {speakers.length === 0 ? (
//                 <p className="text-gray-600 text-center py-8">
//                   No speakers added yet.
//                 </p>
//               ) : (
//                 <div className="grid md:grid-cols-2 gap-6">
//                   {speakers.map((speaker) => (
//                     <Card key={speaker.id}>
//                       <CardContent className="p-4">
//                         <h3 className="font-semibold text-lg mb-2">
//                           {speaker.name}
//                         </h3>
//                         <div className="space-y-1">
//                           <p className="text-sm text-gray-600">
//                             <span className="font-medium">Qualification:</span>{" "}
//                             {speaker.qualification}
//                           </p>
//                           <p className="text-sm text-gray-600">
//                             <span className="font-medium">Department:</span>{" "}
//                             {speaker.department}
//                           </p>
//                         </div>
//                       </CardContent>
//                     </Card>
//                   ))}
//                 </div>
//               )}
//             </CardContent>
//           </Card>

//           <Card className="mt-8">
//             <CardHeader>
//               <CardTitle>Live Meeting</CardTitle>
//               <p className="text-gray-600">Join the live seminar session</p>
//             </CardHeader>
//             {/* <CardContent>
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

//                   <div className="flex justify-center items-center gap-2">
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
//                 </div>
//               )}
//             </div>
//           </CardContent> */}

//             <CardContent>
//               <div className="space-y-4">
//                 {/* {timeLeft &&
//               seminarStartTime &&
//               seminar.host_country === "India" &&
//               timeLeft ? (
//                 <div className="bg-blue-600 text-white py-3 px-4 rounded-lg mb-6 flex flex-col md:flex-row items-center justify-between">
//                   <div className="flex items-center mb-2 md:mb-0">
//                     <Clock className="h-5 w-5 mr-2" />
//                     <span className="font-semibold">Time left: {timeLeft}</span>
//                   </div>

//                   <div className="flex items-center">
//                     <CalendarDays className="h-5 w-5 mr-2" />
//                     <span className="text-sm">
//                       Starts: {formatDate(seminar.date)} at{" "}
//                       {formatTime(seminar.time)}
//                       {seminar.host_country &&
//                         ` (${seminar.host_country} Time)`}
//                     </span>
//                   </div>
//                 </div>
//               ) : (
//                 <span className="font-semibold">
//                   Your Country: {seminar.host_country} — Please check the time
//                   difference manually.
//                 </span>
//               )} */}
//                 {timeLeft === "Seminar has ended" ? (
//                   <div className="bg-red-600 text-white py-3 px-4 rounded-lg mb-6 flex items-center">
//                     <Clock className="h-5 w-5 mr-2" />
//                     <span className="font-semibold">
//                       This seminar session has ended
//                     </span>
//                   </div>
//                 ) : timeLeft &&
//                   seminarStartTime &&
//                   seminar.host_country === "India" ? (
//                   <div className="bg-blue-600 text-white py-3 px-4 rounded-lg mb-6 flex flex-col md:flex-row items-center justify-between">
//                     <div className="flex items-center mb-2 md:mb-0">
//                       <Clock className="h-5 w-5 mr-2" />
//                       <span className="font-semibold">
//                         Time left: {timeLeft}
//                       </span>
//                     </div>
//                     <div className="flex items-center">
//                       <CalendarDays className="h-5 w-5 mr-2" />
//                       <span className="text-sm">
//                         Ends: {formatDate(seminar.date)} at{" "}
//                         {formatTime(
//                           new Date(seminarEndTime!).toTimeString().slice(0, 5)
//                         )}
//                         {seminar.host_country &&
//                           ` (${seminar.host_country} Time)`}
//                       </span>
//                     </div>
//                   </div>
//                 ) : (
//                   <div className="bg-gray-200 text-black py-3 px-4 rounded-lg mb-6 flex items-center">
//                     <Clock className="h-5 w-5 mr-2" />
//                     <span className="font-semibold">
//                       Your Country: {seminar.host_country} - Please check the
//                       time difference manually.
//                       {timeLeft &&
//                         ` Time left: ${timeLeft} (${seminar.host_country})`}
//                     </span>
//                   </div>
//                 )}
//               </div>
//               <div className="space-y-4">
//                 {(seminar.meeting_id || isHost) && (
//                   <div className="text-center py-4 space-y-4">
//                     {/* {isHost ? (
//                     <p className="text-sm text-blue-500">
//                       You are hosting this seminar
//                     </p>
//                   ) : seminar?.is_host_joined ? (
//                     <p className="text-sm text-green-600">
//                       Host is available to join
//                     </p>
//                   ) : (
//                     <p className="text-sm text-yellow-600">
//                       Host has not joined yet
//                     </p>
//                   )} */}
//                     {timeLeft === "Seminar has ended" ? (
//                       <p className="text-sm text-red-600">
//                         This seminar session has concluded
//                       </p>
//                     ) : isHost ? (
//                       <p className="text-sm text-blue-500">
//                         You are hosting this seminar
//                       </p>
//                     ) : seminar?.is_host_joined ? (
//                       <p className="text-sm text-green-600">
//                         Host is available to join
//                       </p>
//                     ) : (
//                       <p className="text-sm text-yellow-600">
//                         Host has not joined yet
//                       </p>
//                     )}

//                     {/* <div className="flex justify-center">
//                     <Button
//                       onClick={handleJoinMeeting}
//                       // disabled={creatingMeeting || (isHost && isSeminarPast)}
//                       disabled={
//                         creatingMeeting || (isHost && isJoinButtonDisabled)
//                       }
//                       // disable={}
//                       className={`px-8 py-3 text-lg ${
//                         isHost
//                           ? "bg-green-600 hover:bg-green-700"
//                           : "bg-blue-600 hover:bg-blue-700"
//                       }`}
//                     >
//                       {creatingMeeting ? (
//                         <>
//                           <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                           {isHost ? "Starting..." : "Joining..."}
//                         </>
//                       ) : isHost ? (
//                         isJoinButtonDisabled ? (
//                           // isSeminarPast ? (
//                           "Meeting Expired"
//                         ) : (
//                           {isHost && seminar?.is_host_joined && (
//                     <MeetingOptions
//                       isHost={isHost}
//                       isHostJoined={seminar?.is_host_joined}
//                       onOptionsChange={setMeetingOptions}
//                     />
//                   )}
//                           "Start Meeting"
//                         )
//                       ) : (
//                         "Join Meeting"
//                       )}
//                     </Button>
//                   </div> */}
//                     <div className="flex justify-center">
//                       {isHost ? (
//                         <Dialog>
//                           <DialogTrigger asChild>
//                             <Button
//                               disabled={
//                                 creatingMeeting ||
//                                 isJoinButtonDisabled ||
//                                 timeLeft === "Seminar has ended"
//                               }
//                               // className={`px-8 py-3 text-lg bg-green-600 hover:bg-green-700`}
//                               className={`px-8 py-3 text-lg ${
//                                 timeLeft === "Seminar has ended"
//                                   ? "bg-gray-500 cursor-not-allowed"
//                                   : "bg-green-600 hover:bg-green-700"
//                               }`}
//                             >
//                               {/* {isJoinButtonDisabled
//                               ? "You're the host — but it's not time to start the seminar just yet."
//                               : "Start Meeting"} */}
//                               {timeLeft === "Seminar has ended"
//                                 ? "Start Meeting"
//                                 : isJoinButtonDisabled
//                                 ? "You're the host — but it's not time to start the seminar just yet."
//                                 : "Start Meeting"}
//                             </Button>
//                           </DialogTrigger>
//                           <DialogContent>
//                             <DialogHeader>
//                               <DialogTitle>Meeting Options</DialogTitle>
//                             </DialogHeader>
//                             <div className="space-y-4 py-4">
//                               <div className="flex items-center justify-between">
//                                 <Label htmlFor="disable-mic">
//                                   Disable Participants Mic
//                                 </Label>
//                                 <Switch
//                                   id="disable-mic"
//                                   checked={meetingOptions.disableParticipantMic}
//                                   onCheckedChange={(checked) =>
//                                     setMeetingOptions((prev) => ({
//                                       ...prev,
//                                       disableParticipantMic: checked,
//                                     }))
//                                   }
//                                 />
//                               </div>
//                               <div className="flex items-center justify-between">
//                                 <Label htmlFor="disable-video">
//                                   Disable Participants Video
//                                 </Label>
//                                 <Switch
//                                   id="disable-video"
//                                   checked={
//                                     meetingOptions.disableParticipantVideo
//                                   }
//                                   onCheckedChange={(checked) =>
//                                     setMeetingOptions((prev) => ({
//                                       ...prev,
//                                       disableParticipantVideo: checked,
//                                     }))
//                                   }
//                                 />
//                               </div>
//                             </div>
//                             <DialogFooter>
//                               <Button
//                                 onClick={() => {
//                                   mixpanelInstance.track(
//                                     " Start Seminer Button Clicked",
//                                     {
//                                       timestamp: new Date().toISOString(),
//                                     }
//                                   );
//                                   handleJoinMeeting();
//                                 }}
//                                 // onClick={() => {
//                                 //   handleJoinMeeting();
//                                 // }}
//                                 className="bg-green-600 hover:bg-green-700"
//                               >
//                                 Start Meeting
//                               </Button>
//                             </DialogFooter>
//                           </DialogContent>
//                         </Dialog>
//                       ) : (
//                         // <Button
//                         //   onClick={() => {
//                         //     mixpanelInstance.track(
//                         //       " Join Seminer Button Clicked",
//                         //       {
//                         //         timestamp: new Date().toISOString(),
//                         //       }
//                         //     );
//                         //     handleJoinMeeting();
//                         //   }}
//                         //   // onClick={handleJoinMeeting}
//                         //   disabled={
//                         //     creatingMeeting ||
//                         //     isJoinButtonDisabled ||
//                         //     timeLeft === "Seminar has ended"
//                         //   }
//                         //   // className="px-8 py-3 text-lg bg-blue-600 hover:bg-blue-700"
//                         //   className={`px-8 py-3 text-lg ${
//                         //     timeLeft === "Seminar has ended"
//                         //       ? "bg-gray-500 cursor-not-allowed"
//                         //       : "bg-blue-600 hover:bg-blue-700"
//                         //   }`}
//                         // >
//                         //   {/* {creatingMeeting ? (
//                         //     <>
//                         //       <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                         //       Joining...
//                         //     </>
//                         //   ) : (
//                         //     "Join Meeting"
//                         //   )} */}
//                         //   {timeLeft === "Seminar has ended" ? (
//                         //     "Join Meeting"
//                         //   ) : creatingMeeting ? (
//                         //     <>
//                         //       <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                         //       Joining...
//                         //     </>
//                         //   ) : (? "You're the Participants — but it's not time to start the seminar just yet."
//                         //         :
//                         //     "Join Meeting"
//                         //   )}
//                         // </Button>
//                         <Button
//                           onClick={() => {
//                             mixpanelInstance.track(
//                               "Join Seminar Button Clicked",
//                               {
//                                 timestamp: new Date().toISOString(),
//                               }
//                             );
//                             handleJoinMeeting();
//                           }}
//                           disabled={
//                             creatingMeeting ||
//                             isJoinButtonDisabled ||
//                             timeLeft === "Seminar has ended"
//                           }
//                           className={`px-8 py-3 text-lg ${
//                             timeLeft === "Seminar has ended" ||
//                             isJoinButtonDisabled
//                               ? "bg-gray-500 cursor-not-allowed"
//                               : "bg-blue-600 hover:bg-blue-700"
//                           }`}
//                         >
//                           {timeLeft === "Seminar has ended" ? (
//                             "Join Meeting"
//                           ) : creatingMeeting ? (
//                             <>
//                               <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                               Joining...
//                             </>
//                           ) : isJoinButtonDisabled ? (
//                             "You're the Participant — but it's not time to join the seminar just yet."
//                           ) : (
//                             "Join Meeting"
//                           )}
//                         </Button>
//                       )}
//                     </div>

//                     {/* NEW: Additional meeting info */}
//                     {/* {seminar.meeting_id && !isHost && (
//                     <div className="mt-4 text-sm">
//                       <p className="text-gray-600 mb-2">
//                         Meeting ID: {seminar.meeting_id}
//                       </p>
//                       <Button
//                         variant="outline"
//                         size="sm"
//                         onClick={() => {
//                           navigator.clipboard.writeText(seminar.meeting_id!);
//                           toast({ title: "Meeting ID copied!" });
//                         }}
//                       >
//                         <Copy className="h-4 w-4 mr-2" />
//                         Copy Meeting ID
//                       </Button>
//                     </div>
//                   )} */}
//                   </div>
//                 )}
//               </div>
//             </CardContent>
//           </Card>
//         </div>
//         <Footer />
//       </div>
//     </>
//   );
// };

// export default SeminarDetails;

import { useState, useEffect } from "react";
import {
  useParams,
  useNavigate,
  Link,
  useSearchParams,
} from "react-router-dom";
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
  Award,
  Play,
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
import { SocialShareButtons } from "./SocialShareButtons";
import { Helmet } from "react-helmet-async";
import EnrollmentButton from "@/components/elearning/EnrollmentButton";

interface Seminar {
  id: string;
  host_name: string;
  topic: string;
  description: string;
  date: string;
  time: string;
  host_id: string;
  meeting_id?: string | null;
  session_id?: string | null;
  host_country?: string | null;
  is_host_joined: boolean;
  is_paid: boolean; // Add this field
  price?: number;
  is_certificate: boolean;
  type?: string;
}

interface Speaker {
  id: string;
  name: string;
  qualification: string;
  department: string;
}
interface ParticipantProfile {
  id: string;
  name: string;
  // email: string;
  gender: string;
  dob: string;
  certificate_download: boolean;
}
interface Participant {
  id: string;
  first_name: string;
  last_name: string;
  gender: string;
  date_of_birth: string; // 👈 Add this
}

const resizeImagesInHtml = (html: string): string => {
  return html.replace(/<img([^>]*)>/g, (match, group1) => {
    // Check if style already exists
    if (/style\s*=/.test(group1)) {
      // Append width style to existing style attribute
      return `<img${group1.replace(
        /style\s*=\s*(['"])(.*?)\1/,
        (s, quote, styleContent) => {
          return `style=${quote}${styleContent};width:100px;${quote}`;
        }
      )}>`;
    } else {
      // Add new style attribute with width
      return `<img${group1} style="width:100px;">`;
    }
  });
};

const SeminarDetails = () => {
  const { seminarId, slug } = useParams();
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
  const [seminarStartTime, setSeminarStartTime] = useState<Date | null>(null);
  const [isJoinButtonDisabled, setIsJoinButtonDisabled] = useState(true);
  const [searchParams] = useSearchParams();
  // NEW: State for current time in host's timezone
  const [hostCurrentTime, setHostCurrentTime] = useState<Date | null>(null);
  // NEW: State for current IST time
  const [currentISTTime, setCurrentISTTime] = useState("");
  const [participantProfiles, setParticipantProfiles] = useState<
    ParticipantProfile[]
  >([]);
  const [isConfirmingCertificate, setIsConfirmingCertificate] = useState(false);
  const [userProfile, setUserProfile] = useState<any>(null);
  const supabaseAnonKey = import.meta.env.VITE_VIDEOSDK_TOKEN;
  const [seminarEndTime, setSeminarEndTime] = useState<Date | null>(null);
  const [meetingOptions, setMeetingOptions] = useState({
    disableParticipantMic: false,
    disableParticipantVideo: false,
  });
  const [showCertificateButton, setShowCertificateButton] = useState(false);

  const [isEnrolled, setIsEnrolled] = useState(false);
  const [checkingEnrollment, setCheckingEnrollment] = useState(false);
  const handleBackNavigation = () => {
    navigate(-1);
  };

  const onNavigateProfile = () => {
    navigate("/profile");
  };

  const onNavigateHome = () => {
    navigate("/");
  };
  // Utility function (can be outside your component)
  const formatSeminarType = (type: string) => {
    switch (type) {
      case "webminar":
        return "Seminar"; // fix typo for display
      case "workshop":
        return "Workshop";
      case "conference":
        return "Conference";
      default:
        return type;
    }
  };
  const getSeminarBadgeClass = (type: string) => {
    switch (type) {
      case "webminar":
        return "bg-blue-100 text-blue-800"; // seminar
      case "workshop":
        return "bg-green-100 text-green-800"; // workshop
      case "conference":
        return "bg-[#FFFAF0] text-purple-800"; // conference
      default:
        return "bg-gray-100 text-gray-800"; // fallback
    }
  };
  useEffect(() => {
    if (seminarId) {
      checkEnrollmentStatus();
    }
  }, [seminarId]);

  // State to store selected participants
  const [selectedProfiles, setSelectedProfiles] = useState<string[]>([]);
  useEffect(() => {
    // Check for payment status in URL params
    const paymentStatus = searchParams.get("payment");
    const sessionId = searchParams.get("session_id");

    if (paymentStatus === "success" && sessionId) {
      handlePaymentSuccess(sessionId);
    } else if (paymentStatus === "canceled") {
      toast({
        title: "Payment Canceled",
        description: "Your enrollment was canceled. You can try again anytime.",
        variant: "destructive",
      });
    }
  }, [searchParams]);
  const handlePaymentSuccess = async (sessionId: string) => {
    try {
      setCheckingEnrollment(true);

      toast({
        title: "Payment Successful!",
        description: "Verifying your enrollment...",
      });

      // Verify payment with our backend
      const { data, error } = await supabase.functions.invoke(
        "verify-payment",
        {
          body: { sessionId },
        }
      );

      if (error) {
        console.error("Payment verification error:", error);
        toast({
          title: "Verification Failed",
          description:
            "Payment was successful but verification failed. Please contact support.",
          variant: "destructive",
        });
        return;
      }

      if (data?.enrolled) {
        setIsEnrolled(true);
        toast({
          title: "Enrollment Complete!",
          description:
            "Welcome to the course! A confirmation email has been sent to you.",
        });
        // Clear the payment params from URL
        navigate(`/seminar/${seminarId}`, { replace: true });
      } else {
        toast({
          title: "Enrollment Pending",
          description:
            "Your payment is being processed. Please refresh in a moment.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Payment success handling error:", error);
      toast({
        title: "Verification Error",
        description:
          "There was an issue verifying your payment. Please contact support.",
        variant: "destructive",
      });
    } finally {
      setCheckingEnrollment(false);
    }
  };
  const checkEnrollmentStatus = async () => {
    try {
      setCheckingEnrollment(true);
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) return;

      const { data, error } = await supabase
        // .from("seminar")
        .from("seminar_registrations")
        .select("*")
        // .select("status")
        .eq("user_id", session.user.id)
        .eq("seminar_id", seminarId)
        .or("payment_status.eq.paid,payment_status.eq.free")
        // .single();
        .maybeSingle();

      if (!error && data) {
        setIsEnrolled(true);
      }
      console.log("Enrollment status data:", data);
      console.log("Enrollment status used id:", session.user.id);
      console.log("Enrollment status seminar id:", seminarId);
    } catch (error) {
      console.error("Error checking enrollment status:", error);
    } finally {
      setCheckingEnrollment(false);
    }
  };
  const handleAccessCourse = () => {
    if (!seminar?.topic) return;
    navigate(`/seminar/${seminarId}`);
    if (isRegistered) {
      handleCancelRegistration();
    } else {
      handleRegister();
    }
  };
  // Handle checkbox toggle
  const handleCheckboxChange = (id: string) => {
    setSelectedProfiles((prev) =>
      prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id]
    );
  };

  const [participantCount, setParticipantCount] = useState<number>(0);
  const createSlug = (str: string) => {
    return str
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
  };

  const fetchParticipantProfiles = async () => {
    if (!seminarId) return;

    try {
      // First, let's check the actual structure of your seminar_registrations table
      const { data: registrations, error: registrationsError } = await supabase
        .from("seminar_registrations")
        .select("user_id,certificate_download")
        .eq("seminar_id", seminarId);

      if (registrationsError) {
        console.error("Error fetching registrations:", registrationsError);
        return;
      }

      console.log("Registrations found:", registrations);

      if (registrations && registrations.length > 0) {
        // Get all user IDs from registrations
        const userIds = registrations
          .map((reg) => reg.user_id)
          .filter((id) => id);

        if (userIds.length > 0) {
          // Fetch user profiles directly from profiles table
          const { data: profilesData, error: profilesError } = await supabase
            .from("profiles")
            .select("id, first_name, last_name, gender, date_of_birth")
            .in("id", userIds);

          if (profilesError) {
            console.error("Error fetching profiles:", profilesError);
            return;
          }

          console.log("Profiles data:", profilesData);

          // Transform the data to match our ParticipantProfile interface
          const profiles: ParticipantProfile[] = (profilesData || []).map(
            (profile) => {
              // Find the registration for this user to get certificate_download status
              const registration = registrations.find(
                (reg) => reg.user_id === profile.id
              );

              return {
                id: profile.id,
                name: `${profile.first_name || ""} ${
                  profile.last_name || ""
                }`.trim(),
                gender: profile.gender || "Not specified",
                dob: profile.date_of_birth || "Not specified",
                certificate_download:
                  registration?.certificate_download || false, // Add this
              };
            }
          );

          setParticipantProfiles(profiles);
        } else {
          console.log("No user IDs found in registrations");
          setParticipantProfiles([]);
        }
      } else {
        console.log("No registrations found for this seminar");
        setParticipantProfiles([]);
      }
    } catch (error) {
      console.error("Error in fetchParticipantProfiles:", error);
    }
  };

  const fetchParticipantCount = async () => {
    if (!seminarId) return;
    const { count, error } = await supabase
      .from("seminar_registrations")
      .select("*", { count: "exact", head: true })
      .eq("seminar_id", seminarId);
    if (!error) setParticipantCount(count || 0);
  };

  const approveSeminarCertificate = async (userIds: string[]) => {
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) throw new Error("No authentication session found");

      const response = await fetch(
        `${
          import.meta.env.VITE_SUPABASE_URL
        }/functions/v1/approve-seminar-certificate`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${session.access_token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_ids: userIds,
            host_id: user?.id, // Current user (host) ID
            seminar_id: seminarId,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(
          `Edge function failed: ${response.status} - ${errorData}`
        );
      }

      return await response.json();
    } catch (error) {
      console.error("Error calling approve-seminar-certificate:", error);
      throw error;
    }
  };

  const handleConfirmCertificate = async (participantIds: string[]) => {
    try {
      setIsConfirmingCertificate(true);
      await approveSeminarCertificate(participantIds);
      // Update certificate_download status in the database
      const { error } = await supabase
        .from("seminar_registrations")
        .update({ certificate_download: true })
        .in("user_id", participantIds)
        .eq("seminar_id", seminarId);

      if (error) throw error;

      // Update local state
      setParticipantProfiles((prev) =>
        prev.map((profile) =>
          participantIds.includes(profile.id)
            ? { ...profile, certificate_download: true }
            : profile
        )
      );

      // Clear selected profiles
      setSelectedProfiles([]);

      toast({
        title: "Certificate Confirmed",
        description: `Certificate confirmed for ${participantIds.length} participant(s)`,
      });
    } catch (error) {
      console.error("Error confirming certificate:", error);
      toast({
        title: "Error",
        description: "Failed to confirm certificate",
        variant: "destructive",
      });
    } finally {
      setIsConfirmingCertificate(false);
    }
  };

  // Add a refresh function to reload participant data
  const refreshParticipantData = async () => {
    await fetchParticipantProfiles();
    await fetchParticipantCount();
  };

  // Add this function inside your component
  const handleGetCertificate = async () => {
    console.log("Get Certificate clicked");
  };

  useEffect(() => {
    if (!seminar) {
      console.log("Seminar data not available yet.");
      return;
    }

    const seminarDateTime = new Date(`${seminar.date}T${seminar.time}`);
    console.log("Parsed Seminar DateTime (local):", seminarDateTime);
    setSeminarStartTime(seminarDateTime);

    // const seminarEndTime = new Date(seminarDateTime.getTime() + 60 * 60 * 1000); // Add 1 hour
    const endTime = new Date(seminarDateTime.getTime() + 60 * 60 * 1000);
    setSeminarEndTime(endTime);

    const timer = setInterval(() => {
      const now = new Date();
      console.log("Current Local Time:", now);
      setHostCurrentTime(now);

      // If seminar has ended (1 hour passed)
      if (now >= endTime) {
        console.log("Seminar has ended (1 hour window passed)");
        setTimeLeft("Seminar has ended");
        setIsJoinButtonDisabled(true);
        // setShowCertificateButton(true);
        return;
      }

      const diffMs = seminarDateTime.getTime() - now.getTime();
      console.log("Time difference in ms:", diffMs);

      if (diffMs <= 0) {
        console.log("Seminar has started.");
        setTimeLeft("Seminar has started");
        setIsJoinButtonDisabled(false); // Enable button when seminar starts
        return;
      } else {
        setIsJoinButtonDisabled(true); // Disable before seminar starts
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
        const {
          data: { session },
        } = await supabase.auth.getSession();
        setUser(session?.user || null);

        const { data: seminarData, error: seminarError } = await supabase
          .from("seminars")
          .select("*")
          .eq("id", seminarId)
          .single();

        if (seminarError) throw seminarError;

        // Redirect if slug mismatch
        if (seminarData && (!slug || slug !== createSlug(seminarData.topic))) {
          navigate(`/seminar/${createSlug(seminarData.topic)}/${seminarId}`, {
            replace: true,
          });
          return;
        }

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
        await fetchParticipantCount();

        // Fetch participant profiles if user is host of this seminar
        if (session?.user && session.user.id === seminarData.host_id) {
          await fetchParticipantProfiles();
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
    fetchParticipantCount();
    if (isHost) {
      fetchParticipantProfiles();
    }
  }, [seminarId, slug, navigate, toast]);

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
      if (!seminarId) {
        // if (!seminar?.meeting_id) {
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

      if (!seminar?.meeting_id) {
        // First time host is joining - create meeting
        const { data, error } = await supabase
          .from("seminars")
          .update({
            is_host_joined: true,
            meeting_id: seminarId, // Use seminarId as meetingId
            session_id: seminar?.session_id || uuidv4(),
          })
          .eq("id", seminarId)
          .select()
          .single();

        if (error) throw error;

        setSeminar((prev) =>
          prev
            ? {
                ...prev,
                meeting_id: seminarId,
                is_host_joined: true,
              }
            : null
        );
      } else {
        // Meeting already exists - just update host joined status
        const { error } = await supabase
          .from("seminars")
          .update({
            is_host_joined: true,
          })
          .eq("id", seminarId);

        if (error) throw error;

        setSeminar((prev) => (prev ? { ...prev, is_host_joined: true } : null));
      }

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
    console.log("kkkkkkkk", setShowMeeting(false));
    setShowMeeting(false);
  };
  const handleMeetingEnd = async () => {
    try {
      // Update seminar status when host ends meeting
      const { error } = await supabase
        .from("seminars")
        .update({
          is_host_joined: false,
          // Keep the same meeting_id for future rejoins
        })
        .eq("id", seminarId);

      if (error) throw error;

      setSeminar((prev) => (prev ? { ...prev, is_host_joined: false } : null));

      setShowMeeting(false);
      toast({
        title: "Meeting Ended",
        description: "The meeting has been ended successfully",
      });
    } catch (error) {
      console.error("Error ending meeting:", error);
      toast({
        title: "Error",
        description: "Failed to end meeting",
        variant: "destructive",
      });
    }
  };

  const handleRegister = async () => {
    // if (!user || !seminarId || !seminar) return;
    if (!user || !seminarId || !seminar) {
      toast({
        title: "Registration Required",
        description: "You must register for the seminar before joining",
        variant: "destructive",
      });
      return;
    }
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
      console.log("Registration ID:", data.id);
      setParticipantCount((prev) => {
        const newCount = prev + 1;
        console.log("Incremented participant count to:", newCount); // Log the new count
        return newCount;
      });
      setParticipantCount((prev) => Math.max(prev - 1));

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
- Please Login 15 minutes early to set up<br>
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
        description:
          error instanceof Error ? error.message : "An error occurred",
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
      // setParticipantCount((prev) => prev - 1);
      setParticipantCount((prev) => {
        const newCount = prev - 1;
        console.log("Decremented participant count to:", newCount); // Log the new count
        return newCount;
      });
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

  if (showMeeting && seminarId) {
    // if (showMeeting && seminar?.meeting_id) {
    return (
      <div>
        <Header />

        <VideoMeeting
          isHost={isHost}
          apiKey={import.meta.env.VITE_VIDEOSDK_API_KEY}
          meetingId={seminarId}
          sessionId={seminar?.session_id || undefined}
          isRejoining={!!seminar?.session_id}
          name={getDisplayName()}
          onMeetingLeave={handleLeaveMeeting}
          // onMeetingEnd={handleMeetingEnd}
          micEnabled={!meetingOptions.disableParticipantMic}
          webcamEnabled={!meetingOptions.disableParticipantVideo}
          containerId="video-container"
          style={{ marginTop: "70px" }}
          meetingTitle={seminar.topic}
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
        <p>Please wait....</p>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{seminar.topic} | TheFUtureMed Seminar</title>
        <meta
          name="description"
          content={`Join this seminar about ${seminar.topic} hosted by ${seminar.host_name}`}
        />
        <meta
          property="og:url"
          content={`${window.location.origin}/seminar/${createSlug(
            seminar.topic
          )}/${seminar.id}`}
        />
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        <Header seminar={seminar} />
        <main className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* <div className="container mx-auto px-4 py-8 max-w-4xl"> */}
            <div className="lg:col-span-2 space-y-6">
              <div className="flex flex-col md:flex-row gap-6 relative">
                {/* Left side - Seminar details card */}
                <div className="flex-1">
                  <Card
                    className={`mb-8 ${getSeminarBadgeClass(seminar.type)}`}
                  >
                    <Badge
                      variant="secondary"
                      className="text-sm bg-blue-100 text-800"
                    >
                      Type : {formatSeminarType(seminar.type)}
                    </Badge>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-2xl mb-2">
                            {seminar.topic}
                          </CardTitle>
                          <p className="text-gray-600">
                            {/* {seminar.description} */}
                            {seminar.description ? (
                              <div
                                className="prose max-w-none text-gray-800"
                                dangerouslySetInnerHTML={{
                                  __html: resizeImagesInHtml(
                                    seminar.description
                                  ),
                                }}
                                // dangerouslySetInnerHTML={{
                                //   __html: removeImagesFromHtml(course.description),
                                // }}
                              />
                            ) : (
                              <p className="text-gray-700">
                                No description available for this course.
                              </p>
                            )}
                          </p>
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
                              <p className="text-gray-600">
                                {seminar.host_name}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-3">
                            <CalendarDays className="h-5 w-5 text-blue-600" />
                            <div>
                              <p className="font-medium">Date</p>
                              <p className="text-gray-600">
                                {formatDate(seminar.date)}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-3">
                            <Clock className="h-5 w-5 text-blue-600" />
                            <div>
                              <p className="font-medium">Time</p>
                              <p className="text-gray-600">
                                {formatTime(seminar.time)}
                              </p>
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
                              <p className="text-gray-600">
                                {seminar.host_country}
                              </p>
                            </div>
                          </div>
                          {user?.id && user?.id !== seminar.host_id && (
                            <div className="flex items-center gap-3">
                              <Award className="h-5 w-5 text-blue-600" />
                              <div>
                                <p className="font-medium">Participation Certificate Available : </p>
                                <p className="text-gray-600">
                                  {/* {seminar.is_certificate} */}
                                  {seminar.is_certificate ? (
                                    <span className="text-green-600 font-bold">
                                      Yes, Visit
                                      <a href="https://certification.thefuturemed.com" target="_blank">
                                        Certification Portal
                                      </a>
                                      .
                                    </span>
                                  ) : (
                                    <span className="text-red-600 font-bold">
                                      No
                                    </span>
                                  )}
                                </p>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                      {isHost && (
                        <div className="mt-6">
                          <Card>
                            <CardHeader>
                              <CardTitle>Registered Participants</CardTitle>
                            </CardHeader>
                            <CardContent>
                              <p className="text-gray-600">
                                Total registrations : {participantCount}
                              </p>
                            </CardContent>
                          </Card>
                        </div>
                      )}

                      {/* {!isHost && (
                        <div className="flex justify-center pt-4">
                          <Button
                            onClick={() => {
                              mixpanelInstance.track(
                                "Seminar Register / Cancel Button Clicked",
                                {
                                  timestamp: new Date().toISOString(),
                                }
                              );
                              if (isRegistered) {
                                handleCancelRegistration();
                              } else {
                                handleRegister();
                              }
                            }}
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
                      )} */}
                    </CardContent>
                  </Card>
                </div>

                {/* Right side - Social share buttons */}

                {/* <div className="w-full md:w-48 relative">
                  <Card className="p-4 flex flex-col justify-between">
                    <div className="flex flex-col items-center gap-4">
                      <p className="font-medium">Share this seminar</p>
                      <div className="flex flex-col gap-2 w-full">
                        <SocialShareButtons
                          // url={window.location.href}
                          url={`${window.location.origin}/seminar/${createSlug(
                            seminar.topic
                          )}/${seminar.id}`}
                          title={seminar.topic}
                          description={seminar.description}
                        />
                      </div>
                    </div>
                  </Card>
                </div> */}
              </div>

              {isHost && (
                <Card className="my-8">
                  <CardHeader>
                    <CardTitle>Participant Certificate Status</CardTitle>
                    <p>
                      As Host, you need to approve the participant to download
                      their participation certificate.
                    </p>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto mt-4">
                      <table className="min-w-full border border-gray-300 rounded-lg">
                        <thead>
                          <tr className="bg-gray-100 text-center">
                            <th className="px-4 py-2 border">Name</th>
                            <th className="px-4 py-2 border">Gender</th>
                            <th className="px-4 py-2 border">Date of Birth</th>
                            <th className="px-4 py-2 border" colSpan={2}>
                              Certificate Status
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {participantProfiles.length > 0 ? (
                            participantProfiles.map((profile, index) => (
                              <tr key={index} className="text-center">
                                <td className="px-4 py-2 border">
                                  {profile.name}
                                </td>
                                <td className="px-4 py-2 border">
                                  {profile.gender}
                                </td>
                                <td className="px-4 py-2 border">
                                  {profile.dob}
                                </td>
                                {/* <td className="px-4 py-2 border">
                              <input
                                type="checkbox"
                                checked={selectedProfiles.includes(profile.id)}
                                onChange={() =>
                                  handleCheckboxChange(profile.id)
                                }
                              />
                            </td> */}
                                <td className="px-4 py-2 border">
                                  {profile.certificate_download ? (
                                    <Badge
                                      variant="outline"
                                      className="bg-green-100 text-green-800"
                                    >
                                      Confirmed
                                    </Badge>
                                  ) : (
                                    <Badge
                                      variant="outline"
                                      className="bg-yellow-100 text-yellow-800"
                                    >
                                      Pending
                                    </Badge>
                                  )}
                                </td>
                                <td className="px-4 py-2 border">
                                  {!profile.certificate_download && (
                                    <input
                                      type="checkbox"
                                      checked={selectedProfiles.includes(
                                        profile.id
                                      )}
                                      onChange={() =>
                                        handleCheckboxChange(profile.id)
                                      }
                                      disabled={profile.certificate_download}
                                    />
                                  )}
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td
                                colSpan={4}
                                className="px-4 py-2 border text-center"
                              >
                                No participants registered yet
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>

                      {/* Confirm button only works if checkboxes selected */}
                      <button
                        className={`mt-4 px-3 py-1 rounded text-white ${
                          selectedProfiles.length > 0
                            ? "bg-blue-500 hover:bg-blue-600"
                            : "bg-gray-400 cursor-not-allowed"
                        }`}
                        disabled={selectedProfiles.length === 0}
                        onClick={() =>
                          handleConfirmCertificate(selectedProfiles)
                        }
                      >
                        Confirm Certificate
                      </button>
                    </div>
                  </CardContent>
                </Card>
              )}

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
                                <span className="font-medium">
                                  Qualification:
                                </span>{" "}
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

                <CardContent>
                  <div className="space-y-4">
                    {timeLeft === "Seminar has ended" ? (
                      <div className="bg-red-600 text-white py-3 px-4 rounded-lg mb-6 flex items-center">
                        <Clock className="h-5 w-5 mr-2" />
                        <span className="font-semibold">
                          This seminar session has ended
                        </span>
                      </div>
                    ) : timeLeft &&
                      seminarStartTime &&
                      seminar.host_country === "India" ? (
                      <div className="bg-blue-600 text-white py-3 px-4 rounded-lg mb-6 flex flex-col md:flex-row items-center justify-between">
                        <div className="flex items-center mb-2 md:mb-0">
                          <Clock className="h-5 w-5 mr-2" />
                          <span className="font-semibold">
                            Time left: {timeLeft}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <CalendarDays className="h-5 w-5 mr-2" />
                          <span className="text-sm">
                            Ends: {formatDate(seminar.date)} at{" "}
                            {formatTime(
                              new Date(seminarEndTime!)
                                .toTimeString()
                                .slice(0, 5)
                            )}
                            {seminar.host_country &&
                              ` (${seminar.host_country} Time)`}
                          </span>
                        </div>
                      </div>
                    ) : (
                      <div className="bg-gray-200 text-black py-3 px-4 rounded-lg mb-6 flex items-center">
                        <Clock className="h-5 w-5 mr-2" />
                        <span className="font-semibold">
                          Your Country: {seminar.host_country} - Please check
                          the time difference manually.
                          {timeLeft &&
                            ` Time left: ${timeLeft} (${seminar.host_country})`}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="space-y-4">
                    {(seminar.meeting_id || isHost) && (
                      <div className="text-center py-4 space-y-4">
                        {timeLeft === "Seminar has ended" ? (
                          <p className="text-sm text-red-600">
                            This seminar session has concluded
                          </p>
                        ) : isHost ? (
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
                          {isHost ? (
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button
                                  disabled={
                                    creatingMeeting ||
                                    isJoinButtonDisabled ||
                                    timeLeft === "Seminar has ended"
                                  }
                                  // className={`px-8 py-3 text-lg bg-green-600 hover:bg-green-700`}
                                  className={`px-8 py-3 text-lg ${
                                    timeLeft === "Seminar has ended"
                                      ? "bg-gray-500 cursor-not-allowed"
                                      : "bg-green-600 hover:bg-green-700"
                                  }`}
                                >
                                  {isJoinButtonDisabled
                              ? "You're the host — but it's not time to start the seminar just yet."
                              : "Start Meeting"} 
                                  {timeLeft === "Seminar has ended"
                                    ? "Start Meeting"
                                    : isJoinButtonDisabled
                                    ? "You're the host — but it's not time to start the seminar just yet."
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
                                      checked={
                                        meetingOptions.disableParticipantMic
                                      }
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
                                      checked={
                                        meetingOptions.disableParticipantVideo
                                      }
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
                                        " Start Seminer Button Clicked",
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
                              onClick={() => {
                                mixpanelInstance.track(
                                  "Join Seminar Button Clicked",
                                  {
                                    timestamp: new Date().toISOString(),
                                  }
                                );
                                handleJoinMeeting();
                              }}
                              disabled={
                                creatingMeeting ||
                                isJoinButtonDisabled ||
                                timeLeft === "Seminar has ended"
                              }
                              className={`px-8 py-3 text-lg ${
                                timeLeft === "Seminar has ended" ||
                                isJoinButtonDisabled
                                  ? "bg-gray-500 cursor-not-allowed"
                                  : "bg-blue-600 hover:bg-blue-700"
                              }`}
                            >
                              {timeLeft === "Seminar has ended" ? (
                                "Join Meeting"
                              ) : creatingMeeting ? (
                                <>
                                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                  Joining...
                                </>
                              ) : isJoinButtonDisabled ? (
                                "You're the Participant — but it's not time to join the seminar just yet."
                              ) : (
                                "Join Meeting"
                              )}
                            </Button>
                          {showCertificateButton && (
                            <Button className="mt-3 px-4 py-2 bg-blue-600 text-white rounded">
                              🎓 Finish Seminar & Get Certificate
                            </Button>
                          )}
                          )}
                        </div> */}
                        <div className="flex flex-col items-center gap-3">
                          {isHost ? (
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button
                                  disabled={
                                    creatingMeeting ||
                                    isJoinButtonDisabled ||
                                    timeLeft === "Seminar has ended"
                                  }
                                  className={`px-8 py-3 text-lg ${
                                    timeLeft === "Seminar has ended"
                                      ? "bg-gray-500 cursor-not-allowed"
                                      : "bg-green-600 hover:bg-green-700"
                                  }`}
                                >
                                  {timeLeft === "Seminar has ended"
                                    ? "Start Meeting"
                                    : isJoinButtonDisabled
                                    ? "You're the host — but it's not time to start the seminar just yet."
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
                                      checked={
                                        meetingOptions.disableParticipantMic
                                      }
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
                                      checked={
                                        meetingOptions.disableParticipantVideo
                                      }
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
                                        " Start Seminer Button Clicked",
                                        {
                                          timestamp: new Date().toISOString(),
                                        }
                                      );
                                      handleJoinMeeting();
                                    }}
                                    className="bg-green-600 hover:bg-green-700"
                                  >
                                    Start Meeting
                                  </Button>
                                </DialogFooter>
                              </DialogContent>
                            </Dialog>
                          ) : (
                            <>
                              <Button
                                onClick={() => {
                                  mixpanelInstance.track(
                                    "Join Seminar Button Clicked",
                                    {
                                      timestamp: new Date().toISOString(),
                                    }
                                  );
                                  handleJoinMeeting();
                                }}
                                disabled={
                                  creatingMeeting ||
                                  isJoinButtonDisabled ||
                                  timeLeft === "Seminar has ended"
                                }
                                className={`px-8 py-3 text-lg ${
                                  timeLeft === "Seminar has ended" ||
                                  isJoinButtonDisabled
                                    ? "bg-gray-500 cursor-not-allowed"
                                    : "bg-blue-600 hover:bg-blue-700"
                                }`}
                              >
                                {timeLeft === "Seminar has ended" ? (
                                  "Join Meeting"
                                ) : creatingMeeting ? (
                                  <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Joining...
                                  </>
                                ) : isJoinButtonDisabled ? (
                                  "You're the Participant — but it's not time to join the seminar just yet."
                                ) : (
                                  "Join Meeting"
                                )}
                              </Button>

                              {/* Certificate Button - shown only for participants when seminar has ended */}
                              {/* {timeLeft === "Seminar has ended" && (
                                <Button
                                  className="px-8 py-3 text-lg bg-purple-600 hover:bg-purple-700"
                                  onClick={() => {
                                    // Add your certificate generation logic here
                                    mixpanelInstance.track(
                                      "Certificate Button Clicked",
                                      {
                                        timestamp: new Date().toISOString(),
                                      }
                                    );
                                    handleGetCertificate();
                                  }}
                                >
                                  🎓 Finish Seminar & Get Certificate
                                </Button>
                              )} */}
                              {/* {timeLeft === "Seminar has ended" && (
                                <Button
                                  className={`px-8 py-3 text-lg ${
                                    participantProfiles.find(
                                      (p) => p.id === userId
                                    )?.certificate_download
                                      ? "bg-purple-600 hover:bg-purple-700"
                                      : "bg-gray-400 cursor-not-allowed"
                                  }`}
                                  disabled={
                                    !participantProfiles.find(
                                      (p) => p.id === userId
                                    )?.certificate_download
                                  }
                                  onClick={() => {
                                    if (
                                      participantProfiles.find(
                                        (p) => p.id === userId
                                      )?.certificate_download
                                    ) {
                                      mixpanelInstance.track(
                                        "Certificate Button Clicked",
                                        {
                                          timestamp: new Date().toISOString(),
                                        }
                                      );
                                      handleGetCertificate();
                                    }
                                  }}
                                >
                                  🎓 Finish Seminar & Get Certificate
                                </Button>
                              )} */}
                              {/* {timeLeft === "Seminar has ended" && (
                                <Button
                                  className={`px-8 py-3 text-lg ${
                                    participantProfiles.find(
                                      (p) => p.id === user?.id
                                    )?.certificate_download
                                      ? "bg-purple-600 hover:bg-purple-700"
                                      : "bg-gray-400 cursor-not-allowed"
                                  }`}
                                  disabled={
                                    !participantProfiles.find(
                                      (p) => p.id === user?.id
                                    )?.certificate_download
                                  }
                                  onClick={() => {
                                    if (
                                      participantProfiles.find(
                                        (p) => p.id === user?.id
                                      )?.certificate_download
                                    ) {
                                      mixpanelInstance.track(
                                        "Certificate Button Clicked",
                                        {
                                          timestamp: new Date().toISOString(),
                                        }
                                      );
                                      handleGetCertificate();
                                    }
                                  }}
                                >
                                  Host has approved, Download the Certificate
                                </Button>
                              )} */}
                            </>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className="space-y-6">
              {user?.id && user?.id !== seminar.host_id && (
                <Card
                  className={isEnrolled ? "border-green-200 bg-green-50" : ""}
                >
                  <CardContent className="p-6">
                    {isEnrolled ? (
                      <div className="text-center mb-6">
                        <Badge className="mb-4 bg-green-100 text-green-800">
                          Registered
                        </Badge>
                        <div className="text-2xl font-bold text-green-600 mb-2">
                          Access Granted
                        </div>
                        <p className="text-sm text-gray-600">
                          You are registered for this seminar
                        </p>
                      </div>
                    ) : (
                      <div className="text-center mb-6">
                        <div className="text-3xl font-bold text-blue-600 mb-2">
                          {seminar?.is_paid &&
                          seminar?.price &&
                          seminar.price > 0
                            ? `₹${seminar.price.toFixed(2)}`
                            : "Free"}
                        </div>
                        <p className="text-sm text-gray-600">
                          {seminar?.is_paid
                            ? "One-time payment • Seminar access"
                            : "No payment required • Seminar access"}
                        </p>
                      </div>
                    )}
                    {checkingEnrollment ? (
                      <Button className="w-full mb-4" size="lg" disabled>
                        Checking enrollment...
                      </Button>
                    ) : isEnrolled ? (
                      // <Button
                      //   className="w-full mb-4 bg-green-600 hover:bg-green-700"
                      //   size="lg"
                      //   onClick={handleAccessCourse}
                      // >
                      //   <Play className="mr-2 h-4 w-4" />
                      //   Access Seminar
                      // </Button>
                      <div className="text-center mb-4">
                        <p className="text-green-600 font-semibold">
                          ✅ You are enrolled!
                        </p>
                      </div>
                    ) : seminar?.is_paid ? (
                      <EnrollmentButton
                        productType="seminar"
                        productName={seminar.topic}
                        productId={seminarId!}
                        isEnrolled={isEnrolled}
                        isPaid={seminar.is_paid}
                        price={seminar.price}
                        onEnrollmentChange={checkEnrollmentStatus}
                        mixpanelInstance={mixpanelInstance}
                      />
                    ) : (
                      <Button
                        className="w-full mb-4"
                        size="lg"
                        onClick={async () => {
                          try {
                            setCheckingEnrollment(true);
                            const { data, error } = await supabase
                              .from("seminar_registrations")
                              // .from("seminar")
                              .insert([
                                {
                                  user_id: (
                                    await supabase.auth.getSession()
                                  ).data.session?.user.id,
                                  seminar_id: seminarId,
                                  payment_status: "free",
                                },
                              ]);

                            if (error) throw error;

                            setIsEnrolled(true);
                            mixpanelInstance.track(
                              "Seminar Enrolled - Free Button Clicked",
                              {
                                payment_status: "free",
                                timestamp: new Date().toISOString(),
                              }
                            );

                            toast({
                              title: "Enrolled Successfully!",
                              description:
                                "You now have access to this free course.",
                            });
                          } catch (error) {
                            toast({
                              title: "Enrollment Failed",
                              description:
                                "There was an issue enrolling in this course.",
                              variant: "destructive",
                            });
                          } finally {
                            setCheckingEnrollment(false);
                          }
                        }}
                      >
                        Enroll for Free
                      </Button>
                      //   <div className="text-center">
                      //   <Button
                      //     onClick={() => {
                      //       mixpanelInstance.track(
                      //         "Seminar Register / Cancel Button Clicked",
                      //         {
                      //           timestamp: new Date().toISOString(),
                      //         }
                      //       );
                      //       if (isRegistered) {
                      //         handleCancelRegistration();
                      //       } else {
                      //         handleRegister();
                      //       }
                      //     }}
                      //     disabled={registering || canceling}
                      //     className="w-full mb-4 bg-blue-600 hover:bg-blue-700"
                      //     size="lg"
                      //   >
                      //     {registering
                      //       ? "Registering..."
                      //       : canceling
                      //       ? "Cancelling..."
                      //       : isRegistered
                      //       ? "Cancel Registration"
                      //       : seminar?.is_paid
                      //       ? "Register & Pay"
                      //       : "Register for Free"}
                      //   </Button>
                      // </div>
                    )}

                    {/* {!isHost && (
                    <div className="text-center">
                      <Button
                        onClick={() => {
                          mixpanelInstance.track(
                            "Seminar Register / Cancel Button Clicked",
                            {
                              timestamp: new Date().toISOString(),
                            }
                          );
                          if (isRegistered) {
                            handleCancelRegistration();
                          } else {
                            handleRegister();
                          }
                        }}
                        disabled={registering || canceling}
                        className="w-full mb-4 bg-blue-600 hover:bg-blue-700"
                        size="lg"
                      >
                        {registering
                          ? "Registering..."
                          : canceling
                          ? "Cancelling..."
                          : isRegistered
                          ? "Cancel Registration"
                          : seminar?.is_paid
                          ? "Register & Pay"
                          : "Register for Free"}
                      </Button>
                    </div>
                  )} */}

                    <div className="space-y-3 text-sm">
                      {/* <div className="flex items-center justify-between">
                        <span className="flex items-center space-x-2">
                          <Clock className="h-4 w-4" />
                          <span>Duration</span>
                        </span>
                        <span>1 hour</span>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="flex items-center space-x-2">
                          <Users className="h-4 w-4" />
                          <span>Participants</span>
                        </span>
                        <span>{participantCount}</span>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="flex items-center space-x-2">
                          <CalendarDays className="h-4 w-4" />
                          <span>Date</span>
                        </span>
                        <span>{seminar ? formatDate(seminar.date) : ""}</span>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="flex items-center space-x-2">
                          <Clock className="h-4 w-4" />
                          <span>Time</span>
                        </span>
                        <span>{seminar ? formatTime(seminar.time) : ""}</span>
                      </div> */}

                      {/* {seminar?.is_paid && (
                        <div className="flex items-center justify-between">
                          <span className="flex items-center space-x-2">
                            <Award className="h-4 w-4" />
                            <span>Certificate</span>
                          </span>
                          <span>Included</span>
                        </div>
                      )} */}
                      <p className="text-gray-500 text-sm mt-2">
                        Note : There is no refund policy for seminar
                        registration. Read our Refund Policy.
                      </p>
                      <p className="text-blue-500 text-sm mt-2">
                        Note : Your payment method should allow international
                        payments..
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )}

              <Card>
                <CardHeader>
                  <CardTitle>Host's details :</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <User className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold">{seminar?.host_name}</h4>
                      {seminar?.host_country && (
                        <p className="text-sm text-gray-600">
                          From {seminar.host_country}
                        </p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Share the Seminar</CardTitle>
                </CardHeader>
                <CardContent>
                  <SocialShareButtons
                    url={`${window.location.origin}/seminar/${createSlug(
                      seminar?.topic || ""
                    )}/${seminar?.id}`}
                    title={seminar?.topic || ""}
                    description={seminar?.description || ""}
                  />
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default SeminarDetails;
