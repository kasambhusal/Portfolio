"use client"

import { motion } from "framer-motion"
import type { ReactNode } from "react"

interface FloatingCardProps {
  children: ReactNode
  className?: string
  delay?: number
}

export function FloatingCard({ children, className, delay = 0 }: FloatingCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay, ease: [0.25, 0.25, 0, 1] }}
      whileHover={{
        y: -8,
        transition: { duration: 0.3, ease: [0.25, 0.25, 0, 1] },
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
