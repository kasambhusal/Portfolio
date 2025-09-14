"use client"

import { useInView, useMotionValue, useSpring } from "framer-motion"
import { useEffect, useRef } from "react"

interface CounterProps {
  value: string
  className?: string
}

export function Counter({ value, className }: CounterProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  // Extract number from value string (e.g., "50+" -> 50, "1M+" -> 1000000)
  const getNumericValue = (val: string) => {
    const num = Number.parseFloat(val.replace(/[^0-9.]/g, ""))
    if (val.includes("M")) return num * 1000000
    if (val.includes("K")) return num * 1000
    return num
  }

  const numericValue = getNumericValue(value)
  const motionValue = useMotionValue(0)
  const springValue = useSpring(motionValue, { duration: 2000 })

  useEffect(() => {
    if (isInView) {
      motionValue.set(numericValue)
    }
  }, [isInView, motionValue, numericValue])

  useEffect(() => {
    const unsubscribe = springValue.on("change", (latest) => {
      if (ref.current) {
        let displayValue = Math.round(latest).toString()

        // Format the display value to match original format
        if (value.includes("M+")) {
          displayValue = (latest / 1000000).toFixed(latest >= 1000000 ? 0 : 1) + "M+"
        } else if (value.includes("K+")) {
          displayValue = (latest / 1000).toFixed(latest >= 1000 ? 0 : 1) + "K+"
        } else if (value.includes("%")) {
          displayValue = Math.round(latest) + "%"
        } else if (value.includes("+")) {
          displayValue = Math.round(latest) + "+"
        }

        ref.current.textContent = displayValue
      }
    })

    return unsubscribe
  }, [springValue, value])

  return (
    <div ref={ref} className={className}>
      0
    </div>
  )
}
