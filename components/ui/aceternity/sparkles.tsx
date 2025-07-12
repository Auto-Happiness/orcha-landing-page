"use client";
import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export const SparklesCore = (props: {
  background?: string;
  minSize?: number;
  maxSize?: number;
  particleDensity?: number;
  className?: string;
  particleColor?: string;
}) => {
  const {
    background = "transparent",
    minSize = 0.4,
    maxSize = 1,
    particleDensity = 10,
    className,
    particleColor = "#FFF",
  } = props;
  const [particles, setParticles] = useState<Array<any>>([]);

  useEffect(() => {
    const particleCount = Math.floor((window.innerWidth * particleDensity) / 100);
    const newParticles = [];

    for (let i = 0; i < particleCount; i++) {
      const particle = {
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * (maxSize - minSize) + minSize,
      };
      newParticles.push(particle);
    }

    setParticles(newParticles);
  }, [maxSize, minSize, particleDensity]);

  return (
    <div
      className={cn(
        "h-full w-full absolute inset-0 pointer-events-none",
        className
      )}
      style={{
        background: background,
      }}
    >
      {particles.map((particle, i) => (
        <div
          key={i}
          className="absolute rounded-full pointer-events-none"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            background: particleColor,
            transform: "translate(-50%, -50%)",
          }}
        />
      ))}
    </div>
  );
}; 