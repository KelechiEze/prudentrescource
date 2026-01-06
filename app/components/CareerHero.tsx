'use client';
import React, { useState } from 'react';
import { Search, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface CareerHeroProps {
  onSearchClick?: () => void; // Made optional since we're handling navigation directly
}

const CareerHero: React.FC<CareerHeroProps> = ({ onSearchClick }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const handleSearch = () => {
    if (searchQuery.trim()) {
      // Navigate to /jobsearch with the query parameter
      router.push(`/jobsearch?q=${encodeURIComponent(searchQuery)}`);
    } else {
      // Navigate to /jobsearch without any query
      router.push('/jobsearch');
    }
    // Call the optional prop function if it exists
    if (onSearchClick) {
      onSearchClick();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <section className="bg-white pt-28 px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Main Title */}
        <h1 className="font-serif text-4xl md:text-5xl text-center text-[#1a1a1a] mb-[40px]">
          Explore Career Opportunities
        </h1>

        {/* Search Bar */}
        <div className="max-w-4xl mx-auto mb-16 flex flex-col md:flex-row gap-4">
          <div className="flex-1 bg-[#E3E8DE] rounded-full h-10 md:h-12 px-6 flex items-center gap-3 transition-colors focus-within:ring-2 focus-within:ring-[#1B2C42]/20">
            <Search className="text-gray-500 w-5 h-5 md:w-6 md:h-6" />
            <input 
              type="text" 
              placeholder="Search your discipline" 
              className="bg-transparent border-none outline-none text-gray-800 placeholder-gray-500 w-full h-full text-base md:text-lg"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </div>
          <button 
            onClick={handleSearch}
            className="h-10 md:h-12 px-10 bg-[#1B2C42] hover:bg-[#2a4466] text-white text-base md:text-lg %rounded-full flex items-center justify-center gap-2 transition-transform active:scale-95 shadow-lg"
          >
            Search <ArrowRight size={20} />
          </button>
        </div>

        {/* Content Split Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 min-h-[600px]">
          
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
              src="/cute.png" 
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