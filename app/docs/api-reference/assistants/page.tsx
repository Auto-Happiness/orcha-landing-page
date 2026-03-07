"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bot, ArrowLeft, ArrowRight } from "lucide-react";
import DocsSidebar from "@/components/docnav/DocumentNavigation";
import navItems from "@/data/document-nav.json";
import QuickLinks from "@/components/quicklinks/QuickLinks";
import quickLinks from "@/data/quicklinks/assistants.json";
import Link from "next/link";

export default function AssistantsApiPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <div className="flex flex-col md:flex-row">
        <DocsSidebar items={navItems} />

        <div className="flex-1 px-6 pt-24 max-w-5xl">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-violet-600 flex items-center justify-center">
                <Bot className="h-6 w-6 text-white" />
              </div>
              <Badge variant="outline" className="border-purple-500/30 text-purple-300">Assistants</Badge>
            </div>
            <h1 className="text-4xl font-bold mb-4">Assistants API</h1>
            <p className="text-lg text-gray-400">
              Create and manage AI assistants with custom instructions, tools, and configurations.
            </p>
          </div>

          {/* Create Assistant */}
          <section id="create" className="mb-12">
            <Card className="bg-gray-900/50 border-gray-800">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Badge className="bg-green-500/20 text-green-300 border-green-500/30">POST</Badge>
                  <CardTitle className="text-xl text-white">Create a new assistant</CardTitle>
                </div>
                <CardDescription className="text-gray-400">
                  Create a new assistant with the provided details
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <p className="text-sm text-gray-400 mb-2">Endpoint</p>
                  <code className="block bg-gray-950 border border-gray-800 rounded-lg p-3 text-sm font-mono text-green-400">
                    POST /api/v1/assistants
                  </code>
                </div>

                <div>
                  <p className="text-sm text-gray-400 mb-3">Request Body</p>
                  <div className="bg-gray-950 border border-gray-800 rounded-lg p-4 overflow-x-auto">
                    <pre className="text-sm font-mono text-gray-300">
{`{
  "name": "Customer Support Bot",
  "description": "AI assistant for customer inquiries",
  "instructions": "You are a helpful customer support agent...",
  "model": "gpt-4",
  "tools": ["search", "calculator"],
  "metadata": {
    "department": "support",
    "language": "en"
  }
}`}
                    </pre>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-gray-400 mb-3">Response (201 Created)</p>
                  <div className="bg-gray-950 border border-gray-800 rounded-lg p-4 overflow-x-auto">
                    <pre className="text-sm font-mono text-gray-300">
{`{
  "id": "asst_d290f1ee6c544b0190e6d701748f0851",
  "name": "Customer Support Bot",
  "description": "AI assistant for customer inquiries",
  "instructions": "You are a helpful customer support agent...",
  "model": "gpt-4",
  "tools": ["search", "calculator"],
  "metadata": {
    "department": "support",
    "language": "en"
  },
  "created_at": "2024-08-24T14:15:22Z",
  "updated_at": "2024-08-24T14:15:22Z"
}`}
                    </pre>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="border-red-500/30 text-red-400">400 - Invalid input</Badge>
                  <Badge variant="outline" className="border-red-500/30 text-red-400">401 - Unauthorized</Badge>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Get Assistant */}
          <section id="get" className="mb-12">
            <Card className="bg-gray-900/50 border-gray-800">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30">GET</Badge>
                  <CardTitle className="text-xl text-white">Get assistant by ID</CardTitle>
                </div>
                <CardDescription className="text-gray-400">
                  Retrieve a specific assistant by its unique identifier
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <p className="text-sm text-gray-400 mb-2">Endpoint</p>
                  <code className="block bg-gray-950 border border-gray-800 rounded-lg p-3 text-sm font-mono text-blue-400">
                    GET /api/v1/assistants/assistant_id
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
                          <td className="px-4 py-2 text-gray-300 font-mono">assistant_id</td>
                          <td className="px-4 py-2 text-gray-400">string</td>
                          <td className="px-4 py-2 text-gray-400">Unique identifier of the assistant</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-gray-400 mb-3">Response (200 OK)</p>
                  <div className="bg-gray-950 border border-gray-800 rounded-lg p-4 overflow-x-auto">
                    <pre className="text-sm font-mono text-gray-300">
{`{
  "id": "asst_d290f1ee6c544b0190e6d701748f0851",
  "name": "Customer Support Bot",
  "description": "AI assistant for customer inquiries",
  "instructions": "You are a helpful customer support agent...",
  "model": "gpt-4",
  "tools": ["search", "calculator"],
  "metadata": {
    "department": "support"
  },
  "created_at": "2024-08-24T14:15:22Z",
  "updated_at": "2024-08-24T14:15:22Z"
}`}
                    </pre>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="border-red-500/30 text-red-400">404 - Assistant not found</Badge>
                  <Badge variant="outline" className="border-red-500/30 text-red-400">400 - Invalid ID format</Badge>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Update Assistant */}
          <section id="update" className="mb-12">
            <Card className="bg-gray-900/50 border-gray-800">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Badge className="bg-yellow-500/20 text-yellow-300 border-yellow-500/30">PUT</Badge>
                  <CardTitle className="text-xl text-white">Update assistant details</CardTitle>
                </div>
                <CardDescription className="text-gray-400">
                  Update the details of an existing assistant
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <p className="text-sm text-gray-400 mb-2">Endpoint</p>
                  <code className="block bg-gray-950 border border-gray-800 rounded-lg p-3 text-sm font-mono text-yellow-400">
                    PUT /api/v1/assistants/assistant_id
                  </code>
                </div>

                <div>
                  <p className="text-sm text-gray-400 mb-3">Request Body</p>
                  <div className="bg-gray-950 border border-gray-800 rounded-lg p-4 overflow-x-auto">
                    <pre className="text-sm font-mono text-gray-300">
{`{
  "name": "Updated Support Bot",
  "instructions": "Updated instructions...",
  "tools": ["search", "calculator", "calendar"]
}`}
                    </pre>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-gray-400 mb-3">Response (200 OK)</p>
                  <div className="bg-gray-950 border border-gray-800 rounded-lg p-4 overflow-x-auto">
                    <pre className="text-sm font-mono text-gray-300">
{`{
  "id": "asst_d290f1ee6c544b0190e6d701748f0851",
  "name": "Updated Support Bot",
  "updated_at": "2024-08-24T16:30:45Z"
}`}
                    </pre>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Delete Assistant */}
          <section id="delete" className="mb-12">
            <Card className="bg-gray-900/50 border-gray-800">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Badge className="bg-red-500/20 text-red-300 border-red-500/30">DELETE</Badge>
                  <CardTitle className="text-xl text-white">Delete an assistant</CardTitle>
                </div>
                <CardDescription className="text-gray-400">
                  Permanently delete an assistant and all associated data
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <p className="text-sm text-gray-400 mb-2">Endpoint</p>
                  <code className="block bg-gray-950 border border-gray-800 rounded-lg p-3 text-sm font-mono text-red-400">
                    DELETE /api/v1/assistants/assistant_id
                  </code>
                </div>

                <div>
                  <p className="text-sm text-gray-400 mb-3">Response (204 No Content)</p>
                  <p className="text-sm text-gray-500">No response body on successful deletion.</p>
                </div>

                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="border-yellow-600/50 text-yellow-400">Warning</Badge>
                  <span className="text-sm text-gray-400">This action cannot be undone.</span>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Navigation */}
          <div className="flex justify-between items-center pt-8 border-t border-gray-800">
            <Link href="/docs/api-reference" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
              <ArrowLeft className="h-4 w-4" />
              <span>API Reference Overview</span>
            </Link>
            <Link href="/docs/api-reference/attachments" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
              <span>Attachments</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        <QuickLinks links={quickLinks} />
      </div>
    </main>
  );
}
