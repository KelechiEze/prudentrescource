'use client';
import React from 'react';
import { MapPin, Mail, Headphones, ArrowRight } from 'lucide-react';

const ContactPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white pt-32 md:pt-40 font-sans overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 mb-20 md:mb-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          
          {/* Left Column: Contact Info */}
          <div className="space-y-8 md:space-y-12">
            <div className="space-y-4 md:space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-[#8b5cf6]"></div>
                <span className="text-[10px] md:text-[11px] font-bold tracking-[0.25em] text-gray-900 uppercase">CONTACT US</span>
              </div>
              <h1 className="font-serif text-4xl md:text-6xl lg:text-[72px] text-[#1B2C42] leading-tight">
                Let's get in touch.
              </h1>
              <p className="text-gray-600 text-base md:text-xl leading-relaxed max-w-xl font-light">
                Have questions or want to learn more about how we can support you? 
                Give us a call or send us a message. One of our representatives will be in 
                touch soon. We look forward to connecting and helping you find solutions 
                tailored to your staffing goals.
              </p>
            </div>

            <div className="space-y-8 md:space-y-10">
              {/* Business Address */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 md:gap-6">
                <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-[#1B2C42] flex items-center justify-center shrink-0">
                  <MapPin className="text-white w-5 h-5 md:w-7 md:h-7" />
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] md:text-[12px] font-bold tracking-widest text-gray-900 uppercase">BUSINESS ADDRESS</span>
                  <p className="text-gray-600 text-sm md:text-lg">6340 Security Blvd. Suite 100 #1467, Baltimore, MD 21207</p>
                </div>
              </div>

              {/* Email Address */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 md:gap-6">
                <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-[#1B2C42] flex items-center justify-center shrink-0">
                  <Mail className="text-white w-5 h-5 md:w-7 md:h-7" />
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] md:text-[12px] font-bold tracking-widest text-gray-900 uppercase">EMAIL ADDRESS</span>
                  <p className="text-gray-600 text-sm md:text-lg break-all">info@prudentresources.com</p>
                </div>
              </div>

              {/* Contact Number */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 md:gap-6">
                <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-[#1B2C42] flex items-center justify-center shrink-0">
                  <Headphones className="text-white w-5 h-5 md:w-7 md:h-7" />
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] md:text-[12px] font-bold tracking-widest text-gray-900 uppercase">CONTACT US</span>
                  <p className="text-gray-600 text-sm md:text-lg">Call for an Appointment: +1 443 985 5388</p>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="pt-6 flex flex-col gap-4 text-gray-900 font-medium">
              <span className="text-base md:text-lg">Follow Us:</span>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
                {["Facebook", "Twitter / X", "LinkedIn", "Instagram"].map((social) => (
                  <a key={social} href="#" className="text-sm md:text-lg border-b border-gray-900 pb-0.5 hover:opacity-70 transition-opacity whitespace-nowrap">
                    {social}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Form */}
          <div className="bg-[#E7EAE0] rounded-xl p-6 md:p-14">
            <form className="space-y-6 md:space-y-8" onSubmit={(e) => e.preventDefault()}>
              <div className="space-y-2">
                <label className="text-sm md:text-[16px] font-semibold text-gray-900">Full Name</label>
                <input 
                  type="text" 
                  placeholder="John Doe" 
                  className="w-full h-12 md:h-14 px-4 md:px-6 border border-gray-200/50 rounded-lg text-base md:text-lg focus:outline-none focus:ring-2 focus:ring-teal-400 bg-white placeholder-gray-400 text-gray-900"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm md:text-[16px] font-semibold text-gray-900">Your Email</label>
                <input 
                  type="email" 
                  placeholder="john.doe@example.com" 
                  className="w-full h-12 md:h-14 px-4 md:px-6 border border-gray-200/50 rounded-lg text-base md:text-lg focus:outline-none focus:ring-2 focus:ring-teal-400 bg-white placeholder-gray-400 text-gray-900"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm md:text-[16px] font-semibold text-gray-900">Your Number</label>
                <input 
                  type="text" 
                  placeholder="+1 (000) 000-0000" 
                  className="w-full h-12 md:h-14 px-4 md:px-6 border border-gray-200/50 rounded-lg text-base md:text-lg focus:outline-none focus:ring-2 focus:ring-teal-400 bg-white placeholder-gray-400 text-gray-900"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm md:text-[16px] font-semibold text-gray-900">Enter your message</label>
                <textarea 
                  placeholder="How can we help you?" 
                  className="w-full h-32 md:h-44 p-4 md:p-6 border border-gray-200/50 rounded-lg text-base md:text-lg focus:outline-none focus:ring-2 focus:ring-teal-400 bg-white placeholder-gray-400 text-gray-900 resize-none"
                ></textarea>
              </div>

              <div className="pt-4">
                <button className="w-full sm:w-auto bg-[#68cfa3] hover:bg-[#5abf94] text-gray-900 px-10 py-3.5 md:py-4.5 rounded-full text-base md:text-lg font-bold flex items-center justify-center gap-2 transition-all shadow-xl active:scale-95">
                  Submit <ArrowRight size={20} />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Map Section - Full Width */}
      <section className="w-full h-[400px] md:h-[600px] bg-gray-100 border-t border-gray-200">
        <iframe 
          title="Business Location"
          width="100%" 
          height="100%" 
          frameBorder="0" 
          scrolling="no" 
          marginHeight={0} 
          marginWidth={0} 
          src="https://maps.google.com/maps?q=6340%20Security%20Blvd%20Suite%20100%20%231467%2C%20Baltimore%2C%20MD%2021207&t=&z=16&ie=UTF8&iwloc=&output=embed"
          className="grayscale-[0.2] contrast-[1.1]"
        ></iframe>
      </section>
    </div>
  );
};

export default ContactPage;