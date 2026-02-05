'use client';
import React from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

const CareerSupport: React.FC = () => {
  const router = useRouter();

  const handleContactClick = () => {
    router.push('/contact');
  };

  return (
    <section className="bg-white">
      <div className="mx-auto px-2">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          
          {/* Column 1: Image */}
          <div className="h-[500px] lg:h-auto rounded-xl overflow-hidden">
            <img 
              src="/nurse.png" 
              alt="Nurse with clipboard smiling" 
              className="w-full h-full object-cover"
            />
          </div>

          {/* Column 2: Text Content */}
          <div className="flex flex-col justify-between py-4 lg:px-4">
            <div>
              <p className="text-gray-600 text-lg leading-relaxed mb-10">
                We work with you to create a professional profile that highlights your experience, 
                education, training, and career preferences. We also match your skills and interests 
                with opportunities that align with your goals.
              </p>
              
              <h2 className="font-serif text-3xl md:text-4xl text-[#1B2C42] leading-tight mb-8">
                Your Career, Supported by Our Team
              </h2>
            </div>
            
            <div>
              <div className="border-t border-gray-200 w-full mb-6"></div>
              <button 
                onClick={handleContactClick}
                className="group flex items-center gap-2 text-[#1B2C42] font-semibold text-lg transition-all hover:text-teal-600 cursor-pointer"
              >
                Contact us for career support 
                <ArrowRight size={20} className="transition-transform group-hover:translate-x-2" />
              </button>
            </div>
          </div>

          {/* Column 3: Benefits Card */}
          <div className="bg-[#E3E8DE] rounded-xl p-8 md:p-12 flex flex-col justify-center min-h-[500px] lg:min-h-auto">
            <h3 className="font-serif text-3xl text-[#1B2C42] mb-6 leading-tight">
              Enjoy the Benefits of Choosing Prudent Resources
            </h3>
            
            <p className="text-gray-700 text-lg leading-relaxed mb-14">
              Our focus is on continually improving how we match professionals with roles 
              that help them grow and succeed.
            </p>
            
            <ul className="space-y-2">
              {[
                "No commitment to register",
                "No referral fees",
                "Unlimited work flexibility"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3">
                  <CheckCircle2 className="w-6 h-6 text-[#1B2C42] shrink-0" strokeWidth={1.5} />
                  <span className="text-[#1B2C42] font-semibold text-lg">{item}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>
    </section>
  );
};

export default CareerSupport;