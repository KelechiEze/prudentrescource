'use client';
import React, { useRef, useState } from 'react';
import { CheckCircle, Search, ArrowRight } from 'lucide-react';
import { HERO_VIDEO_URL } from '../../constants';
import { useRouter } from 'next/navigation';

interface HeroProps {
  onSearch: () => void;
}

const Hero: React.FC<HeroProps> = ({ onSearch }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const handleSearch = () => {
    // Call the original onSearch prop
    if (onSearch) {
      onSearch();
    }
    
    // Navigate to jobsearch page with query
    if (searchQuery.trim()) {
      router.push(`/jobsearch?q=${encodeURIComponent(searchQuery)}`);
    } else {
      router.push('/jobsearch');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  React.useEffect(() => {
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

        {/* Reduced dark overlay for better video visibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/40 to-black/75" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full px-6 md:px-10 lg:px-20 pt-40 pb-20">
        {/* ADJUST THIS MARGIN TOP TO PUSH HEADING/PARAGRAPH DOWN */}
        {/* Current value: mt-24. Adjust with mt-8, mt-12, mt-16, mt-20, mt-24, mt-28, mt-32, etc. */}
        <div className="mb-16 mt-24">
          {/* ADJUST HEADING SIZE HERE */}
          {/* Current sizes: text-3xl md:text-5xl lg:text-[60px] */}
          {/* Increased line height from leading-[110%] to leading-[1.3] for more space between lines */}
          <h1 className="font-serif text-3xl md:text-5xl lg:text-[60px] leading-[1.3] mb-8 text-white font-normal tracking-tight">
            Connecting Qualified Healthcare  <br className="hidden lg:block" />
            Professionals with Care Organizations
          </h1>
          
          {/* ADJUST PARAGRAPH SIZE HERE */}
          {/* Current sizes: text-base md:text-xl */}
          {/* Adjust text size classes: text-sm, text-base, text-lg, text-xl, text-2xl, etc. */}
          <p className="text-base md:text-xl text-gray-200 max-w-4xl leading-[150%] font-light opacity-90 tracking-wide">
            We connect healthcare organizations with credentialed professionals through a carefully facilitated matching process — not a marketplace.
            Real humans curating real matches.
          </p>
        </div>

        {/* Spacer to push checklist/search down */}
        {/* ADJUST THIS HEIGHT TO CONTROL SCROLL AMOUNT BEFORE SEEING CHECKLIST/SEARCH */}
        {/* Current: h-[30vh] lg:h-[40vh] */}
        {/* Adjust with: h-[20vh], h-[25vh], h-[30vh], h-[35vh], h-[40vh], h-[45vh], h-[50vh] */}
        <div className="h-[30vh] lg:h-[40vh]" />

        {/* Bottom Bar: Checklist and Search side-by-side - Now appears after scrolling */}
        <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-10 w-full">
          
          {/* Checklist on the left */}
          <div className="flex flex-col gap-5">
            {[
              "100% Credential verified professionals",
              "Admin-facilitated matching",
              "For Hospitals, Clinics & Home-care"
            ].map((text, i) => (
              <div key={i} className="flex items-center gap-3 group">
                <CheckCircle className="text-teal-400 w-5 h-5 opacity-90 group-hover:scale-110 transition-transform" strokeWidth={2} />
                <span className="text-[14px] font-medium tracking-[0.05em] text-white/95">{text}</span>
              </div>
            ))}
          </div>

          {/* Search bar and button - Fixed mobile width issue */}
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full max-w-lg">
            {/* ADJUST SEARCH BAR SIZE HERE */}
            {/* Current: h-12 px-5 */}
            {/* Adjust height: h-10, h-12, h-14 */}
            {/* Adjust horizontal padding: px-4, px-5, px-6 */}
            <div className="w-full sm:flex-1 bg-white/10 backdrop-blur-2xl rounded-full h-12 px-5 flex items-center gap-3 border border-white/20 transition-all focus-within:bg-white/20 focus-within:border-teal-400/50">
              <Search className="text-white/60 w-3.5 h-3.5" />
              <input 
                type="text" 
                placeholder="Search your discipline" 
                className="bg-transparent border-none outline-none text-white placeholder-white/40 w-full h-full text-sm font-light"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleKeyDown}
              />
            </div>
            
            {/* ADJUST SEARCH BUTTON SIZE HERE */}
            {/* Current: h-12 px-8 text-xs */}
            {/* Adjust height: h-10, h-12, h-14 */}
            {/* Adjust horizontal padding: px-6, px-8, px-10 */}
            {/* Adjust text size: text-xs, text-sm */}
            <button 
              onClick={handleSearch}
              className="w-full sm:w-auto h-12 px-8 bg-teal-400 hover:bg-teal-500 text-gray-900 text-xs font-bold rounded-full flex items-center justify-center gap-2 transition-all tracking-widest shadow-[0_0_15px_rgba(104,207,163,0.3)] active:scale-95 whitespace-nowrap"
            >
              Search <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;