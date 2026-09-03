"use client";

import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Sparkles,
  Database,
  Cpu,
  Layers,
  ShieldCheck,
  Zap,
  Boxes,
  Code2,
  Terminal,
  Activity,
  ArrowRight,
  GitFork,
  CheckCircle2,
  Share2
} from "lucide-react";
import DocsSidebar from "@/components/docnav/DocumentNavigation";
import navItems from "@/data/document-nav.json";
import quickLinks from "@/data/quicklinks/intro.json";
import QuickLinks from "@/components/quicklinks/QuickLinks";
import Link from "next/link";

const features = [
  {
    icon: Database,
    title: "Semantic Bridge & ModelerWizard",
    description: "Map raw table structures into unified business semantics. Define calculated virtual metrics (e.g., margin = revenue - cost) and entity relationships via React Flow.",
    color: "from-teal-500 to-emerald-600",
  },
  {
    icon: Cpu,
    title: "Rust-Powered WASM Engine",
    description: "On-the-fly SQL transpilation and formula inlining powered by an embedded WebAssembly build of Apache DataFusion. Sub-second execution with dialect adaptation.",
    color: "from-amber-500 to-orange-600",
  },
  {
    icon: GitFork,
    title: "Automatic BFS Join Pathing",
    description: "Traverses graph relationships using Breadth-First Search algorithms to automatically determine and inject optimal ANSI SQL JOIN clauses across complex schemas.",
    color: "from-purple-500 to-indigo-600",
  },
  {
    icon: Share2,
    title: "Federated Multi-DB Queries",
    description: "Query, aggregate, and join data across disparate database connections simultaneously using intuitive alias.table namespace addressing.",
    color: "from-blue-500 to-cyan-600",
  },
  {
    icon: Boxes,
    title: "MCP Native Architecture",
    description: "Expose your databases directly to AI assistants like Claude Desktop, Cursor, and Windsurf via Model Context Protocol tools with dynamic schema resolution.",
    color: "from-rose-500 to-pink-600",
  },
  {
    icon: Activity,
    title: "Full Observability & Grafana",
    description: "Built-in Prometheus telemetry (/api/metrics) tracking p95 latencies, request throughput, 5xx ratios, and memory usage with pre-provisioned Grafana dashboards.",
    color: "from-emerald-500 to-teal-600",
  },
];

const supportedDatabases = [
  { name: "PostgreSQL", desc: "Native connection pooling with SSL" },
  { name: "MySQL / MariaDB", desc: "Full TCP multi-host support" },
  { name: "MSSQL Server", desc: "Enterprise TDS connector" },
  { name: "Oracle DB", desc: "Enterprise schema integration" },
  { name: "SQLite", desc: "Fast local & file-based execution" },
];

export default function IntroPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <div className="flex flex-col md:flex-row">
        <DocsSidebar items={navItems} />

        <div className="flex-1 px-6 py-10 pt-24 max-w-5xl">
          {/* Hero Header */}
          <div id="overview" className="relative mb-16 scroll-mt-28">
            <div className="absolute -top-20 -left-20 w-96 h-96 bg-teal-500/15 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />

            <div className="relative">
              <Badge variant="secondary" className="mb-4 bg-teal-500/10 text-teal-300 border-teal-500/20 font-mono text-xs">
                Orcha Agent OS v1.0 Production
              </Badge>

              <h1 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">
                <span className="bg-gradient-to-r from-white via-teal-100 to-purple-200 bg-clip-text text-transparent">
                  The Semantic Operating System for Multi-Tenant AI Agents
                </span>
              </h1>

              <p className="text-lg text-gray-300 max-w-3xl mb-8 leading-relaxed">
                Orcha Agent OS bridges the gap between raw data warehouses and context-aware LLMs.
                It translates fragmented database schemas into a unified, versionable Model Definition Language (MDL) manifest,
                allowing AI agents to reliably write, validate, and execute accurate SQL queries without hallucinating schemas.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link href="/docs/getting-started/quickstart">
                  <Button className="bg-gradient-to-r from-teal-500 to-purple-600 hover:from-teal-600 hover:to-purple-700 text-white font-semibold px-6 shadow-lg shadow-teal-500/20">
                    Quick Start Setup
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/docs/architecture">
                  <Button variant="outline" className="border-gray-700 hover:bg-gray-800 text-gray-200 font-mono text-xs">
                    View Architecture & Pipeline
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Vision Section */}
          <div id="vision" className="mb-16 scroll-mt-28">
            <h2 className="text-2xl font-bold mb-4 text-white">The Core Problem & Vision</h2>
            <div className="p-6 rounded-2xl bg-gray-900/60 border border-gray-800 space-y-4 text-gray-300 leading-relaxed">
              <p>
                In the era of modern AI, the primary hurdle in enterprise data intelligence is not generating generic SQL syntax—it is <strong>business semantics</strong>.
                AI agents lack awareness of what raw database columns mean, how metrics are computed, and which tables must be joined to resolve complex multi-table queries.
              </p>
              <p>
                <strong>Orcha Agent OS provides a Semantic Context Layer</strong>:
              </p>
              <div className="grid sm:grid-cols-2 gap-3 pt-2">
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="h-5 w-5 text-teal-400 shrink-0 mt-0.5" />
                  <span className="text-sm">Eliminates hallucinations by constraining LLM queries to curated Model Definition Language (MDL) definitions.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="h-5 w-5 text-teal-400 shrink-0 mt-0.5" />
                  <span className="text-sm">Inlines complex business formulas automatically using an embedded Rust WASM Apache DataFusion engine.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="h-5 w-5 text-teal-400 shrink-0 mt-0.5" />
                  <span className="text-sm">Automatically calculates and injects multi-hop join paths using graph pathing algorithms.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="h-5 w-5 text-teal-400 shrink-0 mt-0.5" />
                  <span className="text-sm">Dry-plan validates queries before sending them to physical databases, safeguarding production workloads.</span>
                </div>
              </div>
            </div>
          </div>

          {/* Key Features Grid */}
          <div id="features" className="mb-16 scroll-mt-28">
            <h2 className="text-2xl font-bold mb-6 text-white">Platform Capabilities</h2>
            <div className="grid md:grid-cols-2 gap-5">
              {features.map((feature) => {
                const Icon = feature.icon;
                return (
                  <Card key={feature.title} className="bg-gray-900/50 border-gray-800 hover:border-teal-500/40 transition-all duration-300">
                    <CardHeader className="pb-3">
                      <div className="flex items-center gap-3">
                        <div className={`p-2.5 rounded-xl bg-gradient-to-br ${feature.color} text-white shadow-md`}>
                          <Icon className="h-5 w-5" />
                        </div>
                        <CardTitle className="text-lg text-white font-bold">{feature.title}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-gray-400 leading-relaxed text-sm">
                        {feature.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Supported Databases */}
          <div className="mb-16">
            <h3 className="text-lg font-bold text-white mb-4">Supported Database Dialects</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
              {supportedDatabases.map((db) => (
                <div key={db.name} className="p-3.5 rounded-xl bg-gray-900/80 border border-gray-800 text-center">
                  <div className="text-sm font-bold text-white font-mono">{db.name}</div>
                  <div className="text-[11px] text-gray-500 mt-1">{db.desc}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Architecture Summary */}
          <div id="architecture-summary" className="mb-16 scroll-mt-28">
            <h2 className="text-2xl font-bold mb-4 text-white">Query Lifecycle at a Glance</h2>
            <div className="p-6 rounded-2xl bg-gray-950 border border-gray-800 font-mono text-xs text-gray-300 space-y-2.5 overflow-x-auto">
              <div className="text-teal-400 font-bold">1. Intent Classification & Rewriting ───► Extract query goals & resolve context</div>
              <div className="text-blue-400 font-bold">2. Semantic Vector Recall ──────────────► Retrieve relevant schema & past query patterns</div>
              <div className="text-indigo-400 font-bold">3. Schema Column Pruner ────────────────► Filter out unneeded columns to save LLM tokens</div>
              <div className="text-purple-400 font-bold">4. LLM Semantic SQL Generation ─────────► Generate SQL query against business MDL layer</div>
              <div className="text-amber-400 font-bold">5. Rust WASM Transpilation ─────────────► Inlines virtual formulas & resolves table joins</div>
              <div className="text-rose-400 font-bold">6. Dry-Plan Static SQL Validation ──────► Catch wrong column names or joins pre-execution</div>
              <div className="text-emerald-400 font-bold">7. Native Dialect Database Call ────────► Execute against Postgres/MySQL/MSSQL/SQLite</div>
            </div>
          </div>

          {/* Next Steps Links */}
          <div id="next-steps" className="mb-16 scroll-mt-28">
            <h2 className="text-2xl font-bold mb-6 text-white">Next Steps</h2>
            <div className="grid sm:grid-cols-3 gap-4">
              <Link href="/docs/getting-started/quickstart" className="block p-5 rounded-xl bg-gradient-to-b from-gray-900 to-gray-950 border border-gray-800 hover:border-teal-500/50 transition-all group">
                <div className="text-teal-400 font-bold text-sm mb-1 group-hover:text-teal-300">Quick Start Guide →</div>
                <div className="text-xs text-gray-400">Deploy the full stack locally via Docker in under 5 minutes.</div>
              </Link>
              <Link href="/docs/core-concepts/semantic-modeler" className="block p-5 rounded-xl bg-gradient-to-b from-gray-900 to-gray-950 border border-gray-800 hover:border-purple-500/50 transition-all group">
                <div className="text-purple-400 font-bold text-sm mb-1 group-hover:text-purple-300">Semantic Modeler →</div>
                <div className="text-xs text-gray-400">Design your data models and virtual calculated columns visually.</div>
              </Link>
              <Link href="/docs/api-reference" className="block p-5 rounded-xl bg-gradient-to-b from-gray-900 to-gray-950 border border-gray-800 hover:border-blue-500/50 transition-all group">
                <div className="text-blue-400 font-bold text-sm mb-1 group-hover:text-blue-300">API Reference →</div>
                <div className="text-xs text-gray-400">Integrate /api/chat and /api/mcp into your custom AI applications.</div>
              </Link>
            </div>
          </div>

        </div>

        <QuickLinks links={quickLinks} />
      </div>
    </main>
  );
}
