import { useState, useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import ParallaxSection from "@/components/ParallaxSection";
import LoadingScreen from "@/components/LoadingScreen";
import TerminalPopup from "@/components/TerminalPopup";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import SkillsSection from "@/components/SkillsSection";
import ExperienceSection from "@/components/ExperienceSection";
import ProjectsSection from "@/components/ProjectsSection";
import ContactSection from "@/components/ContactSection";
import SectionVideoBackground from "@/components/SectionVideoBackground";
import SectionTransition from "@/components/SectionTransition";
import CustomCursor from "@/components/CustomCursor";

const Index = () => {
  const [loaded, setLoaded] = useState(false);

  const handleLoadComplete = useCallback(() => {
    setLoaded(true);
  }, []);

  return (
    <div className="relative min-h-screen bg-background">
      <CustomCursor />
      <AnimatePresence>
        {!loaded && <LoadingScreen onComplete={handleLoadComplete} />}
      </AnimatePresence>

      {/* Section-aware video backgrounds with swipe transitions */}
      <SectionVideoBackground />

      <Navbar />
      <main className="relative z-10">
        <HeroSection />
        <SectionTransition variant="wave" />
        <ParallaxSection speed={0.1}>
          <AboutSection />
        </ParallaxSection>
        <SectionTransition variant="diagonal" />
        <ParallaxSection speed={0.15}>
          <SkillsSection />
        </ParallaxSection>
        <SectionTransition variant="reveal" />
        <ParallaxSection speed={0.08}>
          <ExperienceSection />
        </ParallaxSection>
        <SectionTransition variant="particles" />
        <ParallaxSection speed={0.12}>
          <ProjectsSection />
        </ParallaxSection>
        <SectionTransition variant="wave" />
        <ParallaxSection speed={0.06}>
          <ContactSection />
        </ParallaxSection>
      </main>
      <TerminalPopup />
    </div>
  );
};

export default Index;
