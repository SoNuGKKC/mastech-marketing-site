/** Supabase project URL, e.g. https://xxxx.supabase.co */
export function feedbackSupabaseUrl(): string {
  return (import.meta.env.VITE_SUPABASE_URL || "").replace(/\/$/, "");
}

export function feedbackAnonKey(): string {
  return import.meta.env.VITE_SUPABASE_ANON_KEY || "";
}

export function feedbackFunctionsBase(): string {
  const u = feedbackSupabaseUrl();
  if (!u) return "";
  return `${u}/functions/v1`;
}

export function feedbackEngineConfigured(): boolean {
  return Boolean(feedbackSupabaseUrl() && feedbackAnonKey());
}
