
import { useRef, useState, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Box } from '@react-three/drei';
import { Mesh, BufferGeometry, Float32BufferAttribute } from 'three';
import * as THREE from 'three';

interface Product {
  id: string;
  name: string;
  description: string;
  color: string;
  position: [number, number, number];
}

interface ProductBoxProps {
  product: Product;
  isSelected: boolean;
  onSelect: (id: string | null) => void;
}

const ProductBox = ({ product, isSelected, onSelect }: ProductBoxProps) => {
  const meshRef = useRef<Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      // Floating animation
      meshRef.current.position.y = product.position[1] + Math.sin(state.clock.elapsedTime + product.position[0]) * 0.1;
      
      // Rotation animation
      meshRef.current.rotation.x += 0.01;
      meshRef.current.rotation.y += 0.01;
      
      // Scale animation on hover/select
      const targetScale = isSelected ? 1.3 : hovered ? 1.1 : 1;
      meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
    }
  });

  // Create particle geometry using useMemo
  const particleGeometry = useMemo(() => {
    const particleCount = 50;
    const positions = new Float32Array(particleCount * 3);
    
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 4;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 4;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 4;
    }
    
    const geometry = new BufferGeometry();
    geometry.setAttribute('position', new Float32BufferAttribute(positions, 3));
    return geometry;
  }, []);

  return (
    <group position={product.position}>
      <Box
        ref={meshRef}
        args={[1.5, 1.5, 1.5]}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={() => onSelect(isSelected ? null : product.id)}
      >
        <meshStandardMaterial
          color={product.color}
          metalness={0.3}
          roughness={0.2}
          emissive={product.color}
          emissiveIntensity={isSelected ? 0.3 : hovered ? 0.1 : 0.05}
        />
      </Box>
      
      <Text
        position={[0, -1.2, 0]}
        fontSize={0.3}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {product.name}
      </Text>
      
      {/* Simplified particle effect for selected item */}
      {isSelected && (
        <points geometry={particleGeometry}>
          <pointsMaterial size={0.05} color={product.color} />
        </points>
      )}
    </group>
  );
};

export default ProductBox;
