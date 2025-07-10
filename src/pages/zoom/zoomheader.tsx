// import React from "react";
// import { useNavigate, Link } from "react-router-dom";
// import { Button } from "@/components/ui/button";
// import { ArrowLeft, Shield, Home, User as UserIcon } from "lucide-react";

// interface ZoomHeaderProps {
//   user?: {
//     email: string;
//     id: string;
//   };
//   onSignOut?: () => void;
//   onNavigateHome?: () => void;
//   onNavigateProfile?: () => void;
// }

// const ZoomHeader: React.FC<ZoomHeaderProps> = ({
//   user,
//   onSignOut,
//   onNavigateHome,
//   onNavigateProfile,
// }) => {
//   const navigate = useNavigate();

//   const handleBackNavigation = () => {
//     if (window.history.length > 1) {
//       navigate(-1);
//     } else {
//       navigate("/");
//     }
//   };

//   return (
//     <header className="bg-black/30 backdrop-blur-md border-b border-white/20 sticky top-0 z-50 shadow-xl">
//       <div className="container mx-auto px-4 py-4">
//         <div className="flex items-center justify-between">
//           <div className="flex items-center space-x-4">
//             <Button
//               variant="outline"
//               onClick={handleBackNavigation}
//               className="text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm"
//               title="Go back"
//             >
//               <ArrowLeft className="mr-2 h-4 w-4" />
//               Back
//             </Button>
//             <Link to="/" className="flex items-center space-x-2">
//               <Shield className="h-8 w-8 text-blue-400" />
//               <h1 className="text-2xl font-bold text-white">MedPortal</h1>
//             </Link>
//           </div>
//           <div className="flex items-center space-x-4">
//             {user ? (
//               <div className="flex items-center space-x-4">
//                 <span className="text-white text-sm bg-white/10 px-3 py-1 rounded-full">
//                   Welcome, {user.email}
//                 </span>
//                 <Button
//                   variant="outline"
//                   className="text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm"
//                   onClick={onNavigateProfile}
//                 >
//                   <UserIcon className="mr-2 h-4 w-4" />
//                   Profile
//                 </Button>
//                 <Button
//                   variant="outline"
//                   className="text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm"
//                   onClick={onSignOut}
//                 >
//                   Sign Out
//                 </Button>
//               </div>
//             ) : (
//               <>
//                 <Link to="/register">
//                   <Button
//                     variant="outline"
//                     className="text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm"
//                   >
//                     Register
//                   </Button>
//                 </Link>
//                 <Link to="/">
//                   <Button className="bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl transition-all duration-200">
//                     <UserIcon className="mr-2 h-4 w-4" />
//                     Sign In
//                   </Button>
//                 </Link>
//               </>
//             )}
//             <Button
//               variant="outline"
//               onClick={onNavigateHome}
//               className="text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm"
//               title="Go to home page"
//             >
//               <Home className="mr-2 h-4 w-4" />
//               Home
//             </Button>
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// };

// export default ZoomHeader;

import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Shield, Home, User as UserIcon, Copy } from "lucide-react";
import logo from "@/image/thefuturemed_logo (1).jpg";

interface ZoomHeaderProps {
  user?: {
    email: string;
    id: string;
  };
  onSignOut?: () => void;
  onNavigateHome?: () => void;
  onNavigateProfile?: () => void;
  meetingId?: string;
  isHost?: boolean;
  onLeave?: () => void;
}

const ZoomHeader: React.FC<ZoomHeaderProps> = ({
  user,
  onSignOut,
  onNavigateHome,
  onNavigateProfile,
  meetingId,
  isHost,
  onLeave,
}) => {
  const navigate = useNavigate();

  const handleBackNavigation = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("/");
    }
  };

  const copyMeetingId = () => {
    if (meetingId) {
      navigator.clipboard.writeText(meetingId);
      // You might want to add a toast notification here
    }
  };

  return (
    <header className="bg-black/30 backdrop-blur-md border-b border-white/20 sticky top-0 z-50 shadow-xl">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              onClick={handleBackNavigation}
              className="text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm"
              title="Go back"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
            {/* <Link to="/" className="flex items-center space-x-2">
              <Shield className="h-8 w-8 text-blue-400" />
              <h1 className="text-2xl font-bold text-white">MedPortal</h1>
            </Link> */}
            <div className="flex items-center space-x-2">
              <Link to="/">
                <img src={logo} alt="Logo" className="h-10 w-100 mr-2" />
              </Link>
            </div>
            {meetingId && (
              <div className="flex items-center space-x-2 ml-4">
                <span className="text-white text-sm bg-white/10 px-3 py-1 rounded-full">
                  {isHost ? "Hosting" : "Joined"}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={copyMeetingId}
                  className="text-white hover:bg-white/10"
                >
                  <Copy className="h-4 w-4 mr-2" />
                  {meetingId}
                </Button>
              </div>
            )}
          </div>
          <div className="flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-white text-sm bg-white/10 px-3 py-1 rounded-full">
                  Welcome, {user.email}
                </span>
                <Button
                  variant="outline"
                  className="text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm"
                  onClick={onNavigateProfile}
                >
                  <UserIcon className="mr-2 h-4 w-4" />
                  Profile
                </Button>
                {onLeave && (
                  <Button
                    variant="destructive"
                    onClick={onLeave}
                    className="hover:bg-red-700"
                  >
                    Leave Meeting
                  </Button>
                )}
              </div>
            ) : (
              <>
                <Link to="/register">
                  <Button
                    variant="outline"
                    className="text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm"
                  >
                    Register
                  </Button>
                </Link>
                <Link to="/">
                  <Button className="bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl transition-all duration-200">
                    <UserIcon className="mr-2 h-4 w-4" />
                    Sign In
                  </Button>
                </Link>
              </>
            )}
            <Button
              variant="outline"
              onClick={onNavigateHome}
              className="text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm"
              title="Go to home page"
            >
              <Home className="mr-2 h-4 w-4" />
              Home
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default ZoomHeader;
