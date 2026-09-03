"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Code2, Terminal, ExternalLink, Check, Copy, Zap, ArrowRight, ShieldCheck } from "lucide-react";
import DocsSidebar from "@/components/docnav/DocumentNavigation";
import navItems from "@/data/document-nav.json";
import quickLinks from "@/data/quicklinks/sdk-go.json";
import QuickLinks from "@/components/quicklinks/QuickLinks";

function CodeBlock({ code, lang = "go" }: { code: string; lang?: string }) {
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

export default function GoSdkPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <div className="flex flex-col md:flex-row">
        <DocsSidebar items={navItems} />

        <div className="flex-1 px-6 py-10 pt-24 max-w-5xl">
          <div className="mb-12">
            <div className="flex items-center gap-2 mb-4">
              <Badge variant="secondary" className="bg-cyan-500/10 text-cyan-300 border-cyan-500/20 font-mono text-xs">
                Official Client Library
              </Badge>
              <Badge variant="outline" className="border-gray-800 text-gray-400 font-mono text-xs">
                Go 1.21+
              </Badge>
            </div>
            <h1 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">
              Orcha OS Go SDK
            </h1>
            <p className="text-lg text-gray-300 max-w-3xl leading-relaxed">
              The official Go client library for connecting to and interacting with the Orcha OS AI Agent Gateway.
              Build robust backend services, CLI tools, and automated pipelines with fully typed models, synchronous querying, and real-time SSE event streaming.
            </p>
          </div>

          {/* Overview */}
          <div id="overview" className="mb-14 scroll-mt-28">
            <h2 className="text-2xl font-bold mb-3 text-white">Overview</h2>
            <div className="p-6 rounded-2xl bg-gray-900/60 border border-gray-800 space-y-3 text-sm text-gray-300 leading-relaxed">
              <p>
                The Go SDK provides a high-performance, idiomatic Go wrapper around the Orcha Agent OS HTTP and Server-Sent Events (SSE) streaming APIs.
              </p>
              <div className="grid sm:grid-cols-2 gap-3 pt-2">
                <div className="p-3.5 rounded-xl bg-gray-950 border border-gray-800">
                  <div className="font-bold text-cyan-400 text-xs mb-1">⚡ Type-Safe Data Models</div>
                  <div className="text-xs text-gray-400">Strictly typed structs for requests, responses, column schemas, and reasoning traces.</div>
                </div>
                <div className="p-3.5 rounded-xl bg-gray-950 border border-gray-800">
                  <div className="font-bold text-teal-400 text-xs mb-1">🌊 Native Streaming Support</div>
                  <div className="text-xs text-gray-400">Memory-efficient channel and iterator-based SSE event parsing with auto-reconnection.</div>
                </div>
              </div>
            </div>
          </div>

          {/* Installation */}
          <div id="installation" className="mb-14 scroll-mt-28">
            <h2 className="text-2xl font-bold mb-3 text-white">Installation</h2>
            <p className="text-sm text-gray-300 mb-2">Install the package using <code>go get</code>:</p>
            <CodeBlock code={`go get github.com/Auto-Happiness/orcha-os-go`} lang="bash" />
          </div>

          {/* Quickstart */}
          <div id="quickstart" className="mb-14 scroll-mt-28">
            <h2 className="text-2xl font-bold mb-6 text-white">Quick Start Examples</h2>

            {/* Sync Chat */}
            <div id="sync-chat" className="mb-8 scroll-mt-28">
              <h3 className="text-lg font-bold text-white mb-2">1. Synchronous Query Execution</h3>
              <p className="text-sm text-gray-300 mb-2 leading-relaxed">
                Use <code>client.Chat</code> when you want to execute a query and wait for the complete SQL generation, dry-plan validation, and tabular dataset response:
              </p>
              <CodeBlock code={`package main

import (
	"context"
	"fmt"
	"log"
	"os"

	orcha "github.com/Auto-Happiness/orcha-os-go"
)

func main() {
	apiKey := os.Getenv("ORCHA_API_KEY")
	
	// Initialize client (defaults to http://localhost:3000)
	client := orcha.NewClient(
		orcha.WithAPIKey(apiKey),
		orcha.WithBaseURL("http://localhost:3000"),
	)

	req := &orcha.ChatRequest{
		Messages: []orcha.Message{
			{
				Role:    orcha.RoleUser,
				Content: "Give me the top 5 customers with the highest lifetime value",
			},
		},
		ShowResults: true,
	}

	ctx := context.Background()
	resp, err := client.Chat(ctx, req)
	if err != nil {
		log.Fatalf("Query failed: %v", err)
	}

	if resp.Success {
		fmt.Printf("Agent Answer: %s\\n", resp.Text)
		fmt.Printf("Generated SQL: %s\\n", resp.SQL)
		fmt.Printf("Tokens Spent: %d\\n", resp.TokensSpent)
		
		// Access tabular result set
		for _, row := range resp.ResultSet.Rows {
			fmt.Println(row)
		}
	} else {
		fmt.Printf("Agent Error: %s\\n", resp.Error)
	}
}`} />
            </div>

            {/* Real-time Streaming */}
            <div id="streaming" className="mb-8 scroll-mt-28">
              <h3 className="text-lg font-bold text-white mb-2">2. Real-Time Streaming (`ChatStream`)</h3>
              <p className="text-sm text-gray-300 mb-2 leading-relaxed">
                Stream tokens and agent reasoning trajectories as they are synthesized in real time:
              </p>
              <CodeBlock code={`package main

import (
	"context"
	"fmt"
	"io"
	"log"
	"os"

	orcha "github.com/Auto-Happiness/orcha-os-go"
)

func main() {
	client := orcha.NewClient(
		orcha.WithAPIKey(os.Getenv("ORCHA_API_KEY")),
	)

	req := &orcha.ChatRequest{
		Messages: []orcha.Message{
			{
				Role:    orcha.RoleUser,
				Content: "Show me quarterly revenue distribution by region for 2024",
			},
		},
		ShowResults: true,
	}

	ctx := context.Background()
	stream, err := client.ChatStream(ctx, req)
	if err != nil {
		log.Fatalf("Failed to open stream: %v", err)
	}
	defer stream.Close()

	fmt.Println("--- Streaming Agent Response ---")
	for {
		chunk, err := stream.Recv()
		if err == io.EOF {
			break
		}
		if err != nil {
			log.Fatalf("Stream error: %v", err)
		}

		if chunk.Type == "text" || chunk.Type == "text-delta" {
			fmt.Print(chunk.Text)
		} else if chunk.Type == "error" {
			fmt.Printf("\\n[Agent Error]: %s\\n", chunk.Text)
		}
	}
	fmt.Println("\\n--- Stream Complete ---")
}`} />
            </div>
          </div>

          {/* Client Options */}
          <div id="client-options" className="mb-14 scroll-mt-28">
            <h2 className="text-2xl font-bold mb-3 text-white">Client Configuration Options</h2>
            <div className="p-4 rounded-xl bg-gray-950 border border-gray-800 font-mono text-xs text-gray-300 space-y-2">
              <div><code>orcha.WithBaseURL(&quot;https://api.orcha-os.com&quot;)</code> <span className="text-gray-500">// Custom host endpoint</span></div>
              <div><code>orcha.WithHTTPClient(customHTTPClient)</code> <span className="text-gray-500">// Custom transport, timeouts, or tracing</span></div>
              <div><code>orcha.WithTimeout(30 * time.Second)</code> <span className="text-gray-500">// Default request timeout</span></div>
            </div>
          </div>

          {/* Error Handling */}
          <div id="error-handling" className="mb-14 scroll-mt-28">
            <h2 className="text-2xl font-bold mb-3 text-white">Error Handling</h2>
            <p className="text-sm text-gray-300 mb-2 leading-relaxed">
              The SDK provides structured error types (<code>*orcha.APIError</code>, <code>*orcha.RateLimitError</code>) exposing HTTP status codes and error messages:
            </p>
            <CodeBlock code={`if err != nil {
	if apiErr, ok := err.(*orcha.APIError); ok {
		fmt.Printf("API Error (%d): %s\\n", apiErr.StatusCode, apiErr.Message)
		if apiErr.StatusCode == 429 {
			fmt.Println("Rate limit exceeded. Retry later.")
		}
	}
}`} />
          </div>

          {/* GitHub Repository */}
          <div id="github" className="mb-14 scroll-mt-28 p-6 rounded-2xl bg-gradient-to-br from-gray-900 to-gray-950 border border-gray-800 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-white mb-1">Open Source on GitHub</h3>
              <p className="text-xs text-gray-400">View source code, report issues, and contribute to the Go SDK.</p>
            </div>
            <a
              href="https://github.com/Auto-Happiness/orcha-os-go"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-xs font-mono font-bold flex items-center gap-1.5 transition-all"
            >
              github.com/Auto-Happiness/orcha-os-go
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>

        </div>

        <QuickLinks links={quickLinks} />
      </div>
    </main>
  );
}
