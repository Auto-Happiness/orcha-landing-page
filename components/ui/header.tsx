"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

const menuItems = [
  { name: "Features", href: "#features" },
  { name: "Deployment", href: "/deployment" },
  { name: "Pricing", href: "#pricing" },
  { name: "Company", href: "/company" },
];

export function Header() {
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header className="fixed top-0 w-full z-50 bg-black/50 backdrop-blur-lg border-b border-white/10">
      <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center">
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/placeholder-logo.svg"
              alt="Orcha Logo"
              width={32}
              height={32}
              className="w-8 h-8"
            />
            <span className="text-xl font-bold text-white">Orcha</span>
          </Link>
        </div>

        <div className="hidden md:flex items-center space-x-8">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={(e) => scrollToSection(e, item.href)}
              className={cn(
                "text-sm font-medium text-white/70 hover:text-white transition-colors"
              )}
            >
              {item.name}
            </Link>
          ))}
        </div>

        <div className="flex md:hidden">
          <button
            className="text-white hover:text-white/70 transition-colors"
            aria-label="Toggle Menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </button>
        </div>
      </nav>
    </header>
  );
} 