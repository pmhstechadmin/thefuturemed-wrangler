import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import {
  CourseData,
  ModuleData,
  ContentData,
  MCQQuestion,
} from "./CreateCourseWizard";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, BookOpen, Home, Plus } from "lucide-react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CheckCircle } from "lucide-react";
import { BasicInfoStep } from "./wizard/BasicInfoStep";
import { LegalAgreementStep } from "./wizard/LegalAgreementStep";
import { ModulesStep } from "./wizard/ModulesStep";
import { EditSubmitStep } from "./wizard/EditSubmitStep";

export const EditCoursePage = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [courseData, setCourseData] = useState<CourseData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [activeTab, setActiveTab] = useState<
    "browse" | "create" | "my-courses" | "enrolled"
  >("browse");
  const steps = [
    { id: 1, title: "Basic Info", description: "Course details" },
    { id: 2, title: "Modules", description: "Add modules & content" },
    { id: 3, title: "Legal", description: "Agreements" },
    { id: 4, title: "Review", description: "Submit your course" },
  ];
  const progressPercentage = (currentStep / steps.length) * 100;

  const updateCourseData = (updates: Partial<CourseData>) => {
    setCourseData((prev) => ({ ...prev!, ...updates }));
  };
  const handleForwardNavigation = () => {
    // Check if there's history to go forward to
    try {
      navigate(1);
    } catch (error) {
      // If forward navigation fails, stay on current page
      console.log("No forward history available");
    }
  };

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };
  const handleBackNavigation = () => {
    // Check if there's history to go back to
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      // If no history, navigate to home page
      navigate("/");
    }
  };

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        // Fetch course data
        const { data: course, error: courseError } = await supabase
          .from("courses")
          .select("*")
          .eq("id", courseId)
          .single();

        if (courseError) throw courseError;
        if (!course) throw new Error("Course not found");

        // Fetch modules
        const { data: modules, error: modulesError } = await supabase
          .from("course_modules")
          .select("*")
          .eq("course_id", courseId)
          .order("module_number", { ascending: true });

        if (modulesError) throw modulesError;

        // Fetch content and questions for each module
        const modulesWithContent: ModuleData[] = await Promise.all(
          modules.map(async (module) => {
            const { data: content, error: contentError } = await supabase
              .from("module_content")
              .select("*")
              .eq("module_id", module.id);

            if (contentError) throw contentError;

            const { data: questions, error: questionsError } = await supabase
              .from("mcq_questions")
              .select("*")
              .eq("module_id", module.id);

            if (questionsError) throw questionsError;

            return {
              title: module.title,
              description: module.description,
              content: (content?.map((c) => ({
                type: c.content_type as "text" | "pdf" | "video",
                title: c.content_title,
                content: c.content_text,
              })) || []) as ContentData[],
              mcq_questions: (questions?.map((q) => ({
                question_text: q.question_text,
                option_a: q.option_a,
                option_b: q.option_b,
                option_c: q.option_c,
                option_d: q.option_d,
                correct_answer: q.correct_answer as "A" | "B" | "C" | "D",
                explanation: q.explanation,
              })) || []) as MCQQuestion[],
            };
          })
        );

        const transformedCourseData: CourseData = {
          title: course.title,
          description: course.description,
          duration_months: course.duration_months,
          online_hours: course.online_hours,
          offline_hours: course.offline_hours,
          has_project: course.has_project,
          project_description: course.project_description || "",
          number_of_modules: course.number_of_modules,
          modules: modulesWithContent,
          privacy_policy_accepted: true,
          copyright_agreement_accepted: true,
          resources_summary: course.resources_summary || "",
        };

        setCourseData(transformedCourseData);
      } catch (error) {
        console.error("Error fetching course:", error);
        toast({
          title: "Error",
          description: "Failed to load course data",
          variant: "destructive",
        });
        navigate("/e-learning");
      } finally {
        setIsLoading(false);
      }
    };

    if (courseId) {
      fetchCourseData();
    }
  }, [courseId, navigate, toast]);

  const handleSubmit = async (data: CourseData) => {
    setIsSubmitting(true);
    try {
      // Update course
      const { error: courseError } = await supabase
        .from("courses")
        .update({
          title: data.title,
          description: data.description,
          duration_months: data.duration_months,
          online_hours: data.online_hours,
          offline_hours: data.offline_hours,
          has_project: data.has_project,
          project_description: data.has_project
            ? data.project_description
            : null,
          number_of_modules: data.number_of_modules,
          resources_summary: data.resources_summary,
          updated_at: new Date().toISOString(),
        })
        .eq("id", courseId);

      if (courseError) throw courseError;

      // Delete existing modules first
      await supabase.from("course_modules").delete().eq("course_id", courseId);

      // Insert updated modules
      for (let i = 0; i < data.modules.length; i++) {
        const module = data.modules[i];

        const { data: moduleData, error: moduleError } = await supabase
          .from("course_modules")
          .insert({
            course_id: courseId,
            module_number: i + 1,
            title: module.title,
            description: module.description,
          })
          .select()
          .single();

        if (moduleError) throw moduleError;

        // Insert module content
        for (const content of module.content) {
          const { error: contentError } = await supabase
            .from("module_content")
            .insert({
              module_id: moduleData.id,
              content_type: content.type,
              content_title: content.title,
              content_text: content.content,
            });

          if (contentError) throw contentError;
        }

        // Insert MCQ questions
        for (const question of module.mcq_questions) {
          const { error: questionError } = await supabase
            .from("mcq_questions")
            .insert({
              module_id: moduleData.id,
              question_text: question.question_text,
              option_a: question.option_a,
              option_b: question.option_b,
              option_c: question.option_c,
              option_d: question.option_d,
              correct_answer: question.correct_answer,
              explanation: question.explanation,
            });

          if (questionError) throw questionError;
        }
      }

      toast({
        title: "Success",
        description: "Course updated successfully",
      });
      navigate("/e-learning");
    } catch (error) {
      console.error("Error updating course:", error);
      toast({
        title: "Error",
        description: "Failed to update course",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!courseData) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium">Course not found</h3>
        <Button onClick={() => navigate("/e-learning")} className="mt-4">
          Back to My Courses
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
       {/* <header className="bg-white shadow-sm border-b">
              <div className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={handleBackNavigation}
                        className="hover:bg-gray-100"
                        title="Go back"
                      >
                        <ArrowLeft className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={handleForwardNavigation}
                        className="hover:bg-gray-100"
                        title="Go forward"
                      >
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    <Link to="/" className="flex items-center space-x-2">
                      <BookOpen className="h-8 w-8 text-blue-600" />
                      <h1 className="text-2xl font-bold text-gray-900">MedPortal E-Learning</h1>
                    </Link>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Button
                      variant="outline"
                      onClick={() => navigate('/')}
                      className="hover:bg-gray-100"
                      title="Go to home page"
                    >
                      <Home className="mr-2 h-4 w-4" />
                      Home
                    </Button>
                    <nav className="flex space-x-4">
                      <Button
                        variant={activeTab === "browse" ? "default" : "outline"}
                        onClick={() => setActiveTab("browse")}
                      >
                        Browse Courses
                      </Button>
                      <Button
                        variant={activeTab === "enrolled" ? "default" : "outline"}
                        onClick={() => setActiveTab("enrolled")}
                      >
                        My Enrolled Courses
                      </Button>
                      <Button
                        variant={activeTab === "create" ? "default" : "outline"}
                        onClick={() => setActiveTab("create")}
                      >
                        <Plus className="mr-2 h-4 w-4" />
                        Create Course
                      </Button>
                      <Button
                        variant={activeTab === "my-courses" ? "default" : "outline"}
                        onClick={() => setActiveTab("my-courses")}
                      >
                        My Courses
                      </Button>
                    </nav>
                  </div>
                </div>
              </div>
            </header> */}
      <Button
        variant="ghost"
        onClick={() => navigate("/e-learning")}
        className="mb-6"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to My Courses
      </Button>

      <h1 className="text-3xl font-bold mb-6">Edit Course</h1>

      <div className="max-w-4xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Edit Course</CardTitle>
            <div className="space-y-4">
              <Progress value={progressPercentage} className="w-full" />
              <div className="flex justify-between">
                {steps.map((step) => (
                  <div
                    key={step.id}
                    className={`flex items-center space-x-2 ${
                      step.id < currentStep
                        ? "text-green-600"
                        : step.id === currentStep
                        ? "text-blue-600"
                        : "text-gray-400"
                    }`}
                  >
                    {step.id < currentStep ? (
                      <CheckCircle className="h-5 w-5" />
                    ) : (
                      <div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center text-xs ${
                          step.id === currentStep
                            ? "border-blue-600 bg-blue-600 text-white"
                            : "border-gray-300"
                        }`}
                      >
                        {step.id}
                      </div>
                    )}
                    <div className="hidden md:block">
                      <div className="font-medium text-sm">{step.title}</div>
                      <div className="text-xs text-gray-500">
                        {step.description}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {currentStep === 1 && (
              <BasicInfoStep
                courseData={courseData}
                updateCourseData={updateCourseData}
                onNext={nextStep}
              />
            )}
            {currentStep === 2 && (
              <ModulesStep
                courseData={courseData}
                updateCourseData={updateCourseData}
                onNext={nextStep}
                onPrev={prevStep}
              />
            )}
            {currentStep === 3 && (
              <LegalAgreementStep
                courseData={courseData}
                updateCourseData={updateCourseData}
                onNext={nextStep}
                onPrev={prevStep}
              />
            )}
            {currentStep === 4 && (
              <EditSubmitStep
                courseData={{ ...courseData, id: courseId }}
                updateCourseData={updateCourseData}
                onPrev={prevStep}
                onSubmit={() => handleSubmit(courseData!)}
                isSubmitting={isSubmitting}
              />
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
