import { NextResponse } from "next/server"
import { db } from "@/lib/db"
import { cache, CACHE_KEYS } from "@/lib/cache"

export async function GET() {
  try {
    const cached = cache.get(CACHE_KEYS.TESTIMONIALS)
    if (cached) {
      return NextResponse.json(cached)
    }

    const testimonials = await db.getTestimonials()
    cache.set(CACHE_KEYS.TESTIMONIALS, testimonials, 600)

    return NextResponse.json(testimonials)
  } catch (error) {
    console.error("Error fetching testimonials:", error)
    return NextResponse.json({ error: "Failed to fetch testimonials" }, { status: 500 })
  }
}
