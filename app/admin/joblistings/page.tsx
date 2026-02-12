'use client';

import { useState, useMemo, useRef, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Search, ChevronDown, ChevronLeft, ChevronRight, Check, X, Calendar, ArrowRight, Loader2, Edit2 } from 'lucide-react';

interface Job {
  id: number;
  title: string;
  role: string;
  location: string;
  wages: string;
  date: string;
  status: 'Active' | 'Deactived' | 'Filled' | 'Closed';
  city?: string;
  state?: string;
  job_type?: string;
  duties?: string;
  skills?: string;
  contract_length?: string;
  working_days?: string;
  working_hours?: string;
  additional_description?: string;
}

// Create a wrapper component that handles the search params with Suspense
function AdminJobsPageContent({ onLogout, currentPage: activePageId }: any) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const autoOpenCreate = searchParams.get('autoOpenCreate') === 'true';
  
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("All job categories");
  const [typeFilter, setTypeFilter] = useState("All job types");
  const [sortFilter, setSortFilter] = useState("Newest");
  const [currentPage, setCurrentPage] = useState(1);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [selectedJobId, setSelectedJobId] = useState<number | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const itemsPerPage = 10;
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Fetch jobs from API
  const fetchJobs = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch('/api/jobs?action=get-all');
      const data = await response.json();
      
      if (data.success) {
        setJobs(data.data);
      } else {
        setError(data.message || 'Failed to fetch jobs');
      }
    } catch (err) {
      console.error('Error fetching jobs:', err);
      setError('Failed to load jobs. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  useEffect(() => {
    if (autoOpenCreate) {
      setIsCreating(true);
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
      const matchesType = typeFilter === "All job types" || job.wages.includes(typeFilter);
      
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

  const handleCreateJob = async (newJob: Omit<Job, 'id' | 'date' | 'status'>) => {
    try {
      setIsSubmitting(true);
      const response = await fetch('/api/jobs?action=create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...newJob,
          job_type: newJob.job_type || 'Contract Role',
          contract_length: newJob.contract_length || '26 Weeks',
          working_days: newJob.working_days || '5 days/week',
          working_hours: newJob.working_hours || '24 hours/day'
        }),
      });

      const data = await response.json();
      
      if (data.success) {
        // Refresh jobs list
        await fetchJobs();
        setIsCreating(false);
        alert('Job created successfully!');
      } else {
        alert(data.message || 'Failed to create job');
      }
    } catch (error) {
      console.error('Error creating job:', error);
      alert('Failed to create job. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdateJob = async (updatedJob: Job) => {
    try {
      setIsSubmitting(true);
      const response = await fetch(`/api/jobs?action=update&id=${updatedJob.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedJob),
      });

      const data = await response.json();
      
      if (data.success) {
        // Refresh jobs list
        await fetchJobs();
        setSelectedJobId(null);
        alert('Job updated successfully!');
      } else {
        alert(data.message || 'Failed to update job');
      }
    } catch (error) {
      console.error('Error updating job:', error);
      alert('Failed to update job. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const DropdownItem = ({ label, current, setter, value }: { label: string, current: string, setter: (val: string) => void, value: string }) => (
    <div onClick={() => { setter(value); setActiveDropdown(null); }} className={`px-6 py-2.5 text-sm cursor-pointer hover:bg-teal-50 flex items-center justify-between ${current === value ? 'text-teal-600 font-bold bg-teal-50' : 'text-gray-700'}`}>
      {label} {current === value && <Check size={14} />}
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="animate-spin mx-auto mb-4 text-[#68cfa3]" size={48} />
          <div className="text-[#1B2C42] font-serif text-xl">Loading job listings...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white font-sans text-[#1B2C42]">
      <main className="max-w-[1440px] mx-auto px-8 md:px-12 py-12">
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
            {error} <button onClick={fetchJobs} className="ml-2 underline">Retry</button>
          </div>
        )}
        
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
            <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search job by title, role, or location" className="bg-transparent border-none outline-none text-[#1B2C42] text-sm font-medium w-full" />
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
          {currentItems.length === 0 ? (
            <div className="py-12 text-center">
              <p className="text-gray-500">No job listings found. Create your first job!</p>
            </div>
          ) : (
            <>
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
                      <td className="px-8 py-6">
                        <div className="text-[14px] text-[#1B2C42] font-medium">{job.title}</div>
                        <div className="text-[12px] text-gray-500">{job.role}</div>
                      </td>
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
            </>
          )}
        </div>
      </main>

      {selectedJob && (
        <JobModal 
          job={selectedJob} 
          onClose={() => setSelectedJobId(null)} 
          onUpdate={handleUpdateJob}
          isSubmitting={isSubmitting}
        />
      )}

      {isCreating && (
        <CreateJobModal 
          onSubmit={handleCreateJob} 
          onClose={() => setIsCreating(false)}
          isSubmitting={isSubmitting}
        />
      )}
    </div>
  );
}

// Main export wrapped with Suspense
export default function AdminJobsPage(props: any) {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="animate-spin mx-auto mb-4 text-[#68cfa3]" size={48} />
          <div className="text-[#1B2C42] font-serif text-xl">Loading job listings...</div>
        </div>
      </div>
    }>
      <AdminJobsPageContent {...props} />
    </Suspense>
  );
}

interface CreateJobModalProps {
  onSubmit: (newJob: any) => void;
  onClose: () => void;
  isSubmitting: boolean;
}

const CreateJobModal: React.FC<CreateJobModalProps> = ({ onSubmit, onClose, isSubmitting }) => {
  const [formData, setFormData] = useState({
    title: '',
    role: '',
    city: '',
    state: '',
    job_type: 'Contract Role',
    duties: '',
    skills: '',
    contract_length: '26 Weeks',
    working_days: '5 days/week',
    working_hours: '24 hours/day',
    wages: '$30/hour',
    additional_description: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.role || !formData.city || !formData.state) {
      alert('Please fill in all required fields: Title, Role, City, and State');
      return;
    }
    
    onSubmit({
      ...formData,
      location: `${formData.city}, ${formData.state}`
    });
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
                <label className="text-[16px] font-bold text-[#1B2C42]">Job Title <span className="text-red-500">*</span></label>
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

              {/* Professional Role */}
              <div className="space-y-3">
                <label className="text-[16px] font-bold text-[#1B2C42]">Professional Role <span className="text-red-500">*</span></label>
                <input 
                  type="text" 
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  placeholder="Enter professional role (e.g. RN, DSP)" 
                  className="w-full h-[58px] px-6 border border-gray-100 rounded-[12px] text-[16px] focus:outline-none focus:border-[#68cfa3] placeholder:text-gray-300 bg-white"
                  required
                />
              </div>

              {/* City & State */}
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-3">
                  <label className="text-[16px] font-bold text-[#1B2C42]">City <span className="text-red-500">*</span></label>
                  <input 
                    type="text" 
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="Enter city" 
                    className="w-full h-[58px] px-6 border border-gray-100 rounded-[12px] text-[16px] focus:outline-none focus:border-[#68cfa3] placeholder:text-gray-300 bg-white"
                    required
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-[16px] font-bold text-[#1B2C42]">State <span className="text-red-500">*</span></label>
                  <input 
                    type="text" 
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    placeholder="Enter state" 
                    className="w-full h-[58px] px-6 border border-gray-100 rounded-[12px] text-[16px] focus:outline-none focus:border-[#68cfa3] placeholder:text-gray-300 bg-white"
                    required
                  />
                </div>
              </div>

              {/* Job Type */}
              <div className="space-y-3">
                <label className="text-[16px] font-bold text-[#1B2C42]">Job type</label>
                <div className="relative">
                  <select 
                    name="job_type"
                    value={formData.job_type}
                    onChange={handleChange}
                    className="w-full h-[58px] px-6 appearance-none border border-gray-100 rounded-[12px] text-[16px] focus:outline-none focus:border-[#68cfa3] bg-white text-gray-500 cursor-pointer"
                  >
                    <option value="Contract Role">Contract Role</option>
                    <option value="Permanent Hire">Permanent Hire</option>
                    <option value="Project-Based">Project-Based</option>
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
                    name="contract_length"
                    value={formData.contract_length}
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
                      name="working_days"
                      value={formData.working_days}
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
                    name="working_hours"
                    value={formData.working_hours}
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
                  name="additional_description"
                  value={formData.additional_description}
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
                  className="bg-[#68cfa3] hover:bg-[#5abf94] text-[#1B2C42] px-12 py-5 rounded-full text-[16px] font-bold flex items-center justify-center gap-3 transition-all active:scale-95 shadow-lg shadow-teal-100 min-w-[220px] disabled:opacity-50 disabled:cursor-not-allowed"
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
  isSubmitting: boolean;
}

const JobModal: React.FC<JobModalProps> = ({ job, onClose, onUpdate, isSubmitting }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    title: job.title,
    role: job.role,
    city: job.city || '',
    state: job.state || '',
    job_type: job.job_type || 'Contract Role',
    duties: job.duties || '',
    skills: job.skills || '',
    contract_length: job.contract_length || '26 Weeks',
    working_days: job.working_days || '5 days/week',
    working_hours: job.working_hours || '24 hours/day',
    wages: job.wages || '$30/hour',
    additional_description: job.additional_description || '',
    status: job.status || 'Active'
  });

  useEffect(() => {
    setFormData({
      title: job.title,
      role: job.role,
      city: job.city || '',
      state: job.state || '',
      job_type: job.job_type || 'Contract Role',
      duties: job.duties || '',
      skills: job.skills || '',
      contract_length: job.contract_length || '26 Weeks',
      working_days: job.working_days || '5 days/week',
      working_hours: job.working_hours || '24 hours/day',
      wages: job.wages || '$30/hour',
      additional_description: job.additional_description || '',
      status: job.status || 'Active'
    });
  }, [job]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.role || !formData.city || !formData.state) {
      alert('Please fill in all required fields: Title, Role, City, and State');
      return;
    }
    
    const updatedJob: Job = {
      ...job,
      title: formData.title,
      role: formData.role,
      location: `${formData.city}, ${formData.state}`,
      city: formData.city,
      state: formData.state,
      job_type: formData.job_type,
      duties: formData.duties,
      skills: formData.skills,
      contract_length: formData.contract_length,
      working_days: formData.working_days,
      working_hours: formData.working_hours,
      wages: formData.wages,
      additional_description: formData.additional_description,
      status: formData.status as 'Active' | 'Deactived' | 'Filled' | 'Closed'
    };
    
    onUpdate(updatedJob);
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
              <h2 className="font-serif text-[38px] text-[#1B2C42] leading-tight">Job Details</h2>
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
                  <label className="text-[16px] font-bold text-[#1B2C42]">Job Title <span className="text-red-500">*</span></label>
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
                  <label className="text-[16px] font-bold text-[#1B2C42]">Professional Role <span className="text-red-500">*</span></label>
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
                    <label className="text-[16px] font-bold text-[#1B2C42]">City <span className="text-red-500">*</span></label>
                    <input 
                      type="text" 
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className="w-full h-[58px] px-6 border border-gray-100 rounded-[12px] text-[16px] focus:outline-none focus:border-[#68cfa3] bg-white text-[#1B2C42]"
                      required
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[16px] font-bold text-[#1B2C42]">State <span className="text-red-500">*</span></label>
                    <input 
                      type="text" 
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      className="w-full h-[58px] px-6 border border-gray-100 rounded-[12px] text-[16px] focus:outline-none focus:border-[#68cfa3] bg-white text-[#1B2C42]"
                      required
                    />
                  </div>
                </div>

                {/* Job Type */}
                <div className="space-y-3">
                  <label className="text-[16px] font-bold text-[#1B2C42]">Job type</label>
                  <div className="relative">
                    <select 
                      name="job_type"
                      value={formData.job_type}
                      onChange={handleChange}
                      className="w-full h-[58px] px-6 appearance-none border border-gray-100 rounded-[12px] text-[16px] focus:outline-none focus:border-[#68cfa3] bg-white text-[#1B2C42] cursor-pointer"
                    >
                      <option value="Contract Role">Contract Role</option>
                      <option value="Permanent Hire">Permanent Hire</option>
                      <option value="Project-Based">Project-Based</option>
                    </select>
                    <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                      <ChevronDown size={20} />
                    </div>
                  </div>
                </div>

                {/* Status */}
                <div className="space-y-3">
                  <label className="text-[16px] font-bold text-[#1B2C42]">Status</label>
                  <div className="relative">
                    <select 
                      name="status"
                      value={formData.status}
                      onChange={handleChange}
                      className="w-full h-[58px] px-6 appearance-none border border-gray-100 rounded-[12px] text-[16px] focus:outline-none focus:border-[#68cfa3] bg-white text-[#1B2C42] cursor-pointer"
                    >
                      <option value="Active">Active</option>
                      <option value="Deactived">Deactivated</option>
                      <option value="Filled">Filled</option>
                      <option value="Closed">Closed</option>
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
                      name="contract_length"
                      value={formData.contract_length}
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
                        name="working_days"
                        value={formData.working_days}
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
                      name="working_hours"
                      value={formData.working_hours}
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
                    name="additional_description"
                    value={formData.additional_description}
                    onChange={handleChange}
                    className="w-full h-[140px] p-6 border border-gray-100 rounded-[12px] text-[16px] focus:outline-none focus:border-[#68cfa3] resize-none bg-white text-[#1B2C42]"
                  ></textarea>
                </div>

                {/* Update Button */}
                <div className="pt-8 flex gap-4">
                  <button 
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="bg-gray-100 hover:bg-gray-200 text-[#1B2C42] px-8 py-4 rounded-full text-[16px] font-bold flex items-center justify-center gap-3 transition-all active:scale-95 min-w-[120px]"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-[#68cfa3] hover:bg-[#5abf94] text-[#1B2C42] px-12 py-5 rounded-full text-[16px] font-bold flex items-center justify-center gap-3 transition-all active:scale-95 shadow-lg shadow-teal-100 min-w-[180px] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <Loader2 className="animate-spin" size={24} />
                    ) : (
                      <>Update Job</>
                    )}
                  </button>
                </div>
              </form>
            ) : (
              <div className="space-y-8">
                {/* Job Title and Role Display */}
                <div>
                  <h3 className="text-[24px] font-bold text-[#1B2C42] mb-2">{job.title}</h3>
                  <p className="text-gray-400 text-[18px]">{job.role}</p>
                  <div className="mt-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${job.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                      {job.status}
                    </span>
                  </div>
                </div>

                {/* City & State */}
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[16px] font-bold text-[#1B2C42]">City</label>
                    <div className="w-full h-[58px] px-6 border border-gray-100 rounded-[12px] flex items-center text-[16px] text-gray-400 bg-white">
                      {job.city || 'Not specified'}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[16px] font-bold text-[#1B2C42]">State</label>
                    <div className="w-full h-[58px] px-6 border border-gray-100 rounded-[12px] flex items-center text-[16px] text-gray-400 bg-white">
                      {job.state || 'Not specified'}
                    </div>
                  </div>
                </div>

                {/* Job Type */}
                <div className="space-y-2">
                  <label className="text-[16px] font-bold text-[#1B2C42]">Job type</label>
                  <div className="w-full h-[58px] px-6 border border-gray-100 rounded-[12px] flex items-center text-[16px] text-gray-400 bg-white">
                    {job.job_type || 'Contract Role'}
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
                    {job.contract_length || '26 Weeks'}
                  </div>
                </div>

                {/* Working Days & Hours */}
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[16px] font-bold text-[#1B2C42]">Working Days</label>
                    <div className="w-full h-[58px] px-6 border border-gray-100 rounded-[12px] flex items-center text-[16px] text-gray-400 bg-white">
                      {job.working_days || '5 days/week'}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[16px] font-bold text-[#1B2C42]">Working Hours</label>
                    <div className="w-full h-[58px] px-6 border border-gray-100 rounded-[12px] flex items-center text-[16px] text-gray-400 bg-white">
                      {job.working_hours || '24 hours/day'}
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
                    {job.additional_description || 'No additional description'}
                  </div>
                </div>

                {/* Date Posted */}
                <div className="space-y-2">
                  <label className="text-[16px] font-bold text-[#1B2C42]">Date Posted</label>
                  <div className="w-full h-[58px] px-6 border border-gray-100 rounded-[12px] flex items-center text-[16px] text-gray-400 bg-white">
                    {job.date}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};