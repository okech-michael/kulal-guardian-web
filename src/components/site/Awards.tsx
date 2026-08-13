import { Award, Medal, Globe2, Quote } from "lucide-react";
import { Reveal } from "./Reveal";
import { WordReveal, BlurReveal } from "./Cinematic";
import { Counter } from "./Counter";
import winners from "@/assets/winners.jpeg";
import hero from "@/assets/hero-mount-kulal.jpg";
import elders from "@/assets/community-elders.jpeg";

const timeline = [
  {
    year: "2025",
    date: "November 7",
    icon: Award,
    title: "UNESCO-Greece Melina Mercouri International Prize",
    body: "USD 30,000 award for the Safeguarding and Management of Cultural Landscapes, recognising fifty years of community stewardship of Mount Kulal.",
  },
  {
    year: "2024",
    date: "",
    icon: Globe2,
    title: "National Environmental Recognition",
    body: "Honoured by the Ministry of Environment for outstanding contribution to indigenous forest conservation in Kenya's northern drylands.",
  },
  {
    year: "2023",
    date: "",
    icon: Medal,
    title: "County Conservation Partnership",
    body: "Marsabit County Government formalises a partnership for community-led ecosystem restoration across the Kulal massif.",
  },
  {
    year: "2022",
    date: "",
    icon: Award,
    title: "Community Stewardship Award",
    body: "Recognised by the regional conservation network for grassroots leadership and sustained biodiversity work.",
  },
];

const unescoStory = [
  {
    heading: "A landscape, not a monument",
    body: "The Melina Mercouri Prize honours cultural landscapes: places where people and nature have shaped one another over generations. Mount Kulal is exactly that. Its cloud forest survives not despite the Samburu, Rendille and Turkana communities living on its slopes, but because of the customary law that governs how they graze, harvest and burn.",
  },
  {
    heading: "Why the jury chose Kulal",
    body: "The nomination documented something rare: a conservation model designed, staffed and enforced entirely by the community it serves. Village-nominated forest guards, elders' councils that codify grazing rotations, women's nurseries paid on seedling survival, and school clubs feeding graduates back into the workforce.",
  },
  {
    heading: "What the prize changes",
    body: "The USD 30,000 award funds the next phase of restoration and the permanent archive at the Gatab office. More than the money, the recognition gives the elders' councils standing in county and national planning rooms where decisions about Kulal have historically been made without them.",
  },
];

export function Awards() {
  return (
    <main>
      {/* Hero */}
      <section className="relative min-h-[62svh] overflow-hidden">
        <img src={hero} alt="Mount Kulal at dawn" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/40 to-background" />
        <div className="container-x relative flex min-h-[62svh] flex-col justify-end pb-12 pt-24">
          <Reveal>
            <span className="site-section-label text-accent">Awards &amp; recognition</span>
          </Reveal>
          <WordReveal
            as="h1"
            text="Recognised on the world stage. Grounded in the village."
            delay={0.1}
            className="mt-5 max-w-4xl font-display text-[2.4rem] leading-[1.05] text-white sm:text-[3.6rem]"
          />
          <BlurReveal delay={0.3}>
            <p className="mt-6 max-w-2xl text-[1.1rem] leading-[1.9] text-white/85">
              International honours matter only if they change what happens on the mountain. Here is what
              we have been recognised for, and what it made possible.
            </p>
          </BlurReveal>
        </div>
      </section>

      {/* Featured UNESCO award */}
      <section className="bg-background py-20 sm:py-28">
        <div className="container-x">
          <Reveal>
            <div className="overflow-hidden rounded-[2rem] bg-gradient-to-br from-primary to-primary/85 text-primary-foreground shadow-elegant">
              <div className="grid items-stretch lg:grid-cols-12">
                <div className="relative min-h-[18rem] lg:col-span-5">
                  <img src={winners} alt="Wazee wa Mazingira delegation receiving the UNESCO prize" className="absolute inset-0 h-full w-full object-cover" />
                  <div className="absolute inset-0 bg-primary/20" />
                </div>
                <div className="p-8 sm:p-12 lg:col-span-7">
                  <span className="site-section-label text-accent">Featured award · November 2025</span>
                  <h2 className="mt-4 font-display text-[1.9rem] leading-tight text-balance sm:text-[2.6rem]">
                    UNESCO-Greece Melina Mercouri International Prize
                  </h2>
                  <p className="mt-5 text-[1.05rem] leading-[1.85] text-primary-foreground/85">
                    For the Safeguarding and Management of Cultural Landscapes, one of the most
                    prestigious international honours for community-led conservation, awarded jointly by
                    UNESCO and the Government of Greece.
                  </p>
                  <div className="mt-8 grid gap-6 border-t border-primary-foreground/20 pt-8 sm:grid-cols-3">
                    <div>
                      <div className="font-display text-[2rem] text-accent">
                        $<Counter to={30} />k
                      </div>
                      <p className="mt-1 text-[0.9rem] uppercase tracking-wider text-primary-foreground/70">Prize value</p>
                    </div>
                    <div>
                      <div className="font-display text-[2rem] text-accent">
                        <Counter to={50} suffix="+" />
                      </div>
                      <p className="mt-1 text-[0.9rem] uppercase tracking-wider text-primary-foreground/70">Years of stewardship</p>
                    </div>
                    <div>
                      <div className="font-display text-[2rem] text-accent">1974</div>
                      <p className="mt-1 text-[0.9rem] uppercase tracking-wider text-primary-foreground/70">Biosphere reserve since</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* UNESCO storytelling */}
      <section className="bg-muted/50 py-12 sm:py-16">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Reveal>
              <span className="site-section-label">The story behind the prize</span>
              <h2 className="mt-4 font-display text-[1.9rem] leading-tight text-foreground sm:text-[2.4rem]">
                Fifty years of quiet work, read aloud in Paris
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="mt-8 overflow-hidden rounded-[2rem] border border-border/70 shadow-card">
                <img src={elders} alt="Elders of Mount Kulal" className="h-full w-full object-cover" loading="lazy" />
              </div>
            </Reveal>
          </div>
          <div className="lg:col-span-7">
            <div className="space-y-10">
              {unescoStory.map((s, i) => (
                <Reveal key={s.heading} delay={i * 0.08}>
                  <div className="border-l-2 border-accent pl-6">
                    <h3 className="font-display text-[1.4rem] text-foreground sm:text-[1.7rem]">{s.heading}</h3>
                    <p className="mt-3 text-[1.05rem] leading-[1.9] text-foreground/75">{s.body}</p>
                  </div>
                </Reveal>
              ))}
            </div>
            <Reveal delay={0.2}>
              <blockquote className="mt-12 rounded-3xl border border-border/70 bg-card p-8 shadow-card">
                <Quote className="h-7 w-7 text-accent" />
                <p className="mt-4 font-display text-[1.3rem] leading-[1.6] text-foreground sm:text-[1.6rem]">
                  &ldquo;This prize does not belong in an office. It belongs to every elder who kept the
                  grazing law and every child who carried a seedling up the mountain.&rdquo;
                </p>
                <footer className="mt-6 text-[0.9rem] uppercase tracking-[0.18em] text-muted-foreground">
                  Joseph Leiti Lengoiyap · Chairperson
                </footer>
              </blockquote>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Immersive timeline */}
      <section className="bg-background py-20 sm:py-28">
        <div className="container-x">
          <Reveal>
            <span className="site-section-label">Recognition timeline</span>
            <h2 className="mt-4 site-section-title max-w-3xl">Honours through the years</h2>
          </Reveal>

          <div className="relative mt-16">
            <div className="absolute left-4 top-2 bottom-2 w-px bg-gradient-to-b from-accent via-border to-transparent md:left-1/2 md:-translate-x-1/2" />
            <div className="space-y-12">
              {timeline.map((t, i) => (
                <Reveal key={t.year} delay={i * 0.07}>
                  <div className={`relative grid gap-4 md:grid-cols-2 ${i % 2 ? "md:[&>*:first-child]:col-start-2" : ""}`}>
                    <div className="absolute left-4 top-4 grid h-3.5 w-3.5 -translate-x-1/2 place-items-center rounded-full bg-accent ring-4 ring-background md:left-1/2" />
                    <div className={`pl-12 md:pl-0 ${i % 2 ? "md:pr-12 md:text-right" : "md:pl-12"}`}>
                      <div className={`inline-flex items-center gap-2 rounded-full bg-card px-4 py-2 text-[0.92rem] font-semibold text-primary shadow-sm ${i % 2 ? "md:flex-row-reverse" : ""}`}>
                        <t.icon className="h-4 w-4 shrink-0" />
                        {t.year}
                        {t.date && <span className="text-muted-foreground">· {t.date}</span>}
                      </div>
                      <h3 className="mt-4 site-card-title">{t.title}</h3>
                      <p className="mt-2 site-card-copy">{t.body}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
