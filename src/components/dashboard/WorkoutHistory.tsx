import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, TrendingUp } from 'lucide-react';

const WorkoutHistory = () => {
  // Mock data - replace with actual data from your database
  const workouts = [
    {
      id: 1,
      date: '2024-03-15',
      type: 'Upper Body Strength',
      duration: '45 min',
      intensity: 'High',
      exercises: [
        { name: 'Bench Press', sets: '4x10', weight: '185 lbs' },
        { name: 'Pull-ups', sets: '3x12', weight: 'Body weight' },
        { name: 'Shoulder Press', sets: '3x12', weight: '65 lbs' }
      ]
    },
    {
      id: 2,
      date: '2024-03-14',
      type: 'Lower Body',
      duration: '50 min',
      intensity: 'Medium',
      exercises: [
        { name: 'Squats', sets: '4x10', weight: '225 lbs' },
        { name: 'Romanian Deadlifts', sets: '3x12', weight: '185 lbs' },
        { name: 'Leg Press', sets: '3x15', weight: '360 lbs' }
      ]
    }
  ];

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-[#3dd8e8] mb-8">Workout History</h2>

      <div className="space-y-6">
        {workouts.map((workout) => (
          <motion.div
            key={workout.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-zinc-900 rounded-lg overflow-hidden"
          >
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold mb-2">{workout.type}</h3>
                  <div className="flex items-center gap-4 text-gray-400">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {new Date(workout.date).toLocaleDateString()}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {workout.duration}
                    </div>
                    <div className="flex items-center gap-1">
                      <TrendingUp className="w-4 h-4" />
                      {workout.intensity} Intensity
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t border-zinc-800 pt-4">
                <h4 className="font-semibold mb-3">Exercises</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {workout.exercises.map((exercise, index) => (
                    <div
                      key={index}
                      className="bg-black p-4 rounded-lg"
                    >
                      <h5 className="font-medium mb-2">{exercise.name}</h5>
                      <div className="flex justify-between text-sm text-gray-400">
                        <span>{exercise.sets}</span>
                        <span>{exercise.weight}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default WorkoutHistory;