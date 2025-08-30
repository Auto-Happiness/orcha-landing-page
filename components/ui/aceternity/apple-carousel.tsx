"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import useEmblaCarousel from "embla-carousel-react";
import embLogo from "@/assets/emb-logo.png";

interface Card {
  id: number;
  title: string;
  category?: string;
  description: string;
  image: string;
  logo?: string;
}

export const AppleCarousel = ({ items }: { items: Card[] }) => {
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: true,
    align: "center",
    containScroll: false
  });

  const scrollPrev = useCallback(() => {
    if (emblaApi) {
      emblaApi.scrollPrev();
    }
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) {
      emblaApi.scrollNext();
    }
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setActiveIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);

    // Auto-slide every 5 seconds
    const interval = setInterval(() => {
      if (emblaApi) {
        emblaApi.scrollNext();
      }
    }, 5000);

    return () => {
      clearInterval(interval);
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <div className="relative w-full">
      <div ref={emblaRef} className="overflow-hidden">
        <div className="flex py-10 gap-4 px-4 md:py-5">
          {items.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="relative flex-shrink-0 w-full"
              style={{ flex: '0 0 100%' }}
            >
              <div
                data-card
                onClick={() => setActiveCard(activeCard === item.id ? null : item.id)}
                className="group relative h-[25rem] w-[52rem] overflow-hidden rounded-xl bg-neutral-200 cursor-pointer mx-auto flex flex-col justify-center items-center"
              >
                <div className="absolute inset-0 z-10 bg-black/40 transition-colors group-hover:bg-black/30" />
                <img
                  src={item.image}
                  alt={item.description}
                  className="absolute inset-0 h-full w-full object-cover blur-sm scale-105 z-0"
                />
                {item.id === 1 ? (
                  <div className="relative z-20 flex flex-col items-center justify-center h-full w-full px-8">
                    {/* Icon at top center */}
                    <div className="mb-4 mt-8">
                      <img src={item.logo || embLogo.src} alt="EMB Logo" width={80} height={80} className="mx-auto rounded-xl bg-black/40 p-2" />
                    </div>
                    {/* Compressed description */}
                    <div className="flex-2 flex items-center justify-center w-full">
                      <p className="text-lg md:text-x2 font-semibold text-white text-center leading-tight drop-shadow-lg max-w-2xl mx-auto">
                        {item.description}
                      </p>
                    </div>
                    {/* Title at bottom, small italic */}
                    <div className="mt-4 mb-4 w-full flex justify-center">
                      <span className="text-base italic text-green-200 text-center drop-shadow-md">{item.title}</span>
                    </div>
                  </div>
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 z-20">
                    <h3 className="mt-2 text-3xl font-semibold text-white">{item.title}</h3>
                    <p className="text-white/80 mt-2 line-clamp-2">{item.description}</p>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-12">
        {/* Navigation Dots */}
        <div className="flex gap-3">
          {items.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                if (emblaApi) {
                  emblaApi.scrollTo(index);
                }
              }}
              className={cn(
                "w-3 h-3 rounded-full transition-all cursor-pointer border-2 border-white",
                index === activeIndex ? "bg-white w-6" : "bg-white/50"
              )}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}; 