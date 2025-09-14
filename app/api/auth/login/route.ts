import { type NextRequest, NextResponse } from "next/server"
import { createToken, checkRateLimit } from "@/lib/auth"
import { adminAuth } from "@/lib/db"

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json()

    // Get client IP for rate limiting
    const ip = request.headers.get("x-forwarded-for") || "unknown"

    // Check rate limit
    if (!checkRateLimit(ip)) {
      return NextResponse.json({ error: "Too many login attempts. Please try again later." }, { status: 429 })
    }

    // Validate input
    if (!username || !password) {
      return NextResponse.json({ error: "Username and password are required" }, { status: 400 })
    }

    const isValidAdmin = await adminAuth.validateAdmin(username, password)
    if (!isValidAdmin) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    const user = adminAuth.getAdminUser()

    // Create JWT token
    const token = await createToken(user)

    const response = NextResponse.json({
      success: true,
      user: { username: user.username, email: user.email },
      token: token, // Return token in response body
    })

    response.cookies.set("auth-token", token, {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production", // false on localhost
  sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
  maxAge: 60 * 24 * 60 * 60, // 60 days
  path: "/",
});


    return response
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
