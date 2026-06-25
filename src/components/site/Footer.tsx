import { Leaf, Facebook, Twitter } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container-x py-16">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <a href="#top" className="inline-flex items-center gap-3 font-display text-[1.24rem] sm:text-[1.35rem]">
              <span className="grid h-11 w-11 place-items-center rounded-full bg-accent text-accent-foreground">
                <Leaf className="h-5 w-5" />
              </span>
              Wazee wa Mazingira
            </a>
            <p className="mt-5 max-w-md text-[1rem] leading-[1.8] text-primary-foreground/80">
              A community-based organisation safeguarding the forests, biodiversity and
              cultural heritage of Mount Kulal in Marsabit County, Kenya.
            </p>
            <div className="mt-6 flex gap-3">
              {[
                { Icon: Facebook, href: "https://www.fb.com/l/6lp1kJRRR", label: "Facebook" },
                { Icon: Twitter, href: "https://x.com/Wazee1971", label: "X" },
              ].map(({ Icon, href, label }) => (
                <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label}
                  className="grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-accent hover:text-accent-foreground">
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div className="md:col-span-3">
            <h4 className="font-display text-[1.15rem]">Explore</h4>
            <ul className="mt-4 space-y-2.5 text-[1rem] text-primary-foreground/75">
              {[["#about", "About Us"], ["#impact", "Our Impact"], ["#mount-kulal", "Mount Kulal"], ["#projects", "Projects"], ["#awards", "Awards"], ["#gallery", "Gallery"]].map(([h, l]) => (
                <li key={h}><a href={h} className="site-footer-link hover:text-accent">{l}</a></li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-4">
            <h4 className="font-display text-[1.15rem]">Contact</h4>
            <ul className="mt-4 space-y-2.5 text-[1rem] text-primary-foreground/75">
              <li><a href="tel:+254711856795" className="site-footer-link hover:text-accent">0711 856 795</a></li>
              <li><a href="mailto:infor@wazeewamazingira.org" className="site-footer-link hover:text-accent break-all">infor@wazeewamazingira.org</a></li>
              <li>Mount Kulal area, Marsabit County, Kenya</li>
            </ul>
            <div className="mt-6 flex flex-col gap-3">
              <a href="#register" className="inline-flex items-center justify-center rounded-full bg-accent px-5 py-3 text-[0.98rem] font-semibold text-accent-foreground hover:scale-105 transition-transform">
                Join the Youth Program
              </a>
              <a
                href="mailto:infor@wazeewamazingira.org?subject=Donation%20to%20Wazee%20wa%20Mazingira"
                className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/10 px-5 py-3 text-[0.98rem] font-semibold text-white hover:bg-white/20 transition-colors"
              >
                Donate to Conservation
              </a>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/15 pt-8 text-[0.95rem] text-primary-foreground/70 sm:flex-row">
          <p>&copy; {new Date().getFullYear()} Wazee wa Mazingira. All rights reserved.</p>
          <p>Protecting Mount Kulal &middot; Empowering Communities &middot; Preserving Nature</p>
        </div>
      </div>
    </footer>
  );
}
