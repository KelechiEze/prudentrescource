'use client';
import React from 'react';
import ServiceHero from '../components/ServiceHero';
import ServiceTeamShowcase from '../components/ServiceTeamShowcase';
import ServiceDetails from '../components/ServiceDetails';
import BehavioralHealthSection from '../components/BehavioralHealthSection';
import ResidentialGroupHomesSection from '../components/ResidentialGroupHomesSection';
import AddictionSubstanceAbuseSection from '../components/AddictionSubstanceAbuseSection';
import ServicesCTA from '../components/ServicesCTA';

const ServicesPage: React.FC = () => {
  return (
    <div className="bg-white">
      <ServiceHero />
      <ServiceTeamShowcase />
      <ServiceDetails />
      <BehavioralHealthSection />
      <ResidentialGroupHomesSection />
      <AddictionSubstanceAbuseSection />
      <ServicesCTA />
    </div>
  );
};

export default ServicesPage;