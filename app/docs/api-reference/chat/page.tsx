"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Check, Copy } from "lucide-react";
import DocsSidebar from "@/components/docnav/DocumentNavigation";
import navItems from "@/data/document-nav.json";
import quickLinks from "@/data/quicklinks/chat.json";
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

export default function ChatApiPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <div className="flex flex-col md:flex-row">
        <DocsSidebar items={navItems} />

        <div className="flex-1 px-6 py-10 pt-24 max-w-5xl">
          <div className="mb-12">
            <div className="flex items-center gap-2 mb-4">
              <Badge variant="outline" className="text-xs font-mono border-teal-500/40 text-teal-300">POST</Badge>
              <span className="font-mono text-xs text-gray-400">/api/chat</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">
              Chat & Query API
            </h1>
            <p className="text-lg text-gray-300 max-w-3xl leading-relaxed">
              The primary endpoint for natural language queries against your connected databases.
              Synthesizes queries through the semantic layer, inlines formulas with Rust WASM, validates schema integrity, and executes against target databases.
            </p>
          </div>

          <div id="headers" className="mb-14 scroll-mt-28">
            <h2 className="text-2xl font-bold mb-3 text-white">Headers & Authentication</h2>
            <div className="p-4 rounded-xl bg-gray-950 border border-gray-800 font-mono text-xs text-gray-300 space-y-2">
              <div><code>Authorization: Bearer &lt;YOUR_API_KEY&gt;</code> <span className="text-gray-500">// Or use x-api-key header</span></div>
              <div><code>Content-Type: application/json</code></div>
              <div><code>Origin: https://your-allowed-domain.com</code> <span className="text-gray-500">// If CORS restrictions apply</span></div>
            </div>
          </div>

          <div id="request-body" className="mb-14 scroll-mt-28">
            <h2 className="text-2xl font-bold mb-3 text-white">Request Body</h2>
            <CodeBlock code={`{
  "messages": [
    {
      "role": "user",
      "content": "Give me the top 3 most expensive products in stock"
    }
  ],
  "configIds": ["db_config_northwind_01"],
  "modelId": "claude-haiku-4.5",
  "showResults": true
}`} />
            <div className="mt-4 space-y-2 text-xs text-gray-300">
              <div>• <code>messages</code> (Array, required): Chat conversation history with standard role/content objects.</div>
              <div>• <code>configIds</code> (Array of strings, optional): Scopes the query to specific connected database IDs. Defaults to the key&apos;s mapped databases.</div>
              <div>• <code>modelId</code> (String, optional): Specific model alias (e.g. <code>claude-haiku-4.5</code>, <code>gpt-4o-mini</code>).</div>
              <div>• <code>showResults</code> (Boolean, optional): Whether to execute and include tabular dataset rows (default: <code>true</code>).</div>
            </div>
          </div>

          <div id="synchronous" className="mb-14 scroll-mt-28">
            <h2 className="text-2xl font-bold mb-3 text-white">Response Format (Synchronous)</h2>
            <CodeBlock code={`{
  "text": "Here are the top 3 most expensive products currently in stock:",
  "reasoning": [
    "Identified user query: list products sorted by price descending with limit 3",
    "Pruned schema to table 'Products' with columns [ProductName, UnitPrice, UnitsInStock]",
    "Generated MDL query and transpiled via DataFusion WASM engine",
    "Dry-plan static validation passed with zero errors"
  ],
  "sql": "SELECT ProductName, UnitPrice, UnitsInStock FROM Products ORDER BY UnitPrice DESC LIMIT 3;",
  "tokensSpent": 1052,
  "executionTimeMs": 38,
  "resultSet": {
    "columns": ["ProductName", "UnitPrice", "UnitsInStock"],
    "rows": [
      { "ProductName": "Côte de Blaye", "UnitPrice": 263.5, "UnitsInStock": 17 },
      { "ProductName": "Thüringer Rostbratwurst", "UnitPrice": 123.79, "UnitsInStock": 0 },
      { "ProductName": "Mishi Kobe Niku", "UnitPrice": 97.0, "UnitsInStock": 29 }
    ]
  }
}`} />
          </div>

          <div id="streaming" className="mb-14 scroll-mt-28">
            <h2 className="text-2xl font-bold mb-3 text-white">Streaming Responses</h2>
            <p className="text-sm text-gray-300 leading-relaxed mb-2">
              For interactive web applications using the Vercel AI SDK (<code>useChat</code>), <code>/api/chat</code> supports Server-Sent Events (SSE) streaming reasoning steps and tokens in real time.
            </p>
          </div>

          <div id="errors" className="mb-14 scroll-mt-28">
            <h2 className="text-2xl font-bold mb-3 text-white">HTTP Error Status Codes</h2>
            <div className="space-y-2 text-xs font-mono text-gray-300">
              <div className="p-3 rounded-lg bg-gray-950 border border-gray-800 flex justify-between">
                <span className="text-amber-400 font-bold">401 Unauthorized</span>
                <span className="text-gray-400">Missing or invalid API key / Clerk session token</span>
              </div>
              <div className="p-3 rounded-lg bg-gray-950 border border-gray-800 flex justify-between">
                <span className="text-rose-400 font-bold">403 Forbidden</span>
                <span className="text-gray-400">Request Origin domain not allowed for this API key</span>
              </div>
              <div className="p-3 rounded-lg bg-gray-950 border border-gray-800 flex justify-between">
                <span className="text-blue-400 font-bold">429 Too Many Requests</span>
                <span className="text-gray-400">Organization or API key request rate limit exceeded</span>
              </div>
              <div className="p-3 rounded-lg bg-gray-950 border border-gray-800 flex justify-between">
                <span className="text-purple-400 font-bold">500 Internal Error</span>
                <span className="text-gray-400">Database connection failure or unparseable query</span>
              </div>
            </div>
          </div>

        </div>

        <QuickLinks links={quickLinks} />
      </div>
    </main>
  );
}
