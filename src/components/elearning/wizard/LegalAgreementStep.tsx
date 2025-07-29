import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, Shield, FileText } from "lucide-react";
import { CourseData } from "../CreateCourseWizard";
import { mixpanelInstance } from "@/utils/mixpanel";

interface LegalAgreementStepProps {
  courseData: CourseData;
  updateCourseData: (updates: Partial<CourseData>) => void;
  onNext: () => void;
  onPrev: () => void;
}

export const LegalAgreementStep = ({
  courseData,
  updateCourseData,
  onNext,
  onPrev,
}: LegalAgreementStepProps) => {
  const isValid =
    courseData.privacy_policy_accepted &&
    courseData.copyright_agreement_accepted;

  return (
    <div className="space-y-6">
      <Card className="border-amber-200 bg-amber-50">
        <CardHeader>
          <div className="flex items-center space-x-2">
            <AlertTriangle className="h-5 w-5 text-amber-600" />
            <CardTitle className="text-amber-900">
              Important Legal Information
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="text-amber-800">
          <p>
            Before submitting your course, you must agree to our privacy policy
            and copyright terms. Please review these carefully as they affect
            your rights and responsibilities as a course creator.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Shield className="h-5 w-5 text-blue-600" />
            <CardTitle>Privacy & Data Usage Policy</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-sm text-gray-700 space-y-2">
            <p>
              <strong>Data Collection:</strong> We collect course content, user
              interactions, and performance analytics to improve our platform.
            </p>
            <p>
              <strong>Content Usage:</strong> Your course content may be used
              for promotional purposes with proper attribution.
            </p>
            <p>
              <strong>Technical Issues:</strong> The platform owner is not
              responsible for data loss due to technical issues. Please maintain
              backup copies.
            </p>
            <p>
              <strong>Profile Security:</strong> Users are responsible for
              securing their own files and maintaining account security.
            </p>
            <p>
              <strong>Data Retention:</strong> Course data is stored securely
              and backed up regularly, but creators should maintain their own
              copies.
            </p>
          </div>

          <div className="flex items-start space-x-2">
            <Checkbox
              id="privacy_policy"
              checked={courseData.privacy_policy_accepted}
              onCheckedChange={(checked) =>
                updateCourseData({ privacy_policy_accepted: !!checked })
              }
            />
            <Label htmlFor="privacy_policy" className="text-sm leading-relaxed">
              I have read and accept the Privacy & Data Usage Policy. I
              understand that my content may be used for promotional purposes
              and that I am responsible for maintaining backup copies of my
              course materials.
            </Label>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center space-x-2">
            <FileText className="h-5 w-5 text-green-600" />
            <CardTitle>Copyright & Content Agreement</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-sm text-gray-700 space-y-2">
            <p>
              <strong>Original Content:</strong> You certify that all content is
              original or you have proper rights to use it.
            </p>
            <p>
              <strong>Copyright Infringement:</strong> You are legally
              responsible for any copyright violations in your course content.
            </p>
            <p>
              <strong>Content Liability:</strong> You assume full legal
              responsibility for the accuracy and legality of your course
              content.
            </p>
            <p>
              <strong>Platform Liability:</strong> The platform is not
              responsible for any legal issues arising from course content.
            </p>
            <p>
              <strong>Content Ownership:</strong> You retain ownership of your
              content while granting the platform usage rights for delivery and
              promotion.
            </p>
            <p>
              <strong>Global Compliance:</strong> Your content must comply with
              international digital content laws and regulations.
            </p>
          </div>

          <div className="flex items-start space-x-2">
            <Checkbox
              id="copyright_agreement"
              checked={courseData.copyright_agreement_accepted}
              onCheckedChange={(checked) =>
                updateCourseData({ copyright_agreement_accepted: !!checked })
              }
            />
            <Label
              htmlFor="copyright_agreement"
              className="text-sm leading-relaxed"
            >
              I certify that all course content is original or properly
              licensed. I accept full legal responsibility for any copyright
              issues and agree that the platform is not liable for
              content-related legal matters. I understand this agreement applies
              globally.
            </Label>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Resources Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Label htmlFor="resources_summary">
              Summarize all resources, references, and materials used in your
              course
            </Label>
            <Textarea
              id="resources_summary"
              value={courseData.resources_summary}
              onChange={(e) =>
                updateCourseData({ resources_summary: e.target.value })
              }
              placeholder="List all books, papers, websites, videos, and other resources used in creating this course content. Include proper citations where applicable."
              rows={4}
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button type="button" variant="outline" onClick={onPrev}>
          Previous
        </Button>
        <Button
          type="button"
          onClick={() => {
            mixpanelInstance.track(
              " Next: Review & Submit view Wizard  Button Clicked",
              {
                timestamp: new Date().toISOString(),
              }
            );
            onNext();
          }}
          //  onClick={onNext}
          disabled={!isValid}
        >
          Next: Review & Submit
        </Button>
      </div>
    </div>
  );
};
