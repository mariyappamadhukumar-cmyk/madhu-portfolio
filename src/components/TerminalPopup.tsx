import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { Terminal, X } from "lucide-react";

const COMMANDS: Record<string, string> = {
  help: `Available commands:
  about     — Learn about me
  skills    — My tech stack
  projects  — Featured projects
  contact   — How to reach me
  education — My education
  clear     — Clear terminal
  exit      — Close terminal`,
  about: `👨‍💻 Madhukumar
AI/ML Engineer | Builder | Innovator

I build intelligent systems using AI, Computer Vision,
and Voice Technologies to solve real-world problems.`,
  skills: `🔹 Languages: Python (95%), Java (85%), SQL, MATLAB
🔹 AI/ML: Machine Learning, Computer Vision, NLP, Speech Recognition
🔹 Frameworks: Flask, OpenCV, Kivy, Tkinter, Selenium
🔹 Tools: Git, Firebase, MySQL`,
  projects: `🚀 Featured Projects:
1. AI Gesture & Voice Controlled Car Racing Game
2. Pranava AI – Healthcare Assistant
3. AI Voice Assistant
4. PocketView AI – Expense Tracker
5. English Buddy AI
6. Heat Energy Conversion System

Type a project number for details, e.g. "project 1"`,
  contact: `📬 Contact:
Email: your-email@gmail.com
GitHub: github.com/your-username
LinkedIn: linkedin.com/in/your-profile`,
  education: `🎓 Bachelor of Engineering (B.E.)
Artificial Intelligence & Machine Learning
Status: Currently Pursuing`,
  "project 1": `🎮 AI Gesture & Voice Controlled Car Racing Game
Control a racing car using hand gestures via OpenCV.
Voice commands for actions. Dynamic day/night cycle.
Tech: Python, OpenCV, Speech Recognition, Pygame`,
  "project 2": `🏥 Pranava AI – Healthcare Assistant
AI-based disease prediction & health suggestions.
Tech: Python, ML, Flask, NLP`,
  "project 3": `🗣️ AI Voice Assistant
Speech recognition + TTS, Wikipedia, YouTube, Spotify.
Tech: Python, Speech Recognition, TTS, APIs`,
  "project 4": `💰 PocketView AI – Expense Tracker
Voice input, OCR receipt scanning, AI budget insights.
Tech: Python, OCR, ML, Flask`,
  "project 5": `📚 English Buddy AI
Real-time grammar correction, voice-based learning.
Tech: Python, NLP, Speech Recognition, Kivy`,
  "project 6": `⚡ Heat Energy Conversion System
Waste heat → electricity using thermoelectric generators.
Tech: Hardware, Thermoelectric, IoT, MATLAB`,
};

const TerminalPopup = () => {
  const [open, setOpen] = useState(false);
  const [history, setHistory] = useState<{ type: "input" | "output"; text: string }[]>([
    { type: "output", text: 'Welcome! Type "help" for available commands.' },
  ]);
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    setHistory((prev) => [...prev, { type: "input", text: `> ${cmd}` }]);

    if (trimmed === "clear") {
      setHistory([{ type: "output", text: 'Terminal cleared. Type "help" for commands.' }]);
    } else if (trimmed === "exit") {
      setOpen(false);
    } else {
      const response = COMMANDS[trimmed] || `Command not found: "${trimmed}". Type "help" for available commands.`;
      setHistory((prev) => [...prev, { type: "output", text: response }]);
    }
    setInput("");
  };

  return (
    <>
      {/* Floating button */}
      <motion.button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-[100] w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg"
        whileHover={{ scale: 1.1, boxShadow: "0 0 25px hsl(var(--neon) / 0.5)" }}
        whileTap={{ scale: 0.95 }}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 2, type: "spring" }}
      >
        <Terminal className="w-5 h-5" />
      </motion.button>

      {/* Terminal */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-20 right-6 z-[101] w-[420px] max-w-[calc(100vw-3rem)]"
          >
            <div className="code-block shadow-2xl shadow-black/50 flex flex-col max-h-[400px]">
              <div className="code-block-header flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="code-dot bg-destructive" />
                  <div className="code-dot bg-neon-amber" />
                  <div className="code-dot bg-primary" />
                  <span className="ml-2 text-xs text-muted-foreground font-mono">terminal</span>
                </div>
                <button onClick={() => setOpen(false)} className="text-muted-foreground hover:text-foreground transition-colors">
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-4 font-mono text-xs space-y-1.5 min-h-[200px]">
                {history.map((h, i) => (
                  <div key={i} className={h.type === "input" ? "text-primary" : "text-secondary-foreground whitespace-pre-wrap"}>
                    {h.text}
                  </div>
                ))}
                <div ref={bottomRef} />
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (input.trim()) handleCommand(input);
                }}
                className="border-t border-border px-4 py-2.5 flex items-center gap-2"
              >
                <span className="text-primary text-xs font-mono">❯</span>
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="flex-1 bg-transparent text-xs text-foreground font-mono outline-none placeholder:text-muted-foreground/50"
                  placeholder="Type a command..."
                  autoFocus
                />
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default TerminalPopup;
