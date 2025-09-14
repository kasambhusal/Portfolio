"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Download, Github, Linkedin, Mail } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FadeIn } from "@/components/animations/fade-in";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-muted/20" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(139,92,246,0.1),transparent_50%)]" />

      <motion.div
        className="absolute top-20 left-10 w-20 h-20 bg-accent/10 rounded-full blur-xl"
        animate={{
          y: [0, -20, 0],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-32 h-32 bg-secondary/10 rounded-full blur-xl"
        animate={{
          y: [0, 20, 0],
          opacity: [0.2, 0.5, 0.2],
        }}
        transition={{
          duration: 5,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: 1,
        }}
      />
      <motion.div
        className="absolute top-1/2 left-1/4 w-16 h-16 bg-primary/5 rounded-full blur-lg"
        animate={{
          y: [0, -15, 0],
          x: [0, 10, 0],
        }}
        transition={{
          duration: 3,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: 0.5,
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <FadeIn delay={0.2}>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-balance">
                <span className="text-gradient">Kasam Bhusal</span>
              </h1>
            </FadeIn>
            <FadeIn delay={0.4}>
              <h2 className="text-xl md:text-2xl lg:text-3xl font-medium text-muted-foreground mb-6 text-balance">
                Full Stack Developer & ML Enthusiast
              </h2>
            </FadeIn>
            <FadeIn delay={0.6}>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
                Passionate about building innovative solutions that bridge
                technology and human connection. Specializing in modern web
                development and machine learning applications.
              </p>
            </FadeIn>
          </div>

          <FadeIn delay={0.8}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link href="/projects">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <Button size="lg" className="group">
                    View My Work
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </motion.div>
              </Link>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <Button
                  variant="outline"
                  size="lg"
                  className="group bg-transparent"
                >
                  <a
                    href="https://drive.google.com/file/d/1CV5EshAT_HuJhHA0F2hp_eGgJEIS6jTP/view?usp=sharing"
                    target="_blank"
                    className="flex items-center"
                  >
                    <Download className="mr-2 h-4 w-4 transition-transform group-hover:scale-110" />
                    Download Resume
                  </a>
                </Button>
              </motion.div>
            </div>
          </FadeIn>

          <motion.div
            className="flex justify-center gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
          >
            {[
              {
                href: "mailto:developerkasam@gmail.com",
                icon: Mail,
                label: "Email",
              },
              {
                href: "https://github.com/kasambhusal",
                icon: Github,
                label: "GitHub",
              },
              {
                href: "https://www.linkedin.com/in/kasam-bhusal/",
                icon: Linkedin,
                label: "LinkedIn",
              },
            ].map((social, index) => (
              <motion.div
                key={social.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 1.2 + index * 0.1 }}
                whileHover={{
                  scale: 1.1,
                  rotate: 5,
                  transition: { type: "spring", stiffness: 400, damping: 17 },
                }}
                whileTap={{ scale: 0.9 }}
              >
                <Link
                  href={social.href}
                  className="p-3 rounded-full glass dark:glass-dark transition-all duration-300"
                  target={social.href.startsWith("http") ? "_blank" : undefined}
                  rel={
                    social.href.startsWith("http")
                      ? "noopener noreferrer"
                      : undefined
                  }
                >
                  <social.icon className="h-5 w-5" />
                  <span className="sr-only">{social.label}</span>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{
          duration: 2,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
      >
        <div className="w-6 h-10 border-2 border-muted-foreground/30 rounded-full flex justify-center">
          <motion.div
            className="w-1 h-3 bg-muted-foreground/50 rounded-full mt-2"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{
              duration: 1.5,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
        </div>
      </motion.div>
    </section>
  );
}
