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



          <div className="relative aspect-video bg-gradient-to-br from-gray-700 to-gray-800 rounded-lg overflow-hidden h-full 
                          shadow-[0_-5px_30px_rgba(0,0,0,0.5)] transition-transform duration-300 hover:scale-105">
            <video
              src="/assets/orcha 2.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            />
          </div>


        </div>
      </div>
    </div>
  );
}
