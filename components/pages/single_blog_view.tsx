"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, ArrowLeft, Clock, Share2 } from "lucide-react";
import Link from "next/link";

interface BlogViewProps {
  blog: {
    title: string;
    description: string;
    content?: string;
    image_urls?: string[];
    tags?: string[];
    created_at: string;
    slug: string;
  };
}

export default function SingleBlogView({ blog }: BlogViewProps) {
  // Reading Progress Bar
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Calculate read time (approximate)
  const readTime = Math.ceil((blog.content?.split(" ").length || 0) / 200);

  return (
    <div className="min-h-screen bg-background relative">
      
      {/* Progress Bar (Fixed at top) */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-primary origin-left z-50"
        style={{ scaleX }}
      />

      <article>
        {/* Header Section */}
        <section className="relative pt-32 pb-20 px-6 overflow-hidden">
           {/* Background Blob */}
           <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/10 blur-[100px] -z-10 rounded-full pointer-events-none" />

          <div className="container mx-auto max-w-4xl text-center">
            
            {/* Navigation & Meta */}
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-between mb-8 text-muted-foreground"
            >
              <Link href="/blogs" className="hover:text-primary transition-colors flex items-center gap-2 group">
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                Back to Blogs
              </Link>
              <div className="flex items-center gap-4 text-sm">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {new Date(blog.created_at).toLocaleDateString()}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {readTime} min read
                </span>
              </div>
            </motion.div>

            {/* Title */}
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6 text-balance leading-tight"
            >
              {blog.title}
            </motion.h1>

            {/* Tags */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-wrap justify-center gap-2 mb-10"
            >
              {blog.tags?.map((tag) => (
                <Badge key={tag} variant="secondary" className="px-3 py-1 bg-muted/50 text-muted-foreground hover:bg-primary/10 hover:text-primary transition-colors">
                  #{tag}
                </Badge>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Hero Image */}
        {blog.image_urls?.[0] && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="container mx-auto max-w-6xl px-4 mb-16"
          >
            <div 
              className="rounded-lg overflow-hidden shadow-xl ring-1 relative"
              style={{ '--tw-ring-color': 'var(--ring)' } as React.CSSProperties}
            >
              <img
                src={blog.image_urls[0]}
                alt={blog.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent" />
            </div>
          </motion.div>
        )}

        {/* Content */}
        <section className="container mx-auto px-4 pb-20">
          <div className="max-w-3xl mx-auto">
             {/* Description Lead */}
            <p className="text-xl md:text-2xl font-medium text-muted-foreground mb-10 leading-relaxed border-l-4 border-primary/50 pl-6">
              {blog.description}
            </p>

            {/* Main Content */}
            <div className="prose prose-lg dark:prose-invert prose-headings:font-bold prose-a:text-primary prose-img:rounded-xl max-w-none">
              {/* NOTE: If you are storing HTML in blog.content, use dangerouslySetInnerHTML */}
              {/* If it's plain text/markdown, you might need a markdown parser. Assuming plain text/pre-wrap for now based on your code */}
              <div className="whitespace-pre-wrap font-serif leading-loose">
                {blog.content}
              </div>
            </div>

            {/* Gallery (if extra images) */}
            {blog.image_urls && blog.image_urls.length > 1 && (
              <div className="mt-16 pt-10 border-t">
                <h3 className="text-2xl font-bold mb-6">Gallery</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {blog.image_urls.slice(1).map((url, i) => (
                    <div key={i} className="rounded-xl overflow-hidden bg-muted">
                      <img src={url} alt="Gallery" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Share / Footer Action */}
            <div className="mt-20 flex justify-center">
              <Button 
                variant="outline" 
                size="lg" 
                aria-label="Share this blog post"
                className="rounded-full gap-2"
                onClick={() => {
                   if (navigator.share) {
                     navigator.share({
                       title: blog.title,
                       text: blog.description,
                       url: window.location.href,
                     })
                   } else {
                     navigator.clipboard.writeText(window.location.href);
                     alert("Link copied to clipboard!");
                   }
                }}
              >
                <Share2 className="w-4 h-4" />
                Share this Story
              </Button>
            </div>
          </div>
        </section>
      </article>

    </div>
  );
}