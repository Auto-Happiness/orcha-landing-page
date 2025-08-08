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
  const paddingMap = ["pl-0", "pl-4", "pl-8", "pl-12", "pl-16", "pl-20"];

  const renderItems = (items: NavItem[], level = 0) => (
    <ul className="space-y-2 text-sm text-gray-400">
      {items.map((item, index) => (
        <li key={index} className={paddingMap[level] || "pl-20"}>
          {item.href ? (
            <a href={item.href} className="hover:text-white hover:underline">
              {item.title}
            </a>
          ) : (
            <details className="group">
              <summary className="cursor-pointer text-white group-open:underline">
                {item.title}
              </summary>
              {item.children && (
                <div className="pl-1">
                  {renderItems(item.children, level + 1)}
                </div>
              )}
            </details>
          )}
        </li>
      ))}
    </ul>
  );

  return (
    <aside className="hidden lg:block w-94 bg-gray-900 border border-gray-700 rounded-lg p-5 h-fit sticky top-10 overflow-y-auto max-h-[90vh]">
      <h2 className="text-xl font-semibold mb-4 text-white">Docs</h2>
      {renderItems(items)}
    </aside>
  );
};

export default DocsSidebar;
