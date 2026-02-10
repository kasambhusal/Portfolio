"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Code, Heart, Lightbulb, Users, Rocket, GraduationCap, MapPin } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const journey = [
  {
    title: "The Roots",
    description: "I grew up in southern Nepal, attending a public high school where resources were tight but curiosity was endless. Those early days taught me that you don't need a fancy lab to start dreaming—just a problem to solve.",
    icon: MapPin,
    year: "The Beginning"
  },
  {
    title: "Stepping into the City",
    description: "Moving to the city was a culture shock and a tech shock. I spent months diving into internships, finally seeing how the code I wrote in my room could actually function in the real world.",
    icon: Code,
    year: "Exploration"
  },
  {
    title: "Professional Growth",
    description: "My first real dev role wasn't just about syntax; it was about people. I learned that the best software is built through collaboration and understanding the user's frustration before writing a single line.",
    icon: Rocket,
    year: "Early Career"
  },
  {
    title: "EduSphere: Giving Back",
    description: "I founded EduSphere because I didn't want the next kid from my village to struggle for mentorship. We've built a community that bridges the gap between 'knowing' and 'doing' through internships.",
    icon: Heart,
    year: "Leadership"
  },
  {
    title: "The Global Chapter",
    description: "Now, I'm planning to pursue my further studies in the USA. It’s a huge leap, but my mission remains the same: learn as much as I can to build tools that empower communities back home and across the globe.",
    icon: GraduationCap,
    year: "Current Journey"
  }
];

export default function AboutClientView() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"]
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }} 
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Badge className="mb-4 px-4 py-1 rounded-full bg-primary/10 text-primary border-none text-sm">Hi, I'm Kasam</Badge>
              <h1 className="text-5xl md:text-7xl font-extrabold mb-8 tracking-tighter leading-tight">
                Building for <span className="text-primary italic">People</span>, 
                not just browsers.
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-10">
                I love technology, but I care even more about the person on the other side of the screen. 
                Whether I'm working on a government portal or a midnight hackathon project, I build 
                with empathy and a goal to make life slightly easier for someone, somewhere.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/contact"><Button size="lg" aria-label="Contact me" className="rounded-full px-8">Let's Talk</Button></Link>
                <Link href="/projects"><Button size="lg" variant="ghost" aria-label="View projects" className="rounded-full px-8">View Projects</Button></Link>
              </div>
            </motion.div>

                        <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative flex justify-center items-center"
            >
              {/* The Glowing Aura - This sits behind the image */}
              <div className="absolute w-64 h-64 bg-primary/40 rounded-full blur-[60px] animate-pulse" />
              
              {/* Optional: A second accent color glow for depth */}
              <div className="absolute w-48 h-48 bg-accent/30 rounded-full blur-[40px] -bottom-4 -right-4" />

              {/* The Image Container */}
              <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden z-10">
                <Image 
                  src="/kasam-photo.webp" 
                  alt="Kasam" 
                  fill // Use fill for circular containers
                  className="object-cover transition-transform duration-700 hover:scale-110"
                  priority
                />
              </div>

              {/* Thin Inner Ring (Optional, for that 'high-tech' feel) */}
              <div className="absolute w-[260px] h-[260px] md:w-[325px] md:h-[325px] rounded-full border border-white/10 z-20 pointer-events-none" />
                      </motion.div>
          </div>
        </div>
      </section>

      {/* Journey Section (Animated Branch) */}
      <section className="py-24 relative overflow-hidden bg-muted/20" ref={containerRef}>
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">My Journey</h2>
            <p className="text-muted-foreground">The path that shaped me from southern Nepal to the USA.</p>
          </div>

          <div className="relative">
            {/* The Branch (Line) */}
            <motion.div 
              className="absolute left-[20px] md:left-1/2 top-0 w-[2px] bg-gradient-to-b from-primary via-primary/50 to-transparent origin-top z-0"
              style={{ scaleY, height: '100%' }}
            />

            <div className="space-y-20">
              {journey.map((item, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  className={`relative flex flex-col ${idx % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} items-center gap-8 md:gap-0`}
                >
                  {/* Icon Node */}
                  <div className="absolute left-0 md:left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-background border-2 border-primary flex items-center justify-center z-10 shadow-[0_0_15px_rgba(var(--primary),0.5)]">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>

                  {/* Content Box */}
                  <div className={`w-full md:w-1/2 ${idx % 2 === 0 ? "md:pr-16" : "md:pl-16"} pl-12 md:pl-0`}>
                    <Card className="glass-dark border-primary/10 overflow-hidden hover:border-primary/40 transition-colors">
                      <CardContent className="p-6">
                        <span className="text-xs font-mono text-primary mb-2 block uppercase tracking-widest">{item.year}</span>
                        <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                        <p className="text-muted-foreground leading-relaxed text-sm">
                          {item.description}
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values Section (Poppy & Modern) */}
      <section className="py-24 container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-16 tracking-tight">What Drives Me</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: Code, title: "Clean Craft", text: "Code is temporary, but good architecture stays. I write for the dev who has to read it next." },
            { icon: Users, title: "Radical Empathy", text: "Building is easy. Building the *right* thing requires listening more than talking." },
            { icon: Lightbulb, title: "Curiosity First", text: "I'm not afraid to look stupid while learning something new. That's where growth lives." },
            { icon: Rocket, title: "Impact > Ego", text: "I don't care about fancy titles. I care if the app solved the user's problem." }
          ].map((val, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -10 }}
              className="p-8 rounded-3xl bg-secondary/30 border hover:border-primary/50 transition-all group"
            >
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                <val.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">{val.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{val.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer / CTA */}
      <section className="py-24 text-center">
        <div className="container mx-auto px-6 max-w-2xl">
           <h2 className="text-3xl md:text-5xl font-bold mb-6">Please don't hesitate to contact, I'm always open to everyone.</h2>
         
        </div>
      </section>

    </div>
  );
}

// Utility Helper
const Badge = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${className}`}>
    {children}
  </span>
);