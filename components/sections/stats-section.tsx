"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Users, Rocket, Landmark, Briefcase, LucideIcon } from "lucide-react"
import { motion } from "framer-motion"
import { StaggerContainer, StaggerItem } from "@/components/animations/stagger-container"
import { Counter } from "@/components/animations/counter"
import { useEffect, useState } from "react"
import { FadeIn } from "../animations/fade-in"

const iconMap: Record<string, LucideIcon> = {
  Users: Users,
  Rocket: Rocket,
  Landmark: Landmark,
  Briefcase: Briefcase,
}

interface Stats {
  icon: string;
  value: string;
  label: string;
}

export function StatsSection() {
  const [stats, setStats] = useState<Stats[]>([]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch("/data/impact.json");
        if (response.ok) {
          const data = await response.json();
          setStats(data);
        }
      } catch (error) {
        console.error("Failed to fetch stats:", error);
      }
    };
    fetchStats();
  }, []);

  return (
    <section className="relative py-12 bg-[radial-gradient(circle_at_top,rgba(99,102,241,0.12),transparent_55%)] ">
      <div className="absolute inset-x-0 top-0 h-40 pointer-events-none" />
        <FadeIn className="text-center mb-16">
      <div className="relative mx-auto max-w-6xl px-4">
                  <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
                    Impact by Numbers
                  </h2>
                  <p className="text-muted-foreground max-w-xl mx-auto">
                    Building digital experiences that connect and scale.
                  </p>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mt-15">
          {stats.map((stat, index) => {
            const MyIcon = iconMap[stat.icon as keyof typeof iconMap]
            if (!MyIcon) return null;
            
            return (
              <StaggerItem key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08, duration: 0.65, ease: "easeOut" }}
                  className="h-full"
                >
                  <Card className="h-full rounded-[2rem] border border-border/40 bg-background/90 shadow-2xl shadow-primary/5 transition-all duration-500 hover:-translate-y-1">
                    <CardContent className="p-8 flex flex-col items-center text-center gap-5">
                      <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-primary/10 text-primary">
                        <MyIcon className="h-7 w-7" strokeWidth={1.5} />
                      </div>
                      <div className="space-y-2">
                        <Counter value={stat.value} className="text-4xl font-semibold tracking-tight text-foreground" />
                        <p className="text-sm uppercase tracking-[0.24em] text-muted-foreground">{stat.label}</p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </StaggerItem>
            )
          })}
        </div>
      </div>
</FadeIn>
    </section>
  )
}
