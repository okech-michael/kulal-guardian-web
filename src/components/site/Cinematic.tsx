import { motion, useScroll, useTransform, useSpring, type MotionValue } from "motion/react";
import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/* ---------------------------------------------------------------- */
/* Scroll progress bar (sticky reading / section indicator)          */
/* ---------------------------------------------------------------- */
export function ScrollProgress({ className }: { className?: string }) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });
  return (
    <motion.div
      style={{ scaleX }}
      className={cn(
        "fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-accent",
        className,
      )}
    />
  );
}

/* ---------------------------------------------------------------- */
/* Word-by-word editorial headline reveal                            */
/* ---------------------------------------------------------------- */
export function WordReveal({
  text,
  className,
  delay = 0,
  as: Tag = "h2",
}: {
  text: string;
  className?: string;
  delay?: number;
  as?: "h1" | "h2" | "h3" | "p";
}) {
  const words = text.split(" ");
  return (
    <Tag className={className}>
      {words.map((w, i) => (
        <span key={`${w}-${i}`} className="inline-block overflow-hidden align-bottom">
          <motion.span
            className="inline-block"
            initial={{ y: "110%", opacity: 0 }}
            whileInView={{ y: "0%", opacity: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.85, delay: delay + i * 0.045, ease: [0.16, 1, 0.3, 1] }}
          >
            {w}
            {i < words.length - 1 ? "\u00A0" : ""}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}

/* ---------------------------------------------------------------- */
/* Blur-in reveal                                                    */
/* ---------------------------------------------------------------- */
export function BlurReveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24, filter: "blur(14px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-70px" }}
      transition={{ duration: 1, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ---------------------------------------------------------------- */
/* Scroll-driven image expansion: image grows out of its container   */
/* toward full-bleed as the visitor scrolls through it.              */
/* ---------------------------------------------------------------- */
export function ScrollExpandImage({
  src,
  alt,
  caption,
  className,
  height = "h-[70svh] md:h-[92svh]",
  startRadius = 40,
  startInset = 8,
}: {
  src: string;
  alt: string;
  caption?: string;
  className?: string;
  height?: string;
  startRadius?: number;
  startInset?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] });
  const inset = useTransform(scrollYProgress, [0, 1], [`${startInset}%`, "0%"]);
  const radius = useTransform(scrollYProgress, [0, 1], [`${startRadius}px`, "0px"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.18, 1]);
  const overlay = useTransform(scrollYProgress, [0, 1], [0.55, 0.18]);

  return (
    <figure ref={ref} className={cn("relative w-full overflow-hidden", height, className)}>
      <motion.div
        style={{ left: inset, right: inset, borderRadius: radius }}
        className="absolute inset-y-0 overflow-hidden will-change-transform"
      >
        <motion.img
          src={src}
          alt={alt}
          loading="lazy"
          style={{ scale }}
          className="h-full w-full object-cover will-change-transform"
        />
        <motion.div style={{ opacity: overlay }} className="absolute inset-0 bg-primary" />
      </motion.div>
      {caption && (
        <figcaption className="pointer-events-none absolute bottom-6 left-0 right-0">
          <div className="container-x">
            <span className="inline-block max-w-xl rounded-full bg-black/35 px-4 py-2 text-[0.85rem] tracking-wide text-white backdrop-blur-md">
              {caption}
            </span>
          </div>
        </figcaption>
      )}
    </figure>
  );
}

/* ---------------------------------------------------------------- */
/* Panoramic horizontal drift on scroll                              */
/* ---------------------------------------------------------------- */
export function PanoramaStrip({
  src,
  alt,
  height = "h-[46svh] md:h-[62svh]",
}: {
  src: string;
  alt: string;
  height?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const x = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  return (
    <div ref={ref} className={cn("relative w-full overflow-hidden", height)}>
      <motion.img
        src={src}
        alt={alt}
        loading="lazy"
        style={{ x }}
        className="h-full w-[125%] max-w-none object-cover will-change-transform"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-primary/30" />
    </div>
  );
}

/* ---------------------------------------------------------------- */
/* Parallax helper for arbitrary content                             */
/* ---------------------------------------------------------------- */
export function useParallax(range: [string, string] = ["-10%", "10%"]): {
  ref: React.RefObject<HTMLDivElement | null>;
  y: MotionValue<string>;
} {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], range);
  return { ref, y };
}

/* ---------------------------------------------------------------- */
/* Soft curved transition between sections                           */
/* ---------------------------------------------------------------- */
export function SectionCurve({
  fill = "text-background",
  flip = false,
  className,
}: {
  fill?: string;
  flip?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("pointer-events-none relative -mt-px w-full leading-none", className)}>
      <svg
        viewBox="0 0 1440 90"
        preserveAspectRatio="none"
        className={cn("block h-[52px] w-full md:h-[80px]", fill, flip && "rotate-180")}
        aria-hidden="true"
      >
        <path d="M0,90 C360,10 1080,10 1440,90 L1440,90 L0,90 Z" fill="currentColor" />
      </svg>
    </div>
  );
}

/* ---------------------------------------------------------------- */
/* Atmosphere: drifting mist + floating particles (pure CSS/motion)  */
/* ---------------------------------------------------------------- */
export function Atmosphere({ particles = 18 }: { particles?: number }) {
  const seeds = Array.from({ length: particles }, (_, i) => i);
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {/* drifting fog bands */}
      <motion.div
        className="absolute -left-1/4 top-[45%] h-[38%] w-[150%] rounded-full bg-white/12 blur-3xl"
        animate={{ x: ["-6%", "6%", "-6%"] }}
        transition={{ duration: 34, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -right-1/4 top-[62%] h-[30%] w-[140%] rounded-full bg-white/10 blur-3xl"
        animate={{ x: ["5%", "-5%", "5%"] }}
        transition={{ duration: 44, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* sunlight bloom */}
      <motion.div
        className="absolute -top-[18%] right-[8%] h-[46vh] w-[46vh] rounded-full bg-[radial-gradient(circle,rgba(255,236,190,0.55),transparent_65%)] blur-2xl"
        animate={{ opacity: [0.5, 0.85, 0.5], scale: [1, 1.08, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* floating particles */}
      {seeds.map((i) => {
        const left = (i * 37) % 100;
        const size = 2 + (i % 4);
        const dur = 14 + (i % 7) * 3;
        return (
          <motion.span
            key={i}
            className="absolute rounded-full bg-white/60"
            style={{ left: `${left}%`, top: `${(i * 53) % 100}%`, width: size, height: size }}
            animate={{ y: [0, -90, 0], x: [0, (i % 2 ? 24 : -24), 0], opacity: [0, 0.8, 0] }}
            transition={{ duration: dur, repeat: Infinity, delay: i * 0.7, ease: "easeInOut" }}
          />
        );
      })}
    </div>
  );
}
