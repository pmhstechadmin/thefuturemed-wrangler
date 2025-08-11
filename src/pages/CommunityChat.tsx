


// // import { useState, useEffect, useRef } from "react";
// // import { useParams, useNavigate, Link } from "react-router-dom";
// // import { Button } from "@/components/ui/button";
// // import { Input } from "@/components/ui/input";
// // import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// // import { Badge } from "@/components/ui/badge";
// // import { Separator } from "@/components/ui/separator";
// // import {
// //   Select,
// //   SelectContent,
// //   SelectItem,
// //   SelectTrigger,
// //   SelectValue,
// // } from "@/components/ui/select";
// // import {
// //   ArrowLeft,
// //   Send,
// //   Camera,
// //   Image,
// //   FileText,
// //   Users,
// //   MessageCircle,
// //   Shield,
// //   Menu,
// //   X,
// //   Home,
// //   User,
// //   UserPlus,
// // } from "lucide-react";
// // import { supabase } from "@/integrations/supabase/client";
// // import { useToast } from "@/hooks/use-toast";
// // import type { User as AuthUser } from "@supabase/supabase-js";
// // import WebcamCapture from "./WebcamCapture";
// // import logo from "@/image/thefuturemed_logo (1).jpg";

// // import Footer from "@/footer/Footer";

// // interface Community {
// //   id: string;
// //   name: string;
// //   description: string;
// //   category: string;
// // }

// // interface Message {
// //   id: string;
// //   user_id: string;
// //   community_id: string;
// //   content: string;
// //   post_type: string;
// //   file_url?: string;
// //   file_type?: string;
// //   created_at: string;
// //   user_profile?: {
// //     first_name?: string;
// //     last_name?: string;
// //   };
// // }

// // interface Member {
// //   id: string;
// //   user_id: string;
// //   joined_at: string;
// //   user_profile?: {
// //     first_name?: string;
// //     last_name?: string;
// //   };
// // }

// // const CommunityChat = () => {
// //   const { communityId } = useParams();
// //   const navigate = useNavigate();
// //   const { toast } = useToast();
// //   const messagesEndRef = useRef<HTMLDivElement>(null);
// //   const fileInputRef = useRef<HTMLInputElement>(null);

// //   const [user, setUser] = useState<AuthUser | null>(null);
// //   const [community, setCommunity] = useState<Community | null>(null);
// //   const [messages, setMessages] = useState<Message[]>([]);
// //   const [members, setMembers] = useState<Member[]>([]);
// //   const [newMessage, setNewMessage] = useState("");
// //   const [messageType, setMessageType] = useState("message");
// //   const [loading, setLoading] = useState(true);
// //   const [sending, setSending] = useState(false);
// //   const [showWebcam, setShowWebcam] = useState(false);
// //   const [selectedFile, setSelectedFile] = useState<File | null>(null);
// //   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

// // //   useEffect(() => {
// // //     checkAuthAndLoadData();
// // //   }, [communityId]);

// // //   useEffect(() => {
// // //     scrollToBottom();
// // //   }, [messages]);

// // //   useEffect(() => {
// // //     if (!communityId || !user) return;

// // //     const messagesSubscription = supabase
// // //       .channel(`community-${communityId}-messages`)
// // //       .on(
// // //         "postgres_changes",
// // //         {
// // //           event: "*",
// // //           schema: "public",
// // //           table: "community_posts",
// // //           filter: `community_id=eq.${communityId}`,
// // //         },
// // //         () => {
// // //           loadMessages();
// // //         }
// // //       )
// // //       .subscribe();

// // //     const membersSubscription = supabase
// // //       .channel(`community-${communityId}-members`)
// // //       .on(
// // //         "postgres_changes",
// // //         {
// // //           event: "*",
// // //           schema: "public",
// // //           table: "community_memberships",
// // //           filter: `community_id=eq.${communityId}`,
// // //         },
// // //         () => {
// // //           loadMembers();
// // //         }
// // //       )
// // //       .subscribe();

// // //     return () => {
// // //       messagesSubscription.unsubscribe();
// // //       membersSubscription.unsubscribe();
// // //     };
// // //   }, [communityId, user]);

// // //   const checkAuthAndLoadData = async () => {
// // //     try {
// // //       const {
// // //         data: { session },
// // //       } = await supabase.auth.getSession();
// // //       if (!session?.user) {
// // //         toast({
// // //           title: "Authentication Required",
// // //           description: "Please sign in to access the community chat.",
// // //           variant: "destructive",
// // //         });
// // //         navigate("/");
// // //         return;
// // //       }

// // //       setUser(session.user);

// // //       if (communityId) {
// // //         await Promise.all([
// // //           loadCommunity(),
// // //           loadMessages(),
// // //           loadMembers(),
// // //           checkMembership(session.user.id),
// // //         ]);
// // //       }
// // //     } catch (error) {
// // //       console.error("Error loading chat data:", error);
// // //       toast({
// // //         title: "Error",
// // //         description: "Failed to load community chat.",
// // //         variant: "destructive",
// // //       });
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   const checkMembership = async (userId: string) => {
// // //     const { data, error } = await supabase
// // //       .from("community_memberships")
// // //       .select("*")
// // //       .eq("community_id", communityId)
// // //       .eq("user_id", userId)
// // //       .single();

// // //     if (error || !data) {
// // //       toast({
// // //         title: "Access Denied",
// // //         description:
// // //           "You must be a member of this community to access the chat.",
// // //         variant: "destructive",
// // //       });
// // //       navigate("/community");
// // //     }
// // //   };

// // //   const loadCommunity = async () => {
// // //     const { data, error } = await supabase
// // //       .from("communities")
// // //       .select("*")
// // //       .eq("id", communityId)
// // //       .single();

// // //     if (error) {
// // //       console.error("Error loading community:", error);
// // //       toast({
// // //         title: "Error",
// // //         description: "Failed to load community information.",
// // //         variant: "destructive",
// // //       });
// // //       navigate("/community");
// // //     } else {
// // //       setCommunity(data);
// // //     }
// // //   };

// // //   const loadMessages = async () => {
// // //     try {
// // //       const { data, error } = await supabase
// // //         .from("community_posts")
// // //         .select("*")
// // //         .eq("community_id", communityId)
// // //         .order("created_at", { ascending: true })
// // //         .limit(100);

// // //       if (error) {
// // //         console.error("Error loading messages:", error);
// // //         return;
// // //       }

// // //       const messagesWithProfiles = await Promise.all(
// // //         (data || []).map(async (post) => {
// // //           try {
// // //             const { data: profileData, error: profileError } =
// // //               await supabase.rpc("get_user_profile", {
// // //                 user_uuid: post.user_id,
// // //               });

// // //             return {
// // //               id: post.id,
// // //               user_id: post.user_id,
// // //               community_id: post.community_id,
// // //               content: post.content,
// // //               post_type: post.post_type || "message",
// // //               file_url: post.file_url,
// // //               file_type: post.file_type,
// // //               created_at: post.created_at,
// // //               user_profile:
// // //                 profileData && profileData.length > 0
// // //                   ? profileData[0]
// // //                   : undefined,
// // //             };
// // //           } catch (error) {
// // //             console.error("Error processing profile for post:", post.id, error);
// // //             return {
// // //               id: post.id,
// // //               user_id: post.user_id,
// // //               community_id: post.community_id,
// // //               content: post.content,
// // //               post_type: post.post_type || "message",
// // //               file_url: post.file_url,
// // //               file_type: post.file_type,
// // //               created_at: post.created_at,
// // //               user_profile: undefined,
// // //             };
// // //           }
// // //         })
// // //       );

// // //       setMessages(messagesWithProfiles);
// // //     } catch (error) {
// // //       console.error("Error loading messages:", error);
// // //     }
// // //   };

// // //   const loadMembers = async () => {
// // //     try {
// // //       const { data, error } = await supabase
// // //         .from("community_memberships")
// // //         .select("*")
// // //         .eq("community_id", communityId)
// // //         .order("joined_at", { ascending: false });

// // //       if (error) {
// // //         console.error("Error loading members:", error);
// // //         return;
// // //       }

// // //       const membersWithProfiles = await Promise.all(
// // //         (data || []).map(async (membership) => {
// // //           try {
// // //             const { data: profileData, error: profileError } =
// // //               await supabase.rpc("get_user_profile", {
// // //                 user_uuid: membership.user_id,
// // //               });

// // //             return {
// // //               id: membership.id,
// // //               user_id: membership.user_id,
// // //               joined_at: membership.joined_at,
// // //               user_profile:
// // //                 profileData && profileData.length > 0
// // //                   ? profileData[0]
// // //                   : undefined,
// // //             };
// // //           } catch (error) {
// // //             console.error(
// // //               "Error processing profile for member:",
// // //               membership.id,
// // //               error
// // //             );
// // //             return {
// // //               id: membership.id,
// // //               user_id: membership.user_id,
// // //               joined_at: membership.joined_at,
// // //               user_profile: undefined,
// // //             };
// // //           }
// // //         })
// // //       );

// // //       setMembers(membersWithProfiles);
// // //     } catch (error) {
// // //       console.error("Error loading members:", error);
// // //     }
// // //   };

// // //   const uploadFileAndSend = async (file: File) => {
// // //     if (!user || !communityId) return;

// // //     const fileExt = file.name.split(".").pop();
// // //     const filePath = `${communityId}/${Date.now()}-${file.name}`;

// // //     const { data, error } = await supabase.storage
// // //       .from("community-files")
// // //       .upload(filePath, file);

// // //     if (error) {
// // //       toast({
// // //         title: "Upload failed",
// // //         description: error.message,
// // //         variant: "destructive",
// // //       });
// // //       return;
// // //     }

// // //     const { data: publicUrlData } = supabase.storage
// // //       .from("community-files")
// // //       .getPublicUrl(filePath);
// // //     const fileUrl = publicUrlData?.publicUrl;

// // //     if (fileUrl) {
// // //       const { error: insertError } = await supabase
// // //         .from("community_posts")
// // //         .insert({
// // //           user_id: user.id,
// // //           community_id: communityId,
// // //           content: file.name,
// // //           post_type: messageType || "file",
// // //           file_url: fileUrl,
// // //           file_type: file.type,
// // //         });

// // //       if (insertError) {
// // //         toast({
// // //           title: "Error",
// // //           description: "Could not send file message.",
// // //           variant: "destructive",
// // //         });
// // //       }
// // //     }
// // //   };

// // //   const sendMessage = async () => {
// // //     if (
// // //       (!newMessage.trim() && !selectedFile) ||
// // //       !user ||
// // //       !communityId ||
// // //       sending
// // //     )
// // //       return;

// // //     setSending(true);

// // //     try {
// // //       if (selectedFile) {
// // //         const fileExt = selectedFile.name.split(".").pop();
// // //         const sanitizedFileName = selectedFile.name
// // //           .replace(/\s+/g, "_")
// // //           .replace(/[^\w.-]/gi, "");
// // //         const filePath = `${communityId}/${Date.now()}-${sanitizedFileName}`;

// // //         const { data: uploadData, error: uploadError } = await supabase.storage
// // //           .from("community-files")
// // //           .upload(filePath, selectedFile);

// // //         if (uploadError) {
// // //           toast({
// // //             title: "Upload failed",
// // //             description: uploadError.message,
// // //             variant: "destructive",
// // //           });
// // //           return;
// // //         }

// // //         const { data: publicUrlData } = supabase.storage
// // //           .from("community-files")
// // //           .getPublicUrl(filePath);

// // //         const fileUrl = publicUrlData?.publicUrl;

// // //         const { error: insertError } = await supabase
// // //           .from("community_posts")
// // //           .insert({
// // //             user_id: user.id,
// // //             community_id: communityId,
// // //             content: newMessage.trim() || selectedFile.name,
// // //             post_type: messageType || "file",
// // //             file_url: fileUrl,
// // //             file_type: selectedFile.type,
// // //           });

// // //         if (insertError) {
// // //           toast({
// // //             title: "Error",
// // //             description: "Could not send file message.",
// // //             variant: "destructive",
// // //           });
// // //         }
// // //       } else {
// // //         const { error } = await supabase.from("community_posts").insert({
// // //           user_id: user.id,
// // //           community_id: communityId,
// // //           content: newMessage.trim(),
// // //           post_type: messageType,
// // //         });

// // //         if (error) {
// // //           toast({
// // //             title: "Error",
// // //             description: "Failed to send message. Please try again.",
// // //             variant: "destructive",
// // //           });
// // //         }
// // //       }

// // //       setNewMessage("");
// // //       setSelectedFile(null);
// // //       setMessageType("message");
// // //     } catch (error) {
// // //       console.error("Error sending message:", error);
// // //     } finally {
// // //       setSending(false);
// // //     }
// // //   };

// // //   const handleKeyPress = (e: React.KeyboardEvent) => {
// // //     if (e.key === "Enter" && !e.shiftKey) {
// // //       e.preventDefault();
// // //       sendMessage();
// // //     }
// // //   };
// // // // 22222222222222222222222222222222222222222222222222
// // //   const handleFileUpload = (type: string) => {
// // //     if (fileInputRef.current) {
// // //       if (type === "camera") {
// // //         fileInputRef.current.accept = "image/*";
// // //         fileInputRef.current.capture = "environment";
// // //       } else if (type === "image") {
// // //         fileInputRef.current.accept = "image/*";
// // //         fileInputRef.current.removeAttribute("capture");
// // //       } else {
// // //         fileInputRef.current.accept = "*/*";
// // //         fileInputRef.current.removeAttribute("capture");
// // //       }
// // //       fileInputRef.current.click();
// // //     }
// // //   };

// // //   const scrollToBottom = () => {
// // //     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
// // //   };

// // //   const formatTime = (timestamp: string) => {
// // //     return new Date(timestamp).toLocaleTimeString([], {
// // //       hour: "2-digit",
// // //       minute: "2-digit",
// // //     });
// // //   };

// // //   const getUserDisplayName = (message: Message) => {
// // //     const profile = message.user_profile;
// // //     if (profile?.first_name || profile?.last_name) {
// // //       return `${profile.first_name || ""} ${profile.last_name || ""}`.trim();
// // //     }
// // //     return message.user_id === user?.id ? "You" : "Anonymous";
// // //   };

// // //   const getMessageTypeColor = (type: string) => {
// // //     switch (type) {
// // //       case "achievement":
// // //         return "bg-green-100 text-green-800";
// // //       case "question":
// // //         return "bg-yellow-100 text-yellow-800";
// // //       default:
// // //         return "bg-blue-100 text-blue-800";
// // //     }
// // //   };

// // //   const handleBackNavigation = () => {
// // //     navigate("/community");
// // //   };

// // //   const handleSignOut = async () => {
// // //     try {
// // //       const { error } = await supabase.auth.signOut();
// // //       if (error) throw error;
// // //       setUser(null);
// // //       toast({
// // //         title: "Signed Out",
// // //         description: "You have been successfully signed out.",
// // //       });
// // //       navigate("/");
// // //     } catch (error) {
// // //       console.error("Sign out error:", error);
// // //       toast({
// // //         title: "Error",
// // //         description: "Failed to sign out. Please try again.",
// // //         variant: "destructive",
// // //       });
// // //     }
// // //   };
// // useEffect(() => {
// //   console.log("Effect: checkAuthAndLoadData triggered");
// //   checkAuthAndLoadData();
// // }, [communityId]);

// // useEffect(() => {
// //   console.log("Effect: scrollToBottom triggered");
// //   scrollToBottom();
// // }, [messages]);

// // useEffect(() => {
// //   if (!communityId || !user) return;

// //   console.log("Effect: Setting up Supabase realtime subscriptions");

// //   const messagesSubscription = supabase
// //     .channel(`community-${communityId}-messages`)
// //     .on(
// //       "postgres_changes",
// //       {
// //         event: "*",
// //         schema: "public",
// //         table: "community_posts",
// //         filter: `community_id=eq.${communityId}`,
// //       },
// //       () => {
// //         console.log("Realtime update: community_posts changed");
// //         loadMessages();
// //       }
// //     )
// //     .subscribe();

// //   const membersSubscription = supabase
// //     .channel(`community-${communityId}-members`)
// //     .on(
// //       "postgres_changes",
// //       {
// //         event: "*",
// //         schema: "public",
// //         table: "community_memberships",
// //         filter: `community_id=eq.${communityId}`,
// //       },
// //       () => {
// //         console.log("Realtime update: community_memberships changed");
// //         loadMembers();
// //       }
// //     )
// //     .subscribe();

// //   return () => {
// //     console.log("Cleanup: unsubscribing from Supabase channels");
// //     messagesSubscription.unsubscribe();
// //     membersSubscription.unsubscribe();
// //   };
// // }, [communityId, user]);

// // const checkAuthAndLoadData = async () => {
// //   try {
// //     console.log("Checking authentication...");
// //     const { data: { session } } = await supabase.auth.getSession();

// //     if (!session?.user) {
// //       console.warn("User not authenticated");
// //       toast({
// //         title: "Authentication Required",
// //         description: "Please sign in to access the community chat.",
// //         variant: "destructive",
// //       });
// //       navigate("/");
// //       return;
// //     }

// //     setUser(session.user);
// //     console.log("Authenticated user:", session.user);

// //     if (communityId) {
// //       console.log("Loading community data...");
// //       await Promise.all([
// //         loadCommunity(),
// //         loadMessages(),
// //         loadMembers(),
// //         checkMembership(session.user.id),
// //       ]);
// //     }
// //   } catch (error) {
// //     console.error("Error loading chat data:", error);
// //     toast({
// //       title: "Error",
// //       description: "Failed to load community chat.",
// //       variant: "destructive",
// //     });
// //   } finally {
// //     setLoading(false);
// //   }
// // };

// // const checkMembership = async (userId: string) => {
// //   console.log("Checking membership for user:", userId);
// //   const { data, error } = await supabase
// //     .from("community_memberships")
// //     .select("*")
// //     .eq("community_id", communityId)
// //     .eq("user_id", userId)
// //     .single();

// //   if (error || !data) {
// //     console.warn("User is not a member of the community");
// //     toast({
// //       title: "Access Denied",
// //       description: "You must be a member of this community to access the chat.",
// //       variant: "destructive",
// //     });
// //     navigate("/community");
// //   } else {
// //     console.log("Membership confirmed");
// //   }
// // };

// // const loadCommunity = async () => {
// //   console.log("Loading community details...");
// //   const { data, error } = await supabase
// //     .from("communities")
// //     .select("*")
// //     .eq("id", communityId)
// //     .single();

// //   if (error) {
// //     console.error("Error loading community:", error);
// //     toast({
// //       title: "Error",
// //       description: "Failed to load community information.",
// //       variant: "destructive",
// //     });
// //     navigate("/community");
// //   } else {
// //     console.log("Community loaded:", data);
// //     setCommunity(data);
// //   }
// // };

// // const loadMessages = async () => {
// //   console.log("Loading messages...");
// //   try {
// //     const { data, error } = await supabase
// //       .from("community_posts")
// //       .select("*")
// //       .eq("community_id", communityId)
// //       .order("created_at", { ascending: true })
// //       .limit(100);

// //     if (error) {
// //       console.error("Error loading messages:", error);
// //       return;
// //     }

// //     const messagesWithProfiles = await Promise.all(
// //       (data || []).map(async (post) => {
// //         try {
// //           const { data: profileData } = await supabase.rpc("get_user_profile", {
// //             user_uuid: post.user_id,
// //           });

// //           return {
// //             ...post,
// //             post_type: post.post_type || "message",
// //             user_profile: profileData?.[0] || undefined,
// //           };
// //         } catch (error) {
// //           console.error("Error processing profile for post:", post.id, error);
// //           return { ...post, user_profile: undefined };
// //         }
// //       })
// //     );

// //     console.log("Messages loaded:", messagesWithProfiles);
// //     setMessages(messagesWithProfiles);
// //   } catch (error) {
// //     console.error("Error loading messages:", error);
// //   }
// // };

// // const loadMembers = async () => {
// //   console.log("Loading members...");
// //   try {
// //     const { data, error } = await supabase
// //       .from("community_memberships")
// //       .select("*")
// //       .eq("community_id", communityId)
// //       .order("joined_at", { ascending: false });

// //     if (error) {
// //       console.error("Error loading members:", error);
// //       return;
// //     }

// //     const membersWithProfiles = await Promise.all(
// //       (data || []).map(async (membership) => {
// //         try {
// //           const { data: profileData } = await supabase.rpc("get_user_profile", {
// //             user_uuid: membership.user_id,
// //           });

// //           return {
// //             ...membership,
// //             user_profile: profileData?.[0] || undefined,
// //           };
// //         } catch (error) {
// //           console.error("Error processing profile for member:", membership.id, error);
// //           return { ...membership, user_profile: undefined };
// //         }
// //       })
// //     );

// //     console.log("Members loaded:", membersWithProfiles);
// //     setMembers(membersWithProfiles);
// //   } catch (error) {
// //     console.error("Error loading members:", error);
// //   }
// // };

// // const uploadFileAndSend = async (file: File) => {
// //   if (!user || !communityId) return;

// //   const sanitizedFileName = file.name.replace(/\s+/g, "_").replace(/[^\w.-]/gi, "");
// //   const filePath = `${communityId}/${Date.now()}-${sanitizedFileName}`;
// //   console.log("Uploading file:", filePath);

// //   const { data: uploadData, error: uploadError } = await supabase.storage
// //     // const { data,error } = await supabase.storage
// //     .from("community-files")
// //     .upload(filePath, file);

// //   if (uploadError) {
// //     console.error("Upload failed:", uploadError);
// //     toast({
// //       title: "Upload failed",
// //       description: uploadError.message,
// //       variant: "destructive",
// //     });
// //     return;
// //   }
// //   console.log("File uploaded successfully:", uploadData);
  

// //   const { data: publicUrlData } = supabase.storage
// //     .from("community-files")
// //     .getPublicUrl(filePath);
// //     console.log("data :", publicUrlData);
// //   const fileUrl = publicUrlData?.publicUrl;
// //   console.log("File uploaded: 123", publicUrlData?.publicUrl);

// //   console.log("File uploaded. Public URL:", fileUrl);

// //   if (fileUrl) {
// //     const { error: insertError } = await supabase
// //       .from("community_posts")
// //       .insert({
// //         user_id: user.id,
// //         community_id: communityId,
// //         content: file.name,
// //         post_type: messageType || "file",
// //         file_url: fileUrl,
// //         file_type: file.type, 
// //       });

// //     if (insertError) {
// //       console.error("Insert file post error:", insertError);
// //       toast({
// //         title: "Error",
// //         description: "Could not send file message.",
// //         variant: "destructive",
// //       });
// //     } else {
// //       console.log("File message inserted successfully.");
// //     }
// //   }
// // };

// // // const uploadFileAndSend = async (file: File) => {
// // //   if (!user || !communityId) return;

// // //   const sanitizedFileName = file.name.replace(/\s+/g, "_").replace(/[^\w.-]/gi, "");
// // //   const filePath = `${communityId}/${Date.now()}-${sanitizedFileName}`;
// // //   console.log("Uploading file:", filePath);

// // //   try {
// // //     // Upload the file
// // //     const { data: uploadData, error: uploadError } = await supabase.storage
// // //       .from("community-files")
// // //       .upload(filePath, file);

// // //     if (uploadError) {
// // //       console.error("Upload failed:", uploadError);
// // //       toast({
// // //         title: "Upload failed",
// // //         description: uploadError.message,
// // //         variant: "destructive",
// // //       });
// // //       return;
// // //     }
// // //     console.log("File uploaded successfully:", uploadData);

// // //     // Generate a signed URL with expiration (e.g., 1 hour)
// // //     const { data: signedUrlData, error: signedUrlError } = await supabase.storage
// // //       .from("community-files")
// // //       .createSignedUrl(filePath, 3600); // 3600 seconds = 1 hour

// // //     if (signedUrlError) {
// // //       console.error("Failed to generate signed URL:", signedUrlError);
// // //       toast({
// // //         title: "URL generation failed",
// // //         description: signedUrlError.message,
// // //         variant: "destructive",
// // //       });
// // //       return;
// // //     }

// // //     const fileUrl = signedUrlData?.signedUrl;
// // //     console.log("Signed URL generated:", fileUrl);

// // //     if (fileUrl) {
// // //       // Determine file type for better categorization
// // //       let postType = "file";
// // //       if (file.type.startsWith("image/")) postType = "image";
// // //       else if (file.type === "application/pdf") postType = "pdf";
// // //       else if (file.type.startsWith("video/")) postType = "video";

// // //       // Insert the message with the signed URL
// // //       const { error: insertError } = await supabase
// // //         .from("community_posts")
// // //         .insert({
// // //           user_id: user.id,
// // //           community_id: communityId,
// // //           content: file.name,
// // //           post_type: messageType || postType,
// // //           file_url: fileUrl,
// // //           file_type: file.type,
// // //         });

// // //       if (insertError) {
// // //         console.error("Insert file post error:", insertError);
// // //         toast({
// // //           title: "Error",
// // //           description: "Could not send file message.",
// // //           variant: "destructive",
// // //         });
// // //       } else {
// // //         console.log("File message inserted successfully.");
// // //       }
// // //     }
// // //   } catch (error) {
// // //     console.error("Error in file upload process:", error);
// // //     toast({
// // //       title: "Error",
// // //       description: "An unexpected error occurred during file upload.",
// // //       variant: "destructive",
// // //     });
// // //   }
// // // };

// // const sendMessage = async () => {
// //   if ((!newMessage.trim() && !selectedFile) || !user || !communityId || sending)
// //     return;

// //   setSending(true);
// //   console.log("Sending message...");

// //   try {
// //     if (selectedFile) {
// //       await uploadFileAndSend(selectedFile);
// //       console.log("Selected file for upload:", selectedFile);
// //       const sanitizedFileName = selectedFile.name
// //         .replace(/\s+/g, "_")
// //         .replace(/[^\w.-]/gi, "");
// //       const filePath = `${communityId}/${Date.now()}-${sanitizedFileName}`;
      
// //       console.log("Uploading selected file:", filePath);

// //       const { error: uploadError } = await supabase.storage
// //         .from("community-files")
// //         .upload(filePath, selectedFile);

// //       if (uploadError) {
// //         console.error("Upload failed:", uploadError);
// //         toast({
// //           title: "Upload failed",
// //           description: uploadError.message,
// //           variant: "destructive",
// //         });
// //         return;
// //       }

// //       const { data: publicUrlData } = supabase.storage
// //         .from("community-files")
// //         .getPublicUrl(filePath);

// //       const fileUrl = publicUrlData?.publicUrl;

// //       console.log("File uploaded:", publicUrlData?.publicUrl);

// //       console.log("File uploaded. Public URL:", fileUrl);

// //       const { error: insertError } = await supabase
// //         .from("community_posts")
// //         .insert({
// //           user_id: user.id,
// //           community_id: communityId,
// //           content: newMessage.trim() || selectedFile.name,
// //           post_type: messageType,
// //           file_url: fileUrl,
// //           file_type: selectedFile.type,
// //         });

// //       if (insertError) {
// //         console.error("Insert error:", insertError);
// //         toast({
// //           title: "Error",
// //           description: "Could not send file message.",
// //           variant: "destructive",
// //         });
// //       } else {
// //         console.log("File message sent.");
// //       }
// //     } else {
// //       const { error } = await supabase.from("community_posts").insert({
// //         user_id: user.id,
// //         community_id: communityId,
// //         content: newMessage.trim(),
// //         post_type: messageType,
// //       });

// //       if (error) {
// //         console.error("Text message send error:", error);
// //         toast({
// //           title: "Error",
// //           description: "Failed to send message. Please try again.",
// //           variant: "destructive",
// //         });
// //       } else {
// //         console.log("Text message sent.");
// //       }
// //     }

// //     setNewMessage("");
// //     setSelectedFile(null);
// //     setMessageType("message");
// //   } catch (error) {
// //     console.error("Unexpected error in sendMessage:", error);
// //   } finally {
// //     setSending(false);
// //   }
// // };

// // const handleKeyPress = (e: React.KeyboardEvent) => {
// //   if (e.key === "Enter" && !e.shiftKey) {
// //     e.preventDefault();
// //     sendMessage();
// //   }
// // };

// // const handleFileUpload = (type: string) => {
// //   console.log("File upload type selected:", type);
// //   if (fileInputRef.current) {
// //     if (type === "camera") {
// //       fileInputRef.current.accept = "image/*";
// //       fileInputRef.current.capture = "environment";
// //     } else if (type === "image") {
// //       fileInputRef.current.accept = "image/*";
// //       fileInputRef.current.removeAttribute("capture");
// //     } else {
// //       fileInputRef.current.accept = "*/*";
// //       fileInputRef.current.removeAttribute("capture");
// //     }
// //     fileInputRef.current.click();
// //   }
// // };

// // const scrollToBottom = () => {
// //   console.log("Scrolling to bottom...");
// //   messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
// // };

// // const formatTime = (timestamp: string) => {
// //   return new Date(timestamp).toLocaleTimeString([], {
// //     hour: "2-digit",
// //     minute: "2-digit",
// //   });
// // };

// // const getUserDisplayName = (message: Message) => {
// //   const profile = message.user_profile;
// //   if (profile?.first_name || profile?.last_name) {
// //     return `${profile.first_name || ""} ${profile.last_name || ""}`.trim();
// //   }
// //   return message.user_id === user?.id ? "You" : "Anonymous";
// // };

// // const getMessageTypeColor = (type: string) => {
// //   switch (type) {
// //     case "achievement":
// //       return "bg-green-100 text-green-800";
// //     case "question":
// //       return "bg-yellow-100 text-yellow-800";
// //     default:
// //       return "bg-blue-100 text-blue-800";
// //   }
// // };

// // const handleBackNavigation = () => {
// //   console.log("Navigating back to community list");
// //   navigate("/community");
// // };

// // const handleSignOut = async () => {
// //   console.log("Signing out...");
// //   try {
// //     const { error } = await supabase.auth.signOut();
// //     if (error) throw error;
// //     setUser(null);
// //     toast({
// //       title: "Signed Out",
// //       description: "You have been successfully signed out.",
// //     });
// //     navigate("/");
// //   } catch (error) {
// //     console.error("Sign out error:", error);
// //     toast({
// //       title: "Error",
// //       description: "Failed to sign out. Please try again.",
// //       variant: "destructive",
// //     });
// //   }
// // };

// //   if (loading) {
// //     return (
// //       <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center">
// //         <div className="text-center">
// //           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
// //           <p className="text-gray-600">Loading community chat...</p>
// //         </div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
// //       {/* Mobile Menu Overlay */}
// //       {mobileMenuOpen && (
// //         <div
// //           className="fixed inset-0 bg-black/50 z-40 lg:hidden"
// //           onClick={() => setMobileMenuOpen(false)}
// //         ></div>
// //       )}

// //       {/* Mobile Menu */}
// //       <div
// //         className={`fixed top-0 right-0 h-full w-64 bg-white z-50 transform transition-transform duration-300 ease-in-out lg:hidden ${
// //           mobileMenuOpen ? "translate-x-0" : "translate-x-full"
// //         }`}
// //       >
// //         <div className="p-4 flex justify-end">
// //           <Button variant="ghost" onClick={() => setMobileMenuOpen(false)}>
// //             <X className="h-6 w-6" />
// //           </Button>
// //         </div>
// //         <div className="p-4">
// //           {user ? (
// //             <div className="mb-6 p-4 bg-gray-100 rounded-lg">
// //               <p className="text-sm font-medium truncate">
// //                 Welcome, {user.email}
// //               </p>
// //             </div>
// //           ) : null}
// //           <div className="mt-6 border-t pt-4">
// //             {user ? (
// //               <>
// //                 <Button
// //                   variant="ghost"
// //                   className="w-full justify-start mb-2"
// //                   onClick={() => navigate("/profile")}
// //                 >
// //                   <User className="h-4 w-4" />
// //                   <span className="ml-2">Profile</span>
// //                 </Button>
// //                 <Button
// //                   variant="ghost"
// //                   className="w-full justify-start text-red-600 hover:text-red-700"
// //                   onClick={handleSignOut}
// //                 >
// //                   <span className="ml-2">Sign Out</span>
// //                 </Button>
// //               </>
// //             ) : (
// //               <>
// //                 <Link to="/register" className="block w-full mb-2">
// //                   <Button variant="ghost" className="w-full justify-start">
// //                     Register
// //                   </Button>
// //                 </Link>
// //                 <Link to="/" className="block w-full">
// //                   <Button className="w-full justify-start bg-blue-600 text-white hover:bg-blue-700">
// //                     <UserPlus className="h-4 w-4" />
// //                     <span className="ml-2">Sign In</span>
// //                   </Button>
// //                 </Link>
// //               </>
// //             )}
// //             <Button
// //               variant="ghost"
// //               className="w-full justify-start mt-4"
// //               onClick={() => navigate("/")}
// //             >
// //               <Home className="h-4 w-4" />
// //               <span className="ml-2">Home</span>
// //             </Button>
// //           </div>
// //         </div>
// //       </div>

// //       <header className="bg-black/30 backdrop-blur-md border-b border-white/20 sticky top-0 z-50 shadow-xl">
// //         <div className="container mx-auto px-4 py-4">
// //           <div className="flex items-center justify-between">
// //             <div className="flex items-center space-x-2 sm:space-x-4">
// //               <Button
// //                 variant="outline"
// //                 onClick={handleBackNavigation}
// //                 className="text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm p-2"
// //                 title="Go back"
// //               >
// //                 <ArrowLeft className="h-4 w-4" />
// //                 <span className="hidden sm:inline ml-2">Back</span>
// //               </Button>
// //               {/* <Link to="/" className="flex items-center space-x-2">
// //                 <Shield className="h-6 w-6 sm:h-8 sm:w-8 text-blue-400" />
// //                 <h1 className="text-xl sm:text-2xl font-bold text-white">
// //                   MedPortal
// //                 </h1>
// //               </Link> */}
// //               <div className="flex items-center space-x-2">
// //                 {/* <Shield className="h-8 w-8 text-blue-600" />
// //               <h1 className="text-2xl font-bold text-gray-900">MedPortal</h1> */}
// //                 <Link to="/">
// //                   <img src={logo} alt="Logo" className="h-10 w-100 mr-2" />
// //                 </Link>
// //               </div>
// //             </div>
// //             <div className="hidden lg:flex items-center space-x-4">
// //               {user ? (
// //                 <div className="flex items-center space-x-4">
// //                   <span className="text-white text-sm bg-white/10 px-3 py-1 rounded-full truncate max-w-[160px]">
// //                     Welcome, {user.email}
// //                   </span>
// //                   <Button
// //                     variant="outline"
// //                     className="text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm"
// //                     onClick={() => navigate("/profile")}
// //                   >
// //                     <User className="mr-2 h-4 w-4" />
// //                     Profile
// //                   </Button>
// //                   <Button
// //                     variant="outline"
// //                     className="text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm"
// //                     onClick={handleSignOut}
// //                   >
// //                     Sign Out
// //                   </Button>
// //                 </div>
// //               ) : (
// //                 <>
// //                   <Link to="/register">
// //                     <Button
// //                       variant="outline"
// //                       className="text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm"
// //                     >
// //                       Register
// //                     </Button>
// //                   </Link>
// //                   <Link to="/">
// //                     <Button className="bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl transition-all duration-200">
// //                       <UserPlus className="mr-2 h-4 w-4" />
// //                       Sign In
// //                     </Button>
// //                   </Link>
// //                 </>
// //               )}
// //               <Button
// //                 variant="outline"
// //                 onClick={() => navigate("/")}
// //                 className="text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm"
// //                 title="Go to home page"
// //               >
// //                 <Home className="mr-2 h-4 w-4" />
// //                 <span className="hidden sm:inline">Home</span>
// //               </Button>
// //             </div>
// //             <div className="flex lg:hidden items-center">
// //               <Button
// //                 variant="outline"
// //                 className="text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm"
// //                 onClick={() => setMobileMenuOpen(true)}
// //               >
// //                 <Menu className="h-6 w-6" />
// //               </Button>
// //             </div>
// //           </div>
// //         </div>
// //       </header>

// //       <div className="container mx-auto px-4 py-6">
// //         {/* Mobile Community Header */}
// //         <div className="lg:hidden mb-4">
// //           <div className="flex items-center justify-between">
// //             <div className="flex items-center gap-2">
// //               {/* <Button variant="outline" size="sm" onClick={() => navigate('/community')}>
// //                 <ArrowLeft className="h-4 w-4" />
// //               </Button> */}
// //               <div>
// //                 <h1 className="text-xl font-bold text-gray-900">
// //                   {community?.name}
// //                 </h1>
// //                 <p className="text-gray-600 text-sm line-clamp-1">
// //                   {community?.description}
// //                 </p>
// //               </div>
// //             </div>
// //           </div>
// //         </div>

// //         <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
// //           {/* Members List - Hidden on mobile unless expanded */}
// //           <Card className="lg:col-span-1 hidden lg:block">
// //             <CardHeader>
// //               <CardTitle className="flex items-center gap-2">
// //                 <Users className="h-5 w-5" />
// //                 Live Members ({members.length})
// //               </CardTitle>
// //             </CardHeader>
// //             <CardContent>
// //               <div className="space-y-2">
// //                 {members.map((member) => {
// //                   const profile = member.user_profile;
// //                   const displayName =
// //                     profile?.first_name || profile?.last_name
// //                       ? `${profile.first_name || ""} ${
// //                           profile.last_name || ""
// //                         }`.trim()
// //                       : "Anonymous";

// //                   return (
// //                     <div
// //                       key={member.id}
// //                       className="flex items-center gap-2 p-2 rounded-lg bg-gray-50"
// //                     >
// //                       <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
// //                         {displayName.charAt(0).toUpperCase()}
// //                       </div>
// //                       <div className="flex-1">
// //                         <p className="text-sm font-medium">{displayName}</p>
// //                         {member.user_id === user?.id && (
// //                           <Badge variant="secondary" className="text-xs">
// //                             You
// //                           </Badge>
// //                         )}
// //                       </div>
// //                     </div>
// //                   );
// //                 })}
// //               </div>
// //             </CardContent>
// //           </Card>

// //           {/* Chat Area */}
// //           <div className="lg:col-span-3">
// //             {/* Desktop Community Header */}
// //             <div className="hidden lg:block mb-6">
// //               <div className="flex items-center gap-4">
// //                 {/* <Button variant="outline" onClick={() => navigate('/community')}>
// //                   <ArrowLeft className="h-4 w-4 mr-2" />
// //                   Back to Communities
// //                 </Button> */}
// //                 <div>
// //                   <h1 className="text-2xl font-bold text-gray-900">
// //                     {community?.name}
// //                   </h1>
// //                   <p className="text-gray-600">{community?.description}</p>
// //                 </div>
// //               </div>
// //             </div>

// //             <Card>
// //               <CardHeader>
// //                 <CardTitle className="flex items-center gap-2">
// //                   <MessageCircle className="h-5 w-5" />
// //                   General Chat
// //                 </CardTitle>
// //               </CardHeader>
// //               <CardContent className="min-h-[400px] lg:h-[500px] flex flex-col">
// //                 {/* Messages */}
// //                 <div className="flex-1 overflow-y-auto mb-4 space-y-3">
// //                   {messages.map((message) => (
// //                     <div key={message.id} className="flex gap-3">
// //                       <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-medium flex-shrink-0">
// //                         {getUserDisplayName(message).charAt(0).toUpperCase()}
// //                       </div>
// //                       <div className="flex-1">
// //                         <div className="flex items-center gap-2 mb-1">
// //                           <span className="font-medium text-sm">
// //                             {getUserDisplayName(message)}
// //                           </span>
// //                           <Badge
// //                             className={`text-xs ${getMessageTypeColor(
// //                               message.post_type
// //                             )}`}
// //                           >
// //                             {message.post_type}
// //                           </Badge>
// //                           <span className="text-xs text-gray-500">
// //                             {formatTime(message.created_at)}
// //                           </span>
// //                         </div>
// //                         <p className="text-gray-800">{message.content}</p>
// //                         {message.file_url && (
// //                           <div className="mt-2 max-w-xs w-fit bg-white border rounded-lg p-2 shadow-sm">
// //                             {message.file_type?.startsWith("image/") ? (
// //                               <img
// //                                 src={message.file_url}
// //                                 alt="uploaded"
// //                                 className="rounded-lg max-h-48 object-cover"
// //                               />
// //                             ) : (
// //                               <div className="flex items-center gap-2 mt-1 bg-gray-100 p-2 rounded-md">
// //                                 <div className="bg-gray-300 p-2 rounded-full">
// //                                   <FileText className="h-5 w-5 text-gray-700" />
// //                                 </div>
// //                                 <div className="flex-1 min-w-0">
// //                                   <p className="text-sm font-medium text-gray-800 truncate">
// //                                     {message.content}
// //                                   </p>
// //                                   <a
// //                                     href={message.file_url}
// //                                     target="_blank"
// //                                     rel="noopener noreferrer"
// //                                     className="text-xs text-blue-600 hover:underline"
// //                                   >
// //                                     Download
// //                                   </a>
// //                                 </div>
// //                               </div>
// //                             )}
// //                           </div>
// //                         )}
// //                       </div>
// //                     </div>
// //                   ))}
// //                   <div ref={messagesEndRef} />
// //                 </div>

// //                 <Separator className="mb-4" />

// //                 {/* Message Input */}
// //                 <div className="space-y-3">
// //                   <div className="flex items-center gap-2">
// //                     <Select value={messageType} onValueChange={setMessageType}>
// //                       <SelectTrigger className="w-32">
// //                         <SelectValue />
// //                       </SelectTrigger>
// //                       <SelectContent>
// //                         <SelectItem value="message">Message</SelectItem>
// //                         <SelectItem value="achievement">Achievement</SelectItem>
// //                         <SelectItem value="question">Question</SelectItem>
// //                       </SelectContent>
// //                     </Select>

// //                     <div className="flex gap-1">
// //                       <Button
// //                         variant="outline"
// //                         size="sm"
// //                         onClick={() => setShowWebcam(true)}
// //                         className="flex items-center gap-2 p-2"
// //                       >
// //                         <Camera className="h-4 w-4" />
// //                       </Button>

// //                       {showWebcam && (
// //                         <WebcamCapture
// //                           onCapture={(file) => setSelectedFile(file)}
// //                           onClose={() => setShowWebcam(false)}
// //                         />
// //                       )}

// //                       <Button
// //                         variant="outline"
// //                         size="sm"
// //                         onClick={() => handleFileUpload("image")}
// //                         className="flex items-center gap-2 p-2"
// //                       >
// //                         <Image className="h-4 w-4" />
// //                       </Button>

// //                       <Button
// //                         variant="outline"
// //                         size="sm"
// //                         onClick={() => handleFileUpload("file")}
// //                         className="flex items-center gap-2 p-2"
// //                       >
// //                         <FileText className="h-4 w-4" />
// //                       </Button>
// //                     </div>
// //                   </div>

// //                   <div className="flex gap-2">
// //                     <Input
// //                       value={newMessage}
// //                       onChange={(e) => setNewMessage(e.target.value)}
// //                       onKeyPress={handleKeyPress}
// //                       placeholder="Type your message..."
// //                       disabled={sending}
// //                       className="flex-1"
// //                     />
// //                     <Button
// //                       onClick={sendMessage}
// //                       disabled={
// //                         (!newMessage.trim() && !selectedFile) || sending
// //                       }
// //                       className={`flex items-center gap-2 ${
// //                         newMessage.trim() || selectedFile
// //                           ? "bg-blue-600 text-white hover:bg-blue-700"
// //                           : "bg-gray-200 text-gray-500"
// //                       }`}
// //                     >
// //                       <Send className="h-4 w-4" />
// //                       <span className="hidden sm:inline">Send</span>
// //                     </Button>
// //                   </div>
// //                 </div>
// //               </CardContent>
// //             </Card>
// //           </div>
// //         </div>

// //         {/* Mobile Members List Button */}
// //         <div className="lg:hidden mt-4">
// //           <Button
// //             variant="outline"
// //             className="w-full"
// //             onClick={() => navigate(`/community/${communityId}/members`)}
// //           >
// //             <Users className="h-4 w-4 mr-2" />
// //             View Members ({members.length})
// //           </Button>
// //         </div>

// //         {/* Hidden file input */}
// //         <input
// //           type="file"
// //           ref={fileInputRef}
// //           className="hidden"
// //           accept="*/*"
// //           onChange={(e) => {
// //             const file = e.target.files?.[0];
// //             if (file) {
// //               setSelectedFile(file);
// //               e.target.value = "";
// //             }
// //           }}
// //         />
// //       </div>
// //       <Footer/>
// //     </div>
// //   );
// // };

// // export default CommunityChat;





// import { useState, useEffect, useRef } from "react";
// import { useParams, useNavigate, Link } from "react-router-dom";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { Separator } from "@/components/ui/separator";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import {
//   ArrowLeft,
//   Send,
//   Camera,
//   Image,
//   FileText,
//   Users,
//   MessageCircle,
//   Shield,
//   Menu,
//   X,
//   Home,
//   User,
//   UserPlus,
// } from "lucide-react";
// import { supabase } from "@/integrations/supabase/client";
// import { useToast } from "@/hooks/use-toast";
// import type { User as AuthUser } from "@supabase/supabase-js";
// import WebcamCapture from "./WebcamCapture";
// import logo from "@/image/thefuturemed_logo (1).jpg";

// import Footer from "@/footer/Footer";
// import Header from "@/footer/Header";

// interface Community {
//   id: string;
//   name: string;
//   description: string;
//   category: string;
// }

// interface Message {
//   id: string;
//   user_id: string;
//   community_id: string;
//   content: string;
//   post_type: string;
//   file_url?: string;
//   file_type?: string;
//   created_at: string;
//   user_profile?: {
//     first_name?: string;
//     last_name?: string;
//   };
// }

// interface Member {
//   id: string;
//   user_id: string;
//   joined_at: string;
//   user_profile?: {
//     first_name?: string;
//     last_name?: string;
//   };
// }

// const CommunityChat = () => {
//   const { communityId } = useParams();
//   const navigate = useNavigate();
//   const { toast } = useToast();
//   const messagesEndRef = useRef<HTMLDivElement>(null);
//   const fileInputRef = useRef<HTMLInputElement>(null);

//   const [user, setUser] = useState<AuthUser | null>(null);
//   const [community, setCommunity] = useState<Community | null>(null);
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [members, setMembers] = useState<Member[]>([]);
//   const [newMessage, setNewMessage] = useState("");
//   const [messageType, setMessageType] = useState("message");
//   const [loading, setLoading] = useState(true);
//   const [sending, setSending] = useState(false);
//   const [showWebcam, setShowWebcam] = useState(false);
//   const [selectedFile, setSelectedFile] = useState<File | null>(null);
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

//   useEffect(() => {
//     checkAuthAndLoadData();
//   }, [communityId]);

//   useEffect(() => {
//     scrollToBottom();
//   }, [messages]);

//   useEffect(() => {
//     if (!communityId || !user) return;

//     const messagesSubscription = supabase
//       .channel(`community-${communityId}-messages`)
//       .on(
//         "postgres_changes",
//         {
//           event: "*",
//           schema: "public",
//           table: "community_posts",
//           filter: `community_id=eq.${communityId}`,
//         },
//         () => {
//           loadMessages();
//         }
//       )
//       .subscribe();

//     const membersSubscription = supabase
//       .channel(`community-${communityId}-members`)
//       .on(
//         "postgres_changes",
//         {
//           event: "*",
//           schema: "public",
//           table: "community_memberships",
//           filter: `community_id=eq.${communityId}`,
//         },
//         () => {
//           loadMembers();
//         }
//       )
//       .subscribe();

//     return () => {
//       messagesSubscription.unsubscribe();
//       membersSubscription.unsubscribe();
//     };
//   }, [communityId, user]);

//   const checkAuthAndLoadData = async () => {
//     try {
//       const {
//         data: { session },
//       } = await supabase.auth.getSession();
//       if (!session?.user) {
//         toast({
//           title: "Authentication Required",
//           description: "Please sign in to access the community chat.",
//           variant: "destructive",
//         });
//         navigate("/");
//         return;
//       }

//       setUser(session.user);

//       if (communityId) {
//         await Promise.all([
//           loadCommunity(),
//           loadMessages(),
//           loadMembers(),
//           checkMembership(session.user.id),
//         ]);
//       }
//     } catch (error) {
//       console.error("Error loading chat data:", error);
//       toast({
//         title: "Error",
//         description: "Failed to load community chat.",
//         variant: "destructive",
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const checkMembership = async (userId: string) => {
//     const { data, error } = await supabase
//       .from("community_memberships")
//       .select("*")
//       .eq("community_id", communityId)
//       .eq("user_id", userId)
//       .single();

//     if (error || !data) {
//       toast({
//         title: "Access Denied",
//         description:
//           "You must be a member of this community to access the chat.",
//         variant: "destructive",
//       });
//       navigate("/community");
//     }
//   };

//   const loadCommunity = async () => {
//     const { data, error } = await supabase
//       .from("communities")
//       .select("*")
//       .eq("id", communityId)
//       .single();

//     if (error) {
//       console.error("Error loading community:", error);
//       toast({
//         title: "Error",
//         description: "Failed to load community information.",
//         variant: "destructive",
//       });
//       navigate("/community");
//     } else {
//       setCommunity(data);
//     }
//   };

//   const loadMessages = async () => {
//     try {
//       const { data, error } = await supabase
//         .from("community_posts")
//         .select("*")
//         .eq("community_id", communityId)
//         .order("created_at", { ascending: true })
//         .limit(100);

//       if (error) {
//         console.error("Error loading messages:", error);
//         return;
//       }

//       const messagesWithProfiles = await Promise.all(
//         (data || []).map(async (post) => {
//           try {
//             const { data: profileData, error: profileError } =
//               await supabase.rpc("get_user_profile", {
//                 user_uuid: post.user_id,
//               });

//             return {
//               id: post.id,
//               user_id: post.user_id,
//               community_id: post.community_id,
//               content: post.content,
//               post_type: post.post_type || "message",
//               file_url: post.file_url,
//               file_type: post.file_type,
//               created_at: post.created_at,
//               user_profile:
//                 profileData && profileData.length > 0
//                   ? profileData[0]
//                   : undefined,
//             };
//           } catch (error) {
//             console.error("Error processing profile for post:", post.id, error);
//             return {
//               id: post.id,
//               user_id: post.user_id,
//               community_id: post.community_id,
//               content: post.content,
//               post_type: post.post_type || "message",
//               file_url: post.file_url,
//               file_type: post.file_type,
//               created_at: post.created_at,
//               user_profile: undefined,
//             };
//           }
//         })
//       );

//       setMessages(messagesWithProfiles);
//     } catch (error) {
//       console.error("Error loading messages:", error);
//     }
//   };

//   const loadMembers = async () => {
//     try {
//       const { data, error } = await supabase
//         .from("community_memberships")
//         .select("*")
//         .eq("community_id", communityId)
//         .order("joined_at", { ascending: false });

//       if (error) {
//         console.error("Error loading members:", error);
//         return;
//       }

//       const membersWithProfiles = await Promise.all(
//         (data || []).map(async (membership) => {
//           try {
//             const { data: profileData, error: profileError } =
//               await supabase.rpc("get_user_profile", {
//                 user_uuid: membership.user_id,
//               });

//             return {
//               id: membership.id,
//               user_id: membership.user_id,
//               joined_at: membership.joined_at,
//               user_profile:
//                 profileData && profileData.length > 0
//                   ? profileData[0]
//                   : undefined,
//             };
//           } catch (error) {
//             console.error(
//               "Error processing profile for member:",
//               membership.id,
//               error
//             );
//             return {
//               id: membership.id,
//               user_id: membership.user_id,
//               joined_at: membership.joined_at,
//               user_profile: undefined,
//             };
//           }
//         })
//       );

//       setMembers(membersWithProfiles);
//     } catch (error) {
//       console.error("Error loading members:", error);
//     }
//   };

//   const uploadFileAndSend = async (file: File) => {
//     if (!user || !communityId) return;

//     const fileExt = file.name.split(".").pop();
//     const filePath = `${communityId}/${Date.now()}-${file.name}`;

//     const { data, error } = await supabase.storage
//       .from("community-files")
//       .upload(filePath, file);

//     if (error) {
//       toast({
//         title: "Upload failed",
//         description: error.message,
//         variant: "destructive",
//       });
//       return;
//     }

//     const { data: publicUrlData } = supabase.storage
//       .from("community-files")
//       .getPublicUrl(filePath);
//     const fileUrl = publicUrlData?.publicUrl;

//     if (fileUrl) {
//       const { error: insertError } = await supabase
//         .from("community_posts")
//         .insert({
//           user_id: user.id,
//           community_id: communityId,
//           content: file.name,
//           post_type: messageType || "file",
//           file_url: fileUrl,
//           file_type: file.type,
//         });

//       if (insertError) {
//         toast({
//           title: "Error",
//           description: "Could not send file message.",
//           variant: "destructive",
//         });
//       }
//     }
//   };

//   // const sendMessage = async () => {
//   //   if (
//   //     (!newMessage.trim() && !selectedFile) ||
//   //     !user ||
//   //     !communityId ||
//   //     sending
//   //   )
//   //     return;

//   //   setSending(true);

//   //   try {
//   //     if (selectedFile) {
//   //       const fileExt = selectedFile.name.split(".").pop();
//   //       const sanitizedFileName = selectedFile.name
//   //         .replace(/\s+/g, "_")
//   //         .replace(/[^\w.-]/gi, "");
//   //       const filePath = `${communityId}/${Date.now()}-${sanitizedFileName}`;

//   //       const { data: uploadData, error: uploadError } = await supabase.storage
//   //         .from("community-files")
//   //         .upload(filePath, selectedFile);

//   //       if (uploadError) {
//   //         toast({
//   //           title: "Upload failed",
//   //           description: uploadError.message,
//   //           variant: "destructive",
//   //         });
//   //         return;
//   //       }

//   //       const { data: publicUrlData } = supabase.storage
//   //         .from("community-files")
//   //         .getPublicUrl(filePath);

//   //       const fileUrl = publicUrlData?.publicUrl;

//   //       const { error: insertError } = await supabase
//   //         .from("community_posts")
//   //         .insert({
//   //           user_id: user.id,
//   //           community_id: communityId,
//   //           content: newMessage.trim() || selectedFile.name,
//   //           post_type: messageType || "file",
//   //           file_url: fileUrl,
//   //           file_type: selectedFile.type,
//   //         });

//   //       if (insertError) {
//   //         toast({
//   //           title: "Error",
//   //           description: "Could not send file message.",
//   //           variant: "destructive",
//   //         });
//   //       }
//   //     } else {
//   //       const { error } = await supabase.from("community_posts").insert({
//   //         user_id: user.id,
//   //         community_id: communityId,
//   //         content: newMessage.trim(),
//   //         post_type: messageType,
//   //       });

//   //       if (error) {
//   //         toast({
//   //           title: "Error",
//   //           description: "Failed to send message. Please try again.",
//   //           variant: "destructive",
//   //         });
//   //       }
//   //     }

//   //     setNewMessage("");
//   //     setSelectedFile(null);
//   //     setMessageType("message");
//   //   } catch (error) {
//   //     console.error("Error sending message:", error);
//   //   } finally {
//   //     setSending(false);
//   //   }
//   // };
// const sendMessage = async () => {
//   if ((!newMessage.trim() && !selectedFile) || !user || !communityId || sending)
//     return;

//   setSending(true);

//   try {
//     if (selectedFile) {
//       const fileExt = selectedFile.name.split(".").pop();
//       const sanitizedFileName = selectedFile.name
//         .replace(/\s+/g, "_")
//         .replace(/[^\w.-]/gi, "");
//       const filePath = `${communityId}/${Date.now()}-${sanitizedFileName}`;

//       const { data: uploadData, error: uploadError } = await supabase.storage
//         .from("community-files")
//         .upload(filePath, selectedFile);

//       if (uploadError) {
//         toast({
//           title: "Upload failed",
//           description: uploadError.message,
//           variant: "destructive",
//         });
//         return;
//       }

//       // ✅ Create signed URL with ?token
//       const { data: signedUrlData, error: signedUrlError } =
//         await supabase.storage
//           .from("community-files")
//           .createSignedUrl(filePath, 60 * 60); // 1 hour token validity

//       if (signedUrlError) {
//         toast({
//           title: "Signed URL Error",
//           description: signedUrlError.message,
//           variant: "destructive",
//         });
//         return;
//       }

//       const fileUrl = signedUrlData?.signedUrl;

//       const { error: insertError } = await supabase
//         .from("community_posts")
//         .insert({
//           user_id: user.id,
//           community_id: communityId,
//           content: newMessage.trim() || selectedFile.name,
//           post_type: messageType || "file",
//           file_url: fileUrl,
//           file_type: selectedFile.type,
//         });

//       if (insertError) {
//         toast({
//           title: "Error",
//           description: "Could not send file message.",
//           variant: "destructive",
//         });
//       }
//     } else {
//       const { error } = await supabase.from("community_posts").insert({
//         user_id: user.id,
//         community_id: communityId,
//         content: newMessage.trim(),
//         post_type: messageType,
//       });

//       if (error) {
//         toast({
//           title: "Error",
//           description: "Failed to send message. Please try again.",
//           variant: "destructive",
//         });
//       }
//     }

//     // Reset states
//     setNewMessage("");
//     setSelectedFile(null);
//     setMessageType("message");
//   } catch (error) {
//     console.error("Error sending message:", error);
//     toast({
//       title: "Unexpected Error",
//       description: "Something went wrong. Try again.",
//       variant: "destructive",
//     });
//   } finally {
//     setSending(false);
//   }
// };

//   const handleKeyPress = (e: React.KeyboardEvent) => {
//     if (e.key === "Enter" && !e.shiftKey) {
//       e.preventDefault();
//       sendMessage();
//     }
//   };
//   // 22222222222222222222222222222222222222222222222222
//   const handleFileUpload = (type: string) => {
//     if (fileInputRef.current) {
//       if (type === "camera") {
//         fileInputRef.current.accept = "image/*";
//         fileInputRef.current.capture = "environment";
//       } else if (type === "image") {
//         fileInputRef.current.accept = "image/*";
//         fileInputRef.current.removeAttribute("capture");
//       } else {
//         fileInputRef.current.accept = "*/*";
//         fileInputRef.current.removeAttribute("capture");
//       }
//       fileInputRef.current.click();
//     }
//   };

//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   };

//   const formatTime = (timestamp: string) => {
//     return new Date(timestamp).toLocaleTimeString([], {
//       hour: "2-digit",
//       minute: "2-digit",
//     });
//   };

//   const getUserDisplayName = (message: Message) => {
//     const profile = message.user_profile;
//     if (profile?.first_name || profile?.last_name) {
//       return `${profile.first_name || ""} ${profile.last_name || ""}`.trim();
//     }
//     return message.user_id === user?.id ? "You" : "Anonymous";
//   };

//   const getMessageTypeColor = (type: string) => {
//     switch (type) {
//       case "achievement":
//         return "bg-green-100 text-green-800";
//       case "question":
//         return "bg-yellow-100 text-yellow-800";
//       default:
//         return "bg-blue-100 text-blue-800";
//     }
//   };

//   const handleBackNavigation = () => {
//     navigate("/community");
//   };

//   const handleSignOut = async () => {
//     try {
//       const { error } = await supabase.auth.signOut();
//       if (error) throw error;
//       setUser(null);
//       toast({
//         title: "Signed Out",
//         description: "You have been successfully signed out.",
//       });
//       navigate("/");
//     } catch (error) {
//       console.error("Sign out error:", error);
//       toast({
//         title: "Error",
//         description: "Failed to sign out. Please try again.",
//         variant: "destructive",
//       });
//     }
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
//           <p className="text-gray-600">Loading community chat...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
//       {/* Mobile Menu Overlay */}
//       {mobileMenuOpen && (
//         <div
//           className="fixed inset-0 bg-black/50 z-40 lg:hidden"
//           onClick={() => setMobileMenuOpen(false)}
//         ></div>
//       )}

//       {/* Mobile Menu */}
//       <div
//         className={`fixed top-0 right-0 h-full w-64 bg-white z-50 transform transition-transform duration-300 ease-in-out lg:hidden ${
//           mobileMenuOpen ? "translate-x-0" : "translate-x-full"
//         }`}
//       >
//         <div className="p-4 flex justify-end">
//           <Button variant="ghost" onClick={() => setMobileMenuOpen(false)}>
//             <X className="h-6 w-6" />
//           </Button>
//         </div>
//         <div className="p-4">
//           {user ? (
//             <div className="mb-6 p-4 bg-gray-100 rounded-lg">
//               <p className="text-sm font-medium truncate">
//                 Welcome, {user.email}
//               </p>
//             </div>
//           ) : null}
//           <div className="mt-6 border-t pt-4">
//             {user ? (
//               <>
//                 <Button
//                   variant="ghost"
//                   className="w-full justify-start mb-2"
//                   onClick={() => navigate("/profile")}
//                 >
//                   <User className="h-4 w-4" />
//                   <span className="ml-2">Profile</span>
//                 </Button>
//                 <Button
//                   variant="ghost"
//                   className="w-full justify-start text-red-600 hover:text-red-700"
//                   onClick={handleSignOut}
//                 >
//                   <span className="ml-2">Sign Out</span>
//                 </Button>
//               </>
//             ) : (
//               <>
//                 <Link to="/register" className="block w-full mb-2">
//                   <Button variant="ghost" className="w-full justify-start">
//                     Register
//                   </Button>
//                 </Link>
//                 <Link to="/" className="block w-full">
//                   <Button className="w-full justify-start bg-blue-600 text-white hover:bg-blue-700">
//                     <UserPlus className="h-4 w-4" />
//                     <span className="ml-2">Sign In</span>
//                   </Button>
//                 </Link>
//               </>
//             )}
//             <Button
//               variant="ghost"
//               className="w-full justify-start mt-4"
//               onClick={() => navigate("/")}
//             >
//               <Home className="h-4 w-4" />
//               <span className="ml-2">Home</span>
//             </Button>
//           </div>
//         </div>
//       </div>

//       {/* <header className="bg-black/30 backdrop-blur-md border-b border-white/20 sticky top-0 z-50 shadow-xl">
//         <div className="container mx-auto px-4 py-4">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center space-x-2 sm:space-x-4">
//               <Button
//                 variant="outline"
//                 onClick={handleBackNavigation}
//                 className="text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm p-2"
//                 title="Go back"
//               >
//                 <ArrowLeft className="h-4 w-4" />
//                 <span className="hidden sm:inline ml-2">Back</span>
//               </Button>
//               <Link to="/" className="flex items-center space-x-2">
//                 <Shield className="h-6 w-6 sm:h-8 sm:w-8 text-blue-400" />
//                 <h1 className="text-xl sm:text-2xl font-bold text-white">
//                   MedPortal
//                 </h1>
//               </Link>
//               <div className="flex items-center space-x-2">
//                 <Shield className="h-8 w-8 text-blue-600" />
//               <h1 className="text-2xl font-bold text-gray-900">MedPortal</h1>
//                 <Link to="/">
//                   <img src={logo} alt="Logo" className="h-10 w-100 mr-2" />
//                 </Link>
//               </div>
//             </div>
//             <div className="hidden lg:flex items-center space-x-4">
//               {user ? (
//                 <div className="flex items-center space-x-4">
//                   <span className="text-white text-sm bg-white/10 px-3 py-1 rounded-full truncate max-w-[160px]">
//                     Welcome, {user.email}
//                   </span>
//                   <Button
//                     variant="outline"
//                     className="text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm"
//                     onClick={() => navigate("/profile")}
//                   >
//                     <User className="mr-2 h-4 w-4" />
//                     Profile
//                   </Button>
//                   <Button
//                     variant="outline"
//                     className="text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm"
//                     onClick={handleSignOut}
//                   >
//                     Sign Out
//                   </Button>
//                 </div>
//               ) : (
//                 <>
//                   <Link to="/register">
//                     <Button
//                       variant="outline"
//                       className="text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm"
//                     >
//                       Register
//                     </Button>
//                   </Link>
//                   <Link to="/">
//                     <Button className="bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl transition-all duration-200">
//                       <UserPlus className="mr-2 h-4 w-4" />
//                       Sign In
//                     </Button>
//                   </Link>
//                 </>
//               )}
//               <Button
//                 variant="outline"
//                 onClick={() => navigate("/")}
//                 className="text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm"
//                 title="Go to home page"
//               >
//                 <Home className="mr-2 h-4 w-4" />
//                 <span className="hidden sm:inline">Home</span>
//               </Button>
//             </div>
//             <div className="flex lg:hidden items-center">
//               <Button
//                 variant="outline"
//                 className="text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm"
//                 onClick={() => setMobileMenuOpen(true)}
//               >
//                 <Menu className="h-6 w-6" />
//               </Button>
//             </div>
//           </div>
//         </div>
//       </header> */}
//       <Header/>

//       <div className="container mx-auto px-4 py-6">
//         {/* Mobile Community Header */}
//         <div className="lg:hidden mb-4">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center gap-2">
//               {/* <Button variant="outline" size="sm" onClick={() => navigate('/community')}>
//                 <ArrowLeft className="h-4 w-4" />
//               </Button> */}
//               <div>
//                 <h1 className="text-xl font-bold text-gray-900">
//                   {community?.name}
//                 </h1>
//                 <p className="text-gray-600 text-sm line-clamp-1">
//                   {community?.description}
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
//           {/* Members List - Hidden on mobile unless expanded */}
//           <Card className="lg:col-span-1 hidden lg:block">
//             <CardHeader>
//               <CardTitle className="flex items-center gap-2">
//                 <Users className="h-5 w-5" />
//                 Live Members ({members.length})
//               </CardTitle>
//             </CardHeader>
//             <CardContent>
//               <div className="space-y-2">
//                 {members.map((member) => {
//                   const profile = member.user_profile;
//                   const displayName =
//                     profile?.first_name || profile?.last_name
//                       ? `${profile.first_name || ""} ${
//                           profile.last_name || ""
//                         }`.trim()
//                       : "Anonymous";

//                   return (
//                     <div
//                       key={member.id}
//                       className="flex items-center gap-2 p-2 rounded-lg bg-gray-50"
//                     >
//                       <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
//                         {displayName.charAt(0).toUpperCase()}
//                       </div>
//                       <div className="flex-1">
//                         <p className="text-sm font-medium">{displayName}</p>
//                         {member.user_id === user?.id && (
//                           <Badge
//                             variant="secondary"
//                             className="text-sm bg-blue-100 text-800"
//                           >
//                             You
//                           </Badge>
//                         )}
//                       </div>
//                     </div>
//                   );
//                 })}
//               </div>
//             </CardContent>
//           </Card>

//           {/* Chat Area */}
//           <div className="lg:col-span-3">
//             {/* Desktop Community Header */}
//             <div className="hidden lg:block mb-6">
//               <div className="flex items-center gap-4">
//                 {/* <Button variant="outline" onClick={() => navigate('/community')}>
//                   <ArrowLeft className="h-4 w-4 mr-2" />
//                   Back to Communities
//                 </Button> */}
//                 <div>
//                   <h1 className="text-2xl font-bold text-gray-900">
//                     {community?.name}
//                   </h1>
//                   <p className="text-gray-600">{community?.description}</p>
//                 </div>
//               </div>
//             </div>

//             <Card>
//               <CardHeader>
//                 <CardTitle className="flex items-center gap-2">
//                   <MessageCircle className="h-5 w-5" />
//                   General Chat
//                 </CardTitle>
//               </CardHeader>
//               <CardContent className="min-h-[400px] lg:h-[500px] flex flex-col">
//                 {/* Messages */}
//                 <div className="flex-1 overflow-y-auto mb-4 space-y-3">
//                   {messages.map((message) => (
//                     <div key={message.id} className="flex gap-3">
//                       <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-medium flex-shrink-0">
//                         {getUserDisplayName(message).charAt(0).toUpperCase()}
//                       </div>
//                       <div className="flex-1">
//                         <div className="flex items-center gap-2 mb-1">
//                           <span className="font-medium text-sm">
//                             {getUserDisplayName(message)}
//                           </span>
//                           <Badge
//                             className={`text-xs ${getMessageTypeColor(
//                               message.post_type
//                             )}`}
//                           >
//                             {message.post_type}
//                           </Badge>
//                           <span className="text-xs text-gray-500">
//                             {formatTime(message.created_at)}
//                           </span>
//                         </div>
//                         <p className="text-gray-800">{message.content}</p>
//                         {message.file_url && (
//                           <div className="mt-2 max-w-xs w-fit bg-white border rounded-lg p-2 shadow-sm">
//                             {message.file_type?.startsWith("image/") ? (
//                               <img
//                                 src={message.file_url}
//                                 alt="uploaded"
//                                 className="rounded-lg max-h-48 object-cover"
//                               />
//                             ) : (
//                               <div className="flex items-center gap-2 mt-1 bg-gray-100 p-2 rounded-md">
//                                 <div className="bg-gray-300 p-2 rounded-full">
//                                   <FileText className="h-5 w-5 text-gray-700" />
//                                 </div>
//                                 <div className="flex-1 min-w-0">
//                                   <p className="text-sm font-medium text-gray-800 truncate">
//                                     {message.content}
//                                   </p>
//                                   <a
//                                     href={message.file_url}
//                                     target="_blank"
//                                     rel="noopener noreferrer"
//                                     className="text-xs text-blue-600 hover:underline"
//                                   >
//                                     Download
//                                   </a>
//                                 </div>
//                               </div>
//                             )}
//                           </div>
//                         )}
//                       </div>
//                     </div>
//                   ))}
//                   <div ref={messagesEndRef} />
//                 </div>

//                 <Separator className="mb-4" />

//                 {/* Message Input */}
//                 <div className="space-y-3">
//                   <div className="flex items-center gap-2">
//                     <Select value={messageType} onValueChange={setMessageType}>
//                       <SelectTrigger className="w-32">
//                         <SelectValue />
//                       </SelectTrigger>
//                       <SelectContent>
//                         <SelectItem value="message">Message</SelectItem>
//                         <SelectItem value="achievement">Achievement</SelectItem>
//                         <SelectItem value="question">Question</SelectItem>
//                       </SelectContent>
//                     </Select>

//                     <div className="flex gap-1">
//                       <Button
//                         variant="outline"
//                         size="sm"
//                         onClick={() => setShowWebcam(true)}
//                         className="flex items-center gap-2 p-2"
//                       >
//                         <Camera className="h-4 w-4" />
//                       </Button>

//                       {showWebcam && (
//                         <WebcamCapture
//                           onCapture={(file) => setSelectedFile(file)}
//                           onClose={() => setShowWebcam(false)}
//                         />
//                       )}

//                       <Button
//                         variant="outline"
//                         size="sm"
//                         onClick={() => handleFileUpload("image")}
//                         className="flex items-center gap-2 p-2"
//                       >
//                         <Image className="h-4 w-4" />
//                       </Button>

//                       <Button
//                         variant="outline"
//                         size="sm"
//                         onClick={() => handleFileUpload("file")}
//                         className="flex items-center gap-2 p-2"
//                       >
//                         <FileText className="h-4 w-4" />
//                       </Button>
//                     </div>
//                   </div>

//                   <div className="flex gap-2">
//                     <Input
//                       value={newMessage}
//                       onChange={(e) => setNewMessage(e.target.value)}
//                       onKeyPress={handleKeyPress}
//                       placeholder="Type your message..."
//                       disabled={sending}
//                       className="flex-1"
//                     />
//                     <Button
//                       onClick={sendMessage}
//                       disabled={
//                         (!newMessage.trim() && !selectedFile) || sending
//                       }
//                       className={`flex items-center gap-2 ${
//                         newMessage.trim() || selectedFile
//                           ? "bg-blue-600 text-white hover:bg-blue-700"
//                           : "bg-gray-200 text-gray-500"
//                       }`}
//                     >
//                       <Send className="h-4 w-4" />
//                       <span className="hidden sm:inline">Send</span>
//                     </Button>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//           </div>
//         </div>

//         {/* Mobile Members List Button */}
//         <div className="lg:hidden mt-4">
//           <Button
//             variant="outline"
//             className="w-full"
//             onClick={() => navigate(`/community/${communityId}/members`)}
//           >
//             <Users className="h-4 w-4 mr-2" />
//             View Members ({members.length})
//           </Button>
//         </div>

//         {/* Hidden file input */}
//         <input
//           type="file"
//           ref={fileInputRef}
//           className="hidden"
//           accept="*/*"
//           onChange={(e) => {
//             const file = e.target.files?.[0];
//             if (file) {
//               setSelectedFile(file);
//               e.target.value = "";
//             }
//           }}
//         />
//       </div>
//       <Footer />
//     </div>
//   );
// };

// export default CommunityChat;


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
  ImageIcon,
  Image,
  FileText,
  File,
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
import Header from "@/footer/Header";
import { mixpanelInstance } from "@/utils/mixpanel";

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
const PdfIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-10 w-10 text-red-500"
    viewBox="0 0 24 24"
  >
    <path
      fill="currentColor"
      d="M8.267 14.68c-.184 0-.308.018-.372.036v1.178c.076.018.171.023.302.023c.479 0 .774-.242.774-.651c0-.366-.254-.586-.704-.586zm3.487.012c-.2 0-.33.018-.407.036v2.61c.077.018.201.018.313.018c.817.006 1.349-.444 1.349-1.396c0-.93-.585-1.268-1.255-1.268z"
    />
    <path
      fill="currentColor"
      d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zM9.498 16.19c-.309.29-.765.42-1.296.42c-.242 0-.37-.011-.374-.011v1.62H7v-3.971h.379c.094 0 .128.022.128.071v.688c.029-.01.11-.026.171-.026c.566 0 .953.318.953.828c0 .39-.215.773-.707.773zm3.064 1.016c-1.032 0-1.639-.65-1.639-1.576c0-.953.606-1.585 1.639-1.585c.522 0 .86.21 1.072.52h.085V12.7h.578v4.02h-.578v-.09c-.216.316-.554.556-1.087.556zm2.906-3.105h-.69v3.855h-.578V14.1h-.691v-.578h1.959v.578zM14 9h-1V4l5 5h-4z"
    />
  </svg>
);

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
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
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
            let fileUrlWithToken = post.file_url;

            // If the file is in Supabase storage, get signed URL (valid for e.g. 1 hour)
            if (fileUrlWithToken && !fileUrlWithToken.includes("token=")) {
              try {
                const filePath = fileUrlWithToken.split("/community-files/")[1]; // extract path
                const { data: signedData } = await supabase.storage
                  .from("community-files")
                  .createSignedUrl(filePath, 3600); // 1 hour validity
                if (signedData?.signedUrl) {
                  fileUrlWithToken = signedData.signedUrl;
                }
              } catch (err) {
                console.error("Error generating signed URL:", err);
              }
            }
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
              // file_url: post.file_url,
              file_url: fileUrlWithToken,
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
        const sanitizedFileName = selectedFile.name
          .replace(/\s+/g, "_")
          .replace(/[^\w.-]/gi, "");
        const filePath = `${communityId}/${Date.now()}-${sanitizedFileName}`;

        const { data: uploadData, error: uploadError } = await supabase.storage
          .from("community-files")
          .upload(filePath, selectedFile, {
          upsert: true
        });

        if (uploadError) {
          toast({
            title: "Upload failed",
            description: uploadError.message,
            variant: "destructive",
          });
          return;
        }

        // Get public URL without token
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

      // Reset states
      setNewMessage("");
      setSelectedFile(null);
      setPreviewUrl(null);
      setMessageType("message");
    } catch (error) {
      console.error("Error sending message:", error);
      toast({
        title: "Unexpected Error",
        description: "Something went wrong. Try again.",
        variant: "destructive",
      });
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);

      // Create preview URL for images
      if (file.type.startsWith("image/")) {
        const url = URL.createObjectURL(file);
        setPreviewUrl(url);
      } else {
        setPreviewUrl(null);
      }

      e.target.value = "";
    }
  };

  const getFileTypeIcon = (fileType: string) => {
    if (fileType.includes("pdf")) return <PdfIcon />;
    if (fileType.includes("image"))
      return <ImageIcon className="h-10 w-10 text-blue-500" />;
    return <File className="h-10 w-10 text-gray-500" />;
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

      <Header />

      <div className="container mx-auto px-4 py-6">
        {/* Mobile Community Header */}
        <div className="lg:hidden mb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
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
                          <Badge
                            variant="secondary"
                            className="text-sm bg-blue-100 text-800"
                          >
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
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    {community?.name}
                  </h1>
                  <p className="text-gray-600">{community?.description}</p>
                </div>
              </div>
            </div>

            <Card className="h-auto">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="h-5 w-5" />
                  General Chat
                </CardTitle>
              </CardHeader>
              <CardContent className="min-h-[600px] lg:h-[600px] flex flex-col">
                {/* <CardContent className="min-h-[400px] lg:h-[500px] flex flex-col"> */}
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
                          onCapture={(file) => {
                            setSelectedFile(file);
                            const url = URL.createObjectURL(file);
                            setPreviewUrl(url);
                          }}
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

                  {/* File preview */}
                  {/* {previewUrl && (
                    <div
                      className="mt-2 p-2 border-2 border-blue-500 bg-blue-50 rounded-lg"
                      style={{ width: "500px", height: "300px" }}
                    >
                      <p className="text-sm text-blue-800 font-semibold mb-1">
                        Post Preview (Message will not be posted until you click
                        Send Icon)
                      </p>
                      <img
                        src={previewUrl}
                        alt="Preview"
                        className="rounded-lg object-cover w-full h-full"
                        style={{
                          height: "100px",
                          width: "100px",
                          objectFit: "cover",
                        }}
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        className="mt-2 text-red-500 hover:text-red-700"
                        onClick={() => {
                          setSelectedFile(null);
                          setPreviewUrl(null);
                        }}
                      >
                        Remove Image
                      </Button>
                    </div>
                  )} */}
                  {selectedFile && (
                    <div className="mt-2 p-2 border-2 border-blue-500 bg-blue-50 rounded-lg max-w-xs">
                      <p className="text-sm text-blue-800 font-semibold mb-1">
                        {/* Post Preview (Click Send to post) */}
                        Post Preview (Message will not be posted until you click
                        Send Icon)
                      </p>
                      {selectedFile.type.startsWith("image/") ? (
                        <div className="flex flex-col items-center">
                          <img
                            src={previewUrl || ""}
                            alt="Preview"
                            className="rounded-lg object-contain max-h-48 w-full"
                          />
                          <p className="text-xs mt-1 text-gray-600">
                            {selectedFile.name} (
                            {(selectedFile.size / 1024).toFixed(1)} KB)
                          </p>
                        </div>
                      ) : (
                        <div className="flex items-center gap-3 p-2 bg-white rounded">
                          {getFileTypeIcon(selectedFile.type)}
                          <div>
                            <p className="text-sm font-medium truncate max-w-[180px]">
                              {selectedFile.name}
                            </p>
                            <p className="text-xs text-gray-500">
                              {(selectedFile.size / 1024).toFixed(1)} KB
                            </p>
                          </div>
                        </div>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        className="mt-2 text-red-500 hover:text-red-700"
                        onClick={() => {
                          setSelectedFile(null);
                          setPreviewUrl(null);
                        }}
                      >
                        Remove File
                      </Button>
                    </div>
                  )}

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
                      // onClick={sendMessage}
                      onClick={() => {
                        mixpanelInstance.track(
                          "Community post Button Clicked",
                          {
                            timestamp: new Date().toISOString(),
                          }
                        );
                        sendMessage();
                      }}
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
          onChange={handleFileChange}
        />
      </div>
      <Footer />
    </div>
  );
};

export default CommunityChat;