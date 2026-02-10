import { db } from "@/lib/db"; // Or however you connect to your DB (Prisma/Neon)

export async function getSkills() {
  // Copy the logic from your API route here
  const skills = await db.getSkills(); 
  return skills;
}

export async function getAwards() {
  // Copy the logic from your API route here
  const awards = await db.getAwards();
  return awards;
}