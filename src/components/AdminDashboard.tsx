import React from 'react';
import { motion } from 'framer-motion';

const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-black text-white p-8">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-zinc-900 p-6 rounded-lg"
        >
          <h2 className="text-xl font-semibold mb-4">Content Management</h2>
          <ul className="space-y-2">
            <li>
              <button className="text-[#3dd8e8] hover:text-[#34c5d3]">
                Manage Blog Posts
              </button>
            </li>
            <li>
              <button className="text-[#3dd8e8] hover:text-[#34c5d3]">
                Edit Success Stories
              </button>
            </li>
            <li>
              <button className="text-[#3dd8e8] hover:text-[#34c5d3]">
                Update Packages
              </button>
            </li>
          </ul>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-zinc-900 p-6 rounded-lg"
        >
          <h2 className="text-xl font-semibold mb-4">User Management</h2>
          <ul className="space-y-2">
            <li>
              <button className="text-[#3dd8e8] hover:text-[#34c5d3]">
                View All Users
              </button>
            </li>
            <li>
              <button className="text-[#3dd8e8] hover:text-[#34c5d3]">
                Manage Subscriptions
              </button>
            </li>
            <li>
              <button className="text-[#3dd8e8] hover:text-[#34c5d3]">
                Client Progress
              </button>
            </li>
          </ul>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-zinc-900 p-6 rounded-lg"
        >
          <h2 className="text-xl font-semibold mb-4">Analytics</h2>
          <ul className="space-y-2">
            <li>
              <button className="text-[#3dd8e8] hover:text-[#34c5d3]">
                View Statistics
              </button>
            </li>
            <li>
              <button className="text-[#3dd8e8] hover:text-[#34c5d3]">
                Revenue Reports
              </button>
            </li>
            <li>
              <button className="text-[#3dd8e8] hover:text-[#34c5d3]">
                User Engagement
              </button>
            </li>
          </ul>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminDashboard;