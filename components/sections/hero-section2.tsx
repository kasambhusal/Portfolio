'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const SERVICES = [
  {
    name: 'Web App',
    bullets: ['Business Websites', 'Full-stack Apps', 'Complex platforms'],
    hi: [0],
  },
  {
    name: 'Mobile App',
    bullets: ['Cross-platform', 'Modern UI', 'Advanced Features'],
    hi: [0],
  },
  {
    name: 'AI Automation',
    bullets: ['Workflow Automation', 'WhatsApp · Instagram', 'Messenger Bots'],
    hi: [0, 1],
  },
  {
    name: 'Chatbot Integration',
    bullets: ['LLM-powered', 'Platform Embed', 'Precise Answers'],
    hi: [0],
  },
  {
    name: 'Graphics Designing',
    bullets: ['Logo & Brand', 'Banners', 'UI / UX'],
    hi: [2],
  },
  {
    name: 'SEO',
    bullets: ['Niche SEO', 'Social Pages', 'Technical Audit'],
    hi: [0],
  },
  {
    name: 'Computer Vision',
    bullets: ['Detection', 'Recognition', 'Real-time CV'],
    hi: [0],
  },
  {
    name: 'Social Media Marketing',
    bullets: ['Meta & Google Ads', 'AI Video Creation', 'Brand Clips'],
    hi: [1, 2],
  },
] as const;

const N = SERVICES.length;

// ─── Left progress rail ───────────────────────────────────────────────────────
function Rail({ active }: { active: number }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 w-[52px] shrink-0 py-8 border-r border-border">
      {SERVICES.map((_, i) => (
        <motion.div
          key={i}
          className="w-[3px] rounded-full"
          animate={{
            height: i === active ? 24 : 3,
            backgroundColor:
              i === active
                ? 'var(--secondary)'   // electric teal
                : 'var(--border)',
          }}
          transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
        />
      ))}
    </div>
  );
}

// ─── Single service frame ─────────────────────────────────────────────────────
interface FrameProps {
  service: (typeof SERVICES)[number];
  index: number;
  isActive: boolean;
}

function ServiceFrame({ service, index, isActive }: FrameProps) {
  return (
    <motion.div
      className="absolute inset-0 flex flex-col justify-center px-10 sm:px-14 overflow-hidden"
      animate={{ opacity: isActive ? 1 : 0 }}
      transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
      style={{ pointerEvents: isActive ? 'auto' : 'none' }}
    >
      {/* Subtle radial teal glow behind content */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{ opacity: isActive ? 1 : 0 }}
        transition={{ duration: 0.8 }}
        style={{
          background:
            'radial-gradient(ellipse 60% 60% at 40% 50%, color-mix(in oklch, var(--secondary) 8%, transparent), transparent)',
        }}
      />

      

      <div className="relative z-10">
        {/* Index label */}
        <motion.p
          className="font-mono text-[11px] tracking-[0.18em] mb-4"
          style={{ color: 'var(--secondary)' }}
          animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 8 }}
          transition={{ duration: 0.5 }}
        >
          {String(index + 1).padStart(2, '0')}&nbsp;&nbsp;—&nbsp;&nbsp;Service
        </motion.p>

        {/* Service name — clip-reveal */}
        <div className="overflow-hidden">
          <motion.h2
            className="font-serif leading-[1.05] tracking-tight text-foreground"
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: 'clamp(1.9rem, 5.5vw, 4.4rem)',
              fontWeight: 700,
            }}
            animate={{ y: isActive ? '0%' : '110%' }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          >
            {service.name}
          </motion.h2>
        </div>

        {/* Bullet pills */}
        <motion.div
          className="flex flex-wrap gap-2 mt-5"
          animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 10 }}
          transition={{ duration: 0.55, delay: 0.12 }}
        >
          {service.bullets.map((b, j) => {
            const isHighlight = (service.hi as readonly number[]).includes(j);
            return (
              <span
                key={b}
                className="font-mono text-[11px] tracking-[0.12em] uppercase px-3 py-[5px] rounded-full border"
                style={
                  isHighlight
                    ? {
                        borderColor: 'color-mix(in oklch, var(--secondary) 45%, transparent)',
                        color: 'var(--secondary)',
                        background: 'color-mix(in oklch, var(--secondary) 8%, transparent)',
                      }
                    : {
                        borderColor: 'var(--border)',
                        color: 'var(--muted-foreground)',
                        background: 'var(--card)',
                      }
                }
              >
                {b}
              </span>
            );
          })}
        </motion.div>
      </div>

    </motion.div>
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────
export function HeroSection2() {
  const driverRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const driver = driverRef.current;
    if (!driver) return;

    function onScroll() {
      const rect = driver!.getBoundingClientRect();
      const scrolled = -rect.top;
      const scrollable = driver!.offsetHeight - window.innerHeight;
      if (scrollable <= 0) return;
      const p = Math.max(0, Math.min(1, scrolled / scrollable));
      const idx = Math.min(N - 1, Math.floor(p * N));
      setActive(idx);
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      ref={driverRef}
      style={{ height: `${N * 60}vh` }}
      className="relative w-full"
    >
      <div className="sticky top-0 h-screen flex overflow-hidden bg-background">

        <Rail active={active} />

        {/* Stage */}
        <div className="relative flex-1">
          {/* Top-right label */}
          <span
            className="absolute top-15 left-[40vw] text-4xl md:text-5xl font-bold mb-6 tracking-tight"
          >
            What I offer
          </span>

          {/* Bottom-right counter */}
          <span
            className="absolute bottom-7 right-10 font-mono text-[11px] tracking-[0.1em] text-muted-foreground"
          >
            <span className="text-foreground font-medium">
              {String(active + 1).padStart(2, '0')}
            </span>
            &nbsp;/&nbsp;{String(N).padStart(2, '0')}
          </span>

          {/* Frames */}
          {SERVICES.map((s, i) => (
            <ServiceFrame
              key={s.name}
              service={s}
              index={i}
              isActive={i === active}
            />
          ))}
        </div>

      </div>
    </div>
  );
}