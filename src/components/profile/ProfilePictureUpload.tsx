
import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Edit, Upload, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface ProfilePictureUploadProps {
  currentImageUrl: string | null;
  userInitial: string;
  userId: string;
  onImageUpdate: (newImageUrl: string) => void;
}

const ProfilePictureUpload = ({ 
  currentImageUrl, 
  userInitial, 
  userId, 
  onImageUpdate 
}: ProfilePictureUploadProps) => {
  const [uploading, setUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(currentImageUrl);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileSelect = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Invalid file type",
        description: "Please select an image file.",
        variant: "destructive",
      });
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please select an image smaller than 5MB.",
        variant: "destructive",
      });
      return;
    }

    setUploading(true);

    try {
      // Create a unique filename
      const fileExt = file.name.split('.').pop();
      const fileName = `${userId}/profile-${Date.now()}.${fileExt}`;

      // Upload the file to Supabase Storage
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('profile-images')
        .upload(fileName, file, {
          upsert: true
        });

      if (uploadError) throw uploadError;

      // Get the public URL
      const { data: { publicUrl } } = supabase.storage
        .from('profile-images')
        .getPublicUrl(fileName);

      // Update the profile in the database
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ profile_image_url: publicUrl })
        .eq('id', userId);

      if (updateError) throw updateError;

      setPreviewUrl(publicUrl);
      onImageUpdate(publicUrl);

      toast({
        title: "Success",
        description: "Profile picture updated successfully!",
      });
    } catch (error) {
      console.error('Error uploading profile picture:', error);
      toast({
        title: "Upload failed",
        description: "Failed to upload profile picture. Please try again.",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
      // Reset the input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  return (
    <div className="relative group">
      <Avatar className="w-24 h-24">
        <AvatarImage src={previewUrl || undefined} alt="Profile picture" />
        <AvatarFallback className="bg-blue-600 text-white text-3xl font-bold">
          {userInitial}
        </AvatarFallback>
      </Avatar>
      
      <Button
        variant="outline"
        size="icon"
        className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full bg-white border-2 border-blue-200 hover:bg-blue-50 shadow-md"
        onClick={handleFileSelect}
        disabled={uploading}
      >
        {uploading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Edit className="h-4 w-4 text-blue-600" />
        )}
      </Button>

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />
    </div>
  );
};

export default ProfilePictureUpload;
