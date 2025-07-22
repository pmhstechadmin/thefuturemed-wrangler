// import { useState } from "react";
// import { Link, useNavigate, useLocation } from "react-router-dom";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { BookOpen, Plus, Users, Award, TrendingUp, ArrowLeft, ArrowRight, Search, Home } from "lucide-react";
// import { CreateCourseWizard } from "@/components/elearning/CreateCourseWizard";
// import { MyCourses } from "@/components/elearning/MyCourses";
// import { PublishedCourses } from "@/components/elearning/PublishedCourses";
// import { MyEnrolledCourses } from "@/components/elearning/MyEnrolledCourses";

// const ELearning = () => {
//   const [activeTab, setActiveTab] = useState<"browse" | "create" | "my-courses" | "enrolled">("browse");
//   const navigate = useNavigate();
//   const location = useLocation();

//   const handleBackNavigation = () => {
//     // Check if there's history to go back to
//     if (window.history.length > 1) {
//       navigate(-1);
//     } else {
//       // If no history, navigate to home page
//       navigate('/');
//     }
//   };

//   const handleForwardNavigation = () => {
//     // Check if there's history to go forward to
//     try {
//       navigate(1);
//     } catch (error) {
//       // If forward navigation fails, stay on current page
//       console.log('No forward history available');
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
//       {/* Header */}
//       <header className="bg-white shadow-sm border-b">
//         <div className="container mx-auto px-4 py-4">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center space-x-4">
//               {/* Navigation Arrows */}
//               <div className="flex items-center space-x-2">
//                 <Button
//                   variant="outline"
//                   size="icon"
//                   onClick={handleBackNavigation}
//                   className="hover:bg-gray-100"
//                   title="Go back"
//                 >
//                   <ArrowLeft className="h-4 w-4" />
//                 </Button>
//                 <Button
//                   variant="outline"
//                   size="icon"
//                   onClick={handleForwardNavigation}
//                   className="hover:bg-gray-100"
//                   title="Go forward"
//                 >
//                   <ArrowRight className="h-4 w-4" />
//                 </Button>
//               </div>

//               <Link to="/" className="flex items-center space-x-2">
//                 <BookOpen className="h-8 w-8 text-blue-600" />
//                 <h1 className="text-2xl font-bold text-gray-900">MedPortal E-Learning</h1>
//               </Link>
//             </div>
//             <div className="flex items-center space-x-4">
//               <Button
//                 variant="outline"
//                 onClick={() => navigate('/')}
//                 className="hover:bg-gray-100"
//                 title="Go to home page"
//               >
//                 <Home className="mr-2 h-4 w-4" />
//                 Home
//               </Button>
//               <nav className="flex space-x-4">
//                 <Button
//                   variant={activeTab === "browse" ? "default" : "outline"}
//                   onClick={() => setActiveTab("browse")}
//                 >
//                   Browse Courses
//                 </Button>
//                 <Button
//                   variant={activeTab === "enrolled" ? "default" : "outline"}
//                   onClick={() => setActiveTab("enrolled")}
//                 >
//                   My Enrolled Courses
//                 </Button>
//                 <Button
//                   variant={activeTab === "create" ? "default" : "outline"}
//                   onClick={() => setActiveTab("create")}
//                 >
//                   <Plus className="mr-2 h-4 w-4" />
//                   Create Course
//                 </Button>
//                 <Button
//                   variant={activeTab === "my-courses" ? "default" : "outline"}
//                   onClick={() => setActiveTab("my-courses")}
//                 >
//                   My Courses
//                 </Button>
//               </nav>
//             </div>
//           </div>
//         </div>
//       </header>

//       <main className="container mx-auto px-4 py-8">
//         {activeTab === "browse" && (
//           <div className="space-y-8">
//             {/* Stats Cards */}
//             <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
//               <Card
//                 className="hover:shadow-lg transition-shadow cursor-pointer"
//                 onClick={() => navigate('/courses')}
//               >
//                 <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//                   <CardTitle className="text-sm font-medium">Total Courses</CardTitle>
//                   <BookOpen className="h-4 w-4 text-muted-foreground" />
//                 </CardHeader>
//                 <CardContent>
//                   <div className="text-2xl font-bold">156</div>
//                   <p className="text-xs text-muted-foreground">+12% from last month</p>
//                   <Button
//                     variant="ghost"
//                     size="sm"
//                     className="mt-2 p-0 h-auto text-blue-600 hover:text-blue-700"
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       navigate('/courses');
//                     }}
//                   >
//                     <Search className="h-3 w-3 mr-1" />
//                     View All Courses
//                   </Button>
//                 </CardContent>
//               </Card>
//               <Card>
//                 <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//                   <CardTitle className="text-sm font-medium">Active Learners</CardTitle>
//                   <Users className="h-4 w-4 text-muted-foreground" />
//                 </CardHeader>
//                 <CardContent>
//                   <div className="text-2xl font-bold">2,847</div>
//                   <p className="text-xs text-muted-foreground">+18% from last month</p>
//                 </CardContent>
//               </Card>
//               <Card>
//                 <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//                   <CardTitle className="text-sm font-medium">Certificates Issued</CardTitle>
//                   <Award className="h-4 w-4 text-muted-foreground" />
//                 </CardHeader>
//                 <CardContent>
//                   <div className="text-2xl font-bold">1,234</div>
//                   <p className="text-xs text-muted-foreground">+8% from last month</p>
//                 </CardContent>
//               </Card>
//               <Card>
//                 <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//                   <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
//                   <TrendingUp className="h-4 w-4 text-muted-foreground" />
//                 </CardHeader>
//                 <CardContent>
//                   <div className="text-2xl font-bold">89.2%</div>
//                   <p className="text-xs text-muted-foreground">+2.1% from last month</p>
//                 </CardContent>
//               </Card>
//             </div>

//             <PublishedCourses />
//           </div>
//         )}

//         {activeTab === "enrolled" && <MyEnrolledCourses />}
//         {activeTab === "create" && <CreateCourseWizard />}
//         {activeTab === "my-courses" && <MyCourses />}
//       </main>
//     </div>
//   );
// };

// export default ELearning;

import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BookOpen,
  Plus,
  Users,
  Award,
  TrendingUp,
  ArrowLeft,
  ArrowRight,
  Search,
  Home,
  Menu,
} from "lucide-react";
import { CreateCourseWizard } from "@/components/elearning/CreateCourseWizard";
import { MyCourses } from "@/components/elearning/MyCourses";
import { PublishedCourses } from "@/components/elearning/PublishedCourses";
import { MyEnrolledCourses } from "@/components/elearning/MyEnrolledCourses";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import logo from "@/image/thefuturemed_logo (1).jpg";

import Footer from "@/footer/Footer";

const ELearning = () => {
  const [activeTab, setActiveTab] = useState<
    "browse" | "create" | "my-courses" | "enrolled"
  >("browse");
  const navigate = useNavigate();
  const location = useLocation();

  const handleBackNavigation = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("/");
    }
  };

  const handleForwardNavigation = () => {
    try {
      navigate(1);
    } catch (error) {
      console.log("No forward history available");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      {/* Header - Responsive version */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          {/* Top Bar */}
          <div className="flex items-center justify-between mb-4 md:mb-0">
            <div className="flex items-center space-x-2 md:space-x-4">
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

              {/* <Link to="/" className="flex items-center space-x-2">
                <BookOpen className="h-8 w-8 text-blue-600" />
                <h1 className="text-xl md:text-2xl font-bold text-gray-900">
                  MedPortal E-Learning
                </h1>
              </Link> */}
              <div className="flex items-center space-x-2">
                {/* <Shield className="h-8 w-8 text-blue-600" />
                            <h1 className="text-2xl font-bold text-gray-900">MedPortal</h1> */}
                <Link to="/">
                  <img src={logo} alt="Logo" className="h-10 w-100 mr-2" />
                </Link>
              </div>
            </div>

            <div className="flex items-center space-x-2 md:space-x-4">
              {/* Mobile Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon" className="md:hidden">
                    <Menu className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setActiveTab("browse")}>
                    Browse Courses
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setActiveTab("enrolled")}>
                    My Enrolled Courses
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setActiveTab("create")}>
                    Create Course
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setActiveTab("my-courses")}>
                    My Courses
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate("/")}>
                    Home
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Desktop Home Button */}
              {/* Desktop Navigation Tabs */}
              <nav className="hidden md:flex space-x-4 justify-center">
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
              <Button
                variant="outline"
                onClick={() => navigate("/")}
                className="hidden md:inline-flex hover:bg-gray-100"
                title="Go to home page"
              >
                <Home className="mr-2 h-4 w-4" />
                Home
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 pb-20 md:pb-8">
        {activeTab === "browse" && (
          <div className="space-y-8">

            {/* Stats Cards - Responsive Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card
                className="hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => navigate("/courses")}
              >
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Courses
                  </CardTitle>
                  <BookOpen className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">156</div>
                  <p className="text-xs text-muted-foreground">
                    +12% from last month
                  </p>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="mt-2 p-0 h-auto text-blue-600 hover:text-blue-700"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate("/courses");
                    }}
                  >
                    <Search className="h-3 w-3 mr-1" />
                    View All Courses
                  </Button>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Active Learners
                  </CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">2,847</div>
                  <p className="text-xs text-muted-foreground">
                    +18% from last month
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Certificates Issued
                  </CardTitle>
                  <Award className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">1,234</div>
                  <p className="text-xs text-muted-foreground">
                    +8% from last month
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Completion Rate
                  </CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">89.2%</div>
                  <p className="text-xs text-muted-foreground">
                    +2.1% from last month
                  </p>
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

      {/* Mobile Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg md:hidden">
        <div className="flex justify-around items-center p-2">
          <Button
            variant={activeTab === "browse" ? "default" : "ghost"}
            size="icon"
            className="flex flex-col items-center h-auto p-2"
            onClick={() => setActiveTab("browse")}
          >
            <BookOpen className="h-5 w-5" />
            <span className="text-xs mt-1">Browse</span>
          </Button>

          <Button
            variant={activeTab === "enrolled" ? "default" : "ghost"}
            size="icon"
            className="flex flex-col items-center h-auto p-2"
            onClick={() => setActiveTab("enrolled")}
          >
            <Users className="h-5 w-5" />
            <span className="text-xs mt-1">Enrolled</span>
          </Button>

          <Button
            variant={activeTab === "create" ? "default" : "ghost"}
            size="icon"
            className="flex flex-col items-center h-auto p-2"
            onClick={() => setActiveTab("create")}
          >
            <Plus className="h-5 w-5" />
            <span className="text-xs mt-1">Create</span>
          </Button>

          <Button
            variant={activeTab === "my-courses" ? "default" : "ghost"}
            size="icon"
            className="flex flex-col items-center h-auto p-2"
            onClick={() => setActiveTab("my-courses")}
          >
            <BookOpen className="h-5 w-5" />
            <span className="text-xs mt-1">My Courses</span>
          </Button>
        </div>
      </div>

      <Footer/>
    </div>
  );
};

export default ELearning;
