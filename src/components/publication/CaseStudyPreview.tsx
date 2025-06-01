
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Send, Edit, FileText, Users, Calendar } from 'lucide-react';

interface SubAuthor {
  name: string;
  qualification: string;
  department: string;
}

interface CaseStudyData {
  authorName: string;
  authorQualification: string;
  authorDepartment: string;
  subAuthors: SubAuthor[];
  topic: string;
  subheading: string;
  comparisonDetails: string;
  statistics: string;
  finalOutcome: string;
  bibliography: string;
  images: FileList | null;
  pdfFile: FileList | null;
  privacyPolicyAccepted: boolean;
}

interface CaseStudyPreviewProps {
  data: CaseStudyData;
  onBack: () => void;
  onSubmit: () => void;
}

const CaseStudyPreview = ({ data, onBack, onSubmit }: CaseStudyPreviewProps) => {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <Button
          onClick={onBack}
          variant="outline"
          className="text-white border-white/30 hover:bg-white/10 bg-white/5"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Edit
        </Button>
        <Button
          onClick={onSubmit}
          className="bg-green-600 hover:bg-green-700"
        >
          <Send className="mr-2 h-4 w-4" />
          Submit Case Study
        </Button>
      </div>

      <Card className="bg-black/40 backdrop-blur-sm border-white/20 text-white">
        <CardHeader>
          <div className="flex items-center gap-3">
            <FileText className="h-8 w-8 text-purple-400" />
            <div>
              <CardTitle className="text-2xl">{data.topic}</CardTitle>
              {data.subheading && (
                <p className="text-gray-300 mt-1">{data.subheading}</p>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Authors Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-purple-300 flex items-center gap-2">
              <Users className="h-5 w-5" />
              Authors
            </h3>
            <div className="space-y-3">
              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <div className="flex items-center gap-2 mb-2">
                  <Badge className="bg-purple-600">Primary Author</Badge>
                </div>
                <h4 className="font-semibold">{data.authorName}</h4>
                <p className="text-gray-300">{data.authorQualification}</p>
                <p className="text-gray-300">{data.authorDepartment}</p>
              </div>
              
              {data.subAuthors.map((author, index) => (
                <div key={index} className="bg-white/5 rounded-lg p-4 border border-white/10">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline" className="text-white border-white/30">
                      Co-Author {index + 1}
                    </Badge>
                  </div>
                  <h4 className="font-semibold">{author.name}</h4>
                  <p className="text-gray-300">{author.qualification}</p>
                  <p className="text-gray-300">{author.department}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Content Sections */}
          {data.comparisonDetails && (
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-purple-300">Comparison Details</h3>
              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <p className="text-gray-300 whitespace-pre-wrap">{data.comparisonDetails}</p>
              </div>
            </div>
          )}

          {data.statistics && (
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-purple-300">Statistics & Data</h3>
              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <p className="text-gray-300 whitespace-pre-wrap">{data.statistics}</p>
              </div>
            </div>
          )}

          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-purple-300">Final Outcome</h3>
            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
              <p className="text-gray-300 whitespace-pre-wrap">{data.finalOutcome}</p>
            </div>
          </div>

          {data.bibliography && (
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-purple-300">Bibliography & References</h3>
              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <p className="text-gray-300 whitespace-pre-wrap">{data.bibliography}</p>
              </div>
            </div>
          )}

          {/* File Attachments */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-purple-300">Attachments</h3>
            <div className="space-y-2">
              {data.pdfFile && data.pdfFile.length > 0 && (
                <div className="flex items-center gap-3 bg-white/5 rounded-lg p-3 border border-white/10">
                  <FileText className="h-5 w-5 text-red-400" />
                  <div>
                    <p className="font-medium">PDF Document</p>
                    <p className="text-sm text-gray-400">{data.pdfFile[0].name}</p>
                  </div>
                </div>
              )}
              {data.images && data.images.length > 0 && (
                <div className="flex items-center gap-3 bg-white/5 rounded-lg p-3 border border-white/10">
                  <FileText className="h-5 w-5 text-blue-400" />
                  <div>
                    <p className="font-medium">Images</p>
                    <p className="text-sm text-gray-400">{data.images.length} file(s) attached</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Publication Info */}
          <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="h-5 w-5 text-green-400" />
              <span className="font-semibold text-green-300">Publication Status</span>
            </div>
            <p className="text-green-200 text-sm">
              Ready for submission. Your case study will be reviewed by our editorial team before publication.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CaseStudyPreview;
