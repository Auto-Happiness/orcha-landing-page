"use client";

import React from "react";
import { Button } from "./button";
import { ContainerTextFlip } from "./aceternity/container-text-flip";

export function HeroSection() {
  return (
    <div className="min-h-screen bg-[#1C1E26] pt-48 px-4"> {/* Increased top padding from pt-24 to pt-48 */}
      <div className="container mx-auto max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text Content */}
          <div className="space-y-8">
            <h1 className="text-5xl md:text-6xl font-bold text-white">
              Orcha-strate your{" "}
              <span className="inline-block bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text animate-gradient">AI</span>{" "}
              <ContainerTextFlip 
                words={["Agents", "Assistant", "Expert", "Specialist"]}
                interval={3000}
                className="ml-2"
              />
            </h1>
            
            <p className="text-lg text-gray-400 max-w-xl">
              Connect and orchestrate your tasks visually with our cutting-edge tools and seamless deployment process
            </p>

            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                Get Started
              </Button>
              <Button size="lg" variant="outline" className="text-white">
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Watch Demo
              </Button>
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-400">
              <svg
                className="w-5 h-5 text-green-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              No credit card required
              <span className="mx-2">•</span>
              <svg
                className="w-5 h-5 text-green-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              14-day free trial
            </div>

            {/* Stats Section */}
            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-gray-800">
              <div>
                <div className="text-3xl font-bold text-white">10K+</div>
                <div className="text-sm text-gray-400">Active Agents</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white">99.9%</div>
                <div className="text-sm text-gray-400">Uptime</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white">24/7</div>
                <div className="text-sm text-gray-400">Support</div>
              </div>
            </div>
          </div>

          {/* Right Column - Video Preview */}
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