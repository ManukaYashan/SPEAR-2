/**
 * ModulePanel — One of the 6 full-viewport panels in the horizontal module story.
 * Alternates text left/right for visual rhythm.
 * Last panel (06) has a "That's SPEAR." closing cue.
 */

import DeviceFrame from "./DeviceFrame";
import { ChevronDown, ArrowRight } from "lucide-react";

/** Background gradient per module — keeps each panel visually distinct */
const MODULE_GRADIENTS: Record<
  string,
  { from: string; to: string }
> = {
  "direct-booking": { from: "#2A1E14", to: "#1E1712" },
  "hotel-pms": { from: "#1E2214", to: "#1A1E12" },
  "restaurant-floor": { from: "#221A14", to: "#1E1712" },
  "point-of-sale": { from: "#261C16", to: "#1E1712" },
  "kitchen-inventory": { from: "#201C14", to: "#1C1A12" },
  "channel-manager": { from: "#241814", to: "#1E1712" },
};

interface ModulePanelProps {
  id: string;
  numeral: string;
  title: string;
  tagline: string;
  body: string;
  layout: "text-left" | "text-right";
  isLast?: boolean;
}

export default function ModulePanel({
  id,
  numeral,
  title,
  tagline,
  body,
  layout,
  isLast = false,
}: ModulePanelProps) {
  const gradient = MODULE_GRADIENTS[id] || {
    from: "#2C2118",
    to: "#1E1712",
  };

  const textFirst = layout === "text-left";

  return (
    <section
      id={id}
      aria-labelledby={`module-${id}-title`}
      className="relative flex-shrink-0 flex items-center justify-center overflow-hidden"
      style={{
        width: "100vw",
        height: "100vh",
        background: `linear-gradient(160deg, ${gradient.from}, ${gradient.to})`,
      }}
    >
      {/* Large background numeral */}
      <span
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "50%",
          right: textFirst ? "2%" : undefined,
          left: textFirst ? undefined : "2%",
          transform: "translateY(-50%)",
          fontFamily: "var(--font-fraunces), Georgia, serif",
          fontSize: "clamp(8rem, 18vw, 16rem)",
          fontWeight: 900,
          color: "rgba(199,154,69,0.06)",
          lineHeight: 1,
          userSelect: "none",
          letterSpacing: "-0.04em",
          pointerEvents: "none",
        }}
      >
        {numeral}
      </span>

      {/* Content grid */}
      <div
        className={`relative z-10 w-full max-w-7xl mx-auto px-10 lg:px-16 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center ${!textFirst ? "lg:flex-row-reverse" : ""}`}
      >
        {/* Text block — order controlled by flex direction */}
        <div
          className={`flex flex-col gap-5 ${textFirst ? "lg:order-1" : "lg:order-2"}`}
        >
          {/* Module numeral badge */}
          <span
            className="text-xs font-bold tracking-[0.2em] uppercase"
            style={{
              color: "#C79A45",
              fontFamily: "var(--font-manrope), system-ui, sans-serif",
            }}
          >
            {numeral} / 06
          </span>

          {/* Module title — h2 for SEO (search engines read DOM order) */}
          <h2
            id={`module-${id}-title`}
            style={{
              fontFamily: "var(--font-fraunces), Georgia, serif",
              fontSize: "clamp(1.8rem, 4vw, 3rem)",
              fontWeight: 700,
              color: "#F3ECE0",
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
            }}
          >
            {title}
          </h2>

          {/* Tagline */}
          <p
            style={{
              fontFamily: "var(--font-fraunces), Georgia, serif",
              fontSize: "clamp(1rem, 1.8vw, 1.2rem)",
              fontWeight: 300,
              fontStyle: "italic",
              color: "#C79A45",
              lineHeight: 1.5,
            }}
          >
            {tagline}
          </p>

          {/* Body */}
          <p
            style={{
              fontFamily: "var(--font-manrope), system-ui, sans-serif",
              fontSize: "clamp(0.9rem, 1.4vw, 1rem)",
              fontWeight: 400,
              color: "#B5A99A",
              lineHeight: 1.75,
              maxWidth: "38ch",
            }}
          >
            {body}
          </p>

          {/* Last panel closing cue */}
          {isLast && (
            <div
              className="flex items-center gap-2 mt-2"
              style={{ color: "#7A6F63" }}
            >
              <span
                style={{
                  fontSize: "0.75rem",
                  fontFamily: "var(--font-manrope), system-ui, sans-serif",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  fontWeight: 600,
                }}
              >
                Continue scrolling
              </span>
              <ChevronDown size={16} />
            </div>
          )}

          {/* Direction cue — only on panels 01–05: arrow points right */}
          {!isLast && (
            <div className="hidden lg:flex items-center gap-2 mt-1" aria-hidden="true">
              <ArrowRight
                size={14}
                style={{ color: "rgba(199,154,69,0.35)" }}
              />
            </div>
          )}
        </div>

        {/* Device frame */}
        <div className={textFirst ? "lg:order-2" : "lg:order-1"}>
          <DeviceFrame
            moduleId={id}
            moduleTitle={title}
            gradientFrom={gradient.from}
            gradientTo={gradient.to}
            isLast={isLast}
          />
        </div>
      </div>
    </section>
  );
}
