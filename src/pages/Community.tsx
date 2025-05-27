
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, MessageCircle, Award, BookOpen, Stethoscope, Heart, Brain, Eye } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import type { User } from '@supabase/supabase-js';

interface Community {
  id: string;
  name: string;
  description: string;
  category: string;
  member_count: number;
  max_members: number;
  created_at: string;
}

interface Membership {
  id: string;
  community_id: string;
  user_id: string;
  joined_at: string;
}

const Community = () => {
  const [communities, setCommunities] = useState<Community[]>([]);
  const [memberships, setMemberships] = useState<Membership[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  const categoryIcons = {
    'Medical Students': BookOpen,
    'Specialists': Stethoscope,
    'General Practice': Heart,
    'Research': Brain,
    'Surgery': Eye,
  };

  useEffect(() => {
    checkAuthAndLoadData();
  }, []);

  const checkAuthAndLoadData = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) {
        toast({
          title: "Authentication Required",
          description: "Please sign in to access communities.",
          variant: "destructive",
        });
        navigate('/');
        return;
      }
      
      setUser(session.user);
      await Promise.all([loadCommunities(), loadUserMemberships(session.user.id)]);
    } catch (error) {
      console.error('Error loading data:', error);
      toast({
        title: "Error",
        description: "Failed to load communities. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const loadCommunities = async () => {
    const { data, error } = await supabase
      .from('communities')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error loading communities:', error);
    } else {
      setCommunities(data || []);
    }
  };

  const loadUserMemberships = async (userId: string) => {
    const { data, error } = await supabase
      .from('community_memberships')
      .select('*')
      .eq('user_id', userId);

    if (error) {
      console.error('Error loading memberships:', error);
    } else {
      setMemberships(data || []);
    }
  };

  const joinCommunity = async (communityId: string) => {
    if (!user) return;

    if (memberships.length >= 3) {
      toast({
        title: "Membership Limit Reached",
        description: "You can only join up to 3 communities.",
        variant: "destructive",
      });
      return;
    }

    try {
      const { error } = await supabase
        .from('community_memberships')
        .insert({
          community_id: communityId,
          user_id: user.id,
        });

      if (error) {
        console.error('Error joining community:', error);
        toast({
          title: "Error",
          description: "Failed to join community. Please try again.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Success",
          description: "Successfully joined the community!",
        });
        await loadUserMemberships(user.id);
      }
    } catch (error) {
      console.error('Error joining community:', error);
      toast({
        title: "Error",
        description: "An unexpected error occurred.",
        variant: "destructive",
      });
    }
  };

  const leaveCommunity = async (communityId: string) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('community_memberships')
        .delete()
        .eq('community_id', communityId)
        .eq('user_id', user.id);

      if (error) {
        console.error('Error leaving community:', error);
        toast({
          title: "Error",
          description: "Failed to leave community. Please try again.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Success",
          description: "Successfully left the community.",
        });
        await loadUserMemberships(user.id);
      }
    } catch (error) {
      console.error('Error leaving community:', error);
    }
  };

  const openCommunityChat = (communityId: string) => {
    navigate(`/community/${communityId}`);
  };

  const isMember = (communityId: string) => {
    return memberships.some(m => m.community_id === communityId);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading communities...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Medical Communities</h1>
          <p className="text-gray-600">Connect with fellow medical professionals and students</p>
          <p className="text-sm text-gray-500 mt-2">
            You are a member of {memberships.length}/3 communities
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {communities.map((community) => {
            const IconComponent = categoryIcons[community.category as keyof typeof categoryIcons] || Users;
            const memberStatus = isMember(community.id);
            
            return (
              <Card key={community.id} className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <IconComponent className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{community.name}</CardTitle>
                        <Badge variant="secondary" className="text-xs">
                          {community.category}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="mb-4">
                    {community.description}
                  </CardDescription>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center space-x-1">
                      <Users className="h-4 w-4" />
                      <span>{community.member_count}/{community.max_members} members</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    {memberStatus ? (
                      <div className="space-y-2">
                        <Button 
                          onClick={() => openCommunityChat(community.id)}
                          className="w-full flex items-center gap-2"
                        >
                          <MessageCircle className="h-4 w-4" />
                          Open Chat
                        </Button>
                        <Button 
                          variant="outline" 
                          onClick={() => leaveCommunity(community.id)}
                          className="w-full"
                        >
                          Leave Community
                        </Button>
                      </div>
                    ) : (
                      <Button 
                        onClick={() => joinCommunity(community.id)}
                        disabled={community.member_count >= community.max_members}
                        className="w-full"
                      >
                        {community.member_count >= community.max_members ? 'Full' : 'Join Community'}
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {communities.length === 0 && (
          <div className="text-center py-12">
            <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No communities available</h3>
            <p className="text-gray-600">Communities will appear here when they are created.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Community;
