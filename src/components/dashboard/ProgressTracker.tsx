import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Calendar, ArrowUp, ArrowDown } from 'lucide-react';
import { format } from 'date-fns';
import { ProgressService } from '../../services/progress';
import { useAuth } from '../../contexts/AuthContext';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const ProgressTracker = () => {
  const { user } = useAuth();
  const [timeRange, setTimeRange] = useState('30d');
  const [progressData, setProgressData] = useState({
    labels: [],
    datasets: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadProgress = async () => {
      if (!user) return;

      try {
        setLoading(true);
        const progress = await ProgressService.getUserProgress(user.id);
        
        const labels = progress.map(entry => format(entry.date, 'MMM d'));
        const weightData = progress.map(entry => entry.weight);
        const bodyFatData = progress.map(entry => entry.bodyFat);

        setProgressData({
          labels,
          datasets: [
            {
              label: 'Weight (lbs)',
              data: weightData,
              borderColor: '#3dd8e8',
              tension: 0.4
            },
            {
              label: 'Body Fat %',
              data: bodyFatData,
              borderColor: '#9333ea',
              tension: 0.4
            }
          ]
        });
      } catch (err) {
        setError('Failed to load progress data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadProgress();
  }, [user, timeRange]);

  const metrics = [
    {
      label: 'Current Weight',
      value: progressData.datasets[0]?.data.slice(-1)[0] || '---',
      unit: 'lbs',
      change: -3.8
    },
    {
      label: 'Body Fat',
      value: progressData.datasets[1]?.data.slice(-1)[0] || '---',
      unit: '%',
      change: -2.2
    }
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#3dd8e8]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 py-8">
        {error}
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-[#3dd8e8]">Progress Tracker</h2>
        <div className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-gray-400" />
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="bg-zinc-900 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3dd8e8]"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
            <option value="1y">Last year</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {metrics.map((metric, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-zinc-900 p-6 rounded-lg"
          >
            <p className="text-gray-400 text-sm mb-2">{metric.label}</p>
            <div className="flex items-end justify-between">
              <h3 className="text-2xl font-bold">
                {metric.value}
                {metric.unit && <span className="text-sm ml-1">{metric.unit}</span>}
              </h3>
              <div
                className={`flex items-center text-sm ${
                  metric.change > 0 ? 'text-green-500' : 'text-red-500'
                }`}
              >
                {metric.change > 0 ? (
                  <ArrowUp className="w-4 h-4 mr-1" />
                ) : (
                  <ArrowDown className="w-4 h-4 mr-1" />
                )}
                {Math.abs(metric.change)}%
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-zinc-900 p-6 rounded-lg"
      >
        <h3 className="text-xl font-semibold mb-6">Progress Chart</h3>
        <div className="h-80">
          <Line
            data={progressData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              scales: {
                y: {
                  beginAtZero: false,
                  grid: {
                    color: 'rgba(75, 85, 99, 0.2)'
                  },
                  ticks: {
                    color: '#9ca3af'
                  }
                },
                x: {
                  grid: {
                    color: 'rgba(75, 85, 99, 0.2)'
                  },
                  ticks: {
                    color: '#9ca3af'
                  }
                }
              },
              plugins: {
                legend: {
                  labels: {
                    color: '#9ca3af'
                  }
                }
              }
            }}
          />
        </div>
      </motion.div>
    </div>
  );
};

export default ProgressTracker;