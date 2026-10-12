import { Link } from "@/lib/navigation";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, ArrowUpRight, CheckCircle2, FileText, HardHat, Phone, Quote, ShieldCheck } from "lucide-react";
import { Reveal, SectionHeading } from "@/components/site/Reveal";
import { EnquiryForm } from "@/components/site/EnquiryForm";
import { clients, company, industries, intro, services, serviceThumbs, stats, testimonials, whoWeAre, whyChoose } from "@/data/site";

export function Home() {
  return (
    <>
      <Hero />
      <IntroSection />
      <ServicesSection />
      <StatsSection />
      <IndustriesSection />
      <WhySection />
      <LifecycleSection />
      <ClientsSection />
      <TestimonialsSection />
      <EnquirySection />
    </>
  );
}

function Hero() {
  return (
    <section className="relative isolate flex min-h-[86vh] items-end overflow-hidden bg-ink">
      <video className="absolute inset-0 -z-10 h-full w-full object-cover" autoPlay muted loop playsInline poster={company.aboutImage}>
        <source src={company.heroVideo} type="video/mp4" />
      </video>
      <div className="bg-hero-scrim absolute inset-0 -z-10" />
      <div className="grid-lines absolute inset-0 -z-10 opacity-25" />
      <div className="container-x pb-20 pt-32 md:pb-28">
        <Reveal>
          <span className="eyebrow">10+ years in business · Pune, India</span>
          <h1 className="mt-6 max-w-4xl text-5xl font-black leading-[0.95] text-ink-foreground md:text-7xl lg:text-8xl">
            Control Center of <span className="text-gradient-ember">Engineering Excellence</span>
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-relaxed text-ink-muted">
            Exports, engineering and technology for the energy sector — GIS, AIS, EV stations, solar, substation civil & electrical works, SAS, AMC, E-House and testing & commissioning at every voltage level.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link to="/services" className="inline-flex items-center gap-2 rounded bg-gradient-ember px-7 py-4 font-bold text-primary-foreground shadow-ember transition hover:-translate-y-0.5">
              Explore services <ArrowRight className="h-5 w-5" />
            </Link>
            <Link to="/contact" className="inline-flex items-center gap-2 rounded border border-ink-line bg-ink/40 px-7 py-4 font-bold text-ink-foreground backdrop-blur transition hover:bg-ink/70">
              Send an enquiry
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function IntroSection() {
  return (
    <section className="py-24 md:py-32">
      <div className="container-x grid items-center gap-14 lg:grid-cols-2">
        <Reveal className="relative">
          <img src={company.aboutImage} alt="Accumax Controls engineering team at a substation site" className="aspect-[4/5] w-full rounded-lg object-cover shadow-lift" loading="lazy" />
          <div className="absolute -bottom-8 -right-4 rounded-lg bg-gradient-ember p-7 text-primary-foreground shadow-ember md:-right-8">
            <p className="font-display text-6xl font-black leading-none">10+</p>
            <p className="mt-1 text-sm font-semibold">Years in Business</p>
          </div>
        </Reveal>
        <Reveal delay={100}>
          <SectionHeading eyebrow="Accumax Controls Pvt. Ltd." title={<>We deliver <span className="text-gradient-ember">trust and efficiency</span></>} />
          <p className="mt-6 leading-relaxed text-muted-foreground">{intro}</p>
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            <a href={company.visionPdf} target="_blank" rel="noreferrer" className="group flex items-center justify-between rounded border bg-card p-4 font-bold shadow-card transition hover:border-primary">
              <span className="flex items-center gap-3"><FileText className="h-5 w-5 text-primary" />Vision & Mission</span><ArrowUpRight className="h-4 w-4 transition group-hover:text-primary" />
            </a>
            <a href={company.ehsPdf} target="_blank" rel="noreferrer" className="group flex items-center justify-between rounded border bg-card p-4 font-bold shadow-card transition hover:border-primary">
              <span className="flex items-center gap-3"><ShieldCheck className="h-5 w-5 text-primary" />EHS Policy</span><ArrowUpRight className="h-4 w-4 transition group-hover:text-primary" />
            </a>
          </div>
          <Link to="/about" className="mt-8 inline-flex items-center gap-2 font-bold text-primary hover:gap-3">Read more about us <ArrowRight className="h-4 w-4" /></Link>
        </Reveal>
      </div>
      <div className="container-x mt-28">
        <Reveal><SectionHeading eyebrow="Who we are" title="Providing products and services of highest quality standards with safest conditions" /></Reveal>
        <div className="mt-12 grid gap-px overflow-hidden rounded-lg border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {whoWeAre.map((w, i) => (
            <Reveal key={w} delay={i * 50} className="h-full">
              <div className="flex h-full flex-col gap-4 bg-card p-6">
                <span className="font-mono text-xs text-primary">{String(i + 1).padStart(2, "0")}</span>
                <p className="text-sm font-semibold leading-relaxed">{w}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ServicesSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-ink py-24 md:py-32">
      <div className="grid-lines pointer-events-none absolute inset-0 opacity-40" />
      <div className="container-x relative">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <Reveal><SectionHeading invert eyebrow="Our services" title="End-to-end power sector engineering" /></Reveal>
          <Link to="/services" className="inline-flex items-center gap-2 font-bold text-ink-foreground hover:text-amber">All services <ArrowRight className="h-4 w-4" /></Link>
        </div>
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s, i) => (
            <Reveal key={s.slug} delay={(i % 4) * 80}>
              <Link to="/services/$slug" params={{ slug: s.slug }} className="group relative block aspect-[3/4] overflow-hidden rounded-lg border border-ink-line">
                <img src={serviceThumbs[s.slug]} alt={s.name} className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-110" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/50 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <span className="font-mono text-xs text-amber">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="mt-2 text-xl font-extrabold text-ink-foreground">{s.name}</h3>
                  <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-ink-muted transition group-hover:gap-3 group-hover:text-ink-foreground">Read more <ArrowRight className="h-4 w-4" /></span>
                </div>
                <span className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-gradient-ember transition-transform duration-500 group-hover:scale-x-100" />
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Counter({ to }: { to: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [n, setN] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (!e?.isIntersecting) return;
      io.disconnect();
      const start = performance.now();
      const tick = (t: number) => {
        const p = Math.min(1, (t - start) / 1600);
        setN(Math.round(to * (1 - Math.pow(1 - p, 3))));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
    io.observe(el);
    return () => io.disconnect();
  }, [to]);
  return <span ref={ref}>{n}</span>;
}

function StatsSection() {
  return (
    <section className="border-b bg-card">
      <div className="container-x grid grid-cols-2 lg:grid-cols-4">
        {stats.map((s, i) => (
          <div key={s.label} className={`py-14 text-center ${i > 0 ? "lg:border-l" : ""} ${i % 2 ? "border-l lg:border-l" : ""} ${i > 1 ? "border-t lg:border-t-0" : ""}`}>
            <p className="font-display text-5xl font-black md:text-6xl"><span className="text-gradient-ember"><Counter to={s.value} />+</span></p>
            <p className="mt-2 font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function IndustriesSection() {
  return (
    <section className="py-24 md:py-32">
      <div className="container-x">
        <Reveal><SectionHeading eyebrow="Industries" title="Industries we work for" center /></Reveal>
        <div className="mt-14 grid grid-cols-2 gap-4 md:grid-cols-4">
          {industries.map((ind, i) => (
            <Reveal key={ind.name} delay={(i % 4) * 60}>
              <div className="group relative aspect-square overflow-hidden rounded-lg">
                <img src={ind.image} alt={ind.name} className="h-full w-full object-cover transition duration-700 group-hover:scale-110" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-transparent transition group-hover:from-primary/90" />
                <p className="absolute inset-x-0 bottom-0 p-4 font-display text-base font-bold text-ink-foreground md:text-lg">{ind.name}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhySection() {
  return (
    <section className="bg-secondary py-24 md:py-32">
      <div className="container-x grid items-center gap-14 lg:grid-cols-2">
        <Reveal>
          <SectionHeading eyebrow="Why choose us" title="We provide high quality products and services for you" lead={whyChoose} />
          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            {[{ icon: HardHat, t: "Trained Workers" }, { icon: CheckCircle2, t: "Best Quality Service" }].map(({ icon: I, t }) => (
              <div key={t} className="rounded-lg border bg-card p-6 shadow-card">
                <div className="grid h-12 w-12 place-items-center rounded bg-gradient-ember text-primary-foreground"><I className="h-6 w-6" /></div>
                <h3 className="mt-5 text-lg font-extrabold">{t}</h3>
              </div>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3 rounded-lg border bg-card p-5">
            <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">For enquiry</span>
            {company.phones.map((p, i) => (
              <a key={p} href={company.phoneLinks[i]} className="flex items-center gap-2 font-display text-lg font-bold hover:text-primary"><Phone className="h-4 w-4 text-primary" />{p}</a>
            ))}
          </div>
        </Reveal>
        <Reveal delay={120}>
          <div className="overflow-hidden rounded-lg bg-ink shadow-lift">
            <video controls preload="metadata" poster={company.aboutImage} className="aspect-video w-full">
              <source src={company.whyVideo} type="video/mp4" />
            </video>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function LifecycleSection() {
  return (
    <section className="py-24 md:py-32">
      <div className="container-x">
        <Reveal><SectionHeading eyebrow="How we work" title="Project life cycle" center /></Reveal>
        <Reveal delay={100}>
          <div className="mt-12 rounded-lg border bg-card p-6 shadow-card md:p-10">
            <img src={company.processImage} alt="Accumax Controls project life cycle diagram" className="mx-auto w-full max-w-5xl" loading="lazy" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function ClientsSection() {
  return (
    <section className="border-y bg-card py-20">
      <div className="container-x"><Reveal><SectionHeading eyebrow="Trusted by" title="Our valuable clients" center /></Reveal></div>
      <div className="mt-12 overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)]">
        <div className="marquee gap-6">
          {[...clients, ...clients].map((c, i) => (
            <div key={i} className="grid h-24 w-44 shrink-0 place-items-center rounded border bg-background p-3">
              <img src={c} alt="Client logo" className="max-h-full max-w-full object-contain" loading="lazy" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  return (
    <section className="py-24 md:py-32">
      <div className="container-x">
        <Reveal><SectionHeading eyebrow="Testimonials" title="What our clients say" center /></Reveal>
        <div className="mx-auto mt-14 grid max-w-5xl gap-6 md:grid-cols-2">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 100}>
              <figure className="relative h-full rounded-lg border bg-card p-8 shadow-card">
                <Quote className="h-10 w-10 text-primary/25" />
                <blockquote className="mt-4 text-lg leading-relaxed">{t.quote}</blockquote>
                <figcaption className="mt-6 border-t pt-5">
                  <p className="font-display font-extrabold">{t.name}</p>
                  <p className="text-sm text-muted-foreground">{t.city}</p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function EnquirySection() {
  return (
    <section className="relative overflow-hidden bg-gradient-ink py-24 md:py-32">
      <div className="grid-lines pointer-events-none absolute inset-0 opacity-40" />
      <div className="container-x relative grid gap-14 lg:grid-cols-[1fr_1.2fr]">
        <Reveal>
          <SectionHeading invert eyebrow="Get in touch" title={<>Planning a substation, solar or EPC project? <span className="text-gradient-ember">Let's talk.</span></>} lead="Share your requirement and our engineering team will respond with the right solution." />
          <div className="mt-8 space-y-3">
            {company.phones.map((p, i) => <a key={p} href={company.phoneLinks[i]} className="block font-display text-2xl font-bold text-ink-foreground hover:text-amber">{p}</a>)}
            <a href={`mailto:${company.email}`} className="block text-ink-muted hover:text-ink-foreground">{company.email}</a>
          </div>
        </Reveal>
        <Reveal delay={120}><div className="rounded-lg bg-background p-6 shadow-lift md:p-10"><EnquiryForm /></div></Reveal>
      </div>
    </section>
  );
}
