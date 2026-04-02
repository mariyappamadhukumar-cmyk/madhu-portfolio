import { motion } from "framer-motion";
import { useRef } from "react";
import { Trophy, FileText, Star, GraduationCap, Target, Award, BookOpen, Flame, Sparkles, Rocket, Building2, Calendar, MapPin } from "lucide-react";
import ScrollFloat from "./ScrollFloat";
import ScrollReveal from "./ScrollReveal";

const impactStats = [
  { icon: Flame, value: "95%", label: "Performance", desc: "Average project success rate", gradient: "from-[hsl(38,80%,58%)] to-[hsl(25,85%,52%)]" },
  { icon: Sparkles, value: "1000+", label: "Impact", desc: "Users served daily", gradient: "from-[hsl(165,50%,42%)] to-[hsl(200,60%,52%)]" },
  { icon: Rocket, value: "6+", label: "Innovation", desc: "Award-winning projects", gradient: "from-[hsl(38,80%,58%)] to-[hsl(165,50%,42%)]" },
];

const experiences = [
  {
    type: "Internship",
    typeColor: "bg-gradient-to-r from-[hsl(38,80%,58%)] to-[hsl(25,85%,52%)]",
    title: "AI Consultant Intern",
    company: "Offline",
    year: "2024",
    location: "On-site",
    highlight: "Professional AI Consulting Experience",
    desc: "Worked as a Professional Consultant in AI-related tasks with hands-on data analysis experience.",
    achievements: [
      "Gained hands-on experience in Microsoft Excel, including advanced formulas and data handling",
      "Performed data analysis on real company datasets",
      "Used Jira for task tracking and workflow management",
      "Worked with multiple company workbooks, improving data organization and insights",
    ],
    tech: ["Microsoft Excel", "Jira", "Data Analysis", "AI Consulting"],
  },
  {
    type: "Internship",
    typeColor: "bg-gradient-to-r from-[hsl(165,50%,42%)] to-[hsl(200,60%,52%)]",
    title: "Development Intern",
    company: "Invitiq Solutions Private Limited",
    year: "Dec 2025 – Feb 2026",
    location: "On-site",
    highlight: "Real-time Development Projects",
    desc: "Worked under experienced professionals on real-time development projects with industry-level tools.",
    achievements: [
      "Gained exposure to industry-level tools, technologies, and workflows",
      "Strengthened skills in software development, debugging, and implementation",
      "Collaborated with team members to understand project lifecycles and professional coding practices",
      "Focused on learning, skill development, and applying technical knowledge in practical scenarios",
    ],
    tech: ["Software Development", "Debugging", "Team Collaboration", "Industry Tools"],
  },
];

const awards = [
  { icon: Trophy, title: "1st Prize – Non-Technical Events", place: "KPR College of Engineering and Technology", medal: "🥇" },
  { icon: Trophy, title: "1st Prize – Non-Technical Events", place: "Erode Sengunthar Engineering College", medal: "🥇" },
  { icon: Award, title: "2nd Prize – Human vs AI Turing Test", place: "National level, Delhi", medal: "🥈" },
  { icon: Trophy, title: "3rd Prize – Idea Pitch", place: "KPR College of Engineering and Technology", medal: "🥉" },
];

const recognition = [
  { icon: FileText, title: "IEEE Conference Publication (2026)", desc: '"AI-Driven Gesture and Voice Controlled Car Racing Game"' },
  { icon: Star, title: "National Finalist – NSCIF 2026", desc: "Selected among Top 100 teams nationwide" },
  { icon: BookOpen, title: "Sponsored Learning Opportunity", desc: "6-month access to 250+ professional courses" },
];

const ExperienceSection = () => {
  const ref = useRef(null);

  return (
    <section id="achievements" className="py-16 sm:py-28 px-4 sm:px-6" ref={ref}>
      <div className="container mx-auto max-w-6xl">
        <ScrollReveal variant="fadeUp" className="mb-16">
          <span className="neon-badge mb-4">Experience</span>
          <ScrollFloat
            animationDuration={1}
            ease="back.inOut(2)"
            scrollStart="center bottom+=50%"
            scrollEnd="bottom bottom-=40%"
            stagger={0.03}
            containerClassName="text-2xl sm:text-3xl md:text-5xl font-display font-bold mt-4"
            textClassName="text-2xl sm:text-3xl md:text-5xl font-display font-bold"
          >
            Milestones & Recognition
          </ScrollFloat>
        </ScrollReveal>

        {/* Impact Stats */}
        <div className="grid grid-cols-3 gap-3 sm:gap-5 mb-16">
          {impactStats.map((stat, i) => (
            <ScrollReveal key={stat.label} variant="flipUp" staggerIndex={i} staggerDelay={0.12} className="text-center">
              <motion.div
                className={`w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br ${stat.gradient} mx-auto mb-3 sm:mb-4 flex items-center justify-center shadow-[0_0_20px_hsl(38,80%,58%,0.2)]`}
                whileHover={{ scale: 1.15, rotate: 5, boxShadow: "0 0 30px hsl(38,80%,58%,0.4)" }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <stat.icon className="w-5 h-5 sm:w-7 sm:h-7 text-background" />
              </motion.div>
              <div className="text-xl sm:text-2xl md:text-3xl font-display font-bold text-foreground">{stat.value}</div>
              <div className="text-xs sm:text-sm font-display font-medium text-foreground">{stat.label}</div>
              <div className="text-[10px] sm:text-xs text-muted-foreground mt-0.5 font-mono hidden sm:block">{stat.desc}</div>
            </ScrollReveal>
          ))}
        </div>

        {/* Experience Cards */}
        <div className="space-y-6 mb-16">
          {experiences.map((exp, i) => (
            <ScrollReveal key={exp.title + exp.company} variant={i % 2 === 0 ? "fadeLeft" : "fadeRight"} staggerIndex={i} staggerDelay={0.15}>
              <div className="glass-card overflow-hidden group hover:border-primary/30 transition-all duration-300">
                <div className={`h-1 w-full ${exp.typeColor}`} />
                <div className="p-4 sm:p-6 md:p-8">
                  <div className="grid md:grid-cols-5 gap-4 sm:gap-6">
                    <div className="md:col-span-2">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold text-white ${exp.typeColor} mb-3`}>
                        {exp.type}
                      </span>
                      <h3 className="text-xl font-display font-bold text-primary mb-2">{exp.title}</h3>
                      <div className="space-y-1.5 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2"><Building2 className="w-3.5 h-3.5" /> {exp.company}</div>
                        <div className="flex items-center gap-2"><Calendar className="w-3.5 h-3.5" /> {exp.year}</div>
                        <div className="flex items-center gap-2"><MapPin className="w-3.5 h-3.5" /> {exp.location}</div>
                      </div>
                      <div className="mt-3 text-xs font-semibold text-primary">{exp.highlight}</div>
                    </div>
                    <div className="md:col-span-3">
                      <p className="text-sm text-secondary-foreground leading-relaxed mb-4 font-mono">{exp.desc}</p>
                      <h4 className="text-xs font-display font-bold text-foreground mb-3">Key Achievements:</h4>
                      <ul className="space-y-2 mb-5">
                        {exp.achievements.map((a, j) => (
                          <li key={j} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                            {a}
                          </li>
                        ))}
                      </ul>
                      <h4 className="text-xs font-display font-bold text-muted-foreground mb-2 uppercase tracking-wider">Technologies Used:</h4>
                      <div className="flex flex-wrap gap-2">
                        {exp.tech.map((t) => (
                          <span key={t} className="tech-tag text-xs">{t}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Education + Career Row */}
        <div className="grid md:grid-cols-2 gap-4 sm:gap-5 mb-14">
          <ScrollReveal variant="slideRotate">
            <div className="glass-card p-6 flex items-start gap-4">
              <motion.div whileHover={{ scale: 1.15, rotate: 5 }} className="w-11 h-11 rounded-xl bg-gradient-to-br from-[hsl(165,50%,42%)] to-[hsl(38,80%,58%)] flex items-center justify-center flex-shrink-0 shadow-[0_0_15px_hsl(165,50%,42%,0.3)]">
                <GraduationCap className="w-5 h-5 text-background" />
              </motion.div>
              <div>
                <h3 className="text-xs text-muted-foreground font-medium uppercase tracking-wider mb-1">Education</h3>
                <p className="text-sm font-semibold text-foreground">B.E. — Artificial Intelligence & Machine Learning</p>
                <span className="inline-block mt-2 text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary">Currently Pursuing</span>
              </div>
            </div>
          </ScrollReveal>
          <ScrollReveal variant="slideRotate" delay={0.1}>
            <div className="glass-card p-6 flex items-start gap-4">
              <motion.div whileHover={{ scale: 1.15, rotate: 5 }} className="w-11 h-11 rounded-xl bg-gradient-to-br from-[hsl(38,80%,58%)] to-[hsl(25,85%,52%)] flex items-center justify-center flex-shrink-0 shadow-[0_0_15px_hsl(38,80%,58%,0.3)]">
                <Target className="w-5 h-5 text-background" />
              </motion.div>
              <div>
                <h3 className="text-xs text-muted-foreground font-medium uppercase tracking-wider mb-1">Career Objective</h3>
                <p className="text-xs text-secondary-foreground leading-relaxed">
                  To become a skilled AI engineer by building intelligent systems that solve real-world problems, combining AI, interaction, and sustainability.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Awards */}
        <ScrollReveal variant="glowIn" className="mb-10">
          <h3 className="text-sm font-display font-semibold text-foreground mb-5 flex items-center gap-2">
            <Trophy className="w-4 h-4 text-neon-amber" /> Awards
          </h3>
          <div className="grid sm:grid-cols-2 gap-3">
            {awards.map((a, i) => (
              <ScrollReveal key={i} variant="scaleUp" staggerIndex={i} staggerDelay={0.08}>
                <div className="glass-card p-5 flex items-start gap-4 group hover:border-primary/30 transition-all duration-300">
                  <span className="text-2xl">{a.medal}</span>
                  <div>
                    <h4 className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">{a.title}</h4>
                    <p className="text-xs text-muted-foreground mt-1">{a.place}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </ScrollReveal>

        {/* Recognition */}
        <ScrollReveal variant="blurIn">
          <h3 className="text-sm font-display font-semibold text-foreground mb-5 flex items-center gap-2">
            <Star className="w-4 h-4 text-primary" /> Recognition
          </h3>
          <div className="grid sm:grid-cols-3 gap-3">
            {recognition.map((r, i) => (
              <ScrollReveal key={i} variant="flipUp" staggerIndex={i} staggerDelay={0.1}>
                <div className="glass-card p-5 group hover:border-primary/30 transition-all duration-300">
                  <motion.div whileHover={{ scale: 1.15, rotate: 5 }} className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-3 shadow-[0_0_12px_hsl(38,80%,58%,0.15)]">
                    <r.icon className="w-4.5 h-4.5 text-primary" />
                  </motion.div>
                  <h4 className="text-sm font-medium text-foreground mb-1">{r.title}</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">{r.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default ExperienceSection;
