"use client";

import React, { useState, useEffect } from "react";
import { ArrowRight, ArrowLeft, Upload, FileText, Settings, Shield, Zap, CheckCircle, AlertTriangle, HardDrive, Image, Video, Music } from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DocsSidebar from "@/components/docnav/DocumentNavigation";
import navItems from "@/data/document-nav.json";
import QuickLinks from "@/components/quicklinks/QuickLinks";
import quickLinks from "@/data/quicklinks/uploads.json";

export default function UploadsPage() {
  const [activeTab, setActiveTab] = useState("basics");

  useEffect(() => {
    // Check initial hash on mount
    const hash = window.location.hash.replace("#", "");
    if (hash && ["basics", "processing", "management", "optimization"].includes(hash)) {
      setActiveTab(hash);
    }

    // Listen for hash changes
    const handleHashChange = () => {
      const newHash = window.location.hash.replace("#", "");
      if (newHash && ["basics", "processing", "management", "optimization"].includes(newHash)) {
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
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-lime-500 to-green-600 flex items-center justify-center">
              <Upload className="h-6 w-6 text-white" />
            </div>
            <Badge variant="outline" className="border-lime-500/30 text-lime-300">User Guide</Badge>
          </div>
          <h1 className="text-4xl font-bold mb-4">Uploads</h1>
          <p className="text-lg text-gray-400 max-w-3xl">
            Master file uploads and document processing in Orcha. Learn how to handle various file types, optimize processing, and manage your uploaded content effectively.
          </p>
        </div>

        {/* Quick Start */}
        <Card className="bg-gradient-to-br from-lime-900/20 to-green-900/20 border-lime-500/30 mb-8">
          <CardHeader>
            <CardTitle className="text-xl text-white flex items-center gap-2">
              <Zap className="h-5 w-5 text-lime-400" />
              Quick Start
            </CardTitle>
            <CardDescription className="text-gray-300">
              Upload and process your first document in under 3 minutes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center gap-3 p-4 bg-gray-800/50 rounded-lg">
                <div className="w-8 h-8 rounded-full bg-lime-600 flex items-center justify-center text-sm font-bold">1</div>
                <span className="text-gray-300">Choose file type</span>
              </div>
              <div className="flex items-center gap-3 p-4 bg-gray-800/50 rounded-lg">
                <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center text-sm font-bold">2</div>
                <span className="text-gray-300">Configure processing</span>
              </div>
              <div className="flex items-center gap-3 p-4 bg-gray-800/50 rounded-lg">
                <div className="w-8 h-8 rounded-full bg-cyan-600 flex items-center justify-center text-sm font-bold">3</div>
                <span className="text-gray-300">Upload & monitor</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="grid w-full grid-cols-4 bg-gray-800/50">
            <TabsTrigger value="basics" className="text-gray-300">Basics</TabsTrigger>
            <TabsTrigger value="processing" className="text-gray-300">Processing</TabsTrigger>
            <TabsTrigger value="management" className="text-gray-300">Management</TabsTrigger>
            <TabsTrigger value="optimization" className="text-gray-300">Optimization</TabsTrigger>
          </TabsList>

          <TabsContent value="basics" id="basics" className="space-y-8">
            {/* Supported File Types */}
            <Card className="bg-gray-900/50 border-gray-800">
              <CardHeader>
                <CardTitle className="text-2xl text-white">Supported File Types</CardTitle>
                <CardDescription className="text-gray-400">
                  Orcha supports a wide range of file formats for comprehensive document processing
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="text-center p-6 bg-gradient-to-br from-blue-600/10 to-blue-800/10 rounded-lg border border-blue-500/20">
                    <FileText className="h-12 w-12 mx-auto mb-4 text-blue-400" />
                    <h3 className="font-semibold text-white mb-2">Documents</h3>
                    <p className="text-sm text-gray-400">PDF, DOCX, TXT, MD</p>
                    <Badge className="mt-2 bg-blue-600/20 text-blue-300">Primary</Badge>
                  </div>
                  <div className="text-center p-6 bg-gradient-to-br from-green-600/10 to-green-800/10 rounded-lg border border-green-500/20">
                    <Image className="h-12 w-12 mx-auto mb-4 text-green-400" />
                    <h3 className="font-semibold text-white mb-2">Images</h3>
                    <p className="text-sm text-gray-400">JPG, PNG, GIF, SVG</p>
                    <Badge className="mt-2 bg-green-600/20 text-green-300">OCR</Badge>
                  </div>
                  <div className="text-center p-6 bg-gradient-to-br from-purple-600/10 to-purple-800/10 rounded-lg border border-purple-500/20">
                    <Video className="h-12 w-12 mx-auto mb-4 text-purple-400" />
                    <h3 className="font-semibold text-white mb-2">Videos</h3>
                    <p className="text-sm text-gray-400">MP4, AVI, MOV</p>
                    <Badge className="mt-2 bg-purple-600/20 text-purple-300">Transcript</Badge>
                  </div>
                  <div className="text-center p-6 bg-gradient-to-br from-orange-600/10 to-orange-800/10 rounded-lg border border-orange-500/20">
                    <Music className="h-12 w-12 mx-auto mb-4 text-orange-400" />
                    <h3 className="font-semibold text-white mb-2">Audio</h3>
                    <p className="text-sm text-gray-400">MP3, WAV, M4A</p>
                    <Badge className="mt-2 bg-orange-600/20 text-orange-300">Speech-to-Text</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Upload Methods */}
            <Card className="bg-gray-900/50 border-gray-800">
              <CardHeader>
                <CardTitle className="text-xl text-white">Upload Methods</CardTitle>
                <CardDescription className="text-gray-400">
                  Multiple ways to upload files to Orcha's processing pipeline
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-950 border border-gray-800 rounded-lg p-4 mb-6">
                  <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                    <Upload className="h-4 w-4 text-lime-400" />
                    REST API Upload
                  </h4>
                  <pre className="text-sm font-mono text-gray-300 overflow-x-auto">
{`const formData = new FormData();
formData.append('file', selectedFile);
formData.append('metadata', JSON.stringify({
  title: 'Important Document',
  category: 'business',
  tags: ['confidential', 'review']
}));

const response = await fetch('/api/v1/uploads', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY'
  },
  body: formData
});

const result = await response.json();
console.log('Upload ID:', result.uploadId);`}
                  </pre>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-gray-800/50 rounded border border-gray-700">
                    <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                    <h4 className="font-semibold text-white mb-1">Direct Upload</h4>
                    <p className="text-xs text-gray-400">Upload files directly via API</p>
                  </div>
                  <div className="text-center p-4 bg-gray-800/50 rounded border border-gray-700">
                    <FileText className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                    <h4 className="font-semibold text-white mb-1">Batch Upload</h4>
                    <p className="text-xs text-gray-400">Process multiple files at once</p>
                  </div>
                  <div className="text-center p-4 bg-gray-800/50 rounded border border-gray-700">
                    <Settings className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                    <h4 className="font-semibold text-white mb-1">URL Import</h4>
                    <p className="text-xs text-gray-400">Import from external URLs</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="processing" id="processing" className="space-y-8">
            {/* Processing Pipeline */}
            <Card className="bg-gray-900/50 border-gray-800">
              <CardHeader>
                <CardTitle className="text-xl text-white">Processing Pipeline</CardTitle>
                <CardDescription className="text-gray-400">
                  How Orcha transforms uploaded files into searchable, AI-ready content
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-lime-600 flex items-center justify-center text-sm font-bold flex-shrink-0">1</div>
                    <div>
                      <h4 className="font-semibold text-white">File Validation</h4>
                      <p className="text-gray-400 text-sm">Check file type, size, and integrity. Reject unsupported or corrupted files.</p>
                      <div className="mt-2 flex flex-wrap gap-1">
                        <Badge className="text-xs bg-lime-600/20 text-lime-300">Virus Scan</Badge>
                        <Badge className="text-xs bg-lime-600/20 text-lime-300">Size Limits</Badge>
                        <Badge className="text-xs bg-lime-600/20 text-lime-300">Format Check</Badge>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center text-sm font-bold flex-shrink-0">2</div>
                    <div>
                      <h4 className="font-semibold text-white">Content Extraction</h4>
                      <p className="text-gray-400 text-sm">Extract text from documents, transcribe audio/video, perform OCR on images.</p>
                      <div className="mt-2 flex flex-wrap gap-1">
                        <Badge className="text-xs bg-green-600/20 text-green-300">OCR</Badge>
                        <Badge className="text-xs bg-green-600/20 text-green-300">Speech-to-Text</Badge>
                        <Badge className="text-xs bg-green-600/20 text-green-300">Parsing</Badge>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-cyan-600 flex items-center justify-center text-sm font-bold flex-shrink-0">3</div>
                    <div>
                      <h4 className="font-semibold text-white">Text Chunking</h4>
                      <p className="text-gray-400 text-sm">Split extracted text into semantically meaningful chunks for optimal retrieval.</p>
                      <div className="mt-2 flex flex-wrap gap-1">
                        <Badge className="text-xs bg-cyan-600/20 text-cyan-300">Semantic</Badge>
                        <Badge className="text-xs bg-cyan-600/20 text-cyan-300">Overlapping</Badge>
                        <Badge className="text-xs bg-cyan-600/20 text-cyan-300">Context-aware</Badge>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-sm font-bold flex-shrink-0">4</div>
                    <div>
                      <h4 className="font-semibold text-white">Vector Embedding</h4>
                      <p className="text-gray-400 text-sm">Generate high-dimensional vector representations for semantic search.</p>
                      <div className="mt-2 flex flex-wrap gap-1">
                        <Badge className="text-xs bg-blue-600/20 text-blue-300">Embeddings</Badge>
                        <Badge className="text-xs bg-blue-600/20 text-blue-300">Dimensionality</Badge>
                        <Badge className="text-xs bg-blue-600/20 text-blue-300">Indexing</Badge>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-sm font-bold flex-shrink-0">5</div>
                    <div>
                      <h4 className="font-semibold text-white">Storage & Indexing</h4>
                      <p className="text-gray-400 text-sm">Store processed content and create optimized search indexes.</p>
                      <div className="mt-2 flex flex-wrap gap-1">
                        <Badge className="text-xs bg-purple-600/20 text-purple-300">Database</Badge>
                        <Badge className="text-xs bg-purple-600/20 text-purple-300">Search Index</Badge>
                        <Badge className="text-xs bg-purple-600/20 text-purple-300">Metadata</Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Processing Options */}
            <Card className="bg-gray-900/50 border-gray-800">
              <CardHeader>
                <CardTitle className="text-xl text-white">Processing Configuration</CardTitle>
                <CardDescription className="text-gray-400">
                  Customize how your files are processed and indexed
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-gray-950 border border-gray-800 rounded-lg p-4">
                  <h4 className="font-semibold text-white mb-3">Advanced Processing Options</h4>
                  <pre className="text-sm font-mono text-gray-300 overflow-x-auto">
{`const processingOptions = {
  // Text extraction settings
  ocr: {
    language: 'en',
    enhanceContrast: true,
    deskew: true
  },

  // Chunking configuration
  chunking: {
    strategy: 'semantic',
    size: 512,
    overlap: 50,
    preserveHeaders: true
  },

  // Embedding settings
  embedding: {
    model: 'text-embedding-ada-002',
    dimensions: 1536,
    normalize: true
  },

  // Indexing options
  indexing: {
    enableHybrid: true,
    semanticWeight: 0.7,
    keywordWeight: 0.3
  }
};`}
                  </pre>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-white mb-3">Quality Settings</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded">
                        <span className="text-gray-300">OCR Accuracy</span>
                        <Badge className="bg-green-600/20 text-green-300">High</Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded">
                        <span className="text-gray-300">Chunk Quality</span>
                        <Badge className="bg-blue-600/20 text-blue-300">Semantic</Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded">
                        <span className="text-gray-300">Embedding Precision</span>
                        <Badge className="bg-purple-600/20 text-purple-300">Optimized</Badge>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-3">Performance Options</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded">
                        <span className="text-gray-300">Processing Priority</span>
                        <Badge className="bg-yellow-600/20 text-yellow-300">Normal</Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded">
                        <span className="text-gray-300">Concurrent Processing</span>
                        <Badge className="bg-orange-600/20 text-orange-300">Parallel</Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded">
                        <span className="text-gray-300">Retry Logic</span>
                        <Badge className="bg-red-600/20 text-red-300">Automatic</Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="management" id="management" className="space-y-8">
            {/* File Management */}
            <Card className="bg-gray-900/50 border-gray-800">
              <CardHeader>
                <CardTitle className="text-xl text-white">File Management</CardTitle>
                <CardDescription className="text-gray-400">
                  Organize, monitor, and maintain your uploaded files and processed content
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* File Organization */}
                  <Card className="bg-gradient-to-br from-lime-900/10 to-lime-800/10 border-lime-500/20">
                    <CardHeader>
                      <CardTitle className="text-lg text-white">File Organization</CardTitle>
                      <CardDescription className="text-gray-400">
                        Keep your documents structured and easily accessible
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="bg-gray-950 rounded-lg p-4 mb-4">
                        <pre className="text-xs font-mono text-gray-300 overflow-x-auto">
{`// Organize files with metadata
const fileMetadata = {
  name: 'Q4_Financial_Report.pdf',
  folder: 'finance/reports',
  tags: ['quarterly', 'confidential'],
  permissions: {
    read: ['finance_team'],
    write: ['cfo', 'accountant']
  },
  retention: {
    policy: '7_years',
    autoDelete: false
  }
};`}
                        </pre>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-400" />
                          <span className="text-sm text-gray-300">Hierarchical folders</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-400" />
                          <span className="text-sm text-gray-300">Metadata tagging</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-400" />
                          <span className="text-sm text-gray-300">Access controls</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Processing Status */}
                  <Card className="bg-gradient-to-br from-green-900/10 to-green-800/10 border-green-500/20">
                    <CardHeader>
                      <CardTitle className="text-lg text-white">Processing Status</CardTitle>
                      <CardDescription className="text-gray-400">
                        Monitor the progress and status of file processing
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="bg-gray-950 rounded-lg p-4 mb-4">
                        <pre className="text-xs font-mono text-gray-300 overflow-x-auto">
{`// Check processing status
const status = await getProcessingStatus(uploadId);
console.log(status);
// Output:
// {
//   status: 'completed',
//   progress: 100,
//   stages: {
//     validation: 'completed',
//     extraction: 'completed',
//     chunking: 'completed',
//     embedding: 'completed',
//     indexing: 'completed'
//   },
//   processedAt: '2024-01-15T10:30:00Z'
// }`}
                        </pre>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-400" />
                          <span className="text-sm text-gray-300">Real-time progress</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-400" />
                          <span className="text-sm text-gray-300">Stage-by-stage tracking</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-400" />
                          <span className="text-sm text-gray-300">Error reporting</span>
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
                  Maximize upload speed and processing efficiency
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-white mb-3">File Preparation</h4>
                    <div className="space-y-3">
                      <div className="p-3 bg-gray-800/50 rounded">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-gray-300">Optimal File Size</span>
                          <Badge className="bg-green-600/20 text-green-300">1-10 MB</Badge>
                        </div>
                        <p className="text-xs text-gray-400">Balance detail with processing speed</p>
                      </div>
                      <div className="p-3 bg-gray-800/50 rounded">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-gray-300">Format Selection</span>
                          <Badge className="bg-blue-600/20 text-blue-300">PDF/DOCX</Badge>
                        </div>
                        <p className="text-xs text-gray-400">Choose formats that preserve structure</p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-3">Processing Strategies</h4>
                    <div className="space-y-3">
                      <div className="p-3 bg-gray-800/50 rounded">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-gray-300">Batch Processing</span>
                          <Badge className="bg-purple-600/20 text-purple-300">Recommended</Badge>
                        </div>
                        <p className="text-xs text-gray-400">Process multiple files together</p>
                      </div>
                      <div className="p-3 bg-gray-800/50 rounded">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-gray-300">Async Uploads</span>
                          <Badge className="bg-cyan-600/20 text-cyan-300">Non-blocking</Badge>
                        </div>
                        <p className="text-xs text-gray-400">Don't wait for processing completion</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Security & Compliance */}
            <Card className="bg-gradient-to-br from-gray-900 to-gray-900/50 border-gray-800">
              <CardHeader>
                <CardTitle className="text-xl text-white flex items-center gap-2">
                  <Shield className="h-5 w-5 text-yellow-400" />
                  Security & Compliance
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Ensure your uploads meet security standards and compliance requirements
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-white mb-3">Security Measures</h4>
                    <ul className="space-y-2 text-sm text-gray-400">
                      <li>• File type validation and malware scanning</li>
                      <li>• Encrypted storage and transmission</li>
                      <li>• Access control and audit logging</li>
                      <li>• Data sanitization and cleanup</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-3">Compliance Features</h4>
                    <ul className="space-y-2 text-sm text-gray-400">
                      <li>• GDPR and privacy regulation support</li>
                      <li>• Data retention policies</li>
                      <li>• PII detection and masking</li>
                      <li>• Compliance reporting</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Troubleshooting */}
            <Card className="bg-gray-900/50 border-gray-800">
              <CardHeader>
                <CardTitle className="text-xl text-white flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-orange-400" />
                  Common Issues & Solutions
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Resolve upload and processing problems quickly
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-red-900/10 border border-red-500/20 rounded">
                    <h4 className="font-semibold text-red-400 mb-2">File Too Large</h4>
                    <p className="text-sm text-gray-400 mb-2">Solution: Compress files or split large documents into smaller chunks.</p>
                    <Badge className="text-xs bg-red-600/20 text-red-300">Size Limit: 50MB</Badge>
                  </div>
                  <div className="p-4 bg-yellow-900/10 border border-yellow-500/20 rounded">
                    <h4 className="font-semibold text-yellow-400 mb-2">Unsupported Format</h4>
                    <p className="text-sm text-gray-400 mb-2">Solution: Convert to supported formats like PDF or DOCX.</p>
                    <Badge className="text-xs bg-yellow-600/20 text-yellow-300">Format Check</Badge>
                  </div>
                  <div className="p-4 bg-blue-900/10 border border-blue-500/20 rounded">
                    <h4 className="font-semibold text-blue-400 mb-2">Processing Timeout</h4>
                    <p className="text-sm text-gray-400 mb-2">Solution: Reduce file size or use batch processing for large uploads.</p>
                    <Badge className="text-xs bg-blue-600/20 text-blue-300">Timeout: 10min</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Navigation */}
        <div className="flex justify-between items-center pt-8 border-t border-gray-800 mt-12">
          <Link href="/docs/using-orcha/embed" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
            <ArrowLeft className="h-4 w-4" />
            <span>Embed</span>
          </Link>
          <div></div>
        </div>
      </div>

      <QuickLinks links={quickLinks} />
    </div>
    </main>
  );
}
