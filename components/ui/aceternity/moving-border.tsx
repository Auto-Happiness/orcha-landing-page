"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export const MovingBorder = ({
  children,
  duration = 2000,
  rx = "20%",
  className,
}: {
  children: React.ReactNode;
  duration?: number;
  rx?: string;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "relative flex h-fit w-fit items-center justify-center",
        className
      )}
    >
      <motion.div
        initial={{ scale: 0.8 }}
        animate={{
          scale: 1,
          transition: {
            duration: duration / 1000,
            repeat: Infinity,
            repeatType: "reverse",
          },
        }}
      >
        <div className="absolute inset-0 h-full w-full">
          <div className="h-full w-full rounded-[30%] border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.05)] px-4 py-2 backdrop-blur-xl" />
        </div>
      </motion.div>

      {children}
    </div>
  );
}; 