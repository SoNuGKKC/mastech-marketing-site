# Laxman Rekha — Website vs core projects (Master Brain V2.2)

**Official MAS TECH website (public):** [MAS TECH](https://mastechsolution.netlify.app/) — update via **`docs/CANONICAL_LINKS.md`** + `MAS_TECH_SOLUTION/src/config/canonicalLinks.ts`.

## Isolation

1. **`MAS_TECH_SOLUTION/`** is a **standalone** marketing app with its own `package.json`, `node_modules`, and deploy target.
2. **Do not** import TypeScript/JS from `../frontend`, `../gas`, or any client-specific path.
3. **Allowed:** manually copied assets under `public/branding/` (logo-style mark only). No business logic copy-paste.

## Secrets

- **Never** commit `.env`. Use `.env.example` as the only tracked template.
- Contact form URL = `VITE_CONTACT_FORM_ENDPOINT` on the hosting provider (Netlify/Vercel), not in source.

## CSP & headers

- `public/_headers` (Netlify) and `<meta http-equiv="Content-Security-Policy">` in `index.html` are starting points.
- **After production cutover:** follow **`DEPLOYMENT_SECURITY.md`** §3 to tighten CSP so outbound data paths match only what you use (e.g. Google Apps Script / Sheet intake).

## Cursor / AI

When working in the monorepo: treat **`MAS_TECH_SOLUTION`** as a **separate product surface**. Refactors in Paradise Markcom must not silently change this site unless explicitly requested.
