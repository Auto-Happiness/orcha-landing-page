"use client";

import React, { useState, useEffect } from "react";
import { ArrowRight, ArrowLeft, BarChart3, Activity, AlertTriangle, TrendingUp, Settings, Code, Play, CheckCircle, Gauge, Bell } from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DocsSidebar from "@/components/docnav/DocumentNavigation";
import navItems from "@/data/document-nav.json";
import QuickLinks from "@/components/quicklinks/QuickLinks";
import quickLinks from "@/data/quicklinks/monitoring.json";

export default function MonitoringPage() {
  const [activeTab, setActiveTab] = useState("dashboard");

  useEffect(() => {
    // Check initial hash on mount
    const hash = window.location.hash.replace("#", "");
    if (hash && ["dashboard", "metrics", "alerts", "troubleshooting"].includes(hash)) {
      setActiveTab(hash);
    }

    // Listen for hash changes
    const handleHashChange = () => {
      const newHash = window.location.hash.replace("#", "");
      if (newHash && ["dashboard", "metrics", "alerts", "troubleshooting"].includes(newHash)) {
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
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center">
              <BarChart3 className="h-6 w-6 text-white" />
            </div>
            <Badge variant="outline" className="border-indigo-500/30 text-indigo-300">User Guide</Badge>
          </div>
          <h1 className="text-4xl font-bold mb-4">Monitoring</h1>
          <p className="text-lg text-gray-400 max-w-3xl">
            Keep your AI applications running smoothly with comprehensive monitoring, alerting, and performance analytics. Track health metrics, detect anomalies, and optimize your systems.
          </p>
        </div>

        {/* Quick Start */}
        <Card className="bg-gradient-to-br from-indigo-900/20 to-blue-900/20 border-indigo-500/30 mb-8">
          <CardHeader>
            <CardTitle className="text-xl text-white flex items-center gap-2">
              <Activity className="h-5 w-5 text-indigo-400" />
              Quick Start
            </CardTitle>
            <CardDescription className="text-gray-300">
              Set up basic monitoring for your Orcha applications in 5 minutes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center gap-3 p-4 bg-gray-800/50 rounded-lg">
                <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-sm font-bold">1</div>
                <span className="text-gray-300">Enable metrics collection</span>
              </div>
              <div className="flex items-center gap-3 p-4 bg-gray-800/50 rounded-lg">
                <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-sm font-bold">2</div>
                <span className="text-gray-300">Set up basic alerts</span>
              </div>
              <div className="flex items-center gap-3 p-4 bg-gray-800/50 rounded-lg">
                <div className="w-8 h-8 rounded-full bg-cyan-600 flex items-center justify-center text-sm font-bold">3</div>
                <span className="text-gray-300">View dashboard</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="grid w-full grid-cols-4 bg-gray-800/50">
            <TabsTrigger value="dashboard" className="text-gray-300">Dashboard</TabsTrigger>
            <TabsTrigger value="metrics" className="text-gray-300">Metrics</TabsTrigger>
            <TabsTrigger value="alerts" className="text-gray-300">Alerts</TabsTrigger>
            <TabsTrigger value="troubleshooting" className="text-gray-300">Troubleshooting</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" id="dashboard" className="space-y-8">
            {/* Dashboard Overview */}
            <Card className="bg-gray-900/50 border-gray-800">
              <CardHeader>
                <CardTitle className="text-2xl text-white">Monitoring Dashboard</CardTitle>
                <CardDescription className="text-gray-400">
                  Your central hub for tracking application health, performance, and user engagement metrics.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                      <Gauge className="h-5 w-5 text-indigo-400" />
                      Real-time Metrics
                    </h3>
                    <ul className="space-y-2 text-gray-300">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-400" />
                        <span>API response times</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-400" />
                        <span>Error rates and patterns</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-400" />
                        <span>Token usage and costs</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-400" />
                        <span>User engagement metrics</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                      <TrendingUp className="h-5 w-5 text-blue-400" />
                      Performance Insights
                    </h3>
                    <ul className="space-y-2 text-gray-300">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-400" />
                        <span>Usage patterns and trends</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-400" />
                        <span>Peak usage identification</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-400" />
                        <span>Cost optimization opportunities</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-400" />
                        <span>System bottleneck detection</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Dashboard Components */}
            <Card className="bg-gray-900/50 border-gray-800">
              <CardHeader>
                <CardTitle className="text-xl text-white">Dashboard Components</CardTitle>
                <CardDescription className="text-gray-400">
                  Key widgets and visualizations for comprehensive monitoring
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center p-6 bg-gradient-to-br from-indigo-600/10 to-indigo-800/10 rounded-lg border border-indigo-500/20">
                    <Activity className="h-12 w-12 mx-auto mb-4 text-indigo-400" />
                    <h3 className="font-semibold text-white mb-2">System Health</h3>
                    <p className="text-sm text-gray-400">API availability, latency, error rates</p>
                  </div>
                  <div className="text-center p-6 bg-gradient-to-br from-blue-600/10 to-blue-800/10 rounded-lg border border-blue-500/20">
                    <TrendingUp className="h-12 w-12 mx-auto mb-4 text-blue-400" />
                    <h3 className="font-semibold text-white mb-2">Usage Analytics</h3>
                    <p className="text-sm text-gray-400">Requests, tokens, user activity</p>
                  </div>
                  <div className="text-center p-6 bg-gradient-to-br from-green-600/10 to-green-800/10 rounded-lg border border-green-500/20">
                    <BarChart3 className="h-12 w-12 mx-auto mb-4 text-green-400" />
                    <h3 className="font-semibold text-white mb-2">Performance Charts</h3>
                    <p className="text-sm text-gray-400">Response times, throughput metrics</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="metrics" id="metrics" className="space-y-8">
            {/* Key Metrics */}
            <Card className="bg-gray-900/50 border-gray-800">
              <CardHeader>
                <CardTitle className="text-xl text-white">Key Performance Metrics</CardTitle>
                <CardDescription className="text-gray-400">
                  Essential metrics to track for optimal application performance
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-gray-950 border border-gray-800 rounded-lg p-4">
                  <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                    <Code className="h-4 w-4 text-indigo-400" />
                    Metrics API Usage
                  </h4>
                  <pre className="text-sm font-mono text-gray-300 overflow-x-auto">
{`// Fetch application metrics
const metrics = await getMetrics({
  timeframe: "24h",
  granularity: "5m",
  metrics: [
    "api_response_time",
    "error_rate",
    "token_usage",
    "active_users"
  ]
});

console.log(\`Avg response time: \${metrics.api_response_time.avg}ms\`);`}
                  </pre>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-white mb-3">Performance Metrics</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded">
                        <span className="text-gray-300">API Response Time</span>
                        <Badge className="bg-green-600/20 text-green-300">&lt; 200ms</Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded">
                        <span className="text-gray-300">Error Rate</span>
                        <Badge className="bg-yellow-600/20 text-yellow-300">&lt; 1%</Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded">
                        <span className="text-gray-300">Uptime</span>
                        <Badge className="bg-blue-600/20 text-blue-300">99.9%</Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded">
                        <span className="text-gray-300">Throughput</span>
                        <Badge className="bg-purple-600/20 text-purple-300">1000 req/min</Badge>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-3">Usage Metrics</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded">
                        <span className="text-gray-300">Token Consumption</span>
                        <Badge className="bg-indigo-600/20 text-indigo-300">Daily</Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded">
                        <span className="text-gray-300">Active Users</span>
                        <Badge className="bg-cyan-600/20 text-cyan-300">Real-time</Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded">
                        <span className="text-gray-300">Session Duration</span>
                        <Badge className="bg-orange-600/20 text-orange-300">Average</Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded">
                        <span className="text-gray-300">Feature Usage</span>
                        <Badge className="bg-red-600/20 text-red-300">By Feature</Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="alerts" id="alerts" className="space-y-8">
            {/* Alert Configuration */}
            <Card className="bg-gray-900/50 border-gray-800">
              <CardHeader>
                <CardTitle className="text-xl text-white">Alert Configuration</CardTitle>
                <CardDescription className="text-gray-400">
                  Set up intelligent alerts to stay informed about your application's health
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Error Rate Alerts */}
                  <Card className="bg-gradient-to-br from-red-900/10 to-red-800/10 border-red-500/20">
                    <CardHeader>
                      <CardTitle className="text-lg text-white flex items-center gap-2">
                        <AlertTriangle className="h-5 w-5 text-red-400" />
                        Error Rate Alerts
                      </CardTitle>
                      <CardDescription className="text-gray-400">
                        Get notified when error rates exceed acceptable thresholds
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="bg-gray-950 rounded-lg p-4 mb-4">
                        <pre className="text-xs font-mono text-gray-300 overflow-x-auto">
{`// Configure error rate alert
await createAlert({
  name: "High Error Rate",
  condition: "error_rate > 5%",
  duration: "5m",
  channels: ["email", "slack"],
  severity: "critical",
  cooldown: "15m"
});`}
                        </pre>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-400" />
                          <span className="text-sm text-gray-300">Immediate notifications</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-400" />
                          <span className="text-sm text-gray-300">Multiple channels</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-400" />
                          <span className="text-sm text-gray-300">Smart thresholds</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Performance Alerts */}
                  <Card className="bg-gradient-to-br from-yellow-900/10 to-yellow-800/10 border-yellow-500/20">
                    <CardHeader>
                      <CardTitle className="text-lg text-white flex items-center gap-2">
                        <Gauge className="h-5 w-5 text-yellow-400" />
                        Performance Alerts
                      </CardTitle>
                      <CardDescription className="text-gray-400">
                        Monitor response times and system performance
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="bg-gray-950 rounded-lg p-4 mb-4">
                        <pre className="text-xs font-mono text-gray-300 overflow-x-auto">
{`// Set up performance alert
await createAlert({
  name: "Slow Response Times",
  condition: "avg_response_time > 2000ms",
  duration: "10m",
  channels: ["webhook"],
  severity: "warning",
  autoResolve: true
});`}
                        </pre>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-400" />
                          <span className="text-sm text-gray-300">Response time monitoring</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-400" />
                          <span className="text-sm text-gray-300">Auto-resolution</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-400" />
                          <span className="text-sm text-gray-300">Escalation rules</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>

            {/* Alert Channels */}
            <Card className="bg-gray-900/50 border-gray-800">
              <CardHeader>
                <CardTitle className="text-xl text-white">Alert Channels</CardTitle>
                <CardDescription className="text-gray-400">
                  Choose how and where you want to receive alerts
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-gray-800/50 rounded border border-gray-700">
                    <Bell className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                    <h4 className="font-semibold text-white mb-1">Email</h4>
                    <p className="text-xs text-gray-400">Traditional email notifications</p>
                  </div>
                  <div className="text-center p-4 bg-gray-800/50 rounded border border-gray-700">
                    <Activity className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                    <h4 className="font-semibold text-white mb-1">Slack</h4>
                    <p className="text-xs text-gray-400">Team collaboration alerts</p>
                  </div>
                  <div className="text-center p-4 bg-gray-800/50 rounded border border-gray-700">
                    <Settings className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                    <h4 className="font-semibold text-white mb-1">Webhooks</h4>
                    <p className="text-xs text-gray-400">Integrate with custom systems</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="troubleshooting" id="troubleshooting" className="space-y-8">
            {/* Troubleshooting Guide */}
            <Card className="bg-gray-900/50 border-gray-800">
              <CardHeader>
                <CardTitle className="text-xl text-white">Troubleshooting Common Issues</CardTitle>
                <CardDescription className="text-gray-400">
                  Quick diagnosis and resolution for monitoring problems
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-white mb-3">Performance Issues</h4>
                    <div className="space-y-3">
                      <div className="p-3 bg-gray-800/50 rounded">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-gray-300 text-sm">High Latency</span>
                          <Badge className="bg-red-600/20 text-red-300">Check Network</Badge>
                        </div>
                        <p className="text-xs text-gray-400">Verify CDN configuration and geographic distribution</p>
                      </div>
                      <div className="p-3 bg-gray-800/50 rounded">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-gray-300 text-sm">Rate Limiting</span>
                          <Badge className="bg-yellow-600/20 text-yellow-300">API Limits</Badge>
                        </div>
                        <p className="text-xs text-gray-400">Check usage against plan limits and implement backoff</p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-3">Alert Issues</h4>
                    <div className="space-y-3">
                      <div className="p-3 bg-gray-800/50 rounded">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-gray-300 text-sm">Missing Alerts</span>
                          <Badge className="bg-blue-600/20 text-blue-300">Configuration</Badge>
                        </div>
                        <p className="text-xs text-gray-400">Verify alert rules and notification channels</p>
                      </div>
                      <div className="p-3 bg-gray-800/50 rounded">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-gray-300 text-sm">False Positives</span>
                          <Badge className="bg-purple-600/20 text-purple-300">Tune Thresholds</Badge>
                        </div>
                        <p className="text-xs text-gray-400">Adjust alert sensitivity and add filters</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Best Practices */}
            <Card className="bg-gradient-to-br from-gray-900 to-gray-900/50 border-gray-800">
              <CardHeader>
                <CardTitle className="text-xl text-white">Monitoring Best Practices</CardTitle>
                <CardDescription className="text-gray-400">
                  Pro tips for effective application monitoring
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-white mb-3">Setup & Configuration</h4>
                    <ul className="space-y-2 text-sm text-gray-400">
                      <li>• Define clear success metrics early</li>
                      <li>• Set up alerts before going to production</li>
                      <li>• Use meaningful alert names and descriptions</li>
                      <li>• Test alert channels regularly</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-3">Maintenance & Optimization</h4>
                    <ul className="space-y-2 text-sm text-gray-400">
                      <li>• Regularly review and update alert thresholds</li>
                      <li>• Archive old metrics data strategically</li>
                      <li>• Document monitoring procedures</li>
                      <li>• Train team on dashboard usage</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Navigation */}
        <div className="flex justify-between items-center pt-8 border-t border-gray-800 mt-12">
          <Link href="/docs/using-orcha/upsertion" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
            <ArrowLeft className="h-4 w-4" />
            <span>Upsertion</span>
          </Link>
          <Link href="/docs/using-orcha/embed" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
            <span>Embed</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      <QuickLinks links={quickLinks} />
    </div>
    </main>
  );
}
