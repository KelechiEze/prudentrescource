'use client';
import React from 'react';

const ResidentialHero: React.FC = () => {
  return (
    <section className="bg-white pt-40 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        
        <div className="max-w-5xl">
          {/* Heading */}
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-[#1a1a1a] mb-8 leading-[1.15]">
            <span className="text-gray-400">Residential Group Homes:</span> Linking Professionals to Supportive Living Environments
          </h1>

          {/* Description */}
          <p className="text-gray-600 text-lg md:text-xl leading-relaxed max-w-4xl">
            Linking professionals that clients need to deliver the support services that allow children and adults 
            in a residential setting to achieve their optimal lifestyle. Our professionals help individuals 
            in group homes overcome obstacles and accomplish their goals, ensuring everyone has the chance 
            to live the best life they can.
          </p>
        </div>

      </div>
    </section>
  );
};

export default ResidentialHero;
