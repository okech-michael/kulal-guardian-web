import { useEffect, useState } from "react";
import { Link, useRouter } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  { href: "/impact", label: "Impact" },
  { href: "/projects", label: "Projects" },
  { href: "/awards", label: "Awards" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const router = useRouter();
  const isHome = router.state.location.pathname === "/";
  const isTransparent = isHome && !scrolled;

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
        isTransparent
          ? "bg-transparent py-5"
          : "bg-background/85 backdrop-blur-xl border-b border-border/60 py-3",
      )}
    >
      <div className="container-x flex flex-wrap items-center justify-between gap-4">
        <Link
          to="/"
          className={cn(
            "flex flex-1 min-w-0 items-center gap-3 font-display text-xl tracking-tight transition-colors",
            scrolled ? "text-foreground" : "text-white",
          )}
        >
          <span className="relative h-14 w-14 flex-shrink-0 overflow-hidden rounded-full border border-white/20 bg-white/5">
            <img src="/logo.png" alt="Wazee wa Mazingira logo" className="h-full w-full object-cover" />
          </span>
          <span className="min-w-0 text-[1.15rem] leading-tight whitespace-normal break-words sm:text-[1.35rem] sm:leading-snug">
            Wazee wa Mazingira
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-7 text-[1rem] font-semibold">
          <Link
            to="/"
            className={cn(
              "site-nav-link transition-colors hover:text-accent",
              isHome ? "text-white" : "text-foreground",
            )}
          >
            Home
          </Link>
          <div className="relative">
            <button
              type="button"
              aria-haspopup="menu"
              aria-expanded={aboutOpen}
              onMouseEnter={() => setAboutOpen(true)}
              onMouseLeave={() => setAboutOpen(false)}
              className={cn(
                "site-nav-link inline-flex items-center rounded-md bg-transparent px-2 py-1 text-inherit transition-colors hover:text-accent hover:bg-accent/10",
                isTransparent ? "text-white/85" : "text-foreground/80",
              )}
            >
              About
            </button>
            {aboutOpen && (
              <div
                onMouseEnter={() => setAboutOpen(true)}
                onMouseLeave={() => setAboutOpen(false)}
                className="absolute left-0 top-[calc(100%_-_3px)] z-50 min-w-[180px] overflow-hidden rounded-2xl border border-border bg-background/95 p-1 shadow-card"
              >
                <Link
                  to="/team"
                  className="block rounded-lg px-4 py-2 text-sm text-foreground transition-colors hover:bg-accent/10 hover:text-accent-foreground"
                >
                  Team
                </Link>
                <Link
                  to="/mount-kulal"
                  className="mt-1 block rounded-lg px-4 py-2 text-sm text-foreground transition-colors hover:bg-accent/10 hover:text-accent-foreground"
                >
                  Mount Kulal
                </Link>
              </div>
            )}
          </div>
          {links.map((l) => (
            <Link
              key={l.href}
              to={l.href}
              className={cn(
                "site-nav-link transition-colors hover:text-accent",
                isTransparent ? "text-white/85" : "text-foreground/80",
              )}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            to="/register"
            className="hidden sm:inline-flex items-center justify-center rounded-full bg-accent px-6 py-3 text-[0.98rem] font-semibold text-accent-foreground transition-transform hover:scale-105"
          >
            Join Us
          </Link>
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            className={cn(
              "lg:hidden grid h-10 w-10 place-items-center rounded-full",
              isTransparent ? "text-white hover:bg-white/10" : "text-foreground hover:bg-muted",
            )}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden border-t border-border/60 bg-background/95 backdrop-blur-xl animate-fade-in">
          <nav className="container-x flex flex-col py-4">
            <Link
              to="/"
              onClick={() => setOpen(false)}
              className="py-3 text-[1.05rem] font-semibold text-foreground/80 hover:text-accent"
            >
              Home
            </Link>
            <Link
              to="/about"
              onClick={() => setOpen(false)}
              className="py-3 text-[1.05rem] font-semibold text-foreground/80 hover:text-accent"
            >
              About
            </Link>
            <div className="ml-4 space-y-1 border-l border-border/60 pl-4">
              <Link
                to="/team"
                onClick={() => setOpen(false)}
                className="block py-2 text-[1rem] font-medium text-foreground/80 hover:text-accent"
              >
                Team
              </Link>
              <Link
                to="/mount-kulal"
                onClick={() => setOpen(false)}
                className="block py-2 text-[1rem] font-medium text-foreground/80 hover:text-accent"
              >
                Mount Kulal
              </Link>
            </div>
            {links.map((l) => (
              <Link
                key={l.href}
                to={l.href}
                onClick={() => setOpen(false)}
                className="py-3 text-[1.05rem] font-semibold text-foreground/80 hover:text-accent"
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
