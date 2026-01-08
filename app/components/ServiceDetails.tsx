'use client';
import React from 'react';
import { ArrowDown } from 'lucide-react';

const ServiceDetails: React.FC = () => {
  // Updated scroll function to target the specific component
  const scrollToNextSection = () => {
    // Scroll to the specialized-staffing section
    const specializedSection = document.getElementById('specialized-staffing');
    if (specializedSection) {
      specializedSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    } else {
      // Fallback: scroll down by viewport height
      window.scrollBy({ top: window.innerHeight, behavior: 'smooth' });
    }
  };

  return (
    <section className="flex flex-col bg-[#E3E8DE] lg:flex-row w-full">
      {/* Left Column: Text Content - CHANGED from justify-center to justify-start */}
      <div className="w-full lg:w-1/2  flex flex-col justify-start relative min-h-[600px] lg:min-h-[750px]">
        <div className="max-w-xl px-8 lg:pl-[72px] lg:pr-0 pt-12 lg:pt-16"> {/* Reduced top padding */}
          <p className="text-[#4a4a4a] text-base leading-[150%] mb-6">
            Backed by years of proven experience, we partner with healthcare organizations 
            to navigate staffing needs proactively while connecting skilled professionals 
            with rewarding opportunities across multiple specialties.
          </p>
          
          <h2 className="font-serif text-3xl md:text-4xl lg:text-[2.8rem] text-[#1a1a1a] mb-8 leading-[1.15]">
            Our medical staffing services include...
          </h2>
        </div>

        {/* Down Arrow - Moved up with the content */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 lg:left-24 lg:transform-none">
          <button 
            onClick={scrollToNextSection}
            className="animate-bounce cursor-pointer hover:scale-110 transition-transform"
            aria-label="Scroll to next section"
          >
            <ArrowDown className="w-6 h-6 text-gray-800" />
          </button>
        </div>
      </div>

      {/* Right Column: Image & Overlay Card */}
      <div className="w-full lg:w-1/2 relative min-h-[600px] lg:min-h-[750px] bg-gray-900 m-2 rounded-lg">
        {/* Main Background Image - Cover entire section without white background */}
        <div className="absolute inset-0 overflow-hidden">
          <img 
            src="/ladycare.png" 
            alt="Doctor examining patient" 
            className="w-full h-full object-cover object-center rounded-[6px]"
          />
        </div>
        
        {/* Floating Card Overlay - Moved more to the right */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 lg:bottom-12 lg:left-[4%] max-w-lg lg:max-w-2xl w-[90%] lg:w-[600px] z-10">
          <div className="bg-[#1B2C42] rounded-[6px] overflow-hidden shadow-2xl flex flex-col lg:flex-row h-auto lg:h-48 p-[13px]">
            
            {/* Image Section - Takes less space */}
            <div className="w-full lg:w-2/5 relative h-48 lg:h-auto">
              <img 
                src="/whitehair.png" 
                alt="Nurse smiling with patient" 
                className="absolute inset-0 w-full h-full object-cover rounded-lg"
              />
            </div>

            {/* Content Section - Better spacing */}
            <div className="w-full lg:w-3/5 p-6 lg:p-8 flex flex-col justify-center">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2 h-2 rounded-full bg-[#00e055]"></div>
                <span className="text-[10px] font-bold tracking-widest text-white/90 uppercase">
                  YOU CAN COUNT ON US
                </span>
              </div>
              
              <h3 className="font-serif text-2xl lg:text-3xl text-white leading-tight">
                We Guarantee 100% <br/> Compatibility
              </h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceDetails;