// // // // import React, { useEffect, useRef } from "react";
// // // // import { UserIcon } from "lucide-react"; // Assuming you're using lucide-react for icons
// // // // import {
// // // //    useParticipant,
// // // // } from "@videosdk.live/react-sdk";
// // // // interface ParticipantViewProps {
// // // //   participantId: string;
// // // //   layoutType?: "grid" | "fullscreen" | "spotlight" | "sidebar";
// // // //   gridSize?: number;
// // // //   isSpeaker?: boolean;
// // // //   onQualityChange?: (quality: VideoQuality) => void;
// // // // }

// // // // type VideoQuality = "low" | "med" | "high";

// // // // const ParticipantView: React.FC<ParticipantViewProps> = ({
// // // //   participantId,
// // // //   layoutType = "grid",
// // // //   gridSize = 1,
// // // //   isSpeaker = false,
// // // //   onQualityChange,
// // // // }) => {
// // // //   const {
// // // //     webcamStream,
// // // //     micStream,
// // // //     displayName,
// // // //     isLocal,
// // // //     webcamOn,
// // // //     setQuality,
// // // //   } = useParticipant(participantId);
// // // //   const videoRef = useRef<HTMLVideoElement>(null);
// // // //   const mediaStreamRef = useRef<MediaStream | null>(null);

// // // //   // Determine quality based on layout
// // // //   useEffect(() => {
// // // //     if (!setQuality) return;

// // // //     let quality: VideoQuality = "high";

// // // //     switch (layoutType) {
// // // //       case "fullscreen":
// // // //       case "spotlight":
// // // //         quality = "high";
// // // //         break;
// // // //       case "sidebar":
// // // //         quality = "low";
// // // //         break;
// // // //       case "grid":
// // // //         if (gridSize < 3) quality = "high";
// // // //         else if (gridSize <= 6) quality = "med";
// // // //         else quality = "low";
// // // //         break;
// // // //     }

// // // //     if (isSpeaker) quality = "high";

// // // //     setQuality(quality);
// // // //     onQualityChange?.(quality);
// // // //   }, [layoutType, gridSize, isSpeaker, setQuality, onQualityChange]);

// // // //   // Handle video stream
// // // //   useEffect(() => {
// // // //     const videoElement = videoRef.current;

// // // //     if (videoElement && webcamStream && webcamOn) {
// // // //       if (mediaStreamRef.current) {
// // // //         mediaStreamRef.current.getTracks().forEach((track) => track.stop());
// // // //       }

// // // //       mediaStreamRef.current = new MediaStream();
// // // //       mediaStreamRef.current.addTrack(webcamStream.track);

// // // //       videoElement.srcObject = mediaStreamRef.current;
// // // //       videoElement.muted = isLocal;

// // // //       videoElement.play().catch((error) => {
// // // //         console.error("Video play error:", error);
// // // //       });
// // // //     }

// // // //     return () => {
// // // //       if (videoElement) {
// // // //         videoElement.srcObject = null;
// // // //       }
// // // //       if (mediaStreamRef.current) {
// // // //         mediaStreamRef.current.getTracks().forEach((track) => track.stop());
// // // //         mediaStreamRef.current = null;
// // // //       }
// // // //     };
// // // //   }, [webcamStream, webcamOn, isLocal]);

// // // //   const getContainerClasses = () => {
// // // //     switch (layoutType) {
// // // //       case "fullscreen":
// // // //         return "w-full h-full";
// // // //       case "spotlight":
// // // //         return "w-full h-full";
// // // //       case "sidebar":
// // // //         return "w-full aspect-video";
// // // //       case "grid":
// // // //         return "w-full aspect-video";
// // // //       default:
// // // //         return "w-full aspect-video";
// // // //     }
// // // //   };

// // // //   return (
// // // //     <div
// // // //       className={`relative rounded-lg overflow-hidden bg-black ${getContainerClasses()}`}
// // // //     >
// // // //       {webcamOn ? (
// // // //         <video
// // // //           ref={videoRef}
// // // //           autoPlay
// // // //           playsInline
// // // //           muted={isLocal}
// // // //           className="w-full h-full object-cover"
// // // //         />
// // // //       ) : (
// // // //         <div className="absolute inset-0 bg-gray-800 flex items-center justify-center">
// // // //           <div className="bg-gray-700 rounded-full w-20 h-20 flex items-center justify-center">
// // // //             <UserIcon size={24} className="text-white" />
// // // //           </div>
// // // //         </div>
// // // //       )}
// // // //       <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2">
// // // //         <div className="flex items-center">
// // // //           <div className="bg-black/50 text-white px-2 py-1 rounded text-sm">
// // // //             {/* {displayName}  */}
// // // //             {/* {isLocal && "(You)"} */}
// // // //           </div>
// // // //         </div>
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // };

// // // // export default ParticipantView;

// // // import React, { useEffect, useRef, useState } from "react";
// // // import { useParticipant } from "@videosdk.live/react-sdk";
// // // import { Mic, MicOff, User, Wifi, WifiOff } from "lucide-react";
// // // import { cn } from "@/lib/utils";
// // // import {
// // //   Tooltip,
// // //   TooltipContent,
// // //   TooltipTrigger,
// // // } from "@/components/ui/tooltip";
// // // import { Badge } from "@/components/ui/badge";
// // // import { useMeetingAppContext } from "@/contexts/MeetingAppContext";
// // // import { useMediaQuery } from "@/hooks/use-media-query";

// // // interface ParticipantViewProps {
// // //   participantId: string;
// // //   layoutType?: "fullscreen" | "sidebar";
// // //   isActiveSpeaker?: boolean;
// // //   isPresenting?: boolean;
// // //   onClick?: () => void;
// // //   className?: string;
// // // }

// // // const ParticipantView = React.memo(
// // //   ({
// // //     participantId,
// // //     layoutType = "fullscreen",
// // //     isActiveSpeaker = false,
// // //     isPresenting = false,
// // //     onClick,
// // //     className,
// // //   }: ParticipantViewProps) => {
// // //     const {
// // //       displayName,
// // //       webcamOn,
// // //       micOn,
// // //       webcamStream,
// // //       isLocal,
// // //       connectionQuality,
// // //       setQuality,
// // //     } = useParticipant(participantId);

// // //     const { selectedSpeaker } = useMeetingAppContext();
// // //     const videoRef = useRef<HTMLVideoElement>(null);
// // //     const audioRef = useRef<HTMLAudioElement>(null);
// // //     const [isVideoPlaying, setIsVideoPlaying] = useState(false);
// // //     const isMobile = useMediaQuery("(max-width: 768px)");

// // //     // Set video quality based on layout
// // //     useEffect(() => {
// // //       if (!setQuality) return;
// // //       const quality = layoutType === "fullscreen" ? "high" : "low";
// // //       setQuality(quality);
// // //     }, [layoutType, setQuality]);

// // //     // Handle webcam stream
// // //     useEffect(() => {
// // //       const videoElement = videoRef.current;
// // //       if (!videoElement || !webcamStream) return;

// // //       const mediaStream = new MediaStream();
// // //       mediaStream.addTrack(webcamStream.track);

// // //       const handlePlaying = () => setIsVideoPlaying(true);
// // //       const handleError = () => setIsVideoPlaying(false);

// // //       videoElement.srcObject = mediaStream;
// // //       videoElement.addEventListener("playing", handlePlaying);
// // //       videoElement.addEventListener("error", handleError);

// // //       videoElement.play().catch((err) => {
// // //         console.error("Video play failed:", err);
// // //         setIsVideoPlaying(false);
// // //       });

// // //       return () => {
// // //         videoElement.removeEventListener("playing", handlePlaying);
// // //         videoElement.removeEventListener("error", handleError);
// // //         mediaStream.getTracks().forEach((track) => track.stop());
// // //         videoElement.srcObject = null;
// // //       };
// // //     }, [webcamStream]);

// // //     // Handle audio stream for remote participants
// // //     useEffect(() => {
// // //       if (isLocal || !micOn) return;

// // //       const audioElement = audioRef.current;
// // //       if (!audioElement) return;

// // //       if (selectedSpeaker?.id && "setSinkId" in audioElement) {
// // //         audioElement.setSinkId(selectedSpeaker.id).catch((err) => {
// // //           console.error("Failed to set audio output device:", err);
// // //         });
// // //       }

// // //       return () => {
// // //         if (audioElement.srcObject) {
// // //           (audioElement.srcObject as MediaStream)
// // //             .getTracks()
// // //             .forEach((track) => track.stop());
// // //           audioElement.srcObject = null;
// // //         }
// // //       };
// // //     }, [isLocal, micOn, selectedSpeaker]);

// // //     // Connection quality indicator
// // //     const connectionQualityIndicator = () => {
// // //       switch (connectionQuality) {
// // //         case "excellent":
// // //           return <Wifi className="h-4 w-4 text-green-500" />;
// // //         case "good":
// // //           return <Wifi className="h-4 w-4 text-yellow-500" />;
// // //         case "poor":
// // //           return <Wifi className="h-4 w-4 text-orange-500" />;
// // //         case "bad":
// // //         default:
// // //           return <WifiOff className="h-4 w-4 text-red-500" />;
// // //       }
// // //     };

// // //     // Truncate long display names
// // //     const truncatedName =
// // //       displayName.length > 15
// // //         ? `${displayName.substring(0, 12)}...`
// // //         : displayName;

// // //     return (
// // //       <div
// // //         className={cn(
// // //           "relative flex flex-col rounded-lg overflow-hidden bg-gray-800 border border-gray-700 transition-all",
// // //           isActiveSpeaker && "ring-2 ring-blue-500",
// // //           layoutType === "fullscreen" && "w-full h-full",
// // //           layoutType === "sidebar" && "w-full aspect-video",
// // //           className
// // //         )}
// // //         onClick={onClick}
// // //       >
// // //         {/* Video element */}
// // //         <video
// // //           ref={videoRef}
// // //           autoPlay
// // //           playsInline
// // //           muted={isLocal}
// // //           className={cn(
// // //             "w-full h-full object-cover bg-gray-900",
// // //             !webcamOn && "hidden"
// // //           )}
// // //           aria-label={`Video stream of ${displayName}`}
// // //         />

// // //         {/* Audio element for remote participants */}
// // //         {!isLocal && micOn && (
// // //           <audio
// // //             ref={audioRef}
// // //             autoPlay
// // //             playsInline
// // //             className="hidden"
// // //             aria-hidden="true"
// // //           />
// // //         )}

// // //         {/* Fallback when webcam is off */}
// // //         {!webcamOn && (
// // //           <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
// // //             <div className="flex flex-col items-center">
// // //               <div
// // //                 className={cn(
// // //                   "bg-gray-700 rounded-full flex items-center justify-center",
// // //                   layoutType === "fullscreen" ? "w-20 h-20" : "w-16 h-16"
// // //                 )}
// // //               >
// // //                 <User
// // //                   className={cn(
// // //                     "text-gray-400",
// // //                     layoutType === "fullscreen" ? "h-8 w-8" : "h-6 w-6"
// // //                   )}
// // //                 />
// // //               </div>
// // //               {layoutType === "fullscreen" && (
// // //                 <p className="text-gray-300 text-sm mt-2">{truncatedName}</p>
// // //               )}
// // //             </div>
// // //           </div>
// // //         )}

// // //         {/* Participant info overlay - only show in fullscreen mode */}
// // //         {layoutType === "fullscreen" && (
// // //           <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2">
// // //             <div className="flex items-center justify-between">
// // //               <div className="flex items-center space-x-2">
// // //                 <Badge
// // //                   variant={isLocal ? "default" : "secondary"}
// // //                   className="px-1.5 py-0.5"
// // //                 >
// // //                   <span className="truncate max-w-[100px]">
// // //                     {truncatedName} {isLocal && "(You)"}
// // //                   </span>
// // //                 </Badge>

// // //                 {isPresenting && (
// // //                   <Badge variant="destructive" className="px-1.5 py-0.5">
// // //                     Presenting
// // //                   </Badge>
// // //                 )}
// // //               </div>

// // //               <div className="flex items-center space-x-2">
// // //                 {/* Mic status */}
// // //                 <Tooltip>
// // //                   <TooltipTrigger asChild>
// // //                     <div className="p-1 rounded-full bg-black/50">
// // //                       {micOn ? (
// // //                         <Mic className="h-4 w-4 text-white" />
// // //                       ) : (
// // //                         <MicOff className="h-4 w-4 text-red-500" />
// // //                       )}
// // //                     </div>
// // //                   </TooltipTrigger>
// // //                   <TooltipContent>
// // //                     {micOn ? "Microphone is on" : "Microphone is off"}
// // //                   </TooltipContent>
// // //                 </Tooltip>

// // //                 {/* Connection quality */}
// // //                 <Tooltip>
// // //                   <TooltipTrigger asChild>
// // //                     <div className="p-1 rounded-full bg-black/50">
// // //                       {connectionQualityIndicator()}
// // //                     </div>
// // //                   </TooltipTrigger>
// // //                   <TooltipContent>
// // //                     Connection quality: {connectionQuality || "unknown"}
// // //                   </TooltipContent>
// // //                 </Tooltip>
// // //               </div>
// // //             </div>
// // //           </div>
// // //         )}

// // //         {/* Active speaker indicator */}
// // //         {isActiveSpeaker && (
// // //           <div className="absolute top-2 left-2">
// // //             <div className="animate-pulse bg-blue-500 rounded-full w-3 h-3" />
// // //           </div>
// // //         )}

// // //         {/* Video loading indicator */}
// // //         {webcamOn && !isVideoPlaying && (
// // //           <div className="absolute inset-0 flex items-center justify-center bg-black/50">
// // //             <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white" />
// // //           </div>
// // //         )}
// // //       </div>
// // //     );
// // //   }
// // // );

// // // ParticipantView.displayName = "ParticipantView";

// // // export { ParticipantView };
// // import React, { useEffect, useRef, useState } from "react";
// // import { useParticipant } from "@videosdk.live/react-sdk";
// // import { Mic, MicOff, User, Wifi, WifiOff } from "lucide-react";
// // import { cn } from "@/lib/utils";
// // import {
// //   Tooltip,
// //   TooltipContent,
// //   TooltipTrigger,
// // } from "@/components/ui/tooltip";
// // import { Badge } from "@/components/ui/badge";

// // interface ParticipantViewProps {
// //   participantId: string;
// //   layoutType?: "fullscreen" | "sidebar";
// //   isActiveSpeaker?: boolean;
// //   isPresenting?: boolean;
// //   onClick?: () => void;
// //   className?: string;
// //   selectedSpeaker?: { id: string }; // Added selectedSpeaker prop
// // }

// // const ParticipantView = React.memo(
// //   ({
// //     participantId,
// //     layoutType = "fullscreen",
// //     isActiveSpeaker = false,
// //     isPresenting = false,
// //     onClick,
// //     className,
// //     selectedSpeaker, // Added selectedSpeaker prop
// //   }: ParticipantViewProps) => {
// //     const {
// //       displayName,
// //       webcamOn,
// //       micOn,
// //       webcamStream,
// //       isLocal,
// //       // Removed connectionQuality as it's not available in the SDK
// //     } = useParticipant(participantId);

// //     const videoRef = useRef<HTMLVideoElement>(null);
// //     const audioRef = useRef<HTMLAudioElement>(null);
// //     const [isVideoPlaying, setIsVideoPlaying] = useState(false);
// //     const [connectionQuality, setConnectionQuality] = useState<string>("good"); // Local state for connection quality

// //     // Set video quality based on layout
// //     useEffect(() => {
// //       const quality = layoutType === "fullscreen" ? "high" : "low";
// //       // You would call setQuality here if available in your SDK
// //     }, [layoutType]);

// //     // Handle webcam stream
// //     useEffect(() => {
// //       const videoElement = videoRef.current;
// //       if (!videoElement || !webcamStream) return;

// //       const mediaStream = new MediaStream();
// //       mediaStream.addTrack(webcamStream.track);

// //       const handlePlaying = () => setIsVideoPlaying(true);
// //       const handleError = () => setIsVideoPlaying(false);

// //       videoElement.srcObject = mediaStream;
// //       videoElement.addEventListener("playing", handlePlaying);
// //       videoElement.addEventListener("error", handleError);

// //       videoElement.play().catch((err) => {
// //         console.error("Video play failed:", err);
// //         setIsVideoPlaying(false);
// //       });

// //       return () => {
// //         videoElement.removeEventListener("playing", handlePlaying);
// //         videoElement.removeEventListener("error", handleError);
// //         mediaStream.getTracks().forEach((track) => track.stop());
// //         videoElement.srcObject = null;
// //       };
// //     }, [webcamStream]);

// //     // Handle audio stream for remote participants
// //     useEffect(() => {
// //       if (isLocal || !micOn) return;

// //       const audioElement = audioRef.current;
// //       if (!audioElement) return;

// //       if (selectedSpeaker?.id && "setSinkId" in audioElement) {
// //         audioElement.setSinkId(selectedSpeaker.id).catch((err) => {
// //           console.error("Failed to set audio output device:", err);
// //         });
// //       }

// //       return () => {
// //         if (audioElement.srcObject) {
// //           (audioElement.srcObject as MediaStream)
// //             .getTracks()
// //             .forEach((track) => track.stop());
// //           audioElement.srcObject = null;
// //         }
// //       };
// //     }, [isLocal, micOn, selectedSpeaker]);

// //     // Connection quality indicator
// //     const connectionQualityIndicator = () => {
// //       switch (connectionQuality) {
// //         case "excellent":
// //           return <Wifi className="h-4 w-4 text-green-500" />;
// //         case "good":
// //           return <Wifi className="h-4 w-4 text-yellow-500" />;
// //         case "poor":
// //           return <Wifi className="h-4 w-4 text-orange-500" />;
// //         case "bad":
// //         default:
// //           return <WifiOff className="h-4 w-4 text-red-500" />;
// //       }
// //     };

// //     // Truncate long display names
// //     const truncatedName =
// //       displayName.length > 15
// //         ? `${displayName.substring(0, 12)}...`
// //         : displayName;

// //     return (
// //       <div
// //         className={cn(
// //           "relative flex flex-col rounded-lg overflow-hidden bg-gray-800 border border-gray-700 transition-all",
// //           isActiveSpeaker && "ring-2 ring-blue-500",
// //           layoutType === "fullscreen" && "w-full h-full",
// //           layoutType === "sidebar" && "w-full aspect-video",
// //           className
// //         )}
// //         onClick={onClick}
// //       >
// //         {/* Video element */}
// //         <video
// //           ref={videoRef}
// //           autoPlay
// //           playsInline
// //           muted={isLocal}
// //           className={cn(
// //             "w-full h-full object-cover bg-gray-900",
// //             !webcamOn && "hidden"
// //           )}
// //           aria-label={`Video stream of ${displayName}`}
// //         />

// //         {/* Audio element for remote participants */}
// //         {!isLocal && micOn && (
// //           <audio
// //             ref={audioRef}
// //             autoPlay
// //             playsInline
// //             className="hidden"
// //             aria-hidden="true"
// //           />
// //         )}

// //         {/* Fallback when webcam is off */}
// //         {!webcamOn && (
// //           <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
// //             <div className="flex flex-col items-center">
// //               <div
// //                 className={cn(
// //                   "bg-gray-700 rounded-full flex items-center justify-center",
// //                   layoutType === "fullscreen" ? "w-20 h-20" : "w-16 h-16"
// //                 )}
// //               >
// //                 <User
// //                   className={cn(
// //                     "text-gray-400",
// //                     layoutType === "fullscreen" ? "h-8 w-8" : "h-6 w-6"
// //                   )}
// //                 />
// //               </div>
// //               {layoutType === "fullscreen" && (
// //                 <p className="text-gray-300 text-sm mt-2">{truncatedName}</p>
// //               )}
// //             </div>
// //           </div>
// //         )}

// //         {/* Participant info overlay - only show in fullscreen mode */}
// //         {layoutType === "fullscreen" && (
// //           <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2">
// //             <div className="flex items-center justify-between">
// //               <div className="flex items-center space-x-2">
// //                 <Badge
// //                   variant={isLocal ? "default" : "secondary"}
// //                   className="px-1.5 py-0.5"
// //                 >
// //                   <span className="truncate max-w-[100px]">
// //                     {truncatedName} {isLocal && "(You)"}
// //                   </span>
// //                 </Badge>

// //                 {isPresenting && (
// //                   <Badge variant="destructive" className="px-1.5 py-0.5">
// //                     Presenting
// //                   </Badge>
// //                 )}
// //               </div>

// //               <div className="flex items-center space-x-2">
// //                 {/* Mic status */}
// //                 <Tooltip>
// //                   <TooltipTrigger asChild>
// //                     <div className="p-1 rounded-full bg-black/50">
// //                       {micOn ? (
// //                         <Mic className="h-4 w-4 text-white" />
// //                       ) : (
// //                         <MicOff className="h-4 w-4 text-red-500" />
// //                       )}
// //                     </div>
// //                   </TooltipTrigger>
// //                   <TooltipContent>
// //                     {micOn ? "Microphone is on" : "Microphone is off"}
// //                   </TooltipContent>
// //                 </Tooltip>

// //                 {/* Connection quality - using local state */}
// //                 <Tooltip>
// //                   <TooltipTrigger asChild>
// //                     <div className="p-1 rounded-full bg-black/50">
// //                       {connectionQualityIndicator()}
// //                     </div>
// //                   </TooltipTrigger>
// //                   <TooltipContent>
// //                     Connection quality: {connectionQuality || "unknown"}
// //                   </TooltipContent>
// //                 </Tooltip>
// //               </div>
// //             </div>
// //           </div>
// //         )}

// //         {/* Active speaker indicator */}
// //         {isActiveSpeaker && (
// //           <div className="absolute top-2 left-2">
// //             <div className="animate-pulse bg-blue-500 rounded-full w-3 h-3" />
// //           </div>
// //         )}

// //         {/* Video loading indicator */}
// //         {webcamOn && !isVideoPlaying && (
// //           <div className="absolute inset-0 flex items-center justify-center bg-black/50">
// //             <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white" />
// //           </div>
// //         )}
// //       </div>
// //     );
// //   }
// // );

// // export default ParticipantView;
// import React, { useEffect, useRef, useState } from "react";
// import { useParticipant, useMeeting } from "@videosdk.live/react-sdk";
// import {
//   Mic,
//   MicOff,
//   User,
//   Wifi,
//   WifiOff,
//   ScreenShare,
//   ScreenShareOff,
// } from "lucide-react";
// import { cn } from "@/lib/utils";
// import {
//   Tooltip,
//   TooltipContent,
//   TooltipTrigger,
// } from "@/components/ui/tooltip";
// import { Badge } from "@/components/ui/badge";

// interface ParticipantViewProps {
//   participantId: string;
//   isFullscreen?: boolean;
//   isActiveSpeaker?: boolean;
//   isPresenting?: boolean;
//   onClick?: () => void;
//   className?: string;
//   selectedSpeaker?: { id: string };
// }

// const ParticipantView = React.memo(
//   ({
//     participantId,
//     isFullscreen = false,
//     isActiveSpeaker = false,
//     isPresenting = false,
//     onClick,
//     className,
//     selectedSpeaker,
//   }: ParticipantViewProps) => {
//     const {
//       displayName,
//       webcamOn,
//       micOn,
//       webcamStream,
//       screenShareStream,
//       isLocal,
//     } = useParticipant(participantId);

//     const { toggleScreenShare } = useMeeting();
//     const videoRef = useRef<HTMLVideoElement>(null);
//     const screenShareRef = useRef<HTMLVideoElement>(null);
//     const audioRef = useRef<HTMLAudioElement>(null);
//     const containerRef = useRef<HTMLDivElement>(null);
//     const [isVideoPlaying, setIsVideoPlaying] = useState(false);
//     const [isScreenSharePlaying, setIsScreenSharePlaying] = useState(false);
//     const [connectionQuality, setConnectionQuality] = useState<string>("good");
//     const [isSharingScreen, setIsSharingScreen] = useState(false);

//     // Handle fullscreen mode
//     useEffect(() => {
//       if (!containerRef.current) return;

//       const elem = containerRef.current;

//       const handleFullscreenChange = () => {
//         if (!document.fullscreenElement) {
//           // Handle fullscreen exit if needed
//         }
//       };

//       if (isFullscreen) {
//         document.addEventListener("fullscreenchange", handleFullscreenChange);
//         elem.requestFullscreen().catch((err) => {
//           console.error(
//             `Error attempting to enable fullscreen: ${err.message}`
//           );
//         });
//       }

//       return () => {
//         document.removeEventListener(
//           "fullscreenchange",
//           handleFullscreenChange
//         );
//         if (document.fullscreenElement === elem) {
//           document.exitFullscreen().catch(console.error);
//         }
//       };
//     }, [isFullscreen]);

//     // Handle screen sharing stream
//     useEffect(() => {
//       const screenShareElement = screenShareRef.current;
//       if (!screenShareElement || !screenShareStream) return;

//       const mediaStream = new MediaStream();
//       mediaStream.addTrack(screenShareStream.track);

//       const handlePlaying = () => setIsScreenSharePlaying(true);
//       const handleError = () => setIsScreenSharePlaying(false);

//       screenShareElement.srcObject = mediaStream;
//       screenShareElement.addEventListener("playing", handlePlaying);
//       screenShareElement.addEventListener("error", handleError);

//       screenShareElement.play().catch((err) => {
//         console.error("Screen share play failed:", err);
//         setIsScreenSharePlaying(false);
//       });

//       return () => {
//         screenShareElement.removeEventListener("playing", handlePlaying);
//         screenShareElement.removeEventListener("error", handleError);
//         mediaStream.getTracks().forEach((track) => track.stop());
//         screenShareElement.srcObject = null;
//       };
//     }, [screenShareStream]);

//     // Handle webcam stream
//     useEffect(() => {
//       const videoElement = videoRef.current;
//       if (!videoElement || !webcamStream) return;

//       const mediaStream = new MediaStream();
//       mediaStream.addTrack(webcamStream.track);

//       const handlePlaying = () => setIsVideoPlaying(true);
//       const handleError = () => setIsVideoPlaying(false);

//       videoElement.srcObject = mediaStream;
//       videoElement.addEventListener("playing", handlePlaying);
//       videoElement.addEventListener("error", handleError);

//       videoElement.play().catch((err) => {
//         console.error("Video play failed:", err);
//         setIsVideoPlaying(false);
//       });

//       return () => {
//         videoElement.removeEventListener("playing", handlePlaying);
//         videoElement.removeEventListener("error", handleError);
//         mediaStream.getTracks().forEach((track) => track.stop());
//         videoElement.srcObject = null;
//       };
//     }, [webcamStream]);

//     // Handle audio stream for remote participants
//     useEffect(() => {
//       if (isLocal || !micOn) return;

//       const audioElement = audioRef.current;
//       if (!audioElement) return;

//       if (selectedSpeaker?.id && "setSinkId" in audioElement) {
//         audioElement.setSinkId(selectedSpeaker.id).catch((err) => {
//           console.error("Failed to set audio output device:", err);
//         });
//       }

//       return () => {
//         if (audioElement.srcObject) {
//           (audioElement.srcObject as MediaStream)
//             .getTracks()
//             .forEach((track) => track.stop());
//           audioElement.srcObject = null;
//         }
//       };
//     }, [isLocal, micOn, selectedSpeaker]);

//     const connectionQualityIndicator = () => {
//       switch (connectionQuality) {
//         case "excellent":
//           return <Wifi className="h-4 w-4 text-green-500" />;
//         case "good":
//           return <Wifi className="h-4 w-4 text-yellow-500" />;
//         case "poor":
//           return <Wifi className="h-4 w-4 text-orange-500" />;
//         case "bad":
//         default:
//           return <WifiOff className="h-4 w-4 text-red-500" />;
//       }
//     };

//     const toggleScreenSharing = async () => {
//       try {
//         if (isSharingScreen) {
//           await toggleScreenShare();
//           setIsSharingScreen(false);
//         } else {
//           // For Windows screen sharing
//           const stream = await navigator.mediaDevices.getDisplayMedia({
//             video: {
//               displaySurface: "monitor", // or "window", "application"
//               frameRate: { ideal: 30, max: 60 },
//             },
//             audio: false,
//           });

//           // Handle the stream (implementation depends on your SDK)
//           // This is where you would typically send the stream to other participants
//           setIsSharingScreen(true);
//         }
//       } catch (error) {
//         console.error("Screen sharing failed:", error);
//       }
//     };

//     const truncatedName =
//       displayName.length > 15
//         ? `${displayName.substring(0, 12)}...`
//         : displayName;

//     return (
//       <div
//         ref={containerRef}
//         className={cn(
//           "relative flex flex-col rounded-lg overflow-hidden bg-gray-800 border border-gray-700 transition-all",
//           isActiveSpeaker && "ring-2 ring-blue-500",
//           isFullscreen
//             ? "fixed inset-0 z-50 w-screen h-screen"
//             : "w-full h-full",
//           className
//         )}
//         onClick={onClick}
//       >
//         {/* Screen share element */}
//         {screenShareStream && (
//           <video
//             ref={screenShareRef}
//             autoPlay
//             playsInline
//             className={cn(
//               "w-full h-full object-contain bg-gray-900",
//               !isScreenSharePlaying && "hidden"
//             )}
//             aria-label={`Screen share of ${displayName}`}
//           />
//         )}

//         {/* Video element */}
//         {!screenShareStream && (
//           <video
//             ref={videoRef}
//             autoPlay
//             playsInline
//             muted={isLocal}
//             className={cn(
//               "w-full h-full object-cover bg-gray-900",
//               !webcamOn && "hidden"
//             )}
//             aria-label={`Video stream of ${displayName}`}
//           />
//         )}

//         {/* Audio element for remote participants */}
//         {!isLocal && micOn && (
//           <audio
//             ref={audioRef}
//             autoPlay
//             playsInline
//             className="hidden"
//             aria-hidden="true"
//           />
//         )}

//         {/* Fallback when no video or screen share */}
//         {!webcamOn && !screenShareStream && (
//           <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
//             <div className="flex flex-col items-center">
//               <div
//                 className={cn(
//                   "bg-gray-700 rounded-full flex items-center justify-center",
//                   isFullscreen ? "w-32 h-32" : "w-20 h-20"
//                 )}
//               >
//                 <User
//                   className={cn(
//                     "text-gray-400",
//                     isFullscreen ? "h-12 w-12" : "h-8 w-8"
//                   )}
//                 />
//               </div>
//               <p className="text-gray-300 text-lg mt-4">{truncatedName}</p>
//             </div>
//           </div>
//         )}

//         {/* Participant info overlay */}
//         <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center space-x-2">
//               <Badge
//                 variant={isLocal ? "default" : "secondary"}
//                 className="px-2 py-1 text-sm"
//               >
//                 <span className="truncate max-w-[200px]">
//                   {truncatedName} {isLocal && "(You)"}
//                 </span>
//               </Badge>

//               {isPresenting && (
//                 <Badge variant="destructive" className="px-2 py-1 text-sm">
//                   Presenting
//                 </Badge>
//               )}
//             </div>

//             <div className="flex items-center space-x-2">
//               {/* Screen share control for local participant */}
//               {isLocal && (
//                 <Tooltip>
//                   <TooltipTrigger asChild>
//                     <button
//                       onClick={(e) => {
//                         e.stopPropagation();
//                         toggleScreenSharing();
//                       }}
//                       className="p-1.5 rounded-full bg-black/50 hover:bg-black/70"
//                     >
//                       {isSharingScreen ? (
//                         <ScreenShareOff className="h-5 w-5 text-red-500" />
//                       ) : (
//                         <ScreenShare className="h-5 w-5 text-white" />
//                       )}
//                     </button>
//                   </TooltipTrigger>
//                   <TooltipContent>
//                     {isSharingScreen ? "Stop sharing" : "Share screen"}
//                   </TooltipContent>
//                 </Tooltip>
//               )}

//               {/* Mic status */}
//               <Tooltip>
//                 <TooltipTrigger asChild>
//                   <div className="p-1.5 rounded-full bg-black/50">
//                     {micOn ? (
//                       <Mic className="h-5 w-5 text-white" />
//                     ) : (
//                       <MicOff className="h-5 w-5 text-red-500" />
//                     )}
//                   </div>
//                 </TooltipTrigger>
//                 <TooltipContent>
//                   {micOn ? "Microphone is on" : "Microphone is off"}
//                 </TooltipContent>
//               </Tooltip>

//               {/* Connection quality */}
//               <Tooltip>
//                 <TooltipTrigger asChild>
//                   <div className="p-1.5 rounded-full bg-black/50">
//                     {connectionQualityIndicator()}
//                   </div>
//                 </TooltipTrigger>
//                 <TooltipContent>
//                   Connection quality: {connectionQuality || "unknown"}
//                 </TooltipContent>
//               </Tooltip>
//             </div>
//           </div>
//         </div>

//         {/* Active speaker indicator */}
//         {isActiveSpeaker && (
//           <div className="absolute top-2 left-2">
//             <div className="animate-pulse bg-blue-500 rounded-full w-3 h-3" />
//           </div>
//         )}

//         {/* Video loading indicator */}
//         {(webcamOn || screenShareStream) &&
//           !(isVideoPlaying || isScreenSharePlaying) && (
//             <div className="absolute inset-0 flex items-center justify-center bg-black/50">
//               <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white" />
//             </div>
//           )}

//         {/* Fullscreen close button */}
//         {isFullscreen && (
//           <button
//             className="absolute top-4 right-4 p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors"
//             onClick={(e) => {
//               e.stopPropagation();
//               document.exitFullscreen();
//             }}
//           >
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="h-6 w-6 text-white"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M6 18L18 6M6 6l12 12"
//               />
//             </svg>
//           </button>
//         )}
//       </div>
//     );
//   }
// );

// export default ParticipantView;

import React, { useEffect, useRef, useState } from "react";
import { useParticipant } from "@videosdk.live/react-sdk";
import { Mic, MicOff, User, Wifi, WifiOff, ScreenShareOff } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";

interface ParticipantViewProps {
  participantId: string;
  layoutType?: "fullscreen" | "sidebar";
  isActiveSpeaker?: boolean;
  isPresenting?: boolean;
  onClick?: () => void;
  className?: string;
  selectedSpeaker?: { id: string };
  isFullscreen?: boolean;
  isHost?: boolean;
}

const ParticipantView = React.memo(
  ({
    participantId,
    layoutType = "sidebar",
    isActiveSpeaker = false,
    isPresenting = false,
    onClick,
    className,
    selectedSpeaker,
    isFullscreen = false,
    isHost = false,
  }: ParticipantViewProps) => {
    const {
      displayName,
      webcamOn,
      micOn,
      webcamStream,
      screenShareStream,
      isLocal,
    } = useParticipant(participantId);

    const videoRef = useRef<HTMLVideoElement>(null);
    const screenShareRef = useRef<HTMLVideoElement>(null);
    const audioRef = useRef<HTMLAudioElement>(null);
    const [isVideoPlaying, setIsVideoPlaying] = useState(false);
    const [isScreenSharePlaying, setIsScreenSharePlaying] = useState(false);
    const [connectionQuality, setConnectionQuality] = useState<string>("good");

    // Handle screen share stream
    useEffect(() => {
      const screenShareElement = screenShareRef.current;
      if (!screenShareElement || !screenShareStream) return;

      const mediaStream = new MediaStream();
      mediaStream.addTrack(screenShareStream.track);

      const handlePlaying = () => setIsScreenSharePlaying(true);
      const handleError = () => setIsScreenSharePlaying(false);

      screenShareElement.srcObject = mediaStream;
      screenShareElement.addEventListener("playing", handlePlaying);
      screenShareElement.addEventListener("error", handleError);

      screenShareElement.play().catch((err) => {
        console.error("Screen share play failed:", err);
        setIsScreenSharePlaying(false);
      });

      return () => {
        screenShareElement.removeEventListener("playing", handlePlaying);
        screenShareElement.removeEventListener("error", handleError);
        mediaStream.getTracks().forEach((track) => track.stop());
        screenShareElement.srcObject = null;
      };
    }, [screenShareStream]);

    // Handle webcam stream
    useEffect(() => {
      const videoElement = videoRef.current;
      if (!videoElement || !webcamStream) return;

      const mediaStream = new MediaStream();
      mediaStream.addTrack(webcamStream.track);

      const handlePlaying = () => setIsVideoPlaying(true);
      const handleError = () => setIsVideoPlaying(false);

      videoElement.srcObject = mediaStream;
      videoElement.addEventListener("playing", handlePlaying);
      videoElement.addEventListener("error", handleError);

      videoElement.play().catch((err) => {
        console.error("Video play failed:", err);
        setIsVideoPlaying(false);
      });

      return () => {
        videoElement.removeEventListener("playing", handlePlaying);
        videoElement.removeEventListener("error", handleError);
        mediaStream.getTracks().forEach((track) => track.stop());
        videoElement.srcObject = null;
      };
    }, [webcamStream]);

    // Handle audio stream
    useEffect(() => {
      if (isLocal || !micOn) return;

      const audioElement = audioRef.current;
      if (!audioElement) return;

      if (selectedSpeaker?.id && "setSinkId" in audioElement) {
        audioElement.setSinkId(selectedSpeaker.id).catch((err) => {
          console.error("Failed to set audio output device:", err);
        });
      }

      return () => {
        if (audioElement.srcObject) {
          (audioElement.srcObject as MediaStream)
            .getTracks()
            .forEach((track) => track.stop());
          audioElement.srcObject = null;
        }
      };
    }, [isLocal, micOn, selectedSpeaker]);

    const connectionQualityIndicator = () => {
      switch (connectionQuality) {
        case "excellent":
          return <Wifi className="h-4 w-4 text-green-500" />;
        case "good":
          return <Wifi className="h-4 w-4 text-yellow-500" />;
        case "poor":
          return <Wifi className="h-4 w-4 text-orange-500" />;
        case "bad":
        default:
          return <WifiOff className="h-4 w-4 text-red-500" />;
      }
    };

    const truncatedName =
      displayName.length > 15
        ? `${displayName.substring(0, 12)}...`
        : displayName;

    return (
      <div
        className={cn(
          "relative flex flex-col rounded-lg overflow-hidden bg-gray-800 border border-gray-700 transition-all",
          isActiveSpeaker && "ring-2 ring-blue-500",
          isHost && isFullscreen
            ? "fixed inset-0 z-50 w-screen h-screen"
            : layoutType === "sidebar"
            ? "w-full aspect-video"
            : "w-full h-full",
          className
        )}
        onClick={onClick}
      >
        {/* Screen share element */}
        {screenShareStream && (
          <video
            ref={screenShareRef}
            autoPlay
            playsInline
            className={cn(
              "w-full h-full object-contain bg-gray-900",
              !isScreenSharePlaying && "hidden"
            )}
            aria-label={`Screen share of ${displayName}`}
          />
        )}

        {/* Video element */}
        {!screenShareStream && (
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted={isLocal}
            className={cn(
              "w-full h-full object-cover bg-gray-900",
              !webcamOn && "hidden"
            )}
            aria-label={`Video stream of ${displayName}`}
          />
        )}

        {/* Audio element */}
        {!isLocal && micOn && (
          <audio
            ref={audioRef}
            autoPlay
            playsInline
            className="hidden"
            aria-hidden="true"
          />
        )}

        {/* Fallback when no video */}
        {!webcamOn && !screenShareStream && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  "bg-gray-700 rounded-full flex items-center justify-center",
                  isFullscreen
                    ? "w-32 h-32"
                    : layoutType === "fullscreen"
                    ? "w-20 h-20"
                    : "w-16 h-16"
                )}
              >
                <User
                  className={cn(
                    "text-gray-400",
                    isFullscreen
                      ? "h-12 w-12"
                      : layoutType === "fullscreen"
                      ? "h-8 w-8"
                      : "h-6 w-6"
                  )}
                />
              </div>
              {(isFullscreen || layoutType === "fullscreen") && (
                <p className="text-gray-300 text-lg mt-4">{truncatedName}</p>
              )}
            </div>
          </div>
        )}

        {/* Participant info overlay */}
        {(isFullscreen || layoutType === "fullscreen") && (
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Badge
                  variant={isLocal ? "default" : "secondary"}
                  className="px-2 py-1 text-sm"
                >
                  <span className="truncate max-w-[200px]">
                    {truncatedName} {isLocal && "(You)"}
                  </span>
                </Badge>

                {(isPresenting || screenShareStream) && (
                  <Badge variant="destructive" className="px-2 py-1 text-sm">
                    {screenShareStream ? "Screen Sharing" : "Presenting"}
                  </Badge>
                )}
              </div>

              <div className="flex items-center space-x-2">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="p-1.5 rounded-full bg-black/50">
                      {micOn ? (
                        <Mic className="h-5 w-5 text-white" />
                      ) : (
                        <MicOff className="h-5 w-5 text-red-500" />
                      )}
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    {micOn ? "Microphone is on" : "Microphone is off"}
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="p-1.5 rounded-full bg-black/50">
                      {connectionQualityIndicator()}
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    Connection quality: {connectionQuality || "unknown"}
                  </TooltipContent>
                </Tooltip>
              </div>
            </div>
          </div>
        )}

        {/* Active speaker indicator */}
        {isActiveSpeaker && (
          <div className="absolute top-2 left-2">
            <div className="animate-pulse bg-blue-500 rounded-full w-3 h-3" />
          </div>
        )}

        {/* Video loading indicator */}
        {(webcamOn || screenShareStream) &&
          !(isVideoPlaying || isScreenSharePlaying) && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white" />
            </div>
          )}
      </div>
    );
  }
);

export default ParticipantView;