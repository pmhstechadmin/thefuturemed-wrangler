// import { Toaster } from "@/components/ui/toaster";
// import { Toaster as Sonner } from "@/components/ui/sonner";
// import { TooltipProvider } from "@/components/ui/tooltip";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Index from "./pages/Index";
// import Profile from "./pages/Profile";
// import Community from "./pages/Community";
// import CommunityChat from "./pages/CommunityChat";
// import ESeminar from "./pages/ESeminar";
// import SeminarDetails from "./pages/SeminarDetails";
// import HostSeminar from "./pages/HostSeminar";
// import CalendarPage from "./pages/CalendarPage";
// import ProductPortal from "./pages/ProductPortal";
// import ELearning from "./pages/ELearning";
// import CoursesListing from "./pages/CoursesListing";
// import CourseDetails from "./pages/CourseDetails";
// import { CourseAccessPage } from "./components/elearning/CourseAccessPage";
// import Register from "./pages/Register";
// import TermsOfService from "./pages/TermsOfService";
// import PrivacyPolicy from "./pages/PrivacyPolicy";
// import DataUsagePolicy from "./pages/DataUsagePolicy";
// import NotFound from "./pages/NotFound";
// import JobPortal from "./pages/JobPortal";
// import Publication from "./pages/Publication";

// const queryClient = new QueryClient();

// const App = () => (
//   <QueryClientProvider client={queryClient}>
//     <TooltipProvider>
//       <Toaster />
//       <Sonner />
//       <BrowserRouter>
//         <Routes>
//           <Route path="/" element={<Index />} />
//           <Route path="/profile" element={<Profile />} />
//           <Route path="/community" element={<Community />} />
//           <Route path="/community/:communityId/chat" element={<CommunityChat />} />
//           <Route path="/e-seminar" element={<ESeminar />} />
//           <Route path="/seminar/:seminarId" element={<SeminarDetails />} />
//           <Route path="/host-seminar" element={<HostSeminar />} />
//           <Route path="/calendar" element={<CalendarPage />} />
//           <Route path="/products" element={<ProductPortal />} />
//           <Route path="/product-portal" element={<ProductPortal />} />
//           <Route path="/e-learning" element={<ELearning />} />
//           <Route path="/courses" element={<CoursesListing />} />
//           <Route path="/course/:courseId" element={<CourseDetails />} />
//           <Route path="/course/:courseId/learn" element={<CourseAccessPage />} />
//           <Route path="/jobs" element={<JobPortal />} />
//           <Route path="/job-portal" element={<JobPortal />} />
//           <Route path="/publication" element={<Publication />} />
//           <Route path="/register" element={<Register />} />
//           <Route path="/terms" element={<TermsOfService />} />
//           <Route path="/privacy" element={<PrivacyPolicy />} />
//           <Route path="/data-usage" element={<DataUsagePolicy />} />
//           <Route path="*" element={<NotFound />} />
//         </Routes>
//       </BrowserRouter>
//     </TooltipProvider>
//   </QueryClientProvider>
// );

// export default App;

// src/App.tsx
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Profile from "./pages/Profile";
import Community from "./pages/Community";
import CommunityChat from "./pages/CommunityChat";
import ESeminar from "./pages/ESeminar";
import SeminarDetails from "./pages/zoom/SeminarDetails";
import HostSeminar from "./pages/HostSeminar";
import CalendarPage from "./pages/CalendarPage";
import ProductPortal from "./pages/ProductPortal";
import ELearning from "./pages/ELearning";
// import CoursesListing from "./pages/CoursesListing ";
import CourseDetails from "./pages/CourseDetails";
import { CourseAccessPage } from "./components/elearning/CourseAccessPage";
import Register from "./pages/Register";
import TermsOfService from "./pages/TermsOfService";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import DataUsagePolicy from "./pages/DataUsagePolicy";
import NotFound from "./pages/NotFound";
import JobPortal from "./pages/JobPortal";
import Publication from "./pages/Publication";

import UpdatePassword from "./pages/UpdatePassword";
import Myjob from "./components/Myjob";
import CoursesListing from "./pages/CoursesListing";

import VideoMeeting4 from "./components/VideoMeeting4";
import VideoMeeting from "./components/VideoMeeting";
import { EditCoursePage } from "./components/elearning/EditCoursePage";
// import { MeetingWrapper } from "./pages/meeting/MeetingWrapper";
// import VideoMeeting from "./components/VideoMeeting2";
// import VideoMeeting1 from "./components/VideoMeeting1"
//import {VideoMeeting1} from "./components/VideoMeeting1";
// import VideoMeeting from "./components/VideoMeeting3";
// import {VideoMeeting3} from "./components/VideoMeeting3";

const queryClient = new QueryClient();

const App = () => {
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlrZXkiOiI4YzgxYWE1Ny05ODY4LTQxN2EtOTFjMi04NTAwNjczNWJiNjIiLCJwZXJtaXNzaW9ucyI6WyJhbGxvd19qb2luIl0sImlhdCI6MTc1MDgzNDk4NCwiZXhwIjoxNzgyMzcwOTg0fQ.n2Srx_K36pcLwtvDEsCRkqfVDXwlIDoqFWyVpAwe2_0"; // Replace with generated token
  const meetingId = "your-meeting-id";
  return (
    // Can be any unique string
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/community" element={<Community />} />
            <Route
              path="/community/:communityId/chat"
              element={<CommunityChat />}
            />
            <Route path="/e-seminar" element={<ESeminar />} />
            <Route path="/seminar/:seminarId" element={<SeminarDetails />} />
            <Route path="/host-seminar" element={<HostSeminar />} />
            {/* <Route path="/meeting/:meetingId" element={<MeetingWrapper />} /> */}
            <Route path="/calendar" element={<CalendarPage />} />
            <Route path="/products" element={<ProductPortal />} />
            <Route path="/product-portal" element={<ProductPortal />} />
            <Route path="/e-learning" element={<ELearning />} />
            <Route path="/courses" element={<CoursesListing />} />
            <Route path="/course/:courseId" element={<CourseDetails />} />
            <Route path="/edit-course/:courseId" element={<EditCoursePage />} />
            <Route
              path="/course/:courseId/learn"
              element={<CourseAccessPage />}
            />
            <Route path="/jobs" element={<JobPortal />} />
            <Route path="/job-portal" element={<JobPortal />} />
            <Route path="/publication" element={<Publication />} />
            <Route path="/register" element={<Register />} />
            <Route path="/terms" element={<TermsOfService />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/data-usage" element={<DataUsagePolicy />} />
            <Route path="/update-password" element={<UpdatePassword />} />
            <Route path="/my-job" element={<Myjob />} />
            <Route
              path="/mee"
              element={
                <VideoMeeting4
                  apiKey="8c81aa57-9868-417a-91c2-85006735bb62"
                  meetingId="your-meeting-id"
                  name="John Doe"
                  micEnabled={true}
                  webcamEnabled={true}
                  containerId={null}
                />
              }
            />

            {/* <Route path="/videomeeting" element={<VideoMeeting3 />} /> */}

            {/* <Route
              path="/meeting/:id"
              element={
                <VideoMeeting
                  isHost={false}
                  
                  micEnabled={true}
                  webcamEnabled={true}
                  meetingId={null}
                />
              }
            />
            <Route
              path="/host"
              element={
                <VideoMeeting
                  isHost={true}
                  micEnabled={true}
                  webcamEnabled={true}
                  meetingId={null}
                />
              }
            /> */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

// import UpdatePassword from "./pages/UpdatePassword";
// import Myjob from "./components/Myjob";
// import CoursesListing from "./pages/CoursesListing";

// const queryClient = new QueryClient();

// const App = () => (
//   <QueryClientProvider client={queryClient}>
//     <TooltipProvider>
//       <Toaster />
//       <Sonner />
//       <BrowserRouter>
//         <Routes>
//           <Route path="/" element={<Index />} />
//           <Route path="/profile" element={<Profile />} />
//           <Route path="/community" element={<Community />} />
//           <Route path="/community/:communityId/chat" element={<CommunityChat />} />
//           <Route path="/e-seminar" element={<ESeminar />} />
//           <Route path="/seminar/:seminarId" element={<SeminarDetails />} />
//           <Route path="/host-seminar" element={<HostSeminar />} />
//           <Route path="/calendar" element={<CalendarPage />} />
//           <Route path="/products" element={<ProductPortal />} />
//           <Route path="/product-portal" element={<ProductPortal />} />
//           <Route path="/e-learning" element={<ELearning />} />
//           <Route path="/courses" element={<CoursesListing />} />
//           <Route path="/course/:courseId" element={<CourseDetails />} />
//           <Route path="/course/:courseId/learn" element={<CourseAccessPage />} />
//           <Route path="/jobs" element={<JobPortal />} />
//           <Route path="/job-portal" element={<JobPortal />} />
//           <Route path="/publication" element={<Publication />} />
//           <Route path="/register" element={<Register />} />
//           <Route path="/terms" element={<TermsOfService />} />
//           <Route path="/privacy" element={<PrivacyPolicy />} />
//           <Route path="/data-usage" element={<DataUsagePolicy />} />
//           <Route path="*" element={<NotFound />} />
//            <Route path="/update-password" element={<UpdatePassword />} />
//              <Route path="/my-job" element={<Myjob />} />

//         </Routes>
//       </BrowserRouter>
//     </TooltipProvider>
//   </QueryClientProvider>
// );


export default App;
