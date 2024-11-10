import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, CheckCircle, XCircle } from 'lucide-react';
import { db } from '../../db';

interface ScheduledContent {
  id: string;
  content_id: string;
  title: string;
  publish_at: string;
  status: 'pending' | 'published' | 'failed';
}

const ContentScheduler = () => {
  const [scheduledContent, setScheduledContent] = useState<ScheduledContent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadScheduledContent = async () => {
      try {
        const results = await db.prepare(`
          SELECT sc.*, c.title
          FROM scheduled_content sc
          JOIN content c ON sc.content_id = c.id
          ORDER BY sc.publish_at ASC
        `).all();
        setScheduledContent(results);
      } catch (error) {
        console.error('Error loading scheduled content:', error);
      } finally {
        setLoading(false);
      }
    };

    loadScheduledContent();
  }, []);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'published':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'failed':
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return <Clock className="w-5 h-5 text-yellow-500" />;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#3dd8e8]"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-[#3dd8e8] mb-8">Scheduled Content</h2>

      <div className="space-y-4">
        {scheduledContent.map((item) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-zinc-900 p-6 rounded-lg"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <div className="flex items-center gap-4 text-gray-400">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {new Date(item.publish_at).toLocaleDateString()}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {new Date(item.publish_at).toLocaleTimeString()}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {getStatusIcon(item.status)}
                <span className="capitalize">{item.status}</span>
              </div>
            </div>
          </motion.div>
        ))}

        {scheduledContent.length === 0 && (
          <p className="text-center text-gray-400 py-8">
            No scheduled content found
          </p>
        )}
      </div>
    </div>
  );
};

export default ContentScheduler;