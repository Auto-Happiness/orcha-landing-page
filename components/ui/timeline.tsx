"use client";

import React from "react";
import { motion } from "framer-motion";

interface TimelineItem {
  title: string;
  content: React.ReactNode;
}

interface TimelineProps {
  data: TimelineItem[];
}

export function Timeline({ data }: TimelineProps) {
  return (
    <div className="w-full">
      {data.map((item, index) => (
        <div key={index} className="relative">
          {/* Line */}
          <div
            className={`absolute left-8 top-0 h-full w-[2px] bg-gradient-to-b ${
              index === 0
                ? "from-transparent via-zinc-800 to-zinc-800"
                : index === data.length - 1
                ? "from-zinc-800 via-zinc-800 to-transparent"
                : "from-zinc-800 via-zinc-800 to-zinc-800"
            }`}
          />

          {/* Content */}
          <div className="grid grid-cols-[4rem_1fr] gap-8 py-16">
            {/* Year */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative"
            >
              {/* Circle */}
              <div className="absolute left-[calc(2rem-6px)] top-1 h-3 w-3 rounded-full bg-zinc-800 ring-4 ring-black" />
              <p className="text-xl font-semibold text-white">{item.title}</p>
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              {item.content}
            </motion.div>
          </div>
        </div>
      ))}
    </div>
  );
} 