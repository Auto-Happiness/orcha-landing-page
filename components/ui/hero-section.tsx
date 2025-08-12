"use client";

import React from "react";
import { Button } from "./button";
import { ContainerTextFlip } from "./aceternity/container-text-flip";

export function HeroSection() {
  return (
    <div className="bg-[#1C1E26] pt-48 pb-32 px-4"> {/* Added pb-32 for bottom space */}
      <div className="container mx-auto max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Column - Text Content */}
          <div className="space-y-8">
            <h1 className="text-5xl md:text-6xl font-bold text-white">
              We Orcha-strate your{" "}
              <ContainerTextFlip 
                words={["Systems", "Solutions", "Infra", "AI"]}
                interval={3000}
                className="ml-2"
              />
            </h1>

            <p className="text-lg text-gray-400 max-w-xl">
              Orcha Solutions designs and develops tailored software solutions that power 
              and optimize IT systems. From enterprise applications to advanced integrations, 
              we help businesses streamline operations, enhance efficiency, and drive innovation.
            </p>
          </div>

          <div className="relative aspect-video bg-gradient-to-br from-gray-700 to-gray-800 rounded-lg overflow-hidden">
            <div className="absolute top-4 left-4 px-3 py-1 bg-gray-900 text-green-500 rounded-full text-sm flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              Live Deployment
            </div>
            <div className="absolute bottom-4 right-4 px-3 py-1 bg-gray-900 text-blue-400 rounded-full text-sm flex items-center gap-2">
              Auto Scaling
              <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-100 transition-colors">
                <svg
                  className="w-8 h-8 text-gray-900"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
