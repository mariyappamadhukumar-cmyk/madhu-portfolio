import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";

const COLORS = {
  bg: "#0a0c12",
  neonGreen: "#22c55e",
  neonBlue: "#38bdf8",
  neonPurple: "#a78bfa",
  neonPink: "#f472b6",
};

const CyberGrid: React.FC = () => {
  const frame = useCurrentFrame();

  const hLines = Array.from({ length: 25 }, (_, i) => {
    const y = (i / 25) * 1080;
    const opacity = interpolate(Math.sin(frame * 0.025 + i * 0.5), [-1, 1], [0.02, 0.1]);
    return (
      <div key={`h-${i}`} style={{
        position: "absolute", left: 0, right: 0, top: y, height: 1,
        background: COLORS.neonGreen, opacity,
      }} />
    );
  });

  const vLines = Array.from({ length: 35 }, (_, i) => {
    const x = (i / 35) * 1920;
    const opacity = interpolate(Math.sin(frame * 0.02 + i * 0.3), [-1, 1], [0.01, 0.06]);
    return (
      <div key={`v-${i}`} style={{
        position: "absolute", top: 0, bottom: 0, left: x, width: 1,
        background: COLORS.neonBlue, opacity,
      }} />
    );
  });

  return <AbsoluteFill>{hLines}{vLines}</AbsoluteFill>;
};

const CodeRain: React.FC = () => {
  const frame = useCurrentFrame();
  const chars = "01アイウエオカキ{}();<>=+-*/λΣΔπ".split("");

  const drops = Array.from({ length: 60 }, (_, i) => {
    const x = (i * 37) % 1920;
    const speed = 1.2 + (i % 7) * 0.6;
    const y = ((frame * speed + i * 83) % 1300) - 150;
    const charIdx = (frame + i * 11) % chars.length;
    const opacity = interpolate(y, [-150, 0, 900, 1150], [0, 0.7, 0.7, 0]);
    const colors = [COLORS.neonGreen, COLORS.neonBlue, COLORS.neonPurple, COLORS.neonPink];
    const color = colors[i % 4];

    return (
      <div key={i} style={{
        position: "absolute", left: x, top: y,
        fontFamily: "monospace", fontSize: 14 + (i % 4) * 3,
        color, opacity: opacity * (0.2 + (i % 5) * 0.08),
      }}>
        {chars[charIdx]}
      </div>
    );
  });

  return <AbsoluteFill style={{ overflow: "hidden" }}>{drops}</AbsoluteFill>;
};

const GlowOrbs: React.FC = () => {
  const frame = useCurrentFrame();

  const orbs = [
    { cx: 300, cy: 200, r: 350, color: COLORS.neonGreen, speed: 0.015, amp: 80 },
    { cx: 1600, cy: 400, r: 400, color: COLORS.neonBlue, speed: 0.012, amp: 100 },
    { cx: 960, cy: 800, r: 300, color: COLORS.neonPurple, speed: 0.018, amp: 60 },
    { cx: 1400, cy: 900, r: 280, color: COLORS.neonPink, speed: 0.01, amp: 90 },
  ];

  return (
    <AbsoluteFill>
      {orbs.map((orb, i) => {
        const x = orb.cx + Math.sin(frame * orb.speed + i) * orb.amp;
        const y = orb.cy + Math.cos(frame * orb.speed * 0.7 + i * 2) * orb.amp * 0.6;
        const scale = interpolate(Math.sin(frame * orb.speed * 1.5 + i), [-1, 1], [0.8, 1.2]);
        const opacity = interpolate(Math.sin(frame * orb.speed * 2 + i * 3), [-1, 1], [0.06, 0.15]);

        return (
          <div key={i} style={{
            position: "absolute",
            left: x - orb.r / 2,
            top: y - orb.r / 2,
            width: orb.r,
            height: orb.r,
            borderRadius: "50%",
            background: `radial-gradient(circle, ${orb.color}40, transparent 70%)`,
            transform: `scale(${scale})`,
            opacity,
            filter: "blur(40px)",
          }} />
        );
      })}
    </AbsoluteFill>
  );
};

const EnergyLines: React.FC = () => {
  const frame = useCurrentFrame();

  const lines = Array.from({ length: 8 }, (_, i) => {
    const progress = ((frame * (0.8 + i * 0.3) + i * 120) % 2200) - 200;
    const y = 100 + i * 120;
    const opacity = interpolate(progress, [-200, 0, 1600, 2000], [0, 0.4, 0.4, 0]);
    const width = 100 + (i % 3) * 80;
    const color = i % 2 === 0 ? COLORS.neonGreen : COLORS.neonBlue;

    return (
      <div key={i} style={{
        position: "absolute",
        left: progress,
        top: y,
        width,
        height: 1,
        background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
        opacity: opacity * 0.3,
        boxShadow: `0 0 8px ${color}30`,
      }} />
    );
  });

  return <AbsoluteFill>{lines}</AbsoluteFill>;
};

const Scanlines: React.FC = () => {
  const frame = useCurrentFrame();
  const offset = (frame * 1.5) % 4;

  return (
    <AbsoluteFill style={{
      backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent ${2 + offset}px, rgba(0,0,0,0.12) ${2 + offset}px, rgba(0,0,0,0.12) ${4 + offset}px)`,
      opacity: 0.3,
    }} />
  );
};

export const BgVideo: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.bg }}>
      <GlowOrbs />
      <CyberGrid />
      <CodeRain />
      <EnergyLines />
      <Scanlines />
      {/* Vignette */}
      <AbsoluteFill style={{
        background: `radial-gradient(ellipse at center, transparent 30%, ${COLORS.bg} 100%)`,
        opacity: 0.6,
      }} />
    </AbsoluteFill>
  );
};
