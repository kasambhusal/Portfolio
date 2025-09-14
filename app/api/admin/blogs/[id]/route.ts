import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"
import { cache, CACHE_KEYS } from "@/lib/cache"

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = Number.parseInt(params.id)
    const data = await request.json()
    const { title, description, content, image_urls, tags, slug } = data

    if (!title || !description || !slug) {
      return NextResponse.json({ error: "Title, description, and slug are required" }, { status: 400 })
    }

    const blog = await db.updateBlog(id, {
      title,
      description,
      content,
      image_urls: image_urls || [],
      tags: tags || [],
      slug,
    })

    if (!blog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 })
    }

    cache.invalidate(CACHE_KEYS.BLOGS)
    return NextResponse.json(blog)
  } catch (error) {
    console.error("Error updating blog:", error)
    return NextResponse.json({ error: "Failed to update blog" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = Number.parseInt(params.id)
    await db.deleteBlog(id)

    cache.invalidate(CACHE_KEYS.BLOGS)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting blog:", error)
    return NextResponse.json({ error: "Failed to delete blog" }, { status: 500 })
  }
}
