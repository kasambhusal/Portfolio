'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

const countries = [
  { name: "Nepal",          file: "nepal" },
  { name: "Singapore",      file: "singapore" },
  { name: "India",          file: "india" },
  { name: "United Kingdom", file: "uk" },
];

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

  const opacity = useTransform(
    scrollYProgress,
    [start, start + section * 0.25, end - section * 0.25, end],
    [0, 1, 1, 0]
  );
  const rawY = useTransform(scrollYProgress, [start, end], ['6px', '-6px']);
  const y    = useSpring(rawY, { stiffness: 180, damping: 30, mass: 0.6 });
  const scale = useTransform(scrollYProgress, [start, mid, end], [0.94, 1, 0.94]);

  return (
    <motion.span
      style={{
        opacity, y, scale,
        display: 'inline-block',
        position: 'absolute',
        left: 0, top: 0,
        whiteSpace: 'nowrap',
      }}
      aria-hidden={index !== 0}
    >
      {country}
    </motion.span>
  );
};

interface FlagBgProps {
  file: string;
  index: number;
  total: number;
  scrollYProgress: ReturnType<typeof useScroll>['scrollYProgress'];
}

const FlagBg = ({ file, index, total, scrollYProgress }: FlagBgProps) => {
  const section = 1 / total;
  const start   = index * section;
  const end     = start + section;

  // Keep image very subtle — the pill is the legibility solution
  const opacity = useTransform(
    scrollYProgress,
    [start, start + section * 0.18, end - section * 0.18, end],
    [0, 0.18, 0.18, 0]
  );

  return (
    <motion.div
      aria-hidden
      style={{
        opacity,
        position: 'absolute',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
      }}
    >
      <picture style={{ display: 'contents' }}>
        <source media="(max-width: 767px)" srcSet={`/countries/small/${file}.png`} />
        <source media="(min-width: 768px)"  srcSet={`/countries/large/${file}.png`} />
        <img
          src={`/countries/large/${file}.png`}
          alt={`Flag of ${file}`}
          aria-hidden
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
            display: 'block',
            // Desaturate + very slightly darken so any image reads as atmosphere
            filter: 'saturate(0.65) brightness(0.95)',
            transform: 'scale(1.04)', // slight oversize prevents edge bleed
          }}
        />
      </picture>
    </motion.div>
  );
};

const Countries = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start center', 'end center'],
  });

  return (
    <div
      ref={containerRef}
      style={{ height: `${countries.length * 60}vh` }}
      className="relative w-full"
    >
      <div className="sticky top-0 h-screen flex items-center justify-center select-none overflow-hidden">

        {/* Flag backgrounds — very low opacity, atmosphere only */}
        {countries.map(({ file }, i) => (
          <FlagBg
            key={file}
            file={file}
            index={i}
            total={countries.length}
            scrollYProgress={scrollYProgress}
          />
        ))}

        {/*
         * Frosted glass pill — the professional solution for text-over-image.
         * backdrop-filter blurs whatever is behind the pill (the flag),
         * the semi-transparent white fill lightens it further,
         * the hairline white border adds definition.
         * Text is always crisp and legible regardless of image content.
         */}
        <div
          className="relative z-10 flex flex-wrap items-baseline justify-center gap-x-[0.3em] gap-y-1 pointer-events-none"
          style={{
            padding: '20px 40px 24px',
            borderRadius: '999px',
            background: 'rgba(255, 255, 255, 0.62)',
            backdropFilter: 'blur(20px) saturate(1.5)',
            WebkitBackdropFilter: 'blur(20px) saturate(1.5)',
            border: '0.5px solid rgba(255, 255, 255, 0.9)',
            boxShadow: '0 2px 32px rgba(0,0,0,0.06), inset 0 0.5px 0 rgba(255,255,255,0.8)',
          }}
        >
          <span
            className="font-normal italic"
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: 'clamp(1.1rem, 2.8vw, 2rem)',
              color: '#94a3b8',
              whiteSpace: 'nowrap',
            }}
          >
            Worked with clients&nbsp;across&nbsp;
          </span>

          {/* Country name slot */}
          <span
            className="relative inline-block"
            style={{
              minWidth: '7ch',
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: 'clamp(1.1rem, 2.8vw, 2rem)',
              fontWeight: 700,
              color: '#0f172a',
            }}
          >
            {/* Invisible spacer keeps pill width stable */}
            <span aria-hidden className="opacity-0 pointer-events-none" style={{ whiteSpace: 'nowrap' }}>
              United Kingdom
            </span>

            {countries.map(({ name }, i) => (
              <CountryWord
                key={name}
                country={name}
                index={i}
                total={countries.length}
                scrollYProgress={scrollYProgress}
              />
            ))}
          </span>

          <span
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: 'clamp(1.1rem, 2.8vw, 2rem)',
              color: '#94a3b8',
              fontWeight: 400,
            }}
          >
            .
          </span>
        </div>
      </div>
    </div>
  );
};

export default Countries;