"use client";

import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, Boxes, Shield, LineChart, Bot, Workflow, Layers, Code, MessageSquare, Users } from "lucide-react";
import DocsSidebar from "@/components/docnav/DocumentNavigation";
import navItems from "@/data/document-nav.json";
import quickLinks from "@/data/quicklinks/intro.json";
import QuickLinks from "@/components/quicklinks/QuickLinks";

const features = [
  {
    icon: Workflow,
    title: "Visual Builder",
    description: "Drag-and-drop interface to build AI workflows without writing code. Connect nodes to create powerful automations.",
    color: "from-purple-500 to-violet-600",
  },
  {
    icon: LineChart,
    title: "Analytics & Tracing",
    description: "Monitor performance with built-in analytics. Track token usage, latency, and success rates in real-time.",
    color: "from-blue-500 to-cyan-600",
  },
  {
    icon: Shield,
    title: "Safety Controls",
    description: "Input moderation, output filtering, and encrypted credentials keep your data and users protected.",
    color: "from-emerald-500 to-green-600",
  },
  {
    icon: Bot,
    title: "AI Agents",
    description: "Build autonomous agents that can use tools, make decisions, and complete complex multi-step tasks.",
    color: "from-orange-500 to-amber-600",
  },
  {
    icon: Layers,
    title: "MCP Integration",
    description: "Connect with Model Context Protocol servers and clients for extended capabilities and tool access.",
    color: "from-pink-500 to-rose-600",
  },
  {
    icon: Code,
    title: "API & SDK",
    description: "REST API with SDKs for Python, JavaScript, .NET, and Go. Embed chatbots with a single script tag.",
    color: "from-indigo-500 to-blue-600",
  },
];

const capabilities = [
  { name: "AI Orchestration", icon: Zap },
  { name: "Data Ingestion", icon: Boxes },
  { name: "Memory Systems", icon: Layers },
  { name: "Human in the Loop", icon: Users },
  { name: "Embedded Chatbot", icon: MessageSquare },
];

export default function IntroPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <div className="flex flex-col md:flex-row">
        <DocsSidebar items={navItems} />

        <div className="flex-1 px-6 py-10 pt-24">
          {/* Hero Section */}
          <div className="relative mb-16">
            <div className="absolute -top-20 -left-20 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl" />
            <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-blue-600/20 rounded-full blur-3xl" />
            
            <div className="relative">
              <Badge variant="secondary" className="mb-4 bg-purple-500/10 text-purple-300 border-purple-500/20">
                v2.0 Now Available
              </Badge>
              
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                <span className="bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent">
                  Welcome to Orcha
                </span>
              </h1>
              
              <p className="text-xl text-gray-400 max-w-2xl mb-8 leading-relaxed">
                An open-source AI orchestration platform built on LangChain and LangGraph. 
                Create LLM-powered applications, chatbots, and agent teams without writing code.
              </p>
              
              {/* <div className="flex flex-wrap gap-4">
                <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button variant="outline" className="border-gray-700 hover:bg-gray-800">
                  View on GitHub
                </Button>
              </div> */}
            </div>
          </div>

          {/* What is Orcha */}
          <Card className="bg-gray-900/50 border-gray-800 mb-12">
            <CardHeader>
              <CardTitle className="text-2xl text-white">What is Orcha?</CardTitle>
              <CardDescription className="text-gray-400">
                Your complete AI development platform
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300 leading-relaxed">
                Orcha is a no-code AI builder that empowers you to create sophisticated LLM applications 
                through an intuitive visual interface. Whether you need a customer support chatbot with 
                access to private data, or a team of AI agents to handle complex workflows, Orcha makes it possible.
              </p>
              <div className="flex flex-wrap gap-2 mt-4">
                {capabilities.map((cap) => (
                  <Badge 
                    key={cap.name}
                    variant="outline" 
                    className="border-gray-700 text-gray-300 flex items-center gap-1.5 px-3 py-1"
                  >
                    <cap.icon className="h-3.5 w-3.5" />
                    {cap.name}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Features Grid */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-2">Platform Features</h2>
            <p className="text-gray-400 mb-8">Everything you need to build production-ready AI applications</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature) => (
                <Card 
                  key={feature.title}
                  className="bg-gray-900/50 border-gray-800 hover:border-gray-700 transition-all duration-300 group"
                >
                  <CardHeader className="pb-3">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <feature.icon className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle className="text-lg text-white">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-400 leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Architecture Overview */}
          <Card className="bg-gradient-to-br from-gray-900 to-gray-900/50 border-gray-800 mb-12 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl" />
            <CardHeader>
              <CardTitle className="text-2xl text-white">Architecture</CardTitle>
              <CardDescription className="text-gray-400">
                Three powerful building blocks for any use case
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { title: "Assistant", desc: "Conversational AI with memory and context awareness" },
                  { title: "Chatflow", desc: "Structured conversation flows with conditional logic" },
                  { title: "Agentflow", desc: "Autonomous agents with tool use and reasoning" },
                ].map((item, idx) => (
                  <div key={item.title} className="text-center p-4">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gray-800 flex items-center justify-center border border-gray-700">
                      <span className="text-2xl font-bold text-purple-400">{idx + 1}</span>
                    </div>
                    <h3 className="font-semibold text-white mb-2">{item.title}</h3>
                    <p className="text-sm text-gray-400">{item.desc}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Start CTA */}
          <div className="text-center py-12 px-6 rounded-2xl bg-gradient-to-r from-purple-900/20 via-blue-900/20 to-purple-900/20 border border-gray-800">
            <h2 className="text-3xl font-bold mb-4">Ready to get started?</h2>
            <p className="text-gray-400 mb-6 max-w-lg mx-auto">
              Follow our quick start guide to build your first AI application in minutes.
            </p>
            <Button className="bg-white text-black hover:bg-gray-200 px-8">
              Quick Start Guide
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>

        <QuickLinks links={quickLinks} />
      </div>
    </main>
  );
}
