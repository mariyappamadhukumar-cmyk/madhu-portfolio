import { motion, useScroll, useTransform } from "framer-motion";

const CinematicBackground = () => {
  const { scrollYProgress } = useScroll();

  // Parallax positions for each orb
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -500]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -700]);
  const y4 = useTransform(scrollYProgress, [0, 1], [0, 400]);

  // Scale shifts
  const scale1 = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.6, 0.8]);
  const scale2 = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.7, 1.5]);
  const scale3 = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.8, 1.4, 0.6, 1.2]);

  // Opacity breathing
  const op1 = useTransform(scrollYProgress, [0, 0.3, 0.6, 1], [0.25, 0.15, 0.35, 0.1]);
  const op2 = useTransform(scrollYProgress, [0, 0.3, 0.6, 1], [0.15, 0.3, 0.1, 0.25]);
  const op3 = useTransform(scrollYProgress, [0, 0.4, 0.8, 1], [0.1, 0.25, 0.35, 0.05]);
  const op4 = useTransform(scrollYProgress, [0, 0.5, 1], [0.2, 0.05, 0.3]);

  // X drift
  const x1 = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const x2 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const x3 = useTransform(scrollYProgress, [0, 1], [0, 100]);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {/* Green orb — top right */}
      <motion.div
        className="absolute -top-[10%] right-[5%] w-[600px] h-[600px] rounded-full"
        style={{
          y: y1,
          x: x1,
          scale: scale1,
          opacity: op1,
          background: "radial-gradient(circle, hsl(150 80% 45% / 0.6), transparent 65%)",
          filter: "blur(80px)",
        }}
      />

      {/* Blue orb — left middle */}
      <motion.div
        className="absolute top-[30%] -left-[10%] w-[700px] h-[700px] rounded-full"
        style={{
          y: y2,
          x: x2,
          scale: scale2,
          opacity: op2,
          background: "radial-gradient(circle, hsl(200 90% 55% / 0.5), transparent 60%)",
          filter: "blur(100px)",
        }}
      />

      {/* Purple orb — bottom right */}
      <motion.div
        className="absolute top-[55%] right-[15%] w-[500px] h-[500px] rounded-full"
        style={{
          y: y3,
          x: x3,
          scale: scale3,
          opacity: op3,
          background: "radial-gradient(circle, hsl(270 70% 60% / 0.5), transparent 60%)",
          filter: "blur(90px)",
        }}
      />

      {/* Amber/pink orb — bottom left */}
      <motion.div
        className="absolute top-[75%] left-[10%] w-[450px] h-[450px] rounded-full"
        style={{
          y: y4,
          opacity: op4,
          background: "radial-gradient(circle, hsl(330 80% 60% / 0.4), transparent 65%)",
          filter: "blur(70px)",
        }}
      />

      {/* Subtle film grain */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
};

export default CinematicBackground;
