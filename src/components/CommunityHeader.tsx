
interface CommunityHeaderProps {
  membershipCount: number;
}

const CommunityHeader = ({ membershipCount }: CommunityHeaderProps) => {
  return (
    <div className="mb-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Medical Communities</h1>
      <p className="text-gray-600">Connect with fellow medical professionals and students</p>
      <p className="text-sm text-gray-500 mt-2">
        You are a member of {membershipCount}/3 communities
      </p>
    </div>
  );
};

export default CommunityHeader;
