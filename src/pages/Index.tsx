import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Shield,
  Users,
  Calendar,
  BookOpen,
  GraduationCap,
  Stethoscope,
  UserPlus,
  Menu,
  X,
  Briefcase,
  LogIn,
} from "lucide-react";
import AuthModal from "@/components/AuthModal";
import HomepageAdsCarousel from "@/components/HomepageAdsCarousel";
import logo from "@/image/thefuturemed_logo__1_-removebg-preview.png";
import type { User as SupabaseUser } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { Layout, Grid3X3, User, Home, ArrowLeft } from "lucide-react";
import Footer from "@/footer/Footer";
import HomepageCarousel from "./HomepageCarousel";
import { mixpanelInstance } from "@/utils/mixpanel";
import YouTube from "react-youtube";

const Index = () => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
const [authMode, setAuthMode] = useState<"signin" >("signin");
  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    try {
      console.log("🔄 Checking user session...");

      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      if (error) {
        console.error("❌ Error getting session:", error);
      }

      console.log("📦 Full session data:", session);
      console.log("👤 User data:", session?.user);

      setUser(session?.user || null);
    } catch (error) {
      console.error("❗ Unexpected error checking user:", error);
    } finally {
      setLoading(false);
      console.log("✅ Done checking user. Loading set to false.");
    }
  };
  useEffect(() => {
    checkUser(); // check once on load

    // 👂 Listen for login/logout
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user || null); // ✅ Update user without refresh
      }
    );

    return () => {
      authListener.subscription.unsubscribe(); // cleanup listener
    };
  }, []);

  const handleAuthSuccess = () => {
    // Handle successful authentication - you can add any additional logic here
    console.log("Authentication successful");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      {/* Navigation */}
      <nav className="bg-white shadow-lg border-b border-blue-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              {/* <Shield className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">MedPortal</h1> */}
              <Link to="/">
                <img src={logo} alt="Logo" className="h-10 w-100 mr-2" />
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              <Link
                to="/dashboard"
                className="text-gray-600 hover:text-blue-600 transition-colors font-medium px-3 py-2 rounded-md hover:bg-blue-50"
              >
                Dashboard
                {/* Products */}
              </Link>
              <Link
                to="/community"
                className="text-gray-600 hover:text-blue-600 transition-colors font-medium px-3 py-2 rounded-md hover:bg-blue-50"
              >
                Community
              </Link>
              <Link
                to="/e-seminar"
                className="text-gray-600 hover:text-blue-600 transition-colors font-medium px-3 py-2 rounded-md hover:bg-blue-50"
              >
                E-Seminar
              </Link>
              <Link
                to="/e-learning"
                className="text-gray-600 hover:text-blue-600 transition-colors font-medium px-3 py-2 rounded-md hover:bg-blue-50"
              >
                E-Learning
              </Link>
              <Link
                to="/jobs"
                className="text-gray-600 hover:text-blue-600 transition-colors font-medium px-3 py-2 rounded-md hover:bg-blue-50"
              >
                Jobs
              </Link>
              <Link
                to="/calendar"
                className="text-gray-600 hover:text-blue-600 transition-colors font-medium px-3 py-2 rounded-md hover:bg-blue-50"
              >
                Calendar
              </Link>
              {user ? (
                <div className="flex items-center gap-4">
                  {/* Profile Button */}
                  <Button
                    variant="outline"
                    className="text-white bg-gray-800 hover:bg-gray-700 border border-white/30"
                    // onClick={() => navigate("/profile")}
                    onClick={() => {
                      mixpanelInstance.track("profile Button Clicked", {
                        timestamp: new Date().toISOString(),
                      });
                      navigate("/profile");
                    }}
                  >
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </Button>

                  {/* Sign Out Button */}
                  <Button
                    onClick={async () => {
                      mixpanelInstance.track("Sign Out Home Button Clicked", {
                        timestamp: new Date().toISOString(),
                      });
                      await supabase.auth.signOut();
                      setUser(null); // optional if you're listening for auth changes
                    }}
                    className="bg-red-600 hover:bg-red-700 text-white shadow-md hover:shadow-lg transition-all duration-200"
                  >
                    Sign Out
                  </Button>
                </div>
              ) : (
                // Sign In / Register Button (shown when user is NOT logged in)
                // <Button
                //   onClick={() => setShowAuthModal(true)}
                //   className="bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg transition-all duration-200"
                // >
                //   Sign In / Register
                // </Button>
                <div className="flex gap-3">
                  {" "}
                  {/* Container for both buttons with spacing */}
                  {/* Sign In Button */}
                  <Button
                    onClick={() => {
                      mixpanelInstance.track("Signin Home Button Clicked", {
                        timestamp: new Date().toISOString(),
                      });
                      setShowAuthModal(true);
                      setAuthMode("signin");
                    }}
                    // onClick={() => {
                    //   setShowAuthModal(true);
                    //   setAuthMode("signin"); // Track which form to show
                    // }}
                    className="bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg transition-all duration-200 flex-1"
                  >
                    Sign In
                  </Button>
                  {/* Register Button */}
                  <Button
                    onClick={() => {
                      mixpanelInstance.track("Register Home Button Clicked", {
                        timestamp: new Date().toISOString(),
                      });
                      setShowAuthModal(true);
                      navigate("/register");
                    }}
                    // onClick={() => {
                    //   setShowAuthModal(true);
                    //   navigate("/register");
                    //   // Track which form to show
                    // }}
                    className="bg-green-600 hover:bg-green-700 text-white shadow-md hover:shadow-lg transition-all duration-200 flex-1"
                  >
                    Register
                  </Button>
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 hover:bg-blue-50"
              >
                {isMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden mt-4 pb-4 border-t pt-4 bg-white rounded-lg shadow-sm">
              <div className="flex flex-col space-y-3">
                <Link
                  to="/dashboard"
                  className="text-gray-600 hover:text-blue-600 transition-colors font-medium p-3 rounded-md hover:bg-blue-50"
                >
                  Dashboard
                  {/* Products */}
                </Link>
                <Link
                  to="/community"
                  className="text-gray-600 hover:text-blue-600 transition-colors font-medium p-3 rounded-md hover:bg-blue-50"
                >
                  Community
                </Link>
                <Link
                  to="/e-seminar"
                  className="text-gray-600 hover:text-blue-600 transition-colors font-medium p-3 rounded-md hover:bg-blue-50"
                >
                  E-Seminar
                </Link>
                <Link
                  to="/e-learning"
                  className="text-gray-600 hover:text-blue-600 transition-colors font-medium p-3 rounded-md hover:bg-blue-50"
                >
                  E-Learning
                </Link>
                <Link
                  to="/jobs"
                  className="text-gray-600 hover:text-blue-600 transition-colors font-medium p-3 rounded-md hover:bg-blue-50"
                >
                  Jobs
                </Link>
                <Link
                  to="/calendar"
                  className="text-gray-600 hover:text-blue-600 transition-colors font-medium p-3 rounded-md hover:bg-blue-50"
                >
                  Calendar
                </Link>
                {/* <Button
                  onClick={() => setShowAuthModal(true)}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg transition-all duration-200"
                >
                  <UserPlus className="mr-2 h-4 w-4" />
                  Sign In / Register
                </Button> */}

                {user ? (
                  <>
                    <Button
                      variant="outline"
                      className="text-blue border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm justify-center mt-2"
                      onClick={() => {
                        mixpanelInstance.track(
                          "Profile Mobile view Home Button Clicked",
                          {
                            timestamp: new Date().toISOString(),
                          }
                        );
                        navigate("/profile");
                        setIsMenuOpen(false);
                      }}
                    >
                      <User className="h-4 w-4 mr-2" />
                      Profile
                    </Button>
                    <Button
                      className="bg-red-600 hover:bg-red-700 text-white justify-center"
                      onClick={async () => {
                        mixpanelInstance.track(
                          "Sign Out Mobile view Home Button Clicked",
                          {
                            timestamp: new Date().toISOString(),
                          }
                        );
                        await supabase.auth.signOut();
                        setUser(null);
                        setIsMenuOpen(false);
                      }}
                    >
                      Sign Out
                    </Button>
                  </>
                ) : (
                  // <Button
                  //   onClick={() => {
                  //     setShowAuthModal(true);
                  //     setIsMenuOpen(false);
                  //   }}
                  //   className="bg-blue-600 hover:bg-blue-700 text-white justify-center mt-2"
                  // >
                  //   <UserPlus className="mr-2 h-4 w-4" />
                  //   Sign In / Register
                  // </Button>
                  <>
                    <Button
                      onClick={() => {
                        mixpanelInstance.track(
                          "SignIn Mobile view Home Button Clicked",
                          {
                            timestamp: new Date().toISOString(),
                          }
                        );
                        setShowAuthModal(true);
                        setIsMenuOpen(false);
                        setAuthMode("signin"); // Add this state to track auth mode
                      }}
                      className="bg-blue-600 hover:bg-blue-700 text-white justify-center mt-2 ml-2"
                    >
                      <LogIn className="mr-2 h-4 w-4" />{" "}
                      {/* Changed icon to LogIn */}
                      Sign In
                    </Button>

                    <Button
                      onClick={() => {
                        mixpanelInstance.track(
                          "Register Mobile View Home Button Clicked",
                          {
                            timestamp: new Date().toISOString(),
                          }
                        );
                        setShowAuthModal(true);
                        setIsMenuOpen(false);
                        navigate("/register"); // Add this state to track auth mode
                      }}
                      className="bg-green-600 hover:bg-green-700 text-white justify-center mt-2 ml-2" /* Added ml-2 for margin */
                    >
                      <UserPlus className="mr-2 h-4 w-4" />
                      Register
                    </Button>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </nav>

      <div className="container mx-auto px-1 py-2">

      <HomepageCarousel />
      </div>


      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
          Welcome to <span className="text-blue-600">TheFutureMed</span>
          {/* Welcome to <span className="text-blue-600">MedPortal</span> */}
        </h2>
        <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
          Your comprehensive platform for medical education, community
          engagement, and professional development.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            size="lg"
            onClick={() => {
              mixpanelInstance.track("Get Started Button Clicked", {
                timestamp: new Date().toISOString(),
              });
              navigate("/profile");
              // setShowAuthModal(true);
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 px-8 py-4 text-lg"
          >
            Get Started
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={() => {
              mixpanelInstance.track("Dashboard Button Clicked", {
                timestamp: new Date().toISOString(),
              });
              navigate("/dashboard");
              
            }}
            // asChild
            className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white shadow-md hover:shadow-lg transition-all duration-200 px-8 py-4 text-lg"
          >
            Explore Dashboard
            {/* <Link to="/dashboard">Explore Products</Link> */}
          </Button>
        </div>
      </section>

      {/* Homepage Ads Carousel */}
      <section className="container mx-auto px-4">
        <HomepageAdsCarousel />
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="hover:shadow-xl transition-all duration-300 border border-blue-100 hover:border-blue-200">
            <CardHeader>
              <Stethoscope className="h-12 w-12 text-blue-600 mb-4" />
              <CardTitle className="text-xl">AI Medic Agents</CardTitle>
              <CardDescription className="text-gray-600">
                AI-powered medical assistance and diagnosis
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                variant="outline"
                asChild
                className="w-full border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-200"
              >
                <a
                  href="https://ai-assistant.medorbis.ai/?ref=thefuturemed&location=homepage&ad=1"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => {
                    mixpanelInstance.track("Try AI Assistant Button Clicked", {
                      timestamp: new Date().toISOString(),
                    });
                  }}
                >
                  Try AI Assistant
                </a>
              </Button>
            </CardContent>
          </Card>
          {/* <Card className="hover:shadow-xl transition-all duration-300 border border-blue-100 hover:border-blue-200">
            <CardHeader>
              <Stethoscope className="h-12 w-12 text-blue-600 mb-4" />
              <CardTitle className="text-xl">Medical Products</CardTitle>
              <CardDescription className="text-gray-600">
                Discover the latest medical equipment and pharmaceutical
                products
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                variant="outline"
                asChild
                className="w-full border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-200"
              >
                <Link to="/products">Browse Products</Link>
              </Button>
            </CardContent>
          </Card> */}

          <Card className="hover:shadow-xl transition-all duration-300 border border-green-100 hover:border-green-200">
            <CardHeader>
              <Users className="h-12 w-12 text-green-600 mb-4" />
              <CardTitle className="text-xl">Community</CardTitle>
              <CardDescription className="text-gray-600">
                Connect with medical professionals and join specialized
                communities
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                variant="outline"
                asChild
                className="w-full border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white transition-all duration-200"
              >
                <Link
                  onClick={() => {
                    mixpanelInstance.track(" Join Community Button Clicked", {
                      timestamp: new Date().toISOString(),
                    });
                  }}
                  to="/community"
                >
                  Join Community
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-xl transition-all duration-300 border border-purple-100 hover:border-purple-200">
            <CardHeader>
              <Calendar className="h-12 w-12 text-purple-600 mb-4" />
              <CardTitle className="text-xl">E-Seminars</CardTitle>
              <CardDescription className="text-gray-600">
                Attend live seminars and webinars by medical experts
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                variant="outline"
                asChild
                className="w-full border-2 border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white transition-all duration-200"
              >
                <Link
                  onClick={() => {
                    mixpanelInstance.track(" Seminars Button Clicked", {
                      timestamp: new Date().toISOString(),
                    });
                  }}
                  to="/e-seminar"
                >
                  View Seminars
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-xl transition-all duration-300 border border-orange-100 hover:border-orange-200">
            <CardHeader>
              <GraduationCap className="h-12 w-12 text-orange-600 mb-4" />
              <CardTitle className="text-xl">E-Learning</CardTitle>
              <CardDescription className="text-gray-600">
                Create and take comprehensive medical courses with
                certifications
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                variant="outline"
                asChild
                className="w-full border-2 border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white transition-all duration-200"
              >
                <Link
                  onClick={() => {
                    mixpanelInstance.track(" Learning Button Clicked", {
                      timestamp: new Date().toISOString(),
                    });
                  }}
                  to="/e-learning"
                >
                  Start Learning
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-xl transition-all duration-300 border border-yellow-100 hover:border-yellow-200">
            <CardHeader>
              <Briefcase className="h-12 w-12 text-yellow-600 mb-4" />
              <CardTitle className="text-xl">Job Portal</CardTitle>
              <CardDescription className="text-gray-600">
                Find medical job opportunities and advance your healthcare
                career
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                variant="outline"
                asChild
                className="w-full border-2 border-yellow-600 text-yellow-600 hover:bg-yellow-600 hover:text-white transition-all duration-200"
              >
                <Link
                  onClick={() => {
                    mixpanelInstance.track(" Jobs Button Clicked", {
                      timestamp: new Date().toISOString(),
                    });
                  }}
                  to="/jobs"
                >
                  Browse Jobs
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-xl transition-all duration-300 border border-red-100 hover:border-red-200">
            <CardHeader>
              <Calendar className="h-12 w-12 text-red-600 mb-4" />
              <CardTitle className="text-xl">Event Calendar</CardTitle>
              <CardDescription className="text-gray-600">
                Stay updated with medical conferences, workshops, and events
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                variant="outline"
                asChild
                className="w-full border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition-all duration-200"
              >
                <Link
                  onClick={() => {
                    mixpanelInstance.track(" Calendar Button Clicked", {
                      timestamp: new Date().toISOString(),
                    });
                  }}
                  to="/calendar"
                >
                  View Calendar
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
        <div className="mt-12 text-center">
          <div className="aspect-w-16 aspect-h-9 w-3/4  mx-auto">
            <YouTube
              videoId="Jh0HcfGHSTA" // Just the ID part of the URL
              opts={{
                width: "100%",
                playerVars: {
                  autoplay: 0, // Auto-play is off by default
                },
              }}
              onReady={(event) => {
                event.target.pauseVideo();
              }}
            />
          </div>
        </div>
      </section>

      <Footer />
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onSuccess={handleAuthSuccess}
      />
    </div>
  );
};

export default Index;
