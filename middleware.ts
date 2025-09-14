import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { verifyToken } from "./lib/auth"

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Protect admin routes
  if (pathname.startsWith("/admin")) {
    // Allow access to login page
    if (pathname === "/admin/login") {
      return NextResponse.next()
    }

    // Check for auth token
    const token = request.cookies.get("auth-token")?.value

    if (!token) {
      return NextResponse.redirect(new URL("/admin/login", request.url))
    }

    // Verify token
    const user = await verifyToken(token)
    if (!user) {
      const response = NextResponse.redirect(new URL("/admin/login", request.url))
      response.cookies.delete("auth-token")
      return response
    }

    // Add user info to headers for API routes
    const requestHeaders = new Headers(request.headers)
    requestHeaders.set("x-user-id", user.id.toString())
    requestHeaders.set("x-username", user.username)

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    })
  }

  // Protect API routes
  if (pathname.startsWith("/api/admin")) {
    const token = request.cookies.get("auth-token")?.value

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const user = await verifyToken(token)
    if (!user) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 })
    }

    // Add user info to headers
    const requestHeaders = new Headers(request.headers)
    requestHeaders.set("x-user-id", user.id.toString())
    requestHeaders.set("x-username", user.username)

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    })
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
}
