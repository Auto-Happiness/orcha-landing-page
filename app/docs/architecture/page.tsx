"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Sparkles,
  Search,
  Database,
  Cpu,
  ShieldCheck,
  Zap,
  Boxes,
  CheckCircle2,
  ArrowRight,
  GitFork,
  Code2,
  FileCode2,
  Play
} from "lucide-react";
import DocsSidebar from "@/components/docnav/DocumentNavigation";
import navItems from "@/data/document-nav.json";
import quickLinks from "@/data/quicklinks/architecture.json";
import QuickLinks from "@/components/quicklinks/QuickLinks";
import Link from "next/link";

const stages = [
  {
    step: "1",
    id: "intent",
    title: "Intent Classification & Conversational Rewriting",
    file: "lib/intent-classifier.ts & lib/query-rewriter.ts",
    description: "Determines whether the user's input is a quantitative data question (Text-to-SQL), an exploratory schema question, or conversational chit-chat. For follow-up questions (e.g. 'What about in 2024?'), the query rewriter uses conversational history to produce a self-contained question.",
    color: "border-teal-500/40 bg-teal-500/5 text-teal-400",
  },
  {
    step: "2",
    id: "memory",
    title: "Semantic Vector Memory Recall",
    file: "convex/semanticMemory.ts",
    description: "Performs vector similarity search against previously verified natural language questions and curated golden SQL pairs. If a close match is found, the verified SQL template is injected into the prompt context to guide the model.",
    color: "border-blue-500/40 bg-blue-500/5 text-blue-400",
  },
  {
    step: "3",
    id: "pruner",
    title: "Schema Column Pruner",
    file: "lib/column-pruner.ts",
    description: "For databases with hundreds of tables or thousands of columns, sending the entire schema would blow out LLM token limits and introduce noise. The column pruner selects only the relevant models, dimensions, and measures needed for the question.",
    color: "border-indigo-500/40 bg-indigo-500/5 text-indigo-400",
  },
  {
    step: "4",
    id: "sql-gen",
    title: "LLM Semantic SQL Generation (MDL Layer)",
    file: "lib/chat-agent.ts",
    description: "The LLM generates SQL not against raw database table physical names, but against the clean Model Definition Language (MDL) manifest. It queries business terms like 'revenue', 'order_count', or 'margin' without worrying about low-level joins or formula expansions.",
    color: "border-purple-500/40 bg-purple-500/5 text-purple-400",
  },
  {
    step: "5",
    id: "transpiler",
    title: "WASM Semantic Transpiler & Formula Inlining",
    file: "orcha-rust-engine (Apache DataFusion WASM)",
    description: "The compiled Rust WebAssembly engine takes the MDL-level SQL and transpiles it into standard ANSI SQL. It automatically resolves calculated virtual columns (inlining math formulas), strips unused views, and dynamically injects join paths via Graph BFS pathing.",
    color: "border-amber-500/40 bg-amber-500/5 text-amber-400",
  },
  {
    step: "6",
    id: "validator",
    title: "Dry-Plan SQL Validator",
    file: "lib/sql-validator.ts",
    description: "Runs static schema checking and dry-run query planning rules against the generated SQL. It verifies that all referenced tables and columns actually exist and catches syntax errors before any physical database connection is touched.",
    color: "border-rose-500/40 bg-rose-500/5 text-rose-400",
  },
  {
    step: "7",
    id: "execution",
    title: "OrchaFusion Native Dialect Database Execution",
    file: "lib/db-executor.ts & lib/engine/orchafusion.ts",
    description: "Translates the validated ANSI SQL into the target dialect (Postgres, MySQL, SQLite, MSSQL, Oracle) and executes it securely over an encrypted connection pool. Returns structured JSON records to the UI, MCP client, or API consumer.",
    color: "border-emerald-500/40 bg-emerald-500/5 text-emerald-400",
  },
];

export default function ArchitecturePage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <div className="flex flex-col md:flex-row">
        <DocsSidebar items={navItems} />

        <div className="flex-1 px-6 py-10 pt-24 max-w-5xl">
          {/* Header */}
          <div className="mb-12">
            <Badge variant="secondary" className="mb-4 bg-purple-500/10 text-purple-300 border-purple-500/20 font-mono text-xs">
              System Architecture
            </Badge>
            <h1 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">
              Architecture & Query Pipeline
            </h1>
            <p className="text-lg text-gray-300 max-w-3xl leading-relaxed">
              Every natural language question in Orcha Agent OS passes through a multi-stage compilation,
              validation, and transpilation pipeline before reaching your physical database warehouse.
            </p>
          </div>

          {/* Pipeline Section */}
          <div id="pipeline" className="mb-16 scroll-mt-28">
            <h2 className="text-2xl font-bold mb-8 text-white">The 7-Stage Query Lifecycle</h2>
            <div className="space-y-6">
              {stages.map((stage) => (
                <div
                  key={stage.id}
                  id={stage.id}
                  className={`p-6 rounded-2xl border ${stage.color} scroll-mt-28 relative transition-all duration-300 hover:shadow-lg`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <span className="w-7 h-7 rounded-lg bg-gray-900 border border-gray-700 flex items-center justify-center font-mono font-bold text-xs text-white">
                        {stage.step}
                      </span>
                      <h3 className="text-lg font-bold text-white">{stage.title}</h3>
                    </div>
                    <span className="text-[11px] font-mono text-gray-400 bg-gray-900/80 px-2.5 py-1 rounded-md border border-gray-800">
                      {stage.file}
                    </span>
                  </div>
                  <p className="text-gray-300 text-sm leading-relaxed pl-10">
                    {stage.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Rust WASM Engine Deep Dive */}
          <div className="mb-16 p-8 rounded-2xl bg-gradient-to-br from-gray-900 to-gray-950 border border-gray-800">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
                <Cpu className="h-5 w-5" />
              </div>
              <h3 className="text-xl font-bold text-white">Why an Embedded Rust WASM Engine?</h3>
            </div>
            <p className="text-sm text-gray-300 leading-relaxed mb-4">
              Traditional text-to-SQL frameworks rely on the LLM to write exact raw SQL dialect syntax, inline complex algebraic formulas, and remember full join syntax.
              This frequently leads to syntax errors, incorrect grouping, or catastrophic cartesian product joins.
            </p>
            <p className="text-sm text-gray-300 leading-relaxed mb-4">
              In Orcha Agent OS, the LLM generates simplified queries against high-level <strong>MDL models</strong>.
              The <strong>Rust WebAssembly binary (compiled from Apache DataFusion)</strong> takes this abstract syntax tree (AST), optimizes the plan in memory, and transpiles it into mathematically sound native SQL in under <strong>5 milliseconds</strong>.
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              <span className="text-xs font-mono px-2.5 py-1 rounded-md bg-gray-800 text-amber-300 border border-amber-500/30">Zero Runtime Garbage Collection</span>
              <span className="text-xs font-mono px-2.5 py-1 rounded-md bg-gray-800 text-amber-300 border border-amber-500/30">Deterministic Join Injection</span>
              <span className="text-xs font-mono px-2.5 py-1 rounded-md bg-gray-800 text-amber-300 border border-amber-500/30">Sub-5ms WASM Latency</span>
            </div>
          </div>

          {/* Graph BFS Join Pathing */}
          <div className="mb-16">
            <h3 className="text-xl font-bold text-white mb-4">Automatic BFS Join Pathing</h3>
            <p className="text-sm text-gray-300 leading-relaxed mb-4">
              When a user asks for metrics residing in different tables (e.g., <code>Customers</code>, <code>Orders</code>, and <code>Payments</code>),
              Orcha constructs an in-memory graph where tables are nodes and foreign-key / semantic relationships are edges.
            </p>
            <div className="p-5 rounded-xl bg-gray-950 border border-gray-800 font-mono text-xs text-gray-300 space-y-1.5 overflow-x-auto">
              <div className="text-gray-500">// BFS Path Discovery Example:</div>
              <div>From: <span className="text-teal-400">Customers</span> ──(cust_id)──► <span className="text-purple-400">Orders</span> ──(order_id)──► <span className="text-blue-400">Order_Items</span> ──(prod_id)──► <span className="text-emerald-400">Products</span></div>
              <div className="text-amber-400 pt-2 font-bold">✔ Result: Automatically injects 3 INNER JOIN clauses without prompt engineering.</div>
            </div>
          </div>

        </div>

        <QuickLinks links={quickLinks} />
      </div>
    </main>
  );
}
