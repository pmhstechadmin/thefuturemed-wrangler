
// import React, { useEffect, useState } from 'react';
// import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.snow.css';
// import { supabase } from '@/integrations/supabase/client';
// import { Blog } from '../../types/blog';

// const modules = {
//   toolbar: [
//     [{ header: [1, 2, 3, false] }],
//     ['bold', 'italic', 'underline', 'strike'],
//     [{ color: [] }, { background: [] }],
//     [{ list: 'ordered' }, { list: 'bullet' }],
//     [{ indent: '-1' }, { indent: '+1' }],
//     [{ align: [] }],
//     ['link', 'image', 'video'],
//     ['clean'],
//   ],
// };

// const formats = [
//   'header',
//   'bold',
//   'italic',
//   'underline',
//   'strike',
//   'color',
//   'background',
//   'list',
//   'bullet',
//   'indent',
//   'align',
//   'link',
//   'image',
//   'video',
// ];

// const PostBlog: React.FC<{ onBlogPosted: () => void }> = ({ onBlogPosted }) => {
//   const [formData, setFormData] = useState<Blog>({ title: '', content: '' });
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState<string | null>(null);
//   const [user, setUser] = useState<any>(null);

//   useEffect(() => {
//     const checkUser = async () => {
//       const { data: { session } } = await supabase.auth.getSession();
//       setUser(session?.user || null);
//     };
//     checkUser();
//   }, []);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleContentChange = (value: string) => {
//     setFormData({ ...formData, content: value });
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     setMessage(null);

//     const {
//       data: { user },
//       error: userError,
//     } = await supabase.auth.getUser();

//     if (userError || !user) {
//       setMessage('❌ Unable to identify user. Please sign in.');
//       setLoading(false);
//       return;
//     }

//     const { error } = await supabase.from('blog').insert([
//       {
//         title: formData.title,
//         content: formData.content,
//         user_id: user.id,
//       },
//     ]);

//     if (error) {
//       setMessage(`❌ Error: ${error.message}`);
//     } else {
//       setMessage('✅ Blog posted successfully!');
//       setFormData({ title: '', content: '' });
//       onBlogPosted();
//     }

//     setLoading(false);
//   };

//   return (
//     <div className="max-w-4xl mx-auto mt-6 p-6 bg-white shadow rounded-lg">
//       <h2 className="text-xl font-bold mb-4">Post a Blog</h2>
//       <form onSubmit={handleSubmit} className="space-y-6">
//         <input
//           type="text"
//           name="title"
//           value={formData.title}
//           onChange={handleChange}
//           placeholder="Title"
//           className="w-full p-2 border rounded"
//           required
//         />

//         <div>
//           <label className="font-semibold mb-1 block">Content</label>
//           <ReactQuill
//             value={formData.content}
//             onChange={handleContentChange}
//             className="bg-white"
//             theme="snow"
//             modules={modules}
//             formats={formats}
//           />
//         </div>

//         <button
//           type="submit"
//           className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//           disabled={loading}
//         >
//           {loading ? 'Posting...' : 'Post Blog'}
//         </button>
//         {message && <p className="text-sm mt-2">{message}</p>}
//       </form>
//     </div>
//   );
// };

// export default PostBlog;




// import React, { useEffect, useState } from 'react';
// import ReactQuill, { Quill } from 'react-quill';
// import 'react-quill/dist/quill.snow.css';
// import { supabase } from '@/integrations/supabase/client';
// import { Blog } from '../../types/blog';
// import ImageResize from 'quill-image-resize-module-react';
// import { Button } from "@/components/ui/button";
// import { useNavigate ,Link } from 'react-router-dom';
// import { useToast } from "@/hooks/use-toast";
// import {
//     Building,
//     ArrowLeft,
//     Shield,
//     UserPlus,
//     Home,
//     User
// } from "lucide-react";
// // Register the image resize module
// Quill.register('modules/imageResize', ImageResize);

// const modules = {
//   toolbar: [
//     [{ header: [1, 2, 3, false] }],
//     ['bold', 'italic', 'underline', 'strike'],
//     [{ color: [] }, { background: [] }],
//     [{ list: 'ordered' }, { list: 'bullet' }],
//     [{ indent: '-1' }, { indent: '+1' }],
//     [{ align: [] }],
//     ['link', 'image', 'video'],
//     ['clean'],
//   ],
//   imageResize: {
//     parchment: Quill.import('parchment'),
//   },
// };

// const formats = [
//   'header',
//   'bold',
//   'italic',
//   'underline',
//   'strike',
//   'color',
//   'background',
//   'list',
//   'bullet',
//   'indent',
//   'align',
//   'link',
//   'image',
//   'video',
// ];

// const PostBlog: React.FC<{ onBlogPosted: () => void }> = ({ onBlogPosted }) => {
//   const [formData, setFormData] = useState<Blog>({ title: '', content: '' });
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState<string | null>(null);
//   const [user, setUser] = useState<any>(null);
//   const { toast } = useToast();
//    const navigate = useNavigate();


  
//     const handleBackNavigation = () => {
//         if (window.history.length > 1) {
//             navigate(-1);
//         } else {
//             navigate('/');
//         }
//     };

//       const handleSignOut = async () => {
//             try {
//                 const { error } = await supabase.auth.signOut();
//                 if (error) throw error;
//                 setUser(null);
//                 toast({
//                     title: "Signed Out",
//                     description: "You have been successfully signed out.",
//                 });
//             } catch (error) {
//                 console.error('Sign out error:', error);
//                 toast({
//                     title: "Error",
//                     description: "Failed to sign out. Please try again.",
//                     variant: "destructive",
//                 });
//             }
//         };

//   useEffect(() => {
//     const checkUser = async () => {
//       const { data: { session } } = await supabase.auth.getSession();
//       setUser(session?.user || null);
//     };
//     checkUser();
//   }, []);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleContentChange = (value: string) => {
//     setFormData({ ...formData, content: value });
//   };

// const handleSubmit = async (e: React.FormEvent) => {
//   e.preventDefault();
//   setLoading(true);
//   setMessage(null);

//   const {
//     data: { user },
//     error: userError,
//   } = await supabase.auth.getUser();

//   if (userError || !user) {
//     setMessage('❌ Unable to identify user. Please sign in.');
//     setLoading(false);
//     return;
//   }

//   const blogData = {
//     title: formData.title,
//     content: formData.content,
//     user_id: user.id,
//   };

//   console.log("Posting blog with data:", blogData); // ✅ Log what’s being sent

//   const { error } = await supabase.from('blog').insert([blogData]);

//   if (error) {
//     setMessage(`❌ Error: ${error.message}`);
//   } else {
//     setMessage('✅ Blog posted successfully!');
//     setFormData({ title: '', content: '' });
//     onBlogPosted();
//   }

//   setLoading(false);
// };


//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">

//     <header className="bg-black border-b border-white/20 sticky top-0 z-50 shadow-xl">
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

//     <div className="max-w-4xl mx-auto mt-6 p-6 bg-white shadow rounded-lg">
//       <h2 className="text-xl font-bold mb-4">Post a Blog</h2>
//       <form onSubmit={handleSubmit} className="space-y-6">
//         <input
//           type="text"
//           name="title"
//           value={formData.title}
//           onChange={handleChange}
//           placeholder="Title"
//           className="w-full p-2 border rounded"
//           required
//         />

//         <div>
//           <label className="font-semibold mb-1 block">Content</label>
//           <ReactQuill
//             value={formData.content}
//             onChange={handleContentChange}
//             className="bg-white"
//             theme="snow"
//             modules={modules}
//             formats={formats}
//           />
//         </div>

//         <button
//           type="submit"
//           className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//           disabled={loading}
//         >
//           {loading ? 'Posting...' : 'Post Blog'}
//         </button>
//         {message && <p className="text-sm mt-2">{message}</p>}
//       </form>
//     </div>
//     </div>
//   );
// };

// export default PostBlog;





import React, { useEffect, useState } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { supabase } from '@/integrations/supabase/client';
import { Blog } from '../../types/blog';
import ImageResize from 'quill-image-resize-module-react';
import { Button } from "@/components/ui/button";

import { useNavigate, Link } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";
import {
  Building,
  ArrowLeft,
  Shield,
  UserPlus,
  Home,
  User
} from "lucide-react";


import { useNavigate ,Link } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";
import {
    Building,
    ArrowLeft,
    Shield,
    UserPlus,
    Home,
    User
} from "lucide-react";
// Register the image resize module

Quill.register('modules/imageResize', ImageResize);

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ color: [] }, { background: [] }],
    [{ list: 'ordered' }, { list: 'bullet' }],
    [{ indent: '-1' }, { indent: '+1' }],
    [{ align: [] }],
    ['link', 'image', 'video'],
    ['clean'],
  ],
  imageResize: {
    parchment: Quill.import('parchment'),
  },
};

const formats = [
  'header',
  'bold',
  'italic',
  'underline',
  'strike',
  'color',
  'background',
  'list',
  'bullet',
  'indent',
  'align',
  'link',
  'image',
  'video',
];

const PostBlog: React.FC<{ onBlogPosted: () => void }> = ({ onBlogPosted }) => {
  const [formData, setFormData] = useState<Blog>({ title: '', content: '' });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);
  const { toast } = useToast();

  const navigate = useNavigate();

  const handleBackNavigation = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  const handleSignOut = async () => {
    try {
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

   const navigate = useNavigate();


  
    const handleBackNavigation = () => {
        if (window.history.length > 1) {
            navigate(-1);
        } else {
            navigate('/');
        }
    };

      const handleSignOut = async () => {
            try {
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


  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user || null);
    };
    checkUser();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleContentChange = (value: string) => {
    setFormData({ ...formData, content: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      setMessage('❌ Unable to identify user. Please sign in.');
      setLoading(false);
      return;
    }


    const editorHtml = document.querySelector('.ql-editor')?.innerHTML || formData.content;

    const blogData = {
      title: formData.title,
      content: editorHtml,
      user_id: user.id,
    };

    const { error } = await supabase.from('blog').insert([blogData]);

    const { error } = await supabase.from('blog').insert([
      {
        title: formData.title,
        content: formData.content,
        user_id: user.id,
      },
    ]);


    if (error) {
      setMessage(`❌ Error: ${error.message}`);
    } else {
      setMessage('✅ Blog posted successfully!');
      setFormData({ title: '', content: '' });
      onBlogPosted();
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">

      <header className="bg-black border-b border-white/20 sticky top-0 z-50 shadow-xl">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              onClick={handleBackNavigation}
              className="text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm"
              title="Go back"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
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
                <Button
                  variant="outline"
                  className="text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm"
                  onClick={() => navigate('/profile')}
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
                  <Button variant="outline" className="text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm">Register</Button>
                </Link>
                <Link to="/">
                  <Button className="bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl transition-all duration-200">
                    <UserPlus className="mr-2 h-4 w-4" />
                    Sign In
                  </Button>
                </Link>
              </>
            )}
            <Button
              variant="outline"
              onClick={() => navigate('/')}
              className="text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm"
            >
              <Home className="mr-2 h-4 w-4" />
              Home
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto mt-6 p-6 bg-white shadow rounded-lg">
        <h2 className="text-xl font-bold mb-4">Post a Blog</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Title"
            className="w-full p-2 border rounded"
            required
          />

          <div>
            <label className="font-semibold mb-1 block">Content</label>
            <ReactQuill
              value={formData.content}
              onChange={handleContentChange}
              className="bg-white"
              theme="snow"
              modules={modules}
              formats={formats}
            />
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            disabled={loading}
          >
            {loading ? 'Posting...' : 'Post Blog'}
          </button>
          {message && <p className="text-sm mt-2">{message}</p>}
        </form>
      </div>


    <header className="bg-black border-b border-white/20 sticky top-0 z-50 shadow-xl">
                <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <Button
                            variant="outline"
                            onClick={handleBackNavigation}
                            className="text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm"
                            title="Go back"
                        >
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back
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
                                <Button
                                    variant="outline"
                                    className="text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm"
                                    onClick={() => navigate('/profile')}
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
                                    <Button variant="outline" className="text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm">Register</Button>
                                </Link>
                                <Link to="/">
                                    <Button className="bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl transition-all duration-200">
                                        <UserPlus className="mr-2 h-4 w-4" />
                                        Sign In
                                    </Button>
                                </Link>
                            </>
                        )}
                        <Button
                            variant="outline"
                            onClick={() => navigate('/')}
                            className="text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm"
                        >
                            <Home className="mr-2 h-4 w-4" />
                            Home
                        </Button>
                    </div>
                </div>
            </header>

    <div className="max-w-4xl mx-auto mt-6 p-6 bg-white shadow rounded-lg">
      <h2 className="text-xl font-bold mb-4">Post a Blog</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Title"
          className="w-full p-2 border rounded"
          required
        />

        <div>
          <label className="font-semibold mb-1 block">Content</label>
          <ReactQuill
            value={formData.content}
            onChange={handleContentChange}
            className="bg-white"
            theme="snow"
            modules={modules}
            formats={formats}
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? 'Posting...' : 'Post Blog'}
        </button>
        {message && <p className="text-sm mt-2">{message}</p>}
      </form>
    </div>

    </div>
  );
};

export default PostBlog;
