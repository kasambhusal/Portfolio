"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Heart, MessageCircle, Sparkles, Phone } from "lucide-react";
import { cn } from "@/lib/utils";

export function WarmWelcome() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // 1. Check if we've already shown this message in this session
    const hasSeenWelcome = sessionStorage.getItem("hasSeenWarmWelcome");

    if (!hasSeenWelcome) {
      // 2. Delay appearance by 4 seconds (let them see the Hero section first)
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 10000);

      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    // Mark as seen for this session
    sessionStorage.setItem("hasSeenWarmWelcome", "true");
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="fixed bottom-4 right-4 z-50 w-[90vw] max-w-md md:bottom-8 md:right-8"
        >
          {/* Glass Card Container */}
          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/80 p-6 shadow-2xl backdrop-blur-md dark:border-white/5 dark:bg-black/60">
            
            {/* Decoration: Subtle Gradient Orb */}
            <div className="absolute -left-10 -top-10 h-32 w-32 rounded-full bg-primary/10 blur-3xl" />
            
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute right-4 top-4 text-muted-foreground cursor-pointer transition-colors hover:text-foreground"
              aria-label="Close welcome message"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="flex gap-4">
              {/* Icon Side */}
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Sparkles className="h-5 w-5" />
              </div>

              {/* Text Side */}
              <div className="space-y-3">
                <h3 className="font-medium leading-none text-foreground">
                  Hope you're having a great day
                </h3>
                
                <p className="text-sm leading-relaxed text-muted-foreground">
                  I'm building this space to learn and serve. If there's any way I can help 
                  with a project or if you just want to chat about making tech more 
                  human-centric, I'm here.
                </p>

                <div className="flex items-center gap-4 pt-1">
                  <a
                    href="mailto:developerkasam@gmail.com"
                    className="group flex items-center text-xs font-medium text-primary transition-colors hover:text-primary/80"
                  >
                    <MessageCircle className="mr-1.5 h-3.5 w-3.5 transition-transform group-hover:scale-110" />
                    Say hello
                  </a>
                  <span className="text-xs text-muted-foreground/50">•</span>
                  <a
                    href="tel:+9779743492229"
                    className="group flex items-center rounded-full px-3 py-1 text-xs font-medium text-secondary transition-colors "
                  >
                    <Phone className="mr-1.5 h-3.5 w-3.5 transition-transform group-hover:scale-110" />
                    Call Me
                  </a>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}