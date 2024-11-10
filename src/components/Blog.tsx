import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const BlogPost = ({ title, excerpt, image, category, slug }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="bg-zinc-900 rounded-lg overflow-hidden"
  >
    <img src={image} alt={title} className="w-full h-48 object-cover" />
    <div className="p-6">
      <span className="inline-block bg-purple-500/20 text-purple-400 px-3 py-1 rounded-full text-sm mb-2">
        {category}
      </span>
      <h3 className="text-xl font-semibold mb-2 text-white">{title}</h3>
      <p className="text-gray-400 mb-4">{excerpt}</p>
      <Link
        to={`/blog/${slug}`}
        className="text-purple-500 font-semibold hover:text-purple-400 transition-colors"
      >
        Read More
      </Link>
    </div>
  </motion.div>
);

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const blogPosts = [
    {
      title: "5 Essential Exercises for Core Strength",
      excerpt: "Discover the key movements that will help you build a strong and stable core.",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
      category: "Fitness",
      slug: "core-exercises"
    },
    {
      title: "Nutrition Tips for Muscle Gain",
      excerpt: "Learn about the best foods and eating habits to support muscle growth and recovery.",
      image: "https://images.unsplash.com/photo-1532384748853-8f54a8f476e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
      category: "Nutrition",
      slug: "muscle-gain-nutrition"
    },
    {
      title: "High-Protein Breakfast Bowl",
      excerpt: "Start your day with this delicious and nutritious protein-packed breakfast recipe.",
      image: "https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
      category: "Recipes",
      slug: "protein-breakfast-bowl"
    },
    {
      title: "The Benefits of HIIT",
      excerpt: "Explore how HIIT can revolutionize your workout routine and improve your fitness.",
      image: "https://images.unsplash.com/photo-1571732154690-f6d1c3e5178a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
      category: "Fitness",
      slug: "hiit-benefits"
    },
    {
      title: "Healthy Post-Workout Smoothies",
      excerpt: "Quick and nutritious smoothie recipes to fuel your recovery after training.",
      image: "https://images.unsplash.com/photo-1526424382096-74a93e105682?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
      category: "Recipes",
      slug: "post-workout-smoothies"
    }
  ];

  const categories = ["All", "Fitness", "Nutrition", "Recipes", "Lifestyle"];

  const filteredPosts = blogPosts.filter((post) => {
    return (
      (selectedCategory === "All" || post.category === selectedCategory) &&
      post.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <section id="blog" className="py-20 bg-black">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4">Fitness Tips & Insights</h2>
          <p className="text-gray-400">Stay updated with the latest fitness knowledge</p>
        </motion.div>

        <div className="flex justify-center mb-8 space-x-2">
          <input
            type="text"
            placeholder="Search blog posts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full md:w-1/3 p-3 bg-zinc-900 border border-zinc-800 rounded-l focus:outline-none focus:ring-2 focus:ring-purple-500 text-white"
          />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="p-3 bg-zinc-900 border border-zinc-800 rounded-r focus:outline-none focus:ring-2 focus:ring-purple-500 text-white"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post, index) => (
              <BlogPost key={index} {...post} />
            ))
          ) : (
            <p className="text-center col-span-3 text-gray-400">No posts found.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Blog;