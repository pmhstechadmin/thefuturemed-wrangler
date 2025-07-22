
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Textarea } from "@/components/ui/textarea";
// import { Checkbox } from "@/components/ui/checkbox";
// import { CourseData } from "../CreateCourseWizard";
// import ImageResize from "quill-image-resize-module-react";
// import ReactQuill, { Quill } from "react-quill";

// interface BasicInfoStepProps {
//   courseData: CourseData;
//   updateCourseData: (updates: Partial<CourseData>) => void;
//   onNext: () => void;
// }
// Quill.register("modules/imageResize", ImageResize);

// const modules = {
//   toolbar: [
//     [{ header: [1, 2, 3, false] }],
//     ["bold", "italic", "underline", "strike"],
//     [{ color: [] }, { background: [] }],
//     [{ list: "ordered" }, { list: "bullet" }],
//     [{ indent: "-1" }, { indent: "+1" }],
//     [{ align: [] }],
//     ["link", "image", "video"],
//     ["clean"],
//   ],
//   imageResize: {
//     parchment: Quill.import("parchment"),
//   },
// };

// const formats = [
//   "header",
//   "bold",
//   "italic",
//   "underline",
//   "strike",
//   "color",
//   "background",
//   "list",
//   "bullet",
//   "indent",
//   "align",
//   "link",
//   "image",
//   "video",
// ];

// export const BasicInfoStep = ({ courseData, updateCourseData, onNext }: BasicInfoStepProps) => {
//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     onNext();
//   };

//   const handleNumberInput = (field: string, value: string) => {
//     if (value === '') {
//       updateCourseData({ [field]: field === 'duration_months' || field === 'number_of_modules' ? 1 : 0 });
//     } else {
//       const numValue = parseInt(value);
//       if (!isNaN(numValue) && numValue >= 0) {
//         updateCourseData({ [field]: numValue });
//       }
//     }
//   };

//   const handleNextClick = () => {
//     // Ensure required fields have minimum values
//      console.log("🚀 Final Basic Infoaaaaaaaa:", courseData);
//     const updates: Partial<CourseData> = {};
    
//     if (!courseData.duration_months || courseData.duration_months < 1) {
//       updates.duration_months = 1;
//     }
    
//     if (!courseData.number_of_modules || courseData.number_of_modules < 1) {
//       updates.number_of_modules = 1;
//     }
    
//     if (Object.keys(updates).length > 0) {
//       updateCourseData(updates);
//     }
    
//     onNext();
//   };

//   const isValid = courseData.title && courseData.description && 
//                   courseData.duration_months > 0 && courseData.number_of_modules > 0;

//   return (
//     <form onSubmit={handleSubmit} className="space-y-6">
//       <div className="space-y-4">
//         <div>
//           <Label htmlFor="title">Course Title *</Label>
//           <Input
//             id="title"
//             value={courseData.title}
//             onChange={(e) => updateCourseData({ title: e.target.value })}
//             placeholder="Enter course title"
//             required
//           />
//         </div>

//         {/* <div>
//           <Label htmlFor="description">Course Description *</Label>
//           <Textarea
//             id="description"
//             value={courseData.description}
//             onChange={(e) => updateCourseData({ description: e.target.value })}
//             placeholder="Describe what students will learn in this course"
//             rows={4}
//             modules={modules}
//             formats={formats}
//             required
//           />
//         </div> */}
//         <div>
//           <Label htmlFor="description">Course Description *</Label>
//           <ReactQuill
//             theme="snow"
//             value={courseData.description}
//             onChange={(value) => updateCourseData({ description: value })}
//             modules={modules}
//             formats={formats}
//           />
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//           <div>
//             <Label htmlFor="duration">Duration (Months) *</Label>
//             <Input
//               id="duration"
//               type="number"
//               min="1"
//               max="24"
//               value={courseData.duration_months || ""}
//               onChange={(e) =>
//                 handleNumberInput("duration_months", e.target.value)
//               }
//               placeholder="Enter duration"
//               required
//             />
//           </div>

//           <div>
//             <Label htmlFor="online_hours">Online Hours</Label>
//             <Input
//               id="online_hours"
//               type="number"
//               min="0"
//               value={courseData.online_hours || ""}
//               onChange={(e) =>
//                 handleNumberInput("online_hours", e.target.value)
//               }
//               placeholder="Enter online hours"
//             />
//           </div>

//           <div>
//             <Label htmlFor="offline_hours">Offline Hours</Label>
//             <Input
//               id="offline_hours"
//               type="number"
//               min="0"
//               value={courseData.offline_hours || ""}
//               onChange={(e) =>
//                 handleNumberInput("offline_hours", e.target.value)
//               }
//               placeholder="Enter offline hours"
//             />
//           </div>
//         </div>

//         <div>
//           <Label htmlFor="modules">Number of Modules *</Label>
//           <Input
//             id="modules"
//             type="number"
//             min="1"
//             max="20"
//             value={courseData.number_of_modules || ""}
//             onChange={(e) =>
//               handleNumberInput("number_of_modules", e.target.value)
//             }
//             placeholder="Enter number of modules"
//             required
//           />
//         </div>

//         <div className="flex items-center space-x-2">
//           <Checkbox
//             id="has_project"
//             checked={courseData.has_project}
//             onCheckedChange={(checked) =>
//               updateCourseData({ has_project: !!checked })
//             }
//           />
//           <Label htmlFor="has_project">
//             This course includes a final project
//           </Label>
//         </div>

//         {courseData.has_project && (
//           <div>
//             <Label htmlFor="project_description">Project Description</Label>
//             <Textarea
//               id="project_description"
//               value={courseData.project_description}
//               onChange={(e) =>
//                 updateCourseData({ project_description: e.target.value })
//               }
//               placeholder="Describe the final project requirements"
//               rows={3}
//             />
//           </div>
//         )}
//       </div>

//       <div className="flex justify-end">
//         <Button
//           type="button"
//           onClick={handleNextClick}
//           disabled={!courseData.title || !courseData.description}
//           className="bg-blue-600 hover:bg-blue-700"
//         >
//           Next: Create Modules
//         </Button>
//       </div>
//     </form>
//   );
// };


import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch"; // Add this import
import { CourseData } from "../CreateCourseWizard";
import ImageResize from "quill-image-resize-module-react";
import ReactQuill, { Quill } from "react-quill";

interface BasicInfoStepProps {
  courseData: CourseData;
  updateCourseData: (updates: Partial<CourseData>) => void;
  onNext: () => void;
}

Quill.register("modules/imageResize", ImageResize);

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    ["bold", "italic", "underline", "strike"],
    [{ color: [] }, { background: [] }],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ indent: "-1" }, { indent: "+1" }],
    [{ align: [] }],
    ["link", "image", "video"],
    ["clean"],
  ],
  imageResize: {
    parchment: Quill.import("parchment"),
  },
};

const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "color",
  "background",
  "list",
  "bullet",
  "indent",
  "align",
  "link",
  "image",
  "video",
];

export const BasicInfoStep = ({ courseData, updateCourseData, onNext }: BasicInfoStepProps) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // onNext();
    if (validateForm()) {
      onNext();
    }
  };

  const handleNumberInput = (field: string, value: string) => {
    if (value === '') {
      updateCourseData({ [field]: field === 'duration_months' || field === 'number_of_modules' ? 1 : 0 });
    } else {
      const numValue = parseInt(value);
      if (!isNaN(numValue) ){
        // Special handling for price field
        if (field === 'price') {
          updateCourseData({ [field]: numValue >= 0 ? numValue : 0 });
        } else {
          updateCourseData({ [field]: numValue >= 0 ? numValue : 0 });
        }
      }
    }
  };

  const handlePaidToggle = (isPaid: boolean) => {
    if (isPaid) {
      updateCourseData({ is_paid: true, price: 0 });
    } else {
      updateCourseData({ is_paid: false, price: undefined });
    }
  };
    const validateForm = () => {
      const errors = [];

      // Basic validations
      if (!courseData.title) errors.push("Course title is required");
      if (!courseData.description)
        errors.push("Course description is required");
      if (courseData.duration_months < 1)
        errors.push("Duration must be at least 1 month");
      if (courseData.number_of_modules < 1)
        errors.push("Must have at least 1 module");

      // Paid course specific validation
      if (courseData.is_paid) {
        if (courseData.price === undefined || courseData.price <= 0) {
          errors.push("Paid courses must have a price greater than 0");
        }
      }

      return errors.length === 0;
    };

    const handleNextClick = () => {
      if (validateForm()) {
        onNext();
      }
    };

    const isValid = validateForm();

  // const handleNextClick = () => {
  //   // Ensure required fields have minimum values
  //   const updates: Partial<CourseData> = {};
    
  //   if (!courseData.duration_months || courseData.duration_months < 1) {
  //     updates.duration_months = 1;
  //   }
    
  //   if (!courseData.number_of_modules || courseData.number_of_modules < 1) {
  //     updates.number_of_modules = 1;
  //   }
    
  //   // Validate price if course is paid
  //   if (courseData.is_paid && (!courseData.price || courseData.price < 0)) {
  //     updates.price = 0;
  //   }
    
  //   if (Object.keys(updates).length > 0) {
  //     updateCourseData(updates);
  //   }
    
  //   onNext();
  // };

  // const isValid = courseData.title && courseData.description && 
  //                courseData.duration_months > 0 && courseData.number_of_modules > 0 &&
  //                (!courseData.is_paid || (courseData.price !== undefined && courseData.price >= 0));

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
          <ReactQuill
            theme="snow"
            value={courseData.description}
            onChange={(value) => updateCourseData({ description: value })}
            modules={modules}
            formats={formats}
          />
        </div>

        {/* Add Paid/Free toggle and Price input */}
        <div className="space-y-4 p-4 border rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-base font-medium">
                Enrollment Type ( Free / Paid )
              </Label>
              <p className="text-sm text-muted-foreground">
                {" "}
                <b>Status :</b> &nbsp;&nbsp;
                {courseData.is_paid ? "Paid" : "Free"}
              </p>
            </div>
            <Switch
              checked={courseData.is_paid}
              onCheckedChange={handlePaidToggle}
              className="data-[state=checked]:bg-blue-600"
            />
          </div>

          {courseData.is_paid && (
            <div>
              <Label htmlFor="price">Price (INR) *</Label>
              <Input
                id="price"
                type="number"
                min="0"
                value={courseData.price ?? ""}
                onChange={(e) => handleNumberInput("price", e.target.value)}
                placeholder="Enter course price"
                required={courseData.is_paid}
              />
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="duration">Duration (Months) *</Label>
            <Input
              id="duration"
              type="number"
              min="1"
              max="24"
              value={courseData.duration_months || ""}
              onChange={(e) =>
                handleNumberInput("duration_months", e.target.value)
              }
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
              value={courseData.online_hours || ""}
              onChange={(e) =>
                handleNumberInput("online_hours", e.target.value)
              }
              placeholder="Enter online hours"
            />
          </div>

          <div>
            <Label htmlFor="offline_hours">Offline Hours</Label>
            <Input
              id="offline_hours"
              type="number"
              min="0"
              value={courseData.offline_hours || ""}
              onChange={(e) =>
                handleNumberInput("offline_hours", e.target.value)
              }
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
            value={courseData.number_of_modules || ""}
            onChange={(e) =>
              handleNumberInput("number_of_modules", e.target.value)
            }
            placeholder="Enter number of modules"
            required
          />
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="has_project"
            checked={courseData.has_project}
            onCheckedChange={(checked) =>
              updateCourseData({ has_project: !!checked })
            }
          />
          <Label htmlFor="has_project">
            This course includes a final project
          </Label>
        </div>

        {courseData.has_project && (
          <div>
            <Label htmlFor="project_description">Project Description</Label>
            <Textarea
              id="project_description"
              value={courseData.project_description}
              onChange={(e) =>
                updateCourseData({ project_description: e.target.value })
              }
              placeholder="Describe the final project requirements"
              rows={3}
            />
          </div>
        )}
      </div>

      <div className="flex justify-end">
        <Button
          type="button"
          onClick={handleNextClick}
          disabled={!isValid}
          className="bg-blue-600 hover:bg-blue-700"
        >
          Next: Create Modules
        </Button>
      </div>
    </form>
  );
};