// Simple in-memory cache with TTL for performance optimization
interface CacheItem {
  data: any
  timestamp: number
  ttl: number
}

class SimpleCache {
  private cache = new Map<string, CacheItem>()

  set(key: string, data: any, ttlSeconds = 300) {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl: ttlSeconds * 1000,
    })
  }

  get(key: string) {
    const item = this.cache.get(key)
    if (!item) return null

    if (Date.now() - item.timestamp > item.ttl) {
      this.cache.delete(key)
      return null
    }

    return item.data
  }

  invalidate(pattern?: string) {
    if (pattern) {
      // Invalidate keys matching pattern
      for (const key of this.cache.keys()) {
        if (key.includes(pattern)) {
          this.cache.delete(key)
        }
      }
    } else {
      // Clear all cache
      this.cache.clear()
    }
  }
}

export const cache = new SimpleCache()

// Cache keys
export const CACHE_KEYS = {
  PROJECTS: "projects",
  BLOGS: "blogs",
  COMPANIES: "companies",
  SKILLS: "skills",
  AWARDS: "awards",
  TESTIMONIALS: "testimonials",
}
