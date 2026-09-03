"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import { Database, Check, Copy } from "lucide-react";
import DocsSidebar from "@/components/docnav/DocumentNavigation";
import navItems from "@/data/document-nav.json";
import quickLinks from "@/data/quicklinks/test-connection.json";
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

export default function TestConnectionApiPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <div className="flex flex-col md:flex-row">
        <DocsSidebar items={navItems} />

        <div className="flex-1 px-6 py-10 pt-24 max-w-5xl">
          <div className="mb-12">
            <div className="flex items-center gap-2 mb-4">
              <Badge variant="outline" className="text-xs font-mono border-teal-500/40 text-teal-300">POST</Badge>
              <span className="font-mono text-xs text-gray-400">/api/test-connection</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">
              Connection Tester API
            </h1>
            <p className="text-lg text-gray-300 max-w-3xl leading-relaxed">
              Verify database credentials, test network reachability, calculate roundtrip connection latency, and receive intelligent port mismatch suggestions.
            </p>
          </div>

          <div id="request-schema" className="mb-14 scroll-mt-28">
            <h2 className="text-2xl font-bold mb-3 text-white">Request Body</h2>
            <CodeBlock code={`{
  "type": "postgres",
  "host": "postgres.internal.cloud",
  "port": 5432,
  "user": "db_user",
  "password": "my_password",
  "database": "production",
  "ssl": true
}`} />
          </div>

          <div id="dialects" className="mb-14 scroll-mt-28">
            <h2 className="text-2xl font-bold mb-3 text-white">Dialect Specifics</h2>
            <div className="space-y-3 text-xs text-gray-300">
              <div className="p-4 rounded-xl bg-gray-900/60 border border-gray-800">
                <span className="text-teal-400 font-bold font-mono">postgres / mysql / mssql / oracle:</span> Requires <code>host</code>, <code>user</code>, <code>database</code>, and optional <code>port</code> / <code>ssl</code>.
              </div>
              <div className="p-4 rounded-xl bg-gray-900/60 border border-gray-800">
                <span className="text-amber-400 font-bold font-mono">sqlite:</span> Requires <code>filePath</code> pointing to a valid accessible database file.
              </div>
            </div>
          </div>

          <div id="port-hints" className="mb-14 scroll-mt-28">
            <h2 className="text-2xl font-bold mb-3 text-white">Intelligent Port Mismatch Hints</h2>
            <p className="text-sm text-gray-300 leading-relaxed mb-3">
              If an engineer accidentally selects <code>mysql</code> as the provider but specifies port <code>5432</code>, the endpoint detects the mismatch and returns a corrective suggestion before attempting connection timeouts:
            </p>
            <div className="p-4 rounded-xl bg-gray-950 border border-amber-500/40 text-amber-300 font-mono text-xs">
              &quot;Port 5432 is the PostgreSQL default port. Did you mean to select the PostgreSQL provider?&quot;
            </div>
          </div>

          <div id="response" className="mb-14 scroll-mt-28">
            <h2 className="text-2xl font-bold mb-3 text-white">Success Response</h2>
            <CodeBlock code={`{
  "success": true,
  "message": "Connection successful! (Latency: 18ms)"
}`} />
          </div>

        </div>

        <QuickLinks links={quickLinks} />
      </div>
    </main>
  );
}
