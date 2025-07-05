import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Speaker {
  id: string;
  name: string;
  qualification: string;
  department: string;
  // bio: string | null;
  avatar_url?: string;
}

interface ZoomSpeakersProps {
  speakers: Speaker[];
}

const ZoomSpeakers: React.FC<ZoomSpeakersProps> = ({ speakers }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Speakers</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {speakers.map((speaker) => (
            <div key={speaker.id} className="flex items-start gap-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={speaker.avatar_url} />
                <AvatarFallback>{speaker.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold">{speaker.name}</h3>
                <p className="text-sm text-gray-600">
                  {speaker.qualification} | {speaker.department}
                </p>
                {/* <p className="mt-2 text-sm">{speaker.bio}</p> */}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ZoomSpeakers;
