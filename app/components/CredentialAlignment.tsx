
import React from 'react';
import { ArrowRight } from 'lucide-react';

const CredentialAlignment: React.FC = () => {
  return (
    <section className="bg-[#1B2C42] py-24 md:py-32 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-20">
        
        {/* Header Section */}
        <div className="max-w-4xl mb-20">
          <h2 className="font-serif text-[42px] md:text-[56px] text-white leading-[1.1] mb-8 tracking-tight">
            Credential Assessment and Skills Alignment
          </h2>
          <p className="text-gray-300 text-lg md:text-[19px] leading-relaxed font-light opacity-90 max-w-3xl">
            Before making any matches, we invest time in thoroughly assessing and vetting professionals’ skills, 
            credentials, and experience to ensure the best possible fit — improving outcomes for both sides.
          </p>
        </div>

        {/* Content Section: 3-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          {/* Left Side: Large Landscape Image */}
          <div className="lg:col-span-5 h-[350px] md:h-[400px] lg:h-auto rounded-[12px] overflow-hidden">
            <img 
              src="/hands.png" 
              alt="Medical professional reviewing credentials on tablet" 
              className="w-full h-full object-cover"
            />
          </div>

          {/* Middle: Content Block */}
          <div className="lg:col-span-4 flex flex-col justify-between py-2">
            <div className="space-y-12">
              <p className="text-gray-200 text-xl leading-relaxed font-light opacity-90">
                We start with a detailed assessment of professionals skills, licenses and credentials for good fit.
              </p>

              <div className="group cursor-pointer">
                <span className="text-white text-lg font-semibold tracking-tight pb-3 border-b border-gray-500 block w-full group-hover:border-teal-400 transition-colors">
                  Explore transformative solutions
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between gap-4 mt-12 lg:mt-0">
              <span className="text-gray-200 text-xl font-light">Contact us to get started now!</span>
              <button className="w-14 h-14 bg-[#68cfa3] rounded-full flex items-center justify-center text-[#1B2C42] hover:bg-[#5abf94] transition-all shadow-lg active:scale-95 group">
                <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Right Side: Portrait Image */}
          <div className="lg:col-span-3 h-[450px] lg:h-auto rounded-[12px] overflow-hidden">
            <img 
              src="/shawty.png" 
              alt="Healthcare professional with elderly patient" 
              className="w-full h-full object-cover"
            />
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default CredentialAlignment;