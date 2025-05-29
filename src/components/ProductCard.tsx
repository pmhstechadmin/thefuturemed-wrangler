
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Lock, Unlock } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  description: string;
  color: string;
  position: [number, number, number];
}

interface ProductCardProps {
  product: Product;
  isSelected: boolean;
  onSelect: (id: string | null) => void;
  onAction?: () => void;
  isAuthenticated?: boolean;
}

const ProductCard = ({ product, isSelected, onSelect, onAction, isAuthenticated = false }: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const requiresAuth = product.id === 'community';

  const getActionButtonText = () => {
    if (product.id === 'community') {
      return isAuthenticated ? 'Access Community' : 'Sign In Required';
    } else if (product.id === 'e-learning') {
      return 'Access E-Learning';
    } else if (product.id === 'e-seminar') {
      return 'View Seminars';
    }
    return 'Learn More';
  };

  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -5 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <Card 
        className={`cursor-pointer transition-all duration-300 border-2 bg-white/95 backdrop-blur-sm ${
          isSelected 
            ? 'ring-4 ring-offset-2 shadow-2xl scale-105 border-transparent' 
            : 'hover:shadow-xl border-white/20 hover:border-white/40'
        } ${isHovered ? 'shadow-xl' : ''}`}
        style={{ 
          borderColor: isSelected ? product.color : undefined,
          backgroundColor: isSelected ? `${product.color}15` : undefined,
          boxShadow: isSelected ? `0 0 30px ${product.color}40` : undefined
        }}
        onClick={() => onSelect(isSelected ? null : product.id)}
      >
        <CardHeader className="text-center pb-2">
          <motion.div
            className="w-20 h-20 mx-auto rounded-full flex items-center justify-center text-white text-2xl font-bold mb-3 relative shadow-lg"
            style={{ backgroundColor: product.color }}
            animate={{
              scale: isSelected ? 1.1 : 1,
              rotate: isHovered ? 5 : 0
            }}
            transition={{ duration: 0.2 }}
          >
            {product.name.charAt(0)}
            {requiresAuth && !isAuthenticated && (
              <div className="absolute -top-1 -right-1 w-7 h-7 bg-red-500 rounded-full flex items-center justify-center shadow-md">
                <Lock className="h-4 w-4 text-white" />
              </div>
            )}
            {requiresAuth && isAuthenticated && (
              <div className="absolute -top-1 -right-1 w-7 h-7 bg-green-500 rounded-full flex items-center justify-center shadow-md">
                <Unlock className="h-4 w-4 text-white" />
              </div>
            )}
          </motion.div>
          <CardTitle className="text-xl font-bold">{product.name}</CardTitle>
          {requiresAuth && (
            <Badge 
              variant={isAuthenticated ? "default" : "destructive"} 
              className={`text-xs font-medium ${isAuthenticated ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}
            >
              {isAuthenticated ? "Available" : "Login Required"}
            </Badge>
          )}
        </CardHeader>
        <CardContent className="text-center">
          <CardDescription className="text-sm mb-4 text-gray-600">
            {product.description}
          </CardDescription>
          
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ 
              opacity: isSelected ? 1 : 0, 
              height: isSelected ? 'auto' : 0 
            }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="space-y-3 pt-3 border-t border-gray-200">
              <Button 
                size="sm" 
                className="w-full text-white font-medium shadow-md hover:shadow-lg transition-all duration-200"
                style={{ backgroundColor: product.color }}
                onClick={(e) => {
                  e.stopPropagation();
                  onAction?.();
                }}
                disabled={requiresAuth && !isAuthenticated}
              >
                {getActionButtonText()}
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full border-2 font-medium transition-all duration-200 hover:shadow-md"
                style={{ 
                  borderColor: product.color,
                  color: product.color
                }}
                disabled={requiresAuth && !isAuthenticated}
              >
                {requiresAuth && !isAuthenticated ? 'Login First' : 'Try Now'}
              </Button>
            </div>
          </motion.div>
        </CardContent>
        
        {/* Selection indicator */}
        {isSelected && (
          <motion.div
            className="absolute -top-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-lg"
            style={{ backgroundColor: product.color }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          >
            ✓
          </motion.div>
        )}
      </Card>
    </motion.div>
  );
};

export default ProductCard;
