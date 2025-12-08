'use client';
import React from 'react';

const BehavioralHero: React.FC = () => {
  return (
    <section className="bg-white pt-40 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        
        <div className="max-w-5xl">
          {/* Heading */}
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-[#1a1a1a] mb-8 leading-[1.15]">
            <span className="text-gray-400">Behavioral Healthcare:</span> Specialized Workforce Solutions for Behavioral Health Providers
          </h1>

          {/* Description */}
          <p className="text-gray-600 text-lg md:text-xl leading-relaxed max-w-4xl">
            We’re deeply committed to supporting the behavioral healthcare community, connecting qualified professionals 
            with organizations serving individuals across all age groups who are navigating emotional, mental, developmental, 
            social, and intellectual challenges. Our network also includes specialists experienced in co-occurring disorders, 
            substance use treatment, and a wide range of acute and long-term behavioral health needs.
          </p>
        </div>

      </div>
    </section>
  );
};

export default BehavioralHero;
