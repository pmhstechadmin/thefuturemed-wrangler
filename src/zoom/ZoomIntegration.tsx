// import { useState, useEffect, useRef } from 'react';
// import { FaVideo, FaVideoSlash, FaMicrophone, FaMicrophoneSlash, FaPhone, FaUserPlus, FaCopy } from 'react-icons/fa';
// import { IoMdChatbubbles } from 'react-icons/io';
// import { BsThreeDotsVertical } from 'react-icons/bs';
// import { useToast } from '@/hooks/use-toast';
// import io from 'socket.io-client';

// interface ZoomIntegrationProps {
//   meetingId: string;
//   password: string;
//   onMeetingEnd: () => void;
//   userName: string;
// }

// const ZoomIntegration = ({ meetingId, password, onMeetingEnd, userName }: ZoomIntegrationProps) => {
//   const [videoEnabled, setVideoEnabled] = useState(true);
//   const [audioEnabled, setAudioEnabled] = useState(true);
//   const [screenSharing, setScreenSharing] = useState(false);
//   const [participants, setParticipants] = useState([]);
//   const [chatMessages, setChatMessages] = useState([]);
//   const [messageInput, setMessageInput] = useState('');
//   const [showChat, setShowChat] = useState(false);
//   const [showParticipants, setShowParticipants] = useState(false);
//   const [showMeetingInfo, setShowMeetingInfo] = useState(false);
//   const [joined, setJoined] = useState(false);
//   const [localStream, setLocalStream] = useState<MediaStream | null>(null);
//   const [permissionError, setPermissionError] = useState<string | null>(null);
//   const [retryCount, setRetryCount] = useState(0);
//   const [mediaDevices, setMediaDevices] = useState<MediaDeviceInfo[]>([]);
//   const [selectedCamera, setSelectedCamera] = useState<string>('');
//   const [selectedMic, setSelectedMic] = useState<string>('');

//   const localVideoRef = useRef<HTMLVideoElement>(null);
//   const remoteVideoRef = useRef<HTMLVideoElement>(null);
//   const socketRef = useRef<any>(null);
//   const peersRef = useRef<Record<string, any>>({});
//   const { toast } = useToast();

//   // Check available devices and permissions
//   useEffect(() => {
//     const checkDevices = async () => {
//       try {
//         const devices = await navigator.mediaDevices.enumerateDevices();
//         setMediaDevices(devices);
        
//         const cameras = devices.filter(d => d.kind === 'videoinput');
//         const mics = devices.filter(d => d.kind === 'audioinput');
        
//         if (cameras.length > 0) setSelectedCamera(cameras[0].deviceId);
//         if (mics.length > 0) setSelectedMic(mics[0].deviceId);
        
//         checkPermissions();
//       } catch (error) {
//         console.error('Error enumerating devices:', error);
//         setPermissionError('Could not access media devices. Please check your permissions.');
//       }
//     };
    
//     checkDevices();
//   }, []);

//   // Clean up streams on unmount
//   useEffect(() => {
//     return () => {
//       if (localStream) {
//         localStream.getTracks().forEach(track => track.stop());
//       }
//       if (socketRef.current) {
//         socketRef.current.disconnect();
//       }
//     };
//   }, [localStream]);

//   const checkPermissions = async () => {
//     try {
//       if (navigator.permissions) {
//         const cameraPermission = await navigator.permissions.query({ name: 'camera' as any });
//         cameraPermission.onchange = () => handlePermissionChange('camera', cameraPermission.state);

//         const micPermission = await navigator.permissions.query({ name: 'microphone' as any });
//         micPermission.onchange = () => handlePermissionChange('microphone', micPermission.state);
//       }
//     } catch (error) {
//       console.warn('Permission API not fully supported:', error);
//     }
//   };

//   const handlePermissionChange = (type: string, state: string) => {
//     if (state === 'denied') {
//       setPermissionError(`${type} access was denied. Please enable it in your browser settings.`);
//     }
//   };

//   const requestMediaAccess = async () => {
//     try {
//       const constraints = {
//         video: videoEnabled ? {
//           deviceId: selectedCamera ? { exact: selectedCamera } : undefined,
//           width: { ideal: 1280 },
//           height: { ideal: 720 }
//         } : false,
//         audio: audioEnabled ? {
//           deviceId: selectedMic ? { exact: selectedMic } : undefined,
//           echoCancellation: true,
//           noiseSuppression: true
//         } : false,
//       };

//       const stream = await navigator.mediaDevices.getUserMedia(constraints);
//       return stream;
//     } catch (error) {
//       console.error('Media access error:', error);
//       throw error;
//     }
//   };

//   const joinMeeting = async () => {
//     try {
//       const stream = await requestMediaAccess();
//       setPermissionError(null);
//       setLocalStream(stream);

//       if (localVideoRef.current) {
//         localVideoRef.current.srcObject = stream;
//       }

//       // Initialize socket connection
//       socketRef.current = io('http://localhost:5000');
      
//       socketRef.current.emit('join-meeting', {
//         meetingId,
//         password,
//         name: userName,
//       });

//       setJoined(true);
//     } catch (error) {
//       console.error('Error joining meeting:', error);
//       setRetryCount(prev => prev + 1);
      
//       let errorMessage = 'Could not access camera/microphone. ';
      
//       if (error.name === 'NotAllowedError') {
//         errorMessage += 'Please check your browser permissions and try again.';
//       } else if (error.name === 'NotFoundError' || error.name === 'OverconstrainedError') {
//         errorMessage += 'No matching devices found. Please check your hardware.';
//       } else {
//         errorMessage += 'Please try again.';
//       }

//       setPermissionError(errorMessage);
//       toast({
//         title: "Media Access Error",
//         description: errorMessage,
//         variant: "destructive",
//       });
//     }
//   };

//   const retryMediaAccess = async () => {
//     try {
//       const stream = await requestMediaAccess();
//       setPermissionError(null);
//       setLocalStream(stream);
      
//       if (localVideoRef.current) {
//         localVideoRef.current.srcObject = stream;
//       }

//       if (!joined) {
//         joinMeeting();
//       }
//     } catch (error) {
//       console.error('Retry failed:', error);
//       setPermissionError('Failed to access media devices. Please check permissions and try again.');
//     }
//   };

//   const toggleVideo = async () => {
//     const newState = !videoEnabled;
//     setVideoEnabled(newState);

//     if (localStream) {
//       localStream.getVideoTracks().forEach(track => {
//         track.enabled = newState;
//       });
      
//       if (newState && localStream.getVideoTracks().length === 0) {
//         // If enabling video but no tracks exist (was previously off)
//         try {
//           const stream = await requestMediaAccess();
//           setLocalStream(stream);
//           if (localVideoRef.current) {
//             localVideoRef.current.srcObject = stream;
//           }
//         } catch (error) {
//           console.error('Error enabling video:', error);
//           setVideoEnabled(false);
//         }
//       }
//     }
//   };

//   const toggleAudio = async () => {
//     const newState = !audioEnabled;
//     setAudioEnabled(newState);

//     if (localStream) {
//       localStream.getAudioTracks().forEach(track => {
//         track.enabled = newState;
//       });
      
//       if (newState && localStream.getAudioTracks().length === 0) {
//         // If enabling audio but no tracks exist (was previously off)
//         try {
//           const stream = await requestMediaAccess();
//           setLocalStream(stream);
//           if (localVideoRef.current) {
//             localVideoRef.current.srcObject = stream;
//           }
//         } catch (error) {
//           console.error('Error enabling audio:', error);
//           setAudioEnabled(false);
//         }
//       }
//     }
//   };

//   const toggleScreenShare = async () => {
//     try {
//       if (!screenSharing) {
//         const screenStream = await navigator.mediaDevices.getDisplayMedia({
//           video: true,
//           audio: true,
//         });
        
//         // Stop previous video tracks
//         if (localStream) {
//           localStream.getVideoTracks().forEach(track => track.stop());
//         }
        
//         // Replace video tracks with screen share
//         const [videoTrack] = screenStream.getVideoTracks();
//         if (localStream) {
//           localStream.addTrack(videoTrack);
//         }

//         if (localVideoRef.current) {
//           localVideoRef.current.srcObject = localStream;
//         }
        
//         setScreenSharing(true);
        
//         // Handle when user stops sharing via browser UI
//         videoTrack.onended = () => {
//           toggleScreenShare();
//         };
//       } else {
//         // Switch back to camera
//         const stream = await navigator.mediaDevices.getUserMedia({
//           video: {
//             deviceId: selectedCamera ? { exact: selectedCamera } : undefined,
//             width: { ideal: 1280 },
//             height: { ideal: 720 }
//           },
//           audio: audioEnabled ? {
//             deviceId: selectedMic ? { exact: selectedMic } : undefined,
//             echoCancellation: true,
//             noiseSuppression: true
//           } : false,
//         });
        
//         // Stop screen share tracks
//         if (localStream) {
//           localStream.getTracks().forEach(track => {
//             if (track.kind === 'video') track.stop();
//           });
//         }
        
//         setLocalStream(stream);
        
//         if (localVideoRef.current) {
//           localVideoRef.current.srcObject = stream;
//         }
        
//         setScreenSharing(false);
//       }
//     } catch (error) {
//       console.error('Error handling screen share:', error);
//       setScreenSharing(false);
//     }
//   };

//   const sendMessage = () => {
//     if (messageInput.trim()) {
//       const newMessage = {
//         sender: userName,
//         text: messageInput,
//         timestamp: new Date().toLocaleTimeString(),
//       };
      
//       socketRef.current?.emit('send-message', newMessage);
//       setChatMessages(prev => [...prev, newMessage]);
//       setMessageInput('');
//     }
//   };

//   const copyMeetingInfo = () => {
//     navigator.clipboard.writeText(
//       `Meeting ID: ${meetingId}\nPassword: ${password}`
//     );
//     toast({
//       title: "Copied to clipboard",
//       description: "Meeting information has been copied to your clipboard.",
//     });
//   };

//   const leaveMeeting = () => {
//     if (localStream) {
//       localStream.getTracks().forEach(track => track.stop());
//     }
//     if (socketRef.current) {
//       socketRef.current.disconnect();
//     }
//     setJoined(false);
//     onMeetingEnd();
//   };

//   const handleDeviceChange = async (type: 'camera' | 'mic', deviceId: string) => {
//     if (!localStream) return;

//     try {
//       const constraints = {
//         video: type === 'camera' ? {
//           deviceId: { exact: deviceId },
//           width: { ideal: 1280 },
//           height: { ideal: 720 }
//         } : false,
//         audio: type === 'mic' ? {
//           deviceId: { exact: deviceId },
//           echoCancellation: true,
//           noiseSuppression: true
//         } : false,
//       };

//       const stream = await navigator.mediaDevices.getUserMedia(constraints);
      
//       // Replace the relevant tracks
//       if (type === 'camera') {
//         const oldVideoTracks = localStream.getVideoTracks();
//         const [newVideoTrack] = stream.getVideoTracks();
        
//         oldVideoTracks.forEach(track => track.stop());
//         localStream.removeTrack(oldVideoTracks[0]);
//         localStream.addTrack(newVideoTrack);
        
//         setSelectedCamera(deviceId);
//       } else {
//         const oldAudioTracks = localStream.getAudioTracks();
//         const [newAudioTrack] = stream.getAudioTracks();
        
//         oldAudioTracks.forEach(track => track.stop());
//         localStream.removeTrack(oldAudioTracks[0]);
//         localStream.addTrack(newAudioTrack);
        
//         setSelectedMic(deviceId);
//       }

//       if (localVideoRef.current) {
//         localVideoRef.current.srcObject = localStream;
//       }
//     } catch (error) {
//       console.error(`Error changing ${type}:`, error);
//       toast({
//         title: "Device Error",
//         description: `Could not switch ${type}. Please try another device.`,
//         variant: "destructive",
//       });
//     }
//   };

//   if (!joined) {
//     return (
//       <div className="join-container p-6 max-w-md mx-auto bg-white rounded-lg shadow-md">
//         <h1 className="text-2xl font-bold text-center mb-6">Join Meeting</h1>
        
//         {permissionError && (
//           <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4 rounded">
//             <div className="flex">
//               <div className="flex-shrink-0">
//                 <svg className="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
//                   <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
//                 </svg>
//               </div>
//               <div className="ml-3">
//                 <p className="text-sm text-red-700">{permissionError}</p>
//                 <div className="mt-2">
//                   <button
//                     onClick={retryMediaAccess}
//                     className="text-sm bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md"
//                   >
//                     Retry
//                   </button>
//                   <a
//                     href="https://support.google.com/chrome/answer/2693767"
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="ml-2 text-sm text-red-600 hover:text-red-500 hover:underline"
//                   >
//                     Learn how to fix
//                   </a>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}

//         <div className="meeting-info bg-blue-50 p-4 rounded-lg mb-6">
//           <h3 className="font-medium text-blue-800 mb-2">Meeting Information</h3>
//           <div className="grid grid-cols-2 gap-2">
//             <div>
//               <p className="text-sm text-gray-600">Meeting ID:</p>
//               <p className="font-mono font-medium">{meetingId}</p>
//             </div>
//             <div>
//               <p className="text-sm text-gray-600">Password:</p>
//               <p className="font-mono font-medium">{password}</p>
//             </div>
//           </div>
//         </div>

//         <div className="space-y-4">
//           <div>
//             <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
//               Your Name
//             </label>
//             <input
//               type="text"
//               id="name"
//               value={userName}
//               readOnly
//               className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//             />
//           </div>

//           <div className="grid grid-cols-2 gap-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Camera
//               </label>
//               <select
//                 value={selectedCamera}
//                 onChange={(e) => setSelectedCamera(e.target.value)}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//               >
//                 {mediaDevices
//                   .filter(d => d.kind === 'videoinput')
//                   .map(device => (
//                     <option key={device.deviceId} value={device.deviceId}>
//                       {device.label || `Camera ${device.deviceId.slice(0, 5)}`}
//                     </option>
//                   ))}
//               </select>
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Microphone
//               </label>
//               <select
//                 value={selectedMic}
//                 onChange={(e) => setSelectedMic(e.target.value)}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//               >
//                 {mediaDevices
//                   .filter(d => d.kind === 'audioinput')
//                   .map(device => (
//                     <option key={device.deviceId} value={device.deviceId}>
//                       {device.label || `Mic ${device.deviceId.slice(0, 5)}`}
//                     </option>
//                   ))}
//               </select>
//             </div>
//           </div>

//           <div className="flex items-center justify-between">
//             <div className="flex items-center">
//               <input
//                 type="checkbox"
//                 id="video"
//                 checked={videoEnabled}
//                 onChange={() => setVideoEnabled(!videoEnabled)}
//                 className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
//               />
//               <label htmlFor="video" className="ml-2 block text-sm text-gray-700">
//                 Enable Video
//               </label>
//             </div>

//             <div className="flex items-center">
//               <input
//                 type="checkbox"
//                 id="audio"
//                 checked={audioEnabled}
//                 onChange={() => setAudioEnabled(!audioEnabled)}
//                 className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
//               />
//               <label htmlFor="audio" className="ml-2 block text-sm text-gray-700">
//                 Enable Audio
//               </label>
//             </div>
//           </div>

//           <div className="pt-2">
//             <button
//               onClick={joinMeeting}
//               className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
//             >
//               Join Meeting
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="meeting-container h-full flex flex-col bg-gray-900">
//       <div className="video-container flex-1 relative">
//         <div className="remote-video absolute inset-0 bg-black">
//           <video 
//             ref={remoteVideoRef} 
//             autoPlay 
//             playsInline 
//             className="w-full h-full object-cover"
//           />
//           <div className="participant-name absolute bottom-4 left-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-md">
//             Other Participant
//           </div>
//         </div>
        
//         <div className="local-video absolute bottom-4 right-4 w-64 h-48 bg-black rounded-md overflow-hidden border-2 border-white shadow-lg">
//           <video 
//             ref={localVideoRef} 
//             autoPlay 
//             playsInline 
//             muted
//             className="w-full h-full object-cover"
//           />
//           <div className="participant-name absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white px-2 py-1 text-sm truncate">
//             {userName} (You)
//           </div>
//         </div>
//       </div>

//       <div className="controls bg-gray-800 p-3 flex items-center justify-center space-x-4">
//         <button 
//           onClick={toggleAudio}
//           className={`flex flex-col items-center p-2 rounded-full ${audioEnabled ? 'bg-gray-700 text-white' : 'bg-red-500 text-white'}`}
//         >
//           {audioEnabled ? (
//             <FaMicrophone className="h-5 w-5" />
//           ) : (
//             <FaMicrophoneSlash className="h-5 w-5" />
//           )}
//           <span className="text-xs mt-1">{audioEnabled ? 'Mute' : 'Unmute'}</span>
//         </button>

//         <button 
//           onClick={toggleVideo}
//           className={`flex flex-col items-center p-2 rounded-full ${videoEnabled ? 'bg-gray-700 text-white' : 'bg-red-500 text-white'}`}
//         >
//           {videoEnabled ? (
//             <FaVideo className="h-5 w-5" />
//           ) : (
//             <FaVideoSlash className="h-5 w-5" />
//           )}
//           <span className="text-xs mt-1">{videoEnabled ? 'Stop Video' : 'Start Video'}</span>
//         </button>

//         <button 
//           onClick={toggleScreenShare}
//           className={`flex flex-col items-center p-2 rounded-full ${screenSharing ? 'bg-blue-600 text-white' : 'bg-gray-700 text-white'}`}
//         >
//           <FaVideo className="h-5 w-5" />
//           <span className="text-xs mt-1">{screenSharing ? 'Stop Share' : 'Share Screen'}</span>
//         </button>

//         <button 
//           onClick={() => setShowParticipants(!showParticipants)}
//           className="flex flex-col items-center p-2 rounded-full bg-gray-700 text-white"
//         >
//           <FaUserPlus className="h-5 w-5" />
//           <span className="text-xs mt-1">Participants ({participants.length + 1})</span>
//         </button>

//         <button 
//           onClick={() => setShowChat(!showChat)}
//           className="flex flex-col items-center p-2 rounded-full bg-gray-700 text-white"
//         >
//           <IoMdChatbubbles className="h-5 w-5" />
//           <span className="text-xs mt-1">Chat</span>
//         </button>

//         <button 
//           onClick={() => setShowMeetingInfo(!showMeetingInfo)}
//           className="flex flex-col items-center p-2 rounded-full bg-gray-700 text-white"
//         >
//           <BsThreeDotsVertical className="h-5 w-5" />
//           <span className="text-xs mt-1">More</span>
//         </button>

//         <button 
//           onClick={leaveMeeting}
//           className="flex flex-col items-center p-2 rounded-full bg-red-600 text-white"
//         >
//           <FaPhone className="h-5 w-5" />
//           <span className="text-xs mt-1">Leave</span>
//         </button>
//       </div>

//       {showParticipants && (
//         <div className="participants-panel absolute right-4 bottom-20 w-64 bg-white rounded-lg shadow-lg z-10">
//           <div className="p-3 border-b">
//             <h3 className="font-medium">Participants ({participants.length + 1})</h3>
//           </div>
//           <div className="max-h-60 overflow-y-auto">
//             <div className="p-3 flex items-center border-b">
//               <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
//               <span className="font-medium">{userName}</span>
//               <span className="ml-auto text-sm text-gray-500">You</span>
//             </div>
//             {participants.map((p, i) => (
//               <div key={i} className="p-3 flex items-center border-b">
//                 <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
//                 <span>{p.name}</span>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}

//       {showChat && (
//         <div className="chat-panel absolute right-4 bottom-20 w-64 bg-white rounded-lg shadow-lg z-10 flex flex-col">
//           <div className="p-3 border-b">
//             <h3 className="font-medium">Chat</h3>
//           </div>
//           <div className="flex-1 p-3 overflow-y-auto max-h-60">
//             {chatMessages.map((msg, i) => (
//               <div key={i} className="mb-3">
//                 <div className="font-medium text-blue-600">{msg.sender}</div>
//                 <div className="text-sm">{msg.text}</div>
//                 <div className="text-xs text-gray-500">{msg.timestamp}</div>
//               </div>
//             ))}
//           </div>
//           <div className="p-3 border-t">
//             <div className="flex">
//               <input
//                 type="text"
//                 value={messageInput}
//                 onChange={(e) => setMessageInput(e.target.value)}
//                 onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
//                 placeholder="Type a message..."
//                 className="flex-1 px-2 py-1 border rounded-l-md focus:outline-none focus:ring-1 focus:ring-blue-500"
//               />
//               <button
//                 onClick={sendMessage}
//                 className="bg-blue-600 text-white px-3 py-1 rounded-r-md hover:bg-blue-700"
//               >
//                 Send
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {showMeetingInfo && (
//         <div className="meeting-info-panel absolute right-4 bottom-20 w-64 bg-white rounded-lg shadow-lg z-10 p-4">
//           <h3 className="font-medium mb-3">Meeting Information</h3>
//           <div className="space-y-2">
//             <div>
//               <p className="text-sm text-gray-600">Meeting ID:</p>
//               <p className="font-mono font-medium">{meetingId}</p>
//             </div>
//             <div>
//               <p className="text-sm text-gray-600">Password:</p>
//               <p className="font-mono font-medium">{password}</p>
//             </div>
//           </div>
//           <button 
//             onClick={copyMeetingInfo}
//             className="mt-4 w-full flex items-center justify-center py-1 px-3 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
//           >
//             <FaCopy className="mr-2 h-4 w-4" />
//             Copy Invitation
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ZoomIntegration;

import { useState, useEffect, useRef } from "react";
import {
  FaVideo,
  FaVideoSlash,
  FaMicrophone,
  FaMicrophoneSlash,
  FaPhone,
  FaUserPlus,
  FaCopy,
  FaDesktop,
} from "react-icons/fa";
import { IoMdChatbubbles } from "react-icons/io";
import { BsThreeDotsVertical, BsPersonVideo } from "react-icons/bs";
import { useToast } from "@/hooks/use-toast";
import io from "socket.io-client";

interface ZoomIntegrationProps {
  meetingId: string;
  password: string;
  onMeetingEnd: () => void;
  userName: string;
}

const ZoomIntegration = ({
  meetingId,
  password,
  onMeetingEnd,
  userName,
}: ZoomIntegrationProps) => {
  // State management
  const [videoEnabled, setVideoEnabled] = useState(true);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [screenSharing, setScreenSharing] = useState(false);
  const [participants, setParticipants] = useState<any[]>([]);
  const [chatMessages, setChatMessages] = useState<any[]>([]);
  const [messageInput, setMessageInput] = useState("");
  const [showChat, setShowChat] = useState(false);
  const [showParticipants, setShowParticipants] = useState(false);
  const [showMeetingInfo, setShowMeetingInfo] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [joined, setJoined] = useState(false);
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [screenStream, setScreenStream] = useState<MediaStream | null>(null);
  const [permissionError, setPermissionError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const [mediaDevices, setMediaDevices] = useState<MediaDeviceInfo[]>([]);
  const [selectedCamera, setSelectedCamera] = useState<string>("");
  const [selectedMic, setSelectedMic] = useState<string>("");
  const [connectionStatus, setConnectionStatus] = useState<
    "connecting" | "connected" | "disconnected"
  >("connecting");

  // Refs
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const screenShareRef = useRef<HTMLVideoElement>(null);
  const socketRef = useRef<any>(null);
  const peersRef = useRef<Record<string, any>>({});
  const { toast } = useToast();

  // Initialize devices and permissions
  useEffect(() => {
    const initializeDevices = async () => {
      try {
        // Check for media devices
        const devices = await navigator.mediaDevices.enumerateDevices();
        setMediaDevices(devices);

        // Set default camera and microphone
        const cameras = devices.filter((d) => d.kind === "videoinput");
        const mics = devices.filter((d) => d.kind === "audioinput");

        if (cameras.length > 0) setSelectedCamera(cameras[0].deviceId);
        if (mics.length > 0) setSelectedMic(mics[0].deviceId);

        // Check permissions
        await checkPermissions();
      } catch (error) {
        console.error("Device initialization error:", error);
        setPermissionError(
          "Could not access media devices. Please check your permissions."
        );
      }
    };

    initializeDevices();

    // Cleanup function
    return () => {
      if (localStream) {
        localStream.getTracks().forEach((track) => track.stop());
      }
      if (screenStream) {
        screenStream.getTracks().forEach((track) => track.stop());
      }
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, []);

  // Handle permission changes
  const checkPermissions = async () => {
    try {
      if (navigator.permissions) {
        const cameraPermission = await navigator.permissions.query({
          name: "camera" as any,
        });
        cameraPermission.onchange = () =>
          handlePermissionChange("camera", cameraPermission.state);

        const micPermission = await navigator.permissions.query({
          name: "microphone" as any,
        });
        micPermission.onchange = () =>
          handlePermissionChange("microphone", micPermission.state);
      }
    } catch (error) {
      console.warn("Permission API not fully supported:", error);
    }
  };

  const handlePermissionChange = (type: string, state: string) => {
    if (state === "denied") {
      setPermissionError(
        `${type} access was denied. Please enable it in your browser settings.`
      );
    }
  };

  // Media access functions
  const requestMediaAccess = async () => {
    try {
      const constraints = {
        video: videoEnabled
          ? {
              deviceId: selectedCamera ? { exact: selectedCamera } : undefined,
              width: { ideal: 1280 },
              height: { ideal: 720 },
            }
          : false,
        audio: audioEnabled
          ? {
              deviceId: selectedMic ? { exact: selectedMic } : undefined,
              echoCancellation: true,
              noiseSuppression: true,
            }
          : false,
      };

      return await navigator.mediaDevices.getUserMedia(constraints);
    } catch (error) {
      console.error("Media access error:", error);
      throw error;
    }
  };

  // Meeting functions
  const joinMeeting = async () => {
    try {
      const stream = await requestMediaAccess();
      setPermissionError(null);
      setLocalStream(stream);

      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      }

      // Initialize socket connection
      socketRef.current = io("http://localhost:5000", {
        reconnectionAttempts: 5,
        reconnectionDelay: 1000,
      });

      socketRef.current.on("connect", () => {
        setConnectionStatus("connected");
      });

      socketRef.current.on("disconnect", () => {
        setConnectionStatus("disconnected");
      });

      socketRef.current.on("connect_error", (err: any) => {
        console.error("Connection error:", err);
        setConnectionStatus("disconnected");
      });

      socketRef.current.emit("join-meeting", {
        meetingId,
        password,
        name: userName,
      });

      // Setup event listeners
      setupSocketListeners();

      setJoined(true);
    } catch (error) {
      handleJoinError(error);
    }
  };

  const setupSocketListeners = () => {
    if (!socketRef.current) return;

    socketRef.current.on("participant-joined", (participant: any) => {
      setParticipants((prev) => [...prev, participant]);
    });

    socketRef.current.on("participant-left", (participantId: string) => {
      setParticipants((prev) => prev.filter((p) => p.id !== participantId));
    });

    socketRef.current.on("chat-message", (message: any) => {
      setChatMessages((prev) => [...prev, message]);
    });

    socketRef.current.on(
      "media-state-changed",
      ({ participantId, mediaType, state }: any) => {
        setParticipants((prev) =>
          prev.map((p) =>
            p.id === participantId ? { ...p, [mediaType]: state } : p
          )
        );
      }
    );
  };

  const handleJoinError = (error: any) => {
    console.error("Error joining meeting:", error);
    setRetryCount((prev) => prev + 1);

    let errorMessage = "Could not access camera/microphone. ";

    if (error.name === "NotAllowedError") {
      errorMessage += "Please check your browser permissions and try again.";
    } else if (
      error.name === "NotFoundError" ||
      error.name === "OverconstrainedError"
    ) {
      errorMessage += "No matching devices found. Please check your hardware.";
    } else {
      errorMessage += "Please try again.";
    }

    setPermissionError(errorMessage);
    toast({
      title: "Media Access Error",
      description: errorMessage,
      variant: "destructive",
    });
  };

  const retryMediaAccess = async () => {
    try {
      const stream = await requestMediaAccess();
      setPermissionError(null);
      setLocalStream(stream);

      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      }

      if (!joined) {
        await joinMeeting();
      }
    } catch (error) {
      console.error("Retry failed:", error);
      setPermissionError(
        "Failed to access media devices. Please check permissions and try again."
      );
    }
  };

  // Media control functions
  const toggleVideo = async () => {
    const newState = !videoEnabled;
    setVideoEnabled(newState);

    if (localStream) {
      localStream.getVideoTracks().forEach((track) => {
        track.enabled = newState;
      });

      if (newState && localStream.getVideoTracks().length === 0) {
        try {
          const stream = await requestMediaAccess();
          setLocalStream(stream);
          if (localVideoRef.current) {
            localVideoRef.current.srcObject = stream;
          }
        } catch (error) {
          console.error("Error enabling video:", error);
          setVideoEnabled(false);
        }
      }
    }

    // Notify other participants
    socketRef.current?.emit("media-state-change", {
      mediaType: "video",
      state: newState,
    });
  };

  const toggleAudio = async () => {
    const newState = !audioEnabled;
    setAudioEnabled(newState);

    if (localStream) {
      localStream.getAudioTracks().forEach((track) => {
        track.enabled = newState;
      });

      if (newState && localStream.getAudioTracks().length === 0) {
        try {
          const stream = await requestMediaAccess();
          setLocalStream(stream);
          if (localVideoRef.current) {
            localVideoRef.current.srcObject = stream;
          }
        } catch (error) {
          console.error("Error enabling audio:", error);
          setAudioEnabled(false);
        }
      }
    }

    // Notify other participants
    socketRef.current?.emit("media-state-change", {
      mediaType: "audio",
      state: newState,
    });
  };

  const toggleScreenShare = async () => {
    try {
      if (!screenSharing) {
        const stream = await navigator.mediaDevices.getDisplayMedia({
          video: true,
          audio: true,
        });

        setScreenStream(stream);

        if (screenShareRef.current) {
          screenShareRef.current.srcObject = stream;
        }

        setScreenSharing(true);

        // Handle when user stops sharing via browser UI
        stream.getVideoTracks()[0].onended = () => {
          toggleScreenShare();
        };
      } else {
        // Stop screen sharing
        if (screenStream) {
          screenStream.getTracks().forEach((track) => track.stop());
          setScreenStream(null);
        }

        setScreenSharing(false);
      }
    } catch (error) {
      console.error("Error handling screen share:", error);
      setScreenSharing(false);
    }
  };

  // Chat functions
  const sendMessage = () => {
    if (messageInput.trim() && socketRef.current) {
      const newMessage = {
        sender: userName,
        text: messageInput,
        timestamp: new Date().toISOString(),
      };

      socketRef.current.emit("send-message", newMessage);
      setChatMessages((prev) => [...prev, newMessage]);
      setMessageInput("");
    }
  };

  // Meeting info functions
  const copyMeetingInfo = () => {
    navigator.clipboard.writeText(
      `Meeting ID: ${meetingId}\nPassword: ${password}`
    );
    toast({
      title: "Copied to clipboard",
      description: "Meeting information has been copied to your clipboard.",
    });
  };

  // Device management
  const handleDeviceChange = async (
    type: "camera" | "mic",
    deviceId: string
  ) => {
    if (!localStream) return;

    try {
      const constraints = {
        video:
          type === "camera"
            ? {
                deviceId: { exact: deviceId },
                width: { ideal: 1280 },
                height: { ideal: 720 },
              }
            : false,
        audio:
          type === "mic"
            ? {
                deviceId: { exact: deviceId },
                echoCancellation: true,
                noiseSuppression: true,
              }
            : false,
      };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);

      // Replace the relevant tracks
      if (type === "camera") {
        const oldVideoTracks = localStream.getVideoTracks();
        const [newVideoTrack] = stream.getVideoTracks();

        oldVideoTracks.forEach((track) => track.stop());
        localStream.removeTrack(oldVideoTracks[0]);
        localStream.addTrack(newVideoTrack);

        setSelectedCamera(deviceId);
      } else {
        const oldAudioTracks = localStream.getAudioTracks();
        const [newAudioTrack] = stream.getAudioTracks();

        oldAudioTracks.forEach((track) => track.stop());
        localStream.removeTrack(oldAudioTracks[0]);
        localStream.addTrack(newAudioTrack);

        setSelectedMic(deviceId);
      }

      if (localVideoRef.current) {
        localVideoRef.current.srcObject = localStream;
      }
    } catch (error) {
      console.error(`Error changing ${type}:`, error);
      toast({
        title: "Device Error",
        description: `Could not switch ${type}. Please try another device.`,
        variant: "destructive",
      });
    }
  };

  // Meeting control
  const leaveMeeting = () => {
    if (localStream) {
      localStream.getTracks().forEach((track) => track.stop());
    }
    if (screenStream) {
      screenStream.getTracks().forEach((track) => track.stop());
    }
    if (socketRef.current) {
      socketRef.current.disconnect();
    }
    setJoined(false);
    onMeetingEnd();
  };

  // Render pre-join screen
  if (!joined) {
    return (
      <div className="join-container p-6 max-w-md mx-auto bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center mb-6">Join Meeting</h1>

        {permissionError && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4 rounded">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-red-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{permissionError}</p>
                <div className="mt-2">
                  <button
                    onClick={retryMediaAccess}
                    className="text-sm bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md"
                  >
                    Retry
                  </button>
                  <a
                    href="https://support.google.com/chrome/answer/2693767"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-2 text-sm text-red-600 hover:text-red-500 hover:underline"
                  >
                    Learn how to fix
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="meeting-info bg-blue-50 p-4 rounded-lg mb-6">
          <h3 className="font-medium text-blue-800 mb-2">
            Meeting Information
          </h3>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <p className="text-sm text-gray-600">Meeting ID:</p>
              <p className="font-mono font-medium">{meetingId}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Password:</p>
              <p className="font-mono font-medium">{password}</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Your Name
            </label>
            <input
              type="text"
              id="name"
              value={userName}
              readOnly
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Camera
              </label>
              <select
                value={selectedCamera}
                onChange={(e) => setSelectedCamera(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                {mediaDevices
                  .filter((d) => d.kind === "videoinput")
                  .map((device) => (
                    <option key={device.deviceId} value={device.deviceId}>
                      {device.label || `Camera ${device.deviceId.slice(0, 5)}`}
                    </option>
                  ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Microphone
              </label>
              <select
                value={selectedMic}
                onChange={(e) => setSelectedMic(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                {mediaDevices
                  .filter((d) => d.kind === "audioinput")
                  .map((device) => (
                    <option key={device.deviceId} value={device.deviceId}>
                      {device.label || `Mic ${device.deviceId.slice(0, 5)}`}
                    </option>
                  ))}
              </select>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="video"
                checked={videoEnabled}
                onChange={() => setVideoEnabled(!videoEnabled)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label
                htmlFor="video"
                className="ml-2 block text-sm text-gray-700"
              >
                Enable Video
              </label>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="audio"
                checked={audioEnabled}
                onChange={() => setAudioEnabled(!audioEnabled)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label
                htmlFor="audio"
                className="ml-2 block text-sm text-gray-700"
              >
                Enable Audio
              </label>
            </div>
          </div>

          <div className="pt-2">
            <button
              onClick={joinMeeting}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Join Meeting
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Render meeting screen
  return (
    <div className="meeting-container h-full flex flex-col bg-gray-900">
      {/* Connection status indicator */}
      <div
        className={`absolute top-2 left-2 z-50 px-3 py-1 rounded-full text-xs ${
          connectionStatus === "connected"
            ? "bg-green-500"
            : connectionStatus === "connecting"
            ? "bg-yellow-500"
            : "bg-red-500"
        } text-white`}
      >
        {connectionStatus === "connected"
          ? "Connected"
          : connectionStatus === "connecting"
          ? "Connecting..."
          : "Disconnected"}
      </div>

      {/* Main video area */}
      <div className="video-container flex-1 relative">
        {/* Remote participants video */}
        <div className="remote-video absolute inset-0 bg-black">
          <video
            ref={remoteVideoRef}
            autoPlay
            playsInline
            className="w-full h-full object-cover"
          />
          {participants.length > 0 && (
            <div className="participant-name absolute bottom-4 left-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-md">
              {participants[0].name}
            </div>
          )}
        </div>

        {/* Local webcam video */}
        {videoEnabled && (
          <div className="local-video absolute bottom-4 right-4 w-64 h-48 bg-black rounded-md overflow-hidden border-2 border-white shadow-lg">
            <video
              ref={localVideoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover"
            />
            <div className="participant-name absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white px-2 py-1 text-sm truncate">
              {userName} (You)
            </div>
          </div>
        )}

        {/* Screen share video */}
        {screenSharing && (
          <div className="absolute top-4 left-4 w-1/2 h-1/2 bg-black rounded-md overflow-hidden border-2 border-blue-500 shadow-lg z-10">
            <video
              ref={screenShareRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-contain bg-gray-800"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white px-2 py-1 text-sm truncate">
              {userName}'s Screen
            </div>
          </div>
        )}
      </div>

      {/* Controls bar */}
      <div className="controls bg-gray-800 p-3 flex items-center justify-center space-x-4">
        {/* Audio control */}
        <button
          onClick={toggleAudio}
          className={`flex flex-col items-center p-2 rounded-full ${
            audioEnabled ? "bg-gray-700 text-white" : "bg-red-500 text-white"
          }`}
          title={audioEnabled ? "Mute" : "Unmute"}
        >
          {audioEnabled ? (
            <FaMicrophone className="h-5 w-5" />
          ) : (
            <FaMicrophoneSlash className="h-5 w-5" />
          )}
          <span className="text-xs mt-1">
            {audioEnabled ? "Mute" : "Unmute"}
          </span>
        </button>

        {/* Video control */}
        <button
          onClick={toggleVideo}
          className={`flex flex-col items-center p-2 rounded-full ${
            videoEnabled ? "bg-gray-700 text-white" : "bg-red-500 text-white"
          }`}
          title={videoEnabled ? "Stop Video" : "Start Video"}
        >
          {videoEnabled ? (
            <FaVideo className="h-5 w-5" />
          ) : (
            <FaVideoSlash className="h-5 w-5" />
          )}
          <span className="text-xs mt-1">
            {videoEnabled ? "Stop Video" : "Start Video"}
          </span>
        </button>

        {/* Screen share control */}
        <button
          onClick={toggleScreenShare}
          className={`flex flex-col items-center p-2 rounded-full ${
            screenSharing ? "bg-blue-600 text-white" : "bg-gray-700 text-white"
          }`}
          title={screenSharing ? "Stop Share" : "Share Screen"}
        >
          <FaDesktop className="h-5 w-5" />
          <span className="text-xs mt-1">
            {screenSharing ? "Stop Share" : "Share Screen"}
          </span>
        </button>

        {/* Participants control */}
        <button
          onClick={() => {
            setShowParticipants(!showParticipants);
            setShowChat(false);
            setShowMeetingInfo(false);
            setShowSettings(false);
          }}
          className={`flex flex-col items-center p-2 rounded-full ${
            showParticipants
              ? "bg-blue-600 text-white"
              : "bg-gray-700 text-white"
          }`}
          title="Participants"
        >
          <FaUserPlus className="h-5 w-5" />
          <span className="text-xs mt-1">
            Participants ({participants.length + 1})
          </span>
        </button>

        {/* Chat control */}
        <button
          onClick={() => {
            setShowChat(!showChat);
            setShowParticipants(false);
            setShowMeetingInfo(false);
            setShowSettings(false);
          }}
          className={`flex flex-col items-center p-2 rounded-full ${
            showChat ? "bg-blue-600 text-white" : "bg-gray-700 text-white"
          }`}
          title="Chat"
        >
          <IoMdChatbubbles className="h-5 w-5" />
          <span className="text-xs mt-1">Chat</span>
        </button>

        {/* Settings control */}
        <button
          onClick={() => {
            setShowSettings(!showSettings);
            setShowParticipants(false);
            setShowChat(false);
            setShowMeetingInfo(false);
          }}
          className={`flex flex-col items-center p-2 rounded-full ${
            showSettings ? "bg-blue-600 text-white" : "bg-gray-700 text-white"
          }`}
          title="Settings"
        >
          <BsThreeDotsVertical className="h-5 w-5" />
          <span className="text-xs mt-1">Settings</span>
        </button>

        {/* End meeting control */}
        <button
          onClick={leaveMeeting}
          className="flex flex-col items-center p-2 rounded-full bg-red-600 text-white"
          title="Leave Meeting"
        >
          <FaPhone className="h-5 w-5" />
          <span className="text-xs mt-1">Leave</span>
        </button>
      </div>

      {/* Participants panel */}
      {showParticipants && (
        <div className="participants-panel absolute right-4 bottom-20 w-64 bg-white rounded-lg shadow-lg z-10">
          <div className="p-3 border-b">
            <h3 className="font-medium">
              Participants ({participants.length + 1})
            </h3>
          </div>
          <div className="max-h-60 overflow-y-auto">
            <div className="p-3 flex items-center border-b">
              <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
              <span className="font-medium">{userName}</span>
              <span className="ml-auto text-sm text-gray-500">You</span>
            </div>
            {participants.map((participant) => (
              <div
                key={participant.id}
                className="p-3 flex items-center border-b"
              >
                <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                <span>{participant.name}</span>
                <div className="ml-auto flex space-x-1">
                  {participant.audio && (
                    <FaMicrophone className="h-4 w-4 text-green-500" />
                  )}
                  {participant.video && (
                    <FaVideo className="h-4 w-4 text-green-500" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Chat panel */}
      {showChat && (
        <div className="chat-panel absolute right-4 bottom-20 w-64 bg-white rounded-lg shadow-lg z-10 flex flex-col">
          <div className="p-3 border-b">
            <h3 className="font-medium">Chat</h3>
          </div>
          <div className="flex-1 p-3 overflow-y-auto max-h-60">
            {chatMessages.length === 0 ? (
              <div className="text-center text-gray-500 py-4">
                No messages yet
              </div>
            ) : (
              chatMessages.map((msg, i) => (
                <div key={i} className="mb-3">
                  <div className="font-medium text-blue-600">{msg.sender}</div>
                  <div className="text-sm">{msg.text}</div>
                  <div className="text-xs text-gray-500">
                    {new Date(msg.timestamp).toLocaleTimeString()}
                  </div>
                </div>
              ))
            )}
          </div>
          <div className="p-3 border-t">
            <div className="flex">
              <input
                type="text"
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                placeholder="Type a message..."
                className="flex-1 px-2 py-1 border rounded-l-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              <button
                onClick={sendMessage}
                className="bg-blue-600 text-white px-3 py-1 rounded-r-md hover:bg-blue-700"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Settings panel */}
      {showSettings && (
        <div className="settings-panel absolute right-4 bottom-20 w-64 bg-white rounded-lg shadow-lg z-10 p-4">
          <h3 className="font-medium mb-3">Settings</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Camera
              </label>
              <select
                value={selectedCamera}
                onChange={(e) => handleDeviceChange("camera", e.target.value)}
                className="w-full px-2 py-1 border rounded-md"
              >
                {mediaDevices
                  .filter((d) => d.kind === "videoinput")
                  .map((device) => (
                    <option key={device.deviceId} value={device.deviceId}>
                      {device.label || `Camera ${device.deviceId.slice(0, 5)}`}
                    </option>
                  ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Microphone
              </label>
              <select
                value={selectedMic}
                onChange={(e) => handleDeviceChange("mic", e.target.value)}
                className="w-full px-2 py-1 border rounded-md"
              >
                {mediaDevices
                  .filter((d) => d.kind === "audioinput")
                  .map((device) => (
                    <option key={device.deviceId} value={device.deviceId}>
                      {device.label || `Mic ${device.deviceId.slice(0, 5)}`}
                    </option>
                  ))}
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Meeting info panel */}
      {showMeetingInfo && (
        <div className="meeting-info-panel absolute right-4 bottom-20 w-64 bg-white rounded-lg shadow-lg z-10 p-4">
          <h3 className="font-medium mb-3">Meeting Information</h3>
          <div className="space-y-2">
            <div>
              <p className="text-sm text-gray-600">Meeting ID:</p>
              <p className="font-mono font-medium">{meetingId}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Password:</p>
              <p className="font-mono font-medium">{password}</p>
            </div>
          </div>
          <button
            onClick={copyMeetingInfo}
            className="mt-4 w-full flex items-center justify-center py-1 px-3 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <FaCopy className="mr-2 h-4 w-4" />
            Copy Invitation
          </button>
        </div>
      )}
    </div>
  );
};

export default ZoomIntegration;