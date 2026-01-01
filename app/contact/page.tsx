'use client';

import React from 'react';
import { MapPin, Mail, Headphones, ArrowRight } from 'lucide-react';

const page: React.FC = () => {
  const address = "6340 Security Blvd. Suite 100 #1467, Baltimore, MD 21207";
  const encodedAddress = encodeURIComponent(address);
  const googleMapsUrl = `https://www.google.com/maps/embed/v1/place?key=YOUR_GOOGLE_MAPS_API_KEY&q=${encodedAddress}&zoom=15`;
  
  // Fallback iframe src without API key (basic Google Maps embed)
  const fallbackMapsUrl = `https://maps.google.com/maps?q=${encodedAddress}&t=&z=15&ie=UTF8&iwloc=&output=embed`;

  return (
    <div className="min-h-screen bg-white pt-40 font-sans">
      <div className="max-w-7xl mx-auto px-6 mb-[72px]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          
          {/* Left Column: Contact Info */}
          <div className="space-y-12">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-[#8b5cf6]"></div>
                <span className="text-[11px] font-bold tracking-[0.25em] text-gray-900 uppercase">CONTACT US</span>
              </div>
              <h1 className="font-serif text-[56px] md:text-[64px] text-[#1B2C42] leading-[130%]">
                Let's get in touch.
              </h1>
              <p className="text-gray-600 text-xl leading-[150%] max-w-xl font-light">
                Have questions or want to learn more about how we can support you? 
                Give us a call or send us a message. One of our representatives will be in 
                touch soon. We look forward to connecting and helping you find solutions 
                tailored to your staffing goals.
              </p>
            </div>

            <div className="space-y-8">
              {/* Business Address */}
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 rounded-full bg-[#1B2C42] flex items-center justify-center shrink-0">
                  <MapPin className="text-white w-7 h-7" />
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[12px] font-bold tracking-widest text-gray-900 uppercase">BUSINESS ADDRESS</span>
                  <p className="text-gray-600 text-lg">{address}</p>
                </div>
              </div>

              {/* Email Address */}
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 rounded-full bg-[#1B2C42] flex items-center justify-center shrink-0">
                  <Mail className="text-white w-7 h-7" />
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[12px] font-bold tracking-widest text-gray-900 uppercase">EMAIL ADDRESS</span>
                  <p className="text-gray-600 text-lg">info@prudentresources.com</p>
                </div>
              </div>

              {/* Contact Us */}
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 rounded-full bg-[#1B2C42] flex items-center justify-center shrink-0">
                  <Headphones className="text-white w-7 h-7" />
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[12px] font-bold tracking-widest text-gray-900 uppercase">CONTACT US</span>
                  <p className="text-gray-600 text-lg">Call for an Appointment: +1 443 985 5388</p>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="pt-6 flex items-center gap-4 text-gray-900 font-medium">
              <span className="text-lg">Follow Us:</span>
              <div className="flex items-center gap-6">
                {["Facebook", "Twitter / X", "LinkedIn", "Instagram"].map((social) => (
                  <a key={social} href="#" className="text-lg border-b border-gray-900 pb-0.5 hover:opacity-70 transition-opacity">
                    {social}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Form */}
          <div className="bg-[#E7EAE0] rounded-xl p-6 md:p-8">
            <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
              <div className="space-y-2">
                <label className="text-[16px] block font-semibold text-gray-900 mb-2">Full Name</label>
                <input 
                  type="text" 
                  placeholder="John Doe" 
                  className="w-full h-14 px-6 border border-gray-200/50 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-teal-400 bg-white placeholder-gray-400 text-gray-900"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[16px] font-semibold text-gray-900 block mb-2">Your Email</label>
                <input 
                  type="email" 
                  placeholder="john@example.com" 
                  className="w-full h-14 px-6 border border-gray-200/50 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-teal-400 bg-white placeholder-gray-400 text-gray-900"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[16px] font-semibold text-gray-900 block mb-2">Your Number</label>
                <input 
                  type="tel" 
                  placeholder="(123) 456-7890" 
                  className="w-full h-14 px-6 border border-gray-200/50 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-teal-400 bg-white placeholder-gray-400 text-gray-900"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[16px] font-semibold text-gray-900 block mb-2">Enter your message</label>
                <textarea 
                  placeholder="Enter your message" 
                  className="w-full h-44 p-6 border border-gray-200/50 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-teal-400 bg-white placeholder-gray-400 text-gray-900 resize-none"
                ></textarea>
              </div>

              <div className="pt-4">
                <button className="bg-[#68cfa3] hover:bg-[#5abf94] text-gray-900 px-10 py-4.5 rounded-full text-lg font-bold flex items-center gap-2 transition-all shadow-xl active:scale-95">
                  Submit <ArrowRight size={20} />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Map Section - Full Width */}
      <section className="w-full h-[600px] bg-gray-100 border-t border-gray-200">
        <iframe 
          title="Prudent Resources Location"
          width="100%" 
          height="100%" 
          frameBorder="0"
          style={{ border: 0 }}
          src={fallbackMapsUrl}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="grayscale-[0.2] contrast-[1.1]"
        ></iframe>
      </section>
    </div>
  );
};

export default page;