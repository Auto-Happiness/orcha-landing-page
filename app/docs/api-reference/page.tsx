"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Bot, 
  Paperclip, 
  MessageSquare, 
  Workflow, 
  Database, 
  ThumbsUp, 
  Users, 
  Activity, 
  Send,
  Wrench,
  History,
  Variable,
  UploadCloud,
  ArrowRight,
  Code2
} from "lucide-react";
import DocsSidebar from "@/components/docnav/DocumentNavigation";
import navItems from "@/data/document-nav.json";
import QuickLinks from "@/components/quicklinks/QuickLinks";
import quickLinks from "@/data/quicklinks/api-reference.json";
import Link from "next/link";

const apiEndpoints = [
  {
    icon: Bot,
    title: "Assistants",
    href: "/docs/api-reference/assistants",
    description: "Create, manage, and interact with AI assistants. Create new assistants, retrieve by ID, update details, and delete.",
    methods: ["GET", "POST", "PUT", "DELETE"],
    color: "from-purple-500 to-violet-600",
  },
  {
    icon: Paperclip,
    title: "Attachments",
    href: "/docs/api-reference/attachments",
    description: "Upload and manage file attachments. Support for images, documents, audio, and other file types.",
    methods: ["POST", "GET", "DELETE"],
    color: "from-blue-500 to-cyan-600",
  },
  {
    icon: MessageSquare,
    title: "Chat Message",
    href: "/docs/api-reference/chat-message",
    description: "Send and receive chat messages. Manage conversation history and context for continuous interactions.",
    methods: ["GET", "POST", "DELETE"],
    color: "from-emerald-500 to-green-600",
  },
  {
    icon: Workflow,
    title: "Chatflows",
    href: "/docs/api-reference/chatflows",
    description: "Manage chatflow configurations. Create, update, and deploy conversation flows with conditional logic.",
    methods: ["GET", "POST", "PUT", "DELETE"],
    color: "from-orange-500 to-amber-600",
  },
  {
    icon: Database,
    title: "Document Store",
    href: "/docs/api-reference/document-store",
    description: "Store and retrieve documents for RAG applications. Manage document collections and vector embeddings.",
    methods: ["GET", "POST", "PUT", "DELETE"],
    color: "from-pink-500 to-rose-600",
  },
  {
    icon: ThumbsUp,
    title: "Feedback",
    href: "/docs/api-reference/feedback",
    description: "Collect and manage user feedback on AI responses. Rating system and comment collection.",
    methods: ["GET", "POST", "PUT"],
    color: "from-indigo-500 to-blue-600",
  },
  {
    icon: Users,
    title: "Leads",
    href: "/docs/api-reference/leads",
    description: "Capture and manage lead information from chat interactions. Export and analyze lead data.",
    methods: ["GET", "POST", "PUT", "DELETE"],
    color: "from-teal-500 to-cyan-600",
  },
  {
    icon: Activity,
    title: "Ping",
    href: "/docs/api-reference/ping",
    description: "Health check endpoint to verify API availability and service status.",
    methods: ["GET"],
    color: "from-lime-500 to-green-600",
  },
  {
    icon: Send,
    title: "Prediction",
    href: "/docs/api-reference/prediction",
    description: "Send messages to flows and receive AI responses. Primary endpoint for interacting with your AI flows.",
    methods: ["POST"],
    color: "from-red-500 to-pink-600",
  },
  {
    icon: Wrench,
    title: "Tools",
    href: "/docs/api-reference/tools",
    description: "Manage custom tools and integrations. Configure tool parameters and authentication.",
    methods: ["GET", "POST", "PUT", "DELETE"],
    color: "from-yellow-500 to-orange-600",
  },
  {
    icon: History,
    title: "Upsert History",
    href: "/docs/api-reference/upsert-history",
    description: "Track and view history of upsert operations. Monitor data ingestion and processing status.",
    methods: ["GET", "DELETE"],
    color: "from-cyan-500 to-blue-600",
  },
  {
    icon: Variable,
    title: "Variables",
    href: "/docs/api-reference/variables",
    description: "Manage environment variables and flow-specific configurations. Runtime variable overrides.",
    methods: ["GET", "POST", "PUT", "DELETE"],
    color: "from-fuchsia-500 to-purple-600",
  },
  {
    icon: UploadCloud,
    title: "Vector Upsert",
    href: "/docs/api-reference/vector-upsert",
    description: "Insert and update vectors in vector stores. Manage embeddings for semantic search and RAG.",
    methods: ["POST", "PUT"],
    color: "from-violet-500 to-purple-600",
  },
];

const getMethodColor = (method: string) => {
  switch (method) {
    case "GET": return "bg-blue-500/20 text-blue-300 border-blue-500/30";
    case "POST": return "bg-green-500/20 text-green-300 border-green-500/30";
    case "PUT": return "bg-yellow-500/20 text-yellow-300 border-yellow-500/30";
    case "DELETE": return "bg-red-500/20 text-red-300 border-red-500/30";
    default: return "bg-gray-500/20 text-gray-300 border-gray-500/30";
  }
};

export default function ApiReferencePage() {
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
                <Code2 className="h-3.5 w-3.5 mr-1.5" />
                REST API v2
              </Badge>
              
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                <span className="bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent">
                  API Reference
                </span>
              </h1>
              
              <p className="text-xl text-gray-400 max-w-2xl mb-8 leading-relaxed">
                Complete REST API documentation for integrating with Orcha. Build custom applications, 
                automate workflows, and extend your AI capabilities programmatically.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6">
                  Get API Key
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button variant="outline" className="border-gray-700 hover:bg-gray-800">
                  View SDKs
                </Button>
              </div>
            </div>
          </div>

          {/* Base URL */}
          <Card className="bg-gray-900/50 border-gray-800 mb-12">
            <CardHeader>
              <CardTitle className="text-xl text-white">Base URL</CardTitle>
            </CardHeader>
            <CardContent>
              <code className="block bg-gray-950 border border-gray-800 rounded-lg p-4 text-sm font-mono text-green-400">
                https://api.orcha-ai.com/v1
              </code>
            </CardContent>
          </Card>

          {/* Authentication */}
          <Card className="bg-gradient-to-br from-gray-900 to-gray-900/50 border-gray-800 mb-12">
            <CardHeader>
              <CardTitle className="text-2xl text-white">Authentication</CardTitle>
              <CardDescription className="text-gray-400">
                All API requests require authentication using an API key
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-gray-300">
                Include your API key in the Authorization header of all requests:
              </p>
              <code className="block bg-gray-950 border border-gray-800 rounded-lg p-4 text-sm font-mono text-gray-300">
                Authorization: Bearer YOUR_API_KEY
              </code>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Badge variant="outline" className="border-yellow-600/50 text-yellow-400">
                  Security Note
                </Badge>
                <span>Never expose your API key in client-side code or public repositories.</span>
              </div>
            </CardContent>
          </Card>

          {/* API Endpoints Grid */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-2">API Endpoints</h2>
            <p className="text-gray-400 mb-8">13 endpoints to power your AI applications</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {apiEndpoints.map((endpoint) => (
                <Link key={endpoint.title} href={endpoint.href} className="block group">
                  <Card className="bg-gray-900/50 border-gray-800 hover:border-gray-700 transition-all duration-300 h-full">
                    <CardHeader className="pb-3">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${endpoint.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                        <endpoint.icon className="h-6 w-6 text-white" />
                      </div>
                      <CardTitle className="text-lg text-white flex items-center gap-2">
                        {endpoint.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-sm text-gray-400 leading-relaxed">
                        {endpoint.description}
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {endpoint.methods.map((method) => (
                          <Badge 
                            key={method}
                            variant="outline" 
                            className={`text-xs ${getMethodColor(method)}`}
                          >
                            {method}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>

          {/* Rate Limits */}
          <Card className="bg-gray-900/50 border-gray-800 mb-12">
            <CardHeader>
              <CardTitle className="text-xl text-white">Rate Limits</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center py-3 border-b border-gray-800">
                  <span className="text-gray-300">Free Tier</span>
                  <Badge variant="outline" className="border-gray-700 text-gray-300">100 requests/min</Badge>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-800">
                  <span className="text-gray-300">Pro Tier</span>
                  <Badge variant="outline" className="border-blue-700 text-blue-300">1,000 requests/min</Badge>
                </div>
                <div className="flex justify-between items-center py-3">
                  <span className="text-gray-300">Enterprise</span>
                  <Badge variant="outline" className="border-purple-700 text-purple-300">Custom limits</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* SDKs */}
          <div className="text-center py-12 px-6 rounded-2xl bg-gradient-to-r from-blue-900/20 via-purple-900/20 to-blue-900/20 border border-gray-800">
            <h2 className="text-3xl font-bold mb-4">Official SDKs</h2>
            <p className="text-gray-400 mb-6 max-w-lg mx-auto">
              Prefer using a library? We provide official SDKs for popular programming languages.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {["Python", "JavaScript", ".NET", "Go"].map((sdk) => (
                <Badge 
                  key={sdk}
                  variant="outline" 
                  className="border-gray-700 text-gray-300 px-4 py-2 text-sm"
                >
                  {sdk}
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
