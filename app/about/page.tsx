"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";


/* ─── Scroll-reveal hook ─────────────────────────────────────────────── */
function useReveal(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { el.classList.add("visible"); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return ref;
}

/* ─── Data ───────────────────────────────────────────────────────────── */
const WHY_ITEMS = [
  {
    icon: "⚡",
    title: "Fast & Reliable Delivery",
    desc: "Accelerated development cycles to launch your solutions on time and on budget — without cutting corners.",
  },
  {
    icon: "🎯",
    title: "Client-Centric Approach",
    desc: "We tailor every solution to your unique business goals, ensuring maximum impact and long-term value.",
  },
  {
    icon: "🚀",
    title: "Future-Ready Design",
    desc: "Architectures built to scale, evolve, and withstand the test of time as your business grows.",
  },
  {
    icon: "🔒",
    title: "Security-First Mindset",
    desc: "Enterprise-grade security baked in from day one — not patched on at the end.",
  },
  {
    icon: "🤖",
    title: "AI-Powered Innovation",
    desc: "We bring the latest in LLMs, automation, and intelligent agents to give you a competitive edge.",
  },
  {
    icon: "🌐",
    title: "End-to-End Ownership",
    desc: "From product discovery to post-launch support — one partner for your entire technology journey.",
  },
];



/* ─── Page ───────────────────────────────────────────────────────────── */
export default function AboutPage() {
  const heroRef = useReveal();
  const statsRef = useReveal();
  const missionRef = useReveal();
  const valuesRef = useReveal();
  const ctaRef = useReveal();

  return (
    <div className="about-root">
      <style>{`
        /* ── Base ── */
        .about-root {
          background: #08080f;
          color: #e5e7eb;
          overflow: hidden;
          font-family: 'Inter', 'Segoe UI', system-ui, sans-serif;
        }

        /* ── Keyframes ── */
        @keyframes fadeUp   { from{opacity:0;transform:translateY(40px)} to{opacity:1;transform:translateY(0)} }
        @keyframes fadeLeft { from{opacity:0;transform:translateX(-36px)} to{opacity:1;transform:translateX(0)} }
        @keyframes fadeRight{ from{opacity:0;transform:translateX(36px)} to{opacity:1;transform:translateX(0)} }
        @keyframes scaleIn  { from{opacity:0;transform:scale(0.88)} to{opacity:1;transform:scale(1)} }
        @keyframes floatY   { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-14px)} }
        @keyframes gradShift{ 0%{background-position:0% 50%} 50%{background-position:100% 50%} 100%{background-position:0% 50%} }
        @keyframes shimmer  { 0%{background-position:-200% center} 100%{background-position:200% center} }
        @keyframes counter  { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }

        /* ── Reveal classes ── */
        .rv, .rv-l, .rv-r, .rv-s { opacity: 0; }
        .rv.visible   { animation: fadeUp    0.7s cubic-bezier(.22,1,.36,1) forwards; }
        .rv-l.visible { animation: fadeLeft  0.7s cubic-bezier(.22,1,.36,1) forwards; }
        .rv-r.visible { animation: fadeRight 0.7s cubic-bezier(.22,1,.36,1) forwards; }
        .rv-s.visible { animation: scaleIn   0.6s cubic-bezier(.22,1,.36,1) forwards; }
        .d1{animation-delay:.0s!important} .d2{animation-delay:.1s!important}
        .d3{animation-delay:.2s!important} .d4{animation-delay:.3s!important}
        .d5{animation-delay:.4s!important} .d6{animation-delay:.5s!important}

        /* ── HERO ── */
        .hero {
          position: relative;
          min-height: 72vh;
          display: flex; align-items: center; justify-content: center;
          text-align: center;
          padding: 100px 24px 80px;
          overflow: hidden;
          background: linear-gradient(160deg,#0d0d1a 0%,#120a23 40%,#0c0c18 100%);
          background-size: 300% 300%;
          animation: gradShift 14s ease infinite;
        }
        .hero-orb1 {
          position: absolute; top: -80px; left: -80px;
          width: 500px; height: 500px; border-radius: 50%;
          background: radial-gradient(circle, rgba(124,58,237,.22) 0%, transparent 70%);
          filter: blur(40px); pointer-events: none;
          animation: floatY 8s ease-in-out infinite;
        }
        .hero-orb2 {
          position: absolute; bottom: -60px; right: -60px;
          width: 420px; height: 420px; border-radius: 50%;
          background: radial-gradient(circle, rgba(99,102,241,.18) 0%, transparent 70%);
          filter: blur(40px); pointer-events: none;
          animation: floatY 10s ease-in-out infinite reverse;
        }
        .hero-inner { position: relative; z-index: 1; max-width: 800px; }
        .hero-badge {
          display: inline-block; margin-bottom: 20px;
          padding: 4px 16px; border-radius: 999px; font-size: 12px;
          font-weight: 600; letter-spacing: .1em; text-transform: uppercase;
          background: rgba(124,58,237,.15); color: #a78bfa;
          border: 1px solid rgba(124,58,237,.3);
        }
        .hero-title {
          font-size: clamp(36px, 6vw, 68px); font-weight: 800; line-height: 1.1;
          margin-bottom: 20px; letter-spacing: -.02em;
          background: linear-gradient(135deg, #fff 0%, #c4b5fd 45%, #818cf8 100%);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
        }
        .hero-sub {
          font-size: clamp(15px, 2vw, 18px); color: #9ca3af;
          line-height: 1.75; max-width: 640px; margin: 0 auto 36px;
        }
        .hero-cta {
          display: inline-block; padding: 14px 36px; border-radius: 14px;
          background: linear-gradient(135deg, #7c3aed, #4f46e5);
          color: white; font-weight: 700; font-size: 15px;
          text-decoration: none; box-shadow: 0 8px 28px rgba(124,58,237,.4);
          transition: transform .2s, box-shadow .2s;
        }
        .hero-cta:hover { transform: translateY(-3px) scale(1.03); box-shadow: 0 14px 40px rgba(124,58,237,.55); }

        /* ── GLOW DIVIDER ── */
        .glow-line {
          height: 1px;
          background: linear-gradient(to right, transparent, rgba(124,58,237,.5), transparent);
        }



        /* ── STORY / MISSION SECTION ── */
        .story-section { padding: 100px 24px; }
        .story-grid {
          max-width: 1100px; margin: 0 auto;
          display: grid; gap: 64px; align-items: center;
        }
        @media(min-width:768px){ .story-grid { grid-template-columns: 1fr 1fr; } }

        .story-img-wrap { position: relative; }
        .story-img {
          width: 100%; border-radius: 24px; object-fit: cover;
          box-shadow: 0 24px 60px rgba(0,0,0,.5);
          transition: transform .4s, box-shadow .4s;
          border: 1px solid rgba(255,255,255,.07);
        }
        .story-img:hover { transform: scale(1.02) rotate(-0.5deg); box-shadow: 0 32px 80px rgba(124,58,237,.25); }
        .story-img-badge {
          position: absolute; bottom: -18px; right: -18px;
          background: linear-gradient(135deg, #7c3aed, #4f46e5);
          color: white; font-size: 13px; font-weight: 700;
          padding: 12px 20px; border-radius: 14px;
          box-shadow: 0 8px 24px rgba(124,58,237,.4);
        }

        .section-badge {
          display: inline-block; margin-bottom: 16px;
          padding: 3px 14px; border-radius: 999px; font-size: 11px;
          font-weight: 600; letter-spacing: .12em; text-transform: uppercase;
          background: rgba(124,58,237,.1); color: #a78bfa;
          border: 1px solid rgba(124,58,237,.25);
        }
        .section-title {
          font-size: clamp(26px, 4vw, 40px); font-weight: 800;
          line-height: 1.2; margin-bottom: 20px; color: white;
        }
        .section-body { font-size: 16px; color: #9ca3af; line-height: 1.8; }
        .section-body + .section-body { margin-top: 16px; }

        /* Mission / Vision cards */
        .mv-cards { display: flex; flex-direction: column; gap: 20px; margin-top: 36px; }
        .mv-card {
          background: rgba(255,255,255,.04); border: 1px solid rgba(255,255,255,.08);
          border-radius: 18px; padding: 24px;
          transition: border-color .3s, background .3s, transform .3s;
        }
        .mv-card:hover {
          border-color: rgba(124,58,237,.35); background: rgba(124,58,237,.07);
          transform: translateX(6px);
        }
        .mv-card-icon { font-size: 26px; margin-bottom: 10px; }
        .mv-card-title { font-size: 15px; font-weight: 700; color: white; margin-bottom: 6px; }
        .mv-card-body  { font-size: 14px; color: #9ca3af; line-height: 1.7; }

        /* ── WHY SECTION ── */
        .why-section { padding: 100px 24px; background: rgba(255,255,255,.015); }
        .why-section .inner { max-width: 1100px; margin: 0 auto; }
        .why-header { text-align: center; margin-bottom: 60px; }
        .why-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 20px;
        }
        .why-card {
          background: rgba(255,255,255,.04); border: 1px solid rgba(255,255,255,.08);
          border-radius: 20px; padding: 28px 24px;
          transition: transform .3s, border-color .3s, box-shadow .3s;
          position: relative; overflow: hidden;
        }
        .why-card::before {
          content: '';
          position: absolute; top: 0; left: 0; right: 0; height: 2px;
          background: linear-gradient(to right, #7c3aed, #6366f1);
          opacity: 0; transition: opacity .3s;
        }
        .why-card:hover { transform: translateY(-6px); border-color: rgba(124,58,237,.3); box-shadow: 0 16px 40px rgba(0,0,0,.4); }
        .why-card:hover::before { opacity: 1; }
        .why-icon {
          width: 48px; height: 48px; border-radius: 14px;
          background: rgba(124,58,237,.15); font-size: 22px;
          display: flex; align-items: center; justify-content: center;
          margin-bottom: 16px;
          transition: background .3s;
        }
        .why-card:hover .why-icon { background: rgba(124,58,237,.3); }
        .why-title { font-size: 16px; font-weight: 700; color: white; margin-bottom: 8px; }
        .why-desc  { font-size: 14px; color: #9ca3af; line-height: 1.7; }

        /* ── TEAM VISUAL ── */
        .team-section { padding: 100px 24px; }
        .team-grid {
          max-width: 1100px; margin: 0 auto;
          display: grid; gap: 64px; align-items: center;
        }
        @media(min-width:768px){ .team-grid { grid-template-columns: 1fr 1fr; } }
        .team-img { width: 100%; border-radius: 24px; object-fit: cover; border: 1px solid rgba(255,255,255,.07); box-shadow: 0 24px 60px rgba(0,0,0,.5); }

        /* ── CTA ── */
        .cta-section {
          position: relative; padding: 100px 24px; text-align: center; overflow: hidden;
          background: linear-gradient(135deg, #0d0518 0%, #0f0a2a 50%, #0d0518 100%);
        }
        .cta-orb {
          position: absolute; top: 50%; left: 50%; transform: translate(-50%,-50%);
          width: 600px; height: 300px; border-radius: 50%;
          background: radial-gradient(ellipse, rgba(124,58,237,.2) 0%, transparent 70%);
          filter: blur(40px); pointer-events: none;
          animation: floatY 7s ease-in-out infinite;
        }
        .cta-inner { position: relative; z-index: 1; max-width: 640px; margin: 0 auto; }
        .cta-title { font-size: clamp(28px, 4vw, 44px); font-weight: 800; margin-bottom: 16px; color: white; }
        .cta-sub { font-size: 16px; color: #9ca3af; margin-bottom: 36px; line-height: 1.7; }
        .cta-btn {
          display: inline-block; padding: 16px 44px; border-radius: 14px;
          background: white; color: #5b21b6; font-weight: 700; font-size: 15px;
          text-decoration: none; box-shadow: 0 8px 28px rgba(0,0,0,.4);
          transition: transform .2s, box-shadow .2s;
        }
        .cta-btn:hover { transform: translateY(-3px) scale(1.03); box-shadow: 0 14px 40px rgba(0,0,0,.5); }
      `}</style>

      {/* ── Hero ── */}
      <section className="hero">
        <div className="hero-orb1" />
        <div className="hero-orb2" />
        <div ref={heroRef} className="rv hero-inner">
          <span className="hero-badge">Our Story</span>
          <h1 className="hero-title">Building the Future of Business Technology</h1>
          <p className="hero-sub">
            Founded in 2023, Orcha Solutions bridges the gap between complex IT systems and
            human-centric software — leveraging AI, automation, and deep engineering expertise
            to create systems that adapt, learn, and grow with your business.
          </p>
          <Link href="/chat" className="hero-cta">Start a Conversation →</Link>
        </div>
      </section>

      <div className="glow-line" />

      {/* ── Story / Mission ── */}
      <section className="story-section">
        <div className="story-grid">
          {/* Image */}
          <div ref={missionRef} className="rv-l story-img-wrap">
            <img src="/assets/orcha-web.png" alt="Orcha Solutions" className="story-img" />
            <div className="story-img-badge">Est. 2023 🚀</div>
          </div>

          {/* Text */}
          <div ref={missionRef} className="rv-r" style={{ animationDelay: "0.1s" }}>
            <span className="section-badge">Who We Are</span>
            <h2 className="section-title">Empowering Businesses Through Intelligent Technology</h2>
            <p className="section-body">
              At Orcha Solutions, we specialize in designing and implementing custom software and
              IT systems tailored to streamline business workflows, boost efficiency, and foster
              innovation across enterprises of every size.
            </p>
            <p className="section-body">
              We blend deep technical expertise with a genuine understanding of business challenges —
              so you get software that solves real problems, not just impressive demos.
            </p>

            <div className="mv-cards">
              <div className="mv-card">
                <div className="mv-card-icon">🎯</div>
                <div className="mv-card-title">Our Mission</div>
                <div className="mv-card-body">
                  To empower businesses through high-performance software and intelligent systems
                  that drive growth, innovation, and operational excellence.
                </div>
              </div>
              <div className="mv-card">
                <div className="mv-card-icon">🌟</div>
                <div className="mv-card-title">Our Vision</div>
                <div className="mv-card-body">
                  A world where seamless, scalable, and adaptive software ecosystems enable
                  any organisation to thrive in an AI-driven economy.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="glow-line" />

      {/* ── Why Orcha ── */}
      <section className="why-section">
        <div className="inner">
          <div ref={valuesRef} className="rv why-header">
            <span className="section-badge">Why Us</span>
            <h2 className="section-title">Why Orcha Solutions?</h2>
            <p className="section-body" style={{ maxWidth: 520, margin: "0 auto" }}>
              We're not just a vendor we're a long-term technology partner invested in your success.
            </p>
          </div>

          <div className="why-grid">
            {WHY_ITEMS.map((item, i) => {
              // eslint-disable-next-line react-hooks/rules-of-hooks
              const ref = useReveal();
              return (
                <div
                  ref={ref}
                  key={item.title}
                  className={`rv-s why-card d${(i % 4) + 1}`}
                  style={{ animationDelay: `${(i % 3) * 0.12}s` }}
                >
                  <div className="why-icon">{item.icon}</div>
                  <div className="why-title">{item.title}</div>
                  <div className="why-desc">{item.desc}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <div className="glow-line" />

      {/* ── Team Visual ── */}
      <section className="team-section">
        <div className="team-grid">
          <div ref={ctaRef} className="rv-r" style={{ animationDelay: "0.1s" }}>
            <span className="section-badge">The Team</span>
            <h2 className="section-title">People Who Actually Care About Your Outcome</h2>
            <p className="section-body">
              Our team is made up of engineers, architects, and product thinkers with experience
              across fintech, enterprise, and SaaS. We work lean, move fast, and communicate
              honestly — no fluff, no overselling.
            </p>
            <p className="section-body" style={{ marginTop: 16 }}>
              When you work with Orcha, you get direct access to the people building your
              product — not an account manager in the middle.
            </p>
            <Link href="/contacts" style={{
              display: "inline-block", marginTop: 32,
              padding: "12px 28px", borderRadius: "12px", fontSize: 14,
              background: "rgba(124,58,237,.15)", color: "#a78bfa",
              border: "1px solid rgba(124,58,237,.3)", textDecoration: "none",
              fontWeight: 600, transition: "all .2s"
            }}>
              Meet the Team →
            </Link>
          </div>

          <div ref={ctaRef} className="rv-l">
            <img src="/assets/orcha-web.png" alt="Orcha platform" className="team-img" />
          </div>
        </div>
      </section>

      <div className="glow-line" />

      {/* ── CTA ── */}
      <section className="cta-section">
        <div className="cta-orb" />
        <div ref={ctaRef} className="rv cta-inner">
          <h2 className="cta-title">Ready to Build Something Remarkable?</h2>
          <p className="cta-sub">
            Let&apos;s explore how Orcha Solutions can accelerate your next big idea — from
            concept to production-ready software.
          </p>
          <Link href="/chat" className="cta-btn">Start Your Project →</Link>
        </div>
      </section>
    </div>
  );
}
