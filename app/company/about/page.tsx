"use client";

import React from "react";
import { Timeline } from "@/components/ui/timeline";

const timelineData = [
  {
    title: "2024",
    content: (
      <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6 space-y-4">
        <h3 className="text-2xl font-bold text-white">Launched Orcha Platform</h3>
        <p className="text-zinc-400">
          Built and launched Orcha, a revolutionary AI orchestration platform that enables seamless integration and management of AI agents.
        </p>
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="bg-zinc-800 p-4 rounded-lg">
            <h4 className="text-white font-medium">Platform Launch</h4>
            <p className="text-sm text-zinc-400">Successfully deployed our core platform</p>
          </div>
          <div className="bg-zinc-800 p-4 rounded-lg">
            <h4 className="text-white font-medium">Global Reach</h4>
            <p className="text-sm text-zinc-400">Expanded to multiple regions</p>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: "2023",
    content: (
      <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6 space-y-4">
        <h3 className="text-2xl font-bold text-white">Research & Development</h3>
        <p className="text-zinc-400">
          Dedicated our efforts to researching and developing cutting-edge AI orchestration technologies, laying the foundation for Orcha.
        </p>
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="bg-zinc-800 p-4 rounded-lg">
            <h4 className="text-white font-medium">Core Technology</h4>
            <p className="text-sm text-zinc-400">Developed our proprietary AI orchestration engine</p>
          </div>
          <div className="bg-zinc-800 p-4 rounded-lg">
            <h4 className="text-white font-medium">Team Building</h4>
            <p className="text-sm text-zinc-400">Assembled world-class AI experts</p>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: "2022",
    content: (
      <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6 space-y-4">
        <h3 className="text-2xl font-bold text-white">Company Founded</h3>
        <p className="text-zinc-400">
          Started with a vision to revolutionize how businesses interact with and manage AI technologies.
        </p>
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="bg-zinc-800 p-4 rounded-lg">
            <h4 className="text-white font-medium">Vision</h4>
            <p className="text-sm text-zinc-400">Established company mission and values</p>
          </div>
          <div className="bg-zinc-800 p-4 rounded-lg">
            <h4 className="text-white font-medium">Initial Funding</h4>
            <p className="text-sm text-zinc-400">Secured seed investment</p>
          </div>
        </div>
      </div>
    ),
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-black">
      <div className="max-w-7xl mx-auto pt-32 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">Our Journey</h1>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
            From inception to innovation, follow our path in revolutionizing AI orchestration and empowering businesses worldwide.
          </p>
        </div>
        <Timeline data={timelineData} />
      </div>
    </main>
  );
} 