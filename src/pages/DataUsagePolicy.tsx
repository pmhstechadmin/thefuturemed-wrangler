import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, ArrowLeft, Database, Lock, Users, UserIcon, LogOut, Home } from "lucide-react";
import logo from "@/image/thefuturemed_logo (1).jpg";
import { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { supabase } from "@/integrations/supabase/client";
import Footer from "@/footer/Footer";

const DataUsagePolicy = () => {
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
                Data Usage Policy
              </CardTitle>
              <p className="text-center text-gray-600">
                Understanding how we handle your medical professional data
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Security Notice */}
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <Lock className="h-6 w-6 text-red-600 mt-1" />
                  <div>
                    <h3 className="font-semibold text-red-900">
                      Important Security Notice
                    </h3>
                    <p className="text-red-800 mt-1">
                      <strong>KEEP YOUR FILES SECURED:</strong> While we
                      implement robust security measures, users are responsible
                      for maintaining secure backups of important files. In
                      unavoidable circumstances such as technical failures, data
                      corruption, or system breaches, the platform owner is not
                      responsible for file loss or data compromise.
                    </p>
                  </div>
                </div>
              </div>

              <section>
                <div className="flex items-center space-x-2 mb-3">
                  <Database className="h-6 w-6 text-blue-600" />
                  <h2 className="text-2xl font-semibold">
                    1. Data Collection and Storage
                  </h2>
                </div>
                <div className="space-y-3 text-gray-700">
                  <p>
                    <strong>Professional Data:</strong> We collect and store
                    professional credentials, medical specialties, institutional
                    affiliations, and educational background to verify and
                    maintain platform integrity.
                  </p>
                  <p>
                    <strong>Activity Data:</strong> Platform usage, community
                    participation, seminar attendance, and interaction patterns
                    are tracked for service improvement and professional
                    networking.
                  </p>
                  <p>
                    <strong>Communication Data:</strong> Community posts,
                    seminar discussions, and direct messages are stored to
                    facilitate professional collaboration.
                  </p>
                </div>
              </section>

              <section>
                <div className="flex items-center space-x-2 mb-3">
                  <Users className="h-6 w-6 text-green-600" />
                  <h2 className="text-2xl font-semibold">
                    2. Data Usage for Platform Operations
                  </h2>
                </div>
                <div className="space-y-3 text-gray-700">
                  <p>
                    <strong>Professional Verification:</strong> Credentials are
                    verified to ensure platform exclusivity for legitimate
                    medical professionals.
                  </p>
                  <p>
                    <strong>Community Building:</strong> Professional
                    information facilitates connections between medical
                    professionals with similar specialties or interests.
                  </p>
                  <p>
                    <strong>Content Personalization:</strong> Usage data helps
                    customize content recommendations and relevant professional
                    opportunities.
                  </p>
                  <p>
                    <strong>Quality Assurance:</strong> Activity monitoring
                    ensures compliance with professional standards and platform
                    guidelines.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-3">
                  3. Promotional and Marketing Usage
                </h2>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="space-y-3 text-gray-700">
                    <p>
                      <strong>Aggregated Analytics:</strong> We may use
                      anonymized, aggregated data for:
                    </p>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>
                        Platform performance marketing and growth analytics
                      </li>
                      <li>Medical specialty distribution statistics</li>
                      <li>Geographic usage patterns for expansion planning</li>
                      <li>Success stories and platform impact demonstration</li>
                    </ul>
                    <p>
                      <strong>User Testimonials:</strong> With explicit consent,
                      we may feature user testimonials and success stories in
                      marketing materials.
                    </p>
                    <p>
                      <strong>Professional Recognition:</strong> Outstanding
                      contributions may be highlighted in newsletters or
                      promotional content, with prior notification.
                    </p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-3">
                  4. Data Sharing Guidelines
                </h2>
                <div className="space-y-3 text-gray-700">
                  <p>
                    <strong>Professional Network:</strong> Basic professional
                    information (name, specialty, institution) is visible to
                    other verified platform members to facilitate professional
                    networking.
                  </p>
                  <p>
                    <strong>Third-Party Services:</strong> Limited data may be
                    shared with trusted service providers for platform
                    functionality (authentication, analytics, communication
                    tools).
                  </p>
                  <p>
                    <strong>Legal Compliance:</strong> Data may be disclosed
                    when required by law or to protect platform security and
                    user safety.
                  </p>
                  <p>
                    <strong>No Patient Data:</strong> We strictly prohibit
                    sharing of patient information and maintain compliance with
                    medical privacy regulations globally.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-3">
                  5. Global Compliance Standards
                </h2>
                <div className="space-y-3 text-gray-700">
                  <p>
                    <strong>GDPR Compliance:</strong> For European users, we
                    comply with General Data Protection Regulation requirements
                    including data portability and deletion rights.
                  </p>
                  <p>
                    <strong>HIPAA Awareness:</strong> While not a healthcare
                    provider, we maintain awareness of medical privacy standards
                    and encourage users to comply with their local regulations.
                  </p>
                  <p>
                    <strong>International Standards:</strong> We follow
                    international best practices for medical professional data
                    handling and cross-border data transfers.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-3">
                  6. User Control and Rights
                </h2>
                <div className="space-y-3 text-gray-700">
                  <p>
                    <strong>Data Access:</strong> Users can request access to
                    their stored data and download personal information.
                  </p>
                  <p>
                    <strong>Data Correction:</strong> Professional information
                    can be updated through account settings or by contacting
                    support.
                  </p>
                  <p>
                    <strong>Data Deletion:</strong> Account deletion requests
                    are processed according to legal requirements and
                    operational needs.
                  </p>
                  <p>
                    <strong>Marketing Opt-out:</strong> Users can opt out of
                    promotional communications while maintaining access to
                    essential platform notifications.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-3">
                  7. Data Security and Liability
                </h2>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <div className="space-y-3 text-gray-700">
                    <p>
                      <strong>Security Measures:</strong> We implement
                      industry-standard encryption, access controls, and
                      monitoring systems.
                    </p>
                    <p>
                      <strong>User Responsibility:</strong> Users must maintain
                      strong passwords, secure their devices, and follow
                      security best practices.
                    </p>
                    <p>
                      <strong>Liability Limitations:</strong> While we strive
                      for maximum security, we cannot guarantee absolute
                      protection against all potential threats. Users should
                      maintain independent backups of critical information.
                    </p>
                    <p>
                      <strong>Incident Response:</strong> Security incidents are
                      addressed promptly with user notification as required by
                      applicable laws.
                    </p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-3">
                  8. Contact and Inquiries
                </h2>
                <div className="space-y-3 text-gray-700">
                  <p>
                    For data usage questions, privacy concerns, or to exercise
                    your data rights:
                  </p>
                  <p>
                    <strong>Email:</strong> data-privacy@medportal.com
                  </p>
                  <p>
                    <strong>Data Protection Officer:</strong> dpo@medportal.com
                  </p>
                  <p>
                    <strong>Response Time:</strong> We aim to respond to
                    data-related inquiries within 30 days.
                  </p>
                </div>
              </section>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer/>
    </div>
  );
};

export default DataUsagePolicy;
