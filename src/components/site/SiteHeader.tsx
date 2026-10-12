import { Link } from "@/lib/navigation";
import { useEffect, useState } from "react";
import { ChevronDown, Mail, Menu, Phone, X } from "lucide-react";
import { company, services } from "@/data/site";
import { cn } from "@/lib/utils";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About Us" },
  { to: "/live-panel-cleaning", label: "Live Panel Cleaning" },
  { to: "/gallery", label: "Gallery" },
  { to: "/careers", label: "Career" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <header className="sticky top-0 z-50">
      <div className="hidden bg-ink text-ink-muted md:block">
        <div className="container-x flex h-9 items-center justify-between text-xs">
          <span className="font-mono tracking-wider">{company.tagline.toUpperCase()}</span>
          <div className="flex items-center gap-6">
            <a href={`mailto:${company.email}`} className="flex items-center gap-2 hover:text-ink-foreground"><Mail className="h-3.5 w-3.5" />{company.email}</a>
            <a href={company.phoneLinks[0]} className="flex items-center gap-2 hover:text-ink-foreground"><Phone className="h-3.5 w-3.5" />{company.phones[0]}</a>
          </div>
        </div>
      </div>
      <div className={cn("border-b bg-background/90 backdrop-blur-xl transition-shadow", scrolled && "shadow-card")}>
        <div className="container-x flex h-20 items-center justify-between gap-6">
          <Link to="/" className="shrink-0" aria-label="Accumax Controls home">
            <img src={company.logo} alt="Accumax Controls Pvt. Ltd. logo" className="h-12 w-auto" width={158} height={48} />
          </Link>
          <nav className="hidden items-center gap-1 lg:flex">
            {links.slice(0, 2).map((l) => <NavItem key={l.to} {...l} />)}
            <div className="group relative">
              <Link to="/services" className="flex items-center gap-1 rounded px-3 py-2 text-sm font-semibold text-foreground/80 hover:text-primary" activeProps={{ className: "text-primary" }}>
                Services <ChevronDown className="h-4 w-4 transition-transform group-hover:rotate-180" />
              </Link>
              <div className="invisible absolute left-1/2 top-full w-[34rem] -translate-x-1/2 pt-3 opacity-0 transition-all group-hover:visible group-hover:opacity-100">
                <div className="grid grid-cols-2 gap-1 rounded-lg border bg-card p-3 shadow-lift">
                  {services.map((s) => (
                    <Link key={s.slug} to="/services/$slug" params={{ slug: s.slug }} className="rounded px-3 py-2.5 text-sm font-medium hover:bg-accent hover:text-accent-foreground">{s.name}</Link>
                  ))}
                </div>
              </div>
            </div>
            {links.slice(2).map((l) => <NavItem key={l.to} {...l} />)}
          </nav>
          <div className="flex items-center gap-3">
            <Link to="/contact" className="hidden rounded bg-gradient-ember px-5 py-3 text-sm font-bold text-primary-foreground shadow-ember transition-transform hover:-translate-y-0.5 sm:inline-flex">Contact Us</Link>
            <button className="rounded p-2 lg:hidden" onClick={() => setOpen(!open)} aria-label="Toggle menu" aria-expanded={open}>
              {open ? <X /> : <Menu />}
            </button>
          </div>
        </div>
        {open && (
          <div className="max-h-[75vh] overflow-y-auto border-t bg-background lg:hidden">
            <div className="container-x flex flex-col py-4">
              {[...links, { to: "/services", label: "All Services" }, { to: "/contact", label: "Contact Us" }].map((l) => (
                <Link key={l.to} to={l.to} onClick={() => setOpen(false)} className="border-b py-3 font-semibold">{l.label}</Link>
              ))}
              <p className="eyebrow mt-5">Services</p>
              {services.map((s) => (
                <Link key={s.slug} to="/services/$slug" params={{ slug: s.slug }} onClick={() => setOpen(false)} className="py-2 text-sm text-muted-foreground">{s.name}</Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

function NavItem({ to, label }: { to: string; label: string }) {
  return (
    <Link to={to} className="rounded px-3 py-2 text-sm font-semibold text-foreground/80 hover:text-primary" activeProps={{ className: "text-primary" }} activeOptions={{ exact: to === "/" }}>
      {label}
    </Link>
  );
}
