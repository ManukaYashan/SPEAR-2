"use client";

import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import { fadeUpVariant, staggerContainer } from "@/lib/motion-variants";

export default function WhyWeBuilt() {
  const [ref, inView] = useInView<HTMLElement>({ threshold: 0.15 }, true);

  return (
    <section
      ref={ref}
      id="about"
      aria-labelledby="about-heading"
      style={{
        background: "#EDE5D4",
        padding: "6rem 2rem",
      }}
    >
      <div style={{ maxWidth: 896, margin: "0 auto" }}>
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={staggerContainer}
          className="flex flex-col gap-8"
        >
          {/* Label */}
          <motion.span
            variants={fadeUpVariant}
            style={{
              display: "block",
              fontFamily: "var(--font-manrope), system-ui, sans-serif",
              fontSize: "0.7rem",
              fontWeight: 700,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#C79A45",
              textAlign: "center",
            }}
          >
            Why We Built This
          </motion.span>

          {/* Heading */}
          <motion.h2
            variants={fadeUpVariant}
            id="about-heading"
            style={{
              fontFamily: "var(--font-fraunces), Georgia, serif",
              fontSize: "clamp(2rem, 4vw, 2.75rem)",
              fontWeight: 700,
              color: "#221B16",
              lineHeight: 1.15,
              letterSpacing: "-0.02em",
              textAlign: "center",
            }}
          >
            The problem with hospitality software is that it&apos;s never really unified.
          </motion.h2>

          {/* Divider — centred */}
          <motion.div
            variants={fadeUpVariant}
            style={{
              width: 48,
              height: 2,
              background: "#C79A45",
              borderRadius: 1,
              marginLeft: "auto",
              marginRight: "auto",
            }}
          />

          {/* Paragraphs */}
          <motion.div
            variants={fadeUpVariant}
            style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
          >
            {[
              "I've watched hotel and restaurant operators juggle three, four, sometimes five separate software systems — one for bookings, one for the restaurant, one for the POS, another for inventory, and a separate channel manager that needs to be manually synced every time a reservation lands. It's fragmented, error-prone, and exhausting.",
              "SPEAR exists because that problem is solvable. Not with yet another point tool, but with a single platform purpose-built for the dual reality of modern hospitality: properties that run both accommodation and food service simultaneously, where a guest checking in at 3pm is also making a dinner reservation for 8pm.",
              "We're an early-stage platform, actively being built in close collaboration with real hospitality operators who are helping us get this right. We're not yet live everywhere, and we don't have a long list of customers to name-drop. What we have is a clear problem, a specific vision for how to solve it, and a team that's been in the room when the double-booking happens and the kitchen runs out of what was promised on the menu. If that resonates, we'd like to talk.",
            ].map((para, i) => (
              <p
                key={i}
                style={{
                  fontFamily: "var(--font-manrope), system-ui, sans-serif",
                  fontSize: "clamp(0.95rem, 1.5vw, 1.05rem)",
                  color: "#5C4F44",
                  lineHeight: 1.85,
                }}
              >
                {para}
              </p>
            ))}
          </motion.div>

          {/* Signature-style attribution */}
          <motion.div
            variants={fadeUpVariant}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0.25rem",
              paddingTop: "0.5rem",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-fraunces), Georgia, serif",
                fontSize: "1.1rem",
                fontStyle: "italic",
                color: "#221B16",
                fontWeight: 400,
              }}
            >
              — The SPEAR team
            </span>
            <span
              style={{
                fontFamily: "var(--font-manrope), system-ui, sans-serif",
                fontSize: "0.75rem",
                color: "#8B7A6E",
                letterSpacing: "0.05em",
              }}
            >
              Building in public. No fake logos, no invented metrics.
            </span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
