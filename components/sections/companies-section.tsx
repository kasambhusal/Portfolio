"use client";

import { useEffect, useState } from "react";
import { motion, easeInOut } from "framer-motion";
import Image from "next/image"; // 1. Imported Next.js Image

interface Company {
  id: number;
  name: string;
  image_url: string;
  alt_text: string;
  website_link?: string;
}

export function CompaniesSection() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await fetch("/data/companies.json");
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

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20, filter: "blur(10px)" },
    show: { 
      opacity: 1, 
      y: 0, 
      filter: "blur(0px)",
      transition: { duration: 0.5, ease: easeInOut }
    },
  };

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-4 tracking-tight"
          >
            Trusted by Amazing Institutions
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-muted-foreground"
          >
            I&apos;ve had the privilege to work with and contribute to these incredible Companies and Organizations.
          </motion.p>
        </div>

        <motion.div 
          variants={container}
          whileInView="show"
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
        >
          {companies.map((company, index) => (
          <motion.a
            key={company.id}
            variants={item}
            href={company.website_link || "#"}
            aria-label={`Visit ${company.name}'s website`}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex flex-col items-center justify-center h-48 w-full p-6 rounded-2xl transition-all duration-500 overflow-hidden"
          >
            <div className="relative z-10 flex flex-col items-center justify-center w-full h-full">
              
              <div className="transition-all duration-500 ease-out group-hover:-translate-y-4 group-hover:scale-90 flex items-center justify-center h-12 w-full">
                {/* 2. Replaced <img> with Next Image */}
                <Image
                  src={company.image_url || "/placeholder.svg"}
                  alt={company.alt_text}
                  width={160} // Bounding box width
                  height={48} // Bounding box height (48px matches Tailwind's h-12)
                  priority={index < 4} // Loads the first 4 images instantly for perceived performance
                  className="max-h-full w-auto object-contain opacity-50 grayscale group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-500"
                />
              </div>

              <span className="absolute bottom-8 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-out text-sm font-semibold tracking-wide text-foreground text-center px-2">
                {company.name}
              </span>
              
            </div>
          </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}