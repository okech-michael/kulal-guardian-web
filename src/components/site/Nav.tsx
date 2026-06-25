import { useEffect, useState } from "react";
import { Menu, X, Leaf } from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  { href: "#about", label: "About" },
  { href: "#impact", label: "Impact" },
  { href: "#mount-kulal", label: "Mount Kulal" },
  { href: "#projects", label: "Projects" },
  { href: "#awards", label: "Awards" },
  { href: "#gallery", label: "Gallery" },
  { href: "#contact", label: "Contact" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled
          ? "bg-background/85 backdrop-blur-xl border-b border-border/60 py-3"
          : "bg-transparent py-5",
      )}
    >
      <div className="container-x flex flex-wrap items-center justify-between gap-4">
        <a
          href="#top"
          className={cn(
            "flex flex-1 min-w-0 items-center gap-3 font-display text-xl tracking-tight transition-colors",
            scrolled ? "text-foreground" : "text-white",
          )}
        >
          <span className="relative h-11 w-11 flex-shrink-0 overflow-hidden rounded-full border border-white/20 bg-white/5">
            <img src="/logo.png" alt="Wazee wa Mazingira logo" className="h-full w-full object-cover" />
          </span>
          <span className="min-w-0 text-[1.05rem] leading-tight whitespace-normal break-words sm:text-[1.2rem] sm:leading-snug">
            Wazee wa Mazingira
          </span>
        </a>

        <nav className="hidden lg:flex items-center gap-7 text-[1rem] font-semibold">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={cn(
                "site-nav-link transition-colors hover:text-accent",
                scrolled ? "text-foreground/80" : "text-white/85",
              )}
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="#register"
            className="hidden sm:inline-flex items-center justify-center rounded-full bg-accent px-6 py-3 text-[0.98rem] font-semibold text-accent-foreground transition-transform hover:scale-105"
          >
            Join Us
          </a>
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            className={cn(
              "lg:hidden grid h-10 w-10 place-items-center rounded-full",
              scrolled ? "text-foreground hover:bg-muted" : "text-white hover:bg-white/10",
            )}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden border-t border-border/60 bg-background/95 backdrop-blur-xl animate-fade-in">
          <nav className="container-x flex flex-col py-4">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="py-3 text-[1.05rem] font-semibold text-foreground/80 hover:text-accent"
              >
                {l.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
