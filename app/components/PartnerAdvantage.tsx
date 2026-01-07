'use client';
import React from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

const PartnerAdvantage: React.FC = () => {
  return (
    <section className="pt-[72px] bg-white">
      {/* Reduced padding for even closer edges */}
      <div className="px-2 sm:px-2 lg:px-2">
        
        {/* Header Section - Split Layout */}
        <div className="max-w-7xl px-6 mx-auto flex flex-col lg:flex-row gap-10 mb-16 lg:items-start">
          
          {/* Label Column */}
          <div className="lg:w-2/6 pt-4">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-[#8b5cf6]"></div> {/* Purple dot */}
              <span className="text-xs font-bold tracking-widest text-gray-900 uppercase">BENEFITS OF WORKING WITH US</span>
            </div>
          </div>

          {/* Heading Column */}
          <div className="lg:w-4/6">
            <h2 className="text-4xl md:text-5xl font-serif text-gray-900 leading-[130%]">
              Experience the advantage of <br className="hidden lg:block" />
              Partnering With Prudent Resources
            </h2>
          </div>
        </div>

        {/* Content Grid - Adjusted to use full available width */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 mt-[64px]">
            
            {/* Left Content Box - Lavender Background */}
            <div className="bg-[#EFEDFA] rounded-[6px] p-8 md:p-12 flex flex-col justify-center">
                <h3 className="font-serif text-3xl md:text-4xl leading-[140%] mb-6">
                    <span className="text-[#6B6B6B]">No one-size-fits-all here.</span>{" "}
                    {/* Changed to black as requested */}
                    <span className="text-black">We build a hiring solution that actually fits your goals and your culture</span>
                </h3>

                <p className="text-[#1E1E1E] text-lg leading-[150%] mb-12">
                    We take the time to understand your staffing goals, adapting our recruitment process to meet your specific requirements and help you achieve:
                </p>

                <div className="space-y-4 mt-12 mb-12">
                    {[
                        "Faster, High-Quality Hiring",
                        "Reduced Staffing Costs",
                        "Access to Vetted Talent"
                    ].map((item, i) => (
                        <div key={i} className="flex items-center gap-3">
                            <CheckCircle2 className="w-6 h-6 text-gray-900 shrink-0" strokeWidth={1.5} />
                            <span className="text-gray-900 font-semibold text-lg">{item}</span>
                        </div>
                    ))}
                </div>

                <div>
                    <button className="bg-[#68cfa3] hover:bg-[#5abf94] text-gray-900 px-8 py-4 rounded-full text-sm font-semibold flex items-center gap-2 transition-all shadow-sm shadow-teal-900/10">
                        Request Staffing Service <ArrowRight size={18} />
                    </button>
                </div>
            </div>

            {/* Right Image Box */}
            <div className="h-full min-h-[500px] lg:min-h-0 rounded-[6px] overflow-hidden">
                <img 
                    src="/lpoi.png" 
                    alt="Professionals shaking hands in modern office"
                    className="w-full h-full object-cover"
                />
            </div>

        </div>

      </div>
    </section>
  );
};

export default PartnerAdvantage;