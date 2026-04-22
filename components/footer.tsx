"use client"

import Link from "next/link"
import { Github, Linkedin, Mail, Phone, ArrowUpRight } from "lucide-react"
import { motion } from "framer-motion"

export function Footer() {

  return (
    <footer className="relative bg-background pt-24 pb-12 overflow-hidden border-t border-white/5">
      {/* Ambient Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center text-center mb-20">
          
          
          <motion.div
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Link 
              href="https://calendly.com/mrkasam/30min"
              target="_blank"
              className="group relative inline-flex items-center gap-2 text-3xl hover:text-primary transition-colors duration-300 text-3xl md:text-6xl font-bold tracking-tighter mb-8 bg-gradient-to-b from-foreground to-muted-foreground bg-clip-text text-transparent"
            >
              Schedule a Meet
              <ArrowUpRight className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
              <div className="absolute -bottom-2 left-0 w-0 h-px bg-primary group-hover:w-full transition-all duration-500" />
            </Link>
          </motion.div>
          <p className="text-muted-foreground">I&apos;d be more than happy to talk to you</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 border-t border-white/5 pt-12">
          {/* Brand & Bio */}
          <div className="md:col-span-5 space-y-6">
            <h3 className="text-2xl font-bold tracking-tight">Mr. Kasam</h3>
            <p className="text-muted-foreground text-base max-w-sm leading-relaxed">
              Full Stack Developer and ML Enthusiast building digital products with 
              precision and purpose. Based in Nepal, working worldwide.
            </p>
            <div className="flex gap-3">
              {[
                { icon: Github, href: "https://github.com/kasambhusal" },
                { icon: Linkedin, href: "https://www.linkedin.com/in/kasam-bhusal/" },
                { icon: Mail, href: "mailto:developerkasam@gmail.com" }
              ].map((social, i) => (
                <Link
                  key={i}
                  href={social.href}
                  aria-label={`Visit my ${social.href.includes("github") ? "GitHub" : social.href.includes("linkedin") ? "LinkedIn" : "email"} profile`}
                  target="_blank"
                  className="p-3 rounded-xl bg-muted/20 border border-white/5 hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                >
                  <social.icon className="h-5 w-5" />
                </Link>
              ))}
            </div>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-3">
            <h4 className="text-sm font-bold uppercase tracking-widest mb-6 text-foreground/50">Navigation</h4>
            <ul className="space-y-4">
              {["Projects", "Blogs", "Skills", "About"].map((item) => (
                <li key={item}>
                  <Link 
                    href={`/${item.toLowerCase()}`} 
                    className="group flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <span className="w-0 group-hover:w-4 h-px bg-primary transition-all duration-300" />
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div className="md:col-span-4">
            <h4 className="text-sm font-bold uppercase tracking-widest mb-6 text-foreground/50">Get in Touch</h4>
            <div className="space-y-4 text-muted-foreground">
              <p className="hover:text-foreground transition-colors cursor-pointer flex items-center gap-3">
                <Phone className="h-4 w-4 text-primary" /> +977 9743492229
              </p>
               <Link 
              href="mailto:developerkasam@gmail.com"
              className="hover:text-foreground transition-colors cursor-pointer flex items-center gap-3"
            >
              <Mail className="h-4 w-4 text-primary"/>
              developerkasam@gmail.com

            </Link>
              <p className="flex items-start gap-3">
                <span className="h-4 w-4 mt-1 rounded-full bg-green-500 animate-pulse" />
                Available for new opportunities
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>© 2026 Mr. Kasam.</p>
          <div className="flex gap-8">
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              aria-label="Back to top"
              className="hover:text-foreground transition-colors flex items-center gap-2"
            >
              Back to top ↑
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}