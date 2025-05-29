
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Trash2, Upload, FileText, Video } from "lucide-react";
import { CourseData, ModuleData, ContentData, MCQQuestion } from "../CreateCourseWizard";
import { MCQEditor } from "./MCQEditor";

interface ModulesStepProps {
  courseData: CourseData;
  updateCourseData: (updates: Partial<CourseData>) => void;
  onNext: () => void;
  onPrev: () => void;
}

export const ModulesStep = ({ courseData, updateCourseData, onNext, onPrev }: ModulesStepProps) => {
  const [activeModule, setActiveModule] = useState(0);

  // Initialize modules if not already done
  if (courseData.modules.length === 0) {
    const modules: ModuleData[] = Array.from({ length: courseData.number_of_modules }, (_, i) => ({
      title: `Module ${i + 1}`,
      description: "",
      content: [],
      mcq_questions: [],
    }));
    updateCourseData({ modules });
  }

  const updateModule = (index: number, updates: Partial<ModuleData>) => {
    const newModules = [...courseData.modules];
    newModules[index] = { ...newModules[index], ...updates };
    updateCourseData({ modules: newModules });
  };

  const addContent = (moduleIndex: number, type: 'text' | 'pdf' | 'video') => {
    const newContent: ContentData = {
      type,
      title: `${type.charAt(0).toUpperCase() + type.slice(1)} Content`,
      content: type === 'text' ? '' : undefined,
    };
    
    const module = courseData.modules[moduleIndex];
    updateModule(moduleIndex, {
      content: [...module.content, newContent]
    });
  };

  const updateContent = (moduleIndex: number, contentIndex: number, updates: Partial<ContentData>) => {
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

  const handleFileUpload = (moduleIndex: number, contentIndex: number, file: File) => {
    updateContent(moduleIndex, contentIndex, { file });
  };

  const isValid = courseData.modules.every(module => 
    module.title && module.description && module.content.length > 0
  );

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {courseData.modules.map((module, index) => (
          <Button
            key={index}
            variant={activeModule === index ? "default" : "outline"}
            onClick={() => setActiveModule(index)}
            className="h-auto p-4 justify-start"
          >
            <div className="text-left">
              <div className="font-medium">Module {index + 1}</div>
              <div className="text-xs opacity-75">{module.title || "Untitled"}</div>
            </div>
          </Button>
        ))}
      </div>

      {courseData.modules[activeModule] && (
        <Card>
          <CardHeader>
            <CardTitle>Module {activeModule + 1} Configuration</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="module_title">Module Title</Label>
              <Input
                id="module_title"
                value={courseData.modules[activeModule].title}
                onChange={(e) => updateModule(activeModule, { title: e.target.value })}
                placeholder="Enter module title"
              />
            </div>

            <div>
              <Label htmlFor="module_description">Module Description</Label>
              <Textarea
                id="module_description"
                value={courseData.modules[activeModule].description}
                onChange={(e) => updateModule(activeModule, { description: e.target.value })}
                placeholder="Describe what this module covers"
                rows={3}
              />
            </div>

            <Tabs defaultValue="content" className="w-full">
              <TabsList>
                <TabsTrigger value="content">Content</TabsTrigger>
                <TabsTrigger value="mcq">MCQ Questions</TabsTrigger>
              </TabsList>

              <TabsContent value="content" className="space-y-4">
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => addContent(activeModule, 'text')}
                  >
                    <FileText className="mr-2 h-4 w-4" />
                    Add Text
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => addContent(activeModule, 'pdf')}
                  >
                    <Upload className="mr-2 h-4 w-4" />
                    Add PDF
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => addContent(activeModule, 'video')}
                  >
                    <Video className="mr-2 h-4 w-4" />
                    Add Video
                  </Button>
                </div>

                <div className="space-y-4">
                  {courseData.modules[activeModule].content.map((content, contentIndex) => (
                    <Card key={contentIndex}>
                      <CardContent className="pt-4">
                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <Label>Content Title</Label>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => removeContent(activeModule, contentIndex)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                          <Input
                            value={content.title}
                            onChange={(e) => updateContent(activeModule, contentIndex, { title: e.target.value })}
                            placeholder="Content title"
                          />

                          {content.type === 'text' && (
                            <div>
                              <Label>Text Content</Label>
                              <Textarea
                                value={content.content || ''}
                                onChange={(e) => updateContent(activeModule, contentIndex, { content: e.target.value })}
                                placeholder="Enter your text content here"
                                rows={4}
                              />
                            </div>
                          )}

                          {(content.type === 'pdf' || content.type === 'video') && (
                            <div>
                              <Label>Upload {content.type.toUpperCase()}</Label>
                              <input
                                type="file"
                                accept={content.type === 'pdf' ? '.pdf' : 'video/*'}
                                onChange={(e) => {
                                  const file = e.target.files?.[0];
                                  if (file) handleFileUpload(activeModule, contentIndex, file);
                                }}
                                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                              />
                              {content.file && (
                                <p className="text-sm text-green-600 mt-1">
                                  ✓ {content.file.name} selected
                                </p>
                              )}
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="mcq">
                <MCQEditor
                  questions={courseData.modules[activeModule].mcq_questions}
                  onChange={(questions) => updateModule(activeModule, { mcq_questions: questions })}
                />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      )}

      <div className="flex justify-between">
        <Button type="button" variant="outline" onClick={onPrev}>
          Previous
        </Button>
        <Button type="button" onClick={onNext} disabled={!isValid}>
          Next: Legal Agreement
        </Button>
      </div>
    </div>
  );
};
