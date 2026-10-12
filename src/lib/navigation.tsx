import React from "react";

type LinkProps = Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
  to: string;
  params?: Record<string, string>;
  activeProps?: { className?: string };
  activeOptions?: { exact?: boolean };
};

export function pathFor(to: string, params?: Record<string, string>) {
  let path = to;
  if (params) {
    for (const [key, value] of Object.entries(params)) {
      path = path.replace(`$${key}`, encodeURIComponent(value));
    }
  }
  return path.replace(/\/$/, "") || "/";
}

export function Link({ to, params, activeProps, activeOptions, className, ...props }: LinkProps) {
  const href = pathFor(to, params);
  const current = typeof window === "undefined" ? "" : window.location.pathname;
  const exact = activeOptions?.exact ?? false;
  const active = exact ? current === href : current === href || (href !== "/" && current.startsWith(`${href}/`));
  const activeClass = active ? activeProps?.className : undefined;

  return <a href={href} className={[className, activeClass].filter(Boolean).join(" ") || undefined} {...props} />;
}
