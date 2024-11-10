import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ProductCard from './ProductCard';
import { ShoppingBag } from 'lucide-react';

// This would come from your database
const products = [
  {
    id: '1',
    name: 'Resistance Bands Set',
    price: 29.99,
    image: 'https://images.unsplash.com/photo-1598289431512-b97b0917affc?auto=format&fit=crop&w=1074&q=80',
    description: 'Complete set of resistance bands for home workouts'
  },
  {
    id: '2',
    name: 'Protein Shaker',
    price: 14.99,
    image: 'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?auto=format&fit=crop&w=1074&q=80',
    description: 'Premium protein shaker with mixing ball'
  }
];

const Store = () => {
  const [cart, setCart] = useState<string[]>([]);

  const handleAddToCart = (id: string) => {
    setCart([...cart, id]);
  };

  return (
    <section className="py-20 bg-black">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4">JME FIT Store</h2>
          <p className="text-gray-400">Get equipped for your fitness journey</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              {...product}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>

        {cart.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="fixed bottom-4 right-4 bg-[#3dd8e8] text-black p-4 rounded-lg shadow-lg"
          >
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5" />
              <span>{cart.length} items in cart</span>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Store;