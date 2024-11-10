import React from 'react';
import { motion } from 'framer-motion';

const transformations = [
  {
    name: 'John D.',
    before: 'https://images.unsplash.com/photo-1543975200-8e313fb04fc7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    after: 'https://images.unsplash.com/photo-1571731956672-f2b94d7dd0cb?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    story: 'Lost 30 lbs and gained confidence through consistent training and nutrition.',
    duration: '6 months'
  },
  {
    name: 'Sarah M.',
    before: 'https://images.unsplash.com/photo-1541534401786-2077eed87a74?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    after: 'https://images.unsplash.com/photo-1579047440583-43a690fe2243?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    story: 'Transformed her lifestyle and achieved her dream physique.',
    duration: '8 months'
  }
];

const SuccessStories = () => {
  return (
    <section className="py-20 bg-zinc-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">Transformation Stories</h2>
          <p className="text-gray-400">Real results from real people</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {transformations.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="bg-black rounded-lg overflow-hidden"
            >
              <div className="flex gap-4 p-6">
                <div className="w-1/2">
                  <p className="text-sm text-gray-400 mb-2">Before</p>
                  <img
                    src={item.before}
                    alt={`${item.name} before`}
                    className="w-full h-64 object-cover rounded-lg"
                  />
                </div>
                <div className="w-1/2">
                  <p className="text-sm text-gray-400 mb-2">After</p>
                  <img
                    src={item.after}
                    alt={`${item.name} after`}
                    className="w-full h-64 object-cover rounded-lg"
                  />
                </div>
              </div>
              <div className="p-6 bg-zinc-900">
                <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
                <p className="text-purple-400 mb-2">{item.duration} transformation</p>
                <p className="text-gray-400">{item.story}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-purple-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-purple-700 transition-colors"
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Start Your Transformation
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default SuccessStories;