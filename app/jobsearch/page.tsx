'use client';
import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Search, ArrowRight, ChevronDown, X, ArrowLeft } from 'lucide-react';
import SubmitCV from '../components/SubmitCV';
import { useRouter } from 'next/navigation';

interface JobResult {
  id: number;
  category: string;
  schedule: string;
  duration: string;
  title: string;
  location: string;
  datePosted: string;
  startingPrice: string;
  payRate: string;
  buttonLabel: string;
  type: string;
  fullDescription: string;
  schedulesAvailable: string;
  contractLength: string;
  duties: string[];
  requirements: string[];
}

const JOB_RESULTS: JobResult[] = [
  {
    id: 1,
    category: "Nursing",
    schedule: "Days, 4x10",
    duration: "26 weeks",
    title: "Registered Nurse (RN)",
    location: "Springfield, Illinois",
    datePosted: "Dec 23, 2025",
    startingPrice: "$2,850/wk",
    payRate: "$71/Hour",
    buttonLabel: "View job details",
    type: "Contract Role",
    fullDescription: "We are seeking a dedicated Registered Nurse to provide comprehensive patient care in various healthcare settings. The ideal candidate will assess patient health problems and needs, develop and implement nursing care plans, and maintain medical records. RNs will administer nursing care to ill, injured, convalescent, or disabled patients, and may advise patients on health maintenance and disease prevention.",
    schedulesAvailable: "Schedules: working 4 days per week, 10 hours per day",
    contractLength: "This is a temporary contract lasting for 26 Weeks",
    duties: [
      "Perform physical exams and health histories",
      "Administer medications and treatments",
      "Coordinate patient care in collaboration with a wide array of healthcare professionals",
      "Direct and supervise care delivered by other healthcare personnel",
      "Provide health promotion, counseling and education",
      "Monitor, record and report symptoms or changes in patients' conditions",
      "Maintain accurate, detailed reports and records"
    ],
    requirements: [
      "Valid RN License in state of practice",
      "BLS Certification required",
      "ACLS Certification preferred",
      "Minimum 1-2 years of nursing experience",
      "Excellent clinical assessment skills",
      "Strong communication and interpersonal skills"
    ]
  },
  {
    id: 2,
    category: "Nursing",
    schedule: "Nights, 3x12",
    duration: "13 weeks",
    title: "Licensed Practical Nurse (LPN)",
    location: "Baltimore, Maryland",
    datePosted: "Dec 20, 2025",
    startingPrice: "$1,850/wk",
    payRate: "$46/Hour",
    buttonLabel: "View job details",
    type: "Travel Contract",
    fullDescription: "Join our healthcare team as an LPN providing essential nursing care under the direction of registered nurses and physicians. You will be responsible for monitoring patient health, administering basic care, and providing emotional support to patients and their families. This position offers opportunities in various settings including hospitals, nursing homes, and clinics.",
    schedulesAvailable: "Nights, 3 shifts per week, 12 hours per shift (7PM - 7AM)",
    contractLength: "13 Weeks with potential for extension",
    duties: [
      "Monitor patients' health by checking vital signs",
      "Administer basic patient care and treatments",
      "Help patients with bathing, dressing, and personal hygiene",
      "Change bandages and insert catheters",
      "Listen to patients' concerns and report to RNs and doctors",
      "Keep records on patients' health",
      "Document care provided and report changes in patient condition"
    ],
    requirements: [
      "Active LPN License in MD or Compact State",
      "Completion of accredited LPN program",
      "CPR Certification required",
      "Experience in long-term care or hospital setting preferred",
      "Strong clinical and interpersonal skills"
    ]
  },
  {
    id: 3,
    category: "Nursing Support",
    schedule: "Days, 5x8",
    duration: "26 weeks",
    title: "Certified Nurse Assistant (CNA)",
    location: "San Diego, California",
    datePosted: "Dec 22, 2025",
    startingPrice: "$1,200/wk",
    payRate: "$30/Hour",
    buttonLabel: "View job details",
    type: "Short-term Contract",
    fullDescription: "Seeking compassionate CNAs to provide basic patient care under the direction of nursing staff. You will perform duties such as feeding, bathing, dressing, grooming, and moving patients. The ideal candidate is patient, empathetic, and dedicated to providing quality care to those in need.",
    schedulesAvailable: "Monday - Friday, 8AM - 4PM",
    contractLength: "26 Weeks initial term",
    duties: [
      "Assist patients with activities of daily living",
      "Take and record vital signs",
      "Turn and reposition bedridden patients",
      "Collect specimens for testing",
      "Provide skin care to prevent breakdown",
      "Measure and record food and liquid intake",
      "Clean and sanitize patient areas"
    ],
    requirements: [
      "Valid CNA certification in California",
      "High school diploma or equivalent",
      "CPR certification preferred",
      "Previous experience in healthcare setting",
      "Compassionate and patient demeanor"
    ]
  },
  {
    id: 4,
    category: "Laboratory",
    schedule: "Days, 4x10",
    duration: "13 weeks",
    title: "Phlebotomist",
    location: "Seattle, Washington",
    datePosted: "Dec 18, 2025",
    startingPrice: "$1,500/wk",
    payRate: "$37/Hour",
    buttonLabel: "View job details",
    type: "Long-term Contract",
    fullDescription: "Seeking skilled Phlebotomists to collect blood samples from patients for laboratory testing. You will be responsible for ensuring proper patient identification, explaining procedures to patients, and properly labeling and storing blood samples. Accuracy and attention to detail are crucial in this role.",
    schedulesAvailable: "4 days per week, 10 hours per day (Flexible weekdays)",
    contractLength: "13 Weeks",
    duties: [
      "Draw blood from patients using venipuncture and capillary methods",
      "Verify patient identity and proper labeling of samples",
      "Explain blood-drawing procedures to patients",
      "Prepare specimens for transport and testing",
      "Maintain medical equipment such as needles, test tubes, and blood vials",
      "Follow infection control and safety procedures",
      "Keep accurate records of specimens collected"
    ],
    requirements: [
      "Certified Phlebotomy Technician (CPT) certification",
      "High school diploma or equivalent",
      "Experience with venipuncture and capillary puncture",
      "Knowledge of medical terminology",
      "Excellent interpersonal skills"
    ]
  },
  {
    id: 5,
    category: "Nursing Support",
    schedule: "Days, 5x8",
    duration: "Ongoing",
    title: "Certified Medication Assistant (CMA)",
    location: "Charlottesville, Virginia",
    datePosted: "Dec 15, 2025",
    startingPrice: "$1,400/wk",
    payRate: "$35/Hour",
    buttonLabel: "View job details",
    type: "Permanent Placement",
    fullDescription: "CMA position available in a skilled nursing facility. You will be responsible for administering medications to residents under the supervision of licensed nurses. This role requires attention to detail, accuracy, and compassion when working with elderly or disabled patients.",
    schedulesAvailable: "Monday - Friday, 7AM - 3PM",
    contractLength: "Permanent / Full-Time Role",
    duties: [
      "Administer medications according to physician orders",
      "Document medication administration accurately",
      "Monitor patients for medication reactions",
      "Assist with medication refills and ordering",
      "Report medication errors or concerns to supervisor",
      "Maintain medication storage areas",
      "Assist with other nursing duties as needed"
    ],
    requirements: [
      "Valid CMA certification in Virginia",
      "High school diploma or equivalent",
      "Previous experience in long-term care preferred",
      "Knowledge of medication administration procedures",
      "CPR certification"
    ]
  },
  {
    id: 6,
    category: "Nursing Support",
    schedule: "Weekends, 2x12",
    duration: "12 weeks",
    title: "Geriatric Nurse Assistant (GNA)",
    location: "Austin, Texas",
    datePosted: "Dec 21, 2025",
    startingPrice: "$1,300/wk",
    payRate: "$32/Hour",
    buttonLabel: "View job details",
    type: "Weekend Contract",
    fullDescription: "GNA position available in a geriatric care facility. Specializing in care for elderly patients, you will provide assistance with daily living activities while monitoring their health and wellbeing. This role requires patience, empathy, and specialized knowledge of geriatric care.",
    schedulesAvailable: "Saturday & Sunday, 7AM - 7PM (12-hour shifts)",
    contractLength: "12 Weeks (Renewable)",
    duties: [
      "Provide specialized care for geriatric patients",
      "Assist with mobility and positioning to prevent pressure ulcers",
      "Monitor for signs of confusion or cognitive changes",
      "Assist with feeding and nutrition for elderly patients",
      "Provide companionship and emotional support",
      "Document patient condition and report changes",
      "Implement fall prevention strategies"
    ],
    requirements: [
      "Valid GNA certification in Texas",
      "Specialized training in geriatric care",
      "Experience working with elderly population",
      "Patience and compassion for geriatric patients",
      "CPR certification"
    ]
  },
  {
    id: 7,
    category: "Direct Care Services",
    schedule: "Days, 4x10",
    duration: "26 weeks",
    title: "Direct Support Professional",
    location: "Denver, Colorado",
    datePosted: "Jan 5, 2025",
    startingPrice: "$1,100/wk",
    payRate: "$27/Hour",
    buttonLabel: "View job details",
    type: "Contract Role",
    fullDescription: "Direct Support Professionals provide essential assistance to individuals with developmental disabilities or mental health challenges. You will help clients develop daily living skills, participate in community activities, and achieve personal goals while ensuring their safety and wellbeing.",
    schedulesAvailable: "Schedules: working 4 days per week, 10 hours per day",
    contractLength: "This is a temporary contract lasting for 26 Weeks",
    duties: [
      "Assist clients with daily living activities",
      "Implement individual service plans",
      "Support community integration and participation",
      "Document client progress and incidents",
      "Administer medications as trained and delegated",
      "Provide transportation to appointments and activities",
      "Maintain a safe and supportive environment"
    ],
    requirements: [
      "High school diploma or equivalent",
      "Valid driver's license and clean driving record",
      "CPR/First Aid certification",
      "Background check clearance",
      "Compassionate and patient demeanor",
      "Ability to handle emergency situations"
    ]
  },
  {
    id: 8,
    category: "Nursing Support",
    schedule: "Nights, 3x12",
    duration: "13 weeks",
    title: "Certified Medication Technician (CMT)",
    location: "Portland, Oregon",
    datePosted: "Jan 3, 2025",
    startingPrice: "$1,600/wk",
    payRate: "$40/Hour",
    buttonLabel: "View job details",
    type: "Travel Contract",
    fullDescription: "Certified Medication Technicians administer medications in various healthcare settings under nurse supervision. This role requires precision, attention to detail, and thorough documentation to ensure patient safety and proper medication administration.",
    schedulesAvailable: "Nights, 3 shifts per week, 12 hours per shift (7PM - 7AM)",
    contractLength: "13 Weeks with potential for extension",
    duties: [
      "Prepare and administer prescribed medications",
      "Document medication administration accurately",
      "Monitor patients for therapeutic effects and side effects",
      "Maintain medication inventory and storage",
      "Coordinate with pharmacy for medication orders",
      "Educate patients about medications",
      "Follow all medication safety protocols"
    ],
    requirements: [
      "Valid CMT certification in Oregon",
      "High school diploma or equivalent",
      "Previous medication administration experience",
      "Knowledge of medication classifications",
      "CPR certification",
      "Excellent documentation skills"
    ]
  }
];

const JobSearchResultsPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All job categories");
  const [selectedLocation, setSelectedLocation] = useState("All locations");
  const [selectedType, setSelectedType] = useState("All job types");
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [selectedJob, setSelectedJob] = useState<JobResult | null>(null);
  const router = useRouter();

  // Updated categories based on your list
  const categories = useMemo(() => [
    "All job categories",
    "Nursing",
    "Nursing Support",
    "Laboratory",
    "Direct Care Services"
  ], []);

  const locations = useMemo(() => ["All locations", ...new Set(JOB_RESULTS.map(j => j.location))], []);
  const types = useMemo(() => ["All job types", ...new Set(JOB_RESULTS.map(j => j.type))], []);

  const filteredJobs = useMemo(() => {
    return JOB_RESULTS.filter(job => {
      const matchesSearch = 
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        job.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.location.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = 
        selectedCategory === "All job categories" || job.category === selectedCategory;
      
      const matchesLocation = 
        selectedLocation === "All locations" || job.location === selectedLocation;
      
      const matchesType = 
        selectedType === "All job types" || job.type === selectedType;

      return matchesSearch && matchesCategory && matchesLocation && matchesType;
    });
  }, [searchQuery, selectedCategory, selectedLocation, selectedType]);

  const clearAll = () => {
    setSearchQuery("");
    setSelectedCategory("All job categories");
    setSelectedLocation("All locations");
    setSelectedType("All job types");
  };

  const toggleDropdown = (name: string) => {
    setActiveDropdown(activeDropdown === name ? null : name);
  };

  const dropdownRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleJobClick = (job: JobResult) => {
    setSelectedJob(job);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleApplyNow = (job: JobResult) => {
    // Store the job information for the resume submission page
    localStorage.setItem('jobApplyingFor', JSON.stringify({
      id: job.id,
      title: job.title,
      location: job.location,
      category: job.category,
      type: job.type
    }));
    
    // Navigate to the submit resume page
    router.push('/submitresume');
  };

  if (selectedJob) {
    return (
      <div className="bg-white min-h-screen pt-32 md:pt-40">
        <div className="max-w-7xl mx-auto px-4 md:px-6 pb-20 md:pb-32">
          <button 
            onClick={() => setSelectedJob(null)}
            className="flex items-center gap-2 px-4 py-2 bg-[#E3E8DE] hover:bg-[#D8DDD3] text-[#1B2C42] rounded-full text-[12px] md:text-[13px] font-bold transition-all mb-8 md:mb-10 w-fit active:scale-95 cursor-pointer"
          >
            <ArrowLeft size={16} /> Back
          </button>

          <h1 className="font-serif text-3xl md:text-5xl lg:text-[56px] text-[#1B2C42] mb-3 leading-tight tracking-tight">
            {selectedJob.title}
          </h1>

          <div className="mb-8 md:mb-10">
            <p className="text-[#1B2C42] text-lg md:text-xl font-bold">
              Pay Rate: <span className="text-[#1B2C42] font-normal">{selectedJob.payRate}</span>
            </p>
          </div>

          <div className="flex flex-wrap gap-2 md:gap-3 mb-10 md:mb-12">
            {[selectedJob.category, selectedJob.datePosted, selectedJob.location, selectedJob.type].map((tag, i) => (
              <div key={i} className="px-4 md:px-6 py-2 md:py-3 bg-[#F4F6F8] rounded-full text-[#1B2C42] text-[12px] md:text-sm font-bold shadow-sm whitespace-nowrap cursor-default">
                {tag}
              </div>
            ))}
          </div>

          <div className="max-w-7xl space-y-10 md:space-y-12 text-[#1B2C42]/90 leading-relaxed text-base md:text-[18px]">
            <p className="font-normal">{selectedJob.fullDescription}</p>

            <div className="space-y-4">
              <h2 className="font-bold text-sm md:text-[16px] uppercase tracking-wider text-[#1B2C42]">SCHEDULES AVAILABLE:</h2>
              <p className="font-normal">{selectedJob.schedulesAvailable}</p>
            </div>

            <div className="space-y-4">
              <h2 className="font-bold text-sm md:text-[16px] uppercase tracking-wider text-[#1B2C42]">CONTRACT LENGTH</h2>
              <p className="font-normal">{selectedJob.contractLength}</p>
            </div>

            {selectedJob.duties && (
              <div className="space-y-4 md:space-y-6">
                <h2 className="font-bold text-sm md:text-[16px] uppercase tracking-wider text-[#1B2C42]">DUTIES</h2>
                <ul className="list-disc pl-5 space-y-2 md:space-y-3 font-normal">
                  {selectedJob.duties.map((duty, idx) => (
                    <li key={idx} className="pl-2">{duty}</li>
                  ))}
                </ul>
              </div>
            )}

            {selectedJob.requirements && (
              <div className="space-y-4 md:space-y-6">
                <h2 className="font-bold text-sm md:text-[16px] uppercase tracking-wider text-[#1B2C42]">CLIENT'S REQUIRED SKILLS & EXPERIENCE</h2>
                <ul className="list-disc pl-5 space-y-2 md:space-y-3 font-normal">
                  {selectedJob.requirements.map((req, idx) => (
                    <li key={idx} className="pl-2">{req}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="pt-8 md:pt-12">
              <button 
                onClick={() => handleApplyNow(selectedJob)}
                className="w-full sm:w-auto bg-[#68cfa3] hover:bg-[#5abf94] text-white px-12 py-4 rounded-full text-[14px] md:text-[15px] font-bold flex items-center justify-center gap-2 transition-all shadow-xl shadow-teal-500/10 active:scale-95 cursor-pointer"
              >
                Apply Now <ArrowRight size={20} />
              </button>
            </div>
          </div>
        </div>
        <SubmitCV />
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen flex flex-col">
      <div className="max-w-7xl mx-auto px-4 md:px-6 pt-32 md:pt-40 pb-20 md:pb-32 w-full">
        <h1 className="font-serif text-3xl md:text-5xl lg:text-[64px] text-center text-[#1a1a1a] mb-8 md:mb-12 leading-tight">
          Explore Career Opportunities
        </h1>

        {/* Search Bar & Button Container - Unified Height and Sleeker Size */}
        <div className="max-w-3xl mx-auto mb-10 md:mb-16 flex flex-col sm:flex-row gap-3">
          <div className="flex-1 bg-[#E3E8DE]/60 rounded-full h-12 md:h-14 px-6 md:px-8 flex items-center gap-3 border border-transparent focus-within:border-teal-400/50 transition-all shadow-sm">
            <Search className="text-gray-500 w-5 h-5" />
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search job title or location" 
              className="bg-transparent border-none outline-none text-gray-800 placeholder-gray-500 w-full h-full text-sm md:text-base font-medium"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery("")} className="p-1.5 hover:bg-gray-200 rounded-full transition-colors cursor-pointer">
                <X size={14} className="text-gray-400" />
              </button>
            )}
          </div>
          <button className="h-12 md:h-14 px-8 md:px-10 bg-[#1B2C42] hover:bg-[#152336] text-white text-sm md:text-base font-bold rounded-full flex items-center justify-center gap-2 transition-transform active:scale-95 shadow-lg whitespace-nowrap cursor-pointer">
            Search <ArrowRight size={16} className="md:w-5 md:h-5" />
          </button>
        </div>

        {/* Filter Navigation Bar - Optimized for Mobile */}
        <div className="relative flex flex-wrap items-center gap-x-4 md:gap-x-10 gap-y-5 mb-10 md:mb-14 border-b border-gray-100 pb-5 z-30" ref={dropdownRef}>
          <div className="flex flex-wrap items-center gap-x-6 md:gap-x-10 gap-y-4 flex-1">
            {[
              { label: selectedCategory, options: categories, setter: setSelectedCategory, type: 'category' },
              { label: selectedLocation, options: locations, setter: setSelectedLocation, type: 'location' },
              { label: selectedType, options: types, setter: setSelectedType, type: 'type' }
            ].map((filter) => (
              <div key={filter.type} className="relative">
                <div 
                  onClick={() => toggleDropdown(filter.type)}
                  className={`flex items-center gap-2 group cursor-pointer border-b-2 pb-1 transition-colors whitespace-nowrap hover:cursor-pointer ${filter.label.includes('All') ? 'border-gray-400' : 'border-teal-500'}`}
                >
                  <span className={`font-semibold text-[13px] md:text-sm ${filter.label.includes('All') ? 'text-gray-700' : 'text-teal-600'}`}>
                    {filter.label}
                  </span>
                  <ChevronDown size={14} className={`text-gray-400 group-hover:text-gray-700 transition-transform ${activeDropdown === filter.type ? 'rotate-180' : ''}`} />
                </div>
                {activeDropdown === filter.type && (
                  <div className="absolute top-full left-0 mt-2 w-64 max-w-[85vw] bg-white border border-gray-100 rounded-lg shadow-2xl py-2 animate-in fade-in slide-in-from-top-2 duration-200 z-50">
                    <div className="max-h-[300px] overflow-y-auto no-scrollbar">
                      {filter.options.map(opt => (
                        <div 
                          key={opt}
                          onClick={() => { filter.setter(opt); setActiveDropdown(null); }}
                          className={`px-4 py-3 text-sm hover:bg-gray-50 transition-colors cursor-pointer ${filter.label === opt ? 'bg-teal-50 text-teal-600 font-bold' : 'text-gray-700'}`}
                        >
                          {opt}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
          
          <button 
            onClick={clearAll} 
            className="text-[#1B2C42] font-bold text-[12px] md:text-sm hover:underline flex items-center gap-1.5 opacity-70 hover:opacity-100 transition-opacity whitespace-nowrap cursor-pointer"
          >
            <X size={14} /> Clear All
          </button>
        </div>

        <div className="mb-8">
          <p className="text-gray-500 text-sm">
            Showing <span className="text-[#1B2C42] font-bold">{filteredJobs.length}</span> job opportunities
          </p>
        </div>

        {filteredJobs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {filteredJobs.map((job) => (
              <div 
                key={job.id} 
                onClick={() => handleJobClick(job)}
                className="bg-[#E9ECF5] rounded-[5px] p-6 md:p-8 flex flex-col h-full hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group cursor-pointer"
              >
                <div className="mb-6">
                  <div className="flex justify-between items-start mb-4">
                    <p className="text-[10px] md:text-[11px] text-gray-500 font-bold uppercase tracking-wider line-clamp-1 flex-1 mr-2 cursor-default">
                      {job.category} • {job.schedule} • {job.duration}
                    </p>
                    <span className="bg-white/50 text-[9px] md:text-[10px] px-2 py-0.5 rounded font-bold text-[#1B2C42] uppercase tracking-tighter whitespace-nowrap cursor-default">
                      {job.type}
                    </span>
                  </div>
                  <h3 className="font-serif text-2xl md:text-[28px] text-[#1B2C42] leading-tight mb-6 min-h-[60px] md:min-h-[70px] group-hover:text-teal-600 transition-colors cursor-pointer">
                    {job.title}
                  </h3>
                  <div className="space-y-1">
                    <p className="text-gray-600 text-sm font-medium cursor-default">{job.location}</p>
                    <p className="text-gray-500 text-[11px] md:text-[12px] cursor-default">Date Posted: {job.datePosted}</p>
                  </div>
                </div>

                <div className="mt-auto pt-6 border-t border-gray-300/30">
                  <p className="text-[#1B2C42] text-lg md:text-xl font-bold mb-5 md:mb-6 cursor-default">
                    Starting at <span className="font-black">{job.startingPrice}</span>
                  </p>
                  <button className="w-full bg-teal-400 hover:bg-teal-500 text-[#1B2C42] py-3.5 md:py-4 rounded-full text-sm font-bold transition-all shadow-sm active:scale-95 cursor-pointer">
                    {job.buttonLabel}
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-16 md:py-24 text-center flex flex-col items-center justify-center bg-gray-50 rounded-xl border-2 border-dashed border-gray-200 px-6">
            <div className="w-14 h-14 md:w-16 md:h-16 bg-gray-100 rounded-full flex items-center justify-center mb-6">
              <Search className="text-gray-300 w-7 h-7 md:w-8 md:h-8" />
            </div>
            <h2 className="font-serif text-2xl md:text-3xl text-[#1B2C42] mb-4">No jobs found</h2>
            <p className="text-gray-500 mb-8 max-w-sm">Try adjusting your filters or search terms to find what you're looking for.</p>
            <button onClick={clearAll} className="bg-[#1B2C42] text-white px-8 py-3 rounded-full font-bold hover:bg-[#152336] transition-all active:scale-95 cursor-pointer">
              Reset Filters
            </button>
          </div>
        )}
      </div>
      <SubmitCV />
    </div>
  );
};

export default JobSearchResultsPage;