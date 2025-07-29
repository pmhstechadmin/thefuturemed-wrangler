// import React, { useState, useEffect, useRef } from "react";
// import { useParams, useNavigate, Link } from "react-router-dom";
// import { supabase } from "@/integrations/supabase/client";
// import { Button } from "@/components/ui/button";
// import ReactQuill, { Quill } from "react-quill";
// import "react-quill/dist/quill.snow.css";
// import ImageResize from "quill-image-resize-module-react";
// import "./Edit.css";
// import {
//   ArrowLeft,
//   Menu,
//   X,
//   Shield,
//   User,
//   LogOut,
//   UserPlus,
//   Home,
//   UserIcon,
// } from "lucide-react";
// import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
// import logo from "@/image/thefuturemed_logo (1).jpg";

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

// const EditBlogs = () => {
//   const { id } = useParams<{ id: string }>();
//   const navigate = useNavigate();
//   const quillRef = useRef<ReactQuill | null>(null);
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const [user, setUser] = useState<any>(null);

//   const [title, setTitle] = useState("");
//   const [content, setContent] = useState("");
//   const [imageFile, setImageFile] = useState<File | null>(null);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     const fetchBlog = async () => {
//       const { data, error } = await supabase
//         .from("blog")
//         .select("*")
//         .eq("id", id)
//         .single();

//       if (data) {
//         setTitle(data.title);
//         setContent(data.content || "");
//       } else {
//         console.error("Fetch error:", error);
//       }
//     };

//     fetchBlog();

//     // Fetch user session
//     const fetchSession = async () => {
//       const {
//         data: { user },
//       } = await supabase.auth.getUser();
//       setUser(user);
//     };

//     fetchSession();
//   }, [id]);

//   const uploadImageToSupabase = async (file: File) => {
//     const fileName = `${Date.now()}-${file.name}`;
//     const { error } = await supabase.storage
//       .from("blog-images")
//       .upload(fileName, file);

//     if (error) {
//       console.error("Image upload error:", error.message);
//       return "";
//     }

//     const { data: publicUrl } = supabase.storage
//       .from("blog-images")
//       .getPublicUrl(fileName);

//     return publicUrl?.publicUrl || "";
//   };

//   const handleUpdate = async () => {
//     setLoading(true);

//     const editorHtml = quillRef.current?.getEditor().root.innerHTML || content;
//     let updatedContent = editorHtml;

//     // Replace embedded base64 image
//     const base64Match = updatedContent.match(
//       /<img[^>]+src=["'](data:image\/[^"']+)["'][^>]*>/
//     );
//     if (base64Match && base64Match[1]) {
//       const base64Data = base64Match[1];
//       const fileType =
//         base64Data.match(/^data:image\/(png|jpeg|jpg);base64,/i)?.[1] || "png";
//       const base64WithoutPrefix = base64Data.replace(
//         /^data:image\/\w+;base64,/,
//         ""
//       );

//       const byteCharacters = atob(base64WithoutPrefix);
//       const byteArray = new Uint8Array(byteCharacters.length);
//       for (let i = 0; i < byteCharacters.length; i++) {
//         byteArray[i] = byteCharacters.charCodeAt(i);
//       }

//       const blob = new Blob([byteArray], { type: `image/${fileType}` });
//       const fileName = `${Date.now()}-embedded.${fileType}`;

//       const { error: uploadError } = await supabase.storage
//         .from("blog-images")
//         .upload(fileName, blob);

//       if (!uploadError) {
//         const { data } = supabase.storage
//           .from("blog-images")
//           .getPublicUrl(fileName);
//         const publicImageUrl = data?.publicUrl || "";
//         updatedContent = updatedContent.replace(base64Match[1], publicImageUrl);
//       } else {
//         console.error("Base64 image upload failed:", uploadError.message);
//       }
//     }

//     if (imageFile) {
//       const newUrl = await uploadImageToSupabase(imageFile);
//       if (newUrl) {
//         updatedContent += `<p class="ql-align-center"><img src="${newUrl}" alt="Blog Image" /></p>`;
//       }
//     }

//     const blogData = {
//       id,
//       title,
//       content: updatedContent,
//       updated_at: new Date().toISOString(),
//     };

//     const { error } = await supabase
//       .from("blog")
//       .update({
//         title: blogData.title,
//         content: blogData.content,
//         updated_at: blogData.updated_at,
//       })
//       .eq("id", id);

//     setLoading(false);

//     if (!error) {
//       navigate("/my-blogs", { replace: true });
//     } else {
//       alert("❌ Update failed");
//     }
//   };

//   const handleBackNavigation = () => navigate(-1);

//   const handleSignOut = async () => {
//     await supabase.auth.signOut();
//     navigate("/");
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Header */}
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

//       {/* Blog Editing Section */}
//       <div className="max-w-4xl mx-auto mt-6 p-6 bg-white shadow rounded-lg">
//         <h2 className="text-xl font-bold mb-4">Edit Blog</h2>

//         <input
//           className="w-full border p-2 mb-4"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//           placeholder="Blog Title"
//         />

//         <ReactQuill
//           ref={quillRef}
//           value={content}
//           onChange={setContent}
//           modules={modules}
//           formats={formats}
//           className="bg-white mb-4"
//           theme="snow"
//         />

//         <input
//           type="file"
//           accept="image/*"
//           className="mb-4"
//           onChange={(e) => setImageFile(e.target.files?.[0] || null)}
//         />

//         <Button onClick={handleUpdate} disabled={loading}>
//           {loading ? "Updating..." : "Update Blog"}
//         </Button>

//         <div className="mt-8 border-t pt-4">
//           <h3 className="text-lg font-semibold mb-2">Preview</h3>
//           <div
//             className="ql-editor max-w-none"
//             dangerouslySetInnerHTML={{ __html: content }}
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EditBlogs;

import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import ImageResize from "quill-image-resize-module-react";
import "./Edit.css";
import {
  ArrowLeft,
  Menu,
  X,
  Shield,
  User,
  LogOut,
  UserPlus,
  Home,
  UserIcon,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import logo from "@/image/thefuturemed_logo (1).jpg";
import Header from "@/footer/Header";

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
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    ["bold", "italic", "underline", "strike"],
    [{ color: [] }, { background: [] }],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ indent: "-1" }, { indent: "+1" }],
    [{ align: [] }],
    ["link", "image", "video"],
    ["clean"],
  ],
  imageResize: {
    parchment: Quill.import("parchment"),
  },
  keyboard: {
    bindings: {
      // Custom Enter key behavior
      handleEnter: {
        key: "Enter",
        handler: function (range, context) {
          const quill = this.quill;

          // Execute default behavior first
          quill.insertText(range.index, "\n", "user");
          quill.setSelection(range.index + 1, 0);

          // Clear alignment on the new line
          setTimeout(() => {
            quill.formatLine(range.index + 1, 1, { align: false });
          }, 0);

          return false; // prevent default Enter behavior since we handled it
        },
      },
    },
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

const EditBlogs = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const quillRef = useRef<ReactQuill | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<any>(null);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchBlog = async () => {
      const { data, error } = await supabase
        .from("blog")
        .select("*")
        .eq("id", id)
        .single();

      if (data) {
        setTitle(data.title);
        setContent(data.content || "");
      } else {
        console.error("Fetch error:", error);
      }
    };

    fetchBlog();

    // Fetch user session
    const fetchSession = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
    };

    fetchSession();
  }, [id]);

  const uploadImageToSupabase = async (file: File) => {
    const fileName = `${Date.now()}-${file.name}`;
    const { error } = await supabase.storage
      .from("blog-images")
      .upload(fileName, file);

    if (error) {
      console.error("Image upload error:", error.message);
      return "";
    }

    const { data: publicUrl } = supabase.storage
      .from("blog-images")
      .getPublicUrl(fileName);

    return publicUrl?.publicUrl || "";
  };

  const handleUpdate = async () => {
    setLoading(true);

    const editorHtml = quillRef.current?.getEditor().root.innerHTML || content;
    let updatedContent = editorHtml;

    // Replace embedded base64 image
    const base64Match = updatedContent.match(
      /<img[^>]+src=["'](data:image\/[^"']+)["'][^>]*>/
    );
    if (base64Match && base64Match[1]) {
      const base64Data = base64Match[1];
      const fileType =
        base64Data.match(/^data:image\/(png|jpeg|jpg);base64,/i)?.[1] || "png";
      const base64WithoutPrefix = base64Data.replace(
        /^data:image\/\w+;base64,/,
        ""
      );

      const byteCharacters = atob(base64WithoutPrefix);
      const byteArray = new Uint8Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteArray[i] = byteCharacters.charCodeAt(i);
      }

      const blob = new Blob([byteArray], { type: `image/${fileType}` });
      const fileName = `${Date.now()}-embedded.${fileType}`;

      const { error: uploadError } = await supabase.storage
        .from("blog-images")
        .upload(fileName, blob);

      if (!uploadError) {
        const { data } = supabase.storage
          .from("blog-images")
          .getPublicUrl(fileName);
        const publicImageUrl = data?.publicUrl || "";
        updatedContent = updatedContent.replace(base64Match[1], publicImageUrl);
      } else {
        console.error("Base64 image upload failed:", uploadError.message);
      }
    }

    if (imageFile) {
      const newUrl = await uploadImageToSupabase(imageFile);
      if (newUrl) {
        updatedContent += `<p class="ql-align-center"><img src="${newUrl}" alt="Blog Image" /></p>`;
      }
    }

    const blogData = {
      id,
      title,
      content: updatedContent,
      updated_at: new Date().toISOString(),
    };

    const { error } = await supabase
      .from("blog")
      .update({
        title: blogData.title,
        content: blogData.content,
        updated_at: blogData.updated_at,
      })
      .eq("id", id);

    setLoading(false);

    if (!error) {
      navigate("/my-blogs", { replace: true });
    } else {
      alert("❌ Update failed");
    }
  };

  const handleBackNavigation = () => navigate(-1);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      {/* <header className="bg-black/30 backdrop-blur-md border-b border-white/20 sticky top-0 z-50 shadow-xl">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            
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
              <Link to="/" className="flex items-center space-x-2">
                <Shield className="h-6 w-6 md:h-8 md:w-8 text-blue-400" />
                <h1 className="text-xl md:text-2xl font-bold text-white">
                  MedPortal
                </h1>
              </Link>
              <div className="flex items-center space-x-2">
                <Shield className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">MedPortal</h1>
                <Link to="/">
                  <img src={logo} alt="Logo" className="h-10 w-100 mr-2" />
                </Link>
              </div>
            </div>

            <div className="flex items-center space-x-2 md:space-x-4">
              {user ? (
                <>
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
      </header> */}
      <Header/>

      {/* Blog Editing Section */}
      <div className="max-w-4xl mx-auto mt-6 p-6 bg-white shadow rounded-lg">
        <h2 className="text-xl font-bold mb-4">Edit Blog</h2>

        <input
          className="w-full border p-2 mb-4"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Blog Title"
        />

        <ReactQuill
          ref={quillRef}
          value={content}
          onChange={setContent}
          modules={modules}
          formats={formats}
          className="bg-white mb-4"
          theme="snow"
        />

        <input
          type="file"
          accept="image/*"
          className="mb-4"
          onChange={(e) => setImageFile(e.target.files?.[0] || null)}
        />

        <Button onClick={handleUpdate} disabled={loading}>
          {loading ? "Updating..." : "Update Blog"}
        </Button>

        <div className="mt-8 border-t pt-4">
          <h3 className="text-lg font-semibold mb-2">Preview</h3>
          <div
            className="ql-editor max-w-none"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </div>
      </div>
    </div>
  );
};

export default EditBlogs;
