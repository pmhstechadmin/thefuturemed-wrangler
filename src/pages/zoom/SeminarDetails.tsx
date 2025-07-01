// // // // // // // // // // // // // import { useState, useEffect, useMemo } from "react";
// // // // // // // // // // // // // import React from "react";
// // // // // // // // // // // // // import { useParams, useNavigate, Link } from "react-router-dom";
// // // // // // // // // // // // // import { Button } from "@/components/ui/button";
// // // // // // // // // // // // // import {
// // // // // // // // // // // // //   Card,
// // // // // // // // // // // // //   CardContent,
// // // // // // // // // // // // //   CardDescription,
// // // // // // // // // // // // //   CardHeader,
// // // // // // // // // // // // //   CardTitle,
// // // // // // // // // // // // // } from "@/components/ui/card";
// // // // // // // // // // // // // import { Badge } from "@/components/ui/badge";
// // // // // // // // // // // // // import {
// // // // // // // // // // // // //   ArrowLeft,
// // // // // // // // // // // // //   User as UserIcon,
// // // // // // // // // // // // //   Clock,
// // // // // // // // // // // // //   CalendarDays,
// // // // // // // // // // // // //   Users,
// // // // // // // // // // // // //   CheckCircle,
// // // // // // // // // // // // //   Home,
// // // // // // // // // // // // //   Shield,
// // // // // // // // // // // // //   Mic,
// // // // // // // // // // // // //   MicOff,
// // // // // // // // // // // // //   Video,
// // // // // // // // // // // // //   VideoOff,
// // // // // // // // // // // // //   PhoneOff,
// // // // // // // // // // // // //   Copy,
// // // // // // // // // // // // //   Share2,
// // // // // // // // // // // // //   Maximize,
// // // // // // // // // // // // //   Minimize,
// // // // // // // // // // // // //   Settings,
// // // // // // // // // // // // //   MessageSquare,
// // // // // // // // // // // // //   MoreVertical,
// // // // // // // // // // // // //   FileText,
// // // // // // // // // // // // //   Bookmark,
// // // // // // // // // // // // //   Hand,
// // // // // // // // // // // // //   QrCode,
// // // // // // // // // // // // //   ScreenShare as ScreenShareIcon,
// // // // // // // // // // // // //   Circle as RecordingIcon,
// // // // // // // // // // // // //   Circle,
// // // // // // // // // // // // // } from "lucide-react";
// // // // // // // // // // // // // import { supabase } from "@/integrations/supabase/client";
// // // // // // // // // // // // // import { useToast } from "@/hooks/use-toast";
// // // // // // // // // // // // // import type { User as AuthUser } from "@supabase/supabase-js";
// // // // // // // // // // // // // import {
// // // // // // // // // // // // //   Constants,
// // // // // // // // // // // // //   MeetingProvider,
// // // // // // // // // // // // //   useMeeting,
// // // // // // // // // // // // //   useParticipant,
// // // // // // // // // // // // // } from "@videosdk.live/react-sdk";
// // // // // // // // // // // // // import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// // // // // // // // // // // // // import { Progress } from "@/components/ui/progress";
// // // // // // // // // // // // // import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// // // // // // // // // // // // // import { Input } from "@/components/ui/input";
// // // // // // // // // // // // // import { ScrollArea } from "@/components/ui/scroll-area";
// // // // // // // // // // // // // import { useRef } from "react";

// // // // // // // // // // // // // // Types
// // // // // // // // // // // // // interface Seminar {
// // // // // // // // // // // // //   id: string;
// // // // // // // // // // // // //   host_name: string;
// // // // // // // // // // // // //   topic: string;
// // // // // // // // // // // // //   description: string;
// // // // // // // // // // // // //   date: string;
// // // // // // // // // // // // //   time: string;
// // // // // // // // // // // // //   host_id: string;
// // // // // // // // // // // // //   meeting_id?: string | null;
// // // // // // // // // // // // //   max_participants?: number;
// // // // // // // // // // // // //   current_participants?: number;
// // // // // // // // // // // // //   materials?: string[];
// // // // // // // // // // // // // }

// // // // // // // // // // // // // interface Speaker {
// // // // // // // // // // // // //   id: string;
// // // // // // // // // // // // //   name: string;
// // // // // // // // // // // // //   qualification: string;
// // // // // // // // // // // // //   department: string;
// // // // // // // // // // // // //   bio: string;
// // // // // // // // // // // // //   avatar_url?: string;
// // // // // // // // // // // // // }

// // // // // // // // // // // // // interface ChatMessage {
// // // // // // // // // // // // //   id: string;
// // // // // // // // // // // // //   sender: string;
// // // // // // // // // // // // //   message: string;
// // // // // // // // // // // // //   timestamp: string;
// // // // // // // // // // // // //   isCurrentUser: boolean;
// // // // // // // // // // // // // }

// // // // // // // // // // // // // interface Poll {
// // // // // // // // // // // // //   id: string;
// // // // // // // // // // // // //   question: string;
// // // // // // // // // // // // //   options: {
// // // // // // // // // // // // //     id: string;
// // // // // // // // // // // // //     text: string;
// // // // // // // // // // // // //     votes: number;
// // // // // // // // // // // // //   }[];
// // // // // // // // // // // // //   totalVotes: number;
// // // // // // // // // // // // // }

// // // // // // // // // // // // // // Context
// // // // // // // // // // // // // const MeetingAppContext = React.createContext<any>(null);

// // // // // // // // // // // // // const MeetingAppProvider = ({ children }: { children: React.ReactNode }) => {
// // // // // // // // // // // // //   const [selectedMic, setSelectedMic] = useState<any>(null);
// // // // // // // // // // // // //   const [selectedWebcam, setSelectedWebcam] = useState<any>(null);
// // // // // // // // // // // // //   const [selectedSpeaker, setSelectedSpeaker] = useState<any>(null);

// // // // // // // // // // // // //   return (
// // // // // // // // // // // // //     <MeetingAppContext.Provider
// // // // // // // // // // // // //       value={{
// // // // // // // // // // // // //         selectedMic,
// // // // // // // // // // // // //         setSelectedMic,
// // // // // // // // // // // // //         selectedWebcam,
// // // // // // // // // // // // //         setSelectedWebcam,
// // // // // // // // // // // // //         selectedSpeaker,
// // // // // // // // // // // // //         setSelectedSpeaker,
// // // // // // // // // // // // //       }}
// // // // // // // // // // // // //     >
// // // // // // // // // // // // //       {children}
// // // // // // // // // // // // //     </MeetingAppContext.Provider>
// // // // // // // // // // // // //   );
// // // // // // // // // // // // // };

// // // // // // // // // // // // // // Components

// // // // // // // // // // // // // const ParticipantView = ({ participantId }: { participantId: string }) => {
// // // // // // // // // // // // //   const { webcamStream, micStream, displayName, isLocal, webcamOn } =
// // // // // // // // // // // // //     useParticipant(participantId);
// // // // // // // // // // // // //   const videoRef = React.useRef<HTMLVideoElement>(null);
// // // // // // // // // // // // //   const mediaStreamRef = React.useRef<MediaStream | null>(null);

// // // // // // // // // // // // //   useEffect(() => {
// // // // // // // // // // // // //     const videoElement = videoRef.current;

// // // // // // // // // // // // //     if (videoElement && webcamStream && webcamOn) {
// // // // // // // // // // // // //       if (mediaStreamRef.current) {
// // // // // // // // // // // // //         mediaStreamRef.current.getTracks().forEach((track) => track.stop());
// // // // // // // // // // // // //       }

// // // // // // // // // // // // //       mediaStreamRef.current = new MediaStream();
// // // // // // // // // // // // //       mediaStreamRef.current.addTrack(webcamStream.track);

// // // // // // // // // // // // //       videoElement.srcObject = mediaStreamRef.current;
// // // // // // // // // // // // //       videoElement.muted = isLocal;

// // // // // // // // // // // // //       videoElement.play().catch((error) => {
// // // // // // // // // // // // //         console.error("Video play error:", error);
// // // // // // // // // // // // //       });
// // // // // // // // // // // // //     }

// // // // // // // // // // // // //     return () => {
// // // // // // // // // // // // //       if (videoElement) {
// // // // // // // // // // // // //         videoElement.srcObject = null;
// // // // // // // // // // // // //       }
// // // // // // // // // // // // //       if (mediaStreamRef.current) {
// // // // // // // // // // // // //         mediaStreamRef.current.getTracks().forEach((track) => {
// // // // // // // // // // // // //           track.stop();
// // // // // // // // // // // // //           track.enabled = false;
// // // // // // // // // // // // //         });
// // // // // // // // // // // // //         mediaStreamRef.current = null;
// // // // // // // // // // // // //       }
// // // // // // // // // // // // //     };
// // // // // // // // // // // // //   }, [webcamStream, webcamOn, isLocal]);

// // // // // // // // // // // // //   return (
// // // // // // // // // // // // //     <div className="relative rounded-lg overflow-hidden bg-black aspect-video">
// // // // // // // // // // // // //       {webcamOn ? (
// // // // // // // // // // // // //         <video
// // // // // // // // // // // // //           ref={videoRef}
// // // // // // // // // // // // //           autoPlay
// // // // // // // // // // // // //           playsInline
// // // // // // // // // // // // //           muted={isLocal}
// // // // // // // // // // // // //           className="w-full h-full object-cover"
// // // // // // // // // // // // //         />
// // // // // // // // // // // // //       ) : (
// // // // // // // // // // // // //         <div className="absolute inset-0 bg-gray-800 flex items-center justify-center">
// // // // // // // // // // // // //           <div className="bg-gray-700 rounded-full w-20 h-20 flex items-center justify-center">
// // // // // // // // // // // // //             <UserIcon size={24} className="text-white" />
// // // // // // // // // // // // //           </div>
// // // // // // // // // // // // //         </div>
// // // // // // // // // // // // //       )}
// // // // // // // // // // // // //       <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2">
// // // // // // // // // // // // //         <div className="flex items-center">
// // // // // // // // // // // // //           <div className="bg-black/50 text-white px-2 py-1 rounded text-sm">
// // // // // // // // // // // // //             {displayName} {isLocal && "(You)"}
// // // // // // // // // // // // //           </div>
// // // // // // // // // // // // //         </div>
// // // // // // // // // // // // //       </div>
// // // // // // // // // // // // //     </div>
// // // // // // // // // // // // //   );
// // // // // // // // // // // // // };

// // // // // // // // // // // // // // const MeetingControls = () => {
// // // // // // // // // // // // // //   const meeting = useMeeting();
// // // // // // // // // // // // // //   const [isFullscreen, setIsFullscreen] = useState(false);
// // // // // // // // // // // // // //   const { toast } = useToast();

// // // // // // // // // // // // // //   const toggleFullscreen = () => {
// // // // // // // // // // // // // //     if (!document.fullscreenElement) {
// // // // // // // // // // // // // //       document.documentElement.requestFullscreen().catch(err => {
// // // // // // // // // // // // // //         toast({
// // // // // // // // // // // // // //           title: "Fullscreen Error",
// // // // // // // // // // // // // //           description: err.message,
// // // // // // // // // // // // // //           variant: "destructive",
// // // // // // // // // // // // // //         });
// // // // // // // // // // // // // //       });
// // // // // // // // // // // // // //       setIsFullscreen(true);
// // // // // // // // // // // // // //     } else {
// // // // // // // // // // // // // //       if (document.exitFullscreen) {
// // // // // // // // // // // // // //         document.exitFullscreen();
// // // // // // // // // // // // // //         setIsFullscreen(false);
// // // // // // // // // // // // // //       }
// // // // // // // // // // // // // //     }
// // // // // // // // // // // // // //   };

// // // // // // // // // // // // // //   const copyMeetingLink = () => {
// // // // // // // // // // // // // //     if (meeting?.meetingId) {
// // // // // // // // // // // // // //       const link = `${window.location.origin}/meeting/${meeting.meetingId}`;
// // // // // // // // // // // // // //       navigator.clipboard.writeText(link);
// // // // // // // // // // // // // //       toast({
// // // // // // // // // // // // // //         title: "Link Copied",
// // // // // // // // // // // // // //         description: "Meeting link copied to clipboard",
// // // // // // // // // // // // // //       });
// // // // // // // // // // // // // //     }
// // // // // // // // // // // // // //   };

// // // // // // // // // // // // // //   return (
// // // // // // // // // // // // // //     <div className="fixed bottom-0 left-0 right-0 bg-gray-900 py-3 px-4 flex justify-center space-x-4 z-50">
// // // // // // // // // // // // // //       <Button
// // // // // // // // // // // // // //         onClick={() => meeting?.toggleMic()}
// // // // // // // // // // // // // //         variant={meeting?.localParticipant?.micOn ? "default" : "destructive"}
// // // // // // // // // // // // // //         size="icon"
// // // // // // // // // // // // // //         className="rounded-full w-12 h-12"
// // // // // // // // // // // // // //       >
// // // // // // // // // // // // // //         {meeting?.localParticipant?.micOn ? (
// // // // // // // // // // // // // //           <Mic className="h-5 w-5" />
// // // // // // // // // // // // // //         ) : (
// // // // // // // // // // // // // //           <MicOff className="h-5 w-5" />
// // // // // // // // // // // // // //         )}
// // // // // // // // // // // // // //       </Button>

// // // // // // // // // // // // // //       <Button
// // // // // // // // // // // // // //         onClick={() => meeting?.toggleWebcam()}
// // // // // // // // // // // // // //         variant={meeting?.localParticipant?.webcamOn ? "default" : "destructive"}
// // // // // // // // // // // // // //         size="icon"
// // // // // // // // // // // // // //         className="rounded-full w-12 h-12"
// // // // // // // // // // // // // //       >
// // // // // // // // // // // // // //         {meeting?.localParticipant?.webcamOn ? (
// // // // // // // // // // // // // //           <Video className="h-5 w-5" />
// // // // // // // // // // // // // //         ) : (
// // // // // // // // // // // // // //           <VideoOff className="h-5 w-5" />
// // // // // // // // // // // // // //         )}
// // // // // // // // // // // // // //       </Button>

// // // // // // // // // // // // // //       <Button
// // // // // // // // // // // // // //         onClick={copyMeetingLink}
// // // // // // // // // // // // // //         variant="secondary"
// // // // // // // // // // // // // //         size="icon"
// // // // // // // // // // // // // //         className="rounded-full w-12 h-12"
// // // // // // // // // // // // // //       >
// // // // // // // // // // // // // //         <Share2 className="h-5 w-5" />
// // // // // // // // // // // // // //       </Button>

// // // // // // // // // // // // // //       <Button
// // // // // // // // // // // // // //         onClick={toggleFullscreen}
// // // // // // // // // // // // // //         variant="secondary"
// // // // // // // // // // // // // //         size="icon"
// // // // // // // // // // // // // //         className="rounded-full w-12 h-12"
// // // // // // // // // // // // // //       >
// // // // // // // // // // // // // //         {isFullscreen ? (
// // // // // // // // // // // // // //           <Minimize className="h-5 w-5" />
// // // // // // // // // // // // // //         ) : (
// // // // // // // // // // // // // //           <Maximize className="h-5 w-5" />
// // // // // // // // // // // // // //         )}
// // // // // // // // // // // // // //       </Button>

// // // // // // // // // // // // // //       <Button
// // // // // // // // // // // // // //         variant="destructive"
// // // // // // // // // // // // // //         size="icon"
// // // // // // // // // // // // // //         className="rounded-full w-12 h-12"
// // // // // // // // // // // // // //         onClick={() => meeting?.leave()}
// // // // // // // // // // // // // //       >
// // // // // // // // // // // // // //         <PhoneOff className="h-5 w-5" />
// // // // // // // // // // // // // //       </Button>
// // // // // // // // // // // // // //     </div>
// // // // // // // // // // // // // //   );
// // // // // // // // // // // // // // };

// // // // // // // // // // // // // const MeetingControls = () => {
// // // // // // // // // // // // //   const meeting = useMeeting();
// // // // // // // // // // // // //   const [isFullscreen, setIsFullscreen] = useState(false);
// // // // // // // // // // // // //   const { toast } = useToast();

// // // // // // // // // // // // //   const toggleFullscreen = () => {
// // // // // // // // // // // // //     if (!document.fullscreenElement) {
// // // // // // // // // // // // //       document.documentElement.requestFullscreen().catch((err) => {
// // // // // // // // // // // // //         toast({
// // // // // // // // // // // // //           title: "Fullscreen Error",
// // // // // // // // // // // // //           description: err.message,
// // // // // // // // // // // // //           variant: "destructive",
// // // // // // // // // // // // //         });
// // // // // // // // // // // // //       });
// // // // // // // // // // // // //       setIsFullscreen(true);
// // // // // // // // // // // // //     } else {
// // // // // // // // // // // // //       if (document.exitFullscreen) {
// // // // // // // // // // // // //         document.exitFullscreen();
// // // // // // // // // // // // //         setIsFullscreen(false);
// // // // // // // // // // // // //       }
// // // // // // // // // // // // //     }
// // // // // // // // // // // // //   };

// // // // // // // // // // // // //   const copyMeetingLink = () => {
// // // // // // // // // // // // //     if (meeting?.meetingId) {
// // // // // // // // // // // // //       const link = `${window.location.origin}/meeting/${meeting.meetingId}`;
// // // // // // // // // // // // //       navigator.clipboard.writeText(link);
// // // // // // // // // // // // //       toast({
// // // // // // // // // // // // //         title: "Link Copied",
// // // // // // // // // // // // //         description: "Meeting link copied to clipboard",
// // // // // // // // // // // // //       });
// // // // // // // // // // // // //     }
// // // // // // // // // // // // //   };

// // // // // // // // // // // // //   // const RecordingButton = () => {
// // // // // // // // // // // // //   //   const { startRecording, stopRecording, recordingState } = useMeeting();
// // // // // // // // // // // // //   //   const isRecording = useIsRecording(); // Now properly imported
// // // // // // // // // // // // //   //   const isRecordingRef = useRef(isRecording);

// // // // // // // // // // // // //   //   useEffect(() => {
// // // // // // // // // // // // //   //     isRecordingRef.current = isRecording;
// // // // // // // // // // // // //   //   }, [isRecording]);

// // // // // // // // // // // // //   //   const { isRequestProcessing } = useMemo(
// // // // // // // // // // // // //   //     () => ({
// // // // // // // // // // // // //   //       isRequestProcessing:
// // // // // // // // // // // // //   //         recordingState === Constants.recordingEvents.RECORDING_STARTING ||
// // // // // // // // // // // // //   //         recordingState === Constants.recordingEvents.RECORDING_STOPPING,
// // // // // // // // // // // // //   //     }),
// // // // // // // // // // // // //   //     [recordingState]
// // // // // // // // // // // // //   //   );

// // // // // // // // // // // // //   //   const _handleClick = () => {
// // // // // // // // // // // // //   //     const isRecording = isRecordingRef.current;
// // // // // // // // // // // // //   //     if (isRecording) {
// // // // // // // // // // // // //   //       stopRecording();
// // // // // // // // // // // // //   //     } else {
// // // // // // // // // // // // //   //       startRecording();
// // // // // // // // // // // // //   //     }
// // // // // // // // // // // // //   //   };

// // // // // // // // // // // // //   //   return (
// // // // // // // // // // // // //   //     <Button
// // // // // // // // // // // // //   //       onClick={_handleClick}
// // // // // // // // // // // // //   //       variant={isRecording ? "destructive" : "secondary"}
// // // // // // // // // // // // //   //       size="icon"
// // // // // // // // // // // // //   //       className="rounded-full w-12 h-12 relative"
// // // // // // // // // // // // //   //       disabled={isRequestProcessing}
// // // // // // // // // // // // //   //     >
// // // // // // // // // // // // //   //       <RecordingIcon className="h-5 w-5" />
// // // // // // // // // // // // //   //       {isRecording && (
// // // // // // // // // // // // //   //         <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
// // // // // // // // // // // // //   //       )}
// // // // // // // // // // // // //   //     </Button>
// // // // // // // // // // // // //   //   );
// // // // // // // // // // // // //   // };

// // // // // // // // // // // // //   const RecordingButton = () => {
// // // // // // // // // // // // //     const { startRecording, stopRecording, recordingState } = useMeeting();

// // // // // // // // // // // // //     // Determine if recording is active
// // // // // // // // // // // // //     const isRecording =
// // // // // // // // // // // // //       recordingState === Constants.recordingEvents.RECORDING_STARTED;
// // // // // // // // // // // // //     const isRecordingRef = useRef(isRecording);

// // // // // // // // // // // // //     const handleRecordingClick = () => {
// // // // // // // // // // // // //       if (isRecording) {
// // // // // // // // // // // // //         stopRecording();
// // // // // // // // // // // // //       } else {
// // // // // // // // // // // // //         startRecording();
// // // // // // // // // // // // //       }
// // // // // // // // // // // // //     };

// // // // // // // // // // // // //     return (
// // // // // // // // // // // // //       <Button
// // // // // // // // // // // // //         onClick={handleRecordingClick}
// // // // // // // // // // // // //         variant={isRecording ? "destructive" : "secondary"}
// // // // // // // // // // // // //         size="icon"
// // // // // // // // // // // // //         className="rounded-full w-12 h-12 relative"
// // // // // // // // // // // // //       >
// // // // // // // // // // // // //         <Circle className="h-5 w-5" />
// // // // // // // // // // // // //         {isRecording && (
// // // // // // // // // // // // //           <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
// // // // // // // // // // // // //         )}
// // // // // // // // // // // // //       </Button>
// // // // // // // // // // // // //     );
// // // // // // // // // // // // //   };
// // // // // // // // // // // // //   const ScreenShareButton = () => {
// // // // // // // // // // // // //     const { localScreenShareOn, toggleScreenShare, presenterId } = useMeeting();
// // // // // // // // // // // // //     const handleScreenShareClick = (e: React.MouseEvent<HTMLButtonElement>) => {
// // // // // // // // // // // // //       e.preventDefault();
// // // // // // // // // // // // //       toggleScreenShare();
// // // // // // // // // // // // //     };
// // // // // // // // // // // // //     return (
// // // // // // // // // // // // //       <Button
// // // // // // // // // // // // //         onClick={handleScreenShareClick}
// // // // // // // // // // // // //         variant={localScreenShareOn ? "default" : "secondary"}
// // // // // // // // // // // // //         size="icon"
// // // // // // // // // // // // //         className="rounded-full w-12 h-12"
// // // // // // // // // // // // //         disabled={presenterId ? !localScreenShareOn : false}
// // // // // // // // // // // // //       >
// // // // // // // // // // // // //         <ScreenShareIcon className="h-5 w-5" />
// // // // // // // // // // // // //       </Button>
// // // // // // // // // // // // //     );
// // // // // // // // // // // // //   };

// // // // // // // // // // // // //   return (
// // // // // // // // // // // // //     <div className="fixed bottom-0 left-0 right-0 bg-gray-900 py-3 px-4 flex justify-center space-x-4 z-50">
// // // // // // // // // // // // //       <Button
// // // // // // // // // // // // //         onClick={() => meeting?.toggleMic()}
// // // // // // // // // // // // //         variant={meeting?.localParticipant?.micOn ? "default" : "destructive"}
// // // // // // // // // // // // //         size="icon"
// // // // // // // // // // // // //         className="rounded-full w-12 h-12"
// // // // // // // // // // // // //       >
// // // // // // // // // // // // //         {meeting?.localParticipant?.micOn ? (
// // // // // // // // // // // // //           <Mic className="h-5 w-5" />
// // // // // // // // // // // // //         ) : (
// // // // // // // // // // // // //           <MicOff className="h-5 w-5" />
// // // // // // // // // // // // //         )}
// // // // // // // // // // // // //       </Button>

// // // // // // // // // // // // //       <Button
// // // // // // // // // // // // //         onClick={() => meeting?.toggleWebcam()}
// // // // // // // // // // // // //         variant={
// // // // // // // // // // // // //           meeting?.localParticipant?.webcamOn ? "default" : "destructive"
// // // // // // // // // // // // //         }
// // // // // // // // // // // // //         size="icon"
// // // // // // // // // // // // //         className="rounded-full w-12 h-12"
// // // // // // // // // // // // //       >
// // // // // // // // // // // // //         {meeting?.localParticipant?.webcamOn ? (
// // // // // // // // // // // // //           <Video className="h-5 w-5" />
// // // // // // // // // // // // //         ) : (
// // // // // // // // // // // // //           <VideoOff className="h-5 w-5" />
// // // // // // // // // // // // //         )}
// // // // // // // // // // // // //       </Button>

// // // // // // // // // // // // //       <ScreenShareButton />

// // // // // // // // // // // // //       <RecordingButton />

// // // // // // // // // // // // //       <Button
// // // // // // // // // // // // //         onClick={copyMeetingLink}
// // // // // // // // // // // // //         variant="secondary"
// // // // // // // // // // // // //         size="icon"
// // // // // // // // // // // // //         className="rounded-full w-12 h-12"
// // // // // // // // // // // // //       >
// // // // // // // // // // // // //         <Share2 className="h-5 w-5" />
// // // // // // // // // // // // //       </Button>

// // // // // // // // // // // // //       <Button
// // // // // // // // // // // // //         onClick={toggleFullscreen}
// // // // // // // // // // // // //         variant="secondary"
// // // // // // // // // // // // //         size="icon"
// // // // // // // // // // // // //         className="rounded-full w-12 h-12"
// // // // // // // // // // // // //       >
// // // // // // // // // // // // //         {isFullscreen ? (
// // // // // // // // // // // // //           <Minimize className="h-5 w-5" />
// // // // // // // // // // // // //         ) : (
// // // // // // // // // // // // //           <Maximize className="h-5 w-5" />
// // // // // // // // // // // // //         )}
// // // // // // // // // // // // //       </Button>

// // // // // // // // // // // // //       <Button
// // // // // // // // // // // // //         variant="destructive"
// // // // // // // // // // // // //         size="icon"
// // // // // // // // // // // // //         className="rounded-full w-12 h-12"
// // // // // // // // // // // // //         onClick={() => meeting?.leave()}
// // // // // // // // // // // // //       >
// // // // // // // // // // // // //         <PhoneOff className="h-5 w-5" />
// // // // // // // // // // // // //       </Button>
// // // // // // // // // // // // //     </div>
// // // // // // // // // // // // //   );
// // // // // // // // // // // // // };

// // // // // // // // // // // // // const MeetingContainer = ({ onMeetingLeave, setIsMeetingLeft }: {
// // // // // // // // // // // // //   onMeetingLeave: () => void;
// // // // // // // // // // // // //   setIsMeetingLeft: (value: boolean) => void;
// // // // // // // // // // // // // }) => {
// // // // // // // // // // // // //   const { toast } = useToast();
// // // // // // // // // // // // //   const meeting = useMeeting({
// // // // // // // // // // // // //     onError: (error) => {
// // // // // // // // // // // // //       toast({
// // // // // // // // // // // // //         title: "Meeting Error",
// // // // // // // // // // // // //         description: error.message,
// // // // // // // // // // // // //         variant: "destructive",
// // // // // // // // // // // // //       });
// // // // // // // // // // // // //     },
// // // // // // // // // // // // //     onMeetingLeft: () => {
// // // // // // // // // // // // //       onMeetingLeave();
// // // // // // // // // // // // //       setIsMeetingLeft(true);
// // // // // // // // // // // // //       toast({
// // // // // // // // // // // // //         title: "Left Meeting",
// // // // // // // // // // // // //         description: "You have left the meeting.",
// // // // // // // // // // // // //       });
// // // // // // // // // // // // //     },
// // // // // // // // // // // // //   });

// // // // // // // // // // // // //   const [activeTab, setActiveTab] = useState("participants");
// // // // // // // // // // // // //   const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
// // // // // // // // // // // // //   const [newMessage, setNewMessage] = useState("");
// // // // // // // // // // // // //   const [polls, setPolls] = useState<Poll[]>([]);
// // // // // // // // // // // // //   const [raisedHands, setRaisedHands] = useState<string[]>([]);

// // // // // // // // // // // // //   // Sample data for demonstration
// // // // // // // // // // // // //   useEffect(() => {
// // // // // // // // // // // // //     setChatMessages([
// // // // // // // // // // // // //       {
// // // // // // // // // // // // //         id: "1",
// // // // // // // // // // // // //         sender: "John Doe",
// // // // // // // // // // // // //         message: "Hello everyone!",
// // // // // // // // // // // // //         timestamp: new Date().toISOString(),
// // // // // // // // // // // // //         isCurrentUser: false,
// // // // // // // // // // // // //       },
// // // // // // // // // // // // //       {
// // // // // // // // // // // // //         id: "2",
// // // // // // // // // // // // //         sender: "You",
// // // // // // // // // // // // //         message: "Hi John!",
// // // // // // // // // // // // //         timestamp: new Date().toISOString(),
// // // // // // // // // // // // //         isCurrentUser: true,
// // // // // // // // // // // // //       },
// // // // // // // // // // // // //     ]);

// // // // // // // // // // // // //     setPolls([
// // // // // // // // // // // // //       {
// // // // // // // // // // // // //         id: "1",
// // // // // // // // // // // // //         question: "How useful is this seminar?",
// // // // // // // // // // // // //         options: [
// // // // // // // // // // // // //           { id: "1", text: "Very useful", votes: 15 },
// // // // // // // // // // // // //           { id: "2", text: "Somewhat useful", votes: 8 },
// // // // // // // // // // // // //           { id: "3", text: "Not useful", votes: 2 },
// // // // // // // // // // // // //         ],
// // // // // // // // // // // // //         totalVotes: 25,
// // // // // // // // // // // // //       },
// // // // // // // // // // // // //     ]);
// // // // // // // // // // // // //   }, []);

// // // // // // // // // // // // //   const handleSendMessage = () => {
// // // // // // // // // // // // //     if (newMessage.trim()) {
// // // // // // // // // // // // //       const message: ChatMessage = {
// // // // // // // // // // // // //         id: Date.now().toString(),
// // // // // // // // // // // // //         sender: "You",
// // // // // // // // // // // // //         message: newMessage,
// // // // // // // // // // // // //         timestamp: new Date().toISOString(),
// // // // // // // // // // // // //         isCurrentUser: true,
// // // // // // // // // // // // //       };
// // // // // // // // // // // // //       setChatMessages([...chatMessages, message]);
// // // // // // // // // // // // //       setNewMessage("");
// // // // // // // // // // // // //     }
// // // // // // // // // // // // //   };

// // // // // // // // // // // // //   const handleVote = (pollId: string, optionId: string) => {
// // // // // // // // // // // // //     setPolls(polls.map(poll => {
// // // // // // // // // // // // //       if (poll.id === pollId) {
// // // // // // // // // // // // //         const updatedOptions = poll.options.map(option => {
// // // // // // // // // // // // //           if (option.id === optionId) {
// // // // // // // // // // // // //             return { ...option, votes: option.votes + 1 };
// // // // // // // // // // // // //           }
// // // // // // // // // // // // //           return option;
// // // // // // // // // // // // //         });
// // // // // // // // // // // // //         return {
// // // // // // // // // // // // //           ...poll,
// // // // // // // // // // // // //           options: updatedOptions,
// // // // // // // // // // // // //           totalVotes: poll.totalVotes + 1,
// // // // // // // // // // // // //         };
// // // // // // // // // // // // //       }
// // // // // // // // // // // // //       return poll;
// // // // // // // // // // // // //     }));
// // // // // // // // // // // // //   };

// // // // // // // // // // // // //   const toggleRaiseHand = () => {
// // // // // // // // // // // // //     if (raisedHands.includes(meeting?.localParticipant?.id)) {
// // // // // // // // // // // // //       setRaisedHands(raisedHands.filter(id => id !== meeting?.localParticipant?.id));
// // // // // // // // // // // // //     } else {
// // // // // // // // // // // // //       setRaisedHands([...raisedHands, meeting?.localParticipant?.id]);
// // // // // // // // // // // // //     }
// // // // // // // // // // // // //   };

// // // // // // // // // // // // //   if (!meeting || !meeting.localParticipant) {
// // // // // // // // // // // // //     return (
// // // // // // // // // // // // //       <div className="flex items-center justify-center h-64">
// // // // // // // // // // // // //         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
// // // // // // // // // // // // //         <span className="ml-3">Connecting to meeting...</span>
// // // // // // // // // // // // //       </div>
// // // // // // // // // // // // //     );
// // // // // // // // // // // // //   }

// // // // // // // // // // // // //   const participants = [...meeting.participants.keys()];
// // // // // // // // // // // // //   const gridClass = participants.length <= 1
// // // // // // // // // // // // //     ? "grid-cols-1"
// // // // // // // // // // // // //     : participants.length <= 4
// // // // // // // // // // // // //       ? "grid-cols-2"
// // // // // // // // // // // // //       : "grid-cols-3";

// // // // // // // // // // // // //   return (
// // // // // // // // // // // // //     <div className="relative h-full flex">
// // // // // // // // // // // // //       {/* Main Video Area */}
// // // // // // // // // // // // //       <div className="flex-1 p-4 overflow-auto">
// // // // // // // // // // // // //         <div className={`grid ${gridClass} gap-4`}>
// // // // // // // // // // // // //           <ParticipantView participantId={meeting.localParticipant.id} />
// // // // // // // // // // // // //           {participants
// // // // // // // // // // // // //             .filter((participantId) => participantId !== meeting.localParticipant.id)
// // // // // // // // // // // // //             .map((participantId) => (
// // // // // // // // // // // // //               <ParticipantView
// // // // // // // // // // // // //                 key={participantId}
// // // // // // // // // // // // //                 participantId={participantId}
// // // // // // // // // // // // //               />
// // // // // // // // // // // // //             ))}
// // // // // // // // // // // // //         </div>
// // // // // // // // // // // // //       </div>

// // // // // // // // // // // // //       {/* Sidebar */}
// // // // // // // // // // // // //       <div className="w-80 bg-gray-800 border-l border-gray-700 flex flex-col">
// // // // // // // // // // // // //         <Tabs defaultValue="participants" className="flex-1 flex flex-col">
// // // // // // // // // // // // //           <TabsList className="grid grid-cols-3 bg-gray-800">
// // // // // // // // // // // // //             <TabsTrigger value="participants">People</TabsTrigger>
// // // // // // // // // // // // //             <TabsTrigger value="chat">Chat</TabsTrigger>
// // // // // // // // // // // // //             <TabsTrigger value="polls">Polls</TabsTrigger>
// // // // // // // // // // // // //           </TabsList>

// // // // // // // // // // // // //           <TabsContent value="participants" className="flex-1 overflow-auto">
// // // // // // // // // // // // //             <ScrollArea className="h-full p-4">
// // // // // // // // // // // // //               <div className="space-y-4">
// // // // // // // // // // // // //                 <div className="flex items-center justify-between">
// // // // // // // // // // // // //                   <h3 className="font-medium text-white">Participants ({participants.length + 1})</h3>
// // // // // // // // // // // // //                   <Button
// // // // // // // // // // // // //                     variant={raisedHands.includes(meeting.localParticipant.id) ? "default" : "outline"}
// // // // // // // // // // // // //                     size="sm"
// // // // // // // // // // // // //                     onClick={toggleRaiseHand}
// // // // // // // // // // // // //                   >
// // // // // // // // // // // // //                     <Hand className="h-4 w-4 mr-2" />
// // // // // // // // // // // // //                     {raisedHands.includes(meeting.localParticipant.id) ? "Lower Hand" : "Raise Hand"}
// // // // // // // // // // // // //                   </Button>
// // // // // // // // // // // // //                 </div>

// // // // // // // // // // // // //                 <div className="space-y-2">
// // // // // // // // // // // // //                   {/* Local participant */}
// // // // // // // // // // // // //                   <div className="flex items-center p-2 bg-gray-700 rounded">
// // // // // // // // // // // // //                     <div className="relative">
// // // // // // // // // // // // //                       {/* <Avatar>
// // // // // // // // // // // // //                         <AvatarFallback>You</AvatarFallback>
// // // // // // // // // // // // //                       </Avatar> */}
// // // // // // // // // // // // //                       {raisedHands.includes(meeting.localParticipant.id) && (
// // // // // // // // // // // // //                         <div className="absolute -top-2 -right-2 bg-yellow-500 rounded-full p-1">
// // // // // // // // // // // // //                           <Hand className="h-3 w-3 text-white" />
// // // // // // // // // // // // //                         </div>
// // // // // // // // // // // // //                       )}
// // // // // // // // // // // // //                     </div>
// // // // // // // // // // // // //                     <div className="ml-3">
// // // // // // // // // // // // //                       <p className="text-sm font-medium text-white">You (Host)</p>
// // // // // // // // // // // // //                       <p className="text-xs text-gray-400">Speaking now</p>
// // // // // // // // // // // // //                     </div>
// // // // // // // // // // // // //                   </div>

// // // // // // // // // // // // //                   {/* Other participants */}
// // // // // // // // // // // // //                   {participants.map(participantId => (
// // // // // // // // // // // // //                     <div key={participantId} className="flex items-center p-2 bg-gray-700 rounded">
// // // // // // // // // // // // //                       <div className="relative">
// // // // // // // // // // // // //                         <Avatar>
// // // // // // // // // // // // //                           <AvatarFallback>
// // // // // // // // // // // // //                             {meeting.participants.get(participantId)?.displayName?.charAt(0) || "P"}
// // // // // // // // // // // // //                           </AvatarFallback>
// // // // // // // // // // // // //                         </Avatar>
// // // // // // // // // // // // //                         {raisedHands.includes(participantId) && (
// // // // // // // // // // // // //                           <div className="absolute -top-2 -right-2 bg-yellow-500 rounded-full p-1">
// // // // // // // // // // // // //                             <Hand className="h-3 w-3 text-white" />
// // // // // // // // // // // // //                           </div>
// // // // // // // // // // // // //                         )}
// // // // // // // // // // // // //                       </div>
// // // // // // // // // // // // //                       <div className="ml-3">
// // // // // // // // // // // // //                         <p className="text-sm font-medium text-white">
// // // // // // // // // // // // //                           {meeting.participants.get(participantId)?.displayName || "Participant"}
// // // // // // // // // // // // //                         </p>
// // // // // // // // // // // // //                         <p className="text-xs text-gray-400">Attendee</p>
// // // // // // // // // // // // //                       </div>
// // // // // // // // // // // // //                     </div>
// // // // // // // // // // // // //                   ))}
// // // // // // // // // // // // //                 </div>
// // // // // // // // // // // // //               </div>
// // // // // // // // // // // // //             </ScrollArea>
// // // // // // // // // // // // //           </TabsContent>

// // // // // // // // // // // // //           <TabsContent value="chat" className="flex-1 flex flex-col">
// // // // // // // // // // // // //             <ScrollArea className="flex-1 p-4">
// // // // // // // // // // // // //               <div className="space-y-4">
// // // // // // // // // // // // //                 {chatMessages.map(message => (
// // // // // // // // // // // // //                   <div key={message.id} className={`flex ${message.isCurrentUser ? 'justify-end' : 'justify-start'}`}>
// // // // // // // // // // // // //                     <div className={`max-w-xs p-3 rounded-lg ${message.isCurrentUser ? 'bg-blue-600 text-white' : 'bg-gray-700 text-white'}`}>
// // // // // // // // // // // // //                       {!message.isCurrentUser && (
// // // // // // // // // // // // //                         <p className="text-xs font-semibold mb-1">{message.sender}</p>
// // // // // // // // // // // // //                       )}
// // // // // // // // // // // // //                       <p className="text-sm">{message.message}</p>
// // // // // // // // // // // // //                       <p className="text-xs opacity-70 mt-1">
// // // // // // // // // // // // //                         {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
// // // // // // // // // // // // //                       </p>
// // // // // // // // // // // // //                     </div>
// // // // // // // // // // // // //                   </div>
// // // // // // // // // // // // //                 ))}
// // // // // // // // // // // // //               </div>
// // // // // // // // // // // // //             </ScrollArea>
// // // // // // // // // // // // //             <div className="p-3 border-t border-gray-700">
// // // // // // // // // // // // //               <div className="flex gap-2">
// // // // // // // // // // // // //                 <Input
// // // // // // // // // // // // //                   value={newMessage}
// // // // // // // // // // // // //                   onChange={(e) => setNewMessage(e.target.value)}
// // // // // // // // // // // // //                   placeholder="Type a message..."
// // // // // // // // // // // // //                   className="flex-1 bg-gray-700 border-gray-600 text-white"
// // // // // // // // // // // // //                   onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
// // // // // // // // // // // // //                 />
// // // // // // // // // // // // //                 <Button onClick={handleSendMessage}>Send</Button>
// // // // // // // // // // // // //               </div>
// // // // // // // // // // // // //             </div>
// // // // // // // // // // // // //           </TabsContent>

// // // // // // // // // // // // //           <TabsContent value="polls" className="flex-1 overflow-auto">
// // // // // // // // // // // // //             <ScrollArea className="h-full p-4">
// // // // // // // // // // // // //               <div className="space-y-4">
// // // // // // // // // // // // //                 {polls.map(poll => (
// // // // // // // // // // // // //                   <Card key={poll.id} className="bg-gray-700 border-gray-600">
// // // // // // // // // // // // //                     <CardHeader>
// // // // // // // // // // // // //                       <CardTitle className="text-white">{poll.question}</CardTitle>
// // // // // // // // // // // // //                     </CardHeader>
// // // // // // // // // // // // //                     <CardContent>
// // // // // // // // // // // // //                       <div className="space-y-3">
// // // // // // // // // // // // //                         {poll.options.map(option => (
// // // // // // // // // // // // //                           <div key={option.id} className="space-y-1">
// // // // // // // // // // // // //                             <Button
// // // // // // // // // // // // //                               variant="outline"
// // // // // // // // // // // // //                               className="w-full text-left justify-start bg-gray-600 border-gray-500 hover:bg-gray-500 text-white"
// // // // // // // // // // // // //                               onClick={() => handleVote(poll.id, option.id)}
// // // // // // // // // // // // //                             >
// // // // // // // // // // // // //                               {option.text}
// // // // // // // // // // // // //                             </Button>
// // // // // // // // // // // // //                             <div className="flex items-center gap-2">
// // // // // // // // // // // // //                               <Progress
// // // // // // // // // // // // //                                 value={(option.votes / poll.totalVotes) * 100}
// // // // // // // // // // // // //                                 className="h-2 bg-gray-600"
// // // // // // // // // // // // //                               />
// // // // // // // // // // // // //                               <span className="text-xs text-gray-400">
// // // // // // // // // // // // //                                 {Math.round((option.votes / poll.totalVotes) * 100)}% ({option.votes})
// // // // // // // // // // // // //                               </span>
// // // // // // // // // // // // //                             </div>
// // // // // // // // // // // // //                           </div>
// // // // // // // // // // // // //                         ))}
// // // // // // // // // // // // //                       </div>
// // // // // // // // // // // // //                     </CardContent>
// // // // // // // // // // // // //                   </Card>
// // // // // // // // // // // // //                 ))}
// // // // // // // // // // // // //               </div>
// // // // // // // // // // // // //             </ScrollArea>
// // // // // // // // // // // // //           </TabsContent>
// // // // // // // // // // // // //         </Tabs>
// // // // // // // // // // // // //       </div>

// // // // // // // // // // // // //       <MeetingControls />
// // // // // // // // // // // // //     </div>
// // // // // // // // // // // // //   );
// // // // // // // // // // // // // };

// // // // // // // // // // // // // const JoiningScreen = ({
// // // // // // // // // // // // //   participantName,
// // // // // // // // // // // // //   setParticipantName,
// // // // // // // // // // // // //   meetingId,
// // // // // // // // // // // // //   setMeetingId,
// // // // // // // // // // // // //   setToken,
// // // // // // // // // // // // //   micOn,
// // // // // // // // // // // // //   setMicOn,
// // // // // // // // // // // // //   webcamOn,
// // // // // // // // // // // // //   setWebcamOn,
// // // // // // // // // // // // //   onClickStartMeeting,
// // // // // // // // // // // // //   startMeeting,
// // // // // // // // // // // // //   setIsMeetingLeft,
// // // // // // // // // // // // // }: {
// // // // // // // // // // // // //   participantName: string;
// // // // // // // // // // // // //   setParticipantName: (name: string) => void;
// // // // // // // // // // // // //   meetingId: string;
// // // // // // // // // // // // //   setMeetingId: (id: string) => void;
// // // // // // // // // // // // //   setToken: (token: string) => void;
// // // // // // // // // // // // //   micOn: boolean;
// // // // // // // // // // // // //   setMicOn: (micOn: boolean) => void;
// // // // // // // // // // // // //   webcamOn: boolean;
// // // // // // // // // // // // //   setWebcamOn: (webcamOn: boolean) => void;
// // // // // // // // // // // // //   onClickStartMeeting: () => void;
// // // // // // // // // // // // //   startMeeting: boolean;
// // // // // // // // // // // // //   setIsMeetingLeft: (value: boolean) => void;
// // // // // // // // // // // // // }) => {
// // // // // // // // // // // // //   const { toast } = useToast();

// // // // // // // // // // // // //   const generateToken = async () => {
// // // // // // // // // // // // //     try {
// // // // // // // // // // // // //       const token = import.meta.env.VITE_VIDEOSDK_TOKEN;
// // // // // // // // // // // // //       if (!token) {
// // // // // // // // // // // // //         throw new Error("VideoSDK token not configured");
// // // // // // // // // // // // //       }
// // // // // // // // // // // // //       return token;
// // // // // // // // // // // // //     } catch (error) {
// // // // // // // // // // // // //       console.error("Error generating token:", error);
// // // // // // // // // // // // //       throw new Error("Failed to generate meeting token");
// // // // // // // // // // // // //     }
// // // // // // // // // // // // //   };

// // // // // // // // // // // // //   const handleJoinMeeting = async () => {
// // // // // // // // // // // // //     if (!participantName) {
// // // // // // // // // // // // //       toast({
// // // // // // // // // // // // //         title: "Name Required",
// // // // // // // // // // // // //         description: "Please enter your name",
// // // // // // // // // // // // //         variant: "destructive",
// // // // // // // // // // // // //       });
// // // // // // // // // // // // //       return;
// // // // // // // // // // // // //     }

// // // // // // // // // // // // //     try {
// // // // // // // // // // // // //       const token = await generateToken();
// // // // // // // // // // // // //       setToken(token);
// // // // // // // // // // // // //       onClickStartMeeting();
// // // // // // // // // // // // //     } catch (error) {
// // // // // // // // // // // // //       toast({
// // // // // // // // // // // // //         title: "Meeting Error",
// // // // // // // // // // // // //         description: error instanceof Error ? error.message : "Failed to join meeting",
// // // // // // // // // // // // //         variant: "destructive",
// // // // // // // // // // // // //       });
// // // // // // // // // // // // //     }
// // // // // // // // // // // // //   };

// // // // // // // // // // // // //   return (
// // // // // // // // // // // // //     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
// // // // // // // // // // // // //       <Card className="w-full max-w-md">
// // // // // // // // // // // // //         <CardHeader>
// // // // // // // // // // // // //           <CardTitle>Join Meeting</CardTitle>
// // // // // // // // // // // // //           <CardDescription>
// // // // // // // // // // // // //             Enter meeting details to continue
// // // // // // // // // // // // //           </CardDescription>
// // // // // // // // // // // // //         </CardHeader>
// // // // // // // // // // // // //         <CardContent className="space-y-4">
// // // // // // // // // // // // //           <div className="space-y-2">
// // // // // // // // // // // // //             <label htmlFor="name" className="block text-sm font-medium text-gray-700">
// // // // // // // // // // // // //               Your Name
// // // // // // // // // // // // //             </label>
// // // // // // // // // // // // //             <input
// // // // // // // // // // // // //               id="name"
// // // // // // // // // // // // //               type="text"
// // // // // // // // // // // // //               value={participantName}
// // // // // // // // // // // // //               onChange={(e) => setParticipantName(e.target.value)}
// // // // // // // // // // // // //               className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
// // // // // // // // // // // // //               placeholder="Enter your name"
// // // // // // // // // // // // //             />
// // // // // // // // // // // // //           </div>

// // // // // // // // // // // // //           <div className="space-y-2">
// // // // // // // // // // // // //             <label htmlFor="meetingId" className="block text-sm font-medium text-gray-700">
// // // // // // // // // // // // //               Meeting ID
// // // // // // // // // // // // //             </label>
// // // // // // // // // // // // //             <input
// // // // // // // // // // // // //               id="meetingId"
// // // // // // // // // // // // //               type="text"
// // // // // // // // // // // // //               value={meetingId}
// // // // // // // // // // // // //               onChange={(e) => setMeetingId(e.target.value)}
// // // // // // // // // // // // //               className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
// // // // // // // // // // // // //               placeholder="Enter meeting ID"
// // // // // // // // // // // // //               readOnly
// // // // // // // // // // // // //             />
// // // // // // // // // // // // //           </div>

// // // // // // // // // // // // //           <div className="flex items-center space-x-4">
// // // // // // // // // // // // //             <Button
// // // // // // // // // // // // //               variant={micOn ? "default" : "outline"}
// // // // // // // // // // // // //               onClick={() => setMicOn(!micOn)}
// // // // // // // // // // // // //               className="flex-1"
// // // // // // // // // // // // //             >
// // // // // // // // // // // // //               {micOn ? <Mic className="mr-2 h-4 w-4" /> : <MicOff className="mr-2 h-4 w-4" />}
// // // // // // // // // // // // //               {micOn ? "Mute" : "Unmute"}
// // // // // // // // // // // // //             </Button>
// // // // // // // // // // // // //             <Button
// // // // // // // // // // // // //               variant={webcamOn ? "default" : "outline"}
// // // // // // // // // // // // //               onClick={() => setWebcamOn(!webcamOn)}
// // // // // // // // // // // // //               className="flex-1"
// // // // // // // // // // // // //             >
// // // // // // // // // // // // //               {webcamOn ? <Video className="mr-2 h-4 w-4" /> : <VideoOff className="mr-2 h-4 w-4" />}
// // // // // // // // // // // // //               {webcamOn ? "Stop Video" : "Start Video"}
// // // // // // // // // // // // //             </Button>
// // // // // // // // // // // // //           </div>

// // // // // // // // // // // // //           <Button
// // // // // // // // // // // // //             onClick={handleJoinMeeting}
// // // // // // // // // // // // //             className="w-full"
// // // // // // // // // // // // //             disabled={startMeeting}
// // // // // // // // // // // // //           >
// // // // // // // // // // // // //             {startMeeting ? "Joining..." : "Join Meeting"}
// // // // // // // // // // // // //           </Button>
// // // // // // // // // // // // //         </CardContent>
// // // // // // // // // // // // //       </Card>
// // // // // // // // // // // // //     </div>
// // // // // // // // // // // // //   );
// // // // // // // // // // // // // };

// // // // // // // // // // // // // const LeaveScreen = ({ setIsMeetingLeft }: {
// // // // // // // // // // // // //   setIsMeetingLeft: (value: boolean) => void;
// // // // // // // // // // // // // }) => {
// // // // // // // // // // // // //   return (
// // // // // // // // // // // // //     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
// // // // // // // // // // // // //       <Card className="w-full max-w-md">
// // // // // // // // // // // // //         <CardHeader>
// // // // // // // // // // // // //           <CardTitle>Meeting Ended</CardTitle>
// // // // // // // // // // // // //         </CardHeader>
// // // // // // // // // // // // //         <CardContent className="space-y-4">
// // // // // // // // // // // // //           <p className="text-center">You have left the meeting.</p>
// // // // // // // // // // // // //           <Button
// // // // // // // // // // // // //             onClick={() => setIsMeetingLeft(false)}
// // // // // // // // // // // // //             className="w-full"
// // // // // // // // // // // // //           >
// // // // // // // // // // // // //             Return to Home
// // // // // // // // // // // // //           </Button>
// // // // // // // // // // // // //         </CardContent>
// // // // // // // // // // // // //       </Card>
// // // // // // // // // // // // //     </div>
// // // // // // // // // // // // //   );
// // // // // // // // // // // // // };

// // // // // // // // // // // // // const SeminarDetails = () => {
// // // // // // // // // // // // //   const { seminarId } = useParams();
// // // // // // // // // // // // //   const navigate = useNavigate();
// // // // // // // // // // // // //   const [seminar, setSeminar] = useState<Seminar | null>(null);
// // // // // // // // // // // // //   const [speakers, setSpeakers] = useState<Speaker[]>([]);
// // // // // // // // // // // // //   const [loading, setLoading] = useState(true);
// // // // // // // // // // // // //   const [registering, setRegistering] = useState(false);
// // // // // // // // // // // // //   const [isRegistered, setIsRegistered] = useState(false);
// // // // // // // // // // // // //   const [user, setUser] = useState<AuthUser | null>(null);
// // // // // // // // // // // // //   const { toast } = useToast();
// // // // // // // // // // // // //   const [canceling, setCanceling] = useState(false);
// // // // // // // // // // // // //   const [registrationId, setRegistrationId] = useState<string | null>(null);
// // // // // // // // // // // // //   const isHost = user?.id === seminar?.host_id;

// // // // // // // // // // // // //   // Meeting states
// // // // // // // // // // // // //   const [meetingMode, setMeetingMode] = useState<
// // // // // // // // // // // // //     "JOINING" | "MEETING" | "LEFT"
// // // // // // // // // // // // //   >("JOINING");
// // // // // // // // // // // // //   const [participantName, setParticipantName] = useState("");
// // // // // // // // // // // // //   const [micOn, setMicOn] = useState(false);
// // // // // // // // // // // // //   const [webcamOn, setWebcamOn] = useState(false);
// // // // // // // // // // // // //   const [meetingToken, setMeetingToken] = useState("");
// // // // // // // // // // // // //   const [meetingId, setMeetingId] = useState("");
// // // // // // // // // // // // //   const [joiningMeeting, setJoiningMeeting] = useState(false);

// // // // // // // // // // // // //   const handleBackNavigation = () => {
// // // // // // // // // // // // //     if (window.history.length > 1) {
// // // // // // // // // // // // //       navigate(-1);
// // // // // // // // // // // // //     } else {
// // // // // // // // // // // // //       navigate("/");
// // // // // // // // // // // // //     }
// // // // // // // // // // // // //   };

// // // // // // // // // // // // //   useEffect(() => {
// // // // // // // // // // // // //     checkUser();
// // // // // // // // // // // // //     if (seminarId) {
// // // // // // // // // // // // //       fetchSeminarDetails();
// // // // // // // // // // // // //     }
// // // // // // // // // // // // //   }, [seminarId]);

// // // // // // // // // // // // //   const generateToken = async (): Promise<string> => {
// // // // // // // // // // // // //     try {
// // // // // // // // // // // // //       const token = import.meta.env.VITE_VIDEOSDK_TOKEN;
// // // // // // // // // // // // //       if (!token) {
// // // // // // // // // // // // //         throw new Error("VideoSDK token not configured");
// // // // // // // // // // // // //       }
// // // // // // // // // // // // //       return token;
// // // // // // // // // // // // //     } catch (error) {
// // // // // // // // // // // // //       console.error("Error generating token:", error);
// // // // // // // // // // // // //       throw new Error("Failed to generate meeting token");
// // // // // // // // // // // // //     }
// // // // // // // // // // // // //   };

// // // // // // // // // // // // //   const createMeeting = async (token: string): Promise<string> => {
// // // // // // // // // // // // //     try {
// // // // // // // // // // // // //       const response = await fetch("https://api.videosdk.live/v2/rooms", {
// // // // // // // // // // // // //         method: "POST",
// // // // // // // // // // // // //         headers: {
// // // // // // // // // // // // //           Authorization: token,
// // // // // // // // // // // // //           "Content-Type": "application/json",
// // // // // // // // // // // // //         },
// // // // // // // // // // // // //         body: JSON.stringify({}),
// // // // // // // // // // // // //       });

// // // // // // // // // // // // //       if (!response.ok) {
// // // // // // // // // // // // //         throw new Error(`API request failed with status ${response.status}`);
// // // // // // // // // // // // //       }

// // // // // // // // // // // // //       const { roomId } = await response.json();
// // // // // // // // // // // // //       return roomId;
// // // // // // // // // // // // //     } catch (error) {
// // // // // // // // // // // // //       console.error("Error creating meeting:", error);
// // // // // // // // // // // // //       throw error;
// // // // // // // // // // // // //     }
// // // // // // // // // // // // //   };

// // // // // // // // // // // // //   const checkRegistrationStatus = async (userId: string) => {
// // // // // // // // // // // // //     try {
// // // // // // // // // // // // //       const { data, error, count } = await supabase
// // // // // // // // // // // // //         .from("seminar_registrations")
// // // // // // // // // // // // //         .select("*", { count: "exact", head: true })
// // // // // // // // // // // // //         .eq("seminar_id", seminarId)
// // // // // // // // // // // // //         .eq("user_id", userId);

// // // // // // // // // // // // //       if (error) throw error;

// // // // // // // // // // // // //       setIsRegistered(count ? count > 0 : false);

// // // // // // // // // // // // //       if (count && count > 0) {
// // // // // // // // // // // // //         const { data: registrationData } = await supabase
// // // // // // // // // // // // //           .from("seminar_registrations")
// // // // // // // // // // // // //           .select("id")
// // // // // // // // // // // // //           .eq("seminar_id", seminarId)
// // // // // // // // // // // // //           .eq("user_id", userId)
// // // // // // // // // // // // //           .single();

// // // // // // // // // // // // //         if (registrationData) {
// // // // // // // // // // // // //           setRegistrationId(registrationData.id);
// // // // // // // // // // // // //         }
// // // // // // // // // // // // //       }
// // // // // // // // // // // // //     } catch (error) {
// // // // // // // // // // // // //       console.error("Error checking registration status:", error);
// // // // // // // // // // // // //       setIsRegistered(false);
// // // // // // // // // // // // //     }
// // // // // // // // // // // // //   };

// // // // // // // // // // // // //   const handleHostMeeting = async () => {
// // // // // // // // // // // // //     if (!user) {
// // // // // // // // // // // // //       toast({
// // // // // // // // // // // // //         title: "Authentication Required",
// // // // // // // // // // // // //         description: "Please sign in to host a meeting.",
// // // // // // // // // // // // //         variant: "destructive",
// // // // // // // // // // // // //       });
// // // // // // // // // // // // //       return;
// // // // // // // // // // // // //     }

// // // // // // // // // // // // //     setJoiningMeeting(true);
// // // // // // // // // // // // //     try {
// // // // // // // // // // // // //       const token = await generateToken();
// // // // // // // // // // // // //       const newMeetingId = await createMeeting(token);

// // // // // // // // // // // // //       const { error } = await supabase
// // // // // // // // // // // // //         .from("seminars")
// // // // // // // // // // // // //         .update({ meeting_id: newMeetingId } as Partial<Seminar>)
// // // // // // // // // // // // //         .eq("id", seminarId);

// // // // // // // // // // // // //       if (error) throw error;

// // // // // // // // // // // // //       setMeetingToken(token);
// // // // // // // // // // // // //       setMeetingId(newMeetingId);
// // // // // // // // // // // // //       setParticipantName(user.email || "Host");
// // // // // // // // // // // // //       setMeetingMode("MEETING");
// // // // // // // // // // // // //     } catch (error) {
// // // // // // // // // // // // //       console.error("Host Meeting Error:", error);
// // // // // // // // // // // // //       toast({
// // // // // // // // // // // // //         title: "Meeting Error",
// // // // // // // // // // // // //         description: "Failed to create meeting. Please try again.",
// // // // // // // // // // // // //         variant: "destructive",
// // // // // // // // // // // // //       });
// // // // // // // // // // // // //     } finally {
// // // // // // // // // // // // //       setJoiningMeeting(false);
// // // // // // // // // // // // //     }
// // // // // // // // // // // // //   };

// // // // // // // // // // // // //   const handleJoinMeeting = async () => {
// // // // // // // // // // // // //     if (!user) {
// // // // // // // // // // // // //       toast({
// // // // // // // // // // // // //         title: "Authentication Required",
// // // // // // // // // // // // //         description: "Please sign in to join the meeting.",
// // // // // // // // // // // // //         variant: "destructive",
// // // // // // // // // // // // //       });
// // // // // // // // // // // // //       return;
// // // // // // // // // // // // //     }

// // // // // // // // // // // // //     if (!seminar?.meeting_id) {
// // // // // // // // // // // // //       toast({
// // // // // // // // // // // // //         title: "No Meeting",
// // // // // // // // // // // // //         description: "No meeting has been created for this seminar yet.",
// // // // // // // // // // // // //         variant: "destructive",
// // // // // // // // // // // // //       });
// // // // // // // // // // // // //       return;
// // // // // // // // // // // // //     }

// // // // // // // // // // // // //     setJoiningMeeting(true);
// // // // // // // // // // // // //     try {
// // // // // // // // // // // // //       const token = await generateToken();
// // // // // // // // // // // // //       setMeetingToken(token);
// // // // // // // // // // // // //       setMeetingId(seminar.meeting_id);
// // // // // // // // // // // // //       setParticipantName(user.email || "Participant");
// // // // // // // // // // // // //       setMeetingMode("MEETING");
// // // // // // // // // // // // //     } catch (error) {
// // // // // // // // // // // // //       console.error("Meeting join error:", error);
// // // // // // // // // // // // //       toast({
// // // // // // // // // // // // //         title: "Meeting Error",
// // // // // // // // // // // // //         description: "Failed to join meeting. Please try again.",
// // // // // // // // // // // // //         variant: "destructive",
// // // // // // // // // // // // //       });
// // // // // // // // // // // // //     } finally {
// // // // // // // // // // // // //       setJoiningMeeting(false);
// // // // // // // // // // // // //     }
// // // // // // // // // // // // //   };

// // // // // // // // // // // // //   const copyToClipboard = (text: string) => {
// // // // // // // // // // // // //     navigator.clipboard.writeText(text);
// // // // // // // // // // // // //     toast({
// // // // // // // // // // // // //       title: "Copied to Clipboard",
// // // // // // // // // // // // //       description: "Meeting link has been copied to your clipboard.",
// // // // // // // // // // // // //     });
// // // // // // // // // // // // //   };

// // // // // // // // // // // // //   const checkUser = async () => {
// // // // // // // // // // // // //     try {
// // // // // // // // // // // // //       const {
// // // // // // // // // // // // //         data: { session },
// // // // // // // // // // // // //       } = await supabase.auth.getSession();
// // // // // // // // // // // // //       setUser(session?.user || null);

// // // // // // // // // // // // //       if (session?.user && seminarId) {
// // // // // // // // // // // // //         checkRegistrationStatus(session.user.id);
// // // // // // // // // // // // //       }
// // // // // // // // // // // // //     } catch (error) {
// // // // // // // // // // // // //       console.error("Error checking user:", error);
// // // // // // // // // // // // //     }
// // // // // // // // // // // // //   };

// // // // // // // // // // // // //   const handleSignOut = async () => {
// // // // // // // // // // // // //     try {
// // // // // // // // // // // // //       const { error } = await supabase.auth.signOut();
// // // // // // // // // // // // //       if (error) throw error;
// // // // // // // // // // // // //       setUser(null);
// // // // // // // // // // // // //       toast({
// // // // // // // // // // // // //         title: "Signed Out",
// // // // // // // // // // // // //         description: "You have been successfully signed out.",
// // // // // // // // // // // // //       });
// // // // // // // // // // // // //     } catch (error) {
// // // // // // // // // // // // //       console.error("Sign out error:", error);
// // // // // // // // // // // // //       toast({
// // // // // // // // // // // // //         title: "Error",
// // // // // // // // // // // // //         description: "Failed to sign out. Please try again.",
// // // // // // // // // // // // //         variant: "destructive",
// // // // // // // // // // // // //       });
// // // // // // // // // // // // //     }
// // // // // // // // // // // // //   };

// // // // // // // // // // // // //   const fetchSeminarDetails = async () => {
// // // // // // // // // // // // //     setLoading(true);
// // // // // // // // // // // // //     try {
// // // // // // // // // // // // //       const { data: seminarDataRaw, error: seminarError } = await supabase
// // // // // // // // // // // // //         .from("seminars")
// // // // // // // // // // // // //         .select("*")
// // // // // // // // // // // // //         .eq("id", seminarId)
// // // // // // // // // // // // //         .single();

// // // // // // // // // // // // //       if (seminarError) throw seminarError;
// // // // // // // // // // // // //       const seminarData = seminarDataRaw as Seminar;
// // // // // // // // // // // // //       setSeminar(seminarData);

// // // // // // // // // // // // //       const { data: speakersDataRaw, error: speakersError } = await supabase
// // // // // // // // // // // // //         .from("speakers")
// // // // // // // // // // // // //         .select("*")
// // // // // // // // // // // // //         .eq("seminar_id", seminarId);

// // // // // // // // // // // // //       if (speakersError) throw speakersError;
// // // // // // // // // // // // //       const speakersData = (speakersDataRaw || []).map((speaker) => ({
// // // // // // // // // // // // //         id: speaker.id,
// // // // // // // // // // // // //         name: speaker.name,
// // // // // // // // // // // // //         qualification: speaker.qualification,
// // // // // // // // // // // // //         department: speaker.department,
// // // // // // // // // // // // //         // bio: speaker.bio || "", // Ensure bio exists
// // // // // // // // // // // // //         // avatar_url: speaker.avatar_url,
// // // // // // // // // // // // //       })) as Speaker[];
// // // // // // // // // // // // //       setSpeakers(speakersData || []);
// // // // // // // // // // // // //     } catch (error) {
// // // // // // // // // // // // //       console.error("Error fetching seminar details:", error);
// // // // // // // // // // // // //       toast({
// // // // // // // // // // // // //         title: "Error",
// // // // // // // // // // // // //         description: "Failed to load seminar details.",
// // // // // // // // // // // // //         variant: "destructive",
// // // // // // // // // // // // //       });
// // // // // // // // // // // // //     } finally {
// // // // // // // // // // // // //       setLoading(false);
// // // // // // // // // // // // //     }
// // // // // // // // // // // // //   };

// // // // // // // // // // // // //   const handleCancelRegistration = async () => {
// // // // // // // // // // // // //     if (!registrationId) return;

// // // // // // // // // // // // //     setCanceling(true);
// // // // // // // // // // // // //     try {
// // // // // // // // // // // // //       const { error } = await supabase
// // // // // // // // // // // // //         .from("seminar_registrations")
// // // // // // // // // // // // //         .delete()
// // // // // // // // // // // // //         .eq("id", registrationId);

// // // // // // // // // // // // //       if (error) throw error;

// // // // // // // // // // // // //       setIsRegistered(false);
// // // // // // // // // // // // //       setRegistrationId(null);
// // // // // // // // // // // // //       toast({
// // // // // // // // // // // // //         title: "Registration Cancelled",
// // // // // // // // // // // // //         description: "Your registration has been successfully cancelled.",
// // // // // // // // // // // // //       });
// // // // // // // // // // // // //     } catch (error) {
// // // // // // // // // // // // //       console.error("Error cancelling registration:", error);
// // // // // // // // // // // // //       toast({
// // // // // // // // // // // // //         title: "Cancellation Failed",
// // // // // // // // // // // // //         description: "Failed to cancel your registration. Please try again.",
// // // // // // // // // // // // //         variant: "destructive",
// // // // // // // // // // // // //       });
// // // // // // // // // // // // //     } finally {
// // // // // // // // // // // // //       setCanceling(false);
// // // // // // // // // // // // //     }
// // // // // // // // // // // // //   };

// // // // // // // // // // // // //   const handleRegister = async () => {
// // // // // // // // // // // // //     if (!user) {
// // // // // // // // // // // // //       toast({
// // // // // // // // // // // // //         title: "Authentication Required",
// // // // // // // // // // // // //         description: "Please sign in to register for this seminar.",
// // // // // // // // // // // // //         variant: "destructive",
// // // // // // // // // // // // //       });
// // // // // // // // // // // // //       return;
// // // // // // // // // // // // //     }

// // // // // // // // // // // // //     if (isRegistered) {
// // // // // // // // // // // // //       toast({
// // // // // // // // // // // // //         title: "Already Registered",
// // // // // // // // // // // // //         description: "You are already registered for this seminar.",
// // // // // // // // // // // // //       });
// // // // // // // // // // // // //       return;
// // // // // // // // // // // // //     }

// // // // // // // // // // // // //     setRegistering(true);
// // // // // // // // // // // // //     try {
// // // // // // // // // // // // //       const { error } = await supabase.from("seminar_registrations").insert({
// // // // // // // // // // // // //         seminar_id: seminarId!,
// // // // // // // // // // // // //         user_id: user.id,
// // // // // // // // // // // // //         payment_status: "completed",
// // // // // // // // // // // // //       });

// // // // // // // // // // // // //       if (error) throw error;

// // // // // // // // // // // // //       setIsRegistered(true);
// // // // // // // // // // // // //       toast({
// // // // // // // // // // // // //         title: "Registration Successful",
// // // // // // // // // // // // //         description: "You have been successfully registered for this seminar!",
// // // // // // // // // // // // //       });
// // // // // // // // // // // // //     } catch (error) {
// // // // // // // // // // // // //       console.error("Error registering for seminar:", error);
// // // // // // // // // // // // //       toast({
// // // // // // // // // // // // //         title: "Registration Failed",
// // // // // // // // // // // // //         description: "Failed to register for the seminar. Please try again.",
// // // // // // // // // // // // //         variant: "destructive",
// // // // // // // // // // // // //       });
// // // // // // // // // // // // //     } finally {
// // // // // // // // // // // // //       setRegistering(false);
// // // // // // // // // // // // //     }
// // // // // // // // // // // // //   };

// // // // // // // // // // // // //   const formatDate = (dateString: string) => {
// // // // // // // // // // // // //     return new Date(dateString).toLocaleDateString("en-US", {
// // // // // // // // // // // // //       weekday: "long",
// // // // // // // // // // // // //       year: "numeric",
// // // // // // // // // // // // //       month: "long",
// // // // // // // // // // // // //       day: "numeric",
// // // // // // // // // // // // //     });
// // // // // // // // // // // // //   };

// // // // // // // // // // // // //   const formatTime = (timeString: string) => {
// // // // // // // // // // // // //     return new Date(`1970-01-01T${timeString}`).toLocaleTimeString([], {
// // // // // // // // // // // // //       hour: "2-digit",
// // // // // // // // // // // // //       minute: "2-digit",
// // // // // // // // // // // // //     });
// // // // // // // // // // // // //   };

// // // // // // // // // // // // //   if (meetingMode === "MEETING") {
// // // // // // // // // // // // //     return (
// // // // // // // // // // // // //       <MeetingAppProvider>
// // // // // // // // // // // // //         <MeetingProvider
// // // // // // // // // // // // //           config={{
// // // // // // // // // // // // //             meetingId,
// // // // // // // // // // // // //             micEnabled: micOn,
// // // // // // // // // // // // //             webcamEnabled: webcamOn,
// // // // // // // // // // // // //             name: participantName,
// // // // // // // // // // // // //             multiStream: true,
// // // // // // // // // // // // //             mode: "SEND_AND_RECV",
// // // // // // // // // // // // //             debugMode: false,
// // // // // // // // // // // // //           }}
// // // // // // // // // // // // //           token={meetingToken}
// // // // // // // // // // // // //           reinitialiseMeetingOnConfigChange={true}
// // // // // // // // // // // // //           joinWithoutUserInteraction={true}
// // // // // // // // // // // // //         >
// // // // // // // // // // // // //           <div className="fixed inset-0 bg-black z-50">
// // // // // // // // // // // // //             <MeetingContainer
// // // // // // // // // // // // //               onMeetingLeave={() => {
// // // // // // // // // // // // //                 setMeetingMode("LEFT");
// // // // // // // // // // // // //                 setMeetingToken("");
// // // // // // // // // // // // //                 setMeetingId("");
// // // // // // // // // // // // //               }}
// // // // // // // // // // // // //               setIsMeetingLeft={(value) =>
// // // // // // // // // // // // //                 setMeetingMode(value ? "LEFT" : "JOINING")
// // // // // // // // // // // // //               }
// // // // // // // // // // // // //             />
// // // // // // // // // // // // //           </div>
// // // // // // // // // // // // //         </MeetingProvider>
// // // // // // // // // // // // //       </MeetingAppProvider>
// // // // // // // // // // // // //     );
// // // // // // // // // // // // //   }

// // // // // // // // // // // // //   if (meetingMode === "LEFT") {
// // // // // // // // // // // // //     return (
// // // // // // // // // // // // //       <LeaveScreen
// // // // // // // // // // // // //         setIsMeetingLeft={(value) => setMeetingMode(value ? "LEFT" : "JOINING")}
// // // // // // // // // // // // //       />
// // // // // // // // // // // // //     );
// // // // // // // // // // // // //   }

// // // // // // // // // // // // //   if (loading) {
// // // // // // // // // // // // //     return (
// // // // // // // // // // // // //       <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center">
// // // // // // // // // // // // //         <div className="text-center">
// // // // // // // // // // // // //           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
// // // // // // // // // // // // //           <p className="text-gray-600">Loading seminar details...</p>
// // // // // // // // // // // // //         </div>
// // // // // // // // // // // // //       </div>
// // // // // // // // // // // // //     );
// // // // // // // // // // // // //   }

// // // // // // // // // // // // //   if (!seminar) {
// // // // // // // // // // // // //     return (
// // // // // // // // // // // // //       <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center">
// // // // // // // // // // // // //         <div className="text-center">
// // // // // // // // // // // // //           <h1 className="text-2xl font-bold text-gray-900 mb-4">
// // // // // // // // // // // // //             Seminar Not Found
// // // // // // // // // // // // //           </h1>
// // // // // // // // // // // // //           <p className="text-gray-600 mb-6">
// // // // // // // // // // // // //             The seminar you're looking for doesn't exist or may have been
// // // // // // // // // // // // //             removed.
// // // // // // // // // // // // //           </p>
// // // // // // // // // // // // //           <Button onClick={() => navigate("/")}>
// // // // // // // // // // // // //             <Home className="mr-2 h-4 w-4" />
// // // // // // // // // // // // //             Return to Home
// // // // // // // // // // // // //           </Button>
// // // // // // // // // // // // //         </div>
// // // // // // // // // // // // //       </div>
// // // // // // // // // // // // //     );
// // // // // // // // // // // // //   }

// // // // // // // // // // // // //   return (
// // // // // // // // // // // // //     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
// // // // // // // // // // // // //       <header className="bg-black/30 backdrop-blur-md border-b border-white/20 sticky top-0 z-50 shadow-xl">
// // // // // // // // // // // // //        <div className="container mx-auto px-4 py-4">
// // // // // // // // // // // // //           <div className="flex items-center justify-between">
// // // // // // // // // // // // //              <div className="flex items-center space-x-4">
// // // // // // // // // // // // //               <Button
// // // // // // // // // // // // //                 variant="outline"
// // // // // // // // // // // // //                 onClick={handleBackNavigation}
// // // // // // // // // // // // //                 className="text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm"
// // // // // // // // // // // // //                 title="Go back"
// // // // // // // // // // // // //               >
// // // // // // // // // // // // //                 <ArrowLeft className="mr-2 h-4 w-4" />
// // // // // // // // // // // // //                 Back
// // // // // // // // // // // // //               </Button>
// // // // // // // // // // // // //               <Link to="/" className="flex items-center space-x-2">
// // // // // // // // // // // // //                 <Shield className="h-8 w-8 text-blue-400" />
// // // // // // // // // // // // //                 <h1 className="text-2xl font-bold text-white">MedPortal</h1>
// // // // // // // // // // // // //               </Link>
// // // // // // // // // // // // //             </div>
// // // // // // // // // // // // //             <div className="flex items-center space-x-4">
// // // // // // // // // // // // //               {user ? (
// // // // // // // // // // // // //                 <div className="flex items-center space-x-4">
// // // // // // // // // // // // //                   <span className="text-white text-sm bg-white/10 px-3 py-1 rounded-full">
// // // // // // // // // // // // //                     Welcome, {user.email}
// // // // // // // // // // // // //                   </span>
// // // // // // // // // // // // //                   <Button
// // // // // // // // // // // // //                     variant="outline"
// // // // // // // // // // // // //                     className="text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm"
// // // // // // // // // // // // //                     onClick={() => navigate("/profile")}
// // // // // // // // // // // // //                   >
// // // // // // // // // // // // //                     <UserIcon className="mr-2 h-4 w-4" />
// // // // // // // // // // // // //                     Profile
// // // // // // // // // // // // //                   </Button>
// // // // // // // // // // // // //                   <Button
// // // // // // // // // // // // //                     variant="outline"
// // // // // // // // // // // // //                     className="text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm"
// // // // // // // // // // // // //                     onClick={handleSignOut}
// // // // // // // // // // // // //                   >
// // // // // // // // // // // // //                     Sign Out
// // // // // // // // // // // // //                   </Button>
// // // // // // // // // // // // //                 </div>
// // // // // // // // // // // // //               ) : (
// // // // // // // // // // // // //                 <>
// // // // // // // // // // // // //                   <Link to="/register">
// // // // // // // // // // // // //                     <Button
// // // // // // // // // // // // //                       variant="outline"
// // // // // // // // // // // // //                       className="text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm"
// // // // // // // // // // // // //                     >
// // // // // // // // // // // // //                       Register
// // // // // // // // // // // // //                     </Button>
// // // // // // // // // // // // //                   </Link>
// // // // // // // // // // // // //                   <Link to="/">
// // // // // // // // // // // // //                     <Button className="bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl transition-all duration-200">
// // // // // // // // // // // // //                       <UserIcon className="mr-2 h-4 w-4" />
// // // // // // // // // // // // //                       Sign In
// // // // // // // // // // // // //                     </Button>
// // // // // // // // // // // // //                   </Link>
// // // // // // // // // // // // //                 </>
// // // // // // // // // // // // //               )}
// // // // // // // // // // // // //               <Button
// // // // // // // // // // // // //                 variant="outline"
// // // // // // // // // // // // //                 onClick={() => navigate("/")}
// // // // // // // // // // // // //                 className="text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm"
// // // // // // // // // // // // //                 title="Go to home page"
// // // // // // // // // // // // //               >
// // // // // // // // // // // // //                 <Home className="mr-2 h-4 w-4" />
// // // // // // // // // // // // //                 Home
// // // // // // // // // // // // //               </Button>
// // // // // // // // // // // // //             </div>
// // // // // // // // // // // // //           </div>
// // // // // // // // // // // // //         </div>
// // // // // // // // // // // // //       </header>
// // // // // // // // // // // // //       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
// // // // // // // // // // // // //         {/* <div className="mb-6">
// // // // // // // // // // // // //           <Button
// // // // // // // // // // // // //             variant="ghost"
// // // // // // // // // // // // //             onClick={handleBackNavigation}
// // // // // // // // // // // // //             className="flex items-center"
// // // // // // // // // // // // //           >
// // // // // // // // // // // // //             <ArrowLeft className="mr-2 h-4 w-4" />
// // // // // // // // // // // // //             Back
// // // // // // // // // // // // //           </Button>
// // // // // // // // // // // // //         </div> */}

// // // // // // // // // // // // //         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
// // // // // // // // // // // // //           {/* Main content */}
// // // // // // // // // // // // //           <div className="lg:col-span-2 space-y-6">
// // // // // // // // // // // // //             <Card>
// // // // // // // // // // // // //               <CardHeader>
// // // // // // // // // // // // //                 <div className="flex justify-between items-start">
// // // // // // // // // // // // //                   <div>
// // // // // // // // // // // // //                     <CardTitle className="text-3xl font-bold">
// // // // // // // // // // // // //                       {seminar.topic}
// // // // // // // // // // // // //                     </CardTitle>
// // // // // // // // // // // // //                     <CardDescription className="mt-2 text-lg">
// // // // // // // // // // // // //                       {seminar.description}
// // // // // // // // // // // // //                     </CardDescription>
// // // // // // // // // // // // //                   </div>
// // // // // // // // // // // // //                   {isHost && (
// // // // // // // // // // // // //                     <Badge variant="secondary" className="flex items-center">
// // // // // // // // // // // // //                       <Shield className="mr-2 h-4 w-4" />
// // // // // // // // // // // // //                       You're the host
// // // // // // // // // // // // //                     </Badge>
// // // // // // // // // // // // //                   )}
// // // // // // // // // // // // //                 </div>
// // // // // // // // // // // // //               </CardHeader>
// // // // // // // // // // // // //               <CardContent>
// // // // // // // // // // // // //                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// // // // // // // // // // // // //                   <div className="flex items-center">
// // // // // // // // // // // // //                     <CalendarDays className="mr-2 h-5 w-5 text-gray-500" />
// // // // // // // // // // // // //                     <span>{formatDate(seminar.date)}</span>
// // // // // // // // // // // // //                   </div>
// // // // // // // // // // // // //                   <div className="flex items-center">
// // // // // // // // // // // // //                     <Clock className="mr-2 h-5 w-5 text-gray-500" />
// // // // // // // // // // // // //                     <span>{formatTime(seminar.time)}</span>
// // // // // // // // // // // // //                   </div>
// // // // // // // // // // // // //                   <div className="flex items-center">
// // // // // // // // // // // // //                     <Users className="mr-2 h-5 w-5 text-gray-500" />
// // // // // // // // // // // // //                     <span>
// // // // // // // // // // // // //                       {seminar.current_participants || 0} /{" "}
// // // // // // // // // // // // //                       {seminar.max_participants || "∞"} participants
// // // // // // // // // // // // //                     </span>
// // // // // // // // // // // // //                   </div>
// // // // // // // // // // // // //                   <div className="flex items-center">
// // // // // // // // // // // // //                     <UserIcon className="mr-2 h-5 w-5 text-gray-500" />
// // // // // // // // // // // // //                     <span>Hosted by {seminar.host_name}</span>
// // // // // // // // // // // // //                   </div>
// // // // // // // // // // // // //                 </div>
// // // // // // // // // // // // //               </CardContent>
// // // // // // // // // // // // //             </Card>

// // // // // // // // // // // // //             {/* Speakers Section */}
// // // // // // // // // // // // //             {speakers.length > 0 && (
// // // // // // // // // // // // //               <Card>
// // // // // // // // // // // // //                 <CardHeader>
// // // // // // // // // // // // //                   <CardTitle>Speakers</CardTitle>
// // // // // // // // // // // // //                 </CardHeader>
// // // // // // // // // // // // //                 <CardContent>
// // // // // // // // // // // // //                   <div className="space-y-6">
// // // // // // // // // // // // //                     {speakers.map((speaker) => (
// // // // // // // // // // // // //                       <div key={speaker.id} className="flex items-start gap-4">
// // // // // // // // // // // // //                         <Avatar className="h-16 w-16">
// // // // // // // // // // // // //                           <AvatarImage src={speaker.avatar_url} />
// // // // // // // // // // // // //                           <AvatarFallback>
// // // // // // // // // // // // //                             {speaker.name.charAt(0)}
// // // // // // // // // // // // //                           </AvatarFallback>
// // // // // // // // // // // // //                         </Avatar>
// // // // // // // // // // // // //                         <div>
// // // // // // // // // // // // //                           <h3 className="font-semibold">{speaker.name}</h3>
// // // // // // // // // // // // //                           <p className="text-sm text-gray-600">
// // // // // // // // // // // // //                             {speaker.qualification} | {speaker.department}
// // // // // // // // // // // // //                           </p>
// // // // // // // // // // // // //                           <p className="mt-2 text-sm">{speaker.bio}</p>
// // // // // // // // // // // // //                         </div>
// // // // // // // // // // // // //                       </div>
// // // // // // // // // // // // //                     ))}
// // // // // // // // // // // // //                   </div>
// // // // // // // // // // // // //                 </CardContent>
// // // // // // // // // // // // //               </Card>
// // // // // // // // // // // // //             )}

// // // // // // // // // // // // //             {/* Materials Section */}
// // // // // // // // // // // // //             {seminar.materials && seminar.materials.length > 0 && (
// // // // // // // // // // // // //               <Card>
// // // // // // // // // // // // //                 <CardHeader>
// // // // // // // // // // // // //                   <CardTitle>Materials</CardTitle>
// // // // // // // // // // // // //                 </CardHeader>
// // // // // // // // // // // // //                 <CardContent>
// // // // // // // // // // // // //                   <div className="space-y-2">
// // // // // // // // // // // // //                     {seminar.materials.map((material, index) => (
// // // // // // // // // // // // //                       <div
// // // // // // // // // // // // //                         key={index}
// // // // // // // // // // // // //                         className="flex items-center p-3 border rounded-lg hover:bg-gray-50"
// // // // // // // // // // // // //                       >
// // // // // // // // // // // // //                         <FileText className="mr-3 h-5 w-5 text-gray-500" />
// // // // // // // // // // // // //                         <span className="flex-1">{material}</span>
// // // // // // // // // // // // //                         <Button variant="ghost" size="sm">
// // // // // // // // // // // // //                           Download
// // // // // // // // // // // // //                         </Button>
// // // // // // // // // // // // //                       </div>
// // // // // // // // // // // // //                     ))}
// // // // // // // // // // // // //                   </div>
// // // // // // // // // // // // //                 </CardContent>
// // // // // // // // // // // // //               </Card>
// // // // // // // // // // // // //             )}
// // // // // // // // // // // // //           </div>

// // // // // // // // // // // // //           {/* Sidebar */}
// // // // // // // // // // // // //           <div className="space-y-4">
// // // // // // // // // // // // //             <Card>
// // // // // // // // // // // // //               <CardHeader>
// // // // // // // // // // // // //                 <CardTitle>Actions</CardTitle>
// // // // // // // // // // // // //               </CardHeader>
// // // // // // // // // // // // //               <CardContent className="space-y-4">
// // // // // // // // // // // // //                 {isHost ? (
// // // // // // // // // // // // //                   <>
// // // // // // // // // // // // //                     {seminar.meeting_id ? (
// // // // // // // // // // // // //                       <>
// // // // // // // // // // // // //                         <Button
// // // // // // // // // // // // //                           onClick={handleHostMeeting}
// // // // // // // // // // // // //                           className="w-full"
// // // // // // // // // // // // //                           disabled={joiningMeeting}
// // // // // // // // // // // // //                         >
// // // // // // // // // // // // //                           {joiningMeeting ? "Connecting..." : "Host Meeting"}
// // // // // // // // // // // // //                         </Button>
// // // // // // // // // // // // //                         <div className="space-y-2">
// // // // // // // // // // // // //                           <p className="text-sm font-medium">Meeting ID:</p>
// // // // // // // // // // // // //                           <div className="flex gap-2">
// // // // // // // // // // // // //                             <Input
// // // // // // // // // // // // //                               value={seminar.meeting_id}
// // // // // // // // // // // // //                               readOnly
// // // // // // // // // // // // //                               className="flex-1"
// // // // // // // // // // // // //                             />
// // // // // // // // // // // // //                             <Button
// // // // // // // // // // // // //                               variant="outline"
// // // // // // // // // // // // //                               size="icon"
// // // // // // // // // // // // //                               onClick={() =>
// // // // // // // // // // // // //                                 copyToClipboard(seminar.meeting_id!)
// // // // // // // // // // // // //                               }
// // // // // // // // // // // // //                             >
// // // // // // // // // // // // //                               <Copy className="h-4 w-4" />
// // // // // // // // // // // // //                             </Button>
// // // // // // // // // // // // //                           </div>
// // // // // // // // // // // // //                         </div>
// // // // // // // // // // // // //                       </>
// // // // // // // // // // // // //                     ) : (
// // // // // // // // // // // // //                       <Button
// // // // // // // // // // // // //                         onClick={handleHostMeeting}
// // // // // // // // // // // // //                         className="w-full"
// // // // // // // // // // // // //                         disabled={joiningMeeting}
// // // // // // // // // // // // //                       >
// // // // // // // // // // // // //                         {joiningMeeting ? "Creating..." : "Create Meeting"}
// // // // // // // // // // // // //                       </Button>
// // // // // // // // // // // // //                     )}
// // // // // // // // // // // // //                   </>
// // // // // // // // // // // // //                 ) : (
// // // // // // // // // // // // //                   <>
// // // // // // // // // // // // //                     {isRegistered ? (
// // // // // // // // // // // // //                       <>
// // // // // // // // // // // // //                         <Button
// // // // // // // // // // // // //                           onClick={handleJoinMeeting}
// // // // // // // // // // // // //                           className="w-full"
// // // // // // // // // // // // //                           disabled={!seminar.meeting_id || joiningMeeting}
// // // // // // // // // // // // //                         >
// // // // // // // // // // // // //                           {joiningMeeting
// // // // // // // // // // // // //                             ? "Joining..."
// // // // // // // // // // // // //                             : seminar.meeting_id
// // // // // // // // // // // // //                             ? "Join Meeting"
// // // // // // // // // // // // //                             : "Meeting Not Started"}
// // // // // // // // // // // // //                         </Button>
// // // // // // // // // // // // //                         <Button
// // // // // // // // // // // // //                           variant="outline"
// // // // // // // // // // // // //                           onClick={handleCancelRegistration}
// // // // // // // // // // // // //                           className="w-full"
// // // // // // // // // // // // //                           disabled={canceling}
// // // // // // // // // // // // //                         >
// // // // // // // // // // // // //                           {canceling ? "Processing..." : "Cancel Registration"}
// // // // // // // // // // // // //                         </Button>
// // // // // // // // // // // // //                       </>
// // // // // // // // // // // // //                     ) : (
// // // // // // // // // // // // //                       <Button
// // // // // // // // // // // // //                         onClick={handleRegister}
// // // // // // // // // // // // //                         className="w-full"
// // // // // // // // // // // // //                         disabled={registering}
// // // // // // // // // // // // //                       >
// // // // // // // // // // // // //                         {registering ? "Processing..." : "Register Now"}
// // // // // // // // // // // // //                       </Button>
// // // // // // // // // // // // //                     )}
// // // // // // // // // // // // //                   </>
// // // // // // // // // // // // //                 )}

// // // // // // // // // // // // //                 <Button variant="outline" className="w-full">
// // // // // // // // // // // // //                   <Bookmark className="mr-2 h-4 w-4" />
// // // // // // // // // // // // //                   Save for Later
// // // // // // // // // // // // //                 </Button>

// // // // // // // // // // // // //                 {/* {user && (
// // // // // // // // // // // // //                   <Button
// // // // // // // // // // // // //                     variant="ghost"
// // // // // // // // // // // // //                     onClick={handleSignOut}
// // // // // // // // // // // // //                     className="w-full text-red-600 hover:text-red-700"
// // // // // // // // // // // // //                   >
// // // // // // // // // // // // //                     Sign Out
// // // // // // // // // // // // //                   </Button>
// // // // // // // // // // // // //                 )} */}
// // // // // // // // // // // // //               </CardContent>
// // // // // // // // // // // // //             </Card>

// // // // // // // // // // // // //             {/* QR Code for sharing */}
// // // // // // // // // // // // //             {/* <Card>
// // // // // // // // // // // // //               <CardHeader>
// // // // // // // // // // // // //                 <CardTitle>Share Seminar</CardTitle>
// // // // // // // // // // // // //               </CardHeader>
// // // // // // // // // // // // //               <CardContent className="flex flex-col items-center">
// // // // // // // // // // // // //                 <div className="p-4 bg-white rounded-lg border mb-4">
// // // // // // // // // // // // //                   <QrCode className="h-32 w-32" />
// // // // // // // // // // // // //                 </div>
// // // // // // // // // // // // //                 <p className="text-sm text-center text-gray-600 mb-4">
// // // // // // // // // // // // //                   Scan to share this seminar
// // // // // // // // // // // // //                 </p>
// // // // // // // // // // // // //                 <Button variant="outline" className="w-full">
// // // // // // // // // // // // //                   <Share2 className="mr-2 h-4 w-4" />
// // // // // // // // // // // // //                   Share Link
// // // // // // // // // // // // //                 </Button>
// // // // // // // // // // // // //               </CardContent>
// // // // // // // // // // // // //             </Card> */}
// // // // // // // // // // // // //           </div>
// // // // // // // // // // // // //         </div>
// // // // // // // // // // // // //       </div>
// // // // // // // // // // // // //     </div>
// // // // // // // // // // // // //   );
// // // // // // // // // // // // // };

// // // // // // // // // // // // // export default SeminarDetails;

// // // import React, { useEffect, useState, useRef, useMemo } from "react";
// // // import { useParams, useNavigate, Link } from "react-router-dom";
// // // import { Button } from "@/components/ui/button";
// // // import {
// // //   Card,
// // //   CardContent,
// // //   CardDescription,
// // //   CardHeader,
// // //   CardTitle,
// // // } from "@/components/ui/card";
// // // import { Badge } from "@/components/ui/badge";
// // // import {
// // //   ArrowLeft,
// // //   User as UserIcon,
// // //   Clock,
// // //   CalendarDays,
// // //   Users,
// // //   CheckCircle,
// // //   Home,
// // //   Shield,
// // //   Mic,
// // //   MicOff,
// // //   Video,
// // //   VideoOff,
// // //   PhoneOff,
// // //   Copy,
// // //   Share2,
// // //   Maximize,
// // //   Minimize,
// // //   Settings,
// // //   MessageSquare,
// // //   MoreVertical,
// // //   FileText,
// // //   Bookmark,
// // //   Hand,
// // //   QrCode,
// // //   ScreenShare as ScreenShareIcon,
// // //   Circle as RecordingIcon,
// // //   Circle,
// // // } from "lucide-react";
// // // import { supabase } from "@/integrations/supabase/client";
// // // import { useToast } from "@/hooks/use-toast";
// // // import type { User as AuthUser } from "@supabase/supabase-js";
// // // import {
// // //   Constants,
// // //   MeetingProvider,
// // //   useMeeting,
// // //   useParticipant,
// // // } from "@videosdk.live/react-sdk";
// // // import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// // // import { Progress } from "@/components/ui/progress";
// // // import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// // // import { Input } from "@/components/ui/input";
// // // import { ScrollArea } from "@/components/ui/scroll-area";
// // // import ZoomHeader from "./zoomheader";
// // // import ZoomMain from "./zoomMain";
// // // import ZoomSpeakers from "./zoomSpeakers";
// // // import ZoomActions from "./zoomActions";
// // // import ParticipantView from "./ParticipantView";
// // // import MeetingContainer from "./MeetingContainer";

// // // // Types
// // // interface Seminar {
// // //   id: string;
// // //   host_name: string;
// // //   topic: string;
// // //   description: string;
// // //   date: string;
// // //   time: string;
// // //   host_id: string;
// // //   meeting_id?: string | null;
// // //   max_participants?: number;
// // //   current_participants?: number;
// // //   materials?: string[];
// // // }

// // // interface Speaker {
// // //   id: string;
// // //   name: string;
// // //   qualification: string;
// // //   department: string;
// // //   bio: string;
// // //   avatar_url?: string;
// // // }

// // // interface ChatMessage {
// // //   id: string;
// // //   sender: string;
// // //   message: string;
// // //   timestamp: string;
// // //   isCurrentUser: boolean;
// // // }

// // // interface Poll {
// // //   id: string;
// // //   question: string;
// // //   options: {
// // //     id: string;
// // //     text: string;
// // //     votes: number;
// // //   }[];
// // //   totalVotes: number;
// // // }

// // // type LayoutType = "grid" | "spotlight" | "sidebar" | "fullscreen";
// // // type VideoQuality = "high" | "med" | "low";

// // // // Context
// // // const MeetingAppContext = React.createContext<any>(null);

// // // const MeetingAppProvider = ({ children }: { children: React.ReactNode }) => {
// // //   const [selectedMic, setSelectedMic] = useState<any>(null);
// // //   const [selectedWebcam, setSelectedWebcam] = useState<any>(null);
// // //   const [selectedSpeaker, setSelectedSpeaker] = useState<any>(null);

// // //   return (
// // //     <MeetingAppContext.Provider
// // //       value={{
// // //         selectedMic,
// // //         setSelectedMic,
// // //         selectedWebcam,
// // //         setSelectedWebcam,
// // //         selectedSpeaker,
// // //         setSelectedSpeaker,
// // //       }}
// // //     >
// // //       {children}
// // //     </MeetingAppContext.Provider>
// // //   );
// // // };

// // // // Participant View Component with Layout Management
// // // interface ParticipantViewProps {
// // //   participantId: string;
// // //   layoutType?: LayoutType;
// // //   gridSize?: number;
// // //   isSpeaker?: boolean;
// // //   onQualityChange?: (quality: VideoQuality) => void;
// // // }

// // // const GridLayout: React.FC<{ participants: string[] }> = ({ participants }) => {
// // //   return (
// // //     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
// // //       {participants.map((id) => (
// // //         <ParticipantView
// // //           key={id}
// // //           participantId={id}
// // //           layoutType="grid"
// // //           gridSize={participants.length}
// // //         />
// // //       ))}
// // //     </div>
// // //   );
// // // };

// // // const SpotlightLayout: React.FC<{
// // //   speakerId: string;
// // //   otherParticipants: string[];
// // // }> = ({ speakerId, otherParticipants }) => {
// // //   return (
// // //     <div className="flex h-screen">
// // //       <div className="flex-1">
// // //         <ParticipantView
// // //           participantId={speakerId}
// // //           layoutType="spotlight"
// // //           isSpeaker={true}
// // //         />
// // //       </div>
// // //       <div className="w-64 bg-gray-800 overflow-y-auto p-2 space-y-2">
// // //         {otherParticipants.map((id) => (
// // //           <ParticipantView key={id} participantId={id} layoutType="sidebar" />
// // //         ))}
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // const FullScreenLayout: React.FC<{ participantId: string }> = ({
// // //   participantId,
// // // }) => {
// // //   return (
// // //     <div className="w-screen h-screen">
// // //       <ParticipantView participantId={participantId} layoutType="fullscreen" />
// // //     </div>
// // //   );
// // // };

// // // const PaginatedGridLayout: React.FC<{ allParticipants: string[] }> = ({
// // //   allParticipants,
// // // }) => {
// // //   const [currentPage, setCurrentPage] = useState(0);
// // //   const participantsPerPage = 6;
// // //   const totalPages = Math.ceil(allParticipants.length / participantsPerPage);
// // //   const visibleParticipants = allParticipants.slice(
// // //     currentPage * participantsPerPage,
// // //     (currentPage + 1) * participantsPerPage
// // //   );

// // //   return (
// // //     <div className="flex flex-col h-full">
// // //       <div className="flex-1 p-4">
// // //         <GridLayout participants={visibleParticipants} />
// // //       </div>
// // //       <div className="flex justify-center items-center p-4 space-x-4">
// // //         <button
// // //           className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-400"
// // //           onClick={() => setCurrentPage((p) => Math.max(0, p - 1))}
// // //           disabled={currentPage === 0}
// // //         >
// // //           Previous
// // //         </button>
// // //         <span>
// // //           Page {currentPage + 1} of {totalPages}
// // //         </span>
// // //         <button
// // //           className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-400"
// // //           onClick={() => setCurrentPage((p) => Math.min(totalPages - 1, p + 1))}
// // //           disabled={currentPage >= totalPages - 1}
// // //         >
// // //           Next
// // //         </button>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // const JoiningScreen = ({
// // //   participantName,
// // //   setParticipantName,
// // //   meetingId,
// // //   setMeetingId,
// // //   setToken,
// // //   micOn,
// // //   setMicOn,
// // //   webcamOn,
// // //   setWebcamOn,
// // //   onClickStartMeeting,
// // //   startMeeting,
// // //   setIsMeetingLeft,
// // // }: {
// // //   participantName: string;
// // //   setParticipantName: (name: string) => void;
// // //   meetingId: string;
// // //   setMeetingId: (id: string) => void;
// // //   setToken: (token: string) => void;
// // //   micOn: boolean;
// // //   setMicOn: (micOn: boolean) => void;
// // //   webcamOn: boolean;
// // //   setWebcamOn: (webcamOn: boolean) => void;
// // //   onClickStartMeeting: () => void;
// // //   startMeeting: boolean;
// // //   setIsMeetingLeft: (value: boolean) => void;
// // // }) => {
// // //   const { toast } = useToast();

// // //   const generateToken = async () => {
// // //     try {
// // //       const token = import.meta.env.VITE_VIDEOSDK_TOKEN;
// // //       if (!token) {
// // //         throw new Error("VideoSDK token not configured");
// // //       }
// // //       return token;
// // //     } catch (error) {
// // //       console.error("Error generating token:", error);
// // //       throw new Error("Failed to generate meeting token");
// // //     }
// // //   };

// // //   const handleJoinMeeting = async () => {
// // //     if (!participantName) {
// // //       toast({
// // //         title: "Name Required",
// // //         description: "Please enter your name",
// // //         variant: "destructive",
// // //       });
// // //       return;
// // //     }

// // //     try {
// // //       const token = await generateToken();
// // //       setToken(token);
// // //       onClickStartMeeting();
// // //     } catch (error) {
// // //       toast({
// // //         title: "Meeting Error",
// // //         description:
// // //           error instanceof Error ? error.message : "Failed to join meeting",
// // //         variant: "destructive",
// // //       });
// // //     }
// // //   };

// // //   return (
// // //     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
// // //       <Card className="w-full max-w-md">
// // //         <CardHeader>
// // //           <CardTitle>Join Meeting</CardTitle>
// // //           <CardDescription>Enter meeting details to continue</CardDescription>
// // //         </CardHeader>
// // //         <CardContent className="space-y-4">
// // //           <div className="space-y-2">
// // //             <label
// // //               htmlFor="name"
// // //               className="block text-sm font-medium text-gray-700"
// // //             >
// // //               Your Name
// // //             </label>
// // //             <input
// // //               id="name"
// // //               type="text"
// // //               value={participantName}
// // //               onChange={(e) => setParticipantName(e.target.value)}
// // //               className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
// // //               placeholder="Enter your name"
// // //             />
// // //           </div>

// // //           <div className="space-y-2">
// // //             <label
// // //               htmlFor="meetingId"
// // //               className="block text-sm font-medium text-gray-700"
// // //             >
// // //               Meeting ID
// // //             </label>
// // //             <input
// // //               id="meetingId"
// // //               type="text"
// // //               value={meetingId}
// // //               onChange={(e) => setMeetingId(e.target.value)}
// // //               className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
// // //               placeholder="Enter meeting ID"
// // //               readOnly
// // //             />
// // //           </div>

// // //           <div className="flex items-center space-x-4">
// // //             <Button
// // //               variant={micOn ? "default" : "outline"}
// // //               onClick={() => setMicOn(!micOn)}
// // //               className="flex-1"
// // //             >
// // //               {micOn ? (
// // //                 <Mic className="mr-2 h-4 w-4" />
// // //               ) : (
// // //                 <MicOff className="mr-2 h-4 w-4" />
// // //               )}
// // //               {micOn ? "Mute" : "Unmute"}
// // //             </Button>
// // //             <Button
// // //               variant={webcamOn ? "default" : "outline"}
// // //               onClick={() => setWebcamOn(!webcamOn)}
// // //               className="flex-1"
// // //             >
// // //               {webcamOn ? (
// // //                 <Video className="mr-2 h-4 w-4" />
// // //               ) : (
// // //                 <VideoOff className="mr-2 h-4 w-4" />
// // //               )}
// // //               {webcamOn ? "Stop Video" : "Start Video"}
// // //             </Button>
// // //           </div>

// // //           <Button
// // //             onClick={handleJoinMeeting}
// // //             className="w-full"
// // //             disabled={startMeeting}
// // //           >
// // //             {startMeeting ? "Joining..." : "Join Meeting"}
// // //           </Button>
// // //         </CardContent>
// // //       </Card>
// // //     </div>
// // //   );
// // // };

// // // // Leave Screen Component
// // // const LeaveScreen = ({
// // //   setIsMeetingLeft,
// // // }: {
// // //   setIsMeetingLeft: (value: boolean) => void;
// // // }) => {
// // //   return (
// // //     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
// // //       <Card className="w-full max-w-md">
// // //         <CardHeader>
// // //           <CardTitle>Meeting Ended</CardTitle>
// // //         </CardHeader>
// // //         <CardContent className="space-y-4">
// // //           <p className="text-center">You have left the meeting.</p>
// // //           <Button onClick={() => setIsMeetingLeft(false)} className="w-full">
// // //             Return to Home
// // //           </Button>
// // //         </CardContent>
// // //       </Card>
// // //     </div>
// // //   );
// // // };

// // // // Main Seminar Details Component
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
// // //   const isHost = user?.id === seminar?.host_id;

// // //   // Meeting states
// // //   const [meetingMode, setMeetingMode] = useState<
// // //     "JOINING" | "MEETING" | "LEFT"
// // //   >("JOINING");
// // //   const [participantName, setParticipantName] = useState("");
// // //   const [micOn, setMicOn] = useState(false);
// // //   const [webcamOn, setWebcamOn] = useState(false);
// // //   const [meetingToken, setMeetingToken] = useState("");
// // //   const [meetingId, setMeetingId] = useState("");
// // //   const [joiningMeeting, setJoiningMeeting] = useState(false);

// // //   useEffect(() => {
// // //     checkUser();
// // //     if (seminarId) {
// // //       fetchSeminarDetails();
// // //     }
// // //   }, [seminarId]);

// // //   const generateToken = async (): Promise<string> => {
// // //     try {
// // //       const token = import.meta.env.VITE_VIDEOSDK_TOKEN;
// // //       if (!token) {
// // //         throw new Error("VideoSDK token not configured");
// // //       }
// // //       return token;
// // //     } catch (error) {
// // //       console.error("Error generating token:", error);
// // //       throw new Error("Failed to generate meeting token");
// // //     }
// // //   };

// // //   const createMeeting = async (token: string): Promise<string> => {
// // //     try {
// // //       const response = await fetch("https://api.videosdk.live/v2/rooms", {
// // //         method: "POST",
// // //         headers: {
// // //           Authorization: token,
// // //           "Content-Type": "application/json",
// // //         },
// // //         body: JSON.stringify({}),
// // //       });

// // //       if (!response.ok) {
// // //         throw new Error(`API request failed with status ${response.status}`);
// // //       }

// // //       const { roomId } = await response.json();
// // //       return roomId;
// // //     } catch (error) {
// // //       console.error("Error creating meeting:", error);
// // //       throw error;
// // //     }
// // //   };

// // //   const checkRegistrationStatus = async (userId: string) => {
// // //     try {
// // //       const { data, error, count } = await supabase
// // //         .from("seminar_registrations")
// // //         .select("*", { count: "exact", head: true })
// // //         .eq("seminar_id", seminarId)
// // //         .eq("user_id", userId);

// // //       if (error) throw error;

// // //       setIsRegistered(count ? count > 0 : false);

// // //       if (count && count > 0) {
// // //         const { data: registrationData } = await supabase
// // //           .from("seminar_registrations")
// // //           .select("id")
// // //           .eq("seminar_id", seminarId)
// // //           .eq("user_id", userId)
// // //           .single();

// // //         if (registrationData) {
// // //           setRegistrationId(registrationData.id);
// // //         }
// // //       }
// // //     } catch (error) {
// // //       console.error("Error checking registration status:", error);
// // //       setIsRegistered(false);
// // //     }
// // //   };

// // //   const handleHostMeeting = async () => {
// // //     if (!user) {
// // //       toast({
// // //         title: "Authentication Required",
// // //         description: "Please sign in to host a meeting.",
// // //         variant: "destructive",
// // //       });
// // //       return;
// // //     }

// // //     setJoiningMeeting(true);
// // //     try {
// // //       const token = await generateToken();
// // //       const newMeetingId = await createMeeting(token);

// // //       const { error } = await supabase
// // //         .from("seminars")
// // //         .update({ meeting_id: newMeetingId } as Partial<Seminar>)
// // //         .eq("id", seminarId);

// // //       if (error) throw error;

// // //       setMeetingToken(token);
// // //       setMeetingId(newMeetingId);
// // //       setParticipantName(user.email || "Host");
// // //       setMeetingMode("MEETING");
// // //     } catch (error) {
// // //       console.error("Host Meeting Error:", error);
// // //       toast({
// // //         title: "Meeting Error",
// // //         description: "Failed to create meeting. Please try again.",
// // //         variant: "destructive",
// // //       });
// // //     } finally {
// // //       setJoiningMeeting(false);
// // //     }
// // //   };

// // //   const handleJoinMeeting = async () => {
// // //     if (!user) {
// // //       toast({
// // //         title: "Authentication Required",
// // //         description: "Please sign in to join the meeting.",
// // //         variant: "destructive",
// // //       });
// // //       return;
// // //     }

// // //     if (!seminar?.meeting_id) {
// // //       toast({
// // //         title: "No Meeting",
// // //         description: "No meeting has been created for this seminar yet.",
// // //         variant: "destructive",
// // //       });
// // //       return;
// // //     }

// // //     setJoiningMeeting(true);
// // //     try {
// // //       const token = await generateToken();
// // //       setMeetingToken(token);
// // //       setMeetingId(seminar.meeting_id);
// // //       setParticipantName(user.email || "Participant");
// // //       setMeetingMode("MEETING");
// // //     } catch (error) {
// // //       console.error("Meeting join error:", error);
// // //       toast({
// // //         title: "Meeting Error",
// // //         description: "Failed to join meeting. Please try again.",
// // //         variant: "destructive",
// // //       });
// // //     } finally {
// // //       setJoiningMeeting(false);
// // //     }
// // //   };

// // //   const copyToClipboard = (text: string) => {
// // //     navigator.clipboard.writeText(text);
// // //     toast({
// // //       title: "Copied to Clipboard",
// // //       description: "Meeting link has been copied to your clipboard.",
// // //     });
// // //   };
// // //   const checkUser = async () => {
// // //     try {
// // //       const {
// // //         data: { session },
// // //       } = await supabase.auth.getSession();
// // //       setUser(session?.user || null);

// // //       if (session?.user && seminarId) {
// // //         checkRegistrationStatus(session.user.id);
// // //       }
// // //     } catch (error) {
// // //       console.error("Error checking user:", error);
// // //     }
// // //   };

// // //   const handleSignOut = async () => {
// // //     try {
// // //       const { error } = await supabase.auth.signOut();
// // //       if (error) throw error;
// // //       setUser(null);
// // //       toast({
// // //         title: "Signed Out",
// // //         description: "You have been successfully signed out.",
// // //       });
// // //     } catch (error) {
// // //       console.error("Sign out error:", error);
// // //       toast({
// // //         title: "Error",
// // //         description: "Failed to sign out. Please try again.",
// // //         variant: "destructive",
// // //       });
// // //     }
// // //   };

// // //   const fetchSeminarDetails = async () => {
// // //     setLoading(true);
// // //     try {
// // //       const { data: seminarDataRaw, error: seminarError } = await supabase
// // //         .from("seminars")
// // //         .select("*")
// // //         .eq("id", seminarId)
// // //         .single();

// // //       if (seminarError) throw seminarError;
// // //       const seminarData = seminarDataRaw as Seminar;
// // //       setSeminar(seminarData);

// // //       const { data: speakersDataRaw, error: speakersError } = await supabase
// // //         .from("speakers")
// // //         .select("*")
// // //         .eq("seminar_id", seminarId);

// // //       if (speakersError) throw speakersError;
// // //       const speakersData = (speakersDataRaw || []).map((speaker) => ({
// // //         id: speaker.id,
// // //         name: speaker.name,
// // //         qualification: speaker.qualification,
// // //         department: speaker.department,
// // //         // bio: speaker.bio || "",
// // //         // avatar_url: speaker.avatar_url,
// // //       })) as Speaker[];
// // //       setSpeakers(speakersData || []);
// // //     } catch (error) {
// // //       console.error("Error fetching seminar details:", error);
// // //       toast({
// // //         title: "Error",
// // //         description: "Failed to load seminar details.",
// // //         variant: "destructive",
// // //       });
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   const handleCancelRegistration = async () => {
// // //     if (!registrationId) return;

// // //     setCanceling(true);
// // //     try {
// // //       const { error } = await supabase
// // //         .from("seminar_registrations")
// // //         .delete()
// // //         .eq("id", registrationId);

// // //       if (error) throw error;

// // //       setIsRegistered(false);
// // //       setRegistrationId(null);
// // //       toast({
// // //         title: "Registration Cancelled",
// // //         description: "Your registration has been successfully cancelled.",
// // //       });
// // //     } catch (error) {
// // //       console.error("Error cancelling registration:", error);
// // //       toast({
// // //         title: "Cancellation Failed",
// // //         description: "Failed to cancel your registration. Please try again.",
// // //         variant: "destructive",
// // //       });
// // //     } finally {
// // //       setCanceling(false);
// // //     }
// // //   };

// // //   const handleRegister = async () => {
// // //     if (!user) {
// // //       toast({
// // //         title: "Authentication Required",
// // //         description: "Please sign in to register for this seminar.",
// // //         variant: "destructive",
// // //       });
// // //       return;
// // //     }

// // //     if (isRegistered) {
// // //       toast({
// // //         title: "Already Registered",
// // //         description: "You are already registered for this seminar.",
// // //       });
// // //       return;
// // //     }

// // //     setRegistering(true);
// // //     try {
// // //       const { error } = await supabase.from("seminar_registrations").insert({
// // //         seminar_id: seminarId!,
// // //         user_id: user.id,
// // //         payment_status: "completed",
// // //       });

// // //       if (error) throw error;

// // //       setIsRegistered(true);
// // //       toast({
// // //         title: "Registration Successful",
// // //         description: "You have been successfully registered for this seminar!",
// // //       });
// // //     } catch (error) {
// // //       console.error("Error registering for seminar:", error);
// // //       toast({
// // //         title: "Registration Failed",
// // //         description: "Failed to register for the seminar. Please try again.",
// // //         variant: "destructive",
// // //       });
// // //     } finally {
// // //       setRegistering(false);
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

// // //   if (meetingMode === "MEETING") {
// // //     return (
// // //       <MeetingAppProvider>
// // //         <MeetingProvider
// // //           config={{
// // //             meetingId,
// // //             micEnabled: micOn,
// // //             webcamEnabled: webcamOn,
// // //             name: participantName,
// // //             multiStream: true,
// // //             mode: "SEND_AND_RECV",
// // //             debugMode: false,
// // //           }}
// // //           token={meetingToken}
// // //           reinitialiseMeetingOnConfigChange={true}
// // //           joinWithoutUserInteraction={true}
// // //         >
// // //           <div className="fixed inset-0 bg-black z-50">
// // //             <MeetingContainer
// // //               onMeetingLeave={() => {
// // //                 setMeetingMode("LEFT");
// // //                 setMeetingToken("");
// // //                 setMeetingId("");
// // //               }}
// // //               setIsMeetingLeft={(value) =>
// // //                 setMeetingMode(value ? "LEFT" : "JOINING")
// // //               }
// // //             />
// // //           </div>
// // //         </MeetingProvider>
// // //       </MeetingAppProvider>
// // //     );
// // //   }

// // //   if (meetingMode === "LEFT") {
// // //     return (
// // //       <LeaveScreen
// // //         setIsMeetingLeft={(value) => setMeetingMode(value ? "LEFT" : "JOINING")}
// // //       />
// // //     );
// // //   }

// // //   if (loading) {
// // //     return (
// // //       <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center">
// // //         <div className="text-center">
// // //           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
// // //           <p className="text-gray-600">Loading seminar details...</p>
// // //         </div>
// // //       </div>
// // //     );
// // //   }

// // //   if (!seminar) {
// // //     return (
// // //       <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center">
// // //         <div className="text-center">
// // //           <h1 className="text-2xl font-bold text-gray-900 mb-4">
// // //             Seminar Not Found
// // //           </h1>
// // //           <p className="text-gray-600 mb-6">
// // //             The seminar you're looking for doesn't exist or may have been
// // //             removed.
// // //           </p>
// // //           <Button onClick={() => navigate("/")}>
// // //             <Home className="mr-2 h-4 w-4" />
// // //             Return to Home
// // //           </Button>
// // //         </div>
// // //       </div>
// // //     );
// // //   }

// // //   return (
// // //     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
// // //       <ZoomHeader
// // //         user={user}
// // //         onSignOut={handleSignOut}
// // //         onNavigateHome={() => navigate("/")}
// // //         onNavigateProfile={() => navigate("/profile")}
// // //       />

// // //       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
// // //         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
// // //           <div className="lg:col-span-2 space-y-6">
// // //             <ZoomMain
// // //               seminar={seminar}
// // //               isHost={isHost}
// // //               formatDate={formatDate}
// // //               formatTime={formatTime}
// // //             />

// // //             {speakers.length > 0 && <ZoomSpeakers speakers={speakers} />}

// // //             {seminar.materials &&
// // //               seminar.materials.length > 0 &&
// // //               // Render materials component here
// // //               null}
// // //           </div>

// // //           <div className="space-y-4">
// // //             <ZoomActions
// // //               isHost={isHost}
// // //               isRegistered={isRegistered}
// // //               meetingId={seminar.meeting_id}
// // //               joiningMeeting={joiningMeeting}
// // //               canceling={canceling}
// // //               registering={registering}
// // //               onHostMeeting={handleHostMeeting}
// // //               onJoinMeeting={handleJoinMeeting}
// // //               onCancelRegistration={handleCancelRegistration}
// // //               onRegister={handleRegister}
// // //               onCopyMeetingId={copyToClipboard}
// // //             />
// // //           </div>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default SeminarDetails;

// // // // // // // // // // // // SeminarDetails.tsx
// // // // // // // // // // // import React, { useEffect, useState } from "react";
// // // // // // // // // // // import { useParams, useNavigate } from "react-router-dom";
// // // // // // // // // // // import { Button } from "@/components/ui/button";
// // // // // // // // // // // import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// // // // // // // // // // // import { supabase } from "@/integrations/supabase/client";
// // // // // // // // // // // import { useToast } from "@/hooks/use-toast";
// // // // // // // // // // // import type { User as AuthUser } from "@supabase/supabase-js";
// // // // // // // // // // // import { MeetingProvider } from "@videosdk.live/react-sdk";
// // // // // // // // // // // import { Home } from "lucide-react";
// // // // // // // // // // // import MeetingAppProvider from "./MeetingAppProvider";
// // // // // // // // // // // import MeetingContainer from "./MeetingContainer";
// // // // // // // // // // // import ZoomHeader from "./zoomheader";
// // // // // // // // // // // import ZoomMain from "./zoomMain";
// // // // // // // // // // // import ZoomSpeakers from "./zoomSpeakers";
// // // // // // // // // // // import ZoomActions from "./zoomActions";

// // // // // // // // // // // interface Seminar {
// // // // // // // // // // //   id: string;
// // // // // // // // // // //   host_name: string;
// // // // // // // // // // //   topic: string;
// // // // // // // // // // //   description: string;
// // // // // // // // // // //   date: string;
// // // // // // // // // // //   time: string;
// // // // // // // // // // //   host_id: string;
// // // // // // // // // // //   meeting_id?: string | null;
// // // // // // // // // // //   max_participants?: number;
// // // // // // // // // // //   current_participants?: number;
// // // // // // // // // // //   materials?: string[];
// // // // // // // // // // // }

// // // // // // // // // // // interface Speaker {
// // // // // // // // // // //   id: string;
// // // // // // // // // // //   name: string;
// // // // // // // // // // //   qualification: string;
// // // // // // // // // // //   department: string;
// // // // // // // // // // //   bio: string;
// // // // // // // // // // //   avatar_url?: string;
// // // // // // // // // // // }

// // // // // // // // // // // const SeminarDetails = () => {
// // // // // // // // // // //   const { seminarId } = useParams();
// // // // // // // // // // //   const navigate = useNavigate();
// // // // // // // // // // //   const [seminar, setSeminar] = useState<Seminar | null>(null);
// // // // // // // // // // //   const [speakers, setSpeakers] = useState<Speaker[]>([]);
// // // // // // // // // // //   const [loading, setLoading] = useState(true);
// // // // // // // // // // //   const [registering, setRegistering] = useState(false);
// // // // // // // // // // //   const [isRegistered, setIsRegistered] = useState(false);
// // // // // // // // // // //   const [user, setUser] = useState<AuthUser | null>(null);
// // // // // // // // // // //   const { toast } = useToast();
// // // // // // // // // // //   const [canceling, setCanceling] = useState(false);
// // // // // // // // // // //   const [registrationId, setRegistrationId] = useState<string | null>(null);
// // // // // // // // // // //   const isHost = user?.id === seminar?.host_id;

// // // // // // // // // // //   // Meeting states
// // // // // // // // // // //   const [meetingMode, setMeetingMode] = useState<"JOINING" | "MEETING" | "LEFT">("JOINING");
// // // // // // // // // // //   const [participantName, setParticipantName] = useState("");
// // // // // // // // // // //   const [micOn, setMicOn] = useState(false);
// // // // // // // // // // //   const [webcamOn, setWebcamOn] = useState(false);
// // // // // // // // // // //   const [meetingToken, setMeetingToken] = useState("");
// // // // // // // // // // //   const [meetingId, setMeetingId] = useState("");
// // // // // // // // // // //   const [joiningMeeting, setJoiningMeeting] = useState(false);

// // // // // // // // // // //   useEffect(() => {
// // // // // // // // // // //     checkUser();
// // // // // // // // // // //     if (seminarId) {
// // // // // // // // // // //       fetchSeminarDetails();
// // // // // // // // // // //     }
// // // // // // // // // // //   }, [seminarId]);

// // // // // // // // // // //   const checkUser = async () => {
// // // // // // // // // // //     try {
// // // // // // // // // // //       const { data: { session } } = await supabase.auth.getSession();
// // // // // // // // // // //       setUser(session?.user || null);

// // // // // // // // // // //       if (session?.user && seminarId) {
// // // // // // // // // // //         checkRegistrationStatus(session.user.id);
// // // // // // // // // // //       }
// // // // // // // // // // //     } catch (error) {
// // // // // // // // // // //       console.error("Error checking user:", error);
// // // // // // // // // // //     }
// // // // // // // // // // //   };

// // // // // // // // // // //   const fetchSeminarDetails = async () => {
// // // // // // // // // // //     setLoading(true);
// // // // // // // // // // //     try {
// // // // // // // // // // //       const { data: seminarData, error: seminarError } = await supabase
// // // // // // // // // // //         .from("seminars")
// // // // // // // // // // //         .select("*")
// // // // // // // // // // //         .eq("id", seminarId)
// // // // // // // // // // //         .single();

// // // // // // // // // // //       if (seminarError) throw seminarError;
// // // // // // // // // // //       setSeminar(seminarData);

// // // // // // // // // // //       const { data: speakersData, error: speakersError } = await supabase
// // // // // // // // // // //         .from("speakers")
// // // // // // // // // // //         .select("*")
// // // // // // // // // // //         .eq("seminar_id", seminarId);

// // // // // // // // // // //       if (speakersError) throw speakersError;
// // // // // // // // // // //       setSpeakers(speakersData || []);
// // // // // // // // // // //     } catch (error) {
// // // // // // // // // // //       console.error("Error fetching seminar details:", error);
// // // // // // // // // // //       toast({
// // // // // // // // // // //         title: "Error",
// // // // // // // // // // //         description: "Failed to load seminar details.",
// // // // // // // // // // //         variant: "destructive",
// // // // // // // // // // //       });
// // // // // // // // // // //     } finally {
// // // // // // // // // // //       setLoading(false);
// // // // // // // // // // //     }
// // // // // // // // // // //   };

// // // // // // // // // // //   const checkRegistrationStatus = async (userId: string) => {
// // // // // // // // // // //     try {
// // // // // // // // // // //       const { data, error } = await supabase
// // // // // // // // // // //         .from("seminar_registrations")
// // // // // // // // // // //         .select("id")
// // // // // // // // // // //         .eq("seminar_id", seminarId)
// // // // // // // // // // //         .eq("user_id", userId)
// // // // // // // // // // //         .single();

// // // // // // // // // // //       if (error && error.code !== "PGRST116") throw error;

// // // // // // // // // // //       setIsRegistered(!!data);
// // // // // // // // // // //       if (data) setRegistrationId(data.id);
// // // // // // // // // // //     } catch (error) {
// // // // // // // // // // //       console.error("Error checking registration status:", error);
// // // // // // // // // // //       setIsRegistered(false);
// // // // // // // // // // //     }
// // // // // // // // // // //   };

// // // // // // // // // // //   const handleRegister = async () => {
// // // // // // // // // // //     if (!user) {
// // // // // // // // // // //       toast({
// // // // // // // // // // //         title: "Authentication Required",
// // // // // // // // // // //         description: "Please sign in to register for this seminar.",
// // // // // // // // // // //         variant: "destructive",
// // // // // // // // // // //       });
// // // // // // // // // // //       return;
// // // // // // // // // // //     }

// // // // // // // // // // //     setRegistering(true);
// // // // // // // // // // //     try {
// // // // // // // // // // //       const { data, error } = await supabase
// // // // // // // // // // //         .from("seminar_registrations")
// // // // // // // // // // //         .insert({
// // // // // // // // // // //           seminar_id: seminarId,
// // // // // // // // // // //           user_id: user.id,
// // // // // // // // // // //           payment_status: "completed",
// // // // // // // // // // //         })
// // // // // // // // // // //         .select()
// // // // // // // // // // //         .single();

// // // // // // // // // // //       if (error) throw error;

// // // // // // // // // // //       setIsRegistered(true);
// // // // // // // // // // //       setRegistrationId(data.id);
// // // // // // // // // // //       toast({
// // // // // // // // // // //         title: "Registration Successful",
// // // // // // // // // // //         description: "You have been successfully registered for this seminar!",
// // // // // // // // // // //       });
// // // // // // // // // // //     } catch (error) {
// // // // // // // // // // //       console.error("Error registering for seminar:", error);
// // // // // // // // // // //       toast({
// // // // // // // // // // //         title: "Registration Failed",
// // // // // // // // // // //         description: "Failed to register for the seminar. Please try again.",
// // // // // // // // // // //         variant: "destructive",
// // // // // // // // // // //       });
// // // // // // // // // // //     } finally {
// // // // // // // // // // //       setRegistering(false);
// // // // // // // // // // //     }
// // // // // // // // // // //   };

// // // // // // // // // // //   const handleCancelRegistration = async () => {
// // // // // // // // // // //     if (!registrationId) return;

// // // // // // // // // // //     setCanceling(true);
// // // // // // // // // // //     try {
// // // // // // // // // // //       const { error } = await supabase
// // // // // // // // // // //         .from("seminar_registrations")
// // // // // // // // // // //         .delete()
// // // // // // // // // // //         .eq("id", registrationId);

// // // // // // // // // // //       if (error) throw error;

// // // // // // // // // // //       setIsRegistered(false);
// // // // // // // // // // //       setRegistrationId(null);
// // // // // // // // // // //       toast({
// // // // // // // // // // //         title: "Registration Cancelled",
// // // // // // // // // // //         description: "Your registration has been successfully cancelled.",
// // // // // // // // // // //       });
// // // // // // // // // // //     } catch (error) {
// // // // // // // // // // //       console.error("Error cancelling registration:", error);
// // // // // // // // // // //       toast({
// // // // // // // // // // //         title: "Cancellation Failed",
// // // // // // // // // // //         description: "Failed to cancel your registration. Please try again.",
// // // // // // // // // // //         variant: "destructive",
// // // // // // // // // // //       });
// // // // // // // // // // //     } finally {
// // // // // // // // // // //       setCanceling(false);
// // // // // // // // // // //     }
// // // // // // // // // // //   };

// // // // // // // // // // //   const generateToken = async (): Promise<string> => {
// // // // // // // // // // //     const token = import.meta.env.VITE_VIDEOSDK_TOKEN;
// // // // // // // // // // //     if (!token) {
// // // // // // // // // // //       throw new Error("VideoSDK token not configured");
// // // // // // // // // // //     }
// // // // // // // // // // //     return token;
// // // // // // // // // // //   };

// // // // // // // // // // //   const createMeeting = async (token: string): Promise<string> => {
// // // // // // // // // // //     const response = await fetch("https://api.videosdk.live/v2/rooms", {
// // // // // // // // // // //       method: "POST",
// // // // // // // // // // //       headers: {
// // // // // // // // // // //         Authorization: token,
// // // // // // // // // // //         "Content-Type": "application/json",
// // // // // // // // // // //       },
// // // // // // // // // // //       body: JSON.stringify({}),
// // // // // // // // // // //     });

// // // // // // // // // // //     if (!response.ok) {
// // // // // // // // // // //       throw new Error(`API request failed with status ${response.status}`);
// // // // // // // // // // //     }

// // // // // // // // // // //     const { roomId } = await response.json();
// // // // // // // // // // //     return roomId;
// // // // // // // // // // //   };

// // // // // // // // // // //   const handleHostMeeting = async () => {
// // // // // // // // // // //     if (!user) {
// // // // // // // // // // //       toast({
// // // // // // // // // // //         title: "Authentication Required",
// // // // // // // // // // //         description: "Please sign in to host a meeting.",
// // // // // // // // // // //         variant: "destructive",
// // // // // // // // // // //       });
// // // // // // // // // // //       return;
// // // // // // // // // // //     }

// // // // // // // // // // //     setJoiningMeeting(true);
// // // // // // // // // // //     try {
// // // // // // // // // // //       const token = await generateToken();
// // // // // // // // // // //       const newMeetingId = await createMeeting(token);

// // // // // // // // // // //       const { error } = await supabase
// // // // // // // // // // //         .from("seminars")
// // // // // // // // // // //         .update({ meeting_id: newMeetingId })
// // // // // // // // // // //         .eq("id", seminarId);

// // // // // // // // // // //       if (error) throw error;

// // // // // // // // // // //       setMeetingToken(token);
// // // // // // // // // // //       setMeetingId(newMeetingId);
// // // // // // // // // // //       setParticipantName(user.email || "Host");
// // // // // // // // // // //       setMeetingMode("MEETING");
// // // // // // // // // // //     } catch (error) {
// // // // // // // // // // //       console.error("Host Meeting Error:", error);
// // // // // // // // // // //       toast({
// // // // // // // // // // //         title: "Meeting Error",
// // // // // // // // // // //         description: "Failed to create meeting. Please try again.",
// // // // // // // // // // //         variant: "destructive",
// // // // // // // // // // //       });
// // // // // // // // // // //     } finally {
// // // // // // // // // // //       setJoiningMeeting(false);
// // // // // // // // // // //     }
// // // // // // // // // // //   };

// // // // // // // // // // //   const handleJoinMeeting = async () => {
// // // // // // // // // // //     if (!user) {
// // // // // // // // // // //       toast({
// // // // // // // // // // //         title: "Authentication Required",
// // // // // // // // // // //         description: "Please sign in to join the meeting.",
// // // // // // // // // // //         variant: "destructive",
// // // // // // // // // // //       });
// // // // // // // // // // //       return;
// // // // // // // // // // //     }

// // // // // // // // // // //     if (!seminar?.meeting_id) {
// // // // // // // // // // //       toast({
// // // // // // // // // // //         title: "No Meeting",
// // // // // // // // // // //         description: "No meeting has been created for this seminar yet.",
// // // // // // // // // // //         variant: "destructive",
// // // // // // // // // // //       });
// // // // // // // // // // //       return;
// // // // // // // // // // //     }

// // // // // // // // // // //     setJoiningMeeting(true);
// // // // // // // // // // //     try {
// // // // // // // // // // //       const token = await generateToken();
// // // // // // // // // // //       setMeetingToken(token);
// // // // // // // // // // //       setMeetingId(seminar.meeting_id);
// // // // // // // // // // //       setParticipantName(user.email || "Participant");
// // // // // // // // // // //       setMeetingMode("MEETING");
// // // // // // // // // // //     } catch (error) {
// // // // // // // // // // //       console.error("Meeting join error:", error);
// // // // // // // // // // //       toast({
// // // // // // // // // // //         title: "Meeting Error",
// // // // // // // // // // //         description: "Failed to join meeting. Please try again.",
// // // // // // // // // // //         variant: "destructive",
// // // // // // // // // // //       });
// // // // // // // // // // //     } finally {
// // // // // // // // // // //       setJoiningMeeting(false);
// // // // // // // // // // //     }
// // // // // // // // // // //   };

// // // // // // // // // // //   const copyToClipboard = (text: string) => {
// // // // // // // // // // //     navigator.clipboard.writeText(text);
// // // // // // // // // // //     toast({
// // // // // // // // // // //       title: "Copied to Clipboard",
// // // // // // // // // // //       description: "Meeting link has been copied to your clipboard.",
// // // // // // // // // // //     });
// // // // // // // // // // //   };

// // // // // // // // // // //   const formatDate = (dateString: string) => {
// // // // // // // // // // //     return new Date(dateString).toLocaleDateString("en-US", {
// // // // // // // // // // //       weekday: "long",
// // // // // // // // // // //       year: "numeric",
// // // // // // // // // // //       month: "long",
// // // // // // // // // // //       day: "numeric",
// // // // // // // // // // //     });
// // // // // // // // // // //   };

// // // // // // // // // // //   const formatTime = (timeString: string) => {
// // // // // // // // // // //     return new Date(`1970-01-01T${timeString}`).toLocaleTimeString([], {
// // // // // // // // // // //       hour: "2-digit",
// // // // // // // // // // //       minute: "2-digit",
// // // // // // // // // // //     });
// // // // // // // // // // //   };

// // // // // // // // // // //   if (meetingMode === "MEETING") {
// // // // // // // // // // //     return (
// // // // // // // // // // //       <MeetingAppProvider>
// // // // // // // // // // //         <MeetingProvider
// // // // // // // // // // //           config={{
// // // // // // // // // // //             meetingId,
// // // // // // // // // // //             micEnabled: micOn,
// // // // // // // // // // //             webcamEnabled: webcamOn,
// // // // // // // // // // //             name: participantName,
// // // // // // // // // // //             multiStream: true,
// // // // // // // // // // //             mode: "SEND_AND_RECV",
// // // // // // // // // // //             debugMode: false,
// // // // // // // // // // //           }}
// // // // // // // // // // //           token={meetingToken}
// // // // // // // // // // //           reinitialiseMeetingOnConfigChange={true}
// // // // // // // // // // //           joinWithoutUserInteraction={true}
// // // // // // // // // // //         >
// // // // // // // // // // //           <div className="fixed inset-0 bg-black z-50">
// // // // // // // // // // //             <MeetingContainer
// // // // // // // // // // //               onMeetingLeave={() => {
// // // // // // // // // // //                 setMeetingMode("LEFT");
// // // // // // // // // // //                 setMeetingToken("");
// // // // // // // // // // //                 setMeetingId("");
// // // // // // // // // // //               }}
// // // // // // // // // // //               setIsMeetingLeft={(value) => setMeetingMode(value ? "LEFT" : "JOINING")}
// // // // // // // // // // //             />
// // // // // // // // // // //           </div>
// // // // // // // // // // //         </MeetingProvider>
// // // // // // // // // // //       </MeetingAppProvider>
// // // // // // // // // // //     );
// // // // // // // // // // //   }

// // // // // // // // // // //   if (loading) {
// // // // // // // // // // //     return (
// // // // // // // // // // //       <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center">
// // // // // // // // // // //         <div className="text-center">
// // // // // // // // // // //           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
// // // // // // // // // // //           <p className="text-gray-600">Loading seminar details...</p>
// // // // // // // // // // //         </div>
// // // // // // // // // // //       </div>
// // // // // // // // // // //     );
// // // // // // // // // // //   }

// // // // // // // // // // //   if (!seminar) {
// // // // // // // // // // //     return (
// // // // // // // // // // //       <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center">
// // // // // // // // // // //         <div className="text-center">
// // // // // // // // // // //           <h1 className="text-2xl font-bold text-gray-900 mb-4">Seminar Not Found</h1>
// // // // // // // // // // //           <p className="text-gray-600 mb-6">
// // // // // // // // // // //             The seminar you're looking for doesn't exist or may have been removed.
// // // // // // // // // // //           </p>
// // // // // // // // // // //           <Button onClick={() => navigate("/")}>
// // // // // // // // // // //             <Home className="mr-2 h-4 w-4" />
// // // // // // // // // // //             Return to Home
// // // // // // // // // // //           </Button>
// // // // // // // // // // //         </div>
// // // // // // // // // // //       </div>
// // // // // // // // // // //     );
// // // // // // // // // // //   }

// // // // // // // // // // //   return (
// // // // // // // // // // //     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
// // // // // // // // // // //       <ZoomHeader
// // // // // // // // // // //         user={user}
// // // // // // // // // // //         onSignOut={() => supabase.auth.signOut()}
// // // // // // // // // // //         onNavigateHome={() => navigate("/")}
// // // // // // // // // // //         onNavigateProfile={() => navigate("/profile")}
// // // // // // // // // // //       />

// // // // // // // // // // //       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
// // // // // // // // // // //         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
// // // // // // // // // // //           <div className="lg:col-span-2 space-y-6">
// // // // // // // // // // //             <ZoomMain
// // // // // // // // // // //               seminar={seminar}
// // // // // // // // // // //               isHost={isHost}
// // // // // // // // // // //               formatDate={formatDate}
// // // // // // // // // // //               formatTime={formatTime}
// // // // // // // // // // //             />

// // // // // // // // // // //             {speakers.length > 0 && <ZoomSpeakers speakers={speakers} />}
// // // // // // // // // // //           </div>

// // // // // // // // // // //           <div className="space-y-4">
// // // // // // // // // // //             <ZoomActions
// // // // // // // // // // //               isHost={isHost}
// // // // // // // // // // //               isRegistered={isRegistered}
// // // // // // // // // // //               meetingId={seminar.meeting_id}
// // // // // // // // // // //               joiningMeeting={joiningMeeting}
// // // // // // // // // // //               canceling={canceling}
// // // // // // // // // // //               registering={registering}
// // // // // // // // // // //               onHostMeeting={handleHostMeeting}
// // // // // // // // // // //               onJoinMeeting={handleJoinMeeting}
// // // // // // // // // // //               onCancelRegistration={handleCancelRegistration}
// // // // // // // // // // //               onRegister={handleRegister}
// // // // // // // // // // //               onCopyMeetingId={() => seminar.meeting_id && copyToClipboard(seminar.meeting_id)}
// // // // // // // // // // //             />
// // // // // // // // // // //           </div>
// // // // // // // // // // //         </div>
// // // // // // // // // // //       </div>
// // // // // // // // // // //     </div>
// // // // // // // // // // //   );
// // // // // // // // // // // };

// // // // // // // // // // // export default SeminarDetails;

// // // // // // // // // // import React, { useEffect, useState } from "react";
// // // // // // // // // // import { useParams, useNavigate } from "react-router-dom";
// // // // // // // // // // import { Button } from "@/components/ui/button";
// // // // // // // // // // import {
// // // // // // // // // //   Card,
// // // // // // // // // //   CardContent,
// // // // // // // // // //   CardDescription,
// // // // // // // // // //   CardHeader,
// // // // // // // // // //   CardTitle,
// // // // // // // // // // } from "@/components/ui/card";
// // // // // // // // // // import { supabase } from "@/integrations/supabase/client";
// // // // // // // // // // import { useToast } from "@/hooks/use-toast";
// // // // // // // // // // import type { User as AuthUser } from "@supabase/supabase-js";
// // // // // // // // // // import { MeetingProvider } from "@videosdk.live/react-sdk";
// // // // // // // // // // import { Home } from "lucide-react";
// // // // // // // // // // import MeetingAppProvider from "./MeetingAppProvider";
// // // // // // // // // // import MeetingContainer from "./MeetingContainer";
// // // // // // // // // // import ZoomHeader from "./zoomheader";
// // // // // // // // // // import ZoomMain from "./zoomMain";
// // // // // // // // // // import ZoomSpeakers from "./zoomSpeakers";
// // // // // // // // // // import ZoomActions from "./zoomActions";

// // // // // // // // // // interface Seminar {
// // // // // // // // // //   id: string;
// // // // // // // // // //   host_name: string;
// // // // // // // // // //   topic: string;
// // // // // // // // // //   description: string;
// // // // // // // // // //   date: string;
// // // // // // // // // //   time: string;
// // // // // // // // // //   host_id: string;
// // // // // // // // // //   meeting_id?: string | null;
// // // // // // // // // //   max_participants?: number;
// // // // // // // // // //   current_participants?: number;
// // // // // // // // // //   materials?: string[];
// // // // // // // // // //   created_at?: string;
// // // // // // // // // //   updated_at?: string;
// // // // // // // // // // }

// // // // // // // // // // interface Speaker {
// // // // // // // // // //   id: string;
// // // // // // // // // //   name: string;
// // // // // // // // // //   qualification: string;
// // // // // // // // // //   department: string;
// // // // // // // // // //   bio?: string; // Made optional
// // // // // // // // // //   avatar_url?: string;
// // // // // // // // // //   seminar_id?: string;
// // // // // // // // // //   created_at?: string;
// // // // // // // // // // }

// // // // // // // // // // const SeminarDetails = () => {
// // // // // // // // // //   const { seminarId } = useParams<{ seminarId: string }>();
// // // // // // // // // //   const navigate = useNavigate();
// // // // // // // // // //   const [seminar, setSeminar] = useState<Seminar | null>(null);
// // // // // // // // // //   const [speakers, setSpeakers] = useState<Speaker[]>([]);
// // // // // // // // // //   const [loading, setLoading] = useState(true);
// // // // // // // // // //   const [registering, setRegistering] = useState(false);
// // // // // // // // // //   const [isRegistered, setIsRegistered] = useState(false);
// // // // // // // // // //   const [user, setUser] = useState<AuthUser | null>(null);
// // // // // // // // // //   const { toast } = useToast();
// // // // // // // // // //   const [canceling, setCanceling] = useState(false);
// // // // // // // // // //   const [registrationId, setRegistrationId] = useState<string | null>(null);
// // // // // // // // // //   const isHost = user?.id === seminar?.host_id;

// // // // // // // // // //   // Meeting states
// // // // // // // // // //   const [meetingMode, setMeetingMode] = useState<
// // // // // // // // // //     "JOINING" | "MEETING" | "LEFT"
// // // // // // // // // //   >("JOINING");
// // // // // // // // // //   const [participantName, setParticipantName] = useState("");
// // // // // // // // // //   const [micOn, setMicOn] = useState(false);
// // // // // // // // // //   const [webcamOn, setWebcamOn] = useState(false);
// // // // // // // // // //   const [meetingToken, setMeetingToken] = useState("");
// // // // // // // // // //   const [meetingId, setMeetingId] = useState("");
// // // // // // // // // //   const [joiningMeeting, setJoiningMeeting] = useState(false);

// // // // // // // // // //   useEffect(() => {
// // // // // // // // // //     checkUser();
// // // // // // // // // //     if (seminarId) {
// // // // // // // // // //       fetchSeminarDetails();
// // // // // // // // // //     }
// // // // // // // // // //   }, [seminarId]);

// // // // // // // // // //   const checkUser = async () => {
// // // // // // // // // //     try {
// // // // // // // // // //       const {
// // // // // // // // // //         data: { session },
// // // // // // // // // //       } = await supabase.auth.getSession();
// // // // // // // // // //       setUser(session?.user || null);

// // // // // // // // // //       if (session?.user && seminarId) {
// // // // // // // // // //         checkRegistrationStatus(session.user.id);
// // // // // // // // // //       }
// // // // // // // // // //     } catch (error) {
// // // // // // // // // //       console.error("Error checking user:", error);
// // // // // // // // // //     }
// // // // // // // // // //   };

// // // // // // // // // //   const fetchSeminarDetails = async () => {
// // // // // // // // // //     setLoading(true);
// // // // // // // // // //     try {
// // // // // // // // // //       const { data: seminarData, error: seminarError } = await supabase
// // // // // // // // // //         .from("seminars")
// // // // // // // // // //         .select("*")
// // // // // // // // // //         .eq("id", seminarId)
// // // // // // // // // //         .single();

// // // // // // // // // //       if (seminarError) throw seminarError;
// // // // // // // // // //       setSeminar(seminarData);

// // // // // // // // // //       const { data: speakersData, error: speakersError } = await supabase
// // // // // // // // // //         .from("speakers")
// // // // // // // // // //         .select(
// // // // // // // // // //           "id, name, qualification, department, bio, avatar_url, seminar_id, created_at"
// // // // // // // // // //         )
// // // // // // // // // //         .eq("seminar_id", seminarId);

// // // // // // // // // //       if (speakersError) throw speakersError;
// // // // // // // // // //       setSpeakers((speakersData as Speaker[]) || []);
// // // // // // // // // //     } catch (error) {
// // // // // // // // // //       console.error("Error fetching seminar details:", error);
// // // // // // // // // //       toast({
// // // // // // // // // //         title: "Error",
// // // // // // // // // //         description: "Failed to load seminar details.",
// // // // // // // // // //         variant: "destructive",
// // // // // // // // // //       });
// // // // // // // // // //     } finally {
// // // // // // // // // //       setLoading(false);
// // // // // // // // // //     }
// // // // // // // // // //   };

// // // // // // // // // //   const checkRegistrationStatus = async (userId: string) => {
// // // // // // // // // //     try {
// // // // // // // // // //       const { data, error } = await supabase
// // // // // // // // // //         .from("seminar_registrations")
// // // // // // // // // //         .select("id")
// // // // // // // // // //         .eq("seminar_id", seminarId)
// // // // // // // // // //         .eq("user_id", userId)
// // // // // // // // // //         .single();

// // // // // // // // // //       if (error && error.code !== "PGRST116") throw error;

// // // // // // // // // //       setIsRegistered(!!data);
// // // // // // // // // //       if (data) setRegistrationId(data.id);
// // // // // // // // // //     } catch (error) {
// // // // // // // // // //       console.error("Error checking registration status:", error);
// // // // // // // // // //       setIsRegistered(false);
// // // // // // // // // //     }
// // // // // // // // // //   };

// // // // // // // // // //   const handleRegister = async () => {
// // // // // // // // // //     if (!user || !seminarId) {
// // // // // // // // // //       toast({
// // // // // // // // // //         title: "Authentication Required",
// // // // // // // // // //         description: "Please sign in to register for this seminar.",
// // // // // // // // // //         variant: "destructive",
// // // // // // // // // //       });
// // // // // // // // // //       return;
// // // // // // // // // //     }

// // // // // // // // // //     setRegistering(true);
// // // // // // // // // //     try {
// // // // // // // // // //       const { data, error } = await supabase
// // // // // // // // // //         .from("seminar_registrations")
// // // // // // // // // //         .insert({
// // // // // // // // // //           seminar_id: seminarId,
// // // // // // // // // //           user_id: user.id,
// // // // // // // // // //           payment_status: "completed",
// // // // // // // // // //         })
// // // // // // // // // //         .select()
// // // // // // // // // //         .single();

// // // // // // // // // //       if (error) throw error;

// // // // // // // // // //       setIsRegistered(true);
// // // // // // // // // //       setRegistrationId(data.id);
// // // // // // // // // //       toast({
// // // // // // // // // //         title: "Registration Successful",
// // // // // // // // // //         description: "You have been successfully registered for this seminar!",
// // // // // // // // // //       });
// // // // // // // // // //     } catch (error) {
// // // // // // // // // //       console.error("Error registering for seminar:", error);
// // // // // // // // // //       toast({
// // // // // // // // // //         title: "Registration Failed",
// // // // // // // // // //         description: "Failed to register for the seminar. Please try again.",
// // // // // // // // // //         variant: "destructive",
// // // // // // // // // //       });
// // // // // // // // // //     } finally {
// // // // // // // // // //       setRegistering(false);
// // // // // // // // // //     }
// // // // // // // // // //   };

// // // // // // // // // //   const handleCancelRegistration = async () => {
// // // // // // // // // //     if (!registrationId) return;

// // // // // // // // // //     setCanceling(true);
// // // // // // // // // //     try {
// // // // // // // // // //       const { error } = await supabase
// // // // // // // // // //         .from("seminar_registrations")
// // // // // // // // // //         .delete()
// // // // // // // // // //         .eq("id", registrationId);

// // // // // // // // // //       if (error) throw error;

// // // // // // // // // //       setIsRegistered(false);
// // // // // // // // // //       setRegistrationId(null);
// // // // // // // // // //       toast({
// // // // // // // // // //         title: "Registration Cancelled",
// // // // // // // // // //         description: "Your registration has been successfully cancelled.",
// // // // // // // // // //       });
// // // // // // // // // //     } catch (error) {
// // // // // // // // // //       console.error("Error cancelling registration:", error);
// // // // // // // // // //       toast({
// // // // // // // // // //         title: "Cancellation Failed",
// // // // // // // // // //         description: "Failed to cancel your registration. Please try again.",
// // // // // // // // // //         variant: "destructive",
// // // // // // // // // //       });
// // // // // // // // // //     } finally {
// // // // // // // // // //       setCanceling(false);
// // // // // // // // // //     }
// // // // // // // // // //   };

// // // // // // // // // //   const generateToken = async (): Promise<string> => {
// // // // // // // // // //     const token = import.meta.env.VITE_VIDEOSDK_TOKEN;
// // // // // // // // // //     if (!token) {
// // // // // // // // // //       throw new Error("VideoSDK token not configured");
// // // // // // // // // //     }
// // // // // // // // // //     return token;
// // // // // // // // // //   };

// // // // // // // // // //   const createMeeting = async (token: string): Promise<string> => {
// // // // // // // // // //     const response = await fetch("https://api.videosdk.live/v2/rooms", {
// // // // // // // // // //       method: "POST",
// // // // // // // // // //       headers: {
// // // // // // // // // //         Authorization: token,
// // // // // // // // // //         "Content-Type": "application/json",
// // // // // // // // // //       },
// // // // // // // // // //       body: JSON.stringify({}),
// // // // // // // // // //     });

// // // // // // // // // //     if (!response.ok) {
// // // // // // // // // //       throw new Error(`API request failed with status ${response.status}`);
// // // // // // // // // //     }

// // // // // // // // // //     const { roomId } = await response.json();
// // // // // // // // // //     return roomId;
// // // // // // // // // //   };

// // // // // // // // // //   const handleHostMeeting = async () => {
// // // // // // // // // //     if (!user || !seminarId) {
// // // // // // // // // //       toast({
// // // // // // // // // //         title: "Authentication Required",
// // // // // // // // // //         description: "Please sign in to host a meeting.",
// // // // // // // // // //         variant: "destructive",
// // // // // // // // // //       });
// // // // // // // // // //       return;
// // // // // // // // // //     }

// // // // // // // // // //     setJoiningMeeting(true);
// // // // // // // // // //     try {
// // // // // // // // // //       const token = await generateToken();
// // // // // // // // // //       const newMeetingId = await createMeeting(token);

// // // // // // // // // //       const { error } = await supabase
// // // // // // // // // //         .from("seminars")
// // // // // // // // // //         .update({ meeting_id: newMeetingId } as Partial<Seminar>)
// // // // // // // // // //         .eq("id", seminarId);

// // // // // // // // // //       if (error) throw error;

// // // // // // // // // //       setMeetingToken(token);
// // // // // // // // // //       setMeetingId(newMeetingId);
// // // // // // // // // //       setParticipantName(user.email || "Host");
// // // // // // // // // //       setMeetingMode("MEETING");
// // // // // // // // // //     } catch (error) {
// // // // // // // // // //       console.error("Host Meeting Error:", error);
// // // // // // // // // //       toast({
// // // // // // // // // //         title: "Meeting Error",
// // // // // // // // // //         description: "Failed to create meeting. Please try again.",
// // // // // // // // // //         variant: "destructive",
// // // // // // // // // //       });
// // // // // // // // // //     } finally {
// // // // // // // // // //       setJoiningMeeting(false);
// // // // // // // // // //     }
// // // // // // // // // //   };

// // // // // // // // // //   const handleJoinMeeting = async () => {
// // // // // // // // // //     if (!user) {
// // // // // // // // // //       toast({
// // // // // // // // // //         title: "Authentication Required",
// // // // // // // // // //         description: "Please sign in to join the meeting.",
// // // // // // // // // //         variant: "destructive",
// // // // // // // // // //       });
// // // // // // // // // //       return;
// // // // // // // // // //     }

// // // // // // // // // //     if (!seminar?.meeting_id) {
// // // // // // // // // //       toast({
// // // // // // // // // //         title: "No Meeting",
// // // // // // // // // //         description: "No meeting has been created for this seminar yet.",
// // // // // // // // // //         variant: "destructive",
// // // // // // // // // //       });
// // // // // // // // // //       return;
// // // // // // // // // //     }

// // // // // // // // // //     setJoiningMeeting(true);
// // // // // // // // // //     try {
// // // // // // // // // //       const token = await generateToken();
// // // // // // // // // //       setMeetingToken(token);
// // // // // // // // // //       setMeetingId(seminar.meeting_id);
// // // // // // // // // //       setParticipantName(user.email || "Participant");
// // // // // // // // // //       setMeetingMode("MEETING");
// // // // // // // // // //     } catch (error) {
// // // // // // // // // //       console.error("Meeting join error:", error);
// // // // // // // // // //       toast({
// // // // // // // // // //         title: "Meeting Error",
// // // // // // // // // //         description: "Failed to join meeting. Please try again.",
// // // // // // // // // //         variant: "destructive",
// // // // // // // // // //       });
// // // // // // // // // //     } finally {
// // // // // // // // // //       setJoiningMeeting(false);
// // // // // // // // // //     }
// // // // // // // // // //   };

// // // // // // // // // //   interface Speaker {
// // // // // // // // // //   id: string;
// // // // // // // // // //   name: string;
// // // // // // // // // //   qualification: string;
// // // // // // // // // //   department: string;
// // // // // // // // // //   bio: string;
// // // // // // // // // //   avatar_url?: string;
// // // // // // // // // // }

// // // // // // // // // // interface ZoomSpeakersProps {
// // // // // // // // // //   speakers: Speaker[];
// // // // // // // // // // }

// // // // // // // // // //   const copyToClipboard = (text: string) => {
// // // // // // // // // //     navigator.clipboard.writeText(text);
// // // // // // // // // //     toast({
// // // // // // // // // //       title: "Copied to Clipboard",
// // // // // // // // // //       description: "Meeting link has been copied to your clipboard.",
// // // // // // // // // //     });
// // // // // // // // // //   };

// // // // // // // // // //   const formatDate = (dateString: string) => {
// // // // // // // // // //     return new Date(dateString).toLocaleDateString("en-US", {
// // // // // // // // // //       weekday: "long",
// // // // // // // // // //       year: "numeric",
// // // // // // // // // //       month: "long",
// // // // // // // // // //       day: "numeric",
// // // // // // // // // //     });
// // // // // // // // // //   };

// // // // // // // // // //   const formatTime = (timeString: string) => {
// // // // // // // // // //     return new Date(`1970-01-01T${timeString}`).toLocaleTimeString([], {
// // // // // // // // // //       hour: "2-digit",
// // // // // // // // // //       minute: "2-digit",
// // // // // // // // // //     });
// // // // // // // // // //   };

// // // // // // // // // //   if (meetingMode === "MEETING") {
// // // // // // // // // //     return (
// // // // // // // // // //       <MeetingAppProvider>
// // // // // // // // // //         <MeetingProvider
// // // // // // // // // //           config={{
// // // // // // // // // //             meetingId,
// // // // // // // // // //             micEnabled: micOn,
// // // // // // // // // //             webcamEnabled: webcamOn,
// // // // // // // // // //             name: participantName,
// // // // // // // // // //             multiStream: true,
// // // // // // // // // //             mode: "SEND_AND_RECV",
// // // // // // // // // //             debugMode: false,
// // // // // // // // // //           }}
// // // // // // // // // //           token={meetingToken}
// // // // // // // // // //           reinitialiseMeetingOnConfigChange={true}
// // // // // // // // // //           joinWithoutUserInteraction={true}
// // // // // // // // // //         >
// // // // // // // // // //           <div className="fixed inset-0 bg-black z-50">
// // // // // // // // // //             <MeetingContainer
// // // // // // // // // //               onMeetingLeave={() => {
// // // // // // // // // //                 setMeetingMode("LEFT");
// // // // // // // // // //                 setMeetingToken("");
// // // // // // // // // //                 setMeetingId("");
// // // // // // // // // //               }}
// // // // // // // // // //               setIsMeetingLeft={(value) =>
// // // // // // // // // //                 setMeetingMode(value ? "LEFT" : "JOINING")
// // // // // // // // // //               }
// // // // // // // // // //             />
// // // // // // // // // //           </div>
// // // // // // // // // //         </MeetingProvider>
// // // // // // // // // //       </MeetingAppProvider>
// // // // // // // // // //     );
// // // // // // // // // //   }

// // // // // // // // // //   if (loading) {
// // // // // // // // // //     return (
// // // // // // // // // //       <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center">
// // // // // // // // // //         <div className="text-center">
// // // // // // // // // //           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
// // // // // // // // // //           <p className="text-gray-600">Loading seminar details...</p>
// // // // // // // // // //         </div>
// // // // // // // // // //       </div>
// // // // // // // // // //     );
// // // // // // // // // //   }

// // // // // // // // // //   if (!seminar) {
// // // // // // // // // //     return (
// // // // // // // // // //       <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center">
// // // // // // // // // //         <div className="text-center">
// // // // // // // // // //           <h1 className="text-2xl font-bold text-gray-900 mb-4">
// // // // // // // // // //             Seminar Not Found
// // // // // // // // // //           </h1>
// // // // // // // // // //           <p className="text-gray-600 mb-6">
// // // // // // // // // //             The seminar you're looking for doesn't exist or may have been
// // // // // // // // // //             removed.
// // // // // // // // // //           </p>
// // // // // // // // // //           <Button onClick={() => navigate("/")}>
// // // // // // // // // //             <Home className="mr-2 h-4 w-4" />
// // // // // // // // // //             Return to Home
// // // // // // // // // //           </Button>
// // // // // // // // // //         </div>
// // // // // // // // // //       </div>
// // // // // // // // // //     );
// // // // // // // // // //   }

// // // // // // // // // //   return (
// // // // // // // // // //     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
// // // // // // // // // //       <ZoomHeader
// // // // // // // // // //         user={{ email: user?.email || "", id: user?.id || "" }}
// // // // // // // // // //         onSignOut={() => supabase.auth.signOut()}
// // // // // // // // // //         onNavigateHome={() => navigate("/")}
// // // // // // // // // //         onNavigateProfile={() => navigate("/profile")}
// // // // // // // // // //       />

// // // // // // // // // //       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
// // // // // // // // // //         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
// // // // // // // // // //           <div className="lg:col-span-2 space-y-6">
// // // // // // // // // //             <ZoomMain
// // // // // // // // // //               seminar={seminar}
// // // // // // // // // //               isHost={isHost}
// // // // // // // // // //               formatDate={formatDate}
// // // // // // // // // //               formatTime={formatTime}
// // // // // // // // // //             />

// // // // // // // // // //             {speakers.length > 0 && <ZoomSpeakers speakers={speakers} />}
// // // // // // // // // //           </div>

// // // // // // // // // //           <div className="space-y-4">
// // // // // // // // // //             <ZoomActions
// // // // // // // // // //               isHost={isHost}
// // // // // // // // // //               isRegistered={isRegistered}
// // // // // // // // // //               meetingId={seminar.meeting_id || ""}
// // // // // // // // // //               joiningMeeting={joiningMeeting}
// // // // // // // // // //               canceling={canceling}
// // // // // // // // // //               registering={registering}
// // // // // // // // // //               onHostMeeting={handleHostMeeting}
// // // // // // // // // //               onJoinMeeting={handleJoinMeeting}
// // // // // // // // // //               onCancelRegistration={handleCancelRegistration}
// // // // // // // // // //               onRegister={handleRegister}
// // // // // // // // // //               onCopyMeetingId={() =>
// // // // // // // // // //                 seminar.meeting_id && copyToClipboard(seminar.meeting_id)
// // // // // // // // // //               }
// // // // // // // // // //             />
// // // // // // // // // //           </div>
// // // // // // // // // //         </div>
// // // // // // // // // //       </div>
// // // // // // // // // //     </div>
// // // // // // // // // //   );
// // // // // // // // // // };

// // // // // // // // // // export default SeminarDetails;

// // // // // // // // // // In SeminarDetails.tsx
// // // // // // // // // import React, { useState, useEffect } from "react";
// // // // // // // // // import { useParams, useNavigate } from "react-router-dom";
// // // // // // // // // import { Button } from "@/components/ui/button";
// // // // // // // // // import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// // // // // // // // // import { supabase } from "@/integrations/supabase/client";
// // // // // // // // // import { useToast } from "@/hooks/use-toast";
// // // // // // // // // import { MeetingProvider } from "@videosdk.live/react-sdk";
// // // // // // // // // import ZoomHeader from "./zoomheader";
// // // // // // // // // import ZoomMain from "./zoomMain";
// // // // // // // // // import ZoomSpeakers from "./zoomSpeakers";
// // // // // // // // // import VideoMeeting from "../../components/VideoMeeting"
// // // // // // // // // import { ZoomActions } from "./zoomActions";

// // // // // // // // // interface Seminar {
// // // // // // // // //   id: string;
// // // // // // // // //   host_name: string;
// // // // // // // // //   topic: string;
// // // // // // // // //   description: string;
// // // // // // // // //   date: string;
// // // // // // // // //   time: string;
// // // // // // // // //   host_id: string;
// // // // // // // // //   meeting_id?: string | null;
// // // // // // // // // }

// // // // // // // // // interface Speaker {
// // // // // // // // //   id: string;
// // // // // // // // //   name: string;
// // // // // // // // //   qualification: string;
// // // // // // // // //   department: string;
// // // // // // // // //   seminar_id: string;
// // // // // // // // //   created_at: string;
// // // // // // // // // }

// // // // // // // // // const SeminarDetails = () => {
// // // // // // // // //   const { seminarId } = useParams<{ seminarId: string }>();
// // // // // // // // //   const navigate = useNavigate();
// // // // // // // // //   const [seminar, setSeminar] = useState<Seminar | null>(null);
// // // // // // // // //   const [speakers, setSpeakers] = useState<Speaker[]>([]);
// // // // // // // // //   const [loading, setLoading] = useState(true);
// // // // // // // // //   const [user, setUser] = useState<any>(null);
// // // // // // // // //   const { toast } = useToast();
// // // // // // // // //   const [isRegistered, setIsRegistered] = useState(false);
// // // // // // // // //   const [registrationId, setRegistrationId] = useState<string | null>(null);
// // // // // // // // //   const [meetingState, setMeetingState] = useState({
// // // // // // // // //     mode: "IDLE",
// // // // // // // // //     token: "",
// // // // // // // // //     meetingId: "",
// // // // // // // // //     participantName: "",
// // // // // // // // //     micOn: true,
// // // // // // // // //     webcamOn: true
// // // // // // // // //   });

// // // // // // // // //   useEffect(() => {
// // // // // // // // //     const checkUser = async () => {
// // // // // // // // //       const { data: { session } } = await supabase.auth.getSession();
// // // // // // // // //       setUser(session?.user || null);
// // // // // // // // //       if (session?.user && seminarId) {
// // // // // // // // //         await checkRegistrationStatus(session.user.id);
// // // // // // // // //       }
// // // // // // // // //     };

// // // // // // // // //     const fetchSeminarDetails = async () => {
// // // // // // // // //       setLoading(true);
// // // // // // // // //       try {
// // // // // // // // //         const { data: seminarData, error: seminarError } = await supabase
// // // // // // // // //           .from("seminars")
// // // // // // // // //           .select("*")
// // // // // // // // //           .eq("id", seminarId)
// // // // // // // // //           .single();

// // // // // // // // //         if (seminarError) throw seminarError;
// // // // // // // // //         setSeminar(seminarData);

// // // // // // // // //         const { data: speakersData, error: speakersError } = await supabase
// // // // // // // // //           .from("speakers")
// // // // // // // // //           .select("id, name, qualification, department, seminar_id, created_at")
// // // // // // // // //           .eq("seminar_id", seminarId);

// // // // // // // // //         if (speakersError) throw speakersError;
// // // // // // // // //         setSpeakers(speakersData || []);
// // // // // // // // //       } catch (error) {
// // // // // // // // //         console.error("Error fetching seminar details:", error);
// // // // // // // // //         toast({
// // // // // // // // //           title: "Error",
// // // // // // // // //           description: "Failed to load seminar details",
// // // // // // // // //           variant: "destructive",
// // // // // // // // //         });
// // // // // // // // //       } finally {
// // // // // // // // //         setLoading(false);
// // // // // // // // //       }
// // // // // // // // //     };

// // // // // // // // //     checkUser();
// // // // // // // // //     fetchSeminarDetails();
// // // // // // // // //   }, [seminarId, toast]);

// // // // // // // // //   const checkRegistrationStatus = async (userId: string) => {
// // // // // // // // //     try {
// // // // // // // // //       const { data, error } = await supabase
// // // // // // // // //         .from("seminar_registrations")
// // // // // // // // //         .select("id")
// // // // // // // // //         .eq("seminar_id", seminarId)
// // // // // // // // //         .eq("user_id", userId)
// // // // // // // // //         .maybeSingle();

// // // // // // // // //       if (error) throw error;
// // // // // // // // //       setIsRegistered(!!data);
// // // // // // // // //       if (data) setRegistrationId(data.id);
// // // // // // // // //     } catch (error) {
// // // // // // // // //       console.error("Error checking registration status:", error);
// // // // // // // // //       setIsRegistered(false);
// // // // // // // // //     }
// // // // // // // // //   };

// // // // // // // // //   const generateToken = async (): Promise<string> => {
// // // // // // // // //     const token = import.meta.env.VITE_VIDEOSDK_TOKEN;
// // // // // // // // //     if (!token) throw new Error("VideoSDK token not configured");
// // // // // // // // //     return token;
// // // // // // // // //   };

// // // // // // // // //   const createMeeting = async (token: string): Promise<string> => {
// // // // // // // // //     try {
// // // // // // // // //       const response = await fetch("https://api.videosdk.live/v2/rooms", {
// // // // // // // // //         method: "POST",
// // // // // // // // //         headers: {
// // // // // // // // //           Authorization: token,
// // // // // // // // //           "Content-Type": "application/json",
// // // // // // // // //         },
// // // // // // // // //       });

// // // // // // // // //       if (!response.ok) throw new Error("Failed to create meeting");
// // // // // // // // //       const { roomId } = await response.json();
// // // // // // // // //       console.log("ddddddddddddd",roomId)
// // // // // // // // //       return roomId;
// // // // // // // // //     } catch (error) {
// // // // // // // // //       console.error("Meeting creation error:", error);
// // // // // // // // //       throw error;
// // // // // // // // //     }
// // // // // // // // //   };

// // // // // // // // //   const handleHostMeeting = async (): Promise<string> => {
// // // // // // // // //     try {
// // // // // // // // //       const token = await generateToken();
// // // // // // // // //       const newMeetingId = await createMeeting(token);

// // // // // // // // //       const { error } = await supabase
// // // // // // // // //         .from("seminars")
// // // // // // // // //         .update({ meeting_id: newMeetingId } as Partial<Seminar>)
// // // // // // // // //         .eq("id", seminarId);

// // // // // // // // //       if (error) throw error;
// // // // // // // // //       return newMeetingId;
// // // // // // // // //     } catch (error) {
// // // // // // // // //       console.error("Host Meeting Error:", error);
// // // // // // // // //       toast({
// // // // // // // // //         title: "Meeting Error",
// // // // // // // // //         description: "Failed to create meeting",
// // // // // // // // //         variant: "destructive",
// // // // // // // // //       });
// // // // // // // // //       throw error;
// // // // // // // // //     }
// // // // // // // // //   };

// // // // // // // // //   const handleJoinMeeting = async () => {
// // // // // // // // //     if (!seminar?.meeting_id) {
// // // // // // // // //       toast({
// // // // // // // // //         title: "No Meeting",
// // // // // // // // //         description: "Host hasn't started the meeting yet",
// // // // // // // // //         variant: "destructive",
// // // // // // // // //       });
// // // // // // // // //       return;
// // // // // // // // //     }

// // // // // // // // //     try {
// // // // // // // // //       const token = await generateToken();
// // // // // // // // //       setMeetingState({
// // // // // // // // //         mode: "MEETING",
// // // // // // // // //         token,
// // // // // // // // //         meetingId: seminar.meeting_id,
// // // // // // // // //         participantName: user?.email || "Participant",
// // // // // // // // //         micOn: true,
// // // // // // // // //         webcamOn: false
// // // // // // // // //       });
// // // // // // // // //     } catch (error) {
// // // // // // // // //       console.error("Join Meeting Error:", error);
// // // // // // // // //       toast({
// // // // // // // // //         title: "Join Failed",
// // // // // // // // //         description: "Failed to join meeting",
// // // // // // // // //         variant: "destructive",
// // // // // // // // //       });
// // // // // // // // //     }
// // // // // // // // //   };

// // // // // // // // //   const handleLeaveMeeting = () => {
// // // // // // // // //     setMeetingState({
// // // // // // // // //       mode: "LEFT",
// // // // // // // // //       token: "",
// // // // // // // // //       meetingId: "",
// // // // // // // // //       participantName: "",
// // // // // // // // //       micOn: false,
// // // // // // // // //       webcamOn: false
// // // // // // // // //     });
// // // // // // // // //   };

// // // // // // // // //   const handleRegister = async () => {
// // // // // // // // //     if (!user || !seminarId) return;

// // // // // // // // //     try {
// // // // // // // // //       const { data, error } = await supabase
// // // // // // // // //         .from("seminar_registrations")
// // // // // // // // //         .insert({
// // // // // // // // //           seminar_id: seminarId,
// // // // // // // // //           user_id: user.id,
// // // // // // // // //         })
// // // // // // // // //         .select()
// // // // // // // // //         .single();

// // // // // // // // //       if (error) throw error;
// // // // // // // // //       setIsRegistered(true);
// // // // // // // // //       setRegistrationId(data.id);
// // // // // // // // //       toast({
// // // // // // // // //         title: "Registered",
// // // // // // // // //         description: "You are now registered for this seminar",
// // // // // // // // //       });
// // // // // // // // //     } catch (error) {
// // // // // // // // //       console.error("Registration Error:", error);
// // // // // // // // //       toast({
// // // // // // // // //         title: "Registration Failed",
// // // // // // // // //         variant: "destructive",
// // // // // // // // //       });
// // // // // // // // //     }
// // // // // // // // //   };
// // // // // // // // //   const formatDate = (dateString: string) => {
// // // // // // // // //     return new Date(dateString).toLocaleDateString("en-US", {
// // // // // // // // //       weekday: "long",
// // // // // // // // //       year: "numeric",
// // // // // // // // //       month: "long",
// // // // // // // // //       day: "numeric",
// // // // // // // // //     });
// // // // // // // // //   };

// // // // // // // // //   const formatTime = (timeString: string) => {
// // // // // // // // //     return new Date(`1970-01-01T${timeString}`).toLocaleTimeString([], {
// // // // // // // // //       hour: "2-digit",
// // // // // // // // //       minute: "2-digit",
// // // // // // // // //     });
// // // // // // // // //   };

// // // // // // // // //   const handleCancelRegistration = async () => {
// // // // // // // // //     if (!registrationId) return;

// // // // // // // // //     try {
// // // // // // // // //       const { error } = await supabase
// // // // // // // // //         .from("seminar_registrations")
// // // // // // // // //         .delete()
// // // // // // // // //         .eq("id", registrationId);

// // // // // // // // //       if (error) throw error;
// // // // // // // // //       setIsRegistered(false);
// // // // // // // // //       setRegistrationId(null);
// // // // // // // // //       toast({
// // // // // // // // //         title: "Registration Cancelled",
// // // // // // // // //       });
// // // // // // // // //     } catch (error) {
// // // // // // // // //       console.error("Cancellation Error:", error);
// // // // // // // // //       toast({
// // // // // // // // //         title: "Cancellation Failed",
// // // // // // // // //         variant: "destructive",
// // // // // // // // //       });
// // // // // // // // //     }
// // // // // // // // //   };

// // // // // // // // //   if (meetingState.mode === "MEETING") {
// // // // // // // // //     return (
// // // // // // // // //       <MeetingProvider
// // // // // // // // //         config={{
// // // // // // // // //           meetingId: meetingState.meetingId,
// // // // // // // // //           micEnabled: meetingState.micOn,
// // // // // // // // //           webcamEnabled: meetingState.webcamOn,
// // // // // // // // //           name: meetingState.participantName,
// // // // // // // // //           mode: "SEND_AND_RECV",
// // // // // // // // //           debugMode:false,
// // // // // // // // //         }}
// // // // // // // // //         token={meetingState.token}
// // // // // // // // //       >
// // // // // // // // //         <VideoMeeting
// // // // // // // // //           isHost={user?.id === seminar?.host_id}
// // // // // // // // //           meetingId={meetingState.meetingId}
// // // // // // // // //           participantName={meetingState.participantName}
// // // // // // // // //           onMeetingLeave={handleLeaveMeeting}
// // // // // // // // //           micEnabled={meetingState.micOn}
// // // // // // // // //           webcamEnabled={meetingState.webcamOn}
// // // // // // // // //         />
// // // // // // // // //       </MeetingProvider>
// // // // // // // // //     );
// // // // // // // // //   }

// // // // // // // // //   if (loading) {
// // // // // // // // //     return <div className="flex justify-center p-8">Loading...</div>;
// // // // // // // // //   }

// // // // // // // // //   if (!seminar) {
// // // // // // // // //     return <div className="flex justify-center p-8">Seminar not found</div>;
// // // // // // // // //   }

// // // // // // // // //   const isHost = user?.id === seminar.host_id;

// // // // // // // // //   return (
// // // // // // // // //     <div className="min-h-screen bg-gray-50">
// // // // // // // // //       <ZoomHeader user={user}  />

// // // // // // // // //       <div className="max-w-7xl mx-auto px-4 py-8">
// // // // // // // // //         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
// // // // // // // // //           <div className="lg:col-span-2 space-y-6">
// // // // // // // // //             <ZoomMain
// // // // // // // // //               seminar={seminar}
// // // // // // // // //               formatDate={formatDate}
// // // // // // // // //               formatTime={formatTime}

// // // // // // // // //             />
// // // // // // // // //             <ZoomSpeakers speakers={speakers} />
// // // // // // // // //           </div>

// // // // // // // // //           <div className="space-y-4">
// // // // // // // // //             {/* <ZoomActions
// // // // // // // // //               isHost={isHost}
// // // // // // // // //               isRegistered={isRegistered}
// // // // // // // // //               meetingId={seminar.meeting_id}
// // // // // // // // //               joiningMeeting={meetingState.mode === "JOINING"}
// // // // // // // // //               canceling={false}
// // // // // // // // //               registering={false}
// // // // // // // // //               onHostMeeting={handleHostMeeting}
// // // // // // // // //               onJoinMeeting={handleJoinMeeting}
// // // // // // // // //               onCancelRegistration={handleCancelRegistration}
// // // // // // // // //               onRegister={handleRegister}
// // // // // // // // //               onCopyMeetingId={() => {
// // // // // // // // //                 if (seminar.meeting_id) {
// // // // // // // // //                   navigator.clipboard.writeText(seminar.meeting_id);
// // // // // // // // //                   toast({ title: "Meeting ID copied" });
// // // // // // // // //                 }
// // // // // // // // //               }}
// // // // // // // // //             /> */}
// // // // // // // // //             <ZoomActions

// // // // // // // // //               isHost={true}
// // // // // // // // //               isRegistered={isRegistered}
// // // // // // // // //               meetingId={meetingState.meetingId}
// // // // // // // // //               joiningMeeting={meetingState.mode === "JOINING"}
// // // // // // // // //               onHostMeeting={handleHostMeeting}
// // // // // // // // //               onJoinMeeting={handleJoinMeeting}
// // // // // // // // //               onCopyMeetingId={() => {
// // // // // // // // //                 if (seminar.meeting_id) {
// // // // // // // // //                   console.log("ssssssssssss", seminar.meeting_id);
// // // // // // // // //                   navigator.clipboard.writeText(seminar.meeting_id);
// // // // // // // // //                   toast({ title: "Meeting ID copied" });
// // // // // // // // //                 }}}
// // // // // // // // //               participantName={meetingState.participantName}
// // // // // // // // //             />
// // // // // // // // //           </div>
// // // // // // // // //         </div>
// // // // // // // // //       </div>
// // // // // // // // //     </div>
// // // // // // // // //   );
// // // // // // // // // };

// // // // // // // // // export default SeminarDetails;

// // // // // // // // import React, { useState, useEffect } from "react";
// // // // // // // // import { useParams, useNavigate } from "react-router-dom";
// // // // // // // // import { Button } from "@/components/ui/button";
// // // // // // // // import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// // // // // // // // import { supabase } from "@/integrations/supabase/client";
// // // // // // // // import { useToast } from "@/hooks/use-toast";
// // // // // // // // import ZoomHeader from "./zoomheader";
// // // // // // // // import ZoomMain from "./zoomMain";
// // // // // // // // import ZoomSpeakers from "./zoomSpeakers";
// // // // // // // // import VideoMeeting from "../../components/VideoMeeting";
// // // // // // // // import { ZoomActions } from "./zoomActions";
// // // // // // // // import { generateToken, createMeeting } from "@/services/VideoSDKService";

// // // // // // // // interface Seminar {
// // // // // // // //   id: string;
// // // // // // // //   host_name: string;
// // // // // // // //   topic: string;
// // // // // // // //   description: string;
// // // // // // // //   date: string;
// // // // // // // //   time: string;
// // // // // // // //   host_id: string;
// // // // // // // //   meeting_id?: string | null;
// // // // // // // // }

// // // // // // // // interface Speaker {
// // // // // // // //   id: string;
// // // // // // // //   name: string;
// // // // // // // //   qualification: string;
// // // // // // // //   department: string;
// // // // // // // //   seminar_id: string;
// // // // // // // //   created_at: string;
// // // // // // // // }

// // // // // // // // const SeminarDetails = () => {
// // // // // // // //   const { seminarId } = useParams<{ seminarId: string }>();
// // // // // // // //   const navigate = useNavigate();
// // // // // // // //   const [seminar, setSeminar] = useState<Seminar | null>(null);
// // // // // // // //   const [speakers, setSpeakers] = useState<Speaker[]>([]);
// // // // // // // //   const [loading, setLoading] = useState(true);
// // // // // // // //   const [user, setUser] = useState<any>(null);
// // // // // // // //   const { toast } = useToast();
// // // // // // // //   const [isRegistered, setIsRegistered] = useState(false);
// // // // // // // //   const [registrationId, setRegistrationId] = useState<string | null>(null);
// // // // // // // //   const [meetingState, setMeetingState] = useState({
// // // // // // // //     mode: "IDLE",
// // // // // // // //     meetingId: "",
// // // // // // // //     participantName: "",
// // // // // // // //     micOn: true,
// // // // // // // //     webcamOn: true
// // // // // // // //   });

// // // // // // // //   useEffect(() => {
// // // // // // // //     const checkUser = async () => {
// // // // // // // //       const { data: { session } } = await supabase.auth.getSession();
// // // // // // // //       setUser(session?.user || null);
// // // // // // // //       if (session?.user && seminarId) {
// // // // // // // //         await checkRegistrationStatus(session.user.id);
// // // // // // // //       }
// // // // // // // //     };

// // // // // // // //     const fetchSeminarDetails = async () => {
// // // // // // // //       setLoading(true);
// // // // // // // //       try {
// // // // // // // //         const { data: seminarData, error: seminarError } = await supabase
// // // // // // // //           .from("seminars")
// // // // // // // //           .select("*")
// // // // // // // //           .eq("id", seminarId)
// // // // // // // //           .single();

// // // // // // // //         if (seminarError) throw seminarError;
// // // // // // // //         setSeminar(seminarData);

// // // // // // // //         const { data: speakersData, error: speakersError } = await supabase
// // // // // // // //           .from("speakers")
// // // // // // // //           .select("*")
// // // // // // // //           .eq("seminar_id", seminarId);

// // // // // // // //         if (speakersError) throw speakersError;
// // // // // // // //         setSpeakers(speakersData || []);
// // // // // // // //       } catch (error) {
// // // // // // // //         console.error("Error fetching seminar details:", error);
// // // // // // // //         toast({
// // // // // // // //           title: "Error",
// // // // // // // //           description: "Failed to load seminar details",
// // // // // // // //           variant: "destructive",
// // // // // // // //         });
// // // // // // // //       } finally {
// // // // // // // //         setLoading(false);
// // // // // // // //       }
// // // // // // // //     };

// // // // // // // //     checkUser();
// // // // // // // //     fetchSeminarDetails();
// // // // // // // //   }, [seminarId, toast]);

// // // // // // // //   const checkRegistrationStatus = async (userId: string) => {
// // // // // // // //     try {
// // // // // // // //       const { data, error } = await supabase
// // // // // // // //         .from("seminar_registrations")
// // // // // // // //         .select("id")
// // // // // // // //         .eq("seminar_id", seminarId)
// // // // // // // //         .eq("user_id", userId)
// // // // // // // //         .maybeSingle();

// // // // // // // //       if (error) throw error;
// // // // // // // //       setIsRegistered(!!data);
// // // // // // // //       if (data) setRegistrationId(data.id);
// // // // // // // //     } catch (error) {
// // // // // // // //       console.error("Error checking registration status:", error);
// // // // // // // //       setIsRegistered(false);
// // // // // // // //     }
// // // // // // // //   };

// // // // // // // //   const handleHostMeeting = async (): Promise<string> => {
// // // // // // // //     try {
// // // // // // // //       const token = await generateToken();
// // // // // // // //       const newMeetingId = await createMeeting(token);

// // // // // // // //       const { error } = await supabase
// // // // // // // //         .from("seminars")
// // // // // // // //         .update({ meeting_id: newMeetingId } as Partial<Seminar>)
// // // // // // // //         .eq("id", seminarId);

// // // // // // // //       if (error) throw error;

// // // // // // // //       setSeminar(prev => prev ? {...prev, meeting_id: newMeetingId} : null);
// // // // // // // //       return newMeetingId;
// // // // // // // //     } catch (error) {
// // // // // // // //       console.error("Host Meeting Error:", error);
// // // // // // // //       toast({
// // // // // // // //         title: "Meeting Error",
// // // // // // // //         description: "Failed to create meeting",
// // // // // // // //         variant: "destructive",
// // // // // // // //       });
// // // // // // // //       throw error;
// // // // // // // //     }
// // // // // // // //   };

// // // // // // // //   const handleJoinMeeting = async () => {
// // // // // // // //     if (!seminar?.meeting_id) {
// // // // // // // //       toast({
// // // // // // // //         title: "No Meeting",
// // // // // // // //         description: "Host hasn't started the meeting yet",
// // // // // // // //         variant: "destructive",
// // // // // // // //       });
// // // // // // // //       return;
// // // // // // // //     }

// // // // // // // //     setMeetingState({
// // // // // // // //       mode: "MEETING",
// // // // // // // //       meetingId: seminar.meeting_id,
// // // // // // // //       participantName: user?.email || "Participant",
// // // // // // // //       micOn: true,
// // // // // // // //       webcamOn: false
// // // // // // // //     });
// // // // // // // //   };

// // // // // // // //   const handleLeaveMeeting = () => {
// // // // // // // //     setMeetingState(prev => ({ ...prev, mode: "LEFT" }));
// // // // // // // //     navigate(`/seminar/${seminarId}`);
// // // // // // // //   };

// // // // // // // //   const handleRegister = async () => {
// // // // // // // //     if (!user || !seminarId) return;

// // // // // // // //     try {
// // // // // // // //       const { data, error } = await supabase
// // // // // // // //         .from("seminar_registrations")
// // // // // // // //         .insert({
// // // // // // // //           seminar_id: seminarId,
// // // // // // // //           user_id: user.id,
// // // // // // // //         })
// // // // // // // //         .select()
// // // // // // // //         .single();

// // // // // // // //       if (error) throw error;
// // // // // // // //       setIsRegistered(true);
// // // // // // // //       setRegistrationId(data.id);
// // // // // // // //       toast({
// // // // // // // //         title: "Registered",
// // // // // // // //         description: "You are now registered for this seminar",
// // // // // // // //       });
// // // // // // // //     } catch (error) {
// // // // // // // //       console.error("Registration Error:", error);
// // // // // // // //       toast({
// // // // // // // //         title: "Registration Failed",
// // // // // // // //         variant: "destructive",
// // // // // // // //       });
// // // // // // // //     }
// // // // // // // //   };

// // // // // // // //   const formatDate = (dateString: string) => {
// // // // // // // //     return new Date(dateString).toLocaleDateString("en-US", {
// // // // // // // //       weekday: "long",
// // // // // // // //       year: "numeric",
// // // // // // // //       month: "long",
// // // // // // // //       day: "numeric",
// // // // // // // //     });
// // // // // // // //   };

// // // // // // // //   const formatTime = (timeString: string) => {
// // // // // // // //     return new Date(`1970-01-01T${timeString}`).toLocaleTimeString([], {
// // // // // // // //       hour: "2-digit",
// // // // // // // //       minute: "2-digit",
// // // // // // // //     });
// // // // // // // //   };

// // // // // // // //   const handleCancelRegistration = async () => {
// // // // // // // //     if (!registrationId) return;

// // // // // // // //     try {
// // // // // // // //       const { error } = await supabase
// // // // // // // //         .from("seminar_registrations")
// // // // // // // //         .delete()
// // // // // // // //         .eq("id", registrationId);

// // // // // // // //       if (error) throw error;
// // // // // // // //       setIsRegistered(false);
// // // // // // // //       setRegistrationId(null);
// // // // // // // //       toast({
// // // // // // // //         title: "Registration Cancelled",
// // // // // // // //       });
// // // // // // // //     } catch (error) {
// // // // // // // //       console.error("Cancellation Error:", error);
// // // // // // // //       toast({
// // // // // // // //         title: "Cancellation Failed",
// // // // // // // //         variant: "destructive",
// // // // // // // //       });
// // // // // // // //     }
// // // // // // // //   };

// // // // // // // //   if (meetingState.mode === "MEETING") {
// // // // // // // //     return (
// // // // // // // //       <VideoMeeting
// // // // // // // //         isHost={user?.id === seminar?.host_id}
// // // // // // // //         meetingId={meetingState.meetingId}
// // // // // // // //         participantName={meetingState.participantName}
// // // // // // // //         onMeetingLeave={handleLeaveMeeting}
// // // // // // // //         micEnabled={meetingState.micOn}
// // // // // // // //         webcamEnabled={meetingState.webcamOn}
// // // // // // // //       />
// // // // // // // //     );
// // // // // // // //   }

// // // // // // // //   if (loading) {
// // // // // // // //     return <div className="flex justify-center p-8">Loading...</div>;
// // // // // // // //   }

// // // // // // // //   if (!seminar) {
// // // // // // // //     return <div className="flex justify-center p-8">Seminar not found</div>;
// // // // // // // //   }

// // // // // // // //   const isHost = user?.id === seminar.host_id;

// // // // // // // //   return (
// // // // // // // //     <div className="min-h-screen bg-gray-50">
// // // // // // // //       <ZoomHeader user={user} />

// // // // // // // //       <div className="max-w-7xl mx-auto px-4 py-8">
// // // // // // // //         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
// // // // // // // //           <div className="lg:col-span-2 space-y-6">
// // // // // // // //             <ZoomMain
// // // // // // // //               seminar={seminar}
// // // // // // // //               formatDate={formatDate}
// // // // // // // //               formatTime={formatTime}
// // // // // // // //             />
// // // // // // // //             <ZoomSpeakers speakers={speakers} />
// // // // // // // //           </div>

// // // // // // // //           <div className="space-y-4">
// // // // // // // //             <ZoomActions
// // // // // // // //               isHost={isHost}
// // // // // // // //               isRegistered={isRegistered}
// // // // // // // //               meetingId={seminar.meeting_id}
// // // // // // // //               joiningMeeting={meetingState.mode === "JOINING"}
// // // // // // // //               onHostMeeting={handleHostMeeting}
// // // // // // // //               onJoinMeeting={handleJoinMeeting}
// // // // // // // //               onCopyMeetingId={() => {
// // // // // // // //                 if (seminar.meeting_id) {
// // // // // // // //                   navigator.clipboard.writeText(seminar.meeting_id);
// // // // // // // //                   toast({ title: "Meeting ID copied" });
// // // // // // // //                 }
// // // // // // // //               }}
// // // // // // // //             />
// // // // // // // //           </div>
// // // // // // // //         </div>
// // // // // // // //       </div>
// // // // // // // //     </div>
// // // // // // // //   );
// // // // // // // // };

// // // // // // // // export default SeminarDetails;

// // // // // // // import React, { useState, useEffect } from "react";
// // // // // // // import { useParams, useNavigate } from "react-router-dom";
// // // // // // // import { Button } from "@/components/ui/button";
// // // // // // // import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// // // // // // // import { supabase } from "@/integrations/supabase/client";
// // // // // // // import { useToast } from "@/hooks/use-toast";
// // // // // // // import ZoomHeader from "./zoomheader";
// // // // // // // import ZoomMain from "./zoomMain";
// // // // // // // import ZoomSpeakers from "./zoomSpeakers";
// // // // // // // import VideoMeeting from "../../components/VideoMeeting";
// // // // // // // import { ZoomActions } from "./zoomActions";
// // // // // // // import { generateToken, createMeeting } from "@/services/VideoSDKService";
// // // // // // // import { Loader2 } from "lucide-react";

// // // // // // // interface Seminar {
// // // // // // //   id: string;
// // // // // // //   host_name: string;
// // // // // // //   topic: string;
// // // // // // //   description: string;
// // // // // // //   date: string;
// // // // // // //   time: string;
// // // // // // //   host_id: string;
// // // // // // //   meeting_id?: string | null;
// // // // // // // }

// // // // // // // interface Speaker {
// // // // // // //   id: string;
// // // // // // //   name: string;
// // // // // // //   qualification: string;
// // // // // // //   department: string;
// // // // // // //   seminar_id: string;
// // // // // // //   created_at: string;
// // // // // // // }

// // // // // // // const SeminarDetails = () => {
// // // // // // //   const { seminarId } = useParams<{ seminarId: string }>();
// // // // // // //   const navigate = useNavigate();
// // // // // // //   const { toast } = useToast();

// // // // // // //   const [seminar, setSeminar] = useState<Seminar | null>(null);
// // // // // // //   const [speakers, setSpeakers] = useState<Speaker[]>([]);
// // // // // // //   const [loading, setLoading] = useState(true);
// // // // // // //   const [user, setUser] = useState<any>(null);
// // // // // // //   const [isRegistered, setIsRegistered] = useState(false);
// // // // // // //   const [registrationId, setRegistrationId] = useState<string | null>(null);
// // // // // // //   const [joiningMeeting, setJoiningMeeting] = useState(false);
// // // // // // //   const [creatingMeeting, setCreatingMeeting] = useState(false);

// // // // // // //   const isHost = user?.id === seminar?.host_id;

// // // // // // //   useEffect(() => {
// // // // // // //     const fetchData = async () => {
// // // // // // //       try {
// // // // // // //         // Get user session
// // // // // // //         const {
// // // // // // //           data: { session },
// // // // // // //         } = await supabase.auth.getSession();
// // // // // // //         setUser(session?.user || null);

// // // // // // //         // Fetch seminar details
// // // // // // //         const { data: seminarData, error: seminarError } = await supabase
// // // // // // //           .from("seminars")
// // // // // // //           .select("*")
// // // // // // //           .eq("id", seminarId)
// // // // // // //           .single();

// // // // // // //         if (seminarError) throw seminarError;
// // // // // // //         setSeminar(seminarData);

// // // // // // //         // Fetch speakers
// // // // // // //         const { data: speakersData, error: speakersError } = await supabase
// // // // // // //           .from("speakers")
// // // // // // //           .select("*")
// // // // // // //           .eq("seminar_id", seminarId);

// // // // // // //         if (speakersError) throw speakersError;
// // // // // // //         setSpeakers(speakersData || []);

// // // // // // //         // Check registration if user is logged in
// // // // // // //         if (session?.user) {
// // // // // // //           await checkRegistrationStatus(session.user.id);
// // // // // // //         }
// // // // // // //       } catch (error) {
// // // // // // //         console.error("Error fetching data:", error);
// // // // // // //         toast({
// // // // // // //           title: "Error",
// // // // // // //           description: "Failed to load seminar details",
// // // // // // //           variant: "destructive",
// // // // // // //         });
// // // // // // //       } finally {
// // // // // // //         setLoading(false);
// // // // // // //       }
// // // // // // //     };

// // // // // // //     fetchData();
// // // // // // //   }, [seminarId, toast]);

// // // // // // //   const checkRegistrationStatus = async (userId: string) => {
// // // // // // //     try {
// // // // // // //       const { data, error } = await supabase
// // // // // // //         .from("seminar_registrations")
// // // // // // //         .select("id")
// // // // // // //         .eq("seminar_id", seminarId)
// // // // // // //         .eq("user_id", userId)
// // // // // // //         .maybeSingle();

// // // // // // //       if (error) throw error;
// // // // // // //       setIsRegistered(!!data);
// // // // // // //       if (data) setRegistrationId(data.id);
// // // // // // //     } catch (error) {
// // // // // // //       console.error("Error checking registration:", error);
// // // // // // //     }
// // // // // // //   };

// // // // // // //   const handleHostMeeting = async () => {
// // // // // // //     try {
// // // // // // //       setCreatingMeeting(true);
// // // // // // //       const token = await generateToken();
// // // // // // //       const newMeetingId = await createMeeting(token);

// // // // // // //       const { error } = await supabase
// // // // // // //         .from("seminars")
// // // // // // //         .update({ meeting_id: newMeetingId }as Partial<Seminar>)
// // // // // // //         .eq("id", seminarId);

// // // // // // //       if (error) throw error;

// // // // // // //       setSeminar((prev) =>
// // // // // // //         prev ? { ...prev, meeting_id: newMeetingId } : null
// // // // // // //       );
// // // // // // //       return newMeetingId;
// // // // // // //     } catch (error) {
// // // // // // //       console.error("Host Meeting Error:", error);
// // // // // // //       toast({
// // // // // // //         title: "Meeting Error",
// // // // // // //         description: "Failed to create meeting",
// // // // // // //         variant: "destructive",
// // // // // // //       });
// // // // // // //       throw error;
// // // // // // //     } finally {
// // // // // // //       setCreatingMeeting(false);
// // // // // // //     }
// // // // // // //   };

// // // // // // //   const handleJoinMeeting = async () => {
// // // // // // //     if (!seminar?.meeting_id) {
// // // // // // //       toast({
// // // // // // //         title: "No Meeting",
// // // // // // //         description: "Meeting not available yet",
// // // // // // //         variant: "destructive",
// // // // // // //       });
// // // // // // //       return;
// // // // // // //     }

// // // // // // //     try {
// // // // // // //       setJoiningMeeting(true);
// // // // // // //       navigate(`/seminar/${seminarId}/meeting`, {
// // // // // // //         state: {
// // // // // // //           meetingId: seminar.meeting_id,
// // // // // // //           isHost,
// // // // // // //           participantName: user?.email || "Participant",
// // // // // // //         },
// // // // // // //       });
// // // // // // //     } catch (error) {
// // // // // // //       console.error("Join meeting error:", error);
// // // // // // //       toast({
// // // // // // //         title: "Join Failed",
// // // // // // //         description: "Could not join meeting",
// // // // // // //         variant: "destructive",
// // // // // // //       });
// // // // // // //     } finally {
// // // // // // //       setJoiningMeeting(false);
// // // // // // //     }
// // // // // // //   };

// // // // // // //   const handleRegister = async () => {
// // // // // // //     if (!user || !seminarId) return;

// // // // // // //     try {
// // // // // // //       const { data, error } = await supabase
// // // // // // //         .from("seminar_registrations")
// // // // // // //         .insert({
// // // // // // //           seminar_id: seminarId,
// // // // // // //           user_id: user.id,
// // // // // // //         })
// // // // // // //         .select()
// // // // // // //         .single();

// // // // // // //       if (error) throw error;
// // // // // // //       setIsRegistered(true);
// // // // // // //       setRegistrationId(data.id);
// // // // // // //       toast({
// // // // // // //         title: "Registered",
// // // // // // //         description: "You are now registered for this seminar",
// // // // // // //       });
// // // // // // //     } catch (error) {
// // // // // // //       console.error("Registration Error:", error);
// // // // // // //       toast({
// // // // // // //         title: "Registration Failed",
// // // // // // //         variant: "destructive",
// // // // // // //       });
// // // // // // //     }
// // // // // // //   };

// // // // // // //   const handleCancelRegistration = async () => {
// // // // // // //     if (!registrationId) return;

// // // // // // //     try {
// // // // // // //       const { error } = await supabase
// // // // // // //         .from("seminar_registrations")
// // // // // // //         .delete()
// // // // // // //         .eq("id", registrationId);

// // // // // // //       if (error) throw error;
// // // // // // //       setIsRegistered(false);
// // // // // // //       setRegistrationId(null);
// // // // // // //       toast({
// // // // // // //         title: "Registration Cancelled",
// // // // // // //       });
// // // // // // //     } catch (error) {
// // // // // // //       console.error("Cancellation Error:", error);
// // // // // // //       toast({
// // // // // // //         title: "Cancellation Failed",
// // // // // // //         variant: "destructive",
// // // // // // //       });
// // // // // // //     }
// // // // // // //   };

// // // // // // //   const formatDate = (dateString: string) => {
// // // // // // //     return new Date(dateString).toLocaleDateString("en-US", {
// // // // // // //       weekday: "long",
// // // // // // //       year: "numeric",
// // // // // // //       month: "long",
// // // // // // //       day: "numeric",
// // // // // // //     });
// // // // // // //   };

// // // // // // //   const formatTime = (timeString: string) => {
// // // // // // //     return new Date(`1970-01-01T${timeString}`).toLocaleTimeString([], {
// // // // // // //       hour: "2-digit",
// // // // // // //       minute: "2-digit",
// // // // // // //     });
// // // // // // //   };

// // // // // // //   if (loading) {
// // // // // // //     return (
// // // // // // //       <div className="flex justify-center items-center h-screen">
// // // // // // //         <Loader2 className="h-8 w-8 animate-spin" />
// // // // // // //       </div>
// // // // // // //     );
// // // // // // //   }

// // // // // // //   if (!seminar) {
// // // // // // //     return (
// // // // // // //       <div className="flex justify-center items-center h-screen">
// // // // // // //         <p>Seminar not found</p>
// // // // // // //       </div>
// // // // // // //     );
// // // // // // //   }

// // // // // // //   return (
// // // // // // //     <div className="min-h-screen bg-gray-50">
// // // // // // //       <ZoomHeader user={user} />

// // // // // // //       <div className="max-w-7xl mx-auto px-4 py-8">
// // // // // // //         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
// // // // // // //           <div className="lg:col-span-2 space-y-6">
// // // // // // //             <ZoomMain
// // // // // // //               seminar={seminar}
// // // // // // //               formatDate={formatDate}
// // // // // // //               formatTime={formatTime}
// // // // // // //               isRegistered={isRegistered}
// // // // // // //               onRegister={handleRegister}
// // // // // // //               onCancelRegistration={handleCancelRegistration}
// // // // // // //             />
// // // // // // //             <ZoomSpeakers speakers={speakers} />
// // // // // // //           </div>

// // // // // // //           <div className="space-y-4">
// // // // // // //             <ZoomActions
// // // // // // //               isHost={isHost}
// // // // // // //               isRegistered={isRegistered}
// // // // // // //               meetingId={seminar.meeting_id}
// // // // // // //               joiningMeeting={joiningMeeting}
// // // // // // //               onHostMeeting={handleHostMeeting}
// // // // // // //               onJoinMeeting={handleJoinMeeting}
// // // // // // //               onCopyMeetingId={() => {
// // // // // // //                 if (seminar.meeting_id) {
// // // // // // //                   navigator.clipboard.writeText(seminar.meeting_id);
// // // // // // //                   toast({ title: "Meeting ID copied" });
// // // // // // //                 }
// // // // // // //               }}
// // // // // // //             />
// // // // // // //           </div>
// // // // // // //         </div>
// // // // // // //       </div>
// // // // // // //     </div>
// // // // // // //   );
// // // // // // // };

// // // // // // // export default SeminarDetails;

// // // // import React, { useState, useEffect } from "react";
// // // // import { useParams, useNavigate } from "react-router-dom";
// // // // import { Button } from "@/components/ui/button";
// // // // import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// // // // import { supabase } from "@/integrations/supabase/client";
// // // // import { useToast } from "@/hooks/use-toast";
// // // // import ZoomHeader from "./zoomheader";
// // // // import ZoomMain from "./zoomMain";
// // // // import ZoomSpeakers from "./zoomSpeakers";
// // // // import VideoMeeting from "../../components/VideoMeeting";
// // // // import { ZoomActions } from "./zoomActions";
// // // // import { generateToken, createMeeting } from "@/services/VideoSDKService";
// // // // import { Loader2 } from "lucide-react";

// // // // interface Seminar {
// // // //   id: string;
// // // //   host_name: string;
// // // //   topic: string;
// // // //   description: string;
// // // //   date: string;
// // // //   time: string;
// // // //   host_id: string;
// // // //   meeting_id?: string | null;
// // // // }

// // // // interface Speaker {
// // // //   id: string;
// // // //   name: string;
// // // //   qualification: string;
// // // //   department: string;
// // // //   seminar_id: string;
// // // //   created_at: string;
// // // // }

// // // // const SeminarDetails = () => {
// // // //   const { seminarId } = useParams<{ seminarId: string }>();
// // // //   const navigate = useNavigate();
// // // //   const { toast } = useToast();

// // // //   const [seminar, setSeminar] = useState<Seminar | null>(null);
// // // //   const [speakers, setSpeakers] = useState<Speaker[]>([]);
// // // //   const [loading, setLoading] = useState(true);
// // // //   const [user, setUser] = useState<any>(null);
// // // //   const [isRegistered, setIsRegistered] = useState(false);
// // // //   const [registrationId, setRegistrationId] = useState<string | null>(null);
// // // //   const [joiningMeeting, setJoiningMeeting] = useState(false);
// // // //   const [creatingMeeting, setCreatingMeeting] = useState(false);
// // // //   const [showMeeting, setShowMeeting] = useState(false);

// // // //   const isHost = user?.id === seminar?.host_id;

// // // //   useEffect(() => {
// // // //     const fetchData = async () => {
// // // //       try {
// // // //         // Get user session
// // // //         const { data: { session } } = await supabase.auth.getSession();
// // // //         setUser(session?.user || null);

// // // //         // Fetch seminar details
// // // //         const { data: seminarData, error: seminarError } = await supabase
// // // //           .from("seminars")
// // // //           .select("*")
// // // //           .eq("id", seminarId)
// // // //           .single();

// // // //         if (seminarError) throw seminarError;
// // // //         setSeminar(seminarData);

// // // //         // Fetch speakers
// // // //         const { data: speakersData, error: speakersError } = await supabase
// // // //           .from("speakers")
// // // //           .select("*")
// // // //           .eq("seminar_id", seminarId);

// // // //         if (speakersError) throw speakersError;
// // // //         setSpeakers(speakersData || []);

// // // //         // Check registration if user is logged in
// // // //         if (session?.user) {
// // // //           await checkRegistrationStatus(session.user.id);
// // // //         }
// // // //       } catch (error) {
// // // //         console.error("Error fetching data:", error);
// // // //         toast({
// // // //           title: "Error",
// // // //           description: "Failed to load seminar details",
// // // //           variant: "destructive",
// // // //         });
// // // //       } finally {
// // // //         setLoading(false);
// // // //       }
// // // //     };

// // // //     fetchData();
// // // //   }, [seminarId, toast]);

// // // //   const checkRegistrationStatus = async (userId: string) => {
// // // //     try {
// // // //       const { data, error } = await supabase
// // // //         .from("seminar_registrations")
// // // //         .select("id")
// // // //         .eq("seminar_id", seminarId)
// // // //         .eq("user_id", userId)
// // // //         .maybeSingle();

// // // //       if (error) throw error;
// // // //       setIsRegistered(!!data);
// // // //       if (data) setRegistrationId(data.id);
// // // //     } catch (error) {
// // // //       console.error("Error checking registration:", error);
// // // //     }
// // // //   };

// // // //   const handleHostMeeting = async () => {
// // // //     try {
// // // //       setCreatingMeeting(true);
// // // //       const token = await generateToken();
// // // //       const newMeetingId = await createMeeting(token);

// // // //       const { error } = await supabase
// // // //         .from("seminars")
// // // //         .update({ meeting_id: newMeetingId }as Partial<Seminar>)
// // // //         .eq("id", seminarId);

// // // //       if (error) throw error;

// // // //       setSeminar(prev => prev ? {...prev, meeting_id: newMeetingId} : null);
// // // //       return newMeetingId;
// // // //     } catch (error) {
// // // //       console.error("Host Meeting Error:", error);
// // // //       toast({
// // // //         title: "Meeting Error",
// // // //         description: "Failed to create meeting",
// // // //         variant: "destructive",
// // // //       });
// // // //       throw error;
// // // //     } finally {
// // // //       setCreatingMeeting(false);
// // // //     }
// // // //   };

// // // //   const handleJoinMeeting = async () => {
// // // //     if (!seminar?.meeting_id) {
// // // //       toast({
// // // //         title: "No Meeting",
// // // //         description: "Meeting not available yet",
// // // //         variant: "destructive",
// // // //       });
// // // //       return;
// // // //     }

// // // //     try {
// // // //       setJoiningMeeting(true);
// // // //       setShowMeeting(true);
// // // //     } catch (error) {
// // // //       console.error("Join meeting error:", error);
// // // //       toast({
// // // //         title: "Join Failed",
// // // //         description: "Could not join meeting",
// // // //         variant: "destructive",
// // // //       });
// // // //     } finally {
// // // //       setJoiningMeeting(false);
// // // //     }
// // // //   };

// // // //   const handleLeaveMeeting = () => {
// // // //     setShowMeeting(false);
// // // //   };

// // // //   const handleRegister = async () => {
// // // //     if (!user || !seminarId) return;

// // // //     try {
// // // //       const { data, error } = await supabase
// // // //         .from("seminar_registrations")
// // // //         .insert({
// // // //           seminar_id: seminarId,
// // // //           user_id: user.id,
// // // //         })
// // // //         .select()
// // // //         .single();

// // // //       if (error) throw error;
// // // //       setIsRegistered(true);
// // // //       setRegistrationId(data.id);
// // // //       toast({
// // // //         title: "Registered",
// // // //         description: "You are now registered for this seminar",
// // // //       });
// // // //     } catch (error) {
// // // //       console.error("Registration Error:", error);
// // // //       toast({
// // // //         title: "Registration Failed",
// // // //         variant: "destructive",
// // // //       });
// // // //     }
// // // //   };

// // // //   const handleCancelRegistration = async () => {
// // // //     if (!registrationId) return;

// // // //     try {
// // // //       const { error } = await supabase
// // // //         .from("seminar_registrations")
// // // //         .delete()
// // // //         .eq("id", registrationId);

// // // //       if (error) throw error;
// // // //       setIsRegistered(false);
// // // //       setRegistrationId(null);
// // // //       toast({
// // // //         title: "Registration Cancelled",
// // // //       });
// // // //     } catch (error) {
// // // //       console.error("Cancellation Error:", error);
// // // //       toast({
// // // //         title: "Cancellation Failed",
// // // //         variant: "destructive",
// // // //       });
// // // //     }
// // // //   };

// // // //   const formatDate = (dateString: string) => {
// // // //     return new Date(dateString).toLocaleDateString("en-US", {
// // // //       weekday: "long",
// // // //       year: "numeric",
// // // //       month: "long",
// // // //       day: "numeric",
// // // //     });
// // // //   };

// // // //   const formatTime = (timeString: string) => {
// // // //     return new Date(`1970-01-01T${timeString}`).toLocaleTimeString([], {
// // // //       hour: "2-digit",
// // // //       minute: "2-digit",
// // // //     });
// // // //   };

// // // //   if (showMeeting && seminar?.meeting_id) {
// // // //     return (
// // // //       <VideoMeeting
// // // //         isHost={isHost}
// // // //         meetingId={seminar.meeting_id}
// // // //         participantName={user?.email || "Participant"}
// // // //         onMeetingLeave={handleLeaveMeeting}
// // // //         micEnabled={true}
// // // //         webcamEnabled={true}
// // // //       />
// // // //     );
// // // //   }

// // // //   if (loading) {
// // // //     return (
// // // //       <div className="flex justify-center items-center h-screen">
// // // //         <Loader2 className="h-8 w-8 animate-spin" />
// // // //       </div>
// // // //     );
// // // //   }

// // // //   if (!seminar) {
// // // //     return (
// // // //       <div className="flex justify-center items-center h-screen">
// // // //         <p>Seminar not found</p>
// // // //       </div>
// // // //     );
// // // //   }

// // // //   return (
// // // //     <div className="min-h-screen bg-gray-50">
// // // //       <ZoomHeader user={user} />

// // // //       <div className="max-w-7xl mx-auto px-4 py-8">
// // // //         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
// // // //           <div className="lg:col-span-2 space-y-6">
// // // //             <ZoomMain
// // // //               seminar={seminar}
// // // //               formatDate={formatDate}
// // // //               formatTime={formatTime}
// // // //               isRegistered={isRegistered}
// // // //               onRegister={handleRegister}
// // // //               onCancelRegistration={handleCancelRegistration}
// // // //             />
// // // //             <ZoomSpeakers speakers={speakers} />
// // // //           </div>

// // // //           <div className="space-y-4">
// // // //             <ZoomActions
// // // //               isHost={isHost}
// // // //               isRegistered={isRegistered}
// // // //               meetingId={seminar.meeting_id}
// // // //               joiningMeeting={joiningMeeting}
// // // //               creatingMeeting={creatingMeeting}
// // // //               onHostMeeting={handleHostMeeting}
// // // //               onJoinMeeting={handleJoinMeeting}
// // // //               onCopyMeetingId={() => {
// // // //                 if (seminar.meeting_id) {
// // // //                   navigator.clipboard.writeText(seminar.meeting_id);
// // // //                   toast({ title: "Meeting ID copied" });
// // // //                 }
// // // //               }}
// // // //             />
// // // //           </div>
// // // //         </div>
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // };

// // // // export default SeminarDetails;

// // // // // import { useState, useEffect } from "react";
// // // // // import React from "react";
// // // // // import { useParams, useNavigate, Link } from "react-router-dom";
// // // // // import { Button } from "@/components/ui/button";
// // // // // import {
// // // // //   Card,
// // // // //   CardContent,
// // // // //   CardDescription,
// // // // //   CardHeader,
// // // // //   CardTitle,
// // // // // } from "@/components/ui/card";
// // // // // import { Badge } from "@/components/ui/badge";
// // // // // import {
// // // // //   ArrowLeft,
// // // // //   User as UserIcon,
// // // // //   Clock,
// // // // //   CalendarDays,
// // // // //   Users,
// // // // //   CheckCircle,
// // // // //   Home,
// // // // //   Shield,
// // // // //   Mic,
// // // // //   MicOff,
// // // // //   Video,
// // // // //   VideoOff,
// // // // //   PhoneOff,
// // // // //   Copy,
// // // // // } from "lucide-react";
// // // // // import { supabase } from "@/integrations/supabase/client";
// // // // // import { useToast } from "@/hooks/use-toast";
// // // // // import type { User as AuthUser } from "@supabase/supabase-js";
// // // // // import {
// // // // //   MeetingProvider,
// // // // //   useMeeting,
// // // // //   useParticipant,
// // // // // } from "@videosdk.live/react-sdk";

// // // // // interface Seminar {
// // // // //   id: string;
// // // // //   host_name: string;
// // // // //   topic: string;
// // // // //   description: string;
// // // // //   date: string;
// // // // //   time: string;
// // // // //   host_id: string;
// // // // //   meeting_id?: string | null;
// // // // // }

// // // // // interface Speaker {
// // // // //   id: string;
// // // // //   name: string;
// // // // //   qualification: string;
// // // // //   department: string;
// // // // // }

// // // // // const MeetingView = () => {
// // // // //   const { toast } = useToast();
// // // // //   console.log("kkkkkkkkkkkkkkk")
// // // // //   const meeting = useMeeting({
// // // // //     onError: (error) => {
// // // // //       toast({
// // // // //         title: "Meeting Error",
// // // // //         description: error.message,
// // // // //         variant: "destructive",
// // // // //       });
// // // // //     },
// // // // //   });

// // // // //   const ParticipantView = ({ participantId }: { participantId: string }) => {
// // // // //     const { webcamStream, micStream, displayName, isLocal } =
// // // // //       useParticipant(participantId);

// // // // //     const videoRef = React.useRef<HTMLVideoElement>(null);

// // // // //     useEffect(() => {
// // // // //       if (videoRef.current && webcamStream) {
// // // // //         const mediaStream = new MediaStream();
// // // // //         mediaStream.addTrack(webcamStream.track);
// // // // //         videoRef.current.srcObject = mediaStream;
// // // // //       }
// // // // //     }, [webcamStream]);

// // // // //     return (
// // // // //       <div className="border rounded-lg p-4 mb-4">
// // // // //         <div className="flex justify-between items-center mb-2">
// // // // //           <h3 className="font-medium">
// // // // //             {displayName} {isLocal && "(You)"}
// // // // //           </h3>
// // // // //         </div>
// // // // //         <video
// // // // //           ref={videoRef}
// // // // //           autoPlay
// // // // //           playsInline
// // // // //           className="w-full rounded-lg"
// // // // //         />
// // // // //         {!webcamStream && (
// // // // //           <div className="bg-gray-100 rounded-lg h-48 flex items-center justify-center">
// // // // //             <div className="bg-gray-300 rounded-full w-20 h-20 flex items-center justify-center">
// // // // //               <Users size={24} />
// // // // //             </div>
// // // // //           </div>
// // // // //         )}
// // // // //       </div>
// // // // //     );
// // // // //   };

// // // // //   return (
// // // // //     <div className="space-y-4">
// // // // //       <div className="flex justify-between items-center">
// // // // //         <h2 className="text-xl font-bold">Meeting: {meeting.meetingId}</h2>
// // // // //         <Button
// // // // //           variant="destructive"
// // // // //           onClick={() => {
// // // // //             meeting.leave();
// // // // //           }}
// // // // //         >
// // // // //           <PhoneOff className="mr-2 h-4 w-4" />
// // // // //           Leave Meeting
// // // // //         </Button>
// // // // //       </div>

// // // // //       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// // // // //         {[...meeting.participants.keys()].map((participantId) => (
// // // // //           <ParticipantView key={participantId} participantId={participantId} />
// // // // //         ))}
// // // // //       </div>

// // // // //       <div className="flex gap-4 justify-center">
// // // // //         <Button
// // // // //           onClick={() => {
// // // // //             if (meeting.localParticipant.micOn) meeting.muteMic();
// // // // //             else meeting.unmuteMic();
// // // // //           }}
// // // // //           variant={meeting.localParticipant.micOn ? "default" : "outline"}
// // // // //         >
// // // // //           {meeting.localParticipant.micOn ? (
// // // // //             <Mic className="mr-2 h-4 w-4" />
// // // // //           ) : (
// // // // //             <MicOff className="mr-2 h-4 w-4" />
// // // // //           )}
// // // // //           {meeting.localParticipant.micOn ? "Mute" : "Unmute"}
// // // // //         </Button>
// // // // //         <Button
// // // // //           onClick={() => {
// // // // //             if (meeting.localParticipant.webcamOn) meeting.disableWebcam();
// // // // //             else meeting.enableWebcam();
// // // // //           }}
// // // // //           variant={meeting.localParticipant.webcamOn ? "default" : "outline"}
// // // // //         >
// // // // //           {meeting.localParticipant.webcamOn ? (
// // // // //             <Video className="mr-2 h-4 w-4" />
// // // // //           ) : (
// // // // //             <VideoOff className="mr-2 h-4 w-4" />
// // // // //           )}
// // // // //           {meeting.localParticipant.webcamOn ? "Stop Video" : "Start Video"}
// // // // //         </Button>
// // // // //       </div>
// // // // //     </div>
// // // // //   );
// // // // // };

// // // // // const SeminarDetails = () => {
// // // // //   const { seminarId } = useParams();
// // // // //   const navigate = useNavigate();
// // // // //   const [seminar, setSeminar] = useState<Seminar | null>(null);
// // // // //   const [speakers, setSpeakers] = useState<Speaker[]>([]);
// // // // //   const [loading, setLoading] = useState(true);
// // // // //   const [registering, setRegistering] = useState(false);
// // // // //   const [isRegistered, setIsRegistered] = useState(false);
// // // // //   const [user, setUser] = useState<AuthUser | null>(null);
// // // // //   const { toast } = useToast();
// // // // //   const [canceling, setCanceling] = useState(false);
// // // // //   const [registrationId, setRegistrationId] = useState<string | null>(null);
// // // // //   const isHost = user?.id === seminar?.host_id;
// // // // //   const [meetingToken, setMeetingToken] = useState<string | null>(null);
// // // // //   const [meetingId, setMeetingId] = useState<string | null>(null);
// // // // //   const [joiningMeeting, setJoiningMeeting] = useState(false);
// // // // //   const [meetingLink, setMeetingLink] = useState<string | null>(null);

// // // // //   const handleBackNavigation = () => {
// // // // //     if (window.history.length > 1) {
// // // // //       navigate(-1);
// // // // //     } else {
// // // // //       navigate("/");
// // // // //     }
// // // // //   };

// // // // //   useEffect(() => {
// // // // //     checkUser();
// // // // //     if (seminarId) {
// // // // //       fetchSeminarDetails();
// // // // //     }
// // // // //   }, [seminarId]);

// // // // //   // const generateToken = async (): Promise<string> => {
// // // // //   //   console.log("llllllllllllll");
// // // // //   //   try {
// // // // //   //     // In production, you should call your backend to generate a token
// // // // //   //     // This is just for demonstration purposes
// // // // //   //     // return process.env.REACT_APP_VIDEOSDK_TOKEN || "TEMPORARY-TOKEN";
// // // // //   //     const token = process.env.REACT_APP_VIDEOSDK_TOKEN;
// // // // //   //     if (!token) throw new Error("Token is missing from environment");
// // // // //   //   } catch (error) {
// // // // //   //     console.error("Error generating token:", error);
// // // // //   //     throw error;
// // // // //   //   }
// // // // //   // };

// // // // //   // const generateToken = async (): Promise<string> => {
// // // // //   //   try {
// // // // //   //     const token = process.env.REACT_APP_VIDEOSDK_TOKEN;
// // // // //   //     if (!token) throw new Error("Token is missing from environment");
// // // // //   //     return token;
// // // // //   //   } catch (error) {
// // // // //   //     console.error("Error generating token:", error);
// // // // //   //     throw error;
// // // // //   //   }
// // // // //   // };

// // // // //   const createMeeting = async (token: string): Promise<string> => {
// // // // //     try {
// // // // //       const response = await fetch("https://api.videosdk.live/v2/rooms", {
// // // // //         method: "POST",
// // // // //         headers: {
// // // // //           "Content-Type": "application/json",
// // // // //           Authorization: token,
// // // // //         },
// // // // //       });
// // // // //       const { roomId } = await response.json();
// // // // //       return roomId;
// // // // //     } catch (error) {
// // // // //       console.error("Error creating meeting:", error);
// // // // //       throw error;
// // // // //     }
// // // // //   };

// // // // //   // const handleHostMeeting = async () => {
// // // // //   //   console.log("uuuuuuuuuuuuu")
// // // // //   //   if (!user) {
// // // // //   //     toast({
// // // // //   //       title: "Authentication Required",
// // // // //   //       description: "Please sign in to host a meeting.",
// // // // //   //       variant: "destructive",
// // // // //   //     });
// // // // //   //     return;
// // // // //   //   }

// // // // //   //   setJoiningMeeting(true);
// // // // //   //   try {
// // // // //   //     const token = await generateToken();
// // // // //   //     const newMeetingId = await createMeeting(token);

// // // // //   //     // Update seminar with meeting ID in database
// // // // //   //     const { error } = await supabase
// // // // //   //       .from("seminars")
// // // // //   //       .update({ meeting_id: newMeetingId } as Partial<Seminar>)
// // // // //   //       .eq("id", seminarId);

// // // // //   //     if (error) throw error;

// // // // //   //     setMeetingToken(token);
// // // // //   //     setMeetingId(newMeetingId);
// // // // //   //     setMeetingLink(
// // // // //   //       `${window.location.origin}/seminar/${seminarId}/meeting/${newMeetingId}`
// // // // //   //     );

// // // // //   //     toast({
// // // // //   //       title: "Meeting Created",
// // // // //   //       description: "You have successfully created a meeting.",
// // // // //   //     });
// // // // //   //   } catch (error) {
// // // // //   //     // toast({
// // // // //   //     //   title: "Meeting Error",
// // // // //   //     //   description: "Failed to create meeting. Please try again.",
// // // // //   //     //   variant: "destructive",
// // // // //   //     // });
// // // // //   //     console.error("Host Meeting Error:", error);
// // // // //   // toast({
// // // // //   //   title: "Meeting Error",
// // // // //   //   description: "Failed to create meeting. Please try again.",
// // // // //   //   variant: "destructive",
// // // // //   // });
// // // // //   //   } finally {
// // // // //   //     setJoiningMeeting(false);
// // // // //   //   }
// // // // //   // };

// // // // //   // Updated generateToken function
// // // // //   const generateToken = async (): Promise<string> => {
// // // // //     try {
// // // // //       // In production, replace this with a call to your backend
// // // // //       const token = import.meta.env.VITE_VIDEOSDK_TOKEN;
// // // // //       if (!token) {
// // // // //         throw new Error("VideoSDK token not configured");
// // // // //       }
// // // // //       return token;
// // // // //     } catch (error) {
// // // // //       console.error("Error generating token:", error);
// // // // //       throw new Error("Failed to generate meeting token");
// // // // //     }
// // // // //   };

// // // // //   // Updated checkRegistrationStatus function
// // // // //   const checkRegistrationStatus = async (userId: string) => {
// // // // //     try {
// // // // //       const { data, error, count } = await supabase
// // // // //         .from("seminar_registrations")
// // // // //         .select("*", { count: "exact", head: true })
// // // // //         .eq("seminar_id", seminarId)
// // // // //         .eq("user_id", userId);

// // // // //       if (error) throw error;

// // // // //       setIsRegistered(count ? count > 0 : false);

// // // // //       // If you need the registration ID, you'll need a separate query
// // // // //       if (count && count > 0) {
// // // // //         const { data: registrationData } = await supabase
// // // // //           .from("seminar_registrations")
// // // // //           .select("id")
// // // // //           .eq("seminar_id", seminarId)
// // // // //           .eq("user_id", userId)
// // // // //           .single();

// // // // //         if (registrationData) {
// // // // //           setRegistrationId(registrationData.id);
// // // // //         }
// // // // //       }
// // // // //     } catch (error) {
// // // // //       console.error("Error checking registration status:", error);
// // // // //       setIsRegistered(false);
// // // // //     }
// // // // //   };

// // // // //   // Updated handleHostMeeting with better error handling
// // // // //   const handleHostMeeting = async () => {
// // // // //     if (!user) {
// // // // //       toast({
// // // // //         title: "Authentication Required",
// // // // //         description: "Please sign in to host a meeting.",
// // // // //         variant: "destructive",
// // // // //       });
// // // // //       return;
// // // // //     }

// // // // //     setJoiningMeeting(true);
// // // // //     try {
// // // // //       const token = await generateToken();
// // // // //       const newMeetingId = await createMeeting(token);

// // // // //       // Update seminar with meeting ID in database
// // // // //       const { error } = await supabase
// // // // //         .from("seminars")
// // // // //         .update({ meeting_id: newMeetingId } as Partial<Seminar>)
// // // // //         .eq("id", seminarId);

// // // // //       if (error) throw error;

// // // // //       setMeetingToken(token);
// // // // //       setMeetingId(newMeetingId);
// // // // //       setMeetingLink(
// // // // //         `${window.location.origin}/seminar/${seminarId}/meeting/${newMeetingId}`
// // // // //       );

// // // // //       toast({
// // // // //         title: "Meeting Created",
// // // // //         description: "You have successfully created a meeting.",
// // // // //       });
// // // // //     } catch (error) {
// // // // //       console.error("Host Meeting Error:", error);
// // // // //       toast({
// // // // //         title: "Meeting Error",
// // // // //         description:
// // // // //           error instanceof Error
// // // // //             ? error.message
// // // // //             : "Failed to create meeting. Please try again.",
// // // // //         variant: "destructive",
// // // // //       });
// // // // //     } finally {
// // // // //       setJoiningMeeting(false);
// // // // //     }
// // // // //   };

// // // // //   const handleJoinMeeting = async () => {
// // // // //     if (!user) {
// // // // //       toast({
// // // // //         title: "Authentication Required",
// // // // //         description: "Please sign in to join the meeting.",
// // // // //         variant: "destructive",
// // // // //       });
// // // // //       return;
// // // // //     }

// // // // //     if (!seminar?.meeting_id) {
// // // // //       toast({
// // // // //         title: "No Meeting",
// // // // //         description: "No meeting has been created for this seminar yet.",
// // // // //         variant: "destructive",
// // // // //       });
// // // // //       return;
// // // // //     }

// // // // //     setJoiningMeeting(true);
// // // // //     try {
// // // // //       const token = await generateToken();
// // // // //       setMeetingToken(token);
// // // // //       setMeetingId(seminar.meeting_id);
// // // // //     } catch (error) {
// // // // //       toast({
// // // // //         title: "Meeting Error",
// // // // //         description: "Failed to join meeting. Please try again.",
// // // // //         variant: "destructive",
// // // // //       });
// // // // //     } finally {
// // // // //       setJoiningMeeting(false);
// // // // //     }
// // // // //   };

// // // // //   const copyToClipboard = (text: string) => {
// // // // //     navigator.clipboard.writeText(text);
// // // // //     toast({
// // // // //       title: "Copied to Clipboard",
// // // // //       description: "Meeting link has been copied to your clipboard.",
// // // // //     });
// // // // //   };

// // // // //   const checkUser = async () => {
// // // // //     try {
// // // // //       const {
// // // // //         data: { session },
// // // // //       } = await supabase.auth.getSession();
// // // // //       setUser(session?.user || null);

// // // // //       if (session?.user && seminarId) {
// // // // //         checkRegistrationStatus(session.user.id);
// // // // //       }
// // // // //     } catch (error) {
// // // // //       console.error("Error checking user:", error);
// // // // //     }
// // // // //   };

// // // // //   const handleSignOut = async () => {
// // // // //     try {
// // // // //       const { error } = await supabase.auth.signOut();
// // // // //       if (error) throw error;
// // // // //       setUser(null);
// // // // //       toast({
// // // // //         title: "Signed Out",
// // // // //         description: "You have been successfully signed out.",
// // // // //       });
// // // // //     } catch (error) {
// // // // //       console.error("Sign out error:", error);
// // // // //       toast({
// // // // //         title: "Error",
// // // // //         description: "Failed to sign out. Please try again.",
// // // // //         variant: "destructive",
// // // // //       });
// // // // //     }
// // // // //   };

// // // // //   // const checkRegistrationStatus = async (userId: string) => {
// // // // //   //   try {
// // // // //   //     const { data, error } = await supabase
// // // // //   //       .from("seminar_registrations")
// // // // //   //       .select("id")
// // // // //   //       .eq("seminar_id", seminarId)
// // // // //   //       .eq("user_id", userId)
// // // // //   //       .single();

// // // // //   //     if (error && error.code) {
// // // // //   //       console.error("Error checking registration:", error);
// // // // //   //       return;
// // // // //   //     }

// // // // //   //     setIsRegistered(!!data);
// // // // //   //     if (data) {
// // // // //   //       setRegistrationId(data.id);
// // // // //   //     }
// // // // //   //   } catch (error) {
// // // // //   //     console.error("Error checking registration status:", error);
// // // // //   //   }
// // // // //   // };

// // // // //   // const fetchSeminarDetails = async () => {
// // // // //   //   setLoading(true);
// // // // //   //   try {
// // // // //   //     const { data: seminarData, error: seminarError } = await supabase
// // // // //   //       .from("seminars")
// // // // //   //       .select("*")
// // // // //   //       .eq("id", seminarId)
// // // // //   //       .single();

// // // // //   //     if (seminarError) throw seminarError;
// // // // //   //     setSeminar(seminarData);

// // // // //   //     if (seminarData?.meeting_id) {
// // // // //   //       setMeetingLink(
// // // // //   //         `${window.location.origin}/seminar/${seminarId}/meeting/${seminarData.meeting_id}`
// // // // //   //       );
// // // // //   //     }

// // // // //   //     const { data: speakersData, error: speakersError } = await supabase
// // // // //   //       .from("speakers")
// // // // //   //       .select("*")
// // // // //   //       .eq("seminar_id", seminarId);

// // // // //   //     if (speakersError) throw speakersError;
// // // // //   //     setSpeakers(speakersData || []);
// // // // //   //   } catch (error) {
// // // // //   //     console.error("Error fetching seminar details:", error);
// // // // //   //     toast({
// // // // //   //       title: "Error",
// // // // //   //       description: "Failed to load seminar details.",
// // // // //   //       variant: "destructive",
// // // // //   //     });
// // // // //   //   } finally {
// // // // //   //     setLoading(false);
// // // // //   //   }
// // // // //   // };

// // // // //   const fetchSeminarDetails = async () => {
// // // // //     setLoading(true);
// // // // //     try {
// // // // //       const { data: seminarDataRaw, error: seminarError } = await supabase
// // // // //         .from("seminars")
// // // // //         .select("*")
// // // // //         .eq("id", seminarId)
// // // // //         .single();

// // // // //       if (seminarError) throw seminarError;
// // // // //       const seminarData = seminarDataRaw as Seminar; // ✅ Cast to Seminar
// // // // //       setSeminar(seminarData);

// // // // //       if (seminarData?.meeting_id) {
// // // // //         setMeetingLink(
// // // // //           `${window.location.origin}/seminar/${seminarId}/meeting/${seminarData.meeting_id}`
// // // // //         );
// // // // //       }

// // // // //       const { data: speakersDataRaw, error: speakersError } = await supabase
// // // // //         .from("speakers")
// // // // //         .select("*")
// // // // //         .eq("seminar_id", seminarId);

// // // // //       if (speakersError) throw speakersError;
// // // // //       const speakersData = speakersDataRaw as Speaker[]; // ✅ Cast to Speaker[]
// // // // //       setSpeakers(speakersData || []);
// // // // //     } catch (error) {
// // // // //       console.error("Error fetching seminar details:", error);
// // // // //       toast({
// // // // //         title: "Error",
// // // // //         description: "Failed to load seminar details.",
// // // // //         variant: "destructive",
// // // // //       });
// // // // //     } finally {
// // // // //       setLoading(false);
// // // // //     }
// // // // //   };
// // // // //   const handleCancelRegistration = async () => {
// // // // //     if (!registrationId) return;

// // // // //     setCanceling(true);
// // // // //     try {
// // // // //       const { error } = await supabase
// // // // //         .from("seminar_registrations")
// // // // //         .delete()
// // // // //         .eq("id", registrationId);

// // // // //       if (error) throw error;

// // // // //       setIsRegistered(false);
// // // // //       setRegistrationId(null);
// // // // //       toast({
// // // // //         title: "Registration Cancelled",
// // // // //         description: "Your registration has been successfully cancelled.",
// // // // //       });
// // // // //     } catch (error) {
// // // // //       console.error("Error cancelling registration:", error);
// // // // //       toast({
// // // // //         title: "Cancellation Failed",
// // // // //         description: "Failed to cancel your registration. Please try again.",
// // // // //         variant: "destructive",
// // // // //       });
// // // // //     } finally {
// // // // //       setCanceling(false);
// // // // //     }
// // // // //   };

// // // // //   const handleRegister = async () => {
// // // // //     if (!user) {
// // // // //       toast({
// // // // //         title: "Authentication Required",
// // // // //         description: "Please sign in to register for this seminar.",
// // // // //         variant: "destructive",
// // // // //       });
// // // // //       return;
// // // // //     }

// // // // //     if (isRegistered) {
// // // // //       toast({
// // // // //         title: "Already Registered",
// // // // //         description: "You are already registered for this seminar.",
// // // // //       });
// // // // //       return;
// // // // //     }

// // // // //     setRegistering(true);
// // // // //     try {
// // // // //       const { error } = await supabase.from("seminar_registrations").insert({
// // // // //         seminar_id: seminarId!,
// // // // //         user_id: user.id,
// // // // //         payment_status: "completed",
// // // // //       });

// // // // //       if (error) throw error;

// // // // //       setIsRegistered(true);
// // // // //       toast({
// // // // //         title: "Registration Successful",
// // // // //         description: "You have been successfully registered for this seminar!",
// // // // //       });
// // // // //     } catch (error) {
// // // // //       console.error("Error registering for seminar:", error);
// // // // //       toast({
// // // // //         title: "Registration Failed",
// // // // //         description: "Failed to register for the seminar. Please try again.",
// // // // //         variant: "destructive",
// // // // //       });
// // // // //     } finally {
// // // // //       setRegistering(false);
// // // // //     }
// // // // //   };

// // // // //   const formatDate = (dateString: string) => {
// // // // //     return new Date(dateString).toLocaleDateString("en-US", {
// // // // //       weekday: "long",
// // // // //       year: "numeric",
// // // // //       month: "long",
// // // // //       day: "numeric",
// // // // //     });
// // // // //   };

// // // // //   const formatTime = (timeString: string) => {
// // // // //     return new Date(`1970-01-01T${timeString}`).toLocaleTimeString([], {
// // // // //       hour: "2-digit",
// // // // //       minute: "2-digit",
// // // // //     });
// // // // //   };

// // // // //   if (loading) {
// // // // //     return (
// // // // //       <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center">
// // // // //         <div className="text-center">
// // // // //           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
// // // // //           <p className="text-gray-600">Loading seminar details...</p>
// // // // //         </div>
// // // // //       </div>
// // // // //     );
// // // // //   }

// // // // //   if (!seminar) {
// // // // //     return (
// // // // //       <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center">
// // // // //         <div className="text-center">
// // // // //           <h1 className="text-2xl font-bold text-gray-900 mb-4">
// // // // //             Seminar Not Found
// // // // //           </h1>
// // // // //           <p className="text-gray-600 mb-4">
// // // // //             The seminar you're looking for doesn't exist.
// // // // //           </p>
// // // // //           <div className="flex gap-2 justify-center">
// // // // //             <Button onClick={handleBackNavigation}>
// // // // //               <ArrowLeft className="mr-2 h-4 w-4" />
// // // // //               Go Back
// // // // //             </Button>
// // // // //             <Button variant="outline" onClick={() => navigate("/")}>
// // // // //               <Home className="mr-2 h-4 w-4" />
// // // // //               Go Home
// // // // //             </Button>
// // // // //           </div>
// // // // //         </div>
// // // // //       </div>
// // // // //     );
// // // // //   }

// // // // //   return (
// // // // //     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
// // // // //       <header className="bg-black/30 backdrop-blur-md border-b border-white/20 sticky top-0 z-50 shadow-xl">
// // // // //         <div className="container mx-auto px-4 py-4">
// // // // //           <div className="flex items-center justify-between">
// // // // //             <div className="flex items-center space-x-4">
// // // // //               <Button
// // // // //                 variant="outline"
// // // // //                 onClick={handleBackNavigation}
// // // // //                 className="text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm"
// // // // //                 title="Go back"
// // // // //               >
// // // // //                 <ArrowLeft className="mr-2 h-4 w-4" />
// // // // //                 Back
// // // // //               </Button>
// // // // //               <Link to="/" className="flex items-center space-x-2">
// // // // //                 <Shield className="h-8 w-8 text-blue-400" />
// // // // //                 <h1 className="text-2xl font-bold text-white">MedPortal</h1>
// // // // //               </Link>
// // // // //             </div>
// // // // //             <div className="flex items-center space-x-4">
// // // // //               {user ? (
// // // // //                 <div className="flex items-center space-x-4">
// // // // //                   <span className="text-white text-sm bg-white/10 px-3 py-1 rounded-full">
// // // // //                     Welcome, {user.email}
// // // // //                   </span>
// // // // //                   <Button
// // // // //                     variant="outline"
// // // // //                     className="text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm"
// // // // //                     onClick={() => navigate("/profile")}
// // // // //                   >
// // // // //                     <UserIcon className="mr-2 h-4 w-4" />
// // // // //                     Profile
// // // // //                   </Button>
// // // // //                   <Button
// // // // //                     variant="outline"
// // // // //                     className="text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm"
// // // // //                     onClick={handleSignOut}
// // // // //                   >
// // // // //                     Sign Out
// // // // //                   </Button>
// // // // //                 </div>
// // // // //               ) : (
// // // // //                 <>
// // // // //                   <Link to="/register">
// // // // //                     <Button
// // // // //                       variant="outline"
// // // // //                       className="text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm"
// // // // //                     >
// // // // //                       Register
// // // // //                     </Button>
// // // // //                   </Link>
// // // // //                   <Link to="/">
// // // // //                     <Button className="bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl transition-all duration-200">
// // // // //                       <UserIcon className="mr-2 h-4 w-4" />
// // // // //                       Sign In
// // // // //                     </Button>
// // // // //                   </Link>
// // // // //                 </>
// // // // //               )}
// // // // //               <Button
// // // // //                 variant="outline"
// // // // //                 onClick={() => navigate("/")}
// // // // //                 className="text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm"
// // // // //                 title="Go to home page"
// // // // //               >
// // // // //                 <Home className="mr-2 h-4 w-4" />
// // // // //                 Home
// // // // //               </Button>
// // // // //             </div>
// // // // //           </div>
// // // // //         </div>
// // // // //       </header>

// // // // //       <div className="container mx-auto px-4 py-8 max-w-4xl">
// // // // //         <Card className="mb-8">
// // // // //           <CardHeader>
// // // // //             <div className="flex justify-between items-start">
// // // // //               <div>
// // // // //                 <CardTitle className="text-2xl mb-2">{seminar.topic}</CardTitle>
// // // // //                 <CardDescription className="text-lg">
// // // // //                   {seminar.description}
// // // // //                 </CardDescription>
// // // // //               </div>
// // // // //               {isRegistered && (
// // // // //                 <Badge variant="default" className="bg-green-500">
// // // // //                   <CheckCircle className="h-4 w-4 mr-1" />
// // // // //                   Registered
// // // // //                 </Badge>
// // // // //               )}
// // // // //             </div>
// // // // //           </CardHeader>
// // // // //           <CardContent className="space-y-6">
// // // // //             <div className="grid md:grid-cols-2 gap-6">
// // // // //               <div className="space-y-4">
// // // // //                 <div className="flex items-center gap-3">
// // // // //                   <UserIcon className="h-5 w-5 text-blue-600" />
// // // // //                   <div>
// // // // //                     <p className="font-medium">Host</p>
// // // // //                     <p className="text-gray-600">{seminar.host_name}</p>
// // // // //                   </div>
// // // // //                 </div>

// // // // //                 <div className="flex items-center gap-3">
// // // // //                   <CalendarDays className="h-5 w-5 text-blue-600" />
// // // // //                   <div>
// // // // //                     <p className="font-medium">Date</p>
// // // // //                     <p className="text-gray-600">{formatDate(seminar.date)}</p>
// // // // //                   </div>
// // // // //                 </div>

// // // // //                 <div className="flex items-center gap-3">
// // // // //                   <Clock className="h-5 w-5 text-blue-600" />
// // // // //                   <div>
// // // // //                     <p className="font-medium">Time</p>
// // // // //                     <p className="text-gray-600">{formatTime(seminar.time)}</p>
// // // // //                   </div>
// // // // //                 </div>
// // // // //               </div>

// // // // //               <div className="space-y-4">
// // // // //                 <div className="flex items-center gap-3">
// // // // //                   <Users className="h-5 w-5 text-blue-600" />
// // // // //                   <div>
// // // // //                     <p className="font-medium">Number of Speakers</p>
// // // // //                     <p className="text-gray-600">
// // // // //                       {speakers.length} speaker(s)
// // // // //                     </p>
// // // // //                   </div>
// // // // //                 </div>
// // // // //               </div>
// // // // //             </div>

// // // // //             {!isHost && (
// // // // //               <div className="flex justify-center pt-4">
// // // // //                 <Button
// // // // //                   onClick={handleRegister}
// // // // //                   disabled={registering || isRegistered}
// // // // //                   className="bg-blue-600 hover:bg-blue-700 px-8 py-3 text-lg"
// // // // //                 >
// // // // //                   {registering
// // // // //                     ? "Registering..."
// // // // //                     : isRegistered
// // // // //                     ? "Already Registered"
// // // // //                     : "Register for Seminar"}
// // // // //                 </Button>
// // // // //               </div>
// // // // //             )}
// // // // //           </CardContent>
// // // // //         </Card>

// // // // //         <Card>
// // // // //           <CardHeader>
// // // // //             <CardTitle>Speakers</CardTitle>
// // // // //             <CardDescription>
// // // // //               Meet the experts who will be presenting at this seminar
// // // // //             </CardDescription>
// // // // //           </CardHeader>
// // // // //           <CardContent>
// // // // //             {speakers.length === 0 ? (
// // // // //               <p className="text-gray-600 text-center py-8">
// // // // //                 No speakers added yet.
// // // // //               </p>
// // // // //             ) : (
// // // // //               <div className="grid md:grid-cols-2 gap-6">
// // // // //                 {speakers.map((speaker) => (
// // // // //                   <Card key={speaker.id}>
// // // // //                     <CardContent className="p-4">
// // // // //                       <h3 className="font-semibold text-lg mb-2">
// // // // //                         {speaker.name}
// // // // //                       </h3>
// // // // //                       <div className="space-y-1">
// // // // //                         <p className="text-sm text-gray-600">
// // // // //                           <span className="font-medium">Qualification:</span>{" "}
// // // // //                           {speaker.qualification}
// // // // //                         </p>
// // // // //                         <p className="text-sm text-gray-600">
// // // // //                           <span className="font-medium">Department:</span>{" "}
// // // // //                           {speaker.department}
// // // // //                         </p>
// // // // //                       </div>
// // // // //                     </CardContent>
// // // // //                   </Card>
// // // // //                 ))}
// // // // //               </div>
// // // // //             )}
// // // // //           </CardContent>
// // // // //         </Card>

// // // // //         <Card className="mt-8">
// // // // //           <CardHeader>
// // // // //             <CardTitle>Live Meeting</CardTitle>
// // // // //             <CardDescription>Join the live seminar session</CardDescription>
// // // // //           </CardHeader>
// // // // //           <CardContent>
// // // // //             {meetingId && meetingToken ? (
// // // // //               <MeetingProvider
// // // // //                 config={{
// // // // //                   meetingId: meetingId,
// // // // //                   name: user?.email || "Participant",
// // // // //                   micEnabled: true,
// // // // //                   webcamEnabled: true,
// // // // //                   participantId:
// // // // //                     user?.id ||
// // // // //                     `user-${Math.random().toString(36).substr(2, 9)}`,
// // // // //                   multiStream: false,
// // // // //                   debugMode: false,
// // // // //                 }}
// // // // //                 token={meetingToken}
// // // // //                 joinWithoutUserInteraction={true}
// // // // //               >
// // // // //                 <MeetingView />
// // // // //               </MeetingProvider>
// // // // //             ) : (
// // // // //               <div className="space-y-4">
// // // // //                 {isHost ? (
// // // // //                   <>
// // // // //                     {seminar.meeting_id ? (
// // // // //                       <div className="space-y-4">
// // // // //                         <div className="flex items-center gap-2">
// // // // //                           <Button
// // // // //                             onClick={handleJoinMeeting}
// // // // //                             disabled={joiningMeeting}
// // // // //                             className="bg-blue-600 hover:bg-blue-700 px-8 py-3 text-lg"
// // // // //                           >
// // // // //                             {joiningMeeting ? "Joining..." : "Start Meeting"}
// // // // //                           </Button>
// // // // //                         </div>
// // // // //                         {meetingLink && (
// // // // //                           <div className="bg-gray-100 p-4 rounded-lg">
// // // // //                             <p className="text-sm font-medium mb-2">
// // // // //                               Meeting Link (Share with participants):
// // // // //                             </p>
// // // // //                             <div className="flex items-center gap-2">
// // // // //                               <input
// // // // //                                 type="text"
// // // // //                                 value={meetingLink}
// // // // //                                 readOnly
// // // // //                                 className="flex-1 p-2 border rounded-lg"
// // // // //                               />
// // // // //                               <Button
// // // // //                                 variant="outline"
// // // // //                                 onClick={() => copyToClipboard(meetingLink)}
// // // // //                               >
// // // // //                                 <Copy className="h-4 w-4" />
// // // // //                               </Button>
// // // // //                             </div>
// // // // //                           </div>
// // // // //                         )}
// // // // //                       </div>
// // // // //                     ) : (
// // // // //                       <div className="text-center py-8">
// // // // //                         <Button
// // // // //                           onClick={handleHostMeeting}
// // // // //                           disabled={joiningMeeting}
// // // // //                           className="bg-blue-600 hover:bg-blue-700 px-8 py-3 text-lg"
// // // // //                         >
// // // // //                           {joiningMeeting ? "Creating..." : " Meeting"}
// // // // //                         </Button>
// // // // //                       </div>
// // // // //                     )}
// // // // //                   </>
// // // // //                 ) : (
// // // // //                   <div className="text-center py-8">
// // // // //                     {seminar.meeting_id ? (
// // // // //                       <Button
// // // // //                         onClick={handleJoinMeeting}
// // // // //                         disabled={joiningMeeting || !isRegistered}
// // // // //                         className="bg-blue-600 hover:bg-blue-700 px-8 py-3 text-lg"
// // // // //                       >
// // // // //                         {joiningMeeting ? "Joining..." : "Join"}
// // // // //                       </Button>
// // // // //                     ) : (
// // // // //                       <p className="text-gray-600">
// // // // //                         No meeting has been scheduled yet.
// // // // //                       </p>
// // // // //                     )}
// // // // //                     {!isRegistered && seminar.meeting_id && (
// // // // //                       <p className="text-sm text-gray-600 mt-2">
// // // // //                         You must register for the seminar before joining the
// // // // //                         meeting
// // // // //                       </p>
// // // // //                     )}
// // // // //                   </div>
// // // // //                 )}
// // // // //               </div>
// // // // //             )}
// // // // //           </CardContent>
// // // // //         </Card>
// // // // //       </div>
// // // // //     </div>
// // // // //   );
// // // // // };

// // // // // export default SeminarDetails;

// // // // import { useState, useEffect } from "react";
// // // // import { useParams, useNavigate, Link } from "react-router-dom";
// // // // import { Button } from "@/components/ui/button";
// // // // import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// // // // import { Badge } from "@/components/ui/badge";
// // // // import {
// // // //   ArrowLeft,
// // // //   User,
// // // //   Clock,
// // // //   CalendarDays,
// // // //   Users,
// // // //   CheckCircle,
// // // //   Home,
// // // //   Shield,
// // // //   Copy,
// // // //   Loader2,
// // // // } from "lucide-react";
// // // // import { supabase } from "@/integrations/supabase/client";
// // // // import { useToast } from "@/hooks/use-toast";
// // // // import type { User as AuthUser } from "@supabase/supabase-js";
// // // // import VideoMeeting from "../../components/VideoMeeting";
// // // // import ZoomHeader from "./zoomheader";

// // // // interface Seminar {
// // // //   id: string;
// // // //   host_name: string;
// // // //   topic: string;
// // // //   description: string;
// // // //   date: string;
// // // //   time: string;
// // // //   host_id: string;
// // // //   meeting_id?: string | null;
// // // // }

// // // // interface Speaker {
// // // //   id: string;
// // // //   name: string;
// // // //   qualification: string;
// // // //   department: string;
// // // // }

// // // // const SeminarDetails = () => {
// // // //   const { seminarId } = useParams();
// // // //   const navigate = useNavigate();
// // // //   const [seminar, setSeminar] = useState<Seminar | null>(null);
// // // //   const [speakers, setSpeakers] = useState<Speaker[]>([]);
// // // //   const [loading, setLoading] = useState(true);
// // // //   const [registering, setRegistering] = useState(false);
// // // //   const [isRegistered, setIsRegistered] = useState(false);
// // // //   const [user, setUser] = useState<AuthUser | null>(null);
// // // //   const { toast } = useToast();
// // // //   const [canceling, setCanceling] = useState(false);
// // // //   const [registrationId, setRegistrationId] = useState<string | null>(null);
// // // //   const [joiningMeeting, setJoiningMeeting] = useState(false);
// // // //   const [showMeeting, setShowMeeting] = useState(false);
// // // //   const isHost = user?.id === seminar?.host_id;
// // // //   const token = import.meta.env.VIDEOSDK_API_KEY;
// // // //   // const token = import.meta.env.VITE_VIDEOSDK_TOKEN;

// // // //   const handleBackNavigation = () => {
// // // //     navigate(-1);
// // // //   };

// // // //   useEffect(() => {
// // // //     const fetchData = async () => {
// // // //       try {
// // // //         // Get user session
// // // //         const {
// // // //           data: { session },
// // // //         } = await supabase.auth.getSession();
// // // //         setUser(session?.user || null);

// // // //         // Fetch seminar details
// // // //         const { data: seminarData, error: seminarError } = await supabase
// // // //           .from("seminars")
// // // //           .select("*")
// // // //           .eq("id", seminarId)
// // // //           .single();

// // // //         if (seminarError) throw seminarError;
// // // //         setSeminar(seminarData);

// // // //         // Fetch speakers
// // // //         const { data: speakersData, error: speakersError } = await supabase
// // // //           .from("speakers")
// // // //           .select("*")
// // // //           .eq("seminar_id", seminarId);

// // // //         if (speakersError) throw speakersError;
// // // //         setSpeakers(speakersData || []);

// // // //         // Check registration if user is logged in
// // // //         if (session?.user) {
// // // //           await checkRegistrationStatus(session.user.id);
// // // //         }
// // // //       } catch (error) {
// // // //         console.error("Error fetching data:", error);
// // // //         toast({
// // // //           title: "Error",
// // // //           description: "Failed to load seminar details",
// // // //           variant: "destructive",
// // // //         });
// // // //       } finally {
// // // //         setLoading(false);
// // // //       }
// // // //     };

// // // //     fetchData();
// // // //   }, [seminarId, toast]);

// // // //   const checkRegistrationStatus = async (userId: string) => {
// // // //     try {
// // // //       const { data, error } = await supabase
// // // //         .from("seminar_registrations")
// // // //         .select("id")
// // // //         .eq("seminar_id", seminarId)
// // // //         .eq("user_id", userId)
// // // //         .maybeSingle();

// // // //       if (error) throw error;
// // // //       setIsRegistered(!!data);
// // // //       if (data) setRegistrationId(data.id);
// // // //     } catch (error) {
// // // //       console.error("Error checking registration:", error);
// // // //     }
// // // //   };

// // // //   const handleJoinMeeting = () => {
// // // //     if (!seminar?.meeting_id) {
// // // //       toast({
// // // //         title: "No Meeting",
// // // //         description: "Meeting not available yet",
// // // //         variant: "destructive",
// // // //       });
// // // //       return;
// // // //     }

// // // //     setJoiningMeeting(true);
// // // //     setShowMeeting(true);
// // // //   };

// // // //   const handleLeaveMeeting = () => {
// // // //     setShowMeeting(false);
// // // //   };

// // // //   const handleRegister = async () => {
// // // //     if (!user || !seminarId) return;

// // // //     try {
// // // //       setRegistering(true);
// // // //       const { data, error } = await supabase
// // // //         .from("seminar_registrations")
// // // //         .insert({
// // // //           seminar_id: seminarId,
// // // //           user_id: user.id,
// // // //         })
// // // //         .select()
// // // //         .single();

// // // //       if (error) throw error;
// // // //       setIsRegistered(true);
// // // //       setRegistrationId(data.id);
// // // //       toast({
// // // //         title: "Registered",
// // // //         description: "You are now registered for this seminar",
// // // //       });
// // // //     } catch (error) {
// // // //       console.error("Registration Error:", error);
// // // //       toast({
// // // //         title: "Registration Failed",
// // // //         variant: "destructive",
// // // //       });
// // // //     } finally {
// // // //       setRegistering(false);
// // // //     }
// // // //   };

// // // //   const handleCancelRegistration = async () => {
// // // //     if (!registrationId) return;

// // // //     try {
// // // //       setCanceling(true);
// // // //       const { error } = await supabase
// // // //         .from("seminar_registrations")
// // // //         .delete()
// // // //         .eq("id", registrationId);

// // // //       if (error) throw error;
// // // //       setIsRegistered(false);
// // // //       setRegistrationId(null);
// // // //       toast({
// // // //         title: "Registration Cancelled",
// // // //       });
// // // //     } catch (error) {
// // // //       console.error("Cancellation Error:", error);
// // // //       toast({
// // // //         title: "Cancellation Failed",
// // // //         variant: "destructive",
// // // //       });
// // // //     } finally {
// // // //       setCanceling(false);
// // // //     }
// // // //   };

// // // //   const formatDate = (dateString: string) => {
// // // //     return new Date(dateString).toLocaleDateString("en-US", {
// // // //       weekday: "long",
// // // //       year: "numeric",
// // // //       month: "long",
// // // //       day: "numeric",
// // // //     });
// // // //   };

// // // //   const formatTime = (timeString: string) => {
// // // //     return new Date(`1970-01-01T${timeString}`).toLocaleTimeString([], {
// // // //       hour: "2-digit",
// // // //       minute: "2-digit",
// // // //     });
// // // //   };

// // // //   if (showMeeting && seminar?.meeting_id) {
// // // //     return (
// // // //       <VideoMeeting
// // // //         isHost={isHost}
// // // //         apiKey={token}
// // // //         // apiKey="8c81aa57-9868-417a-91c2-85006735bb62"
// // // //         meetingId={seminar.meeting_id}
// // // //         name={user?.email || "Participant"}
// // // //         onMeetingLeave={handleLeaveMeeting}
// // // //         micEnabled={true}
// // // //         webcamEnabled={true}
// // // //       />
// // // //     );
// // // //   }

// // // //   if (loading) {
// // // //     return (
// // // //       <div className="flex justify-center items-center h-screen">
// // // //         <Loader2 className="h-8 w-8 animate-spin" />
// // // //       </div>
// // // //     );
// // // //   }

// // // //   if (!seminar) {
// // // //     return (
// // // //       <div className="flex justify-center items-center h-screen">
// // // //         <p>Seminar not found</p>
// // // //       </div>
// // // //     );
// // // //   }

// // // //   return (
// // // //     <div className="min-h-screen bg-gray-50">
// // // //      <header className="bg-black/30 backdrop-blur-md border-b border-white/20 sticky top-0 z-50 shadow-xl">
// // // //            <div className="container mx-auto px-4 py-4">
// // // //              <div className="flex items-center justify-between">
// // // //                <div className="flex items-center space-x-4">
// // // //                  <Button
// // // //                    variant="outline"
// // // //                    onClick={handleBackNavigation}
// // // //                    className="text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm"
// // // //                    title="Go back"
// // // //                  >
// // // //                    <ArrowLeft className="mr-2 h-4 w-4" />
// // // //                    Back
// // // //                  </Button>
// // // //                  <Link to="/" className="flex items-center space-x-2">
// // // //                    <Shield className="h-8 w-8 text-blue-400" />
// // // //                    <h1 className="text-2xl font-bold text-white">MedPortal</h1>
// // // //                  </Link>
// // // //                  {meetingId && (
// // // //                    <div className="flex items-center space-x-2 ml-4">
// // // //                      <span className="text-white text-sm bg-white/10 px-3 py-1 rounded-full">
// // // //                        {isHost ? "Hosting" : "Joined"}
// // // //                      </span>
// // // //                      <Button
// // // //                        variant="ghost"
// // // //                        size="sm"
// // // //                        onClick={copyMeetingId}
// // // //                        className="text-white hover:bg-white/10"
// // // //                      >
// // // //                        <Copy className="h-4 w-4 mr-2" />
// // // //                        {meetingId}
// // // //                      </Button>
// // // //                    </div>
// // // //                  )}
// // // //                </div>
// // // //                <div className="flex items-center space-x-4">
// // // //                  {user ? (
// // // //                    <div className="flex items-center space-x-4">
// // // //                      <span className="text-white text-sm bg-white/10 px-3 py-1 rounded-full">
// // // //                        Welcome, {user.email}
// // // //                      </span>
// // // //                      <Button
// // // //                        variant="outline"
// // // //                        className="text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm"
// // // //                        onClick={onNavigateProfile}
// // // //                      >
// // // //                        <UserIcon className="mr-2 h-4 w-4" />
// // // //                        Profile
// // // //                      </Button>
// // // //                      {onLeave && (
// // // //                        <Button
// // // //                          variant="destructive"
// // // //                          onClick={onLeave}
// // // //                          className="hover:bg-red-700"
// // // //                        >
// // // //                          Leave Meeting
// // // //                        </Button>
// // // //                      )}
// // // //                    </div>
// // // //                  ) : (
// // // //                    <>
// // // //                      <Link to="/register">
// // // //                        <Button
// // // //                          variant="outline"
// // // //                          className="text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm"
// // // //                        >
// // // //                          Register
// // // //                        </Button>
// // // //                      </Link>
// // // //                      <Link to="/">
// // // //                        <Button className="bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl transition-all duration-200">
// // // //                          <UserIcon className="mr-2 h-4 w-4" />
// // // //                          Sign In
// // // //                        </Button>
// // // //                      </Link>
// // // //                    </>
// // // //                  )}
// // // //                  <Button
// // // //                    variant="outline"
// // // //                    onClick={onNavigateHome}
// // // //                    className="text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm"
// // // //                    title="Go to home page"
// // // //                  >
// // // //                    <Home className="mr-2 h-4 w-4" />
// // // //                    Home
// // // //                  </Button>
// // // //                </div>
// // // //              </div>
// // // //            </div>
// // // //          </header>

// // // //       <div className="container mx-auto px-4 py-8 max-w-4xl">
// // // //         <Card className="mb-8">
// // // //           <CardHeader>
// // // //             <div className="flex justify-between items-start">
// // // //               <div>
// // // //                 <CardTitle className="text-2xl mb-2">{seminar.topic}</CardTitle>
// // // //                 <p className="text-gray-600">{seminar.description}</p>
// // // //               </div>
// // // //               {isRegistered && (
// // // //                 <Badge variant="default" className="bg-green-500">
// // // //                   <CheckCircle className="h-4 w-4 mr-1" />
// // // //                   Registered
// // // //                 </Badge>
// // // //               )}
// // // //             </div>
// // // //           </CardHeader>
// // // //           <CardContent className="space-y-6">
// // // //             <div className="grid md:grid-cols-2 gap-6">
// // // //               <div className="space-y-4">
// // // //                 <div className="flex items-center gap-3">
// // // //                   <User className="h-5 w-5 text-blue-600" />
// // // //                   <div>
// // // //                     <p className="font-medium">Host</p>
// // // //                     <p className="text-gray-600">{seminar.host_name}</p>
// // // //                   </div>
// // // //                 </div>

// // // //                 <div className="flex items-center gap-3">
// // // //                   <CalendarDays className="h-5 w-5 text-blue-600" />
// // // //                   <div>
// // // //                     <p className="font-medium">Date</p>
// // // //                     <p className="text-gray-600">{formatDate(seminar.date)}</p>
// // // //                   </div>
// // // //                 </div>

// // // //                 <div className="flex items-center gap-3">
// // // //                   <Clock className="h-5 w-5 text-blue-600" />
// // // //                   <div>
// // // //                     <p className="font-medium">Time</p>
// // // //                     <p className="text-gray-600">{formatTime(seminar.time)}</p>
// // // //                   </div>
// // // //                 </div>
// // // //               </div>

// // // //               <div className="space-y-4">
// // // //                 <div className="flex items-center gap-3">
// // // //                   <Users className="h-5 w-5 text-blue-600" />
// // // //                   <div>
// // // //                     <p className="font-medium">Speakers</p>
// // // //                     <p className="text-gray-600">
// // // //                       {speakers.length} speaker(s)
// // // //                     </p>
// // // //                   </div>
// // // //                 </div>
// // // //               </div>
// // // //             </div>

// // // //             {!isHost && (
// // // //               <div className="flex justify-center pt-4">
// // // //                 <Button
// // // //                   onClick={
// // // //                     isRegistered ? handleCancelRegistration : handleRegister
// // // //                   }
// // // //                   disabled={registering || canceling}
// // // //                   className="bg-blue-600 hover:bg-blue-700 px-8 py-3 text-lg"
// // // //                 >
// // // //                   {registering
// // // //                     ? "Registering..."
// // // //                     : canceling
// // // //                     ? "Cancelling..."
// // // //                     : isRegistered
// // // //                     ? "Cancel Registration"
// // // //                     : "Register for Seminar"}
// // // //                 </Button>
// // // //               </div>
// // // //             )}
// // // //           </CardContent>
// // // //         </Card>

// // // //         <Card>
// // // //           <CardHeader>
// // // //             <CardTitle>Speakers</CardTitle>
// // // //             <p className="text-gray-600">
// // // //               Meet the experts who will be presenting at this seminar
// // // //             </p>
// // // //           </CardHeader>
// // // //           <CardContent>
// // // //             {speakers.length === 0 ? (
// // // //               <p className="text-gray-600 text-center py-8">
// // // //                 No speakers added yet.
// // // //               </p>
// // // //             ) : (
// // // //               <div className="grid md:grid-cols-2 gap-6">
// // // //                 {speakers.map((speaker) => (
// // // //                   <Card key={speaker.id}>
// // // //                     <CardContent className="p-4">
// // // //                       <h3 className="font-semibold text-lg mb-2">
// // // //                         {speaker.name}
// // // //                       </h3>
// // // //                       <div className="space-y-1">
// // // //                         <p className="text-sm text-gray-600">
// // // //                           <span className="font-medium">Qualification:</span>{" "}
// // // //                           {speaker.qualification}
// // // //                         </p>
// // // //                         <p className="text-sm text-gray-600">
// // // //                           <span className="font-medium">Department:</span>{" "}
// // // //                           {speaker.department}
// // // //                         </p>
// // // //                       </div>
// // // //                     </CardContent>
// // // //                   </Card>
// // // //                 ))}
// // // //               </div>
// // // //             )}
// // // //           </CardContent>
// // // //         </Card>

// // // //         <Card className="mt-8">
// // // //           <CardHeader>
// // // //             <CardTitle>Live Meeting</CardTitle>
// // // //             <p className="text-gray-600">Join the live seminar session</p>
// // // //           </CardHeader>
// // // //           <CardContent>
// // // //             <div className="space-y-4">
// // // //               {seminar.meeting_id ? (
// // // //                 <div className="text-center py-4">
// // // //                   <Button
// // // //                     onClick={handleJoinMeeting}
// // // //                     disabled={joiningMeeting || (!isHost && !isRegistered)}
// // // //                     className="bg-blue-600 hover:bg-blue-700 px-8 py-3 text-lg"
// // // //                   >
// // // //                     {joiningMeeting
// // // //                       ? "Joining..."
// // // //                       : isHost
// // // //                       ? "Start Meeting"
// // // //                       : "Join Meeting"}
// // // //                   </Button>
// // // //                   {!isRegistered && !isHost && (
// // // //                     <p className="text-sm text-gray-600 mt-2">
// // // //                       You must register for the seminar before joining the
// // // //                       meeting
// // // //                     </p>
// // // //                   )}
// // // //                 </div>
// // // //               ) : (
// // // //                 <p className="text-gray-600 text-center py-8">
// // // //                   No meeting has been scheduled yet.
// // // //                 </p>
// // // //               )}
// // // //             </div>
// // // //           </CardContent>
// // // //         </Card>
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // };

// // // // export default SeminarDetails;


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
// // // } from "lucide-react";
// // // import { supabase } from "@/integrations/supabase/client";
// // // import { useToast } from "@/hooks/use-toast";
// // // import type { User as AuthUser } from "@supabase/supabase-js";
// // // import VideoMeeting from "../../components/VideoMeeting";

// // // interface Seminar {
// // //   id: string;
// // //   host_name: string;
// // //   topic: string;
// // //   description: string;
// // //   date: string;
// // //   time: string;
// // //   host_id: string;
// // //   meeting_id?: string | null;
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
// // //   const [joiningMeeting, setJoiningMeeting] = useState(false);
// // //   const [showMeeting, setShowMeeting] = useState(false);
// // //   const isHost = user?.id === seminar?.host_id;
// // //   const token = import.meta.env.VIDEOSDK_API_KEY;

// // //   const handleBackNavigation = () => {
// // //     navigate(-1);
// // //   };

// // //   const copyMeetingId = () => {
// // //     console.log("fffffffffffff", seminar?.meeting_id);
// // //     if (seminar?.meeting_id) {
// // //       navigator.clipboard.writeText(seminar.meeting_id);
// // //       toast({
// // //         title: "Copied",
// // //         description: "Meeting ID copied to clipboard",
// // //       });
// // //     }
// // //   };

// // //   const onNavigateProfile = () => {
// // //     navigate("/profile");
// // //   };

// // //   const onNavigateHome = () => {
// // //     navigate("/");
// // //   };

// // //   useEffect(() => {
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

// // //         if (seminarError) throw seminarError;
// // //         setSeminar(seminarData);

// // //         // Fetch speakers
// // //         const { data: speakersData, error: speakersError } = await supabase
// // //           .from("speakers")
// // //           .select("*")
// // //           .eq("seminar_id", seminarId);

// // //         if (speakersError) throw speakersError;
// // //         setSpeakers(speakersData || []);

// // //         // Check registration if user is logged in
// // //         if (session?.user) {
// // //           await checkRegistrationStatus(session.user.id);
// // //         }
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

// // //       if (error) throw error;
// // //       setIsRegistered(!!data);
// // //       if (data) setRegistrationId(data.id);
// // //     } catch (error) {
// // //       console.error("Error checking registration:", error);
// // //     }
// // //   };

// // //   const handleJoinMeeting = () => {
// // //     console.log("nnnnnnnnnnnn", !seminar?.meeting_id);
// // //     if (!seminar?.meeting_id) {
// // //       toast({
// // //         title: "No Meeting",
// // //         description: "Meeting not available yet",
// // //         variant: "destructive",
// // //       });
// // //       return;
// // //     }
// // //     if (!isHost && !isRegistered) {
// // //       toast({
// // //         title: "Registration Required",
// // //         description: "You must register for the seminar before joining",
// // //         variant: "destructive",
// // //       });
// // //       return;
// // //     }

// // //     setJoiningMeeting(true);
// // //     setShowMeeting(true);
// // //   };

// // //   const handleLeaveMeeting = () => {
// // //     setShowMeeting(false);
// // //   };

// // //   const handleRegister = async () => {
// // //     if (!user || !seminarId) return;

// // //     try {
// // //       setRegistering(true);
// // //       const { data, error } = await supabase
// // //         .from("seminar_registrations")
// // //         .insert({
// // //           seminar_id: seminarId,
// // //           user_id: user.id,
// // //         })
// // //         .select()
// // //         .single();

// // //       if (error) throw error;
// // //       setIsRegistered(true);
// // //       setRegistrationId(data.id);
// // //       toast({
// // //         title: "Registered",
// // //         description: "You are now registered for this seminar",
// // //       });
// // //     } catch (error) {
// // //       console.error("Registration Error:", error);
// // //       toast({
// // //         title: "Registration Failed",
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

// // //   if (showMeeting && seminar?.meeting_id) {
// // //     return (
// // //       <VideoMeeting
// // //         isHost={isHost}
// // //         apiKey="8c81aa57-9868-417a-91c2-85006735bb62"
// // //         // apiKey={token}
// // //         meetingId={seminar.meeting_id}
// // //         name={user?.email || "Participant"}
// // //         onMeetingLeave={handleLeaveMeeting}
// // //         micEnabled={false}
// // //         webcamEnabled={false}
// // //       />
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
// // //       <header className="bg-black/30 backdrop-blur-md border-b border-white/20 sticky top-0 z-50 shadow-xl">
// // //         <div className="container mx-auto px-4 py-4">
// // //           <div className="flex items-center justify-between">
// // //             <div className="flex items-center space-x-4">
// // //               <Button
// // //                 variant="outline"
// // //                 onClick={handleBackNavigation}
// // //                 className="text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm"
// // //                 title="Go back"
// // //               >
// // //                 <ArrowLeft className="mr-2 h-4 w-4" />
// // //                 Back
// // //               </Button>
// // //               <Link to="/" className="flex items-center space-x-2">
// // //                 <Shield className="h-8 w-8 text-blue-400" />
// // //                 <h1 className="text-2xl font-bold text-white">MedPortal</h1>
// // //               </Link>
// // //               {seminar.meeting_id && (
// // //                 <div className="flex items-center space-x-2 ml-4">
// // //                   <span className="text-white text-sm bg-white/10 px-3 py-1 rounded-full">
// // //                     {isHost ? "Hosting" : "Joined"}
// // //                   </span>
// // //                   <Button
// // //                     variant="ghost"
// // //                     size="sm"
// // //                     onClick={copyMeetingId}
// // //                     className="text-white hover:bg-white/10"
// // //                   >
// // //                     <Copy className="h-4 w-4 mr-2" />
// // //                     {seminar.meeting_id}
// // //                   </Button>
// // //                 </div>
// // //               )}
// // //             </div>
// // //             <div className="flex items-center space-x-4">
// // //               {user ? (
// // //                 <div className="flex items-center space-x-4">
// // //                   <span className="text-white text-sm bg-white/10 px-3 py-1 rounded-full">
// // //                     Welcome, {user.email}
// // //                   </span>
// // //                   <Button
// // //                     variant="outline"
// // //                     className="text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm"
// // //                     onClick={onNavigateProfile}
// // //                   >
// // //                     <User className="mr-2 h-4 w-4" />
// // //                     Profile
// // //                   </Button>
// // //                   {showMeeting && (
// // //                     <Button
// // //                       variant="destructive"
// // //                       onClick={handleLeaveMeeting}
// // //                       className="hover:bg-red-700"
// // //                     >
// // //                       Leave Meeting
// // //                     </Button>
// // //                   )}
// // //                 </div>
// // //               ) : (
// // //                 <>
// // //                   <Link to="/register">
// // //                     <Button
// // //                       variant="outline"
// // //                       className="text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm"
// // //                     >
// // //                       Register
// // //                     </Button>
// // //                   </Link>
// // //                   <Link to="/">
// // //                     <Button className="bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl transition-all duration-200">
// // //                       <User className="mr-2 h-4 w-4" />
// // //                       Sign In
// // //                     </Button>
// // //                   </Link>
// // //                 </>
// // //               )}
// // //               <Button
// // //                 variant="outline"
// // //                 onClick={onNavigateHome}
// // //                 className="text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm"
// // //                 title="Go to home page"
// // //               >
// // //                 <Home className="mr-2 h-4 w-4" />
// // //                 Home
// // //               </Button>
// // //             </div>
// // //           </div>
// // //         </div>
// // //       </header>

// // //       <div className="container mx-auto px-4 py-8 max-w-4xl">
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
// // //               </div>
// // //             </div>

// // //             {!isHost && (
// // //               <div className="flex justify-center pt-4">
// // //                 <Button
// // //                   onClick={
// // //                     isRegistered ? handleCancelRegistration : handleRegister
// // //                   }
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
// // //           <CardContent>
// // //             <div className="space-y-4">
// // //               {seminar.meeting_id ? (
// // //                 <div className="text-center py-4">
                  
// // //                   <Button
// // //                     onClick={handleJoinMeeting}
// // //                     disabled={joiningMeeting}
// // //                     className="bg-blue-600 hover:bg-blue-700 px-8 py-3 text-lg"
// // //                   >
// // //                     {joiningMeeting
// // //                       ? "Joining..."
// // //                       : isHost
// // //                       ? "Start Meeting"
// // //                       : "Join Meeting"}
// // //                   </Button>
// // //                   {!isRegistered && !isHost && (
// // //                     <p className="text-sm text-gray-600 mt-2">
// // //                       You must register for the seminar before joining the
// // //                       meeting
// // //                     </p>
// // //                   )}
// // //                 </div>
// // //               ) : (
// // //                 <p className="text-gray-600 text-center py-8">
// // //                   No meeting has been scheduled yet.
// // //                 </p>
// // //               )}
// // //             </div>
// // //           </CardContent>
// // //         </Card>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default SeminarDetails;

// // import { useState, useEffect } from "react";
// // import { useParams, useNavigate, Link } from "react-router-dom";
// // import { Button } from "@/components/ui/button";
// // import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// // import { Badge } from "@/components/ui/badge";
// // import {
// //   ArrowLeft,
// //   User,
// //   Clock,
// //   CalendarDays,
// //   Users,
// //   CheckCircle,
// //   Home,
// //   Shield,
// //   Copy,
// //   Loader2,
// //   Video,
// // } from "lucide-react";
// // import { supabase } from "@/integrations/supabase/client";
// // import { useToast } from "@/hooks/use-toast";
// // import type { User as AuthUser } from "@supabase/supabase-js";
// // import VideoMeeting from "../../components/VideoMeeting";

// // interface Seminar {
// //   id: string;
// //   host_name: string;
// //   topic: string;
// //   description: string;
// //   date: string;
// //   time: string;
// //   host_id: string;
// //   meeting_id?: string | null;
// // }

// // interface Speaker {
// //   id: string;
// //   name: string;
// //   qualification: string;
// //   department: string;
// // }

// // const SeminarDetails = () => {
// //   const { seminarId } = useParams();
// //   const navigate = useNavigate();
// //   const [seminar, setSeminar] = useState<Seminar | null>(null);
// //   const [speakers, setSpeakers] = useState<Speaker[]>([]);
// //   const [loading, setLoading] = useState(true);
// //   const [registering, setRegistering] = useState(false);
// //   const [isRegistered, setIsRegistered] = useState(false);
// //   const [user, setUser] = useState<AuthUser | null>(null);
// //   const { toast } = useToast();
// //   const [canceling, setCanceling] = useState(false);
// //   const [registrationId, setRegistrationId] = useState<string | null>(null);
// //   const [showMeeting, setShowMeeting] = useState(false);
// //   const isHost = user?.id === seminar?.host_id;

// //   const handleBackNavigation = () => {
// //     navigate(-1);
// //   };

// //   const copyMeetingId = () => {
// //     console.log("ssssssssss", seminar.meeting_id);
// //     if (seminar?.meeting_id) {
// //       navigator.clipboard.writeText(seminar.meeting_id);
// //       toast({
// //         title: "Copied",
// //         description: "Meeting ID copied to clipboard",
// //       });
// //     }
// //   };

// //   const onNavigateProfile = () => {
// //     navigate("/profile");
// //   };

// //   const onNavigateHome = () => {
// //     navigate("/");
// //   };

// //   useEffect(() => {
// //     console.log("kkkkkkkkkkkk",seminarId)
// //     const fetchData = async () => {
// //       try {
// //         // Get user session
// //         const {
// //           data: { session },
// //         } = await supabase.auth.getSession();
// //         setUser(session?.user || null);

// //         // Fetch seminar details
// //         const { data: seminarData, error: seminarError } = await supabase
// //           .from("seminars")
// //           .select("*")
// //           .eq("id", seminarId)
// //           .single();

// //         if (seminarError) throw seminarError;
// //         setSeminar(seminarData);

// //         // Fetch speakers
// //         const { data: speakersData, error: speakersError } = await supabase
// //           .from("speakers")
// //           .select("*")
// //           .eq("seminar_id", seminarId);

// //         if (speakersError) throw speakersError;
// //         setSpeakers(speakersData || []);

// //         // Check registration if user is logged in
// //         if (session?.user) {
// //           await checkRegistrationStatus(session.user.id);
// //         }
// //       } catch (error) {
// //         console.error("Error fetching data:", error);
// //         toast({
// //           title: "Error",
// //           description: "Failed to load seminar details",
// //           variant: "destructive",
// //         });
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchData();
// //   }, [seminarId, toast]);

// //   const checkRegistrationStatus = async (userId: string) => {
// //     console.log("kkkkkkkkkkkk1111111111",seminarId,userId);
// //     try {
// //       const { data, error } = await supabase
// //         .from("seminar_registrations")
// //         .select("id")
// //         .eq("seminar_id", seminarId)
// //         .eq("user_id", userId)
// //         .maybeSingle();

// //       if (error) throw error;
// //       setIsRegistered(!!data);
// //       if (data) setRegistrationId(data.id);
// //     } catch (error) {
// //       console.error("Error checking registration:", error);
// //     }
// //   };

// //   const handleJoinMeeting = () => {
// //     console.log("kkkkkkkkkkkk2222222222", seminar.meeting_id);
// //     if (!seminar?.meeting_id) {
// //       toast({
// //         title: "No Meeting",
// //         description: "Meeting not available yet",
// //         variant: "destructive",
// //       });
// //       return;
// //     }
    
// //     if (!isHost && !isRegistered) {
// //       toast({
// //         title: "Registration Required",
// //         description: "You must register for the seminar before joining",
// //         variant: "destructive",
// //       });
// //       return;
// //     }

// //     setShowMeeting(true);
// //   };

// //   const handleLeaveMeeting = () => {
// //     console.log("kkkkkkkkkkkk");
// //     setShowMeeting(false);
// //   };

// //   const handleRegister = async () => {
// //     console.log("cccccccccccc",seminarId)
// //     if (!user || !seminarId) return;

// //     try {
// //       setRegistering(true);
// //       const { data, error } = await supabase
// //         .from("seminar_registrations")
// //         .insert({
// //           seminar_id: seminarId,
// //           user_id: user.id,
// //         })
// //         .select()
// //         .single();

// //       if (error) throw error;
// //       setIsRegistered(true);
// //       setRegistrationId(data.id);
// //       toast({
// //         title: "Registered",
// //         description: "You are now registered for this seminar",
// //       });
// //     } catch (error) {
// //       console.error("Registration Error:", error);
// //       toast({
// //         title: "Registration Failed",
// //         variant: "destructive",
// //       });
// //     } finally {
// //       setRegistering(false);
// //     }
// //   };

// //   const handleCancelRegistration = async () => {
// //     if (!registrationId) return;

// //     try {
// //       setCanceling(true);
// //       const { error } = await supabase
// //         .from("seminar_registrations")
// //         .delete()
// //         .eq("id", registrationId);

// //       if (error) throw error;
// //       setIsRegistered(false);
// //       setRegistrationId(null);
// //       toast({
// //         title: "Registration Cancelled",
// //       });
// //     } catch (error) {
// //       console.error("Cancellation Error:", error);
// //       toast({
// //         title: "Cancellation Failed",
// //         variant: "destructive",
// //       });
// //     } finally {
// //       setCanceling(false);
// //     }
// //   };

// //   const formatDate = (dateString: string) => {
// //     return new Date(dateString).toLocaleDateString("en-US", {
// //       weekday: "long",
// //       year: "numeric",
// //       month: "long",
// //       day: "numeric",
// //     });
// //   };

// //   const formatTime = (timeString: string) => {
// //     return new Date(`1970-01-01T${timeString}`).toLocaleTimeString([], {
// //       hour: "2-digit",
// //       minute: "2-digit",
// //     });
// //   };

// //   if (showMeeting && seminar?.meeting_id) {
// //     console.log("ggggggggggggggggggg", seminar.meeting_id);
// //     console.log("jjjjjjjjjjjjjjjjjj", "8c81aa57-9868-417a-91c2-85006735bb62");
// //     return (
// //       <VideoMeeting
// //         isHost={isHost}
// //         apiKey="8c81aa57-9868-417a-91c2-85006735bb62"
// //         meetingId={seminar.meeting_id}
// //         name={user?.email || "Participant"}
// //         onMeetingLeave={handleLeaveMeeting}
// //         micEnabled={true}
// //         webcamEnabled={true}
// //       />
// //     );
// //   }

// //   if (loading) {
// //     return (
// //       <div className="flex justify-center items-center h-screen">
// //         <Loader2 className="h-8 w-8 animate-spin" />
// //       </div>
// //     );
// //   }

// //   if (!seminar) {
// //     return (
// //       <div className="flex justify-center items-center h-screen">
// //         <p>Seminar not found</p>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="min-h-screen bg-gray-50">
// //       <header className="bg-black/30 backdrop-blur-md border-b border-white/20 sticky top-0 z-50 shadow-xl">
// //         <div className="container mx-auto px-4 py-4">
// //           <div className="flex items-center justify-between">
// //             <div className="flex items-center space-x-4">
// //               <Button
// //                 variant="outline"
// //                 onClick={handleBackNavigation}
// //                 className="text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm"
// //                 title="Go back"
// //               >
// //                 <ArrowLeft className="mr-2 h-4 w-4" />
// //                 Back
// //               </Button>
// //               <Link to="/" className="flex items-center space-x-2">
// //                 <Shield className="h-8 w-8 text-blue-400" />
// //                 <h1 className="text-2xl font-bold text-white">MedPortal</h1>
// //               </Link>
// //               {seminar.meeting_id && (
// //                 <div className="flex items-center space-x-2 ml-4">
// //                   <span className="text-white text-sm bg-white/10 px-3 py-1 rounded-full">
// //                     {isHost ? "Hosting" : "Joined"}
// //                   </span>
// //                   <Button
// //                     variant="ghost"
// //                     size="sm"
// //                     onClick={copyMeetingId}
// //                     className="text-white hover:bg-white/10"
// //                   >
// //                     <Copy className="h-4 w-4 mr-2" />
// //                     {seminar.meeting_id}
// //                   </Button>
// //                 </div>
// //               )}
// //             </div>
// //             <div className="flex items-center space-x-4">
// //               {user ? (
// //                 <div className="flex items-center space-x-4">
// //                   <span className="text-white text-sm bg-white/10 px-3 py-1 rounded-full">
// //                     Welcome, {user.email}
// //                   </span>
// //                   <Button
// //                     variant="outline"
// //                     className="text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm"
// //                     onClick={onNavigateProfile}
// //                   >
// //                     <User className="mr-2 h-4 w-4" />
// //                     Profile
// //                   </Button>
// //                 </div>
// //               ) : (
// //                 <>
// //                   <Link to="/register">
// //                     <Button
// //                       variant="outline"
// //                       className="text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm"
// //                     >
// //                       Register
// //                     </Button>
// //                   </Link>
// //                   <Link to="/">
// //                     <Button className="bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl transition-all duration-200">
// //                       <User className="mr-2 h-4 w-4" />
// //                       Sign In
// //                     </Button>
// //                   </Link>
// //                 </>
// //               )}
// //               <Button
// //                 variant="outline"
// //                 onClick={onNavigateHome}
// //                 className="text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm"
// //                 title="Go to home page"
// //               >
// //                 <Home className="mr-2 h-4 w-4" />
// //                 Home
// //               </Button>
// //             </div>
// //           </div>
// //         </div>
// //       </header>

// //       <div className="container mx-auto px-4 py-8 max-w-4xl">
// //         <Card className="mb-8">
// //           <CardHeader>
// //             <div className="flex justify-between items-start">
// //               <div>
// //                 <CardTitle className="text-2xl mb-2">{seminar.topic}</CardTitle>
// //                 <p className="text-gray-600">{seminar.description}</p>
// //               </div>
// //               {isRegistered && (
// //                 <Badge variant="default" className="bg-green-500">
// //                   <CheckCircle className="h-4 w-4 mr-1" />
// //                   Registered
// //                 </Badge>
// //               )}
// //             </div>
// //           </CardHeader>
// //           <CardContent className="space-y-6">
// //             <div className="grid md:grid-cols-2 gap-6">
// //               <div className="space-y-4">
// //                 <div className="flex items-center gap-3">
// //                   <User className="h-5 w-5 text-blue-600" />
// //                   <div>
// //                     <p className="font-medium">Host</p>
// //                     <p className="text-gray-600">{seminar.host_name}</p>
// //                   </div>
// //                 </div>

// //                 <div className="flex items-center gap-3">
// //                   <CalendarDays className="h-5 w-5 text-blue-600" />
// //                   <div>
// //                     <p className="font-medium">Date</p>
// //                     <p className="text-gray-600">{formatDate(seminar.date)}</p>
// //                   </div>
// //                 </div>

// //                 <div className="flex items-center gap-3">
// //                   <Clock className="h-5 w-5 text-blue-600" />
// //                   <div>
// //                     <p className="font-medium">Time</p>
// //                     <p className="text-gray-600">{formatTime(seminar.time)}</p>
// //                   </div>
// //                 </div>
// //               </div>

// //               <div className="space-y-4">
// //                 <div className="flex items-center gap-3">
// //                   <Users className="h-5 w-5 text-blue-600" />
// //                   <div>
// //                     <p className="font-medium">Speakers</p>
// //                     <p className="text-gray-600">
// //                       {speakers.length} speaker(s)
// //                     </p>
// //                   </div>
// //                 </div>
// //               </div>
// //             </div>

// //             {!isHost && (
// //               <div className="flex justify-center pt-4">
// //                 <Button
// //                   onClick={
// //                     isRegistered ? handleCancelRegistration : handleRegister
// //                   }
// //                   disabled={registering || canceling}
// //                   className="bg-blue-600 hover:bg-blue-700 px-8 py-3 text-lg"
// //                 >
// //                   {registering
// //                     ? "Registering..."
// //                     : canceling
// //                     ? "Cancelling..."
// //                     : isRegistered
// //                     ? "Cancel Registration"
// //                     : "Register for Seminar"}
// //                 </Button>
// //               </div>
// //             )}
// //           </CardContent>
// //         </Card>

// //         <Card>
// //           <CardHeader>
// //             <CardTitle>Speakers</CardTitle>
// //             <p className="text-gray-600">
// //               Meet the experts who will be presenting at this seminar
// //             </p>
// //           </CardHeader>
// //           <CardContent>
// //             {speakers.length === 0 ? (
// //               <p className="text-gray-600 text-center py-8">
// //                 No speakers added yet.
// //               </p>
// //             ) : (
// //               <div className="grid md:grid-cols-2 gap-6">
// //                 {speakers.map((speaker) => (
// //                   <Card key={speaker.id}>
// //                     <CardContent className="p-4">
// //                       <h3 className="font-semibold text-lg mb-2">
// //                         {speaker.name}
// //                       </h3>
// //                       <div className="space-y-1">
// //                         <p className="text-sm text-gray-600">
// //                           <span className="font-medium">Qualification:</span>{" "}
// //                           {speaker.qualification}
// //                         </p>
// //                         <p className="text-sm text-gray-600">
// //                           <span className="font-medium">Department:</span>{" "}
// //                           {speaker.department}
// //                         </p>
// //                       </div>
// //                     </CardContent>
// //                   </Card>
// //                 ))}
// //               </div>
// //             )}
// //           </CardContent>
// //         </Card>

// //         <Card className="mt-8">
// //           <CardHeader>
// //             <CardTitle>Live Meeting</CardTitle>
// //             <p className="text-gray-600">Join the live seminar session</p>
// //           </CardHeader>
// //           {/* <CardContent>
// //             <div className="space-y-4">
// //               {seminar.meeting_id ? (
// //                 <div className="text-center py-4">
// //                   <Button
// //                     onClick={handleJoinMeeting}
// //                     className="bg-blue-600 hover:bg-blue-700 px-8 py-3 text-lg"
// //                   >
// //                     {isHost ? "Start Meeting as Host" : "Join Meeting"}
// //                   </Button>
// //                   {!isRegistered && !isHost && (
// //                     <p className="text-sm text-gray-600 mt-2">
// //                       You must register for the seminar before joining the
// //                       meeting
// //                     </p>
// //                   )}
// //                 </div>
// //               ) : (
// //                 <p className="text-gray-600 text-center py-8">
// //                   No meeting has been scheduled yet.
// //                 </p>
// //               )}
// //             </div>
// //           </CardContent> */}
// //           <CardContent>
// //   <div className="space-y-4">
// //     {seminar.meeting_id ? (
// //       <div className="text-center py-4 space-y-4">
// //         <div className="flex justify-center items-center gap-2">
// //           <Button
// //             onClick={handleJoinMeeting}
// //             className="bg-blue-600 hover:bg-blue-700 px-8 py-3 text-lg"
// //           >
// //             {isHost ? "Start Meeting as Host" : "Join Meeting"}
// //           </Button>
// //           {isHost && (
// //             <Button
// //               variant="outline"
// //               onClick={copyMeetingId}
// //               className="px-4 py-3 text-lg"
// //             >
// //               <Copy className="h-4 w-4 mr-2" />
// //               Copy Meeting ID
// //             </Button>
// //           )}
// //         </div>
// //         {!isRegistered && !isHost && (
// //           <p className="text-sm text-gray-600">
// //             You must register for the seminar before joining the meeting
// //           </p>
// //         )}
// //       </div>
// //     ) : (
// //       <div className="text-center py-8">
// //         {isHost ? (
// //           <Button
// //             onClick={createMeeting}
// //             disabled={creatingMeeting}
// //             className="bg-blue-600 hover:bg-blue-700 px-8 py-3 text-lg"
// //           >
// //             {creatingMeeting ? (
// //               <>
// //                 <Loader2 className="mr-2 h-4 w-4 animate-spin" />
// //                 Creating Meeting...
// //               </>
// //             ) : (
// //               <>
// //                 <Video className="mr-2 h-4 w-4" />
// //                 Create New Meeting
// //               </>
// //             )}
// //           </Button>
// //         ) : (
// //           <div className="space-y-2">
// //             <p className="text-gray-600">
// //               The host hasn't started the meeting yet.
// //             </p>
// //             <p className="text-sm text-gray-500">
// //               Please check back later or contact the organizer.
// //             </p>
// //           </div>
// //         )}
// //       </div>
// //     )}
// //   </div>
// // </CardContent>
// //         </Card>
// //       </div>
// //     </div> 
// //   );
// // };

// // export default SeminarDetails;

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
// } from "lucide-react";
// import { supabase } from "@/integrations/supabase/client";
// import { useToast } from "@/hooks/use-toast";
// import type { User as AuthUser } from "@supabase/supabase-js";
// import VideoMeeting from "../../components/VideoMeeting";
// import { v4 as uuidv4 } from "uuid";

// interface Seminar {
//   id: string;
//   host_name: string;
//   topic: string;
//   description: string;
//   date: string;
//   time: string;
//   host_id: string;
//   meeting_id?: string | null;
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

//   const handleBackNavigation = () => {
//     navigate(-1);
//   };

//   const onNavigateProfile = () => {
//     navigate("/profile");
//   };

//   const onNavigateHome = () => {
//     navigate("/");
//   };

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

//   const createMeeting = async () => {
//     if (!seminarId || !isHost) return;
    
//     try {
//       setCreatingMeeting(true);
//       const newMeetingId = uuidv4();
      
//       const { error } = await supabase
//         .from("seminars")
//         .update({ meeting_id: newMeetingId }as Seminar)
//         .eq("id", seminarId);
      
//       if (error) throw error;
      
//       setSeminar(prev => prev ? { ...prev, meeting_id: newMeetingId } : null);
//       toast({
//         title: "Meeting Created",
//         description: "A new meeting ID has been generated",
//       });
//     } catch (error) {
//       console.error("Error creating meeting:", error);
//       toast({
//         title: "Error",
//         description: "Failed to create meeting",
//         variant: "destructive",
//       });
//     } finally {
//       setCreatingMeeting(false);
//     }
//   };

//   const copyMeetingId = () => {
//     if (seminar?.meeting_id) {
//       navigator.clipboard.writeText(seminar.meeting_id);
//       toast({
//         title: "Copied",
//         description: "Meeting ID copied to clipboard",
//       });
//     }
//   };

//   const handleJoinMeeting = () => {
//     if (!seminar?.meeting_id) {
//       toast({
//         title: "No Meeting",
//         description: "Meeting not available yet",
//         variant: "destructive",
//       });
//       return;
//     }
    
//     if (!isHost && !isRegistered) {
//       toast({
//         title: "Registration Required",
//         description: "You must register for the seminar before joining",
//         variant: "destructive",
//       });
//       return;
//     }

//     setShowMeeting(true);
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
//       <VideoMeeting
//         isHost={isHost}
//         apiKey="8c81aa57-9868-417a-91c2-85006735bb62"
//         meetingId={seminar.meeting_id}
//         name={user?.email || "Participant"}
//         onMeetingLeave={handleLeaveMeeting}
//         micEnabled={true}
//         webcamEnabled={true}
//       />
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
//               {seminar.meeting_id && (
//                 <div className="flex items-center space-x-2 ml-4">
//                   <span className="text-white text-sm bg-white/10 px-3 py-1 rounded-full">
//                     {isHost ? "Hosting" : "Joined"}
//                   </span>
//                   <Button
//                     variant="ghost"
//                     size="sm"
//                     onClick={copyMeetingId}
//                     className="text-white hover:bg-white/10"
//                   >
//                     <Copy className="h-4 w-4 mr-2" />
//                     {seminar.meeting_id}
//                   </Button>
//                 </div>
//               )}
//             </div>
//             <div className="flex items-center space-x-4">
//               {user ? (
//                 <div className="flex items-center space-x-4">
//                   <span className="text-white text-sm bg-white/10 px-3 py-1 rounded-full">
//                     Welcome, {user.email}
//                   </span>
//                   <Button
//                     variant="outline"
//                     className="text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm"
//                     onClick={onNavigateProfile}
//                   >
//                     <User className="mr-2 h-4 w-4" />
//                     Profile
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
//                       <User className="mr-2 h-4 w-4" />
//                       Sign In
//                     </Button>
//                   </Link>
//                 </>
//               )}
//               <Button
//                 variant="outline"
//                 onClick={onNavigateHome}
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

//       <div className="container mx-auto px-4 py-8 max-w-4xl">
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
//               {seminar.meeting_id ? (
//                 <div className="text-center py-4 space-y-4">
//                   <div className="flex justify-center items-center gap-2">
//                     <Button
//                       onClick={handleJoinMeeting}
//                       className="bg-blue-600 hover:bg-blue-700 px-8 py-3 text-lg"
//                     >
//                       {isHost ? "Start Meeting as Host" : "Join Meeting"}
//                     </Button>
//                     {isHost && (
//                       <Button
//                         variant="outline"
//                         onClick={copyMeetingId}
//                         className="px-4 py-3 text-lg"
//                       >
//                         <Copy className="h-4 w-4 mr-2" />
//                         Copy Meeting ID
//                       </Button>
//                     )}
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
//                           Create New Meeting
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
//         </Card>
//       </div>
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

interface Seminar {
  id: string;
  host_name: string;
  topic: string;
  description: string;
  date: string;
  time: string;
  host_id: string;
  meeting_id?: string | null;
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

  const handleBackNavigation = () => {
    navigate(-1);
  };

  const onNavigateProfile = () => {
    navigate("/profile");
  };

  const onNavigateHome = () => {
    navigate("/");
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

  const createMeeting = async () => {
    if (!seminarId || !isHost) return;

    try {
      setCreatingMeeting(true);
      const newMeetingId = uuidv4();

      const { error } = await supabase
        .from("seminars")
        .update({ meeting_id: newMeetingId } as Seminar)
        .eq("id", seminarId);

      if (error) throw error;

      // Update local state immediately
      setSeminar((prev) =>
        prev ? { ...prev, meeting_id: newMeetingId } : null
      );

      toast({
        title: "Meeting Created",
        description: "A new meeting ID has been generated",
      });
    } catch (error) {
      console.error("Error creating meeting:", error);
      toast({
        title: "Error",
        description: "Failed to create meeting",
        variant: "destructive",
      });
    } finally {
      setCreatingMeeting(false);
    }
  };

  const copyMeetingId = () => {
    if (seminar?.meeting_id) {
      navigator.clipboard.writeText(seminar.meeting_id);
      toast({
        title: "Copied",
        description: "Meeting ID copied to clipboard",
      });
    }
  };

  const handleJoinMeeting = () => {
    if (!seminar?.meeting_id) {
      toast({
        title: "No Meeting",
        description: "Meeting not available yet",
        variant: "destructive",
      });
      return;
    }

    if (!isHost && !isRegistered) {
      toast({
        title: "Registration Required",
        description: "You must register for the seminar before joining",
        variant: "destructive",
      });
      return;
    }

    setShowMeeting(true);
  };

  const handleLeaveMeeting = () => {
    setShowMeeting(false);
  };

  const handleRegister = async () => {
    if (!user || !seminarId) return;

    try {
      setRegistering(true);
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
      toast({
        title: "Registered",
        description: "You are now registered for this seminar",
      });
    } catch (error) {
      console.error("Registration Error:", error);
      toast({
        title: "Registration Failed",
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
              <div className="flex items-center space-x-4">
                <Button
                  variant="outline"
                  onClick={handleBackNavigation}
                  className="text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm"
                  title="Go back"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back
                </Button>
                <Link to="/" className="flex items-center space-x-2">
                  <Shield className="h-8 w-8 text-blue-400" />
                  <h1 className="text-2xl font-bold text-white">MedPortal</h1>
                </Link>
                {seminar.meeting_id && (
                  <div className="flex items-center space-x-2 ml-4">
                    <span className="text-white text-sm bg-white/10 px-3 py-1 rounded-full">
                      {isHost ? "Hosting" : "Joined"}
                    </span>
                  </div>
                )}
              </div>
              <div className="flex items-center space-x-4">
                {user ? (
                  <div className="flex items-center space-x-4">
                    <span className="text-white text-sm bg-white/10 px-3 py-1 rounded-full">
                      Welcome, {user.email}
                    </span>
                    <Button
                      variant="outline"
                      className="text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm"
                      onClick={onNavigateProfile}
                    >
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </Button>
                  </div>
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
                        <User className="mr-2 h-4 w-4" />
                        Sign In
                      </Button>
                    </Link>
                  </>
                )}
                <Button
                  variant="outline"
                  onClick={onNavigateHome}
                  className="text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm"
                  title="Go to home page"
                >
                  <Home className="mr-2 h-4 w-4" />
                  Home
                </Button>
              </div>
            </div>
          </div>
        </header> */}
        <header className="bg-black/30 backdrop-blur-md border-b border-white/20 sticky top-0 z-50 shadow-xl">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              {/* Left Section - Logo, Back Button, and Seminar Status */}
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

                {seminar.meeting_id && (
                  <div className="flex items-center space-x-2 ml-2 md:ml-4">
                    <span className="text-white text-xs md:text-sm bg-white/10 px-2 py-1 md:px-3 md:py-1 rounded-full">
                      {isHost ? "Hosting" : "Joined"}
                    </span>
                  </div>
                )}
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
                        onClick={onNavigateProfile}
                        title="Profile"
                      >
                        <User className="h-4 w-4 md:mr-2" />
                        <span className="hidden md:inline">Profile</span>
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

                {/* Home Button - Icon only on mobile/tablet */}
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
        </header>

        <VideoMeeting
          isHost={isHost}
          apiKey="8c81aa57-9868-417a-91c2-85006735bb62"
          meetingId={seminar.meeting_id}
          name={user?.email || "Participant"}
          onMeetingLeave={handleLeaveMeeting}
          micEnabled={true}
          webcamEnabled={true}
          containerId="video-container"
          style={{ marginTop: "70px" }}
          // style={{ margin: "60px", height: "60px" }}
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
      {/* <header className="bg-black/30 backdrop-blur-md border-b border-white/20 sticky top-0 z-50 shadow-xl">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                onClick={handleBackNavigation}
                className="text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm"
                title="Go back"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
              <Link to="/" className="flex items-center space-x-2">
                <Shield className="h-8 w-8 text-blue-400" />
                <h1 className="text-2xl font-bold text-white">MedPortal</h1>
              </Link>
              {seminar.meeting_id && (
                <div className="flex items-center space-x-2 ml-4">
                  <span className="text-white text-sm bg-white/10 px-3 py-1 rounded-full">
                    {isHost ? "Hosting" : "Joined"}
                  </span>
                   <Button
                    variant="ghost"
                    size="sm"
                    onClick={copyMeetingId}
                    className="text-white hover:bg-white/10"
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    {seminar.meeting_id}
                  </Button> 
                </div>
              )}
            </div>
            <div className="flex items-center space-x-4">
              {user ? (
                <div className="flex items-center space-x-4">
                  <span className="text-white text-sm bg-white/10 px-3 py-1 rounded-full">
                    Welcome, {user.email}
                  </span>
                  <Button
                    variant="outline"
                    className="text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm"
                    onClick={onNavigateProfile}
                  >
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </Button>
                </div>
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
                      <User className="mr-2 h-4 w-4" />
                      Sign In
                    </Button>
                  </Link>
                </>
              )}
              <Button
                variant="outline"
                onClick={onNavigateHome}
                className="text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm"
                title="Go to home page"
              >
                <Home className="mr-2 h-4 w-4" />
                Home
              </Button>
            </div>
          </div>
        </div>
      </header> */}

      <header className="bg-black/30 backdrop-blur-md border-b border-white/20 sticky top-0 z-50 shadow-xl">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Left Section - Logo, Back Button, and Seminar Status */}
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

              {seminar.meeting_id && (
                <div className="flex items-center space-x-2 ml-2 md:ml-4">
                  <span className="text-white text-xs md:text-sm bg-white/10 px-2 py-1 md:px-3 md:py-1 rounded-full">
                    {isHost ? "Hosting" : "Joined"}
                  </span>
                </div>
              )}
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
                      onClick={onNavigateProfile}
                      title="Profile"
                    >
                      <User className="h-4 w-4 md:mr-2" />
                      <span className="hidden md:inline">Profile</span>
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

              {/* Home Button - Icon only on mobile/tablet */}
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
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
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
              </div>
            </div>

            {!isHost && (
              <div className="flex justify-center pt-4">
                <Button
                  onClick={
                    isRegistered ? handleCancelRegistration : handleRegister
                  }
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

        {/* <Card className="mt-8">
          <CardHeader>
            <CardTitle>Live Meeting</CardTitle>
            <p className="text-gray-600">Join the live seminar session</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {seminar.meeting_id ? (
                <div className="text-center py-4 space-y-4">
                  <div className="flex justify-center items-center gap-2">
                    <Button
                      onClick={handleJoinMeeting}
                      className="bg-blue-600 hover:bg-blue-700 px-8 py-3 text-lg"
                    >
                      {isHost ? "Start Meeting as Host" : "Join Meeting"}
                    </Button>
                    
                  </div>
                  {!isRegistered && !isHost && (
                    <p className="text-sm text-gray-600">
                      You must register for the seminar before joining the
                      meeting
                    </p>
                  )}
                </div>
              ) : (
                <div className="text-center py-8">
                  {isHost ? (
                    <Button
                      onClick={createMeeting}
                      disabled={creatingMeeting}
                      className="bg-blue-600 hover:bg-blue-700 px-8 py-3 text-lg"
                    >
                      {creatingMeeting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Creating Meeting...
                        </>
                      ) : (
                        <>
                          <Video className="mr-2 h-4 w-4" />
                          Create New Meeting
                        </>
                      )}
                    </Button>
                  ) : (
                    <div className="space-y-2">
                      <p className="text-gray-600">
                        The host hasn't started the meeting yet.
                      </p>
                      <p className="text-sm text-gray-500">
                        Please check back later or contact the organizer.
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </CardContent>
        </Card> */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Live Meeting</CardTitle>
            <p className="text-gray-600">Join the live seminar session</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {seminar.meeting_id ? (
                <div className="text-center py-4 space-y-4">
                  <div className="flex justify-center items-center gap-2">
                    <Button
                      onClick={handleJoinMeeting}
                      className="bg-blue-600 hover:bg-blue-700 px-8 py-3 text-lg"
                    >
                      {isHost ? " Start Meeting" : "Join Meeting"}
                    </Button>
                  </div>
                  {!isRegistered && !isHost && (
                    <p className="text-sm text-gray-600">
                      You must register for the seminar before joining the
                      meeting
                    </p>
                  )}
                </div>
              ) : (
                <div className="text-center py-8">
                  {isHost ? (
                    <Button
                      onClick={createMeeting}
                      disabled={creatingMeeting}
                      className="bg-blue-600 hover:bg-blue-700 px-8 py-3 text-lg"
                    >
                      {creatingMeeting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Creating Meeting...
                        </>
                      ) : (
                        <>
                          <Video className="mr-2 h-4 w-4" />
                          Create New Meeting
                        </>
                      )}
                    </Button>
                  ) : (
                    <div className="space-y-2">
                      <p className="text-gray-600">
                        The host hasn't started the meeting yet.
                      </p>
                      <p className="text-sm text-gray-500">
                        Please check back later or contact the organizer.
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SeminarDetails;