import { motion } from "motion/react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Droplets, Bird, Users, Sprout, ShieldCheck, Flame } from "lucide-react";
import { Reveal } from "./Reveal";
import { Counter } from "./Counter";
import { WordReveal, BlurReveal, ScrollExpandImage, PanoramaStrip, useParallax, SectionCurve } from "./Cinematic";
import { posts } from "@/content/blog";
import landscape from "@/assets/kulal-landscape.jpg";
import canopy from "@/assets/forest-canopy.jpg";
import wildlife from "@/assets/wildlife.jpg";
import elders from "@/assets/community-elders.jpeg";
import youth from "@/assets/youth-planting.jpeg";
import sapling from "@/assets/sapling.jpeg";
import winners from "@/assets/winners.jpeg";
import education from "@/assets/education.jpeg";

/* 1 ── Our Story ─────────────────────────────────────────────── */
export function OurStory() {
  const { ref, y } = useParallax(["14%", "-14%"]);
  return (
    <section className="relative overflow-hidden bg-background py-24 sm:py-32">
      <div className="container-x grid gap-14 lg:grid-cols-12 lg:items-center lg:gap-20">
        <div className="lg:col-span-6">
          <Reveal>
            <span className="site-section-label">Chapter One — Our Story</span>
          </Reveal>
          <WordReveal
            as="h2"
            text="It began with elders who refused to let the forest go quiet."
            className="site-section-title"
          />
          <BlurReveal delay={0.1}>
            <p className="site-section-intro">
              In 1971, a group of elders from the slopes of Mount Kulal watched the springs run
              thinner each dry season. They had no funding, no office and no title deeds &mdash; only
              an inherited certainty that the forest above them was the reason their families,
              herds and neighbours could live in one of the harshest landscapes on earth.
            </p>
          </BlurReveal>
          <BlurReveal delay={0.2}>
            <p className="mt-5 site-section-copy">
              They began walking the ridgelines, mapping cut stumps, agreeing grazing seasons and
              teaching children the names of trees. Half a century later that same practice &mdash;
              patient, local, rooted in indigenous knowledge &mdash; has become an internationally
              recognised model of community-led conservation.
            </p>
          </BlurReveal>
          <Reveal delay={0.3}>
            <Link
              to="/about"
              className="group mt-9 inline-flex items-center gap-2 text-[0.98rem] font-semibold text-primary"
            >
              Read the full history
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
            </Link>
          </Reveal>
        </div>

        <div ref={ref} className="lg:col-span-6">
          <div className="relative">
            <motion.div
              style={{ y }}
              className="relative aspect-[4/5] overflow-hidden rounded-[2rem] shadow-elegant will-change-transform"
            >
              <img src={elders} alt="Community elders of Mount Kulal in conversation" loading="lazy" className="h-full w-full object-cover" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="absolute -bottom-10 -left-4 w-[58%] overflow-hidden rounded-[1.5rem] border-4 border-background shadow-card sm:-left-10"
            >
              <img src={sapling} alt="A seedling raised in the community nursery" loading="lazy" className="aspect-[4/3] w-full object-cover" />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* 2 ── The Spirit of Mount Kulal ─────────────────────────────── */
export function SpiritOfTheMountain() {
  return (
    <section className="relative bg-primary text-primary-foreground">
      <SectionCurve fill="text-background" flip />
      <div className="container-x pt-8 pb-16 sm:pb-20">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <span className="site-section-label">Chapter Two — The Mountain</span>
          </Reveal>
          <WordReveal
            as="h2"
            text="Kulal makes its own weather. The forest is the reason."
            className="site-section-title text-white"
          />
          <BlurReveal delay={0.1}>
            <p className="mt-6 text-[1.06rem] leading-[1.85] text-white/80 sm:text-[1.15rem]">
              Rising 2,335 metres from the Chalbi desert, Mount Kulal is an ecological island. Its
              montane cloud forest combs moisture from passing mist and releases it into springs
              that never stop &mdash; water that reaches pastoralist families far out on the plains.
              Lose the canopy, and the springs go with it.
            </p>
          </BlurReveal>
        </div>
      </div>

      <ScrollExpandImage
        src={landscape}
        alt="Mount Kulal rising above the arid plains of Marsabit County"
        caption="Mount Kulal at first light — a forested island in a sea of desert."
      />

      <div className="container-x py-20 sm:py-24">
        <dl className="grid grid-cols-2 gap-8 border-t border-white/15 pt-10 lg:grid-cols-4">
          {[
            { k: "2,335 m", v: "Peak elevation" },
            { k: "1979", v: "Designated UNESCO Biosphere Reserve" },
            { k: "700+", v: "Documented plant species" },
            { k: "180+", v: "Resident & migratory birds" },
          ].map((s, i) => (
            <Reveal key={s.v} delay={i * 0.08}>
              <dt className="font-display text-[1.8rem] text-accent sm:text-[2.2rem]">{s.k}</dt>
              <dd className="mt-2 text-[0.95rem] leading-relaxed text-white/70">{s.v}</dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}

/* 3 ── The Communities ───────────────────────────────────────── */
export function Communities() {
  const peoples = [
    { name: "Samburu", note: "Pastoralists whose grazing calendars keep the highland pastures in rotation." },
    { name: "Rendille", note: "Camel herders of the lowlands, custodians of dry-season water etiquette." },
    { name: "Gabra", note: "Desert navigators whose oral maps record every spring and shade tree." },
    { name: "Turkana", note: "Fishers and herders bridging Lake Turkana and the mountain slopes." },
    { name: "El Molo", note: "Kenya's smallest Indigenous community, guardians of the lake shoreline." },
  ];
  return (
    <section className="relative overflow-hidden bg-background py-24 sm:py-32">
      <div className="container-x">
        <div className="max-w-2xl">
          <Reveal><span className="site-section-label">Chapter Three — The Communities</span></Reveal>
          <WordReveal as="h2" text="Five peoples, one mountain, a shared inheritance." className="site-section-title" />
          <BlurReveal delay={0.1}>
            <p className="site-section-intro">
              Conservation here is not a project imposed on a landscape. It is a negotiation between
              neighbours who have shared water, pasture and ceremony for centuries.
            </p>
          </BlurReveal>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {peoples.map((p, i) => (
            <Reveal key={p.name} delay={i * 0.07}>
              <article className="group h-full rounded-[1.6rem] border border-border/70 bg-card p-7 shadow-card transition-all duration-500 hover:-translate-y-1.5 hover:shadow-elegant">
                <h3 className="site-card-title font-display">{p.name}</h3>
                <p className="mt-3 site-card-copy">{p.note}</p>
                <span className="mt-6 block h-[2px] w-10 origin-left bg-accent transition-transform duration-500 group-hover:scale-x-[2.6]" />
              </article>
            </Reveal>
          ))}
          <Reveal delay={0.35}>
            <div className="relative h-full min-h-[190px] overflow-hidden rounded-[1.6rem] shadow-card">
              <img src={education} alt="A community learning session on Mount Kulal" loading="lazy" className="h-full w-full object-cover transition-transform duration-[1.4s] hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent" />
              <p className="absolute bottom-5 left-5 right-5 font-display text-[1.15rem] text-white">
                Every plan begins in a village meeting.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* 4 ── Why Biodiversity Matters ──────────────────────────────── */
export function Biodiversity() {
  const items = [
    { Icon: Droplets, t: "Water", d: "Cloud-forest canopy harvests mist into perennial springs serving thousands of households." },
    { Icon: Bird, t: "Species", d: "Endemic birds, reptiles and plants survive nowhere else on the planet." },
    { Icon: Sprout, t: "Soil", d: "Root systems hold volcanic soils that would otherwise gully into the desert." },
    { Icon: Users, t: "Livelihoods", d: "Honey, herbs, pasture and tourism income all begin under the canopy." },
  ];
  return (
    <section className="relative overflow-hidden bg-muted py-24 sm:py-32">
      <div className="container-x grid gap-14 lg:grid-cols-12 lg:gap-20">
        <div className="lg:col-span-5">
          <Reveal><span className="site-section-label">Chapter Four — Biodiversity</span></Reveal>
          <WordReveal as="h2" text="A forest is a water system wearing leaves." className="site-section-title" />
          <BlurReveal delay={0.1}>
            <p className="site-section-intro">
              Protecting Kulal's biodiversity is not sentiment. It is the most practical form of
              drought insurance northern Kenya has.
            </p>
          </BlurReveal>
        </div>
        <div className="lg:col-span-7">
          <div className="grid gap-4 sm:grid-cols-2">
            {items.map((it, i) => (
              <Reveal key={it.t} delay={i * 0.08}>
                <div className="group h-full rounded-[1.5rem] bg-card p-7 shadow-card transition-all duration-500 hover:-translate-y-1.5 hover:shadow-elegant">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-accent/15 text-primary transition-transform duration-500 group-hover:scale-110">
                    <it.Icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-5 font-display text-[1.25rem]">{it.t}</h3>
                  <p className="mt-2 site-card-copy">{it.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-20">
        <PanoramaStrip src={wildlife} alt="Wildlife of the Mount Kulal biosphere reserve" />
      </div>
    </section>
  );
}

/* 5 ── The Threats & The Restoration (journey timeline) ──────── */
export function ConservationJourney() {
  const milestones = [
    { year: "1971", t: "The elders organise", d: "Community members begin voluntary forest patrols and seasonal grazing agreements." },
    { year: "1979", t: "UNESCO recognition", d: "Mount Kulal is designated a Biosphere Reserve, validating decades of local stewardship." },
    { year: "1990s", t: "Pressure mounts", d: "Charcoal burning, drought and settlement expansion push the forest edge upslope." },
    { year: "2008", t: "Nurseries take root", d: "Community tree nurseries begin producing indigenous seedlings at scale." },
    { year: "2016", t: "Youth take the lead", d: "Formal youth conservation programme launches, training scouts and nursery managers." },
    { year: "2023", t: "International prize", d: "UNESCO-Greece Melina Mercouri International Prize honours the movement's cultural landscape work." },
  ];
  return (
    <section className="relative overflow-hidden bg-primary py-24 text-primary-foreground sm:py-32">
      <div className="container-x">
        <div className="max-w-2xl">
          <Reveal><span className="site-section-label">Chapter Five — The Journey</span></Reveal>
          <WordReveal as="h2" text="Fifty years of holding the line." className="site-section-title text-white" />
          <BlurReveal delay={0.1}>
            <p className="mt-6 text-[1.05rem] leading-[1.85] text-white/80">
              Threats came slowly and then quickly: charcoal, drought, unmanaged grazing, a changing
              climate. So did the response &mdash; patrols, nurseries, schools, and a generation that
              chose to stay.
            </p>
          </BlurReveal>
        </div>

        <ol className="relative mt-16 space-y-10 border-l border-white/20 pl-7 sm:pl-10">
          {milestones.map((m, i) => (
            <motion.li
              key={m.year}
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
              className="relative"
            >
              <span className="absolute -left-[38px] top-1.5 grid h-4 w-4 place-items-center rounded-full bg-accent sm:-left-[50px]" />
              <span className="font-display text-[1.6rem] text-accent">{m.year}</span>
              <h3 className="mt-1 font-display text-[1.25rem] text-white">{m.t}</h3>
              <p className="mt-2 max-w-2xl text-[1rem] leading-[1.8] text-white/75">{m.d}</p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* 6 ── UNESCO recognition ────────────────────────────────────── */
export function UnescoRecognition() {
  const { ref, y } = useParallax(["10%", "-10%"]);
  return (
    <section className="relative overflow-hidden bg-background py-24 sm:py-32">
      <div className="container-x grid gap-14 lg:grid-cols-12 lg:items-center lg:gap-20">
        <div ref={ref} className="order-2 lg:order-1 lg:col-span-6">
          <motion.div style={{ y }} className="overflow-hidden rounded-[2rem] shadow-elegant will-change-transform">
            <img src={winners} alt="Wazee wa Mazingira representatives receiving international recognition" loading="lazy" className="aspect-[5/4] w-full object-cover" />
          </motion.div>
        </div>
        <div className="order-1 lg:order-2 lg:col-span-6">
          <Reveal><span className="site-section-label">Chapter Six — Recognition</span></Reveal>
          <WordReveal as="h2" text="Honoured by UNESCO. Accountable to the community." className="site-section-title" />
          <BlurReveal delay={0.1}>
            <p className="site-section-intro">
              The UNESCO-Greece Melina Mercouri International Prize for the Safeguarding and
              Management of Cultural Landscapes recognises places where people and nature have
              shaped one another well. For Mount Kulal, it confirmed what the elders always argued:
              culture and conservation are the same work.
            </p>
          </BlurReveal>
          <Reveal delay={0.2}>
            <Link to="/awards" className="group mt-8 inline-flex items-center gap-2 text-[0.98rem] font-semibold text-primary">
              See the recognition
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* 7 ── Impact statistics ─────────────────────────────────────── */
export function ImpactBand() {
  const stats = [
    { n: 42000, s: "+", l: "Indigenous seedlings planted" },
    { n: 18, s: "", l: "Villages in the conservation network" },
    { n: 640, s: "+", l: "Youth trained as conservation scouts" },
    { n: 12, s: "", l: "Springs protected and restored" },
  ];
  return (
    <section className="relative overflow-hidden bg-earth py-20 text-earth-foreground sm:py-28">
      <div className="container-x">
        <Reveal>
          <h2 className="max-w-2xl font-display text-[2rem] leading-tight sm:text-[2.6rem]">
            The measurable side of a fifty-year promise.
          </h2>
        </Reveal>
        <div className="mt-14 grid grid-cols-2 gap-10 lg:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.l} delay={i * 0.08}>
              <div>
                <span className="font-display text-[2.4rem] leading-none sm:text-[3.2rem]">
                  <Counter to={s.n} suffix={s.s} />
                </span>
                <p className="mt-3 text-[0.95rem] leading-relaxed opacity-85">{s.l}</p>
                <motion.span
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.1, delay: 0.2 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  className="mt-5 block h-[3px] w-full origin-left bg-accent/80"
                />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* 8 ── The Youth ─────────────────────────────────────────────── */
export function TheYouth() {
  return (
    <section className="relative overflow-hidden bg-background">
      <ScrollExpandImage
        src={youth}
        alt="Young people planting indigenous seedlings on Mount Kulal"
        caption="Youth scouts planting indigenous seedlings above Gatab."
        height="h-[60svh] md:h-[86svh]"
      />
      <div className="container-x py-20 sm:py-28">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-5">
            <Reveal><span className="site-section-label">Chapter Seven — The Youth</span></Reveal>
            <WordReveal as="h2" text="The next fifty years are already being trained." className="site-section-title" />
          </div>
          <div className="lg:col-span-7">
            <BlurReveal>
              <p className="site-section-copy text-[1.08rem]">
                Young people on Kulal face a choice made in every dryland community: leave for the
                city, or find a future in the landscape that raised you. Our youth programme makes
                the second option real &mdash; nursery management, forest monitoring, beekeeping,
                eco-guiding, digital mapping and climate advocacy, taught alongside elders who carry
                the ecological memory of the mountain.
              </p>
            </BlurReveal>
            <BlurReveal delay={0.15}>
              <p className="mt-5 site-section-copy">
                Every scout trained is a household that stays, a ridge that gets walked, and a
                tradition that survives one more generation.
              </p>
            </BlurReveal>
            <Reveal delay={0.25}>
              <Link to="/register" className="site-button-primary mt-9">
                Join the youth programme <ArrowRight className="h-4 w-4" />
              </Link>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

/* 9 ── Latest stories (blog teaser) ─────────────────────────── */
export function LatestStories() {
  const featured = posts.slice(0, 3);
  return (
    <section className="relative overflow-hidden bg-muted py-24 sm:py-32">
      <div className="container-x">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-xl">
            <Reveal><span className="site-section-label">Journal</span></Reveal>
            <WordReveal as="h2" text="Stories from the mountain." className="site-section-title" />
          </div>
          <Reveal>
            <Link to="/blog" className="group inline-flex items-center gap-2 text-[0.98rem] font-semibold text-primary">
              All stories
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
            </Link>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-7 md:grid-cols-3">
          {featured.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.08}>
              <Link
                to="/blog/$slug"
                params={{ slug: p.slug }}
                className="group block h-full overflow-hidden rounded-[1.6rem] bg-card shadow-card transition-all duration-500 hover:-translate-y-2 hover:shadow-elegant"
              >
                <div className="aspect-[16/10] overflow-hidden">
                  <img src={p.image} alt={p.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-[1.4s] group-hover:scale-110" />
                </div>
                <div className="p-7">
                  <span className="text-[0.75rem] font-semibold uppercase tracking-[0.2em] text-accent">{p.category}</span>
                  <h3 className="mt-3 font-display text-[1.28rem] leading-snug">{p.title}</h3>
                  <p className="mt-3 site-card-copy line-clamp-3">{p.excerpt}</p>
                  <p className="mt-5 text-[0.85rem] text-muted-foreground">{p.date} · {p.readingTime} min read</p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* 10 ── Partners ─────────────────────────────────────────────── */
export function Partners() {
  const names = ["UNESCO", "Man and the Biosphere", "Kenya Forest Service", "Marsabit County", "NEMA Kenya", "Community Trust Fund"];
  return (
    <section className="border-y border-border/60 bg-background py-16">
      <div className="container-x">
        <Reveal>
          <p className="text-center text-[0.78rem] font-semibold uppercase tracking-[0.28em] text-muted-foreground">
            Working alongside
          </p>
        </Reveal>
        <div className="mt-9 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6">
          {names.map((n, i) => (
            <Reveal key={n} delay={i * 0.05}>
              <div className="grid h-16 place-items-center rounded-xl border border-border/60 bg-card px-4 text-center font-display text-[0.98rem] text-foreground/70 transition-colors duration-300 hover:text-primary">
                {n}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* 11 ── The Future / Support ─────────────────────────────────── */
export function TheFuture() {
  const ways = [
    { Icon: Sprout, t: "Fund a nursery", d: "KSh 5,000 raises 500 indigenous seedlings through a full season." },
    { Icon: ShieldCheck, t: "Support a scout", d: "Equip a youth forest scout with boots, GPS and monthly stipend." },
    { Icon: Flame, t: "Fight forest fire", d: "Back the community fire-response teams during the long dry months." },
  ];
  return (
    <section className="relative overflow-hidden bg-primary py-24 text-primary-foreground sm:py-32">
      <div className="absolute inset-0 opacity-25">
        <img src={canopy} alt="" aria-hidden="true" className="h-full w-full object-cover" loading="lazy" />
      </div>
      <div className="container-x relative">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal><span className="site-section-label">Chapter Nine — How you can help</span></Reveal>
          <WordReveal as="h2" text="The mountain has kept its promise. Help us keep ours." className="site-section-title text-white" />
        </div>
        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {ways.map((w, i) => (
            <Reveal key={w.t} delay={i * 0.08}>
              <div className="group h-full rounded-[1.6rem] border border-white/15 bg-white/10 p-7 backdrop-blur-md transition-all duration-500 hover:-translate-y-1.5 hover:bg-white/15">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-accent text-accent-foreground transition-transform duration-500 group-hover:scale-110">
                  <w.Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-5 font-display text-[1.25rem] text-white">{w.t}</h3>
                <p className="mt-2 text-[1rem] leading-[1.8] text-white/75">{w.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.25}>
          <div className="mt-12 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <button
              onClick={() => window.dispatchEvent(new Event("openDonationModal"))}
              className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent px-8 py-4 text-[0.98rem] font-semibold text-accent-foreground shadow-elegant transition-all duration-300 hover:-translate-y-0.5 sm:w-auto"
            >
              Donate to conservation
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
            </button>
            <Link
              to="/contact"
              className="inline-flex w-full items-center justify-center rounded-full border border-white/30 bg-white/10 px-8 py-4 text-[0.98rem] font-semibold text-white backdrop-blur-md transition-colors hover:bg-white/20 sm:w-auto"
            >
              Partner with us
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
