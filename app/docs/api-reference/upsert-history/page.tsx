"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { History, ArrowLeft, ArrowRight } from "lucide-react";
import DocsSidebar from "@/components/docnav/DocumentNavigation";
import navItems from "@/data/document-nav.json";
import QuickLinks from "@/components/quicklinks/QuickLinks";
import quickLinks from "@/data/quicklinks/upsert-history.json";
import Link from "next/link";

export default function UpsertHistoryApiPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <div className="flex flex-col md:flex-row">
        <DocsSidebar items={navItems} />

        <div className="flex-1 px-6 py-10 pt-24 max-w-5xl">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
                <History className="h-6 w-6 text-white" />
              </div>
              <Badge variant="outline" className="border-cyan-500/30 text-cyan-300">Upsert History</Badge>
            </div>
            <h1 className="text-4xl font-bold mb-4">Upsert History API</h1>
            <p className="text-lg text-gray-400">
              Track and view history of upsert operations and data ingestion.
            </p>
          </div>

          <section id="get" className="mb-12">
            <Card className="bg-gray-900/50 border-gray-800">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30">GET</Badge>
                  <CardTitle className="text-xl text-white">Get upsert history</CardTitle>
                </div>
                <CardDescription className="text-gray-400">List upsert operation history</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <code className="block bg-gray-950 border border-gray-800 rounded-lg p-3 text-sm font-mono text-blue-400">
                  GET /api/v1/upsert-history?storeId=store_xxx
                </code>
                <div>
                  <p className="text-sm text-gray-400 mb-3">Response (200 OK)</p>
                  <div className="bg-gray-950 border border-gray-800 rounded-lg p-4">
                    <pre className="text-sm font-mono text-gray-300">
{`{
  "history": [
    {
      "id": "ups_abc123",
      "storeId": "store_xxx",
      "documentId": "doc_xxx",
      "status": "completed",
      "chunks": 15,
      "created_at": "2024-08-24T14:15:22Z"
    }
  ],
  "total": 42
}`}
                    </pre>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          <section id="delete" className="mb-12">
            <Card className="bg-gray-900/50 border-gray-800">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Badge className="bg-red-500/20 text-red-300 border-red-500/30">DELETE</Badge>
                  <CardTitle className="text-xl text-white">Clear history</CardTitle>
                </div>
                <CardDescription className="text-gray-400">Delete upsert history entries</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <code className="block bg-gray-950 border border-gray-800 rounded-lg p-3 text-sm font-mono text-red-400">
                  DELETE /api/v1/upsert-history?storeId=store_xxx
                </code>
                <p className="text-sm text-gray-500">Response: 204 No Content</p>
              </CardContent>
            </Card>
          </section>

          <div className="flex justify-between items-center pt-8 border-t border-gray-800">
            <Link href="/docs/api-reference/tools" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
              <ArrowLeft className="h-4 w-4" />
              <span>Tools</span>
            </Link>
            <Link href="/docs/api-reference/variables" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
              <span>Variables</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        <QuickLinks links={quickLinks} />
      </div>
    </main>
  );
}
