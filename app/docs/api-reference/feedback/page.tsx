"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ThumbsUp, ArrowLeft, ArrowRight } from "lucide-react";
import DocsSidebar from "@/components/docnav/DocumentNavigation";
import navItems from "@/data/document-nav.json";
import QuickLinks from "@/components/quicklinks/QuickLinks";
import quickLinks from "@/data/quicklinks/feedback.json";
import Link from "next/link";

export default function FeedbackApiPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <div className="flex flex-col md:flex-row">
        <DocsSidebar items={navItems} />

        <div className="flex-1 px-6 py-10 pt-24 max-w-5xl">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center">
                <ThumbsUp className="h-6 w-6 text-white" />
              </div>
              <Badge variant="outline" className="border-indigo-500/30 text-indigo-300">Feedback</Badge>
            </div>
            <h1 className="text-4xl font-bold mb-4">Feedback API</h1>
            <p className="text-lg text-gray-400">
              Collect and manage user feedback on AI responses.
            </p>
          </div>

          <section id="submit" className="mb-12">
            <Card className="bg-gray-900/50 border-gray-800">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Badge className="bg-green-500/20 text-green-300 border-green-500/30">POST</Badge>
                  <CardTitle className="text-xl text-white">Submit feedback</CardTitle>
                </div>
                <CardDescription className="text-gray-400">Submit feedback for a message</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <code className="block bg-gray-950 border border-gray-800 rounded-lg p-3 text-sm font-mono text-green-400">
                  POST /api/v1/feedback
                </code>
                <div>
                  <p className="text-sm text-gray-400 mb-3">Request Body</p>
                  <div className="bg-gray-950 border border-gray-800 rounded-lg p-4">
                    <pre className="text-sm font-mono text-gray-300">
{`{
  "messageId": "msg_abc123",
  "chatflowId": "chat_7db93c028d5a41178f13dfb6721b339",
  "rating": "thumbsUp",
  "content": "Very helpful response!",
  "user": "user@example.com"
}`}
                    </pre>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-3">Response (201 Created)</p>
                  <div className="bg-gray-950 border border-gray-800 rounded-lg p-4">
                    <pre className="text-sm font-mono text-gray-300">
{`{
  "id": "fb_abc123",
  "messageId": "msg_abc123",
  "rating": "thumbsUp",
  "content": "Very helpful response!",
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
                  <CardTitle className="text-xl text-white">Get feedback</CardTitle>
                </div>
                <CardDescription className="text-gray-400">Retrieve feedback entries</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <code className="block bg-gray-950 border border-gray-800 rounded-lg p-3 text-sm font-mono text-blue-400">
                  GET /api/v1/feedback?chatflowId=chat_xxx
                </code>
              </CardContent>
            </Card>
          </section>

          <section id="update" className="mb-12">
            <Card className="bg-gray-900/50 border-gray-800">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Badge className="bg-yellow-500/20 text-yellow-300 border-yellow-500/30">PUT</Badge>
                  <CardTitle className="text-xl text-white">Update feedback</CardTitle>
                </div>
                <CardDescription className="text-gray-400">Update existing feedback</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <code className="block bg-gray-950 border border-gray-800 rounded-lg p-3 text-sm font-mono text-yellow-400">
                  PUT /api/v1/feedback/feedback_id
                </code>
              </CardContent>
            </Card>
          </section>

          <div className="flex justify-between items-center pt-8 border-t border-gray-800">
            <Link href="/docs/api-reference/document-store" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
              <ArrowLeft className="h-4 w-4" />
              <span>Document Store</span>
            </Link>
            <Link href="/docs/api-reference/leads" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
              <span>Leads</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        <QuickLinks links={quickLinks} />
      </div>
    </main>
  );
}
