'use client';
import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const Footer: React.FC = () => {
  const router = useRouter();

  const handleNavigation = (page: string) => {
    switch(page) {
      case 'home':
        router.push('/');
        break;
      case 'professionals':
        router.push('/career');
        break;
      case 'organizations':
        router.push('/organizations');
        break;
      case 'service':
        router.push('/services');
        break;
      case 'contact':
        router.push('/contact');
        break;
      case 'tiktok':
        window.open('https://tiktok.com/@prudentresources', '_blank');
        break;
      case 'twitter':
        window.open('https://x.com/Prudentresource', '_blank');
        break;
      case 'facebook':
        window.open('https://www.facebook.com/profile.php?id=61573826751257&mibextid=ZbWKwL', '_blank');
        break;
      case 'instagram':
        window.open('https://www.instagram.com/invites/contact/?i=1n1cwi2k4i82g&utm_content=xiztig6', '_blank');
        break;
      default:
        router.push('/');
    }
  };

  return (
    <footer className="bg-[#E3E8DE] pt-16 pb-8 text-[#1B2C42] font-sans relative">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-20">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 mb-12 relative">
          
          {/* Logo Column - Aligned to top with links */}
          <div className="lg:col-span-4">
            <div className="flex items-start gap-3 h-full">
              <div className="relative w-[132px] h-[132px] flex items-start justify-center -ml-3 -mt-3 cursor-pointer" onClick={() => handleNavigation('home')}>
                <Image
                  src="/logodark.png"
                  alt="Prudent Resources Logo"
                  width={132}
                  height={132}
                  className="object-contain w-full h-full"
                  priority
                />
              </div>
            </div>
          </div>

          {/* Links Column - Aligned to top */}
          <div className="lg:col-span-4 flex flex-col justify-start gap-4">
            {[
              { label: "Home", page: "home" },
              { label: "For Professionals", page: "professionals" },
              { label: "For Organizations", page: "organizations" },
              { label: "Our Service", page: "service" },
              { label: "Contact", page: "contact" }
            ].map((item) => (
              <a 
                key={item.page} 
                href="#" 
                onClick={(e) => {
                  e.preventDefault();
                  handleNavigation(item.page);
                }}
                className="text-[#1B2C42] hover:opacity-70 transition-opacity text-[16px] cursor-pointer"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Social Column - Aligned to top */}
          <div className="lg:col-span-4 flex flex-col justify-start gap-4">
            {[
              { label: "TikTok", page: "tiktok" },
              { label: "Twitter (X)", page: "twitter" },
              { label: "Facebook", page: "facebook" },
              { label: "Instagram", page: "instagram" }
            ].map((item) => (
              <a 
                key={item.page} 
                href="#" 
                onClick={(e) => {
                  e.preventDefault();
                  handleNavigation(item.page);
                }}
                className="text-[#1B2C42] hover:opacity-70 transition-opacity text-[16px] cursor-pointer"
              >
                {item.label}
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