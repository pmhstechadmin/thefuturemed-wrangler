
// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { Badge } from "@/components/ui/badge";
// import { Search, MapPin, Clock, DollarSign, Briefcase, Plus, Building, User, Users, Crown, CreditCard } from "lucide-react";
// import { JobProviderForm } from "@/components/job-portal/JobProviderForm";
// import { JobSeekerForm } from "@/components/job-portal/JobSeekerForm";
// import { JobListings } from "@/components/job-portal/JobListings";
// import { EnhancedJobSeekerProfiles } from "@/components/job-portal/EnhancedJobSeekerProfiles";
// import { SubscriptionPlans } from "@/components/job-portal/SubscriptionPlans";
// import { SubscriptionStatus } from "@/components/job-portal/SubscriptionStatus";

// const JobPortal = () => {
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
//       {/* Header */}
//       <div className="bg-white shadow-sm border-b">
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
//           <TabsList className="grid w-full grid-cols-6 mb-8">
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
//                   <div className="text-center py-8 text-gray-500">
//                     <CreditCard className="h-12 w-12 mx-auto mb-4 opacity-50" />
//                     <p>No payment history available</p>
//                     <p className="text-sm">Payments will appear here once you subscribe</p>
//                   </div>
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





// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { Badge } from "@/components/ui/badge";
// import { Search, MapPin, Clock, DollarSign, Briefcase, Plus, Building, User, Users, Crown, CreditCard } from "lucide-react";
// import { JobProviderForm } from "@/components/job-portal/JobProviderForm";
// import { JobSeekerForm } from "@/components/job-portal/JobSeekerForm";
// import { JobListings } from "@/components/job-portal/JobListings";
// import { EnhancedJobSeekerProfiles } from "@/components/job-portal/EnhancedJobSeekerProfiles";
// import { SubscriptionPlans } from "@/components/job-portal/SubscriptionPlans";
// import { SubscriptionStatus } from "@/components/job-portal/SubscriptionStatus";
// import { useNavigate } from "react-router-dom";





import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card, CardContent, CardDescription, CardHeader, CardTitle
} from "@/components/ui/card";
import {
  Tabs, TabsContent, TabsList, TabsTrigger
} from "@/components/ui/tabs";
import {
  Search, MapPin, Clock, DollarSign, Briefcase, Plus, Building, User, Users, Crown, CreditCard, ArrowLeft, Shield, Layout, Grid3X3, UserPlus, Home
} from "lucide-react";
import { JobProviderForm } from "@/components/job-portal/JobProviderForm";
import { JobSeekerForm } from "@/components/job-portal/JobSeekerForm";
import { JobListings } from "@/components/job-portal/JobListings";
import { EnhancedJobSeekerProfiles } from "@/components/job-portal/EnhancedJobSeekerProfiles";
import { SubscriptionPlans } from "@/components/job-portal/SubscriptionPlans";
import { SubscriptionStatus } from "@/components/job-portal/SubscriptionStatus";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import type { User as SupabaseUser } from '@supabase/supabase-js';
import { useToast } from "@/hooks/use-toast";
import { JobSeekerProfiles } from "@/components/job-portal/JobSeekerProfiles";
import PaymentHistory from "@/components/job-portal/PaymentHistory ";


const JobPortal = () => {


  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const handleBackNavigation = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate('/');
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
      console.error('Sign out error:', error);
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
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) console.error('Error fetching session:', error);
        setUser(session?.user ?? null);
      } catch (err) {
        console.error('Failed to fetch user:', err);
      } finally {
        setLoading(false);
      }
    };

    checkUser();
  }, []);




  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">

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
              <Link to="/" className="flex items-center space-x-2">
                <Shield className="h-8 w-8 text-blue-400" />
                <h1 className="text-2xl font-bold text-white">MedPortal</h1>
              </Link>
            </div>
            <div className="flex items-center space-x-4">

              {user ? (
                <div className="flex items-center space-x-4">
                  <span className="text-white text-sm bg-white/10 px-3 py-1 rounded-full">Welcome, {user.email}</span>
                  <Button
                    variant="outline"
                    className="text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm"
                    onClick={() => navigate('/profile')}
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
                onClick={() => navigate('/')}
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


      {/* Header */}
      <div className="bg-white shadow-sm border-b ">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Medical Job Portal</h1>
            <p className="text-gray-600 text-lg">Connect healthcare professionals with opportunities</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="browse" className="w-full">
          <TabsList className="grid w-full grid-cols-7 mb-8">
            <TabsTrigger value="browse" className="flex items-center gap-2">
              <Search className="h-4 w-4" />
              Browse Jobs
            </TabsTrigger>

            <TabsTrigger value="job-provider" className="flex items-center gap-2">
              <Building className="h-4 w-4" />
              Job Provider
            </TabsTrigger>
            <TabsTrigger value="job-seeker" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Job Seeker
            </TabsTrigger>
            <TabsTrigger value="job-seekers-form" className="flex items-center gap-2">
              <CreditCard className="h-4 w-4" />
              Job Seekers Profile
            </TabsTrigger>
            <TabsTrigger value="candidates" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Find Candidates
            </TabsTrigger>
            <TabsTrigger value="subscription" className="flex items-center gap-2">
              <Crown className="h-4 w-4" />
              Subscription
            </TabsTrigger>
            <TabsTrigger value="billing" className="flex items-center gap-2">
              <CreditCard className="h-4 w-4" />
              Billing
            </TabsTrigger>


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
                    Register your organization to post job opportunities and connect with healthcare professionals
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <JobProviderForm />
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          {/* *********************************************************************************** */}
          <TabsContent value="job-seeker">
            <div className="max-w-4xl mx-auto">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Job Seeker Profile
                  </CardTitle>
                  <CardDescription>
                    Create your professional profile to be discovered by healthcare employers
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
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Billing & Subscription Management</h2>
                <p className="text-gray-600 mb-6">
                  Manage your subscription, view payment history, and update billing information.
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
                  {/* <div className="text-center py-8 text-gray-500">
                    <CreditCard className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No payment history available</p>
                    <p className="text-sm">Payments will appear here once you subscribe</p>
                  </div> */}
                  <PaymentHistory/>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default JobPortal;

