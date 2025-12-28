'use client';
import React, { useState, useRef, useEffect } from 'react';
import { ArrowRight, Check, Plus, ChevronDown, X } from 'lucide-react';

const page: React.FC = () => {
  const [selectedPositions, setSelectedPositions] = useState(["Phlebotomists", "Direct Support Professionals"]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const availablePositions = [
    "Phlebotomists",
    "Direct Support Professionals",
    "Registered Nurses (RN)",
    "Licensed Practical Nurses (LPN)",
    "Certified Nurse Aides (CNA)",
    "Surgical Technologists",
    "Radiology Technologists",
    "Physical Therapists",
    "Medical Assistants"
  ];

  const handleAddPosition = (pos: string) => {
    if (!selectedPositions.includes(pos)) {
      setSelectedPositions([...selectedPositions, pos]);
    }
    setIsDropdownOpen(false);
  };

  const handleRemovePosition = (posToRemove: string) => {
    setSelectedPositions(selectedPositions.filter(pos => pos !== posToRemove));
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFileName(file.name);
    }
  };

  const triggerFileSelect = () => {
    fileInputRef.current?.click();
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="min-h-screen bg-[#E3E8DE] py-20 px-6 font-sans">
      <div className="max-w-4xl mx-auto">
        {/* Page Title */}
        <h1 className="font-serif text-[42px] text-[#1B2C42] text-center mb-12">
          Submit Staffing Request
        </h1>

        {/* Form Container */}
        <div className="bg-white rounded-md shadow-sm p-10 md:p-16">
          <form className="space-y-12" onSubmit={(e) => e.preventDefault()}>
            
            {/* Section 1: Company Contact Details */}
            <div className="space-y-8">
              <h2 className="text-[11px] font-bold uppercase tracking-[0.15em] text-gray-900 border-b border-transparent">
                COMPANY CONTACT DETAILS
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-[13px] font-semibold text-gray-900 flex items-center gap-0.5">
                    First Name <span className="text-red-500">*</span>
                  </label>
                  <input 
                    type="text" 
                    placeholder="John" 
                    className="w-full h-12 px-4 border border-gray-200 rounded text-sm focus:outline-none focus:border-teal-400 bg-white text-gray-900 placeholder-gray-400"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[13px] font-semibold text-gray-900 flex items-center gap-0.5">
                    Last Name <span className="text-red-500">*</span>
                  </label>
                  <input 
                    type="text" 
                    placeholder="Doe" 
                    className="w-full h-12 px-4 border border-gray-200 rounded text-sm focus:outline-none focus:border-teal-400 bg-white text-gray-900 placeholder-gray-400"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[13px] font-semibold text-gray-900 flex items-center gap-0.5">
                  Company's Name <span className="text-red-500">*</span>
                </label>
                <input 
                  type="text" 
                  placeholder="Your company's name" 
                  className="w-full h-12 px-4 border border-gray-200 rounded text-sm focus:outline-none focus:border-teal-400 bg-white text-gray-900 placeholder-gray-400"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[13px] font-semibold text-gray-900 flex items-center gap-0.5">
                  Business Email Address <span className="text-red-500">*</span>
                </label>
                <input 
                  type="email" 
                  placeholder="business-email@companyname.com" 
                  className="w-full h-12 px-4 border border-gray-200 rounded text-sm focus:outline-none focus:border-teal-400 bg-white text-gray-900 placeholder-gray-400"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[13px] font-semibold text-gray-900 flex items-center gap-0.5">
                  Contact Number <span className="text-red-500">*</span>
                </label>
                <input 
                  type="text" 
                  placeholder="+1 (908) 2357 534" 
                  className="w-full h-12 px-4 border border-gray-200 rounded text-sm focus:outline-none focus:border-teal-400 bg-white text-gray-900 placeholder-gray-400"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-[13px] font-semibold text-gray-900 flex items-center gap-0.5">
                    City <span className="text-red-500">*</span>
                  </label>
                  <input 
                    type="text" 
                    placeholder="company-city" 
                    className="w-full h-12 px-4 border border-gray-200 rounded text-sm focus:outline-none focus:border-teal-400 bg-white text-gray-900 placeholder-gray-400"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[13px] font-semibold text-gray-900 flex items-center gap-0.5">
                    State <span className="text-red-500">*</span>
                  </label>
                  <input 
                    type="text" 
                    placeholder="company-state" 
                    className="w-full h-12 px-4 border border-gray-200 rounded text-sm focus:outline-none focus:border-teal-400 bg-white text-gray-900 placeholder-gray-400"
                  />
                </div>
              </div>
            </div>

            {/* Section 2: Request Position Details */}
            <div className="space-y-8 pt-6">
              <h2 className="text-[11px] font-bold uppercase tracking-[0.15em] text-gray-900">
                REQUEST POSITION DETAILS
              </h2>

              <div className="flex flex-col gap-4">
                <label className="text-[13px] font-semibold text-gray-900 flex items-center gap-0.5">
                  Job title of the position(s) you're hiring for <span className="text-red-500">*</span>
                </label>
                
                <div className="space-y-3 mb-2">
                  {selectedPositions.map((pos, idx) => (
                    <div key={idx} className="flex items-center gap-3 text-[13px] text-gray-700 animate-in fade-in slide-in-from-left-2 duration-300">
                      <button 
                        type="button"
                        onClick={() => handleRemovePosition(pos)}
                        className="p-1 rounded-full hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors"
                        title="Remove"
                      >
                        <X size={14} />
                      </button>
                      <Check size={14} className="text-teal-500" />
                      <span className="font-medium text-gray-900">{pos}</span>
                    </div>
                  ))}
                </div>

                <div className="relative" ref={dropdownRef}>
                  <div 
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="relative w-full h-12 pl-11 pr-10 border border-gray-200 rounded text-sm flex items-center bg-white cursor-pointer hover:border-teal-400 transition-all text-gray-400"
                  >
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                      <Plus size={16} />
                    </div>
                    <span>Add new job position</span>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300">
                      <ChevronDown size={18} className={`transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                    </div>
                  </div>

                  {isDropdownOpen && (
                    <div className="absolute z-20 top-full left-0 w-full mt-1 bg-white border border-gray-200 rounded shadow-xl max-h-60 overflow-y-auto no-scrollbar animate-in fade-in zoom-in-95 duration-200">
                      {availablePositions.map((pos) => (
                        <div 
                          key={pos}
                          onClick={() => handleAddPosition(pos)}
                          className={`px-6 py-3 text-sm cursor-pointer hover:bg-teal-50 transition-colors flex items-center justify-between ${selectedPositions.includes(pos) ? 'text-teal-600 font-semibold bg-teal-50/30' : 'text-gray-700'}`}
                        >
                          {pos}
                          {selectedPositions.includes(pos) && <Check size={14} />}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[13px] font-semibold text-gray-900 flex items-center gap-0.5">
                  Type of Hire <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <select className="w-full h-12 px-4 appearance-none border border-gray-200 rounded text-sm focus:outline-none focus:border-teal-400 text-gray-700 bg-white cursor-pointer">
                    <option value="" disabled selected>Select hire type</option>
                    <option>Contract Roles</option>
                    <option>Permanent Hires</option>
                    <option>Project-Based/Bulk Staffing</option>
                    <option>I Am Not Sure</option>
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                    <ChevronDown size={18} />
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[13px] font-semibold text-gray-900 flex items-center gap-0.5">
                  Attach Job Description <span className="text-red-500">*</span>
                </label>
                <div className="flex items-center border border-gray-200 rounded overflow-hidden">
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    onChange={handleFileChange} 
                    className="hidden" 
                    accept=".pdf,.doc,.docx,.jpg"
                  />
                  <button 
                    type="button" 
                    onClick={triggerFileSelect}
                    className="bg-[#E3E8DE] px-6 h-12 text-[13px] font-semibold text-gray-800 border-r border-gray-200 hover:bg-[#d8ddd3] transition-colors whitespace-nowrap"
                  >
                    Choose file
                  </button>
                  <div className="flex-1 h-12 px-4 flex items-center bg-white text-gray-400 text-sm overflow-hidden text-ellipsis whitespace-nowrap">
                    {selectedFileName || "No file selected"}
                  </div>
                </div>
                <p className="text-[11px] text-gray-400 mt-1">
                  Accepted file types: pdf, doc, docx, jpg, Max. file size: 5 MB.
                </p>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[13px] font-semibold text-gray-900 flex items-center gap-0.5">
                  Additional Comments <span className="text-red-500">*</span>
                </label>
                <textarea 
                  placeholder="Type your comment here" 
                  className="w-full h-40 p-4 border border-gray-200 rounded text-sm focus:outline-none focus:border-teal-400 bg-white text-gray-900 placeholder-gray-400 resize-none"
                ></textarea>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-6">
              <button 
                type="submit"
                className="bg-[#68cfa3] hover:bg-[#5abf94] text-[#1B2C42] px-10 py-4 rounded-full text-sm font-bold flex items-center gap-2 transition-all shadow-md active:scale-95"
              >
                Submit <ArrowRight size={18} />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default page;