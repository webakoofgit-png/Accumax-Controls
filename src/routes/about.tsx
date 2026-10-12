import { Link } from "@/lib/navigation";
import { ArrowRight, Eye, FileText, ShieldCheck, Target } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { Reveal, SectionHeading } from "@/components/site/Reveal";
import { about, company, whoWeAre } from "@/data/site";

export function About() {
  return (
    <>
      <PageHero eyebrow="About us" title="At the forefront of power sector engineering" image={company.aboutImage} crumb="About Us" />
      <section className="py-24">
        <div className="container-x grid gap-14 lg:grid-cols-[1fr_1.3fr]">
          <Reveal><img src={company.aboutImage} alt="Accumax Controls at work" className="sticky top-32 aspect-[4/5] w-full rounded-lg object-cover shadow-lift" /></Reveal>
          <Reveal delay={100}>
            <SectionHeading eyebrow="Company overview" title="Engineering, exports & technological innovation" />
            <div className="mt-8 space-y-5 leading-relaxed text-muted-foreground">{about.paragraphs.map((p) => <p key={p.slice(0, 20)}>{p}</p>)}</div>
          </Reveal>
        </div>
      </section>
      <section className="bg-gradient-ink py-24">
        <div className="container-x grid gap-6 md:grid-cols-2">
          {[{ icon: Target, t: "Our Mission", d: about.mission }, { icon: Eye, t: "Our Vision", d: about.vision }].map(({ icon: I, t, d }, i) => (
            <Reveal key={t} delay={i * 100}>
              <div className="h-full rounded-lg border border-ink-line bg-ink/60 p-10">
                <div className="grid h-14 w-14 place-items-center rounded bg-gradient-ember text-primary-foreground"><I className="h-7 w-7" /></div>
                <h2 className="mt-6 text-3xl font-extrabold text-ink-foreground">{t}</h2>
                <p className="mt-4 leading-relaxed text-ink-muted">{d}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <div className="container-x mt-8 flex flex-wrap gap-4">
          <a href={company.visionPdf} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded border border-ink-line px-5 py-3 font-semibold text-ink-foreground hover:bg-ink"><FileText className="h-4 w-4" />Vision, Mission & Values (PDF)</a>
          <a href={company.ehsPdf} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded border border-ink-line px-5 py-3 font-semibold text-ink-foreground hover:bg-ink"><ShieldCheck className="h-4 w-4" />EHS Policy (PDF)</a>
        </div>
      </section>
      <section className="py-24">
        <div className="container-x">
          <Reveal><SectionHeading eyebrow="Quality & safety" title="How we work" /></Reveal>
          <div className="mt-12 grid gap-4 md:grid-cols-2">
            {whoWeAre.map((w, i) => (
              <Reveal key={w} delay={(i % 2) * 80}>
                <div className="flex gap-5 rounded-lg border bg-card p-6 shadow-card"><span className="font-mono text-sm text-primary">{String(i + 1).padStart(2, "0")}</span><p className="font-semibold">{w}</p></div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <section className="bg-secondary py-24">
        <div className="container-x">
          <Reveal><SectionHeading eyebrow="Our team" title="The people behind every commissioning" /></Reveal>
          <div className="mt-12 grid gap-8 md:grid-cols-2">
            {about.team.map((m, i) => (
              <Reveal key={m.image} delay={i * 100}>
                <article className="overflow-hidden rounded-lg border bg-card shadow-card">
                  <img src={m.image} alt="Accumax Controls team" className="aspect-[16/10] w-full object-cover" loading="lazy" />
                  <p className="p-7 leading-relaxed text-muted-foreground">{m.text}</p>
                </article>
              </Reveal>
            ))}
          </div>
          <Link to="/contact" className="mt-12 inline-flex items-center gap-2 rounded bg-gradient-ember px-7 py-4 font-bold text-primary-foreground shadow-ember">Work with us <ArrowRight className="h-5 w-5" /></Link>
        </div>
      </section>
    </>
  );
}
