import React from 'react';
import { CheckCircle2 } from 'lucide-react';

const SpecializedStaffingList: React.FC = () => {
  const roles = [
    "Registered Nurses (RN)",
    "Licensed Practical Nurses (LPN)",
    "Certified Nurse Assistants (CNA)",
    "Phlebotomists",
    "Certified Medication Assistants (CMA)",
    "Geriatric Nurse Assistants (GNA)",
    "Direct Support Professionals",
    "Certified Medication Technician (CMT)",
    "And More..."
  ];

  return (
    <section className="bg-white pt-24 md:pt-[104px] pb-[72px]">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-20">
        
        {/* Header Section - Button aligned with paragraph text */}
        <div className="flex flex-col lg:flex-row justify-between items-end gap-12 mb-20">
          <div className="max-w-4xl">
            <h2 className="font-serif text-[42px] md:text-[56px] text-[#1B2C42] leading-[130%] mb-6 tracking-tight">
              Specialized Healthcare Staffing
            </h2>
            <p className="text-[#1E3449] text-lg md:text-[20px] leading-[150%] font-light max-w-3xl">
              We connect qualified care professionals with organizations across behavioral health, 
              residential care, and recovery services. Whether you’re looking for full-time, part-time, 
              or shift-based opportunities, we help you find the right fit.
            </p>
          </div>
          
          <div className="pb-2">
            <button className="bg-[#1B2C42] hover:bg-[#152336] text-white px-10 py-4.5 rounded-[70px] text-[13px] font-bold transition-all shadow-xl active:scale-95 whitespace-nowrap">
              Find Opportunities
            </button>
          </div>
        </div>

        {/* Content Section - Increased image width (7/12 ratio) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          
          {/* Roles List - Smaller font size */}
          <div className="lg:col-span-6 flex flex-col gap-5">
            {roles.map((role, index) => (
              <div key={index} className="flex items-center gap-4 group">
                <CheckCircle2 className="w-6 h-6 text-[#1B2C42] shrink-0 opacity-80 group-hover:opacity-100 transition-opacity" strokeWidth={1.5} />
                <span className="text-[#1B2C42] font-bold text-lg md:text-[19px] tracking-tight">
                  {role}
                </span>
              </div>
            ))}
          </div>

          {/* Featured Image - Increased width */}
          <div className="lg:col-span-6 relative rounded-[24px] overflow-hidden shadow-2xl h-[400px] md:h-[550px] lg:h-[600px] w-full">
            <img 
              src="https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=80" 
              alt="Nurse with elderly patient" 
              className="w-full h-full object-cover grayscale-[5%] hover:grayscale-0 transition-all duration-700"
            />
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default SpecializedStaffingList;
