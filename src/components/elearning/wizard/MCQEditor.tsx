
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Plus, Trash2 } from "lucide-react";
import { MCQQuestion } from "../CreateCourseWizard";

interface MCQEditorProps {
  questions: MCQQuestion[];
  onChange: (questions: MCQQuestion[]) => void;
}

export const MCQEditor = ({ questions, onChange }: MCQEditorProps) => {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const addQuestion = () => {
    const newQuestion: MCQQuestion = {
      question_text: "",
      option_a: "",
      option_b: "",
      option_c: "",
      option_d: "",
      correct_answer: "A",
      explanation: "",
    };
    onChange([...questions, newQuestion]);
    setEditingIndex(questions.length);
  };

  const updateQuestion = (index: number, updates: Partial<MCQQuestion>) => {
    const newQuestions = [...questions];
    newQuestions[index] = { ...newQuestions[index], ...updates };
    onChange(newQuestions);
  };

  const removeQuestion = (index: number) => {
    const newQuestions = questions.filter((_, i) => i !== index);
    onChange(newQuestions);
    if (editingIndex === index) {
      setEditingIndex(null);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">MCQ Questions</h3>
        <Button type="button" onClick={addQuestion} size="sm">
          <Plus className="mr-2 h-4 w-4" />
          Add Question
        </Button>
      </div>

      {questions.length === 0 ? (
        <p className="text-gray-500 text-center py-8">
          No questions added yet. Click "Add Question" to create MCQ questions for this module.
        </p>
      ) : (
        <div className="space-y-4">
          {questions.map((question, index) => (
            <Card key={index}>
              <CardHeader className="pb-3">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-base">Question {index + 1}</CardTitle>
                  <div className="flex gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setEditingIndex(editingIndex === index ? null : index)}
                    >
                      {editingIndex === index ? "Done" : "Edit"}
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeQuestion(index)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {editingIndex === index ? (
                  <div className="space-y-4">
                    <div>
                      <Label>Question Text</Label>
                      <Textarea
                        value={question.question_text}
                        onChange={(e) => updateQuestion(index, { question_text: e.target.value })}
                        placeholder="Enter your question"
                        rows={2}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <Label>Option A</Label>
                        <Input
                          value={question.option_a}
                          onChange={(e) => updateQuestion(index, { option_a: e.target.value })}
                          placeholder="Option A"
                        />
                      </div>
                      <div>
                        <Label>Option B</Label>
                        <Input
                          value={question.option_b}
                          onChange={(e) => updateQuestion(index, { option_b: e.target.value })}
                          placeholder="Option B"
                        />
                      </div>
                      <div>
                        <Label>Option C</Label>
                        <Input
                          value={question.option_c}
                          onChange={(e) => updateQuestion(index, { option_c: e.target.value })}
                          placeholder="Option C"
                        />
                      </div>
                      <div>
                        <Label>Option D</Label>
                        <Input
                          value={question.option_d}
                          onChange={(e) => updateQuestion(index, { option_d: e.target.value })}
                          placeholder="Option D"
                        />
                      </div>
                    </div>

                    <div>
                      <Label>Correct Answer</Label>
                      <RadioGroup
                        value={question.correct_answer}
                        onValueChange={(value) => updateQuestion(index, { correct_answer: value as 'A' | 'B' | 'C' | 'D' })}
                        className="flex flex-row space-x-4 mt-2"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="A" id={`${index}-a`} />
                          <Label htmlFor={`${index}-a`}>A</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="B" id={`${index}-b`} />
                          <Label htmlFor={`${index}-b`}>B</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="C" id={`${index}-c`} />
                          <Label htmlFor={`${index}-c`}>C</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="D" id={`${index}-d`} />
                          <Label htmlFor={`${index}-d`}>D</Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <div>
                      <Label>Explanation (Optional)</Label>
                      <Textarea
                        value={question.explanation}
                        onChange={(e) => updateQuestion(index, { explanation: e.target.value })}
                        placeholder="Explain why this is the correct answer"
                        rows={2}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <p className="font-medium">{question.question_text || "Question not set"}</p>
                    <div className="text-sm text-gray-600">
                      <p>A: {question.option_a || "Not set"}</p>
                      <p>B: {question.option_b || "Not set"}</p>
                      <p>C: {question.option_c || "Not set"}</p>
                      <p>D: {question.option_d || "Not set"}</p>
                      <p className="font-medium text-green-600 mt-1">
                        Correct Answer: {question.correct_answer}
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
