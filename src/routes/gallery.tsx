import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { X } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { SectionHeading } from "@/components/site/Reveal";
import { gallery, videos } from "@/data/site";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery — Accumax Controls Pvt. Ltd." },
      { name: "description", content: "Photos and videos from Accumax Controls substation, GIS, solar and commissioning projects." },
      { property: "og:title", content: "Project Gallery — Accumax Controls" },
      { property: "og:description", content: "Images and videos from our project sites." },
    ],
  }),
  component: Gallery,
});

function Gallery() {
  const [open, setOpen] = useState<string | null>(null);
  return (
    <>
      <PageHero eyebrow="Gallery" title="From our project sites" image={gallery[0]!} crumb="Gallery" />
      <section className="py-20">
        <div className="container-x">
          <SectionHeading eyebrow="Images" title="Project photographs" />
          <div className="mt-10 columns-1 gap-4 sm:columns-2 lg:columns-3">
            {gallery.map((g) => (
              <button key={g} onClick={() => setOpen(g)} className="mb-4 block w-full overflow-hidden rounded-lg">
                <img src={g} alt="Accumax Controls project site" className="w-full transition duration-500 hover:scale-105" loading="lazy" />
              </button>
            ))}
          </div>
          <div className="mt-20"><SectionHeading eyebrow="Videos" title="On-site footage" /></div>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {videos.map((v) => (
              <video key={v} controls preload="metadata" className="aspect-video w-full rounded-lg bg-ink shadow-card"><source src={v} type="video/mp4" /></video>
            ))}
          </div>
        </div>
      </section>
      {open && (
        <div role="dialog" aria-modal className="fixed inset-0 z-[60] grid place-items-center bg-ink/90 p-6" onClick={() => setOpen(null)}>
          <button aria-label="Close" className="absolute right-6 top-6 text-ink-foreground"><X className="h-8 w-8" /></button>
          <img src={open} alt="Project photograph enlarged" className="max-h-[85vh] max-w-full rounded-lg" />
        </div>
      )}
    </>
  );
}
