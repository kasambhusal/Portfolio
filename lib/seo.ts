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
  title = "Mr. Kasam | Curious Technologist & AI Learner",
  description = "Mr. Kasam is a curious technologist and AI learner exploring software and human-centered technology. Personal portfolio, projects, and journey.",
  image = "/kasam-picture.png",
  url = "https://kasambhusal.com.np",
  type = "website",
  publishedTime,
  modifiedTime,
  tags,
}: SEOProps = {}): Metadata {
  const siteName = "Mr. Kasam Portfolio"

  return {
    title,
    description,
    keywords: [
      "Mr. Kasam",
      "Kasam Bhusal",
      "Kasam",
      "Bhusal",
      "Nepal Developer",
      "Full Stack Developer",
      ...(tags || []),
    ].join(", "),
    authors: [{ name: "Kasam Bhusal", url: "mailto:developerkasam@gmail.com" }],
    creator: "Mr. Kasam",
    publisher: "Mr. Kasam",
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL(url),
    alternates: {
      canonical: url,
    },
    icons: {
      icon: "/favicon.ico",
      apple: "/apple-touch-icon.png",
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
          height: 1200,
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
      creator: "@KasamB86962",
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

export function generateStructuredData(
  type: "person" | "website" | "article",
  data: any = {}
) {
  const baseUrl = "https://kasambhusal.com.np"

  switch (type) {
    case "person":
      return {
        "@context": "https://schema.org",
        "@type": "Person",
        name: "Mr. Kasam",
        jobTitle: "Full Stack Developer & AI Learner",
        description:
          "Mr. Kasam is a curious technologist and AI learner exploring software and human-centered technology.",
        url: baseUrl,
        email: "developerkasam@gmail.com",
        telephone: "+9779743492229",
        sameAs: [
          "https://github.com/kasambhusal",
          "https://www.linkedin.com/in/kasam-bhusal/",
        ],
        knowsAbout: [
          "Software Development",
          "Machine Learning",
          "AI",
          "MERN",
          "Social Media Marketing",
          "AI Automation",
          "SEO",
          "Business Growth",
        ],
        alumniOf: data?.education || [],
        worksFor: data?.companies || [],
      }

    case "website":
      return {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: "Mr. Kasam Portfolio",
        description:
          "Mr. Kasam Portfolio - Full Stack Developer, AI Learner, and Human-Centered Technologist.",
        url: baseUrl,
        author: {
          "@type": "Person",
          name: "Mr. Kasam",
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
          name: "Mr. Kasam",
          url: baseUrl,
        },
        publisher: {
          "@type": "Person",
          name: "Mr. Kasam",
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
