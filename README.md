# MAS TECH Solution — marketing website

**Live / canonical URL:** [MAS TECH official site](https://mastechsolution.netlify.app/) · _source of truth:_ [`../docs/CANONICAL_LINKS.md`](../docs/CANONICAL_LINKS.md) · _code constant:_ `src/config/canonicalLinks.ts`

**Tagline:** *You ASK. We AUTOMATE.*

Professional, isolated SaaS-style site for MAS TECH — **not** wired to Paradise Markcom production data.

## Quick start

```bash
cd MAS_TECH_SOLUTION
cp .env.example .env
# Edit .env — set VITE_CONTACT_FORM_ENDPOINT to your GAS / serverless URL
npm install
npm run dev
```

Open `http://localhost:5174`.

## Build & deploy

```bash
npm run build
```

- **Netlify:** `netlify.toml` included; `public/_headers` + `public/_redirects` for SPA + security headers.
- Set **`VITE_CONTACT_FORM_ENDPOINT`** in the host UI (environment variables), not in git.
- **Founder photo on Home:** default **`public/branding/sonu.jpeg`** (see **`public/branding/FOUNDER_PHOTO.md`**). Optional **`VITE_FOUNDER_PHOTO_URL`** overrides. Redeploy after adding the file.

## Auto-deploy (Netlify)

**Netlify linked to this GitHub repo** — `git push` to **`main`** triggers a single Netlify build (no GitHub Actions). Details: **`NETLIFY_AUTO_DEPLOY.md`**.

## Security (zero-leak)

- No Google Sheet IDs or API keys in this codebase.
- **`VITE_CONTACT_FORM_ENDPOINT`**: local `.env` only; **production = Netlify/Vercel env vars** (never paste the GAS URL in git).
- Root repo `.gitignore` also ignores `MAS_TECH_SOLUTION/.env*`.
- See **`DEPLOYMENT_SECURITY.md`** (V2.2 deploy + CSP tightening), **`LAXMAN_REKHA_WEBSITE.md`**, **`MISTAKES_LOG.md`**.

## Brand assets

- **`public/branding/mas-trishul-seal.svg`** — **founder seal** (gold Trishul) used in **`src/components/Header.tsx`** + favicon. **No PM mark** in the site header.
- `public/branding/mark.svg` — legacy client PM asset; **not** used in the marketing header (see `MASTER_BRAIN.md` §0.5).
- **Founder portrait:** `public/branding/sonu.jpeg` (see `public/branding/FOUNDER_PHOTO.md`). **GURJAR** surname uses **Playfair Display** + gold accent on Home & About.
- Footer signature: **© 2026 MAS TECH Automation — A GURJAR Enterprise.** (`GURJAR` in Playfair + gold — all pages).

## Pages

| Path | Content |
|------|---------|
| `/` | Hero, case study (anonymized), pricing tiers, **Get Free Audit** |
| `/solutions` | Field tracking, inventory automation |
| `/about` | Positioning |
| `/contact` | Demo / lead form → env-configured endpoint |

---

**Business:** Free audit CTA, tiered pricing narrative, trust badge on every page via shared layout.
