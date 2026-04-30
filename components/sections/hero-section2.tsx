"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { StatsSection } from "./stats-section";

const SERVICES = [
  "Web App Development",
  "Mobile App Development",
  "AI Automation",
  "Computer Vision",
  "Chatbot Integration",
  "Graphics Designing",
  "SEO",
  "Social Media Marketing",
];

function RevealLine({ delay = 0 }: { delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div ref={ref} className="w-full h-px bg-border/40 overflow-hidden my-16 sm:my-24 relative">
      <motion.div
        initial={{ x: "-100%" }}
        whileInView={{ x: "100%" }}
        viewport={{ once: true }}
        transition={{ delay, duration: 1.5, ease: "easeInOut" }}
        className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-primary/50 to-transparent"
      />
    </div>
  );
}

function CircularCarousel() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const items = SERVICES.length;
  const anglePerItem = (360 / items) * (Math.PI / 180);

  return (
    <div ref={containerRef} className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-background">
      {/* Background gradients */}
      <div className="absolute inset-0 pointer-events-none -z-10 flex items-center justify-center opacity-30">
        <div className="w-[800px] h-[800px] bg-secondary/10 blur-[150px] rounded-full absolute -top-40 -left-40" />
        <div className="w-[600px] h-[600px] bg-primary/5 blur-[120px] rounded-full absolute bottom-0 right-0" />
      </div>

      {/* Central circle - viewport indicator */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="relative w-[280px] h-[280px] sm:w-[360px] sm:h-[360px]">
          {/* Outer circle */}
          <div className="absolute inset-0 rounded-full border-2 border-border/40 bg-gradient-to-b from-background/50 to-background/20 backdrop-blur-sm" />

          {/* Inner label */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              {/* <h2 className="text-lg sm:text-2xl font-bold text-foreground/70 tracking-tight">My</h2> */}
              <h2 className="text-xl sm:text-3xl font-bold text-gradient tracking-tight">Services</h2>
            </div>
          </div>
        </div>
      </div>

      {/* Carousel items in circular motion */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 1200 800"
        preserveAspectRatio="xMidYMid meet"
      >
        {SERVICES.map((service, index) => {
          const angle = anglePerItem * index;
          const radius = 280; // Distance from center
          const x = 600 + radius * Math.cos(angle - Math.PI / 2);
          const y = 400 + radius * Math.sin(angle - Math.PI / 2);

          return (
            <g key={index}>
              <foreignObject x={x - 120} y={y - 35} width="240" height="70">
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="h-full flex items-center justify-center"
                >
                  <CarouselItem service={service} progress={scrollYProgress} index={index} />
                </motion.div>
              </foreignObject>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

function CarouselItem({
  service,
  progress,
  index,
}: {
  service: string;
  progress: any;
  index: number;
}) {
  const items = SERVICES.length;
  const itemProgress = useTransform(progress, [0, 1], [0, items]);

  const opacity = useTransform(itemProgress, (latest) => {
    const distance = Math.abs(latest - index);
    if (distance > 1) return 0.3;
    return 1 - distance * 0.3;
  });

  const scale = useTransform(itemProgress, (latest) => {
    const distance = Math.abs(latest - index);
    if (distance > 1) return 0.85;
    return 1 - distance * 0.15;
  });

  const y = useTransform(itemProgress, (latest) => {
    const distance = latest - index;
    return Math.sin(distance * Math.PI) * 15;
  });

  return (
    <motion.div
      style={{ opacity, scale, y }}
      className="px-4 py-3 rounded-lg border border-border/50 bg-card/90 shadow-lg hover:shadow-xl transition-shadow duration-300 whitespace-nowrap text-sm sm:text-base font-semibold text-foreground text-center"
    >
      {service}
    </motion.div>
  );
}

export function HeroSection2() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section ref={sectionRef} className="relative bg-background overflow-hidden z-10">
      <CircularCarousel />

      <div className="relative max-w-6xl mx-auto px-5 sm:px-8 py-20 sm:py-20">



      </div>
    </section>
  );
}
