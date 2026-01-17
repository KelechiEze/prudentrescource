'use client';
import React, { useEffect, useState } from 'react';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { useRouter, useParams } from 'next/navigation';
import SubmitCV from '../../components/SubmitCV';

interface JobResult {
  id: number;
  category: string;
  schedule: string;
  duration: string;
  title: string;
  location: string;
  datePosted: string;
  startingPrice: string;
  payRate: string;
  buttonLabel: string;
  type: string;
  fullDescription: string;
  schedulesAvailable: string;
  contractLength: string;
  duties: string[];
  requirements: string[];
}

const JobDetailsPage: React.FC = () => {
  const router = useRouter();
  const params = useParams();
  const [job, setJob] = useState<JobResult | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get job data from localStorage
    const storedJob = localStorage.getItem('selectedJobDetails');
    
    if (storedJob) {
      try {
        const parsedJob = JSON.parse(storedJob);
        setJob(parsedJob);
      } catch (error) {
        console.error('Error parsing job data:', error);
      }
    }
    
    setLoading(false);
  }, [params.id]);

  const handleBack = () => {
    router.back(); // Go back to previous page
  };

  const handleApplyNow = () => {
    // Store the job information for the resume submission page
    if (job) {
      localStorage.setItem('jobApplyingFor', JSON.stringify({
        id: job.id,
        title: job.title,
        location: job.location,
        category: job.category,
        type: job.type
      }));
    }
    
    // Navigate to the submit resume page
    router.push('/submitresume');
  };

  if (loading) {
    return (
      <div className="bg-white min-h-screen pt-32 md:pt-40 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-400 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading job details...</p>
        </div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="bg-white min-h-screen pt-32 md:pt-40">
        <div className="max-w-7xl mx-auto px-4 md:px-6 pb-20 md:pb-32">
          <button 
            onClick={handleBack}
            className="flex items-center gap-2 px-4 py-2 bg-[#E3E8DE] hover:bg-[#D8DDD3] text-[#1B2C42] rounded-full text-[12px] md:text-[13px] font-bold transition-all mb-8 md:mb-10 w-fit active:scale-95 cursor-pointer"
          >
            <ArrowLeft size={16} /> Back
          </button>
          
          <div className="text-center py-16">
            <h2 className="font-serif text-2xl md:text-3xl text-[#1B2C42] mb-4">Job Not Found</h2>
            <p className="text-gray-500 mb-8">The job details could not be loaded.</p>
            <button 
              onClick={handleBack}
              className="bg-[#1B2C42] text-white px-8 py-3 rounded-full font-bold hover:bg-[#152336] transition-all active:scale-95 cursor-pointer"
            >
              Return to Job Listings
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen pt-32 md:pt-40">
      <div className="max-w-7xl mx-auto px-4 md:px-6 pb-20 md:pb-32">
        <button 
          onClick={handleBack}
          className="flex items-center gap-2 px-4 py-2 bg-[#E3E8DE] hover:bg-[#D8DDD3] text-[#1B2C42] rounded-full text-[12px] md:text-[13px] font-bold transition-all mb-8 md:mb-10 w-fit active:scale-95 cursor-pointer"
        >
          <ArrowLeft size={16} /> Back
        </button>

        <h1 className="font-serif text-3xl md:text-5xl lg:text-[56px] text-[#1B2C42] mb-3 leading-tight tracking-tight">
          {job.title}
        </h1>

        <div className="mb-8 md:mb-10">
          <p className="text-[#1B2C42] text-lg md:text-xl font-bold">
            Pay Rate: <span className="text-[#1B2C42] font-normal">{job.payRate}</span>
          </p>
        </div>

        <div className="flex flex-wrap gap-2 md:gap-3 mb-10 md:mb-12">
          {[job.category, job.datePosted, job.location, job.type].map((tag, i) => (
            <div key={i} className="px-4 md:px-6 py-2 md:py-3 bg-[#F4F6F8] rounded-full text-[#1B2C42] text-[12px] md:text-sm font-bold shadow-sm whitespace-nowrap cursor-default">
              {tag}
            </div>
          ))}
        </div>

        <div className="max-w-7xl space-y-10 md:space-y-12 text-[#1B2C42]/90 leading-relaxed text-base md:text-[18px]">
          <p className="font-normal">{job.fullDescription}</p>

          <div className="space-y-4">
            <h2 className="font-bold text-sm md:text-[16px] uppercase tracking-wider text-[#1B2C42]">SCHEDULES AVAILABLE:</h2>
            <p className="font-normal">{job.schedulesAvailable}</p>
          </div>

          <div className="space-y-4">
            <h2 className="font-bold text-sm md:text-[16px] uppercase tracking-wider text-[#1B2C42]">CONTRACT LENGTH</h2>
            <p className="font-normal">{job.contractLength}</p>
          </div>

          {job.duties && (
            <div className="space-y-4 md:space-y-6">
              <h2 className="font-bold text-sm md:text-[16px] uppercase tracking-wider text-[#1B2C42]">DUTIES</h2>
              <ul className="list-disc pl-5 space-y-2 md:space-y-3 font-normal">
                {job.duties.map((duty, idx) => (
                  <li key={idx} className="pl-2">{duty}</li>
                ))}
              </ul>
            </div>
          )}

          {job.requirements && (
            <div className="space-y-4 md:space-y-6">
              <h2 className="font-bold text-sm md:text-[16px] uppercase tracking-wider text-[#1B2C42]">REQUIRED SKILLS & EXPERIENCE</h2>
              <ul className="list-disc pl-5 space-y-2 md:space-y-3 font-normal">
                {job.requirements.map((req, idx) => (
                  <li key={idx} className="pl-2">{req}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="pt-8 md:pt-12">
            <button 
              onClick={handleApplyNow}
              className="w-full sm:w-auto bg-[#68cfa3] hover:bg-[#5abf94] text-white px-12 py-4 rounded-full text-[14px] md:text-[15px] font-bold flex items-center justify-center gap-2 transition-all shadow-xl shadow-teal-500/10 active:scale-95 cursor-pointer"
            >
              Apply Now <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </div>
      <SubmitCV />
    </div>
  );
};

export default JobDetailsPage;