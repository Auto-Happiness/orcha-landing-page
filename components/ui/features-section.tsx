"use client";

import React from "react";
import { AppleCarousel } from "./aceternity/apple-carousel";

const featureCards = [
  {
    id: 1,
    title: "Instant Deployment",
    category: "Cloud Infrastructure",
    description: "Deploy your applications in seconds with our automated pipeline",
    image: "/placeholder.jpg"
  },
  {
    id: 2,
    title: "Auto Scaling",
    category: "Performance",
    description: "Automatically scale your resources based on demand",
    image: "/placeholder.jpg"
  },
  {
    id: 3,
    title: "Real-time Monitoring",
    category: "Analytics",
    description: "Monitor your application's performance in real-time",
    image: "/placeholder.jpg"
  },
  {
    id: 4,
    title: "Security First",
    category: "Security",
    description: "Enterprise-grade security out of the box",
    image: "/placeholder.jpg"
  },
  {
    id: 5,
    title: "Global CDN",
    category: "Performance",
    description: "Lightning-fast content delivery worldwide",
    image: "/placeholder.jpg"
  }
];

export function FeaturesSection() {
  return (
    <section id="features" className="min-h-screen bg-[#1C1E26] py-20">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Powerful Features for Modern Development
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Everything you need to build, deploy, and scale your applications with confidence.
            Our platform provides enterprise-grade tools with developer-friendly experiences.
          </p>
        </div>

        <AppleCarousel items={featureCards} />
      </div>
    </section>
  );
} 