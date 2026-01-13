'use client';
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

const ScalableSolutions: React.FC = () => {
  const router = useRouter();

  const handleFindJobsClick = () => {
    router.push('/jobsearch');
  };

  const handleRequestTalentsClick = () => {
    router.push('/staffrequest');
  };

  return (
    <section className="pt-2 pb-[58px] bg-white">
      {/* Removed max-width constraint and reduced padding for closer edges */}
      <div className="px-2 sm:px-4 lg:px-2">
        
        {/* Top Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-[6fr_7fr] gap-2 mb-[72px]">
          
          {/* Left Card - Dark Navy */}
          <div className="bg-[#1B2C42] rounded-[6px] p-10 md:p-14 flex flex-col justify-center min-h-[360px]">
            <h3 className="font-serif text-3xl md:text-4xl text-white mb-6 leading-[140%]">
              Scalable Staffing for Dynamic Business Needs
            </h3>
            <p className="text-gray-300 text-lg leading-[150%] mt-15">
              Whether you're growing, filling seasonal gaps, or managing short-term projects, 
              we scale your workforce up or down seamlessly—ensuring you always have the right 
              people at the right time.
            </p>
          </div>

          {/* Right Card - Light Blue/Gray */}
          <div className="bg-[#E9ECF5] rounded-[6px] p-10 md:p-14 flex flex-col justify-center min-h-[360px]">
            <h3 className="font-serif text-3xl md:text-4xl text-black mb-6 leading-[140%]">
              Dedicated Support for a Seamless Hiring Experience
            </h3>
            <p className="text-gray-700 text-lg leading-relaxed mt-15">
              From sourcing to onboarding, our team manages every step of the process with 
              clear communication and ongoing support, reducing your workload and ensuring 
              a smooth, stress-free hiring journey.
            </p>
          </div>

        </div>

        {/* Bottom CTA Section */}
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          <h2 className="font-serif text-4xl md:text-5xl text-gray-900 mb-[24px] leading-[130%]">
            Transform the Way You Work, Hire, and Deliver Care. Get in Touch!
          </h2>
          
          <p className="text-gray-600 text-lg leading-[150%] max-w-2xl mb-[40px] mt-10">
            Whether you're building a career or building a team, our platform helps you access 
            the right opportunities and the right people. Contact us for easier, faster healthcare staffing.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <button 
              onClick={handleFindJobsClick}
              className="bg-[#1B2C42] hover:bg-[#152233] text-white px-8 p-4 rounded-full text-base font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              Find job opportunities <ArrowRight size={18} />
            </button>
            
            <button 
              onClick={handleRequestTalentsClick}
              className="bg-[#68cfa3] hover:bg-[#5abf94] text-gray-900 px-8 py-4 rounded-full text-base font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              Request for talents <ArrowRight size={18} />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};

export default ScalableSolutions;