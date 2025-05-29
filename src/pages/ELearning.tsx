
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Plus, Users, Award, TrendingUp, ArrowLeft, ArrowRight } from "lucide-react";
import { CreateCourseWizard } from "@/components/elearning/CreateCourseWizard";
import { MyCourses } from "@/components/elearning/MyCourses";
import { PublishedCourses } from "@/components/elearning/PublishedCourses";
import { MyEnrolledCourses } from "@/components/elearning/MyEnrolledCourses";

const ELearning = () => {
  const [activeTab, setActiveTab] = useState<"browse" | "create" | "my-courses" | "enrolled">("browse");
  const navigate = useNavigate();

  const handleBackNavigation = () => {
    navigate(-1); // Go back to previous page
  };

  const handleForwardNavigation = () => {
    navigate(1); // Go forward to next page
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {/* Navigation Arrows */}
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleBackNavigation}
                  className="hover:bg-gray-100"
                  title="Go back"
                >
                  <ArrowLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleForwardNavigation}
                  className="hover:bg-gray-100"
                  title="Go forward"
                >
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
              
              <Link to="/" className="flex items-center space-x-2">
                <BookOpen className="h-8 w-8 text-blue-600" />
                <h1 className="text-2xl font-bold text-gray-900">MedPortal E-Learning</h1>
              </Link>
            </div>
            <nav className="flex space-x-4">
              <Button
                variant={activeTab === "browse" ? "default" : "outline"}
                onClick={() => setActiveTab("browse")}
              >
                Browse Courses
              </Button>
              <Button
                variant={activeTab === "enrolled" ? "default" : "outline"}
                onClick={() => setActiveTab("enrolled")}
              >
                My Enrolled Courses
              </Button>
              <Button
                variant={activeTab === "create" ? "default" : "outline"}
                onClick={() => setActiveTab("create")}
              >
                <Plus className="mr-2 h-4 w-4" />
                Create Course
              </Button>
              <Button
                variant={activeTab === "my-courses" ? "default" : "outline"}
                onClick={() => setActiveTab("my-courses")}
              >
                My Courses
              </Button>
            </nav>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {activeTab === "browse" && (
          <div className="space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Courses</CardTitle>
                  <BookOpen className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">156</div>
                  <p className="text-xs text-muted-foreground">+12% from last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Learners</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">2,847</div>
                  <p className="text-xs text-muted-foreground">+18% from last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Certificates Issued</CardTitle>
                  <Award className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">1,234</div>
                  <p className="text-xs text-muted-foreground">+8% from last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">89.2%</div>
                  <p className="text-xs text-muted-foreground">+2.1% from last month</p>
                </CardContent>
              </Card>
            </div>

            <PublishedCourses />
          </div>
        )}

        {activeTab === "enrolled" && <MyEnrolledCourses />}
        {activeTab === "create" && <CreateCourseWizard />}
        {activeTab === "my-courses" && <MyCourses />}
      </main>
    </div>
  );
};

export default ELearning;
