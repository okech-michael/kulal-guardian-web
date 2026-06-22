import { Reveal } from "./Reveal";
import { ArrowRight } from "lucide-react";
import youth from "@/assets/youth-planting.jpg";

export function CallToAction() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0">
        <img src={youth} alt="" loading="lazy" className="h-full w-full object-cover" aria-hidden />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/80 to-primary/60" />
      </div>
      <div className="container-x relative py-28 sm:py-40">
        <div className="max-w-3xl text-primary-foreground">
          <Reveal>
            <h2 className="font-display text-4xl text-balance text-white sm:text-5xl md:text-6xl">
              The future of Mount Kulal is written by hands that protect it.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 text-lg leading-relaxed text-white/85">
              Become a partner, a donor, a youth volunteer, or simply an advocate.
              Every story of Kulal&rsquo;s renewal begins with a single step.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mt-9 flex flex-wrap gap-3">
              <a href="#register" className="group inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3.5 text-sm font-semibold text-accent-foreground shadow-elegant transition-transform hover:scale-[1.03]">
                Join Us
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
              <a href="#contact" className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-md hover:bg-white/20">
                Contact Us
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
