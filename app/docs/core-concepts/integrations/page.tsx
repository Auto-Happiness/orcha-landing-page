"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import { Mail, Calendar, FileSpreadsheet, HardDrive, ShoppingBag } from "lucide-react";
import DocsSidebar from "@/components/docnav/DocumentNavigation";
import navItems from "@/data/document-nav.json";
import quickLinks from "@/data/quicklinks/integrations.json";
import QuickLinks from "@/components/quicklinks/QuickLinks";

export default function IntegrationsPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <div className="flex flex-col md:flex-row">
        <DocsSidebar items={navItems} />

        <div className="flex-1 px-6 py-10 pt-24 max-w-5xl">
          <div className="mb-12">
            <Badge variant="secondary" className="mb-4 bg-teal-500/10 text-teal-300 border-teal-500/20 font-mono text-xs">
              Ecosystem & Connectors
            </Badge>
            <h1 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">
              Google Workspace & Tool Integrations
            </h1>
            <p className="text-lg text-gray-300 max-w-3xl leading-relaxed">
              Equip your AI agents with native capabilities to read and write directly to Google Sheets, send summaries via Gmail, schedule review meetings on Google Calendar, and store files in Google Drive.
            </p>
          </div>

          <div id="google-workspace" className="mb-14 scroll-mt-28">
            <h2 className="text-2xl font-bold mb-4 text-white">Google Workspace Tool Suite</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div id="gmail" className="p-5 rounded-xl bg-gray-900/60 border border-gray-800 scroll-mt-28">
                <div className="flex items-center gap-2.5 text-rose-400 font-bold mb-2">
                  <Mail className="h-5 w-5" /> Gmail Tools (<code>lib/gmail-tools.ts</code>)
                </div>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Send executive data briefing emails, draft automated customer reports, search message threads, and retrieve email attachments.
                </p>
              </div>

              <div id="sheets" className="p-5 rounded-xl bg-gray-900/60 border border-gray-800 scroll-mt-28">
                <div className="flex items-center gap-2.5 text-emerald-400 font-bold mb-2">
                  <FileSpreadsheet className="h-5 w-5" /> Google Sheets (<code>lib/google-sheets-tools.ts</code>)
                </div>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Append SQL query results to live spreadsheets, create new worksheets, update cell ranges, and fetch live formula calculations.
                </p>
              </div>

              <div id="drive-calendar" className="p-5 rounded-xl bg-gray-900/60 border border-gray-800 scroll-mt-28">
                <div className="flex items-center gap-2.5 text-blue-400 font-bold mb-2">
                  <HardDrive className="h-5 w-5" /> Google Drive (<code>lib/google-drive-tools.ts</code>)
                </div>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Export PDF and CSV reports into shared corporate folders, manage file permissions, and organize query artifacts.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-gray-900/60 border border-gray-800">
                <div className="flex items-center gap-2.5 text-amber-400 font-bold mb-2">
                  <Calendar className="h-5 w-5" /> Google Calendar (<code>lib/google-calendar-tools.ts</code>)
                </div>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Schedule quarterly financial reviews, check attendee availability, and create calendar events with embedded SQL insight links.
                </p>
              </div>
            </div>
          </div>

          <div id="smithery" className="mb-14 scroll-mt-28">
            <h2 className="text-2xl font-bold mb-3 text-white">Smithery Registry Integration</h2>
            <p className="text-sm text-gray-300 leading-relaxed mb-3">
              Through Orcha&apos;s Marketplace (<code>/marketplace</code>), operators can discover, install, and configure third-party MCP servers from the <a href="https://smithery.ai" target="_blank" rel="noreferrer" className="text-teal-400 underline">Smithery.ai</a> registry with one click (<code>lib/smithery.ts</code>).
            </p>
          </div>

        </div>

        <QuickLinks links={quickLinks} />
      </div>
    </main>
  );
}
