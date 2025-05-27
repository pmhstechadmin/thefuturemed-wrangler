import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Send, Camera, Image, FileText, Users, MessageCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import type { User } from '@supabase/supabase-js';

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
  message_type: string;
  file_url?: string;
  file_name?: string;
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

  const [user, setUser] = useState<User | null>(null);
  const [community, setCommunity] = useState<Community | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [members, setMembers] = useState<Member[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [messageType, setMessageType] = useState('message');
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    checkAuthAndLoadData();
  }, [communityId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (!communityId || !user) return;

    // Subscribe to new messages
    const messagesSubscription = supabase
      .channel(`community-${communityId}-messages`)
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'community_messages',
        filter: `community_id=eq.${communityId}`
      }, () => {
        loadMessages();
      })
      .subscribe();

    // Subscribe to membership changes
    const membersSubscription = supabase
      .channel(`community-${communityId}-members`)
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'community_memberships',
        filter: `community_id=eq.${communityId}`
      }, () => {
        loadMembers();
      })
      .subscribe();

    return () => {
      messagesSubscription.unsubscribe();
      membersSubscription.unsubscribe();
    };
  }, [communityId, user]);

  const checkAuthAndLoadData = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) {
        toast({
          title: "Authentication Required",
          description: "Please sign in to access the community chat.",
          variant: "destructive",
        });
        navigate('/');
        return;
      }

      setUser(session.user);
      
      if (communityId) {
        await Promise.all([
          loadCommunity(),
          loadMessages(),
          loadMembers(),
          checkMembership(session.user.id)
        ]);
      }
    } catch (error) {
      console.error('Error loading chat data:', error);
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
      .from('community_memberships')
      .select('*')
      .eq('community_id', communityId)
      .eq('user_id', userId)
      .single();

    if (error || !data) {
      toast({
        title: "Access Denied",
        description: "You must be a member of this community to access the chat.",
        variant: "destructive",
      });
      navigate('/community');
    }
  };

  const loadCommunity = async () => {
    const { data, error } = await supabase
      .from('communities')
      .select('*')
      .eq('id', communityId)
      .single();

    if (error) {
      console.error('Error loading community:', error);
      toast({
        title: "Error",
        description: "Failed to load community information.",
        variant: "destructive",
      });
      navigate('/community');
    } else {
      setCommunity(data);
    }
  };

  const loadMessages = async () => {
    const { data, error } = await supabase
      .from('community_messages')
      .select(`
        *,
        user_profile:profiles(first_name, last_name)
      `)
      .eq('community_id', communityId)
      .order('created_at', { ascending: true })
      .limit(100);

    if (error) {
      console.error('Error loading messages:', error);
    } else {
      setMessages(data || []);
    }
  };

  const loadMembers = async () => {
    const { data, error } = await supabase
      .from('community_memberships')
      .select(`
        *,
        user_profile:profiles(first_name, last_name)
      `)
      .eq('community_id', communityId)
      .order('joined_at', { ascending: false });

    if (error) {
      console.error('Error loading members:', error);
    } else {
      setMembers(data || []);
    }
  };

  const sendMessage = async () => {
    if (!newMessage.trim() || !user || !communityId || sending) return;

    setSending(true);
    try {
      const { error } = await supabase
        .from('community_messages')
        .insert({
          user_id: user.id,
          community_id: communityId,
          content: newMessage.trim(),
          message_type: messageType,
        });

      if (error) {
        console.error('Error sending message:', error);
        toast({
          title: "Error",
          description: "Failed to send message. Please try again.",
          variant: "destructive",
        });
      } else {
        setNewMessage('');
        setMessageType('message');
      }
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setSending(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleFileUpload = (type: string) => {
    if (fileInputRef.current) {
      fileInputRef.current.accept = type === 'image' ? 'image/*' : '*/*';
      fileInputRef.current.click();
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const getUserDisplayName = (message: Message) => {
    const profile = message.user_profile;
    if (profile?.first_name || profile?.last_name) {
      return `${profile.first_name || ''} ${profile.last_name || ''}`.trim();
    }
    return message.user_id === user?.id ? 'You' : 'Anonymous';
  };

  const getMessageTypeColor = (type: string) => {
    switch (type) {
      case 'achievement': return 'bg-green-100 text-green-800';
      case 'question': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-blue-100 text-blue-800';
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
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-4 mb-4">
            <Button variant="outline" onClick={() => navigate('/community')}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Communities
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{community?.name}</h1>
              <p className="text-gray-600">{community?.description}</p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Members List */}
          <Card className="lg:col-span-1">
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
                  const displayName = profile?.first_name || profile?.last_name 
                    ? `${profile.first_name || ''} ${profile.last_name || ''}`.trim()
                    : 'Anonymous';
                  
                  return (
                    <div key={member.id} className="flex items-center gap-2 p-2 rounded-lg bg-gray-50">
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                        {displayName.charAt(0).toUpperCase()}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{displayName}</p>
                        {member.user_id === user?.id && (
                          <Badge variant="secondary" className="text-xs">You</Badge>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Chat Area */}
          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageCircle className="h-5 w-5" />
                General Chat
              </CardTitle>
            </CardHeader>
            <CardContent className="h-[600px] flex flex-col">
              {/* Messages */}
              <div className="flex-1 overflow-y-auto mb-4 space-y-3">
                {messages.map((message) => (
                  <div key={message.id} className="flex gap-3">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-medium flex-shrink-0">
                      {getUserDisplayName(message).charAt(0).toUpperCase()}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-sm">{getUserDisplayName(message)}</span>
                        <Badge className={`text-xs ${getMessageTypeColor(message.message_type)}`}>
                          {message.message_type}
                        </Badge>
                        <span className="text-xs text-gray-500">{formatTime(message.created_at)}</span>
                      </div>
                      <p className="text-gray-800">{message.content}</p>
                      {message.file_url && (
                        <div className="mt-2">
                          <a 
                            href={message.file_url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline text-sm"
                          >
                            📎 {message.file_name || 'Attachment'}
                          </a>
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
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleFileUpload('camera')}
                    className="flex items-center gap-2"
                  >
                    <Camera className="h-4 w-4" />
                    Camera
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleFileUpload('image')}
                    className="flex items-center gap-2"
                  >
                    <Image className="h-4 w-4" />
                    Gallery
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleFileUpload('file')}
                    className="flex items-center gap-2"
                  >
                    <FileText className="h-4 w-4" />
                    File
                  </Button>
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
                    disabled={!newMessage.trim() || sending}
                    className="flex items-center gap-2"
                  >
                    <Send className="h-4 w-4" />
                    Send
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Hidden file input */}
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          onChange={(e) => {
            // File upload functionality to be implemented
            console.log('File selected:', e.target.files?.[0]);
          }}
        />
      </div>
    </div>
  );
};

export default CommunityChat;
