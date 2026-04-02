import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect } from "react";
import { ArrowDown, ChevronRight, Download, MapPin } from "lucide-react";
import TextType from "./TextType";
import { downloadCVAsPDF } from "@/lib/downloadCV";

const roles = ["AI/ML Engineer", "Builder", "Innovator", "Problem Solver"];

const HeroSection = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 40, damping: 25 });
  const springY = useSpring(mouseY, { stiffness: 40, damping: 25 });
  const cardRotateX = useTransform(springY, [-400, 400], [8, -8]);
  const cardRotateY = useTransform(springX, [-400, 400], [-8, 8]);
  const photoX = useTransform(springX, [-400, 400], [10, -10]);
  const photoY = useTransform(springY, [-400, 400], [10, -10]);

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      mouseX.set(e.clientX - window.innerWidth / 2);
      mouseY.set(e.clientY - window.innerHeight / 2);
    };
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, [mouseX, mouseY]);

  const stagger = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
  };
  const fadeUp = {
    hidden: { opacity: 0, y: 25 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 overflow-hidden pt-20 lg:pt-0">
      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left */}
          <motion.div variants={stagger} initial="hidden" animate="show">
            <motion.div variants={fadeUp} className="flex items-center gap-3 mb-8">
              <span className="neon-badge">
                <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
                Open to opportunities
              </span>
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <MapPin className="w-3 h-3" /> India
              </span>
            </motion.div>

            <motion.h1 variants={fadeUp} className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-extrabold leading-[1.05] mb-6 tracking-tight">
              Hi, I'm{" "}
              <span className="neon-text">Madhu</span>
              <span className="neon-text">kumar</span>
            </motion.h1>

            <motion.div variants={fadeUp} className="flex items-center gap-2 mb-6">
              <span className="w-8 h-[2px] bg-primary rounded-full" />
              <TextType
                text={roles}
                typingSpeed={120}
                deletingSpeed={60}
                pauseDuration={2500}
                initialDelay={1200}
                showCursor
                cursorCharacter="_"
                cursorBlinkDuration={0.7}
                startOnVisible
                className="text-lg md:text-xl font-display font-medium text-foreground"
                cursorClassName="text-primary text-xl"
              />
            </motion.div>

            <motion.p variants={fadeUp} className="text-muted-foreground text-base md:text-lg leading-relaxed mb-8 max-w-md">
              Building intelligent systems using{" "}
              <span className="text-foreground font-medium">AI</span>,{" "}
              <span className="text-foreground font-medium">Computer Vision</span>, and{" "}
              <span className="text-foreground font-medium">Voice Technologies</span>{" "}
              to solve real-world problems.
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-wrap gap-3 mb-10">
              {["AI/ML", "Computer Vision", "Voice Tech", "Python", "OpenCV"].map((tag) => (
                <motion.span
                  key={tag}
                  className="tech-tag"
                  whileHover={{ scale: 1.1, borderColor: "hsl(var(--neon) / 0.4)" }}
                >
                  {tag}
                </motion.span>
              ))}
            </motion.div>

            <motion.div variants={fadeUp} className="flex flex-wrap gap-3">
              <a href="#projects" className="btn-neon flex items-center gap-2">
                View Projects <ChevronRight className="w-4 h-4" />
              </a>
              <a href="#contact" className="btn-ghost">Get in Touch</a>
              <button onClick={downloadCVAsPDF} className="btn-ghost flex items-center gap-2 border border-primary/30 hover:border-primary/60">
                <Download className="w-4 h-4" /> Download CV
              </button>
            </motion.div>
          </motion.div>

          {/* Right — Profile + Code Card Stack */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative flex flex-col items-center gap-6"
          >
            {/* Profile photo with parallax */}
            <motion.div
              style={{ x: photoX, y: photoY }}
              className="relative"
            >
              {/* Professional frame - tight fit */}
              <div className="absolute -inset-1.5 rounded-[1.75rem] z-0">
                <div className="absolute inset-0 rounded-[1.75rem] p-[2px]"
                  style={{ background: "linear-gradient(145deg, hsl(38,80%,68%), hsl(38,60%,35%), hsl(38,80%,58%), hsl(38,60%,30%))" }}
                >
                  <div className="w-full h-full rounded-[calc(1.75rem-2px)] bg-background" />
                </div>
                <div className="absolute inset-[4px] rounded-[calc(1.75rem-4px)] p-[1px]"
                  style={{ background: "linear-gradient(145deg, hsl(38,80%,58%,0.4), transparent 40%, hsl(165,50%,42%,0.3) 80%, transparent)" }}
                >
                  <div className="w-full h-full rounded-[calc(1.75rem-5px)] bg-background" />
                </div>
              </div>

              {/* Corner accents */}
              {[
                "top-0 left-0 border-t-2 border-l-2 rounded-tl-[1.75rem]",
                "top-0 right-0 border-t-2 border-r-2 rounded-tr-[1.75rem]",
                "bottom-0 left-0 border-b-2 border-l-2 rounded-bl-[1.75rem]",
                "bottom-0 right-0 border-b-2 border-r-2 rounded-br-[1.75rem]",
              ].map((pos, i) => (
                <motion.div
                  key={i}
                  className={`absolute w-6 h-6 ${pos} border-primary/50 z-20`}
                  style={{ margin: "-1.5px" }}
                  animate={{ opacity: [0.4, 0.8, 0.4] }}
                  transition={{ duration: 2.5, delay: i * 0.3, repeat: Infinity }}
                />
              ))}

              <motion.div
                className="w-72 h-96 md:w-96 md:h-[500px] lg:w-[420px] lg:h-[560px] relative z-10 rounded-[1.75rem] overflow-hidden"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {/* Subtle vignette overlay */}
                <div className="absolute inset-0 z-20 pointer-events-none rounded-[1.75rem]"
                  style={{ boxShadow: "inset 0 0 60px hsl(222,30%,4%,0.4)" }}
                />
                <img
                  src="/profile.png"
                  alt="Madhukumar"
                  width={512}
                  height={512}
                  className="w-full h-full object-cover drop-shadow-[0_0_30px_hsl(var(--neon)/0.3)]"
                />
              </motion.div>

              {/* Subtle ambient glow */}
              <motion.div
                className="absolute inset-0 rounded-[2rem] blur-3xl opacity-15 -z-10"
                style={{ background: "radial-gradient(ellipse at center, hsl(var(--neon)), transparent 70%)" }}
                animate={{ opacity: [0.12, 0.22, 0.12] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.div>

          </motion.div>
        </div>

        {/* Scroll */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 2, repeat: Infinity }} className="text-muted-foreground">
            <ArrowDown className="w-5 h-5" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
