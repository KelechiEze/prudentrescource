
import React from 'react';
import ResidentialHero from '../components/ResidentialHero';
import ResidentialProfessionals from '../components/ResidentialProfessionals';
import ResidentialOrganizations from '../components/ResidentialOrganizations';
import BehavioralCTA from '../components/BehavioralCTA';
import SubmitCV from '../components/SubmitCV';
import ImageDivider from '../components/ImageDivider';

const ResidentialPage: React.FC = () => {
  return (
    <div className="bg-white">
      <ResidentialHero />
      <ResidentialProfessionals />
      {/* Image after first two sections */}
      <ImageDivider />
      <ResidentialOrganizations />
      <BehavioralCTA />
      <SubmitCV />
    </div>
  );
};

export default ResidentialPage;
