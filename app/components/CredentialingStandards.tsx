"use client";
import React from "react";
import { CheckCircle2 } from "lucide-react";

const CredentialingStandards: React.FC = () => {
  const standards = [
    "Comprehensive background checks",
    "License and certification verification",
    "Primary source verification",
    "Compliance monitoring",
    "Ongoing credential expiration tracking",
  ];

  return (
    <section className="bg-[#1E3449]">
      <div className="mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-7 min-h-[600px] rounded-xl overflow-hidden">
          {/* Left Column: Image */}
          <div className="lg:col-span-3 relative h-[400px] lg:h-auto m-2">
            <img
              src="/lab.png"
              alt="Smiling healthcare professional with glasses"
              className="rounded-lg absolute inset-0 w-full h-full object-cover object-top"
            />
          </div>

          {/* Right Column: Content */}
          <div className="lg:col-span-4 text-white pt-[80px] px-8 flex flex-col justify-between">
            <div>
              <h2 className="font-serif text-4xl md:text-5xl  mb-6 leading-tight">
                Our Credentialing Standards
              </h2>

              <p className=" text-lg leading-relaxed mb-20">
                You can trust our Credentialing, we ensure every candidate meets
                industry-leading compliance, safety, and verification
                requirements.
              </p>
            </div>

            <div className="flex flex-col gap-2 mb-12">
              {standards.map((item, index) => (
                <div key={index} className="flex items-center gap-4">
                  <CheckCircle2
                    className="w-6 h-6  shrink-0"
                    strokeWidth={1.5}
                  />
                  <span className=" font-semibold text-lg">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CredentialingStandards;
