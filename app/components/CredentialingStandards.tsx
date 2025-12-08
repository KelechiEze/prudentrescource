'use client';
import React from 'react';
import { CheckCircle2 } from 'lucide-react';

const CredentialingStandards: React.FC = () => {
  const standards = [
    "Comprehensive background checks",
    "License and certification verification",
    "Primary source verification",
    "Compliance monitoring",
    "Ongoing credential expiration tracking"
  ];

  return (
    <section className="bg-white">
      <div className="max-w-7xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[600px] rounded-xl overflow-hidden">
          
          {/* Left Column: Image */}
          <div className="relative h-[400px] lg:h-auto">
            <img 
              src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
              alt="Smiling healthcare professional with glasses" 
              className="absolute inset-0 w-full h-full object-cover object-top"
            />
          </div>

          {/* Right Column: Content */}
          <div className="bg-[#E3E8DE] p-12 lg:p-20 flex flex-col justify-center">
            <h2 className="font-serif text-4xl md:text-5xl text-[#1B2C42] mb-6 leading-tight">
              Our Credentialing Standards
            </h2>
            
            <p className="text-[#1B2C42] text-lg leading-relaxed mb-12">
              You can trust our Credentialing, we ensure every candidate 
              meets industry-leading compliance, safety, and verification 
              requirements.
            </p>

            <div className="flex flex-col gap-5">
              {standards.map((item, index) => (
                <div key={index} className="flex items-center gap-4">
                  <CheckCircle2 className="w-6 h-6 text-[#1B2C42] shrink-0" strokeWidth={1.5} />
                  <span className="text-[#1B2C42] font-semibold text-lg">{item}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default CredentialingStandards;
