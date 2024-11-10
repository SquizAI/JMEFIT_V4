import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, Instagram, User, ChevronDown } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import Logo from './Logo';
import { useAuth } from '../contexts/AuthContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showCategories, setShowCategories] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { currentUser } = useAuth();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const categories = {
    'Fitness': {
      path: '/category/fitness',
      subcategories: [
        { name: 'Workouts', path: '/category/workouts' },
        { name: 'Training Tips', path: '/category/training-tips' },
        { name: 'Exercise Guides', path: '/category/exercise-guides' }
      ]
    },
    'Nutrition': {
      path: '/category/nutrition',
      subcategories: [
        { name: 'Meal Plans', path: '/category/meal-plans' },
        { name: 'Recipes', path: '/category/recipes' },
        { name: 'Supplements', path: '/category/supplements' }
      ]
    },
    'Lifestyle': {
      path: '/category/lifestyle',
      subcategories: [
        { name: 'Success Stories', path: '/category/success-stories' },
        { name: 'Motivation', path: '/category/motivation' },
        { name: 'Recovery', path: '/category/recovery' }
      ]
    }
  };

  const services = [
    { name: 'Personal Training', path: '/faq/personal-training' },
    { name: 'Group Training', path: '/faq/group-training' },
    { name: 'Nutrition Coaching', path: '/faq/nutrition' }
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-black/90 backdrop-blur-sm' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center">
            <Logo className="w-24 h-auto" />
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="hover:text-[#3dd8e8] transition-colors">
              Home
            </Link>
            
            <div className="relative group">
              <button 
                className="flex items-center gap-1 hover:text-[#3dd8e8] transition-colors"
                onClick={() => setShowCategories(!showCategories)}
              >
                Categories <ChevronDown className="w-4 h-4" />
              </button>
              
              <div className="absolute top-full left-0 w-64 bg-zinc-900 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                {Object.entries(categories).map(([category, { path, subcategories }]) => (
                  <div key={category} className="p-4">
                    <Link
                      to={path}
                      className="text-[#3dd8e8] font-semibold mb-2 block hover:text-[#34c5d3] transition-colors"
                    >
                      {category}
                    </Link>
                    <ul className="space-y-2">
                      {subcategories.map((sub) => (
                        <li key={sub.name}>
                          <Link
                            to={sub.path}
                            className="text-gray-300 hover:text-[#3dd8e8] transition-colors block"
                          >
                            {sub.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative group">
              <button className="flex items-center gap-1 hover:text-[#3dd8e8] transition-colors">
                Services <ChevronDown className="w-4 h-4" />
              </button>
              <div className="absolute top-full left-0 w-48 bg-zinc-900 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                {services.map((service) => (
                  <Link
                    key={service.name}
                    to={service.path}
                    className="block px-4 py-2 text-gray-300 hover:text-[#3dd8e8] hover:bg-zinc-800 transition-colors"
                  >
                    {service.name}
                  </Link>
                ))}
              </div>
            </div>
            
            <Link to="/contact" className="hover:text-[#3dd8e8] transition-colors">
              Contact
            </Link>

            <motion.a
              href="https://www.instagram.com/jmefit_/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-purple-500 hover:text-purple-400 transition-colors"
              whileHover={{ scale: 1.1 }}
            >
              <Instagram className="w-5 h-5" />
              <span>@jmefit_</span>
            </motion.a>

            <div className="flex items-center space-x-4">
              {currentUser ? (
                <Link
                  to={currentUser.role === 'admin' ? '/admin' : '/dashboard'}
                  className="flex items-center gap-2 text-[#3dd8e8] hover:text-[#34c5d3] transition-colors"
                >
                  <User className="w-5 h-5" />
                  <span>{currentUser.role === 'admin' ? 'Admin' : 'Dashboard'}</span>
                </Link>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="flex items-center gap-2 text-[#3dd8e8] hover:text-[#34c5d3] transition-colors"
                  >
                    <User className="w-5 h-5" />
                    <span>Login</span>
                  </Link>
                  <Link
                    to="/admin-login"
                    className="text-sm text-gray-400 hover:text-[#3dd8e8] transition-colors"
                  >
                    Admin
                  </Link>
                </>
              )}
            </div>
          </div>

          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-zinc-900 p-4"
        >
          <div className="flex flex-col space-y-4">
            <Link
              to="/"
              className="text-white hover:text-[#3dd8e8] transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>

            {Object.entries(categories).map(([category, { path, subcategories }]) => (
              <div key={category} className="space-y-2">
                <Link
                  to={path}
                  className="text-[#3dd8e8] font-semibold block"
                  onClick={() => setIsOpen(false)}
                >
                  {category}
                </Link>
                {subcategories.map((sub) => (
                  <Link
                    key={sub.name}
                    to={sub.path}
                    className="block pl-4 text-gray-300 hover:text-[#3dd8e8] transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    {sub.name}
                  </Link>
                ))}
              </div>
            ))}

            <div className="space-y-2">
              <span className="text-[#3dd8e8] font-semibold block">Services</span>
              {services.map((service) => (
                <Link
                  key={service.name}
                  to={service.path}
                  className="block pl-4 text-gray-300 hover:text-[#3dd8e8] transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {service.name}
                </Link>
              ))}
            </div>

            <Link
              to="/contact"
              className="text-white hover:text-[#3dd8e8] transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Contact
            </Link>

            <div className="pt-4 border-t border-zinc-800">
              {currentUser ? (
                <Link
                  to={currentUser.role === 'admin' ? '/admin' : '/dashboard'}
                  className="block text-[#3dd8e8] hover:text-[#34c5d3] transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {currentUser.role === 'admin' ? 'Admin Dashboard' : 'Dashboard'}
                </Link>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="block text-[#3dd8e8] hover:text-[#34c5d3] transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    to="/admin-login"
                    className="block mt-2 text-gray-400 hover:text-[#3dd8e8] transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    Admin Login
                  </Link>
                </>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;