/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://spearplatform.com",
  generateRobotsTxt: true, // generates robots.txt too
  robotsTxtOptions: {
    policies: [{ userAgent: "*", allow: "/" }],
  },
  outDir: "./public",
  changefreq: "weekly",
  priority: 0.7,
};
