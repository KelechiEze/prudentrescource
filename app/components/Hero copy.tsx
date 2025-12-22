'use client';

import React from 'react';
import { CheckCircle, Search, ArrowRight } from 'lucide-react';

interface HeroProps {
  onSearch: () => void;
}

const Hero: React.FC<HeroProps> = ({ onSearch }) => {
  return (
    <section className="relative w-full h-screen min-h-[800px] overflow-hidden flex flex-col justify-center">
      {/* GIF Background */}
      <div className="absolute inset-0 w-full h-full">
        <img
          src="/samplegif.gif"
          alt="Healthcare professionals"
          className="w-full h-full object-cover"
          loading="eager"
        />
        
        {/* Enhanced Dark Gradient Overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/70 to-black/60" />
        
        {/* Additional subtle gradient for depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 pt-20">
        <div className="max-w-4xl">
          <h1 className="font-serif text-5xl md:text-7xl text-white mb-6 leading-[1.1] tracking-tight drop-shadow-lg">
            Precision healthcare <br />
            staffing, curated for trust
          </h1>
          
          <p className="text-gray-100 text-base md:text-lg font-light mb-28 max-w-2xl leading-relaxed drop-shadow-lg">
            We connect healthcare organizations with credentialed professionals through a carefully
            facilitated matching process — not a marketplace. Real humans curating real matches.
          </p>
        </div>

        {/* Bottom Section: Checklist and Search Bar */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 w-full">
          
          {/* Checklist with enhanced readability */}
          <div className="flex flex-col gap-4 shrink-0">
            {[
              "100% Credential verified professionals",
              "Admin-facilitated matching",
              "For Hospitals, Clinics & Home-care"
            ].map((feature, i) => (
              <div key={i} className="flex items-center gap-3 text-white font-medium text-base drop-shadow-md">
                <div className="bg-white/20 backdrop-blur-sm rounded-full p-1">
                  <CheckCircle className="text-white w-5 h-5" strokeWidth={2} />
                </div>
                <span className="drop-shadow-md">{feature}</span>
              </div>
            ))}
          </div>

          {/* Search Bar - Enhanced visibility */}
          <div className="w-full max-w-2xl flex items-center gap-4">
            {/* Input Field Box */}
            <div className="flex-1 bg-white/20 backdrop-blur-md border border-white/40 rounded-full h-14 px-5 flex items-center gap-3 transition-all hover:bg-white/25 focus-within:bg-white/30 focus-within:border-white/50">
              <Search className="text-white w-5 h-5" />
              <input 
                type="text" 
                placeholder="Search your discipline" 
                className="bg-transparent border-none outline-none text-white placeholder-gray-300 w-full h-full text-sm md:text-base placeholder:text-gray-300"
                onKeyDown={(e) => e.key === 'Enter' && onSearch()}
              />
            </div>

            {/* Separate Button */}
            <button 
              onClick={onSearch}
              className="h-14 px-8 bg-teal-400 hover:bg-teal-500 text-gray-900 font-bold rounded-full flex items-center gap-2 transition-all active:scale-95 whitespace-nowrap shadow-xl shadow-teal-900/30 border-2 border-teal-400 hover:border-teal-500"
            >
              Search <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;