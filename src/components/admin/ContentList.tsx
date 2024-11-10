import React from 'react';
import { motion } from 'framer-motion';
import { Edit, Trash2, Lock, Unlock } from 'lucide-react';
import { Content } from '../../types/content';

interface ContentListProps {
  content: Content[];
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

const ContentList: React.FC<ContentListProps> = ({
  content,
  onEdit,
  onDelete
}) => {
  const getAccessLevelStyle = (accessLevel: string) => {
    switch (accessLevel) {
      case 'premium':
        return 'text-purple-500';
      case 'members-only':
        return 'text-yellow-500';
      default:
        return 'text-[#3dd8e8]';
    }
  };

  const getAccessLevelIcon = (accessLevel: string) => {
    return accessLevel === 'free' ? (
      <Unlock className="w-4 h-4" />
    ) : (
      <Lock className="w-4 h-4" />
    );
  };

  return (
    <div className="bg-zinc-900 rounded-lg overflow-hidden">
      <div className="grid grid-cols-12 gap-4 p-4 border-b border-zinc-800 font-medium text-gray-400">
        <div className="col-span-4">Title</div>
        <div className="col-span-2">Type</div>
        <div className="col-span-2">Category</div>
        <div className="col-span-2">Access</div>
        <div className="col-span-1">Date</div>
        <div className="col-span-1">Actions</div>
      </div>

      {content.map((item) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-12 gap-4 p-4 border-b border-zinc-800 hover:bg-zinc-800/50"
        >
          <div className="col-span-4">{item.title}</div>
          <div className="col-span-2 capitalize">{item.type}</div>
          <div className="col-span-2">{item.category}</div>
          <div className={`col-span-2 flex items-center gap-2 ${getAccessLevelStyle(item.accessLevel)}`}>
            {getAccessLevelIcon(item.accessLevel)}
            <span className="capitalize">{item.accessLevel}</span>
          </div>
          <div className="col-span-1">
            {new Date(item.createdAt).toLocaleDateString()}
          </div>
          <div className="col-span-1 flex gap-2">
            <button
              onClick={() => onEdit(item.id)}
              className="text-[#3dd8e8] hover:text-[#34c5d3]"
            >
              <Edit className="w-5 h-5" />
            </button>
            <button
              onClick={() => onDelete(item.id)}
              className="text-red-500 hover:text-red-400"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        </motion.div>
      ))}

      {content.length === 0 && (
        <div className="p-8 text-center text-gray-400">
          No content found matching your criteria.
        </div>
      )}
    </div>
  );
};

export default ContentList;