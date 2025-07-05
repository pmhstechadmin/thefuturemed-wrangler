import React, { useState, useRef } from "react";
import { useMeeting, Constants } from "@videosdk.live/react-sdk";
import { useToast } from "@/hooks/use-toast"; // Adjust this import based on your toast implementation
import { Button } from "@/components/ui/button"; // Adjust this import based on your UI library
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
} from "lucide-react"; // Adjust icon imports as needed

const MeetingControls = () => {
  const meeting = useMeeting();
  const [isFullscreen, setIsFullscreen] = useState(false);
  const { toast } = useToast();

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err) => {
        toast({
          title: "Fullscreen Error",
          description: err.message,
          variant: "destructive",
        });
      });
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  };

  const copyMeetingLink = () => {
    if (meeting?.meetingId) {
      const link = `${window.location.origin}/meeting/${meeting.meetingId}`;
      navigator.clipboard.writeText(link);
      toast({
        title: "Link Copied",
        description: "Meeting link copied to clipboard",
      });
    }
  };

  const RecordingButton = () => {
    const { startRecording, stopRecording, recordingState } = useMeeting();
    const isRecording =
      recordingState === Constants.recordingEvents.RECORDING_STARTED;
    const isRecordingRef = useRef(isRecording);

    const handleRecordingClick = () => {
      if (isRecording) {
        stopRecording();
      } else {
        startRecording();
      }
    };

    return (
      <Button
        onClick={handleRecordingClick}
        variant={isRecording ? "destructive" : "secondary"}
        size="icon"
        className="rounded-full w-12 h-12 relative"
      >
        <Circle className="h-5 w-5" />
        {isRecording && (
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
        )}
      </Button>
    );
  };

  const ScreenShareButton = () => {
    const { localScreenShareOn, toggleScreenShare, presenterId } = useMeeting();

    const handleScreenShareClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      toggleScreenShare();
    };

    return (
      <Button
        onClick={handleScreenShareClick}
        variant={localScreenShareOn ? "default" : "secondary"}
        size="icon"
        className="rounded-full w-12 h-12"
        disabled={presenterId ? !localScreenShareOn : false}
      >
        <ScreenShareIcon className="h-5 w-5" />
      </Button>
    );
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900 py-3 px-4 flex justify-center space-x-4 z-50">
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

      <ScreenShareButton />

      <RecordingButton />

      <Button
        onClick={copyMeetingLink}
        variant="secondary"
        size="icon"
        className="rounded-full w-12 h-12"
      >
        <Share2 className="h-5 w-5" />
      </Button>

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

      <Button
        variant="destructive"
        size="icon"
        className="rounded-full w-12 h-12"
        onClick={() => meeting?.leave()}
      >
        <PhoneOff className="h-5 w-5" />
      </Button>
    </div>
  );
};

export default MeetingControls;
