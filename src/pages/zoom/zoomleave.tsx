import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface LeaveScreenProps {
  setIsMeetingLeft: (value: boolean) => void;
}

const ZoomLeave: React.FC<LeaveScreenProps> = ({ setIsMeetingLeft }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Meeting Ended</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-center">You have left the meeting.</p>
          <Button onClick={() => setIsMeetingLeft(false)} className="w-full">
            Return to Home
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default ZoomLeave;
