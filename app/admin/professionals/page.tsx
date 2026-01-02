'use client';

import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Search, ChevronDown, ArrowRight, ChevronLeft, ChevronRight, Check } from 'lucide-react';

const firstNames = ["Kelechi", "Sarah", "Michael", "Emily", "David", "Jessica", "Marcus", "Ashley", "Robert", "Jennifer", "Chris", "Amanda", "James", "Linda", "William", "Barbara", "Thomas", "Mary", "Patricia", "Richard"];
const lastNames = ["Israel", "Jenkins", "Chen", "Rodriguez", "Thompson", "Taylor", "Williams", "Miller", "Wilson", "Davis", "Garcia", "Martinez", "Anderson", "Brown", "Jones", "Moore", "White", "Harris", "Clark", "Lewis"];
const roles = ["Certified Nurse Assistants (CNA)", "Registered Nurse (RN)", "Physical Therapist", "Licensed Practical Nurse (LPN)", "Phlebotomist", "Surgical Technologist", "Radiology Technologist", "Medical Assistant", "Direct Support Professional", "Case Manager"];
const creds = ["Verified", "Pending"];
const avails = ["Open", "Unavailable"];

const PROFESSIONALS_DATA = Array.from({ length: 100 }, (_, i) => {
  const firstName = firstNames[i % firstNames.length];
  const lastName = lastNames[Math.floor(i / firstNames.length) % lastNames.length];
  return {
    id: i + 1,
    name: `${firstName} ${lastName}`,
    role: roles[i % roles.length],
    credentials: creds[i % creds.length],
    availability: avails[i % avails.length],
    status: (i + 1) % 7 === 0 ? "Deactived" : "Active",
  };
});

export default function ProfessionalsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [availabilityFilter, setAvailabilityFilter] = useState("All");
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

  const filteredProfessionals = useMemo(() => {
    return PROFESSIONALS_DATA.filter(prof => {
      const matchesSearch = 
        prof.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prof.role.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesStatus = statusFilter === "All" || prof.status === statusFilter;
      const matchesAvailability = availabilityFilter === "All" || prof.availability === availabilityFilter;
      
      return matchesSearch && matchesStatus && matchesAvailability;
    });
  }, [searchQuery, statusFilter, availabilityFilter]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, statusFilter, availabilityFilter]);

  const totalPages = Math.ceil(filteredProfessionals.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredProfessionals.slice(startIndex, startIndex + itemsPerPage);

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
      <div className="flex items-center gap-2">
        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 rounded-full transition-colors disabled:opacity-30">
          <ChevronLeft size={20} />
        </button>
        {pages.map((p, idx) => (
          p === "..." ? (
            <span key={`dots-${idx}`} className="px-2 text-gray-300 font-bold">...</span>
          ) : (
            <button key={p} onClick={() => handlePageChange(p as number)} className={`w-10 h-10 font-bold rounded-full flex items-center justify-center transition-all ${currentPage === p ? 'bg-[#68cfa3] text-[#1B2C42] shadow-sm' : 'text-gray-500 hover:bg-gray-100'}`}>
              {p}
            </button>
          )
        ))}
        <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 rounded-full transition-colors disabled:opacity-30">
          <ChevronRight size={20} />
        </button>
      </div>
    );
  };

  return (
    <main className="max-w-[1400px] mx-auto px-8 py-10">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-10 gap-6">
        <h1 className="font-serif text-[42px] leading-tight font-normal">Professionals</h1>
        <button className="bg-[#68cfa3] hover:bg-[#5abf94] text-[#1B2C42] px-8 py-3.5 rounded-full text-[15px] font-bold flex items-center gap-2 transition-all shadow-sm active:scale-95">
          Add professional <ArrowRight size={18} />
        </button>
      </div>

      <div className="flex flex-col lg:flex-row items-center gap-6 mb-8" ref={dropdownRef}>
        <div className="flex-1 w-full bg-white border border-gray-200 rounded-full h-12 px-6 flex items-center gap-3 focus-within:border-[#68cfa3] transition-all shadow-sm">
          <Search className="text-gray-400 w-5 h-5" />
          <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search by name or role" className="bg-transparent border-none outline-none text-[#1B2C42] placeholder-gray-400 w-full h-full text-sm font-medium"/>
        </div>

        <div className="flex items-center gap-4 w-full lg:w-auto">
          <div className="relative min-w-[180px] flex-1 lg:flex-none">
            <div onClick={() => setActiveDropdown(activeDropdown === 'status' ? null : 'status')} className={`w-full h-12 border rounded-full px-6 flex items-center justify-between bg-white cursor-pointer hover:border-[#68cfa3] transition-all text-[14px] font-medium ${statusFilter !== 'All' ? 'border-[#68cfa3] text-[#68cfa3]' : 'border-gray-200 text-gray-500'}`}>
              <span>{statusFilter === "All" ? "Filter by Status" : statusFilter}</span>
              <ChevronDown size={18} />
            </div>
            {activeDropdown === 'status' && (
              <div className="absolute top-full left-0 w-full mt-2 bg-white border border-gray-100 rounded-2xl shadow-xl z-20 py-2">
                {["All", "Active", "Deactived"].map(opt => (
                  <div key={opt} onClick={() => { setStatusFilter(opt); setActiveDropdown(null); }} className={`px-6 py-2.5 text-sm cursor-pointer hover:bg-teal-50 flex items-center justify-between ${statusFilter === opt ? 'text-teal-600 font-bold bg-teal-50' : 'text-gray-700'}`}>
                    {opt} {statusFilter === opt && <Check size={14} />}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="relative min-w-[180px] flex-1 lg:flex-none">
            <div onClick={() => setActiveDropdown(activeDropdown === 'availability' ? null : 'availability')} className={`w-full h-12 border rounded-full px-6 flex items-center justify-between bg-white cursor-pointer hover:border-[#68cfa3] transition-all text-[14px] font-medium ${availabilityFilter !== 'All' ? 'border-[#68cfa3] text-[#68cfa3]' : 'border-gray-200 text-gray-500'}`}>
              <span>{availabilityFilter === "All" ? "Filter by Availability" : availabilityFilter}</span>
              <ChevronDown size={18} />
            </div>
            {activeDropdown === 'availability' && (
              <div className="absolute top-full left-0 w-full mt-2 bg-white border border-gray-100 rounded-2xl shadow-xl z-20 py-2">
                {["All", "Open", "Unavailable"].map(opt => (
                  <div key={opt} onClick={() => { setAvailabilityFilter(opt); setActiveDropdown(null); }} className={`px-6 py-2.5 text-sm cursor-pointer hover:bg-teal-50 flex items-center justify-between ${availabilityFilter === opt ? 'text-teal-600 font-bold bg-teal-50' : 'text-gray-700'}`}>
                    {opt} {availabilityFilter === opt && <Check size={14} />}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[1000px]">
            <thead>
              <tr className="bg-[#E3E8DE]/50 text-[#1B2C42] text-[14px] font-bold">
                <th className="px-8 py-5">Name</th>
                <th className="px-8 py-5">Role / Profession</th>
                <th className="px-8 py-5">Credentials</th>
                <th className="px-8 py-5">Availability</th>
                <th className="px-8 py-5">Status</th>
                <th className="px-8 py-5">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {currentItems.map((prof) => (
                <tr key={prof.id} className="hover:bg-gray-50/50 transition-colors group">
                  <td className="px-8 py-5 text-[14px] font-bold text-[#1B2C42]">{prof.name}</td>
                  <td className="px-8 py-5 text-[14px] text-gray-600">{prof.role}</td>
                  <td className="px-8 py-5 text-[14px] text-gray-600">{prof.credentials}</td>
                  <td className="px-8 py-5 text-[14px] text-gray-600">{prof.availability}</td>
                  <td className="px-8 py-5">
                    <span className={`px-4 py-1.5 rounded-full text-[12px] font-bold ${prof.status === 'Active' ? 'bg-[#E3F9ED] text-[#28A745]' : 'bg-[#F9E3E3] text-[#A72828]'}`}>
                      {prof.status}
                    </span>
                  </td>
                  <td className="px-8 py-5">
                    <button className="text-[14px] font-bold text-[#1B2C42] hover:text-[#68cfa3] transition-colors hover:underline">
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-6">
        <p className="text-[14px] text-gray-500 font-medium">
          Showing <span className="text-[#1B2C42] font-bold">{Math.min(startIndex + 1, filteredProfessionals.length)} - {Math.min(startIndex + itemsPerPage, filteredProfessionals.length)}</span> of {filteredProfessionals.length}
        </p>
        {renderPagination()}
      </div>
    </main>
  );
}