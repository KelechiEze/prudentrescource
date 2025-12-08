'use client';
import React, { useRef } from 'react';
import CareerHero from '../components/CareerHero';
import AvailableJobs from '../components/AvailableJobs';
import TrustedPartner from '../components/TrustedPartner';
import CareerControl from '../components/CareerControl';
import CareerSupport from '../components/CareerSupport';
import FAQSection from '../components/FAQSection';
import SubmitCV from '../components/SubmitCV';

const CareerOpportunitiesPage: React.FC = () => {
  const jobsRef = useRef<HTMLDivElement>(null);

  const handleScrollToJobs = () => {
    jobsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="bg-white">
      <CareerHero onSearchClick={handleScrollToJobs} />
      <div ref={jobsRef}>
        <AvailableJobs />
      </div>
      <TrustedPartner />
      <CareerControl />
      <CareerSupport />
      <FAQSection />
      <SubmitCV />
    </div>
  );
};

export default CareerOpportunitiesPage;
