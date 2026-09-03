/**
 * DeviceFrame — Laptop/browser bezel mockup containing a placeholder video element.
 *
 * TODO: Replace the placeholder gradient with real dashboard footage:
 *   1. Add your .mp4 / .webm files to /public/videos/
 *   2. Replace the <div> gradient placeholder below with:
 *      <video
 *        src={`/videos/${moduleId}.mp4`}
 *        autoPlay muted loop playsInline
 *        className="w-full h-full object-cover"
 *        aria-label={`${moduleTitle} dashboard preview`}
 *      />
 */

interface DeviceFrameProps {
  moduleId: string;
  moduleTitle: string;
  /** Gradient color pair for the placeholder — each module gets a unique hue */
  gradientFrom?: string;
  gradientTo?: string;
  isLast?: boolean;
}

export default function DeviceFrame({
  moduleId,
  moduleTitle,
  gradientFrom = "#2C2118",
  gradientTo = "#1E1712",
  isLast = false,
}: DeviceFrameProps) {
  return (
    <div
      className={`device-frame w-full transition-transform duration-700 ${isLast ? "scale-95" : "scale-100"}`}
      style={{
        aspectRatio: "16 / 10",
        maxWidth: "100%",
      }}
      role="img"
      aria-label={`${moduleTitle} — dashboard preview placeholder`}
    >
      {/* Browser chrome bar (via ::before in CSS) — recreated here for JSX clarity */}
      <div
        style={{
          height: 28,
          background: "#2C2118",
          borderBottom: "1px solid rgba(199,154,69,0.15)",
          display: "flex",
          alignItems: "center",
          padding: "0 12px",
          gap: 5,
          flexShrink: 0,
        }}
        aria-hidden="true"
      >
        {/* Traffic-light dots */}
        {["#8B3A3A", "#A07C30", "#3A6B3A"].map((c, i) => (
          <span
            key={i}
            style={{
              width: 7,
              height: 7,
              borderRadius: "50%",
              background: c,
              opacity: 0.7,
            }}
          />
        ))}
        {/* Fake URL bar */}
        <span
          style={{
            marginLeft: 10,
            flex: 1,
            height: 14,
            borderRadius: 3,
            background: "rgba(199,154,69,0.08)",
            maxWidth: 200,
          }}
        />
      </div>

      {/* Content area — TODO: replace with real video */}
      <div
        style={{
          flex: 1,
          background: `linear-gradient(135deg, ${gradientFrom}, ${gradientTo})`,
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          minHeight: 0,
          height: "calc(100% - 28px)",
        }}
        data-module-id={moduleId}
      >
        {/* Grid pattern overlay */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(199,154,69,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(199,154,69,0.04) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        {/* Placeholder label */}
        <div
          style={{
            position: "relative",
            zIndex: 1,
            textAlign: "center",
            padding: "1rem",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-manrope), system-ui, sans-serif",
              fontSize: "0.65rem",
              fontWeight: 600,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "rgba(199,154,69,0.5)",
              marginBottom: "0.5rem",
            }}
          >
            Dashboard Preview
          </p>
          <p
            style={{
              fontFamily: "var(--font-fraunces), Georgia, serif",
              fontSize: "clamp(0.9rem, 2vw, 1.1rem)",
              fontWeight: 600,
              color: "rgba(243,236,224,0.25)",
            }}
          >
            {moduleTitle}
          </p>
          {/* TODO comment visible in source — swap for real video */}
          {/* 
          <video
            src={`/videos/${moduleId}.mp4`}
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover absolute inset-0"
            aria-label={`${moduleTitle} dashboard preview`}
          />
          */}
        </div>
      </div>
    </div>
  );
}
