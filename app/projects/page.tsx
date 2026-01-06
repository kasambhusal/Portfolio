import { generateSEO } from "@/lib/seo";
import ProjectsPage from "@/components/pages/projects_page"; // client component

export const metadata = generateSEO({
  title: "Projects | Kasam Bhusal",
  description:
    "Selected software and AI projects designed to make a meaningful impact in real-world communities.",
});

export default function Projects() {
  return <ProjectsPage />; // client stuff lives here
}
