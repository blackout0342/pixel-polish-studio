import { useEffect, useState } from "react";
import { useApp } from "@/contexts/AppContext";

export function HeroTitle() {
  const { t } = useApp();
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handler = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  // Fade & slide up based on scroll position (0-400px)
  const progress = Math.min(scrollY / 400, 1);
  const opacity = 1 - progress;
  const translateY = -progress * 120;
  const scale = 1 - progress * 0.1;

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 pt-16">
      <div
        className="text-center will-change-transform"
        style={{
          opacity,
          transform: `translateY(${translateY}px) scale(${scale})`,
          transition: "opacity 0.1s linear",
        }}
      >
        <h1
          className="animate-fade-up bg-gradient-to-b from-foreground to-foreground/60 bg-clip-text text-5xl font-black uppercase tracking-tight text-transparent sm:text-7xl md:text-8xl lg:text-9xl"
          style={{ animationDelay: "0.2s" }}
        >
          PETERLUTSCHTFUESSE
        </h1>
        <p
          className="mt-6 animate-fade-up text-lg text-muted-foreground sm:text-xl"
          style={{ animationDelay: "0.5s" }}
        >
          {t("heroSub")}
        </p>
        <div
          className="mt-16 animate-fade-up text-xs uppercase tracking-[0.3em] text-muted-foreground"
          style={{ animationDelay: "0.8s" }}
        >
          ↓ {t("scrollHint")}
        </div>
      </div>
    </section>
  );
}
