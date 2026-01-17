'use client';
import React from 'react';
import { Stethoscope } from 'lucide-react';

const ServiceTeamShowcase: React.FC = () => {
  return (
    <section className="relative w-full h-[600px] md:h-[700px] overflow-hidden bg-[#2D3136]">
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full">
        <img
          src="/doctorssmile.png" 
          alt="Team of healthcare professionals"
          className="w-full h-full object-cover object-[center_20%] opacity-90"
        />
        {/* Gradient Overlay for text readability matching the dark aesthetic */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30"></div>
      </div>

      <div className="relative z-10 w-full h-full max-w-7xl mx-auto px-6 py-12 flex flex-col justify-between">
        
        {/* Top Elements */}
        <div className="flex justify-between items-center h-16">
          {/* Top Left Icon */}
          <div className="w-16 h-16 rounded-full border border-white/30 flex items-center justify-center backdrop-blur-md bg-white/10 transition-transform hover:scale-105">
            <Stethoscope className="text-white w-8 h-8" strokeWidth={1.5} />
          </div>

          {/* Top Right Badge */}
          <div className="h-fit px-6 py-3 rounded-full border border-white/30 backdrop-blur-md bg-white/10 flex items-center gap-3">
            <div className="w-2.5 h-2.5 rounded-full bg-[#68cfa3]"></div>
            <span className="text-white text-xs font-bold tracking-widest uppercase font-sans">Prudent Resources</span>
          </div>
        </div>

        {/* Bottom Text Content - INCREASED MAX-WIDTH */}
        <div className="mb-8 md:mb-12 pr-12 md:pr-24 lg:pr-48">
          <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl text-white leading-tight max-w-5xl lg:max-w-6xl drop-shadow-lg"> {/* Increased from max-w-4xl to max-w-5xl lg:max-w-6xl */}
            You can count on us to deliver cost-effective outcomes<br className="hidden lg:block" />
            and highly qualified healthcare professionals
          </h2>
        </div>
      </div>
    </section>
  );
};

export default ServiceTeamShowcase;