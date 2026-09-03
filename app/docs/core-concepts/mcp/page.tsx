"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import { Boxes, Terminal, Shield, Check, Copy } from "lucide-react";
import DocsSidebar from "@/components/docnav/DocumentNavigation";
import navItems from "@/data/document-nav.json";
import quickLinks from "@/data/quicklinks/mcp.json";
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

export default function MCPPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <div className="flex flex-col md:flex-row">
        <DocsSidebar items={navItems} />

        <div className="flex-1 px-6 py-10 pt-24 max-w-5xl">
          <div className="mb-12">
            <Badge variant="secondary" className="mb-4 bg-teal-500/10 text-teal-300 border-teal-500/20 font-mono text-xs">
              Model Context Protocol
            </Badge>
            <h1 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">
              Model Context Protocol (MCP) Integration
            </h1>
            <p className="text-lg text-gray-300 max-w-3xl leading-relaxed">
              Orcha Agent OS is natively equipped with an MCP server interface (<code>/api/mcp</code>).
              Connect Claude Desktop, Cursor, Windsurf, or any MCP-compatible client directly to your database semantic layer.
            </p>
          </div>

          <div id="architecture" className="mb-14 scroll-mt-28">
            <h2 className="text-2xl font-bold mb-3 text-white">MCP Native Architecture</h2>
            <p className="text-sm text-gray-300 leading-relaxed mb-4">
              Rather than maintaining custom agent connectors, Orcha implements the open <a href="https://modelcontextprotocol.io" target="_blank" rel="noreferrer" className="text-teal-400 underline">Model Context Protocol</a> specification.
              External AI tools can list available database query tools, inspect dynamic input schemas, and execute pre-validated SQL queries with just-in-time credential resolution.
            </p>
          </div>

          <div id="claude-desktop" className="mb-14 scroll-mt-28">
            <h2 className="text-2xl font-bold mb-3 text-white">Connecting Claude Desktop</h2>
            <p className="text-sm text-gray-300 leading-relaxed mb-2">
              Add Orcha to your <code>claude_desktop_config.json</code> file:
            </p>
            <CodeBlock code={`{
  "mcpServers": {
    "orcha-agent-os": {
      "command": "npx",
      "args": [
        "-y",
        "mcp-remote",
        "http://localhost:3000/api/mcp",
        "--header",
        "Authorization: Bearer YOUR_ORCHA_API_KEY"
      ]
    }
  }
}`} />
          </div>

          <div id="cursor-windsurf" className="mb-14 scroll-mt-28">
            <h2 className="text-2xl font-bold mb-3 text-white">Connecting Cursor & Windsurf</h2>
            <p className="text-sm text-gray-300 leading-relaxed mb-2">
              Configure your workspace <code>.cursor/mcp.json</code> or Windsurf configuration settings:
            </p>
            <CodeBlock code={`{
  "mcpServers": {
    "orcha-database": {
      "url": "http://localhost:3000/api/mcp",
      "headers": {
        "Authorization": "Bearer YOUR_ORCHA_API_KEY"
      }
    }
  }
}`} />
          </div>

          <div id="schemas" className="mb-14 scroll-mt-28">
            <h2 className="text-2xl font-bold mb-3 text-white">Dynamic Tool Schemas</h2>
            <p className="text-sm text-gray-300 leading-relaxed mb-3">
              When an MCP client issues <code>listTools</code>, Orcha inspects the organization&apos;s active database configurations and generates tailored JSON Schema tools for:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-xs text-gray-300">
              <li><code>query_database</code> - Executes governed SQL across mapped databases.</li>
              <li><code>get_table_schema</code> - Returns curated column definitions and business descriptions.</li>
              <li><code>list_databook_queries</code> - Retrieves verified golden queries from the organization catalog.</li>
            </ul>
          </div>

          <div id="security" className="mb-14 scroll-mt-28">
            <h2 className="text-2xl font-bold mb-3 text-white">Security & Permission Scoping</h2>
            <p className="text-sm text-gray-300 leading-relaxed">
              Every MCP request is authenticated against an organization API key. Keys can be scoped to specific databases, rate-limited, and restricted to read-only queries with dry-plan validation.
            </p>
          </div>

        </div>

        <QuickLinks links={quickLinks} />
      </div>
    </main>
  );
}
