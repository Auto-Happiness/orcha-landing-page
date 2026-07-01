"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Search,
  Database,
  Brackets,
  Compass,
  FileCode,
  Settings,
  ShieldCheck,
  CheckCircle2,
  Cpu,
  ChevronRight,
  Terminal,
  Play,
  Pause,
  RotateCcw
} from "lucide-react";

interface FlowStep {
  title: string;
  subtitle: string;
  files: string[];
  description: string;
  icon: React.ReactNode;
  logLines: string[];
  badgeColor: string;
}

export function SemanticFlow() {
  const [activeStep, setActiveStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const steps: FlowStep[] = [
    {
      title: "Introspect",
      subtitle: "Database Scanning",
      files: ["introspection.ts", "scan.ts"],
      description: "The introspection scanner reads physical tables, column schemas, native data types, and actual Foreign Key constraints directly from your source database.",
      icon: <Database className="h-5 w-5" />,
      badgeColor: "from-teal-400 to-emerald-500",
      logLines: [
        "Initializing introspection scanner...",
        "Connecting to source database (host: DB_CLUSTER_PRIMARY)...",
        "READING: information_schema.tables...",
        "Found 24 physical tables and 142 column schemas.",
        "Detecting Foreign Keys: orders.customer_id -> customers.id [1:N]",
        "Introspection complete. Schema snapshot generated successfully."
      ]
    },
    {
      title: "Model & Enrich",
      subtitle: "Semantic Annotation",
      files: ["semanticModels.ts"],
      description: "Schemas are mapped to Convex collections. Technical identifiers are annotated with business display names, semantic types (Dimension vs. Measure), raw technical types, and virtual formulas.",
      icon: <Brackets className="h-5 w-5" />,
      badgeColor: "from-blue-400 to-indigo-500",
      logLines: [
        "Mapping schemas to Convex collection configurations...",
        "Annotating technical identifier: orders.id -> 'Order ID'",
        "Annotating semantic type: order_details.quantity -> Measure (SUM)",
        "Annotating semantic type: customers.country -> Dimension",
        "Adding virtual formula: total_revenue = quantity * unit_price * (1 - discount)",
        "Semantic model enrichment compiled."
      ]
    },
    {
      title: "Vectorize",
      subtitle: "Embedding Generation",
      files: ["embeddings.ts"],
      description: "Table and column semantic data (names, descriptions, remarks) are converted to vector embeddings and stored in Convex’s vector index.",
      icon: <Compass className="h-5 w-5" />,
      badgeColor: "from-purple-400 to-fuchsia-500",
      logLines: [
        "Generating text payloads for vectorization...",
        "Payload: 'Table Orders: Contains sales data for fictitious specialty food exports...'",
        "Invoking embedding model: text-embedding-3-small...",
        "Received 1536-dimension vector coefficients.",
        "Inserting vector entries into Convex VectorIndex [semantic_schema_idx]...",
        "Vectorization complete. 24 tables and 142 columns indexed."
      ]
    },
    {
      title: "Compile Manifest",
      subtitle: "Startup Consolidation",
      files: ["chat-agent.ts"],
      description: "At startup, Orcha compiles active semantic models and relationship paths into a single Compiled Semantic Manifest representing the global schema structure.",
      icon: <FileCode className="h-5 w-5" />,
      badgeColor: "from-pink-400 to-rose-500",
      logLines: [
        "Loading active semantic models from Convex store...",
        "Resolving global relationship graph (28 nodes, 42 edges)...",
        "Validating cyclic dependency chains... Clean.",
        "Generating Compiled Semantic Manifest (JSON format)...",
        "Manifest Size: 245 KB. Paths compiled: 72 unique join paths.",
        "Manifest cached in memory. Orcha ready for steering requests."
      ]
    },
    {
      title: "Steer & Recall",
      subtitle: "RAG & Semantic Retrieval",
      files: ["chat-agent.ts", "semanticMemory.ts"],
      description: "RAG computes the user question's embedding. It pulls related tables via vector matching and recalls the top 3 successful past SQL templates from memory.",
      icon: <Cpu className="h-5 w-5" />,
      badgeColor: "from-orange-400 to-amber-500",
      logLines: [
        "Received user query: 'Show me total revenue for customers in Germany'",
        "Generating query embedding vector...",
        "Executing vector search on [semantic_schema_idx] (K=5)...",
        "Retrieved matching nodes: [Orders (0.88), Customers (0.84), Order Details (0.81)]",
        "Searching semanticMemory for past templates...",
        "Found matches: Pushing 3 past successful SQL templates into agent context."
      ]
    },
    {
      title: "Local Dry-Plan",
      subtitle: "Validation & Transpilation",
      files: ["sql-validator.ts", "semantic-transpiler.ts"],
      description: "The agent generates a query candidate and passes it to the dry_plan_sql tool. The local validator checks table and column existences before hitting the DB using DataFusion.",
      icon: <ShieldCheck className="h-5 w-5" />,
      badgeColor: "from-cyan-400 to-sky-500",
      logLines: [
        "Agent generated candidate query: SELECT SUM(total_revenue) FROM Orders...",
        "Translating semantic syntax to physical dialect (Postgres)...",
        "Invoking dry_plan_sql validation tool...",
        "Parsing AST with DataFusion...",
        "Verifying schema: 'Orders' table exists. 'total_revenue' formula expands to raw columns.",
        "Validation SUCCESS. Dialect checked. SQL safe for database execution."
      ]
    },
    {
      title: "Execute & Save",
      subtitle: "OrchaFusion Execution",
      files: ["semanticMemory.ts"],
      description: "The verified SQL is executed via OrchaFusion. If execution succeeds, the query pair is pushed to semanticMemory for future RAG recall.",
      icon: <CheckCircle2 className="h-5 w-5" />,
      badgeColor: "from-teal-400 to-cyan-500",
      logLines: [
        "Executing SQL on physical database...",
        "Dialect: PostgreSQL. Query Time: 24ms.",
        "Rows returned: 1. Value: $244,183.00",
        "Formulating agent conversational response...",
        "Pushing query pair to semanticMemory (ID: mem_9201a)...",
        "Lifecycle execution complete. Ready for next cycle."
      ]
    }
  ];

  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setActiveStep((prev) => (prev + 1) % steps.length);
      }, 4000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, steps.length]);

  const handleStepClick = (index: number) => {
    setActiveStep(index);
    setIsPlaying(false); // Pause autoplay on manual selection
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-10 py-4 select-none">
      
      {/* Inline styles for keyframe animation of moving circle */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes travel-data {
          0% { left: 0%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { left: 100%; opacity: 0; }
        }
      `}} />
      
      {/* ── FLOW TIMELINE NODES ── */}
      <div className="relative">
        
        {/* Glow progress line behind nodes */}
        <div className="absolute top-[24px] left-[7%] right-[7%] h-[3px] bg-slate-800/80 z-0 hidden md:block rounded-full">
          {/* Active filled line progress */}
          <div 
            className="h-full bg-gradient-to-r from-teal-500 to-purple-600 transition-all duration-500 shadow-[0_0_10px_rgba(20,184,166,0.5)] relative rounded-full" 
            style={{ width: `${(activeStep / (steps.length - 1)) * 100}%` }}
          >
            {/* Active tip pulsing glow */}
            {activeStep > 0 && (
              <span className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-3 h-3 rounded-full bg-teal-300 border-2 border-slate-950 shadow-[0_0_8px_#2dd4bf]" />
            )}
          </div>

          {/* Continuous moving circle/particle along the line */}
          <div 
            className="absolute top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-teal-400 border border-slate-950 shadow-[0_0_8px_#2dd4bf] pointer-events-none"
            style={{
              animation: "travel-data 3.5s linear infinite"
            }}
          />
        </div>

        {/* Nodes layout grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-6 md:gap-2 relative z-10">
          {steps.map((step, idx) => {
            const isActive = idx === activeStep;
            const isCompleted = idx < activeStep;
            
            return (
              <button
                key={idx}
                onClick={() => handleStepClick(idx)}
                className="flex flex-col items-center text-center focus:outline-none group relative"
              >
                {/* Node Ring/Circle */}
                <div 
                  className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-300 relative ${
                    isActive 
                      ? "bg-slate-950 border-teal-400 text-teal-400 shadow-[0_0_20px_rgba(45,212,191,0.4)] scale-110" 
                      : isCompleted
                        ? "bg-slate-900 border-purple-500/80 text-purple-400 shadow-[0_0_10px_rgba(139,92,246,0.1)]"
                        : "bg-slate-900/60 border-slate-800 text-slate-500 hover:border-slate-700 hover:text-slate-300"
                  }`}
                >
                  {/* Subtle pulsing indicator ring for active node */}
                  {isActive && (
                    <span className="absolute -inset-1.5 rounded-full border border-teal-400/30 animate-ping pointer-events-none" />
                  )}
                  {step.icon}
                </div>

                {/* Node Title & Index badge */}
                <div className="mt-3 space-y-0.5 px-1">
                  <div className="flex items-center justify-center gap-1">
                    <span className={`text-[9px] font-bold font-mono px-1 rounded ${
                      isActive 
                        ? "bg-teal-500/20 text-teal-300" 
                        : "bg-slate-800/60 text-slate-500"
                    }`}>
                      0{idx + 1}
                    </span>
                    <span className={`text-xs font-bold transition-colors ${
                      isActive ? "text-teal-400" : "text-slate-400 group-hover:text-slate-200"
                    }`}>
                      {step.title}
                    </span>
                  </div>
                  <span className="text-[9px] text-slate-600 font-medium block truncate max-w-[100px] md:max-w-none">
                    {step.subtitle}
                  </span>
                </div>

                {/* Small indicator dot for connecting lines (mobile layout helper) */}
                {idx < steps.length - 1 && (
                  <div className="absolute top-[22px] -right-3 w-1.5 h-1.5 rounded-full bg-slate-800/80 md:hidden pointer-events-none" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── DETAIL DISPLAY WORKSPACE ── */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-stretch pt-4">
        
        {/* Left Column: Semantic Explanation (2/5 size) */}
        <div className="lg:col-span-2 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            
            {/* Header info */}
            <div className="space-y-1">
              <span className={`px-2.5 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider bg-gradient-to-r ${steps[activeStep].badgeColor} text-white`}>
                Lifecycle Step 0{activeStep + 1}
              </span>
              <h2 className="text-2xl font-bold text-slate-100 tracking-tight pt-1">
                {steps[activeStep].title}
              </h2>
              <span className="text-xs text-teal-400/80 font-semibold uppercase tracking-wider block">
                {steps[activeStep].subtitle}
              </span>
            </div>

            {/* Description */}
            <p className="text-slate-400 text-sm leading-relaxed">
              {steps[activeStep].description}
            </p>



          </div>

          {/* Autoplay Controls bar */}
          <div className="flex items-center gap-3 bg-slate-900/60 p-2.5 rounded-2xl border border-slate-800/80 max-w-max">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className={`p-2 rounded-xl transition-all duration-300 flex items-center justify-center ${
                isPlaying 
                  ? "bg-teal-500/10 text-teal-400 border border-teal-500/20 hover:bg-teal-500/20" 
                  : "bg-slate-800 text-slate-300 border border-slate-700/60 hover:bg-slate-700"
              }`}
              title={isPlaying ? "Pause Flow Autoplay" : "Resume Flow Autoplay"}
            >
              {isPlaying ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
            </button>
            
            <button
              onClick={() => {
                setActiveStep(0);
                setIsPlaying(false);
              }}
              className="p-2 rounded-xl bg-slate-800 text-slate-300 border border-slate-700/60 hover:bg-slate-700 transition-all flex items-center justify-center"
              title="Reset Flow to Introspect"
            >
              <RotateCcw className="h-3.5 w-3.5" />
            </button>

            <span className="text-[10px] text-slate-500 font-bold px-2 font-mono uppercase tracking-wider select-none">
              {isPlaying ? "Autoplay active" : "Flow paused"}
            </span>
          </div>

        </div>

        {/* Right Column: Simulated Live Console Log (3/5 size) */}
        <div className="lg:col-span-3 flex flex-col min-h-[300px]">
          
          {/* Glassmorphic Mock Console Frame */}
          <div className="flex-1 rounded-3xl border border-slate-800 bg-slate-950/80 shadow-2xl overflow-hidden flex flex-col relative">
            
            {/* Console Header Bar */}
            <div className="px-5 py-3 border-b border-slate-900 bg-slate-900/40 flex items-center justify-between select-none">
              <div className="flex items-center gap-2">
                <Terminal className="h-3.5 w-3.5 text-teal-400" />
                <span className="text-[10px] font-bold text-slate-400 font-mono tracking-wider uppercase">Orcha Runtime Console</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-800" />
                <span className="w-2.5 h-2.5 rounded-full bg-slate-800" />
                <span className="w-2.5 h-2.5 rounded-full bg-slate-800" />
              </div>
            </div>

            {/* Console Body Log output */}
            <div 
              key={activeStep} 
              className="flex-1 p-6 font-mono text-[11px] text-slate-300 space-y-3 overflow-y-auto bg-slate-950/90 animate-in fade-in duration-500"
            >
              {steps[activeStep].logLines.map((line, idx) => {
                let color = "text-slate-400";
                if (line.startsWith("READING") || line.startsWith("Payload")) color = "text-amber-400/90";
                if (line.includes("SUCCESS") || line.includes("complete") || line.includes("complete.")) color = "text-teal-400";
                if (line.includes("SUCCESSFUL") || line.includes("SUCCESS")) color = "text-teal-400 font-bold";
                if (line.startsWith("SELECT") || line.startsWith("Found matches:")) color = "text-purple-400";
                if (line.startsWith("Annotating") || line.startsWith("Mapping")) color = "text-blue-400";

                return (
                  <div key={idx} className="flex gap-3 leading-relaxed items-start">
                    <span className="text-slate-600 select-none text-right w-4">
                      {idx + 1}
                    </span>
                    <span className="text-teal-500/60 select-none">&gt;</span>
                    <span className={`flex-1 ${color}`}>{line}</span>
                  </div>
                );
              })}
            </div>

            {/* Console Footer Status message */}
            <div className="px-5 py-2.5 border-t border-slate-900/80 bg-slate-900/10 flex items-center justify-between text-[10px] font-bold text-slate-500 font-mono">
              <span>Status: OK</span>
              <span className="flex items-center gap-1.5 text-teal-400/80">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
                <span>Active Model Session</span>
              </span>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
