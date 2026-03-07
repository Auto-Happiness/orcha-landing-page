"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Bot,
  TrendingUp,
  Zap,
  Database,
  Upload,
  BarChart3,
  Code,
  FileText,
  ArrowRight,
  BookOpen
} from "lucide-react";
import DocsSidebar from "@/components/docnav/DocumentNavigation";
import navItems from "@/data/document-nav.json";
import QuickLinks from "@/components/quicklinks/QuickLinks";
import quickLinks from "@/data/quicklinks/using-orcha.json";
import Link from "next/link";

const guideSections = [
  {
    icon: Bot,
    title: "Agent Orcha-strate",
    href: "/docs/using-orcha/agent-orcha-strate",
    description: "Learn how to orchestrate AI agents for complex workflows and automation tasks.",
    color: "from-purple-500 to-violet-600",
  },
  {
    icon: TrendingUp,
    title: "Prediction",
    href: "/docs/using-orcha/prediction",
    description: "Understand how to make predictions and generate responses using Orcha's AI models.",
    color: "from-blue-500 to-cyan-600",
  },
  {
    icon: Zap,
    title: "Streaming",
    href: "/docs/using-orcha/streaming",
    description: "Enable real-time streaming responses for a more interactive user experience.",
    color: "from-emerald-500 to-green-600",
  },
  {
    icon: Database,
    title: "Document Store",
    href: "/docs/using-orcha/document-store",
    description: "Manage and organize your documents for efficient retrieval and processing.",
    color: "from-orange-500 to-amber-600",
  },
  {
    icon: Upload,
    title: "Upsertion",
    href: "/docs/using-orcha/upsertion",
    description: "Learn how to upsert data into vector stores for enhanced search capabilities.",
    color: "from-pink-500 to-rose-600",
  },
  {
    icon: BarChart3,
    title: "Monitoring",
    href: "/docs/using-orcha/monitoring",
    description: "Monitor your AI applications and track performance metrics in real-time.",
    color: "from-indigo-500 to-blue-600",
  },
  {
    icon: Code,
    title: "Embed",
    href: "/docs/using-orcha/embed",
    description: "Embed Orcha chatbots and widgets into your website or application.",
    color: "from-teal-500 to-cyan-600",
  },
  {
    icon: FileText,
    title: "Uploads",
    href: "/docs/using-orcha/uploads",
    description: "Handle file uploads and process various document types with ease.",
    color: "from-lime-500 to-green-600",
  },
];

export default function UsingOrchaPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <div className="flex flex-col md:flex-row">
        <DocsSidebar items={navItems} />

        <div className="flex-1 px-6 py-10 pt-24">
          {/* Hero Section */}
          <div className="relative mb-16">
            <div className="absolute -top-20 -left-20 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl" />
            <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-purple-600/20 rounded-full blur-3xl" />

            <div className="relative">
              <Badge variant="secondary" className="mb-4 bg-blue-500/10 text-blue-300 border-blue-500/20">
                <BookOpen className="h-3.5 w-3.5 mr-1.5" />
                User Guides
              </Badge>

              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                <span className="bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent">
                  Using Orcha
                </span>
              </h1>

              <p className="text-xl text-gray-400 max-w-2xl mb-8 leading-relaxed">
                Learn how to use Orcha effectively with our comprehensive guides covering everything from agent orchestration to deployment.
              </p>

              <div className="flex flex-wrap gap-4">
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button variant="outline" className="border-gray-700 hover:bg-gray-800">
                  API Reference
                </Button>
              </div>
            </div>
          </div>

          {/* Getting Started */}
          <Card className="bg-gradient-to-br from-gray-900 to-gray-900/50 border-gray-800 mb-12">
            <CardHeader>
              <CardTitle className="text-2xl text-white">Getting Started</CardTitle>
              <CardDescription className="text-gray-400">
                New to Orcha? Start here to understand the basics and get up and running quickly.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Link href="/docs/intro" className="block">
                  <Card className="bg-gray-800/50 border-gray-700 hover:border-blue-500/50 transition-colors">
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-white mb-2">Introduction</h3>
                      <p className="text-sm text-gray-400">Learn what Orcha is and how it can help you build AI applications.</p>
                    </CardContent>
                  </Card>
                </Link>
                <Link href="/documentation/getting-started" className="block">
                  <Card className="bg-gray-800/50 border-gray-700 hover:border-blue-500/50 transition-colors">
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-white mb-2">Quick Start</h3>
                      <p className="text-sm text-gray-400">Set up your first chatbot in under 5 minutes.</p>
                    </CardContent>
                  </Card>
                </Link>
                <Link href="/docs/api-reference" className="block">
                  <Card className="bg-gray-800/50 border-gray-700 hover:border-blue-500/50 transition-colors">
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-white mb-2">API Reference</h3>
                      <p className="text-sm text-gray-400">Complete API documentation for developers.</p>
                    </CardContent>
                  </Card>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Guide Sections Grid */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-2">User Guides</h2>
            <p className="text-gray-400 mb-8">8 comprehensive guides to master Orcha's capabilities</p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {guideSections.map((guide) => (
                <Link key={guide.title} href={guide.href} className="block group">
                  <Card className="bg-gray-900/50 border-gray-800 hover:border-gray-700 transition-all duration-300 h-full">
                    <CardHeader className="pb-3">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${guide.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                        <guide.icon className="h-6 w-6 text-white" />
                      </div>
                      <CardTitle className="text-lg text-white flex items-center gap-2">
                        {guide.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-400 leading-relaxed">
                        {guide.description}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>

          {/* Resources */}
          <div className="text-center py-12 px-6 rounded-2xl bg-gradient-to-r from-blue-900/20 via-purple-900/20 to-blue-900/20 border border-gray-800">
            <h2 className="text-3xl font-bold mb-4">Additional Resources</h2>
            <p className="text-gray-400 mb-6 max-w-lg mx-auto">
              Need more help? Check out these additional resources to support your Orcha journey.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {["Community Forum", "Video Tutorials", "Live Webinars", "Support Center"].map((resource) => (
                <Badge
                  key={resource}
                  variant="outline"
                  className="border-gray-700 text-gray-300 px-4 py-2 text-sm"
                >
                  {resource}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        <QuickLinks links={quickLinks} />
      </div>
    </main>
  );
}
