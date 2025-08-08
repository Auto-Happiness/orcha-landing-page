"use client";

import React from "react";
import DocsSidebar from "@/components/docnav/DocumentNavigation";
import navItems from "@/data/document-nav.json";
import quickLinks from "@/data/quicklinks/intro.json";

import QuickLinks from "@/components/quicklinks/QuickLinks";

export default function IntroPage() {
  return (
    <main className="min-h-screen bg-black text-white px-6 py-10 pt-20">
      <div className="flex flex-col md:flex-row gap-8">
        
        <DocsSidebar items={navItems} />

        <div className="flex-1 space-y-6">
          <h1 id="getting-started" className="text-4xl font-bold">
            Introduction
          </h1>
          <p className="text-lg text-gray-300">
            This is the introduction page. Learn what the Orcha project is about and how to get started.
          </p>
          <p className="text-lg text-gray-300">
            Orcha is an AI no-code builder built on top of LangChain and LangGraph, designed to help users create LLM-powered applications without any coding knowledge. With Orcha, you can easily build a customer support chatbot using any data including your private data, or set up a team of AI agents to handle complex and repetitive tasks.
          </p>
          {/* Key Features */}
          <div>
            <h2 id="features" className="text-2xl font-semibold mt-6">
              Key Features
            </h2>
            <ul className="list-disc list-inside space-y-2 text-gray-300 mt-3">
              <li>⚡ No Code drag & drop visual builder</li>
              <li>📦 API ready for developers</li>
              <li>🔒 Analytics</li>
              <li>🛠 Human in the loop</li>
            </ul>
          </div>

          <div className="overflow-x-auto mt-6">
              <h2 id="capabilities" className="text-2xl font-semibold mt-6">
              Capabilities
            </h2>
            <table className="min-w-full border border-gray-700 text-sm">
              <thead className="bg-gray-800">
                <tr>
                  <th className="px-4 py-2 text-left font-semibold text-gray-200 border-b border-gray-700">
                    Capability
                  </th>
                  <th className="px-4 py-2 text-left font-semibold text-gray-200 border-b border-gray-700">
                    Description
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["AI Orchestration", "No code workflow; supports open-source & proprietary models; expressions; custom code; branching, looping & routing logic."],
                  ["Data Ingestion & Integration", "Wide variety of sources, tools, vector databases, and memory systems."],
                  ["Data Processing", "Transformers, Filters, Aggregates, Custom code."],
                  ["Memory", "Memory optimization techniques and integrations."],
                  ["MCP Integration", "MCP client/server nodes."],
                  ["Safety", "Input moderation & output post-processing."],
                  ["API, SDK", "API access, Python, JS, .NET and Golang SDKs"],
                  ["Embedded & Share Chatbot", "Customizable embedded chat widget and component."],
                  ["Components", "Reusable node base components."],
                  ["Security Controls", "Api key management, encrypted creds, secret managers, rate limiting, restricted domains."],
                  ["Vendor Support", "SLA-backed support, consultations, fixed/deterministic pricing."],
                  ["Observability", "Logs"],

                ].map(([capability, description], idx) => (
                  <tr key={idx} className="border-b border-gray-700">
                    <td className="px-4 py-2 font-medium text-white">{capability}</td>
                    <td className="px-4 py-2 text-gray-300">{description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <QuickLinks links={quickLinks} />
      </div>
    </main>
  );
}
