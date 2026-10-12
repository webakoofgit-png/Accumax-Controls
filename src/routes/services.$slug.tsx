import { Link } from "@/lib/navigation";
import { ArrowRight, Mail, Phone } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { EnquiryForm } from "@/components/site/EnquiryForm";
import { company, services, type ServiceBlock } from "@/data/site";

function Blocks({ body }: { body: ServiceBlock[] }) {
  return (
    <div className="space-y-4">
      {body.map((b, i) => {
        if (b.h4) return <h3 key={i} className="pt-4 text-xl font-extrabold">{b.h4}</h3>;
        if (b.li) {
          const labels = b.li.every((x) => x.trim().endsWith(":"));
          if (labels) return <p key={i} className="flex items-center gap-3 pt-2 font-display font-bold"><span className="h-2 w-2 rounded-full bg-gradient-ember" />{b.li.join(" ").replace(/:$/, "")}</p>;
          return (
            <ul key={i} className="space-y-3">
              {b.li.map((x) => {
                const [k, ...rest] = x.split(":");
                return (
                  <li key={x} className="flex gap-3 leading-relaxed text-muted-foreground">
                    <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    <span>{rest.length ? <><strong className="text-foreground">{k}:</strong>{rest.join(":")}</> : x}</span>
                  </li>
                );
              })}
            </ul>
          );
        }
        return <p key={i} className="leading-relaxed text-muted-foreground">{b.p}</p>;
      })}
    </div>
  );
}

export function ServicePage({ slug }: { slug: string }) {
  const service = services.find((s) => s.slug === slug);

  if (!service) {
    return <ServiceNotFound />;
  }
  return (
    <>
      <PageHero eyebrow="Service" title={service.name} image={service.image} crumb={service.name} />
      <section className="py-20">
        <div className="container-x grid gap-12 lg:grid-cols-[1fr_340px]">
          <article>
            <Reveal><img src={service.image} alt={service.name} className="aspect-[16/9] w-full rounded-lg object-cover shadow-lift" /></Reveal>
            <Reveal><div className="mt-10 space-y-4 text-lg leading-relaxed">{service.intro.map((p) => <p key={p.slice(0, 20)}>{p}</p>)}</div></Reveal>
            {service.sections.map((sec) => (
              <Reveal key={sec.h}>
                <section className="mt-12 border-t pt-10">
                  <h2 className="text-3xl font-extrabold">{sec.h}</h2>
                  <div className="mt-6"><Blocks body={sec.body} /></div>
                </section>
              </Reveal>
            ))}
            <div className="mt-16 rounded-lg border bg-secondary p-6 md:p-10">
              <h2 className="text-2xl font-extrabold">Enquire about {service.name}</h2>
              <div className="mt-6"><EnquiryForm defaultService={service.name} /></div>
            </div>
          </article>
          <aside className="space-y-6 lg:sticky lg:top-32 lg:self-start">
            <div className="rounded-lg border bg-card p-3 shadow-card">
              <p className="px-3 py-2 font-mono text-xs uppercase tracking-widest text-muted-foreground">All services</p>
              {services.map((s) => (
                <Link key={s.slug} to="/services/$slug" params={{ slug: s.slug }} className="flex items-center justify-between rounded px-3 py-3 text-sm font-semibold hover:bg-accent" activeProps={{ className: "bg-gradient-ember text-primary-foreground hover:bg-transparent" }}>
                  {s.name}<ArrowRight className="h-4 w-4" />
                </Link>
              ))}
            </div>
            <div className="rounded-lg bg-gradient-ink p-7 text-ink-muted">
              <h3 className="text-xl font-extrabold text-ink-foreground">Need help?</h3>
              <p className="mt-2 text-sm">Talk to our engineering team.</p>
              {company.phones.map((p, i) => <a key={p} href={company.phoneLinks[i]} className="mt-4 flex items-center gap-2 font-bold text-ink-foreground"><Phone className="h-4 w-4 text-amber" />{p}</a>)}
              <a href={`mailto:${company.email}`} className="mt-3 flex items-center gap-2 text-sm hover:text-ink-foreground"><Mail className="h-4 w-4 text-amber" />{company.email}</a>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}

function ServiceNotFound() {
  return (
    <>
      <PageHero eyebrow="Service" title="Service not found" image={company.aboutImage} crumb="Service" />
      <section className="py-20">
        <div className="container-x">
          <div className="rounded-lg border bg-card p-8 shadow-card">
            <h1 className="text-2xl font-extrabold">This service page does not exist.</h1>
            <Link to="/services" className="mt-6 inline-flex items-center gap-2 rounded bg-gradient-ember px-6 py-3 font-bold text-primary-foreground">
              View all services <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}