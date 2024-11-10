import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Save } from 'lucide-react';
import { ProgressService } from '../../services/progress';
import { useAuth } from '../../contexts/AuthContext';

const ProgressForm = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    weight: '',
    bodyFat: '',
    measurements: {
      chest: '',
      waist: '',
      hips: '',
      arms: '',
      thighs: ''
    },
    notes: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    try {
      setLoading(true);
      setError('');
      setSuccess(false);

      await ProgressService.addEntry({
        userId: user.id,
        date: new Date(),
        weight: parseFloat(formData.weight),
        bodyFat: parseFloat(formData.bodyFat),
        measurements: {
          chest: parseFloat(formData.measurements.chest),
          waist: parseFloat(formData.measurements.waist),
          hips: parseFloat(formData.measurements.hips),
          arms: parseFloat(formData.measurements.arms),
          thighs: parseFloat(formData.measurements.thighs)
        },
        notes: formData.notes
      });

      setSuccess(true);
      setFormData({
        weight: '',
        bodyFat: '',
        measurements: {
          chest: '',
          waist: '',
          hips: '',
          arms: '',
          thighs: ''
        },
        notes: ''
      });
    } catch (err) {
      setError('Failed to save progress data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-500/10 text-red-500 p-4 rounded-lg">
          {error}
        </div>
      )}

      {success && (
        <div className="bg-green-500/10 text-green-500 p-4 rounded-lg">
          Progress data saved successfully!
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">
            Weight (lbs)
          </label>
          <input
            type="number"
            step="0.1"
            value={formData.weight}
            onChange={(e) => setFormData(prev => ({ ...prev, weight: e.target.value }))}
            className="w-full px-4 py-2 bg-zinc-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3dd8e8] text-white"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">
            Body Fat %
          </label>
          <input
            type="number"
            step="0.1"
            value={formData.bodyFat}
            onChange={(e) => setFormData(prev => ({ ...prev, bodyFat: e.target.value }))}
            className="w-full px-4 py-2 bg-zinc-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3dd8e8] text-white"
          />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Measurements (inches)</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Object.entries(formData.measurements).map(([key, value]) => (
            <div key={key}>
              <label className="block text-sm font-medium text-gray-400 mb-2 capitalize">
                {key}
              </label>
              <input
                type="number"
                step="0.1"
                value={value}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  measurements: {
                    ...prev.measurements,
                    [key]: e.target.value
                  }
                }))}
                className="w-full px-4 py-2 bg-zinc-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3dd8e8] text-white"
              />
            </div>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-400 mb-2">
          Notes
        </label>
        <textarea
          value={formData.notes}
          onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
          className="w-full px-4 py-2 bg-zinc-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3dd8e8] text-white h-32"
          placeholder="Add any notes about your progress..."
        />
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        type="submit"
        disabled={loading}
        className="w-full bg-[#3dd8e8] text-black py-3 rounded-lg font-semibold hover:bg-[#34c5d3] transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
      >
        {loading ? (
          <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-black"></div>
        ) : (
          <>
            <Save className="w-5 h-5" />
            Save Progress
          </>
        )}
      </motion.button>
    </form>
  );
};

export default ProgressForm;