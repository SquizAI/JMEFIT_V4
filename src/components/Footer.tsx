import React from 'react';
import { Instagram } from 'lucide-react';
import { Link } from 'react-router-dom';
import Logo from './Logo';

const Footer = () => {
  return (
    <footer className="bg-zinc-900 py-12">
      <div className="container mx-auto px-4">
        <div className="flex justify-center mb-8">
          <Link to="/">
            <Logo className="w-40 h-auto" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-4 text-[#3dd8e8]">JME FIT</h3>
            <p className="text-gray-400">
              Empowering you to achieve your fitness goals through expert guidance and personalized programs.
            </p>
          </div>
          <div>
            <h4 className="text-xl font-semibold mb-4 text-[#3dd8e8]">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/services" className="text-gray-400 hover:text-[#3dd8e8] transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/services#packages" className="text-gray-400 hover:text-[#3dd8e8] transition-colors">
                  Packages
                </Link>
              </li>
              <li>
                <Link to="/#testimonials" className="text-gray-400 hover:text-[#3dd8e8] transition-colors">
                  Testimonials
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-400 hover:text-[#3dd8e8] transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-[#3dd8e8] transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-xl font-semibold mb-4 text-[#3dd8e8]">Contact Info</h4>
            <ul className="space-y-2 text-gray-400">
              <li>Email: jaime@jmefit.com</li>
              <li>Instagram: @jmefit_</li>
            </ul>
          </div>
          <div>
            <h4 className="text-xl font-semibold mb-4 text-[#3dd8e8]">Follow Me</h4>
            <div className="flex space-x-4">
              <a
                href="https://www.instagram.com/jmefit_/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-[#3dd8e8] transition-colors"
              >
                <Instagram size={24} />
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-zinc-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} JME FIT. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;