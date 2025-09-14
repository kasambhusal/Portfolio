import { NextResponse } from "next/server"
import { db } from "@/lib/db"
import { cache, CACHE_KEYS } from "@/lib/cache"

export async function GET() {
  try {
    const cached = cache.get(CACHE_KEYS.SKILLS)
    if (cached) {
      return NextResponse.json(cached)
    }

    const skills = await db.getSkills()
    cache.set(CACHE_KEYS.SKILLS, skills, 600)

    return NextResponse.json(skills)
  } catch (error) {
    console.error("Error fetching skills:", error)
    return NextResponse.json({ error: "Failed to fetch skills" }, { status: 500 })
  }
}
