import React, { useRef, useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

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
  const router = useRouter();

  // Function to create detailed job data and navigate
  const handleViewJobDetails = (job: Job) => {
    // Create detailed job object matching JobSearchResultsPage structure
    const detailedJob = {
      id: job.id,
      category: job.role.split(' ')[0], // Use first word of role as category
      schedule: job.schedule,
      duration: job.duration,
      title: job.title,
      location: job.location,
      datePosted: job.datePosted,
      startingPrice: job.salary,
      // Calculate pay rate from weekly salary (assuming 40 hours/week)
      payRate: `$${Math.round(parseFloat(job.salary.replace(/[^0-9.]/g, '')) / 40)}/Hour`,
      buttonLabel: "View job details",
      type: job.duration.includes("Ongoing") ? "Permanent Placement" : 
            job.duration.includes("Contract") ? "Contract Role" : "Travel Contract",
      fullDescription: `We are seeking a dedicated ${job.role} for our ${job.title} in ${job.location}. This position offers competitive compensation and opportunities for professional growth.`,
      schedulesAvailable: `Schedule: ${job.schedule}`,
      contractLength: `Contract Length: ${job.duration}`,
      duties: [
        `Perform ${job.role.toLowerCase()} duties as assigned`,
        "Maintain accurate patient records and documentation",
        "Collaborate with healthcare team members",
        "Follow established protocols and safety guidelines",
        "Provide quality patient care and support"
      ],
      requirements: [
        "Relevant certification or license",
        "Previous experience in healthcare setting",
        "Strong communication and interpersonal skills",
        "Ability to work in a team environment",
        "Commitment to professional development"
      ]
    };

    // Store the job data in localStorage or sessionStorage
    localStorage.setItem('selectedJobDetails', JSON.stringify(detailedJob));
    
    // Navigate to the job details page
    router.push(`/job-details/${job.id}`);
  };

  const handleBrowseJobs = () => {
    router.push('/jobsearch');
  };

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
      style={{ height: `${JOBS.length * 80}vh` }}
    >
      {/* Sticky Wrapper - Using dynamic viewport height to handle mobile browser UI */}
      <div className="sticky top-0 h-[100dvh] w-full flex flex-col justify-center items-center overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 md:px-10 lg:px-16 w-full flex flex-col lg:flex-row items-center justify-between gap-4 lg:gap-20">
          
          {/* Header Info - Tighter for mobile to save space */}
          <div className="w-full lg:w-5/12 text-center lg:text-left pt-4 md:pt-10 lg:pt-0">
            <div className="flex items-center justify-center lg:justify-start gap-2 mb-2 lg:mb-6">
              <div className="w-2 h-2 rounded-full bg-teal-400"></div>
              <span className="text-[9px] md:text-[11px] font-bold tracking-[0.2em] text-[#1B2C42] uppercase">
                Current Openings
              </span>
            </div>
            
            <h2 className="font-serif text-[24px] md:text-[42px] lg:text-[52px] text-[#1B2C42] mb-2 lg:mb-6 leading-tight">
              Available job listing
            </h2>
            
            <p className="text-gray-600 text-[13px] md:text-lg leading-relaxed mb-4 lg:mb-10 max-w-md mx-auto lg:mx-0 font-normal opacity-90">
              Just beginning your career? Explore our top picks curated specifically for your professional growth.
            </p>
            
            <div className="flex flex-col items-center lg:items-start gap-4 lg:gap-8">
              <button 
                onClick={handleBrowseJobs}
                className="bg-[#1B2C42] hover:bg-[#2a4466] text-white px-7 md:px-10 py-3 md:py-4 rounded-full text-[11px] md:text-sm font-bold flex items-center gap-2 transition-all shadow-md active:scale-95 whitespace-nowrap cursor-pointer"
              >
                Browse Job opportunities <ArrowRight size={14} className="md:w-[18px] md:h-[18px]" />
              </button>
              
              <div className="flex flex-col items-center lg:items-start">
                <div className="text-[18px] md:text-[28px] font-serif text-[#1B2C42]">
                  {activeIndex + 1}<span className="text-gray-300"> / {JOBS.length}</span>
                </div>
                <div className="text-[8px] font-bold text-gray-400 uppercase tracking-widest">
                  VIEWING OPPORTUNITY
                </div>
              </div>
            </div>
          </div>

          {/* Cards Display Stage - Adjusted height and scaling for mobile view */}
          <div className="w-full lg:w-7/12 relative h-[320px] md:h-[480px] lg:h-[550px] flex items-center justify-center perspective-1000">
            {JOBS.map((job, index) => {
              const isActive = index === activeIndex;
              const isPast = index < activeIndex;

              return (
                <div 
                  key={job.id} 
                  className={`absolute w-full max-w-[540px] bg-[#EFF3F9] rounded-[12px] p-4 md:p-10 shadow-sm border border-[#D1D9E4]/40 transition-all duration-700 ease-[cubic-bezier(0.23, 1, 0.32, 1)] ${
                    isActive 
                      ? 'opacity-100 translate-y-0 scale-100 z-10 cursor-pointer' 
                      : isPast 
                        ? 'opacity-0 -translate-y-[60px] scale-95 pointer-events-none' 
                        : 'opacity-0 translate-y-[60px] scale-105 pointer-events-none'
                  }`}
                  onClick={() => isActive && handleViewJobDetails(job)}
                >
                  <div className="flex flex-col gap-3 md:gap-8">
                    {/* Role & Duration Tag */}
                    <div className="flex justify-between items-center">
                      <div className="text-[#1B2C42]/60 text-[9px] md:text-[12px] font-bold tracking-[0.1em] uppercase truncate max-w-[70%] cursor-default">
                        {job.role}
                      </div>
                      <div className="bg-white px-2 py-0.5 md:px-3 md:py-1 rounded-full text-[8px] md:text-[11px] font-bold text-[#1B2C42] uppercase tracking-wider cursor-default">
                        {job.duration}
                      </div>
                    </div>
                    
                    {/* Job Title Section */}
                    <div>
                      <h3 className="font-serif text-[18px] md:text-[34px] text-[#1B2C42] leading-tight mb-1 cursor-pointer">
                        {job.title}
                      </h3>
                      <div className="text-gray-500 font-medium flex items-center gap-2 text-[11px] md:text-[14px] cursor-default">
                         <div className="w-1.5 h-1.5 rounded-full bg-teal-400"></div>
                         {job.schedule}
                      </div>
                    </div>
                    
                    {/* Details Info Grid */}
                    <div className="flex items-center gap-6 md:gap-12 py-2 md:py-6 border-y border-[#D1D9E4]/60">
                      <div className="flex flex-col">
                        <span className="text-[8px] text-gray-400 uppercase font-bold tracking-widest mb-0.5 cursor-default">Location</span>
                        <span className="text-[#1B2C42] font-semibold text-[11px] md:text-base cursor-default">{job.location}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[8px] text-gray-400 uppercase font-bold tracking-widest mb-0.5 cursor-default">Posted</span>
                        <span className="text-[#1B2C42] font-semibold text-[11px] md:text-base cursor-default">{job.datePosted}</span>
                      </div>
                    </div>
                    
                    {/* Price & Primary Action */}
                    <div className="flex items-center justify-between mt-1">
                      <div className="flex flex-col">
                        <span className="text-[8px] text-gray-400 uppercase font-bold tracking-widest cursor-default">Weekly Salary</span>
                        <span className="text-[#1B2C42] font-bold text-[18px] md:text-[32px] cursor-default">{job.salary}</span>
                      </div>
                      
                      <button 
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent card click event
                          handleViewJobDetails(job);
                        }}
                        className="bg-[#68cfa3] hover:bg-[#5abf94] text-[#1B2C42] px-5 md:px-10 h-9 md:h-14 rounded-full text-[10px] md:text-[13px] font-bold transition-all shadow-sm active:scale-95 whitespace-nowrap cursor-pointer"
                      >
                        View Job Details
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
};

export default AvailableJobs;