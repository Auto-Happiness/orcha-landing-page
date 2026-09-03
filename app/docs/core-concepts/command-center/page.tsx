"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import { Layout, BarChart3, LineChart, PieChart, Activity } from "lucide-react";
import DocsSidebar from "@/components/docnav/DocumentNavigation";
import navItems from "@/data/document-nav.json";
import quickLinks from "@/data/quicklinks/command-center.json";
import QuickLinks from "@/components/quicklinks/QuickLinks";

export default function CommandCenterPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <div className="flex flex-col md:flex-row">
        <DocsSidebar items={navItems} />

        <div className="flex-1 px-6 py-10 pt-24 max-w-5xl">
          <div className="mb-12">
            <Badge variant="secondary" className="mb-4 bg-purple-500/10 text-purple-300 border-purple-500/20 font-mono text-xs">
              Executive Visual Intelligence
            </Badge>
            <h1 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">
              Command Center & Dashboards
            </h1>
            <p className="text-lg text-gray-300 max-w-3xl leading-relaxed">
              Real-time executive dashboards without feature creeping. Build, customize, and stream live database statistics, distribution graphs, and operational metrics instantly.
            </p>
          </div>

          <div id="overview" className="mb-14 scroll-mt-28">
            <h2 className="text-2xl font-bold mb-3 text-white">Overview</h2>
            <p className="text-sm text-gray-300 leading-relaxed mb-4">
              The Command Center (<code>/command-center</code>) gives operators, leadership, and developers a central cockpit to monitor live metrics across connected databases without writing ad-hoc SQL every time.
            </p>
          </div>

          <div id="templates" className="mb-14 scroll-mt-28">
            <h2 className="text-2xl font-bold mb-4 text-white">Pre-Configured Dashboard Templates</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="p-5 rounded-xl bg-gray-900/60 border border-gray-800">
                <div className="font-bold text-teal-400 text-sm mb-1">School & Academic Dashboard</div>
                <p className="text-xs text-gray-400 leading-relaxed">Active student counts, male vs female demographic distribution donuts, and enrollment breakdowns by grade level.</p>
              </div>
              <div className="p-5 rounded-xl bg-gray-900/60 border border-gray-800">
                <div className="font-bold text-blue-400 text-sm mb-1">Sales & Revenue Intelligence</div>
                <p className="text-xs text-gray-400 leading-relaxed">Quarterly ARR, monthly recurring churn, top performing sales reps, and regional order heatmaps.</p>
              </div>
              <div className="p-5 rounded-xl bg-gray-900/60 border border-gray-800">
                <div className="font-bold text-purple-400 text-sm mb-1">Inventory & Supply Chain</div>
                <p className="text-xs text-gray-400 leading-relaxed">Stock reorder triggers, supplier lead times, warehouse utilization ratios, and out-of-stock projections.</p>
              </div>
              <div className="p-5 rounded-xl bg-gray-900/60 border border-gray-800">
                <div className="font-bold text-amber-400 text-sm mb-1">Server Analytics & Query Performance</div>
                <p className="text-xs text-gray-400 leading-relaxed">Active connection pool threads, slow-query heatmaps, table partition stats, and query execution times.</p>
              </div>
            </div>
          </div>

          <div id="widgets" className="mb-14 scroll-mt-28">
            <h2 className="text-2xl font-bold mb-3 text-white">Widget Types</h2>
            <div className="space-y-3">
              <div className="p-4 rounded-xl bg-gray-950 border border-gray-800 flex items-center justify-between">
                <div>
                  <div className="text-sm font-bold text-white">KPI Metric Cards</div>
                  <div className="text-xs text-gray-400">Large stat callouts with delta indicators (e.g. +14% vs last week) and live pulse badges.</div>
                </div>
                <Badge variant="outline" className="text-xs font-mono text-gray-300">Single Value</Badge>
              </div>
              <div className="p-4 rounded-xl bg-gray-950 border border-gray-800 flex items-center justify-between">
                <div>
                  <div className="text-sm font-bold text-white">Donut & Pie Distributions</div>
                  <div className="text-xs text-gray-400">Multi-slice demographic ratios with color-coded callouts and animated hover paths.</div>
                </div>
                <Badge variant="outline" className="text-xs font-mono text-gray-300">SVG Chart</Badge>
              </div>
              <div className="p-4 rounded-xl bg-gray-950 border border-gray-800 flex items-center justify-between">
                <div>
                  <div className="text-sm font-bold text-white">Bar & Column Charts</div>
                  <div className="text-xs text-gray-400">Categorical distributions with animated transition heights and custom color palettes.</div>
                </div>
                <Badge variant="outline" className="text-xs font-mono text-gray-300">Responsive Grid</Badge>
              </div>
            </div>
          </div>

          <div id="streaming" className="mb-14 scroll-mt-28">
            <h2 className="text-2xl font-bold mb-3 text-white">Live Data Streaming & Reactive Queries</h2>
            <p className="text-sm text-gray-300 leading-relaxed">
              Powered by Convex reactive subscriptions, dashboard widgets automatically re-render whenever underlying database triggers fire or scheduled refresh intervals expire.
            </p>
          </div>

        </div>

        <QuickLinks links={quickLinks} />
      </div>
    </main>
  );
}
