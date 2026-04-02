import { motion, useInView, type Variant } from "framer-motion";
import { useRef, type ReactNode } from "react";

type RevealVariant = "fadeUp" | "fadeDown" | "fadeLeft" | "fadeRight" | "scaleUp" | "flipUp" | "blurIn" | "slideRotate" | "glowIn";

const variants: Record<RevealVariant, { hidden: Variant; visible: Variant }> = {
  fadeUp: {
    hidden: { opacity: 0, y: 60, filter: "blur(6px)" },
    visible: { opacity: 1, y: 0, filter: "blur(0px)" },
  },
  fadeDown: {
    hidden: { opacity: 0, y: -50, filter: "blur(4px)" },
    visible: { opacity: 1, y: 0, filter: "blur(0px)" },
  },
  fadeLeft: {
    hidden: { opacity: 0, x: -80, filter: "blur(4px)" },
    visible: { opacity: 1, x: 0, filter: "blur(0px)" },
  },
  fadeRight: {
    hidden: { opacity: 0, x: 80, filter: "blur(4px)" },
    visible: { opacity: 1, x: 0, filter: "blur(0px)" },
  },
  scaleUp: {
    hidden: { opacity: 0, scale: 0.8, filter: "blur(8px)" },
    visible: { opacity: 1, scale: 1, filter: "blur(0px)" },
  },
  flipUp: {
    hidden: { opacity: 0, rotateX: 25, y: 40, transformPerspective: 800 },
    visible: { opacity: 1, rotateX: 0, y: 0, transformPerspective: 800 },
  },
  blurIn: {
    hidden: { opacity: 0, filter: "blur(20px)", scale: 0.95 },
    visible: { opacity: 1, filter: "blur(0px)", scale: 1 },
  },
  slideRotate: {
    hidden: { opacity: 0, x: -40, rotate: -3 },
    visible: { opacity: 1, x: 0, rotate: 0 },
  },
  glowIn: {
    hidden: { opacity: 0, scale: 0.9, filter: "blur(10px) brightness(1.5)" },
    visible: { opacity: 1, scale: 1, filter: "blur(0px) brightness(1)" },
  },
};

interface ScrollRevealProps {
  children: ReactNode;
  variant?: RevealVariant;
  delay?: number;
  duration?: number;
  className?: string;
  once?: boolean;
  margin?: string;
  staggerIndex?: number;
  staggerDelay?: number;
}

const ScrollReveal = ({
  children,
  variant = "fadeUp",
  delay = 0,
  duration = 0.9,
  className = "",
  once = false,
  margin = "-80px",
  staggerIndex = 0,
  staggerDelay = 0.08,
}: ScrollRevealProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin: margin as any });
  const v = variants[variant];

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        hidden: v.hidden,
        visible: v.visible,
      }}
      transition={{
        duration,
        delay: delay + staggerIndex * staggerDelay,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default ScrollReveal;
