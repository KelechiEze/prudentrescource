'use client';
import React, { useState, useEffect } from 'react';
import { MapPin, Mail, Headphones, ArrowRight, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

interface ValidationErrors {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
}

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});
  const [characterCount, setCharacterCount] = useState(0);

  // Social media links
  const socialMediaLinks = {
    facebook: 'https://www.facebook.com/profile.php?id=61573826751257&mibextid=ZbWKwL',
    twitter: 'https://x.com/Prudentresource',
    tiktok: 'https://tiktok.com/@prudentresources',
    instagram: 'https://www.instagram.com/invites/contact/?i=1n1cwi2k4i82g&utm_content=xiztig6'
  };

  // Update character count when message changes
  useEffect(() => {
    setCharacterCount(formData.message.length);
  }, [formData.message]);

  const validateField = (name: keyof FormData, value: string): string => {
    switch (name) {
      case 'name':
        if (!value.trim()) return 'Name is required';
        if (value.trim().length < 2) return 'Name must be at least 2 characters';
        if (value.trim().length > 100) return 'Name cannot exceed 100 characters';
        return '';
      
      case 'email':
        if (!value.trim()) return 'Email is required';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Please enter a valid email address';
        if (value.length > 100) return 'Email cannot exceed 100 characters';
        return '';
      
      case 'phone':
        if (value.trim() && !/^[\+]?[0-9\s\-\(\)]{10,20}$/.test(value.replace(/\s/g, ''))) {
          return 'Please enter a valid phone number (10-20 digits)';
        }
        return '';
      
      case 'message':
        if (!value.trim()) return 'Message is required';
        if (value.trim().length < 10) return 'Message must be at least 10 characters';
        if (value.trim().length > 5000) return 'Message cannot exceed 5000 characters';
        return '';
      
      default:
        return '';
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Validate on change
    const error = validateField(name as keyof FormData, value);
    setValidationErrors(prev => ({
      ...prev,
      [name]: error
    }));
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const error = validateField(name as keyof FormData, value);
    setValidationErrors(prev => ({
      ...prev,
      [name]: error
    }));
  };

  const validateForm = (): boolean => {
    const errors: ValidationErrors = {};
    
    Object.keys(formData).forEach((key) => {
      const fieldName = key as keyof FormData;
      const error = validateField(fieldName, formData[fieldName]);
      if (error) {
        errors[fieldName] = error;
      }
    });

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      setSubmitMessage('Please fix the errors in the form');
      setSubmitSuccess(false);
      return;
    }

    setIsSubmitting(true);
    setSubmitMessage('');
    setSubmitSuccess(false);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitSuccess(true);
        setSubmitMessage(result.message);
        
        // Clear form on success
        setFormData({
          name: '',
          email: '',
          phone: '',
          message: ''
        });
        setValidationErrors({});
        
        // Reset success message after 8 seconds
        setTimeout(() => {
          setSubmitSuccess(false);
          setSubmitMessage('');
        }, 8000);
      } else {
        setSubmitSuccess(false);
        setSubmitMessage(result.message || 'Failed to send message. Please try again.');
        
        // Handle rate limiting
        if (response.status === 429) {
          setSubmitMessage('Too many attempts. Please try again in an hour.');
        }
      }
    } catch (error) {
      console.error('Submission error:', error);
      setSubmitSuccess(false);
      setSubmitMessage('An error occurred while sending your message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid = () => {
    return (
      formData.name.trim() &&
      formData.email.trim() &&
      formData.message.trim() &&
      Object.values(validationErrors).every(error => !error)
    );
  };

  return (
    <div className="min-h-screen bg-white pt-32 md:pt-40 font-sans overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 mb-20 md:mb-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          
          {/* Left Column: Contact Info */}
          <div className="space-y-8 md:space-y-12">
            <div className="space-y-4 md:space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-[#8b5cf6] animate-pulse"></div>
                <span className="text-[10px] md:text-[11px] font-bold tracking-[0.25em] text-gray-900 uppercase">CONTACT US</span>
              </div>
              <h1 className="font-serif text-4xl md:text-6xl lg:text-[72px] text-[#1B2C42] leading-tight">
                Let's get in touch.
              </h1>
              <p className="text-gray-600 text-base md:text-xl leading-relaxed max-w-xl font-light">
                Have questions or want to learn more about how we can support you? 
                Give us a call or send us a message. One of our representatives will be in 
                touch soon. We look forward to connecting and helping you find solutions 
                tailored to your staffing goals.
              </p>
            </div>

            <div className="space-y-8 md:space-y-10">
              {/* Business Address */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 md:gap-6 group hover:translate-x-2 transition-transform duration-300">
                <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-[#1B2C42] flex items-center justify-center shrink-0 group-hover:bg-[#8b5cf6] transition-colors duration-300">
                  <MapPin className="text-white w-5 h-5 md:w-7 md:h-7" />
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] md:text-[12px] font-bold tracking-widest text-gray-900 uppercase">BUSINESS ADDRESS</span>
                  <p className="text-gray-600 text-sm md:text-lg">6340 Security Blvd. Suite 100 #1467, Baltimore, MD 21207</p>
                </div>
              </div>

              {/* Email Address */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 md:gap-6 group hover:translate-x-2 transition-transform duration-300">
                <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-[#1B2C42] flex items-center justify-center shrink-0 group-hover:bg-[#8b5cf6] transition-colors duration-300">
                  <Mail className="text-white w-5 h-5 md:w-7 md:h-7" />
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] md:text-[12px] font-bold tracking-widest text-gray-900 uppercase">EMAIL ADDRESS</span>
                  <a 
                    href="mailto:info@prudentresources.com" 
                    className="text-gray-600 text-sm md:text-lg break-all hover:text-[#8b5cf6] transition-colors duration-300"
                  >
                    info@prudentresources.com
                  </a>
                </div>
              </div>

              {/* Contact Number */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 md:gap-6 group hover:translate-x-2 transition-transform duration-300">
                <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-[#1B2C42] flex items-center justify-center shrink-0 group-hover:bg-[#8b5cf6] transition-colors duration-300">
                  <Headphones className="text-white w-5 h-5 md:w-7 md:h-7" />
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] md:text-[12px] font-bold tracking-widest text-gray-900 uppercase">CONTACT US</span>
                  <a 
                    href="tel:+14439855388" 
                    className="text-gray-600 text-sm md:text-lg hover:text-[#8b5cf6] transition-colors duration-300"
                  >
                    Call for an Appointment: +1 443 985 5388
                  </a>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="pt-6 flex flex-col gap-4 text-gray-900 font-medium">
              <span className="text-base md:text-lg">Follow Us:</span>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
                <a 
                  href={socialMediaLinks.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm md:text-lg border-b border-gray-900 pb-0.5 hover:border-[#8b5cf6] hover:text-[#8b5cf6] transition-all duration-300 whitespace-nowrap"
                >
                  Facebook
                </a>
                <a 
                  href={socialMediaLinks.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm md:text-lg border-b border-gray-900 pb-0.5 hover:border-[#8b5cf6] hover:text-[#8b5cf6] transition-all duration-300 whitespace-nowrap"
                >
                  Twitter / X
                </a>
                <a 
                  href={socialMediaLinks.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm md:text-lg border-b border-gray-900 pb-0.5 hover:border-[#8b5cf6] hover:text-[#8b5cf6] transition-all duration-300 whitespace-nowrap"
                >
                  TikTok
                </a>
                <a 
                  href={socialMediaLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm md:text-lg border-b border-gray-900 pb-0.5 hover:border-[#8b5cf6] hover:text-[#8b5cf6] transition-all duration-300 whitespace-nowrap"
                >
                  Instagram
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Form */}
          <div className="bg-[#E7EAE0] rounded-xl p-6 md:p-14 relative">
            {submitMessage && (
              <div className={`mb-6 p-4 rounded-lg flex items-start gap-3 animate-fadeIn ${submitSuccess ? 'bg-green-50 text-green-800 border border-green-200' : 'bg-red-50 text-red-800 border border-red-200'}`}>
                {submitSuccess ? (
                  <CheckCircle className="w-5 h-5 mt-0.5 shrink-0" />
                ) : (
                  <XCircle className="w-5 h-5 mt-0.5 shrink-0" />
                )}
                <span>{submitMessage}</span>
              </div>
            )}
            
            <form className="space-y-6 md:space-y-8" onSubmit={handleSubmit} noValidate>
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm md:text-[16px] font-semibold text-gray-900 flex items-center gap-2">
                  Full Name *
                  {validationErrors.name && (
                    <span className="text-red-500 text-xs flex items-center gap-1">
                      <AlertCircle size={12} />
                      {validationErrors.name}
                    </span>
                  )}
                </label>
                <input 
                  type="text" 
                  id="name"
                  name="name"
                  placeholder="John Doe" 
                  value={formData.name}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  className={`w-full h-12 md:h-14 px-4 md:px-6 border rounded-lg text-base md:text-lg focus:outline-none focus:ring-2 bg-white placeholder-gray-400 text-gray-900 transition-all ${validationErrors.name ? 'border-red-300 focus:ring-red-400' : 'border-gray-200/50 focus:ring-teal-400'}`}
                  required
                  disabled={isSubmitting}
                  aria-invalid={!!validationErrors.name}
                  aria-describedby={validationErrors.name ? "name-error" : undefined}
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-sm md:text-[16px] font-semibold text-gray-900 flex items-center gap-2">
                  Your Email *
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
                  placeholder="john.doe@example.com" 
                  value={formData.email}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  className={`w-full h-12 md:h-14 px-4 md:px-6 border rounded-lg text-base md:text-lg focus:outline-none focus:ring-2 bg-white placeholder-gray-400 text-gray-900 transition-all ${validationErrors.email ? 'border-red-300 focus:ring-red-400' : 'border-gray-200/50 focus:ring-teal-400'}`}
                  required
                  disabled={isSubmitting}
                  aria-invalid={!!validationErrors.email}
                  aria-describedby={validationErrors.email ? "email-error" : undefined}
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="phone" className="text-sm md:text-[16px] font-semibold text-gray-900 flex items-center gap-2">
                  Your Number
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
                  placeholder="+1 (000) 000-0000" 
                  value={formData.phone}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  className={`w-full h-12 md:h-14 px-4 md:px-6 border rounded-lg text-base md:text-lg focus:outline-none focus:ring-2 bg-white placeholder-gray-400 text-gray-900 transition-all ${validationErrors.phone ? 'border-red-300 focus:ring-red-400' : 'border-gray-200/50 focus:ring-teal-400'}`}
                  disabled={isSubmitting}
                  aria-invalid={!!validationErrors.phone}
                  aria-describedby={validationErrors.phone ? "phone-error" : undefined}
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label htmlFor="message" className="text-sm md:text-[16px] font-semibold text-gray-900 flex items-center gap-2">
                    Enter your message *
                    {validationErrors.message && (
                      <span className="text-red-500 text-xs flex items-center gap-1">
                        <AlertCircle size={12} />
                        {validationErrors.message}
                      </span>
                    )}
                  </label>
                  <span className={`text-xs ${characterCount > 5000 ? 'text-red-500' : 'text-gray-500'}`}>
                    {characterCount}/5000
                  </span>
                </div>
                <textarea 
                  id="message"
                  name="message"
                  placeholder="How can we help you?" 
                  value={formData.message}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  rows={6}
                  className={`w-full p-4 md:p-6 border rounded-lg text-base md:text-lg focus:outline-none focus:ring-2 bg-white placeholder-gray-400 text-gray-900 resize-none transition-all ${validationErrors.message ? 'border-red-300 focus:ring-red-400' : 'border-gray-200/50 focus:ring-teal-400'}`}
                  required
                  disabled={isSubmitting}
                  aria-invalid={!!validationErrors.message}
                  aria-describedby={validationErrors.message ? "message-error" : undefined}
                  maxLength={5000}
                ></textarea>
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Minimum 10 characters</span>
                  <span>{characterCount >= 10 ? '✓ Enough characters' : 'Need more characters'}</span>
                </div>
              </div>

              <div className="pt-4">
                <button 
                  type="submit" 
                  disabled={isSubmitting || !isFormValid()}
                  className={`w-full sm:w-auto ${isSubmitting || !isFormValid() ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#68cfa3] hover:bg-[#5abf94] hover:scale-[1.02] active:scale-[0.98]'} text-gray-900 px-10 py-3.5 md:py-4.5 rounded-full text-base md:text-lg font-bold flex items-center justify-center gap-2 transition-all duration-300 shadow-xl disabled:opacity-50`}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </>
                  ) : (
                    <>
                      Submit <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
                
                <p className="text-xs text-gray-500 mt-3 text-center">
                  By submitting this form, you agree to receive a confirmation email and response from our team.
                </p>
              </div>
            </form>

            {/* Loading overlay */}
            {isSubmitting && (
              <div className="absolute inset-0 bg-black/5 rounded-xl flex items-center justify-center">
                <div className="bg-white p-4 rounded-lg shadow-lg">
                  <div className="flex items-center gap-3">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-[#68cfa3]"></div>
                    <span className="text-gray-700">Processing your message...</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Map Section - Full Width */}
      <section className="w-full h-[400px] md:h-[600px] bg-gray-100 border-t border-gray-200 relative">
        <iframe 
          title="Prudent Resources Business Location"
          width="100%" 
          height="100%" 
          frameBorder="0" 
          scrolling="no" 
          marginHeight={0} 
          marginWidth={0} 
          src="https://maps.google.com/maps?q=6340%20Security%20Blvd%20Suite%20100%20%231467%2C%20Baltimore%2C%20MD%2021207&t=&z=16&ie=UTF8&iwloc=&output=embed"
          className="grayscale-[0.2] contrast-[1.1]"
          style={{ filter: 'contrast(1.1) grayscale(0.2)' }}
          loading="lazy"
          allowFullScreen
        ></iframe>
        <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm p-3 rounded-lg shadow-lg">
          <p className="text-sm font-semibold text-gray-800">📍 Our Location</p>
          <p className="text-xs text-gray-600">6340 Security Blvd. Suite 100 #1467</p>
          <p className="text-xs text-gray-600">Baltimore, MD 21207</p>
        </div>
      </section>

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

export default ContactPage;