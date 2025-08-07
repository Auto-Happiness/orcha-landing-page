"use client";

import React from "react";
import { Timeline } from "@/components/ui/timeline";
import Image from "next/image";
import DocsSidebar from "@/components/docnav/DocumentNavigation";
import navItems from "@/data/document-nav.json";

export default function IntroPage() {
  return (
    <main className="min-h-screen bg-black text-white px-6 py-10 pt-20">
      <div className="flex flex-col md:flex-row gap-8">
        
        {/* Left Navigation Panel */}
         <DocsSidebar items={navItems} />

        {/* Center Content */}
        <div className="flex-1 space-y-6">
          <h1 className="text-4xl font-bold">Welcome to the Documentation</h1>
          <p className="text-lg text-gray-300">
            This is the introduction page. Learn what this project is about and how to get started.
          </p>

        

        </div>

        {/* Right Panel */}
        <aside className="w-full md:w-80 bg-gray-900 border border-gray-700 rounded-lg p-5 h-fit sticky top-10">
          <h2 className="text-xl font-semibold mb-4 text-white">Quick Links</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-400 text-sm">
            <li>
              <a href="#getting-started" className="hover:text-white hover:underline">Getting Started</a>
            </li>
            <li>
              <a href="#features" className="hover:text-white hover:underline">Features</a>
            </li>
            <li>
              <a href="#api" className="hover:text-white hover:underline">API Reference</a>
            </li>
            <li>
              <a href="#faq" className="hover:text-white hover:underline">FAQ</a>
            </li>
          </ul>

          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2 text-white">Need Help?</h3>
            <p className="text-sm text-gray-400">
              Visit our <a href="/support" className="text-blue-400 hover:underline">Support Page</a> or reach out.
            </p>
          </div>
        </aside>
      </div>
    </main>
  );
}
