
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Shield, UserPlus, Layout, Grid3X3 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import ProductCard from '@/components/ProductCard';
import type { User } from '@supabase/supabase-js';

const products = [
  {
    id: 'community',
    name: 'Community',
    description: 'Connect with medical professionals worldwide',
    color: '#FF6B6B',
    position: [-4, 2, 0] as [number, number, number],
  },
  {
    id: 'e-seminar',
    name: 'E-Seminar',
    description: 'Interactive online medical seminars',
    color: '#4ECDC4',
    position: [-2, 2, 0] as [number, number, number],
  },
  {
    id: 'e-conferences',
    name: 'E-Conferences',
    description: 'Virtual medical conferences and events',
    color: '#45B7D1',
    position: [0, 2, 0] as [number, number, number],
  },
  {
    id: 'e-learning',
    name: 'E-Learning',
    description: 'Comprehensive medical education platform',
    color: '#96CEB4',
    position: [2, 2, 0] as [number, number, number],
  },
  {
    id: 'publication',
    name: 'Publication',
    description: 'Medical research and journal publications',
    color: '#FFEAA7',
    position: [4, 2, 0] as [number, number, number],
  },
  {
    id: 'ai-medic-agents',
    name: 'AI Medic Agents',
    description: 'AI-powered medical assistance and diagnosis',
    color: '#DDA0DD',
    position: [-2, 0, 0] as [number, number, number],
  },
  {
    id: 'podcast',
    name: 'Podcast',
    description: 'Medical podcasts and audio content',
    color: '#FFB347',
    position: [0, 0, 0] as [number, number, number],
  },
  {
    id: 'data-verification',
    name: 'Data Verification',
    description: 'Medical data verification and validation',
    color: '#87CEEB',
    position: [2, 0, 0] as [number, number, number],
  },
  {
    id: 'medical-jobs',
    name: 'Medical Jobs',
    description: 'Find and post medical career opportunities',
    color: '#98FB98',
    position: [0, -2, 0] as [number, number, number],
  },
];

const ProductPortal = () => {
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user || null);
    } catch (error) {
      console.error('Error checking user:', error);
    } finally {
      setLoading(false);
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const handleProductAction = (productId: string) => {
    if (productId === 'community') {
      if (!user) {
        toast({
          title: "Authentication Required",
          description: "Please sign in to access the community.",
          variant: "destructive",
        });
        navigate('/');
        return;
      }
      // Navigate to community page for authenticated users
      navigate('/community');
    } else {
      // For other products, show coming soon message
      toast({
        title: "Coming Soon",
        description: `${products.find(p => p.id === productId)?.name} will be available soon!`,
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="bg-black/20 backdrop-blur-sm border-b border-white/10 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Link to="/" className="flex items-center space-x-2">
                <Shield className="h-8 w-8 text-blue-400" />
                <h1 className="text-2xl font-bold text-white">MedPortal</h1>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className="text-white border-white/30"
                >
                  <Grid3X3 className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className="text-white border-white/30"
                >
                  <Layout className="h-4 w-4" />
                </Button>
              </div>
              {user ? (
                <div className="flex items-center space-x-4">
                  <span className="text-white text-sm">Welcome, {user.email}</span>
                  <Button variant="outline" className="text-white border-white/30 hover:bg-white/10" onClick={handleSignOut}>
                    Sign Out
                  </Button>
                </div>
              ) : (
                <>
                  <Link to="/register">
                    <Button variant="outline" className="text-white border-white/30 hover:bg-white/10">
                      Register
                    </Button>
                  </Link>
                  <Link to="/">
                    <Button className="bg-blue-600 hover:bg-blue-700">
                      <UserPlus className="mr-2 h-4 w-4" />
                      Sign In
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="relative pt-12 pb-8">
        <div className="container mx-auto px-4 text-center">
          <motion.h2 
            className="text-6xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Medical Platform
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
              of the Future
            </span>
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Explore our comprehensive suite of medical tools and services. 
            {user ? 'Click on any product to access it.' : 'Register once to access all products.'}
          </motion.p>
        </div>
      </div>

      {/* Product Showcase */}
      <div className="container mx-auto px-4 pb-16">
        <motion.div
          className={`${
            viewMode === 'grid' 
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' 
              : 'flex flex-col space-y-4 max-w-2xl mx-auto'
          }`}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              isSelected={selectedProduct === product.id}
              onSelect={setSelectedProduct}
              onAction={() => handleProductAction(product.id)}
              isAuthenticated={!!user}
            />
          ))}
        </motion.div>

        {/* Selected Product Details */}
        {selectedProduct && (
          <motion.div
            className="mt-12 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {(() => {
              const product = products.find(p => p.id === selectedProduct);
              return product ? (
                <div className="bg-black/40 backdrop-blur-sm rounded-lg p-8 text-white border border-white/10">
                  <div className="flex items-center gap-4 mb-6">
                    <div 
                      className="w-12 h-12 rounded-full flex items-center justify-center text-white text-xl font-bold"
                      style={{ backgroundColor: product.color }}
                    >
                      {product.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="text-3xl font-bold">{product.name}</h3>
                      <p className="text-gray-300">{product.description}</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <Button 
                      className="text-white"
                      style={{ backgroundColor: product.color }}
                      onClick={() => handleProductAction(product.id)}
                    >
                      {product.id === 'community' ? (user ? 'Access Community' : 'Sign In to Access') : 'Learn More'}
                    </Button>
                    <Button variant="outline" className="text-white border-white/30 hover:bg-white/10">
                      {product.id === 'community' && user ? 'Join Now' : 'Try Now'}
                    </Button>
                    <Button 
                      variant="ghost" 
                      className="text-gray-300 hover:text-white"
                      onClick={() => setSelectedProduct(null)}
                    >
                      Close
                    </Button>
                  </div>
                </div>
              ) : null;
            })()}
          </motion.div>
        )}
      </div>

      {/* Instructions */}
      <div className="fixed bottom-4 right-4 bg-black/60 backdrop-blur-sm rounded-lg p-4 text-white text-sm">
        <p>🖱️ Click cards to explore • 📱 Switch between grid and list view</p>
      </div>
    </div>
  );
};

export default ProductPortal;
