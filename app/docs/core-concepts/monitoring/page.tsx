"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import { Activity, LineChart, ShieldAlert, Check, Copy } from "lucide-react";
import DocsSidebar from "@/components/docnav/DocumentNavigation";
import navItems from "@/data/document-nav.json";
import quickLinks from "@/data/quicklinks/monitoring.json";
import QuickLinks from "@/components/quicklinks/QuickLinks";

function CodeBlock({ code, lang = "yaml" }: { code: string; lang?: string }) {
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

export default function MonitoringPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <div className="flex flex-col md:flex-row">
        <DocsSidebar items={navItems} />

        <div className="flex-1 px-6 py-10 pt-24 max-w-5xl">
          <div className="mb-12">
            <Badge variant="secondary" className="mb-4 bg-emerald-500/10 text-emerald-300 border-emerald-500/20 font-mono text-xs">
              Observability & Telemetry
            </Badge>
            <h1 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">
              Observability & Grafana Dashboards
            </h1>
            <p className="text-lg text-gray-300 max-w-3xl leading-relaxed">
              Every API route and agent execution in Orcha Agent OS is instrumented with Prometheus telemetry. Monitor request rates, p95 latencies, error ratios, and memory health in real time.
            </p>
          </div>

          <div id="overview" className="mb-14 scroll-mt-28">
            <h2 className="text-2xl font-bold mb-3 text-white">Overview</h2>
            <p className="text-sm text-gray-300 leading-relaxed mb-3">
              The monitoring stack (Prometheus & Grafana) is included in the standard <code>docker-compose.yml</code> file.
              Prometheus scrapes metrics from <code>http://localhost:3000/api/metrics</code> every 15 seconds, and Grafana exposes an auto-provisioned dashboard on port <code>3001</code>.
            </p>
          </div>

          <div id="prometheus" className="mb-14 scroll-mt-28">
            <h2 className="text-2xl font-bold mb-3 text-white">Prometheus Configuration</h2>
            <p className="text-sm text-gray-300 leading-relaxed mb-2">
              Located in <code>monitoring/prometheus.yml</code>:
            </p>
            <CodeBlock code={`global:
  scrape_interval: 15s

scrape_configs:
  - job_name: 'orcha-api'
    metrics_path: '/api/metrics'
    static_configs:
      - targets: ['host.docker.internal:3000']`} />
          </div>

          <div id="grafana" className="mb-14 scroll-mt-28">
            <h2 className="text-2xl font-bold mb-3 text-white">Grafana Dashboards</h2>
            <p className="text-sm text-gray-300 leading-relaxed mb-3">
              Access the Grafana instance at <strong>http://localhost:3001</strong> (default credentials: <code>admin</code> / <code>admin</code>).
              The <strong>Orcha API Routes</strong> dashboard is provisioned automatically with panels for:
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-gray-900/60 border border-gray-800">
                <div className="font-bold text-sm text-teal-400 mb-1">Total Request Rate (RPS)</div>
                <div className="text-xs text-gray-400">Total volume of queries flowing into /api/chat, /api/mcp, and /api/test-connection.</div>
              </div>
              <div className="p-4 rounded-xl bg-gray-900/60 border border-gray-800">
                <div className="font-bold text-sm text-blue-400 mb-1">p95 / p99 Latency Histogram</div>
                <div className="text-xs text-gray-400">Execution time breakdowns between LLM synthesis, WASM transpilation, and native DB execution.</div>
              </div>
              <div className="p-4 rounded-xl bg-gray-900/60 border border-gray-800">
                <div className="font-bold text-sm text-rose-400 mb-1">5xx Server Error Ratio</div>
                <div className="text-xs text-gray-400">Tracks database connection timeouts, syntax validation rejections, and rate-limit 429 events.</div>
              </div>
              <div className="p-4 rounded-xl bg-gray-900/60 border border-gray-800">
                <div className="font-bold text-sm text-purple-400 mb-1">Process Heap & Memory</div>
                <div className="text-xs text-gray-400">Tracks memory allocation across the Node.js runtime and Rust WebAssembly module.</div>
              </div>
            </div>
          </div>

          <div id="metrics" className="mb-14 scroll-mt-28">
            <h2 className="text-2xl font-bold mb-3 text-white">Key Telemetry Metrics</h2>
            <div className="p-4 rounded-xl bg-gray-950 border border-gray-800 font-mono text-xs text-gray-300 space-y-2">
              <div><code>orcha_http_requests_total&#123;method, route, status&#125;</code> - Counter of HTTP calls</div>
              <div><code>orcha_http_request_duration_seconds_bucket&#123;route&#125;</code> - Latency distribution</div>
              <div><code>orcha_db_query_duration_seconds&#123;database_type&#125;</code> - Native database query latency</div>
              <div><code>orcha_wasm_transpile_duration_seconds</code> - Sub-second WASM formula transpilation time</div>
            </div>
          </div>

          <div id="alerting" className="mb-14 scroll-mt-28">
            <h2 className="text-2xl font-bold mb-3 text-white">Alerting & Thresholds</h2>
            <p className="text-sm text-gray-300 leading-relaxed">
              Configure alert rules in Grafana to send Slack, PagerDuty, or webhook notifications whenever p95 latency exceeds 2.5 seconds or 5xx error ratios cross 1% over a 5-minute window.
            </p>
          </div>

        </div>

        <QuickLinks links={quickLinks} />
      </div>
    </main>
  );
}
