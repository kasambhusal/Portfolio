"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { FadeIn } from "@/components/animations/fade-in";

// Import Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

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
        const response = await fetch("/api/public/testimonials");
        if (response.ok) {
          let data: Testimonial[] = await response.json();
          // Sort newest first
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
        className={`w-4 h-4 ${
          i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
        }`}
      />
    ));

  if (loading || testimonials.length === 0) return null;

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <FadeIn className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            What People Say
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Don&apos;t just take my word for it. Here&apos;s what clients and
            collaborators have to say about working with me.
          </p>
        </FadeIn>

        {/* Swiper Carousel */}
        <Swiper
          modules={[Pagination]}
          pagination={{ clickable: true }}
          spaceBetween={24}
          slidesPerView={1}
          className="pb-12" // add gap between cards and dots
          breakpoints={{
            768: { slidesPerView: 2 }, // tablets
            1024: { slidesPerView: 3 }, // desktops
          }}
        >
          {testimonials.map((testimonial) => (
            <SwiperSlide key={testimonial.id}>
              <motion.div
                whileHover={{ scale: 1.02, y: -5 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                className="h-full"
              >
                <Card className="glass dark:glass-dark h-full">
                  <CardContent className="p-6 h-full flex flex-col min-h-[320px]">
                    <div className="flex mb-4">
                      {renderStars(testimonial.rating)}
                    </div>
                    <p className="text-muted-foreground mb-6 flex-1">
                      "{testimonial.description}"
                    </p>
                    <div className="flex items-center gap-3 mt-auto">
                      <Avatar>
                        <AvatarImage
                          src={testimonial.image_url || "/placeholder.svg"}
                          alt={testimonial.name}
                        />
                        <AvatarFallback>
                          {testimonial.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-semibold">{testimonial.name}</div>
                        {testimonial.designation && (
                          <div className="text-sm text-muted-foreground">
                            {testimonial.designation}
                            {testimonial.company &&
                              ` at ${testimonial.company}`}
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* CTA */}
        <FadeIn delay={0.6}>
          <div className="text-center mt-12">
            <Link href="/projects">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <Button size="lg" variant="outline">
                  Read More Projects
                </Button>
              </motion.div>
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
