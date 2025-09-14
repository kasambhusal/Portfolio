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
    // Try to get from cache first
    const cached = cache.get(CACHE_KEYS.PROJECTS)
    if (cached) {
      return NextResponse.json(cached)
    }

    const projects = await db.getProjects()

    // Cache the result
    cache.set(CACHE_KEYS.PROJECTS, projects, 300) // 5 minutes

    return NextResponse.json(projects)
  } catch (error) {
    console.error("Error fetching projects:", error)
    return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  const authResult = await validateBearerToken(request)
  if (!authResult.valid) {
    return NextResponse.json({ error: authResult.error }, { status: 401 })
  }

  try {
    const data = await request.json()
    const { title, description, image_url, project_link } = data

    if (!title || !description) {
      return NextResponse.json({ error: "Title and description are required" }, { status: 400 })
    }

    const project = await db.createProject({
      title,
      description,
      image_url,
      project_link,
    })

    // Invalidate cache
    cache.invalidate(CACHE_KEYS.PROJECTS)

    return NextResponse.json(project, { status: 201 })
  } catch (error) {
    console.error("Error creating project:", error)
    return NextResponse.json({ error: "Failed to create project" }, { status: 500 })
  }
}
