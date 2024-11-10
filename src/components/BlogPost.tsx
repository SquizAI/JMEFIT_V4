import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

interface BlogPostProps {
  title: string;
  excerpt: string;
  image: string;
  category: string;
  mainCategory: string;
  slug: string;
  date: string;
}

const BlogPost: React.FC<BlogPostProps> = ({
  title,
  excerpt,
  image,
  category,
  mainCategory,
  slug,
  date
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-zinc-900 rounded-lg overflow-hidden"
    >
      <img src={image} alt={title} className="w-full h-48 object-cover" />
      <div className="p-6">
        <div className="flex gap-2 mb-2">
          <Link
            to={`/category/${mainCategory.toLowerCase().replace(/\s+/g, '-')}`}
            className="inline-block bg-[#3dd8e8]/20 text-[#3dd8e8] px-3 py-1 rounded-full text-sm hover:bg-[#3dd8e8]/30 transition-colors"
          >
            {mainCategory}
          </Link>
          <Link
            to={`/category/${category.toLowerCase().replace(/\s+/g, '-')}`}
            className="inline-block bg-purple-500/20 text-purple-400 px-3 py-1 rounded-full text-sm hover:bg-purple-500/30 transition-colors"
          >
            {category}
          </Link>
        </div>
        <h3 className="text-xl font-semibold mb-2 text-white">{title}</h3>
        <p className="text-gray-400 mb-4">{excerpt}</p>
        <div className="flex justify-between items-center">
          <Link
            to={`/blog/${slug}`}
            className="text-[#3dd8e8] font-semibold hover:text-[#34c5d3] transition-colors"
          >
            Read More
          </Link>
          <span className="text-sm text-gray-400">{date}</span>
        </div>
      </div>
    </motion.div>
  );
};

export default BlogPost;