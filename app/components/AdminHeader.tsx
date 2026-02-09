'use client';

import React, { useState, useEffect } from 'react';
import { Bell } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

interface AdminHeaderProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  onLogout: () => void;
}

const AdminHeader: React.FC<AdminHeaderProps> = ({ currentPage, onNavigate, onLogout }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  
  const navItems = [
    { label: "Job Listings", id: "admin-jobs" },
    { label: "Professionals Directory", id: "admin-dashboard" },
    { label: "Organizations Directory", id: "admin-organizations" },
    { label: "Staffing Requests", id: "admin-requests" }
  ];

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Determine which logo to show
  const getLogoImage = () => {
    // In admin dashboard, always use dark logo (since background is white)
    return '/logodark.png';
  };

  const logoImage = getLogoImage();

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    // Navigate to home page (login page)
    window.location.href = '/';
  };

  // Determine text colors - always use dark text in admin
  const linkBaseClass = 'text-[#1B2C42] hover:text-[#68cfa3] cursor-pointer';

  return (
    <header className={`h-20 border-b border-gray-100 px-8 flex items-center justify-between bg-white sticky top-0 z-50 shadow-sm transition-all duration-300 ${
      isScrolled ? 'bg-white/95 backdrop-blur-md' : 'bg-white'
    }`}>
      {/* Logo with Image - Even larger size without affecting header height */}
      <Link 
        href="/" 
        className="flex items-center cursor-pointer"
        onClick={handleLogoClick}
      >
        <div className="relative flex items-center justify-center">
          <Image
            src={logoImage}
            alt="Prudent Resources Logo"
            width={96}  // Increased from 64 to 96
            height={96} // Increased from 64 to 96
            className="object-contain w-auto h-auto"
            priority
            style={{ 
              maxHeight: '72px', // Slightly increased from 60px to 72px
              maxWidth: '180px', // Allow more horizontal space
              width: 'auto',
              height: 'auto'
            }}
          />
        </div>
      </Link>

      {/* Navigation */}
      <nav className="hidden lg:flex items-center gap-8">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`text-[14px] font-bold transition-all relative py-2 cursor-pointer ${
              currentPage === item.id 
                ? "text-[#68cfa3]" 
                : linkBaseClass
            }`}
          >
            {item.label}
            {currentPage === item.id && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#68cfa3] rounded-full animate-in fade-in slide-in-from-bottom-1" />
            )}
          </button>
        ))}
      </nav>

      {/* User Profile / Notifications 
      <div className="flex items-center gap-4">
        <button className="w-10 h-10 rounded-full bg-[#1B2C42] flex items-center justify-center text-white relative hover:opacity-90 transition-opacity group cursor-pointer">
          <Bell size={20} className="group-hover:rotate-12 transition-transform" />
          <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border border-[#1B2C42] animate-pulse"></span>
        </button>
        <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-200 cursor-pointer hover:border-[#68cfa3] transition-colors">
          <img 
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop" 
            alt="Admin profile" 
            className="w-full h-full object-cover"
          />
        </div>
      </div>*/}
    </header>
  );
};

export default AdminHeader;