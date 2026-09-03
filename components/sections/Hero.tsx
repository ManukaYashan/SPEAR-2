"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fadeUpVariant, fadeInVariant, staggerContainer } from "@/lib/motion-variants";

/** Inline SVG spear mark — matches NavBar but larger */
function SpearMarkHero() {
  return (
    <svg
      width={56}
      height={56}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <line
        x1="3"
        y1="29"
        x2="24"
        y2="8"
        stroke="#C79A45"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <polygon
        points="24,8 18,10 22,14"
        fill="#C79A45"
        stroke="#C79A45"
        strokeWidth="0.5"
        strokeLinejoin="round"
      />
      <line
        x1="15"
        y1="17"
        x2="27"
        y2="21"
        stroke="#C79A45"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.5"
      />
      <line
        x1="11"
        y1="21"
        x2="15"
        y2="17"
        stroke="#C79A45"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.5"
      />
    </svg>
  );
}

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
    // Using multiple thresholds so state updates on both entry and exit.
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
        {/* Logo mark */}
        <motion.div variants={fadeInVariant}>
          <SpearMarkHero />
        </motion.div>

        {/* Wordmark */}
        <motion.div variants={fadeUpVariant}>
          <span
            className="block font-bold tracking-[0.22em] uppercase select-none"
            style={{
              fontFamily: "var(--font-fraunces), Georgia, serif",
              fontSize: "clamp(3.5rem, 10vw, 7rem)",
              color: "#C79A45",
              lineHeight: 1,
            }}
          >
            SPEAR
          </span>
        </motion.div>

        {/* Tagline — the page's single <h1> */}
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

        {/* Sub-tagline label */}
        <motion.p
          variants={fadeUpVariant}
          className="text-sm font-medium tracking-[0.1em] uppercase"
          style={{
            color: "#7A6F63",
            fontFamily: "var(--font-manrope), system-ui, sans-serif",
          }}
        >
          Smart Platform for Every Accommodation &amp; Restaurant
        </motion.p>
      </motion.div>

      {/* Scroll cue — permanently removed once hero leaves viewport */}
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
