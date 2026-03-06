"use client";

import React, { useState, useEffect } from "react";
import { ArrowRight, ArrowLeft, Database, Upload, Search, FileText, Settings, Code, Play, CheckCircle, FolderOpen, HardDrive } from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DocsSidebar from "@/components/docnav/DocumentNavigation";
import navItems from "@/data/document-nav.json";
import QuickLinks from "@/components/quicklinks/QuickLinks";
import quickLinks from "@/data/quicklinks/document-store.json";

export default function DocumentStorePage() {
  const [activeTab, setActiveTab] = useState("basics");

  useEffect(() => {
    // Check initial hash on mount
    const hash = window.location.hash.replace("#", "");
    if (hash && ["basics", "upload", "query", "advanced"].includes(hash)) {
      setActiveTab(hash);
    }

    // Listen for hash changes
    const handleHashChange = () => {
      const newHash = window.location.hash.replace("#", "");
      if (newHash && ["basics", "upload", "query", "advanced"].includes(newHash)) {
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
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center">
              <Database className="h-6 w-6 text-white" />
            </div>
            <Badge variant="outline" className="border-orange-500/30 text-orange-300">User Guide</Badge>
          </div>
          <h1 className="text-4xl font-bold mb-4">Document Store</h1>
          <p className="text-lg text-gray-400 max-w-3xl">
            Master document management for RAG applications. Learn how to store, organize, and retrieve documents efficiently for enhanced AI interactions.
          </p>
        </div>

        {/* Quick Start */}
        <Card className="bg-gradient-to-br from-orange-900/20 to-amber-900/20 border-orange-500/30 mb-8">
          <CardHeader>
            <CardTitle className="text-xl text-white flex items-center gap-2">
              <Upload className="h-5 w-5 text-orange-400" />
              Quick Start
            </CardTitle>
            <CardDescription className="text-gray-300">
              Upload and query your first document in under 10 minutes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center gap-3 p-4 bg-gray-800/50 rounded-lg">
                <div className="w-8 h-8 rounded-full bg-orange-600 flex items-center justify-center text-sm font-bold">1</div>
                <span className="text-gray-300">Create document store</span>
              </div>
              <div className="flex items-center gap-3 p-4 bg-gray-800/50 rounded-lg">
                <div className="w-8 h-8 rounded-full bg-amber-600 flex items-center justify-center text-sm font-bold">2</div>
                <span className="text-gray-300">Upload documents</span>
              </div>
              <div className="flex items-center gap-3 p-4 bg-gray-800/50 rounded-lg">
                <div className="w-8 h-8 rounded-full bg-yellow-600 flex items-center justify-center text-sm font-bold">3</div>
                <span className="text-gray-300">Query with RAG</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="grid w-full grid-cols-4 bg-gray-800/50">
            <TabsTrigger value="basics" className="text-gray-300">Basics</TabsTrigger>
            <TabsTrigger value="upload" className="text-gray-300">Upload & Process</TabsTrigger>
            <TabsTrigger value="query" className="text-gray-300">Query & Retrieval</TabsTrigger>
            <TabsTrigger value="advanced" className="text-gray-300">Advanced</TabsTrigger>
          </TabsList>

          <TabsContent value="basics" id="basics" className="space-y-8">
            {/* What is Document Store */}
            <Card className="bg-gray-900/50 border-gray-800">
              <CardHeader>
                <CardTitle className="text-2xl text-white">Understanding Document Store</CardTitle>
                <CardDescription className="text-gray-400">
                  A document store is the foundation of Retrieval-Augmented Generation (RAG), enabling AI to access and utilize your knowledge base.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                      <FileText className="h-5 w-5 text-orange-400" />
                      Core Features
                    </h3>
                    <ul className="space-y-2 text-gray-300">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-400" />
                        <span>Multi-format document support</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-400" />
                        <span>Automatic text extraction</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-400" />
                        <span>Intelligent chunking</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-400" />
                        <span>Semantic search</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                      <Search className="h-5 w-5 text-amber-400" />
                      Use Cases
                    </h3>
                    <ul className="space-y-2 text-gray-300">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-400" />
                        <span>Customer support knowledge base</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-400" />
                        <span>Legal document analysis</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-400" />
                        <span>Research paper synthesis</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-400" />
                        <span>Product documentation</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Architecture Overview */}
            <Card className="bg-gray-900/50 border-gray-800">
              <CardHeader>
                <CardTitle className="text-xl text-white">Document Store Architecture</CardTitle>
                <CardDescription className="text-gray-400">
                  How documents flow from upload to retrieval in Orcha's system
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="text-center p-6 bg-gradient-to-br from-orange-600/10 to-orange-800/10 rounded-lg border border-orange-500/20">
                    <Upload className="h-12 w-12 mx-auto mb-4 text-orange-400" />
                    <h3 className="font-semibold text-white mb-2">Upload</h3>
                    <p className="text-sm text-gray-400">Documents are ingested and processed</p>
                  </div>
                  <div className="text-center p-6 bg-gradient-to-br from-amber-600/10 to-amber-800/10 rounded-lg border border-amber-500/20">
                    <FileText className="h-12 w-12 mx-auto mb-4 text-amber-400" />
                    <h3 className="font-semibold text-white mb-2">Extract</h3>
                    <p className="text-sm text-gray-400">Text is extracted and chunked</p>
                  </div>
                  <div className="text-center p-6 bg-gradient-to-br from-yellow-600/10 to-yellow-800/10 rounded-lg border border-yellow-500/20">
                    <Database className="h-12 w-12 mx-auto mb-4 text-yellow-400" />
                    <h3 className="font-semibold text-white mb-2">Embed</h3>
                    <p className="text-sm text-gray-400">Vectors are generated and stored</p>
                  </div>
                  <div className="text-center p-6 bg-gradient-to-br from-green-600/10 to-green-800/10 rounded-lg border border-green-500/20">
                    <Search className="h-12 w-12 mx-auto mb-4 text-green-400" />
                    <h3 className="font-semibold text-white mb-2">Query</h3>
                    <p className="text-sm text-gray-400">Semantic search retrieves relevant content</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="upload" id="upload" className="space-y-8">
            {/* Upload Methods */}
            <Card className="bg-gray-900/50 border-gray-800">
              <CardHeader>
                <CardTitle className="text-xl text-white">Document Upload Methods</CardTitle>
                <CardDescription className="text-gray-400">
                  Multiple ways to add documents to your store
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-gray-950 border border-gray-800 rounded-lg p-4">
                  <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                    <Code className="h-4 w-4 text-orange-400" />
                    Single Document Upload
                  </h4>
                  <pre className="text-sm font-mono text-gray-300 overflow-x-auto">
{`const formData = new FormData();
formData.append('file', fileInput.files[0]);
formData.append('metadata', JSON.stringify({
  title: 'Product Manual',
  category: 'documentation',
  tags: ['product', 'manual']
}));

const response = await fetch('/api/v1/documents/upload', {
  method: 'POST',
  body: formData
});`}
                  </pre>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-white mb-3">Supported Formats</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded">
                        <span className="text-gray-300">PDF Documents</span>
                        <Badge className="bg-green-600/20 text-green-300">Supported</Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded">
                        <span className="text-gray-300">Word Documents</span>
                        <Badge className="bg-green-600/20 text-green-300">Supported</Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded">
                        <span className="text-gray-300">Text Files</span>
                        <Badge className="bg-green-600/20 text-green-300">Supported</Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded">
                        <span className="text-gray-300">Markdown</span>
                        <Badge className="bg-green-600/20 text-green-300">Supported</Badge>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-3">Upload Options</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded">
                        <span className="text-gray-300">Single File</span>
                        <Badge className="bg-blue-600/20 text-blue-300">Basic</Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded">
                        <span className="text-gray-300">Batch Upload</span>
                        <Badge className="bg-purple-600/20 text-purple-300">Advanced</Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded">
                        <span className="text-gray-300">URL Import</span>
                        <Badge className="bg-cyan-600/20 text-cyan-300">Web Content</Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded">
                        <span className="text-gray-300">API Integration</span>
                        <Badge className="bg-orange-600/20 text-orange-300">Automated</Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Processing Pipeline */}
            <Card className="bg-gray-900/50 border-gray-800">
              <CardHeader>
                <CardTitle className="text-xl text-white">Document Processing Pipeline</CardTitle>
                <CardDescription className="text-gray-400">
                  How Orcha transforms your documents into searchable knowledge
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-orange-600 flex items-center justify-center text-sm font-bold flex-shrink-0">1</div>
                    <div>
                      <h4 className="font-semibold text-white">Text Extraction</h4>
                      <p className="text-gray-400 text-sm">OCR for images, parsing for structured documents, encoding detection for text files.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-amber-600 flex items-center justify-center text-sm font-bold flex-shrink-0">2</div>
                    <div>
                      <h4 className="font-semibold text-white">Text Cleaning</h4>
                      <p className="text-gray-400 text-sm">Remove formatting artifacts, normalize whitespace, handle special characters.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-yellow-600 flex items-center justify-center text-sm font-bold flex-shrink-0">3</div>
                    <div>
                      <h4 className="font-semibold text-white">Intelligent Chunking</h4>
                      <p className="text-gray-400 text-sm">Split documents into semantically meaningful chunks while preserving context.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center text-sm font-bold flex-shrink-0">4</div>
                    <div>
                      <h4 className="font-semibold text-white">Vector Embedding</h4>
                      <p className="text-gray-400 text-sm">Generate high-dimensional vectors that capture semantic meaning.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-sm font-bold flex-shrink-0">5</div>
                    <div>
                      <h4 className="font-semibold text-white">Index Storage</h4>
                      <p className="text-gray-400 text-sm">Store vectors in optimized data structures for fast retrieval.</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="query" id="query" className="space-y-8">
            {/* Query Methods */}
            <Card className="bg-gray-900/50 border-gray-800">
              <CardHeader>
                <CardTitle className="text-xl text-white">Query & Retrieval Methods</CardTitle>
                <CardDescription className="text-gray-400">
                  Different ways to search and retrieve information from your document store
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Semantic Search */}
                  <Card className="bg-gradient-to-br from-orange-900/10 to-orange-800/10 border-orange-500/20">
                    <CardHeader>
                      <CardTitle className="text-lg text-white">Semantic Search</CardTitle>
                      <CardDescription className="text-gray-400">
                        Find documents by meaning, not just keywords
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="bg-gray-950 rounded-lg p-4 mb-4">
                        <pre className="text-xs font-mono text-gray-300 overflow-x-auto">
{`// Semantic search query
const results = await searchDocuments({
  query: "How do I reset my password?",
  limit: 5,
  threshold: 0.7,
  filters: { category: "support" }
});`}
                        </pre>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-400" />
                          <span className="text-sm text-gray-300">Context-aware results</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-400" />
                          <span className="text-sm text-gray-300">Handles synonyms</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-400" />
                          <span className="text-sm text-gray-300">Relevance scoring</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Hybrid Search */}
                  <Card className="bg-gradient-to-br from-amber-900/10 to-amber-800/10 border-amber-500/20">
                    <CardHeader>
                      <CardTitle className="text-lg text-white">Hybrid Search</CardTitle>
                      <CardDescription className="text-gray-400">
                        Combine semantic and keyword search for best results
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="bg-gray-950 rounded-lg p-4 mb-4">
                        <pre className="text-xs font-mono text-gray-300 overflow-x-auto">
{`// Hybrid search with filters
const results = await hybridSearch({
  query: "authentication issues",
  semanticWeight: 0.7,
  keywordWeight: 0.3,
  dateRange: { from: "2024-01-01" },
  source: "user_manual"
});`}
                        </pre>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-400" />
                          <span className="text-sm text-gray-300">Best of both worlds</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-400" />
                          <span className="text-sm text-gray-300">Configurable weights</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-400" />
                          <span className="text-sm text-gray-300">Advanced filtering</span>
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
                <CardTitle className="text-xl text-white">Advanced Document Store Features</CardTitle>
                <CardDescription className="text-gray-400">
                  Powerful capabilities for enterprise document management
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-white mb-3">Metadata Management</h4>
                    <div className="space-y-3">
                      <div className="p-3 bg-gray-800/50 rounded">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-gray-300">Custom Fields</span>
                          <Badge className="bg-orange-600/20 text-orange-300">Flexible</Badge>
                        </div>
                        <p className="text-xs text-gray-400">Add custom metadata to documents</p>
                      </div>
                      <div className="p-3 bg-gray-800/50 rounded">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-gray-300">Auto-tagging</span>
                          <Badge className="bg-green-600/20 text-green-300">Smart</Badge>
                        </div>
                        <p className="text-xs text-gray-400">Automatically categorize content</p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-3">Performance Optimization</h4>
                    <div className="space-y-3">
                      <div className="p-3 bg-gray-800/50 rounded">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-gray-300">Indexing Strategies</span>
                          <Badge className="bg-blue-600/20 text-blue-300">Advanced</Badge>
                        </div>
                        <p className="text-xs text-gray-400">Optimize for query patterns</p>
                      </div>
                      <div className="p-3 bg-gray-800/50 rounded">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-gray-300">Caching Layers</span>
                          <Badge className="bg-purple-600/20 text-purple-300">Performance</Badge>
                        </div>
                        <p className="text-xs text-gray-400">Speed up frequent queries</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Best Practices */}
            <Card className="bg-gradient-to-br from-gray-900 to-gray-900/50 border-gray-800">
              <CardHeader>
                <CardTitle className="text-xl text-white">Best Practices & Tips</CardTitle>
                <CardDescription className="text-gray-400">
                  Maximize the effectiveness of your document store
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-white mb-3">Document Preparation</h4>
                    <ul className="space-y-2 text-sm text-gray-400">
                      <li>• Use clear, descriptive file names</li>
                      <li>• Include metadata during upload</li>
                      <li>• Organize documents in logical hierarchies</li>
                      <li>• Regularly update and refresh content</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-3">Query Optimization</h4>
                    <ul className="space-y-2 text-sm text-gray-400">
                      <li>• Craft specific, meaningful queries</li>
                      <li>• Use filters to narrow search scope</li>
                      <li>• Experiment with different search methods</li>
                      <li>• Monitor and analyze query performance</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Navigation */}
        <div className="flex justify-between items-center pt-8 border-t border-gray-800 mt-12">
          <Link href="/docs/using-orcha/streaming" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
            <ArrowLeft className="h-4 w-4" />
            <span>Streaming</span>
          </Link>
          <Link href="/docs/using-orcha/upsertion" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
            <span>Upsertion</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      <QuickLinks links={quickLinks} />
    </div>
    </main>
  );
}
