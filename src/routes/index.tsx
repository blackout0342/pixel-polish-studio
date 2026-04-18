import { createFileRoute } from "@tanstack/react-router";
import { AppProvider } from "@/contexts/AppContext";
import { WelcomeOverlay } from "@/components/WelcomeOverlay";
import { SiteHeader } from "@/components/SiteHeader";
import { HeroTitle } from "@/components/HeroTitle";
import { ContentSections } from "@/components/ContentSections";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "PETERLUTSCHTFUESSE — Business Test Site" },
      {
        name: "description",
        content:
          "A smooth, animated business test website with theme and language selection.",
      },
    ],
  }),
});

function Index() {
  return (
    <AppProvider>
      <WelcomeOverlay />
      <SiteHeader />
      <main>
        <HeroTitle />
        <ContentSections />
      </main>
    </AppProvider>
  );
}
