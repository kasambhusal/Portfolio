"use client"

import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Phone, MapPin, Send, Github, Linkedin, Loader2, Sparkles } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" })
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        toast({
          title: "Message Sent! 🚀",
          description: "Got it! I'll dive into your message and get back to you soon.",
        })
        setFormData({ name: "", email: "", message: "" })
      } else {
        throw new Error("Failed")
      }
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: "Couldn't send the message. Maybe try a direct email?",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.1, duration: 0.5 } }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Modern Hero with Glow */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-primary/5 blur-[120px] rounded-full -z-10" />
        <div className="container mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-mono mb-6 border border-primary/20">
              <Sparkles className="w-3 h-3" />
              AVAILABLE FOR NEW OPPORTUNITIES
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight">
              Let's build <span className="text-primary italic">together.</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Have a question or a brilliant idea? I’m all ears. 
              Drop a message below and let’s start something amazing.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="pb-24">
        <div className="container mx-auto px-4">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12"
          >
            {/* Contact Form Card */}
            <motion.div variants={containerVariants}>
              <Card className="border-primary/10 bg-card/50 backdrop-blur-xl shadow-2xl">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold">Send a Message</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-sm font-medium">Full Name</Label>
                      <Input
                        id="name"
                        className="bg-background/50 border-primary/10 focus:border-primary/50 transition-all h-12"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                        placeholder="John Doe"
                        disabled={loading}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-sm font-medium">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        className="bg-background/50 border-primary/10 focus:border-primary/50 transition-all h-12"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                        placeholder="john@example.com"
                        disabled={loading}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="message" className="text-sm font-medium">How can I help?</Label>
                      <Textarea
                        id="message"
                        className="bg-background/50 border-primary/10 focus:border-primary/50 transition-all resize-none"
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        required
                        rows={5}
                        placeholder="Tell me about your project..."
                        disabled={loading}
                      />
                    </div>
                    <Button 
                      type="submit" 
                      size="lg" 
                      aria-label="Send message"
                      className="w-full h-12 rounded-xl text-lg font-bold shadow-lg shadow-primary/20 transition-all hover:scale-[1.02] active:scale-[0.98]" 
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5 mr-2" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            {/* Sidebar Info */}
            <div className="flex flex-col gap-6">
              <motion.div variants={containerVariants} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
                {[
                  { icon: Mail, label: "Email", val: "developerkasam@gmail.com", href: "mailto:developerkasam@gmail.com" },
                  { icon: Phone, label: "Phone", val: "+977 9860555866", href: "tel:+9779860555866" },
                  { icon: MapPin, label: "Based in", val: "Nepal / Remote", href: null },
                ].map((item, i) => (
                  <Card key={i} className="border-none bg-primary/30 backdrop-blur-sm group transition-colors">
                    <CardContent className="p-6 flex items-center gap-4">
                      <div className="p-3 bg-primary/10 rounded-2xl text-primary group-hover:scale-110 transition-transform">
                        <item.icon className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="text-xs font-mono text-muted-foreground uppercase">{item.label}</p>
                        {item.href ? (
                          <a href={item.href} aria-label={`Read more about ${item.label}`} className="font-bold hover:text-primary transition-colors">{item.val}</a>
                        ) : (
                          <p className="font-bold">{item.val}</p>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </motion.div>

              <motion.div variants={containerVariants}>
                <Card className="border-none bg-primary/5 overflow-hidden relative">
                  <div className="absolute top-0 right-0 p-4 opacity-10">
                    <Github className="w-24 h-24" />
                  </div>
                  <CardContent className="p-8">
                    <h3 className="text-xl font-bold mb-4">Let's Connect</h3>
                    <div className="flex gap-4">
                      {[
                        { icon: Github, href: "https://github.com/kasambhusal" },
                        { icon: Linkedin, href: "https://www.linkedin.com/in/kasam-bhusal/" },
                        { icon: Mail, href: "mailto:developerkasam@gmail.com" },
                      ].map((social, i) => (
                        <Link 
                          key={i} 
                          href={social.href} 
                          target="_blank"
                          className="w-12 h-12 flex items-center justify-center rounded-xl bg-background border border-primary/10 hover:border-primary hover:text-primary transition-all shadow-sm"
                        >
                          <social.icon className="w-5 h-5" />
                        </Link>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}