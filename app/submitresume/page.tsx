'use client';
import React, { useState, useRef } from 'react';
import { ArrowRight, ChevronDown } from 'lucide-react';

const page: React.FC = () => {
  const [resumeFileName, setResumeFileName] = useState<string | null>(null);
  const [certFileName, setCertFileName] = useState<string | null>(null);
  
  const resumeInputRef = useRef<HTMLInputElement>(null);
  const certInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'resume' | 'cert') => {
    const file = e.target.files?.[0];
    if (file) {
      if (type === 'resume') setResumeFileName(file.name);
      else setCertFileName(file.name);
    }
  };

  return (
    <div className="min-h-screen bg-[#E3E8DE] py-24 md:py-32 px-6 font-sans">
      <div className="max-w-4xl mx-auto">
        {/* Page Title */}
        <h1 className="font-serif text-[42px] md:text-[54px] text-[#1B2C42] text-center mb-12">
          Submit Resume/CV
        </h1>

        {/* Form Container */}
        <div className="bg-white rounded-[4px] shadow-sm p-8 md:p-16">
          <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
            
            {/* Name Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-[14px] font-bold text-gray-800">
                  First Name<span className="text-red-500">*</span>
                </label>
                <input 
                  type="text" 
                  placeholder="John" 
                  className="w-full h-12 px-4 border border-gray-200 rounded-[4px] text-sm focus:outline-none focus:border-teal-400 bg-white text-gray-900 placeholder-gray-400"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[14px] font-bold text-gray-800">
                  Last Name<span className="text-red-500">*</span>
                </label>
                <input 
                  type="text" 
                  placeholder="Doe" 
                  className="w-full h-12 px-4 border border-gray-200 rounded-[4px] text-sm focus:outline-none focus:border-teal-400 bg-white text-gray-900 placeholder-gray-400"
                />
              </div>
            </div>

            {/* Email Field */}
            <div className="flex flex-col gap-2">
              <label className="text-[14px] font-bold text-gray-800">
                Email Address<span className="text-red-500">*</span>
              </label>
              <input 
                type="email" 
                placeholder="business-email@companyname.com" 
                className="w-full h-12 px-4 border border-gray-200 rounded-[4px] text-sm focus:outline-none focus:border-teal-400 bg-white text-gray-900 placeholder-gray-400"
              />
            </div>

            {/* Phone Field */}
            <div className="flex flex-col gap-2">
              <label className="text-[14px] font-bold text-gray-800">
                Phone Number<span className="text-red-500">*</span>
              </label>
              <input 
                type="text" 
                placeholder="+1 (908) 2357 534" 
                className="w-full h-12 px-4 border border-gray-200 rounded-[4px] text-sm focus:outline-none focus:border-teal-400 bg-white text-gray-900 placeholder-gray-400"
              />
            </div>

            {/* City & State Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-[14px] font-bold text-gray-800">
                  City<span className="text-red-500">*</span>
                </label>
                <input 
                  type="text" 
                  placeholder="company-city" 
                  className="w-full h-12 px-4 border border-gray-200 rounded-[4px] text-sm focus:outline-none focus:border-teal-400 bg-white text-gray-900 placeholder-gray-400"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[14px] font-bold text-gray-800">
                  State<span className="text-red-500">*</span>
                </label>
                <input 
                  type="text" 
                  placeholder="company-state" 
                  className="w-full h-12 px-4 border border-gray-200 rounded-[4px] text-sm focus:outline-none focus:border-teal-400 bg-white text-gray-900 placeholder-gray-400"
                />
              </div>
            </div>

            {/* Position Field */}
            <div className="flex flex-col gap-2">
              <label className="text-[14px] font-bold text-gray-800">
                Position Applying for<span className="text-red-500">*</span>
              </label>
              <input 
                type="text" 
                placeholder="Your desire postion" 
                className="w-full h-12 px-4 border border-gray-200 rounded-[4px] text-sm focus:outline-none focus:border-teal-400 bg-white text-gray-900 placeholder-gray-400"
              />
            </div>

            {/* CPR Dropdown */}
            <div className="flex flex-col gap-2">
              <label className="text-[14px] font-bold text-gray-800">
                Do you have CPR & First Aid?
              </label>
              <div className="relative">
                <select className="w-full h-12 px-4 appearance-none border border-gray-200 rounded-[4px] text-sm focus:outline-none focus:border-teal-400 text-gray-400 bg-white cursor-pointer">
                  <option>Yes/No</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                  <ChevronDown size={20} />
                </div>
              </div>
            </div>

            {/* Resume Upload */}
            <div className="flex flex-col gap-2">
              <label className="text-[14px] font-bold text-gray-800">
                Attach Resume/CV<span className="text-red-500">*</span>
              </label>
              <div className="flex items-center border border-gray-200 rounded-[4px] overflow-hidden">
                <input 
                  type="file" 
                  ref={resumeInputRef}
                  onChange={(e) => handleFileChange(e, 'resume')}
                  className="hidden" 
                  accept=".pdf,.doc,.docx,.jpg"
                />
                <button 
                  type="button" 
                  onClick={() => resumeInputRef.current?.click()}
                  className="bg-[#E3E8DE] px-6 h-12 text-[13px] font-semibold text-gray-800 border-r border-gray-200 hover:bg-[#d8ddd3] transition-colors whitespace-nowrap"
                >
                  Choose file
                </button>
                <div className="flex-1 h-12 px-4 flex items-center bg-white text-gray-400 text-sm overflow-hidden text-ellipsis whitespace-nowrap">
                  {resumeFileName || ""}
                </div>
              </div>
              <p className="text-[11px] text-gray-400 mt-1">
                Accepted file types: pdf, doc, docx, jpg, Max. file size: 5 MB.
              </p>
            </div>

            {/* Certifications Upload */}
            <div className="flex flex-col gap-2">
              <label className="text-[14px] font-bold text-gray-800">
                Attach Certifications/Trainings<span className="text-red-500">*</span>
              </label>
              <div className="flex items-center border border-gray-200 rounded-[4px] overflow-hidden">
                <input 
                  type="file" 
                  ref={certInputRef}
                  onChange={(e) => handleFileChange(e, 'cert')}
                  className="hidden" 
                  accept=".pdf,.doc,.docx,.jpg"
                />
                <button 
                  type="button" 
                  onClick={() => certInputRef.current?.click()}
                  className="bg-[#E3E8DE] px-6 h-12 text-[13px] font-semibold text-gray-800 border-r border-gray-200 hover:bg-[#d8ddd3] transition-colors whitespace-nowrap"
                >
                  Choose file
                </button>
                <div className="flex-1 h-12 px-4 flex items-center bg-white text-gray-400 text-sm overflow-hidden text-ellipsis whitespace-nowrap">
                  {certFileName || ""}
                </div>
              </div>
              <p className="text-[11px] text-gray-400 mt-1">
                Accepted file types: pdf, doc, docx, jpg, Max. file size: 5 MB.
              </p>
            </div>

            {/* Comments Field */}
            <div className="flex flex-col gap-2">
              <label className="text-[14px] font-bold text-gray-800">
                Additional Comments<span className="text-red-500">*</span>
              </label>
              <textarea 
                placeholder="Type your comment here" 
                className="w-full h-40 p-4 border border-gray-200 rounded-[4px] text-sm focus:outline-none focus:border-teal-400 bg-white text-gray-900 placeholder-gray-400 resize-none"
              ></textarea>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button 
                type="submit"
                className="bg-[#68cfa3] hover:bg-[#5abf94] text-white px-10 py-4 rounded-full text-sm font-bold flex items-center gap-2 transition-all shadow-sm active:scale-95"
              >
                Submit <ArrowRight size={20} />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default page;