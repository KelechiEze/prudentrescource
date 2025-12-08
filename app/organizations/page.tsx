'use client';
import React from 'react';
import OrganizationsHero from '../components/OrganizationsHero';
import StaffingSolutions from '../components/StaffingSolutions';
import OrganizationProcess from '../components/OrganizationProcess';
import OrganizationTrust from '../components/OrganizationTrust';
import CostEffectiveSolutions from '../components/CostEffectiveSolutions';
import CredentialingStandards from '../components/CredentialingStandards';
import ExploreProfessionals from '../components/ExploreProfessionals';
import BookDemo from '../components/BookDemo';

const OrganizationsPage: React.FC = () => {
  return (
    <div className="bg-white">
      <OrganizationsHero />
      <StaffingSolutions />
      <OrganizationProcess />
      <OrganizationTrust />
      <CostEffectiveSolutions />
      <CredentialingStandards />
      <ExploreProfessionals />
      <BookDemo />
    </div>
  );
};

export default OrganizationsPage;
