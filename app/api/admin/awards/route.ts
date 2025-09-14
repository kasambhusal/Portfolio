import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"
import { cache, CACHE_KEYS } from "@/lib/cache"

export async function GET() {
  try {
    const cached = cache.get(CACHE_KEYS.AWARDS)
    if (cached) {
      return NextResponse.json(cached)
    }

    const awards = await db.getAwards()
    cache.set(CACHE_KEYS.AWARDS, awards, 300)

    return NextResponse.json(awards)
  } catch (error) {
    console.error("Error fetching awards:", error)
    return NextResponse.json({ error: "Failed to fetch awards" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    const { title, description, date_received, organization } = data

    if (!title) {
      return NextResponse.json({ error: "Award title is required" }, { status: 400 })
    }

    const award = await db.createAward({
      title,
      description,
      date_received,
      organization,
    })

    cache.invalidate(CACHE_KEYS.AWARDS)
    return NextResponse.json(award, { status: 201 })
  } catch (error) {
    console.error("Error creating award:", error)
    return NextResponse.json({ error: "Failed to create award" }, { status: 500 })
  }
}
