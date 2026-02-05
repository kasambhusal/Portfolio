import { generateSEO } from "@/lib/seo";
import SkillsPage from "@/components/pages/skills_page";


export const metadata = generateSEO({
  title: "Skills | Kasam Bhusal",
  description:
    "A curated overview of my technical and analytical skills, focused on web development, AI, and problem-solving for communities.",
});

async function getSkillsAndAwards() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;
  
  try {
    const [skillsRes, awardsRes] = await Promise.all([
      fetch(`${baseUrl}/api/public/skills`, { next: { revalidate: 3600 } }),
      fetch(`${baseUrl}/api/public/awards`, { next: { revalidate: 3600 } })
    ]);

    const skills = skillsRes.ok ? await skillsRes.json() : [];
    const awards = awardsRes.ok ? await awardsRes.json() : [];

    return { 
      // Reversing skills here on the server as per your original logic
      skills: Array.isArray(skills) ? [...skills].reverse() : [], 
      awards: Array.isArray(awards) ? awards : [] 
    };
  } catch (error) {
    console.error("Data fetch error:", error);
    return { skills: [], awards: [] };
  }
}

export default async function Skills() {
  const data = await getSkillsAndAwards();
  
  return <SkillsPage initialSkills={data.skills} initialAwards={data.awards} />;
}