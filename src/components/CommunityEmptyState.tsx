
import { Users } from 'lucide-react';

const CommunityEmptyState = () => {
  return (
    <div className="text-center py-12">
      <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
      <h3 className="text-lg font-medium text-gray-900 mb-2">No communities available</h3>
      <p className="text-gray-600">Communities will appear here when they are created.</p>
    </div>
  );
};

export default CommunityEmptyState;
