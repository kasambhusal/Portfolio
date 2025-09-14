"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { AdminHeader } from "@/components/admin/admin-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit, Trash2, Calendar } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Blog {
  id: number
  title: string
  description: string
  content?: string
  image_urls?: string[]
  tags?: string[]
  slug: string
  created_at: string
}

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [loading, setLoading] = useState(true)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingBlog, setEditingBlog] = useState<Blog | null>(null)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    content: "",
    image_urls: "",
    tags: "",
    slug: "",
  })
  const { toast } = useToast()

  useEffect(() => {
    fetchBlogs()
  }, [])

  const fetchBlogs = async () => {
    try {
      const response = await fetch("/api/admin/blogs")
      if (response.ok) {
        const data = await response.json()
        setBlogs(data)
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch blogs",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim()
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const imageUrls = formData.image_urls
      .split("\n")
      .map((url) => url.trim())
      .filter((url) => url)
    const tags = formData.tags
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag)

    const slug = formData.slug || generateSlug(formData.title)

    try {
      const url = editingBlog ? `/api/admin/blogs/${editingBlog.id}` : "/api/admin/blogs"
      const method = editingBlog ? "PUT" : "POST"

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          image_urls: imageUrls,
          tags,
          slug,
        }),
      })

      if (response.ok) {
        toast({
          title: "Success",
          description: `Blog ${editingBlog ? "updated" : "created"} successfully`,
        })
        setDialogOpen(false)
        setEditingBlog(null)
        setFormData({ title: "", description: "", content: "", image_urls: "", tags: "", slug: "" })
        fetchBlogs()
      } else {
        const error = await response.json()
        toast({
          title: "Error",
          description: error.error || "Failed to save blog",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Network error occurred",
        variant: "destructive",
      })
    }
  }

  const handleEdit = (blog: Blog) => {
    setEditingBlog(blog)
    setFormData({
      title: blog.title,
      description: blog.description,
      content: blog.content || "",
      image_urls: (blog.image_urls || []).join("\n"),
      tags: (blog.tags || []).join(", "),
      slug: blog.slug,
    })
    setDialogOpen(true)
  }

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this blog post?")) return

    try {
      const response = await fetch(`/api/admin/blogs/${id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        toast({
          title: "Success",
          description: "Blog deleted successfully",
        })
        fetchBlogs()
      } else {
        toast({
          title: "Error",
          description: "Failed to delete blog",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Network error occurred",
        variant: "destructive",
      })
    }
  }

  const openCreateDialog = () => {
    setEditingBlog(null)
    setFormData({ title: "", description: "", content: "", image_urls: "", tags: "", slug: "" })
    setDialogOpen(true)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <AdminHeader title="Blogs & Events" />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">Loading...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <AdminHeader title="Blogs & Events" />

      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold">Manage Blogs & Events</h2>
            <p className="text-muted-foreground">Share your journey, achievements, and life events</p>
          </div>

          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={openCreateDialog}>
                <Plus className="w-4 h-4 mr-2" />
                Add Blog Post
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{editingBlog ? "Edit Blog Post" : "Add New Blog Post"}</DialogTitle>
                <DialogDescription>
                  {editingBlog ? "Update the blog post details" : "Create a new blog post or life event"}
                </DialogDescription>
              </DialogHeader>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Title *</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => {
                        const title = e.target.value
                        setFormData({ ...formData, title, slug: generateSlug(title) })
                      }}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="slug">URL Slug *</Label>
                    <Input
                      id="slug"
                      value={formData.slug}
                      onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                      required
                      placeholder="url-friendly-slug"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    required
                    rows={3}
                    placeholder="Brief description of the blog post"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="content">Content</Label>
                  <Textarea
                    id="content"
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    rows={8}
                    placeholder="Full content of the blog post (optional for preview)"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="image_urls">Image URLs (one per line)</Label>
                  <Textarea
                    id="image_urls"
                    value={formData.image_urls}
                    onChange={(e) => setFormData({ ...formData, image_urls: e.target.value })}
                    rows={3}
                    placeholder="https://example.com/image1.jpg&#10;https://example.com/image2.jpg"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tags">Tags (comma-separated)</Label>
                  <Input
                    id="tags"
                    value={formData.tags}
                    onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                    placeholder="hackathon, achievement, learning"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-4">
                  <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">{editingBlog ? "Update" : "Create"} Blog Post</Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {blogs.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground mb-4">No blog posts found</p>
              <Button onClick={openCreateDialog}>
                <Plus className="w-4 h-4 mr-2" />
                Add Your First Blog Post
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.map((blog) => (
              <Card key={blog.id}>
                {blog.image_urls && blog.image_urls[0] && (
                  <div className="aspect-video bg-muted rounded-t-lg overflow-hidden">
                    <img
                      src={blog.image_urls[0] || "/placeholder.svg"}
                      alt={blog.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="flex items-start justify-between">
                    <span className="line-clamp-2">{blog.title}</span>
                    <div className="flex gap-1 ml-2">
                      <Button variant="ghost" size="sm" onClick={() => handleEdit(blog)}>
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => handleDelete(blog.id)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardTitle>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="w-3 h-3" />
                    {new Date(blog.created_at).toLocaleDateString()}
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="line-clamp-3 mb-4">{blog.description}</CardDescription>
                  {blog.tags && blog.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {blog.tags.slice(0, 3).map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                      {blog.tags.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{blog.tags.length - 3}
                        </Badge>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
