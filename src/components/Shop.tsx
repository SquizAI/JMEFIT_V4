import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag } from 'lucide-react';

const Shop = () => {
  // Replace with your actual Shopify store URL
  const shopifyUrl = 'https://your-store.myshopify.com';

  return (
    <section className="py-20 bg-zinc-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4">JME FIT Shop</h2>
          <p className="text-gray-400 mb-8">Get your fitness essentials</p>
          
          <motion.a
            href={shopifyUrl}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 bg-[#3dd8e8] text-black px-8 py-3 rounded-full text-lg font-semibold hover:bg-[#34c5d3] transition-colors"
          >
            <ShoppingBag className="w-5 h-5" />
            Visit Store
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default Shop;