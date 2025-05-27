
import { useState, useEffect } from 'react';
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

export const useCommunityData = () => {
  const [communities, setCommunities] = useState<Community[]>([]);
  const [memberships, setMemberships] = useState<Membership[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();

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
    try {
      const { data: communitiesData, error } = await supabase
        .from('communities')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error loading communities:', error);
        return;
      }

      const communitiesWithCounts = await Promise.all(
        (communitiesData || []).map(async (community) => {
          const { data: memberData, error: memberError } = await supabase
            .from('community_memberships')
            .select('id')
            .eq('community_id', community.id);

          const memberCount = memberError ? 0 : (memberData?.length || 0);

          return {
            ...community,
            member_count: memberCount,
            max_members: 50
          };
        })
      );

      setCommunities(communitiesWithCounts);
    } catch (error) {
      console.error('Error loading communities:', error);
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
        await loadCommunities();
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
        await loadCommunities();
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

  useEffect(() => {
    checkAuthAndLoadData();
  }, []);

  return {
    communities,
    memberships,
    user,
    loading,
    joinCommunity,
    leaveCommunity,
    openCommunityChat,
    isMember
  };
};
