
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookOpen, Edit, Eye, Trash2, Users } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

interface Course {
  id: string;
  title: string;
  description: string;
  duration_months: number;
  number_of_modules: number;
  status: 'draft' | 'published' | 'archived';
  created_at: string;
  online_hours: number;
  offline_hours: number;
  has_project: boolean;
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

export const MyCourses = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();
  useEffect(() => {
    fetchMyCourses();
  }, []);

  const fetchMyCourses = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('courses')
        .select('*')
        .eq('creator_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setCourses(data || []);
    } catch (error) {
      console.error('Error fetching courses:', error);
      toast({
        title: "Error",
        description: "Failed to load your courses",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const updateCourseStatus = async (courseId: string, status: 'draft' | 'published' | 'archived') => {
    try {
      const { error } = await supabase
        .from('courses')
        .update({ status })
        .eq('id', courseId);

      if (error) throw error;

      setCourses(courses.map(course => 
        course.id === courseId ? { ...course, status } : course
      ));

      toast({
        title: "Success",
        description: `Course ${status === 'published' ? 'published' : status} successfully`,
      });
    } catch (error) {
      console.error('Error updating course:', error);
      toast({
        title: "Error",
        description: "Failed to update course status",
        variant: "destructive",
      });
    }
  };

  const deleteCourse = async (courseId: string) => {
    if (!confirm('Are you sure you want to delete this course? This action cannot be undone.')) {
      return;
    }

    try {
      const { error } = await supabase
        .from('courses')
        .delete()
        .eq('id', courseId);

      if (error) throw error;

      setCourses(courses.filter(course => course.id !== courseId));
      toast({
        title: "Success",
        description: "Course deleted successfully",
      });
    } catch (error) {
      console.error('Error deleting course:', error);
      toast({
        title: "Error",
        description: "Failed to delete course",
        variant: "destructive",
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-green-100 text-green-800';
      case 'draft': return 'bg-yellow-100 text-yellow-800';
      case 'archived': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

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
        <h2 className="text-2xl font-bold">My Courses</h2>
        <div className="text-sm text-gray-600">
          {courses.length} course{courses.length !== 1 ? "s" : ""} created
        </div>
      </div>

      {courses.length === 0 ? (
        <Card>
          <CardContent className="text-center py-12">
            <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No courses yet
            </h3>
            <p className="text-gray-600">
              Create your first course to get started!
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <Card key={course.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg line-clamp-2">
                    {course.title}
                  </CardTitle>
                  <Badge className={getStatusColor(course.status)}>
                    {course.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                {/* <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                  {course.description}
                </p> */}
                {course.description ? (
                  <div
                    className="prose max-w-none text-gray-800"
                    dangerouslySetInnerHTML={{
                      __html: resizeImagesInHtml(course.description),
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

                <div className="space-y-2 text-xs text-gray-500 mb-4">
                  <div className="flex justify-between">
                    <span>Duration:</span>
                    <span>{course.duration_months} months</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Modules:</span>
                    <span>{course.number_of_modules}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Hours:</span>
                    <span>{course.online_hours + course.offline_hours}</span>
                  </div>
                  {course.has_project && (
                    <div className="flex justify-between">
                      <span>Project:</span>
                      <span className="text-green-600">Yes</span>
                    </div>
                  )}
                </div>

                <div className="flex space-x-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1"
                    onClick={() => navigate(`/edit-course/${course.id}`)}
                  >
                    <Edit className="h-3 w-3 mr-1" />
                    Edit
                  </Button>

                  {course.status === "draft" ? (
                    <Button
                      size="sm"
                      className="flex-1"
                      onClick={() => updateCourseStatus(course.id, "published")}
                    >
                      <Eye className="h-3 w-3 mr-1" />
                      Publish
                    </Button>
                  ) : course.status === "published" ? (
                    <Button
                      size="sm"
                      variant="secondary"
                      className="flex-1"
                      onClick={() => updateCourseStatus(course.id, "archived")}
                    >
                      Archive
                    </Button>
                  ) : (
                    <Button
                      size="sm"
                      className="flex-1"
                      onClick={() => updateCourseStatus(course.id, "published")}
                    >
                      <Eye className="h-3 w-3 mr-1" />
                      Publish
                    </Button>
                  )}

                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => deleteCourse(course.id)}
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
