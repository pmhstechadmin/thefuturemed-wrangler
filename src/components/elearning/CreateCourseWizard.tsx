
// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Progress } from "@/components/ui/progress";
// import { CheckCircle } from "lucide-react";
// import { BasicInfoStep } from "./wizard/BasicInfoStep";
// import { ModulesStep } from "./wizard/ModulesStep";
// import { LegalAgreementStep } from "./wizard/LegalAgreementStep";
// import { ReviewSubmitStep } from "./wizard/ReviewSubmitStep";

// export interface CourseData {
//   title: string;
//   description: string;
//   duration_months: number;
//   online_hours: number;
//   offline_hours: number;
//   has_project: boolean;
//   project_description: string;
//   number_of_modules: number;
//   modules: ModuleData[];
//   privacy_policy_accepted: boolean;
//   copyright_agreement_accepted: boolean;
//   resources_summary: string;
// }

// export interface ModuleData {
//   title: string;
//   description: string;
//   content: ContentData[];
//   mcq_questions: MCQQuestion[];
// }

// export interface ContentData {
//   type: 'text' | 'pdf' | 'video';
//   title: string;
//   content?: string;
//   file?: File;
// }

// export interface MCQQuestion {
//   question_text: string;
//   option_a: string;
//   option_b: string;
//   option_c: string;
//   option_d: string;
//   correct_answer: 'A' | 'B' | 'C' | 'D';
//   explanation: string;
// }

// const steps = [
//   { id: 1, title: "Basic Information", description: "Course details and structure" },
//   { id: 2, title: "Modules & Content", description: "Create modules and add content" },
//   { id: 3, title: "Legal Agreement", description: "Privacy and copyright policies" },
//   { id: 4, title: "Review & Submit", description: "Final review and submission" },
// ];

// export const CreateCourseWizard = () => {
//   const [currentStep, setCurrentStep] = useState(1);
//   const [courseData, setCourseData] = useState<CourseData>({
//     title: "",
//     description: "",
//     duration_months: 1,
//     online_hours: 0,
//     offline_hours: 0,
//     has_project: false,
//     project_description: "",
//     number_of_modules: 1,
//     modules: [],
//     privacy_policy_accepted: false,
//     copyright_agreement_accepted: false,
//     resources_summary: "",
//   });

//   const updateCourseData = (updates: Partial<CourseData>) => {
//     setCourseData(prev => ({ ...prev, ...updates }));
//   };

//   const nextStep = () => {
//     if (currentStep < steps.length) {
//       setCurrentStep(currentStep + 1);
//     }
//   };

//   const prevStep = () => {
//     if (currentStep > 1) {
//       setCurrentStep(currentStep - 1);
//     }
//   };

//   const progressPercentage = ((currentStep - 1) / (steps.length - 1)) * 100;

//   return (
//     <div className="max-w-4xl mx-auto space-y-6">
//       <Card>
//         <CardHeader>
//           <CardTitle className="text-2xl">Create New Course</CardTitle>
//           <div className="space-y-4">
//             <Progress value={progressPercentage} className="w-full" />
//             <div className="flex justify-between">
//               {steps.map((step) => (
//                 <div
//                   key={step.id}
//                   className={`flex items-center space-x-2 ${
//                     step.id < currentStep
//                       ? "text-green-600"
//                       : step.id === currentStep
//                       ? "text-blue-600"
//                       : "text-gray-400"
//                   }`}
//                 >
//                   {step.id < currentStep ? (
//                     <CheckCircle className="h-5 w-5" />
//                   ) : (
//                     <div
//                       className={`w-5 h-5 rounded-full border-2 flex items-center justify-center text-xs ${
//                         step.id === currentStep
//                           ? "border-blue-600 bg-blue-600 text-white"
//                           : "border-gray-300"
//                       }`}
//                     >
//                       {step.id}
//                     </div>
//                   )}
//                   <div className="hidden md:block">
//                     <div className="font-medium text-sm">{step.title}</div>
//                     <div className="text-xs text-gray-500">{step.description}</div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </CardHeader>
//         <CardContent>
//           {currentStep === 1 && (
//             <BasicInfoStep
//               courseData={courseData}
//               updateCourseData={updateCourseData}
//               onNext={nextStep}
//             />
//           )}
//           {currentStep === 2 && (
//             <ModulesStep
//               courseData={courseData}
//               updateCourseData={updateCourseData}
//               onNext={nextStep}
//               onPrev={prevStep}
//             />
//           )}
//           {currentStep === 3 && (
//             <LegalAgreementStep
//               courseData={courseData}
//               updateCourseData={updateCourseData}
//               onNext={nextStep}
//               onPrev={prevStep}
//             />
//           )}
//           {currentStep === 4 && (
//             <ReviewSubmitStep
//               courseData={courseData}
//               updateCourseData={updateCourseData}
//               onPrev={prevStep}
//             />
//           )}
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// // CreateCourseWizard.tsx
// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Progress } from "@/components/ui/progress";
// import { CheckCircle } from "lucide-react";
// import { BasicInfoStep } from "./wizard/BasicInfoStep";
// import { ModulesStep } from "./wizard/ModulesStep";
// import { LegalAgreementStep } from "./wizard/LegalAgreementStep";
// import { ReviewSubmitStep } from "./wizard/ReviewSubmitStep";

// export interface CourseData {
//   title: string;
//   description: string;
//   duration_months: number;
//   online_hours: number;
//   offline_hours: number;
//   has_project: boolean;
//   project_description: string;
//   number_of_modules: number;
//   modules: ModuleData[];
//   privacy_policy_accepted: boolean;
//   copyright_agreement_accepted: boolean;
//   resources_summary: string;
// }

// export interface ModuleData {
//   title: string;
//   description: string;
//   content: ContentData[];
//   mcq_questions: MCQQuestion[];
// }

// export interface ContentData {
//   type: "text" | "pdf" | "video";
//   title: string;
//   content?: string;
//   file_url?: string;
//   file_name?: string;
//   url?: string; // ✅ Add this if you're accessing content.url
//   file_size?: number;
//   file?:string;
//   content_url?:string;
// }

// export interface MCQQuestion {
//   question_text: string;
//   option_a: string;
//   option_b: string;
//   option_c: string;
//   option_d: string;
//   correct_answer: 'A' | 'B' | 'C' | 'D';
//   explanation: string;
// }

// const steps = [
//   { id: 1, title: "Basic Information", description: "Course details and structure" },
//   { id: 2, title: "Modules & Content", description: "Create modules and add content" },
//   { id: 3, title: "Legal Agreement", description: "Privacy and copyright policies" },
//   { id: 4, title: "Review & Submit", description: "Final review and submission" },
// ];

// export const CreateCourseWizard = () => {
//   const [currentStep, setCurrentStep] = useState(1);
//   const [courseData, setCourseData] = useState<CourseData>({
//     title: "",
//     description: "",
//     duration_months: 1,
//     online_hours: 0,
//     offline_hours: 0,
//     has_project: false,
//     project_description: "",
//     number_of_modules: 1,
//     modules: [],
//     privacy_policy_accepted: false,
//     copyright_agreement_accepted: false,
//     resources_summary: "",
//   });

//   const updateCourseData = (updates: Partial<CourseData>) => {
//     setCourseData(prev => ({ ...prev, ...updates }));
//   };

//   const nextStep = () => {
//     if (currentStep < steps.length) {
//       setCurrentStep(currentStep + 1);
//     }
//   };

//   const prevStep = () => {
//     if (currentStep > 1) {
//       setCurrentStep(currentStep - 1);
//     }
//   };

//   const progressPercentage = ((currentStep - 1) / (steps.length - 1)) * 100;

//   return (
//     <div className="max-w-4xl mx-auto space-y-6">
//       <Card>
//         <CardHeader>
//           <CardTitle className="text-2xl">Create New Course</CardTitle>
//           <div className="space-y-4">
//             <Progress value={progressPercentage} className="w-full" />
//             <div className="flex justify-between">
//               {steps.map((step) => (
//                 <div
//                   key={step.id}
//                   className={`flex items-center space-x-2 ${
//                     step.id < currentStep
//                       ? "text-green-600"
//                       : step.id === currentStep
//                       ? "text-blue-600"
//                       : "text-gray-400"
//                   }`}
//                 >
//                   {step.id < currentStep ? (
//                     <CheckCircle className="h-5 w-5" />
//                   ) : (
//                     <div
//                       className={`w-5 h-5 rounded-full border-2 flex items-center justify-center text-xs ${
//                         step.id === currentStep
//                           ? "border-blue-600 bg-blue-600 text-white"
//                           : "border-gray-300"
//                       }`}
//                     >
//                       {step.id}
//                     </div>
//                   )}
//                   <div className="hidden md:block">
//                     <div className="font-medium text-sm">{step.title}</div>
//                     <div className="text-xs text-gray-500">{step.description}</div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </CardHeader>
//         <CardContent>
//           {currentStep === 1 && (
//             <BasicInfoStep
//               courseData={courseData}
//               updateCourseData={updateCourseData}
//               onNext={nextStep}
//             />
//           )}
//           {currentStep === 2 && (
//             <ModulesStep
//               courseData={courseData}
//               updateCourseData={updateCourseData}
//               onNext={nextStep}
//               onPrev={prevStep}
//             />
//           )}
//           {currentStep === 3 && (
//             <LegalAgreementStep
//               courseData={courseData}
//               updateCourseData={updateCourseData}
//               onNext={nextStep}
//               onPrev={prevStep}
//             />
//           )}
//           {currentStep === 4 && (
//             <ReviewSubmitStep
//               courseData={courseData}
//               updateCourseData={updateCourseData}
//               onPrev={prevStep}
//             />
//           )}
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// CreateCourseWizard.tsx
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CheckCircle } from "lucide-react";
import { BasicInfoStep } from "./wizard/BasicInfoStep";
import { ModulesStep } from "./wizard/ModulesStep";
import { LegalAgreementStep } from "./wizard/LegalAgreementStep";
import { ReviewSubmitStep } from "./wizard/ReviewSubmitStep";

export interface CourseData {
  title: string;
  description: string;
  is_paid: boolean; // Added field for free/paid course
  price?: number; // Optional price field for paid courses
  duration_months: number;
  online_hours: number;
  offline_hours: number;
  has_project: boolean;
  project_description: string;
  number_of_modules: number;
  modules: ModuleData[];
  privacy_policy_accepted: boolean;
  copyright_agreement_accepted: boolean;
  resources_summary: string;
}

export interface ModuleData {
  title: string;
  description: string;
  content: ContentData[];
  mcq_questions: MCQQuestion[];
}

export interface ContentData {
  type: "text" | "pdf" | "video";
  title: string;
  content?: string;
  file_url?: string;
  file_name?: string;
  url?: string;
  file_size?: number;
  file?: string;
  content_url?: string;
}

export interface MCQQuestion {
  question_text: string;
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
  correct_answer: 'A' | 'B' | 'C' | 'D';
  explanation: string;
}

const steps = [
  { id: 1, title: "Basic Information", description: "Course details and structure" },
  { id: 2, title: "Modules & Content", description: "Create modules and add content" },
  { id: 3, title: "Legal Agreement", description: "Privacy and copyright policies" },
  { id: 4, title: "Review & Submit", description: "Final review and submission" },
];

export const CreateCourseWizard = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [courseData, setCourseData] = useState<CourseData>({
    title: "",
    description: "",
    is_paid: false, // Default to free course
    price: undefined,
    duration_months: 1,
    online_hours: 0,
    offline_hours: 0,
    has_project: false,
    project_description: "",
    number_of_modules: 1,
    modules: [],
    privacy_policy_accepted: false,
    copyright_agreement_accepted: false,
    resources_summary: "",
  });
   const updateCourseData = (updates: Partial<CourseData>) => {
     setCourseData((prev) => {
       // If changing from paid to free, clear the price
       if (updates.is_paid === false) {
         return { ...prev, ...updates, price: undefined };
       }
       // If changing from free to paid, initialize price to 0 if not provided
       if (updates.is_paid === true && updates.price === undefined) {
         return { ...prev, ...updates, price: 0 };
       }
       return { ...prev, ...updates };
     });
   };

   const validateBeforeNext = () => {
     // For paid courses, ensure price is valid
     if (
       courseData.is_paid &&
       (courseData.price === undefined || courseData.price <= 0)
     ) {
       return false;
     }
     // Other required validations
     return (
       courseData.title &&
       courseData.description &&
       courseData.duration_months > 0 &&
       courseData.number_of_modules > 0
     );
   };

   const nextStep = () => {
     if (validateBeforeNext() && currentStep < steps.length) {
       setCurrentStep(currentStep + 1);
     }
   };

  // const updateCourseData = (updates: Partial<CourseData>) => {
  //   setCourseData(prev => {
  //     // If is_paid is being set to false, remove the price field
  //     if (updates.is_paid === false) {
  //       const { price, ...rest } = updates;
  //       return { ...prev, ...rest, price: undefined };
  //     }
  //     return { ...prev, ...updates };
  //   });
  // };

  // const nextStep = () => {
  //   if (currentStep < steps.length) {
  //     setCurrentStep(currentStep + 1);
  //   }
  // };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const progressPercentage = ((currentStep - 1) / (steps.length - 1)) * 100;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Create New Course</CardTitle>
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
                    <div className="text-xs text-gray-500">{step.description}</div>
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
            <ReviewSubmitStep
              courseData={courseData}
              updateCourseData={updateCourseData}
              onPrev={prevStep}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
};
