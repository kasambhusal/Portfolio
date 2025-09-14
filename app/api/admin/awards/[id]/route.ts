import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"
import { cache, CACHE_KEYS } from "@/lib/cache"

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = Number.parseInt(params.id)
    const data = await request.json()
    const { title, description, date_received, organization } = data

    if (!title) {
      return NextResponse.json({ error: "Award title is required" }, { status: 400 })
    }

    const award = await db.updateAward(id, {
      title,
      description,
      date_received,
      organization,
    })

    if (!award) {
      return NextResponse.json({ error: "Award not found" }, { status: 404 })
    }

    cache.invalidate(CACHE_KEYS.AWARDS)
    return NextResponse.json(award)
  } catch (error) {
    console.error("Error updating award:", error)
    return NextResponse.json({ error: "Failed to update award" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = Number.parseInt(params.id)
    await db.deleteAward(id)

    cache.invalidate(CACHE_KEYS.AWARDS)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting award:", error)
    return NextResponse.json({ error: "Failed to delete award" }, { status: 500 })
  }
}
