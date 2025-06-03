
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import CommunityHeader from '@/components/CommunityHeader';
import CommunityCard from '@/components/CommunityCard';
import CommunityEmptyState from '@/components/CommunityEmptyState';
import CommunityLoadingSpinner from '@/components/CommunityLoadingSpinner';
import CommunityAdsCarousel from '@/components/CommunityAdsCarousel';
import { useCommunityData } from '@/hooks/useCommunityData';
import { useEffect } from 'react';

const Community = () => {
  const navigate = useNavigate();
  const {
    communities,
    memberships,
    loading,
    joinCommunity,
    leaveCommunity,
    openCommunityChat,
    isMember
  } = useCommunityData();

  const handleBackNavigation = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  // Add error boundary for debugging
  useEffect(() => {
    console.log('Community page loaded');
    console.log('Communities:', communities);
    console.log('Memberships:', memberships);
    console.log('Loading:', loading);
  }, [communities, memberships, loading]);

  if (loading) {
    return <CommunityLoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              onClick={handleBackNavigation}
              className="hover:bg-gray-100"
              title="Go back"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
            <div className="flex-1">
              <CommunityHeader membershipCount={memberships.length} />
            </div>
          </div>
          <Button
            variant="outline"
            onClick={() => navigate('/')}
            className="hover:bg-gray-100"
            title="Go to home page"
          >
            <Home className="mr-2 h-4 w-4" />
            Home
          </Button>
        </div>
        
        <CommunityAdsCarousel />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {communities.map((community) => (
            <CommunityCard
              key={community.id}
              community={community}
              isMember={isMember(community.id)}
              onJoin={joinCommunity}
              onLeave={leaveCommunity}
              onOpenChat={openCommunityChat}
            />
          ))}
        </div>

        {communities.length === 0 && <CommunityEmptyState />}
      </div>
    </div>
  );
};

export default Community;
