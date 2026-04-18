import { useEffect, useRef, useState } from "react";
import { useApp } from "@/contexts/AppContext";
import { ChevronDown, Globe } from "lucide-react";

export function SiteHeader() {
  const { language, setLanguage, t } = useApp();
  const [open, setOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const langRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setOpen(false);
      if (langRef.current && !langRef.current.contains(e.target as Node)) setLangOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-40 border-b border-border/50 bg-background/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* Language switch — top left */}
        <div ref={langRef} className="relative">
          <button
            onClick={() => setLangOpen((v) => !v)}
            className="flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-sm font-medium text-foreground transition-all hover:bg-accent"
          >
            <Globe className="h-4 w-4" />
            <span className="uppercase">{language}</span>
            <ChevronDown
              className={`h-3.5 w-3.5 transition-transform duration-300 ${langOpen ? "rotate-180" : ""}`}
            />
          </button>
          {langOpen && (
            <div className="absolute left-0 mt-2 w-36 origin-top-left animate-slide-down overflow-hidden rounded-xl border border-border bg-popover shadow-[var(--shadow-elegant)]">
              {(["de", "en"] as const).map((lng) => (
                <button
                  key={lng}
                  onClick={() => {
                    setLanguage(lng);
                    setLangOpen(false);
                  }}
                  className={`flex w-full items-center justify-between px-4 py-2.5 text-sm transition-colors hover:bg-accent ${
                    language === lng ? "font-semibold text-foreground" : "text-muted-foreground"
                  }`}
                >
                  <span>{lng === "de" ? "Deutsch" : "English"}</span>
                  {language === lng && <span className="h-1.5 w-1.5 rounded-full bg-foreground" />}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Dropdown — right */}
        <div ref={menuRef} className="relative">
          <button
            onClick={() => setOpen((v) => !v)}
            className="flex items-center gap-2 rounded-full bg-primary px-5 py-2 text-sm font-medium text-primary-foreground transition-all hover:scale-105 hover:shadow-[var(--shadow-elegant)]"
          >
            <span>{t("menu")}</span>
            <ChevronDown
              className={`h-4 w-4 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
            />
          </button>
          <div
            className={`absolute right-0 mt-2 w-56 origin-top-right overflow-hidden rounded-xl border border-border bg-popover shadow-[var(--shadow-elegant)] transition-all duration-300 ease-out ${
              open
                ? "scale-100 opacity-100 translate-y-0"
                : "pointer-events-none scale-95 opacity-0 -translate-y-2"
            }`}
          >
            {[1, 2, 3, 4].map((i) => (
              <button
                key={i}
                className="block w-full px-5 py-3 text-left text-sm text-popover-foreground transition-colors hover:bg-accent"
                style={{ transitionDelay: open ? `${i * 30}ms` : "0ms" }}
              >
                Test {i}
              </button>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
