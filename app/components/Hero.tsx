'use client';
import React, { useState, useEffect } from 'react';
import { CheckCircle, Search, ArrowRight } from 'lucide-react';
import { HERO_IMAGES } from '../../constants';

interface HeroProps {
  onSearch: () => void;
}

const Hero: React.FC<HeroProps> = ({ onSearch }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full h-screen min-h-[800px] overflow-hidden flex flex-col justify-center">
      {/* Background Carousel */}
      {HERO_IMAGES.map((image, index) => (
        <div
          key={image.id}
          className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
            index === currentImageIndex ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img
            src={image.url}
            alt={image.alt}
            className="w-full h-full object-cover"
          />
          {/* Dark Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/20" />
        </div>
      ))}

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 pt-20">
        <div className="max-w-4xl">
          <h1 className="font-serif text-5xl md:text-7xl text-white mb-6 leading-[1.1] tracking-tight">
            Precision healthcare <br />
            staffing, curated for trust
          </h1>
          
          <p className="text-gray-200 text-lg md:text-xl font-light mb-20 max-w-2xl leading-relaxed opacity-90">
            We connect healthcare organizations with credentialed professionals through a carefully
            facilitated matching process — not a marketplace. Real humans curating real matches.
          </p>
        </div>

        {/* Bottom Section: Checklist and Search Bar */}
        {/* Changed breakpoint from xl to lg to ensure they are side-by-side on standard laptops */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 w-full">
          
          {/* Checklist */}
          <div className="flex flex-col gap-4 shrink-0">
            {[
              "100% Credential verified professionals",
              "Admin-facilitated matching",
              "For Hospitals, Clinics & Home-care"
            ].map((feature, i) => (
              <div key={i} className="flex items-center gap-3 text-white font-medium text-lg">
                <div className="bg-white/10 rounded-full p-0.5">
                   <CheckCircle className="text-white w-6 h-6" strokeWidth={2} />
                </div>
                <span>{feature}</span>
              </div>
            ))}
          </div>

          {/* Search Bar - Separated Components */}
          <div className="w-full max-w-2xl flex items-center gap-4">
            {/* Input Field Box - Reduced size */}
            <div className="flex-1 bg-white/10 backdrop-blur-md border border-white/30 rounded-full h-14 px-5 flex items-center gap-3 transition-colors hover:bg-white/15 focus-within:bg-white/20">
               <Search className="text-white w-5 h-5 opacity-80" />
               <input 
                 type="text" 
                 placeholder="Search your discipline" 
                 className="bg-transparent border-none outline-none text-white placeholder-gray-200 w-full h-full text-base md:text-lg"
                 onKeyDown={(e) => e.key === 'Enter' && onSearch()}
               />
            </div>

            {/* Separate Button - Reduced size */}
            <button 
              onClick={onSearch}
              className="h-14 px-8 bg-teal-400 hover:bg-teal-500 text-gray-900 text-base md:text-lg font-bold rounded-full flex items-center gap-2 transition-transform active:scale-95 whitespace-nowrap shadow-lg shadow-teal-900/20"
            >
               Search <ArrowRight size={18} />
            </button>
          </div>

        </div>
      </div>
      
      {/* Carousel Indicators */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {HERO_IMAGES.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentImageIndex(idx)}
            className={`w-2 h-2 rounded-full transition-all ${
              idx === currentImageIndex ? 'bg-white w-6' : 'bg-white/40 hover:bg-white/60'
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;