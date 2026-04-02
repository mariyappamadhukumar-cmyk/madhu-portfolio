import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Brain, Eye, Mic, Cpu, Code2, Rocket, Lightbulb, Users } from "lucide-react";
import ScrollFloat from "./ScrollFloat";
import ScrollReveal from "./ScrollReveal";

const strengths = [
  { icon: Brain, label: "Machine Learning", desc: "Building predictive models & intelligent systems", color: "from-[hsl(38,80%,58%)] to-[hsl(25,85%,52%)]" },
  { icon: Eye, label: "Computer Vision", desc: "Image processing & gesture recognition", color: "from-[hsl(165,50%,42%)] to-[hsl(38,80%,58%)]" },
  { icon: Mic, label: "Voice Technologies", desc: "Speech recognition & NLP pipelines", color: "from-[hsl(25,85%,52%)] to-[hsl(38,80%,58%)]" },
  { icon: Cpu, label: "System Design", desc: "Scalable architectures & clean code", color: "from-[hsl(38,80%,58%)] to-[hsl(165,50%,42%)]" },
];

const codeLines = [
  { text: "// About Madhukumar", color: "text-muted-foreground" },
  { text: 'const developer = {', color: "text-foreground" },
  { text: '  name: "Madhukumar",', color: "text-primary" },
  { text: '  role: "AI Engineer & Builder",', color: "text-primary" },
  { text: '  location: "India",', color: "text-primary" },
  { text: "  skills: {", color: "text-foreground" },
  { text: '    languages: ["Python", "Java", "SQL"],', color: "text-neon-blue" },
  { text: '    frameworks: ["Flask", "OpenCV", "Kivy"],', color: "text-neon-blue" },
  { text: '    tools: ["Git", "Firebase", "MySQL"],', color: "text-neon-blue" },
  { text: "  },", color: "text-foreground" },
  { text: '  passion: "Building intelligent systems",', color: "text-neon-purple" },
  { text: '  getCurrentStatus() { return "Available"; }', color: "text-neon-amber" },
  { text: "};", color: "text-foreground" },
];

const timeline = [
  {
    year: "2024", emoji: "🎓", title: "Beginning the Journey",
    desc: "Started my engineering journey in AIML with a strong curiosity for technology and innovation. Began learning programming fundamentals and exploring how software solves real-world problems.",
    icon: Lightbulb, color: "bg-gradient-to-br from-[hsl(38,80%,58%)] to-[hsl(165,50%,42%)]", code: 'int start = curiosity;',
    achievements: [
      "Learned basics of Python, Java, and SQL",
      "Built small projects to understand logic",
      "Explored AI, ML, and web development",
      "Developed interest in real-world problem solving",
    ],
  },
  {
    year: "2025", emoji: "💻", title: "Project Building Phase",
    desc: "Moved from learning to building real projects and applying concepts practically.",
    icon: Code2, color: "bg-gradient-to-br from-[hsl(165,50%,42%)] to-[hsl(38,80%,58%)]", code: "model.fit(X_train, y_train)",
    achievements: [
      "Built AI Voice Assistant (speech recognition + automation)",
      "Developed Gesture & Voice Controlled Car Racing Game",
      "Created healthcare AI models (disease prediction)",
      "Participated in hackathons and ideathons",
    ],
  },
  {
    year: "2026", emoji: "🧠", title: "Research & Innovation",
    desc: "Shifted into innovation and research, working on impactful and advanced systems.",
    icon: Rocket, color: "bg-gradient-to-br from-[hsl(25,85%,52%)] to-[hsl(38,80%,58%)]", code: 'paper.publish("IEEE")',
    achievements: [
      "Published IEEE research paper",
      "National Finalist – NSCIF 🏆",
      "Built real-time AI systems using computer vision",
      "Worked on innovative ideas like energy conversion",
    ],
  },
];

const tabs = ["about.py", "skills.json", "journey.md"];

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-150px" });
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section id="about" className="py-16 sm:py-28 px-4 sm:px-6" ref={ref}>
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <ScrollReveal variant="fadeUp">
          <span className="neon-badge mb-4">About</span>
          <ScrollFloat
            animationDuration={1}
            ease="back.inOut(2)"
            scrollStart="center bottom+=50%"
            scrollEnd="bottom bottom-=40%"
            stagger={0.03}
            containerClassName="text-2xl sm:text-3xl md:text-5xl font-display font-bold mt-4"
            textClassName="text-2xl sm:text-3xl md:text-5xl font-display font-bold"
          >
            About Me
          </ScrollFloat>
        </ScrollReveal>

        {/* Quote */}
        <ScrollReveal variant="blurIn" delay={0.05} className="mb-14">
          <p className="text-muted-foreground text-sm md:text-base max-w-2xl font-mono">
            <span className="text-neon-amber">/*</span> Passionate about creating innovative solutions that bridge technology and human needs. <span className="text-neon-amber">*/</span>
          </p>
        </ScrollReveal>

        <div className="grid lg:grid-cols-2 gap-10 mb-20">
          {/* Bio text */}
          <ScrollReveal variant="fadeLeft" delay={0.1}>
            <h3 className="text-xl md:text-2xl font-display font-bold mb-6">
              <span className="text-neon-purple font-mono">class</span>{" "}
              Developer{" "}
              <span className="text-primary font-mono">extends</span>{" "}
              Innovator
            </h3>
            <p className="text-secondary-foreground leading-relaxed text-[15px] mb-5">
              I'm a dedicated AI/ML Engineering student with a mission to bridge the gap between cutting-edge technology and real-world solutions. With expertise spanning machine learning, computer vision, and intelligent system design, I craft digital experiences that push boundaries.
            </p>
            <p className="text-secondary-foreground leading-relaxed text-[15px] mb-8">
              From developing AI voice assistants to creating gesture-controlled applications and healthcare platforms, I believe in the power of technology to transform lives. My journey combines technical excellence with creative problem-solving.
            </p>

            {/* Strength dots */}
            <div className="grid grid-cols-2 gap-4">
              {["AI/ML Development", "Computer Vision", "Full-Stack Development", "System Architecture", "Problem Solving", "Team Leadership", "Research & Innovation", "Technical Writing"].map((item, i) => (
                <ScrollReveal key={item} variant="slideRotate" staggerIndex={i} staggerDelay={0.06} className="flex items-center gap-2.5 text-sm text-secondary-foreground">
                  <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />
                  <span className="font-mono text-xs">{item}</span>
                </ScrollReveal>
              ))}
            </div>

            {/* CTA */}
            <ScrollReveal variant="scaleUp" delay={0.4} className="mt-8">
              <a href="#contact" className="btn-neon inline-flex items-center gap-2">
                <span className="font-mono text-sm">./connect --with-me</span>
              </a>
            </ScrollReveal>
          </ScrollReveal>

          {/* Code Editor Widget */}
          <ScrollReveal variant="fadeRight" delay={0.15}>
            <div className="code-block shadow-2xl shadow-black/40">
              <div className="code-block-header">
                <div className="code-dot bg-destructive" />
                <div className="code-dot bg-neon-amber" />
                <div className="code-dot bg-primary" />
                <div className="flex ml-4 gap-1">
                  {tabs.map((tab, i) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(i)}
                      className={`px-3 py-1 text-xs font-mono rounded-md transition-all ${
                        activeTab === i
                          ? "bg-primary/15 text-primary border border-primary/20"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
                <span className="ml-auto text-xs text-muted-foreground font-mono flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded bg-neon-blue/20 flex items-center justify-center text-[8px] text-neon-blue">Py</span>
                  Python
                </span>
              </div>
              <div className="p-5 font-mono text-sm leading-7 min-h-[340px]">
                {codeLines.map((line, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -15 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.3 + i * 0.04 }}
                    className="flex hover:bg-primary/5 rounded px-1 -mx-1 transition-colors"
                  >
                    <span className="text-muted-foreground/30 select-none w-6 text-right mr-4 text-xs leading-7">
                      {i + 1}
                    </span>
                    <span className={line.color}>{line.text}</span>
                  </motion.div>
                ))}
                <div className="flex mt-1">
                  <span className="text-muted-foreground/30 select-none w-6 text-right mr-4 text-xs leading-7">
                    {codeLines.length + 1}
                  </span>
                  <span className="animate-blink text-primary">|</span>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-20">
          {[
            { icon: Code2, value: "12+", label: "Projects Built", color: "from-[hsl(38,80%,58%)] to-[hsl(25,85%,52%)]" },
            { icon: Brain, value: "6+", label: "AI Models", color: "from-[hsl(165,50%,42%)] to-[hsl(38,80%,58%)]" },
            { icon: Rocket, value: "6+", label: "Awards Won", color: "from-[hsl(25,85%,52%)] to-[hsl(38,80%,58%)]" },
            { icon: Lightbulb, value: "B.E.", label: "AI & ML", color: "from-[hsl(38,80%,58%)] to-[hsl(165,50%,42%)]" },
          ].map((stat, i) => (
            <ScrollReveal key={stat.label} variant="flipUp" staggerIndex={i} staggerDelay={0.1} className="text-center">
              <motion.div whileHover={{ scale: 1.15, rotate: 5 }} className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${stat.color} mx-auto mb-3 flex items-center justify-center shadow-[0_0_20px_hsl(38,80%,58%,0.2)]`}>
                <stat.icon className="w-6 h-6 text-background" />
              </motion.div>
              <div className="text-2xl md:text-3xl font-display font-bold text-foreground">{stat.value}</div>
              <div className="text-xs text-muted-foreground mt-1 font-mono">{stat.label}</div>
            </ScrollReveal>
          ))}
        </div>

        {/* Development Journey Timeline */}
        <ScrollReveal variant="glowIn" className="mb-8">
          <h3 className="text-2xl md:text-3xl font-display font-bold text-center mb-3">
            <span className="text-muted-foreground font-mono text-lg">//</span>{" "}
            My Development <span className="neon-text">Journey</span>
          </h3>
        </ScrollReveal>

        <div className="relative">
          <div className="absolute left-8 md:left-12 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-accent to-neon-amber" />

          <div className="space-y-12">
            {timeline.map((item, i) => (
              <ScrollReveal key={item.year} variant={i % 2 === 0 ? "fadeLeft" : "fadeRight"} staggerIndex={i} staggerDelay={0.12} className="relative pl-20 md:pl-28 group">
                <motion.div whileHover={{ scale: 1.15, rotate: 5 }} className={`absolute left-4 md:left-8 w-9 h-9 rounded-xl ${item.color} flex items-center justify-center shadow-[0_0_15px_hsl(38,80%,58%,0.25)] z-10`}>
                  <item.icon className="w-4 h-4 text-background" />
                </motion.div>

                <div className="glass-card p-6 group-hover:border-primary/30 transition-all duration-300">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-2">
                    <div>
                      <span className="text-lg font-display font-bold text-foreground">{item.emoji} {item.year} — {item.title}</span>
                    </div>
                    <span className="text-xs font-mono px-3 py-1 rounded-lg bg-primary/10 text-primary border border-primary/20 whitespace-nowrap self-start">
                      "{item.code}"
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-3">{item.desc}</p>
                  <ul className="space-y-1.5">
                    {item.achievements.map((a, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                        {a}
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>

        {/* Strengths - bottom row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-20">
          {strengths.map((s, i) => (
            <ScrollReveal key={s.label} variant="scaleUp" staggerIndex={i} staggerDelay={0.1}>
              <div className="glass-card p-5 group cursor-default hover:border-primary/30 transition-all duration-300">
                <motion.div whileHover={{ scale: 1.15, rotate: 5 }} className={`w-11 h-11 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center mb-3 shadow-[0_0_15px_hsl(38,80%,58%,0.2)]`}>
                  <s.icon className="w-5 h-5 text-background" />
                </motion.div>
                <h4 className="text-sm font-semibold text-foreground mb-1">{s.label}</h4>
                <p className="text-xs text-muted-foreground">{s.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
