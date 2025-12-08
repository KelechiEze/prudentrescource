'use client';
import React from 'react';
import { CheckCircle2, ArrowRight } from 'lucide-react';

const AddictionProfessionals: React.FC = () => {
  const professionals = [
    "Substance Abuse Counselors",
    "Addiction Specialists",
    "Detox Nurses (RN/LPN)",
    "Clinical Therapists",
    "Peer Support Specialists",
    "Case Managers",
    "Crisis Intervention Specialists",
    "Psychiatric Nurse Practitioners",
    "Rehabilitation Technicians"
  ];

  return (
    <section className="py-24 bg-[#E3E8DE]">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <h2 className="font-serif text-4xl md:text-5xl text-[#1B2C42] mb-12 max-w-4xl leading-tight">
          The types of professionals who utilize our service <br />
          in addiction treatment include:
        </h2>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-16">
          {professionals.map((prof, index) => (
            <div 
              key={index} 
              className="bg-white rounded-full px-6 py-4 flex items-center gap-4 shadow-sm transition-transform hover:-translate-y-1 duration-300"
            >
              <CheckCircle2 className="w-6 h-6 text-[#1B2C42] shrink-0" strokeWidth={1.5} />
              <span className="text-[#1B2C42] font-semibold text-lg">{prof}</span>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <button className="bg-[#1B2C42] hover:bg-[#2a4466] text-white px-8 py-4 rounded-full text-sm font-semibold flex items-center gap-2 transition-all shadow-lg shadow-navy-900/20">
          Find job opportunities <ArrowRight size={18} />
        </button>

      </div>
    </section>
  );
};

export default AddictionProfessionals;
