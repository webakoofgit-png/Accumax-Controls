import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { company, services, serviceThumbs } from "@/data/site";

export const Route = createFileRoute("/services/")({
  head: () => ({
    meta: [
      { title: "Services — Accumax Controls Pvt. Ltd." },
      { name: "description", content: "EPC projects, SCADA & relay testing, exports, substation T&C, fabrication & civil, GIS erection & supervision, solar & EV stations and trading." },
      { property: "og:title", content: "Engineering Services — Accumax Controls" },
      { property: "og:description", content: "Eight service lines covering the full life cycle of power sector projects." },
    ],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  return (
    <>
      <PageHero eyebrow="Our services" title="Engineering services for the energy sector" image={company.aboutImage} crumb="Services" />
      <section className="py-24">
        <div className="container-x grid gap-6 md:grid-cols-2">
          {services.map((s, i) => (
            <Reveal key={s.slug} delay={(i % 2) * 80}>
              <Link to="/services/$slug" params={{ slug: s.slug }} className="group grid overflow-hidden rounded-lg border bg-card shadow-card transition hover:-translate-y-1 hover:shadow-lift sm:grid-cols-[200px_1fr]">
                <img src={serviceThumbs[s.slug]} alt={s.name} className="h-48 w-full object-cover sm:h-full" loading="lazy" />
                <div className="p-6">
                  <span className="font-mono text-xs text-primary">{String(i + 1).padStart(2, "0")}</span>
                  <h2 className="mt-2 text-2xl font-extrabold">{s.name}</h2>
                  <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted-foreground">{s.intro[0]}</p>
                  <span className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-primary group-hover:gap-3">Read more <ArrowRight className="h-4 w-4" /></span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
