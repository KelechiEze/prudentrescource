'use client';
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

const BookDemo: React.FC = () => {
  const router = useRouter();

  const handleContactClick = () => {
    router.push('/contact');
  };

  return (
    <section className="py-[72px] bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          
          <h2 className="font-serif text-5xl text-[#1B2C42] mb-8 leading-tight">
            Contact us to learn more <br/> about our staffing solution
          </h2>
          
          <p className="text-gray-600 text-lg leading-relaxed mb-10 max-w-3xl">
            Reach out to Prudent Resources team to learn how we identify top-tier talent, help your new team members hit the ground running from day one, and provide clear insight into our pricing, timelines, and collaborative process.
          </p>
          
          <button 
            onClick={handleContactClick}
            className="bg-[#68cfa3] hover:bg-[#5abf94] text-[#1B2C42] px-8 py-4 rounded-full text-sm font-semibold flex items-center gap-2 transition-all shadow-lg shadow-teal-900/10 cursor-pointer"
          >
            Get in touch with us now <ArrowRight size={18} />
          </button>

        </div>
      </div>
    </section>
  );
};

export default BookDemo;