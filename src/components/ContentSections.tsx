import { useEffect, useRef, useState } from "react";
import { useApp } from "@/contexts/AppContext";
import { Zap, Sparkles, TrendingUp } from "lucide-react";

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setVisible(true),
      { threshold: 0.15 },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(40px)",
        transition: `opacity 0.8s ease-out ${delay}s, transform 0.8s ease-out ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

export function ContentSections() {
  const { t } = useApp();
  const features = [
    { icon: Zap, key: "feature1" as const },
    { icon: Sparkles, key: "feature2" as const },
    { icon: TrendingUp, key: "feature3" as const },
  ];

  return (
    <div className="relative z-10 mx-auto max-w-5xl px-6 pb-32">
      <Reveal>
        <section className="rounded-3xl border border-border bg-card p-10 shadow-[var(--shadow-glow)] sm:p-14">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {t("section1Title")}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            {t("section1Body")}
          </p>
        </section>
      </Reveal>

      <Reveal delay={0.1}>
        <section className="mt-12">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {t("section2Title")}
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">{t("section2Body")}</p>

          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {features.map((f, i) => (
              <Reveal key={f.key} delay={0.15 + i * 0.1}>
                <div className="group h-full rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-elegant)]">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground transition-transform group-hover:scale-110">
                    <f.icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-5 text-lg font-semibold text-foreground">{t(f.key)}</h3>
                </div>
              </Reveal>
            ))}
          </div>
        </section>
      </Reveal>

      <Reveal delay={0.2}>
        <footer className="mt-24 border-t border-border pt-8 text-center text-sm text-muted-foreground">
          {t("footer")}
        </footer>
      </Reveal>
    </div>
  );
}
