
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { X, Send, Trophy, HelpCircle, MessageCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface Community {
  id: string;
  name: string;
  description: string;
  category: string;
  member_count: number;
  is_member: boolean;
}

interface CommunityPost {
  id: string;
  content: string;
  post_type: string;
  created_at: string;
  user_id: string;
  user_profile?: {
    first_name: string | null;
    last_name: string | null;
  } | null;
}

interface CommunityChatProps {
  community: Community;
  onClose: () => void;
}

const CommunityChat = ({ community, onClose }: CommunityChatProps) => {
  const { toast } = useToast();
  const [posts, setPosts] = useState<CommunityPost[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [postType, setPostType] = useState<'message' | 'achievement' | 'question'>('message');
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    checkUser();
  }, []);

  useEffect(() => {
    if (user) {
      fetchPosts();
      subscribeToNewPosts();
    }
  }, [user, community.id]);

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
  };

  const fetchPosts = async () => {
    try {
      console.log('Fetching posts for community:', community.id);
      
      const { data, error } = await supabase
        .from('community_posts')
        .select('*')
        .eq('community_id', community.id)
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
              return {
                ...post,
                user_profile: null
              };
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

  const subscribeToNewPosts = () => {
    console.log('Setting up subscription for community:', community.id);
    
    const subscription = supabase
      .channel(`community_${community.id}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'community_posts',
          filter: `community_id=eq.${community.id}`
        },
        async (payload) => {
          console.log('New post received:', payload.new);
          
          try {
            // Fetch user profile for the new post
            const { data: profileData, error: profileError } = await supabase
              .rpc('get_user_profile', { user_uuid: payload.new.user_id });

            const newPost: CommunityPost = {
              id: payload.new.id,
              content: payload.new.content,
              post_type: payload.new.post_type || 'message',
              created_at: payload.new.created_at,
              user_id: payload.new.user_id,
              user_profile: profileData && profileData.length > 0 ? profileData[0] : null
            };

            setPosts(prev => [...prev, newPost]);
          } catch (error) {
            console.error('Error processing new post:', error);
            // Add the post without profile data as fallback
            const newPost: CommunityPost = {
              id: payload.new.id,
              content: payload.new.content,
              post_type: payload.new.post_type || 'message',
              created_at: payload.new.created_at,
              user_id: payload.new.user_id,
              user_profile: null
            };
            setPosts(prev => [...prev, newPost]);
          }
        }
      )
      .subscribe((status) => {
        console.log('Subscription status:', status);
      });

    return () => {
      console.log('Removing subscription');
      supabase.removeChannel(subscription);
    };
  };

  const sendMessage = async () => {
    if (!newMessage.trim() || !user) return;

    try {
      console.log('Sending message:', newMessage, 'Type:', postType);
      
      const { error } = await supabase
        .from('community_posts')
        .insert([{
          community_id: community.id,
          user_id: user.id,
          content: newMessage,
          post_type: postType
        }]);

      if (error) {
        console.error('Error sending message:', error);
        throw error;
      }

      setNewMessage('');
      setPostType('message');
      
      console.log('Message sent successfully');
    } catch (error: any) {
      console.error('Error sending message:', error);
      toast({
        title: "Error",
        description: "Failed to send message.",
        variant: "destructive",
      });
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

  const getUserDisplayName = (post: CommunityPost) => {
    if (post.user_profile?.first_name || post.user_profile?.last_name) {
      return `${post.user_profile.first_name || ''} ${post.user_profile.last_name || ''}`.trim();
    }
    return 'Anonymous User';
  };

  const isOwnMessage = (post: CommunityPost) => {
    return user && post.user_id === user.id;
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, x: 300 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 300 }}
        transition={{ duration: 0.3 }}
        className="fixed right-4 top-20 bottom-4 w-96 z-50"
      >
        <Card className="h-full flex flex-col shadow-xl">
          <CardHeader className="border-b">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg">{community.name}</CardTitle>
                <p className="text-sm text-gray-500">{community.member_count} members</p>
              </div>
              <Button variant="ghost" size="sm" onClick={onClose}>
                <X className="h-4 w-4" />
              </Button>
            </div>
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
                            {isOwnMessage(post) ? 'You' : getUserDisplayName(post)}
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

              <div className="flex gap-2">
                <Input
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder={`Type your ${postType}...`}
                  onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                  className="flex-1"
                />
                <Button onClick={sendMessage} disabled={!newMessage.trim()}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </AnimatePresence>
  );
};

export default CommunityChat;
