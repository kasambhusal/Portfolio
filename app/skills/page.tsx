import { generateSEO } from "@/lib/seo";
import SkillsPage from "@/components/pages/skills_page";


export const metadata = generateSEO({
  title: "Skills | Kasam Bhusal",
  description:
    "A curated overview of my technical and analytical skills, focused on web development, AI, and problem-solving for communities.",
});



export default function Projects() {
  return <SkillsPage />;
}
