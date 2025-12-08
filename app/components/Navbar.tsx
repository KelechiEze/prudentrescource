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
    return 'home';
  };

  const currentPage = propCurrentPage || getCurrentPageFromPath();

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
    // You might want to create a separate page for this or use a contact form
    // For now, redirecting to organizations page as a placeholder
    handleNavigate('organizations');
    setIsMobileMenuOpen(false);
  };

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    handleNavigate('home');
  };

  const hasDarkHero = ['home', 'organizations'].includes(currentPage);
  
  const linkBaseClass = isScrolled 
    ? 'text-gray-200 hover:text-white' 
    : (hasDarkHero ? 'text-gray-200 hover:text-white' : 'text-gray-900 hover:text-black');

  const logoColorClass = isScrolled 
    ? 'text-white' 
    : (hasDarkHero ? 'text-white' : 'text-gray-900');

  const mobileToggleColor = isScrolled 
    ? 'text-white' 
    : (hasDarkHero ? 'text-white' : 'text-gray-900');

  const primaryButtonClass = (isScrolled || hasDarkHero) 
    ? 'bg-white text-gray-900' 
    : 'bg-gray-900 text-white';

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled || isMobileMenuOpen 
          ? 'bg-black/90 backdrop-blur-md py-2' 
          : 'bg-transparent py-2'
      }`} 
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo - Large but positioned higher */}
        <a 
          href="#" 
          onClick={handleLogoClick} 
          className={`flex items-center ${logoColorClass} -mt-6 -mb-6`}
        >
          <div className="relative w-24 h-24 md:w-32 md:h-32 flex items-center justify-center">
            <Image
              src="/logoprudent.png"
              alt="Prudent Resources Logo"
              width={128}
              height={128}
              className="object-contain w-full h-full"
              priority
            />
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center gap-8 -mt-6">
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
        </div>

        {/* Desktop Buttons */}
        <div className="hidden lg:flex items-center gap-4 -mt-6">
          <button 
            onClick={handleFindJobClick}
            className={`${primaryButtonClass} px-5 py-2 rounded-full text-xs font-semibold flex items-center gap-2 hover:opacity-90 transition-colors`}
          >
            Find a job <ArrowRight size={14} />
          </button>
          
          <button 
            onClick={handleRequestTalentsClick}
            className="bg-teal-400 text-gray-900 px-5 py-2 rounded-full text-xs font-semibold flex items-center gap-2 hover:bg-teal-500 transition-colors"
          >
            Request for talents <ArrowRight size={14} />
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className={`lg:hidden ${mobileToggleColor} -mt-6`}
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