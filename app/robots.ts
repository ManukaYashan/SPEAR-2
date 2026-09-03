import type { MetadataRoute } from "next";

// Required for Next.js static export (output: 'export')
export const dynamic = "force-static";

/**
 * Next.js 15 built-in robots.txt generation.
 * Generates /robots.txt at build time — allows full crawling.
 */
export default function robots(): MetadataRoute.Robots {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://spearplatform.com";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
