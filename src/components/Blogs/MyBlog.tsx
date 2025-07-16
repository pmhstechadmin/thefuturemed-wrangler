




// import React, { useEffect, useState } from "react";
// import { supabase } from "@/integrations/supabase/client";
// import { Blog } from "../../types/blog";
// import "react-quill/dist/quill.snow.css";

// import {
//   ArrowLeft,
//   Shield,
//   UserPlus,
//   Home,
//   User,
//   Menu,
//   X,
//   LogOut,
//   FileEdit,
//   Trash2,
//   Eye,
//   EyeOff,
//   UserIcon,
// } from "lucide-react";
// import { useToast } from "@/hooks/use-toast";
// import { Button } from "@/components/ui/button";
// import { useNavigate, Link } from "react-router-dom";
// import { Badge } from "@/components/ui/badge";
// import { DropdownMenu } from "@radix-ui/react-dropdown-menu";
// import { DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
// import logo from "@/image/thefuturemed_logo (1).jpg";

// const BlogList: React.FC = () => {
//   const [blogs, setBlogs] = useState<Blog[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [userId, setUserId] = useState<string | null>(null);
//   const [user, setUser] = useState<any>(null);
//   const [showPublishedOnly, setShowPublishedOnly] = useState(true);
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const { toast } = useToast();
//   const navigate = useNavigate();

//   const handleBackNavigation = () => {
//     navigate(-1);
//   };

//   const handleSignOut = async () => {
//     const { error } = await supabase.auth.signOut();
//     if (!error) {
//       setUser(null);
//       setMobileMenuOpen(false);
//       toast({ title: "Signed Out", description: "You have been signed out." });
//     }
//   };

//   useEffect(() => {
//     const checkUser = async () => {
//       const {
//         data: { session },
//         error,
//       } = await supabase.auth.getSession();
//       if (error) console.error("Session error:", error);
//       setUser(session?.user || null);
//     };
//     checkUser();
//   }, []);

//   useEffect(() => {
//     const fetchUserAndBlogs = async () => {
//       setLoading(true);
//       const {
//         data: { user },
//         error: userError,
//       } = await supabase.auth.getUser();
//       if (userError || !user) {
//         console.error("User not found:", userError?.message);
//         setLoading(false);
//         return;
//       }

//       setUserId(user.id);

//       let query = supabase
//         .from("blog")
//         .select("*")
//         .eq("user_id", user.id)
//         .order("created_at", { ascending: false });

//       if (showPublishedOnly) {
//         query = query.eq("is_published", true);
//       }

//       const { data, error } = await query;

//       if (error) {
//         console.error("Error fetching blogs:", error.message);
//       } else {
//         setBlogs(data || []);
//       }

//       setLoading(false);
//     };

//     fetchUserAndBlogs();
//   }, [showPublishedOnly, userId]);

//   const deleteBlog = async (id: string | undefined) => {
//     if (!id) return;
//     const confirm = window.confirm(
//       "Are you sure you want to delete this blog?"
//     );
//     if (!confirm) return;

//     const { error } = await supabase.from("blog").delete().eq("id", id);
//     if (error) {
//       toast({
//         title: "Error",
//         description: "Failed to delete blog",
//         variant: "destructive",
//       });
//     } else {
//       setBlogs(blogs.filter((blog) => blog.id !== id));
//       toast({
//         title: "Success",
//         description: "Blog deleted successfully",
//       });
//     }
//   };

//   const togglePublish = async (blogId: string, currentState: boolean) => {
//     const { error } = await supabase
//       .from("blog")
//       .update({ is_published: !currentState })
//       .eq("id", blogId);

//     if (error) {
//       toast({
//         title: "Error",
//         description: error.message,
//         variant: "destructive",
//       });
//     } else {
//       setBlogs((prev) =>
//         prev.map((b) =>
//           b.id === blogId ? { ...b, is_published: !currentState } : b
//         )
//       );
//       toast({
//         title: "Success",
//         description: `Blog ${!currentState ? "published" : "unpublished"
//           } successfully`,
//       });
//     }
//   };

//   if (loading) return <p className="text-center mt-8">Loading blogs...</p>;

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
//       {/* Responsive Header */}
//       {/* <header className="bg-black border-b border-white/20 sticky top-0 z-50 shadow-xl">
//         <div className="container mx-auto px-4 py-3 flex items-center justify-between">
//           <div className="flex items-center space-x-2 sm:space-x-4">
//             <Button
//               variant="outline"
//               onClick={handleBackNavigation}
//               className="text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm p-2 sm:px-3 sm:py-2"
//               title="Go back"
//             >
//               <ArrowLeft className="h-4 w-4 sm:mr-1" />
//               <span className="hidden sm:inline">Back</span>
//             </Button>
//             <Link
//               to="/"
//               className="flex items-center space-x-2 mx-auto sm:mx-0"
//             >
//               <Shield className="h-6 w-6 sm:h-8 sm:w-8 text-blue-400" />
//               <h1 className="text-xl sm:text-2xl font-bold text-white">
//                 MedPortal
//               </h1>
//             </Link>

//             <Button
//               variant="outline"
//               className="sm:hidden text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm p-2"
//               onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//             >
//               {mobileMenuOpen ? (
//                 <X className="h-5 w-5" />
//               ) : (
//                 <Menu className="h-5 w-5" />
//               )}
//             </Button>
//           </div>

//           <div className="hidden sm:flex items-center space-x-2">
//             {user ? (
//               <>
//                 <span className="text-white text-xs sm:text-sm bg-white/10 px-2 sm:px-3 py-1 rounded-full">
//                   Welcome, {user.email?.split("@")[0]}
//                 </span>
//                 <Button
//                   variant="outline"
//                   className="text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm p-2 sm:px-3 sm:py-2"
//                   onClick={() => navigate("/profile")}
//                 >
//                   <User className="h-4 w-4 sm:mr-1" />
//                   <span className="hidden sm:inline">Profile</span>
//                 </Button>
//                 <Button
//                   variant="outline"
//                   className="text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm p-2 sm:px-3 sm:py-2"
//                   onClick={handleSignOut}
//                 >
//                   <LogOut className="h-4 w-4 sm:mr-1" />
//                   <span className="hidden sm:inline">Sign Out</span>
//                 </Button>
//               </>
//             ) : (
//               <>
//                 <Link to="/register">
//                   <Button
//                     variant="outline"
//                     className="text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm p-2 sm:px-3 sm:py-2"
//                   >
//                     Register
//                   </Button>
//                 </Link>
//                 <Link to="/">
//                   <Button className="bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl transition-all duration-200 p-2 sm:px-3 sm:py-2">
//                     <UserPlus className="h-4 w-4 sm:mr-1" />
//                     <span>Sign In</span>
//                   </Button>
//                 </Link>
//               </>
//             )}
//             <Button
//               variant="outline"
//               onClick={() => navigate("/")}
//               className="text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm p-2 sm:px-3 sm:py-2"
//             >
//               <Home className="h-4 w-4 sm:mr-1" />
//               <span className="hidden sm:inline">Home</span>
//             </Button>
//           </div>
//         </div>
//         {mobileMenuOpen && (
//           <div className="sm:hidden bg-black/50 backdrop-blur-lg pb-4 px-4">
//             <div className="flex flex-col space-y-3 pt-2">
//               {user ? (
//                 <>
//                   <div className="text-center text-white text-sm bg-white/20 px-4 py-2 rounded-full">
//                     Welcome, {user.email?.split("@")[0]}
//                   </div>
//                   <Button
//                     variant="outline"
//                     className="text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm justify-center"
//                     onClick={() => {
//                       navigate("/profile");
//                       setMobileMenuOpen(false);
//                     }}
//                   >
//                     <User className="h-4 w-4 mr-2" />
//                     Profile
//                   </Button>
//                   <Button
//                     variant="outline"
//                     className="text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm justify-center"
//                     onClick={handleSignOut}
//                   >
//                     <LogOut className="h-4 w-4 mr-2" />
//                     Sign Out
//                   </Button>
//                 </>
//               ) : (
//                 <div className="grid grid-cols-2 gap-3">
//                   <Link to="/register" onClick={() => setMobileMenuOpen(false)}>
//                     <Button
//                       variant="outline"
//                       className="text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm w-full"
//                     >
//                       Register
//                     </Button>
//                   </Link>
//                   <Link to="/" onClick={() => setMobileMenuOpen(false)}>
//                     <Button className="bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl transition-all duration-200 w-full">
//                       <UserPlus className="h-4 w-4 mr-1" />
//                       Sign In
//                     </Button>
//                   </Link>
//                 </div>
//               )}
//               <Button
//                 variant="outline"
//                 onClick={() => {
//                   navigate("/");
//                   setMobileMenuOpen(false);
//                 }}
//                 className="text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm justify-center"
//               >
//                 <Home className="h-4 w-4 mr-2" />
//                 Home
//               </Button>
//             </div>
//           </div>
//         )}
//       </header> */}
//       <header className="bg-black/30 backdrop-blur-md border-b border-white/20 sticky top-0 z-50 shadow-xl">
//         <div className="container mx-auto px-4 py-4">
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
//               {/* <Link to="/" className="flex items-center space-x-2">
//                 <Shield className="h-6 w-6 md:h-8 md:w-8 text-blue-400" />
//                 <h1 className="text-xl md:text-2xl font-bold text-white">
//                   MedPortal
//                 </h1>
//               </Link> */}
//               <div className="flex items-center space-x-2">
//                 {/* <Shield className="h-8 w-8 text-blue-600" />
//               <h1 className="text-2xl font-bold text-gray-900">MedPortal</h1> */}
//                 <Link to="/">
//                   <img src={logo} alt="Logo" className="h-10 w-100 mr-2" />
//                 </Link>
//               </div>
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

//               {/* Home Button - Icon only on mobile/tablet */}
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

//       {/* Main Content */}
//       <div className="container mx-auto px-4 py-8 max-w-4xl">
//         <div className="flex flex-col sm:flex-row items-start justify-between mb-6 gap-4">
//           <h2 className="text-xl sm:text-2xl font-semibold">My Blog Posts</h2>
//           <Button
//             variant="outline"
//             onClick={() => setShowPublishedOnly((prev) => !prev)}
//             className="flex items-center gap-2"
//           >
//             {showPublishedOnly ? (
//               <>
//                 <EyeOff className="h-4 w-4" />
//                 <span>Show All Blogs</span>
//               </>
//             ) : (
//               <>
//                 <Eye className="h-4 w-4" />
//                 <span>Show Only Published</span>
//               </>
//             )}
//           </Button>
//         </div>

//         {blogs.length === 0 ? (
//           <div className="bg-white rounded-xl shadow-sm p-8 text-center">
//             <h3 className="text-lg font-medium text-gray-900 mb-2">
//               No published blogs found
//             </h3>
//             <p className="text-gray-600 mb-4">
//               You haven't created any blogs yet
//             </p>
//             <Button onClick={() => navigate("/post-blog")}>
//               Create Your First Blog
//             </Button>
//           </div>
//         ) : (
//           <div className="space-y-4">

//             {blogs.map((blog) => (
//               <div
//                 key={blog.id}
//                 className="bg-white shadow rounded-xl overflow-hidden transition-all hover:shadow-lg"
//               >
//                 <div className="p-4 sm:p-6">
//                   <div className="flex justify-between items-start mb-3">
//                     <Badge
//                       variant={blog.is_published ? "default" : "secondary"}
//                       className="text-xs sm:text-sm"
//                     >
//                       {blog.is_published ? "Published" : "Draft"}
//                     </Badge>
//                     <span className="text-xs text-gray-500">
//                       {new Date(blog.created_at).toLocaleDateString()}
//                     </span>
//                   </div>

//                   <h3 className="text-base sm:text-lg font-bold mb-2">
//                     {blog.title}
//                   </h3>
//                   <div className="ql-editor max-w-none">
//                     <div dangerouslySetInnerHTML={{ __html: blog.content }} />
//                   </div>




//                   <div className="flex flex-wrap gap-2 mt-4">
//                     <Button
//                       variant="outline"
//                       size="sm"
//                       onClick={() => navigate(`/edit-blog/${blog.id}`)}
//                       className="flex items-center gap-1"
//                     >
//                       <FileEdit className="h-4 w-4" />
//                       <span>Edit</span>
//                     </Button>

//                     <Button
//                       variant="outline"
//                       size="sm"
//                       onClick={() => togglePublish(blog.id, blog.is_published)}
//                       className="flex items-center gap-1"
//                     >
//                       {blog.is_published ? (
//                         <>
//                           <EyeOff className="h-4 w-4" />
//                           <span>Unpublish</span>
//                         </>
//                       ) : (
//                         <>
//                           <Eye className="h-4 w-4" />
//                           <span>Publish</span>
//                         </>
//                       )}
//                     </Button>

//                     <Button
//                       variant="destructive"
//                       size="sm"
//                       onClick={() => deleteBlog(blog.id)}
//                       className="flex items-center gap-1"
//                     >
//                       <Trash2 className="h-4 w-4" />
//                       <span>Delete</span>
//                     </Button>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default BlogList;






import React, { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Blog } from "../../types/blog";
import "react-quill/dist/quill.snow.css";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import {
  ArrowLeft,
  Shield,
  UserPlus,
  Home,
  User,
  Menu,
  X,
  LogOut,
  FileEdit,
  Trash2,
  Eye,
  EyeOff,
  UserIcon,
  Search,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { useNavigate, Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu } from "@radix-ui/react-dropdown-menu";
import { DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import logo from "@/image/thefuturemed_logo (1).jpg";

const BlogList: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);
  const [showPublishedOnly, setShowPublishedOnly] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleBackNavigation = () => {
    navigate(-1);
  };

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      setUser(null);
      setMobileMenuOpen(false);
      toast({ title: "Signed Out", description: "You have been signed out." });
    }
  };

  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();
      if (error) console.error("Session error:", error);
      setUser(session?.user || null);
    };
    checkUser();
  }, []);

  useEffect(() => {
    const fetchUserAndBlogs = async () => {
      setLoading(true);
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();
      if (userError || !user) {
        console.error("User not found:", userError?.message);
        setLoading(false);
        return;
      }

      setUserId(user.id);

      let query = supabase
        .from("blog")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (showPublishedOnly) {
        query = query.eq("is_published", true);
      }

      const { data, error } = await query;

      if (error) {
        console.error("Error fetching blogs:", error.message);
      } else {
        setBlogs(data || []);
      }

      setLoading(false);
    };

    fetchUserAndBlogs();
  }, [showPublishedOnly, userId]);

  const deleteBlog = async (id: string | undefined) => {
    if (!id) return;
    const confirm = window.confirm(
      "Are you sure you want to delete this blog?"
    );
    if (!confirm) return;

    const { error } = await supabase.from("blog").delete().eq("id", id);
    if (error) {
      toast({
        title: "Error",
        description: "Failed to delete blog",
        variant: "destructive",
      });
    } else {
      setBlogs(blogs.filter((blog) => blog.id !== id));
      toast({
        title: "Success",
        description: "Blog deleted successfully",
      });
    }
  };

  const togglePublish = async (blogId: string, currentState: boolean) => {
    const { error } = await supabase
      .from("blog")
      .update({ is_published: !currentState })
      .eq("id", blogId);

    if (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } else {
      setBlogs((prev) =>
        prev.map((b) =>
          b.id === blogId ? { ...b, is_published: !currentState } : b
        )
      );
      toast({
        title: "Success",
        description: `Blog ${!currentState ? "published" : "unpublished"
          } successfully`,
      });
    }
  };

  if (loading) return <p className="text-center mt-8">Loading blogs...</p>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">

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

      {/* Main Content */}
      <div className="w-full px-6 py-8">

        <div className="max-w-md px-4 py-6">
          <Card
            className="hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => navigate("/blog-list")}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Blogs</CardTitle>
              {/* <FileEdit className="h-4 w-4 text-muted-foreground" /> */}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{blogs.length}</div>
              <p className="text-xs text-muted-foreground">+10% from last month</p>
              {/* <Button
                variant="ghost"
                size="sm"
                className="mt-2 p-0 h-auto text-blue-600 hover:text-blue-700"
                onClick={(e) => {
                  e.stopPropagation();
                  navigate("/blog-list");
                }}
              >
                <Search className="h-3 w-3 mr-1" />
                View Blogs
              </Button> */}
            </CardContent>
          </Card>
        </div>


        <div className="flex flex-col sm:flex-row items-start justify-between mb-6 gap-4">
          <h2 className="text-xl sm:text-2xl font-semibold">My Blog Posts</h2>
          <Button
            variant="outline"
            onClick={() => setShowPublishedOnly((prev) => !prev)}
            className="flex items-center gap-2"
          >
            {showPublishedOnly ? (
              <>
                <EyeOff className="h-4 w-4" />
                <span>Show All Blogs</span>
              </>
            ) : (
              <>
                <Eye className="h-4 w-4" />
                <span>Show Only Published</span>
              </>
            )}
          </Button>
        </div>

        {blogs.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-8 text-center">
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No published blogs found
            </h3>
            <p className="text-gray-600 mb-4">
              You haven't created any blogs yet
            </p>
            <Button onClick={() => navigate("/post-blog")}>
              Create Your First Blog
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-6 px-6">
            {blogs.map((blog) => (
              <Card
                key={blog.id}
                className="flex flex-col justify-between h-[380px] hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => navigate(`/blog-list/${blog.id}`)}
              >
                <CardHeader className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <Badge variant={blog.is_published ? "default" : "secondary"}>
                      {blog.is_published ? "Published" : "Draft"}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {new Date(blog.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <CardTitle className="text-base sm:text-lg line-clamp-2">
                    {blog.title}
                  </CardTitle>
                </CardHeader>

                <CardContent className="flex flex-col justify-between p-4 h-[320px]">
                  {/* Blog Content */}
                  <div className="overflow-hidden max-h-[200px]">
                    <div
                      className="ql-editor max-w-none prose prose-sm overflow-hidden"
                      style={{ padding: 0 }}
                      dangerouslySetInnerHTML={{ __html: blog.content }}
                    />
                  </div>

                  {/* Author and Buttons */}
                  <div className="mt-auto">
                    {/* <p className="text-xs text-gray-500 italic mb-2 text-end">
                      By {blog.author_name}
                    </p> */}
                    <div className="flex justify-between gap-2 flex-wrap">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/edit-blog/${blog.id}`);
                        }}
                        className="flex items-center gap-1"
                      >
                        <FileEdit className="h-4 w-4" />
                        Edit
                      </Button>

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          togglePublish(blog.id, blog.is_published);
                        }}
                        className="flex items-center gap-1"
                      >
                        {blog.is_published ? (
                          <>
                            <EyeOff className="h-4 w-4" />
                            Unpublish
                          </>
                        ) : (
                          <>
                            <Eye className="h-4 w-4" />
                            Publish
                          </>
                        )}
                      </Button>

                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteBlog(blog.id);
                        }}
                        className="flex items-center gap-1"
                      >
                        <Trash2 className="h-4 w-4" />
                        Delete
                      </Button>
                    </div>
                  </div>


                </CardContent>
              </Card>
            ))}
          </div>



        )}
      </div>
    </div>
  );
};

export default BlogList;
