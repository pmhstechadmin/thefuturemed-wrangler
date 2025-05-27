
import CommunityHeader from '@/components/CommunityHeader';
import CommunityCard from '@/components/CommunityCard';
import CommunityEmptyState from '@/components/CommunityEmptyState';
import CommunityLoadingSpinner from '@/components/CommunityLoadingSpinner';
import { useCommunityData } from '@/hooks/useCommunityData';

const Community = () => {
  const {
    communities,
    memberships,
    loading,
    joinCommunity,
    leaveCommunity,
    openCommunityChat,
    isMember
  } = useCommunityData();

  if (loading) {
    return <CommunityLoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <div className="container mx-auto px-4 py-8">
        <CommunityHeader membershipCount={memberships.length} />

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
