'use client';
import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Search, ChevronDown, ArrowRight, ChevronLeft, ChevronRight, Check, X, ExternalLink, Trash2, UploadCloud, Eye, Download, ShieldCheck } from 'lucide-react';

interface Professional {
  id: number;
  name: string;
  firstName: string;
  lastName: string;
  role: string;
  credentials: 'Verified' | 'Pending' | 'Unverified';
  availability: 'Open' | 'Unavailable';
  status: 'Active' | 'Deactived';
  email: string;
  city: string;
  state: string;
  phone: string;
  resume?: string;
  certificate?: string;
}

const SAMPLE_PDF_URL = "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf";

const firstNames = ["Kelechi", "Sarah", "Michael", "Emily", "David", "Jessica", "Marcus", "Ashley", "Robert", "Jennifer", "Chris", "Amanda", "James", "Linda", "William", "Barbara", "Mary", "Patricia", "Richard"];
const lastNames = ["Israel", "Jenkins", "Chen", "Rodriguez", "Thompson", "Taylor", "Williams", "Miller", "Wilson", "Davis", "Garcia", "Martinez", "Anderson", "Brown", "Jones", "Moore", "White", "Harris", "Clark", "Lewis"];
const roles = ["Certified Nurse Assistants (CNA)", "Registered Nurse (RN)", "Physical Therapist", "Licensed Practical Nurse (LPN)", "Phlebotomist", "Surgical Technologist", "Radiology Technologist", "Medical Assistant", "Direct Support Professional", "Case Manager"];
const creds: ('Verified' | 'Pending' | 'Unverified')[] = ["Verified", "Pending", "Unverified"];
const avails: ('Open' | 'Unavailable')[] = ["Open", "Unavailable"];

const INITIAL_DATA: Professional[] = Array.from({ length: 100 }, (_, i) => {
  const firstName = firstNames[i % firstNames.length];
  const lastName = lastNames[Math.floor(i / firstNames.length) % lastNames.length];
  return {
    id: i + 1,
    firstName,
    lastName,
    name: `${firstName} ${lastName}`,
    email: `${firstName.toLowerCase().replace(' ', '')}.${lastName.toLowerCase().replace(' ', '')}${i}@example.com`,
    role: roles[i % roles.length],
    credentials: creds[i % creds.length],
    availability: avails[i % avails.length],
    status: (i + 1) % 7 === 0 ? "Deactived" : "Active",
    city: "Charlottesville",
    state: "California",
    phone: "+1 432 567 532",
    resume: `${firstName}Resume.pdf`,
    certificate: `Trainingcertificate.pdf`
  };
});

/**
 * Precision Jagged Seal Badge Icon.
 */
const RigidSealIcon = ({ type, size = 32, onClick, className = "" }: { type: Professional['credentials'], size?: number, onClick?: () => void, className?: string }) => {
  const getColors = () => {
    switch (type) {
      case 'Verified': return 'fill-[#28A745]';
      case 'Pending': return 'fill-[#FFC107]';
      case 'Unverified': return 'fill-[#DC3545]';
    }
  };

  return (
    <div 
      onClick={onClick}
      className={`relative cursor-pointer transition-transform active:scale-90 hover:brightness-105 select-none ${className}`}
      style={{ width: size, height: size }}
    >
      <svg 
        viewBox="0 0 32 32" 
        className={`w-full h-full ${getColors()} overflow-visible drop-shadow-sm`}
      >
        <path d="M16 2.5l2.4 2.8 3.5-.8 1.4 3.3 3.6 1.1-.3 3.7 2.4 2.8-2.4 2.8.3 3.7-3.6 1.1-1.4 3.3-3.5-.8-2.4 2.8-2.4-2.8-3.5.8-1.4-3.3-3.6-1.1.3-3.7-2.4-2.8 2.4-2.8-.3-3.7 3.6-1.1 1.4-3.3 3.5.8z" />
        <path 
          d="M11 16.5l3.5 3.5 7-7" 
          stroke="white" 
          strokeWidth="3.5" 
          fill="none" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
        />
      </svg>
    </div>
  );
};

const AdminDashboardPage: React.FC<{ onLogout: () => void; onNavigate: (page: string) => void; currentPage: string; }> = ({ onLogout, onNavigate, currentPage: activePageId }) => {
  const [professionals, setProfessionals] = useState<Professional[]>(INITIAL_DATA);
  const [searchQuery, setSearchQuery] = useState("");
  
  const [credentialFilter, setCredentialFilter] = useState("All Credentials");
  const [availabilityFilter, setAvailabilityFilter] = useState("All Availability");
  const [sortFilter, setSortFilter] = useState("Newest First");
  
  const [currentPage, setCurrentPage] = useState(1);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [selectedProfessionalId, setSelectedProfessionalId] = useState<number | null>(null);
  
  const itemsPerPage = 10;
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedProfessional = useMemo(() => 
    professionals.find(p => p.id === selectedProfessionalId) || null
  , [selectedProfessionalId, professionals]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredAndSortedProfessionals = useMemo(() => {
    let result = professionals.filter(prof => {
      const matchesSearch = 
        prof.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prof.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prof.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prof.email.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCreds = credentialFilter === "All Credentials" || prof.credentials === credentialFilter;
      const matchesAvailability = availabilityFilter === "All Availability" || prof.availability === availabilityFilter;
      
      return matchesSearch && matchesCreds && matchesAvailability;
    });

    switch (sortFilter) {
      case 'Newest First':
        result.sort((a, b) => b.id - a.id);
        break;
      case 'Oldest First':
        result.sort((a, b) => a.id - b.id);
        break;
      case 'Name (A-Z)':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'Name (Z-A)':
        result.sort((a, b) => b.name.localeCompare(a.name));
        break;
    }

    return result;
  }, [searchQuery, credentialFilter, availabilityFilter, sortFilter, professionals]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, credentialFilter, availabilityFilter, sortFilter]);

  const totalPages = Math.ceil(filteredAndSortedProfessionals.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredAndSortedProfessionals.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleUpdateProfessional = (updated: Professional) => {
    setProfessionals(prev => prev.map(p => p.id === updated.id ? updated : p));
  };

  const getCredentialColor = (cred: string) => {
    switch (cred) {
      case 'Verified': return 'text-green-600';
      case 'Pending': return 'text-[#D9AE35]';
      case 'Unverified': return 'text-red-600';
      default: return 'text-gray-500';
    }
  };

  const getPaginationItems = () => {
    const delta = 1;
    const items = [];
    const left = currentPage - delta;
    const right = currentPage + delta;
    const range = [];
    const rangeWithDots = [];
    let l;
    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= left && i <= right)) range.push(i);
    }
    for (const i of range) {
      if (l) {
        if (i - l === 2) rangeWithDots.push(l + 1);
        else if (i - l !== 1) rangeWithDots.push('...');
      }
      rangeWithDots.push(i);
      l = i;
    }
    return rangeWithDots;
  };

  const DropdownItem = ({ label, current, setter, value }: { label: string, current: string, setter: (val: string) => void, value: string }) => (
    <div 
      onClick={() => { setter(value); setActiveDropdown(null); }} 
      className={`px-6 py-2.5 text-sm cursor-pointer hover:bg-teal-50 transition-colors flex items-center justify-between ${current === value ? 'text-teal-600 font-bold bg-teal-50/50' : 'text-gray-700'}`}
    >
      {label} {current === value && <Check size={14} />}
    </div>
  );

  return (
    <div className="min-h-screen bg-white font-sans text-[#1B2C42]">

      <main className="max-w-[1440px] mx-auto px-8 md:px-12 py-10">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-10 gap-6">
          <h1 className="font-serif text-[42px] leading-tight font-normal">Professionals Directory</h1>
        </div>

        {/* Search & Filter Row */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 mb-12" ref={dropdownRef}>
          <div className="w-full lg:max-w-[440px] bg-white border border-gray-100 rounded-full h-12 px-6 flex items-center gap-3 shadow-sm focus-within:border-[#68cfa3] transition-all">
            <Search className="text-gray-400 w-5 h-5" />
            <input 
              type="text" 
              value={searchQuery} 
              onChange={(e) => setSearchQuery(e.target.value)} 
              placeholder="Search professional by name, email, or role" 
              className="bg-transparent border-none outline-none text-[#1B2C42] placeholder-gray-400 w-full h-full text-[14px] font-medium"
            />
          </div>

          <div className="flex items-center gap-3 w-full lg:w-auto">
            <div className="relative flex-1 lg:flex-none lg:min-w-[170px]">
              <div 
                onClick={() => setActiveDropdown(activeDropdown === 'creds' ? null : 'creds')} 
                className={`h-11 border rounded-full px-5 flex items-center justify-between bg-white cursor-pointer hover:border-[#68cfa3] transition-all text-[13px] font-medium ${credentialFilter !== 'All Credentials' ? 'border-teal-500 text-teal-600' : 'border-gray-100 text-gray-500'}`}
              >
                <span>{credentialFilter === "All Credentials" ? "Filter by Credentials" : credentialFilter}</span>
                <ChevronDown size={16} className={`transition-transform duration-200 ${activeDropdown === 'creds' ? 'rotate-180' : ''}`} />
              </div>
              {activeDropdown === 'creds' && (
                <div className="absolute top-full right-0 w-full mt-2 bg-white border border-gray-100 rounded-2xl shadow-xl z-20 py-2 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                  <DropdownItem label="All Credentials" value="All Credentials" current={credentialFilter} setter={setCredentialFilter} />
                  <DropdownItem label="Verified" value="Verified" current={credentialFilter} setter={setCredentialFilter} />
                  <DropdownItem label="Pending" value="Pending" current={credentialFilter} setter={setCredentialFilter} />
                  <DropdownItem label="Unverified" value="Unverified" current={credentialFilter} setter={setCredentialFilter} />
                </div>
              )}
            </div>

            <div className="relative flex-1 lg:flex-none lg:min-w-[170px]">
              <div 
                onClick={() => setActiveDropdown(activeDropdown === 'avail' ? null : 'avail')} 
                className={`h-11 border rounded-full px-5 flex items-center justify-between bg-white cursor-pointer hover:border-[#68cfa3] transition-all text-[13px] font-medium ${availabilityFilter !== 'All Availability' ? 'border-teal-500 text-teal-600' : 'border-gray-100 text-gray-500'}`}
              >
                <span>{availabilityFilter === "All Availability" ? "Filter by Availbilty" : availabilityFilter}</span>
                <ChevronDown size={16} className={`transition-transform duration-200 ${activeDropdown === 'avail' ? 'rotate-180' : ''}`} />
              </div>
              {activeDropdown === 'avail' && (
                <div className="absolute top-full right-0 w-full mt-2 bg-white border border-gray-100 rounded-2xl shadow-xl z-20 py-2 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                  <DropdownItem label="All Availability" value="All Availability" current={availabilityFilter} setter={setAvailabilityFilter} />
                  <DropdownItem label="Open" value="Open" current={availabilityFilter} setter={setAvailabilityFilter} />
                  <DropdownItem label="Unavailable" value="Unavailable" current={availabilityFilter} setter={setAvailabilityFilter} />
                </div>
              )}
            </div>

            <div className="relative flex-1 lg:flex-none lg:min-w-[120px]">
              <div 
                onClick={() => setActiveDropdown(activeDropdown === 'sort' ? null : 'sort')} 
                className={`h-11 border rounded-full px-5 flex items-center justify-between bg-white cursor-pointer hover:border-[#68cfa3] transition-all text-[13px] font-medium border-gray-100 text-gray-500`}
              >
                <span>Sort by</span>
                <ChevronDown size={16} className={`transition-transform duration-200 ${activeDropdown === 'sort' ? 'rotate-180' : ''}`} />
              </div>
              {activeDropdown === 'sort' && (
                <div className="absolute top-full right-0 w-full mt-2 bg-white border border-gray-100 rounded-2xl shadow-xl z-20 py-2 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                  <DropdownItem label="Newest First" value="Newest First" current={sortFilter} setter={setSortFilter} />
                  <DropdownItem label="Oldest First" value="Oldest First" current={sortFilter} setter={setSortFilter} />
                  <DropdownItem label="Name (A-Z)" value="Name (A-Z)" current={sortFilter} setter={setSortFilter} />
                  <DropdownItem label="Name (Z-A)" value="Name (Z-A)" current={sortFilter} setter={setSortFilter} />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Directory Table */}
        <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[1000px]">
              <thead>
                <tr className="bg-[#E3E8DE]/50 text-[#1B2C42] text-[14px] font-bold">
                  <th className="px-8 py-5">Name</th>
                  <th className="px-8 py-5">Role / Profession</th>
                  <th className="px-8 py-5">Credentials</th>
                  <th className="px-8 py-5">Availability</th>
                  <th className="px-8 py-5 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {currentItems.length > 0 ? (
                  currentItems.map((prof) => (
                    <tr key={prof.id} className="hover:bg-gray-50/50 transition-colors group">
                      <td className="px-8 py-5 text-[14px] font-bold text-[#1B2C42]">{prof.name}</td>
                      <td className="px-8 py-5 text-[14px] text-gray-600">{prof.role}</td>
                      <td className="px-8 py-5">
                        <span className={`text-[12px] font-bold ${getCredentialColor(prof.credentials)} uppercase tracking-wider`}>
                          {prof.credentials}
                        </span>
                      </td>
                      <td className="px-8 py-5 text-[14px] text-gray-600">{prof.availability}</td>
                      <td className="px-8 py-5 text-center">
                        <button 
                          onClick={() => setSelectedProfessionalId(prof.id)}
                          className="text-[14px] font-bold text-[#1B2C42] hover:text-[#68cfa3] transition-colors hover:underline"
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="px-8 py-20 text-center text-gray-500">
                      No professionals found matching your search and filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <p className="text-[14px] text-gray-500 font-medium">
            Showing <span className="text-[#1B2C42] font-bold">{filteredAndSortedProfessionals.length > 0 ? startIndex + 1 : 0} - {Math.min(startIndex + itemsPerPage, filteredAndSortedProfessionals.length)}</span> of {filteredAndSortedProfessionals.length}
          </p>
          {filteredAndSortedProfessionals.length > 0 && (
            <div className="flex items-center gap-2">
              <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 rounded-full transition-colors disabled:opacity-30">
                <ChevronLeft size={20} />
              </button>
              <div className="flex items-center gap-2">
                {getPaginationItems().map((item, idx) => (
                  item === '...' ? (
                    <span key={`dots-${idx}`} className="px-2 text-gray-300 font-bold select-none">...</span>
                  ) : (
                    <button key={`page-${item}`} onClick={() => handlePageChange(item as number)} className={`w-10 h-10 font-bold rounded-full flex items-center justify-center transition-all ${currentPage === item ? 'bg-[#68cfa3] text-[#1B2C42]' : 'text-gray-500 hover:bg-gray-100'}`}>
                      {item}
                    </button>
                  )
                ))}
              </div>
              <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 rounded-full transition-colors disabled:opacity-30">
                <ChevronRight size={20} />
              </button>
            </div>
          )}
        </div>
      </main>

      {selectedProfessional && (
        <ProfessionalModal 
          professional={selectedProfessional} 
          onClose={() => setSelectedProfessionalId(null)} 
          onUpdate={handleUpdateProfessional}
        />
      )}
    </div>
  );
};

interface ProfessionalModalProps {
  professional: Professional;
  onClose: () => void;
  onUpdate: (prof: Professional) => void;
}

const ProfessionalModal: React.FC<ProfessionalModalProps> = ({ professional, onClose, onUpdate }) => {
  const [formData, setFormData] = useState<Professional>({ ...professional });
  const [isStatusPickerOpen, setIsStatusPickerOpen] = useState(false);
  const [viewingPdf, setViewingPdf] = useState<{ name: string, type: string } | null>(null);
  
  const statusPickerRef = useRef<HTMLDivElement>(null);
  const firstNameRef = useRef<HTMLInputElement>(null);
  const resumeRef = useRef<HTMLInputElement>(null);
  const certRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (statusPickerRef.current && !statusPickerRef.current.contains(event.target as Node)) {
        setIsStatusPickerOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const updated = { ...formData, [name]: value };
    if (name === 'firstName' || name === 'lastName') {
      updated.name = `${name === 'firstName' ? value : formData.firstName} ${name === 'lastName' ? value : formData.lastName}`.trim();
    }
    setFormData(updated);
  };

  const handleStatusChange = (status: Professional['credentials']) => {
    const updated = { ...formData, credentials: status };
    setFormData(updated);
    setIsStatusPickerOpen(false);
  };

  const toggleAvailability = () => {
    const updated = { ...formData, availability: formData.availability === 'Open' ? 'Unavailable' : 'Open' as 'Open' | 'Unavailable' };
    setFormData(updated);
  };

  const handleFileRemove = (field: 'resume' | 'certificate') => {
    setFormData(prev => ({ ...prev, [field]: undefined }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, field: 'resume' | 'certificate') => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, [field]: file.name }));
    }
  };

  const handleSaveChanges = () => {
    onUpdate(formData);
    onClose();
  };

  const handleEditClick = () => {
    firstNameRef.current?.focus();
    firstNameRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  /**
   * Robust PDF Download Function.
   * Fetches the dummy PDF as a blob and creates a temporary link to force "Save As" behavior.
   */
  const handleDownload = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      const response = await fetch(SAMPLE_PDF_URL);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', viewingPdf?.name || "document.pdf");
      document.body.appendChild(link);
      link.click();
      
      // Cleanup
      link.parentNode?.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Failed to download file:", error);
      // Fallback: Open in new tab if blob fetch fails
      window.open(SAMPLE_PDF_URL, '_blank');
    }
  };

  const handleOpenFile = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.open(SAMPLE_PDF_URL, '_blank');
  };

  const FileItem = ({ label, fileName, field, inputRef }: { label: string, fileName?: string, field: 'resume' | 'certificate', inputRef: React.RefObject<HTMLInputElement | null> }) => {
    if (!fileName) {
      return (
        <div 
          onClick={() => inputRef.current?.click()}
          className="w-full border-2 border-dashed border-gray-100 rounded-[16px] p-6 flex items-center justify-center gap-4 cursor-pointer hover:border-[#68cfa3] hover:bg-teal-50/20 transition-all group"
        >
          <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-teal-100 group-hover:text-[#68cfa3] transition-colors">
            <UploadCloud size={20} />
          </div>
          <div className="flex flex-col">
            <span className="text-[15px] font-bold text-[#1B2C42]">Upload {label}</span>
            <span className="text-[12px] text-gray-400">PDF, DOC up to 10MB</span>
          </div>
          <input 
            type="file" 
            ref={inputRef} 
            onChange={(e) => handleFileChange(e, field)} 
            className="hidden" 
            accept=".pdf,.doc,.docx"
          />
        </div>
      );
    }

    return (
      <div className="flex items-center justify-between p-4 bg-gray-50/50 rounded-[16px] border border-gray-100 group transition-all hover:bg-white hover:shadow-sm">
        <div 
          className="flex items-center gap-4 cursor-pointer flex-1"
          onClick={() => setViewingPdf({ name: fileName, type: label })}
        >
          <div className="w-10 h-12 bg-[#E91E63] rounded-[8px] flex flex-col items-center justify-center text-white relative overflow-hidden shadow-sm">
            <span className="text-[9px] font-bold opacity-80 mt-1">PDF</span>
            <div className="w-1.5 h-1.5 bg-white/30 rounded-full mt-1 animate-pulse"></div>
          </div>
          <div className="flex flex-col">
            <span className="text-[14px] font-bold text-[#1B2C42] truncate max-w-[200px] group-hover:text-[#68cfa3] transition-colors">{fileName}</span>
            <span className="text-[11px] text-gray-400 font-medium flex items-center gap-1.5">
              <Eye size={12} /> View Details
            </span>
          </div>
        </div>
        <button 
          onClick={() => handleFileRemove(field)}
          className="p-2.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-all active:scale-90"
          title="Remove File"
        >
          <Trash2 size={18} />
        </button>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative bg-white w-full max-w-[700px] rounded-[32px] overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        <button onClick={onClose} className="absolute top-6 right-6 p-2 text-gray-400 hover:text-[#1B2C42] transition-colors z-20">
          <X size={28} />
        </button>

        <div className="px-12 py-12 h-full overflow-y-auto max-h-[95vh] no-scrollbar">
          <div className="flex items-start justify-between mb-2">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-4 relative">
                <h2 className="text-[32px] font-serif font-normal text-[#1B2C42] leading-tight">{formData.name}</h2>
                <div className="relative" ref={statusPickerRef}>
                  <RigidSealIcon 
                    type={formData.credentials} 
                    size={36} 
                    onClick={() => setIsStatusPickerOpen(!isStatusPickerOpen)} 
                  />
                  {isStatusPickerOpen && (
                    <div className="absolute top-full left-0 mt-4 bg-white border border-gray-100 rounded-[24px] shadow-2xl z-20 py-4 w-[220px] animate-in fade-in slide-in-from-top-4 duration-300">
                      <div className="px-6 pb-2 mb-2 border-b border-gray-50 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Update Credential</div>
                      {(['Verified', 'Pending', 'Unverified'] as Professional['credentials'][]).map(s => (
                        <div 
                          key={s} 
                          onClick={() => handleStatusChange(s)} 
                          className={`px-6 py-3 flex items-center gap-4 hover:bg-teal-50/50 cursor-pointer transition-colors ${formData.credentials === s ? 'bg-teal-50' : ''}`}
                        >
                          <RigidSealIcon type={s} size={24} />
                          <span className={`text-sm font-bold ${formData.credentials === s ? 'text-[#68cfa3]' : 'text-gray-600'}`}>{s}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <p className="text-[#1B2C42]/60 text-[15px] font-medium">{formData.role}</p>
            </div>
            <button 
              onClick={handleEditClick}
              className="flex items-center gap-2 text-[#68cfa3] font-bold text-[15px] hover:underline transition-all pt-2 pr-10"
            >
              Edit info <ExternalLink size={16} />
            </button>
          </div>

          <div className="mt-10 space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2.5">
                <label className="text-[15px] font-bold text-[#1B2C42]">First Name</label>
                <input 
                  ref={firstNameRef}
                  type="text" 
                  name="firstName" 
                  value={formData.firstName} 
                  onChange={handleInputChange} 
                  className="w-full h-[54px] px-5 border border-gray-200 rounded-[12px] bg-white text-[15px] focus:outline-none focus:border-[#68cfa3] transition-colors shadow-sm" 
                />
              </div>
              <div className="space-y-2.5">
                <label className="text-[15px] font-bold text-[#1B2C42]">Last Name</label>
                <input 
                  type="text" 
                  name="lastName" 
                  value={formData.lastName} 
                  onChange={handleInputChange} 
                  className="w-full h-[54px] px-5 border border-gray-200 rounded-[12px] bg-white text-[15px] focus:outline-none focus:border-[#68cfa3] transition-colors shadow-sm" 
                />
              </div>
            </div>
            <div className="space-y-2.5">
              <label className="text-[15px] font-bold text-[#1B2C42]">Email Address</label>
              <input 
                type="email" 
                name="email" 
                value={formData.email} 
                onChange={handleInputChange} 
                className="w-full h-[54px] px-5 border border-gray-200 rounded-[12px] bg-white text-[15px] focus:outline-none focus:border-[#68cfa3] transition-colors shadow-sm" 
              />
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2.5">
                <label className="text-[15px] font-bold text-[#1B2C42]">City</label>
                <input 
                  type="text" 
                  name="city" 
                  value={formData.city} 
                  onChange={handleInputChange} 
                  className="w-full h-[54px] px-5 border border-gray-200 rounded-[12px] bg-white text-[15px] focus:outline-none focus:border-[#68cfa3] transition-colors shadow-sm" 
                />
              </div>
              <div className="space-y-2.5">
                <label className="text-[15px] font-bold text-[#1B2C42]">State</label>
                <input 
                  type="text" 
                  name="state" 
                  value={formData.state} 
                  onChange={handleInputChange} 
                  className="w-full h-[54px] px-5 border border-gray-200 rounded-[12px] bg-white text-[15px] focus:outline-none focus:border-[#68cfa3] transition-colors shadow-sm" 
                />
              </div>
            </div>
            <div className="space-y-2.5">
              <label className="text-[15px] font-bold text-[#1B2C42]">Phone Number</label>
              <input 
                type="text" 
                name="phone" 
                value={formData.phone} 
                onChange={handleInputChange} 
                className="w-full h-[54px] px-5 border border-gray-200 rounded-[12px] bg-white text-[15px] focus:outline-none focus:border-[#68cfa3] transition-colors shadow-sm" 
              />
            </div>
            <div className="space-y-2.5">
              <label className="text-[15px] font-bold text-[#1B2C42]">Profession / Specialty</label>
              <input 
                type="text" 
                name="role" 
                value={formData.role} 
                onChange={handleInputChange} 
                className="w-full h-[54px] px-5 border border-gray-200 rounded-[12px] bg-white text-[15px] focus:outline-none focus:border-[#68cfa3] transition-colors shadow-sm" 
              />
            </div>
          </div>

          <div className="mt-12 space-y-4">
            <h3 className="text-[15px] font-bold text-[#1B2C42] mb-4">Credentials & Documents</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FileItem label="Resume/CV" fileName={formData.resume} field="resume" inputRef={resumeRef} />
              <FileItem label="Certification" fileName={formData.certificate} field="certificate" inputRef={certRef} />
            </div>
          </div>

          <div className="mt-14 pt-2 flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-[18px] font-semibold text-[#1B2C42]">Available for work</span>
              <span className="text-[13px] text-gray-400 font-medium">Currently open to new shift requests</span>
            </div>
            <button 
              onClick={toggleAvailability}
              className={`w-[68px] h-[34px] rounded-full p-1.5 transition-all duration-300 flex items-center ${formData.availability === 'Open' ? 'bg-[#68cfa3]' : 'bg-gray-200'}`}
            >
              <div className={`w-[22px] h-[22px] bg-white rounded-full shadow-md transition-all duration-300 transform ${formData.availability === 'Open' ? 'translate-x-[34px]' : 'translate-x-0'}`}></div>
            </button>
          </div>

          <div className="mt-12 pb-4">
            <button 
              onClick={handleSaveChanges}
              className="w-full h-[58px] bg-[#1B2C42] hover:bg-[#152336] text-white rounded-full font-bold text-[16px] transition-all active:scale-[0.98] shadow-lg flex items-center justify-center gap-3"
            >
              Save All Changes <Check size={20} />
            </button>
          </div>
        </div>

        {/* PDF Details Sub-Modal */}
        {viewingPdf && (
          <div className="absolute inset-0 z-[70] flex items-center justify-center p-8">
            <div className="absolute inset-0 bg-white/60 backdrop-blur-md" onClick={() => setViewingPdf(null)}></div>
            <div className="relative bg-white w-full max-w-[440px] rounded-[24px] shadow-2xl border border-gray-100 p-8 animate-in fade-in zoom-in-95 duration-300">
              <button 
                onClick={() => setViewingPdf(null)}
                className="absolute top-5 right-5 p-1.5 hover:bg-gray-100 rounded-full text-gray-400 transition-colors"
              >
                <X size={20} />
              </button>

              <div className="flex flex-col items-center text-center">
                <div className="w-20 h-24 bg-[#E91E63] rounded-[12px] flex flex-col items-center justify-center text-white relative overflow-hidden shadow-lg mb-6">
                  <span className="text-[14px] font-bold opacity-80 mt-1">PDF</span>
                  <div className="w-2 h-2 bg-white/30 rounded-full mt-2 animate-pulse"></div>
                </div>

                <h3 className="font-serif text-[24px] text-[#1B2C42] mb-1">{viewingPdf.type}</h3>
                <p className="text-[14px] text-gray-500 mb-8 font-medium truncate max-w-full">{viewingPdf.name}</p>

                <div className="w-full space-y-3 mb-8">
                  <div className="flex items-center justify-between py-3 border-b border-gray-50">
                    <span className="text-[13px] text-gray-400 font-bold uppercase tracking-wider">File Status</span>
                    <span className="text-[13px] text-green-600 font-bold flex items-center gap-1.5"><ShieldCheck size={14} /> Verified</span>
                  </div>
                  <div className="flex items-center justify-between py-3 border-b border-gray-50">
                    <span className="text-[13px] text-gray-400 font-bold uppercase tracking-wider">File Size</span>
                    <span className="text-[13px] text-[#1B2C42] font-bold">1.2 MB</span>
                  </div>
                  <div className="flex items-center justify-between py-3">
                    <span className="text-[13px] text-gray-400 font-bold uppercase tracking-wider">Uploaded</span>
                    <span className="text-[13px] text-[#1B2C42] font-bold">Oct 12, 2025</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 w-full">
                  <button 
                    onClick={handleDownload}
                    className="flex items-center justify-center gap-2 h-12 rounded-full border border-gray-200 text-[#1B2C42] font-bold text-[14px] hover:bg-gray-50 transition-colors active:scale-95"
                  >
                    <Download size={16} /> Download
                  </button>
                  <button 
                    onClick={handleOpenFile}
                    className="flex items-center justify-center gap-2 h-12 rounded-full bg-[#68cfa3] text-[#1B2C42] font-bold text-[14px] hover:bg-[#5abf94] transition-colors active:scale-95"
                  >
                    <Eye size={16} /> Open File
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboardPage;