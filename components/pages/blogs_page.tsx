"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Calendar, ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

interface Blog {
  id: number;
  title: string;
  description: string;
  image_urls?: string[];
  tags?: string[];
  slug: string;
  created_at: string;
}

interface BlogsPageProps {
  initialBlogs: Blog[];
  initialTotalPages: number;
}

export default function BlogsPage({ initialBlogs, initialTotalPages }: BlogsPageProps) {
  const [blogs, setBlogs] = useState<Blog[]>(initialBlogs);
  const [page, setPage] = useState(2); // Start fetching from page 2 since page 1 is SSR
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(page <= initialTotalPages);
  
  const observerRef = useRef<HTMLDivElement | null>(null);
  const LIMIT = 9;

  const fetchMoreBlogs = useCallback(async () => {
    if (loading || !hasMore) return;
    
    setLoading(true);
    try {
      // Add a slight artificial delay if it's too fast, to make the loader feel "smooth" 
      // await new Promise(r => setTimeout(r, 800)); 

      const res = await fetch(`/api/public/blogs?page=${page}&limit=${LIMIT}`);
      if (!res.ok) throw new Error("Failed to fetch");
      
      const json = await res.json();
      
      if (json.data && json.data.length > 0) {
        setBlogs((prev) => [...prev, ...json.data]);
        setPage((prev) => prev + 1);
        setHasMore(page < json.pagination.totalPages);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [page, hasMore, loading]);

  // Infinite Scroll Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore) {
          fetchMoreBlogs();
        }
      },
      { threshold: 0.1, rootMargin: "100px" }
    );

    if (observerRef.current) observer.observe(observerRef.current);
    return () => observer.disconnect();
  }, [fetchMoreBlogs, hasMore]);

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      
      {/* Dynamic Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10">
        {/* Modern Hero */}
        <section className="pt-32 pb-16 container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge variant="outline" className="mb-4 py-1 px-4 rounded-full border-primary/20 text-primary bg-primary/5 backdrop-blur-sm">
              <Sparkles className="w-3 h-3 mr-2" />
              The Journal
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
              Writing & <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-600">Stories</span>
            </h1>
            <p className="text-xl text-muted-foreground text-pretty max-w-2xl mx-auto leading-relaxed">
              My journey through hackathons, achievements, and deep dives into technology.
            </p>
          </motion.div>
        </section>

        {/* Blogs Grid */}
        <section className="pb-24 container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog, index) => (
              <motion.div
                key={`${blog.id}-${index}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index % 3 * 0.1 }}
              >
                <Link href={`/blogs/${blog.slug}`} className="group block h-full">
                  <article className="flex flex-col h-full bg-card/30 hover:bg-card/50 border border-white/5 hover:border-white/10 dark:border-white/5 dark:hover:border-primary/20 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-primary/5">
                    
                    {/* Image Container with Floating Badge */}
                    <div className="relative aspect-[16/10] overflow-hidden">
                      {blog.image_urls?.[0] ? (
                        <img
                          src={blog.image_urls[0]}
                          alt={blog.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      ) : (
                        <div className="w-full h-full bg-muted flex items-center justify-center">
                          <span className="text-muted-foreground">No Cover</span>
                        </div>
                      )}
                      
                      {/* Floating Date Badge */}
                      <div className="absolute top-4 right-4 bg-background/80 backdrop-blur-md text-foreground text-xs font-semibold px-3 py-1.5 rounded-full flex items-center gap-2 border border-white/10 shadow-sm">
                        <Calendar className="w-3 h-3 text-primary" />
                        {new Date(blog.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 flex flex-col flex-grow">
                      {/* Tags */}
                      {blog.tags && blog.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {blog.tags.slice(0, 2).map((tag) => (
                            <span key={tag} className="text-[10px] uppercase tracking-wider font-semibold text-primary/80 bg-primary/5 px-2 py-1 rounded-md">
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}

                      <h3 className="text-2xl font-bold mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                        {blog.title}
                      </h3>
                      
                      <p className="text-muted-foreground text-sm line-clamp-3 mb-6 flex-grow">
                        {blog.description}
                      </p>

                      <div className="flex items-center text-sm font-medium text-primary/80 group-hover:text-primary mt-auto">
                        Read Article 
                        <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  </article>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Loader Trigger Area */}
          <div ref={observerRef} className="mt-16 flex justify-center w-full min-h-[100px]">
             {hasMore && (
               <div className="flex flex-col items-center gap-4 animate-pulse">
                 {/* This matches your "YouTube style" loading bar idea but cleaner for scrolling */}
                 <div className="w-48 h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent rounded-full" />
                 <span className="text-sm text-muted-foreground font-medium">Loading more...</span>
               </div>
             )}
             
             {!hasMore && blogs.length > 0 && (
               <p className="text-muted-foreground text-sm">No more blogs.</p>
             )}
          </div>
        </section>
      </div>
      
    </div>
  );
}