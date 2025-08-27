// // // import { Button } from "@/components/ui/button";
// // // import { Input } from "@/components/ui/input";
// // // import { Label } from "@/components/ui/label";
// // // import { Textarea } from "@/components/ui/textarea";
// // // import { Checkbox } from "@/components/ui/checkbox";
// // // import { CourseData } from "../CreateCourseWizard";
// // // import ImageResize from "quill-image-resize-module-react";
// // // import ReactQuill, { Quill } from "react-quill";

// // // interface BasicInfoStepProps {
// // //   courseData: CourseData;
// // //   updateCourseData: (updates: Partial<CourseData>) => void;
// // //   onNext: () => void;
// // // }
// // // Quill.register("modules/imageResize", ImageResize);

// // // const modules = {
// // //   toolbar: [
// // //     [{ header: [1, 2, 3, false] }],
// // //     ["bold", "italic", "underline", "strike"],
// // //     [{ color: [] }, { background: [] }],
// // //     [{ list: "ordered" }, { list: "bullet" }],
// // //     [{ indent: "-1" }, { indent: "+1" }],
// // //     [{ align: [] }],
// // //     ["link", "image", "video"],
// // //     ["clean"],
// // //   ],
// // //   imageResize: {
// // //     parchment: Quill.import("parchment"),
// // //   },
// // // };

// // // const formats = [
// // //   "header",
// // //   "bold",
// // //   "italic",
// // //   "underline",
// // //   "strike",
// // //   "color",
// // //   "background",
// // //   "list",
// // //   "bullet",
// // //   "indent",
// // //   "align",
// // //   "link",
// // //   "image",
// // //   "video",
// // // ];

// // // export const BasicInfoStep = ({ courseData, updateCourseData, onNext }: BasicInfoStepProps) => {
// // //   const handleSubmit = (e: React.FormEvent) => {
// // //     e.preventDefault();
// // //     onNext();
// // //   };

// // //   const handleNumberInput = (field: string, value: string) => {
// // //     if (value === '') {
// // //       updateCourseData({ [field]: field === 'duration_months' || field === 'number_of_modules' ? 1 : 0 });
// // //     } else {
// // //       const numValue = parseInt(value);
// // //       if (!isNaN(numValue) && numValue >= 0) {
// // //         updateCourseData({ [field]: numValue });
// // //       }
// // //     }
// // //   };

// // //   const handleNextClick = () => {
// // //     // Ensure required fields have minimum values
// // //      console.log("🚀 Final Basic Infoaaaaaaaa:", courseData);
// // //     const updates: Partial<CourseData> = {};

// // //     if (!courseData.duration_months || courseData.duration_months < 1) {
// // //       updates.duration_months = 1;
// // //     }

// // //     if (!courseData.number_of_modules || courseData.number_of_modules < 1) {
// // //       updates.number_of_modules = 1;
// // //     }

// // //     if (Object.keys(updates).length > 0) {
// // //       updateCourseData(updates);
// // //     }

// // //     onNext();
// // //   };

// // //   const isValid = courseData.title && courseData.description &&
// // //                   courseData.duration_months > 0 && courseData.number_of_modules > 0;

// // //   return (
// // //     <form onSubmit={handleSubmit} className="space-y-6">
// // //       <div className="space-y-4">
// // //         <div>
// // //           <Label htmlFor="title">Course Title *</Label>
// // //           <Input
// // //             id="title"
// // //             value={courseData.title}
// // //             onChange={(e) => updateCourseData({ title: e.target.value })}
// // //             placeholder="Enter course title"
// // //             required
// // //           />
// // //         </div>

// // //         {/* <div>
// // //           <Label htmlFor="description">Course Description *</Label>
// // //           <Textarea
// // //             id="description"
// // //             value={courseData.description}
// // //             onChange={(e) => updateCourseData({ description: e.target.value })}
// // //             placeholder="Describe what students will learn in this course"
// // //             rows={4}
// // //             modules={modules}
// // //             formats={formats}
// // //             required
// // //           />
// // //         </div> */}
// // //         <div>
// // //           <Label htmlFor="description">Course Description *</Label>
// // //           <ReactQuill
// // //             theme="snow"
// // //             value={courseData.description}
// // //             onChange={(value) => updateCourseData({ description: value })}
// // //             modules={modules}
// // //             formats={formats}
// // //           />
// // //         </div>

// // //         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
// // //           <div>
// // //             <Label htmlFor="duration">Duration (Months) *</Label>
// // //             <Input
// // //               id="duration"
// // //               type="number"
// // //               min="1"
// // //               max="24"
// // //               value={courseData.duration_months || ""}
// // //               onChange={(e) =>
// // //                 handleNumberInput("duration_months", e.target.value)
// // //               }
// // //               placeholder="Enter duration"
// // //               required
// // //             />
// // //           </div>

// // //           <div>
// // //             <Label htmlFor="online_hours">Online Hours</Label>
// // //             <Input
// // //               id="online_hours"
// // //               type="number"
// // //               min="0"
// // //               value={courseData.online_hours || ""}
// // //               onChange={(e) =>
// // //                 handleNumberInput("online_hours", e.target.value)
// // //               }
// // //               placeholder="Enter online hours"
// // //             />
// // //           </div>

// // //           <div>
// // //             <Label htmlFor="offline_hours">Offline Hours</Label>
// // //             <Input
// // //               id="offline_hours"
// // //               type="number"
// // //               min="0"
// // //               value={courseData.offline_hours || ""}
// // //               onChange={(e) =>
// // //                 handleNumberInput("offline_hours", e.target.value)
// // //               }
// // //               placeholder="Enter offline hours"
// // //             />
// // //           </div>
// // //         </div>

// // //         <div>
// // //           <Label htmlFor="modules">Number of Modules *</Label>
// // //           <Input
// // //             id="modules"
// // //             type="number"
// // //             min="1"
// // //             max="20"
// // //             value={courseData.number_of_modules || ""}
// // //             onChange={(e) =>
// // //               handleNumberInput("number_of_modules", e.target.value)
// // //             }
// // //             placeholder="Enter number of modules"
// // //             required
// // //           />
// // //         </div>

// // //         <div className="flex items-center space-x-2">
// // //           <Checkbox
// // //             id="has_project"
// // //             checked={courseData.has_project}
// // //             onCheckedChange={(checked) =>
// // //               updateCourseData({ has_project: !!checked })
// // //             }
// // //           />
// // //           <Label htmlFor="has_project">
// // //             This course includes a final project
// // //           </Label>
// // //         </div>

// // //         {courseData.has_project && (
// // //           <div>
// // //             <Label htmlFor="project_description">Project Description</Label>
// // //             <Textarea
// // //               id="project_description"
// // //               value={courseData.project_description}
// // //               onChange={(e) =>
// // //                 updateCourseData({ project_description: e.target.value })
// // //               }
// // //               placeholder="Describe the final project requirements"
// // //               rows={3}
// // //             />
// // //           </div>
// // //         )}
// // //       </div>

// // //       <div className="flex justify-end">
// // //         <Button
// // //           type="button"
// // //           onClick={handleNextClick}
// // //           disabled={!courseData.title || !courseData.description}
// // //           className="bg-blue-600 hover:bg-blue-700"
// // //         >
// // //           Next: Create Modules
// // //         </Button>
// // //       </div>
// // //     </form>
// // //   );
// // // };

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch"; // Add this import
import { CourseData } from "../CreateCourseWizard";
import ImageResize from "quill-image-resize-module-react";
import ReactQuill, { Quill } from "react-quill";
import { mixpanelInstance } from "@/utils/mixpanel";

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

export const BasicInfoStep = ({
  courseData,
  updateCourseData,
  onNext,
}: // readOnlyPrice = false,
BasicInfoStepProps) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // onNext();
    // if (validateForm()) {
    onNext();
    // }
  };

  // const handleNumberInput = (field: string, value: string) => {
  //   if (value === '') {
  //     updateCourseData({ [field]: field === 'duration_months' || field === 'number_of_modules' ? 1 : 0 });
  //   } else {
  //     const numValue = parseInt(value);
  //     if (!isNaN(numValue) ){
  //       // Special handling for price field
  //       if (field === 'price') {
  //         updateCourseData({ [field]: numValue >= 0 ? numValue : 0 });
  //       } else {
  //         updateCourseData({ [field]: numValue >= 0 ? numValue : 0 });
  //       }
  //     }
  //   }
  // };

  // const handleNumberInput = (field: string, value: string) => {
  //   if (value === "") {
  //     updateCourseData({
  //       [field]:
  //         field === "duration_months" || field === "number_of_modules" ? 1 : 0,
  //     });
  //   } else {
  //     // Special handling for price field to allow decimals
  //     if (field === "price") {
  //       const numValue = parseFloat(value);
  //       if (!isNaN(numValue)) {
  //         updateCourseData({ [field]: numValue >= 0 ? numValue : 0 });
  //       }
  //     } else {
  //       // Other numeric fields remain as integers
  //       const numValue = parseInt(value);
  //       if (!isNaN(numValue)) {
  //         updateCourseData({ [field]: numValue >= 0 ? numValue : 0 });
  //       }
  //     }
  //   }
  // };
  const handleNumberInput = (field: string, value: string) => {
    if (value === "") {
      updateCourseData({
        [field]:
          field === "duration_months" || field === "number_of_modules" ? 1 : 0,
      });
    } else {
      // Special handling for price field to allow decimals
      if (field === "price") {
        const numValue = parseFloat(value);
        if (!isNaN(numValue)) {
          updateCourseData({ [field]: numValue >= 0 ? numValue : 0 });
        }
      } else {
        // Other numeric fields remain as integers
        const numValue = parseInt(value);
        if (!isNaN(numValue)) {
          updateCourseData({ [field]: numValue >= 0 ? numValue : 0 });
        }
      }
    }
  };
  const handlePaidToggle = (isPaid: boolean) => {
    if (isPaid) {
      updateCourseData({
        is_paid: true,
        price: courseData.price !== undefined ? courseData.price : 0,
      });
      // updateCourseData({ is_paid: true, price: 0 });
    } else {
      updateCourseData({ is_paid: false, price: undefined });
    }
  };
  //   const validateForm = () => {
  //   const errors = [];

  //   // Basic validations
  //   if (!courseData.title) errors.push("Course title is required");
  //   if (!courseData.description) errors.push("Course description is required");
  //   if (courseData.duration_months < 1) errors.push("Duration must be at least 1 month");
  //   if (courseData.number_of_modules < 1) errors.push("Must have at least 1 module");

  //   // Paid course specific validation
  //   if (courseData.is_paid) {
  //     if (courseData.price === undefined || courseData.price <= 0) {
  //       errors.push("Paid courses must have a price greater than 0");
  //     }
  //   }

  //   return errors.length === 0;
  // };

  // const handleNextClick = () => {
  //   if (validateForm()) {
  //     onNext();
  //   }
  // };

  // const isValid = validateForm();

  const handleNextClick = () => {
    // Ensure required fields have minimum values
    const updates: Partial<CourseData> = {};

    if (!courseData.duration_months || courseData.duration_months < 1) {
      updates.duration_months = 1;
    }

    if (!courseData.number_of_modules || courseData.number_of_modules < 1) {
      updates.number_of_modules = 1;
    }

    console.log("🚀 Final Basic Info:", courseData);
    // For paid courses, ensure price is set and valid
    if (courseData.is_paid) {
      if (courseData.price === undefined || courseData.price < 0) {
        updates.price = 0;
      }
    }
    // Validate price if course is paid
    // if (courseData.is_paid && (!courseData.price || courseData.price < 0)) {
    //   updates.price = 0;
    // }
    updateCourseData(updates);

    onNext();
  };

  const isValid =
    courseData.title &&
    courseData.description &&
    courseData.duration_months > 0 &&
    courseData.number_of_modules > 0 &&
    (!courseData.is_paid ||
      (courseData.price !== undefined && courseData.price >= 0));

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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="duration">Course Duration (Months) *</Label>
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
      {/* Add Paid/Free toggle and Price input */}
      {/* <div className="space-y-4 p-4 border rounded-lg bg-gray-50">
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
            (Inclusive of GST)
          </div>
        )}
      </div> */}

      <div className="space-y-4 p-4 border border-green-200 rounded-lg bg-green-50 transition-all hover:shadow-sm hover:border-green-300 focus-within:ring-2 focus-within:ring-green-200 focus-within:border-green-400">
        <div className="flex items-center justify-between">
          <div>
            <Label className="text-base font-medium text-green-800">
              Enrollment Type (Free/Paid) * (The minimum price is $0.50 / INR 50 per
              Enrollment.)
            </Label>
            <p className="text-sm text-green-600 mt-1">
              <b>Status:</b>{" "}
              {courseData.is_paid ? (
                <span className="font-semibold text-green-700">Paid</span>
              ) : (
                <span className="font-semibold text-green-600">Free</span>
              )}
            </p>
            <p className="text-xs text-green-500 mt-1">
              This setting determines whether students need to pay to enroll
            </p>
          </div>
          <Switch
            checked={courseData.is_paid}
            onCheckedChange={handlePaidToggle}
            className="data-[state=checked]:bg-green-600 data-[state=unchecked]:bg-gray-400"
          />
        </div>

        {courseData.is_paid && (
          <div className="mt-3 pl-2 border-l-2 border-green-200">
            <Label htmlFor="price" className="text-green-800">
              Price (INR) * (Please note that 25% platform fees will be
              deducted)
            </Label>
            <Input
              id="price"
              // type="number"
              type="text"
              min="0"
              value={courseData.price ?? ""}
              onChange={(e) => handleNumberInput("price", e.target.value)}
              placeholder="Enter course price"
              className="mt-1 focus:border-green-400 focus:ring-green-200"
            />
            <p className="text-xs text-green-600 mt-1">
              Please note that the default value of zero in the input field will
              be automatically replaced as you start typing a new number
            </p>
          </div>
        )}
      </div>

      <div className="flex justify-end">
        <Button
          type="button"
          onClick={() => {
            mixpanelInstance.track(
              " Next : Create Modules view Wizard  Button Clicked",
              {
                timestamp: new Date().toISOString(),
              }
            );
            handleNextClick();
          }}
          // onClick={handleNextClick}
          disabled={!isValid}
          className="bg-blue-600 hover:bg-blue-700"
        >
          Next: Create Modules
        </Button>
      </div>
    </form>
  );
};

// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Textarea } from "@/components/ui/textarea";
// import { Checkbox } from "@/components/ui/checkbox";
// import { CourseData } from "../CreateCourseWizard";
// import ImageResize from "quill-image-resize-module-react";
// import ReactQuill, { Quill } from "react-quill";
// import { Switch } from "@/components/ui/switch";

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

// export const BasicInfoStep = ({
//   courseData,
//   updateCourseData,
//   onNext,
// }: BasicInfoStepProps) => {
//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     onNext();
//   };

//   const handleNumberInput = (field: string, value: string) => {
//     if (value === "") {
//       updateCourseData({
//         [field]:
//           field === "duration_months" || field === "number_of_modules" ? 1 : 0,
//       });
//     } else {
//       const numValue = parseInt(value);
//       if (!isNaN(numValue) && numValue >= 0) {
//         updateCourseData({ [field]: numValue });
//       }
//     }
//   };

//   const handleNextClick = () => {
//     // Ensure required fields have minimum values
//     console.log("🚀 Final Basic Infoaaaaaaaa:", courseData);
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

//   const isValid =
//     courseData.title &&
//     courseData.description &&
//     courseData.duration_months > 0 &&
//     courseData.number_of_modules > 0;

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

//         <div className="space-y-4 p-4 border rounded-lg">
//           <div className="flex items-center justify-between">
//             <div>
//               <Label className="text-base font-medium">
//                 Enrollment Type (Free / Paid)
//               </Label>
//               <p className="text-sm text-muted-foreground">
//                 <b>Status :</b> &nbsp;&nbsp;
//                 {courseData.is_paid ? "Paid" : "Free"}
//               </p>
//             </div>
//             <Switch
//               checked={courseData.is_paid}
//               onCheckedChange={(value) => updateCourseData({ is_paid: value })}
//               className="data-[state=checked]:bg-blue-600"
//             />
//           </div>
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

// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Textarea } from "@/components/ui/textarea";
// import { Checkbox } from "@/components/ui/checkbox";
// import { CourseData } from "../CreateCourseWizard";
// import ImageResize from "quill-image-resize-module-react";
// import ReactQuill, { Quill } from "react-quill";
// import { Switch } from "@/components/ui/switch";

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

// export const BasicInfoStep = ({
//   courseData,
//   updateCourseData,
//   onNext,
// }: BasicInfoStepProps) => {
//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     onNext();
//   };

//   const handleNumberInput = (field: string, value: string) => {
//     if (value === "") {
//       updateCourseData({
//         [field]:
//           field === "duration_months" || field === "number_of_modules" ? 1 : 0,
//       });
//     } else {
//       const numValue = parseInt(value);
//       if (!isNaN(numValue) && numValue >= 0) {
//         updateCourseData({ [field]: numValue });
//       }
//     }
//   };

//   const handleNextClick = () => {
//     // Ensure required fields have minimum values
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

//   // Helper function to check if description has real content
//   const hasDescriptionContent = (html: string) => {
//     const text = html.replace(/<[^>]*>?/gm, "").trim();
//     return text.length > 0;
//   };

//   const isFormValid =
//     courseData.title?.trim() &&
//     hasDescriptionContent(courseData.description) &&
//     courseData.duration_months > 0 &&
//     courseData.number_of_modules > 0;

//   // Add console logs to debug form validation
//   console.log("Form validation debug:");
//   console.log(
//     "Title:",
//     courseData.title?.trim(),
//     Boolean(courseData.title?.trim())
//   );
//   console.log(
//     "Description:",
//     hasDescriptionContent(courseData.description),
//     courseData.description
//   );
//   console.log(
//     "Duration:",
//     courseData.duration_months > 0,
//     courseData.duration_months
//   );
//   console.log(
//     "Modules:",
//     courseData.number_of_modules > 0,
//     courseData.number_of_modules
//   );
//   console.log("Is form valid?", isFormValid);

//   // Check if required fields are filled
//   // const isFormValid =
//   //   courseData.title &&
//   //   courseData.description &&
//   //   courseData.duration_months > 0 &&
//   //   courseData.number_of_modules > 0;

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

//         <div className="space-y-4 p-4 border rounded-lg">
//           <div className="flex items-center justify-between">
//             <div>
//               <Label className="text-base font-medium">Enrollment Type</Label>
//               <p className="text-sm text-muted-foreground">
//                 <b>Status:</b>{" "}
//                 {courseData.is_paid ? "Paid Course" : "Free Course"}
//               </p>
//             </div>
//             <Switch
//               checked={courseData.is_paid}
//               onCheckedChange={(value) => updateCourseData({ is_paid: value })}
//               className="data-[state=checked]:bg-blue-600"
//             />
//           </div>
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
//           disabled={!isFormValid}
//           className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
//         >
//           Next: Create Modules
//         </Button>
//       </div>
//     </form>
//   );
// };



// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Textarea } from "@/components/ui/textarea";
// import { Checkbox } from "@/components/ui/checkbox";
// import { Switch } from "@/components/ui/switch";
// import ImageResize from "quill-image-resize-module-react";
// import ReactQuill, { Quill } from "react-quill";
// import { mixpanelInstance } from "@/utils/mixpanel";

// interface CourseData {
//   title: string;
//   description: string;
//   is_paid: boolean;
//   price?: number;
//   duration_months: number;
//   online_hours: number;
//   offline_hours: number;
//   has_project: boolean;
//   project_description: string;
//   number_of_modules: number;
// }

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

// export const BasicInfoStep = ({
//   courseData,
//   updateCourseData,
//   onNext,
// }: BasicInfoStepProps) => {
//   const {
//     title,
//     description,
//     is_paid,
//     price,
//     duration_months,
//     online_hours,
//     offline_hours,
//     has_project,
//     project_description,
//     number_of_modules,
//   } = courseData;

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     onNext();
//   };

//   const handleNumberInput = (field: string, value: string) => {
//     if (value === "") {
//       updateCourseData({
//         [field]:
//           field === "duration_months" || field === "number_of_modules" ? 1 : 0,
//       });
//     } else {
//       if (field === "price") {
//         const numValue = parseFloat(value);
//         if (!isNaN(numValue)) {
//           updateCourseData({ [field]: numValue >= 0 ? numValue : 0 });
//         }
//       } else {
//         const numValue = parseInt(value);
//         if (!isNaN(numValue)) {
//           updateCourseData({ [field]: numValue >= 0 ? numValue : 0 });
//         }
//       }
//     }
//   };

//   const handlePaidToggle = (isPaid: boolean) => {
//     if (isPaid) {
//       updateCourseData({
//         is_paid: true,
//         price: price !== undefined ? price : 0,
//       });
//     } else {
//       updateCourseData({ is_paid: false, price: undefined });
//     }
//   };

//   const handleNextClick = () => {
//     const updates: Partial<CourseData> = {};
//     if (!duration_months || duration_months < 1) {
//       updates.duration_months = 1;
//     }
//     if (!number_of_modules || number_of_modules < 1) {
//       updates.number_of_modules = 1;
//     }
//     if (is_paid) {
//       if (price === undefined || price < 0) {
//         updates.price = 0;
//       }
//     }
//     updateCourseData(updates);
//     onNext();
//   };

//   const isValid =
//     title &&
//     description &&
//     duration_months > 0 &&
//     number_of_modules > 0 &&
//     (!is_paid || (price !== undefined && price >= 0));

//   return (
//     <form onSubmit={handleSubmit} className="space-y-6">
//       <div className="space-y-4">
//         <div>
//           <Label htmlFor="title">Course Title *</Label>
//           <Input
//             id="title"
//             value={title}
//             onChange={(e) => updateCourseData({ title: e.target.value })}
//             placeholder="Enter course title"
//             required
//           />
//         </div>

//         <div>
//           <Label htmlFor="description">Course Description *</Label>
//           <ReactQuill
//             theme="snow"
//             value={description}
//             onChange={(value) => updateCourseData({ description: value })}
//             modules={modules}
//             formats={formats}
//           />
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//           <div>
//             <Label htmlFor="duration">Course Duration (Months) *</Label>
//             <Input
//               id="duration"
//               type="number"
//               min="1"
//               max="24"
//               value={duration_months || ""}
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
//               value={online_hours || ""}
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
//               value={offline_hours || ""}
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
//             value={number_of_modules || ""}
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
//             checked={has_project}
//             onCheckedChange={(checked) =>
//               updateCourseData({ has_project: !!checked })
//             }
//           />
//           <Label htmlFor="has_project">
//             This course includes a final project
//           </Label>
//         </div>

//         {has_project && (
//           <div>
//             <Label htmlFor="project_description">Project Description</Label>
//             <Textarea
//               id="project_description"
//               value={project_description}
//               onChange={(e) =>
//                 updateCourseData({ project_description: e.target.value })
//               }
//               placeholder="Describe the final project requirements"
//               rows={3}
//             />
//           </div>
//         )}
//       </div>

//       <div className="space-y-4 p-4 border border-green-200 rounded-lg bg-green-50 transition-all hover:shadow-sm hover:border-green-300 focus-within:ring-2 focus-within:ring-green-200 focus-within:border-green-400">
//         <div className="flex items-center justify-between">
//           <div>
//             <Label className="text-base font-medium text-green-800">
//               Enrollment Type (Free/Paid) *
//             </Label>
//             <p className="text-sm text-green-600 mt-1">
//               <b>Status:</b>{" "}
//               {is_paid ? (
//                 <span className="font-semibold text-green-700">Paid</span>
//               ) : (
//                 <span className="font-semibold text-green-600">Free</span>
//               )}
//             </p>
//             <p className="text-xs text-green-500 mt-1">
//               This setting determines whether students need to pay to enroll
//             </p>
//           </div>
//           <Switch
//             checked={is_paid}
//             onCheckedChange={handlePaidToggle}
//             className="data-[state=checked]:bg-green-600 data-[state=unchecked]:bg-gray-400"
//           />
//         </div>

//         {is_paid && (
//           <div className="mt-3 pl-2 border-l-2 border-green-200">
//             <Label htmlFor="price" className="text-green-800">
//               Price (INR) * (Please note that 25% platform fees will be
//               deducted)
//             </Label>
//             <Input
//               id="price"
//               type="number"
//               min="0"
//               value={price !== undefined && price !== null ? price : ""}
//               onChange={(e) => handleNumberInput("price", e.target.value)}
//               placeholder="Enter course price"
//               className="mt-1 focus:border-green-400 focus:ring-green-200"
//               required={is_paid}
//             />
//             <p className="text-xs text-green-600 mt-1">
//               Please note that the default value of zero in the input field will
//               be automatically replaced as you start typing a new number
//             </p>
//           </div>
//         )}
//       </div>

//       <div className="flex justify-end">
//         <Button
//           type="button"
//           onClick={() => {
//             mixpanelInstance.track(
//               " Next : Create Modules view Wizard  Button Clicked",
//               {
//                 timestamp: new Date().toISOString(),
//               }
//             );
//             handleNextClick();
//           }}
//           disabled={!isValid}
//           className="bg-blue-600 hover:bg-blue-700"
//         >
//           Next: Create Modules
//         </Button>
//       </div>
//     </form>
//   );
// };