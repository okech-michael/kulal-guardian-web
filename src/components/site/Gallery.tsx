import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";
import { Reveal } from "./Reveal";

const modules = import.meta.globEager('/src/assets/*.{jpg,jpeg,png,webp,gif,svg}') as Record<string, { default: string }>;

type FileEntry = { path: string; src: string };

function inferTagFromName(name: string): Item['tag'] {
  if (name.includes('education')) return 'Education';
  if (name.includes('wildlife')) return 'Wildlife';
  if (name.includes('youth') || name.includes('winners') || name.includes('mr-') || name.includes('community')) return 'Community';
  return 'Conservation';
}

const fileEntries: FileEntry[] = Object.entries(modules).map(([path, mod]) => ({ path, src: mod.default }));
fileEntries.sort((a, b) => {
  if (a.path.includes('hero')) return -1;
  if (b.path.includes('hero')) return 1;
  if (a.path.includes('wildlife')) return -1;
  if (b.path.includes('wildlife')) return 1;
  return a.path.localeCompare(b.path);
});

const items: Item[] = fileEntries.map(({ path, src }) => {
  const filename = path.split('/').pop() || path;
  const name = filename.replace(/\.[^/.]+$/, '').toLowerCase();
  const tag = inferTagFromName(name);
  const alt = name.replace(/[-_]/g, ' ').replace(/\b(\w)/g, (m) => m.toUpperCase());
  const span = name.includes('hero') || name.includes('wildlife') ? 'row-span-2' : undefined;
  return { src, alt, tag, span } as Item;
});

type Item = { src: string; alt: string; tag: "Conservation" | "Community" | "Education" | "Wildlife"; span?: string };

const items: Item[] = [
  { src: hero, alt: "Mount Kulal at golden hour", tag: "Conservation", span: "row-span-2" },
  { src: youth, alt: "Youth planting indigenous trees", tag: "Community" },
  { src: education, alt: "School environmental class", tag: "Education" },
  { src: wildlife, alt: "Elephants at sunrise", tag: "Wildlife", span: "row-span-2" },
  { src: elders, alt: "Community elders gathered", tag: "Community" },
  { src: canopy, alt: "Misty forest canopy", tag: "Conservation" },
  { src: sapling, alt: "Hands planting sapling", tag: "Conservation" },
  { src: landscape, alt: "Mount Kulal landscape", tag: "Conservation" },
];

const tags = ["All", "Conservation", "Community", "Education", "Wildlife"] as const;

export function Gallery() {
  const [filter, setFilter] = useState<(typeof tags)[number]>("All");
  const [lightbox, setLightbox] = useState<Item | null>(null);
  const filtered = items.filter((i) => filter === "All" || i.tag === filter);

  return (
    <section id="gallery" className="bg-background py-24 sm:py-32">
      <div className="container-x">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <Reveal>
            <span className="site-section-label">
              Events &amp; Activities
            </span>
            <h2 className="site-section-title max-w-2xl">
              Moments from the field.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="flex flex-wrap gap-2">
              {tags.map((t) => (
                <button
                  key={t}
                  onClick={() => setFilter(t)}
                  className={`rounded-full border px-4 py-2.5 text-[0.96rem] font-semibold transition-colors ${
                    filter === t
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-card text-foreground/70 hover:border-accent/40 hover:text-foreground"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </Reveal>
        </div>

        <motion.div layout className="mt-12 grid auto-rows-[180px] grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
          <AnimatePresence mode="popLayout">
            {filtered.map((it) => (
              <motion.button
                key={it.src}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => setLightbox(it)}
                className={`group relative overflow-hidden rounded-2xl bg-muted ${it.span ?? ""}`}
              >
                <img src={it.src} alt={it.alt} loading="lazy" className="h-full w-full object-cover transition-transform duration-[1.2s] group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-black/0 opacity-0 transition-opacity group-hover:opacity-100" />
                <span className="absolute bottom-3 left-3 rounded-full bg-white/90 px-3 py-1.5 text-[0.78rem] font-semibold uppercase tracking-wider text-primary opacity-0 transition-opacity group-hover:opacity-100">
                  {it.tag}
                </span>
              </motion.button>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
            className="fixed inset-0 z-[100] grid place-items-center bg-black/90 p-4 backdrop-blur-sm"
          >
            <button
              aria-label="Close"
              onClick={() => setLightbox(null)}
              className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20"
            >
              <X className="h-5 w-5" />
            </button>
            <motion.img
              key={lightbox.src}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              src={lightbox.src}
              alt={lightbox.alt}
              className="max-h-[88vh] max-w-[92vw] rounded-2xl object-contain shadow-elegant"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
