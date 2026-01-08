'use client';
import React from 'react';
import { CheckCircle2 } from 'lucide-react';

const StaffingSolutions: React.FC = () => {
  const solutions = [
    "Hard-to-Fill Shifts",
    "Vacation / Holiday Coverage",
    "Maternity & Medical Leave",
    "Seasonal / High-Demand Periods",
    "Special Projects & Start-Up Programs",
    "Temp-to-Perm Support",
    "Urgent Call-Outs",
    "On-Going Staffing Partnerships"
  ];

  return (
    <section className="flex flex-col lg:flex-row w-full bg-[#E3E8DE] my-[8px] overflow-hidden">
      {/* Left Column: Content */}
      <div className="w-full lg:w-1/2 p-6 lg:p-12 xl:p-24 flex flex-col justify-center">
        <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-[#1B2C42] mb-6 lg:mb-8 leading-tight">
          Staffing solutions for every healthcare needs
        </h2>
        
        <p className="text-gray-700 text-base lg:text-lg leading-relaxed mb-8 lg:mb-12 max-w-xl">
          Whether you need last-minute coverage or long-term staffing support, 
          we connect you with reliable professionals across multiple specialties and care settings.
        </p>

        <div className="flex flex-col gap-3 lg:gap-4">
          {solutions.map((item, index) => (
            <div key={index} className="flex items-center gap-3 lg:gap-4">
              <CheckCircle2 className="w-5 h-5 lg:w-6 lg:h-6 text-[#1B2C42] shrink-0" strokeWidth={1.5} />
              <span className="text-[#1B2C42] font-semibold text-base lg:text-lg">{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Right Column: Image */}
      <div className="w-full lg:w-1/2 min-h-[400px] lg:min-h-[600px] relative m-2">
        <img 
          src="/msold.png" 
          alt="Healthcare professional looking at monitor" 
          className="absolute inset-0 w-full h-full object-cover lg:rounded-lg"
        />
      </div>
    </section>
  );
};

export default StaffingSolutions;