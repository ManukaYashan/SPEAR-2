import type { Metadata } from "next";
import { Fraunces, Manrope } from "next/font/google";
import Script from "next/script";
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
      <body className="antialiased">
        {children}

        {/* Apollo website tracker */}
        <Script id="apollo-tracker" strategy="afterInteractive">
          {`function initApollo(){var n=Math.random().toString(36).substring(7),o=document.createElement("script");o.src="https://assets.apollo.io/micro/website-tracker/tracker.iife.js?nocache="+n,o.async=!0,o.defer=!0,o.onload=function(){window.trackingFunctions.onLoad({appId:"6a9a54407695da0014cb22f4"})},document.head.appendChild(o)}initApollo();`}
        </Script>

        {/* Apollo inbound form enrichment */}
        <Script id="apollo-form-enrichment" strategy="afterInteractive">
          {`(function initApolloInbound(){var TIMEOUT_MS=15000;var timeoutId;var style=document.createElement('style');style.id='apollo-form-prehide-css';style.textContent='form:has(input[type="email" i]),form:has(input[name="email" i]),.hs-form-iframe{position:relative!important}form:has(input[type="email" i])::before,form:has(input[name="email" i])::before,.hs-form-iframe::before{content:"";position:absolute;inset:0;display:flex;align-items:center;justify-content:center;width:50px;height:50px;margin:auto;border:2.5px solid #e1e1e1;border-top:2.5px solid #9ea3a6;border-radius:50%;animation:spin 1s linear infinite;background-color:transparent;pointer-events:auto;z-index:999999;opacity:1}form:has(input[type="email" i]) *,form:has(input[name="email" i]) *,.hs-form-iframe *{opacity:0!important;user-select:none!important;pointer-events:none!important}@keyframes spin{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}';(document.head || document.documentElement).appendChild(style);function cleanup(){var styleEl=document.getElementById('apollo-form-prehide-css');if(styleEl)styleEl.remove();if(timeoutId)clearTimeout(timeoutId);}timeoutId=setTimeout(function(){console.warn('[Apollo] Form enrichment timeout after 15s - revealing forms. Check network and console for errors.');cleanup();},TIMEOUT_MS);var nocache=Math.random().toString(36).substring(7);var script=document.createElement('script');script.src='https://assets.apollo.io/js/apollo-inbound.js?nocache=' + nocache;script.defer=true;script.onerror=function(){console.error('[Apollo] Failed to load form enrichment script');cleanup();};script.onload=function(){try{window.ApolloInbound.formEnrichment.init({appId: '6a9a58db485a3a001c564c63',onReady: function(){cleanup();},onError: function(err){console.error('[Apollo] Form enrichment init error:',err);cleanup();}});}catch(err){console.error('[Apollo] Error initializing form enrichment:',err);cleanup();}};document.head.appendChild(script);})();`}
        </Script>
      </body>
    </html>
  );
}
