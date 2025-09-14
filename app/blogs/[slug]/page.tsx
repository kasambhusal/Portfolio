import { notFound } from "next/navigation"
import { db } from "@/lib/db"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, ArrowLeft } from "lucide-react"
import { Footer } from "@/components/footer"
import Link from "next/link"
import type { Metadata } from "next"

interface BlogPageProps {
  params: { slug: string }
}

async function getBlog(slug: string) {
  try {
    const blog = await db.getBlog(slug)
    return blog
  } catch (error) {
    return null
  }
}

export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
  const blog = await getBlog(params.slug)

  if (!blog) {
    return {
      title: "Blog Post Not Found",
    }
  }

  return {
    title: `${blog.title} - Kasam Bhusal`,
    description: blog.description,
    openGraph: {
      title: blog.title,
      description: blog.description,
      type: "article",
      publishedTime: blog.created_at,
      authors: ["Kasam Bhusal"],
      images: blog.image_urls || [],
    },
    twitter: {
      card: "summary_large_image",
      title: blog.title,
      description: blog.description,
      images: blog.image_urls || [],
    },
  }
}

export default async function BlogPage({ params }: BlogPageProps) {
  const blog = await getBlog(params.slug)

  if (!blog) {
    notFound()
  }

  return (
    <div className="min-h-screen">
      <article className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Back Button */}
            <Link
              href="/blogs"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Blogs
            </Link>

            {/* Blog Header */}
            <Card className="glass dark:glass-dark mb-8">
              <CardHeader>
                {blog.tags && blog.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {blog.tags.map((tag) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}
                <CardTitle className="text-3xl md:text-4xl font-bold text-balance">{blog.title}</CardTitle>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(blog.created_at).toLocaleDateString()}</span>
                </div>
              </CardHeader>
            </Card>

            {/* Featured Image */}
            {blog.image_urls && blog.image_urls[0] && (
              <div className="aspect-video bg-muted rounded-lg overflow-hidden mb-8">
                <img
                  src={blog.image_urls[0] || "/placeholder.svg"}
                  alt={blog.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* Blog Content */}
            <Card className="glass dark:glass-dark">
              <CardContent className="p-8">
                <div className="prose prose-lg max-w-none dark:prose-invert">
                  <p className="text-xl text-muted-foreground mb-8 text-pretty">{blog.description}</p>
                  {blog.content && <div className="whitespace-pre-wrap text-pretty">{blog.content}</div>}
                </div>
              </CardContent>
            </Card>

            {/* Additional Images */}
            {blog.image_urls && blog.image_urls.length > 1 && (
              <div className="mt-8">
                <h3 className="text-xl font-semibold mb-4">Gallery</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {blog.image_urls.slice(1).map((imageUrl, index) => (
                    <div key={index} className="aspect-video bg-muted rounded-lg overflow-hidden">
                      <img
                        src={imageUrl || "/placeholder.svg"}
                        alt={`${blog.title} - Image ${index + 2}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="mt-12 text-center">
              <Link href="/blogs">
                <Button size="lg">View All Blog Posts</Button>
              </Link>
            </div>
          </div>
        </div>
      </article>

      <Footer />
    </div>
  )
}
