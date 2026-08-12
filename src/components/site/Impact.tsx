import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Reveal } from "./Reveal";
import { Counter } from "./Counter";
import { WordReveal, BlurReveal } from "./Cinematic";
import { Trees, Users, Sprout, GraduationCap, Droplets, Bird } from "lucide-react";
import hero from "@/assets/kulal-landscape.jpg";
import youth from "@/assets/youth-planting.jpeg";
import elders from "@/assets/community-elders.jpeg";
import education from "@/assets/education.jpeg";

const pillars = [
  { icon: Trees, title: "Forest Protection", body: "Patrolling, restoring and defending the indigenous cloud forest of Mount Kulal against deforestation and degradation." },
  { icon: Bird, title: "Biodiversity Conservation", body: "Safeguarding rare species, endemic flora and migratory wildlife corridors across the Kulal ecosystem." },
  { icon: Users, title: "Community Awareness", body: "Convening barazas, radio dialogues and village forums that put conservation in the hands of local people." },
  { icon: GraduationCap, title: "Environmental Education", body: "Training the next generation of stewards through school clubs, youth fellowships and field mentorship." },
  { icon: Sprout, title: "Sustainable Livelihoods", body: "Beekeeping, agroforestry and dryland farming that turn conservation into dignified household income." },
  { icon: Droplets, title: "Water & Catchments", body: "Protecting springs, rehabilitating water pans and restoring the catchment systems that sustain pastoralist life." },
];

const stats = [
  { value: 42, suffix: "k+", label: "Indigenous trees planted" },
  { value: 100, suffix: "", label: "Villages engaged" },
  { value: 2500, suffix: "+", label: "Youth mobilised" },
  { value: 50, suffix: "+", label: "Years on the ground" },
];

const goals = [
  { label: "50 hectares under restoration", value: 78, note: "39 ha actively restored" },
  { label: "16 trained community rangers", value: 100, note: "Target reached in 2025" },
  { label: "20 schools with green clubs", value: 70, note: "14 of 20 schools active" },
  { label: "12 springs protected by 2028", value: 42, note: "5 springs rehabilitated" },
];

const timeline = [
  {
    year: "1974",
    title: "Mount Kulal declared a Biosphere Reserve",
    body: "UNESCO recognises the massif as a Man and the Biosphere reserve, an isolated cloud forest island in Kenya's northern drylands. Local stewardship, however, remains informal.",
    image: hero,
  },
  {
    year: "2016",
    title: "The elders begin writing it down",
    body: "Wazee wa Mazingira convenes its first structured elders' council, recording customary grazing rotations, sacred grove boundaries and forest taboos before that generation passes.",
    image: elders,
  },
  {
    year: "2018",
    title: "Conservation enters the classroom",
    body: "Green Schools of Kulal launches with environmental clubs and school nurseries, eventually reaching more than 3,200 learners across three wards.",
    image: education,
  },
  {
    year: "2019",
    title: "Village nurseries take over replanting",
    body: "Women's groups in Gatab, Arapal and Larachi assume control of seed collection and seedling care, with payment tied to survival rather than delivery.",
    image: youth,
  },
  {
    year: "2021",
    title: "Rangers start counting",
    body: "Community rangers begin quarterly transects across four altitude bands, producing the mountain's first continuous biodiversity dataset.",
    image: hero,
  },
  {
    year: "2025",
    title: "UNESCO-Greece Melina Mercouri Prize",
    body: "The organisation receives the international prize for the safeguarding and management of cultural landscapes, recognising fifty years of community stewardship.",
    image: elders,
  },
];

const stories = [
  {
    image: youth,
    place: "Arapal",
    title: "The spring that came back",
    body: "After four seasons of basin digging and canopy restoration above the catchment, a seasonal spring at Arapal now flows six weeks longer each year. Households that walked eleven kilometres for water in the dry season now walk three.",
    metric: "+6 weeks of flow",
  },
  {
    image: elders,
    place: "Gatab",
    title: "From notebooks to a mandate",
    body: "Two decades of handwritten minutes were digitised at the new Gatab office. Customary grazing rules recorded by elders are now written into the mountain's official grazing management plan.",
    metric: "20 years archived",
  },
  {
    image: education,
    place: "Loiyangalani",
    title: "Club members became guards",
    body: "Several of the first school club members have returned as forest guards and nursery supervisors, closing the loop between environmental education and paid conservation work on the mountain.",
    metric: "3,200+ learners",
  },
];

export function Impact() {
  const [active, setActive] = useState(timeline.length - 1);
  const current = timeline[active];

  return (
    <main>
      {/* Hero */}
      <section className="relative min-h-[68svh] overflow-hidden">
        <img src={hero} alt="Mount Kulal" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/35 to-background" />
        <div className="container-x relative flex min-h-[68svh] flex-col justify-end pb-20 pt-40">
          <Reveal>
            <span className="site-section-label text-accent">Our impact</span>
          </Reveal>
          <WordReveal
            as="h1"
            text="Conservation that is lived, not lectured."
            delay={0.1}
            className="mt-5 max-w-4xl font-display text-[2.4rem] leading-[1.05] text-white sm:text-[3.8rem]"
          />
          <BlurReveal delay={0.3}>
            <p className="mt-6 max-w-2xl text-[1.1rem] leading-[1.9] text-white/85">
              Fifty years of work on one mountain, measured in trees that survived, springs that returned and
              children who stayed to protect them.
            </p>
          </BlurReveal>
        </div>
      </section>

      {/* Animated statistics */}
      <section className="bg-background pb-16 pt-16 sm:pb-20 sm:pt-20">
        <div className="container-x">
          <Reveal>
            <div className="grid gap-y-10 gap-x-6 rounded-[2rem] bg-primary px-6 py-12 text-primary-foreground shadow-elegant sm:grid-cols-2 sm:px-10 lg:grid-cols-4">
              {stats.map((s) => (
                <div key={s.label} className="text-center">
                  <div className="font-display text-[2.6rem] text-accent sm:text-[3.2rem]">
                    <Counter to={s.value} suffix={s.suffix} />
                  </div>
                  <div className="mt-3 text-[0.95rem] uppercase tracking-wider text-primary-foreground/75">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Pillars */}
      <section className="bg-background py-16 sm:py-20">
        <div className="container-x">
          <Reveal>
            <span className="site-section-label">Six pillars</span>
            <h2 className="mt-4 site-section-title max-w-3xl">How the work is organised</h2>
          </Reveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {pillars.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.06}>
                <div className="group relative h-full overflow-hidden rounded-3xl border border-border/70 bg-card p-7 transition-all duration-500 hover:-translate-y-1 hover:border-accent/40 hover:shadow-elegant">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-primary text-primary-foreground transition-transform duration-500 group-hover:scale-110">
                    <p.icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-5 site-card-title">{p.title}</h3>
                  <p className="mt-3 site-card-copy">{p.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Progress towards goals */}
      <section className="bg-muted/50 py-20 sm:py-28">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Reveal>
              <span className="site-section-label">Progress</span>
              <h2 className="mt-4 font-display text-[1.9rem] leading-tight text-foreground sm:text-[2.4rem]">
                Where we stand against our 2028 targets
              </h2>
              <p className="mt-5 site-section-copy">
                We publish progress openly, including the targets we are behind on. Accountability to the
                villages of Kulal comes before accountability to anyone else.
              </p>
            </Reveal>
          </div>
          <div className="lg:col-span-8">
            <div className="space-y-8">
              {goals.map((g, i) => (
                <Reveal key={g.label} delay={i * 0.07}>
                  <div>
                    <div className="grid grid-cols-[minmax(0,1fr)_auto] items-baseline gap-4">
                      <h3 className="min-w-0 text-[1.05rem] font-semibold text-foreground">{g.label}</h3>
                      <span className="shrink-0 font-display text-[1.4rem] text-primary">{g.value}%</span>
                    </div>
                    <div className="mt-3 h-2.5 w-full overflow-hidden rounded-full bg-border">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${g.value}%` }}
                        viewport={{ once: true, margin: "-60px" }}
                        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                        className="h-full rounded-full bg-accent"
                      />
                    </div>
                    <p className="mt-2 text-[0.95rem] text-muted-foreground">{g.note}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Interactive timeline */}
      <section className="bg-background py-20 sm:py-28">
        <div className="container-x">
          <Reveal>
            <span className="site-section-label">Fifty years</span>
            <h2 className="mt-4 site-section-title max-w-3xl">An interactive history of the mountain</h2>
          </Reveal>

          <div className="mt-12 -mx-4 overflow-x-auto px-4 pb-2">
            <div className="relative flex min-w-max items-center gap-3">
              <div className="absolute inset-x-0 top-1/2 h-px bg-border" aria-hidden="true" />
              {timeline.map((t, i) => (
                <button
                  key={t.year}
                  onClick={() => setActive(i)}
                  aria-pressed={active === i}
                  className={`relative rounded-full border px-5 py-2.5 text-[0.95rem] font-semibold transition-colors ${
                    active === i
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-card text-foreground/70 hover:border-accent/50 hover:text-foreground"
                  }`}
                >
                  {t.year}
                </button>
              ))}
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={current.year}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="mt-10 grid items-center gap-10 overflow-hidden rounded-[2rem] border border-border/70 bg-card shadow-card lg:grid-cols-2"
            >
              <div className="aspect-[16/11] overflow-hidden lg:aspect-auto lg:h-full lg:min-h-[24rem]">
                <img src={current.image} alt={current.title} className="h-full w-full object-cover" />
              </div>
              <div className="p-8 sm:p-12">
                <span className="font-display text-[2.4rem] text-accent">{current.year}</span>
                <h3 className="mt-3 font-display text-[1.7rem] leading-tight text-foreground sm:text-[2.1rem]">
                  {current.title}
                </h3>
                <p className="mt-5 text-[1.05rem] leading-[1.9] text-foreground/75">{current.body}</p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Where we work */}
      <section className="bg-muted/50 py-20 sm:py-28">
        <div className="container-x">
          <Reveal>
            <span className="site-section-label">Where we work</span>
            <h2 className="mt-4 site-section-title max-w-3xl">The Kulal massif, village by village</h2>
          </Reveal>
          <div className="mt-12 grid gap-8 lg:grid-cols-12">
            <div className="relative overflow-hidden rounded-[2rem] border border-border/70 shadow-card lg:col-span-7">
              <img src={hero} alt="Mount Kulal terrain" className="h-full min-h-[22rem] w-full object-cover" />
              <div className="absolute inset-0 bg-primary/25" />
              {[
                { top: "26%", left: "38%", label: "Arapal" },
                { top: "48%", left: "56%", label: "Gatab" },
                { top: "64%", left: "30%", label: "Nkororoi" },
                { top: "38%", left: "72%", label: "Larachi" },
                { top: "76%", left: "62%", label: "Lolkujita" },
              ].map((m, i) => (
                <motion.div
                  key={m.label}
                  initial={{ opacity: 0, scale: 0.6 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.15 * i, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute -translate-x-1/2 -translate-y-1/2"
                  style={{ top: m.top, left: m.left }}
                >
                  <span className="relative flex items-center gap-2">
                    <span className="relative grid h-3 w-3 place-items-center">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent/70" />
                      <span className="relative inline-flex h-3 w-3 rounded-full bg-accent" />
                    </span>
                    <span className="whitespace-nowrap rounded-full bg-black/45 px-3 py-1 text-[0.8rem] font-semibold text-white backdrop-blur-md">
                      {m.label}
                    </span>
                  </span>
                </motion.div>
              ))}
            </div>
            <div className="lg:col-span-5">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
                {[
                  { k: "Altitude range", v: "600 m - 2,285 m" },
                  { k: "Reserve status", v: "UNESCO Biosphere Reserve since 1974" },
                  { k: "Wards covered", v: "Loiyangalani, Gatab & Kargi" },
                  { k: "Guard stations", v: "9 village-nominated forest guards" },
                ].map((d) => (
                  <div key={d.k} className="rounded-2xl border border-border/70 bg-card p-6 shadow-card">
                    <dt className="text-[0.78rem] uppercase tracking-[0.2em] text-muted-foreground">{d.k}</dt>
                    <dd className="mt-2 text-[1.05rem] font-semibold text-foreground">{d.v}</dd>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Success stories */}
      <section className="bg-background py-20 sm:py-28">
        <div className="container-x">
          <Reveal>
            <span className="site-section-label">Success stories</span>
            <h2 className="mt-4 site-section-title max-w-3xl">Change you can stand in</h2>
          </Reveal>
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {stories.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.08}>
                <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-border/70 bg-card shadow-card transition-all hover:-translate-y-1 hover:shadow-elegant">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img
                      src={s.image}
                      alt={s.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-[1.4s] group-hover:scale-110"
                    />
                    <span className="absolute left-4 top-4 rounded-full bg-accent px-3 py-1.5 text-[0.8rem] font-semibold uppercase tracking-wider text-accent-foreground">
                      {s.place}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-7">
                    <h3 className="site-card-title">{s.title}</h3>
                    <p className="mt-3 site-card-copy">{s.body}</p>
                    <span className="mt-6 inline-block font-display text-[1.5rem] text-primary">{s.metric}</span>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
