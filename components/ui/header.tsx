"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { PricingDrawer } from "./pricing-drawer";
import logo from "@/assets/definitve-logo.png";
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
    title: "Orcha AI",
    href: "/products/orcha-ai",
    description: "No code editor to build your LLM apllication",
    icon: "", //Bot
  },
  {
    title: "Software Development",
    href: "/products/software-development",
    description:
      "We design and build modern, scalable, and secure applications tailored to your business goals",
    icon: "", //Bot
  },
  // {
  //   title: "SAP Development",
  //   href: "/products/sap",
  //   description: "We can build your SAP business tools for you.",
  //   icon: "" //Bot
  // },
];

const channels = [
  //  {
  //    title: "Discord",
  //    href: "/features/channels/discord",
  //    description: "Connect and manage your AI agents through Discord.",
  //    image: "/platforms/discord-logo.svg"
  //  },
  //  {
  //    title: "Slack",
  //    href: "/features/channels/slack",
  //    description: "Integrate AI agents directly into your Slack workspace.",
  //    image: "/platforms/slack-logo.svg"
  //  }
];

const resources = [
  {
    title: "Training",
    href: "/resources/training",
    description: "Learn how to use our platform effectively.",
    icon: "", // GraduationCap
  },
  {
    title: "Solutions",
    href: "/resources/solutions",
    description: "Explore industry-specific solutions.",
    icon: "", // Lightbulb
  },
  {
    title: "Blog",
    href: "/resources/blog",
    description: "Latest news, updates, and insights.",
    icon: "", // Newspaper
  },
  {
    title: "Case Studies",
    href: "/resources/case-studies",
    description: "Real-world success stories from our customers.",
    icon: "", // FileCheck2
  },
];

const developers = [
  {
    title: "Orcha AI Documentation",
    href: "/docs/intro",
    description: "Comprehensive guides and API references.",
    icon: "", // BookMarked
  },
  {
    title: "Integrations",
    href: "/developers/integrations",
    description: "Connect with your favorite tools and services.",
    icon: "", // Plug
  },
  {
    title: "Tutorials",
    href: "/developers/tutorials",
    description: "Step-by-step guides to get you started.",
    icon: "", // PlayCircle
  },
];

const companyItems = [
  {
    title: "About",
    href: "/about",
    description: "Learn more about our mission, values, and team.",
    icon: "", // Building2
  },
  // {
  //   title: "Press",
  //   href: "/company/press",
  //   description: "Latest news and media coverage.",
  //   icon: "" // FileText
  // },
  // {
  //   title: "Careers",
  //   href: "/company/careers",
  //   description: "Join our team and help shape the future of AI.",
  //   icon: "" // Users
  // },
  // {
  //   title: "Events",
  //   href: "/company/events",
  //   description: "Stay updated with our latest events and announcements.",
  //   icon: "" // Calendar
  // },
  // {
  //   title: "Our principles",
  //   href: "/company/principles",
  //   description: "The values that guide our work and decisions.",
  //   icon: "" // Heart
  // },
  // {
  //   title: "The Tao of HashiCorp",
  //   href: "/company/tao",
  //   description: "Our philosophy and approach to technology.",
  //   icon: "" // BookOpen
  // },
  // {
  //   title: "Become a partner",
  //   href: "/company/partners",
  //   description: "Join our partner ecosystem.",
  //   icon: "" // Handshake
  // }
];

interface ListItemProps {
  title: string;
  description?: string;
  icon?: React.ComponentType<{ className?: string }>;
  href?: string;
  className?: string;
  children?: React.ReactNode;
}

function ListItem({
  className,
  title,
  children,
  icon: Icon,
  href,
  ...props
}: ListItemProps) {
  return (
    <NavigationMenuLink asChild>
      <motion.div
        className={cn(
          "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-zinc-800/50 focus:bg-zinc-800/50 group cursor-pointer",
          className
        )}
        whileHover={{ x: 4 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <Link href={href || "#"} className="block">
          <div className="flex items-center gap-3 text-sm font-medium leading-none text-white">
            {Icon && (
              <Icon className="h-4 w-4 text-gray-400 group-hover:text-white transition-colors" />
            )}
            <span>{title}</span>
          </div>
          {children && (
            <p className="line-clamp-2 text-sm leading-snug text-zinc-400 group-hover:text-zinc-300 mt-1">
              {children}
            </p>
          )}
        </Link>
      </motion.div>
    </NavigationMenuLink>
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
        className="w-full bg-black/50 backdrop-blur-lg border-b border-white/10"
      >
        <nav className="container mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <Image
                src={logo}
                alt="Orcha Logo"
                width={42}
                height={42}
                className="object-contain"
              />
              <span className="text-xl font-bold text-white">Orcha</span>
            </Link>
          </div>
          <div className="flex-1 flex justify-center">
            <NavigationMenu>
              <NavigationMenuList className="gap-2">
                <NavigationMenuItem>
                  <Link
                    href="/"
                    className="text-sm font-medium text-white/70 hover:text-white transition-colors bg-transparent border-0 hover:bg-transparent focus:bg-transparent px-2 py-1"
                  >
                    Home
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-sm font-medium text-white/70 hover:text-white transition-colors bg-transparent border-0 hover:bg-transparent focus:bg-transparent px-2 py-1">
                    {/* <LayoutGrid className="h-4 w-4 mr-2" /> */}
                    Products
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="bg-zinc-900 border border-white/10 data-[motion=from-start]:animate-enterFromLeft data-[motion=from-end]:animate-enterFromRight data-[motion=to-start]:animate-exitToLeft data-[motion=to-end]:animate-exitToRight absolute top-0 left-0">
                    <div className="p-4 w-[600px]">
                      <div className="grid grid-cols-2 gap-4">
                        {products.map((item) => (
                          <ListItem
                            key={item.title}
                            title={item.title}
                            href={item.href}
                            // icon={item.icon}
                          >
                            {item.description}
                          </ListItem>
                        ))}
                      </div>
                      {/* <div className="mt-4 pt-4 border-t border-white/10">
                        <div className="mb-2 text-sm font-medium text-white/70">Channels</div>
                        <div className="grid grid-cols-2 gap-4">
                          {channels.map((channel) => (
                            <Link 
                              key={channel.title}
                              href={channel.href}
                              className="flex items-center gap-4 p-3 rounded-md hover:bg-zinc-800/50 transition-colors group"
                            >
                              <Image
                                src={channel.image}
                                alt={`${channel.title} logo`}
                                width={24}
                                height={24}
                                className="w-6 h-6"
                              />
                              <div>
                                <div className="text-sm font-medium text-white group-hover:text-white/90">{channel.title}</div>
                                <div className="text-xs text-white/70 group-hover:text-white/80">{channel.description}</div>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div> */}
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                {/* 
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-sm font-medium text-white/70 hover:text-white transition-colors bg-transparent border-0 hover:bg-transparent focus:bg-transparent">
                    Resources
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="bg-zinc-900 border border-white/10 data-[motion=from-start]:animate-enterFromLeft data-[motion=from-end]:animate-enterFromRight data-[motion=to-start]:animate-exitToLeft data-[motion=to-end]:animate-exitToRight absolute top-0 left-0">
                    <div className="p-4 w-[400px]">
                      <ul className="grid gap-3">
                        {resources.map((item) => (
                          <li key={item.title}>
                            <ListItem
                              title={item.title}
                              href={item.href}
                            >
                              {item.description}
                            </ListItem>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem> */}

                {/* <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-sm font-medium text-white/70 hover:text-white transition-colors bg-transparent border-0 hover:bg-transparent focus:bg-transparent">
                    Developers
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="bg-zinc-900 border border-white/10 data-[motion=from-start]:animate-enterFromLeft data-[motion=from-end]:animate-enterFromRight data-[motion=to-start]:animate-exitToLeft data-[motion=to-end]:animate-exitToRight absolute top-0 left-0">
                    <div className="p-4 w-[400px]">
                      <ul className="grid gap-3">
                        {developers.map((item) => (
                          <li key={item.title}>
                            <ListItem
                              title={item.title}
                              href={item.href}
                              // icon={item.icon}
                            >
                              {item.description}
                            </ListItem>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem> */}

                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-sm font-medium text-white/70 hover:text-white transition-colors bg-transparent border-0 hover:bg-transparent focus:bg-transparent px-2 py-1">
                    {/* <Building2 className="h-4 w-4 mr-2" /> */}
                    Company
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="bg-zinc-900 border border-white/10 data-[motion=from-start]:animate-enterFromLeft data-[motion=from-end]:animate-enterFromRight data-[motion=to-start]:animate-exitToLeft data-[motion=to-end]:animate-exitToRight absolute top-0 left-0">
                    <div className="p-4 w-[400px]">
                      <ul className="grid gap-3">
                        {companyItems.map((item) => (
                          <li key={item.title}>
                            <ListItem
                              title={item.title}
                              href={item.href}
                              // icon={item.icon}
                            >
                              {item.description}
                            </ListItem>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {/* <NavigationMenuItem>
                  <PricingDrawer />
                </NavigationMenuItem> */}
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
        </nav>
      </motion.header>
    </div>
  );
}
