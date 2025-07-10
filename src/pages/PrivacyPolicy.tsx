import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Shield,
  ArrowLeft,
  User as UserIcon,
  LogOut,
  Home,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { supabase } from "@/integrations/supabase/client";
import logo from "@/image/thefuturemed_logo (1).jpg";
import { useEffect, useState } from "react";

const PrivacyPolicy = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
    };
    fetchUser();
  }, []);

  const handleBackNavigation = () => navigate(-1);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      {/* Header */}
      <header className="bg-black/30 backdrop-blur-md border-b border-white/20 sticky top-0 z-50 shadow-xl">
              <div className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                  {/* Left Section - Logo and Back Button */}
                  <div className="flex items-center space-x-2 md:space-x-4">
                    <Button
                      variant="outline"
                      onClick={handleBackNavigation}
                      className="text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm p-2 md:px-4 md:py-2"
                      title="Go back"
                    >
                      <ArrowLeft className="h-4 w-4 md:mr-2" />
                      <span className="hidden md:inline">Back</span>
                    </Button>
                    {/* <Link to="/" className="flex items-center space-x-2">
                      <Shield className="h-6 w-6 md:h-8 md:w-8 text-blue-400" />
                      <h1 className="text-xl md:text-2xl font-bold text-white">
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
      
                  {/* Right Section - Navigation Items */}
                  <div className="flex items-center space-x-2 md:space-x-4">
                    {user ? (
                      <>
                        {/* Desktop View - Full User Info */}
                        <div className="hidden lg:flex items-center space-x-4">
                          <span className="text-white text-sm bg-white/10 px-3 py-1 rounded-full">
                            Welcome, {user.email}
                          </span>
                          <Button
                            variant="outline"
                            className="text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm p-2 md:px-4 md:py-2"
                            onClick={() => navigate("/profile")}
                            title="Profile"
                          >
                            <UserIcon className="h-4 w-4 md:mr-2" />
                            <span className="hidden md:inline">Profile</span>
                          </Button>
                          <Button
                            variant="outline"
                            className="text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm p-2 md:px-4 md:py-2"
                            onClick={handleSignOut}
                            title="Sign Out"
                          >
                            <span className="hidden md:inline">Sign Out</span>
                          </Button>
                        </div>
      
                        {/* Mobile/Tablet View - User Menu Dropdown */}
                        <div className="lg:hidden">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="outline"
                                size="icon"
                                className="text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm"
                              >
                                <UserIcon className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56 bg-black/80 backdrop-blur-md border-white/20">
                              <DropdownMenuLabel className="text-white">
                                {user.email}
                              </DropdownMenuLabel>
                              <DropdownMenuSeparator className="bg-white/20" />
                              <DropdownMenuItem
                                className="text-white hover:bg-white/10"
                                onClick={() => navigate("/profile")}
                              >
                                <UserIcon className="mr-2 h-4 w-4" />
                                <span>Profile</span>
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                className="text-white hover:bg-white/10"
                                onClick={handleSignOut}
                              >
                                <LogOut className="mr-2 h-4 w-4" />
                                <span>Sign Out</span>
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </>
                    ) : (
                      <>
                        <Link to="/register">
                          <Button
                            variant="outline"
                            className="hidden md:flex text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm"
                          >
                            Register
                          </Button>
                        </Link>
      
                        <Link to="/">
                          <Button
                            className="bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl transition-all duration-200 p-2 md:px-4 md:py-2"
                            title="Sign In"
                          >
                            <UserIcon className="h-4 w-4 md:mr-2" />
                            <span className="hidden md:inline">Sign In</span>
                          </Button>
                        </Link>
                      </>
                    )}
      
                    {/* Home Button - Icon only on mobile/tablet */}
                    <Button
                      variant="outline"
                      onClick={() => navigate("/")}
                      className="text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm p-2 md:px-4 md:py-2"
                      title="Go to home page"
                    >
                      <Home className="h-4 w-4 md:mr-2" />
                      <span className="hidden md:inline">Home</span>
                    </Button>
                  </div>
                </div>
              </div>
            </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-3xl font-bold text-center">
                Privacy Policy
              </CardTitle>
              <p className="text-center text-gray-600">
                Last updated: {new Date().toLocaleDateString()}
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <section>
                <h2 className="text-2xl font-semibold mb-3">
                  1. Information We Collect
                </h2>
                <div className="space-y-3 text-gray-700">
                  <p>
                    <strong>Personal Information:</strong> We collect
                    information you provide directly, including name, email
                    address, medical specialty, institution, and professional
                    credentials.
                  </p>
                  <p>
                    <strong>Usage Data:</strong> We collect information about
                    how you use our platform, including pages visited, features
                    used, and interaction data.
                  </p>
                  <p>
                    <strong>Device Information:</strong> We may collect
                    device-specific information such as IP address, browser
                    type, and operating system.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-3">
                  2. How We Use Your Information
                </h2>
                <div className="space-y-3 text-gray-700">
                  <p>We use collected information to:</p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Provide and maintain our medical portal services</li>
                    <li>
                      Verify professional credentials and maintain platform
                      integrity
                    </li>
                    <li>
                      Facilitate community interactions and seminar
                      participation
                    </li>
                    <li>
                      Send important notifications about platform updates and
                      medical opportunities
                    </li>
                    <li>
                      Improve our services through analytics and user feedback
                    </li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-3">
                  3. Data Sharing and Disclosure
                </h2>
                <div className="space-y-3 text-gray-700">
                  <p>
                    <strong>Professional Directory:</strong> Basic professional
                    information (name, specialty, institution) may be visible to
                    other verified medical professionals on the platform.
                  </p>
                  <p>
                    <strong>Legal Requirements:</strong> We may disclose
                    information when required by law or to protect the rights
                    and safety of our users.
                  </p>
                  <p>
                    <strong>Service Providers:</strong> We may share data with
                    trusted third-party service providers who assist in platform
                    operations.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-3">
                  4. Data Security
                </h2>
                <div className="space-y-3 text-gray-700">
                  <p>
                    We implement industry-standard security measures to protect
                    your personal information. However, no method of
                    transmission over the internet is 100% secure.
                  </p>
                  <p>
                    <strong>User Responsibility:</strong> Users are responsible
                    for maintaining the confidentiality of their account
                    credentials and for all activities under their account.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-3">
                  5. Data Retention
                </h2>
                <div className="space-y-3 text-gray-700">
                  <p>
                    We retain personal information for as long as necessary to
                    provide services and comply with legal obligations. Users
                    may request account deletion, subject to legal and
                    operational requirements.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-3">
                  6. International Data Transfers
                </h2>
                <div className="space-y-3 text-gray-700">
                  <p>
                    Your information may be transferred to and processed in
                    countries other than your country of residence. We ensure
                    appropriate safeguards are in place for such transfers.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-3">7. Your Rights</h2>
                <div className="space-y-3 text-gray-700">
                  <p>Depending on your location, you may have rights to:</p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Access, update, or delete your personal information</li>
                    <li>Object to or restrict processing of your data</li>
                    <li>Data portability</li>
                    <li>Withdraw consent where applicable</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-3">
                  8. Contact Information
                </h2>
                <div className="space-y-3 text-gray-700">
                  <p>
                    For privacy-related questions or requests, contact us at:
                    privacy@medportal.com
                  </p>
                </div>
              </section>
            </CardContent>
          </Card>
        </div>
      </main>
      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                {/* <Shield className="h-6 w-6" />
                      <span className="text-xl font-bold">MedPortal</span> */}
                <Link to="/">
                  <img src={logo} alt="Logo" className="h-10 w-100 mr-2" />
                </Link>
              </div>
              <p className="text-gray-400">
                Empowering medical professionals through technology and
                community.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Platform</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link
                    to="/products"
                    className="hover:text-white transition-colors"
                  >
                    Products
                  </Link>
                </li>
                <li>
                  <Link
                    to="/community"
                    className="hover:text-white transition-colors"
                  >
                    Community
                  </Link>
                </li>
                <li>
                  <Link
                    to="/e-learning"
                    className="hover:text-white transition-colors"
                  >
                    E-Learning
                  </Link>
                </li>
                <li>
                  <Link
                    to="/e-seminar"
                    className="hover:text-white transition-colors"
                  >
                    E-Seminars
                  </Link>
                </li>
                <li>
                  <Link
                    to="/jobs"
                    className="hover:text-white transition-colors"
                  >
                    Jobs
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Documentation
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    API
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link
                    to="/privacy-policy"
                    className="hover:text-white transition-colors"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    to="/about-us"
                    className="hover:text-white transition-colors"
                  >
                    About Us
                  </Link>
                </li>

                <li>
                  <Link
                    to="/terms-of-service"
                    className="hover:text-white transition-colors"
                  >
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link
                    to="/data-usage-policy"
                    className="hover:text-white transition-colors"
                  >
                    Data Usage Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 MedPortal. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PrivacyPolicy;
