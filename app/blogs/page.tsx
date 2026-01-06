import { generateSEO } from "@/lib/seo";
import BlogsPage from "@/components/pages/blogs_page"; // client component

export const metadata = generateSEO({
  title: "Blogs | Kasam Bhusal",
  description:
    "Thoughts and insights on technology, AI, and human-centered solutions, written to inspire and share knowledge.",
});


export default function Projects() {
  return <BlogsPage />;
}
