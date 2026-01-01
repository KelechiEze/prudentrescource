import React from 'react';
import ServiceHero from '../components/ServiceHero';
import ServiceTeamShowcase from '../components/ServiceTeamShowcase';
import ServiceDetails from '../components/ServiceDetails';
import SpecializedStaffingList from '../components/SpecializedStaffingList';
import CredentialAlignment from '../components/CredentialAlignment';
import ServicesCTA from '../components/ServicesCTA';

const ServicesPage: React.FC = () => {
  return (
    <div className="bg-white">
      <ServiceHero />
      <ServiceTeamShowcase />
      <ServiceDetails />
      <SpecializedStaffingList/>
      <CredentialAlignment/>
      <ServicesCTA />
    </div>
  );
};

export default ServicesPage;