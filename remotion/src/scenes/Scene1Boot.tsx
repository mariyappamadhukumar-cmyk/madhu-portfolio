import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";

export const Scene1Boot: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const lines = [
    "> INITIALIZING SYSTEM...",
    "> LOADING NEURAL NETWORK...",
    "> ESTABLISHING CONNECTION...",
    "> PORTFOLIO v2.0 READY",
    "> WELCOME_",
  ];

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        padding: 200,
      }}
    >
      <div style={{ width: 900, fontFamily: "monospace" }}>
        {lines.map((line, i) => {
          const startFrame = i * 15;
          const progress = interpolate(frame - startFrame, [0, 8], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });
          const visibleChars = Math.floor(progress * line.length);
          const glitchOpacity =
            frame > startFrame && frame < startFrame + 12
              ? interpolate(Math.sin(frame * 8 + i), [-1, 1], [0.3, 1])
              : 1;

          const isActive = frame >= startFrame;
          const color = i === lines.length - 1 ? "#22c55e" : "#38bdf8";

          // Cursor blink for last visible line
          const isLastVisible = i === Math.min(Math.floor(frame / 15), lines.length - 1);
          const cursorVisible = isLastVisible && Math.sin(frame * 0.3) > 0;

          return (
            <div
              key={i}
              style={{
                fontSize: 28,
                color,
                opacity: isActive ? glitchOpacity : 0,
                marginBottom: 16,
                letterSpacing: 1.5,
                textShadow: `0 0 10px ${color}40, 0 0 30px ${color}20`,
              }}
            >
              {line.slice(0, visibleChars)}
              {cursorVisible && (
                <span style={{ color: "#22c55e", fontWeight: "bold" }}>█</span>
              )}
            </div>
          );
        })}

        {/* Progress bar */}
        {frame > 30 && (
          <div
            style={{
              marginTop: 40,
              height: 3,
              width: 700,
              background: "#1a1f2e",
              borderRadius: 2,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                height: "100%",
                width: `${interpolate(frame, [30, 90], [0, 100], { extrapolateRight: "clamp" })}%`,
                background: "linear-gradient(90deg, #22c55e, #38bdf8)",
                borderRadius: 2,
                boxShadow: "0 0 15px #22c55e60",
              }}
            />
          </div>
        )}
      </div>
    </AbsoluteFill>
  );
};
