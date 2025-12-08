'use client';
import React from 'react';
import { CheckCircle2, ArrowRight } from 'lucide-react';

const BehavioralOrganizations: React.FC = () => {
  const leftColumn = [
    "City Government Agencies",
    "Community Based Outpatient Programs",
    "Community MH/MR Facilities",
    "Community Services' Boards",
    "County Government Agencies",
    "Crisis Centers",
    "Federal Government Agencies",
    "Foster Care Organizations",
    "Mobile Response Agencies",
    "Nursing Homes",
    "Psychiatric Hospitals",
    "Residential Facilities (Group, Transitional, etc.)",
    "Residential Treatment Facilities"
  ];

  const rightColumn = [
    "Hospitals and Clinics",
    "Inpatient and Partial Hospital Programs",
    "Intermediate Care Facilities",
    "Intermediate Units / Education Consortiums",
    "Long Term Care Facilities",
    "Managed Care Organizations",
    "Mental Health Outpatient Centers/Clinics",
    "Military Bases",
    "State Government Agencies",
    "Veterans' Administration Medical Centers",
    "Transit Authorities",
    "Youth/Adolescent Social Service Programs",
    "Care Management Services"
  ];

  return (
    <section className="py-24 bg-[#EFF3F9]">
      <div className="max-w-7xl mx-auto px-6">
        
        <h2 className="font-serif text-4xl md:text-5xl text-[#1B2C42] mb-16 max-w-4xl leading-tight">
          The behavioral healthcare <br />
          organizations we serve include:
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

export default BehavioralOrganizations;
