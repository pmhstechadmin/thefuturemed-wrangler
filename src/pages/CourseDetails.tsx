
import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, BookOpen, Clock, Users, Award, Star, Play, FileText } from "lucide-react";
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
  creator_id: string;
  status: string;
  project_description?: string;
  resources_summary?: string;
}

interface Profile {
  first_name: string;
  last_name: string;
}

const CourseDetails = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState<Course | null>(null);
  const [creatorProfile, setCreatorProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEnrolled, setIsEnrolled] = useState(false);

  useEffect(() => {
    if (courseId) {
      fetchCourseDetails();
    }
  }, [courseId]);

  const fetchCourseDetails = async () => {
    try {
      const { data: courseData, error: courseError } = await supabase
        .from('courses')
        .select('*')
        .eq('id', courseId)
        .single();

      if (courseError) throw courseError;
      setCourse(courseData);

      // Fetch creator profile
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('first_name, last_name')
        .eq('id', courseData.creator_id)
        .single();

      if (!profileError) {
        setCreatorProfile(profileData);
      }

    } catch (error) {
      console.error('Error fetching course details:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEnrollment = () => {
    // TODO: Implement enrollment logic with payment if needed
    console.log('Enrolling in course:', courseId);
    setIsEnrolled(true);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Course Not Found</h2>
          <Link to="/e-learning">
            <Button>Back to Courses</Button>
          </Link>
        </div>
      </div>
    );
  }

  const creatorName = creatorProfile 
    ? `${creatorProfile.first_name} ${creatorProfile.last_name}`.trim() || 'Unknown Creator'
    : 'Unknown Creator';

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              size="icon"
              onClick={() => navigate(-1)}
              className="hover:bg-gray-100"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            
            <Link to="/e-learning" className="flex items-center space-x-2">
              <BookOpen className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">MedPortal E-Learning</h1>
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Course Content */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Badge variant={course.status === 'published' ? 'default' : 'secondary'}>
                  {course.status}
                </Badge>
                <Badge variant="outline">Medical</Badge>
                {course.has_project && <Badge variant="outline">Project Included</Badge>}
              </div>
              
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{course.title}</h1>
              
              <div className="flex items-center space-x-6 text-sm text-gray-600 mb-6">
                <div className="flex items-center space-x-1">
                  <Users className="h-4 w-4" />
                  <span>Created by {creatorName}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span>4.8 (156 reviews)</span>
                </div>
              </div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Course Description</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">
                  {course.description || 'No description available for this course.'}
                </p>
              </CardContent>
            </Card>

            {course.project_description && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <FileText className="h-5 w-5" />
                    <span>Project Details</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">{course.project_description}</p>
                </CardContent>
              </Card>
            )}

            {course.resources_summary && (
              <Card>
                <CardHeader>
                  <CardTitle>Resources & Materials</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">{course.resources_summary}</p>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Enrollment Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <div className="text-3xl font-bold text-blue-600 mb-2">Free</div>
                  <p className="text-sm text-gray-600">Full access to all content</p>
                </div>

                <Button 
                  className="w-full mb-4" 
                  size="lg"
                  onClick={handleEnrollment}
                  disabled={isEnrolled}
                >
                  {isEnrolled ? 'Enrolled' : 'Enroll Now'}
                </Button>

                <div className="space-y-3 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center space-x-2">
                      <Clock className="h-4 w-4" />
                      <span>Duration</span>
                    </span>
                    <span>{course.duration_months} months</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="flex items-center space-x-2">
                      <BookOpen className="h-4 w-4" />
                      <span>Modules</span>
                    </span>
                    <span>{course.number_of_modules}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="flex items-center space-x-2">
                      <Play className="h-4 w-4" />
                      <span>Online Hours</span>
                    </span>
                    <span>{course.online_hours}h</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="flex items-center space-x-2">
                      <Users className="h-4 w-4" />
                      <span>Offline Hours</span>
                    </span>
                    <span>{course.offline_hours}h</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="flex items-center space-x-2">
                      <Award className="h-4 w-4" />
                      <span>Certificate</span>
                    </span>
                    <span>Included</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Course Instructor</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <Users className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold">{creatorName}</h4>
                    <p className="text-sm text-gray-600">Medical Educator</p>
                  </div>
                </div>
                <p className="text-sm text-gray-700">
                  Experienced medical professional with expertise in clinical education and research.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CourseDetails;
