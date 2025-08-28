"use client";

import { Button } from "./button";
import { Check } from "lucide-react";
import { BackgroundGradient } from "./background-gradient";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

const tiers = [
  {
    name: "Basic",
    id: "tier-basic",
    price: "$27",
    description: "Perfect for trying out our platform.",
    features: [
      "10k Communications",
      "1GB of storage",
    ],
  },
  {
    name: "Pro",
    id: "tier-pro",
    price: "$89",
    description: "For businesses requiring better limits, additional integration, features, and premium support.",
    features: [
      "50k Communications",
      "10 GB of storage",
      "Gain Access early for new features",
      "Support over live chat"
    ],
  },
  // {
  //   name: "Premium",
  //   id: "tier-premium",
  //   price: "$450",
  //   description: "For more complex businesses",
  //   features: [
  //     "100k messages",
  //     "50 live chatbot agents",
  //     "Real-time data from the web with search",
  //     "Support over live chat"
  //   ],
  // },
  {
    name: "Enterprise",
    id: "tier-enterprise",
    price: "Custom",
    description: "Flexible, consumption-based pricing where you only pay for what you use no upfront costs, no contracts.", // CHANGE DESCRIPTION
    features: [
      "Unlimited communications",
      "Unlimited features",
      "Unlimited custom tool",
      "Premium support"
    ],
  }
  // {
  //   name: "Self Managed",
  //   id: "tier-selfmanaged",
  //   price: "",
  //   description: "Self-hosted solution with full control over configuration, infrastructure, and security—designed for teams that need complete autonomy.",
  //   features: [
  //     "Unlimited messages",
  //     "Unlimited features",
  //     "Self hosting",
  //     "Premium support"
  //   ],
  // },
];

export function PricingDrawer() {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <button className="px-8 py-3 rounded-xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white font-medium hover:opacity-90 transition">
          Get Started
        </button>
      </DrawerTrigger>
      <DrawerContent className="bg-black h-[90vh]">
        <div className="mx-auto w-full h-full overflow-y-auto">
          <DrawerHeader className="text-center">
            <DrawerTitle className="text-3xl font-bold tracking-tighter text-white">
              Choose your perfect plan
            </DrawerTitle>
            <DrawerDescription className="text-gray-400 md:text-xl max-w-[700px] mx-auto">
              From individual developers to large enterprises, we have a plan that fits your needs.
              All plans include a 14-day free trial.
            </DrawerDescription>
          </DrawerHeader>
          <div className="p-4">
            {/* <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-5"> */}
            <div className="w-full flex justify-center">
              <div className="grid gap-8 max-w-7xl w-full justify-items-center" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))" }}>
                {tiers.map((tier) => (
                  <BackgroundGradient key={tier.id} className="h-full rounded-3xl overflow-hidden">
                    <div className="p-6 h-full flex flex-col bg-zinc-950">
                      <div className="space-y-4">
                        <h3 className="text-2xl font-bold text-white">{tier.name}</h3>
                        <div className="flex items-baseline">
                          <span className="text-4xl font-bold text-white">{tier.price}</span>
                          {tier.price !== "" && tier.price != "Custom" && <span className="text-zinc-400 ml-1">/month</span>}
                        </div>
                        <p className="text-zinc-400 text-sm">{tier.description}</p>
                      </div>
                      <ul className="mt-6 space-y-3 flex-1 text-sm">
                        {tier.features.map((feature) => (
                          <li key={feature} className="flex items-center text-zinc-300">
                            <Check className="h-4 w-4 text-emerald-500 mr-3 flex-shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <Button 
                        className="mt-8 w-full bg-zinc-900 text-white border-white/20 hover:bg-zinc-800 hover:border-white/40 transition-colors"
                        variant="outline"
                      >
                        {tier.price === "" ? "Contact Sales" : "Get Started"}
                      </Button>
                    </div>
                  </BackgroundGradient>
                ))}
              </div>
            </div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
} 