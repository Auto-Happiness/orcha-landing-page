"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Database,
  Lock,
  Server,
  CheckCircle2,
  AlertCircle,
  Copy,
  Check
} from "lucide-react";
import DocsSidebar from "@/components/docnav/DocumentNavigation";
import navItems from "@/data/document-nav.json";
import quickLinks from "@/data/quicklinks/database-setup.json";
import QuickLinks from "@/components/quicklinks/QuickLinks";
import Link from "next/link";

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

export default function DatabaseSetupPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <div className="flex flex-col md:flex-row">
        <DocsSidebar items={navItems} />

        <div className="flex-1 px-6 py-10 pt-24 max-w-5xl">
          <div className="mb-12">
            <Badge variant="secondary" className="mb-4 bg-teal-500/10 text-teal-300 border-teal-500/20 font-mono text-xs">
              Connectors & Dialects
            </Badge>
            <h1 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">
              Database Setup & Dialects
            </h1>
            <p className="text-lg text-gray-300 max-w-3xl leading-relaxed mb-4">
              Orcha Agent OS supports connecting to PostgreSQL, MySQL, MariaDB, Microsoft SQL Server, Oracle, and SQLite database systems with automated schema discovery and credential encryption.
            </p>
            <div className="p-4 rounded-xl bg-gradient-to-r from-teal-500/10 via-purple-500/10 to-transparent border border-teal-500/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="text-xs text-teal-300">
                👉 Looking for the visual step-by-step UI walkthrough from connection setup to live chatting?
              </div>
              <Link href="/docs/getting-started/onboarding-guide" className="shrink-0 text-xs font-bold text-white px-3 py-1.5 rounded-lg bg-teal-600 hover:bg-teal-500 transition-colors">
                View Visual Guide →
              </Link>
            </div>
          </div>

          {/* Supported Dialects */}
          <div id="supported-dialects" className="mb-14 scroll-mt-28">
            <h2 className="text-2xl font-bold mb-4 text-white">Supported Database Adapters</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="p-5 rounded-xl bg-gray-900/60 border border-gray-800">
                <div className="flex items-center gap-2 text-teal-400 font-bold mb-2">
                  <Database className="h-4 w-4" /> PostgreSQL
                </div>
                <p className="text-xs text-gray-400 leading-relaxed">Default port <code>5432</code>. Native SSL, partition statistics inspection, and schema namespace discovery.</p>
              </div>
              <div className="p-5 rounded-xl bg-gray-900/60 border border-gray-800">
                <div className="flex items-center gap-2 text-blue-400 font-bold mb-2">
                  <Database className="h-4 w-4" /> MySQL & MariaDB
                </div>
                <p className="text-xs text-gray-400 leading-relaxed">Default port <code>3306</code>. Multi-host TCP fallback and <code>INFORMATION_SCHEMA</code> column metadata discovery.</p>
              </div>
              <div className="p-5 rounded-xl bg-gray-900/60 border border-gray-800">
                <div className="flex items-center gap-2 text-purple-400 font-bold mb-2">
                  <Database className="h-4 w-4" /> Microsoft SQL Server
                </div>
                <p className="text-xs text-gray-400 leading-relaxed">Default port <code>1433</code>. Enterprise TDS protocol, <code>sys.tables</code> indexing inspection, and TOP/OFFSET transpilation.</p>
              </div>
              <div className="p-5 rounded-xl bg-gray-900/60 border border-gray-800">
                <div className="flex items-center gap-2 text-rose-400 font-bold mb-2">
                  <Database className="h-4 w-4" /> Oracle Database
                </div>
                <p className="text-xs text-gray-400 leading-relaxed">Default port <code>1521</code>. Enterprise relational schema and dialect unparsing rules.</p>
              </div>
              <div className="p-5 rounded-xl bg-gray-900/60 border border-gray-800">
                <div className="flex items-center gap-2 text-amber-400 font-bold mb-2">
                  <Database className="h-4 w-4" /> SQLite
                </div>
                <p className="text-xs text-gray-400 leading-relaxed">Local file path resolution. In-memory execution and zero-network overhead for local testing.</p>
              </div>
            </div>
          </div>

          {/* PostgreSQL Setup */}
          <div id="postgresql" className="mb-14 scroll-mt-28">
            <h2 className="text-2xl font-bold mb-3 text-white">PostgreSQL Configuration</h2>
            <p className="text-sm text-gray-300 mb-2 leading-relaxed">
              When adding a PostgreSQL database via the UI (<code>/configure</code>) or via <code>/api/test-connection</code>:
            </p>
            <CodeBlock code={`{
  "type": "postgres",
  "host": "db.example.com",
  "port": 5432,
  "user": "postgres",
  "password": "your_secure_password",
  "database": "production_warehouse",
  "ssl": true
}`} />
          </div>

          {/* MySQL & MariaDB */}
          <div id="mysql" className="mb-14 scroll-mt-28">
            <h2 className="text-2xl font-bold mb-3 text-white">MySQL & MariaDB Configuration</h2>
            <CodeBlock code={`{
  "type": "mysql",
  "host": "mysql.internal.network",
  "port": 3306,
  "user": "app_reader",
  "password": "your_secure_password",
  "database": "ecommerce",
  "ssl": false
}`} />
          </div>

          {/* MSSQL & Oracle */}
          <div id="mssql-oracle" className="mb-14 scroll-mt-28">
            <h2 className="text-2xl font-bold mb-3 text-white">MSSQL Server Configuration</h2>
            <CodeBlock code={`{
  "type": "mssql",
  "host": "sqlserver.corp.local",
  "port": 1433,
  "user": "sa_readonly",
  "password": "your_secure_password",
  "database": "Northwind",
  "ssl": true
}`} />
          </div>

          {/* SQLite Setup */}
          <div id="sqlite" className="mb-14 scroll-mt-28">
            <h2 className="text-2xl font-bold mb-3 text-white">SQLite Configuration</h2>
            <p className="text-sm text-gray-300 mb-2 leading-relaxed">
              SQLite connects directly to a file on your local filesystem without requiring host, port, or user credentials:
            </p>
            <CodeBlock code={`{
  "type": "sqlite",
  "filePath": "/absolute/path/to/database.sqlite"
}`} />
          </div>

          {/* Credential Encryption */}
          <div id="encryption" className="mb-14 scroll-mt-28">
            <h2 className="text-2xl font-bold mb-4 text-white">Zero-Knowledge Credential Encryption</h2>
            <div className="p-6 rounded-2xl bg-gray-900/70 border border-gray-800 space-y-3">
              <div className="flex items-center gap-2 text-teal-400 font-bold text-sm">
                <Lock className="h-4 w-4" /> AES-256 GCM Envelope Encryption
              </div>
              <p className="text-sm text-gray-300 leading-relaxed">
                Database passwords and connection strings are encrypted client-side or at the API boundary before being stored in Convex.
                The <code>ENCRYPTION_KEY</code> environment variable is only accessible by the secure server execution runtime.
              </p>
              <p className="text-xs text-gray-400 leading-relaxed">
                At query time, the connection manager resolves and decrypts credentials just-in-time inside memory, opens an ephemeral connection pool, executes the query, and cleans up buffers.
              </p>
            </div>
          </div>

        </div>

        <QuickLinks links={quickLinks} />
      </div>
    </main>
  );
}
