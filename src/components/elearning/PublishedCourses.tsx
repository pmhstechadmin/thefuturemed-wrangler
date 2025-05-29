
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookOpen, Clock, Users, Award, Star } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface Course {
  id: string;
  title: string;
  description: string;
  duration_months: number;
  number_of_modules: number;
  online_hours: number;
  offline_hours: number;
  has_project: boolean;
  created_at: string;
}

export const PublishedCourses = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchPublishedCourses();
  }, []);

  const fetchPublishedCourses = async () => {
    try {
      const { data, error } = await supabase
        .from('courses')
        .select('*')
        .eq('status', 'published')
        .order('created_at', { ascending: false })
        .limit(12);

      if (error) throw error;
      setCourses(data || []);
    } catch (error) {
      console.error('Error fetching courses:', error);
    } finally {
      setIsLoading(false);
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
        <h2 className="text-2xl font-bold">Available Courses</h2>
        <div className="text-sm text-gray-600">
          {courses.length} published course{courses.length !== 1 ? 's' : ''}
        </div>
      </div>

      {courses.length === 0 ? (
        <Card>
          <CardContent className="text-center py-12">
            <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No courses available</h3>
            <p className="text-gray-600">Be the first to create and publish a course!</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <Card key={course.id} className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg line-clamp-2">{course.title}</CardTitle>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium">4.8</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                  {course.description}
                </p>
                
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="flex items-center space-x-2 text-xs text-gray-500">
                    <Clock className="h-4 w-4" />
                    <span>{course.duration_months} months</span>
                  </div>
                  <div className="flex items-center space-x-2 text-xs text-gray-500">
                    <BookOpen className="h-4 w-4" />
                    <span>{course.number_of_modules} modules</span>
                  </div>
                  <div className="flex items-center space-x-2 text-xs text-gray-500">
                    <Users className="h-4 w-4" />
                    <span>156 students</span>
                  </div>
                  <div className="flex items-center space-x-2 text-xs text-gray-500">
                    <Award className="h-4 w-4" />
                    <span>{course.online_hours + course.offline_hours}h total</span>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex space-x-1">
                    <Badge variant="secondary">Medical</Badge>
                    {course.has_project && (
                      <Badge variant="outline">Project</Badge>
                    )}
                  </div>
                  <div className="text-lg font-bold text-blue-600">Free</div>
                </div>

                <Button className="w-full">
                  View Course
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
