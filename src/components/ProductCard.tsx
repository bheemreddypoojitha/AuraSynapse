import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Camera } from "lucide-react";

interface Product {
  id: number;
  name: string;
  category: string;
  image: string;
}

interface ProductCardProps {
  product: Product;
  index: number;
  onTryOn: () => void;
}

const ProductCard = ({ product, index, onTryOn }: ProductCardProps) => {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const tiltX = ((y - centerY) / centerY) * -10;
    const tiltY = ((x - centerX) / centerX) * 10;
    
    setTilt({ x: tiltX, y: tiltY });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        delay: index * 0.1,
        duration: 0.6,
        ease: [0.34, 1.56, 0.64, 1]
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: 'transform 0.2s ease-out',
      }}
      className="group relative"
    >
      <div className="glass rounded-2xl overflow-hidden hover:shadow-glow-primary transition-all duration-300">
        <div className="relative aspect-square overflow-hidden">
          <motion.img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.4 }}
          />
          
          <motion.div
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            className="absolute inset-0 bg-gradient-primary/20 backdrop-blur-sm flex items-center justify-center"
          >
            <button
              onClick={onTryOn}
              className="px-6 py-3 bg-background/90 text-foreground rounded-full font-semibold flex items-center gap-2 hover:scale-105 transition-transform"
            >
              <Camera size={20} />
              Virtual Try-On
            </button>
          </motion.div>
        </div>

        <div className="p-6 space-y-2">
          <p className="text-xs text-secondary uppercase tracking-wider">
            {product.category}
          </p>
          <h3 className="text-xl font-semibold text-foreground">
            {product.name}
          </h3>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;