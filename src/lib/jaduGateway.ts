import type { User } from "@supabase/supabase-js";

export type JaduProfile = { org: string; role: string };

/** Reads org/role from JWT claims: app_metadata first (trusted), then user_metadata. */
export function readJaduProfile(user: User): JaduProfile {
  const app = (user.app_metadata || {}) as Record<string, unknown>;
  const meta = (user.user_metadata || {}) as Record<string, unknown>;
  const org = String(meta.org ?? app.org ?? "")
    .trim()
    .toLowerCase();
  const role = String(meta.role ?? app.role ?? "")
    .trim()
    .toLowerCase();
  return { org, role };
}

function envUrl(key: "VITE_JADU_PARADISE_FIELD_URL" | "VITE_JADU_PARADISE_ADMIN_URL", fallback: string): string {
  const raw = import.meta.env[key] as string | undefined;
  const u = (raw && String(raw).trim()) || fallback;
  return u.replace(/\/+$/, "");
}

/**
 * Universal Jadu redirect targets. Configure via env on Netlify when URLs change.
 */
export function resolveJaduTargetUrl(profile: JaduProfile): string | null {
  const { org, role } = profile;
  if (org === "paradise" && role === "field") {
    return `${envUrl("VITE_JADU_PARADISE_FIELD_URL", "https://paradise-app.netlify.app")}/`;
  }
  if (org === "paradise" && role === "admin") {
    return `${envUrl("VITE_JADU_PARADISE_ADMIN_URL", "https://mis-admin.netlify.app")}/`;
  }
  return null;
}
