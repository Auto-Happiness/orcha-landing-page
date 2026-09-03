"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Sparkles,
  Terminal,
  CheckCircle2,
  AlertTriangle,
  Play,
  Layers,
  ArrowRight,
  Copy,
  Check
} from "lucide-react";
import DocsSidebar from "@/components/docnav/DocumentNavigation";
import navItems from "@/data/document-nav.json";
import quickLinks from "@/data/quicklinks/quickstart.json";
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

export default function QuickstartPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <div className="flex flex-col md:flex-row">
        <DocsSidebar items={navItems} />

        <div className="flex-1 px-6 py-10 pt-24 max-w-5xl">
          {/* Header */}
          <div className="mb-12">
            <Badge variant="secondary" className="mb-4 bg-teal-500/10 text-teal-300 border-teal-500/20 font-mono text-xs">
              Self-Hosted Deployment
            </Badge>
            <h1 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">
              Quick Start (Self-Hosted Setup)
            </h1>
            <p className="text-lg text-gray-300 max-w-3xl leading-relaxed">
              Get Orcha Agent OS running locally on your workstation or private server in under 5 minutes using Docker Compose and the automated bootstrap script.
            </p>
          </div>

          {/* Prerequisites */}
          <div id="prerequisites" className="mb-14 scroll-mt-28">
            <h2 className="text-2xl font-bold mb-4 text-white">Prerequisites</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-gray-900/60 border border-gray-800 flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-teal-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-sm text-white">Node.js 20+ & pnpm / npm</div>
                  <div className="text-xs text-gray-400 mt-0.5">Required for running Next.js SaaS frontend & API server.</div>
                </div>
              </div>
              <div className="p-4 rounded-xl bg-gray-900/60 border border-gray-800 flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-teal-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-sm text-white">Docker & Docker Compose</div>
                  <div className="text-xs text-gray-400 mt-0.5">Runs self-hosted Convex, MySQL, Prometheus, Grafana, and embeddings.</div>
                </div>
              </div>
              <div className="p-4 rounded-xl bg-gray-900/60 border border-gray-800 flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-teal-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-sm text-white">Clerk Account</div>
                  <div className="text-xs text-gray-400 mt-0.5">Handles multi-tenant organization authentication & JWT tokens.</div>
                </div>
              </div>
              <div className="p-4 rounded-xl bg-gray-900/60 border border-gray-800 flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-teal-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-sm text-white">LLM API Key (OpenAI / Anthropic)</div>
                  <div className="text-xs text-gray-400 mt-0.5">Provides underlying model intelligence for semantic SQL synthesis.</div>
                </div>
              </div>
            </div>
          </div>

          {/* One-Command Setup */}
          <div id="one-command" className="mb-14 scroll-mt-28">
            <h2 className="text-2xl font-bold mb-3 text-white">One-Command Setup (Recommended for Windows / PowerShell)</h2>
            <p className="text-sm text-gray-300 mb-4 leading-relaxed">
              Orcha includes an automated bootstrap script (<code>setup.ps1</code>) that launches Docker containers, provisions local self-hosted Convex admin keys, syncs schema definitions, and configures local environment variables in a single step:
            </p>
            <CodeBlock code={`.\\setup.ps1`} lang="powershell" />
            <p className="text-xs text-gray-400 mt-2">
              💡 Tip: Use <code>.\\setup.ps1 -SkipBuild</code> to skip Docker image rebuilds, or <code>.\\setup.ps1 -SkipDeps</code> to skip <code>npm install</code> on subsequent runs.
            </p>
          </div>

          {/* Manual Setup Steps */}
          <div id="manual-setup" className="mb-14 scroll-mt-28">
            <h2 className="text-2xl font-bold mb-6 text-white">Manual Step-by-Step Setup</h2>
            
            <div className="space-y-8">
              {/* Step 1 */}
              <div>
                <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-teal-500/20 text-teal-300 font-mono text-xs flex items-center justify-center border border-teal-500/40">1</span>
                  Clone & Install Dependencies
                </h3>
                <CodeBlock code={`git clone https://github.com/your-repo/orcha-agent-os.git
cd orcha-agent-os
npm install
npm install mysql2 pg`} />
              </div>

              {/* Step 2 */}
              <div id="docker-stack" className="scroll-mt-28">
                <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-teal-500/20 text-teal-300 font-mono text-xs flex items-center justify-center border border-teal-500/40">2</span>
                  Launch Local Docker Infrastructure
                </h3>
                <p className="text-sm text-gray-400 mb-2">Starts the self-hosted Convex backend, sample databases, Prometheus metrics collector, and Grafana:</p>
                <CodeBlock code={`docker-compose up -d`} />
              </div>

              {/* Step 3 */}
              <div id="convex-backend" className="scroll-mt-28">
                <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-teal-500/20 text-teal-300 font-mono text-xs flex items-center justify-center border border-teal-500/40">3</span>
                  Generate Admin Key & Configure Convex Secrets
                </h3>
                <p className="text-sm text-gray-400 mb-2">Generate an admin token from the running backend container:</p>
                <CodeBlock code={`docker compose exec backend ./generate_admin_key.sh`} />
                <p className="text-sm text-gray-400 my-2">Set up encryption and authentication environment variables inside Convex:</p>
                <CodeBlock code={`npx convex env set ENCRYPTION_KEY "YOUR_LOCAL_KEY" --url http://localhost:3210 --admin-key "convex-self-hosted|YOUR_KEY"
npx convex env set CLERK_ISSUER_DOMAIN "https://your-clerk-domain.clerk.accounts.dev" --url http://localhost:3210 --admin-key "convex-self-hosted|YOUR_KEY"`} />
                <p className="text-sm text-gray-400 my-2">Deploy database schemas and serverless functions to the self-hosted instance:</p>
                <CodeBlock code={`npx convex deploy --url http://localhost:3210 --admin-key "convex-self-hosted|YOUR_KEY"`} />
              </div>

              {/* Step 4 */}
              <div>
                <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-teal-500/20 text-teal-300 font-mono text-xs flex items-center justify-center border border-teal-500/40">4</span>
                  Run Next.js Application Server
                </h3>
                <CodeBlock code={`npm run dev`} />
                <p className="text-sm text-gray-400 mt-2">
                  Open <strong>http://localhost:3000</strong> to start exploring the Modeler, Command Center, and Databook.
                </p>
              </div>
            </div>
          </div>

          {/* Troubleshooting */}
          <div id="troubleshooting" className="mb-14 scroll-mt-28">
            <h2 className="text-2xl font-bold mb-4 text-white">Troubleshooting & Windows Tips</h2>
            
            <div className="space-y-4">
              <div className="p-5 rounded-xl bg-gray-900/70 border border-amber-500/30">
                <div className="flex items-center gap-2 font-bold text-amber-400 text-sm mb-1">
                  <AlertTriangle className="h-4 w-4" />
                  Pipe Character Escaping Error in PowerShell
                </div>
                <p className="text-xs text-gray-300 leading-relaxed">
                  If running <code>npx convex</code> fails with <code>&#39;&#123;key_part&#125;&#39; is not recognized as an internal or external command</code>, invoke the CLI through Node directly:
                </p>
                <CodeBlock code={`node node_modules/convex/bin/main.js deploy --url "http://localhost:3210" --admin-key "convex-self-hosted|YOUR_ADMIN_KEY"`} lang="powershell" />
              </div>

              <div className="p-5 rounded-xl bg-gray-900/70 border border-blue-500/30">
                <div className="flex items-center gap-2 font-bold text-blue-400 text-sm mb-1">
                  <Sparkles className="h-4 w-4" />
                  Node.js IPv6 DNS Resolution (Clerk &quot;fetch failed&quot;)
                </div>
                <p className="text-xs text-gray-300 leading-relaxed">
                  If Clerk authentication fails with network timeouts on Node 18+, configure Node to prioritize IPv4:
                </p>
                <CodeBlock code={`[System.Environment]::SetEnvironmentVariable("NODE_OPTIONS", "--dns-result-order=ipv4first", "User")`} lang="powershell" />
              </div>
            </div>
          </div>

        </div>

        <QuickLinks links={quickLinks} />
      </div>
    </main>
  );
}
