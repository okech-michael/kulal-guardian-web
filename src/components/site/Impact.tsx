import { Reveal } from "./Reveal";
import { Counter } from "./Counter";
import { Trees, Users, Sprout, GraduationCap, Droplets, Bird } from "lucide-react";

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
  { value: 18, suffix: "", label: "Villages engaged" },
  { value: 2500, suffix: "+", label: "Youth mobilised" },
  { value: 50, suffix: "", label: "Years on the ground" },
];

export function Impact() {
  return (
    <section id="impact" className="relative overflow-hidden bg-muted/60 py-24 sm:py-32">
      <div className="container-x">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <span className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">
              Our Impact
            </span>
            <h2 className="mt-4 font-display text-4xl text-balance sm:text-5xl">
              Conservation that is lived, not lectured.
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
              Six interlocking pillars of work that protect Mount Kulal&rsquo;s ecosystem
              while improving the lives of the people who call it home.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {pillars.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.06}>
              <div className="group relative h-full overflow-hidden rounded-3xl border border-border/70 bg-card p-7 transition-all duration-500 hover:-translate-y-1 hover:border-accent/40 hover:shadow-elegant">
                <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-primary text-primary-foreground transition-transform duration-500 group-hover:scale-110">
                  <p.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-5 font-display text-xl">{p.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2}>
          <div className="mt-20 grid gap-y-10 gap-x-6 rounded-3xl bg-primary px-6 py-12 text-primary-foreground shadow-elegant sm:grid-cols-2 sm:px-10 lg:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <div className="font-display text-5xl text-accent sm:text-6xl">
                  <Counter to={s.value} suffix={s.suffix} />
                </div>
                <div className="mt-2 text-sm uppercase tracking-wider text-primary-foreground/75">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
