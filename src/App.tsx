
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
import SeminarDetails from "./pages/SeminarDetails";
import HostSeminar from "./pages/HostSeminar";
import CalendarPage from "./pages/CalendarPage";
import ProductPortal from "./pages/ProductPortal";
import ELearning from "./pages/ELearning";
import CoursesListing from "./pages/CoursesListing";
import CourseDetails from "./pages/CourseDetails";
import { CourseAccessPage } from "./components/elearning/CourseAccessPage";
import Register from "./pages/Register";
import TermsOfService from "./pages/TermsOfService";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import DataUsagePolicy from "./pages/DataUsagePolicy";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/community" element={<Community />} />
          <Route path="/community/:communityId/chat" element={<CommunityChat />} />
          <Route path="/e-seminar" element={<ESeminar />} />
          <Route path="/seminar/:seminarId" element={<SeminarDetails />} />
          <Route path="/host-seminar" element={<HostSeminar />} />
          <Route path="/calendar" element={<CalendarPage />} />
          <Route path="/products" element={<ProductPortal />} />
          <Route path="/product-portal" element={<ProductPortal />} />
          <Route path="/e-learning" element={<ELearning />} />
          <Route path="/courses" element={<CoursesListing />} />
          <Route path="/course/:courseId" element={<CourseDetails />} />
          <Route path="/course/:courseId/learn" element={<CourseAccessPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/terms" element={<TermsOfService />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/data-usage" element={<DataUsagePolicy />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
