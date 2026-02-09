'use client';
import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Search, ArrowRight, ChevronDown, X, ArrowLeft, Loader2 } from 'lucide-react';
import SubmitCV from '../components/SubmitCV';
import { useRouter } from 'next/navigation';

interface JobResult {
  id: number;
  title: string;
  role: string;
  location: string;
  wages: string;
  date: string;
  status: 'Active' | 'Deactived' | 'Filled' | 'Closed';
  category: string;
  schedule: string;
  duration: string;
  datePosted: string;
  startingPrice: string;
  payRate: string;
  buttonLabel: string;
  type: string;
  fullDescription: string;
  schedulesAvailable: string;
  duties: string[];
  requirements: string[];
  city?: string;
  state?: string;
  job_type?: string;
  dutiesText?: string;
  skills?: string;
  contractLength?: string;
  workingDays?: string;
  workingHours?: string;
  additionalDescription?: string;
}

// Convert database job to frontend format
const convertDbJobToJobResult = (dbJob: any): JobResult => {
  // Extract category from role or use default
  const getCategory = (role: string): string => {
    const roleLower = role.toLowerCase();
    if (roleLower.includes('nurse') || roleLower.includes('rn') || roleLower.includes('lpn')) {
      return 'Nursing';
    } else if (roleLower.includes('assistant') || roleLower.includes('cna') || roleLower.includes('gna') || roleLower.includes('cma') || roleLower.includes('cmt')) {
      return 'Nursing Support';
    } else if (roleLower.includes('phlebotomist') || roleLower.includes('laboratory')) {
      return 'Laboratory';
    } else if (roleLower.includes('support professional') || roleLower.includes('direct care')) {
      return 'Direct Care Services';
    }
    return 'Healthcare';
  };

  // Extract schedule from working days/hours
  const getSchedule = (workingDays?: string, workingHours?: string): string => {
    console.log('Extracting schedule from:', { workingDays, workingHours });
    if (workingDays && workingHours) {
      return `${workingDays}, ${workingHours}`;
    }
    return 'Days, 5x8'; // Default schedule
  };

  // Extract duration from contract length
  const getDuration = (contractLength?: string): string => {
    if (contractLength) {
      return contractLength;
    }
    return '26 weeks'; // Default duration
  };

  // Calculate starting price from wages
  const getStartingPrice = (wages: string): string => {
    // Extract hourly rate from wages string
    const hourlyMatch = wages.match(/\$(\d+)/);
    if (hourlyMatch) {
      const hourlyRate = parseFloat(hourlyMatch[1]);
      const weeklyRate = hourlyRate * 36; // Assuming 36-hour work week
      return `$${weeklyRate.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}/wk`;
    }
    return '$2,000/wk'; // Default if can't parse
  };

  // Extract pay rate from wages
  const getPayRate = (wages: string): string => {
    if (wages.includes('/hour')) {
      return wages.replace('/hour', '/Hour');
    }
    return wages || '$30/Hour';
  };

  // Parse duties text into array
  const parseDuties = (duties?: string): string[] => {
    if (!duties) return [];
    // Split by common separators
    const separators = /[•\n\r\t]/;
    return duties
      .split(separators)
      .map(duty => duty.trim())
      .filter(duty => duty.length > 0)
      .slice(0, 7); // Limit to 7 duties
  };

  // Parse skills/requirements into array
  const parseRequirements = (skills?: string): string[] => {
    if (!skills) return [];
    // Split by common separators
    const separators = /[•\n\r\t]/;
    return skills
      .split(separators)
      .map(skill => skill.trim())
      .filter(skill => skill.length > 0)
      .slice(0, 6); // Limit to 6 requirements
  };

  return {
    id: dbJob.id,
    title: dbJob.title || 'Job Title',
    role: dbJob.role || 'Healthcare Professional',
    location: dbJob.location || `${dbJob.city || 'City'}, ${dbJob.state || 'State'}`,
    wages: dbJob.wages || '$30/hour',
    date: dbJob.date || new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    status: dbJob.status || 'Active',
    category: getCategory(dbJob.role || ''),
    schedule: getSchedule(dbJob.workingDays, dbJob.workingHours),
    duration: getDuration(dbJob.contractLength),
    datePosted: dbJob.date || new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    startingPrice: getStartingPrice(dbJob.wages || '$30/hour'),
    payRate: getPayRate(dbJob.wages || '$30/hour'),
    buttonLabel: 'View job details',
    type: dbJob.job_type || 'Contract Role',
    fullDescription: dbJob.additionalDescription || dbJob.dutiesText || 'Join our healthcare team as a dedicated professional providing essential care and support to patients in need. This position offers opportunities for growth and development in a supportive environment.',
    schedulesAvailable: `Schedules: ${dbJob.workingDays || '5 days/week'}, ${dbJob.workingHours || '8 hours/day'}`,
    // contract_Length: `This is a ${dbJob.contractLength?.toLowerCase() || '26 week'} contract with potential for extension`,
    duties: parseDuties(dbJob.dutiesText),
    requirements: parseRequirements(dbJob.skills),
    // Include all database fields for completeness
    city: dbJob.city,
    state: dbJob.state,
    job_type: dbJob.job_type,
    dutiesText: dbJob.dutiesText,
    skills: dbJob.skills,
    contractLength: dbJob.contractLength,
    workingDays: dbJob.workingDays,
    workingHours: dbJob.workingHours,
    additionalDescription: dbJob.additionalDescription
  };
};

const JobSearchResultsPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All job categories");
  const [selectedLocation, setSelectedLocation] = useState("All locations");
  const [selectedType, setSelectedType] = useState("All job types");
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [selectedJob, setSelectedJob] = useState<JobResult | null>(null);
  const [jobs, setJobs] = useState<JobResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Fetch jobs from API
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch('/api/jobs?action=get-all');
        const data = await response.json();
        
        if (data.success && data.data) {
          console.log('Raw jobs data from API:', data.data);
          // Convert database jobs to frontend format
          const convertedJobs = data.data.map(convertDbJobToJobResult);
                    console.log('Converted jobs data:', convertedJobs);

          setJobs(convertedJobs);
          console.log('Converted jobs data:', convertedJobs);
        } else {
          setError(data.message || 'Failed to fetch jobs');
          // Fallback to sample data
          setJobs(getSampleJobs());
        }
      } catch (err) {
        console.error('Error fetching jobs:', err);
        setError('Failed to load jobs. Please try again.');
        // Fallback to sample data
        setJobs(getSampleJobs());
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  // Sample data fallback
  const getSampleJobs = (): JobResult[] => {
    return [
      {
        id: 1,
        category: "Nursing",
        schedule: "Days, 4x10",
        duration: "26 weeks",
        title: "Registered Nurse (RN)",
        role: "Registered Nurse (RN)",
        location: "Springfield, Illinois",
        date: "Dec 23, 2025",
        datePosted: "Dec 23, 2025",
        startingPrice: "$2,850/wk",
        payRate: "$71/Hour",
        buttonLabel: "View job details",
        type: "Contract Role",
        status: "Active",
        wages: "$71/hour",
        fullDescription: "We are seeking a dedicated Registered Nurse to provide comprehensive patient care in various healthcare settings.",
        schedulesAvailable: "Schedules: working 4 days per week, 10 hours per day",
        contractLength: "This is a temporary contract lasting for 26 Weeks",
        duties: [
          "Perform physical exams and health histories",
          "Administer medications and treatments",
          "Coordinate patient care in collaboration with a wide array of healthcare professionals"
        ],
        requirements: [
          "Valid RN License in state of practice",
          "BLS Certification required",
          "ACLS Certification preferred"
        ]
      }
    ];
  };

  // Extract unique categories, locations, and types from jobs
  const categories = useMemo(() => {
    const uniqueCategories = Array.from(new Set(jobs.map(j => j.category)));
    return ["All job categories", ...uniqueCategories];
  }, [jobs]);

  const locations = useMemo(() => {
    const uniqueLocations = Array.from(new Set(jobs.map(j => j.location)));
    return ["All locations", ...uniqueLocations];
  }, [jobs]);

  const types = useMemo(() => {
    const uniqueTypes = Array.from(new Set(jobs.map(j => j.type)));
    return ["All job types", ...uniqueTypes];
  }, [jobs]);

  const filteredJobs = useMemo(() => {
    return jobs.filter(job => {
      const matchesSearch = 
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        job.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.category.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = 
        selectedCategory === "All job categories" || job.category === selectedCategory;
      
      const matchesLocation = 
        selectedLocation === "All locations" || job.location === selectedLocation;
      
      const matchesType = 
        selectedType === "All job types" || job.type === selectedType;

      // Only show active jobs
      const isActive = job.status === 'Active';

      return matchesSearch && matchesCategory && matchesLocation && matchesType && isActive;
    });
  }, [searchQuery, selectedCategory, selectedLocation, selectedType, jobs]);

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
      type: job.type,
      role: job.role
    }));
    
    // Navigate to the submit resume page
    router.push('/submitresume');
  };

  if (loading) {
    return (
      <div className="bg-white min-h-screen flex flex-col items-center justify-center pt-32 md:pt-40">
        <div className="text-center">
          <Loader2 className="animate-spin mx-auto mb-4 text-[#68cfa3]" size={48} />
          <div className="text-[#1B2C42] font-serif text-xl">Loading job opportunities...</div>
        </div>
      </div>
    );
  }

  if (selectedJob) {
    return (
      <div className="bg-white min-h-screen pt-32 md:pt-40">
        <div className="max-w-7xl mx-auto px-4 md:px-6 pb-20 md:pb-32">
          <button 
            onClick={() => setSelectedJob(null)}
            className="flex items-center gap-2 px-4 py-2 bg-[#E3E8DE] hover:bg-[#D8DDD3] text-[#1B2C42] rounded-full text-[12px] md:text-[13px] font-bold transition-all mb-8 md:mb-10 w-fit active:scale-95 cursor-pointer"
          >
            <ArrowLeft size={16} /> Back to Jobs
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

            {selectedJob.duties && selectedJob.duties.length > 0 && (
              <div className="space-y-4 md:space-y-6">
                <h2 className="font-bold text-sm md:text-[16px] uppercase tracking-wider text-[#1B2C42]">DUTIES</h2>
                <ul className="list-disc pl-5 space-y-2 md:space-y-3 font-normal">
                  {selectedJob.duties.map((duty, idx) => (
                    <li key={idx} className="pl-2">{duty}</li>
                  ))}
                </ul>
              </div>
            )}

            {selectedJob.requirements && selectedJob.requirements.length > 0 && (
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
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
            {error} <button onClick={() => window.location.reload()} className="ml-2 underline">Try Again</button>
          </div>
        )}
        
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
              placeholder="Search job title, role, or location" 
              className="bg-transparent border-none outline-none text-gray-800 placeholder-gray-500 w-full h-full text-sm md:text-base font-medium"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery("")} className="p-1.5 hover:bg-gray-200 rounded-full transition-colors cursor-pointer">
                <X size={14} className="text-gray-400" />
              </button>
            )}
          </div>
          <button 
            onClick={() => {}} // Search is already handled by the input
            className="h-12 md:h-14 px-8 md:px-10 bg-[#1B2C42] hover:bg-[#152336] text-white text-sm md:text-base font-bold rounded-full flex items-center justify-center gap-2 transition-transform active:scale-95 shadow-lg whitespace-nowrap cursor-pointer"
          >
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