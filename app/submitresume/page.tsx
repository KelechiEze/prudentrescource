// 'use client';
// import React, { useState, useRef } from 'react';
// import { ArrowRight, ChevronDown } from 'lucide-react';

// const page: React.FC = () => {
//   const [resumeFileName, setResumeFileName] = useState<string | null>(null);
//   const [certFileName, setCertFileName] = useState<string | null>(null);
  
//   const resumeInputRef = useRef<HTMLInputElement>(null);
//   const certInputRef = useRef<HTMLInputElement>(null);

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'resume' | 'cert') => {
//     const file = e.target.files?.[0];
//     if (file) {
//       if (type === 'resume') setResumeFileName(file.name);
//       else setCertFileName(file.name);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-[#E3E8DE] py-24 md:py-32 px-6 font-sans">
//       <div className="max-w-4xl mx-auto">
//         {/* Page Title */}
//         <h1 className="font-serif text-[42px] md:text-[54px] text-[#1B2C42] text-center mb-12">
//           Submit Resume/CV
//         </h1>

//         {/* Form Container */}
//         <div className="bg-white rounded-[4px] shadow-sm p-8 md:p-16">
//           <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
            
//             {/* Name Fields */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div className="flex flex-col gap-2">
//                 <label className="text-[14px] font-bold text-gray-800">
//                   First Name<span className="text-red-500">*</span>
//                 </label>
//                 <input 
//                   type="text" 
//                   placeholder="John" 
//                   className="w-full h-12 px-4 border border-gray-200 rounded-[4px] text-sm focus:outline-none focus:border-teal-400 bg-white text-gray-900 placeholder-gray-400"
//                 />
//               </div>
//               <div className="flex flex-col gap-2">
//                 <label className="text-[14px] font-bold text-gray-800">
//                   Last Name<span className="text-red-500">*</span>
//                 </label>
//                 <input 
//                   type="text" 
//                   placeholder="Doe" 
//                   className="w-full h-12 px-4 border border-gray-200 rounded-[4px] text-sm focus:outline-none focus:border-teal-400 bg-white text-gray-900 placeholder-gray-400"
//                 />
//               </div>
//             </div>

//             {/* Email Field */}
//             <div className="flex flex-col gap-2">
//               <label className="text-[14px] font-bold text-gray-800">
//                 Email Address<span className="text-red-500">*</span>
//               </label>
//               <input 
//                 type="email" 
//                 placeholder="business-email@companyname.com" 
//                 className="w-full h-12 px-4 border border-gray-200 rounded-[4px] text-sm focus:outline-none focus:border-teal-400 bg-white text-gray-900 placeholder-gray-400"
//               />
//             </div>

//             {/* Phone Field */}
//             <div className="flex flex-col gap-2">
//               <label className="text-[14px] font-bold text-gray-800">
//                 Phone Number<span className="text-red-500">*</span>
//               </label>
//               <input 
//                 type="text" 
//                 placeholder="+1 (908) 2357 534" 
//                 className="w-full h-12 px-4 border border-gray-200 rounded-[4px] text-sm focus:outline-none focus:border-teal-400 bg-white text-gray-900 placeholder-gray-400"
//               />
//             </div>

//             {/* City & State Fields */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div className="flex flex-col gap-2">
//                 <label className="text-[14px] font-bold text-gray-800">
//                   City<span className="text-red-500">*</span>
//                 </label>
//                 <input 
//                   type="text" 
//                   placeholder="company-city" 
//                   className="w-full h-12 px-4 border border-gray-200 rounded-[4px] text-sm focus:outline-none focus:border-teal-400 bg-white text-gray-900 placeholder-gray-400"
//                 />
//               </div>
//               <div className="flex flex-col gap-2">
//                 <label className="text-[14px] font-bold text-gray-800">
//                   State<span className="text-red-500">*</span>
//                 </label>
//                 <input 
//                   type="text" 
//                   placeholder="company-state" 
//                   className="w-full h-12 px-4 border border-gray-200 rounded-[4px] text-sm focus:outline-none focus:border-teal-400 bg-white text-gray-900 placeholder-gray-400"
//                 />
//               </div>
//             </div>

//             {/* Position Field */}
//             <div className="flex flex-col gap-2">
//               <label className="text-[14px] font-bold text-gray-800">
//                 Position Applying for<span className="text-red-500">*</span>
//               </label>
//               <input 
//                 type="text" 
//                 placeholder="Your desire postion" 
//                 className="w-full h-12 px-4 border border-gray-200 rounded-[4px] text-sm focus:outline-none focus:border-teal-400 bg-white text-gray-900 placeholder-gray-400"
//               />
//             </div>

//             {/* CPR Dropdown */}
//             <div className="flex flex-col gap-2">
//               <label className="text-[14px] font-bold text-gray-800">
//                 Do you have CPR & First Aid?
//               </label>
//               <div className="relative">
//                 <select className="w-full h-12 px-4 appearance-none border border-gray-200 rounded-[4px] text-sm focus:outline-none focus:border-teal-400 text-gray-400 bg-white cursor-pointer">
//                   <option>Yes/No</option>
//                   <option value="yes">Yes</option>
//                   <option value="no">No</option>
//                 </select>
//                 <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
//                   <ChevronDown size={20} />
//                 </div>
//               </div>
//             </div>

//             {/* Resume Upload */}
//             <div className="flex flex-col gap-2">
//               <label className="text-[14px] font-bold text-gray-800">
//                 Attach Resume/CV<span className="text-red-500">*</span>
//               </label>
//               <div className="flex items-center border border-gray-200 rounded-[4px] overflow-hidden">
//                 <input 
//                   type="file" 
//                   ref={resumeInputRef}
//                   onChange={(e) => handleFileChange(e, 'resume')}
//                   className="hidden" 
//                   accept=".pdf,.doc,.docx,.jpg"
//                 />
//                 <button 
//                   type="button" 
//                   onClick={() => resumeInputRef.current?.click()}
//                   className="bg-[#E3E8DE] px-6 h-12 text-[13px] font-semibold text-gray-800 border-r border-gray-200 hover:bg-[#d8ddd3] transition-colors whitespace-nowrap"
//                 >
//                   Choose file
//                 </button>
//                 <div className="flex-1 h-12 px-4 flex items-center bg-white text-gray-400 text-sm overflow-hidden text-ellipsis whitespace-nowrap">
//                   {resumeFileName || ""}
//                 </div>
//               </div>
//               <p className="text-[11px] text-gray-400 mt-1">
//                 Accepted file types: pdf, doc, docx, jpg, Max. file size: 5 MB.
//               </p>
//             </div>

//             {/* Certifications Upload */}
//             <div className="flex flex-col gap-2">
//               <label className="text-[14px] font-bold text-gray-800">
//                 Attach Certifications/Trainings<span className="text-red-500">*</span>
//               </label>
//               <div className="flex items-center border border-gray-200 rounded-[4px] overflow-hidden">
//                 <input 
//                   type="file" 
//                   ref={certInputRef}
//                   onChange={(e) => handleFileChange(e, 'cert')}
//                   className="hidden" 
//                   accept=".pdf,.doc,.docx,.jpg"
//                 />
//                 <button 
//                   type="button" 
//                   onClick={() => certInputRef.current?.click()}
//                   className="bg-[#E3E8DE] px-6 h-12 text-[13px] font-semibold text-gray-800 border-r border-gray-200 hover:bg-[#d8ddd3] transition-colors whitespace-nowrap"
//                 >
//                   Choose file
//                 </button>
//                 <div className="flex-1 h-12 px-4 flex items-center bg-white text-gray-400 text-sm overflow-hidden text-ellipsis whitespace-nowrap">
//                   {certFileName || ""}
//                 </div>
//               </div>
//               <p className="text-[11px] text-gray-400 mt-1">
//                 Accepted file types: pdf, doc, docx, jpg, Max. file size: 5 MB.
//               </p>
//             </div>

//             {/* Comments Field */}
//             <div className="flex flex-col gap-2">
//               <label className="text-[14px] font-bold text-gray-800">
//                 Additional Comments<span className="text-red-500">*</span>
//               </label>
//               <textarea 
//                 placeholder="Type your comment here" 
//                 className="w-full h-40 p-4 border border-gray-200 rounded-[4px] text-sm focus:outline-none focus:border-teal-400 bg-white text-gray-900 placeholder-gray-400 resize-none"
//               ></textarea>
//             </div>

//             {/* Submit Button */}
//             <div className="pt-4">
//               <button 
//                 type="submit"
//                 className="bg-[#68cfa3] hover:bg-[#5abf94] text-white px-10 py-4 rounded-full text-sm font-bold flex items-center gap-2 transition-all shadow-sm active:scale-95"
//               >
//                 Submit <ArrowRight size={20} />
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default page;




'use client';
import React, { useState, useRef } from 'react';
import { ArrowRight, ChevronDown, CheckCircle, XCircle, AlertCircle, Upload } from 'lucide-react';

const ResumeSubmissionPage: React.FC = () => {
  // Form state
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    city: '',
    state: '',
    position: '',
    hasCpr: '',
    comments: ''
  });
  
  // File state
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [certFile, setCertFile] = useState<File | null>(null);
  const [resumeFileName, setResumeFileName] = useState<string>('');
  const [certFileName, setCertFileName] = useState<string>('');
  
  // UI state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  
  // File input refs
  const resumeInputRef = useRef<HTMLInputElement>(null);
  const certInputRef = useRef<HTMLInputElement>(null);

  // Handle text input changes
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear validation error for this field
    if (validationErrors[name]) {
      setValidationErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'resume' | 'cert') => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file size (5MB max)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      setValidationErrors(prev => ({
        ...prev,
        [type === 'resume' ? 'resume' : 'certifications']: 'File size must be less than 5MB'
      }));
      
      // Clear file input
      e.target.value = '';
      if (type === 'resume') {
        setResumeFile(null);
        setResumeFileName('');
      } else {
        setCertFile(null);
        setCertFileName('');
      }
      return;
    }

    // Validate file type
    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'image/jpeg',
      'image/jpg',
      'image/png'
    ];
    
    if (!allowedTypes.includes(file.type)) {
      setValidationErrors(prev => ({
        ...prev,
        [type === 'resume' ? 'resume' : 'certifications']: 'File must be PDF, DOC, DOCX, JPG, or PNG'
      }));
      
      // Clear file input
      e.target.value = '';
      if (type === 'resume') {
        setResumeFile(null);
        setResumeFileName('');
      } else {
        setCertFile(null);
        setCertFileName('');
      }
      return;
    }

    // Set file state
    if (type === 'resume') {
      setResumeFile(file);
      setResumeFileName(file.name);
      
      // Clear any previous errors
      if (validationErrors.resume) {
        setValidationErrors(prev => {
          const newErrors = { ...prev };
          delete newErrors.resume;
          return newErrors;
        });
      }
    } else {
      setCertFile(file);
      setCertFileName(file.name);
      
      // Clear any previous errors
      if (validationErrors.certifications) {
        setValidationErrors(prev => {
          const newErrors = { ...prev };
          delete newErrors.certifications;
          return newErrors;
        });
      }
    }
  };

  // Format file size for display
  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  // Validate the entire form
  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    // Required fields validation
    if (!formData.firstName.trim()) {
      errors.firstName = 'First name is required';
    } else if (formData.firstName.trim().length < 2) {
      errors.firstName = 'First name must be at least 2 characters';
    }

    if (!formData.lastName.trim()) {
      errors.lastName = 'Last name is required';
    } else if (formData.lastName.trim().length < 2) {
      errors.lastName = 'Last name must be at least 2 characters';
    }

    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }

    if (!formData.phone.trim()) {
      errors.phone = 'Phone number is required';
    } else if (!/^[\+]?[0-9\s\-\(\)]{10,20}$/.test(formData.phone.replace(/\s/g, ''))) {
      errors.phone = 'Please enter a valid phone number (10-20 digits)';
    }

    if (!formData.city.trim()) {
      errors.city = 'City is required';
    }

    if (!formData.state.trim()) {
      errors.state = 'State is required';
    }

    if (!formData.position.trim()) {
      errors.position = 'Position is required';
    }

    if (!resumeFile) {
      errors.resume = 'Resume file is required';
    }

    // Comments validation (optional)
    if (formData.comments && formData.comments.length > 2000) {
      errors.comments = 'Comments cannot exceed 2000 characters';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!validateForm()) {
      setSubmitMessage('Please fix the errors in the form');
      setSubmitSuccess(false);
      
      // Scroll to first error
      const firstErrorField = Object.keys(validationErrors)[0];
      if (firstErrorField) {
        const element = document.getElementById(firstErrorField);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
          element.focus();
        }
      }
      return;
    }

    // Start submission
    setIsSubmitting(true);
    setSubmitMessage('');
    setSubmitSuccess(false);

    try {
      // Create FormData for file upload
      const formDataToSend = new FormData();
      
      // Append all form fields
      Object.entries(formData).forEach(([key, value]) => {
        if (value) formDataToSend.append(key, value);
      });
      
      // Append files
      if (resumeFile) formDataToSend.append('resume', resumeFile);
      if (certFile) formDataToSend.append('certifications', certFile);

      // Submit to API
      const response = await fetch('/api/resume/submit', {
        method: 'POST',
        body: formDataToSend,
      });

      const result = await response.json();

      if (response.ok) {
        // Success
        setSubmitSuccess(true);
        setSubmitMessage(`${result.message} Your reference number: ${result.referenceNumber}`);
        
        // Reset form
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          city: '',
          state: '',
          position: '',
          hasCpr: '',
          comments: ''
        });
        setResumeFile(null);
        setCertFile(null);
        setResumeFileName('');
        setCertFileName('');
        setValidationErrors({});
        
        // Clear file inputs
        if (resumeInputRef.current) resumeInputRef.current.value = '';
        if (certInputRef.current) certInputRef.current.value = '';
        
        // Reset success message after 10 seconds
        setTimeout(() => {
          setSubmitSuccess(false);
          setSubmitMessage('');
        }, 10000);
        
      } else {
        // Handle errors
        setSubmitSuccess(false);
        
        if (response.status === 429) {
          // Rate limit exceeded
          setSubmitMessage('Too many submission attempts. Please try again tomorrow.');
        } else if (result.errors) {
          // Validation errors from server
          const fieldErrors: Record<string, string> = {};
          result.errors.forEach((error: string) => {
            if (error.includes('First name')) fieldErrors.firstName = error;
            else if (error.includes('Last name')) fieldErrors.lastName = error;
            else if (error.includes('Email')) fieldErrors.email = error;
            else if (error.includes('Phone')) fieldErrors.phone = error;
            else if (error.includes('City')) fieldErrors.city = error;
            else if (error.includes('State')) fieldErrors.state = error;
            else if (error.includes('Position')) fieldErrors.position = error;
            else if (error.includes('Resume')) fieldErrors.resume = error;
          });
          
          setValidationErrors(fieldErrors);
          setSubmitMessage('Please fix the errors highlighted below.');
        } else {
          // General error
          setSubmitMessage(result.message || 'Failed to submit your resume. Please try again.');
        }
      }
    } catch (error) {
      console.error('Submission error:', error);
      setSubmitSuccess(false);
      setSubmitMessage('An error occurred while submitting your resume. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Check if form is valid for submit button
  const isFormValid = () => {
    const hasRequiredFields = 
      formData.firstName.trim() &&
      formData.lastName.trim() &&
      formData.email.trim() &&
      formData.phone.trim() &&
      formData.city.trim() &&
      formData.state.trim() &&
      formData.position.trim() &&
      resumeFile;
    
    const hasNoErrors = Object.keys(validationErrors).length === 0;
    
    return hasRequiredFields && hasNoErrors;
  };

  return (
    <div className="min-h-screen bg-[#E3E8DE] py-24 md:py-32 px-6 font-sans">
      <div className="max-w-4xl mx-auto">
        {/* Page Title */}
        <h1 className="font-serif text-[42px] md:text-[54px] text-[#1B2C42] text-center mb-12">
          Submit Resume/CV
        </h1>

        {/* Form Container */}
        <div className="bg-white rounded-[4px] shadow-sm p-8 md:p-16 relative">
          {/* Success/Error Message */}
          {submitMessage && (
            <div className={`mb-8 p-4 rounded-lg flex items-start gap-3 ${
              submitSuccess 
                ? 'bg-green-50 text-green-800 border border-green-200' 
                : 'bg-red-50 text-red-800 border border-red-200'
            }`}>
              {submitSuccess ? (
                <CheckCircle className="w-5 h-5 mt-0.5 shrink-0" />
              ) : (
                <XCircle className="w-5 h-5 mt-0.5 shrink-0" />
              )}
              <div className="flex-1">
                <p className="font-medium">{submitMessage}</p>
                {submitSuccess && (
                  <p className="text-sm mt-1 opacity-90">
                    A confirmation email has been sent to {formData.email || 'your email address'}
                  </p>
                )}
              </div>
            </div>
          )}

          <form className="space-y-8" onSubmit={handleSubmit} noValidate>
            {/* Name Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-[14px] font-bold text-gray-800 flex items-center gap-2">
                  First Name<span className="text-red-500">*</span>
                  {validationErrors.firstName && (
                    <span className="text-red-500 text-xs flex items-center gap-1">
                      <AlertCircle size={12} />
                      {validationErrors.firstName}
                    </span>
                  )}
                </label>
                <input 
                  type="text" 
                  id="firstName"
                  name="firstName"
                  placeholder="John" 
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className={`w-full h-12 px-4 border rounded-[4px] text-sm focus:outline-none focus:border-teal-400 bg-white text-gray-900 placeholder-gray-400 ${
                    validationErrors.firstName ? 'border-red-300' : 'border-gray-200'
                  }`}
                  disabled={isSubmitting}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[14px] font-bold text-gray-800 flex items-center gap-2">
                  Last Name<span className="text-red-500">*</span>
                  {validationErrors.lastName && (
                    <span className="text-red-500 text-xs flex items-center gap-1">
                      <AlertCircle size={12} />
                      {validationErrors.lastName}
                    </span>
                  )}
                </label>
                <input 
                  type="text" 
                  id="lastName"
                  name="lastName"
                  placeholder="Doe" 
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className={`w-full h-12 px-4 border rounded-[4px] text-sm focus:outline-none focus:border-teal-400 bg-white text-gray-900 placeholder-gray-400 ${
                    validationErrors.lastName ? 'border-red-300' : 'border-gray-200'
                  }`}
                  disabled={isSubmitting}
                />
              </div>
            </div>

            {/* Email Field */}
            <div className="flex flex-col gap-2">
              <label className="text-[14px] font-bold text-gray-800 flex items-center gap-2">
                Email Address<span className="text-red-500">*</span>
                {validationErrors.email && (
                  <span className="text-red-500 text-xs flex items-center gap-1">
                    <AlertCircle size={12} />
                    {validationErrors.email}
                  </span>
                )}
              </label>
              <input 
                type="email" 
                id="email"
                name="email"
                placeholder="business-email@companyname.com" 
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full h-12 px-4 border rounded-[4px] text-sm focus:outline-none focus:border-teal-400 bg-white text-gray-900 placeholder-gray-400 ${
                  validationErrors.email ? 'border-red-300' : 'border-gray-200'
                }`}
                disabled={isSubmitting}
              />
            </div>

            {/* Phone Field */}
            <div className="flex flex-col gap-2">
              <label className="text-[14px] font-bold text-gray-800 flex items-center gap-2">
                Phone Number<span className="text-red-500">*</span>
                {validationErrors.phone && (
                  <span className="text-red-500 text-xs flex items-center gap-1">
                    <AlertCircle size={12} />
                    {validationErrors.phone}
                  </span>
                )}
              </label>
              <input 
                type="tel" 
                id="phone"
                name="phone"
                placeholder="+1 (908) 235-7534" 
                value={formData.phone}
                onChange={handleInputChange}
                className={`w-full h-12 px-4 border rounded-[4px] text-sm focus:outline-none focus:border-teal-400 bg-white text-gray-900 placeholder-gray-400 ${
                  validationErrors.phone ? 'border-red-300' : 'border-gray-200'
                }`}
                disabled={isSubmitting}
              />
            </div>

            {/* City & State Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-[14px] font-bold text-gray-800 flex items-center gap-2">
                  City<span className="text-red-500">*</span>
                  {validationErrors.city && (
                    <span className="text-red-500 text-xs flex items-center gap-1">
                      <AlertCircle size={12} />
                      {validationErrors.city}
                    </span>
                  )}
                </label>
                <input 
                  type="text" 
                  id="city"
                  name="city"
                  placeholder="New York" 
                  value={formData.city}
                  onChange={handleInputChange}
                  className={`w-full h-12 px-4 border rounded-[4px] text-sm focus:outline-none focus:border-teal-400 bg-white text-gray-900 placeholder-gray-400 ${
                    validationErrors.city ? 'border-red-300' : 'border-gray-200'
                  }`}
                  disabled={isSubmitting}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[14px] font-bold text-gray-800 flex items-center gap-2">
                  State<span className="text-red-500">*</span>
                  {validationErrors.state && (
                    <span className="text-red-500 text-xs flex items-center gap-1">
                      <AlertCircle size={12} />
                      {validationErrors.state}
                    </span>
                  )}
                </label>
                <input 
                  type="text" 
                  id="state"
                  name="state"
                  placeholder="NY" 
                  value={formData.state}
                  onChange={handleInputChange}
                  className={`w-full h-12 px-4 border rounded-[4px] text-sm focus:outline-none focus:border-teal-400 bg-white text-gray-900 placeholder-gray-400 ${
                    validationErrors.state ? 'border-red-300' : 'border-gray-200'
                  }`}
                  disabled={isSubmitting}
                />
              </div>
            </div>

            {/* Position Field */}
            <div className="flex flex-col gap-2">
              <label className="text-[14px] font-bold text-gray-800 flex items-center gap-2">
                Position Applying for<span className="text-red-500">*</span>
                {validationErrors.position && (
                  <span className="text-red-500 text-xs flex items-center gap-1">
                    <AlertCircle size={12} />
                    {validationErrors.position}
                  </span>
                )}
              </label>
              <input 
                type="text" 
                id="position"
                name="position"
                placeholder="Senior Developer, Project Manager, etc." 
                value={formData.position}
                onChange={handleInputChange}
                className={`w-full h-12 px-4 border rounded-[4px] text-sm focus:outline-none focus:border-teal-400 bg-white text-gray-900 placeholder-gray-400 ${
                  validationErrors.position ? 'border-red-300' : 'border-gray-200'
                }`}
                disabled={isSubmitting}
              />
            </div>

            {/* CPR Dropdown */}
            <div className="flex flex-col gap-2">
              <label className="text-[14px] font-bold text-gray-800">
                Do you have CPR & First Aid?
              </label>
              <div className="relative">
                <select 
                  name="hasCpr" 
                  value={formData.hasCpr}
                  onChange={handleInputChange}
                  className="w-full h-12 px-4 appearance-none border border-gray-200 rounded-[4px] text-sm focus:outline-none focus:border-teal-400 text-gray-900 bg-white cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={isSubmitting}
                >
                  <option value="">Select Yes or No</option>
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
              <label className="text-[14px] font-bold text-gray-800 flex items-center gap-2">
                Attach Resume/CV<span className="text-red-500">*</span>
                {validationErrors.resume && (
                  <span className="text-red-500 text-xs flex items-center gap-1">
                    <AlertCircle size={12} />
                    {validationErrors.resume}
                  </span>
                )}
              </label>
              <div className={`flex items-center border rounded-[4px] overflow-hidden ${
                validationErrors.resume ? 'border-red-300' : 'border-gray-200'
              }`}>
                <input 
                  type="file" 
                  ref={resumeInputRef}
                  onChange={(e) => handleFileChange(e, 'resume')}
                  className="hidden" 
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                  disabled={isSubmitting}
                />
                <button 
                  type="button" 
                  onClick={() => resumeInputRef.current?.click()}
                  className="bg-[#E3E8DE] px-6 h-12 text-[13px] font-semibold text-gray-800 border-r border-gray-200 hover:bg-[#d8ddd3] transition-colors whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={isSubmitting}
                >
                  <div className="flex items-center gap-2">
                    <Upload size={16} />
                    Choose file
                  </div>
                </button>
                <div className="flex-1 h-12 px-4 flex items-center bg-white text-gray-900 text-sm overflow-hidden">
                  {resumeFileName ? (
                    <div className="flex items-center justify-between w-full">
                      <span className="truncate">{resumeFileName}</span>
                      {resumeFile && (
                        <span className="text-xs text-gray-500 ml-2 shrink-0">
                          {formatFileSize(resumeFile.size)}
                        </span>
                      )}
                    </div>
                  ) : (
                    <span className="text-gray-400">No file chosen</span>
                  )}
                </div>
              </div>
              <p className="text-[11px] text-gray-400 mt-1">
                Accepted file types: pdf, doc, docx, jpg, png. Max. file size: 5 MB.
              </p>
            </div>

            {/* Certifications Upload */}
            <div className="flex flex-col gap-2">
              <label className="text-[14px] font-bold text-gray-800 flex items-center gap-2">
                Attach Certifications/Trainings
                {validationErrors.certifications && (
                  <span className="text-red-500 text-xs flex items-center gap-1">
                    <AlertCircle size={12} />
                    {validationErrors.certifications}
                  </span>
                )}
              </label>
              <div className={`flex items-center border rounded-[4px] overflow-hidden ${
                validationErrors.certifications ? 'border-red-300' : 'border-gray-200'
              }`}>
                <input 
                  type="file" 
                  ref={certInputRef}
                  onChange={(e) => handleFileChange(e, 'cert')}
                  className="hidden" 
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                  disabled={isSubmitting}
                />
                <button 
                  type="button" 
                  onClick={() => certInputRef.current?.click()}
                  className="bg-[#E3E8DE] px-6 h-12 text-[13px] font-semibold text-gray-800 border-r border-gray-200 hover:bg-[#d8ddd3] transition-colors whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={isSubmitting}
                >
                  <div className="flex items-center gap-2">
                    <Upload size={16} />
                    Choose file
                  </div>
                </button>
                <div className="flex-1 h-12 px-4 flex items-center bg-white text-gray-900 text-sm overflow-hidden">
                  {certFileName ? (
                    <div className="flex items-center justify-between w-full">
                      <span className="truncate">{certFileName}</span>
                      {certFile && (
                        <span className="text-xs text-gray-500 ml-2 shrink-0">
                          {formatFileSize(certFile.size)}
                        </span>
                      )}
                    </div>
                  ) : (
                    <span className="text-gray-400">Optional - No file chosen</span>
                  )}
                </div>
              </div>
              <p className="text-[11px] text-gray-400 mt-1">
                Accepted file types: pdf, doc, docx, jpg, png. Max. file size: 5 MB.
              </p>
            </div>

            {/* Comments Field */}
            <div className="flex flex-col gap-2">
              <label className="text-[14px] font-bold text-gray-800 flex items-center gap-2">
                Additional Comments
                {validationErrors.comments && (
                  <span className="text-red-500 text-xs flex items-center gap-1">
                    <AlertCircle size={12} />
                    {validationErrors.comments}
                  </span>
                )}
                <span className="ml-auto text-xs text-gray-500">
                  {formData.comments.length}/2000
                </span>
              </label>
              <textarea 
                name="comments"
                placeholder="Tell us about your experience, skills, or any additional information..."
                value={formData.comments}
                onChange={handleInputChange}
                className={`w-full h-40 p-4 border rounded-[4px] text-sm focus:outline-none focus:border-teal-400 bg-white text-gray-900 placeholder-gray-400 resize-none ${
                  validationErrors.comments ? 'border-red-300' : 'border-gray-200'
                }`}
                disabled={isSubmitting}
                maxLength={2000}
              ></textarea>
              <p className="text-[11px] text-gray-400">
                Optional. Maximum 2000 characters.
              </p>
            </div>

            {/* Submit Button */}
            <div className="pt-6">
              <button 
                type="submit"
                disabled={isSubmitting || !isFormValid()}
                className={`w-full md:w-auto ${
                  isSubmitting || !isFormValid() 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-[#68cfa3] hover:bg-[#5abf94] hover:scale-[1.02] active:scale-[0.98]'
                } text-white px-10 py-4 rounded-full text-sm font-bold flex items-center justify-center gap-2 transition-all shadow-sm disabled:opacity-50`}
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    Submitting...
                  </>
                ) : (
                  <>
                    Submit Application <ArrowRight size={20} />
                  </>
                )}
              </button>
              
              <div className="mt-4 text-xs text-gray-500 space-y-1">
                <p>By submitting this form, you agree to:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Receive a confirmation email</li>
                  <li>Have your resume stored in our secure database</li>
                  <li>Be contacted by our recruitment team if your profile matches our requirements</li>
                </ul>
                <p className="mt-2">
                  Need help? Email{' '}
                  <a href="mailto:careers@prudentresources.com" className="text-[#68cfa3] hover:underline">
                    careers@prudentresources.com
                  </a>
                </p>
              </div>
            </div>
          </form>

          {/* Loading overlay */}
          {isSubmitting && (
            <div className="absolute inset-0 bg-black/5 rounded-[4px] flex items-center justify-center">
              <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center gap-3">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#68cfa3]"></div>
                <p className="text-gray-700 font-medium">Submitting your application...</p>
                <p className="text-sm text-gray-500 text-center">
                  Please wait while we upload your files and save your information.
                  This may take a moment.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Info Section */}
        <div className="mt-12 bg-white rounded-[4px] shadow-sm p-8">
          <h3 className="text-xl font-bold text-[#1B2C42] mb-4">What happens after submission?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col gap-2">
              <div className="w-10 h-10 bg-[#E3E8DE] rounded-full flex items-center justify-center mb-2">
                <span className="font-bold text-[#1B2C42]">1</span>
              </div>
              <h4 className="font-semibold text-gray-800">Confirmation</h4>
              <p className="text-sm text-gray-600">
                You'll receive an email confirmation with your application reference number.
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <div className="w-10 h-10 bg-[#E3E8DE] rounded-full flex items-center justify-center mb-2">
                <span className="font-bold text-[#1B2C42]">2</span>
              </div>
              <h4 className="font-semibold text-gray-800">Review</h4>
              <p className="text-sm text-gray-600">
                Our recruitment team will review your application within 5-7 business days.
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <div className="w-10 h-10 bg-[#E3E8DE] rounded-full flex items-center justify-center mb-2">
                <span className="font-bold text-[#1B2C42]">3</span>
              </div>
              <h4 className="font-semibold text-gray-800">Contact</h4>
              <p className="text-sm text-gray-600">
                If your profile matches, we'll contact you for the next steps in the hiring process.
              </p>
            </div>
          </div>
          
          <div className="mt-8 pt-6 border-t border-gray-200">
            <h4 className="font-semibold text-gray-800 mb-2">Need immediate assistance?</h4>
            <p className="text-sm text-gray-600">
              Contact our HR department at{' '}
              <a href="mailto:careers@prudentresources.com" className="text-[#68cfa3] hover:underline">
                careers@prudentresources.com
              </a>{' '}
              or call{' '}
              <a href="tel:+14439855388" className="text-[#68cfa3] hover:underline">
                +1 443 985 5388
              </a>
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default ResumeSubmissionPage;