
import React, { useRef, useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';

interface Job {
  id: number;
  role: string;
  schedule: string;
  duration: string;
  title: string;
  location: string;
  datePosted: string;
  salary: string;
}

const JOBS: Job[] = [
  {
    id: 1,
    role: "Radiology Technologist",
    schedule: "Days, 4x10",
    duration: "26 weeks",
    title: "Cardiovascular Interventional Radiology",
    location: "Springfield, IL",
    datePosted: "11/30/2025",
    salary: "$4,120/wk"
  },
  {
    id: 2,
    role: "Registered Nurse (RN)",
    schedule: "Nights, 3x12",
    duration: "13 weeks",
    title: "Critical Care Unit (ICU)",
    location: "Baltimore, MD",
    datePosted: "12/01/2025",
    salary: "$3,850/wk"
  },
  {
    id: 3,
    role: "Physical Therapist",
    schedule: "Days, 5x8",
    duration: "Ongoing",
    title: "Outpatient Rehabilitation Center",
    location: "Charlottesville, VA",
    datePosted: "11/28/2025",
    salary: "$2,200/wk"
  },
  {
    id: 4,
    role: "Phlebotomist",
    schedule: "Evenings, 5x8",
    duration: "13 weeks",
    title: "Mobile Blood Collection Team",
    location: "San Diego, CA",
    datePosted: "12/02/2025",
    salary: "$1,950/wk"
  },
  {
    id: 5,
    role: "LPN / LVN",
    schedule: "Weekends, 2x12",
    duration: "8 weeks",
    title: "Senior Living Memory Care",
    location: "Austin, TX",
    datePosted: "11/25/2025",
    salary: "$1,600/wk"
  },
  {
    id: 6,
    role: "Surgical Tech",
    schedule: "Days, 4x10",
    duration: "20 weeks",
    title: "Main Operating Room Support",
    location: "Seattle, WA",
    datePosted: "11/29/2025",
    salary: "$3,200/wk"
  },
  {
    id: 7,
    role: "Occupational Therapist",
    schedule: "Days, 5x8",
    duration: "13 weeks",
    title: "Pediatric Home Healthcare",
    location: "Denver, CO",
    datePosted: "12/01/2025",
    salary: "$2,800/wk"
  },
  {
    id: 8,
    role: "Medical Assistant",
    schedule: "Days, 5x8",
    duration: "Contract",
    title: "Urgent Care Specialist Group",
    location: "Phoenix, AZ",
    datePosted: "12/03/2025",
    salary: "$1,450/wk"
  }
];

const AvailableJobs: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const containerHeight = rect.height;
      const scrollProgress = -rect.top / (containerHeight - window.innerHeight);
      
      if (scrollProgress >= 0 && scrollProgress <= 1) {
        const index = Math.min(
          Math.floor(scrollProgress * JOBS.length),
          JOBS.length - 1
        );
        setActiveIndex(index);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section 
      ref={containerRef}
      className="bg-white relative"
      style={{ height: `${JOBS.length * 100}vh` }} // Creates the scroll runway
    >
      {/* Sticky Wrapper - Keeps content centered during the scroll cycle */}
      <div className="sticky top-0 h-screen w-full flex items-center overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 w-full h-full flex items-center">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 w-full h-[600px]">
            
            {/* Left Column: Fixed context during scroll */}
            <div className="lg:col-span-4 flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-2.5 h-2.5 rounded-full bg-teal-400"></div>
                <span className="text-[11px] font-bold tracking-[0.2em] text-gray-900 uppercase">Current Openings</span>
              </div>
              
              <h2 className="font-serif text-4xl md:text-5xl text-[#1B2C42] mb-6 leading-tight">
                Available job listing
              </h2>
              
              <p className="text-gray-600 text-lg leading-relaxed mb-10 max-w-sm">
                Just beginning your career or already have many years of experience? 
                Scroll to explore our top picks curated specifically for your professional growth.
              </p>
              
              <div className="flex flex-col items-start gap-8">
                <button className="bg-[#1B2C42] hover:bg-[#2a4466] text-white px-10 py-4 rounded-full text-sm font-semibold flex items-center gap-2 transition-all shadow-lg active:scale-95">
                  Browse Job opportunities <ArrowRight size={18} />
                </button>
                <div className="flex flex-col">
                  <span className="text-3xl font-serif text-[#1B2C42]">{activeIndex + 1}<span className="text-gray-300 text-xl"> / {JOBS.length}</span></span>
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Viewing Opportunity</span>
                </div>
              </div>
            </div>

            {/* Right Column: Animated Card Stage */}
            <div className="lg:col-span-8 relative h-full flex items-center justify-center perspective-1000">
              {JOBS.map((job, index) => {
                const isActive = index === activeIndex;
                const isPast = index < activeIndex;
                const isFuture = index > activeIndex;

                return (
                  <div 
                    key={job.id} 
                    className={`absolute w-full max-w-2xl bg-[#E9ECF5] rounded-[5px] p-8 md:p-12 transition-all duration-700 ease-[cubic-bezier(0.23, 1, 0.32, 1)] ${
                      isActive 
                        ? 'opacity-100 translate-y-0 scale-100 rotate-0' 
                        : isPast 
                          ? 'opacity-0 -translate-y-[120%] scale-95 -rotate-2 pointer-events-none' 
                          : 'opacity-0 translate-y-[120%] scale-105 rotate-2 pointer-events-none'
                    }`}
                  >
                    <div className="flex flex-col gap-8">
                      {/* Header Info */}
                      <div className="flex justify-between items-start">
                        <div className="text-gray-500 text-sm font-bold tracking-widest uppercase">
                          {job.role}
                        </div>
                        <div className="bg-white/50 backdrop-blur px-4 py-1.5 rounded-full text-[11px] font-bold text-[#1B2C42] uppercase tracking-wider">
                          {job.duration}
                        </div>
                      </div>
                      
                      {/* Job Title */}
                      <div>
                        <h3 className="font-serif text-3xl md:text-4xl text-[#1B2C42] leading-tight mb-4">
                          {job.title}
                        </h3>
                        <div className="text-gray-600 font-medium flex items-center gap-2">
                           <span className="w-1.5 h-1.5 rounded-full bg-teal-400"></span>
                           {job.schedule}
                        </div>
                      </div>
                      
                      {/* Details Row */}
                      <div className="flex flex-wrap gap-x-12 gap-y-4 py-6 border-y border-gray-300/50">
                        <div className="flex flex-col">
                          <span className="text-[10px] text-gray-400 uppercase font-bold tracking-widest mb-1">Location</span>
                          <span className="text-[#1B2C42] font-semibold">{job.location}</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[10px] text-gray-400 uppercase font-bold tracking-widest mb-1">Posted</span>
                          <span className="text-[#1B2C42] font-semibold">{job.datePosted}</span>
                        </div>
                      </div>
                      
                      {/* Salary & Apply */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-8">
                        <div className="flex flex-col">
                          <span className="text-[10px] text-gray-400 uppercase font-bold tracking-widest mb-1">Weekly Salary</span>
                          <span className="text-[#1B2C42] font-bold text-3xl">{job.salary}</span>
                        </div>
                        
                        <button className="bg-[#68cfa3] hover:bg-[#5abf94] text-[#1B2C42] px-10 py-4 rounded-full text-[13px] font-bold transition-all shadow-md active:scale-95">
                          Apply Now
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default AvailableJobs;