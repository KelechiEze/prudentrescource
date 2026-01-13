'use client';
import React from 'react';
import Image from 'next/image';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#E3E8DE] pt-16 pb-8 text-[#1B2C42] font-sans relative">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-20">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 mb-12 relative">
          
          {/* Logo Column - Aligned to top with links */}
          <div className="lg:col-span-4">
            <div className="flex items-start gap-3 h-full">
              <div className="relative w-28 h-28 lg:w-35 lg:h-35 flex items-start justify-center">
                <Image
                  src="/logodark.png"
                  alt="Prudent Resources Logo"
                  width={140}  
                  height={140} 
                  className="object-contain w-full h-full"
                />
              </div>
            </div>
          </div>

          {/* Links Column - Aligned to top */}
          <div className="lg:col-span-4 flex flex-col justify-start gap-4">
            {["About", "For Professionals", "For Organizations", "Our Service", "Contact"].map((item) => (
              <a key={item} href="#" className="text-[#1B2C42] hover:opacity-70 transition-opacity text-[16px]">
                {item}
              </a>
            ))}
          </div>

          {/* Social Column - Aligned to top */}
          <div className="lg:col-span-4 flex flex-col justify-start gap-4">
            {["Facebook", "Twitter", "Linkedin", "Instagram"].map((item) => (
              <a key={item} href="#" className="text-[#1B2C42] hover:opacity-70 transition-opacity text-[16px]">
                {item}
              </a>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex justify-end items-center pt-8">
          {/* Copyright */}
          <div className="text-[#1B2C42]/60 text-[15px] font-normal">
            © 2020 Prudent Resources. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;