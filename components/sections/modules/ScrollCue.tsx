"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";

/**
 * ScrollCue — first-panel horizontal arrow pulse + "01 / 06" counter.
 * Shown only on panel 01, only once per session (tracked via sessionStorage).
 * Fades out after a delay automatically.
 */

const SESSION_KEY = "spear_hsm_cue_seen";

export default function FirstPanelScrollCue({
  visible,
}: {
  visible: boolean;
}) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!visible) return;

    // Only show if the user hasn't seen it this session
    const alreadySeen =
      typeof window !== "undefined" &&
      window.sessionStorage.getItem(SESSION_KEY) === "1";

    if (!alreadySeen) {
      setShow(true);
      window.sessionStorage.setItem(SESSION_KEY, "1");

      // Auto-fade after 4s
      const timeout = setTimeout(() => setShow(false), 4000);
      return () => clearTimeout(timeout);
    }
  }, [visible]);

  return (
    <AnimatePresence>
      {show && visible && (
        <motion.div
          key="first-panel-cue"
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0, transition: { delay: 0.8, duration: 0.6 } }}
          exit={{ opacity: 0, transition: { duration: 0.5 } }}
          aria-hidden="true"
          style={{
            position: "absolute",
            right: "5rem",
            bottom: "3rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            gap: "0.4rem",
          }}
        >
          {/* Counter */}
          <span
            style={{
              fontFamily: "var(--font-manrope), system-ui, sans-serif",
              fontSize: "0.65rem",
              fontWeight: 700,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "rgba(199,154,69,0.5)",
            }}
          >
            01 / 06
          </span>

          {/* Arrow pulse */}
          <div className="flex items-center gap-1.5">
            <span
              style={{
                fontFamily: "var(--font-manrope), system-ui, sans-serif",
                fontSize: "0.65rem",
                fontWeight: 600,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "rgba(199,154,69,0.45)",
              }}
            >
              Scroll right
            </span>
            <span className="arrow-pulse" style={{ color: "#C79A45", display: "flex" }}>
              <ArrowRight size={14} />
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
