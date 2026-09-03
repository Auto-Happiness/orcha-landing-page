"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Table, FileSpreadsheet, Download, History, Check, Copy } from "lucide-react";
import DocsSidebar from "@/components/docnav/DocumentNavigation";
import navItems from "@/data/document-nav.json";
import quickLinks from "@/data/quicklinks/databook.json";
import QuickLinks from "@/components/quicklinks/QuickLinks";

export default function DatabookPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <div className="flex flex-col md:flex-row">
        <DocsSidebar items={navItems} />

        <div className="flex-1 px-6 py-10 pt-24 max-w-5xl">
          <div className="mb-12">
            <Badge variant="secondary" className="mb-4 bg-teal-500/10 text-teal-300 border-teal-500/20 font-mono text-xs">
              Exploration & Query Records
            </Badge>
            <h1 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">
              Databook & Query Catalog
            </h1>
            <p className="text-lg text-gray-300 max-w-3xl leading-relaxed">
              Curate verified SQL insights, inspect full multi-step agent reasoning transcripts, and explore query result datasets in a spreadsheet-grade tabular view.
            </p>
          </div>

          <div id="catalog" className="mb-14 scroll-mt-28">
            <h2 className="text-2xl font-bold mb-3 text-white">The Verified Query Catalog</h2>
            <p className="text-sm text-gray-300 leading-relaxed mb-4">
              When an agent generates a high-value query (e.g. &quot;Top 10 Customers by Retention Rate&quot;), users can pin the query into the organization&apos;s Databook.
              These saved queries serve as verified gold-standard references that feed back into Semantic Vector Memory.
            </p>
          </div>

          <div id="spreadsheet" className="mb-14 scroll-mt-28">
            <h2 className="text-2xl font-bold mb-3 text-white">Interactive Spreadsheet Explorer</h2>
            <p className="text-sm text-gray-300 leading-relaxed mb-4">
              The Databook view (<code>/databook</code>) provides high-performance data grids with:
            </p>
            <div className="grid sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-gray-900/60 border border-gray-800">
                <div className="font-bold text-sm text-teal-400 mb-1">Instant Column Filtering</div>
                <div className="text-xs text-gray-400">Filter numerical thresholds, regex text search, and date ranges without running new database queries.</div>
              </div>
              <div className="p-4 rounded-xl bg-gray-900/60 border border-gray-800">
                <div className="font-bold text-sm text-blue-400 mb-1">Pagination & Sorting</div>
                <div className="text-xs text-gray-400">Seamlessly navigate thousands of rows with client-side virtual scrolling.</div>
              </div>
              <div className="p-4 rounded-xl bg-gray-900/60 border border-gray-800">
                <div className="font-bold text-sm text-purple-400 mb-1">Schema Type Formatting</div>
                <div className="text-xs text-gray-400">Automatic currency, percentage, and ISO timestamp formatting based on MDL column metadata.</div>
              </div>
            </div>
          </div>

          <div id="transcripts" className="mb-14 scroll-mt-28">
            <h2 className="text-2xl font-bold mb-3 text-white">Reasoning Transcripts & Token Auditing</h2>
            <p className="text-sm text-gray-300 leading-relaxed mb-3">
              Each Databook item records the exact agent thought trajectory:
            </p>
            <div className="p-4 rounded-xl bg-gray-950 border border-gray-800 font-mono text-xs text-gray-300 space-y-1.5">
              <div className="text-teal-400 font-bold">● Step 1: User requested count of orders where CustomerID = &#39;BLAUS&#39;</div>
              <div className="text-blue-400 font-bold">● Step 2: Inferred quantitative aggregation (COUNT with WHERE filter)</div>
              <div className="text-purple-400 font-bold">● Step 3: Executed SQL: SELECT COUNT(*) AS NUMBEROFORDERS FROM Orders WHERE CustomerID = &#39;BLAUS&#39;</div>
              <div className="text-gray-500 pt-1 font-sans text-xs">Tokens Spent: 1,052 tokens | Execution Time: 42ms | Verified by Admin</div>
            </div>
          </div>

          <div id="exporting" className="mb-14 scroll-mt-28">
            <h2 className="text-2xl font-bold mb-3 text-white">Data Exporting</h2>
            <p className="text-sm text-gray-300 leading-relaxed">
              Export verified tables in one click to <strong>CSV</strong>, <strong>Excel (.xlsx)</strong>, or <strong>JSON</strong> via <code>/api/export</code> for downstream reporting in BI tools.
            </p>
          </div>

        </div>

        <QuickLinks links={quickLinks} />
      </div>
    </main>
  );
}
