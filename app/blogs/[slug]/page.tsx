import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { cache } from "react"; // IMPORT THIS
import type { Metadata } from "next";
import SingleBlogView from "@/components/pages/single_blog_view"; // Import the client view

interface BlogPageProps {
  params: { slug: string };
}

// 1. DEDUPE REQUESTS: Use React Cache to prevent double DB calls
const getBlog = cache(async (slug: string) => {
  try {
    const blog = await db.getBlog(slug) as {
      title: string;
      description: string;
      content?: string;
      image_urls?: string[];
      tags?: string[];
      created_at: string;
      slug: string;
    } | null;
    return blog;
  } catch (error) {
    return null;
  }
});

// 2. SEO GENERATION
export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
  const { slug } = await params;
  const blog = await getBlog(slug);

  if (!blog) return { title: "Blog Post Not Found" };

  return {
    title: `${blog.title} | Kasam Bhusal`,
    description: blog.description,
    openGraph: {
      title: blog.title,
      description: blog.description,
      type: "article",
      publishedTime: blog.created_at,
      authors: ["Kasam Bhusal"],
      images: blog.image_urls ? blog.image_urls.map((url: any) => ({ url })) : [],
      url: `https://kasambhusal.com.np/blogs/${slug}`, // Add explicit URL
    },
    twitter: {
      card: "summary_large_image",
      title: blog.title,
      description: blog.description,
      images: blog.image_urls || [],
    },
    // 3. FACEBOOK FIX
    facebook: process.env.FB_APP_ID ? {
      appId: process.env.FB_APP_ID,
    } : undefined,
  };
}

export default async function BlogPage({ params }: BlogPageProps) {
  const { slug } = await params;
  
  // This call is now "free" because of the cache() above
  const blog = await getBlog(slug);

  if (!blog) {
    notFound();
  }

  // Pass data to the beautiful client view
  return <SingleBlogView blog={blog} />;
}