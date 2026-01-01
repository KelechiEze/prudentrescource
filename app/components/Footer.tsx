'use client';
import React from 'react';
import Image from 'next/image';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#E5E7E1] pt-16 pb-10 text-gray-800 font-sans">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-12">
          
          {/* Column 1: Logo - Updated to match navbar size */}
          <div className="lg:col-span-3">
            <div className="flex items-center gap-3 text-gray-900">
              <div className="relative w-24 h-24 flex items-center justify-center"> {/* Updated to w-24 h-24 */}
                <Image
                  src="/logodark.png"
                  alt="Prudent Resources Logo"
                  width={96}  
                  height={96} 
                  className="object-contain w-full h-full"
                />
              </div>
              <div className="flex flex-col">
              </div>
            </div>
          </div>

          {/* Column 2: Address */}
          <div className="lg:col-span-4 flex flex-col gap-8">
            <address className="not-italic font-serif text-3xl text-gray-800 leading-tight">
              5123 Market St. #22B <br />
              Charlottesville, <br />
              California 44635
            </address>

            <div className="flex flex-col gap-2 items-start font-medium text-gray-700">
              <span className="border-b border-transparent hover:border-gray-400 transition-colors cursor-pointer">
                (434) 546-4358
              </span>
              <a 
                href="mailto:contact@lift.agencyr.com" 
                className="border-b border-gray-400 pb-0.5 hover:text-teal-700 hover:border-teal-700 transition-colors"
              >
                contact@lift.agencyr.com
              </a>
            </div>
          </div>

          {/* Column 3: Links */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            {["Home", "For Professionals", "For Organizations", "Our Service", "Contact"].map((item) => (
              <a key={item} href="#" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">
                {item}
              </a>
            ))}
          </div>

          {/* Column 4: Socials */}
          <div className="lg:col-span-3 flex flex-col gap-4 lg:items-end">
            {["Facebook", "Twitter", "Linkedin", "Instagram"].map((item) => (
              <a key={item} href="#" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">
                {item}
              </a>
            ))}
          </div>
        </div>

        {/* Copyright */}
        <div className="flex justify-end pt-8 border-t border-gray-300/50">
          <p className="text-gray-500 text-sm font-medium">
            © 2020 Lift Media. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;