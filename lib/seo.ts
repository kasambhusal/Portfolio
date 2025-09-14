import type { Metadata } from "next"

interface SEOProps {
  title?: string
  description?: string
  image?: string
  url?: string
  type?: "website" | "article"
  publishedTime?: string
  modifiedTime?: string
  tags?: string[]
}

export function generateSEO({
  title = "Kasam Bhusal - Full Stack Developer & ML Enthusiast",
  description = "Portfolio of Kasam Bhusal - Full Stack Developer, Machine Learning Enthusiast, and People Connector. Showcasing projects, skills, and achievements.",
  image = "/og-image.png",
  url = "https://kasambhusal.com",
  type = "website",
  publishedTime,
  modifiedTime,
  tags,
}: SEOProps = {}): Metadata {
  const siteName = "Kasam Bhusal Portfolio"

  return {
    title,
    description,
    keywords: [
      "Kasam Bhusal",
      "Full Stack Developer",
      "Machine Learning",
      "ML Enthusiast",
      "Portfolio",
      "Web Development",
      "React",
      "Next.js",
      "Python",
      "JavaScript",
      "TypeScript",
      ...(tags || []),
    ].join(", "),
    authors: [{ name: "Kasam Bhusal", url: "mailto:developerkasam@gmail.com" }],
    creator: "Kasam Bhusal",
    publisher: "Kasam Bhusal",
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL("https://kasambhusal.com"),
    alternates: {
      canonical: url,
    },
    openGraph: {
      type,
      locale: "en_US",
      url,
      title,
      description,
      siteName,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime }),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      creator: "@kasambhusal",
      images: [image],
    },
    robots: {
      index: true,
      follow: true,
      nocache: false,
      googleBot: {
        index: true,
        follow: true,
        noimageindex: false,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    category: "technology",
  }
}

export function generateStructuredData(type: "person" | "website" | "article", data: any) {
  const baseUrl = "https://kasambhusal.com"

  switch (type) {
    case "person":
      return {
        "@context": "https://schema.org",
        "@type": "Person",
        name: "Kasam Bhusal",
        jobTitle: "Full Stack Developer",
        description: "Full Stack Developer, Machine Learning Enthusiast, and People Connector",
        url: baseUrl,
        email: "developerkasam@gmail.com",
        telephone: "+977 9860555866",
        sameAs: ["https://github.com/kasam", "https://linkedin.com/in/kasambhusal"],
        knowsAbout: ["Web Development", "Machine Learning", "React", "Next.js", "Python", "JavaScript", "TypeScript"],
        alumniOf: data?.education || [],
        worksFor: data?.companies || [],
      }

    case "website":
      return {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: "Kasam Bhusal Portfolio",
        description:
          "Portfolio of Kasam Bhusal - Full Stack Developer, Machine Learning Enthusiast, and People Connector",
        url: baseUrl,
        author: {
          "@type": "Person",
          name: "Kasam Bhusal",
        },
        potentialAction: {
          "@type": "SearchAction",
          target: `${baseUrl}/search?q={search_term_string}`,
          "query-input": "required name=search_term_string",
        },
      }

    case "article":
      return {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: data.title,
        description: data.description,
        image: data.image,
        author: {
          "@type": "Person",
          name: "Kasam Bhusal",
          url: baseUrl,
        },
        publisher: {
          "@type": "Person",
          name: "Kasam Bhusal",
        },
        datePublished: data.publishedTime,
        dateModified: data.modifiedTime || data.publishedTime,
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": data.url,
        },
        keywords: data.tags?.join(", "),
      }

    default:
      return null
  }
}
