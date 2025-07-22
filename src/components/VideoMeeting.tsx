import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export interface VideoMeetingProps {
  apiKey: string;
  meetingId: string;
  name: string;
  micEnabled?: boolean;
  webcamEnabled?: boolean;
  containerId?: string | null;
  isHost?: boolean;
  onMeetingLeave?: () => void;
  style?: React.CSSProperties;
}

const VideoMeeting = ({
  apiKey,
  meetingId,
  name,
  micEnabled = true,
  webcamEnabled = true,
  containerId = null,
  isHost = false,
  style,
  onMeetingLeave = () => {},
}: VideoMeetingProps) => {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const meetingInitialized = useRef(false);
  const [containerReady, setContainerReady] = useState(false);
  const idRef = useRef(
    containerId || `video-container-${Math.random().toString(36).substr(2, 9)}`
  );

  useEffect(() => {
    // Mark container as ready once it's rendered
    if (containerRef.current) {
      setContainerReady(true);
    }
  }, []);

  useEffect(() => {
    if (!apiKey || !containerReady || meetingInitialized.current) {
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
          meetingId,
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
            title: "Daily scrum",
          },
          permissions: {
            askToJoin: false,
            toggleParticipantMic: isHost,
            toggleParticipantWebcam: isHost,
            changeLayout: true,
            canCreatePoll: true,
            endMeeting: true,
          },

          layout: {
            type: "SIDEBAR", // "SPOTLIGHT" | "SIDEBAR" | "GRID"
            priority: "PIN", // "SPEAKER" | "PIN",
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
          // leftScreen: {
          //   actionButton: {
          //     label: "Back",
          //     href: "/seminar",
          //   },
          //   rejoinButtonEnabled: true,
          // },
        };

        const cleanConfig = Object.fromEntries(
          Object.entries(config).filter(([_, v]) => v !== undefined)
        );

        meeting.init(cleanConfig);
        meetingInitialized.current = true;

        // Ensure mic/cam are disabled after meeting joins
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

    // Check if script is already loaded
    const existingScript = document.querySelector(`script[src="${scriptSrc}"]`);
    if (existingScript) {
      script = existingScript as HTMLScriptElement;
    } else {
      script = document.createElement("script");
      script.src = scriptSrc;
      script.async = true;
      document.body.appendChild(script);
    }

    // Initialize immediately if SDK is already available
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
    name,
    micEnabled,
    webcamEnabled,
    containerId,
    isHost,
    onMeetingLeave,
    containerReady,
  ]);
  const handleHostAction = () => {
    console.log("Host-only action triggered");
    // You can trigger any logic here, e.g., start recording, custom alert, etc.
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      {isHost && (
        <button
          onClick={handleHostAction}
          style={{
            position: "absolute",
            top: 10,
            right: 10,
            zIndex: 1000,
            padding: "8px 12px",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Host Action
        </button>
      )}
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
