import { createContext, useContext, useEffect, useState, ReactNode } from "react";

type Theme = "light" | "dark";
type Language = "de" | "en";

interface AppContextValue {
  theme: Theme | null;
  setTheme: (t: Theme) => void;
  language: Language;
  setLanguage: (l: Language) => void;
  t: (key: TranslationKey) => string;
  hasChosenTheme: boolean;
}

const translations = {
  welcome: { de: "Willkommen", en: "Welcome" },
  welcomeSub: {
    de: "Wählen Sie Ihr bevorzugtes Erlebnis",
    en: "Choose your preferred experience",
  },
  chooseTheme: { de: "Wählen Sie Ihre Farbe", en: "Choose your color" },
  light: { de: "Hell", en: "White" },
  dark: { de: "Dunkel", en: "Black" },
  continue: { de: "Fortfahren", en: "Continue" },
  menu: { de: "Menü", en: "Menu" },
  heroSub: {
    de: "Eine Test-Website für Unternehmen",
    en: "A test website for businesses",
  },
  scrollHint: { de: "Scrollen Sie nach unten", en: "Scroll down" },
  section1Title: { de: "Über unser Unternehmen", en: "About our business" },
  section1Body: {
    de: "Dies ist eine professionelle Test-Website, die Ihnen zeigt, wie Ihre Marke online präsentiert werden kann. Klare Linien, sanfte Animationen und ein durchdachtes Layout.",
    en: "This is a professional test website demonstrating how your brand can be presented online. Clean lines, smooth animations, and a thoughtful layout.",
  },
  section2Title: { de: "Unsere Leistungen", en: "Our services" },
  section2Body: {
    de: "Wir liefern hochwertige Lösungen, die auf die Bedürfnisse Ihres Unternehmens zugeschnitten sind.",
    en: "We deliver high-quality solutions tailored to your business needs.",
  },
  feature1: { de: "Schnell & Zuverlässig", en: "Fast & Reliable" },
  feature2: { de: "Modernes Design", en: "Modern Design" },
  feature3: { de: "Skalierbar", en: "Scalable" },
  footer: { de: "© 2026 PETERLUTSCHTFUESSE — Alle Rechte vorbehalten.", en: "© 2026 PETERLUTSCHTFUESSE — All rights reserved." },
} as const;

type TranslationKey = keyof typeof translations;

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme | null>(null);
  const [language, setLanguage] = useState<Language>("en");

  useEffect(() => {
    const saved = localStorage.getItem("theme") as Theme | null;
    const lang = localStorage.getItem("lang") as Language | null;
    if (saved) setThemeState(saved);
    if (lang) setLanguage(lang);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("theme-light", "theme-dark");
    if (theme) {
      root.classList.add(theme === "dark" ? "theme-dark" : "theme-light");
      localStorage.setItem("theme", theme);
    }
  }, [theme]);

  useEffect(() => {
    localStorage.setItem("lang", language);
  }, [language]);

  const setTheme = (t: Theme) => setThemeState(t);
  const t = (key: TranslationKey) => translations[key][language];

  return (
    <AppContext.Provider
      value={{ theme, setTheme, language, setLanguage, t, hasChosenTheme: theme !== null }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
