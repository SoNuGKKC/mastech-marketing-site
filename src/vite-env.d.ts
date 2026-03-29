/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_CONTACT_FORM_ENDPOINT?: string;
  /** Optional: full https URL to founder portrait (bypasses missing local JPG). */
  readonly VITE_FOUNDER_PHOTO_URL?: string;
  /** Optional: public contact email shown on Contact page (stakeholder-safe). */
  readonly VITE_PUBLIC_CONTACT_EMAIL?: string;
  /** Supabase project URL (Feedback Mic + Evolution engine). */
  readonly VITE_SUPABASE_URL?: string;
  /** Supabase anon key (public; only invokes Edge Functions — no service role here). */
  readonly VITE_SUPABASE_ANON_KEY?: string;
  /** Dev only: set "false" to hide Feedback FAB. */
  readonly VITE_SHOW_FEEDBACK_FAB?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
