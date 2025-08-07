// // import React, { useEffect, useState } from "react";
// // import {
// //   Card,
// //   CardContent,
// //   CardDescription,
// //   CardHeader,
// //   CardTitle,
// // } from "@/components/ui/card";
// // import {
// //   Search,
// //   MapPin,
// //   Clock,
// //   DollarSign,
// //   Briefcase,
// //   Building,
// //   ArrowLeft,
// //   Shield,
// //   UserPlus,
// //   Home,
// //   User,
// //   X,
// //   Lock,
// //   Laptop,
// //   Users,
// //   GraduationCap,
// // } from "lucide-react";
// // import { supabase } from "@/integrations/supabase/client";
// // import { useNavigate, Link } from "react-router-dom";
// // import { useToast } from "@/hooks/use-toast";
// // import { Input } from "@/components/ui/input";

// // import { Button } from "@/components/ui/button";

// // const AboutPage = () => {
// //   const [user, setUser] = useState(null);

// //   const handleBackNavigation = () => {
// //     navigate(-1);
// //   };

// //   const handleSignOut = async () => {
// //     const { error } = await supabase.auth.signOut();
// //     if (!error) {
// //       setUser(null);
// //       toast({ title: "Signed Out", description: "You have been signed out." });
// //     }
// //   };

// //   useEffect(() => {
// //     const checkUser = async () => {
// //       const {
// //         data: { session },
// //       } = await supabase.auth.getSession();
// //       setUser(session?.user || null);
// //     };
// //     checkUser();
// //   }, []);
// //   return (
// //     <div className="space-y-6">
// //       <header className="bg-black border-b border-white/20 sticky top-0 z-50 shadow-xl">
// //         <div className="container mx-auto px-4 py-4 flex items-center justify-between">
// //           <div className="flex items-center space-x-4">
// //             <Button
// //               variant="outline"
// //               onClick={handleBackNavigation}
// //               className="text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm"
// //             >
// //               <ArrowLeft className="mr-2 h-4 w-4" /> Back
// //             </Button>
// //             <Link to="/" className="flex items-center space-x-2">
// //               <Shield className="h-8 w-8 text-blue-400" />
// //               <h1 className="text-2xl font-bold text-white">MedPortal</h1>
// //             </Link>
// //           </div>
// //           <div className="flex items-center space-x-4">
// //             {user ? (
// //               <>
// //                 <span className="text-white text-sm bg-white/10 px-3 py-1 rounded-full">
// //                   Welcome, {user.email}
// //                 </span>
// //                 <Button
// //                   variant="outline"
// //                   onClick={() => navigate("/profile")}
// //                   className="text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm"
// //                 >
// //                   <User className="mr-2 h-4 w-4" /> Profile
// //                 </Button>
// //                 <Button
// //                   variant="outline"
// //                   onClick={handleSignOut}
// //                   className="text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm"
// //                 >
// //                   Sign Out
// //                 </Button>
// //               </>
// //             ) : (
// //               <>
// //                 <Link to="/register">
// //                   <Button
// //                     variant="outline"
// //                     className="text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm"
// //                   >
// //                     Register
// //                   </Button>
// //                 </Link>
// //                 <Link to="/">
// //                   <Button className="bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl transition-all duration-200">
// //                     <UserPlus className="mr-2 h-4 w-4" /> Sign In
// //                   </Button>
// //                 </Link>
// //               </>
// //             )}
// //             <Button
// //               variant="outline"
// //               onClick={() => navigate("/")}
// //               className="text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm"
// //             >
// //               <Home className="mr-2 h-4 w-4" /> Home
// //             </Button>
// //           </div>
// //         </div>
// //       </header>

// //       <div className="min-h-screen p-8 bg-gray-50">
// //         <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-8">
// //           {/* Left Column */}
// //           <div className="flex-1 bg-white p-6 shadow rounded">
// //             <h2 className="text-2xl font-bold mb-4">About PMHS</h2>
// //             <p className="text-gray-700">
// //               Prestige Medical Health Sciences (PMHS), established in 2016, is a
// //               premier institution in Bangalore dedicated to providing top-notch
// //               education in allied health sciences. Affiliated with Rajiv Gandhi
// //               University of Health Sciences, PMHS offers a range of
// //               undergraduate programs, including Bachelor of Science degrees in
// //               Nursing, Medical Imaging Technology, Medical Laboratory
// //               Technology, Optometry, and Physiotherapy.
// //             </p>
// //             <p className="text-gray-700 mt-4">
// //               Further, PMHS has also ventured into its first diagnostic center
// //               in Bangalore city. With a legacy spanning three generations in the
// //               education sector, PMHS now embraces a forward-thinking
// //               ideology—revolutionizing the medical industry into the digital era
// //               through <strong>THEFUTUREMED.com</strong>.
// //             </p>
// //           </div>

// //           {/* Right Column */}
// //           <div className="flex-1 bg-white p-6 shadow rounded">
// //             <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
// //             <img
// //               src="/image.jpeg"
// //               alt="Our mission"
// //               className="w-full h-48 object-cover rounded mb-4"
// //             />
// //             <p className="text-gray-700">
// //               Our mission is to empower users by delivering high-quality,
// //               accessible information...
// //             </p>
// //           </div>
// //         </div>

// //         {/* New Section Below the Two Columns */}
// //         <div className="max-w-6xl mx-auto mt-12 bg-white p-6 shadow rounded">
// //           <h2 className="text-3xl font-bold mb-4">Our Mission and Approach</h2>
// //           <p className="text-gray-700 mb-4">
// //             Empower Your Medical Career with <strong>THEFUTUREMED.com</strong> —
// //             The Community of Medics created by a Medic, for the Medics,
// //             Globally. The ultimate platform for medical professionals to learn,
// //             connect, and earn digitally.
// //           </p>

// //           <h3 className="text-xl font-semibold mt-6 mb-2">
// //             Why Choose THEFUTUREMED.com?
// //           </h3>
// //           <p className="text-gray-700 mb-4">
// //             A one-stop platform designed exclusively for medical professionals
// //             including Doctors, Dentists, Nurses, Physiotherapists, Allied Health
// //             Workers, Ayurveda Practitioners, Homeopaths, Unani Practitioners,
// //             Dieticians, and more.
// //           </p>

// //           <h3 className="text-lg font-semibold mt-4">
// //             Our Features: Learn, Connect, and Earn
// //           </h3>

// //           <ul className="list-disc list-inside text-gray-700 space-y-4 mt-2">
// //             <li>
// //               <strong>Host or Attend Medical Seminars and Conferences</strong>
// //               <br />
// //               Share expertise or gain insights from healthcare leaders:
// //               <ul className="list-disc ml-6">
// //                 <li>Host online medical conferences</li>
// //                 <li>Attend interactive seminars on trending topics</li>
// //                 <li>Earn by sharing knowledge globally</li>
// //               </ul>
// //             </li>

// //             <li>
// //               <strong>E-Learning Modules & Certifications</strong>
// //               <br />
// //               Upskill or monetize your expertise:
// //               <ul className="list-disc ml-6">
// //                 <li>Expert-led modules for skill development</li>
// //                 <li>Host and sell your own courses</li>
// //                 <li>Accredited programs for growth</li>
// //               </ul>
// //             </li>

// //             <li>
// //               <strong>Job Portal for Healthcare Professionals</strong>
// //               <br />
// //               Post your resume or discover jobs from hospitals and clinics for
// //               full-time or part-time roles.
// //             </li>
// //           </ul>

// //           <h3 className="text-lg font-semibold mt-6">
// //             Why THEFUTUREMED.com Stands Out
// //           </h3>
// //           <ul className="list-disc list-inside text-gray-700 space-y-2 mt-2">
// //             <li>Global Reach: Connect with professionals worldwide</li>
// //             <li>Community-Driven: Collaborate within a thriving network</li>
// //             <li>Monetization Opportunities: Seminars, e-stores, and more</li>
// //           </ul>

// //           <h3 className="text-lg font-semibold mt-6">
// //             Explore Our Key Offerings
// //           </h3>
// //           <ul className="list-disc list-inside text-gray-700 space-y-2 mt-2">
// //             <li>
// //               <strong>Community for Medics:</strong> Collaborate on research,
// //               share insights, and grow your network.
// //             </li>
// //             <li>
// //               <strong>Publish Research & Journals:</strong> Upload and share
// //               your medical publications.
// //             </li>
// //             <li>
// //               <strong>E-Store for Medical Products:</strong> Sell books,
// //               instruments, and more via your landing page.
// //             </li>
// //           </ul>

// //           <h3 className="text-lg font-semibold mt-6">
// //             How THEFUTUREMED.com Benefits You
// //           </h3>
// //           <ul className="list-disc list-inside text-gray-700 space-y-2 mt-2">
// //             <li>Boost Visibility through a global medical network</li>
// //             <li>Earn More by teaching, hosting, or selling</li>
// //             <li>Expand Knowledge with certified courses and events</li>
// //           </ul>

// //           <p className="text-blue-700 font-semibold mt-6">
// //             👉 Join <strong>THEFUTUREMED.com</strong> Today!
// //           </p>
// //         </div>

// //         {/* Section: Commitment to Excellence */}
// //         <div className="max-w-6xl mx-auto mt-12 bg-white p-6 shadow rounded">
// //           <h2 className="text-3xl font-bold mb-4">
// //             Commitment to Excellence and Student Success
// //           </h2>
// //           <p className="text-gray-700">
// //             At PMHS, we pride ourselves on our experienced faculty and
// //             state-of-the-art facilities, ensuring that our students receive a
// //             comprehensive education that meets global standards. Our commitment
// //             to excellence is reflected in our{" "}
// //             <strong>100% placement record</strong>, with many graduates securing
// //             positions within our own network of specialized healthcare
// //             facilities.
// //           </p>
// //         </div>

// //         {/* Section: Highlights or Features */}
// //         <div className="max-w-6xl mx-auto mt-12">
// //           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
// //             {/* Card 1 */}
// //             <div className="bg-white shadow rounded p-6 text-center">
// //               <Building className="mx-auto mb-3 h-10 w-10 text-blue-500" />
// //               <h3 className="text-xl font-semibold mb-2">Organisations</h3>

// //               <ol className="list-decimal list-inside text-left text-gray-600 space-y-1">
// //                 <li>Para medical AHS college</li>
// //                 <li>Physiotherapy college</li>
// //                 <li>Nursing College</li>
// //                 <li>Health care services and diagnostics</li>
// //                 <li>Physio rehab centers</li>
// //               </ol>
// //             </div>

// //             {/* Card 2 */}
// //             <div className="bg-white shadow rounded p-6 text-center">
// //               <Laptop className="mx-auto mb-2 h-8 w-8 text-blue-500" />
// //               <h3 className="text-xl font-semibold mb-2">
// //                 Our Digital Products
// //               </h3>

// //               <div className="text-left text-gray-600 space-y-4">
// //                 <ol className="list-decimal list-inside">
// //                   <li>THEFUTUREMED – A safe haven for Health care heroes</li>
// //                   <li>
// //                     PMHS Smart Health – Platform with Tele Consultation, Tele
// //                     Radiology, EMR software, Billing software
// //                   </li>
// //                 </ol>
// //               </div>
// //             </div>

// //             {/* Card 3 */}
// //             <div className="bg-white shadow rounded p-6 text-center">
// //               <Users className="mx-auto mb-2 h-8 w-8 text-blue-500" />
// //               <h3 className="text-xl font-semibold mb-2">Groups To Discuss</h3>

// //               <ul className="list-decimal list-inside text-left text-gray-600 space-y-1">
// //                 <li>In house Tech company</li>
// //               </ul>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default AboutPage;

// import React, { useEffect, useState } from "react";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import {
//   Search,
//   MapPin,
//   Clock,
//   DollarSign,
//   Briefcase,
//   Building,
//   ArrowLeft,
//   Shield,
//   UserPlus,
//   Home,
//   User,
//   X,
//   Lock,
//   Laptop,
//   Users,
//   GraduationCap,
//   Menu,
//   LogOut,
// } from "lucide-react";
// import { supabase } from "@/integrations/supabase/client";
// import { useNavigate, Link } from "react-router-dom";
// import { useToast } from "@/hooks/use-toast";
// import { Input } from "@/components/ui/input";

// import { Button } from "@/components/ui/button";
// import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

// const AboutPage = () => {
//   const [user, setUser] = useState(null);
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const navigate = useNavigate();
//   const { toast } = useToast();

//   const handleBackNavigation = () => {
//     navigate(-1);
//   };

//   const handleSignOut = async () => {
//     const { error } = await supabase.auth.signOut();
//     if (!error) {
//       setUser(null);
//       toast({ title: "Signed Out", description: "You have been signed out." });
//       navigate("/");
//     }
//   };

//   useEffect(() => {
//     const checkUser = async () => {
//       const {
//         data: { session },
//       } = await supabase.auth.getSession();
//       setUser(session?.user || null);
//     };
//     checkUser();
//   }, []);

//   return (
//     <div className="space-y-6">
//       {/* Mobile Navigation Drawer */}
//       <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
//         <SheetContent side="left" className="bg-black text-white w-64">
//           <div className="flex flex-col h-full pt-10">
//             <div className="flex items-center justify-between mb-8 px-4">
//               <Link
//                 to="/"
//                 className="flex items-center space-x-2"
//                 onClick={() => setIsMobileMenuOpen(false)}
//               >
//                 <Shield className="h-8 w-8 text-blue-400" />
//                 <h1 className="text-xl font-bold text-white">MedPortal</h1>
//               </Link>
//               <X
//                 className="h-6 w-6 text-white cursor-pointer"
//                 onClick={() => setIsMobileMenuOpen(false)}
//               />
//             </div>

//             <div className="flex flex-col space-y-4 px-4">
//               {user ? (
//                 <>
//                   <div className="flex items-center space-x-3 p-2 bg-white/10 rounded-lg">
//                     <User className="h-5 w-5 text-blue-400" />
//                     <span className="text-white text-sm truncate">
//                       {user.email.split("@")[0]}
//                     </span>
//                   </div>

//                   <Button
//                     variant="outline"
//                     onClick={() => {
//                       navigate("/profile");
//                       setIsMobileMenuOpen(false);
//                     }}
//                     className="text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm justify-start"
//                   >
//                     <User className="mr-3 h-4 w-4" /> Profile
//                   </Button>

//                   <Button
//                     variant="outline"
//                     onClick={() => {
//                       handleSignOut();
//                       setIsMobileMenuOpen(false);
//                     }}
//                     className="text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm justify-start"
//                   >
//                     <LogOut className="mr-3 h-4 w-4" /> Sign Out
//                   </Button>
//                 </>
//               ) : (
//                 <>
//                   <Link
//                     to="/register"
//                     onClick={() => setIsMobileMenuOpen(false)}
//                   >
//                     <Button
//                       variant="outline"
//                       className="w-full text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm justify-start"
//                     >
//                       Register
//                     </Button>
//                   </Link>
//                   <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>
//                     <Button className="w-full bg-blue-600 hover:bg-blue-700 justify-start">
//                       <UserPlus className="mr-3 h-4 w-4" /> Sign In
//                     </Button>
//                   </Link>
//                 </>
//               )}

//               <Button
//                 variant="outline"
//                 onClick={() => {
//                   navigate("/");
//                   setIsMobileMenuOpen(false);
//                 }}
//                 className="text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm justify-start"
//               >
//                 <Home className="mr-3 h-4 w-4" /> Home
//               </Button>

//               <Button
//                 variant="outline"
//                 onClick={() => {
//                   handleBackNavigation();
//                   setIsMobileMenuOpen(false);
//                 }}
//                 className="text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm justify-start"
//               >
//                 <ArrowLeft className="mr-3 h-4 w-4" /> Back
//               </Button>
//             </div>
//           </div>
//         </SheetContent>
//       </Sheet>

//       {/* Header */}
//       <header className="bg-black border-b border-white/20 sticky top-0 z-50 shadow-xl">
//         <div className="container mx-auto px-4 py-3 flex items-center justify-between">
//           <div className="flex items-center space-x-3">
//             <Button
//               variant="outline"
//               onClick={handleBackNavigation}
//               className="hidden md:flex text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm"
//             >
//               <ArrowLeft className="mr-2 h-4 w-4" /> Back
//             </Button>

//             <Link to="/" className="flex items-center space-x-2">
//               <Shield className="h-6 w-6 md:h-8 md:w-8 text-blue-400" />
//               <h1 className="text-xl md:text-2xl font-bold text-white">
//                 MedPortal
//               </h1>
//             </Link>
//           </div>

//           {/* Mobile Menu Button */}
//           <div className="md:hidden">
//             <SheetTrigger asChild>
//               <Button
//                 variant="outline"
//                 className="text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm"
//                 onClick={() => setIsMobileMenuOpen(true)}
//               >
//                 <Menu className="h-5 w-5" />
//               </Button>
//             </SheetTrigger>
//           </div>

//           {/* Desktop Navigation */}
//           <div className="hidden md:flex items-center space-x-3">
//             {user ? (
//               <>
//                 <span className="text-white text-xs md:text-sm bg-white/10 px-2 py-1 rounded-full truncate max-w-[120px] md:max-w-none">
//                   {user.email.split("@")[0]}
//                 </span>
//                 <Button
//                   variant="outline"
//                   onClick={() => navigate("/profile")}
//                   className="text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm"
//                 >
//                   <User className="mr-2 h-4 w-4" /> Profile
//                 </Button>
//                 <Button
//                   variant="outline"
//                   onClick={handleSignOut}
//                   className="text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm"
//                 >
//                   <LogOut className="mr-2 h-4 w-4" /> Sign Out
//                 </Button>
//               </>
//             ) : (
//               <>
//                 <Link to="/register">
//                   <Button
//                     variant="outline"
//                     className="text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm"
//                   >
//                     Register
//                   </Button>
//                 </Link>
//                 <Link to="/">
//                   <Button className="bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl transition-all duration-200">
//                     <UserPlus className="mr-2 h-4 w-4" /> Sign In
//                   </Button>
//                 </Link>
//               </>
//             )}
//             <Button
//               variant="outline"
//               onClick={() => navigate("/")}
//               className="text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm"
//             >
//               <Home className="mr-2 h-4 w-4" /> Home
//             </Button>
//           </div>
//         </div>
//       </header>

//       <div className="min-h-screen p-4 md:p-8 bg-gray-50">
//         <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-6">
//           {/* Left Column */}
//           <div className="flex-1 bg-white p-5 md:p-6 shadow rounded-lg">
//             <h2 className="text-xl md:text-2xl font-bold mb-4">About PMHS</h2>
//             <p className="text-gray-700 text-sm md:text-base">
//               Prestige Medical Health Sciences (PMHS), established in 2016, is a
//               premier institution in Bangalore dedicated to providing top-notch
//               education in allied health sciences. Affiliated with Rajiv Gandhi
//               University of Health Sciences, PMHS offers a range of
//               undergraduate programs, including Bachelor of Science degrees in
//               Nursing, Medical Imaging Technology, Medical Laboratory
//               Technology, Optometry, and Physiotherapy.
//             </p>
//             <p className="text-gray-700 mt-4 text-sm md:text-base">
//               Further, PMHS has also ventured into its first diagnostic center
//               in Bangalore city. With a legacy spanning three generations in the
//               education sector, PMHS now embraces a forward-thinking
//               ideology—revolutionizing the medical industry into the digital era
//               through <strong>THEFUTUREMED.com</strong>.
//             </p>
//           </div>

//           {/* Right Column */}
//           <div className="flex-1 bg-white p-5 md:p-6 shadow rounded-lg">
//             <h2 className="text-xl md:text-2xl font-bold mb-4">Our Mission</h2>
//             <img
//               src="/image.jpeg"
//               alt="Our mission"
//               className="w-full h-40 md:h-48 object-cover rounded-lg mb-4"
//             />
//             <p className="text-gray-700 text-sm md:text-base">
//               Our mission is to empower users by delivering high-quality,
//               accessible information...
//             </p>
//           </div>
//         </div>

//         {/* New Section Below the Two Columns */}
//         <div className="max-w-6xl mx-auto mt-8 bg-white p-5 md:p-6 shadow rounded-lg">
//           <h2 className="text-xl md:text-3xl font-bold mb-4">
//             Our Mission and Approach
//           </h2>
//           <p className="text-gray-700 mb-4 text-sm md:text-base">
//             Empower Your Medical Career with <strong>THEFUTUREMED.com</strong> —
//             The Community of Medics created by a Medic, for the Medics,
//             Globally. The ultimate platform for medical professionals to learn,
//             connect, and earn digitally.
//           </p>

//           <h3 className="text-lg md:text-xl font-semibold mt-5 mb-2">
//             Why Choose THEFUTUREMED.com?
//           </h3>
//           <p className="text-gray-700 mb-4 text-sm md:text-base">
//             A one-stop platform designed exclusively for medical professionals
//             including Doctors, Dentists, Nurses, Physiotherapists, Allied Health
//             Workers, Ayurveda Practitioners, Homeopaths, Unani Practitioners,
//             Dieticians, and more.
//           </p>

//           <h3 className="text-base md:text-lg font-semibold mt-4">
//             Our Features: Learn, Connect, and Earn
//           </h3>

//           <ul className="list-disc list-inside text-gray-700 space-y-3 mt-2 text-sm md:text-base">
//             <li>
//               <strong>Host or Attend Medical Seminars and Conferences</strong>
//               <br />
//               Share expertise or gain insights from healthcare leaders:
//               <ul className="list-disc ml-6 mt-1">
//                 <li>Host online medical conferences</li>
//                 <li>Attend interactive seminars on trending topics</li>
//                 <li>Earn by sharing knowledge globally</li>
//               </ul>
//             </li>

//             <li>
//               <strong>E-Learning Modules & Certifications</strong>
//               <br />
//               Upskill or monetize your expertise:
//               <ul className="list-disc ml-6 mt-1">
//                 <li>Expert-led modules for skill development</li>
//                 <li>Host and sell your own courses</li>
//                 <li>Accredited programs for growth</li>
//               </ul>
//             </li>

//             <li>
//               <strong>Job Portal for Healthcare Professionals</strong>
//               <br />
//               Post your resume or discover jobs from hospitals and clinics for
//               full-time or part-time roles.
//             </li>
//           </ul>

//           <h3 className="text-base md:text-lg font-semibold mt-5">
//             Why THEFUTUREMED.com Stands Out
//           </h3>
//           <ul className="list-disc list-inside text-gray-700 space-y-1 mt-2 text-sm md:text-base">
//             <li>Global Reach: Connect with professionals worldwide</li>
//             <li>Community-Driven: Collaborate within a thriving network</li>
//             <li>Monetization Opportunities: Seminars, e-stores, and more</li>
//           </ul>

//           <h3 className="text-base md:text-lg font-semibold mt-5">
//             Explore Our Key Offerings
//           </h3>
//           <ul className="list-disc list-inside text-gray-700 space-y-1 mt-2 text-sm md:text-base">
//             <li>
//               <strong>Community for Medics:</strong> Collaborate on research,
//               share insights, and grow your network.
//             </li>
//             <li>
//               <strong>Publish Research & Journals:</strong> Upload and share
//               your medical publications.
//             </li>
//             <li>
//               <strong>E-Store for Medical Products:</strong> Sell books,
//               instruments, and more via your landing page.
//             </li>
//           </ul>

//           <h3 className="text-base md:text-lg font-semibold mt-5">
//             How THEFUTUREMED.com Benefits You
//           </h3>
//           <ul className="list-disc list-inside text-gray-700 space-y-1 mt-2 text-sm md:text-base">
//             <li>Boost Visibility through a global medical network</li>
//             <li>Earn More by teaching, hosting, or selling</li>
//             <li>Expand Knowledge with certified courses and events</li>
//           </ul>

//           <p className="text-blue-700 font-semibold mt-5 text-sm md:text-base">
//             👉 Join <strong>THEFUTUREMED.com</strong> Today!
//           </p>
//         </div>

//         {/* Section: Commitment to Excellence */}
//         <div className="max-w-6xl mx-auto mt-8 bg-white p-5 md:p-6 shadow rounded-lg">
//           <h2 className="text-xl md:text-3xl font-bold mb-4">
//             Commitment to Excellence and Student Success
//           </h2>
//           <p className="text-gray-700 text-sm md:text-base">
//             At PMHS, we pride ourselves on our experienced faculty and
//             state-of-the-art facilities, ensuring that our students receive a
//             comprehensive education that meets global standards. Our commitment
//             to excellence is reflected in our{" "}
//             <strong>100% placement record</strong>, with many graduates securing
//             positions within our own network of specialized healthcare
//             facilities.
//           </p>
//         </div>

//         {/* Section: Highlights or Features */}
//         <div className="max-w-6xl mx-auto mt-8">
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
//             {/* Card 1 */}
//             <div className="bg-white shadow rounded-lg p-5 text-center">
//               <Building className="mx-auto mb-3 h-8 w-8 md:h-10 md:w-10 text-blue-500" />
//               <h3 className="text-lg md:text-xl font-semibold mb-3">
//                 Organisations
//               </h3>
//               <ol className="list-decimal list-inside text-left text-gray-600 space-y-1 text-sm md:text-base">
//                 <li>Para medical AHS college</li>
//                 <li>Physiotherapy college</li>
//                 <li>Nursing College</li>
//                 <li>Health care services and diagnostics</li>
//                 <li>Physio rehab centers</li>
//               </ol>
//             </div>

//             {/* Card 2 */}
//             <div className="bg-white shadow rounded-lg p-5 text-center">
//               <Laptop className="mx-auto mb-3 h-8 w-8 md:h-10 md:w-10 text-blue-500" />
//               <h3 className="text-lg md:text-xl font-semibold mb-3">
//                 Our Digital Products
//               </h3>
//               <div className="text-left text-gray-600 space-y-2 text-sm md:text-base">
//                 <ol className="list-decimal list-inside">
//                   <li>THEFUTUREMED – A safe haven for Health care heroes</li>
//                   <li className="mt-1">
//                     PMHS Smart Health – Platform with Tele Consultation, Tele
//                     Radiology, EMR software, Billing software
//                   </li>
//                 </ol>
//               </div>
//             </div>

//             {/* Card 3 */}
//             <div className="bg-white shadow rounded-lg p-5 text-center">
//               <Users className="mx-auto mb-3 h-8 w-8 md:h-10 md:w-10 text-blue-500" />
//               <h3 className="text-lg md:text-xl font-semibold mb-3">
//                 Groups To Discuss
//               </h3>
//               <ul className="list-decimal list-inside text-left text-gray-600 space-y-1 text-sm md:text-base">
//                 <li>In house Tech company</li>
//               </ul>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AboutPage;
import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Search,
  MapPin,
  Clock,
  DollarSign,
  Briefcase,
  Building,
  ArrowLeft,
  Shield,
  UserPlus,
  Home,
  User,
  X,
  Lock,
  Laptop,
  Users,
  GraduationCap,
  Menu,
  LogOut,
  UserIcon,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate, Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import logo from "@/image/thefuturemed_logo (1).jpg";
import Footer from "@/footer/Footer";
import Header from "@/footer/Header";

const AboutPage = () => {
  const [user, setUser] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleBackNavigation = () => {
    navigate(-1);
  };

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      setUser(null);
      toast({ title: "Signed Out", description: "You have been signed out." });
      navigate("/");
    }
  };

  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setUser(session?.user || null);
    };
    checkUser();
  }, []);

  return (
    <div className="space-y-6">
      {/* Header with Sheet component wrapping mobile menu */}
      <Header />

      {/* Page content remains the same */}
      <div className="min-h-screen p-4 md:p-8 bg-gray-50">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-6">
          {/* Left Column */}
          <div className="flex-1 bg-white p-5 md:p-6 shadow rounded-lg">
            <h2 className="text-xl md:text-2xl font-bold mb-4">About PMHS</h2>
            <p className="text-gray-700 text-sm md:text-base">
              Prestige Medical Health Sciences (PMHS), established in 2016, is a
              premier institution in Bangalore dedicated to providing top-notch
              education in allied health sciences. Affiliated with Rajiv Gandhi
              University of Health Sciences, PMHS offers a range of
              undergraduate programs, including Bachelor of Science degrees in
              Nursing, Medical Imaging Technology, Medical Laboratory
              Technology, Optometry, and Physiotherapy.
            </p>
            <p className="text-gray-700 mt-4 text-sm md:text-base">
              Further, PMHS has also ventured into its first diagnostic center
              in Bangalore city. With a legacy spanning three generations in the
              education sector, PMHS now embraces a forward-thinking
              ideology—revolutionizing the medical industry into the digital era
              through <strong>THEFUTUREMED.com</strong>.
            </p>
          </div>

          {/* Right Column */}
          <div className="flex-1 bg-white p-5 md:p-6 shadow rounded-lg">
            <h2 className="text-xl md:text-2xl font-bold mb-4">Our Mission</h2>
            <img
              src="/image.jpeg"
              alt="Our mission"
              className="w-full h-40 md:h-48 object-cover rounded-lg mb-4"
            />
            <p className="text-gray-700 text-sm md:text-base">
              Our mission is to empower users by delivering high-quality,
              accessible information...
            </p>
          </div>
        </div>

        {/* Section: Our Team */}
        <div className="max-w-6xl mx-auto mt-8 bg-white p-5 md:p-6 shadow rounded-lg">
          <h2 className="text-xl md:text-3xl font-bold mb-4">Our Team</h2>
          <p className="text-gray-700 mb-6 text-sm md:text-base">
            Meet the experts behind <strong>THEFUTUREMED.com</strong> – a unique
            blend of medical professionals, AI engineers, and education
            specialists.
          </p>

          <div className="space-y-6">
            {/* Team Member 1 */}
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-6">
              <div className="flex-1 bg-white p-5 md:p-6 shadow rounded-lg">
                <h3 className="text-lg md:text-xl font-semibold text-blue-700">
                  Dr. Mohammed Ahetasham, M.B.B.S, M.D.R.D
                </h3>
                <p className="text-sm md:text-base font-medium text-gray-800">
                  Founder & Chairman – Prestige Medical Health Sciences (PMHS)
                </p>
                <p className="text-gray-700 mt-2 text-sm md:text-base">
                  Dr. Mohammed Ahetasham is a visionary healthcare innovator,
                  accomplished radiologist, and Founder & Chairman of Prestige
                  Medical Health Sciences (PMHS). With over 12 years of
                  experience in the medical industry, he has been instrumental
                  in advancing the intersection of clinical excellence, academic
                  leadership, and digital transformation.
                </p>
                <p className="text-gray-700 mt-2 text-sm md:text-base">
                  His career spans extensive clinical practice, academic
                  research, and leadership in the adoption of emerging
                  technologies such as AI, machine learning, agentic platforms,
                  and no-code healthtech solutions.
                </p>
                {/* <p className="text-gray-700 mt-2 text-sm md:text-base">
                After earning his M.B.B.S. from Vydehi Institute of Medical
                Sciences and Research Centre in 2009, Dr. Ahetasham served as a
                Consultant Radiologist across leading institutions such as
                NIMHANS, Kidwai Memorial Institute, Narayana Health, Apollo
                Cradle, and Anand Diagnostic. He completed his M.D.R.D from Dr.
                B.R. Ambedkar Medical College in 2016, the same year he
                established PMHS with a mission to deliver globally relevant,
                future-ready healthcare education.
              </p> */}
              </div>

              {/* Team Member 2 */}
              <div className="flex-1 bg-white p-5 md:p-6 shadow rounded-lg">
                <h3 className="text-lg md:text-xl font-semibold text-blue-700">
                  Suresh Kannan
                </h3>
                <p className="text-sm md:text-base font-medium text-gray-800">
                  Senior Technology Leader | AI Platforms & Product Delivery
                </p>
                <p className="text-gray-700 mt-2 text-sm md:text-base">
                  An accomplished technology leader with over 25 years of
                  experience in driving innovation across product engineering,
                  software architecture, and large-scale project delivery. Known
                  for successfully leading global teams and delivering
                  intelligent, AI-powered solutions.
                </p>
                <p className="text-gray-700 mt-2 text-sm md:text-base">
                  With deep expertise in cloud infrastructure, AI/ML systems,
                  and large language models (LLMs), this executive has played a
                  critical role in building next-generation platforms.
                </p>
                {/* <p className="text-gray-700 mt-2 text-sm md:text-base">
                Highly proficient in integrating low-code and no-code platforms,
                orchestrating end-to-end delivery pipelines, and managing
                deployments across cloud-native environments like Supabase, they
                bring a strategic, hands-on approach to transforming digital
                ecosystems. With a focus on aligning technical capabilities to
                business goals, they consistently drive measurable outcomes and
                lasting value.
              </p> */}
              </div>
            </div>
          </div>
        </div>

        {/* New Section Below the Two Columns */}
        <div className="max-w-6xl mx-auto mt-8 bg-white p-5 md:p-6 shadow rounded-lg">
          <h2 className="text-xl md:text-3xl font-bold mb-4">
            Our Mission and Approach
          </h2>
          <p className="text-gray-700 mb-4 text-sm md:text-base">
            Empower Your Medical Career with <strong>THEFUTUREMED.com</strong> —
            The Community of Medics created by a Medic, for the Medics,
            Globally. The ultimate platform for medical professionals to learn,
            connect, and earn digitally.
          </p>

          <h3 className="text-lg md:text-xl font-semibold mt-5 mb-2">
            Why Choose THEFUTUREMED.com?
          </h3>
          <p className="text-gray-700 mb-4 text-sm md:text-base">
            A one-stop platform designed exclusively for medical professionals
            including Doctors, Dentists, Nurses, Physiotherapists, Allied Health
            Workers, Ayurveda Practitioners, Homeopaths, Unani Practitioners,
            Dieticians, and more.
          </p>

          <h3 className="text-base md:text-lg font-semibold mt-4">
            Our Features: Learn, Connect, and Earn
          </h3>

          <ul className="list-disc list-inside text-gray-700 space-y-3 mt-2 text-sm md:text-base">
            <li>
              <strong>Host or Attend Medical Seminars and Conferences</strong>
              <br />
              Share expertise or gain insights from healthcare leaders:
              <ul className="list-disc ml-6 mt-1">
                <li>Host online medical conferences</li>
                <li>Attend interactive seminars on trending topics</li>
                <li>Earn by sharing knowledge globally</li>
              </ul>
            </li>

            <li>
              <strong>E-Learning Modules & Certifications</strong>
              <br />
              Upskill or monetize your expertise:
              <ul className="list-disc ml-6 mt-1">
                <li>Expert-led modules for skill development</li>
                <li>Host and sell your own courses</li>
                <li>Accredited programs for growth</li>
              </ul>
            </li>

            <li>
              <strong>Job Portal for Healthcare Professionals</strong>
              <br />
              Post your resume or discover jobs from hospitals and clinics for
              full-time or part-time roles.
            </li>
          </ul>

          <h3 className="text-base md:text-lg font-semibold mt-5">
            Why THEFUTUREMED.com Stands Out
          </h3>
          <ul className="list-disc list-inside text-gray-700 space-y-1 mt-2 text-sm md:text-base">
            <li>Global Reach: Connect with professionals worldwide</li>
            <li>Community-Driven: Collaborate within a thriving network</li>
            <li>Monetization Opportunities: Seminars, e-stores, and more</li>
          </ul>

          <h3 className="text-base md:text-lg font-semibold mt-5">
            Explore Our Key Offerings
          </h3>
          <ul className="list-disc list-inside text-gray-700 space-y-1 mt-2 text-sm md:text-base">
            <li>
              <strong>Community for Medics:</strong> Collaborate on research,
              share insights, and grow your network.
            </li>
            <li>
              <strong>Publish Research & Journals:</strong> Upload and share
              your medical publications.
            </li>
            <li>
              <strong>E-Store for :</strong> Sell books, instruments, and more
              via your landing page.
            </li>
          </ul>

          <h3 className="text-base md:text-lg font-semibold mt-5">
            How THEFUTUREMED.com Benefits You
          </h3>
          <ul className="list-disc list-inside text-gray-700 space-y-1 mt-2 text-sm md:text-base">
            <li>Boost Visibility through a global medical network</li>
            <li>Earn More by teaching, hosting, or selling</li>
            <li>Expand Knowledge with certified courses and events</li>
          </ul>

          <p className="text-blue-700 font-semibold mt-5 text-sm md:text-base">
            👉 Join <strong>THEFUTUREMED.com</strong> Today!
          </p>
        </div>

        {/* Section: Commitment to Excellence */}
        {/* <div className="max-w-6xl mx-auto mt-8 bg-white p-5 md:p-6 shadow rounded-lg">
          <h2 className="text-xl md:text-3xl font-bold mb-4">
            Commitment to Excellence and Student Success
          </h2>
          <p className="text-gray-700 text-sm md:text-base">
            At PMHS, we pride ourselves on our experienced faculty and
            state-of-the-art facilities, ensuring that our students receive a
            comprehensive education that meets global standards. Our commitment
            to excellence is reflected in our{" "}
            <strong>100% placement record</strong>, with many graduates securing
            positions within our own network of specialized healthcare
            facilities.
          </p>
        </div> */}

        {/* Section: Highlights or Features */}
        {/* <div className="max-w-6xl mx-auto mt-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            
            <div className="bg-white shadow rounded-lg p-5 text-center">
              <Building className="mx-auto mb-3 h-8 w-8 md:h-10 md:w-10 text-blue-500" />
              <h3 className="text-lg md:text-xl font-semibold mb-3">
                Organisations
              </h3>
              <ol className="list-decimal list-inside text-left text-gray-600 space-y-1 text-sm md:text-base">
                <li>Para medical AHS college</li>
                <li>Physiotherapy college</li>
                <li>Nursing College</li>
                <li>Health care services and diagnostics</li>
                <li>Physio rehab centers</li>
              </ol>
            </div>

            <div className="bg-white shadow rounded-lg p-5 text-center">
              <Laptop className="mx-auto mb-3 h-8 w-8 md:h-10 md:w-10 text-blue-500" />
              <h3 className="text-lg md:text-xl font-semibold mb-3">
                Our Digital Products
              </h3>
              <div className="text-left text-gray-600 space-y-2 text-sm md:text-base">
                <ol className="list-decimal list-inside">
                  <li>THEFUTUREMED – A safe haven for Health care heroes</li>
                  <li className="mt-1">
                    PMHS Smart Health – Platform with Tele Consultation, Tele
                    Radiology, EMR software, Billing software
                  </li>
                </ol>
              </div>
            </div>

            <div className="bg-white shadow rounded-lg p-5 text-center">
              <Users className="mx-auto mb-3 h-8 w-8 md:h-10 md:w-10 text-blue-500" />
              <h3 className="text-lg md:text-xl font-semibold mb-3">
                Groups To Discuss
              </h3>
              <ul className="list-decimal list-inside text-left text-gray-600 space-y-1 text-sm md:text-base">
                <li>In house Tech company</li>
              </ul>
            </div>
          </div>
        </div> */}
      </div>
      <Footer />
    </div>
  );
};

export default AboutPage;
