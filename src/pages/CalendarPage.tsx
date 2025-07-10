
// import { useState, useEffect } from 'react';
// import { Button } from '@/components/ui/button';
// import { Calendar } from '@/components/ui/calendar';
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// import { Badge } from '@/components/ui/badge';
// import { CalendarDays, Users, Clock, User, UserPlus, ArrowLeft } from 'lucide-react';
// import { supabase } from '@/integrations/supabase/client';
// import { useToast } from '@/hooks/use-toast';
// import { useNavigate } from 'react-router-dom';
// import type { User as AuthUser } from '@supabase/supabase-js';

// interface Seminar {
//   id: string;
//   host_name: string;
//   topic: string;
//   description: string;
//   date: string;
//   time: string;
//   host_id: string;
// }

// const CalendarPage = () => {
//   const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
//   const [seminars, setSeminars] = useState<Seminar[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [user, setUser] = useState<AuthUser | null>(null);
//   const { toast } = useToast();
//   const navigate = useNavigate();

//   useEffect(() => {
//     checkUser();
//     if (selectedDate) {
//       fetchSeminarsForDate(selectedDate);
//     }
//   }, [selectedDate]);

//   const checkUser = async () => {
//     try {
//       const { data: { session } } = await supabase.auth.getSession();
//       setUser(session?.user || null);
//     } catch (error) {
//       console.error('Error checking user:', error);
//     }
//   };

//   const fetchSeminarsForDate = async (date: Date) => {
//     setLoading(true);
//     try {
//       const dateString = date.toISOString().split('T')[0];
      
//       const { data, error } = await supabase
//         .from('seminars')
//         .select('*')
//         .eq('date', dateString)
//         .order('time', { ascending: true });

//       if (error) throw error;
//       setSeminars(data || []);
//     } catch (error) {
//       console.error('Error fetching seminars:', error);
//       toast({
//         title: "Error",
//         description: "Failed to fetch seminars for the selected date.",
//         variant: "destructive",
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleHostSeminar = () => {
//     if (!user) {
//       toast({
//         title: "Authentication Required",
//         description: "Please sign in to host a seminar.",
//         variant: "destructive",
//       });
//       return;
//     }
//     navigate('/host-seminar');
//   };

//   const handleRegister = () => {
//     navigate('/register');
//   };

//   const handleSeminarClick = (seminar: Seminar) => {
//     console.log('Seminar clicked:', seminar.id);
//     const seminarUrl = `${window.location.origin}/seminar/${seminar.id}`;
//     console.log('Opening URL:', seminarUrl);
    
//     const newWindow = window.open(seminarUrl, '_blank', 'width=1200,height=800,scrollbars=yes,resizable=yes');
    
//     if (!newWindow) {
//       toast({
//         title: "Popup Blocked",
//         description: "Please allow popups for this site to view seminar details.",
//         variant: "destructive",
//       });
//       navigate(`/seminar/${seminar.id}`);
//     }
//   };

//   const formatTime = (time: string) => {
//     return new Date(`1970-01-01T${time}`).toLocaleTimeString([], { 
//       hour: '2-digit', 
//       minute: '2-digit' 
//     });
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
//       <div className="container mx-auto px-4 py-8">
//         {/* Header */}
//         <div className="text-center mb-8">
//           <div className="flex items-center justify-center gap-4 mb-4">
//             <Button 
//               variant="outline" 
//               onClick={() => navigate('/e-seminar')}
//               className="flex items-center gap-2"
//             >
//               <ArrowLeft className="h-4 w-4" />
//               Back to E-Seminar
//             </Button>
//           </div>
//           <h1 className="text-4xl font-bold text-gray-900 mb-4">Seminar Calendar</h1>
//           <p className="text-xl text-gray-600 mb-6">Browse and join medical seminars</p>
          
//           <div className="flex flex-col sm:flex-row gap-4 justify-center">
//             <Button 
//               onClick={handleHostSeminar}
//               className="bg-blue-600 hover:bg-blue-700 px-8 py-3 text-lg"
//             >
//               <Users className="mr-2 h-5 w-5" />
//               Host a Seminar
//             </Button>
//             {!user && (
//               <Button 
//                 onClick={handleRegister}
//                 variant="outline" 
//                 className="border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-3 text-lg"
//               >
//                 <UserPlus className="mr-2 h-5 w-5" />
//                 Register
//               </Button>
//             )}
//           </div>
//         </div>

//         <div className="grid lg:grid-cols-2 gap-8">
//           {/* Calendar Section */}
//           <Card>
//             <CardHeader>
//               <CardTitle className="flex items-center gap-2">
//                 <CalendarDays className="h-5 w-5" />
//                 Select Date
//               </CardTitle>
//               <CardDescription>
//                 Choose a date to view available seminars
//               </CardDescription>
//             </CardHeader>
//             <CardContent>
//               <Calendar
//                 mode="single"
//                 selected={selectedDate}
//                 onSelect={setSelectedDate}
//                 className="rounded-md border"
//               />
//             </CardContent>
//           </Card>

//           {/* Seminars for Selected Date */}
//           <Card>
//             <CardHeader>
//               <CardTitle className="flex items-center gap-2">
//                 <Clock className="h-5 w-5" />
//                 Seminars on {selectedDate?.toLocaleDateString()}
//               </CardTitle>
//               <CardDescription>
//                 {seminars.length} seminar(s) scheduled for this date
//               </CardDescription>
//             </CardHeader>
//             <CardContent>
//               {loading ? (
//                 <div className="text-center py-8">
//                   <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
//                   <p className="mt-2 text-gray-600">Loading seminars...</p>
//                 </div>
//               ) : seminars.length === 0 ? (
//                 <div className="text-center py-8">
//                   <CalendarDays className="h-12 w-12 text-gray-400 mx-auto mb-4" />
//                   <p className="text-gray-600">No seminars scheduled for this date</p>
//                 </div>
//               ) : (
//                 <div className="space-y-4">
//                   {seminars.map((seminar) => (
//                     <Card 
//                       key={seminar.id} 
//                       className="cursor-pointer hover:shadow-md transition-shadow border-2 hover:border-blue-300"
//                       onClick={() => handleSeminarClick(seminar)}
//                     >
//                       <CardContent className="p-4">
//                         <div className="flex justify-between items-start mb-2">
//                           <h3 className="font-semibold text-lg text-blue-700 hover:text-blue-800">
//                             {seminar.topic}
//                           </h3>
//                           <Badge variant="secondary">
//                             {formatTime(seminar.time)}
//                           </Badge>
//                         </div>
//                         <div className="flex items-center gap-2 text-gray-600 mb-2">
//                           <User className="h-4 w-4" />
//                           <span>Hosted by {seminar.host_name}</span>
//                         </div>
//                         {seminar.description && (
//                           <p className="text-gray-600 text-sm">{seminar.description}</p>
//                         )}
//                         <div className="mt-2 text-xs text-blue-600">
//                           Click to view details and register
//                         </div>
//                       </CardContent>
//                     </Card>
//                   ))}
//                 </div>
//               )}
//             </CardContent>
//           </Card>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CalendarPage;


import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  CalendarDays,
  Users,
  Clock,
  User,
  UserPlus,
  ArrowLeft,
  Home,
  Shield,
  Menu,
  X,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useNavigate, Link } from "react-router-dom";
import type { User as AuthUser } from "@supabase/supabase-js";
import logo from "@/image/thefuturemed_logo (1).jpg";

interface Seminar {
  id: string;
  host_name: string;
  topic: string;
  description: string;
  date: string;
  time: string;
  host_id: string;
}

const CalendarPage = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date()
  );
  const [seminars, setSeminars] = useState<Seminar[]>([]);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<AuthUser | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    checkUser();
    if (selectedDate) {
      fetchSeminarsForDate(selectedDate);
    }
  }, [selectedDate]);

  const checkUser = async () => {
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setUser(session?.user || null);
    } catch (error) {
      console.error("Error checking user:", error);
    }
  };

  const fetchSeminarsForDate = async (date: Date) => {
    setLoading(true);
    try {
      const dateString = date.toISOString().split("T")[0];

      const { data, error } = await supabase
        .from("seminars")
        .select("*")
        .eq("date", dateString)
        .order("time", { ascending: true });

      if (error) throw error;
      setSeminars(data || []);
    } catch (error) {
      console.error("Error fetching seminars:", error);
      toast({
        title: "Error",
        description: "Failed to fetch seminars for the selected date.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleHostSeminar = () => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to host a seminar.",
        variant: "destructive",
      });
      return;
    }
    navigate("/host-seminar");
  };

  const handleRegister = () => {
    navigate("/register");
  };

  const handleBackNavigation = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("/e-seminar");
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

  // const handleSeminarClick = (seminar: Seminar) => {
  //   const seminarUrl = `${window.location.origin}/seminar/${seminar.id}`;
  //   const newWindow = window.open(
  //     seminarUrl,
  //     "_blank",
  //     "width=1200,height=800,scrollbars=yes,resizable=yes"
  //   );

  //   if (!newWindow) {
  //     toast({
  //       title: "Popup Blocked",
  //       description:
  //         "Please allow popups for this site to view seminar details.",
  //       variant: "destructive",
  //     });
  //     navigate(`/seminar/${seminar.id}`);
  //   }
  // };

  const handleSeminarClick = (seminar: Seminar) => {
    navigate(`/seminar/${seminar.id}`);
  };
  

  const formatTime = (time: string) => {
    return new Date(`1970-01-01T${time}`).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

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
                // onClick={handleBackNavigation}
                onClick={() => navigate("/e-seminar")}
                className="text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm p-2"
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
                {/* <Shield className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">MedPortal</h1> */}
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

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
            Seminar Calendar
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            Browse and join medical seminars
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={handleHostSeminar}
              className="bg-blue-600 hover:bg-blue-700 px-4 py-3 text-base sm:px-8 sm:text-lg"
            >
              <Users className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
              Host a Seminar
            </Button>
            {!user && (
              <Button
                onClick={handleRegister}
                variant="outline"
                className="border-blue-600 text-blue-600 hover:bg-blue-50 px-4 py-3 text-base sm:px-8 sm:text-lg"
              >
                <UserPlus className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                Register
              </Button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Calendar Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CalendarDays className="h-4 w-4 sm:h-5 sm:w-5" />
                Select Date
              </CardTitle>
              <CardDescription>
                Choose a date to view available seminars
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                className="rounded-md border w-full max-w-[340px]"
              />
            </CardContent>
          </Card>

          {/* Seminars for Selected Date */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-4 w-4 sm:h-5 sm:w-5" />
                Seminars on {selectedDate?.toLocaleDateString()}
              </CardTitle>
              <CardDescription>
                {seminars.length} seminar(s) scheduled for this date
              </CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                  <p className="mt-2 text-gray-600">Loading seminars...</p>
                </div>
              ) : seminars.length === 0 ? (
                <div className="text-center py-8">
                  <CalendarDays className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">
                    No seminars scheduled for this date
                  </p>
                </div>
              ) : (
                <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
                  {seminars.map((seminar) => (
                    <Card
                      key={seminar.id}
                      className="cursor-pointer hover:shadow-md transition-shadow border-2 hover:border-blue-300"
                      onClick={() => handleSeminarClick(seminar)}
                    >
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-semibold text-base sm:text-lg text-blue-700 hover:text-blue-800">
                            {seminar.topic}
                          </h3>
                          <Badge
                            variant="secondary"
                            className="text-xs sm:text-sm"
                          >
                            {formatTime(seminar.time)}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600 mb-2 text-sm">
                          <User className="h-3 w-3 sm:h-4 sm:w-4" />
                          <span>Hosted by {seminar.host_name}</span>
                        </div>
                        {seminar.description && (
                          <p className="text-gray-600 text-xs sm:text-sm line-clamp-2">
                            {seminar.description}
                          </p>
                        )}
                        <div className="mt-2 text-xs text-blue-600">
                          Click to view details and register
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CalendarPage;