"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, ArrowLeft, ArrowRight } from "lucide-react";
import DocsSidebar from "@/components/docnav/DocumentNavigation";
import navItems from "@/data/document-nav.json";
import QuickLinks from "@/components/quicklinks/QuickLinks";
import quickLinks from "@/data/quicklinks/chat-message.json";
import Link from "next/link";

export default function ChatMessageApiPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <div className="flex flex-col md:flex-row">
        <DocsSidebar items={navItems} />

        <div className="flex-1 px-6 py-10 pt-24 max-w-5xl">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center">
                <MessageSquare className="h-6 w-6 text-white" />
              </div>
              <Badge variant="outline" className="border-emerald-500/30 text-emerald-300">Chat Message</Badge>
            </div>
            <h1 className="text-4xl font-bold mb-4">Chat Message API</h1>
            <p className="text-lg text-gray-400">
              Send messages and manage conversation history for your chatflows.
            </p>
          </div>

          <section id="send" className="mb-12">
            <Card className="bg-gray-900/50 border-gray-800">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Badge className="bg-green-500/20 text-green-300 border-green-500/30">POST</Badge>
                  <CardTitle className="text-xl text-white">Send message</CardTitle>
                </div>
                <CardDescription className="text-gray-400">Send a message to a chatflow</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <code className="block bg-gray-950 border border-gray-800 rounded-lg p-3 text-sm font-mono text-green-400">
                  POST /api/v1/chat-message
                </code>
                <div>
                  <p className="text-sm text-gray-400 mb-3">Request Body</p>
                  <div className="bg-gray-950 border border-gray-800 rounded-lg p-4">
                    <pre className="text-sm font-mono text-gray-300">
{`{
  "chatflowId": "chat_7db93c028d5a41178f13dfb6721b339",
  "message": "Hello, how can you help me?",
  "sessionId": "sess_user123",
  "history": [
    { "role": "user", "content": "Hi there" },
    { "role": "assistant", "content": "Hello! How can I help?" }
  ]
}`}
                    </pre>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-3">Response (200 OK)</p>
                  <div className="bg-gray-950 border border-gray-800 rounded-lg p-4">
                    <pre className="text-sm font-mono text-gray-300">
{`{
  "id": "msg_abc123",
  "chatflowId": "chat_7db93c028d5a41178f13dfb6721b339",
  "role": "assistant",
  "content": "I can help you with various tasks...",
  "sessionId": "sess_user123",
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
                  <CardTitle className="text-xl text-white">Get messages</CardTitle>
                </div>
                <CardDescription className="text-gray-400">Retrieve chat history</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <code className="block bg-gray-950 border border-gray-800 rounded-lg p-3 text-sm font-mono text-blue-400">
                  GET /api/v1/chat-message?chatflowId=chat_xxx&sessionId=sess_xxx
                </code>
                <div>
                  <p className="text-sm text-gray-400 mb-3">Query Parameters</p>
                  <div className="bg-gray-950 border border-gray-800 rounded-lg overflow-hidden">
                    <table className="w-full text-sm">
                      <thead className="bg-gray-800">
                        <tr>
                          <th className="px-4 py-2 text-left text-gray-300">Parameter</th>
                          <th className="px-4 py-2 text-left text-gray-300">Type</th>
                          <th className="px-4 py-2 text-left text-gray-300">Required</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-t border-gray-800">
                          <td className="px-4 py-2 text-gray-300 font-mono">chatflowId</td>
                          <td className="px-4 py-2 text-gray-400">string</td>
                          <td className="px-4 py-2 text-gray-400">Yes</td>
                        </tr>
                        <tr className="border-t border-gray-800">
                          <td className="px-4 py-2 text-gray-300 font-mono">sessionId</td>
                          <td className="px-4 py-2 text-gray-400">string</td>
                          <td className="px-4 py-2 text-gray-400">No</td>
                        </tr>
                      </tbody>
                    </table>
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
                  <CardTitle className="text-xl text-white">Delete messages</CardTitle>
                </div>
                <CardDescription className="text-gray-400">Clear chat history for a session</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <code className="block bg-gray-950 border border-gray-800 rounded-lg p-3 text-sm font-mono text-red-400">
                  DELETE /api/v1/chat-message?chatflowId=chat_xxx&sessionId=sess_xxx
                </code>
                <p className="text-sm text-gray-500">Response: 204 No Content</p>
              </CardContent>
            </Card>
          </section>

          <div className="flex justify-between items-center pt-8 border-t border-gray-800">
            <Link href="/docs/api-reference/attachments" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
              <ArrowLeft className="h-4 w-4" />
              <span>Attachments</span>
            </Link>
            <Link href="/docs/api-reference/chatflows" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
              <span>Chatflows</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        <QuickLinks links={quickLinks} />
      </div>
    </main>
  );
}
