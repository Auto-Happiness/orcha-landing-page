"use client";

import React from "react";
import Link from "next/link";
import { Button } from "./button";
import { ContainerTextFlip } from "./aceternity/container-text-flip";

export function HeroSection() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-black">

      <video
        src="/assets/orcha 2.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      />

      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/80" />

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-purple-600/30 rounded-full blur-3xl" />
        <div className="absolute bottom-0 -right-40 w-[600px] h-[600px] bg-indigo-600/30 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center px-6 text-center">
        <div className="max-w-4xl space-y-10">

          <h1 className="text-6xl md:text-7xl xl:text-8xl font-extrabold tracking-tight leading-[1.05] text-white">
            We{" "}
            <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
              Orcha-strate
            </span>{" "}
            your
            <span className="block mt-4">
              <ContainerTextFlip
                words={["Systems", "Solutions", "Infrastructure", "AI"]}
                interval={3000}
                className="text-purple-400"
              />
            </span>
          </h1>

          <p className="text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
            Orcha Solutions designs and builds tailored software that powers and
            optimizes IT systems — from enterprise platforms to advanced
            integrations that drive innovation.
          </p>

          <div className="flex flex-wrap justify-center gap-6 pt-6">
            <Link href="/chat">
              <Button
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
                Get Started
              </Button>
            </Link>
            <Button
              className="
                px-12 py-6 text-lg font-medium
                bg-transparent
                border border-white/30
                text-white
                backdrop-blur-sm
                transition-all duration-300
                hover:border-purple-400/70
                hover:bg-purple-500/10
                hover:shadow-lg hover:shadow-purple-500/30
                active:scale-95
              "
            >
              Learn More
            </Button>
          </div>

        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-gray-300 text-sm">
        ↓ Scroll
      </div>
    </section>
  );
}
