"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import { Download, Check, Copy } from "lucide-react";
import DocsSidebar from "@/components/docnav/DocumentNavigation";
import navItems from "@/data/document-nav.json";
import quickLinks from "@/data/quicklinks/export.json";
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

export default function ExportApiPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <div className="flex flex-col md:flex-row">
        <DocsSidebar items={navItems} />

        <div className="flex-1 px-6 py-10 pt-24 max-w-5xl">
          <div className="mb-12">
            <div className="flex items-center gap-2 mb-4">
              <Badge variant="outline" className="text-xs font-mono border-teal-500/40 text-teal-300">POST</Badge>
              <span className="font-mono text-xs text-gray-400">/api/export</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">
              Export Results API
            </h1>
            <p className="text-lg text-gray-300 max-w-3xl leading-relaxed">
              Export query result rows into downloadable CSV, Excel spreadsheet (.xlsx), or JSON files with custom file headers.
            </p>
          </div>

          <div id="formats" className="mb-14 scroll-mt-28">
            <h2 className="text-2xl font-bold mb-3 text-white">Supported Export Formats</h2>
            <div className="grid sm:grid-cols-3 gap-4">
              <div id="csv" className="p-4 rounded-xl bg-gray-900/60 border border-gray-800 scroll-mt-28">
                <div className="font-bold text-teal-400 text-sm mb-1">CSV (Comma-Separated)</div>
                <div className="text-xs text-gray-400">MIME: <code>text/csv</code> with automated RFC 4180 quote escaping.</div>
              </div>
              <div id="excel" className="p-4 rounded-xl bg-gray-900/60 border border-gray-800 scroll-mt-28">
                <div className="font-bold text-emerald-400 text-sm mb-1">Excel Spreadsheet</div>
                <div className="text-xs text-gray-400">MIME: <code>application/vnd.openxmlformats-officedocument.spreadsheetml.sheet</code></div>
              </div>
              <div id="json" className="p-4 rounded-xl bg-gray-900/60 border border-gray-800 scroll-mt-28">
                <div className="font-bold text-blue-400 text-sm mb-1">JSON Buffer</div>
                <div className="text-xs text-gray-400">MIME: <code>application/json</code> formatted array of objects.</div>
              </div>
            </div>
          </div>

          <div className="mb-14">
            <h2 className="text-2xl font-bold mb-3 text-white">Sample Request</h2>
            <CodeBlock code={`{
  "format": "csv",
  "filename": "quarterly_revenue_report",
  "columns": ["CustomerName", "TotalOrders", "GrossRevenue"],
  "rows": [
    { "CustomerName": "Acme Corp", "TotalOrders": 142, "GrossRevenue": 58400.00 },
    { "CustomerName": "Global Logistics", "TotalOrders": 89, "GrossRevenue": 32150.50 }
  ]
}`} />
          </div>

        </div>

        <QuickLinks links={quickLinks} />
      </div>
    </main>
  );
}
