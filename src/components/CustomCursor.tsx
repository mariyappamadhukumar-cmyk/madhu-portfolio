import { useEffect, useRef, useState, useCallback } from "react";

const TRAIL_COUNT = 10;
const RING_PARTICLES = 16;
const CLICK_PARTICLES = 12;

interface ClickBurst {
  id: number;
  x: number;
  y: number;
  time: number;
}

const CustomCursor = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const magnetRef = useRef<HTMLDivElement>(null);
  const trailsRef = useRef<HTMLDivElement[]>([]);
  const particlesRef = useRef<HTMLDivElement[]>([]);
  const [clicking, setClicking] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [clickBursts, setClickBursts] = useState<ClickBurst[]>([]);
  const mouse = useRef({ x: -100, y: -100 });
  const ring = useRef({ x: -100, y: -100 });
  const magnetic = useRef({ x: 0, y: 0 });
  const trails = useRef(Array.from({ length: TRAIL_COUNT }, () => ({ x: -100, y: -100 })));
  const angleRef = useRef(0);
  const velocityRef = useRef({ x: 0, y: 0 });
  const speedRef = useRef(0);
  const prevMouse = useRef({ x: -100, y: -100 });
  const burstIdRef = useRef(0);
  const hoverTargetRef = useRef<HTMLElement | null>(null);

  // Click burst effect
  const triggerBurst = useCallback((x: number, y: number) => {
    const id = burstIdRef.current++;
    setClickBursts(prev => [...prev, { id, x, y, time: Date.now() }]);
    setTimeout(() => {
      setClickBursts(prev => prev.filter(b => b.id !== id));
    }, 700);
  }, []);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      prevMouse.current = { ...mouse.current };
      mouse.current = { x: e.clientX, y: e.clientY };
      velocityRef.current = {
        x: mouse.current.x - prevMouse.current.x,
        y: mouse.current.y - prevMouse.current.y,
      };
      speedRef.current = Math.sqrt(velocityRef.current.x ** 2 + velocityRef.current.y ** 2);
    };
    const onDown = (e: MouseEvent) => {
      setClicking(true);
      triggerBurst(e.clientX, e.clientY);
    };
    const onUp = () => setClicking(false);
    const onEnter = () => setHidden(false);
    const onLeave = () => setHidden(true);

    const onOverInteractive = (e: MouseEvent) => {
      const el = e.target as HTMLElement;
      const interactive = el.closest("a, button, input, textarea, select, [role='button'], .glass-card, .hover-scale, .tech-tag, .btn-neon, .btn-ghost, .neon-badge");
      if (interactive) {
        setHovering(true);
        hoverTargetRef.current = interactive as HTMLElement;
      }
    };
    const onOutInteractive = () => {
      setHovering(false);
      hoverTargetRef.current = null;
      magnetic.current = { x: 0, y: 0 };
    };

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("mouseup", onUp);
    document.addEventListener("mouseenter", onEnter);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseover", onOverInteractive);
    document.addEventListener("mouseout", onOutInteractive);

    let raf: number;
    const animate = () => {
      const speed = speedRef.current;
      angleRef.current += 0.015 + speed * 0.008;

      // Magnetic pull toward hovered element center
      if (hoverTargetRef.current) {
        const rect = hoverTargetRef.current.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        magnetic.current.x += (cx - mouse.current.x) * 0.08;
        magnetic.current.y += (cy - mouse.current.y) * 0.08;
        magnetic.current.x *= 0.85;
        magnetic.current.y *= 0.85;
      } else {
        magnetic.current.x *= 0.9;
        magnetic.current.y *= 0.9;
      }

      const mx = mouse.current.x + magnetic.current.x;
      const my = mouse.current.y + magnetic.current.y;

      // Velocity-based stretch
      const stretchAngle = Math.atan2(velocityRef.current.y, velocityRef.current.x);
      const stretchAmount = Math.min(speed * 0.04, 1.5);
      const scaleX = 1 + stretchAmount;
      const scaleY = 1 - stretchAmount * 0.3;

      // Dot follows with stretch
      if (dotRef.current) {
        const dotScale = clicking ? 2.2 : hovering ? 0.5 : 1;
        const rotate = speed > 2 ? `rotate(${stretchAngle}rad)` : "";
        const stretch = speed > 2 ? `scaleX(${scaleX * dotScale}) scaleY(${scaleY * dotScale})` : `scale(${dotScale})`;
        dotRef.current.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%) ${rotate} ${stretch}`;
      }

      // Ambient glow follows
      if (glowRef.current) {
        const glowSize = hovering ? 180 : 120 + speed * 2;
        glowRef.current.style.width = `${glowSize}px`;
        glowRef.current.style.height = `${glowSize}px`;
        glowRef.current.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`;
      }

      // Magnetic indicator
      if (magnetRef.current) {
        magnetRef.current.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`;
        magnetRef.current.style.opacity = hovering ? "1" : "0";
      }

      // Ring follows with easing
      ring.current.x += (mx - ring.current.x) * 0.1;
      ring.current.y += (my - ring.current.y) * 0.1;
      if (ringRef.current) {
        const ringScale = clicking ? 0.5 : hovering ? 1.6 : 1;
        const rotation = angleRef.current * 40;
        // Morphing: circle to polygon on hover
        const borderRadius = hovering ? "30%" : "50%";
        ringRef.current.style.borderRadius = borderRadius;
        ringRef.current.style.transform = `translate(${ring.current.x}px, ${ring.current.y}px) translate(-50%, -50%) scale(${ringScale}) rotate(${rotation}deg)`;
      }

      // Orbiting particles
      for (let i = 0; i < RING_PARTICLES; i++) {
        const el = particlesRef.current[i];
        if (!el) continue;
        const orbitSpeed = 1.5 + (i % 4) * 0.5;
        const angle = angleRef.current * orbitSpeed + (i * Math.PI * 2) / RING_PARTICLES;
        const baseRadius = hovering ? 36 : 24;
        const wobble = Math.sin(angleRef.current * 3 + i) * 4;
        const radius = baseRadius + wobble;
        const px = ring.current.x + Math.cos(angle) * radius;
        const py = ring.current.y + Math.sin(angle) * radius;
        const particleScale = 0.5 + Math.sin(angleRef.current * 2 + i * 0.5) * 0.5;
        el.style.transform = `translate(${px}px, ${py}px) translate(-50%, -50%) scale(${particleScale})`;
        el.style.opacity = hidden ? "0" : `${0.7 - (i % 4) * 0.1}`;
      }

      // Trails with dynamic spacing based on velocity
      for (let i = 0; i < trails.current.length; i++) {
        const target = i === 0 ? { x: mx, y: my } : trails.current[i - 1];
        const ease = 0.08 - i * 0.006;
        trails.current[i].x += (target.x - trails.current[i].x) * Math.max(ease, 0.01);
        trails.current[i].y += (target.y - trails.current[i].y) * Math.max(ease, 0.01);
        const el = trailsRef.current[i];
        if (el) {
          const trailScale = (1 - i * 0.06) * (1 + speed * 0.01);
          const trailOpacity = Math.max(0.6 - i * 0.06, 0.05);
          el.style.transform = `translate(${trails.current[i].x}px, ${trails.current[i].y}px) translate(-50%, -50%) scale(${trailScale})`;
          el.style.opacity = hidden ? "0" : `${trailOpacity}`;
        }
      }

      // Decay velocity
      velocityRef.current.x *= 0.92;
      velocityRef.current.y *= 0.92;
      speedRef.current *= 0.92;

      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);

    document.body.style.cursor = "none";
    const style = document.createElement("style");
    style.id = "custom-cursor-style";
    style.textContent = "*, *::before, *::after { cursor: none !important; }";
    document.head.appendChild(style);

    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("mouseup", onUp);
      document.removeEventListener("mouseenter", onEnter);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseover", onOverInteractive);
      document.removeEventListener("mouseout", onOutInteractive);
      cancelAnimationFrame(raf);
      document.body.style.cursor = "";
      document.getElementById("custom-cursor-style")?.remove();
    };
  }, [clicking, hovering, hidden, triggerBurst]);

  if (typeof window !== "undefined" && "ontouchstart" in window) return null;

  return (
    <div className="pointer-events-none fixed inset-0" style={{ zIndex: 9999 }}>
      {/* Ambient glow */}
      <div
        ref={glowRef}
        className="absolute top-0 left-0 rounded-full transition-[width,height] duration-300"
        style={{
          width: 120,
          height: 120,
          background: hovering
            ? `radial-gradient(circle, hsl(var(--neon) / 0.12) 0%, hsl(var(--neon-blue) / 0.05) 50%, transparent 70%)`
            : `radial-gradient(circle, hsl(var(--neon) / 0.06) 0%, transparent 70%)`,
          opacity: hidden ? 0 : 1,
          transition: "opacity 0.3s, background 0.3s",
        }}
      />

      {/* Magnetic ring indicator */}
      <div
        ref={magnetRef}
        className="absolute top-0 left-0 rounded-full"
        style={{
          width: 70,
          height: 70,
          border: "1px solid hsl(var(--neon-blue) / 0.2)",
          background: "radial-gradient(circle, hsl(var(--neon-blue) / 0.04) 0%, transparent 70%)",
          opacity: 0,
          transition: "opacity 0.4s",
        }}
      />

      {/* Trails with gradient colors */}
      {trails.current.map((_, i) => (
        <div
          key={`trail-${i}`}
          ref={(el) => { if (el) trailsRef.current[i] = el; }}
          className="absolute top-0 left-0 rounded-full"
          style={{
            width: 10 - i * 0.7,
            height: 10 - i * 0.7,
            background: i % 3 === 0
              ? `hsl(var(--neon) / 0.6)`
              : i % 3 === 1
                ? `hsl(var(--neon-blue) / 0.5)`
                : `hsl(var(--neon-teal) / 0.4)`,
            filter: `blur(${0.5 + i * 0.4}px)`,
            transition: "opacity 0.3s",
          }}
        />
      ))}

      {/* Orbiting particles */}
      {Array.from({ length: RING_PARTICLES }).map((_, i) => (
        <div
          key={`particle-${i}`}
          ref={(el) => { if (el) particlesRef.current[i] = el; }}
          className="absolute top-0 left-0 rounded-full"
          style={{
            width: 3 + (i % 3),
            height: 3 + (i % 3),
            background: i % 4 === 0
              ? "hsl(var(--neon))"
              : i % 4 === 1
                ? "hsl(var(--neon-blue))"
                : i % 4 === 2
                  ? "hsl(var(--neon-teal))"
                  : "hsl(var(--neon-purple, 270 45% 55%))",
            boxShadow: `0 0 6px ${
              i % 4 === 0 ? "hsl(var(--neon) / 0.9)"
                : i % 4 === 1 ? "hsl(var(--neon-blue) / 0.9)"
                  : i % 4 === 2 ? "hsl(var(--neon-teal) / 0.9)"
                    : "hsl(var(--neon-purple, 270 45% 55%) / 0.9)"
            }`,
            opacity: 0,
            transition: "opacity 0.3s",
          }}
        />
      ))}

      {/* Outer ring — morphing shape */}
      <div
        ref={ringRef}
        className="absolute top-0 left-0 transition-[width,height,border-color,background,box-shadow,border-radius] duration-300"
        style={{
          width: hovering ? 64 : 44,
          height: hovering ? 64 : 44,
          borderRadius: "50%",
          border: `1.5px ${hovering ? "solid" : "dashed"} ${
            hovering ? "hsl(var(--neon) / 0.8)" : "hsl(var(--neon) / 0.25)"
          }`,
          background: hovering
            ? "conic-gradient(from 0deg, hsl(var(--neon) / 0.08), hsl(var(--neon-blue) / 0.06), hsl(var(--neon-teal) / 0.08), hsl(var(--neon) / 0.08))"
            : "transparent",
          boxShadow: clicking
            ? "0 0 30px hsl(var(--neon) / 0.7), 0 0 60px hsl(var(--neon-blue) / 0.4), 0 0 90px hsl(var(--neon-teal) / 0.2), inset 0 0 20px hsl(var(--neon) / 0.3)"
            : hovering
              ? "0 0 20px hsl(var(--neon) / 0.3), 0 0 40px hsl(var(--neon-blue) / 0.15)"
              : "0 0 8px hsl(var(--neon) / 0.1)",
          opacity: hidden ? 0 : 1,
        }}
      />

      {/* Inner dot with multi-layer glow */}
      <div
        ref={dotRef}
        className="absolute top-0 left-0 rounded-full transition-[background,box-shadow] duration-100"
        style={{
          width: 10,
          height: 10,
          background: clicking
            ? "hsl(var(--neon-blue))"
            : hovering
              ? "hsl(var(--neon-teal))"
              : "hsl(var(--neon))",
          boxShadow: `
            0 0 8px hsl(var(--neon) / 0.9),
            0 0 16px hsl(var(--neon) / 0.6),
            0 0 32px hsl(var(--neon-blue) / 0.4),
            0 0 64px hsl(var(--neon) / 0.2)
          `,
          opacity: hidden ? 0 : 1,
        }}
      />

      {/* Click burst particles */}
      {clickBursts.map(burst => (
        <div key={burst.id} className="absolute top-0 left-0" style={{ transform: `translate(${burst.x}px, ${burst.y}px)` }}>
          {Array.from({ length: CLICK_PARTICLES }).map((_, i) => {
            const angle = (i / CLICK_PARTICLES) * Math.PI * 2;
            const colors = ["--neon", "--neon-blue", "--neon-teal", "--neon-amber"];
            const color = colors[i % colors.length];
            return (
              <div
                key={i}
                className="absolute rounded-full"
                style={{
                  width: 4 + (i % 3),
                  height: 4 + (i % 3),
                  background: `hsl(var(${color}))`,
                  boxShadow: `0 0 8px hsl(var(${color}) / 0.8)`,
                  left: -2,
                  top: -2,
                  animation: `cursor-burst-${i % 4} 0.6s ease-out forwards`,
                  ["--burst-x" as string]: `${Math.cos(angle) * (50 + Math.random() * 30)}px`,
                  ["--burst-y" as string]: `${Math.sin(angle) * (50 + Math.random() * 30)}px`,
                }}
              />
            );
          })}
        </div>
      ))}

      {/* Keyframes for burst */}
      <style>{`
        @keyframes cursor-burst-0 {
          0% { transform: translate(0, 0) scale(1); opacity: 1; }
          100% { transform: translate(var(--burst-x), var(--burst-y)) scale(0); opacity: 0; }
        }
        @keyframes cursor-burst-1 {
          0% { transform: translate(0, 0) scale(1.2); opacity: 1; }
          50% { opacity: 0.8; }
          100% { transform: translate(var(--burst-x), var(--burst-y)) scale(0); opacity: 0; }
        }
        @keyframes cursor-burst-2 {
          0% { transform: translate(0, 0) scale(0.8); opacity: 1; }
          30% { transform: translate(calc(var(--burst-x) * 0.4), calc(var(--burst-y) * 0.4)) scale(1.3); opacity: 0.9; }
          100% { transform: translate(var(--burst-x), var(--burst-y)) scale(0); opacity: 0; }
        }
        @keyframes cursor-burst-3 {
          0% { transform: translate(0, 0) scale(1); opacity: 1; }
          60% { opacity: 0.6; }
          100% { transform: translate(var(--burst-x), var(--burst-y)) scale(0); opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default CustomCursor;
