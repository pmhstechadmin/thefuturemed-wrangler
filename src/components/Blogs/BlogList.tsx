



// // import React, { useEffect, useState } from 'react';
// // import { useNavigate, useParams, Link } from 'react-router-dom';
// // import { supabase } from '@/integrations/supabase/client';
// // import { Blog } from '../../types/blog';
// // import {
// //   ArrowLeft,
// //   Shield,
// //   UserPlus,
// //   Home,
// //   User,
// // } from "lucide-react";
// // import { useToast } from "@/hooks/use-toast";
// // import { Button } from "@/components/ui/button";
// // import {
// //   Card,
// //   CardContent,
// //   CardHeader,
// //   CardTitle
// // } from "@/components/ui/card";
// // import { Badge } from "@/components/ui/badge";

// // const BlogList: React.FC = () => {
// //   const [blog, setBlog] = useState<Blog | null>(null);
// //   const [loading, setLoading] = useState(true);
// //   const [user, setUser] = useState<any>(null);
// //   const [blogs, setBlogs] = useState<Blog[]>([]);
// //   const { toast } = useToast();
// //   const navigate = useNavigate();
// //   const { id } = useParams();

// //   const handleBackNavigation = () => navigate(-1);

// //   const handleSignOut = async () => {
// //     const { error } = await supabase.auth.signOut();
// //     if (!error) {
// //       setUser(null);
// //       toast({ title: "Signed Out", description: "You have been signed out." });
// //     }
// //   };

// //   useEffect(() => {
// //     const checkUser = async () => {
// //       const { data: { session }, error } = await supabase.auth.getSession();
// //       if (error) console.error("Session error:", error);
// //       setUser(session?.user || null);
// //     };
// //     checkUser();
// //   }, []);

// //   useEffect(() => {
// //     const fetchBlogById = async () => {
// //       if (!id) return;
// //       setLoading(true);

// //       const { data, error } = await supabase
// //         .from('blog')
// //         .select('*')
// //         .eq('id', id)
// //         .single();

// //       if (error) {
// //         console.error('Error fetching blog:', error.message);
// //         setBlog(null);
// //       } else {
// //         setBlog(data);
// //         console.log("Received blog ID in BlogList:", data.id);
// //       }

// //       setLoading(false);
// //     };

// //     fetchBlogById();
// //   }, [id]);

// //   useEffect(() => {
// //     const fetchBlogs = async () => {
// //       setLoading(true);
// //       const { data: { user }, error: userError } = await supabase.auth.getUser();
// //       if (userError || !user) {
// //         console.error('User not found:', userError?.message);
// //         setLoading(false);
// //         return;
// //       }

// //       const { data, error } = await supabase
// //         .from('blog')
// //         .select('*')
// //         .eq('is_published', true)
// //         .neq('user_id', user.id)
// //         .order('created_at', { ascending: false });

// //       if (error) {
// //         console.error('Error fetching blogs:', error.message);
// //       } else {
// //         setBlogs(data || []);
// //       }

// //       setLoading(false);
// //     };

// //     fetchBlogs();
// //   }, []);
// //   if (loading) return <p className="text-center mt-8">Loading blog...</p>;

// //   return (
// //     <div className="space-y-6">
// //       {/* Header */}
// //       <header className="bg-black border-b border-white/20 sticky top-0 z-50 shadow-xl">
// //         <div className="container mx-auto px-4 py-4 flex items-center justify-between">
// //           <div className="flex items-center space-x-4">
// //             <Button variant="outline" onClick={handleBackNavigation} className="text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm">
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
// //                 <span className="text-white text-sm bg-white/10 px-3 py-1 rounded-full">Welcome, {user.email}</span>
// //                 <Button variant="outline" onClick={() => navigate('/profile')} className="text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm">
// //                   <User className="mr-2 h-4 w-4" /> Profile
// //                 </Button>
// //                 <Button variant="outline" onClick={handleSignOut} className="text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm">
// //                   Sign Out
// //                 </Button>
// //               </>
// //             ) : (
// //               <>
// //                 <Link to="/register">
// //                   <Button variant="outline" className="text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm">Register</Button>
// //                 </Link>
// //                 <Link to="/">
// //                   <Button className="bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl transition-all duration-200">
// //                     <UserPlus className="mr-2 h-4 w-4" /> Sign In
// //                   </Button>
// //                 </Link>
// //               </>
// //             )}
// //             <Button variant="outline" onClick={() => navigate('/')} className="text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm">
// //               <Home className="mr-2 h-4 w-4" /> Home
// //             </Button>
// //           </div>
// //         </div>
// //       </header>

// //       {/* Blog Display */}
// //     <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 m-3">

// //         {/* Left Column (2/3) */}
// //         <div className="md:col-span-2">
// //           <h2 className="text-xl font-semibold mb-4">Blog Details</h2>
// //           {!blog ? (
// //             <p className="text-center text-gray-500">Blog not found.</p>
// //           ) : (
// //             <div className="bg-white shadow p-4 rounded-lg mb-4">
// //               <h3 className="text-lg font-bold">{blog.title}</h3>
// //               <div
// //                 className="text-gray-700 mt-1"
// //                 dangerouslySetInnerHTML={{ __html: blog.content }}
// //               />
// //               <div className="text-sm text-gray-500 mt-2">
// //                 Status: {blog.is_published ? "Published" : "Unpublished"}
// //               </div>
// //             </div>
// //           )}
// //         </div>

// //         {/* Right Column (1/3) */}
// //         <div className="max-h-[600px] overflow-y-auto pr-2">
// //           <div className="grid grid-cols-1 gap-6">
// //             {blogs.map((blog) => (
// //               <Card
// //                 key={blog.id}
// //                 className="w-[95%] mx-auto flex flex-col justify-between h-full hover:shadow-lg transition-shadow cursor-pointer"
// //                 onClick={() => navigate(`/blog-list/${blog.id}`)}
// //               >
// //                 <CardHeader>
// //                   <div className="flex justify-between items-start mb-2">
// //                     <Badge variant="default">Published</Badge>
// //                   </div>
// //                   <CardTitle className="text-lg line-clamp-2">{blog.title}</CardTitle>
// //                 </CardHeader>

// //                 <CardContent className="flex flex-col justify-between flex-grow">
// //                   <div
// //                     className="text-sm text-gray-600 line-clamp-3 mb-4"
// //                     dangerouslySetInnerHTML={{ __html: blog.content }}
// //                   />

// //                   <div className="mt-auto">
// //                     <Button
// //                       className="w-full"
// //                       onClick={(e) => {
// //                         e.stopPropagation();
// //                         console.log("Blog IDddddddddd:", blog.id);
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
// //         </div>


// //       </div>


// //     </div>
// //   );
// // };

// // export default BlogList;





// import React, { useEffect, useState } from 'react';
// import { useNavigate, useParams, Link } from 'react-router-dom';
// import { supabase } from '@/integrations/supabase/client';
// import './BlogList.css';


// import { Blog } from '../../types/blog';
// import {
//   ArrowLeft,
//   Shield,
//   UserPlus,
//   Home,
//   User,
// } from "lucide-react";
// import { useToast } from "@/hooks/use-toast";
// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardHeader,
//   CardTitle
// } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";

// const BlogList: React.FC = () => {
//   const [blog, setBlog] = useState<Blog | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [user, setUser] = useState<any>(null);
//   const [blogs, setBlogs] = useState<Blog[]>([]);
//   const { toast } = useToast();
//   const navigate = useNavigate();
//   const { id } = useParams();

//   const handleBackNavigation = () => navigate(-1);

//   const handleSignOut = async () => {
//     const { error } = await supabase.auth.signOut();
//     if (!error) {
//       setUser(null);
//       toast({ title: "Signed Out", description: "You have been signed out." });
//     }
//   };

//   useEffect(() => {
//     const checkUser = async () => {
//       const { data: { session }, error } = await supabase.auth.getSession();
//       if (error) console.error("Session error:", error);
//       setUser(session?.user || null);
//     };
//     checkUser();
//   }, []);

//   useEffect(() => {
//     const fetchBlogById = async () => {
//       if (!id) return;
//       setLoading(true);

//       const { data, error } = await supabase
//         .from('blog')
//         .select('*')
//         .eq('id', id)
//         .single();

//       if (error) {
//         console.error('Error fetching blog:', error.message);
//         setBlog(null);
//       } else {
//         setBlog(data);
//         console.log("Received blog ID in BlogList:", data.id);
//       }

//       setLoading(false);
//     };

//     fetchBlogById();
//   }, [id]);

//   useEffect(() => {
//     const fetchBlogs = async () => {
//       setLoading(true);
//       const { data: { user }, error: userError } = await supabase.auth.getUser();
//       if (userError || !user) {
//         console.error('User not found:', userError?.message);
//         setLoading(false);
//         return;
//       }

//       const { data, error } = await supabase
//         .from('blog')
//         .select('*')
//         .eq('is_published', true)
//         .neq('user_id', user.id)
//         .order('created_at', { ascending: false });

//       if (error) {
//         console.error('Error fetching blogs:', error.message);
//       } else {
//         setBlogs(data || []);
//       }

//       setLoading(false);
//     };

//     fetchBlogs();
//   }, []);
//   if (loading) return <p className="text-center mt-8">Loading blog...</p>;

//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <header className="bg-black border-b border-white/20 sticky top-0 z-50 shadow-xl">
//         <div className="container mx-auto px-4 py-4 flex items-center justify-between">
//           <div className="flex items-center space-x-4">
//             <Button variant="outline" onClick={handleBackNavigation} className="text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm">
//               <ArrowLeft className="mr-2 h-4 w-4" /> Back
//             </Button>
//             <Link to="/" className="flex items-center space-x-2">
//               <Shield className="h-8 w-8 text-blue-400" />
//               <h1 className="text-2xl font-bold text-white">MedPortal</h1>
//             </Link>
//           </div>
//           <div className="flex items-center space-x-4">
//             {user ? (
//               <>
//                 <span className="text-white text-sm bg-white/10 px-3 py-1 rounded-full">Welcome, {user.email}</span>
//                 <Button variant="outline" onClick={() => navigate('/profile')} className="text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm">
//                   <User className="mr-2 h-4 w-4" /> Profile
//                 </Button>
//                 <Button variant="outline" onClick={handleSignOut} className="text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm">
//                   Sign Out
//                 </Button>
//               </>
//             ) : (
//               <>
//                 <Link to="/register">
//                   <Button variant="outline" className="text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm">Register</Button>
//                 </Link>
//                 <Link to="/">
//                   <Button className="bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl transition-all duration-200">
//                     <UserPlus className="mr-2 h-4 w-4" /> Sign In
//                   </Button>
//                 </Link>
//               </>
//             )}
//             <Button variant="outline" onClick={() => navigate('/')} className="text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm">
//               <Home className="mr-2 h-4 w-4" /> Home
//             </Button>
//           </div>
//         </div>
//       </header>

//       {/* Blog Display */}
//     <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 m-3">

//         {/* Left Column (2/3) */}
//      <div className="md:col-span-2">
//   <h2 className="text-xl font-semibold mb-4">Blog Details</h2>
//   {!blog ? (
//     <p className="text-center text-gray-500">Blog not found.</p>
//   ) : (
//     <div className="bg-white shadow p-4 rounded-lg mb-4 space-y-4">
//       <h3 className="text-lg font-bold">{blog.title}</h3>

//       <div
//         className="text-gray-700"
//         dangerouslySetInnerHTML={{ __html: blog.content }}
//       />

//       <div className="text-sm text-gray-500">
//         Status: {blog.is_published ? "Published" : "Unpublished"}
//       </div>

//       {/* 👍 Like Button */}
//       <div className="flex items-center space-x-3 mt-4">
//         <button className="bg-blue-500 hover:bg-blue-600 text-white text-sm px-3 py-1 rounded">
//           👍 Like
//         </button>
//         <span className="text-sm text-gray-600">12 Likes</span> {/* Replace with dynamic */}
//       </div>

//       {/* 💬 Comment Box */}
//       <div className="mt-4">
//         <h4 className="text-md font-semibold mb-2">Comments</h4>
//         <textarea
//           placeholder="Write a comment..."
//           className="w-full p-2 border rounded mb-2"
//           rows={3}
//         />
//         <button className="bg-green-600 hover:bg-green-700 text-white text-sm px-4 py-1 rounded">
//           Post Comment
//         </button>

//         {/* Sample comment */}
//         <div className="mt-4 space-y-2">
//           <div className="border p-2 rounded bg-gray-50">
//             <p className="text-sm">Great post! Very helpful.</p>
//             <span className="text-xs text-gray-400">– user@example.com</span>
//           </div>
//         </div>
//       </div>
//     </div>
//   )}
// </div>


//         {/* Right Column (1/3) */}
//         <div className="max-h-[100% overflow-y-auto pr-2 scrollbar-none" style={{ scrollbarWidth: 'none' }}>

//           <div className="grid grid-cols-1 gap-6">
//             {blogs.map((blog) => (
//               <Card
//                 key={blog.id}
//                 className="w-[95%] mx-auto flex flex-col justify-between h-full hover:shadow-lg transition-shadow cursor-pointer"
//                 onClick={() => navigate(`/blog-list/${blog.id}`)}
//               >
//                 <CardHeader>
//                   <div className="flex justify-between items-start mb-2">
//                     <Badge variant="default">Published</Badge>
//                   </div>
//                   <CardTitle className="text-lg line-clamp-2">{blog.title}</CardTitle>
//                 </CardHeader>

//                 <CardContent className="flex flex-col justify-between flex-grow">
//                   <div
//                     className="text-sm text-gray-600 line-clamp-3 mb-4"
//                     dangerouslySetInnerHTML={{ __html: blog.content }}
//                   />

//                   <div className="mt-auto">
//                     <Button
//                       className="w-full"
//                       onClick={(e) => {
//                         e.stopPropagation();
//                         console.log("Blog IDddddddddd:", blog.id);
//                         navigate(`/blog-list/${blog.id}`);
//                       }}
//                     >
//                       View Blog
//                     </Button>
//                   </div>
//                 </CardContent>
//               </Card>
//             ))}
//           </div>
//         </div>


//       </div>


//     </div>
//   );
// };

// export default BlogList;





import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import "./BlogList.css";
import { Blog } from "../../types/blog";
import { ArrowLeft, Shield, UserPlus, Home, User, Menu, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import logo from "@/image/thefuturemed_logo (1).jpg";
import "react-quill/dist/quill.snow.css";


const BlogList: React.FC = () => {
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profiles, setProfiles] = useState<{ [userId: string]: string }>({});

  const { toast } = useToast();
  const navigate = useNavigate();
  const { id } = useParams();

  const handleBackNavigation = () => navigate(-1);

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      setUser(null);
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
    const fetchBlogById = async () => {
      if (!id) return;
      setLoading(true);

      const { data, error } = await supabase
        .from("blog")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.error("Error fetching blog:", error.message);
        setBlog(null);
      } else {
        console.log("✅ Blog data fetchedddddddddd:", data);
        setBlog(data);
      }

      setLoading(false);
    };

    fetchBlogById();
  }, [id]);

  useEffect(() => {
    const fetchBlogsAndAuthors = async () => {
      setLoading(true);

      // Fetch blogs
      const { data: blogsData, error: blogsError } = await supabase
        .from("blog")
        .select("*")
        .eq("is_published", true)
        .order("created_at", { ascending: false });

      if (blogsError) {
        console.error("Error fetching blogs:", blogsError.message);
        setLoading(false);
        return;
      }

      setBlogs(blogsData || []);

      // Extract unique user_ids
      const userIds = [...new Set((blogsData || []).map((b) => b.user_id))];

      // Fetch corresponding profiles
      const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .select("id, first_name, last_name")
        .in("id", userIds);

      if (profileError) {
        console.error("Error fetching profiles:", profileError.message);
        setLoading(false);
        return;
      }

      // Convert array to map for quick lookup
      const profilesMap: { [userId: string]: string } = {};
      profileData?.forEach((profile) => {
        profilesMap[profile.id] = `${profile.first_name ?? ""} ${profile.last_name ?? ""}`.trim() || "Unknown Author";
      });

      setProfiles(profilesMap);
      setLoading(false);
    };

    fetchBlogsAndAuthors();
  }, []);


  if (loading)
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
        <div className="flex justify-center items-center h-screen">
          <p>Loading blog...</p>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      {/* Responsive Header */}
      <header className="bg-black border-b border-white/20 sticky top-0 z-50 shadow-xl">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2 md:space-x-4">
            <Button
              variant="outline"
              onClick={handleBackNavigation}
              className="text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm p-2 md:p-2"
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

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2">
            <Button
              variant="outline"
              onClick={() => navigate("/")}
              className="text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm"
            >
              <Home className="mr-2 h-4 w-4" />
              Home
            </Button>

            {user ? (
              <>
                <span className="text-white text-sm bg-white/10 px-3 py-1 rounded-full hidden lg:block">
                  Welcome, {user.email}
                </span>
                <Button
                  variant="outline"
                  className="text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm"
                  onClick={() => navigate("/profile")}
                >
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </Button>
                <Button
                  variant="outline"
                  className="text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm"
                  onClick={handleSignOut}
                >
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Link to="/register">
                  <Button
                    variant="outline"
                    className="text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm"
                  >
                    Register
                  </Button>
                </Link>
                <Link to="/">
                  <Button className="bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl transition-all duration-200">
                    <UserPlus className="mr-2 h-4 w-4" />
                    Sign In
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="outline"
              onClick={(e) => {
                e.stopPropagation();
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              className="text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm p-2"
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div
            className="md:hidden bg-black border-t border-white/20 py-3 px-4 absolute w-full z-50"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col space-y-3">
              <Button
                variant="outline"
                onClick={() => {
                  navigate("/");
                  setMobileMenuOpen(false);
                }}
                className="text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm w-full"
              >
                <Home className="mr-2 h-4 w-4" />
                Home
              </Button>

              {user ? (
                <>
                  <Button
                    variant="outline"
                    onClick={() => {
                      navigate("/profile");
                      setMobileMenuOpen(false);
                    }}
                    className="text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm w-full"
                  >
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      handleSignOut();
                      setMobileMenuOpen(false);
                    }}
                    className="text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm w-full"
                  >
                    Sign Out
                  </Button>
                </>
              ) : (
                <>
                  <Link to="/register" className="w-full">
                    <Button
                      variant="outline"
                      className="text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm w-full"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Register
                    </Button>
                  </Link>
                  <Link to="/" className="w-full">
                    <Button
                      className="bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl transition-all duration-200 w-full"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <UserPlus className="mr-2 h-4 w-4" />
                      Sign In
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Blog Details (Full width on mobile, 2/3 on desktop) */}
          <div className="lg:col-span-2">
            <h2 className="text-xl font-semibold mb-4">Blog Details</h2>
            {!blog ? (
              <div className="bg-white shadow rounded-lg p-6 text-center">
                <p className="text-gray-500">Blog not found.</p>
              </div>
            ) : (
              <div className="bg-white shadow rounded-lg p-4 md:p-6 space-y-4">
                <h3 className="text-xl md:text-2xl font-bold">{blog.title}</h3>

                <div className="ql-editor max-w-none">
                  <div dangerouslySetInnerHTML={{ __html: blog.content }} />
                </div>


                {/* Author & Status at bottom */}
                <div className="flex justify-between items-center text-sm text-gray-500 mt-4">
                  <p>By {profiles[blog.user_id] || "Unknown Author"}</p>
                  <p>Status: {blog.is_published ? "Published" : "Unpublished"}</p>
                </div>
              </div>

            )}
          </div>

          {/* Blog List Sidebar (Full width on mobile, 1/3 on desktop) */}
          <div className="lg:col-span-1">
            <h2 className="text-xl font-semibold mb-4">Other Blogs</h2>
            <div className="space-y-4 pr-1 max-h-[80vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
              {/* changed */}
              {blogs.length === 0 ? (
                <div className="bg-white shadow rounded-lg p-6 text-center">
                  <p className="text-gray-500">No other blogs available</p>
                </div>
              ) : (
                blogs.map((blog) => (
                  <Card
                    key={blog.id}
                    className="hover:shadow-lg transition-shadow cursor-pointer h-[420px] flex flex-col"
                    onClick={() => navigate(`/blog-list/${blog.id}`)}
                  >
                    <CardHeader>
                      <div className="flex justify-between items-start mb-2">
                        <Badge variant="default">Published</Badge>
                      </div>
                      <CardTitle className="text-base md:text-lg line-clamp-2">
                        {blog.title}
                      </CardTitle>
                    </CardHeader>

                    <CardContent className="flex flex-col flex-grow">
                      {/* ✅ Scrollable preview content area */}
                      <div
                        className="ql-editor max-w-none text-sm overflow-hidden max-h-[150px] px-0"
                      >
                        <div dangerouslySetInnerHTML={{ __html: blog.content }} />
                      </div>

                      {/* ✅ Footer content pushed to bottom */}
                      <div className="mt-auto pt-2">
                        <p className="text-xs text-gray-500">
                          By {profiles[blog.user_id] || "Unknown Author"}
                        </p>
                        <Button
                          className="w-full mt-2"
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

                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogList;

