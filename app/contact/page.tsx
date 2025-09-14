"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Phone, MapPin, Send, Github, Linkedin } from "lucide-react"
import { Footer } from "@/components/footer"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        toast({
          title: "Message Sent!",
          description: "Thank you for reaching out. I'll get back to you soon.",
        })
        setFormData({ name: "", email: "", message: "" })
      } else {
        throw new Error("Failed to send message")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again or contact me directly.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "developerkasam@gmail.com",
      href: "mailto:developerkasam@gmail.com",
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+977 9860555866",
      href: "tel:+9779860555866",
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Nepal",
      href: null,
    },
  ]

  const socialLinks = [
    {
      icon: Github,
      label: "GitHub",
      href: "https://github.com/kasam",
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      href: "https://linkedin.com/in/kasambhusal",
    },
    {
      icon: Mail,
      label: "Email",
      href: "mailto:developerkasam@gmail.com",
    },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-background via-background to-muted/20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gradient">Get In Touch</h1>
            <p className="text-lg md:text-xl text-muted-foreground text-pretty">
              Have a project in mind? Want to collaborate? Or just want to say hello? I'd love to hear from you. Let's
              start a conversation.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <Card className="glass dark:glass-dark">
                <CardHeader>
                  <CardTitle className="text-2xl">Send Me a Message</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                        placeholder="Your full name"
                        disabled={loading}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                        placeholder="your.email@example.com"
                        disabled={loading}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Message *</Label>
                      <Textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        required
                        rows={6}
                        placeholder="Tell me about your project or just say hello..."
                        disabled={loading}
                      />
                    </div>

                    <Button type="submit" size="lg" className="w-full" disabled={loading}>
                      {loading ? (
                        "Sending..."
                      ) : (
                        <>
                          <Send className="w-4 h-4 mr-2" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Contact Info */}
              <div className="space-y-8">
                <Card className="glass dark:glass-dark">
                  <CardHeader>
                    <CardTitle className="text-2xl">Contact Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {contactInfo.map((info, index) => {
                      const Icon = info.icon
                      const content = (
                        <div className="flex items-center gap-4">
                          <div className="p-3 bg-accent/10 rounded-lg">
                            <Icon className="w-5 h-5 text-accent" />
                          </div>
                          <div>
                            <div className="font-medium">{info.label}</div>
                            <div className="text-muted-foreground">{info.value}</div>
                          </div>
                        </div>
                      )

                      return info.href ? (
                        <a
                          key={index}
                          href={info.href}
                          className="block hover:scale-105 transition-transform duration-300"
                        >
                          {content}
                        </a>
                      ) : (
                        <div key={index}>{content}</div>
                      )
                    })}
                  </CardContent>
                </Card>

                <Card className="glass dark:glass-dark">
                  <CardHeader>
                    <CardTitle className="text-2xl">Follow Me</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex gap-4">
                      {socialLinks.map((social, index) => {
                        const Icon = social.icon
                        return (
                          <Link
                            key={index}
                            href={social.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-3 rounded-full glass dark:glass-dark hover:scale-110 transition-all duration-300"
                          >
                            <Icon className="w-5 h-5" />
                            <span className="sr-only">{social.label}</span>
                          </Link>
                        )
                      })}
                    </div>
                  </CardContent>
                </Card>

                <Card className="glass dark:glass-dark">
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-3">Quick Response</h3>
                    <p className="text-muted-foreground text-sm text-pretty">
                      I typically respond to messages within 24 hours. For urgent matters, feel free to reach out
                      directly via phone or email.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
