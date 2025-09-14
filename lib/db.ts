import { neon } from "@neondatabase/serverless"

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not set")
}

// Create a reusable SQL client
export const sql = neon(process.env.DATABASE_URL)

// Database query functions
export const db = {
  // Projects
  async getProjects() {
    return await sql`SELECT * FROM projects ORDER BY created_at DESC`
  },

  async getProject(id: number) {
    const result = await sql`SELECT * FROM projects WHERE id = ${id}`
    return result[0]
  },

  async createProject(data: { title: string; description: string; image_url?: string; project_link?: string }) {
    const result = await sql`
      INSERT INTO projects (title, description, image_url, project_link, updated_at)
      VALUES (${data.title}, ${data.description}, ${data.image_url || null}, ${data.project_link || null}, NOW())
      RETURNING *
    `
    return result[0]
  },

  async updateProject(
    id: number,
    data: { title: string; description: string; image_url?: string; project_link?: string },
  ) {
    const result = await sql`
      UPDATE projects 
      SET title = ${data.title}, description = ${data.description}, 
          image_url = ${data.image_url || null}, project_link = ${data.project_link || null}, 
          updated_at = NOW()
      WHERE id = ${id}
      RETURNING *
    `
    return result[0]
  },

  async deleteProject(id: number) {
    await sql`DELETE FROM projects WHERE id = ${id}`
  },

 // Blogs
async getBlogs({ limit, offset }: { limit: number; offset: number }) {
  return await sql`
    SELECT * FROM blogs 
    ORDER BY created_at DESC 
    LIMIT ${limit} OFFSET ${offset}
  `
},
async countBlogs() {
  const result = await sql`SELECT COUNT(*)::int AS count FROM blogs`
  return result[0].count
},
  async getBlog(slug: string) {
    const result = await sql`SELECT * FROM blogs WHERE slug = ${slug}`
    return result[0]
  },

  async createBlog(data: {
    title: string
    description: string
    content?: string
    image_urls?: string[]
    tags?: string[]
    slug: string
  }) {
    const result = await sql`
      INSERT INTO blogs (title, description, content, image_urls, tags, slug, updated_at)
      VALUES (${data.title}, ${data.description}, ${data.content || ""}, ${data.image_urls || []}, ${data.tags || []}, ${data.slug}, NOW())
      RETURNING *
    `
    return result[0]
  },

  async updateBlog(
    id: number,
    data: {
      title: string
      description: string
      content?: string
      image_urls?: string[]
      tags?: string[]
      slug: string
    },
  ) {
    const result = await sql`
      UPDATE blogs 
      SET title = ${data.title}, description = ${data.description}, content = ${data.content || ""}, 
          image_urls = ${data.image_urls || []}, tags = ${data.tags || []}, slug = ${data.slug}, updated_at = NOW()
      WHERE id = ${id}
      RETURNING *
    `
    return result[0]
  },

  async deleteBlog(id: number) {
    await sql`DELETE FROM blogs WHERE id = ${id}`
  },

  // Companies
  async getCompanies() {
    return await sql`SELECT * FROM companies ORDER BY created_at DESC`
  },

  async createCompany(data: { name: string; image_url: string; website_link?: string }) {
    const result = await sql`
      INSERT INTO companies (name, image_url, website_link, updated_at)
      VALUES (${data.name}, ${data.image_url}, ${data.website_link || null}, NOW())
      RETURNING *
    `
    return result[0]
  },

  async updateCompany(id: number, data: { name: string; image_url: string; website_link?: string }) {
    const result = await sql`
      UPDATE companies 
      SET name = ${data.name}, image_url = ${data.image_url}, website_link = ${data.website_link || null}, updated_at = NOW()
      WHERE id = ${id}
      RETURNING *
    `
    return result[0]
  },

  async deleteCompany(id: number) {
    await sql`DELETE FROM companies WHERE id = ${id}`
  },

  // Skills
  async getSkills() {
    return await sql`SELECT * FROM skills ORDER BY category, proficiency_level DESC`
  },

  async createSkill(data: { name: string; category?: string; proficiency_level?: number }) {
    const result = await sql`
      INSERT INTO skills (name, category, proficiency_level, updated_at)
      VALUES (${data.name}, ${data.category || null}, ${data.proficiency_level || 5}, NOW())
      RETURNING *
    `
    return result[0]
  },

  async updateSkill(id: number, data: { name: string; category?: string; proficiency_level?: number }) {
    const result = await sql`
      UPDATE skills 
      SET name = ${data.name}, category = ${data.category || null}, proficiency_level = ${data.proficiency_level || 5}, updated_at = NOW()
      WHERE id = ${id}
      RETURNING *
    `
    return result[0]
  },

  async deleteSkill(id: number) {
    await sql`DELETE FROM skills WHERE id = ${id}`
  },

  // Awards
  async getAwards() {
    return await sql`SELECT * FROM awards ORDER BY date_received DESC`
  },

  async createAward(data: { title: string; description?: string; date_received?: string; organization?: string }) {
    const result = await sql`
      INSERT INTO awards (title, description, date_received, organization, updated_at)
      VALUES (${data.title}, ${data.description || null}, ${data.date_received || null}, ${data.organization || null}, NOW())
      RETURNING *
    `
    return result[0]
  },

  async updateAward(
    id: number,
    data: { title: string; description?: string; date_received?: string; organization?: string },
  ) {
    const result = await sql`
      UPDATE awards 
      SET title = ${data.title}, description = ${data.description || null}, 
          date_received = ${data.date_received || null}, organization = ${data.organization || null}, updated_at = NOW()
      WHERE id = ${id}
      RETURNING *
    `
    return result[0]
  },

  async deleteAward(id: number) {
    await sql`DELETE FROM awards WHERE id = ${id}`
  },

  // Testimonials
  async getTestimonials() {
    return await sql`SELECT * FROM testimonials ORDER BY created_at DESC`
  },

  async createTestimonial(data: {
    name: string
    designation?: string
    company?: string
    image_url?: string
    description: string
    rating?: number
  }) {
    const result = await sql`
      INSERT INTO testimonials (name, designation, company, image_url, description, rating, updated_at)
      VALUES (${data.name}, ${data.designation || null}, ${data.company || null}, ${data.image_url || null}, ${data.description}, ${data.rating || 5}, NOW())
      RETURNING *
    `
    return result[0]
  },

  async updateTestimonial(
    id: number,
    data: {
      name: string
      designation?: string
      company?: string
      image_url?: string
      description: string
      rating?: number
    },
  ) {
    const result = await sql`
      UPDATE testimonials 
      SET name = ${data.name}, designation = ${data.designation || null}, company = ${data.company || null}, 
          image_url = ${data.image_url || null}, description = ${data.description}, rating = ${data.rating || 5}, updated_at = NOW()
      WHERE id = ${id}
      RETURNING *
    `
    return result[0]
  },

  async deleteTestimonial(id: number) {
    await sql`DELETE FROM testimonials WHERE id = ${id}`
  },

  // Admin
  async getAdminUser(username: string) {
    const result = await sql`SELECT * FROM admin_users WHERE username = ${username}`
    return result[0]
  },

  async updateLastLogin(username: string) {
    await sql`UPDATE admin_users SET last_login = NOW() WHERE username = ${username}`
  },
}

export const adminAuth = {
  // Hardcoded admin credentials for simplicity
  ADMIN_USERNAME: "admin",
  ADMIN_EMAIL: "developerkasam@gmail.com",
  ADMIN_PASSWORD: "SecureAdmin123!",

  async validateAdmin(username: string, password: string) {
    return username === this.ADMIN_USERNAME && password === this.ADMIN_PASSWORD
  },

  getAdminUser() {
    return {
      id: 1,
      username: this.ADMIN_USERNAME,
      email: this.ADMIN_EMAIL,
    }
  },
}
