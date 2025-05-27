
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { UserPlus, Shield, Award, Users, Sparkles } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import AuthModal from "@/components/AuthModal";
import type { User } from '@supabase/supabase-js';

const Index = () => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Check for existing session
    const checkUser = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) {
          console.error('Session check error:', error);
        } else {
          setUser(session?.user || null);
          console.log('Current session:', session?.user ? 'Authenticated' : 'Not authenticated');
        }
      } catch (error) {
        console.error('Error checking session:', error);
      } finally {
        setLoading(false);
      }
    };
    
    checkUser();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      console.log('Auth state changed:', event, session?.user ? 'User logged in' : 'User logged out');
      setUser(session?.user || null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleAuthSuccess = () => {
    console.log('Auth success, closing modal');
    setShowAuthModal(false);
    toast({
      title: "Welcome!",
      description: "You have successfully signed in.",
    });
  };

  const handleSignOut = async () => {
    try {
      console.log('Signing out...');
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('Sign out error:', error);
        toast({
          title: "Error",
          description: "Failed to sign out. Please try again.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Signed Out",
          description: "You have been successfully signed out.",
        });
      }
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  const handleSignInClick = () => {
    console.log('Sign in button clicked');
    setShowAuthModal(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Shield className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">MedPortal</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/products">
                <Button variant="outline" className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4" />
                  Explore Products
                </Button>
              </Link>
              {user ? (
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-600">Welcome back, {user.email}!</span>
                  <Link to="/products">
                    <Button variant="outline">Access Products</Button>
                  </Link>
                  <Button variant="outline" onClick={handleSignOut}>
                    Sign Out
                  </Button>
                </div>
              ) : (
                <>
                  <Link to="/register">
                    <Button variant="outline">Register</Button>
                  </Link>
                  <Button onClick={handleSignInClick}>Sign In</Button>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            Professional Medical Portal
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Join our comprehensive platform designed exclusively for medical professionals and students. 
            Register once to access all our cutting-edge tools, resources, and products including our vibrant community platform.
          </p>
          <div className="flex gap-4 justify-center">
            <Link to="/products">
              <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-lg px-8 py-4">
                <Sparkles className="mr-2 h-5 w-5" />
                Explore All Products
              </Button>
            </Link>
            {user ? (
              <Link to="/products">
                <Button size="lg" variant="outline" className="text-lg px-8 py-4">
                  <Users className="mr-2 h-5 w-5" />
                  Access Portal
                </Button>
              </Link>
            ) : (
              <Link to="/register">
                <Button size="lg" variant="outline" className="text-lg px-8 py-4">
                  <UserPlus className="mr-2 h-5 w-5" />
                  Register Now
                </Button>
              </Link>
            )}
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="text-center hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <div className="mx-auto w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Award className="h-6 w-6 text-blue-600" />
              </div>
              <CardTitle>For Professionals</CardTitle>
              <CardDescription>
                Advanced tools and resources for practicing medical professionals
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                Access specialized products designed for healthcare practitioners with varying degrees and experience levels.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <div className="mx-auto w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-green-600" />
              </div>
              <CardTitle>Community Access</CardTitle>
              <CardDescription>
                Connect with medical professionals in specialized communities
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                Join our vibrant community platform to network, share knowledge, and collaborate with peers worldwide.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <div className="mx-auto w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <Sparkles className="h-6 w-6 text-purple-600" />
              </div>
              <CardTitle>Multiple Products</CardTitle>
              <CardDescription>
                One registration gives you access to all our products
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                Navigate through our innovative product suite including community, e-learning, conferences, and more.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl text-white p-12 text-center">
          <h3 className="text-3xl font-bold mb-4">Ready to Get Started?</h3>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of medical professionals already using our platform
          </p>
          <div className="flex gap-4 justify-center">
            <Link to="/products">
              <Button size="lg" variant="secondary" className="text-lg px-8 py-4">
                <Sparkles className="mr-2 h-5 w-5" />
                View All Products
              </Button>
            </Link>
            {user ? (
              <Link to="/products">
                <Button size="lg" variant="outline" className="text-lg px-8 py-4 text-white border-white hover:bg-white/10">
                  <Users className="mr-2 h-5 w-5" />
                  Access Portal
                </Button>
              </Link>
            ) : (
              <Link to="/register">
                <Button size="lg" variant="outline" className="text-lg px-8 py-4 text-white border-white hover:bg-white/10">
                  Register for Full Access
                </Button>
              </Link>
            )}
          </div>
        </div>
      </main>

      {/* Auth Modal */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onSuccess={handleAuthSuccess}
      />
    </div>
  );
};

export default Index;
