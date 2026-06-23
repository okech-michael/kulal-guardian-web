import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Reveal } from "./Reveal";
import { ChevronDown } from "lucide-react";
import youth from "@/assets/youth-planting.jpeg";
import wildlife from "@/assets/wildlife.jpg";
import education from "@/assets/education.jpeg";
import elders from "@/assets/community-elders.jpeg";
import officeLaunch from "@/assets/office-launch.jpeg";

const projects = [
  {
    img: youth,
    tag: "Reforestation",
    title: "Kulal Indigenous Tree Initiative",
    summary: "Restoring 50 hectares of degraded forest with indigenous species nurtured by local women&rsquo;s groups.",
    details: "Working with three village nurseries, the programme has raised over 42,000 indigenous seedlings — Olea africana, Juniperus procera, and Hagenia abyssinica — for planting in the Kulal catchment. Survival rates exceed 78% thanks to community-led monitoring."
  },
  {
    img: officeLaunch,
    tag: "Office",
    title: "Community Office Launch",
    summary: "A dedicated office space to coordinate Kulal conservation, outreach and local partnership work.",
    details: "The new office provides a central hub for staff, volunteer meetings and community planning sessions. It supports efficient project delivery and strengthens our presence in Marsabit County."
  },
  {
    img: wildlife,
    tag: "Biodiversity",
    title: "Kulal Wildlife Watch",
    summary: "Citizen-science monitoring of birds, mammals and pollinators across the Kulal ecosystem.",
    details: "Trained community rangers conduct quarterly transects, contributing data to national biodiversity databases. The programme has documented the return of greater kudu and three previously unrecorded bird species."
  },
  {
    img: education,
    tag: "Education",
    title: "Green Schools of Kulal",
    summary: "Environmental clubs in 14 primary and secondary schools across Loiyangalani, Gatab and Kargi wards.",
    details: "Curriculum-integrated lessons, school tree nurseries, and an annual inter-school conservation festival. Over 3,200 learners reached since inception."
  },
  {
    img: elders,
    tag: "Community",
    title: "Elders & Indigenous Knowledge",
    summary: "Documenting traditional ecological knowledge and embedding it in modern conservation planning.",
    details: "We convene quarterly elders&rsquo; councils to record indigenous practices for grazing, water management and forest taboos &mdash; ensuring this knowledge informs every project we run."
  },
];

export function Projects() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="projects" className="bg-background py-24 sm:py-32">
      <div className="container-x">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <Reveal>
            <span className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">
              Projects &amp; Programs
            </span>
            <h2 className="mt-4 max-w-2xl font-display text-4xl text-balance sm:text-5xl">
              Work that takes root in the soil and the soul of Kulal.
            </h2>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {projects.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.08}>
              <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-border/70 bg-card transition-all hover:-translate-y-1 hover:shadow-elegant">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img src={p.img} alt={p.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-[1.4s] group-hover:scale-110" />
                  <span className="absolute left-4 top-4 rounded-full bg-accent px-3 py-1 text-xs font-semibold uppercase tracking-wider text-accent-foreground">
                    {p.tag}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-7">
                  <h3 className="font-display text-2xl">{p.title}</h3>
                  <p
                    className="mt-3 text-sm leading-relaxed text-muted-foreground"
                    dangerouslySetInnerHTML={{ __html: p.summary }}
                  />
                  <button
                    onClick={() => setOpen(open === i ? null : i)}
                    className="mt-5 inline-flex items-center gap-1.5 self-start text-sm font-semibold text-primary hover:text-accent"
                    aria-expanded={open === i}
                  >
                    {open === i ? "Show less" : "Read more"}
                    <ChevronDown className={`h-4 w-4 transition-transform ${open === i ? "rotate-180" : ""}`} />
                  </button>
                  <AnimatePresence initial={false}>
                    {open === i && (
                      <motion.p
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        className="mt-4 overflow-hidden text-sm leading-relaxed text-muted-foreground"
                      >
                        {p.details}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
