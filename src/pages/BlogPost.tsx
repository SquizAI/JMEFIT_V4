import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BlogPostCard from '../components/BlogPost';

const BlogPost = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  // This would typically come from your database
  const posts = {
    'core-exercises': {
      title: '5 Essential Exercises for Core Strength',
      category: 'Training Tips',
      mainCategory: 'Fitness',
      author: 'Jaime Tharpe',
      date: 'March 15, 2024',
      content: `
        <h2>Introduction</h2>
        <p>A strong core is essential for overall fitness and daily activities...</p>
        
        <h3>1. Plank</h3>
        <p>The plank is a fundamental exercise that engages multiple core muscles...</p>
        
        <h3>2. Dead Bug</h3>
        <p>This exercise is excellent for developing core stability...</p>
      `,
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80'
    },
    'protein-breakfast-bowl': {
      title: 'High-Protein Breakfast Bowl',
      category: 'Recipes',
      mainCategory: 'Nutrition',
      author: 'Jaime Tharpe',
      date: 'March 14, 2024',
      content: `
        <h2>Ingredients</h2>
        <ul>
          <li>2 eggs</li>
          <li>1/2 cup quinoa</li>
          <li>1 cup spinach</li>
          <li>1/4 avocado</li>
        </ul>
        
        <h2>Instructions</h2>
        <ol>
          <li>Cook quinoa according to package instructions...</li>
          <li>Prepare eggs to your preference...</li>
        </ol>
        
        <h2>Nutrition Information</h2>
        <p>Calories: 400<br>Protein: 20g<br>Carbs: 35g<br>Fat: 22g</p>
      `,
      image: 'https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80'
    }
  };

  // Related posts based on category
  const relatedPosts = [
    {
      title: 'The Benefits of HIIT',
      excerpt: 'Explore how HIIT can revolutionize your workout routine.',
      image: 'https://images.unsplash.com/photo-1571732154690-f6d1c3e5178a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
      category: 'Training Tips',
      mainCategory: 'Fitness',
      slug: 'hiit-benefits',
      date: '2024-03-13'
    },
    {
      title: 'Healthy Post-Workout Smoothies',
      excerpt: 'Quick and nutritious smoothie recipes for recovery.',
      image: 'https://images.unsplash.com/photo-1526424382096-74a93e105682?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
      category: 'Recipes',
      mainCategory: 'Nutrition',
      slug: 'post-workout-smoothies',
      date: '2024-03-12'
    }
  ];

  const post = posts[slug];

  if (!post) {
    return (
      <div className="min-h-screen bg-black">
        <Navbar />
        <div className="container mx-auto px-4 py-20">
          <h1 className="text-2xl text-center">Post not found</h1>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <div className="container mx-auto px-4 py-20">
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          <div className="mb-8">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-[#3dd8e8] hover:text-[#34c5d3] transition-colors mb-6"
            >
              <ArrowLeft className="w-5 h-5" />
              Back
            </button>

            <div className="flex gap-2 mb-4">
              <Link
                to={`/category/${post.mainCategory.toLowerCase().replace(/\s+/g, '-')}`}
                className="inline-block bg-[#3dd8e8]/20 text-[#3dd8e8] px-4 py-2 rounded-full text-sm hover:bg-[#3dd8e8]/30 transition-colors"
              >
                {post.mainCategory}
              </Link>
              <Link
                to={`/category/${post.category.toLowerCase().replace(/\s+/g, '-')}`}
                className="inline-block bg-purple-500/20 text-purple-400 px-4 py-2 rounded-full text-sm hover:bg-purple-500/30 transition-colors"
              >
                {post.category}
              </Link>
            </div>

            <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
            <div className="text-gray-400 mb-6">
              <span>{post.author}</span>
              <span className="mx-2">•</span>
              <span>{post.date}</span>
            </div>

            <img
              src={post.image}
              alt={post.title}
              className="w-full h-[400px] object-cover rounded-lg mb-8"
            />

            <div 
              className="prose prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>

          <div className="border-t border-zinc-800 pt-12 mt-12">
            <h2 className="text-2xl font-bold mb-8">Recommended Posts</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {relatedPosts.map((post, index) => (
                <BlogPostCard key={index} {...post} />
              ))}
            </div>
          </div>
        </motion.article>
      </div>
      <Footer />
    </div>
  );
};

export default BlogPost;