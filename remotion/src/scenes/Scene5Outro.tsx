import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";

export const Scene5Outro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const mainSpring = spring({ frame, fps, config: { damping: 15, stiffness: 60, mass: 3 } });
  const scale = interpolate(mainSpring, [0, 1], [1.5, 1]);
  const opacity = interpolate(mainSpring, [0, 1], [0, 1]);

  // Pulsing ring
  const ringScale = interpolate(Math.sin(frame * 0.06), [-1, 1], [0.95, 1.05]);
  const ringOpacity = interpolate(Math.sin(frame * 0.06), [-1, 1], [0.2, 0.5]);

  // Fade out at the end
  const fadeOut = interpolate(frame, [65, 90], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Subtitle reveal
  const subOpacity = interpolate(frame, [20, 35], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const subY = interpolate(frame, [20, 35], [20, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        opacity: fadeOut,
      }}
    >
      {/* Pulsing ring */}
      <div
        style={{
          position: "absolute",
          width: 500,
          height: 500,
          borderRadius: "50%",
          border: "2px solid rgba(34,197,94,0.15)",
          transform: `scale(${ringScale})`,
          opacity: ringOpacity,
        }}
      />
      <div
        style={{
          position: "absolute",
          width: 650,
          height: 650,
          borderRadius: "50%",
          border: "1px solid rgba(56,189,248,0.1)",
          transform: `scale(${1.1 - (ringScale - 0.95) * 2})`,
          opacity: ringOpacity * 0.5,
        }}
      />

      {/* Main text */}
      <div
        style={{
          textAlign: "center",
          transform: `scale(${scale})`,
          opacity,
        }}
      >
        <div
          style={{
            fontSize: 22,
            fontFamily: "monospace",
            color: "#22c55e",
            letterSpacing: 8,
            marginBottom: 25,
          }}
        >
          {"< EXPLORE />"}
        </div>
        <div
          style={{
            fontSize: 90,
            fontWeight: 900,
            fontFamily: "sans-serif",
            background: "linear-gradient(135deg, #22c55e, #38bdf8, #a78bfa)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundSize: "200% 200%",
          }}
        >
          MY PORTFOLIO
        </div>
        <div
          style={{
            fontSize: 20,
            fontFamily: "monospace",
            color: "#64748b",
            marginTop: 25,
            opacity: subOpacity,
            transform: `translateY(${subY}px)`,
            letterSpacing: 3,
          }}
        >
          SCROLL DOWN TO DISCOVER →
        </div>
      </div>
    </AbsoluteFill>
  );
};
