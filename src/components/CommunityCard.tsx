
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, MessageCircle, BookOpen, Stethoscope, Heart, Brain, Eye } from 'lucide-react';

interface Community {
  id: string;
  name: string;
  description: string;
  category: string;
  member_count: number;
  max_members: number;
  created_at: string;
}

interface CommunityCardProps {
  community: Community;
  isMember: boolean;
  onJoin: (communityId: string) => void;
  onLeave: (communityId: string) => void;
  onOpenChat: (communityId: string) => void;
}

const CommunityCard = ({ community, isMember, onJoin, onLeave, onOpenChat }: CommunityCardProps) => {
  const categoryIcons = {
    'Medical Students': BookOpen,
    'Specialists': Stethoscope,
    'General Practice': Heart,
    'Research': Brain,
    'Surgery': Eye,
  };

  const IconComponent = categoryIcons[community.category as keyof typeof categoryIcons] || Users;

  return (
    <Card className="hover:shadow-lg transition-shadow duration-300">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <IconComponent className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <CardTitle className="text-lg">{community.name}</CardTitle>
              <Badge
                variant="secondary"
                className="text-sm bg-blue-100 text-800 "
              >
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
            <span>
              {community.member_count}/{community.max_members} members
            </span>
          </div>
        </div>

        <div className="space-y-2">
          {isMember ? (
            <div className="space-y-2">
              <Button
                onClick={() => onOpenChat(community.id)}
                className="w-full flex items-center gap-2"
              >
                <MessageCircle className="h-4 w-4" />
                Open Chat
              </Button>
              <Button
                variant="outline"
                onClick={() => onLeave(community.id)}
                className="w-full"
              >
                Leave Community
              </Button>
            </div>
          ) : (
            <Button
              onClick={() => onJoin(community.id)}
              disabled={community.member_count >= community.max_members}
              className="w-full"
            >
              {community.member_count >= community.max_members
                ? "Full"
                : "Join Community"}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default CommunityCard;
