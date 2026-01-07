'use client';
import React, { useState, useEffect } from 'react';
import { ArrowRight, Menu, X } from 'lucide-react';
import { useRouter, usePathname } from 'next/navigation';
import { NAV_LINKS } from '../../constants';
import Image from 'next/image';

interface NavbarProps {
  currentPage?: string;
  onNavigate?: (page: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentPage: propCurrentPage, onNavigate: propOnNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const router = useRouter();
  const pathname = usePathname();

  const getCurrentPageFromPath = () => {
    if (pathname === '/') return 'home';
    if (pathname === '/services') return 'services';
    if (pathname === '/career') return 'career';
    if (pathname === '/organizations') return 'organizations';
    if (pathname === '/contact') return 'contact';
    if (pathname.startsWith('/behavioral-health')) return 'behavioral-health';
    if (pathname.startsWith('/addiction')) return 'addiction';
    if (pathname.startsWith('/residential')) return 'residential';
    return 'home';
  };

  const currentPage = propCurrentPage || getCurrentPageFromPath();

  // Function to check if navbar should have dark text (black text on light background)
  const shouldHaveDarkNavbar = () => {
    // Pages where navbar links should be black
    const darkNavPages = [
      '/behavioral-health',
      '/addiction',
      '/residential',
      '/staffrequest',
      '/jobsearch',
      '/submitresume',
      '/contact',
      '/login'
    ];
    
    return darkNavPages.some(page => pathname.startsWith(page));
  };

  // Function to check if navbar should have light text (white text on dark background)
  const shouldHaveLightNavbar = () => {
    // Pages where navbar links should be white (like home page)
    const lightNavPages = ['home', 'organizations'];
    const current = getCurrentPageFromPath();
    
    return lightNavPages.includes(current) && !shouldHaveDarkNavbar();
  };

  const hasDarkNavbar = shouldHaveDarkNavbar(); // true = black text
  const hasLightNavbar = shouldHaveLightNavbar(); // true = white text

  // NEW FUNCTION: Check if should use dark logo initially (before scrolling)
  const shouldUseDarkLogoInitially = () => {
    if (isScrolled) return false; // Never use dark logo when scrolled
    
    const darkLogoPages = [
      '/services',
      '/career',
      '/contact',
      '/behavioral-health',
      '/addiction',
      '/residential',
      '/staffrequest',
      '/jobsearch',
      '/submitresume',
      '/login'
    ];
    
    return darkLogoPages.some(page => pathname.startsWith(page));
  };

  const shouldUseDarkLogo = shouldUseDarkLogoInitially();

  // Determine which logo to show
  const getLogoImage = () => {
    if (isScrolled) {
      return '/logoprudent.png'; // Always show light logo when scrolled
    }
    
    // Show dark logo for specific pages
    if (shouldUseDarkLogo) {
      return '/logodark.png';
    }
    
    // Default to light logo for other pages
    return '/logoprudent.png';
  };

  const logoImage = getLogoImage();

  const handleNavigate = (page: string) => {
    if (propOnNavigate) {
      propOnNavigate(page);
    } else {
      const route = page === 'home' ? '/' : `/${page}`;
      router.push(route);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent, label: string, href: string) => {
    e.preventDefault();
    
    if (label === "Our Service") {
      handleNavigate('services');
    } else if (label === "Professionals") {
      handleNavigate('career');
    } else if (label === "Organizations") {
      handleNavigate('organizations');
    } else if (label === "Contact Us") {
      handleNavigate('contact');
    } else {
      handleNavigate('home');
    }
    setIsMobileMenuOpen(false);
  };

  const handleFindJobClick = () => {
    handleNavigate('career');
    setIsMobileMenuOpen(false);
  };

  const handleRequestTalentsClick = () => {
    handleNavigate('organizations');
    setIsMobileMenuOpen(false);
  };

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    handleNavigate('home');
  };

  // Determine text colors based on page and scroll state
  const linkBaseClass = isScrolled 
    ? 'text-gray-200 hover:text-white' // When scrolled, always use light text
    : (hasDarkNavbar 
      ? 'text-gray-900 hover:text-black' // Black text for specific pages
      : (hasLightNavbar 
        ? 'text-gray-200 hover:text-white' // White text for home/organizations
        : 'text-gray-900 hover:text-black' // Default to black text
      )
    );

  const logoColorClass = isScrolled 
    ? 'text-white' 
    : (hasDarkNavbar 
      ? 'text-gray-900' 
      : (hasLightNavbar 
        ? 'text-white' 
        : 'text-gray-900'
      )
    );

  const mobileToggleColor = isScrolled 
    ? 'text-white' 
    : (hasDarkNavbar 
      ? 'text-gray-900' 
      : (hasLightNavbar 
        ? 'text-white' 
        : 'text-gray-900'
      )
    );

  const primaryButtonClass = (isScrolled || hasLightNavbar)
    ? 'bg-white text-gray-900' 
    : 'bg-gray-900 text-white';

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled || isMobileMenuOpen 
          ? 'bg-black/90 backdrop-blur-md py-2' // Dark background when scrolled/menu open
          : hasDarkNavbar 
            ? 'bg-white/90 backdrop-blur-md py-2 border-b border-gray-200' // Light background for dark navbar pages
            : 'bg-transparent py-2'
      }`} 
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        {/* Logo */}
        <div className="flex items-center justify-center flex-shrink-0">
          <a 
            href="#" 
            onClick={handleLogoClick} 
            className={`flex items-center ${logoColorClass}`}
          >
            <div className="relative w-24 h-24 flex items-center justify-center">
              <Image
                src={logoImage}
                alt="Prudent Resources Logo"
                width={96}
                height={96}
                className="object-contain w-full h-full transition-opacity duration-300"
                priority
              />
            </div>
          </a>
        </div>

        {/* Desktop Navigation Links - Center aligned with logo */}
        <div className="hidden lg:flex items-center justify-center flex-grow gap-8">
          {NAV_LINKS.map((link) => (
            <a 
              key={link.label} 
              href={link.href} 
              onClick={(e) => handleNavClick(e, link.label, link.href)}
              className={`text-sm font-medium transition-colors ${linkBaseClass} cursor-pointer`}
            >
              {link.label}
            </a>
          ))}
          {/* Contact Us Link */}
          <a 
            href="#" 
            onClick={(e) => handleNavClick(e, 'Contact Us', '/contact')}
            className={`text-sm font-medium transition-colors ${linkBaseClass} cursor-pointer`}
          >
            Contact Us
          </a>
        </div>

        {/* Desktop Buttons - Right aligned */}
        <div className="hidden lg:flex items-center justify-end flex-shrink-0 gap-4">
          <button 
            onClick={handleFindJobClick}
            className={`${primaryButtonClass} px-5 py-2 rounded-full text-xs font-semibold flex items-center gap-2 hover:opacity-90 transition-colors whitespace-nowrap`}
          >
            Find a job <ArrowRight size={14} />
          </button>
          
          <button 
            onClick={handleRequestTalentsClick}
            className="bg-teal-400 text-gray-900 px-5 py-2 rounded-full text-xs font-semibold flex items-center gap-2 hover:bg-teal-500 transition-colors whitespace-nowrap"
          >
            Request for talents <ArrowRight size={14} />
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className={`lg:hidden ${mobileToggleColor} ml-4`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-black/95 text-white p-6 border-t border-gray-800 flex flex-col gap-4 mt-2">
          {NAV_LINKS.map((link) => (
            <a 
              key={link.label} 
              href={link.href} 
              className="text-lg font-medium transition-colors hover:text-gray-300 cursor-pointer"
              onClick={(e) => handleNavClick(e, link.label, link.href)}
            >
              {link.label}
            </a>
          ))}
          {/* Mobile Contact Us Link */}
          <a 
            href="#" 
            className="text-lg font-medium transition-colors hover:text-gray-300 cursor-pointer"
            onClick={(e) => handleNavClick(e, 'Contact Us', '/contact')}
          >
            Contact Us
          </a>
          <div className="flex flex-col gap-3 mt-4">
            <button 
              onClick={handleFindJobClick}
              className="bg-white text-gray-900 px-5 py-3 rounded-full text-sm font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-colors"
            >
              Find a job <ArrowRight size={16} />
            </button>
            <button 
              onClick={handleRequestTalentsClick}
              className="bg-teal-400 text-gray-900 px-5 py-3 rounded-full text-sm font-bold flex items-center justify-center gap-2 hover:bg-teal-500 transition-colors"
            >
              Request for talents <ArrowRight size={16} />
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;