import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const loadingSteps = [
  "Initializing portfolio experience...",
  "Loading neural networks...",
  "Preparing AI systems...",
  "Almost ready...",
];

const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);
  const [stepIndex, setStepIndex] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const duration = 2800;
    const interval = 30;
    let elapsed = 0;

    const timer = setInterval(() => {
      elapsed += interval;
      const p = Math.min((elapsed / duration) * 100, 100);
      setProgress(p);
      setStepIndex(Math.min(Math.floor(p / 25), loadingSteps.length - 1));

      if (elapsed >= duration) {
        clearInterval(timer);
        setTimeout(() => setDone(true), 300);
        setTimeout(onComplete, 800);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[200] bg-background flex flex-col items-center justify-center"
          exit={{ opacity: 0, scale: 1.08 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          {/* Animated logo circle */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, type: "spring", stiffness: 200 }}
            className="relative mb-10"
          >
            {/* Outer glow ring */}
            <motion.div
              className="absolute inset-0 rounded-full blur-xl opacity-40"
              style={{ background: "linear-gradient(135deg, hsl(var(--neon)), hsl(var(--neon-blue)))" }}
              animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.5, 0.3] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            {/* Circle */}
            <div className="relative w-28 h-28 rounded-full flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, hsl(var(--neon)), hsl(var(--neon-blue)))" }}
            >
              {/* Spinning border */}
              <motion.div
                className="absolute inset-[-3px] rounded-full border-2 border-transparent"
                style={{ borderTopColor: "hsl(var(--neon))", borderRightColor: "hsl(var(--neon-blue))" }}
                animate={{ rotate: 360 }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              />
              <span className="text-3xl font-display font-extrabold text-background">MK</span>
            </div>
          </motion.div>

          {/* Welcome text */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-2xl md:text-3xl font-display font-bold text-foreground mb-8 text-center"
          >
            Welcome to <span className="neon-text">Madhukumar's</span> Portfolio
          </motion.h2>

          {/* Progress bar */}
          <motion.div
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: "20rem" }}
            transition={{ delay: 0.5, duration: 0.4 }}
            className="max-w-xs w-full"
          >
            <div className="h-1.5 bg-secondary/50 rounded-full overflow-hidden backdrop-blur-sm">
              <motion.div
                className="h-full rounded-full"
                style={{
                  background: "linear-gradient(90deg, hsl(var(--neon)), hsl(var(--neon-blue)))",
                  width: `${progress}%`,
                }}
              />
            </div>
          </motion.div>

          {/* Step text */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="mt-4 text-sm text-muted-foreground font-mono"
          >
            {loadingSteps[stepIndex]}
          </motion.p>

          {/* Floating particles */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                width: 6 + Math.random() * 10,
                height: 6 + Math.random() * 10,
                background: i % 2 === 0 ? "hsl(var(--neon) / 0.6)" : "hsl(var(--neon-blue) / 0.5)",
                left: `${15 + Math.random() * 70}%`,
                top: `${20 + Math.random() * 60}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.3, 0.7, 0.3],
                scale: [1, 1.3, 1],
              }}
              transition={{
                duration: 2 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 1.5,
              }}
            />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
