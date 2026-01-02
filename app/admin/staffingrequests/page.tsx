'use client';
import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Search, ChevronDown, ChevronLeft, ChevronRight, Check } from 'lucide-react';

interface AdminRequestsPageProps {
  onLogout: () => void;
  onNavigate: (page: string) => void;
  currentPage: string;
}

const REQUESTS_DATA = Array.from({ length: 100 }, (_, i) => ({
  id: i + 1,
  org: i % 2 === 0 ? "Richmond Support Homes" : "Maryland Care Center",
  role: i % 3 === 0 ? "Direct Support Professional" : i % 3 === 1 ? "Registered Nurse (RN)" : "Phlebotomist",
  type: i % 3 === 0 ? "Contract Role" : i % 3 === 1 ? "Project-Based" : "Permanent Hires",
  date: "Dec 20, 2025",
  hasChevron: i === 1 || i === 2
}));

const page: React.FC<AdminRequestsPageProps> = ({ onLogout, onNavigate, currentPage: activePageId }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("All job categories");
  const [typeFilter, setTypeFilter] = useState("All job types");
  const [currentPage, setCurrentPage] = useState(1);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  
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

  // Filter Logic
  const filteredRequests = useMemo(() => {
    return REQUESTS_DATA.filter(req => {
      const matchesSearch = 
        req.org.toLowerCase().includes(searchQuery.toLowerCase()) ||
        req.role.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesRole = roleFilter === "All job categories" || req.role === roleFilter;
      const matchesType = typeFilter === "All job types" || req.type === typeFilter;
      
      return matchesSearch && matchesRole && matchesType;
    });
  }, [searchQuery, roleFilter, typeFilter]);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, roleFilter, typeFilter]);

  const totalPages = Math.ceil(filteredRequests.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredRequests.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const renderPagination = () => {
    const pages = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage < 4) pages.push(1, 2, 3, "...", totalPages);
      else if (currentPage > totalPages - 3) pages.push(1, "...", totalPages - 2, totalPages - 1, totalPages);
      else pages.push(1, "...", currentPage, "...", totalPages);
    }

    return (
      <div className="flex items-center gap-4">
        <button 
          onClick={() => handlePageChange(currentPage - 1)} 
          disabled={currentPage === 1} 
          className="text-gray-400 hover:text-[#1B2C42] disabled:opacity-30 transition-colors"
        >
          <ChevronLeft size={20} />
        </button>
        <div className="flex items-center gap-1">
          {pages.map((p, idx) => (
            p === "..." ? (
              <span key={`dots-${idx}`} className="px-1 text-gray-400">...</span>
            ) : (
              <button 
                key={p} 
                onClick={() => handlePageChange(p as number)}
                className={`w-8 h-8 rounded-full text-[14px] font-bold flex items-center justify-center transition-all ${
                  currentPage === p ? 'bg-[#68cfa3] text-white' : 'text-gray-500 hover:bg-gray-50'
                }`}
              >
                {p}
              </button>
            )
          ))}
        </div>
        <button 
          onClick={() => handlePageChange(currentPage + 1)} 
          disabled={currentPage === totalPages} 
          className="text-gray-900 hover:text-[#68cfa3] disabled:opacity-30 transition-colors"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    );
  };

  const uniqueRoles = ["All job categories", ...new Set(REQUESTS_DATA.map(r => r.role))];
  const uniqueTypes = ["All job types", "Contract Role", "Project-Based", "Permanent Hires"];

  return (
    <div className="min-h-screen bg-white font-sans text-[#1B2C42]">

      <main className="max-w-[1440px] mx-auto px-8 md:px-12 py-12">
        <h1 className="font-serif text-[42px] leading-tight font-normal mb-10">Staffing Requests</h1>

        {/* Search & Filter Bar */}
        <div className="flex flex-col lg:flex-row items-center gap-6 mb-10" ref={dropdownRef}>
          <div className="flex-1 w-full bg-white border border-gray-200 rounded-full h-12 px-6 flex items-center gap-3 shadow-sm group transition-all focus-within:border-[#68cfa3]">
            <Search className="text-gray-400 w-5 h-5" />
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search property by name and address" 
              className="bg-transparent border-none outline-none text-[#1B2C42] placeholder-gray-400 w-full h-full text-sm font-medium"
            />
          </div>

          <div className="flex items-center gap-4 w-full lg:w-auto">
            {/* Role Filter */}
            <div className="relative min-w-[160px]">
              <div 
                onClick={() => setActiveDropdown(activeDropdown === 'role' ? null : 'role')} 
                className={`w-full h-12 border rounded-full px-6 flex items-center justify-between bg-white cursor-pointer hover:border-[#68cfa3] transition-all text-sm font-medium ${roleFilter !== 'All job categories' ? 'border-[#68cfa3] text-[#68cfa3]' : 'border-gray-200 text-gray-500'}`}
              >
                <span>{roleFilter === "All job categories" ? "Filter by Role" : roleFilter}</span>
                <ChevronDown size={18} className={`transition-transform ${activeDropdown === 'role' ? 'rotate-180' : ''}`} />
              </div>
              {activeDropdown === 'role' && (
                <div className="absolute top-full left-0 w-full mt-2 bg-white border border-gray-100 rounded-xl shadow-xl z-20 py-2 max-h-60 overflow-y-auto no-scrollbar">
                  {uniqueRoles.map(opt => (
                    <div key={opt} onClick={() => { setRoleFilter(opt); setActiveDropdown(null); }} className={`px-6 py-2.5 text-sm cursor-pointer hover:bg-teal-50 flex items-center justify-between ${roleFilter === opt ? 'text-teal-600 font-bold bg-teal-50' : 'text-gray-700'}`}>
                      {opt} {roleFilter === opt && <Check size={14} />}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Type Filter */}
            <div className="relative min-w-[200px]">
              <div 
                onClick={() => setActiveDropdown(activeDropdown === 'type' ? null : 'type')} 
                className={`w-full h-12 border rounded-full px-6 flex items-center justify-between bg-white cursor-pointer hover:border-[#68cfa3] transition-all text-sm font-medium ${typeFilter !== 'All job types' ? 'border-[#68cfa3] text-[#68cfa3]' : 'border-gray-200 text-gray-500'}`}
              >
                <span>{typeFilter === "All job types" ? "Filter by Request Type" : typeFilter}</span>
                <ChevronDown size={18} className={`transition-transform ${activeDropdown === 'type' ? 'rotate-180' : ''}`} />
              </div>
              {activeDropdown === 'type' && (
                <div className="absolute top-full left-0 w-full mt-2 bg-white border border-gray-100 rounded-xl shadow-xl z-20 py-2">
                  {uniqueTypes.map(opt => (
                    <div key={opt} onClick={() => { setTypeFilter(opt); setActiveDropdown(null); }} className={`px-6 py-2.5 text-sm cursor-pointer hover:bg-teal-50 flex items-center justify-between ${typeFilter === opt ? 'text-teal-600 font-bold bg-teal-50' : 'text-gray-700'}`}>
                      {opt} {typeFilter === opt && <Check size={14} />}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="relative min-w-[120px]">
              <div className="w-full h-12 border border-gray-200 rounded-full px-6 flex items-center justify-between bg-white cursor-pointer hover:border-[#68cfa3] transition-all text-gray-500 text-sm font-medium">
                <span>Sort by</span>
                <ChevronDown size={18} />
              </div>
            </div>
          </div>
        </div>

        {/* Table View */}
        <div className="bg-white border border-gray-200 rounded-[4px] overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[900px]">
              <thead>
                <tr className="bg-[#E3E8DE] text-[#1B2C42] text-[14px] font-bold">
                  <th className="px-8 py-5 font-bold">Organization Name</th>
                  <th className="px-8 py-5 font-bold">Role Needed</th>
                  <th className="px-8 py-5 font-bold">Request Type</th>
                  <th className="px-8 py-5 font-bold">Date</th>
                  <th className="px-8 py-5 font-bold text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {currentItems.length > 0 ? (
                  currentItems.map((req) => (
                    <tr key={req.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-8 py-6 text-[14px] text-[#1B2C42] font-medium">{req.org}</td>
                      <td className="px-8 py-6 text-[14px] text-[#1B2C42] font-medium">
                        <div className="flex items-center justify-between max-w-[200px]">
                          <span>{req.role}</span>
                          {req.hasChevron && <ChevronDown size={16} className="text-gray-400" />}
                        </div>
                      </td>
                      <td className="px-8 py-6 text-[14px] text-[#1B2C42] font-medium">{req.type}</td>
                      <td className="px-8 py-6 text-[14px] text-[#1B2C42] font-medium">{req.date}</td>
                      <td className="px-8 py-6 text-center">
                        <button className="text-[14px] font-bold text-[#1B2C42] hover:text-[#68cfa3] transition-colors">View</button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="px-8 py-20 text-center text-gray-500">No staffing requests found matching your filters.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          
          {/* Pagination Footer */}
          <div className="px-8 py-6 flex flex-col sm:flex-row items-center justify-between border-t border-gray-100 gap-6">
            <p className="text-[14px] text-gray-500 font-medium">
              Showing {filteredRequests.length > 0 ? startIndex + 1 : 0} - {Math.min(startIndex + itemsPerPage, filteredRequests.length)} of all
            </p>
            {filteredRequests.length > 0 && renderPagination()}
          </div>
        </div>
      </main>
    </div>
  );
};

export default page;