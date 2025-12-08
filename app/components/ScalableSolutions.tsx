'use client';
import React from 'react';
import { ArrowRight } from 'lucide-react';

const ScalableSolutions: React.FC = () => {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Top Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-24">
          
          {/* Left Card - Dark Navy */}
          <div className="bg-[#1B2C42] rounded-xl p-10 md:p-14 flex flex-col justify-center min-h-[360px]">
            <h3 className="font-serif text-3xl md:text-4xl text-white mb-6 leading-tight">
              Scalable Staffing for Dynamic Business Needs
            </h3>
            <p className="text-gray-300 text-lg leading-relaxed">
              Whether you're growing, filling seasonal gaps, or managing short-term projects, 
              we scale your workforce up or down seamlessly—ensuring you always have the right 
              people at the right time.
            </p>
          </div>

          {/* Right Card - Light Blue/Gray */}
          <div className="bg-[#E9ECF5] rounded-xl p-10 md:p-14 flex flex-col justify-center min-h-[360px]">
            <h3 className="font-serif text-3xl md:text-4xl text-gray-900 mb-6 leading-tight">
              Dedicated Support for a Seamless Hiring Experience
            </h3>
            <p className="text-gray-700 text-lg leading-relaxed">
              From sourcing to onboarding, our team manages every step of the process with 
              clear communication and ongoing support, reducing your workload and ensuring 
              a smooth, stress-free hiring journey.
            </p>
          </div>

        </div>

        {/* Bottom CTA Section */}
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          <h2 className="font-serif text-4xl md:text-5xl text-gray-900 mb-8 leading-tight">
            Transform the Way You Work, Hire, and Deliver Care. Get in Touch!
          </h2>
          
          <p className="text-gray-600 text-lg leading-relaxed max-w-2xl mb-10">
            Whether you're building a career or building a team, our platform helps you access 
            the right opportunities and the right people. Contact us for easier, faster healthcare staffing.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <button className="bg-[#1B2C42] hover:bg-[#152233] text-white px-8 py-4 rounded-full text-base font-semibold flex items-center justify-center gap-2 transition-all">
              Find job opportunities <ArrowRight size={18} />
            </button>
            
            <button className="bg-[#68cfa3] hover:bg-[#5abf94] text-gray-900 px-8 py-4 rounded-full text-base font-semibold flex items-center justify-center gap-2 transition-all">
              Request for talents <ArrowRight size={18} />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};

export default ScalableSolutions;