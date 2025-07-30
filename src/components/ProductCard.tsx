// import { useState } from 'react';
// import { motion } from 'framer-motion';
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Badge } from '@/components/ui/badge';
// import { Lock, Unlock } from 'lucide-react';

// interface Product {
//   id: string;
//   name: string;
//   description: string;
//   color: string;
//   position: [number, number, number];
// }

// interface ProductCardProps {
//   product: Product;
//   isSelected: boolean;
//   onSelect: (id: string | null) => void;
//   onAction?: () => void;
//   isAuthenticated?: boolean;
// }

// const ProductCard = ({ product, isSelected, onSelect, onAction, isAuthenticated = false }: ProductCardProps) => {
//   const [isHovered, setIsHovered] = useState(false);
//   const requiresAuth = product.id === 'community';

//   // const getActionButtonText = () => {
//   //   if (product.id === 'community') {
//   //     return isAuthenticated ? 'Access Community' : 'Sign In Required';
//   //   } else if (product.id === 'e-learning') {
//   //     return 'Access E-Learning';
//   //   } else if (product.id === 'e-seminar') {
//   //     return 'View Seminars';
//   //   }
//   //   return 'Learn More';
//   // };
//   const getActionButtonText = () => {
//     const buttonTextMap: Record<string, string> = {
//       community: isAuthenticated ? "Access Community" : "Sign In Required",
//       "e-seminar": isAuthenticated ? "View Seminars" : "Sign In Required",
//       "e-learning": isAuthenticated ? "Access E-Learning" : "Sign In Required",
//       "e-conferences": isAuthenticated
//         ? "View Conferences"
//         : "Sign In Required",
//       publication: isAuthenticated ? "View Publications" : "Sign In Required",
//       "ai-medic-agents": "Try AI Assistant",
//       "medical-jobs": isAuthenticated ? "View Jobs" : "Sign In Required",
//       "medical-blogs": isAuthenticated ? "View Blogs" : "Sign In Required",
//       podcast: isAuthenticated ? "View Podcasts" : "Sign In Required",
//       "data-verification": isAuthenticated ? "Verify Data" : "Sign In Required",
//     };

//     return buttonTextMap[product.id] || "Learn More";
//   };

//   const handleActionClick = (e: React.MouseEvent) => {
//     e.stopPropagation();
//     console.log('Action button clicked for product:', product.id);
    
//     // For community, check authentication
//     if (product.id === 'community' && !isAuthenticated) {
//       console.log('Community access blocked - user not authenticated');
//       return;
//     }
    
//     // Call the onAction callback
//     if (onAction) {
//       console.log('Calling onAction for product:', product.id);
//       onAction();
//     } else {
//       console.log('No onAction callback provided');
//     }
//   };

//   const handleTryNowClick = (e: React.MouseEvent) => {
//     e.stopPropagation();
//     console.log('Try Now button clicked for product:', product.id);
    
//     // For community, check authentication
//     if (product.id === 'community' && !isAuthenticated) {
//       console.log('Try Now blocked - user not authenticated');
//       return;
//     }
    
//     // Call the onAction callback for try now as well
//     if (onAction) {
//       console.log('Calling onAction from Try Now for product:', product.id);
//       onAction();
//     }
//   };

//   return (
//     <motion.div
//       className="relative"
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.3 }}
//       whileHover={{ y: -5 }}
//       onHoverStart={() => setIsHovered(true)}
//       onHoverEnd={() => setIsHovered(false)}
//     >
//       <Card 
//         className={`cursor-pointer transition-all duration-300 border-2 bg-white/95 backdrop-blur-sm ${
//           isSelected 
//             ? 'ring-4 ring-offset-2 shadow-2xl scale-105 border-transparent' 
//             : 'hover:shadow-xl border-white/20 hover:border-white/40'
//         } ${isHovered ? 'shadow-xl' : ''}`}
//         style={{ 
//           borderColor: isSelected ? product.color : undefined,
//           backgroundColor: isSelected ? `${product.color}15` : undefined,
//           boxShadow: isSelected ? `0 0 30px ${product.color}40` : undefined
//         }}
//         onClick={() => onSelect(isSelected ? null : product.id)}
//       >
//         <CardHeader className="text-center pb-2">
//           <motion.div
//             className="w-20 h-20 mx-auto rounded-full flex items-center justify-center text-white text-2xl font-bold mb-3 relative shadow-lg"
//             style={{ backgroundColor: product.color }}
//             animate={{
//               scale: isSelected ? 1.1 : 1,
//               rotate: isHovered ? 5 : 0
//             }}
//             transition={{ duration: 0.2 }}
//           >
//             {product.name.charAt(0)}
//             {requiresAuth && !isAuthenticated && (
//               <div className="absolute -top-1 -right-1 w-7 h-7 bg-red-500 rounded-full flex items-center justify-center shadow-md">
//                 <Lock className="h-4 w-4 text-white" />
//               </div>
//             )}
//             {requiresAuth && isAuthenticated && (
//               <div className="absolute -top-1 -right-1 w-7 h-7 bg-green-500 rounded-full flex items-center justify-center shadow-md">
//                 <Unlock className="h-4 w-4 text-white" />
//               </div>
//             )}
//           </motion.div>
//           <CardTitle className="text-xl font-bold">{product.name}</CardTitle>
//           {requiresAuth && (
//             <Badge 
//               variant={isAuthenticated ? "default" : "destructive"} 
//               className={`text-xs font-medium ${isAuthenticated ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}
//             >
//               {isAuthenticated ? "Available" : "Login Required"}
//             </Badge>
//           )}
//         </CardHeader>
//         <CardContent className="text-center">
//           <CardDescription className="text-sm mb-4 text-gray-600">
//             {product.description}
//           </CardDescription>
          
//           <motion.div
//             initial={{ opacity: 0, height: 0 }}
//             animate={{ 
//               opacity: isSelected ? 1 : 0, 
//               height: isSelected ? 'auto' : 0 
//             }}
//             transition={{ duration: 0.3 }}
//             className="overflow-hidden"
//           >
//             <div className="space-y-3 pt-3 border-t border-gray-200">
//               <Button 
//                 size="sm" 
//                 className="w-full text-white font-medium shadow-md hover:shadow-lg transition-all duration-200"
//                 style={{ backgroundColor: product.color }}
//                 onClick={handleActionClick}
//                 disabled={requiresAuth && !isAuthenticated}
//               >
//                 {getActionButtonText()}
//               </Button>
//               <Button 
//                 variant="outline" 
//                 size="sm" 
//                 className="w-full border-2 font-medium transition-all duration-200 hover:shadow-md"
//                 style={{ 
//                   borderColor: product.color,
//                   color: product.color
//                 }}
//                 onClick={handleTryNowClick}
//                 disabled={requiresAuth && !isAuthenticated}
//               >
//                 {requiresAuth && !isAuthenticated ? 'Login First' : 'Try Now'}
//               </Button>
//             </div>
//           </motion.div>
//         </CardContent>
        
//         {/* Selection indicator */}
//         {isSelected && (
//           <motion.div
//             className="absolute -top-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-lg"
//             style={{ backgroundColor: product.color }}
//             initial={{ scale: 0 }}
//             animate={{ scale: 1 }}
//             transition={{ type: "spring", stiffness: 500, damping: 30 }}
//           >
//             ✓
//           </motion.div>
//         )}
//       </Card>
//     </motion.div>
//   );
// };

// export default ProductCard;

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Lock, Unlock } from "lucide-react";

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

// const ProductCard = ({
//   product,
//   isSelected,
//   onSelect,
//   onAction,
//   isAuthenticated = false,
// }: ProductCardProps) => {
//   const [isHovered, setIsHovered] = useState(false);
//   const requiresAuth = [
//     "community",
//     "e-seminar",
//     "e-conferences",
//     "e-learning",
//     "ai-medic-agents",
//     "podcast",
//     "data-verification",
//     "publication",
//     "medical-jobs",
//     "medical-blogs",
//   ].includes(product.id);

//   const getActionButtonText = () => {
//     const buttonTextMap: Record<string, string> = {
//       community: isAuthenticated ? "Access Community" : "Sign In Required",
//       "e-seminar": isAuthenticated ? "View Seminars" : "Sign In Required",
//       "e-learning": isAuthenticated ? "Access E-Learning" : "Sign In Required",
//       "e-conferences": isAuthenticated
//         ? "View Conferences"
//         : "Sign In Required",
//       publication: isAuthenticated ? "View Publications" : "Sign In Required",
//       "ai-medic-agents": "Try AI Assistant",
//       "medical-jobs": isAuthenticated ? "View Jobs" : "Sign In Required",
//       "medical-blogs": isAuthenticated ? "View Blogs" : "Sign In Required",
//       podcast: isAuthenticated ? "View Podcasts" : "Sign In Required",
//       "data-verification": isAuthenticated ? "Verify Data" : "Sign In Required",
//     };

//     return buttonTextMap[product.id] || "Learn More";
//   };

//   const handleActionClick = (e: React.MouseEvent) => {
//     e.stopPropagation();
//     if (requiresAuth && !isAuthenticated) return;
//     if (onAction) onAction();
//   };

//   const handleTryNowClick = (e: React.MouseEvent) => {
//     e.stopPropagation();
//     if (requiresAuth && !isAuthenticated) return;
//     if (onAction) onAction();
//   };

//   return (
//     <motion.div
//       className="relative"
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.3 }}
//       whileHover={{ y: -5 }}
//       onHoverStart={() => setIsHovered(true)}
//       onHoverEnd={() => setIsHovered(false)}
//     >
//       <Card
//         className={`cursor-pointer transition-all duration-300 border-2 bg-white/95 backdrop-blur-sm ${
//           isSelected
//             ? "ring-4 ring-offset-2 shadow-2xl scale-105 border-transparent"
//             : "hover:shadow-xl border-white/20 hover:border-white/40"
//         } ${isHovered ? "shadow-xl" : ""}`}
//         style={{
//           borderColor: isSelected ? product.color : undefined,
//           backgroundColor: isSelected ? `${product.color}15` : undefined,
//           boxShadow: isSelected ? `0 0 30px ${product.color}40` : undefined,
//         }}
//         onClick={() => onSelect(isSelected ? null : product.id)}
//       >
//         <CardHeader className="text-center pb-2">
//           <motion.div
//             className="w-20 h-20 mx-auto rounded-full flex items-center justify-center text-white text-2xl font-bold mb-3 relative shadow-lg"
//             style={{ backgroundColor: product.color }}
//             animate={{
//               scale: isSelected ? 1.1 : 1,
//               rotate: isHovered ? 5 : 0,
//             }}
//             transition={{ duration: 0.2 }}
//           >
//             {product.name.charAt(0)}
//             {requiresAuth && !isAuthenticated && (
//               <div className="absolute -top-1 -right-1 w-7 h-7 bg-red-500 rounded-full flex items-center justify-center shadow-md">
//                 <Lock className="h-4 w-4 text-white" />
//               </div>
//             )}
//             {requiresAuth && isAuthenticated && (
//               <div className="absolute -top-1 -right-1 w-7 h-7 bg-green-500 rounded-full flex items-center justify-center shadow-md">
//                 <Unlock className="h-4 w-4 text-white" />
//               </div>
//             )}
//           </motion.div>
//           <CardTitle className="text-xl font-bold">{product.name}</CardTitle>
//           {requiresAuth && (
//             <Badge
//               variant={isAuthenticated ? "default" : "destructive"}
//               className={`text-xs font-medium ${
//                 isAuthenticated
//                   ? "bg-green-100 text-green-800"
//                   : "bg-red-100 text-red-800"
//               }`}
//             >
//               {isAuthenticated ? "Available" : "Login Required"}
//             </Badge>
//           )}
//         </CardHeader>
//         <CardContent className="text-center">
//           <CardDescription className="text-sm mb-4 text-gray-600">
//             {product.description}
//           </CardDescription>

//           <motion.div
//             initial={{ opacity: 0, height: 0 }}
//             animate={{
//               opacity: isSelected ? 1 : 0,
//               height: isSelected ? "auto" : 0,
//             }}
//             transition={{ duration: 0.3 }}
//             className="overflow-hidden"
//           >
//             <div className="space-y-3 pt-3 border-t border-gray-200">
//               <Button
//                 size="sm"
//                 className="w-full text-white font-medium shadow-md hover:shadow-lg transition-all duration-200"
//                 style={{ backgroundColor: product.color }}
//                 onClick={handleActionClick}
//                 disabled={requiresAuth && !isAuthenticated}
//               >
//                 {getActionButtonText()}
//               </Button>
//               <Button
//                 variant="outline"
//                 size="sm"
//                 className="w-full border-2 font-medium transition-all duration-200 hover:shadow-md"
//                 style={{
//                   borderColor: product.color,
//                   color: product.color,
//                 }}
//                 onClick={handleTryNowClick}
//                 disabled={requiresAuth && !isAuthenticated}
//               >
//                 {requiresAuth && !isAuthenticated ? "Login First" : "Try Now"}
//               </Button>
//             </div>
//           </motion.div>
//         </CardContent>

//         {isSelected && (
//           <motion.div
//             className="absolute -top-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-lg"
//             style={{ backgroundColor: product.color }}
//             initial={{ scale: 0 }}
//             animate={{ scale: 1 }}
//             transition={{ type: "spring", stiffness: 500, damping: 30 }}
//           >
//             ✓
//           </motion.div>
//         )}
//       </Card>
//     </motion.div>
//   );
// };
// const ProductCard = ({
//   product,
//   isSelected,
//   onSelect,
//   onAction,
//   isAuthenticated = false,
// }: ProductCardProps) => {
//   const [isHovered, setIsHovered] = useState(false);
//   const requiresAuth = [
//     "community",
//     "e-seminar",
//     "e-conferences",
//     "ai-medic-agents",
//     "podcast",
//     "data-verification",
//     "e-learning",
//     "publication",
//     "medical-jobs",
//     "medical-blogs",
//   ].includes(product.id);

//   // Products that shouldn't show the "Try Now" button
//   const noTryNowProducts = ["podcast", "data-verification", "publication"];

//   const getActionButtonText = () => {
//     const buttonTextMap: Record<string, string> = {
//       community: isAuthenticated ? "Access Community" : "Sign In Required",
//       "e-seminar": isAuthenticated ? "View Seminars" : "Sign In Required",
//       "e-learning": isAuthenticated ? "Access E-Learning" : "Sign In Required",
//       "e-conferences": isAuthenticated
//         ? "View Conferences"
//         : "Sign In Required",
//       publication: isAuthenticated ? "View Publications" : "Sign In Required",
//       "ai-medic-agents": "Try AI Assistant",
//       "medical-jobs": isAuthenticated ? "View Jobs" : "Sign In Required",
//       "medical-blogs": isAuthenticated ? "View Blogs" : "Sign In Required",
//       podcast: isAuthenticated ? "View Podcasts" : "Sign In Required",
//       "data-verification": isAuthenticated ? "Verify Data" : "Sign In Required",
//     };

//     return buttonTextMap[product.id] || "Learn More";
//   };

//   const handleActionClick = (e: React.MouseEvent) => {
//     e.stopPropagation();
//     if (requiresAuth && !isAuthenticated) return;
//     if (onAction) onAction();
//   };

//   const handleTryNowClick = (e: React.MouseEvent) => {
//     e.stopPropagation();

//     if (requiresAuth && !isAuthenticated) return;

//     // Special handling for AI Medic Agents
//     if (product.id === "ai-medic-agents") {
//       window.open("https://ai-assistant.medorbis.ai/", "_blank");
//       return;
//     }

//     if (onAction) onAction();
//   };

//   return (
//     <motion.div
//       className="relative"
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.3 }}
//       whileHover={{ y: -5 }}
//       onHoverStart={() => setIsHovered(true)}
//       onHoverEnd={() => setIsHovered(false)}
//     >
//       <Card
//         className={`cursor-pointer transition-all duration-300 border-2 bg-white/95 backdrop-blur-sm ${
//           isSelected
//             ? "ring-4 ring-offset-2 shadow-2xl scale-105 border-transparent"
//             : "hover:shadow-xl border-white/20 hover:border-white/40"
//         } ${isHovered ? "shadow-xl" : ""}`}
//         style={{
//           borderColor: isSelected ? product.color : undefined,
//           backgroundColor: isSelected ? `${product.color}15` : undefined,
//           boxShadow: isSelected ? `0 0 30px ${product.color}40` : undefined,
//         }}
//         onClick={() => onSelect(isSelected ? null : product.id)}
//       >
//         <CardHeader className="text-center pb-2">
//           <motion.div
//             className="w-20 h-20 mx-auto rounded-full flex items-center justify-center text-white text-2xl font-bold mb-3 relative shadow-lg"
//             style={{ backgroundColor: product.color }}
//             animate={{
//               scale: isSelected ? 1.1 : 1,
//               rotate: isHovered ? 5 : 0,
//             }}
//             transition={{ duration: 0.2 }}
//           >
//             {product.name.charAt(0)}
//             {requiresAuth && !isAuthenticated && (
//               <div className="absolute -top-1 -right-1 w-7 h-7 bg-red-500 rounded-full flex items-center justify-center shadow-md">
//                 <Lock className="h-4 w-4 text-white" />
//               </div>
//             )}
//             {requiresAuth && isAuthenticated && (
//               <div className="absolute -top-1 -right-1 w-7 h-7 bg-green-500 rounded-full flex items-center justify-center shadow-md">
//                 <Unlock className="h-4 w-4 text-white" />
//               </div>
//             )}
//           </motion.div>
//           <CardTitle className="text-xl font-bold">{product.name}</CardTitle>
//           {requiresAuth && (
//             <Badge
//               variant={isAuthenticated ? "default" : "destructive"}
//               className={`text-xs font-medium ${
//                 isAuthenticated
//                   ? "bg-green-100 text-green-800"
//                   : "bg-red-100 text-red-800"
//               }`}
//             >
//               {isAuthenticated ? "Available" : "Login Required"}
//             </Badge>
//           )}
//         </CardHeader>
//         <CardContent className="text-center">
//           <CardDescription className="text-sm mb-4 text-gray-600">
//             {product.description}
//           </CardDescription>

//           <motion.div
//             initial={{ opacity: 0, height: 0 }}
//             animate={{
//               opacity: isSelected ? 1 : 0,
//               height: isSelected ? "auto" : 0,
//             }}
//             transition={{ duration: 0.3 }}
//             className="overflow-hidden"
//           >
//             <div className="space-y-3 pt-3 border-t border-gray-200">
//               <Button
//                 size="sm"
//                 className="w-full text-white font-medium shadow-md hover:shadow-lg transition-all duration-200"
//                 style={{ backgroundColor: product.color }}
//                 onClick={handleActionClick}
//                 disabled={requiresAuth && !isAuthenticated}
//               >
//                 {getActionButtonText()}
//               </Button>

//               {/* Only show Try Now button if product is not in noTryNowProducts array */}
//               {!noTryNowProducts.includes(product.id) && (
//                 <Button
//                   variant="outline"
//                   size="sm"
//                   className="w-full border-2 font-medium transition-all duration-200 hover:shadow-md"
//                   style={{
//                     borderColor: product.color,
//                     color: product.color,
//                   }}
//                   onClick={handleTryNowClick}
//                   disabled={requiresAuth && !isAuthenticated}
//                 >
//                   {requiresAuth && !isAuthenticated ? "Login First" : "Try Now"}
//                 </Button>
//               )}
//             </div>
//           </motion.div>
//         </CardContent>

//         {isSelected && (
//           <motion.div
//             className="absolute -top-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-lg"
//             style={{ backgroundColor: product.color }}
//             initial={{ scale: 0 }}
//             animate={{ scale: 1 }}
//             transition={{ type: "spring", stiffness: 500, damping: 30 }}
//           >
//             ✓
//           </motion.div>
//         )}
//       </Card>
//     </motion.div>
//   );
// };
const ProductCard = ({
  product,
  isSelected,
  onSelect,
  onAction,
  isAuthenticated = false,
}: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const requiresAuth = [
    "community",
    "e-seminar",
    "e-conferences",
    "ai-medic-agents",
    "podcast",
    "data-verification",
    "e-learning",
    "publication",
    "medical-jobs",
    "medical-blogs",
  ].includes(product.id);

  // Products that shouldn't show the "Try Now" button
  const noTryNowProducts = ["podcast", "data-verification", "publication"];

  // Products that are not available
  const notAvailableProducts = ["podcast", "data-verification", "publication"];

  const getActionButtonText = () => {
    const buttonTextMap: Record<string, string> = {
      community: isAuthenticated ? "Access Community" : "Sign In Required",
      "e-seminar": isAuthenticated ? "View Seminars" : "Sign In Required",
      "e-learning": isAuthenticated ? "Access E-Learning" : "Sign In Required",
      "e-conferences": isAuthenticated
        ? "View Conferences"
        : "Sign In Required",
      publication: "Not Available", // Updated
      "ai-medic-agents": "Try AI Assistant",
      "medical-jobs": isAuthenticated ? "View Jobs" : "Sign In Required",
      "medical-blogs": isAuthenticated ? "View Blogs" : "Sign In Required",
      podcast: "Not Available", // Updated
      "data-verification": "Not Available", // Updated
    };

    return buttonTextMap[product.id] || "Learn More";
  };

  const handleActionClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Don't allow action for not available products
    if (notAvailableProducts.includes(product.id)) return;
    if (requiresAuth && !isAuthenticated) return;
    if (onAction) onAction();
  };

  const handleTryNowClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Don't allow action for not available products
    if (notAvailableProducts.includes(product.id)) return;

    if (requiresAuth && !isAuthenticated) return;

    // Special handling for AI Medic Agents
    if (product.id === "ai-medic-agents") {
      window.open("https://ai-assistant.medorbis.ai/", "_blank");
      return;
    }

    if (onAction) onAction();
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
            ? "ring-4 ring-offset-2 shadow-2xl scale-105 border-transparent"
            : "hover:shadow-xl border-white/20 hover:border-white/40"
        } ${isHovered ? "shadow-xl" : ""}`}
        style={{
          borderColor: isSelected ? product.color : undefined,
          backgroundColor: isSelected ? `${product.color}15` : undefined,
          boxShadow: isSelected ? `0 0 30px ${product.color}40` : undefined,
        }}
        onClick={() => onSelect(isSelected ? null : product.id)}
      >
        <CardHeader className="text-center pb-2">
          <motion.div
            className="w-20 h-20 mx-auto rounded-full flex items-center justify-center text-white text-2xl font-bold mb-3 relative shadow-lg"
            style={{ backgroundColor: product.color }}
            animate={{
              scale: isSelected ? 1.1 : 1,
              rotate: isHovered ? 5 : 0,
            }}
            transition={{ duration: 0.2 }}
          >
            {product.name.charAt(0)}
            {requiresAuth &&
              !isAuthenticated &&
              !notAvailableProducts.includes(product.id) && (
                <div className="absolute -top-1 -right-1 w-7 h-7 bg-red-500 rounded-full flex items-center justify-center shadow-md">
                  <Lock className="h-4 w-4 text-white" />
                </div>
              )}
            {requiresAuth &&
              isAuthenticated &&
              !notAvailableProducts.includes(product.id) && (
                <div className="absolute -top-1 -right-1 w-7 h-7 bg-green-500 rounded-full flex items-center justify-center shadow-md">
                  <Unlock className="h-4 w-4 text-white" />
                </div>
              )}
            {notAvailableProducts.includes(product.id) && (
              <div className="absolute -top-1 -right-1 w-7 h-7 bg-gray-500 rounded-full flex items-center justify-center shadow-md">
                <Lock className="h-4 w-4 text-white" />
              </div>
            )}
          </motion.div>
          <CardTitle className="text-xl font-bold">{product.name}</CardTitle>
          {requiresAuth && (
            <Badge
              variant={
                notAvailableProducts.includes(product.id)
                  ? "secondary"
                  : isAuthenticated
                  ? "default"
                  : "destructive"
              }
              className={`text-xs font-medium ${
                notAvailableProducts.includes(product.id)
                  ? "bg-gray-100 text-gray-800"
                  : isAuthenticated
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {notAvailableProducts.includes(product.id)
                ? "coming soon"
                : // ? "Not Available"
                isAuthenticated
                ? "Available"
                : "Login Required"}
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
              height: isSelected ? "auto" : 0,
            }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="space-y-3 pt-3 border-t border-gray-200">
              <Button
                size="sm"
                className="w-full text-white font-medium shadow-md hover:shadow-lg transition-all duration-200"
                style={{
                  backgroundColor: product.color,
                  opacity: notAvailableProducts.includes(product.id) ? 0.6 : 1,
                }}
                onClick={handleActionClick}
                disabled={
                  notAvailableProducts.includes(product.id) ||
                  (requiresAuth && !isAuthenticated)
                }
              >
                {getActionButtonText()}
              </Button>

              {/* Only show Try Now button if product is not in noTryNowProducts array */}
              {!noTryNowProducts.includes(product.id) && (
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full border-2 font-medium transition-all duration-200 hover:shadow-md"
                  style={{
                    borderColor: product.color,
                    color: product.color,
                    opacity: notAvailableProducts.includes(product.id)
                      ? 0.6
                      : 1,
                  }}
                  onClick={handleTryNowClick}
                  disabled={
                    notAvailableProducts.includes(product.id) ||
                    (requiresAuth && !isAuthenticated)
                  }
                >
                  {notAvailableProducts.includes(product.id)
                    ? "Not Available"
                    : requiresAuth && !isAuthenticated
                    ? "Login First"
                    : "Try Now"}
                </Button>
              )}
            </div>
          </motion.div>
        </CardContent>

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