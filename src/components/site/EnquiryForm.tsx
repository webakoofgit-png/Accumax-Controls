import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { Send } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { services } from "@/data/site";

const schema = z.object({
  name: z.string().trim().min(1, "Please enter your name").max(120),
  email: z.string().trim().email("Please enter a valid email").max(255),
  phone: z.string().trim().max(30).regex(/^[+\d\s()-]*$/, "Please enter a valid phone number").optional(),
  company: z.string().trim().max(160).optional(),
  service: z.string().max(120).optional(),
  message: z.string().trim().min(1, "Please tell us about your requirement").max(3000),
});

const field = "w-full rounded border border-input bg-card px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-ring/25";

export function EnquiryForm({ kind = "enquiry", defaultService }: { kind?: "enquiry" | "career"; defaultService?: string }) {
  const [busy, setBusy] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [done, setDone] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = Object.fromEntries(new FormData(form)) as Record<string, string>;
    if (fd["website"]) return; // honeypot
    const parsed = schema.safeParse(fd);
    if (!parsed.success) {
      setErrors(Object.fromEntries(parsed.error.issues.map((i) => [i.path[0], i.message])));
      return;
    }
    setErrors({});
    setBusy(true);
    const d = parsed.data;
    const { error } = await supabase.from("enquiries").insert({
      kind, name: d.name, email: d.email, phone: d.phone || null, company: d.company || null, service: d.service || null, message: d.message,
    });
    setBusy(false);
    if (error) {
      toast.error("Sorry, we couldn't send that. Please call or email us directly.");
      return;
    }
    form.reset();
    setDone(true);
    toast.success("Thank you! Our team will get back to you shortly.");
  }

  const err = (k: string) => errors[k] && <p className="mt-1 text-xs text-destructive">{errors[k]}</p>;

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-4 sm:grid-cols-2">
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
      <div><label className="sr-only" htmlFor="f-name">Full name</label><input id="f-name" name="name" placeholder="Full name *" className={field} />{err("name")}</div>
      <div><label className="sr-only" htmlFor="f-email">Email</label><input id="f-email" name="email" type="email" placeholder="Email address *" className={field} />{err("email")}</div>
      <div><label className="sr-only" htmlFor="f-phone">Phone</label><input id="f-phone" name="phone" placeholder="Phone number" className={field} />{err("phone")}</div>
      <div><label className="sr-only" htmlFor="f-company">Company</label><input id="f-company" name="company" placeholder="Company name" className={field} /></div>
      {kind === "enquiry" ? (
        <div className="sm:col-span-2">
          <label className="sr-only" htmlFor="f-service">Service</label>
          <select id="f-service" name="service" defaultValue={defaultService ?? ""} className={field}>
            <option value="">Service of interest</option>
            {services.map((s) => <option key={s.slug} value={s.name}>{s.name}</option>)}
            <option value="Live Panel Cleaning">Live Panel Cleaning</option>
            <option value="Other">Other</option>
          </select>
        </div>
      ) : (
        <input type="hidden" name="service" value="Career application" />
      )}
      <div className="sm:col-span-2">
        <label className="sr-only" htmlFor="f-msg">Message</label>
        <textarea id="f-msg" name="message" rows={5} placeholder={kind === "career" ? "Tell us about your experience and the role you're looking for *" : "Your requirement *"} className={field} />
        {err("message")}
      </div>
      <div className="flex flex-col items-start gap-3 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
        <button disabled={busy} className="inline-flex items-center gap-2 rounded bg-gradient-ember px-7 py-3.5 text-sm font-bold text-primary-foreground shadow-ember transition hover:-translate-y-0.5 disabled:opacity-60">
          {busy ? "Sending…" : kind === "career" ? "Submit application" : "Send enquiry"} <Send className="h-4 w-4" />
        </button>
        {done && <p className="text-sm font-semibold text-accent-foreground">Received — we'll be in touch soon.</p>}
      </div>
    </form>
  );
}
