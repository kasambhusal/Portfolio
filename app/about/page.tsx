import AboutPage from "@/components/pages/about_page";

import { generateSEO } from "@/lib/seo";

export const metadata = generateSEO({
  title: "About | Kasam Bhusal",
  description:
    "From a public school in Nepal to building global tech: My journey, values, and vision for community-driven innovation.",
});




export default function Projects() {
  return <AboutPage />;
}
