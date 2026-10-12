import { Link } from "@/lib/navigation";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { company, services } from "@/data/site";

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden bg-gradient-ink text-ink-muted">
      <div className="grid-lines pointer-events-none absolute inset-0 opacity-40" />
      <div className="container-x relative grid gap-12 py-20 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="inline-block rounded bg-card p-3"><img src={company.logo} alt="Accumax Controls logo" className="h-10 w-auto" loading="lazy" /></div>
          <p className="mt-6 text-sm leading-relaxed">{company.tagline}. Engineering, exports and technology for the energy sector.</p>
          <div className="mt-6 flex gap-3 text-sm">
            <a href={company.visionPdf} target="_blank" rel="noreferrer" className="rounded border border-ink-line px-3 py-2 hover:text-ink-foreground">Vision & Mission</a>
            <a href={company.ehsPdf} target="_blank" rel="noreferrer" className="rounded border border-ink-line px-3 py-2 hover:text-ink-foreground">EHS Policy</a>
          </div>
        </div>
        <div>
          <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-ink-foreground">Company</h3>
          <ul className="mt-5 space-y-3 text-sm">
            {([["/", "Home"], ["/about", "About Us"], ["/live-panel-cleaning", "Live Panel Cleaning"], ["/gallery", "Gallery"], ["/careers", "Career"], ["/contact", "Contact Us"]] as const).map(([to, l]) => (
              <li key={to}><Link to={to} className="hover:text-ink-foreground">{l}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-ink-foreground">Services</h3>
          <ul className="mt-5 space-y-3 text-sm">
            {services.map((s) => (
              <li key={s.slug}><Link to="/services/$slug" params={{ slug: s.slug }} className="hover:text-ink-foreground">{s.name}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-ink-foreground">Reach us</h3>
          <ul className="mt-5 space-y-4 text-sm">
            <li className="flex gap-3"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-ember" />{company.address}</li>
            <li className="flex gap-3"><Mail className="h-4 w-4 shrink-0 text-ember" /><a href={`mailto:${company.email}`} className="hover:text-ink-foreground">{company.email}</a></li>
            {company.phones.map((p, i) => (
              <li key={p} className="flex gap-3"><Phone className="h-4 w-4 shrink-0 text-ember" /><a href={company.phoneLinks[i]} className="hover:text-ink-foreground">{p}</a></li>
            ))}
          </ul>
        </div>
      </div>
      <div className="relative border-t border-ink-line">
        <div className="container-x flex flex-col justify-between gap-2 py-6 text-xs md:flex-row">
          <span>© {new Date().getFullYear()} {company.name} All Rights Reserved.</span>
          <span className="font-mono tracking-wider">PUNE · MAHARASHTRA · INDIA</span>
        </div>
      </div>
      <a href={company.whatsapp} target="_blank" rel="noreferrer" aria-label="Chat on WhatsApp" className="fixed bottom-5 right-5 z-40 grid h-14 w-14 place-items-center rounded-full bg-gradient-ember text-primary-foreground shadow-ember transition-transform hover:scale-105">
        <MessageCircle className="h-6 w-6" />
      </a>
    </footer>
  );
}
