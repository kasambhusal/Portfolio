// components/scroll-to-top.tsx
"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    // This executes every time the pathname (URL) changes
    window.scrollTo(0, 0);
  }, [pathname]);

  return null; // This component doesn't render anything
}