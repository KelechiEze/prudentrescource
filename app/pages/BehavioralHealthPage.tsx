
import React from 'react';
import BehavioralHero from '../components/BehavioralHero';
import BehavioralProfessionals from '../components/BehavioralProfessionals';
import BehavioralOrganizations from '../components/BehavioralOrganizations';
import BehavioralCTA from '../components/BehavioralCTA';
import SubmitCV from '../components/SubmitCV';

const BehavioralHealthPage: React.FC = () => {
  return (
    <div className="bg-white">
      <BehavioralHero />
      <BehavioralProfessionals />
      <BehavioralOrganizations />
      <BehavioralCTA />
      <SubmitCV />
    </div>
  );
};

export default BehavioralHealthPage;
