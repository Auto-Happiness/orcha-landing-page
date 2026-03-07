"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Send, ArrowLeft, ArrowRight } from "lucide-react";
import DocsSidebar from "@/components/docnav/DocumentNavigation";
import navItems from "@/data/document-nav.json";
import QuickLinks from "@/components/quicklinks/QuickLinks";
import quickLinks from "@/data/quicklinks/prediction.json";
import Link from "next/link";

export default function PredictionApiPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <div className="flex flex-col md:flex-row">
        <DocsSidebar items={navItems} />

        <div className="flex-1 px-6 py-10 pt-24 max-w-5xl">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-500 to-pink-600 flex items-center justify-center">
                <Send className="h-6 w-6 text-white" />
              </div>
              <Badge variant="outline" className="border-red-500/30 text-red-300">Prediction</Badge>
            </div>
            <h1 className="text-4xl font-bold mb-4">Prediction API</h1>
            <p className="text-lg text-gray-400">
              Send messages to flows and receive AI responses. The primary endpoint for interacting with your AI flows.
            </p>
          </div>

          <section id="send" className="mb-12">
            <Card className="bg-gray-900/50 border-gray-800">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Badge className="bg-green-500/20 text-green-300 border-green-500/30">POST</Badge>
                  <CardTitle className="text-xl text-white">Send message to flow</CardTitle>
                </div>
                <CardDescription className="text-gray-400">
                  Send a message to your flow and receive an AI-generated response
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <p className="text-sm text-gray-400 mb-2">Endpoint</p>
                  <code className="block bg-gray-950 border border-gray-800 rounded-lg p-3 text-sm font-mono text-green-400">
                    POST /api/v1/prediction/chatflow_id
                  </code>
                </div>

                <div>
                  <p className="text-sm text-gray-400 mb-3">Path Parameters</p>
                  <div className="bg-gray-950 border border-gray-800 rounded-lg overflow-hidden">
                    <table className="w-full text-sm">
                      <thead className="bg-gray-800">
                        <tr>
                          <th className="px-4 py-2 text-left text-gray-300">Parameter</th>
                          <th className="px-4 py-2 text-left text-gray-300">Type</th>
                          <th className="px-4 py-2 text-left text-gray-300">Description</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-t border-gray-800">
                          <td className="px-4 py-2 text-gray-300 font-mono">chatflow_id</td>
                          <td className="px-4 py-2 text-gray-400">string</td>
                          <td className="px-4 py-2 text-gray-400">Unique identifier of the chatflow</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-gray-400 mb-3">Request Body</p>
                  <div className="bg-gray-950 border border-gray-800 rounded-lg p-4 overflow-x-auto">
                    <pre className="text-sm font-mono text-gray-300">
{`{
  "question": "What is artificial intelligence?",
  "history": [
    {
      "role": "apiMessage",
      "content": "Hello! I'm an AI assistant."
    }
  ],
  "overrideConfig": {
    "temperature": 0.7,
    "maxTokens": 500,
    "sessionId": "user-session-123"
  },
  "streaming": false,
  "uploads": [
    {
      "type": "file",
      "name": "image.png",
      "data": "base64encoded...",
      "mime": "image/png"
    }
  ]
}`}
                    </pre>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-gray-400 mb-3">Response (200 OK)</p>
                  <div className="bg-gray-950 border border-gray-800 rounded-lg p-4 overflow-x-auto">
                    <pre className="text-sm font-mono text-gray-300">
{`{
  "text": "Artificial intelligence (AI) is a branch of computer science...",
  "question": "What is artificial intelligence?",
  "chatId": "chat-12345",
  "messageId": "msg-67890",
  "sessionId": "user-session-123",
  "memoryType": "Buffer Memory",
  "sourceDocuments": []
}`}
                    </pre>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="border-red-500/30 text-red-400">400 - Invalid input</Badge>
                  <Badge variant="outline" className="border-red-500/30 text-red-400">401 - Unauthorized</Badge>
                  <Badge variant="outline" className="border-red-500/30 text-red-400">404 - Chatflow not found</Badge>
                </div>
              </CardContent>
            </Card>
          </section>

          <div className="flex justify-between items-center pt-8 border-t border-gray-800">
            <Link href="/docs/api-reference/ping" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
              <ArrowLeft className="h-4 w-4" />
              <span>Ping</span>
            </Link>
            <Link href="/docs/api-reference/tools" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
              <span>Tools</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        <QuickLinks links={quickLinks} />
      </div>
    </main>
  );
}
