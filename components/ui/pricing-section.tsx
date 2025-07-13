"use client";

import { Button } from "./button";
import { Check } from "lucide-react";
import { BackgroundGradient } from "./background-gradient";

const tiers = [
  {
    name: "Basic",
    id: "tier-basic",
    price: "$27",
    description: "Perfect for trying out our platform.",
    features: [
      "1k messages",
      "1 live chatbot agent",
      "Basic features",
      "Community support"
    ],
  },
  {
    name: "Pro",
    id: "tier-pro",
    price: "$89",
    description: "For businesses requiring better limits, additional integration, features, and premium support.",
    features: [
      "10k messages",
      "5 live chatbot agents",
      "Real-time data from the web with search",
      "Support over live chat"
    ],
  },
  {
    name: "Premium",
    id: "tier-premium",
    price: "$450",
    description: "For more complex businesses",
    features: [
      "100k messages",
      "50 live chatbot agents",
      "Real-time data from the web with search",
      "Support over live chat"
    ],
  },
  {
    name: "Pay-as-You-Go(PAYG)",
    id: "tier-payg",
    price: "",
    description: "Flexible, consumption-based pricing where you only pay for what you use—no upfront costs, no contracts.",
    features: [
      "Unlimited messages",
      "Unlimited features",
      "Premium support"
    ],
  },
  {
    name: "Self Managed",
    id: "tier-selfmanaged",
    price: "",
    description: "Self-hosted solution with full control over configuration, infrastructure, and security—designed for teams that need complete autonomy.",
    features: [
      "Unlimited messages",
      "Unlimited features",
      "Self hosting",
      "Premium support"
    ],
  },
];

export const PricingSection = () => {
  return (
    <section id="pricing" className="py-24 bg-black">
      <div className="container px-4 md:px-6">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white">
            Choose your perfect plan
          </h2>
          <p className="mx-auto max-w-[700px] text-gray-400 md:text-xl">
            From individual developers to large enterprises, we have a plan that fits your needs.
            All plans include a 14-day free trial.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-5">
          {tiers.map((tier) => (
            <BackgroundGradient key={tier.id} className="h-full rounded-3xl overflow-hidden">
  <div className="relative h-full flex flex-col p-6 bg-zinc-900 border border-white/10">
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-white">{tier.name}</h3>
                  <div className="flex items-baseline">
                    <span className="text-4xl font-bold text-white">{tier.price}</span>
                    {tier.price !== "" && <span className="text-zinc-400 ml-1">/month</span>}
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
                  className="mt-8 w-full bg-black/25 text-white border-white/20 hover:bg-black/50 hover:border-white/40 transition-colors"
                  variant="outline"
                >
                  {/* {tier.name === "Basic" ? "Get Started" : tier.price === "Custom" ? "Contact Sales" : "Start Trial"} */}
                  {tier.price === "" ? "Contact Sales" : "Start Started"}
                </Button>
              </div>
            </BackgroundGradient>
          ))}
        </div>
      </div>
    </section>
  );
}; 