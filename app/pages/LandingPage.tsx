
import React from 'react';
import Hero from '../components/Hero';
import CommitmentSection from '../components/CommitmentSection';
import SpecializedFields from '../components/SpecializedFields';
import PartnerAdvantage from '../components/PartnerAdvantage';
import ScalableSolutions from '../components/ScalableSolutions';

interface LandingPageProps {
  onNavigate: (page: string) => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onNavigate }) => {
  return (
    <>
      <Hero onSearch={() => {
        onNavigate('career');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }} />
      <CommitmentSection />
      <SpecializedFields onNavigate={onNavigate} />
      <PartnerAdvantage />
      <ScalableSolutions />
    </>
  );
};

export default LandingPage;
