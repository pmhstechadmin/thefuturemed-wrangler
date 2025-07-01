// import React from "react";
// import {
//   Card,
//   CardHeader,
//   CardTitle,
//   CardDescription,
//   CardContent,
// } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import {
//   CalendarDays,
//   Clock,
//   Users,
//   User as UserIcon,
//   Shield,
// } from "lucide-react";

// interface Seminar {
//   topic: string;
//   description: string;
//   date: string;
//   time: string;
//   host_name: string;
//   current_participants?: number;
//   max_participants?: number;
//   host_id: string;
// }

// interface ZoomMainProps {
//   seminar: Seminar;
//   isHost?: boolean;
//   formatDate: (date: string) => string;
//   formatTime: (time: string) => string;
//   isRegistered: boolean;
//   onRegister: () => Promise<void>;
//   onCancelRegistration: () => Promise<void>;
// }

// const ZoomMain: React.FC<ZoomMainProps> = ({
//   seminar,
//   isHost,
//   formatDate,
//   formatTime,
// }) => {
//   return (
//     <Card>
//       <CardHeader>
//         <div className="flex justify-between items-start">
//           <div>
//             <CardTitle className="text-3xl font-bold">
//               {seminar.topic}
//             </CardTitle>
//             <CardDescription className="mt-2 text-lg">
//               {seminar.description}
//             </CardDescription>
//           </div>
//           {isHost && (
//             <Badge variant="secondary" className="flex items-center">
//               <Shield className="mr-2 h-4 w-4" />
//               You're the host
//             </Badge>
//           )}
//         </div>
//       </CardHeader>
//       <CardContent>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <div className="flex items-center">
//             <CalendarDays className="mr-2 h-5 w-5 text-gray-500" />
//             <span>{formatDate(seminar.date)}</span>
//           </div>
//           <div className="flex items-center">
//             <Clock className="mr-2 h-5 w-5 text-gray-500" />
//             <span>{formatTime(seminar.time)}</span>
//           </div>
//           <div className="flex items-center">
//             <Users className="mr-2 h-5 w-5 text-gray-500" />
//             <span>
//               {seminar.current_participants || 0} /{" "}
//               {seminar.max_participants || "∞"} participants
//             </span>
//           </div>
//           <div className="flex items-center">
//             <UserIcon className="mr-2 h-5 w-5 text-gray-500" />
//             <span>Hosted by {seminar.host_name}</span>
//           </div>
//         </div>
//       </CardContent>
//     </Card>
//   );
// };

// export default ZoomMain;

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarDays, Clock, User, Users, CheckCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Seminar {
  id: string;
  host_name: string;
  topic: string;
  description: string;
  date: string;
  time: string;
  host_id: string;
  meeting_id?: string | null;
}

interface ZoomMainProps {
  seminar: Seminar;
  formatDate: (dateString: string) => string;
  formatTime: (timeString: string) => string;
  isRegistered: boolean;
  onRegister: () => Promise<void>;
  onCancelRegistration: () => Promise<void>;
}

const ZoomMain: React.FC<ZoomMainProps> = ({
  seminar,
  formatDate,
  formatTime,
  isRegistered,
  onRegister,
  onCancelRegistration,
}) => {
  const seminarDateTime = new Date(`${seminar.date}T${seminar.time}`);
  const isSeminarPast = seminarDateTime < new Date();
  const isSeminarLive =
    !isSeminarPast && seminarDateTime.getTime() - Date.now() < 3600000;

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-2xl mb-2">{seminar.topic}</CardTitle>
            <p className="text-gray-600">{seminar.description}</p>
          </div>
          {isRegistered && (
            <Badge variant="default" className="bg-green-500">
              <CheckCircle className="h-4 w-4 mr-1" />
              Registered
            </Badge>
          )}
          {isSeminarLive && (
            <Badge variant="default" className="bg-red-500 animate-pulse">
              Live NOW
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <User className="h-5 w-5 text-blue-600" />
              <div>
                <p className="font-medium">Host</p>
                <p className="text-gray-600">{seminar.host_name}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <CalendarDays className="h-5 w-5 text-blue-600" />
              <div>
                <p className="font-medium">Date</p>
                <p className="text-gray-600">{formatDate(seminar.date)}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Clock className="h-5 w-5 text-blue-600" />
              <div>
                <p className="font-medium">Time</p>
                <p className="text-gray-600">{formatTime(seminar.time)}</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Users className="h-5 w-5 text-blue-600" />
              <div>
                <p className="font-medium">Speakers</p>
                <p className="text-gray-600">Coming soon</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <CheckCircle className="h-5 w-5 text-blue-600" />
              <div>
                <p className="font-medium">Status</p>
                <p className="text-gray-600">
                  {isSeminarPast
                    ? "Completed"
                    : isSeminarLive
                    ? "Live Now"
                    : "Upcoming"}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center pt-4">
          {isRegistered ? (
            <Button
              variant="destructive"
              onClick={onCancelRegistration}
              className="px-8 py-3"
            >
              Cancel Registration
            </Button>
          ) : (
            <Button
              onClick={onRegister}
              className="bg-blue-600 hover:bg-blue-700 px-8 py-3"
            >
              Register for Seminar
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ZoomMain;