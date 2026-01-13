'use client';
import React, { useState, useRef, useEffect } from 'react';
import { ArrowRight, Plus, ChevronDown, Trash2 } from 'lucide-react';

interface PositionRequest {
  id: string;
  title: string;
  type: string;
}

const page: React.FC = () => {
  const [positionRequests, setPositionRequests] = useState<PositionRequest[]>([
    { id: crypto.randomUUID(), title: "", type: "Contract role" }
  ]);
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAddPosition = () => {
    setPositionRequests([
      ...positionRequests,
      { id: crypto.randomUUID(), title: "", type: "Contract role" }
    ]);
  };

  const handleRemovePosition = (id: string) => {
    if (positionRequests.length > 1) {
      setPositionRequests(positionRequests.filter(pos => pos.id !== id));
    }
  };

  const handleUpdatePosition = (id: string, field: keyof PositionRequest, value: string) => {
    setPositionRequests(positionRequests.map(pos => 
      pos.id === id ? { ...pos, [field]: value } : pos
    ));
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

  return (
    <div className="min-h-screen bg-[#E3E8DE] pt-40 pb-20 px-6 font-sans">
      <div className="max-w-4xl mx-auto">
        {/* Page Title */}
        <h1 className="font-serif text-[42px] text-[#1B2C42] text-center mb-12 leading-tight">
          Submit Staffing Request
        </h1>

        {/* Form Container */}
        <div className="bg-white rounded-md shadow-sm p-6 md:p-16">
          <form className="space-y-12" onSubmit={(e) => e.preventDefault()}>
            
            {/* Section 1: Company Contact Details */}
            <div className="space-y-8">
              <h2 className="text-[11px] font-bold uppercase tracking-[0.15em] text-gray-900">
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
            <div className="space-y-6 pt-6">
              <h2 className="text-[11px] font-bold uppercase tracking-[0.15em] text-gray-900 mb-4">
                REQUEST POSITION DETAILS
              </h2>

              <div className="space-y-8">
                {positionRequests.map((pos, index) => (
                  <div key={pos.id} className="relative border border-gray-100 rounded-[8px] p-6 md:p-8 space-y-8 bg-white shadow-sm transition-all animate-in fade-in slide-in-from-top-2">
                    
                    {/* Header with Entry Count & Delete */}
                    <div className="flex items-center justify-between pb-4 border-b border-gray-50">
                      <span className="text-[10px] font-bold text-teal-500 tracking-widest uppercase">
                        POSITION ENTRY {index + 1}
                      </span>
                      {positionRequests.length > 1 && (
                        <button 
                          type="button"
                          onClick={() => handleRemovePosition(pos.id)}
                          className="flex items-center gap-1.5 text-red-400 hover:text-red-600 text-[11px] font-bold transition-colors"
                        >
                          <Trash2 size={14} /> REMOVE
                        </button>
                      )}
                    </div>

                    {/* Job Title Field */}
                    <div className="space-y-4">
                      <label className="text-[13px] font-bold text-gray-900 block">
                        Job title of the position(s) you're hiring for<span className="text-red-500">*</span>
                      </label>
                      <input 
                        type="text" 
                        value={pos.title}
                        onChange={(e) => handleUpdatePosition(pos.id, 'title', e.target.value)}
                        placeholder="Enter job title/role (e.g. Registered Nurse)" 
                        className="w-full h-12 px-4 border border-gray-100 rounded-[6px] text-sm focus:outline-none focus:border-teal-400 bg-[#FAFAFA] text-gray-900 placeholder-gray-400"
                      />
                    </div>

                    {/* Type of Hire Field */}
                    <div className="space-y-4">
                      <label className="text-[13px] font-bold text-gray-900 block">
                        Type of Hire<span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <select 
                          value={pos.type}
                          onChange={(e) => handleUpdatePosition(pos.id, 'type', e.target.value)}
                          className="w-full h-12 px-4 appearance-none border border-gray-100 rounded-[6px] text-sm focus:outline-none focus:border-teal-400 text-gray-700 bg-[#FAFAFA] cursor-pointer"
                        >
                          <option value="Contract role">Contract role</option>
                          <option value="Permanent Hire">Permanent Hire</option>
                          <option value="Project-Based">Project-Based</option>
                          <option value="Bulk Staffing">Bulk Staffing</option>
                        </select>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                          <ChevronDown size={18} />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Add New Job Position Trigger - Now Left Aligned */}
              <div className="pt-4 flex justify-start">
                <button 
                  type="button"
                  onClick={handleAddPosition}
                  className="px-8 h-14 border-2 border-dashed border-gray-200 rounded-[8px] flex items-center justify-center gap-3 text-[#1B2C42]/50 hover:text-[#1B2C42] hover:border-teal-400 hover:bg-teal-50/20 transition-all font-bold text-sm"
                >
                  <Plus size={20} className="text-teal-500" />
                  Add new job position
                </button>
              </div>

              {/* Attach Job Description */}
              <div className="flex flex-col gap-2 mt-12">
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

              {/* Additional Comments */}
              <div className="flex flex-col gap-2 mt-8">
                <label className="text-[13px] font-semibold text-gray-900 flex items-center gap-0.5">
                  Additional Comments <span className="text-red-500">*</span>
                </label>
                <textarea 
                  placeholder="Type your comment here (e.g. shift patterns, specific certifications required, etc.)" 
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
                Submit Staffing Request <ArrowRight size={18} />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default page;