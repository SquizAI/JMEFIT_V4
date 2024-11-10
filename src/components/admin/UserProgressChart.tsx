import React from 'react';
import { motion } from 'framer-motion';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';

interface ProgressDataPoint {
  date: string;
  weight?: number;
  bodyFat?: number;
  workoutCount?: number;
  caloriesConsumed?: number;
}

interface UserProgressChartProps {
  data: ProgressDataPoint[];
  metrics: string[];
}

const UserProgressChart: React.FC<UserProgressChartProps> = ({ data, metrics }) => {
  const colors = {
    weight: '#3dd8e8',
    bodyFat: '#9333ea',
    workoutCount: '#10b981',
    caloriesConsumed: '#f43f5e'
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-zinc-900 p-6 rounded-lg"
    >
      <h3 className="text-xl font-semibold mb-6">Progress Over Time</h3>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis
              dataKey="date"
              stroke="#9ca3af"
              tickFormatter={(date) => new Date(date).toLocaleDateString()}
            />
            <YAxis stroke="#9ca3af" />
            <Tooltip
              contentStyle={{
                backgroundColor: '#18181b',
                border: 'none',
                borderRadius: '0.5rem'
              }}
            />
            <Legend />
            {metrics.map((metric) => (
              <Line
                key={metric}
                type="monotone"
                dataKey={metric}
                stroke={colors[metric]}
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
                name={metric.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase())}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default UserProgressChart;