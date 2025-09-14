import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"
import { cache, CACHE_KEYS } from "@/lib/cache"
import { validateBearerToken } from "@/lib/auth-middleware"

export async function GET(request: NextRequest) {
  const authResult = await validateBearerToken(request)
  if (!authResult.valid) {
    return NextResponse.json({ error: authResult.error }, { status: 401 })
  }

  try {
    const cached = cache.get(CACHE_KEYS.COMPANIES)
    if (cached) {
      return NextResponse.json(cached)
    }

    const companies = await db.getCompanies()
    cache.set(CACHE_KEYS.COMPANIES, companies, 300)

    return NextResponse.json(companies)
  } catch (error) {
    console.error("Error fetching companies:", error)
    return NextResponse.json({ error: "Failed to fetch companies" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  const authResult = await validateBearerToken(request)
  if (!authResult.valid) {
    return NextResponse.json({ error: authResult.error }, { status: 401 })
  }

  try {
    const data = await request.json()
    const { name, image_url, website_link } = data

    if (!name || !image_url) {
      return NextResponse.json({ error: "Name and image URL are required" }, { status: 400 })
    }

    const company = await db.createCompany({
      name,
      image_url,
      website_link,
    })

    cache.invalidate(CACHE_KEYS.COMPANIES)
    return NextResponse.json(company, { status: 201 })
  } catch (error) {
    console.error("Error creating company:", error)
    return NextResponse.json({ error: "Failed to create company" }, { status: 500 })
  }
}
