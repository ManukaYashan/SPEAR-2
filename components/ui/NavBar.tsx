"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";


const NAV_LINKS = [
  { label: "Product", href: "#product" },
  { label: "Pricing", href: "#pricing" },
  { label: "About", href: "#about" },
];

/*
  Part 3 fix — what was wrong:
  ─────────────────────────────────────────────────────────────────
  • px-6 / lg:px-10 on the nav inner container is narrower than the
    site's content gutter (2rem / max-w-6xl used in all sections).
    The nav felt inset while section content appeared wider.
  • h-16 / h-18 used Tailwind height shorthand which rendered as 4rem/4.5rem
    — fine, but the Tailwind `h-18` class may not exist in v4 (only h-16, h-20).
  • Nav links used gap-8 (2rem) but visually read as inconsistent because the
    CTA button's left margin wasn't in the same rhythm.

  Fixes applied:
  • Inner nav container uses max-w-[1152px] with px-8 (2rem each side) —
    matching the max-w-6xl (1152px) used across sections.
  • Explicit height: 72px (matches a comfortable navbar height).
  • Nav links use gap-10 (2.5rem) for consistent, generous spacing.
  • All three items (logo, links, CTA) are inside a single flex row with
    items-center so they share the same vertical center line by definition.
*/
export default function NavBar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [inHorizontalSection, setInHorizontalSection] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });

    const hSection = document.getElementById("module-story");
    if (hSection) {
      observerRef.current = new IntersectionObserver(
        ([entry]) => setInHorizontalSection(entry.isIntersecting),
        { threshold: 0.05 }
      );
      observerRef.current.observe(hSection);
    }

    return () => {
      window.removeEventListener("scroll", onScroll);
      observerRef.current?.disconnect();
    };
  }, []);

  const bgStyle: React.CSSProperties = inHorizontalSection
    ? {
      background: "rgba(30,23,18,0.7)",
      backdropFilter: "blur(12px)",
      WebkitBackdropFilter: "blur(12px)",
      borderBottom: "1px solid rgba(199,154,69,0.12)",
    }
    : isScrolled
      ? {
        background: "rgba(30,23,18,0.96)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        borderBottom: "1px solid rgba(199,154,69,0.1)",
        boxShadow: "0 2px 20px rgba(0,0,0,0.4)",
      }
      : {
        background: "transparent",
        borderBottom: "1px solid transparent",
      };

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        transition: "background 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease",
        ...bgStyle,
      }}
      role="banner"
    >
      <nav
        style={{
          /*
           * max-w-6xl (1152px) matches every other section's content width.
           * px: 2rem (32px) each side — the site's standard gutter.
           * height: 72px — comfortable, not cramped.
           */
          maxWidth: 1152,
          margin: "0 auto",
          padding: "0 2rem",
          height: 72,
          display: "flex",
          alignItems: "center",        // everything on the same vertical center line
          justifyContent: "space-between",
        }}
        aria-label="Primary navigation"
      >
        {/* Logo — real PNG, height 38px to fit 72px navbar */}
        <Link
          href="/"
          style={{ display: "flex", alignItems: "center", textDecoration: "none", flexShrink: 0 }}
          aria-label="SPEAR — go to homepage"
        >
          <Image
            src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/logo/nav%20logo.png`}
            alt="SPEAR"
            width={160}
            height={60}
            priority
            style={{ height: 38, width: "auto", objectFit: "contain" }}
          />
        </Link>

        {/* Nav links — hidden on mobile */}
        <ul
          style={{
            display: "flex",
            alignItems: "center",
            gap: "2.5rem",   // consistent 40px between links
            listStyle: "none",
            margin: 0,
            padding: 0,
          }}
          className="nav-links"
          role="list"
        >
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                style={{
                  fontFamily: "var(--font-manrope), system-ui, sans-serif",
                  fontSize: "0.8rem",
                  fontWeight: 600,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "#B5A99A",
                  textDecoration: "none",
                  transition: "color 0.2s ease",
                  lineHeight: 1,
                }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLAnchorElement).style.color = "#F3ECE0")
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLAnchorElement).style.color = "#B5A99A")
                }
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <a
          href="#book-a-demo"
          className="btn-brass nav-cta"
          id="nav-book-demo-cta"
          aria-label="Book a demo with SPEAR"
          style={{ flexShrink: 0 }}
        >
          Book a Demo
        </a>
      </nav>
    </header>
  );
}
