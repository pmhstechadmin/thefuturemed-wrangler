import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookOpen, Clock, Users, Award, Star } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { CourseSearchBar } from "./CourseSearchBar";
import { mixpanelInstance } from "@/utils/mixpanel";
import { Hourglass } from "lucide-react";
import { RatingDisplay } from "@/components/common/StarRatingDisplay";

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
  is_paid: boolean;
  price?: number;
}

interface Profile {
  id: string;
  first_name: string;
  last_name: string;
  institution: string;
}

const resizeImagesInHtml = (html: string): string => {
  return html.replace(/<img([^>]*)>/g, (match, group1) => {
    if (/style\s*=/.test(group1)) {
      return `<img${group1.replace(
        /style\s*=\s*(['"])(.*?)\1/,
        (s, quote, styleContent) => {
          return `style=${quote}${styleContent};width:100px;${quote}`;
        }
      )}>`;
    } else {
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
  const [hoveredCourse, setHoveredCourse] = useState<string | null>(null);

  useEffect(() => {
    fetchAllCourses();
  }, []);

  useEffect(() => {
    filterCourses();
  }, [courses, searchQuery, statusFilter]);

  const fetchAllCourses = async () => {
    try {
      const { data: coursesData, error: coursesError } = await supabase
        .from("courses")
        .select("*")
        .order("created_at", { ascending: false });

      if (coursesError) throw coursesError;
      setCourses(coursesData || []);

      const creatorIds = [
        ...new Set(coursesData?.map((course) => course.creator_id) || []),
      ];
      if (creatorIds.length > 0) {
        const { data: profilesData, error: profilesError } = await supabase
          .from("profiles")
          .select("id, first_name, last_name, institution")
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
      console.error("Error fetching courses:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const filterCourses = () => {
    let filtered = courses;

    if (statusFilter !== "all") {
      filtered = filtered.filter((course) => course.status === statusFilter);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter((course) => {
        const creatorProfile = profiles[course.creator_id];
        const creatorName = creatorProfile
          ? `${creatorProfile.first_name} ${creatorProfile.last_name}`.toLowerCase()
          : "";

        return (
          course.title.toLowerCase().includes(query) ||
          course.description?.toLowerCase().includes(query) ||
          creatorName.includes(query)
        );
      });
    }

    setFilteredCourses(filtered);
  };

  // const handleCourseClick = (courseId: string) => {
  //    const slug = course.title
  //      .toLowerCase() // Convert to lowercase
  //      .trim() // Remove extra spaces
  //      .replace(/[^a-z0-9\s-]/g, "") // Remove special characters
  //      .replace(/\s+/g, "-");
  //    navigate(`/course/${slug}/${courseId}`);
  //   // navigate(`/course/${courseId}`);
  // };
  const handleCourseClick = (courseId: string, courseTitle: string) => {
  const slug = courseTitle
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-");

  navigate(`/course/${slug}/${courseId}`);
};


  const getCreatorName = (creatorId: string) => {
    const profile = profiles[creatorId];
    return profile
      ? `${profile.first_name} ${profile.last_name}`.trim() || "Unknown Creator"
      : "Unknown Creator";
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
    <div className="container mx-auto p-4 space-y-6">
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
          {filteredCourses.map((course, index) => (
            <Card
              key={course.id}
              className={`hover:shadow-xl transition-all duration-300 cursor-pointer border-0 overflow-hidden group ${
                index % 2 === 0 ? "bg-blue-50" : "bg-white"
              }`}
              onClick={() => handleCourseClick(course.id, course.title)}
            >
              {/* Header with alternating colors */}
              <div
                className={`p-4 ${
                  index % 2 === 0 ? "bg-blue-100" : "bg-gray-100"
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <Badge
                    className={`text-xs border-0 ${
                      course.status === "published"
                        ? "bg-green-100 text-green-800 hover:bg-green-200"
                        : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                    }`}
                  >
                    {course.status}
                  </Badge>
                  <div className="flex items-center space-x-1">
                    {/* <Star className="h-3 w-3 text-yellow-500 fill-current" />
                    <span className="text-xs font-medium">4.8</span> */}
                    <RatingDisplay
                      itemId={course.id}
                      itemType="course"
                      color="#4caf50"
                      size={18}
                      showText={true}
                    />
                  </div>
                </div>

                <CardTitle className="text-lg font-bold line-clamp-2 break-words">
                  {course.title}
                </CardTitle>

                <div className="mt-3 flex items-center">
                  <div
                    className={`h-8 w-8 rounded-full flex items-center justify-center text-white font-bold text-xs mr-2 ${
                      index % 2 === 0 ? "bg-blue-500" : "bg-gray-500"
                    }`}
                  >
                    {getCreatorName(course.creator_id)?.charAt(0) || "U"}
                  </div>
                  <div>
                    <p className="text-xs font-medium">
                      {getCreatorName(course.creator_id)}
                    </p>
                    <p className="text-xs opacity-80">
                      {getCreatorInstitution(course.creator_id)}
                    </p>
                  </div>
                </div>
              </div>

              <CardContent className="pt-4">
                <div
                  className="relative"
                  onMouseEnter={() => setHoveredCourse(course.id)}
                  onMouseLeave={() => setHoveredCourse(null)}
                >
                  {course.description ? (
                    <>
                      <div
                        className="prose max-w-none text-gray-800 line-clamp-2 text-xs mb-2"
                        dangerouslySetInnerHTML={{
                          __html: resizeImagesInHtml(course.description),
                        }}
                      />
                      {hoveredCourse === course.id && (
                        <div className="absolute z-10 top-full left-0 right-0 mt-1 p-3 bg-white border border-gray-200 rounded-lg shadow-lg">
                          <div
                            className="prose max-w-none text-gray-800 text-sm"
                            dangerouslySetInnerHTML={{
                              __html: resizeImagesInHtml(course.description),
                            }}
                          />
                        </div>
                      )}
                    </>
                  ) : (
                    <p className="text-gray-700 text-xs">
                      No description available for this course.
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-2 my-4">
                  <div
                    className={`flex items-center space-x-1 text-xs p-1.5 rounded-md ${
                      index % 2 === 0
                        ? "bg-blue-100 text-blue-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    <Clock className="h-3 w-3" />
                    <span>{course.duration_months} mo</span>
                  </div>
                  <div
                    className={`flex items-center space-x-1 text-xs p-1.5 rounded-md ${
                      index % 2 === 0
                        ? "bg-blue-100 text-blue-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    <BookOpen className="h-3 w-3" />
                    <span>{course.number_of_modules} mod</span>
                  </div>
                  <div
                    className={`flex items-center space-x-1 text-xs p-1.5 rounded-md ${
                      index % 2 === 0
                        ? "bg-blue-100 text-blue-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    <Users className="h-3 w-3" />
                    <span>5 students</span>
                  </div>
                  <div
                    className={`flex items-center space-x-1 text-xs p-1.5 rounded-md ${
                      index % 2 === 0
                        ? "bg-blue-100 text-blue-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    <Hourglass className="h-3 w-3" />
                    <span>
                      {course.online_hours + course.offline_hours} hours
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex space-x-1">
                    <Badge
                      variant="secondary"
                      className={`text-xs border-0 ${
                        index % 2 === 0
                          ? "bg-blue-200 text-blue-800"
                          : "bg-gray-200 text-gray-800"
                      }`}
                    >
                      Medical
                    </Badge>
                    {course.has_project && (
                      <Badge
                        variant="outline"
                        className="text-xs bg-gray-100 text-gray-800"
                      >
                        Project
                      </Badge>
                    )}
                  </div>

                  <div className="text-md font-bold">
                    {course.is_paid && course.price ? (
                      <span
                        className={
                          index % 2 === 0 ? "text-blue-700" : "text-gray-700"
                        }
                      >
                        ₹{course.price.toFixed(2)}
                        {/* ${course.price.toFixed(2)} */}
                      </span>
                    ) : (
                      <span className="text-green-600">Free</span>
                    )}
                  </div>
                </div>

                <Button
                  className={`w-full transition-all duration-300 shadow-md hover:shadow-lg border-0 text-white text-sm py-2 ${
                    index % 2 === 0
                      ? "bg-blue-600 hover:bg-blue-700"
                      : "bg-gray-600 hover:bg-gray-700"
                  }`}
                  onClick={(e) => {
                    mixpanelInstance.track("View Course Button Clicked", {
                      courseId: course.id,
                      courseTitle: course.title,
                      timestamp: new Date().toISOString(),
                    });
                    e.stopPropagation();
                    handleCourseClick(course.id, course.title);
                  }}
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
