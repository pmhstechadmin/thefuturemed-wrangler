
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FileText, Eye, Edit, Calendar, Users } from 'lucide-react';

// Mock data for demonstration
const mockPublications = [
  {
    id: '1',
    title: 'Innovative Cardiac Intervention: A Case Study',
    status: 'published',
    submittedAt: '2024-01-15',
    authors: ['Dr. John Smith', 'Dr. Jane Doe'],
    views: 245,
    downloads: 67
  },
  {
    id: '2',
    title: 'Rare Neurological Condition: Diagnostic Challenges',
    status: 'under_review',
    submittedAt: '2024-01-20',
    authors: ['Dr. John Smith'],
    views: 0,
    downloads: 0
  },
  {
    id: '3',
    title: 'Emergency Medicine Protocol Enhancement',
    status: 'draft',
    submittedAt: '2024-01-22',
    authors: ['Dr. John Smith', 'Dr. Alice Johnson', 'Dr. Bob Wilson'],
    views: 0,
    downloads: 0
  }
];

const MyPublications = () => {
  const [publications] = useState(mockPublications);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'published':
        return <Badge className="bg-green-500">Published</Badge>;
      case 'under_review':
        return <Badge className="bg-yellow-500">Under Review</Badge>;
      case 'draft':
        return <Badge variant="outline">Draft</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'border-green-500/20 bg-green-500/5';
      case 'under_review': return 'border-yellow-500/20 bg-yellow-500/5';
      case 'draft': return 'border-gray-500/20 bg-gray-500/5';
      default: return 'border-white/20 bg-white/5';
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white mb-2">My Publications</h2>
        <p className="text-gray-300">Track and manage your submitted case studies</p>
      </div>

      {publications.length === 0 ? (
        <Card className="bg-black/40 backdrop-blur-sm border-white/20 text-white">
          <CardContent className="text-center py-12">
            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Publications Yet</h3>
            <p className="text-gray-400 mb-4">You haven't submitted any case studies yet.</p>
            <Button className="bg-purple-600 hover:bg-purple-700">
              Submit Your First Case Study
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {publications.map((publication) => (
            <Card 
              key={publication.id} 
              className={`bg-black/40 backdrop-blur-sm border-white/20 text-white hover:shadow-lg transition-shadow ${getStatusColor(publication.status)}`}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-5 w-5 text-purple-400" />
                      {publication.title}
                    </CardTitle>
                    <div className="flex items-center gap-4 text-sm text-gray-300">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        Submitted: {new Date(publication.submittedAt).toLocaleDateString()}
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        {publication.authors.length} author(s)
                      </div>
                    </div>
                  </div>
                  {getStatusBadge(publication.status)}
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-300 mb-2">Authors:</p>
                    <div className="flex flex-wrap gap-2">
                      {publication.authors.map((author, index) => (
                        <Badge key={index} variant="outline" className="text-white border-white/30">
                          {author}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {publication.status === 'published' && (
                    <div className="flex gap-6 text-sm text-gray-300">
                      <div>
                        <span className="font-medium">Views:</span> {publication.views}
                      </div>
                      <div>
                        <span className="font-medium">Downloads:</span> {publication.downloads}
                      </div>
                    </div>
                  )}

                  <div className="flex gap-2 pt-2">
                    <Button variant="outline" size="sm" className="text-white border-white/30 hover:bg-white/10">
                      <Eye className="h-4 w-4 mr-2" />
                      View
                    </Button>
                    {publication.status === 'draft' && (
                      <Button variant="outline" size="sm" className="text-white border-white/30 hover:bg-white/10">
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </Button>
                    )}
                    {publication.status === 'published' && (
                      <Button variant="outline" size="sm" className="text-white border-white/30 hover:bg-white/10">
                        <FileText className="h-4 w-4 mr-2" />
                        Download PDF
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyPublications;
