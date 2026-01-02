'use client';

import React, { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import AdminHeader from '../components/AdminHeader';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();
  
  // Extract current page from pathname
  const getCurrentPage = () => {
    if (pathname.includes('/admin/professionals')) return 'admin-dashboard';
    if (pathname.includes('/admin/joblistings')) return 'admin-jobs';
    if (pathname.includes('/admin/organizations')) return 'admin-organizations';
    if (pathname.includes('/admin/staffingrequests')) return 'admin-requests';
    return 'admin-dashboard'; // Default to dashboard
  };

  const handleNavigation = (page: string) => {
    switch (page) {
      case 'admin-dashboard':
        router.push('/admin/professionals');
        break;
      case 'admin-jobs':
        router.push('/admin/joblistings');
        break;
      case 'admin-organizations':
        router.push('/admin/organizations');
        break;
      case 'admin-requests':
        router.push('/admin/staffingrequests');
        break;
      default:
        router.push('/admin');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('admin-authenticated');
    router.push('/login');
  };

  return (
    <div className="min-h-screen bg-white font-sans text-[#1B2C42]">
      <AdminHeader 
        currentPage={getCurrentPage()}
        onNavigate={handleNavigation}
        onLogout={handleLogout}
      />
      {children}
    </div>
  );
};

export default AdminLayout;