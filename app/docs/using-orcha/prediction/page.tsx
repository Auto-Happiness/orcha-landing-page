"use client";

import React, { useState, useEffect } from "react";
import { ArrowRight, ArrowLeft, TrendingUp, Zap, Send, BarChart3, Settings, Code, Play, CheckCircle, MessageSquare } from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DocsSidebar from "@/components/docnav/DocumentNavigation";
import navItems from "@/data/document-nav.json";
import QuickLinks from "@/components/quicklinks/QuickLinks";
import quickLinks from "@/data/quicklinks/prediction.json";

export default function PredictionPage() {
  const [activeTab, setActiveTab] = useState("basics");

  useEffect(() => {
    // Check initial hash on mount
    const hash = window.location.hash.replace("#", "");
    if (hash && ["basics", "parameters", "examples", "optimization"].includes(hash)) {
      setActiveTab(hash);
    }

    // Listen for hash changes
    const handleHashChange = () => {
      const newHash = window.location.hash.replace("#", "");
      if (newHash && ["basics", "parameters", "examples", "optimization"].includes(newHash)) {
        setActiveTab(newHash);
      }
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="flex flex-col md:flex-row">
        <DocsSidebar items={navItems} />

        <div className="flex-1 px-6 pt-24 max-w-5xl">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center">
              <TrendingUp className="h-6 w-6 text-white" />
            </div>
            <Badge variant="outline" className="border-blue-500/30 text-blue-300">User Guide</Badge>
          </div>
          <h1 className="text-4xl font-bold mb-4">Prediction</h1>
          <p className="text-lg text-gray-400 max-w-3xl">
            Harness the power of AI prediction to generate responses, analyze data, and make intelligent decisions. Learn how to integrate prediction capabilities into your applications.
          </p>
        </div>

        {/* Quick Start */}
        <Card className="bg-gradient-to-br from-blue-900/20 to-cyan-900/20 border-blue-500/30 mb-8">
          <CardHeader>
            <CardTitle className="text-xl text-white flex items-center gap-2">
              <Zap className="h-5 w-5 text-blue-400" />
              Quick Start
            </CardTitle>
            <CardDescription className="text-gray-300">
              Make your first prediction in under 3 minutes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center gap-3 p-4 bg-gray-800/50 rounded-lg">
                <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-sm font-bold">1</div>
                <span className="text-gray-300">Set up endpoint</span>
              </div>
              <div className="flex items-center gap-3 p-4 bg-gray-800/50 rounded-lg">
                <div className="w-8 h-8 rounded-full bg-cyan-600 flex items-center justify-center text-sm font-bold">2</div>
                <span className="text-gray-300">Configure parameters</span>
              </div>
              <div className="flex items-center gap-3 p-4 bg-gray-800/50 rounded-lg">
                <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center text-sm font-bold">3</div>
                <span className="text-gray-300">Send prediction request</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="grid w-full grid-cols-4 bg-gray-800/50">
            <TabsTrigger value="basics" className="text-gray-300">Basics</TabsTrigger>
            <TabsTrigger value="parameters" className="text-gray-300">Parameters</TabsTrigger>
            <TabsTrigger value="examples" className="text-gray-300">Examples</TabsTrigger>
            <TabsTrigger value="optimization" className="text-gray-300">Optimization</TabsTrigger>
          </TabsList>

          <TabsContent value="basics" id="basics" className="space-y-8">
            {/* What is Prediction */}
            <Card className="bg-gray-900/50 border-gray-800">
              <CardHeader>
                <CardTitle className="text-2xl text-white">Understanding Prediction</CardTitle>
                <CardDescription className="text-gray-400">
                  Prediction is the core of AI interaction - transforming input data into meaningful responses and insights.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                      <Send className="h-5 w-5 text-blue-400" />
                      Core Features
                    </h3>
                    <ul className="space-y-2 text-gray-300">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-400" />
                        <span>Text generation & completion</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-400" />
                        <span>Conversational responses</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-400" />
                        <span>Content analysis</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-400" />
                        <span>Data-driven insights</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                      <BarChart3 className="h-5 w-5 text-cyan-400" />
                      Use Cases
                    </h3>
                    <ul className="space-y-2 text-gray-300">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-400" />
                        <span>Customer support chatbots</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-400" />
                        <span>Content generation</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-400" />
                        <span>Data analysis</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-400" />
                        <span>Decision support</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Basic API Structure */}
            <Card className="bg-gray-900/50 border-gray-800">
              <CardHeader>
                <CardTitle className="text-xl text-white">Prediction API Structure</CardTitle>
                <CardDescription className="text-gray-400">
                  The fundamental components of making predictions with Orcha
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center p-6 bg-gradient-to-br from-blue-600/10 to-blue-800/10 rounded-lg border border-blue-500/20">
                    <MessageSquare className="h-12 w-12 mx-auto mb-4 text-blue-400" />
                    <h3 className="font-semibold text-white mb-2">Input</h3>
                    <p className="text-sm text-gray-400">Messages, context, and parameters</p>
                  </div>
                  <div className="text-center p-6 bg-gradient-to-br from-cyan-600/10 to-cyan-800/10 rounded-lg border border-cyan-500/20">
                    <Settings className="h-12 w-12 mx-auto mb-4 text-cyan-400" />
                    <h3 className="font-semibold text-white mb-2">Processing</h3>
                    <p className="text-sm text-gray-400">AI model inference and analysis</p>
                  </div>
                  <div className="text-center p-6 bg-gradient-to-br from-green-600/10 to-green-800/10 rounded-lg border border-green-500/20">
                    <TrendingUp className="h-12 w-12 mx-auto mb-4 text-green-400" />
                    <h3 className="font-semibold text-white mb-2">Output</h3>
                    <p className="text-sm text-gray-400">Predictions, responses, and insights</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="parameters" id="parameters" className="space-y-8">
            {/* Request Parameters */}
            <Card className="bg-gray-900/50 border-gray-800">
              <CardHeader>
                <CardTitle className="text-xl text-white">Request Parameters</CardTitle>
                <CardDescription className="text-gray-400">
                  Customize your predictions with these powerful parameters
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-gray-950 border border-gray-800 rounded-lg p-4">
                  <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                    <Code className="h-4 w-4 text-blue-400" />
                    Prediction Request Example
                  </h4>
                  <pre className="text-sm font-mono text-gray-300 overflow-x-auto">
{`POST /api/v1/prediction
{
  "messages": [
    {
      "role": "user",
      "content": "Analyze this customer feedback and suggest improvements"
    }
  ],
  "model": "gpt-4",
  "temperature": 0.7,
  "max_tokens": 500,
  "stream": false,
  "context": {
    "company": "TechCorp",
    "domain": "customer_service"
  }
}`}
                  </pre>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-white mb-3">Core Parameters</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded">
                        <span className="text-gray-300">messages</span>
                        <Badge className="bg-blue-600/20 text-blue-300">Required</Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded">
                        <span className="text-gray-300">model</span>
                        <Badge className="bg-cyan-600/20 text-cyan-300">Optional</Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded">
                        <span className="text-gray-300">temperature</span>
                        <Badge className="bg-green-600/20 text-green-300">Optional</Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded">
                        <span className="text-gray-300">max_tokens</span>
                        <Badge className="bg-yellow-600/20 text-yellow-300">Optional</Badge>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-3">Advanced Parameters</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded">
                        <span className="text-gray-300">stream</span>
                        <Badge className="bg-purple-600/20 text-purple-300">Streaming</Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded">
                        <span className="text-gray-300">context</span>
                        <Badge className="bg-indigo-600/20 text-indigo-300">Metadata</Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded">
                        <span className="text-gray-300">tools</span>
                        <Badge className="bg-red-600/20 text-red-300">Function calling</Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded">
                        <span className="text-gray-300">response_format</span>
                        <Badge className="bg-orange-600/20 text-orange-300">Structured output</Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="examples" id="examples" className="space-y-8">
            {/* Example Implementations */}
            <Card className="bg-gray-900/50 border-gray-800">
              <CardHeader>
                <CardTitle className="text-xl text-white">Example Implementations</CardTitle>
                <CardDescription className="text-gray-400">
                  Real-world prediction scenarios with code examples
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Customer Support Bot */}
                  <Card className="bg-gradient-to-br from-blue-900/10 to-blue-800/10 border-blue-500/20">
                    <CardHeader>
                      <CardTitle className="text-lg text-white">Customer Support Bot</CardTitle>
                      <CardDescription className="text-gray-400">
                        Automated customer service with intelligent routing
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="bg-gray-950 rounded-lg p-4 mb-4">
                        <pre className="text-xs font-mono text-gray-300 overflow-x-auto">
{`const supportResponse = await predict({
  messages: [{ role: "user", content: userQuery }],
  context: { intent: "support", priority: "high" },
  temperature: 0.3
});`}
                        </pre>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-400" />
                          <span className="text-sm text-gray-300">Query classification</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-400" />
                          <span className="text-sm text-gray-300">Automated responses</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-400" />
                          <span className="text-sm text-gray-300">Escalation detection</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Content Generation */}
                  <Card className="bg-gradient-to-br from-cyan-900/10 to-cyan-800/10 border-cyan-500/20">
                    <CardHeader>
                      <CardTitle className="text-lg text-white">Content Generation</CardTitle>
                      <CardDescription className="text-gray-400">
                        AI-powered content creation with custom styling
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="bg-gray-950 rounded-lg p-4 mb-4">
                        <pre className="text-xs font-mono text-gray-300 overflow-x-auto">
{`const article = await predict({
  messages: [{ role: "user", content: "Write about AI trends" }],
  model: "gpt-4",
  temperature: 0.8,
  context: { style: "professional", length: "medium" }
});`}
                        </pre>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-400" />
                          <span className="text-sm text-gray-300">Topic research</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-400" />
                          <span className="text-sm text-gray-300">Structured writing</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-400" />
                          <span className="text-sm text-gray-300">Style adaptation</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="optimization" id="optimization" className="space-y-8">
            {/* Performance Optimization */}
            <Card className="bg-gray-900/50 border-gray-800">
              <CardHeader>
                <CardTitle className="text-xl text-white">Performance Optimization</CardTitle>
                <CardDescription className="text-gray-400">
                  Maximize prediction speed and quality
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-white mb-3">Speed Optimization</h4>
                    <div className="space-y-3">
                      <div className="p-3 bg-gray-800/50 rounded">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-gray-300">Temperature</span>
                          <Badge className="bg-green-600/20 text-green-300">0.1 - 0.3</Badge>
                        </div>
                        <p className="text-xs text-gray-400">Lower values = faster, more consistent</p>
                      </div>
                      <div className="p-3 bg-gray-800/50 rounded">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-gray-300">Max Tokens</span>
                          <Badge className="bg-blue-600/20 text-blue-300">100-300</Badge>
                        </div>
                        <p className="text-xs text-gray-400">Limit response length</p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-3">Quality Enhancement</h4>
                    <div className="space-y-3">
                      <div className="p-3 bg-gray-800/50 rounded">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-gray-300">Context</span>
                        </div>
                        <p className="text-xs text-gray-400">Provide relevant background information</p>
                      </div>
                      <div className="p-3 bg-gray-800/50 rounded">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-gray-300">Examples</span>
                        </div>
                        <p className="text-xs text-gray-400">Include few-shot examples in prompts</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Best Practices */}
            <Card className="bg-gradient-to-br from-gray-900 to-gray-900/50 border-gray-800">
              <CardHeader>
                <CardTitle className="text-xl text-white">Best Practices</CardTitle>
                <CardDescription className="text-gray-400">
                  Tips for building reliable prediction-powered applications
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-white mb-3">Request Handling</h4>
                    <ul className="space-y-2 text-sm text-gray-400">
                      <li>• Implement proper error handling</li>
                      <li>• Use exponential backoff for retries</li>
                      <li>• Set reasonable timeouts</li>
                      <li>• Validate input before sending</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-3">Response Processing</h4>
                    <ul className="space-y-2 text-sm text-gray-400">
                      <li>• Parse responses safely</li>
                      <li>• Implement fallback responses</li>
                      <li>• Cache frequent predictions</li>
                      <li>• Monitor response quality</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Navigation */}
        <div className="flex justify-between items-center pt-8 border-t border-gray-800 mt-12">
          <Link href="/docs/using-orcha/agent-orcha-strate" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
            <ArrowLeft className="h-4 w-4" />
            <span>Agent Orcha-strate</span>
          </Link>
          <Link href="/docs/using-orcha/streaming" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
            <span>Streaming</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      <QuickLinks links={quickLinks} />
    </div>
    </main>
  );
}
