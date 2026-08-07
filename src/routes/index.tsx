import { createFileRoute } from "@tanstack/react-router";
import { Toaster } from "@/components/ui/sonner";
import { Nav } from "@/components/site/Nav";
import { Hero } from "@/components/site/Hero";
import { ScrollProgress } from "@/components/site/Cinematic";
import {
  OurStory,
  SpiritOfTheMountain,
  Communities,
  Biodiversity,
  ConservationJourney,
  UnescoRecognition,
  ImpactBand,
  TheYouth,
  LatestStories,
  Partners,
  TheFuture,
} from "@/components/site/Story";
import { Testimonials } from "@/components/site/Testimonials";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Wazee wa Mazingira, Protecting Mount Kulal, Marsabit, Kenya" },
      { name: "description", content: "Community-based conservation in Marsabit County. Protecting Mount Kulal's cloud forest, springs and biodiversity through youth leadership, indigenous knowledge and sustainable development." },
      { property: "og:title", content: "Wazee wa Mazingira, Conservation on Mount Kulal" },
      { property: "og:description", content: "A mountain that makes rain. A people who keep it alive." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,500;0,9..144,600;1,9..144,400&family=Inter:wght@400;500;600;700&display=swap" },
      { rel: "canonical", href: "/" },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <main>
      <ScrollProgress />
      <Nav />
      <Hero />
      <OurStory />
      <SpiritOfTheMountain />
      <Communities />
      <Biodiversity />
      <ConservationJourney />
      <UnescoRecognition />
      <ImpactBand />
      <TheYouth />
      <Testimonials />
      <LatestStories />
      <Partners />
      <TheFuture />
      <Footer />
      <Toaster richColors position="top-center" />
    </main>
  );
}
