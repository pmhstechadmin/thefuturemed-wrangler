// // import { useState, useEffect } from "react";
// // import { Button } from "@/components/ui/button";
// // import {
// //     Card,
// //     CardContent,
// //     CardHeader,
// //     CardTitle
// // } from "@/components/ui/card";
// // import {
// //     Tabs,
// //     TabsList
// // } from "@/components/ui/tabs";
// // import {
// //     Building,
// //     ArrowLeft,
// //     Shield,
// //     UserPlus,
// //     Home,
// //     User
// // } from "lucide-react";

// // import { useNavigate, Link } from "react-router-dom";
// // import { supabase } from "@/integrations/supabase/client";
// // import type { User as SupabaseUser } from "@supabase/supabase-js";
// // import { useToast } from "@/hooks/use-toast";
// // import { Badge } from "@/components/ui/badge";
// // import { useLocation } from 'react-router-dom';

// // type Blog = {
// //     id: string;
// //     title: string;
// //     content: string;
// //     is_published: boolean;
// //     user_id: string;
// //     created_at: string;
// // };

// // const BlogPortal: React.FC = () => {
// //     const navigate = useNavigate();
// //     const [user, setUser] = useState<SupabaseUser | null>(null);
// //     const [loading, setLoading] = useState(true);
// //     const [blogs, setBlogs] = useState<Blog[]>([]);
// //     const { toast } = useToast();
// //     const location = useLocation();

// //     const isBlogList = location.pathname === '/blog-portal';
// //     const isPostBlog = location.pathname === '/post-blog';

// //     const handleBackNavigation = () => {
// //         if (window.history.length > 1) {
// //             navigate(-1);
// //         } else {
// //             navigate('/');
// //         }
// //     };

// //     const handleSignOut = async () => {
// //         try {
// //             const { error } = await supabase.auth.signOut();
// //             if (error) throw error;
// //             setUser(null);
// //             toast({
// //                 title: "Signed Out",
// //                 description: "You have been successfully signed out.",
// //             });
// //         } catch (error) {
// //             console.error('Sign out error:', error);
// //             toast({
// //                 title: "Error",
// //                 description: "Failed to sign out. Please try again.",
// //                 variant: "destructive",
// //             });
// //         }
// //     };

// //     useEffect(() => {
// //         const checkUser = async () => {
// //             try {
// //                 const { data: { session }, error } = await supabase.auth.getSession();
// //                 if (error) console.error('Error fetching session:', error);
// //                 setUser(session?.user ?? null);
// //             } catch (err) {
// //                 console.error('Failed to fetch user:', err);
// //             } finally {
// //                 setLoading(false);
// //             }
// //         };

// //         checkUser();
// //     }, []);

// //     useEffect(() => {
// //         const fetchBlogs = async () => {
// //             setLoading(true);
// //             const { data: { user }, error: userError } = await supabase.auth.getUser();
// //             if (userError || !user) {
// //                 console.error('User not found:', userError?.message);
// //                 setLoading(false);
// //                 return;
// //             }

// //             const { data, error } = await supabase
// //                 .from('blog')
// //                 .select('*')
// //                 .eq('is_published', true)
// //                 .neq('user_id', user.id)
// //                 .order('created_at', { ascending: false });

// //             if (error) {
// //                 console.error('Error fetching blogs:', error.message);
// //             } else {
// //                 setBlogs(data || []);
// //             }

// //             setLoading(false);
// //         };

// //         fetchBlogs();
// //     }, []);

// //     if (loading) return <p className="text-center mt-8">Loading blogs...</p>;

// //     return (
// //         <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
// //             {/* Header */}
// //             <header className="bg-black/30 backdrop-blur-md border-b border-white/20 sticky top-0 z-50 shadow-xl">
// //                 <div className="container mx-auto px-4 py-4 flex items-center justify-between">
// //                     <div className="flex items-center space-x-4">
// //                         <Button
// //                             variant="outline"
// //                             onClick={handleBackNavigation}
// //                             className="text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm"
// //                             title="Go back"
// //                         >
// //                             <ArrowLeft className="mr-2 h-4 w-4" />
// //                             Back
// //                         </Button>
// //                         <Link to="/" className="flex items-center space-x-2">
// //                             <Shield className="h-8 w-8 text-blue-400" />
// //                             <h1 className="text-2xl font-bold text-white">MedPortal</h1>
// //                         </Link>
// //                     </div>
// //                     <div className="flex items-center space-x-4">
// //                         {user ? (
// //                             <>
// //                                 <span className="text-white text-sm bg-white/10 px-3 py-1 rounded-full">Welcome, {user.email}</span>
// //                                 <Button
// //                                     variant="outline"
// //                                     className="text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm"
// //                                     onClick={() => navigate('/profile')}
// //                                 >
// //                                     <User className="mr-2 h-4 w-4" />
// //                                     Profile
// //                                 </Button>
// //                                 <Button
// //                                     variant="outline"
// //                                     className="text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm"
// //                                     onClick={handleSignOut}
// //                                 >
// //                                     Sign Out
// //                                 </Button>
// //                             </>
// //                         ) : (
// //                             <>
// //                                 <Link to="/register">
// //                                     <Button variant="outline" className="text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm">Register</Button>
// //                                 </Link>
// //                                 <Link to="/">
// //                                     <Button className="bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl transition-all duration-200">
// //                                         <UserPlus className="mr-2 h-4 w-4" />
// //                                         Sign In
// //                                     </Button>
// //                                 </Link>
// //                             </>
// //                         )}
// //                         <Button
// //                             variant="outline"
// //                             onClick={() => navigate('/')}
// //                             className="text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm"
// //                         >
// //                             <Home className="mr-2 h-4 w-4" />
// //                             Home
// //                         </Button>
// //                     </div>
// //                 </div>
// //             </header>

// //             {/* Page Title */}
// //             <div className="bg-white shadow-sm border-b">
// //                 <div className="container mx-auto px-4 py-6 text-center">
// //                     <h1 className="text-4xl font-bold text-gray-900 mb-2">Blogs</h1>
// //                     <p className="text-gray-600 text-lg">Connect healthcare professionals with opportunities</p>
// //                 </div>
// //             </div>

// //             {/* Tabs */}
// //             <div className="container mx-auto px-4 py-8">
// //                 <Tabs defaultValue="blog-list" className="w-full">
// //                     <TabsList className="grid w-full grid-cols-2 mb-8">
// //                         <Link
// //                             to="/blog-portal"
// //                             className={`flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-sm transition-all ${isBlogList ? 'bg-white text-black shadow' : 'hover:bg-muted'
// //                                 }`}
// //                         >
// //                             <Building className="h-4 w-4" />
// //                             Blog List
// //                         </Link>
// //                         <Link
// //                             to="/post-blog"
// //                             className={`flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-sm transition-all ${isPostBlog ? 'bg-white text-black shadow' : 'hover:bg-muted'
// //                                 }`}
// //                         >
// //                             <Building className="h-4 w-4" />
// //                             Post Blog
// //                         </Link>
// //                     </TabsList>
// //                 </Tabs>

// //                 {/* Blog Cards */}
// //                 <h2 className="text-xl font-semibold mb-6">Published Blogs by Others</h2>
// //                 {blogs.length === 0 ? (
// //                     <Card>
// //                         <CardContent className="text-center py-12">
// //                             <h3 className="text-lg font-medium text-gray-900 mb-2">
// //                                 No blogs found
// //                             </h3>
// //                             <p className="text-gray-600">Check back later for updates!</p>
// //                         </CardContent>
// //                     </Card>
// //                 ) : (
// //                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// //                         {blogs.map((blog) => (
// //                             <Card
// //                                 key={blog.id}
// //                                 className="flex flex-col justify-between h-full hover:shadow-lg transition-shadow cursor-pointer"
// //                                 onClick={() => navigate(`/blog-list/${blog.id}`)}
// //                             >
// //                                 <CardHeader>
// //                                     <div className="flex justify-between items-start mb-2">
// //                                         <Badge variant="default">Published</Badge>
// //                                     </div>
// //                                     <CardTitle className="text-lg line-clamp-2">{blog.title}</CardTitle>
// //                                 </CardHeader>

// //                                 <CardContent className="flex flex-col justify-between flex-grow">
// //                                     <div
// //                                         className="text-sm text-gray-600 line-clamp-3 mb-4"
// //                                         dangerouslySetInnerHTML={{ __html: blog.content }}
// //                                     />

// //                                     <div className="mt-auto">
// //                                         <Button
// //                                             className="w-full"
// //                                             onClick={(e) => {
// //                                                 e.stopPropagation();
// //                                                 console.log("Blog IDddddddddd:", blog.id);
// //                                                 navigate(`/blog-list/${blog.id}`);
// //                                             }}
// //                                         >
// //                                             View Blog
// //                                         </Button>
// //                                     </div>
// //                                 </CardContent>
// //                             </Card>

// //                         ))}
// //                     </div>
// //                 )}
// //             </div>

// //         </div>
// //     );
// // };

// // export default BlogPortal;

// import { useState, useEffect } from "react";
// import { Button } from "@/components/ui/button";
// import {
//     Card,
//     CardContent,
//     CardHeader,
//     CardTitle
// } from "@/components/ui/card";
// import {
//     Tabs,
//     TabsList
// } from "@/components/ui/tabs";
// import {
//     Building,
//     ArrowLeft,
//     Shield,
//     UserPlus,
//     Home,
//     User
// } from "lucide-react";

// import { useNavigate, Link } from "react-router-dom";
// import { supabase } from "@/integrations/supabase/client";
// import type { User as SupabaseUser } from "@supabase/supabase-js";
// import { useToast } from "@/hooks/use-toast";
// import { Badge } from "@/components/ui/badge";
// import { useLocation } from 'react-router-dom';

// type Blog = {
//     id: string;
//     title: string;
//     content: string;
//     is_published: boolean;
//     user_id: string;
//     created_at: string;
// };

// const BlogPortal: React.FC = () => {
//     const navigate = useNavigate();
//     const [user, setUser] = useState<SupabaseUser | null>(null);
//     const [loading, setLoading] = useState(true);
//     const [blogs, setBlogs] = useState<Blog[]>([]);
//     const { toast } = useToast();
//     const location = useLocation();

//     const isBlogList = location.pathname === '/blog-portal';
//     const isPostBlog = location.pathname === '/post-blog';

//     const handleBackNavigation = () => {
//         if (window.history.length > 1) {
//             navigate(-1);
//         } else {
//             navigate('/');
//         }
//     };

//     const handleSignOut = async () => {
//         try {
//             const { error } = await supabase.auth.signOut();
//             if (error) throw error;
//             setUser(null);
//             toast({
//                 title: "Signed Out",
//                 description: "You have been successfully signed out.",
//             });
//         } catch (error) {
//             console.error('Sign out error:', error);
//             toast({
//                 title: "Error",
//                 description: "Failed to sign out. Please try again.",
//                 variant: "destructive",
//             });
//         }
//     };

//     useEffect(() => {
//         const checkUser = async () => {
//             try {
//                 const { data: { session }, error } = await supabase.auth.getSession();
//                 if (error) console.error('Error fetching session:', error);
//                 setUser(session?.user ?? null);
//             } catch (err) {
//                 console.error('Failed to fetch user:', err);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         checkUser();
//     }, []);

//     useEffect(() => {
//         const fetchBlogs = async () => {
//             setLoading(true);
//             const { data: { user }, error: userError } = await supabase.auth.getUser();
//             if (userError || !user) {
//                 console.error('User not found:', userError?.message);
//                 setLoading(false);
//                 return;
//             }

//             const { data, error } = await supabase
//                 .from('blog')
//                 .select('*')
//                 .eq('is_published', true)
//                 .neq('user_id', user.id)
//                 .order('created_at', { ascending: false });

//             if (error) {
//                 console.error('Error fetching blogs:', error.message);
//             } else {
//                 setBlogs(data || []);
//             }

//             setLoading(false);
//         };

//         fetchBlogs();
//     }, []);

//     if (loading) return <p className="text-center mt-8">Loading blogs...</p>;

//     return (
//         <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
//             {/* Header */}
//             <header className="bg-black/30 backdrop-blur-md border-b border-white/20 sticky top-0 z-50 shadow-xl">
//                 <div className="container mx-auto px-4 py-4 flex items-center justify-between">
//                     <div className="flex items-center space-x-4">
//                         <Button
//                             variant="outline"
//                             onClick={handleBackNavigation}
//                             className="text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm"
//                             title="Go back"
//                         >
//                             <ArrowLeft className="mr-2 h-4 w-4" />
//                             Back
//                         </Button>
//                         <Link to="/" className="flex items-center space-x-2">
//                             <Shield className="h-8 w-8 text-blue-400" />
//                             <h1 className="text-2xl font-bold text-white">MedPortal</h1>
//                         </Link>
//                     </div>
//                     <div className="flex items-center space-x-4">
//                         {user ? (
//                             <>
//                                 <span className="text-white text-sm bg-white/10 px-3 py-1 rounded-full">Welcome, {user.email}</span>
//                                 <Button
//                                     variant="outline"
//                                     className="text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm"
//                                     onClick={() => navigate('/profile')}
//                                 >
//                                     <User className="mr-2 h-4 w-4" />
//                                     Profile
//                                 </Button>
//                                 <Button
//                                     variant="outline"
//                                     className="text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm"
//                                     onClick={handleSignOut}
//                                 >
//                                     Sign Out
//                                 </Button>
//                             </>
//                         ) : (
//                             <>
//                                 <Link to="/register">
//                                     <Button variant="outline" className="text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm">Register</Button>
//                                 </Link>
//                                 <Link to="/">
//                                     <Button className="bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl transition-all duration-200">
//                                         <UserPlus className="mr-2 h-4 w-4" />
//                                         Sign In
//                                     </Button>
//                                 </Link>
//                             </>
//                         )}
//                         <Button
//                             variant="outline"
//                             onClick={() => navigate('/')}
//                             className="text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm"
//                         >
//                             <Home className="mr-2 h-4 w-4" />
//                             Home
//                         </Button>
//                     </div>
//                 </div>
//             </header>

//             {/* Page Title */}
//             <div className="bg-white shadow-sm border-b">
//                 <div className="container mx-auto px-4 py-6 text-center">
//                     <h1 className="text-4xl font-bold text-gray-900 mb-2">Blogs</h1>
//                     <p className="text-gray-600 text-lg">Connect healthcare professionals with opportunities</p>
//                 </div>
//             </div>

//             {/* Tabs */}
//             <div className="container mx-auto px-4 py-8">
//                 <Tabs defaultValue="blog-list" className="w-full">
//                     <TabsList className="grid w-full grid-cols-2 mb-8">
//                         <Link
//                             to="/blog-portal"
//                             className={`flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-sm transition-all ${isBlogList ? 'bg-white text-black shadow' : 'hover:bg-muted'
//                                 }`}
//                         >
//                             <Building className="h-4 w-4" />
//                             Blog List
//                         </Link>
//                         <Link
//                             to="/post-blog"
//                             className={`flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-sm transition-all ${isPostBlog ? 'bg-white text-black shadow' : 'hover:bg-muted'
//                                 }`}
//                         >
//                             <Building className="h-4 w-4" />
//                             Post Blog
//                         </Link>
//                     </TabsList>
//                 </Tabs>

//                 {/* Blog Cards */}
//                 <h2 className="text-xl font-semibold mb-6">Published Blogs by Others</h2>
//                 {blogs.length === 0 ? (
//                     <Card>
//                         <CardContent className="text-center py-12">
//                             <h3 className="text-lg font-medium text-gray-900 mb-2">
//                                 No blogs found
//                             </h3>
//                             <p className="text-gray-600">Check back later for updates!</p>
//                         </CardContent>
//                     </Card>
//                 ) : (
//                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                         {blogs.map((blog) => (
//                             <Card
//                                 key={blog.id}
//                                 className="flex flex-col justify-between h-full hover:shadow-lg transition-shadow cursor-pointer"
//                                 onClick={() => navigate(`/blog-list/${blog.id}`)}
//                             >
//                                 <CardHeader>
//                                     <div className="flex justify-between items-start mb-2">
//                                         <Badge variant="default">Published</Badge>
//                                     </div>
//                                     <CardTitle className="text-lg line-clamp-2">{blog.title}</CardTitle>
//                                 </CardHeader>

//                                 <CardContent className="flex flex-col justify-between flex-grow">
//                                     <div
//                                         className="text-sm text-gray-600 line-clamp-3 mb-4"
//                                         dangerouslySetInnerHTML={{ __html: blog.content }}
//                                     />

//                                     <div className="mt-auto">
//                                         <Button
//                                             className="w-full"
//                                             onClick={(e) => {
//                                                 e.stopPropagation();
//                                                 console.log("Blog IDddddddddd:", blog.id);
//                                                 navigate(`/blog-list/${blog.id}`);
//                                             }}
//                                         >
//                                             View Blog
//                                         </Button>
//                                     </div>
//                                 </CardContent>
//                             </Card>

//                         ))}
//                     </div>
//                 )}
//             </div>

//         </div>
//     );
// };

// export default BlogPortal;

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList } from "@/components/ui/tabs";
import {
  Building,
  ArrowLeft,
  Shield,
  UserPlus,
  Home,
  User,
  Menu,
  X,
  LogOut,
  UserIcon,
} from "lucide-react";

import { useNavigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import type { User as SupabaseUser } from "@supabase/supabase-js";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { useLocation } from "react-router-dom";
import logo from "@/image/thefuturemed_logo (1).jpg";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

type Blog = {
  id: string;
  title: string;
  content: string;
  is_published: boolean;
  user_id: string;
  created_at: string;
};

const BlogPortal: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { toast } = useToast();
  const location = useLocation();

  const isBlogList = location.pathname === "/blog-portal";
  const isPostBlog = location.pathname === "/post-blog";

  const handleBackNavigation = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("/");
    }
  };

  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      setUser(null);
      setMobileMenuOpen(false);
      toast({
        title: "Signed Out",
        description: "You have been successfully signed out.",
      });
    } catch (error) {
      console.error("Sign out error:", error);
      toast({
        title: "Error",
        description: "Failed to sign out. Please try again.",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    const checkUser = async () => {
      try {
        const {
          data: { session },
          error,
        } = await supabase.auth.getSession();
        if (error) console.error("Error fetching session:", error);
        setUser(session?.user ?? null);
      } catch (err) {
        console.error("Failed to fetch user:", err);
      } finally {
        setLoading(false);
      }
    };

    checkUser();
  }, []);

  useEffect(() => {
    const fetchBlogs = async () => {
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

      const { data, error } = await supabase
        .from("blog")
        .select("*")
        .eq("is_published", true)
        .neq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching blogs:", error.message);
      } else {
        setBlogs(data || []);
      }

      setLoading(false);
    };

    fetchBlogs();
  }, []);

  if (loading) return <p className="text-center mt-8">Loading blogs...</p>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      {/* Header - Mobile Responsive */}
      {/* <header className="bg-black/30 backdrop-blur-md border-b border-white/20 sticky top-0 z-50 shadow-xl">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-2 sm:space-x-4">
            <Button
              variant="outline"
              onClick={handleBackNavigation}
              className="text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm p-2 sm:px-3 sm:py-2"
              title="Go back"
            >
              <ArrowLeft className="h-4 w-4 sm:mr-1" />
              <span className="hidden sm:inline">Back</span>
            </Button>

            <Button
              variant="outline"
              className="sm:hidden text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>

          <Link to="/" className="flex items-center space-x-2 mx-auto sm:mx-0">
            <Shield className="h-6 w-6 sm:h-8 sm:w-8 text-blue-400" />
            <h1 className="text-xl sm:text-2xl font-bold text-white">
              MedPortal
            </h1>
          </Link>

          <div className="hidden sm:flex items-center space-x-2">
            {user ? (
              <>
                <span className="text-white text-xs sm:text-sm bg-white/10 px-2 sm:px-3 py-1 rounded-full">
                  Welcome, {user.email?.split("@")[0]}
                </span>
                <Button
                  variant="outline"
                  className="text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm p-2 sm:px-3 sm:py-2"
                  onClick={() => navigate("/profile")}
                >
                  <User className="h-4 w-4 sm:mr-1" />
                  <span className="hidden sm:inline">Profile</span>
                </Button>
                <Button
                  variant="outline"
                  className="text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm p-2 sm:px-3 sm:py-2"
                  onClick={handleSignOut}
                >
                  <LogOut className="h-4 w-4 sm:mr-1" />
                  <span className="hidden sm:inline">Sign Out</span>
                </Button>
              </>
            ) : (
              <>
                <Link to="/register">
                  <Button
                    variant="outline"
                    className="text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm p-2 sm:px-3 sm:py-2"
                  >
                    Register
                  </Button>
                </Link>
                <Link to="/">
                  <Button className="bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl transition-all duration-200 p-2 sm:px-3 sm:py-2">
                    <UserPlus className="h-4 w-4 sm:mr-1" />
                    <span>Sign In</span>
                  </Button>
                </Link>
              </>
            )}
            <Button
              variant="outline"
              onClick={() => navigate("/")}
              className="text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm p-2 sm:px-3 sm:py-2"
            >
              <Home className="h-4 w-4 sm:mr-1" />
              <span className="hidden sm:inline">Home</span>
            </Button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="sm:hidden bg-black/50 backdrop-blur-lg pb-4 px-4">
            <div className="flex flex-col space-y-3 pt-2">
              {user ? (
                <>
                  <div className="text-center text-white text-sm bg-white/20 px-4 py-2 rounded-full">
                    Welcome, {user.email?.split("@")[0]}
                  </div>
                  <Button
                    variant="outline"
                    className="text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm justify-center"
                    onClick={() => {
                      navigate("/profile");
                      setMobileMenuOpen(false);
                    }}
                  >
                    <User className="h-4 w-4 mr-2" />
                    Profile
                  </Button>
                  <Button
                    variant="outline"
                    className="text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm justify-center"
                    onClick={handleSignOut}
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </Button>
                </>
              ) : (
                <div className="grid grid-cols-2 gap-3">
                  <Link to="/register" onClick={() => setMobileMenuOpen(false)}>
                    <Button
                      variant="outline"
                      className="text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm w-full"
                    >
                      Register
                    </Button>
                  </Link>
                  <Link to="/" onClick={() => setMobileMenuOpen(false)}>
                    <Button className="bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl transition-all duration-200 w-full">
                      <UserPlus className="h-4 w-4 mr-1" />
                      Sign In
                    </Button>
                  </Link>
                </div>
              )}
              <Button
                variant="outline"
                onClick={() => {
                  navigate("/");
                  setMobileMenuOpen(false);
                }}
                className="text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm justify-center"
              >
                <Home className="h-4 w-4 mr-2" />
                Home
              </Button>
            </div>
          </div>
        )}
      </header> */}
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

      {/* Page Title */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4 sm:py-6 text-center">
          <h1 className="text-2xl sm:text-4xl font-bold text-gray-900 mb-1 sm:mb-2">
            Blogs
          </h1>
          <p className="text-gray-600 text-sm sm:text-lg">
            Connect healthcare professionals with opportunities
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="container mx-auto px-4 py-6">
        <Tabs defaultValue="blog-list" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <Link
              to="/blog-portal"
              className={`flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium rounded-sm transition-all ${
                isBlogList ? "bg-white text-black shadow" : "hover:bg-muted"
              }`}
            >
              <Building className="h-4 w-4" />
              Blog List
            </Link>
            <Link
              to="/post-blog"
              className={`flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium rounded-sm transition-all ${
                isPostBlog ? "bg-white text-black shadow" : "hover:bg-muted"
              }`}
            >
              <Building className="h-4 w-4" />
              Post Blog
            </Link>
          </TabsList>
        </Tabs>

        {/* Blog Cards */}
        <h2 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6">
          Published Blogs by Others
        </h2>
        {blogs.length === 0 ? (
          <Card>
            <CardContent className="text-center py-8 sm:py-12">
              <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-2">
                No blogs found
              </h3>
              <p className="text-gray-600 text-sm sm:text-base">
                Check back later for updates!
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {blogs.map((blog) => (
              <Card
                key={blog.id}
                className="flex flex-col justify-between h-full hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => navigate(`/blog-list/${blog.id}`)}
              >
                <CardHeader className="p-4 sm:p-6">
                  <div className="flex justify-between items-start mb-2">
                    <Badge variant="default">Published</Badge>
                  </div>
                  <CardTitle className="text-base sm:text-lg line-clamp-2">
                    {blog.title}
                  </CardTitle>
                </CardHeader>

                <CardContent className="flex flex-col justify-between flex-grow p-4 sm:p-6">
                  <div
                    className="text-xs sm:text-sm text-gray-600 line-clamp-3 mb-4"
                    dangerouslySetInnerHTML={{ __html: blog.content }}
                  />

                  <div className="mt-auto">
                    <Button
                      className="w-full text-xs sm:text-sm py-2"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/blog-list/${blog.id}`);
                      }}
                    >
                      View Blog
                    </Button>
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

export default BlogPortal;
