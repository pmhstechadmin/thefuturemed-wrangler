// Create a new file: src/components/SocialShareButtons.tsx
import { Facebook, Twitter, Linkedin, Link as LinkIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

interface SocialShareButtonsProps {
  url: string;
  title: string;
  description: string;
}

export const SocialShareButtons = ({
  url,
  title,
  description,
}: SocialShareButtonsProps) => {
  const shareOnFacebook = () => {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      "_blank",
      "width=600,height=400"
    );
  };

  const shareOnTwitter = () => {
    window.open(
      `https://twitter.com/intent/tweet?url=${encodeURIComponent(
        url
      )}&text=${encodeURIComponent(title)}`,
      "_blank",
      "width=600,height=400"
    );
  };

  const shareOnLinkedIn = () => {
    window.open(
      `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
        url
      )}&title=${encodeURIComponent(title)}&summary=${encodeURIComponent(
        description
      )}`,
      "_blank",
      "width=600,height=400"
    );
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(url);
    // alert("Link copied to clipboard!");
    toast({
      title: "Link copied tosuccessfully",
      description: "Link copied to clipboard!",
    });
  };

  return (
    <div className="flex flex-wrap gap-2 mt-4">
      <Button
        variant="outline"
        size="sm"
        onClick={shareOnFacebook}
        className="flex items-center gap-2"
      >
        <Facebook className="h-4 w-4 text-blue-600" />
        <span>Facebook</span>
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={shareOnTwitter}
        className="flex items-center gap-2"
      >
        <Twitter className="h-4 w-4 text-blue-400" />
        <span>Twitter</span>
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={shareOnLinkedIn}
        className="flex items-center gap-2"
      >
        <Linkedin className="h-4 w-4 text-blue-700" />
        <span>LinkedIn</span>
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={copyToClipboard}
        className="flex items-center gap-2"
      >
        <LinkIcon className="h-4 w-4" />
        <span>Copy Link</span>
      </Button>
    </div>
  );
};
