import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";

const stats = [
  { label: "Projects", value: "12+", icon: "⚡" },
  { label: "Languages", value: "9+", icon: "💻" },
  { label: "AI Models", value: "5+", icon: "🧠" },
  { label: "Experience", value: "3+ yrs", icon: "🚀" },
];

export const Scene4Stats: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Section label */}
      <div
        style={{
          position: "absolute",
          top: 280,
          fontSize: 16,
          fontFamily: "monospace",
          color: "#22c55e",
          letterSpacing: 6,
          opacity: interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp" }),
        }}
      >
        {"// ACHIEVEMENTS_LOG"}
      </div>

      <div
        style={{
          display: "flex",
          gap: 60,
          marginTop: 40,
        }}
      >
        {stats.map((stat, i) => {
          const delay = 10 + i * 12;
          const s = spring({
            frame: frame - delay,
            fps,
            config: { damping: 12, stiffness: 100 },
          });
          const scale = interpolate(s, [0, 1], [0.5, 1]);
          const opacity = interpolate(frame - delay, [0, 8], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });

          // Counting animation
          const numericValue = parseInt(stat.value) || 0;
          const countProgress = interpolate(frame - delay, [0, 30], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });
          const displayNum = Math.round(numericValue * countProgress);
          const displayValue = stat.value.replace(/\d+/, String(displayNum));

          // Glow pulse
          const glowPulse = interpolate(
            Math.sin((frame - delay) * 0.1),
            [-1, 1],
            [0.3, 0.6]
          );

          return (
            <div
              key={stat.label}
              style={{
                textAlign: "center",
                opacity,
                transform: `scale(${scale})`,
              }}
            >
              <div style={{ fontSize: 50, marginBottom: 15 }}>{stat.icon}</div>
              <div
                style={{
                  width: 180,
                  height: 180,
                  borderRadius: 20,
                  background: "rgba(15,20,30,0.8)",
                  border: "1px solid rgba(34,197,94,0.2)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  boxShadow: `0 0 30px rgba(34,197,94,${glowPulse * 0.15})`,
                }}
              >
                <div
                  style={{
                    fontSize: 48,
                    fontWeight: 900,
                    fontFamily: "sans-serif",
                    background: "linear-gradient(135deg, #22c55e, #38bdf8)",
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  {displayValue}
                </div>
                <div
                  style={{
                    fontSize: 16,
                    fontFamily: "monospace",
                    color: "#64748b",
                    marginTop: 8,
                    letterSpacing: 2,
                  }}
                >
                  {stat.label.toUpperCase()}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
