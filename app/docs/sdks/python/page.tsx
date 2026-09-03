"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Check, Copy } from "lucide-react";
import DocsSidebar from "@/components/docnav/DocumentNavigation";
import navItems from "@/data/document-nav.json";
import quickLinks from "@/data/quicklinks/sdk-python.json";
import QuickLinks from "@/components/quicklinks/QuickLinks";

function CodeBlock({ code, lang = "python" }: { code: string; lang?: string }) {
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

export default function PythonSdkPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <div className="flex flex-col md:flex-row">
        <DocsSidebar items={navItems} />

        <div className="flex-1 px-6 py-10 pt-24 max-w-5xl">
          <div className="mb-12">
            <div className="flex items-center gap-2 mb-4">
              <Badge variant="secondary" className="bg-amber-500/10 text-amber-300 border-amber-500/20 font-mono text-xs">
                Official Client Library
              </Badge>
              <Badge variant="outline" className="border-gray-800 text-gray-400 font-mono text-xs">
                Python 3.9+
              </Badge>
            </div>
            <h1 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">
              Orcha OS Python SDK
            </h1>
            <p className="text-lg text-gray-300 max-w-3xl leading-relaxed">
              The official Python client library for connecting to and interacting with the Orcha OS AI Agent Gateway.
              Provides synchronous and real-time streaming chat capabilities, robust event-stream parsing, custom session hooks, and fully typed data models.
            </p>
          </div>

          {/* Overview */}
          <div id="overview" className="mb-14 scroll-mt-28">
            <h2 className="text-2xl font-bold mb-3 text-white">Overview</h2>
            <div className="p-6 rounded-2xl bg-gray-900/60 border border-gray-800 space-y-3 text-sm text-gray-300 leading-relaxed">
              <p>
                The Python SDK allows Python applications, data science notebooks (Jupyter), backend services (FastAPI/Django), and automation scripts to interact with Orcha Agent OS.
              </p>
              <div className="grid sm:grid-cols-2 gap-3 pt-2">
                <div className="p-3.5 rounded-xl bg-gray-950 border border-gray-800">
                  <div className="font-bold text-amber-400 text-xs mb-1">🐍 Native Dataclasses</div>
                  <div className="text-xs text-gray-400">Typed models with automatic JSON validation and helper properties.</div>
                </div>
                <div className="p-3.5 rounded-xl bg-gray-950 border border-gray-800">
                  <div className="font-bold text-teal-400 text-xs mb-1">⚡ Generator Streaming</div>
                  <div className="text-xs text-gray-400">Stream reasoning tokens via standard Python generator loops (<code>for chunk in client.chat_stream()</code>).</div>
                </div>
              </div>
            </div>
          </div>

          {/* Installation */}
          <div id="installation" className="mb-14 scroll-mt-28">
            <h2 className="text-2xl font-bold mb-3 text-white">Installation</h2>
            <p className="text-sm text-gray-300 mb-2">Install dependencies via pip:</p>
            <CodeBlock code={`pip install requests`} lang="bash" />
          </div>

          {/* Quickstart */}
          <div id="quickstart" className="mb-14 scroll-mt-28">
            <h2 className="text-2xl font-bold mb-6 text-white">Quick Start Examples</h2>

            {/* Sync Chat */}
            <div id="sync-chat" className="mb-8 scroll-mt-28">
              <h3 className="text-lg font-bold text-white mb-2">1. Synchronous Chat (`client.chat`)</h3>
              <p className="text-sm text-gray-300 mb-2 leading-relaxed">
                Use <code>client.chat</code> when you want to execute a query and wait for the final completed response:
              </p>
              <CodeBlock code={`import os
from orcha_os import OrchaClient, ChatRequest, Message, Role, APIError

# Initialize the client (defaults to http://localhost:3000)
api_key = os.environ.get("ORCHA_API_KEY")
client = OrchaClient(api_key=api_key)

request = ChatRequest(
    messages=[
        Message(role=Role.USER, content="How many active customers do we have?")
    ],
    show_results=True
)

try:
    resp = client.chat(request)
    if resp.success:
        print(f"Agent Answer: {resp.answer}")
        print(f"Generated SQL: {resp.sql}")
        print(f"Result Rows: {resp.rows}")
    else:
        print(f"Error: {resp.error}")
except APIError as e:
    print(f"API Error (Status {e.status_code}): {e.message}")`} />
            </div>

            {/* Real-time Streaming */}
            <div id="streaming" className="mb-8 scroll-mt-28">
              <h3 className="text-lg font-bold text-white mb-2">2. Real-Time Streaming (`client.chat_stream`)</h3>
              <p className="text-sm text-gray-300 mb-2 leading-relaxed">
                Use <code>client.chat_stream</code> to stream reasoning and text chunks in real time as a Python Generator:
              </p>
              <CodeBlock code={`import os
from orcha_os import OrchaClient, ChatRequest, Message, Role, APIError, StreamError

api_key = os.environ.get("ORCHA_API_KEY")
client = OrchaClient(api_key=api_key, base_url="http://localhost:3000")

request = ChatRequest(
    messages=[
        Message(role=Role.USER, content="Show me monthly revenue breakdown by region for 2024")
    ],
    show_results=True
)

print("--- Streaming Agent Response ---")
try:
    for chunk in client.chat_stream(request):
        if chunk.type in ("text", "text-delta"):
            print(chunk.text, end="", flush=True)
        elif chunk.type == "error":
            print(f"\\n[Agent Error]: {chunk.text}")
except APIError as e:
    print(f"\\nAPI Error (Status {e.status_code}): {e.message}")
except StreamError as e:
    print(f"\\nStream Error: {e}")

print("\\n--- Stream Complete ---")`} />
            </div>
          </div>

          {/* Configuration & Proxies */}
          <div id="configuration" className="mb-14 scroll-mt-28">
            <h2 className="text-2xl font-bold mb-3 text-white">Custom Session & Proxy Configuration</h2>
            <p className="text-sm text-gray-300 mb-2 leading-relaxed">
              Inject custom <code>requests.Session</code> instances for corporate forward proxies, custom SSL certs, or timeout tuning:
            </p>
            <CodeBlock code={`import requests
from orcha_os import OrchaClient

# Inject a custom session with proxies
custom_session = requests.Session()
custom_session.proxies = {"http": "http://10.10.1.10:3128", "https": "http://10.10.1.10:3128"}

client = OrchaClient(
    api_key="orcha_live_sk_...",
    base_url="https://api.orcha-os.com",
    session=custom_session
)`} />
          </div>

          {/* Data Models */}
          <div id="models" className="mb-14 scroll-mt-28">
            <h2 className="text-2xl font-bold mb-3 text-white">Core Data Models</h2>
            <div className="space-y-3">
              <div className="p-4 rounded-xl bg-gray-900/60 border border-gray-800">
                <div className="font-mono text-xs text-amber-400 font-bold mb-1">ChatRequest</div>
                <div className="text-xs text-gray-400">Encapsulates <code>messages</code>, <code>config_ids</code>, <code>model_id</code>, and <code>show_results</code>.</div>
              </div>
              <div className="p-4 rounded-xl bg-gray-900/60 border border-gray-800">
                <div className="font-mono text-xs text-teal-400 font-bold mb-1">StreamChunk</div>
                <div className="text-xs text-gray-400">Normalized chunk object with <code>.text</code> property accessing content, delta tokens, or error messages.</div>
              </div>
            </div>
          </div>

          {/* GitHub Repository */}
          <div id="github" className="mb-14 scroll-mt-28 p-6 rounded-2xl bg-gradient-to-br from-gray-900 to-gray-950 border border-gray-800 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-white mb-1">Open Source on GitHub</h3>
              <p className="text-xs text-gray-400">View source code, report issues, and contribute to the Python SDK.</p>
            </div>
            <a
              href="https://github.com/Auto-Happiness/orcha-os-python"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-mono font-bold flex items-center gap-1.5 transition-all"
            >
              github.com/Auto-Happiness/orcha-os-python
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>

        </div>

        <QuickLinks links={quickLinks} />
      </div>
    </main>
  );
}
