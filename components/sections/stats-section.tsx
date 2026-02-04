"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Code, Users, Award, MessageSquare } from "lucide-react"
import { motion } from "framer-motion"
import { FadeIn } from "@/components/animations/fade-in"
import { StaggerContainer, StaggerItem } from "@/components/animations/stagger-container"
import { Counter } from "@/components/animations/counter"

export function StatsSection() {
  const stats = [
    {
      icon: Users,
      value: "190K+",
      label: "Lives Impacted",
      color: "text-blue-500",
      bg: "group-hover:bg-blue-500/10",
      glow: "group-hover:shadow-blue-500/20",
    },
    {
      icon: Code,
      value: "20+",
      label: "Projects Completed",
      color: "text-green-500",
      bg: "group-hover:bg-green-500/10",
      glow: "group-hover:shadow-green-500/20",
    },
    {
      icon: Award,
      value: "850K+",
      label: "Lines of Code",
      color: "text-purple-500",
      bg: "group-hover:bg-purple-500/10",
      glow: "group-hover:shadow-purple-500/20",
    },
    {
      icon: MessageSquare,
      value: "98%",
      label: "Positive Feedback",
      color: "text-orange-500",
      bg: "group-hover:bg-orange-500/10",
      glow: "group-hover:shadow-orange-500/20",
    },
  ]

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
            const Icon = stat.icon
            return (
              <StaggerItem key={index}>
                <motion.div
                  className="group relative"
                  whileHover={{ y: -8 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  {/* Subtle Background Glow on Hover */}
                  <div className={`absolute inset-0 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 ${stat.glow}`} />

                  <Card className="bg-transparent border-none shadow-none h-full transition-colors duration-500">
                    <CardContent className="p-8 flex flex-col items-center text-center">
                      
                      {/* Modern Icon Container */}
                      <div className={`relative flex items-center justify-center w-16 h-16 rounded-2xl bg-muted/30 mb-6 transition-all duration-500 group-hover:scale-110 ${stat.bg}`}>
                        <Icon className={`h-8 w-8 transition-colors duration-500 ${stat.color}`} />
                      </div>

                      {/* Value and Label */}
                      <div className="space-y-1">
                        <Counter 
                          value={stat.value} 
                          className="text-4xl md:text-5xl font-extrabold tracking-tighter" 
                        />
                        <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground/70 group-hover:text-foreground transition-colors duration-300">
                          {stat.label}
                        </p>
                      </div>

                      {/* Bottom Decorative Line */}
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