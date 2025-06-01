
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Users, Calendar, BookOpen, GraduationCap, Stethoscope, UserPlus, Menu, X, Briefcase } from "lucide-react";
import AuthModal from "@/components/AuthModal";
import HomepageAdsCarousel from "@/components/HomepageAdsCarousel";

const Index = () => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleAuthSuccess = () => {
    // Handle successful authentication - you can add any additional logic here
    console.log('Authentication successful');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      {/* Navigation */}
      <nav className="bg-white shadow-lg border-b border-blue-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Shield className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">MedPortal</h1>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              <Link to="/products" className="text-gray-600 hover:text-blue-600 transition-colors font-medium px-3 py-2 rounded-md hover:bg-blue-50">
                Products
              </Link>
              <Link to="/community" className="text-gray-600 hover:text-blue-600 transition-colors font-medium px-3 py-2 rounded-md hover:bg-blue-50">
                Community
              </Link>
              <Link to="/e-seminar" className="text-gray-600 hover:text-blue-600 transition-colors font-medium px-3 py-2 rounded-md hover:bg-blue-50">
                E-Seminar
              </Link>
              <Link to="/e-learning" className="text-gray-600 hover:text-blue-600 transition-colors font-medium px-3 py-2 rounded-md hover:bg-blue-50">
                E-Learning
              </Link>
              <Link to="/jobs" className="text-gray-600 hover:text-blue-600 transition-colors font-medium px-3 py-2 rounded-md hover:bg-blue-50">
                Jobs
              </Link>
              <Link to="/calendar" className="text-gray-600 hover:text-blue-600 transition-colors font-medium px-3 py-2 rounded-md hover:bg-blue-50">
                Calendar
              </Link>
              <Button 
                onClick={() => setShowAuthModal(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg transition-all duration-200"
              >
                <UserPlus className="mr-2 h-4 w-4" />
                Sign In / Register
              </Button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 hover:bg-blue-50"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden mt-4 pb-4 border-t pt-4 bg-white rounded-lg shadow-sm">
              <div className="flex flex-col space-y-3">
                <Link to="/products" className="text-gray-600 hover:text-blue-600 transition-colors font-medium p-3 rounded-md hover:bg-blue-50">
                  Products
                </Link>
                <Link to="/community" className="text-gray-600 hover:text-blue-600 transition-colors font-medium p-3 rounded-md hover:bg-blue-50">
                  Community
                </Link>
                <Link to="/e-seminar" className="text-gray-600 hover:text-blue-600 transition-colors font-medium p-3 rounded-md hover:bg-blue-50">
                  E-Seminar
                </Link>
                <Link to="/e-learning" className="text-gray-600 hover:text-blue-600 transition-colors font-medium p-3 rounded-md hover:bg-blue-50">
                  E-Learning
                </Link>
                <Link to="/jobs" className="text-gray-600 hover:text-blue-600 transition-colors font-medium p-3 rounded-md hover:bg-blue-50">
                  Jobs
                </Link>
                <Link to="/calendar" className="text-gray-600 hover:text-blue-600 transition-colors font-medium p-3 rounded-md hover:bg-blue-50">
                  Calendar
                </Link>
                <Button 
                  onClick={() => setShowAuthModal(true)} 
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg transition-all duration-200"
                >
                  <UserPlus className="mr-2 h-4 w-4" />
                  Sign In / Register
                </Button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
          Welcome to <span className="text-blue-600">MedPortal</span>
        </h2>
        <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
          Your comprehensive platform for medical education, community engagement, and professional development.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            size="lg" 
            onClick={() => setShowAuthModal(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 px-8 py-4 text-lg"
          >
            Get Started
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            asChild
            className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white shadow-md hover:shadow-lg transition-all duration-200 px-8 py-4 text-lg"
          >
            <Link to="/products">Explore Products</Link>
          </Button>
        </div>
      </section>

      {/* Homepage Ads Carousel */}
      <section className="container mx-auto px-4">
        <HomepageAdsCarousel />
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="hover:shadow-xl transition-all duration-300 border border-blue-100 hover:border-blue-200">
            <CardHeader>
              <Stethoscope className="h-12 w-12 text-blue-600 mb-4" />
              <CardTitle className="text-xl">Medical Products</CardTitle>
              <CardDescription className="text-gray-600">
                Discover the latest medical equipment and pharmaceutical products
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                variant="outline" 
                asChild 
                className="w-full border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-200"
              >
                <Link to="/products">Browse Products</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-xl transition-all duration-300 border border-green-100 hover:border-green-200">
            <CardHeader>
              <Users className="h-12 w-12 text-green-600 mb-4" />
              <CardTitle className="text-xl">Community</CardTitle>
              <CardDescription className="text-gray-600">
                Connect with medical professionals and join specialized communities
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                variant="outline" 
                asChild 
                className="w-full border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white transition-all duration-200"
              >
                <Link to="/community">Join Community</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-xl transition-all duration-300 border border-purple-100 hover:border-purple-200">
            <CardHeader>
              <Calendar className="h-12 w-12 text-purple-600 mb-4" />
              <CardTitle className="text-xl">E-Seminars</CardTitle>
              <CardDescription className="text-gray-600">
                Attend live seminars and webinars by medical experts
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                variant="outline" 
                asChild 
                className="w-full border-2 border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white transition-all duration-200"
              >
                <Link to="/e-seminar">View Seminars</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-xl transition-all duration-300 border border-orange-100 hover:border-orange-200">
            <CardHeader>
              <GraduationCap className="h-12 w-12 text-orange-600 mb-4" />
              <CardTitle className="text-xl">E-Learning</CardTitle>
              <CardDescription className="text-gray-600">
                Create and take comprehensive medical courses with certifications
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                variant="outline" 
                asChild 
                className="w-full border-2 border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white transition-all duration-200"
              >
                <Link to="/e-learning">Start Learning</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-xl transition-all duration-300 border border-yellow-100 hover:border-yellow-200">
            <CardHeader>
              <Briefcase className="h-12 w-12 text-yellow-600 mb-4" />
              <CardTitle className="text-xl">Job Portal</CardTitle>
              <CardDescription className="text-gray-600">
                Find medical job opportunities and advance your healthcare career
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                variant="outline" 
                asChild 
                className="w-full border-2 border-yellow-600 text-yellow-600 hover:bg-yellow-600 hover:text-white transition-all duration-200"
              >
                <Link to="/jobs">Browse Jobs</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-xl transition-all duration-300 border border-red-100 hover:border-red-200">
            <CardHeader>
              <Calendar className="h-12 w-12 text-red-600 mb-4" />
              <CardTitle className="text-xl">Event Calendar</CardTitle>
              <CardDescription className="text-gray-600">
                Stay updated with medical conferences, workshops, and events
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                variant="outline" 
                asChild 
                className="w-full border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition-all duration-200"
              >
                <Link to="/calendar">View Calendar</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Shield className="h-6 w-6" />
                <span className="text-xl font-bold">MedPortal</span>
              </div>
              <p className="text-gray-400">
                Empowering medical professionals through technology and community.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Platform</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/products" className="hover:text-white transition-colors">Products</Link></li>
                <li><Link to="/community" className="hover:text-white transition-colors">Community</Link></li>
                <li><Link to="/e-learning" className="hover:text-white transition-colors">E-Learning</Link></li>
                <li><Link to="/e-seminar" className="hover:text-white transition-colors">E-Seminars</Link></li>
                <li><Link to="/jobs" className="hover:text-white transition-colors">Jobs</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link to="/terms-of-service" className="hover:text-white transition-colors">Terms of Service</Link></li>
                <li><Link to="/data-usage-policy" className="hover:text-white transition-colors">Data Usage Policy</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 MedPortal. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)}
        onSuccess={handleAuthSuccess}
      />
    </div>
  );
};

export default Index;
