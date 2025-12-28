'use client';
import React from 'react';

const ServiceHero: React.FC = () => {
  return (
    <section className="bg-white pt-40 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Label */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-3.5 h-3.5 rounded-full bg-[#8b5cf6]"></div>
          <span className="text-sm font-bold tracking-widest text-gray-800 uppercase">
            PRUDENT RESOURCES SERVICES
          </span>
        </div>

        {/* Heading - Larger font size with manual line breaks */}
        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-[#1a1a1a] mb-8 leading-tight max-w-4xl">
          Uniting Healthcare Organizations<br />
          with Caring, Highly Skilled Professionals
        </h1>

        {/* Description - Manual line break */}
        <p className="text-gray-600 text-base md:text-lg leading-tight max-w-xl">
          We partner with healthcare organizations to navigate staffing<br />
          needs proactively, connecting skilled professionals with rewarding opportunities.
        </p>

      </div>
    </section>
  );
};

export default ServiceHero;