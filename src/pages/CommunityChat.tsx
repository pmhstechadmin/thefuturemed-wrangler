


import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ArrowLeft,
  Send,
  Camera,
  Image,
  FileText,
  Users,
  MessageCircle,
  Shield,
  Menu,
  X,
  Home,
  User,
  UserPlus,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import type { User as AuthUser } from "@supabase/supabase-js";
import WebcamCapture from "./WebcamCapture";
import logo from "@/image/thefuturemed_logo (1).jpg";

import Footer from "@/footer/Footer";

interface Community {
  id: string;
  name: string;
  description: string;
  category: string;
}

interface Message {
  id: string;
  user_id: string;
  community_id: string;
  content: string;
  post_type: string;
  file_url?: string;
  file_type?: string;
  created_at: string;
  user_profile?: {
    first_name?: string;
    last_name?: string;
  };
}

interface Member {
  id: string;
  user_id: string;
  joined_at: string;
  user_profile?: {
    first_name?: string;
    last_name?: string;
  };
}

const CommunityChat = () => {
  const { communityId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [user, setUser] = useState<AuthUser | null>(null);
  const [community, setCommunity] = useState<Community | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [members, setMembers] = useState<Member[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [messageType, setMessageType] = useState("message");
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [showWebcam, setShowWebcam] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    checkAuthAndLoadData();
  }, [communityId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (!communityId || !user) return;

    const messagesSubscription = supabase
      .channel(`community-${communityId}-messages`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "community_posts",
          filter: `community_id=eq.${communityId}`,
        },
        () => {
          loadMessages();
        }
      )
      .subscribe();

    const membersSubscription = supabase
      .channel(`community-${communityId}-members`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "community_memberships",
          filter: `community_id=eq.${communityId}`,
        },
        () => {
          loadMembers();
        }
      )
      .subscribe();

    return () => {
      messagesSubscription.unsubscribe();
      membersSubscription.unsubscribe();
    };
  }, [communityId, user]);

  const checkAuthAndLoadData = async () => {
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session?.user) {
        toast({
          title: "Authentication Required",
          description: "Please sign in to access the community chat.",
          variant: "destructive",
        });
        navigate("/");
        return;
      }

      setUser(session.user);

      if (communityId) {
        await Promise.all([
          loadCommunity(),
          loadMessages(),
          loadMembers(),
          checkMembership(session.user.id),
        ]);
      }
    } catch (error) {
      console.error("Error loading chat data:", error);
      toast({
        title: "Error",
        description: "Failed to load community chat.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const checkMembership = async (userId: string) => {
    const { data, error } = await supabase
      .from("community_memberships")
      .select("*")
      .eq("community_id", communityId)
      .eq("user_id", userId)
      .single();

    if (error || !data) {
      toast({
        title: "Access Denied",
        description:
          "You must be a member of this community to access the chat.",
        variant: "destructive",
      });
      navigate("/community");
    }
  };

  const loadCommunity = async () => {
    const { data, error } = await supabase
      .from("communities")
      .select("*")
      .eq("id", communityId)
      .single();

    if (error) {
      console.error("Error loading community:", error);
      toast({
        title: "Error",
        description: "Failed to load community information.",
        variant: "destructive",
      });
      navigate("/community");
    } else {
      setCommunity(data);
    }
  };

  const loadMessages = async () => {
    try {
      const { data, error } = await supabase
        .from("community_posts")
        .select("*")
        .eq("community_id", communityId)
        .order("created_at", { ascending: true })
        .limit(100);

      if (error) {
        console.error("Error loading messages:", error);
        return;
      }

      const messagesWithProfiles = await Promise.all(
        (data || []).map(async (post) => {
          try {
            const { data: profileData, error: profileError } =
              await supabase.rpc("get_user_profile", {
                user_uuid: post.user_id,
              });

            return {
              id: post.id,
              user_id: post.user_id,
              community_id: post.community_id,
              content: post.content,
              post_type: post.post_type || "message",
              file_url: post.file_url,
              file_type: post.file_type,
              created_at: post.created_at,
              user_profile:
                profileData && profileData.length > 0
                  ? profileData[0]
                  : undefined,
            };
          } catch (error) {
            console.error("Error processing profile for post:", post.id, error);
            return {
              id: post.id,
              user_id: post.user_id,
              community_id: post.community_id,
              content: post.content,
              post_type: post.post_type || "message",
              file_url: post.file_url,
              file_type: post.file_type,
              created_at: post.created_at,
              user_profile: undefined,
            };
          }
        })
      );

      setMessages(messagesWithProfiles);
    } catch (error) {
      console.error("Error loading messages:", error);
    }
  };

  const loadMembers = async () => {
    try {
      const { data, error } = await supabase
        .from("community_memberships")
        .select("*")
        .eq("community_id", communityId)
        .order("joined_at", { ascending: false });

      if (error) {
        console.error("Error loading members:", error);
        return;
      }

      const membersWithProfiles = await Promise.all(
        (data || []).map(async (membership) => {
          try {
            const { data: profileData, error: profileError } =
              await supabase.rpc("get_user_profile", {
                user_uuid: membership.user_id,
              });

            return {
              id: membership.id,
              user_id: membership.user_id,
              joined_at: membership.joined_at,
              user_profile:
                profileData && profileData.length > 0
                  ? profileData[0]
                  : undefined,
            };
          } catch (error) {
            console.error(
              "Error processing profile for member:",
              membership.id,
              error
            );
            return {
              id: membership.id,
              user_id: membership.user_id,
              joined_at: membership.joined_at,
              user_profile: undefined,
            };
          }
        })
      );

      setMembers(membersWithProfiles);
    } catch (error) {
      console.error("Error loading members:", error);
    }
  };

  const uploadFileAndSend = async (file: File) => {
    if (!user || !communityId) return;

    const fileExt = file.name.split(".").pop();
    const filePath = `${communityId}/${Date.now()}-${file.name}`;

    const { data, error } = await supabase.storage
      .from("community-files")
      .upload(filePath, file);

    if (error) {
      toast({
        title: "Upload failed",
        description: error.message,
        variant: "destructive",
      });
      return;
    }

    const { data: publicUrlData } = supabase.storage
      .from("community-files")
      .getPublicUrl(filePath);
    const fileUrl = publicUrlData?.publicUrl;

    if (fileUrl) {
      const { error: insertError } = await supabase
        .from("community_posts")
        .insert({
          user_id: user.id,
          community_id: communityId,
          content: file.name,
          post_type: messageType || "file",
          file_url: fileUrl,
          file_type: file.type,
        });

      if (insertError) {
        toast({
          title: "Error",
          description: "Could not send file message.",
          variant: "destructive",
        });
      }
    }
  };

  const sendMessage = async () => {
    if (
      (!newMessage.trim() && !selectedFile) ||
      !user ||
      !communityId ||
      sending
    )
      return;

    setSending(true);

    try {
      if (selectedFile) {
        const fileExt = selectedFile.name.split(".").pop();
        const sanitizedFileName = selectedFile.name
          .replace(/\s+/g, "_")
          .replace(/[^\w.-]/gi, "");
        const filePath = `${communityId}/${Date.now()}-${sanitizedFileName}`;

        const { data: uploadData, error: uploadError } = await supabase.storage
          .from("community-files")
          .upload(filePath, selectedFile);

        if (uploadError) {
          toast({
            title: "Upload failed",
            description: uploadError.message,
            variant: "destructive",
          });
          return;
        }

        const { data: publicUrlData } = supabase.storage
          .from("community-files")
          .getPublicUrl(filePath);

        const fileUrl = publicUrlData?.publicUrl;

        const { error: insertError } = await supabase
          .from("community_posts")
          .insert({
            user_id: user.id,
            community_id: communityId,
            content: newMessage.trim() || selectedFile.name,
            post_type: messageType || "file",
            file_url: fileUrl,
            file_type: selectedFile.type,
          });

        if (insertError) {
          toast({
            title: "Error",
            description: "Could not send file message.",
            variant: "destructive",
          });
        }
      } else {
        const { error } = await supabase.from("community_posts").insert({
          user_id: user.id,
          community_id: communityId,
          content: newMessage.trim(),
          post_type: messageType,
        });

        if (error) {
          toast({
            title: "Error",
            description: "Failed to send message. Please try again.",
            variant: "destructive",
          });
        }
      }

      setNewMessage("");
      setSelectedFile(null);
      setMessageType("message");
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setSending(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };
// 22222222222222222222222222222222222222222222222222
  const handleFileUpload = (type: string) => {
    if (fileInputRef.current) {
      if (type === "camera") {
        fileInputRef.current.accept = "image/*";
        fileInputRef.current.capture = "environment";
      } else if (type === "image") {
        fileInputRef.current.accept = "image/*";
        fileInputRef.current.removeAttribute("capture");
      } else {
        fileInputRef.current.accept = "*/*";
        fileInputRef.current.removeAttribute("capture");
      }
      fileInputRef.current.click();
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getUserDisplayName = (message: Message) => {
    const profile = message.user_profile;
    if (profile?.first_name || profile?.last_name) {
      return `${profile.first_name || ""} ${profile.last_name || ""}`.trim();
    }
    return message.user_id === user?.id ? "You" : "Anonymous";
  };

  const getMessageTypeColor = (type: string) => {
    switch (type) {
      case "achievement":
        return "bg-green-100 text-green-800";
      case "question":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-blue-100 text-blue-800";
    }
  };

  const handleBackNavigation = () => {
    navigate("/community");
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
      navigate("/");
    } catch (error) {
      console.error("Sign out error:", error);
      toast({
        title: "Error",
        description: "Failed to sign out. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading community chat...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        ></div>
      )}

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white z-50 transform transition-transform duration-300 ease-in-out lg:hidden ${
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-4 flex justify-end">
          <Button variant="ghost" onClick={() => setMobileMenuOpen(false)}>
            <X className="h-6 w-6" />
          </Button>
        </div>
        <div className="p-4">
          {user ? (
            <div className="mb-6 p-4 bg-gray-100 rounded-lg">
              <p className="text-sm font-medium truncate">
                Welcome, {user.email}
              </p>
            </div>
          ) : null}
          <div className="mt-6 border-t pt-4">
            {user ? (
              <>
                <Button
                  variant="ghost"
                  className="w-full justify-start mb-2"
                  onClick={() => navigate("/profile")}
                >
                  <User className="h-4 w-4" />
                  <span className="ml-2">Profile</span>
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-red-600 hover:text-red-700"
                  onClick={handleSignOut}
                >
                  <span className="ml-2">Sign Out</span>
                </Button>
              </>
            ) : (
              <>
                <Link to="/register" className="block w-full mb-2">
                  <Button variant="ghost" className="w-full justify-start">
                    Register
                  </Button>
                </Link>
                <Link to="/" className="block w-full">
                  <Button className="w-full justify-start bg-blue-600 text-white hover:bg-blue-700">
                    <UserPlus className="h-4 w-4" />
                    <span className="ml-2">Sign In</span>
                  </Button>
                </Link>
              </>
            )}
            <Button
              variant="ghost"
              className="w-full justify-start mt-4"
              onClick={() => navigate("/")}
            >
              <Home className="h-4 w-4" />
              <span className="ml-2">Home</span>
            </Button>
          </div>
        </div>
      </div>

      <header className="bg-black/30 backdrop-blur-md border-b border-white/20 sticky top-0 z-50 shadow-xl">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 sm:space-x-4">
              <Button
                variant="outline"
                onClick={handleBackNavigation}
                className="text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm p-2"
                title="Go back"
              >
                <ArrowLeft className="h-4 w-4" />
                <span className="hidden sm:inline ml-2">Back</span>
              </Button>
              {/* <Link to="/" className="flex items-center space-x-2">
                <Shield className="h-6 w-6 sm:h-8 sm:w-8 text-blue-400" />
                <h1 className="text-xl sm:text-2xl font-bold text-white">
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
            <div className="hidden lg:flex items-center space-x-4">
              {user ? (
                <div className="flex items-center space-x-4">
                  <span className="text-white text-sm bg-white/10 px-3 py-1 rounded-full truncate max-w-[160px]">
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
                </div>
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
              <Button
                variant="outline"
                onClick={() => navigate("/")}
                className="text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm"
                title="Go to home page"
              >
                <Home className="mr-2 h-4 w-4" />
                <span className="hidden sm:inline">Home</span>
              </Button>
            </div>
            <div className="flex lg:hidden items-center">
              <Button
                variant="outline"
                className="text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm"
                onClick={() => setMobileMenuOpen(true)}
              >
                <Menu className="h-6 w-6" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        {/* Mobile Community Header */}
        <div className="lg:hidden mb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {/* <Button variant="outline" size="sm" onClick={() => navigate('/community')}>
                <ArrowLeft className="h-4 w-4" />
              </Button> */}
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  {community?.name}
                </h1>
                <p className="text-gray-600 text-sm line-clamp-1">
                  {community?.description}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Members List - Hidden on mobile unless expanded */}
          <Card className="lg:col-span-1 hidden lg:block">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Live Members ({members.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {members.map((member) => {
                  const profile = member.user_profile;
                  const displayName =
                    profile?.first_name || profile?.last_name
                      ? `${profile.first_name || ""} ${
                          profile.last_name || ""
                        }`.trim()
                      : "Anonymous";

                  return (
                    <div
                      key={member.id}
                      className="flex items-center gap-2 p-2 rounded-lg bg-gray-50"
                    >
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                        {displayName.charAt(0).toUpperCase()}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{displayName}</p>
                        {member.user_id === user?.id && (
                          <Badge variant="secondary" className="text-xs">
                            You
                          </Badge>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Chat Area */}
          <div className="lg:col-span-3">
            {/* Desktop Community Header */}
            <div className="hidden lg:block mb-6">
              <div className="flex items-center gap-4">
                {/* <Button variant="outline" onClick={() => navigate('/community')}>
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Communities
                </Button> */}
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    {community?.name}
                  </h1>
                  <p className="text-gray-600">{community?.description}</p>
                </div>
              </div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="h-5 w-5" />
                  General Chat
                </CardTitle>
              </CardHeader>
              <CardContent className="min-h-[400px] lg:h-[500px] flex flex-col">
                {/* Messages */}
                <div className="flex-1 overflow-y-auto mb-4 space-y-3">
                  {messages.map((message) => (
                    <div key={message.id} className="flex gap-3">
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-medium flex-shrink-0">
                        {getUserDisplayName(message).charAt(0).toUpperCase()}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium text-sm">
                            {getUserDisplayName(message)}
                          </span>
                          <Badge
                            className={`text-xs ${getMessageTypeColor(
                              message.post_type
                            )}`}
                          >
                            {message.post_type}
                          </Badge>
                          <span className="text-xs text-gray-500">
                            {formatTime(message.created_at)}
                          </span>
                        </div>
                        <p className="text-gray-800">{message.content}</p>
                        {message.file_url && (
                          <div className="mt-2 max-w-xs w-fit bg-white border rounded-lg p-2 shadow-sm">
                            {message.file_type?.startsWith("image/") ? (
                              <img
                                src={message.file_url}
                                alt="uploaded"
                                className="rounded-lg max-h-48 object-cover"
                              />
                            ) : (
                              <div className="flex items-center gap-2 mt-1 bg-gray-100 p-2 rounded-md">
                                <div className="bg-gray-300 p-2 rounded-full">
                                  <FileText className="h-5 w-5 text-gray-700" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm font-medium text-gray-800 truncate">
                                    {message.content}
                                  </p>
                                  <a
                                    href={message.file_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-xs text-blue-600 hover:underline"
                                  >
                                    Download
                                  </a>
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>

                <Separator className="mb-4" />

                {/* Message Input */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Select value={messageType} onValueChange={setMessageType}>
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="message">Message</SelectItem>
                        <SelectItem value="achievement">Achievement</SelectItem>
                        <SelectItem value="question">Question</SelectItem>
                      </SelectContent>
                    </Select>

                    <div className="flex gap-1">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setShowWebcam(true)}
                        className="flex items-center gap-2 p-2"
                      >
                        <Camera className="h-4 w-4" />
                      </Button>

                      {showWebcam && (
                        <WebcamCapture
                          onCapture={(file) => setSelectedFile(file)}
                          onClose={() => setShowWebcam(false)}
                        />
                      )}

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleFileUpload("image")}
                        className="flex items-center gap-2 p-2"
                      >
                        <Image className="h-4 w-4" />
                      </Button>

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleFileUpload("file")}
                        className="flex items-center gap-2 p-2"
                      >
                        <FileText className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Input
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Type your message..."
                      disabled={sending}
                      className="flex-1"
                    />
                    <Button
                      onClick={sendMessage}
                      disabled={
                        (!newMessage.trim() && !selectedFile) || sending
                      }
                      className={`flex items-center gap-2 ${
                        newMessage.trim() || selectedFile
                          ? "bg-blue-600 text-white hover:bg-blue-700"
                          : "bg-gray-200 text-gray-500"
                      }`}
                    >
                      <Send className="h-4 w-4" />
                      <span className="hidden sm:inline">Send</span>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Mobile Members List Button */}
        <div className="lg:hidden mt-4">
          <Button
            variant="outline"
            className="w-full"
            onClick={() => navigate(`/community/${communityId}/members`)}
          >
            <Users className="h-4 w-4 mr-2" />
            View Members ({members.length})
          </Button>
        </div>

        {/* Hidden file input */}
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept="*/*"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              setSelectedFile(file);
              e.target.value = "";
            }
          }}
        />
      </div>
      <Footer/>
    </div>
  );
};

export default CommunityChat;
