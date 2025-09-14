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
      value: "25+",
      label: "Happy Customers",
      color: "text-blue-500",
    },
    {
      icon: Code,
      value: "15+",
      label: "Projects Completed",
      color: "text-green-500",
    },
    {
      icon: Award,
      value: "800K+",
      label: "Lines of Code",
      color: "text-purple-500",
    },
    {
      icon: MessageSquare,
      value: "98%",
      label: "Positive Feedback",
      color: "text-orange-500",
    },
  ]

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <FadeIn className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Impact by Numbers</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Here's a glimpse of the impact I've made through my work and collaborations.
          </p>
        </FadeIn>

        <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-6" staggerDelay={0.1}>
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <StaggerItem key={index}>
                <motion.div
                  whileHover={{
                    scale: 1.05,
                    transition: { type: "spring", stiffness: 400, damping: 17 },
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Card className="glass dark:glass-dark transition-all duration-300 h-full">
                    <CardContent className="p-6 text-center">
                      <motion.div
                        className={`inline-flex p-3 rounded-full bg-muted mb-4 ${stat.color}`}
                        whileHover={{
                          rotate: 360,
                          transition: { duration: 0.6, ease: "easeInOut" },
                        }}
                      >
                        <Icon className="h-6 w-6" />
                      </motion.div>
                      <Counter value={stat.value} className="text-3xl font-bold mb-2" />
                      <div className="text-sm text-muted-foreground">{stat.label}</div>
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
