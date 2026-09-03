import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  /*
   * Static export — required for GitHub Pages (no Node.js server).
   * All pages in this site are already statically generated, so this
   * is a zero-cost change: it just tells Next.js to write out plain
   * HTML/CSS/JS files into the `out/` directory on `next build`.
   */
  output: "export",

  /*
   * basePath + assetPrefix — required because the site is served from
   * a sub-path on GitHub Pages:
   *   https://manukayashan.github.io/SPEAR-2/
   * Without this, all asset URLs (/fonts, /_next/static/…) would 404.
   *
   * In local dev (NODE_ENV !== "production") we leave these unset so
   * `http://localhost:3000` continues to work normally.
   */
  basePath: isProd ? "/SPEAR-2" : "",
  assetPrefix: isProd ? "/SPEAR-2/" : "",

  /*
   * Trailing slash — GitHub Pages resolves /about → /about/index.html,
   * not /about.html, so trailingSlash:true matches that expectation.
   */
  trailingSlash: true,

  images: {
    /*
     * next/image's default Image Optimization API requires a server.
     * Static export mode needs unoptimized:true (raw <img> tags).
     * Images on this site are all SVGs or generated from lucide-react,
     * so no quality loss occurs.
     */
    unoptimized: true,
    formats: ["image/avif", "image/webp"],
  },

  experimental: {},
};

export default nextConfig;
