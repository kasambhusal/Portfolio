import type { NextRequest } from "next/server"
import { verifyToken } from "./auth"

export async function validateBearerToken(request: NextRequest) {
  const authHeader = request.headers.get("authorization")

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return { valid: false, error: "No valid Bearer token provided" }
  }

  const token = authHeader.substring(7) // Remove "Bearer " prefix

  try {
    const payload = await verifyToken(token)
    return { valid: true, user: payload }
  } catch (error) {
    return { valid: false, error: "Invalid token" }
  }
}
