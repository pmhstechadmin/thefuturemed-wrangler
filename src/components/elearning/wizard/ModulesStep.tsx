// // // import { useState, useEffect } from "react";
// // // import { Button } from "@/components/ui/button";
// // // import { Input } from "@/components/ui/input";
// // // import { Label } from "@/components/ui/label";
// // // import { Textarea } from "@/components/ui/textarea";
// // // import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// // // import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// // // import { Plus, Trash2, Upload, FileText, Video, X } from "lucide-react";
// // // import { CourseData, ModuleData, ContentData, MCQQuestion } from "../CreateCourseWizard";
// // // import { MCQEditor } from "./MCQEditor";

// // // interface ModulesStepProps {
// // //   courseData: CourseData;
// // //   updateCourseData: (updates: Partial<CourseData>) => void;
// // //   onNext: () => void;
// // //   onPrev: () => void;
// // // }

// // // export const ModulesStep = ({ courseData, updateCourseData, onNext, onPrev }: ModulesStepProps) => {
// // //   const [activeModule, setActiveModule] = useState(0);

// // //   // Initialize modules when component mounts or when number_of_modules changes
// // //   useEffect(() => {
// // //     if (courseData.modules.length !== courseData.number_of_modules) {
// // //       const modules: ModuleData[] = Array.from({ length: courseData.number_of_modules }, (_, i) => {
// // //         // Keep existing module data if it exists
// // //         const existingModule = courseData.modules[i];
// // //         return existingModule || {
// // //           title: `Module ${i + 1}`,
// // //           description: "",
// // //           content: [],
// // //           mcq_questions: [],
// // //         };
// // //       });
// // //       updateCourseData({ modules });
// // //     }
// // //   }, [courseData.number_of_modules, courseData.modules.length, updateCourseData]);

// // //   const updateNumberOfModules = (newCount: number) => {
// // //     if (newCount < 1) return;
// // //     updateCourseData({ number_of_modules: newCount });
// // //     // Reset active module if it's beyond the new count
// // //     if (activeModule >= newCount) {
// // //       setActiveModule(0);
// // //     }
// // //   };

// // //   const updateModule = (index: number, updates: Partial<ModuleData>) => {
// // //     const newModules = [...courseData.modules];
// // //     newModules[index] = { ...newModules[index], ...updates };
// // //     updateCourseData({ modules: newModules });
// // //   };

// // //   const addContent = (moduleIndex: number, type: 'text' | 'pdf' | 'video') => {
// // //     const newContent: ContentData = {
// // //       type,
// // //       title: `${type.charAt(0).toUpperCase() + type.slice(1)} Content`,
// // //       content: type === 'text' ? '' : undefined,
// // //     };

// // //     const module = courseData.modules[moduleIndex];
// // //     updateModule(moduleIndex, {
// // //       content: [...module.content, newContent]
// // //     });
// // //   };

// // //   const updateContent = (moduleIndex: number, contentIndex: number, updates: Partial<ContentData>) => {
// // //     const module = courseData.modules[moduleIndex];
// // //     const newContent = [...module.content];
// // //     newContent[contentIndex] = { ...newContent[contentIndex], ...updates };
// // //     updateModule(moduleIndex, { content: newContent });
// // //   };

// // //   const removeContent = (moduleIndex: number, contentIndex: number) => {
// // //     const module = courseData.modules[moduleIndex];
// // //     const newContent = module.content.filter((_, i) => i !== contentIndex);
// // //     updateModule(moduleIndex, { content: newContent });
// // //   };

// // //   const handleFileUpload = (moduleIndex: number, contentIndex: number, file: File) => {
// // //     updateContent(moduleIndex, contentIndex, { file });
// // //   };

// // //   const addNewModule = () => {
// // //     updateNumberOfModules(courseData.number_of_modules + 1);
// // //     setActiveModule(courseData.number_of_modules); // Switch to the new module
// // //   };

// // //   const removeModule = (moduleIndex: number) => {
// // //     if (courseData.number_of_modules <= 1) return; // Don't allow removing the last module

// // //     const newModules = courseData.modules.filter((_, i) => i !== moduleIndex);
// // //     updateCourseData({
// // //       modules: newModules,
// // //       number_of_modules: courseData.number_of_modules - 1
// // //     });

// // //     // Adjust active module if necessary
// // //     if (activeModule >= newModules.length) {
// // //       setActiveModule(Math.max(0, newModules.length - 1));
// // //     } else if (activeModule > moduleIndex) {
// // //       setActiveModule(activeModule - 1);
// // //     }
// // //   };

// // //   const isValid = courseData.modules.length > 0 && courseData.modules.every(module =>
// // //     module.title.trim() && module.description.trim() && module.content.length > 0
// // //   );

// // //   const currentModule = courseData.modules[activeModule];

// // //   return (
// // //     <div className="space-y-6">
// // //       {/* Module Count Controls */}
// // //       <Card>
// // //         <CardHeader>
// // //           <CardTitle>Course Structure</CardTitle>
// // //         </CardHeader>
// // //         <CardContent>
// // //           <div className="flex items-center space-x-4">
// // //             <Label htmlFor="module_count">Number of Modules:</Label>
// // //             <div className="flex items-center space-x-2">
// // //               <Button
// // //                 type="button"
// // //                 variant="outline"
// // //                 size="sm"
// // //                 onClick={() => updateNumberOfModules(courseData.number_of_modules - 1)}
// // //                 disabled={courseData.number_of_modules <= 1}
// // //               >
// // //                 -
// // //               </Button>
// // //               <Input
// // //                 id="module_count"
// // //                 type="number"
// // //                 min="1"
// // //                 max="20"
// // //                 value={courseData.number_of_modules}
// // //                 onChange={(e) => updateNumberOfModules(parseInt(e.target.value) || 1)}
// // //                 className="w-20 text-center"
// // //               />
// // //               <Button
// // //                 type="button"
// // //                 variant="outline"
// // //                 size="sm"
// // //                 onClick={() => updateNumberOfModules(courseData.number_of_modules + 1)}
// // //                 disabled={courseData.number_of_modules >= 20}
// // //               >
// // //                 +
// // //               </Button>
// // //             </div>
// // //             <Button
// // //               type="button"
// // //               variant="outline"
// // //               size="sm"
// // //               onClick={addNewModule}
// // //             >
// // //               <Plus className="mr-2 h-4 w-4" />
// // //               Add Module
// // //             </Button>
// // //           </div>
// // //         </CardContent>
// // //       </Card>

// // //       {/* Module Navigation */}
// // //       <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
// // //         {courseData.modules.map((module, index) => (
// // //           <div key={index} className="relative">
// // //             <Button
// // //               variant={activeModule === index ? "default" : "outline"}
// // //               onClick={() => setActiveModule(index)}
// // //               className="h-auto p-4 justify-start w-full"
// // //             >
// // //               <div className="text-left">
// // //                 <div className="font-medium">Module {index + 1}</div>
// // //                 <div className="text-xs opacity-75">{module.title || "Untitled"}</div>
// // //               </div>
// // //             </Button>
// // //             {courseData.modules.length > 1 && (
// // //               <Button
// // //                 type="button"
// // //                 variant="ghost"
// // //                 size="sm"
// // //                 onClick={() => removeModule(index)}
// // //                 className="absolute -top-2 -right-2 h-6 w-6 p-0 bg-red-500 hover:bg-red-600 text-white rounded-full"
// // //               >
// // //                 <X className="h-3 w-3" />
// // //               </Button>
// // //             )}
// // //           </div>
// // //         ))}
// // //       </div>

// // //       {/* Module Configuration */}
// // //       {currentModule && (
// // //         <Card>
// // //           <CardHeader>
// // //             <CardTitle>Module {activeModule + 1} Configuration</CardTitle>
// // //           </CardHeader>
// // //           <CardContent className="space-y-4">
// // //             <div>
// // //               <Label htmlFor="module_title">Module Title</Label>
// // //               <Input
// // //                 id="module_title"
// // //                 value={currentModule.title}
// // //                 onChange={(e) => updateModule(activeModule, { title: e.target.value })}
// // //                 placeholder="Enter module title"
// // //               />
// // //             </div>

// // //             <div>
// // //               <Label htmlFor="module_description">Module Description</Label>
// // //               <Textarea
// // //                 id="module_description"
// // //                 value={currentModule.description}
// // //                 onChange={(e) => updateModule(activeModule, { description: e.target.value })}
// // //                 placeholder="Describe what this module covers"
// // //                 rows={3}
// // //               />
// // //             </div>

// // //             <Tabs defaultValue="content" className="w-full">
// // //               <TabsList>
// // //                 <TabsTrigger value="content">Content ({currentModule.content.length})</TabsTrigger>
// // //                 <TabsTrigger value="mcq">MCQ Questions ({currentModule.mcq_questions.length})</TabsTrigger>
// // //               </TabsList>

// // //               <TabsContent value="content" className="space-y-4">
// // //                 <div className="flex gap-2">
// // //                   <Button
// // //                     type="button"
// // //                     variant="outline"
// // //                     size="sm"
// // //                     onClick={() => addContent(activeModule, 'text')}
// // //                   >
// // //                     <FileText className="mr-2 h-4 w-4" />
// // //                     Add Text
// // //                   </Button>
// // //                   <Button
// // //                     type="button"
// // //                     variant="outline"
// // //                     size="sm"
// // //                     onClick={() => addContent(activeModule, 'pdf')}
// // //                   >
// // //                     <Upload className="mr-2 h-4 w-4" />
// // //                     Add PDF
// // //                   </Button>
// // //                   <Button
// // //                     type="button"
// // //                     variant="outline"
// // //                     size="sm"
// // //                     onClick={() => addContent(activeModule, 'video')}
// // //                   >
// // //                     <Video className="mr-2 h-4 w-4" />
// // //                     Add Video
// // //                   </Button>
// // //                 </div>

// // //                 <div className="space-y-4">
// // //                   {currentModule.content.map((content, contentIndex) => (
// // //                     <Card key={contentIndex}>
// // //                       <CardContent className="pt-4">
// // //                         <div className="space-y-3">
// // //                           <div className="flex justify-between items-center">
// // //                             <Label>Content Title</Label>
// // //                             <Button
// // //                               type="button"
// // //                               variant="ghost"
// // //                               size="sm"
// // //                               onClick={() => removeContent(activeModule, contentIndex)}
// // //                             >
// // //                               <Trash2 className="h-4 w-4" />
// // //                             </Button>
// // //                           </div>
// // //                           <Input
// // //                             value={content.title}
// // //                             onChange={(e) => updateContent(activeModule, contentIndex, { title: e.target.value })}
// // //                             placeholder="Content title"
// // //                           />

// // //                           {content.type === 'text' && (
// // //                             <div>
// // //                               <Label>Text Content</Label>
// // //                               <Textarea
// // //                                 value={content.content || ''}
// // //                                 onChange={(e) => updateContent(activeModule, contentIndex, { content: e.target.value })}
// // //                                 placeholder="Enter your text content here"
// // //                                 rows={4}
// // //                               />
// // //                             </div>
// // //                           )}

// // //                           {(content.type === 'pdf' || content.type === 'video') && (
// // //                             <div>
// // //                               <Label>Upload {content.type.toUpperCase()}</Label>
// // //                               <input
// // //                                 type="file"
// // //                                 accept={content.type === 'pdf' ? '.pdf' : 'video/*'}
// // //                                 onChange={(e) => {
// // //                                   const file = e.target.files?.[0];
// // //                                   if (file) handleFileUpload(activeModule, contentIndex, file);
// // //                                 }}
// // //                                 className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
// // //                               />
// // //                               {content.file && (
// // //                                 <p className="text-sm text-green-600 mt-1">
// // //                                   ✓ {content.file.name} selected
// // //                                 </p>
// // //                               )}
// // //                             </div>
// // //                           )}
// // //                         </div>
// // //                       </CardContent>
// // //                     </Card>
// // //                   ))}

// // //                   {currentModule.content.length === 0 && (
// // //                     <div className="text-center py-8 text-gray-500">
// // //                       <p>No content added yet. Click on the buttons above to add content.</p>
// // //                     </div>
// // //                   )}
// // //                 </div>
// // //               </TabsContent>

// // //               <TabsContent value="mcq">
// // //                 <MCQEditor
// // //                   questions={currentModule.mcq_questions}
// // //                   onChange={(questions) => updateModule(activeModule, { mcq_questions: questions })}
// // //                 />
// // //               </TabsContent>
// // //             </Tabs>
// // //           </CardContent>
// // //         </Card>
// // //       )}

// // //       {/* Navigation Buttons */}
// // //       <div className="flex justify-between">
// // //         <Button type="button" variant="outline" onClick={onPrev}>
// // //           Previous
// // //         </Button>
// // //         <div className="flex space-x-2">
// // //           {activeModule < courseData.modules.length - 1 ? (
// // //             <Button
// // //               type="button"
// // //               onClick={() => setActiveModule(activeModule + 1)}
// // //               disabled={!currentModule?.title || !currentModule?.description || currentModule?.content.length === 0}
// // //             >
// // //               Next Module
// // //             </Button>
// // //           ) : (
// // //             <Button type="button" onClick={onNext} disabled={!isValid}>
// // //               Next: Legal Agreement
// // //             </Button>
// // //           )}
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // ModulesStep.tsx
// // import { useState, useEffect } from "react";
// // import { Button } from "@/components/ui/button";
// // import { Input } from "@/components/ui/input";
// // import { Label } from "@/components/ui/label";
// // import { Textarea } from "@/components/ui/textarea";
// // import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// // import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// // import { Plus, Trash2, Upload, FileText, Video, X } from "lucide-react";
// // import {
// //   CourseData,
// //   ModuleData,
// //   ContentData,
// //   MCQQuestion,
// // } from "../CreateCourseWizard";
// // import { MCQEditor } from "./MCQEditor";
// // import { supabase } from "@/integrations/supabase/client";
// // import { useToast } from "@/hooks/use-toast";

// // interface ModulesStepProps {
// //   courseData: CourseData;
// //   updateCourseData: (updates: Partial<CourseData>) => void;
// //   onNext: () => void;
// //   onPrev: () => void;
// // }

// // export const ModulesStep = ({
// //   courseData,
// //   updateCourseData,
// //   onNext,
// //   onPrev,
// // }: ModulesStepProps) => {
// //   const [activeModule, setActiveModule] = useState(0);
// //   const [uploading, setUploading] = useState(false);
// //   const { toast } = useToast();

// //   // Initialize modules when component mounts or when number_of_modules changes
// //   useEffect(() => {
// //     if (courseData.modules.length !== courseData.number_of_modules) {
// //       const modules: ModuleData[] = Array.from(
// //         { length: courseData.number_of_modules },
// //         (_, i) => {
// //           // Keep existing module data if it exists
// //           const existingModule = courseData.modules[i];
// //           return (
// //             existingModule || {
// //               title: `Module ${i + 1}`,
// //               description: "",
// //               content: [],
// //               mcq_questions: [],
// //             }
// //           );
// //         }
// //       );
// //       updateCourseData({ modules });
// //     }
// //   }, [
// //     courseData.number_of_modules,
// //     courseData.modules.length,
// //     updateCourseData,
// //   ]);

// //   const updateNumberOfModules = (newCount: number) => {
// //     if (newCount < 1) return;
// //     updateCourseData({ number_of_modules: newCount });
// //     // Reset active module if it's beyond the new count
// //     if (activeModule >= newCount) {
// //       setActiveModule(0);
// //     }
// //   };

// //   const updateModule = (index: number, updates: Partial<ModuleData>) => {
// //     const newModules = [...courseData.modules];
// //     newModules[index] = { ...newModules[index], ...updates };
// //     updateCourseData({ modules: newModules });
// //   };

// //   const addContent = (moduleIndex: number, type: "text" | "pdf" | "video") => {
// //     const newContent: ContentData = {
// //       type,
// //       title: `${type.charAt(0).toUpperCase() + type.slice(1)} Content`,
// //       content: type === "text" ? "" : undefined,
// //     };

// //     const module = courseData.modules[moduleIndex];
// //     updateModule(moduleIndex, {
// //       content: [...module.content, newContent],
// //     });
// //   };

// //   const updateContent = (
// //     moduleIndex: number,
// //     contentIndex: number,
// //     updates: Partial<ContentData>
// //   ) => {
// //     const module = courseData.modules[moduleIndex];
// //     const newContent = [...module.content];
// //     newContent[contentIndex] = { ...newContent[contentIndex], ...updates };
// //     updateModule(moduleIndex, { content: newContent });
// //   };

// //   const removeContent = (moduleIndex: number, contentIndex: number) => {
// //     const module = courseData.modules[moduleIndex];
// //     const newContent = module.content.filter((_, i) => i !== contentIndex);
// //     updateModule(moduleIndex, { content: newContent });
// //   };

// //   // const handleFileUpload = async (
// //   //   moduleIndex: number,
// //   //   contentIndex: number,
// //   //   file: File
// //   // ) => {
// //   //   if (!file) return;

// //   //   try {
// //   //     console.log("jjjjjjjjjjjjj");
// //   //     setUploading(true);

// //   //     // Generate unique file path
// //   //     // const filePath = `/${Date.now()}-${file.name}`;

// //   //     // Upload file to Supabase storage
// //   //     // const { data, error } = await supabase.storage
// //   //     //   .from("course-content")
// //   //     //   .upload(`course-content/${file.name}`, file)
// //   //     // Generate unique file path
// //   //     // Sanitize filename
// //   //     const sanitizeFilename = (filename: string) => {
// //   //       return filename
// //   //         .replace(/[’‘]/g, "'") // Handle curly single quotes
// //   //         .replace(/[“”]/g, '"') // Handle curly double quotes
// //   //         .replace(/[^\w.-]/g, "_") // Replace special characters
// //   //         .replace(/\s+/g, "_")
// //   //         .replace(/[^a-zA-Z0-9._-]/g, "")
// //   //         .toLowerCase(); // Convert to lowercase
// //   //     };

// //   //     const safeName = sanitizeFilename(file.name);
// //   //     const filePath = `course-content/${Date.now()}-${safeName}`;

// //   //     // Upload file to Supabase storage
// //   //     const { data, error } = await supabase.storage
// //   //       .from("course-content")
// //   //       .upload(filePath, file);

// //   //     console.log("ddddddddd", file.name);
// //   //     if (error) throw error;

// //   //     // Get public URL
// //   //     const { data: publicURLData } = supabase.storage
// //   //       .from("course-content")
// //   //       .getPublicUrl(data.path);

// //   //     console.log("yyyyyyy", data.path);

// //   //     // Update content with file URL and name
// //   //     updateContent(moduleIndex, contentIndex, {
// //   //       file_url: publicURLData.publicUrl,
// //   //       file_name: file.name,
// //   //     });

// //   //     toast({
// //   //       title: "File uploaded!",
// //   //       description: `${file.name} has been uploaded successfully`,
// //   //     });
// //   //   } catch (error) {
// //   //     console.error("Error uploading file:", error);
// //   //     toast({
// //   //       title: "Upload failed",
// //   //       description: "Could not upload file. Please try again.",
// //   //       variant: "destructive",
// //   //     });
// //   //   } finally {
// //   //     setUploading(false);
// //   //   }
// //   // };

// //   // const handleFileUpload = async (
// //   //   moduleIndex: number,
// //   //   contentIndex: number,
// //   //   file: File
// //   // ) => {
// //   //   if (!file) return;

// //   //   try {
// //   //     setUploading(true);

// //   //     const sanitizeFilename = (filename: string) => {
// //   //       return filename
// //   //         .replace(/[’‘]/g, "'")
// //   //         .replace(/[“”]/g, '"')
// //   //         .replace(/[^\w.-]/g, "_")
// //   //         .replace(/\s+/g, "_")
// //   //         .replace(/[^a-zA-Z0-9._-]/g, "")
// //   //         .toLowerCase();
// //   //     };
// //   //     const bucketName = "course-content";
// //   //     const folder = "uploads";
// //   //     const safeName = sanitizeFilename(file.name);
// //   //     const filePath = `${folder}/${Date.now()}-${safeName}`;

// //   //     const { data, error } = await supabase.storage
// //   //       .from(bucketName)
// //   //       .upload(filePath, file);

// //   //     if (error) throw error;

// //   //     // ✅ FIXED: Use correct public URL retrieval
// //   //     // const publicURL = supabase.storage
// //   //     //   .from("course-content")
// //   //     //   .getPublicUrl(filePath).data.publicUrl;
// //   //     const { data: urlData } = supabase.storage
// //   //       .from(bucketName)
// //   //       .getPublicUrl(filePath);

// //   //     // ✅ Update content
// //   //     updateContent(moduleIndex, contentIndex, {
// //   //       file_url: urlData.publicUrl,
// //   //       file_name: file.name,
// //   //     });

// //   //     toast({
// //   //       title: "File uploaded!",
// //   //       description: `${file.name} has been uploaded successfully`,
// //   //     });
// //   //   } catch (error) {
// //   //     console.error("Error uploading file:", error);
// //   //     toast({
// //   //       title: "Upload failed",
// //   //       description: "Could not upload file. Please try again.",
// //   //       variant: "destructive",
// //   //     });
// //   //   } finally {
// //   //     setUploading(false);
// //   //   }
// //   // };

// // //   const handleFileUpload = async (
// // //     moduleIndex: number,
// // //     contentIndex: number,
// // //     file: File
// // //   ) => {
// // //     if (!file) return;

// // //     try {
// // //       setUploading(true);

// // //       const sanitizeFilename = (filename: string) => {
// // //         return filename
// // //           .replace(/[^\w.-]/g, "_") // Simplified regex
// // //           .replace(/\s+/g, "_")
// // //           .toLowerCase();
// // //       };

// // //       //       const bucketName = "course-content";
// // //       //       const folder = "uploads";
// // //       //       const safeName = sanitizeFilename(file.name);
// // //       //       const filePath = `${folder}/${Date.now()}-${safeName}`;

// // //       //       // Only destructure error since we don't use upload data
// // //       //       const { error } = await supabase.storage
// // //       //         .from(bucketName)
// // //       //         .upload(filePath, file);

// // //       //       if (error) throw error;

// // //       //       // Get public URL - use destructured publicUrl directly
// // //       //       const {
// // //       //         data: { publicUrl },
// // //       //       } = supabase.storage.from(bucketName).getPublicUrl(filePath);
// // //       // console.log("kkkkkkkkkkkkp",publicUrl);
// // //       //       // Update content with the public URL
// // //       //       updateContent(moduleIndex, contentIndex, {
// // //       //         file_url: publicUrl,
// // //       //         file_name: file.name,
// // //       //       });
// // //       const bucketName = "course-content"; // ✅ match your Supabase bucket name
// // //       const folder = "uploads";
// // //       const safeName = sanitizeFilename(file.name);
// // //       const filePath = `${folder}/${Date.now()}-${safeName}`;

// // //       const { error } = await supabase.storage
// // //         .from(bucketName)
// // //         .upload(filePath, file);

// // //       if (error) throw error;

// // //       const { data: urlData } = supabase.storage
// // //         .from(bucketName)
// // //         .getPublicUrl(filePath);

// // //         const publicUrl = urlData.publicUrl;
// // // console.log("File URL:", publicUrl);

// // //       console.log("kkkkkkkkkkkkp", urlData.publicUrl); // ✅ should now be a valid Supabase file link

// // //       updateContent(moduleIndex, contentIndex, {
// // //         file_url: urlData.publicUrl,
// // //         file_name: file.name,
// // //       });

// // //       toast({
// // //         title: "File uploaded!",
// // //         description: `${file.name} has been uploaded successfully`,
// // //       });
// // //     } catch (error) {
// // //       console.error("Error uploading file:", error);
// // //       toast({
// // //         title: "Upload failed",
// // //         description:
// // //           error.message || "Could not upload file. Please try again.",
// // //         variant: "destructive",
// // //       });
// // //     } finally {
// // //       setUploading(false);
// // //     }
// // //   };

// // // const handleFileUpload = async (
// // //   moduleIndex: number,
// // //   contentIndex: number,
// // //   file: File
// // // ) => {
// // //   if (!file) return;

// // //   try {
// // //     setUploading(true);

// // //     // Improved filename sanitization
// // //     const sanitizeFilename = (filename: string) => {
// // //       return (filename || "unnamed-file")
// // //         .replace(/[^\w.-]+/g, "_") // More comprehensive sanitization
// // //         .replace(/\s+/g, "_")
// // //         .toLowerCase()
// // //         .substring(0, 100); // Limit filename length
// // //     };

// // //     const bucketName = "course-content";
// // //     const folder = "uploads";
// // //     const safeName = sanitizeFilename(file.name);
// // //     const filePath = `${folder}/${Date.now()}-${safeName}${getFileExtension(
// // //       file
// // //     )}`;

// // //     // Upload file
// // //     const { error } = await supabase.storage
// // //       .from(bucketName)
// // //       .upload(filePath, file, {
// // //         cacheControl: "3600", // 1 hour cache
// // //         contentType: file.type,
// // //       });

// // //     if (error) throw error;

// // //     // Get public URL
// // //     const {
// // //       data: { publicUrl },
// // //     } = supabase.storage.from(bucketName).getPublicUrl(filePath);

// // //     console.log("Uploaded file URL:", publicUrl);

// // //     // Update content
// // //     updateContent(moduleIndex, contentIndex, {
// // //       file_url: publicUrl,
// // //       file_name: file.name || safeName,
// // //     });

// // //     toast({
// // //       title: "File uploaded!",
// // //       description: `${file.name} has been uploaded successfully`,
// // //     });
// // //   } catch (error) {
// // //     console.error("Upload error:", error);

// // //     let description = "Could not upload file. Please try again.";
// // //     if (error.message.includes("Bucket not found")) {
// // //       description =
// // //         "Storage bucket not configured. Please create 'course-content' bucket in Supabase Dashboard.";
// // //     }

// // //     toast({
// // //       title: "Upload failed",
// // //       description,
// // //       variant: "destructive",
// // //     });
// // //   } finally {
// // //     setUploading(false);
// // //   }
// // // };

// // const handleFileUpload = async (
// //   moduleIndex: number,
// //   contentIndex: number,
// //   file: File
// // ) => {
// //   if (!file) return;

// //   try {
// //     setUploading(true);

// //     // Improved filename sanitization with extension preservation
// //     const sanitizeFilename = (filename: string) => {
// //       const baseName = filename.substring(0, filename.lastIndexOf("."));
// //       const extension = filename.substring(filename.lastIndexOf("."));

// //       return (
// //         (baseName || "unnamed-file")
// //           .replace(/[^\w.-]+/g, "_")
// //           .replace(/\s+/g, "_")
// //           .toLowerCase()
// //           .substring(0, 100) + (extension || "")
// //       );
// //     };

// //     const bucketName = "course-content";
// //     const folder = "uploads";
// //     const safeName = sanitizeFilename(file.name);
// //     const filePath = `${folder}/${Date.now()}-${safeName}`;

// //     // Upload file
// //     const { error } = await supabase.storage
// //       .from(bucketName)
// //       .upload(filePath, file, {
// //         cacheControl: "3600",
// //         contentType: file.type,
// //         upsert: false,
// //       });

// //     if (error) {
// //       // Special handling for bucket not found error
// //       if (error.message.includes("Bucket not found")) {
// //         throw new Error(
// //           "Storage bucket not configured. Please create 'course-content' bucket in Supabase Dashboard."
// //         );
// //       }
// //       throw error;
// //     }

// //     // Get public URL
// //     const {
// //       data: { publicUrl },
// //     } = supabase.storage.from(bucketName).getPublicUrl(filePath);

// //     console.log("Uploaded file URL:", publicUrl);

// //     // Update content
// //     updateContent(moduleIndex, contentIndex, {
// //       file_url: publicUrl,
// //       file_name: file.name,
// //     });

// //     toast({
// //       title: "File uploaded!",
// //       description: `${file.name} has been uploaded successfully`,
// //     });
// //   } catch (error) {
// //     console.error("Upload error:", error);

// //     toast({
// //       title: "Upload failed",
// //       description: error.message || "Could not upload file. Please try again.",
// //       variant: "destructive",
// //     });
// //   } finally {
// //     setUploading(false);
// //   }
// // };

// // // Helper to get file extension
// // const getFileExtension = (file: File) => {
// //   const name = file.name || "";
// //   const lastDot = name.lastIndexOf(".");
// //   return lastDot !== -1 ? name.substring(lastDot) : "";
// // };

// //   const addNewModule = () => {
// //     updateNumberOfModules(courseData.number_of_modules + 1);
// //     setActiveModule(courseData.number_of_modules); // Switch to the new module
// //   };

// //   const removeModule = (moduleIndex: number) => {
// //     if (courseData.number_of_modules <= 1) return; // Don't allow removing the last module

// //     const newModules = courseData.modules.filter((_, i) => i !== moduleIndex);
// //     updateCourseData({
// //       modules: newModules,
// //       number_of_modules: courseData.number_of_modules - 1,
// //     });

// //     // Adjust active module if necessary
// //     if (activeModule >= newModules.length) {
// //       setActiveModule(Math.max(0, newModules.length - 1));
// //     } else if (activeModule > moduleIndex) {
// //       setActiveModule(activeModule - 1);
// //     }
// //   };

// //   const isValid =
// //     courseData.modules.length > 0 &&
// //     courseData.modules.every(
// //       (module) =>
// //         module.title.trim() &&
// //         module.description.trim() &&
// //         module.content.length > 0
// //     );

// //   const currentModule = courseData.modules[activeModule];

// //   return (
// //     <div className="space-y-6">
// //       {/* Module Count Controls */}
// //       <Card>
// //         <CardHeader>
// //           <CardTitle>Course Structure</CardTitle>
// //         </CardHeader>
// //         <CardContent>
// //           <div className="flex items-center space-x-4">
// //             <Label htmlFor="module_count">Number of Modules:</Label>
// //             <div className="flex items-center space-x-2">
// //               <Button
// //                 type="button"
// //                 variant="outline"
// //                 size="sm"
// //                 onClick={() =>
// //                   updateNumberOfModules(courseData.number_of_modules - 1)
// //                 }
// //                 disabled={courseData.number_of_modules <= 1}
// //               >
// //                 -
// //               </Button>
// //               <Input
// //                 id="module_count"
// //                 type="number"
// //                 min="1"
// //                 max="20"
// //                 value={courseData.number_of_modules}
// //                 onChange={(e) =>
// //                   updateNumberOfModules(parseInt(e.target.value) || 1)
// //                 }
// //                 className="w-20 text-center"
// //               />
// //               <Button
// //                 type="button"
// //                 variant="outline"
// //                 size="sm"
// //                 onClick={() =>
// //                   updateNumberOfModules(courseData.number_of_modules + 1)
// //                 }
// //                 disabled={courseData.number_of_modules >= 20}
// //               >
// //                 +
// //               </Button>
// //             </div>
// //             <Button
// //               type="button"
// //               variant="outline"
// //               size="sm"
// //               onClick={addNewModule}
// //             >
// //               <Plus className="mr-2 h-4 w-4" />
// //               Add Module
// //             </Button>
// //           </div>
// //         </CardContent>
// //       </Card>

// //       {/* Module Navigation */}
// //       <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
// //         {courseData.modules.map((module, index) => (
// //           <div key={index} className="relative">
// //             <Button
// //               variant={activeModule === index ? "default" : "outline"}
// //               onClick={() => setActiveModule(index)}
// //               className="h-auto p-4 justify-start w-full"
// //             >
// //               <div className="text-left">
// //                 <div className="font-medium">Module {index + 1}</div>
// //                 <div className="text-xs opacity-75">
// //                   {module.title || "Untitled"}
// //                 </div>
// //               </div>
// //             </Button>
// //             {courseData.modules.length > 1 && (
// //               <Button
// //                 type="button"
// //                 variant="ghost"
// //                 size="sm"
// //                 onClick={() => removeModule(index)}
// //                 className="absolute -top-2 -right-2 h-6 w-6 p-0 bg-red-500 hover:bg-red-600 text-white rounded-full"
// //               >
// //                 <X className="h-3 w-3" />
// //               </Button>
// //             )}
// //           </div>
// //         ))}
// //       </div>

// //       {/* Module Configuration */}
// //       {currentModule && (
// //         <Card>
// //           <CardHeader>
// //             <CardTitle>Module {activeModule + 1} Configuration</CardTitle>
// //           </CardHeader>
// //           <CardContent className="space-y-4">
// //             <div>
// //               <Label htmlFor="module_title">Module Title</Label>
// //               <Input
// //                 id="module_title"
// //                 value={currentModule.title}
// //                 onChange={(e) =>
// //                   updateModule(activeModule, { title: e.target.value })
// //                 }
// //                 placeholder="Enter module title"
// //               />
// //             </div>

// //             <div>
// //               <Label htmlFor="module_description">Module Description</Label>
// //               <Textarea
// //                 id="module_description"
// //                 value={currentModule.description}
// //                 onChange={(e) =>
// //                   updateModule(activeModule, { description: e.target.value })
// //                 }
// //                 placeholder="Describe what this module covers"
// //                 rows={3}
// //               />
// //             </div>

// //             <Tabs defaultValue="content" className="w-full">
// //               <TabsList>
// //                 <TabsTrigger value="content">
// //                   Content ({currentModule.content.length})
// //                 </TabsTrigger>
// //                 <TabsTrigger value="mcq">
// //                   MCQ Questions ({currentModule.mcq_questions.length})
// //                 </TabsTrigger>
// //               </TabsList>

// //               <TabsContent value="content" className="space-y-4">
// //                 <div className="flex gap-2">
// //                   <Button
// //                     type="button"
// //                     variant="outline"
// //                     size="sm"
// //                     onClick={() => addContent(activeModule, "text")}
// //                   >
// //                     <FileText className="mr-2 h-4 w-4" />
// //                     Add Text
// //                   </Button>
// //                   <Button
// //                     type="button"
// //                     variant="outline"
// //                     size="sm"
// //                     onClick={() => addContent(activeModule, "pdf")}
// //                   >
// //                     <Upload className="mr-2 h-4 w-4" />
// //                     Add PDF
// //                   </Button>
// //                   <Button
// //                     type="button"
// //                     variant="outline"
// //                     size="sm"
// //                     onClick={() => addContent(activeModule, "video")}
// //                   >
// //                     <Video className="mr-2 h-4 w-4" />
// //                     Add Video
// //                   </Button>
// //                 </div>

// //                 <div className="space-y-4">
// //                   {currentModule.content.map((content, contentIndex) => (
// //                     <Card key={contentIndex}>
// //                       <CardContent className="pt-4">
// //                         <div className="space-y-3">
// //                           <div className="flex justify-between items-center">
// //                             <Label>Content Title</Label>
// //                             <Button
// //                               type="button"
// //                               variant="ghost"
// //                               size="sm"
// //                               onClick={() =>
// //                                 removeContent(activeModule, contentIndex)
// //                               }
// //                             >
// //                               <Trash2 className="h-4 w-4" />
// //                             </Button>
// //                           </div>
// //                           <Input
// //                             value={content.title}
// //                             onChange={(e) =>
// //                               updateContent(activeModule, contentIndex, {
// //                                 title: e.target.value,
// //                               })
// //                             }
// //                             placeholder="Content title"
// //                           />

// //                           {content.type === "text" && (
// //                             <div>
// //                               <Label>Text Content</Label>
// //                               <Textarea
// //                                 value={content.content || ""}
// //                                 onChange={(e) =>
// //                                   updateContent(activeModule, contentIndex, {
// //                                     content: e.target.value,
// //                                   })
// //                                 }
// //                                 placeholder="Enter your text content here"
// //                                 rows={4}
// //                               />
// //                             </div>
// //                           )}

// //                           {/* {(content.type === "pdf" ||
// //                             content.type === "video") && (
// //                             <div>
// //                               <Label>Upload {content.type.toUpperCase()}</Label>
// //                               <input
// //                                 type="file"
// //                                 accept={
// //                                   content.type === "pdf" ? ".pdf" : "video/*"
// //                                 }
// //                                 onChange={(e) => {
// //                                   const file = e.target.files?.[0];
// //                                   if (file)
// //                                     handleFileUpload(
// //                                       activeModule,
// //                                       contentIndex,
// //                                       file
// //                                     );
// //                                 }}
// //                                 className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
// //                                 disabled={uploading}
// //                               />
// //                               {uploading ? (
// //                                 <p className="text-sm text-blue-600 mt-1">
// //                                   Uploading file...
// //                                 </p>
// //                               ) : content.file_url ? (
// //                                 <div className="mt-2">
// //                                   <p className="text-sm text-green-600">
// //                                     ✓ {content.file_name} uploaded
// //                                   </p>
// //                                   <a
// //                                     href={content.file_url}
// //                                     target="_blank"
// //                                     rel="noopener noreferrer"
// //                                     className="text-blue-600 hover:underline text-sm"
// //                                   >
// //                                     View File
// //                                   </a>
// //                                 </div>
// //                               ) : (
// //                                 <p className="text-sm text-gray-500 mt-1">
// //                                   No file uploaded yet
// //                                 </p>
// //                               )}
// //                             </div>
// //                           )} */}
// //                           {(content.type === "pdf" ||
// //                             content.type === "video") && (
// //                             <div>
// //                               <Label>Upload {content.type.toUpperCase()}</Label>
// //                               <input
// //                                 type="file"
// //                                 accept={
// //                                   content.type === "pdf" ? ".pdf" : "video/*"
// //                                 }
// //                                 onChange={(e) => {
// //                                   const file = e.target.files?.[0];
// //                                   if (file)
// //                                     handleFileUpload(
// //                                       activeModule,
// //                                       contentIndex,
// //                                       file
// //                                     );
// //                                 }}
// //                                 className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
// //                                 disabled={uploading}
// //                               />

// //                               {uploading ? (
// //                                 <p className="text-sm text-blue-600 mt-1">
// //                                   Uploading file...
// //                                 </p>
// //                               ) : content.file_url ? (
// //                                 <div className="mt-4">
// //                                   <div className="flex items-center">
// //                                     <p className="text-sm text-green-600">
// //                                       ✓ {content.file_name} uploaded
// //                                     </p>
// //                                     <a
// //                                       href={content.file_url}
// //                                       target="_blank"
// //                                       rel="noopener noreferrer"
// //                                       className="ml-3 text-blue-600 hover:underline text-sm"
// //                                     >
// //                                       View File
// //                                     </a>
// //                                   </div>

// //                                   {/* PDF Viewer */}
// //                                   {content.type === "pdf" && (
// //                                     <div className="mt-2">
// //                                       <iframe
// //                                         src={`https://docs.google.com/gview?url=${encodeURIComponent(
// //                                           content.file_url
// //                                         )}&embedded=true`}
// //                                         className="w-full h-96 border rounded-md"
// //                                         title={content.title}
// //                                       />
// //                                     </div>
// //                                   )}

// //                                   {/* Video Player */}
// //                                   {content.type === "video" && (
// //                                     <div className="mt-2">
// //                                       <video
// //                                         controls
// //                                         className="w-full rounded-md"
// //                                       >
// //                                         <source
// //                                           src={content.file_url}
// //                                           type="video/mp4"
// //                                         />
// //                                         Your browser does not support the video
// //                                         tag.
// //                                       </video>
// //                                     </div>
// //                                   )}
// //                                 </div>
// //                               ) : (
// //                                 <p className="text-sm text-gray-500 mt-1">
// //                                   No file uploaded yet
// //                                 </p>
// //                               )}
// //                             </div>
// //                           )}
// //                         </div>
// //                       </CardContent>
// //                     </Card>
// //                   ))}

// //                   {currentModule.content.length === 0 && (
// //                     <div className="text-center py-8 text-gray-500">
// //                       <p>
// //                         No content added yet. Click on the buttons above to add
// //                         content.
// //                       </p>
// //                     </div>
// //                   )}
// //                 </div>
// //               </TabsContent>

// //               <TabsContent value="mcq">
// //                 <MCQEditor
// //                   questions={currentModule.mcq_questions}
// //                   onChange={(questions) =>
// //                     updateModule(activeModule, { mcq_questions: questions })
// //                   }
// //                 />
// //               </TabsContent>
// //             </Tabs>
// //           </CardContent>
// //         </Card>
// //       )}

// //       {/* Navigation Buttons */}
// //       <div className="flex justify-between">
// //         <Button type="button" variant="outline" onClick={onPrev}>
// //           Previous
// //         </Button>
// //         <div className="flex space-x-2">
// //           {activeModule < courseData.modules.length - 1 ? (
// //             <Button
// //               type="button"
// //               onClick={() => setActiveModule(activeModule + 1)}
// //               disabled={
// //                 !currentModule?.title ||
// //                 !currentModule?.description ||
// //                 currentModule?.content.length === 0
// //               }
// //             >
// //               Next Module
// //             </Button>
// //           ) : (
// //             <Button type="button" onClick={onNext} disabled={!isValid}>
// //               Next: Legal Agreement
// //             </Button>
// //           )}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // ModulesStep.tsx
// import { useState, useEffect } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Textarea } from "@/components/ui/textarea";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { Plus, Trash2, Upload, FileText, Video, X } from "lucide-react";
// import {
//   CourseData,
//   ModuleData,
//   ContentData,
//   MCQQuestion,
// } from "../CreateCourseWizard";
// import { MCQEditor } from "./MCQEditor";
// import { supabase } from "@/integrations/supabase/client";
// import { useToast } from "@/hooks/use-toast";

// interface ModulesStepProps {
//   courseData: CourseData;
//   updateCourseData: (updates: Partial<CourseData>) => void;
//   onNext: () => void;
//   onPrev: () => void;
// }

// export const ModulesStep = ({
//   courseData,
//   updateCourseData,
//   onNext,
//   onPrev,
// }: ModulesStepProps) => {
//   const [activeModule, setActiveModule] = useState(0);
//   const [uploading, setUploading] = useState(false);
//   const { toast } = useToast();

//   // Initialize modules when component mounts or when number_of_modules changes
//   useEffect(() => {
//     if (courseData.modules.length !== courseData.number_of_modules) {
//       const modules: ModuleData[] = Array.from(
//         { length: courseData.number_of_modules },
//         (_, i) => {
//           // Keep existing module data if it exists
//           const existingModule = courseData.modules[i];
//           return (
//             existingModule || {
//               title: `Module ${i + 1}`,
//               description: "",
//               content: [],
//               mcq_questions: [],
//             }
//           );
//         }
//       );
//       updateCourseData({ modules });
//     }
//   }, [
//     courseData.number_of_modules,
//     courseData.modules.length,
//     updateCourseData,
//   ]);

//   const updateNumberOfModules = (newCount: number) => {
//     if (newCount < 1) return;
//     updateCourseData({ number_of_modules: newCount });
//     // Reset active module if it's beyond the new count
//     if (activeModule >= newCount) {
//       setActiveModule(0);
//     }
//   };

//   const updateModule = (index: number, updates: Partial<ModuleData>) => {
//     const newModules = [...courseData.modules];
//     newModules[index] = { ...newModules[index], ...updates };
//     updateCourseData({ modules: newModules });
//   };

//   const addContent = (moduleIndex: number, type: "text" | "pdf" | "video") => {
//     const newContent: ContentData = {
//       type,
//       title: `${type.charAt(0).toUpperCase() + type.slice(1)} Content`,
//       content: type === "text" ? "" : undefined,
//     };

//     const module = courseData.modules[moduleIndex];
//     updateModule(moduleIndex, {
//       content: [...module.content, newContent],
//     });
//   };

//   const updateContent = (
//     moduleIndex: number,
//     contentIndex: number,
//     updates: Partial<ContentData>
//   ) => {
//     const module = courseData.modules[moduleIndex];
//     const newContent = [...module.content];
//     newContent[contentIndex] = { ...newContent[contentIndex], ...updates };
//     updateModule(moduleIndex, { content: newContent });
//   };

//   const removeContent = (moduleIndex: number, contentIndex: number) => {
//     const module = courseData.modules[moduleIndex];
//     const newContent = module.content.filter((_, i) => i !== contentIndex);
//     updateModule(moduleIndex, { content: newContent });
//   };

//   // Helper to get file extension
//   const getFileExtension = (file: File) => {
//     const name = file.name || "";
//     const lastDot = name.lastIndexOf(".");
//     return lastDot !== -1 ? name.substring(lastDot) : "";
//   };

//   const handleFileUpload = async (
//     moduleIndex: number,
//     contentIndex: number,
//     file: File
//   ) => {
//     if (!file) return;

//     try {
//       setUploading(true);

//       // Improved filename sanitization with extension preservation
//       const sanitizeFilename = (filename: string) => {
//         const baseName = filename.substring(0, filename.lastIndexOf('.'));
//         const extension = filename.substring(filename.lastIndexOf('.'));

//         return (baseName || "unnamed-file")
//           .replace(/[^\w.-]+/g, "_")
//           .replace(/\s+/g, "_")
//           .toLowerCase()
//           .substring(0, 100) + (extension || "");
//       };

//       const bucketName = "course-content";
//       const folder = "uploads";
//       const safeName = sanitizeFilename(file.name);
//       const filePath = `${folder}/${Date.now()}-${safeName}`;

//       // Upload file
//       const { error } = await supabase.storage
//         .from(bucketName)
//         .upload(filePath, file, {
//           cacheControl: "3600",
//           contentType: file.type,
//           upsert: false,
//         });

//       if (error) {
//         // Special handling for bucket not found error
//         if (error.message.includes("Bucket not found")) {
//           throw new Error(
//             "Storage bucket not configured. Please create 'course-content' bucket in Supabase Dashboard."
//           );
//         }
//         throw error;
//       }

//       // Get public URL
//       const { data: { publicUrl } } = supabase.storage
//         .from(bucketName)
//         .getPublicUrl(filePath);

//       console.log("Uploaded file URL:", publicUrl);

//       // Update content
//       updateContent(moduleIndex, contentIndex, {
//         file_url: publicUrl,
//         file_name: file.name,
//       });

//       toast({
//         title: "File uploaded!",
//         description: `${file.name} has been uploaded successfully`,
//       });
//     } catch (error) {
//       console.error("Upload error:", error);

//       toast({
//         title: "Upload failed",
//         description: error.message || "Could not upload file. Please try again.",
//         variant: "destructive",
//       });
//     } finally {
//       setUploading(false);
//     }
//   };

//   const addNewModule = () => {
//     updateNumberOfModules(courseData.number_of_modules + 1);
//     setActiveModule(courseData.number_of_modules); // Switch to the new module
//   };

//   const removeModule = (moduleIndex: number) => {
//     if (courseData.number_of_modules <= 1) return; // Don't allow removing the last module

//     const newModules = courseData.modules.filter((_, i) => i !== moduleIndex);
//     updateCourseData({
//       modules: newModules,
//       number_of_modules: courseData.number_of_modules - 1,
//     });

//     // Adjust active module if necessary
//     if (activeModule >= newModules.length) {
//       setActiveModule(Math.max(0, newModules.length - 1));
//     } else if (activeModule > moduleIndex) {
//       setActiveModule(activeModule - 1);
//     }
//   };

//   const isValid =
//     courseData.modules.length > 0 &&
//     courseData.modules.every(
//       (module) =>
//         module.title.trim() &&
//         module.description.trim() &&
//         module.content.length > 0
//     );

//   const currentModule = courseData.modules[activeModule];

//   return (
//     <div className="space-y-6">
//       {/* Module Count Controls */}
//       <Card>
//         <CardHeader>
//           <CardTitle>Course Structure</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <div className="flex items-center space-x-4">
//             <Label htmlFor="module_count">Number of Modules:</Label>
//             <div className="flex items-center space-x-2">
//               <Button
//                 type="button"
//                 variant="outline"
//                 size="sm"
//                 onClick={() =>
//                   updateNumberOfModules(courseData.number_of_modules - 1)
//                 }
//                 disabled={courseData.number_of_modules <= 1}
//               >
//                 -
//               </Button>
//               <Input
//                 id="module_count"
//                 type="number"
//                 min="1"
//                 max="20"
//                 value={courseData.number_of_modules}
//                 onChange={(e) =>
//                   updateNumberOfModules(parseInt(e.target.value) || 1)
//                 }
//                 className="w-20 text-center"
//               />
//               <Button
//                 type="button"
//                 variant="outline"
//                 size="sm"
//                 onClick={() =>
//                   updateNumberOfModules(courseData.number_of_modules + 1)
//                 }
//                 disabled={courseData.number_of_modules >= 20}
//               >
//                 +
//               </Button>
//             </div>
//             <Button
//               type="button"
//               variant="outline"
//               size="sm"
//               onClick={addNewModule}
//             >
//               <Plus className="mr-2 h-4 w-4" />
//               Add Module
//             </Button>
//           </div>
//         </CardContent>
//       </Card>

//       {/* Module Navigation */}
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//         {courseData.modules.map((module, index) => (
//           <div key={index} className="relative">
//             <Button
//               variant={activeModule === index ? "default" : "outline"}
//               onClick={() => setActiveModule(index)}
//               className="h-auto p-4 justify-start w-full"
//             >
//               <div className="text-left">
//                 <div className="font-medium">Module {index + 1}</div>
//                 <div className="text-xs opacity-75">
//                   {module.title || "Untitled"}
//                 </div>
//               </div>
//             </Button>
//             {courseData.modules.length > 1 && (
//               <Button
//                 type="button"
//                 variant="ghost"
//                 size="sm"
//                 onClick={() => removeModule(index)}
//                 className="absolute -top-2 -right-2 h-6 w-6 p-0 bg-red-500 hover:bg-red-600 text-white rounded-full"
//               >
//                 <X className="h-3 w-3" />
//               </Button>
//             )}
//           </div>
//         ))}
//       </div>

//       {/* Module Configuration */}
//       {currentModule && (
//         <Card>
//           <CardHeader>
//             <CardTitle>Module {activeModule + 1} Configuration</CardTitle>
//           </CardHeader>
//           <CardContent className="space-y-4">
//             <div>
//               <Label htmlFor="module_title">Module Title</Label>
//               <Input
//                 id="module_title"
//                 value={currentModule.title}
//                 onChange={(e) =>
//                   updateModule(activeModule, { title: e.target.value })
//                 }
//                 placeholder="Enter module title"
//               />
//             </div>

//             <div>
//               <Label htmlFor="module_description">Module Description</Label>
//               <Textarea
//                 id="module_description"
//                 value={currentModule.description}
//                 onChange={(e) =>
//                   updateModule(activeModule, { description: e.target.value })
//                 }
//                 placeholder="Describe what this module covers"
//                 rows={3}
//               />
//             </div>

//             <Tabs defaultValue="content" className="w-full">
//               <TabsList>
//                 <TabsTrigger value="content">
//                   Content ({currentModule.content.length})
//                 </TabsTrigger>
//                 <TabsTrigger value="mcq">
//                   MCQ Questions ({currentModule.mcq_questions.length})
//                 </TabsTrigger>
//               </TabsList>

//               <TabsContent value="content" className="space-y-4">
//                 <div className="flex gap-2">
//                   <Button
//                     type="button"
//                     variant="outline"
//                     size="sm"
//                     onClick={() => addContent(activeModule, "text")}
//                   >
//                     <FileText className="mr-2 h-4 w-4" />
//                     Add Text
//                   </Button>
//                   <Button
//                     type="button"
//                     variant="outline"
//                     size="sm"
//                     onClick={() => addContent(activeModule, "pdf")}
//                   >
//                     <Upload className="mr-2 h-4 w-4" />
//                     Add PDF
//                   </Button>
//                   <Button
//                     type="button"
//                     variant="outline"
//                     size="sm"
//                     onClick={() => addContent(activeModule, "video")}
//                   >
//                     <Video className="mr-2 h-4 w-4" />
//                     Add Video
//                   </Button>
//                 </div>

//                 <div className="space-y-4">
//                   {currentModule.content.map((content, contentIndex) => (
//                     <Card key={contentIndex}>
//                       <CardContent className="pt-4">
//                         <div className="space-y-3">
//                           <div className="flex justify-between items-center">
//                             <Label>Content Title</Label>
//                             <Button
//                               type="button"
//                               variant="ghost"
//                               size="sm"
//                               onClick={() =>
//                                 removeContent(activeModule, contentIndex)
//                               }
//                             >
//                               <Trash2 className="h-4 w-4" />
//                             </Button>
//                           </div>
//                           <Input
//                             value={content.title}
//                             onChange={(e) =>
//                               updateContent(activeModule, contentIndex, {
//                                 title: e.target.value,
//                               })
//                             }
//                             placeholder="Content title"
//                           />

//                           {content.type === "text" && (
//                             <div>
//                               <Label>Text Content</Label>
//                               <Textarea
//                                 value={content.content || ""}
//                                 onChange={(e) =>
//                                   updateContent(activeModule, contentIndex, {
//                                     content: e.target.value,
//                                   })
//                                 }
//                                 placeholder="Enter your text content here"
//                                 rows={4}
//                               />
//                             </div>
//                           )}

//                           {(content.type === "pdf" ||
//                             content.type === "video") && (
//                             <div>
//                               <Label>Upload {content.type.toUpperCase()}</Label>
//                               <input
//                                 type="file"
//                                 accept={
//                                   content.type === "pdf" ? ".pdf" : "video/*"
//                                 }
//                                 onChange={(e) => {
//                                   const file = e.target.files?.[0];
//                                   if (file)
//                                     handleFileUpload(
//                                       activeModule,
//                                       contentIndex,
//                                       file
//                                     );
//                                 }}
//                                 className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
//                                 disabled={uploading}
//                               />
//                               {uploading ? (
//                                 <p className="text-sm text-blue-600 mt-1">
//                                   Uploading file...
//                                 </p>
//                               ) : content.file_url ? (
//                                 <div className="mt-4">
//                                   <div className="flex items-center">
//                                     <p className="text-sm text-green-600">
//                                       ✓ {content.file_name} uploaded
//                                     </p>
//                                     <a
//                                       href={content.file_url}
//                                       target="_blank"
//                                       rel="noopener noreferrer"
//                                       className="ml-3 text-blue-600 hover:underline text-sm"
//                                     >
//                                       View File
//                                     </a>
//                                   </div>

//                                   {/* PDF Preview */}
//                                   {content.type === "pdf" && (
//                                     <div className="mt-2">
//                                       <iframe
//                                         src={`https://docs.google.com/gview?url=${encodeURIComponent(content.file_url)}&embedded=true`}
//                                         className="w-full h-96 border rounded-md"
//                                         title={content.title}
//                                       />
//                                     </div>
//                                   )}

//                                   {/* Video Preview */}
//                                   {content.type === "video" && (
//                                     <div className="mt-2">
//                                       <video
//                                         controls
//                                         className="w-full rounded-md"
//                                       >
//                                         <source src={content.file_url} type="video/mp4" />
//                                         Your browser does not support the video tag.
//                                       </video>
//                                     </div>
//                                   )}
//                                 </div>
//                               ) : (
//                                 <p className="text-sm text-gray-500 mt-1">
//                                   No file uploaded yet
//                                 </p>
//                               )}
//                             </div>
//                           )}
//                         </div>
//                       </CardContent>
//                     </Card>
//                   ))}

//                   {currentModule.content.length === 0 && (
//                     <div className="text-center py-8 text-gray-500">
//                       <p>
//                         No content added yet. Click on the buttons above to add
//                         content.
//                       </p>
//                     </div>
//                   )}
//                 </div>
//               </TabsContent>

//               <TabsContent value="mcq">
//                 <MCQEditor
//                   questions={currentModule.mcq_questions}
//                   onChange={(questions) =>
//                     updateModule(activeModule, { mcq_questions: questions })
//                   }
//                 />
//               </TabsContent>
//             </Tabs>
//           </CardContent>
//         </Card>
//       )}

//       {/* Navigation Buttons */}
//       <div className="flex justify-between">
//         <Button type="button" variant="outline" onClick={onPrev}>
//           Previous
//         </Button>
//         <div className="flex space-x-2">
//           {activeModule < courseData.modules.length - 1 ? (
//             <Button
//               type="button"
//               onClick={() => setActiveModule(activeModule + 1)}
//               disabled={
//                 !currentModule?.title ||
//                 !currentModule?.description ||
//                 currentModule?.content.length === 0
//               }
//             >
//               Next Module
//             </Button>
//           ) : (
//             <Button type="button" onClick={onNext} disabled={!isValid}>
//               Next: Legal Agreement
//             </Button>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// ModulesStep.tsx
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Trash2, Upload, FileText, Video, X } from "lucide-react";
import {
  CourseData,
  ModuleData,
  ContentData,
  MCQQuestion,
} from "../CreateCourseWizard";
import { MCQEditor } from "./MCQEditor";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { FaLeaf } from "react-icons/fa";

interface ModulesStepProps {
  courseData: CourseData;
  updateCourseData: (updates: Partial<CourseData>) => void;
  onNext: () => void;
  onPrev: () => void;
}

export const ModulesStep = ({
  courseData,
  updateCourseData,
  onNext,
  onPrev,
}: ModulesStepProps) => {
  const [activeModule, setActiveModule] = useState(0);
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();

  // Initialize modules when component mounts or when number_of_modules changes
  useEffect(() => {
    if (courseData.modules.length !== courseData.number_of_modules) {
      const modules: ModuleData[] = Array.from(
        { length: courseData.number_of_modules },
        (_, i) => {
          // Keep existing module data if it exists
          const existingModule = courseData.modules[i];
          return (
            existingModule || {
              title: `Module ${i + 1}`,
              description: "",
              content: [],
              mcq_questions: [],
            }
          );
        }
      );
      updateCourseData({ modules });
    }
  }, [
    courseData.number_of_modules,
    courseData.modules.length,
    updateCourseData,
  ]);

  const updateNumberOfModules = (newCount: number) => {
    if (newCount < 1) return;
    updateCourseData({ number_of_modules: newCount });
    // Reset active module if it's beyond the new count
    if (activeModule >= newCount) {
      setActiveModule(0);
    }
  };

  const updateModule = (index: number, updates: Partial<ModuleData>) => {
    const newModules = [...courseData.modules];
    newModules[index] = { ...newModules[index], ...updates };
    updateCourseData({ modules: newModules });
  };

  const addContent = (moduleIndex: number, type: "text" | "pdf" | "video") => {
    const newContent: ContentData = {
      type,
      title: `${type.charAt(0).toUpperCase() + type.slice(1)} Content`,
      content: type === "text" ? "" : undefined,
    };

    const module = courseData.modules[moduleIndex];
    console.log("llllllllll");
    updateModule(moduleIndex, {
      content: [...module.content, newContent],
    });
  };

  const updateContent = (
    moduleIndex: number,
    contentIndex: number,
    updates: Partial<ContentData>
  ) => {
    const module = courseData.modules[moduleIndex];
    const newContent = [...module.content];
    newContent[contentIndex] = { ...newContent[contentIndex], ...updates };
    updateModule(moduleIndex, { content: newContent });
  };

  const removeContent = (moduleIndex: number, contentIndex: number) => {
    const module = courseData.modules[moduleIndex];
    const newContent = module.content.filter((_, i) => i !== contentIndex);
    updateModule(moduleIndex, { content: newContent });
  };

  // Helper to get file extension
  const getFileExtension = (file: File) => {
    const name = file.name || "";
    const lastDot = name.lastIndexOf(".");
    return lastDot !== -1 ? name.substring(lastDot) : "";
  };

  // Helper to get video MIME type
  const getVideoMimeType = (filename: string) => {
    const ext = filename.split(".").pop()?.toLowerCase();
    switch (ext) {
      case "mp4":
        return "video/mp4";
      case "webm":
        return "video/webm";
      case "ogg":
        return "video/ogg";
      default:
        return "video/mp4";
    }
  };

  const handleFileUpload = async (
    moduleIndex: number,
    contentIndex: number,
    file: File
  ) => {
    if (!file) return;

    try {
      setUploading(true);

      // Improved filename sanitization with extension preservation
      const sanitizeFilename = (filename: string) => {
        const baseName = filename.substring(0, filename.lastIndexOf("."));
        const extension = filename.substring(filename.lastIndexOf("."));

        return (
          (baseName || "unnamed-file")
            .replace(/[^\w.-]+/g, "_")
            .replace(/\s+/g, "_")
            .toLowerCase()
            .substring(0, 100) + (extension || "")
        );
      };

      const bucketName = "course-content";
      const folder = "course-content";
      const safeName = sanitizeFilename(file.name);
      const filePath = `${folder}/${Date.now()}-${safeName}`;
      

      // Upload file
      const { error } = await supabase.storage
        .from(bucketName)
        .upload(filePath, file, {
          cacheControl: "3600",
          contentType: file.type,
          upsert: false,
          // contentDisposition: 'inline', // Important for browser display
        });

      if (error) {
        // Special handling for bucket not found error
        if (error.message.includes("Bucket not found")) {
          throw new Error(
            "Storage bucket not configured. Please create 'course-content' bucket in Supabase Dashboard."
          );
        }
        throw error;
      }

      // Get public URL
      const {
        data: { publicUrl },
      } = supabase.storage.from(bucketName).getPublicUrl(filePath);

      console.log("Uploaded file URL:", publicUrl);

      console.log("pdf file name", file.name);
      // Update content
      updateContent(moduleIndex, contentIndex, {
        file_url: publicUrl,
        file_name: file.name,
        url: publicUrl,
        title: file.name,
        file_size: file.size,
        content_url: publicUrl,
      });

      toast({
        title: "File uploaded!",
        description: `${file.name} has been uploaded successfully`,
      });
    } catch (error) {
      console.error("Upload error:", error);

      toast({
        title: "Upload failed",
        description:
          error.message || "Could not upload file. Please try again.",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  const addNewModule = () => {
    updateNumberOfModules(courseData.number_of_modules + 1);
    setActiveModule(courseData.number_of_modules); // Switch to the new module
  };

  const removeModule = (moduleIndex: number) => {
    if (courseData.number_of_modules <= 1) return; // Don't allow removing the last module

    const newModules = courseData.modules.filter((_, i) => i !== moduleIndex);
    updateCourseData({
      modules: newModules,
      number_of_modules: courseData.number_of_modules - 1,
    });

    // Adjust active module if necessary
    if (activeModule >= newModules.length) {
      setActiveModule(Math.max(0, newModules.length - 1));
    } else if (activeModule > moduleIndex) {
      setActiveModule(activeModule - 1);
    }
  };

  const isValid =
    courseData.modules.length > 0 &&
    courseData.modules.every(
      (module) =>
        module.title.trim() &&
        module.description.trim() &&
        module.content.length > 0
    );

  const currentModule = courseData.modules[activeModule];

  return (
    <div className="space-y-6">
      {/* Module Count Controls */}
      <Card>
        <CardHeader>
          <CardTitle>Course Structure</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4">
            <Label htmlFor="module_count">Number of Modules:</Label>
            <div className="flex items-center space-x-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() =>
                  updateNumberOfModules(courseData.number_of_modules - 1)
                }
                disabled={courseData.number_of_modules <= 1}
              >
                -
              </Button>
              <Input
                id="module_count"
                type="number"
                min="1"
                max="20"
                value={courseData.number_of_modules}
                onChange={(e) =>
                  updateNumberOfModules(parseInt(e.target.value) || 1)
                }
                className="w-20 text-center"
              />
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() =>
                  updateNumberOfModules(courseData.number_of_modules + 1)
                }
                disabled={courseData.number_of_modules >= 20}
              >
                +
              </Button>
            </div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={addNewModule}
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Module
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Module Navigation */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {courseData.modules.map((module, index) => (
          <div key={index} className="relative">
            <Button
              variant={activeModule === index ? "default" : "outline"}
              onClick={() => setActiveModule(index)}
              className="h-auto p-4 justify-start w-full"
            >
              <div className="text-left">
                <div className="font-medium">Module {index + 1}</div>
                <div className="text-xs opacity-75">
                  {module.title || "Untitled"}
                </div>
              </div>
            </Button>
            {courseData.modules.length > 1 && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => removeModule(index)}
                className="absolute -top-2 -right-2 h-6 w-6 p-0 bg-red-500 hover:bg-red-600 text-white rounded-full"
              >
                <X className="h-3 w-3" />
              </Button>
            )}
          </div>
        ))}
      </div>

      {/* Module Configuration */}
      {currentModule && (
        <Card>
          <CardHeader>
            <CardTitle>Module {activeModule + 1} Configuration</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="module_title">Module Title</Label>
              <Input
                id="module_title"
                value={currentModule.title}
                onChange={(e) =>
                  updateModule(activeModule, { title: e.target.value })
                }
                placeholder="Enter module title"
              />
            </div>

            <div>
              <Label htmlFor="module_description">Module Description</Label>
              <Textarea
                id="module_description"
                value={currentModule.description}
                onChange={(e) =>
                  updateModule(activeModule, { description: e.target.value })
                }
                placeholder="Describe what this module covers"
                rows={3}
              />
            </div>

            <Tabs defaultValue="content" className="w-full">
              <TabsList>
                <TabsTrigger value="content">
                  Content ({currentModule.content.length})
                </TabsTrigger>
                <TabsTrigger value="mcq">
                  MCQ Questions ({currentModule.mcq_questions.length})
                </TabsTrigger>
              </TabsList>

              <TabsContent value="content" className="space-y-4">
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => addContent(activeModule, "text")}
                  >
                    <FileText className="mr-2 h-4 w-4" />
                    Add Text
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => addContent(activeModule, "pdf")}
                  >
                    <Upload className="mr-2 h-4 w-4" />
                    Add PDF
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => addContent(activeModule, "video")}
                  >
                    <Video className="mr-2 h-4 w-4" />
                    Add Video
                  </Button>
                </div>

                <div className="space-y-4">
                  {currentModule.content.map((content, contentIndex) => (
                    <Card key={contentIndex}>
                      <CardContent className="pt-4">
                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <Label>Content Title</Label>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() =>
                                removeContent(activeModule, contentIndex)
                              }
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                          <Input
                            value={content.title}
                            onChange={(e) =>
                              updateContent(activeModule, contentIndex, {
                                title: e.target.value,
                              })
                            }
                            placeholder="Content title"
                          />

                          {content.type === "text" && (
                            <div>
                              <Label>Text Content</Label>
                              <Textarea
                                value={content.content || ""}
                                onChange={(e) =>
                                  updateContent(activeModule, contentIndex, {
                                    content: e.target.value,
                                  })
                                }
                                placeholder="Enter your text content here"
                                rows={4}
                              />
                            </div>
                          )}

                          {(content.type === "pdf" ||
                            content.type === "video") && (
                            <div>
                              <Label>Upload {content.type.toUpperCase()}</Label>
                              <input
                                type="file"
                                accept={
                                  content.type === "pdf" ? ".pdf" : "video/*"
                                }
                                onChange={(e) => {
                                  const file = e.target.files?.[0];
                                  if (file)
                                    handleFileUpload(
                                      activeModule,
                                      contentIndex,
                                      file
                                    );
                                }}
                                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                                disabled={uploading}
                              />
                              {uploading ? (
                                <p className="text-sm text-blue-600 mt-1">
                                  Uploading file...
                                </p>
                              ) : content.file_url ? (
                                <div className="mt-4">
                                  <div className="flex items-center">
                                    <p className="text-sm text-green-600">
                                      ✓ {content.file_name} uploaded
                                    </p>
                                    <a
                                      href={content.file_url}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="ml-3 text-blue-600 hover:underline text-sm"
                                    >
                                      View File
                                    </a>
                                  </div>

                                
                                </div>
                              ) : (
                                <p className="text-sm text-gray-500 mt-1">
                                  No file uploaded yet
                                </p>
                              )}
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}

                  {currentModule.content.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      <p>
                        No content added yet. Click on the buttons above to add
                        content.
                      </p>
                    </div>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="mcq">
                <MCQEditor
                  questions={currentModule.mcq_questions}
                  onChange={(questions) =>
                    updateModule(activeModule, { mcq_questions: questions })
                  }
                />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      )}

      {/* Navigation Buttons */}
      <div className="flex justify-between">
        <Button type="button" variant="outline" onClick={onPrev}>
          Previous
        </Button>
        <div className="flex space-x-2">
          {activeModule < courseData.modules.length - 1 ? (
            <Button
              type="button"
              onClick={() => setActiveModule(activeModule + 1)}
              disabled={
                !currentModule?.title ||
                !currentModule?.description ||
                currentModule?.content.length === 0
              }
            >
              Next Module
            </Button>
          ) : (
            <Button type="button" onClick={onNext} disabled={!isValid}>
              Next: Legal Agreement
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
