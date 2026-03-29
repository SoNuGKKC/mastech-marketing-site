# Netlify auto-deploy — MAS TECH marketing site

Canonical folder: **`D:\MAS TECH\MAS_TECH_SOLUTION`**.  
Live URL: [mastechsolution.netlify.app](https://mastechsolution.netlify.app/) (Paradise repo: `docs/CANONICAL_LINKS.md` for link sync).

---

## Canonical flow — Netlify “Link site to Git” only

**GitHub Actions workflow is intentionally not used** (avoids double deploy with Netlify’s own Git builds).

1. GitHub repo root = this folder (`package.json` at repo root).
2. Netlify → **mastechsolution** → **Build & deploy** → **Continuous deployment** → repo **`SoNuGKKC/mastech-marketing-site`**, branch **`main`**.
3. **Base directory** empty, **Build** `npm run build`, **Publish** `dist`.
4. **Environment variables** on Netlify for any **`VITE_*`** you need.
5. Every **`git push origin main`** → Netlify runs one production deploy.

You do **not** need **`NETLIFY_AUTH_TOKEN`** / **`NETLIFY_SITE_ID`** in GitHub Secrets for this setup. If you added them earlier, you can delete those secrets from GitHub (optional cleanup).

---

## Local quick deploy (backup / emergency)

```powershell
cd "D:\MAS TECH\MAS_TECH_SOLUTION"
npm run build
npx netlify-cli deploy --prod --dir=dist
```

(`netlify login` + `netlify link` once on this PC if using CLI.)
