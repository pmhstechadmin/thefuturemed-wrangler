
import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Send, Trophy, HelpCircle, MessageCircle, Users, Shield, Camera, Upload, Image } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface Community {
  id: string;
  name: string;
  description: string;
  category: string;
  member_count: number;
}

interface CommunityPost {
  id: string;
  content: string;
  post_type: string;
  created_at: string;
  user_id: string;
  file_url?: string;
  file_type?: string;
  user_profile?: {
    first_name: string | null;
    last_name: string | null;
  } | null;
}

interface CommunityMember {
  user_id: string;
  joined_at: string;
  user_profile?: {
    first_name: string | null;
    last_name: string | null;
  } | null;
}

const CommunityChat = () => {
  const { communityId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [community, setCommunity] = useState<Community | null>(null);
  const [posts, setPosts] = useState<CommunityPost[]>([]);
  const [members, setMembers] = useState<CommunityMember[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [postType, setPostType] = useState<'message' | 'achievement' | 'question'>('message');
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [uploadingFile, setUploadingFile] = useState(false);
  const [user, setUser] = useState<any>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    checkUser();
  }, []);

  useEffect(() => {
    if (user && communityId) {
      fetchCommunity();
      fetchPosts();
      fetchMembers();
      subscribeToNewPosts();
    }
  }, [user, communityId]);

  useEffect(() => {
    // Auto-scroll to bottom when new messages arrive
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  }, [posts]);

  const checkUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    setUser(user);
    if (!user) {
      navigate('/register');
    }
  };

  const fetchCommunity = async () => {
    try {
      console.log('Fetching community data for ID:', communityId);
      
      const { data, error } = await supabase
        .from('communities')
        .select('*')
        .eq('id', communityId)
        .single();

      if (error) {
        console.error('Error fetching community:', error);
        throw error;
      }

      console.log('Community data fetched:', data);

      // Get member count
      const { data: memberData } = await supabase
        .from('community_memberships')
        .select('user_id')
        .eq('community_id', communityId);

      setCommunity({
        ...data,
        member_count: memberData?.length || 0
      });
    } catch (error: any) {
      console.error('Error loading community:', error);
      toast({
        title: "Error",
        description: "Failed to load community.",
        variant: "destructive",
      });
      navigate('/community');
    }
  };

  const fetchPosts = async () => {
    try {
      console.log('Fetching posts for community:', communityId);
      
      const { data, error } = await supabase
        .from('community_posts')
        .select('*')
        .eq('community_id', communityId)
        .order('created_at', { ascending: true });

      if (error) {
        console.error('Error fetching posts:', error);
        throw error;
      }

      console.log('Posts fetched:', data);

      // Fetch user profiles for all posts
      const postsWithProfiles = await Promise.all(
        (data || []).map(async (post) => {
          try {
            const { data: profileData, error: profileError } = await supabase
              .rpc('get_user_profile', { user_uuid: post.user_id });

            if (profileError) {
              console.error('Error fetching profile for user:', post.user_id, profileError);
            }

            return {
              ...post,
              user_profile: profileData && profileData.length > 0 ? profileData[0] : null
            };
          } catch (error) {
            console.error('Error processing profile for post:', post.id, error);
            return {
              ...post,
              user_profile: null
            };
          }
        })
      );

      setPosts(postsWithProfiles);
    } catch (error: any) {
      console.error('Error fetching posts:', error);
      toast({
        title: "Error",
        description: "Failed to load messages.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchMembers = async () => {
    try {
      console.log('Fetching members for community:', communityId);
      
      const { data, error } = await supabase
        .from('community_memberships')
        .select('user_id, joined_at')
        .eq('community_id', communityId);

      if (error) {
        console.error('Error fetching members:', error);
        throw error;
      }

      console.log('Members fetched:', data);

      // Fetch user profiles for all members
      const membersWithProfiles = await Promise.all(
        (data || []).map(async (member) => {
          try {
            const { data: profileData } = await supabase
              .rpc('get_user_profile', { user_uuid: member.user_id });

            return {
              ...member,
              user_profile: profileData && profileData.length > 0 ? profileData[0] : null
            };
          } catch (error) {
            console.error('Error fetching member profile:', error);
            return {
              ...member,
              user_profile: null
            };
          }
        })
      );

      setMembers(membersWithProfiles);
    } catch (error: any) {
      console.error('Error fetching members:', error);
    }
  };

  const subscribeToNewPosts = () => {
    console.log('Setting up realtime subscription for community:', communityId);
    
    const subscription = supabase
      .channel(`community_${communityId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'community_posts',
          filter: `community_id=eq.${communityId}`
        },
        async (payload) => {
          console.log('New post received via realtime:', payload.new);
          
          try {
            const { data: profileData } = await supabase
              .rpc('get_user_profile', { user_uuid: payload.new.user_id });

            const newPost: CommunityPost = {
              id: payload.new.id,
              content: payload.new.content,
              post_type: payload.new.post_type || 'message',
              created_at: payload.new.created_at,
              user_id: payload.new.user_id,
              file_url: payload.new.file_url,
              file_type: payload.new.file_type,
              user_profile: profileData && profileData.length > 0 ? profileData[0] : null
            };

            setPosts(prev => [...prev, newPost]);
          } catch (error) {
            console.error('Error processing new post:', error);
          }
        }
      )
      .subscribe((status) => {
        console.log('Realtime subscription status:', status);
      });

    return () => {
      console.log('Cleaning up realtime subscription');
      supabase.removeChannel(subscription);
    };
  };

  const uploadFile = async (file: File): Promise<{ url: string; type: string } | null> => {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `community-files/${communityId}/${fileName}`;

      console.log('Uploading file:', fileName);

      const { error: uploadError } = await supabase.storage
        .from('community-files')
        .upload(filePath, file);

      if (uploadError) {
        console.error('Upload error:', uploadError);
        throw uploadError;
      }

      const { data } = supabase.storage
        .from('community-files')
        .getPublicUrl(filePath);

      console.log('File uploaded successfully:', data.publicUrl);

      return {
        url: data.publicUrl,
        type: file.type.startsWith('image/') ? 'image' : 'file'
      };
    } catch (error) {
      console.error('Error uploading file:', error);
      toast({
        title: "Upload Error",
        description: "Failed to upload file.",
        variant: "destructive",
      });
      return null;
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !user) return;

    setUploadingFile(true);
    const uploadResult = await uploadFile(file);
    
    if (uploadResult) {
      await sendMessage(uploadResult.url, uploadResult.type);
    }
    
    setUploadingFile(false);
    // Reset file input
    event.target.value = '';
  };

  const sendMessage = async (fileUrl?: string, fileType?: string) => {
    if ((!newMessage.trim() && !fileUrl) || !user) return;

    setSending(true);
    try {
      console.log('Sending message:', { content: newMessage, type: postType, fileUrl, fileType });
      
      const postData: any = {
        community_id: communityId,
        user_id: user.id,
        content: newMessage || (fileUrl ? 'Shared a file' : ''),
        post_type: postType
      };

      if (fileUrl) {
        postData.file_url = fileUrl;
        postData.file_type = fileType;
      }
      
      const { error } = await supabase
        .from('community_posts')
        .insert([postData]);

      if (error) {
        console.error('Error sending message:', error);
        throw error;
      }

      setNewMessage('');
      setPostType('message');
      
      console.log('Message sent successfully');
      
      toast({
        title: "Success",
        description: "Message sent!",
      });
    } catch (error: any) {
      console.error('Error sending message:', error);
      toast({
        title: "Error",
        description: "Failed to send message.",
        variant: "destructive",
      });
    } finally {
      setSending(false);
    }
  };

  const triggerFileUpload = () => {
    fileInputRef.current?.click();
  };

  const triggerCameraCapture = () => {
    cameraInputRef.current?.click();
  };

  const getPostTypeIcon = (type: string) => {
    switch (type) {
      case 'achievement':
        return <Trophy className="h-4 w-4 text-yellow-500" />;
      case 'question':
        return <HelpCircle className="h-4 w-4 text-blue-500" />;
      default:
        return <MessageCircle className="h-4 w-4 text-gray-500" />;
    }
  };

  const getPostTypeColor = (type: string) => {
    switch (type) {
      case 'achievement':
        return 'bg-yellow-100 text-yellow-800';
      case 'question':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);

    if (diffInHours < 24) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else {
      return date.toLocaleDateString();
    }
  };

  const getUserDisplayName = (profile: any) => {
    if (profile?.first_name || profile?.last_name) {
      return `${profile.first_name || ''} ${profile.last_name || ''}`.trim();
    }
    return 'Anonymous User';
  };

  const isOwnMessage = (post: CommunityPost) => {
    return user && post.user_id === user.id;
  };

  const renderFileContent = (post: CommunityPost) => {
    if (!post.file_url) return null;

    if (post.file_type === 'image') {
      return (
        <div className="mt-2">
          <img 
            src={post.file_url} 
            alt="Shared image" 
            className="max-w-xs rounded-lg shadow-sm"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
        </div>
      );
    } else {
      return (
        <div className="mt-2">
          <a 
            href={post.file_url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-blue-600 hover:text-blue-800 text-sm"
          >
            <Upload className="h-4 w-4" />
            View File
          </a>
        </div>
      );
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin h-8 w-8 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600">Loading community chat...</p>
        </div>
      </div>
    );
  }

  if (!community) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center">
        <Card className="max-w-md mx-auto">
          <CardHeader>
            <CardTitle>Community Not Found</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">The community you're looking for doesn't exist or you don't have access to it.</p>
            <Link to="/community">
              <Button className="w-full">Back to Communities</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link to="/community" className="flex items-center space-x-2 text-blue-600 hover:text-blue-800">
                <ArrowLeft className="h-6 w-6" />
                <span>Back to Communities</span>
              </Link>
              <div className="flex items-center space-x-2">
                <Shield className="h-8 w-8 text-blue-600" />
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">{community.name}</h1>
                  <p className="text-sm text-gray-500">{community.member_count} members • {community.category}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(100vh-200px)]">
          {/* Live Members Panel */}
          <div className="lg:col-span-1">
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Live Members ({members.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[calc(100%-4rem)]">
                  <div className="space-y-2">
                    {members.length > 0 ? (
                      members.map((member) => (
                        <div key={member.user_id} className="flex items-center gap-2 p-2 rounded-lg bg-gray-50">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span className="text-sm font-medium">
                            {getUserDisplayName(member.user_profile)}
                          </span>
                          {user && member.user_id === user.id && (
                            <Badge variant="secondary" className="text-xs">You</Badge>
                          )}
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-4 text-gray-500">
                        <Users className="h-8 w-8 mx-auto mb-2 text-gray-300" />
                        <p className="text-sm">No members online</p>
                      </div>
                    )}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>

          {/* Chat Panel */}
          <div className="lg:col-span-3">
            <Card className="h-full flex flex-col">
              <CardHeader className="border-b">
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="h-5 w-5" />
                  General Chat
                </CardTitle>
              </CardHeader>

              <CardContent className="flex-1 flex flex-col p-0">
                {/* Messages */}
                <ScrollArea ref={scrollAreaRef} className="flex-1 p-4">
                  {posts.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      <MessageCircle className="h-12 w-12 mx-auto mb-2 text-gray-300" />
                      <p>No messages yet. Start the conversation!</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {posts.map((post) => (
                        <motion.div
                          key={post.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className={`rounded-lg p-3 shadow-sm border ${
                            isOwnMessage(post) 
                              ? 'bg-blue-50 border-blue-200 ml-8' 
                              : 'bg-white border-gray-200 mr-8'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <span className={`font-medium text-sm ${
                                isOwnMessage(post) ? 'text-blue-700' : 'text-gray-700'
                              }`}>
                                {isOwnMessage(post) ? 'You' : getUserDisplayName(post.user_profile)}
                              </span>
                              <Badge className={`text-xs ${getPostTypeColor(post.post_type)}`}>
                                {getPostTypeIcon(post.post_type)}
                                <span className="ml-1 capitalize">{post.post_type}</span>
                              </Badge>
                            </div>
                            <span className="text-xs text-gray-400">
                              {formatTime(post.created_at)}
                            </span>
                          </div>
                          <p className="text-sm text-gray-700">{post.content}</p>
                          {renderFileContent(post)}
                        </motion.div>
                      ))}
                    </div>
                  )}
                </ScrollArea>

                {/* Message Input Section */}
                <div className="border-t p-4 space-y-3">
                  {/* Message Type Selector */}
                  <Select value={postType} onValueChange={(value: any) => setPostType(value)}>
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="message">
                        <div className="flex items-center gap-2">
                          <MessageCircle className="h-4 w-4" />
                          Message
                        </div>
                      </SelectItem>
                      <SelectItem value="achievement">
                        <div className="flex items-center gap-2">
                          <Trophy className="h-4 w-4" />
                          Achievement
                        </div>
                      </SelectItem>
                      <SelectItem value="question">
                        <div className="flex items-center gap-2">
                          <HelpCircle className="h-4 w-4" />
                          Question
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>

                  {/* File Upload Options */}
                  <div className="flex gap-2 justify-center">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={triggerCameraCapture}
                      disabled={uploadingFile}
                      className="flex-1"
                    >
                      <Camera className="h-4 w-4 mr-1" />
                      Camera
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={triggerFileUpload}
                      disabled={uploadingFile}
                      className="flex-1"
                    >
                      <Image className="h-4 w-4 mr-1" />
                      Gallery
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={triggerFileUpload}
                      disabled={uploadingFile}
                      className="flex-1"
                    >
                      <Upload className="h-4 w-4 mr-1" />
                      File
                    </Button>
                  </div>

                  {/* Hidden File Inputs */}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*,*/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <input
                    ref={cameraInputRef}
                    type="file"
                    accept="image/*"
                    capture="environment"
                    onChange={handleFileUpload}
                    className="hidden"
                  />

                  {/* Text Input and Send Button */}
                  <div className="flex gap-2">
                    <Input
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder={`Type your ${postType}...`}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          sendMessage();
                        }
                      }}
                      className="flex-1"
                      disabled={sending || uploadingFile}
                    />
                    <Button 
                      onClick={() => sendMessage()} 
                      disabled={!newMessage.trim() || sending || uploadingFile}
                    >
                      {sending ? (
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      ) : (
                        <Send className="h-4 w-4" />
                      )}
                    </Button>
                  </div>

                  {uploadingFile && (
                    <div className="text-center text-sm text-gray-500">
                      <div className="flex items-center justify-center gap-2">
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-blue-600 border-t-transparent" />
                        Uploading file...
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityChat;
