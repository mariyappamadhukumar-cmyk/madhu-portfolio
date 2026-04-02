import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";

const skills = [
  { name: "React / Next.js", color: "#38bdf8", width: 95 },
  { name: "TypeScript", color: "#22c55e", width: 90 },
  { name: "Python / AI-ML", color: "#a78bfa", width: 88 },
  { name: "Node.js", color: "#38bdf8", width: 85 },
  { name: "Computer Vision", color: "#f472b6", width: 82 },
  { name: "Hardware / IoT", color: "#fbbf24", width: 78 },
];

export const Scene3Skills: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = spring({ frame, fps, config: { damping: 20, stiffness: 200 } });
  const titleX = interpolate(titleSpring, [0, 1], [-200, 0]);

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        padding: "0 250px",
      }}
    >
      {/* Section label */}
      <div
        style={{
          fontSize: 16,
          fontFamily: "monospace",
          color: "#22c55e",
          letterSpacing: 6,
          marginBottom: 12,
          opacity: titleSpring,
          transform: `translateX(${titleX}px)`,
        }}
      >
        {"// SKILL_MATRIX"}
      </div>

      <div
        style={{
          fontSize: 64,
          fontWeight: 800,
          fontFamily: "sans-serif",
          color: "#e2e8f0",
          marginBottom: 50,
          opacity: titleSpring,
          transform: `translateX(${titleX}px)`,
          textShadow: "0 0 30px rgba(34,197,94,0.2)",
        }}
      >
        Tech Stack
      </div>

      {skills.map((skill, i) => {
        const delay = 15 + i * 10;
        const barSpring = spring({
          frame: frame - delay,
          fps,
          config: { damping: 25, stiffness: 120 },
        });
        const barWidth = interpolate(barSpring, [0, 1], [0, skill.width]);
        const itemOpacity = interpolate(frame - delay, [0, 10], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
        const slideX = interpolate(barSpring, [0, 1], [60, 0]);

        return (
          <div
            key={skill.name}
            style={{
              marginBottom: 22,
              opacity: itemOpacity,
              transform: `translateX(${slideX}px)`,
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: 8,
                fontFamily: "monospace",
                fontSize: 20,
              }}
            >
              <span style={{ color: "#e2e8f0" }}>{skill.name}</span>
              <span style={{ color: skill.color }}>{Math.round(barWidth)}%</span>
            </div>
            <div
              style={{
                height: 6,
                background: "#1a1f2e",
                borderRadius: 3,
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  height: "100%",
                  width: `${barWidth}%`,
                  background: `linear-gradient(90deg, ${skill.color}, ${skill.color}80)`,
                  borderRadius: 3,
                  boxShadow: `0 0 15px ${skill.color}40`,
                }}
              />
            </div>
          </div>
        );
      })}
    </AbsoluteFill>
  );
};
