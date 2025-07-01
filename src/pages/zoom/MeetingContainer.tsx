// // // import React, { useState, useEffect, useRef } from "react";
// // // import {
// // //   useMeeting,
// // //   useParticipant,
// // //   Constants,
// // // } from "@videosdk.live/react-sdk";
// // // import { useToast } from "@/hooks/use-toast";
// // // import { Button } from "@/components/ui/button";
// // // import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// // // import { ScrollArea } from "@/components/ui/scroll-area";
// // // import { Input } from "@/components/ui/input";
// // // import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
// // // import { Progress } from "@/components/ui/progress";
// // // import {
// // //   Mic,
// // //   MicOff,
// // //   Video,
// // //   VideoOff,
// // //   Share2,
// // //   Maximize,
// // //   Minimize,
// // //   PhoneOff,
// // //   Circle,
// // //   ScreenShare as ScreenShareIcon,
// // //   Hand,
// // // } from "lucide-react";
// // // import ParticipantView from "./ParticipantView";

// // // interface ChatMessage {
// // //   id: string;
// // //   sender: string;
// // //   message: string;
// // //   timestamp: string;
// // //   isCurrentUser: boolean;
// // // }

// // // interface PollOption {
// // //   id: string;
// // //   text: string;
// // //   votes: number;
// // // }

// // // interface Poll {
// // //   id: string;
// // //   question: string;
// // //   options: PollOption[];
// // //   totalVotes: number;
// // // }

// // // interface MeetingContainerProps {
// // //   onMeetingLeave: () => void;
// // //   setIsMeetingLeft: (value: boolean) => void;
// // // }

// // // const MeetingContainer: React.FC<MeetingContainerProps> = ({
// // //   onMeetingLeave,
// // //   setIsMeetingLeft,
// // // }) => {
// // //   const { toast } = useToast();
// // //   const meeting = useMeeting({
// // //     onError: (error) => {
// // //       toast({
// // //         title: "Meeting Error",
// // //         description: error.message,
// // //         variant: "destructive",
// // //       });
// // //     },
// // //     onMeetingLeft: () => {
// // //       onMeetingLeave();
// // //       setIsMeetingLeft(true);
// // //     },
// // //   });

// // //   const [activeTab, setActiveTab] = useState("participants");
// // //   const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
// // //   const [newMessage, setNewMessage] = useState("");
// // //   const [polls, setPolls] = useState<Poll[]>([]);
// // //   const [raisedHands, setRaisedHands] = useState<string[]>([]);
// // //   const [isFullscreen, setIsFullscreen] = useState(false);

// // //   // Sample data initialization
// // //   useEffect(() => {
// // //     setChatMessages([
// // //       {
// // //         id: "1",
// // //         sender: "John Doe",
// // //         message: "Hello everyone!",
// // //         timestamp: new Date().toISOString(),
// // //         isCurrentUser: false,
// // //       },
// // //       {
// // //         id: "2",
// // //         sender: "You",
// // //         message: "Hi John!",
// // //         timestamp: new Date().toISOString(),
// // //         isCurrentUser: true,
// // //       },
// // //     ]);

// // //     setPolls([
// // //       {
// // //         id: "1",
// // //         question: "How useful is this seminar?",
// // //         options: [
// // //           { id: "1", text: "Very useful", votes: 15 },
// // //           { id: "2", text: "Somewhat useful", votes: 8 },
// // //           { id: "3", text: "Not useful", votes: 2 },
// // //         ],
// // //         totalVotes: 25,
// // //       },
// // //     ]);
// // //   }, []);

// // //   const handleSendMessage = () => {
// // //     if (newMessage.trim()) {
// // //       const message: ChatMessage = {
// // //         id: Date.now().toString(),
// // //         sender: "You",
// // //         message: newMessage,
// // //         timestamp: new Date().toISOString(),
// // //         isCurrentUser: true,
// // //       };
// // //       setChatMessages([...chatMessages, message]);
// // //       setNewMessage("");
// // //     }
// // //   };

// // //   const handleVote = (pollId: string, optionId: string) => {
// // //     setPolls(
// // //       polls.map((poll) => {
// // //         if (poll.id === pollId) {
// // //           const updatedOptions = poll.options.map((option) => {
// // //             if (option.id === optionId) {
// // //               return { ...option, votes: option.votes + 1 };
// // //             }
// // //             return option;
// // //           });
// // //           return {
// // //             ...poll,
// // //             options: updatedOptions,
// // //             totalVotes: poll.totalVotes + 1,
// // //           };
// // //         }
// // //         return poll;
// // //       })
// // //     );
// // //   };

// // //   const toggleRaiseHand = () => {
// // //     if (raisedHands.includes(meeting?.localParticipant?.id)) {
// // //       setRaisedHands(
// // //         raisedHands.filter((id) => id !== meeting?.localParticipant?.id)
// // //       );
// // //     } else {
// // //       setRaisedHands([...raisedHands, meeting?.localParticipant?.id]);
// // //     }
// // //   };

// // //   const toggleFullscreen = () => {
// // //     if (!document.fullscreenElement) {
// // //       document.documentElement.requestFullscreen().catch((err) => {
// // //         toast({
// // //           title: "Fullscreen Error",
// // //           description: err.message,
// // //           variant: "destructive",
// // //         });
// // //       });
// // //       setIsFullscreen(true);
// // //     } else {
// // //       if (document.exitFullscreen) {
// // //         document.exitFullscreen();
// // //         setIsFullscreen(false);
// // //       }
// // //     }
// // //   };

// // //   const copyMeetingLink = () => {
// // //     if (meeting?.meetingId) {
// // //       const link = `${window.location.origin}/meeting/${meeting.meetingId}`;
// // //       navigator.clipboard.writeText(link);
// // //       toast({
// // //         title: "Link Copied",
// // //         description: "Meeting link copied to clipboard",
// // //       });
// // //     }
// // //   };

// // //   const RecordingButton = () => {
// // //     const isRecording =
// // //       meeting?.recordingState === Constants.recordingEvents.RECORDING_STARTED;

// // //     const handleRecordingClick = () => {
// // //       if (isRecording) {
// // //         meeting?.stopRecording();
// // //       } else {
// // //         meeting?.startRecording();
// // //       }
// // //     };

// // //     return (
// // //       <Button
// // //         onClick={handleRecordingClick}
// // //         variant={isRecording ? "destructive" : "secondary"}
// // //         size="icon"
// // //         className="rounded-full w-12 h-12 relative"
// // //       >
// // //         <Circle className="h-5 w-5" />
// // //         {isRecording && (
// // //           <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
// // //         )}
// // //       </Button>
// // //     );
// // //   };

// // //   const ScreenShareButton = () => {
// // //     const isScreenSharing = meeting?.localScreenShareOn;

// // //     const handleScreenShareClick = (e: React.MouseEvent<HTMLButtonElement>) => {
// // //       e.preventDefault();
// // //       meeting?.toggleScreenShare();
// // //     };

// // //     return (
// // //       <Button
// // //         onClick={handleScreenShareClick}
// // //         variant={isScreenSharing ? "default" : "secondary"}
// // //         size="icon"
// // //         className="rounded-full w-12 h-12"
// // //         disabled={meeting?.presenterId ? !isScreenSharing : false}
// // //       >
// // //         <ScreenShareIcon className="h-5 w-5" />
// // //       </Button>
// // //     );
// // //   };

// // //   if (!meeting || !meeting.localParticipant) {
// // //     return (
// // //       <div className="flex items-center justify-center h-64">
// // //         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
// // //         <span className="ml-3">Connecting to meeting...</span>
// // //       </div>
// // //     );
// // //   }

// // //   const participants = [...meeting.participants.keys()];
// // //   const isHost = true; // Set this based on your application logic

// // //   return (
// // //     <div className="relative h-full flex">
// // //       {/* Main Video Area */}
// // //       <div className="flex-1 bg-black">
// // //         <ParticipantView
// // //           participantId={meeting.localParticipant.id}
// // //           layoutType="fullscreen"
// // //         //   isSpeaker={true}
// // //         />
// // //       </div>

// // //       {/* Sidebar */}
// // //       <div className="w-80 bg-gray-800 border-l border-gray-700 flex flex-col">
// // //         <Tabs defaultValue="participants" className="flex-1 flex flex-col">
// // //           <TabsList className="grid grid-cols-3 bg-gray-800">
// // //             <TabsTrigger value="participants">People</TabsTrigger>
// // //             <TabsTrigger value="chat">Chat</TabsTrigger>
// // //             <TabsTrigger value="polls">Polls</TabsTrigger>
// // //           </TabsList>

// // //           <TabsContent value="participants" className="flex-1 overflow-auto">
// // //             <ScrollArea className="h-full">
// // //               <div className="space-y-4 p-4">
// // //                 <div className="flex items-center justify-between">
// // //                   <h3 className="font-medium text-white">
// // //                     Participants ({participants.length})
// // //                   </h3>
// // //                   <Button
// // //                     variant={
// // //                       raisedHands.includes(meeting.localParticipant.id)
// // //                         ? "default"
// // //                         : "outline"
// // //                     }
// // //                     size="sm"
// // //                     onClick={toggleRaiseHand}
// // //                   >
// // //                     <Hand className="h-4 w-4 mr-2" />
// // //                     {raisedHands.includes(meeting.localParticipant.id)
// // //                       ? "Lower Hand"
// // //                       : "Raise Hand"}
// // //                   </Button>
// // //                 </div>

// // //                 <div className="space-y-2">
// // //                   {participants.map((participantId) => (
// // //                     <div
// // //                       key={participantId}
// // //                       className="relative rounded-lg overflow-hidden bg-gray-900"
// // //                     >
// // //                       <ParticipantView
// // //                         participantId={participantId}
// // //                         layoutType="sidebar"
// // //                       />
// // //                       <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/80 to-transparent">
// // //                         <div className="text-white text-sm">
// // //                           {meeting.participants.get(participantId)
// // //                             ?.displayName || "Participant"}
// // //                         </div>
// // //                       </div>
// // //                       {raisedHands.includes(participantId) && (
// // //                         <div className="absolute top-2 right-2 bg-yellow-500 rounded-full p-1">
// // //                           <Hand className="h-3 w-3 text-white" />
// // //                         </div>
// // //                       )}
// // //                     </div>
// // //                   ))}
// // //                 </div>
// // //               </div>
// // //             </ScrollArea>
// // //           </TabsContent>

// // //           <TabsContent value="chat" className="flex-1 flex flex-col">
// // //             <div className="flex-1 overflow-hidden flex flex-col">
// // //               <ScrollArea className="flex-1 p-4">
// // //                 <div className="space-y-4">
// // //                   {chatMessages.map((message) => (
// // //                     <div
// // //                       key={message.id}
// // //                       className={`flex ${
// // //                         message.isCurrentUser ? "justify-end" : "justify-start"
// // //                       }`}
// // //                     >
// // //                       <div
// // //                         className={`max-w-xs p-3 rounded-lg ${
// // //                           message.isCurrentUser
// // //                             ? "bg-blue-600 text-white"
// // //                             : "bg-gray-700 text-white"
// // //                         }`}
// // //                       >
// // //                         {!message.isCurrentUser && (
// // //                           <p className="text-xs font-semibold mb-1">
// // //                             {message.sender}
// // //                           </p>
// // //                         )}
// // //                         <p className="text-sm">{message.message}</p>
// // //                         <p className="text-xs opacity-70 mt-1">
// // //                           {new Date(message.timestamp).toLocaleTimeString([], {
// // //                             hour: "2-digit",
// // //                             minute: "2-digit",
// // //                           })}
// // //                         </p>
// // //                       </div>
// // //                     </div>
// // //                   ))}
// // //                 </div>
// // //               </ScrollArea>
// // //             </div>
// // //             <div className="p-3 border-t border-gray-700">
// // //               <div className="flex gap-2">
// // //                 <Input
// // //                   value={newMessage}
// // //                   onChange={(e) => setNewMessage(e.target.value)}
// // //                   placeholder="Type a message..."
// // //                   className="flex-1 bg-gray-700 border-gray-600 text-white"
// // //                   onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
// // //                 />
// // //                 <Button onClick={handleSendMessage}>Send</Button>
// // //               </div>
// // //             </div>
// // //           </TabsContent>

// // //           <TabsContent value="polls" className="flex-1 overflow-auto">
// // //             <ScrollArea className="h-full">
// // //               <div className="space-y-4 p-4">
// // //                 {polls.length > 0 ? (
// // //                   polls.map((poll) => (
// // //                     <Card key={poll.id} className="bg-gray-700 border-gray-600">
// // //                       <CardHeader>
// // //                         <CardTitle className="text-white">
// // //                           {poll.question}
// // //                         </CardTitle>
// // //                       </CardHeader>
// // //                       <CardContent>
// // //                         <div className="space-y-3">
// // //                           {poll.options.map((option) => (
// // //                             <div key={option.id} className="space-y-1">
// // //                               <Button
// // //                                 variant="outline"
// // //                                 className="w-full text-left justify-start bg-gray-600 border-gray-500 hover:bg-gray-500 text-white"
// // //                                 onClick={() => handleVote(poll.id, option.id)}
// // //                               >
// // //                                 {option.text}
// // //                               </Button>
// // //                               <div className="flex items-center gap-2">
// // //                                 <Progress
// // //                                   value={(option.votes / poll.totalVotes) * 100}
// // //                                   className="h-2 bg-gray-600"
// // //                                 />
// // //                                 <span className="text-xs text-gray-400">
// // //                                   {Math.round(
// // //                                     (option.votes / poll.totalVotes) * 100
// // //                                   )}
// // //                                   % ({option.votes})
// // //                                 </span>
// // //                               </div>
// // //                             </div>
// // //                           ))}
// // //                         </div>
// // //                       </CardContent>
// // //                     </Card>
// // //                   ))
// // //                 ) : (
// // //                   <div className="flex-1 flex items-center justify-center text-gray-400">
// // //                     No polls available
// // //                   </div>
// // //                 )}
// // //               </div>
// // //             </ScrollArea>
// // //           </TabsContent>
// // //         </Tabs>
// // //       </div>

// // //       {/* Meeting Controls */}
// // //       <div className="fixed bottom-0 left-0 right-0 bg-gray-900 py-3 px-4 flex justify-center space-x-4 z-50">
// // //         <Button
// // //           onClick={() => meeting?.toggleMic()}
// // //           variant={meeting?.localParticipant?.micOn ? "default" : "destructive"}
// // //           size="icon"
// // //           className="rounded-full w-12 h-12"
// // //         >
// // //           {meeting?.localParticipant?.micOn ? (
// // //             <Mic className="h-5 w-5" />
// // //           ) : (
// // //             <MicOff className="h-5 w-5" />
// // //           )}
// // //         </Button>

// // //         <Button
// // //           onClick={() => meeting?.toggleWebcam()}
// // //           variant={
// // //             meeting?.localParticipant?.webcamOn ? "default" : "destructive"
// // //           }
// // //           size="icon"
// // //           className="rounded-full w-12 h-12"
// // //         >
// // //           {meeting?.localParticipant?.webcamOn ? (
// // //             <Video className="h-5 w-5" />
// // //           ) : (
// // //             <VideoOff className="h-5 w-5" />
// // //           )}
// // //         </Button>

// // //         <ScreenShareButton />

// // //         <RecordingButton />

// // //         <Button
// // //           onClick={copyMeetingLink}
// // //           variant="secondary"
// // //           size="icon"
// // //           className="rounded-full w-12 h-12"
// // //         >
// // //           <Share2 className="h-5 w-5" />
// // //         </Button>

// // //         <Button
// // //           onClick={toggleFullscreen}
// // //           variant="secondary"
// // //           size="icon"
// // //           className="rounded-full w-12 h-12"
// // //         >
// // //           {isFullscreen ? (
// // //             <Minimize className="h-5 w-5" />
// // //           ) : (
// // //             <Maximize className="h-5 w-5" />
// // //           )}
// // //         </Button>

// // //         <Button
// // //           variant="destructive"
// // //           size="icon"
// // //           className="rounded-full w-12 h-12"
// // //           onClick={() => meeting?.leave()}
// // //         >
// // //           <PhoneOff className="h-5 w-5" />
// // //         </Button>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default MeetingContainer;

// // import React, { useState, useEffect } from "react";
// // import { useMeeting, Constants } from "@videosdk.live/react-sdk";
// // import { useToast } from "@/hooks/use-toast";
// // import { Button } from "@/components/ui/button";
// // import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// // import { ScrollArea } from "@/components/ui/scroll-area";
// // import { Input } from "@/components/ui/input";
// // import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
// // import { Progress } from "@/components/ui/progress";
// // import {
// //   Mic,
// //   MicOff,
// //   Video,
// //   VideoOff,
// //   Share2,
// //   Maximize,
// //   Minimize,
// //   PhoneOff,
// //   Circle,
// //   ScreenShare as ScreenShareIcon,
// //   Hand,
// // } from "lucide-react";
// // import ParticipantView from "./ParticipantView";


// // interface ChatMessage {
// //   id: string;
// //   sender: string;
// //   message: string;
// //   timestamp: string;
// //   isCurrentUser: boolean;
// // }

// // interface PollOption {
// //   id: string;
// //   text: string;
// //   votes: number;
// // }

// // interface Poll {
// //   id: string;
// //   question: string;
// //   options: PollOption[];
// //   totalVotes: number;
// // }

// // interface MeetingContainerProps {
// //   onMeetingLeave: () => void;
// //   setIsMeetingLeft: (value: boolean) => void;
// // }

// // const MeetingContainer: React.FC<MeetingContainerProps> = ({
// //   onMeetingLeave,
// //   setIsMeetingLeft,
// // }) => {
// //   const { toast } = useToast();
// //   const meeting = useMeeting({
// //     onError: (error) => {
// //       toast({
// //         title: "Meeting Error",
// //         description: error.message,
// //         variant: "destructive",
// //       });
// //     },
// //     onMeetingLeft: () => {
// //       onMeetingLeave();
// //       setIsMeetingLeft(true);
// //     },
// //   });

// //   const [activeTab, setActiveTab] = useState("participants");
// //   const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
// //   const [newMessage, setNewMessage] = useState("");
// //   const [polls, setPolls] = useState<Poll[]>([]);
// //   const [raisedHands, setRaisedHands] = useState<string[]>([]);
// //   const [isFullscreen, setIsFullscreen] = useState(false);

// //   // Initialize sample data
// //   useEffect(() => {
// //     setChatMessages([
// //       {
// //         id: "1",
// //         sender: "John Doe",
// //         message: "Hello everyone!",
// //         timestamp: new Date().toISOString(),
// //         isCurrentUser: false,
// //       },
// //       {
// //         id: "2",
// //         sender: "You",
// //         message: "Hi John!",
// //         timestamp: new Date().toISOString(),
// //         isCurrentUser: true,
// //       },
// //     ]);

// //     setPolls([
// //       {
// //         id: "1",
// //         question: "How useful is this seminar?",
// //         options: [
// //           { id: "1", text: "Very useful", votes: 15 },
// //           { id: "2", text: "Somewhat useful", votes: 8 },
// //           { id: "3", text: "Not useful", votes: 2 },
// //         ],
// //         totalVotes: 25,
// //       },
// //     ]);

// //     // Handle fullscreen change events
// //     const handleFullscreenChange = () => {
// //       setIsFullscreen(!!document.fullscreenElement);
// //     };

// //     document.addEventListener("fullscreenchange", handleFullscreenChange);
// //     return () => {
// //       document.removeEventListener("fullscreenchange", handleFullscreenChange);
// //     };
// //   }, []);

// //   const handleSendMessage = () => {
// //     if (newMessage.trim()) {
// //       const message: ChatMessage = {
// //         id: Date.now().toString(),
// //         sender: "You",
// //         message: newMessage,
// //         timestamp: new Date().toISOString(),
// //         isCurrentUser: true,
// //       };
// //       setChatMessages([...chatMessages, message]);
// //       setNewMessage("");
// //     }
// //   };

// //   const handleVote = (pollId: string, optionId: string) => {
// //     setPolls(
// //       polls.map((poll) => {
// //         if (poll.id === pollId) {
// //           const updatedOptions = poll.options.map((option) => {
// //             if (option.id === optionId) {
// //               return { ...option, votes: option.votes + 1 };
// //             }
// //             return option;
// //           });
// //           return {
// //             ...poll,
// //             options: updatedOptions,
// //             totalVotes: poll.totalVotes + 1,
// //           };
// //         }
// //         return poll;
// //       })
// //     );
// //   };

// //   const toggleRaiseHand = () => {
// //     if (raisedHands.includes(meeting?.localParticipant?.id)) {
// //       setRaisedHands(
// //         raisedHands.filter((id) => id !== meeting?.localParticipant?.id)
// //       );
// //     } else {
// //       setRaisedHands([...raisedHands, meeting?.localParticipant?.id]);
// //     }
// //   };

// //   const toggleFullscreen = async () => {
// //     try {
// //       if (!isFullscreen) {
// //         await document.documentElement.requestFullscreen();
// //       } else {
// //         await document.exitFullscreen();
// //       }
// //     } catch (error) {
// //       toast({
// //         title: "Fullscreen Error",
// //         description: "Could not toggle fullscreen mode",
// //         variant: "destructive",
// //       });
// //     }
// //   };

// //   const copyMeetingLink = () => {
// //     if (meeting?.meetingId) {
// //       navigator.clipboard.writeText(
// //         `${window.location.origin}/meeting/${meeting.meetingId}`
// //       );
// //       toast({
// //         title: "Link Copied",
// //         description: "Meeting link copied to clipboard",
// //       });
// //     }
// //   };

// //   const RecordingButton = () => {
// //     const isRecording =
// //       meeting?.recordingState === Constants.recordingEvents.RECORDING_STARTED;

// //     return (
// //       <Button
// //         onClick={() =>
// //           isRecording ? meeting?.stopRecording() : meeting?.startRecording()
// //         }
// //         variant={isRecording ? "destructive" : "secondary"}
// //         size="icon"
// //         className="rounded-full w-12 h-12 relative"
// //       >
// //         <Circle className="h-5 w-5" />
// //         {isRecording && (
// //           <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
// //         )}
// //       </Button>
// //     );
// //   };

// //   const ScreenShareButton = () => {
// //     const isScreenSharing = meeting?.localScreenShareOn;

// //     return (
// //       <Button
// //         onClick={() => meeting?.toggleScreenShare()}
// //         variant={isScreenSharing ? "default" : "secondary"}
// //         size="icon"
// //         className="rounded-full w-12 h-12"
// //         disabled={!!meeting?.presenterId && !isScreenSharing}
// //       >
// //         <ScreenShareIcon className="h-5 w-5" />
// //       </Button>
// //     );
// //   };

// //   if (!meeting || !meeting.localParticipant) {
// //     return (
// //       <div className="flex items-center justify-center h-full">
// //         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
// //         <span className="ml-3">Connecting to meeting...</span>
// //       </div>
// //     );
// //   }

// //   const participants = [...meeting.participants.keys()];
// //   const isHost = true; // Set based on your auth logic

// //   return (
// //     <div className="flex flex-col h-full bg-gray-900">
// //       {/* Main Content Area */}
// //       <div className="flex flex-1 overflow-hidden">
// //         {/* Host View - Full Screen Main Area */}
// //         <div className="flex-1 bg-black flex flex-col">
// //           <div className="relative flex-1">
// //             <ParticipantView
// //               participantId={meeting.localParticipant.id}
// //               layoutType="fullscreen"
// //               className="absolute inset-0"
// //             />
// //             <div className="absolute bottom-4 left-4 bg-black/70 text-white px-3 py-1 rounded-md">
// //               {meeting.localParticipant.displayName || "You"} (Host)
// //               {meeting.localParticipant.micOn ? "" : " 🔇"}
// //             </div>
// //           </div>
// //         </div>

// //         {/* Participants Sidebar */}
// //         <div className="w-80 border-l border-gray-700 bg-gray-800 flex flex-col">
// //           <Tabs defaultValue="participants" className="flex-1 flex flex-col">
// //             <TabsList className="grid grid-cols-3 bg-gray-800 rounded-none">
// //               <TabsTrigger value="participants">People</TabsTrigger>
// //               <TabsTrigger value="chat">Chat</TabsTrigger>
// //               <TabsTrigger value="polls">Polls</TabsTrigger>
// //             </TabsList>

// //             <TabsContent value="participants" className="flex-1 overflow-auto">
// //               <ScrollArea className="h-full">
// //                 <div className="p-4">
// //                   <div className="flex justify-between items-center mb-4">
// //                     <h3 className="font-medium text-white">
// //                       Participants ({participants.length + 1})
// //                     </h3>
// //                     <Button
// //                       variant={
// //                         raisedHands.includes(meeting.localParticipant.id)
// //                           ? "default"
// //                           : "outline"
// //                       }
// //                       size="sm"
// //                       onClick={toggleRaiseHand}
// //                     >
// //                       <Hand className="h-4 w-4 mr-2" />
// //                       {raisedHands.includes(meeting.localParticipant.id)
// //                         ? "Lower Hand"
// //                         : "Raise Hand"}
// //                     </Button>
// //                   </div>

// //                   <div className="space-y-4">
// //                     {participants.map((participantId) => (
// //                       <div key={participantId} className="space-y-2">
// //                         <div className="relative rounded-lg overflow-hidden bg-gray-900 aspect-video">
// //                           <ParticipantView
// //                             participantId={participantId}
// //                             layoutType="sidebar"
// //                             className="absolute inset-0"
// //                           />
// //                           {raisedHands.includes(participantId) && (
// //                             <div className="absolute top-2 right-2 bg-yellow-500 rounded-full p-1">
// //                               <Hand className="h-3 w-3 text-white" />
// //                             </div>
// //                           )}
// //                         </div>
// //                         <div className="text-sm text-white">
// //                           {meeting.participants.get(participantId)?.displayName}
// //                         </div>
// //                       </div>
// //                     ))}
// //                   </div>
// //                 </div>
// //               </ScrollArea>
// //             </TabsContent>

// //             <TabsContent value="chat" className="flex-1 flex flex-col">
// //               <div className="flex-1 overflow-hidden flex flex-col">
// //                 <ScrollArea className="flex-1">
// //                   <div className="p-4 space-y-4">
// //                     {chatMessages.map((message) => (
// //                       <div
// //                         key={message.id}
// //                         className={`flex ${
// //                           message.isCurrentUser
// //                             ? "justify-end"
// //                             : "justify-start"
// //                         }`}
// //                       >
// //                         <div
// //                           className={`max-w-xs p-3 rounded-lg ${
// //                             message.isCurrentUser
// //                               ? "bg-blue-600 text-white"
// //                               : "bg-gray-700 text-white"
// //                           }`}
// //                         >
// //                           {!message.isCurrentUser && (
// //                             <p className="text-xs font-semibold mb-1">
// //                               {message.sender}
// //                             </p>
// //                           )}
// //                           <p className="text-sm">{message.message}</p>
// //                           <p className="text-xs opacity-70 mt-1">
// //                             {new Date(message.timestamp).toLocaleTimeString(
// //                               [],
// //                               {
// //                                 hour: "2-digit",
// //                                 minute: "2-digit",
// //                               }
// //                             )}
// //                           </p>
// //                         </div>
// //                       </div>
// //                     ))}
// //                   </div>
// //                 </ScrollArea>
// //                 <div className="p-3 border-t border-gray-700">
// //                   <div className="flex gap-2">
// //                     <Input
// //                       value={newMessage}
// //                       onChange={(e) => setNewMessage(e.target.value)}
// //                       placeholder="Type a message..."
// //                       className="flex-1 bg-gray-700 border-gray-600 text-white"
// //                       onKeyDown={(e) =>
// //                         e.key === "Enter" && handleSendMessage()
// //                       }
// //                     />
// //                     <Button onClick={handleSendMessage}>Send</Button>
// //                   </div>
// //                 </div>
// //               </div>
// //             </TabsContent>

// //             <TabsContent value="polls" className="flex-1 overflow-auto">
// //               <ScrollArea className="h-full">
// //                 <div className="p-4 space-y-4">
// //                   {polls.length > 0 ? (
// //                     polls.map((poll) => (
// //                       <Card
// //                         key={poll.id}
// //                         className="bg-gray-700 border-gray-600"
// //                       >
// //                         <CardHeader>
// //                           <CardTitle className="text-white">
// //                             {poll.question}
// //                           </CardTitle>
// //                         </CardHeader>
// //                         <CardContent>
// //                           <div className="space-y-3">
// //                             {poll.options.map((option) => (
// //                               <div key={option.id} className="space-y-1">
// //                                 <Button
// //                                   variant="outline"
// //                                   className="w-full text-left justify-start bg-gray-600 border-gray-500 hover:bg-gray-500 text-white"
// //                                   onClick={() => handleVote(poll.id, option.id)}
// //                                 >
// //                                   {option.text}
// //                                 </Button>
// //                                 <div className="flex items-center gap-2">
// //                                   <Progress
// //                                     value={
// //                                       (option.votes / poll.totalVotes) * 100
// //                                     }
// //                                     className="h-2 bg-gray-600"
// //                                   />
// //                                   <span className="text-xs text-gray-400">
// //                                     {Math.round(
// //                                       (option.votes / poll.totalVotes) * 100
// //                                     )}
// //                                     % ({option.votes})
// //                                   </span>
// //                                 </div>
// //                               </div>
// //                             ))}
// //                           </div>
// //                         </CardContent>
// //                       </Card>
// //                     ))
// //                   ) : (
// //                     <div className="flex items-center justify-center h-full text-gray-400">
// //                       No polls available
// //                     </div>
// //                   )}
// //                 </div>
// //               </ScrollArea>
// //             </TabsContent>
// //           </Tabs>
// //         </div>
// //       </div>

// //       {/* Meeting Controls */}
// //       <div className="bg-gray-900 py-3 px-4 flex justify-center space-x-4">
// //         <Button
// //           onClick={() => meeting?.toggleMic()}
// //           variant={meeting?.localParticipant?.micOn ? "default" : "destructive"}
// //           size="icon"
// //           className="rounded-full w-12 h-12"
// //         >
// //           {meeting?.localParticipant?.micOn ? (
// //             <Mic className="h-5 w-5" />
// //           ) : (
// //             <MicOff className="h-5 w-5" />
// //           )}
// //         </Button>

// //         <Button
// //           onClick={() => meeting?.toggleWebcam()}
// //           variant={
// //             meeting?.localParticipant?.webcamOn ? "default" : "destructive"
// //           }
// //           size="icon"
// //           className="rounded-full w-12 h-12"
// //         >
// //           {meeting?.localParticipant?.webcamOn ? (
// //             <Video className="h-5 w-5" />
// //           ) : (
// //             <VideoOff className="h-5 w-5" />
// //           )}
// //         </Button>

// //         <ScreenShareButton />

// //         <RecordingButton />

// //         <Button
// //           onClick={copyMeetingLink}
// //           variant="secondary"
// //           size="icon"
// //           className="rounded-full w-12 h-12"
// //         >
// //           <Share2 className="h-5 w-5" />
// //         </Button>

// //         <Button
// //           onClick={toggleFullscreen}
// //           variant="secondary"
// //           size="icon"
// //           className="rounded-full w-12 h-12"
// //         >
// //           {isFullscreen ? (
// //             <Minimize className="h-5 w-5" />
// //           ) : (
// //             <Maximize className="h-5 w-5" />
// //           )}
// //         </Button>

// //         <Button
// //           variant="destructive"
// //           size="icon"
// //           className="rounded-full w-12 h-12"
// //           onClick={() => meeting?.leave()}
// //         >
// //           <PhoneOff className="h-5 w-5" />
// //         </Button>
// //       </div>
// //     </div>
// //   );
// // };

// // export default MeetingContainer;
// import React, { useState, useEffect } from "react";
// import { useMeeting, Constants } from "@videosdk.live/react-sdk";
// import { useToast } from "@/hooks/use-toast";
// import { Button } from "@/components/ui/button";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { ScrollArea } from "@/components/ui/scroll-area";
// import { Input } from "@/components/ui/input";
// import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
// import { Progress } from "@/components/ui/progress";
// import {
//   Mic,
//   MicOff,
//   Video,
//   VideoOff,
//   Share2,
//   Maximize,
//   Minimize,
//   PhoneOff,
//   Circle,
//   ScreenShare as ScreenShareIcon,
//   ScreenShareOff,
//   Hand,
// } from "lucide-react";
// import ParticipantView from "./ParticipantView";

// interface ChatMessage {
//   id: string;
//   sender: string;
//   message: string;
//   timestamp: string;
//   isCurrentUser: boolean;
// }

// interface PollOption {
//   id: string;
//   text: string;
//   votes: number;
// }

// interface Poll {
//   id: string;
//   question: string;
//   options: PollOption[];
//   totalVotes: number;
// }

// interface MeetingContainerProps {
//   onMeetingLeave: () => void;
//   setIsMeetingLeft: (value: boolean) => void;
// }

// const MeetingContainer: React.FC<MeetingContainerProps> = ({
//   onMeetingLeave,
//   setIsMeetingLeft,
// }) => {
//   const { toast } = useToast();
//   const meeting = useMeeting({
//     onError: (error) => {
//       toast({
//         title: "Meeting Error",
//         description: error.message,
//         variant: "destructive",
//       });
//     },
//     onMeetingLeft: () => {
//       onMeetingLeave();
//       setIsMeetingLeft(true);
//     },
//   });

//   const [activeTab, setActiveTab] = useState("participants");
//   const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
//   const [newMessage, setNewMessage] = useState("");
//   const [polls, setPolls] = useState<Poll[]>([]);
//   const [raisedHands, setRaisedHands] = useState<string[]>([]);
//   const [isFullscreen, setIsFullscreen] = useState(false);

//   useEffect(() => {
//     setChatMessages([
//       {
//         id: "1",
//         sender: "John Doe",
//         message: "Hello everyone!",
//         timestamp: new Date().toISOString(),
//         isCurrentUser: false,
//       },
//       {
//         id: "2",
//         sender: "You",
//         message: "Hi John!",
//         timestamp: new Date().toISOString(),
//         isCurrentUser: true,
//       },
//     ]);

//     setPolls([
//       {
//         id: "1",
//         question: "How useful is this seminar?",
//         options: [
//           { id: "1", text: "Very useful", votes: 15 },
//           { id: "2", text: "Somewhat useful", votes: 8 },
//           { id: "3", text: "Not useful", votes: 2 },
//         ],
//         totalVotes: 25,
//       },
//     ]);

//     const handleFullscreenChange = () => {
//       setIsFullscreen(!!document.fullscreenElement);
//     };

//     document.addEventListener("fullscreenchange", handleFullscreenChange);
//     return () => {
//       document.removeEventListener("fullscreenchange", handleFullscreenChange);
//     };
//   }, []);

//   const handleSendMessage = () => {
//     if (newMessage.trim()) {
//       const message: ChatMessage = {
//         id: Date.now().toString(),
//         sender: "You",
//         message: newMessage,
//         timestamp: new Date().toISOString(),
//         isCurrentUser: true,
//       };
//       setChatMessages([...chatMessages, message]);
//       setNewMessage("");
//     }
//   };

//   const handleVote = (pollId: string, optionId: string) => {
//     setPolls(
//       polls.map((poll) => {
//         if (poll.id === pollId) {
//           const updatedOptions = poll.options.map((option) => {
//             if (option.id === optionId) {
//               return { ...option, votes: option.votes + 1 };
//             }
//             return option;
//           });
//           return {
//             ...poll,
//             options: updatedOptions,
//             totalVotes: poll.totalVotes + 1,
//           };
//         }
//         return poll;
//       })
//     );
//   };

//   const toggleRaiseHand = () => {
//     if (raisedHands.includes(meeting?.localParticipant?.id)) {
//       setRaisedHands(
//         raisedHands.filter((id) => id !== meeting?.localParticipant?.id)
//       );
//     } else {
//       setRaisedHands([...raisedHands, meeting?.localParticipant?.id]);
//     }
//   };

//   const toggleFullscreen = async () => {
//     try {
//       if (!isFullscreen) {
//         await document.documentElement.requestFullscreen();
//       } else {
//         await document.exitFullscreen();
//       }
//     } catch (error) {
//       toast({
//         title: "Fullscreen Error",
//         description: "Could not toggle fullscreen mode",
//         variant: "destructive",
//       });
//     }
//   };

//   const copyMeetingLink = () => {
//     if (meeting?.meetingId) {
//       navigator.clipboard.writeText(
//         `${window.location.origin}/meeting/${meeting.meetingId}`
//       );
//       toast({
//         title: "Link Copied",
//         description: "Meeting link copied to clipboard",
//       });
//     }
//   };

//   const handleScreenShare = async () => {
//     try {
//       if (meeting.localScreenShareOn) {
//         meeting.toggleScreenShare();
//       } else {
//         // For Windows screen sharing
//         const stream = await navigator.mediaDevices.getDisplayMedia({
//           video: {
//             displaySurface: "monitor", // or "window", "application"
//             frameRate: { ideal: 30, max: 60 },
//           },
//           audio: false,
//         });
        
//         // Start screen share with the obtained stream
//         meeting.toggleScreenShare(stream);
        
//         // Handle when user stops sharing via browser controls
//         stream.getVideoTracks()[0].onended = () => {
//           meeting.toggleScreenShare();
//         };
//       }
//     } catch (error) {
//       toast({
//         title: "Screen Share Error",
//         description: "Could not start screen sharing",
//         variant: "destructive",
//       });
//     }
//   };

//   const ScreenShareButton = () => {
//     const isScreenSharing = meeting?.localScreenShareOn;

//     return (
//       <Button
//         onClick={handleScreenShare}
//         variant={isScreenSharing ? "default" : "secondary"}
//         size="icon"
//         className="rounded-full w-12 h-12"
//         disabled={!!meeting?.presenterId && !isScreenSharing}
//       >
//         {isScreenSharing ? (
//           <ScreenShareOff className="h-5 w-5" />
//         ) : (
//           <ScreenShareIcon className="h-5 w-5" />
//         )}
//       </Button>
//     );
//   };

//   const RecordingButton = () => {
//     const isRecording =
//       meeting?.recordingState === Constants.recordingEvents.RECORDING_STARTED;

//     return (
//       <Button
//         onClick={() =>
//           isRecording ? meeting?.stopRecording() : meeting?.startRecording()
//         }
//         variant={isRecording ? "destructive" : "secondary"}
//         size="icon"
//         className="rounded-full w-12 h-12 relative"
//       >
//         <Circle className="h-5 w-5" />
//         {isRecording && (
//           <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
//         )}
//       </Button>
//     );
//   };

//   if (!meeting || !meeting.localParticipant) {
//     return (
//       <div className="flex items-center justify-center h-full">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
//         <span className="ml-3">Connecting to meeting...</span>
//       </div>
//     );
//   }

//   const participants = [...meeting.participants.keys()];
//   const isHost = true; // Set based on your auth logic

//   return (
//     <div className="flex flex-col h-full bg-gray-900">
//       {/* Main Content Area */}
//       <div className="flex flex-1 overflow-hidden">
//         {/* Host View - Full Screen Main Area */}
//         <div className="flex-1 bg-black flex flex-col">
//           <div className="relative flex-1">
//             <ParticipantView
//               participantId={meeting.localParticipant.id}
//               layoutType="fullscreen"
//               isPresenting={meeting.localScreenShareOn}
//               isFullscreen={isFullscreen}
//               className="absolute inset-0"
//             />
//             <div className="absolute bottom-4 left-4 bg-black/70 text-white px-3 py-1 rounded-md">
//               {meeting.localParticipant.displayName || "You"} (Host)
//               {meeting.localParticipant.micOn ? "" : " 🔇"}
//             </div>
//           </div>
//         </div>

//         {/* Participants Sidebar */}
//         <div className="w-80 border-l border-gray-700 bg-gray-800 flex flex-col">
//           <Tabs defaultValue="participants" className="flex-1 flex flex-col">
//             <TabsList className="grid grid-cols-3 bg-gray-800 rounded-none">
//               <TabsTrigger value="participants">People</TabsTrigger>
//               <TabsTrigger value="chat">Chat</TabsTrigger>
//               <TabsTrigger value="polls">Polls</TabsTrigger>
//             </TabsList>

//             <TabsContent value="participants" className="flex-1 overflow-auto">
//               <ScrollArea className="h-full">
//                 <div className="p-4">
//                   <div className="flex justify-between items-center mb-4">
//                     <h3 className="font-medium text-white">
//                       Participants ({participants.length + 1})
//                     </h3>
//                     <Button
//                       variant={
//                         raisedHands.includes(meeting.localParticipant.id)
//                           ? "default"
//                           : "outline"
//                       }
//                       size="sm"
//                       onClick={toggleRaiseHand}
//                     >
//                       <Hand className="h-4 w-4 mr-2" />
//                       {raisedHands.includes(meeting.localParticipant.id)
//                         ? "Lower Hand"
//                         : "Raise Hand"}
//                     </Button>
//                   </div>

//                   <div className="space-y-4">
//                     {participants.map((participantId) => (
//                       <div key={participantId} className="space-y-2">
//                         <div className="relative rounded-lg overflow-hidden bg-gray-900 aspect-video">
//                           <ParticipantView
//                             participantId={participantId}
//                             layoutType="sidebar"
//                             isPresenting={meeting.participants.get(participantId)?.screenShareOn}
//                             className="absolute inset-0"
//                           />
//                           {raisedHands.includes(participantId) && (
//                             <div className="absolute top-2 right-2 bg-yellow-500 rounded-full p-1">
//                               <Hand className="h-3 w-3 text-white" />
//                             </div>
//                           )}
//                         </div>
//                         <div className="text-sm text-white">
//                           {meeting.participants.get(participantId)?.displayName}
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               </ScrollArea>
//             </TabsContent>

//             <TabsContent value="chat" className="flex-1 flex flex-col">
//               <div className="flex-1 overflow-hidden flex flex-col">
//                 <ScrollArea className="flex-1">
//                   <div className="p-4 space-y-4">
//                     {chatMessages.map((message) => (
//                       <div
//                         key={message.id}
//                         className={`flex ${
//                           message.isCurrentUser
//                             ? "justify-end"
//                             : "justify-start"
//                         }`}
//                       >
//                         <div
//                           className={`max-w-xs p-3 rounded-lg ${
//                             message.isCurrentUser
//                               ? "bg-blue-600 text-white"
//                               : "bg-gray-700 text-white"
//                           }`}
//                         >
//                           {!message.isCurrentUser && (
//                             <p className="text-xs font-semibold mb-1">
//                               {message.sender}
//                             </p>
//                           )}
//                           <p className="text-sm">{message.message}</p>
//                           <p className="text-xs opacity-70 mt-1">
//                             {new Date(message.timestamp).toLocaleTimeString(
//                               [],
//                               {
//                                 hour: "2-digit",
//                                 minute: "2-digit",
//                               }
//                             )}
//                           </p>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </ScrollArea>
//                 <div className="p-3 border-t border-gray-700">
//                   <div className="flex gap-2">
//                     <Input
//                       value={newMessage}
//                       onChange={(e) => setNewMessage(e.target.value)}
//                       placeholder="Type a message..."
//                       className="flex-1 bg-gray-700 border-gray-600 text-white"
//                       onKeyDown={(e) =>
//                         e.key === "Enter" && handleSendMessage()
//                       }
//                     />
//                     <Button onClick={handleSendMessage}>Send</Button>
//                   </div>
//                 </div>
//               </div>
//             </TabsContent>

//             <TabsContent value="polls" className="flex-1 overflow-auto">
//               <ScrollArea className="h-full">
//                 <div className="p-4 space-y-4">
//                   {polls.length > 0 ? (
//                     polls.map((poll) => (
//                       <Card
//                         key={poll.id}
//                         className="bg-gray-700 border-gray-600"
//                       >
//                         <CardHeader>
//                           <CardTitle className="text-white">
//                             {poll.question}
//                           </CardTitle>
//                         </CardHeader>
//                         <CardContent>
//                           <div className="space-y-3">
//                             {poll.options.map((option) => (
//                               <div key={option.id} className="space-y-1">
//                                 <Button
//                                   variant="outline"
//                                   className="w-full text-left justify-start bg-gray-600 border-gray-500 hover:bg-gray-500 text-white"
//                                   onClick={() => handleVote(poll.id, option.id)}
//                                 >
//                                   {option.text}
//                                 </Button>
//                                 <div className="flex items-center gap-2">
//                                   <Progress
//                                     value={
//                                       (option.votes / poll.totalVotes) * 100
//                                     }
//                                     className="h-2 bg-gray-600"
//                                   />
//                                   <span className="text-xs text-gray-400">
//                                     {Math.round(
//                                       (option.votes / poll.totalVotes) * 100
//                                     )}
//                                     % ({option.votes})
//                                   </span>
//                                 </div>
//                               </div>
//                             ))}
//                           </div>
//                         </CardContent>
//                       </Card>
//                     ))
//                   ) : (
//                     <div className="flex items-center justify-center h-full text-gray-400">
//                       No polls available
//                     </div>
//                   )}
//                 </div>
//               </ScrollArea>
//             </TabsContent>
//           </Tabs>
//         </div>
//       </div>

//       {/* Meeting Controls */}
//       <div className="bg-gray-900 py-3 px-4 flex justify-center space-x-4">
//         <Button
//           onClick={() => meeting?.toggleMic()}
//           variant={meeting?.localParticipant?.micOn ? "default" : "destructive"}
//           size="icon"
//           className="rounded-full w-12 h-12"
//         >
//           {meeting?.localParticipant?.micOn ? (
//             <Mic className="h-5 w-5" />
//           ) : (
//             <MicOff className="h-5 w-5" />
//           )}
//         </Button>

//         <Button
//           onClick={() => meeting?.toggleWebcam()}
//           variant={
//             meeting?.localParticipant?.webcamOn ? "default" : "destructive"
//           }
//           size="icon"
//           className="rounded-full w-12 h-12"
//         >
//           {meeting?.localParticipant?.webcamOn ? (
//             <Video className="h-5 w-5" />
//           ) : (
//             <VideoOff className="h-5 w-5" />
//           )}
//         </Button>

//         <ScreenShareButton />

//         <RecordingButton />

//         <Button
//           onClick={copyMeetingLink}
//           variant="secondary"
//           size="icon"
//           className="rounded-full w-12 h-12"
//         >
//           <Share2 className="h-5 w-5" />
//         </Button>

//         <Button
//           onClick={toggleFullscreen}
//           variant="secondary"
//           size="icon"
//           className="rounded-full w-12 h-12"
//         >
//           {isFullscreen ? (
//             <Minimize className="h-5 w-5" />
//           ) : (
//             <Maximize className="h-5 w-5" />
//           )}
//         </Button>

//         <Button
//           variant="destructive"
//           size="icon"
//           className="rounded-full w-12 h-12"
//           onClick={() => meeting?.leave()}
//         >
//           <PhoneOff className="h-5 w-5" />
//         </Button>
//       </div>
//     </div>
//   );
// };

// export default MeetingContainer;

import React, { useState, useEffect } from "react";
import { useMeeting, Constants } from "@videosdk.live/react-sdk";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  Share2,
  Maximize,
  Minimize,
  PhoneOff,
  Circle,
  ScreenShare as ScreenShareIcon,
  ScreenShareOff,
  Hand,
} from "lucide-react";
import ParticipantView from "./ParticipantView";

interface ChatMessage {
  id: string;
  sender: string;
  message: string;
  timestamp: string;
  isCurrentUser: boolean;
}

interface PollOption {
  id: string;
  text: string;
  votes: number;
}

interface Poll {
  id: string;
  question: string;
  options: PollOption[];
  totalVotes: number;
}

interface MeetingContainerProps {
  onMeetingLeave: () => void;
  setIsMeetingLeft: (value: boolean) => void;
}

const MeetingContainer: React.FC<MeetingContainerProps> = ({
  onMeetingLeave,
  setIsMeetingLeft,
}) => {
  const { toast } = useToast();
  const meeting = useMeeting({
    onError: (error) => {
      toast({
        title: "Meeting Error",
        description: error.message,
        variant: "destructive",
      });
    },
    onMeetingLeft: () => {
      onMeetingLeave();
      setIsMeetingLeft(true);
    },
  });

  const [activeTab, setActiveTab] = useState("participants");
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [polls, setPolls] = useState<Poll[]>([]);
  const [raisedHands, setRaisedHands] = useState<string[]>([]);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    setChatMessages([
      {
        id: "1",
        sender: "John Doe",
        message: "Hello everyone!",
        timestamp: new Date().toISOString(),
        isCurrentUser: false,
      },
      {
        id: "2",
        sender: "You",
        message: "Hi John!",
        timestamp: new Date().toISOString(),
        isCurrentUser: true,
      },
    ]);

    setPolls([
      {
        id: "1",
        question: "How useful is this seminar?",
        options: [
          { id: "1", text: "Very useful", votes: 15 },
          { id: "2", text: "Somewhat useful", votes: 8 },
          { id: "3", text: "Not useful", votes: 2 },
        ],
        totalVotes: 25,
      },
    ]);

    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message: ChatMessage = {
        id: Date.now().toString(),
        sender: "You",
        message: newMessage,
        timestamp: new Date().toISOString(),
        isCurrentUser: true,
      };
      setChatMessages([...chatMessages, message]);
      setNewMessage("");
    }
  };

  const handleVote = (pollId: string, optionId: string) => {
    setPolls(
      polls.map((poll) => {
        if (poll.id === pollId) {
          const updatedOptions = poll.options.map((option) => {
            if (option.id === optionId) {
              return { ...option, votes: option.votes + 1 };
            }
            return option;
          });
          return {
            ...poll,
            options: updatedOptions,
            totalVotes: poll.totalVotes + 1,
          };
        }
        return poll;
      })
    );
  };

  const toggleRaiseHand = () => {
    if (raisedHands.includes(meeting?.localParticipant?.id)) {
      setRaisedHands(
        raisedHands.filter((id) => id !== meeting?.localParticipant?.id)
      );
    } else {
      setRaisedHands([...raisedHands, meeting?.localParticipant?.id]);
    }
  };

  const toggleFullscreen = async () => {
    try {
      if (!isFullscreen) {
        await document.documentElement.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch (error) {
      toast({
        title: "Fullscreen Error",
        description: "Could not toggle fullscreen mode",
        variant: "destructive",
      });
    }
  };

  const copyMeetingLink = () => {
    if (meeting?.meetingId) {
      navigator.clipboard.writeText(
        `${window.location.origin}/meeting/${meeting.meetingId}`
      );
      toast({
        title: "Link Copied",
        description: "Meeting link copied to clipboard",
      });
    }
  };

  const handleScreenShare = async () => {
    try {
      if (meeting.localScreenShareOn) {
        meeting.toggleScreenShare();
      } else {
        const stream = await navigator.mediaDevices.getDisplayMedia({
          video: {
            displaySurface: "monitor",
            frameRate: { ideal: 30, max: 60 },
          },
          audio: false,
        });

        meeting.toggleScreenShare(stream);

        stream.getVideoTracks()[0].onended = () => {
          meeting.toggleScreenShare();
        };
      }
    } catch (error) {
      toast({
        title: "Screen Share Error",
        description: "Could not start screen sharing",
        variant: "destructive",
      });
    }
  };

  const ScreenShareButton = () => {
    const isScreenSharing = meeting?.localScreenShareOn;

    return (
      <Button
        onClick={handleScreenShare}
        variant={isScreenSharing ? "default" : "secondary"}
        size="icon"
        className="rounded-full w-12 h-12"
        disabled={!!meeting?.presenterId && !isScreenSharing}
      >
        {isScreenSharing ? (
          <ScreenShareOff className="h-5 w-5" />
        ) : (
          <ScreenShareIcon className="h-5 w-5" />
        )}
      </Button>
    );
  };

  const RecordingButton = () => {
    const isRecording =
      meeting?.recordingState === Constants.recordingEvents.RECORDING_STARTED;

    return (
      <Button
        onClick={() =>
          isRecording ? meeting?.stopRecording() : meeting?.startRecording()
        }
        variant={isRecording ? "destructive" : "secondary"}
        size="icon"
        className="rounded-full w-12 h-12 relative"
      >
        <Circle className="h-5 w-5" />
        {isRecording && (
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
        )}
      </Button>
    );
  };

  if (!meeting || !meeting.localParticipant) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
        <span className="ml-3">Connecting to meeting...</span>
      </div>
    );
  }

  const participants = [...meeting.participants.keys()];
  const isHost = true; // Set based on your auth logic

  return (
    <div className="flex flex-col h-full bg-gray-900">
      {/* Main Content Area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Host View - Full Screen Main Area */}
        <div className="flex-1 bg-black flex flex-col">
          <div className="relative flex-1">
            <ParticipantView
              participantId={meeting.localParticipant.id}
              layoutType="fullscreen"
              isPresenting={meeting.localScreenShareOn}
              isFullscreen={isFullscreen}
              isHost={isHost} // Pass true for host
              className="absolute inset-0"
            />
            {/* <div className="absolute bottom-4 left-4 bg-black/70 text-white px-3 py-1 rounded-md">
              {meeting.localParticipant.displayName || "You"} (Host)
              {meeting.localParticipant.micOn ? "" : " 🔇"}
            </div> */}
          </div>
        </div>

        {/* Participants Sidebar */}
        <div className="w-80 border-l border-gray-700 bg-gray-800 flex flex-col">
          <Tabs defaultValue="participants" className="flex-1 flex flex-col">
            <TabsList className="grid grid-cols-3 bg-gray-800 rounded-none">
              <TabsTrigger value="participants">People</TabsTrigger>
              <TabsTrigger value="chat">Chat</TabsTrigger>
              <TabsTrigger value="polls">Polls</TabsTrigger>
            </TabsList>

            <TabsContent value="participants" className="flex-1 overflow-auto">
              <ScrollArea className="h-full">
                <div className="p-4">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-medium text-white">
                      Participants ({participants.length})
                    </h3>
                    <Button
                      variant={
                        raisedHands.includes(meeting.localParticipant.id)
                          ? "default"
                          : "outline"
                      }
                      size="sm"
                      onClick={toggleRaiseHand}
                    >
                      <Hand className="h-4 w-4 mr-2" />
                      {raisedHands.includes(meeting.localParticipant.id)
                        ? "Lower Hand"
                        : "Raise Hand"}
                    </Button>
                  </div>

                  <div className="space-y-4">
                    {participants.map((participantId) => (
                      <div key={participantId} className="space-y-2">
                        <div className="relative rounded-lg overflow-hidden bg-gray-900 aspect-video">
                          <ParticipantView
                            participantId={participantId}
                            layoutType="sidebar"
                            // isPresenting={
                            //   meeting.participants.get(participantId)
                                
                            // }
                            className="absolute inset-0"
                            isHost={false} // Pass false for participants
                            isFullscreen={false} // Force false for participants
                          />
                          {raisedHands.includes(participantId) && (
                            <div className="absolute top-2 right-2 bg-yellow-500 rounded-full p-1">
                              <Hand className="h-3 w-3 text-white" />
                            </div>
                          )}
                        </div>
                        <div className="text-sm text-white">
                          {meeting.participants.get(participantId)?.displayName}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollArea>
            </TabsContent>

            <TabsContent value="chat" className="flex-1 flex flex-col">
              <div className="flex-1 overflow-hidden flex flex-col">
                <ScrollArea className="flex-1">
                  <div className="p-4 space-y-4">
                    {chatMessages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${
                          message.isCurrentUser
                            ? "justify-end"
                            : "justify-start"
                        }`}
                      >
                        <div
                          className={`max-w-xs p-3 rounded-lg ${
                            message.isCurrentUser
                              ? "bg-blue-600 text-white"
                              : "bg-gray-700 text-white"
                          }`}
                        >
                          {!message.isCurrentUser && (
                            <p className="text-xs font-semibold mb-1">
                              {message.sender}
                            </p>
                          )}
                          <p className="text-sm">{message.message}</p>
                          <p className="text-xs opacity-70 mt-1">
                            {new Date(message.timestamp).toLocaleTimeString(
                              [],
                              {
                                hour: "2-digit",
                                minute: "2-digit",
                              }
                            )}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
                <div className="p-3 border-t border-gray-700">
                  <div className="flex gap-2">
                    <Input
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder="Type a message..."
                      className="flex-1 bg-gray-700 border-gray-600 text-white"
                      onKeyDown={(e) =>
                        e.key === "Enter" && handleSendMessage()
                      }
                    />
                    <Button onClick={handleSendMessage}>Send</Button>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="polls" className="flex-1 overflow-auto">
              <ScrollArea className="h-full">
                <div className="p-4 space-y-4">
                  {polls.length > 0 ? (
                    polls.map((poll) => (
                      <Card
                        key={poll.id}
                        className="bg-gray-700 border-gray-600"
                      >
                        <CardHeader>
                          <CardTitle className="text-white">
                            {poll.question}
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            {poll.options.map((option) => (
                              <div key={option.id} className="space-y-1">
                                <Button
                                  variant="outline"
                                  className="w-full text-left justify-start bg-gray-600 border-gray-500 hover:bg-gray-500 text-white"
                                  onClick={() => handleVote(poll.id, option.id)}
                                >
                                  {option.text}
                                </Button>
                                <div className="flex items-center gap-2">
                                  <Progress
                                    value={
                                      (option.votes / poll.totalVotes) * 100
                                    }
                                    className="h-2 bg-gray-600"
                                  />
                                  <span className="text-xs text-gray-400">
                                    {Math.round(
                                      (option.votes / poll.totalVotes) * 100
                                    )}
                                    % ({option.votes})
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-400">
                      No polls available
                    </div>
                  )}
                </div>
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Meeting Controls */}
      <div className="bg-gray-900 py-3 px-4 flex justify-center space-x-4">
        <Button
          onClick={() => meeting?.toggleMic()}
          variant={meeting?.localParticipant?.micOn ? "default" : "destructive"}
          size="icon"
          className="rounded-full w-12 h-12"
        >
          {meeting?.localParticipant?.micOn ? (
            <Mic className="h-5 w-5" />
          ) : (
            <MicOff className="h-5 w-5" />
          )}
        </Button>
        <Button
          onClick={() => meeting?.toggleWebcam()}
          variant={
            meeting?.localParticipant?.webcamOn ? "default" : "destructive"
          }
          size="icon"
          className="rounded-full w-12 h-12"
        >
          {meeting?.localParticipant?.webcamOn ? (
            <Video className="h-5 w-5" />
          ) : (
            <VideoOff className="h-5 w-5" />
          )}
        </Button>
        {isHost && <ScreenShareButton />}
        {isHost && <RecordingButton />}
        <Button
          onClick={copyMeetingLink}
          variant="secondary"
          size="icon"
          className="rounded-full w-12 h-12"
        >
          <Share2 className="h-5 w-5" />
        </Button>
        {isHost && (
          <Button
            onClick={toggleFullscreen}
            variant="secondary"
            size="icon"
            className="rounded-full w-12 h-12"
          >
            {isFullscreen ? (
              <Minimize className="h-5 w-5" />
            ) : (
              <Maximize className="h-5 w-5" />
            )}
          </Button>
        )}
        <Button
          variant="destructive"
          size="icon"
          className="rounded-full w-12 h-12"
          onClick={() => meeting?.leave()}
        >
          <PhoneOff className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};

export default MeetingContainer;