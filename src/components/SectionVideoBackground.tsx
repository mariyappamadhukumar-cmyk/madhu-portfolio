import { useEffect, useRef, useState } from "react";

const VIDEO_SECTIONS = [
  {
    url: "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4",
    sectionId: "home",
  },
  {
    url: "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260307_083826_e938b29f-a43a-41ec-a153-3d4730578ab8.mp4",
    sectionId: "about",
  },
  {
    url: "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260325_132944_a0d124bb-eaa1-4082-aa30-2310efb42b4b.mp4",
    sectionId: "skills",
  },
  {
    url: "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260324_151826_c7218672-6e92-402c-9e45-f1e0f454bdc4.mp4",
    sectionId: "achievements",
  },
  {
    url: "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260331_074327_a4d6275d-82d9-4c83-bfbe-f1fb2213c17c.mp4",
    sectionId: "projects",
  },
];

const SectionVideoBackground = () => {
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  // Load and play all videos on mount
  useEffect(() => {
    VIDEO_SECTIONS.forEach((layer, i) => {
      const video = videoRefs.current[i];
      if (!video) return;
      video.src = layer.url;
      video.load();
      // Stagger play to avoid all loading at once
      setTimeout(() => {
        video.play().catch(() => {});
      }, i * 200);
    });
  }, []);

  // IntersectionObserver — most reliable way to detect which section is visible
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    const setup = () => {
      VIDEO_SECTIONS.forEach((section, i) => {
        const el = document.getElementById(section.sectionId);
        if (!el) return;

        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                setActiveIndex(i);
              }
            });
          },
          {
            // Fires when the section crosses the center 20% band of viewport
            rootMargin: "-35% 0px -35% 0px",
            threshold: 0,
          }
        );

        observer.observe(el);
        observers.push(observer);
      });
    };

    // Small delay to ensure DOM is ready
    const timer = setTimeout(setup, 300);

    return () => {
      clearTimeout(timer);
      observers.forEach((o) => o.disconnect());
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden bg-background">
      {VIDEO_SECTIONS.map((_, i) => {
        const isActive = i === activeIndex;

        return (
          <video
            key={i}
            ref={(el) => {
              videoRefs.current[i] = el;
            }}
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
            style={{
              opacity: isActive ? 0.5 : 0,
              transform: isActive ? "scale(1)" : "scale(1.08)",
              zIndex: isActive ? 2 : 1,
              transition: "opacity 1s ease-in-out, transform 1.5s ease-in-out",
            }}
          />
        );
      })}

      {/* Overlay for text readability */}
      <div
        className="absolute inset-0"
        style={{
          zIndex: 10,
          background: `linear-gradient(180deg, 
            hsl(222 30% 4% / 0.3) 0%,
            hsl(222 30% 4% / 0.1) 30%,
            hsl(222 30% 4% / 0.2) 60%,
            hsl(222 30% 4% / 0.4) 100%
          )`,
        }}
      />
    </div>
  );
};

export default SectionVideoBackground;
