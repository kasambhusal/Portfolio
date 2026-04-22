import { generateSEO } from "@/lib/seo";
import BlogsPage from "@/components/pages/blogs_page";

export const metadata = generateSEO({
  title: "Blogs | Mr. Kasam",
  description:
    "Thoughts and insights on technology, AI, and human-centered solutions, written to inspire and share knowledge.",
});

// Fetch the initial batch (Page 1) on the server
async function getInitialBlogs() {
  try {
    // Replace with your actual absolute URL or DB call
    // const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/public/blogs?page=1&limit=9`, { 
    //   next: { revalidate: 60 } // Revalidate every minute
    // });
    
    // Simulating the fetch for now so it compiles for you
    const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/public/blogs?page=1&limit=9`, {
        cache: 'no-store'
    });

    if (!res.ok) return { data: [], pagination: { totalPages: 1 } };
    return await res.json();
  } catch (error) {
    console.error("Initial blog fetch failed:", error);
    return { data: [], pagination: { totalPages: 1 } };
  }
}

export default async function Blogs() {
  const initialData = await getInitialBlogs();
  
  return (
    <BlogsPage 
      initialBlogs={initialData.data || []} 
      initialTotalPages={initialData.pagination?.totalPages || 1} 
    />
  );
}