"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "./button";
import { X } from "lucide-react";

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem("orcha_cookie_consent");
    if (!consent) {
      // Delay appearance slightly for better UX
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("orcha_cookie_consent", "accepted");
    setIsVisible(false);
  };

  const handleReject = () => {
    localStorage.setItem("orcha_cookie_consent", "rejected");
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="fixed bottom-6 left-6 right-6 z-[100] md:left-auto md:max-w-md"
        >
          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/90 p-6 shadow-2xl backdrop-blur-xl">
            {/* Background elements */}
            <div className="absolute -top-10 -right-10 h-32 w-32 rounded-full bg-purple-600/10 blur-2xl" />
            
            <div className="relative z-10">
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-lg font-semibold text-white">We value your privacy</h3>
                <button 
                  onClick={() => setIsVisible(false)}
                  className="text-zinc-500 hover:text-white transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
              
              <p className="text-sm text-zinc-400 mb-6 leading-relaxed">
                We use cookies to improve your browsing experience, serve personalized content, and analyze our traffic. 
                By clicking "Accept All", you consent to our use of cookies. Read our{" "}
                <Link href="/cookie-policy" className="text-purple-400 hover:underline">
                  Cookie Policy
                </Link>{" "}
                for details.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3">
                <Button 
                  onClick={handleAccept}
                  className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:opacity-90 border-0 flex-1"
                >
                  Accept All
                </Button>
                <Button 
                  onClick={handleReject}
                  variant="outline"
                  className="border-white/10 text-white bg-white/5 hover:bg-white/10 flex-1"
                >
                  Reject Optional
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
