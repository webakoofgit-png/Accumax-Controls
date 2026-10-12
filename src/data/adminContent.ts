import type { Service } from "./site";

export const ADMIN_CONTENT_KEY = "accumax-admin-content";

export type AdminContent = {
  company?: {
    tagline?: string;
    email?: string;
    phones?: string[];
    whatsapp?: string;
    address?: string;
    mapEmbed?: string;
  };
  intro?: string;
  whyChoose?: string;
  stats?: { value: number; label: string }[];
  services?: Pick<Service, "slug" | "name" | "image" | "intro">[];
  about?: {
    paragraphs?: string[];
    mission?: string;
    vision?: string;
  };
  panelCleaning?: {
    intro?: string;
    whyTitle?: string;
    why?: string;
    image?: string;
  };
  gallery?: string[];
  videos?: string[];
};

export function getAdminContent(): AdminContent {
  if (typeof window === "undefined") return {};

  try {
    const raw = window.localStorage.getItem(ADMIN_CONTENT_KEY);
    return raw ? (JSON.parse(raw) as AdminContent) : {};
  } catch {
    return {};
  }
}

export function saveAdminContent(content: AdminContent) {
  window.localStorage.setItem(ADMIN_CONTENT_KEY, JSON.stringify(content));
}

export function clearAdminContent() {
  window.localStorage.removeItem(ADMIN_CONTENT_KEY);
}
