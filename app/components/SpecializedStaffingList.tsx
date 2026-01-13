'use client';
import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

const SpecializedStaffingList: React.FC = () => {
  const router = useRouter();
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

  const handleFindOpportunitiesClick = () => {
    router.push('/submitresume');
  };

  return (
    <section className="bg-white pt-[104px] pb-[72px] mt-[360px]">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-20">
        
        {/* Top Section: Heading, Paragraph and Button */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 mb-16 lg:mb-20">
          <div className="max-w-4xl">
            <h2 className="font-serif text-[42px] md:text-[50px] text-[#1B2C42] leading-[1.05] mb-8 tracking-tight font-normal">
              Specialized Healthcare Staffing
            </h2>
            <p className="font-sans text-gray-600 text-lg md:text-[20px] leading-relaxed font-normal max-w-2xl">
              We connect qualified care professionals with organizations across behavioral health, 
              residential care, and recovery services. Whether you're looking for full-time, part-time, 
              or shift-based opportunities, we help you find the right fit.
            </p>
          </div>
          
          <div className="lg:pb-2">
            <button 
              onClick={handleFindOpportunitiesClick}
              className="bg-[#1B2C42] hover:bg-[#2a3d58] text-white px-8 py-3 rounded-full text-[15px] font-bold transition-all shadow-md active:scale-95 whitespace-nowrap cursor-pointer"
            >
              Find Opportunities
            </button>
          </div>
        </div>

        {/* Bottom Section: List and Wide Image */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* List Column - UPDATED: Reduced gap from gap-6 to gap-4 */}
          <div className="lg:col-span-5 flex flex-col gap-4 pt-4">
            {roles.map((role, index) => (
              <div key={index} className="flex items-center gap-4 group">
                <CheckCircle2 className="w-[22px] h-[22px] text-[#1B2C42] shrink-0 opacity-80" strokeWidth={1.5} />
                <span className="font-sans text-[#1B2C42] font-bold text-lg md:text-[19px] tracking-tight">
                  {role}
                </span>
              </div>
            ))}
          </div>

          {/* Wide Image Column (Span 7/12 for that wide look) */}
          <div className="lg:col-span-7 relative">
            <div className="rounded-[9px] overflow-hidden shadow-sm aspect-[16/10] lg:aspect-[1.6/1]">
              <img 
                src="/closed.png" 
                alt="Nurse with elderly patient" 
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-[1.02]"
              />
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default SpecializedStaffingList;