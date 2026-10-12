import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Reveal({ children, className, delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e?.isIntersecting) {
          el.classList.add("is-visible");
          io.disconnect();
        }
      },
      { threshold: 0.12 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className={cn("reveal", className)} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

export function SectionHeading({ eyebrow, title, lead, invert, center }: { eyebrow: string; title: ReactNode; lead?: string; invert?: boolean; center?: boolean }) {
  return (
    <div className={cn("max-w-3xl", center && "mx-auto text-center")}>
      <span className="eyebrow">{eyebrow}</span>
      <h2 className={cn("mt-4 text-3xl font-extrabold leading-[1.05] md:text-5xl", invert ? "text-ink-foreground" : "text-foreground")}>{title}</h2>
      {lead && <p className={cn("mt-5 text-base leading-relaxed md:text-lg", invert ? "text-ink-muted" : "text-muted-foreground")}>{lead}</p>}
    </div>
  );
}
