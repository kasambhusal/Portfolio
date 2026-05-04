"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { Moon, Sun, Menu, X, Home, Briefcase, BookOpen, Cpu, User, Mail, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";

const navItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/projects", label: "Projects", icon: Briefcase },
  { href: "/blogs", label: "Blogs", icon: BookOpen },
  { href: "/skills", label: "Skills", icon: Cpu },
  { href: "/about", label: "About", icon: User },
  { href: "/contact", label: "Contact", icon: Mail },
];

export function Navbar() {
  const [showFloatingNav, setShowFloatingNav] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      const show = window.scrollY > window.innerHeight - 100;
      setShowFloatingNav(show);
      if (window.scrollY < 100) setIsMenuOpen(false);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close on route change
  useEffect(() => { setIsMenuOpen(false); }, [pathname]);

  return (
    <LayoutGroup>
      {/* MOBILE */}
      <div className="md:hidden">
        <MobileNav />
      </div>

      {/* DESKTOP */}
      <div className="hidden md:block">
        {/* Static top nav (before scroll) */}
        <div className="absolute top-0 left-0 right-0 z-40 h-[80px] px-12 flex justify-between items-center">
          <Logo />
          <div className="flex items-center gap-2 p-1.5 rounded-full backdrop-blur-md border border-white/10 shadow-sm">
            {navItems.map((item) => (
              <NavLink key={item.href} item={item} isActive={pathname === item.href} />
            ))}
          </div>
          <ThemeToggle />
        </div>

        {/* Floating capsule + iOS panel */}
        <AnimatePresence>
          {showFloatingNav && (
            <motion.div
              initial={{ y: -80, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -80, opacity: 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              className="fixed top-3 left-1/2 -translate-x-1/2 z-50"
            >
              {/* The capsule */}
              <div className="flex items-center gap-2.5 px-1 py-1 rounded-full backdrop-blur-xl bg-white/8 border border-white/15 shadow-2xl shadow-black/30">
                {/* <ThemeToggle />
                <div className="w-px h-5 bg-white/15" /> */}
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className={cn(
                    "flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold transition-all duration-200",
                    isMenuOpen
                      ? "text-foreground"
                      : "text-foreground hover:scale-105"
                  )}
                >
                  <AnimatePresence mode="wait">
                    {isMenuOpen ? (
                      <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                        <X className="w-3.5 h-3.5" />
                      </motion.div>
                    ) : (
                      <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
                        <Menu className="w-3.5 h-3.5" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                  {isMenuOpen ? "Close" : "Menu"}
                </button>
              </div>

              {/* iOS-style panel — springs out below capsule, centered */}
              <AnimatePresence>
                {isMenuOpen && (
                  <>
                    {/* Tap outside to close */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="fixed inset-0 -z-10"
                      onClick={() => setIsMenuOpen(false)}
                    />

                    <motion.div
                      initial={{ opacity: 0, scale: 0.75, y: -10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.75, y: -10 }}
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 26,
                        mass: 0.8,
                      }}
                      style={{ transformOrigin: "top center" }}
                      className="absolute top-[calc(100%+10px)] left-1/2 -translate-x-1/2 w-72
                        rounded-2xl overflow-hidden
                        bg-white/70 dark:bg-zinc-900/80
                        backdrop-blur-3xl
                        border border-white/40 dark:border-white/10
                        shadow-2xl shadow-black/25"
                    >
                      {/* 2-column nav grid */}
                      <div className="grid grid-cols-2 gap-1 p-2">
                        {navItems.map((item, i) => {
                          const Icon = item.icon;
                          const isActive = pathname === item.href;
                          return (
                            <Link
                              key={item.href}
                              href={item.href}
                              onClick={() => setIsMenuOpen(false)}
                            >
                              <motion.div
                                initial={{ opacity: 0, x: 6 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.035, duration: 0.18 }}
                                className={cn(
                                  "flex items-center gap-2.5 px-3 py-2.5 rounded-xl transition-colors",
                                  isActive
                                    ? "bg-primary/15 dark:bg-primary/20"
                                    : "hover:bg-black/5 dark:hover:bg-white/8 active:bg-black/10"
                                )}
                              >
                                <Icon className={cn(
                                  "w-4 h-4 shrink-0",
                                  isActive ? "text-primary" : "text-muted-foreground"
                                )} />
                                <span className={cn(
                                  "text-sm",
                                  isActive ? "font-semibold text-primary" : "font-medium text-foreground"
                                )}>
                                  {item.label}
                                </span>
                              </motion.div>
                            </Link>
                          );
                        })}
                      </div>

                      {/* Separator */}
                      <div className="h-px bg-black/8 dark:bg-white/8 mx-0" />

                      {/* Appearance row */}
                      <div className="flex items-center justify-between px-4 py-2.5">
                        <span className="text-xs font-medium tracking-widest text-muted-foreground uppercase">
                          Appearance
                        </span>
                        <ThemeToggle />
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </LayoutGroup>
  );
}

// --- SUB-COMPONENTS (unchanged) ---

function NavLink({ item, isActive, onClick }: { item: any; isActive: boolean; onClick?: () => void }) {
  return (
    <Link href={item.href} onClick={onClick}>
      <div className={cn(
        "relative px-5 py-2 rounded-full text-sm font-medium transition-colors duration-300",
        isActive ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground"
      )}>
        {isActive && (
          <motion.div
            layoutId="activePill"
            className="absolute inset-0 bg-primary rounded-full z-0"
            transition={{ type: "spring", stiffness: 380, damping: 30 }}
          />
        )}
        <span className="relative z-10">{item.label}</span>
      </div>
    </Link>
  );
}

function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  return (
    <motion.button
      whileTap={{ scale: 0.9 }}
      aria-label="Toggle theme"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="relative w-9 h-9 flex items-center justify-center rounded-full bg-secondary/50 border border-border overflow-hidden group shadow-sm cursor-pointer"
    >
      <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      <AnimatePresence mode="wait">
        {theme === "dark" ? (
          <motion.div key="moon" initial={{ y: 20, opacity: 0, rotate: 45 }} animate={{ y: 0, opacity: 1, rotate: 0 }} exit={{ y: -20, opacity: 0, rotate: -45 }} transition={{ duration: 0.2 }}>
            <Moon className="w-4 h-4 text-blue-400" />
          </motion.div>
        ) : (
          <motion.div key="sun" initial={{ y: 20, opacity: 0, rotate: 45 }} animate={{ y: 0, opacity: 1, rotate: 0 }} exit={{ y: -20, opacity: 0, rotate: -45 }} transition={{ duration: 0.2 }}>
            <Sun className="w-4 h-4 text-orange-500" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
}

function Logo() {
  return (
    <Link href="/" className="text-2xl font-black tracking-tighter">
      K<span className="text-primary">B</span>.
    </Link>
  );
}

// iOS-style Mobile Nav (unchanged from previous)
function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const mainItems = navItems.slice(0, 5);
  const lastItem = navItems[5];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-5 py-4 flex justify-between items-center">
      <Logo />
      <div className="relative">
        <motion.button
          aria-label="Toggle mobile menu"
          onClick={() => setIsOpen(!isOpen)}
          whileTap={{ scale: 0.88 }}
          className="relative z-20 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-xl border border-white/20 shadow-lg"
        >
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                <X className="w-4 h-4" />
              </motion.div>
            ) : (
              <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
                <Menu className="w-4 h-4" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>

        <AnimatePresence>
          {isOpen && (
            <>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />
              <motion.div
                initial={{ opacity: 0, scale: 0.7, y: -8 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.7, y: -8 }}
                transition={{ type: "spring", stiffness: 400, damping: 28, mass: 0.8 }}
                style={{ transformOrigin: "top right" }}
                className="absolute right-0 top-12 z-20 w-52 rounded-2xl overflow-hidden bg-white/70 dark:bg-zinc-900/75 backdrop-blur-2xl border border-white/40 dark:border-white/10 shadow-2xl shadow-black/20"
              >
                <div className="p-1.5">
                  {mainItems.map((item, i) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href;
                    return (
                      <Link key={item.href} href={item.href} onClick={() => setIsOpen(false)}>
                        <motion.div
                          initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04, duration: 0.2 }}
                          className={cn("flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors", isActive ? "bg-primary/15 dark:bg-primary/20" : "hover:bg-black/5 dark:hover:bg-white/8")}
                        >
                          <Icon className={cn("w-4 h-4 shrink-0", isActive ? "text-primary" : "text-muted-foreground")} />
                          <span className={cn("text-sm flex-1", isActive ? "font-semibold text-primary" : "font-medium text-foreground")}>{item.label}</span>
                          <ChevronRight className={cn("w-3.5 h-3.5 shrink-0", isActive ? "text-primary/60" : "text-muted-foreground/40")} />
                        </motion.div>
                      </Link>
                    );
                  })}
                </div>
                <div className="h-px bg-black/8 dark:bg-white/8" />
                <div className="p-1.5">
                  <Link href={lastItem.href} onClick={() => setIsOpen(false)}>
                    <motion.div initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: mainItems.length * 0.04, duration: 0.2 }}
                      className={cn("flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors", pathname === lastItem.href ? "bg-primary/15" : "hover:bg-black/5 dark:hover:bg-white/8")}
                    >
                      <Mail className={cn("w-4 h-4 shrink-0", pathname === lastItem.href ? "text-primary" : "text-muted-foreground")} />
                      <span className={cn("text-sm flex-1", pathname === lastItem.href ? "font-semibold text-primary" : "font-medium text-foreground")}>{lastItem.label}</span>
                      <ChevronRight className={cn("w-3.5 h-3.5 shrink-0", pathname === lastItem.href ? "text-primary/60" : "text-muted-foreground/40")} />
                    </motion.div>
                  </Link>
                </div>
                <div className="h-px bg-black/8 dark:bg-white/8" />
                <div className="p-1.5">
                  <div className="flex items-center justify-between px-3 py-2">
                    <span className="text-sm font-medium text-muted-foreground">Appearance</span>
                    <ThemeToggle />
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}