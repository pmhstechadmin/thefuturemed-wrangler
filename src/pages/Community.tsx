
// import { Button } from "@/components/ui/button";
// import { Home, ArrowLeft } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import CommunityHeader from '@/components/CommunityHeader';
// import CommunityCard from '@/components/CommunityCard';
// import CommunityEmptyState from '@/components/CommunityEmptyState';
// import CommunityLoadingSpinner from '@/components/CommunityLoadingSpinner';
// import CommunityAdsCarousel from '@/components/CommunityAdsCarousel';
// import { useCommunityData } from '@/hooks/useCommunityData';
// import { useEffect } from 'react';

// const Community = () => {
//   const navigate = useNavigate();
//   const {
//     communities,
//     memberships,
//     loading,
//     joinCommunity,
//     leaveCommunity,
//     openCommunityChat,
//     isMember
//   } = useCommunityData();

//   const handleBackNavigation = () => {
//     if (window.history.length > 1) {
//       navigate(-1);
//     } else {
//       navigate('/');
//     }
//   };

//   // Add error boundary for debugging
//   useEffect(() => {
//     console.log('Community page loaded');
//     console.log('Communities:', communities);
//     console.log('Memberships:', memberships);
//     console.log('Loading:', loading);
//   }, [communities, memberships, loading]);

//   if (loading) {
//     return <CommunityLoadingSpinner />;
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
//       <div className="container mx-auto px-4 py-8">
//         <div className="flex items-center justify-between mb-8">
//           <div className="flex items-center gap-4">
//             <Button
//               variant="outline"
//               onClick={handleBackNavigation}
//               className="hover:bg-gray-100"
//               title="Go back"
//             >
//               <ArrowLeft className="mr-2 h-4 w-4" />
//               Back
//             </Button>
//             <div className="flex-1">
//               <CommunityHeader membershipCount={memberships.length} />
//             </div>
//           </div>
//           <Button
//             variant="outline"
//             onClick={() => navigate('/')}
//             className="hover:bg-gray-100"
//             title="Go to home page"
//           >
//             <Home className="mr-2 h-4 w-4" />
//             Home
//           </Button>
//         </div>

//         <CommunityAdsCarousel />

//         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {communities.map((community) => (
//             <CommunityCard
//               key={community.id}
//               community={community}
//               isMember={isMember(community.id)}
//               onJoin={joinCommunity}
//               onLeave={leaveCommunity}
//               onOpenChat={openCommunityChat}
//             />
//           ))}
//         </div>

//         {communities.length === 0 && <CommunityEmptyState />}
//       </div>
//     </div>
//   );
// };

// export default Community;







import { Button } from "@/components/ui/button";
import { Home, ArrowLeft } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import CommunityHeader from '@/components/CommunityHeader';
import CommunityCard from '@/components/CommunityCard';
import CommunityEmptyState from '@/components/CommunityEmptyState';
import CommunityLoadingSpinner from '@/components/CommunityLoadingSpinner';
import CommunityAdsCarousel from '@/components/CommunityAdsCarousel';
import { useCommunityData } from '@/hooks/useCommunityData';
import { useEffect, useState } from 'react';
import type { User as SupabaseUser } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { Shield, UserPlus, Layout, Grid3X3, User } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";




const Community = () => {
  const navigate = useNavigate();
  const {
    communities,
    memberships,
    loading,
    joinCommunity,
    leaveCommunity,
    openCommunityChat,
    isMember
  } = useCommunityData();


  const [user, setUser] = useState<SupabaseUser | null>(null); // ✅ Moved inside
  const [authLoading, setAuthLoading] = useState(true);
  const [loadingS, setLoadingS] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const { toast } = useToast();

  const handleBackNavigation = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };



  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    console.log('Checking user sessionaaaaaaaaaaaa...');
    try {
      const { data: { session }, error } = await supabase.auth.getSession();
      console.log('Session dataAAAAAAA:', session);
      if (error) console.error('Supabase session error:', error);

      setUser(session?.user || null);
      if (session?.user) {
        console.log('User logged in:', session.user.email);
      } else {
        console.log('No user session foundAAAAAAAAA.');
      }
    } catch (error) {
      console.error('Error checking userAAAAAAA:', error);
    } finally {
      console.log('Finished checking userAAAAAAAA.');
      setLoadingS(false);
    }
  };

  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      setUser(null);
      toast({
        title: "Signed Out",
        description: "You have been successfully signed out.",
      });
    } catch (error) {
      console.error('Sign out error:', error);
      toast({
        title: "Error",
        description: "Failed to sign out. Please try again.",
        variant: "destructive",
      });
    }
  };


  // Add error boundary for debugging
  useEffect(() => {
    console.log('Community page loaded');
    console.log('Communities:', communities);
    console.log('Memberships:', memberships);
    console.log('Loading:', loading);
  }, [communities, memberships, loading]);

  if (loading) {
    return <CommunityLoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <header className="bg-black/30 backdrop-blur-md border-b border-white/20 sticky top-0 z-50 shadow-xl">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                onClick={handleBackNavigation}
                className="text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm"
                title="Go back"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
              <Link to="/" className="flex items-center space-x-2">
                <Shield className="h-8 w-8 text-blue-400" />
                <h1 className="text-2xl font-bold text-white">MedPortal</h1>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-white/10 rounded-lg p-1">
                {/* <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className={`${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'text-white hover:bg-white/20'}`}
                >
                  <Grid3X3 className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className={`${viewMode === 'list' ? 'bg-blue-600 text-white' : 'text-white hover:bg-white/20'}`}
                >
                  <Layout className="h-4 w-4" />
                </Button> */}
              </div>
              {user ? (
                <div className="flex items-center space-x-4">
                  <span className="text-white text-sm bg-white/10 px-3 py-1 rounded-full">Welcome, {user.email}</span>
                  <Button
                    variant="outline"
                    className="text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm"
                    onClick={() => navigate('/profile')}
                  >
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </Button>
                  <Button
                    variant="outline"
                    className="text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm"
                    onClick={handleSignOut}
                  >
                    Sign Out
                  </Button>
                </div>
              ) : (
                <>
                  <Link to="/register">
                    <Button
                      variant="outline"
                      className="text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm"
                    >
                      Register
                    </Button>
                  </Link>
                  <Link to="/">
                    <Button className="bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl transition-all duration-200">
                      <UserPlus className="mr-2 h-4 w-4" />
                      Sign In
                    </Button>
                  </Link>
                </>
              )}
              <Button
                variant="outline"
                onClick={() => navigate('/')}
                className="text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm"
                title="Go to home page"
              >
                <Home className="mr-2 h-4 w-4" />
                Home
              </Button>
            </div>
          </div>
        </div>
      </header>


      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
        <div className="container mx-auto px-4 py-8">
          {/* <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              onClick={handleBackNavigation}
              className="hover:bg-gray-100"
              title="Go back"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
            <div className="flex-1">
              <CommunityHeader membershipCount={memberships.length} />
            </div>
          </div>
          <Button
            variant="outline"
            onClick={() => navigate('/')}
            className="hover:bg-gray-100"
            title="Go to home page"
          >
            <Home className="mr-2 h-4 w-4" />
            Home
          </Button>
        </div> */}

          <CommunityAdsCarousel />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {communities.map((community) => (
              <CommunityCard
                key={community.id}
                community={community}
                isMember={isMember(community.id)}
                onJoin={joinCommunity}
                onLeave={leaveCommunity}
                onOpenChat={openCommunityChat}
              />
            ))}
          </div>

          {communities.length === 0 && <CommunityEmptyState />}
        </div>
      </div>
    </div>
  );
};

export default Community;

