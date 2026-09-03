import type { Metadata } from "next";
import NavBar from "@/components/ui/NavBar";
import Footer from "@/components/ui/Footer";
import Hero from "@/components/sections/Hero";
import HorizontalModuleStory from "@/components/sections/HorizontalModuleStory";
import HowItWorks from "@/components/sections/HowItWorks";
import WhyWeBuilt from "@/components/sections/WhyWeBuilt";
import Pricing from "@/components/sections/Pricing";
import BookADemo from "@/components/sections/BookADemo";

/* ============================================================
   PAGE-LEVEL METADATA
   (overrides root layout defaults for the homepage)
   ============================================================ */
export const metadata: Metadata = {
  title: "SPEAR — Smart Platform for Every Accommodation & Restaurant",
  description:
    "One platform for every reservation, every table, every guest. SPEAR unifies hotel direct booking, PMS, restaurant floor plans, POS, kitchen inventory, and channel management for hospitality operators.",
  openGraph: {
    title: "SPEAR — Smart Platform for Every Accommodation & Restaurant",
    description:
      "One platform for every reservation, every table, every guest. Direct booking, hotel PMS, restaurant management, POS, and channel manager — all in one.",
    url: "/",
  },
};

/* ============================================================
   SoftwareApplication JSON-LD — homepage only
   ============================================================ */
const softwareAppSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "SPEAR",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  description:
    "Smart Platform for Every Accommodation & Restaurant. One platform for every reservation, every table, every guest.",
  offers: [
    {
      "@type": "Offer",
      name: "Starter",
      price: "199",
      priceCurrency: "USD",
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: "199",
        priceCurrency: "USD",
        unitCode: "MON",
      },
    },
    {
      "@type": "Offer",
      name: "Growth",
      price: "499",
      priceCurrency: "USD",
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: "499",
        priceCurrency: "USD",
        unitCode: "MON",
      },
    },
    {
      "@type": "Offer",
      name: "Enterprise",
      description: "Custom pricing — contact us",
    },
  ],
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://spearplatform.com",
};

/* ============================================================
   PAGE COMPONENT
   ============================================================ */
export default function HomePage() {
  return (
    <>
      {/* SoftwareApplication JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(softwareAppSchema),
        }}
      />

      {/* Fixed navigation bar — rendered above all sections */}
      <NavBar />

      <main id="main-content" tabIndex={-1}>
        {/*
         * SECTION 1: Hero (Mode A)
         * Contains the single <h1> for this page.
         */}
        <Hero />

        {/*
         * SECTION 2: Horizontal Module Story (Mode A)
         * GSAP ScrollTrigger on desktop, Framer Motion carousel on mobile,
         * plain stacked cards if prefers-reduced-motion is set.
         * Module titles are <h2>s for correct DOM heading hierarchy.
         */}
        <HorizontalModuleStory />

        {/*
         * SECTION 3+: Normal vertical scroll (Mode B — parchment background)
         */}
        <div id="product">
          <HowItWorks />
        </div>

        <WhyWeBuilt />

        <Pricing />

        <BookADemo />
      </main>

      <Footer />
    </>
  );
}
