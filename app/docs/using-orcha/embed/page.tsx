"use client";

import React, { useState, useEffect } from "react";
import { ArrowRight, ArrowLeft, Code, Settings, Palette, Globe, Smartphone, Zap, CheckCircle, ExternalLink, Monitor } from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DocsSidebar from "@/components/docnav/DocumentNavigation";
import navItems from "@/data/document-nav.json";
import QuickLinks from "@/components/quicklinks/QuickLinks";
import quickLinks from "@/data/quicklinks/embed.json";

export default function EmbedPage() {
  const [activeTab, setActiveTab] = useState("getting-started");

  useEffect(() => {
    // Check initial hash on mount
    const hash = window.location.hash.replace("#", "");
    if (hash && ["getting-started", "customization", "integrations", "advanced"].includes(hash)) {
      setActiveTab(hash);
    }

    // Listen for hash changes
    const handleHashChange = () => {
      const newHash = window.location.hash.replace("#", "");
      if (newHash && ["getting-started", "customization", "integrations", "advanced"].includes(newHash)) {
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
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center">
              <Code className="h-6 w-6 text-white" />
            </div>
            <Badge variant="outline" className="border-teal-500/30 text-teal-300">User Guide</Badge>
          </div>
          <h1 className="text-4xl font-bold mb-4">Embed</h1>
          <p className="text-lg text-gray-400 max-w-3xl">
            Seamlessly integrate Orcha's AI capabilities into your website or application. Deploy chatbots, widgets, and interactive experiences with just a few lines of code.
          </p>
        </div>

        {/* Quick Start */}
        <Card className="bg-gradient-to-br from-teal-900/20 to-cyan-900/20 border-teal-500/30 mb-8">
          <CardHeader>
            <CardTitle className="text-xl text-white flex items-center gap-2">
              <Zap className="h-5 w-5 text-teal-400" />
              Quick Start
            </CardTitle>
            <CardDescription className="text-gray-300">
              Add a chatbot to your website in under 2 minutes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center gap-3 p-4 bg-gray-800/50 rounded-lg">
                <div className="w-8 h-8 rounded-full bg-teal-600 flex items-center justify-center text-sm font-bold">1</div>
                <span className="text-gray-300">Generate embed code</span>
              </div>
              <div className="flex items-center gap-3 p-4 bg-gray-800/50 rounded-lg">
                <div className="w-8 h-8 rounded-full bg-cyan-600 flex items-center justify-center text-sm font-bold">2</div>
                <span className="text-gray-300">Add to your HTML</span>
              </div>
              <div className="flex items-center gap-3 p-4 bg-gray-800/50 rounded-lg">
                <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center text-sm font-bold">3</div>
                <span className="text-gray-300">Customize appearance</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="grid w-full grid-cols-4 bg-gray-800/50">
            <TabsTrigger value="getting-started" className="text-gray-300">Getting Started</TabsTrigger>
            <TabsTrigger value="customization" className="text-gray-300">Customization</TabsTrigger>
            <TabsTrigger value="integrations" className="text-gray-300">Integrations</TabsTrigger>
            <TabsTrigger value="advanced" className="text-gray-300">Advanced</TabsTrigger>
          </TabsList>

          <TabsContent value="getting-started" id="getting-started" className="space-y-8">
            {/* Embed Types */}
            <Card className="bg-gray-900/50 border-gray-800">
              <CardHeader>
                <CardTitle className="text-2xl text-white">Embed Types</CardTitle>
                <CardDescription className="text-gray-400">
                  Choose the right embedding option for your use case
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                      <Monitor className="h-5 w-5 text-teal-400" />
                      Chat Widget
                    </h3>
                    <ul className="space-y-2 text-gray-300">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-400" />
                        <span>Floating chat bubble</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-400" />
                        <span>Expandable interface</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-400" />
                        <span>Persistent conversations</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-400" />
                        <span>Mobile responsive</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                      <Code className="h-5 w-5 text-cyan-400" />
                      Inline Widget
                    </h3>
                    <ul className="space-y-2 text-gray-300">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-400" />
                        <span>Embedded in page content</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-400" />
                        <span>Customizable dimensions</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-400" />
                        <span>Seamless integration</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-400" />
                        <span>Context-aware responses</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Basic Implementation */}
            <Card className="bg-gray-900/50 border-gray-800">
              <CardHeader>
                <CardTitle className="text-xl text-white">Basic Implementation</CardTitle>
                <CardDescription className="text-gray-400">
                  Add Orcha to your website with minimal code changes
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-950 border border-gray-800 rounded-lg p-4">
                  <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                    <Code className="h-4 w-4 text-teal-400" />
                    HTML Implementation
                  </h4>
                  <pre className="text-sm font-mono text-gray-300 overflow-x-auto">
{`<!-- Add this script tag to your HTML head -->
<script src="https://embed.orcha-ai.com/widget.js"></script>

<!-- Add this div where you want the chat to appear -->
<div id="orcha-chat-widget"
     data-api-key="your-api-key"
     data-bot-id="your-bot-id">
</div>

<!-- Initialize the widget -->
<script>
  OrchaWidget.init({
    container: '#orcha-chat-widget',
    theme: 'dark',
    position: 'bottom-right'
  });
</script>`}
                  </pre>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="customization" id="customization" className="space-y-8">
            {/* Appearance Customization */}
            <Card className="bg-gray-900/50 border-gray-800">
              <CardHeader>
                <CardTitle className="text-xl text-white">Appearance Customization</CardTitle>
                <CardDescription className="text-gray-400">
                  Make the embedded widget match your brand perfectly
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-gray-950 border border-gray-800 rounded-lg p-4">
                  <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                    <Palette className="h-4 w-4 text-teal-400" />
                    Theme Configuration
                  </h4>
                  <pre className="text-sm font-mono text-gray-300 overflow-x-auto">
{`OrchaWidget.init({
  theme: {
    primaryColor: '#00D4AA',
    secondaryColor: '#1A1A1A',
    textColor: '#FFFFFF',
    backgroundColor: '#000000',
    borderRadius: '12px',
    fontFamily: 'Inter, sans-serif'
  },
  chat: {
    placeholder: 'Ask me anything...',
    initialMessage: 'Hi! How can I help you today?',
    avatar: 'https://your-domain.com/avatar.png'
  }
});`}
                  </pre>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-white mb-3">Color Customization</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded">
                        <span className="text-gray-300">Primary Color</span>
                        <Badge className="bg-teal-600/20 text-teal-300">Brand Color</Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded">
                        <span className="text-gray-300">Background</span>
                        <Badge className="bg-gray-600/20 text-gray-300">Dark/Light</Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded">
                        <span className="text-gray-300">Text Color</span>
                        <Badge className="bg-white/20 text-white">Contrast</Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded">
                        <span className="text-gray-300">Accent Colors</span>
                        <Badge className="bg-cyan-600/20 text-cyan-300">Highlights</Badge>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-3">Layout Options</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded">
                        <span className="text-gray-300">Position</span>
                        <Badge className="bg-green-600/20 text-green-300">Bottom-Right</Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded">
                        <span className="text-gray-300">Size</span>
                        <Badge className="bg-blue-600/20 text-blue-300">Responsive</Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded">
                        <span className="text-gray-300">Shape</span>
                        <Badge className="bg-purple-600/20 text-purple-300">Rounded</Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded">
                        <span className="text-gray-300">Animation</span>
                        <Badge className="bg-yellow-600/20 text-yellow-300">Smooth</Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Behavior Customization */}
            <Card className="bg-gray-900/50 border-gray-800">
              <CardHeader>
                <CardTitle className="text-xl text-white">Behavior Customization</CardTitle>
                <CardDescription className="text-gray-400">
                  Control how your embedded chatbot behaves and interacts
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-gray-800/50 rounded border border-teal-500/20">
                    <Settings className="h-8 w-8 mx-auto mb-3 text-teal-400" />
                    <h4 className="font-semibold text-white mb-2">Auto-open</h4>
                    <p className="text-xs text-gray-400">Trigger chat on user actions</p>
                  </div>
                  <div className="text-center p-4 bg-gray-800/50 rounded border border-cyan-500/20">
                    <Globe className="h-8 w-8 mx-auto mb-3 text-cyan-400" />
                    <h4 className="font-semibold text-white mb-2">Context Awareness</h4>
                    <p className="text-xs text-gray-400">Use page content for better responses</p>
                  </div>
                  <div className="text-center p-4 bg-gray-800/50 rounded border border-green-500/20">
                    <Smartphone className="h-8 w-8 mx-auto mb-3 text-green-400" />
                    <h4 className="font-semibold text-white mb-2">Mobile Optimization</h4>
                    <p className="text-xs text-gray-400">Responsive design for all devices</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="integrations" id="integrations" className="space-y-8">
            {/* Framework Integrations */}
            <Card className="bg-gray-900/50 border-gray-800">
              <CardHeader>
                <CardTitle className="text-xl text-white">Framework Integrations</CardTitle>
                <CardDescription className="text-gray-400">
                  Native integrations for popular web frameworks
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* React Integration */}
                  <Card className="bg-gradient-to-br from-teal-900/10 to-teal-800/10 border-teal-500/20">
                    <CardHeader>
                      <CardTitle className="text-lg text-white">React Integration</CardTitle>
                      <CardDescription className="text-gray-400">
                        Seamless integration with React applications
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="bg-gray-950 rounded-lg p-4 mb-4">
                        <pre className="text-xs font-mono text-gray-300 overflow-x-auto">
{`import { OrchaChat } from '@orcha-ai/react';

function App() {
  return (
    <OrchaChat
      apiKey="your-api-key"
      botId="your-bot-id"
      theme="dark"
      onMessage={(message) => {
        console.log('New message:', message);
      }}
    />
  );
}`}
                        </pre>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-400" />
                          <span className="text-sm text-gray-300">React hooks integration</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-400" />
                          <span className="text-sm text-gray-300">TypeScript support</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-400" />
                          <span className="text-sm text-gray-300">State management</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Vue Integration */}
                  <Card className="bg-gradient-to-br from-cyan-900/10 to-cyan-800/10 border-cyan-500/20">
                    <CardHeader>
                      <CardTitle className="text-lg text-white">Vue.js Integration</CardTitle>
                      <CardDescription className="text-gray-400">
                        Native Vue components for easy integration
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="bg-gray-950 rounded-lg p-4 mb-4">
                        <pre className="text-xs font-mono text-gray-300 overflow-x-auto">
{`<template>
  <OrchaWidget
    :api-key="apiKey"
    :bot-id="botId"
    theme="dark"
    @message="handleMessage"
  />
</template>

<script setup>
import { OrchaWidget } from '@orcha-ai/vue';

const apiKey = 'your-api-key';
const botId = 'your-bot-id';

const handleMessage = (message) => {
  console.log('New message:', message);
};
</script>`}
                        </pre>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-400" />
                          <span className="text-sm text-gray-300">Vue 3 composition API</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-400" />
                          <span className="text-sm text-gray-300">Reactive data binding</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-400" />
                          <span className="text-sm text-gray-300">Component lifecycle</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="advanced" id="advanced" className="space-y-8">
            {/* Advanced Features */}
            <Card className="bg-gray-900/50 border-gray-800">
              <CardHeader>
                <CardTitle className="text-xl text-white">Advanced Embedding Features</CardTitle>
                <CardDescription className="text-gray-400">
                  Unlock powerful capabilities for sophisticated integrations
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-white mb-3">Event Handling</h4>
                    <div className="space-y-3">
                      <div className="p-3 bg-gray-800/50 rounded">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-gray-300">Message Events</span>
                          <Badge className="bg-teal-600/20 text-teal-300">Real-time</Badge>
                        </div>
                        <p className="text-xs text-gray-400">Listen to chat messages and responses</p>
                      </div>
                      <div className="p-3 bg-gray-800/50 rounded">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-gray-300">User Actions</span>
                          <Badge className="bg-cyan-600/20 text-cyan-300">Interactive</Badge>
                        </div>
                        <p className="text-xs text-gray-400">Track user interactions and engagement</p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-3">API Integration</h4>
                    <div className="space-y-3">
                      <div className="p-3 bg-gray-800/50 rounded">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-gray-300">Custom Endpoints</span>
                          <Badge className="bg-purple-600/20 text-purple-300">Flexible</Badge>
                        </div>
                        <p className="text-xs text-gray-400">Connect to your existing APIs</p>
                      </div>
                      <div className="p-3 bg-gray-800/50 rounded">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-gray-300">Authentication</span>
                          <Badge className="bg-green-600/20 text-green-300">Secure</Badge>
                        </div>
                        <p className="text-xs text-gray-400">Integrate with your auth system</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Security & Privacy */}
            <Card className="bg-gradient-to-br from-gray-900 to-gray-900/50 border-gray-800">
              <CardHeader>
                <CardTitle className="text-xl text-white">Security & Privacy</CardTitle>
                <CardDescription className="text-gray-400">
                  Best practices for secure and private chatbot deployments
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-white mb-3">Security Measures</h4>
                    <ul className="space-y-2 text-sm text-gray-400">
                      <li>• API key encryption and rotation</li>
                      <li>• Content Security Policy (CSP) headers</li>
                      <li>• Input validation and sanitization</li>
                      <li>• Rate limiting and abuse prevention</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-3">Privacy Considerations</h4>
                    <ul className="space-y-2 text-sm text-gray-400">
                      <li>• GDPR and privacy regulation compliance</li>
                      <li>• Data retention policies</li>
                      <li>• User consent management</li>
                      <li>• Cookie and tracking preferences</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Navigation */}
        <div className="flex justify-between items-center pt-8 border-t border-gray-800 mt-12">
          <Link href="/docs/using-orcha/monitoring" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
            <ArrowLeft className="h-4 w-4" />
            <span>Monitoring</span>
          </Link>
          <Link href="/docs/using-orcha/uploads" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
            <span>Uploads</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      <QuickLinks links={quickLinks} />
    </div>
    </main>
  );
}
