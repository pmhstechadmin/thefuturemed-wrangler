import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookOpen, Clock, Users, Award, Star, ArrowLeft, Filter, Home } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { CourseSearchBar } from "@/components/elearning/CourseSearchBar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
}

interface Profile {
  id: string;
  first_name: string;
  last_name: string;
  medical_specialty: string;
  degree_level: string;
}

const departmentHierarchy = [
  'Doctor',
  'Resident',
  'Medical Student',
  'Nurse',
  'Pharmacist',
  'Technician',
  'Other'
];

export const CoursesListing = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState<Course[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
  const [profiles, setProfiles] = useState<{ [key: string]: Profile }>({});
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("published");
  const [sortBy, setSortBy] = useState("duration");
  const [departmentFilter, setDepartmentFilter] = useState("all");

  useEffect(() => {
    fetchAllCourses();
  }, []);

  useEffect(() => {
    filterAndSortCourses();
  }, [courses, searchQuery, statusFilter, sortBy, departmentFilter]);

  const fetchAllCourses = async () => {
    try {
      const { data: coursesData, error: coursesError } = await supabase
        .from('courses')
        .select('*')
        .eq('status', 'published')
        .order('created_at', { ascending: false });

      if (coursesError) throw coursesError;
      setCourses(coursesData || []);

      // Fetch creator profiles
      const creatorIds = [...new Set(coursesData?.map(course => course.creator_id) || [])];
      if (creatorIds.length > 0) {
        const { data: profilesData, error: profilesError } = await supabase
          .from('profiles')
          .select('id, first_name, last_name, medical_specialty, degree_level')
          .in('id', creatorIds);

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

  const filterAndSortCourses = () => {
    let filtered = courses;

    // Filter by status
    if (statusFilter !== "all") {
      filtered = filtered.filter(course => course.status === statusFilter);
    }

    // Filter by department
    if (departmentFilter !== "all") {
      filtered = filtered.filter(course => {
        const creatorProfile = profiles[course.creator_id];
        return creatorProfile?.degree_level === departmentFilter;
      });
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
          creatorName.includes(query) ||
          creatorProfile?.medical_specialty?.toLowerCase().includes(query)
        );
      });
    }

    // Sort courses
    if (sortBy === "duration") {
      filtered.sort((a, b) => a.duration_months - b.duration_months);
    } else if (sortBy === "department") {
      filtered.sort((a, b) => {
        const aProfile = profiles[a.creator_id];
        const bProfile = profiles[b.creator_id];
        const aIndex = departmentHierarchy.indexOf(aProfile?.degree_level || 'Other');
        const bIndex = departmentHierarchy.indexOf(bProfile?.degree_level || 'Other');
        return aIndex - bIndex;
      });
    } else if (sortBy === "newest") {
      filtered.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
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

  const getCreatorCategory = (creatorId: string) => {
    const profile = profiles[creatorId];
    return profile?.degree_level || 'Not specified';
  };

  const getCreatorSpecialty = (creatorId: string) => {
    const profile = profiles[creatorId];
    return profile?.medical_specialty || 'General';
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
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
                <h1 className="text-2xl font-bold text-gray-900">
                  All Courses
                </h1>
              </Link>
            </div>
            <Button
              variant="outline"
              onClick={() => navigate("/")}
              className="hover:bg-gray-100"
              title="Go to home page"
            >
              <Home className="mr-2 h-4 w-4" />
              Home
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Browse All Courses</h2>
            <div className="text-sm text-gray-600">
              {filteredCourses.length} course
              {filteredCourses.length !== 1 ? "s" : ""} found
            </div>
          </div>

          {/* Filters and Search */}
          <div className="space-y-4">
            <CourseSearchBar
              onSearch={setSearchQuery}
              onFilterChange={setStatusFilter}
            />

            <div className="flex flex-wrap gap-4">
              <Select onValueChange={setSortBy} defaultValue="duration">
                <SelectTrigger className="w-[200px]">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="duration">
                    Duration (Short to Long)
                  </SelectItem>
                  <SelectItem value="department">
                    Department Hierarchy
                  </SelectItem>
                  <SelectItem value="newest">Newest First</SelectItem>
                </SelectContent>
              </Select>

              <Select onValueChange={setDepartmentFilter} defaultValue="all">
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Filter by department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  {departmentHierarchy.map((dept) => (
                    <SelectItem key={dept} value={dept}>
                      {dept}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

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
                    : "Check back later for new courses!"}
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
                      <div className="flex flex-wrap gap-1">
                        <Badge variant="default">Published</Badge>
                        <Badge variant="outline">
                          {getCreatorCategory(course.creator_id)}
                        </Badge>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="text-sm font-medium">4.8</span>
                      </div>
                    </div>
                    <CardTitle className="text-lg line-clamp-2">
                      {course.title}
                    </CardTitle>
                    <div className="text-sm text-gray-600 space-y-1">
                      <p>By {getCreatorName(course.creator_id)}</p>
                      <p className="text-xs">
                        Specialty: {getCreatorSpecialty(course.creator_id)}
                      </p>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                      {course.description || "No description available."}
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
                        <span>
                          {course.online_hours + course.offline_hours}h total
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mb-4">
                      <div className="flex space-x-1">
                        <Badge variant="secondary">
                          {getCreatorSpecialty(course.creator_id)}
                        </Badge>
                        {course.has_project && (
                          <Badge variant="outline">Project</Badge>
                        )}
                      </div>
                      <div className="text-lg font-bold text-blue-600">
                        ₹49.99
                      </div>
                    </div>

                    <Button
                      className="w-full"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCourseClick(course.id);
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
      </main>
    </div>
  );
};

export default CoursesListing;
