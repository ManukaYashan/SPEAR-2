"use client";

import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import { Check } from "lucide-react";
import { fadeUpVariant, staggerContainer } from "@/lib/motion-variants";

const TIERS = [
  {
    id: "starter",
    name: "Starter",
    price: "$199",
    period: "/month",
    description: "Perfect for single-property operators just getting started.",
    features: [
      "Direct Booking Engine",
      "Hotel PMS (up to 30 rooms)",
      "Single restaurant floor plan",
      "Basic reporting dashboard",
      "Email support",
    ],
    ctaLabel: "Get Started",
    ctaHref: "#book-a-demo",
    highlighted: false,
  },
  {
    id: "growth",
    name: "Growth",
    price: "$499",
    period: "/month",
    description:
      "For growing properties with both hotel and restaurant operations.",
    features: [
      "Everything in Starter",
      "Full Hotel PMS (unlimited rooms)",
      "Point of Sale",
      "Kitchen Inventory",
      "Channel Manager (up to 5 OTAs)",
      "Priority support",
    ],
    ctaLabel: "Get Started",
    ctaHref: "#book-a-demo",
    highlighted: true,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: null,
    period: null,
    description:
      "For multi-property groups, resorts, and complex operations with custom requirements.",
    features: [
      "Everything in Growth",
      "Multi-property management",
      "Unlimited OTA channels",
      "Custom integrations & API access",
      "Dedicated onboarding & account manager",
    ],
    ctaLabel: "Contact Us",
    ctaHref: "#book-a-demo",
    highlighted: false,
  },
];

export default function Pricing() {
  const [ref, inView] = useInView<HTMLElement>({ threshold: 0.1 }, true);

  return (
    <section
      ref={ref}
      id="pricing"
      aria-labelledby="pricing-heading"
      className="mode-b"
      style={{ padding: "6rem 2rem" }}
    >
      <div style={{ maxWidth: 1152, margin: "0 auto", width: "100%" }}>
        {/* Heading */}
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={staggerContainer}
          style={{ textAlign: "center", marginBottom: "4rem" }}
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
            Simple, Transparent Pricing
          </motion.span>
          <motion.h2
            variants={fadeUpVariant}
            id="pricing-heading"
            style={{
              fontFamily: "var(--font-fraunces), Georgia, serif",
              fontSize: "clamp(2rem, 4vw, 3rem)",
              fontWeight: 700,
              color: "#221B16",
              lineHeight: 1.15,
              letterSpacing: "-0.02em",
              marginBottom: "1rem",
            }}
          >
            One platform. Three tiers.
          </motion.h2>
          <motion.p
            variants={fadeUpVariant}
            style={{
              fontFamily: "var(--font-manrope), system-ui, sans-serif",
              fontSize: "1rem",
              color: "#5C4F44",
              maxWidth: "42ch",
              margin: "0 auto",
              lineHeight: 1.7,
            }}
          >
            Early-access pricing — rates are indicative and subject to change
            before general availability.
          </motion.p>
        </motion.div>

        {/* Tiers grid — Bug 6 fix: stretch aligns all cards to same height */}
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
          className="pricing-grid"
        >
          {TIERS.map((tier) => (
            <motion.div
              key={tier.id}
              id={`pricing-${tier.id}`}
              variants={fadeUpVariant}
              style={{
                background: tier.highlighted ? "#221B16" : "#EDE5D4",
                border: tier.highlighted
                  ? "1.5px solid #C79A45"
                  : "1px solid rgba(199,154,69,0.2)",
                borderRadius: 10,
                padding: "calc(2.5rem + 12px) 2rem 2.5rem",
                display: "flex",
                flexDirection: "column",
                gap: "1.5rem",
                position: "relative",
                textAlign: "center",
                alignItems: "center",
              }}
            >
              {/* Highlighted badge */}
              {tier.highlighted && (
                <span
                  style={{
                    position: "absolute",
                    top: -12,
                    left: "50%",
                    transform: "translateX(-50%)",
                    background: "#C79A45",
                    color: "#1E1712",
                    fontSize: "0.65rem",
                    fontWeight: 700,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    padding: "0.25rem 0.9rem",
                    borderRadius: 20,
                    fontFamily: "var(--font-manrope), system-ui, sans-serif",
                    whiteSpace: "nowrap",
                  }}
                >
                  Most Popular
                </span>
              )}

              {/* Tier name */}
              <div>
                <h3
                  style={{
                    fontFamily: "var(--font-fraunces), Georgia, serif",
                    fontSize: "1.4rem",
                    fontWeight: 700,
                    color: tier.highlighted ? "#F3ECE0" : "#221B16",
                    marginBottom: "0.5rem",
                  }}
                >
                  {tier.name}
                </h3>
                <p
                  style={{
                    fontFamily: "var(--font-manrope), system-ui, sans-serif",
                    fontSize: "0.85rem",
                    color: tier.highlighted ? "#B5A99A" : "#5C4F44",
                    lineHeight: 1.6,
                  }}
                >
                  {tier.description}
                </p>
              </div>

              {/* Price */}
              <div style={{ display: "flex", alignItems: "baseline", gap: "0.25rem", justifyContent: "center" }}>
                {tier.price ? (
                  <>
                    <span
                      style={{
                        fontFamily: "var(--font-fraunces), Georgia, serif",
                        fontSize: "2.5rem",
                        fontWeight: 700,
                        color: tier.highlighted ? "#F3ECE0" : "#221B16",
                        lineHeight: 1,
                      }}
                    >
                      {tier.price}
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--font-manrope), system-ui, sans-serif",
                        fontSize: "0.85rem",
                        color: tier.highlighted ? "#7A6F63" : "#8B7A6E",
                      }}
                    >
                      {tier.period}
                    </span>
                  </>
                ) : (
                  <span
                    style={{
                      fontFamily: "var(--font-fraunces), Georgia, serif",
                      fontSize: "1.5rem",
                      fontStyle: "italic",
                      color: "#C79A45",
                      fontWeight: 400,
                    }}
                  >
                    Custom pricing
                  </span>
                )}
              </div>

              {/* Features list — left-aligned (checkmark + text reads better left-to-right) */}
              <ul
                style={{
                  listStyle: "none",
                  margin: 0,
                  padding: 0,
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.6rem",
                  flex: 1,
                  width: "100%",
                  textAlign: "left",
                }}
              >
                {tier.features.map((feature) => (
                  <li
                    key={feature}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "0.6rem",
                      fontFamily: "var(--font-manrope), system-ui, sans-serif",
                      fontSize: "0.875rem",
                      color: tier.highlighted ? "#B5A99A" : "#5C4F44",
                      lineHeight: 1.5,
                    }}
                  >
                    <Check
                      size={14}
                      style={{
                        color: "#C79A45",
                        flexShrink: 0,
                        marginTop: 2,
                      }}
                    />
                    {feature}
                  </li>
                ))}
              </ul>

              {/* CTA — sits at the bottom of the flex column (features list has flex:1) */}
              <a
                href={tier.ctaHref}
                id={`pricing-${tier.id}-cta`}
                aria-label={`${tier.ctaLabel} — ${tier.name} plan`}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "0.75rem 1.75rem",
                  border: tier.highlighted ? "none" : "1.5px solid rgba(199,154,69,0.5)",
                  borderRadius: 4,
                  background: tier.highlighted ? "#C79A45" : "transparent",
                  color: tier.highlighted ? "#1E1712" : "#C79A45",
                  fontFamily: "var(--font-manrope), system-ui, sans-serif",
                  fontSize: "0.85rem",
                  fontWeight: 700,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  textDecoration: "none",
                  transition: "all 0.2s ease",
                  textAlign: "center",
                  whiteSpace: "nowrap",
                  cursor: "pointer",
                  marginTop: "auto",
                }}
              >
                {tier.ctaLabel}
              </a>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
