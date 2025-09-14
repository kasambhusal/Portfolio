import bcrypt from "bcryptjs"
import { db } from "./db"

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key-change-this"

export interface AuthUser {
  id: number
  username: string
  email: string
}

// Simple JWT implementation using built-in crypto
function base64UrlEncode(str: string): string {
  return Buffer.from(str).toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "")
}

function base64UrlDecode(str: string): string {
  str += new Array(5 - (str.length % 4)).join("=")
  return Buffer.from(str.replace(/-/g, "+").replace(/_/g, "/"), "base64").toString()
}

// Hash password
export async function hashPassword(password: string): Promise<string> {
  return await bcrypt.hash(password, 12)
}

// Verify password
export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return await bcrypt.compare(password, hashedPassword)
}

// Create JWT token
export async function createToken(user: AuthUser): Promise<string> {
  const header = {
    alg: "HS256",
    typ: "JWT",
  }

  const payload = {
    id: user.id,
    username: user.username,
    email: user.email,
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60, // 24 hours
  }

  const encodedHeader = base64UrlEncode(JSON.stringify(header))
  const encodedPayload = base64UrlEncode(JSON.stringify(payload))

  const crypto = await import("crypto")
  const signature = crypto
    .createHmac("sha256", JWT_SECRET)
    .update(`${encodedHeader}.${encodedPayload}`)
    .digest("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=/g, "")

  return `${encodedHeader}.${encodedPayload}.${signature}`
}

// Verify JWT token
export async function verifyToken(token: string): Promise<AuthUser | null> {
  try {
    const [encodedHeader, encodedPayload, signature] = token.split(".")

    if (!encodedHeader || !encodedPayload || !signature) {
      return null
    }

    // Verify signature
    const crypto = await import("crypto")
    const expectedSignature = crypto
      .createHmac("sha256", JWT_SECRET)
      .update(`${encodedHeader}.${encodedPayload}`)
      .digest("base64")
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=/g, "")

    if (signature !== expectedSignature) {
      return null
    }

    // Decode payload
    const payload = JSON.parse(base64UrlDecode(encodedPayload))

    // Check expiration
    if (payload.exp && payload.exp < Math.floor(Date.now() / 1000)) {
      return null
    }

    return {
      id: payload.id,
      username: payload.username,
      email: payload.email,
    }
  } catch {
    return null
  }
}

// Authenticate user
export async function authenticateUser(username: string, password: string): Promise<AuthUser | null> {
  try {
    const user = await db.getAdminUser(username)
    if (!user) return null

    const isValid = await verifyPassword(password, user.password_hash)
    if (!isValid) return null

    // Update last login
    await db.updateLastLogin(username)

    return {
      id: user.id,
      username: user.username,
      email: user.email,
    }
  } catch (error) {
    console.error("Authentication error:", error)
    return null
  }
}

// Rate limiting store (in production, use Redis or similar)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>()

export function checkRateLimit(ip: string, maxAttempts = 5, windowMs = 15 * 60 * 1000): boolean {
  const now = Date.now()
  const key = `login_${ip}`
  const record = rateLimitStore.get(key)

  if (!record || now > record.resetTime) {
    rateLimitStore.set(key, { count: 1, resetTime: now + windowMs })
    return true
  }

  if (record.count >= maxAttempts) {
    return false
  }

  record.count++
  return true
}
