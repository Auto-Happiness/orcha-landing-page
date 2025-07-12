"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import useEmblaCarousel from "embla-carousel-react";

interface Card {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string;
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

    return () => {
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
                className="group relative h-[30rem] w-[70rem] overflow-hidden rounded-xl bg-neutral-200 cursor-pointer mx-auto"
              >
                <div className="absolute inset-0 z-10 bg-black/40 transition-colors group-hover:bg-black/30" />
                <img
                  src={item.image}
                  alt={item.title}
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute bottom-0 left-0 z-20 w-full p-6">
                  <p className="text-sm font-medium text-white mb-2">{item.category}</p>
                  <h3 className="mt-2 text-3xl font-semibold text-white">{item.title}</h3>
                  <p className="text-white/80 mt-2 line-clamp-2">{item.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 flex items-center gap-12">
        <button
          onClick={scrollPrev}
          className="rounded-full bg-white/10 p-4 text-white backdrop-blur-sm transition-colors hover:bg-white/20"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </button>

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
                "w-3 h-3 rounded-full transition-all",
                index === activeIndex ? "bg-white w-6" : "bg-white/50"
              )}
            />
          ))}
        </div>

        <button
          onClick={scrollNext}
          className="rounded-full bg-white/10 p-4 text-white backdrop-blur-sm transition-colors hover:bg-white/20"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </button>
      </div>
    </div>
  );
}; 