import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"
import { cache, CACHE_KEYS } from "@/lib/cache"

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = Number.parseInt(params.id)
    const data = await request.json()
    const { name, category, proficiency_level } = data

    if (!name) {
      return NextResponse.json({ error: "Skill name is required" }, { status: 400 })
    }

    const skill = await db.updateSkill(id, {
      name,
      category,
      proficiency_level: proficiency_level ? Number.parseInt(proficiency_level) : 5,
    })

    if (!skill) {
      return NextResponse.json({ error: "Skill not found" }, { status: 404 })
    }

    cache.invalidate(CACHE_KEYS.SKILLS)
    return NextResponse.json(skill)
  } catch (error) {
    console.error("Error updating skill:", error)
    return NextResponse.json({ error: "Failed to update skill" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = Number.parseInt(params.id)
    await db.deleteSkill(id)

    cache.invalidate(CACHE_KEYS.SKILLS)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting skill:", error)
    return NextResponse.json({ error: "Failed to delete skill" }, { status: 500 })
  }
}
