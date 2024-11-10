import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Instagram } from 'lucide-react';
import { Link } from 'react-router-dom';
import Logo from './Logo';

const Hero: React.FC = () => {
  const scrollToServices = () => {
    const servicesSection = document.getElementById('services');
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div id="home" className="relative h-screen flex items-center justify-center">
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1549060279-7e168fcee0c2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-black/70" />
      </div>

      <div className="container mx-auto px-4 z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex justify-center mb-8"
          >
            <Logo className="w-72 h-auto" />
          </motion.div>
          <p className="text-xl md:text-2xl mb-8 text-[#3dd8e8]">
            Transform Your Body • Elevate Your Mind • Achieve Your Goals
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/services#packages">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-[#3dd8e8] text-black px-8 py-3 rounded-full text-lg font-semibold hover:bg-[#34c5d3] transition-colors"
              >
                Start Your Journey
              </motion.button>
            </Link>
            <motion.a
              href="https://www.instagram.com/jmefit_/"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-[#3dd8e8] text-white px-8 py-3 rounded-full text-lg font-semibold hover:from-purple-700 hover:to-[#34c5d3] transition-colors"
            >
              <Instagram className="w-5 h-5" />
              Follow on Instagram
            </motion.a>
          </div>
        </motion.div>
      </div>

      <motion.button
        onClick={scrollToServices}
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-[#3dd8e8] hover:text-[#34c5d3] transition-colors cursor-pointer"
      >
        <ChevronDown className="w-8 h-8" />
      </motion.button>
    </div>
  );
};

export default Hero;