import React from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BlogPostCard from '../components/BlogPostCard';

const CategoryPage = () => {
  const { category } = useParams();

  // Category configuration with subcategories
  const categoryConfig = {
    'fitness': {
      title: 'Fitness',
      description: 'Expert guidance for your fitness journey',
      subcategories: ['workouts', 'training-tips', 'exercise-guides']
    },
    'nutrition': {
      title: 'Nutrition',
      description: 'Fuel your body for optimal performance',
      subcategories: ['meal-plans', 'recipes', 'supplements']
    },
    'lifestyle': {
      title: 'Lifestyle',
      description: 'Balance fitness with your daily life',
      subcategories: ['success-stories', 'motivation', 'recovery']
    }
  };

  // This would typically come from your database
  const posts = [
    {
      title: '5 Essential Exercises for Core Strength',
      excerpt: 'Discover the key movements that will help you build a strong and stable core.',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
      category: 'Training Tips',
      mainCategory: 'Fitness',
      slug: 'core-exercises',
      date: '2024-03-15'
    },
    {
      title: 'High-Protein Breakfast Bowl',
      excerpt: 'Start your day with this delicious and nutritious protein-packed breakfast recipe.',
      image: 'https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
      category: 'Recipes',
      mainCategory: 'Nutrition',
      slug: 'protein-breakfast-bowl',
      date: '2024-03-14'
    }
  ];

  const currentCategory = category ? categoryConfig[category.toLowerCase()] : null;

  const getCategoryTitle = () => {
    if (currentCategory) {
      return currentCategory.title;
    }
    const formattedCategory = category?.replace(/-/g, ' ');
    return formattedCategory?.charAt(0).toUpperCase() + formattedCategory?.slice(1);
  };

  const filteredPosts = posts.filter(post => {
    if (!category) return true;
    
    const normalizedCategory = category.toLowerCase();
    const isMainCategory = post.mainCategory.toLowerCase() === normalizedCategory;
    const isSubcategory = post.category.toLowerCase().replace(/\s+/g, '-') === normalizedCategory;
    
    return isMainCategory || isSubcategory;
  });

  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <div className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold mb-4">{getCategoryTitle()}</h1>
          {currentCategory && (
            <p className="text-gray-400 mb-8">
              {currentCategory.description}
            </p>
          )}

          {/* Subcategory Pills */}
          {currentCategory && (
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {currentCategory.subcategories.map((sub) => {
                const isActive = category === sub;
                return (
                  <motion.a
                    key={sub}
                    href={`/category/${sub}`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`px-6 py-2 rounded-full transition-colors ${
                      isActive
                        ? 'bg-[#3dd8e8] text-black'
                        : 'bg-zinc-900 text-gray-400 hover:bg-[#3dd8e8]/20 hover:text-[#3dd8e8]'
                    }`}
                  >
                    {sub.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                  </motion.a>
                );
              })}
            </div>
          )}
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filteredPosts.map((post, index) => (
            <BlogPostCard key={index} {...post} />
          ))}
          {filteredPosts.length === 0 && (
            <div className="col-span-3 text-center text-gray-400 py-12">
              No posts found in this category.
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CategoryPage;