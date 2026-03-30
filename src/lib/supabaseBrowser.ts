import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { feedbackAnonKey, feedbackSupabaseUrl } from "./feedbackConfig";

let singleton: SupabaseClient | null = null;

/**
 * Single browser client for marketing site: Feedback engine + Universal Jadu Gateway auth.
 * Uses default Supabase storage key for this project (localStorage on this origin only).
 */
export function getSupabaseBrowser(): SupabaseClient | null {
  const url = feedbackSupabaseUrl();
  const key = feedbackAnonKey();
  if (!url || !key) return null;
  if (!singleton) {
    singleton = createClient(url, key, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
      },
    });
  }
  return singleton;
}
