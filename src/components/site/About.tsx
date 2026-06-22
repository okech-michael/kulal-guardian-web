import { Reveal } from "./Reveal";
import { Compass, Target, HeartHandshake } from "lucide-react";
import sapling from "@/assets/sapling.jpg";
import elders from "@/assets/community-elders.jpg";

export function About() {
  return (
    <section id="about" className="relative bg-background py-24 sm:py-32">
      <div className="container-x">
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-5">
            <Reveal>
              <span className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">
                About the Organisation
              </span>
              <h2 className="mt-4 font-display text-4xl text-balance sm:text-5xl">
                A movement rooted in the highlands of Marsabit.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                For generations, the elders of the Mount Kulal region have been the silent
                guardians of one of Kenya&rsquo;s most fragile and biodiverse landscapes.
                Wazee wa Mazingira &mdash; &ldquo;Elders of the Environment&rdquo; &mdash;
                carries that legacy forward, uniting indigenous stewardship with modern
                conservation science to protect forests, water sources, and the communities
                that depend on them.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-5 text-base leading-relaxed text-muted-foreground">
                We work alongside pastoralist families, schools, and youth across the Gabra,
                Rendille and Samburu communities to restore degraded ecosystems, champion
                biodiversity, and create dignified livelihoods grounded in the land.
              </p>
            </Reveal>

            <div className="mt-10 grid gap-5 sm:grid-cols-1">
              {[
                { icon: Target, title: "Our Mission", body: "To protect the ecological integrity of Mount Kulal and empower communities to lead sustainable, dignified lives." },
                { icon: Compass, title: "Our Vision", body: "A thriving, resilient Mount Kulal ecosystem stewarded by empowered communities for generations to come." },
                { icon: HeartHandshake, title: "Our Values", body: "Indigenous wisdom · Integrity · Community leadership · Stewardship · Inclusion of women and youth." },
              ].map((v, i) => (
                <Reveal key={v.title} delay={0.25 + i * 0.08}>
                  <div className="group flex gap-4 rounded-2xl border border-border/70 bg-card p-5 transition-all hover:border-accent/40 hover:shadow-card">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-secondary text-primary">
                      <v.icon className="h-5 w-5" />
                    </span>
                    <div className="min-w-0">
                      <h3 className="font-display text-lg">{v.title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{v.body}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="grid grid-cols-2 gap-4 sm:gap-6">
              <Reveal className="col-span-2">
                <div className="overflow-hidden rounded-3xl shadow-card">
                  <img src={elders} alt="Community elders and women gathered for a conservation meeting" loading="lazy" className="aspect-[16/10] w-full object-cover transition-transform duration-[1.4s] hover:scale-105" />
                </div>
              </Reveal>
              <Reveal delay={0.1}>
                <div className="overflow-hidden rounded-3xl shadow-card">
                  <img src={sapling} alt="Hands holding an indigenous tree sapling" loading="lazy" className="aspect-[3/4] w-full object-cover transition-transform duration-[1.4s] hover:scale-105" />
                </div>
              </Reveal>
              <Reveal delay={0.2}>
                <div className="flex h-full flex-col justify-between rounded-3xl bg-primary p-6 text-primary-foreground shadow-elegant">
                  <p className="font-display text-3xl leading-tight">
                    &ldquo;The mountain feeds us. Now we rise to protect her.&rdquo;
                  </p>
                  <div className="mt-6 text-sm text-primary-foreground/80">
                    &mdash; A Gabra elder, Mount Kulal
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
