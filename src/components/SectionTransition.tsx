import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

type Variant = "wave" | "diagonal" | "reveal" | "particles";

const SectionTransition = ({ variant = "wave" }: { variant?: Variant }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const scaleX = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 1, 0.3]);

  if (variant === "wave") {
    return (
      <div ref={ref} className="relative h-24 -my-12 z-20 pointer-events-none overflow-hidden">
        <motion.div style={{ opacity }} className="absolute inset-0 flex items-center">
          <motion.div
            style={{ scaleX }}
            className="w-full h-[1px] origin-center"
          >
            <div className="w-full h-full bg-gradient-to-r from-transparent via-[hsl(38,80%,58%)] to-transparent" />
          </motion.div>
        </motion.div>
        {/* Glowing orb that travels across */}
        <motion.div
          style={{ opacity }}
          className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-center"
        >
          <motion.div
            className="w-2 h-2 rounded-full bg-primary shadow-[0_0_20px_8px_hsl(38,80%,58%,0.4)]"
            animate={{ x: [-200, 200, -200] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </div>
    );
  }

  if (variant === "diagonal") {
    return (
      <div ref={ref} className="relative h-32 -my-16 z-20 pointer-events-none overflow-hidden">
        <motion.div style={{ opacity }} className="absolute inset-0">
          <motion.div
            className="absolute inset-0"
            style={{ scaleX }}
          >
            <div className="absolute top-0 left-0 right-0 h-full"
              style={{
                background: `linear-gradient(135deg, transparent 40%, hsl(38,80%,58%,0.08) 50%, transparent 60%)`,
              }}
            />
          </motion.div>
          {/* Diagonal sparkle lines */}
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-[1px] w-32 origin-left"
              style={{
                top: `${30 + i * 20}%`,
                left: `${20 + i * 25}%`,
                rotate: -15,
                background: `linear-gradient(90deg, transparent, hsl(165,50%,42%,0.5), transparent)`,
              }}
              animate={{ opacity: [0, 0.8, 0], x: [-20, 20, -20] }}
              transition={{ duration: 2.5, delay: i * 0.4, repeat: Infinity }}
            />
          ))}
        </motion.div>
      </div>
    );
  }

  if (variant === "reveal") {
    const clipPath = useTransform(
      scrollYProgress,
      [0, 0.5, 1],
      [
        "polygon(45% 50%, 55% 50%, 55% 50%, 45% 50%)",
        "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        "polygon(45% 50%, 55% 50%, 55% 50%, 45% 50%)",
      ]
    );

    return (
      <div ref={ref} className="relative h-28 -my-14 z-20 pointer-events-none overflow-hidden">
        <motion.div
          style={{ clipPath, opacity }}
          className="absolute inset-0 bg-gradient-to-r from-[hsl(38,80%,58%,0.04)] via-[hsl(38,80%,58%,0.08)] to-[hsl(165,50%,42%,0.04)]"
        />
        <motion.div style={{ opacity }} className="absolute inset-0 flex items-center justify-center">
          <motion.div
            className="w-8 h-8 rounded-full border border-primary/30"
            animate={{ scale: [0.8, 1.5, 0.8], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
        </motion.div>
      </div>
    );
  }

  // particles
  return (
    <div ref={ref} className="relative h-20 -my-10 z-20 pointer-events-none overflow-hidden">
      <motion.div style={{ opacity }} className="absolute inset-0">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full"
            style={{
              left: `${10 + i * 11}%`,
              top: "50%",
              background: i % 2 === 0 ? "hsl(38,80%,58%)" : "hsl(165,50%,42%)",
              boxShadow: `0 0 8px ${i % 2 === 0 ? "hsl(38,80%,58%,0.6)" : "hsl(165,50%,42%,0.6)"}`,
            }}
            animate={{
              y: [0, -15, 0, 15, 0],
              opacity: [0.3, 1, 0.3],
            }}
            transition={{
              duration: 2 + i * 0.3,
              delay: i * 0.15,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </motion.div>
    </div>
  );
};

export default SectionTransition;
