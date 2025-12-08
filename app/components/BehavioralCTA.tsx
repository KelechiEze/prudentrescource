'use client';
import React from 'react';
import { ArrowRight } from 'lucide-react';

const BehavioralCTA: React.FC = () => {
  return (
    <section className="bg-[#1B2C42] w-full overflow-hidden">
      <div className="flex flex-col lg:flex-row h-full">
        
        {/* Left Content Column */}
        <div className="w-full lg:w-1/2 px-6 py-20 lg:py-32 flex justify-end">
           <div className="max-w-xl w-full lg:pr-12">
              <h2 className="font-serif text-4xl md:text-5xl text-white mb-8 leading-[1.15]">
                Transform the Way You <br />
                Work, Hire, and Deliver Care.
              </h2>
              
              <p className="text-gray-300 text-lg leading-relaxed mb-12">
                Whether you're building a career or building a team, our platform helps you access 
                the right opportunities and the right people. Contact us for easier, faster healthcare staffing.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-white hover:bg-gray-100 text-[#1B2C42] px-8 py-4 rounded-full text-sm font-bold flex items-center justify-center gap-2 transition-all shadow-lg">
                  Find job opportunities <ArrowRight size={18} />
                </button>
                
                <button className="bg-[#68cfa3] hover:bg-[#5abf94] text-[#1B2C42] px-8 py-4 rounded-full text-sm font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-teal-900/20">
                  Request for talents <ArrowRight size={18} />
                </button>
              </div>
           </div>
        </div>

        {/* Right Image Column */}
        <div className="w-full lg:w-1/2 h-[500px] lg:h-auto min-h-full relative">
          <img 
            src="https://images.unsplash.com/photo-1606850780554-b55ea2ce98ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80" 
            alt="Medical team collaborating around a laptop" 
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>

      </div>
    </section>
  );
};

export default BehavioralCTA;
