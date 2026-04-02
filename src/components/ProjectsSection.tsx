import { motion, useInView, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, useState, useCallback } from "react";
import { Github, ArrowUpRight, X, CheckCircle2, Zap, Sparkles, ChevronDown, ArrowLeft } from "lucide-react";
import ScrollFloat from "./ScrollFloat";

import projectRacing from "@/assets/project-racing.jpg";
import projectPranava from "@/assets/project-pranava.jpg";
import projectVoice from "@/assets/project-voice.jpg";
import projectPocketview from "@/assets/project-pocketview.jpg";
import projectEnglish from "@/assets/project-english.jpg";
import projectHeat from "@/assets/project-heat.jpg";
import projectFacerecog from "@/assets/project-facerecog.jpg";
import projectDrone from "@/assets/project-drone.jpg";
import projectCompiler from "@/assets/project-compiler.jpg";
import projectRover from "@/assets/project-rover.jpg";
import projectLinktrack from "@/assets/project-linktrack.jpg";
import projectPlant from "@/assets/project-plant.jpg";

const projects = [
  {
    title: "Multi-Language Online Compiler",
    desc: "Web-based IDE supporting 9+ languages including C, C++, Java, Python, TypeScript, Go, Rust, Ruby, and JavaScript.",
    tech: ["React", "Node.js", "Docker", "TypeScript"],
    category: "Full Stack",
    featured: true,
    image: projectCompiler,
    gradient: "from-[hsl(150,80%,45%)] to-[hsl(200,90%,55%)]",
    accentVar: "--neon",
    features: [
      "Support for 9+ programming languages (C, C++, Java, Python, TS, Go, Rust, Ruby, JS)",
      "Real-time code execution with Docker sandboxing",
      "Syntax highlighting and auto-completion",
      "Code sharing via unique URLs",
      "Input/output console with error handling",
      "Dark/light theme with customizable editor",
    ],
  },
  {
    title: "Plant Disease Detection System",
    desc: "AI-powered plant leaf disease identification using CNN image classification for farmers.",
    tech: ["Python", "TensorFlow", "Keras", "Flask"],
    category: "AI / ML",
    featured: true,
    image: projectPlant,
    gradient: "from-[hsl(150,80%,45%)] to-[hsl(38,90%,55%)]",
    accentVar: "--neon",
    features: [
      "CNN-based leaf disease classification",
      "38 disease category recognition",
      "Mobile-friendly camera capture interface",
      "Treatment recommendation engine",
      "Dataset: 50K+ labeled leaf images",
      "Model accuracy: 96%+ validation",
    ],
  },
  {
    title: "Farmer Friendly Rover",
    desc: "Autonomous agricultural rover with soil analysis, crop monitoring, and pest detection using embedded sensors.",
    tech: ["Arduino", "Raspberry Pi", "Python", "Sensors"],
    category: "Hardware",
    featured: true,
    image: projectRover,
    gradient: "from-[hsl(150,80%,45%)] to-[hsl(38,90%,55%)]",
    accentVar: "--neon",
    features: [
      "Autonomous navigation with ultrasonic sensors",
      "Soil moisture and pH level analysis",
      "Camera-based crop health monitoring",
      "Pest detection using image classification",
      "Solar-powered battery system",
      "Data transmission via WiFi to farmer dashboard",
    ],
  },
  {
    title: "Link with Track – Alumni-Mentor Platform",
    desc: "Connects mentees with alumni mentors based on matching skills, projects, and career goals.",
    tech: ["React", "Python", "ML", "Firebase"],
    category: "Full Stack",
    featured: true,
    image: projectLinktrack,
    gradient: "from-[hsl(270,70%,60%)] to-[hsl(200,90%,55%)]",
    accentVar: "--neon-purple",
    features: [
      "AI-based mentor-mentee skill matching algorithm",
      "Alumni profile with project and skill showcase",
      "One mentor to many mentees connection system",
      "Real-time chat and video call integration",
      "Career roadmap and goal tracking",
      "Event and workshop scheduling system",
    ],
  },
  {
    title: "Drone Path Planning with CV",
    desc: "Autonomous drone navigation using computer vision for obstacle detection and optimal path planning.",
    tech: ["Python", "OpenCV", "ROS", "A* Algorithm"],
    category: "AI / CV",
    featured: true,
    image: projectDrone,
    gradient: "from-[hsl(38,90%,55%)] to-[hsl(150,80%,45%)]",
    accentVar: "--neon-amber",
    features: [
      "Computer vision-based obstacle detection",
      "A* pathfinding algorithm implementation",
      "ROS integration for drone control",
      "Real-time 3D environment mapping",
      "GPS waypoint navigation system",
      "Emergency landing protocol",
    ],
  },
  {
    title: "Face Recognition Attendance System",
    desc: "Automated attendance tracking using real-time face detection and recognition with database logging.",
    tech: ["Python", "OpenCV", "dlib", "SQLite"],
    category: "AI / CV",
    featured: true,
    image: projectFacerecog,
    gradient: "from-[hsl(200,90%,55%)] to-[hsl(150,80%,45%)]",
    accentVar: "--neon-blue",
    features: [
      "Real-time face detection with Haar cascades",
      "Face encoding and recognition using dlib",
      "Automated attendance logging to SQLite DB",
      "Admin dashboard for attendance reports",
      "Multi-face simultaneous recognition",
      "Anti-spoofing liveness detection",
    ],
  },
  {
    title: "AI Gesture & Voice Controlled Car Racing Game",
    desc: "Real-time gesture control using OpenCV with voice commands, dynamic obstacles, and day/night cycle UI.",
    tech: ["Python", "OpenCV", "Speech Recognition", "Pygame"],
    category: "AI / CV",
    image: projectRacing,
    gradient: "from-[hsl(150,80%,45%)] to-[hsl(200,90%,55%)]",
    accentVar: "--neon",
    features: [
      "Hand gesture detection using OpenCV & MediaPipe",
      "Voice command integration for game controls",
      "Dynamic obstacle generation with difficulty scaling",
      "Day/night cycle with visual effects",
      "Real-time FPS counter and score tracking",
      "Multi-lane car movement with collision detection",
    ],
  },
  {
    title: "Pranava AI – Healthcare Assistant",
    desc: "AI-based disease prediction with health suggestions and a user-friendly interface.",
    tech: ["Python", "ML", "Flask", "NLP"],
    category: "AI / ML",
    image: projectPranava,
    gradient: "from-[hsl(270,70%,60%)] to-[hsl(330,80%,60%)]",
    accentVar: "--neon-purple",
    features: [
      "Symptom-based disease prediction using ML models",
      "Health suggestion engine with NLP",
      "Flask REST API backend",
      "User-friendly web dashboard",
      "Medical data preprocessing pipeline",
      "Multi-disease classification support",
    ],
  },
  {
    title: "AI Voice Assistant",
    desc: "Speech recognition + TTS with Wikipedia, YouTube & Spotify integration and multi-language support.",
    tech: ["Python", "Speech Recognition", "TTS", "APIs"],
    category: "Voice AI",
    image: projectVoice,
    gradient: "from-[hsl(200,90%,55%)] to-[hsl(270,70%,60%)]",
    accentVar: "--neon-blue",
    features: [
      "Real-time speech-to-text conversion",
      "Text-to-speech with natural voice output",
      "Wikipedia search integration",
      "YouTube & Spotify playback control",
      "Multi-language support (English, Tamil)",
      "Wake word activation system",
    ],
  },
  {
    title: "PocketView AI – Expense Tracker",
    desc: "Voice-based expense input with OCR receipt scanning and AI-powered budget insights.",
    tech: ["Python", "OCR", "ML", "Flask"],
    category: "AI / ML",
    image: projectPocketview,
    gradient: "from-[hsl(38,90%,55%)] to-[hsl(0,72%,55%)]",
    accentVar: "--neon-amber",
    features: [
      "OCR-based receipt scanning with Tesseract",
      "Voice input for quick expense logging",
      "AI-powered spending pattern analysis",
      "Budget recommendations using ML",
      "Category-wise expense visualization",
      "Monthly/weekly report generation",
    ],
  },
  {
    title: "English Buddy AI",
    desc: "Real-time grammar correction with voice-based interactive English learning.",
    tech: ["Python", "NLP", "Speech Recognition", "Kivy"],
    category: "NLP",
    image: projectEnglish,
    gradient: "from-[hsl(330,80%,60%)] to-[hsl(38,90%,55%)]",
    accentVar: "--neon-pink",
    features: [
      "Real-time grammar error detection",
      "Voice-based interactive lessons",
      "NLP-powered sentence correction",
      "Progress tracking dashboard",
      "Kivy cross-platform mobile UI",
      "Vocabulary builder with spaced repetition",
    ],
  },
  {
    title: "Heat Energy Conversion System",
    desc: "Converts waste heat to electricity using thermoelectric generators for sustainable energy.",
    tech: ["Hardware", "Thermoelectric", "IoT", "MATLAB"],
    category: "Hardware",
    image: projectHeat,
    gradient: "from-[hsl(150,80%,45%)] to-[hsl(38,90%,55%)]",
    accentVar: "--neon",
    features: [
      "Thermoelectric generator (TEG) module integration",
      "Temperature differential monitoring sensors",
      "MATLAB simulation for efficiency analysis",
      "IoT-based real-time data logging",
      "LED indicator for power output levels",
      "Sustainable energy conversion prototype",
    ],
  },
];

type Project = (typeof projects)[number];

/* ─── 3D Tilt Card ─── */
const ProjectCard3D = ({
  project,
  onClick,
  index,
  isInView,
}: {
  project: Project;
  onClick: () => void;
  index: number;
  isInView: boolean;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [spotlightPos, setSpotlightPos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), { stiffness: 200, damping: 20 });

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
    setSpotlightPos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  }, [mouseX, mouseY]);

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, rotateX: 15 }}
      animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
      transition={{ delay: 0.08 + index * 0.08, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="relative group"
      style={{ perspective: 800 }}
    >
      <motion.div
        ref={cardRef}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        onClick={onClick}
        className="cursor-pointer relative"
      >
        {/* Animated gradient border */}
        <div
          className="absolute -inset-[1px] rounded-2xl opacity-0 group-hover:opacity-80 transition-opacity duration-500 blur-[2px]"
          style={{
            background: `linear-gradient(135deg, hsl(var(${project.accentVar})), hsl(var(--neon-blue)), hsl(var(--neon-teal)))`,
            backgroundSize: "200% 200%",
            animation: isHovered ? "gradient-shift 3s ease infinite" : "none",
          }}
        />

        <div className="glass-card relative flex flex-col overflow-hidden">
          {/* Spotlight overlay */}
          <div
            className="absolute inset-0 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
            style={{
              background: `radial-gradient(circle 200px at ${spotlightPos.x}% ${spotlightPos.y}%, hsl(var(${project.accentVar}) / 0.15), transparent 70%)`,
            }}
          />

          {/* Holographic shimmer on hover */}
          <div
            className="absolute inset-0 z-10 opacity-0 group-hover:opacity-30 transition-opacity duration-700 pointer-events-none"
            style={{
              background: `linear-gradient(${105 + spotlightPos.x * 0.5}deg, transparent 20%, hsl(var(--neon) / 0.08) 40%, hsl(var(--neon-blue) / 0.12) 50%, hsl(var(--neon-teal) / 0.08) 60%, transparent 80%)`,
            }}
          />

          {/* Image with parallax */}
          <div className="relative overflow-hidden">
            <motion.img
              src={project.image}
              alt={project.title}
              loading="lazy"
              width={768}
              height={512}
              className="w-full h-44 object-cover"
              style={{
                scale: isHovered ? 1.12 : 1,
                transition: "scale 0.7s cubic-bezier(0.33, 1, 0.68, 1)",
              }}
            />
            {/* Color sweep on hover */}
            <motion.div
              className="absolute inset-0 mix-blend-overlay"
              initial={{ x: "-100%", opacity: 0 }}
              animate={isHovered ? { x: "100%", opacity: 0.4 } : { x: "-100%", opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              style={{
                background: `linear-gradient(90deg, transparent, hsl(var(${project.accentVar}) / 0.5), transparent)`,
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />

            {/* Floating category badge */}
            <motion.div
              className="absolute top-3 left-3 z-20"
              style={{ transform: "translateZ(20px)" }}
            >
              <span
                className="text-xs px-2.5 py-1 rounded-full font-medium backdrop-blur-md"
                style={{
                  background: `hsl(var(${project.accentVar}) / 0.15)`,
                  color: `hsl(var(${project.accentVar}))`,
                  border: `1px solid hsl(var(${project.accentVar}) / 0.3)`,
                  boxShadow: `0 2px 12px hsl(var(${project.accentVar}) / 0.15)`,
                }}
              >
                {project.category}
              </span>
            </motion.div>
          </div>

          {/* Header with featured badge */}
          <div className="p-5 pb-0 flex items-center justify-end">
            {project.featured && (
              <motion.span
                className="text-xs px-2.5 py-1 rounded-full font-medium flex items-center gap-1"
                style={{
                  background: "hsl(var(--neon-amber) / 0.1)",
                  color: "hsl(var(--neon-amber))",
                  border: "1px solid hsl(var(--neon-amber) / 0.2)",
                }}
                animate={{ 
                  boxShadow: [
                    "0 0 0px hsl(var(--neon-amber) / 0)",
                    "0 0 12px hsl(var(--neon-amber) / 0.3)",
                    "0 0 0px hsl(var(--neon-amber) / 0)",
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Sparkles className="w-3 h-3" /> Featured
              </motion.span>
            )}
          </div>

          {/* Content */}
          <div className="p-5 flex-1 flex flex-col" style={{ transform: "translateZ(10px)" }}>
            <h3 className="text-[15px] font-display font-semibold mb-2 leading-snug">
              <span
                className="transition-all duration-500"
                style={{
                  background: isHovered
                    ? `linear-gradient(90deg, hsl(var(${project.accentVar})), hsl(var(--neon-blue)))`
                    : "none",
                  WebkitBackgroundClip: isHovered ? "text" : "unset",
                  WebkitTextFillColor: isHovered ? "transparent" : "hsl(var(--foreground))",
                  filter: isHovered ? `drop-shadow(0 0 8px hsl(var(${project.accentVar}) / 0.3))` : "none",
                }}
              >
                {project.title}
              </span>
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed mb-4 flex-1">
              {project.desc}
            </p>

            <div className="flex flex-wrap gap-1.5 mb-4">
              {project.tech.slice(0, 3).map((t, ti) => (
                <motion.span
                  key={t}
                  className="px-2 py-0.5 text-[11px] rounded-md font-medium transition-all duration-300"
                  whileHover={{ scale: 1.15, y: -2 }}
                  style={{
                    background: isHovered ? `hsl(var(${project.accentVar}) / 0.1)` : "hsl(var(--secondary))",
                    color: isHovered ? `hsl(var(${project.accentVar}))` : "hsl(var(--muted-foreground))",
                    border: isHovered ? `1px solid hsl(var(${project.accentVar}) / 0.2)` : "1px solid transparent",
                    transitionDelay: `${ti * 50}ms`,
                  }}
                >
                  {t}
                </motion.span>
              ))}
              {project.tech.length > 3 && (
                <span className="px-2 py-0.5 text-[11px] rounded-md font-medium bg-secondary text-muted-foreground">
                  +{project.tech.length - 3}
                </span>
              )}
            </div>

            <div
              className="flex items-center gap-2 pt-3 border-t border-border text-xs font-medium transition-colors duration-300"
              style={{ color: `hsl(var(${project.accentVar}))` }}
            >
              <Zap className="w-3.5 h-3.5" />
              <span className="group-hover:tracking-wider transition-all duration-300">
                Click to explore
              </span>
              <motion.div
                className="ml-auto"
                animate={isHovered ? { x: [0, 4, 0] } : {}}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <ArrowUpRight className="w-3.5 h-3.5" />
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};


const ProjectModal = ({ project, onClose }: { project: Project; onClose: () => void }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-md"
    onClick={onClose}
  >
    <motion.div
      initial={{ scale: 0.85, opacity: 0, y: 40, rotateX: 8 }}
      animate={{ scale: 1, opacity: 1, y: 0, rotateX: 0 }}
      exit={{ scale: 0.85, opacity: 0, y: 40, rotateX: 8 }}
      transition={{ type: "spring", stiffness: 280, damping: 22 }}
      className="glass-card w-full max-w-2xl max-h-[85vh] overflow-y-auto relative"
      onClick={(e) => e.stopPropagation()}
      style={{ transformStyle: "preserve-3d" }}
    >
      {/* Image */}
      <div className="relative overflow-hidden rounded-t-xl">
        <img src={project.image} alt={project.title} className="w-full h-56 object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        <button
          onClick={onClose}
          className="absolute top-3 left-3 md:top-3 md:right-3 p-2.5 rounded-lg bg-background/70 backdrop-blur-sm text-foreground hover:bg-background/90 transition-all duration-300 flex items-center gap-2 md:gap-0 text-sm md:text-xs font-medium md:font-normal"
        >
          <ArrowLeft className="w-4 h-4 md:hidden" /> Back
          <X className="w-4 h-4 hidden md:block" />
        </button>
        <div className="absolute bottom-4 left-5 right-5">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs px-2 py-0.5 rounded-full bg-primary/20 text-primary font-medium">
              {project.category}
            </span>
            {project.featured && (
              <span className="text-xs px-2 py-0.5 rounded-full font-medium flex items-center gap-1"
                style={{
                  background: "hsl(var(--neon-amber) / 0.2)",
                  color: "hsl(var(--neon-amber))",
                }}
              >
                <Sparkles className="w-3 h-3" /> Featured
              </span>
            )}
          </div>
          <h3
            className="text-xl font-display font-bold bg-clip-text text-transparent"
            style={{
              backgroundImage: `linear-gradient(135deg, hsl(var(${project.accentVar})), hsl(var(--foreground)))`,
            }}
          >
            {project.title}
          </h3>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <p className="text-sm text-muted-foreground leading-relaxed mb-6">{project.desc}</p>

        <div className="mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Zap className="w-4 h-4 text-primary" />
            <h4
              className="text-sm font-display font-semibold bg-clip-text text-transparent"
              style={{
                backgroundImage: `linear-gradient(90deg, hsl(var(${project.accentVar})), hsl(var(--foreground)))`,
              }}
            >
              Key Features
            </h4>
          </div>
          <div className="grid gap-2.5">
            {project.features.map((feature, i) => (
              <motion.div
                key={feature}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + i * 0.06 }}
                className="flex items-start gap-2.5 text-sm group/feat"
              >
                <CheckCircle2
                  className="w-4 h-4 mt-0.5 shrink-0 transition-colors"
                  style={{ color: `hsl(var(${project.accentVar}))` }}
                />
                <span className="text-secondary-foreground group-hover/feat:text-foreground transition-colors">
                  {feature}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <h4 className="text-xs font-display font-semibold text-muted-foreground mb-3 uppercase tracking-wider">
            Technologies Used
          </h4>
          <div className="flex flex-wrap gap-2">
            {project.tech.map((t, i) => (
              <motion.span
                key={t}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + i * 0.05 }}
                className="px-2.5 py-1 text-xs rounded-lg font-medium transition-all duration-300 hover:scale-110"
                style={{
                  background: `hsl(var(${project.accentVar}) / 0.1)`,
                  border: `1px solid hsl(var(${project.accentVar}) / 0.25)`,
                  color: `hsl(var(${project.accentVar}))`,
                }}
              >
                {t}
              </motion.span>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-border flex-wrap gap-3">
          <div className="flex items-center gap-4">
            <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-1.5">
              <Github className="w-4 h-4" /> View Source
            </a>
            <a href="#" className="text-sm flex items-center gap-1.5 transition-colors" style={{ color: "hsl(var(--muted-foreground))" }}
              onMouseEnter={e => (e.currentTarget.style.color = "hsl(var(--neon-blue))")}
              onMouseLeave={e => (e.currentTarget.style.color = "hsl(var(--muted-foreground))")}
            >
              <ArrowUpRight className="w-4 h-4" /> Live Demo
            </a>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium flex items-center gap-2 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-all duration-300 md:ml-auto"
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
        </div>
      </div>
    </motion.div>
  </motion.div>
);

const INITIAL_SHOW = 6;

const ProjectsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-150px" });
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [showAll, setShowAll] = useState(false);

  const visibleProjects = showAll ? projects : projects.slice(0, INITIAL_SHOW);

  return (
    <>
      <section id="projects" className="py-16 sm:py-28 px-4 sm:px-6" ref={ref}>
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="mb-16"
          >
            <motion.span
              className="neon-badge mb-4"
              animate={{ boxShadow: ["0 0 8px hsl(var(--neon) / 0.2)", "0 0 20px hsl(var(--neon) / 0.4)", "0 0 8px hsl(var(--neon) / 0.2)"] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <Sparkles className="w-3 h-3" /> Projects
            </motion.span>
            <ScrollFloat
              animationDuration={1}
              ease="back.inOut(2)"
              scrollStart="center bottom+=50%"
              scrollEnd="bottom bottom-=40%"
              stagger={0.03}
              containerClassName="text-2xl sm:text-3xl md:text-4xl font-display font-bold mt-4"
              textClassName="text-2xl sm:text-3xl md:text-4xl font-display font-bold"
            >
              Things I've built
            </ScrollFloat>
            <p className="text-muted-foreground text-sm mt-3 max-w-md">
              Hover to explore • Click to dive deeper
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {visibleProjects.map((project, i) => (
                <ProjectCard3D
                  key={project.title}
                  project={project}
                  index={i}
                  isInView={isInView}
                  onClick={() => setSelectedProject(project)}
                />
              ))}
            </AnimatePresence>
          </div>

          {projects.length > INITIAL_SHOW && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-center mt-12"
            >
              <motion.button
                onClick={() => setShowAll(!showAll)}
                className="btn-ghost flex items-center gap-2 group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {showAll ? "Show Less" : `Show All ${projects.length} Projects`}
                <motion.div
                  animate={{ rotate: showAll ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className="w-4 h-4" />
                </motion.div>
              </motion.button>
            </motion.div>
          )}
        </div>
      </section>

      <AnimatePresence>
        {selectedProject && (
          <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
        )}
      </AnimatePresence>
    </>
  );
};

export default ProjectsSection;
