import React from 'react';

interface SpecializedFieldsProps {
  onNavigate?: (page: string) => void;
}

const SpecializedFields: React.FC<SpecializedFieldsProps> = ({ onNavigate }) => {
  return (
<<<<<<< HEAD
    <section className="bg-white px-2">
      {/* Immersive Header Section Recreation */}
      <div className="w-full relative min-h-[600px] md:h-[750px] overflow-hidden rounded-lg">
        {/* Background Image - High-fidelity choice matching the prompt's aesthetic */}
        <div className="absolute inset-0 z-0 ">
          <img 
            src="/transform.png" 
            alt="Compassionate care - elderly and professional"
            className="w-full h-full object-cover brightness-[0.85]"
          />
          {/* Subtle gradient overlays for text contrast */}
          <div className="absolute inset-0 bg-black/30 bg-gradient-to-b from-black/40 via-transparent to-black/60"></div>
        </div>

        {/* Content Layer */}
        <div className="relative z-10 w-full h-full max-w-full px-6 md:px-12 lg:px-20 py-[48px] md:py-[56px] flex flex-col justify-between min-h-[600px] md:h-full">
          
          {/* Top Alignment: Large Heading */}
          <div className="">
            <h2 className="font-serif text-[42px] md:text-[50px] lg:text-[50px] text-white leading-[130%] max-w-5xl tracking-tight font-normal">
              Transforming Staffing in <br className="hidden md:block" />
              Healthcare and Residential Care
            </h2>
=======
    <section className="bg-white">
      {/* Small space on left and right side */}
      <div className="px-2 md:px-2">
        {/* Immersive Header Section Recreation */}
        <div className="w-full relative min-h-[600px] md:h-[750px] overflow-hidden rounded-[6px]">
          {/* Background Image - High-fidelity choice matching the prompt's aesthetic */}
          <div className="absolute inset-0 z-0">
            <img 
              src="/transform.png" 
              alt="Compassionate care - elderly and professional"
              className="w-full h-full object-cover brightness-[0.85]"
            />
            {/* Removed gradient overlay */}
>>>>>>> 0dc7a05e0bbac19becb7c5dc3f13474bdf5bb789
          </div>

          {/* Content Layer */}
          <div className="relative z-10 w-full h-full max-w-full px-6 md:px-12 lg:px-20 py-[48px] md:py-[56px] flex flex-col justify-between min-h-[600px] md:h-full">
            
            {/* Top Alignment: Large Heading */}
            <div className="">
              <h2 className="font-serif text-[42px] md:text-[50px] lg:text-[50px] text-white leading-[130%] max-w-5xl tracking-tight font-normal">
                Transforming Staffing in <br className="hidden md:block" />
                Healthcare and Residential Care
              </h2>
            </div>

            {/* Bottom Alignment: Info & Action */}
            <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-12 mt-12">
              <div className="max-w-4xl">
                {/* Badge with Green Dot */}
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-4 h-4 rounded-full bg-[#00e055] shadow-[0_0_15px_rgba(0,224,85,0.6)]"></div>
                  <span className="text-[12px] md:text-[14px] font-bold tracking-[0.3em] text-white uppercase font-sans">
                    PRUDENT RESOURCES SERVICES
                  </span>
                </div>

                {/* Body Copy */}
                <p className="text-white text-xl md:text-[19px] leading-normal font-light opacity-95 max-w-4xl">
                  Each healthcare field needs more than experience—it needs specialized attention 
                  and a partner who truly understands its nuances. We're committed to providing 
                  personalized staffing solutions, creating valuable opportunities, and delivering 
                  exceptional results for our clients and the professionals we place.
                </p>
              </div>

              {/* Learn More Button - Reduced size with 50% border radius */}
              <div className="pb-2">
                <button 
                  onClick={() => onNavigate?.('services')}
                  className="bg-[#68cfa3] hover:bg-[#5abf94] text-gray-900 px-8 py-3 rounded-full text-[14px] font-semibold transition-all shadow-xl hover:shadow-teal-400/20 active:scale-95 whitespace-nowrap"
                >
                  Learn more
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SpecializedFields;