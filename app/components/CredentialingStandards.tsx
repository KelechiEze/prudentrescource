"use client";
import React from "react";

const CredentialingStandards: React.FC = () => {
  return (
    <section className="bg-[#1E3449] py-16 md:py-24">
      <div className="mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-7 gap-8 lg:gap-12 rounded-xl overflow-hidden">
          {/* Left Column: Image */}
          <div className="lg:col-span-3 relative h-[400px] lg:h-[500px] rounded-xl overflow-hidden">
            <img
              src="/lab.png"
              alt="Healthcare professional in laboratory setting"
              className="absolute inset-0 w-full h-full object-cover object-center rounded-xl"
            />
          </div>

          {/* Right Column: Content */}
          <div className="lg:col-span-4 text-white flex items-center justify-center px-4 md:px-8">
            <div className="max-w-2xl">
              <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-6 leading-tight">
                Our Credentialing Standards
              </h2>

              <p className="text-lg md:text-xl leading-relaxed text-gray-200">
                You can trust our Credentialing process. We ensure every candidate meets
                industry-leading compliance, safety, and verification requirements,
                maintaining the highest standards of healthcare professionalism.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CredentialingStandards;