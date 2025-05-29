
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { CourseData } from "../CreateCourseWizard";

interface BasicInfoStepProps {
  courseData: CourseData;
  updateCourseData: (updates: Partial<CourseData>) => void;
  onNext: () => void;
}

export const BasicInfoStep = ({ courseData, updateCourseData, onNext }: BasicInfoStepProps) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (courseData.title && courseData.description && courseData.duration_months > 0) {
      onNext();
    }
  };

  const handleNumberInput = (field: string, value: string) => {
    if (value === '') {
      updateCourseData({ [field]: 0 });
    } else {
      const numValue = parseInt(value);
      if (!isNaN(numValue)) {
        updateCourseData({ [field]: numValue });
      }
    }
  };

  const isValid = courseData.title && courseData.description && courseData.duration_months > 0;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div>
          <Label htmlFor="title">Course Title *</Label>
          <Input
            id="title"
            value={courseData.title}
            onChange={(e) => updateCourseData({ title: e.target.value })}
            placeholder="Enter course title"
            required
          />
        </div>

        <div>
          <Label htmlFor="description">Course Description *</Label>
          <Textarea
            id="description"
            value={courseData.description}
            onChange={(e) => updateCourseData({ description: e.target.value })}
            placeholder="Describe what students will learn in this course"
            rows={4}
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="duration">Duration (Months) *</Label>
            <Input
              id="duration"
              type="number"
              min="1"
              max="24"
              value={courseData.duration_months || ''}
              onChange={(e) => handleNumberInput('duration_months', e.target.value)}
              placeholder="Enter duration"
              required
            />
          </div>

          <div>
            <Label htmlFor="online_hours">Online Hours</Label>
            <Input
              id="online_hours"
              type="number"
              min="0"
              value={courseData.online_hours || ''}
              onChange={(e) => handleNumberInput('online_hours', e.target.value)}
              placeholder="Enter online hours"
            />
          </div>

          <div>
            <Label htmlFor="offline_hours">Offline Hours</Label>
            <Input
              id="offline_hours"
              type="number"
              min="0"
              value={courseData.offline_hours || ''}
              onChange={(e) => handleNumberInput('offline_hours', e.target.value)}
              placeholder="Enter offline hours"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="modules">Number of Modules *</Label>
          <Input
            id="modules"
            type="number"
            min="1"
            max="20"
            value={courseData.number_of_modules || ''}
            onChange={(e) => handleNumberInput('number_of_modules', e.target.value)}
            placeholder="Enter number of modules"
            required
          />
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="has_project"
            checked={courseData.has_project}
            onCheckedChange={(checked) => updateCourseData({ has_project: !!checked })}
          />
          <Label htmlFor="has_project">This course includes a final project</Label>
        </div>

        {courseData.has_project && (
          <div>
            <Label htmlFor="project_description">Project Description</Label>
            <Textarea
              id="project_description"
              value={courseData.project_description}
              onChange={(e) => updateCourseData({ project_description: e.target.value })}
              placeholder="Describe the final project requirements"
              rows={3}
            />
          </div>
        )}
      </div>

      <div className="flex justify-end">
        <Button type="submit" disabled={!isValid}>
          Next: Create Modules
        </Button>
      </div>
    </form>
  );
};
