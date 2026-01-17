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

















// 'use client';
// import React, { useState, useRef } from 'react';
// import { ArrowRight, Plus, ChevronDown, Trash2, Upload, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

// interface PositionRequest {
//   id: string;
//   jobTitle: string;
//   hireType: string;
// }

// const StaffingRequestPage: React.FC = () => {
//   // Form state
//   const [formData, setFormData] = useState({
//     firstName: '',
//     lastName: '',
//     companyName: '',
//     email: '',
//     phone: '',
//     city: '',
//     state: '',
//     comments: ''
//   });
  
//   // Position requests
//   const [positionRequests, setPositionRequests] = useState<PositionRequest[]>([
//     { id: crypto.randomUUID(), jobTitle: "", hireType: "Contract role" }
//   ]);
  
//   // File state
//   const [jobDescriptionFile, setJobDescriptionFile] = useState<File | null>(null);
//   const [selectedFileName, setSelectedFileName] = useState<string>('');
  
//   // UI state
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [submitMessage, setSubmitMessage] = useState('');
//   const [submitSuccess, setSubmitSuccess] = useState(false);
//   const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  
//   // Refs
//   const fileInputRef = useRef<HTMLInputElement>(null);

//   // Handle text input changes
//   const handleInputChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
//   ) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
    
//     // Clear validation error for this field
//     if (validationErrors[name]) {
//       setValidationErrors(prev => {
//         const newErrors = { ...prev };
//         delete newErrors[name];
//         return newErrors;
//       });
//     }
//   };

//   // Add new position
//   const handleAddPosition = () => {
//     setPositionRequests([
//       ...positionRequests,
//       { id: crypto.randomUUID(), jobTitle: "", hireType: "Contract role" }
//     ]);
    
//     // Clear position errors
//     setValidationErrors(prev => {
//       const newErrors = { ...prev };
//       Object.keys(newErrors).forEach(key => {
//         if (key.startsWith('position-')) delete newErrors[key];
//       });
//       return newErrors;
//     });
//   };

//   // Remove position
//   const handleRemovePosition = (id: string) => {
//     if (positionRequests.length > 1) {
//       setPositionRequests(positionRequests.filter(pos => pos.id !== id));
      
//       // Clear errors for removed position
//       setValidationErrors(prev => {
//         const newErrors = { ...prev };
//         Object.keys(newErrors).forEach(key => {
//           if (key.includes(id)) delete newErrors[key];
//         });
//         return newErrors;
//       });
//     }
//   };

//   // Update position
//   const handleUpdatePosition = (id: string, field: keyof PositionRequest, value: string) => {
//     setPositionRequests(positionRequests.map(pos => 
//       pos.id === id ? { ...pos, [field]: value } : pos
//     ));
    
//     // Clear error for this field
//     const errorKey = `position-${id}-${field}`;
//     if (validationErrors[errorKey]) {
//       setValidationErrors(prev => {
//         const newErrors = { ...prev };
//         delete newErrors[errorKey];
//         return newErrors;
//       });
//     }
//   };

//   // Handle file selection
//   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0];
//     if (!file) return;

//     // Validate file size (5MB max)
//     const maxSize = 5 * 1024 * 1024; // 5MB
//     if (file.size > maxSize) {
//       setValidationErrors(prev => ({
//         ...prev,
//         jobDescription: 'File size must be less than 5MB'
//       }));
      
//       // Clear file input
//       event.target.value = '';
//       setJobDescriptionFile(null);
//       setSelectedFileName('');
//       return;
//     }

//     // Validate file type
//     const allowedTypes = [
//       'application/pdf',
//       'application/msword',
//       'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
//       'image/jpeg',
//       'image/jpg',
//       'image/png',
//       'text/plain'
//     ];
    
//     if (!allowedTypes.includes(file.type)) {
//       setValidationErrors(prev => ({
//         ...prev,
//         jobDescription: 'File must be PDF, DOC, DOCX, JPG, PNG, or TXT'
//       }));
      
//       // Clear file input
//       event.target.value = '';
//       setJobDescriptionFile(null);
//       setSelectedFileName('');
//       return;
//     }

//     setJobDescriptionFile(file);
//     setSelectedFileName(file.name);
    
//     // Clear file error
//     if (validationErrors.jobDescription) {
//       setValidationErrors(prev => {
//         const newErrors = { ...prev };
//         delete newErrors.jobDescription;
//         return newErrors;
//       });
//     }
//   };

//   // Trigger file select
//   const triggerFileSelect = () => {
//     fileInputRef.current?.click();
//   };

//   // Format file size
//   const formatFileSize = (bytes: number): string => {
//     if (bytes < 1024) return bytes + ' B';
//     if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
//     return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
//   };

//   // Validate form
//   const validateForm = (): boolean => {
//     const errors: Record<string, string> = {};

//     // Company contact validation
//     if (!formData.firstName.trim()) {
//       errors.firstName = 'First name is required';
//     } else if (formData.firstName.trim().length < 2) {
//       errors.firstName = 'First name must be at least 2 characters';
//     }

//     if (!formData.lastName.trim()) {
//       errors.lastName = 'Last name is required';
//     } else if (formData.lastName.trim().length < 2) {
//       errors.lastName = 'Last name must be at least 2 characters';
//     }

//     if (!formData.companyName.trim()) {
//       errors.companyName = 'Company name is required';
//     }

//     if (!formData.email.trim()) {
//       errors.email = 'Email is required';
//     } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
//       errors.email = 'Please enter a valid email address';
//     }

//     if (!formData.phone.trim()) {
//       errors.phone = 'Phone number is required';
//     } else if (!/^[\+]?[0-9\s\-\(\)]{10,20}$/.test(formData.phone.replace(/\s/g, ''))) {
//       errors.phone = 'Please enter a valid phone number (10-20 digits)';
//     }

//     if (!formData.city.trim()) {
//       errors.city = 'City is required';
//     }

//     if (!formData.state.trim()) {
//       errors.state = 'State is required';
//     }

//     // Position validation
//     positionRequests.forEach((pos, index) => {
//       if (!pos.jobTitle.trim()) {
//         errors[`position-${pos.id}-jobTitle`] = `Position ${index + 1}: Job title is required`;
//       }
//       if (!pos.hireType.trim()) {
//         errors[`position-${pos.id}-hireType`] = `Position ${index + 1}: Hire type is required`;
//       }
//     });

//     // File validation
//     if (!jobDescriptionFile) {
//       errors.jobDescription = 'Job description file is required';
//     }

//     // Comments validation (optional)
//     if (formData.comments && formData.comments.length > 5000) {
//       errors.comments = 'Comments cannot exceed 5000 characters';
//     }

//     setValidationErrors(errors);
//     return Object.keys(errors).length === 0;
//   };

//   // Handle form submission
//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
    
//     if (!validateForm()) {
//       setSubmitMessage('Please fix the errors in the form');
//       setSubmitSuccess(false);
      
//       // Scroll to first error
//       const firstErrorField = Object.keys(validationErrors)[0];
//       if (firstErrorField) {
//         const element = document.getElementById(firstErrorField);
//         if (element) {
//           element.scrollIntoView({ behavior: 'smooth', block: 'center' });
//           element.focus();
//         }
//       }
//       return;
//     }

//     setIsSubmitting(true);
//     setSubmitMessage('');
//     setSubmitSuccess(false);

//     try {
//       // Create FormData
//       const formDataToSend = new FormData();
      
//       // Add company details
//       Object.entries(formData).forEach(([key, value]) => {
//         if (value) formDataToSend.append(key, value);
//       });
      
//       // Add position count
//       formDataToSend.append('positionCount', positionRequests.length.toString());
      
//       // Add positions
//       positionRequests.forEach((pos, index) => {
//         formDataToSend.append(`positions[${index}].jobTitle`, pos.jobTitle);
//         formDataToSend.append(`positions[${index}].hireType`, pos.hireType);
//       });
      
//       // Add file
//       if (jobDescriptionFile) {
//         formDataToSend.append('jobDescription', jobDescriptionFile);
//       }

//       // Submit to API
//       const response = await fetch('/api/staffing/request', {
//         method: 'POST',
//         body: formDataToSend,
//       });

//       const result = await response.json();

//       if (response.ok) {
//         // Success
//         setSubmitSuccess(true);
//         setSubmitMessage(`${result.message} Reference: ${result.referenceNumber}`);
        
//         // Reset form
//         setFormData({
//           firstName: '',
//           lastName: '',
//           companyName: '',
//           email: '',
//           phone: '',
//           city: '',
//           state: '',
//           comments: ''
//         });
//         setPositionRequests([{ id: crypto.randomUUID(), jobTitle: "", hireType: "Contract role" }]);
//         setJobDescriptionFile(null);
//         setSelectedFileName('');
//         setValidationErrors({});
        
//         // Clear file input
//         if (fileInputRef.current) fileInputRef.current.value = '';
        
//         // Reset success message after 10 seconds
//         setTimeout(() => {
//           setSubmitSuccess(false);
//           setSubmitMessage('');
//         }, 10000);
        
//       } else {
//         // Handle errors
//         setSubmitSuccess(false);
        
//         if (response.status === 429) {
//           setSubmitMessage('Too many submission attempts. Please try again tomorrow.');
//         } else if (result.errors) {
//           // Map server errors to field errors
//           const fieldErrors: Record<string, string> = {};
//           result.errors.forEach((error: string) => {
//             if (error.includes('First name')) fieldErrors.firstName = error;
//             else if (error.includes('Last name')) fieldErrors.lastName = error;
//             else if (error.includes('Company')) fieldErrors.companyName = error;
//             else if (error.includes('Email')) fieldErrors.email = error;
//             else if (error.includes('Phone')) fieldErrors.phone = error;
//             else if (error.includes('City')) fieldErrors.city = error;
//             else if (error.includes('State')) fieldErrors.state = error;
//             else if (error.includes('Job description')) fieldErrors.jobDescription = error;
//             else if (error.includes('Position')) {
//               // Extract position index from error message
//               const match = error.match(/Position (\d+):/);
//               if (match && positionRequests[parseInt(match[1]) - 1]) {
//                 const posId = positionRequests[parseInt(match[1]) - 1].id;
//                 if (error.includes('Job title')) {
//                   fieldErrors[`position-${posId}-jobTitle`] = error;
//                 } else if (error.includes('Hire type')) {
//                   fieldErrors[`position-${posId}-hireType`] = error;
//                 }
//               }
//             }
//           });
          
//           setValidationErrors(fieldErrors);
//           setSubmitMessage('Please fix the errors highlighted below.');
//         } else {
//           setSubmitMessage(result.message || 'Failed to submit your staffing request. Please try again.');
//         }
//       }
//     } catch (error) {
//       console.error('Submission error:', error);
//       setSubmitSuccess(false);
//       setSubmitMessage('An error occurred while submitting your request. Please try again.');
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   // Check if form is valid
//   const isFormValid = () => {
//     const hasRequiredFields = 
//       formData.firstName.trim() &&
//       formData.lastName.trim() &&
//       formData.companyName.trim() &&
//       formData.email.trim() &&
//       formData.phone.trim() &&
//       formData.city.trim() &&
//       formData.state.trim() &&
//       positionRequests.every(pos => pos.jobTitle.trim() && pos.hireType.trim()) &&
//       jobDescriptionFile;
    
//     const hasNoErrors = Object.keys(validationErrors).length === 0;
    
//     return hasRequiredFields && hasNoErrors;
//   };

//   return (
//     <div className="min-h-screen bg-[#E3E8DE] pt-40 pb-20 px-6 font-sans">
//       <div className="max-w-4xl mx-auto">
//         {/* Page Title */}
//         <h1 className="font-serif text-[42px] text-[#1B2C42] text-center mb-12 leading-tight">
//           Submit Staffing Request
//         </h1>

//         {/* Form Container */}
//         <div className="bg-white rounded-md shadow-sm p-6 md:p-16 relative">
//           {/* Success/Error Message */}
//           {submitMessage && (
//             <div className={`mb-8 p-4 rounded-lg flex items-start gap-3 ${
//               submitSuccess 
//                 ? 'bg-green-50 text-green-800 border border-green-200' 
//                 : 'bg-red-50 text-red-800 border border-red-200'
//             }`}>
//               {submitSuccess ? (
//                 <CheckCircle className="w-5 h-5 mt-0.5 shrink-0" />
//               ) : (
//                 <XCircle className="w-5 h-5 mt-0.5 shrink-0" />
//               )}
//               <div className="flex-1">
//                 <p className="font-medium">{submitMessage}</p>
//                 {submitSuccess && (
//                   <p className="text-sm mt-1 opacity-90">
//                     A confirmation email has been sent to {formData.email || 'your email address'}
//                   </p>
//                 )}
//               </div>
//             </div>
//           )}

//           <form className="space-y-12" onSubmit={handleSubmit} noValidate>
//             {/* Section 1: Company Contact Details */}
//             <div className="space-y-8">
//               <h2 className="text-[11px] font-bold uppercase tracking-[0.15em] text-gray-900">
//                 COMPANY CONTACT DETAILS
//               </h2>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div className="flex flex-col gap-2">
//                   <label className="text-[13px] font-semibold text-gray-900 flex items-center gap-0.5">
//                     First Name <span className="text-red-500">*</span>
//                     {validationErrors.firstName && (
//                       <span className="text-red-500 text-xs flex items-center gap-1 ml-auto">
//                         <AlertCircle size={12} />
//                         {validationErrors.firstName}
//                       </span>
//                     )}
//                   </label>
//                   <input 
//                     type="text" 
//                     name="firstName"
//                     id="firstName"
//                     placeholder="John" 
//                     value={formData.firstName}
//                     onChange={handleInputChange}
//                     className={`w-full h-12 px-4 border rounded text-sm focus:outline-none focus:border-teal-400 bg-white text-gray-900 placeholder-gray-400 ${
//                       validationErrors.firstName ? 'border-red-300' : 'border-gray-200'
//                     }`}
//                     disabled={isSubmitting}
//                   />
//                 </div>
//                 <div className="flex flex-col gap-2">
//                   <label className="text-[13px] font-semibold text-gray-900 flex items-center gap-0.5">
//                     Last Name <span className="text-red-500">*</span>
//                     {validationErrors.lastName && (
//                       <span className="text-red-500 text-xs flex items-center gap-1 ml-auto">
//                         <AlertCircle size={12} />
//                         {validationErrors.lastName}
//                       </span>
//                     )}
//                   </label>
//                   <input 
//                     type="text" 
//                     name="lastName"
//                     id="lastName"
//                     placeholder="Doe" 
//                     value={formData.lastName}
//                     onChange={handleInputChange}
//                     className={`w-full h-12 px-4 border rounded text-sm focus:outline-none focus:border-teal-400 bg-white text-gray-900 placeholder-gray-400 ${
//                       validationErrors.lastName ? 'border-red-300' : 'border-gray-200'
//                     }`}
//                     disabled={isSubmitting}
//                   />
//                 </div>
//               </div>

//               <div className="flex flex-col gap-2">
//                 <label className="text-[13px] font-semibold text-gray-900 flex items-center gap-0.5">
//                   Company's Name <span className="text-red-500">*</span>
//                   {validationErrors.companyName && (
//                     <span className="text-red-500 text-xs flex items-center gap-1 ml-auto">
//                       <AlertCircle size={12} />
//                       {validationErrors.companyName}
//                     </span>
//                   )}
//                 </label>
//                 <input 
//                   type="text" 
//                   name="companyName"
//                   id="companyName"
//                   placeholder="Your company's name" 
//                   value={formData.companyName}
//                   onChange={handleInputChange}
//                   className={`w-full h-12 px-4 border rounded text-sm focus:outline-none focus:border-teal-400 bg-white text-gray-900 placeholder-gray-400 ${
//                     validationErrors.companyName ? 'border-red-300' : 'border-gray-200'
//                   }`}
//                   disabled={isSubmitting}
//                 />
//               </div>

//               <div className="flex flex-col gap-2">
//                 <label className="text-[13px] font-semibold text-gray-900 flex items-center gap-0.5">
//                   Business Email Address <span className="text-red-500">*</span>
//                   {validationErrors.email && (
//                     <span className="text-red-500 text-xs flex items-center gap-1 ml-auto">
//                       <AlertCircle size={12} />
//                       {validationErrors.email}
//                     </span>
//                   )}
//                 </label>
//                 <input 
//                   type="email" 
//                   name="email"
//                   id="email"
//                   placeholder="business-email@companyname.com" 
//                   value={formData.email}
//                   onChange={handleInputChange}
//                   className={`w-full h-12 px-4 border rounded text-sm focus:outline-none focus:border-teal-400 bg-white text-gray-900 placeholder-gray-400 ${
//                     validationErrors.email ? 'border-red-300' : 'border-gray-200'
//                   }`}
//                   disabled={isSubmitting}
//                 />
//               </div>

//               <div className="flex flex-col gap-2">
//                 <label className="text-[13px] font-semibold text-gray-900 flex items-center gap-0.5">
//                   Contact Number <span className="text-red-500">*</span>
//                   {validationErrors.phone && (
//                     <span className="text-red-500 text-xs flex items-center gap-1 ml-auto">
//                       <AlertCircle size={12} />
//                       {validationErrors.phone}
//                     </span>
//                   )}
//                 </label>
//                 <input 
//                   type="text" 
//                   name="phone"
//                   id="phone"
//                   placeholder="+1 (908) 235-7534" 
//                   value={formData.phone}
//                   onChange={handleInputChange}
//                   className={`w-full h-12 px-4 border rounded text-sm focus:outline-none focus:border-teal-400 bg-white text-gray-900 placeholder-gray-400 ${
//                     validationErrors.phone ? 'border-red-300' : 'border-gray-200'
//                   }`}
//                   disabled={isSubmitting}
//                 />
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div className="flex flex-col gap-2">
//                   <label className="text-[13px] font-semibold text-gray-900 flex items-center gap-0.5">
//                     City <span className="text-red-500">*</span>
//                     {validationErrors.city && (
//                       <span className="text-red-500 text-xs flex items-center gap-1 ml-auto">
//                         <AlertCircle size={12} />
//                         {validationErrors.city}
//                       </span>
//                     )}
//                   </label>
//                   <input 
//                     type="text" 
//                     name="city"
//                     id="city"
//                     placeholder="San Francisco" 
//                     value={formData.city}
//                     onChange={handleInputChange}
//                     className={`w-full h-12 px-4 border rounded text-sm focus:outline-none focus:border-teal-400 bg-white text-gray-900 placeholder-gray-400 ${
//                       validationErrors.city ? 'border-red-300' : 'border-gray-200'
//                     }`}
//                     disabled={isSubmitting}
//                   />
//                 </div>
//                 <div className="flex flex-col gap-2">
//                   <label className="text-[13px] font-semibold text-gray-900 flex items-center gap-0.5">
//                     State <span className="text-red-500">*</span>
//                     {validationErrors.state && (
//                       <span className="text-red-500 text-xs flex items-center gap-1 ml-auto">
//                         <AlertCircle size={12} />
//                         {validationErrors.state}
//                       </span>
//                     )}
//                   </label>
//                   <input 
//                     type="text" 
//                     name="state"
//                     id="state"
//                     placeholder="CA" 
//                     value={formData.state}
//                     onChange={handleInputChange}
//                     className={`w-full h-12 px-4 border rounded text-sm focus:outline-none focus:border-teal-400 bg-white text-gray-900 placeholder-gray-400 ${
//                       validationErrors.state ? 'border-red-300' : 'border-gray-200'
//                     }`}
//                     disabled={isSubmitting}
//                   />
//                 </div>
//               </div>
//             </div>

//             {/* Section 2: Request Position Details */}
//             <div className="space-y-6 pt-6">
//               <h2 className="text-[11px] font-bold uppercase tracking-[0.15em] text-gray-900 mb-4">
//                 REQUEST POSITION DETAILS
//               </h2>

//               <div className="space-y-8">
//                 {positionRequests.map((pos, index) => (
//                   <div key={pos.id} className="relative border border-gray-100 rounded-[8px] p-6 md:p-8 space-y-8 bg-white shadow-sm">
                    
//                     {/* Header with Entry Count & Delete */}
//                     <div className="flex items-center justify-between pb-4 border-b border-gray-50">
//                       <span className="text-[10px] font-bold text-teal-500 tracking-widest uppercase">
//                         POSITION ENTRY {index + 1}
//                       </span>
//                       {positionRequests.length > 1 && (
//                         <button 
//                           type="button"
//                           onClick={() => handleRemovePosition(pos.id)}
//                           className="flex items-center gap-1.5 text-red-400 hover:text-red-600 text-[11px] font-bold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//                           disabled={isSubmitting}
//                         >
//                           <Trash2 size={14} /> REMOVE
//                         </button>
//                       )}
//                     </div>

//                     {/* Job Title Field */}
//                     <div className="space-y-4">
//                       <label className="text-[13px] font-bold text-gray-900 block">
//                         Job title of the position(s) you're hiring for<span className="text-red-500">*</span>
//                         {validationErrors[`position-${pos.id}-jobTitle`] && (
//                           <span className="text-red-500 text-xs flex items-center gap-1 ml-2">
//                             <AlertCircle size={12} />
//                             {validationErrors[`position-${pos.id}-jobTitle`]}
//                           </span>
//                         )}
//                       </label>
//                       <input 
//                         type="text" 
//                         value={pos.jobTitle}
//                         onChange={(e) => handleUpdatePosition(pos.id, 'jobTitle', e.target.value)}
//                         placeholder="Enter job title/role (e.g. Registered Nurse)" 
//                         className={`w-full h-12 px-4 border rounded-[6px] text-sm focus:outline-none focus:border-teal-400 bg-[#FAFAFA] text-gray-900 placeholder-gray-400 ${
//                           validationErrors[`position-${pos.id}-jobTitle`] ? 'border-red-300' : 'border-gray-100'
//                         }`}
//                         disabled={isSubmitting}
//                       />
//                     </div>

//                     {/* Type of Hire Field */}
//                     <div className="space-y-4">
//                       <label className="text-[13px] font-bold text-gray-900 block">
//                         Type of Hire<span className="text-red-500">*</span>
//                         {validationErrors[`position-${pos.id}-hireType`] && (
//                           <span className="text-red-500 text-xs flex items-center gap-1 ml-2">
//                             <AlertCircle size={12} />
//                             {validationErrors[`position-${pos.id}-hireType`]}
//                           </span>
//                         )}
//                       </label>
//                       <div className="relative">
//                         <select 
//                           value={pos.hireType}
//                           onChange={(e) => handleUpdatePosition(pos.id, 'hireType', e.target.value)}
//                           className={`w-full h-12 px-4 appearance-none border rounded-[6px] text-sm focus:outline-none focus:border-teal-400 text-gray-700 bg-[#FAFAFA] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${
//                             validationErrors[`position-${pos.id}-hireType`] ? 'border-red-300' : 'border-gray-100'
//                           }`}
//                           disabled={isSubmitting}
//                         >
//                           <option value="Contract role">Contract role</option>
//                           <option value="Permanent Hire">Permanent Hire</option>
//                           <option value="Project-Based">Project-Based</option>
//                           <option value="Bulk Staffing">Bulk Staffing</option>
//                         </select>
//                         <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
//                           <ChevronDown size={18} />
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>

//               {/* Add New Job Position */}
//               <div className="pt-4 flex justify-start">
//                 <button 
//                   type="button"
//                   onClick={handleAddPosition}
//                   className="px-8 h-14 border-2 border-dashed border-gray-200 rounded-[8px] flex items-center justify-center gap-3 text-[#1B2C42]/50 hover:text-[#1B2C42] hover:border-teal-400 hover:bg-teal-50/20 transition-all font-bold text-sm disabled:opacity-50 disabled:cursor-not-allowed"
//                   disabled={isSubmitting}
//                 >
//                   <Plus size={20} className="text-teal-500" />
//                   Add new job position
//                 </button>
//               </div>

//               {/* Attach Job Description */}
//               <div className="flex flex-col gap-2 mt-12">
//                 <label className="text-[13px] font-semibold text-gray-900 flex items-center gap-0.5">
//                   Attach Job Description <span className="text-red-500">*</span>
//                   {validationErrors.jobDescription && (
//                     <span className="text-red-500 text-xs flex items-center gap-1 ml-auto">
//                       <AlertCircle size={12} />
//                       {validationErrors.jobDescription}
//                     </span>
//                   )}
//                 </label>
//                 <div className={`flex items-center border rounded overflow-hidden ${
//                   validationErrors.jobDescription ? 'border-red-300' : 'border-gray-200'
//                 }`}>
//                   <input 
//                     type="file" 
//                     ref={fileInputRef} 
//                     onChange={handleFileChange} 
//                     className="hidden" 
//                     accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.txt"
//                     disabled={isSubmitting}
//                   />
//                   <button 
//                     type="button" 
//                     onClick={triggerFileSelect}
//                     className="bg-[#E3E8DE] px-6 h-12 text-[13px] font-semibold text-gray-800 border-r border-gray-200 hover:bg-[#d8ddd3] transition-colors whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
//                     disabled={isSubmitting}
//                   >
//                     <div className="flex items-center gap-2">
//                       <Upload size={16} />
//                       Choose file
//                     </div>
//                   </button>
//                   <div className="flex-1 h-12 px-4 flex items-center bg-white text-gray-900 text-sm overflow-hidden">
//                     {selectedFileName ? (
//                       <div className="flex items-center justify-between w-full">
//                         <span className="truncate">{selectedFileName}</span>
//                         {jobDescriptionFile && (
//                           <span className="text-xs text-gray-500 ml-2 shrink-0">
//                             {formatFileSize(jobDescriptionFile.size)}
//                           </span>
//                         )}
//                       </div>
//                     ) : (
//                       <span className="text-gray-400">No file selected</span>
//                     )}
//                   </div>
//                 </div>
//                 <p className="text-[11px] text-gray-400 mt-1">
//                   Accepted file types: pdf, doc, docx, jpg, png, txt. Max. file size: 5 MB.
//                 </p>
//               </div>

//               {/* Additional Comments */}
//               <div className="flex flex-col gap-2 mt-8">
//                 <label className="text-[13px] font-semibold text-gray-900 flex items-center gap-0.5">
//                   Additional Comments
//                   {validationErrors.comments && (
//                     <span className="text-red-500 text-xs flex items-center gap-1 ml-auto">
//                       <AlertCircle size={12} />
//                       {validationErrors.comments}
//                     </span>
//                   )}
//                   <span className="ml-auto text-xs text-gray-500">
//                     {formData.comments.length}/5000
//                   </span>
//                 </label>
//                 <textarea 
//                   name="comments"
//                   placeholder="Type your comment here (e.g. shift patterns, specific certifications required, timeline, etc.)" 
//                   value={formData.comments}
//                   onChange={handleInputChange}
//                   className={`w-full h-40 p-4 border rounded text-sm focus:outline-none focus:border-teal-400 bg-white text-gray-900 placeholder-gray-400 resize-none ${
//                     validationErrors.comments ? 'border-red-300' : 'border-gray-200'
//                   }`}
//                   disabled={isSubmitting}
//                   maxLength={5000}
//                 ></textarea>
//                 <p className="text-[11px] text-gray-400">
//                   Optional. Maximum 5000 characters.
//                 </p>
//               </div>
//             </div>

//             {/* Submit Button */}
//             <div className="pt-6">
//               <button 
//                 type="submit"
//                 disabled={isSubmitting || !isFormValid()}
//                 className={`w-full md:w-auto ${
//                   isSubmitting || !isFormValid() 
//                     ? 'bg-gray-400 cursor-not-allowed' 
//                     : 'bg-[#68cfa3] hover:bg-[#5abf94] hover:scale-[1.02] active:scale-[0.98]'
//                 } text-[#1B2C42] px-10 py-4 rounded-full text-sm font-bold flex items-center justify-center gap-2 transition-all shadow-md disabled:opacity-50`}
//               >
//                 {isSubmitting ? (
//                   <>
//                     <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-[#1B2C42]"></div>
//                     Submitting...
//                   </>
//                 ) : (
//                   <>
//                     Submit Staffing Request <ArrowRight size={18} />
//                   </>
//                 )}
//               </button>
              
//               <div className="mt-4 text-xs text-gray-500 space-y-1">
//                 <p>By submitting this form, you agree to:</p>
//                 <ul className="list-disc pl-5 space-y-1">
//                   <li>Receive a confirmation email with your request details</li>
//                   <li>Be contacted by our staffing team within 24-48 business hours</li>
//                   <li>Have your job description stored securely for candidate matching</li>
//                 </ul>
//                 <p className="mt-2">
//                   Need immediate assistance? Email{' '}
//                   <a href="mailto:staffing@prudentresources.com" className="text-[#68cfa3] hover:underline">
//                     staffing@prudentresources.com
//                   </a>{' '}
//                   or call{' '}
//                   <a href="tel:+14439855388" className="text-[#68cfa3] hover:underline">
//                     +1 443 985 5388
//                   </a>
//                 </p>
//               </div>
//             </div>
//           </form>

//           {/* Loading overlay */}
//           {isSubmitting && (
//             <div className="absolute inset-0 bg-black/5 rounded-md flex items-center justify-center">
//               <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center gap-3">
//                 <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#68cfa3]"></div>
//                 <p className="text-gray-700 font-medium">Submitting your staffing request...</p>
//                 <p className="text-sm text-gray-500 text-center">
//                   Please wait while we process your request and upload files.
//                   This may take a moment.
//                 </p>
//               </div>
//             </div>
//           )}
//         </div>

//         {/* Info Section */}
//         <div className="mt-12 bg-white rounded-md shadow-sm p-8">
//           <h3 className="text-xl font-bold text-[#1B2C42] mb-4">Our Staffing Process</h3>
//           <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
//             <div className="flex flex-col gap-2">
//               <div className="w-10 h-10 bg-[#E3E8DE] rounded-full flex items-center justify-center mb-2">
//                 <span className="font-bold text-[#1B2C42]">1</span>
//               </div>
//               <h4 className="font-semibold text-gray-800">Request Review</h4>
//               <p className="text-sm text-gray-600">
//                 Our staffing specialists review your requirements within 24 hours.
//               </p>
//             </div>
//             <div className="flex flex-col gap-2">
//               <div className="w-10 h-10 bg-[#E3E8DE] rounded-full flex items-center justify-center mb-2">
//                 <span className="font-bold text-[#1B2C42]">2</span>
//               </div>
//               <h4 className="font-semibold text-gray-800">Candidate Matching</h4>
//               <p className="text-sm text-gray-600">
//                 We match your requirements with our pre-screened candidate database.
//               </p>
//             </div>
//             <div className="flex flex-col gap-2">
//               <div className="w-10 h-10 bg-[#E3E8DE] rounded-full flex items-center justify-center mb-2">
//                 <span className="font-bold text-[#1B2C42]">3</span>
//               </div>
//               <h4 className="font-semibold text-gray-800">Candidate Presentation</h4>
//               <p className="text-sm text-gray-600">
//                 We present qualified candidates within 3-5 business days.
//               </p>
//             </div>
//             <div className="flex flex-col gap-2">
//               <div className="w-10 h-10 bg-[#E3E8DE] rounded-full flex items-center justify-center mb-2">
//                 <span className="font-bold text-[#1B2C42]">4</span>
//               </div>
//               <h4 className="font-semibold text-gray-800">Onboarding Support</h4>
//               <p className="text-sm text-gray-600">
//                 We handle all paperwork and onboarding for selected candidates.
//               </p>
//             </div>
//           </div>
          
//           <div className="mt-8 pt-6 border-t border-gray-200">
//             <h4 className="font-semibold text-gray-800 mb-2">Why Choose Prudent Resources?</h4>
//             <ul className="text-sm text-gray-600 space-y-1">
//               <li>✓ Pre-screened, qualified candidates</li>
//               <li>✓ Fast turnaround time (3-5 business days)</li>
//               <li>✓ Industry-specific expertise</li>
//               <li>✓ Comprehensive background checks</li>
//               <li>✓ Ongoing support and replacement guarantee</li>
//             </ul>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default StaffingRequestPage;