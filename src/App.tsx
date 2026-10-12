import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteHeader } from "@/components/site/SiteHeader";
import { Toaster } from "@/components/ui/sonner";
import { legacyRedirects } from "@/data/site";
import { Link } from "@/lib/navigation";
import { About } from "@/routes/about";
import { Careers } from "@/routes/careers";
import { Contact } from "@/routes/contact";
import { Gallery } from "@/routes/gallery";
import { Home } from "@/routes/index";
import { Page as LivePanelCleaning } from "@/routes/live-panel-cleaning";
import { ServicePage } from "@/routes/services.$slug";
import { ServicesPage } from "@/routes/services.index";
import { useEffect, useMemo, useState } from "react";

function normalizePath(pathname: string) {
  return pathname.replace(/\/$/, "") || "/";
}

function usePathname() {
  const [pathname, setPathname] = useState(() => normalizePath(window.location.pathname));

  useEffect(() => {
    const onPopState = () => setPathname(normalizePath(window.location.pathname));
    const onClick = (event: MouseEvent) => {
      const target = (event.target as Element | null)?.closest("a");
      if (!target) return;
      const href = target.getAttribute("href");
      if (!href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) return;
      const url = new URL(href, window.location.href);
      if (url.origin !== window.location.origin || target.target) return;
      event.preventDefault();
      window.history.pushState(null, "", `${url.pathname}${url.search}${url.hash}`);
      setPathname(normalizePath(url.pathname));
      window.scrollTo({ top: 0, behavior: "smooth" });
    };

    window.addEventListener("popstate", onPopState);
    document.addEventListener("click", onClick);
    return () => {
      window.removeEventListener("popstate", onPopState);
      document.removeEventListener("click", onClick);
    };
  }, []);

  return [pathname, setPathname] as const;
}

export function App() {
  const [pathname, setPathname] = usePathname();

  useEffect(() => {
    const legacy = legacyRedirects[pathname.slice(1)];
    if (legacy) {
      window.history.replaceState(null, "", legacy);
      setPathname(normalizePath(legacy));
    }
  }, [pathname, setPathname]);

  const page = useMemo(() => {
    if (pathname === "/") return <Home />;
    if (pathname === "/about") return <About />;
    if (pathname === "/services") return <ServicesPage />;
    if (pathname === "/live-panel-cleaning") return <LivePanelCleaning />;
    if (pathname === "/gallery") return <Gallery />;
    if (pathname === "/careers") return <Careers />;
    if (pathname === "/contact") return <Contact />;

    const serviceMatch = pathname.match(/^\/services\/([^/]+)$/);
    if (serviceMatch?.[1]) return <ServicePage slug={decodeURIComponent(serviceMatch[1])} />;

    return <NotFound />;
  }, [pathname]);

  return (
    <>
      <SiteHeader />
      <main>{page}</main>
      <SiteFooter />
      <Toaster richColors position="top-center" />
    </>
  );
}

function NotFound() {
  return (
    <section className="grid min-h-[60vh] place-items-center bg-background px-4 py-24">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">The page you're looking for doesn't exist or has been moved.</p>
        <Link to="/" className="mt-6 inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90">
          Go home
        </Link>
      </div>
    </section>
  );
}
