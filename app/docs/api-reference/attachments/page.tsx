"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Paperclip, ArrowLeft, ArrowRight } from "lucide-react";
import DocsSidebar from "@/components/docnav/DocumentNavigation";
import navItems from "@/data/document-nav.json";
import QuickLinks from "@/components/quicklinks/QuickLinks";
import quickLinks from "@/data/quicklinks/attachments.json";
import Link from "next/link";

export default function AttachmentsApiPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <div className="flex flex-col md:flex-row">
        <DocsSidebar items={navItems} />

        <div className="flex-1 px-6 py-10 pt-24 max-w-5xl">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center">
                <Paperclip className="h-6 w-6 text-white" />
              </div>
              <Badge variant="outline" className="border-blue-500/30 text-blue-300">Attachments</Badge>
            </div>
            <h1 className="text-4xl font-bold mb-4">Attachments API</h1>
            <p className="text-lg text-gray-400">
              Upload and manage file attachments for your AI workflows.
            </p>
          </div>

          <section id="upload" className="mb-12">
            <Card className="bg-gray-900/50 border-gray-800">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Badge className="bg-green-500/20 text-green-300 border-green-500/30">POST</Badge>
                  <CardTitle className="text-xl text-white">Upload file</CardTitle>
                </div>
                <CardDescription className="text-gray-400">Upload a file attachment</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <code className="block bg-gray-950 border border-gray-800 rounded-lg p-3 text-sm font-mono text-green-400">
                  POST /api/v1/attachments
                </code>
                <div>
                  <p className="text-sm text-gray-400 mb-3">Request Body (multipart/form-data)</p>
                  <div className="bg-gray-950 border border-gray-800 rounded-lg p-4">
                    <pre className="text-sm font-mono text-gray-300">
{`file: <binary data>
filename: "document.pdf"
contentType: "application/pdf"`}
                    </pre>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-3">Response (201 Created)</p>
                  <div className="bg-gray-950 border border-gray-800 rounded-lg p-4">
                    <pre className="text-sm font-mono text-gray-300">
{`{
  "id": "att_7db93c028d5a41178f13dfb6721b339",
  "filename": "document.pdf",
  "contentType": "application/pdf",
  "size": 1048576,
  "url": "https://api.orcha-ai.com/v1/attachments/att_7db93c028d5a41178f13dfb6721b339",
  "created_at": "2024-08-24T14:15:22Z"
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
                  <CardTitle className="text-xl text-white">Get file</CardTitle>
                </div>
                <CardDescription className="text-gray-400">Retrieve a file by ID</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <code className="block bg-gray-950 border border-gray-800 rounded-lg p-3 text-sm font-mono text-blue-400">
                  GET /api/v1/attachments/attachment_id
                </code>
                <div>
                  <p className="text-sm text-gray-400 mb-3">Response (200 OK)</p>
                  <div className="bg-gray-950 border border-gray-800 rounded-lg p-4">
                    <pre className="text-sm font-mono text-gray-300">
{`{
  "id": "att_7db93c028d5a41178f13dfb6721b339",
  "filename": "document.pdf",
  "contentType": "application/pdf",
  "size": 1048576,
  "url": "https://api.orcha-ai.com/v1/attachments/att_7db93c028d5a41178f13dfb6721b339",
  "created_at": "2024-08-24T14:15:22Z"
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
                  <CardTitle className="text-xl text-white">Delete file</CardTitle>
                </div>
                <CardDescription className="text-gray-400">Delete a file attachment</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <code className="block bg-gray-950 border border-gray-800 rounded-lg p-3 text-sm font-mono text-red-400">
                  DELETE /api/v1/attachments/attachment_id
                </code>
                <p className="text-sm text-gray-500">Response: 204 No Content</p>
              </CardContent>
            </Card>
          </section>

          <div className="flex justify-between items-center pt-8 border-t border-gray-800">
            <Link href="/docs/api-reference/assistants" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
              <ArrowLeft className="h-4 w-4" />
              <span>Assistants</span>
            </Link>
            <Link href="/docs/api-reference/chat-message" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
              <span>Chat Message</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        <QuickLinks links={quickLinks} />
      </div>
    </main>
  );
}
