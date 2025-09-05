// src/components/elearning/ModulesAccordion.tsx
import React, { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  CheckCircle2,
  Circle,
  ChevronDown,
  ChevronUp,
  PlayCircle,
  FileText,
  File as FileIcon,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

type ContentData = {
  id: string;
  content_type: "text" | "pdf" | "video";
  content_title: string;
  content_text?: string | null;
  content_url?: string | null;
};

type MCQQuestion = {
  id: string;
  question_text: string;
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
  correct_answer: "A" | "B" | "C" | "D";
  explanation?: string | null;
};

type Module = {
  id: string;
  module_number: number;
  title: string;
  description?: string | null;
  completed?: boolean;
  content: ContentData[];
  mcq_questions: MCQQuestion[];
};

interface Props {
  modules: Module[];
  activeModuleId: string | null;
  setActiveModuleId: (id: string | null) => void;
  toggleModuleCompletion: (id: string, currentStatus: boolean) => void;
}
const resizeImagesInHtml = (html: string): string => {
  return html.replace(/<img([^>]*)>/g, (match, group1) => {
    // Check if style already exists
    if (/style\s*=/.test(group1)) {
      // Append width style to existing style attribute
      return `<img${group1.replace(
        /style\s*=\s*(['"])(.*?)\1/,
        (s, quote, styleContent) => {
          return `style=${quote}${styleContent};width:100px;${quote}`;
        }
      )}>`;
    } else {
      // Add new style attribute with width
      return `<img${group1} style="width:100px;">`;
    }
  });
};
async function getSignedUrlIfNeeded(rawUrl?: string | null): Promise<string | null> {
  if (!rawUrl) return null;
  if (!rawUrl.includes("/course-content/")) return rawUrl;

  const parts = rawUrl.split("/course-content/");
  if (parts.length < 2) return rawUrl;
  const filePath = parts[1];

  const { data, error } = await supabase.storage
    .from("course-content")
    .createSignedUrl(filePath, 60 * 60);

  if (error) {
    console.error("Signed URL error:", error.message);
    return rawUrl;
  }
  return data?.signedUrl ?? rawUrl;
}

function ContentBlock({ item }: { item: ContentData }) {
  const [signedUrl, setSignedUrl] = useState<string | null>(item.content_url || null);

  useEffect(() => {
    if (item.content_type === "pdf" || item.content_type === "video") {
      (async () => {
        const url = await getSignedUrlIfNeeded(item.content_url);
        setSignedUrl(url);
      })();
    }
  }, [item.content_url, item.content_type]);

  const icon = useMemo(() => {
    if (item.content_type === "video") return <PlayCircle className="h-4 w-4" />;
    if (item.content_type === "pdf") return <FileIcon className="h-4 w-4" />;
    return <FileText className="h-4 w-4" />;
  }, [item.content_type]);

  return (
    <Card className="border bg-white/90">
      <CardHeader className="flex items-center gap-2 py-3 px-4">
        <Badge variant="outline" className="bg-blue-50 text-blue-700 flex items-center gap-1">
          {icon}
          <span className="capitalize">{item.content_type}</span>
        </Badge>
        <h5 className="font-medium text-gray-800">
            {item.content_title}</h5>
      </CardHeader>

      <CardContent className="px-4 pb-4">
        {item.content_type === "text" && item.content_text && (
          <div
            className="prose max-w-none text-gray-800 text-justify"
            // dangerouslySetInnerHTML={{ __html: item.content_text }}
             dangerouslySetInnerHTML={{
                                  __html: resizeImagesInHtml(
                                    item.content_type
                                  ),}}
          />
        )}

        {item.content_type === "video" && signedUrl && (
          <video src={signedUrl} controls className="w-full rounded-lg shadow-sm mt-2" />
        )}

        {item.content_type === "pdf" && signedUrl && (
          <iframe
            src={`${signedUrl}#toolbar=0&navpanes=0&scrollbar=1`}
            className="w-full h-[600px] border rounded-lg shadow-sm mt-2"
            title={`pdf-${item.id}`}
          />
        )}
      </CardContent>
    </Card>
  );
}

export default function ModulesAccordion({
  modules,
  activeModuleId,
  setActiveModuleId,
  toggleModuleCompletion,
}: Props) {
  const [dialog, setDialog] = useState<{ open: boolean; correct: boolean; message: string }>({
    open: false,
    correct: false,
    message: "",
  });
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const handleAnswer = (q: MCQQuestion, selected: "A" | "B" | "C" | "D") => {
    setAnswers((prev) => ({ ...prev, [q.id]: selected }));
    const correct = selected === q.correct_answer;
    setDialog({
      open: true,
      correct,
      message: correct
        ? q.explanation || "✅ Correct! Well done."
        : `❌ Wrong. Correct answer: ${q.correct_answer}${
            q.explanation ? ` — ${q.explanation}` : ""
          }`,
    });
  };

  return (
    <div className="space-y-6">
      {modules.map((module) => {
        const isActive = activeModuleId === module.id;

        return (
          <motion.div
            key={module.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
          >
            <Card className="border shadow-sm bg-gradient-to-br from-white to-blue-50">
              <div
                className="flex justify-between items-center p-5 cursor-pointer"
                onClick={() => setActiveModuleId(isActive ? null : module.id)}
              >
                <div className="flex gap-3">
                  {module.completed ? (
                    <CheckCircle2 className="h-6 w-6 text-green-600" />
                  ) : (
                    <Circle className="h-6 w-6 text-gray-400" />
                  )}
                  <div>
                    <h3 className="text-lg font-semibold">{module.title}</h3>
                    {module.description && (
                      <p className="text-sm text-gray-700 text-justify mt-1">
                        {/* {module.description} */}
                        {module.description ? (
                          <div
                            className="prose max-w-none text-gray-800"
                            dangerouslySetInnerHTML={{
                              __html: resizeImagesInHtml(module.description),
                            }}
                            // dangerouslySetInnerHTML={{
                            //   __html: removeImagesFromHtml(course.description),
                            // }}
                          />
                        ) : (
                          <p className="text-gray-700">
                            No description available for this course.
                          </p>
                        )}
                      </p>
                    )}
                  </div>
                </div>

                {isActive ? (
                  <ChevronUp className="h-5 w-5 text-gray-600" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-600" />
                )}
              </div>

              <AnimatePresence>
                {isActive && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <CardContent className="space-y-6 pt-0 pb-6 px-5 border-t">
                      {/* Content */}
                      {module.content.length > 0 && (
                        <div className="space-y-4">
                          <h4 className="text-base font-semibold text-blue-700">
                            📘 Learning Materials
                          </h4>
                          {module.content.map((c) => (
                            <ContentBlock key={c.id} item={c} />
                          ))}
                        </div>
                      )}

                      {/* Quiz */}
                      {module.mcq_questions.length > 0 && (
                        <div className="space-y-4">
                          <h4 className="text-base font-semibold text-purple-700">
                            📝 Quiz
                          </h4>
                          {module.mcq_questions.map((q, idx) => (
                            <Card key={q.id} className="border bg-white/90">
                              <CardContent className="p-4">
                                <p className="font-medium mb-3">
                                  Q{idx + 1}. {q.question_text}
                                </p>
                                <div className="flex flex-col gap-2">
                                  {(["A", "B", "C", "D"] as const).map(
                                    (opt) => (
                                      <Button
                                        key={opt}
                                        variant="outline"
                                        size="sm"
                                        className={`justify-start w-full text-left ${
                                          answers[q.id] === opt
                                            ? opt === q.correct_answer
                                              ? "border-green-500"
                                              : "border-red-500"
                                            : ""
                                        }`}
                                        onClick={() => handleAnswer(q, opt)}
                                      >
                                        {opt}.{" "}
                                        {q[`option_${opt.toLowerCase()}`]}
                                      </Button>
                                    )
                                  )}
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      )}
                    </CardContent>

                    <CardFooter className="flex justify-end px-5 pb-5">
                      <Button
                        onClick={() =>
                          toggleModuleCompletion(module.id, !!module.completed)
                        }
                        className="bg-green-600 hover:bg-green-700 text-white"
                      >
                        {module.completed ? "✅ Completed" : "Mark as Complete"}
                      </Button>
                    </CardFooter>
                  </motion.div>
                )}
              </AnimatePresence>
            </Card>
          </motion.div>
        );
      })}

      {/* MCQ Dialog */}
      <Dialog open={dialog.open} onOpenChange={(open) => setDialog((d) => ({ ...d, open }))}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className={dialog.correct ? "text-green-600" : "text-red-600"}>
              {dialog.correct ? "Correct ✅" : "Incorrect ❌"}
            </DialogTitle>
            <DialogDescription>{dialog.message}</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={() => setDialog((d) => ({ ...d, open: false }))}>Continue</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
