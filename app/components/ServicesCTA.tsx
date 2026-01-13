'use client';
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

const ServicesCTA: React.FC = () => {
  const router = useRouter();

  const handleBrowseJobsClick = () => {
    router.push('/career');
  };

  const handleSubmitStaffingRequestClick = () => {
    router.push('/staffrequest');
  };

  return (
    <section className="py-[72px] bg-white">
      {/* Removed max-width constraint and adjusted padding for closer edges */}
      <div className="px-4 sm:px-2">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {/* Left Card: Job Opportunity */}
          <div className="bg-[#EFF3F9] rounded-[6px] p-12 md:p-16 flex flex-col items-center text-center justify-center min-h-[400px]">
            <h3 className="font-serif text-3xl md:text-4xl text-[#1B2C42] mb-6 leading-tight">
              Find your Next Job Opportunity
            </h3>
            
            <p className="text-gray-700 text-lg leading-relaxed mb-10 max-w-md">
              Discover opportunities with companies that recognize your talents, 
              help you grow professionally, and ensure your work is truly rewarded.
            </p>
            
            <button 
              onClick={handleBrowseJobsClick}
              className="bg-[#68cfa3] hover:bg-[#5abf94] text-[#1B2C42] px-8 py-4 rounded-full text-sm font-bold flex items-center gap-2 transition-all shadow-sm cursor-pointer"
            >
              Browse job opportunities <ArrowRight size={18} />
            </button>
          </div>

          {/* Right Card: Staffing Solutions */}
          <div className="bg-[#68cfa3] rounded-[6px] p-12 md:p-16 flex flex-col items-center text-center justify-center min-h-[400px]">
            <h3 className="font-serif text-3xl md:text-4xl text-[#1B2C42] mb-6 leading-tight">
              Request Reliable Staffing Solutions
            </h3>
            
            <p className="text-[#1B2C42]/80 text-lg leading-relaxed mb-10 max-w-md font-medium">
              "Get the right people for the right roles with staffing solutions 
              you can count on—anytime you need them."
            </p>
            
            <button 
              onClick={handleSubmitStaffingRequestClick}
              className="bg-[#1B2C42] hover:bg-[#2a4466] text-white px-8 py-4 rounded-full text-sm font-bold flex items-center gap-2 transition-all shadow-lg cursor-pointer"
            >
              Submit Staffing Request <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesCTA;