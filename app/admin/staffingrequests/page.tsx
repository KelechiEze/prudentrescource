'use client';

import { useState, useMemo, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Search, ChevronDown, ChevronLeft, ChevronRight, Check, X, Copy, ArrowRight, Trash2, UploadCloud, Loader2 } from 'lucide-react';

interface PositionDetail {
  title: string;
  type: string;
}

interface StaffingRequest {
  id: number;
  org: string;
  email: string;
  contactPerson: string;
  contactPhone: string;
  positions: PositionDetail[];
  comments: string;
  date: string;
  pdfFiles?: string[];
  hasChevron?: boolean;
}

const REQUESTS_DATA: StaffingRequest[] = Array.from({ length: 100 }, (_, i) => ({
  id: i + 1,
  org: i % 2 === 0 ? "Richmond Support Homes" : "Maryland Care Center",
  email: "organization-email@companyname.com",
  contactPerson: "Williams Baker Smith",
  contactPhone: "+1 (908) 2357 534",
  positions: [
    { title: "Certified Nurse Assistants (CNA)", type: "Contract Role" },
    { title: "Direct Support Professional (DSP)", type: "Permanent Hire" }
  ],
  comments: "The ideal candidate will play a vital role in promoting independence, ensuring safety, and enhancing the quality of life in a group home setting. This position offers an opportunity to make a meaningful difference through personalized support, patient observation, and comprehensive caregiving.",
  date: "Dec 20, 2025",
  pdfFiles: ["Job description.pdf", "Job description.pdf"],
  hasChevron: i === 1 || i === 2
}));

interface AdminRequestsPageProps {
  onLogout: () => void;
  currentPage: string;
}

export default function AdminRequestsPage({ onLogout, currentPage: activePageId }: AdminRequestsPageProps) {
  const router = useRouter();
  const [requests, setRequests] = useState<StaffingRequest[]>(REQUESTS_DATA);
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("All job categories");
  const [typeFilter, setTypeFilter] = useState("All job types");
  const [sortFilter, setSortFilter] = useState("Sort by");
  const [currentPage, setCurrentPage] = useState(1);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [selectedRequestId, setSelectedRequestId] = useState<number | null>(null);
  
  const itemsPerPage = 10;
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedRequest = useMemo(() => 
    requests.find(r => r.id === selectedRequestId) || null
  , [selectedRequestId, requests]);

  const filteredRequests = useMemo(() => {
    const filtered = requests.filter(req => {
      const matchesSearch = 
        req.org.toLowerCase().includes(searchQuery.toLowerCase()) ||
        req.positions.some(p => p.title.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesRole = roleFilter === "All job categories" || req.positions.some(p => p.title === roleFilter);
      const matchesType = typeFilter === "All job types" || req.positions.some(p => p.type === typeFilter);
      
      return matchesSearch && matchesRole && matchesType;
    });

    return [...filtered].sort((a, b) => {
      if (sortFilter === "Newest") return b.id - a.id;
      if (sortFilter === "Oldest") return a.id - b.id;
      return 0;
    });
  }, [searchQuery, roleFilter, typeFilter, sortFilter, requests]);

  const totalPages = Math.ceil(filteredRequests.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredRequests.slice(startIndex, startIndex + itemsPerPage);

  const handleUpdate = (updated: StaffingRequest) => {
    setRequests(prev => prev.map(r => r.id === updated.id ? updated : r));
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePublish = (request: StaffingRequest) => {
    // Navigate to admin job listings page with auto-open create job form
    router.push('/admin/joblistings?autoOpenCreate=true');
  };

  const DropdownItem = ({ label, current, setter, value }: { label: string, current: string, setter: (val: string) => void, value: string }) => (
    <div onClick={() => { setter(value); setActiveDropdown(null); }} className={`px-6 py-2.5 text-sm cursor-pointer hover:bg-teal-50 flex items-center justify-between ${current === value ? 'text-teal-600 font-bold bg-teal-50' : 'text-gray-700'}`}>
      {label} {current === value && <Check size={14} />}
    </div>
  );

  return (
    <div className="min-h-screen bg-white font-sans text-[#1B2C42]">
      <main className="max-w-[1440px] mx-auto px-8 md:px-12 py-12">
        <h1 className="font-serif text-[42px] leading-tight font-normal mb-10">Staffing Requests</h1>

        <div className="flex flex-col lg:flex-row items-center gap-6 mb-10" ref={dropdownRef}>
          <div className="flex-1 w-full bg-white border border-gray-200 rounded-full h-12 px-6 flex items-center gap-3 shadow-sm focus-within:border-[#68cfa3]">
            <Search className="text-gray-400 w-5 h-5" />
            <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search by organization or role" className="bg-transparent border-none outline-none text-[#1B2C42] text-sm font-medium w-full" />
          </div>

          <div className="flex items-center gap-4">
            <div className="relative min-w-[160px]">
              <div onClick={() => setActiveDropdown(activeDropdown === 'role' ? null : 'role')} className="h-12 border border-gray-200 rounded-full px-6 flex items-center justify-between bg-white cursor-pointer text-gray-500 text-sm font-medium">
                <span>{roleFilter === "All job categories" ? "Filter by Role" : roleFilter}</span><ChevronDown size={18} />
              </div>
              {activeDropdown === 'role' && (
                <div className="absolute top-full right-0 w-full mt-2 bg-white border border-gray-100 rounded-xl shadow-xl z-20 py-2">
                  {["All job categories", "Direct Support Professional (DSP)", "Registered Nurse (RN)", "Phlebotomist"].map(opt => <DropdownItem key={opt} label={opt} value={opt} current={roleFilter} setter={setRoleFilter} />)}
                </div>
              )}
            </div>
            <div className="relative min-w-[200px]">
              <div onClick={() => setActiveDropdown(activeDropdown === 'type' ? null : 'type')} className="h-12 border border-gray-200 rounded-full px-6 flex items-center justify-between bg-white cursor-pointer text-gray-500 text-sm font-medium">
                <span>{typeFilter === "All job types" ? "Filter by Request Type" : typeFilter}</span><ChevronDown size={18} />
              </div>
              {activeDropdown === 'type' && (
                <div className="absolute top-full right-0 w-full mt-2 bg-white border border-gray-100 rounded-xl shadow-xl z-20 py-2">
                  {["All job types", "Contract Role", "Project-Based", "Permanent Hire"].map(opt => <DropdownItem key={opt} label={opt} value={opt} current={typeFilter} setter={setTypeFilter} />)}
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
                <th className="px-8 py-5">Organization Name</th>
                <th className="px-8 py-5">Role Needed</th>
                <th className="px-8 py-5">Request Type</th>
                <th className="px-8 py-5">Date</th>
                <th className="px-8 py-5 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {currentItems.map((req) => (
                <tr key={req.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-8 py-6 text-[14px] text-[#1B2C42] font-medium">{req.org}</td>
                  <td className="px-8 py-6 text-[14px] text-[#1B2C42] font-medium">{req.positions[0]?.title}</td>
                  <td className="px-8 py-6 text-[14px] text-[#1B2C42] font-medium">{req.positions[0]?.type}</td>
                  <td className="px-8 py-6 text-[14px] text-[#1B2C42] font-medium">{req.date}</td>
                  <td className="px-8 py-6 text-center">
                    <button onClick={() => setSelectedRequestId(req.id)} className="text-[14px] font-bold text-[#1B2C42] hover:text-[#68cfa3] transition-colors">View</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="px-8 py-6 flex flex-col sm:flex-row items-center justify-between border-t border-gray-100 gap-6">
            <p className="text-[14px] text-gray-500 font-medium">Showing {startIndex + 1} - {Math.min(startIndex + itemsPerPage, filteredRequests.length)} of all</p>
            <div className="flex items-center gap-2">
              <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 rounded-full disabled:opacity-30"><ChevronLeft size={20} /></button>
              <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 rounded-full disabled:opacity-30"><ChevronRight size={20} /></button>
            </div>
          </div>
        </div>
      </main>

      {selectedRequest && (
        <RequestModal 
          request={selectedRequest} 
          onClose={() => setSelectedRequestId(null)} 
          onUpdate={handleUpdate}
          onPublish={handlePublish}
        />
      )}
    </div>
  );
}

const RequestModal: React.FC<{ request: StaffingRequest; onClose: () => void; onUpdate: (req: StaffingRequest) => void; onPublish: (req: StaffingRequest) => void; }> = ({ request, onClose, onUpdate, onPublish }) => {
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [currentFiles, setCurrentFiles] = useState<string[]>(request.pdfFiles || []);
  const [isPublishing, setIsPublishing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleRemoveFile = (index: number) => {
    const newFiles = currentFiles.filter((_, i) => i !== index);
    setCurrentFiles(newFiles);
    onUpdate({ ...request, pdfFiles: newFiles });
  };

  const handleUploadFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const newFiles = [...currentFiles, file.name];
      setCurrentFiles(newFiles);
      onUpdate({ ...request, pdfFiles: newFiles });
    }
  };

  const handlePublish = () => {
    setIsPublishing(true);
    setTimeout(() => {
      onPublish(request);
      setIsPublishing(false);
      onClose();
    }, 1500);
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
            {/* Header Section */}
            <div className="space-y-4">
              <h2 className="font-serif text-[42px] text-[#1B2C42] leading-tight">{request.org}</h2>
              <div className="flex items-center gap-3 group">
                <span className="text-gray-400 text-[18px]">{request.email}</span>
                <button 
                  onClick={() => handleCopy(request.email, 'email')}
                  className="text-[#68cfa3] hover:opacity-70 transition-opacity p-1"
                >
                  <Copy size={20} />
                </button>
                {copiedField === 'email' && <span className="text-xs text-teal-600 animate-in fade-in">Copied!</span>}
              </div>
            </div>

            {/* Contact Person Section */}
            <div className="space-y-4">
              <h3 className="text-[18px] font-bold text-[#1B2C42]">Company Contact Person</h3>
              <div className="space-y-3">
                <p className="text-gray-400 text-[18px] font-normal">{request.contactPerson}</p>
                <div className="flex items-center gap-3">
                  <p className="text-gray-400 text-[18px] font-normal">{request.contactPhone}</p>
                  <button 
                    onClick={() => handleCopy(request.contactPhone, 'phone')}
                    className="text-[#68cfa3] hover:opacity-70 transition-opacity p-1"
                  >
                    <Copy size={20} />
                  </button>
                  {copiedField === 'phone' && <span className="text-xs text-teal-600 animate-in fade-in">Copied!</span>}
                </div>
              </div>
            </div>

            {/* Request Position Details */}
            <div className="space-y-6">
              <h3 className="text-[18px] font-bold text-[#1B2C42]">Request Position Details</h3>
              <div className="space-y-4">
                {request.positions.map((pos, idx) => (
                  <div key={idx} className="w-full p-6 border border-gray-100 rounded-[12px] space-y-2">
                    <p className="text-[18px] font-normal text-gray-500">{pos.title}</p>
                    <p className="text-[18px] font-normal text-gray-400">{pos.type}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Job Descriptions */}
            <div className="space-y-6">
              <div className="flex flex-wrap gap-8 items-center">
                {currentFiles.map((fileName, idx) => (
                  <div key={idx} className="flex items-center gap-3 group cursor-pointer relative">
                    <div className="w-10 h-10 bg-[#FF4D4D] rounded-lg flex items-center justify-center text-white shadow-sm shrink-0">
                      <span className="text-[10px] font-black">PDF</span>
                    </div>
                    <span className="text-[16px] font-bold text-[#1B2C42] hover:underline truncate max-w-[180px]">
                      {fileName}
                    </span>
                    <button 
                      onClick={() => handleRemoveFile(idx)}
                      className="p-1.5 text-gray-400 hover:text-red-500 bg-white rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-all active:scale-90"
                      title="Remove file"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
                
                {currentFiles.length < 3 && (
                  <>
                    <input 
                      type="file" 
                      ref={fileInputRef} 
                      onChange={handleUploadFile} 
                      className="hidden" 
                      accept=".pdf"
                    />
                    <button 
                      onClick={() => fileInputRef.current?.click()}
                      className="flex items-center gap-2 text-[#68cfa3] font-bold text-[14px] hover:underline"
                    >
                      <UploadCloud size={18} /> Add Description
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* Additional Comments */}
            <div className="space-y-4">
              <h3 className="text-[18px] font-bold text-[#1B2C42]">Additional Comments</h3>
              <p className="text-gray-400 text-[18px] leading-relaxed font-normal">
                {request.comments}
              </p>
            </div>

            {/* Publish Button 
            <div className="pt-4">
              <button 
                onClick={handlePublish}
                disabled={isPublishing}
                className="bg-[#68cfa3] hover:bg-[#5abf94] text-[#1B2C42] px-10 py-5 rounded-[20px] text-[16px] font-bold flex items-center gap-3 transition-all active:scale-95 shadow-lg shadow-teal-100 disabled:opacity-70 min-w-[200px] justify-center"
              >
                {isPublishing ? (
                  <Loader2 className="animate-spin" size={20} />
                ) : (
                  <>Publish for listing <ArrowRight size={20} /></>
                )}
              </button>
            </div>*/}
          </div>
        </div>
      </div>
    </div>
  );
};