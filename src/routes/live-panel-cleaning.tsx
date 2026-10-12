import { Link } from "@/lib/navigation";
import { ArrowRight, FileText } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { company, panelCleaning } from "@/data/site";

export function Page() {
  return (
    <>
      <PageHero eyebrow="Service" title="Live Panel Cleaning" image={panelCleaning.image} crumb="Live Panel Cleaning" />
      <section className="py-20">
        <div className="container-x grid items-center gap-12 lg:grid-cols-2">
          <img src={panelCleaning.image} alt="Live solar panel cleaning" className="w-full rounded-lg shadow-lift" />
          <div>
            <p className="text-lg leading-relaxed">{panelCleaning.intro}</p>
            <h2 className="mt-10 text-3xl font-extrabold">{panelCleaning.whyTitle}</h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">{panelCleaning.why}</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a href={company.panelCleaningPdf} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded border px-6 py-3.5 font-bold hover:border-primary"><FileText className="h-4 w-4 text-primary" />More information (PDF)</a>
              <Link to="/contact" className="inline-flex items-center gap-2 rounded bg-gradient-ember px-6 py-3.5 font-bold text-primary-foreground shadow-ember">Enquire now <ArrowRight className="h-4 w-4" /></Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
