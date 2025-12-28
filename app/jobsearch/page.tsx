'use client';

import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Search, ArrowRight, ChevronDown, X, ArrowLeft } from 'lucide-react';
import SubmitCV from '../components/SubmitCV';

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
    category: "Direct Care Services",
    schedule: "Days, 4x10",
    duration: "26 weeks",
    title: "Direct Support Professional",
    location: "Springfield, Illinois",
    datePosted: "Dec 23, 2025",
    startingPrice: "$1000/wk",
    payRate: "$18/Hour",
    buttonLabel: "View job details",
    type: "Contract Role",
    fullDescription: "Our Client is seeking a dedicated and compassionate Direct Support Professional to provide essential assistance and care to individuals with developmental disabilities, mental health challenges, or age-related conditions such as dementia and Alzheimer's disease. The ideal candidate will play a vital role in promoting independence, ensuring safety, and enhancing the quality of life in a group home setting. This position offers an opportunity to make a meaningful difference through personalized support, patient observation, and comprehensive caregiving.",
    schedulesAvailable: "Schedules: working 4 days per week, 10 hours per day",
    contractLength: "This is a temporary contract lasting for 26 Weeks",
    duties: [
      "Assist residents with Activities of Daily Living (ADLs)",
      "Monitor residents' health by taking vital signs, observing changes in behavior or condition, and reporting findings accurately.",
      "Administer medications following prescribed care plans while adhering to HIPAA regulations to maintain confidentiality.",
      "Support residents during meal preparation and feeding, ensuring nutritional needs are met safely.",
      "Maintain a clean and safe environment by performing routine cleaning tasks and adhering to infection control protocols.",
      "Implement individualized care plans designed by nursing or social work professionals to meet each resident's unique needs.",
      "Document observations meticulously and update care records in compliance with healthcare standards."
    ],
    requirements: [
      "Valid drivers license",
      "Vehicle Registration Required",
      "Negative TB/PPD completed in the last 6 months",
      "CPR/FA/AED from either American Red Cross or American Heart Association",
      "Clean background",
      "Proof of Education",
      "At least 1 years of experience with the vulnerable population"
    ]
  },
  {
    id: 2,
    category: "Nursing",
    schedule: "Nights, 3x12",
    duration: "13 weeks",
    title: "Registered Nurse (ICU)",
    location: "Baltimore, Maryland",
    datePosted: "Dec 20, 2025",
    startingPrice: "$3,850/wk",
    payRate: "$105/Hour",
    buttonLabel: "View job details",
    type: "Travel Contract",
    fullDescription: "Join a high-performing Critical Care team in Baltimore. We are looking for experienced ICU Nurses capable of handling high-acuity patients in a fast-paced environment. You will be responsible for continuous monitoring, medication administration, and collaborating with a multidisciplinary team to ensure the best patient outcomes.",
    schedulesAvailable: "Nights, 3 shifts per week, 12 hours per shift (7PM - 7AM)",
    contractLength: "13 Weeks with potential for extension",
    duties: [
      "Monitor vital signs and patient condition continuously",
      "Administer complex medications and monitor effects",
      "Operate life support equipment and interpret data",
      "Maintain detailed patient records and care plans",
      "Communicate effectively with families and medical staff"
    ],
    requirements: [
      "Active RN License in MD or Compact State",
      "Minimum 2 years ICU experience",
      "BLS & ACLS Certification required",
      "Experience with electronic medical records (Epic preferred)"
    ]
  },
  {
    id: 3,
    category: "Laboratory",
    schedule: "Evenings, 5x8",
    duration: "13 weeks",
    title: "Phlebotomist",
    location: "San Diego, California",
    datePosted: "Dec 22, 2025",
    startingPrice: "$1,950/wk",
    payRate: "$48/Hour",
    buttonLabel: "View job details",
    type: "Short-term Contract",
    fullDescription: "Our mobile collection team in San Diego needs a skilled Phlebotomist. You will visit various corporate sites and clinics to perform blood draws. Accuracy, patient comfort, and strict adherence to safety protocols are paramount.",
    schedulesAvailable: "Monday - Friday, 2PM - 10PM",
    contractLength: "13 Weeks initial term",
    duties: [
      "Perform high-volume venipuncture and capillary draws",
      "Verify patient identity and label samples accurately",
      "Process and prepare samples for transport",
      "Maintain clean and organized collection stations",
      "Provide clear post-draw instructions to patients"
    ],
    requirements: [
      "Certified Phlebotomy Technician (CPT I or II)",
      "At least 1 year of high-volume experience",
      "Strong communication and bedside manner",
      "Reliable transportation for site visits"
    ]
  },
  {
    id: 4,
    category: "Imaging",
    schedule: "Days, 4x10",
    duration: "26 weeks",
    title: "Radiology Technologist",
    location: "Seattle, Washington",
    datePosted: "Dec 18, 2025",
    startingPrice: "$3,200/wk",
    payRate: "$80/Hour",
    buttonLabel: "View job details",
    type: "Long-term Contract",
    fullDescription: "Seeking a versatile Radiology Tech for a major health system in Seattle. Candidates should be proficient in X-ray and at least one other modality (CT preferred). You will work in both outpatient and emergency settings.",
    schedulesAvailable: "4 days per week, 10 hours per day (Flexible weekdays)",
    contractLength: "26 Weeks",
    duties: [
      "Position patients for optimal imaging results",
      "Operate radiographic equipment safely and efficiently",
      "Ensure radiation safety protocols are strictly followed",
      "Process images and upload to PACS",
      "Collaborate with radiologists on complex cases"
    ],
    requirements: [
      "ARRT Certification required",
      "State of Washington Radiologic Technologist License",
      "Minimum 3 years hospital experience",
      "BLS Certification"
    ]
  },
  {
    id: 5,
    category: "Therapy",
    schedule: "Days, 5x8",
    duration: "Ongoing",
    title: "Physical Therapist",
    location: "Charlottesville, Virginia",
    datePosted: "Dec 15, 2025",
    startingPrice: "$2,200/wk",
    payRate: "$55/Hour",
    buttonLabel: "View job details",
    type: "Permanent Placement",
    fullDescription: "Grow your career in a supportive outpatient rehab center. We focus on evidence-based practices and personalized care. As a Physical Therapist, you will manage a varied caseload of orthopedic and geriatric patients.",
    schedulesAvailable: "Monday - Friday, 8AM - 4PM",
    contractLength: "Permanent / Full-Time Role",
    duties: [
      "Conduct thorough initial evaluations and assessments",
      "Develop and implement customized treatment plans",
      "Educate patients and families on home exercise programs",
      "Track patient progress and adjust treatments as needed",
      "Maintain compliant documentation in a timely manner"
    ],
    requirements: [
      "Doctor of Physical Therapy (DPT) degree",
      "Active Physical Therapist License in VA",
      "New grads welcome to apply (mentorship available)",
      "Passion for patient-centered care"
    ]
  },
  {
    id: 6,
    category: "Nursing Support",
    schedule: "Weekends, 2x12",
    duration: "12 weeks",
    title: "Licensed Practical Nurse (LPN)",
    location: "Austin, Texas",
    datePosted: "Dec 21, 2025",
    startingPrice: "$1,600/wk",
    payRate: "$65/Hour",
    buttonLabel: "View job details",
    type: "Weekend Contract",
    fullDescription: "Support a premier senior living facility in Austin. We need a reliable LPN for our weekend shift. You will be responsible for medication administration, wound care, and supervising CNA staff to ensure high-quality care for our residents.",
    schedulesAvailable: "Saturday & Sunday, 7AM - 7PM (12-hour shifts)",
    contractLength: "12 Weeks (Renewable)",
    duties: [
      "Administer medications and treatments per orders",
      "Perform wound care and dressing changes",
      "Supervise and support CNA team members",
      "Document resident status changes and incidents",
      "Communicate with physicians and families"
    ],
    requirements: [
      "Current LPN License in TX or Compact",
      "CPR/BLS Certification",
      "Experience in long-term care or geriatrics",
      "Reliability and punctuality"
    ]
  }
];

interface JobSearchResultsPageProps {
  onNavigate?: (page: string) => void;
}

const page: React.FC<JobSearchResultsPageProps> = ({ onNavigate }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All job categories");
  const [selectedLocation, setSelectedLocation] = useState("All locations");
  const [selectedType, setSelectedType] = useState("All job types");
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [selectedJob, setSelectedJob] = useState<JobResult | null>(null);

  const categories = useMemo(() => ["All job categories", ...new Set(JOB_RESULTS.map(j => j.category))], []);
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

  if (selectedJob) {
    return (
      <div className="bg-white min-h-screen pt-40">
        <div className="max-w-7xl mx-auto px-6 pb-32">
          {/* Back Button */}
          <button 
            onClick={() => setSelectedJob(null)}
            className="flex items-center gap-2 px-5 py-2.5 bg-[#E3E8DE] hover:bg-[#D8DDD3] text-[#1B2C42] rounded-full text-[13px] font-bold transition-all mb-10 w-fit active:scale-95"
          >
            <ArrowLeft size={16} /> Back
          </button>

          {/* Job Title */}
          <h1 className="font-serif text-[48px] md:text-[56px] text-[#1B2C42] mb-3 leading-tight tracking-tight">
            {selectedJob.title}
          </h1>

          {/* Pay Rate */}
          <div className="mb-10">
            <p className="text-[#1B2C42] text-xl font-bold">
              Pay Rate: <span className="text-[#1B2C42]">{selectedJob.payRate}</span>
            </p>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-3 mb-12">
            {[selectedJob.category, selectedJob.datePosted, selectedJob.location, selectedJob.type].map((tag, i) => (
              <div key={i} className="px-6 py-3 bg-[#F4F6F8] rounded-full text-[#1B2C42] text-sm font-bold shadow-sm">
                {tag}
              </div>
            ))}
          </div>

          {/* Description Content */}
          <div className="max-w-7xl space-y-12 text-[#1B2C42]/90 leading-relaxed text-[18px]">
            <p className="font-normal">{selectedJob.fullDescription}</p>

            <div className="space-y-4">
              <h2 className="font-bold text-[16px] uppercase tracking-wider text-[#1B2C42]">SCHEDULES AVAILABLE:</h2>
              <p className="font-normal">{selectedJob.schedulesAvailable}</p>
            </div>

            <div className="space-y-4">
              <h2 className="font-bold text-[16px] uppercase tracking-wider text-[#1B2C42]">CONTRACT LENGTH</h2>
              <p className="font-normal">{selectedJob.contractLength}</p>
            </div>

            {selectedJob.duties && (
              <div className="space-y-6">
                <h2 className="font-bold text-[16px] uppercase tracking-wider text-[#1B2C42]">DUTIES</h2>
                <ul className="list-disc pl-5 space-y-3 font-normal">
                  {selectedJob.duties.map((duty, idx) => (
                    <li key={idx} className="pl-2">{duty}</li>
                  ))}
                </ul>
              </div>
            )}

            {selectedJob.requirements && (
              <div className="space-y-6">
                <h2 className="font-bold text-[16px] uppercase tracking-wider text-[#1B2C42]">CLIENT'S REQUIRED SKILLS & EXPERIENCE</h2>
                <ul className="list-disc pl-5 space-y-3 font-normal">
                  {selectedJob.requirements.map((req, idx) => (
                    <li key={idx} className="pl-2">{req}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Apply Button */}
            <div className="pt-12">
              <button className="bg-[#68cfa3] hover:bg-[#5abf94] text-white px-12 py-4.5 rounded-full text-[15px] font-bold flex items-center gap-2 transition-all shadow-xl shadow-teal-500/10 active:scale-95">
                Apply Now <ArrowRight size={20} />
              </button>
            </div>
          </div>
        </div>
        <SubmitCV onNavigate={onNavigate} />
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen flex flex-col">
      <div className="max-w-7xl mx-auto px-6 pt-40 pb-32 w-full">
        <h1 className="font-serif text-5xl md:text-[64px] text-center text-[#1a1a1a] mb-12">
          Explore Career Opportunities
        </h1>

        <div className="max-w-4xl mx-auto mb-20 flex gap-4">
          <div className="flex-1 bg-[#E3E8DE]/60 rounded-full h-16 px-8 flex items-center gap-4 border border-transparent focus-within:border-teal-400/50 transition-all shadow-sm">
            <Search className="text-gray-500 w-6 h-6" />
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search your discipline or location" 
              className="bg-transparent border-none outline-none text-gray-800 placeholder-gray-500 w-full h-full text-lg font-light"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery("")} className="p-1 hover:bg-gray-200 rounded-full">
                <X size={16} className="text-gray-400" />
              </button>
            )}
          </div>
          <button className="h-16 px-12 bg-[#1B2C42] hover:bg-[#152336] text-white text-lg font-bold rounded-full flex items-center justify-center gap-2 transition-transform active:scale-95 shadow-lg whitespace-nowrap">
            Search <ArrowRight size={20} />
          </button>
        </div>

        <div className="relative flex flex-wrap items-center gap-x-12 gap-y-6 mb-16 border-b border-gray-100 pb-4 z-30" ref={dropdownRef}>
          {/* Filters Row */}
          {[
            { label: selectedCategory, options: categories, setter: setSelectedCategory, type: 'category' },
            { label: selectedLocation, options: locations, setter: setSelectedLocation, type: 'location' },
            { label: selectedType, options: types, setter: setSelectedType, type: 'type' }
          ].map((filter) => (
            <div key={filter.type} className="relative">
              <div 
                onClick={() => toggleDropdown(filter.type)}
                className={`flex items-center gap-2 group cursor-pointer border-b-2 pb-1 transition-colors ${filter.label.includes('All') ? 'border-gray-400' : 'border-teal-500'}`}
              >
                <span className={`font-semibold text-sm ${filter.label.includes('All') ? 'text-gray-700' : 'text-teal-600'}`}>
                  {filter.label}
                </span>
                <ChevronDown size={16} className={`text-gray-400 group-hover:text-gray-700 transition-transform ${activeDropdown === filter.type ? 'rotate-180' : ''}`} />
              </div>
              {activeDropdown === filter.type && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-white border border-gray-100 rounded-lg shadow-2xl py-2 animate-in fade-in slide-in-from-top-2 duration-200">
                  {filter.options.map(opt => (
                    <div 
                      key={opt}
                      onClick={() => { filter.setter(opt); setActiveDropdown(null); }}
                      className={`px-4 py-2.5 text-sm hover:bg-gray-50 transition-colors ${filter.label === opt ? 'bg-teal-50 text-teal-600 font-bold' : 'text-gray-700'}`}
                    >
                      {opt}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
          <button onClick={clearAll} className="text-[#1B2C42] font-bold text-sm hover:underline ml-auto flex items-center gap-1.5 opacity-70 hover:opacity-100 transition-opacity">
            <X size={14} /> Clear All
          </button>
        </div>

        <div className="mb-8">
          <p className="text-gray-500 text-sm">
            Showing <span className="text-[#1B2C42] font-bold">{filteredJobs.length}</span> job opportunities
          </p>
        </div>

        {filteredJobs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredJobs.map((job) => (
              <div 
                key={job.id} 
                onClick={() => handleJobClick(job)}
                className="bg-[#E9ECF5] rounded-[5px] p-8 flex flex-col h-full hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group cursor-pointer"
              >
                <div className="mb-6">
                  <div className="flex justify-between items-start mb-4">
                    <p className="text-[11px] text-gray-500 font-bold uppercase tracking-wider">
                      {job.category} • {job.schedule} • {job.duration}
                    </p>
                    <span className="bg-white/50 text-[10px] px-2 py-0.5 rounded font-bold text-[#1B2C42] uppercase tracking-tighter">
                      {job.type}
                    </span>
                  </div>
                  <h3 className="font-serif text-[28px] text-[#1B2C42] leading-tight mb-6 min-h-[70px] group-hover:text-teal-600 transition-colors">
                    {job.title}
                  </h3>
                  <div className="space-y-1">
                    <p className="text-gray-600 text-sm font-medium">{job.location}</p>
                    <p className="text-gray-500 text-[12px]">Date Posted: {job.datePosted}</p>
                  </div>
                </div>

                <div className="mt-auto pt-6 border-t border-gray-300/30">
                  <p className="text-[#1B2C42] text-xl font-bold mb-6">
                    Starting at <span className="font-black">{job.startingPrice}</span>
                  </p>
                  <button className="w-full bg-teal-400 hover:bg-teal-500 text-[#1B2C42] py-4 rounded-full text-sm font-bold transition-all shadow-md active:scale-95">
                    {job.buttonLabel}
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-20 text-center flex flex-col items-center justify-center bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-6">
              <Search className="text-gray-300 w-8 h-8" />
            </div>
            <h2 className="font-serif text-3xl text-[#1B2C42] mb-4">No jobs found</h2>
            <button onClick={clearAll} className="bg-[#1B2C42] text-white px-8 py-3 rounded-full font-bold hover:bg-[#152336] transition-all">
              Reset Filters
            </button>
          </div>
        )}
      </div>
      <SubmitCV onNavigate={onNavigate} />
    </div>
  );
};

export default page;