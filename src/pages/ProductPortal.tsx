
// import { useState, useEffect } from 'react';
// import { motion } from 'framer-motion';
// import { Link, useNavigate } from 'react-router-dom';
// import { Button } from '@/components/ui/button';
// import { Shield, UserPlus, Layout, Grid3X3, User, Home, ArrowLeft, LogOut, Menu } from 'lucide-react';
// import { supabase } from '@/integrations/supabase/client';
// import { useToast } from '@/hooks/use-toast';
// import ProductCard from '@/components/ProductCard';
// import type { User as SupabaseUser } from '@supabase/supabase-js';
// import AuthModal from '@/components/AuthModal';
// import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
// import logo from "@/image/thefuturemed_logo (1).jpg";

// import Footer from '@/footer/Footer';

// const products = [
//   {
//     id: 'community',
//     name: 'Community',
//     description: 'Connect with medical professionals worldwide',
//     color: '#FF6B6B',
//     position: [-4, 2, 0] as [number, number, number],
//   },
//   {
//     id: 'e-seminar',
//     name: 'E-Seminar',
//     description: 'Interactive online medical seminars',
//     color: '#4ECDC4',
//     position: [-2, 2, 0] as [number, number, number],
//   },
//   {
//     id: 'e-conferences',
//     name: 'E-Conferences',
//     description: 'Virtual medical conferences and events',
//     color: '#45B7D1',
//     position: [0, 2, 0] as [number, number, number],
//   },
//   {
//     id: 'e-learning',
//     name: 'E-Learning',
//     description: 'Comprehensive medical education platform',
//     color: '#96CEB4',
//     position: [2, 2, 0] as [number, number, number],
//   },
//   {
//     id: 'publication',
//     name: 'Publication',
//     description: 'Medical research and journal publications',
//     color: '#FFEAA7',
//     position: [4, 2, 0] as [number, number, number],
//   },
//   {
//     id: 'ai-medic-agents',
//     name: 'AI Medic Agents',
//     description: 'AI-powered medical assistance and diagnosis',
//     color: '#DDA0DD',
//     position: [-2, 0, 0] as [number, number, number],
//   },
//   {
//     id: 'podcast',
//     name: 'Podcast',
//     description: 'Medical podcasts and audio content',
//     color: '#FFB347',
//     position: [0, 0, 0] as [number, number, number],
//   },
//   {
//     id: 'data-verification',
//     name: 'Data Verification',
//     description: 'Medical data verification and validation',
//     color: '#87CEEB',
//     position: [2, 0, 0] as [number, number, number],
//   },
//   {
//     id: 'medical-jobs',
//     name: 'Medical Jobs',
//     description: 'Find and post medical career opportunities',
//     color: '#98FB98',
//     position: [0, -2, 0] as [number, number, number],
//   },
//    {
//     id: 'medical-blogs',
//     name: 'Medical Blogs',
//     description: 'Find and post medical career opportunities',
//     color: '#98FB98',
//     position: [0, -2, 0] as [number, number, number],
//   },
// ];

// const ProductPortal = () => {
//   const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
//   const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
//   const [user, setUser] = useState<SupabaseUser | null>(null);

//     const [loadingS, setLoadingS] = useState(true);
//   const { toast } = useToast();
//   const navigate = useNavigate();
//   const [showAuthModal, setShowAuthModal] = useState(false);
  
//   const handleAuthSuccess = () => {
//     // Handle successful authentication - you can add any additional logic here
//     console.log("Authentication successful");
//   };

 
//   useEffect(() => {
//   checkUser();
// }, []);

// const checkUser = async () => {
//   console.log('Checking user sessionZZZZZZZZZZZZZZZZZZZ.');
//   try {
//     const { data: { session }, error } = await supabase.auth.getSession();
//     console.log('Session dataAAAAAAA:', session);
//     if (error) console.error('Supabase session error:', error);

//     setUser(session?.user || null);
//     if (session?.user) {
//       console.log('User logged in:', session.user.email);
//     } else {
//       console.log('No user session ZZZZZZZZZZZZZZZZ.');
//     }
//   } catch (error) {
//     console.error('Error checking ZZZZZZZZZZZZZZZ:', error);
//   } finally {
//     console.log('Finished checking ZZZZZZZZZZZZZZ.');
//     setLoadingS(false);
//   }
// };

//   const handleSignOut = async () => {
//     try {
//       const { error } = await supabase.auth.signOut();
//       if (error) throw error;
//       setUser(null);
//       toast({
//         title: "Signed Out",
//         description: "You have been successfully signed out.",
//       });
//     } catch (error) {
//       console.error('Sign out error:', error);
//       toast({
//         title: "Error",
//         description: "Failed to sign out. Please try again.",
//         variant: "destructive",
//       });
//     }
//   };

//   const handleBackNavigation = () => {
//     if (window.history.length > 1) {
//       navigate(-1);
//     } else {
//       navigate('/');
//     }
//   };

//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.1
//       }
//     }
//   };

//   const handleProductAction = (productId: string) => {
//     console.log('Product action triggered for:', productId);
//     console.log('Current user:', user);
//     console.log('Navigating to product:', productId);
    
//     try {
//       if (productId === 'community') {
//         if (!user) {
//           toast({
//             title: "Authentication Required",
//             description: "Please sign in to access the community.",
//             variant: "destructive",
//           });
//           navigate('/');
//           return;
//         }
//         console.log('Navigating to community...');
//         navigate('/community');
//       } else if (productId === 'e-seminar') {
//         console.log('Navigating to e-seminar...');
//         navigate('/e-seminar');
//       } else if (productId === 'e-learning') {
//         console.log('Navigating to e-learning...');
//         navigate('/e-learning');
//       } else if (productId === "ai-medic-agents") {
//         // console.log("Navigating to ai-medic-agents...");
//         // window.open("https://ai-assistant.medorbis.ai/", "_blank");
//       } else if (productId === "e-conferences") {
//         console.log("E-conferences coming soon...");
//         toast({
//           title: "Coming Soon",
//           description: "E-Conferences will be available soon!",
//         });
//       } else if (productId === "publication") {
//         console.log("Navigating to publication...");
//         navigate("/publication");
//       } else if (productId === "medical-jobs") {
//         console.log("Navigating to medical jobs...");
//         navigate("/jobs");
//       } else if (productId === "medical-blogs") {
//         console.log("Navigating to medical jobs...");
//         navigate("/blog-portal");
//       } else {
//         toast({
//           title: "Coming Soon",
//           description: `${
//             products.find((p) => p.id === productId)?.name
//           } will be available soon!`,
//         });
//       }
//     } catch (error) {
//       console.error('Navigation error:', error);
//       toast({
//         title: "Navigation Error",
//         description: "Failed to navigate. Please try again.",
//         variant: "destructive",
//       });
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
//       {/* Header */}
//       {/* <header className="bg-black/30 backdrop-blur-md border-b border-white/20 sticky top-0 z-50 shadow-xl">
//         <div className="container mx-auto px-4 py-4">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center space-x-4">
//               <Button
//                 variant="outline"
//                 onClick={handleBackNavigation}
//                 className="text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm"
//                 title="Go back"
//               >
//                 <ArrowLeft className="mr-2 h-4 w-4" />
//                 Back
//               </Button>
//               <Link to="/" className="flex items-center space-x-2">
//                 <Shield className="h-8 w-8 text-blue-400" />
//                 <h1 className="text-2xl font-bold text-white">MedPortal</h1>
//               </Link>
//             </div>
//             <div className="flex items-center space-x-4">
//               <div className="flex items-center space-x-2 bg-white/10 rounded-lg p-1">
//                 <Button
//                   variant={viewMode === "grid" ? "default" : "ghost"}
//                   size="sm"
//                   onClick={() => setViewMode("grid")}
//                   className={`${
//                     viewMode === "grid"
//                       ? "bg-blue-600 text-white"
//                       : "text-white hover:bg-white/20"
//                   }`}
//                 >
//                   <Grid3X3 className="h-4 w-4" />
//                 </Button>
//                 <Button
//                   variant={viewMode === "list" ? "default" : "ghost"}
//                   size="sm"
//                   onClick={() => setViewMode("list")}
//                   className={`${
//                     viewMode === "list"
//                       ? "bg-blue-600 text-white"
//                       : "text-white hover:bg-white/20"
//                   }`}
//                 >
//                   <Layout className="h-4 w-4" />
//                 </Button>
//               </div>
//               {user ? (
//                 <div className="flex items-center space-x-4">
//                   <span className="text-white text-sm bg-white/10 px-3 py-1 rounded-full">
//                     Welcome, {user.email}
//                   </span>
//                   <Button
//                     variant="outline"
//                     className="text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm"
//                     onClick={() => navigate("/profile")}
//                   >
//                     <User className="mr-2 h-4 w-4" />
//                     Profile
//                   </Button>
//                   <Button
//                     variant="outline"
//                     className="text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm"
//                     onClick={handleSignOut}
//                   >
//                     Sign Out
//                   </Button>
//                 </div>
//               ) : (
//                 <>
//                   <Link to="/register">
//                     <Button
//                       variant="outline"
//                       className="text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm"
//                     >
//                       Register
//                     </Button>
//                   </Link>

//                   <Button
//                     className="bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl transition-all duration-200"
//                     onClick={() => setShowAuthModal(true)} 
//                   >
//                     <UserPlus className="mr-2 h-4 w-4" />
//                     Sign In
//                   </Button>
//                 </>
//               )}
//               <Button
//                 variant="outline"
//                 onClick={() => navigate("/")}
//                 className="text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm"
//                 title="Go to home page"
//               >
//                 <Home className="mr-2 h-4 w-4" />
//                 Home
//               </Button>
//             </div>
//           </div>
//         </div>
//         <AuthModal
//           isOpen={showAuthModal}
//           onClose={() => setShowAuthModal(false)}
//           onSuccess={handleAuthSuccess}
//         />
//       </header> */}
//       <header className="bg-black/30 backdrop-blur-md border-b border-white/20 sticky top-0 z-50 shadow-xl">
//         <div className="container mx-auto px-4 py-4">
//           <div className="flex items-center justify-between">
//             {/* Left Section - Logo and Back Button */}
//             <div className="flex items-center space-x-2 sm:space-x-4">
//               <Button
//                 variant="outline"
//                 onClick={handleBackNavigation}
//                 className="text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm p-2 sm:px-4 sm:py-2"
//                 title="Go back"
//               >
//                 <ArrowLeft className="h-4 w-4 sm:mr-2" />
//                 <span className="hidden sm:inline">Back</span>
//               </Button>
//               {/* <Link to="/" className="flex items-center space-x-2">
//                 <Shield className="h-6 w-6 sm:h-8 sm:w-8 text-blue-400" />
//                 <h1 className="text-xl sm:text-2xl font-bold text-white">
//                   MedPortal
//                 </h1>
//               </Link> */}
//               <div className="flex items-center space-x-2">
//                 <Link to="/">
//                   <img src={logo} alt="Logo" className="h-10 w-100 mr-2" />
//                 </Link>
//               </div>
//             </div>

//             {/* Right Section - Navigation Items */}
//             <div className="flex items-center space-x-2 sm:space-x-4">
//               {/* View Mode Toggle - Hidden on smallest screens */}
//               <div className="hidden sm:flex items-center space-x-2 bg-white/10 rounded-lg p-1">
//                 <Button
//                   variant={viewMode === "grid" ? "default" : "ghost"}
//                   size="sm"
//                   onClick={() => setViewMode("grid")}
//                   className={`${
//                     viewMode === "grid"
//                       ? "bg-blue-600 text-white"
//                       : "text-white hover:bg-white/20"
//                   }`}
//                 >
//                   <Grid3X3 className="h-4 w-4" />
//                 </Button>
//                 <Button
//                   variant={viewMode === "list" ? "default" : "ghost"}
//                   size="sm"
//                   onClick={() => setViewMode("list")}
//                   className={`${
//                     viewMode === "list"
//                       ? "bg-blue-600 text-white"
//                       : "text-white hover:bg-white/20"
//                   }`}
//                 >
//                   <Layout className="h-4 w-4" />
//                 </Button>
//               </div>

//               {/* User Section */}
//               {user ? (
//                 <div className="flex items-center space-x-2 sm:space-x-4">
//                   <span className="hidden md:inline text-white text-sm bg-white/10 px-3 py-1 rounded-full">
//                     Welcome, {user.email}
//                   </span>
//                   <Button
//                     variant="outline"
//                     className="text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm p-2 sm:px-4 sm:py-2"
//                     onClick={() => navigate("/profile")}
//                     title="Profile"
//                   >
//                     <User className="h-4 w-4 sm:mr-2" />
//                     <span className="hidden sm:inline">Profile</span>
//                   </Button>
//                   <Button
//                     variant="outline"
//                     className="text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm p-2 sm:px-4 sm:py-2"
//                     onClick={handleSignOut}
//                     title="Sign Out"
//                   >
//                     <span className="hidden sm:inline">Sign Out</span>
//                     <LogOut className="h-4 w-4 sm:ml-2 sm:hidden" />
//                   </Button>
//                 </div>
//               ) : (
//                 <>
//                   <Link to="/register">
//                     <Button
//                       variant="outline"
//                       className="hidden sm:flex text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm"
//                     >
//                       Register
//                     </Button>
//                   </Link>

//                   <Button
//                     className="bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl transition-all duration-200 p-2 sm:px-4 sm:py-2"
//                     onClick={() => setShowAuthModal(true)}
//                     title="Sign In"
//                   >
//                     <UserPlus className="h-4 w-4 sm:mr-2" />
//                     <span className="hidden sm:inline">Sign In</span>
//                   </Button>
//                 </>
//               )}

//               {/* Home Button - Icon only on mobile */}
//               <Button
//                 variant="outline"
//                 onClick={() => navigate("/")}
//                 className="text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm p-2 sm:px-4 sm:py-2"
//                 title="Go to home page"
//               >
//                 <Home className="h-4 w-4 sm:mr-2" />
//                 <span className="hidden sm:inline">Home</span>
//               </Button>

//               {/* Mobile Menu Button - Only shown on small screens */}
//               {user && (
//                 <DropdownMenu>
//                   <DropdownMenuTrigger asChild>
//                     <Button
//                       variant="outline"
//                       size="icon"
//                       className="sm:hidden text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm"
//                     >
//                       <Menu className="h-4 w-4" />
//                     </Button>
//                   </DropdownMenuTrigger>
//                   <DropdownMenuContent className="w-56 bg-black/80 backdrop-blur-md border-white/20">
//                     <DropdownMenuLabel className="text-white">
//                       {user.email}
//                     </DropdownMenuLabel>
//                     <DropdownMenuSeparator className="bg-white/20" />
//                     <DropdownMenuItem
//                       className="text-white hover:bg-white/10"
//                       onClick={() => navigate("/profile")}
//                     >
//                       <User className="mr-2 h-4 w-4" />
//                       <span>Profile</span>
//                     </DropdownMenuItem>
//                     <DropdownMenuItem
//                       className="text-white hover:bg-white/10"
//                       onClick={handleSignOut}
//                     >
//                       <LogOut className="mr-2 h-4 w-4" />
//                       <span>Sign Out</span>
//                     </DropdownMenuItem>
//                     <DropdownMenuSeparator className="bg-white/20" />
//                     <div className="flex justify-center p-1 bg-white/10 rounded-lg">
//                       <Button
//                         variant={viewMode === "grid" ? "default" : "ghost"}
//                         size="sm"
//                         onClick={() => setViewMode("grid")}
//                         className={`${
//                           viewMode === "grid"
//                             ? "bg-blue-600 text-white"
//                             : "text-white hover:bg-white/20"
//                         }`}
//                       >
//                         <Grid3X3 className="h-4 w-4" />
//                       </Button>
//                       <Button
//                         variant={viewMode === "list" ? "default" : "ghost"}
//                         size="sm"
//                         onClick={() => setViewMode("list")}
//                         className={`${
//                           viewMode === "list"
//                             ? "bg-blue-600 text-white"
//                             : "text-white hover:bg-white/20"
//                         }`}
//                       >
//                         <Layout className="h-4 w-4" />
//                       </Button>
//                     </div>
//                   </DropdownMenuContent>
//                 </DropdownMenu>
//               )}
//             </div>
//           </div>
//         </div>
//         <AuthModal
//           isOpen={showAuthModal}
//           onClose={() => setShowAuthModal(false)}
//           onSuccess={handleAuthSuccess}
//         />
//       </header>

//       {/* Hero Section */}
//       <div className="relative pt-16 pb-8">
//         <div className="container mx-auto px-4 text-center">
//           <motion.h2
//             className="text-5xl md:text-6xl font-bold text-white mb-6"
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//           >
//             Medical Platform
//             <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
//               of the Future
//             </span>
//           </motion.h2>
//           <motion.p
//             className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto"
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6, delay: 0.2 }}
//           >
//             Explore our comprehensive suite of medical tools and services.
//             {user
//               ? " Click on any product to access it."
//               : " Register once to access all products."}
//           </motion.p>
//         </div>
//       </div>
//       {/* Product Showcase */}
//       <div className="container mx-auto px-4 pb-16">
//         <motion.div
//           className={`${
//             viewMode === "grid"
//               ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
//               : "flex flex-col space-y-4 max-w-2xl mx-auto"
//           }`}
//           variants={containerVariants}
//           initial="hidden"
//           animate="visible"
//         >
//           {products.map((product) => (
//             <ProductCard
//               key={product.id}
//               product={product}
//               isSelected={selectedProduct === product.id}
//               onSelect={setSelectedProduct}
//               onAction={() => handleProductAction(product.id)}
//               isAuthenticated={!!user}
//             />
//           ))}
//         </motion.div>
//         {/* Selected Product Details */}
//         {/* {selectedProduct && (
//           <motion.div
//             className="mt-12 max-w-4xl mx-auto"
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.3 }}
//           >
//             {(() => {
//               const product = products.find((p) => p.id === selectedProduct);
//               return product ? (
//                 <div className="bg-black/40 backdrop-blur-sm rounded-lg p-8 text-white border border-white/10">
//                   <div className="flex items-center gap-4 mb-6">
//                     <div
//                       className="w-12 h-12 rounded-full flex items-center justify-center text-white text-xl font-bold"
//                       style={{ backgroundColor: product.color }}
//                     >
//                       {product.name.charAt(0)}
//                     </div>
//                     <div>
//                       <h3 className="text-3xl font-bold">{product.name}</h3>
//                       <p className="text-gray-300">{product.description}</p>
//                     </div>
//                   </div>
//                   <div className="flex gap-4">
//                     <Button
//                       className="text-white"
//                       style={{ backgroundColor: product.color }}
//                       onClick={() => handleProductAction(product.id)}
//                     >
//                       {product.id === "community"
//                         ? user
//                           ? "Access Community"
//                           : "Sign In to Access"
//                         : product.id === "e-learning"
//                         ? "Access E-Learning"
//                         : "Learn More"}
//                     </Button>
//                     <Button
//                       variant="outline"
//                       className="text-white border-white/30 hover:bg-white/10"
//                     >
//                       {product.id === "community" && user
//                         ? "Join Now"
//                         : "Try Now"}
//                     </Button>
//                     <Button
//                       variant="ghost"
//                       className="text-gray-300 hover:text-white"
//                       onClick={() => setSelectedProduct(null)}
//                     >
//                       Close
//                     </Button>
//                   </div>
//                 </div>
//               ) : null;
//             })()}
//           </motion.div>
//         )} */}
//         {selectedProduct && (
//           <motion.div
//             className="mt-12 max-w-4xl mx-auto"
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.3 }}
//           >
//             {(() => {
//               const product = products.find((p) => p.id === selectedProduct);
//               return product ? (
//                 <div className="bg-black/40 backdrop-blur-sm rounded-lg p-8 text-white border border-white/10">
//                   <div className="flex items-center gap-4 mb-6">
//                     <div
//                       className="w-12 h-12 rounded-full flex items-center justify-center text-white text-xl font-bold"
//                       style={{ backgroundColor: product.color }}
//                     >
//                       {product.name.charAt(0)}
//                     </div>
//                     <div>
//                       <h3 className="text-3xl font-bold">{product.name}</h3>
//                       <p className="text-gray-300">{product.description}</p>
//                     </div>
//                   </div>
//                   <div className="flex gap-4">
//                     {product.id === "ai-medic-agents" ? (
//                       <>
//                         <Button
//                           className="text-white"
//                           style={{ backgroundColor: product.color }}
//                           onClick={() =>
//                             window.open(
//                               "https://youtu.be/mEGR8M_CQXo",
//                               "_blank"
//                             )
//                           }
//                         >
//                           Learn More
//                         </Button>
//                         <Button
//                           variant="outline"
//                           className="text-white border-white/30 hover:bg-white/10"
//                           onClick={() =>
//                             window.open(
//                               "https://ai-assistant.medorbis.ai/",
//                               "_blank"
//                             )
//                           }
//                         >
//                           Try Now
//                         </Button>
//                       </>
//                     ) : (
//                       <>
//                         <Button
//                           className="text-white"
//                           style={{ backgroundColor: product.color }}
//                           onClick={() => handleProductAction(product.id)}
//                         >
//                           {product.id === "community"
//                             ? user
//                               ? "Access Community"
//                               : "Sign In to Access"
//                             : product.id === "e-learning"
//                             ? "Access E-Learning"
//                             : "Learn More"}
//                         </Button>
//                         <Button
//                           variant="outline"
//                           className="text-white border-white/30 hover:bg-white/10"
//                         >
//                           {product.id === "community" && user
//                             ? "Join Now"
//                             : "Try Now"}
//                         </Button>
//                       </>
//                     )}
//                     <Button
//                       variant="ghost"
//                       className="text-gray-300 hover:text-white"
//                       onClick={() => setSelectedProduct(null)}
//                     >
//                       Close
//                     </Button>
//                   </div>
//                 </div>
//               ) : null;
//             })()}
//           </motion.div>
//         )}
//       </div>
//       {/* Instructions */}
//       <div className="fixed bottom-4 right-4 bg-black/70 backdrop-blur-sm rounded-lg p-4 text-white text-sm border border-white/20 shadow-xl">
//         <p>🖱️ Click cards to explore • 📱 Switch between grid and list view</p>
//       </div>

//       <Footer />
//     </div>
//   );
// };

// export default ProductPortal;


import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Shield, UserPlus, Layout, Grid3X3, User, Home, ArrowLeft, LogOut, Menu } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import ProductCard from '@/components/ProductCard';
import type { User as SupabaseUser } from '@supabase/supabase-js';
import AuthModal from '@/components/AuthModal';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import YouTube from 'react-youtube';
import logo from "@/image/thefuturemed_logo (1).jpg";
import Footer from '@/footer/Footer';
import { mixpanelInstance } from '@/utils/mixpanel';

const products = [
  {
    id: 'community',
    name: 'Community',
    description: 'Connect with medical professionals worldwide',
    color: '#FF6B6B',
    position: [-4, 2, 0] as [number, number, number],
  },
  {
    id: 'e-seminar',
    name: 'E-Seminar',
    description: 'Interactive online medical seminars',
    color: '#4ECDC4',
    position: [-2, 2, 0] as [number, number, number],
  },
  {
    id: 'e-conferences',
    name: 'E-Conferences',
    description: 'Virtual medical conferences and events',
    color: '#45B7D1',
    position: [0, 2, 0] as [number, number, number],
  },
  {
    id: 'e-learning',
    name: 'E-Learning',
    description: 'Comprehensive medical education platform',
    color: '#96CEB4',
    position: [2, 2, 0] as [number, number, number],
  },
  {
    id: 'publication',
    name: 'Publication',
    description: 'Medical research and journal publications',
    color: '#FFEAA7',
    position: [4, 2, 0] as [number, number, number],
  },
  {
    id: 'ai-medic-agents',
    name: 'AI Medic Agents',
    description: 'AI-powered medical assistance and diagnosis',
    color: '#DDA0DD',
    position: [-2, 0, 0] as [number, number, number],
  },
  {
    id: 'podcast',
    name: 'Podcast',
    description: 'Medical podcasts and audio content',
    color: '#FFB347',
    position: [0, 0, 0] as [number, number, number],
  },
  {
    id: 'data-verification',
    name: 'Data Verification',
    description: 'Medical data verification and validation',
    color: '#87CEEB',
    position: [2, 0, 0] as [number, number, number],
  },
  {
    id: 'medical-jobs',
    name: 'Medical Jobs',
    description: 'Find and post medical career opportunities',
    color: '#98FB98',
    position: [0, -2, 0] as [number, number, number],
  },
  {
    id: 'medical-blogs',
    name: 'Medical Blogs',
    description: 'Find and post medical career opportunities',
    color: '#98FB98',
    position: [0, -2, 0] as [number, number, number],
  },
];
const navLinks = [
  { path: "/dashboard", label: "Dashboard" },
  { path: "/community", label: "Community" },
  { path: "/e-seminar", label: "E-Seminar" },
  { path: "/e-learning", label: "E-Learning" },
  { path: "/jobs", label: "Jobs" },
  { path: "/blog-portal", label: "Blogs" },
  // { path: "/calendar", label: "Calendar" },
];

const ProductPortal = () => {
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [loadingS, setLoadingS] = useState(true);
  const [showVideo, setShowVideo] = useState(false);
  const [showNow, setshowNow] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const [showAuthModal, setShowAuthModal] = useState(false);

  const trackButtonClick = (buttonName: string, additionalProps = {}) => {
    mixpanelInstance.track(`Button Click: ${buttonName}`, {
      timestamp: new Date().toISOString(),
      ...additionalProps,
    });
  };

  const handleAuthSuccess = () => {
    trackButtonClick("Authentication Success");
    console.log("Authentication successful");
    window.location.reload();
  };
  
  // const handleAuthSuccess = () => {
  //   console.log("Authentication successful");
  // };

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    try {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error) console.error('Supabase session error:', error);

      setUser(session?.user || null);
    } catch (error) {
      console.error('Error checking user:', error);
    } finally {
      setLoadingS(false);
    }
  };

  const handleSignOut = async () => {
    try {
       trackButtonClick("Sign Out");
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

  const handleBackNavigation = () => {
    trackButtonClick("Back Navigation");
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const handleProductAction = (productId: string) => {
    try {
      trackButtonClick(`Product Action: ${productId}`);
      if (productId === 'community') {
        if (!user) {
          toast({
            title: "Authentication Required",
            description: "Please sign in to access the community.",
            variant: "destructive",
          });
          navigate('/');
          return;
        }
        navigate('/community');
      } else if (productId === 'e-seminar') {
        navigate('/e-seminar');
         
      } else if (productId === 'e-learning') {
        navigate('/e-learning');
      } else if (productId === "ai-medic-agents") {
        setShowVideo(true);
        // setshowNow(window.open("https://ai-assistant.medorbis.ai/", "_blank"))
      } else if (productId === "e-conferences") {
        // toast({
        //   title: "Coming Soon",
        //   description: "E-Conferences will be available soon!",
        // });
         navigate('/e-seminar');
      } else if (productId === "publication") {
        navigate("/publication");
      } else if (productId === "medical-jobs") {
        navigate("/jobs");
      } else if (productId === "medical-blogs") {
        navigate("/blog-portal");
      } else {
        toast({
          title: "Coming Soon",
          description: `${products.find((p) => p.id === productId)?.name} will be available soon!`,
        });
      }
    } catch (error) {
      console.error('Navigation error:', error);
      toast({
        title: "Navigation Error",
        description: "Failed to navigate. Please try again.",
        variant: "destructive",
      });
    }
  };

  // YouTube player options
  const opts = {
    height: '390',
    width: '640',
    playerVars: {
      autoplay: 1,
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <header className="bg-black/30 backdrop-blur-md border-b border-white/20 sticky top-0 z-50 shadow-xl">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 sm:space-x-4">
              <Button
                variant="outline"
                onClick={handleBackNavigation}
                className="text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm p-2 sm:px-4 sm:py-2"
                title="Go back"
              >
                <ArrowLeft className="h-4 w-4 sm:mr-2" />
                <span className="hidden sm:inline">Back</span>
              </Button>
              <div className="flex items-center space-x-2">
                <Link to="/">
                  <img src={logo} alt="Logo" className="h-10 w-100 mr-2" />
                </Link>
              </div>
            </div>

            <div className="flex items-center space-x-2 sm:space-x-4">
              <div className="hidden sm:flex items-center space-x-2 bg-white/10 rounded-lg p-1">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() =>{
                            mixpanelInstance.track(
                              "grid Dashboard Button Clicked",
                              {
                                timestamp: new Date().toISOString(),
                              }
                            ); setViewMode("grid")}}
                  className={`${
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
                  className={`${
                    viewMode === "list"
                      ? "bg-blue-600 text-white"
                      : "text-white hover:bg-white/20"
                  }`}
                >
                  <Layout className="h-4 w-4" />
                </Button>
              </div>

              {user ? (
                <div className="flex items-center space-x-2 sm:space-x-4">
                  {/* <span className="hidden md:inline text-white text-sm bg-white/10 px-3 py-1 rounded-full">
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
                  <Button
                    variant="outline"
                    className="text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm p-2 sm:px-4 sm:py-2"
                    onClick={() => navigate("/profile")}
                    title="Profile"
                  >
                    <User className="h-4 w-4 sm:mr-2" />
                    <span className="hidden sm:inline">Profile</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm p-2 sm:px-4 sm:py-2"
                    onClick={handleSignOut}
                    title="Sign Out"
                  >
                    <span className="hidden sm:inline">Sign Out</span>
                    <LogOut className="h-4 w-4 sm:ml-2 sm:hidden" />
                  </Button>
                </div>
              ) : (
                <>
                  <Link to="/register">
                    <Button
                      variant="outline"
                      className="hidden sm:flex text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm"
                    >
                      Register
                    </Button>
                  </Link>

                  <Button
                    className="bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl transition-all duration-200 p-2 sm:px-4 sm:py-2"
                    onClick={() => setShowAuthModal(true)}
                    title="Sign In"
                  >
                    <UserPlus className="h-4 w-4 sm:mr-2" />
                    <span className="hidden sm:inline">Sign In</span>
                  </Button>
                </>
              )}

              <Button
                variant="outline"
                onClick={() => navigate("/")}
                className="text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm p-2 sm:px-4 sm:py-2"
                title="Go to home page"
              >
                <Home className="h-4 w-4 sm:mr-2" />
                <span className="hidden sm:inline">Home</span>
              </Button>

              {user && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      className="sm:hidden text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm"
                    >
                      <Menu className="h-4 w-4" />
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
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="text-white hover:bg-white/10"
                      onClick={handleSignOut}
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Sign Out</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="bg-white/20" />
                    <div className="flex justify-center p-1 bg-white/10 rounded-lg">
                      <Button
                        variant={viewMode === "grid" ? "default" : "ghost"}
                        size="sm"
                        onClick={() => {
                            mixpanelInstance.track(
                              "grid Dashboard Button Clicked",
                              {
                                timestamp: new Date().toISOString(),
                              }
                            );setViewMode("grid")}}
                        className={`${
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
                        
                        onClick={() =>{
                            mixpanelInstance.track(
                              "list Dashboard Button Clicked",
                              {
                                timestamp: new Date().toISOString(),
                              }
                            ); setViewMode("list")}}
                        className={`${
                          viewMode === "list"
                            ? "bg-blue-600 text-white"
                            : "text-white hover:bg-white/20"
                        }`}
                      >
                        <Layout className="h-4 w-4" />
                      </Button>
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>
          </div>
        </div>
        <AuthModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
          onSuccess={handleAuthSuccess}
        />
      </header>

      <div className="relative pt-16 pb-8">
        <div className="container mx-auto px-4 text-center">
          <motion.h2
            className="text-5xl md:text-6xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Medical Platform
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
              of the Future
            </span>
          </motion.h2>
          <motion.p
            className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Explore our comprehensive suite of medical tools and services.
            {user
              ? " Click on any product to access it."
              : " Register once to access all products."}
          </motion.p>
        </div>
      </div>

      <div className="container mx-auto px-4 pb-16">
        <motion.div
          className={`${
            viewMode === "grid"
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              : "flex flex-col space-y-4 max-w-2xl mx-auto"
          }`}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              isSelected={selectedProduct === product.id}
              onSelect={setSelectedProduct}
              onAction={() => handleProductAction(product.id)}
              isAuthenticated={!!user}
            />
          ))}
        </motion.div>

        {selectedProduct && (
          <motion.div
            className="mt-12 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {(() => {
              const product = products.find((p) => p.id === selectedProduct);
              return product ? (
                <div className="bg-black/40 backdrop-blur-sm rounded-lg p-8 text-white border border-white/10">
                  <div className="flex items-center gap-4 mb-6">
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center text-white text-xl font-bold"
                      style={{ backgroundColor: product.color }}
                    >
                      {product.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="text-3xl font-bold">{product.name}</h3>
                      <p className="text-gray-300">{product.description}</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    {product.id === "ai-medic-agents" ? (
                      <>
                        <Button
                          className="text-white"
                          style={{ backgroundColor: product.color }}
                          onClick={() => {
                            mixpanelInstance.track(
                              "Learn More Dashboard Button Clicked",
                              {
                                timestamp: new Date().toISOString(),
                              }
                            );
                            setShowVideo(true);
                          }}
                          // onClick={() => setShowVideo(true)}
                        >
                          Learn More
                        </Button>
                        <Button
                          variant="outline"
                          className="text-white border-white/30 hover:bg-white/10"
                          onClick={() => {
                            mixpanelInstance.track(
                              "Ai-assistant Medorbis.ai view Dashboard Button Clicked",
                              {
                                timestamp: new Date().toISOString(),
                              }
                            );
                            window.open(
                              "https://ai-assistant.medorbis.ai/",
                              "_blank"
                            );
                          }}
                          // onClick={() =>
                          //   window.open(
                          //     "https://ai-assistant.medorbis.ai/",
                          //     "_blank"
                          //   )
                          // }
                        >
                          Try Now
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button
                          className="text-white"
                          style={{ backgroundColor: product.color }}
                          onClick={() => {
                            mixpanelInstance.track(
                              "join view Dashboard Button Clicked",
                              {
                                timestamp: new Date().toISOString(),
                              }
                            );
                            handleProductAction(product.id);
                          }}
                          // onClick={() => handleProductAction(product.id)}
                        >
                          {product.id === "community"
                            ? user
                              ? "Access Community"
                              : "Sign In to Access"
                            : product.id === "e-learning"
                            ? "Access E-Learning"
                            : "Learn More"}
                        </Button>
                        <Button
                          variant="outline"
                          className="text-gray-700  hover:text-white border-white/30 hover:bg-white/10 "
                        >
                          {product.id === "community" && user
                            ? "Join Now"
                            : "Try Now"}
                        </Button>
                      </>
                    )}
                    <Button
                      variant="ghost"
                      className="text-gray-300 hover:text-black"
                      onClick={() => {
                        mixpanelInstance.track(
                          "close view Dashboard Button Clicked",
                          {
                            timestamp: new Date().toISOString(),
                          }
                        );
                        setSelectedProduct(null);
                      }}
                      // onClick={() => setSelectedProduct(null)}
                    >
                      Close
                    </Button>
                  </div>
                </div>
              ) : null;
            })()}
          </motion.div>
        )}
      </div>

      {/* YouTube Video Modal */}
      {showVideo && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <div className="relative bg-white/10 rounded-lg p-6 max-w-4xl w-full">
            <button
              onClick={() => {
                mixpanelInstance.track(
                  "YouTube view Dashboard Button Clicked",
                  {
                    timestamp: new Date().toISOString(),
                  }
                );
                setShowVideo(false);
              }}
              // onClick={() => setShowVideo(false)}
              className="absolute top-4 right-4 text-white hover:text-gray-300 text-2xl"
            >
              &times;
            </button>
            <div className="aspect-w-16 aspect-h-9 w-full">
              <YouTube
                videoId="mEGR8M_CQXo"
                opts={opts}
                onReady={(event) => {
                  event.target.pauseVideo();
                }}
              />
            </div>
            <div className="mt-4 flex justify-center">
              <Button
                className="bg-blue-600 hover:bg-blue-700 text-white"
                // onClick={() =>
                //   window.open("https://ai-assistant.medorbis.ai/", "_blank")
                // }
                onClick={() => {
                  mixpanelInstance.track(
                    "Try AI Assistant Now view Dashboard Button Clicked",
                    {
                      timestamp: new Date().toISOString(),
                    }
                  );
                  window.open("https://ai-assistant.medorbis.ai/", "_blank");
                }}
              >
                Try AI Assistant Now
              </Button>
            </div>
          </div>
        </div>
      )}

      <div className="fixed bottom-4 right-4 bg-black/70 backdrop-blur-sm rounded-lg p-4 text-white text-sm border border-white/20 shadow-xl">
        <p>🖱️ Click cards to explore • 📱 Switch between grid and list view</p>
      </div>

      <Footer />
    </div>
  );
};

export default ProductPortal;