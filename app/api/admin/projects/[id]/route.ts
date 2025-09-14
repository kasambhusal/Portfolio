import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"
import { cache, CACHE_KEYS } from "@/lib/cache"
import { validateBearerToken } from "@/lib/auth-middleware"

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  const authResult = await validateBearerToken(request)
  if (!authResult.valid) {
    return NextResponse.json({ error: authResult.error }, { status: 401 })
  }

  try {
    const id = Number.parseInt(params.id)
    const data = await request.json()
    const { title, description, image_url, project_link } = data

    if (!title || !description) {
      return NextResponse.json({ error: "Title and description are required" }, { status: 400 })
    }

    const project = await db.updateProject(id, {
      title,
      description,
      image_url,
      project_link,
    })

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 })
    }

    // Invalidate cache
    cache.invalidate(CACHE_KEYS.PROJECTS)

    return NextResponse.json(project)
  } catch (error) {
    console.error("Error updating project:", error)
    return NextResponse.json({ error: "Failed to update project" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const authResult = await validateBearerToken(request)
  if (!authResult.valid) {
    return NextResponse.json({ error: authResult.error }, { status: 401 })
  }

  try {
    const id = Number.parseInt(params.id)
    await db.deleteProject(id)

    // Invalidate cache
    cache.invalidate(CACHE_KEYS.PROJECTS)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting project:", error)
    return NextResponse.json({ error: "Failed to delete project" }, { status: 500 })
  }
}
