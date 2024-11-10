import React from 'react';
import { motion } from 'framer-motion';
import { Dumbbell, Users, Salad } from 'lucide-react';
import { Link } from 'react-router-dom';

const services = [
  {
    icon: <Dumbbell className="w-12 h-12 text-purple-500" />,
    title: 'Personal Training',
    description: 'Customized workout plans tailored to your goals with one-on-one attention.',
    link: '/faq/personal-training'
  },
  {
    icon: <Users className="w-12 h-12 text-purple-500" />,
    title: 'Group Training',
    description: 'High-energy group sessions that combine motivation and community.',
    link: '/faq/group-training'
  },
  {
    icon: <Salad className="w-12 h-12 text-purple-500" />,
    title: 'Nutrition Coaching',
    description: 'Expert guidance on nutrition to complement your fitness journey.',
    link: '/faq/nutrition'
  },
];

const Services = () => {
  return (
    <section id="services" className="py-20 bg-zinc-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">Our Services</h2>
          <p className="text-gray-400">Comprehensive fitness solutions for every goal</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="bg-black p-8 rounded-lg hover:bg-zinc-800 transition-colors"
            >
              <div className="mb-6">{service.icon}</div>
              <h3 className="text-2xl font-semibold mb-4">{service.title}</h3>
              <p className="text-gray-400 mb-6">{service.description}</p>
              <Link
                to={service.link}
                className="text-[#3dd8e8] hover:text-[#34c5d3] transition-colors"
              >
                Learn More →
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;