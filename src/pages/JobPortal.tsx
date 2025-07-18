
// // import { useState } from "react";
// // import { Button } from "@/components/ui/button";
// // import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// // import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// // import { Badge } from "@/components/ui/badge";
// // import { Search, MapPin, Clock, DollarSign, Briefcase, Plus, Building, User, Users, Crown, CreditCard } from "lucide-react";
// // import { JobProviderForm } from "@/components/job-portal/JobProviderForm";
// // import { JobSeekerForm } from "@/components/job-portal/JobSeekerForm";
// // import { JobListings } from "@/components/job-portal/JobListings";
// // import { EnhancedJobSeekerProfiles } from "@/components/job-portal/EnhancedJobSeekerProfiles";
// // import { SubscriptionPlans } from "@/components/job-portal/SubscriptionPlans";
// // import { SubscriptionStatus } from "@/components/job-portal/SubscriptionStatus";

// // const JobPortal = () => {
// //   return (
// //     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
// //       {/* Header */}
// //       <div className="bg-white shadow-sm border-b">
// //         <div className="container mx-auto px-4 py-6">
// //           <div className="text-center">
// //             <h1 className="text-4xl font-bold text-gray-900 mb-2">Medical Job Portal</h1>
// //             <p className="text-gray-600 text-lg">Connect healthcare professionals with opportunities</p>
// //           </div>
// //         </div>
// //       </div>

// //       {/* Main Content */}
// //       <div className="container mx-auto px-4 py-8">
// //         <Tabs defaultValue="browse" className="w-full">
// //           <TabsList className="grid w-full grid-cols-6 mb-8">
// //             <TabsTrigger value="browse" className="flex items-center gap-2">
// //               <Search className="h-4 w-4" />
// //               Browse Jobs
// //             </TabsTrigger>
// //             <TabsTrigger value="job-provider" className="flex items-center gap-2">
// //               <Building className="h-4 w-4" />
// //               Job Provider
// //             </TabsTrigger>
// //             <TabsTrigger value="job-seeker" className="flex items-center gap-2">
// //               <User className="h-4 w-4" />
// //               Job Seeker
// //             </TabsTrigger>
// //             <TabsTrigger value="candidates" className="flex items-center gap-2">
// //               <Users className="h-4 w-4" />
// //               Find Candidates
// //             </TabsTrigger>
// //             <TabsTrigger value="subscription" className="flex items-center gap-2">
// //               <Crown className="h-4 w-4" />
// //               Subscription
// //             </TabsTrigger>
// //             <TabsTrigger value="billing" className="flex items-center gap-2">
// //               <CreditCard className="h-4 w-4" />
// //               Billing
// //             </TabsTrigger>
// //           </TabsList>

// //           <TabsContent value="browse">
// //             <JobListings />
// //           </TabsContent>

// //           <TabsContent value="job-provider">
// //             <div className="max-w-4xl mx-auto">
// //               <Card>
// //                 <CardHeader>
// //                   <CardTitle className="flex items-center gap-2">
// //                     <Building className="h-5 w-5" />
// //                     Job Provider Registration
// //                   </CardTitle>
// //                   <CardDescription>
// //                     Register your organization to post job opportunities and connect with healthcare professionals
// //                   </CardDescription>
// //                 </CardHeader>
// //                 <CardContent>
// //                   <JobProviderForm />
// //                 </CardContent>
// //               </Card>
// //             </div>
// //           </TabsContent>

// //           <TabsContent value="job-seeker">
// //             <div className="max-w-4xl mx-auto">
// //               <Card>
// //                 <CardHeader>
// //                   <CardTitle className="flex items-center gap-2">
// //                     <User className="h-5 w-5" />
// //                     Job Seeker Profile
// //                   </CardTitle>
// //                   <CardDescription>
// //                     Create your professional profile to be discovered by healthcare employers
// //                   </CardDescription>
// //                 </CardHeader>
// //                 <CardContent>
// //                   <JobSeekerForm />
// //                 </CardContent>
// //               </Card>
// //             </div>
// //           </TabsContent>

// //           <TabsContent value="candidates">
// //             <EnhancedJobSeekerProfiles />
// //           </TabsContent>

// //           <TabsContent value="subscription">
// //             <div className="max-w-6xl mx-auto">
// //               <SubscriptionPlans />
// //             </div>
// //           </TabsContent>

// //           <TabsContent value="billing">
// //             <div className="max-w-4xl mx-auto space-y-6">
// //               <div>
// //                 <h2 className="text-2xl font-bold text-gray-900 mb-4">Billing & Subscription Management</h2>
// //                 <p className="text-gray-600 mb-6">
// //                   Manage your subscription, view payment history, and update billing information.
// //                 </p>
// //               </div>

// //               <SubscriptionStatus />

// //               <Card>
// //                 <CardHeader>
// //                   <CardTitle>Payment History</CardTitle>
// //                   <CardDescription>
// //                     View your recent payments and download invoices
// //                   </CardDescription>
// //                 </CardHeader>
// //                 <CardContent>
// //                   <div className="text-center py-8 text-gray-500">
// //                     <CreditCard className="h-12 w-12 mx-auto mb-4 opacity-50" />
// //                     <p>No payment history available</p>
// //                     <p className="text-sm">Payments will appear here once you subscribe</p>
// //                   </div>
// //                 </CardContent>
// //               </Card>
// //             </div>
// //           </TabsContent>
// //         </Tabs>
// //       </div>
// //     </div>
// //   );
// // };

// // export default JobPortal;





// // import { useState } from "react";
// // import { Button } from "@/components/ui/button";
// // import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// // import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// // import { Badge } from "@/components/ui/badge";
// // import { Search, MapPin, Clock, DollarSign, Briefcase, Plus, Building, User, Users, Crown, CreditCard } from "lucide-react";
// // import { JobProviderForm } from "@/components/job-portal/JobProviderForm";
// // import { JobSeekerForm } from "@/components/job-portal/JobSeekerForm";
// // import { JobListings } from "@/components/job-portal/JobListings";
// // import { EnhancedJobSeekerProfiles } from "@/components/job-portal/EnhancedJobSeekerProfiles";
// // import { SubscriptionPlans } from "@/components/job-portal/SubscriptionPlans";
// // import { SubscriptionStatus } from "@/components/job-portal/SubscriptionStatus";
// // import { useNavigate } from "react-router-dom";





// import { useState, useEffect } from "react";
// import { Button } from "@/components/ui/button";
// import {
//   Card, CardContent, CardDescription, CardHeader, CardTitle
// } from "@/components/ui/card";
// import {
//   Tabs, TabsContent, TabsList, TabsTrigger
// } from "@/components/ui/tabs";
// import {
//   Search, MapPin, Clock, DollarSign, Briefcase, Plus, Building, User, Users, Crown, CreditCard, ArrowLeft, Shield, Layout, Grid3X3, UserPlus, Home
// } from "lucide-react";
// import { JobProviderForm } from "@/components/job-portal/JobProviderForm";
// import { JobSeekerForm } from "@/components/job-portal/JobSeekerForm";
// import { JobListings } from "@/components/job-portal/JobListings";
// import { EnhancedJobSeekerProfiles } from "@/components/job-portal/EnhancedJobSeekerProfiles";
// import { SubscriptionPlans } from "@/components/job-portal/SubscriptionPlans";
// import { SubscriptionStatus } from "@/components/job-portal/SubscriptionStatus";
// import { useNavigate, Link } from "react-router-dom";
// import { supabase } from "@/integrations/supabase/client";
// import type { User as SupabaseUser } from '@supabase/supabase-js';
// import { useToast } from "@/hooks/use-toast";
// import { JobSeekerProfiles } from "@/components/job-portal/JobSeekerProfiles";
// import PaymentHistory from "@/components/job-portal/PaymentHistory ";


// const JobPortal = () => {


//   const navigate = useNavigate();
//   const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
//   const [user, setUser] = useState<SupabaseUser | null>(null);
//   const [loading, setLoading] = useState(true);
//   const { toast } = useToast();

//   const handleBackNavigation = () => {
//     if (window.history.length > 1) {
//       navigate(-1);
//     } else {
//       navigate('/');
//     }
//   };
//   const handleSignOut = async () => {
//     try {
//       const { error } = await supabase.auth.signOut();
//       if (error) throw error;
//       setUser(null);
//       toast({
//         title: "Signed Out",
//         description: "You have been successfully signed out.",
//       });
//     } catch (error) {
//       console.error('Sign out error:', error);
//       toast({
//         title: "Error",
//         description: "Failed to sign out. Please try again.",
//         variant: "destructive",
//       });
//     }
//   };

//   useEffect(() => {
//     const checkUser = async () => {
//       try {
//         const { data: { session }, error } = await supabase.auth.getSession();
//         if (error) console.error('Error fetching session:', error);
//         setUser(session?.user ?? null);
//       } catch (err) {
//         console.error('Failed to fetch user:', err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     checkUser();
//   }, []);




//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">

//       <header className="bg-black/30 backdrop-blur-md border-b border-white/20 sticky top-0 z-50 shadow-xl">
//         <div className="container mx-auto px-4 py-4">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center space-x-4">
//               <Button
//                 variant="outline"
//                 onClick={handleBackNavigation}
//                 className="text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm"
//                 title="Go back"
//               >
//                 <ArrowLeft className="mr-2 h-4 w-4" />
//                 Back
//               </Button>
//               <Link to="/" className="flex items-center space-x-2">
//                 <Shield className="h-8 w-8 text-blue-400" />
//                 <h1 className="text-2xl font-bold text-white">MedPortal</h1>
//               </Link>
//             </div>
//             <div className="flex items-center space-x-4">

//               {user ? (
//                 <div className="flex items-center space-x-4">
//                   <span className="text-white text-sm bg-white/10 px-3 py-1 rounded-full">Welcome, {user.email}</span>
//                   <Button
//                     variant="outline"
//                     className="text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm"
//                     onClick={() => navigate('/profile')}
//                   >
//                     <User className="mr-2 h-4 w-4" />
//                     Profile
//                   </Button>
//                   <Button
//                     variant="outline"
//                     className="text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm"
//                     onClick={handleSignOut}
//                   >
//                     Sign Out
//                   </Button>
//                 </div>
//               ) : (
//                 <>
//                   <Link to="/register">
//                     <Button
//                       variant="outline"
//                       className="text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm"
//                     >
//                       Register
//                     </Button>
//                   </Link>
//                   <Link to="/">
//                     <Button className="bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl transition-all duration-200">
//                       <UserPlus className="mr-2 h-4 w-4" />
//                       Sign In
//                     </Button>
//                   </Link>
//                 </>
//               )}
//               <Button
//                 variant="outline"
//                 onClick={() => navigate('/')}
//                 className="text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm"
//                 title="Go to home page"
//               >
//                 <Home className="mr-2 h-4 w-4" />
//                 Home
//               </Button>
//             </div>
//           </div>
//         </div>
//       </header>


//       {/* Header */}
//       <div className="bg-white shadow-sm border-b ">
//         <div className="container mx-auto px-4 py-6">
//           <div className="text-center">
//             <h1 className="text-4xl font-bold text-gray-900 mb-2">Medical Job Portal</h1>
//             <p className="text-gray-600 text-lg">Connect healthcare professionals with opportunities</p>
//           </div>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="container mx-auto px-4 py-8">
//         <Tabs defaultValue="browse" className="w-full">
//           <TabsList className="grid w-full grid-cols-7 mb-8">
//             <TabsTrigger value="browse" className="flex items-center gap-2">
//               <Search className="h-4 w-4" />
//               Browse Jobs
//             </TabsTrigger>

//             <TabsTrigger value="job-provider" className="flex items-center gap-2">
//               <Building className="h-4 w-4" />
//               Job Provider
//             </TabsTrigger>
//             <TabsTrigger value="job-seeker" className="flex items-center gap-2">
//               <User className="h-4 w-4" />
//               Job Seeker
//             </TabsTrigger>
//             <TabsTrigger value="job-seekers-form" className="flex items-center gap-2">
//               <CreditCard className="h-4 w-4" />
//               Job Seekers Profile
//             </TabsTrigger>
//             <TabsTrigger value="candidates" className="flex items-center gap-2">
//               <Users className="h-4 w-4" />
//               Find Candidates
//             </TabsTrigger>
//             <TabsTrigger value="subscription" className="flex items-center gap-2">
//               <Crown className="h-4 w-4" />
//               Subscription
//             </TabsTrigger>
//             <TabsTrigger value="billing" className="flex items-center gap-2">
//               <CreditCard className="h-4 w-4" />
//               Billing
//             </TabsTrigger>


//           </TabsList>

//           <TabsContent value="browse">
//             <JobListings />
//           </TabsContent>

//           <TabsContent value="job-provider">
//             <div className="max-w-4xl mx-auto">
//               <Card>
//                 <CardHeader>
//                   <CardTitle className="flex items-center gap-2">
//                     <Building className="h-5 w-5" />
//                     Job Provider Registration
//                   </CardTitle>
//                   <CardDescription>
//                     Register your organization to post job opportunities and connect with healthcare professionals
//                   </CardDescription>
//                 </CardHeader>
//                 <CardContent>
//                   <JobProviderForm />
//                 </CardContent>
//               </Card>
//             </div>
//           </TabsContent>
//           {/* *********************************************************************************** */}
//           <TabsContent value="job-seeker">
//             <div className="max-w-4xl mx-auto">
//               <Card>
//                 <CardHeader>
//                   <CardTitle className="flex items-center gap-2">
//                     <User className="h-5 w-5" />
//                     Job Seeker Profile
//                   </CardTitle>
//                   <CardDescription>
//                     Create your professional profile to be discovered by healthcare employers
//                   </CardDescription>
//                 </CardHeader>
//                 <CardContent>
//                   <JobSeekerForm />
//                 </CardContent>
//               </Card>
//             </div>
//           </TabsContent>

//           <TabsContent value="candidates">
//             <EnhancedJobSeekerProfiles />
//           </TabsContent>

//           <TabsContent value="job-seekers-form">
//             <JobSeekerProfiles />
//           </TabsContent>

//           <TabsContent value="subscription">
//             <div className="max-w-6xl mx-auto">
//               <SubscriptionPlans />
//             </div>
//           </TabsContent>

//           <TabsContent value="billing">
//             <div className="max-w-4xl mx-auto space-y-6">
//               <div>
//                 <h2 className="text-2xl font-bold text-gray-900 mb-4">Billing & Subscription Management</h2>
//                 <p className="text-gray-600 mb-6">
//                   Manage your subscription, view payment history, and update billing information.
//                 </p>
//               </div>

//               <SubscriptionStatus />

//               <Card>
//                 <CardHeader>
//                   <CardTitle>Payment History</CardTitle>
//                   <CardDescription>
//                     View your recent payments and download invoices
//                   </CardDescription>
//                 </CardHeader>
//                 <CardContent>
//                   {/* <div className="text-center py-8 text-gray-500">
//                     <CreditCard className="h-12 w-12 mx-auto mb-4 opacity-50" />
//                     <p>No payment history available</p>
//                     <p className="text-sm">Payments will appear here once you subscribe</p>
//                   </div> */}
//                   <PaymentHistory/>
//                 </CardContent>
//               </Card>
//             </div>
//           </TabsContent>
//         </Tabs>
//       </div>
//     </div>
//   );
// };

// export default JobPortal;

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Search,
  MapPin,
  Clock,
  DollarSign,
  Briefcase,
  Plus,
  Building,
  User,
  Users,
  Crown,
  CreditCard,
  ArrowLeft,
  Shield,
  Layout,
  Grid3X3,
  UserPlus,
  Home,
  Menu,
  X,
} from "lucide-react";
import { JobProviderForm } from "@/components/job-portal/JobProviderForm";
import { JobSeekerForm } from "@/components/job-portal/JobSeekerForm";
import { JobListings } from "@/components/job-portal/JobListings";
import { EnhancedJobSeekerProfiles } from "@/components/job-portal/EnhancedJobSeekerProfiles";
import { SubscriptionPlans } from "@/components/job-portal/SubscriptionPlans";
import { SubscriptionStatus } from "@/components/job-portal/SubscriptionStatus";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import type { User as SupabaseUser } from "@supabase/supabase-js";
import { useToast } from "@/hooks/use-toast";
import { JobSeekerProfiles } from "@/components/job-portal/JobSeekerProfiles";
import PaymentHistory from "@/components/job-portal/PaymentHistory ";
// import PaymentHistory from "@/components/job-portal/PaymentHistory";
import logo from "@/image/thefuturemed_logo (1).jpg";
import Footer from "@/footer/Footer";

const JobPortal = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("browse");
  const { toast } = useToast();

  const handleBackNavigation = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("/");
    }
  };

  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      setUser(null);
      toast({
        title: "Signed Out",
        description: "You have been successfully signed out.",
      });
    } catch (error) {
      console.error("Sign out error:", error);
      toast({
        title: "Error",
        description: "Failed to sign out. Please try again.",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    const checkUser = async () => {
      try {
        const {
          data: { session },
          error,
        } = await supabase.auth.getSession();
        if (error) console.error("Error fetching session:", error);
        setUser(session?.user ?? null);
      } catch (err) {
        console.error("Failed to fetch user:", err);
      } finally {
        setLoading(false);
      }
    };

    checkUser();
  }, []);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
  };

  const tabItems = [
    {
      value: "browse",
      label: "Browse Jobs",
      icon: <Search className="h-4 w-4" />,
    },
    {
      value: "job-provider",
      label: "Job Provider",
      icon: <Building className="h-4 w-4" />,
    },
    {
      value: "job-seeker",
      label: "Job Seeker",
      icon: <User className="h-4 w-4" />,
    },
    {
      value: "job-seekers-form",
      label: "Job Seekers Profile",
      icon: <CreditCard className="h-4 w-4" />,
    },
    {
      value: "candidates",
      label: "Find Candidates",
      icon: <Users className="h-4 w-4" />,
    },
    {
      value: "subscription",
      label: "Subscription",
      icon: <Crown className="h-4 w-4" />,
    },
    {
      value: "billing",
      label: "Billing",
      icon: <CreditCard className="h-4 w-4" />,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        ></div>
      )}

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white z-50 transform transition-transform duration-300 ease-in-out lg:hidden ${
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-4 flex justify-end">
          <Button variant="ghost" onClick={() => setMobileMenuOpen(false)}>
            <X className="h-6 w-6" />
          </Button>
        </div>
        <div className="p-4">
          {user ? (
            <div className="mb-6 p-4 bg-gray-100 rounded-lg">
              <p className="text-sm font-medium truncate">
                Welcome, {user.email}
              </p>
            </div>
          ) : null}
          <div className="space-y-2">
            {tabItems.map((item) => (
              <Button
                key={item.value}
                variant={activeTab === item.value ? "secondary" : "ghost"}
                className="w-full justify-start"
                onClick={() => handleTabChange(item.value)}
              >
                {item.icon}
                <span className="ml-2">{item.label}</span>
              </Button>
            ))}
          </div>
          <div className="mt-6 border-t pt-4">
            {user ? (
              <>
                <Button
                  variant="ghost"
                  className="w-full justify-start mb-2"
                  onClick={() => navigate("/profile")}
                >
                  <User className="h-4 w-4" />
                  <span className="ml-2">Profile</span>
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-red-600 hover:text-red-700"
                  onClick={handleSignOut}
                >
                  <span className="ml-2">Sign Out</span>
                </Button>
              </>
            ) : (
              <>
                <Link to="/register" className="block w-full mb-2">
                  <Button variant="ghost" className="w-full justify-start">
                    Register
                  </Button>
                </Link>
                <Link to="/" className="block w-full">
                  <Button className="w-full justify-start bg-blue-600 text-white hover:bg-blue-700">
                    <UserPlus className="h-4 w-4" />
                    <span className="ml-2">Sign In</span>
                  </Button>
                </Link>
              </>
            )}
            <Button
              variant="ghost"
              className="w-full justify-start mt-4"
              onClick={() => navigate("/")}
            >
              <Home className="h-4 w-4" />
              <span className="ml-2">Home</span>
            </Button>
          </div>
        </div>
      </div>

      <header className="bg-black/30 backdrop-blur-md border-b border-white/20 sticky top-0 z-50 shadow-xl">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 sm:space-x-4">
              <Button
                variant="outline"
                onClick={handleBackNavigation}
                className="text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm"
                title="Go back"
              >
                <ArrowLeft className="h-4 w-4" />
                <span className="hidden sm:inline ml-2">Back</span>
              </Button>
              {/* <Link to="/" className="flex items-center space-x-2">
                <Shield className="h-6 w-6 sm:h-8 sm:w-8 text-blue-400" />
                <h1 className="text-xl sm:text-2xl font-bold text-white">
                  MedPortal
                </h1>
              </Link> */}

              <div className="flex items-center space-x-2">
                <Link to="/">
                  <img src={logo} alt="Logo" className="h-10 w-100 mr-2" />
                </Link>
              </div>
            </div>
            <div className="hidden lg:flex items-center space-x-4">
              {user ? (
                <div className="flex items-center space-x-4">
                  <span className="text-white text-sm bg-white/10 px-3 py-1 rounded-full truncate max-w-[160px]">
                    Welcome, {user.email}
                  </span>
                  <Button
                    variant="outline"
                    className="text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm"
                    onClick={() => navigate("/profile")}
                  >
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </Button>
                  <Button
                    variant="outline"
                    className="text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm"
                    onClick={handleSignOut}
                  >
                    Sign Out
                  </Button>
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
                      <UserPlus className="mr-2 h-4 w-4" />
                      Sign In
                    </Button>
                  </Link>
                </>
              )}
              <Button
                variant="outline"
                onClick={() => navigate("/")}
                className="text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm"
                title="Go to home page"
              >
                <Home className="mr-2 h-4 w-4" />
                <span className="hidden sm:inline">Home</span>
              </Button>
            </div>
            <div className="flex lg:hidden items-center">
              <Button
                variant="outline"
                className="text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm"
                onClick={() => setMobileMenuOpen(true)}
              >
                <Menu className="h-6 w-6" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
              Medical Job Portal
            </h1>
            <p className="text-gray-600 text-base sm:text-lg">
              Connect healthcare professionals with opportunities
            </p>
          </div>
        </div>
      </div>

      {/* Mobile Tab Selector */}
      <div className="lg:hidden sticky top-[76px] z-40 bg-white border-b">
        <div className="container mx-auto px-4 py-2">
          <select
            className="w-full p-3 border rounded-lg bg-white text-gray-800"
            value={activeTab}
            onChange={(e) => handleTabChange(e.target.value)}
          >
            {tabItems.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full hidden lg:block"
        >
          <TabsList className="grid w-full grid-cols-7 mb-8">
            {tabItems.map((item) => (
              <TabsTrigger
                key={item.value}
                value={item.value}
                className="flex items-center gap-2"
              >
                {item.icon}
                {item.label}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="browse">
            <JobListings />
          </TabsContent>

          <TabsContent value="job-provider">
            <div className="max-w-4xl mx-auto">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building className="h-5 w-5" />
                    Job Provider Registration
                  </CardTitle>
                  <CardDescription>
                    Register your organization to post job opportunities and
                    connect with healthcare professionals
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <JobProviderForm />
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="job-seeker">
            <div className="max-w-4xl mx-auto">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Job Seeker Profile
                  </CardTitle>
                  <CardDescription>
                    Create your professional profile to be discovered by
                    healthcare employers
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <JobSeekerForm />
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="candidates">
            <EnhancedJobSeekerProfiles />
          </TabsContent>

          <TabsContent value="job-seekers-form">
            <JobSeekerProfiles />
          </TabsContent>

          <TabsContent value="subscription">
            <div className="max-w-6xl mx-auto">
              <SubscriptionPlans />
            </div>
          </TabsContent>

          <TabsContent value="billing">
            <div className="max-w-4xl mx-auto space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Billing & Subscription Management
                </h2>
                <p className="text-gray-600 mb-6">
                  Manage your subscription, view payment history, and update
                  billing information.
                </p>
              </div>

              <SubscriptionStatus />

              <Card>
                <CardHeader>
                  <CardTitle>Payment History</CardTitle>
                  <CardDescription>
                    View your recent payments and download invoices
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <PaymentHistory />
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Mobile Tab Content */}
        <div className="lg:hidden">
          {activeTab === "browse" && <JobListings />}
          {activeTab === "job-provider" && (
            <div className="max-w-4xl mx-auto">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building className="h-5 w-5" />
                    Job Provider Registration
                  </CardTitle>
                  <CardDescription>
                    Register your organization to post job opportunities and
                    connect with healthcare professionals
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <JobProviderForm />
                </CardContent>
              </Card>
            </div>
          )}
          {activeTab === "job-seeker" && (
            <div className="max-w-4xl mx-auto">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Job Seeker Profile
                  </CardTitle>
                  <CardDescription>
                    Create your professional profile to be discovered by
                    healthcare employers
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <JobSeekerForm />
                </CardContent>
              </Card>
            </div>
          )}
          {activeTab === "candidates" && <EnhancedJobSeekerProfiles />}
          {activeTab === "job-seekers-form" && <JobSeekerProfiles />}
          {activeTab === "subscription" && (
            <div className="max-w-6xl mx-auto">
              <SubscriptionPlans />
            </div>
          )}
          {activeTab === "billing" && (
            <div className="max-w-4xl mx-auto space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Billing & Subscription Management
                </h2>
                <p className="text-gray-600 mb-6">
                  Manage your subscription, view payment history, and update
                  billing information.
                </p>
              </div>

              <SubscriptionStatus />

              <Card>
                <CardHeader>
                  <CardTitle>Payment History</CardTitle>
                  <CardDescription>
                    View your recent payments and download invoices
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <PaymentHistory />
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default JobPortal;