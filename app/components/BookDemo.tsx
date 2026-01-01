'use client';
import React from 'react';
import { ArrowRight } from 'lucide-react';

const BookDemo: React.FC = () => {
  return (
    <section className="py-[72px] bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-[#1B2C42] mb-8 leading-tight">
            Book a free demo to see how <br />
            we find and place talent
          </h2>
          
          <p className="text-gray-600 text-lg leading-relaxed mb-10 max-w-3xl">
            Schedule a call with one of our Hiring Partners to learn how we identify top-tier talent, 
            help your new team members hit the ground running from day one, and provide clear insight 
            into our pricing, timelines, and collaborative process.
          </p>
          
          <button className="bg-[#68cfa3] hover:bg-[#5abf94] text-[#1B2C42] px-8 py-4 rounded-full text-sm font-semibold flex items-center gap-2 transition-all shadow-lg shadow-teal-900/10">
            Book a meeting with us <ArrowRight size={18} />
          </button>

        </div>
      </div>
    </section>
  );
};

export default BookDemo;
