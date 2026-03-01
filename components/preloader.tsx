"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";

const loadingTexts = [
  "Setting things up...",
  "Getting everything ready...",
  "Optimizing your experience...",
  "Finalizing the details...",
  "Connecting to the server..."
];

export default function Preloader() {
  const [textIndex, setTextIndex] = useState(0);
  const [showReloadMsg, setShowReloadMsg] = useState(false);

  useEffect(() => {
    // Cycle through texts every 2 seconds
    const interval = setInterval(() => {
      setTextIndex((prev) => (prev + 1) % loadingTexts.length);
    }, 2000);

    // Show the reload message after 10 seconds
    const timeout = setTimeout(() => {
      setShowReloadMsg(true);
    }, 10000); 

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-background/80 backdrop-blur-xl">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="flex flex-col items-center"
      >
        {/* Huge Logo */}
        <motion.div
          animate={{
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="relative mb-8 flex items-center justify-center"
        >
          {/* Increased width and height significantly, removed the circle wrapper */}
          <Image 
            src="/badge2.webp" 
            alt="Kasam Bhusal Logo" 
            width={250} 
            height={250} 
            className="object-contain drop-shadow-2xl"
            priority
          />
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-xl tracking-[0.3em] text-foreground font-semibold"
        >
          KASAM BHUSAL
        </motion.h1>

        {/* Dynamic loading text */}
        <div className="mt-3 h-6 overflow-hidden flex justify-center">
          <motion.p
            key={textIndex}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="text-xs uppercase tracking-widest text-muted-foreground"
          >
            {loadingTexts[textIndex]}
          </motion.p>
        </div>

        {/* Progress bar */}
        <div className="mt-6 h-1 w-48 overflow-hidden rounded-full bg-secondary">
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

        {/* Conditional Reload Message */}
        {showReloadMsg && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-8 px-4 text-center max-w-xs"
          >
            <p className="text-sm text-muted-foreground">
              This is taking a bit longer than expected. 
              <br />
              <button 
                onClick={() => window.location.reload()} 
                className="mt-2 text-primary hover:underline font-medium focus:outline-none"
              >
                A quick refresh usually does the trick!
              </button>
            </p>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}