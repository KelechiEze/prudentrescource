'use client';
import React from 'react';
import { CheckCircle2 } from 'lucide-react';

const CostEffectiveSolutions: React.FC = () => {
  return (
    <section className="pb-16 pt-[8px] bg-white">
      <div className="mx-auto px-2">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 items-stretch">
          
          {/* Left Column: Blue Content */}
          <div className="bg-[#B5D0FF] rounded-xl px-8 py-10 md:py-12 flex flex-col justify-between min-h-[500px]">
            <div>
              <h2 className="font-serif text-4xl md:text-5xl text-[#1B2C42] mb-6 leading-tight">
                Cost-Effective Solutions
              </h2>
              
              <p className="text-[#1B2C42] text-lg leading-relaxed mb-[7rem]">
                Reduce staffing overhead without compromising care. We help healthcare organizations 
                eliminate recruitment costs, improve coverage, and access qualified professionals 
                within budget. Reduce cost on advertising, screening, and credentialing.
              </p>

              <ul className="space-y-2 mb-12">
                {[
                  "Get the most value out of every penny",
                  "Reduce overtime and emergency staffing expenses",
                  "Elimination staffing costs on advertising & credentialing"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-[#1B2C42] shrink-0 mt-0.5" strokeWidth={1.5} />
                    <span className="text-[#1B2C42] font-semibold text-lg">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <h3 className="font-serif text-xl md:text-2xl text-[#1B2C42] leading-tight">
              Access talented professionals within your budget
            </h3>
          </div>

          {/* Right Column: Image with Overlay */}
          <div className="relative rounded-xl overflow-hidden min-h-[500px]">
            <img 
              src="/greens.png" 
              alt="Medical professionals analyzing data on screen" 
              className="absolute inset-0 w-full h-full object-cover"
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
            
            {/* Text Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 lg:p-16">
              <h2 className="font-serif text-3xl md:text-4xl text-white mb-4 leading-tight">
                Reliable, Vetted Talent
              </h2>
              <p className="text-gray-200 text-lg leading-relaxed max-w-md">
                Access credentialed professionals who meet strict compliance standards—giving you 
                confidence in every referral.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default CostEffectiveSolutions;
