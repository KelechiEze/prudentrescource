'use client';
import { useRouter } from 'next/navigation';
import React from 'react';
import Hero from './components/Hero';
import CommitmentSection from './components/CommitmentSection';
import SpecializedFields from './components/SpecializedFields';
import PartnerAdvantage from './components/PartnerAdvantage';
import ScalableSolutions from './components/ScalableSolutions';

const LandingPage: React.FC = () => {
  const router = useRouter();

  const handleNavigate = (page: string) => {
    const route = page === 'home' ? '/' : `/${page}`;
    router.push(route);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <Hero onSearch={() => handleNavigate('career')} />
      <CommitmentSection />
      <SpecializedFields onNavigate={handleNavigate} />
      <PartnerAdvantage />
      <ScalableSolutions />
    </>
  );
};

export default LandingPage;