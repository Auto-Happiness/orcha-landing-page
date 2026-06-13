import React from "react";

export default function DocsComingSoon() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-black via-zinc-900 to-gray-900 text-white px-4">
      <div className="flex flex-col items-center gap-6 animate-fade-in">
        <img
          src="/assets/art/orcha-avatar.svg"
          alt=""
          aria-hidden="true"
          className="w-24 h-24 drop-shadow-[0_0_28px_rgba(168,85,247,0.55)] motion-safe:animate-bounce"
          style={{ animationDuration: "2.6s" }}
        />
        <div className="relative">
          <span className="absolute -top-8 left-1/2 -translate-x-1/2 w-32 h-32 bg-purple-600/30 rounded-full blur-2xl motion-safe:animate-pulse" />
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 drop-shadow-lg">
            Coming Soon
          </h1>
        </div>
        <p className="text-lg md:text-2xl text-gray-300 max-w-xl text-center">
          Our documentation is on its way! We’re working hard to bring you guides, API references, and more. Stay tuned!
        </p>
        <div className="flex gap-2 mt-4">
          <span className="w-3 h-3 rounded-full bg-purple-400 motion-safe:animate-bounce" style={{ animationDelay: '0s' }} />
          <span className="w-3 h-3 rounded-full bg-pink-400 motion-safe:animate-bounce" style={{ animationDelay: '0.2s' }} />
          <span className="w-3 h-3 rounded-full bg-blue-400 motion-safe:animate-bounce" style={{ animationDelay: '0.4s' }} />
        </div>
      </div>
    </main>
  );
}
