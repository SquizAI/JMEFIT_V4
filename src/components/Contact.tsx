import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Send } from 'lucide-react';
import ReCAPTCHA from 'react-google-recaptcha';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../config/firebase';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    goals: ''
  });
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus('');

    try {
      const token = await recaptchaRef.current?.execute();
      
      if (!token) {
        setStatus('Please verify that you are not a robot');
        return;
      }

      // Save to Firebase
      await addDoc(collection(db, 'contacts'), {
        ...formData,
        recaptchaToken: token,
        createdAt: new Date().toISOString()
      });

      setStatus('Thanks for reaching out! We\'ll get back to you soon.');
      setFormData({ name: '', email: '', goals: '' });
      recaptchaRef.current?.reset();
    } catch (error) {
      console.error('Contact form error:', error);
      setStatus('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id="contact" className="py-20 bg-zinc-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Start Your Journey</h2>
            <p className="text-gray-400">Get in touch to begin your transformation</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-black rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Your name"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-black rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="your@email.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">What are your goals?</label>
              <textarea
                name="goals"
                value={formData.goals}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-black rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 h-32"
                placeholder="Tell us about your fitness goals and what you'd like to achieve"
                required
              ></textarea>
            </div>

            <ReCAPTCHA
              ref={recaptchaRef}
              sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
              size="invisible"
              theme="dark"
            />

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              disabled={loading}
              className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
              ) : (
                <>
                  Send Message
                  <Send className="w-4 h-4" />
                </>
              )}
            </motion.button>
          </form>

          {status && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={`mt-4 text-center ${
                status.includes('wrong') || status.includes('robot')
                  ? 'text-red-400'
                  : 'text-purple-400'
              }`}
            >
              {status}
            </motion.p>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;