import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Search, Filter } from 'lucide-react';
import ContentUploadModal from './ContentUploadModal';
import ContentList from './ContentList';
import { db } from '../../db';

const ContentManager = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadContent = async () => {
      try {
        const results = await db.all(`
          SELECT c.*, u.name as author_name
          FROM content c
          JOIN users u ON c.author_id = u.id
          ORDER BY c.created_at DESC
        `);
        setContent(results);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    loadContent();
  }, []);

  const handleDeleteContent = async (id: number) => {
    try {
      await db.run('DELETE FROM content WHERE id = ?', [id]);
      setContent(content.filter(item => item.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete content');
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-[#3dd8e8]">Content Management</h2>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-[#3dd8e8] text-black px-4 py-2 rounded-lg"
        >
          <Plus className="w-5 h-5" />
          Add Content
        </motion.button>
      </div>

      {error && (
        <div className="bg-red-500/10 text-red-500 p-4 rounded-lg mb-6">
          {error}
        </div>
      )}

      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#3dd8e8] mx-auto"></div>
          <p className="mt-4 text-gray-400">Loading content...</p>
        </div>
      ) : (
        <ContentList 
          content={content}
          onEdit={(id) => {
            // Add edit handler
            console.log('Edit content:', id);
          }}
          onDelete={handleDeleteContent}
        />
      )}

      <ContentUploadModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={() => {
          setIsModalOpen(false);
          // Refresh content list
          loadContent();
        }}
      />
    </div>
  );
};

export default ContentManager;