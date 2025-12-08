'use client';
import React, { useState, useEffect } from 'react';
import { ArrowUp, ChevronUp, ChevronsUp } from 'lucide-react';

const ScrollToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [iconIndex, setIconIndex] = useState(0);
  const icons = [ArrowUp, ChevronUp, ChevronsUp];
  const CurrentIcon = icons[iconIndex];

  useEffect(() => {
    const toggleVisibility = () => {
      // Show button when page is scrolled down 300px
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setIconIndex((prev) => (prev + 1) % icons.length);
    }, 1500);
    return () => clearInterval(interval);
  }, [icons.length]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-8 right-8 z-50 w-14 h-14 bg-[#68cfa3] rounded-full flex items-center justify-center text-white shadow-lg hover:bg-[#5abf94] transition-all duration-500 animate-pulse-ring group ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
      }`}
      aria-label="Scroll to top"
    >
      <CurrentIcon className="w-6 h-6 transition-all duration-300" strokeWidth={2.5} />
    </button>
  );
};

export default ScrollToTop;