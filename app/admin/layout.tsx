"use client";

import type React from "react";
import { usePathname } from "next/navigation";
import { ProtectedRoute } from "@/components/protected-route";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const isLoginPage = pathname === "/admin/login";

  if (isLoginPage) {
    return children; // ✅ login page should be public
  }

  return <ProtectedRoute>{children}</ProtectedRoute>;
}
