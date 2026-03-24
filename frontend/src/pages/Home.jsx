import React from 'react';
import Nav from '../component/Nav';
import home from '../assets/home1.jpg';
import Logos from './Logos';

const Home = () => {
  return (
    <div className='w-full min-h-screen  relative'>
      {/* Navigation - Ensure it sits on top */}
      <div className="absolute top-0 left-0 w-full z-50">
        <Nav />
      </div>

      {/* Hero Section Container */}
      <div className=' h-screen w-full'>
        
        {/* Background Image */}
        <img 
          src={home} 
          className='object-cover w-[100%] h-[100%]' 
          alt="Home Hero"
        />

        {/* Dark Overlay for text readability */}
        <div className='absolute inset-0 bg-black/40' />

        {/* Content Wrapper */}
        <div className='absolute inset-0 flex flex-col items-center justify-center px-4 text-center'>
          
          {/* Main Heading */}
          <h1 className='text-white font-bold leading-tight'>
            <span className='block text-2xl md:text-5xl lg:text-7xl'>
              Grow Your Skills to Advance
            </span>
            <span className='block text-2xl md:text-5xl lg:text-7xl mt-2'>
              Your Career Path
            </span>
          </h1>

          {/* Subtext (Optional but recommended for UI balance) */}
          <p className='text-gray-200 mt-6 text-sm md:text-lg max-w-2xl'>
            Unlock your potential with expert-led courses designed to bridge the gap between learning and earning.
          </p>

          {/* Action Buttons */}
          <div className='mt-10 flex flex-wrap items-center justify-center gap-4'>
            <button className='px-8 py-3 bg-white text-black font-semibold rounded-md hover:bg-gray-200 transition-all cursor-pointer'>
              View All Courses
            </button>
            <button className='px-8 py-3 border-2 border-white text-white font-semibold rounded-md hover:bg-white/10 transition-all cursor-pointer'>
              Search With AI
            </button>
          </div>

        </div>
        <Logos/>
      </div>
    </div>
  );
};

export default Home;