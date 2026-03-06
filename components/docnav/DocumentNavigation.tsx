"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

type NavItem = {
  title: string;
  href?: string;
  children?: NavItem[];
  external?: boolean;
};

interface DocsSidebarProps {
  items: NavItem[];
}

const DocsSidebar: React.FC<DocsSidebarProps> = ({ items }) => {
  const pathname = usePathname();
  const [openSections, setOpenSections] = useState<Record<string, boolean>>(() => {
    // Auto-open sections that contain the current path
    const initial: Record<string, boolean> = {};
    items.forEach(item => {
      if (item.children) {
        const hasActiveChild = item.children.some(
          child => child.href && pathname?.startsWith(child.href)
        );
        if (hasActiveChild || item.href && pathname?.startsWith(item.href)) {
          initial[item.title] = true;
        }
      }
    });
    return initial;
  });

  const toggleSection = (title: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setOpenSections(prev => ({
      ...prev,
      [title]: !prev[title]
    }));
  };

  const isActive = (href?: string) => {
    if (!href) return false;
    return pathname === href || pathname?.startsWith(href + "/");
  };

  const renderItems = (items: NavItem[], level = 0) => (
    <ul className="space-y-0.5">
      {items.map((item, index) => {
        const hasChildren = item.children && item.children.length > 0;
        const isOpen = openSections[item.title];
        const active = isActive(item.href);
        
        return (
          <li key={index} className={cn(
            "select-none",
            level > 0 && "ml-3"
          )}>
            {hasChildren ? (
              <div className="group">
                <div 
                  className={cn(
                    "flex items-center justify-between py-1.5 px-2 rounded-md cursor-pointer transition-colors",
                    active ? "text-purple-400" : "text-gray-300 hover:text-white hover:bg-gray-800/50"
                  )}
                  onClick={(e) => {
                    // If there's an href, toggle on click; otherwise just toggle
                    if (item.href) {
                      toggleSection(item.title, e);
                    } else {
                      toggleSection(item.title, e);
                    }
                  }}
                >
                  <span className="text-sm font-medium">{item.title}</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleSection(item.title, e);
                    }}
                    className="p-0.5 hover:bg-gray-700 rounded transition-colors"
                  >
                    <ChevronRight 
                      className={cn(
                        "h-4 w-4 transition-transform duration-200",
                        isOpen ? "rotate-90" : ""
                      )} 
                    />
                  </button>
                </div>
                {isOpen && (
                  <div className="mt-0.5">
                    {renderItems(item.children!, level + 1)}
                  </div>
                )}
              </div>
            ) : item.external ? (
              <a 
                href={item.href} 
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "block py-1.5 px-2 rounded-md text-sm transition-colors",
                  active 
                    ? "text-purple-400 font-medium" 
                    : "text-gray-400 hover:text-white hover:bg-gray-800/50"
                )}
              >
                {item.title}
              </a>
            ) : (
              <Link 
                href={item.href || "#"} 
                className={cn(
                  "block py-1.5 px-2 rounded-md text-sm transition-colors",
                  active 
                    ? "text-purple-400 font-medium" 
                    : "text-gray-400 hover:text-white hover:bg-gray-800/50"
                )}
              >
                {item.title}
              </Link>
            )}
          </li>
        );
      })}
    </ul>
  );

  return (
    <aside className="hidden lg:block w-72 shrink-0">
      <div className="sticky top-24 overflow-y-auto max-h-[calc(100vh-8rem)] pr-4">
        <nav className="space-y-6">
          {renderItems(items)}
        </nav>
      </div>
    </aside>
  );
};

export default DocsSidebar;
