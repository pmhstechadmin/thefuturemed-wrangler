import React, { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { User, GraduationCap, Briefcase, MapPin, Lock } from "lucide-react";
import Footer from "@/footer/Footer";
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
import logo from "@/image/thefuturemed_logo (1).jpg";
import { Link, useNavigate } from "react-router-dom";

const SaveCandidate = () => {
  const [savedProfiles, setSavedProfiles] = useState<any[]>([]);
  const hasSubscription = true; // Replace with actual logic if needed

  useEffect(() => {
    const fetchSavedCandidates = async () => {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) return;

      const { data: saved, error: savedError } = await supabase
        .from("save_profiles")
        .select("*")
        .eq("user_id", user.id);

      if (savedError || !saved) {
        console.error("Error fetching saved profiles:", savedError);
        return;
      }

      const validIds = saved
        .map((entry) => entry.job_seekers_id)
        .filter((id) => id && id !== "null" && id.length === 36);

      if (validIds.length === 0) return;

      const { data: profiles, error: profileError } = await supabase
        .from("job_seekers")
        .select("*")
        .in("id", validIds);

      if (profileError) {
        console.error("Error fetching job seekers:", profileError);
      } else {
        setSavedProfiles(profiles || []);
      }
    };

    fetchSavedCandidates();
  }, []);

  const handleSaveCandidate = async (id: string) => {
    console.log("Already saved, or logic can be extended");
  };

  const setSelectedSeeker = (seeker: any) => {
    console.log("Viewing full profile:", seeker);
  };
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
    <div className="space-y-4">
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
      <h2 className="text-xl font-bold">Saved Candidates</h2>
      {savedProfiles.length === 0 && <p>No candidates saved yet.</p>}
      <div className="grid gap-6">
        {savedProfiles.map((seeker) => (
          <Card key={seeker.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <CardTitle className="text-xl text-blue-600 flex items-center gap-2">
                    <User className="h-5 w-5" />
                    {seeker.name}
                  </CardTitle>
                  <CardDescription className="text-lg font-medium text-gray-900">
                    {seeker.qualification}
                  </CardDescription>
                </div>
                <a href={`tel:+91${seeker.phone}`}>
                  <Button variant="outline" size="sm">
                    Contact Candidate
                  </Button>
                </a>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                  <div className="flex items-center">
                    <GraduationCap className="mr-1 h-4 w-4" />
                    {seeker.highest_qualification}
                  </div>
                  <div className="flex items-center">
                    <Briefcase className="mr-1 h-4 w-4" />
                    {seeker.years_of_experience} years experience
                  </div>
                  <div className="flex items-center">
                    <MapPin className="mr-1 h-4 w-4" />
                    {seeker.current_location}
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium text-gray-900">
                    Contact Information:
                  </h4>
                  <div className="space-y-1">
                    <p className="text-sm text-gray-600">
                      Email: {hasSubscription ? seeker.email : "***@***.com"}
                      {!hasSubscription && (
                        <Lock className="inline h-3 w-3 ml-1 text-amber-500" />
                      )}
                    </p>
                    <p className="text-sm text-gray-600">
                      Phone:{" "}
                      {hasSubscription ? seeker.phone : "+1 (***) ***-****"}
                      {!hasSubscription && (
                        <Lock className="inline h-3 w-3 ml-1 text-amber-500" />
                      )}
                    </p>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 mb-2">
                    Key Skills:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {(seeker.skills || []).map(
                      (skill: string, index: number) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="bg-green-100 text-green-800"
                        >
                          {skill}
                        </Badge>
                      )
                    )}
                  </div>
                </div>

                <div className="bg-gray-50 p-3 rounded-md">
                  <span className="font-medium text-gray-900">
                    Availability:{" "}
                  </span>
                  <span className="text-gray-700">{seeker.availability}</span>
                </div>

                <div className="flex gap-3 pt-4">
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    {hasSubscription ? "Contact Now" : "Subscribe to Contact"}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => handleSaveCandidate(seeker.id)}
                  >
                    Saved
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedSeeker(seeker)}
                  >
                    View Full Profile
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default SaveCandidate;
 