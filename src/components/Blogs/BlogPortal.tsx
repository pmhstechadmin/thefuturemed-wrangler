// // // import { useState, useEffect } from "react";
// // // import { Button } from "@/components/ui/button";
// // // import {
// // //     Card,
// // //     CardContent,
// // //     CardHeader,
// // //     CardTitle
// // // } from "@/components/ui/card";
// // // import {
// // //     Tabs,
// // //     TabsList
// // // } from "@/components/ui/tabs";
// // // import {
// // //     Building,
// // //     ArrowLeft,
// // //     Shield,
// // //     UserPlus,
// // //     Home,
// // //     User
// // // } from "lucide-react";

// // // import { useNavigate, Link } from "react-router-dom";
// // // import { supabase } from "@/integrations/supabase/client";
// // // import type { User as SupabaseUser } from "@supabase/supabase-js";
// // // import { useToast } from "@/hooks/use-toast";
// // // import { Badge } from "@/components/ui/badge";
// // // import { useLocation } from 'react-router-dom';

// // // type Blog = {
// // //     id: string;
// // //     title: string;
// // //     content: string;
// // //     is_published: boolean;
// // //     user_id: string;
// // //     created_at: string;
// // // };

// // // const BlogPortal: React.FC = () => {
// // //     const navigate = useNavigate();
// // //     const [user, setUser] = useState<SupabaseUser | null>(null);
// // //     const [loading, setLoading] = useState(true);
// // //     const [blogs, setBlogs] = useState<Blog[]>([]);
// // //     const { toast } = useToast();
// // //     const location = useLocation();

// // //     const isBlogList = location.pathname === '/blog-portal';
// // //     const isPostBlog = location.pathname === '/post-blog';

// // //     const handleBackNavigation = () => {
// // //         if (window.history.length > 1) {
// // //             navigate(-1);
// // //         } else {
// // //             navigate('/');
// // //         }
// // //     };

// // //     const handleSignOut = async () => {
// // //         try {
// // //             const { error } = await supabase.auth.signOut();
// // //             if (error) throw error;
// // //             setUser(null);
// // //             toast({
// // //                 title: "Signed Out",
// // //                 description: "You have been successfully signed out.",
// // //             });
// // //         } catch (error) {
// // //             console.error('Sign out error:', error);
// // //             toast({
// // //                 title: "Error",
// // //                 description: "Failed to sign out. Please try again.",
// // //                 variant: "destructive",
// // //             });
// // //         }
// // //     };

// // //     useEffect(() => {
// // //         const checkUser = async () => {
// // //             try {
// // //                 const { data: { session }, error } = await supabase.auth.getSession();
// // //                 if (error) console.error('Error fetching session:', error);
// // //                 setUser(session?.user ?? null);
// // //             } catch (err) {
// // //                 console.error('Failed to fetch user:', err);
// // //             } finally {
// // //                 setLoading(false);
// // //             }
// // //         };

// // //         checkUser();
// // //     }, []);

// // //     useEffect(() => {
// // //         const fetchBlogs = async () => {
// // //             setLoading(true);
// // //             const { data: { user }, error: userError } = await supabase.auth.getUser();
// // //             if (userError || !user) {
// // //                 console.error('User not found:', userError?.message);
// // //                 setLoading(false);
// // //                 return;
// // //             }

// // //             const { data, error } = await supabase
// // //                 .from('blog')
// // //                 .select('*')
// // //                 .eq('is_published', true)
// // //                 .neq('user_id', user.id)
// // //                 .order('created_at', { ascending: false });

// // //             if (error) {
// // //                 console.error('Error fetching blogs:', error.message);
// // //             } else {
// // //                 setBlogs(data || []);
// // //             }

// // //             setLoading(false);
// // //         };

// // //         fetchBlogs();
// // //     }, []);

// // //     if (loading) return <p className="text-center mt-8">Loading blogs...</p>;

// // //     return (
// // //         <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
// // //             {/* Header */}
// // //             <header className="bg-black/30 backdrop-blur-md border-b border-white/20 sticky top-0 z-50 shadow-xl">
// // //                 <div className="container mx-auto px-4 py-4 flex items-center justify-between">
// // //                     <div className="flex items-center space-x-4">
// // //                         <Button
// // //                             variant="outline"
// // //                             onClick={handleBackNavigation}
// // //                             className="text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm"
// // //                             title="Go back"
// // //                         >
// // //                             <ArrowLeft className="mr-2 h-4 w-4" />
// // //                             Back
// // //                         </Button>
// // //                         <Link to="/" className="flex items-center space-x-2">
// // //                             <Shield className="h-8 w-8 text-blue-400" />
// // //                             <h1 className="text-2xl font-bold text-white">MedPortal</h1>
// // //                         </Link>
// // //                     </div>
// // //                     <div className="flex items-center space-x-4">
// // //                         {user ? (
// // //                             <>
// // //                                 <span className="text-white text-sm bg-white/10 px-3 py-1 rounded-full">Welcome, {user.email}</span>
// // //                                 <Button
// // //                                     variant="outline"
// // //                                     className="text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm"
// // //                                     onClick={() => navigate('/profile')}
// // //                                 >
// // //                                     <User className="mr-2 h-4 w-4" />
// // //                                     Profile
// // //                                 </Button>
// // //                                 <Button
// // //                                     variant="outline"
// // //                                     className="text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm"
// // //                                     onClick={handleSignOut}
// // //                                 >
// // //                                     Sign Out
// // //                                 </Button>
// // //                             </>
// // //                         ) : (
// // //                             <>
// // //                                 <Link to="/register">
// // //                                     <Button variant="outline" className="text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm">Register</Button>
// // //                                 </Link>
// // //                                 <Link to="/">
// // //                                     <Button className="bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl transition-all duration-200">
// // //                                         <UserPlus className="mr-2 h-4 w-4" />
// // //                                         Sign In
// // //                                     </Button>
// // //                                 </Link>
// // //                             </>
// // //                         )}
// // //                         <Button
// // //                             variant="outline"
// // //                             onClick={() => navigate('/')}
// // //                             className="text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm"
// // //                         >
// // //                             <Home className="mr-2 h-4 w-4" />
// // //                             Home
// // //                         </Button>
// // //                     </div>
// // //                 </div>
// // //             </header>

// // //             {/* Page Title */}
// // //             <div className="bg-white shadow-sm border-b">
// // //                 <div className="container mx-auto px-4 py-6 text-center">
// // //                     <h1 className="text-4xl font-bold text-gray-900 mb-2">Blogs</h1>
// // //                     <p className="text-gray-600 text-lg">Connect healthcare professionals with opportunities</p>
// // //                 </div>
// // //             </div>

// // //             {/* Tabs */}
// // //             <div className="container mx-auto px-4 py-8">
// // //                 <Tabs defaultValue="blog-list" className="w-full">
// // //                     <TabsList className="grid w-full grid-cols-2 mb-8">
// // //                         <Link
// // //                             to="/blog-portal"
// // //                             className={`flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-sm transition-all ${isBlogList ? 'bg-white text-black shadow' : 'hover:bg-muted'
// // //                                 }`}
// // //                         >
// // //                             <Building className="h-4 w-4" />
// // //                             Blog List
// // //                         </Link>
// // //                         <Link
// // //                             to="/post-blog"
// // //                             className={`flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-sm transition-all ${isPostBlog ? 'bg-white text-black shadow' : 'hover:bg-muted'
// // //                                 }`}
// // //                         >
// // //                             <Building className="h-4 w-4" />
// // //                             Post Blog
// // //                         </Link>
// // //                     </TabsList>
// // //                 </Tabs>

// // //                 {/* Blog Cards */}
// // //                 <h2 className="text-xl font-semibold mb-6">Published Blogs by Others</h2>
// // //                 {blogs.length === 0 ? (
// // //                     <Card>
// // //                         <CardContent className="text-center py-12">
// // //                             <h3 className="text-lg font-medium text-gray-900 mb-2">
// // //                                 No blogs found
// // //                             </h3>
// // //                             <p className="text-gray-600">Check back later for updates!</p>
// // //                         </CardContent>
// // //                     </Card>
// // //                 ) : (
// // //                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// // //                         {blogs.map((blog) => (
// // //                             <Card
// // //                                 key={blog.id}
// // //                                 className="flex flex-col justify-between h-full hover:shadow-lg transition-shadow cursor-pointer"
// // //                                 onClick={() => navigate(`/blog-list/${blog.id}`)}
// // //                             >
// // //                                 <CardHeader>
// // //                                     <div className="flex justify-between items-start mb-2">
// // //                                         <Badge variant="default">Published</Badge>
// // //                                     </div>
// // //                                     <CardTitle className="text-lg line-clamp-2">{blog.title}</CardTitle>
// // //                                 </CardHeader>

// // //                                 <CardContent className="flex flex-col justify-between flex-grow">
// // //                                     <div
// // //                                         className="text-sm text-gray-600 line-clamp-3 mb-4"
// // //                                         dangerouslySetInnerHTML={{ __html: blog.content }}
// // //                                     />

// // //                                     <div className="mt-auto">
// // //                                         <Button
// // //                                             className="w-full"
// // //                                             onClick={(e) => {
// // //                                                 e.stopPropagation();
// // //                                                 console.log("Blog IDddddddddd:", blog.id);
// // //                                                 navigate(`/blog-list/${blog.id}`);
// // //                                             }}
// // //                                         >
// // //                                             View Blog
// // //                                         </Button>
// // //                                     </div>
// // //                                 </CardContent>
// // //                             </Card>

// // //                         ))}
// // //                     </div>
// // //                 )}
// // //             </div>

// // //         </div>
// // //     );
// // // };

// // // export default BlogPortal;

// // // import { useState, useEffect } from "react";
// // // import { Button } from "@/components/ui/button";
// // // import {
// // //     Card,
// // //     CardContent,
// // //     CardHeader,
// // //     CardTitle
// // // } from "@/components/ui/card";
// // // import {
// // //     Tabs,
// // //     TabsList
// // // } from "@/components/ui/tabs";
// // // import {
// // //     Building,
// // //     ArrowLeft,
// // //     Shield,
// // //     UserPlus,
// // //     Home,
// // //     User
// // // } from "lucide-react";

// // // import { useNavigate, Link } from "react-router-dom";
// // // import { supabase } from "@/integrations/supabase/client";
// // // import type { User as SupabaseUser } from "@supabase/supabase-js";
// // // import { useToast } from "@/hooks/use-toast";
// // // import { Badge } from "@/components/ui/badge";
// // // import { useLocation } from 'react-router-dom';

// // // type Blog = {
// // //     id: string;
// // //     title: string;
// // //     content: string;
// // //     is_published: boolean;
// // //     user_id: string;
// // //     created_at: string;
// // // };

// // // const BlogPortal: React.FC = () => {
// // //     const navigate = useNavigate();
// // //     const [user, setUser] = useState<SupabaseUser | null>(null);
// // //     const [loading, setLoading] = useState(true);
// // //     const [blogs, setBlogs] = useState<Blog[]>([]);
// // //     const { toast } = useToast();
// // //     const location = useLocation();

// // //     const isBlogList = location.pathname === '/blog-portal';
// // //     const isPostBlog = location.pathname === '/post-blog';

// // //     const handleBackNavigation = () => {
// // //         if (window.history.length > 1) {
// // //             navigate(-1);
// // //         } else {
// // //             navigate('/');
// // //         }
// // //     };

// // //     const handleSignOut = async () => {
// // //         try {
// // //             const { error } = await supabase.auth.signOut();
// // //             if (error) throw error;
// // //             setUser(null);
// // //             toast({
// // //                 title: "Signed Out",
// // //                 description: "You have been successfully signed out.",
// // //             });
// // //         } catch (error) {
// // //             console.error('Sign out error:', error);
// // //             toast({
// // //                 title: "Error",
// // //                 description: "Failed to sign out. Please try again.",
// // //                 variant: "destructive",
// // //             });
// // //         }
// // //     };

// // //     useEffect(() => {
// // //         const checkUser = async () => {
// // //             try {
// // //                 const { data: { session }, error } = await supabase.auth.getSession();
// // //                 if (error) console.error('Error fetching session:', error);
// // //                 setUser(session?.user ?? null);
// // //             } catch (err) {
// // //                 console.error('Failed to fetch user:', err);
// // //             } finally {
// // //                 setLoading(false);
// // //             }
// // //         };

// // //         checkUser();
// // //     }, []);

// // //     useEffect(() => {
// // //         const fetchBlogs = async () => {
// // //             setLoading(true);
// // //             const { data: { user }, error: userError } = await supabase.auth.getUser();
// // //             if (userError || !user) {
// // //                 console.error('User not found:', userError?.message);
// // //                 setLoading(false);
// // //                 return;
// // //             }

// // //             const { data, error } = await supabase
// // //                 .from('blog')
// // //                 .select('*')
// // //                 .eq('is_published', true)
// // //                 .neq('user_id', user.id)
// // //                 .order('created_at', { ascending: false });

// // //             if (error) {
// // //                 console.error('Error fetching blogs:', error.message);
// // //             } else {
// // //                 setBlogs(data || []);
// // //             }

// // //             setLoading(false);
// // //         };

// // //         fetchBlogs();
// // //     }, []);

// // //     if (loading) return <p className="text-center mt-8">Loading blogs...</p>;

// // //     return (
// // //         <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
// // //             {/* Header */}
// // //             <header className="bg-black/30 backdrop-blur-md border-b border-white/20 sticky top-0 z-50 shadow-xl">
// // //                 <div className="container mx-auto px-4 py-4 flex items-center justify-between">
// // //                     <div className="flex items-center space-x-4">
// // //                         <Button
// // //                             variant="outline"
// // //                             onClick={handleBackNavigation}
// // //                             className="text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm"
// // //                             title="Go back"
// // //                         >
// // //                             <ArrowLeft className="mr-2 h-4 w-4" />
// // //                             Back
// // //                         </Button>
// // //                         <Link to="/" className="flex items-center space-x-2">
// // //                             <Shield className="h-8 w-8 text-blue-400" />
// // //                             <h1 className="text-2xl font-bold text-white">MedPortal</h1>
// // //                         </Link>
// // //                     </div>
// // //                     <div className="flex items-center space-x-4">
// // //                         {user ? (
// // //                             <>
// // //                                 <span className="text-white text-sm bg-white/10 px-3 py-1 rounded-full">Welcome, {user.email}</span>
// // //                                 <Button
// // //                                     variant="outline"
// // //                                     className="text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm"
// // //                                     onClick={() => navigate('/profile')}
// // //                                 >
// // //                                     <User className="mr-2 h-4 w-4" />
// // //                                     Profile
// // //                                 </Button>
// // //                                 <Button
// // //                                     variant="outline"
// // //                                     className="text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm"
// // //                                     onClick={handleSignOut}
// // //                                 >
// // //                                     Sign Out
// // //                                 </Button>
// // //                             </>
// // //                         ) : (
// // //                             <>
// // //                                 <Link to="/register">
// // //                                     <Button variant="outline" className="text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm">Register</Button>
// // //                                 </Link>
// // //                                 <Link to="/">
// // //                                     <Button className="bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl transition-all duration-200">
// // //                                         <UserPlus className="mr-2 h-4 w-4" />
// // //                                         Sign In
// // //                                     </Button>
// // //                                 </Link>
// // //                             </>
// // //                         )}
// // //                         <Button
// // //                             variant="outline"
// // //                             onClick={() => navigate('/')}
// // //                             className="text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm"
// // //                         >
// // //                             <Home className="mr-2 h-4 w-4" />
// // //                             Home
// // //                         </Button>
// // //                     </div>
// // //                 </div>
// // //             </header>

// // //             {/* Page Title */}
// // //             <div className="bg-white shadow-sm border-b">
// // //                 <div className="container mx-auto px-4 py-6 text-center">
// // //                     <h1 className="text-4xl font-bold text-gray-900 mb-2">Blogs</h1>
// // //                     <p className="text-gray-600 text-lg">Connect healthcare professionals with opportunities</p>
// // //                 </div>
// // //             </div>

// // //             {/* Tabs */}
// // //             <div className="container mx-auto px-4 py-8">
// // //                 <Tabs defaultValue="blog-list" className="w-full">
// // //                     <TabsList className="grid w-full grid-cols-2 mb-8">
// // //                         <Link
// // //                             to="/blog-portal"
// // //                             className={`flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-sm transition-all ${isBlogList ? 'bg-white text-black shadow' : 'hover:bg-muted'
// // //                                 }`}
// // //                         >
// // //                             <Building className="h-4 w-4" />
// // //                             Blog List
// // //                         </Link>
// // //                         <Link
// // //                             to="/post-blog"
// // //                             className={`flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-sm transition-all ${isPostBlog ? 'bg-white text-black shadow' : 'hover:bg-muted'
// // //                                 }`}
// // //                         >
// // //                             <Building className="h-4 w-4" />
// // //                             Post Blog
// // //                         </Link>
// // //                     </TabsList>
// // //                 </Tabs>

// // //                 {/* Blog Cards */}
// // //                 <h2 className="text-xl font-semibold mb-6">Published Blogs by Others</h2>
// // //                 {blogs.length === 0 ? (
// // //                     <Card>
// // //                         <CardContent className="text-center py-12">
// // //                             <h3 className="text-lg font-medium text-gray-900 mb-2">
// // //                                 No blogs found
// // //                             </h3>
// // //                             <p className="text-gray-600">Check back later for updates!</p>
// // //                         </CardContent>
// // //                     </Card>
// // //                 ) : (
// // //                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// // //                         {blogs.map((blog) => (
// // //                             <Card
// // //                                 key={blog.id}
// // //                                 className="flex flex-col justify-between h-full hover:shadow-lg transition-shadow cursor-pointer"
// // //                                 onClick={() => navigate(`/blog-list/${blog.id}`)}
// // //                             >
// // //                                 <CardHeader>
// // //                                     <div className="flex justify-between items-start mb-2">
// // //                                         <Badge variant="default">Published</Badge>
// // //                                     </div>
// // //                                     <CardTitle className="text-lg line-clamp-2">{blog.title}</CardTitle>
// // //                                 </CardHeader>

// // //                                 <CardContent className="flex flex-col justify-between flex-grow">
// // //                                     <div
// // //                                         className="text-sm text-gray-600 line-clamp-3 mb-4"
// // //                                         dangerouslySetInnerHTML={{ __html: blog.content }}
// // //                                     />

// // //                                     <div className="mt-auto">
// // //                                         <Button
// // //                                             className="w-full"
// // //                                             onClick={(e) => {
// // //                                                 e.stopPropagation();
// // //                                                 console.log("Blog IDddddddddd:", blog.id);
// // //                                                 navigate(`/blog-list/${blog.id}`);
// // //                                             }}
// // //                                         >
// // //                                             View Blog
// // //                                         </Button>
// // //                                     </div>
// // //                                 </CardContent>
// // //                             </Card>

// // //                         ))}
// // //                     </div>
// // //                 )}
// // //             </div>

// // //         </div>
// // //     );
// // // };

// // // export default BlogPortal;

// // import { useState, useEffect } from "react";
// // import { Button } from "@/components/ui/button";
// // import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// // import { Tabs, TabsList } from "@/components/ui/tabs";
// // import {
// //   Building,
// //   ArrowLeft,
// //   Shield,
// //   UserPlus,
// //   Home,
// //   User,
// //   Menu,
// //   X,
// //   LogOut,
// //   UserIcon,
// // } from "lucide-react";

// // import { useNavigate, Link } from "react-router-dom";
// // import { supabase } from "@/integrations/supabase/client";
// // import type { User as SupabaseUser } from "@supabase/supabase-js";
// // import { useToast } from "@/hooks/use-toast";
// // import { Badge } from "@/components/ui/badge";
// // import { useLocation } from "react-router-dom";
// // import logo from "@/image/thefuturemed_logo (1).jpg";
// // import {
// //   DropdownMenu,
// //   DropdownMenuContent,
// //   DropdownMenuItem,
// //   DropdownMenuLabel,
// //   DropdownMenuSeparator,
// //   DropdownMenuTrigger,
// // } from "../ui/dropdown-menu";
// // import Footer from "@/footer/Footer";
// // import Header from "@/footer/Header";

// // type Blog = {
// //   id: string;
// //   title: string;
// //   content: string;
// //   is_published: boolean;
// //   user_id: string;
// //   created_at: string;
// //   author_name?: string;
// // };

// // const BlogPortal: React.FC = () => {
// //   const navigate = useNavigate();
// //   const [user, setUser] = useState<SupabaseUser | null>(null);
// //   const [loading, setLoading] = useState(true);
// //   const [blogs, setBlogs] = useState<Blog[]>([]);
// //   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
// //   const { toast } = useToast();
// //   const location = useLocation();

// //   const isBlogList = location.pathname === "/blog-portal";
// //   const isPostBlog = location.pathname === "/post-blog";

// //   const handleBackNavigation = () => {
// //     if (window.history.length > 1) {
// //       navigate(-1);
// //     } else {
// //       navigate("/");
// //     }
// //   };

// //   const handleSignOut = async () => {
// //     try {
// //       const { error } = await supabase.auth.signOut();
// //       if (error) throw error;
// //       setUser(null);
// //       setMobileMenuOpen(false);
// //       toast({
// //         title: "Signed Out",
// //         description: "You have been successfully signed out.",
// //       });
// //     } catch (error) {
// //       console.error("Sign out error:", error);
// //       toast({
// //         title: "Error",
// //         description: "Failed to sign out. Please try again.",
// //         variant: "destructive",
// //       });
// //     }
// //   };

// //   useEffect(() => {
// //     const checkUser = async () => {
// //       try {
// //         const {
// //           data: { session },
// //           error,
// //         } = await supabase.auth.getSession();
// //         if (error) console.error("Error fetching session:", error);
// //         setUser(session?.user ?? null);
// //       } catch (err) {
// //         console.error("Failed to fetch user:", err);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     checkUser();
// //   }, []);

// //   const fetchProfileData = async (userId: string): Promise<string> => {
// //     const { data: profile, error } = await supabase
// //       .from("profiles")
// //       .select("first_name, last_name")
// //       .eq("id", userId)
// //       .single();

// //     if (error || !profile) {
// //       console.error(`Error fetching profile for userId: ${userId}`, error);
// //       return "Unknown Author";
// //     }

// //     return `${profile.first_name} ${profile.last_name}`;
// //   };

// //   useEffect(() => {
// //     const fetchProfileName = async (userId: string): Promise<string> => {
// //       const { data: profile, error } = await supabase
// //         .from("profiles")
// //         .select("first_name, last_name")
// //         .eq("id", userId)
// //         .single();

// //       if (error || !profile) {
// //         console.warn(`No profile for user ${userId}`, error);
// //         return "Unknown Author";
// //       }

// //       return `${profile.first_name} ${profile.last_name}`;
// //     };

// //     const fetchBlogs = async () => {
// //       setLoading(true);
// //       const {
// //         data: { user },
// //         error: userError,
// //       } = await supabase.auth.getUser();

// //       if (userError || !user) {
// //         console.error("User not found:", userError?.message);
// //         setLoading(false);
// //         return;
// //       }

// //       const { data: blogData, error: blogError } = await supabase
// //         .from("blog")
// //         .select("*")
// //         .eq("is_published", true)
// //         .order("created_at", { ascending: false });

// //       if (blogError) {
// //         console.error("Error fetching blogs:", blogError.message);
// //         setLoading(false);
// //         return;
// //       }

// //       // Attach author name to each blog
// //       const blogsWithAuthor = await Promise.all(
// //         (blogData || []).map(async (blog) => {
// //           const authorName = await fetchProfileName(blog.user_id);
// //           return {
// //             ...blog,
// //             author_name: authorName,
// //           };
// //         })
// //       );

// //       setBlogs(blogsWithAuthor);
// //       setLoading(false);
// //     };

// //     fetchBlogs();
// //   }, []);

// //   if (loading) return <p className="text-center mt-8">Loading blogs...</p>;

// //   return (
// //     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
// //       <Header/>

// //       {/* Page Title */}

// //       <div className="bg-white shadow-sm border-b">
// //         <div className="container mx-auto px-4 py-4 sm:py-6 text-center">
// //           <h1 className="text-2xl sm:text-4xl font-bold text-gray-900 mb-1 sm:mb-2">
// //             Blogs
// //           </h1>
// //           <p className="text-gray-600 text-sm sm:text-lg">
// //             Connect healthcare professionals with opportunities
// //           </p>
// //         </div>
// //       </div>

// //       {/* Tabs */}
// //       <div className="container mx-auto px-4 py-6">
// //         <Tabs defaultValue="blog-list" className="w-full">
// //           <TabsList className="grid w-full grid-cols-2 mb-6">
// //             <Link
// //               to="/blog-portal"
// //               className={`flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium rounded-sm transition-all ${
// //                 isBlogList ? "bg-white text-black shadow" : "hover:bg-muted"
// //               }`}
// //             >
// //               <Building className="h-4 w-4" />
// //               Blog List
// //             </Link>
// //             <Link
// //               to="/post-blog"
// //               className={`flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium rounded-sm transition-all ${
// //                 isPostBlog ? "bg-white text-black shadow" : "hover:bg-muted"
// //               }`}
// //             >
// //               <Building className="h-4 w-4" />
// //               Post Blog
// //             </Link>
// //           </TabsList>
// //         </Tabs>

// //         {/* Blog Cards */}
// //         <h2 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6">
// //           Published Blogs by Others
// //         </h2>
// //         {blogs.length === 0 ? (
// //           <Card>
// //             <CardContent className="text-center py-8 sm:py-12">
// //               <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-2">
// //                 No blogs found
// //               </h3>
// //               <p className="text-gray-600 text-sm sm:text-base">
// //                 Check back later for updates!
// //               </p>
// //             </CardContent>
// //           </Card>
// //         ) : (
// //           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
// //             {blogs.map((blog) => (
// //               <Card
// //                 key={blog.id}
// //                 className="flex flex-col justify-between h-full hover:shadow-lg transition-shadow cursor-pointer"
// //                 onClick={() => navigate(`/blog-list/${blog.id}`)}
// //               >
// //                 <CardHeader className="p-4 sm:p-6">
// //                   <div className="flex justify-between items-start mb-2">
// //                     <Badge variant="default">Published</Badge>
// //                   </div>
// //                   <CardTitle className="text-base sm:text-lg line-clamp-2">
// //                     {blog.title}
// //                   </CardTitle>
// //                 </CardHeader>

// //                 {/* <CardContent className="flex flex-col justify-between flex-grow p-4 sm:p-6">
// //                   <div className="ql-editor max-w-none">
// //                     <div dangerouslySetInnerHTML={{ __html: blog.content }} />
// //                   </div>

// //                   <div className="mt-auto">
// //                     <p className="text-xs text-gray-500 italic mb-2 text-end">
// //                       By {blog.author_name}
// //                     </p>
// //                     <Button
// //                       className="w-full text-xs sm:text-sm py-2"
// //                       onClick={(e) => {
// //                         e.stopPropagation();
// //                         navigate(`/blog-list/${blog.id}`);
// //                       }}
// //                     >
// //                       View Blog
// //                     </Button>
// //                   </div>
// //                 </CardContent> */}

// //                 <CardContent className="flex flex-col justify-between p-4 sm:p-6 h-[420px]">
// //                   <div className="overflow-hidden max-h-[220px]">
// //                     <div
// //                       className="ql-editor max-w-none prose prose-sm overflow-hidden"
// //                       style={{ padding: 0 }} // Remove extra Quill padding
// //                       dangerouslySetInnerHTML={{ __html: blog.content }}
// //                     />
// //                   </div>

// //                   <div className="mt-auto">
// //                     <p className="text-xs text-gray-500 italic mb-2 text-end">
// //                       By {blog.author_name}
// //                     </p>
// //                     <Button
// //                       className="w-full text-xs sm:text-sm py-2"
// //                       onClick={(e) => {
// //                         e.stopPropagation();
// //                         navigate(`/blog-list/${blog.id}`);
// //                       }}
// //                     >
// //                       View Blog
// //                     </Button>
// //                   </div>
// //                 </CardContent>
// //               </Card>
// //             ))}
// //           </div>
// //         )}
// //       </div>
// //       <Footer/>
// //     </div>
// //   );
// // };

// // export default BlogPortal;

// import { useState, useEffect } from "react";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Tabs, TabsList } from "@/components/ui/tabs";
// import {
//   Building,
//   ArrowLeft,
//   Shield,
//   UserPlus,
//   Home,
//   User,
//   Menu,
//   X,
//   LogOut,
//   UserIcon,
// } from "lucide-react";
// import Pagination from "react-bootstrap/Pagination";
// import "bootstrap/dist/css/bootstrap.min.css";
// import { useNavigate, Link } from "react-router-dom";
// import { supabase } from "@/integrations/supabase/client";
// import type { User as SupabaseUser } from "@supabase/supabase-js";
// import { useToast } from "@/hooks/use-toast";
// import { Badge } from "@/components/ui/badge";
// import { useLocation } from "react-router-dom";
// import logo from "@/image/thefuturemed_logo (1).jpg";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "../ui/dropdown-menu";
// import Footer from "@/footer/Footer";
// import Header from "@/footer/Header";

// type Blog = {
//   id: string;
//   title: string;
//   content: string;
//   is_published: boolean;
//   user_id: string;
//   created_at: string;
//   author_name?: string;
// };

// const BlogPortal: React.FC = () => {
//   const navigate = useNavigate();
//   const [user, setUser] = useState<SupabaseUser | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [blogs, setBlogs] = useState<Blog[]>([]);
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const { toast } = useToast();
//   const location = useLocation();
//   const [currentPage, setCurrentPage] = useState(1);
//   const blogsPerPage = 6;

//   const isBlogList = location.pathname === "/blog-portal";
//   const isPostBlog = location.pathname === "/post-blog";

//   // Calculate current blogs to display
//   const indexOfLastBlog = currentPage * blogsPerPage;
//   const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
//   const currentBlogs = blogs.slice(indexOfFirstBlog, indexOfLastBlog);

//   // Change page
//   const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

//   const handleBackNavigation = () => {
//     if (window.history.length > 1) {
//       navigate(-1);
//     } else {
//       navigate("/");
//     }
//   };

//   const handleSignOut = async () => {
//     try {
//       const { error } = await supabase.auth.signOut();
//       if (error) throw error;
//       setUser(null);
//       setMobileMenuOpen(false);
//       toast({
//         title: "Signed Out",
//         description: "You have been successfully signed out.",
//       });
//     } catch (error) {
//       console.error("Sign out error:", error);
//       toast({
//         title: "Error",
//         description: "Failed to sign out. Please try again.",
//         variant: "destructive",
//       });
//     }
//   };

//   useEffect(() => {
//     const checkUser = async () => {
//       try {
//         const {
//           data: { session },
//           error,
//         } = await supabase.auth.getSession();
//         if (error) console.error("Error fetching session:", error);
//         setUser(session?.user ?? null);
//       } catch (err) {
//         console.error("Failed to fetch user:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     checkUser();
//   }, []);

//   const fetchProfileData = async (userId: string): Promise<string> => {
//     const { data: profile, error } = await supabase
//       .from("profiles")
//       .select("first_name, last_name")
//       .eq("id", userId)
//       .single();

//     if (error || !profile) {
//       console.error(`Error fetching profile for userId: ${userId}`, error);
//       return "Unknown Author";
//     }

//     return `${profile.first_name} ${profile.last_name}`;
//   };

//   useEffect(() => {
//     const fetchProfileName = async (userId: string): Promise<string> => {
//       const { data: profile, error } = await supabase
//         .from("profiles")
//         .select("first_name, last_name")
//         .eq("id", userId)
//         .single();

//       if (error || !profile) {
//         console.warn(`No profile for user ${userId}`, error);
//         return "Unknown Author";
//       }

//       return `${profile.first_name} ${profile.last_name}`;
//     };

//     const fetchBlogs = async () => {
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

//       const { data: blogData, error: blogError } = await supabase
//         .from("blog")
//         .select("*")
//         .eq("is_published", true)
//         .order("created_at", { ascending: false });

//       if (blogError) {
//         console.error("Error fetching blogs:", blogError.message);
//         setLoading(false);
//         return;
//       }

//       // Attach author name to each blog
//       const blogsWithAuthor = await Promise.all(
//         (blogData || []).map(async (blog) => {
//           const authorName = await fetchProfileName(blog.user_id);
//           return {
//             ...blog,
//             author_name: authorName,
//           };
//         })
//       );

//       setBlogs(blogsWithAuthor);
//       setLoading(false);
//     };

//     fetchBlogs();
//   }, []);

//   if (loading)
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white">
//         <div className="loader">
//           <style jsx>{`
//             .loader {
//               --w: 10ch;
//               font-weight: bold;
//               font-family: monospace;
//               font-size: 30px;
//               line-height: 1.4em;
//               letter-spacing: var(--w);
//               width: var(--w);
//               overflow: hidden;
//               white-space: nowrap;
//               color: #0000;
//               text-shadow: calc(0 * var(--w)) 0 #000, calc(-1 * var(--w)) 0 #000,
//                 calc(-2 * var(--w)) 0 #000, calc(-3 * var(--w)) 0 #000,
//                 calc(-4 * var(--w)) 0 #000, calc(-5 * var(--w)) 0 #000,
//                 calc(-6 * var(--w)) 0 #000, calc(-7 * var(--w)) 0 #000,
//                 calc(-8 * var(--w)) 0 #000, calc(-9 * var(--w)) 0 #000;
//               animation: l20 2s infinite linear;
//             }
//             .loader:before {
//               content: "Loading...";
//             }

//             @keyframes l20 {
//               9.09% {
//                 text-shadow: calc(0 * var(--w)) -10px #000,
//                   calc(-1 * var(--w)) 0 #000, calc(-2 * var(--w)) 0 #000,
//                   calc(-3 * var(--w)) 0 #000, calc(-4 * var(--w)) 0 #000,
//                   calc(-5 * var(--w)) 0 #000, calc(-6 * var(--w)) 0 #000,
//                   calc(-7 * var(--w)) 0 #000, calc(-8 * var(--w)) 0 #000,
//                   calc(-9 * var(--w)) 0 #000;
//               }
//               18.18% {
//                 text-shadow: calc(0 * var(--w)) 0 #000,
//                   calc(-1 * var(--w)) -10px #000, calc(-2 * var(--w)) 0 #000,
//                   calc(-3 * var(--w)) 0 #000, calc(-4 * var(--w)) 0 #000,
//                   calc(-5 * var(--w)) 0 #000, calc(-6 * var(--w)) 0 #000,
//                   calc(-7 * var(--w)) 0 #000, calc(-8 * var(--w)) 0 #000,
//                   calc(-9 * var(--w)) 0 #000;
//               }
//               27.27% {
//                 text-shadow: calc(0 * var(--w)) 0 #000,
//                   calc(-1 * var(--w)) 0 #000, calc(-2 * var(--w)) -10px #000,
//                   calc(-3 * var(--w)) 0 #000, calc(-4 * var(--w)) 0 #000,
//                   calc(-5 * var(--w)) 0 #000, calc(-6 * var(--w)) 0 #000,
//                   calc(-7 * var(--w)) 0 #000, calc(-8 * var(--w)) 0 #000,
//                   calc(-9 * var(--w)) 0 #000;
//               }
//               36.36% {
//                 text-shadow: calc(0 * var(--w)) 0 #000,
//                   calc(-1 * var(--w)) 0 #000, calc(-2 * var(--w)) 0 #000,
//                   calc(-3 * var(--w)) -10px #000, calc(-4 * var(--w)) 0 #000,
//                   calc(-5 * var(--w)) 0 #000, calc(-6 * var(--w)) 0 #000,
//                   calc(-7 * var(--w)) 0 #000, calc(-8 * var(--w)) 0 #000,
//                   calc(-9 * var(--w)) 0 #000;
//               }
//               45.45% {
//                 text-shadow: calc(0 * var(--w)) 0 #000,
//                   calc(-1 * var(--w)) 0 #000, calc(-2 * var(--w)) 0 #000,
//                   calc(-3 * var(--w)) 0 #000, calc(-4 * var(--w)) -10px #000,
//                   calc(-5 * var(--w)) 0 #000, calc(-6 * var(--w)) 0 #000,
//                   calc(-7 * var(--w)) 0 #000, calc(-8 * var(--w)) 0 #000,
//                   calc(-9 * var(--w)) 0 #000;
//               }
//               54.54% {
//                 text-shadow: calc(0 * var(--w)) 0 #000,
//                   calc(-1 * var(--w)) 0 #000, calc(-2 * var(--w)) 0 #000,
//                   calc(-3 * var(--w)) 0 #000, calc(-4 * var(--w)) 0 #000,
//                   calc(-5 * var(--w)) -10px #000, calc(-6 * var(--w)) 0 #000,
//                   calc(-7 * var(--w)) 0 #000, calc(-8 * var(--w)) 0 #000,
//                   calc(-9 * var(--w)) 0 #000;
//               }
//               63.63% {
//                 text-shadow: calc(0 * var(--w)) 0 #000,
//                   calc(-1 * var(--w)) 0 #000, calc(-2 * var(--w)) 0 #000,
//                   calc(-3 * var(--w)) 0 #000, calc(-4 * var(--w)) 0 #000,
//                   calc(-5 * var(--w)) 0 #000, calc(-6 * var(--w)) -10px #000,
//                   calc(-7 * var(--w)) 0 #000, calc(-8 * var(--w)) 0 #000,
//                   calc(-9 * var(--w)) 0 #000;
//               }
//               72.72% {
//                 text-shadow: calc(0 * var(--w)) 0 #000,
//                   calc(-1 * var(--w)) 0 #000, calc(-2 * var(--w)) 0 #000,
//                   calc(-3 * var(--w)) 0 #000, calc(-4 * var(--w)) 0 #000,
//                   calc(-5 * var(--w)) 0 #000, calc(-6 * var(--w)) 0 #000,
//                   calc(-7 * var(--w)) -10px #000, calc(-8 * var(--w)) 0 #000,
//                   calc(-9 * var(--w)) 0 #000;
//               }
//               81.81% {
//                 text-shadow: calc(0 * var(--w)) 0 #000,
//                   calc(-1 * var(--w)) 0 #000, calc(-2 * var(--w)) 0 #000,
//                   calc(-3 * var(--w)) 0 #000, calc(-4 * var(--w)) 0 #000,
//                   calc(-5 * var(--w)) 0 #000, calc(-6 * var(--w)) 0 #000,
//                   calc(-7 * var(--w)) 0 #000, calc(-8 * var(--w)) -10px #000,
//                   calc(-9 * var(--w)) 0 #000;
//               }
//               90.90% {
//                 text-shadow: calc(0 * var(--w)) 0 #000,
//                   calc(-1 * var(--w)) 0 #000, calc(-2 * var(--w)) 0 #000,
//                   calc(-3 * var(--w)) 0 #000, calc(-4 * var(--w)) 0 #000,
//                   calc(-5 * var(--w)) 0 #000, calc(-6 * var(--w)) 0 #000,
//                   calc(-7 * var(--w)) 0 #000, calc(-8 * var(--w)) 0 #000,
//                   calc(-9 * var(--w)) -10px #000;
//               }
//             }
//           `}</style>
//         </div>
//       </div>
//     );

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
//       <Header />

//       {/* Page Title */}
//       <div className="bg-white shadow-sm border-b">
//         <div className="container mx-auto px-4 py-4 sm:py-6 text-center">
//           <h1 className="text-2xl sm:text-4xl font-bold text-gray-900 mb-1 sm:mb-2">
//             Blogs
//           </h1>
//           <p className="text-gray-600 text-sm sm:text-lg">
//             Connect healthcare professionals with opportunities
//           </p>
//         </div>
//       </div>

//       {/* Tabs */}
//       <div className="container mx-auto px-4 py-6">
//         <Tabs defaultValue="blog-list" className="w-full">
//           <TabsList className="grid w-full grid-cols-2 mb-6">
//             <Link
//               to="/blog-portal"
//               className={`flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium rounded-sm transition-all ${
//                 isBlogList ? "bg-white text-black shadow" : "hover:bg-muted"
//               }`}
//             >
//               <Building className="h-4 w-4" />
//               Blog List
//             </Link>
//             <Link
//               to="/post-blog"
//               className={`flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium rounded-sm transition-all ${
//                 isPostBlog ? "bg-white text-black shadow" : "hover:bg-muted"
//               }`}
//             >
//               <Building className="h-4 w-4" />
//               Post Blog
//             </Link>
//           </TabsList>
//         </Tabs>

//         {/* Blog Cards */}
//         <h2 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6">
//           Published Blogs by Others
//         </h2>
//         {/* {blogs.length === 0 ? (
//           <Card>
//             <CardContent className="text-center py-8 sm:py-12">
//               <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-2">
//                 No blogs found
//               </h3>
//               <p className="text-gray-600 text-sm sm:text-base">
//                 Check back later for updates!
//               </p>
//             </CardContent>
//           </Card>
//         ) */}

//         {loading && blogs.length === 0  ? (
//           <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white">
//             <div className="loader">
//               <style jsx>{`
//                 .loader {
//                   --w: 10ch;
//                   font-weight: bold;
//                   font-family: monospace;
//                   font-size: 30px;
//                   line-height: 1.4em;
//                   letter-spacing: var(--w);
//                   width: var(--w);
//                   overflow: hidden;
//                   white-space: nowrap;
//                   color: transparent;
//                   text-shadow: calc(0 * var(--w)) 0 currentColor,
//                     calc(-1 * var(--w)) 0 currentColor,
//                     calc(-2 * var(--w)) 0 currentColor,
//                     calc(-3 * var(--w)) 0 currentColor,
//                     calc(-4 * var(--w)) 0 currentColor,
//                     calc(-5 * var(--w)) 0 currentColor,
//                     calc(-6 * var(--w)) 0 currentColor,
//                     calc(-7 * var(--w)) 0 currentColor,
//                     calc(-8 * var(--w)) 0 currentColor,
//                     calc(-9 * var(--w)) 0 currentColor;
//                   animation: l20 2s infinite linear;
//                 }
//                 .loader:before {
//                   content: "Loading...";
//                 }

//                 @keyframes l20 {
//                   0%,
//                   100% {
//                     text-shadow: calc(0 * var(--w)) 0 currentColor,
//                       calc(-1 * var(--w)) 0 currentColor,
//                       calc(-2 * var(--w)) 0 currentColor,
//                       calc(-3 * var(--w)) 0 currentColor,
//                       calc(-4 * var(--w)) 0 currentColor,
//                       calc(-5 * var(--w)) 0 currentColor,
//                       calc(-6 * var(--w)) 0 currentColor,
//                       calc(-7 * var(--w)) 0 currentColor,
//                       calc(-8 * var(--w)) 0 currentColor,
//                       calc(-9 * var(--w)) 0 currentColor;
//                   }
//                   9.09% {
//                     text-shadow: calc(0 * var(--w)) -10px currentColor,
//                       calc(-1 * var(--w)) 0 currentColor,
//                       calc(-2 * var(--w)) 0 currentColor,
//                       calc(-3 * var(--w)) 0 currentColor,
//                       calc(-4 * var(--w)) 0 currentColor,
//                       calc(-5 * var(--w)) 0 currentColor,
//                       calc(-6 * var(--w)) 0 currentColor,
//                       calc(-7 * var(--w)) 0 currentColor,
//                       calc(-8 * var(--w)) 0 currentColor,
//                       calc(-9 * var(--w)) 0 currentColor;
//                   }
//                   18.18% {
//                     text-shadow: calc(0 * var(--w)) 0 currentColor,
//                       calc(-1 * var(--w)) -10px currentColor,
//                       calc(-2 * var(--w)) 0 currentColor,
//                       calc(-3 * var(--w)) 0 currentColor,
//                       calc(-4 * var(--w)) 0 currentColor,
//                       calc(-5 * var(--w)) 0 currentColor,
//                       calc(-6 * var(--w)) 0 currentColor,
//                       calc(-7 * var(--w)) 0 currentColor,
//                       calc(-8 * var(--w)) 0 currentColor,
//                       calc(-9 * var(--w)) 0 currentColor;
//                   }
//                   27.27% {
//                     text-shadow: calc(0 * var(--w)) 0 currentColor,
//                       calc(-1 * var(--w)) 0 currentColor,
//                       calc(-2 * var(--w)) -10px currentColor,
//                       calc(-3 * var(--w)) 0 currentColor,
//                       calc(-4 * var(--w)) 0 currentColor,
//                       calc(-5 * var(--w)) 0 currentColor,
//                       calc(-6 * var(--w)) 0 currentColor,
//                       calc(-7 * var(--w)) 0 currentColor,
//                       calc(-8 * var(--w)) 0 currentColor,
//                       calc(-9 * var(--w)) 0 currentColor;
//                   }
//                   36.36% {
//                     text-shadow: calc(0 * var(--w)) 0 currentColor,
//                       calc(-1 * var(--w)) 0 currentColor,
//                       calc(-2 * var(--w)) 0 currentColor,
//                       calc(-3 * var(--w)) -10px currentColor,
//                       calc(-4 * var(--w)) 0 currentColor,
//                       calc(-5 * var(--w)) 0 currentColor,
//                       calc(-6 * var(--w)) 0 currentColor,
//                       calc(-7 * var(--w)) 0 currentColor,
//                       calc(-8 * var(--w)) 0 currentColor,
//                       calc(-9 * var(--w)) 0 currentColor;
//                   }
//                   45.45% {
//                     text-shadow: calc(0 * var(--w)) 0 currentColor,
//                       calc(-1 * var(--w)) 0 currentColor,
//                       calc(-2 * var(--w)) 0 currentColor,
//                       calc(-3 * var(--w)) 0 currentColor,
//                       calc(-4 * var(--w)) -10px currentColor,
//                       calc(-5 * var(--w)) 0 currentColor,
//                       calc(-6 * var(--w)) 0 currentColor,
//                       calc(-7 * var(--w)) 0 currentColor,
//                       calc(-8 * var(--w)) 0 currentColor,
//                       calc(-9 * var(--w)) 0 currentColor;
//                   }
//                   54.54% {
//                     text-shadow: calc(0 * var(--w)) 0 currentColor,
//                       calc(-1 * var(--w)) 0 currentColor,
//                       calc(-2 * var(--w)) 0 currentColor,
//                       calc(-3 * var(--w)) 0 currentColor,
//                       calc(-4 * var(--w)) 0 currentColor,
//                       calc(-5 * var(--w)) -10px currentColor,
//                       calc(-6 * var(--w)) 0 currentColor,
//                       calc(-7 * var(--w)) 0 currentColor,
//                       calc(-8 * var(--w)) 0 currentColor,
//                       calc(-9 * var(--w)) 0 currentColor;
//                   }
//                   63.63% {
//                     text-shadow: calc(0 * var(--w)) 0 currentColor,
//                       calc(-1 * var(--w)) 0 currentColor,
//                       calc(-2 * var(--w)) 0 currentColor,
//                       calc(-3 * var(--w)) 0 currentColor,
//                       calc(-4 * var(--w)) 0 currentColor,
//                       calc(-5 * var(--w)) 0 currentColor,
//                       calc(-6 * var(--w)) -10px currentColor,
//                       calc(-7 * var(--w)) 0 currentColor,
//                       calc(-8 * var(--w)) 0 currentColor,
//                       calc(-9 * var(--w)) 0 currentColor;
//                   }
//                   72.72% {
//                     text-shadow: calc(0 * var(--w)) 0 currentColor,
//                       calc(-1 * var(--w)) 0 currentColor,
//                       calc(-2 * var(--w)) 0 currentColor,
//                       calc(-3 * var(--w)) 0 currentColor,
//                       calc(-4 * var(--w)) 0 currentColor,
//                       calc(-5 * var(--w)) 0 currentColor,
//                       calc(-6 * var(--w)) 0 currentColor,
//                       calc(-7 * var(--w)) -10px currentColor,
//                       calc(-8 * var(--w)) 0 currentColor,
//                       calc(-9 * var(--w)) 0 currentColor;
//                   }
//                   81.81% {
//                     text-shadow: calc(0 * var(--w)) 0 currentColor,
//                       calc(-1 * var(--w)) 0 currentColor,
//                       calc(-2 * var(--w)) 0 currentColor,
//                       calc(-3 * var(--w)) 0 currentColor,
//                       calc(-4 * var(--w)) 0 currentColor,
//                       calc(-5 * var(--w)) 0 currentColor,
//                       calc(-6 * var(--w)) 0 currentColor,
//                       calc(-7 * var(--w)) 0 currentColor,
//                       calc(-8 * var(--w)) -10px currentColor,
//                       calc(-9 * var(--w)) 0 currentColor;
//                   }
//                   90.90% {
//                     text-shadow: calc(0 * var(--w)) 0 currentColor,
//                       calc(-1 * var(--w)) 0 currentColor,
//                       calc(-2 * var(--w)) 0 currentColor,
//                       calc(-3 * var(--w)) 0 currentColor,
//                       calc(-4 * var(--w)) 0 currentColor,
//                       calc(-5 * var(--w)) 0 currentColor,
//                       calc(-6 * var(--w)) 0 currentColor,
//                       calc(-7 * var(--w)) 0 currentColor,
//                       calc(-8 * var(--w)) 0 currentColor,
//                       calc(-9 * var(--w)) -10px currentColor;
//                   }
//                 }
//               `}</style>
//             </div>
//           </div>
//         )
//         : blogs.length === 0 ? (
//           <Card>
//             <CardContent className="text-center py-8 sm:py-12">
//               <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-2">
//                 No blogs found
//               </h3>
//               <p className="text-gray-600 text-sm sm:text-base">
//                 Check back later for updates!
//               </p>
//             </CardContent>
//           </Card>
//         ) : (
//           <>
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
//               {currentBlogs.map((blog) => (
//                 <Card
//                   key={blog.id}
//                   className="flex flex-col justify-between h-full hover:shadow-lg transition-shadow cursor-pointer"
//                   onClick={() => navigate(`/blog-list/${blog.id}`)}
//                 >
//                   <CardHeader className="p-4 sm:p-6">
//                     <div className="flex justify-between items-start mb-2">
//                       <Badge variant="default">Published</Badge>
//                     </div>
//                     <CardTitle className="text-base sm:text-lg line-clamp-2">
//                       {blog.title}
//                     </CardTitle>
//                   </CardHeader>

//                   <CardContent className="flex flex-col justify-between p-4 sm:p-6 h-[420px]">
//                     <div className="overflow-hidden max-h-[220px]">
//                       <div
//                         className="ql-editor max-w-none prose prose-sm overflow-hidden"
//                         style={{ padding: 0 }}
//                         dangerouslySetInnerHTML={{ __html: blog.content }}
//                       />
//                     </div>

//                     <div className="mt-auto">
//                       <p className="text-xs text-gray-500 italic mb-2 text-end">
//                         By {blog.author_name}
//                       </p>
//                       <Button
//                         className="w-full text-xs sm:text-sm py-2"
//                         onClick={(e) => {
//                           e.stopPropagation();
//                           navigate(`/blog-list/${blog.id}`);
//                         }}
//                       >
//                         View Blog
//                       </Button>
//                     </div>
//                   </CardContent>
//                 </Card>
//               ))}
//             </div>

//             {/* Pagination */}
//             <div className="mt-8 flex justify-center">
//               <Pagination>
//                 <Pagination.First
//                   onClick={() => paginate(1)}
//                   disabled={currentPage === 1}
//                 />
//                 <Pagination.Prev
//                   onClick={() => paginate(currentPage - 1)}
//                   disabled={currentPage === 1}
//                 />

//                 {currentPage > 2 && (
//                   <Pagination.Item onClick={() => paginate(1)}>
//                     1
//                   </Pagination.Item>
//                 )}
//                 {currentPage > 3 && <Pagination.Ellipsis />}

//                 {currentPage > 1 && (
//                   <Pagination.Item onClick={() => paginate(currentPage - 1)}>
//                     {currentPage - 1}
//                   </Pagination.Item>
//                 )}
//                 <Pagination.Item active>{currentPage}</Pagination.Item>
//                 {currentPage < Math.ceil(blogs.length / blogsPerPage) && (
//                   <Pagination.Item onClick={() => paginate(currentPage + 1)}>
//                     {currentPage + 1}
//                   </Pagination.Item>
//                 )}

//                 {currentPage < Math.ceil(blogs.length / blogsPerPage) - 2 && (
//                   <Pagination.Ellipsis />
//                 )}
//                 {currentPage < Math.ceil(blogs.length / blogsPerPage) - 1 && (
//                   <Pagination.Item
//                     onClick={() =>
//                       paginate(Math.ceil(blogs.length / blogsPerPage))
//                     }
//                   >
//                     {Math.ceil(blogs.length / blogsPerPage)}
//                   </Pagination.Item>
//                 )}

//                 <Pagination.Next
//                   onClick={() => paginate(currentPage + 1)}
//                   disabled={
//                     currentPage === Math.ceil(blogs.length / blogsPerPage)
//                   }
//                 />
//                 <Pagination.Last
//                   onClick={() =>
//                     paginate(Math.ceil(blogs.length / blogsPerPage))
//                   }
//                   disabled={
//                     currentPage === Math.ceil(blogs.length / blogsPerPage)
//                   }
//                 />
//               </Pagination>
//             </div>
//           </>
//         )}
//       </div>
//       <Footer />
//     </div>
//   );
// };

// export default BlogPortal;

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList } from "@/components/ui/tabs";
import { Building } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import type { User as SupabaseUser } from "@supabase/supabase-js";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { useLocation } from "react-router-dom";
import Footer from "@/footer/Footer";
import Header from "@/footer/Header";
import Pagination from "react-bootstrap/Pagination";

import "bootstrap/dist/css/bootstrap.min.css";
import { RatingDisplay } from "../common/StarRatingDisplay";

// Loader CSS
const loaderStyles = `

.loader {
  --background: linear-gradient(135deg, #23C4F8, #275EFE);
  --shadow: rgba(39, 94, 254, 0.28);
  --text: #6C7486;
  --page: rgba(255, 255, 255, 0.36);
  --page-fold: rgba(255, 255, 255, 0.52);
  --duration: 3s;
  width: 200px;
  height: 140px;
  position: relative;
}

.loader:before, .loader:after {
  --r: -6deg;
  content: "";
  position: absolute;
  bottom: 8px;
  width: 120px;
  top: 80%;
  box-shadow: 0 16px 12px var(--shadow);
  transform: rotate(var(--r));
}

.loader:before {
  left: 4px;
}

.loader:after {
  --r: 6deg;
  right: 4px;
}

.loader div {
  width: 100%;
  height: 100%;
  border-radius: 13px;
  position: relative;
  z-index: 1;
  perspective: 600px;
  box-shadow: 0 4px 6px var(--shadow);
  background-image: var(--background);
}

.loader div ul {
  margin: 0;
  padding: 0;
  list-style: none;
  position: relative;
}

.loader div ul li {
  --r: 180deg;
  --o: 0;
  --c: var(--page);
  position: absolute;
  top: 10px;
  left: 10px;
  transform-origin: 100% 50%;
  color: var(--c);
  opacity: var(--o);
  transform: rotateY(var(--r));
  -webkit-animation: var(--duration) ease infinite;
  animation: var(--duration) ease infinite;
}

.loader div ul li:nth-child(2) {
  --c: var(--page-fold);
  -webkit-animation-name: page-2;
  animation-name: page-2;
}

.loader div ul li:nth-child(3) {
  --c: var(--page-fold);
  -webkit-animation-name: page-3;
  animation-name: page-3;
}

.loader div ul li:nth-child(4) {
  --c: var(--page-fold);
  -webkit-animation-name: page-4;
  animation-name: page-4;
}

.loader div ul li:nth-child(5) {
  --c: var(--page-fold);
  -webkit-animation-name: page-5;
  animation-name: page-5;
}

.loader div ul li svg {
  width: 90px;
  height: 120px;
  display: block;
}

.loader div ul li:first-child {
  --r: 0deg;
  --o: 1;
}

.loader div ul li:last-child {
  --o: 1;
}

.loader span {
  display: block;
  left: 0;
  right: 0;
  top: 100%;
  margin-top: 20px;
  text-align: center;
  color: var(--text);
}

@keyframes page-2 {
  0% {
    transform: rotateY(180deg);
    opacity: 0;
  }

  20% {
    opacity: 1;
  }

  35%, 100% {
    opacity: 0;
  }

  50%, 100% {
    transform: rotateY(0deg);
  }
}

@keyframes page-3 {
  15% {
    transform: rotateY(180deg);
    opacity: 0;
  }

  35% {
    opacity: 1;
  }

  50%, 100% {
    opacity: 0;
  }

  65%, 100% {
    transform: rotateY(0deg);
  }
}

@keyframes page-4 {
  30% {
    transform: rotateY(180deg);
    opacity: 0;
  }

  50% {
    opacity: 1;
  }

  65%, 100% {
    opacity: 0;
  }

  80%, 100% {
    transform: rotateY(0deg);
  }
}

@keyframes page-5 {
  45% {
    transform: rotateY(180deg);
    opacity: 0;
  }

  65% {
    opacity: 1;
  }

  80%, 100% {
    opacity: 0;
  }

  95%, 100% {
    transform: rotateY(0deg);
  }
}
`;

// Inject loader styles
const style = document.createElement("style");
style.textContent = loaderStyles;
document.head.appendChild(style);

type Blog = {
  id: string;
  title: string;
  content: string;
  is_published: boolean;
  user_id: string;
  created_at: string;
  author_name?: string;
};

const BlogPortal: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 6;
  const { toast } = useToast();
  const location = useLocation();

  const isBlogList = location.pathname === "/blog-portal";
  const isPostBlog = location.pathname === "/post-blog";

  const fetchProfileName = async (userId: string): Promise<string> => {
    const { data: profile, error } = await supabase
      .from("profiles")
      .select("first_name, last_name")
      .eq("id", userId)
      .single();
    if (error || !profile) return "Unknown Author";
    return `${profile.first_name} ${profile.last_name}`;
  };

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      const {
        data: { user },
      } = await supabase.auth.getUser();

      const { data: blogData } = await supabase
        .from("blog")
        .select("*")
        .eq("is_published", true)
        .order("created_at", { ascending: false });

      const blogsWithAuthor = await Promise.all(
        (blogData || []).map(async (blog) => {
          const authorName = await fetchProfileName(blog.user_id);
          return { ...blog, author_name: authorName };
        })
      );
      setBlogs(blogsWithAuthor);
      setLoading(false);
    };
    fetchBlogs();
  }, []);

  const indexOfLast = currentPage * blogsPerPage;
  const indexOfFirst = indexOfLast - blogsPerPage;
  const currentBlogs = blogs.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(blogs.length / blogsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <Header />

      {/* <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4 text-center">
          <h1 className="text-2xl font-bold text-gray-900">Blogs</h1>
          <p className="text-gray-600">
            Connect healthcare professionals with opportunities
          </p>
        </div>
      </div> */}
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

      <div className="container mx-auto px-4 py-6">
        {/* <Tabs defaultValue="blog-list">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <Link
              to="/blog-portal"
              className={`flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium rounded-sm transition-all ${
                isBlogList ? "bg-white text-black shadow" : "hover:bg-muted"
              }`}
            >
              <Building className="h-4 w-4" /> Blog List
            </Link>
            <Link
              to="/post-blog"
              className={`flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium rounded-sm transition-all ${
                isPostBlog ? "bg-white text-black shadow" : "hover:bg-muted"
              }`}
            >
              <Building className="h-4 w-4" /> Post Blog
            </Link>
          </TabsList>
        </Tabs> */}
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

        <h2 className="text-xl font-semibold mb-4">
          Published Blogs by Others
        </h2>

        {/* {loading ? (
          <div className="text-center"> */}
        {/* <div className="loader" />
            <p className="mt-2 font-medium text-gray-700">
              Loading... Please wait
            </p> */}
        {loading ? (
          <div className="flex flex-col items-center justify-center min-h-[300px]">
            <div className="loader">
              <div>
                <ul>
                  <li>
                    <svg fill="currentColor" viewBox="0 0 90 120">
                      <path d="M90,0 L90,120 L11,120 C4.92486775,120 0,115.075132 0,109 L0,11 C0,4.92486775 4.92486775,0 11,0 L90,0 Z M71.5,81 L18.5,81 C17.1192881,81 16,82.1192881 16,83.5 C16,84.8254834 17.0315359,85.9100387 18.3356243,85.9946823 L18.5,86 L71.5,86 C72.8807119,86 74,84.8807119 74,83.5 C74,82.1745166 72.9684641,81.0899613 71.6643757,81.0053177 L71.5,81 Z M71.5,57 L18.5,57 C17.1192881,57 16,58.1192881 16,59.5 C16,60.8254834 17.0315359,61.9100387 18.3356243,61.9946823 L18.5,62 L71.5,62 C72.8807119,62 74,60.8807119 74,59.5 C74,58.1192881 72.8807119,57 71.5,57 Z M71.5,33 L18.5,33 C17.1192881,33 16,34.1192881 16,35.5 C16,36.8254834 17.0315359,37.9100387 18.3356243,37.9946823 L18.5,38 L71.5,38 C72.8807119,38 74,36.8807119 74,35.5 C74,34.1192881 72.8807119,33 71.5,33 Z"></path>
                    </svg>
                  </li>
                  <li>
                    <svg fill="currentColor" viewBox="0 0 90 120">
                      <path d="M90,0 L90,120 L11,120 C4.92486775,120 0,115.075132 0,109 L0,11 C0,4.92486775 4.92486775,0 11,0 L90,0 Z M71.5,81 L18.5,81 C17.1192881,81 16,82.1192881 16,83.5 C16,84.8254834 17.0315359,85.9100387 18.3356243,85.9946823 L18.5,86 L71.5,86 C72.8807119,86 74,84.8807119 74,83.5 C74,82.1745166 72.9684641,81.0899613 71.6643757,81.0053177 L71.5,81 Z M71.5,57 L18.5,57 C17.1192881,57 16,58.1192881 16,59.5 C16,60.8254834 17.0315359,61.9100387 18.3356243,61.9946823 L18.5,62 L71.5,62 C72.8807119,62 74,60.8807119 74,59.5 C74,58.1192881 72.8807119,57 71.5,57 Z M71.5,33 L18.5,33 C17.1192881,33 16,34.1192881 16,35.5 C16,36.8254834 17.0315359,37.9100387 18.3356243,37.9946823 L18.5,38 L71.5,38 C72.8807119,38 74,36.8807119 74,35.5 C74,34.1192881 72.8807119,33 71.5,33 Z"></path>
                    </svg>
                  </li>
                  <li>
                    <svg fill="currentColor" viewBox="0 0 90 120">
                      <path d="M90,0 L90,120 L11,120 C4.92486775,120 0,115.075132 0,109 L0,11 C0,4.92486775 4.92486775,0 11,0 L90,0 Z M71.5,81 L18.5,81 C17.1192881,81 16,82.1192881 16,83.5 C16,84.8254834 17.0315359,85.9100387 18.3356243,85.9946823 L18.5,86 L71.5,86 C72.8807119,86 74,84.8807119 74,83.5 C74,82.1745166 72.9684641,81.0899613 71.6643757,81.0053177 L71.5,81 Z M71.5,57 L18.5,57 C17.1192881,57 16,58.1192881 16,59.5 C16,60.8254834 17.0315359,61.9100387 18.3356243,61.9946823 L18.5,62 L71.5,62 C72.8807119,62 74,60.8807119 74,59.5 C74,58.1192881 72.8807119,57 71.5,57 Z M71.5,33 L18.5,33 C17.1192881,33 16,34.1192881 16,35.5 C16,36.8254834 17.0315359,37.9100387 18.3356243,37.9946823 L18.5,38 L71.5,38 C72.8807119,38 74,36.8807119 74,35.5 C74,34.1192881 72.8807119,33 71.5,33 Z"></path>
                    </svg>
                  </li>
                  <li>
                    <svg fill="currentColor" viewBox="0 0 90 120">
                      <path d="M90,0 L90,120 L11,120 C4.92486775,120 0,115.075132 0,109 L0,11 C0,4.92486775 4.92486775,0 11,0 L90,0 Z M71.5,81 L18.5,81 C17.1192881,81 16,82.1192881 16,83.5 C16,84.8254834 17.0315359,85.9100387 18.3356243,85.9946823 L18.5,86 L71.5,86 C72.8807119,86 74,84.8807119 74,83.5 C74,82.1745166 72.9684641,81.0899613 71.6643757,81.0053177 L71.5,81 Z M71.5,57 L18.5,57 C17.1192881,57 16,58.1192881 16,59.5 C16,60.8254834 17.0315359,61.9100387 18.3356243,61.9946823 L18.5,62 L71.5,62 C72.8807119,62 74,60.8807119 74,59.5 C74,58.1192881 72.8807119,57 71.5,57 Z M71.5,33 L18.5,33 C17.1192881,33 16,34.1192881 16,35.5 C16,36.8254834 17.0315359,37.9100387 18.3356243,37.9946823 L18.5,38 L71.5,38 C72.8807119,38 74,36.8807119 74,35.5 C74,34.1192881 72.8807119,33 71.5,33 Z"></path>
                    </svg>
                  </li>
                  <li>
                    <svg fill="currentColor" viewBox="0 0 90 120">
                      <path d="M90,0 L90,120 L11,120 C4.92486775,120 0,115.075132 0,109 L0,11 C0,4.92486775 4.92486775,0 11,0 L90,0 Z M71.5,81 L18.5,81 C17.1192881,81 16,82.1192881 16,83.5 C16,84.8254834 17.0315359,85.9100387 18.3356243,85.9946823 L18.5,86 L71.5,86 C72.8807119,86 74,84.8807119 74,83.5 C74,82.1745166 72.9684641,81.0899613 71.6643757,81.0053177 L71.5,81 Z M71.5,57 L18.5,57 C17.1192881,57 16,58.1192881 16,59.5 C16,60.8254834 17.0315359,61.9100387 18.3356243,61.9946823 L18.5,62 L71.5,62 C72.8807119,62 74,60.8807119 74,59.5 C74,58.1192881 72.8807119,57 71.5,57 Z M71.5,33 L18.5,33 C17.1192881,33 16,34.1192881 16,35.5 C16,36.8254834 17.0315359,37.9100387 18.3356243,37.9946823 L18.5,38 L71.5,38 C72.8807119,38 74,36.8807119 74,35.5 C74,34.1192881 72.8807119,33 71.5,33 Z"></path>
                    </svg>
                  </li>
                  <li>
                    <svg fill="currentColor" viewBox="0 0 90 120">
                      <path d="M90,0 L90,120 L11,120 C4.92486775,120 0,115.075132 0,109 L0,11 C0,4.92486775 4.92486775,0 11,0 L90,0 Z M71.5,81 L18.5,81 C17.1192881,81 16,82.1192881 16,83.5 C16,84.8254834 17.0315359,85.9100387 18.3356243,85.9946823 L18.5,86 L71.5,86 C72.8807119,86 74,84.8807119 74,83.5 C74,82.1745166 72.9684641,81.0899613 71.6643757,81.0053177 L71.5,81 Z M71.5,57 L18.5,57 C17.1192881,57 16,58.1192881 16,59.5 C16,60.8254834 17.0315359,61.9100387 18.3356243,61.9946823 L18.5,62 L71.5,62 C72.8807119,62 74,60.8807119 74,59.5 C74,58.1192881 72.8807119,57 71.5,57 Z M71.5,33 L18.5,33 C17.1192881,33 16,34.1192881 16,35.5 C16,36.8254834 17.0315359,37.9100387 18.3356243,37.9946823 L18.5,38 L71.5,38 C72.8807119,38 74,36.8807119 74,35.5 C74,34.1192881 72.8807119,33 71.5,33 Z"></path>
                    </svg>
                  </li>
                </ul>
              </div>
              <span>Loading</span>
            </div>
          </div>
        ) : blogs.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No blogs found
              </h3>
              <p className="text-gray-600">Check back later for updates!</p>
            </CardContent>
          </Card>
        ) : (
          <>
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
  {currentBlogs.map((blog) => {
    const excerpt =
      blog.content.replace(/<[^>]+>/g, "").slice(0, 120) +
      (blog.content.length > 120 ? "..." : "");

    return (
      <Card
        key={blog.id}
        className="flex flex-col h-full rounded-2xl border border-gray-200 shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer bg-white"
        onClick={() => navigate(`/blog-list/:slug/${blog.id}`)}
      >
        {/* Header with soft accent background */}
        <CardHeader className="space-y-3 p-5 rounded-t-2xl bg-gradient-to-r from-indigo-50 to-purple-50">
          <div className="flex items-center justify-between">
            <Badge
              variant="secondary"
              className="px-2 py-1 text-xs bg-indigo-100 text-indigo-700 rounded-md"
            >
              Published
            </Badge>
            <RatingDisplay
              itemId={blog.id}
              itemType="blog"
              color="#16a34a"
              size={18}
              showText={true}
            />
          </div>

          <CardTitle className="text-lg md:text-xl font-bold leading-snug line-clamp-2 text-gray-900 hover:text-indigo-700 transition-colors">
            {blog.title}
          </CardTitle>

          <p className="text-sm text-gray-600 italic">By {blog.author_name}</p>
        </CardHeader>

        {/* Excerpt + CTA */}
        <CardContent className="flex flex-col justify-between p-5">
          <p className="text-gray-700 text-sm leading-relaxed line-clamp-3 mb-4">
            {excerpt}
          </p>

          <Button
            className="w-full text-sm py-2 rounded-lg bg-indigo-500 text-white hover:bg-indigo-600 transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/blog-list/:slug/${blog.id}`);
            }}
          >
            View Blog
          </Button>
        </CardContent>
      </Card>
    );
  })}
</div>
            {totalPages > 1 && (
              <div className="flex justify-center mt-6">
                <Pagination>
                  <Pagination.First
                    onClick={() => handlePageChange(1)}
                    disabled={currentPage === 1}
                  />
                  <Pagination.Prev
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                  />
                  {[...Array(totalPages)].map((_, index) => (
                    <Pagination.Item
                      key={index + 1}
                      active={index + 1 === currentPage}
                      onClick={() => handlePageChange(index + 1)}
                    >
                      {index + 1}
                    </Pagination.Item>
                  ))}
                  <Pagination.Next
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  />
                  <Pagination.Last
                    onClick={() => handlePageChange(totalPages)}
                    disabled={currentPage === totalPages}
                  />
                </Pagination>
              </div>
            )}
          </>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default BlogPortal;
