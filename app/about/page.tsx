import AboutPage from "@/components/pages/about_page";

import { generateSEO } from "@/lib/seo";

export const metadata = generateSEO({
  title: "About | Kasam Bhusal",
  description:
    "Learn about my journey as a curious technologist and AI enthusiast, committed to learning, growing, and serving others.",
});




export default function Projects() {
  return <AboutPage />;
}
