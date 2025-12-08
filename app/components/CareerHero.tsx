'use client';
import React from 'react';
import { Search, ArrowRight } from 'lucide-react';

interface CareerHeroProps {
  onSearchClick: () => void;
}

const CareerHero: React.FC<CareerHeroProps> = ({ onSearchClick }) => {
  return (
    <section className="bg-white pt-40 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Main Title */}
        <h1 className="font-serif text-5xl md:text-6xl text-center text-[#1a1a1a] mb-12">
          Explore Career Opportunities
        </h1>

        {/* Search Bar */}
        <div className="max-w-4xl mx-auto mb-20 flex flex-col md:flex-row gap-4">
          <div className="flex-1 bg-[#E3E8DE] rounded-full h-14 md:h-16 px-6 flex items-center gap-3 transition-colors focus-within:ring-2 focus-within:ring-[#1B2C42]/20">
            <Search className="text-gray-500 w-5 h-5 md:w-6 md:h-6" />
            <input 
              type="text" 
              placeholder="Search your discipline" 
              className="bg-transparent border-none outline-none text-gray-800 placeholder-gray-500 w-full h-full text-base md:text-lg"
              onKeyDown={(e) => e.key === 'Enter' && onSearchClick()}
            />
          </div>
          <button 
            onClick={onSearchClick}
            className="h-14 md:h-16 px-10 bg-[#1B2C42] hover:bg-[#2a4466] text-white text-base md:text-lg font-bold rounded-full flex items-center justify-center gap-2 transition-transform active:scale-95 shadow-lg"
          >
            Search <ArrowRight size={20} />
          </button>
        </div>

        {/* Content Split Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 min-h-[600px]">
          
          {/* Left Content Card */}
          <div className="bg-[#EFEDFA] rounded-xl p-8 md:p-12 lg:p-16 flex flex-col justify-center">
             <div className="flex items-center gap-3 mb-8">
                <div className="w-3 h-3 rounded-full bg-[#8b5cf6]"></div> {/* Purple dot */}
                <span className="text-xs font-bold tracking-widest text-gray-900 uppercase">
                  FOR PROFESSIONALS
                </span>
             </div>

             <h2 className="font-serif text-4xl md:text-5xl lg:text-[3.5rem] leading-[1.1] text-gray-900 mb-8">
               Advance Your Career with Opportunities That Fit Your Skills and Goals
             </h2>

             <p className="text-gray-600 text-lg leading-relaxed">
               Choosing the right platform to grow your healthcare career is an important decision. 
               At Prudent Resources, we connect qualified professionals with organizations that 
               value your expertise, experience, and dedication.
             </p>
          </div>

          {/* Right Image Card */}
          <div className="rounded-xl overflow-hidden relative min-h-[400px] lg:min-h-auto">
            <img 
              src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
              alt="Smiling medical professional with stethoscope" 
              className="absolute inset-0 w-full h-full object-cover object-top"
            />
          </div>

        </div>

      </div>
    </section>
  );
};

export default CareerHero;
