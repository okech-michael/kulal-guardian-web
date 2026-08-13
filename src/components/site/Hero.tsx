import { motion, useScroll, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, ChevronDown } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Atmosphere } from "./Cinematic";
import hero from "@/assets/hero-mount-kulal.jpg";
import canopy from "@/assets/forest-canopy.jpg";

export function Hero() {
  const [mounted, setMounted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  // layered depth: background mountain slow, mid fog, foreground canopy fast
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.06, 1.3]);
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const midY = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const fgY = useTransform(scrollYProgress, [0, 1], [0, 280]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const opacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section
      ref={ref}
      id="top"
      className="relative h-[100svh] min-h-[660px] w-full overflow-hidden bg-primary"
    >
      {/* Layer 1 - the mountain */}
      <motion.div style={{ scale: bgScale, y: bgY }} className="absolute inset-0 will-change-transform">
        <img
          src={hero}
          alt="Mount Kulal at sunrise, an ancient forested mountain rising above Marsabit, Kenya"
          className="h-full w-full object-cover"
          fetchPriority="high"
        />
      </motion.div>

      {/* Layer 2 - atmosphere: mist, sunlight, particles */}
      <motion.div style={{ y: midY }} className="absolute inset-0 will-change-transform">
        <Atmosphere particles={22} />
      </motion.div>

      {/* Layer 3 - foreground canopy silhouette for depth */}
      <motion.div
        style={{ y: fgY }}
        className="pointer-events-none absolute -bottom-16 left-0 right-0 h-[42%] will-change-transform"
        aria-hidden="true"
      >
        <img
          src={canopy}
          alt=""
          className="h-full w-full object-cover opacity-70 [mask-image:linear-gradient(to_top,black_25%,transparent_92%)]"
        />
        <div className="absolute inset-0 bg-primary/70 [mask-image:linear-gradient(to_top,black_30%,transparent_95%)]" />
      </motion.div>

      {/* Cinematic grading */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/20 to-black/85" />
      <div className="absolute inset-0 bg-gradient-to-t from-primary/75 via-transparent to-transparent" />

      <motion.div
        style={{ opacity, y: contentY }}
        className="relative z-10 flex h-full items-end pb-24 sm:pb-28 md:items-center md:pb-0"
      >
        <div className="container-x">
          <div className="max-w-3xl">
            <motion.h1
              initial={mounted ? { opacity: 0, y: 30, filter: "blur(12px)" } : undefined}
              animate={mounted ? { opacity: 1, y: 0, filter: "blur(0px)" } : undefined}
              transition={{ duration: 1.2, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="mt-6 font-display text-[2.3rem] leading-[1.03] text-white text-balance sm:mt-8 sm:text-[3rem] md:text-[3.8rem] lg:text-[4.4rem]"
            >
              A mountain that makes rain.<br />
              A people who <span className="italic text-accent">keep it alive</span>.
            </motion.h1>

            <motion.p
              initial={mounted ? { opacity: 0, y: 20 } : undefined}
              animate={mounted ? { opacity: 1, y: 0 } : undefined}
              transition={{ duration: 0.9, delay: 0.6 }}
              className="mt-7 max-w-2xl text-[1.06rem] leading-[1.8] text-white/85 sm:mt-8 sm:text-[1.18rem]"
            >
              For over fifty years, Wazee wa Mazingira, the Elders of the Environment,
              have guarded the cloud forest of Mount Kulal: its springs, its wildlife, and the
              pastoralist cultures that have read this landscape for generations. This is their story.
            </motion.p>

            <motion.div
              initial={mounted ? { opacity: 0, y: 20 } : undefined}
              animate={mounted ? { opacity: 1, y: 0 } : undefined}
              transition={{ duration: 0.9, delay: 0.8 }}
              className="mt-8 flex flex-col items-stretch gap-2.5 sm:mt-9 sm:flex-row sm:flex-wrap sm:items-center sm:gap-3"
            >
              <button
                onClick={() => window.dispatchEvent(new Event("openDonationModal"))}
                className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent px-7 py-3.5 text-[0.95rem] font-semibold text-accent-foreground shadow-elegant transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_24px_50px_-18px_rgba(0,0,0,0.6)] sm:w-auto"
              >
                Protect the forest
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
              </button>
              <Link
                to="/register"
                className="group inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/30 bg-white/10 px-7 py-3.5 text-[0.95rem] font-semibold text-white backdrop-blur-md transition-all duration-300 hover:bg-white/20 sm:w-auto"
              >
                Join our youth programme
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
        className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-center text-white/70"
      >
        <span className="block text-[0.68rem] uppercase tracking-[0.32em]">Begin the journey</span>
        <ChevronDown className="mx-auto mt-2 h-6 w-6 animate-bounce" aria-hidden="true" />
      </motion.div>
    </section>
  );
}
