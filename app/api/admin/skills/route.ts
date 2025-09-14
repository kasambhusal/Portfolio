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
    const cached = cache.get(CACHE_KEYS.SKILLS)
    if (cached) {
      return NextResponse.json(cached)
    }

    const skills = await db.getSkills()
    cache.set(CACHE_KEYS.SKILLS, skills, 300)

    return NextResponse.json(skills)
  } catch (error) {
    console.error("Error fetching skills:", error)
    return NextResponse.json({ error: "Failed to fetch skills" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  const authResult = await validateBearerToken(request)
  if (!authResult.valid) {
    return NextResponse.json({ error: authResult.error }, { status: 401 })
  }

  try {
    const data = await request.json()
    const { name, category, proficiency_level } = data

    if (!name) {
      return NextResponse.json({ error: "Skill name is required" }, { status: 400 })
    }

    const skill = await db.createSkill({
      name,
      category,
      proficiency_level: proficiency_level ? Number.parseInt(proficiency_level) : 5,
    })

    cache.invalidate(CACHE_KEYS.SKILLS)
    return NextResponse.json(skill, { status: 201 })
  } catch (error) {
    console.error("Error creating skill:", error)
    return NextResponse.json({ error: "Failed to create skill" }, { status: 500 })
  }
}
