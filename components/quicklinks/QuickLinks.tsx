"use client";

import React from "react";
import { Hash, ExternalLink, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";

type QuickLink = {
  title: string;
  href: string;
  external?: boolean;
};

interface QuickLinksPanelProps {
  links: QuickLink[];
}

const QuickLinksPanel: React.FC<QuickLinksPanelProps> = ({ links }) => {
  return (
    <aside className="hidden lg:block w-72 shrink-0">
      <div className="sticky top-24 overflow-y-auto max-h-[calc(100vh-8rem)]">
        {/* On this page */}
        <div className="mb-6">
          <h2 className="text-sm font-semibold mb-3 text-gray-400 uppercase tracking-wider flex items-center gap-2">
            <Hash className="h-4 w-4" />
            Contents
          </h2>
          <ul className="space-y-1 border-l-2 border-gray-800 ml-1.5">
            {links.map((link, idx) => (
              <li key={idx}>
                <a
                  href={link.href}
                  target={link.external ? "_blank" : "_self"}
                  rel={link.external ? "noopener noreferrer" : undefined}
                  className={cn(
                    "block py-1.5 pl-4 text-sm transition-all duration-200",
                    "text-gray-400 hover:text-purple-400 hover:border-l-2 hover:border-purple-400",
                    "-ml-[2px] border-l-2 border-transparent"
                  )}
                >
                  <span className="flex items-center gap-2">
                    {link.title}
                    {link.external && (
                      <ExternalLink className="h-3 w-3 opacity-50" />
                    )}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Help Section */}
        <div className="pt-4 border-t border-gray-800">
          <h3 className="text-sm font-semibold mb-3 text-gray-400 uppercase tracking-wider flex items-center gap-2">
            <HelpCircle className="h-4 w-4" />
            Need Help?
          </h3>
          <p className="text-sm text-gray-500 leading-relaxed">
            Visit our{" "}
            <a href="/support" className="text-purple-400 hover:text-purple-300 hover:underline transition-colors">
              Support Page
            </a>{" "}
            or reach out to our team.
          </p>
        </div>
      </div>
    </aside>
  );
};

export default QuickLinksPanel;
