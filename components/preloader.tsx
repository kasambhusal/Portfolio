"use client";

import { motion } from "framer-motion";
import { Terminal } from "lucide-react";
import { useEffect, useState } from "react";

const loadingTexts = [
  "Loading…",
  "Compiling ideas",
  "Almost there…",
  "Just a moment more…",
];

export default function Preloader() {
  const [textIndex, setTextIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTextIndex((prev) => (prev + 1) % loadingTexts.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-background/80 backdrop-blur-xl">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="flex flex-col items-center"
      >
        {/* Icon + Rings */}
        <div className="relative mb-10">
          {/* Outer ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className="absolute -inset-10 rounded-full border border-primary/10"
          />

          {/* Inner ring */}
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
            className="absolute -inset-6 rounded-full border border-primary/20"
          />

          {/* Core */}
          <motion.div
            animate={{
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="relative z-10 flex h-20 w-20 items-center justify-center rounded-2xl bg-primary/10 ring-1 ring-white/10 shadow-2xl"
          >
            <Terminal className="h-10 w-10 text-primary" />
          </motion.div>
        </div>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-lg tracking-[0.3em] text-foreground"
        >
          KASAM BHUSAL
        </motion.h1>

        {/* Dynamic loading text */}
        <motion.p
          key={textIndex}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="mt-2 text-xs uppercase tracking-widest text-muted-foreground"
        >
          {loadingTexts[textIndex]}
        </motion.p>

        {/* Progress bar */}
        <div className="mt-6 h-1 w-36 overflow-hidden rounded-full bg-secondary">
          <motion.div
            className="h-full bg-primary"
            animate={{ x: ["-100%", "100%"] }}
            transition={{
              duration: 1.6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>
      </motion.div>
    </div>
  );
}
