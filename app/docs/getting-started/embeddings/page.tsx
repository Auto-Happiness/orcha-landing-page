"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import { Boxes, Terminal, Check, Copy } from "lucide-react";
import DocsSidebar from "@/components/docnav/DocumentNavigation";
import navItems from "@/data/document-nav.json";
import quickLinks from "@/data/quicklinks/embeddings.json";
import QuickLinks from "@/components/quicklinks/QuickLinks";

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

export default function EmbeddingsPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <div className="flex flex-col md:flex-row">
        <DocsSidebar items={navItems} />

        <div className="flex-1 px-6 py-10 pt-24 max-w-5xl">
          <div className="mb-12">
            <Badge variant="secondary" className="mb-4 bg-teal-500/10 text-teal-300 border-teal-500/20 font-mono text-xs">
              Local RAG Acceleration
            </Badge>
            <h1 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">
              Local Embedding Transformer
            </h1>
            <p className="text-lg text-gray-300 max-w-3xl leading-relaxed">
              Orcha Agent OS includes an optional self-hosted Python FastAPI Sentence Transformer microservice (<code>orcha-embedding-transformer</code>) to generate dense schema vector embeddings locally with zero cloud API costs.
            </p>
          </div>

          <div id="overview" className="mb-14 scroll-mt-28">
            <h2 className="text-2xl font-bold mb-3 text-white">Overview</h2>
            <p className="text-sm text-gray-300 leading-relaxed">
              Large enterprise databases often contain thousands of columns and tables. To prune schemas and recall past natural-language-to-SQL pairs efficiently, Orcha embeds schema descriptions using the lightweight <code>all-MiniLM-L6-v2</code> transformer model.
            </p>
          </div>

          <div id="why-local" className="mb-14 scroll-mt-28">
            <h2 className="text-2xl font-bold mb-3 text-white">Why Local Embeddings?</h2>
            <div className="grid sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-gray-900/60 border border-gray-800">
                <div className="text-sm font-bold text-teal-400 mb-1">Zero External Cost</div>
                <div className="text-xs text-gray-400">Generate millions of tokens of schema embeddings without paying per-token API fees.</div>
              </div>
              <div className="p-4 rounded-xl bg-gray-900/60 border border-gray-800">
                <div className="text-sm font-bold text-blue-400 mb-1">Air-Gapped Privacy</div>
                <div className="text-xs text-gray-400">Database table names, column descriptions, and business glossary data never leave your network.</div>
              </div>
              <div className="p-4 rounded-xl bg-gray-900/60 border border-gray-800">
                <div className="text-sm font-bold text-purple-400 mb-1">Sub-10ms Inference</div>
                <div className="text-xs text-gray-400">Local CPU/GPU inference provides immediate response times for real-time schema vector search.</div>
              </div>
            </div>
          </div>

          <div id="docker-setup" className="mb-14 scroll-mt-28">
            <h2 className="text-2xl font-bold mb-3 text-white">Docker Setup</h2>
            <p className="text-sm text-gray-300 mb-2">Start the local embedding container (mapped to port <code>5001</code>):</p>
            <CodeBlock code={`docker-compose up --build -d orcha-embeddings`} />
          </div>

          <div id="api-spec" className="mb-14 scroll-mt-28">
            <h2 className="text-2xl font-bold mb-3 text-white">API Specification</h2>
            <p className="text-sm text-gray-300 mb-2">Endpoint: <code>POST http://localhost:5001/embed</code></p>
            <CodeBlock code={`curl -X POST http://localhost:5001/embed \\
  -H "Content-Type: application/json" \\
  -d '{"texts": ["customer billing revenue quarterly total"]}'`} />
            <p className="text-xs text-gray-400 mt-2">
              Returns a 384-dimensional float array vector ready for indexing in Convex Vector Search.
            </p>
          </div>

          <div id="configuration" className="mb-14 scroll-mt-28">
            <h2 className="text-2xl font-bold mb-3 text-white">Next.js Environment Configuration</h2>
            <p className="text-sm text-gray-300 mb-2">Add the local service URL to your <code>.env.local</code> file:</p>
            <CodeBlock code={`EMBEDDING_SERVICE_URL="http://localhost:5001"
EMBEDDING_PROVIDER="local"`} lang="env" />
          </div>

        </div>

        <QuickLinks links={quickLinks} />
      </div>
    </main>
  );
}
