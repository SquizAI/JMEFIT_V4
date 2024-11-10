import React from 'react';
import { motion } from 'framer-motion';
import { Dumbbell, Salad, Trophy } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Packages: React.FC = () => {
  const navigate = useNavigate();

  const packages = [
    {
      icon: <Trophy className="w-12 h-12 text-[#3dd8e8]" />,
      title: 'SHRED',
      price: '$299',
      duration: '6 weeks',
      level: 'Beginner to Advanced',
      description: 'Intensive transformation program designed to help you shed fat and build lean muscle.',
      features: [
        'Customized workout plan',
        'Nutrition guidance',
        'Weekly check-ins',
        'Progress tracking',
        'Form check videos',
        'Support via messaging'
      ]
    },
    {
      icon: <Salad className="w-12 h-12 text-[#3dd8e8]" />,
      title: 'Nutrition Only',
      price: '$199/month',
      duration: '3+ months',
      level: 'Beginner to Advanced',
      description: 'Comprehensive nutrition coaching to help you reach your goals through proper diet.',
      features: [
        'Personalized meal plans',
        'Macro tracking guidance',
        'Regular adjustments',
        'Recipe suggestions',
        'Supplement advice',
        'Ongoing support'
      ]
    },
    {
      icon: <Dumbbell className="w-12 h-12 text-[#3dd8e8]" />,
      title: 'Complete Package',
      price: '$349/month',
      duration: '3+ months',
      level: 'Beginner to Advanced',
      description: 'Full transformation package combining personalized workouts and nutrition.',
      features: [
        'Custom workout plans',
        'Nutrition coaching',
        'Weekly check-ins',
        'Form corrections',
        'Progress tracking',
        '24/7 messaging support'
      ]
    }
  ];

  const handleGetStarted = (packageTitle: string) => {
    navigate(`/checkout/${packageTitle.toLowerCase().replace(/\s+/g, '-')}`);
  };

  return (
    <section id="packages" className="py-20 bg-black">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">Transform with Us</h2>
          <p className="text-gray-400">Choose the perfect package for your fitness journey</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {packages.map((pkg, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="bg-zinc-900 rounded-lg p-8 hover:bg-zinc-800 transition-colors"
            >
              <div className="mb-6">{pkg.icon}</div>
              <h3 className="text-2xl font-bold mb-2">{pkg.title}</h3>
              <div className="text-[#3dd8e8] text-2xl font-bold mb-4">{pkg.price}</div>
              <div className="text-purple-500 mb-4">
                <span className="mr-2">{pkg.duration}</span>
                <span className="text-gray-400">•</span>
                <span className="ml-2">{pkg.level}</span>
              </div>
              <p className="text-gray-400 mb-6">{pkg.description}</p>
              <ul className="space-y-3 mb-8">
                {pkg.features.map((feature, i) => (
                  <li key={i} className="flex items-center text-gray-300">
                    <span className="mr-2 text-[#3dd8e8]">•</span>
                    {feature}
                  </li>
                ))}
              </ul>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleGetStarted(pkg.title)}
                className="w-full bg-[#3dd8e8] text-black py-3 rounded-lg font-semibold hover:bg-[#34c5d3] transition-colors"
              >
                Get Started
              </motion.button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Packages;