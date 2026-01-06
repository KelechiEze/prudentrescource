'use client';
import React from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

const OrganizationTrust: React.FC = () => {
  return (
    <section className="pt-[56px] bg-white">
      <div className="mx-auto px-2">
        
        {/* Header Section */}
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-10 mb-[56px] lg:items-start">
          
          {/* Label Column */}
          <div className="lg:w-2/6 pt-4">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-[#8b5cf6]"></div> {/* Purple dot */}
              <span className="text-xs font-bold tracking-widest text-gray-900 uppercase">
                WHY ORGANIZATIONS PARTNER WITH US
              </span>
            </div>
          </div>

          {/* Heading Column */}
          <div className="lg:w-4/6">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-gray-900 leading-[1.15]">
              Why Healthcare Organizations <br />
              Trust Prudent Resources
            </h2>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 items-stretch">
          
          {/* Card 1: Fast & Responsive Support (Peach) */}
          <div className="bg-[#FFBCA0] rounded-xl p-8 lg:p-10 flex flex-col justify-between min-h-[500px]">
            <div>
              <p className="text-[#1B2C42] text-lg leading-relaxed mb-10 font-medium">
                We respond quickly — whether you’re filling a same-day shift or planning ahead 
                — ensuring you always stay fully staffed and supported.
              </p>
              
              <h3 className="font-serif text-3xl md:text-4xl text-[#1B2C42] leading-tight mb-8">
                Fast & Responsive Support
              </h3>
            </div>
            
            <div>
              <div className="border-t border-[#1B2C42]/20 w-full mb-6"></div>
              <button className="group flex items-center gap-2 text-[#1B2C42] font-semibold text-lg transition-all hover:opacity-80">
                Contact us for staffing support
                <ArrowRight size={20} className="transition-transform group-hover:translate-x-2" />
              </button>
            </div>
          </div>

          {/* Card 2: Image */}
          <div className="rounded-xl overflow-hidden h-[500px] lg:h-auto">
            <img 
              src="/helpold.png" 
              alt="Male doctor reviewing medical records" 
              className="w-full h-full object-cover"
            />
          </div>

          {/* Card 3: Flexible Staffing Options (Lavender) */}
          <div className="bg-[#E9E6F5] rounded-xl p-8 lg:p-10 flex flex-col justify-center min-h-[500px]">
            <h3 className="font-serif text-3xl md:text-4xl text-[#1B2C42] leading-tight mb-6">
              Flexible Staffing Options
            </h3>
            
            <p className="text-[#1B2C42] text-lg leading-relaxed mb-[92px]">
              Fill one role or one hundred. Temporary, long-term, temp-to-hire, or urgent call-outs
              —we adapt to your staffing demands.
            </p>

            <ul className="space-y-2">
              {[
                "Fill temporary roles",
                "Long-term placements",
                "Urgent shift coverage"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3">
                  <CheckCircle2 className="w-6 h-6 text-[#1B2C42] shrink-0" strokeWidth={1.5} />
                  <span className="text-[#1B2C42] font-semibold text-lg">{item}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>

      </div>
    </section>
  );
};

export default OrganizationTrust;
