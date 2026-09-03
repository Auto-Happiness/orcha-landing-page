"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import { Boxes, Check, Copy } from "lucide-react";
import DocsSidebar from "@/components/docnav/DocumentNavigation";
import navItems from "@/data/document-nav.json";
import quickLinks from "@/data/quicklinks/mcp-api.json";
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

export default function McpApiPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <div className="flex flex-col md:flex-row">
        <DocsSidebar items={navItems} />

        <div className="flex-1 px-6 py-10 pt-24 max-w-5xl">
          <div className="mb-12">
            <div className="flex items-center gap-2 mb-4">
              <Badge variant="outline" className="text-xs font-mono border-teal-500/40 text-teal-300">POST</Badge>
              <span className="font-mono text-xs text-gray-400">/api/mcp</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">
              Model Context Protocol (MCP) API
            </h1>
            <p className="text-lg text-gray-300 max-w-3xl leading-relaxed">
              Standardized JSON-RPC 2.0 endpoint implementing the Model Context Protocol specification for tool discovery and execution.
            </p>
          </div>

          <div id="spec" className="mb-14 scroll-mt-28">
            <h2 className="text-2xl font-bold mb-3 text-white">JSON-RPC 2.0 Specification</h2>
            <p className="text-sm text-gray-300 leading-relaxed mb-4">
              All requests to <code>/api/mcp</code> must provide a JSON-RPC 2.0 envelope containing <code>jsonrpc: &quot;2.0&quot;</code>, a unique request <code>id</code>, and a <code>method</code> string.
            </p>
          </div>

          <div id="list-tools" className="mb-14 scroll-mt-28">
            <h2 className="text-2xl font-bold mb-3 text-white">Method: listTools</h2>
            <p className="text-sm text-gray-300 mb-2">Request payload:</p>
            <CodeBlock code={`{
  "jsonrpc": "2.0",
  "id": "req-001",
  "method": "listTools"
}`} />
            <p className="text-sm text-gray-300 my-2">Response:</p>
            <CodeBlock code={`{
  "jsonrpc": "2.0",
  "id": "req-001",
  "result": {
    "tools": [
      {
        "name": "query_database",
        "description": "Execute governed SQL queries against the Northwind database schema.",
        "inputSchema": {
          "type": "object",
          "properties": {
            "sql": {
              "type": "string",
              "description": "The ANSI SQL query to execute."
            }
          },
          "required": ["sql"]
        }
      }
    ]
  }
}`} />
          </div>

          <div id="call-tool" className="mb-14 scroll-mt-28">
            <h2 className="text-2xl font-bold mb-3 text-white">Method: callTool</h2>
            <p className="text-sm text-gray-300 mb-2">Request payload:</p>
            <CodeBlock code={`{
  "jsonrpc": "2.0",
  "id": "req-002",
  "method": "callTool",
  "params": {
    "name": "query_database",
    "arguments": {
      "sql": "SELECT COUNT(*) AS total_customers FROM Customers;"
    }
  }
}`} />
            <p className="text-sm text-gray-300 my-2">Response:</p>
            <CodeBlock code={`{
  "jsonrpc": "2.0",
  "id": "req-002",
  "result": {
    "content": [
      {
        "type": "text",
        "text": "[\\n  {\\n    \\"total_customers\\": 91\\n  }\\n]"
      }
    ]
  }
}`} />
          </div>

          <div id="error-codes" className="mb-14 scroll-mt-28">
            <h2 className="text-2xl font-bold mb-3 text-white">JSON-RPC Error Codes</h2>
            <div className="space-y-2 text-xs font-mono text-gray-300">
              <div className="p-3 rounded-lg bg-gray-950 border border-gray-800 flex justify-between">
                <span className="text-amber-400 font-bold">-32601 Method not found</span>
                <span className="text-gray-400">Method other than listTools or callTool called</span>
              </div>
              <div className="p-3 rounded-lg bg-gray-950 border border-gray-800 flex justify-between">
                <span className="text-rose-400 font-bold">-32603 Internal error</span>
                <span className="text-gray-400">Database offline or credentials not configured</span>
              </div>
            </div>
          </div>

        </div>

        <QuickLinks links={quickLinks} />
      </div>
    </main>
  );
}
