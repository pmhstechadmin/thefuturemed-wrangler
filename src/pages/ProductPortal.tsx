
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Text, Box, Environment } from '@react-three/drei';
import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Shield, UserPlus } from 'lucide-react';
import { Mesh } from 'three';
import ProductBox from '@/components/ProductBox';

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="absolute top-0 left-0 right-0 z-10 bg-black/20 backdrop-blur-sm border-b border-white/10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Shield className="h-8 w-8 text-blue-400" />
              <h1 className="text-2xl font-bold text-white">MedPortal</h1>
            </div>
            <div className="flex items-center space-x-4">
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
      <div className="relative pt-20 pb-8">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-6xl font-bold text-white mb-6">
            Medical Platform
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
              of the Future
            </span>
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Explore our comprehensive suite of medical tools and services. 
            Interact with our 3D product showcase below to discover each platform feature.
          </p>
        </div>
      </div>

      {/* 3D Product Showcase */}
      <div className="relative h-screen">
        <Canvas camera={{ position: [0, 0, 10], fov: 60 }}>
          <ambientLight intensity={0.4} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <pointLight position={[-10, -10, -10]} intensity={0.5} color="#4ECDC4" />
          
          <Environment preset="night" />
          
          {products.map((product) => (
            <ProductBox
              key={product.id}
              product={product}
              isSelected={selectedProduct === product.id}
              onSelect={setSelectedProduct}
            />
          ))}
          
          <OrbitControls 
            enableZoom={true} 
            enablePan={true}
            enableRotate={true}
            autoRotate={true}
            autoRotateSpeed={0.5}
            maxDistance={20}
            minDistance={5}
          />
        </Canvas>

        {/* Product Info Overlay */}
        {selectedProduct && (
          <div className="absolute bottom-8 left-8 right-8 bg-black/80 backdrop-blur-sm rounded-lg p-6 text-white">
            {(() => {
              const product = products.find(p => p.id === selectedProduct);
              return product ? (
                <div>
                  <h3 className="text-2xl font-bold mb-2">{product.name}</h3>
                  <p className="text-gray-300 mb-4">{product.description}</p>
                  <div className="flex gap-4">
                    <Button className="bg-blue-600 hover:bg-blue-700">
                      Learn More
                    </Button>
                    <Button variant="outline" className="text-white border-white/30 hover:bg-white/10">
                      Try Now
                    </Button>
                  </div>
                </div>
              ) : null;
            })()}
          </div>
        )}
      </div>

      {/* Instructions */}
      <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-sm rounded-lg p-4 text-white text-sm">
        <p>🖱️ Click and drag to rotate • 🔍 Scroll to zoom • 📱 Click boxes to explore</p>
      </div>
    </div>
  );
};

export default ProductPortal;
