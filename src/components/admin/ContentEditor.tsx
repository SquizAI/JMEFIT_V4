import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Save, Calendar, Lock, Unlock } from 'lucide-react';
import RichTextEditor from './RichTextEditor';
import { useDropzone } from 'react-dropzone';

interface ContentEditorProps {
  initialContent?: {
    title: string;
    content: string;
    category: string;
    accessLevel: 'free' | 'premium';
    scheduledDate?: string;
  };
  onSave: (content: any) => void;
}

const ContentEditor: React.FC<ContentEditorProps> = ({ initialContent, onSave }) => {
  const [content, setContent] = useState({
    title: initialContent?.title || '',
    content: initialContent?.content || '',
    category: initialContent?.category || '',
    accessLevel: initialContent?.accessLevel || 'free',
    scheduledDate: initialContent?.scheduledDate || '',
    featuredImage: null as File | null
  });

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif']
    },
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      setContent(prev => ({
        ...prev,
        featuredImage: acceptedFiles[0]
      }));
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(content);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-400 mb-2">
          Title
        </label>
        <input
          type="text"
          value={content.title}
          onChange={(e) => setContent(prev => ({ ...prev, title: e.target.value }))}
          className="w-full px-4 py-2 bg-zinc-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3dd8e8] text-white"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-400 mb-2">
          Category
        </label>
        <select
          value={content.category}
          onChange={(e) => setContent(prev => ({ ...prev, category: e.target.value }))}
          className="w-full px-4 py-2 bg-zinc-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3dd8e8] text-white"
          required
        >
          <option value="">Select Category</option>
          <option value="fitness">Fitness</option>
          <option value="nutrition">Nutrition</option>
          <option value="lifestyle">Lifestyle</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-400 mb-2">
          Featured Image
        </label>
        <div
          {...getRootProps()}
          className={`border-2 border-dashed border-zinc-700 rounded-lg p-6 text-center cursor-pointer transition-colors ${
            isDragActive ? 'border-[#3dd8e8] bg-[#3dd8e8]/10' : 'hover:border-[#3dd8e8]'
          }`}
        >
          <input {...getInputProps()} />
          {content.featuredImage ? (
            <div className="flex items-center justify-center">
              <img
                src={URL.createObjectURL(content.featuredImage)}
                alt="Preview"
                className="max-h-40 rounded"
              />
            </div>
          ) : (
            <p className="text-gray-400">
              {isDragActive
                ? 'Drop the image here'
                : 'Drag and drop an image here, or click to select'}
            </p>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-400 mb-2">
          Content
        </label>
        <RichTextEditor
          content={content.content}
          onChange={(newContent) => setContent(prev => ({ ...prev, content: newContent }))}
        />
      </div>

      <div className="flex items-center gap-6">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-400 mb-2">
            Schedule Publication
          </label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="datetime-local"
              value={content.scheduledDate}
              onChange={(e) => setContent(prev => ({ ...prev, scheduledDate: e.target.value }))}
              className="w-full pl-10 pr-4 py-2 bg-zinc-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3dd8e8] text-white"
            />
          </div>
        </div>

        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-400 mb-2">
            Access Level
          </label>
          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => setContent(prev => ({ ...prev, accessLevel: 'free' }))}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg ${
                content.accessLevel === 'free'
                  ? 'bg-[#3dd8e8] text-black'
                  : 'bg-zinc-900 text-gray-400'
              }`}
            >
              <Unlock className="w-4 h-4" />
              Free
            </button>
            <button
              type="button"
              onClick={() => setContent(prev => ({ ...prev, accessLevel: 'premium' }))}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg ${
                content.accessLevel === 'premium'
                  ? 'bg-[#3dd8e8] text-black'
                  : 'bg-zinc-900 text-gray-400'
              }`}
            >
              <Lock className="w-4 h-4" />
              Premium
            </button>
          </div>
        </div>
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        type="submit"
        className="w-full bg-[#3dd8e8] text-black py-3 rounded-lg font-semibold hover:bg-[#34c5d3] transition-colors flex items-center justify-center gap-2"
      >
        <Save className="w-5 h-5" />
        Save Content
      </motion.button>
    </form>
  );
};

export default ContentEditor;