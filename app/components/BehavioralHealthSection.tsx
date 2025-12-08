'use client';
import React from 'react';
import { ArrowRight } from 'lucide-react';

const BehavioralHealthSection: React.FC = () => {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row justify-between items-start mb-16 gap-8">
          <div className="max-w-3xl">
            <h2 className="font-serif text-4xl md:text-5xl text-[#1B2C42] mb-6">
              Behavioral Healthcare/Nursing
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              We're deeply committed to supporting the behavioral healthcare community, connecting 
              qualified professionals with organizations serving individuals across all age groups who are 
              navigating emotional, mental, developmental, social, and intellectual challenges.
            </p>
          </div>
          
          <button className="bg-[#1B2C42] hover:bg-[#2a4466] text-white px-8 py-3 rounded-full text-sm font-semibold transition-colors shadow-lg shrink-0 mt-2">
            Learn more
          </button>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Image - Reused from previous section as requested */}
          <div className="lg:col-span-5 h-[400px] lg:h-auto rounded-xl overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80" 
              alt="Healthcare professional with patient" 
              className="w-full h-full object-cover"
            />
          </div>

          {/* Middle Content */}
          <div className="lg:col-span-4 flex flex-col justify-center py-4 lg:px-6">
            <p className="text-[#1B2C42] text-xl leading-relaxed mb-12 font-medium opacity-80">
              We start with a detailed assessment of your recruitment needs and organizational goals
            </p>

            <div className="border-t border-gray-200 w-full mb-8"></div>

            <h3 className="text-[#1B2C42] font-bold text-xl mb-8">
              Explore transformative solutions
            </h3>

            <div className="flex items-center justify-between">
              <span className="text-gray-600 text-lg">Contact us to get started now!</span>
              <button className="w-12 h-12 bg-[#68cfa3] rounded-full flex items-center justify-center text-white hover:bg-[#5abf94] transition-colors shadow-md">
                <ArrowRight size={24} />
              </button>
            </div>
          </div>

          {/* Right Image */}
          <div className="lg:col-span-3 h-[400px] lg:h-auto rounded-xl overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
              alt="Smiling healthcare professional" 
              className="w-full h-full object-cover object-top"
            />
          </div>

        </div>

      </div>
    </section>
  );
};

export default BehavioralHealthSection;