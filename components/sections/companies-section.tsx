"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

interface Company {
  id: number;
  name: string;
  image_url: string;
  alt_text: string;
  website_link?: string;
}

// ─── Keyframes injected once, no external CSS file needed ────────────────────
const MARQUEE_CSS = `
  @keyframes marquee-left {
    from { transform: translateX(0); }
    to   { transform: translateX(-33.333%); }
  }
  @keyframes marquee-right {
    from { transform: translateX(-33.333%); }
    to   { transform: translateX(0); }
  }
`;

function getResponsiveSrc(src: string) {
  // External images → return as-is
  if (src.startsWith("http")) return src;

  // Remove .webp
  const base = src.replace(".webp", "");

  // Default to 168 (best balance)
  return `${base}-168.webp`;
}

function useInjectStyles(css: string) {
  useEffect(() => {
    const id = "marquee-keyframes";
    if (document.getElementById(id)) return;
    const el = document.createElement("style");
    el.id = id;
    el.textContent = css;
    document.head.appendChild(el);
    return () => { el.remove(); };
  }, [css]);
}

// ─── Logo card ────────────────────────────────────────────────────────────────
function LogoCard({ company }: { company: Company }) {
  return (
    <a
      href={company.website_link || "#"}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Visit ${company.name}`}
      className="
        group relative flex-shrink-0 flex flex-col items-center justify-center
        w-36 h-24 sm:w-48 sm:h-30 mx-2.5
        
        bg-card/40 backdrop-blur-sm
        transition-all duration-300 ease-out
        
        hover:shadow-[0_4px_24px_-6px_hsl(var(--primary)/0.15)]
        hover:-translate-y-1
        overflow-hidden
      "
    >
      

      {/* Logo */}
      <div className="
        relative z-10 flex items-center justify-center
        w-full px-5 h-12 sm:h-14
        transition-transform duration-300 ease-out
        group-hover:-translate-y-3
      ">
        <Image
  src={getResponsiveSrc(company.image_url)}
  alt={company.alt_text}
  width={168}
  height={84}
  sizes="(max-width: 640px) 84px, 120px"
  className="
    max-h-full w-auto object-contain
    opacity-40 grayscale
    group-hover:opacity-100 group-hover:grayscale-0
    transition-all duration-300
  "
/>
      </div>

      {/* Name slides up */}
      <span className="
        absolute bottom-3 z-10
        text-[10px] sm:text-xs font-medium tracking-wide
        text-foreground/70 text-center px-3 leading-tight
        opacity-0 translate-y-2
        group-hover:opacity-100 group-hover:translate-y-0
        transition-all duration-300 ease-out
        line-clamp-2
      ">
        {company.name}
      </span>
    </a>
  );
}

// ─── Marquee row ──────────────────────────────────────────────────────────────
function MarqueeRow({
  companies,
  direction = "left",
  durationSec = 40,
}: {
  companies: Company[];
  direction?: "left" | "right";
  durationSec?: number;
}) {
  const [paused, setPaused] = useState(false);
  const items = [...companies, ...companies, ...companies];

  return (
    <div
      className="relative flex overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Fade masks blend with page background */}
      <div className="pointer-events-none absolute left-0 inset-y-0 z-10 w-16 sm:w-28
                       bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute right-0 inset-y-0 z-10 w-16 sm:w-28
                       bg-gradient-to-l from-background to-transparent" />

      <div
        className="flex items-center py-2"
        style={{
          animation: `marquee-${direction} ${durationSec}s linear infinite`,
          animationPlayState: paused ? "paused" : "running",
          willChange: "transform",
        }}
      >
        {items.map((company, i) => (
          <LogoCard key={`${company.id}-${i}`} company={company} />
        ))}
      </div>
    </div>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────
export function CompaniesSection() {
  useInjectStyles(MARQUEE_CSS);

  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/data/companies.json");
        if (res.ok) setCompanies(await res.json());
      } catch (e) {
        console.error("Failed to fetch companies:", e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading || companies.length === 0) return null;

  const half = Math.ceil(companies.length / 2);
  const row1 = companies.slice(0, half);
  const row2 = companies.slice(half);

  return (
    <section className="relative py-24 overflow-hidden">

      {/* Ambient glow using your primary color */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                         w-[600px] h-[300px] bg-primary/5 blur-[100px] rounded-full" />
      </div>

      {/* Heading */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-14 max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >

            <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight lg:whitespace-nowrap">
  Trusted by Amazing Institutions
</h2>

            <p className="text-base text-muted-foreground leading-relaxed">
              I&apos;ve had the privilege to work with and contribute to these
              incredible Companies and Organizations.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Full-bleed marquee */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.15 }}
        className="flex flex-col gap-4 sm:gap-6 relative z-10"
      >
        <MarqueeRow companies={row1} direction="left"  durationSec={38} />
        <MarqueeRow companies={row2} direction="right" durationSec={30} />
      </motion.div>

      
    </section>
  );
}
