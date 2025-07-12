"use client";
import React from "react";
import { SparklesCore } from "./sparkles";
import { MovingBorder } from "./moving-border";

export const HeroSection = () => {
  return (
    <div className="h-[100vh] relative w-full bg-black flex flex-col items-center justify-center overflow-hidden rounded-md">
      <div className="w-full absolute inset-0 h-screen">
        <SparklesCore
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={100}
          className="w-full h-full"
          particleColor="#FFFFFF"
        />
      </div>

      <div className="relative z-20">
        <MovingBorder duration={4000} rx="30%">
          <div className="px-8 py-4">
            <h1 className="text-4xl md:text-7xl font-bold text-center text-white relative z-20">
              Welcome to Orcha
            </h1>
            <p className="text-base md:text-lg text-white/80 text-center mt-4">
              Your Next-Generation Development Platform
            </p>
          </div>
        </MovingBorder>
      </div>
    </div>
  );
}; 