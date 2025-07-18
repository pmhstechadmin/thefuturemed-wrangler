// // // // // // import { useState, useEffect } from "react";
// // // // // // import { useParams, useNavigate } from "react-router-dom";
// // // // // // import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// // // // // // import { Button } from "@/components/ui/button";
// // // // // // import { Badge } from "@/components/ui/badge";
// // // // // // import { Progress } from "@/components/ui/progress";
// // // // // // import { CheckCircle2, Circle, ArrowLeft, Trophy, BookOpen } from "lucide-react";
// // // // // // import { supabase } from "@/integrations/supabase/client";
// // // // // // import { useToast } from "@/hooks/use-toast";

// // // // // // interface Module {
// // // // // //   id: string;
// // // // // //   title: string;
// // // // // //   description: string;
// // // // // //   module_number: number;
// // // // // //   completed: boolean;
// // // // // // }

// // // // // // interface Course {
// // // // // //   id: string;
// // // // // //   title: string;
// // // // // //   description: string;
// // // // // //   number_of_modules: number;
// // // // // // }

// // // // // // export const CourseAccessPage = () => {
// // // // // //   const { courseId } = useParams();
// // // // // //   const navigate = useNavigate();
// // // // // //   const { toast } = useToast();
// // // // // //   const [course, setCourse] = useState<Course | null>(null);
// // // // // //   const [modules, setModules] = useState<Module[]>([]);
// // // // // //   const [isLoading, setIsLoading] = useState(true);
// // // // // //   const [completedModules, setCompletedModules] = useState(0);
// // // // // //   const [isEnrolled, setIsEnrolled] = useState(false);

// // // // // //   useEffect(() => {
// // // // // //     if (courseId) {
// // // // // //       fetchCourseData();
// // // // // //       checkEnrollment();
// // // // // //     }
// // // // // //   }, [courseId]);

// // // // // //   const fetchCourseData = async () => {
// // // // // //     try {
// // // // // //       // Fetch course details
// // // // // //       const { data: courseData, error: courseError } = await supabase
// // // // // //         .from('courses')
// // // // // //         .select('*')
// // // // // //         .eq('id', courseId)
// // // // // //         .single();

// // // // // //       if (courseError) throw courseError;
// // // // // //       setCourse(courseData);

// // // // // //       // Fetch modules
// // // // // //       const { data: modulesData, error: modulesError } = await supabase
// // // // // //         .from('course_modules')
// // // // // //         .select('*')
// // // // // //         .eq('course_id', courseId)
// // // // // //         .order('module_number');

// // // // // //       if (modulesError) throw modulesError;

// // // // // //       // Get user progress
// // // // // //       const { data: { session } } = await supabase.auth.getSession();
// // // // // //       if (session) {
// // // // // //         const { data: progressData } = await supabase
// // // // // //           .from('user_module_progress')
// // // // // //           .select('module_id, completed')
// // // // // //           .eq('user_id', session.user.id)
// // // // // //           .eq('course_id', courseId);

// // // // // //         const progressMap = new Map(progressData?.map(p => [p.module_id, p.completed]) || []);

// // // // // //         const modulesWithProgress = modulesData.map(module => ({
// // // // // //           ...module,
// // // // // //           completed: progressMap.get(module.id) || false
// // // // // //         }));

// // // // // //         setModules(modulesWithProgress);
// // // // // //         setCompletedModules(modulesWithProgress.filter(m => m.completed).length);
// // // // // //       }
// // // // // //     } catch (error) {
// // // // // //       console.error('Error fetching course data:', error);
// // // // // //       toast({
// // // // // //         title: "Error",
// // // // // //         description: "Failed to load course data",
// // // // // //         variant: "destructive",
// // // // // //       });
// // // // // //     } finally {
// // // // // //       setIsLoading(false);
// // // // // //     }
// // // // // //   };

// // // // // //   const checkEnrollment = async () => {
// // // // // //     try {
// // // // // //       const { data: { session } } = await supabase.auth.getSession();
// // // // // //       if (!session) return;

// // // // // //       const { data, error } = await supabase
// // // // // //         .from('course_enrollments')
// // // // // //         .select('*')
// // // // // //         .eq('user_id', session.user.id)
// // // // // //         .eq('course_id', courseId)
// // // // // //         .eq('payment_status', 'paid')
// // // // // //         // .single();
// // // // // //         setIsEnrolled(data && data.length > 0);

// // // // // //       if (!error && data) {
// // // // // //         setIsEnrolled(true);
// // // // // //       }
// // // // // //     } catch (error) {
// // // // // //       console.error('Error checking enrollment:', error);
// // // // // //     }
// // // // // //   };

// // // // // //   const toggleModuleCompletion = async (moduleId: string, currentStatus: boolean) => {
// // // // // //     try {
// // // // // //       const { data: { session } } = await supabase.auth.getSession();
// // // // // //       if (!session) return;

// // // // // //       const newStatus = !currentStatus;

// // // // // //       if (newStatus) {
// // // // // //         // Mark as completed
// // // // // //         await supabase
// // // // // //           .from('user_module_progress')
// // // // // //           .upsert({
// // // // // //             user_id: session.user.id,
// // // // // //             course_id: courseId!,
// // // // // //             module_id: moduleId,
// // // // // //             completed: true,
// // // // // //             completed_at: new Date().toISOString(),
// // // // // //           });
// // // // // //       } else {
// // // // // //         // Mark as incomplete
// // // // // //         await supabase
// // // // // //           .from('user_module_progress')
// // // // // //           .upsert({
// // // // // //             user_id: session.user.id,
// // // // // //             course_id: courseId!,
// // // // // //             module_id: moduleId,
// // // // // //             completed: false,
// // // // // //             completed_at: null,
// // // // // //           });
// // // // // //       }

// // // // // //       // Update local state
// // // // // //       setModules(prev => prev.map(module =>
// // // // // //         module.id === moduleId ? { ...module, completed: newStatus } : module
// // // // // //       ));

// // // // // //       setCompletedModules(prev => newStatus ? prev + 1 : prev - 1);

// // // // // //       toast({
// // // // // //         title: newStatus ? "Module Completed!" : "Module Marked Incomplete",
// // // // // //         description: newStatus ? "Great progress! Keep it up." : "Module marked as incomplete",
// // // // // //       });
// // // // // //     } catch (error) {
// // // // // //       console.error('Error updating module progress:', error);
// // // // // //       toast({
// // // // // //         title: "Error",
// // // // // //         description: "Failed to update progress",
// // // // // //         variant: "destructive",
// // // // // //       });
// // // // // //     }
// // // // // //   };

// // // // // //   const finishCourse = async () => {
// // // // // //     try {
// // // // // //       const { data: { session } } = await supabase.auth.getSession();
// // // // // //       if (!session) return;

// // // // // //       await supabase
// // // // // //         .from('course_enrollments')
// // // // // //         .update({
// // // // // //           completed: true,
// // // // // //           completion_date: new Date().toISOString(),
// // // // // //         })
// // // // // //         .eq('user_id', session.user.id)
// // // // // //         .eq('course_id', courseId);

// // // // // //       toast({
// // // // // //         title: "🎉 Congratulations!",
// // // // // //         description: "You have successfully completed the course!",
// // // // // //       });

// // // // // //       navigate('/e-learning?tab=enrolled');
// // // // // //     } catch (error) {
// // // // // //       console.error('Error finishing course:', error);
// // // // // //       toast({
// // // // // //         title: "Error",
// // // // // //         description: "Failed to complete course",
// // // // // //         variant: "destructive",
// // // // // //       });
// // // // // //     }
// // // // // //   };

// // // // // //   if (isLoading) {
// // // // // //     return (
// // // // // //       <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center">
// // // // // //         <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
// // // // // //       </div>
// // // // // //     );
// // // // // //   }

// // // // // //   if (!isEnrolled) {
// // // // // //     return (
// // // // // //       <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center">
// // // // // //         <Card className="max-w-md">
// // // // // //           <CardContent className="text-center py-12">
// // // // // //             <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
// // // // // //             <h3 className="text-lg font-medium text-gray-900 mb-2">Course Access Required</h3>
// // // // // //             <p className="text-gray-600 mb-4">You need to enroll in this course to access the content.</p>
// // // // // //             <Button onClick={() => navigate(`/course/${courseId}`)}>
// // // // // //               Go to Course Details
// // // // // //             </Button>
// // // // // //           </CardContent>
// // // // // //         </Card>
// // // // // //       </div>
// // // // // //     );
// // // // // //   }

// // // // // //   if (!course) return null;

// // // // // //   const progressPercentage = course.number_of_modules > 0 ? (completedModules / course.number_of_modules) * 100 : 0;
// // // // // //   const allModulesCompleted = completedModules === course.number_of_modules && course.number_of_modules > 0;

// // // // // //   return (
// // // // // //     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
// // // // // //       <header className="bg-white shadow-sm border-b">
// // // // // //         <div className="container mx-auto px-4 py-4">
// // // // // //           <Button
// // // // // //             variant="outline"
// // // // // //             size="icon"
// // // // // //             onClick={() => navigate(-1)}
// // // // // //             className="mb-4"
// // // // // //           >
// // // // // //             <ArrowLeft className="h-4 w-4" />
// // // // // //           </Button>
// // // // // //           <h1 className="text-2xl font-bold text-gray-900">{course.title}</h1>
// // // // // //           <p className="text-gray-600 mt-2">{course.description}</p>
// // // // // //         </div>
// // // // // //       </header>

// // // // // //       <main className="container mx-auto px-4 py-8">
// // // // // //         <div className="max-w-4xl mx-auto space-y-6">
// // // // // //           {/* Progress Overview */}
// // // // // //           <Card>
// // // // // //             <CardHeader>
// // // // // //               <CardTitle className="flex items-center space-x-2">
// // // // // //                 <Trophy className="h-5 w-5" />
// // // // // //                 <span>Course Progress</span>
// // // // // //               </CardTitle>
// // // // // //             </CardHeader>
// // // // // //             <CardContent>
// // // // // //               <div className="space-y-4">
// // // // // //                 <div>
// // // // // //                   <div className="flex justify-between text-sm text-gray-600 mb-2">
// // // // // //                     <span>{completedModules} of {course.number_of_modules} modules completed</span>
// // // // // //                     <span>{Math.round(progressPercentage)}%</span>
// // // // // //                   </div>
// // // // // //                   <Progress value={progressPercentage} className="h-2" />
// // // // // //                 </div>

// // // // // //                 {allModulesCompleted && (
// // // // // //                   <div className="text-center">
// // // // // //                     <Button onClick={finishCourse} size="lg" className="bg-green-600 hover:bg-green-700">
// // // // // //                       🎓 Finish Course & Get Certificate
// // // // // //                     </Button>
// // // // // //                   </div>
// // // // // //                 )}
// // // // // //               </div>
// // // // // //             </CardContent>
// // // // // //           </Card>

// // // // // //           {/* Modules List */}
// // // // // //           <div className="space-y-4">
// // // // // //             <h2 className="text-xl font-semibold">Course Modules</h2>
// // // // // //             {modules.map((module) => (
// // // // // //               <Card key={module.id} className={`cursor-pointer transition-all ${
// // // // // //                 module.completed ? 'border-green-200 bg-green-50' : 'hover:shadow-md'
// // // // // //               }`}>
// // // // // //                 <CardContent className="p-6">
// // // // // //                   <div className="flex items-start space-x-4">
// // // // // //                     <button
// // // // // //                       onClick={() => toggleModuleCompletion(module.id, module.completed)}
// // // // // //                       className="mt-1 transition-colors"
// // // // // //                     >
// // // // // //                       {module.completed ? (
// // // // // //                         <CheckCircle2 className="h-6 w-6 text-green-600" />
// // // // // //                       ) : (
// // // // // //                         <Circle className="h-6 w-6 text-gray-400 hover:text-green-600" />
// // // // // //                       )}
// // // // // //                     </button>

// // // // // //                     <div className="flex-1">
// // // // // //                       <div className="flex items-center space-x-2 mb-2">
// // // // // //                         <Badge variant="outline">Module {module.module_number}</Badge>
// // // // // //                         {module.completed && <Badge className="bg-green-100 text-green-800">Completed</Badge>}
// // // // // //                       </div>
// // // // // //                       <h3 className="font-semibold text-lg mb-2">{module.title}</h3>
// // // // // //                       {module.description && (
// // // // // //                         <p className="text-gray-600">{module.description}</p>
// // // // // //                       )}
// // // // // //                     </div>
// // // // // //                   </div>
// // // // // //                 </CardContent>
// // // // // //               </Card>
// // // // // //             ))}
// // // // // //           </div>
// // // // // //         </div>
// // // // // //       </main>
// // // // // //     </div>
// // // // // //   );
// // // // // // };

// // // // // import { useState, useEffect } from "react";
// // // // // import { useParams, useNavigate } from "react-router-dom";
// // // // // import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// // // // // import { Button } from "@/components/ui/button";
// // // // // import { Badge } from "@/components/ui/badge";
// // // // // import { Progress } from "@/components/ui/progress";
// // // // // import {
// // // // //   CheckCircle2,
// // // // //   Circle,
// // // // //   ArrowLeft,
// // // // //   Trophy,
// // // // //   BookOpen,
// // // // //   FileText,
// // // // //   Video,
// // // // // } from "lucide-react";
// // // // // import { supabase } from "@/integrations/supabase/client";
// // // // // import { useToast } from "@/hooks/use-toast";

// // // // // interface ContentData {
// // // // //   type: "text" | "pdf" | "video";
// // // // //   title: string;
// // // // //   content?: string;
// // // // //   file_url?: string;
// // // // //   file_name?: string;
// // // // // }

// // // // // interface Module {
// // // // //   id: string;
// // // // //   title: string;
// // // // //   description: string;
// // // // //   module_number: number;
// // // // //   completed: boolean;
// // // // //   content: ContentData[];
// // // // //   mcq_questions: any[];
// // // // // }

// // // // // interface Course {
// // // // //   id: string;
// // // // //   title: string;
// // // // //   description: string;
// // // // //   number_of_modules: number;
// // // // // }

// // // // // export const CourseAccessPage = () => {
// // // // //   const { courseId } = useParams();
// // // // //   const navigate = useNavigate();
// // // // //   const { toast } = useToast();
// // // // //   const [course, setCourse] = useState<Course | null>(null);
// // // // //   const [modules, setModules] = useState<Module[]>([]);
// // // // //   const [isLoading, setIsLoading] = useState(true);
// // // // //   const [completedModules, setCompletedModules] = useState(0);
// // // // //   const [isEnrolled, setIsEnrolled] = useState(false);
// // // // //   const [activeModuleId, setActiveModuleId] = useState<string | null>(null);

// // // // //   useEffect(() => {
// // // // //     if (courseId) {
// // // // //       fetchCourseData();
// // // // //       checkEnrollment();
// // // // //     }
// // // // //   }, [courseId]);

// // // // //   const fetchCourseData = async () => {
// // // // //     try {
// // // // //       // Fetch course details
// // // // //       const { data: courseData, error: courseError } = await supabase
// // // // //         .from("courses")
// // // // //         .select("*")
// // // // //         .eq("id", courseId)
// // // // //         .single();

// // // // //       if (courseError) throw courseError;
// // // // //       setCourse(courseData);

// // // // //       // Fetch modules with content
// // // // //       const { data: modulesData, error: modulesError } = await supabase
// // // // //         .from("course_modules")
// // // // //         .select("*")
// // // // //         .eq("course_id", courseId)
// // // // //         .order("module_number");

// // // // //       if (modulesError) throw modulesError;

// // // // //       // Get user progress
// // // // //       const {
// // // // //         data: { session },
// // // // //       } = await supabase.auth.getSession();
// // // // //       if (session) {
// // // // //         const { data: progressData } = await supabase
// // // // //           .from("user_module_progress")
// // // // //           .select("module_id, completed")
// // // // //           .eq("user_id", session.user.id)
// // // // //           .eq("course_id", courseId);

// // // // //         const progressMap = new Map(
// // // // //           progressData?.map((p) => [p.module_id, p.completed]) || []
// // // // //         );

// // // // //         const modulesWithProgress = modulesData.map((module) => ({
// // // // //           ...module,
// // // // //           completed: progressMap.get(module.id) || false,
// // // // //           // Ensure content is properly parsed
// // // // //           content: module.content ? JSON.parse(module.content) : [],
// // // // //         }));

// // // // //         setModules(modulesWithProgress);
// // // // //         setCompletedModules(
// // // // //           modulesWithProgress.filter((m) => m.completed).length
// // // // //         );
// // // // //       }
// // // // //     } catch (error) {
// // // // //       console.error("Error fetching course data:", error);
// // // // //       toast({
// // // // //         title: "Error",
// // // // //         description: "Failed to load course data",
// // // // //         variant: "destructive",
// // // // //       });
// // // // //     } finally {
// // // // //       setIsLoading(false);
// // // // //     }
// // // // //   };

// // // // //   const checkEnrollment = async () => {
// // // // //     try {
// // // // //       const {
// // // // //         data: { session },
// // // // //       } = await supabase.auth.getSession();
// // // // //       if (!session) return;

// // // // //       const { data, error } = await supabase
// // // // //         .from("course_enrollments")
// // // // //         .select("id")
// // // // //         .eq("user_id", session.user.id)
// // // // //         .eq("course_id", courseId)
// // // // //         .eq("payment_status", "paid");

// // // // //       if (error) throw error;

// // // // //       setIsEnrolled(!!data && data.length > 0);
// // // // //     } catch (error) {
// // // // //       console.error("Error checking enrollment:", error);
// // // // //       toast({
// // // // //         title: "Error",
// // // // //         description: "Failed to check enrollment",
// // // // //         variant: "destructive",
// // // // //       });
// // // // //     }
// // // // //   };

// // // // //   const toggleModuleCompletion = async (
// // // // //     moduleId: string,
// // // // //     currentStatus: boolean
// // // // //   ) => {
// // // // //     try {
// // // // //       const {
// // // // //         data: { session },
// // // // //       } = await supabase.auth.getSession();
// // // // //       if (!session) return;

// // // // //       const newStatus = !currentStatus;

// // // // //       await supabase.from("user_module_progress").upsert({
// // // // //         user_id: session.user.id,
// // // // //         course_id: courseId!,
// // // // //         module_id: moduleId,
// // // // //         completed: newStatus,
// // // // //         completed_at: newStatus ? new Date().toISOString() : null,
// // // // //       });

// // // // //       // Update local state
// // // // //       setModules((prev) =>
// // // // //         prev.map((module) =>
// // // // //           module.id === moduleId ? { ...module, completed: newStatus } : module
// // // // //         )
// // // // //       );

// // // // //       setCompletedModules((prev) => (newStatus ? prev + 1 : prev - 1));

// // // // //       toast({
// // // // //         title: newStatus ? "Module Completed!" : "Module Marked Incomplete",
// // // // //         description: newStatus
// // // // //           ? "Great progress! Keep it up."
// // // // //           : "Module marked as incomplete",
// // // // //       });
// // // // //     } catch (error) {
// // // // //       console.error("Error updating module progress:", error);
// // // // //       toast({
// // // // //         title: "Error",
// // // // //         description: "Failed to update progress",
// // // // //         variant: "destructive",
// // // // //       });
// // // // //     }
// // // // //   };

// // // // //   const finishCourse = async () => {
// // // // //     try {
// // // // //       const {
// // // // //         data: { session },
// // // // //       } = await supabase.auth.getSession();
// // // // //       if (!session) return;

// // // // //       await supabase
// // // // //         .from("course_enrollments")
// // // // //         .update({
// // // // //           completed: true,
// // // // //           completion_date: new Date().toISOString(),
// // // // //         })
// // // // //         .eq("user_id", session.user.id)
// // // // //         .eq("course_id", courseId);

// // // // //       toast({
// // // // //         title: "🎉 Congratulations!",
// // // // //         description: "You have successfully completed the course!",
// // // // //       });

// // // // //       navigate("/e-learning?tab=enrolled");
// // // // //     } catch (error) {
// // // // //       console.error("Error finishing course:", error);
// // // // //       toast({
// // // // //         title: "Error",
// // // // //         description: "Failed to complete course",
// // // // //         variant: "destructive",
// // // // //       });
// // // // //     }
// // // // //   };

// // // // //   const toggleModule = (moduleId: string) => {
// // // // //     setActiveModuleId(activeModuleId === moduleId ? null : moduleId);
// // // // //   };

// // // // //   const renderContent = (content: ContentData) => {
// // // // //     switch (content.type) {
// // // // //       case "text":
// // // // //         return (
// // // // //           <div className="mt-4 bg-gray-50 p-4 rounded-md">
// // // // //             <div className="flex items-center mb-2">
// // // // //               <FileText className="h-5 w-5 mr-2 text-blue-600" />
// // // // //               <h4 className="font-medium">{content.title}</h4>
// // // // //             </div>
// // // // //             <div className="prose max-w-none">
// // // // //               {content.content?.split("\n").map((paragraph, idx) => (
// // // // //                 <p key={idx} className="mb-3">
// // // // //                   {paragraph}
// // // // //                 </p>
// // // // //               ))}
// // // // //             </div>
// // // // //           </div>
// // // // //         );
// // // // //       case "pdf":
// // // // //         return (
// // // // //           <div className="mt-4 bg-gray-50 p-4 rounded-md">
// // // // //             <div className="flex items-center mb-2">
// // // // //               <FileText className="h-5 w-5 mr-2 text-red-600" />
// // // // //               <h4 className="font-medium">{content.title}</h4>
// // // // //             </div>
// // // // //             {content.file_url ? (
// // // // //               <div className="mt-2">
// // // // //                 <a
// // // // //                   href={content.file_url}
// // // // //                   target="_blank"
// // // // //                   rel="noopener noreferrer"
// // // // //                   className="inline-flex items-center text-blue-600 hover:underline"
// // // // //                 >
// // // // //                   <FileText className="h-4 w-4 mr-1" />
// // // // //                   {content.file_name || "View PDF"}
// // // // //                 </a>
// // // // //               </div>
// // // // //             ) : (
// // // // //               <p className="text-gray-500">PDF file not available</p>
// // // // //             )}
// // // // //           </div>
// // // // //         );
// // // // //       case "video":
// // // // //         return (
// // // // //           <div className="mt-4 bg-gray-50 p-4 rounded-md">
// // // // //             <div className="flex items-center mb-2">
// // // // //               <Video className="h-5 w-5 mr-2 text-purple-600" />
// // // // //               <h4 className="font-medium">{content.title}</h4>
// // // // //             </div>
// // // // //             {content.file_url ? (
// // // // //               <div className="mt-2 aspect-video bg-black rounded-lg overflow-hidden">
// // // // //                 <video
// // // // //                   src={content.file_url}
// // // // //                   controls
// // // // //                   className="w-full h-full object-contain"
// // // // //                 />
// // // // //               </div>
// // // // //             ) : (
// // // // //               <p className="text-gray-500">Video file not available</p>
// // // // //             )}
// // // // //           </div>
// // // // //         );
// // // // //       default:
// // // // //         return null;
// // // // //     }
// // // // //   };

// // // // //   if (isLoading) {
// // // // //     return (
// // // // //       <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center">
// // // // //         <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
// // // // //       </div>
// // // // //     );
// // // // //   }

// // // // //   if (!isEnrolled) {
// // // // //     return (
// // // // //       <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center">
// // // // //         <Card className="max-w-md">
// // // // //           <CardContent className="text-center py-12">
// // // // //             <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
// // // // //             <h3 className="text-lg font-medium text-gray-900 mb-2">
// // // // //               Course Access Required
// // // // //             </h3>
// // // // //             <p className="text-gray-600 mb-4">
// // // // //               You need to enroll in this course to access the content.
// // // // //             </p>
// // // // //             <Button onClick={() => navigate(`/course/${courseId}`)}>
// // // // //               Go to Course Details
// // // // //             </Button>
// // // // //           </CardContent>
// // // // //         </Card>
// // // // //       </div>
// // // // //     );
// // // // //   }

// // // // //   if (!course) return null;

// // // // //   const progressPercentage =
// // // // //     course.number_of_modules > 0
// // // // //       ? (completedModules / course.number_of_modules) * 100
// // // // //       : 0;
// // // // //   const allModulesCompleted =
// // // // //     completedModules === course.number_of_modules &&
// // // // //     course.number_of_modules > 0;

// // // // //   return (
// // // // //     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
// // // // //       <header className="bg-white shadow-sm border-b">
// // // // //         <div className="container mx-auto px-4 py-4">
// // // // //           <Button
// // // // //             variant="outline"
// // // // //             size="icon"
// // // // //             onClick={() => navigate(-1)}
// // // // //             className="mb-4"
// // // // //           >
// // // // //             <ArrowLeft className="h-4 w-4" />
// // // // //           </Button>
// // // // //           <h1 className="text-2xl font-bold text-gray-900">{course.title}</h1>
// // // // //           <p className="text-gray-600 mt-2">{course.description}</p>
// // // // //         </div>
// // // // //       </header>

// // // // //       <main className="container mx-auto px-4 py-8">
// // // // //         <div className="max-w-4xl mx-auto space-y-6">
// // // // //           {/* Progress Overview */}
// // // // //           <Card>
// // // // //             <CardHeader>
// // // // //               <CardTitle className="flex items-center space-x-2">
// // // // //                 <Trophy className="h-5 w-5" />
// // // // //                 <span>Course Progress</span>
// // // // //               </CardTitle>
// // // // //             </CardHeader>
// // // // //             <CardContent>
// // // // //               <div className="space-y-4">
// // // // //                 <div>
// // // // //                   <div className="flex justify-between text-sm text-gray-600 mb-2">
// // // // //                     <span>
// // // // //                       {completedModules} of {course.number_of_modules} modules
// // // // //                       completed
// // // // //                     </span>
// // // // //                     <span>{Math.round(progressPercentage)}%</span>
// // // // //                   </div>
// // // // //                   <Progress value={progressPercentage} className="h-2" />
// // // // //                 </div>

// // // // //                 {allModulesCompleted && (
// // // // //                   <div className="text-center">
// // // // //                     <Button
// // // // //                       onClick={finishCourse}
// // // // //                       size="lg"
// // // // //                       className="bg-green-600 hover:bg-green-700"
// // // // //                     >
// // // // //                       🎓 Finish Course & Get Certificate
// // // // //                     </Button>
// // // // //                   </div>
// // // // //                 )}
// // // // //               </div>
// // // // //             </CardContent>
// // // // //           </Card>

// // // // //           {/* Modules List */}
// // // // //           <div className="space-y-4">
// // // // //             <h2 className="text-xl font-semibold">Course Modules</h2>
// // // // //             {modules.map((module) => (
// // // // //               <Card
// // // // //                 key={module.id}
// // // // //                 className={`transition-all overflow-hidden ${
// // // // //                   module.completed
// // // // //                     ? "border-green-200 bg-green-50"
// // // // //                     : "hover:shadow-md"
// // // // //                 }`}
// // // // //               >
// // // // //                 <div
// // // // //                   className="p-6 cursor-pointer"
// // // // //                   onClick={() => toggleModule(module.id)}
// // // // //                 >
// // // // //                   <div className="flex items-start justify-between">
// // // // //                     <div className="flex items-start space-x-4">
// // // // //                       <button
// // // // //                         onClick={(e) => {
// // // // //                           e.stopPropagation();
// // // // //                           toggleModuleCompletion(module.id, module.completed);
// // // // //                         }}
// // // // //                         className="mt-1 transition-colors"
// // // // //                       >
// // // // //                         {module.completed ? (
// // // // //                           <CheckCircle2 className="h-6 w-6 text-green-600" />
// // // // //                         ) : (
// // // // //                           <Circle className="h-6 w-6 text-gray-400 hover:text-green-600" />
// // // // //                         )}
// // // // //                       </button>

// // // // //                       <div className="flex-1">
// // // // //                         <div className="flex items-center space-x-2 mb-2">
// // // // //                           <Badge variant="outline">
// // // // //                             Module {module.module_number}
// // // // //                           </Badge>
// // // // //                           {module.completed && (
// // // // //                             <Badge className="bg-green-100 text-green-800">
// // // // //                               Completed
// // // // //                             </Badge>
// // // // //                           )}
// // // // //                         </div>
// // // // //                         <h3 className="font-semibold text-lg mb-2">
// // // // //                           {module.title}
// // // // //                         </h3>
// // // // //                         {module.description && (
// // // // //                           <p className="text-gray-600">{module.description}</p>
// // // // //                         )}
// // // // //                       </div>
// // // // //                     </div>
// // // // //                     <div className="text-gray-400">
// // // // //                       {activeModuleId === module.id ? "▲" : "▼"}
// // // // //                     </div>
// // // // //                   </div>
// // // // //                 </div>

// // // // //                 {/* Module Content */}
// // // // //                 {activeModuleId === module.id && (
// // // // //                   <CardContent className="pt-0 border-t">
// // // // //                     <div className="mt-4">
// // // // //                       <h4 className="font-medium mb-4">Module Content</h4>

// // // // //                       {module.content.length > 0 ? (
// // // // //                         <div className="space-y-4">
// // // // //                           {module.content.map((content, index) => (
// // // // //                             <div key={index}>{renderContent(content)}</div>
// // // // //                           ))}
// // // // //                         </div>
// // // // //                       ) : (
// // // // //                         <div className="text-center py-6 text-gray-500">
// // // // //                           <p>No content available for this module.</p>
// // // // //                         </div>
// // // // //                       )}
// // // // //                     </div>
// // // // //                   </CardContent>
// // // // //                 )}
// // // // //               </Card>
// // // // //             ))}
// // // // //           </div>
// // // // //         </div>
// // // // //       </main>
// // // // //     </div>
// // // // //   );
// // // // // };

// // // // import { useState, useEffect } from "react";
// // // // import { useParams, useNavigate } from "react-router-dom";
// // // // import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// // // // import { Button } from "@/components/ui/button";
// // // // import { Badge } from "@/components/ui/badge";
// // // // import { Progress } from "@/components/ui/progress";
// // // // import {
// // // //   CheckCircle2,
// // // //   Circle,
// // // //   ArrowLeft,
// // // //   Trophy,
// // // //   BookOpen,
// // // //   FileText,
// // // //   Video,
// // // // } from "lucide-react";
// // // // import { supabase } from "@/integrations/supabase/client";
// // // // import { useToast } from "@/hooks/use-toast";
// // // // import Header from "@/footer/Header";
// // // // import Footer from "@/footer/Footer";

// // // // interface ContentData {
// // // //   type: "text" | "pdf" | "video";
// // // //   title: string;
// // // //   content?: string;
// // // //   file_url?: string;
// // // //   file_name?: string;
// // // // }

// // // // interface Module {
// // // //   id: string;
// // // //   title: string;
// // // //   description: string;
// // // //   module_number: number;
// // // //   completed: boolean;
// // // //   content: ContentData[];
// // // //   mcq_questions: any[];
// // // // }

// // // // interface Course {
// // // //   id: string;
// // // //   title: string;
// // // //   description: string;
// // // //   number_of_modules: number;
// // // // }

// // // // // Define type for database module row
// // // // interface ModuleRow {
// // // //   id: string;
// // // //   course_id: string;
// // // //   title: string;
// // // //   description: string | null;
// // // //   module_number: number;
// // // //   created_at: string;
// // // //   updated_at: string;
// // // //   content: string | null; // JSON string in database
// // // //   mcq_questions: string | null; // JSON string in database
// // // // }

// // // // export const CourseAccessPage = () => {
// // // //   const { courseId } = useParams();
// // // //   const navigate = useNavigate();
// // // //   const { toast } = useToast();
// // // //   const [course, setCourse] = useState<Course | null>(null);
// // // //   const [modules, setModules] = useState<Module[]>([]);
// // // //   const [isLoading, setIsLoading] = useState(true);
// // // //   const [completedModules, setCompletedModules] = useState(0);
// // // //   const [isEnrolled, setIsEnrolled] = useState(false);
// // // //   const [activeModuleId, setActiveModuleId] = useState<string | null>(null);

// // // //   useEffect(() => {
// // // //     if (courseId) {
// // // //       fetchCourseData();
// // // //       checkEnrollment();
// // // //     }
// // // //   }, [courseId]);

// // // //   const fetchCourseData = async () => {
// // // //     try {
// // // //       // Fetch course details
// // // //       const { data: courseData, error: courseError } = await supabase
// // // //         .from("courses")
// // // //         .select("*")
// // // //         .eq("id", courseId)
// // // //         .single();

// // // //       if (courseError) throw courseError;
// // // //       setCourse(courseData);

// // // //       // Fetch modules with content
// // // //       const { data: modulesData, error: modulesError } = await supabase
// // // //         .from("course_modules")
// // // //         .select("*")
// // // //         .eq("course_id", courseId)
// // // //         .order("module_number");

// // // //       if (modulesError) throw modulesError;

// // // //       // Get user progress
// // // //       const {
// // // //         data: { session },
// // // //       } = await supabase.auth.getSession();
// // // //       if (session) {
// // // //         const { data: progressData } = await supabase
// // // //           .from("user_module_progress")
// // // //           .select("module_id, completed")
// // // //           .eq("user_id", session.user.id)
// // // //           .eq("course_id", courseId);

// // // //         const progressMap = new Map(
// // // //           progressData?.map((p) => [p.module_id, p.completed]) || []
// // // //         );

// // // //         // Convert database rows to Module objects
// // // //         const modulesWithProgress: Module[] = (modulesData as ModuleRow[]).map(
// // // //           (moduleRow) => ({
// // // //             id: moduleRow.id,
// // // //             title: moduleRow.title,
// // // //             description: moduleRow.description || "",
// // // //             module_number: moduleRow.module_number,
// // // //             completed: progressMap.get(moduleRow.id) || false,
// // // //             content: moduleRow.content ? JSON.parse(moduleRow.content) : [],
// // // //             mcq_questions: moduleRow.mcq_questions
// // // //               ? JSON.parse(moduleRow.mcq_questions)
// // // //               : [],
// // // //           })
// // // //         );

// // // //         setModules(modulesWithProgress);
// // // //         setCompletedModules(
// // // //           modulesWithProgress.filter((m) => m.completed).length
// // // //         );
// // // //       }
// // // //     } catch (error) {
// // // //       console.error("Error fetching course data:", error);
// // // //       toast({
// // // //         title: "Error",
// // // //         description: "Failed to load course data",
// // // //         variant: "destructive",
// // // //       });
// // // //     } finally {
// // // //       setIsLoading(false);
// // // //     }
// // // //   };

// // // //   const checkEnrollment = async () => {
// // // //     try {
// // // //       const {
// // // //         data: { session },
// // // //       } = await supabase.auth.getSession();
// // // //       if (!session) return;

// // // //       const { data, error } = await supabase
// // // //         .from("course_enrollments")
// // // //         .select("id")
// // // //         .eq("user_id", session.user.id)
// // // //         .eq("course_id", courseId)
// // // //         .eq("payment_status", "paid");

// // // //       if (error) throw error;

// // // //       setIsEnrolled(!!data && data.length > 0);
// // // //     } catch (error) {
// // // //       console.error("Error checking enrollment:", error);
// // // //       toast({
// // // //         title: "Error",
// // // //         description: "Failed to check enrollment",
// // // //         variant: "destructive",
// // // //       });
// // // //     }
// // // //   };

// // // //   const toggleModuleCompletion = async (
// // // //     moduleId: string,
// // // //     currentStatus: boolean
// // // //   ) => {
// // // //     try {
// // // //       const {
// // // //         data: { session },
// // // //       } = await supabase.auth.getSession();
// // // //       if (!session) return;

// // // //       const newStatus = !currentStatus;

// // // //       await supabase.from("user_module_progress").upsert(
// // // //         {
// // // //           user_id: session.user.id,
// // // //           course_id: courseId!,
// // // //           module_id: moduleId,
// // // //           completed: newStatus,
// // // //           completed_at: newStatus ? new Date().toISOString() : null,
// // // //         },
// // // //         { onConflict: "user_id,module_id" }
// // // //       );

// // // //       // Update local state
// // // //       setModules((prev) =>
// // // //         prev.map((module) =>
// // // //           module.id === moduleId ? { ...module, completed: newStatus } : module
// // // //         )
// // // //       );

// // // //       setCompletedModules((prev) => (newStatus ? prev + 1 : prev - 1));

// // // //       toast({
// // // //         title: newStatus ? "Module Completed!" : "Module Marked Incomplete",
// // // //         description: newStatus
// // // //           ? "Great progress! Keep it up."
// // // //           : "Module marked as incomplete",
// // // //       });
// // // //     } catch (error) {
// // // //       console.error("Error updating module progress:", error);
// // // //       toast({
// // // //         title: "Error",
// // // //         description: "Failed to update progress",
// // // //         variant: "destructive",
// // // //       });
// // // //     }
// // // //   };

// // // //   const finishCourse = async () => {
// // // //     try {
// // // //       const {
// // // //         data: { session },
// // // //       } = await supabase.auth.getSession();
// // // //       if (!session) return;

// // // //       await supabase
// // // //         .from("course_enrollments")
// // // //         .update({
// // // //           completed: true,
// // // //           completion_date: new Date().toISOString(),
// // // //         })
// // // //         .eq("user_id", session.user.id)
// // // //         .eq("course_id", courseId);

// // // //       toast({
// // // //         title: "🎉 Congratulations!",
// // // //         description: "You have successfully completed the course!",
// // // //       });

// // // //       navigate("/e-learning?tab=enrolled");
// // // //     } catch (error) {
// // // //       console.error("Error finishing course:", error);
// // // //       toast({
// // // //         title: "Error",
// // // //         description: "Failed to complete course",
// // // //         variant: "destructive",
// // // //       });
// // // //     }
// // // //   };

// // // //   const toggleModule = (moduleId: string) => {
// // // //     setActiveModuleId(activeModuleId === moduleId ? null : moduleId);
// // // //   };

// // // //   const renderContent = (content: ContentData) => {
// // // //     switch (content.type) {
// // // //       case "text":
// // // //         return (
// // // //           <div className="mt-4 bg-gray-50 p-4 rounded-md">
// // // //             <div className="flex items-center mb-2">
// // // //               <FileText className="h-5 w-5 mr-2 text-blue-600" />
// // // //               <h4 className="font-medium">{content.title}</h4>
// // // //             </div>
// // // //             <div className="prose max-w-none">
// // // //               {content.content?.split("\n").map((paragraph, idx) => (
// // // //                 <p key={idx} className="mb-3">
// // // //                   {paragraph}
// // // //                 </p>
// // // //               ))}
// // // //             </div>
// // // //           </div>
// // // //         );
// // // //       case "pdf":
// // // //         return (
// // // //           <div className="mt-4 bg-gray-50 p-4 rounded-md">
// // // //             <div className="flex items-center mb-2">
// // // //               <FileText className="h-5 w-5 mr-2 text-red-600" />
// // // //               <h4 className="font-medium">{content.title}</h4>
// // // //             </div>
// // // //             {content.file_url ? (
// // // //               <div className="mt-2">
// // // //                 <a
// // // //                   href={content.file_url}
// // // //                   target="_blank"
// // // //                   rel="noopener noreferrer"
// // // //                   className="inline-flex items-center text-blue-600 hover:underline"
// // // //                 >
// // // //                   <FileText className="h-4 w-4 mr-1" />
// // // //                   {content.file_name || "View PDF"}
// // // //                 </a>
// // // //               </div>
// // // //             ) : (
// // // //               <p className="text-gray-500">PDF file not available</p>
// // // //             )}
// // // //           </div>
// // // //         );
// // // //       case "video":
// // // //         return (
// // // //           <div className="mt-4 bg-gray-50 p-4 rounded-md">
// // // //             <div className="flex items-center mb-2">
// // // //               <Video className="h-5 w-5 mr-2 text-purple-600" />
// // // //               <h4 className="font-medium">{content.title}</h4>
// // // //             </div>
// // // //             {content.file_url ? (
// // // //               <div className="mt-2 aspect-video bg-black rounded-lg overflow-hidden">
// // // //                 <video
// // // //                   src={content.file_url}
// // // //                   controls
// // // //                   className="w-full h-full object-contain"
// // // //                 />
// // // //               </div>
// // // //             ) : (
// // // //               <p className="text-gray-500">Video file not available</p>
// // // //             )}
// // // //           </div>
// // // //         );
// // // //       default:
// // // //         return null;
// // // //     }
// // // //   };

// // // //   if (isLoading) {
// // // //     return (
// // // //       <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center">
// // // //         <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
// // // //       </div>
// // // //     );
// // // //   }

// // // //   if (!isEnrolled) {
// // // //     return (
// // // //       <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center">
// // // //         <Card className="max-w-md">
// // // //           <CardContent className="text-center py-12">
// // // //             <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
// // // //             <h3 className="text-lg font-medium text-gray-900 mb-2">
// // // //               Course Access Required
// // // //             </h3>
// // // //             <p className="text-gray-600 mb-4">
// // // //               You need to enroll in this course to access the content.
// // // //             </p>
// // // //             <Button onClick={() => navigate(`/course/${courseId}`)}>
// // // //               Go to Course Details
// // // //             </Button>
// // // //           </CardContent>
// // // //         </Card>
// // // //       </div>
// // // //     );
// // // //   }

// // // //   if (!course) return null;

// // // //   const progressPercentage =
// // // //     course.number_of_modules > 0
// // // //       ? (completedModules / course.number_of_modules) * 100
// // // //       : 0;
// // // //   const allModulesCompleted =
// // // //     completedModules === course.number_of_modules &&
// // // //     course.number_of_modules > 0;

// // // //   return (
// // // //     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
// // // //       <Header/>
// // // //       <header className="bg-white shadow-sm border-b">
// // // //         <div className="container mx-auto px-4 py-4">
// // // //           {/* <Button
// // // //             variant="outline"
// // // //             size="icon"
// // // //             onClick={() => navigate(-1)}
// // // //             className="mb-4"
// // // //           >
// // // //             <ArrowLeft className="h-4 w-4" />
// // // //           </Button> */}
// // // //           <h1 className="text-2xl font-bold text-gray-900">{course.title}</h1>
// // // //           <p className="text-gray-600 mt-2">{course.description}</p>
// // // //         </div>
// // // //       </header>

// // // //       <main className="container mx-auto px-4 py-8">
// // // //         <div className="max-w-4xl mx-auto space-y-6">
// // // //           {/* Progress Overview */}
// // // //           <Card>
// // // //             <CardHeader>
// // // //               <CardTitle className="flex items-center space-x-2">
// // // //                 <Trophy className="h-5 w-5" />
// // // //                 <span>Course Progress</span>
// // // //               </CardTitle>
// // // //             </CardHeader>
// // // //             <CardContent>
// // // //               <div className="space-y-4">
// // // //                 <div>
// // // //                   <div className="flex justify-between text-sm text-gray-600 mb-2">
// // // //                     <span>
// // // //                       {completedModules} of {course.number_of_modules} modules
// // // //                       completed
// // // //                     </span>
// // // //                     <span>{Math.round(progressPercentage)}%</span>
// // // //                   </div>
// // // //                   <Progress value={progressPercentage} className="h-2" />
// // // //                 </div>

// // // //                 {allModulesCompleted && (
// // // //                   <div className="text-center">
// // // //                     <Button
// // // //                       onClick={finishCourse}
// // // //                       size="lg"
// // // //                       className="bg-green-600 hover:bg-green-700"
// // // //                     >
// // // //                       🎓 Finish Course & Get Certificate
// // // //                     </Button>
// // // //                   </div>
// // // //                 )}
// // // //               </div>
// // // //             </CardContent>
// // // //           </Card>

// // // //           {/* Modules List */}
// // // //           <div className="space-y-4">
// // // //             <h2 className="text-xl font-semibold">Course Modules</h2>
// // // //             {modules.map((module) => (
// // // //               <Card
// // // //                 key={module.id}
// // // //                 className={`transition-all overflow-hidden ${
// // // //                   module.completed
// // // //                     ? "border-green-200 bg-green-50"
// // // //                     : "hover:shadow-md"
// // // //                 }`}
// // // //               >
// // // //                 <div
// // // //                   className="p-6 cursor-pointer"
// // // //                   onClick={() => toggleModule(module.id)}
// // // //                 >
// // // //                   <div className="flex items-start justify-between">
// // // //                     <div className="flex items-start space-x-4">
// // // //                       <button
// // // //                         onClick={(e) => {
// // // //                           e.stopPropagation();
// // // //                           toggleModuleCompletion(module.id, module.completed);
// // // //                         }}
// // // //                         className="mt-1 transition-colors"
// // // //                       >
// // // //                         {module.completed ? (
// // // //                           <CheckCircle2 className="h-6 w-6 text-green-600" />
// // // //                         ) : (
// // // //                           <Circle className="h-6 w-6 text-gray-400 hover:text-green-600" />
// // // //                         )}
// // // //                       </button>

// // // //                       <div className="flex-1">
// // // //                         <div className="flex items-center space-x-2 mb-2">
// // // //                           <Badge variant="outline">
// // // //                             Module {module.module_number}
// // // //                           </Badge>
// // // //                           {module.completed && (
// // // //                             <Badge className="bg-green-100 text-green-800">
// // // //                               Completed
// // // //                             </Badge>
// // // //                           )}
// // // //                         </div>
// // // //                         <h3 className="font-semibold text-lg mb-2">
// // // //                           {module.title}
// // // //                         </h3>
// // // //                         {module.description && (
// // // //                           <p className="text-gray-600">{module.description}</p>
// // // //                         )}
// // // //                       </div>
// // // //                     </div>
// // // //                     <div className="text-gray-400">
// // // //                       {activeModuleId === module.id ? "▲" : "▼"}
// // // //                     </div>
// // // //                   </div>
// // // //                 </div>

// // // //                 {/* Module Content */}
// // // //                 {activeModuleId === module.id && (
// // // //                   <CardContent className="pt-0 border-t">
// // // //                     <div className="mt-4">
// // // //                       <h4 className="font-medium mb-4">Module Content</h4>

// // // //                       {module.content.length > 0 ? (
// // // //                         <div className="space-y-4">
// // // //                           {module.content.map((content, index) => (
// // // //                             <div key={index}>{renderContent(content)}</div>
// // // //                           ))}
// // // //                         </div>
// // // //                       ) : (
// // // //                         <div className="text-center py-6 text-gray-500">
// // // //                           <p>No content available for this module.</p>
// // // //                         </div>
// // // //                       )}
// // // //                     </div>
// // // //                   </CardContent>
// // // //                 )}
// // // //               </Card>
// // // //             ))}
// // // //           </div>
// // // //         </div>
// // // //       </main>
// // // //       <Footer/>
// // // //     </div>
// // // //   );
// // // // };

// // // import { useState, useEffect } from "react";
// // // import { useParams, useNavigate } from "react-router-dom";
// // // import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// // // import { Button } from "@/components/ui/button";
// // // import { Badge } from "@/components/ui/badge";
// // // import { Progress } from "@/components/ui/progress";
// // // import {
// // //   CheckCircle2,
// // //   Circle,
// // //   ArrowLeft,
// // //   Trophy,
// // //   BookOpen,
// // //   FileText,
// // //   Video,
// // //   ChevronDown,
// // //   ChevronUp,
// // // } from "lucide-react";
// // // import { supabase } from "@/integrations/supabase/client";
// // // import { useToast } from "@/hooks/use-toast";
// // // import Header from "@/footer/Header";
// // // import Footer from "@/footer/Footer";

// // // interface ContentData {
// // //   type: "text" | "pdf" | "video";
// // //   title: string;
// // //   content?: string;
// // //   file_url?: string;
// // //   file_name?: string;
// // //   url?: string; // ✅ Add this if you're accessing content.url
// // //   file_size?: number;
// // // }

// // // interface Module {
// // //   id: string;
// // //   title: string;
// // //   description: string;
// // //   module_number: number;
// // //   completed: boolean;
// // //   content: ContentData[];
// // //   mcq_questions: any[];
// // // }

// // // interface Course {
// // //   id: string;
// // //   title: string;
// // //   description: string;
// // //   number_of_modules: number;
// // // }

// // // interface ModuleRow {
// // //   id: string;
// // //   course_id: string;
// // //   title: string;
// // //   description: string | null;
// // //   module_number: number;
// // //   created_at: string;
// // //   updated_at: string;
// // //   content: string | null;
// // //   mcq_questions: string | null;
// // // }

// // // export const CourseAccessPage = () => {
// // //   const { courseId } = useParams();
// // //   const navigate = useNavigate();
// // //   const { toast } = useToast();
// // //   const [course, setCourse] = useState<Course | null>(null);
// // //   const [modules, setModules] = useState<Module[]>([]);
// // //   const [isLoading, setIsLoading] = useState(true);
// // //   const [completedModules, setCompletedModules] = useState(0);
// // //   const [isEnrolled, setIsEnrolled] = useState(false);
// // //   const [activeModuleId, setActiveModuleId] = useState<string | null>(null);

// // //   useEffect(() => {
// // //     if (courseId) {
// // //       fetchCourseData();
// // //       checkEnrollment();
// // //     }
// // //   }, [courseId]);

// // //   const fetchCourseData = async () => {
// // //     try {
// // //       // Fetch course details
// // //       const { data: courseData, error: courseError } = await supabase
// // //         .from("courses")
// // //         .select("*")
// // //         .eq("id", courseId)
// // //         .single();

// // //       if (courseError) throw courseError;
// // //       setCourse(courseData);

// // //       // Fetch modules
// // //       const { data: modulesData, error: modulesError } = await supabase
// // //         .from("course_modules")
// // //         .select("*")
// // //         .eq("course_id", courseId)
// // //         .order("module_number");

// // //       if (modulesError) throw modulesError;

// // //       // Get user progress
// // //       const {
// // //         data: { session },
// // //       } = await supabase.auth.getSession();
// // //       if (session) {
// // //         const { data: progressData } = await supabase
// // //           .from("user_module_progress")
// // //           .select("module_id, completed")
// // //           .eq("user_id", session.user.id)
// // //           .eq("course_id", courseId);

// // //         const progressMap = new Map(
// // //           progressData?.map((p) => [p.module_id, p.completed]) || []
// // //         );

// // //         // Convert database rows to Module objects
// // //         const modulesWithProgress: Module[] = (modulesData as ModuleRow[]).map(
// // //           (moduleRow) => ({
// // //             id: moduleRow.id,
// // //             title: moduleRow.title,
// // //             description: moduleRow.description || "",
// // //             module_number: moduleRow.module_number,
// // //             completed: progressMap.get(moduleRow.id) || false,
// // //             content: moduleRow.content ? JSON.parse(moduleRow.content) : [],
// // //             mcq_questions: moduleRow.mcq_questions
// // //               ? JSON.parse(moduleRow.mcq_questions)
// // //               : [],
// // //           })
// // //         );
// // //         console.log("Fetched modules:", modulesWithProgress);
// // //         modulesWithProgress.forEach((module, index) => {
// // //           console.log(
// // //             `Module ${index + 1} content length:`,
// // //             module.content.length
// // //           );
// // //           console.log(
// // //             `Module ${index + 1} content type:`,
// // //             Array.isArray(module.content) ? "array" : typeof module.content
// // //           );
// // //         });

// // //         setModules(modulesWithProgress);
// // //         setCompletedModules(
// // //           modulesWithProgress.filter((m) => m.completed).length
// // //         );
// // //       }
// // //     } catch (error) {
// // //       console.error("Error fetching course data:", error);
// // //       toast({
// // //         title: "Error",
// // //         description: "Failed to load course data",
// // //         variant: "destructive",
// // //       });
// // //     } finally {
// // //       setIsLoading(false);
// // //     }
// // //   };

// // //   const checkEnrollment = async () => {
// // //     try {
// // //       const {
// // //         data: { session },
// // //       } = await supabase.auth.getSession();
// // //       if (!session) return;

// // //       const { data, error } = await supabase
// // //         .from("course_enrollments")
// // //         .select("id")
// // //         .eq("user_id", session.user.id)
// // //         .eq("course_id", courseId)
// // //         .eq("payment_status", "paid");

// // //       if (error) throw error;
// // //       console.log("kkkkkkkkkkk",data)
// // //       console.log("llllll",data.length)

// // //       setIsEnrolled(!!data && data.length > 0);
// // //     } catch (error) {
// // //       console.error("Error checking enrollment:", error);
// // //       toast({
// // //         title: "Error",
// // //         description: "Failed to check enrollment",
// // //         variant: "destructive",
// // //       });
// // //     }
// // //   };

// // //   const toggleModuleCompletion = async (
// // //     moduleId: string,
// // //     currentStatus: boolean
// // //   ) => {
// // //     try {
// // //       console.log("gggggggggggg",moduleId)
// // //       console.log("hhhhhhhhhhh",currentStatus)
// // //       const {
// // //         data: { session },
// // //       } = await supabase.auth.getSession();
// // //       if (!session) return;

// // //       const newStatus = !currentStatus;

// // //       await supabase.from("user_module_progress").upsert(
// // //         {
// // //           user_id: session.user.id,
// // //           course_id: courseId!,
// // //           module_id: moduleId,
// // //           completed: newStatus,
// // //           completed_at: newStatus ? new Date().toISOString() : null,
// // //         },
// // //         { onConflict: "user_id,module_id" }
// // //       );

// // //       // Update local state
// // //       // console.log("ffffffffffffff", module.id);

// // //       setModules((prev) =>
// // //         prev.map((module) =>
// // //           module.id === moduleId ? { ...module, completed: newStatus } : module
// // //         )
// // //       );

// // //       setCompletedModules((prev) => (newStatus ? prev + 1 : prev - 1));

// // //       toast({
// // //         title: newStatus ? "Module Completed!" : "Module Marked Incomplete",
// // //         description: newStatus
// // //           ? "Great progress! Keep it up."
// // //           : "Module marked as incomplete",
// // //       });
// // //     } catch (error) {
// // //       console.error("Error updating module progress:", error);
// // //       toast({
// // //         title: "Error",
// // //         description: "Failed to update progress",
// // //         variant: "destructive",
// // //       });
// // //     }
// // //   };

// // //   const finishCourse = async () => {
// // //     try {
// // //       const {
// // //         data: { session },
// // //       } = await supabase.auth.getSession();
// // //       if (!session) return;

// // //       await supabase
// // //         .from("course_enrollments")
// // //         .update({
// // //           completed: true,
// // //           completion_date: new Date().toISOString(),
// // //         })
// // //         .eq("user_id", session.user.id)
// // //         .eq("course_id", courseId);

// // //       toast({
// // //         title: "🎉 Congratulations!",
// // //         description: "You have successfully completed the course!",
// // //       });

// // //       navigate("/e-learning?tab=enrolled");
// // //     } catch (error) {
// // //       console.error("Error finishing course:", error);
// // //       toast({
// // //         title: "Error",
// // //         description: "Failed to complete course",
// // //         variant: "destructive",
// // //       });
// // //     }
// // //   };

// // //   const toggleModule = (moduleId: string) => {
// // //     setActiveModuleId(activeModuleId === moduleId ? null : moduleId);
// // //     const module = modules.find((m) => m.id === moduleId);
// // //     if (module) {
// // //       console.log("Toggled module content:", module.content);
// // //       console.log("Module content length:", module.content.length);
// // //       console.log(
// // //         "Module content type:",
// // //         Array.isArray(module.content) ? "array" : typeof module.content
// // //       );
// // //     }
// // //   };

// // //   // console.log("rrrrrrrrrr");
// // //   const renderContent = (content: ContentData) => {
// // //     console.log("Rendering content:", content);
// // //     console.log("xxxxxxxxxxxxx", content);
// // //     switch (content.type) {
// // //       case "text":
// // //         return (
// // //           <div className="mt-4 bg-gray-50 p-4 rounded-md">
// // //             <div className="flex items-center mb-2">
// // //               <FileText className="h-5 w-5 mr-2 text-blue-600" />
// // //               <h4 className="font-medium">{content.title}</h4>
// // //             </div>
// // //             <div className="prose max-w-none">
// // //               {content.content?.split("\n").map((paragraph, idx) => (
// // //                 <p key={idx} className="mb-3">
// // //                   {paragraph}
// // //                 </p>
// // //               ))}
// // //             </div>
// // //           </div>
// // //         );
// // //       case "pdf":
// // //         return (
// // //           <div className="mt-4 bg-gray-50 p-4 rounded-md">
// // //             <div className="flex items-center mb-2">
// // //               <FileText className="h-5 w-5 mr-2 text-red-600" />
// // //               <h4 className="font-medium">{content.title}</h4>
// // //             </div>
// // //             {content.file_url ? (
// // //               <div className="mt-2">
// // //                 <a
// // //                   href={content.file_url}
// // //                   target="_blank"
// // //                   rel="noopener noreferrer"
// // //                   className="inline-flex items-center text-blue-600 hover:underline"
// // //                 >
// // //                   <FileText className="h-4 w-4 mr-1" />
// // //                   {content.file_name || "View PDF"}
// // //                 </a>
// // //               </div>
// // //             ) : (
// // //               <p className="text-gray-500">PDF file not available</p>
// // //             )}
// // //           </div>
// // //         );
// // //       case "video":
// // //         return (
// // //           <div className="mt-4 bg-gray-50 p-4 rounded-md">
// // //             <div className="flex items-center mb-2">
// // //               <Video className="h-5 w-5 mr-2 text-purple-600" />
// // //               <h4 className="font-medium">{content.title}</h4>
// // //             </div>
// // //             {content.file_url ? (
// // //               <div className="mt-2 aspect-video bg-black rounded-lg overflow-hidden">
// // //                 <video
// // //                   src={content.file_url}
// // //                   controls
// // //                   className="w-full h-full object-contain"
// // //                 />
// // //               </div>
// // //             ) : (
// // //               <p className="text-gray-500">Video file not available</p>
// // //             )}
// // //           </div>
// // //         );
// // //       default:
// // //         return null;
// // //     }
// // //   };

// // //   if (isLoading) {
// // //     return (
// // //       <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center">
// // //         <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
// // //       </div>
// // //     );
// // //   }

// // //   if (!isEnrolled) {
// // //     return (
// // //       <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center">
// // //         <Card className="max-w-md">
// // //           <CardContent className="text-center py-12">
// // //             <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
// // //             <h3 className="text-lg font-medium text-gray-900 mb-2">
// // //               Course Access Required
// // //             </h3>
// // //             <p className="text-gray-600 mb-4">
// // //               You need to enroll in this course to access the content.
// // //             </p>
// // //             <Button onClick={() => navigate(`/course/${courseId}`)}>
// // //               Go to Course Details
// // //             </Button>
// // //           </CardContent>
// // //         </Card>
// // //       </div>
// // //     );
// // //   }

// // //   if (!course) return null;

// // //   const progressPercentage =
// // //     course.number_of_modules > 0
// // //       ? (completedModules / course.number_of_modules) * 100
// // //       : 0;
// // //   const allModulesCompleted =
// // //     completedModules === course.number_of_modules &&
// // //     course.number_of_modules > 0;

// // //   return (
// // //     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
// // //       <Header />
// // //       <header className="bg-white shadow-sm border-b">
// // //         <div className="container mx-auto px-4 py-4">
// // //           <Button
// // //             variant="outline"
// // //             onClick={() => navigate(-1)}
// // //             className="mb-4"
// // //           >
// // //             <ArrowLeft className="h-4 w-4 mr-2" />
// // //             Back
// // //           </Button>
// // //           <h1 className="text-2xl font-bold text-gray-900">{course.title}</h1>
// // //           <p className="text-gray-600 mt-2">{course.description}</p>
// // //         </div>
// // //       </header>

// // //       <main className="container mx-auto px-4 py-8">
// // //         <div className="max-w-4xl mx-auto space-y-6">
// // //           {/* Progress Overview */}
// // //           <Card>
// // //             <CardHeader>
// // //               <CardTitle className="flex items-center space-x-2">
// // //                 <Trophy className="h-5 w-5" />
// // //                 <span>Course Progress</span>
// // //               </CardTitle>
// // //             </CardHeader>
// // //             <CardContent>
// // //               <div className="space-y-4">
// // //                 <div>
// // //                   <div className="flex justify-between text-sm text-gray-600 mb-2">
// // //                     <span>
// // //                       {completedModules} of {course.number_of_modules} modules
// // //                       completed
// // //                     </span>
// // //                     <span>{Math.round(progressPercentage)}%</span>
// // //                   </div>
// // //                   <Progress value={progressPercentage} className="h-2" />
// // //                 </div>

// // //                 {allModulesCompleted && (
// // //                   <div className="text-center">
// // //                     <Button
// // //                       onClick={finishCourse}
// // //                       size="lg"
// // //                       className="bg-green-600 hover:bg-green-700"
// // //                     >
// // //                       🎓 Finish Course & Get Certificate
// // //                     </Button>
// // //                   </div>
// // //                 )}
// // //               </div>
// // //             </CardContent>
// // //           </Card>

// // //           {/* Guide Section */}
// // //           <Card>
// // //             <CardHeader>
// // //               <CardTitle>Guide</CardTitle>
// // //             </CardHeader>
// // //             <CardContent>
// // //               <div className="space-y-4">
// // //                 <h3 className="font-semibold">Course Modules</h3>
// // //                 <div className="space-y-3">
// // //                   {modules.map((module) => (
// // //                     <div
// // //                       key={module.id}
// // //                       className="border-b pb-3 last:border-0"
// // //                     >
// // //                       <div className="flex items-center">
// // //                         {module.completed ? (
// // //                           <CheckCircle2 className="h-4 w-4 text-green-600 mr-2" />
// // //                         ) : (
// // //                           <Circle className="h-4 w-4 text-gray-400 mr-2" />
// // //                         )}
// // //                         <span className="font-medium">
// // //                           Module {module.module_number}: {module.title}
// // //                         </span>
// // //                       </div>

// // //                       {module.content.length > 0 ? (
// // //                         <ul className="mt-2 ml-6 space-y-1">
// // //                           {module.content.map((content, idx) => (
// // //                             <li key={idx} className="text-gray-700">
// // //                               {content.title}
// // //                             </li>
// // //                           ))}
// // //                         </ul>
// // //                       ) : (
// // //                         <p className="mt-2 ml-6 text-gray-500 text-sm">
// // //                           No content available for this module.
// // //                         </p>
// // //                       )}
// // //                     </div>
// // //                   ))}
// // //                 </div>
// // //               </div>
// // //             </CardContent>
// // //           </Card>

// // //           {/* Modules List */}
// // //           <div className="space-y-4">
// // //             <h2 className="text-xl font-semibold">Detailed Modules</h2>
// // //             {modules.map((module) => (
// // //               <Card
// // //                 key={module.id}
// // //                 className={`transition-all overflow-hidden ${
// // //                   module.completed
// // //                     ? "border-green-200 bg-green-50"
// // //                     : "hover:shadow-md"
// // //                 }`}
// // //               >
// // //                 <div
// // //                   className="p-6 cursor-pointer"
// // //                   onClick={() => toggleModule(module.id)}
// // //                 >
// // //                   <div className="flex items-start justify-between">
// // //                     <div className="flex items-start space-x-4">
// // //                       <button
// // //                         onClick={(e) => {
// // //                           e.stopPropagation();
// // //                           toggleModuleCompletion(module.id, module.completed);
// // //                         }}
// // //                         className="mt-1 transition-colors"
// // //                       >
// // //                         {module.completed ? (
// // //                           <CheckCircle2 className="h-6 w-6 text-green-600" />
// // //                         ) : (
// // //                           <Circle className="h-6 w-6 text-gray-400 hover:text-green-600" />
// // //                         )}
// // //                       </button>

// // //                       <div className="flex-1">
// // //                         <div className="flex items-center space-x-2 mb-2">
// // //                           <Badge variant="outline">
// // //                             Module {module.module_number}
// // //                           </Badge>
// // //                           {module.completed && (
// // //                             <Badge className="bg-green-100 text-green-800">
// // //                               Completed
// // //                             </Badge>
// // //                           )}
// // //                         </div>
// // //                         <h3 className="font-semibold text-lg mb-2">
// // //                           {module.title}
// // //                         </h3>
// // //                         {module.description && (
// // //                           <p className="text-gray-600">{module.description}</p>
// // //                         )}
// // //                       </div>
// // //                     </div>
// // //                     <div className="text-gray-400">
// // //                       {activeModuleId === module.id ? (
// // //                         <ChevronUp className="h-5 w-5" />
// // //                       ) : (
// // //                         <ChevronDown className="h-5 w-5" />
// // //                       )}
// // //                     </div>
// // //                   </div>
// // //                 </div>

// // //                 {/* Module Content */}
// // //                 {activeModuleId === module.id && (
// // //                   <CardContent className="pt-0 border-t">
// // //                     <div className="mt-4">
// // //                       <h4 className="font-medium mb-4">Module Content</h4>

// // //                       {module.content.length > 0 ? (
// // //                         <div className="space-y-4">
// // //                           {module.content.map((content, index) => (
// // //                             <div key={index}>{renderContent(content)}</div>
// // //                           ))}
// // //                         </div>
// // //                       ) : (
// // //                         <div className="text-center py-6 text-gray-500">
// // //                           <p>No content available for this module.</p>
// // //                         </div>
// // //                       )}
// // //                     </div>
// // //                   </CardContent>
// // //                 )}
// // //               </Card>
// // //             ))}
// // //           </div>
// // //         </div>
// // //       </main>
// // //       <Footer />
// // //     </div>
// // //   );
// // // };

// // import { useState, useEffect } from "react";
// // import { useParams, useNavigate } from "react-router-dom";
// // import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// // import { Button } from "@/components/ui/button";
// // import { Badge } from "@/components/ui/badge";
// // import { Progress } from "@/components/ui/progress";
// // import {
// //   CheckCircle2,
// //   Circle,
// //   ArrowLeft,
// //   Trophy,
// //   BookOpen,
// //   FileText,
// //   Video,
// //   ChevronDown,
// //   ChevronUp,
// // } from "lucide-react";
// // import { supabase } from "@/integrations/supabase/client";
// // import { useToast } from "@/hooks/use-toast";
// // import Header from "@/footer/Header";
// // import Footer from "@/footer/Footer";

// // interface ContentData {
// //   id: string;
// //   module_id: string;
// //   content_type: "text" | "pdf" | "video";
// //   content_title: string;
// //   content_text?: string;
// //   content_url?: string;
// //   file_size?: number;
// //   created_at: string;
// // }

// // interface Module {
// //   id: string;
// //   title: string;
// //   description: string | null;
// //   module_number: number;
// //   completed: boolean;
// //   content: ContentData[];
// //   mcq_questions: any[];
// // }

// // interface Course {
// //   id: string;
// //   title: string;
// //   description: string;
// //   number_of_modules: number;
// // }

// // export const CourseAccessPage = () => {
// //   const { courseId } = useParams<{ courseId: string }>();
// //   const navigate = useNavigate();
// //   const { toast } = useToast();
// //   const [course, setCourse] = useState<Course | null>(null);
// //   const [modules, setModules] = useState<Module[]>([]);
// //   const [isLoading, setIsLoading] = useState(true);
// //   const [completedModules, setCompletedModules] = useState(0);
// //   const [isEnrolled, setIsEnrolled] = useState(false);
// //   const [activeModuleId, setActiveModuleId] = useState<string | null>(null);

// //   useEffect(() => {
// //     if (courseId) {
// //       fetchCourseData();
// //       checkEnrollment();
// //     }
// //   }, [courseId]);

// //   const fetchCourseData = async () => {
// //     try {
// //       // Fetch course details
// //       const { data: courseData, error: courseError } = await supabase
// //         .from("courses")
// //         .select("*")
// //         .eq("id", courseId)
// //         .single();

// //       if (courseError) throw courseError;
// //       setCourse(courseData);

// //       // Fetch modules
// //       const { data: modulesData, error: modulesError } = await supabase
// //         .from("course_modules")
// //         .select("*")
// //         .eq("course_id", courseId)
// //         .order("module_number");

// //       if (modulesError) throw modulesError;

// //       // Get user progress
// //       const {
// //         data: { session },
// //       } = await supabase.auth.getSession();

// //       if (session && modulesData) {
// //         // Fetch user progress
// //         const { data: progressData } = await supabase
// //           .from("user_module_progress")
// //           .select("module_id, completed")
// //           .eq("user_id", session.user.id)
// //           .eq("course_id", courseId);

// //         const progressMap = new Map(
// //           progressData?.map((p) => [p.module_id, p.completed]) || []
// //         );

// //         // Fetch content for each module
// //         const modulesWithContent = await Promise.all(
// //           modulesData.map(async (module) => {
// //             // Fetch content from module_content table
// //             const { data: contentData, error: contentError } = await supabase
// //               .from("module_content")
// //               .select("*")
// //               .eq("module_id", module.id)
// //               .order("created_at");

// //             if (contentError) {
// //               console.error(
// //                 `Error fetching content for module ${module.id}:`,
// //                 contentError
// //               );
// //               return {
// //                 ...module,
// //                 completed: progressMap.get(module.id) || false,
// //                 content: [],
// //                 mcq_questions: [],
// //               };
// //             }

// //             return {
// //               ...module,
// //               completed: progressMap.get(module.id) || false,
// //               content: contentData || [],
// //               mcq_questions: module.mcq_questions
// //                 ? JSON.parse(module.mcq_questions)
// //                 : [],
// //             };
// //           })
// //         );

// //         setModules(modulesWithContent);
// //         setCompletedModules(
// //           modulesWithContent.filter((m) => m.completed).length
// //         );
// //       }
// //     } catch (error) {
// //       console.error("Error fetching course data:", error);
// //       toast({
// //         title: "Error",
// //         description: "Failed to load course data",
// //         variant: "destructive",
// //       });
// //     } finally {
// //       setIsLoading(false);
// //     }
// //   };

// //   const checkEnrollment = async () => {
// //     try {
// //       const {
// //         data: { session },
// //       } = await supabase.auth.getSession();
// //       if (!session) return;

// //       const { data, error } = await supabase
// //         .from("course_enrollments")
// //         .select("id")
// //         .eq("user_id", session.user.id)
// //         .eq("course_id", courseId)
// //         .eq("payment_status", "paid");

// //       if (error) throw error;

// //       setIsEnrolled(!!data && data.length > 0);
// //     } catch (error) {
// //       console.error("Error checking enrollment:", error);
// //       toast({
// //         title: "Error",
// //         description: "Failed to check enrollment",
// //         variant: "destructive",
// //       });
// //     }
// //   };

// //   const toggleModuleCompletion = async (
// //     moduleId: string,
// //     currentStatus: boolean
// //   ) => {
// //     try {
// //       const {
// //         data: { session },
// //       } = await supabase.auth.getSession();
// //       if (!session) return;

// //       const newStatus = !currentStatus;

// //       await supabase.from("user_module_progress").upsert(
// //         {
// //           user_id: session.user.id,
// //           course_id: courseId!,
// //           module_id: moduleId,
// //           completed: newStatus,
// //           completed_at: newStatus ? new Date().toISOString() : null,
// //         },
// //         { onConflict: "user_id, module_id" }
// //       );

// //       // Update local state
// //       setModules((prev) =>
// //         prev.map((module) =>
// //           module.id === moduleId ? { ...module, completed: newStatus } : module
// //         )
// //       );

// //       setCompletedModules((prev) => (newStatus ? prev + 1 : prev - 1));

// //       toast({
// //         title: newStatus ? "Module Completed!" : "Module Marked Incomplete",
// //         description: newStatus
// //           ? "Great progress! Keep it up."
// //           : "Module marked as incomplete",
// //       });
// //     } catch (error) {
// //       console.error("Error updating module progress:", error);
// //       toast({
// //         title: "Error",
// //         description: "Failed to update progress",
// //         variant: "destructive",
// //       });
// //     }
// //   };

// //   const finishCourse = async () => {
// //     try {
// //       const {
// //         data: { session },
// //       } = await supabase.auth.getSession();
// //       if (!session) return;

// //       await supabase
// //         .from("course_enrollments")
// //         .update({
// //           completed: true,
// //           completion_date: new Date().toISOString(),
// //         })
// //         .eq("user_id", session.user.id)
// //         .eq("course_id", courseId);

// //       toast({
// //         title: "🎉 Congratulations!",
// //         description: "You have successfully completed the course!",
// //       });

// //       navigate("/e-learning?tab=enrolled");
// //     } catch (error) {
// //       console.error("Error finishing course:", error);
// //       toast({
// //         title: "Error",
// //         description: "Failed to complete course",
// //         variant: "destructive",
// //       });
// //     }
// //   };

// //   const toggleModule = (moduleId: string) => {
// //     setActiveModuleId(activeModuleId === moduleId ? null : moduleId);
// //   };

// //   const renderContent = (content: ContentData) => {
// //     switch (content.content_type) {
// //       case "text":
// //         return (
// //           <div className="mt-4 bg-gray-50 p-4 rounded-md">
// //             <div className="flex items-center mb-2">
// //               <FileText className="h-5 w-5 mr-2 text-blue-600" />
// //               <h4 className="font-medium">{content.content_title}</h4>
// //             </div>
// //             <div className="prose max-w-none">
// //               {content.content_text?.split("\n").map((paragraph, idx) => (
// //                 <p key={idx} className="mb-3">
// //                   {paragraph}
// //                 </p>
// //               ))}
// //             </div>
// //           </div>
// //         );
// //       case "pdf":
// //         return (
// //           <div className="mt-4 bg-gray-50 p-4 rounded-md">
// //             <div className="flex items-center mb-2">
// //               <FileText className="h-5 w-5 mr-2 text-red-600" />
// //               <h4 className="font-medium">{content.content_title}</h4>
// //             </div>
// //             {content.content_url ? (
// //               <div className="mt-2">
// //                 <a
// //                   href={content.content_url}
// //                   target="_blank"
// //                   rel="noopener noreferrer"
// //                   className="inline-flex items-center text-blue-600 hover:underline"
// //                 >
// //                   <FileText className="h-4 w-4 mr-1" />
// //                   {content.content_title || "View PDF"}
// //                 </a>
// //                 {content.file_size && (
// //                   <p className="text-xs text-gray-500 mt-1">
// //                     File size: {Math.round(content.file_size / 1024)} KB
// //                   </p>
// //                 )}
// //               </div>
// //             ) : (
// //               <p className="text-gray-500">PDF file not available</p>
// //             )}
// //           </div>
// //         );
// //       case "video":
// //         return (
// //           <div className="mt-4 bg-gray-50 p-4 rounded-md">
// //             <div className="flex items-center mb-2">
// //               <Video className="h-5 w-5 mr-2 text-purple-600" />
// //               <h4 className="font-medium">{content.content_title}</h4>
// //             </div>
// //             {content.content_url ? (
// //               <>
// //                 <div className="mt-2 aspect-video bg-black rounded-lg overflow-hidden">
// //                   <video
// //                     src={content.content_url}
// //                     controls
// //                     className="w-full h-full object-contain"
// //                   />
// //                 </div>
// //                 {content.file_size && (
// //                   <p className="text-xs text-gray-500 mt-1">
// //                     File size: {Math.round(content.file_size / 1024)} KB
// //                   </p>
// //                 )}
// //               </>
// //             ) : (
// //               <p className="text-gray-500">Video file not available</p>
// //             )}
// //           </div>
// //         );
// //       default:
// //         return (
// //           <div className="mt-4 bg-gray-50 p-4 rounded-md">
// //             <div className="flex items-center mb-2">
// //               <FileText className="h-5 w-5 mr-2 text-gray-600" />
// //               <h4 className="font-medium">{content.content_title}</h4>
// //             </div>
// //             <p className="text-gray-500">Unsupported content type</p>
// //           </div>
// //         );
// //     }
// //   };

// //   if (isLoading) {
// //     return (
// //       <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center">
// //         <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
// //       </div>
// //     );
// //   }

// //   if (!isEnrolled) {
// //     return (
// //       <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center">
// //         <Card className="max-w-md">
// //           <CardContent className="text-center py-12">
// //             <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
// //             <h3 className="text-lg font-medium text-gray-900 mb-2">
// //               Course Access Required
// //             </h3>
// //             <p className="text-gray-600 mb-4">
// //               You need to enroll in this course to access the content.
// //             </p>
// //             <Button onClick={() => navigate(`/course/${courseId}`)}>
// //               Go to Course Details
// //             </Button>
// //           </CardContent>
// //         </Card>
// //       </div>
// //     );
// //   }

// //   if (!course) {
// //     return (
// //       <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center">
// //         <Card className="max-w-md">
// //           <CardContent className="text-center py-12">
// //             <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
// //             <h3 className="text-lg font-medium text-gray-900 mb-2">
// //               Course Not Found
// //             </h3>
// //             <p className="text-gray-600 mb-4">
// //               The requested course could not be loaded.
// //             </p>
// //             <Button onClick={() => navigate("/e-learning")}>
// //               Back to Courses
// //             </Button>
// //           </CardContent>
// //         </Card>
// //       </div>
// //     );
// //   }

// //   const progressPercentage =
// //     course.number_of_modules > 0
// //       ? Math.round((completedModules / course.number_of_modules) * 100)
// //       : 0;
// //   const allModulesCompleted =
// //     completedModules === course.number_of_modules &&
// //     course.number_of_modules > 0;

// //   return (
// //     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
// //       <Header />
// //       <header className="bg-white shadow-sm border-b">
// //         <div className="container mx-auto px-4 py-4">
// //           <Button
// //             variant="outline"
// //             onClick={() => navigate(-1)}
// //             className="mb-4"
// //           >
// //             <ArrowLeft className="h-4 w-4 mr-2" />
// //             Back
// //           </Button>
// //           <h1 className="text-2xl font-bold text-gray-900">{course.title}</h1>
// //           <p className="text-gray-600 mt-2">{course.description}</p>
// //         </div>
// //       </header>

// //       <main className="container mx-auto px-4 py-8">
// //         <div className="max-w-4xl mx-auto space-y-6">
// //           {/* Progress Overview */}
// //           <Card>
// //             <CardHeader>
// //               <CardTitle className="flex items-center space-x-2">
// //                 <Trophy className="h-5 w-5" />
// //                 <span>Course Progress</span>
// //               </CardTitle>
// //             </CardHeader>
// //             <CardContent>
// //               <div className="space-y-4">
// //                 <div>
// //                   <div className="flex justify-between text-sm text-gray-600 mb-2">
// //                     <span>
// //                       {completedModules} of {course.number_of_modules} modules
// //                       completed
// //                     </span>
// //                     <span>{progressPercentage}%</span>
// //                   </div>
// //                   <Progress value={progressPercentage} className="h-2" />
// //                 </div>

// //                 {allModulesCompleted && (
// //                   <div className="text-center">
// //                     <Button
// //                       onClick={finishCourse}
// //                       size="lg"
// //                       className="bg-green-600 hover:bg-green-700"
// //                     >
// //                       🎓 Finish Course & Get Certificate
// //                     </Button>
// //                   </div>
// //                 )}
// //               </div>
// //             </CardContent>
// //           </Card>

// //           {/* Guide Section */}
// //           <Card>
// //             <CardHeader>
// //               <CardTitle>Guide</CardTitle>
// //             </CardHeader>
// //             <CardContent>
// //               <div className="space-y-4">
// //                 <h3 className="font-semibold">Course Modules</h3>
// //                 <div className="space-y-3">
// //                   {modules.map((module) => (
// //                     <div
// //                       key={module.id}
// //                       className="border-b pb-3 last:border-0"
// //                     >
// //                       <div className="flex items-center">
// //                         {module.completed ? (
// //                           <CheckCircle2 className="h-4 w-4 text-green-600 mr-2" />
// //                         ) : (
// //                           <Circle className="h-4 w-4 text-gray-400 mr-2" />
// //                         )}
// //                         <span className="font-medium">
// //                           Module {module.module_number}: {module.title}
// //                         </span>
// //                       </div>

// //                       {module.content.length > 0 ? (
// //                         <ul className="mt-2 ml-6 space-y-1">
// //                           {module.content.map((content, idx) => (
// //                             <li key={idx} className="text-gray-700">
// //                               {content.content_title}
// //                             </li>
// //                           ))}
// //                         </ul>
// //                       ) : (
// //                         <p className="mt-2 ml-6 text-gray-500 text-sm">
// //                           No content available for this module.
// //                         </p>
// //                       )}
// //                     </div>
// //                   ))}
// //                 </div>
// //               </div>
// //             </CardContent>
// //           </Card>

// //           {/* Modules List */}
// //           <div className="space-y-4">
// //             <h2 className="text-xl font-semibold">Detailed Modules</h2>
// //             {modules.map((module) => (
// //               <Card
// //                 key={module.id}
// //                 className={`transition-all overflow-hidden ${
// //                   module.completed
// //                     ? "border-green-200 bg-green-50"
// //                     : "hover:shadow-md"
// //                 }`}
// //               >
// //                 <div
// //                   className="p-6 cursor-pointer"
// //                   onClick={() => toggleModule(module.id)}
// //                 >
// //                   <div className="flex items-start justify-between">
// //                     <div className="flex items-start space-x-4">
// //                       <button
// //                         onClick={(e) => {
// //                           e.stopPropagation();
// //                           toggleModuleCompletion(module.id, module.completed);
// //                         }}
// //                         className="mt-1 transition-colors"
// //                       >
// //                         {module.completed ? (
// //                           <CheckCircle2 className="h-6 w-6 text-green-600" />
// //                         ) : (
// //                           <Circle className="h-6 w-6 text-gray-400 hover:text-green-600" />
// //                         )}
// //                       </button>

// //                       <div className="flex-1">
// //                         <div className="flex items-center space-x-2 mb-2">
// //                           <Badge variant="outline">
// //                             Module {module.module_number}
// //                           </Badge>
// //                           {module.completed && (
// //                             <Badge className="bg-green-100 text-green-800">
// //                               Completed
// //                             </Badge>
// //                           )}
// //                         </div>
// //                         <h3 className="font-semibold text-lg mb-2">
// //                           {module.title}
// //                         </h3>
// //                         {module.description && (
// //                           <p className="text-gray-600">{module.description}</p>
// //                         )}
// //                       </div>
// //                     </div>
// //                     <div className="text-gray-400">
// //                       {activeModuleId === module.id ? (
// //                         <ChevronUp className="h-5 w-5" />
// //                       ) : (
// //                         <ChevronDown className="h-5 w-5" />
// //                       )}
// //                     </div>
// //                   </div>
// //                 </div>

// //                 {/* Module Content */}
// //                 {activeModuleId === module.id && (
// //                   <CardContent className="pt-0 border-t">
// //                     <div className="mt-4">
// //                       <h4 className="font-medium mb-4">Module Content</h4>

// //                       {module.content.length > 0 ? (
// //                         <div className="space-y-4">
// //                           {module.content.map((content, index) => (
// //                             <div key={index}>{renderContent(content)}</div>
// //                           ))}
// //                         </div>
// //                       ) : (
// //                         <div className="text-center py-6 text-gray-500">
// //                           <p>No content available for this module.</p>
// //                         </div>
// //                       )}
// //                     </div>
// //                   </CardContent>
// //                 )}
// //               </Card>
// //             ))}
// //           </div>
// //         </div>
// //       </main>
// //       <Footer />
// //     </div>
// //   );
// // };

// import { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import { Progress } from "@/components/ui/progress";
// import {
//   CheckCircle2,
//   Circle,
//   ArrowLeft,
//   Trophy,
//   BookOpen,
//   FileText,
//   Video,
//   ChevronDown,
//   ChevronUp,
//   Download,
// } from "lucide-react";
// import { supabase } from "@/integrations/supabase/client";
// import { useToast } from "@/hooks/use-toast";
// import Header from "@/footer/Header";
// import Footer from "@/footer/Footer";

// interface ContentData {
//   id: string;
//   module_id: string;
//   content_type: string; // Changed to string to be more flexible
//   content_title: string;
//   content_text?: string | null;
//   content_url?: string | null;
//   file_size?: number | null;
//   created_at: string;
// }

// interface Module {
//   id: string;
//   title: string;
//   description: string | null;
//   module_number: number;
//   completed: boolean;
//   content: ContentData[];
//   // Removed mcq_questions since we're not using it in this component
// }

// interface Course {
//   id: string;
//   title: string;
//   description: string;
//   number_of_modules: number;
// }

// export const CourseAccessPage = () => {
//   const { courseId } = useParams<{ courseId: string }>();
//   const navigate = useNavigate();
//   const { toast } = useToast();
//   const [course, setCourse] = useState<Course | null>(null);
//   const [modules, setModules] = useState<Module[]>([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [completedModules, setCompletedModules] = useState(0);
//   const [isEnrolled, setIsEnrolled] = useState(false);
//   const [activeModuleId, setActiveModuleId] = useState<string | null>(null);

//   useEffect(() => {
//     if (courseId) {
//       fetchCourseData();
//       checkEnrollment();
//     }
//   }, [courseId]);

//   const fetchCourseData = async () => {
//     try {
//       // Fetch course details
//       const { data: courseData, error: courseError } = await supabase
//         .from("courses")
//         .select("*")
//         .eq("id", courseId)
//         .single();

//       if (courseError) throw courseError;
//       setCourse(courseData);

//       // Fetch modules
//       const { data: modulesData, error: modulesError } = await supabase
//         .from("course_modules")
//         .select("*")
//         .eq("course_id", courseId)
//         .order("module_number");

//       if (modulesError) throw modulesError;

//       // Get user progress
//       const {
//         data: { session },
//       } = await supabase.auth.getSession();

//       if (session && modulesData) {
//         // Fetch user progress
//         const { data: progressData } = await supabase
//           .from("user_module_progress")
//           .select("module_id, completed")
//           .eq("user_id", session.user.id)
//           .eq("course_id", courseId);

//         const progressMap = new Map(
//           progressData?.map((p) => [p.module_id, p.completed]) || []
//         );

//         // Fetch content for each module
//         const modulesWithContent = await Promise.all(
//           modulesData.map(async (module) => {
//             // Fetch content from module_content table
//             const { data: contentData, error: contentError } = await supabase
//               .from("module_content")
//               .select("*")
//               .eq("module_id", module.id)
//               .order("created_at");

//             if (contentError) {
//               console.error(
//                 `Error fetching content for module ${module.id}:`,
//                 contentError
//               );
//               return {
//                 ...module,
//                 completed: progressMap.get(module.id) || false,
//                 content: [],
//               };
//             }

//             return {
//               ...module,
//               completed: progressMap.get(module.id) || false,
//               content: contentData || [],
//             };
//           })
//         );

//         setModules(modulesWithContent);
//         setCompletedModules(
//           modulesWithContent.filter((m) => m.completed).length
//         );
//       }
//     } catch (error) {
//       console.error("Error fetching course data:", error);
//       toast({
//         title: "Error",
//         description: "Failed to load course data",
//         variant: "destructive",
//       });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const checkEnrollment = async () => {
//     try {
//       const {
//         data: { session },
//       } = await supabase.auth.getSession();
//       if (!session) return;

//       const { data, error } = await supabase
//         .from("course_enrollments")
//         .select("id")
//         .eq("user_id", session.user.id)
//         .eq("course_id", courseId)
//         .eq("payment_status", "paid");

//       if (error) throw error;

//       setIsEnrolled(!!data && data.length > 0);
//     } catch (error) {
//       console.error("Error checking enrollment:", error);
//       toast({
//         title: "Error",
//         description: "Failed to check enrollment",
//         variant: "destructive",
//       });
//     }
//   };

//   const toggleModuleCompletion = async (
//     moduleId: string,
//     currentStatus: boolean
//   ) => {
//     try {
//       const {
//         data: { session },
//       } = await supabase.auth.getSession();
//       if (!session) return;

//       const newStatus = !currentStatus;

//       await supabase
//         .from("user_module_progress")
//         .upsert(
//           {
//             user_id: session.user.id,
//             course_id: courseId!,
//             module_id: moduleId,
//             completed: newStatus,
//             completed_at: newStatus ? new Date().toISOString() : null,
//           },
//           { onConflict: "user_id, module_id" }
//         );

//       // Update local state
//       setModules((prev) =>
//         prev.map((module) =>
//           module.id === moduleId ? { ...module, completed: newStatus } : module
//         )
//       );

//       setCompletedModules((prev) => (newStatus ? prev + 1 : prev - 1));

//       toast({
//         title: newStatus ? "Module Completed!" : "Module Marked Incomplete",
//         description: newStatus
//           ? "Great progress! Keep it up."
//           : "Module marked as incomplete",
//       });
//     } catch (error) {
//       console.error("Error updating module progress:", error);
//       toast({
//         title: "Error",
//         description: "Failed to update progress",
//         variant: "destructive",
//       });
//     }
//   };

//   const finishCourse = async () => {
//     try {
//       const {
//         data: { session },
//       } = await supabase.auth.getSession();
//       if (!session) return;

//       await supabase
//         .from("course_enrollments")
//         .update({
//           completed: true,
//           completion_date: new Date().toISOString(),
//         })
//         .eq("user_id", session.user.id)
//         .eq("course_id", courseId);

//       toast({
//         title: "🎉 Congratulations!",
//         description: "You have successfully completed the course!",
//       });

//       navigate("/e-learning?tab=enrolled");
//     } catch (error) {
//       console.error("Error finishing course:", error);
//       toast({
//         title: "Error",
//         description: "Failed to complete course",
//         variant: "destructive",
//       });
//     }
//   };

//   const toggleModule = (moduleId: string) => {
//     setActiveModuleId(activeModuleId === moduleId ? null : moduleId);
//   };

//   // const renderContent = (content: ContentData) => {
//   //   // Handle different content types safely
//   //   const { data, error } = await supabase.storage
//   //   .from("course-content")
//   //   .createSignedUrl(content.content_url, 60); // URL valid for 60 seconds
//   //   switch (content.content_type) {
//   //     case "text":
//   //       return (
//   //         <div className="mt-4 bg-gray-50 p-4 rounded-md">
//   //           <div className="flex items-center mb-2">
//   //             <FileText className="h-5 w-5 mr-2 text-blue-600" />
//   //             <h4 className="font-medium">{content.content_title}</h4>
//   //           </div>
//   //           {content.content_text && (
//   //             <div className="prose max-w-none">
//   //               {content.content_text.split("\n").map((paragraph, idx) => (
//   //                 <p key={idx} className="mb-3">
//   //                   {paragraph}
//   //                 </p>
//   //               ))}
//   //             </div>
//   //           )}
//   //         </div>
//   //       );
//   //     case "pdf":
//   //       return (
//   //         <div className="mt-4 bg-gray-50 p-4 rounded-md">
//   //           <div className="flex items-center mb-2">
//   //             <FileText className="h-5 w-5 mr-2 text-red-600" />
//   //             <h4 className="font-medium">{content.content_title}</h4>
//   //           </div>
//   //           {content.content_url ? (
//   //             <div className="mt-2">
//   //               <a
//   //                 href={content.content_url}
//   //                 target="_blank"
//   //                 rel="noopener noreferrer"
//   //                 className="inline-flex items-center text-blue-600 hover:underline"
//   //               >
//   //                 <FileText className="h-4 w-4 mr-1" />
//   //                 {content.content_title || "View PDF"}
//   //               </a>
//   //               {content.file_size && (
//   //                 <p className="text-xs text-gray-500 mt-1">
//   //                   File size: {Math.round(content.file_size / 1024)} KB
//   //                 </p>
//   //               )}
//   //             </div>
//   //           ) : (
//   //             <p className="text-gray-500">PDF file not available</p>
//   //           )}
//   //         </div>
//   //       );
//   //     case "video":
//   //       return (
//   //         <div className="mt-4 bg-gray-50 p-4 rounded-md">
//   //           <div className="flex items-center mb-2">
//   //             <Video className="h-5 w-5 mr-2 text-purple-600" />
//   //             <h4 className="font-medium">{content.content_title}</h4>
//   //           </div>
//   //           {content.content_url ? (
//   //             <>
//   //               <div className="mt-2 aspect-video bg-black rounded-lg overflow-hidden">
//   //                 <video
//   //                   src={content.content_url}
//   //                   controls
//   //                   className="w-full h-full object-contain"
//   //                 />
//   //               </div>
//   //               {content.file_size && (
//   //                 <p className="text-xs text-gray-500 mt-1">
//   //                   File size: {Math.round(content.file_size / 1024)} KB
//   //                 </p>
//   //               )}
//   //             </>
//   //           ) : (
//   //             <p className="text-gray-500">Video file not available</p>
//   //           )}
//   //         </div>
//   //       );
//   //     default:
//   //       return (
//   //         <div className="mt-4 bg-gray-50 p-4 rounded-md">
//   //           <div className="flex items-center mb-2">
//   //             <FileText className="h-5 w-5 mr-2 text-gray-600" />
//   //             <h4 className="font-medium">{content.content_title}</h4>
//   //           </div>
//   //           <p className="text-gray-500">
//   //             Unsupported content type: {content.content_type}
//   //           </p>
//   //         </div>
//   //       );
//   //   }
//   // };
//   // const renderContent = ({ content }: { content: ContentData }) => {
//   //   const [signedUrl, setSignedUrl] = useState<string | null>(null);

//   //   useEffect(() => {
//   //     const generateSignedUrl = async () => {
//   //       if (!content.content_url) return;

//   //       const path = content.content_url.split("/course-content/")[1]; // Extract file path
//   //       const { data, error } = await supabase.storage
//   //         .from("course-content")
//   //         .createSignedUrl(path, 3600);

//   //       if (data?.signedUrl) {
//   //         setSignedUrl(data.signedUrl);
//   //       } else {
//   //         console.error("Failed to generate signed URL:", error?.message);
//   //       }
//   //     };

//   //     if (content.content_type === "pdf" || content.content_type === "video") {
//   //       generateSignedUrl();
//   //     }
//   //   }, [content]);

//   //   // Now use signedUrl in renderContent
//   //   switch (content.content_type) {
//   //     case "text":
//   //       return (
//   //         <div className="mt-4 bg-gray-50 p-4 rounded-md">
//   //           <div className="flex items-center mb-2">
//   //             <FileText className="h-5 w-5 mr-2 text-blue-600" />
//   //             <h4 className="font-medium">{content.content_title}</h4>
//   //           </div>
//   //           {content.content_text && (
//   //             <div className="prose max-w-none">
//   //               {content.content_text.split("\n").map((paragraph, idx) => (
//   //                 <p key={idx} className="mb-3">
//   //                   {paragraph}
//   //                 </p>
//   //               ))}
//   //             </div>
//   //           )}
//   //         </div>
//   //       );

//   //     case "pdf":
//   //       return (
//   //         <div className="mt-4 bg-gray-50 p-4 rounded-md">
//   //           <div className="flex items-center mb-2">
//   //             <FileText className="h-5 w-5 mr-2 text-red-600" />
//   //             <h4 className="font-medium">{content.content_title}</h4>
//   //           </div>
//   //           {signedUrl ? (
//   //             <div className="mt-2">
//   //               <a
//   //                 href={signedUrl}
//   //                 target="_blank"
//   //                 rel="noopener noreferrer"
//   //                 className="inline-flex items-center text-blue-600 hover:underline"
//   //               >
//   //                 <FileText className="h-4 w-4 mr-1" />
//   //                 {content.content_title || "View PDF"}
//   //               </a>
//   //               {content.file_size && (
//   //                 <p className="text-xs text-gray-500 mt-1">
//   //                   File size: {Math.round(content.file_size / 1024)} KB
//   //                 </p>
//   //               )}
//   //             </div>
//   //           ) : (
//   //             <p className="text-gray-500">Generating PDF link...</p>
//   //           )}
//   //         </div>
//   //       );

//   //     case "video":
//   //       return (
//   //         <div className="mt-4 bg-gray-50 p-4 rounded-md">
//   //           <div className="flex items-center mb-2">
//   //             <Video className="h-5 w-5 mr-2 text-purple-600" />
//   //             <h4 className="font-medium">{content.content_title}</h4>
//   //           </div>
//   //           {signedUrl ? (
//   //             <div className="mt-2 aspect-video bg-black rounded-lg overflow-hidden">
//   //               <video
//   //                 src={signedUrl}
//   //                 controls
//   //                 className="w-full h-full object-contain"
//   //               />
//   //               {content.file_size && (
//   //                 <p className="text-xs text-gray-500 mt-1">
//   //                   File size: {Math.round(content.file_size / 1024)} KB
//   //                 </p>
//   //               )}
//   //             </div>
//   //           ) : (
//   //             <p className="text-gray-500">Generating video link...</p>
//   //           )}
//   //         </div>
//   //       );

//   //     default:
//   //       return (
//   //         <div className="mt-4 bg-gray-50 p-4 rounded-md">
//   //           <div className="flex items-center mb-2">
//   //             <FileText className="h-5 w-5 mr-2 text-gray-600" />
//   //             <h4 className="font-medium">{content.content_title}</h4>
//   //           </div>
//   //           <p className="text-gray-500">
//   //             Unsupported content type: {content.content_type}
//   //           </p>
//   //         </div>
//   //       );
//   //   }
//   // };
//   const renderContent = async (content: ContentData) => {
//     // Handle different content types safely
//     let signedUrl: string | null = null;

//     // Generate signed URL for PDF and video content
//     if (content.content_type === "pdf" || content.content_type === "video") {
//       try {
//         // Extract file path from public URL
//         const publicUrl = content.content_url || "";
//         const filePath = publicUrl.replace(
//           /https:\/\/[^/]+\/storage\/v1\/object\/public\/[^/]+\//,
//           ""
//         );

//         // Generate signed URL
//         const { data, error } = await supabase.storage
//           .from("course-content")
//           .createSignedUrl(filePath, 3600); // 1 hour validity

//         if (error) throw error;
//         signedUrl = data?.signedUrl || null;
//       } catch (error) {
//         console.error("Error generating signed URL:", error);
//       }
//     }

//     switch (content.content_type) {
//       case "text":
//         return (
//           <div className="mt-4 bg-gray-50 p-4 rounded-md">
//             <div className="flex items-center mb-2">
//               <FileText className="h-5 w-5 mr-2 text-blue-600" />
//               <h4 className="font-medium">{content.content_title}</h4>
//             </div>
//             {content.content_text && (
//               <div className="prose max-w-none">
//                 {content.content_text.split("\n").map((paragraph, idx) => (
//                   <p key={idx} className="mb-3">
//                     {paragraph}
//                   </p>
//                 ))}
//               </div>
//             )}
//           </div>
//         );
//       case "pdf":
//         return (
//           <div className="mt-4 bg-gray-50 p-4 rounded-md">
//             <div className="flex items-center justify-between mb-2">
//               <div className="flex items-center">
//                 <FileText className="h-5 w-5 mr-2 text-red-600" />
//                 <h4 className="font-medium">{content.content_title}</h4>
//               </div>
//               {signedUrl && (
//                 <a
//                   href={signedUrl}
//                   download
//                   className="flex items-center text-blue-600 hover:underline text-sm"
//                 >
//                   <Download className="h-4 w-4 mr-1" /> Download
//                 </a>
//               )}
//             </div>
//             {signedUrl ? (
//               <div className="mt-2">
//                 <iframe
//                   src={signedUrl}
//                   title="PDF Viewer"
//                   className="w-full h-[300px] border rounded"
//                 />
//                 {content.file_size && (
//                   <p className="text-xs text-gray-500 mt-1">
//                     File size: {Math.round(content.file_size / 1024)} KB
//                   </p>
//                 )}
//               </div>
//             ) : (
//               <p className="text-gray-500">PDF file not available</p>
//             )}
//           </div>
//         );
//       case "video":
//         return (
//           <div className="mt-4 bg-gray-50 p-4 rounded-md">
//             <div className="flex items-center justify-between mb-2">
//               <div className="flex items-center">
//                 <Video className="h-5 w-5 mr-2 text-purple-600" />
//                 <h4 className="font-medium">{content.content_title}</h4>
//               </div>
//               {signedUrl && (
//                 <a
//                   href={signedUrl}
//                   download
//                   className="flex items-center text-blue-600 hover:underline text-sm"
//                 >
//                   <Download className="h-4 w-4 mr-1" /> Download
//                 </a>
//               )}
//             </div>
//             {signedUrl ? (
//               <>
//                 <div className="mt-2 aspect-video bg-black rounded-lg overflow-hidden">
//                   <video
//                     src={signedUrl}
//                     controls
//                     className="w-full h-full object-contain"
//                   />
//                 </div>
//                 {content.file_size && (
//                   <p className="text-xs text-gray-500 mt-1">
//                     File size: {Math.round(content.file_size / 1024)} KB
//                   </p>
//                 )}
//               </>
//             ) : (
//               <p className="text-gray-500">Video file not available</p>
//             )}
//           </div>
//         );
//       default:
//         return (
//           <div className="mt-4 bg-gray-50 p-4 rounded-md">
//             <div className="flex items-center mb-2">
//               <FileText className="h-5 w-5 mr-2 text-gray-600" />
//               <h4 className="font-medium">{content.content_title}</h4>
//             </div>
//             <p className="text-gray-500">
//               Unsupported content type: {content.content_type}
//             </p>
//           </div>
//         );
//     }
//   };
//   if (isLoading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center">
//         <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
//       </div>
//     );
//   }

//   if (!isEnrolled) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center">
//         <Card className="max-w-md">
//           <CardContent className="text-center py-12">
//             <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
//             <h3 className="text-lg font-medium text-gray-900 mb-2">
//               Course Access Required
//             </h3>
//             <p className="text-gray-600 mb-4">
//               You need to enroll in this course to access the content.
//             </p>
//             <Button onClick={() => navigate(`/course/${courseId}`)}>
//               Go to Course Details
//             </Button>
//           </CardContent>
//         </Card>
//       </div>
//     );
//   }

//   if (!course) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center">
//         <Card className="max-w-md">
//           <CardContent className="text-center py-12">
//             <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
//             <h3 className="text-lg font-medium text-gray-900 mb-2">
//               Course Not Found
//             </h3>
//             <p className="text-gray-600 mb-4">
//               The requested course could not be loaded.
//             </p>
//             <Button onClick={() => navigate("/e-learning")}>
//               Back to Courses
//             </Button>
//           </CardContent>
//         </Card>
//       </div>
//     );
//   }

//   const progressPercentage =
//     course.number_of_modules > 0
//       ? Math.round((completedModules / course.number_of_modules) * 100)
//       : 0;
//   const allModulesCompleted =
//     completedModules === course.number_of_modules &&
//     course.number_of_modules > 0;

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
//       <Header />
//       <header className="bg-white shadow-sm border-b">
//         <div className="container mx-auto px-4 py-4">
//           <Button
//             variant="outline"
//             onClick={() => navigate(-1)}
//             className="mb-4"
//           >
//             <ArrowLeft className="h-4 w-4 mr-2" />
//             Back
//           </Button>
//           <h1 className="text-2xl font-bold text-gray-900">{course.title}</h1>
//           <p className="text-gray-600 mt-2">{course.description}</p>
//         </div>
//       </header>

//       <main className="container mx-auto px-4 py-8">
//         <div className="max-w-4xl mx-auto space-y-6">
//           {/* Progress Overview */}
//           <Card>
//             <CardHeader>
//               <CardTitle className="flex items-center space-x-2">
//                 <Trophy className="h-5 w-5" />
//                 <span>Course Progress</span>
//               </CardTitle>
//             </CardHeader>
//             <CardContent>
//               <div className="space-y-4">
//                 <div>
//                   <div className="flex justify-between text-sm text-gray-600 mb-2">
//                     <span>
//                       {completedModules} of {course.number_of_modules} modules
//                       completed
//                     </span>
//                     <span>{progressPercentage}%</span>
//                   </div>
//                   <Progress value={progressPercentage} className="h-2" />
//                 </div>

//                 {allModulesCompleted && (
//                   <div className="text-center">
//                     <Button
//                       onClick={finishCourse}
//                       size="lg"
//                       className="bg-green-600 hover:bg-green-700"
//                     >
//                       🎓 Finish Course & Get Certificate
//                     </Button>
//                   </div>
//                 )}
//               </div>
//             </CardContent>
//           </Card>

//           {/* Guide Section */}
//           <Card>
//             <CardHeader>
//               <CardTitle>Guide</CardTitle>
//             </CardHeader>
//             <CardContent>
//               <div className="space-y-4">
//                 <h3 className="font-semibold">Course Modules</h3>
//                 <div className="space-y-3">
//                   {modules.map((module) => (
//                     <div
//                       key={module.id}
//                       className="border-b pb-3 last:border-0"
//                     >
//                       <div className="flex items-center">
//                         {module.completed ? (
//                           <CheckCircle2 className="h-4 w-4 text-green-600 mr-2" />
//                         ) : (
//                           <Circle className="h-4 w-4 text-gray-400 mr-2" />
//                         )}
//                         <span className="font-medium">
//                           Module {module.module_number}: {module.title}
//                         </span>
//                       </div>

//                       {module.content.length > 0 ? (
//                         <ul className="mt-2 ml-6 space-y-1">
//                           {module.content.map((content, idx) => (
//                             <li key={idx} className="text-gray-700">
//                               {content.content_title}
//                             </li>
//                           ))}
//                         </ul>
//                       ) : (
//                         <p className="mt-2 ml-6 text-gray-500 text-sm">
//                           No content available for this module.
//                         </p>
//                       )}
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </CardContent>
//           </Card>

//           {/* Modules List */}
//           <div className="space-y-4">
//             <h2 className="text-xl font-semibold">Detailed Modules</h2>
//             {modules.map((module) => (
//               <Card
//                 key={module.id}
//                 className={`transition-all overflow-hidden ${
//                   module.completed
//                     ? "border-green-200 bg-green-50"
//                     : "hover:shadow-md"
//                 }`}
//               >
//                 <div
//                   className="p-6 cursor-pointer"
//                   onClick={() => toggleModule(module.id)}
//                 >
//                   <div className="flex items-start justify-between">
//                     <div className="flex items-start space-x-4">
//                       <button
//                         onClick={(e) => {
//                           e.stopPropagation();
//                           toggleModuleCompletion(module.id, module.completed);
//                         }}
//                         className="mt-1 transition-colors"
//                       >
//                         {module.completed ? (
//                           <CheckCircle2 className="h-6 w-6 text-green-600" />
//                         ) : (
//                           <Circle className="h-6 w-6 text-gray-400 hover:text-green-600" />
//                         )}
//                       </button>

//                       <div className="flex-1">
//                         <div className="flex items-center space-x-2 mb-2">
//                           <Badge variant="outline">
//                             Module {module.module_number}
//                           </Badge>
//                           {module.completed && (
//                             <Badge className="bg-green-100 text-green-800">
//                               Completed
//                             </Badge>
//                           )}
//                         </div>
//                         <h3 className="font-semibold text-lg mb-2">
//                           {module.title}
//                         </h3>
//                         {module.description && (
//                           <p className="text-gray-600">{module.description}</p>
//                         )}
//                       </div>
//                     </div>
//                     <div className="text-gray-400">
//                       {activeModuleId === module.id ? (
//                         <ChevronUp className="h-5 w-5" />
//                       ) : (
//                         <ChevronDown className="h-5 w-5" />
//                       )}
//                     </div>
//                   </div>
//                 </div>

//                 {/* Module Content */}
//                 {activeModuleId === module.id && (
//                   <CardContent className="pt-0 border-t">
//                     <div className="mt-4">
//                       <h4 className="font-medium mb-4">Module Content</h4>

//                       {module.content.length > 0 ? (
//                         <div className="space-y-4">
//                           {module.content.map((content, index) => (
//                             <div key={index}>{renderContent(content)}</div>
//                           ))}
//                         </div>
//                       ) : (
//                         <div className="text-center py-6 text-gray-500">
//                           <p>No content available for this module.</p>
//                         </div>
//                       )}
//                     </div>
//                   </CardContent>
//                 )}
//               </Card>
//             ))}
//           </div>
//         </div>
//       </main>
//       <Footer />
//     </div>
//   );
// };

import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  CheckCircle2,
  Circle,
  ArrowLeft,
  Trophy,
  BookOpen,
  FileText,
  Video,
  ChevronDown,
  ChevronUp,
  Download,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import Header from "@/footer/Header";
import Footer from "@/footer/Footer";

interface ContentData {
  id: string;
  module_id: string;
  content_type: string;
  content_title: string;
  content_text?: string | null;
  content_url?: string | null;
  file_size?: number | null;
  created_at: string;
}

interface Module {
  id: string;
  title: string;
  description: string | null;
  module_number: number;
  completed: boolean;
  content: ContentData[];
}

interface Course {
  id: string;
  title: string;
  description: string;
  number_of_modules: number;
}

const ContentItem = ({ content }: { content: ContentData }) => {
  const [signedUrl, setSignedUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const generateSignedUrl = async () => {
      if (!content.content_url) return;

      // Extract file path from public URL
      const parts = content.content_url.split("/course-content/");
      if (parts.length < 2) return;

      const filePath = parts[1];
      setLoading(true);

      try {
        const { data, error } = await supabase.storage
          .from("course-content")
          .createSignedUrl(filePath, 3600); // 1 hour validity

        if (error) throw error;
        setSignedUrl(data?.signedUrl || null);
      } catch (error) {
        console.error("Error generating signed URL:", error);
      } finally {
        setLoading(false);
      }
    };

    if (content.content_type === "pdf") {
      generateSignedUrl();
    }
    if (content.content_type === "video") {
      generateSignedUrl();
    }
  }, [content]);

  switch (content.content_type) {
    case "text":
      return (
        <div className="mt-4 bg-gray-50 p-4 rounded-md">
          <div className="flex items-center mb-2">
            <FileText className="h-5 w-5 mr-2 text-blue-600" />
            <h4 className="font-medium">{content.content_title}</h4>
          </div>
          {content.content_text && (
            <div className="prose max-w-none">
              {content.content_text.split("\n").map((paragraph, idx) => (
                <p key={idx} className="mb-3">
                  {paragraph}
                </p>
              ))}
            </div>
          )}
        </div>
      );
    case "pdf":
      return (
        <div className="mt-4 bg-gray-50 p-4 rounded-md">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center">
              <FileText className="h-5 w-5 mr-2 text-red-600" />
              <h4 className="font-medium">{content.content_title}</h4>
            </div>
            {/* {signedUrl && (
              <a
                href={signedUrl}
                download
                className="flex items-center text-blue-600 hover:underline text-sm"
              >
                <Download className="h-4 w-4 mr-1" /> Download
              </a>
            )} */}
          </div>
          {loading ? (
            <p className="text-gray-500">Loading PDF...</p>
          ) : signedUrl ? (
            <div className="mt-2">
              {/* <iframe
                src={signedUrl}
                title="PDF Viewer"
                className="w-full h-[300px] border rounded"
              /> */}
              <a
                href={signedUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline flex items-center gap-1"
              >
                <FileText className="w-4 h-4" />
                {content.content_title}
              </a>
              {content.file_size && (
                <p className="text-xs text-gray-500 mt-1">
                  File size: {Math.round(content.file_size / 1024)} KB
                </p>
              )}
            </div>
          ) : (
            <p className="text-gray-500">PDF file not available</p>
          )}
        </div>
      );
    case "video":
      return (
        <div className="mt-4 bg-gray-50 p-4 rounded-md">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center">
              <Video className="h-5 w-5 mr-2 text-purple-600" />
              <h4 className="font-medium">{content.content_title}</h4>
            </div>
            {/* {signedUrl && (
              <a
                href={signedUrl}
                download
                className="flex items-center text-blue-600 hover:underline text-sm"
              >
                <Download className="h-4 w-4 mr-1" /> Download
              </a>
            )} */}
          </div>
          {loading ? (
            <p className="text-gray-500">Loading video...</p>
          ) : signedUrl ? (
            <>
              <div className="mt-2 aspect-video bg-black rounded-lg overflow-hidden">
                <video
                  src={signedUrl}
                  controls
                  className="w-full h-full object-contain"
                />
              </div>
              {content.file_size && (
                <p className="text-xs text-gray-500 mt-1">
                  File size: {Math.round(content.file_size / 1024)} KB
                </p>
              )}
            </>
          ) : (
            <p className="text-gray-500">Video file not available</p>
          )}
        </div>
      );
    default:
      return (
        <div className="mt-4 bg-gray-50 p-4 rounded-md">
          <div className="flex items-center mb-2">
            <FileText className="h-5 w-5 mr-2 text-gray-600" />
            <h4 className="font-medium">{content.content_title}</h4>
          </div>
          <p className="text-gray-500">
            Unsupported content type: {content.content_type}
          </p>
        </div>
      );
  }
};

export const CourseAccessPage = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [course, setCourse] = useState<Course | null>(null);
  const [modules, setModules] = useState<Module[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [completedModules, setCompletedModules] = useState(0);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [activeModuleId, setActiveModuleId] = useState<string | null>(null);

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
        .from("courses")
        .select("*")
        .eq("id", courseId)
        .single();

      if (courseError) throw courseError;
      setCourse(courseData);

      // Fetch modules
      const { data: modulesData, error: modulesError } = await supabase
        .from("course_modules")
        .select("*")
        .eq("course_id", courseId)
        .order("module_number");

      if (modulesError) throw modulesError;

      // Get user progress
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session && modulesData) {
        // Fetch user progress
        const { data: progressData } = await supabase
          .from("user_module_progress")
          .select("module_id, completed")
          .eq("user_id", session.user.id)
          .eq("course_id", courseId);

        const progressMap = new Map(
          progressData?.map((p) => [p.module_id, p.completed]) || []
        );

        // Fetch content for each module
        const modulesWithContent = await Promise.all(
          modulesData.map(async (module) => {
            // Fetch content from module_content table
            const { data: contentData, error: contentError } = await supabase
              .from("module_content")
              .select("*")
              .eq("module_id", module.id)
              .order("created_at");

            if (contentError) {
              console.error(
                `Error fetching content for module ${module.id}:`,
                contentError
              );
              return {
                ...module,
                completed: progressMap.get(module.id) || false,
                content: [],
              };
            }

            return {
              ...module,
              completed: progressMap.get(module.id) || false,
              content: contentData || [],
            };
          })
        );

        setModules(modulesWithContent);
        setCompletedModules(
          modulesWithContent.filter((m) => m.completed).length
        );
      }
    } catch (error) {
      console.error("Error fetching course data:", error);
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
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) return;

      const { data, error } = await supabase
        .from("course_enrollments")
        .select("id")
        .eq("user_id", session.user.id)
        .eq("course_id", courseId)
        .eq("payment_status", "paid");

      if (error) throw error;

      setIsEnrolled(!!data && data.length > 0);
    } catch (error) {
      console.error("Error checking enrollment:", error);
      toast({
        title: "Error",
        description: "Failed to check enrollment",
        variant: "destructive",
      });
    }
  };

  const toggleModuleCompletion = async (
    moduleId: string,
    currentStatus: boolean
  ) => {
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) return;

      const newStatus = !currentStatus;

      await supabase.from("user_module_progress").upsert(
        {
          user_id: session.user.id,
          course_id: courseId!,
          module_id: moduleId,
          completed: newStatus,
          completed_at: newStatus ? new Date().toISOString() : null,
        },
        { onConflict: "user_id, module_id" }
      );

      // Update local state
      setModules((prev) =>
        prev.map((module) =>
          module.id === moduleId ? { ...module, completed: newStatus } : module
        )
      );

      setCompletedModules((prev) => (newStatus ? prev + 1 : prev - 1));

      toast({
        title: newStatus ? "Module Completed!" : "Module Marked Incomplete",
        description: newStatus
          ? "Great progress! Keep it up."
          : "Module marked as incomplete",
      });
    } catch (error) {
      console.error("Error updating module progress:", error);
      toast({
        title: "Error",
        description: "Failed to update progress",
        variant: "destructive",
      });
    }
  };

  const finishCourse = async () => {
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) return;

      await supabase
        .from("course_enrollments")
        .update({
          completed: true,
          completion_date: new Date().toISOString(),
        })
        .eq("user_id", session.user.id)
        .eq("course_id", courseId);

      toast({
        title: "🎉 Congratulations!",
        description: "You have successfully completed the course!",
      });

      navigate("/e-learning?tab=enrolled");
    } catch (error) {
      console.error("Error finishing course:", error);
      toast({
        title: "Error",
        description: "Failed to complete course",
        variant: "destructive",
      });
    }
  };

  const toggleModule = (moduleId: string) => {
    setActiveModuleId(activeModuleId === moduleId ? null : moduleId);
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
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Course Access Required
            </h3>
            <p className="text-gray-600 mb-4">
              You need to enroll in this course to access the content.
            </p>
            <Button onClick={() => navigate(`/course/${courseId}`)}>
              Go to Course Details
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="text-center py-12">
            <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Course Not Found
            </h3>
            <p className="text-gray-600 mb-4">
              The requested course could not be loaded.
            </p>
            <Button onClick={() => navigate("/e-learning")}>
              Back to Courses
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const progressPercentage =
    course.number_of_modules > 0
      ? Math.round((completedModules / course.number_of_modules) * 100)
      : 0;
  const allModulesCompleted =
    completedModules === course.number_of_modules &&
    course.number_of_modules > 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <Header />
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <Button
            variant="outline"
            onClick={() => navigate(-1)}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
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
                    <span>
                      {completedModules} of {course.number_of_modules} modules
                      completed
                    </span>
                    <span>{progressPercentage}%</span>
                  </div>
                  <Progress value={progressPercentage} className="h-2" />
                </div>

                {allModulesCompleted && (
                  <div className="text-center">
                    <Button
                      onClick={finishCourse}
                      size="lg"
                      className="bg-green-600 hover:bg-green-700"
                    >
                      🎓 Finish Course & Get Certificate
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Guide Section */}
          <Card>
            <CardHeader>
              <CardTitle>Guide</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <h3 className="font-semibold">Course Modules</h3>
                <div className="space-y-3">
                  {modules.map((module) => (
                    <div
                      key={module.id}
                      className="border-b pb-3 last:border-0"
                    >
                      <div className="flex items-center">
                        {module.completed ? (
                          <CheckCircle2 className="h-4 w-4 text-green-600 mr-2" />
                        ) : (
                          <Circle className="h-4 w-4 text-gray-400 mr-2" />
                        )}
                        <span className="font-medium">
                          Module {module.module_number}: {module.title}
                        </span>
                      </div>

                      {module.content.length > 0 ? (
                        <ul className="mt-2 ml-6 space-y-1">
                          {module.content.map((content, idx) => (
                            <li key={idx} className="text-gray-700">
                              {content.content_title}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="mt-2 ml-6 text-gray-500 text-sm">
                          No content available for this module.
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Modules List */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Detailed Modules</h2>
            {modules.map((module) => (
              <Card
                key={module.id}
                className={`transition-all overflow-hidden ${
                  module.completed
                    ? "border-green-200 bg-green-50"
                    : "hover:shadow-md"
                }`}
              >
                <div
                  className="p-6 cursor-pointer"
                  onClick={() => toggleModule(module.id)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleModuleCompletion(module.id, module.completed);
                        }}
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
                          <Badge variant="outline">
                            Module {module.module_number}
                          </Badge>
                          {module.completed && (
                            <Badge className="bg-green-100 text-green-800">
                              Completed
                            </Badge>
                          )}
                        </div>
                        <h3 className="font-semibold text-lg mb-2">
                          {module.title}
                        </h3>
                        {module.description && (
                          <p className="text-gray-600">{module.description}</p>
                        )}
                      </div>
                    </div>
                    <div className="text-gray-400">
                      {activeModuleId === module.id ? (
                        <ChevronUp className="h-5 w-5" />
                      ) : (
                        <ChevronDown className="h-5 w-5" />
                      )}
                    </div>
                  </div>
                </div>

                {/* Module Content */}
                {activeModuleId === module.id && (
                  <CardContent className="pt-0 border-t">
                    <div className="mt-4">
                      <h4 className="font-medium mb-4">Module Content</h4>

                      {module.content.length > 0 ? (
                        <div className="space-y-4">
                          {module.content.map((content, index) => (
                            <ContentItem key={index} content={content} />
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-6 text-gray-500">
                          <p>No content available for this module.</p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};
