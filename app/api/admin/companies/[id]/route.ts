import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"
import { cache, CACHE_KEYS } from "@/lib/cache"

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = Number.parseInt(params.id)
    const data = await request.json()
    const { name, image_url, website_link } = data

    if (!name || !image_url) {
      return NextResponse.json({ error: "Name and image URL are required" }, { status: 400 })
    }

    const company = await db.updateCompany(id, {
      name,
      image_url,
      website_link,
    })

    if (!company) {
      return NextResponse.json({ error: "Company not found" }, { status: 404 })
    }

    cache.invalidate(CACHE_KEYS.COMPANIES)
    return NextResponse.json(company)
  } catch (error) {
    console.error("Error updating company:", error)
    return NextResponse.json({ error: "Failed to update company" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = Number.parseInt(params.id)
    await db.deleteCompany(id)

    cache.invalidate(CACHE_KEYS.COMPANIES)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting company:", error)
    return NextResponse.json({ error: "Failed to delete company" }, { status: 500 })
  }
}
