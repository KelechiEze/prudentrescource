'use client';
import React from 'react';
import { Home, Heart } from 'lucide-react';

const ResidentialGroupHomesSection: React.FC = () => {
  return (
    <section className="bg-[#1B2C42] py-24 relative overflow-visible">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* Left Column: Text Content */}
          <div>
            <h2 className="font-serif text-5xl md:text-6xl text-white mb-8 leading-[1.1]">
              Residential <br />
              Group Homes
            </h2>
            
            <p className="text-gray-300 text-lg leading-relaxed mb-12 opacity-90 max-w-lg">
              Linking professionals that clients need to deliver the support services 
              that allow children and adults in a residential setting to achieve their 
              optimal lifestyle.
            </p>

            <button className="bg-[#68cfa3] hover:bg-[#5abf94] text-[#1B2C42] px-8 py-3 rounded-full text-sm font-bold transition-all shadow-lg shadow-teal-900/20">
              Learn more
            </button>
          </div>

          {/* Right Column: Image & Overlay Cards */}
          <div className="relative mt-12 lg:mt-0">
            {/* Main Image */}
            <div className="rounded-xl overflow-hidden relative z-0 h-[500px] md:h-[600px] w-full">
              <img 
                src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                alt="Nurse smiling at elderly patient" 
                className="w-full h-full object-cover"
              />
            </div>

            {/* Overlay Cards Container */}
            {/* Positioned absolutely at the bottom, overlapping the image */}
            <div className="absolute -bottom-24 lg:-bottom-16 left-4 right-4 lg:-left-20 lg:right-auto flex flex-col md:flex-row gap-4 lg:w-[120%] z-10">
              
              {/* Card 1: White */}
              <div className="bg-white rounded-lg p-6 shadow-xl flex-1 flex flex-col justify-between min-h-[180px]">
                <div className="mb-4">
                  <div className="w-10 h-10 rounded-full bg-teal-50 flex items-center justify-center">
                    <Home className="text-[#68cfa3] w-6 h-6" strokeWidth={1.5} />
                  </div>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Professionals who can help individuals in group homes overcome obstacles, and accomplish their goals.
                </p>
              </div>

              {/* Card 2: Sage/Beige */}
              <div className="bg-[#E3E8DE] rounded-lg p-6 shadow-xl flex-1 flex flex-col justify-between min-h-[180px]">
                 <div className="mb-4">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center">
                    <Heart className="text-orange-400 w-6 h-6" strokeWidth={1.5} />
                  </div>
                </div>
                <div>
                   <div className="w-full border-t border-gray-300/50 mb-3"></div>
                   <p className="text-gray-700 text-sm leading-relaxed">
                     Everyone in group homes should have the chance to live the best life they can.
                   </p>
                </div>
              </div>

            </div>
          </div>

        </div>
        
        {/* Spacer for the bottom overlapping cards on mobile/desktop */}
        <div className="h-32 lg:h-16 hidden md:block"></div>
      </div>
    </section>
  );
};

export default ResidentialGroupHomesSection;