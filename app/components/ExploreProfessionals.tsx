'use client';
import React from 'react';
import { ArrowRight } from 'lucide-react';

const ExploreProfessionals: React.FC = () => {
  return (
    <section className="bg-[#1B2C42] py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-4xl">
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white mb-6 leading-tight">
            Explore the Professionals Available <br />
            Through Prudent Resources
          </h2>
          
          <p className="text-gray-300 text-lg leading-relaxed mb-10 max-w-2xl">
            We can match you with new opportunities, even while you’re away. Share your 
            details and we’ll let you know when a suitable role becomes available.
          </p>

          <button className="bg-[#68cfa3] hover:bg-[#5abf94] text-[#1B2C42] px-8 py-4 rounded-full text-sm font-semibold flex items-center gap-2 transition-all shadow-lg shadow-teal-900/20">
            See professionals <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default ExploreProfessionals;
