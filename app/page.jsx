"use client";

import { useEffect, useRef } from "react";
import { HeroSection } from "@/components/ui/hero-section";
import { AppleCarousel } from "@/components/ui/aceternity/apple-carousel";
import Link from "next/link";
import city from "@/assets/orcas-working.png";

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
    @keyframes pulseGlow {
      0%, 100% { box-shadow: 0 0 0 0 rgba(168,85,247,0); }
      50%       { box-shadow: 0 0 30px 6px rgba(168,85,247,0.25); }
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

    .d1 { animation-delay: 0s   !important; }
    .d2 { animation-delay: 0.14s !important; }
    .d3 { animation-delay: 0.28s !important; }

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
    /* Purple shimmer on card title */
    .card-title-shimmer {
      background: linear-gradient(90deg, #c084fc, #f472b6, #a855f7, #c084fc);
      background-size: 300% auto;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      animation: shimmer 4s linear infinite;
    }

    /* Contact section */
    .contact-btn {
      transition: transform 0.25s ease, background 0.25s ease, box-shadow 0.25s ease;
    }
    .contact-btn:hover {
      transform: translateY(-3px) scale(1.04);
      background: #374151;
      box-shadow: 0 10px 30px rgba(168,85,247,0.2);
    }

    /* Floating orbs */
    .orb-float { animation: floatY 6s ease-in-out infinite; }
    .orb-float-slow { animation: floatY 9s ease-in-out infinite; }

    /* Section divider glow line */
    .glow-divider {
      height: 1px;
      background: linear-gradient(to right, transparent, rgba(168,85,247,0.5), transparent);
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

export default function Home() {
   const aboutImgRef = useReveal();
   const aboutTextRef = useReveal();
   const offerHeadRef = useReveal();
   const card1Ref = useReveal();
   const card2Ref = useReveal();
   const contactRef = useReveal();

   return (
      <main className="bg-gray-900 overflow-hidden">
         <GlobalStyles />

         {/* ── Hero (unchanged — already has video + animations) ── */}
         <HeroSection />

         {/* ── Glow divider ── */}
         <div className="glow-divider" />

         {/* ── About Us ── */}
         <section className="relative py-28 bg-gray-900 text-white px-6 overflow-hidden">
            {/* Background orbs */}
            <div className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-purple-700/10 rounded-full blur-3xl orb-float pointer-events-none" />
            <div className="absolute -bottom-32 -right-32 w-[400px] h-[400px] bg-indigo-700/10 rounded-full blur-3xl orb-float-slow pointer-events-none" />

            <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-14 items-center relative">
               {/* Image */}
               <div ref={aboutImgRef} className="rv-r flex justify-center">
                  <img
                     src={city.src}
                     alt="About Orcha Solutions"
                     className="about-img rounded-2xl shadow-2xl max-w-full h-auto border border-gray-800"
                  />
               </div>

               {/* Text */}
               <div ref={aboutTextRef} className="rv-l">
                  <span className="inline-block mb-3 px-3 py-1 rounded-full text-xs font-semibold tracking-widest uppercase bg-purple-500/10 text-purple-300 border border-purple-500/20">
                     Who We Are
                  </span>
                  <h2 className="text-4xl font-bold mb-6 leading-tight">About Us</h2>
                  <p className="text-lg text-gray-400 leading-relaxed mb-8">
                     At Orcha Solutions, we specialize in designing and implementing custom software and IT
                     systems tailored to streamline business workflows, boost efficiency, and foster
                     innovation across enterprises.
                  </p>
                  <Link
                     href="/about"
                     className="inline-block px-7 py-3.5 bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 text-white rounded-xl shadow-lg hover:opacity-90 hover:scale-105 transition-all duration-200 font-semibold"
                  >
                     Learn More About Us →
                  </Link>
               </div>
            </div>
         </section>

         {/* ── Glow divider ── */}
         <div className="glow-divider" />

         {/* ── What We Offer ── */}
         <section className="relative py-28 bg-gray-950 px-6 overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-purple-800/10 rounded-full blur-3xl orb-float-slow pointer-events-none" />

            <div className="max-w-6xl mx-auto">
               {/* Heading */}
               <div ref={offerHeadRef} className="rv text-center mb-14">
                  <span className="inline-block mb-3 px-3 py-1 rounded-full text-xs font-semibold tracking-widest uppercase bg-purple-500/10 text-purple-300 border border-purple-500/20">
                     Services
                  </span>
                  <h2 className="text-4xl font-bold text-white">What We Offer</h2>
               </div>

               <div className="grid md:grid-cols-2 gap-8">
                  {/* Card 1 — Orcha AI */}
                  <div ref={card1Ref} className="rv-scale d1">
                     <div className="offer-card relative rounded-2xl overflow-hidden shadow-xl group border border-gray-800">
                        <img
                           src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS80siuuB3YJAUlZUmYntQbhcdi0MAk_C2UlQ&s"
                           alt="Orcha AI"
                           className="thumb w-full h-72 object-cover"
                        />
                        <div className="absolute inset-0 bg-black/60 group-hover:bg-black/70 transition-all duration-300" />
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
                           <h3 className="text-2xl font-semibold mb-3 card-title-shimmer">Orcha AI</h3>
                           <p className="text-gray-300 text-sm mb-6 max-w-xs leading-relaxed">
                              With the power of LangChain to streamline workflows, reduce manual effort, and
                              improve decision-making without writing a single line of code.
                           </p>
                           <div className="flex gap-3">
                              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBdcgkdcDy5z4PYGx_kDJB1AvvC_x1pCBbbQ&s" alt="Automation" className="w-11 h-11 rounded-full bg-gray-800/80 p-2 border border-gray-700 hover:border-purple-500 hover:scale-110 transition-all duration-200" />
                              <img src="https://ollama.com/public/assets/c889cc0d-cb83-4c46-a98e-0d0e273151b9/42f6b28d-9117-48cd-ac0d-44baaf5c178e.png" alt="AI Brain" className="w-11 h-11 rounded-full bg-gray-800/80 p-2 border border-gray-700 hover:border-purple-500 hover:scale-110 transition-all duration-200" />
                              <img src="https://images.prismic.io/sacra/5ca9181a-72f8-4318-a3a1-559909422df0_jkfgwrdiiofil1gzivih.webp?auto=compress,format" alt="Analytics" className="w-11 h-11 rounded-full bg-gray-800/80 p-2 border border-gray-700 hover:border-purple-500 hover:scale-110 transition-all duration-200" />
                           </div>
                        </div>
                     </div>
                  </div>

                  {/* Card 2 — Software Development */}
                  <div ref={card2Ref} className="rv-scale d2">
                     <div className="offer-card relative rounded-2xl overflow-hidden shadow-xl group border border-gray-800">
                        <img
                           src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8YN2m0dPdMlXyX4r74veeLMIHS1gRrIuFMg&s"
                           alt="Software Development"
                           className="thumb w-full h-72 object-cover"
                        />
                        <div className="absolute inset-0 bg-black/60 group-hover:bg-black/70 transition-all duration-300" />
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
                           <h3 className="text-2xl font-semibold mb-3 card-title-shimmer">Software Development</h3>
                           <p className="text-gray-300 text-sm mb-6 max-w-xs leading-relaxed">
                              End-to-end software design and development — from concept to deployment.
                           </p>
                           <div className="flex gap-3">
                              <img src="https://img.icons8.com/?size=512&id=44442&format=png" alt="Integration" className="w-11 h-11 rounded-full bg-gray-800/80 p-2 border border-gray-700 hover:border-purple-500 hover:scale-110 transition-all duration-200" />
                              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKfxxgtvjoywpYYFjqCM2IByvFIxA6n40Wtw&s" alt="Database" className="w-11 h-11 rounded-full bg-gray-800/80 p-2 border border-gray-700 hover:border-purple-500 hover:scale-110 transition-all duration-200" />
                              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Python-logo-notext.svg/1200px-Python-logo-notext.svg.png" alt="Cloud" className="w-11 h-11 rounded-full bg-gray-800/80 p-2 border border-gray-700 hover:border-purple-500 hover:scale-110 transition-all duration-200" />
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </section>

         {/* ── Glow divider ── */}
         <div className="glow-divider" />

         {/* ── Contact ── */}
         <section className="relative py-28 bg-gray-900 px-6 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-purple-900/10 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-purple-700/10 rounded-full blur-3xl orb-float pointer-events-none" />

            <div ref={contactRef} className="rv relative max-w-4xl mx-auto text-center">
               <span className="inline-block mb-3 px-3 py-1 rounded-full text-xs font-semibold tracking-widest uppercase bg-purple-500/10 text-purple-300 border border-purple-500/20">
                  Get In Touch
               </span>
               <h2 className="text-4xl font-bold mb-4 text-white">Contact Us</h2>
               <p className="text-lg text-gray-400 mb-8 max-w-lg mx-auto leading-relaxed">
                  Have a project in mind? Let&apos;s talk — our team is ready to bring your vision to life
                  with Orcha&apos;s expertise.
               </p>
               <a
                  href="/contacts"
                  className="contact-btn inline-block px-10 py-4 bg-gray-800 rounded-xl text-white font-semibold border border-gray-700 shadow-lg"
               >
                  Get in Touch →
               </a>
            </div>
         </section>
      </main>
   );
}