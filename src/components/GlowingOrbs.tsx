import { motion } from "framer-motion";

const GlowingOrbs = () => (
  <div className="fixed inset-0 pointer-events-none z-[1] overflow-hidden">
    <motion.div
      className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full"
      style={{ background: "radial-gradient(circle, hsl(150 80% 45% / 0.06), transparent 70%)" }}
      animate={{ scale: [1, 1.15, 1], x: [0, 25, 0], y: [0, -15, 0] }}
      transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
    />
    <motion.div
      className="absolute top-1/3 -left-24 w-80 h-80 rounded-full"
      style={{ background: "radial-gradient(circle, hsl(200 90% 55% / 0.05), transparent 70%)" }}
      animate={{ scale: [1, 1.25, 1], y: [0, 35, 0] }}
      transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
    />
    <motion.div
      className="absolute bottom-1/3 right-1/3 w-52 h-52 rounded-full"
      style={{ background: "radial-gradient(circle, hsl(270 70% 60% / 0.04), transparent 70%)" }}
      animate={{ scale: [1, 1.3, 1], x: [0, -25, 0] }}
      transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
    />
  </div>
);

export default GlowingOrbs;
