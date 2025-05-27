import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Shield, ArrowLeft, Users, MessageCircle, Plus, Check } from 'lucide-react';
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

interface UserMembership {
  community_id: string;
}

const Community = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [communities, setCommunities] = useState<Community[]>([]);
  const [userMemberships, setUserMemberships] = useState<UserMembership[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    checkUser();
  }, []);

  useEffect(() => {
    if (user) {
      fetchCommunities();
      fetchUserMemberships();
    }
  }, [user]);

  const checkUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    setUser(user);
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to access communities.",
        variant: "destructive",
      });
    }
  };

  const fetchCommunities = async () => {
    try {
      const { data, error } = await supabase
        .from('communities')
        .select('*')
        .order('name');

      if (error) throw error;

      // Get member counts for each community
      const communitiesWithCounts = await Promise.all(
        data.map(async (community) => {
          const { data: memberData } = await supabase
            .from('community_memberships')
            .select('user_id')
            .eq('community_id', community.id);

          return {
            ...community,
            member_count: memberData?.length || 0,
            is_member: false
          };
        })
      );

      setCommunities(communitiesWithCounts);
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to load communities.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchUserMemberships = async () => {
    try {
      const { data, error } = await supabase
        .from('community_memberships')
        .select('community_id')
        .eq('user_id', user.id);

      if (error) throw error;

      setUserMemberships(data || []);
      
      // Update communities with membership status
      setCommunities(prev => prev.map(community => ({
        ...community,
        is_member: data?.some(membership => membership.community_id === community.id) || false
      })));
    } catch (error: any) {
      console.error('Error fetching memberships:', error);
    }
  };

  const joinCommunity = async (communityId: string) => {
    if (!user) return;

    try {
      // Check if user already has 3 memberships
      if (userMemberships.length >= 3) {
        toast({
          title: "Membership Limit Reached",
          description: "You can only join up to 3 communities.",
          variant: "destructive",
        });
        return;
      }

      const { error } = await supabase
        .from('community_memberships')
        .insert([{ user_id: user.id, community_id: communityId }]);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Successfully joined the community!",
      });

      fetchUserMemberships();
      fetchCommunities();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to join community.",
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
        .eq('user_id', user.id)
        .eq('community_id', communityId);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Left the community successfully.",
      });

      fetchUserMemberships();
      fetchCommunities();
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to leave community.",
        variant: "destructive",
      });
    }
  };

  const openCommunityChat = (communityId: string) => {
    navigate(`/community/${communityId}`);
  };

  const groupedCommunities = communities.reduce((acc, community) => {
    if (!acc[community.category]) {
      acc[community.category] = [];
    }
    acc[community.category].push(community);
    return acc;
  }, {} as Record<string, Community[]>);

  const categoryTitles: Record<string, string> = {
    'doctor': 'Medical Doctors',
    'dentist': 'Dental Professionals',
    'nursing': 'Nursing Professionals',
    'allied-health': 'Allied Health',
    'ayurveda': 'Ayurveda Practitioners',
    'unani': 'Unani Practitioners',
    'homeopathy': 'Homeopathy Practitioners',
    'naturopathy': 'Naturopathy Practitioners',
    'dietician': 'Dieticians',
    'yoga': 'Yoga Instructors',
    'fitness-coach': 'Fitness Coaches',
    'others': 'Other Professionals'
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center">
        <Card className="max-w-md mx-auto">
          <CardHeader>
            <CardTitle>Authentication Required</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">Please sign in to access the community features.</p>
            <Link to="/register">
              <Button className="w-full">Sign In / Register</Button>
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
            <Link to="/" className="flex items-center space-x-2">
              <Shield className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">MedPortal Community</h1>
            </Link>
            <Link to="/products">
              <Button variant="outline">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Products
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Medical Communities</h2>
          <p className="text-gray-600">
            Join up to 3 specialty communities to connect with peers and share knowledge.
            You're currently a member of {userMemberships.length}/3 communities.
          </p>
        </div>

        {loading ? (
          <div className="text-center py-8">Loading communities...</div>
        ) : (
          <div className="space-y-8">
            {Object.entries(groupedCommunities).map(([category, categoryCommunitiesList]) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h3 className="text-xl font-bold text-gray-800 mb-4">
                  {categoryTitles[category] || category}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {categoryCommunitiesList.map((community) => (
                    <Card key={community.id} className="hover:shadow-lg transition-shadow">
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg">{community.name}</CardTitle>
                          {community.is_member && (
                            <Badge variant="default" className="bg-green-500">
                              <Check className="h-3 w-3 mr-1" />
                              Member
                            </Badge>
                          )}
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600 text-sm mb-3">{community.description}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center text-sm text-gray-500">
                            <Users className="h-4 w-4 mr-1" />
                            {community.member_count} members
                          </div>
                          <div className="flex gap-2">
                            {community.is_member ? (
                              <>
                                <Button
                                  size="sm"
                                  onClick={() => openCommunityChat(community.id)}
                                  className="bg-blue-600 hover:bg-blue-700"
                                >
                                  <MessageCircle className="h-4 w-4 mr-1" />
                                  Chat
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => leaveCommunity(community.id)}
                                >
                                  Leave
                                </Button>
                              </>
                            ) : (
                              <Button
                                size="sm"
                                onClick={() => joinCommunity(community.id)}
                                disabled={userMemberships.length >= 3}
                              >
                                <Plus className="h-4 w-4 mr-1" />
                                Join
                              </Button>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Community;
