"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { UploadCloud, ArrowLeft } from "lucide-react";
import DocsSidebar from "@/components/docnav/DocumentNavigation";
import navItems from "@/data/document-nav.json";
import QuickLinks from "@/components/quicklinks/QuickLinks";
import quickLinks from "@/data/quicklinks/vector-upsert.json";
import Link from "next/link";

export default function VectorUpsertApiPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <div className="flex flex-col md:flex-row">
        <DocsSidebar items={navItems} />

        <div className="flex-1 px-6 py-10 pt-24 max-w-5xl">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
                <UploadCloud className="h-6 w-6 text-white" />
              </div>
              <Badge variant="outline" className="border-violet-500/30 text-violet-300">Vector Upsert</Badge>
            </div>
            <h1 className="text-4xl font-bold mb-4">Vector Upsert API</h1>
            <p className="text-lg text-gray-400">
              Insert and update vectors in vector stores for semantic search.
            </p>
          </div>

          <section id="upsert" className="mb-12">
            <Card className="bg-gray-900/50 border-gray-800">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Badge className="bg-green-500/20 text-green-300 border-green-500/30">POST</Badge>
                  <CardTitle className="text-xl text-white">Upsert vectors</CardTitle>
                </div>
                <CardDescription className="text-gray-400">Insert new vectors into vector store</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <code className="block bg-gray-950 border border-gray-800 rounded-lg p-3 text-sm font-mono text-green-400">
                  POST /api/v1/vector-upsert
                </code>
                <div>
                  <p className="text-sm text-gray-400 mb-3">Request Body</p>
                  <div className="bg-gray-950 border border-gray-800 rounded-lg p-4">
                    <pre className="text-sm font-mono text-gray-300">
{`{
  "storeId": "store_xxx",
  "vectors": [
    {
      "id": "vec_001",
      "values": [0.1, 0.2, 0.3, ...],
      "metadata": {
        "text": "Document content",
        "source": "file.pdf",
        "page": 1
      }
    }
  ]
}`}
                    </pre>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-3">Response (201 Created)</p>
                  <div className="bg-gray-950 border border-gray-800 rounded-lg p-4">
                    <pre className="text-sm font-mono text-gray-300">
{`{
  "upsertedCount": 1,
  "storeId": "store_xxx"
}`}
                    </pre>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          <section id="update" className="mb-12">
            <Card className="bg-gray-900/50 border-gray-800">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Badge className="bg-yellow-500/20 text-yellow-300 border-yellow-500/30">PUT</Badge>
                  <CardTitle className="text-xl text-white">Update vectors</CardTitle>
                </div>
                <CardDescription className="text-gray-400">Update existing vectors</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <code className="block bg-gray-950 border border-gray-800 rounded-lg p-3 text-sm font-mono text-yellow-400">
                  PUT /api/v1/vector-upsert
                </code>
                <div>
                  <p className="text-sm text-gray-400 mb-3">Request Body</p>
                  <div className="bg-gray-950 border border-gray-800 rounded-lg p-4">
                    <pre className="text-sm font-mono text-gray-300">
{`{
  "storeId": "store_xxx",
  "vectors": [
    {
      "id": "vec_001",
      "values": [0.2, 0.3, 0.4, ...],
      "metadata": {
        "text": "Updated content"
      }
    }
  ]
}`}
                    </pre>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          <div className="flex justify-between items-center pt-8 border-t border-gray-800">
            <Link href="/docs/api-reference/variables" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
              <ArrowLeft className="h-4 w-4" />
              <span>Variables</span>
            </Link>
            <Link href="/docs/api-reference" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
              <span>API Overview</span>
              <ArrowLeft className="h-4 w-4 rotate-180" />
            </Link>
          </div>
        </div>

        <QuickLinks links={quickLinks} />
      </div>
    </main>
  );
}
