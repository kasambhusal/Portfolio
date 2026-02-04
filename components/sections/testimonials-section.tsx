"use client";

import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star, Quote } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { FadeIn } from "@/components/animations/fade-in";
import { StaggerContainer, StaggerItem } from "@/components/animations/stagger-container";

interface Testimonial {
  id: number;
  name: string;
  designation?: string;
  company?: string;
  image_url?: string;
  description: string;
  rating: number;
}

export function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await fetch("/data/testimonials.json");
        if (response.ok) {
          let data: Testimonial[] = await response.json();
          data = data.sort((a, b) => a.id - b.id);
          setTestimonials(data);
        }
      } catch (error) {
        console.error("Failed to fetch testimonials:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTestimonials();
  }, []);

  const renderStars = (rating: number) =>
    Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-3 h-3 ${i < rating ? "fill-primary text-primary" : "text-muted"}`}
      />
    ));

  if (loading || testimonials.length === 0) return null;

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background Decorative Element */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(var(--primary-rgb),0.03)_0%,transparent_70%)] -z-10" />

      <div className="container mx-auto px-4">
        <FadeIn className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
            Voices of Collaboration
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            The best part of my work is the people I do it with. Feedback from those who have been in the trenches with me.
          </p>
        </FadeIn>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12" staggerDelay={0.1}>
          {testimonials.map((testimonial) => (
            <StaggerItem key={testimonial.id}>
              <motion.div
                whileHover={{ y: -5 }}
                className="group relative p-8 rounded-3xl bg-muted/10 border border-white/5 hover:border-primary/20 transition-all duration-500"
              >
                {/* Large Background Quote Icon */}
                <Quote className="absolute top-6 right-8 h-20 w-20 text-primary/5 group-hover:text-primary/10 transition-colors duration-500" />

                <div className="relative z-10 space-y-6">
                  {/* Rating Stars */}
                  <div className="flex gap-1">
                    {renderStars(testimonial.rating)}
                  </div>

                  {/* Description with a slight "indent" effect */}
                  <blockquote className="text-lg md:text-xl leading-relaxed text-foreground/90 font-medium italic">
                    "{testimonial.description}"
                  </blockquote>

                  {/* Divider Line that grows on hover */}
                  <div className="h-px w-12 bg-primary/30 group-hover:w-full transition-all duration-700 ease-in-out" />

                  {/* User Profile Info */}
                  <div className="flex items-center gap-4">
                    <div className="relative">
                       {/* Animated border around avatar */}
                      <div className="absolute -inset-1 rounded-full bg-gradient-to-tr from-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <Avatar className="h-14 w-14 border-2 border-background relative">
                        <AvatarImage src={testimonial.image_url} alt={testimonial.name} className="object-cover" />
                        <AvatarFallback className="bg-primary/10 text-primary">
                          {testimonial.name.split(" ").map(n => n[0]).join("")}
                        </AvatarFallback>
                      </Avatar>
                    </div>
                    
                    <div>
                      <h4 className="font-bold text-lg group-hover:text-primary transition-colors">
                        {testimonial.name}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        <span className="text-primary/80">{testimonial.designation}</span>
                        {testimonial.company && ` • ${testimonial.company}`}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Action Button */}
        <FadeIn delay={0.4} className="mt-20 text-center">
          <Link href="/projects">
            <Button size="lg" className="rounded-full px-8 hover:scale-105 transition-transform">
              View My Works
            </Button>
          </Link>
        </FadeIn>
      </div>
    </section>
  );
}