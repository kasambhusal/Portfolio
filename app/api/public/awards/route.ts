import { NextResponse } from "next/server"
import { db } from "@/lib/db"
import { cache, CACHE_KEYS } from "@/lib/cache"

export async function GET() {
  try {
    const cached = cache.get(CACHE_KEYS.AWARDS)
    if (cached) {
      return NextResponse.json(cached)
    }

    const awards = await db.getAwards()
    cache.set(CACHE_KEYS.AWARDS, awards, 600)

    return NextResponse.json(awards)
  } catch (error) {
    console.error("Error fetching awards:", error)
    return NextResponse.json({ error: "Failed to fetch awards" }, { status: 500 })
  }
}
