"use client";

import React from "react";

type NavItem = {
  title: string;
  href?: string;
  children?: NavItem[];
};

interface DocsSidebarProps {
  items: NavItem[];
}

const DocsSidebar: React.FC<DocsSidebarProps> = ({ items }) => {
  const renderItems = (items: NavItem[]) => (
    <ul className="space-y-2 text-sm text-gray-400">
      {items.map((item, index) => (
        <li key={index}>
          {item.href ? (
            <a href={item.href} className="hover:text-white hover:underline">
              {item.title}
            </a>
          ) : (
            <details className="group">
              <summary className="cursor-pointer text-white group-open:underline">
                {item.title}
              </summary>
              {item.children && renderItems(item.children)}
            </details>
          )}
        </li>
      ))}
    </ul>
  );

  return (
    <aside className="hidden lg:block w-64 bg-gray-900 border border-gray-700 rounded-lg p-5 h-fit sticky top-10 overflow-y-auto max-h-[90vh]">
      <h2 className="text-xl font-semibold mb-4 text-white">Docs</h2>
      {renderItems(items)}
    </aside>
  );
};

export default DocsSidebar;
