import React from 'react';
import Hero from '../components/Hero';
import Services from '../components/Services';
import OnlineCoaching from '../components/OnlineCoaching';
import Testimonials from '../components/Testimonials';
import Packages from '../components/Packages';
import Blog from '../components/Blog';
import Contact from '../components/Contact';
import Newsletter from '../components/Newsletter';
import FAQ from '../components/FAQ';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <Services />
      <OnlineCoaching />
      <Testimonials />
      <Packages />
      <Blog />
      <Newsletter />
      <FAQ />
      <Contact />
    </div>
  );
};

export default Home;