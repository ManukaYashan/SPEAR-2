"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

/**
 * DotNav — vertical stack of 6 clickable dots fixed to the right edge of the viewport.
 * Active dot is larger and brass-filled. Clicking a dot smoothly scrolls to that panel.
 * Only visible while inside the horizontal module story section.
 *
 * Rendered via createPortal into document.body to avoid the same React hydration
 * mismatch ("insertBefore" NotFoundError) that affects fixed-position elements
 * rendered inside a GSAP-pinned tree.
 */

interface DotNavProps {
  activeIndex: number;
  onDotClick: (index: number) => void;
  visible: boolean;
  moduleIds: string[];
}

export default function DotNav({
  activeIndex,
  onDotClick,
  visible,
  moduleIds,
}: DotNavProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !visible) return null;

  return createPortal(
    <nav
      aria-label="Module navigation"
      style={{
        position: "fixed",
        right: "1.5rem",
        top: "50%",
        transform: "translateY(-50%)",
        zIndex: 9998,
        display: "flex",
        flexDirection: "column",
        gap: "0.75rem",
        alignItems: "center",
      }}
    >
      {moduleIds.map((id, i) => {
        const isActive = i === activeIndex;
        return (
          <button
            key={id}
            id={`dot-nav-${id}`}
            aria-label={`Go to module ${i + 1} of 6`}
            aria-current={isActive ? "true" : undefined}
            onClick={() => onDotClick(i)}
            style={{
              width: isActive ? 10 : 6,
              height: isActive ? 10 : 6,
              borderRadius: "50%",
              background: isActive ? "#C79A45" : "rgba(199,154,69,0.3)",
              border: isActive ? "none" : "1px solid rgba(199,154,69,0.4)",
              cursor: "pointer",
              padding: 0,
              transition: "all 0.25s ease",
              outline: "none",
              flexShrink: 0,
            }}
            onFocus={(e) => {
              (e.currentTarget as HTMLButtonElement).style.outline =
                "2px solid #C79A45";
              (e.currentTarget as HTMLButtonElement).style.outlineOffset = "3px";
            }}
            onBlur={(e) => {
              (e.currentTarget as HTMLButtonElement).style.outline = "none";
            }}
          />
        );
      })}
    </nav>,
    document.body
  );
}
