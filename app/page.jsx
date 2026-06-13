"use client";

import { useEffect, useRef } from "react";
import { HeroSection } from "@/components/ui/hero-section";
import Link from "next/link";
import {
  ClipboardList,
  Code2,
  Cog,
  FlaskConical,
  Rocket,
  CheckCircle2,
} from "lucide-react";
import pod from "@/assets/orcas-working.png";

/* ─── Global keyframes ───────────────────────────────────────────────── */
const GlobalStyles = () => (
  <style>{`
    @keyframes fadeSlideUp {
      from { opacity: 0; transform: translateY(36px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes fadeSlideRight {
      from { opacity: 0; transform: translateX(-36px); }
      to   { opacity: 1; transform: translateX(0); }
    }
    @keyframes fadeSlideLeft {
      from { opacity: 0; transform: translateX(36px); }
      to   { opacity: 1; transform: translateX(0); }
    }
    @keyframes scaleIn {
      from { opacity: 0; transform: scale(0.88); }
      to   { opacity: 1; transform: scale(1); }
    }
    @keyframes shimmer {
      0%   { background-position: -200% center; }
      100% { background-position:  200% center; }
    }
    @keyframes floatY {
      0%, 100% { transform: translateY(0); }
      50%       { transform: translateY(-10px); }
    }
    @keyframes marquee {
      from { transform: translateX(0); }
      to   { transform: translateX(-50%); }
    }
    @keyframes sonarRing {
      0%   { transform: scale(1);   opacity: 0.55; }
      100% { transform: scale(3.4); opacity: 0; }
    }
    @keyframes bubbleRise {
      0%   { transform: translateY(0) translateX(0); opacity: 0; }
      10%  { opacity: 0.5; }
      90%  { opacity: 0.5; }
      100% { transform: translateY(-110vh) translateX(24px); opacity: 0; }
    }
    @keyframes dashFlow {
      to { stroke-dashoffset: -64; }
    }

    /* Reveal base states */
    .rv       { opacity: 0; }
    .rv-r     { opacity: 0; }
    .rv-l     { opacity: 0; }
    .rv-scale { opacity: 0; }

    .rv.in        { animation: fadeSlideUp    0.7s cubic-bezier(.22,1,.36,1) forwards; }
    .rv-r.in      { animation: fadeSlideRight 0.7s cubic-bezier(.22,1,.36,1) forwards; }
    .rv-l.in      { animation: fadeSlideLeft  0.7s cubic-bezier(.22,1,.36,1) forwards; }
    .rv-scale.in  { animation: scaleIn        0.6s cubic-bezier(.22,1,.36,1) forwards; }

    .d1 { animation-delay: 0s    !important; }
    .d2 { animation-delay: 0.12s !important; }
    .d3 { animation-delay: 0.24s !important; }
    .d4 { animation-delay: 0.36s !important; }
    .d5 { animation-delay: 0.48s !important; }

    /* Tech marquee */
    .marquee-track {
      display: flex;
      width: max-content;
      animation: marquee 36s linear infinite;
    }
    .marquee-mask {
      mask-image: linear-gradient(to right, transparent, black 12%, black 88%, transparent);
      -webkit-mask-image: linear-gradient(to right, transparent, black 12%, black 88%, transparent);
    }

    /* Pipeline cards */
    .stage-card {
      transition: transform 0.35s ease, box-shadow 0.35s ease, border-color 0.35s ease;
    }
    .stage-card:hover {
      transform: translateY(-8px);
      border-color: rgba(192, 132, 252, 0.6);
      box-shadow: 0 18px 44px rgba(168, 85, 247, 0.22);
    }
    .stage-card:hover .stage-icon {
      transform: scale(1.12);
      color: #f0abfc;
    }
    .stage-icon { transition: transform 0.35s ease, color 0.35s ease; }

    /* About image */
    .about-img {
      transition: transform 0.4s ease, box-shadow 0.4s ease;
    }
    .about-img:hover {
      transform: scale(1.03) rotate(-0.5deg);
      box-shadow: 0 24px 60px rgba(168,85,247,0.25);
    }

    /* Offer cards */
    .offer-card {
      transition: transform 0.35s ease, box-shadow 0.35s ease;
    }
    .offer-card:hover {
      transform: translateY(-8px) scale(1.02);
      box-shadow: 0 20px 50px rgba(0,0,0,0.5);
    }
    .offer-card img.thumb {
      transition: transform 0.5s ease;
    }
    .offer-card:hover img.thumb {
      transform: scale(1.08);
    }
    .card-title-shimmer {
      background: linear-gradient(90deg, #c084fc, #f472b6, #a855f7, #c084fc);
      background-size: 300% auto;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      animation: shimmer 4s linear infinite;
    }

    /* Sonar CTA */
    .sonar-ring {
      position: absolute;
      inset: 0;
      border-radius: 9999px;
      border: 1.5px solid rgba(192, 132, 252, 0.55);
      animation: sonarRing 3.2s ease-out infinite;
      pointer-events: none;
    }
    .contact-btn {
      transition: transform 0.25s ease, background 0.25s ease, box-shadow 0.25s ease;
    }
    .contact-btn:hover {
      transform: translateY(-3px) scale(1.04);
      box-shadow: 0 10px 40px rgba(168,85,247,0.35);
    }

    /* Floating orbs + bubbles */
    .orb-float { animation: floatY 6s ease-in-out infinite; }
    .orb-float-slow { animation: floatY 9s ease-in-out infinite; }
    .bubble {
      position: absolute;
      bottom: -3vh;
      border-radius: 9999px;
      border: 1px solid rgba(192, 132, 252, 0.35);
      animation: bubbleRise linear infinite;
      pointer-events: none;
    }

    .glow-divider {
      height: 1px;
      background: linear-gradient(to right, transparent, rgba(168,85,247,0.5), transparent);
    }

    .dash-flow { animation: dashFlow 2.2s linear infinite; }

    @media (prefers-reduced-motion: reduce) {
      .marquee-track, .sonar-ring, .bubble, .orb-float, .orb-float-slow,
      .card-title-shimmer, .dash-flow { animation: none !important; }
      .rv, .rv-r, .rv-l, .rv-scale { opacity: 1 !important; animation: none !important; }
    }
  `}</style>
);

/* ─── Intersection observer hook ─────────────────────────────────────── */
function useReveal(cls = "in") {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { el.classList.add(cls); obs.disconnect(); } },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [cls]);
  return ref;
}

/* ─── Data ───────────────────────────────────────────────────────────── */
const TECHS = [
  "Next.js", "React", "TypeScript", "Tailwind CSS", "Python",
  "LangChain", "Node.js", "PostgreSQL", "Docker", "Vercel AI SDK",
  "Framer Motion", "Zod",
];

const STAGES = [
  { icon: ClipboardList, title: "Plan",   text: "The pod maps the route — scope, architecture, and milestones charted before we dive." },
  { icon: Code2,         title: "Code",   text: "Clean, typed, modern code on stacks like Next.js, React, and Python." },
  { icon: Cog,           title: "Build",  text: "Automated pipelines compile, lint, and package every commit." },
  { icon: FlaskConical,  title: "Test",   text: "Nothing ships until every check swims green — unit, integration, end-to-end." },
  { icon: Rocket,        title: "Deploy", text: "Zero-downtime releases, monitored around the clock by the pod." },
];

const OFFERS = [
  {
    title: "Orcha AI",
    href: "/products/orcha-ai",
    img: "/assets/art/ai-card.webp",
    text: "Build LLM-powered workflows without writing a single line of code — automation and smarter decisions out of the box.",
    tags: ["LangChain", "No-code", "Automation"],
  },
  {
    title: "Software Development",
    href: "/products/software-development",
    img: "/assets/art/dev-card.webp",
    text: "End-to-end software design and development — from first concept to production deployment.",
    tags: ["Next.js", "Python", "Cloud"],
  },
  {
    title: "Orcha Agent OS",
    href: "/products/orcha-agent-os",
    img: "/os/os1.png",
    text: "The semantic operating system for multi-tenant AI agents — command, observe, and scale your fleet.",
    tags: ["Agents", "Multi-tenant", "Semantic OS"],
  },
];

const BUBBLES = [
  { left: "6%",  size: 10, dur: 16, delay: 0 },
  { left: "18%", size: 6,  dur: 21, delay: 4 },
  { left: "33%", size: 14, dur: 18, delay: 9 },
  { left: "52%", size: 8,  dur: 24, delay: 2 },
  { left: "68%", size: 12, dur: 17, delay: 11 },
  { left: "81%", size: 7,  dur: 22, delay: 6 },
  { left: "93%", size: 9,  dur: 19, delay: 14 },
];

/* ─── Page ───────────────────────────────────────────────────────────── */
export default function Home() {
  const stagesHeadRef = useReveal();
  const stageRefs = [useReveal(), useReveal(), useReveal(), useReveal(), useReveal()];
  const aboutImgRef = useReveal();
  const aboutTextRef = useReveal();
  const offerHeadRef = useReveal();
  const offerRefs = [useReveal(), useReveal(), useReveal()];
  const contactRef = useReveal();

  return (
    <main className="bg-gray-900 overflow-hidden">
      <GlobalStyles />
      {/* without JS the reveal classes would hide everything below the hero */}
      <noscript>
        <style>{`.rv, .rv-r, .rv-l, .rv-scale { opacity: 1 !important; }`}</style>
      </noscript>

      {/* ── Hero — the pod orchestrating, live ── */}
      <HeroSection />

      {/* ── Tech current: the stack drifting by ── */}
      <section className="relative py-10 bg-gray-900 border-y border-purple-500/10">
        <p className="text-center text-[11px] font-mono tracking-[0.35em] uppercase text-purple-300/60 mb-6">
          Technologies in the current
        </p>
        <div className="marquee-mask overflow-hidden">
          <div className="marquee-track">
            {[...TECHS, ...TECHS].map((t, i) => (
              <span
                key={i}
                aria-hidden={i >= TECHS.length || undefined}
                className="flex items-center gap-3 px-7 text-gray-400 font-mono text-base whitespace-nowrap"
              >
                <span aria-hidden="true" className="text-purple-500/70">⬡</span> {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── How we Orcha-strate (mirrors the hero video pipeline) ── */}
      <section className="relative py-28 bg-gray-950 px-6 overflow-hidden">
        {/* rising bubbles */}
        {BUBBLES.map((b, i) => (
          <span
            key={i}
            className="bubble"
            style={{
              left: b.left,
              width: b.size,
              height: b.size,
              animationDuration: `${b.dur}s`,
              animationDelay: `${b.delay}s`,
            }}
          />
        ))}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-purple-800/10 rounded-full blur-3xl orb-float-slow pointer-events-none" />

        <div className="max-w-6xl mx-auto relative">
          <div ref={stagesHeadRef} className="rv text-center mb-16">
            <span className="inline-block mb-3 px-3 py-1 rounded-full text-xs font-semibold tracking-widest uppercase bg-purple-500/10 text-purple-300 border border-purple-500/20">
              The Method
            </span>
            <h2 className="text-4xl font-bold text-white">How We Orcha-strate</h2>
            <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
              Five stages, one pod, zero dropped handoffs — exactly the pipeline
              the orcas run in the video above.
            </p>
          </div>

          {/* connector line */}
          <div className="hidden lg:block absolute left-8 right-8 top-[316px] h-px pointer-events-none">
            <svg width="100%" height="2">
              <line
                x1="0" y1="1" x2="100%" y2="1"
                stroke="rgba(168,85,247,0.35)" strokeWidth="2"
                strokeDasharray="6 10"
                className="dash-flow"
              />
            </svg>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-5 relative">
            {STAGES.map((s, i) => {
              const Icon = s.icon;
              return (
                <div key={s.title} ref={stageRefs[i]} className={`rv-scale d${i + 1}`}>
                  <div className="stage-card h-full rounded-2xl bg-gray-900/80 border border-gray-800 p-6 text-center backdrop-blur-sm">
                    <div className="relative inline-flex items-center justify-center w-14 h-14 rounded-full bg-purple-500/10 border border-purple-500/30 mb-5">
                      <Icon className="stage-icon w-6 h-6 text-purple-300" />
                      <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-gray-950 border border-purple-500/40 text-[10px] font-mono text-purple-300 flex items-center justify-center">
                        {i + 1}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">{s.title}</h3>
                    <p className="text-sm text-gray-400 leading-relaxed">{s.text}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <div className="glow-divider" />

      {/* ── Meet the Pod ── */}
      <section id="pod" className="relative py-28 bg-gray-900 text-white px-6 overflow-hidden">
        <div className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-purple-700/10 rounded-full blur-3xl orb-float pointer-events-none" />
        <div className="absolute -bottom-32 -right-32 w-[400px] h-[400px] bg-indigo-700/10 rounded-full blur-3xl orb-float-slow pointer-events-none" />

        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-14 items-center relative">
          <div ref={aboutImgRef} className="rv-r flex justify-center relative">
            <div className="relative">
              <img
                src={pod.src}
                width={pod.width}
                height={pod.height}
                alt="The Orcha pod at work"
                className="about-img rounded-2xl shadow-2xl max-w-full h-auto border border-gray-800"
              />
              <span className="absolute -bottom-4 -right-4 px-4 py-2 rounded-xl bg-gray-950/90 border border-purple-500/30 text-xs font-mono text-purple-200 shadow-lg">
                ● pod status: deploying
              </span>
            </div>
          </div>

          <div ref={aboutTextRef} className="rv-l">
            <span className="inline-block mb-3 px-3 py-1 rounded-full text-xs font-semibold tracking-widest uppercase bg-purple-500/10 text-purple-300 border border-purple-500/20">
              Who We Are
            </span>
            <h2 className="text-4xl font-bold mb-6 leading-tight">About Us</h2>
            <p className="text-lg text-gray-400 leading-relaxed mb-7">
              At Orcha Solutions, we specialize in designing and implementing custom software and IT
                     systems tailored to streamline business workflows, boost efficiency, and foster
                     innovation across enterprises.
            </p>
            <ul className="space-y-3 mb-9">
              {[
                "Custom software & IT systems, tailored to your workflows",
                "AI-powered automation that cuts the manual effort",
                "Enterprise integrations built to scale",
              ].map((line) => (
                <li key={line} className="flex items-start gap-3 text-gray-300">
                  <CheckCircle2 className="w-5 h-5 text-purple-400 mt-0.5 shrink-0" />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
            <Link
              href="/about"
              className="inline-block px-7 py-3.5 bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 text-white rounded-xl shadow-lg hover:opacity-90 hover:scale-105 transition-all duration-200 font-semibold"
            >
              Learn More About Us →
            </Link>
          </div>
        </div>
      </section>

      <div className="glow-divider" />

      {/* ── What We Offer ── */}
      <section className="relative py-28 bg-gray-950 px-6 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-purple-800/10 rounded-full blur-3xl orb-float-slow pointer-events-none" />

        <div className="max-w-6xl mx-auto">
          <div ref={offerHeadRef} className="rv text-center mb-14">
            <span className="inline-block mb-3 px-3 py-1 rounded-full text-xs font-semibold tracking-widest uppercase bg-purple-500/10 text-purple-300 border border-purple-500/20">
              Services
            </span>
            <h2 className="text-4xl font-bold text-white">What We Offer</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-7">
            {OFFERS.map((o, i) => (
              <div key={o.title} ref={offerRefs[i]} className={`rv-scale d${i + 1}`}>
                <Link href={o.href} className="block h-full">
                  <div className="offer-card relative h-full rounded-2xl overflow-hidden shadow-xl group border border-gray-800 bg-gray-900">
                    <div className="h-48 overflow-hidden">
                      <img
                        src={o.img}
                        alt=""
                        className="thumb w-full h-full object-cover"
                      />
                    </div>
                    <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-transparent to-gray-900/90 pointer-events-none" />
                    <div className="p-7 pt-4">
                      <h3 className="text-2xl font-semibold mb-3 card-title-shimmer">
                        {o.title}
                      </h3>
                      <p className="text-gray-400 text-sm mb-5 leading-relaxed">
                        {o.text}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {o.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-3 py-1 rounded-full text-[11px] font-mono bg-purple-500/10 text-purple-300 border border-purple-500/25 group-hover:border-purple-400/60 transition-colors duration-200"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="glow-divider" />

      {/* ── Ping the Pod ── */}
      <section className="relative py-32 bg-gray-900 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/10 via-transparent to-transparent pointer-events-none" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-purple-700/10 rounded-full blur-3xl orb-float pointer-events-none" />

        <div ref={contactRef} className="rv relative max-w-4xl mx-auto text-center">
          <span className="inline-block mb-3 px-3 py-1 rounded-full text-xs font-semibold tracking-widest uppercase bg-purple-500/10 text-purple-300 border border-purple-500/20">
            Get In Touch
          </span>
          <h2 className="text-4xl font-bold mb-4 text-white">Contact Us</h2>
          <p className="text-lg text-gray-400 mb-12 max-w-lg mx-auto leading-relaxed">
            Have a project in mind? Let&apos;s talk — our team is ready to bring your vision to life
                  with Orcha&apos;s expertise.
               </p>

          {/* sonar button */}
          <div className="relative inline-block">
            <span className="sonar-ring" style={{ animationDelay: "0s" }} />
            <span className="sonar-ring" style={{ animationDelay: "1.1s" }} />
            <span className="sonar-ring" style={{ animationDelay: "2.2s" }} />
            <Link
              href="/contacts"
              className="contact-btn relative inline-block px-12 py-4 bg-gradient-to-r from-purple-600 to-pink-500 rounded-full text-white font-semibold shadow-lg shadow-purple-600/30"
            >
              Get in Touch →
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
