import { AbsoluteFill, useCurrentFrame, interpolate, Sequence } from "remotion";
import { TransitionSeries, springTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { wipe } from "@remotion/transitions/wipe";
import { Scene1Boot } from "./scenes/Scene1Boot";
import { Scene2Name } from "./scenes/Scene2Name";
import { Scene3Skills } from "./scenes/Scene3Skills";
import { Scene4Stats } from "./scenes/Scene4Stats";
import { Scene5Outro } from "./scenes/Scene5Outro";

const COLORS = {
  bg: "#0a0c12",
  neonGreen: "#22c55e",
  neonBlue: "#38bdf8",
  neonPurple: "#a78bfa",
  neonPink: "#f472b6",
  dim: "#4a5568",
  text: "#e2e8f0",
};

// Persistent animated background
const CyberGrid: React.FC = () => {
  const frame = useCurrentFrame();

  const lines = Array.from({ length: 20 }, (_, i) => {
    const y = (i / 20) * 1080;
    const opacity = interpolate(
      Math.sin(frame * 0.02 + i * 0.5),
      [-1, 1],
      [0.02, 0.08]
    );
    return (
      <div
        key={`h-${i}`}
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: y,
          height: 1,
          background: COLORS.neonGreen,
          opacity,
        }}
      />
    );
  });

  const vLines = Array.from({ length: 30 }, (_, i) => {
    const x = (i / 30) * 1920;
    const opacity = interpolate(
      Math.sin(frame * 0.015 + i * 0.3),
      [-1, 1],
      [0.01, 0.05]
    );
    return (
      <div
        key={`v-${i}`}
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: x,
          width: 1,
          background: COLORS.neonBlue,
          opacity,
        }}
      />
    );
  });

  return (
    <AbsoluteFill style={{ overflow: "hidden" }}>
      {lines}
      {vLines}
    </AbsoluteFill>
  );
};

// Scanline overlay
const Scanlines: React.FC = () => {
  const frame = useCurrentFrame();
  const offset = (frame * 2) % 4;

  return (
    <AbsoluteFill
      style={{
        backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent ${2 + offset}px, rgba(0,0,0,0.15) ${2 + offset}px, rgba(0,0,0,0.15) ${4 + offset}px)`,
        opacity: 0.4,
      }}
    />
  );
};

// Floating code fragments
const CodeRain: React.FC = () => {
  const frame = useCurrentFrame();
  const chars = "01アイウエオ{}();<>=+-*/".split("");

  const drops = Array.from({ length: 40 }, (_, i) => {
    const x = ((i * 53) % 1920);
    const speed = 1.5 + (i % 5) * 0.8;
    const y = ((frame * speed + i * 97) % 1200) - 100;
    const charIdx = (frame + i * 7) % chars.length;
    const opacity = interpolate(y, [-100, 0, 900, 1100], [0, 0.6, 0.6, 0]);

    return (
      <div
        key={i}
        style={{
          position: "absolute",
          left: x,
          top: y,
          fontFamily: "monospace",
          fontSize: 14 + (i % 3) * 4,
          color: i % 4 === 0 ? COLORS.neonGreen : COLORS.neonBlue,
          opacity: opacity * (0.3 + (i % 3) * 0.15),
        }}
      >
        {chars[charIdx]}
      </div>
    );
  });

  return <AbsoluteFill style={{ overflow: "hidden" }}>{drops}</AbsoluteFill>;
};

export const MainVideo: React.FC = () => {
  const frame = useCurrentFrame();

  // Global vignette
  const vignetteOpacity = interpolate(frame, [0, 30], [1, 0.7], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.bg }}>
      <CyberGrid />
      <CodeRain />

      <TransitionSeries>
        <TransitionSeries.Sequence durationInFrames={100}>
          <Scene1Boot />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={fade()}
          timing={springTiming({ config: { damping: 200 }, durationInFrames: 20 })}
        />
        <TransitionSeries.Sequence durationInFrames={120}>
          <Scene2Name />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={wipe({ direction: "from-left" })}
          timing={springTiming({ config: { damping: 200 }, durationInFrames: 25 })}
        />
        <TransitionSeries.Sequence durationInFrames={100}>
          <Scene3Skills />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={fade()}
          timing={springTiming({ config: { damping: 200 }, durationInFrames: 20 })}
        />
        <TransitionSeries.Sequence durationInFrames={100}>
          <Scene4Stats />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={fade()}
          timing={springTiming({ config: { damping: 200 }, durationInFrames: 15 })}
        />
        <TransitionSeries.Sequence durationInFrames={95}>
          <Scene5Outro />
        </TransitionSeries.Sequence>
      </TransitionSeries>

      <Scanlines />

      {/* Vignette */}
      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse at center, transparent 40%, ${COLORS.bg} 100%)`,
          opacity: vignetteOpacity,
        }}
      />
    </AbsoluteFill>
  );
};
