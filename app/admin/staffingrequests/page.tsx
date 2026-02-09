// 'use client';

// import { useState, useMemo, useRef, useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import { Search, ChevronDown, ChevronLeft, ChevronRight, Check, X, Copy, ArrowRight, Trash2, UploadCloud, Loader2 } from 'lucide-react';

// interface PositionDetail {
//   title: string;
//   type: string;
// }

// interface StaffingRequest {
//   id: number;
//   org: string;
//   email: string;
//   contactPerson: string;
//   contactPhone: string;
//   positions: PositionDetail[];
//   comments: string;
//   date: string;
//   pdfFiles?: string[];
//   hasChevron?: boolean;
// }

// const REQUESTS_DATA: StaffingRequest[] = Array.from({ length: 100 }, (_, i) => ({
//   id: i + 1,
//   org: i % 2 === 0 ? "Richmond Support Homes" : "Maryland Care Center",
//   email: "organization-email@companyname.com",
//   contactPerson: "Williams Baker Smith",
//   contactPhone: "+1 (908) 2357 534",
//   positions: [
//     { title: "Certified Nurse Assistants (CNA)", type: "Contract Role" },
//     { title: "Direct Support Professional (DSP)", type: "Permanent Hire" }
//   ],
//   comments: "The ideal candidate will play a vital role in promoting independence, ensuring safety, and enhancing the quality of life in a group home setting. This position offers an opportunity to make a meaningful difference through personalized support, patient observation, and comprehensive caregiving.",
//   date: "Dec 20, 2025",
//   pdfFiles: ["Job description.pdf", "Job description.pdf"],
//   hasChevron: i === 1 || i === 2
// }));

// interface AdminRequestsPageProps {
//   onLogout: () => void;
//   currentPage: string;
// }

// export default function AdminRequestsPage({ onLogout, currentPage: activePageId }: AdminRequestsPageProps) {
//   const router = useRouter();
//   const [requests, setRequests] = useState<StaffingRequest[]>(REQUESTS_DATA);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [roleFilter, setRoleFilter] = useState("All job categories");
//   const [typeFilter, setTypeFilter] = useState("All job types");
//   const [sortFilter, setSortFilter] = useState("Sort by");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
//   const [selectedRequestId, setSelectedRequestId] = useState<number | null>(null);
  
//   const itemsPerPage = 10;
//   const dropdownRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
//         setActiveDropdown(null);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   const selectedRequest = useMemo(() => 
//     requests.find(r => r.id === selectedRequestId) || null
//   , [selectedRequestId, requests]);

//   const filteredRequests = useMemo(() => {
//     const filtered = requests.filter(req => {
//       const matchesSearch = 
//         req.org.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         req.positions.some(p => p.title.toLowerCase().includes(searchQuery.toLowerCase()));
      
//       const matchesRole = roleFilter === "All job categories" || req.positions.some(p => p.title === roleFilter);
//       const matchesType = typeFilter === "All job types" || req.positions.some(p => p.type === typeFilter);
      
//       return matchesSearch && matchesRole && matchesType;
//     });

//     return [...filtered].sort((a, b) => {
//       if (sortFilter === "Newest") return b.id - a.id;
//       if (sortFilter === "Oldest") return a.id - b.id;
//       return 0;
//     });
//   }, [searchQuery, roleFilter, typeFilter, sortFilter, requests]);

//   const totalPages = Math.ceil(filteredRequests.length / itemsPerPage);
//   const startIndex = (currentPage - 1) * itemsPerPage;
//   const currentItems = filteredRequests.slice(startIndex, startIndex + itemsPerPage);

//   const handleUpdate = (updated: StaffingRequest) => {
//     setRequests(prev => prev.map(r => r.id === updated.id ? updated : r));
//   };

//   const handlePageChange = (page: number) => {
//     if (page >= 1 && page <= totalPages) {
//       setCurrentPage(page);
//       window.scrollTo({ top: 0, behavior: 'smooth' });
//     }
//   };

//   const handlePublish = (request: StaffingRequest) => {
//     // Navigate to admin job listings page with auto-open create job form
//     router.push('/admin/joblistings?autoOpenCreate=true');
//   };

//   const DropdownItem = ({ label, current, setter, value }: { label: string, current: string, setter: (val: string) => void, value: string }) => (
//     <div onClick={() => { setter(value); setActiveDropdown(null); }} className={`px-6 py-2.5 text-sm cursor-pointer hover:bg-teal-50 flex items-center justify-between ${current === value ? 'text-teal-600 font-bold bg-teal-50' : 'text-gray-700'}`}>
//       {label} {current === value && <Check size={14} />}
//     </div>
//   );

//   return (
//     <div className="min-h-screen bg-white font-sans text-[#1B2C42]">
//       <main className="max-w-[1440px] mx-auto px-8 md:px-12 py-12">
//         <h1 className="font-serif text-[42px] leading-tight font-normal mb-10">Staffing Requests</h1>

//         <div className="flex flex-col lg:flex-row items-center gap-6 mb-10" ref={dropdownRef}>
//           <div className="flex-1 w-full bg-white border border-gray-200 rounded-full h-12 px-6 flex items-center gap-3 shadow-sm focus-within:border-[#68cfa3]">
//             <Search className="text-gray-400 w-5 h-5" />
//             <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search by organization or role" className="bg-transparent border-none outline-none text-[#1B2C42] text-sm font-medium w-full" />
//           </div>

//           <div className="flex items-center gap-4">
//             <div className="relative min-w-[160px]">
//               <div onClick={() => setActiveDropdown(activeDropdown === 'role' ? null : 'role')} className="h-12 border border-gray-200 rounded-full px-6 flex items-center justify-between bg-white cursor-pointer text-gray-500 text-sm font-medium">
//                 <span>{roleFilter === "All job categories" ? "Filter by Role" : roleFilter}</span><ChevronDown size={18} />
//               </div>
//               {activeDropdown === 'role' && (
//                 <div className="absolute top-full right-0 w-full mt-2 bg-white border border-gray-100 rounded-xl shadow-xl z-20 py-2">
//                   {["All job categories", "Direct Support Professional (DSP)", "Registered Nurse (RN)", "Phlebotomist"].map(opt => <DropdownItem key={opt} label={opt} value={opt} current={roleFilter} setter={setRoleFilter} />)}
//                 </div>
//               )}
//             </div>
//             <div className="relative min-w-[200px]">
//               <div onClick={() => setActiveDropdown(activeDropdown === 'type' ? null : 'type')} className="h-12 border border-gray-200 rounded-full px-6 flex items-center justify-between bg-white cursor-pointer text-gray-500 text-sm font-medium">
//                 <span>{typeFilter === "All job types" ? "Filter by Request Type" : typeFilter}</span><ChevronDown size={18} />
//               </div>
//               {activeDropdown === 'type' && (
//                 <div className="absolute top-full right-0 w-full mt-2 bg-white border border-gray-100 rounded-xl shadow-xl z-20 py-2">
//                   {["All job types", "Contract Role", "Project-Based", "Permanent Hire"].map(opt => <DropdownItem key={opt} label={opt} value={opt} current={typeFilter} setter={setTypeFilter} />)}
//                 </div>
//               )}
//             </div>
//             <div className="relative min-w-[120px]">
//               <div onClick={() => setActiveDropdown(activeDropdown === 'sort' ? null : 'sort')} className="h-12 border border-gray-200 rounded-full px-6 flex items-center justify-between bg-white cursor-pointer text-gray-500 text-sm font-medium">
//                 <span>{sortFilter}</span><ChevronDown size={18} />
//               </div>
//               {activeDropdown === 'sort' && (
//                 <div className="absolute top-full right-0 w-full mt-2 bg-white border border-gray-100 rounded-xl shadow-xl z-20 py-2">
//                   {["Newest", "Oldest"].map(opt => <DropdownItem key={opt} label={opt} value={opt} current={sortFilter} setter={setSortFilter} />)}
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>

//         <div className="bg-white border border-gray-200 rounded-[4px] overflow-hidden shadow-sm">
//           <table className="w-full text-left border-collapse min-w-[900px]">
//             <thead>
//               <tr className="bg-[#E3E8DE] text-[#1B2C42] text-[14px] font-bold">
//                 <th className="px-8 py-5">Organization Name</th>
//                 <th className="px-8 py-5">Role Needed</th>
//                 <th className="px-8 py-5">Request Type</th>
//                 <th className="px-8 py-5">Date</th>
//                 <th className="px-8 py-5 text-center">Action</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-100">
//               {currentItems.map((req) => (
//                 <tr key={req.id} className="hover:bg-gray-50/50 transition-colors">
//                   <td className="px-8 py-6 text-[14px] text-[#1B2C42] font-medium">{req.org}</td>
//                   <td className="px-8 py-6 text-[14px] text-[#1B2C42] font-medium">{req.positions[0]?.title}</td>
//                   <td className="px-8 py-6 text-[14px] text-[#1B2C42] font-medium">{req.positions[0]?.type}</td>
//                   <td className="px-8 py-6 text-[14px] text-[#1B2C42] font-medium">{req.date}</td>
//                   <td className="px-8 py-6 text-center">
//                     <button onClick={() => setSelectedRequestId(req.id)} className="text-[14px] font-bold text-[#1B2C42] hover:text-[#68cfa3] transition-colors">View</button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//           <div className="px-8 py-6 flex flex-col sm:flex-row items-center justify-between border-t border-gray-100 gap-6">
//             <p className="text-[14px] text-gray-500 font-medium">Showing {startIndex + 1} - {Math.min(startIndex + itemsPerPage, filteredRequests.length)} of all</p>
//             <div className="flex items-center gap-2">
//               <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 rounded-full disabled:opacity-30"><ChevronLeft size={20} /></button>
//               <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 rounded-full disabled:opacity-30"><ChevronRight size={20} /></button>
//             </div>
//           </div>
//         </div>
//       </main>

//       {selectedRequest && (
//         <RequestModal 
//           request={selectedRequest} 
//           onClose={() => setSelectedRequestId(null)} 
//           onUpdate={handleUpdate}
//           onPublish={handlePublish}
//         />
//       )}
//     </div>
//   );
// }

// const RequestModal: React.FC<{ request: StaffingRequest; onClose: () => void; onUpdate: (req: StaffingRequest) => void; onPublish: (req: StaffingRequest) => void; }> = ({ request, onClose, onUpdate, onPublish }) => {
//   const [copiedField, setCopiedField] = useState<string | null>(null);
//   const [currentFiles, setCurrentFiles] = useState<string[]>(request.pdfFiles || []);
//   const [isPublishing, setIsPublishing] = useState(false);
//   const fileInputRef = useRef<HTMLInputElement>(null);

//   const handleCopy = (text: string, field: string) => {
//     navigator.clipboard.writeText(text);
//     setCopiedField(field);
//     setTimeout(() => setCopiedField(null), 2000);
//   };

//   const handleRemoveFile = (index: number) => {
//     const newFiles = currentFiles.filter((_, i) => i !== index);
//     setCurrentFiles(newFiles);
//     onUpdate({ ...request, pdfFiles: newFiles });
//   };

//   const handleUploadFile = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       const newFiles = [...currentFiles, file.name];
//       setCurrentFiles(newFiles);
//       onUpdate({ ...request, pdfFiles: newFiles });
//     }
//   };

//   const handlePublish = () => {
//     setIsPublishing(true);
//     setTimeout(() => {
//       onPublish(request);
//       setIsPublishing(false);
//       onClose();
//     }, 1500);
//   };

//   return (
//     <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
//       <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose}></div>
//       <div className="relative bg-white w-full max-w-[700px] rounded-[32px] overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200">
//         <button onClick={onClose} className="absolute top-8 right-8 p-2 text-gray-900 hover:opacity-70 z-20 transition-opacity">
//           <X size={32} />
//         </button>

//         <div className="px-12 py-12 md:px-16 md:py-16 h-full overflow-y-auto max-h-[95vh] no-scrollbar">
//           <div className="space-y-12">
//             {/* Header Section */}
//             <div className="space-y-4">
//               <h2 className="font-serif text-[42px] text-[#1B2C42] leading-tight">{request.org}</h2>
//               <div className="flex items-center gap-3 group">
//                 <span className="text-gray-400 text-[18px]">{request.email}</span>
//                 <button 
//                   onClick={() => handleCopy(request.email, 'email')}
//                   className="text-[#68cfa3] hover:opacity-70 transition-opacity p-1"
//                 >
//                   <Copy size={20} />
//                 </button>
//                 {copiedField === 'email' && <span className="text-xs text-teal-600 animate-in fade-in">Copied!</span>}
//               </div>
//             </div>

//             {/* Contact Person Section */}
//             <div className="space-y-4">
//               <h3 className="text-[18px] font-bold text-[#1B2C42]">Company Contact Person</h3>
//               <div className="space-y-3">
//                 <p className="text-gray-400 text-[18px] font-normal">{request.contactPerson}</p>
//                 <div className="flex items-center gap-3">
//                   <p className="text-gray-400 text-[18px] font-normal">{request.contactPhone}</p>
//                   <button 
//                     onClick={() => handleCopy(request.contactPhone, 'phone')}
//                     className="text-[#68cfa3] hover:opacity-70 transition-opacity p-1"
//                   >
//                     <Copy size={20} />
//                   </button>
//                   {copiedField === 'phone' && <span className="text-xs text-teal-600 animate-in fade-in">Copied!</span>}
//                 </div>
//               </div>
//             </div>

//             {/* Request Position Details */}
//             <div className="space-y-6">
//               <h3 className="text-[18px] font-bold text-[#1B2C42]">Request Position Details</h3>
//               <div className="space-y-4">
//                 {request.positions.map((pos, idx) => (
//                   <div key={idx} className="w-full p-6 border border-gray-100 rounded-[12px] space-y-2">
//                     <p className="text-[18px] font-normal text-gray-500">{pos.title}</p>
//                     <p className="text-[18px] font-normal text-gray-400">{pos.type}</p>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Job Descriptions */}
//             <div className="space-y-6">
//               <div className="flex flex-wrap gap-8 items-center">
//                 {currentFiles.map((fileName, idx) => (
//                   <div key={idx} className="flex items-center gap-3 group cursor-pointer relative">
//                     <div className="w-10 h-10 bg-[#FF4D4D] rounded-lg flex items-center justify-center text-white shadow-sm shrink-0">
//                       <span className="text-[10px] font-black">PDF</span>
//                     </div>
//                     <span className="text-[16px] font-bold text-[#1B2C42] hover:underline truncate max-w-[180px]">
//                       {fileName}
//                     </span>
//                     <button 
//                       onClick={() => handleRemoveFile(idx)}
//                       className="p-1.5 text-gray-400 hover:text-red-500 bg-white rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-all active:scale-90"
//                       title="Remove file"
//                     >
//                       <Trash2 size={16} />
//                     </button>
//                   </div>
//                 ))}
                
//                 {currentFiles.length < 3 && (
//                   <>
//                     <input 
//                       type="file" 
//                       ref={fileInputRef} 
//                       onChange={handleUploadFile} 
//                       className="hidden" 
//                       accept=".pdf"
//                     />
//                     <button 
//                       onClick={() => fileInputRef.current?.click()}
//                       className="flex items-center gap-2 text-[#68cfa3] font-bold text-[14px] hover:underline"
//                     >
//                       <UploadCloud size={18} /> Add Description
//                     </button>
//                   </>
//                 )}
//               </div>
//             </div>

//             {/* Additional Comments */}
//             <div className="space-y-4">
//               <h3 className="text-[18px] font-bold text-[#1B2C42]">Additional Comments</h3>
//               <p className="text-gray-400 text-[18px] leading-relaxed font-normal">
//                 {request.comments}
//               </p>
//             </div>

//             {/* Publish Button */}
//             <div className="pt-4">
//               <button 
//                 onClick={handlePublish}
//                 disabled={isPublishing}
//                 className="bg-[#68cfa3] hover:bg-[#5abf94] text-[#1B2C42] px-10 py-5 rounded-[20px] text-[16px] font-bold flex items-center gap-3 transition-all active:scale-95 shadow-lg shadow-teal-100 disabled:opacity-70 min-w-[200px] justify-center"
//               >
//                 {isPublishing ? (
//                   <Loader2 className="animate-spin" size={20} />
//                 ) : (
//                   <>Publish for listing <ArrowRight size={20} /></>
//                 )}
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };



'use client';

import { useState, useMemo, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Search, ChevronDown, ChevronLeft, ChevronRight, Check, X, Copy, ArrowRight, Trash2, UploadCloud, Loader2, Download, Eye } from 'lucide-react';

interface PositionDetail {
  id?: number;
  jobTitle: string;
  hireType: string;
  positionOrder?: number;
}

interface StaffingRequest {
  id: number;
  firstName: string;
  lastName: string;
  companyName: string;
  email: string;
  phone: string;
  city: string;
  state: string;
  positions: PositionDetail[];
  comments: string;
  submittedAt: string;
  jobDescriptionFileName?: string;
  jobDescriptionFileType?: string;
  jobDescriptionFileSize?: number;
  status: 'pending' | 'reviewed' | 'published' | 'rejected';
  referenceNumber?: string;
}

interface AdminRequestsPageProps {
  onLogout: () => void;
  currentPage: string;
}

export default function AdminRequestsPage({ onLogout, currentPage: activePageId }: AdminRequestsPageProps) {
  const router = useRouter();
  const [requests, setRequests] = useState<StaffingRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("All job categories");
  const [typeFilter, setTypeFilter] = useState("All job types");
  const [statusFilter, setStatusFilter] = useState("All statuses");
  const [sortFilter, setSortFilter] = useState("Newest");
  const [currentPage, setCurrentPage] = useState(1);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [selectedRequestId, setSelectedRequestId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  const itemsPerPage = 10;
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Fetch staffing requests from API
  useEffect(() => {
    fetchStaffingRequests();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const fetchStaffingRequests = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch('/api/admin/staffing-requests');
      
      if (!response.ok) {
        throw new Error('Failed to fetch staffing requests');
      }
      
      const data = await response.json();
      setRequests(data.requests || []);
    } catch (error) {
      console.error('Error fetching staffing requests:', error);
      setError('Failed to load staffing requests. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const selectedRequest = useMemo(() => 
    requests.find(r => r.id === selectedRequestId) || null
  , [selectedRequestId, requests]);

  const filteredRequests = useMemo(() => {
    const filtered = requests.filter(req => {
      const matchesSearch = 
        req.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        req.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        `${req.firstName} ${req.lastName}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
        req.positions.some(p => p.jobTitle.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesRole = roleFilter === "All job categories" || 
        req.positions.some(p => p.jobTitle === roleFilter);
      
      const matchesType = typeFilter === "All job types" || 
        req.positions.some(p => p.hireType === typeFilter);
      
      const matchesStatus = statusFilter === "All statuses" || 
        req.status === statusFilter.toLowerCase();
      
      return matchesSearch && matchesRole && matchesType && matchesStatus;
    });

    return [...filtered].sort((a, b) => {
      if (sortFilter === "Newest") return new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime();
      if (sortFilter === "Oldest") return new Date(a.submittedAt).getTime() - new Date(b.submittedAt).getTime();
      return 0;
    });
  }, [searchQuery, roleFilter, typeFilter, statusFilter, sortFilter, requests]);

  const totalPages = Math.ceil(filteredRequests.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredRequests.slice(startIndex, startIndex + itemsPerPage);

  // Get unique job titles for filter
  const uniqueJobTitles = useMemo(() => {
    const titles = new Set<string>();
    requests.forEach(req => {
      req.positions.forEach(pos => {
        if (pos.jobTitle) titles.add(pos.jobTitle);
      });
    });
    return ["All job categories", ...Array.from(titles)].slice(0, 10); // Limit to 10
  }, [requests]);

  // Get unique hire types for filter
  const uniqueHireTypes = useMemo(() => {
    const types = new Set<string>();
    requests.forEach(req => {
      req.positions.forEach(pos => {
        if (pos.hireType) types.add(pos.hireType);
      });
    });
    return ["All job types", ...Array.from(types)];
  }, [requests]);

  const handleUpdateStatus = async (requestId: number, newStatus: StaffingRequest['status']) => {
    try {
      const response = await fetch('/api/admin/staffing-requests', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ requestId, status: newStatus }),
      });

      if (!response.ok) throw new Error('Failed to update status');

      setRequests(prev => prev.map(req => 
        req.id === requestId ? { ...req, status: newStatus } : req
      ));
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const handleDownloadJobDescription = async (requestId: number) => {
    try {
      const response = await fetch(`/api/staffing/request?action=download-job-description&id=${requestId}`);
      
      if (!response.ok) {
        throw new Error('Failed to download file');
      }
      
      // Get filename from response headers or generate one
      const contentDisposition = response.headers.get('content-disposition');
      let filename = `job-description-${requestId}.pdf`;
      
      if (contentDisposition) {
        const filenameMatch = contentDisposition.match(/filename="?(.+?)"?$/);
        if (filenameMatch) filename = filenameMatch[1];
      }
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Error downloading job description:', error);
      alert('Failed to download job description');
    }
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePublish = (request: StaffingRequest) => {
    // Navigate to admin job listings page with auto-open create job form
    // Pass the request data to pre-fill the job creation form
    router.push(`/admin/joblistings?autoOpenCreate=true&staffingRequestId=${request.id}`);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const DropdownItem = ({ label, current, setter, value }: { label: string, current: string, setter: (val: string) => void, value: string }) => (
    <div onClick={() => { setter(value); setActiveDropdown(null); }} className={`px-6 py-2.5 text-sm cursor-pointer hover:bg-teal-50 flex items-center justify-between ${current === value ? 'text-teal-600 font-bold bg-teal-50' : 'text-gray-700'}`}>
      {label} {current === value && <Check size={14} />}
    </div>
  );

  return (
    <div className="min-h-screen bg-white font-sans text-[#1B2C42]">
      <main className="max-w-[1440px] mx-auto px-8 md:px-12 py-12">
        <div className="flex justify-between items-center mb-10">
          <h1 className="font-serif text-[42px] leading-tight font-normal">Staffing Requests</h1>
          <div className="flex items-center gap-4">
            <button 
              onClick={fetchStaffingRequests}
              className="px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-full flex items-center gap-2"
            >
              Refresh
            </button>
          </div>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        <div className="flex flex-col lg:flex-row items-center gap-6 mb-10" ref={dropdownRef}>
          <div className="flex-1 w-full bg-white border border-gray-200 rounded-full h-12 px-6 flex items-center gap-3 shadow-sm focus-within:border-[#68cfa3]">
            <Search className="text-gray-400 w-5 h-5" />
            <input 
              type="text" 
              value={searchQuery} 
              onChange={(e) => setSearchQuery(e.target.value)} 
              placeholder="Search by organization, email, or role" 
              className="bg-transparent border-none outline-none text-[#1B2C42] text-sm font-medium w-full" 
            />
          </div>

          <div className="flex items-center gap-4 flex-wrap">
            <div className="relative min-w-[160px]">
              <div onClick={() => setActiveDropdown(activeDropdown === 'role' ? null : 'role')} className="h-12 border border-gray-200 rounded-full px-6 flex items-center justify-between bg-white cursor-pointer text-gray-500 text-sm font-medium">
                <span>{roleFilter === "All job categories" ? "Filter by Role" : roleFilter}</span><ChevronDown size={18} />
              </div>
              {activeDropdown === 'role' && (
                <div className="absolute top-full right-0 w-full min-w-[200px] mt-2 bg-white border border-gray-100 rounded-xl shadow-xl z-20 py-2 max-h-[300px] overflow-y-auto">
                  {uniqueJobTitles.map(opt => <DropdownItem key={opt} label={opt} value={opt} current={roleFilter} setter={setRoleFilter} />)}
                </div>
              )}
            </div>
            
            <div className="relative min-w-[200px]">
              <div onClick={() => setActiveDropdown(activeDropdown === 'type' ? null : 'type')} className="h-12 border border-gray-200 rounded-full px-6 flex items-center justify-between bg-white cursor-pointer text-gray-500 text-sm font-medium">
                <span>{typeFilter === "All job types" ? "Filter by Type" : typeFilter}</span><ChevronDown size={18} />
              </div>
              {activeDropdown === 'type' && (
                <div className="absolute top-full right-0 w-full mt-2 bg-white border border-gray-100 rounded-xl shadow-xl z-20 py-2">
                  {uniqueHireTypes.map(opt => <DropdownItem key={opt} label={opt} value={opt} current={typeFilter} setter={setTypeFilter} />)}
                </div>
              )}
            </div>
            
            <div className="relative min-w-[160px]">
              <div onClick={() => setActiveDropdown(activeDropdown === 'status' ? null : 'status')} className="h-12 border border-gray-200 rounded-full px-6 flex items-center justify-between bg-white cursor-pointer text-gray-500 text-sm font-medium">
                <span>{statusFilter === "All statuses" ? "Filter by Status" : statusFilter}</span><ChevronDown size={18} />
              </div>
              {activeDropdown === 'status' && (
                <div className="absolute top-full right-0 w-full mt-2 bg-white border border-gray-100 rounded-xl shadow-xl z-20 py-2">
                  {["All statuses", "Pending", "Reviewed", "Published", "Rejected"].map(opt => <DropdownItem key={opt} label={opt} value={opt} current={statusFilter} setter={setStatusFilter} />)}
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

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="w-8 h-8 animate-spin text-[#68cfa3]" />
          </div>
        ) : (
          <div className="bg-white border border-gray-200 rounded-[4px] overflow-hidden shadow-sm">
            {filteredRequests.length === 0 ? (
              <div className="p-12 text-center text-gray-500">
                No staffing requests found
              </div>
            ) : (
              <>
                <table className="w-full text-left border-collapse min-w-[900px]">
                  <thead>
                    <tr className="bg-[#E3E8DE] text-[#1B2C42] text-[14px] font-bold">
                      <th className="px-8 py-5">Organization Name</th>
                      <th className="px-8 py-5">Contact Person</th>
                      <th className="px-8 py-5">Position(s)</th>
                      <th className="px-8 py-5">Type(s)</th>
                      <th className="px-8 py-5">Status</th>
                      <th className="px-8 py-5">Date</th>
                      <th className="px-8 py-5 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {currentItems.map((req) => (
                      <tr key={req.id} className="hover:bg-gray-50/50 transition-colors">
                        <td className="px-8 py-6">
                          <div className="text-[14px] text-[#1B2C42] font-medium">{req.companyName}</div>
                          <div className="text-[12px] text-gray-500">{req.email}</div>
                        </td>
                        <td className="px-8 py-6">
                          <div className="text-[14px] text-[#1B2C42] font-medium">{req.firstName} {req.lastName}</div>
                          <div className="text-[12px] text-gray-500">{req.phone}</div>
                        </td>
                        <td className="px-8 py-6">
                          <div className="space-y-1">
                            {req.positions.slice(0, 2).map((pos, idx) => (
                              <div key={idx} className="text-[14px] text-[#1B2C42] font-medium">
                                {pos.jobTitle}
                              </div>
                            ))}
                            {req.positions.length > 2 && (
                              <div className="text-[12px] text-gray-500">
                                +{req.positions.length - 2} more
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="px-8 py-6">
                          <div className="space-y-1">
                            {req.positions.slice(0, 2).map((pos, idx) => (
                              <div key={idx} className="text-[14px] text-[#1B2C42] font-medium">
                                {pos.hireType}
                              </div>
                            ))}
                          </div>
                        </td>
                        <td className="px-8 py-6">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${
                            req.status === 'published' ? 'bg-green-100 text-green-800' :
                            req.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                            req.status === 'reviewed' ? 'bg-blue-100 text-blue-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {req.status}
                          </span>
                        </td>
                        <td className="px-8 py-6 text-[14px] text-[#1B2C42] font-medium">
                          {formatDate(req.submittedAt)}
                        </td>
                        <td className="px-8 py-6">
                          <div className="flex items-center justify-center gap-2">
                            <button 
                              onClick={() => setSelectedRequestId(req.id)}
                              className="text-[14px] font-bold text-[#1B2C42] hover:text-[#68cfa3] transition-colors px-3 py-1"
                            >
                              View
                            </button>
                            {req.jobDescriptionFileName && (
                              <button 
                                onClick={() => handleDownloadJobDescription(req.id)}
                                className="text-[12px] text-gray-600 hover:text-[#68cfa3] transition-colors flex items-center gap-1"
                                title="Download job description"
                              >
                                <Download size={14} />
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                
                {/* Pagination */}
                <div className="px-8 py-6 flex flex-col sm:flex-row items-center justify-between border-t border-gray-100 gap-6">
                  <p className="text-[14px] text-gray-500 font-medium">
                    Showing {startIndex + 1} - {Math.min(startIndex + itemsPerPage, filteredRequests.length)} of {filteredRequests.length} requests
                  </p>
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => handlePageChange(currentPage - 1)} 
                      disabled={currentPage === 1}
                      className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 rounded-full disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                      <ChevronLeft size={20} />
                    </button>
                    <span className="text-sm font-medium px-2">
                      Page {currentPage} of {totalPages}
                    </span>
                    <button 
                      onClick={() => handlePageChange(currentPage + 1)} 
                      disabled={currentPage === totalPages}
                      className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 rounded-full disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                      <ChevronRight size={20} />
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        )}
      </main>

      {selectedRequest && (
        <RequestModal 
          request={selectedRequest} 
          onClose={() => setSelectedRequestId(null)} 
          onUpdateStatus={handleUpdateStatus}
          onPublish={handlePublish}
          onDownloadJobDescription={handleDownloadJobDescription}
        />
      )}
    </div>
  );
}

const RequestModal: React.FC<{ 
  request: StaffingRequest; 
  onClose: () => void; 
  onUpdateStatus: (requestId: number, status: StaffingRequest['status']) => void;
  onPublish: (req: StaffingRequest) => void;
  onDownloadJobDescription: (requestId: number) => void;
}> = ({ request, onClose, onUpdateStatus, onPublish, onDownloadJobDescription }) => {
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [isPublishing, setIsPublishing] = useState(false);

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handlePublish = () => {
    setIsPublishing(true);
    setTimeout(() => {
      onPublish(request);
      setIsPublishing(false);
      onClose();
    }, 1500);
  };

  const formatFileSize = (bytes?: number) => {
    if (!bytes) return 'Unknown size';
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative bg-white w-full max-w-[800px] rounded-[32px] overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200 max-h-[95vh] overflow-y-auto">
        <button onClick={onClose} className="absolute top-8 right-8 p-2 text-gray-900 hover:opacity-70 z-20 transition-opacity">
          <X size={32} />
        </button>

        <div className="px-12 py-12 md:px-16 md:py-16">
          <div className="space-y-12">
            {/* Header Section */}
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <h2 className="font-serif text-[42px] text-[#1B2C42] leading-tight">{request.companyName}</h2>
                <div className="flex flex-col items-end gap-2">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${
                    request.status === 'published' ? 'bg-green-100 text-green-800' :
                    request.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    request.status === 'reviewed' ? 'bg-blue-100 text-blue-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {request.status}
                  </span>
                  {request.referenceNumber && (
                    <span className="text-sm text-gray-500">Ref: {request.referenceNumber}</span>
                  )}
                </div>
              </div>
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
                <div className="flex items-center gap-3">
                  <p className="text-gray-400 text-[18px] font-normal">
                    {request.firstName} {request.lastName}
                  </p>
                  <button 
                    onClick={() => handleCopy(`${request.firstName} ${request.lastName}`, 'name')}
                    className="text-[#68cfa3] hover:opacity-70 transition-opacity p-1"
                  >
                    <Copy size={20} />
                  </button>
                </div>
                <div className="flex items-center gap-3">
                  <p className="text-gray-400 text-[18px] font-normal">{request.phone}</p>
                  <button 
                    onClick={() => handleCopy(request.phone, 'phone')}
                    className="text-[#68cfa3] hover:opacity-70 transition-opacity p-1"
                  >
                    <Copy size={20} />
                  </button>
                  {copiedField === 'phone' && <span className="text-xs text-teal-600 animate-in fade-in">Copied!</span>}
                </div>
                <p className="text-gray-400 text-[18px] font-normal">
                  {request.city}, {request.state}
                </p>
              </div>
            </div>

            {/* Request Position Details */}
            <div className="space-y-6">
              <h3 className="text-[18px] font-bold text-[#1B2C42]">Request Position Details</h3>
              <div className="space-y-4">
                {request.positions.map((pos, idx) => (
                  <div key={idx} className="w-full p-6 border border-gray-100 rounded-[12px] space-y-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-[18px] font-normal text-gray-900">{pos.jobTitle}</p>
                        <p className="text-[18px] font-normal text-gray-500">{pos.hireType}</p>
                      </div>
                      <span className="text-sm text-gray-400">Position {idx + 1}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Job Description File */}
            <div className="space-y-6">
              <h3 className="text-[18px] font-bold text-[#1B2C42]">Job Description</h3>
              {request.jobDescriptionFileName ? (
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-[#FF4D4D] rounded-lg flex items-center justify-center text-white shadow-sm">
                      <span className="text-xs font-black">
                        {request.jobDescriptionFileType?.split('/')[1]?.toUpperCase() || 'PDF'}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{request.jobDescriptionFileName}</p>
                      <p className="text-sm text-gray-500">
                        {formatFileSize(request.jobDescriptionFileSize)} • {request.jobDescriptionFileType}
                      </p>
                    </div>
                  </div>
                  <button 
                    onClick={() => onDownloadJobDescription(request.id)}
                    className="flex items-center gap-2 px-4 py-2 bg-[#68cfa3] text-white rounded-lg hover:bg-[#5abf94] transition-colors"
                  >
                    <Download size={18} />
                    Download
                  </button>
                </div>
              ) : (
                <p className="text-gray-500">No job description file uploaded</p>
              )}
            </div>

            {/* Additional Comments */}
            {request.comments && (
              <div className="space-y-4">
                <h3 className="text-[18px] font-bold text-[#1B2C42]">Additional Comments</h3>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-gray-600 leading-relaxed">
                    {request.comments}
                  </p>
                </div>
              </div>
            )}

            {/* Status Actions and Publish Button */}
            <div className="pt-6 border-t border-gray-200">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-wrap gap-2">
                  <button 
                    onClick={() => onUpdateStatus(request.id, 'pending')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium ${request.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 hover:bg-gray-200'}`}
                  >
                    Mark as Pending
                  </button>
                  <button 
                    onClick={() => onUpdateStatus(request.id, 'reviewed')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium ${request.status === 'reviewed' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 hover:bg-gray-200'}`}
                  >
                    Mark as Reviewed
                  </button>
                  <button 
                    onClick={() => onUpdateStatus(request.id, 'rejected')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium ${request.status === 'rejected' ? 'bg-red-100 text-red-800' : 'bg-gray-100 hover:bg-gray-200'}`}
                  >
                    Reject Request
                  </button>
                </div>
                
                <button 
                  onClick={handlePublish}
                  disabled={isPublishing || request.status === 'published'}
                  className="bg-[#68cfa3] hover:bg-[#5abf94] text-[#1B2C42] px-8 py-4 rounded-[20px] text-[16px] font-bold flex items-center gap-3 transition-all active:scale-95 shadow-lg shadow-teal-100 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isPublishing ? (
                    <Loader2 className="animate-spin" size={20} />
                  ) : request.status === 'published' ? (
                    'Already Published'
                  ) : (
                    <>Publish for listing <ArrowRight size={20} /></>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};