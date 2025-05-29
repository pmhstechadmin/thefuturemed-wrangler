
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, Circle, ArrowLeft, Trophy, BookOpen } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Module {
  id: string;
  title: string;
  description: string;
  module_number: number;
  completed: boolean;
}

interface Course {
  id: string;
  title: string;
  description: string;
  number_of_modules: number;
}

export const CourseAccessPage = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [course, setCourse] = useState<Course | null>(null);
  const [modules, setModules] = useState<Module[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [completedModules, setCompletedModules] = useState(0);
  const [isEnrolled, setIsEnrolled] = useState(false);

  useEffect(() => {
    if (courseId) {
      fetchCourseData();
      checkEnrollment();
    }
  }, [courseId]);

  const fetchCourseData = async () => {
    try {
      // Fetch course details
      const { data: courseData, error: courseError } = await supabase
        .from('courses')
        .select('*')
        .eq('id', courseId)
        .single();

      if (courseError) throw courseError;
      setCourse(courseData);

      // Fetch modules
      const { data: modulesData, error: modulesError } = await supabase
        .from('course_modules')
        .select('*')
        .eq('course_id', courseId)
        .order('module_number');

      if (modulesError) throw modulesError;

      // Get user progress
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        const { data: progressData } = await supabase
          .from('user_module_progress')
          .select('module_id, completed')
          .eq('user_id', session.user.id)
          .eq('course_id', courseId);

        const progressMap = new Map(progressData?.map(p => [p.module_id, p.completed]) || []);
        
        const modulesWithProgress = modulesData.map(module => ({
          ...module,
          completed: progressMap.get(module.id) || false
        }));

        setModules(modulesWithProgress);
        setCompletedModules(modulesWithProgress.filter(m => m.completed).length);
      }
    } catch (error) {
      console.error('Error fetching course data:', error);
      toast({
        title: "Error",
        description: "Failed to load course data",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const checkEnrollment = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      const { data, error } = await supabase
        .from('course_enrollments')
        .select('*')
        .eq('user_id', session.user.id)
        .eq('course_id', courseId)
        .eq('payment_status', 'paid')
        .single();

      if (!error && data) {
        setIsEnrolled(true);
      }
    } catch (error) {
      console.error('Error checking enrollment:', error);
    }
  };

  const toggleModuleCompletion = async (moduleId: string, currentStatus: boolean) => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      const newStatus = !currentStatus;
      
      if (newStatus) {
        // Mark as completed
        await supabase
          .from('user_module_progress')
          .upsert({
            user_id: session.user.id,
            course_id: courseId!,
            module_id: moduleId,
            completed: true,
            completed_at: new Date().toISOString(),
          });
      } else {
        // Mark as incomplete
        await supabase
          .from('user_module_progress')
          .upsert({
            user_id: session.user.id,
            course_id: courseId!,
            module_id: moduleId,
            completed: false,
            completed_at: null,
          });
      }

      // Update local state
      setModules(prev => prev.map(module => 
        module.id === moduleId ? { ...module, completed: newStatus } : module
      ));
      
      setCompletedModules(prev => newStatus ? prev + 1 : prev - 1);

      toast({
        title: newStatus ? "Module Completed!" : "Module Marked Incomplete",
        description: newStatus ? "Great progress! Keep it up." : "Module marked as incomplete",
      });
    } catch (error) {
      console.error('Error updating module progress:', error);
      toast({
        title: "Error",
        description: "Failed to update progress",
        variant: "destructive",
      });
    }
  };

  const finishCourse = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      await supabase
        .from('course_enrollments')
        .update({
          completed: true,
          completion_date: new Date().toISOString(),
        })
        .eq('user_id', session.user.id)
        .eq('course_id', courseId);

      toast({
        title: "🎉 Congratulations!",
        description: "You have successfully completed the course!",
      });

      navigate('/e-learning?tab=enrolled');
    } catch (error) {
      console.error('Error finishing course:', error);
      toast({
        title: "Error",
        description: "Failed to complete course",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!isEnrolled) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="text-center py-12">
            <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Course Access Required</h3>
            <p className="text-gray-600 mb-4">You need to enroll in this course to access the content.</p>
            <Button onClick={() => navigate(`/course/${courseId}`)}>
              Go to Course Details
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!course) return null;

  const progressPercentage = course.number_of_modules > 0 ? (completedModules / course.number_of_modules) * 100 : 0;
  const allModulesCompleted = completedModules === course.number_of_modules && course.number_of_modules > 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <Button
            variant="outline"
            size="icon"
            onClick={() => navigate(-1)}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-bold text-gray-900">{course.title}</h1>
          <p className="text-gray-600 mt-2">{course.description}</p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Progress Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Trophy className="h-5 w-5" />
                <span>Course Progress</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>{completedModules} of {course.number_of_modules} modules completed</span>
                    <span>{Math.round(progressPercentage)}%</span>
                  </div>
                  <Progress value={progressPercentage} className="h-2" />
                </div>
                
                {allModulesCompleted && (
                  <div className="text-center">
                    <Button onClick={finishCourse} size="lg" className="bg-green-600 hover:bg-green-700">
                      🎓 Finish Course & Get Certificate
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Modules List */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Course Modules</h2>
            {modules.map((module) => (
              <Card key={module.id} className={`cursor-pointer transition-all ${
                module.completed ? 'border-green-200 bg-green-50' : 'hover:shadow-md'
              }`}>
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <button
                      onClick={() => toggleModuleCompletion(module.id, module.completed)}
                      className="mt-1 transition-colors"
                    >
                      {module.completed ? (
                        <CheckCircle2 className="h-6 w-6 text-green-600" />
                      ) : (
                        <Circle className="h-6 w-6 text-gray-400 hover:text-green-600" />
                      )}
                    </button>
                    
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <Badge variant="outline">Module {module.module_number}</Badge>
                        {module.completed && <Badge className="bg-green-100 text-green-800">Completed</Badge>}
                      </div>
                      <h3 className="font-semibold text-lg mb-2">{module.title}</h3>
                      {module.description && (
                        <p className="text-gray-600">{module.description}</p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};
