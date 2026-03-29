/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_CONTACT_FORM_ENDPOINT: string;
  /** Optional: full https URL to founder portrait (bypasses missing local JPG). */
  readonly VITE_FOUNDER_PHOTO_URL?: string;
  /** Optional: public contact email shown on Contact page (stakeholder-safe). */
  readonly VITE_PUBLIC_CONTACT_EMAIL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
