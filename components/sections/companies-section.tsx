"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { FadeIn } from "@/components/animations/fade-in";

interface Company {
  id: number;
  name: string;
  image_url: string;
  website_link?: string;
}

export function CompaniesSection() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await fetch("/api/public/companies");
        if (response.ok) {
          const data = await response.json();
          setCompanies(data);
        }
      } catch (error) {
        console.error("Failed to fetch companies:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
  }, []);

  if (loading || companies.length === 0) {
    return null;
  }

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <FadeIn className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Trusted by Amazing Organizations
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            I&apos;ve had the privilege to work with and contribute to these
            incredible companies and organizations.
          </p>
        </FadeIn>

        <FadeIn delay={0.3}>
          <div className="relative overflow-hidden">
            <motion.div
              className="flex gap-10 items-center"
              animate={{
                x: ["0%", `-50%`], // move halfway (since we duplicate the array)
              }}
              transition={{
                duration: 60, // slower for professional feel
                repeat: Infinity,
                ease: "linear",
              }}
            >
              {[...companies, ...companies].map((company, index) => (
                <a
                  key={`${company.id}-${index}`}
                  href={company.website_link || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-shrink-0"
                >
                  <Card className="p-6 glass dark:glass-dark transition-all duration-300 hover:shadow-lg">
                    <div className="flex items-center justify-center h-16 w-32">
                      <motion.img
                        src={company.image_url || "/placeholder.svg"}
                        alt={company.name}
                        className="max-h-full max-w-full object-contain filter grayscale transition-all duration-300"
                        whileHover={{
                          scale: 1.05,
                          filter: "grayscale(0%)",
                          transition: { duration: 0.3 },
                        }}
                      />
                    </div>
                  </Card>
                </a>
              ))}
            </motion.div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
