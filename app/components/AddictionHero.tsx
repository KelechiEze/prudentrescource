'use client';
import React from 'react';

const AddictionHero: React.FC = () => {
  return (
    <section className="bg-white pt-40 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        
        <div className="max-w-5xl">
          {/* Heading */}
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-[#1a1a1a] mb-8 leading-[1.15]">
            <span className="text-gray-400">Addictions & Substance Abuse:</span> High-Quality Care through Skilled Staffing
          </h1>

          {/* Description */}
          <p className="text-gray-600 text-lg md:text-xl leading-relaxed max-w-4xl">
            We help treatment organizations focused on substance use, chemical dependency, and addiction 
            maintain high-quality care by connecting them with clinicians and direct-care staff skilled 
            in assessment, counseling, crisis intervention, case coordination, and peer support.
          </p>
        </div>

      </div>
    </section>
  );
};

export default AddictionHero;
