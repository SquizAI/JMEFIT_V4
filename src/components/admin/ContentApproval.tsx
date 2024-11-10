import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle, Eye, MessageCircle } from 'lucide-react';

interface ContentItem {
  id: number;
  title: string;
  author: string;
  type: string;
  submittedAt: string;
  status: 'pending' | 'approved' | 'rejected';
  preview?: string;
}

const ContentApproval = () => {
  const [selectedContent, setSelectedContent] = useState<ContentItem | null>(null);
  const [feedback, setFeedback] = useState('');

  // Mock data - replace with actual content from database
  const [pendingContent, setPendingContent] = useState<ContentItem[]>([
    {
      id: 1,
      title: 'Advanced HIIT Workout Guide',
      author: 'John Trainer',
      type: 'workout',
      submittedAt: '2024-03-15',
      status: 'pending',
      preview: 'A comprehensive guide to high-intensity interval training...'
    },
    {
      id: 2,
      title: 'Protein-Rich Vegan Recipes',
      author: 'Sarah Cook',
      type: 'recipe',
      submittedAt: '2024-03-16',
      status: 'pending',
      preview: 'Collection of plant-based recipes high in protein...'
    }
  ]);

  const handleApprove = (id: number) => {
    setPendingContent(prev => 
      prev.map(item => 
        item.id === id ? { ...item, status: 'approved' as const } : item
      )
    );
    setSelectedContent(null);
  };

  const handleReject = (id: number) => {
    if (!feedback.trim()) {
      alert('Please provide feedback for rejection');
      return;
    }
    setPendingContent(prev => 
      prev.map(item => 
        item.id === id ? { ...item, status: 'rejected' as const } : item
      )
    );
    setSelectedContent(null);
    setFeedback('');
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-[#3dd8e8] mb-8">Content Approval</h2>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-zinc-900 rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-4">Pending Approval</h3>
          <div className="space-y-4">
            {pendingContent.map(content => (
              <motion.div
                key={content.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-black p-4 rounded-lg"
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-semibold">{content.title}</h4>
                    <p className="text-sm text-gray-400">
                      By {content.author} • {content.type}
                    </p>
                  </div>
                  <button
                    onClick={() => setSelectedContent(content)}
                    className="text-[#3dd8e8] hover:text-[#34c5d3]"
                  >
                    <Eye className="w-5 h-5" />
                  </button>
                </div>
                <p className="text-sm text-gray-400 mb-4">
                  Submitted on {content.submittedAt}
                </p>
                <div className="flex gap-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleApprove(content.id)}
                    className="flex items-center gap-1 bg-green-500/20 text-green-500 px-3 py-1 rounded-full text-sm"
                  >
                    <CheckCircle className="w-4 h-4" />
                    Approve
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedContent(content)}
                    className="flex items-center gap-1 bg-red-500/20 text-red-500 px-3 py-1 rounded-full text-sm"
                  >
                    <XCircle className="w-4 h-4" />
                    Reject
                  </motion.button>
                </div>
              </motion.div>
            ))}
            {pendingContent.length === 0 && (
              <p className="text-center text-gray-400 py-4">
                No content pending approval
              </p>
            )}
          </div>
        </div>

        {selectedContent && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-zinc-900 rounded-lg p-6"
          >
            <h3 className="text-xl font-semibold mb-4">Content Preview</h3>
            <div className="bg-black p-4 rounded-lg mb-4">
              <h4 className="font-semibold mb-2">{selectedContent.title}</h4>
              <p className="text-gray-400 mb-4">{selectedContent.preview}</p>
              <div className="text-sm text-gray-400">
                <p>Author: {selectedContent.author}</p>
                <p>Type: {selectedContent.type}</p>
                <p>Submitted: {selectedContent.submittedAt}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Feedback
                </label>
                <textarea
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  className="w-full px-4 py-2 bg-black rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3dd8e8] h-32"
                  placeholder="Provide feedback for rejection..."
                />
              </div>

              <div className="flex gap-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleApprove(selectedContent.id)}
                  className="flex-1 bg-green-500 text-white py-2 rounded-lg font-semibold hover:bg-green-600 transition-colors"
                >
                  Approve Content
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleReject(selectedContent.id)}
                  className="flex-1 bg-red-500 text-white py-2 rounded-lg font-semibold hover:bg-red-600 transition-colors"
                >
                  Reject Content
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ContentApproval;