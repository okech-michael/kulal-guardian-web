import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { ArrowRight, ChevronDown } from "lucide-react";
import hero from "@/assets/hero-mount-kulal.jpg";

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 1], [1.05, 1.25]);
  const y = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} id="top" className="relative h-[100svh] min-h-[640px] w-full overflow-hidden bg-primary">
      <motion.div style={{ scale, y }} className="absolute inset-0 will-change-transform">
        <img
          src={hero}
          alt="Mount Kulal at sunrise — ancient forested mountain in Marsabit, Kenya"
          className="h-full w-full object-cover"
          fetchPriority="high"
        />
      </motion.div>

      {/* Layered gradients */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/25 to-black/80" />
      <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-transparent to-transparent" />

      <motion.div style={{ opacity }} className="relative z-10 flex h-full items-end pb-24 sm:pb-28 md:items-center md:pb-0">
        <div className="container-x">
          <div className="max-w-3xl">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-white backdrop-blur-md"
            >
              Community-Based Organisation · Marsabit, Kenya
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="mt-6 font-display text-4xl leading-[1.05] text-white text-balance sm:text-5xl md:text-6xl lg:text-7xl"
            >
              Protecting Mount Kulal.<br />
              <span className="italic text-accent">Empowering</span> Communities.<br />
              Preserving Nature.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.6 }}
              className="mt-6 max-w-2xl text-base leading-relaxed text-white/85 sm:text-lg"
            >
              Wazee wa Mazingira is a grassroots conservation movement safeguarding the sacred
              forests, biodiversity, and pastoralist heritage of Mount Kulal — through youth
              leadership, indigenous knowledge, and sustainable community development.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.8 }}
              className="mt-9 flex flex-wrap items-center gap-3"
            >
              <a
                href="#register"
                className="group inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3.5 text-sm font-semibold text-accent-foreground shadow-elegant transition-transform hover:scale-[1.03]"
              >
                Join Our Youth Program
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href="#impact"
                className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-md transition-colors hover:bg-white/20"
              >
                Explore Our Work
              </a>
            </motion.div>
          </div>
        </div>
      </motion.div>

      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
        className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-white/70 hover:text-white"
        aria-label="Scroll down"
      >
        <ChevronDown className="h-7 w-7 animate-bounce" />
      </motion.a>
    </section>
  );
}
