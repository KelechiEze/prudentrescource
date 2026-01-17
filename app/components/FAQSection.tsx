'use client';
import React, { useState } from 'react';
import { HelpCircle, ArrowRight, Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface FAQItem {
  question: string;
  answer: string;
}

const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const router = useRouter();

  const faqs: FAQItem[] = [
    {
      question: "What types of healthcare roles can I find on the platform?",
      answer: "We connect professionals across diverse fields including Nursing (RN, LPN, CNA), Behavioral Health, Radiology, Phlebotomy, Case Management, and Direct Support. Our network spans hospitals, clinics, residential group homes, and specialized recovery centers."
    },
    {
      question: "Is there a cost to join as a healthcare professional?",
      answer: "No, joining Prudent Resources is completely free for healthcare professionals. We do not charge registration fees or take referral cuts from your pay. Our goal is to make your career growth as seamless and rewarding as possible."
    },
    {
      question: "How are job matches determined?",
      answer: "Unlike automated marketplaces, we use a curated matching process. Our expert administrators carefully review your credentials, experience, and personal career goals to match you with organizations where you'll truly thrive and make an impact."
    },
    {
      question: "Can I choose between full-time, part-time & contract roles?",
      answer: "Yes, flexibility is a core part of our service. You can choose from a variety of shift patterns including days, nights, and weekends, as well as different engagement types like permanent placements, short-term contracts, or seasonal support."
    },
    {
      question: "What documents do I need to provide?",
      answer: "To ensure 100% credential verification, we typically require an updated CV/Resume, valid professional licenses, relevant certifications (such as CPR, ACLS, or specialty-specific trainings), and proof of education."
    },
    {
      question: "Is my personal information secure?",
      answer: "Security and trust are at the heart of Prudent Resources. We use industry-standard encryption and secure data handling protocols to ensure your sensitive professional documents and personal details are protected at all times."
    },
    {
      question: "Who can I contact for support?",
      answer: "Our dedicated team is here to assist you. You can reach out directly via email at info@prudentresources.com or call us at +1 443 985 5388 during business hours. We pride ourselves on being responsive and helpful partners in your career."
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleContactClick = () => {
    router.push('/contact');
  };

  return (
    <section className="py-24 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
          
          {/* Left Column - Info */}
          <div className="lg:col-span-5">
            <div className="sticky top-40">
              <div className="flex items-center gap-3 mb-6">
                 <div className="w-3 h-3 rounded-full bg-[#68cfa3]"></div>
                 <span className="text-[11px] font-bold tracking-[0.25em] text-gray-900 uppercase font-sans">
                   HAVE QUESTIONS? WE'VE GOT ANSWERS
                 </span>
              </div>

              <h2 className="font-serif text-[42px] md:text-[52px] text-[#1B2C42] mb-8 leading-tight tracking-tight font-normal">
                Frequently Asked <br className="hidden md:block" /> Questions
              </h2>

              <p className="font-sans text-gray-600 text-lg leading-relaxed mb-12 max-w-md">
                Every successful hire begins with confidence. We've answered the key questions 
                to help healthcare teams and professionals connect with ease and clarity.
              </p>

              <div className="flex items-center gap-2 text-gray-800 font-semibold mb-6">
                <HelpCircle className="w-5 h-5 text-[#68cfa3]" />
                <span className="font-sans">Need further support?</span>
              </div>

              <button 
                onClick={handleContactClick}
                className="bg-[#1B2C42] hover:bg-[#2a4466] text-white px-10 py-4 rounded-full text-sm font-bold flex items-center gap-2 transition-all shadow-lg w-fit active:scale-95 cursor-pointer"
              >
                Contact us <ArrowRight size={18} />
              </button>
            </div>
          </div>

          {/* Right Column - Accordion */}
          <div className="lg:col-span-7">
            <div className="bg-[#EFF3F9] rounded-[6px] p-6 md:p-10 lg:p-12 shadow-sm border border-[#E1E7EE]">
              <div className="flex flex-col gap-2">
                {faqs.map((faq, index) => {
                  const isOpen = openIndex === index;
                  return (
                    <div 
                      key={index} 
                      className={`group border-b border-[#D1D9E4] last:border-0 transition-all duration-300 ${isOpen ? 'pb-6' : 'pb-0'}`}
                    >
                      <button 
                        onClick={() => toggleFAQ(index)}
                        className="w-full flex items-center justify-between gap-6 py-6 text-left focus:outline-none cursor-pointer"
                      >
                        <h3 className={`font-sans font-bold text-lg md:text-[19px] transition-colors duration-300 leading-tight ${isOpen ? 'text-[#1B2C42]' : 'text-[#1B2C42]/80 group-hover:text-[#1B2C42]'}`}>
                          {faq.question}
                        </h3>
                        <div className={`shrink-0 transition-all duration-300 ${isOpen ? 'text-[#1B2C42] rotate-45' : 'text-[#1B2C42] group-hover:text-[#1B2C42]'}`}>
                          <Plus size={18} strokeWidth={2.5} />
                        </div>
                      </button>

                      {/* Animated Answer Container */}
                      <div 
                        className={`overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.4, 0, 0.2, 1)] ${isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}
                      >
                        <div className="pr-12">
                          <p className="font-sans text-gray-600 text-[16px] md:text-[17px] leading-relaxed font-normal">
                            {faq.answer}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default FAQSection;