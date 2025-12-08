'use client';
import React from 'react';
import { HelpCircle, ArrowRight, Plus } from 'lucide-react';

const FAQSection: React.FC = () => {
  const faqs = [
    "What types of healthcare roles can I find on the platform?",
    "Is there a cost to join as a healthcare professional?",
    "How are job matches determined?",
    "Can I choose between full-time, part-time & contract roles?",
    "What documents do I need to provide?",
    "Is my personal information secure?",
    "Who can I contact for support?"
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
          
          {/* Left Column */}
          <div className="lg:col-span-5 pt-8">
            <div className="flex items-center gap-3 mb-6">
               <div className="w-3 h-3 rounded-full bg-[#68cfa3]"></div>
               <span className="text-xs font-bold tracking-widest text-gray-900 uppercase">
                 HAVE QUESTIONS? WE'VE GOT ANSWERS
               </span>
            </div>

            <h2 className="font-serif text-4xl md:text-5xl text-[#1B2C42] mb-8 leading-tight">
              Frequently Asked <br /> Questions
            </h2>

            <p className="text-gray-600 text-lg leading-relaxed mb-12">
              Every successful hire begins with confidence. We've answered the key questions 
              to help healthcare teams and professionals connect with ease.
            </p>

            <div className="flex items-center gap-2 text-gray-700 font-medium mb-6">
              <HelpCircle className="w-5 h-5 text-gray-500" />
              <span>Need further support?</span>
            </div>

            <button className="bg-[#1B2C42] hover:bg-[#2a4466] text-white px-8 py-3 rounded-full text-sm font-semibold flex items-center gap-2 transition-all shadow-lg w-fit">
              Contact us <ArrowRight size={18} />
            </button>
          </div>

          {/* Right Column - FAQ List */}
          <div className="lg:col-span-7 bg-[#EFF3F9] rounded-xl p-8 md:p-12">
            <div className="flex flex-col">
              {faqs.map((question, index) => (
                <div 
                  key={index} 
                  className={`flex items-center justify-between gap-4 py-6 border-gray-300 cursor-pointer group ${
                    index !== faqs.length - 1 ? 'border-b' : ''
                  } ${index === 0 ? 'pt-0' : ''}`}
                >
                  <h3 className="text-[#1B2C42] font-semibold text-lg group-hover:text-[#1B2C42]/80 transition-colors">
                    {question}
                  </h3>
                  <Plus className="text-[#1B2C42] w-5 h-5 shrink-0 transition-transform group-hover:rotate-90 opacity-60" />
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default FAQSection;