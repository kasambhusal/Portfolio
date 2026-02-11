"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Code, Users, Award, MessageSquare, LucideIcon } from "lucide-react" // Import LucideIcon type
import { motion } from "framer-motion"
import { FadeIn } from "@/components/animations/fade-in"
import { StaggerContainer, StaggerItem } from "@/components/animations/stagger-container"
import { Counter } from "@/components/animations/counter"
import { useEffect, useState } from "react"

// 1. Create a map to link strings to components
const iconMap: Record<string, LucideIcon> = {
  Users: Users,
  Code: Code,
  Award: Award,
  MessageSquare: MessageSquare,
}

interface Stats {
  icon: string;
  value: string;
  label: string;
  color: string;
  bg: string;
  glow: string;
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
    <section className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <FadeIn className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">Impact by Numbers</h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-base md:text-lg">
            Building digital experiences that connect and scale.
          </p>
        </FadeIn>

        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8" staggerDelay={0.1}>
          {stats.map((stat, index) => {
            // 2. Look up the component using the string from JSON
            // We use 'as keyof typeof iconMap' to make TypeScript happy
            const MyIcon = iconMap[stat.icon as keyof typeof iconMap]

            // 3. Safety check: If the icon name in JSON doesn't match the map, don't crash
            if (!MyIcon) return null;

            return (
              <StaggerItem key={index}>
                <motion.div
                  className="group relative"
                  whileHover={{ y: -8 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <div className={`absolute inset-0 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 ${stat.glow}`} />

                  <Card className="bg-transparent border-none shadow-none h-full transition-colors duration-500">
                    <CardContent className="p-8 flex flex-col items-center text-center">
                      
                      <div className={`relative flex items-center justify-center w-16 h-16 rounded-2xl bg-muted/30 mb-6 transition-all duration-500 group-hover:scale-110 ${stat.bg}`}>
                        {/* Now MyIcon is a valid component */}
                        <MyIcon className={`h-8 w-8 transition-colors duration-500 ${stat.color}`} />
                      </div>

                      <div className="space-y-1">
                        <Counter 
                          value={stat.value} 
                          className="text-4xl md:text-5xl font-extrabold tracking-tighter" 
                        />
                        <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground/70 group-hover:text-foreground transition-colors duration-300">
                          {stat.label}
                        </p>
                      </div>

                      <div className="mt-6 w-12 h-1 bg-muted rounded-full overflow-hidden">
                        <div className={`h-full w-0 group-hover:w-full transition-all duration-700 ease-out bg-current ${stat.color}`} />
                      </div>

                    </CardContent>
                  </Card>
                </motion.div>
              </StaggerItem>
            )
          })}
        </StaggerContainer>
      </div>
    </section>
  )
}