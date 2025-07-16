

// import React, { useEffect, useState } from "react";
// import ReactQuill, { Quill } from "react-quill";
// import "react-quill/dist/quill.snow.css";
// import { supabase } from "@/integrations/supabase/client";
// import { Blog } from "../../types/blog";
// import ImageResize from "quill-image-resize-module-react";
// import { Button } from "@/components/ui/button";
// import { useNavigate, Link } from "react-router-dom";
// import { useToast } from "@/hooks/use-toast";
// import { ArrowLeft, Shield, UserPlus, Home, User, Menu, X } from "lucide-react";
// import logo from "@/image/thefuturemed_logo (1).jpg";



// // Register the image resize module
// Quill.register("modules/imageResize", ImageResize);

// const modules = {
//   toolbar: [
//     [{ header: [1, 2, 3, false] }],
//     ["bold", "italic", "underline", "strike"],
//     [{ color: [] }, { background: [] }],
//     [{ list: "ordered" }, { list: "bullet" }],
//     [{ indent: "-1" }, { indent: "+1" }],
//     [{ align: [] }],
//     ["link", "image", "video"],
//     ["clean"],
//   ],
//   imageResize: {
//     parchment: Quill.import("parchment"),
//   },
// };

// const formats = [
//   "header",
//   "bold",
//   "italic",
//   "underline",
//   "strike",
//   "color",
//   "background",
//   "list",
//   "bullet",
//   "indent",
//   "align",
//   "link",
//   "image",
//   "video",
// ];

// const PostBlog: React.FC<{ onBlogPosted: () => void }> = ({ onBlogPosted }) => {
//   const [formData, setFormData] = useState<Blog>({ title: "", content: "" });
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState<string | null>(null);
//   const [user, setUser] = useState<any>(null);
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const { toast } = useToast();
//   const navigate = useNavigate();

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
//       const {
//         data: { session },
//       } = await supabase.auth.getSession();
//       setUser(session?.user || null);
//     };
//     checkUser();
//   }, []);

// const fetchProfileData = async (userId: string) => {
//   try {
//     setLoading(true);

//     const { data, error } = await supabase
//       .from("profiles")
//       .select("username")
//       .eq("id", userId)
//       .single();

//     if (error) {
//       console.error("Error fetching username:", error.message);
//     } else {
//       console.log("Fetched username:", data.username);
//       setProfile(data); // data = { username: "..." }
//     }
//   } catch (err) {
//     console.error("Unexpected error:", err);
//   } finally {
//     setLoading(false);
//   }
// };


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
//       setMessage("❌ Unable to identify user. Please sign in.");
//       setLoading(false);
//       return;
//     }

//     const editorHtml =
//       document.querySelector(".ql-editor")?.innerHTML || formData.content;
//     const blogData = {
//       title: formData.title,
//       content: editorHtml,
//       user_id: user.id,
//     };

//     const { error } = await supabase.from("blog").insert([blogData]);

//     if (error) {
//       setMessage(`❌ Error: ${error.message}`);
//     } else {
//       setMessage("✅ Blog posted successfully!");
//       setFormData({ title: "", content: "" });
//       onBlogPosted();
//     }

//     setLoading(false);
//   };

//   // Close mobile menu when clicking outside
//   useEffect(() => {
//     const handleClickOutside = () => {
//       if (mobileMenuOpen) setMobileMenuOpen(false);
//     };

//     document.addEventListener("click", handleClickOutside);
//     return () => document.removeEventListener("click", handleClickOutside);
//   }, [mobileMenuOpen]);

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
//       {/* Header */}
//       <header className="bg-black border-b border-white/20 sticky top-0 z-50 shadow-xl">
//         <div className="container mx-auto px-4 py-4 flex items-center justify-between">
//           <div className="flex items-center space-x-2 md:space-x-4">
//             <Button
//               variant="outline"
//               onClick={handleBackNavigation}
//               className="text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm p-2 md:p-2"
//               title="Go back"
//             >
//               <ArrowLeft className="h-4 w-4 md:mr-2" />
//               <span className="hidden md:inline">Back</span>
//             </Button>
//             {/* <Link to="/" className="flex items-center space-x-2">
//               <Shield className="h-6 w-6 md:h-8 md:w-8 text-blue-400" />
//               <h1 className="text-xl md:text-2xl font-bold text-white">
//                 MedPortal
//               </h1>
//             </Link> */}
//             <div className="flex items-center space-x-2">
//               {/* <Shield className="h-8 w-8 text-blue-600" />
//               <h1 className="text-2xl font-bold text-gray-900">MedPortal</h1> */}
//               <Link to="/">
//                 <img src={logo} alt="Logo" className="h-10 w-100 mr-2" />
//               </Link>
//             </div>
//           </div>

//           {/* Desktop Navigation */}
//           <div className="hidden md:flex items-center space-x-2">
//             <Button
//               variant="outline"
//               onClick={() => navigate("/")}
//               className="text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm"
//             >
//               <Home className="mr-2 h-4 w-4" />
//               Home
//             </Button>

//             {user ? (
//               <>
//                 <span className="text-white text-sm bg-white/10 px-3 py-1 rounded-full hidden lg:block">
//                   Welcome, {user.email}
//                 </span>
//                 <Button
//                   variant="outline"
//                   className="text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm"
//                   onClick={() => navigate("/profile")}
//                 >
//                   <User className="mr-2 h-4 w-4" />
//                   Profile
//                 </Button>
//                 <Button
//                   variant="outline"
//                   className="text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm"
//                   onClick={handleSignOut}
//                 >
//                   Sign Out
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
//                     <UserPlus className="mr-2 h-4 w-4" />
//                     Sign In
//                   </Button>
//                 </Link>
//               </>
//             )}
//           </div>

//           {/* Mobile Menu Button */}
//           <div className="md:hidden">
//             <Button
//               variant="outline"
//               onClick={(e) => {
//                 e.stopPropagation();
//                 setMobileMenuOpen(!mobileMenuOpen);
//               }}
//               className="text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm p-2"
//             >
//               {mobileMenuOpen ? (
//                 <X className="h-5 w-5" />
//               ) : (
//                 <Menu className="h-5 w-5" />
//               )}
//             </Button>
//           </div>
//         </div>

//         {/* Mobile Menu Dropdown */}
//         {mobileMenuOpen && (
//           <div
//             className="md:hidden bg-black border-t border-white/20 py-3 px-4 absolute w-full z-50"
//             onClick={(e) => e.stopPropagation()}
//           >
//             <div className="flex flex-col space-y-3">
//               <Button
//                 variant="outline"
//                 onClick={() => {
//                   navigate("/");
//                   setMobileMenuOpen(false);
//                 }}
//                 className="text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm w-full"
//               >
//                 <Home className="mr-2 h-4 w-4" />
//                 Home
//               </Button>

//               {user ? (
//                 <>
//                   <Button
//                     variant="outline"
//                     onClick={() => {
//                       navigate("/profile");
//                       setMobileMenuOpen(false);
//                     }}
//                     className="text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm w-full"
//                   >
//                     <User className="mr-2 h-4 w-4" />
//                     Profile
//                   </Button>
//                   <Button
//                     variant="outline"
//                     onClick={() => {
//                       handleSignOut();
//                       setMobileMenuOpen(false);
//                     }}
//                     className="text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm w-full"
//                   >
//                     Sign Out
//                   </Button>
//                 </>
//               ) : (
//                 <>
//                   <Link to="/register" className="w-full">
//                     <Button
//                       variant="outline"
//                       className="text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm w-full"
//                       onClick={() => setMobileMenuOpen(false)}
//                     >
//                       Register
//                     </Button>
//                   </Link>
//                   <Link to="/" className="w-full">
//                     <Button
//                       className="bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl transition-all duration-200 w-full"
//                       onClick={() => setMobileMenuOpen(false)}
//                     >
//                       <UserPlus className="mr-2 h-4 w-4" />
//                       Sign In
//                     </Button>
//                   </Link>
//                 </>
//               )}
//             </div>
//           </div>
//         )}
//       </header>

//       {/* Main Content */}
//       <div className="max-w-4xl mx-auto mt-6 p-4 md:p-6 bg-white shadow rounded-lg">
//         <h2 className="text-xl font-bold mb-4">Post a Blog</h2>
//         <form onSubmit={handleSubmit} className="space-y-6">
//           <input
//             type="text"
//             name="title"
//             value={formData.title}
//             onChange={handleChange}
//             placeholder="Title"
//             className="w-full p-3 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//             required
//           />

//           <div>
//             <label className="font-semibold mb-2 block">Content</label>
//             <ReactQuill
//               value={formData.content}
//               onChange={handleContentChange}
//               className="bg-white rounded-b-lg"
//               theme="snow"
//               modules={modules}
//               formats={formats}
//             />
//           </div>

//           <button
//             type="submit"
//             className="bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition-colors w-full md:w-auto disabled:opacity-70"
//             disabled={loading}
//           >
//             {loading ? "Posting..." : "Post Blog"}
//           </button>
//           {message && (
//             <p
//               className={`text-sm mt-3 ${
//                 message.includes("✅") ? "text-green-600" : "text-red-600"
//               }`}
//             >
//               {message}
//             </p>
//           )}
//         </form>
//       </div>
//     </div>
//   );
// };

// export default PostBlog;






// import React, { useEffect, useState } from "react";
// import ReactQuill, { Quill } from "react-quill";
// import "react-quill/dist/quill.snow.css";
// import { supabase } from "@/integrations/supabase/client";
// import { Blog } from "../../types/blog";
// import ImageResize from "quill-image-resize-module-react";
// import { Button } from "@/components/ui/button";
// import { useNavigate, Link } from "react-router-dom";
// import { useToast } from "@/hooks/use-toast";
// import { ArrowLeft, Shield, UserPlus, Home, User, Menu, X } from "lucide-react";
// import logo from "@/image/thefuturemed_logo (1).jpg";
// import "./PostBlog.css";


// // Register the image resize module
// Quill.register("modules/imageResize", ImageResize);

// // const modules = {
// //   toolbar: [
// //     [{ header: [1, 2, 3, false] }],
// //     ["bold", "italic", "underline", "strike"],
// //     [{ color: [] }, { background: [] }],
// //     [{ list: "ordered" }, { list: "bullet" }],
// //     [{ indent: "-1" }, { indent: "+1" }],
// //     [{ align: [] }],
// //     ["link", "image", "video"],
// //     ["clean"],
// //   ],
// //   imageResize: {
// //     parchment: Quill.import("parchment"),
// //   },
// // };

// const modules = {
//   toolbar: {
//     container: [
//       [{ header: [1, 2, 3, false] }],
//       ["bold", "italic", "underline", "strike"],
//       [{ color: [] }, { background: [] }],
//       [{ list: "ordered" }, { list: "bullet" }],
//       [{ indent: "-1" }, { indent: "+1" }],
//       [{ align: [] }],
//       ["link", "image", "video"],
//       ["clean"],
//       ["undo", "redo"], // Custom buttons
//     ],
//     handlers: {
//       undo: function () {
//         this.quill.history.undo();
//       },
//       redo: function () {
//         this.quill.history.redo();
//       },
//     },
//   },
//   imageResize: {
//     parchment: Quill.import("parchment"),
//   },
//   keyboard: {
//     bindings: {
//       handleEnter: {
//         key: "Enter",
//         handler: function (range, context) {
//           const quill = this.quill;

//           // Insert new line
//           quill.insertText(range.index, "\n", "user");
//           quill.setSelection(range.index + 1, 0);

//           // Remove alignment on new line
//           if (context.format.align) {
//             quill.formatLine(range.index + 1, 1, { align: false });
//           }

//           return false;
//         },
//       },
//     },
//   },
//   history: {
//     delay: 1000,
//     maxStack: 100,
//     userOnly: true,
//   },
// };


// const formats = [
//   "header",
//   "bold",
//   "italic",
//   "underline",
//   "strike",
//   "color",
//   "background",
//   "list",
//   "bullet",
//   "indent",
//   "align",
//   "link",
//   "image",
//   "video",
// ];

// const PostBlog: React.FC<{ onBlogPosted: () => void }> = ({ onBlogPosted }) => {
//   const [formData, setFormData] = useState<Blog>({ title: "", content: "" });
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState<string | null>(null);
//   const [user, setUser] = useState<any>(null);
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const { toast } = useToast();
//   const navigate = useNavigate();

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
//       const {
//         data: { session },
//       } = await supabase.auth.getSession();
//       setUser(session?.user || null);
//     };
//     checkUser();
//   }, []);

// const fetchProfileData = async (userId: string) => {
//   try {
//     setLoading(true);

//     const { data, error } = await supabase
//       .from("profiles")
//       .select("username")
//       .eq("id", userId)
//       .single();

//     if (error) {
//       console.error("Error fetching username:", error.message);
//     } else {
//       console.log("Fetched username:", data.username);
//       setProfile(data); // data = { username: "..." }
//     }
//   } catch (err) {
//     console.error("Unexpected error:", err);
//   } finally {
//     setLoading(false);
//   }
// };


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
//       setMessage("❌ Unable to identify user. Please sign in.");
//       setLoading(false);
//       return;
//     }

//     const editorHtml =
//       document.querySelector(".ql-editor")?.innerHTML || formData.content;
//     const blogData = {
//       title: formData.title,
//       content: editorHtml,
//       user_id: user.id,
//     };

//     const { error } = await supabase.from("blog").insert([blogData]);

//     if (error) {
//       setMessage(`❌ Error: ${error.message}`);
//     } else {
//       setMessage("✅ Blog posted successfully!");
//       setFormData({ title: "", content: "" });
//       onBlogPosted();
//     }

//     setLoading(false);
//   };

//   // Close mobile menu when clicking outside
//   useEffect(() => {
//     const handleClickOutside = () => {
//       if (mobileMenuOpen) setMobileMenuOpen(false);
//     };

//     document.addEventListener("click", handleClickOutside);
//     return () => document.removeEventListener("click", handleClickOutside);
//   }, [mobileMenuOpen]);

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
//       {/* Header */}
//       <header className="bg-black border-b border-white/20 sticky top-0 z-50 shadow-xl">
//         <div className="container mx-auto px-4 py-4 flex items-center justify-between">
//           <div className="flex items-center space-x-2 md:space-x-4">
//             <Button
//               variant="outline"
//               onClick={handleBackNavigation}
//               className="text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm p-2 md:p-2"
//               title="Go back"
//             >
//               <ArrowLeft className="h-4 w-4 md:mr-2" />
//               <span className="hidden md:inline">Back</span>
//             </Button>
//             {/* <Link to="/" className="flex items-center space-x-2">
//               <Shield className="h-6 w-6 md:h-8 md:w-8 text-blue-400" />
//               <h1 className="text-xl md:text-2xl font-bold text-white">
//                 MedPortal
//               </h1>
//             </Link> */}
//             <div className="flex items-center space-x-2">
//               {/* <Shield className="h-8 w-8 text-blue-600" />
//               <h1 className="text-2xl font-bold text-gray-900">MedPortal</h1> */}
//               <Link to="/">
//                 <img src={logo} alt="Logo" className="h-10 w-100 mr-2" />
//               </Link>
//             </div>
//           </div>

//           {/* Desktop Navigation */}
//           <div className="hidden md:flex items-center space-x-2">
//             <Button
//               variant="outline"
//               onClick={() => navigate("/")}
//               className="text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm"
//             >
//               <Home className="mr-2 h-4 w-4" />
//               Home
//             </Button>

//             {user ? (
//               <>
//                 <span className="text-white text-sm bg-white/10 px-3 py-1 rounded-full hidden lg:block">
//                   Welcome, {user.email}
//                 </span>
//                 <Button
//                   variant="outline"
//                   className="text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm"
//                   onClick={() => navigate("/profile")}
//                 >
//                   <User className="mr-2 h-4 w-4" />
//                   Profile
//                 </Button>
//                 <Button
//                   variant="outline"
//                   className="text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm"
//                   onClick={handleSignOut}
//                 >
//                   Sign Out
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
//                     <UserPlus className="mr-2 h-4 w-4" />
//                     Sign In
//                   </Button>
//                 </Link>
//               </>
//             )}
//           </div>

//           {/* Mobile Menu Button */}
//           <div className="md:hidden">
//             <Button
//               variant="outline"
//               onClick={(e) => {
//                 e.stopPropagation();
//                 setMobileMenuOpen(!mobileMenuOpen);
//               }}
//               className="text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm p-2"
//             >
//               {mobileMenuOpen ? (
//                 <X className="h-5 w-5" />
//               ) : (
//                 <Menu className="h-5 w-5" />
//               )}
//             </Button>
//           </div>
//         </div>

//         {/* Mobile Menu Dropdown */}
//         {mobileMenuOpen && (
//           <div
//             className="md:hidden bg-black border-t border-white/20 py-3 px-4 absolute w-full z-50"
//             onClick={(e) => e.stopPropagation()}
//           >
//             <div className="flex flex-col space-y-3">
//               <Button
//                 variant="outline"
//                 onClick={() => {
//                   navigate("/");
//                   setMobileMenuOpen(false);
//                 }}
//                 className="text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm w-full"
//               >
//                 <Home className="mr-2 h-4 w-4" />
//                 Home
//               </Button>

//               {user ? (
//                 <>
//                   <Button
//                     variant="outline"
//                     onClick={() => {
//                       navigate("/profile");
//                       setMobileMenuOpen(false);
//                     }}
//                     className="text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm w-full"
//                   >
//                     <User className="mr-2 h-4 w-4" />
//                     Profile
//                   </Button>
//                   <Button
//                     variant="outline"
//                     onClick={() => {
//                       handleSignOut();
//                       setMobileMenuOpen(false);
//                     }}
//                     className="text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm w-full"
//                   >
//                     Sign Out
//                   </Button>
//                 </>
//               ) : (
//                 <>
//                   <Link to="/register" className="w-full">
//                     <Button
//                       variant="outline"
//                       className="text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm w-full"
//                       onClick={() => setMobileMenuOpen(false)}
//                     >
//                       Register
//                     </Button>
//                   </Link>
//                   <Link to="/" className="w-full">
//                     <Button
//                       className="bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl transition-all duration-200 w-full"
//                       onClick={() => setMobileMenuOpen(false)}
//                     >
//                       <UserPlus className="mr-2 h-4 w-4" />
//                       Sign In
//                     </Button>
//                   </Link>
//                 </>
//               )}
//             </div>
//           </div>
//         )}
//       </header>

//       {/* Main Content */}
//       <div className="max-w-4xl mx-auto mt-6 p-4 md:p-6 bg-white shadow rounded-lg">
//         <h2 className="text-xl font-bold mb-4">Post a Blog</h2>
//         <form onSubmit={handleSubmit} className="space-y-6">
//           <input
//             type="text"
//             name="title"
//             value={formData.title}
//             onChange={handleChange}
//             placeholder="Title"
//             className="w-full p-3 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//             required
//           />

//           <div>
//             <label className="font-semibold mb-2 block">Content</label>
//             <ReactQuill
//               value={formData.content}
//               onChange={handleContentChange}
//               className="bg-white rounded-b-lg"
//               theme="snow"
//               modules={modules}
//               formats={formats}
//             />
//           </div>

//           <button
//             type="submit"
//             className="bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition-colors w-full md:w-auto disabled:opacity-70"
//             disabled={loading}
//           >
//             {loading ? "Posting..." : "Post Blog"}
//           </button>
//           {message && (
//             <p
//               className={`text-sm mt-3 ${
//                 message.includes("✅") ? "text-green-600" : "text-red-600"
//               }`}
//             >
//               {message}
//             </p>
//           )}
//         </form>
//       </div>
//     </div>
//   );
// };

// export default PostBlog;






import React, { useEffect, useRef, useState } from "react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import { supabase } from "@/integrations/supabase/client";
import { Blog } from "../../types/blog";
import ImageResize from "quill-image-resize-module-react";
import { Button } from "@/components/ui/button";
import { useNavigate, Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Shield, UserPlus, Home, User, Menu, X } from "lucide-react";
import logo from "@/image/thefuturemed_logo (1).jpg";
import "./PostBlog.css";


// Register the image resize module
Quill.register("modules/imageResize", ImageResize);

// const modules = {
//   toolbar: [
//     [{ header: [1, 2, 3, false] }],
//     ["bold", "italic", "underline", "strike"],
//     [{ color: [] }, { background: [] }],
//     [{ list: "ordered" }, { list: "bullet" }],
//     [{ indent: "-1" }, { indent: "+1" }],
//     [{ align: [] }],
//     ["link", "image", "video"],
//     ["clean"],
//   ],
//   imageResize: {
//     parchment: Quill.import("parchment"),
//   },
// };

const modules = {
  toolbar: {
    container: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ color: [] }, { background: [] }],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ indent: "-1" }, { indent: "+1" }],
      [{ align: [] }],
      ["link", "image", "video"],
      ["clean"],
      ["undo", "redo"], // Custom buttons
    ],
    handlers: {
      undo: function () {
        this.quill.history.undo();
      },
      redo: function () {
        this.quill.history.redo();
      },
    },
  },
  imageResize: {
    parchment: Quill.import("parchment"),
  },
  keyboard: {
    bindings: {
      handleEnter: {
        key: "Enter",
        handler: function (range, context) {
          const quill = this.quill;

          // Insert new line
          quill.insertText(range.index, "\n", "user");
          quill.setSelection(range.index + 1, 0);

          // Remove alignment on new line
          if (context.format.align) {
            quill.formatLine(range.index + 1, 1, { align: false });
          }

          return false;
        },
      },
    },
  },
  history: {
    delay: 1000,
    maxStack: 100,
    userOnly: true,
  },
};


const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "color",
  "background",
  "list",
  "bullet",
  "indent",
  "align",
  "link",
  "image",
  "video",
];

const PostBlog: React.FC<{ onBlogPosted: () => void }> = ({ onBlogPosted }) => {
 const [title, setTitle] = useState("");
const quillRef = useRef(null); // 👈 create a ref to control the editor

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [content, setContent] = useState("");

  const { toast } = useToast();
  const navigate = useNavigate();

  const handleBackNavigation = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("/");
    }
  };

//   useEffect(() => {
//   if (quillRef.current) {
//     const editor = quillRef.current.getEditor();
//     editor.root.scrollIntoView({ behavior: "smooth", block: "end" });
//   }
// }, [content]);

useEffect(() => {
  if (quillRef.current) {
    const editor = quillRef.current.getEditor();
    const root = editor.root;

    // Only scroll if the content overflows (prevents unwanted jump)
    if (root.scrollHeight > root.clientHeight + 10) {
      root.scrollTop = root.scrollHeight;
    }
  }
}, [content]);







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
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setUser(session?.user || null);
    };
    checkUser();
  }, []);

const fetchProfileData = async (userId: string) => {
  try {
    setLoading(true);

    const { data, error } = await supabase
      .from("profiles")
      .select("username")
      .eq("id", userId)
      .single();

    if (error) {
      console.error("Error fetching username:", error.message);
    } else {
      console.log("Fetched username:", data.username);
      setProfile(data); // data = { username: "..." }
    }
  } catch (err) {
    console.error("Unexpected error:", err);
  } finally {
    setLoading(false);
  }
};


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
      setMessage("❌ Unable to identify user. Please sign in.");
      setLoading(false);
      return;
    }

    const editorHtml =
      document.querySelector(".ql-editor")?.innerHTML || formData.content;
  const blogData = {
  title: title,
  content: content,
  user_id: user.id,
};


    const { error } = await supabase.from("blog").insert([blogData]);

    if (error) {
      setMessage(`❌ Error: ${error.message}`);
    } else {
      setMessage("✅ Blog posted successfully!");
      setFormData({ title: "", content: "" });
      onBlogPosted();
    }

    setLoading(false);
  };

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      if (mobileMenuOpen) setMobileMenuOpen(false);
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [mobileMenuOpen]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      {/* Header */}
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
      <div className="max-w-4xl mx-auto mt-6 p-4 md:p-6 bg-white shadow rounded-lg">
        <h2 className="text-xl font-bold mb-4">Post a Blog</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
        <input
  type="text"
  name="title"
  value={title}
  onChange={(e) => setTitle(e.target.value)}
  placeholder="Title"
  className="w-full p-3 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
  required
/>


          <div>
            <label className="font-semibold mb-2 block">Content</label>
 <ReactQuill
  ref={quillRef}
  value={content}
  onChange={setContent}
  modules={modules}
  formats={formats}
  className="bg-white rounded-b-lg"
  theme="snow"
/>


          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition-colors w-full md:w-auto disabled:opacity-70"
            disabled={loading}
          >
            {loading ? "Posting..." : "Post Blog"}
          </button>
          {message && (
            <p
              className={`text-sm mt-3 ${
                message.includes("✅") ? "text-green-600" : "text-red-600"
              }`}
            >
              {message}
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default PostBlog;