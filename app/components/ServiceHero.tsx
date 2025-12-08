'use client';
import React from 'react';

const ServiceHero: React.FC = () => {
  return (
    <section className="bg-white pt-40 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Label */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-3.5 h-3.5 rounded-full bg-[#8b5cf6]"></div> {/* Purple dot */}
          <span className="text-sm font-bold tracking-widest text-gray-800 uppercase">
            PRUDENT RESOURCES SERVICES
          </span>
        </div>

        {/* Heading */}
        <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl text-[#1a1a1a] mb-8 leading-[1.1] max-w-5xl">
          Uniting Healthcare Organizations with Caring, Highly Skilled Professionals
        </h1>

        {/* Description */}
        <p className="text-gray-600 text-lg md:text-xl leading-relaxed max-w-3xl">
          We partner with healthcare organizations to navigate staffing needs proactively, 
          connecting skilled professionals with rewarding opportunities across multiple specialties.
        </p>

      </div>
    </section>
  );
};

export default ServiceHero;