"use client";

import { useEffect, useRef, useState, Suspense } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Download, Github, Linkedin, Mail, Terminal } from "lucide-react";
import Link from "next/link";
import {
  motion,
  useScroll,
  useTransform,
  useMotionTemplate,
  useMotionValue,
  AnimatePresence,
} from "framer-motion";
import { cn } from "@/lib/utils";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

/* -------------------- Typewriter -------------------- */

function Typewriter({ words, delay = 3000 }: { words: string[]; delay?: number }) {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);
  const [blink, setBlink] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setBlink((b) => !b), 500);
    return () => clearTimeout(t);
  }, [blink]);

  useEffect(() => {
    if (subIndex === words[index].length + 1 && !reverse) {
      const t = setTimeout(() => setReverse(true), delay);
      return () => clearTimeout(t);
    }
    if (subIndex === 0 && reverse) {
      setReverse(false);
      setIndex((i) => (i + 1) % words.length);
      return;
    }
    const t = setTimeout(
      () => setSubIndex((i) => i + (reverse ? -1 : 1)),
      reverse ? 70 : 140
    );
    return () => clearTimeout(t);
  }, [subIndex, index, reverse, words, delay]);

  return (
    <span className="inline-block min-w-[200px] text-left">
      {words[index].substring(0, subIndex)}
      <span
        className={cn(
          "ml-1 inline-block w-[2px] h-[1em] bg-primary align-middle transition-opacity",
          blink ? "opacity-100" : "opacity-0"
        )}
      />
    </span>
  );
}

/* -------------------- R3F Particle Field -------------------- */

function ParticleField() {
  const ref = useRef<THREE.Points>(null!);
  const count = 2800;

  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 18;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 18;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
  }

  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.y = clock.getElapsedTime() * 0.04;
      ref.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.03) * 0.08;
    }
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#8b5cf6"
        size={0.03}
        sizeAttenuation
        depthWrite={false}
        opacity={0.7}
      />
    </Points>
  );
}

/* -------------------- Floating Service Tag -------------------- */

const services = [
  { label: "Software Development", icon: "⌨️", delay: 0 },
  { label: "SEO", icon: "🔍", delay: 0.3 },
  { label: "Graphics Designing", icon: "🎨", delay: 0.6 },
  { label: "Social Media Marketing", icon: "📣", delay: 0.9 },
  { label: "AI Automation", icon: "🤖", delay: 1.2 },
];

// Fixed positions so they don't overlap or go offscreen
const tagPositions = [
  { top: "14%", left: "3%" },
  { top: "28%", right: "3%" },
  { top: "55%", left: "2%" },
  { top: "68%", right: "3%" },
  { bottom: "18%", left: "3%" },
];

function FloatingTag({
  label,
  icon,
  delay,
  position,
}: {
  label: string;
  icon: string;
  delay: number;
  position: Partial<Record<string, string>>;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.7, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: 1 + delay, duration: 0.5, ease: "easeOut" }}
      style={position}
      className="absolute hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full
        border border-primary/20 bg-background/60 backdrop-blur-md
        text-xs font-medium text-foreground/80 shadow-lg shadow-purple-500/10
        cursor-default select-none z-30"
    >
      <motion.span
        animate={{ rotate: [0, -10, 10, 0] }}
        transition={{ repeat: Infinity, repeatDelay: 3, duration: 0.5, delay: delay + 2 }}
      >
        {icon}
      </motion.span>
      {label}
      <motion.span
        animate={{ scale: [1, 1.4, 1], opacity: [0.4, 1, 0.4] }}
        transition={{ repeat: Infinity, duration: 2, delay: delay }}
        className="ml-1 w-1.5 h-1.5 rounded-full bg-primary inline-block"
      />
    </motion.div>
  );
}

/* -------------------- Grid + Spotlight Background -------------------- */

function GridBackground() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const opacity = useMotionValue(0);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      opacity.set(1);
    };
    const onLeave = () => opacity.set(0);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
    };
  }, [mouseX, mouseY, opacity]);

  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:32px_32px]" />
      <motion.div
        className="pointer-events-none absolute inset-0"
        style={{
          opacity,
          background: useMotionTemplate`radial-gradient(700px circle at ${mouseX}px ${mouseY}px, rgba(139,92,246,0.13), transparent 65%)`,
        }}
      />
      <div className="absolute -top-1/4 -left-1/4 w-[500px] h-[500px] bg-purple-600/10 blur-[120px] rounded-full" />
      <div className="absolute -bottom-1/4 -right-1/4 w-[600px] h-[600px] bg-blue-600/10 blur-[120px] rounded-full" />
    </div>
  );
}

/* -------------------- Hero 1 -------------------- */

export function HeroSection1() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 300], [0, 80]);
  const y2 = useTransform(scrollY, [0, 300], [0, -80]);
  const canvasOpacity = useTransform(scrollY, [0, 400], [1, 0]);

  return (
    <section className="relative min-h-screen mt-[-78px] flex items-center justify-center overflow-hidden pb-[30px] sm:pb-0 pt-[50px] sm:pt-[85px]">
      <GridBackground />

      {/* R3F Particle Canvas */}
      <motion.div
        style={{ opacity: canvasOpacity }}
        className="absolute inset-0 -z-10"
      >
        <Canvas camera={{ position: [0, 0, 5], fov: 60 }} gl={{ antialias: false, alpha: true }}>
          <Suspense fallback={null}>
            <ParticleField />
          </Suspense>
        </Canvas>
      </motion.div>

      {/* Floating service tags */}
      {services.map((s, i) => (
        <FloatingTag key={s.label} {...s} position={tagPositions[i]} />
      ))}

      {/* Main content */}
      <div className="relative z-20 container mx-auto px-4 pt-20">
        <div className="max-w-5xl mx-auto text-center">

         

         <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.7 }}
            className="text-4xl md:text-7xl lg:text-8xl font-bold mb-6"
          >
            Hi, I&apos;m{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-br from-foreground to-accent">    Mr. Kasam
            </span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="h-14 mb-6 flex justify-center"
          >
            <h2 className="text-xl md:text-3xl text-muted-foreground">
              a{" "}
              <span className="text-foreground font-semibold">
                <Typewriter
                  words={[
                    "Global Freelancer",
                    "Patient Learner",
                    "Problem Solver",
                    "Grounded Thinker",
                    "ML Enthusiast",
                    "Thoughtful Leader",
                    "Passionate Debater",
                  ]}
                />
              </span>
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.6 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12"
          >
            Helping businesses worldwide grow, scale, and innovate through technology.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link href="/projects">
              <Button size="lg" className="rounded-full px-8" aria-label="View my projects">
                View My Works <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="https://drive.google.com/file/d/1JBhHA5e-SUnCsh6mW3B-L9HgRv_mS3aQ/view?usp=sharing" passHref>
              <Button variant="outline" size="lg" className="rounded-full px-8" aria-label="Download my resume">
                <Download className="mr-2 h-4 w-4" /> Resume
              </Button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="mt-16 flex justify-center gap-6"
          >
            {[
              { href: "mailto:developerkasam@gmail.com", icon: <Mail className="h-6 w-6" />, label: "Email" },
              { href: "https://github.com/kasambhusal", icon: <Github className="h-6 w-6" />, label: "GitHub" },
              { href: "https://www.linkedin.com/in/kasam-bhusal/", icon: <Linkedin className="h-6 w-6" />, label: "LinkedIn" },
            ].map((s) => (
              <motion.a
                key={s.label}
                whileHover={{ scale: 1.2, color: "hsl(var(--primary))" }}
                className="text-muted-foreground transition-colors"
                href={s.href}
                target={s.href.startsWith("mailto") ? undefined : "_blank"}
                aria-label={s.label}
              >
                {s.icon}
              </motion.a>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Decorations */}
      {/* <motion.div style={{ y: y1 }} className="absolute top-1/4 left-20 opacity-20 pointer-events-none hidden sm:block">
        <Terminal className="w-24 h-24 text-primary" />
      </motion.div>
      <motion.div style={{ y: y2 }} className="absolute bottom-1/4 right-20 opacity-20 pointer-events-none hidden sm:block">
        <div className="w-16 h-16 border-4 border-dashed border-purple-500 rounded-full animate-spin-slow" />
      </motion.div> */}
    </section>
  );
}