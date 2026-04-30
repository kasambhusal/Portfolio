'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

const countries = ["Nepal", "Singapore", "India", "United Kingdom"];

// ─── Per-country animated word ────────────────────────────────────────────────
// Hooks must live at the top level of a component, so we isolate each country.
interface CountryWordProps {
  country: string;
  index: number;
  total: number;
  scrollYProgress: ReturnType<typeof useScroll>['scrollYProgress'];
}

const CountryWord = ({ country, index, total, scrollYProgress }: CountryWordProps) => {
  const section = 1 / total;
  const start   = index * section;
  const end     = start + section;
  const mid     = start + section / 2;

  // Fade: invisible → visible → invisible
  const opacity = useTransform(
    scrollYProgress,
    [start, start + section * 0.25, end - section * 0.25, end],
    [0, 1, 1, 0]
  );

  // Subtle vertical drift
  const rawY = useTransform(scrollYProgress, [start, end], ['6px', '-6px']);
  const y    = useSpring(rawY, { stiffness: 180, damping: 30, mass: 0.6 });

  // Very subtle scale pulse
  const scale = useTransform(scrollYProgress, [start, mid, end], [0.94, 1, 0.94]);

  return (
    <motion.span
      style={{ opacity, y, scale, display: 'inline-block', position: 'absolute', left: 0, top: 0 }}
      aria-hidden={index !== 0}
    >
      {country}
    </motion.span>
  );
};

// ─── Main component ───────────────────────────────────────────────────────────
const Countries = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start center', 'end center'],
  });

  return (
    /*
     * Scroll driver: each country gets 60 vh of scroll travel.
     * The sentence itself stays compact — only the scroll-height drives the
     * animation, not the visual height.
     */
    <div
      ref={containerRef}
      style={{ height: `${countries.length * 60}vh` }}
      className="relative w-full"
    >
      {/* Sticky sentence — stays centred in the viewport while the user scrolls */}
      <div className="sticky top-0 h-screen flex items-center justify-center pointer-events-none select-none">
        <p
          className="flex flex-wrap items-baseline gap-x-[0.35em] gap-y-1
                     text-2xl sm:text-3xl md:text-4xl lg:text-5xl
                     font-semibold text-slate-800 px-6 text-center leading-tight"
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
        >
          <span className="text-slate-400 font-normal italic">Worked with clients&nbsp;across</span>

          {/* Fixed-width slot so the sentence doesn't jump as country names vary */}
          <span
            className="relative inline-block text-slate-900"
            style={{ minWidth: '9ch' }}  /* wide enough for "United Kingdom" proportionally */
          >
            {/* Invisible spacer keeps layout stable */}
            <span aria-hidden className="opacity-0 pointer-events-none">
              United Kingdom
            </span>

            {countries.map((country, i) => (
              <CountryWord
                key={country}
                country={country}
                index={i}
                total={countries.length}
                scrollYProgress={scrollYProgress}
              />
            ))}
          </span>

          <span className="text-slate-400 font-normal">.</span>
        </p>
      </div>
    </div>
  );
};

export default Countries;