"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { SiGmail, SiGooglesheets, SiGoogledrive, SiGooglecalendar } from "react-icons/si";
import bgImage from '@/assets/orcha-bg.png';
import nextjsIcon from "@/assets/nextjs.png";
import redisIcon from "@/assets/redis.png";
import dockerIcon from "@/assets/docker.png";
import postgresIcon from "@/assets/postgres.png";
import mssqlIcon from "@/assets/mssql.png";
import tsIcon from "@/assets/ts.png";
import { PricingDrawer } from "@/components/ui/pricing-drawer";

/* ─── Inline styles / keyframes ───────────────────────── */
const GlobalStyles = () => (
  <style>{`
    @keyframes gradientShift {
      0%   { background-position: 0% 50%; }
      50%  { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }
    @keyframes mesh-animation {
      0% { transform: translate(0,0) scale(1); }
      33% { transform: translate(30px,-50px) scale(1.1); }
      66% { transform: translate(-20px,20px) scale(0.9); }
      100% { transform: translate(0,0) scale(1); }
    }
    @keyframes floatY {
      0%, 100% { transform: translateY(0px); }
      50%       { transform: translateY(-12px); }
    }
    @keyframes pulse-glow {
      0%   { box-shadow: 0 0 0 0 rgba(20, 184, 166, 0.4); }
      70%  { box-shadow: 0 0 0 20px rgba(20, 184, 166, 0); }
      100% { box-shadow: 0 0 0 0 rgba(20, 184, 166, 0); }
    }
    @keyframes fadeSlideUp {
      from { opacity: 0; transform: translateY(40px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes fadeSlideLeft {
      from { opacity: 0; transform: translateX(-30px); }
      to   { opacity: 1; transform: translateX(0); }
    }
    @keyframes scaleIn {
      from { opacity: 0; transform: scale(0.9); }
      to   { opacity: 1; transform: scale(1); }
    }

    .animate-ocean-bg {
      background: linear-gradient(270deg, #042f2e, #0f172a, #064e3b, #0f172a, #042f2e);
      background-size: 400% 400%;
      animation: gradientShift 15s ease infinite;
    }
    .animate-float {
      animation: floatY 5s ease-in-out infinite;
    }
    .animate-pulse-teal {
      animation: pulse-glow 3s ease-out infinite;
    }

    /* Stripe-like Mesh Background */
    .mesh-container {
      position: absolute;
      inset: 0;
      background-color: #0f172a;
      overflow: hidden;
      z-index: 0;
    }
    .mesh-gradient {
      position: absolute;
      width: 140%;
      height: 140%;
      top: -20%;
      left: -20%;
      background-image: 
        radial-gradient(at 0% 0%, #042f2e 0, transparent 50%), 
        radial-gradient(at 50% 0%, #0f766e 0, transparent 50%), 
        radial-gradient(at 100% 0%, #042f2e 0, transparent 50%), 
        radial-gradient(at 0% 50%, #064e3b 0, transparent 50%), 
        radial-gradient(at 100% 50%, #0f172a 0, transparent 50%), 
        radial-gradient(at 0% 100%, #042f2e 0, transparent 50%), 
        radial-gradient(at 50% 100%, #115e59 0, transparent 50%), 
        radial-gradient(at 100% 100%, #042f2e 0, transparent 50%);
      filter: blur(80px);
      opacity: 0.8;
      animation: mesh-animation 20s infinite alternate linear;
    }

    /* Scroll-reveal states */
    .reveal         { opacity: 0; }
    .reveal.visible { animation: fadeSlideUp   0.7s cubic-bezier(.22,1,.36,1) forwards; }

    .reveal-left        { opacity: 0; }
    .reveal-left.visible { animation: fadeSlideLeft 0.7s cubic-bezier(.22,1,.36,1) forwards; }

    .reveal-scale        { opacity: 0; }
    .reveal-scale.visible { animation: scaleIn 0.6s cubic-bezier(.22,1,.36,1) forwards; }

    /* Glassmorphism card */
    .glass-card {
      background: rgba(15, 23, 42, 0.6);
      backdrop-filter: blur(12px);
      border: 1px solid rgba(20, 184, 166, 0.1);
      transition: all 0.3s ease;
    }
    .glass-card:hover {
      border-color: rgba(20, 184, 166, 0.4);
      transform: translateY(-5px);
      box-shadow: 0 10px 30px -10px rgba(20, 184, 166, 0.3);
    }
    
    .text-gradient-teal {
      background: linear-gradient(to r, #2dd4bf, #0d9488);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    @keyframes marquee {
      0% { transform: translateX(0); }
      100% { transform: translateX(-50%); }
    }
    .animate-marquee {
      display: flex;
      width: max-content;
      animation: marquee 40s linear infinite;
    }
    .animate-marquee:hover {
      animation-play-state: paused;
    }
  `}</style>
);

/* ─── Intersection observer hook ───────────────────────── */
function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add("visible"); observer.disconnect(); } },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return ref;
}

export default function OrchaAgentOSPage() {
  const heroRef = useReveal();
  const advantageRef = useReveal();
  const techRef = useReveal();
  const ctaRef = useReveal();
  const chatDemoRef = useReveal();
  const sqlChartsRef = useReveal();
  const mcpRef = useReveal();

  const mcpTools = [
    { name: "Gmail", icon: <SiGmail size={48} color="#EA4335" /> },
    { name: "Google Sheets", icon: <SiGooglesheets size={48} color="#34A853" /> },
    { name: "Google Drive", icon: <SiGoogledrive size={48} color="#4285F4" /> },
    { name: "Google Calendar", icon: <SiGooglecalendar size={48} color="#4285F4" /> },
    {
      name: "And Many More", icon: (
        <div className="w-12 h-12 rounded-full bg-teal-500/10 flex items-center justify-center text-teal-400 animate-pulse">
          <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        </div>
      )
    },
  ];

  return (
    <>
      <title>Orcha Os Agent</title>
      <div className="bg-slate-950 text-white min-h-screen overflow-hidden font-sans">
        <GlobalStyles />

        {/* ── Hero Section ── */}
        <section className="relative pt-40 pb-32 px-6 text-center overflow-hidden min-h-[90vh] flex items-center">
          {/* Stripe-like Mesh Gradient Background */}
          <div className="mesh-container">
            <div className="mesh-gradient" />
            <div className="absolute inset-0 bg-slate-950/40" />
          </div>

          {/* Additional Floating Teal Orbs for Depth */}
          <div className="absolute top-20 left-10 w-96 h-96 bg-teal-500/10 rounded-full blur-[100px] animate-float pointer-events-none z-10" />
          <div className="absolute bottom-20 right-10 w-80 h-80 bg-teal-400/10 rounded-full blur-[100px] animate-float pointer-events-none z-10" style={{ animationDelay: "2s" }} />

          <div ref={heroRef} className="reveal relative max-w-5xl mx-auto z-20">
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-sm font-medium">
              <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
              The Semantic Operating System
            </div>
            <h1 className="text-6xl md:text-8xl font-black mb-8 leading-[1.1] tracking-tight">
              Chat with your Data <br />
              <span className="text-teal-400">with Orcha Agent OS</span>
            </h1>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto mb-10 leading-relaxed">
              Orcha Agent OS bridges the gap between complex data warehouses and AI Agents.
              Unlock governed, business-aware intelligence across your entire enterprise <strong>with no hallucinations</strong> and without guessing SQL queries.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="https://github.com/Auto-Happiness/orcha-agent-os"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3.5 bg-slate-800 rounded-xl font-semibold border border-slate-700 hover:bg-slate-700 transition flex items-center gap-2"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.254-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
                View on GitHub
              </a>
            </div>
          </div>
        </section>

        {/* ── The Advantage ── */}
        <section className="py-24 px-6 relative">
          <div className="max-w-7xl mx-auto">
            <div ref={advantageRef} className="reveal grid md:grid-cols-5 gap-16 items-center">
              <div className="md:col-span-2">
                <h2 className="text-4xl font-bold mb-6">Governed Intelligence <br /> <span className="text-teal-400">by Design.</span></h2>
                <p className="text-slate-400 text-lg mb-8 leading-relaxed">
                  Most AI solutions fail because they lack business context. Orcha Agent OS creates a standardized semantic layer that translates raw data into business-ready concepts.
                </p>
                <ul className="space-y-4">
                  {[
                    "Multi-tenant security isolation",
                    "Automated schema introspection",
                    "Real-time RAG pipeline orchestration",
                    "Standardized tool discovery via MCP"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-slate-300">
                      <div className="w-5 h-5 rounded-full bg-teal-500/20 flex items-center justify-center text-teal-400">
                        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-3.5 h-3.5">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="md:col-span-3 relative">
                <div className="absolute inset-0 bg-teal-500/10 rounded-3xl blur-2xl animate-float" />
                <Image
                  src="/os/os1.png"
                  alt="Architecture"
                  width={1600}
                  height={1000}
                  className="relative rounded-3xl border border-slate-800 shadow-2xl animate-float"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ── Experience Semantic Chat ── */}
        <section className="py-24 px-6 relative bg-slate-950/50">
          <div className="max-w-7xl mx-auto">
            <div ref={chatDemoRef} className="reveal text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Experience <span className="text-teal-400">Semantic Chat</span></h2>
              <p className="text-slate-400 text-lg max-w-3xl mx-auto leading-relaxed">
                Watch Orcha Agent OS in action. No SQL, no complex queries—just natural conversation with your data,
                governed and secured by our semantic layer.
              </p>
            </div>

            <div className="relative max-w-5xl mx-auto">
              {/* Decorative background glow */}
              <div className="absolute -inset-4 bg-teal-500/10 rounded-[2.5rem] blur-2xl" />

              <div className="relative rounded-[2rem] overflow-hidden border border-slate-800 shadow-[0_0_50px_-12px_rgba(20,184,166,0.3)] glass-card">
                <video
                  src="/os/chat.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ── Automatic SQL Charts ── */}
        <section className="py-24 px-6 relative overflow-hidden">
          <div className="max-w-7xl mx-auto">
            <div ref={sqlChartsRef} className="reveal grid md:grid-cols-5 gap-16 items-center">
              <div className="md:col-span-3 order-2 md:order-1 relative">
                <div className="absolute inset-0 bg-teal-500/10 rounded-3xl blur-2xl animate-float" />
                <Image
                  src="/os/os2.png"
                  alt="Automatic SQL Charts"
                  width={1600}
                  height={1000}
                  className="relative rounded-3xl border border-slate-800 shadow-2xl animate-float"
                />
              </div>
              <div className="md:col-span-2 order-1 md:order-2">
                <h2 className="text-4xl font-bold mb-6">Automatic <br /> <span className="text-teal-400">SQL Charts.</span></h2>
                <p className="text-slate-400 text-lg mb-8 leading-relaxed">
                  Transform complex query results into stunning visual intelligence automatically.
                  Orcha Agent OS identifies the best visualization for your data, from trend lines to distribution maps.
                </p>
                <div className="space-y-6">
                  {[
                    { title: "Dynamic Visualization", desc: "Auto-selects charts based on data structure." },
                    { title: "Real-time Updates", desc: "Charts refresh as your underlying data changes." },
                    { title: "Interactive Exploration", desc: "Drill down into specific data points with ease." }
                  ].map((item, i) => (
                    <div key={i} className="flex gap-4">
                      <div className="w-10 h-10 shrink-0 rounded-lg bg-teal-500/10 flex items-center justify-center text-teal-400">
                        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-200">{item.title}</h4>
                        <p className="text-sm text-slate-500">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── MCP Tool Ecosystem ── */}
        <section className="py-24 px-6 bg-slate-900/50 overflow-hidden">
          <div ref={mcpRef} className="reveal max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">Unified MCP Tool Ecosystem</h2>
              <p className="text-slate-400 max-w-2xl mx-auto">
                Empower your AI agents with a standardized interface to the world&apos;s most powerful productivity tools.
              </p>
            </div>

            <div className="relative">
              {/* Gradient Overlays for smooth edges */}
              <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-slate-950/80 to-transparent z-10 pointer-events-none" />
              <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-slate-950/80 to-transparent z-10 pointer-events-none" />
              
              <div className="flex overflow-hidden">
                <div className="animate-marquee flex gap-8 py-4">
                  {[...mcpTools, ...mcpTools, ...mcpTools].map((tool, i) => (
                    <div key={i} className="glass-card px-12 py-8 rounded-2xl flex items-center gap-6 shrink-0 min-w-[300px]">
                      <div className="shrink-0">{tool.icon}</div>
                      <h3 className="font-bold text-slate-200 text-xl whitespace-nowrap">{tool.name}</h3>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Supported Databases ── */}
        <section className="py-24 px-6 bg-slate-900/30">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-12">
              <h2 className="text-3xl font-bold mb-4">Supported Data Sources</h2>
              <p className="text-slate-400">Orcha Agent OS seamlessly connects with your existing enterprise data infrastructure.</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
              <div className="flex flex-col items-center gap-4 glass-card p-6 rounded-2xl grayscale hover:grayscale-0 transition-all duration-300">
                <Image src={mssqlIcon} alt="MSSQL" width={64} height={64} className="object-contain h-12" />
                <span className="text-sm font-semibold text-slate-300">Microsoft SQL Server</span>
              </div>
              <div className="flex flex-col items-center gap-4 glass-card p-6 rounded-2xl grayscale hover:grayscale-0 transition-all duration-300">
                <svg viewBox="0 0 24 24" className="w-12 h-12 fill-slate-300" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12.44 2.11C11.45 1.54 10.46 1.13 9.47 1h-1.9c-.93 0-1.8.12-2.61.35C2.86 2.05 1 3.5 1 5.3c0 2.22 3.1 3.99 7.37 4.3 1.2.1 2.37.08 3.51-.06.77-.1.32-.4-.98-.67-2.61-.55-5.22-1.63-5.22-3.07 0-1.2 1.83-2.2 4.67-2.6 1.08-.15 2.17-.18 3.2-.08.77.1 1.07.15 1.77.1.58-.04.81-.13 1.1-.31.3-.18.43-.37.43-.59 0-.25-.13-.44-.39-.6-.4-.25-.97-.43-1.62-.61z" />
                  <path d="M19.14 8.21c-.49-.1-.99-.17-1.48-.2-.71-.05-1.12-.13-1.62-.05-.48.07-.7.18-.94.34-.23.16-.36.35-.36.56s.13.4.38.56c.39.24.96.43 1.6.6.97.26 1.95.46 2.94.61 2.4.36 4.34.8 4.34 2.87 0 2.22-3.1 3.99-7.37 4.3-1.2.09-2.37.08-3.5-.07-.77-.1-.32-.4.97-.67 2.61-.55 5.22-1.63 5.22-3.07 0-1.2-1.82-2.2-4.66-2.6-1.09-.15-2.18-.18-3.21-.08-.77.1-1.06.15-1.77.1-.57-.04-.8-.13-1.09-.32-.3-.18-.42-.37-.42-.58s.13-.44.39-.6c.39-.24.95-.42 1.6-.59.97-.26 1.95-.46 2.94-.61.94-.14 1.88-.23 2.83-.26 1.2-.04 2.41-.01 3.61.1.58.07.82.16 1.11.34.29.18.41.38.41.6s-.13.4-.38.56c-.26.15-.5.25-.8.33.1-.48-.1-.91-.5-1.18-.3-.22-.65-.36-1.04-.4zm-4.32 8.76c-.95-.03-1.89-.12-2.83-.26-.97-.15-1.95-.35-2.94-.61-.64-.17-1.21-.36-1.6-.6-.26-.16-.39-.36-.39-.6s.12-.42.41-.6c.29-.18.52-.27 1.11-.34 1.21-.11 2.42-.14 3.61-.1.95.03 1.89.12 2.83.26.98.15 1.95.34 2.94.61.64.17 1.21.36 1.6.6.25.16.38.35.38.56s-.13.4-.36.56c-.24.16-.46.27-.94.34-.5.08-.91 0-1.62.05-.5.03-.99.1-1.48.2-.39.04-.74.18-1.04.4-.4.27-.6.7-.5 1.18-.3-.08-.54-.18-.8-.33z" />
                </svg>
                <span className="text-sm font-semibold text-slate-300">MySQL</span>
              </div>
              <div className="flex flex-col items-center gap-4 glass-card p-6 rounded-2xl grayscale hover:grayscale-0 transition-all duration-300">
                <Image src={postgresIcon} alt="Postgres" width={64} height={64} className="object-contain h-12" />
                <span className="text-sm font-semibold text-slate-300">PostgreSQL</span>
              </div>
              <div className="flex flex-col items-center gap-4 glass-card p-6 rounded-2xl border-dashed border-teal-500/30">
                <div className="w-12 h-12 rounded-full bg-teal-500/10 flex items-center justify-center text-teal-400 animate-pulse">
                  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
                <span className="text-sm font-medium text-teal-500/70">Many more to come...</span>
              </div>
            </div>
          </div>
        </section>



        {/* ── CTA ── */}
        <section className="py-32 px-6">
          <div ref={ctaRef} className="reveal max-w-4xl mx-auto glass-card p-12 md:p-20 text-center rounded-[3rem] border-teal-500/20 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-teal-500/0 via-teal-500 to-teal-500/0" />
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Modernize Your Data <br /> Intelligence.</h2>
            <p className="text-slate-400 text-lg mb-10 max-w-xl mx-auto">
              Ready to bridge the gap between your data warehouse and the future of agentic AI?
            </p>
          </div>
        </section>

        {/* ── Footer Link ── */}
        <footer className="py-12 border-t border-slate-900 text-center">
          <p className="text-slate-600 text-sm mb-4">Orcha Agent OS is a part of the Orcha Intelligence ecosystem.</p>
        </footer>
      </div>
    </>
  );
}
