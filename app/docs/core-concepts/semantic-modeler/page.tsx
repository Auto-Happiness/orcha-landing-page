"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Database, GitFork, Calculator, FileCode, Check, Copy } from "lucide-react";
import DocsSidebar from "@/components/docnav/DocumentNavigation";
import navItems from "@/data/document-nav.json";
import quickLinks from "@/data/quicklinks/semantic-modeler.json";
import QuickLinks from "@/components/quicklinks/QuickLinks";

function CodeBlock({ code, lang = "json" }: { code: string; lang?: string }) {
  const [copied, setCopied] = React.useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative my-3 rounded-xl overflow-hidden border border-gray-800 bg-gray-950 font-mono text-xs">
      <div className="flex justify-between items-center px-4 py-2 bg-gray-900 border-b border-gray-800 text-gray-400">
        <span>{lang}</span>
        <button onClick={handleCopy} className="hover:text-white flex items-center gap-1.5 transition-colors">
          {copied ? <Check className="h-3.5 w-3.5 text-teal-400" /> : <Copy className="h-3.5 w-3.5" />}
          <span>{copied ? "Copied" : "Copy"}</span>
        </button>
      </div>
      <pre className="p-4 text-gray-200 overflow-x-auto leading-relaxed">{code}</pre>
    </div>
  );
}

export default function SemanticModelerPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <div className="flex flex-col md:flex-row">
        <DocsSidebar items={navItems} />

        <div className="flex-1 px-6 py-10 pt-24 max-w-5xl">
          <div className="mb-12">
            <Badge variant="secondary" className="mb-4 bg-purple-500/10 text-purple-300 border-purple-500/20 font-mono text-xs">
              Semantic Layer & Modeling
            </Badge>
            <h1 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">
              Semantic Modeler & Model Definition Language (MDL)
            </h1>
            <p className="text-lg text-gray-300 max-w-3xl leading-relaxed">
              Transform messy, cryptically named database tables into clean, curated business concepts with calculated measures, virtual dimensions, and explicit entity relationships.
            </p>
          </div>

          {/* MDL Concept */}
          <div id="mdl" className="mb-14 scroll-mt-28">
            <h2 className="text-2xl font-bold mb-3 text-white">What is Model Definition Language (MDL)?</h2>
            <p className="text-sm text-gray-300 leading-relaxed mb-4">
              MDL is a declarative, versionable JSON manifest that describes the semantic contract between your database and AI agents.
              It abstracts away physical table column names (e.g. <code>c_fst_nm</code> becomes <code>first_name</code>), declares joins, and defines mathematical equations for computed metrics.
            </p>
            <CodeBlock code={`{
  "models": [
    {
      "name": "Orders",
      "tableReference": { "schema": "public", "table": "raw_orders" },
      "columns": [
        { "name": "order_id", "type": "INTEGER", "isPk": true },
        { "name": "customer_id", "type": "INTEGER" },
        { "name": "total_amount", "type": "DOUBLE" },
        { "name": "tax_amount", "type": "DOUBLE" },
        {
          "name": "net_revenue",
          "type": "DOUBLE",
          "calculated": true,
          "expression": "total_amount - tax_amount"
        }
      ]
    }
  ],
  "relationships": [
    {
      "name": "OrdersToCustomers",
      "models": ["Orders", "Customers"],
      "joinType": "MANY_TO_ONE",
      "condition": "Orders.customer_id = Customers.id"
    }
  ]
}`} />
          </div>

          {/* Visual Schema Editor */}
          <div id="visual-editor" className="mb-14 scroll-mt-28">
            <h2 className="text-2xl font-bold mb-3 text-white">Visual React Flow Modeler</h2>
            <p className="text-sm text-gray-300 leading-relaxed mb-4">
              The built-in ModelerWizard (<code>/configure</code>) renders your database tables as interactive nodes on an infinite canvas. You can:
            </p>
            <div className="grid sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-gray-900/60 border border-gray-800">
                <div className="font-bold text-sm text-teal-400 mb-1">Drag-and-Drop Joins</div>
                <div className="text-xs text-gray-400">Connect primary keys to foreign keys visually with magnetic relation handles.</div>
              </div>
              <div className="p-4 rounded-xl bg-gray-900/60 border border-gray-800">
                <div className="font-bold text-sm text-purple-400 mb-1">Alias Customization</div>
                <div className="text-xs text-gray-400">Rename tables and columns into human-readable English for agent clarity.</div>
              </div>
              <div className="p-4 rounded-xl bg-gray-900/60 border border-gray-800">
                <div className="font-bold text-sm text-amber-400 mb-1">Schema Sync & Refresh</div>
                <div className="text-xs text-gray-400">Automatically discover new tables or altered column types from the live DB with one click.</div>
              </div>
            </div>
          </div>

          {/* Calculated Columns */}
          <div id="calculated-columns" className="mb-14 scroll-mt-28">
            <h2 className="text-2xl font-bold mb-3 text-white">Calculated Columns & Inlining</h2>
            <p className="text-sm text-gray-300 leading-relaxed mb-3">
              Instead of forcing LLMs to remember how to calculate complex business ratios (like Gross Margin, Customer Lifetime Value, or VAT Deductions), you declare them once in the model:
            </p>
            <div className="p-4 rounded-xl bg-gray-900/80 border border-gray-800 font-mono text-xs text-gray-300 space-y-1">
              <div><span className="text-teal-400 font-bold">Measure:</span> <code>gross_profit</code> = <code>(item_price * quantity) - item_cost</code></div>
              <div><span className="text-purple-400 font-bold">Query:</span> &quot;Show me total gross profit by category in 2024&quot;</div>
              <div><span className="text-amber-400 font-bold">WASM Inlining:</span> The engine automatically rewrites the formula directly into the SQL <code>SELECT SUM((item_price * quantity) - item_cost)</code> clause.</div>
            </div>
          </div>

          {/* Relationships */}
          <div id="relationships" className="mb-14 scroll-mt-28">
            <h2 className="text-2xl font-bold mb-3 text-white">Relationship Mapping & Cardinality</h2>
            <p className="text-sm text-gray-300 leading-relaxed mb-3">
              Define <code>ONE_TO_MANY</code>, <code>MANY_TO_ONE</code>, and <code>ONE_TO_ONE</code> relationships.
              The Graph BFS engine relies on these definitions to safely traverse multi-table joins without generating duplicate rows.
            </p>
          </div>

          {/* dbt Manifest Import */}
          <div id="dbt-import" className="mb-14 scroll-mt-28">
            <h2 className="text-2xl font-bold mb-3 text-white">Importing from dbt Projects</h2>
            <p className="text-sm text-gray-300 leading-relaxed mb-2">
              If your team already uses <code>dbt</code>, upload your compiled <code>manifest.json</code> to instantly populate models, column descriptions, and lineage relationships without manual entry:
            </p>
            <p className="text-xs text-gray-400">
              Orcha&apos;s parser (<code>lib/dbt-parser.ts</code>) extracts models, tests, sources, and column docs into native MDL format seamlessly.
            </p>
          </div>

        </div>

        <QuickLinks links={quickLinks} />
      </div>
    </main>
  );
}
