'use client';
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

const OrganizationsHero: React.FC = () => {
  const router = useRouter();

  const handleRequestTalent = () => {
    router.push('/staffrequest');
  };

  return (
    <section className="relative w-full min-h-[600px] lg:min-h-[700px] flex items-center justify-center overflow-hidden mt-24 lg:mt-28">
      {/* Background Image */}
      <div className="absolute inset-0 mx-2 z-0">
        <img
          src="/tablet.png" 
          alt="Healthcare professional using tablet"
          className="w-full h-full object-cover brightness-95 rounded-lg"
        />
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/10 rounded-lg" /> 
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center text-white pt-20">
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="w-3 h-3 rounded-full bg-orange-400"></div>
          <span className="text-xs font-bold tracking-widest uppercase text-white/90">For Organizations</span>
        </div>

        <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl mb-6 leading-[130%] drop-shadow-sm">
          Find Qualified Healthcare Professionals <br />
          When You Need Them Most
        </h1>

        <p className="text-lg md:text-xl text-gray-100 mb-[56px] max-w-3xl mx-auto leading-[150%] drop-shadow-sm font-light">
          Partner with Prudent Resources to access dependable, fully screened professionals for
          every level of care. We help healthcare organizations stay staffed, compliant, and ready
          to deliver exceptional patient outcomes.
        </p>

        {/* Updated: Single centered button with click handler */}
        <div className="flex items-center justify-center">
          <button 
            onClick={handleRequestTalent}
            className="bg-[#68cfa3] hover:bg-[#5abf94] text-[#1B2C42] px-8 py-4 rounded-full text-sm font-bold flex items-center gap-2 transition-all shadow-lg cursor-pointer"
          >
            Request For Talents <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default OrganizationsHero;