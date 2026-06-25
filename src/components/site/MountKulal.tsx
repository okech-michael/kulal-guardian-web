import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { Reveal } from "./Reveal";
import landscape from "@/assets/kulal-landscape.jpg";
import canopy from "@/assets/forest-canopy.jpg";

export function MountKulal() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);
  const fgY = useTransform(scrollYProgress, [0, 1], ["20%", "-20%"]);

  return (
    <section ref={ref} id="mount-kulal" className="relative overflow-hidden bg-primary text-primary-foreground">
      <motion.div style={{ y: bgY }} className="absolute inset-0 will-change-transform">
        <img src={landscape} alt="Mount Kulal rising above the arid plains of Marsabit County" loading="lazy" className="h-full w-full object-cover opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/70 via-primary/40 to-primary" />
      </motion.div>

      <div className="container-x relative grid gap-12 py-28 sm:py-36 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-6">
          <Reveal>
            <span className="site-section-label">
              The Sacred Mountain
            </span>
            <h2 className="site-section-title text-white">
              Mount Kulal &mdash; a living biosphere reserve.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 text-[1.06rem] leading-[1.8] text-white/85 sm:text-[1.18rem]">
              Rising more than 2,300 metres above the Chalbi desert, Mount Kulal is a
              UNESCO-designated Biosphere Reserve and an ecological island. Since UNESCO
              first arrived in the 1970s, Wazee wa Mazingira has helped sustain its montane
              cloud forest, which captures moisture from the air, feeds springs that sustain
              entire pastoralist communities, and shelters species found nowhere else on Earth.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-5 text-[1.01rem] leading-[1.8] text-white/75">
              For the Gabra, Rendille, Turkana, Elmolo and Samburu peoples, Kulal is sacred
              ground &mdash; the source of life, story, and identity. Protecting it is not an
              environmental choice; it is a cultural inheritance.
            </p>
          </Reveal>

          <Reveal delay={0.3}>
            <dl className="mt-10 grid grid-cols-2 gap-6 border-t border-white/20 pt-8">
              {[
                { k: "2,335 m", v: "Peak elevation" },
                { k: "1979", v: "Designated Biosphere Reserve" },
                { k: "700+", v: "Documented plant species" },
                { k: "180+", v: "Resident & migratory birds" },
              ].map((s) => (
                <div key={s.v}>
                  <dt className="font-display text-[1.7rem] text-accent sm:text-[2rem]">{s.k}</dt>
                  <dd className="mt-1 text-[0.95rem] text-white/70">{s.v}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        <div className="lg:col-span-6">
          <motion.div style={{ y: fgY }} className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl shadow-elegant will-change-transform">
            <img src={canopy} alt="Misty ancient forest canopy on Mount Kulal" loading="lazy" className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
