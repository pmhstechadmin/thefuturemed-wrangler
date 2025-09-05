// // // src/App.tsx
// // import { Toaster } from "@/components/ui/toaster";
// // import { Toaster as Sonner } from "@/components/ui/sonner";
// // import { TooltipProvider } from "@/components/ui/tooltip";
// // import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// // import { BrowserRouter, Routes, Route } from "react-router-dom";
// // import Index from "./pages/Index";
// // import Profile from "./pages/Profile";
// // import Community from "./pages/Community";
// // import CommunityChat from "./pages/CommunityChat";
// // import ESeminar from "./pages/ESeminar";
// // import SeminarDetails from "./pages/zoom/SeminarDetails";
// // import HostSeminar from "./pages/HostSeminar";
// // import CalendarPage from "./pages/CalendarPage";
// // import ProductPortal from "./pages/ProductPortal";
// // import ELearning from "./pages/ELearning";
// // // import CoursesListing from "./pages/CoursesListing ";
// // import CourseDetails from "./pages/CourseDetails";
// // import { CourseAccessPage } from "./components/elearning/CourseAccessPage";
// // import Register from "./pages/Register";
// // import TermsOfService from "./pages/TermsOfService";
// // import PrivacyPolicy from "./pages/PrivacyPolicy";
// // import DataUsagePolicy from "./pages/DataUsagePolicy";
// // import NotFound from "./pages/NotFound";
// // import JobPortal from "./pages/JobPortal";
// // import Publication from "./pages/Publication";
// // import UpdatePassword from "./pages/UpdatePassword";
// // import Myjob from "./components/Myjob";
// // import SaveJob from "./components/job-portal/SaveJob";
// // import SaveCandidate from "./components/job-portal/SaveCandidate";
// // import PostBlogs from "./components/Blogs/BlogList";
// // import BlogList from "./components/Blogs/BlogList";
// // import PostBlog from "./components/Blogs/PostBlog";
// // import BlogPortal from "./components/Blogs/BlogPortal";
// // // import MyBlog from "./components/Blogs/MyBlog";

// // import EditBlogs from "./components/Blogs/EditBlogs";

// // import CoursesListing from "./pages/CoursesListing";

// // import VideoMeeting4 from "./components/VideoMeeting4";
// // import VideoMeeting from "./components/VideoMeeting";
// // import { EditCoursePage } from "./components/elearning/EditCoursePage";
// // import AboutPage from "./components/public page/AboutPage";
// // import TrackPageView from "./Trackpage/TrackPageView";
// // import MyJobProfile from "./components/job-portal/MyJobProfile";
// // import { JobSeekerForm } from "./components/job-portal/JobSeekerForm";
// // import EditHostSeminar from "./pages/EditHostSeminar";

// // const queryClient = new QueryClient();

// // const App = () => {
// //   const  =
// //     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlrZXkiOiI4YzgxYWE1Ny05ODY4LTQxN2EtOTFjMi04NTAwNjczNWJiNjIiLCJwZXJtaXNzaW9ucyI6WyJhbGxvd19qb2luIl0sImlhdCI6MTc1MDgzNDk4NCwiZXhwIjoxNzgyMzcwOTg0fQ.n2Srx_K36pcLwtvDEsCRkqfVDXwlIDoqFWyVpAwe2_0"; // Replace with generated token
// //   const meetingId = "your-meeting-id";
// //   return (
// //     // Can be any unique string
// //     <QueryClientProvider client={queryClient}>
// //       <TooltipProvider>
// //         <Toaster />
// //         <Sonner />
// //         <BrowserRouter>
// //           <TrackPageView />
// //           <Routes>
// //             <Route path="/" element={<Index />} />
// //             <Route path="/profile" element={<Profile />} />
// //             <Route path="/community" element={<Community />} />
// //             <Route
// //               path="/community/:communityId/chat"
// //               element={<CommunityChat />}
// //             />
// //             <Route path="/e-seminar" element={<ESeminar />} />
// //             <Route path="/seminar/:seminarId" element={<SeminarDetails />} />
// //             <Route path="/host-seminar" element={<HostSeminar />} />
// //             <Route
// //               path="/e-seminar/edit/:seminarId"
// //               element={<EditHostSeminar />}
// //             />
// //             {/* <Route path="/meeting/:meetingId" element={<MeetingWrapper />} /> */}
// //             <Route path="/calendar" element={<CalendarPage />} />
// //             <Route path="/dashboard" element={<ProductPortal />} />
// //             <Route path="/product-portal" element={<ProductPortal />} />
// //             <Route path="/e-learning" element={<ELearning />} />
// //             <Route path="/courses" element={<CoursesListing />} />
// //             <Route path="/course/:courseId" element={<CourseDetails />} />
// //             <Route path="/edit-course/:courseId" element={<EditCoursePage />} />
// //             <Route
// //               path="/course/:courseId/learn"
// //               element={<CourseAccessPage />}
// //             />
// //             <Route path="/jobs" element={<JobPortal />} />
// //             <Route path="/job-seekerform" element={<JobSeekerForm />} />
// //             <Route path="/job-portal" element={<JobPortal />} />
// //             <Route path="/publication" element={<Publication />} />
// //             <Route path="/register" element={<Register />} />
// //             <Route path="/terms-of-service" element={<TermsOfService />} />
// //             <Route path="/privacy-policy" element={<PrivacyPolicy />} />
// //             <Route path="/data-usage-policy" element={<DataUsagePolicy />} />
// //             <Route path="/update-password" element={<UpdatePassword />} />
// //             <Route path="/my-job" element={<Myjob />} />
// //             <Route path="/my-job-profile" element={<MyJobProfile />} />
// //             <Route
// //               path="/mee"
// //               element={
// //                 <VideoMeeting4
// //                   apiKey="8c81aa57-9868-417a-91c2-85006735bb62"
// //                   meetingId="your-meeting-id"
// //                   name="John Doe"
// //                   micEnabled={true}
// //                   webcamEnabled={true}
// //                   containerId={null}
// //                 />
// //               }
// //             />

// //             <Route path="/saved-job" element={<SaveJob />} />
// //             <Route path="/saved-candidates" element={<SaveCandidate />} />
// //             {/* <Route path="/blog-list" element={<BlogList />} /> */}
// //             <Route path="/blog-list/:id" element={<BlogList />} />
// //             <Route path="/post-blog" element={<PostBlog />} />
// //             <Route path="/edit-blog/:id" element={<EditBlogs />} />
// //             <Route path="/blog-portal" element={<BlogPortal />} />
// //             {/* <Route path="/my-blogs" element={<MyBlog />} /> */}
// //             <Route path="/about-us" element={<AboutPage />} />

// //             <Route path="*" element={<NotFound />} />
// //           </Routes>
// //         </BrowserRouter>
// //       </TooltipProvider>
// //     </QueryClientProvider>
// //   );
// // };

// // export default App;

// // src/App.tsx
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
// import SeminarDetails from "./pages/zoom/SeminarDetails";
// import HostSeminar from "./pages/HostSeminar";
// import CalendarPage from "./pages/CalendarPage";
// import ProductPortal from "./pages/ProductPortal";
// import ELearning from "./pages/ELearning";
// // import CoursesListing from "./pages/CoursesListing ";
// import CourseDetails from "./pages/CourseDetails";
// import { CourseAccessPage } from "./components/elearning/CourseAccessPage";
// import Register from "./pages/Register";
// import TermsOfService from "./pages/TermsOfService";
// import PrivacyPolicy from "./pages/PrivacyPolicy";
// import DataUsagePolicy from "./pages/DataUsagePolicy";
// import NotFound from "./pages/NotFound";
// import JobPortal from "./pages/JobPortal";
// import Publication from "./pages/Publication";
// import UpdatePassword from "./pages/UpdatePassword";
// import Myjob from "./components/Myjob";
// import SaveJob from "./components/job-portal/SaveJob";
// import SaveCandidate from "./components/job-portal/SaveCandidate";
// import PostBlogs from "./components/Blogs/BlogList";
// import BlogList from "./components/Blogs/BlogList";
// import PostBlog from "./components/Blogs/PostBlog";
// import BlogPortal from "./components/Blogs/BlogPortal";
// import MyBlog from "./components/Blogs/MyBlog";

// import EditBlogs from "./components/Blogs/EditBlogs";

// import CoursesListing from "./pages/CoursesListing";

// import VideoMeeting4 from "./components/VideoMeeting4";
// import VideoMeeting from "./components/VideoMeeting";
// import { EditCoursePage } from "./components/elearning/EditCoursePage";
// import AboutPage from "./components/public page/AboutPage";
// import TrackPageView from "./Trackpage/TrackPageView";
// import MyJobProfile from "./components/job-portal/MyJobProfile";
// import { JobSeekerForm } from "./components/job-portal/JobSeekerForm";

// const queryClient = new QueryClient();

// const App = () => {
//   const token =
//     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlrZXkiOiI4YzgxYWE1Ny05ODY4LTQxN2EtOTFjMi04NTAwNjczNWJiNjIiLCJwZXJtaXNzaW9ucyI6WyJhbGxvd19qb2luIl0sImlhdCI6MTc1MDgzNDk4NCwiZXhwIjoxNzgyMzcwOTg0fQ.n2Srx_K36pcLwtvDEsCRkqfVDXwlIDoqFWyVpAwe2_0"; // Replace with generated token
//   const meetingId = "your-meeting-id";
//   return (
//     // Can be any unique string
//     <QueryClientProvider client={queryClient}>
//       <TooltipProvider>
//         <Toaster />
//         <Sonner />
//         <BrowserRouter>
//           <TrackPageView />
//           <Routes>
//             <Route path="/" element={<Index />} />
//             <Route path="/profile" element={<Profile />} />
//             <Route path="/community" element={<Community />} />
//             <Route
//               path="/community/:communityId/chat"
//               element={<CommunityChat />}
//             />
//             <Route path="/e-seminar" element={<ESeminar />} />
//             <Route path="/seminar/:seminarId" element={<SeminarDetails />} />
//             <Route path="/host-seminar" element={<HostSeminar />} />
//             {/* <Route path="/meeting/:meetingId" element={<MeetingWrapper />} /> */}
//             <Route path="/calendar" element={<CalendarPage />} />
//             <Route path="/products" element={<ProductPortal />} />
//             <Route path="/product-portal" element={<ProductPortal />} />
//             <Route path="/e-learning" element={<ELearning />} />
//             <Route path="/courses" element={<CoursesListing />} />
//             <Route path="/course/:courseId" element={<CourseDetails />} />
//             <Route path="/edit-course/:courseId" element={<EditCoursePage />} />
//             <Route
//               path="/course/:courseId/learn"
//               element={<CourseAccessPage />}
//             />
//             <Route path="/jobs" element={<JobPortal />} />
//              <Route path="/job-seekerform" element={<JobSeekerForm />} />
//             <Route path="/job-portal" element={<JobPortal />} />
//             <Route path="/publication" element={<Publication />} />
//             <Route path="/register" element={<Register />} />
//             <Route path="/terms-of-service" element={<TermsOfService />} />
//             <Route path="/privacy-policy" element={<PrivacyPolicy />} />
//             <Route path="/data-usage-policy" element={<DataUsagePolicy />} />
//             <Route path="/update-password" element={<UpdatePassword />} />
//             <Route path="/my-job" element={<Myjob />} />
//              <Route path="/my-job-profile" element={<MyJobProfile/>} />
//             <Route
//               path="/mee"
//               element={
//                 <VideoMeeting4
//                   apiKey="8c81aa57-9868-417a-91c2-85006735bb62"
//                   meetingId="your-meeting-id"
//                   name="John Doe"
//                   micEnabled={true}
//                   webcamEnabled={true}
//                   containerId={null}
//                 />
//               }
//             />

//             <Route path="/saved-job" element={<SaveJob />} />
//             <Route path="/saved-candidates" element={<SaveCandidate />} />
//             {/* <Route path="/blog-list" element={<BlogList />} /> */}
//             <Route path="/blog-list/:id" element={<BlogList />} />
//             <Route path="/post-blog" element={<PostBlog />} />
//             <Route path="/edit-blog/:id" element={<EditBlogs />} />
//             <Route path="/blog-portal" element={<BlogPortal />} />
//             <Route path="/my-blogs" element={<MyBlog />} />
//             <Route path="/about-us" element={<AboutPage />} />

//             <Route path="*" element={<NotFound />} />
//           </Routes>
//         </BrowserRouter>
//       </TooltipProvider>
//     </QueryClientProvider>
//   );
// };

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
import EditHostSeminar from "./pages/EditHostSeminar";
import CalendarPage from "./pages/CalendarPage";
import ProductPortal from "./pages/ProductPortal";
import ELearning from "./pages/ELearning";
import CoursesListing from "./pages/CoursesListing";
import CourseDetails from "./pages/CourseDetails";
import { EditCoursePage } from "./components/elearning/EditCoursePage";
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
import MyJobProfile from "./components/job-portal/MyJobProfile";
import { JobSeekerForm } from "./components/job-portal/JobSeekerForm";
import SaveJob from "./components/job-portal/SaveJob";
import SaveCandidate from "./components/job-portal/SaveCandidate";
import BlogList from "./components/Blogs/BlogList";
import PostBlog from "./components/Blogs/PostBlog";
import BlogPortal from "./components/Blogs/BlogPortal";
import EditBlogs from "./components/Blogs/EditBlogs";
import MyBlog from "./components/Blogs/MyBlog";
import VideoMeeting4 from "./components/VideoMeeting4";
import AboutPage from "./components/public page/AboutPage";
import TrackPageView from "./Trackpage/TrackPageView";
import "bootstrap/dist/css/bootstrap.min.css";
import Contact from "./pages/contact/Contact";
import { SpeedInsights } from "@vercel/speed-insights/react";
import Confirm from "./pages/Confirm";
import { CreateSeminarModal } from "./components/profile/CreateSeminarModal";
import RefundPolicy from "./pages/RefundPolicy";
import PricingPolicy from "./pages/PricingPolicy";
import EarningPage from "./pages/EarningPage";
import { HelmetProvider } from "react-helmet-async";
import PaymentSuccess from "./components/elearning/PaymentSuccess";
import { supabase } from "./integrations/supabase/client";
import PaymentCancel from "./components/elearning/PaymentCanel";
import ModulesAccordion from "./components/elearning/ModulesAccordion";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <SpeedInsights />
        <HelmetProvider>
          <BrowserRouter>
            <TrackPageView />
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
              <Route
                path="/seminar/:slug/:seminarId"
                element={<SeminarDetails />}
              />
              {/* <Route path="/seminar/:seminarId" element={<SeminarDetails />} /> */}
              <Route path="/host-seminar" element={<HostSeminar />} />
              <Route
                path="/e-seminar/edit/:seminarId"
                element={<EditHostSeminar />}
              />
              <Route path="/calendar" element={<CalendarPage />} />
              <Route path="/dashboard" element={<ProductPortal />} />
              <Route path="/e-learning" element={<ELearning />} />
              <Route path="/courses" element={<CoursesListing />} />
              <Route path="/course/:courseId" element={<CourseDetails />} />
              <Route
                path="/edit-course/:courseId"
                element={<EditCoursePage />}
              />
              <Route
                path="/course/:courseId/learn"
                element={<CourseAccessPage />}
              />
              {/* <Route
                path="/course/:slug/:courseId/learn"
                element={<CourseAccessPage />}
              /> */}
              <Route
                path="/course/:slug/:courseId"
                element={<CourseDetails />}
              />
              <Route
                path="/course/:slug/:courseId/learn"
                element={<CourseAccessPage />}
              />
              <Route path="/my-seminars" element={<CreateSeminarModal />} />
              <Route path="/jobs" element={<JobPortal />} />
              <Route path="/confirm-email" element={<Confirm />} />
              <Route path="/job-seekerform" element={<JobSeekerForm />} />
              <Route path="/job-portal" element={<JobPortal />} />
              <Route path="/publication" element={<Publication />} />
              <Route path="/register" element={<Register />} />
              <Route path="/terms-of-service" element={<TermsOfService />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/data-usage-policy" element={<DataUsagePolicy />} />
              <Route path="/update-password" element={<UpdatePassword />} />
              <Route path="/my-job" element={<Myjob />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/my-job-profile" element={<MyJobProfile />} />
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
              <Route path="/saved-job" element={<SaveJob />} />
              <Route path="/saved-candidates" element={<SaveCandidate />} />
              {/* <Route path="/blog-list/:id" element={<BlogList />} /> */}
              <Route path="/blog-list/:slug/:id" element={<BlogList />} />
              {/* <Route
                path="/course/:slug/:courseId/learn"
                element={
                    <BlogList />
                }
              /> */}
              <Route path="/post-blog" element={<PostBlog />} />
              <Route path="/edit-blog/:id" element={<EditBlogs />} />
              <Route path="/blog-portal" element={<BlogPortal />} />
              <Route path="/my-blogs" element={<MyBlog />} />
              <Route path="/about-us" element={<AboutPage />} />
              <Route path="/refund-policy" element={<RefundPolicy />} />
              <Route path="/pricing-policy" element={<PricingPolicy />} />
              <Route path="/monetization" element={<EarningPage />} />
              <Route path="/modules-accordion" element={<ModulesAccordion />} />
              {/* <Route path="/seminar/:slug/:id" element={<SeminarDetails />} />
              <Route path="/course/:slug/:id" element={<CourseDetails />} /> */}
              <Route path="/post-blog/:slug/:id" element={<PostBlog />} />
              <Route path="/payment-success" element={<PaymentSuccess />} />
              <Route path="/payment-cancel" element={<PaymentCancel />} />
              <Route
                path="/course/:slug/:courseId"
                element={<CourseDetails />}
              />
              <Route
                path="/seminar/:slug/:seminarId"
                element={<SeminarDetails />}
              />

              {/* <Route
                path="/payment-success"
                element={<PaymentSuccess supabase={supabase} />}
              /> */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </HelmetProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
