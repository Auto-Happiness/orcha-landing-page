"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Key,
  Globe,
  Shield,
  MessageSquare,
  Boxes,
  Database,
  Download,
  Activity,
  ArrowRight,
  Code2,
  Check,
  Copy
} from "lucide-react";
import DocsSidebar from "@/components/docnav/DocumentNavigation";
import navItems from "@/data/document-nav.json";
import quickLinks from "@/data/quicklinks/api-reference.json";
import QuickLinks from "@/components/quicklinks/QuickLinks";
import Link from "next/link";

const apiEndpoints = [
  {
    icon: MessageSquare,
    title: "Chat & Query API",
    href: "/docs/api-reference/chat",
    method: "POST",
    path: "/api/chat",
    description: "Execute natural language queries, stream agent reasoning steps, and retrieve structured table results across connected databases.",
    color: "from-teal-500 to-emerald-600",
  },
  {
    icon: Boxes,
    title: "MCP Protocol Endpoint",
    href: "/docs/api-reference/mcp",
    method: "POST",
    path: "/api/mcp",
    description: "JSON-RPC 2.0 interface implementing Model Context Protocol methods (listTools, callTool) for Claude Desktop, Cursor, and Windsurf.",
    color: "from-blue-500 to-cyan-600",
  },
  {
    icon: Database,
    title: "Connection Tester API",
    href: "/docs/api-reference/test-connection",
    method: "POST",
    path: "/api/test-connection",
    description: "Validate database credentials, measure TCP roundtrip latency, and verify permissions for PostgreSQL, MySQL, SQLite, MSSQL, and Oracle.",
    color: "from-purple-500 to-indigo-600",
  },
  {
    icon: Download,
    title: "Export Results API",
    href: "/docs/api-reference/export",
    method: "POST",
    path: "/api/export",
    description: "Export query results to structured file formats including CSV, Excel (.xlsx), and JSON buffers.",
    color: "from-amber-500 to-orange-600",
  },
  {
    icon: Activity,
    title: "Prometheus Metrics API",
    href: "/docs/api-reference/metrics",
    method: "GET",
    path: "/api/metrics",
    description: "Prometheus exposition endpoint serving request rate counters, latency histograms, and memory metrics for scraping.",
    color: "from-emerald-500 to-teal-600",
  },
];

function CodeBlock({ code, lang = "bash" }: { code: string; lang?: string }) {
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

export default function ApiReferencePage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <div className="flex flex-col md:flex-row">
        <DocsSidebar items={navItems} />

        <div className="flex-1 px-6 py-10 pt-24 max-w-5xl">
          <div className="mb-12">
            <Badge variant="secondary" className="mb-4 bg-teal-500/10 text-teal-300 border-teal-500/20 font-mono text-xs">
              Developer Portal & REST APIs
            </Badge>
            <h1 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">
              API Overview & Authentication
            </h1>
            <p className="text-lg text-gray-300 max-w-3xl leading-relaxed">
              Orcha Agent OS exposes production REST and JSON-RPC APIs for programmatic query execution, tool discovery, and telemetry.
            </p>
          </div>

          {/* Developer Portal */}
          <div id="developer-portal" className="mb-14 scroll-mt-28">
            <h2 className="text-2xl font-bold mb-3 text-white">Developer Portal</h2>
            <p className="text-sm text-gray-300 leading-relaxed mb-4">
              Manage your organization&apos;s API keys in the Developer Portal (<code>/developers</code>).
              Administrators can issue keys with granular database access scopes, custom rate limits, and CORS origin whitelisting.
            </p>
          </div>

          {/* Authentication */}
          <div id="authentication" className="mb-14 scroll-mt-28">
            <h2 className="text-2xl font-bold mb-3 text-white">Authentication Methods</h2>
            <p className="text-sm text-gray-300 leading-relaxed mb-3">
              Requests can authenticate using either an <code>Authorization: Bearer</code> header or a custom <code>x-api-key</code> header:
            </p>
            <CodeBlock code={`# Using Bearer Authorization Header
curl -X POST http://localhost:3000/api/chat \\
  -H "Authorization: Bearer orcha_live_sk_9f82b7c4..." \\
  -H "Content-Type: application/json" \\
  -d '{"messages": [{"role": "user", "content": "How many orders in 2024?"}]}'

# Or using x-api-key Header
curl -X POST http://localhost:3000/api/chat \\
  -H "x-api-key: orcha_live_sk_9f82b7c4..." \\
  -H "Content-Type: application/json" \\
  -d '{"messages": [{"role": "user", "content": "How many orders in 2024?"}]}'`} />
          </div>

          {/* Scoping & CORS */}
          <div id="scoping" className="mb-14 scroll-mt-28">
            <h2 className="text-2xl font-bold mb-3 text-white">Multi-Database Scoping & Security</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div id="cors" className="p-5 rounded-xl bg-gray-900/60 border border-gray-800 scroll-mt-28">
                <div className="flex items-center gap-2 text-teal-400 font-bold mb-2">
                  <Globe className="h-4 w-4" /> CORS Origin Enforcement
                </div>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Keys can be restricted to specific frontend domains (e.g. <code>https://analytics.mycompany.com</code>). Requests originating from unlisted domains will be rejected with HTTP 403 Forbidden.
                </p>
              </div>

              <div id="rate-limiting" className="p-5 rounded-xl bg-gray-900/60 border border-gray-800 scroll-mt-28">
                <div className="flex items-center gap-2 text-purple-400 font-bold mb-2">
                  <Shield className="h-4 w-4" /> Token Bucket Rate Limiting
                </div>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Each API key is assigned an hourly or per-minute request quota (default: 60 RPM). Exceeding the rate limit returns HTTP 429 Too Many Requests with retry-after headers.
                </p>
              </div>
            </div>
          </div>

          {/* Endpoints Index */}
          <div id="endpoints" className="mb-14 scroll-mt-28">
            <h2 className="text-2xl font-bold mb-6 text-white">API Endpoints Index</h2>
            <div className="space-y-4">
              {apiEndpoints.map((ep) => {
                const Icon = ep.icon;
                return (
                  <Link key={ep.path} href={ep.href} className="block group">
                    <Card className="bg-gray-900/50 border-gray-800 hover:border-teal-500/50 transition-all duration-200">
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className={`p-2 rounded-lg bg-gradient-to-br ${ep.color} text-white`}>
                              <Icon className="h-4 w-4" />
                            </div>
                            <div>
                              <CardTitle className="text-base text-white font-bold group-hover:text-teal-300 transition-colors">
                                {ep.title}
                              </CardTitle>
                              <div className="flex items-center gap-2 mt-1">
                                <Badge variant="outline" className="text-[10px] font-mono border-teal-500/40 text-teal-300">
                                  {ep.method}
                                </Badge>
                                <span className="font-mono text-xs text-gray-400">{ep.path}</span>
                              </div>
                            </div>
                          </div>
                          <ArrowRight className="h-4 w-4 text-gray-500 group-hover:text-teal-400 group-hover:translate-x-1 transition-all" />
                        </div>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className="text-gray-400 text-xs leading-relaxed">
                          {ep.description}
                        </CardDescription>
                      </CardContent>
                    </Card>
                  </Link>
                );
              })}
            </div>
          </div>

        </div>

        <QuickLinks links={quickLinks} />
      </div>
    </main>
  );
}
