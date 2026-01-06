import ContactPage from "@/components/pages/contact_page";


import { generateSEO } from "@/lib/seo";

export const metadata = generateSEO({
  title: "Contact | Kasam Bhusal",
  description:
    "Reach out to connect, collaborate, or share ideas — I value curiosity, empathy, and community-minded conversations.",
});




export default function Projects() {
  return <ContactPage />;
}
