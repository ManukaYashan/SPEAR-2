"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import { Send, CheckCircle2, Clock, Users, Shield } from "lucide-react";
import { fadeUpVariant, staggerContainer } from "@/lib/motion-variants";

const PROPERTY_TYPES = [
  { value: "", label: "Select property type" },
  { value: "hotel", label: "Hotel / Resort" },
  { value: "restaurant", label: "Restaurant" },
  { value: "both", label: "Hotel + Restaurant" },
  { value: "other", label: "Other" },
];

const REASSURANCES = [
  { icon: Clock, text: "We respond within 1–2 business days" },
  { icon: Users, text: "Walkthrough tailored to your property type" },
  { icon: CheckCircle2, text: "No commitment required" },
  { icon: Shield, text: "No spam — your details stay private" },
];

export default function BookADemo() {
  const [ref, inView] = useInView<HTMLElement>({ threshold: 0.1 }, true);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    propertyType: "",
    phone: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    // TODO: Wire to your form backend (Resend, Formspree, etc.)
    await new Promise((r) => setTimeout(r, 1000));
    setStatus("success");
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "0.875rem 1rem",
    background: "rgba(243,236,224,0.7)",
    border: "1px solid rgba(199,154,69,0.3)",
    borderRadius: 6,
    fontFamily: "var(--font-manrope), system-ui, sans-serif",
    fontSize: "0.95rem",
    color: "#221B16",
    outline: "none",
    transition: "border-color 0.2s ease",
    appearance: "none",
    boxSizing: "border-box",
  };

  const labelStyle: React.CSSProperties = {
    display: "block",
    fontFamily: "var(--font-manrope), system-ui, sans-serif",
    fontSize: "0.72rem",
    fontWeight: 700,
    letterSpacing: "0.09em",
    textTransform: "uppercase",
    color: "#5C4F44",
    marginBottom: "0.4rem",
  };

  return (
    <section
      ref={ref}
      id="book-a-demo"
      aria-labelledby="book-demo-heading"
      style={{
        background: "#F7F1E6",
        padding: "6rem 2rem",
        borderTop: "1px solid rgba(199,154,69,0.15)",
      }}
    >
      {/*
        Bug 4 fix: changed from max-w-2xl single-column (left form, right dead space)
        to a proper max-w-6xl two-column layout at lg breakpoints.
        Left: heading + form. Right: what to expect copy + reassurance list.
      */}
      <div
        style={{
          maxWidth: 1152,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1fr",
          gap: "4rem",
          alignItems: "start",
        }}
        className="demo-grid"
      >
        {/* LEFT — form */}
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={staggerContainer}
          style={{ display: "flex", flexDirection: "column", gap: "2rem" }}
        >
          {/* Heading block */}
          <div>
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
              Let&apos;s Talk
            </motion.span>
            <motion.h2
              variants={fadeUpVariant}
              id="book-demo-heading"
              style={{
                fontFamily: "var(--font-fraunces), Georgia, serif",
                fontSize: "clamp(2rem, 4vw, 2.75rem)",
                fontWeight: 700,
                color: "#221B16",
                lineHeight: 1.15,
                letterSpacing: "-0.02em",
                marginBottom: "0.75rem",
              }}
            >
              Book a Demo
            </motion.h2>
            <motion.p
              variants={fadeUpVariant}
              style={{
                fontFamily: "var(--font-manrope), system-ui, sans-serif",
                fontSize: "0.95rem",
                color: "#5C4F44",
                lineHeight: 1.75,
                maxWidth: "44ch",
              }}
            >
              Tell us about your property and we&apos;ll schedule a personalised
              walkthrough — no slides, just your actual setup.
            </motion.p>
          </div>

          {/* Form */}
          <motion.div variants={fadeUpVariant}>
            {status === "success" ? (
              <div
                style={{
                  padding: "2.5rem 2rem",
                  background: "#EDE5D4",
                  borderRadius: 10,
                  border: "1px solid rgba(199,154,69,0.3)",
                  textAlign: "center",
                }}
              >
                <p
                  style={{
                    fontFamily: "var(--font-fraunces), Georgia, serif",
                    fontSize: "1.4rem",
                    fontWeight: 600,
                    color: "#221B16",
                    marginBottom: "0.75rem",
                  }}
                >
                  We&apos;ve received your request.
                </p>
                <p
                  style={{
                    fontFamily: "var(--font-manrope), system-ui, sans-serif",
                    fontSize: "0.9rem",
                    color: "#5C4F44",
                    lineHeight: 1.7,
                  }}
                >
                  Someone from the SPEAR team will be in touch within 1–2
                  business days.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                noValidate
                style={{ display: "flex", flexDirection: "column", gap: "1.1rem" }}
                aria-label="Book a demo request form"
              >
                {/* Name */}
                <div>
                  <label htmlFor="demo-name" style={labelStyle}>
                    Full Name <span aria-hidden="true" style={{ color: "#8B3A3A" }}>*</span>
                  </label>
                  <input
                    id="demo-name"
                    name="name"
                    type="text"
                    required
                    autoComplete="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Your full name"
                    style={inputStyle}
                    onFocus={(e) => ((e.currentTarget as HTMLInputElement).style.borderColor = "#C79A45")}
                    onBlur={(e) => ((e.currentTarget as HTMLInputElement).style.borderColor = "rgba(199,154,69,0.3)")}
                  />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="demo-email" style={labelStyle}>
                    Work Email <span aria-hidden="true" style={{ color: "#8B3A3A" }}>*</span>
                  </label>
                  <input
                    id="demo-email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@yourproperty.com"
                    style={inputStyle}
                    onFocus={(e) => ((e.currentTarget as HTMLInputElement).style.borderColor = "#C79A45")}
                    onBlur={(e) => ((e.currentTarget as HTMLInputElement).style.borderColor = "rgba(199,154,69,0.3)")}
                  />
                </div>

                {/* Company */}
                <div>
                  <label htmlFor="demo-company" style={labelStyle}>
                    Company / Property Name <span aria-hidden="true" style={{ color: "#8B3A3A" }}>*</span>
                  </label>
                  <input
                    id="demo-company"
                    name="company"
                    type="text"
                    required
                    autoComplete="organization"
                    value={form.company}
                    onChange={handleChange}
                    placeholder="The Grand Hotel"
                    style={inputStyle}
                    onFocus={(e) => ((e.currentTarget as HTMLInputElement).style.borderColor = "#C79A45")}
                    onBlur={(e) => ((e.currentTarget as HTMLInputElement).style.borderColor = "rgba(199,154,69,0.3)")}
                  />
                </div>

                {/* Property type */}
                <div>
                  <label htmlFor="demo-property-type" style={labelStyle}>
                    Property Type <span aria-hidden="true" style={{ color: "#8B3A3A" }}>*</span>
                  </label>
                  <select
                    id="demo-property-type"
                    name="propertyType"
                    required
                    value={form.propertyType}
                    onChange={handleChange}
                    style={{
                      ...inputStyle,
                      cursor: "pointer",
                      backgroundImage:
                        "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%23C79A45' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E\")",
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "right 1rem center",
                      paddingRight: "2.5rem",
                    }}
                    onFocus={(e) => ((e.currentTarget as HTMLSelectElement).style.borderColor = "#C79A45")}
                    onBlur={(e) => ((e.currentTarget as HTMLSelectElement).style.borderColor = "rgba(199,154,69,0.3)")}
                  >
                    {PROPERTY_TYPES.map((opt) => (
                      <option key={opt.value} value={opt.value} disabled={opt.value === ""}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Phone (optional) */}
                <div>
                  <label htmlFor="demo-phone" style={labelStyle}>
                    Phone{" "}
                    <span style={{ fontWeight: 400, color: "#8B7A6E", textTransform: "none", letterSpacing: 0, fontSize: "0.7rem" }}>
                      (optional)
                    </span>
                  </label>
                  <input
                    id="demo-phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="+1 555 000 0000"
                    style={inputStyle}
                    onFocus={(e) => ((e.currentTarget as HTMLInputElement).style.borderColor = "#C79A45")}
                    onBlur={(e) => ((e.currentTarget as HTMLInputElement).style.borderColor = "rgba(199,154,69,0.3)")}
                  />
                </div>

                {/* Submit */}
                <button
                  id="demo-submit-btn"
                  type="submit"
                  disabled={status === "submitting"}
                  className="btn-brass"
                  style={{
                    justifyContent: "center",
                    marginTop: "0.25rem",
                    opacity: status === "submitting" ? 0.7 : 1,
                    cursor: status === "submitting" ? "not-allowed" : "pointer",
                    width: "100%",
                  }}
                  aria-label="Submit demo request"
                >
                  <Send size={15} />
                  {status === "submitting" ? "Sending…" : "Request a Demo"}
                </button>
              </form>
            )}
          </motion.div>
        </motion.div>

        {/* RIGHT — what to expect */}
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={staggerContainer}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "2.5rem",
            paddingTop: "4.5rem", // visually align with form body (below heading block)
          }}
        >
          <motion.div variants={fadeUpVariant}>
            <h3
              style={{
                fontFamily: "var(--font-fraunces), Georgia, serif",
                fontSize: "1.5rem",
                fontWeight: 700,
                color: "#221B16",
                lineHeight: 1.2,
                marginBottom: "0.75rem",
              }}
            >
              What to expect
            </h3>
            <p
              style={{
                fontFamily: "var(--font-manrope), system-ui, sans-serif",
                fontSize: "0.9rem",
                color: "#5C4F44",
                lineHeight: 1.8,
              }}
            >
              A 30-minute call where we look at your specific property
              setup — rooms, covers, OTA channels — and show you exactly
              how SPEAR would handle your day-to-day operations. No generic
              deck. No pushy close.
            </p>
          </motion.div>

          {/* Reassurance list */}
          <motion.ul
            variants={staggerContainer}
            style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "1rem" }}
          >
            {REASSURANCES.map(({ icon: Icon, text }) => (
              <motion.li
                key={text}
                variants={fadeUpVariant}
                style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}
              >
                <span
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: "50%",
                    background: "rgba(199,154,69,0.1)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <Icon size={15} style={{ color: "#C79A45" }} />
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-manrope), system-ui, sans-serif",
                    fontSize: "0.875rem",
                    color: "#5C4F44",
                    lineHeight: 1.5,
                  }}
                >
                  {text}
                </span>
              </motion.li>
            ))}
          </motion.ul>

          {/* Divider line */}
          <motion.div
            variants={fadeUpVariant}
            style={{ width: 48, height: 2, background: "rgba(199,154,69,0.3)", borderRadius: 1 }}
          />

          <motion.p
            variants={fadeUpVariant}
            style={{
              fontFamily: "var(--font-fraunces), Georgia, serif",
              fontSize: "0.95rem",
              fontStyle: "italic",
              color: "#8B7A6E",
              lineHeight: 1.7,
            }}
          >
            &ldquo;We built SPEAR because we&apos;ve been in the room when
            things go wrong. We want to show you what right looks like.&rdquo;
          </motion.p>
        </motion.div>
      </div>

      {/* Responsive: stack to 1 col on mobile, 2 col at lg */}
      <style>{`
        @media (min-width: 1024px) {
          .demo-grid {
            grid-template-columns: 1fr 1fr !important;
          }
          .footer-grid {
            grid-template-columns: 2.5fr 1fr 1fr 1fr !important;
          }
        }
        @media (max-width: 768px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
