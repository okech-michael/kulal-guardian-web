import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { Reveal } from "./Reveal";

const items = [
  { quote: "Through Wazee wa Mazingira I found a purpose. I now lead a youth group restoring our village water springs.", name: "Lemarpe K.", role: "Youth Volunteer, Gatab Ward" },
  { quote: "Our daughters learn from the elders, and the elders learn from the rangers. That is the spirit of Kulal.", name: "Mama Halima", role: "Women's Group Chair, Loiyangalani" },
  { quote: "This organisation gave me my first job in conservation. Today I monitor wildlife corridors I once walked as a child.", name: "Daniel L.", role: "Community Ranger" },
  { quote: "When the rains failed, the indigenous trees we planted with Wazee held the soil. That is real climate adaptation.", name: "Chief Galgallo", role: "Village Elder" },
];

export function Testimonials() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % items.length), 6500);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="bg-muted/60 py-24 sm:py-32">
      <div className="container-x">
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <span className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">
              Community Voices
            </span>
            <h2 className="mt-4 font-display text-4xl text-balance sm:text-5xl">
              The mountain speaks through her people.
            </h2>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="relative mx-auto mt-14 max-w-3xl">
            <div className="relative min-h-[280px] sm:min-h-[240px]">
              <AnimatePresence mode="wait">
                <motion.figure
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="rounded-3xl border border-border/70 bg-card p-8 shadow-card sm:p-12"
                >
                  <Quote className="h-9 w-9 text-accent" strokeWidth={1.5} />
                  <blockquote className="mt-6 font-display text-2xl leading-snug text-foreground text-balance sm:text-3xl">
                    &ldquo;{items[i].quote}&rdquo;
                  </blockquote>
                  <figcaption className="mt-7 flex items-center gap-4">
                    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-primary font-display text-lg text-primary-foreground">
                      {items[i].name.charAt(0)}
                    </span>
                    <div>
                      <div className="font-semibold">{items[i].name}</div>
                      <div className="text-sm text-muted-foreground">{items[i].role}</div>
                    </div>
                  </figcaption>
                </motion.figure>
              </AnimatePresence>
            </div>

            <div className="mt-6 flex items-center justify-center gap-4">
              <button onClick={() => setI((v) => (v - 1 + items.length) % items.length)} aria-label="Previous"
                className="grid h-10 w-10 place-items-center rounded-full border border-border bg-card hover:border-accent/40 hover:text-accent">
                <ChevronLeft className="h-4 w-4" />
              </button>
              <div className="flex gap-2">
                {items.map((_, idx) => (
                  <button key={idx} onClick={() => setI(idx)} aria-label={`Slide ${idx + 1}`}
                    className={`h-2 rounded-full transition-all ${i === idx ? "w-8 bg-accent" : "w-2 bg-border"}`} />
                ))}
              </div>
              <button onClick={() => setI((v) => (v + 1) % items.length)} aria-label="Next"
                className="grid h-10 w-10 place-items-center rounded-full border border-border bg-card hover:border-accent/40 hover:text-accent">
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
