// import React from 'react'
// import {
//   Shield,
//   ArrowLeft,
//   User as UserIcon,
//   LogOut,
//   Home,
// } from "lucide-react";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { supabase } from "@/integrations/supabase/client";
// import logo from "@/image/thefuturemed_logo (1).jpg";
// import { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { Button } from "@/components/ui/button";

// const Header = () => {
//     const navigate = useNavigate();
//       const [user, setUser] = useState<any>(null);
//       const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    
//       useEffect(() => {
//         const fetchUser = async () => {
//           const {
//             data: { user },
//           } = await supabase.auth.getUser();
//           setUser(user);
//         };
//         fetchUser();
//       }, []);
    
//       const handleBackNavigation = () => navigate(-1);
    
//       const handleSignOut = async () => {
//         await supabase.auth.signOut();
//         navigate("/");
//       };
//   return (
//     <div>
//       <header className="bg-black/30 backdrop-blur-md border-b border-white/20 sticky top-0 z-50 shadow-xl">
//         <div className="container mx-auto px-4 py-3">
//           <div className="flex items-center justify-between">
//             {/* Left Section - Logo and Back Button */}
//             <div className="flex items-center space-x-2 md:space-x-4">
//               <Button
//                 variant="outline"
//                 onClick={handleBackNavigation}
//                 className="text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm p-2 md:px-4 md:py-2"
//                 title="Go back"
//               >
//                 <ArrowLeft className="h-4 w-4 md:mr-2" />
//                 <span className="hidden md:inline">Back</span>
//               </Button>

//               <Link to="/" className="flex items-center">
//                 <img
//                   src={logo}
//                   alt="MedPortal Logo"
//                   className="h-10 w-auto max-w-[200px]"
//                 />
//               </Link>
//             </div>

//             {/* Right Section - Navigation Items */}
//             <div className="flex items-center space-x-2 md:space-x-4">
//               {user ? (
//                 <>
//                   {/* Desktop View - Full User Info */}
//                   <div className="hidden lg:flex items-center space-x-4">
//                     <span className="text-white text-sm bg-white/10 px-3 py-1 rounded-full">
//                       Welcome, {user.email}
//                     </span>
//                     <Link
//                       to="/dashboard"
//                       className="text-gray-600 hover:text-blue-600 transition-colors font-medium px-3 py-2 rounded-md hover:bg-blue-50"
//                     >
//                       Dashboard
//                       {/* Products */}
//                     </Link>
//                     <Link
//                       to="/community"
//                       className="text-gray-600 hover:text-blue-600 transition-colors font-medium px-3 py-2 rounded-md hover:bg-blue-50"
//                     >
//                       Community
//                     </Link>
//                     <Link
//                       to="/e-seminar"
//                       className="text-gray-600 hover:text-blue-600 transition-colors font-medium px-3 py-2 rounded-md hover:bg-blue-50"
//                     >
//                       E-Seminar
//                     </Link>
//                     <Link
//                       to="/e-learning"
//                       className="text-gray-600 hover:text-blue-600 transition-colors font-medium px-3 py-2 rounded-md hover:bg-blue-50"
//                     >
//                       E-Learning
//                     </Link>
//                     <Link
//                       to="/jobs"
//                       className="text-gray-600 hover:text-blue-600 transition-colors font-medium px-3 py-2 rounded-md hover:bg-blue-50"
//                     >
//                       Jobs
//                     </Link>
//                     <Link
//                       to="/calendar"
//                       className="text-gray-600 hover:text-blue-600 transition-colors font-medium px-3 py-2 rounded-md hover:bg-blue-50"
//                     >
//                       Calendar
//                     </Link>
//                     <Button
//                       variant="outline"
//                       className="text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm p-2 md:px-4 md:py-2"
//                       onClick={() => navigate("/profile")}
//                       title="Profile"
//                     >
//                       <UserIcon className="h-4 w-4 md:mr-2" />
//                       <span className="hidden md:inline">Profile</span>
//                     </Button>
//                     <Button
//                       variant="outline"
//                       className="text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm p-2 md:px-4 md:py-2"
//                       onClick={handleSignOut}
//                       title="Sign Out"
//                     >
//                       <LogOut className="h-4 w-4 md:mr-2" />
//                       <span className="hidden md:inline">Sign Out</span>
//                     </Button>
//                   </div>

//                   {/* Mobile/Tablet View - User Menu Dropdown */}
//                   <div className="lg:hidden">
//                     <DropdownMenu>
//                       <DropdownMenuTrigger asChild>
//                         <Button
//                           variant="outline"
//                           size="icon"
//                           className="text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm"
//                         >
//                           <UserIcon className="h-4 w-4" />
//                         </Button>
//                       </DropdownMenuTrigger>
//                       <DropdownMenuContent className="w-56 bg-black/80 backdrop-blur-md border-white/20">
//                         <DropdownMenuLabel className="text-white">
//                           {user.email}
//                         </DropdownMenuLabel>
//                         <DropdownMenuSeparator className="bg-white/20" />
//                           <Link
//                                         to="/dashboard"
//                                         className="text-gray-600 hover:text-blue-600 transition-colors font-medium px-3 py-2 rounded-md hover:bg-blue-50"
//                                       >
//                                         Dashboard
//                                         {/* Products */}
//                                       </Link>
//                                       <Link
//                                         to="/community"
//                                         className="text-gray-600 hover:text-blue-600 transition-colors font-medium px-3 py-2 rounded-md hover:bg-blue-50"
//                                       >
//                                         Community
//                                       </Link>
//                                       <Link
//                                         to="/e-seminar"
//                                         className="text-gray-600 hover:text-blue-600 transition-colors font-medium px-3 py-2 rounded-md hover:bg-blue-50"
//                                       >
//                                         E-Seminar
//                                       </Link>
//                                       <Link
//                                         to="/e-learning"
//                                         className="text-gray-600 hover:text-blue-600 transition-colors font-medium px-3 py-2 rounded-md hover:bg-blue-50"
//                                       >
//                                         E-Learning
//                                       </Link>
//                                       <Link
//                                         to="/jobs"
//                                         className="text-gray-600 hover:text-blue-600 transition-colors font-medium px-3 py-2 rounded-md hover:bg-blue-50"
//                                       >
//                                         Jobs
//                                       </Link>
//                                       <Link
//                                         to="/calendar"
//                                         className="text-gray-600 hover:text-blue-600 transition-colors font-medium px-3 py-2 rounded-md hover:bg-blue-50"
//                                       >
//                                         Calendar
//                                       </Link>
//                         <DropdownMenuItem
//                           className="text-white hover:bg-white/10"
//                           onClick={() => navigate("/profile")}
//                         >
//                           <UserIcon className="mr-2 h-4 w-4" />
//                           <span>Profile</span>
//                         </DropdownMenuItem>
//                         <DropdownMenuItem
//                           className="text-white hover:bg-white/10"
//                           onClick={handleSignOut}
//                         >
//                           <LogOut className="mr-2 h-4 w-4" />
//                           <span>Sign Out</span>
//                         </DropdownMenuItem>
//                       </DropdownMenuContent>
//                     </DropdownMenu>
//                   </div>
//                 </>
//               ) : (
//                 <>
//                   <Link to="/register">
//                     <Button
//                       variant="outline"
//                       className="hidden md:flex text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm"
//                     >
//                       Register
//                     </Button>
//                   </Link>

//                   <Link to="/">
//                     <Button
//                       className="bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl transition-all duration-200 p-2 md:px-4 md:py-2"
//                       title="Sign In"
//                     >
//                       <UserIcon className="h-4 w-4 md:mr-2" />
//                       <span className="hidden md:inline">Sign In</span>
//                     </Button>
//                   </Link>
//                 </>
//               )}

//               {/* Home Button */}
//               <Button
//                 variant="outline"
//                 onClick={() => navigate("/")}
//                 className="text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm p-2 md:px-4 md:py-2"
//                 title="Go to home page"
//               >
//                 <Home className="h-4 w-4 md:mr-2" />
//                 <span className="hidden md:inline">Home</span>
//               </Button>
//             </div>
//           </div>
//         </div>
//       </header>
//     </div>
//   );
// }

// export default Header


import React from "react";
import {
  Shield,
  ArrowLeft,
  User as UserIcon,
  LogOut,
  Home,
  Menu,
  X,
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

const Header = () => {
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

  const navLinks = [
    { path: "/dashboard", label: "Dashboard" },
    { path: "/community", label: "Community" },
    { path: "/e-seminar", label: "E-Seminar" },
    { path: "/e-learning", label: "E-Learning" },
    { path: "/jobs", label: "Jobs" },
    { path: "/calendar", label: "Calendar" },
  ];

  return (
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
                <div className="hidden lg:flex items-center space-x-2">
                  {/* <span className="text-white text-sm bg-white/10 px-3 py-1 rounded-full hidden xl:block">
                    Welcome, {user.email}
                  </span> */}
                  <div className="dropdown">
                    <button
                      className="btn btn-secondary dropdown-toggle"
                      type="button"
                      id="dropdownMenuButton1"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Welcome
                    </button>
                    <ul
                      className="dropdown-menu"
                      aria-labelledby="dropdownMenuButton1"
                    >
                      <li>
                        <span className="dropdown-item-text text-muted">
                          {user?.email}
                        </span>
                      </li>
                    </ul>
                  </div>
                  {navLinks.map((link) => (
                    <Link
                      key={link.path}
                      to={link.path}
                      className="text-white/80 hover:text-white transition-colors text-sm font-medium px-3 py-2 rounded-md hover:bg-white/10"
                    >
                      {link.label}
                    </Link>
                  ))}
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

                {/* Tablet View - Condensed Menu */}
                <div className="hidden md:flex lg:hidden">
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
                        className="text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm md:hidden"
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

                        <div className="flex-1 overflow-y-auto">
                          <span className="text-white text-sm bg-white/10 px-3 py-1 rounded-full ">
                    Welcome, {user.email}
                  </span>
                          <div className="space-y-1">
                            {navLinks.map((link) => (
                              <Link
                                key={link.path}
                                to={link.path}
                                className="block text-white/80 hover:text-white hover:bg-white/10 transition-colors text-sm font-medium px-3 py-2 rounded-md"
                                onClick={() => setMobileMenuOpen(false)}
                              >
                                {link.label}
                              </Link>
                            ))}
                          </div>
                        </div>

                        <div className="mt-auto pt-4 border-t border-white/20">
                          <Button
                            variant="outline"
                            className="w-full text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm mb-2"
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

                <Link to="/login">
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
  );
};

export default Header;