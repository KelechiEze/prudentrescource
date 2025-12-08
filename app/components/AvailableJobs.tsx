import React from 'react';
import { ArrowRight } from 'lucide-react';

interface Job {
  id: number;
  role: string;
  schedule: string;
  duration: string;
  title: string;
  location: string;
  datePosted: string;
  salary: string;
}

const JOBS: Job[] = [
  {
    id: 1,
    role: "Radiology Technologist",
    schedule: "Days, 4x10",
    duration: "26 weeks",
    title: "Cardiovascular Interventional Radiology",
    location: "Springfield IL",
    datePosted: "11/30/2025",
    salary: "$4,120/wk"
  },
  {
    id: 2,
    role: "Radiology Technologist",
    schedule: "Days, 4x10",
    duration: "26 weeks",
    title: "Cardiovascular Interventional Radiology",
    location: "Springfield IL",
    datePosted: "11/30/2025",
    salary: "$4,120/wk"
  },
  {
    id: 3,
    role: "Radiology Technologist",
    schedule: "Days, 4x10",
    duration: "26 weeks",
    title: "Cardiovascular Interventional Radiology",
    location: "Springfield IL",
    datePosted: "11/30/2025",
    salary: "$4,120/wk"
  }
];

const AvailableJobs: React.FC = () => {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
          
          {/* Left Column: Description & Action */}
          <div className="lg:col-span-4">
            <h2 className="font-serif text-4xl md:text-5xl text-[#1B2C42] mb-6 leading-tight">
              Available job listing
            </h2>
            
            <p className="text-gray-600 text-lg leading-relaxed mb-10">
              Just beginning your career or already have many years of experience? 
              We help you further your career. Look through our top pick for you.
            </p>
            
            <button className="bg-[#1B2C42] hover:bg-[#2a4466] text-white px-8 py-4 rounded-full text-sm font-semibold flex items-center gap-2 transition-all shadow-lg w-fit">
              Browse job opportunities <ArrowRight size={18} />
            </button>
          </div>

          {/* Right Column: Job List */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            {JOBS.map((job) => (
              <div key={job.id} className="bg-[#E9ECF5] rounded-xl p-8 md:p-10 transition-colors hover:bg-[#E3E8DE]">
                <div className="flex flex-col gap-6">
                  
                  {/* Header Info */}
                  <div className="text-gray-600 text-sm font-medium">
                    {job.role} • {job.schedule} • {job.duration}
                  </div>
                  
                  {/* Job Title */}
                  <h3 className="font-serif text-3xl text-[#1B2C42] leading-tight max-w-lg">
                    {job.title}
                  </h3>
                  
                  {/* Location & Date */}
                  <div className="flex flex-col gap-1 text-gray-700">
                    <span className="font-medium">{job.location}</span>
                    <span className="text-sm opacity-80">Date Posted: {job.datePosted}</span>
                  </div>
                  
                  {/* Salary & Apply */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mt-2">
                    <div className="text-[#1B2C42] font-bold text-xl">
                      Starting at {job.salary}
                    </div>
                    
                    <button className="bg-[#68cfa3] hover:bg-[#5abf94] text-[#1B2C42] px-8 py-3 rounded-full text-sm font-semibold transition-all shadow-sm w-fit">
                      Apply now
                    </button>
                  </div>
                  
                </div>
              </div>
            ))}

            {/* See All Button */}
            <div className="flex justify-end mt-4">
              <button className="bg-[#1B2C42] hover:bg-[#2a4466] text-white px-8 py-3 rounded-full text-sm font-semibold flex items-center gap-2 transition-all shadow-lg">
                See all <ArrowRight size={18} />
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AvailableJobs;