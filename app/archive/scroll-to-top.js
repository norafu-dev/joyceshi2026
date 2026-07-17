"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function ArchiveScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname !== "/archive") {
      return;
    }

    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
