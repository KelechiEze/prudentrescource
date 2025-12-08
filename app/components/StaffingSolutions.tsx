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
    <section className="flex flex-col lg:flex-row w-full bg-[#E3E8DE]">
      {/* Left Column: Content */}
      <div className="w-full lg:w-1/2 p-12 lg:p-24 flex flex-col justify-center">
        <h2 className="font-serif text-4xl md:text-5xl text-[#1B2C42] mb-8 leading-tight">
          Staffing solutions for every healthcare needs
        </h2>
        
        <p className="text-gray-700 text-lg leading-relaxed mb-12 max-w-xl">
          Whether you need last-minute coverage or long-term staffing support, 
          we connect you with reliable professionals across multiple specialties and care settings.
        </p>

        <div className="flex flex-col gap-4">
          {solutions.map((item, index) => (
            <div key={index} className="flex items-center gap-4">
              <CheckCircle2 className="w-6 h-6 text-[#1B2C42] shrink-0" strokeWidth={1.5} />
              <span className="text-[#1B2C42] font-semibold text-lg">{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Right Column: Image */}
      <div className="w-full lg:w-1/2 min-h-[500px] lg:min-h-auto relative">
        <img 
          src="https://images.unsplash.com/photo-1576091160550-21733e99db29?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" 
          alt="Healthcare professional looking at monitor" 
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>
    </section>
  );
};

export default StaffingSolutions;
