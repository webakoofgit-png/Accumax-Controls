import { createFileRoute, notFound, redirect } from "@tanstack/react-router";
import { legacyRedirects } from "@/data/site";

// Keeps old .php URLs from the previous website working.
export const Route = createFileRoute("/$page")({
  beforeLoad: ({ params }) => {
    const to = legacyRedirects[params.page];
    if (to) throw redirect({ href: to, statusCode: 301 });
    throw notFound();
  },
  component: () => null,
});
