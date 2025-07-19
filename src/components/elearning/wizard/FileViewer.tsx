// FileViewer.tsx
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://your-supabase-url.supabase.co";
const supabaseKey = "your-supabase-anon-key";
const supabase = createClient(supabaseUrl, supabaseKey);

interface FileViewerProps {
  filePath: string; // Supabase storage path (e.g., "folder/video.mp4")
  bucketName: string; // Supabase bucket name
  type: "pdf" | "video";
}

export const FileViewer = ({ filePath, bucketName, type }: FileViewerProps) => {
  const [fileUrl, setFileUrl] = useState<string | null>(null);

  useEffect(() => {
    const generateSignedUrl = async () => {
      const { data, error } = await supabase.storage
        .from(bucketName)
        .createSignedUrl(filePath, 3600); // 1 hour validity

      if (error) {
        console.error("Error generating signed URL:", error.message);
      } else {
        setFileUrl(data?.signedUrl);
      }
    };

    if (filePath && bucketName) generateSignedUrl();
  }, [filePath, bucketName]);

  if (!fileUrl) return <p className="text-gray-500">Loading file...</p>;

  if (type === "pdf") {
    return (
      <iframe
        src={fileUrl}
        title="PDF Viewer"
        className="w-full h-[500px] border rounded"
      />
    );
  }

  if (type === "video") {
    return (
      <video
        src={fileUrl}
        controls
        className="w-full max-h-[500px] rounded bg-black"
      />
    );
  }

  return null;
};
