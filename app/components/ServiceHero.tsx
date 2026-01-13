'use client';
import React from 'react';

const ServiceHero: React.FC = () => {
  return (
    <section className="bg-white pt-36 pb-[72px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Label */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-3.5 h-3.5 rounded-full bg-[#8b5cf6]"></div>
          <span className="text-sm font-bold tracking-widest text-[#1E1E1E] uppercase">
            PRUDENT RESOURCES SERVICES
          </span>
        </div>

        {/* Heading - Larger font size with manual line breaks */}
        <h1 className="font-serif text-4xl md:text-5xl text-[#1a1a1a] mb-6 leading-[130%] max-w-4xl">
          Uniting Healthcare Organizations<br />
          with Highly Skilled Professionals
        </h1>

        {/* Description - Manual line break */}
        <p className="text-gray-600 text-base md:text-lg leading-[150%] max-w-2xl">
          We partner with healthcare organizations to navigate staffing needs proactively
          , <br /> connecting skilled professionals with rewarding opportunities across multiple specialties.
        </p>

      </div>
    </section>
  );
};

export default ServiceHero;