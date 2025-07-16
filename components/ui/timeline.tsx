"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface TimelineItem {
  title: string;
  content: React.ReactNode;
}

interface TimelineProps {
  data: TimelineItem[];
}

export function Timeline({ data }: TimelineProps) {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [ref]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.9", "end 0.25"],
  });

  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div
      className="relative w-full"
      ref={containerRef}
    >
      <div ref={ref} className="relative max-w-7xl mx-auto">
        {/* Animated Line */}
        <div className="absolute left-8 top-0 w-[2px] h-full">
          {/* Background line */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-zinc-800 to-transparent w-full" />
          
          {/* Animated overlay */}
          <motion.div
            style={{ scaleY, transformOrigin: "top" }}
            className="absolute inset-0 w-full bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500"
          />
        </div>

        {/* Timeline Items */}
        {data.map((item, index) => {
          // Calculate when this item should light up
          const itemProgress = useTransform(
            scrollYProgress,
            [index / data.length, (index + 1) / data.length],
            [0, 1]
          );

          return (
            <div key={index} className="relative">
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
                  <motion.div 
                    className="absolute left-[calc(2rem-6px)] top-1 h-3 w-3 rounded-full bg-zinc-800 ring-4 ring-black"
                    style={{
                      background: useTransform(
                        itemProgress,
                        [0, 1],
                        ["rgb(39, 39, 42)", "linear-gradient(135deg, #60a5fa, #c084fc, #ec4899)"]
                      ),
                      boxShadow: useTransform(
                        itemProgress,
                        [0, 1],
                        ["none", "0 0 20px rgba(236, 72, 153, 0.5)"]
                      )
                    }}
                  />
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
          );
        })}
      </div>
    </div>
  );
} 