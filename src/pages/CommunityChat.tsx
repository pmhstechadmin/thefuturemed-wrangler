
import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Send, Trophy, HelpCircle, MessageCircle, Users, Shield } from 'lucide-react';
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
  const [user, setUser] = useState<any>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

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
      const { data, error } = await supabase
        .from('communities')
        .select('*')
        .eq('id', communityId)
        .single();

      if (error) throw error;

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
      const { data, error } = await supabase
        .from('community_posts')
        .select('*')
        .eq('community_id', communityId)
        .order('created_at', { ascending: true });

      if (error) throw error;

      // Fetch user profiles for all posts
      const postsWithProfiles = await Promise.all(
        (data || []).map(async (post) => {
          try {
            const { data: profileData, error: profileError } = await supabase
              .rpc('get_user_profile', { user_uuid: post.user_id });

            return {
              ...post,
              user_profile: profileData && profileData.length > 0 ? profileData[0] : null
            };
          } catch (error) {
            return {
              ...post,
              user_profile: null
            };
          }
        })
      );

      setPosts(postsWithProfiles);
    } catch (error: any) {
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
      const { data, error } = await supabase
        .from('community_memberships')
        .select('user_id, joined_at')
        .eq('community_id', communityId);

      if (error) throw error;

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
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  };

  const sendMessage = async () => {
    if (!newMessage.trim() || !user) return;

    setSending(true);
    try {
      const postData = {
        community_id: communityId,
        user_id: user.id,
        content: newMessage,
        post_type: postType
      };
      
      const { error } = await supabase
        .from('community_posts')
        .insert([postData]);

      if (error) throw error;

      setNewMessage('');
      setPostType('message');
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to send message.",
        variant: "destructive",
      });
    } finally {
      setSending(false);
    }
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

  if (!community) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center">
        <div className="text-center">Loading community...</div>
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
              <Link to="/community" className="flex items-center space-x-2">
                <ArrowLeft className="h-6 w-6 text-blue-600" />
              </Link>
              <div className="flex items-center space-x-2">
                <Shield className="h-8 w-8 text-blue-600" />
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">{community.name}</h1>
                  <p className="text-sm text-gray-500">{community.member_count} members</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Live Members Panel */}
          <div className="lg:col-span-1">
            <Card className="h-fit">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Live Members ({members.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-64">
                  <div className="space-y-2">
                    {members.map((member) => (
                      <div key={member.user_id} className="flex items-center gap-2 p-2 rounded-lg bg-gray-50">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-sm font-medium">
                          {getUserDisplayName(member.user_profile)}
                        </span>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>

          {/* Chat Panel */}
          <div className="lg:col-span-3">
            <Card className="h-[70vh] flex flex-col">
              <CardHeader className="border-b">
                <CardTitle>General Chat</CardTitle>
              </CardHeader>

              <CardContent className="flex-1 flex flex-col p-0">
                {/* Messages */}
                <ScrollArea ref={scrollAreaRef} className="flex-1 p-4">
                  {loading ? (
                    <div className="text-center py-4 text-gray-500">Loading messages...</div>
                  ) : posts.length === 0 ? (
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
                        </motion.div>
                      ))}
                    </div>
                  )}
                </ScrollArea>

                {/* Message Input */}
                <div className="border-t p-4 space-y-3">
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

                  {/* Message Input */}
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
                    />
                    <Button 
                      onClick={sendMessage} 
                      disabled={!newMessage.trim() || sending}
                    >
                      {sending ? (
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      ) : (
                        <Send className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
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
