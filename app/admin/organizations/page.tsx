'use client';
import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Search, ChevronDown, ChevronLeft, ChevronRight, Check, X, ExternalLink, Copy } from 'lucide-react';

interface Organization {
  id: number;
  name: string;
  email: string;
  contact: string;
  city: string;
  state: string;
  activeRequests: number;
  successfulMatches: number;
  status: 'Active' | 'Deactived';
  availability: 'Open' | 'Unavailable';
}

const prefixNames = ["Richmond", "Sunshine", "Horizon", "Blue Sky", "Unity", "Maryland", "Maryland", "Security Blvd", "City", "Prudent", "Elite", "Valley", "River", "Golden", "Pinnacle", "Crestview", "Harbor", "Mountain", "Grace", "Peace", "Hope"];
const suffixNames = ["Support Homes", "Care Center", "Residential", "Support Services", "Group Homes", "Wellness", "Health Partners", "Care Hub", "Health Services", "Living Centers"];

const INITIAL_ORGS: Organization[] = Array.from({ length: 100 }, (_, i) => {
  const prefix = prefixNames[i % prefixNames.length];
  const suffix = suffixNames[Math.floor(i / prefixNames.length) % suffixNames.length];
  const name = `${prefix} ${suffix}`;
  const email = `${prefix.toLowerCase().replace(' ', '')}homes@gmail.com`;
  return {
    id: i + 1,
    name,
    email,
    contact: `+1 432 567 532`,
    city: "Charlottesville",
    state: "California",
    activeRequests: 3,
    successfulMatches: 10,
    status: (i + 1) % 10 === 0 ? "Deactived" : "Active",
    availability: i % 4 === 3 ? "Unavailable" : "Open"
  };
});

const AdminOrganizationsPage: React.FC<{ onLogout: () => void; onNavigate: (page: string) => void; currentPage: string; }> = ({ onLogout, onNavigate, currentPage: activePageId }) => {
  const [organizations, setOrganizations] = useState<Organization[]>(INITIAL_ORGS);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [availabilityFilter, setAvailabilityFilter] = useState("All Availability");
  const [sortFilter, setSortFilter] = useState("Sort By");
  const [currentPage, setCurrentPage] = useState(1);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [selectedOrgId, setSelectedOrgId] = useState<number | null>(null);
  
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

  const selectedOrg = useMemo(() => 
    organizations.find(o => o.id === selectedOrgId) || null
  , [selectedOrgId, organizations]);

  const filteredAndSortedOrgs = useMemo(() => {
    let result = organizations.filter(org => {
      const matchesSearch = org.name.toLowerCase().includes(searchQuery.toLowerCase()) || org.email.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === "All Status" || org.status === statusFilter;
      const matchesAvailability = availabilityFilter === "All Availability" || org.availability === availabilityFilter;
      return matchesSearch && matchesStatus && matchesAvailability;
    });

    switch (sortFilter) {
      case 'Newest First': result.sort((a, b) => b.id - a.id); break;
      case 'Oldest First': result.sort((a, b) => a.id - b.id); break;
      case 'Name (A-Z)': result.sort((a, b) => a.name.localeCompare(b.name)); break;
      case 'Name (Z-A)': result.sort((a, b) => b.name.localeCompare(a.name)); break;
    }

    return result;
  }, [searchQuery, statusFilter, availabilityFilter, sortFilter, organizations]);

  const totalPages = Math.ceil(filteredAndSortedOrgs.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredAndSortedOrgs.slice(startIndex, startIndex + itemsPerPage);

  const handleUpdateOrg = (updated: Organization) => {
    setOrganizations(prev => prev.map(o => o.id === updated.id ? updated : o));
  };

  const DropdownItem = ({ label, current, setter, value }: { label: string, current: string, setter: (val: string) => void, value: string }) => (
    <div onClick={() => { setter(value); setActiveDropdown(null); }} className={`px-6 py-2.5 text-sm cursor-pointer hover:bg-teal-50 flex items-center justify-between ${current === value ? 'text-teal-600 font-bold bg-teal-50' : 'text-gray-700'}`}>
      {label} {current === value && <Check size={14} />}
    </div>
  );

  return (
    <div className="min-h-screen bg-white font-sans text-[#1B2C42]">
      <main className="max-w-[1440px] mx-auto px-8 md:px-12 py-10">
        <h1 className="font-serif text-[42px] leading-tight font-normal mb-10">Organizations</h1>

        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 mb-12" ref={dropdownRef}>
          <div className="w-full lg:max-w-[440px] bg-white border border-gray-100 rounded-full h-12 px-6 flex items-center gap-3 shadow-sm focus-within:border-[#68cfa3]">
            <Search className="text-gray-400 w-5 h-5" />
            <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search by name or email" className="bg-transparent border-none outline-none text-[#1B2C42] text-[14px] font-medium w-full" />
          </div>

          <div className="flex items-center gap-3">
            <div className="relative min-w-[170px]">
              <div onClick={() => setActiveDropdown(activeDropdown === 'status' ? null : 'status')} className="h-11 border border-gray-100 rounded-full px-5 flex items-center justify-between bg-white cursor-pointer text-gray-500 text-[13px] font-medium">
                <span>{statusFilter}</span><ChevronDown size={16} />
              </div>
              {activeDropdown === 'status' && (
                <div className="absolute top-full right-0 w-full mt-2 bg-white border border-gray-100 rounded-2xl shadow-xl z-20 py-2">
                  <DropdownItem label="All Status" value="All Status" current={statusFilter} setter={setStatusFilter} />
                  <DropdownItem label="Active" value="Active" current={statusFilter} setter={setStatusFilter} />
                  <DropdownItem label="Deactived" value="Deactived" current={statusFilter} setter={setStatusFilter} />
                </div>
              )}
            </div>
            <div className="relative min-w-[170px]">
              <div onClick={() => setActiveDropdown(activeDropdown === 'avail' ? null : 'avail')} className="h-11 border border-gray-100 rounded-full px-5 flex items-center justify-between bg-white cursor-pointer text-gray-500 text-[13px] font-medium">
                <span>{availabilityFilter}</span><ChevronDown size={16} />
              </div>
              {activeDropdown === 'avail' && (
                <div className="absolute top-full right-0 w-full mt-2 bg-white border border-gray-100 rounded-2xl shadow-xl z-20 py-2">
                  <DropdownItem label="All Availability" value="All Availability" current={availabilityFilter} setter={setAvailabilityFilter} />
                  <DropdownItem label="Open" value="Open" current={availabilityFilter} setter={setAvailabilityFilter} />
                  <DropdownItem label="Unavailable" value="Unavailable" current={availabilityFilter} setter={setAvailabilityFilter} />
                </div>
              )}
            </div>
            <div className="relative min-w-[170px]">
              <div onClick={() => setActiveDropdown(activeDropdown === 'sort' ? null : 'sort')} className="h-11 border border-gray-100 rounded-full px-5 flex items-center justify-between bg-white cursor-pointer text-gray-500 text-[13px] font-medium">
                <span>{sortFilter}</span><ChevronDown size={16} />
              </div>
              {activeDropdown === 'sort' && (
                <div className="absolute top-full right-0 w-full mt-2 bg-white border border-gray-100 rounded-2xl shadow-xl z-20 py-2">
                  <DropdownItem label="Newest First" value="Newest First" current={sortFilter} setter={setSortFilter} />
                  <DropdownItem label="Oldest First" value="Oldest First" current={sortFilter} setter={setSortFilter} />
                  <DropdownItem label="Name (A-Z)" value="Name (A-Z)" current={sortFilter} setter={setSortFilter} />
                  <DropdownItem label="Name (Z-A)" value="Name (Z-A)" current={sortFilter} setter={setSortFilter} />
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
          <table className="w-full text-left border-collapse min-w-[1000px]">
            <thead>
              <tr className="bg-[#E3E8DE]/50 text-[#1B2C42] text-[14px] font-bold">
                <th className="px-8 py-5">Organization Name</th>
                <th className="px-8 py-5">Organization Email</th>
                <th className="px-8 py-5">Contact Number</th>
                <th className="px-8 py-5">Active Requests</th>
                <th className="px-8 py-5">Status</th>
                <th className="px-8 py-5 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {currentItems.map((org) => (
                <tr key={org.id} className="hover:bg-gray-50/50 transition-colors group">
                  <td className="px-8 py-5 text-[14px] font-bold text-[#1B2C42]">{org.name}</td>
                  <td className="px-8 py-5 text-[14px] text-gray-600">{org.email}</td>
                  <td className="px-8 py-5 text-[14px] text-gray-600">{org.contact}</td>
                  <td className="px-8 py-5 text-[14px] text-gray-600">{org.activeRequests}</td>
                  <td className="px-8 py-5">
                    <span className={`px-4 py-1.5 rounded-full text-[12px] font-bold ${org.status === 'Active' ? 'bg-[#E3F9ED] text-[#28A745]' : 'bg-[#F9E3E3] text-[#A72828]'}`}>
                      {org.status}
                    </span>
                  </td>
                  <td className="px-8 py-5 text-center">
                    <button onClick={() => setSelectedOrgId(org.id)} className="text-[14px] font-bold text-[#1B2C42] hover:text-[#68cfa3] hover:underline">View</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>

      {selectedOrg && (
        <OrganizationModal organization={selectedOrg} onClose={() => setSelectedOrgId(null)} onUpdate={handleUpdateOrg} />
      )}
    </div>
  );
};

const OrganizationModal: React.FC<{ organization: Organization; onClose: () => void; onUpdate: (org: Organization) => void; }> = ({ organization, onClose, onUpdate }) => {
  const [formData, setFormData] = useState<Organization>({ ...organization });
  const [isEditing, setIsEditing] = useState(false);
  const [copied, setCopied] = useState(false);
  const nameRef = useRef<HTMLInputElement>(null);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(formData.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleEditToggle = () => {
    if (isEditing) onUpdate(formData);
    setIsEditing(!isEditing);
    if (!isEditing) setTimeout(() => nameRef.current?.focus(), 0);
  };

  const handleStatusToggle = () => {
    const newStatus: 'Active' | 'Deactived' = formData.status === 'Active' ? 'Deactived' : 'Active';
    const updated = { ...formData, status: newStatus };
    setFormData(updated);
    onUpdate(updated);
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative bg-white w-full max-w-[700px] rounded-[32px] overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        <button onClick={onClose} className="absolute top-6 right-6 p-2 text-gray-400 hover:text-[#1B2C42] z-20"><X size={28} /></button>
        <div className="px-12 py-12 h-full overflow-y-auto max-h-[95vh] no-scrollbar">
          <div className="space-y-12">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <h2 className="font-serif text-[38px] text-[#1B2C42] leading-tight">{formData.name}</h2>
                <div className="flex items-center gap-2">
                  <span className="text-gray-400 text-[18px]">{formData.email}</span>
                  <button onClick={handleCopyEmail} className="text-[#68cfa3] hover:opacity-70 transition-opacity"><Copy size={18} /></button>
                  {copied && <span className="text-[12px] text-teal-600 animate-in fade-in">Copied</span>}
                </div>
              </div>
              <button onClick={handleEditToggle} className="text-[#68cfa3] font-bold text-[18px] hover:underline flex items-center gap-2 mt-2">
                Edit info <ExternalLink size={18} />
              </button>
            </div>

            <div className="space-y-8">
              <div className="space-y-2">
                <label className="text-[16px] font-bold text-[#1B2C42]">Company Name</label>
                <input ref={nameRef} readOnly={!isEditing} type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className={`w-full h-14 px-6 border border-gray-100 rounded-[12px] text-[16px] focus:outline-none focus:border-[#68cfa3] ${!isEditing ? 'bg-transparent border-gray-100/50 text-gray-400' : 'bg-white text-[#1B2C42]'}`} />
              </div>
              <div className="space-y-2">
                <label className="text-[16px] font-bold text-[#1B2C42]">Email</label>
                <input readOnly={!isEditing} type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className={`w-full h-14 px-6 border border-gray-100 rounded-[12px] text-[16px] focus:outline-none focus:border-[#68cfa3] ${!isEditing ? 'bg-transparent border-gray-100/50 text-gray-400' : 'bg-white text-[#1B2C42]'}`} />
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[16px] font-bold text-[#1B2C42]">City</label>
                  <input readOnly={!isEditing} type="text" value={formData.city} onChange={(e) => setFormData({ ...formData, city: e.target.value })} className={`w-full h-14 px-6 border border-gray-100 rounded-[12px] text-[16px] focus:outline-none focus:border-[#68cfa3] ${!isEditing ? 'bg-transparent border-gray-100/50 text-gray-400' : 'bg-white text-[#1B2C42]'}`} />
                </div>
                <div className="space-y-2">
                  <label className="text-[16px] font-bold text-[#1B2C42]">State</label>
                  <input readOnly={!isEditing} type="text" value={formData.state} onChange={(e) => setFormData({ ...formData, state: e.target.value })} className={`w-full h-14 px-6 border border-gray-100 rounded-[12px] text-[16px] focus:outline-none focus:border-[#68cfa3] ${!isEditing ? 'bg-transparent border-gray-100/50 text-gray-400' : 'bg-white text-[#1B2C42]'}`} />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[16px] font-bold text-[#1B2C42]">Contact Number</label>
                <input readOnly={!isEditing} type="text" value={formData.contact} onChange={(e) => setFormData({ ...formData, contact: e.target.value })} className={`w-full h-14 px-6 border border-gray-100 rounded-[12px] text-[16px] focus:outline-none focus:border-[#68cfa3] ${!isEditing ? 'bg-transparent border-gray-100/50 text-gray-400' : 'bg-white text-[#1B2C42]'}`} />
              </div>
            </div>

            <div className="space-y-6 pt-4">
              <div className="flex items-center justify-between"><span className="text-[18px] font-bold text-[#1B2C42]">Total successful match</span><span className="text-[18px] font-bold text-[#1B2C42]">{formData.successfulMatches}</span></div>
              <div className="flex items-center justify-between"><span className="text-[18px] font-bold text-[#1B2C42]">Pending professional requests: {formData.activeRequests}</span><ExternalLink size={20} className="text-[#1B2C42] cursor-pointer" /></div>
              <div className="flex items-center justify-between pt-6">
                <span className="text-[18px] font-bold text-[#1B2C42]">Deactivate company</span>
                <button onClick={handleStatusToggle} className={`w-[60px] h-[32px] rounded-full p-1 transition-all ${formData.status === 'Active' ? 'bg-gray-200' : 'bg-[#68cfa3]'}`}>
                  <div className={`w-[24px] h-[24px] bg-white rounded-full transition-transform ${formData.status === 'Active' ? 'translate-x-0' : 'translate-x-[28px]'}`}></div>
                </button>
              </div>
            </div>
            
            <div className="pt-8">
              <button onClick={() => { onUpdate(formData); onClose(); }} className="w-full h-[58px] bg-[#1B2C42] hover:bg-[#152336] text-white rounded-full font-bold text-[16px] flex items-center justify-center gap-3 shadow-lg">Save All Changes <Check size={20} /></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminOrganizationsPage;