"use client";

import React, { useState, useEffect } from "react";
import { ArrowRight, ArrowLeft, Database, Upload, RefreshCw, Zap, Settings, Code, Play, CheckCircle, TrendingUp, AlertTriangle } from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DocsSidebar from "@/components/docnav/DocumentNavigation";
import navItems from "@/data/document-nav.json";
import QuickLinks from "@/components/quicklinks/QuickLinks";
import quickLinks from "@/data/quicklinks/upsertion.json";

export default function UpsertionPage() {
  const [activeTab, setActiveTab] = useState("basics");

  useEffect(() => {
    // Check initial hash on mount
    const hash = window.location.hash.replace("#", "");
    if (hash && ["basics", "operations", "examples", "optimization"].includes(hash)) {
      setActiveTab(hash);
    }

    // Listen for hash changes
    const handleHashChange = () => {
      const newHash = window.location.hash.replace("#", "");
      if (newHash && ["basics", "operations", "examples", "optimization"].includes(newHash)) {
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
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center">
              <RefreshCw className="h-6 w-6 text-white" />
            </div>
            <Badge variant="outline" className="border-pink-500/30 text-pink-300">User Guide</Badge>
          </div>
          <h1 className="text-4xl font-bold mb-4">Upsertion</h1>
          <p className="text-lg text-gray-400 max-w-3xl">
            Master vector upsert operations to keep your knowledge base current and accurate. Learn how to efficiently insert and update vectors in your RAG applications.
          </p>
        </div>

        {/* Quick Start */}
        <Card className="bg-gradient-to-br from-pink-900/20 to-rose-900/20 border-pink-500/30 mb-8">
          <CardHeader>
            <CardTitle className="text-xl text-white flex items-center gap-2">
              <Zap className="h-5 w-5 text-pink-400" />
              Quick Start
            </CardTitle>
            <CardDescription className="text-gray-300">
              Perform your first vector upsert in under 5 minutes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center gap-3 p-4 bg-gray-800/50 rounded-lg">
                <div className="w-8 h-8 rounded-full bg-pink-600 flex items-center justify-center text-sm font-bold">1</div>
                <span className="text-gray-300">Prepare your data</span>
              </div>
              <div className="flex items-center gap-3 p-4 bg-gray-800/50 rounded-lg">
                <div className="w-8 h-8 rounded-full bg-rose-600 flex items-center justify-center text-sm font-bold">2</div>
                <span className="text-gray-300">Generate embeddings</span>
              </div>
              <div className="flex items-center gap-3 p-4 bg-gray-800/50 rounded-lg">
                <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-sm font-bold">3</div>
                <span className="text-gray-300">Execute upsert</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="grid w-full grid-cols-4 bg-gray-800/50">
            <TabsTrigger value="basics" className="text-gray-300">Basics</TabsTrigger>
            <TabsTrigger value="operations" className="text-gray-300">Operations</TabsTrigger>
            <TabsTrigger value="examples" className="text-gray-300">Examples</TabsTrigger>
            <TabsTrigger value="optimization" className="text-gray-300">Optimization</TabsTrigger>
          </TabsList>

          <TabsContent value="basics" id="basics" className="space-y-8">
            {/* What is Upsertion */}
            <Card className="bg-gray-900/50 border-gray-800">
              <CardHeader>
                <CardTitle className="text-2xl text-white">Understanding Vector Upsertion</CardTitle>
                <CardDescription className="text-gray-400">
                  Upsertion combines INSERT and UPDATE operations, ensuring your vector database stays synchronized with your changing knowledge base.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                      <RefreshCw className="h-5 w-5 text-pink-400" />
                      Core Concepts
                    </h3>
                    <ul className="space-y-2 text-gray-300">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-400" />
                        <span>Insert or update logic</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-400" />
                        <span>Vector similarity matching</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-400" />
                        <span>Conflict resolution</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-400" />
                        <span>Batch operations</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                      <TrendingUp className="h-5 w-5 text-rose-400" />
                      Key Benefits
                    </h3>
                    <ul className="space-y-2 text-gray-300">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-400" />
                        <span>Eliminates duplicates</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-400" />
                        <span>Keeps data current</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-400" />
                        <span>Efficient updates</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-400" />
                        <span>Scalable operations</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* How Upsert Works */}
            <Card className="bg-gray-900/50 border-gray-800">
              <CardHeader>
                <CardTitle className="text-xl text-white">How Vector Upsertion Works</CardTitle>
                <CardDescription className="text-gray-400">
                  The decision-making process behind insert vs update operations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center p-6 bg-gradient-to-br from-pink-600/10 to-pink-800/10 rounded-lg border border-pink-500/20">
                    <Database className="h-12 w-12 mx-auto mb-4 text-pink-400" />
                    <h3 className="font-semibold text-white mb-2">Similarity Check</h3>
                    <p className="text-sm text-gray-400">Compare new vector with existing ones</p>
                  </div>
                  <div className="text-center p-6 bg-gradient-to-br from-rose-600/10 to-rose-800/10 rounded-lg border border-rose-500/20">
                    <Settings className="h-12 w-12 mx-auto mb-4 text-rose-400" />
                    <h3 className="font-semibold text-white mb-2">Threshold Decision</h3>
                    <p className="text-sm text-gray-400">Apply similarity threshold rules</p>
                  </div>
                  <div className="text-center p-6 bg-gradient-to-br from-purple-600/10 to-purple-800/10 rounded-lg border border-purple-500/20">
                    <RefreshCw className="h-12 w-12 mx-auto mb-4 text-purple-400" />
                    <h3 className="font-semibold text-white mb-2">Execute Operation</h3>
                    <p className="text-sm text-gray-400">Insert new or update existing</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="operations" id="operations" className="space-y-8">
            {/* Upsert Operations */}
            <Card className="bg-gray-900/50 border-gray-800">
              <CardHeader>
                <CardTitle className="text-xl text-white">Upsert Operation Types</CardTitle>
                <CardDescription className="text-gray-400">
                  Different strategies for handling vector updates and insertions
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-gray-950 border border-gray-800 rounded-lg p-4">
                  <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                    <Code className="h-4 w-4 text-pink-400" />
                    Basic Upsert Operation
                  </h4>
                  <pre className="text-sm font-mono text-gray-300 overflow-x-auto">
{`// Single vector upsert
const result = await upsertVector({
  id: "doc_123_chunk_5",
  vector: embeddingArray,
  metadata: {
    document_id: "doc_123",
    chunk_index: 5,
    content: "Updated product information..."
  },
  similarityThreshold: 0.95
});

console.log(result.operation); // "inserted" or "updated"`}
                  </pre>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-white mb-3">Operation Modes</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded">
                        <span className="text-gray-300">Strict Mode</span>
                        <Badge className="bg-pink-600/20 text-pink-300">Exact Match</Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded">
                        <span className="text-gray-300">Similarity Mode</span>
                        <Badge className="bg-rose-600/20 text-rose-300">Threshold-based</Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded">
                        <span className="text-gray-300">Hybrid Mode</span>
                        <Badge className="bg-purple-600/20 text-purple-300">Combined</Badge>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-3">Conflict Resolution</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded">
                        <span className="text-gray-300">Overwrite</span>
                        <Badge className="bg-red-600/20 text-red-300">Replace All</Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded">
                        <span className="text-gray-300">Merge</span>
                        <Badge className="bg-green-600/20 text-green-300">Combine Data</Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded">
                        <span className="text-gray-300">Versioning</span>
                        <Badge className="bg-blue-600/20 text-blue-300">Keep History</Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Batch Operations */}
            <Card className="bg-gray-900/50 border-gray-800">
              <CardHeader>
                <CardTitle className="text-xl text-white">Batch Upsert Operations</CardTitle>
                <CardDescription className="text-gray-400">
                  Efficiently handle multiple vectors in a single operation
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-950 border border-gray-800 rounded-lg p-4 mb-6">
                  <h4 className="font-semibold text-white mb-3">Batch Upsert Example</h4>
                  <pre className="text-sm font-mono text-gray-300 overflow-x-auto">
{`// Batch upsert multiple vectors
const batchResult = await batchUpsert({
  vectors: [
    { id: "doc_1_chunk_1", vector: vec1, metadata: meta1 },
    { id: "doc_1_chunk_2", vector: vec2, metadata: meta2 },
    { id: "doc_2_chunk_1", vector: vec3, metadata: meta3 }
  ],
  options: {
    similarityThreshold: 0.9,
    onConflict: "merge",
    batchSize: 100,
    concurrency: 3
  }
});

console.log(\`Processed \${batchResult.total} vectors\`);
// Output: Processed 3 vectors`}</pre>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-gray-800/50 rounded">
                    <div className="text-2xl font-bold text-pink-400 mb-1">10x</div>
                    <div className="text-sm text-gray-400">Faster than individual operations</div>
                  </div>
                  <div className="text-center p-4 bg-gray-800/50 rounded">
                    <div className="text-2xl font-bold text-rose-400 mb-1">99%</div>
                    <div className="text-sm text-gray-400">Reliability with error recovery</div>
                  </div>
                  <div className="text-center p-4 bg-gray-800/50 rounded">
                    <div className="text-2xl font-bold text-purple-400 mb-1">∞</div>
                    <div className="text-sm text-gray-400">Scalable to any size</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="examples" id="examples" className="space-y-8">
            {/* Practical Examples */}
            <Card className="bg-gray-900/50 border-gray-800">
              <CardHeader>
                <CardTitle className="text-xl text-white">Practical Examples</CardTitle>
                <CardDescription className="text-gray-400">
                  Real-world scenarios where upsertion shines
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Knowledge Base Updates */}
                  <Card className="bg-gradient-to-br from-pink-900/10 to-pink-800/10 border-pink-500/20">
                    <CardHeader>
                      <CardTitle className="text-lg text-white">Knowledge Base Synchronization</CardTitle>
                      <CardDescription className="text-gray-400">
                        Keep your AI knowledge current with automatic updates
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="bg-gray-950 rounded-lg p-4 mb-4">
                        <pre className="text-xs font-mono text-gray-300 overflow-x-auto">
{`// Sync updated documentation
async function syncKnowledgeBase(updates) {
  for (const doc of updates) {
    const embedding = await generateEmbedding(doc.content);
    await upsertVector({
      id: \`kb_\${doc.id}\`,
      vector: embedding,
      metadata: {
        title: doc.title,
        category: doc.category,
        lastUpdated: doc.timestamp
      }
    });
  }
}`}</pre>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-400" />
                          <span className="text-sm text-gray-300">Automatic deduplication</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-400" />
                          <span className="text-sm text-gray-300">Version tracking</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-400" />
                          <span className="text-sm text-gray-300">Real-time updates</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* User Profile Updates */}
                  <Card className="bg-gradient-to-br from-rose-900/10 to-rose-800/10 border-rose-500/20">
                    <CardHeader>
                      <CardTitle className="text-lg text-white">Personalized Recommendations</CardTitle>
                      <CardDescription className="text-gray-400">
                        Update user preference vectors for better recommendations
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="bg-gray-950 rounded-lg p-4 mb-4">
                        <pre className="text-xs font-mono text-gray-300 overflow-x-auto">
{`// Update user preference vectors
const userVector = await generateUserEmbedding({
  recentActivity: user.recentActions,
  preferences: user.preferences,
  demographics: user.profile
});

await upsertVector({
  id: \`user_\${user.id}_preferences\`,
  vector: userVector,
  metadata: {
    userId: user.id,
    lastActive: new Date(),
    version: user.preferenceVersion
  }
});`}</pre>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-400" />
                          <span className="text-sm text-gray-300">Dynamic personalization</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-400" />
                          <span className="text-sm text-gray-300">Preference evolution</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-400" />
                          <span className="text-sm text-gray-300">Privacy-preserving</span>
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
                  Maximize upsert operation speed and efficiency
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-white mb-3">Indexing Strategies</h4>
                    <div className="space-y-3">
                      <div className="p-3 bg-gray-800/50 rounded">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-gray-300">HNSW Indexing</span>
                          <Badge className="bg-pink-600/20 text-pink-300">Fast Search</Badge>
                        </div>
                        <p className="text-xs text-gray-400">Approximate nearest neighbor search</p>
                      </div>
                      <div className="p-3 bg-gray-800/50 rounded">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-gray-300">IVF Flat</span>
                          <Badge className="bg-rose-600/20 text-rose-300">Balanced</Badge>
                        </div>
                        <p className="text-xs text-gray-400">Inverted file with exact search</p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-3">Batch Configuration</h4>
                    <div className="space-y-3">
                      <div className="p-3 bg-gray-800/50 rounded">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-gray-300">Optimal Batch Size</span>
                          <Badge className="bg-purple-600/20 text-purple-300">100-1000</Badge>
                        </div>
                        <p className="text-xs text-gray-400">Balance memory usage and speed</p>
                      </div>
                      <div className="p-3 bg-gray-800/50 rounded">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-gray-300">Concurrency Control</span>
                          <Badge className="bg-blue-600/20 text-blue-300">Adaptive</Badge>
                        </div>
                        <p className="text-xs text-gray-400">Scale based on system resources</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Monitoring & Troubleshooting */}
            <Card className="bg-gradient-to-br from-gray-900 to-gray-900/50 border-gray-800">
              <CardHeader>
                <CardTitle className="text-xl text-white flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-yellow-400" />
                  Monitoring & Best Practices
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Ensure reliable upsert operations with proper monitoring
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-white mb-3">Key Metrics to Monitor</h4>
                    <ul className="space-y-2 text-sm text-gray-400">
                      <li>• Operation success/failure rates</li>
                      <li>• Average response times</li>
                      <li>• Conflict resolution frequency</li>
                      <li>• Index rebuild frequency</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-3">Optimization Tips</h4>
                    <ul className="space-y-2 text-sm text-gray-400">
                      <li>• Use appropriate similarity thresholds</li>
                      <li>• Implement retry logic for failures</li>
                      <li>• Monitor vector dimensionality</li>
                      <li>• Regularly maintain indexes</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Navigation */}
        <div className="flex justify-between items-center pt-8 border-t border-gray-800 mt-12">
          <Link href="/docs/using-orcha/document-store" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
            <ArrowLeft className="h-4 w-4" />
            <span>Document Store</span>
          </Link>
          <Link href="/docs/using-orcha/monitoring" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
            <span>Monitoring</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      <QuickLinks links={quickLinks} />
    </div>
    </main>
  );
}
