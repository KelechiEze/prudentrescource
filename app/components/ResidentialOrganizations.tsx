'use client';
import React from 'react';
import { CheckCircle2, ArrowRight } from 'lucide-react';

const ResidentialOrganizations: React.FC = () => {
  const leftColumn = [
    "Adult Group Homes",
    "Children's Residential Facilities",
    "Transitional Living Programs",
    "Assisted Living Facilities",
    "Community Living Arrangements",
    "Supported Living Providers"
  ];

  const rightColumn = [
    "Intermediate Care Facilities",
    "Respite Care Centers",
    "Disability Support Organizations",
    "Mental Health Residential Programs",
    "Foster Care Agencies",
    "Rehabilitation Centers"
  ];

  return (
    <section className="py-24 bg-[#EFF3F9]">
      <div className="max-w-7xl mx-auto px-6">
        
        <h2 className="font-serif text-4xl md:text-5xl text-[#1B2C42] mb-16 max-w-4xl leading-tight">
          The residential organizations <br />
          we serve include:
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4 mb-16">
          <div className="flex flex-col gap-5">
            {leftColumn.map((item, i) => (
              <div key={i} className="flex items-start gap-4">
                <CheckCircle2 className="w-6 h-6 text-[#1B2C42] shrink-0 mt-0.5" strokeWidth={1.5} />
                <span className="text-[#1B2C42] font-semibold text-lg">{item}</span>
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-5">
             {rightColumn.map((item, i) => (
              <div key={i} className="flex items-start gap-4">
                <CheckCircle2 className="w-6 h-6 text-[#1B2C42] shrink-0 mt-0.5" strokeWidth={1.5} />
                <span className="text-[#1B2C42] font-semibold text-lg">{item}</span>
              </div>
            ))}
          </div>
        </div>

        <button className="bg-[#68cfa3] hover:bg-[#5abf94] text-[#1B2C42] px-8 py-4 rounded-full text-sm font-semibold flex items-center gap-2 transition-all shadow-lg shadow-teal-900/10">
          Request for talents <ArrowRight size={18} />
        </button>

      </div>
    </section>
  );
};

export default ResidentialOrganizations;
