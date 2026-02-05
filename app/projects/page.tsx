import { generateSEO } from "@/lib/seo";
import ProjectsPage from "@/components/pages/projects_page"; // This is now just the UI

// Keep your metadata exactly as is
export const metadata = generateSEO({
  title: "Projects | Kasam Bhusal",
  description:
    "Selected software and AI projects designed to make a meaningful impact in real-world communities.",
});

// Function to fetch data on the server
async function getProjects() {
  try {
    // NOTE: In Server Components, you usually need the full URL (e.g., http://localhost:3000/api...)
    // OR better yet, import your database logic directly here (e.g., prisma.project.findMany())
    // to avoid an API call to yourself. 
    
    // For now, I'll assume you switch to a direct DB call or have the absolute URL.
    // const projects = await db.query(...) 
    
    // If you must use fetch, ensure the URL is absolute:
    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/public/projects`, {
      cache: 'no-store' // Ensures fresh data on every request
    });
    
    if (!res.ok) return [];
    
    const data = await res.json();
    return data.sort((a: any, b: any) => 
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );
  } catch (error) {
    console.error("Server fetch error:", error);
    return [];
  }
}

export default async function Projects() {
  const projects = await getProjects();
  
  // Pass the data down as props
  return <ProjectsPage initialProjects={projects} />;
}