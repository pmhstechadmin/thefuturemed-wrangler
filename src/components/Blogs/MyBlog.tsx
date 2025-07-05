
// import React, { useEffect, useState } from 'react';
// import { supabase } from '@/integrations/supabase/client';
// import { Blog } from '../../types/blog';
// import './PostBlog.css';
// import {
//   ArrowLeft,
//   Shield,
//   UserPlus,
//   Home,
//   User,
// } from "lucide-react";
// import { useToast } from "@/hooks/use-toast";
// import { Button } from "@/components/ui/button";
// import { useNavigate, Link } from 'react-router-dom';

// const BlogList: React.FC = () => {
//   const [blogs, setBlogs] = useState<Blog[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [userId, setUserId] = useState<string | null>(null);
//   const [user, setUser] = useState<any>(null);
//   const [showPublishedOnly, setShowPublishedOnly] = useState(true);
//   const { toast } = useToast();
//   const navigate = useNavigate();

//   const handleBackNavigation = () => {
//     navigate(-1);
//   };

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
//     const fetchUserAndBlogs = async () => {
//       setLoading(true);
//       const { data: { user }, error: userError } = await supabase.auth.getUser();
//       if (userError || !user) {
//         console.error('User not found:', userError?.message);
//         setLoading(false);
//         return;
//       }

//       setUserId(user.id);

//       let query = supabase
//         .from('blog')
//         .select('*')
//         .eq('user_id', user.id)
//         .order('created_at', { ascending: false });

//       if (showPublishedOnly) {
//         query = query.eq('is_published', true);
//       }

//       const { data, error } = await query;

//       if (error) {
//         console.error('Error fetching blogs:', error.message);
//       } else {
//         setBlogs(data || []);
//       }

//       setLoading(false);
//     };

//     fetchUserAndBlogs();
//   }, [showPublishedOnly]);

//   const deleteBlog = async (id: string | undefined) => {
//     if (!id) return;
//     const confirm = window.confirm('Are you sure you want to delete this blog?');
//     if (!confirm) return;

//     const { error } = await supabase.from('blog').delete().eq('id', id);
//     if (error) {
//       alert('Error deleting blog');
//     } else {
//       setBlogs(blogs.filter((blog) => blog.id !== id));
//     }
//   };

//   const togglePublish = async (blogId: string, currentState: boolean) => {
//     const { error } = await supabase
//       .from('blog')
//       .update({ is_published: !currentState })
//       .eq('id', blogId);

//     if (error) {
//       toast({ title: "Error", description: error.message, variant: "destructive" });
//     } else {
//       setBlogs((prev) =>
//         prev.map((b) =>
//           b.id === blogId ? { ...b, is_published: !currentState } : b
//         )
//       );
//     }
//   };

//   if (loading) return <p className="text-center mt-8">Loading blogs...</p>;

//   return (
//     <div className="space-y-6">
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

//       <div className="max-w-4xl mx-auto mt-8">
//         <div className="flex items-center justify-between mb-4">
//           <h2 className="text-xl font-semibold">My Blog Posts</h2>
//           <Button
//             variant="outline"
//             onClick={() => setShowPublishedOnly(prev => !prev)}
//           >
//             {showPublishedOnly ? "Show All Blogs" : "Show Only Published"}
//           </Button>
//         </div>

//         {blogs.length === 0 ? (
//           <p>No blogs found.</p>
//         ) : (
//           blogs.map((blog) => (
//             <div key={blog.id} className="bg-white shadow p-4 rounded-lg mb-4">
//               <h3 className="text-lg font-bold">{blog.title}</h3>
//               <div
//                 className="text-gray-700 mt-1"
//                 dangerouslySetInnerHTML={{ __html: blog.content }}
//               />
//               <div className="flex gap-4 mt-3">
//                 <button
//                   onClick={() => deleteBlog(blog.id)}
//                   className="text-red-500 hover:text-red-700"
//                 >
//                   Delete
//                 </button>
//                 <button
//                   onClick={() => togglePublish(blog.id, blog.is_published)}
//                   className={`${
//                     blog.is_published ? "text-yellow-500 hover:text-yellow-700" : "text-green-500 hover:text-green-700"
//                   }`}
//                 >
//                   {blog.is_published ? "Unpublish" : "Publish"}
//                 </button>
//               </div>
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// };

// export default BlogList;





import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Blog } from '../../types/blog';
import './PostBlog.css';
import {
  ArrowLeft,
  Shield,
  UserPlus,
  Home,
  User,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { useNavigate, Link } from 'react-router-dom';

const BlogList: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);
  const [showPublishedOnly, setShowPublishedOnly] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleBackNavigation = () => {
    navigate(-1);
  };

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      setUser(null);
      toast({ title: "Signed Out", description: "You have been signed out." });
    }
  };

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error) console.error("Session error:", error);
      setUser(session?.user || null);
    };
    checkUser();
  }, []);

  useEffect(() => {
    const fetchUserAndBlogs = async () => {
      setLoading(true);
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (userError || !user) {
        console.error('User not found:', userError?.message);
        setLoading(false);
        return;
      }

      setUserId(user.id);

      let query = supabase
        .from('blog')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (showPublishedOnly) {
        query = query.eq('is_published', true);
      }

      const { data, error } = await query;

      if (error) {
        console.error('Error fetching blogs:', error.message);
      } else {
        setBlogs(data || []);
      }

      setLoading(false);
    };

    fetchUserAndBlogs();

  }, [showPublishedOnly, userId]);

  }, [showPublishedOnly]);


  const deleteBlog = async (id: string | undefined) => {
    if (!id) return;
    const confirm = window.confirm('Are you sure you want to delete this blog?');
    if (!confirm) return;

    const { error } = await supabase.from('blog').delete().eq('id', id);
    if (error) {
      alert('Error deleting blog');
    } else {
      setBlogs(blogs.filter((blog) => blog.id !== id));
    }
  };

  const togglePublish = async (blogId: string, currentState: boolean) => {
    const { error } = await supabase
      .from('blog')
      .update({ is_published: !currentState })
      .eq('id', blogId);

    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      setBlogs((prev) =>
        prev.map((b) =>
          b.id === blogId ? { ...b, is_published: !currentState } : b
        )
      );
    }
  };

  if (loading) return <p className="text-center mt-8">Loading blogs...</p>;

  return (
    <div className="space-y-6">
      <header className="bg-black border-b border-white/20 sticky top-0 z-50 shadow-xl">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="outline" onClick={handleBackNavigation} className="text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back
            </Button>
            <Link to="/" className="flex items-center space-x-2">
              <Shield className="h-8 w-8 text-blue-400" />
              <h1 className="text-2xl font-bold text-white">MedPortal</h1>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <span className="text-white text-sm bg-white/10 px-3 py-1 rounded-full">Welcome, {user.email}</span>
                <Button variant="outline" onClick={() => navigate('/profile')} className="text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm">
                  <User className="mr-2 h-4 w-4" /> Profile
                </Button>
                <Button variant="outline" onClick={handleSignOut} className="text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm">
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Link to="/register">
                  <Button variant="outline" className="text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm">Register</Button>
                </Link>
                <Link to="/">
                  <Button className="bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl transition-all duration-200">
                    <UserPlus className="mr-2 h-4 w-4" /> Sign In
                  </Button>
                </Link>
              </>
            )}
            <Button variant="outline" onClick={() => navigate('/')} className="text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm">
              <Home className="mr-2 h-4 w-4" /> Home
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto mt-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">My Blog Posts</h2>
          <Button
            variant="outline"
            onClick={() => setShowPublishedOnly(prev => !prev)}
          >
            {showPublishedOnly ? "Show All Blogs" : "Show Only Published"}
          </Button>
        </div>

        {blogs.length === 0 ? (
          <p>No blogs found.</p>
        ) : (
          blogs.map((blog) => (
            <div key={blog.id} className="bg-white shadow p-4 rounded-lg mb-4">
              <h3 className="text-lg font-bold">{blog.title}</h3>
              <div
                className="text-gray-700 mt-1"
                dangerouslySetInnerHTML={{ __html: blog.content }}
              />
              <div className="flex gap-4 mt-3">
                <button
                  onClick={() => deleteBlog(blog.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  Delete
                </button>
                <button
                  onClick={() => togglePublish(blog.id, blog.is_published)}
                  className={`${
                    blog.is_published ? "text-yellow-500 hover:text-yellow-700" : "text-green-500 hover:text-green-700"
                  }`}
                >
                  {blog.is_published ? "Unpublish" : "Publish"}
                </button>

                <button
                  onClick={() => navigate(`/edit-blog/${blog.id}`)}
                  className="text-blue-500 hover:text-blue-700"
                >
                  Edit
                </button>

              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default BlogList;
