'use client';
import React from 'react';
import { ArrowRight } from 'lucide-react';

const SubmitCV: React.FC = () => {
  return (
    <section className="bg-[#1B2C42] py-[72px]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
          
          <div className="max-w-3xl">
            <h2 className="font-serif text-3xl md:text-4xl text-white mb-6 leading-tight">
              Can’t find the right role? Submit your CV
            </h2>
            <p className="text-gray-300 text-lg leading-relaxed max-w-2xl">
              We can match you with new opportunities, even while you're away. Share your 
              details and we’ll let you know when a suitable role becomes available.
            </p>
          </div>

          <button className="bg-[#68cfa3] hover:bg-[#5abf94] text-[#1B2C42] px-8 py-4 rounded-full text-sm font-bold flex items-center gap-2 transition-all shadow-lg shadow-teal-900/20 whitespace-nowrap">
            Submit your CV <ArrowRight size={18} />
          </button>

        </div>
      </div>
    </section>
  );
};

export default SubmitCV;
