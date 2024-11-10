import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CreditCard, Lock } from 'lucide-react';
import { loadStripe } from '@stripe/stripe-js';
import { db } from '../config/firebase';
import { collection, addDoc } from 'firebase/firestore';
import Navbar from './Navbar';
import Footer from './Footer';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const Checkout = () => {
  const { package: packageName } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const stripe = await stripePromise;
      if (!stripe) throw new Error('Stripe failed to initialize');

      // Create a payment intent
      const paymentIntent = await addDoc(collection(db, 'payment_intents'), {
        package: packageName,
        amount: getPackagePrice(),
        status: 'pending',
        createdAt: new Date().toISOString()
      });

      // Redirect to success page after payment
      const result = await stripe.redirectToCheckout({
        sessionId: paymentIntent.id
      });

      if (result.error) {
        throw new Error(result.error.message);
      }

    } catch (err) {
      setError('Payment failed. Please try again.');
      console.error('Payment error:', err);
    } finally {
      setLoading(false);
    }
  };

  const getPackagePrice = () => {
    // Map package names to prices
    const prices = {
      'shred': 29900, // $299.00
      'nutrition-only': 19900, // $199.00
      'complete-package': 34900 // $349.00
    };
    return prices[packageName as keyof typeof prices] || 29900;
  };

  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <div className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl mx-auto bg-zinc-900 rounded-lg p-8"
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4 text-white">
              Complete Your Purchase
            </h2>
            <p className="text-gray-400">
              You're signing up for the {packageName?.replace(/-/g, ' ')} package
            </p>
          </div>

          {error && (
            <div className="bg-red-500/10 text-red-500 p-4 rounded-lg mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Card Information
              </label>
              <div id="card-element" className="p-4 bg-black rounded-lg">
                {/* Stripe Elements will be mounted here */}
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="w-full bg-[#3dd8e8] text-black py-4 rounded-lg font-semibold hover:bg-[#34c5d3] transition-colors disabled:opacity-50"
            >
              {loading ? 'Processing...' : 'Complete Purchase'}
            </motion.button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-400">
            <Lock className="inline-block w-4 h-4 mr-1" />
            Secure payment powered by Stripe
          </div>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
};

export default Checkout;