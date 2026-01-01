'use client';
import React from 'react';
import Image from 'next/image';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#E3E8DE] pt-16 pb-8 text-[#1B2C42] font-sans relative">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-20">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 mb-12 relative">
          
          {/* Logo Column - Increased logo size */}
          <div className="lg:col-span-3">
            <div className="flex items-center gap-3">
              <div className="relative w-28 h-28 flex items-center justify-center">
                <Image
                  src="/logodark.png"
                  alt="Prudent Resources Logo"
                  width={112}  
                  height={112} 
                  className="object-contain w-full h-full"
                />
              </div>
            </div>
          </div>

          {/* Address and Contact Info Column */}
          <div className="lg:col-span-4 flex flex-col">
            <address className="not-italic font-serif text-[32px] md:text-[36px] leading-[1.2] text-[#1B2C42] font-normal mb-8">
              6340 Security Blvd. <br />
              Suite 100 #1467, <br />
              Baltimore, MD 21207
            </address>

            <div className="flex flex-col gap-4 items-start">
              <div className="inline-block border-b border-[#1B2C42] pb-0.5">
                <span className="text-[16px] font-normal">+1 443 985 5388</span>
              </div>
              <div className="inline-block border-b border-[#1B2C42] pb-0.5">
                <a href="mailto:info@prudentresources.com" className="text-[16px] font-normal">
                  info@prudentresources.com
                </a>
              </div>
            </div>
          </div>

          {/* Links Column */}
          <div className="lg:col-span-2 flex flex-col gap-4 pt-1">
            {["About", "For Professionals", "For Organizations", "Our Service", "Contact"].map((item) => (
              <a key={item} href="#" className="text-[#1B2C42] hover:opacity-70 transition-opacity text-[16px]">
                {item}
              </a>
            ))}
          </div>

          {/* Social Column */}
          <div className="lg:col-span-3 flex flex-col gap-4 pt-1">
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