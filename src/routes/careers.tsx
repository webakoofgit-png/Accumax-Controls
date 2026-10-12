import { PageHero } from "@/components/site/PageHero";
import { EnquiryForm } from "@/components/site/EnquiryForm";
import { about, company } from "@/data/site";

export function Careers() {
  return (
    <>
      <PageHero eyebrow="Career" title="Build the power infrastructure of tomorrow" image={about.team[1]!.image} crumb="Career" />
      <section className="py-20">
        <div className="container-x grid gap-12 lg:grid-cols-[1fr_1.3fr]">
          <div>
            <img src={about.team[1]!.image} alt="Accumax field and engineering team" className="w-full rounded-lg object-cover shadow-lift" loading="lazy" />
            <p className="mt-6 leading-relaxed text-muted-foreground">{about.team[1]!.text}</p>
            <p className="mt-4 text-sm text-muted-foreground">You can also email your resume to <a className="font-semibold text-primary" href={`mailto:${company.email}`}>{company.email}</a>.</p>
          </div>
          <div className="rounded-lg border bg-card p-6 shadow-card md:p-10">
            <h2 className="text-3xl font-extrabold">Apply now</h2>
            <div className="mt-8"><EnquiryForm kind="career" /></div>
          </div>
        </div>
      </section>
    </>
  );
}
