import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Code2, Cpu, Database, Cloud, Wrench, Brain, Gamepad2, Zap } from "lucide-react";
import ScrollFloat from "./ScrollFloat";
import ScrollReveal from "./ScrollReveal";

const skillCategories = [
  {
    title: "Languages",
    icon: Code2,
    iconBg: "bg-gradient-to-br from-[hsl(38,80%,58%)] to-[hsl(25,85%,52%)]",
    skills: [
      { name: "Python", level: 95, color: "from-[hsl(38,80%,58%)] to-[hsl(25,85%,52%)]" },
      { name: "Java", level: 85, color: "from-[hsl(25,85%,52%)] to-[hsl(38,80%,58%)]" },
      { name: "SQL", level: 80, color: "from-[hsl(38,80%,58%)] to-[hsl(165,50%,42%)]" },
      { name: "HTML/CSS", level: 82, color: "from-[hsl(165,50%,42%)] to-[hsl(38,80%,58%)]" },
      { name: "MATLAB", level: 75, color: "from-[hsl(38,80%,58%)] to-[hsl(25,85%,52%)]" },
    ],
  },
  {
    title: "AI / ML",
    icon: Brain,
    iconBg: "bg-gradient-to-br from-[hsl(165,50%,42%)] to-[hsl(38,80%,58%)]",
    skills: [
      { name: "Machine Learning", level: 90, color: "from-[hsl(165,50%,42%)] to-[hsl(38,80%,58%)]" },
      { name: "Computer Vision", level: 88, color: "from-[hsl(38,80%,58%)] to-[hsl(165,50%,42%)]" },
      { name: "NLP", level: 85, color: "from-[hsl(25,85%,52%)] to-[hsl(38,80%,58%)]" },
      { name: "Speech Recognition", level: 82, color: "from-[hsl(38,80%,58%)] to-[hsl(25,85%,52%)]" },
    ],
  },
  {
    title: "Frameworks",
    icon: Zap,
    iconBg: "bg-gradient-to-br from-[hsl(38,80%,58%)] to-[hsl(165,50%,42%)]",
    skills: [
      { name: "Flask", level: 85, color: "from-[hsl(165,50%,42%)] to-[hsl(38,80%,58%)]" },
      { name: "OpenCV", level: 88, color: "from-[hsl(38,80%,58%)] to-[hsl(25,85%,52%)]" },
      { name: "Kivy", level: 78, color: "from-[hsl(25,85%,52%)] to-[hsl(165,50%,42%)]" },
      { name: "Tkinter", level: 80, color: "from-[hsl(165,50%,42%)] to-[hsl(38,80%,58%)]" },
      { name: "Selenium", level: 75, color: "from-[hsl(38,80%,58%)] to-[hsl(25,85%,52%)]" },
    ],
  },
  {
    title: "Databases",
    icon: Database,
    iconBg: "bg-gradient-to-br from-[hsl(165,50%,42%)] to-[hsl(25,85%,52%)]",
    skills: [
      { name: "MySQL", level: 85, color: "from-[hsl(38,80%,58%)] to-[hsl(165,50%,42%)]" },
      { name: "Firebase", level: 82, color: "from-[hsl(25,85%,52%)] to-[hsl(38,80%,58%)]" },
      { name: "SQLite", level: 78, color: "from-[hsl(165,50%,42%)] to-[hsl(38,80%,58%)]" },
    ],
  },
  {
    title: "Tools",
    icon: Wrench,
    iconBg: "bg-gradient-to-br from-[hsl(25,85%,52%)] to-[hsl(38,80%,58%)]",
    skills: [
      { name: "Git", level: 85, color: "from-[hsl(38,80%,58%)] to-[hsl(25,85%,52%)]" },
      { name: "Docker", level: 70, color: "from-[hsl(165,50%,42%)] to-[hsl(38,80%,58%)]" },
      { name: "Jupyter", level: 88, color: "from-[hsl(25,85%,52%)] to-[hsl(165,50%,42%)]" },
    ],
  },
  {
    title: "Hardware / IoT",
    icon: Gamepad2,
    iconBg: "bg-gradient-to-br from-[hsl(38,80%,58%)] to-[hsl(25,85%,52%)]",
    skills: [
      { name: "Arduino", level: 80, color: "from-[hsl(165,50%,42%)] to-[hsl(38,80%,58%)]" },
      { name: "Raspberry Pi", level: 75, color: "from-[hsl(38,80%,58%)] to-[hsl(25,85%,52%)]" },
      { name: "Sensors & IoT", level: 78, color: "from-[hsl(25,85%,52%)] to-[hsl(165,50%,42%)]" },
    ],
  },
];

const toolsList = [
  "VS Code", "Git", "Jupyter", "Docker", "Firebase Console",
  "MySQL Workbench", "Postman", "Arduino IDE", "Raspberry Pi OS",
  "TensorFlow", "Flask", "OpenCV",
];

const SkillsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-150px" });

  return (
    <section id="skills" className="py-16 sm:py-28 px-4 sm:px-6" ref={ref}>
      <div className="container mx-auto max-w-6xl">
        <ScrollReveal variant="fadeUp">
          <span className="neon-badge mb-4">Skills</span>
          <ScrollFloat
            animationDuration={1}
            ease="back.inOut(2)"
            scrollStart="center bottom+=50%"
            scrollEnd="bottom bottom-=40%"
            stagger={0.03}
            containerClassName="text-2xl sm:text-3xl md:text-5xl font-display font-bold mt-4"
            textClassName="text-2xl sm:text-3xl md:text-5xl font-display font-bold"
          >
            Technologies I work with
          </ScrollFloat>
        </ScrollReveal>

        {/* Skill Categories Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-14 mt-16">
          {skillCategories.map((cat, ci) => (
            <ScrollReveal
              key={cat.title}
              variant={ci % 3 === 0 ? "fadeLeft" : ci % 3 === 1 ? "flipUp" : "fadeRight"}
              staggerIndex={ci}
              staggerDelay={0.08}
            >
              <div className="glass-card p-6 group hover:border-primary/30 transition-all duration-300 h-full">
                <div className="flex items-center gap-3 mb-5">
                  <motion.div whileHover={{ scale: 1.15, rotate: 5 }} className={`w-10 h-10 rounded-xl ${cat.iconBg} flex items-center justify-center shadow-[0_0_15px_hsl(38,80%,58%,0.2)]`}>
                    <cat.icon className="w-5 h-5 text-background" />
                  </motion.div>
                  <h3 className="text-base font-display font-semibold text-foreground">{cat.title}</h3>
                </div>

                <div className="space-y-4">
                  {cat.skills.map((skill, si) => (
                    <div key={skill.name}>
                      <div className="flex justify-between text-xs mb-1.5">
                        <span className="text-secondary-foreground font-medium">{skill.name}</span>
                        <span className="text-muted-foreground font-mono">{skill.level}%</span>
                      </div>
                      <div className="h-2 rounded-full overflow-hidden bg-secondary/60">
                        <motion.div
                          className={`h-full rounded-full bg-gradient-to-r ${skill.color}`}
                          initial={{ width: 0 }}
                          animate={isInView ? { width: `${skill.level}%` } : {}}
                          transition={{ duration: 1.2, delay: 0.3 + ci * 0.06 + si * 0.08, ease: "easeOut" }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Tools & Technologies */}
        <ScrollReveal variant="blurIn" delay={0.2} className="text-center">
          <h3 className="text-xl font-display font-bold mb-6">
            <span className="text-muted-foreground font-mono text-base">//</span>{" "}
            Tools & Technologies
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            {toolsList.map((tool, i) => (
              <ScrollReveal key={tool} variant="scaleUp" staggerIndex={i} staggerDelay={0.04}>
                <motion.span
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="tech-tag text-xs px-4 py-2 cursor-default inline-block"
                >
                  {tool}
                </motion.span>
              </ScrollReveal>
            ))}
          </div>
        </ScrollReveal>

        {/* Languages */}
        <ScrollReveal variant="fadeUp" delay={0.3} className="mt-10 flex items-center justify-center gap-4">
          <span className="text-xs text-muted-foreground">Languages:</span>
          <div className="flex gap-2">
            {["🇬🇧 English", "🇮🇳 Tamil", "🇮🇳 Kannada", "🇮🇳 Telugu"].map((lang) => (
              <span key={lang} className="tech-tag text-xs">{lang}</span>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default SkillsSection;
