"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import { Cpu, Terminal, AlertTriangle, Check, Copy } from "lucide-react";
import DocsSidebar from "@/components/docnav/DocumentNavigation";
import navItems from "@/data/document-nav.json";
import quickLinks from "@/data/quicklinks/rust-wasm.json";
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

export default function RustWasmPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <div className="flex flex-col md:flex-row">
        <DocsSidebar items={navItems} />

        <div className="flex-1 px-6 py-10 pt-24 max-w-5xl">
          <div className="mb-12">
            <Badge variant="secondary" className="mb-4 bg-amber-500/10 text-amber-300 border-amber-500/20 font-mono text-xs">
              Core Engine Compilation
            </Badge>
            <h1 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">
              Rust WASM Engine Compilation
            </h1>
            <p className="text-lg text-gray-300 max-w-3xl leading-relaxed">
              The core query transpilation engine is built in Rust (<code>orcha-rust-engine</code>) and compiled to WebAssembly (WASM).
              This binary parses queries, resolves calculated virtual columns, and converts them to native database dialects.
            </p>
          </div>

          {/* Overview */}
          <div id="overview" className="mb-14 scroll-mt-28">
            <h2 className="text-2xl font-bold mb-3 text-white">Overview</h2>
            <p className="text-sm text-gray-300 leading-relaxed">
              If you modify the Rust files under <code>orcha-rust-engine/src/</code>, or perform a clean build on a fresh environment, you must compile the WASM binary using <code>wasm-pack</code> and place the build output into <code>lib/wasm-engine/</code>.
            </p>
          </div>

          {/* Prerequisites */}
          <div id="prerequisites" className="mb-14 scroll-mt-28">
            <h2 className="text-2xl font-bold mb-4 text-white">Prerequisites</h2>
            <p className="text-sm text-gray-300 mb-2">1. Install Rust and Cargo via rustup:</p>
            <CodeBlock code={`curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh`} />
            <p className="text-sm text-gray-300 my-2">2. Install wasm-pack:</p>
            <CodeBlock code={`cargo install wasm-pack`} />
          </div>

          {/* Compiling */}
          <div id="compiling" className="mb-14 scroll-mt-28">
            <h2 className="text-2xl font-bold mb-3 text-white">Compiling with wasm-pack</h2>
            <p className="text-sm text-gray-300 mb-2">Navigate to the Rust engine crate directory and trigger the Node.js target build:</p>
            <CodeBlock code={`cd orcha-rust-engine
wasm-pack build --target nodejs`} />
            <p className="text-xs text-gray-400 mt-2">
              This generates WebAssembly binaries, JS loader shims, and TypeScript definitions inside <code>orcha-rust-engine/pkg/</code>.
            </p>
          </div>

          {/* Deploying */}
          <div id="deploying" className="mb-14 scroll-mt-28">
            <h2 className="text-2xl font-bold mb-3 text-white">Deploying the Binary to Next.js</h2>
            <p className="text-sm text-gray-300 mb-2">Copy the compiled WASM package into <code>lib/wasm-engine/</code>:</p>
            <CodeBlock code={`mkdir -p lib/wasm-engine
cp orcha-rust-engine/pkg/orcha_semantic_engine_bg.wasm lib/wasm-engine/
cp orcha-rust-engine/pkg/orcha_semantic_engine.js lib/wasm-engine/
cp orcha-rust-engine/pkg/orcha_semantic_engine.d.ts lib/wasm-engine/`} />
          </div>

          {/* Windows Toolchain Fixes */}
          <div id="windows-fixes" className="mb-14 scroll-mt-28">
            <h2 className="text-2xl font-bold mb-4 text-white">Troubleshooting Windows GNU Linker Errors</h2>
            <div className="p-6 rounded-2xl bg-gray-900/70 border border-amber-500/30 space-y-4">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                <AlertTriangle className="h-4 w-4" /> Option A: Switch to MSVC Toolchain (Recommended)
              </div>
              <p className="text-xs text-gray-300 leading-relaxed">
                If MinGW throws <code>unable to find library -lgcc_eh</code>, switch to the official Microsoft Visual C++ build tools:
              </p>
              <CodeBlock code={`rustup default stable-x86_64-pc-windows-msvc
cd orcha-rust-engine
cargo clean
wasm-pack build --target nodejs`} lang="powershell" />
            </div>
          </div>

        </div>

        <QuickLinks links={quickLinks} />
      </div>
    </main>
  );
}
