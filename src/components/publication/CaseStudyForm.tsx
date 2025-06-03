import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { Upload, X, Eye, Send, Plus, Minus } from 'lucide-react';
import CaseStudyPreview from './CaseStudyPreview';

interface Author {
  name: string;
  qualification: string;
  department: string;
}

interface CaseStudyData {
  authorName: string;
  authorQualification: string;
  authorDepartment: string;
  subAuthors: Author[];
  topic: string;
  subheading: string;
  comparisonDetails: string;
  statistics: string;
  finalOutcome: string;
  bibliography: string;
  pdfFile: File | null;
  images: File[];
  privacyPolicyAccepted: boolean;
  plagiarismDeclaration: boolean;
}

const CaseStudyForm = () => {
  const { toast } = useToast();
  const [showPreview, setShowPreview] = useState(false);
  const [formData, setFormData] = useState<CaseStudyData>({
    authorName: '',
    authorQualification: '',
    authorDepartment: '',
    subAuthors: [],
    topic: '',
    subheading: '',
    comparisonDetails: '',
    statistics: '',
    finalOutcome: '',
    bibliography: '',
    pdfFile: null,
    images: [],
    privacyPolicyAccepted: false,
    plagiarismDeclaration: false
  });

  const handleInputChange = (field: keyof CaseStudyData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const addSubAuthor = () => {
    if (formData.subAuthors.length < 3) {
      setFormData(prev => ({
        ...prev,
        subAuthors: [...prev.subAuthors, { name: '', qualification: '', department: '' }]
      }));
    }
  };

  const removeSubAuthor = (index: number) => {
    setFormData(prev => ({
      ...prev,
      subAuthors: prev.subAuthors.filter((_, i) => i !== index)
    }));
  };

  const updateSubAuthor = (index: number, field: keyof Author, value: string) => {
    setFormData(prev => ({
      ...prev,
      subAuthors: prev.subAuthors.map((author, i) => 
        i === index ? { ...author, [field]: value } : author
      )
    }));
  };

  const handleFileUpload = (file: File, type: 'pdf' | 'image') => {
    if (type === 'pdf') {
      if (file.type === 'application/pdf') {
        setFormData(prev => ({ ...prev, pdfFile: file }));
        toast({
          title: "Success",
          description: "PDF uploaded successfully!",
        });
      } else {
        toast({
          title: "Error",
          description: "Please upload a valid PDF file.",
          variant: "destructive",
        });
      }
    } else if (type === 'image') {
      if (file.type.startsWith('image/')) {
        setFormData(prev => ({ ...prev, images: [...prev.images, file] }));
        toast({
          title: "Success",
          description: "Image uploaded successfully!",
        });
      } else {
        toast({
          title: "Error",
          description: "Please upload a valid image file.",
          variant: "destructive",
        });
      }
    }
  };

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const validateForm = () => {
    const requiredFields = [
      'authorName', 'authorQualification', 'authorDepartment',
      'topic', 'subheading', 'comparisonDetails', 'statistics',
      'finalOutcome', 'bibliography'
    ];

    for (const field of requiredFields) {
      if (!formData[field as keyof CaseStudyData]) {
        toast({
          title: "Validation Error",
          description: `Please fill in the ${field.replace(/([A-Z])/g, ' $1').toLowerCase()} field.`,
          variant: "destructive",
        });
        return false;
      }
    }

    if (!formData.privacyPolicyAccepted || !formData.plagiarismDeclaration) {
      toast({
        title: "Validation Error",
        description: "Please accept the privacy policy and plagiarism declaration.",
        variant: "destructive",
      });
      return false;
    }

    return true;
  };

  const handlePreview = () => {
    if (validateForm()) {
      setShowPreview(true);
    }
  };

  const handleSubmit = () => {
    if (validateForm()) {
      toast({
        title: "Success",
        description: "Case study submitted successfully! It will be reviewed by our team.",
      });
      
      // Reset form
      setFormData({
        authorName: '',
        authorQualification: '',
        authorDepartment: '',
        subAuthors: [],
        topic: '',
        subheading: '',
        comparisonDetails: '',
        statistics: '',
        finalOutcome: '',
        bibliography: '',
        pdfFile: null,
        images: [],
        privacyPolicyAccepted: false,
        plagiarismDeclaration: false
      });
    }
  };

  if (showPreview) {
    return (
      <CaseStudyPreview 
        data={formData} 
        onBack={() => setShowPreview(false)}
        onSubmit={handleSubmit}
      />
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card className="bg-black/40 backdrop-blur-sm border-white/20 text-white">
        <CardHeader>
          <CardTitle className="text-white">Submit Case Study</CardTitle>
          <CardDescription className="text-gray-300">
            Share your medical case study with the community
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Main Author Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Main Author Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="authorName" className="text-white">Author Name *</Label>
                <Input
                  id="authorName"
                  value={formData.authorName}
                  onChange={(e) => handleInputChange('authorName', e.target.value)}
                  placeholder="Enter your full name"
                  className="bg-white/10 border-white/30 text-white placeholder-white/50"
                />
              </div>
              <div>
                <Label htmlFor="authorQualification" className="text-white">Qualification *</Label>
                <Input
                  id="authorQualification"
                  value={formData.authorQualification}
                  onChange={(e) => handleInputChange('authorQualification', e.target.value)}
                  placeholder="e.g., MD, PhD, MBBS"
                  className="bg-white/10 border-white/30 text-white placeholder-white/50"
                />
              </div>
              <div>
                <Label htmlFor="authorDepartment" className="text-white">Department *</Label>
                <Input
                  id="authorDepartment"
                  value={formData.authorDepartment}
                  onChange={(e) => handleInputChange('authorDepartment', e.target.value)}
                  placeholder="e.g., Cardiology, Neurology"
                  className="bg-white/10 border-white/30 text-white placeholder-white/50"
                />
              </div>
            </div>
          </div>

          <Separator className="bg-white/20" />

          {/* Sub Authors */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white">Sub Authors (Optional)</h3>
              {formData.subAuthors.length < 3 && (
                <Button onClick={addSubAuthor} variant="outline" size="sm" className="text-white border-white/30">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Sub Author
                </Button>
              )}
            </div>
            {formData.subAuthors.map((author, index) => (
              <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 bg-white/5 rounded-lg">
                <div>
                  <Label className="text-white">Name</Label>
                  <Input
                    value={author.name}
                    onChange={(e) => updateSubAuthor(index, 'name', e.target.value)}
                    placeholder="Sub author name"
                    className="bg-white/10 border-white/30 text-white placeholder-white/50"
                  />
                </div>
                <div>
                  <Label className="text-white">Qualification</Label>
                  <Input
                    value={author.qualification}
                    onChange={(e) => updateSubAuthor(index, 'qualification', e.target.value)}
                    placeholder="Qualification"
                    className="bg-white/10 border-white/30 text-white placeholder-white/50"
                  />
                </div>
                <div>
                  <Label className="text-white">Department</Label>
                  <Input
                    value={author.department}
                    onChange={(e) => updateSubAuthor(index, 'department', e.target.value)}
                    placeholder="Department"
                    className="bg-white/10 border-white/30 text-white placeholder-white/50"
                  />
                </div>
                <div className="flex items-end">
                  <Button onClick={() => removeSubAuthor(index)} variant="outline" size="sm" className="text-white border-white/30">
                    <Minus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <Separator className="bg-white/20" />

          {/* Case Study Content */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Case Study Content</h3>
            <div className="space-y-4">
              <div>
                <Label htmlFor="topic" className="text-white">Topic *</Label>
                <Input
                  id="topic"
                  value={formData.topic}
                  onChange={(e) => handleInputChange('topic', e.target.value)}
                  placeholder="Enter the main topic of your case study"
                  className="bg-white/10 border-white/30 text-white placeholder-white/50"
                />
              </div>
              <div>
                <Label htmlFor="subheading" className="text-white">Subheading *</Label>
                <Input
                  id="subheading"
                  value={formData.subheading}
                  onChange={(e) => handleInputChange('subheading', e.target.value)}
                  placeholder="Enter a descriptive subheading"
                  className="bg-white/10 border-white/30 text-white placeholder-white/50"
                />
              </div>
              <div>
                <Label htmlFor="comparisonDetails" className="text-white">Comparison Details *</Label>
                <Textarea
                  id="comparisonDetails"
                  value={formData.comparisonDetails}
                  onChange={(e) => handleInputChange('comparisonDetails', e.target.value)}
                  placeholder="Describe comparison with other studies or methods"
                  className="bg-white/10 border-white/30 text-white placeholder-white/50 min-h-[100px]"
                />
              </div>
            </div>
          </div>

          <Separator className="bg-white/20" />

          {/* File Uploads */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">File Uploads</h3>
            
            {/* PDF Upload */}
            <div>
              <Label className="text-white">Case Study PDF</Label>
              <div className="mt-2">
                <input
                  type="file"
                  accept=".pdf"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleFileUpload(file, 'pdf');
                  }}
                  className="hidden"
                  id="pdf-upload"
                />
                <Label htmlFor="pdf-upload" className="cursor-pointer">
                  <div className="border-2 border-dashed border-white/30 rounded-lg p-6 text-center hover:border-white/50 transition-colors">
                    <Upload className="h-8 w-8 mx-auto mb-2 text-white/70" />
                    <p className="text-white/70">
                      {formData.pdfFile ? formData.pdfFile.name : 'Click to upload PDF'}
                    </p>
                  </div>
                </Label>
              </div>
            </div>

            {/* Image Uploads */}
            <div>
              <Label className="text-white">Supporting Images</Label>
              <div className="mt-2">
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(e) => {
                    const files = Array.from(e.target.files || []);
                    files.forEach(file => handleFileUpload(file, 'image'));
                  }}
                  className="hidden"
                  id="image-upload"
                />
                <Label htmlFor="image-upload" className="cursor-pointer">
                  <div className="border-2 border-dashed border-white/30 rounded-lg p-6 text-center hover:border-white/50 transition-colors">
                    <Upload className="h-8 w-8 mx-auto mb-2 text-white/70" />
                    <p className="text-white/70">Click to upload images</p>
                  </div>
                </Label>
              </div>
              
              {formData.images.length > 0 && (
                <div className="mt-4 space-y-2">
                  <p className="text-white text-sm">Uploaded Images:</p>
                  <div className="flex flex-wrap gap-2">
                    {formData.images.map((image, index) => (
                      <Badge key={index} variant="outline" className="text-white border-white/30">
                        {image.name}
                        <Button
                          onClick={() => removeImage(index)}
                          variant="ghost"
                          size="sm"
                          className="ml-2 h-4 w-4 p-0 text-white hover:bg-white/20"
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <Separator className="bg-white/20" />

          {/* Statistics and Outcome */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Results & Analysis</h3>
            <div className="space-y-4">
              <div>
                <Label htmlFor="statistics" className="text-white">Statistics *</Label>
                <Textarea
                  id="statistics"
                  value={formData.statistics}
                  onChange={(e) => handleInputChange('statistics', e.target.value)}
                  placeholder="Enter statistical data and analysis"
                  className="bg-white/10 border-white/30 text-white placeholder-white/50 min-h-[100px]"
                />
              </div>
              <div>
                <Label htmlFor="finalOutcome" className="text-white">Final Outcome *</Label>
                <Textarea
                  id="finalOutcome"
                  value={formData.finalOutcome}
                  onChange={(e) => handleInputChange('finalOutcome', e.target.value)}
                  placeholder="Describe the final outcome and conclusions"
                  className="bg-white/10 border-white/30 text-white placeholder-white/50 min-h-[100px]"
                />
              </div>
              <div>
                <Label htmlFor="bibliography" className="text-white">Bibliography *</Label>
                <Textarea
                  id="bibliography"
                  value={formData.bibliography}
                  onChange={(e) => handleInputChange('bibliography', e.target.value)}
                  placeholder="List your references and citations"
                  className="bg-white/10 border-white/30 text-white placeholder-white/50 min-h-[100px]"
                />
              </div>
            </div>
          </div>

          <Separator className="bg-white/20" />

          {/* Privacy & Declarations */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Privacy & Declarations</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-2">
                <Checkbox
                  id="privacyPolicy"
                  checked={formData.privacyPolicyAccepted}
                  onCheckedChange={(checked) => handleInputChange('privacyPolicyAccepted', checked)}
                  className="border-white/30"
                />
                <Label htmlFor="privacyPolicy" className="text-white text-sm leading-relaxed">
                  I accept the privacy policy and agree to the terms of submission
                </Label>
              </div>
              <div className="flex items-start space-x-2">
                <Checkbox
                  id="plagiarismDeclaration"
                  checked={formData.plagiarismDeclaration}
                  onCheckedChange={(checked) => handleInputChange('plagiarismDeclaration', checked)}
                  className="border-white/30"
                />
                <Label htmlFor="plagiarismDeclaration" className="text-white text-sm leading-relaxed">
                  I declare that this is original work based on a real study conducted by me/us and is not copied or plagiarized. I take full responsibility for the authenticity of this submission.
                </Label>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-6">
            <Button 
              onClick={handlePreview} 
              variant="outline" 
              className="flex-1 text-white border-white/30 hover:bg-white/10"
            >
              <Eye className="h-4 w-4 mr-2" />
              Preview
            </Button>
            <Button 
              onClick={handleSubmit} 
              className="flex-1 bg-purple-600 hover:bg-purple-700"
            >
              <Send className="h-4 w-4 mr-2" />
              Submit Case Study
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CaseStudyForm;
