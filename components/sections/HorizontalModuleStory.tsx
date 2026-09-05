"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { modules } from "@/lib/modules-data";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import ModulePanel from "./modules/ModulePanel";
import ProgressBar from "./modules/ProgressBar";
import DotNav from "./modules/DotNav";
import FirstPanelScrollCue from "./modules/ScrollCue";

const MODULE_COUNT = modules.length; // 6

/*
  SINGLE SOURCE OF TRUTH — all pixel math derives from these two functions.
  They're called as functions (not constants) so they always read the
  current window dimensions, including after resize / orientation change.
*/
function travelPx(): number {
  return (MODULE_COUNT - 1) * window.innerWidth;
}
function scrollPx(): number {
  // Each panel gets exactly 1 viewport-height of scroll dwell
  return (MODULE_COUNT - 1) * window.innerHeight;
}

/*
  ROOT CAUSE OF "scroll-down skips panels" BUG
  ═════════════════════════════════════════════
  The problem is NOT refresh timing — it's WHEN ScrollTrigger is created.

  On a fresh page load:
  1. Server renders <ReducedMotionFallback> (N panels × 4rem = ~30rem tall)
  2. React hydrates, useEffect fires → isDesktop becomes true
  3. React re-renders: ReducedMotionFallback unmounts, DesktopHorizontalScroll mounts
  4. DesktopHorizontalScroll's useEffect fires → GSAP init() runs
  5. gsap.to(track, { scrollTrigger: {...} }) is called
     AT THIS EXACT MOMENT the browser is still in the middle of the
     layout reflow from step 3. The Hero section above is finishing its
     Framer Motion entrance animation (delay: 1.6s on some elements).
  6. ScrollTrigger calls getBoundingClientRect() on the section → gets
     a wrong Y position because layout isn't settled yet.
  7. Result: "start: top top" resolves to the wrong scroll offset.
     Scrolling DOWN hits that wrong offset and finds nothing there.
     Scrolling UP forces a GSAP internal refresh which re-measures
     correctly — hence the "only works after scroll-up" symptom.

  THE FIX:
  Don't create the ScrollTrigger until the page is fully laid out.
  Specifically: wait for window `load` (ALL resources done) AND then
  wait two additional requestAnimationFrame ticks to let the browser
  flush any pending layout/paint work.

  The SSR placeholder is now a fixed-height 100vh black div (not the
  ReducedMotionFallback stacked list) so there's no height jump when
  DesktopHorizontalScroll mounts — the layout is already stable.
*/

/* ============================================================
   DESKTOP PLACEHOLDER — shown before GSAP is ready
   Same 100vh height as the real section, invisible fill.
   Prevents layout shift when switching from SSR placeholder.
   ============================================================ */
function DesktopPlaceholder() {
  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        background: "#1E1712",
        position: "relative",
        overflow: "hidden",
      }}
      aria-hidden="true"
    />
  );
}

/* ============================================================
   DESKTOP — GSAP ScrollTrigger horizontal pin
   ============================================================ */
function DesktopHorizontalScroll() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [visible, setVisible] = useState(false);

  const handleDotClick = useCallback((index: number) => {
    import("gsap").then(({ gsap }) => {
      import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
        import("gsap/ScrollToPlugin").then(({ ScrollToPlugin }) => {
          gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
          const st = ScrollTrigger.getById("hsm-pin");
          if (!st) return;
          const start = st.start as number;
          const end = st.end as number;
          const targetProgress = index / Math.max(1, MODULE_COUNT - 1);
          const targetScroll = start + (end - start) * targetProgress;
          gsap.to(window, {
            scrollTo: targetScroll,
            duration: 0.75,
            ease: "power2.inOut",
          });
        });
      });
    });
  }, []);

  useEffect(() => {
    let ctx: { revert: () => void } | null = null;
    let resizeTimer: ReturnType<typeof setTimeout> | null = null;
    let cancelled = false;

    /*
      createScrollTrigger() — called only AFTER the page layout is stable.
      This is the ONLY place ScrollTrigger is created for this section.
    */
    async function createScrollTrigger() {
      if (cancelled) return;
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      const { ScrollToPlugin } = await import("gsap/ScrollToPlugin");
      gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

      if (cancelled) return;

      const section = sectionRef.current;
      const track = trackRef.current;
      if (!section || !track) return;

      // Final refresh so ScrollTrigger has accurate positions of ALL sections
      ScrollTrigger.refresh();

      ctx = gsap.context(() => {
        gsap.to(track, {
          x: () => -travelPx(),
          ease: "none",
          scrollTrigger: {
            id: "hsm-pin",
            trigger: section,
            pin: true,
            start: "top top",
            end: () => `+=${scrollPx()}`,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onEnter: () => setVisible(true),
            onLeave: () => setVisible(false),
            onLeaveBack: () => setVisible(false),
            onEnterBack: () => setVisible(true),
            onUpdate: (self) => {
              const p = self.progress;
              setProgress(p);
              const idx = Math.min(
                MODULE_COUNT - 1,
                Math.max(0, Math.round(p * (MODULE_COUNT - 1)))
              );
              setActiveIndex(idx);
            },
          },
        });

        // Debounced resize → refresh to handle late-loading content
        const onResize = () => {
          if (resizeTimer) clearTimeout(resizeTimer);
          resizeTimer = setTimeout(() => ScrollTrigger.refresh(), 250);
        };
        window.addEventListener("resize", onResize, { passive: true });

        return () => {
          window.removeEventListener("resize", onResize);
          if (resizeTimer) clearTimeout(resizeTimer);
        };
      }, section);
    }

    /*
      waitForStableLayout() — waits for the page to be fully laid out.

      Strategy:
      1. If window.load hasn't fired yet → wait for it.
      2. After load (or immediately if already loaded) → wait 2 rAF ticks.
         Two ticks ensure the browser has committed its layout+paint pass.
      3. Then create the ScrollTrigger.

      This guarantees we never measure element positions during a reflow.
    */
    function waitForStableLayout(callback: () => void) {
      const run = () => {
        // Two requestAnimationFrame ticks = layout + paint committed
        requestAnimationFrame(() => {
          requestAnimationFrame(callback);
        });
      };

      if (document.readyState === "complete") {
        run();
      } else {
        window.addEventListener("load", run, { once: true });
      }
    }

    waitForStableLayout(createScrollTrigger);

    return () => {
      cancelled = true;
      if (resizeTimer) clearTimeout(resizeTimer);
      ctx?.revert();
    };
  }, []);

  const moduleIds = modules.map((m) => m.id);

  return (
    <>
      <ProgressBar progress={progress} visible={visible} />
      <DotNav
        activeIndex={activeIndex}
        onDotClick={handleDotClick}
        visible={visible}
        moduleIds={moduleIds}
      />

      {/*
        100vh pinnable container. overflow:hidden clips the wide track.
        GSAP's pin:true auto-inserts a spacer AFTER this div with
        height = scrollPx(), creating the scroll dwell distance.
      */}
      <div
        ref={sectionRef}
        id="module-story"
        style={{
          position: "relative",
          overflow: "hidden",
          width: "100%",
          height: "100vh",
        }}
        aria-label="SPEAR module story — scroll to explore all 6 modules"
      >
        {/*
          Horizontal track: MODULE_COUNT × 100vw wide.
          GSAP translates it via x (pixels) — never xPercent.
          x uses travelPx() which reads window.innerWidth at call time.
        */}
        <div
          ref={trackRef}
          style={{
            display: "flex",
            flexWrap: "nowrap",
            width: `${MODULE_COUNT * 100}vw`,
            height: "100%",
            willChange: "transform",
          }}
        >
          {modules.map((mod, i) => (
            <div
              key={mod.id}
              style={{
                flexShrink: 0,
                width: "100vw",
                height: "100%",
                position: "relative",
              }}
            >
              <ModulePanel
                id={mod.id}
                numeral={mod.numeral}
                title={mod.title}
                tagline={mod.tagline}
                body={mod.body}
                layout={mod.layout}
                isLast={mod.isLast}
              />
              {i === 0 && (
                <FirstPanelScrollCue visible={activeIndex === 0 && visible} />
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

/* ============================================================
   MOBILE — Framer Motion drag carousel (no scroll-jacking)

   Bug fixes applied vs. original:
   1. dragConstraints: was containerRef (overflow:hidden → Framer Motion
      resolved to zero overflow → all dragging was blocked after panel 1).
      Now uses explicit { left: -maxDrag, right: 0 } px bounds.
   2. animate x: was `-${activeIndex * 100}%` which is % of the track
      width (600vw), so panel 2 would offset by 600vw not 100vw. Now
      uses containerWidth px per panel.
   3. Velocity threshold added — fast flicks now reliably advance panels.
   4. Mobile panel layout replaces the desktop ModulePanel component
      (which uses 100vh height + 2-column grid that overflows on phones).
   ============================================================ */
function MobileCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const measure = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };
    measure();
    window.addEventListener("resize", measure, { passive: true });
    return () => window.removeEventListener("resize", measure);
  }, []);

  // Total left travel needed to reach last panel
  const maxDrag = (MODULE_COUNT - 1) * containerWidth;
  // Pixel offset for the currently active panel
  const xOffset = containerWidth > 0 ? -(activeIndex * containerWidth) : 0;

  const handleDragEnd = (
    _: unknown,
    info: { offset: { x: number }; velocity: { x: number } }
  ) => {
    const swipedLeft =
      info.offset.x < -50 || info.velocity.x < -300;
    const swipedRight =
      info.offset.x > 50 || info.velocity.x > 300;

    if (swipedLeft && activeIndex < MODULE_COUNT - 1) {
      setActiveIndex((i) => i + 1);
    } else if (swipedRight && activeIndex > 0) {
      setActiveIndex((i) => i - 1);
    }
  };

  return (
    <section
      id="module-story"
      aria-label="SPEAR module story — swipe to explore all 6 modules"
      style={{ background: "#1E1712", overflowX: "hidden" }}
    >
      <div
        ref={containerRef}
        style={{ position: "relative", overflow: "hidden", width: "100%" }}
      >
        <motion.div
          drag="x"
          dragConstraints={{ left: -maxDrag, right: 0 }}
          dragElastic={0.08}
          onDragEnd={handleDragEnd}
          animate={{ x: xOffset }}
          transition={{ type: "spring", stiffness: 300, damping: 35 }}
          style={{
            display: "flex",
            width: containerWidth > 0
              ? `${MODULE_COUNT * containerWidth}px`
              : `${MODULE_COUNT * 100}vw`,
            cursor: "grab",
            willChange: "transform",
          }}
          whileTap={{ cursor: "grabbing" }}
        >
          {modules.map((mod) => {
            const gradients: Record<string, { from: string; to: string }> = {
              "direct-booking":    { from: "#2A1E14", to: "#1E1712" },
              "hotel-pms":         { from: "#1E2214", to: "#1A1E12" },
              "restaurant-floor":  { from: "#221A14", to: "#1E1712" },
              "point-of-sale":     { from: "#261C16", to: "#1E1712" },
              "kitchen-inventory": { from: "#201C14", to: "#1C1A12" },
              "channel-manager":   { from: "#241814", to: "#1E1712" },
            };
            const g = gradients[mod.id] || { from: "#2C2118", to: "#1E1712" };

            return (
              <div
                key={mod.id}
                style={{
                  width: containerWidth > 0 ? `${containerWidth}px` : "100vw",
                  flexShrink: 0,
                  minHeight: "100svh",
                  background: `linear-gradient(160deg, ${g.from}, ${g.to})`,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  padding: "5rem 1.5rem 2rem",
                  boxSizing: "border-box",
                  userSelect: "none",
                  WebkitUserSelect: "none" as const,
                }}
              >
                {/* Counter badge */}
                <span style={{
                  fontFamily: "var(--font-manrope), system-ui, sans-serif",
                  fontSize: "0.65rem",
                  fontWeight: 700,
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: "#C79A45",
                  marginBottom: "1rem",
                  display: "block",
                }}>
                  {mod.numeral} / 06
                </span>

                {/* Title */}
                <h2
                  id={`mobile-module-${mod.id}-title`}
                  style={{
                    fontFamily: "var(--font-fraunces), Georgia, serif",
                    fontSize: "clamp(1.55rem, 6.5vw, 2rem)",
                    fontWeight: 700,
                    color: "#F3ECE0",
                    lineHeight: 1.1,
                    letterSpacing: "-0.02em",
                    marginBottom: "0.7rem",
                  }}
                >
                  {mod.title}
                </h2>

                {/* Tagline */}
                <p style={{
                  fontFamily: "var(--font-fraunces), Georgia, serif",
                  fontSize: "clamp(0.88rem, 3.5vw, 1rem)",
                  fontWeight: 300,
                  fontStyle: "italic",
                  color: "#C79A45",
                  lineHeight: 1.55,
                  marginBottom: "0.7rem",
                }}>
                  {mod.tagline}
                </p>

                {/* Body */}
                <p style={{
                  fontFamily: "var(--font-manrope), system-ui, sans-serif",
                  fontSize: "clamp(0.8rem, 3vw, 0.92rem)",
                  color: "#B5A99A",
                  lineHeight: 1.75,
                  marginBottom: "1.5rem",
                }}>
                  {mod.body}
                </p>

                {/* Device mockup — constrained width so it never overflows */}
                <div
                  style={{
                    width: "100%",
                    maxWidth: 320,
                    margin: "0 auto",
                    aspectRatio: "16/10",
                    background: "#261E19",
                    borderRadius: 8,
                    border: "1px solid rgba(199,154,69,0.15)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  aria-label={`${mod.title} dashboard preview`}
                  role="img"
                >
                  <span style={{
                    fontFamily: "var(--font-manrope), system-ui, sans-serif",
                    fontSize: "0.6rem",
                    color: "rgba(199,154,69,0.35)",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                  }}>
                    Dashboard Preview
                  </span>
                </div>

                {mod.isLast && (
                  <p style={{
                    fontFamily: "var(--font-manrope), system-ui, sans-serif",
                    fontSize: "0.7rem",
                    color: "#7A6F63",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    marginTop: "1.5rem",
                    textAlign: "center",
                  }}>
                    Scroll down to continue ↓
                  </p>
                )}
              </div>
            );
          })}
        </motion.div>
      </div>

      {/* Dot indicators — tapping also navigates directly */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "0.5rem",
          padding: "1.25rem 0 1.5rem",
          background: "#1E1712",
        }}
        aria-label="Module carousel progress"
        role="tablist"
      >
        {modules.map((mod, i) => (
          <button
            key={mod.id}
            role="tab"
            aria-selected={i === activeIndex}
            aria-label={`Go to module ${i + 1}: ${mod.title}`}
            id={`mobile-dot-${mod.id}`}
            onClick={() => setActiveIndex(i)}
            style={{
              width: i === activeIndex ? 22 : 7,
              height: 7,
              borderRadius: 4,
              background: i === activeIndex ? "#C79A45" : "rgba(199,154,69,0.25)",
              border: i === activeIndex ? "none" : "1px solid rgba(199,154,69,0.35)",
              cursor: "pointer",
              transition: "all 0.3s ease",
              padding: 0,
              outline: "none",
              flexShrink: 0,
            }}
          />
        ))}
      </div>
    </section>
  );
}

/* ============================================================
   REDUCED MOTION FALLBACK — stacked vertical cards
   ============================================================ */
function ReducedMotionFallback() {
  return (
    <section
      id="module-story"
      aria-label="SPEAR module story"
      style={{ background: "#1E1712" }}
    >
      {modules.map((mod) => (
        <div
          key={mod.id}
          style={{ padding: "4rem 2rem", borderBottom: "1px solid rgba(199,154,69,0.1)" }}
        >
          <div
            style={{
              maxWidth: 1152,
              margin: "0 auto",
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "3rem",
              alignItems: "center",
            }}
            className="rm-panel-grid"
          >
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <span style={{ fontFamily: "var(--font-manrope), system-ui, sans-serif", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#C79A45" }}>
                {mod.numeral} / 06
              </span>
              <h2 id={`rm-module-${mod.id}-title`} style={{ fontFamily: "var(--font-fraunces), Georgia, serif", fontSize: "clamp(1.5rem, 3vw, 2.2rem)", fontWeight: 700, color: "#F3ECE0", lineHeight: 1.15 }}>
                {mod.title}
              </h2>
              <p style={{ fontFamily: "var(--font-fraunces), Georgia, serif", fontSize: "1rem", fontStyle: "italic", color: "#C79A45", lineHeight: 1.5 }}>
                {mod.tagline}
              </p>
              <p style={{ fontFamily: "var(--font-manrope), system-ui, sans-serif", fontSize: "0.95rem", color: "#B5A99A", lineHeight: 1.75 }}>
                {mod.body}
              </p>
            </div>
            <div
              style={{ aspectRatio: "16/10", background: "#261E19", borderRadius: 8, border: "1px solid rgba(199,154,69,0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}
              aria-label={`${mod.title} dashboard preview`}
              role="img"
            >
              <span style={{ fontFamily: "var(--font-manrope), system-ui, sans-serif", fontSize: "0.7rem", color: "rgba(199,154,69,0.35)", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                Dashboard Preview
              </span>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}

/* ============================================================
   ROOT — decides which branch to render
   ============================================================ */
export default function HorizontalModuleStory() {
  const prefersReduced = useReducedMotion();
  const [isDesktop, setIsDesktop] = useState<boolean | null>(null);

  useEffect(() => {
    const mql = window.matchMedia("(min-width: 1024px)");
    setIsDesktop(mql.matches);
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  // SSR / initial render before we know device type:
  // Render a 100vh dark placeholder that matches the desktop section height.
  // This avoids a height jump when DesktopHorizontalScroll mounts and
  // means GSAP will always see a stable layout when it measures positions.
  if (isDesktop === null) {
    return <DesktopPlaceholder />;
  }

  if (prefersReduced) {
    return <ReducedMotionFallback />;
  }
  if (!isDesktop) {
    return <MobileCarousel />;
  }
  return <DesktopHorizontalScroll />;
}
