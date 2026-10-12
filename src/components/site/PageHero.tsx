import { Link } from "@/lib/navigation";
import { ChevronRight } from "lucide-react";

export function PageHero({ title, eyebrow, image, crumb }: { title: string; eyebrow: string; image: string; crumb: string }) {
  return (
    <section className="relative isolate overflow-hidden bg-ink">
      <img src={image} alt="" className="absolute inset-0 -z-10 h-full w-full object-cover opacity-60" />
      <div className="bg-hero-scrim absolute inset-0 -z-10" />
      <div className="grid-lines absolute inset-0 -z-10 opacity-30" />
      <div className="container-x py-20 md:py-28">
        <span className="eyebrow">{eyebrow}</span>
        <h1 className="mt-4 max-w-3xl text-4xl font-extrabold leading-[1.02] text-ink-foreground md:text-6xl">{title}</h1>
        <nav aria-label="Breadcrumb" className="mt-6 flex items-center gap-2 text-sm text-ink-muted">
          <Link to="/" className="hover:text-ink-foreground">Home</Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-ink-foreground">{crumb}</span>
        </nav>
      </div>
    </section>
  );
}
