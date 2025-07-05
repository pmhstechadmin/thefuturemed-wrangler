// //
// import { useEffect } from "react";

// interface VideoMeetingProps {
//   apiKey: string;
//   meetingId: string;
//   name: string;
//   micEnabled?: boolean;
//   webcamEnabled?: boolean;
//   containerId?: string | null;
// }

// const VideoMeeting4 = ({
//   apiKey,
//   meetingId,
//   name = "Guest",
//   micEnabled = true,
//   webcamEnabled = true,
//   containerId = null,
// }: VideoMeetingProps) => {
//   useEffect(() => {
//     const initializeMeeting = () => {
//       const VideoSDK = (window as any).VideoSDK;

//       if (!VideoSDK || !VideoSDK.Meeting) {
//         const script = document.createElement("script");
//         script.src =
//           "https://sdk.videosdk.live/rtc-js-prebuilt/0.3.34/rtc-js-prebuilt.js";
//         script.async = true;
//         script.onload = () => setupMeeting();
//         document.body.appendChild(script);

//         return () => {
//           document.body.removeChild(script);
//         };
//       } else {
//         setupMeeting();
//       }
//     };

//     const setupMeeting = () => {
//       const meeting = new (window as any).VideoSDK.Meeting({
//         name,
//         meetingId,
//         apiKey,
//         containerId,
//         micEnabled,
//         webcamEnabled,
//         participantCanToggleSelfWebcam: true,
//         participantCanToggleSelfMic: true,
//         chatEnabled: true,
//         screenShareEnabled: true,
//       });
//       meeting.init();
//     };

//     initializeMeeting();
//   }, [apiKey, meetingId, name, micEnabled, webcamEnabled, containerId]);

//   return <div style={{ height: "100vh" }} />;
// };

// export default VideoMeeting4;

import { useEffect } from "react";

export interface VideoMeetingProps {
  apiKey: string;
  meetingId: string;
  name: string;
  micEnabled?: boolean;
  webcamEnabled?: boolean;
  containerId?: string | null;
}

const VideoMeeting4 = ({
  apiKey,
  meetingId,
  name,
  micEnabled = true,
  webcamEnabled = true,
  containerId = null,
}: VideoMeetingProps) => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://sdk.videosdk.live/rtc-js-prebuilt/0.3.34/rtc-js-prebuilt.js";
    script.async = true;
    script.onload = () => {
      const meeting = new (window as any).VideoSDKMeeting();
      meeting.init({
        name,
        meetingId,
        apiKey,
        containerId,
        micEnabled,
        webcamEnabled,
        participantCanToggleSelfWebcam: true,
        participantCanToggleSelfMic: true,
        chatEnabled: true,
        screenShareEnabled: true,
        
      });
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [apiKey, meetingId, name, micEnabled, webcamEnabled, containerId]);

  return <div style={{ height: "100vh" }} />;
};

export default VideoMeeting4;
