import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";

export const Scene2Name: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const nameScale = spring({ frame, fps, config: { damping: 15, stiffness: 80, mass: 2 } });
  const nameY = interpolate(nameScale, [0, 1], [80, 0]);
  
  const titleOpacity = interpolate(frame, [25, 45], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const titleY = interpolate(frame, [25, 45], [30, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // Glitch effect on name
  const glitchX = frame > 5 && frame < 15 ? Math.sin(frame * 20) * 8 : 0;
  const glitchX2 = frame > 5 && frame < 15 ? Math.cos(frame * 15) * 5 : 0;

  // Decorative lines
  const lineWidth = interpolate(frame, [35, 60], [0, 400], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // Pulsing glow
  const glowIntensity = interpolate(Math.sin(frame * 0.08), [-1, 1], [0.3, 0.7]);

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Large glowing orb behind name */}
      <div
        style={{
          position: "absolute",
          width: 600,
          height: 600,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(34,197,94,0.12), transparent 70%)",
          opacity: glowIntensity,
          filter: "blur(60px)",
        }}
      />

      {/* Name with glitch layers */}
      <div style={{ position: "relative" }}>
        {/* Red glitch layer */}
        <div
          style={{
            position: "absolute",
            fontSize: 120,
            fontWeight: 900,
            fontFamily: "sans-serif",
            color: "rgba(248,113,113,0.3)",
            transform: `translateY(${nameY}px) translateX(${glitchX}px) scale(${nameScale})`,
            letterSpacing: -3,
            mixBlendMode: "screen",
          }}
        >
          PRANAV
        </div>
        {/* Blue glitch layer */}
        <div
          style={{
            position: "absolute",
            fontSize: 120,
            fontWeight: 900,
            fontFamily: "sans-serif",
            color: "rgba(56,189,248,0.3)",
            transform: `translateY(${nameY}px) translateX(${glitchX2}px) scale(${nameScale})`,
            letterSpacing: -3,
            mixBlendMode: "screen",
          }}
        >
          PRANAV
        </div>
        {/* Main text */}
        <div
          style={{
            fontSize: 120,
            fontWeight: 900,
            fontFamily: "sans-serif",
            color: "#e2e8f0",
            transform: `translateY(${nameY}px) scale(${nameScale})`,
            letterSpacing: -3,
            textShadow: "0 0 40px rgba(34,197,94,0.3), 0 0 80px rgba(34,197,94,0.1)",
          }}
        >
          PRANAV
        </div>
      </div>

      {/* Decorative line */}
      <div
        style={{
          marginTop: 30,
          height: 2,
          width: lineWidth,
          background: "linear-gradient(90deg, transparent, #22c55e, #38bdf8, transparent)",
          boxShadow: "0 0 20px rgba(34,197,94,0.4)",
        }}
      />

      {/* Subtitle */}
      <div
        style={{
          marginTop: 30,
          fontSize: 32,
          fontFamily: "monospace",
          color: "#22c55e",
          opacity: titleOpacity,
          transform: `translateY(${titleY}px)`,
          letterSpacing: 12,
          textTransform: "uppercase",
          textShadow: "0 0 20px rgba(34,197,94,0.4)",
        }}
      >
        FULL STACK DEVELOPER
      </div>

      {/* Brackets decoration */}
      <div
        style={{
          marginTop: 20,
          fontSize: 20,
          fontFamily: "monospace",
          color: "#4a5568",
          opacity: titleOpacity,
          transform: `translateY(${titleY}px)`,
        }}
      >
        {"{ innovate(); create(); deploy(); }"}
      </div>
    </AbsoluteFill>
  );
};
