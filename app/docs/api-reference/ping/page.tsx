"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Activity, ArrowLeft, ArrowRight } from "lucide-react";
import DocsSidebar from "@/components/docnav/DocumentNavigation";
import navItems from "@/data/document-nav.json";
import QuickLinks from "@/components/quicklinks/QuickLinks";
import quickLinks from "@/data/quicklinks/ping.json";
import Link from "next/link";

export default function PingApiPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <div className="flex flex-col md:flex-row">
        <DocsSidebar items={navItems} />

        <div className="flex-1 px-6 py-10 pt-24 max-w-5xl">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-lime-500 to-green-600 flex items-center justify-center">
                <Activity className="h-6 w-6 text-white" />
              </div>
              <Badge variant="outline" className="border-lime-500/30 text-lime-300">Ping</Badge>
            </div>
            <h1 className="text-4xl font-bold mb-4">Ping API</h1>
            <p className="text-lg text-gray-400">
              Health check endpoint to verify API availability and service status.
            </p>
          </div>

          <section id="ping" className="mb-12">
            <Card className="bg-gray-900/50 border-gray-800">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30">GET</Badge>
                  <CardTitle className="text-xl text-white">Health check</CardTitle>
                </div>
                <CardDescription className="text-gray-400">Check API service status</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <p className="text-sm text-gray-400 mb-2">Endpoint</p>
                  <code className="block bg-gray-950 border border-gray-800 rounded-lg p-3 text-sm font-mono text-blue-400">
                    GET /api/v1/ping
                  </code>
                </div>

                <div>
                  <p className="text-sm text-gray-400 mb-3">Response (200 OK)</p>
                  <div className="bg-gray-950 border border-gray-800 rounded-lg p-4">
                    <pre className="text-sm font-mono text-gray-300">
{`{
  "status": "ok",
  "timestamp": "2024-08-24T14:15:22Z",
  "version": "2.0.0",
  "uptime": "99.99%"
}`}
                    </pre>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="border-green-500/30 text-green-400">200 - Service healthy</Badge>
                  <Badge variant="outline" className="border-red-500/30 text-red-400">503 - Service unavailable</Badge>
                </div>
              </CardContent>
            </Card>
          </section>

          <div className="flex justify-between items-center pt-8 border-t border-gray-800">
            <Link href="/docs/api-reference/leads" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
              <ArrowLeft className="h-4 w-4" />
              <span>Leads</span>
            </Link>
            <Link href="/docs/api-reference/prediction" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
              <span>Prediction</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        <QuickLinks links={quickLinks} />
      </div>
    </main>
  );
}
