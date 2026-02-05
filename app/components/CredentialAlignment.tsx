'use client';
import React from "react";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

const CredentialAlignment: React.FC = () => {
  const router = useRouter();

  const handleContactButtonClick = () => {
    router.push('/contact');
  };

  return (
    <section className="bg-[#1B2C42] py-12 md:py-16 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-20">
        {/* Header Section */}
        <div className="mb-16">
          <h2 className="font-serif text-[42px] md:text-[56px] text-white leading-[1.1] mb-8 tracking-tight">
            Credential Assessment and Skills Alignment
          </h2>
          {/* UPDATED: Changed from text-lg to text-xl to match the other text */}
          <p className="text-white text-xl leading-[150%] font-light opacity-90 max-w-3xl">
            We invest time in thoroughly assessing
            and vetting professionals' skills, credentials, and experience to
            ensure the best possible fit — improving outcomes for both sides.
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
              <p className="text-white text-xl leading-relaxed font-light opacity-90">
                Detailed assessment of professionals skills,
                licenses and credentials for good fit.
              </p>
            </div>

            <div>
              <div className="group cursor-pointer mb-2">
                <span className="text-white text-lg font-semibold tracking-tight pb-3 border-b border-gray-500 block w-full group-hover:border-teal-400 transition-colors">
                  Explore transformative solutions
                </span>
              </div>

              <div className="flex items-center justify-between gap-4 mt-12 lg:mt-0">
                <span className="text-gray-200 text-xl font-light">
                  Contact us to get started now!
                </span>
                <button 
                  onClick={handleContactButtonClick}
                  className="w-14 h-14 bg-[#68cfa3] rounded-full flex items-center justify-center text-white hover:bg-[#5abf94] transition-all shadow-lg active:scale-95 group cursor-pointer"
                >
                  <ArrowRight
                    size={24}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </button>
              </div>
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