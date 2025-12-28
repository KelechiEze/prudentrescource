'use client';
import React from 'react';
import { ArrowDown } from 'lucide-react';

const ServiceDetails: React.FC = () => {
  return (
    <section className="flex flex-col lg:flex-row w-full mt-10">
      {/* Left Column: Text Content */}
      <div className="w-full lg:w-1/2 bg-[#E3E8DE] p-12 lg:p-24 flex flex-col justify-center relative min-h-[700px]">
        <div className="max-w-xl">
          <h2 className="font-serif text-5xl md:text-6xl text-[#1a1a1a] mb-8 leading-[1.1]">
            Our medical staffing services include...
          </h2>
          
          <p className="text-[#4a4a4a] text-lg leading-relaxed mb-12">
            Backed by years of proven experience, we partner with healthcare organizations 
            to navigate staffing needs proactively while connecting skilled professionals 
            with rewarding opportunities across multiple specialties.
          </p>
        </div>

        {/* Down Arrow anchored to bottom */}
        <div className="absolute bottom-12 left-12 lg:left-24 animate-bounce">
          <ArrowDown className="w-6 h-6 text-gray-800" />
        </div>
      </div>

      {/* Right Column: Image & Overlay Card */}
      <div className="w-full lg:w-1/2 relative min-h-[700px] bg-gray-200">
        {/* Main Background Image - Reduced width, increased height */}
        <div className="absolute inset-0 overflow-hidden">
          <img 
            src="/ladycare.png" 
            alt="Doctor examining patient" 
            className="w-full h-full object-cover object-center"
            style={{ width: '80%', height: '100%', objectFit: 'cover' }}
          />
        </div>
        
        {/* Floating Card Overlay - Increased width */}
        <div className="absolute bottom-0 left-0 lg:bottom-12 lg:-left-12 max-w-lg w-full md:w-[550px] z-10 p-4 lg:p-0">
          <div className="bg-[#1B2C42] rounded-lg overflow-hidden shadow-2xl flex h-52 lg:h-56">
            
            {/* Small Image in Card - Increased width */}
            <div className="w-1/2 relative h-full">
              <img 
                src="/whitehair.png" 
                alt="Nurse smiling with patient" 
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>

            {/* Content in Card - Reduced width */}
            <div className="w-1/2 p-6 lg:p-8 flex flex-col justify-center">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-2 h-2 rounded-full bg-[#00e055]"></div>
                <span className="text-[10px] font-bold tracking-widest text-white/80 uppercase">
                  THE FIELDS WE SERVE
                </span>
              </div>
              
              <h3 className="font-serif text-2xl lg:text-3xl text-white leading-tight">
                We Guarantee 100% Compatibility
              </h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceDetails;