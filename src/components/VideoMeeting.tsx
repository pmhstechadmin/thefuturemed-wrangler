// import { useEffect, useRef, useState } from "react";
// import { useNavigate } from "react-router-dom";

// export interface VideoMeetingProps {
//   apiKey: string;
//   meetingId: string;
//   name: string;
//   micEnabled?: boolean;
//   webcamEnabled?: boolean;
//   containerId?: string | null;
//   isHost?: boolean;
//   onMeetingLeave?: () => void;
//   style?: React.CSSProperties;
//   meetingTitle?: string;
// }

// const VideoMeeting = ({
//   apiKey,
//   meetingId,
//   name,
//   micEnabled = true,
//   webcamEnabled = true,
//   containerId = null,
//   isHost = false,
//   style,
//   onMeetingLeave = () => {},
//   meetingTitle = "Seminar Meeting",
// }: VideoMeetingProps) => {
//   const navigate = useNavigate();
//   const containerRef = useRef<HTMLDivElement>(null);
//   const meetingInitialized = useRef(false);
//   const [containerReady, setContainerReady] = useState(false);
//   const idRef = useRef(
//     containerId || `video-container-${Math.random().toString(36).substr(2, 9)}`
//   );

//   useEffect(() => {
//     // Mark container as ready once it's rendered
//     if (containerRef.current) {
//       setContainerReady(true);
//     }
//   }, []);

//   useEffect(() => {
//     if (!apiKey || !containerReady || meetingInitialized.current) {
//       return;
//     }

//     const scriptSrc =
//       "https://sdk.videosdk.live/rtc-js-prebuilt/0.3.34/rtc-js-prebuilt.js";
//     let script: HTMLScriptElement | null = null;

//     const initializeMeeting = () => {
//       try {
//         const meeting = new (window as any).VideoSDKMeeting();

//         const config = {
//           name,
//           meetingId: meetingId ,
//           apiKey,
//           containerId: idRef.current,
//           micEnabled: micEnabled,
//           webcamEnabled: webcamEnabled,
//           participantCanToggleSelfWebcam: true,
//           participantCanToggleSelfMic: true,
//           screenShareEnabled: isHost,
//           chatEnabled: true,
//           raiseHandEnabled: true,
//           joinScreen: {
//             visible: true,
//             title: meetingTitle,
//             // title: "Daily scrum",
//           },
//           permissions: {
//             askToJoin: false,
//             toggleParticipantMic: isHost,
//             toggleParticipantWebcam: isHost,
//             changeLayout: true,
//             canCreatePoll: true,
//             endMeeting: isHost,
//           },

//           layout: {
//             type: "SIDEBAR", // "SPOTLIGHT" | "SIDEBAR" | "GRID"
//             priority: "PIN", // "SPEAKER" | "PIN",
//             gridSize: 3,
//           },

//           whiteboardEnabled: false,
//           recordingEnabled: false,
//           liveStreamEnabled: false,
//           brandingEnabled: true,
//           brandLogoURL:
//             "https://thefuturemed.com/wp-content/uploads/2025/01/thefuturemed_logo.jpg",
//           brandName: "Room#1",
//           poweredBy: false,
//           // leftScreen: {
//           //   actionButton: {
//           //     label: "Back",
//           //     href: "/seminar",
//           //   },
//           //   rejoinButtonEnabled: true,
//           // },
//         };

//         const cleanConfig = Object.fromEntries(
//           Object.entries(config).filter(([_, v]) => v !== undefined)
//         );

//         // meeting.init(cleanConfig);
//         if (meetingId) {
//           // First time host - initialize new meeting
//           meeting.init(cleanConfig);
//           console.log("Initializing new meeting with ID:", meetingId);
//         } else {
//           // Participants or rejoining host - join existing meeting
//           meeting.join(cleanConfig);
//           console.log("Joining existing meeting with ID:", meetingId);
//         }

//         meetingInitialized.current = true;

//         // Ensure mic/cam are disabled after meeting joins
//         setTimeout(() => {
//           if (!micEnabled) {
//             meeting?.localParticipant?.disableMic?.();
//           }
//           if (!webcamEnabled) {
//             meeting?.localParticipant?.disableWebcam?.();
//           }
//         }, 1000);
//       } catch (error) {
//         console.error("Error initializing VideoSDK meeting:", error);
//       }
//     };

//     // Check if script is already loaded
//     const existingScript = document.querySelector(`script[src="${scriptSrc}"]`);
//     if (existingScript) {
//       script = existingScript as HTMLScriptElement;
//     } else {
//       script = document.createElement("script");
//       script.src = scriptSrc;
//       script.async = true;
//       document.body.appendChild(script);
//     }

//     // Initialize immediately if SDK is already available
//     if ((window as any).VideoSDKMeeting) {
//       initializeMeeting();
//       return;
//     }

//     const onScriptLoad = () => {
//       if ((window as any).VideoSDKMeeting) {
//         initializeMeeting();
//       }
//     };

//     script.addEventListener("load", onScriptLoad);

//     return () => {
//       if (script) {
//         script.removeEventListener("load", onScriptLoad);
//       }
//       onMeetingLeave();
//       meetingInitialized.current = false;
//     };
//   }, [
//     apiKey,
//     meetingId,
//     name,
//     micEnabled,
//     webcamEnabled,
//     containerId,
//     isHost,
//     onMeetingLeave,
//     containerReady,
//   ]);
//   const handleHostAction = () => {
//     console.log("Host-only action triggered");
//     // You can trigger any logic here, e.g., start recording, custom alert, etc.
//   };

//   return (
//     <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
//       {isHost && (
//         <button
//           onClick={handleHostAction}
//           style={{
//             position: "absolute",
//             top: 10,
//             right: 10,
//             zIndex: 1000,
//             padding: "8px 12px",
//             backgroundColor: "#007bff",
//             color: "#fff",
//             border: "none",
//             borderRadius: "4px",
//             cursor: "pointer",
//           }}
//         >
//           Host Action
//         </button>
//       )}
//       <div
//         ref={containerRef}
//         id={idRef.current}
//         style={{
//           flex: 1,
//           minHeight: 0,
//           backgroundColor: "#f0f0f0",
//           position: "relative",
//           ...style,
//         }}
//       />
//     </div>
//   );
// };

// export default VideoMeeting;


import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export interface VideoMeetingProps {
  apiKey: string;
  meetingId: string; // This should be your seminar ID (e.g., "6idk-rpv5-fmu9")
  sessionId?: string; // Optional session ID for rejoining
  name: string;
  micEnabled?: boolean;
  webcamEnabled?: boolean;
  containerId?: string | null;
  isHost?: boolean;
  onMeetingLeave?: () => void;
  style?: React.CSSProperties;
  meetingTitle?: string;
  isRejoining?: boolean;
}

const VideoMeeting = ({
  apiKey,
  meetingId,
  sessionId,
  name,
  micEnabled = true,
  webcamEnabled = true,
  containerId = null,
  isHost = false,
  style,
  onMeetingLeave = () => {},
  meetingTitle = "Seminar Meeting",
  // isRejoining = false,
   isRejoining ,
}: VideoMeetingProps) => {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const meetingInitialized = useRef(false);
  const [containerReady, setContainerReady] = useState(false);
  const idRef = useRef(
    containerId || `video-container-${Math.random().toString(36).substr(2, 9)}`
  );

  useEffect(() => {
    if (containerRef.current) {
      setContainerReady(true);
    }
  }, []);

  useEffect(() => {
    if (
      !apiKey ||
      !containerReady ||
      meetingInitialized.current ||
      !meetingId
    ) {
      return;
    }

    const scriptSrc =
      "https://sdk.videosdk.live/rtc-js-prebuilt/0.3.34/rtc-js-prebuilt.js";
    let script: HTMLScriptElement | null = null;

    const initializeMeeting = () => {
      try {
        const meeting = new (window as any).VideoSDKMeeting();

        const config = {
          name,
          meetingId: meetingId, // Always use the seminar ID
          apiKey,
          containerId: idRef.current,
          micEnabled: micEnabled,
          webcamEnabled: webcamEnabled,
          participantCanToggleSelfWebcam: true,
          participantCanToggleSelfMic: true,
          screenShareEnabled: isHost,
          chatEnabled: true,
          raiseHandEnabled: true,
          joinScreen: {
            visible: true,
            title: meetingTitle,
          },
          permissions: {
            askToJoin: false,
            toggleParticipantMic: isHost,
            toggleParticipantWebcam: isHost,
            changeLayout: true,
            canCreatePoll: true,
            endMeeting: isHost,
          },
          layout: {
            type: "SIDEBAR",
            priority: "PIN",
            gridSize: 3,
          },
          whiteboardEnabled: false,
          recordingEnabled: false,
          liveStreamEnabled: false,
          brandingEnabled: true,
          brandLogoURL:
            "https://thefuturemed.com/wp-content/uploads/2025/01/thefuturemed_logo.jpg",
          brandName: "Room#1",
          poweredBy: false,
          // For rejoining existing session
          participantId: isRejoining && sessionId ? sessionId : undefined,
        };

        const cleanConfig = Object.fromEntries(
          Object.entries(config).filter(([_, v]) => v !== undefined)
        );

        console.log(
          `Initializing meeting with ID: ${meetingId}${
            isRejoining ? " (rejoining)" : ""
          }`
        );

        if (isRejoining && sessionId) {
          console.log(`Rejoining session with ID: ${sessionId}`);
          // Use join instead of init for rejoining
          meeting.join(cleanConfig);
        } else {
            console.log(`Starting new session`);
          meeting.init(cleanConfig);
        }

        meetingInitialized.current = true;

        setTimeout(() => {
          if (!micEnabled) {
            meeting?.localParticipant?.disableMic?.();
          }
          if (!webcamEnabled) {
            meeting?.localParticipant?.disableWebcam?.();
          }
        }, 1000);
      } catch (error) {
        console.error("Error initializing VideoSDK meeting:", error);
      }
    };

    const existingScript = document.querySelector(`script[src="${scriptSrc}"]`);
    if (existingScript) {
      script = existingScript as HTMLScriptElement;
    } else {
      script = document.createElement("script");
      script.src = scriptSrc;
      script.async = true;
      document.body.appendChild(script);
    }

    if ((window as any).VideoSDKMeeting) {
      initializeMeeting();
      return;
    }

    const onScriptLoad = () => {
      if ((window as any).VideoSDKMeeting) {
        initializeMeeting();
      }
    };

    script.addEventListener("load", onScriptLoad);

    return () => {
      if (script) {
        script.removeEventListener("load", onScriptLoad);
      }
      onMeetingLeave();
      meetingInitialized.current = false;
    };
  }, [
    apiKey,
    meetingId,
    sessionId,
    name,
    micEnabled,
    webcamEnabled,
    containerId,
    isHost,
    onMeetingLeave,
    containerReady,
    meetingTitle,
    isRejoining,
  ]);

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <div
        ref={containerRef}
        id={idRef.current}
        style={{
          flex: 1,
          minHeight: 0,
          backgroundColor: "#f0f0f0",
          position: "relative",
          ...style,
        }}
      />
    </div>
  );
};

export default VideoMeeting;