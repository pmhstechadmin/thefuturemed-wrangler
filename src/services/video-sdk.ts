// // src/services/video-sdk.ts

// declare global {
//     interface Window {
//       VideoSDK: {
//         ready: Promise<void>;
//         prebuilt: {
//           new (config: VideoSDKConfig): VideoSDKMeeting;
//         };
//       };
//     }
//   }
  
//   interface VideoSDKConfig {
//     name: string;
//     apiKey: string;
//     meetingId: string;
//     containerId: string;
//     redirectOnLeave: string;
//     micEnabled: boolean;
//     webcamEnabled: boolean;
//     participantCanToggleSelfWebcam: boolean;
//     participantCanToggleSelfMic: boolean;
//     permissions: {
//       askToJoin: boolean;
//       toggleParticipantMic: boolean;
//       toggleParticipantWebcam: boolean;
//       removeParticipant: boolean;
//       endMeeting: boolean;
//     };
//   }
  
//   interface VideoSDKMeeting {
//     mount: (container: HTMLElement) => void;
//     unmount: () => void;
//     leave: () => void;
//   }
  
//   export const loadVideoSDK = async (): Promise<typeof window.VideoSDK> => {
//     if (window.VideoSDK) {
//       return window.VideoSDK;
//     }
  
//     return new Promise((resolve, reject) => {
//       const script = document.createElement('script');
//       script.src = 'https://sdk.videosdk.live/rtc-js-prebuilt/0.3.43/rtc-js-prebuilt.js';
//       script.async = true;
      
//       script.onload = () => {
//         const checkSDK = () => {
//           if (window.VideoSDK?.prebuilt) {
//             resolve(window.VideoSDK);
//           } else {
//             setTimeout(checkSDK, 100);
//           }
//         };
//         checkSDK();
//       };
      
//       script.onerror = () => {
//         reject(new Error('Failed to load VideoSDK script'));
//       };
      
//       document.body.appendChild(script);
//     });
//   };
  
//   export const initializeMeeting = async (
//     meetingId: string,
//     isHost: boolean,
//     participantName?: string
//   ): Promise<VideoSDKMeeting> => {
//     try {
//       const token = import.meta.env.VITE_VIDEOSDK_TOKEN;
//       if (!token) {
//         throw new Error('VideoSDK token not configured');
//       }
  
//       await loadVideoSDK();
  
//       if (!window.VideoSDK?.prebuilt) {
//         throw new Error('VideoSDK prebuilt not available');
//       }
  
//       const container = document.getElementById('meeting-container');
//       if (!container) {
//         throw new Error('Meeting container not found');
//       }
  
//       const config: VideoSDKConfig = {
//         name: participantName || (isHost ? 'Host' : 'Participant'),
//         apiKey: token,
//         meetingId,
//         containerId: 'meeting-container',
//         redirectOnLeave: window.location.origin,
//         micEnabled: true,
//         webcamEnabled: true,
//         participantCanToggleSelfWebcam: true,
//         participantCanToggleSelfMic: true,
//         permissions: {
//           askToJoin: false,
//           toggleParticipantMic: isHost,
//           toggleParticipantWebcam: isHost,
//           removeParticipant: isHost,
//           endMeeting: isHost,
//         },
//       };
  
//       const meeting = new window.VideoSDK.prebuilt(config);
//       meeting.mount(container);
  
//       return meeting;
//     } catch (error) {
//       console.error('Meeting initialization error:', error);
//       throw error;
//     }
//   };
  
//   export const cleanupMeeting = (meeting?: VideoSDKMeeting) => {
//     if (meeting) {
//       try {
//         meeting.unmount();
//         meeting.leave();
//       } catch (error) {
//         console.error('Error cleaning up meeting:', error);
//       }
//     }
//   };

declare global {
  interface Window {
    VideoSDK: {
      ready: Promise<void>;
      prebuilt: {
        new (config: VideoSDKConfig): VideoSDKMeeting;
      };
    };
  }
}

interface VideoSDKConfig {
  name: string;
  apiKey: string;
  meetingId: string;
  containerId: string;
  redirectOnLeave: string;
  micEnabled: boolean;
  webcamEnabled: boolean;
  participantCanToggleSelfWebcam: boolean;
  participantCanToggleSelfMic: boolean;
  chatEnabled?: boolean;
  screenShareEnabled?: boolean;
  pollEnabled?: boolean;
  whiteboardEnabled?: boolean;
  raiseHandEnabled?: boolean;
  recordingEnabled?: boolean;
  recordingWebhookUrl?: string;
  recordingAWSDirPath?: string;
  autoStartRecording?: boolean;
  brandingEnabled?: boolean;
  brandLogoURL?: string;
  brandName?: string;
  poweredBy?: boolean;
  participantCanLeave?: boolean;
  autoJoin?: boolean;
  region?: string;
  permissions: {
    askToJoin: boolean;
    toggleParticipantMic: boolean;
    toggleParticipantWebcam: boolean;
    drawOnWhiteboard?: boolean;
    toggleWhiteboard?: boolean;
    toggleRecording?: boolean;
    removeParticipant: boolean;
    endMeeting: boolean;
  };
  joinScreen?: {
    visible: boolean;
    title: string;
    meetingUrl: string;
  };
  pin?: {
    allowed: boolean;
    layout: "SPOTLIGHT" | "GRID";
  };
  notificationSoundEnabled?: boolean;
  maxResolution?: "sd" | "hd";
}

interface VideoSDKMeeting {
  mount: (container: HTMLElement) => void;
  unmount: () => void;
  leave: () => void;
}

export const loadVideoSDK = async (): Promise<typeof window.VideoSDK> => {
  if (window.VideoSDK) {
    return window.VideoSDK;
  }

  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = 'https://sdk.videosdk.live/rtc-js-prebuilt/0.3.43/rtc-js-prebuilt.js';
    script.async = true;
    
    script.onload = () => {
      const checkSDK = () => {
        if (window.VideoSDK?.prebuilt) {
          resolve(window.VideoSDK);
        } else {
          setTimeout(checkSDK, 100);
        }
      };
      checkSDK();
    };
    
    script.onerror = () => {
      reject(new Error('Failed to load VideoSDK script'));
    };
    
    document.body.appendChild(script);
  });
};

export const initializeMeeting = async (
  meetingId: string,
  isHost: boolean,
  participantName?: string
): Promise<VideoSDKMeeting> => {
  try {
    const token = import.meta.env.VITE_VIDEOSDK_TOKEN;
    if (!token) {
      throw new Error('VideoSDK token not configured');
    }

    await loadVideoSDK();

    if (!window.VideoSDK?.prebuilt) {
      throw new Error('VideoSDK prebuilt not available');
    }

    const container = document.getElementById('meeting-container');
    if (!container) {
      throw new Error('Meeting container not found');
    }

    const config: VideoSDKConfig = {
      name: participantName || (isHost ? 'Host' : 'Participant'),
      apiKey: token,
      meetingId,
      containerId: 'meeting-container',
      redirectOnLeave: window.location.origin,
      micEnabled: true,
      webcamEnabled: true,
      participantCanToggleSelfWebcam: true,
      participantCanToggleSelfMic: true,
      chatEnabled: true,
      screenShareEnabled: true,
      permissions: {
        askToJoin: false,
        toggleParticipantMic: isHost,
        toggleParticipantWebcam: isHost,
        removeParticipant: isHost,
        endMeeting: isHost,
      },
    };

    const meeting = new window.VideoSDK.prebuilt(config);
    meeting.mount(container);

    return meeting;
  } catch (error) {
    console.error('Meeting initialization error:', error);
    throw error;
  }
};

export const cleanupMeeting = (meeting?: VideoSDKMeeting) => {
  if (meeting) {
    try {
      meeting.unmount();
      meeting.leave();
    } catch (error) {
      console.error('Error cleaning up meeting:', error);
    }
  }
};