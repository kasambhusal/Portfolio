import { NextResponse } from "next/server"
import { db } from "@/lib/db"
import { cache, CACHE_KEYS } from "@/lib/cache"

export async function GET() {
  try {
    const cached = cache.get(CACHE_KEYS.COMPANIES)
    if (cached) {
      return NextResponse.json(cached)
    }

    const companies = await db.getCompanies()
    cache.set(CACHE_KEYS.COMPANIES, companies, 600)

    return NextResponse.json(companies)
  } catch (error) {
    console.error("Error fetching companies:", error)
    return NextResponse.json({ error: "Failed to fetch companies" }, { status: 500 })
  }
}
