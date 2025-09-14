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
    const cached = cache.get(CACHE_KEYS.BLOGS)
    if (cached) {
      return NextResponse.json(cached)
    }

    const blogs = await db.getBlogs()
    cache.set(CACHE_KEYS.BLOGS, blogs, 300)

    return NextResponse.json(blogs)
  } catch (error) {
    console.error("Error fetching blogs:", error)
    return NextResponse.json({ error: "Failed to fetch blogs" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  const authResult = await validateBearerToken(request)
  if (!authResult.valid) {
    return NextResponse.json({ error: authResult.error }, { status: 401 })
  }

  try {
    const data = await request.json()
    const { title, description, content, image_urls, tags, slug } = data

    if (!title || !description || !slug) {
      return NextResponse.json({ error: "Title, description, and slug are required" }, { status: 400 })
    }

    const blog = await db.createBlog({
      title,
      description,
      content,
      image_urls: image_urls || [],
      tags: tags || [],
      slug,
    })

    cache.invalidate(CACHE_KEYS.BLOGS)
    return NextResponse.json(blog, { status: 201 })
  } catch (error) {
    console.error("Error creating blog:", error)
    return NextResponse.json({ error: "Failed to create blog" }, { status: 500 })
  }
}
