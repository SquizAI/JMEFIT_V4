import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useDropzone } from 'react-dropzone';
import { Image, Video, File, Trash2, Search } from 'lucide-react';
import { db } from '../../db';

interface MediaFile {
  id: string;
  filename: string;
  url: string;
  type: string;
  size: number;
  uploaded_by: string;
  created_at: string;
}

const MediaManager = () => {
  const [media, setMedia] = useState<MediaFile[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [uploading, setUploading] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    setUploading(true);
    try {
      for (const file of acceptedFiles) {
        // In a real app, upload to cloud storage first
        const url = URL.createObjectURL(file);
        
        const mediaFile = {
          id: crypto.randomUUID(),
          filename: file.name,
          url,
          type: file.type,
          size: file.size,
          uploaded_by: 'current_user_id', // Replace with actual user ID
          created_at: new Date().toISOString()
        };

        await db.prepare(`
          INSERT INTO media (id, filename, url, type, size, uploaded_by)
          VALUES (?, ?, ?, ?, ?, ?)
        `).run(
          mediaFile.id,
          mediaFile.filename,
          mediaFile.url,
          mediaFile.type,
          mediaFile.size,
          mediaFile.uploaded_by
        );

        setMedia(prev => [...prev, mediaFile]);
      }
    } catch (error) {
      console.error('Error uploading files:', error);
    } finally {
      setUploading(false);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif'],
      'video/*': ['.mp4', '.webm']
    }
  });

  const handleDelete = async (id: string) => {
    try {
      await db.prepare('DELETE FROM media WHERE id = ?').run(id);
      setMedia(prev => prev.filter(file => file.id !== id));
      setSelectedFiles(prev => prev.filter(fileId => fileId !== id));
    } catch (error) {
      console.error('Error deleting file:', error);
    }
  };

  const toggleFileSelection = (id: string) => {
    setSelectedFiles(prev => 
      prev.includes(id)
        ? prev.filter(fileId => fileId !== id)
        : [...prev, id]
    );
  };

  const filteredMedia = media.filter(file =>
    file.filename.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getFileIcon = (type: string) => {
    if (type.startsWith('image/')) return Image;
    if (type.startsWith('video/')) return Video;
    return File;
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-[#3dd8e8]">Media Library</h2>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search media..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 bg-zinc-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3dd8e8] text-white"
            />
          </div>
        </div>
      </div>

      <div
        {...getRootProps()}
        className={`border-2 border-dashed border-zinc-700 rounded-lg p-8 text-center mb-8 cursor-pointer transition-colors ${
          isDragActive ? 'border-[#3dd8e8] bg-[#3dd8e8]/10' : 'hover:border-[#3dd8e8]'
        }`}
      >
        <input {...getInputProps()} />
        {uploading ? (
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#3dd8e8]"></div>
            <span className="ml-3 text-gray-400">Uploading files...</span>
          </div>
        ) : (
          <p className="text-gray-400">
            {isDragActive
              ? 'Drop the files here'
              : 'Drag and drop files here, or click to select'}
          </p>
        )}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredMedia.map((file) => {
          const FileIcon = getFileIcon(file.type);
          const isSelected = selectedFiles.includes(file.id);

          return (
            <motion.div
              key={file.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className={`relative group rounded-lg overflow-hidden ${
                isSelected ? 'ring-2 ring-[#3dd8e8]' : ''
              }`}
              onClick={() => toggleFileSelection(file.id)}
            >
              {file.type.startsWith('image/') ? (
                <img
                  src={file.url}
                  alt={file.filename}
                  className="w-full h-40 object-cover"
                />
              ) : (
                <div className="w-full h-40 bg-zinc-900 flex items-center justify-center">
                  <FileIcon className="w-12 h-12 text-gray-400" />
                </div>
              )}
              <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(file.id);
                  }}
                  className="p-2 bg-red-500 rounded-full hover:bg-red-600 transition-colors"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-2 bg-black bg-opacity-75">
                <p className="text-sm text-white truncate">{file.filename}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default MediaManager;