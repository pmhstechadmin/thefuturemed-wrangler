
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Register from "./pages/Register";
import ProductPortal from "./pages/ProductPortal";
import Community from "./pages/Community";
import CommunityChat from "./pages/CommunityChat";
import ESeminar from "./pages/ESeminar";
import CalendarPage from "./pages/CalendarPage";
import HostSeminar from "./pages/HostSeminar";
import SeminarDetails from "./pages/SeminarDetails";
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
          <Route path="/products" element={<ProductPortal />} />
          <Route path="/community" element={<Community />} />
          <Route path="/community/:communityId" element={<CommunityChat />} />
          <Route path="/e-seminar" element={<ESeminar />} />
          <Route path="/calendar" element={<CalendarPage />} />
          <Route path="/host-seminar" element={<HostSeminar />} />
          <Route path="/seminar/:seminarId" element={<SeminarDetails />} />
          <Route path="/register" element={<Register />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
