
import React from 'react';
import AddictionHero from '../components/AddictionHero';
import AddictionProfessionals from '../components/AddictionProfessionals';
import AddictionOrganizations from '../components/AddictionOrganizations';
import BehavioralCTA from '../components/BehavioralCTA';
import SubmitCV from '../components/SubmitCV';
import ImageDivider from '../components/ImageDivider';

const AddictionPage: React.FC = () => {
  return (
    <div className="bg-white">
      <AddictionHero />
      {/* Image after the first section (Hero) */}
      <ImageDivider />
      <AddictionProfessionals />
      <AddictionOrganizations />
      <BehavioralCTA />
      <SubmitCV />
    </div>
  );
};

export default AddictionPage;
