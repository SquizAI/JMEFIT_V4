import React from 'react';
import { motion } from 'framer-motion';
import { Plus, Minus, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

interface FAQ {
  question: string;
  answer: string;
}

interface ServiceFAQProps {
  title: string;
  description: string;
  faqs: FAQ[];
  price: string;
  features: string[];
}

const ServiceFAQ = ({ title, description, faqs, price, features }: ServiceFAQProps) => {
  const [openIndex, setOpenIndex] = React.useState<number | null>(null);

  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl font-bold mb-4">{title}</h1>
            <p className="text-gray-400 mb-8">{description}</p>
            <div className="inline-block bg-zinc-900 px-6 py-2 rounded-full">
              <span className="text-[#3dd8e8] text-2xl font-bold">{price}</span>
            </div>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-4"
            >
              <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-zinc-900 rounded-lg"
                >
                  <button
                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                    className="w-full px-6 py-4 flex justify-between items-center text-left"
                  >
                    <span className="font-semibold">{faq.question}</span>
                    {openIndex === index ? (
                      <Minus className="w-5 h-5 text-[#3dd8e8]" />
                    ) : (
                      <Plus className="w-5 h-5 text-[#3dd8e8]" />
                    )}
                  </button>
                  {openIndex === index && (
                    <div className="px-6 pb-4 text-gray-400">
                      {faq.answer}
                    </div>
                  )}
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-zinc-900 p-8 rounded-lg"
            >
              <h2 className="text-2xl font-bold mb-6">Start Your Journey Today</h2>
              <ul className="space-y-4 mb-8">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-center text-gray-300">
                    <ArrowRight className="w-5 h-5 text-[#3dd8e8] mr-2" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Link to="/signup">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-[#3dd8e8] text-black py-3 rounded-lg font-semibold hover:bg-[#34c5d3] transition-colors"
                >
                  Sign Up Now
                </motion.button>
              </Link>
              <p className="text-center text-gray-400 mt-4">
                Already have an account?{' '}
                <Link to="/login" className="text-[#3dd8e8] hover:text-[#34c5d3]">
                  Sign In
                </Link>
              </p>
            </motion.div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ServiceFAQ;