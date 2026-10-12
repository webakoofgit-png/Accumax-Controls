import { clearAdminContent, saveAdminContent, type AdminContent } from "@/data/adminContent";
import { about, company, gallery, intro, panelCleaning, services, stats, videos, whyChoose } from "@/data/site";
import { cn } from "@/lib/utils";
import { ExternalLink, RotateCcw, Save, Settings2 } from "lucide-react";
import { useMemo, useState, type FormEvent, type ReactNode } from "react";

const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "admin@123";
const ADMIN_SESSION_KEY = "accumax-admin-session";

const lines = (items: string[]) => items.join("\n");
const splitLines = (value: string) => value.split("\n").map((item) => item.trim()).filter(Boolean);

function initialContent(): Required<AdminContent> {
  return {
    company: {
      tagline: company.tagline,
      email: company.email,
      phones: company.phones,
      whatsapp: company.whatsapp,
      address: company.address,
      mapEmbed: company.mapEmbed,
    },
    intro,
    whyChoose,
    stats,
    services: services.map((service) => ({
      slug: service.slug,
      name: service.name,
      image: service.image,
      intro: service.intro,
    })),
    hiddenServiceSlugs: [],
    about: {
      paragraphs: about.paragraphs,
      mission: about.mission,
      vision: about.vision,
    },
    panelCleaning: {
      intro: panelCleaning.intro,
      whyTitle: panelCleaning.whyTitle,
      why: panelCleaning.why,
      image: panelCleaning.image,
    },
    gallery,
    videos,
  };
}

type Section = "company" | "home" | "services" | "media" | "about" | "panel";

const sections: { id: Section; label: string }[] = [
  { id: "company", label: "Company" },
  { id: "home", label: "Home" },
  { id: "services", label: "Services" },
  { id: "media", label: "Media" },
  { id: "about", label: "About" },
  { id: "panel", label: "Panel Cleaning" },
];

export function AdminPanel() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => window.localStorage.getItem(ADMIN_SESSION_KEY) === "active");
  const [active, setActive] = useState<Section>("company");
  const [content, setContent] = useState<Required<AdminContent>>(() => initialContent());
  const [saved, setSaved] = useState(false);

  const serviceCount = useMemo(() => content.services.length, [content.services.length]);

  if (!isLoggedIn) {
    return <AdminLogin onLogin={() => setIsLoggedIn(true)} />;
  }

  const update = <K extends keyof Required<AdminContent>>(key: K, value: Required<AdminContent>[K]) => {
    setContent((current) => ({ ...current, [key]: value }));
  };

  const save = () => {
    saveAdminContent(content);
    setSaved(true);
    window.setTimeout(() => window.location.reload(), 500);
  };

  const reset = () => {
    clearAdminContent();
    window.location.reload();
  };

  const logout = () => {
    window.localStorage.removeItem(ADMIN_SESSION_KEY);
    setIsLoggedIn(false);
  };

  return (
    <section className="bg-secondary py-10 md:py-14">
      <div className="container-x">
        <div className="flex flex-col justify-between gap-5 border-b pb-8 md:flex-row md:items-end">
          <div>
            <span className="eyebrow">Admin panel</span>
            <h1 className="mt-4 text-4xl font-black md:text-5xl">Website content control</h1>
          </div>
          <div className="flex flex-wrap gap-3">
            <a href="/" className="inline-flex items-center gap-2 rounded border bg-card px-4 py-3 text-sm font-bold shadow-card hover:border-primary">
              Website <ExternalLink className="h-4 w-4" />
            </a>
            <button onClick={logout} className="inline-flex items-center gap-2 rounded border bg-card px-4 py-3 text-sm font-bold shadow-card hover:border-primary">
              Logout
            </button>
            <button onClick={reset} className="inline-flex items-center gap-2 rounded border bg-card px-4 py-3 text-sm font-bold shadow-card hover:border-primary">
              Reset <RotateCcw className="h-4 w-4" />
            </button>
            <button onClick={save} className="inline-flex items-center gap-2 rounded bg-gradient-ember px-5 py-3 text-sm font-bold text-primary-foreground shadow-ember">
              Save <Save className="h-4 w-4" />
            </button>
          </div>
        </div>

        {saved && <div className="mt-5 rounded border border-primary/30 bg-accent px-4 py-3 text-sm font-bold text-accent-foreground">Saved. Reloading website content.</div>}

        <div className="mt-8 grid gap-6 lg:grid-cols-[260px_1fr]">
          <aside className="rounded-lg border bg-card p-3 shadow-card lg:sticky lg:top-28 lg:self-start">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActive(section.id)}
                className={cn(
                  "flex w-full items-center gap-3 rounded px-4 py-3 text-left text-sm font-bold transition hover:bg-accent",
                  active === section.id && "bg-gradient-ember text-primary-foreground hover:bg-transparent",
                )}
              >
                <Settings2 className="h-4 w-4" />
                {section.label}
              </button>
            ))}
          </aside>

          <div className="rounded-lg border bg-background p-5 shadow-card md:p-8">
            {active === "company" && (
              <Panel title="Company Details">
                <Field label="Tagline" value={content.company.tagline ?? ""} onChange={(value) => update("company", { ...content.company, tagline: value })} />
                <Field label="Email" value={content.company.email ?? ""} onChange={(value) => update("company", { ...content.company, email: value })} />
                <Textarea label="Phone numbers" value={lines(content.company.phones ?? [])} onChange={(value) => update("company", { ...content.company, phones: splitLines(value) })} />
                <Field label="WhatsApp URL" value={content.company.whatsapp ?? ""} onChange={(value) => update("company", { ...content.company, whatsapp: value })} />
                <Textarea label="Address" value={content.company.address ?? ""} onChange={(value) => update("company", { ...content.company, address: value })} />
                <Textarea label="Google Map Embed URL" value={content.company.mapEmbed ?? ""} onChange={(value) => update("company", { ...content.company, mapEmbed: value })} rows={4} />
              </Panel>
            )}

            {active === "home" && (
              <Panel title="Home Page">
                <Textarea label="Company intro" value={content.intro} onChange={(value) => update("intro", value)} rows={8} />
                <Textarea label="Why choose us" value={content.whyChoose} onChange={(value) => update("whyChoose", value)} rows={5} />
                <div className="grid gap-4 md:grid-cols-2">
                  {content.stats.map((stat, index) => (
                    <div key={index} className="rounded border bg-card p-4">
                      <Field label="Label" value={stat.label} onChange={(value) => updateStat(index, "label", value, content, update)} />
                      <Field label="Value" value={String(stat.value)} onChange={(value) => updateStat(index, "value", Number(value) || 0, content, update)} />
                    </div>
                  ))}
                </div>
              </Panel>
            )}

            {active === "services" && (
              <Panel title={`Services (${serviceCount})`}>
                <button
                  onClick={() => addService(content, update)}
                  className="inline-flex items-center rounded bg-gradient-ember px-4 py-2.5 text-sm font-bold text-primary-foreground shadow-ember"
                >
                  Add Service
                </button>
                <div className="space-y-5">
                  {content.services.map((service, index) => (
                    <div key={service.slug} className="rounded-lg border bg-card p-4">
                      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                        <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">{service.slug}</p>
                        <button onClick={() => removeService(index, content, update)} className="rounded border px-3 py-2 text-xs font-bold text-destructive hover:border-destructive">
                          Remove
                        </button>
                      </div>
                      <div className="mt-4 grid gap-4 lg:grid-cols-2">
                        <Field label="Slug" value={service.slug} onChange={(value) => updateService(index, { slug: slugify(value) }, content, update)} />
                        <Field label="Service name" value={service.name} onChange={(value) => updateService(index, { name: value }, content, update)} />
                        <Field label="Image URL" value={service.image} onChange={(value) => updateService(index, { image: value }, content, update)} />
                      </div>
                      <Textarea label="Intro paragraphs" value={lines(service.intro)} onChange={(value) => updateService(index, { intro: splitLines(value) }, content, update)} rows={5} />
                    </div>
                  ))}
                </div>
              </Panel>
            )}

            {active === "media" && (
              <Panel title="Gallery & Videos">
                <Textarea label="Gallery image URLs" value={lines(content.gallery)} onChange={(value) => update("gallery", splitLines(value))} rows={10} />
                <Textarea label="Video URLs" value={lines(content.videos)} onChange={(value) => update("videos", splitLines(value))} rows={6} />
              </Panel>
            )}

            {active === "about" && (
              <Panel title="About Page">
                <Textarea label="About paragraphs" value={lines(content.about.paragraphs ?? [])} onChange={(value) => update("about", { ...content.about, paragraphs: splitLines(value) })} rows={10} />
                <Textarea label="Mission" value={content.about.mission ?? ""} onChange={(value) => update("about", { ...content.about, mission: value })} rows={4} />
                <Textarea label="Vision" value={content.about.vision ?? ""} onChange={(value) => update("about", { ...content.about, vision: value })} rows={4} />
              </Panel>
            )}

            {active === "panel" && (
              <Panel title="Live Panel Cleaning">
                <Field label="Image URL" value={content.panelCleaning.image ?? ""} onChange={(value) => update("panelCleaning", { ...content.panelCleaning, image: value })} />
                <Textarea label="Intro" value={content.panelCleaning.intro ?? ""} onChange={(value) => update("panelCleaning", { ...content.panelCleaning, intro: value })} rows={7} />
                <Field label="Why title" value={content.panelCleaning.whyTitle ?? ""} onChange={(value) => update("panelCleaning", { ...content.panelCleaning, whyTitle: value })} />
                <Textarea label="Why content" value={content.panelCleaning.why ?? ""} onChange={(value) => update("panelCleaning", { ...content.panelCleaning, why: value })} rows={5} />
              </Panel>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function AdminLogin({ onLogin }: { onLogin: () => void }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      window.localStorage.setItem(ADMIN_SESSION_KEY, "active");
      onLogin();
      return;
    }
    setError("Wrong username or password.");
  };

  return (
    <section className="grid min-h-[78vh] place-items-center bg-secondary px-4 py-16">
      <div className="w-full max-w-xl rounded-lg border bg-background p-6 shadow-lift md:p-8">
        <span className="eyebrow">Admin login</span>
        <h1 className="mt-4 text-4xl font-black">Website admin panel</h1>
        <div className="mt-6 rounded border bg-card p-4">
          <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Dummy credentials</p>
          <div className="mt-3 grid gap-3 text-sm sm:grid-cols-2">
            <div className="rounded bg-secondary p-3">
              <p className="font-semibold text-muted-foreground">Username</p>
              <p className="mt-1 font-mono text-lg font-bold">{ADMIN_USERNAME}</p>
            </div>
            <div className="rounded bg-secondary p-3">
              <p className="font-semibold text-muted-foreground">Password</p>
              <p className="mt-1 font-mono text-lg font-bold">{ADMIN_PASSWORD}</p>
            </div>
          </div>
        </div>

        <form onSubmit={submit} className="mt-6 space-y-4">
          <Field label="Username" value={username} onChange={setUsername} />
          <label className="block">
            <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Password</span>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="mt-2 w-full rounded border bg-card px-3 py-2.5 text-sm outline-none focus:border-primary"
            />
          </label>
          {error && <p className="rounded border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm font-bold text-destructive">{error}</p>}
          <button className="inline-flex w-full items-center justify-center rounded bg-gradient-ember px-5 py-3 text-sm font-bold text-primary-foreground shadow-ember">
            Login
          </button>
        </form>
      </div>
    </section>
  );
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function updateStat<K extends keyof Required<AdminContent>["stats"][number]>(
  index: number,
  key: K,
  value: Required<AdminContent>["stats"][number][K],
  content: Required<AdminContent>,
  update: <T extends keyof Required<AdminContent>>(key: T, value: Required<AdminContent>[T]) => void,
) {
  const next = [...content.stats];
  next[index] = { ...next[index]!, [key]: value };
  update("stats", next);
}

function addService(
  content: Required<AdminContent>,
  update: <T extends keyof Required<AdminContent>>(key: T, value: Required<AdminContent>[T]) => void,
) {
  const nextNumber = content.services.length + 1;
  const slug = `new-service-${nextNumber}`;
  update("services", [
    ...content.services,
    {
      slug,
      name: `New Service ${nextNumber}`,
      image: "/assets/img/service/epc.jpg",
      intro: ["Write the service introduction here."],
    },
  ]);
}

function removeService(
  index: number,
  content: Required<AdminContent>,
  update: <T extends keyof Required<AdminContent>>(key: T, value: Required<AdminContent>[T]) => void,
) {
  const service = content.services[index];
  if (!service) return;
  update("hiddenServiceSlugs", [...new Set([...content.hiddenServiceSlugs, service.slug])]);
  update("services", content.services.filter((_, serviceIndex) => serviceIndex !== index));
}

function updateService(
  index: number,
  patch: Partial<Required<AdminContent>["services"][number]>,
  content: Required<AdminContent>,
  update: <T extends keyof Required<AdminContent>>(key: T, value: Required<AdminContent>[T]) => void,
) {
  const next = [...content.services];
  next[index] = { ...next[index]!, ...patch };
  update("services", next);
}

function Panel({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div>
      <h2 className="text-2xl font-extrabold">{title}</h2>
      <div className="mt-6 space-y-5">{children}</div>
    </div>
  );
}

function Field({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  return (
    <label className="block">
      <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">{label}</span>
      <input value={value} onChange={(event) => onChange(event.target.value)} className="mt-2 w-full rounded border bg-card px-3 py-2.5 text-sm outline-none focus:border-primary" />
    </label>
  );
}

function Textarea({ label, value, onChange, rows = 3 }: { label: string; value: string; onChange: (value: string) => void; rows?: number }) {
  return (
    <label className="block">
      <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">{label}</span>
      <textarea value={value} rows={rows} onChange={(event) => onChange(event.target.value)} className="mt-2 w-full rounded border bg-card px-3 py-2.5 text-sm leading-relaxed outline-none focus:border-primary" />
    </label>
  );
}
