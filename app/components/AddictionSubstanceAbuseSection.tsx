'use client';
import React from 'react';

const AddictionSubstanceAbuseSection: React.FC = () => {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row justify-between items-start mb-16 gap-8">
          <div className="max-w-3xl">
            <h2 className="font-serif text-4xl md:text-5xl text-[#1B2C42] mb-6">
              Addictions and Substance Abuse
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              We help treatment organizations focused on substance use, chemical 
              dependency, and addiction maintain high-quality care by connecting them with 
              clinicians and direct-care staff skilled in assessment, counseling, crisis 
              intervention, case coordination, and peer support.
            </p>
          </div>
          
          <button className="bg-[#1B2C42] hover:bg-[#2a4466] text-white px-8 py-3 rounded-full text-sm font-semibold transition-colors shadow-lg shrink-0 mt-2">
            Learn more
          </button>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-auto lg:h-[500px]">
          
          {/* Left Image */}
          <div className="rounded-xl overflow-hidden h-[400px] lg:h-full relative group">
            <img 
              src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
              alt="Medical professional in scrubs" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>

          {/* Center Card - Lavender */}
          <div className="bg-[#E9E6F5] rounded-xl p-8 lg:p-10 flex flex-col justify-end h-[400px] lg:h-full transition-colors hover:bg-[#dedbf0]">
            <p className="text-[#1B2C42] text-xl leading-relaxed font-medium opacity-90">
              We start with a detailed assessment of your recruitment needs and organizational goals
            </p>
          </div>

          {/* Right Image */}
          <div className="rounded-xl overflow-hidden h-[400px] lg:h-full relative group">
            <img 
              src="https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
              alt="Caregiver assisting patient with back pain" 
              className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
            />
          </div>

        </div>

      </div>
    </section>
  );
};

export default AddictionSubstanceAbuseSection;