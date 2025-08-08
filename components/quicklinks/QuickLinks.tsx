"use client";

import React from "react";

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
    <aside className="w-full md:w-80 bg-gray-900 border border-gray-700 rounded-lg p-5 h-fit sticky top-10">
      <h2 className="text-xl font-semibold mb-4 text-white">Quick Links</h2>
      <ul className="list-disc list-inside space-y-2 text-gray-400 text-sm">
        {links.map((link, idx) => (
          <li key={idx}>
            <a
              href={link.href}
              target={link.external ? "_blank" : "_self"}
              rel={link.external ? "noopener noreferrer" : undefined}
              className="hover:text-white hover:underline"
            >
              {link.title}
            </a>
          </li>
        ))}
      </ul>

      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-2 text-white">Need Help?</h3>
        <p className="text-sm text-gray-400">
          Visit our{" "}
          <a href="/support" className="text-blue-400 hover:underline">
            Support Page
          </a>{" "}
          or reach out.
        </p>
      </div>
    </aside>
  );
};

export default QuickLinksPanel;
