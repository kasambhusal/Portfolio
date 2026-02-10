
import { generateSEO } from "@/lib/seo";
import SkillsPage from "@/components/pages/skills_page";
import { db } from "@/lib/db"; // Import the db object directly

export const metadata = generateSEO({
  title: "Skills | Kasam Bhusal",
  description:
  "A curated overview of my technical and analytical skills, focused on web development, AI, and problem-solving for communities.",
});


interface Skill {
  id: number;
  name: string;
  category?: string;
  proficiency_level: number;
  created_at: string;
  updated_at: string;
}

interface AwardType {
  id: number;
  title: string;
  description?: string;
  date_received?: string;
  organization?: string;
  created_at: string;
  updated_at: string;
}

export const revalidate = 3600; 
export default async function Skills() {
  try {
    // 1. Direct Database Calls (Fast & No Timeout)
    // We use Promise.all to fetch both skills and awards simultaneously
    const [skills, awards] = await Promise.all([
      db.getSkills(),
      db.getAwards()
    ]);

    // 2. Data Transformation
    // Your original logic: reverse the skills array
    const formattedSkills = (Array.isArray(skills) ? [...skills].reverse() : []) as Skill[];
    const formattedAwards = (Array.isArray(awards) ? awards : []) as AwardType[];
    console.log("Fetched Skills:", formattedSkills);
    console.log("Fetched Awards:", formattedAwards);
    // 3. Render the Client Component
    return (
      <SkillsPage 
        initialSkills={formattedSkills} 
        initialAwards={formattedAwards} 
      />
    );
  } catch (error) {
    console.error("Database fetch error:", error);
    // Fallback to empty arrays if the DB is down
    return <SkillsPage initialSkills={[]} initialAwards={[]} />;
  }
}