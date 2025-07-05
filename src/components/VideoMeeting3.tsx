// // // // src/components/VideoMeeting1.jsx
// // // import React, { useEffect } from "react";
// // // //import { VideoSDKMeeting } from "@videosdk.live/prebuilt";
// // // import { VideoSDKMeeting } from "@videosdk.live/rtc-js-prebuilt";

// // // const VideoMeeting1 = ({ meetingId, token }) => {
// // //   useEffect(() => {
// // //     VideoSDKMeeting({
// // //       name: "John Doe", // Replace with user's name
// // //       meetingId: meetingId,
// // //       apiKey: "8c81aa57-9868-417a-91c2-85006735bb62",
// // //       token: token,           // Replace with your generated token
// // //       containerId: null,      // Optional: set to an element ID if needed
// // //       micEnabled: true,
// // //       webcamEnabled: true,
// // //       participantCanToggleSelfWebcam: true,
// // //       participantCanToggleSelfMic: true,
// // //     });
// // //   }, [meetingId, token]);

// // //   return <div style={{ height: "100vh" }} />;
// // // };

// // // export default VideoMeeting1;

// // import React, { useEffect } from "react";
// // import { VideoSDKMeeting } from "@videosdk.live/rtc-js-prebuilt";

// // const VideoMeeting = ({ meetingId, apiKey, name }) => {
// //   useEffect(() => {
// //     const meeting = new VideoSDKMeeting();
// //     meeting.init({
// //       name,
// //       meetingId,
// //       apiKey,
// //       containerId: null,  // renders in default container
// //       micEnabled: true,
// //       webcamEnabled: true,
// //       participantCanToggleSelfWebcam: true,
// //       participantCanToggleSelfMic: true,
// //       chatEnabled: true,
// //       screenShareEnabled: true,
// //     });
// //   }, [meetingId, apiKey, name]);

// //   return <div style={{ height: "100%" }} />;
// // };

// // export default VideoMeeting;

// import React from 'react'

// const VideoMeeting1 = ({ meetingId, apiKey, name }) => {
//     useEffect(() => {
//       const script = document.createElement("script");
//       script.src = "https://sdk.videosdk.live/rtc-js-prebuilt/0.3.34/rtc-js-prebuilt.js";
//       script.async = true;
//       script.onload = () => {
//         const meeting = new window.VideoSDKMeeting();
//         meeting.init({
//           name,
//           meetingId,
//           apiKey,
//           containerId: null,
//           micEnabled: true,
//           webcamEnabled: true,
//           participantCanToggleSelfWebcam: true,
//           participantCanToggleSelfMic: true,
//         });
//       };
//       document.body.appendChild(script);

//       // Cleanup on unmount
//       return () => {
//         document.body.removeChild(script);
//       };
//     }, [meetingId, apiKey, name]);

//     return <div style={{ height: "100vh" }} />;
//   };

// export default VideoMeeting1

// src/components/VideoMeeting1.tsx
import { useEffect } from "react";

interface VideoMeetingProps {
  apiKey: string;
  meetingId: string;
  name: string;
}

const VideoMeeting3 = ({ apiKey, meetingId, name }: VideoMeetingProps) => {
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
        containerId: null,
        micEnabled: true,
        webcamEnabled: true,
        participantCanToggleSelfWebcam: true,
        participantCanToggleSelfMic: true,
        chatEnabled: true,
      });
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [apiKey, meetingId, name]);

  return <div style={{ height: "100vh" }} />;
};

export default VideoMeeting3;
