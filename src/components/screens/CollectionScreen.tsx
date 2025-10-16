import { useState } from "react";
import { motion } from "framer-motion";
import VirtualTryOn from "../VirtualTryOn";
import ProductCard from "../ProductCard";

interface Product {
  id: number;
  name: string;
  category: string;
  image: string;
}

const products: Product[] = [
  { id: 1, name: "Celestial Ring", category: "Ring", image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=500" },
  { id: 2, name: "Aurora Necklace", category: "Necklace", image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500" },
  { id: 3, name: "Nebula Bracelet", category: "Bracelet", image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=500" },
  { id: 4, name: "Cosmic Earrings", category: "Earrings", image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=500" },
  { id: 5, name: "Stardust Ring", category: "Ring", image: "photo-1603561596112-0a132b757442-removebg-preview.png" },
  { id: 6, name: "Galaxy Pendant", category: "Necklace", image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=500" },
  { id: 7, name: "Lunar Bangle", category: "Bracelet", image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=500" },
  { id: 8, name: "Stellar Hoops", category: "Earrings", image: "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=500" },
];

interface CollectionScreenProps {
  onComplete: () => void;
}

const CollectionScreen = ({ onComplete }: CollectionScreenProps) => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, filter: "blur(20px)" }}
      transition={{ duration: 1 }}
      className="relative w-full h-full overflow-y-auto bg-background"
    >
      <div className="min-h-screen py-20 px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-6xl font-bold gradient-text mb-4">
            Your Curated Collection
          </h2>
          <p className="text-xl text-muted-foreground">
            Pieces selected to match your unique aesthetic
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto mb-16">
          {products.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              index={index}
              onTryOn={() => setSelectedProduct(product)}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-center"
        >
          <button
            onClick={onComplete}
            className="px-12 py-4 bg-gradient-primary text-primary-foreground font-semibold rounded-full shadow-glow-primary hover:shadow-glow-secondary transition-all duration-300"
          >
            Complete Experience
          </button>
        </motion.div>
      </div>

      {selectedProduct && (
        <VirtualTryOn
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </motion.div>
  );
};

export default CollectionScreen;
