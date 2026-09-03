"use client";

import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import { Plug, Settings, Rocket } from "lucide-react";
import { fadeUpVariant, staggerContainer } from "@/lib/motion-variants";

const STEPS = [
  {
    number: "01",
    icon: Plug,
    title: "Connect Your Property",
    description:
      "Tell SPEAR about your property — rooms, floors, zones, and OTA listings. The setup wizard walks you through it step by step. No technical expertise required.",
  },
  {
    number: "02",
    icon: Settings,
    title: "Configure Your Modules",
    description:
      "Enable only the modules you need — Direct Booking, PMS, Restaurant, POS, Inventory, or Channel Manager. Each module integrates automatically with the others.",
  },
  {
    number: "03",
    icon: Rocket,
    title: "Go Live",
    description:
      "Flip the switch. Your team goes live on a single unified dashboard — bookings, tables, orders, and stock all in one place. Support is with you every step.",
  },
];

export default function HowItWorks() {
  const [ref, inView] = useInView<HTMLElement>({ threshold: 0.15 }, true);

  return (
    <section
      ref={ref}
      id="how-it-works"
      aria-labelledby="how-it-works-heading"
      className="mode-b"
      style={{ padding: "6rem 2rem" }}
    >
      <div style={{ maxWidth: 1152, margin: "0 auto", width: "100%" }}>
        {/* Heading */}
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={staggerContainer}
          className="text-center mb-16"
        >
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
              marginBottom: "0.75rem",
            }}
          >
            Getting Started
          </motion.span>
          <motion.h2
            variants={fadeUpVariant}
            id="how-it-works-heading"
            style={{
              fontFamily: "var(--font-fraunces), Georgia, serif",
              fontSize: "clamp(2rem, 4vw, 3rem)",
              fontWeight: 700,
              color: "#221B16",
              lineHeight: 1.15,
              letterSpacing: "-0.02em",
            }}
          >
            How It Works
          </motion.h2>
        </motion.div>

        {/* Steps grid — Bug 5 fix: explicit CSS grid, 3 equal 1fr cols, align-items stretch */}
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={staggerContainer}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "1.5rem",
            alignItems: "stretch",
          }}
          className="how-it-works-grid"
        >
          {STEPS.map((step, i) => (
            <motion.div
              key={step.number}
              variants={fadeUpVariant}
              style={{
                background: "#EDE5D4",
                borderRadius: 8,
                padding: "2.5rem 2rem",
                position: "relative",
                border: "1px solid rgba(199,154,69,0.2)",
                textAlign: "center",
              }}
            >
              {/* Large background numeral */}
              <span
                aria-hidden="true"
                style={{
                  position: "absolute",
                  top: "1rem",
                  right: "1.5rem",
                  fontFamily: "var(--font-fraunces), Georgia, serif",
                  fontSize: "5rem",
                  fontWeight: 900,
                  color: "rgba(199,154,69,0.12)",
                  lineHeight: 1,
                  userSelect: "none",
                }}
              >
                {step.number}
              </span>

              {/* Icon */}
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 8,
                  background: "rgba(199,154,69,0.12)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "1.25rem",
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
              >
                <step.icon size={20} style={{ color: "#C79A45" }} />
              </div>

              <h3
                style={{
                  fontFamily: "var(--font-fraunces), Georgia, serif",
                  fontSize: "1.2rem",
                  fontWeight: 700,
                  color: "#221B16",
                  marginBottom: "0.75rem",
                  lineHeight: 1.2,
                }}
              >
                {step.title}
              </h3>
              <p
                style={{
                  fontFamily: "var(--font-manrope), system-ui, sans-serif",
                  fontSize: "0.9rem",
                  color: "#5C4F44",
                  lineHeight: 1.75,
                }}
              >
                {step.description}
              </p>

              {/* Connector arrow — only on desktop between cards */}
              {i < STEPS.length - 1 && (
                <div
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    right: "-1rem",
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "rgba(199,154,69,0.25)",
                    fontSize: "1.25rem",
                    lineHeight: 1,
                    pointerEvents: "none",
                    zIndex: 2,
                  }}
                  className="connector-arrow"
                >
                  →
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
