"use client";

import React from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Database,
  Search,
  Sparkles,
  Layers,
  MessageSquare,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Check
} from "lucide-react";
import DocsSidebar from "@/components/docnav/DocumentNavigation";
import navItems from "@/data/document-nav.json";
import quickLinks from "@/data/quicklinks/onboarding-guide.json";
import QuickLinks from "@/components/quicklinks/QuickLinks";
import Link from "next/link";

export default function OnboardingGuidePage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <div className="flex flex-col md:flex-row">
        <DocsSidebar items={navItems} />

        <div className="flex-1 px-6 py-10 pt-24 max-w-5xl">
          <div className="mb-12">
            <div className="flex items-center gap-2 mb-4">
              <Badge variant="secondary" className="bg-teal-500/10 text-teal-300 border-teal-500/20 font-mono text-xs">
                Step-by-Step Walkthrough
              </Badge>
              <Badge variant="outline" className="border-gray-800 text-gray-400 font-mono text-xs">
                UI & Setup Guide
              </Badge>
            </div>
            <h1 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">
              Database Onboarding & Chatting Guide
            </h1>
            <p className="text-lg text-gray-300 max-w-3xl leading-relaxed">
              Follow this visual walkthrough to connect your database, scan metadata tables, declare business semantics in the Model Definition Language (MDL), configure domain knowledge, and start chatting with your AI agent.
            </p>
          </div>

          {/* Overview */}
          <div id="overview" className="mb-14 scroll-mt-28">
            <h2 className="text-2xl font-bold mb-4 text-white">The 4-Step Onboarding Wizard</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-4 rounded-xl bg-gray-900/70 border border-gray-800 text-center">
                <div className="w-7 h-7 rounded-full bg-teal-500/20 text-teal-300 font-mono font-bold text-xs mx-auto mb-2 flex items-center justify-center border border-teal-500/40">1</div>
                <div className="text-xs font-bold text-white">Connectivity</div>
                <div className="text-[11px] text-gray-400 mt-1">Configure credentials & test link</div>
              </div>
              <div className="p-4 rounded-xl bg-gray-900/70 border border-gray-800 text-center">
                <div className="w-7 h-7 rounded-full bg-blue-500/20 text-blue-300 font-mono font-bold text-xs mx-auto mb-2 flex items-center justify-center border border-blue-500/40">2</div>
                <div className="text-xs font-bold text-white">Catalog</div>
                <div className="text-[11px] text-gray-400 mt-1">Scan & select source tables</div>
              </div>
              <div className="p-4 rounded-xl bg-gray-900/70 border border-gray-800 text-center">
                <div className="w-7 h-7 rounded-full bg-purple-500/20 text-purple-300 font-mono font-bold text-xs mx-auto mb-2 flex items-center justify-center border border-purple-500/40">3</div>
                <div className="text-xs font-bold text-white">Semantic Bridge</div>
                <div className="text-[11px] text-gray-400 mt-1">Map dimensions, measures & logic</div>
              </div>
              <div className="p-4 rounded-xl bg-gray-900/70 border border-gray-800 text-center">
                <div className="w-7 h-7 rounded-full bg-amber-500/20 text-amber-300 font-mono font-bold text-xs mx-auto mb-2 flex items-center justify-center border border-amber-500/40">4</div>
                <div className="text-xs font-bold text-white">Finalize</div>
                <div className="text-[11px] text-gray-400 mt-1">Inject domain context & launch</div>
              </div>
            </div>
          </div>

          {/* STEP 1: Connectivity */}
          <div id="step-1-connectivity" className="mb-16 scroll-mt-28">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-8 rounded-xl bg-teal-500/20 text-teal-300 font-mono font-bold text-sm flex items-center justify-center border border-teal-500/40">
                1
              </span>
              <div>
                <h2 className="text-2xl font-bold text-white">Step 1: Source Connectivity & Engine Selection</h2>
                <p className="text-xs text-gray-400">Configure database parameters and test live connectivity</p>
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden border border-gray-800 bg-gray-950 mb-6 shadow-2xl">
              <img
                src="/guide/1.png"
                alt="Source Connectivity Configuration"
                className="w-full h-auto object-cover rounded-2xl"
              />
            </div>

            <div className="p-5 rounded-2xl bg-gray-900/60 border border-gray-800 space-y-3 text-sm text-gray-300 leading-relaxed">
              <h3 className="font-bold text-white text-base">Key Configuration Options:</h3>
              <ul className="list-disc pl-5 space-y-1.5 text-xs">
                <li><strong>Select Engine:</strong> Choose your target database dialect (<code>PostgreSQL</code>, <code>MySQL</code>, <code>MariaDB</code>, <code>MSSQL</code>, <code>Oracle</code>, or <code>SQLite</code>).</li>
                <li><strong>Connection Parameters:</strong> Enter Server Address / Host, Port (e.g. <code>3306</code> for MySQL, <code>5432</code> for Postgres), Username, Password, and Initial Database.</li>
                <li><strong>SSL / TLS Security:</strong> Toggle SSL encryption for cloud-managed instances (DigitalOcean, AWS RDS, GCP Cloud SQL, Supabase, Neon).</li>
                <li><strong>Test Connection:</strong> Click <strong>Test Connection</strong> to run an instant network ping and verify user credentials before proceeding.</li>
              </ul>
            </div>
          </div>

          {/* STEP 2: Catalog Scan */}
          <div id="step-2-catalog" className="mb-16 scroll-mt-28">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-8 rounded-xl bg-blue-500/20 text-blue-300 font-mono font-bold text-sm flex items-center justify-center border border-blue-500/40">
                2
              </span>
              <div>
                <h2 className="text-2xl font-bold text-white">Step 2: Metadata Extraction & Catalog Selection</h2>
                <p className="text-xs text-gray-400">Discover and select the tables to include in your semantic layer</p>
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden border border-gray-800 bg-gray-950 mb-6 shadow-2xl">
              <img
                src="/guide/2.png"
                alt="Metadata Extraction and Table Selection"
                className="w-full h-auto object-cover rounded-2xl"
              />
            </div>

            <div className="p-5 rounded-2xl bg-gray-900/60 border border-gray-800 space-y-3 text-sm text-gray-300 leading-relaxed">
              <h3 className="font-bold text-white text-base">Selective Scanning & Table Ingestion:</h3>
              <ul className="list-disc pl-5 space-y-1.5 text-xs">
                <li><strong>Automatic Table Discovery:</strong> Orcha queries system catalogs (e.g. <code>INFORMATION_SCHEMA</code>, <code>sys.tables</code>) to detect available tables, row estimates, and column data types.</li>
                <li><strong>Scope Selection:</strong> Check only the tables relevant to your business domain (e.g., <code>students</code>, <code>teachers</code>, <code>attendance</code>, <code>curriculum</code>, <code>grades</code>, <code>finance</code>) to optimize agent reasoning accuracy and eliminate noise.</li>
                <li><strong>Column Count Preview:</strong> Preview data types (<code>varchar</code>, <code>integer</code>, <code>datetime</code>, <code>decimal</code>) for each detected table.</li>
              </ul>
            </div>
          </div>

          {/* STEP 3: Semantic Bridge */}
          <div id="step-3-semantic-bridge" className="mb-16 scroll-mt-28">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-8 rounded-xl bg-purple-500/20 text-purple-300 font-mono font-bold text-sm flex items-center justify-center border border-purple-500/40">
                3
              </span>
              <div>
                <h2 className="text-2xl font-bold text-white">Step 3: Semantic Layer (MDL) Business Modeling</h2>
                <p className="text-xs text-gray-400">Map columns to business definitions, dimensions, measures, and caveats</p>
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden border border-gray-800 bg-gray-950 mb-6 shadow-2xl">
              <img
                src="/guide/3.png"
                alt="Semantic Layer MDL Modeling"
                className="w-full h-auto object-cover rounded-2xl"
              />
            </div>

            <div className="p-5 rounded-2xl bg-gray-900/60 border border-gray-800 space-y-3 text-sm text-gray-300 leading-relaxed">
              <h3 className="font-bold text-white text-base">Defining Semantic Metadata:</h3>
              <ul className="list-disc pl-5 space-y-1.5 text-xs">
                <li><strong>Business Descriptions:</strong> Annotate what each table is used for in plain English so the LLM understands its purpose.</li>
                <li><strong>Business Logic & Caveats:</strong> Provide filtering rules and known quirks (e.g., <em>&quot;Only includes data since 2021&quot;</em>, <em>&quot;Cancelled orders have status = &#39;VOID&#39;&quot;</em>).</li>
                <li><strong>Semantic Typing:</strong> Classify fields into <strong>Dimensions</strong> (categorical grouping attributes) or <strong>Measures</strong> (quantitative numerical aggregates).</li>
                <li><strong>Primary Keys & References:</strong> Mark primary key indicators (<code>PK</code>) to assist the BFS graph join engine.</li>
                <li><strong>View Modes:</strong> Switch seamlessly between <strong>Form View</strong> and <strong>Diagram View</strong> (React Flow canvas).</li>
              </ul>
            </div>
          </div>

          {/* STEP 4: Deployment Profile */}
          <div id="step-4-profile" className="mb-16 scroll-mt-28">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-300 font-mono font-bold text-sm flex items-center justify-center border border-amber-500/40">
                4
              </span>
              <div>
                <h2 className="text-2xl font-bold text-white">Step 4: Finalize Deployment Profile & Domain Context</h2>
                <p className="text-xs text-gray-400">Inject domain common sense and branding metadata</p>
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden border border-gray-800 bg-gray-950 mb-6 shadow-2xl">
              <img
                src="/guide/4.png"
                alt="Deployment Profile and Domain Context"
                className="w-full h-auto object-cover rounded-2xl"
              />
            </div>

            <div className="p-5 rounded-2xl bg-gray-900/60 border border-gray-800 space-y-3 text-sm text-gray-300 leading-relaxed">
              <h3 className="font-bold text-white text-base">Injecting Domain & Industry Knowledge:</h3>
              <ul className="list-disc pl-5 space-y-1.5 text-xs">
                <li><strong>Connection Display Name:</strong> Assign an intuitive label (e.g. <code>School Database</code>, <code>Production Sales</code>).</li>
                <li><strong>Business Context (Domain Knowledge):</strong> Give the agent overarching common sense about your industry (e.g., <em>&quot;Educational Institution Management System with student enrollment, faculty workloads, grading periods, and tuition accounts&quot;</em>).</li>
                <li><strong>Resource Tags:</strong> Add searchable tags for organizational categorization and API key multi-tenancy scoping.</li>
              </ul>
            </div>
          </div>

          {/* STEP 5: Database Chatting */}
          <div id="step-5-chatting" className="mb-16 scroll-mt-28">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-300 font-mono font-bold text-sm flex items-center justify-center border border-emerald-500/40">
                5
              </span>
              <div>
                <h2 className="text-2xl font-bold text-white">Step 5: Natural Language Database Chatting</h2>
                <p className="text-xs text-gray-400">Ask natural language questions and receive accurate semantic answers</p>
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden border border-gray-800 bg-gray-950 mb-6 shadow-2xl">
              <img
                src="/guide/5.png"
                alt="Conversational Database Chatting Interface"
                className="w-full h-auto object-cover rounded-2xl"
              />
            </div>

            <div className="p-5 rounded-2xl bg-gray-900/60 border border-gray-800 space-y-3 text-sm text-gray-300 leading-relaxed">
              <h3 className="font-bold text-white text-base">Interactive Chat Experience:</h3>
              <ul className="list-disc pl-5 space-y-1.5 text-xs">
                <li><strong>Zero Prompt Engineering Needed:</strong> Ask high-level questions like <em>&quot;What is this database about?&quot;</em> or <em>&quot;Which students are at risk of missing attendance requirements?&quot;</em>.</li>
                <li><strong>Domain-Aware Synthesis:</strong> Orcha Agent understands the business entities (Students, Teachers, Attendance, Grades, Finance, Curriculum) and core capabilities.</li>
                <li><strong>Model Selector:</strong> Switch between models dynamically (e.g. <code>Claude Haiku 4.5 (Fast)</code>, <code>Claude Sonnet 3.7</code>, <code>GPT-4o</code>) directly in the chat bar.</li>
                <li><strong>Multi-Database Scope:</strong> Select which connected databases to query via the database pill selector.</li>
              </ul>
            </div>
          </div>

          {/* Next Steps */}
          <div className="mb-16 p-6 rounded-2xl bg-gradient-to-br from-gray-900 to-gray-950 border border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-bold text-white mb-1">Ready to explore more?</h3>
              <p className="text-xs text-gray-400">Check out the Semantic Modeler guide or integrate the API with your applications.</p>
            </div>
            <div className="flex gap-3">
              <Link href="/docs/core-concepts/semantic-modeler">
                <Button className="bg-purple-600 hover:bg-purple-700 text-white font-semibold text-xs px-4">
                  Semantic Modeler
                  <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                </Button>
              </Link>
              <Link href="/docs/api-reference/chat">
                <Button variant="outline" className="border-gray-700 hover:bg-gray-800 text-gray-300 text-xs px-4">
                  Chat API Docs
                </Button>
              </Link>
            </div>
          </div>

        </div>

        <QuickLinks links={quickLinks} />
      </div>
    </main>
  );
}
