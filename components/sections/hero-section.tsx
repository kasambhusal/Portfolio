"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Download, Github, Linkedin, Mail, Terminal } from "lucide-react";
import Link from "next/link";
import {
  motion,
  useScroll,
  useTransform,
  useMotionTemplate,
  useMotionValue,
} from "framer-motion";
import { cn } from "@/lib/utils";

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
    <span className="inline-block min-w-[140px] text-left">
      {words[index].substring(0, subIndex)}
      <span
        className={cn(
          "ml-1 inline-block w-[2px] h-[1em] bg-primary align-middle",
          blink ? "opacity-100" : "opacity-0"
        )}
      />
    </span>
  );
}

/* -------------------- Grid Background -------------------- */

function GridBackground() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const opacity = useMotionValue(0);

  useEffect(() => {
    function handleMouseMove(e: MouseEvent) {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      opacity.set(1);
    }

    function handleMouseLeave() {
      opacity.set(0);
    }

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [mouseX, mouseY, opacity]);

  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      {/* Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:32px_32px]" />

      {/* Spotlight */}
      <motion.div
        className="pointer-events-none absolute inset-0"
        style={{
          opacity,
          background: useMotionTemplate`
            radial-gradient(
              700px circle at ${mouseX}px ${mouseY}px,
              rgba(139,92,246,0.15),
              transparent 65%
            )
          `,
          maskImage: `
            linear-gradient(
              to bottom,
              black 0%,
              black 18%,
              transparent 30%,
              transparent 70%,
              black 82%,
              black 100%
            )
          `,
          WebkitMaskImage: `
            linear-gradient(
              to bottom,
              black 0%,
              black 18%,
              transparent 30%,
              transparent 70%,
              black 82%,
              black 100%
            )
          `,
        }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      />

      {/* Ambient glow */}
      <div className="absolute -top-1/4 -left-1/4 w-[500px] h-[500px] bg-purple-600/10 blur-[120px] rounded-full" />
      <div className="absolute -bottom-1/4 -right-1/4 w-[600px] h-[600px] bg-blue-600/10 blur-[120px] rounded-full" />
    </div>
  );
}


/* -------------------- Hero Section -------------------- */

export function HeroSection() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 300], [0, 100]);
  const y2 = useTransform(scrollY, [0, 300], [0, -100]);

  return (
    <section className="relative min-h-screen mt-[-78px] flex items-center justify-center overflow-hidden pb-[30px] sm:pb-0 pt-[50px] sm:pt-[85px]">
      <GridBackground />

      {/* CONTENT */}
      <div className="relative z-20 container mx-auto px-4 pt-20">
        <div className="max-w-5xl mx-auto text-center">

          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-secondary/30 px-4 py-1.5 text-sm backdrop-blur-md"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
            </span>
            Available for new opportunities
          </motion.div>

          <h1 className="text-4xl md:text-7xl lg:text-8xl font-bold mb-6">
            Hi, I&apos;m{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-600">
              Kasam Bhusal
            </span>
          </h1>

          <div className="h-14 mb-6 flex justify-center">
            <h2 className="text-xl md:text-3xl text-muted-foreground">
              a{" "}
              <span className="text-foreground font-semibold">
                <Typewriter
                words={[
                  "Patient Learner",
                  "Problem Solver",
                  "Grounded Thinker",
                  "Machine Learning Enthusiast",
                  "Thoughtful Leader",
                  "Passionate Debater",
                ]}
/>

              </span>
            </h2>
          </div>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12">
            I enjoy building with purpose, learning from peers, and creating
            tools that genuinely help communities.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/projects">
              <Button size="lg" className="rounded-full px-8">
                View My Work <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>

            <Link href="https://drive.google.com/file/d/16L8X2Hr8sekMDqw7YnRrlFjJ-SLkEG_0/view" passHref>

              <Button variant="outline" size="lg" className="rounded-full px-8">
                <Download className="mr-2 h-4 w-4" /> Resume
              </Button>
            </Link>

          </div>

          <div className="mt-16 flex justify-center gap-6">
              <motion.a
                whileHover={{ scale: 1.2 }}
                className="text-muted-foreground hover:text-primary"
                href="mailto:developerkasam@gmail.com"
              >
                <Mail className="h-6 w-6" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.2 }}
                target="_blank"
                className="text-muted-foreground hover:text-primary"
                href="https://github.com/kasambhusal"
              >
                <Github className="h-6 w-6" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.2 }}
                target="_blank"
                className="text-muted-foreground hover:text-primary"
                href="https://www.linkedin.com/in/kasam-bhusal/"
              >
                <Linkedin className="h-6 w-6" />
              </motion.a>
          </div>
        </div>
      </div>

      {/* Decorations */}
      <motion.div style={{ y: y1 }} className="absolute top-1/4 left-20 opacity-20 pointer-events-none hidden sm:block">
        <Terminal className="w-24 h-24 text-primary" />
      </motion.div>

      <motion.div style={{ y: y2 }} className="absolute bottom-1/4 right-20 opacity-20 pointer-events-none hidden sm:block">
        <div className="w-16 h-16 border-4 border-dashed border-purple-500 rounded-full animate-spin-slow" />
      </motion.div>
    </section>
  );
}
