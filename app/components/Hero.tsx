import React, { useRef, useEffect } from 'react';
import { CheckCircle, Search, ArrowRight } from 'lucide-react';
import { HERO_VIDEO_URL } from '../../constants';

interface HeroProps {
  onSearch: () => void;
}

const Hero: React.FC<HeroProps> = ({ onSearch }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const playVideo = async () => {
      if (videoRef.current) {
        // Subtle slow-motion effect for premium feel
        videoRef.current.playbackRate = 0.7; 
        try {
          await videoRef.current.play();
        } catch (err) {
          console.log("Auto-play was prevented", err);
        }
      }
    };
    playVideo();
  }, []);

  return (
    <section className="relative w-full min-h-screen flex flex-col justify-center overflow-hidden bg-black">
      {/* Background Video - Container matches section dimensions */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover opacity-60 scale-[1.02] transition-transform duration-[10s]"
        >
          <source src={HERO_VIDEO_URL} type="video/mp4" />
        </video>
        {/* Cinematic gradient overlay for content readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-black/85" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full px-6 md:px-10 lg:px-20 pt-40 pb-20">
        <div className="mb-20">
          <h1 className="font-serif text-5xl md:text-8xl lg:text-[105px] leading-[1] mb-10 text-white font-normal tracking-tight">
            Precision healthcare <br className="hidden lg:block" />
            staffing, curated for trust
          </h1>
          
          <p className="text-lg md:text-2xl text-gray-200 max-w-5xl leading-snug font-light opacity-90 tracking-wide">
            We connect healthcare organizations with credentialed professionals through a carefully facilitated matching process — not a marketplace. <br className="hidden lg:block" />
            Real humans curating real matches.
          </p>
        </div>

        {/* Bottom Bar: Checklist and Search side-by-side */}
        <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-12 w-full">
          
          {/* Checklist on the left */}
          <div className="flex flex-col gap-6">
            {[
              "100% Credential verified professionals",
              "Admin-facilitated matching",
              "For Hospitals, Clinics & Home-care"
            ].map((text, i) => (
              <div key={i} className="flex items-center gap-4 group">
                <CheckCircle className="text-teal-400 w-5 h-5 opacity-90 group-hover:scale-110 transition-transform" strokeWidth={2} />
                <span className="text-[15px] font-medium tracking-[0.05em] text-white/95">{text}</span>
              </div>
            ))}
          </div>

          {/* Search bar and button */}
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full max-w-2xl">
            <div className="flex-1 w-full bg-white/10 backdrop-blur-2xl rounded-full h-16 px-8 flex items-center gap-4 border border-white/20 transition-all focus-within:bg-white/20 focus-within:border-teal-400/50">
              <Search className="text-white/60 w-5 h-5" />
              <input 
                type="text" 
                placeholder="Search your discipline" 
                className="bg-transparent border-none outline-none text-white placeholder-white/40 w-full h-full text-lg font-light"
              />
            </div>
            <button 
              onClick={onSearch}
              className="w-full sm:w-auto h-16 px-12 bg-teal-400 hover:bg-teal-500 text-gray-900 text-[14px] font-bold rounded-full flex items-center justify-center gap-2 transition-all uppercase tracking-widest shadow-[0_0_30px_rgba(104,207,163,0.3)] active:scale-95 whitespace-nowrap"
            >
              Search <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
