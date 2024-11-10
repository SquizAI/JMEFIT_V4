import React from 'react';
import { motion } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

const FAQ = () => {
  const [openIndex, setOpenIndex] = React.useState<number | null>(null);

  const faqs = [
    {
      question: 'What makes JME FIT different from other fitness programs?',
      answer: 'JME FIT offers personalized training and nutrition plans tailored to your specific goals, with continuous support and adjustments throughout your journey.'
    },
    {
      question: 'How often will I receive updates to my program?',
      answer: 'Programs are reviewed and updated weekly based on your progress and feedback, ensuring optimal results.'
    },
    {
      question: 'Do I need gym access for the programs?',
      answer: 'While some programs are optimized for gym settings, we offer home workout alternatives and can adapt programs based on available equipment.'
    },
    {
      question: 'What kind of support is included?',
      answer: "You will receive regular check-ins, form feedback, nutrition guidance, and direct messaging access to your coach."
    }
  ];

  return (
    <section id="faq" className="py-20 bg-zinc-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4">Frequently Asked Questions</h2>
          <p className="text-gray-400">Find answers to common questions about our programs</p>
        </motion.div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-black rounded-lg"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-4 flex justify-between items-center text-left"
              >
                <span className="font-semibold">{faq.question}</span>
                {openIndex === index ? (
                  <Minus className="w-5 h-5 text-purple-500" />
                ) : (
                  <Plus className="w-5 h-5 text-purple-500" />
                )}
              </button>
              {openIndex === index && (
                <div className="px-6 pb-4 text-gray-400">
                  {faq.answer}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;