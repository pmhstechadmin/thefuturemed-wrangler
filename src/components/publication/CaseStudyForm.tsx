
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { FileText, Plus, Minus, Upload, Eye, Send, AlertTriangle } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import CaseStudyPreview from './CaseStudyPreview';

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

const CaseStudyForm = () => {
  const [subAuthors, setSubAuthors] = useState<SubAuthor[]>([]);
  const [showPreview, setShowPreview] = useState(false);
  const [formData, setFormData] = useState<CaseStudyData | null>(null);
  const { toast } = useToast();

  const { register, handleSubmit, formState: { errors }, watch, setValue, reset } = useForm<CaseStudyData>({
    defaultValues: {
      subAuthors: [],
      privacyPolicyAccepted: false
    }
  });

  const addSubAuthor = () => {
    if (subAuthors.length < 3) {
      setSubAuthors([...subAuthors, { name: '', qualification: '', department: '' }]);
    }
  };

  const removeSubAuthor = (index: number) => {
    const newSubAuthors = subAuthors.filter((_, i) => i !== index);
    setSubAuthors(newSubAuthors);
  };

  const updateSubAuthor = (index: number, field: keyof SubAuthor, value: string) => {
    const newSubAuthors = [...subAuthors];
    newSubAuthors[index][field] = value;
    setSubAuthors(newSubAuthors);
    setValue('subAuthors', newSubAuthors);
  };

  const onPreview = (data: CaseStudyData) => {
    const dataWithSubAuthors = { ...data, subAuthors };
    setFormData(dataWithSubAuthors);
    setShowPreview(true);
  };

  const onSubmit = async (data: CaseStudyData) => {
    try {
      const submissionData = { ...data, subAuthors };
      
      // Here you would typically send the data to your backend
      console.log('Submitting case study:', submissionData);
      
      toast({
        title: "Case Study Submitted",
        description: "Your case study has been submitted successfully for review.",
      });
      
      // Reset form
      reset();
      setSubAuthors([]);
      setShowPreview(false);
      setFormData(null);
    } catch (error) {
      console.error('Error submitting case study:', error);
      toast({
        title: "Error",
        description: "Failed to submit case study. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (showPreview && formData) {
    return (
      <CaseStudyPreview 
        data={formData} 
        onBack={() => setShowPreview(false)}
        onSubmit={() => onSubmit(formData)}
      />
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-4xl mx-auto"
    >
      <Card className="bg-black/40 backdrop-blur-sm border-white/20 text-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl">
            <FileText className="h-6 w-6 text-purple-400" />
            Submit Case Study
          </CardTitle>
          <CardDescription className="text-gray-300">
            Share your medical case study or special case with the community
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onPreview)} className="space-y-6">
            {/* Author Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-purple-300">Author Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="authorName">Author Name *</Label>
                  <Input
                    id="authorName"
                    {...register('authorName', { required: 'Author name is required' })}
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                    placeholder="Dr. John Doe"
                  />
                  {errors.authorName && (
                    <p className="text-red-400 text-sm mt-1">{errors.authorName.message}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="authorQualification">Qualification *</Label>
                  <Input
                    id="authorQualification"
                    {...register('authorQualification', { required: 'Qualification is required' })}
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                    placeholder="MD, PhD"
                  />
                  {errors.authorQualification && (
                    <p className="text-red-400 text-sm mt-1">{errors.authorQualification.message}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="authorDepartment">Department *</Label>
                  <Input
                    id="authorDepartment"
                    {...register('authorDepartment', { required: 'Department is required' })}
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                    placeholder="Cardiology"
                  />
                  {errors.authorDepartment && (
                    <p className="text-red-400 text-sm mt-1">{errors.authorDepartment.message}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Sub Authors */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-purple-300">Sub Authors (Optional)</h3>
                <Button
                  type="button"
                  onClick={addSubAuthor}
                  disabled={subAuthors.length >= 3}
                  variant="outline"
                  size="sm"
                  className="border-white/20 text-white hover:bg-white/10"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Sub Author
                </Button>
              </div>
              {subAuthors.map((subAuthor, index) => (
                <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 bg-white/5 rounded-lg border border-white/10">
                  <div>
                    <Label>Name</Label>
                    <Input
                      value={subAuthor.name}
                      onChange={(e) => updateSubAuthor(index, 'name', e.target.value)}
                      className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                      placeholder="Dr. Jane Smith"
                    />
                  </div>
                  <div>
                    <Label>Qualification</Label>
                    <Input
                      value={subAuthor.qualification}
                      onChange={(e) => updateSubAuthor(index, 'qualification', e.target.value)}
                      className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                      placeholder="MD"
                    />
                  </div>
                  <div>
                    <Label>Department</Label>
                    <Input
                      value={subAuthor.department}
                      onChange={(e) => updateSubAuthor(index, 'department', e.target.value)}
                      className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                      placeholder="Radiology"
                    />
                  </div>
                  <div className="flex items-end">
                    <Button
                      type="button"
                      onClick={() => removeSubAuthor(index)}
                      variant="outline"
                      size="sm"
                      className="border-red-400 text-red-400 hover:bg-red-400/10"
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            {/* Case Study Details */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-purple-300">Case Study Details</h3>
              <div>
                <Label htmlFor="topic">Topic *</Label>
                <Input
                  id="topic"
                  {...register('topic', { required: 'Topic is required' })}
                  className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                  placeholder="Case study topic or title"
                />
                {errors.topic && (
                  <p className="text-red-400 text-sm mt-1">{errors.topic.message}</p>
                )}
              </div>
              <div>
                <Label htmlFor="subheading">Subheading</Label>
                <Input
                  id="subheading"
                  {...register('subheading')}
                  className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                  placeholder="Brief subheading or subtitle"
                />
              </div>
              <div>
                <Label htmlFor="comparisonDetails">Comparison Details</Label>
                <Textarea
                  id="comparisonDetails"
                  {...register('comparisonDetails')}
                  className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 min-h-[100px]"
                  placeholder="Comparison with existing studies or treatments..."
                />
              </div>
            </div>

            {/* File Uploads */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-purple-300">File Uploads</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="pdfFile">PDF Document *</Label>
                  <Input
                    id="pdfFile"
                    type="file"
                    accept=".pdf"
                    {...register('pdfFile', { required: 'PDF file is required' })}
                    className="bg-white/10 border-white/20 text-white file:text-white file:bg-purple-600 file:border-0 file:rounded file:px-3 file:py-1"
                  />
                  {errors.pdfFile && (
                    <p className="text-red-400 text-sm mt-1">{errors.pdfFile.message}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="images">Images (Optional)</Label>
                  <Input
                    id="images"
                    type="file"
                    accept="image/*"
                    multiple
                    {...register('images')}
                    className="bg-white/10 border-white/20 text-white file:text-white file:bg-purple-600 file:border-0 file:rounded file:px-3 file:py-1"
                  />
                </div>
              </div>
            </div>

            {/* Statistics and Outcomes */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-purple-300">Results & Analysis</h3>
              <div>
                <Label htmlFor="statistics">Statistics & Data</Label>
                <Textarea
                  id="statistics"
                  {...register('statistics')}
                  className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 min-h-[100px]"
                  placeholder="Statistical analysis and key data points..."
                />
              </div>
              <div>
                <Label htmlFor="finalOutcome">Final Outcome *</Label>
                <Textarea
                  id="finalOutcome"
                  {...register('finalOutcome', { required: 'Final outcome is required' })}
                  className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 min-h-[100px]"
                  placeholder="Conclusion and final outcomes of the study..."
                />
                {errors.finalOutcome && (
                  <p className="text-red-400 text-sm mt-1">{errors.finalOutcome.message}</p>
                )}
              </div>
              <div>
                <Label htmlFor="bibliography">Bibliography & References</Label>
                <Textarea
                  id="bibliography"
                  {...register('bibliography')}
                  className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 min-h-[100px]"
                  placeholder="References and citations..."
                />
              </div>
            </div>

            {/* Privacy Policy */}
            <div className="space-y-4">
              <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <AlertTriangle className="h-5 w-5 text-amber-400 mt-0.5 flex-shrink-0" />
                  <div className="space-y-3">
                    <h4 className="font-semibold text-amber-300">Privacy Policy & Declaration</h4>
                    <p className="text-sm text-amber-200">
                      By submitting this case study, you declare that:
                    </p>
                    <ul className="text-sm text-amber-200 list-disc list-inside space-y-1">
                      <li>This is original work conducted by you/your team</li>
                      <li>The study has not been plagiarized or copied from other sources</li>
                      <li>You take full responsibility for the accuracy and authenticity of the data</li>
                      <li>You have obtained necessary permissions for patient data (if applicable)</li>
                      <li>The study follows ethical guidelines and institutional approval</li>
                    </ul>
                    <div className="flex items-center space-x-2 mt-3">
                      <Checkbox
                        id="privacyPolicy"
                        {...register('privacyPolicyAccepted', { required: 'You must accept the privacy policy' })}
                        className="border-amber-400"
                      />
                      <Label htmlFor="privacyPolicy" className="text-sm text-amber-200">
                        I acknowledge and agree to the above terms *
                      </Label>
                    </div>
                    {errors.privacyPolicyAccepted && (
                      <p className="text-red-400 text-sm">{errors.privacyPolicyAccepted.message}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Buttons */}
            <div className="flex gap-4 pt-6">
              <Button
                type="submit"
                className="flex-1 bg-purple-600 hover:bg-purple-700"
              >
                <Eye className="mr-2 h-4 w-4" />
                Preview
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default CaseStudyForm;
