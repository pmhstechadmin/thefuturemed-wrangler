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
<<<<<<< HEAD
=======
import Footer from "@/footer/Footer";
>>>>>>> 8c4c5c5addf49b5f79e7d037752dae9cad5d1ae0

const TermsOfService = () => {
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
        <div className="container mx-auto px-4 py-3">
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

              <Link to="/" className="flex items-center">
                <img
                  src={logo}
                  alt="MedPortal Logo"
                  className="h-10 w-auto max-w-[200px]"
                />
              </Link>
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
                      <LogOut className="h-4 w-4 md:mr-2" />
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

              {/* Home Button */}
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
                Terms of Service
              </CardTitle>
              <p className="text-center text-gray-600">
                Last updated: {new Date().toLocaleDateString()}
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <section>
                <h2 className="text-2xl font-semibold mb-3">
                  1. Acceptance of Terms
                </h2>
                <div className="space-y-3 text-gray-700">
                  <p>
                    By accessing and using MedPortal, you accept and agree to be
                    bound by these Terms of Service. If you do not agree to
                    these terms, you may not use our platform.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-3">
                  2. Eligibility and Account Registration
                </h2>
                <div className="space-y-3 text-gray-700">
                  <p>
                    <strong>Professional Verification:</strong> This platform is
                    exclusively for verified medical professionals and students.
                    Users must provide accurate professional credentials.
                  </p>
                  <p>
                    <strong>Account Security:</strong> Users are responsible for
                    maintaining account security and all activities under their
                    account.
                  </p>
                  <p>
                    <strong>False Information:</strong> Providing false or
                    misleading professional information may result in immediate
                    account termination.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-3">
                  3. Platform Usage
                </h2>
                <div className="space-y-3 text-gray-700">
                  <p>
                    <strong>Permitted Use:</strong> The platform may be used for
                    professional medical networking, education, and knowledge
                    sharing.
                  </p>
                  <p>
                    <strong>Prohibited Activities:</strong>
                  </p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>
                      Sharing patient information or violating HIPAA/privacy
                      regulations
                    </li>
                    <li>
                      Providing direct medical advice to patients through the
                      platform
                    </li>
                    <li>
                      Harassment, discrimination, or unprofessional conduct
                    </li>
                    <li>Spamming or unauthorized commercial activities</li>
                    <li>
                      Uploading malicious software or attempting to breach
                      security
                    </li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-3">
                  4. Content and Intellectual Property
                </h2>
                <div className="space-y-3 text-gray-700">
                  <p>
                    <strong>User Content:</strong> Users retain ownership of
                    content they post but grant MedPortal a license to use,
                    modify, and distribute such content on the platform.
                  </p>
                  <p>
                    <strong>Platform Content:</strong> All platform features,
                    design, and proprietary content are owned by MedPortal and
                    protected by intellectual property laws.
                  </p>
                  <p>
                    <strong>Medical Information:</strong> Content shared is for
                    educational purposes only and should not be considered as
                    medical advice for specific patients.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-3">
                  5. Limitation of Liability
                </h2>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <div className="space-y-3 text-gray-700">
                    <p>
                      <strong>PLATFORM DISCLAIMER:</strong> MedPortal provides a
                      networking and educational platform only. We are not
                      responsible for:
                    </p>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>Medical decisions made based on platform content</li>
                      <li>Technical issues, data loss, or system downtime</li>
                      <li>Loss or corruption of uploaded files</li>
                      <li>Actions or misconduct of other users</li>
                      <li>Third-party content or external links</li>
                      <li>
                        Data breaches due to circumstances beyond our control
                      </li>
                    </ul>
                    <p>
                      <strong>USER RESPONSIBILITY:</strong> Users must maintain
                      secure backups of important files and verify all medical
                      information independently.
                    </p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-3">
                  6. Data Usage and Promotion
                </h2>
                <div className="space-y-3 text-gray-700">
                  <p>
                    <strong>Promotional Use:</strong> MedPortal may use
                    aggregated, anonymized data and user testimonials for
                    promotional purposes, subject to privacy policy terms.
                  </p>
                  <p>
                    <strong>Professional Recognition:</strong> Outstanding
                    contributions to the platform may be highlighted in
                    marketing materials with user consent.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-3">
                  7. Platform Availability
                </h2>
                <div className="space-y-3 text-gray-700">
                  <p>
                    We strive to maintain platform availability but do not
                    guarantee uninterrupted service. Maintenance, updates, or
                    technical issues may cause temporary disruptions.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-3">8. Termination</h2>
                <div className="space-y-3 text-gray-700">
                  <p>
                    We reserve the right to suspend or terminate accounts for
                    violations of these terms, professional misconduct, or other
                    reasons at our discretion.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-3">
                  9. Governing Law
                </h2>
                <div className="space-y-3 text-gray-700">
                  <p>
                    These terms are governed by applicable international laws
                    and regulations regarding digital platforms and medical data
                    privacy.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-3">
                  10. Contact Information
                </h2>
                <div className="space-y-3 text-gray-700">
                  <p>
                    For questions about these terms, contact us at:
                    legal@medportal.com
                  </p>
                </div>
              </section>
            </CardContent>
          </Card>
        </div>
      </main>
<<<<<<< HEAD
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
=======
     <Footer/>
>>>>>>> 8c4c5c5addf49b5f79e7d037752dae9cad5d1ae0
    </div>
  );
};

export default TermsOfService;
