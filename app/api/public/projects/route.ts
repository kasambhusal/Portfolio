import { NextResponse } from "next/server"
import { db } from "@/lib/db"
import { cache, CACHE_KEYS } from "@/lib/cache"

export async function GET() {
  try {
    // Try to get from cache first
    const cached = cache.get(CACHE_KEYS.PROJECTS)
    if (cached) {
      return NextResponse.json(cached)
    }

    const projects = await db.getProjects()

    // Cache the result for 10 minutes
    cache.set(CACHE_KEYS.PROJECTS, projects, 600)

    return NextResponse.json(projects)
  } catch (error) {
    console.error("Error fetching projects:", error)
    return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 })
  }
}
