'use client';
import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';

interface SpecializedFieldsProps {
  onNavigate?: (page: string) => void;
}

const SpecializedFields: React.FC<SpecializedFieldsProps> = ({ onNavigate }) => {
  const [clickedCard, setClickedCard] = useState<string | null>(null);
  
  const fields = [
    {
      title: "Behavioral Healthcare/Nursing",
      color: "bg-[#e5a5e3]", // Pastel purple/pink
      image: "/image5.png",
      targetPage: "behavioral-health"
    },
    {
      title: "Residential Group Homes",
      color: "bg-[#bdd8fa]", // Pastel blue
      image: "/image5.png",
      targetPage: "residential"
    },
    {
      title: "Addictions & Substance Abuse",
      color: "bg-[#fcbca0]", // Pastel peach/orange
      image: "/image5.png",
      targetPage: "addiction"
    }
  ];

  const handleCardClick = (target: string) => {
    // Remove alert and enable routing
    setClickedCard(target);
    
    // Show visual feedback
    setTimeout(() => {
      setClickedCard(null);
    }, 300);
    
    // Navigate to the target page
    if (onNavigate) {
      onNavigate(target);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row gap-10 mb-20 lg:items-start">
          
          {/* Label Column */}
          <div className="lg:w-1/4 pt-3">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-[#00e055]"></div>
              <span className="text-xs font-bold tracking-widest text-gray-900 uppercase">The Fields We Serve</span>
            </div>
          </div>

          {/* Content Column */}
          <div className="lg:w-3/4">
            <h2 className="text-4xl md:text-6xl font-serif text-gray-900 mb-8 leading-[1.1]">
              Transforming Healthcare Staffing <br className="hidden md:block" />
              in the following Specialized Fields
            </h2>
            
            <p className="text-gray-600 text-lg leading-relaxed max-w-4xl">
              Each healthcare field needs more than experience—it needs specialized attention
              and a partner who truly understands its nuances. We're committed to providing
              personalized solutions, creating valuable opportunities, and delivering exceptional
              results for our clients and the professionals we place.
            </p>
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          {fields.map((field, index) => (
            <div 
              key={index} 
              onClick={() => handleCardClick(field.targetPage)}
              className={`group cursor-pointer rounded-xl overflow-hidden flex flex-col h-full transition-all duration-300 ${
                clickedCard === field.targetPage 
                  ? 'ring-4 ring-teal-400 scale-[0.98]' 
                  : 'hover:scale-[1.02]'
              }`}
            >
              {/* Image Container */}
              <div className="relative h-[450px] overflow-hidden bg-gray-200">
                 <img 
                   src={field.image} 
                   alt={field.title}
                   className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                 />
                 {/* Loading/Clicked Overlay */}
                 {clickedCard === field.targetPage && (
                   <div className="absolute inset-0 bg-teal-400/20 flex items-center justify-center">
                     <div className="bg-white/90 rounded-lg p-3 text-center">
                       <div className="text-gray-900 font-bold">Loading...</div>
                     </div>
                   </div>
                 )}
              </div>
              
              {/* Footer */}
              <div className={`${field.color} p-6 h-28 flex items-center justify-between transition-all duration-300 ${
                clickedCard === field.targetPage ? 'bg-gray-300' : ''
              }`}>
                <h3 className="font-serif text-2xl text-gray-900 max-w-[80%] leading-tight">
                  {field.title}
                </h3>
                <ArrowRight className={`text-gray-900 w-6 h-6 shrink-0 transition-all duration-300 ${
                  clickedCard === field.targetPage 
                    ? 'translate-x-2 text-teal-600' 
                    : 'group-hover:translate-x-2'
                }`} />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default SpecializedFields;