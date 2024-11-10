import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Services from '../components/Services';
import Packages from '../components/Packages';
import OnlineCoaching from '../components/OnlineCoaching';

const ServicesPage = () => {
  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <div className="pt-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="container mx-auto px-4 py-12 text-center"
        >
          <h1 className="text-4xl font-bold mb-4">Our Services</h1>
          <p className="text-gray-400">Transform your fitness journey with our expert guidance</p>
        </motion.div>
        <Services />
        <Packages />
        <OnlineCoaching />
      </div>
      <Footer />
    </div>
  );
};

export default ServicesPage;