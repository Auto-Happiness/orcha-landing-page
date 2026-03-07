"use client";

import React, { useState, useEffect } from "react";
import { ArrowRight, ArrowLeft, Bot, Zap, Workflow, Target, Settings, Code, Play, CheckCircle } from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DocsSidebar from "@/components/docnav/DocumentNavigation";
import navItems from "@/data/document-nav.json";
import QuickLinks from "@/components/quicklinks/QuickLinks";
import quickLinks from "@/data/quicklinks/agent-orcha-strate.json";

export default function AgentOrchaStratePage() {
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    // Check initial hash on mount
    const hash = window.location.hash.replace("#", "");
    if (hash && ["overview", "configuration", "examples", "advanced"].includes(hash)) {
      setActiveTab(hash);
    }

    // Listen for hash changes
    const handleHashChange = () => {
      const newHash = window.location.hash.replace("#", "");
      if (newHash && ["overview", "configuration", "examples", "advanced"].includes(newHash)) {
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
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-violet-600 flex items-center justify-center">
              <Bot className="h-6 w-6 text-white" />
            </div>
            <Badge variant="outline" className="border-purple-500/30 text-purple-300">User Guide</Badge>
          </div>
          <h1 className="text-4xl font-bold mb-4">Agent Orcha-strate</h1>
          <p className="text-lg text-gray-400 max-w-3xl">
            Master the art of orchestrating AI agents for complex workflows. Learn how to create, configure, and deploy multi-agent systems that work together seamlessly.
          </p>
        </div>

        {/* Quick Start */}
        <Card className="bg-gradient-to-br from-purple-900/20 to-blue-900/20 border-purple-500/30 mb-8">
          <CardHeader>
            <CardTitle className="text-xl text-white flex items-center gap-2">
              <Zap className="h-5 w-5 text-purple-400" />
              Quick Start
            </CardTitle>
            <CardDescription className="text-gray-300">
              Get your first agent workflow running in under 5 minutes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center gap-3 p-4 bg-gray-800/50 rounded-lg">
                <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-sm font-bold">1</div>
                <span className="text-gray-300">Create Agent</span>
              </div>
              <div className="flex items-center gap-3 p-4 bg-gray-800/50 rounded-lg">
                <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-sm font-bold">2</div>
                <span className="text-gray-300">Configure Workflow</span>
              </div>
              <div className="flex items-center gap-3 p-4 bg-gray-800/50 rounded-lg">
                <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center text-sm font-bold">3</div>
                <span className="text-gray-300">Deploy & Test</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="grid w-full grid-cols-4 bg-gray-800/50">
            <TabsTrigger value="overview" className="text-gray-300">Overview</TabsTrigger>
            <TabsTrigger value="configuration" className="text-gray-300">Configuration</TabsTrigger>
            <TabsTrigger value="examples" className="text-gray-300">Examples</TabsTrigger>
            <TabsTrigger value="advanced" className="text-gray-300">Advanced</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" id="overview" className="space-y-8">
            {/* What is Agent Orchestration */}
            <Card className="bg-gray-900/50 border-gray-800">
              <CardHeader>
                <CardTitle className="text-2xl text-white">What is Agent Orchestration?</CardTitle>
                <CardDescription className="text-gray-400">
                  Agent orchestration is the art of coordinating multiple AI agents to work together on complex tasks, much like a symphony conductor brings harmony to an orchestra.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                      <Workflow className="h-5 w-5 text-purple-400" />
                      Key Concepts
                    </h3>
                    <ul className="space-y-2 text-gray-300">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-400" />
                        <span>Multi-agent coordination</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-400" />
                        <span>Task decomposition</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-400" />
                        <span>Communication protocols</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-400" />
                        <span>Error handling & recovery</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                      <Target className="h-5 w-5 text-blue-400" />
                      Benefits
                    </h3>
                    <ul className="space-y-2 text-gray-300">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-400" />
                        <span>Scalable problem solving</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-400" />
                        <span>Specialized agent roles</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-400" />
                        <span>Improved accuracy</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-400" />
                        <span>Fault tolerance</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Architecture Overview */}
            <Card className="bg-gray-900/50 border-gray-800">
              <CardHeader>
                <CardTitle className="text-xl text-white">Architecture Overview</CardTitle>
                <CardDescription className="text-gray-400">
                  Understanding the core components of agent orchestration
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center p-6 bg-gradient-to-br from-purple-600/10 to-purple-800/10 rounded-lg border border-purple-500/20">
                    <Bot className="h-12 w-12 mx-auto mb-4 text-purple-400" />
                    <h3 className="font-semibold text-white mb-2">Agent Nodes</h3>
                    <p className="text-sm text-gray-400">Individual AI agents with specific roles and capabilities</p>
                  </div>
                  <div className="text-center p-6 bg-gradient-to-br from-blue-600/10 to-blue-800/10 rounded-lg border border-blue-500/20">
                    <Workflow className="h-12 w-12 mx-auto mb-4 text-blue-400" />
                    <h3 className="font-semibold text-white mb-2">Workflow Engine</h3>
                    <p className="text-sm text-gray-400">Coordinates agent interactions and manages task flow</p>
                  </div>
                  <div className="text-center p-6 bg-gradient-to-br from-green-600/10 to-green-800/10 rounded-lg border border-green-500/20">
                    <Settings className="h-12 w-12 mx-auto mb-4 text-green-400" />
                    <h3 className="font-semibold text-white mb-2">Configuration Hub</h3>
                    <p className="text-sm text-gray-400">Centralized settings for agent behavior and routing</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="configuration" id="configuration" className="space-y-8">
            {/* Basic Configuration */}
            <Card className="bg-gray-900/50 border-gray-800">
              <CardHeader>
                <CardTitle className="text-xl text-white">Basic Agent Configuration</CardTitle>
                <CardDescription className="text-gray-400">
                  Setting up your first orchestrated agent workflow
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-gray-950 border border-gray-800 rounded-lg p-4">
                  <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                    <Code className="h-4 w-4 text-purple-400" />
                    Agent Configuration JSON
                  </h4>
                  <pre className="text-sm font-mono text-gray-300 overflow-x-auto">
{`{
  "workflow": {
    "name": "Customer Support Orchestrator",
    "agents": [
      {
        "id": "intake_agent",
        "role": "customer_intake",
        "model": "gpt-4",
        "capabilities": ["sentiment_analysis", "query_classification"]
      },
      {
        "id": "escalation_agent", 
        "role": "technical_support",
        "model": "gpt-4-turbo",
        "capabilities": ["problem_diagnosis", "solution_provision"]
      }
    ],
    "routing": {
      "rules": [
        {
          "condition": "sentiment_score < 0.3",
          "action": "escalate_to_support"
        }
      ]
    }
  }
}`}
                  </pre>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-white mb-3">Agent Roles</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded">
                        <span className="text-gray-300">Coordinator</span>
                        <Badge className="bg-purple-600/20 text-purple-300">Orchestrates workflow</Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded">
                        <span className="text-gray-300">Worker</span>
                        <Badge className="bg-blue-600/20 text-blue-300">Executes specific tasks</Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded">
                        <span className="text-gray-300">Validator</span>
                        <Badge className="bg-green-600/20 text-green-300">Quality assurance</Badge>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-3">Communication Patterns</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded">
                        <span className="text-gray-300">Direct Messaging</span>
                        <Badge className="bg-yellow-600/20 text-yellow-300">Point-to-point</Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded">
                        <span className="text-gray-300">Broadcast</span>
                        <Badge className="bg-red-600/20 text-red-300">All agents</Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded">
                        <span className="text-gray-300">Event-driven</span>
                        <Badge className="bg-indigo-600/20 text-indigo-300">Reactive</Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="examples" id="examples" className="space-y-8">
            {/* Example Workflows */}
            <Card className="bg-gray-900/50 border-gray-800">
              <CardHeader>
                <CardTitle className="text-xl text-white">Example Workflows</CardTitle>
                <CardDescription className="text-gray-400">
                  Real-world orchestration scenarios you can implement
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Customer Support Workflow */}
                  <Card className="bg-gradient-to-br from-purple-900/10 to-purple-800/10 border-purple-500/20">
                    <CardHeader>
                      <CardTitle className="text-lg text-white">Customer Support Automation</CardTitle>
                      <CardDescription className="text-gray-400">
                        Multi-agent system handling customer inquiries from intake to resolution
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center gap-3">
                          <div className="w-6 h-6 rounded-full bg-purple-600 flex items-center justify-center text-xs">1</div>
                          <span className="text-sm text-gray-300">Initial query classification</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center text-xs">2</div>
                          <span className="text-sm text-gray-300">Sentiment analysis</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-6 h-6 rounded-full bg-green-600 flex items-center justify-center text-xs">3</div>
                          <span className="text-sm text-gray-300">Escalation or resolution</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Content Creation Workflow */}
                  <Card className="bg-gradient-to-br from-blue-900/10 to-blue-800/10 border-blue-500/20">
                    <CardHeader>
                      <CardTitle className="text-lg text-white">Content Creation Pipeline</CardTitle>
                      <CardDescription className="text-gray-400">
                        Collaborative content generation with specialized agents
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center gap-3">
                          <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center text-xs">1</div>
                          <span className="text-sm text-gray-300">Research & planning agent</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-6 h-6 rounded-full bg-purple-600 flex items-center justify-center text-xs">2</div>
                          <span className="text-sm text-gray-300">Content writing agent</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-6 h-6 rounded-full bg-green-600 flex items-center justify-center text-xs">3</div>
                          <span className="text-sm text-gray-300">Editing & optimization agent</span>
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
                <CardTitle className="text-xl text-white">Advanced Orchestration Features</CardTitle>
                <CardDescription className="text-gray-400">
                  Take your agent workflows to the next level
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-white mb-3">Dynamic Routing</h4>
                    <p className="text-gray-400 text-sm mb-4">
                      Agents can dynamically route tasks based on real-time conditions and context.
                    </p>
                    <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                      <Play className="h-4 w-4 mr-2" />
                      View Example
                    </Button>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-3">Agent Learning</h4>
                    <p className="text-gray-400 text-sm mb-4">
                      Agents adapt and improve performance based on workflow outcomes.
                    </p>
                    <Button size="sm" variant="outline" className="border-gray-700">
                      <Settings className="h-4 w-4 mr-2" />
                      Configure
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Best Practices */}
            <Card className="bg-gradient-to-br from-gray-900 to-gray-900/50 border-gray-800">
              <CardHeader>
                <CardTitle className="text-xl text-white">Best Practices</CardTitle>
                <CardDescription className="text-gray-400">
                  Tips for building robust orchestrated agent systems
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-white mb-3">Design Principles</h4>
                    <ul className="space-y-2 text-sm text-gray-400">
                      <li>• Keep agent roles focused and specialized</li>
                      <li>• Implement proper error boundaries</li>
                      <li>• Use clear communication protocols</li>
                      <li>• Monitor agent performance metrics</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-3">Performance Tips</h4>
                    <ul className="space-y-2 text-sm text-gray-400">
                      <li>• Optimize agent context windows</li>
                      <li>• Implement caching for repeated tasks</li>
                      <li>• Use parallel processing when possible</li>
                      <li>• Regularly audit and refactor workflows</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Navigation */}
        <div className="flex justify-between items-center pt-8 border-t border-gray-800 mt-12">
          <Link href="/docs/using-orcha" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Using Orcha</span>
          </Link>
          <Link href="/docs/using-orcha/prediction" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
            <span>Prediction</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      <QuickLinks links={quickLinks} />
    </div>
    </main>
  );
}
