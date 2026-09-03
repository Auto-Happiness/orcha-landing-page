"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import { Share2, GitFork, Check, Copy } from "lucide-react";
import DocsSidebar from "@/components/docnav/DocumentNavigation";
import navItems from "@/data/document-nav.json";
import quickLinks from "@/data/quicklinks/federated-queries.json";
import QuickLinks from "@/components/quicklinks/QuickLinks";

function CodeBlock({ code, lang = "sql" }: { code: string; lang?: string }) {
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

export default function FederatedQueriesPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <div className="flex flex-col md:flex-row">
        <DocsSidebar items={navItems} />

        <div className="flex-1 px-6 py-10 pt-24 max-w-5xl">
          <div className="mb-12">
            <Badge variant="secondary" className="mb-4 bg-blue-500/10 text-blue-300 border-blue-500/20 font-mono text-xs">
              Multi-Database Engine
            </Badge>
            <h1 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">
              Federated Multi-Database Execution
            </h1>
            <p className="text-lg text-gray-300 max-w-3xl leading-relaxed">
              Query, join, and aggregate metrics across completely separate physical databases—such as joining a PostgreSQL transactional store with a MySQL analytics warehouse—using the unified <code>OrchaFusion</code> execution engine.
            </p>
          </div>

          <div id="orchafusion" className="mb-14 scroll-mt-28">
            <h2 className="text-2xl font-bold mb-3 text-white">How OrchaFusion Works</h2>
            <p className="text-sm text-gray-300 leading-relaxed mb-4">
              In enterprise architectures, data is rarely siloed in one place. User accounts may live in PostgreSQL, order logs in MySQL, and historical inventory records in Microsoft SQL Server.
              OrchaFusion acts as a distributed federator, pulling data partitions concurrently and performing in-memory WASM merges.
            </p>
          </div>

          <div id="syntax" className="mb-14 scroll-mt-28">
            <h2 className="text-2xl font-bold mb-3 text-white">The alias.table Naming Syntax</h2>
            <p className="text-sm text-gray-300 leading-relaxed mb-2">
              Each connected database configuration is assigned an alias (e.g. <code>crm</code>, <code>billing</code>, <code>warehouse</code>).
              Agents address tables using standard dot notation:
            </p>
            <CodeBlock code={`SELECT 
  crm.users.name,
  crm.users.email,
  SUM(billing.invoices.amount) AS total_spent
FROM crm.users
JOIN billing.invoices 
  ON crm.users.customer_id = billing.invoices.user_id
WHERE billing.invoices.status = 'PAID'
GROUP BY crm.users.name, crm.users.email
ORDER BY total_spent DESC
LIMIT 10;`} />
          </div>

          <div id="cross-db" className="mb-14 scroll-mt-28">
            <h2 className="text-2xl font-bold mb-3 text-white">Cross-Database Joins & Federation</h2>
            <p className="text-sm text-gray-300 leading-relaxed mb-3">
              When executing cross-database joins, OrchaFusion optimizes query pushdown by executing the individual subqueries on their native dialect database first, then streaming the result sets into an in-memory Apache DataFusion table partition to finalize the join.
            </p>
          </div>

          <div id="bfs-pathing" className="mb-14 scroll-mt-28">
            <h2 className="text-2xl font-bold mb-3 text-white">Graph BFS Join Pathing Across Schemas</h2>
            <p className="text-sm text-gray-300 leading-relaxed mb-3">
              Relationships can span across database boundaries. If you link <code>crm.customers.id</code> to <code>billing.subscriptions.customer_id</code> in the Semantic Modeler, the BFS pathing engine automatically bridges the two engines when users query high-level terms.
            </p>
          </div>

          <div id="pushdown" className="mb-14 scroll-mt-28">
            <h2 className="text-2xl font-bold mb-3 text-white">Predicate Pushdown & Performance</h2>
            <p className="text-sm text-gray-300 leading-relaxed">
              <code>WHERE</code> clauses, aggregations, and limit expressions are pushed directly down to the source database engines to minimize network overhead and memory consumption.
            </p>
          </div>

        </div>

        <QuickLinks links={quickLinks} />
      </div>
    </main>
  );
}
