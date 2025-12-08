'use client';
import React from 'react';
import { CheckCircle2 } from 'lucide-react';

const CareerControl: React.FC = () => {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Left Content Card - Lavender */}
          <div className="bg-[#EFEDFA] rounded-xl p-8 md:p-14 flex flex-col justify-between min-h-[500px]">
            <div>
              <h2 className="font-serif text-4xl md:text-5xl text-[#1B2C42] mb-8 leading-tight">
                Take Control of Your Career with Prudent Resources
              </h2>
              
              <p className="text-gray-700 text-lg leading-relaxed mb-10">
                Our extensive network of organizations spans a variety of 
                healthcare settings. Registering with Prudent Resources as a 
                professional puts you in control of your career—you decide the 
                type of work, locations, and schedule that fit your life.
              </p>

              <div className="space-y-4 mb-12">
                {[
                  "Part-time or full-time opportunities",
                  "Days, evenings, or weekends",
                  "Short- or long-term placements"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle2 className="w-6 h-6 text-[#1B2C42] shrink-0" strokeWidth={1.5} />
                    <span className="text-[#1B2C42] font-semibold text-lg">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <h3 className="font-serif text-2xl md:text-3xl text-[#1B2C42] leading-tight">
              Greater Work Flexibility: Work on Your Terms
            </h3>
          </div>

          {/* Right Image Card */}
          <div className="rounded-xl overflow-hidden h-[500px] lg:h-auto">
            <img 
              src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80" 
              alt="Professionals shaking hands in a modern office hallway" 
              className="w-full h-full object-cover"
            />
          </div>

        </div>
      </div>
    </section>
  );
};

export default CareerControl;