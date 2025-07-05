import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Copy, Bookmark, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface ZoomActionsProps {
  isHost: boolean;
  isRegistered: boolean;
  meetingId?: string | null;
  joiningMeeting: boolean;
  creatingMeeting: boolean;
  onHostMeeting: () => Promise<string>;
  onJoinMeeting: () => Promise<void>;
  onCopyMeetingId: () => void;
}

export const ZoomActions: React.FC<ZoomActionsProps> = ({
  isHost,
  isRegistered,
  meetingId,
  joiningMeeting,
  creatingMeeting,
  onHostMeeting,
  onJoinMeeting,
  onCopyMeetingId,
}) => {
  const { toast } = useToast();

  const handleHostMeeting = async () => {
    try {
      await onHostMeeting();
    } catch (error) {
      console.error("Failed to host meeting:", error);
      toast({
        title: "Meeting Error",
        description: "Failed to start meeting",
        variant: "destructive",
      });
    }
  };

  const handleJoinMeeting = async () => {
    try {
      await onJoinMeeting();
    } catch (error) {
      console.error("Join meeting error:", error);
      toast({
        title: "Join Failed",
        description: "Could not join meeting",
        variant: "destructive",
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Meeting Actions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {isHost ? (
          <>
            {meetingId ? (
              <>
                <Button
                  onClick={handleJoinMeeting}
                  className="w-full"
                  disabled={joiningMeeting}
                >
                  {joiningMeeting ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : null}
                  {joiningMeeting ? "Connecting..." : "Start Meeting"}
                </Button>
                <div className="space-y-2">
                  <p className="text-sm font-medium">Meeting ID:</p>
                  <div className="flex gap-2">
                    <Input value={meetingId} readOnly className="flex-1" />
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={onCopyMeetingId}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <Button
                onClick={handleHostMeeting}
                className="w-full"
                disabled={creatingMeeting}
              >
                {creatingMeeting ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : null}
                {creatingMeeting ? "Creating..." : "Create Meeting"}
              </Button>
            )}
          </>
        ) : isRegistered ? (
          <Button
            onClick={handleJoinMeeting}
            className="w-full"
            disabled={!meetingId || joiningMeeting}
          >
            {joiningMeeting ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : null}
            {joiningMeeting
              ? "Joining..."
              : meetingId
              ? "Join Meeting"
              : "Waiting for Host"}
          </Button>
        ) : (
          <Button className="w-full" disabled>
            Register to Join
          </Button>
        )}
        <Button variant="outline" className="w-full">
          <Bookmark className="mr-2 h-4 w-4" />
          Save for Later
        </Button>
      </CardContent>
    </Card>
  );
};