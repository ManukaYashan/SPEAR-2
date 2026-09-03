import type { Metadata } from "next";
import { Fraunces, Manrope } from "next/font/google";
import "./globals.css";

/* ============================================================
   FONTS — loaded via next/font/google for optimal performance
   ============================================================ */
const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  weight: "variable",
  style: ["normal", "italic"],
  axes: ["opsz", "SOFT", "WONK"],
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

/* ============================================================
   GLOBAL METADATA DEFAULTS
   (per-page metadata in each page.tsx overrides these)
   ============================================================ */
export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://spearplatform.com"
  ),
  title: {
    default: "SPEAR — Smart Platform for Every Accommodation & Restaurant",
    template: "%s | SPEAR",
  },
  description:
    "SPEAR is a B2B hospitality SaaS platform unifying hotel booking, restaurant table management, POS, kitchen inventory, and channel management into one system.",
  keywords: [
    "hospitality software",
    "hotel management system",
    "restaurant POS",
    "channel manager",
    "property management system",
    "hotel booking engine",
    "restaurant reservation software",
    "kitchen inventory management",
  ],
  authors: [{ name: "SPEAR" }],
  creator: "SPEAR",
  publisher: "SPEAR",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "SPEAR",
    title: "SPEAR — Smart Platform for Every Accommodation & Restaurant",
    description:
      "One platform for every reservation, every table, every guest. SPEAR unifies hotel booking, restaurant management, POS, and channel distribution.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "SPEAR — Smart Platform for Every Accommodation & Restaurant",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SPEAR — Smart Platform for Every Accommodation & Restaurant",
    description:
      "One platform for every reservation, every table, every guest.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

/* ============================================================
   ORGANIZATION JSON-LD — sitewide structured data
   ============================================================ */
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "SPEAR",
  description:
    "Smart Platform for Every Accommodation & Restaurant — B2B hospitality SaaS platform unifying hotel booking, restaurant management, POS, and channel distribution.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://spearplatform.com",
  logo: {
    "@type": "ImageObject",
    url: `${process.env.NEXT_PUBLIC_SITE_URL || "https://spearplatform.com"}/og-image.jpg`,
  },
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "sales",
    email: "hello@spearplatform.com",
  },
};

/* ============================================================
   ROOT LAYOUT
   ============================================================ */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${manrope.variable}`}
    >
      <head>
        {/* Organization JSON-LD — present on every page */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
