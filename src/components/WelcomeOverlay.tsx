import { useState } from "react";
import { useApp } from "@/contexts/AppContext";
import { Sun, Moon } from "lucide-react";

export function WelcomeOverlay() {
  const { hasChosenTheme, setTheme, t } = useApp();
  const [closing, setClosing] = useState(false);

  if (hasChosenTheme && !closing) return null;

  const handleChoose = (theme: "light" | "dark") => {
    setClosing(true);
    setTimeout(() => setTheme(theme), 400);
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-background ${
        closing ? "animate-[fade-in_0.4s_ease-out_reverse_forwards]" : "animate-fade-in"
      }`}
    >
      <div className="max-w-md px-8 text-center">
        <h1
          className="text-5xl font-bold tracking-tight text-foreground animate-fade-up"
          style={{ animationDelay: "0.1s" }}
        >
          {t("welcome")}
        </h1>
        <p
          className="mt-4 text-lg text-muted-foreground animate-fade-up"
          style={{ animationDelay: "0.3s" }}
        >
          {t("welcomeSub")}
        </p>

        <div
          className="mt-12 animate-fade-up"
          style={{ animationDelay: "0.5s" }}
        >
          <p className="mb-6 text-sm uppercase tracking-widest text-muted-foreground">
            {t("chooseTheme")}
          </p>
          <div className="flex justify-center gap-4">
            <button
              onClick={() => handleChoose("light")}
              className="group flex flex-col items-center gap-3 rounded-2xl border border-border bg-card px-8 py-6 transition-all hover:scale-105 hover:shadow-[var(--shadow-elegant)]"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white text-black shadow-md transition-transform group-hover:rotate-12">
                <Sun className="h-7 w-7" />
              </div>
              <span className="text-sm font-medium text-foreground">{t("light")}</span>
            </button>
            <button
              onClick={() => handleChoose("dark")}
              className="group flex flex-col items-center gap-3 rounded-2xl border border-border bg-card px-8 py-6 transition-all hover:scale-105 hover:shadow-[var(--shadow-elegant)]"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-black text-white shadow-md transition-transform group-hover:-rotate-12">
                <Moon className="h-7 w-7" />
              </div>
              <span className="text-sm font-medium text-foreground">{t("dark")}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
