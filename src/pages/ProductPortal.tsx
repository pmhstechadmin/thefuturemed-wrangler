import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Shield, UserPlus, Layout, Grid3X3 } from 'lucide-react';
import ProductCard from '@/components/ProductCard';

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
      // Navigate to community page
      window.location.href = '/community';
    } else {
      // For other products, show the details as before
      console.log(`Navigating to ${productId}`);
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
              <Link to="/register">
                <Button variant="outline" className="text-white border-white/30 hover:bg-white/10">
                  Register
                </Button>
              </Link>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <UserPlus className="mr-2 h-4 w-4" />
                Sign In
              </Button>
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
            Click on any product card below to discover each platform feature.
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
                      {product.id === 'community' ? 'Join Community' : 'Learn More'}
                    </Button>
                    <Button variant="outline" className="text-white border-white/30 hover:bg-white/10">
                      Try Now
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
