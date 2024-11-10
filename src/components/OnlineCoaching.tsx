import React from 'react';
import { motion } from 'framer-motion';
import { Monitor, MessageCircle, Video, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

const OnlineCoaching: React.FC = () => {
  const features = [
    {
      icon: <Monitor className="w-8 h-8 text-[#3dd8e8]" />,
      title: 'Custom Workout Plans',
      description: 'Personalized training programs designed for your goals and schedule.',
    },
    {
      icon: <MessageCircle className="w-8 h-8 text-[#3dd8e8]" />,
      title: 'Daily Support',
      description: 'Direct messaging access to your coach for guidance and motivation.',
    },
    {
      icon: <Video className="w-8 h-8 text-[#3dd8e8]" />,
      title: 'Video Analysis',
      description: 'Form check and technique improvements through video feedback.',
    },
    {
      icon: <Calendar className="w-8 h-8 text-[#3dd8e8]" />,
      title: 'Progress Tracking',
      description: 'Regular check-ins and adjustments to optimize your results.',
    },
  ];

  return (
    <section className="py-20 bg-zinc-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">Online Coaching</h2>
          <p className="text-gray-400">Transform your fitness journey from anywhere in the world</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="bg-black p-6 rounded-lg"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link to="/services#packages">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#3dd8e8] text-black px-8 py-3 rounded-full text-lg font-semibold hover:bg-[#34c5d3] transition-colors"
            >
              Start Your Online Journey
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default OnlineCoaching;