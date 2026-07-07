import { createFileRoute } from "@tanstack/react-router";
import { Toaster } from "@/components/ui/sonner";
import { Nav } from "@/components/site/Nav";
import { MountKulal } from "@/components/site/MountKulal";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/mount-kulal")({
  head: () => ({
    meta: [
      { title: "Mount Kulal · Wazee wa Mazingira" },
      { name: "description", content: "Discover Mount Kulal, its sacred forests, biodiversity, and the conservation work protecting this unique landscape in Marsabit County." },
      { property: "og:title", content: "Mount Kulal · Wazee wa Mazingira" },
      { property: "og:description", content: "Discover Mount Kulal, its sacred forests, biodiversity, and the conservation work protecting this unique landscape in Marsabit County." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/mount-kulal" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "canonical", href: "/mount-kulal" },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <main>
      <Nav />
      <MountKulal />
      <Footer />
      <Toaster richColors position="top-center" />
    </main>
  );
}
