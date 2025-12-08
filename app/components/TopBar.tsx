'use client';
import React from 'react';
import { Mail, Phone } from 'lucide-react';

const TopBar: React.FC = () => {
  return (
    <div className="bg-[#1a1a1a] text-gray-300 text-xs py-2 px-6 hidden md:flex justify-end items-center z-50 relative border-b border-gray-800">
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer">
          <Mail size={14} />
          <span>info@produentresources.com</span>
        </div>
        <div className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer">
          <Phone size={14} />
          <span>+1 (443) 985-5388</span>
        </div>
      </div>
    </div>
  );
};

export default TopBar;