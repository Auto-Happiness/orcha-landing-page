"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import { Activity, Check, Copy } from "lucide-react";
import DocsSidebar from "@/components/docnav/DocumentNavigation";
import navItems from "@/data/document-nav.json";
import quickLinks from "@/data/quicklinks/metrics.json";
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

export default function MetricsApiPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <div className="flex flex-col md:flex-row">
        <DocsSidebar items={navItems} />

        <div className="flex-1 px-6 py-10 pt-24 max-w-5xl">
          <div className="mb-12">
            <div className="flex items-center gap-2 mb-4">
              <Badge variant="outline" className="text-xs font-mono border-teal-500/40 text-teal-300">GET</Badge>
              <span className="font-mono text-xs text-gray-400">/api/metrics</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">
              Prometheus Metrics API
            </h1>
            <p className="text-lg text-gray-300 max-w-3xl leading-relaxed">
              Standard Prometheus text exposition endpoint exposing real-time HTTP throughput, query latency histograms, and system memory metrics.
            </p>
          </div>

          <div id="scraping" className="mb-14 scroll-mt-28">
            <h2 className="text-2xl font-bold mb-3 text-white">Scraping the Endpoint</h2>
            <p className="text-sm text-gray-300 mb-2 leading-relaxed">
              Prometheus or OpenTelemetry collectors can scrape this endpoint periodically:
            </p>
            <CodeBlock code={`curl -X GET http://localhost:3000/api/metrics`} />
          </div>

          <div id="auth" className="mb-14 scroll-mt-28">
            <h2 className="text-2xl font-bold mb-3 text-white">Metrics Authentication (Optional)</h2>
            <p className="text-sm text-gray-300 leading-relaxed mb-2">
              In production, you can lock down the endpoint by configuring <code>METRICS_AUTH_TOKEN</code> in your environment variables:
            </p>
            <CodeBlock code={`curl -X GET http://localhost:3000/api/metrics \\
  -H "Authorization: Bearer YOUR_METRICS_TOKEN"`} />
          </div>

          <div id="catalog" className="mb-14 scroll-mt-28">
            <h2 className="text-2xl font-bold mb-3 text-white">Exported Metric Catalog</h2>
            <div className="p-4 rounded-xl bg-gray-950 border border-gray-800 font-mono text-xs text-gray-300 space-y-2">
              <div># HELP orcha_http_requests_total Total number of HTTP requests processed</div>
              <div># TYPE orcha_http_requests_total counter</div>
              <div>orcha_http_requests_total&#123;method=&quot;POST&quot;,route=&quot;/api/chat&quot;,status=&quot;200&quot;&#125; 1420</div>
              <div className="pt-2"># HELP orcha_http_request_duration_seconds Latency histogram in seconds</div>
              <div># TYPE orcha_http_request_duration_seconds histogram</div>
              <div>orcha_http_request_duration_seconds_bucket&#123;le=&quot;0.05&quot;,route=&quot;/api/chat&quot;&#125; 890</div>
              <div>orcha_http_request_duration_seconds_bucket&#123;le=&quot;0.25&quot;,route=&quot;/api/chat&quot;&#125; 1350</div>
              <div>orcha_http_request_duration_seconds_bucket&#123;le=&quot;+Inf&quot;,route=&quot;/api/chat&quot;&#125; 1420</div>
            </div>
          </div>

          <div id="promql" className="mb-14 scroll-mt-28">
            <h2 className="text-2xl font-bold mb-3 text-white">Sample PromQL Queries</h2>
            <div className="space-y-3">
              <div className="p-4 rounded-xl bg-gray-900/60 border border-gray-800">
                <div className="text-xs text-gray-400 mb-1">Calculate 95th percentile query latency:</div>
                <code className="text-xs font-mono text-teal-300">histogram_quantile(0.95, sum(rate(orcha_http_request_duration_seconds_bucket[5m])) by (le))</code>
              </div>
              <div className="p-4 rounded-xl bg-gray-900/60 border border-gray-800">
                <div className="text-xs text-gray-400 mb-1">Calculate error rate percentage:</div>
                <code className="text-xs font-mono text-rose-300">sum(rate(orcha_http_requests_total&#123;status=~&quot;5..&quot;&#125;[5m])) / sum(rate(orcha_http_requests_total[5m])) * 100</code>
              </div>
            </div>
          </div>

        </div>

        <QuickLinks links={quickLinks} />
      </div>
    </main>
  );
}
