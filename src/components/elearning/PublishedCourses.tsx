
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookOpen, Clock, Users, Award, Star } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { CourseSearchBar } from "./CourseSearchBar";
import { mixpanelInstance } from "@/utils/mixpanel";

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
  is_paid: boolean; // true for paid, false for free
  price?: number;
}

interface Profile {
  id: string;
  first_name: string;
  last_name: string;
  institution:string;
}
const removeImagesFromHtml = (html: string) => {
  return html.replace(/<img[^>]*>/g, ""); // Removes all <img> tags
};
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
export const PublishedCourses = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState<Course[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
  const [profiles, setProfiles] = useState<{ [key: string]: Profile }>({});
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    fetchAllCourses();
  }, []);

  useEffect(() => {
    filterCourses();
  }, [courses, searchQuery, statusFilter]);

  const fetchAllCourses = async () => {
    try {
      // Fetch all courses (not just published ones)
      const { data: coursesData, error: coursesError } = await supabase
        .from('courses')
        .select('*')
        .order('created_at', { ascending: false });

      if (coursesError) throw coursesError;
      setCourses(coursesData || []);

      // Fetch creator profiles
      const creatorIds = [...new Set(coursesData?.map(course => course.creator_id) || [])];
      if (creatorIds.length > 0) {
        const { data: profilesData, error: profilesError } = await supabase
          .from("profiles")
          .select("id, first_name, last_name,institution")
          .in("id", creatorIds);

        if (!profilesError && profilesData) {
          const profilesMap = profilesData.reduce((acc, profile) => {
            acc[profile.id] = profile;
            return acc;
          }, {} as { [key: string]: Profile });
          setProfiles(profilesMap);
        }
      }
    } catch (error) {
      console.error('Error fetching courses:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filterCourses = () => {
    let filtered = courses;

    // Filter by status
    if (statusFilter !== "all") {
      filtered = filtered.filter(course => course.status === statusFilter);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(course => {
        const creatorProfile = profiles[course.creator_id];
        const creatorName = creatorProfile 
          ? `${creatorProfile.first_name} ${creatorProfile.last_name}`.toLowerCase()
          : '';
        
        return (
          course.title.toLowerCase().includes(query) ||
          course.description?.toLowerCase().includes(query) ||
          creatorName.includes(query)
        );
      });
    }

    setFilteredCourses(filtered);
  };

  const handleCourseClick = (courseId: string) => {
    navigate(`/course/${courseId}`);
  };

  const getCreatorName = (creatorId: string) => {
    const profile = profiles[creatorId];
    return profile 
      ? `${profile.first_name} ${profile.last_name}`.trim() || 'Unknown Creator'
      : 'Unknown Creator';
  };
  const getCreatorInstitution = (creatorId: string) => {
    const profile = profiles[creatorId];
    return profile?.institution || "Not specified";
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
        <h2 className="text-2xl font-bold">All Courses</h2>
        <div className="text-sm text-gray-600">
          {filteredCourses.length} course
          {filteredCourses.length !== 1 ? "s" : ""} found
        </div>
      </div>

      <CourseSearchBar
        onSearch={setSearchQuery}
        onFilterChange={setStatusFilter}
      />

      {filteredCourses.length === 0 ? (
        <Card>
          <CardContent className="text-center py-12">
            <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {searchQuery ? "No courses found" : "No courses available"}
            </h3>
            <p className="text-gray-600">
              {searchQuery
                ? "Try adjusting your search criteria or filters."
                : "Be the first to create and publish a course!"}
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <Card
              key={course.id}
              className="hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => handleCourseClick(course.id)}
            >
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start mb-2">
                  <Badge
                    className="text-sm bg-blue-100 text-800"
                    variant={
                      course.status === "published" ? "default" : "secondary"
                    }
                  >
                    {course.status}
                  </Badge>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium">4.8</span>
                  </div>
                </div>
                <CardTitle className="text-lg line-clamp-2">
                  {course.title}
                </CardTitle>
                <p className="text-sm text-gray-600">
                  By {getCreatorName(course.creator_id)}
                  <span className="block">from {getCreatorInstitution(course.creator_id)}</span>
                </p>
              </CardHeader>
              <CardContent>
                {/* <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                  {course.description || 'No description available.'}
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
                    <span>
                      {course.online_hours + course.offline_hours}h total
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex space-x-1">
                    <Badge
                      variant="secondary"
                      className="text-sm bg-blue-100 text-800"
                    >
                      Medical
                    </Badge>
                    {course.has_project && (
                      <Badge variant="outline">Project</Badge>
                    )}
                  </div>
                  <div className="text-lg font-bold text-blue-600">
                    {course.is_paid ? "Paid" : "Free"}
                  </div>
                  {/* <div className="text-lg font-bold text-blue-600">Paid</div> */}
                  {/* <div className="text-lg font-bold text-blue-600">Free</div> */}
                </div>

                <Button
                  className="w-full"
                  onClick={(e) => {
                    mixpanelInstance.track(
                      " View Course view elarning Button Clicked",
                      {
                        timestamp: new Date().toISOString(),
                      }
                    );
                    e.stopPropagation();
                    handleCourseClick(course.id);
                  }}
                  // onClick={(e) => {
                  //   e.stopPropagation();
                  //   handleCourseClick(course.id);
                  // }}
                >
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
