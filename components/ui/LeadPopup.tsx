"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, Send } from "lucide-react";
import Link from "next/link";

export default function LeadPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const hasTriggeredRef = useRef(false);

  useEffect(() => {
    // Check if already shown in this session
    if (sessionStorage.getItem("spear_lead_popup_shown") === "true") {
      hasTriggeredRef.current = true;
      return;
    }

    const checkShouldShow = () => {
      if (hasTriggeredRef.current) return;

      // Check if inside module-story section
      const hSection = document.getElementById("module-story");
      let isInHorizontalSection = false;
      if (hSection) {
        const rect = hSection.getBoundingClientRect();
        // If the section is currently occupying the viewport
        if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
          isInHorizontalSection = true;
        }
      }

      // If we are over the horizontal section, don't show yet.
      if (isInHorizontalSection) return;

      const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      
      if (scrollPercent >= 50) {
        triggerPopup();
      }
    };

    const triggerPopup = () => {
      if (hasTriggeredRef.current) return;
      
      // Double check we're not in the horizontal section before finally opening
      const hSection = document.getElementById("module-story");
      if (hSection) {
        const rect = hSection.getBoundingClientRect();
        if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
          return; // Abort
        }
      }

      hasTriggeredRef.current = true;
      sessionStorage.setItem("spear_lead_popup_shown", "true");
      setIsOpen(true);
    };

    // Scroll trigger
    window.addEventListener("scroll", checkShouldShow, { passive: true });

    // Time trigger
    const timer = setTimeout(() => {
      triggerPopup();
    }, 20000);

    return () => {
      window.removeEventListener("scroll", checkShouldShow);
      clearTimeout(timer);
    };
  }, []);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("submitting");
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "YOUR_ACCESS_KEY_HERE", // IMPORTANT: Replace this with your actual Web3Forms access key
          subject: "New Intent Popup Request from SPEAR Website",
          email,
          source: "quick intent popup",
        }),
      });
      const result = await response.json();
      if (result.success) {
        setStatus("success");
        setTimeout(() => setIsOpen(false), 3000);
      } else {
        console.error("Web3Forms submission failed:", result);
        setStatus("error");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setStatus("error");
    }
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

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "1rem",
          }}
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            style={{
              position: "absolute",
              inset: 0,
              background: "rgba(30, 23, 18, 0.8)",
              backdropFilter: "blur(4px)",
              WebkitBackdropFilter: "blur(4px)",
            }}
            aria-hidden="true"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="popup-title"
            style={{
              position: "relative",
              width: "100%",
              maxWidth: 440,
              background: "#F3ECE0",
              borderRadius: 16,
              padding: "2.5rem 2rem",
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
              border: "1px solid rgba(199, 154, 69, 0.2)",
            }}
          >
            <button
              onClick={handleClose}
              aria-label="Close modal"
              style={{
                position: "absolute",
                top: "1rem",
                right: "1rem",
                width: 44,
                height: 44,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "transparent",
                border: "none",
                cursor: "pointer",
                color: "#7A6F63",
              }}
            >
              <X size={20} />
            </button>

            {status === "success" ? (
              <div style={{ textAlign: "center", padding: "1rem 0" }}>
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
                  Someone from the SPEAR team will be in touch shortly.
                </p>
              </div>
            ) : (
              <>
                <h2
                  id="popup-title"
                  style={{
                    fontFamily: "var(--font-fraunces), Georgia, serif",
                    fontSize: "1.75rem",
                    fontWeight: 700,
                    color: "#221B16",
                    lineHeight: 1.15,
                    marginBottom: "0.75rem",
                    letterSpacing: "-0.02em",
                  }}
                >
                  Not sure where to start? Let&apos;s talk.
                </h2>
                <p
                  style={{
                    fontFamily: "var(--font-manrope), system-ui, sans-serif",
                    fontSize: "0.95rem",
                    color: "#5C4F44",
                    lineHeight: 1.6,
                    marginBottom: "1.5rem",
                  }}
                >
                  Book a personalized walkthrough to see how SPEAR can unify your bookings, tables, and inventory into one platform.
                </p>

                <form onSubmit={handleSubmit} noValidate style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                  {status === "error" && (
                    <div style={{
                      padding: "0.75rem",
                      background: "#FEE2E2",
                      border: "1px solid #F87171",
                      borderRadius: 6,
                      color: "#991B1B",
                      fontSize: "0.85rem",
                      fontFamily: "var(--font-manrope), system-ui, sans-serif",
                    }}>
                      Something went wrong. Please try again.
                    </div>
                  )}

                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Work email"
                    style={{ ...inputStyle, minHeight: 44 }}
                    onFocus={(e) => ((e.currentTarget as HTMLInputElement).style.borderColor = "#C79A45")}
                    onBlur={(e) => ((e.currentTarget as HTMLInputElement).style.borderColor = "rgba(199,154,69,0.3)")}
                  />

                  <button
                    type="submit"
                    disabled={status === "submitting" || !email}
                    className="btn-brass"
                    style={{
                      width: "100%",
                      justifyContent: "center",
                      minHeight: 48,
                      opacity: status === "submitting" ? 0.7 : 1,
                      cursor: status === "submitting" ? "not-allowed" : "pointer",
                    }}
                  >
                    {status === "submitting" ? "Submitting..." : (
                      <>
                        Book a Free Demo <ArrowRight size={18} />
                      </>
                    )}
                  </button>

                  <p
                    style={{
                      fontFamily: "var(--font-manrope), system-ui, sans-serif",
                      fontSize: "0.7rem",
                      color: "#7A6F63",
                      textAlign: "center",
                      marginTop: "0.5rem",
                      lineHeight: 1.5,
                    }}
                  >
                    By submitting this form, you&apos;ll receive information about SPEAR. See our{" "}
                    <Link href="/privacy" style={{ color: "#C79A45", textDecoration: "underline" }} onClick={handleClose}>
                      Privacy Policy
                    </Link>.
                  </p>
                </form>
              </>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
