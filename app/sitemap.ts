import type { MetadataRoute } from "next"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://kasambhusal.com"

  const routes = ["", "/projects", "/blogs", "/skills", "/about", "/contact"]

  const staticPages = routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : ("monthly" as const),
    priority: route === "" ? 1 : 0.8,
  }))

  // TODO: Add dynamic blog pages from database
  // const blogPages = await getBlogSlugs().then(slugs =>
  //   slugs.map(slug => ({
  //     url: `${baseUrl}/blogs/${slug}`,
  //     lastModified: new Date(),
  //     changeFrequency: "monthly" as const,
  //     priority: 0.6,
  //   }))
  // )

  return [...staticPages]
}
