import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell
} from 'recharts';
import { 
  TrendingUp, Users, FileText, Clock, Calendar, Filter,
  ChevronDown, ChevronUp
} from 'lucide-react';
import { db } from '../../db';

const AnalyticsDashboard = () => {
  const [timeRange, setTimeRange] = useState('7d');
  const [data, setData] = useState({
    pageViews: [],
    userEngagement: [],
    contentPerformance: [],
    userGrowth: []
  });

  // Mock data - replace with actual analytics data
  useEffect(() => {
    // Fetch analytics data based on timeRange
    const mockData = {
      pageViews: [
        { date: '2024-03-10', views: 1200 },
        { date: '2024-03-11', views: 1400 },
        { date: '2024-03-12', views: 1100 },
        { date: '2024-03-13', views: 1600 },
        { date: '2024-03-14', views: 1800 },
        { date: '2024-03-15', views: 2000 },
        { date: '2024-03-16', views: 1900 }
      ],
      userEngagement: [
        { type: 'Articles', value: 40 },
        { type: 'Workouts', value: 30 },
        { type: 'Recipes', value: 20 },
        { type: 'Other', value: 10 }
      ],
      contentPerformance: [
        { title: '5 Essential Core Exercises', views: 2500 },
        { title: 'High-Protein Breakfast Bowl', views: 2000 },
        { title: 'HIIT Benefits', views: 1800 },
        { title: 'Post-Workout Smoothies', views: 1500 }
      ],
      userGrowth: [
        { date: '2024-03-10', users: 100 },
        { date: '2024-03-11', users: 120 },
        { date: '2024-03-12', users: 140 },
        { date: '2024-03-13', users: 160 },
        { date: '2024-03-14', users: 190 },
        { date: '2024-03-15', users: 220 },
        { date: '2024-03-16', users: 250 }
      ]
    };

    setData(mockData);
  }, [timeRange]);

  const COLORS = ['#3dd8e8', '#9333ea', '#f43f5e', '#10b981'];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-[#3dd8e8]">Analytics Dashboard</h2>
        <div className="flex items-center gap-4">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-4 py-2 bg-zinc-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3dd8e8]"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          { title: 'Total Views', value: '12.5K', icon: TrendingUp, change: '+15%' },
          { title: 'Active Users', value: '2.8K', icon: Users, change: '+8%' },
          { title: 'Content Pieces', value: '156', icon: FileText, change: '+12%' },
          { title: 'Avg. Time', value: '4:32', icon: Clock, change: '+5%' }
        ].map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-zinc-900 p-6 rounded-lg"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-gray-400 text-sm">{stat.title}</p>
                <h3 className="text-2xl font-bold">{stat.value}</h3>
              </div>
              <stat.icon className="w-6 h-6 text-[#3dd8e8]" />
            </div>
            <div className={`flex items-center gap-1 text-sm ${
              stat.change.startsWith('+') ? 'text-green-500' : 'text-red-500'
            }`}>
              {stat.change.startsWith('+') ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
              {stat.change}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-zinc-900 p-6 rounded-lg"
        >
          <h3 className="text-xl font-semibold mb-6">Page Views</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data.pageViews}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="date" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#18181b',
                    border: 'none',
                    borderRadius: '0.5rem'
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="views"
                  stroke="#3dd8e8"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-zinc-900 p-6 rounded-lg"
        >
          <h3 className="text-xl font-semibold mb-6">Content Distribution</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data.userEngagement}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                  label
                >
                  {data.userEngagement.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#18181b',
                    border: 'none',
                    borderRadius: '0.5rem'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-zinc-900 p-6 rounded-lg"
      >
        <h3 className="text-xl font-semibold mb-6">Top Performing Content</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data.contentPerformance}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="title" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#18181b',
                  border: 'none',
                  borderRadius: '0.5rem'
                }}
              />
              <Bar dataKey="views" fill="#3dd8e8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
    </div>
  );
};

export default AnalyticsDashboard;