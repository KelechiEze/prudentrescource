'use client';
import React from 'react';
import { ClipboardList, UserCheck, Clock } from 'lucide-react';

const OrganizationProcess: React.FC = () => {
  return (
    <section className="mx-2 relative w-full py-24 bg-gray-900 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/cuteshe.png" 
          alt="Medical professional smiling" 
          className="w-full h-full object-cover object-[center_30%]"
        />
        {/* Overlay to ensure text legibility */}
        <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px]"></div>
        {/* Gradient specifically for the left text area */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 h-full">
        
        {/* Top Right Label */}
        <div className="absolute top-0 right-6 md:right-12 lg:right-6">
           <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-[#68cfa3]"></div>
              <span className="text-xs font-bold tracking-widest text-white uppercase shadow-black/50 drop-shadow-md">
                HOW WE WORK WITH YOU
              </span>
           </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-16 lg:gap-8 items-end lg:items-end min-h-[600px] pb-12">
          
          {/* Left Column: Process Cards */}
          <div className="w-full lg:w-5/12 flex flex-col gap-4">
            
            {/* Card 1 */}
            <div className="bg-black/40 backdrop-blur-md rounded-xl p-6 md:p-8 border border-white/10 transition-transform hover:-translate-y-1">
              <div className="flex gap-5">
                <div className="shrink-0 mt-1">
                  <div className="w-10 h-10 rounded bg-[#ffbca0] flex items-center justify-center">
                    <ClipboardList className="text-[#1B2C42] w-5 h-5" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl md:text-2xl font-serif text-white mb-3">
                    Share Your Staffing Needs with Prudent Resources
                  </h3>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    Tell us the roles you are hiring for, experience levels, schedule, and certifications required.
                  </p>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-black/40 backdrop-blur-md rounded-xl p-6 md:p-8 border border-white/10 transition-transform hover:-translate-y-1">
              <div className="flex gap-5">
                <div className="shrink-0 mt-1">
                  <div className="w-10 h-10 rounded bg-[#bdd8fa] flex items-center justify-center">
                    <UserCheck className="text-[#1B2C42] w-5 h-5" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl md:text-2xl font-serif text-white mb-3">
                    We Match You With Qualified Candidates
                  </h3>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    We screen, credential, and curate professionals who align with your team and clinical environment.
                  </p>
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-black/40 backdrop-blur-md rounded-xl p-6 md:p-8 border border-white/10 transition-transform hover:-translate-y-1">
              <div className="flex gap-5">
                <div className="shrink-0 mt-1">
                  <div className="w-10 h-10 rounded bg-[#e5a5e3] flex items-center justify-center">
                    <Clock className="text-[#1B2C42] w-5 h-5" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl md:text-2xl font-serif text-white mb-3">
                    You Review best match and Select
                  </h3>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    Approve the professionals that best fit your organizations vision and goals—no risk, no obligation.
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Heading text (positioned at bottom right) */}
          <div className="w-full lg:w-7/12 flex justify-end items-end text-right">
             <h2 className="text-3xl md:text-4xl lg:text-4xl font-serif text-white leading-tight max-w-2xl drop-shadow-lg">
               Our process of solving your staffing needs is simplified for you
             </h2>
          </div>

        </div>

      </div>
    </section>
  );
};

export default OrganizationProcess;
