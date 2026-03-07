"use client";

import { useEffect, useRef } from "react";
import testingIcon from "@/assets/testing.png";
import golangIcon from "@/assets/golang.png";
import pythonIcon from "@/assets/python.png";
import jsIcon from "@/assets/js.png";
import tsIcon from "@/assets/ts.png";
import reactIcon from "@/assets/react.png";
import nextjsIcon from "@/assets/nextjs.png";
import mssqlIcon from "@/assets/mssql.png";
import postgresIcon from "@/assets/postgres.png";
import awsIcon from "@/assets/aws.png";
import azureIcon from "@/assets/azure.png";
import mongoIcon from "@/assets/mongo.png";
import redisIcon from "@/assets/redis.png";
import dockerIcon from "@/assets/docker.png";
import k8sIcon from "@/assets/k8.png";
import scyllaIcon from "@/assets/scylla.png";
import kafkaIcon from "@/assets/kafka.svg";
import rabbitmqIcon from "@/assets/rabbitmq.png";

/* ─── Inline styles / keyframes injected once ───────────────────────── */
const GlobalStyles = () => (
  <style>{`
    @keyframes gradientShift {
      0%   { background-position: 0% 50%; }
      50%  { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }
    @keyframes floatY {
      0%, 100% { transform: translateY(0px); }
      50%       { transform: translateY(-8px); }
    }
    @keyframes pulse-ring {
      0%   { box-shadow: 0 0 0 0 rgba(168,85,247,0.4); }
      70%  { box-shadow: 0 0 0 18px rgba(168,85,247,0); }
      100% { box-shadow: 0 0 0 0 rgba(168,85,247,0); }
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
      from { opacity: 0; transform: scale(0.85); }
      to   { opacity: 1; transform: scale(1); }
    }
    @keyframes connectorGrow {
      from { width: 0; }
      to   { width: 100%; }
    }

    .animate-gradient-bg {
      background: linear-gradient(270deg, #1a0533, #0f172a, #1e1b4b, #0f172a, #1a0533);
      background-size: 400% 400%;
      animation: gradientShift 12s ease infinite;
    }
    .animate-float {
      animation: floatY 4s ease-in-out infinite;
    }
    .animate-pulse-ring {
      animation: pulse-ring 2.5s ease-out infinite;
    }

    /* Scroll-reveal defaults */
    .reveal         { opacity: 0; }
    .reveal.visible { animation: fadeSlideUp   0.65s cubic-bezier(.22,1,.36,1) forwards; }

    .reveal-left        { opacity: 0; }
    .reveal-left.visible { animation: fadeSlideLeft 0.65s cubic-bezier(.22,1,.36,1) forwards; }

    .reveal-scale        { opacity: 0; }
    .reveal-scale.visible { animation: scaleIn 0.55s cubic-bezier(.22,1,.36,1) forwards; }

    /* Stagger delays for child cards */
    .stagger-1 { animation-delay: 0s !important; }
    .stagger-2 { animation-delay: 0.12s !important; }
    .stagger-3 { animation-delay: 0.24s !important; }
    .stagger-4 { animation-delay: 0.36s !important; }

    /* Tool icon hover */
    .tool-icon {
      transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
    }
    .tool-icon:hover {
      transform: translateY(-6px) scale(1.12);
      box-shadow: 0 12px 32px rgba(168,85,247,0.35);
      border-color: rgba(168,85,247,0.6);
    }

    /* Process step card hover */
    .step-card {
      transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
    }
    .step-card:hover {
      transform: translateY(-6px);
      box-shadow: 0 16px 40px rgba(168,85,247,0.2);
      border-color: rgba(168,85,247,0.4);
    }

    /* Connector line between steps */
    .connector-line {
      height: 2px;
      background: linear-gradient(to right, #7c3aed, #a78bfa, #7c3aed);
      background-size: 200%;
      animation: gradientShift 3s linear infinite;
      border-radius: 999px;
    }
  `}</style>
);

/* ─── Intersection-observer hook ─────────────────────────────────────── */
function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add("visible"); observer.disconnect(); } },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return ref;
}

/* ─── SVG Icons ─────────────────────────────────────────────────────── */
const PlanDiscoverIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeWidth="2"
    strokeLinecap="round" strokeLinejoin="round"
    className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-purple-900/40 p-3 text-purple-400"
    viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" />
  </svg>
);
const DesignArchitectIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeWidth="2"
    strokeLinecap="round" strokeLinejoin="round"
    className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-blue-900/40 p-3 text-blue-400"
    viewBox="0 0 24 24">
    <rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18" /><path d="M9 21V9" />
  </svg>
);
const DevelopIntegrateIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeWidth="2"
    strokeLinecap="round" strokeLinejoin="round"
    className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-emerald-900/40 p-3 text-emerald-400"
    viewBox="0 0 24 24">
    <path d="M16 18l6-6-6-6" /><path d="M8 6l-6 6 6 6" />
  </svg>
);
const TestLaunchIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeWidth="2"
    strokeLinecap="round" strokeLinejoin="round"
    className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-orange-900/40 p-3 text-orange-400"
    viewBox="0 0 24 24">
    <path d="M5 3l14 9-14 9V3z" />
  </svg>
);

/* ─── Page ───────────────────────────────────────────────────────────── */
export default function SoftwareDevelopmentPage() {
  const tools = [
    { name: "Golang", icon: golangIcon },
    { name: "Python", icon: pythonIcon },
    { name: "JavaScript", icon: jsIcon },
    { name: "TypeScript", icon: tsIcon },
    { name: "React", icon: reactIcon },
    { name: "Next JS", icon: nextjsIcon },
    { name: "MSSQL", icon: mssqlIcon },
    { name: "Postgres", icon: postgresIcon },
    { name: "AWS", icon: awsIcon },
    { name: "Azure", icon: azureIcon },
    { name: "Mongo", icon: mongoIcon },
    { name: "Redis", icon: redisIcon },
    { name: "Docker", icon: dockerIcon },
    { name: "Kubernetes", icon: k8sIcon },
    { name: "Scylla", icon: scyllaIcon },
    { name: "Kafka", icon: kafkaIcon },
    { name: "RabbitMQ", icon: rabbitmqIcon },
  ];

  const steps = [
    { title: "Plan & Discover", desc: "We begin with deep research to fully understand your goals and challenges.", icon: <PlanDiscoverIcon />, stagger: "stagger-1" },
    { title: "Design & Architect", desc: "We craft a solid blueprint for your solution with a focus on scalability and UX.", icon: <DesignArchitectIcon />, stagger: "stagger-2" },
    { title: "Develop & Integrate", desc: "We build robust, high-performance applications with seamless integrations.", icon: <DevelopIntegrateIcon />, stagger: "stagger-3" },
    { title: "Test & Launch", desc: "We rigorously test and deploy your solution for optimal performance.", icon: <TestLaunchIcon />, stagger: "stagger-4" },
  ];

  // Individual reveal refs for each section
  const heroRef = useReveal();
  const processRef = useReveal();
  const toolchainRef = useReveal();
  const ctaRef = useReveal();

  return (
    <div className="bg-gray-950 text-white overflow-hidden">
      <GlobalStyles />

      {/* ── Hero ── */}
      <section className="relative py-32 px-6 text-center animate-gradient-bg overflow-hidden">
        {/* Floating orbs */}
        <div className="absolute top-10 left-10 w-72 h-72 bg-purple-700/20 rounded-full blur-3xl animate-float pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-64 h-64 bg-blue-700/20 rounded-full blur-3xl animate-float pointer-events-none" style={{ animationDelay: "2s" }} />

        <div ref={heroRef} className="reveal relative max-w-4xl mx-auto">
          <span className="inline-block mb-4 px-4 py-1 rounded-full text-xs font-semibold tracking-widest uppercase bg-purple-500/10 text-purple-300 border border-purple-500/20">
            Software Development
          </span>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent">
              Custom Software{" "}
            </span>
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Development
            </span>
          </h1>
          <p className="text-lg text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            We design and build modern, scalable, and secure applications tailored to your business goals.
            From concept to deployment, we deliver solutions that perform, engage, and grow with your needs.
          </p>
          <a
            href="/contact"
            className="inline-block animate-pulse-ring px-8 py-3 bg-gradient-to-r from-purple-500 to-purple-700 rounded-lg shadow-lg font-semibold hover:opacity-90 hover:scale-105 transition-transform duration-200"
          >
            Start Your Project →
          </a>
        </div>
      </section>

      {/* ── How We Work ── */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div ref={processRef} className="reveal text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-3">How We Work</h2>
            <p className="text-gray-400 max-w-xl mx-auto">A proven process that turns your vision into reality — on time and on budget.</p>
          </div>

          {/* Steps grid with connector lines on desktop */}
          <div className="relative grid md:grid-cols-4 gap-6">
            {/* Connector line (desktop only) */}
            <div className="hidden md:block absolute top-[70px] left-[12.5%] right-[12.5%] z-0">
              <div className="connector-line" />
            </div>

            {steps.map((step, i) => {
              // eslint-disable-next-line react-hooks/rules-of-hooks
              const ref = useReveal();
              return (
                <div
                  ref={ref}
                  key={step.title}
                  className={`reveal-scale step-card relative z-10 bg-gray-900 rounded-2xl p-6 text-center border border-gray-800 ${step.stagger}`}
                  style={{ animationDelay: `${i * 0.12}s` }}
                >
                  <div className="relative inline-block">
                    {step.icon}
                    <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-purple-600 text-white text-xs font-bold flex items-center justify-center shadow-lg">
                      {i + 1}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{step.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── ToolChain ── */}
      <section className="py-24 px-6 bg-gray-900/40">
        <div className="max-w-6xl mx-auto text-center">
          <div ref={toolchainRef} className="reveal mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-3">ToolChain</h2>
            <p className="text-gray-400 max-w-lg mx-auto">
              We handpick the most powerful and battle-tested tools to accelerate your success.
            </p>
          </div>

          <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-9 gap-4 justify-items-center">
            {tools.map(({ name, icon }, i) => {
              // eslint-disable-next-line react-hooks/rules-of-hooks
              const ref = useReveal();
              return (
                <div
                  ref={ref}
                  key={name}
                  title={name}
                  className="reveal-scale tool-icon rounded-2xl bg-gray-900 border border-gray-800 w-16 h-16 flex items-center justify-center cursor-default shadow-md"
                  style={{ animationDelay: `${i * 0.04}s` }}
                >
                  <img src={icon.src} alt={name} className="w-9 h-9 object-contain" />
                </div>
              );
            })}
          </div>

          {/* Tool name labels row (visible on hover via parent title) */}
          <p className="mt-6 text-xs text-gray-600">Hover an icon to see the technology name</p>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="relative py-24 px-6 text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/60 via-purple-800/60 to-blue-900/60 pointer-events-none" />
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-purple-700/20 rounded-full blur-3xl pointer-events-none animate-float" />

        <div ref={ctaRef} className="reveal relative max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Let&apos;s Build Something Exceptional Together</h2>
          <p className="text-gray-300 mb-8 leading-relaxed">
            Partner with us to create high-performance, secure, and scalable software solutions.
          </p>
          <a
            href="/contact"
            className="inline-block px-10 py-4 bg-white text-purple-700 font-semibold rounded-xl shadow-xl hover:bg-gray-100 hover:scale-105 transition-all duration-200"
          >
            Start Your Project Today →
          </a>
        </div>
      </section>
    </div>
  );
}
