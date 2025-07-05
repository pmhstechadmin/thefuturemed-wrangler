// // import { useState } from "react";
// // import { Button } from "@/components/ui/button";
// // import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// // import { Badge } from "@/components/ui/badge";
// // import { Separator } from "@/components/ui/separator";
// // import { CheckCircle, Clock, FileText, Users, Award, Loader2 } from "lucide-react";
// // import { CourseData } from "../CreateCourseWizard";
// // import { supabase } from "@/integrations/supabase/client";
// // import { useToast } from "@/hooks/use-toast";

// // interface EditSubmitStepProps {
// //   courseData: CourseData;
// //   updateCourseData: (updates: Partial<CourseData>) => void;
// //   onPrev: () => void;
// //   onSubmit: () => void;
// //   isSubmitting: boolean;
// // }

// // export const EditSubmitStep = ({ courseData, updateCourseData, onPrev }: EditSubmitStepProps) => {
// //   const [isSubmitting, setIsSubmitting] = useState(false);
// //   const [isSubmitted, setIsSubmitted] = useState(false);
// //   const { toast } = useToast();

// //   const handleSubmit = async () => {
// //     setIsSubmitting(true);

// //     try {
// //       // Get current user
// //       const { data: { user } } = await supabase.auth.getUser();
// //       if (!user) {
// //         toast({
// //           title: "Authentication Error",
// //           description: "You must be logged in to create a course.",
// //           variant: "destructive",
// //         });
// //         setIsSubmitting(false);
// //         return;
// //       }

// //       console.log('Creating course for user:', user.id);
// //       console.log('Course data:', courseData);

// //       // Insert course
// //       const { data: course, error: courseError } = await supabase
// //         .from("courses")
// //         .update({
// //           creator_id: user.id,
// //           title: courseData.title,
// //           description: courseData.description,
// //           duration_months: courseData.duration_months,
// //           online_hours: courseData.online_hours,
// //           offline_hours: courseData.offline_hours,
// //           has_project: courseData.has_project,
// //           project_description: courseData.project_description,
// //           number_of_modules: courseData.number_of_modules,
// //           privacy_policy_accepted: courseData.privacy_policy_accepted,
// //           copyright_agreement_accepted: courseData.copyright_agreement_accepted,
// //           resources_summary: courseData.resources_summary,
// //           status: "draft",
// //         })
// //         .select()
// //         .single();

// //       if (courseError) {
// //         console.error('Course creation error:', courseError);
// //         throw courseError;
// //       }

// //       console.log('Course created successfully:', course.id);

// //       // Insert modules and their content
// //       for (let i = 0; i < courseData.modules.length; i++) {
// //         const module = courseData.modules[i];

// //         console.log(`Creating module ${i + 1}:`, module.title);

// //         const { data: moduleData, error: moduleError } = await supabase
// //           .from("course_modules")
// //           .update({
// //             course_id: course.id,
// //             module_number: i + 1,
// //             title: module.title,
// //             description: module.description,
// //           })
// //           .select()
// //           .single();

// //         if (moduleError) {
// //           console.error('Module creation error:', moduleError);
// //           throw moduleError;
// //         }

// //         // Insert module content
// //         for (const content of module.content) {
// //           console.log('Creating content:', content.title);
// //           const { error: contentError } = await supabase
// //             .from("module_content")
// //             .update({
// //               module_id: moduleData.id,
// //               content_type: content.type,
// //               content_title: content.title,
// //               content_text: content.content,
// //               // Note: File uploads would need additional handling with Supabase Storage
// //             });

// //           if (contentError) {
// //             console.error('Content creation error:', contentError);
// //             throw contentError;
// //           }
// //         }

// //         // Insert MCQ questions
// //         for (const question of module.mcq_questions) {
// //           console.log('Creating MCQ question:', question.question_text);
// //           const { error: questionError } = await supabase
// //             .from('mcq_questions')
// //             .update({
// //               module_id: moduleData.id,
// //               question_text: question.question_text,
// //               option_a: question.option_a,
// //               option_b: question.option_b,
// //               option_c: question.option_c,
// //               option_d: question.option_d,
// //               correct_answer: question.correct_answer,
// //               explanation: question.explanation
// //             });

// //           if (questionError) {
// //             console.error('Question creation error:', questionError);
// //             throw questionError;
// //           }
// //         }
// //       }

// //       setIsSubmitted(true);
// //       toast({
// //         title: "🎉 Course Created Successfully!",
// //         description: `"${courseData.title}" has been saved as a draft. You can publish it later from your courses page.`,
// //       });

// //       // Auto-refresh after 3 seconds to show the new course in the list
// //       setTimeout(() => {
// //         window.location.reload();
// //       }, 3000);

// //     } catch (error) {
// //       console.error('Error creating course:', error);
// //       toast({
// //         title: "Error Creating Course",
// //         description: "There was an error creating your course. Please try again.",
// //         variant: "destructive",
// //       });
// //     } finally {
// //       setIsSubmitting(false);
// //     }
// //   };

// //   const totalContent = courseData.modules.reduce((acc, module) => acc + module.content.length, 0);
// //   const totalQuestions = courseData.modules.reduce((acc, module) => acc + module.mcq_questions.length, 0);

// //   if (isSubmitted) {
// //     return (
// //       <div className="text-center space-y-6">
// //         <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
// //           <CheckCircle className="h-12 w-12 text-green-600" />
// //         </div>
// //         <div>
// //           <h2 className="text-2xl font-bold text-green-800 mb-2">Course Successfully Created! 🎉</h2>
// //           <p className="text-lg text-gray-600 mb-4">
// //             Your course "{courseData.title}" has been saved as a draft.
// //           </p>
// //           <p className="text-sm text-gray-500">
// //             You will be redirected shortly to view your courses...
// //           </p>
// //         </div>
// //         <div className="bg-green-50 p-4 rounded-lg">
// //           <p className="text-sm text-green-700">
// //             ✅ {courseData.modules.length} modules created<br/>
// //             ✅ {totalContent} content items added<br/>
// //             ✅ {totalQuestions} MCQ questions included
// //           </p>
// //         </div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="space-y-6">
// //       <Card>
// //         <CardHeader>
// //           <CardTitle className="flex items-center space-x-2">
// //             <CheckCircle className="h-5 w-5 text-green-600" />
// //             <span>Course Summary</span>
// //           </CardTitle>
// //         </CardHeader>
// //         <CardContent className="space-y-4">
// //           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //             <div>
// //               <h3 className="font-semibold text-lg">{courseData.title}</h3>
// //               <p className="text-gray-600 mt-1">{courseData.description}</p>
// //             </div>
// //             <div className="grid grid-cols-2 gap-4">
// //               <div className="text-center p-3 bg-blue-50 rounded-lg">
// //                 <Clock className="h-6 w-6 text-blue-600 mx-auto mb-1" />
// //                 <div className="text-lg font-semibold">{courseData.duration_months}</div>
// //                 <div className="text-sm text-gray-600">Months</div>
// //               </div>
// //               <div className="text-center p-3 bg-green-50 rounded-lg">
// //                 <FileText className="h-6 w-6 text-green-600 mx-auto mb-1" />
// //                 <div className="text-lg font-semibold">{courseData.number_of_modules}</div>
// //                 <div className="text-sm text-gray-600">Modules</div>
// //               </div>
// //             </div>
// //           </div>

// //           <Separator />

// //           <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
// //             <div>
// //               <span className="font-medium">Online Hours:</span>
// //               <span className="ml-2">{courseData.online_hours}</span>
// //             </div>
// //             <div>
// //               <span className="font-medium">Offline Hours:</span>
// //               <span className="ml-2">{courseData.offline_hours}</span>
// //             </div>
// //             <div>
// //               <span className="font-medium">Final Project:</span>
// //               <span className="ml-2">{courseData.has_project ? 'Yes' : 'No'}</span>
// //             </div>
// //             <div>
// //               <span className="font-medium">Total Content:</span>
// //               <span className="ml-2">{totalContent} items</span>
// //             </div>
// //           </div>

// //           {courseData.has_project && courseData.project_description && (
// //             <div>
// //               <h4 className="font-medium mb-1">Project Description:</h4>
// //               <p className="text-sm text-gray-600">{courseData.project_description}</p>
// //             </div>
// //           )}
// //         </CardContent>
// //       </Card>

// //       <Card>
// //         <CardHeader>
// //           <CardTitle>Module Overview</CardTitle>
// //         </CardHeader>
// //         <CardContent>
// //           <div className="space-y-3">
// //             {courseData.modules.map((module, index) => (
// //               <div key={index} className="border rounded-lg p-3">
// //                 <div className="flex justify-between items-start mb-2">
// //                   <h4 className="font-medium">Module {index + 1}: {module.title}</h4>
// //                   <div className="flex space-x-2">
// //                     <Badge variant="secondary">{module.content.length} content</Badge>
// //                     <Badge variant="outline">{module.mcq_questions.length} MCQs</Badge>
// //                   </div>
// //                 </div>
// //                 <p className="text-sm text-gray-600">{module.description}</p>
// //               </div>
// //             ))}
// //           </div>
// //         </CardContent>
// //       </Card>

// //       <Card>
// //         <CardHeader>
// //           <CardTitle>Statistics</CardTitle>
// //         </CardHeader>
// //         <CardContent>
// //           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
// //             <div className="text-center p-4 bg-purple-50 rounded-lg">
// //               <FileText className="h-8 w-8 text-purple-600 mx-auto mb-2" />
// //               <div className="text-2xl font-bold">{totalContent}</div>
// //               <div className="text-sm text-gray-600">Total Content Items</div>
// //             </div>
// //             <div className="text-center p-4 bg-orange-50 rounded-lg">
// //               <Users className="h-8 w-8 text-orange-600 mx-auto mb-2" />
// //               <div className="text-2xl font-bold">{totalQuestions}</div>
// //               <div className="text-sm text-gray-600">MCQ Questions</div>
// //             </div>
// //             <div className="text-center p-4 bg-green-50 rounded-lg">
// //               <Award className="h-8 w-8 text-green-600 mx-auto mb-2" />
// //               <div className="text-2xl font-bold">{courseData.online_hours + courseData.offline_hours}</div>
// //               <div className="text-sm text-gray-600">Total Hours</div>
// //             </div>
// //           </div>
// //         </CardContent>
// //       </Card>

// //       {courseData.resources_summary && (
// //         <Card>
// //           <CardHeader>
// //             <CardTitle>Resources Summary</CardTitle>
// //           </CardHeader>
// //           <CardContent>
// //             <p className="text-sm text-gray-700">{courseData.resources_summary}</p>
// //           </CardContent>
// //         </Card>
// //       )}

// //       <Card className="border-green-200 bg-green-50">
// //         <CardContent className="pt-6">
// //           <div className="flex items-center space-x-2 text-green-800 mb-3">
// //             <CheckCircle className="h-5 w-5" />
// //             <span className="font-medium">Legal Agreements Accepted</span>
// //           </div>
// //           <div className="text-sm text-green-700 space-y-1">
// //             <p>✓ Privacy & Data Usage Policy accepted</p>
// //             <p>✓ Copyright & Content Agreement accepted</p>
// //             <p className="mt-2 text-xs">You have agreed to all terms and conditions for course creation.</p>
// //           </div>
// //         </CardContent>
// //       </Card>

// //       <div className="flex justify-between">
// //         <Button type="button" variant="outline" onClick={onPrev} disabled={isSubmitting}>
// //           Previous
// //         </Button>
// //         <Button
// //           type="button"
// //           onClick={handleSubmit}
// //           disabled={isSubmitting}
// //           className="bg-green-600 hover:bg-green-700"
// //         >
// //           {isSubmitting ? (
// //             <>
// //               <Loader2 className="mr-2 h-4 w-4 animate-spin" />
// //               Creating Course...
// //             </>
// //           ) : (
// //             "Submit & Create Course"
// //           )}
// //         </Button>
// //       </div>
// //     </div>
// //   );
// // };

// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { Separator } from "@/components/ui/separator";
// import {
//   CheckCircle,
//   Clock,
//   FileText,
//   Users,
//   Award,
//   Loader2,
// } from "lucide-react";
// import { CourseData } from "../CreateCourseWizard";
// import { supabase } from "@/integrations/supabase/client";
// import { useToast } from "@/hooks/use-toast";

// interface EditSubmitStepProps {
//   courseData: CourseData;
//   updateCourseData: (updates: Partial<CourseData>) => void;
//   onPrev: () => void;
//   onSubmit: () => void;
//   isSubmitting: boolean;
// }

// export const EditSubmitStep = ({
//   courseData,
//   updateCourseData,
//   onPrev,
// }: EditSubmitStepProps) => {
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [isSubmitted, setIsSubmitted] = useState(false);
//   const { toast } = useToast();

//   const handleSubmit = async () => {
//     setIsSubmitting(true);

//     try {
//       // Get current user
//       const {
//         data: { user },
//       } = await supabase.auth.getUser();
//       if (!user) {
//         toast({
//           title: "Authentication Error",
//           description: "You must be logged in to create a course.",
//           variant: "destructive",
//         });
//         setIsSubmitting(false);
//         return;
//       }

//       // Insert course
//       const { data: course, error: courseError } = await supabase
//         .from("courses")
//         .update({
//           creator_id: user.id,
//           title: courseData.title,
//           description: courseData.description,
//           duration_months: courseData.duration_months,
//           online_hours: courseData.online_hours,
//           offline_hours: courseData.offline_hours,
//           has_project: courseData.has_project,
//           project_description: courseData.project_description,
//           number_of_modules: courseData.number_of_modules,
//           privacy_policy_accepted: courseData.privacy_policy_accepted,
//           copyright_agreement_accepted: courseData.copyright_agreement_accepted,
//           resources_summary: courseData.resources_summary,
//           status: "draft",
//         })
//         .select()
//         .single();

//       if (courseError) {
//         console.error("Course creation error:", courseError);
//         throw courseError;
//       }

//       // Insert modules and their content
//       for (let i = 0; i < courseData.modules.length; i++) {
//         const module = courseData.modules[i];

//         const { data: moduleData, error: moduleError } = await supabase
//           .from("course_modules")
//           .insert({
//             course_id: course.id,
//             module_number: i + 1,
//             title: module.title,
//             description: module.description,
//           })
//           .select()
//           .single();

//         if (moduleError) {
//           console.error("Module creation error:", moduleError);
//           throw moduleError;
//         }

//         // Insert module content
//         for (const content of module.content) {
//           const { error: contentError } = await supabase
//             .from("module_content")
//             .insert({
//               module_id: moduleData.id,
//               content_type: content.type,
//               content_title: content.title,
//               content_text: content.content,
//             });

//           if (contentError) {
//             console.error("Content creation error:", contentError);
//             throw contentError;
//           }
//         }

//         // Insert MCQ questions
//         for (const question of module.mcq_questions) {
//           const { error: questionError } = await supabase
//             .from("mcq_questions")
//             .insert({
//               module_id: moduleData.id,
//               question_text: question.question_text,
//               option_a: question.option_a,
//               option_b: question.option_b,
//               option_c: question.option_c,
//               option_d: question.option_d,
//               correct_answer: question.correct_answer,
//               explanation: question.explanation,
//             });

//           if (questionError) {
//             console.error("Question creation error:", questionError);
//             throw questionError;
//           }
//         }
//       }

//       setIsSubmitted(true);
//       toast({
//         title: "🎉 Course Created Successfully!",
//         description: `"${courseData.title}" has been saved as a draft. You can publish it later from your courses page.`,
//       });

//       // Auto-refresh after 3 seconds to show the new course in the list
//       setTimeout(() => {
//         window.location.reload();
//       }, 3000);
//     } catch (error) {
//       console.error("Error creating course:", error);
//       toast({
//         title: "Error Creating Course",
//         description:
//           "There was an error creating your course. Please try again.",
//         variant: "destructive",
//       });
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const totalContent = courseData.modules.reduce(
//     (acc, module) => acc + module.content.length,
//     0
//   );
//   const totalQuestions = courseData.modules.reduce(
//     (acc, module) => acc + module.mcq_questions.length,
//     0
//   );

//   if (isSubmitted) {
//     return (
//       <div className="text-center space-y-6">
//         <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
//           <CheckCircle className="h-12 w-12 text-green-600" />
//         </div>
//         <div>
//           <h2 className="text-2xl font-bold text-green-800 mb-2">
//             Course Successfully Created! 🎉
//           </h2>
//           <p className="text-lg text-gray-600 mb-4">
//             Your course "{courseData.title}" has been saved as a draft.
//           </p>
//           <p className="text-sm text-gray-500">
//             You will be redirected shortly to view your courses...
//           </p>
//         </div>
//         <div className="bg-green-50 p-4 rounded-lg">
//           <p className="text-sm text-green-700">
//             ✅ {courseData.modules.length} modules created
//             <br />✅ {totalContent} content items added
//             <br />✅ {totalQuestions} MCQ questions included
//           </p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-6">
//       <Card>
//         <CardHeader>
//           <CardTitle className="flex items-center space-x-2">
//             <CheckCircle className="h-5 w-5 text-green-600" />
//             <span>Course Summary</span>
//           </CardTitle>
//         </CardHeader>
//         <CardContent className="space-y-4">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>
//               <h3 className="font-semibold text-lg">{courseData.title}</h3>
//               <p className="text-gray-600 mt-1">{courseData.description}</p>
//             </div>
//             <div className="grid grid-cols-2 gap-4">
//               <div className="text-center p-3 bg-blue-50 rounded-lg">
//                 <Clock className="h-6 w-6 text-blue-600 mx-auto mb-1" />
//                 <div className="text-lg font-semibold">
//                   {courseData.duration_months}
//                 </div>
//                 <div className="text-sm text-gray-600">Months</div>
//               </div>
//               <div className="text-center p-3 bg-green-50 rounded-lg">
//                 <FileText className="h-6 w-6 text-green-600 mx-auto mb-1" />
//                 <div className="text-lg font-semibold">
//                   {courseData.number_of_modules}
//                 </div>
//                 <div className="text-sm text-gray-600">Modules</div>
//               </div>
//             </div>
//           </div>

//           <Separator />

//           <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
//             <div>
//               <span className="font-medium">Online Hours:</span>
//               <span className="ml-2">{courseData.online_hours}</span>
//             </div>
//             <div>
//               <span className="font-medium">Offline Hours:</span>
//               <span className="ml-2">{courseData.offline_hours}</span>
//             </div>
//             <div>
//               <span className="font-medium">Final Project:</span>
//               <span className="ml-2">
//                 {courseData.has_project ? "Yes" : "No"}
//               </span>
//             </div>
//             <div>
//               <span className="font-medium">Total Content:</span>
//               <span className="ml-2">{totalContent} items</span>
//             </div>
//           </div>

//           {courseData.has_project && courseData.project_description && (
//             <div>
//               <h4 className="font-medium mb-1">Project Description:</h4>
//               <p className="text-sm text-gray-600">
//                 {courseData.project_description}
//               </p>
//             </div>
//           )}
//         </CardContent>
//       </Card>

//       <Card>
//         <CardHeader>
//           <CardTitle>Module Overview</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <div className="space-y-3">
//             {courseData.modules.map((module, index) => (
//               <div key={index} className="border rounded-lg p-3">
//                 <div className="flex justify-between items-start mb-2">
//                   <h4 className="font-medium">
//                     Module {index + 1}: {module.title}
//                   </h4>
//                   <div className="flex space-x-2">
//                     <Badge variant="secondary">
//                       {module.content.length} content
//                     </Badge>
//                     <Badge variant="outline">
//                       {module.mcq_questions.length} MCQs
//                     </Badge>
//                   </div>
//                 </div>
//                 <p className="text-sm text-gray-600">{module.description}</p>
//               </div>
//             ))}
//           </div>
//         </CardContent>
//       </Card>

//       <Card>
//         <CardHeader>
//           <CardTitle>Statistics</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//             <div className="text-center p-4 bg-purple-50 rounded-lg">
//               <FileText className="h-8 w-8 text-purple-600 mx-auto mb-2" />
//               <div className="text-2xl font-bold">{totalContent}</div>
//               <div className="text-sm text-gray-600">Total Content Items</div>
//             </div>
//             <div className="text-center p-4 bg-orange-50 rounded-lg">
//               <Users className="h-8 w-8 text-orange-600 mx-auto mb-2" />
//               <div className="text-2xl font-bold">{totalQuestions}</div>
//               <div className="text-sm text-gray-600">MCQ Questions</div>
//             </div>
//             <div className="text-center p-4 bg-green-50 rounded-lg">
//               <Award className="h-8 w-8 text-green-600 mx-auto mb-2" />
//               <div className="text-2xl font-bold">
//                 {courseData.online_hours + courseData.offline_hours}
//               </div>
//               <div className="text-sm text-gray-600">Total Hours</div>
//             </div>
//           </div>
//         </CardContent>
//       </Card>

//       {courseData.resources_summary && (
//         <Card>
//           <CardHeader>
//             <CardTitle>Resources Summary</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <p className="text-sm text-gray-700">
//               {courseData.resources_summary}
//             </p>
//           </CardContent>
//         </Card>
//       )}

//       <Card className="border-green-200 bg-green-50">
//         <CardContent className="pt-6">
//           <div className="flex items-center space-x-2 text-green-800 mb-3">
//             <CheckCircle className="h-5 w-5" />
//             <span className="font-medium">Legal Agreements Accepted</span>
//           </div>
//           <div className="text-sm text-green-700 space-y-1">
//             <p>✓ Privacy & Data Usage Policy accepted</p>
//             <p>✓ Copyright & Content Agreement accepted</p>
//             <p className="mt-2 text-xs">
//               You have agreed to all terms and conditions for course creation.
//             </p>
//           </div>
//         </CardContent>
//       </Card>

//       <div className="flex justify-between">
//         <Button
//           type="button"
//           variant="outline"
//           onClick={onPrev}
//           disabled={isSubmitting}
//         >
//           Previous
//         </Button>
//         <Button
//           type="button"
//           onClick={handleSubmit}
//           disabled={isSubmitting}
//           className="bg-green-600 hover:bg-green-700"
//         >
//           {isSubmitting ? (
//             <>
//               <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//               Creating Course...
//             </>
//           ) : (
//             "Submit & Create Course"
//           )}
//         </Button>
//       </div>
//     </div>
//   );
// };

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  CheckCircle,
  Clock,
  FileText,
  Users,
  Award,
  Loader2,
} from "lucide-react";
import { CourseData } from "../CreateCourseWizard";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface EditSubmitStepProps {
    
  courseData: CourseData & { id: string }; // Ensure courseData includes id
  updateCourseData: (updates: Partial<CourseData>) => void;
  onPrev: () => void;
  onSubmit: () => void;
  isSubmitting: boolean;
}

export const EditSubmitStep = ({
  courseData,
  updateCourseData,
  onPrev,
}: EditSubmitStepProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      // Verify user is authenticated
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        toast({
          title: "Authentication Error",
          description: "You must be logged in to edit a course.",
          variant: "destructive",
        });
        setIsSubmitting(false);
        return;
      }

      // Verify we have a course ID
      if (!courseData.id) {
        toast({
          title: "Error",
          description: "No course ID found for updating.",
          variant: "destructive",
        });
        setIsSubmitting(false);
        return;
      }

      // Update the main course details
      const { data: course, error: courseError } = await supabase
        .from("courses")
        .update({
          title: courseData.title,
          description: courseData.description,
          duration_months: courseData.duration_months,
          online_hours: courseData.online_hours,
          offline_hours: courseData.offline_hours,
          has_project: courseData.has_project,
          project_description: courseData.project_description,
          number_of_modules: courseData.number_of_modules,
          privacy_policy_accepted: courseData.privacy_policy_accepted,
          copyright_agreement_accepted: courseData.copyright_agreement_accepted,
          resources_summary: courseData.resources_summary,
          status: "draft",
        })
        .eq("id", courseData.id)
        .select()
        .single();

      if (courseError) throw courseError;

      // Delete existing modules and related content
      // First get all module IDs to delete related content
      const { data: existingModules, error: fetchError } = await supabase
        .from("course_modules")
        .select("id")
        .eq("course_id", courseData.id);

      if (fetchError) throw fetchError;

      // Delete module content and questions
      if (existingModules && existingModules.length > 0) {
        const moduleIds = existingModules.map((m) => m.id);

        await supabase
          .from("module_content")
          .delete()
          .in("module_id", moduleIds);

        await supabase
          .from("mcq_questions")
          .delete()
          .in("module_id", moduleIds);
      }

      // Delete the modules themselves
      await supabase
        .from("course_modules")
        .delete()
        .eq("course_id", courseData.id);

      // Insert new modules and their content
      for (let i = 0; i < courseData.modules.length; i++) {
        const module = courseData.modules[i];

        const { data: moduleData, error: moduleError } = await supabase
          .from("course_modules")
          .insert({
            course_id: courseData.id,
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

      setIsSubmitted(true);
      toast({
        title: "🎉 Course Updated Successfully!",
        description: `"${courseData.title}" has been updated and saved as a draft.`,
      });

      // Redirect after delay
      setTimeout(() => {
        window.location.href = `/e-learning`;
      }, 3000);
    } catch (error) {
      console.error("Error updating course:", error);
      toast({
        title: "Error Updating Course",
        description:
          "There was an error updating your course. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const totalContent = courseData.modules.reduce(
    (acc, module) => acc + module.content.length,
    0
  );
  const totalQuestions = courseData.modules.reduce(
    (acc, module) => acc + module.mcq_questions.length,
    0
  );

  if (isSubmitted) {
    return (
      <div className="text-center space-y-6">
        <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
          <CheckCircle className="h-12 w-12 text-green-600" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-green-800 mb-2">
            Course Successfully Updated! 🎉
          </h2>
          <p className="text-lg text-gray-600 mb-4">
            Your course "{courseData.title}" has been updated.
          </p>
          <p className="text-sm text-gray-500">
            You will be redirected shortly to the edit page...
          </p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <p className="text-sm text-green-700">
            ✅ {courseData.modules.length} modules updated
            <br />✅ {totalContent} content items updated
            <br />✅ {totalQuestions} MCQ questions updated
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <span>Course Summary</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold text-lg">{courseData.title}</h3>
              <p className="text-gray-600 mt-1">{courseData.description}</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-blue-50 rounded-lg">
                <Clock className="h-6 w-6 text-blue-600 mx-auto mb-1" />
                <div className="text-lg font-semibold">
                  {courseData.duration_months}
                </div>
                <div className="text-sm text-gray-600">Months</div>
              </div>
              <div className="text-center p-3 bg-green-50 rounded-lg">
                <FileText className="h-6 w-6 text-green-600 mx-auto mb-1" />
                <div className="text-lg font-semibold">
                  {courseData.number_of_modules}
                </div>
                <div className="text-sm text-gray-600">Modules</div>
              </div>
            </div>
          </div>

          <Separator />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <span className="font-medium">Online Hours:</span>
              <span className="ml-2">{courseData.online_hours}</span>
            </div>
            <div>
              <span className="font-medium">Offline Hours:</span>
              <span className="ml-2">{courseData.offline_hours}</span>
            </div>
            <div>
              <span className="font-medium">Final Project:</span>
              <span className="ml-2">
                {courseData.has_project ? "Yes" : "No"}
              </span>
            </div>
            <div>
              <span className="font-medium">Total Content:</span>
              <span className="ml-2">{totalContent} items</span>
            </div>
          </div>

          {courseData.has_project && courseData.project_description && (
            <div>
              <h4 className="font-medium mb-1">Project Description:</h4>
              <p className="text-sm text-gray-600">
                {courseData.project_description}
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Module Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {courseData.modules.map((module, index) => (
              <div key={index} className="border rounded-lg p-3">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-medium">
                    Module {index + 1}: {module.title}
                  </h4>
                  <div className="flex space-x-2">
                    <Badge variant="secondary">
                      {module.content.length} content
                    </Badge>
                    <Badge variant="outline">
                      {module.mcq_questions.length} MCQs
                    </Badge>
                  </div>
                </div>
                <p className="text-sm text-gray-600">{module.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <FileText className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <div className="text-2xl font-bold">{totalContent}</div>
              <div className="text-sm text-gray-600">Total Content Items</div>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <Users className="h-8 w-8 text-orange-600 mx-auto mb-2" />
              <div className="text-2xl font-bold">{totalQuestions}</div>
              <div className="text-sm text-gray-600">MCQ Questions</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <Award className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold">
                {courseData.online_hours + courseData.offline_hours}
              </div>
              <div className="text-sm text-gray-600">Total Hours</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {courseData.resources_summary && (
        <Card>
          <CardHeader>
            <CardTitle>Resources Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-700">
              {courseData.resources_summary}
            </p>
          </CardContent>
        </Card>
      )}

      <Card className="border-green-200 bg-green-50">
        <CardContent className="pt-6">
          <div className="flex items-center space-x-2 text-green-800 mb-3">
            <CheckCircle className="h-5 w-5" />
            <span className="font-medium">Legal Agreements Accepted</span>
          </div>
          <div className="text-sm text-green-700 space-y-1">
            <p>✓ Privacy & Data Usage Policy accepted</p>
            <p>✓ Copyright & Content Agreement accepted</p>
            <p className="mt-2 text-xs">
              You have agreed to all terms and conditions for course creation.
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button
          type="button"
          variant="outline"
          onClick={onPrev}
          disabled={isSubmitting}
        >
          Previous
        </Button>
        <Button
          type="button"
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="bg-green-600 hover:bg-green-700"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Updating Course...
            </>
          ) : (
            "Submit & Update Course"
          )}
        </Button>
      </div>
    </div>
  );
};
