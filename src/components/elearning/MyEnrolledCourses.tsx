
// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import { BookOpen, Clock, Users, Award, Calendar } from "lucide-react";
// import { supabase } from "@/integrations/supabase/client";

// interface EnrolledCourse {
//   id: string;
//   course_id: string;
//   enrolled_at: string;
//   payment_status: string;
//   courses: {
//     id: string;
//     title: string;
//     description: string;
//     duration_months: number;
//     number_of_modules: number;
//     online_hours: number;
//     offline_hours: number;
//     creator_id: string;
//   };
// }

// export const MyEnrolledCourses = () => {
//   const navigate = useNavigate();
//   const [enrolledCourses, setEnrolledCourses] = useState<EnrolledCourse[]>([]);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     fetchEnrolledCourses();
//   }, []);

//   const fetchEnrolledCourses = async () => {
//     try {
//       const { data: { session } } = await supabase.auth.getSession();
//       if (!session) return;

//       const { data, error } = await supabase
//         .from('course_enrollments')
//         .select(`
//           *,
//           courses (
//             id,
//             title,
//             description,
//             duration_months,
//             number_of_modules,
//             online_hours,
//             offline_hours,
//             creator_id
//           )
//         `)
//         .eq('user_id', session.user.id)
//         .eq('payment_status', 'paid')
//         .order('enrolled_at', { ascending: false });

//       if (error) throw error;
//       setEnrolledCourses(data || []);
//     } catch (error) {
//       console.error('Error fetching enrolled courses:', error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleCourseClick = (courseId: string) => {
//     navigate(`/course/${courseId}`);
//   };

//   if (isLoading) {
//     return (
//       <div className="flex justify-center items-center h-64">
//         <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-6">
//       <div className="flex justify-between items-center">
//         <h2 className="text-2xl font-bold">My Enrolled Courses</h2>
//         <div className="text-sm text-gray-600">
//           {enrolledCourses.length} course{enrolledCourses.length !== 1 ? 's' : ''} enrolled
//         </div>
//       </div>

//       {enrolledCourses.length === 0 ? (
//         <Card>
//           <CardContent className="text-center py-12">
//             <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
//             <h3 className="text-lg font-medium text-gray-900 mb-2">No enrolled courses</h3>
//             <p className="text-gray-600 mb-4">Start your learning journey by enrolling in a course!</p>
//             <Button onClick={() => navigate('/e-learning')}>Browse Courses</Button>
//           </CardContent>
//         </Card>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {enrolledCourses.map((enrollment) => (
//             <Card 
//               key={enrollment.id} 
//               className="hover:shadow-lg transition-shadow cursor-pointer border-green-200"
//               onClick={() => handleCourseClick(enrollment.courses.id)}
//             >
//               <CardHeader className="pb-3">
//                 <div className="flex justify-between items-start mb-2">
//                   <Badge variant="default" className="bg-green-100 text-green-800">
//                     Enrolled
//                   </Badge>
//                   <div className="flex items-center space-x-1 text-xs text-gray-500">
//                     <Calendar className="h-3 w-3" />
//                     <span>{new Date(enrollment.enrolled_at).toLocaleDateString()}</span>
//                   </div>
//                 </div>
//                 <CardTitle className="text-lg line-clamp-2">{enrollment.courses.title}</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <p className="text-sm text-gray-600 mb-4 line-clamp-3">
//                   {enrollment.courses.description || 'No description available.'}
//                 </p>
                
//                 <div className="grid grid-cols-2 gap-3 mb-4">
//                   <div className="flex items-center space-x-2 text-xs text-gray-500">
//                     <Clock className="h-4 w-4" />
//                     <span>{enrollment.courses.duration_months} months</span>
//                   </div>
//                   <div className="flex items-center space-x-2 text-xs text-gray-500">
//                     <BookOpen className="h-4 w-4" />
//                     <span>{enrollment.courses.number_of_modules} modules</span>
//                   </div>
//                   <div className="flex items-center space-x-2 text-xs text-gray-500">
//                     <Users className="h-4 w-4" />
//                     <span>Online: {enrollment.courses.online_hours}h</span>
//                   </div>
//                   <div className="flex items-center space-x-2 text-xs text-gray-500">
//                     <Award className="h-4 w-4" />
//                     <span>Offline: {enrollment.courses.offline_hours}h</span>
//                   </div>
//                 </div>

//                 <Button className="w-full" onClick={(e) => {
//                   e.stopPropagation();
//                   handleCourseClick(enrollment.courses.id);
//                 }}>
//                   Continue Learning
//                 </Button>
//               </CardContent>
//             </Card>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };


import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookOpen, Clock, Users, Award, Calendar } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface CourseInfo {
  id: string;
  title: string;
  description: string;
  duration_months: number;
  number_of_modules: number;
  online_hours: number;
  offline_hours: number;
  creator_id: string;
}

interface EnrolledCourse {
  id: string;
  course_id: string;
  enrolled_at: string;
  payment_status: string;
  courses: CourseInfo | null; // Allow courses to be null
}

// const removeImagesFromHtml = (html: string) => {
//   return html.replace(/<img[^>]*>/g, ""); // Removes all <img> tags
// };
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

export const MyEnrolledCourses = () => {
  const navigate = useNavigate();
  const [enrolledCourses, setEnrolledCourses] = useState<EnrolledCourse[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchEnrolledCourses();
  }, []);

  const fetchEnrolledCourses = async () => {
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) return;

      const { data, error } = await supabase
        .from("course_enrollments")
        .select(
          `
          *,
          courses (
            id,
            title,
            description,
            duration_months,
            number_of_modules,
            online_hours,
            offline_hours,
            creator_id
          )
        `
        )
        .eq("user_id", session.user.id)
        .eq("payment_status", "paid")
        .order("enrolled_at", { ascending: false });

      if (error) throw error;
      setEnrolledCourses(data || []);
    } catch (error) {
      console.error("Error fetching enrolled courses:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCourseClick = (courseId: string) => {
    navigate(`/course/${courseId}`);
  };

  // Filter out enrollments with missing courses
  const validEnrollments = enrolledCourses.filter(
    (enrollment) => enrollment.courses !== null
  );

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">My Enrolled Courses</h2>
        <div className="text-sm text-gray-600">
          {validEnrollments.length} course
          {validEnrollments.length !== 1 ? "s" : ""} enrolled
        </div>
      </div>

      {validEnrollments.length === 0 ? (
        <Card>
          <CardContent className="text-center py-12">
            <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No enrolled courses
            </h3>
            <p className="text-gray-600 mb-4">
              Start your learning journey by enrolling in a course!
            </p>
            <Button onClick={() => navigate("/e-learning")}>
              Browse Courses
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {validEnrollments.map((enrollment) => {
            // Ensure courses exists before rendering
            if (!enrollment.courses) return null;

            return (
              <Card
                key={enrollment.id}
                className="hover:shadow-lg transition-shadow cursor-pointer border-green-200"
                onClick={() => handleCourseClick(enrollment.courses!.id)}
              >
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start mb-2">
                    <Badge
                      variant="default"
                      className="bg-green-100 text-green-800"
                    >
                      Enrolled
                    </Badge>
                    <div className="flex items-center space-x-1 text-xs text-gray-500">
                      <Calendar className="h-3 w-3" />
                      <span>
                        {new Date(enrollment.enrolled_at).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <CardTitle className="text-lg line-clamp-2">
                    {enrollment.courses.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                    {/* {enrollment.courses.description ||
                      "No description available."} */}
                    {enrollment.courses.description ? (
                      <div
                        className="prose max-w-none text-gray-800"
                        dangerouslySetInnerHTML={{
                          __html: resizeImagesInHtml(
                            enrollment.courses.description
                          ),
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

                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="flex items-center space-x-2 text-xs text-gray-500">
                      <Clock className="h-4 w-4" />
                      <span>{enrollment.courses.duration_months} months</span>
                    </div>
                    <div className="flex items-center space-x-2 text-xs text-gray-500">
                      <BookOpen className="h-4 w-4" />
                      <span>
                        {enrollment.courses.number_of_modules} modules
                      </span>
                    </div>
                    <div className="flex items-center space-x-2 text-xs text-gray-500">
                      <Users className="h-4 w-4" />
                      <span>Online: {enrollment.courses.online_hours}h</span>
                    </div>
                    <div className="flex items-center space-x-2 text-xs text-gray-500">
                      <Award className="h-4 w-4" />
                      <span>Offline: {enrollment.courses.offline_hours}h</span>
                    </div>
                  </div>

                  <Button
                    className="w-full"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCourseClick(enrollment.courses!.id);
                    }}
                  >
                    Continue Learning
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};