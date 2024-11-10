import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface Metric {
  label: string;
  value: string | number;
  change: number;
  unit?: string;
}

interface UserMetricsGridProps {
  metrics: Metric[];
}

const UserMetricsGrid: React.FC<UserMetricsGridProps> = ({ metrics }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map((metric, index) => (
        <motion.div
          key={metric.label}
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
                <TrendingUp className="w-4 h-4 mr-1" />
              ) : (
                <TrendingDown className="w-4 h-4 mr-1" />
              )}
              {Math.abs(metric.change)}%
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default UserMetricsGrid;