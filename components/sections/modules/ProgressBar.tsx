"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

/**
 * ProgressBar — thin 2px horizontal bar fixed to the top of the viewport.
 * Fills left-to-right in brass as the user scrolls through the 6 module panels.
 * Only visible while inside the horizontal module story section.
 *
 * Rendered via createPortal into document.body to avoid React hydration
 * mismatch caused by inserting a fixed-position element inside a pinned
 * GSAP tree (the "insertBefore" NotFoundError).
 */

interface ProgressBarProps {
  /** 0–1 progress value */
  progress: number;
  visible: boolean;
}

export default function ProgressBar({ progress, visible }: ProgressBarProps) {
  const [mounted, setMounted] = useState(false);

  // Only portal after the client has mounted — avoids SSR mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !visible) return null;

  return createPortal(
    <div
      aria-hidden="true"
      role="presentation"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: 2,
        background: "rgba(199,154,69,0.15)",
        zIndex: 9999,
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          height: "100%",
          background: "#C79A45",
          width: `${Math.min(100, Math.max(0, progress * 100))}%`,
          transition: "width 0.05s linear",
          transformOrigin: "left",
          boxShadow: "0 0 8px rgba(199,154,69,0.6)",
        }}
      />
    </div>,
    document.body
  );
}
