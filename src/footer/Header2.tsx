import React from "react";
import {
  ArrowLeft,
  User as UserIcon,
  LogOut,
  Home,
  Menu,
  X,
  Grid3X3,
  LayoutList,
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
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import AuthModal from "@/components/AuthModal";

type ViewMode = "grid" | "list";

const Header = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
const [showAuthModal, setShowAuthModal] = useState(false);
const [authMode, setAuthMode] = useState<"signin" >("signin");
  const [loading, setLoading] = useState(true);
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
   const handleAuthSuccess = () => {
     // Handle successful authentication - you can add any additional logic here
     console.log("Authentication successful");
   };
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

  const navLinks = [
    { path: "/dashboard", label: "Dashboard" },
    { path: "/community", label: "Community" },
    { path: "/e-seminar", label: "E-Seminar" },
    { path: "/e-learning", label: "E-Learning" },
    { path: "/jobs", label: "Jobs" },
    { path: "/blog-portal", label: "Blogs" },
    // { path: "/calendar", label: "Calendar" },
  ];

  return (
    <>
      <header className="bg-black/30 backdrop-blur-md border-b border-white/20 sticky top-0 z-50 shadow-xl">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Left Section - Logo and Back Button */}
            <div className="flex items-center gap-2 md:gap-4">
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
            <div className="flex items-center gap-2 md:gap-4">
              {user ? (
                <>
                  {/* Desktop View - Full Navigation */}
                  <div className="hidden lg:flex items-center gap-4">
                    {/* View Mode Toggle */}
                    <div className="flex items-center bg-white/10 rounded-lg p-1">
                      <Button
                        variant={viewMode === "grid" ? "default" : "ghost"}
                        size="sm"
                        onClick={() => setViewMode("grid")}
                        className={`rounded-md ${
                          viewMode === "grid"
                            ? "bg-blue-600 text-white"
                            : "text-white hover:bg-white/20"
                        }`}
                      >
                        <Grid3X3 className="h-4 w-4" />
                      </Button>
                      <Button
                        variant={viewMode === "list" ? "default" : "ghost"}
                        size="sm"
                        onClick={() => setViewMode("list")}
                        className={`rounded-md ${
                          viewMode === "list"
                            ? "bg-blue-600 text-white"
                            : "text-white hover:bg-white/20"
                        }`}
                      >
                        <LayoutList className="h-4 w-4" />
                      </Button>
                    </div>

                    {/* Navigation Links */}
                    <div className="hidden xl:flex items-center gap-2">
                      {navLinks.map((link) => (
                        <Link
                          key={link.path}
                          to={link.path}
                          className="text-white/80 hover:text-white transition-colors text-sm font-medium px-3 py-2 rounded-md hover:bg-white/10"
                        >
                          {link.label}
                        </Link>
                      ))}
                    </div>

                    {/* User Dropdown */}
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="outline"
                          className="text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm"
                        >
                          <span className="truncate max-w-[120px]">
                            {user.email.split("@")[0]}
                          </span>
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

                  {/* Tablet View - Condensed Menu */}
                  <div className="hidden md:flex lg:hidden items-center gap-2">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="outline"
                          className="text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm"
                        >
                          <Menu className="h-4 w-4 mr-2" />
                          <span>Menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-56 bg-black/80 backdrop-blur-md border-white/20">
                        <DropdownMenuLabel className="text-white">
                          {user.email}
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator className="bg-white/20" />
                        {navLinks.map((link) => (
                          <DropdownMenuItem
                            key={link.path}
                            className="text-white hover:bg-white/10"
                            onClick={() => navigate(link.path)}
                          >
                            {link.label}
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  {/* Mobile View - Sidebar Menu */}
                  <div className="flex lg:hidden">
                    <Sheet>
                      <SheetTrigger asChild>
                        <Button
                          variant="outline"
                          size="icon"
                          className="text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm"
                        >
                          <Menu className="h-4 w-4" />
                        </Button>
                      </SheetTrigger>
                      <SheetContent
                        side="right"
                        className="bg-black/90 backdrop-blur-md border-l border-white/20 w-64"
                      >
                        <div className="flex flex-col h-full">
                          <div className="flex items-center justify-between mb-6">
                            <h3 className="text-lg font-semibold text-white">
                              Menu
                            </h3>
                            <SheetClose asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="text-white hover:bg-white/10"
                              >
                                <X className="h-5 w-5" />
                              </Button>
                            </SheetClose>
                          </div>

                          <div className="flex-1 overflow-y-auto space-y-4">
                            <div className="text-white text-sm bg-white/10 px-3 py-2 rounded-md">
                              {user.email}
                            </div>

                            {/* View Mode Toggle */}
                            <div className="flex justify-center bg-white/10 rounded-lg p-1">
                              <Button
                                variant={
                                  viewMode === "grid" ? "default" : "ghost"
                                }
                                size="sm"
                                onClick={() => setViewMode("grid")}
                                className={`${
                                  viewMode === "grid"
                                    ? "bg-blue-600 text-white"
                                    : "text-white hover:bg-white/20"
                                }`}
                              >
                                <Grid3X3 className="h-4 w-4" />
                              </Button>
                              <Button
                                variant={
                                  viewMode === "list" ? "default" : "ghost"
                                }
                                size="sm"
                                onClick={() => setViewMode("list")}
                                className={`${
                                  viewMode === "list"
                                    ? "bg-blue-600 text-white"
                                    : "text-white hover:bg-white/20"
                                }`}
                              >
                                <LayoutList className="h-4 w-4" />
                              </Button>
                            </div>

                            {/* Navigation Links */}
                            <div className="space-y-1">
                              {navLinks.map((link) => (
                                <Link
                                  key={link.path}
                                  to={link.path}
                                  className="block text-white/80 hover:text-white hover:bg-white/10 transition-colors text-sm font-medium px-3 py-2 rounded-md"
                                >
                                  {link.label}
                                </Link>
                              ))}
                            </div>
                          </div>

                          <div className="mt-auto pt-4 border-t border-white/20 space-y-2">
                            <Button
                              variant="outline"
                              className="w-full text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm"
                              onClick={() => navigate("/profile")}
                            >
                              <UserIcon className="h-4 w-4 mr-2" />
                              Profile
                            </Button>
                            <Button
                              variant="outline"
                              className="w-full text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm"
                              onClick={handleSignOut}
                            >
                              <LogOut className="h-4 w-4 mr-2" />
                              Sign Out
                            </Button>
                          </div>
                        </div>
                      </SheetContent>
                    </Sheet>
                  </div>
                </>
              ) : (
                <>
                  <Link to="/register" className="hidden sm:block">
                    <Button
                      variant="outline"
                      className="text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm"
                    >
                      Register
                    </Button>
                  </Link>

                  <>
                    <Button
                      className="bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl transition-all duration-200 p-2 md:px-4 md:py-2"
                      title="Sign In"
                      onClick={() => {
                        setShowAuthModal(true);
                        setAuthMode("signin");
                      }}
                    >
                      <UserIcon className="h-4 w-4 md:mr-2" />
                      <span className="hidden md:inline">Sign In</span>
                    </Button>
                  </>
                </>
              )}

              {/* Home Button - Always visible */}
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
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onSuccess={handleAuthSuccess}
      />
    </>
  );
};

export default Header;
