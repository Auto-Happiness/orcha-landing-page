"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Database, ArrowLeft, ArrowRight } from "lucide-react";
import DocsSidebar from "@/components/docnav/DocumentNavigation";
import navItems from "@/data/document-nav.json";
import QuickLinks from "@/components/quicklinks/QuickLinks";
import quickLinks from "@/data/quicklinks/document-store.json";
import Link from "next/link";

export default function DocumentStoreApiPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <div className="flex flex-col md:flex-row">
        <DocsSidebar items={navItems} />

        <div className="flex-1 px-6 py-10 pt-24 max-w-5xl">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center">
                <Database className="h-6 w-6 text-white" />
              </div>
              <Badge variant="outline" className="border-pink-500/30 text-pink-300">Document Store</Badge>
            </div>
            <h1 className="text-4xl font-bold mb-4">Document Store API</h1>
            <p className="text-lg text-gray-400">
              Store and manage documents for RAG applications.
            </p>
          </div>

          <section id="create" className="mb-12">
            <Card className="bg-gray-900/50 border-gray-800">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Badge className="bg-green-500/20 text-green-300 border-green-500/30">POST</Badge>
                  <CardTitle className="text-xl text-white">Create document store</CardTitle>
                </div>
                <CardDescription className="text-gray-400">Create a new document store</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <code className="block bg-gray-950 border border-gray-800 rounded-lg p-3 text-sm font-mono text-green-400">
                  POST /api/v1/document-store
                </code>
                <div>
                  <p className="text-sm text-gray-400 mb-3">Request Body</p>
                  <div className="bg-gray-950 border border-gray-800 rounded-lg p-4">
                    <pre className="text-sm font-mono text-gray-300">
{`{
  "name": "Knowledge Base",
  "description": "Company documentation",
  "vectorStore": "pinecone",
  "embeddings": "openai"
}`}
                    </pre>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          <section id="upload" className="mb-12">
            <Card className="bg-gray-900/50 border-gray-800">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Badge className="bg-green-500/20 text-green-300 border-green-500/30">POST</Badge>
                  <CardTitle className="text-xl text-white">Upload document</CardTitle>
                </div>
                <CardDescription className="text-gray-400">Add document to store</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <code className="block bg-gray-950 border border-gray-800 rounded-lg p-3 text-sm font-mono text-green-400">
                  POST /api/v1/document-store/store_id/upload
                </code>
                <div>
                  <p className="text-sm text-gray-400 mb-3">Request Body (multipart/form-data)</p>
                  <div className="bg-gray-950 border border-gray-800 rounded-lg p-4">
                    <pre className="text-sm font-mono text-gray-300">
{`file: <binary data>
loader: "pdf"
chunkSize: 1000
chunkOverlap: 200`}
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
                  <CardTitle className="text-xl text-white">Get documents</CardTitle>
                </div>
                <CardDescription className="text-gray-400">List documents in store</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <code className="block bg-gray-950 border border-gray-800 rounded-lg p-3 text-sm font-mono text-blue-400">
                  GET /api/v1/document-store/store_id/documents
                </code>
              </CardContent>
            </Card>
          </section>

          <section id="delete" className="mb-12">
            <Card className="bg-gray-900/50 border-gray-800">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Badge className="bg-red-500/20 text-red-300 border-red-500/30">DELETE</Badge>
                  <CardTitle className="text-xl text-white">Delete document</CardTitle>
                </div>
                <CardDescription className="text-gray-400">Remove document from store</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <code className="block bg-gray-950 border border-gray-800 rounded-lg p-3 text-sm font-mono text-red-400">
                  DELETE /api/v1/document-store/store_id/documents/doc_id
                </code>
              </CardContent>
            </Card>
          </section>

          <div className="flex justify-between items-center pt-8 border-t border-gray-800">
            <Link href="/docs/api-reference/chatflows" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
              <ArrowLeft className="h-4 w-4" />
              <span>Chatflows</span>
            </Link>
            <Link href="/docs/api-reference/feedback" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
              <span>Feedback</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        <QuickLinks links={quickLinks} />
      </div>
    </main>
  );
}
