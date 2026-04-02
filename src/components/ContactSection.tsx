import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { Send, Github, Linkedin, Mail, Heart, ArrowUpRight } from "lucide-react";
import ScrollFloat from "./ScrollFloat";
import ScrollReveal from "./ScrollReveal";

const ContactSection = () => {
  const ref = useRef(null);
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 3000);
  };

  const socials = [
    { icon: Github, label: "GitHub", href: "https://github.com/MpMadhukumar" },
    { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/madhu-kumar-mariyappa-286bb5320" },
    { icon: Mail, label: "Email", href: "mailto:madhukumar01271@gmail.com" },
  ];

  return (
    <section id="contact" className="py-16 sm:py-28 px-4 sm:px-6" ref={ref}>
      <div className="container mx-auto max-w-6xl">
        <ScrollReveal variant="fadeUp" className="mb-16">
          <span className="neon-badge mb-4">Contact</span>
          <ScrollFloat
            animationDuration={1}
            ease="back.inOut(2)"
            scrollStart="center bottom+=50%"
            scrollEnd="bottom bottom-=40%"
            stagger={0.03}
            containerClassName="text-2xl sm:text-3xl md:text-4xl font-display font-bold mt-4"
            textClassName="text-2xl sm:text-3xl md:text-4xl font-display font-bold"
          >
            Let's connect
          </ScrollFloat>
        </ScrollReveal>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Form */}
          <ScrollReveal variant="fadeLeft" delay={0.1} className="lg:col-span-3">
            <div className="glass-card p-6 md:p-8">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-muted-foreground mb-1.5 block font-medium">Name</label>
                    <input
                      type="text"
                      placeholder="Your name"
                      required
                      className="w-full bg-secondary/50 border border-border rounded-xl px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/10 transition-all"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground mb-1.5 block font-medium">Email</label>
                    <input
                      type="email"
                      placeholder="you@example.com"
                      required
                      className="w-full bg-secondary/50 border border-border rounded-xl px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/10 transition-all"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-xs text-muted-foreground mb-1.5 block font-medium">Message</label>
                  <textarea
                    placeholder="What's on your mind?"
                    rows={5}
                    required
                    className="w-full bg-secondary/50 border border-border rounded-xl px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/10 transition-all resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="btn-neon w-full flex items-center justify-center gap-2"
                >
                  {sent ? "✓ Message Sent!" : <><Send className="w-4 h-4" /> Send Message</>}
                </button>
              </form>
            </div>
          </ScrollReveal>

          {/* Sidebar */}
          <ScrollReveal variant="fadeRight" delay={0.2} className="lg:col-span-2 flex flex-col gap-4">
            <div className="glass-card p-6 flex-1">
              <h3 className="text-sm font-display font-semibold text-foreground mb-3">Ready to collaborate?</h3>
              <p className="text-xs text-muted-foreground leading-relaxed mb-4">
                I'm always open to discussing new projects, research collaborations, or opportunities
                in AI/ML. Reach out anytime!
              </p>
              <p className="text-xs text-muted-foreground">
                <span className="text-foreground font-medium">Response time:</span> Usually within 24h
              </p>
            </div>

            <div className="space-y-2">
              {socials.map((s, i) => (
                <ScrollReveal key={s.label} variant="slideRotate" staggerIndex={i} staggerDelay={0.1}>
                  <a
                    href={s.href}
                    className="glass-card p-4 flex items-center justify-between group hover:border-primary/30 transition-all duration-300"
                  >
                    <div className="flex items-center gap-3">
                      <s.icon className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                      <span className="text-sm text-secondary-foreground group-hover:text-foreground transition-colors">{s.label}</span>
                    </div>
                    <ArrowUpRight className="w-3.5 h-3.5 text-muted-foreground group-hover:text-primary transition-colors" />
                  </a>
                </ScrollReveal>
              ))}
            </div>
          </ScrollReveal>
        </div>

        {/* Footer */}
        <ScrollReveal variant="blurIn" delay={0.3} className="mt-24 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p className="flex items-center gap-1.5">
            Built with <Heart className="w-3 h-3 text-destructive" /> by Madhukumar
          </p>
          <p>© {new Date().getFullYear()} All rights reserved.</p>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default ContactSection;
