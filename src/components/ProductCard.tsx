
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

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
}

const ProductCard = ({ product, isSelected, onSelect, onAction }: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

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
        className={`cursor-pointer transition-all duration-300 ${
          isSelected 
            ? 'ring-2 ring-offset-2 shadow-xl scale-105' 
            : 'hover:shadow-lg'
        } ${isHovered ? 'shadow-lg' : ''}`}
        style={{ 
          borderColor: isSelected ? product.color : undefined,
          backgroundColor: isSelected ? `${product.color}10` : undefined
        }}
        onClick={() => onSelect(isSelected ? null : product.id)}
      >
        <CardHeader className="text-center pb-2">
          <motion.div
            className="w-16 h-16 mx-auto rounded-full flex items-center justify-center text-white text-2xl font-bold mb-2"
            style={{ backgroundColor: product.color }}
            animate={{
              scale: isSelected ? 1.1 : 1,
              rotate: isHovered ? 5 : 0
            }}
            transition={{ duration: 0.2 }}
          >
            {product.name.charAt(0)}
          </motion.div>
          <CardTitle className="text-lg">{product.name}</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <CardDescription className="text-sm mb-4">
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
            <div className="space-y-2 pt-2 border-t border-gray-200">
              <Button 
                size="sm" 
                className="w-full text-white"
                style={{ backgroundColor: product.color }}
                onClick={(e) => {
                  e.stopPropagation();
                  onAction?.();
                }}
              >
                {product.id === 'community' ? 'Join Community' : 'Learn More'}
              </Button>
              <Button variant="outline" size="sm" className="w-full">
                Try Now
              </Button>
            </div>
          </motion.div>
        </CardContent>
        
        {/* Selection indicator */}
        {isSelected && (
          <motion.div
            className="absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center text-white text-xs"
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
