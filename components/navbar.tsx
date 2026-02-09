"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { Moon, Sun, Menu, X, Home, Briefcase, BookOpen, Cpu, User, Mail } from "lucide-react";
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
      // Appear after 100vh
      const show = window.scrollY > window.innerHeight - 100;
      setShowFloatingNav(show);
      if (window.scrollY < 100) setIsMenuOpen(false);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <LayoutGroup>
      {/* 1. MOBILE NAV (Simple) */}
      <div className="md:hidden">
        <MobileNav />
      </div>

      {/* 2. DESKTOP NAV */}
      <div className="hidden md:block">
        {/* INITIAL STATIC NAV */}
        <div className="absolute top-0 left-0 right-0 z-40 h-[80px] px-12 flex justify-between items-center">
          <Logo />
          <div className="flex items-center gap-2 p-1.5 rounded-full backdrop-blur-md border border-white/10 shadow-sm">
            {navItems.map((item) => (
              <NavLink key={item.href} item={item} isActive={pathname === item.href} />
            ))}
          </div>
          <ThemeToggle />
        </div>

        {/* FLOATING CAPSULE (Trigger) */}
        <AnimatePresence>
          {showFloatingNav && !isMenuOpen && (
            <motion.div
              initial={{ y: -100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -100, opacity: 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              className="fixed top-2 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 p-1.5 backdrop-blur-xl border border-border shadow-2xl rounded-full"
            >
              <ThemeToggle />
              <div className="w-[1px] h-6 bg-border mx-1" />
              <Button 
                className="rounded-full w-10 h-10 bg-primary hover:scale-105 transition-transform" 
                aria-label="Open menu"
                size="icon" 
                onClick={() => setIsMenuOpen(true)}
              >
                <Menu className="w-5 h-5 text-primary-foreground" />
              </Button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* PULL-DOWN DRAWER (The "Robot" Pull) */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ y: "-100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "-100%", opacity: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="fixed top-0 left-0 right-0 z-[60] h-[80px]  backdrop-blur-xl border-b border-border shadow-2xl flex items-center"
            >
              <div className="container mx-auto px-12 flex justify-between items-center">
                <Logo />
                {/* 100% SAME AS ORIGINAL NAV */}
                <div className="flex items-center gap-2 p-1.5 rounded-full bg-white/5 border border-white/10 shadow-inner">
                  {navItems.map((item) => (
                    <NavLink 
                      key={item.href} 
                      item={item} 
                      isActive={pathname === item.href} 
                      onClick={() => setIsMenuOpen(false)} 
                    />
                  ))}
                </div>
                <div className="flex items-center gap-4">
                  <ThemeToggle />
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    aria-label="Close menu"
                    className="rounded-full hover:bg-destructive/10 hover:text-destructive transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <X className="w-6 h-6" />
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </LayoutGroup>
  );
}

// --- SUB-COMPONENTS ---

function NavLink({ item, isActive, onClick }: { item: any; isActive: boolean; onClick?: () => void }) {
  return (
    <Link href={item.href} onClick={onClick}>
      <div className={cn(
        "relative px-5 py-2 rounded-full text-sm font-medium transition-colors duration-300",
        isActive ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground"
      )}>
        {isActive && (
          <motion.div
            layoutId="activePill" // Magic: This name links the elements across components
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
      className="relative w-10 h-10 flex items-center justify-center rounded-full bg-secondary/50 border border-border overflow-hidden group shadow-sm cursor-pointer"
    >
      <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      <AnimatePresence mode="wait">
        {theme === "dark" ? (
          <motion.div
            key="moon"
            initial={{ y: 20, opacity: 0, rotate: 45 }}
            animate={{ y: 0, opacity: 1, rotate: 0 }}
            exit={{ y: -20, opacity: 0, rotate: -45 }}
            transition={{ duration: 0.2 }}
          >
            <Moon className="w-5 h-5 text-blue-400" />
          </motion.div>
        ) : (
          <motion.div
            key="sun"
            initial={{ y: 20, opacity: 0, rotate: 45 }}
            animate={{ y: 0, opacity: 1, rotate: 0 }}
            exit={{ y: -20, opacity: 0, rotate: -45 }}
            transition={{ duration: 0.2 }}
          >
            <Sun className="w-5 h-5 text-orange-500" />
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

// Standard Mobile Nav remains simple as requested
function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-lg px-6 py-4 flex justify-between items-center">
      <Logo />
      <Button variant="ghost" size="icon" aria-label="Toggle mobile menu" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <X /> : <Menu />}
      </Button>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 right-0 bg-background border-b border-border p-6 flex flex-col gap-4 shadow-xl"
          >
            {navItems.map(item => (
              <Link key={item.href} href={item.href} onClick={() => setIsOpen(false)} 
                className={cn("text-lg font-medium", pathname === item.href ? "text-primary" : "text-muted-foreground")}>
                {item.label}
              </Link>
            ))}
            <ThemeToggle />
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}