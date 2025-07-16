"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { PricingDrawer } from "./pricing-drawer";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { useScroll, motion, useMotionValueEvent } from "framer-motion";

const products = [
  {
    title: "AI Agents",
    href: "/products/ai-agents",
    description: "Build and deploy custom AI agents for your specific needs.",
  },
  {
    title: "Orchestration",
    href: "/products/orchestration",
    description: "Coordinate multiple AI agents to work together seamlessly.",
  },
  {
    title: "Integration Hub",
    href: "/products/integration-hub",
    description: "Connect your AI agents with popular tools and platforms.",
  },
  {
    title: "Analytics",
    href: "/products/analytics",
    description: "JA MES BONDOC",
  },
];

const channels = [
  {
    title: "Slack",
    href: "/integrations/slack",
    icon: "/platforms/slack-logo.svg",
    description: "Connect and control your AI agents directly from Slack.",
  },
  {
    title: "Discord",
    href: "/integrations/discord",
    icon: "/platforms/discord-logo.svg",
    description: "Connect and control your AI agents directly from Discord.",
  }
];

const companyItems = [
  {
    title: "About",
    href: "/company/about",
    description: "Learn more about our mission, values, and team.",
  },
  {
    title: "Events",
    href: "/company/events",
    description: "Stay updated with our latest events and announcements.",
  },
  {
    title: "Careers",
    href: "/company/careers",
    description: "Join our team and help shape the future of AI.",
  },
];

const menuItems = [
  { name: "Features", href: "#features" },
];

interface ListItemProps extends Omit<React.ComponentPropsWithoutRef<typeof Link>, 'href'> {
  title: string;
  href: string;
}

function ListItem({ className, title, children, href, ...props }: ListItemProps) {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          href={href}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-zinc-800 focus:bg-zinc-800",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none text-white">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-zinc-400">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
}

function ChannelItem({ className, title, icon, children, ...props }: React.ComponentPropsWithoutRef<"a"> & { title: string; icon: string }) {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          className={cn(
            "block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-zinc-800 focus:bg-zinc-800",
            className
          )}
          {...props}
        >
          <div className="flex items-center space-x-3">
            <Image src={icon} alt={title} width={24} height={24} className="w-6 h-6" />
            <div>
              <div className="text-sm font-medium leading-none text-white">{title}</div>
              <p className="line-clamp-2 text-sm leading-snug text-zinc-400 mt-1">
                {children}
              </p>
            </div>
          </div>
        </a>
      </NavigationMenuLink>
    </li>
  );
}

export function Header() {
  const [visible, setVisible] = React.useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 100) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  });

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
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center">
      <motion.header
        animate={{
          backdropFilter: visible ? "blur(10px)" : "none",
          boxShadow: visible
            ? "0 0 24px rgba(34, 42, 53, 0.06), 0 1px 1px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(34, 42, 53, 0.04), 0 0 4px rgba(34, 42, 53, 0.08), 0 16px 68px rgba(47, 48, 55, 0.05), 0 1px 0 rgba(255, 255, 255, 0.1) inset"
            : "none",
          width: visible ? "90%" : "100%",
          y: visible ? 20 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 50,
        }}
        className="w-full bg-black/50 backdrop-blur-lg border-b border-white/10">

        <nav className="container mx-auto px-6 h-16 flex items-center justify-between">
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

          <div className="flex-1 flex justify-center">
            <NavigationMenu>
              <NavigationMenuList className="gap-6">
                {menuItems.map((item) => (
                  <NavigationMenuItem key={item.name}>
                    <Link
                      href={item.href}
                      onClick={(e) => scrollToSection(e, item.href)}
                      className={cn(
                        "text-sm font-medium text-white/70 hover:text-white transition-colors"
                      )}
                    >
                      {item.name}
                    </Link>
                  </NavigationMenuItem>
                ))}
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-sm font-medium text-white/70 hover:text-white transition-colors bg-transparent border-0 hover:bg-transparent focus:bg-transparent">Company</NavigationMenuTrigger>
                  <NavigationMenuContent className="bg-zinc-900 border border-white/10">
                    <div className="p-4">
                      <ul className="grid w-[400px] gap-3">
                        {companyItems.map((item) => (
                          <ListItem
                            key={item.title}
                            title={item.title}
                            href={item.href}
                          >
                            {item.description}
                          </ListItem>
                        ))}
                      </ul>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-sm font-medium text-white/70 hover:text-white transition-colors bg-transparent border-0 hover:bg-transparent focus:bg-transparent">Products</NavigationMenuTrigger>
                  <NavigationMenuContent className="bg-zinc-900 border border-white/10">
                    <div className="p-4">
                      <ul className="grid w-[400px] gap-3 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                        {products.map((product) => (
                          <ListItem
                            key={product.title}
                            title={product.title}
                            href={product.href}
                          >
                            {product.description}
                          </ListItem>
                        ))}
                      </ul>
                      <div className="mt-6 pt-6 border-t border-white/10">
                        <h3 className="text-sm font-medium text-white mb-3">Channels</h3>
                        <ul className="grid gap-3">
                          {channels.map((channel) => (
                            <ChannelItem
                              key={channel.title}
                              title={channel.title}
                              icon={channel.icon}
                              href={channel.href}
                            >
                              {channel.description}
                            </ChannelItem>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <PricingDrawer />
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          <div className="flex items-center">
            <Link
              href="/login"
              className="text-sm font-medium text-white/70 hover:text-white transition-colors px-4 py-2 rounded-full hover:bg-zinc-800"
            >
              Login
            </Link>
          </div>

          <div className="md:hidden">
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
      </motion.header>
    </div>
  );
} 