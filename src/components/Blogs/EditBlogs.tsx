


// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { supabase } from '@/integrations/supabase/client';
// import { Button } from '@/components/ui/button';
// import ReactQuill, { Quill } from 'react-quill';
// import './Edit.css';
// import ImageResize from 'quill-image-resize-module-react';

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

// const EditBlogs = () => {
//   const { id } = useParams<{ id: string }>();
//   const navigate = useNavigate();

//   const [title, setTitle] = useState('');
//   const [content, setContent] = useState('');
//   const [imageFile, setImageFile] = useState<File | null>(null);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     const fetchBlog = async () => {
//       const { data, error } = await supabase
//         .from('blog')
//         .select('*')
//         .eq('id', id)
//         .single();

//       if (data) {
//         setTitle(data.title);
//         setContent(data.content || '');
//       } else {
//         console.error('Fetch error:', error);
//       }
//     };

//     fetchBlog();
//   }, [id]);

//   const uploadImageToSupabase = async (file: File) => {
//     const fileName = `${Date.now()}-${file.name}`;
//     const { error } = await supabase.storage
//       .from('blog-images')
//       .upload(fileName, file);

//     if (error) {
//       console.error('Image upload error:', error.message);
//       return '';
//     }

//     const { data: publicUrl } = supabase.storage
//       .from('blog-images')
//       .getPublicUrl(fileName);

//     return publicUrl?.publicUrl || '';
//   };

//   const handleUpdate = async () => {
//     setLoading(true);
//     let updatedContent = content;

//     // Handle base64 embedded image
//     const base64Match = updatedContent.match(/<img[^>]+src=["'](data:image\/[^"']+)["'][^>]*>/);
//     if (base64Match && base64Match[1]) {
//       const base64Data = base64Match[1];
//       const fileType = base64Data.match(/^data:image\/(png|jpeg|jpg);base64,/i)?.[1] || 'png';
//       const base64WithoutPrefix = base64Data.replace(/^data:image\/\w+;base64,/, '');

//       const byteCharacters = atob(base64WithoutPrefix);
//       const byteArray = new Uint8Array(byteCharacters.length);
//       for (let i = 0; i < byteCharacters.length; i++) {
//         byteArray[i] = byteCharacters.charCodeAt(i);
//       }

//       const blob = new Blob([byteArray], { type: `image/${fileType}` });
//       const fileName = `${Date.now()}-embedded.${fileType}`;

//       const { error: uploadError } = await supabase.storage
//         .from('blog-images')
//         .upload(fileName, blob);

//       if (!uploadError) {
//         const { data } = supabase.storage.from('blog-images').getPublicUrl(fileName);
//         const publicImageUrl = data?.publicUrl || '';
//         updatedContent = updatedContent.replace(base64Match[1], publicImageUrl);
//       } else {
//         console.error('Base64 image upload failed:', uploadError.message);
//       }
//     }

//     // Handle manual image file upload (file input)
//     if (imageFile) {
//       const newUrl = await uploadImageToSupabase(imageFile);
//       if (newUrl) {
//         updatedContent += `<div><img src="${newUrl}" alt="Blog Image" class="my-4"/></div>`;
//       }
//     }

//     const blogData = {
//       id,
//       title,
//       content: updatedContent,
//       updated_at: new Date().toISOString(),
//     };

//     console.log("Updating blog with data:", blogData);

//     const { error } = await supabase
//       .from('blog')
//       .update({
//         title: blogData.title,
//         content: blogData.content,
//         updated_at: blogData.updated_at,
//       })
//       .eq('id', id);

//     setLoading(false);

//     if (!error) {
//       navigate('/my-blogs', { replace: true });
//     } else {
//       alert('❌ Update failed');
//     }
//   };

//   return (
//     <div className="max-w-4xl mx-auto mt-6 p-6 bg-white shadow rounded-lg">
//       <h2 className="text-xl font-bold mb-4">Edit Blog</h2>

//       <input
//         className="w-full border p-2 mb-4"
//         value={title}
//         onChange={(e) => setTitle(e.target.value)}
//         placeholder="Blog Title"
//       />

//       <ReactQuill
//         value={content}
//         onChange={setContent}
//         modules={modules}
//         formats={formats}
//         className="bg-white mb-4"
//         theme="snow"
//       />

//       <input
//         type="file"
//         accept="image/*"
//         className="mb-4"
//         onChange={(e) => setImageFile(e.target.files?.[0] || null)}
//       />

//       <Button onClick={handleUpdate} disabled={loading}>
//         {loading ? 'Updating...' : 'Update Blog'}
//       </Button>

//       <div className="mt-8 border-t pt-4">
//         <h3 className="text-lg font-semibold mb-2">Preview</h3>
//         <div
//           className="prose max-w-none"
//           dangerouslySetInnerHTML={{ __html: content }}
//         />
//       </div>
//     </div>
//   );
// };

// export default EditBlogs;



// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { supabase } from '@/integrations/supabase/client';
// import { Button } from '@/components/ui/button';
// import ReactQuill, { Quill } from 'react-quill';
// import 'react-quill/dist/quill.snow.css';
// import ImageResize from 'quill-image-resize-module-react';
// import './Edit.css';

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

// const EditBlogs = () => {
//   const { id } = useParams<{ id: string }>();
//   const navigate = useNavigate();

//   const [title, setTitle] = useState('');
//   const [content, setContent] = useState('');
//   const [imageFile, setImageFile] = useState<File | null>(null);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     const fetchBlog = async () => {
//       const { data, error } = await supabase
//         .from('blog')
//         .select('*')
//         .eq('id', id)
//         .single();

//       if (data) {
//         setTitle(data.title);
//         setContent(data.content || '');
//       } else {
//         console.error('Fetch error:', error);
//       }
//     };

//     fetchBlog();
//   }, [id]);

//   const uploadImageToSupabase = async (file: File) => {
//     const fileName = `${Date.now()}-${file.name}`;
//     const { error } = await supabase.storage
//       .from('blog-images')
//       .upload(fileName, file);

//     if (error) {
//       console.error('Image upload error:', error.message);
//       return '';
//     }

//     const { data: publicUrl } = supabase.storage
//       .from('blog-images')
//       .getPublicUrl(fileName);

//     return publicUrl?.publicUrl || '';
//   };

//   const handleUpdate = async () => {
//     setLoading(true);
//     let updatedContent = content;

//     const base64Match = updatedContent.match(/<img[^>]+src=["'](data:image\/[^"']+)["'][^>]*>/);
//     if (base64Match && base64Match[1]) {
//       const base64Data = base64Match[1];
//       const fileType = base64Data.match(/^data:image\/(png|jpeg|jpg);base64,/i)?.[1] || 'png';
//       const base64WithoutPrefix = base64Data.replace(/^data:image\/\w+;base64,/, '');

//       const byteCharacters = atob(base64WithoutPrefix);
//       const byteArray = new Uint8Array(byteCharacters.length);
//       for (let i = 0; i < byteCharacters.length; i++) {
//         byteArray[i] = byteCharacters.charCodeAt(i);
//       }

//       const blob = new Blob([byteArray], { type: `image/${fileType}` });
//       const fileName = `${Date.now()}-embedded.${fileType}`;

//       const { error: uploadError } = await supabase.storage
//         .from('blog-images')
//         .upload(fileName, blob);

//       if (!uploadError) {
//         const { data } = supabase.storage.from('blog-images').getPublicUrl(fileName);
//         const publicImageUrl = data?.publicUrl || '';
//         updatedContent = updatedContent.replace(base64Match[1], publicImageUrl);
//       } else {
//         console.error('Base64 image upload failed:', uploadError.message);
//       }
//     }

//    if (imageFile) {
//   const newUrl = await uploadImageToSupabase(imageFile);
//   if (newUrl) {
//     // Insert at the current cursor position with Quill's editor API (optional)
//     setContent((prev) => prev + `<p><img src="${newUrl}" alt="Blog Image" /></p>`);
//   }
// }


//     const blogData = {
//       id,
//       title,
//       content: updatedContent,
//       updated_at: new Date().toISOString(),
//     };

//     console.log("Updating blog with data:", blogData);

//     const { error } = await supabase
//       .from('blog')
//       .update({
//         title: blogData.title,
//         content: blogData.content,
//         updated_at: blogData.updated_at,
//       })
//       .eq('id', id);

//     setLoading(false);

//     if (!error) {
//       navigate('/my-blogs', { replace: true });
//     } else {
//       alert('❌ Update failed');
//     }
//   };

//   return (
//     <div className="max-w-4xl mx-auto mt-6 p-6 bg-white shadow rounded-lg">
//       <h2 className="text-xl font-bold mb-4">Edit Blog</h2>

//       <input
//         className="w-full border p-2 mb-4"
//         value={title}
//         onChange={(e) => setTitle(e.target.value)}
//         placeholder="Blog Title"
//       />

//       <ReactQuill
//         value={content}
//         onChange={setContent}
//         modules={modules}
//         formats={formats}
//         className="bg-white mb-4"
//         theme="snow"
//       />

//       <input
//         type="file"
//         accept="image/*"
//         className="mb-4"
//         onChange={(e) => setImageFile(e.target.files?.[0] || null)}
//       />

//       <Button onClick={handleUpdate} disabled={loading}>
//         {loading ? 'Updating...' : 'Update Blog'}
//       </Button>

//       <div className="mt-8 border-t pt-4">
//         <h3 className="text-lg font-semibold mb-2">Preview</h3>
//         <div
//           className="prose max-w-none"
//           dangerouslySetInnerHTML={{ __html: content }}
//         />
//       </div>
//     </div>
//   );
// };

// export default EditBlogs;




import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import ImageResize from 'quill-image-resize-module-react';
import './Edit.css';

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

const EditBlogs = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const quillRef = useRef<ReactQuill | null>(null);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchBlog = async () => {
      const { data, error } = await supabase
        .from('blog')
        .select('*')
        .eq('id', id)
        .single();

      if (data) {
        setTitle(data.title);
        setContent(data.content || '');
      } else {
        console.error('Fetch error:', error);
      }
    };

    fetchBlog();
  }, [id]);

  const uploadImageToSupabase = async (file: File) => {
    const fileName = `${Date.now()}-${file.name}`;
    const { error } = await supabase.storage
      .from('blog-images')
      .upload(fileName, file);

    if (error) {
      console.error('Image upload error:', error.message);
      return '';
    }

    const { data: publicUrl } = supabase.storage
      .from('blog-images')
      .getPublicUrl(fileName);

    return publicUrl?.publicUrl || '';
  };

  const handleUpdate = async () => {
    setLoading(true);

    const editorHtml = quillRef.current?.getEditor().root.innerHTML || content;
    let updatedContent = editorHtml;

    // Replace embedded base64 image
    const base64Match = updatedContent.match(/<img[^>]+src=["'](data:image\/[^"']+)["'][^>]*>/);
    if (base64Match && base64Match[1]) {
      const base64Data = base64Match[1];
      const fileType = base64Data.match(/^data:image\/(png|jpeg|jpg);base64,/i)?.[1] || 'png';
      const base64WithoutPrefix = base64Data.replace(/^data:image\/\w+;base64,/, '');

      const byteCharacters = atob(base64WithoutPrefix);
      const byteArray = new Uint8Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteArray[i] = byteCharacters.charCodeAt(i);
      }

      const blob = new Blob([byteArray], { type: `image/${fileType}` });
      const fileName = `${Date.now()}-embedded.${fileType}`;

      const { error: uploadError } = await supabase.storage
        .from('blog-images')
        .upload(fileName, blob);

      if (!uploadError) {
        const { data } = supabase.storage.from('blog-images').getPublicUrl(fileName);
        const publicImageUrl = data?.publicUrl || '';
        updatedContent = updatedContent.replace(base64Match[1], publicImageUrl);
      } else {
        console.error('Base64 image upload failed:', uploadError.message);
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
      .from('blog')
      .update({
        title: blogData.title,
        content: blogData.content,
        updated_at: blogData.updated_at,
      })
      .eq('id', id);

    setLoading(false);

    if (!error) {
      navigate('/my-blogs', { replace: true });
    } else {
      alert('❌ Update failed');
    }
  };

  return (
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
        {loading ? 'Updating...' : 'Update Blog'}
      </Button>

      <div className="mt-8 border-t pt-4">
        <h3 className="text-lg font-semibold mb-2">Preview</h3>
        <div
          className="ql-editor max-w-none"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>
    </div>
  );
};

export default EditBlogs;
