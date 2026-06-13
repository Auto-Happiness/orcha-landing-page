"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { useReducedMotion } from "framer-motion";
import { Button } from "./button";
import { ContainerTextFlip } from "./aceternity/container-text-flip";

export function HeroSection() {
  const reduceMotion = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);

  // WCAG 2.2.2 — under prefers-reduced-motion, hold the poster instead of looping
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (reduceMotion) video.pause();
    else video.play().catch(() => {});
  }, [reduceMotion]);

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-[#0b0517]">
      {/* The pod at work — generated orchestration scene */}
      <video
        ref={videoRef}
        src="/assets/orcha-sdlc-story.mp4"
        poster="/assets/orcha-sdlc-story-poster.jpg"
        autoPlay
        loop
        muted
        playsInline
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* readability: light vertical blend + left-edge scrim behind the copy column */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-transparent to-gray-900" />
      <div className="absolute inset-y-0 left-0 w-[58%] bg-gradient-to-r from-black/75 via-black/35 to-transparent" />

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-purple-600/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 -right-40 w-[600px] h-[600px] bg-indigo-600/20 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 min-h-screen flex items-start pt-28 lg:pt-32 justify-start px-8 sm:px-12 lg:pl-24 text-left">
        <div className="max-w-xl space-y-7">
          {/* live pod status chip */}
          <div className="flex justify-start">
            <span className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full text-xs font-mono tracking-widest uppercase bg-black/40 text-purple-200 border border-purple-400/30 backdrop-blur-sm">
              <span className="relative flex h-2 w-2" aria-hidden="true">
                <span className="motion-safe:animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
              </span>
              The pod is live — orchestrating release-1
            </span>
          </div>

          <h1
            aria-label="We Orcha-strate your systems"
            className="text-4xl md:text-5xl xl:text-6xl font-extrabold tracking-tight leading-[1.15] text-white"
          >
            <span aria-hidden="true">
              We{" "}
              <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                Orcha-strate
              </span>{" "}
              your{" "}
              {reduceMotion ? (
                <span className="text-purple-400">Systems</span>
              ) : (
                <ContainerTextFlip
                  words={["Systems", "Pipelines", "AI Agents", "Releases", "Infrastructure"]}
                  interval={3000}
                  className="text-purple-400 align-middle text-3xl md:text-4xl xl:text-5xl px-3 pt-1 pb-2"
                />
              )}
            </span>
          </h1>

          <p className="text-lg text-gray-300 leading-relaxed max-w-3xl mx-auto">
            Orcha Solutions leverages the latest technology stacks to engineer
            high-performance software that powers and modernizes IT systems —
            from high-scale enterprise platforms to advanced integrations
            built for the future.
          </p>

          <div className="flex flex-wrap justify-start gap-5 pt-2">
            <Button
              asChild
              className="
                px-12 py-6 text-lg font-semibold
                bg-gradient-to-r from-purple-600 to-pink-500
                text-white
                shadow-xl shadow-purple-600/40
                transition-all duration-300
                hover:shadow-purple-500/60
                hover:scale-[1.03]
                active:scale-95
              "
            >
              <Link href="/chat">Get Started</Link>
            </Button>
            <Button
              asChild
              className="
                px-12 py-6 text-lg font-medium
                bg-black/30
                border border-white/25
                text-white
                backdrop-blur-sm
                transition-all duration-300
                hover:border-purple-400/70
                hover:bg-purple-500/10
                hover:shadow-lg hover:shadow-purple-500/30
                active:scale-95
              "
            >
              <a href="#pod">Learn More</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
