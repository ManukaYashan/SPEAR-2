"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { fadeUpVariant, fadeInVariant, staggerContainer } from "@/lib/motion-variants";

/** Scroll cue — vertical line + sliding dot + label */
function ScrollCueWidget() {
  return (
    <div
      className="flex flex-col items-center gap-3"
      role="presentation"
      aria-hidden="true"
    >
      {/* Vertical track + dot */}
      <div
        className="relative"
        style={{ width: 1, height: 60, background: "rgba(243,236,224,0.2)" }}
      >
        <span
          className="absolute top-0 left-1/2 -translate-x-1/2 scroll-dot"
          style={{
            width: 5,
            height: 5,
            borderRadius: "50%",
            background: "#C79A45",
            display: "block",
          }}
        />
      </div>
      <span
        className="text-[0.65rem] font-semibold tracking-[0.2em] uppercase"
        style={{
          color: "#7A6F63",
          fontFamily: "var(--font-manrope), system-ui, sans-serif",
        }}
      >
        Scroll to explore
      </span>
    </div>
  );
}

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const [scrollCueVisible, setScrollCueVisible] = useState(true);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    // Continuous observer — toggles cue based on hero visibility.
    // Re-shows the cue when the user scrolls back to the top.
    const observer = new IntersectionObserver(
      ([entry]) => {
        setScrollCueVisible(entry.intersectionRatio >= 0.2);
      },
      { threshold: [0, 0.2, 0.5, 1] }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      aria-label="SPEAR hero"
      className="relative flex flex-col items-center justify-center text-center"
      style={{
        minHeight: "100svh",
        background: "#1E1712",
        padding: "5rem 1.5rem 3rem",
      }}
    >
      {/* Subtle background texture — faint radial glow */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(199,154,69,0.06) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      {/* Content */}
      <motion.div
        className="relative z-10 flex flex-col items-center gap-6"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        {/*
          Real SPEAR logo PNG — replaces the SVG arrow mark + text wordmark + sub-tagline.
          The image already contains the full wordmark, spear-through-letters graphic,
          AND the "Smart Platform for Every Accommodation & Restaurant" tagline text,
          so those three separate elements have been removed.
          Transparent background reads directly against the dark hero (#1E1712).
        */}
        <motion.div variants={fadeInVariant}>
          <Image
            src="/logo/spear-logo.png.png"
            alt="SPEAR — Smart Platform for Every Accommodation & Restaurant"
            width={600}
            height={300}
            priority
            style={{
              width: "clamp(360px, 60vw, 780px)",
              height: "auto",
              maxWidth: "100%",
              objectFit: "contain",
            }}
          />
        </motion.div>

        {/* Tagline — the page's single <h1>. Unchanged position and styling. */}
        <motion.h1
          variants={fadeUpVariant}
          className="max-w-2xl"
          style={{
            fontFamily: "var(--font-fraunces), Georgia, serif",
            fontSize: "clamp(1.15rem, 2.8vw, 1.65rem)",
            fontWeight: 400,
            fontStyle: "italic",
            color: "#F3ECE0",
            lineHeight: 1.5,
            letterSpacing: "-0.01em",
          }}
        >
          One platform for every reservation, every table, every guest.
        </motion.h1>
      </motion.div>

      {/* Scroll cue — reappears when user scrolls back to top */}
      <AnimatePresence>
        {scrollCueVisible && (
          <motion.div
            key="scroll-cue"
            className="absolute bottom-10 left-1/2 -translate-x-1/2"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0, transition: { delay: 1.6, duration: 0.8 } }}
            exit={{ opacity: 0, transition: { duration: 0.5 } }}
          >
            <ScrollCueWidget />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
