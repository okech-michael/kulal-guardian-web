import { Award, Medal, Globe2 } from "lucide-react";
import { Reveal } from "./Reveal";
import winners from "@/assets/winners.jpeg";

const timeline = [
  { year: "2025 · November 7", icon: Award, title: "UNESCO-Greece Melina Mercouri International Prize", body: "USD 30,000 award for Safeguarding and Management of Cultural Landscapes, recognising community stewardship of Mount Kulal." },
  { year: "2024", icon: Globe2, title: "National Environmental Recognition", body: "Honoured by the Ministry of Environment for outstanding contribution to indigenous forest conservation." },
  { year: "2023", icon: Medal, title: "County Conservation Partnership", body: "Marsabit County Government partnership for community-led ecosystem restoration." },
  { year: "2022", icon: Award, title: "Community Stewardship Award", body: "Recognised by regional conservation network for grassroots leadership and biodiversity work." },
];

export function Awards() {
  return (
    <section id="awards" className="relative bg-beige/60 py-24 sm:py-32">
      <div className="container-x">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <span className="site-section-label">
              Awards &amp; Recognition
            </span>
            <h2 className="site-section-title">
              Recognised on the world stage. Grounded in community.
            </h2>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <div className="mt-14 overflow-hidden rounded-3xl bg-gradient-to-br from-primary to-primary/85 p-8 text-primary-foreground shadow-elegant sm:p-12">
            <div className="grid items-center gap-10 md:grid-cols-12">
              <div className="md:col-span-3">
                <div className="relative mx-auto aspect-square w-44 overflow-hidden rounded-full border-4 border-accent/40 bg-accent/10">
                  <img src={winners} alt="Award winners" className="absolute inset-0 h-full w-full object-cover" />
                </div>
              </div>
              <div className="md:col-span-9">
                <span className="site-section-label text-accent">
                  Featured Award · November 2025
                </span>
                <h3 className="mt-3 font-display text-[1.8rem] text-balance sm:text-[2.3rem]">
                  UNESCO-Greece Melina Mercouri International Prize
                </h3>
                <p className="mt-4 text-[1.03rem] leading-[1.8] text-primary-foreground/85">
                  USD 30,000 prize for the Safeguarding and Management of Cultural Landscapes &mdash;
                  one of the most prestigious international honours for community-led
                  conservation, awarded jointly by UNESCO and the Government of Greece.
                </p>
              </div>
            </div>
          </div>
        </Reveal>

        <div className="relative mt-20">
          <div className="absolute left-4 top-2 bottom-2 w-px bg-border md:left-1/2 md:-translate-x-1/2" />
          <div className="space-y-12">
            {timeline.map((t, i) => (
              <Reveal key={t.year} delay={i * 0.06}>
                <div className={`relative grid gap-4 md:grid-cols-2 ${i % 2 ? "md:[&>*:first-child]:col-start-2" : ""}`}>
                  <div className="absolute left-4 top-3 grid h-3 w-3 -translate-x-1/2 place-items-center rounded-full bg-accent ring-4 ring-background md:left-1/2" />
                  <div className={`pl-12 md:pl-0 ${i % 2 ? "md:pr-12 md:text-right" : "md:pl-12"}`}>
                    <div className="inline-flex items-center gap-2 rounded-full bg-card px-3 py-1.5 text-[0.95rem] font-semibold text-primary shadow-sm">
                      <t.icon className="h-3.5 w-3.5" />
                      {t.year}
                    </div>
                    <h4 className="mt-3 site-card-title">{t.title}</h4>
                    <p className="mt-2 site-card-copy">{t.body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
