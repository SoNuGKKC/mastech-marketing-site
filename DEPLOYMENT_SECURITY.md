# MAS TECH Solution — Deployment & security (Master Brain V2.2)

## 1. Environment safety — `VITE_CONTACT_FORM_ENDPOINT`

| Rule | Why |
|------|-----|
| **Never** put the real GAS / form URL in source code, README, or chat logs you publish. | Anyone can scrape it and spam your Sheet. |
| **Only** use a local **`.env`** file (already **gitignored** in `MAS_TECH_SOLUTION/.gitignore` and repo root `.gitignore`). | Secrets stay off GitHub. |
| **Production:** set the variable in **Netlify** (or Vercel) **Site settings → Environment variables** — same name: `VITE_CONTACT_FORM_ENDPOINT`. | Build-time inject; not visible in repo. |
| Redeploy after changing env vars. | Vite bakes `VITE_*` at build time. |

`.env.example` stays in git **without** real values — template only.

---

## 2. Branding sync (Paradise × MAS TECH website)

`public/branding/mark.svg` is kept in sync with:

`Paradise_markcom_pvt_ltd/frontend/assets/paradise-markcom-logo.svg`

Same **PM** mark = one visual identity across projects. If the Paradise asset changes, copy it here again (no business logic, asset only).

---

## 3. CSP tightening — after the site is live

**Today (dev + first deploy):** `connect-src` allows `https://script.google.com` and `https://script.googleusercontent.com` so GAS `fetch` works from any deployment.

**When you are stable:**

1. Note your exact Web App URL, e.g.  
   `https://script.google.com/macros/s/AKfycb........../exec`
2. Prefer **not** to put the full secret ID in CSP if you rotate deployments — keeping `script.google.com` + `script.googleusercontent.com` is already a strong boundary for many teams.
3. **Stricter option:** add only your deployment origin if your host supports it, e.g. tighten `connect-src` to:
   - `'self'`
   - `https://script.google.com`
   - `https://script.googleusercontent.com`  
   and remove any other APIs you do not use.

4. Edit **both**:
   - `index.html` — `<meta http-equiv="Content-Security-Policy" ...>`
   - `public/_headers` — Netlify (production)

5. If you **stop** using Google Fonts CDN, remove `https://fonts.googleapis.com` and `https://fonts.gstatic.com` from `style-src` / `font-src` and self-host Playfair instead.

6. **Test** Contact form + `npm run dev` after each CSP change (browser console will show CSP violations).

---

## 4. Local build (Sonu bhai checklist)

```bash
cd MAS_TECH_SOLUTION
npm install
npm run dev
```

- Confirm hero: **You ASK. We AUTOMATE.**
- Confirm **GURJAR** / Founder section + footer **Gold Standard** line.
- **Contact test:** submit the form with `VITE_CONTACT_FORM_ENDPOINT` set locally to your GAS `exec` URL; verify the row in the **intake Sheet** (not client ops sheets).

---

## 5. Incident habit

Log slip-ups (committed `.env`, leaked URL, etc.) in **`MISTAKES_LOG.md`** in this folder only.
