import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import UserProgressChart from './UserProgressChart';
import UserMetricsGrid from './UserMetricsGrid';
import { Calendar, Filter } from 'lucide-react';

const UserProgressDashboard = () => {
  const [timeRange, setTimeRange] = useState('30d');
  const [selectedMetrics, setSelectedMetrics] = useState(['weight', 'bodyFat']);

  // Mock data - replace with actual data from your database
  const progressData = [
    {
      date: '2024-02-15',
      weight: 180,
      bodyFat: 20,
      workoutCount: 3,
      caloriesConsumed: 2200
    },
    {
      date: '2024-03-01',
      weight: 175,
      bodyFat: 18,
      workoutCount: 4,
      caloriesConsumed: 2100
    },
    {
      date: '2024-03-15',
      weight: 172,
      bodyFat: 17,
      workoutCount: 5,
      caloriesConsumed: 2000
    }
  ];

  const metrics = [
    {
      label: 'Current Weight',
      value: 172,
      change: -4.4,
      unit: 'lbs'
    },
    {
      label: 'Body Fat',
      value: 17,
      change: -15,
      unit: '%'
    },
    {
      label: 'Workouts/Week',
      value: 5,
      change: 66.7
    },
    {
      label: 'Daily Calories',
      value: 2000,
      change: -9.1,
      unit: 'kcal'
    }
  ];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-[#3dd8e8]">User Progress</h2>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-gray-400" />
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="bg-zinc-900 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3dd8e8]"
            >
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
              <option value="1y">Last year</option>
            </select>
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-gray-400" />
            <select
              multiple
              value={selectedMetrics}
              onChange={(e) => setSelectedMetrics(Array.from(e.target.selectedOptions, option => option.value))}
              className="bg-zinc-900 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3dd8e8]"
            >
              <option value="weight">Weight</option>
              <option value="bodyFat">Body Fat</option>
              <option value="workoutCount">Workouts</option>
              <option value="caloriesConsumed">Calories</option>
            </select>
          </div>
        </div>
      </div>

      <UserMetricsGrid metrics={metrics} />

      <div className="mt-8">
        <UserProgressChart data={progressData} metrics={selectedMetrics} />
      </div>
    </div>
  );
};

export default UserProgressDashboard;