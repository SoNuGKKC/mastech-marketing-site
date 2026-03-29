# Netlify auto-deploy — MAS TECH marketing site

Canonical folder: **`D:\MAS TECH\MAS_TECH_SOLUTION`**.  
Live URL: [mastechsolution.netlify.app](https://mastechsolution.netlify.app/) (see `docs/CANONICAL_LINKS.md` in Paradise repo if you sync links).

---

## Option A — Netlify “Link site to Git” (simplest)

No GitHub Actions secrets needed; Netlify builds on **their** servers.

1. Push **this folder** as its **own** GitHub repository (root = `package.json` here, not monorepo).
2. Netlify → **mastechsolution** → **Project configuration** → **Build & deploy** → **Continuous deployment** → **Link repository**.
3. Pick the repo, branch **`main`**, leave **Base directory** empty, **Build command** `npm run build`, **Publish directory** `dist`.
4. Add **Environment variables** on Netlify (`VITE_*` from old setup if any).
5. Every **`git push origin main`** → new production deploy automatically.

---

## Option B — GitHub Actions (this repo includes `.github/workflows/deploy-netlify.yml`)

Use when you prefer build logs in GitHub or Netlify Git link is not used.

### One-time secrets (GitHub → repo → **Settings** → **Secrets and variables** → **Actions**)

| Secret | Where to get it |
|--------|------------------|
| `NETLIFY_AUTH_TOKEN` | Netlify → **User settings** → **Applications** → **Personal access tokens** → New token |
| `NETLIFY_SITE_ID` | Netlify → **mastechsolution** → **Site configuration** → **General** → **Site details** → **Site ID** |

### Triggers

- **Automatic:** every push to **`main`**.
- **Manual / “jab chaho”:** GitHub → **Actions** → **Deploy marketing site (Netlify)** → **Run workflow** (no extra question — you click when you want).

### After first success

Set `websiteDeployPending` to `false` in `PROJECT_LOG.json` when you confirm the live site.

---

## Local quick deploy (backup)

```powershell
cd "D:\MAS TECH\MAS_TECH_SOLUTION"
npm run build
npx netlify-cli deploy --prod --dir=dist
```

(`netlify login` and `netlify link` once on this PC if not using tokens.)
