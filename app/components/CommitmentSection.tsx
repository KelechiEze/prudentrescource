'use client';
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

const CommitmentSection: React.FC = () => {
  const router = useRouter();

  const handleStaffRequestClick = () => {
    router.push('/staffrequest');
  };

  const handleResumeClick = () => {
    router.push('/submitresume');
  };

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        
        <h2 
          className="text-3xl md:text-4xl lg:text-5xl leading-tight md:leading-snug mb-16 max-w-6xl pr-4 md:pr-8 lg:pr-12"
          style={{ fontFamily: "var(--font-hedvig-letters-serif)" }}
        >
          <span className="text-gray-400">We are committed to providing trusted workforce solutions</span>
          <span className="text-gray-900"> — matching skilled professionals with the places that need them most.</span>
        </h2>
        
        {/* Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Card 1: For Professionals */}
          <div className="relative group overflow-hidden rounded-lg min-h-[700px] bg-blue-50">
            {/* Background Image Layer */}
            <div className="absolute inset-0 z-0">
               <img 
                 src="/greenpeeps.png" 
                 alt="Nurse checking patient blood pressure"
                 className="w-full h-full object-cover object-center opacity-90 transition-transform duration-700 group-hover:scale-105"
               />
               {/* Gradient overlay to ensure text readability at the top if image is dark */}
               <div className="absolute inset-0 bg-gradient-to-b from-blue-50/90 via-blue-50/20 to-transparent h-1/2"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 p-8 md:p-12 h-full flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-3 h-3 rounded-full bg-orange-400"></div>
                  <span className="text-xs font-bold tracking-widest text-gray-800 uppercase">Advance Your Healthcare Career</span>
                </div>
                
                <h3 className="text-4xl md:text-5xl font-serif text-gray-900 mb-6">For Professionals</h3>
                
                <p className="text-gray-700 text-base leading-relaxed max-w-md">
                  Advance your career on your terms. Access premium shifts and contracts at top facilities. We handle the vetting so you can focus on care.
                </p>
              </div>

              <div>
                <button 
                  onClick={handleResumeClick}
                  className="bg-[#68cfa3] hover:bg-[#5abf94] text-gray-900 px-8 py-4 rounded-full text-sm font-semibold flex items-center gap-2 transition-all shadow-lg shadow-teal-900/10 w-fit mt-12 cursor-pointer"
                >
                  Submit your Resume/CV <ArrowRight size={18} />
                </button>
              </div>
            </div>
          </div>

          {/* Card 2: For Organizations */}
          <div className="relative overflow-hidden rounded-lg min-h-[650px] bg-[#E3E8DE]">
            <div className="relative z-10 p-8 md:p-12 h-full flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                  <span className="text-xs font-bold tracking-widest text-gray-800 uppercase">Reliable Staffing When You Need It Most</span>
                </div>
                
                <h3 className="text-4xl md:text-5xl font-serif text-gray-900 mb-6">For Organizations</h3>
                
                <p className="text-gray-700 text-lg leading-relaxed max-w-md">
                  Partner with us to connect with vetted professionals who align with your goals and staffing needs. Reduce hiring stress with reliable, curated matches.
                </p>
              </div>

              <div>
                <button 
                  onClick={handleStaffRequestClick}
                  className="bg-[#1f2937] hover:bg-gray-800 text-white px-8 py-4 rounded-full text-sm font-semibold flex items-center gap-2 transition-all w-fit mt-12 cursor-pointer"
                >
                  Submit Staffing Request <ArrowRight size={18} />
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default CommitmentSection;