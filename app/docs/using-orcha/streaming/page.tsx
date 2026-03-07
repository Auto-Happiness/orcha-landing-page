"use client";

import React, { useState, useEffect } from "react";
import { ArrowRight, ArrowLeft, Zap, Radio, Activity, Clock, Code, Play, CheckCircle, MessageSquare, AlertTriangle } from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DocsSidebar from "@/components/docnav/DocumentNavigation";
import navItems from "@/data/document-nav.json";
import QuickLinks from "@/components/quicklinks/QuickLinks";
import quickLinks from "@/data/quicklinks/streaming.json";

export default function StreamingPage() {
  const [activeTab, setActiveTab] = useState("basics");

  useEffect(() => {
    // Check initial hash on mount
    const hash = window.location.hash.replace("#", "");
    if (hash && ["basics", "implementation", "examples", "best-practices"].includes(hash)) {
      setActiveTab(hash);
    }

    // Listen for hash changes
    const handleHashChange = () => {
      const newHash = window.location.hash.replace("#", "");
      if (newHash && ["basics", "implementation", "examples", "best-practices"].includes(newHash)) {
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
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center">
              <Radio className="h-6 w-6 text-white" />
            </div>
            <Badge variant="outline" className="border-emerald-500/30 text-emerald-300">User Guide</Badge>
          </div>
          <h1 className="text-4xl font-bold mb-4">Streaming</h1>
          <p className="text-lg text-gray-400 max-w-3xl">
            Enable real-time streaming responses for a more interactive and engaging user experience. Learn how to implement live AI responses in your applications.
          </p>
        </div>

        {/* Quick Start */}
        <Card className="bg-gradient-to-br from-emerald-900/20 to-green-900/20 border-emerald-500/30 mb-8">
          <CardHeader>
            <CardTitle className="text-xl text-white flex items-center gap-2">
              <Zap className="h-5 w-5 text-emerald-400" />
              Quick Start
            </CardTitle>
            <CardDescription className="text-gray-300">
              Enable streaming in your first prediction request
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center gap-3 p-4 bg-gray-800/50 rounded-lg">
                <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center text-sm font-bold">1</div>
                <span className="text-gray-300">Set stream: true</span>
              </div>
              <div className="flex items-center gap-3 p-4 bg-gray-800/50 rounded-lg">
                <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center text-sm font-bold">2</div>
                <span className="text-gray-300">Handle SSE events</span>
              </div>
              <div className="flex items-center gap-3 p-4 bg-gray-800/50 rounded-lg">
                <div className="w-8 h-8 rounded-full bg-cyan-600 flex items-center justify-center text-sm font-bold">3</div>
                <span className="text-gray-300">Update UI in real-time</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="grid w-full grid-cols-4 bg-gray-800/50">
            <TabsTrigger value="basics" className="text-gray-300">Basics</TabsTrigger>
            <TabsTrigger value="implementation" className="text-gray-300">Implementation</TabsTrigger>
            <TabsTrigger value="examples" className="text-gray-300">Examples</TabsTrigger>
            <TabsTrigger value="best-practices" className="text-gray-300">Best Practices</TabsTrigger>
          </TabsList>

          <TabsContent value="basics" id="basics" className="space-y-8">
            {/* What is Streaming */}
            <Card className="bg-gray-900/50 border-gray-800">
              <CardHeader>
                <CardTitle className="text-2xl text-white">Understanding Streaming</CardTitle>
                <CardDescription className="text-gray-400">
                  Streaming enables real-time delivery of AI responses, creating a more interactive and responsive user experience.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                      <Activity className="h-5 w-5 text-emerald-400" />
                      Key Benefits
                    </h3>
                    <ul className="space-y-2 text-gray-300">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-400" />
                        <span>Real-time response delivery</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-400" />
                        <span>Improved user experience</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-400" />
                        <span>Reduced perceived latency</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-400" />
                        <span>Progressive content display</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                      <Clock className="h-5 w-5 text-green-400" />
                      When to Use
                    </h3>
                    <ul className="space-y-2 text-gray-300">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-400" />
                        <span>Chat applications</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-400" />
                        <span>Content generation</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-400" />
                        <span>Long-form responses</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-400" />
                        <span>Interactive experiences</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* How Streaming Works */}
            <Card className="bg-gray-900/50 border-gray-800">
              <CardHeader>
                <CardTitle className="text-xl text-white">How Streaming Works</CardTitle>
                <CardDescription className="text-gray-400">
                  The technical foundation of real-time AI responses
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center p-6 bg-gradient-to-br from-emerald-600/10 to-emerald-800/10 rounded-lg border border-emerald-500/20">
                    <MessageSquare className="h-12 w-12 mx-auto mb-4 text-emerald-400" />
                    <h3 className="font-semibold text-white mb-2">Request</h3>
                    <p className="text-sm text-gray-400">Send prediction with stream: true</p>
                  </div>
                  <div className="text-center p-6 bg-gradient-to-br from-green-600/10 to-green-800/10 rounded-lg border border-green-500/20">
                    <Radio className="h-12 w-12 mx-auto mb-4 text-green-400" />
                    <h3 className="font-semibold text-white mb-2">Server-Sent Events</h3>
                    <p className="text-sm text-gray-400">AI generates and streams tokens</p>
                  </div>
                  <div className="text-center p-6 bg-gradient-to-br from-cyan-600/10 to-cyan-800/10 rounded-lg border border-cyan-500/20">
                    <Activity className="h-12 w-12 mx-auto mb-4 text-cyan-400" />
                    <h3 className="font-semibold text-white mb-2">Real-time Display</h3>
                    <p className="text-sm text-gray-400">UI updates as tokens arrive</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="implementation" id="implementation" className="space-y-8">
            {/* Client Implementation */}
            <Card className="bg-gray-900/50 border-gray-800">
              <CardHeader>
                <CardTitle className="text-xl text-white">Client Implementation</CardTitle>
                <CardDescription className="text-gray-400">
                  How to handle streaming responses in your application
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-gray-950 border border-gray-800 rounded-lg p-4">
                  <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                    <Code className="h-4 w-4 text-emerald-400" />
                    JavaScript Streaming Example
                  </h4>
                  <pre className="text-sm font-mono text-gray-300 overflow-x-auto">
{`// Frontend streaming implementation
async function streamPrediction(userMessage) {
  const response = await fetch('/api/v1/prediction', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      messages: [{ role: 'user', content: userMessage }],
      stream: true,
      temperature: 0.7
    })
  });

  const reader = response.body.getReader();
  const decoder = new TextDecoder();

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    const chunk = decoder.decode(value);
    const lines = chunk.split('\n');

    for (const line of lines) {
      if (line.startsWith('data: ')) {
        const data = line.slice(6);
        if (data === '[DONE]') return;

        try {
          const parsed = JSON.parse(data);
          // Update UI with new token
          updateUI(parsed.choices[0].delta.content);
        } catch (e) {
          console.error('Parse error:', e);
        }
      }
    }
  }
}`}
                  </pre>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-white mb-3">Event Types</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded">
                        <span className="text-gray-300">data: [content]</span>
                        <Badge className="bg-emerald-600/20 text-emerald-300">Token</Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded">
                        <span className="text-gray-300">data: [DONE]</span>
                        <Badge className="bg-green-600/20 text-green-300">Complete</Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded">
                        <span className="text-gray-300">error</span>
                        <Badge className="bg-red-600/20 text-red-300">Error</Badge>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-3">Connection Handling</h4>
                    <div className="space-y-3">
                      <div className="p-3 bg-gray-800/50 rounded">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-gray-300">Connection Timeout</span>
                          <Badge className="bg-yellow-600/20 text-yellow-300">30s</Badge>
                        </div>
                        <p className="text-xs text-gray-400">Handle network interruptions gracefully</p>
                      </div>
                      <div className="p-3 bg-gray-800/50 rounded">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-gray-300">Reconnection</span>
                          <Badge className="bg-blue-600/20 text-blue-300">Auto</Badge>
                        </div>
                        <p className="text-xs text-gray-400">Implement exponential backoff</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="examples" id="examples" className="space-y-8">
            {/* Example Applications */}
            <Card className="bg-gray-900/50 border-gray-800">
              <CardHeader>
                <CardTitle className="text-xl text-white">Example Applications</CardTitle>
                <CardDescription className="text-gray-400">
                  Real-world streaming implementations you can build
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Chat Interface */}
                  <Card className="bg-gradient-to-br from-emerald-900/10 to-emerald-800/10 border-emerald-500/20">
                    <CardHeader>
                      <CardTitle className="text-lg text-white">Real-time Chat Interface</CardTitle>
                      <CardDescription className="text-gray-400">
                        Build a responsive chat experience with live typing indicators
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="bg-gray-950 rounded-lg p-4 mb-4">
                        <pre className="text-xs font-mono text-gray-300 overflow-x-auto">
{`// React chat component with streaming
function ChatMessage({ message, isStreaming }) {
  return (
    <div className="message">
      {message}
      {isStreaming && <span className="cursor">|</span>}
    </div>
  );
}`}
                        </pre>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-400" />
                          <span className="text-sm text-gray-300">Live text appearance</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-400" />
                          <span className="text-sm text-gray-300">Typing indicators</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-400" />
                          <span className="text-sm text-gray-300">Smooth animations</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Content Generation */}
                  <Card className="bg-gradient-to-br from-green-900/10 to-green-800/10 border-green-500/20">
                    <CardHeader>
                      <CardTitle className="text-lg text-white">Progressive Content Generation</CardTitle>
                      <CardDescription className="text-gray-400">
                        Watch AI content unfold in real-time as it's generated
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="bg-gray-950 rounded-lg p-4 mb-4">
                        <pre className="text-xs font-mono text-gray-300 overflow-x-auto">
{`// Content editor with live streaming
function ContentEditor() {
  const [content, setContent] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const generateContent = async () => {
    setIsGenerating(true);
    const stream = await streamPrediction(prompt);
    for await (const chunk of stream) {
      setContent(prev => prev + chunk);
    }
    setIsGenerating(false);
  };
}`}
                        </pre>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-400" />
                          <span className="text-sm text-gray-300">Real-time editing</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-400" />
                          <span className="text-sm text-gray-300">Progress indicators</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-400" />
                          <span className="text-sm text-gray-300">Cancellation support</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="best-practices" id="best-practices" className="space-y-8">
            {/* Performance & UX */}
            <Card className="bg-gray-900/50 border-gray-800">
              <CardHeader>
                <CardTitle className="text-xl text-white">Performance & User Experience</CardTitle>
                <CardDescription className="text-gray-400">
                  Optimize streaming for the best user experience
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-white mb-3">UI Considerations</h4>
                    <div className="space-y-3">
                      <div className="p-3 bg-gray-800/50 rounded">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-gray-300">Loading States</span>
                          <Badge className="bg-emerald-600/20 text-emerald-300">Essential</Badge>
                        </div>
                        <p className="text-xs text-gray-400">Show progress during generation</p>
                      </div>
                      <div className="p-3 bg-gray-800/50 rounded">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-gray-300">Error Handling</span>
                          <Badge className="bg-red-600/20 text-red-300">Critical</Badge>
                        </div>
                        <p className="text-xs text-gray-400">Graceful failure recovery</p>
                      </div>
                      <div className="p-3 bg-gray-800/50 rounded">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-gray-300">Cancellation</span>
                          <Badge className="bg-yellow-600/20 text-yellow-300">Recommended</Badge>
                        </div>
                        <p className="text-xs text-gray-400">Allow users to stop generation</p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-3">Performance Tips</h4>
                    <div className="space-y-3">
                      <div className="p-3 bg-gray-800/50 rounded">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-gray-300">Connection Pooling</span>
                          <Badge className="bg-blue-600/20 text-blue-300">Advanced</Badge>
                        </div>
                        <p className="text-xs text-gray-400">Reuse connections for efficiency</p>
                      </div>
                      <div className="p-3 bg-gray-800/50 rounded">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-gray-300">Buffering Strategy</span>
                          <Badge className="bg-purple-600/20 text-purple-300">Important</Badge>
                        </div>
                        <p className="text-xs text-gray-400">Balance responsiveness vs. smoothness</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Common Pitfalls */}
            <Card className="bg-gradient-to-br from-gray-900 to-gray-900/50 border-gray-800">
              <CardHeader>
                <CardTitle className="text-xl text-white flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-yellow-400" />
                  Common Pitfalls & Solutions
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Avoid these common streaming implementation mistakes
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-white mb-3">Technical Issues</h4>
                    <ul className="space-y-2 text-sm text-gray-400">
                      <li>• Memory leaks from unclosed streams</li>
                      <li>• Race conditions in UI updates</li>
                      <li>• Network interruption handling</li>
                      <li>• Browser compatibility issues</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-3">UX Problems</h4>
                    <ul className="space-y-2 text-sm text-gray-400">
                      <li>• Janky text appearance animations</li>
                      <li>• Missing loading states</li>
                      <li>• Inconsistent error messages</li>
                      <li>• Poor mobile experience</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Navigation */}
        <div className="flex justify-between items-center pt-8 border-t border-gray-800 mt-12">
          <Link href="/docs/using-orcha/prediction" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
            <ArrowLeft className="h-4 w-4" />
            <span>Prediction</span>
          </Link>
          <Link href="/docs/using-orcha/document-store" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
            <span>Document Store</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      <QuickLinks links={quickLinks} />
    </div>
    </main>
  );
}
