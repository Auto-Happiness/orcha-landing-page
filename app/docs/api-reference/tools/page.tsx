"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Wrench, ArrowLeft, ArrowRight } from "lucide-react";
import DocsSidebar from "@/components/docnav/DocumentNavigation";
import navItems from "@/data/document-nav.json";
import QuickLinks from "@/components/quicklinks/QuickLinks";
import quickLinks from "@/data/quicklinks/tools.json";
import Link from "next/link";

export default function ToolsApiPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <div className="flex flex-col md:flex-row">
        <DocsSidebar items={navItems} />

        <div className="flex-1 px-6 py-10 pt-24 max-w-5xl">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-500 to-orange-600 flex items-center justify-center">
                <Wrench className="h-6 w-6 text-white" />
              </div>
              <Badge variant="outline" className="border-yellow-500/30 text-yellow-300">Tools</Badge>
            </div>
            <h1 className="text-4xl font-bold mb-4">Tools API</h1>
            <p className="text-lg text-gray-400">
              Manage custom tools and integrations for your AI workflows.
            </p>
          </div>

          <section id="create" className="mb-12">
            <Card className="bg-gray-900/50 border-gray-800">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Badge className="bg-green-500/20 text-green-300 border-green-500/30">POST</Badge>
                  <CardTitle className="text-xl text-white">Create tool</CardTitle>
                </div>
                <CardDescription className="text-gray-400">Create a new custom tool</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <code className="block bg-gray-950 border border-gray-800 rounded-lg p-3 text-sm font-mono text-green-400">
                  POST /api/v1/tools
                </code>
                <div>
                  <p className="text-sm text-gray-400 mb-3">Request Body</p>
                  <div className="bg-gray-950 border border-gray-800 rounded-lg p-4">
                    <pre className="text-sm font-mono text-gray-300">
{`{
  "name": "Weather API",
  "description": "Get current weather information",
  "method": "GET",
  "url": "https://api.weather.com/v1/current",
  "headers": {
    "Authorization": "Bearer {apiKey}"
  },
  "params": [
    {
      "name": "location",
      "type": "string",
      "required": true
    }
  ]
}`}
                    </pre>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          <section id="get" className="mb-12">
            <Card className="bg-gray-900/50 border-gray-800">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30">GET</Badge>
                  <CardTitle className="text-xl text-white">Get tools</CardTitle>
                </div>
                <CardDescription className="text-gray-400">List all custom tools</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <code className="block bg-gray-950 border border-gray-800 rounded-lg p-3 text-sm font-mono text-blue-400">
                  GET /api/v1/tools
                </code>
              </CardContent>
            </Card>
          </section>

          <section id="update" className="mb-12">
            <Card className="bg-gray-900/50 border-gray-800">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Badge className="bg-yellow-500/20 text-yellow-300 border-yellow-500/30">PUT</Badge>
                  <CardTitle className="text-xl text-white">Update tool</CardTitle>
                </div>
                <CardDescription className="text-gray-400">Update tool configuration</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <code className="block bg-gray-950 border border-gray-800 rounded-lg p-3 text-sm font-mono text-yellow-400">
                  PUT /api/v1/tools/tool_id
                </code>
              </CardContent>
            </Card>
          </section>

          <section id="delete" className="mb-12">
            <Card className="bg-gray-900/50 border-gray-800">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Badge className="bg-red-500/20 text-red-300 border-red-500/30">DELETE</Badge>
                  <CardTitle className="text-xl text-white">Delete tool</CardTitle>
                </div>
                <CardDescription className="text-gray-400">Remove a custom tool</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <code className="block bg-gray-950 border border-gray-800 rounded-lg p-3 text-sm font-mono text-red-400">
                  DELETE /api/v1/tools/tool_id
                </code>
              </CardContent>
            </Card>
          </section>

          <div className="flex justify-between items-center pt-8 border-t border-gray-800">
            <Link href="/docs/api-reference/prediction" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
              <ArrowLeft className="h-4 w-4" />
              <span>Prediction</span>
            </Link>
            <Link href="/docs/api-reference/upsert-history" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
              <span>Upsert History</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        <QuickLinks links={quickLinks} />
      </div>
    </main>
  );
}
