"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock } from "lucide-react";
import { Footer } from "@/components/footer";
import Link from "next/link";

interface Blog {
  id: number;
  title: string;
  description: string;
  content?: string;
  image_urls?: string[];
  tags?: string[];
  slug: string;
  created_at: string;
}

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const observerRef = useRef<HTMLDivElement | null>(null);
  const limit = 6;

  // Fetch blogs by page
  const fetchBlogs = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/public/blogs?page=${page}&limit=${limit}`);
      if (!res.ok) throw new Error("Failed to fetch blogs");
      const json = await res.json();

      // Assuming your API returns { data: Blog[], pagination: { totalPages, page } }
      setBlogs((prev) => [...prev, ...json.data]);
      setHasMore(page < json.pagination.totalPages);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [page]);

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  // Intersection Observer for infinite scroll
  useEffect(() => {
    if (!hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setPage((prev) => prev + 1);
        }
      },
      { rootMargin: "200px" }
    );

    if (observerRef.current) observer.observe(observerRef.current);

    return () => {
      if (observerRef.current) observer.unobserve(observerRef.current);
    };
  }, [hasMore]);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-background via-background to-muted/20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gradient">
              Blogs & Life Events
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground text-pretty">
              My journey through hackathons, achievements, learning experiences,
              and important milestones. Each post tells a story of growth and
              discovery.
            </p>
          </div>
        </div>
      </section>

      {/* Blogs Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog, index) => (
              <Card
                key={index}
                className="group hover:scale-105 transition-all duration-300 glass dark:glass-dark overflow-hidden"
              >
                {blog.image_urls?.[0] && (
                  <div className="aspect-video bg-muted overflow-hidden">
                    <img
                      src={blog.image_urls[0]}
                      alt={blog.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                )}
                <CardHeader>
                  {Array.isArray(blog.tags) && blog.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-2">
                      {blog.tags.slice(0, 3).map((tag) => (
                        <Badge
                          key={tag}
                          variant="secondary"
                          className="text-xs"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}
                  <CardTitle className="text-xl group-hover:text-accent transition-colors line-clamp-2">
                    {blog.title}
                  </CardTitle>
                  <CardDescription className="flex items-center gap-2 text-sm">
                    <Calendar className="w-3 h-3" />
                    {new Date(blog.created_at).toLocaleDateString()}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-6 text-pretty line-clamp-3">
                    {blog.description}
                  </p>
                  <Link href={`/blogs/${blog.slug}`}>
                    <Button
                      size="sm"
                      variant="outline"
                      className="group bg-transparent"
                    >
                      Read More
                      <Clock className="w-3 h-3 ml-2 group-hover:scale-110 transition-transform" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Loading / Scroll Trigger */}
          {loading && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
              {Array.from({ length: limit }).map((_, i) => (
                <Card key={i} className="animate-pulse">
                  <div className="aspect-video bg-muted rounded-t-lg" />
                  <CardHeader>
                    <div className="h-6 bg-muted rounded w-3/4" />
                    <div className="h-4 bg-muted rounded w-full" />
                  </CardHeader>
                  <CardContent>
                    <div className="h-4 bg-muted rounded w-full mb-2" />
                    <div className="h-4 bg-muted rounded w-2/3" />
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          <div ref={observerRef} className="h-10" />
        </div>
      </section>

      <Footer />
    </div>
  );
}
