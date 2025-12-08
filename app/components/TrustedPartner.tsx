'use client';
import React from 'react';
import { CheckCircle2 } from 'lucide-react';

const TrustedPartner: React.FC = () => {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="max-w-4xl mb-16">
          <h2 className="font-serif text-4xl md:text-5xl text-[#1B2C42] mb-6 leading-tight">
            Prudent Resources has become the trusted partner <br className="hidden md:block" />
            you can count on to move your career forward.
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            Explore the ways Prudent Resources supports your professional growth, 
            income goals, and career flexibility
          </p>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Card 1: Blue Content */}
          <div className="bg-[#B5D0FF] rounded-xl p-8 md:p-12 flex flex-col justify-center min-h-[320px]">
             <ul className="space-y-6">
                {[
                  "Increase your income",
                  "Expand your professional experience",
                  "Create better balance in your life or studies"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <CheckCircle2 className="w-6 h-6 text-[#1B2C42] shrink-0 mt-0.5" strokeWidth={1.5} />
                    <span className="text-[#1B2C42] font-semibold text-lg leading-snug">{item}</span>
                  </li>
                ))}
             </ul>
          </div>

          {/* Card 2: Peach Content */}
          <div className="bg-[#FFBCA0] rounded-xl p-8 md:p-12 flex flex-col justify-center min-h-[320px]">
             <ul className="space-y-6">
                {[
                  "Enter new specialties or areas of practice",
                  "Build and shape your career on your terms",
                  "Work in diverse environments and populations"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <CheckCircle2 className="w-6 h-6 text-[#1B2C42] shrink-0 mt-0.5" strokeWidth={1.5} />
                    <span className="text-[#1B2C42] font-semibold text-lg leading-snug">{item}</span>
                  </li>
                ))}
             </ul>
          </div>

          {/* Image 1: Group Thumbs Up */}
          <div className="rounded-xl overflow-hidden h-[320px] md:h-[400px]">
            <img 
              src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
              alt="Group of smiling medical professionals giving thumbs up" 
              className="w-full h-full object-cover object-top"
            />
          </div>

          {/* Image 2: Patient Care */}
          <div className="rounded-xl overflow-hidden h-[320px] md:h-[400px]">
            <img 
              src="https://images.unsplash.com/photo-1581056771107-24ca5f033842?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
              alt="Nurse assisting elderly patient" 
              className="w-full h-full object-cover"
            />
          </div>

        </div>
      </div>
    </section>
  );
};

export default TrustedPartner;