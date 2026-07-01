"use client";

import { Sparkles, Calendar, ArrowRight } from "lucide-react";
import { BackgroundGradient } from "./background-gradient";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

export function PricingDrawer() {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <button className="px-8 py-3 rounded-xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white font-medium hover:opacity-90 transition">
          Get Started
        </button>
      </DrawerTrigger>
      <DrawerContent className="bg-black h-[65vh]">
        <div className="mx-auto w-full max-w-xl h-full flex flex-col justify-center px-6">
          <DrawerHeader className="text-center space-y-4">
            <div className="flex justify-center select-none">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-teal-500/20 to-purple-500/20 flex items-center justify-center text-teal-400 border border-teal-500/30 shadow-[0_0_15px_rgba(45,212,191,0.2)] animate-pulse">
                <Sparkles className="h-6 w-6" />
              </div>
            </div>
            <DrawerTitle className="text-3xl font-bold tracking-tighter text-white">
              Pricing Details
            </DrawerTitle>
            <DrawerDescription className="text-zinc-400 text-base max-w-md mx-auto leading-relaxed">
              We are currently finalizing our local developer and team licensing options. We are also providing a SaaS version coming soon!
            </DrawerDescription>
          </DrawerHeader>

          <div className="py-6 flex justify-center">
            <BackgroundGradient className="rounded-3xl overflow-hidden max-w-md w-full">
              <div className="p-6 bg-zinc-950 flex flex-col items-center text-center space-y-4">
                <div className="flex items-center gap-2 text-xs font-bold text-teal-400 uppercase tracking-widest font-mono bg-teal-500/10 px-3 py-1 rounded-full border border-teal-500/20">
                  <Calendar className="h-3.5 w-3.5" />
                  <span>Beta Waitlist Open</span>
                </div>
                <h3 className="text-xl font-bold text-white">SaaS Cloud Release</h3>
                <p className="text-zinc-400 text-xs max-w-xs leading-relaxed">
                  Get early access to zero-config semantic syncs, cloud log analytics, and team steering controls.
                </p>
                <div className="pt-4 w-full">
                  <button className="w-full py-3 rounded-xl bg-gradient-to-r from-teal-500 to-purple-600 text-white font-bold text-xs hover:opacity-95 transition-all shadow-lg flex items-center justify-center gap-2">
                    <span>Join the SaaS Waitlist</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </BackgroundGradient>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}