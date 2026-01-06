'use client';

import { useState, useMemo, useRef, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Search, ChevronDown, ChevronLeft, ChevronRight, Check, X, Calendar, ArrowRight, Loader2, Edit2 } from 'lucide-react';

interface Job {
  id: number;
  title: string;
  role: string;
  location: string;
  wages: string;
  date: string;
  status: 'Active' | 'Deactived';
  city?: string;
  state?: string;
  duties?: string;
  skills?: string;
  contractLength?: string;
  workingDays?: string;
  workingHours?: string;
  additionalDescription?: string;
  hasChevron?: boolean;
}

const INITIAL_JOBS: Job[] = Array.from({ length: 100 }, (_, i) => ({
  id: i + 1,
  title: i % 2 === 0 ? "Richmond Support Homes" : "Maryland Care Center",
  role: i % 3 === 0 ? "Direct Support Professional" : i % 3 === 1 ? "Registered Nurse (RN)" : "Case Manager",
  location: i % 3 === 0 ? "Charlottesville, CA" : "Baltimore, MD",
  wages: "$30/hour",
  date: "Dec 20, 2025",
  status: 'Active',
  city: i % 3 === 0 ? "Charlottesville" : "Baltimore",
  state: i % 3 === 0 ? "California" : "Maryland",
  duties: "Assist residents with Activities of Daily Living (ADLs). Monitor residents' health by taking vital signs, observing changes in behavior or condition, and reporting findings accurately. Administer medications following prescribed care plans while adhering to HIPAA regulations to maintain confidentiality.",
  skills: "Valid drivers license. Vehicle Registration Required. Negative TB/PPD completed in the last 6 months. CPR/FA/AED from either American Red Cross or American Heart Association. Clean background.",
  contractLength: "26 Weeks",
  workingDays: "5 days/week",
  workingHours: "24 hours/day",
  additionalDescription: "Our Client is seeking a dedicated and compassionate Direct Support Professional to provide essential assistance and care to individuals with developmental disabilities, mental health challenges, or age-related conditions such as dementia and Alzheimer's disease. The ideal candidate will play a vital role in promoting independence, ensuring safety, and enhancing the quality of life in a group home setting.",
  hasChevron: i === 1 || i === 2 
}));

interface AdminJobsPageProps {
  onLogout: () => void;
  currentPage: string;
}

export default function AdminJobsPage({ onLogout, currentPage: activePageId }: AdminJobsPageProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const autoOpenCreate = searchParams.get('autoOpenCreate') === 'true';
  
  const [jobs, setJobs] = useState<Job[]>(INITIAL_JOBS);
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("All job categories");
  const [typeFilter, setTypeFilter] = useState("All job types");
  const [sortFilter, setSortFilter] = useState("Newest");
  const [currentPage, setCurrentPage] = useState(1);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [selectedJobId, setSelectedJobId] = useState<number | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  
  const itemsPerPage = 10;
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (autoOpenCreate) {
      setIsCreating(true);
      // Remove the query parameter from URL
      router.replace('/admin/joblistings');
    }
  }, [autoOpenCreate, router]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedJob = useMemo(() => 
    jobs.find(j => j.id === selectedJobId) || null
  , [selectedJobId, jobs]);

  const filteredJobs = useMemo(() => {
    const filtered = jobs.filter(job => {
      const matchesSearch = 
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.role.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesRole = roleFilter === "All job categories" || job.role === roleFilter;
      const matchesType = typeFilter === "All job types" || job.wages.includes(typeFilter); // Simplified match
      
      return matchesSearch && matchesRole && matchesType;
    });

    return [...filtered].sort((a, b) => {
      if (sortFilter === "Newest") return b.id - a.id;
      if (sortFilter === "Oldest") return a.id - b.id;
      return 0;
    });
  }, [searchQuery, roleFilter, typeFilter, sortFilter, jobs]);

  const totalPages = Math.ceil(filteredJobs.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredJobs.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleCreateJob = (newJob: Omit<Job, 'id' | 'date' | 'status'>) => {
    const jobToAdd: Job = {
      ...newJob,
      id: jobs.length + 1,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      status: 'Active'
    };
    setJobs(prev => [jobToAdd, ...prev]);
    setIsCreating(false);
  };

  const handleUpdateJob = (updatedJob: Job) => {
    setJobs(prev => prev.map(j => j.id === updatedJob.id ? updatedJob : j));
    setSelectedJobId(null);
  };

  const DropdownItem = ({ label, current, setter, value }: { label: string, current: string, setter: (val: string) => void, value: string }) => (
    <div onClick={() => { setter(value); setActiveDropdown(null); }} className={`px-6 py-2.5 text-sm cursor-pointer hover:bg-teal-50 flex items-center justify-between ${current === value ? 'text-teal-600 font-bold bg-teal-50' : 'text-gray-700'}`}>
      {label} {current === value && <Check size={14} />}
    </div>
  );

  return (
    <div className="min-h-screen bg-white font-sans text-[#1B2C42]">
      <main className="max-w-[1440px] mx-auto px-8 md:px-12 py-12">
        <div className="flex items-center justify-between mb-10">
          <h1 className="font-serif text-[42px] leading-tight font-normal">Job Listings</h1>
          <button 
            onClick={() => setIsCreating(true)}
            className="bg-[#68cfa3] hover:bg-[#5abf94] text-[#1B2C42] px-8 py-4 rounded-full text-sm font-bold shadow-lg transition-all active:scale-95 flex items-center gap-2"
          >
            Create Job Listing <ArrowRight size={18} />
          </button>
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-6 mb-10" ref={dropdownRef}>
          <div className="flex-1 w-full bg-white border border-gray-200 rounded-full h-12 px-6 flex items-center gap-3 shadow-sm focus-within:border-[#68cfa3]">
            <Search className="text-gray-400 w-5 h-5" />
            <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search property by name and address" className="bg-transparent border-none outline-none text-[#1B2C42] text-sm font-medium w-full" />
          </div>

          <div className="flex items-center gap-4">
            <div className="relative min-w-[160px]">
              <div onClick={() => setActiveDropdown(activeDropdown === 'role' ? null : 'role')} className="h-12 border border-gray-200 rounded-full px-6 flex items-center justify-between bg-white cursor-pointer text-gray-500 text-sm font-medium">
                <span>{roleFilter === "All job categories" ? "Filter by Role" : roleFilter}</span><ChevronDown size={18} />
              </div>
              {activeDropdown === 'role' && (
                <div className="absolute top-full right-0 w-full mt-2 bg-white border border-gray-100 rounded-xl shadow-xl z-20 py-2">
                  {["All job categories", "Direct Support Professional", "Registered Nurse (RN)", "Case Manager"].map(opt => <DropdownItem key={opt} label={opt} value={opt} current={roleFilter} setter={setRoleFilter} />)}
                </div>
              )}
            </div>
            <div className="relative min-w-[200px]">
              <div onClick={() => setActiveDropdown(activeDropdown === 'type' ? null : 'type')} className="h-12 border border-gray-200 rounded-full px-6 flex items-center justify-between bg-white cursor-pointer text-gray-500 text-sm font-medium">
                <span>{typeFilter === "All job types" ? "Filter by Request Type" : typeFilter}</span><ChevronDown size={18} />
              </div>
              {activeDropdown === 'type' && (
                <div className="absolute top-full right-0 w-full mt-2 bg-white border border-gray-100 rounded-xl shadow-xl z-20 py-2">
                  {["All job types", "Contract Role", "Project-Based", "Permanent Hires"].map(opt => <DropdownItem key={opt} label={opt} value={opt} current={typeFilter} setter={setTypeFilter} />)}
                </div>
              )}
            </div>
            <div className="relative min-w-[120px]">
              <div onClick={() => setActiveDropdown(activeDropdown === 'sort' ? null : 'sort')} className="h-12 border border-gray-200 rounded-full px-6 flex items-center justify-between bg-white cursor-pointer text-gray-500 text-sm font-medium">
                <span>{sortFilter}</span><ChevronDown size={18} />
              </div>
              {activeDropdown === 'sort' && (
                <div className="absolute top-full right-0 w-full mt-2 bg-white border border-gray-100 rounded-xl shadow-xl z-20 py-2">
                  {["Newest", "Oldest"].map(opt => <DropdownItem key={opt} label={opt} value={opt} current={sortFilter} setter={setSortFilter} />)}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-[4px] overflow-hidden shadow-sm">
          <table className="w-full text-left border-collapse min-w-[900px]">
            <thead>
              <tr className="bg-[#E3E8DE] text-[#1B2C42] text-[14px] font-bold">
                <th className="px-8 py-5">Job Title / Role</th>
                <th className="px-8 py-5">Location</th>
                <th className="px-8 py-5">Salary/Wages</th>
                <th className="px-8 py-5">Date Posted</th>
                <th className="px-8 py-5 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {currentItems.map((job) => (
                <tr key={job.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-8 py-6 text-[14px] text-[#1B2C42] font-medium">{job.title}</td>
                  <td className="px-8 py-6 text-[14px] text-[#1B2C42] font-medium">{job.location}</td>
                  <td className="px-8 py-6 text-[14px] text-[#1B2C42] font-medium">{job.wages}</td>
                  <td className="px-8 py-6 text-[14px] text-[#1B2C42] font-medium">{job.date}</td>
                  <td className="px-8 py-6 text-center">
                    <button onClick={() => setSelectedJobId(job.id)} className="text-[14px] font-bold text-[#1B2C42] hover:text-[#68cfa3] transition-colors">View</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="px-8 py-6 flex flex-col sm:flex-row items-center justify-between border-t border-gray-100 gap-6">
            <p className="text-[14px] text-gray-500 font-medium">Showing {startIndex + 1} - {Math.min(startIndex + itemsPerPage, filteredJobs.length)} of {filteredJobs.length}</p>
            <div className="flex items-center gap-2">
              <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 rounded-full disabled:opacity-30"><ChevronLeft size={20} /></button>
              <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 rounded-full disabled:opacity-30"><ChevronRight size={20} /></button>
            </div>
          </div>
        </div>
      </main>

      {selectedJob && (
        <JobModal job={selectedJob} onClose={() => setSelectedJobId(null)} onUpdate={handleUpdateJob} />
      )}

      {isCreating && (
        <CreateJobModal onSubmit={handleCreateJob} onClose={() => setIsCreating(false)} />
      )}
    </div>
  );
}

const CreateJobModal: React.FC<{ onSubmit: (newJob: any) => void; onClose: () => void; }> = ({ onSubmit, onClose }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    role: '',
    city: 'Charlottesville',
    state: 'California',
    jobType: 'Contract Role',
    duties: '',
    skills: '',
    contractLength: '26 Weeks',
    workingDays: '5 days/week',
    workingHours: '24 hours/day',
    wages: '$30/hour',
    additionalDescription: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    setTimeout(() => {
      onSubmit({
        title: formData.title || "New Job Listing",
        role: formData.role || "Professional",
        location: `${formData.city}, ${formData.state}`,
        wages: formData.wages,
        city: formData.city,
        state: formData.state,
        duties: formData.duties,
        skills: formData.skills,
        contractLength: formData.contractLength,
        workingDays: formData.workingDays,
        workingHours: formData.workingHours,
        additionalDescription: formData.additionalDescription
      });
      setIsSubmitting(false);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative bg-white w-full max-w-[700px] rounded-[32px] overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        <button onClick={onClose} className="absolute top-8 right-8 p-2 text-gray-900 hover:opacity-70 z-20 transition-opacity">
          <X size={32} />
        </button>
        <div className="px-12 py-12 md:px-16 md:py-16 h-full overflow-y-auto max-h-[95vh] no-scrollbar">
          <div className="space-y-12">
            <h2 className="font-serif text-[38px] text-[#1B2C42] leading-tight">Create Job Listing</h2>

            <form className="space-y-8" onSubmit={handleSubmit}>
              {/* Job Title */}
              <div className="space-y-3">
                <label className="text-[16px] font-bold text-[#1B2C42]">Job Title / Role</label>
                <input 
                  type="text" 
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Enter job title/role/position" 
                  className="w-full h-[58px] px-6 border border-gray-100 rounded-[12px] text-[16px] focus:outline-none focus:border-[#68cfa3] placeholder:text-gray-300 bg-white"
                  required
                />
              </div>

              {/* Role Display Label (Not in image but used for table) */}
              <div className="space-y-3">
                <label className="text-[16px] font-bold text-[#1B2C42]">Professional Role (e.g. RN, DSP)</label>
                <input 
                  type="text" 
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  placeholder="Enter professional role" 
                  className="w-full h-[58px] px-6 border border-gray-100 rounded-[12px] text-[16px] focus:outline-none focus:border-[#68cfa3] placeholder:text-gray-300 bg-white"
                  required
                />
              </div>

              {/* City & State */}
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-3">
                  <label className="text-[16px] font-bold text-[#1B2C42]">City</label>
                  <input 
                    type="text" 
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="Charlottesville" 
                    className="w-full h-[58px] px-6 border border-gray-100 rounded-[12px] text-[16px] focus:outline-none focus:border-[#68cfa3] placeholder:text-gray-300 bg-white"
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-[16px] font-bold text-[#1B2C42]">State</label>
                  <input 
                    type="text" 
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    placeholder="California" 
                    className="w-full h-[58px] px-6 border border-gray-100 rounded-[12px] text-[16px] focus:outline-none focus:border-[#68cfa3] placeholder:text-gray-300 bg-white"
                  />
                </div>
              </div>

              {/* Job Type */}
              <div className="space-y-3">
                <label className="text-[16px] font-bold text-[#1B2C42]">Job type</label>
                <div className="relative">
                  <select 
                    name="jobType"
                    value={formData.jobType}
                    onChange={handleChange}
                    className="w-full h-[58px] px-6 appearance-none border border-gray-100 rounded-[12px] text-[16px] focus:outline-none focus:border-[#68cfa3] bg-white text-gray-500 cursor-pointer"
                  >
                    <option>Contract Role</option>
                    <option>Permanent Hire</option>
                    <option>Project-Based</option>
                  </select>
                  <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                    <ChevronDown size={20} />
                  </div>
                </div>
              </div>

              {/* Duties */}
              <div className="space-y-3">
                <label className="text-[16px] font-bold text-[#1B2C42]">Duties</label>
                <textarea 
                  name="duties"
                  value={formData.duties}
                  onChange={handleChange}
                  placeholder="Enter required duties" 
                  className="w-full h-[140px] p-6 border border-gray-100 rounded-[12px] text-[16px] focus:outline-none focus:border-[#68cfa3] placeholder:text-gray-300 resize-none bg-white"
                ></textarea>
              </div>

              {/* Required Skills */}
              <div className="space-y-3">
                <label className="text-[16px] font-bold text-[#1B2C42]">Required Skills & Experience</label>
                <textarea 
                  name="skills"
                  value={formData.skills}
                  onChange={handleChange}
                  placeholder="Enter skills and experience" 
                  className="w-full h-[140px] p-6 border border-gray-100 rounded-[12px] text-[16px] focus:outline-none focus:border-[#68cfa3] placeholder:text-gray-300 resize-none bg-white"
                ></textarea>
              </div>

              {/* Contract Length */}
              <div className="space-y-3">
                <label className="text-[16px] font-bold text-[#1B2C42]">Contract Length</label>
                <div className="relative">
                  <input 
                    type="text" 
                    name="contractLength"
                    value={formData.contractLength}
                    onChange={handleChange}
                    placeholder="26 Weeks" 
                    className="w-full h-[58px] px-6 border border-gray-100 rounded-[12px] text-[16px] focus:outline-none focus:border-[#68cfa3] placeholder:text-gray-300 bg-white"
                  />
                  <div className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-400">
                    <Calendar size={20} />
                  </div>
                </div>
              </div>

              {/* Working Days & Hours */}
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-3">
                  <label className="text-[16px] font-bold text-[#1B2C42]">Working Days</label>
                  <div className="relative">
                    <input 
                      type="text" 
                      name="workingDays"
                      value={formData.workingDays}
                      onChange={handleChange}
                      placeholder="5 days/week" 
                      className="w-full h-[58px] px-6 border border-gray-100 rounded-[12px] text-[16px] focus:outline-none focus:border-[#68cfa3] placeholder:text-gray-300 bg-white"
                    />
                    <div className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-400">
                      <Calendar size={20} />
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <label className="text-[16px] font-bold text-[#1B2C42]">Working Hours</label>
                  <input 
                    type="text" 
                    name="workingHours"
                    value={formData.workingHours}
                    onChange={handleChange}
                    placeholder="24 hours/day" 
                    className="w-full h-[58px] px-6 border border-gray-100 rounded-[12px] text-[16px] focus:outline-none focus:border-[#68cfa3] placeholder:text-gray-300 bg-white"
                  />
                </div>
              </div>

              {/* Salary */}
              <div className="space-y-3">
                <label className="text-[16px] font-bold text-[#1B2C42]">Salary/Wages</label>
                <input 
                  type="text" 
                  name="wages"
                  value={formData.wages}
                  onChange={handleChange}
                  placeholder="$30/hour" 
                  className="w-full h-[58px] px-6 border border-gray-100 rounded-[12px] text-[16px] focus:outline-none focus:border-[#68cfa3] placeholder:text-gray-300 bg-white"
                />
              </div>

              {/* Additional Description */}
              <div className="space-y-3">
                <label className="text-[16px] font-bold text-[#1B2C42]">Additional Description</label>
                <textarea 
                  name="additionalDescription"
                  value={formData.additionalDescription}
                  onChange={handleChange}
                  placeholder="Enter introductory comment" 
                  className="w-full h-[140px] p-6 border border-gray-100 rounded-[12px] text-[16px] focus:outline-none focus:border-[#68cfa3] placeholder:text-gray-300 resize-none bg-white"
                ></textarea>
              </div>

              {/* Post Button */}
              <div className="pt-8">
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-[#68cfa3] hover:bg-[#5abf94] text-[#1B2C42] px-12 py-5 rounded-full text-[16px] font-bold flex items-center justify-center gap-3 transition-all active:scale-95 shadow-lg shadow-teal-100 min-w-[220px]"
                >
                  {isSubmitting ? (
                    <Loader2 className="animate-spin" size={24} />
                  ) : (
                    <>Post job listing <ArrowRight size={20} /></>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

interface JobModalProps {
  job: Job;
  onClose: () => void;
  onUpdate: (job: Job) => void;
}

const JobModal: React.FC<JobModalProps> = ({ job, onClose, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: job.title,
    role: job.role,
    city: job.city || 'Charlottesville',
    state: job.state || 'California',
    jobType: job.wages.includes('Contract') ? 'Contract Role' : 'Permanent Hire',
    duties: job.duties || '',
    skills: job.skills || '',
    contractLength: job.contractLength || '26 Weeks',
    workingDays: job.workingDays || '5 days/week',
    workingHours: job.workingHours || '24 hours/day',
    wages: job.wages || '$30/hour',
    additionalDescription: job.additionalDescription || ''
  });

  useEffect(() => {
    setFormData({
      title: job.title,
      role: job.role,
      city: job.city || 'Charlottesville',
      state: job.state || 'California',
      jobType: job.wages.includes('Contract') ? 'Contract Role' : 'Permanent Hire',
      duties: job.duties || '',
      skills: job.skills || '',
      contractLength: job.contractLength || '26 Weeks',
      workingDays: job.workingDays || '5 days/week',
      workingHours: job.workingHours || '24 hours/day',
      wages: job.wages || '$30/hour',
      additionalDescription: job.additionalDescription || ''
    });
  }, [job]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    setTimeout(() => {
      const updatedJob: Job = {
        ...job,
        title: formData.title,
        role: formData.role,
        location: `${formData.city}, ${formData.state}`,
        wages: formData.wages,
        city: formData.city,
        state: formData.state,
        duties: formData.duties,
        skills: formData.skills,
        contractLength: formData.contractLength,
        workingDays: formData.workingDays,
        workingHours: formData.workingHours,
        additionalDescription: formData.additionalDescription
      };
      
      onUpdate(updatedJob);
      setIsSubmitting(false);
      setIsEditing(false);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative bg-white w-full max-w-[700px] rounded-[32px] overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        <button onClick={onClose} className="absolute top-8 right-8 p-2 text-gray-900 hover:opacity-70 z-20 transition-opacity">
          <X size={32} />
        </button>
        <div className="px-12 py-12 md:px-16 md:py-16 h-full overflow-y-auto max-h-[95vh] no-scrollbar">
          <div className="space-y-12">
            <div className="flex items-center justify-between">
              <h2 className="font-serif text-[38px] text-[#1B2C42] leading-tight">Job Title / Role</h2>
              {!isEditing && (
                <button 
                  onClick={() => setIsEditing(true)}
                  className="text-[#68cfa3] hover:text-[#5abf94] font-bold text-sm flex items-center gap-2 transition-colors"
                >
                  <Edit2 size={18} /> Edit
                </button>
              )}
            </div>

            {isEditing ? (
              <form className="space-y-8" onSubmit={handleSubmit}>
                {/* Job Title */}
                <div className="space-y-3">
                  <label className="text-[16px] font-bold text-[#1B2C42]">Job Title / Role</label>
                  <input 
                    type="text" 
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full h-[58px] px-6 border border-gray-100 rounded-[12px] text-[16px] focus:outline-none focus:border-[#68cfa3] bg-white text-[#1B2C42]"
                    required
                  />
                </div>

                {/* Professional Role */}
                <div className="space-y-3">
                  <label className="text-[16px] font-bold text-[#1B2C42]">Professional Role</label>
                  <input 
                    type="text" 
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="w-full h-[58px] px-6 border border-gray-100 rounded-[12px] text-[16px] focus:outline-none focus:border-[#68cfa3] bg-white text-[#1B2C42]"
                    required
                  />
                </div>

                {/* City & State */}
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <label className="text-[16px] font-bold text-[#1B2C42]">City</label>
                    <input 
                      type="text" 
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className="w-full h-[58px] px-6 border border-gray-100 rounded-[12px] text-[16px] focus:outline-none focus:border-[#68cfa3] bg-white text-[#1B2C42]"
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[16px] font-bold text-[#1B2C42]">State</label>
                    <input 
                      type="text" 
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      className="w-full h-[58px] px-6 border border-gray-100 rounded-[12px] text-[16px] focus:outline-none focus:border-[#68cfa3] bg-white text-[#1B2C42]"
                    />
                  </div>
                </div>

                {/* Job Type */}
                <div className="space-y-3">
                  <label className="text-[16px] font-bold text-[#1B2C42]">Job type</label>
                  <div className="relative">
                    <select 
                      name="jobType"
                      value={formData.jobType}
                      onChange={handleChange}
                      className="w-full h-[58px] px-6 appearance-none border border-gray-100 rounded-[12px] text-[16px] focus:outline-none focus:border-[#68cfa3] bg-white text-[#1B2C42] cursor-pointer"
                    >
                      <option>Contract Role</option>
                      <option>Permanent Hire</option>
                      <option>Project-Based</option>
                    </select>
                    <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                      <ChevronDown size={20} />
                    </div>
                  </div>
                </div>

                {/* Duties */}
                <div className="space-y-3">
                  <label className="text-[16px] font-bold text-[#1B2C42]">Duties</label>
                  <textarea 
                    name="duties"
                    value={formData.duties}
                    onChange={handleChange}
                    className="w-full h-[140px] p-6 border border-gray-100 rounded-[12px] text-[16px] focus:outline-none focus:border-[#68cfa3] resize-none bg-white text-[#1B2C42]"
                  ></textarea>
                </div>

                {/* Required Skills */}
                <div className="space-y-3">
                  <label className="text-[16px] font-bold text-[#1B2C42]">Required Skills & Experience</label>
                  <textarea 
                    name="skills"
                    value={formData.skills}
                    onChange={handleChange}
                    className="w-full h-[140px] p-6 border border-gray-100 rounded-[12px] text-[16px] focus:outline-none focus:border-[#68cfa3] resize-none bg-white text-[#1B2C42]"
                  ></textarea>
                </div>

                {/* Contract Length */}
                <div className="space-y-3">
                  <label className="text-[16px] font-bold text-[#1B2C42]">Contract Length</label>
                  <div className="relative">
                    <input 
                      type="text" 
                      name="contractLength"
                      value={formData.contractLength}
                      onChange={handleChange}
                      className="w-full h-[58px] px-6 border border-gray-100 rounded-[12px] text-[16px] focus:outline-none focus:border-[#68cfa3] bg-white text-[#1B2C42]"
                    />
                    <div className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-400">
                      <Calendar size={20} />
                    </div>
                  </div>
                </div>

                {/* Working Days & Hours */}
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <label className="text-[16px] font-bold text-[#1B2C42]">Working Days</label>
                    <div className="relative">
                      <input 
                        type="text" 
                        name="workingDays"
                        value={formData.workingDays}
                        onChange={handleChange}
                        className="w-full h-[58px] px-6 border border-gray-100 rounded-[12px] text-[16px] focus:outline-none focus:border-[#68cfa3] bg-white text-[#1B2C42]"
                      />
                      <div className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-400">
                        <Calendar size={20} />
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <label className="text-[16px] font-bold text-[#1B2C42]">Working Hours</label>
                    <input 
                      type="text" 
                      name="workingHours"
                      value={formData.workingHours}
                      onChange={handleChange}
                      className="w-full h-[58px] px-6 border border-gray-100 rounded-[12px] text-[16px] focus:outline-none focus:border-[#68cfa3] bg-white text-[#1B2C42]"
                    />
                  </div>
                </div>

                {/* Salary */}
                <div className="space-y-3">
                  <label className="text-[16px] font-bold text-[#1B2C42]">Salary/Wages</label>
                  <input 
                    type="text" 
                    name="wages"
                    value={formData.wages}
                    onChange={handleChange}
                    className="w-full h-[58px] px-6 border border-gray-100 rounded-[12px] text-[16px] focus:outline-none focus:border-[#68cfa3] bg-white text-[#1B2C42]"
                  />
                </div>

                {/* Additional Description */}
                <div className="space-y-3">
                  <label className="text-[16px] font-bold text-[#1B2C42]">Additional Description</label>
                  <textarea 
                    name="additionalDescription"
                    value={formData.additionalDescription}
                    onChange={handleChange}
                    className="w-full h-[140px] p-6 border border-gray-100 rounded-[12px] text-[16px] focus:outline-none focus:border-[#68cfa3] resize-none bg-white text-[#1B2C42]"
                  ></textarea>
                </div>

                {/* Update Button */}
                <div className="pt-8">
                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-[#68cfa3] hover:bg-[#5abf94] text-[#1B2C42] w-full h-[58px] rounded-full text-[16px] font-bold flex items-center justify-center gap-3 transition-all active:scale-95 shadow-lg shadow-teal-100"
                  >
                    {isSubmitting ? (
                      <Loader2 className="animate-spin" size={24} />
                    ) : (
                      <>Update job listing</>
                    )}
                  </button>
                </div>
              </form>
            ) : (
              <div className="space-y-8">
                {/* Job Title and Role Display */}
                <div>
                  <h3 className="text-[24px] font-bold text-[#1B2C42] mb-2">{job.role}</h3>
                  <p className="text-gray-400 text-[18px]">{job.title}</p>
                </div>

                {/* City & State */}
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[16px] font-bold text-[#1B2C42]">City</label>
                    <div className="w-full h-[58px] px-6 border border-gray-100 rounded-[12px] flex items-center text-[16px] text-gray-400 bg-white">
                      {job.city || 'Charlottesville'}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[16px] font-bold text-[#1B2C42]">State</label>
                    <div className="w-full h-[58px] px-6 border border-gray-100 rounded-[12px] flex items-center text-[16px] text-gray-400 bg-white">
                      {job.state || 'California'}
                    </div>
                  </div>
                </div>

                {/* Job Type */}
                <div className="space-y-2">
                  <label className="text-[16px] font-bold text-[#1B2C42]">Job type</label>
                  <div className="w-full h-[58px] px-6 border border-gray-100 rounded-[12px] flex items-center text-[16px] text-gray-400 bg-white">
                    {job.wages.includes('Contract') ? 'Contract Role' : 'Permanent Hire'}
                  </div>
                </div>

                {/* Duties */}
                <div className="space-y-2">
                  <label className="text-[16px] font-bold text-[#1B2C42]">Duties</label>
                  <div className="w-full min-h-[140px] p-6 border border-gray-100 rounded-[12px] text-[16px] text-gray-400 bg-white whitespace-pre-line">
                    {job.duties || 'No duties specified'}
                  </div>
                </div>

                {/* Required Skills */}
                <div className="space-y-2">
                  <label className="text-[16px] font-bold text-[#1B2C42]">Required Skills & Experience</label>
                  <div className="w-full min-h-[140px] p-6 border border-gray-100 rounded-[12px] text-[16px] text-gray-400 bg-white whitespace-pre-line">
                    {job.skills || 'No skills specified'}
                  </div>
                </div>

                {/* Contract Length */}
                <div className="space-y-2">
                  <label className="text-[16px] font-bold text-[#1B2C42]">Contract Length</label>
                  <div className="w-full h-[58px] px-6 border border-gray-100 rounded-[12px] flex items-center text-[16px] text-gray-400 bg-white">
                    {job.contractLength || '26 Weeks'}
                  </div>
                </div>

                {/* Working Days & Hours */}
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[16px] font-bold text-[#1B2C42]">Working Days</label>
                    <div className="w-full h-[58px] px-6 border border-gray-100 rounded-[12px] flex items-center text-[16px] text-gray-400 bg-white">
                      {job.workingDays || '5 days/week'}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[16px] font-bold text-[#1B2C42]">Working Hours</label>
                    <div className="w-full h-[58px] px-6 border border-gray-100 rounded-[12px] flex items-center text-[16px] text-gray-400 bg-white">
                      {job.workingHours || '24 hours/day'}
                    </div>
                  </div>
                </div>

                {/* Salary */}
                <div className="space-y-2">
                  <label className="text-[16px] font-bold text-[#1B2C42]">Salary/Wages</label>
                  <div className="w-full h-[58px] px-6 border border-gray-100 rounded-[12px] flex items-center text-[16px] text-gray-400 bg-white">
                    {job.wages || '$30/hour'}
                  </div>
                </div>

                {/* Additional Description */}
                <div className="space-y-2">
                  <label className="text-[16px] font-bold text-[#1B2C42]">Additional Description</label>
                  <div className="w-full min-h-[140px] p-6 border border-gray-100 rounded-[12px] text-[16px] text-gray-400 bg-white whitespace-pre-line">
                    {job.additionalDescription || 'No additional description'}
                  </div>
                </div>

                {/* Update Button */}
                <div className="pt-8">
                  <button 
                    onClick={() => setIsEditing(true)}
                    className="bg-[#68cfa3] hover:bg-[#5abf94] text-[#1B2C42] w-full h-[58px] rounded-full text-[16px] font-bold flex items-center justify-center gap-3 transition-all active:scale-95 shadow-lg shadow-teal-100"
                  >
                    Update job listing <ArrowRight size={20} />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};