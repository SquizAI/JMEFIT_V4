import React from 'react';
import { motion } from 'framer-motion';
import { Activity, Calendar, Book, Settings } from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';

const UserDashboard = () => {
  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <div className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-6xl mx-auto"
        >
          <h1 className="text-3xl font-bold mb-8">My Dashboard</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-zinc-900 p-6 rounded-lg"
            >
              <Activity className="w-8 h-8 text-[#3dd8e8] mb-4" />
              <h2 className="text-xl font-semibold mb-2">Workout Progress</h2>
              <p className="text-gray-400">Track your fitness journey</p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-zinc-900 p-6 rounded-lg"
            >
              <Calendar className="w-8 h-8 text-[#3dd8e8] mb-4" />
              <h2 className="text-xl font-semibold mb-2">Schedule</h2>
              <p className="text-gray-400">View upcoming sessions</p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-zinc-900 p-6 rounded-lg"
            >
              <Book className="w-8 h-8 text-[#3dd8e8] mb-4" />
              <h2 className="text-xl font-semibold mb-2">Nutrition Log</h2>
              <p className="text-gray-400">Track your meals and macros</p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-zinc-900 p-6 rounded-lg"
            >
              <Settings className="w-8 h-8 text-[#3dd8e8] mb-4" />
              <h2 className="text-xl font-semibold mb-2">Settings</h2>
              <p className="text-gray-400">Manage your account</p>
            </motion.div>
          </div>

          <div className="mt-12 bg-zinc-900 p-8 rounded-lg">
            <h2 className="text-2xl font-semibold mb-6">Recent Activity</h2>
            <div className="space-y-4">
              {[1, 2, 3].map((_, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-black rounded-lg"
                >
                  <div>
                    <h3 className="font-semibold">Workout Completed</h3>
                    <p className="text-gray-400">Upper Body Strength</p>
                  </div>
                  <span className="text-gray-400">2 days ago</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
};

export default UserDashboard;