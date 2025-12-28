'use client';
import React from 'react';
import { ArrowRight } from 'lucide-react';

const OrganizationsHero: React.FC = () => {
  return (
    <section className="relative w-full h-[600px] lg:h-[700px] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/tablet.png" 
          alt="Healthcare professional using tablet"
          className="w-full h-full object-cover brightness-50"
        />
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/40" /> 
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center text-white pt-20">
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="w-3 h-3 rounded-full bg-orange-400"></div>
          <span className="text-xs font-bold tracking-widest uppercase text-white/90">For Organizations</span>
        </div>

        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-8 leading-tight drop-shadow-sm">
          Find Qualified Healthcare Professionals <br />
          When You Need Them Most
        </h1>

        <p className="text-lg md:text-xl text-gray-100 mb-10 max-w-3xl mx-auto leading-relaxed drop-shadow-sm font-light">
          Partner with Prudent Resources to access dependable, fully screened professionals for
          every level of care. We help healthcare organizations stay staffed, compliant, and ready
          to deliver exceptional patient outcomes.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button className="bg-white hover:bg-gray-100 text-[#1B2C42] px-8 py-4 rounded-full text-sm font-bold flex items-center gap-2 transition-all shadow-lg">
            Request for talents <ArrowRight size={18} />
          </button>
          <button className="bg-[#68cfa3] hover:bg-[#5abf94] text-[#1B2C42] px-8 py-4 rounded-full text-sm font-bold flex items-center gap-2 transition-all shadow-lg">
            Book a meeting with us <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default OrganizationsHero;
