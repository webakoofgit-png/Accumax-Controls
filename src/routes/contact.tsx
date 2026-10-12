import { createFileRoute } from "@tanstack/react-router";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { EnquiryForm } from "@/components/site/EnquiryForm";
import { company } from "@/data/site";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Us — Accumax Controls Pvt. Ltd." },
      { name: "description", content: "Call +91 9920177441, email info@accumaxcontrols.com or send an enquiry to Accumax Controls, Kothrud, Pune." },
      { property: "og:title", content: "Contact Accumax Controls" },
      { property: "og:description", content: "Send an enquiry to our engineering team in Pune, India." },
    ],
  }),
  component: Contact,
});

function Contact() {
  const cards: { icon: typeof Phone; t: string; lines: { l: string; href?: string | undefined }[] }[] = [
    { icon: Phone, t: "Call us", lines: company.phones.map((p, i) => ({ l: p, href: company.phoneLinks[i] ?? "" })) },
    { icon: Mail, t: "Email", lines: [{ l: company.email, href: `mailto:${company.email}` }] },
    { icon: MessageCircle, t: "WhatsApp", lines: [{ l: "Chat with us", href: company.whatsapp }] },
    { icon: MapPin, t: "Office", lines: [{ l: company.address }] },
  ];
  return (
    <>
      <PageHero eyebrow="Contact us" title="Get in touch" image={company.aboutImage} crumb="Contact Us" />
      <section className="py-20">
        <div className="container-x grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map(({ icon: I, t, lines }) => (
            <div key={t} className="rounded-lg border bg-card p-6 shadow-card">
              <div className="grid h-12 w-12 place-items-center rounded bg-gradient-ember text-primary-foreground"><I className="h-5 w-5" /></div>
              <h2 className="mt-5 text-lg font-extrabold">{t}</h2>
              {lines.map((x) => x.href
                ? <a key={x.l} href={x.href} target={x.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" className="mt-2 block text-sm text-muted-foreground hover:text-primary">{x.l}</a>
                : <p key={x.l} className="mt-2 text-sm leading-relaxed text-muted-foreground">{x.l}</p>)}
            </div>
          ))}
        </div>
        <div className="container-x mt-12 grid gap-8 lg:grid-cols-[1.2fr_1fr]">
          <div className="rounded-lg border bg-card p-6 shadow-card md:p-10">
            <h2 className="text-3xl font-extrabold">Send an enquiry</h2>
            <p className="mt-2 text-muted-foreground">Tell us about your project and we'll respond shortly.</p>
            <div className="mt-8"><EnquiryForm /></div>
          </div>
          <iframe title="Accumax Controls office location" src={company.mapEmbed} className="min-h-[420px] w-full rounded-lg border shadow-card" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
        </div>
      </section>
    </>
  );
}
