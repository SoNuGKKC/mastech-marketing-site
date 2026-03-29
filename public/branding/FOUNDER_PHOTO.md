# Founder photo — **kyun SG / placeholder dikh raha hai?**

Founder section shows **two portraits:** Sonu (left) + Manthan (right). Sonu tries **in order:** `VITE_FOUNDER_PHOTO_URL` (optional) → **`sonu_manthan.jpg`** → **`gurjar-sonu.jpeg`** → `sonu.jpeg` → `founder-sonu-gurjar.jpg` / `.png` → `image_13.png`. Manthan uses **`manthan-gurjar.jpeg`**.  
Agar sab fail → chhota text message (no SG monogram).

## Fix 1 — Repo me file add karo (recommended)

1. Sonu: **`public/branding/sonu_manthan.jpg`** or **`gurjar-sonu.jpeg`** or **`sonu.jpeg`**. (Alternatives: `founder-sonu-gurjar.jpg`, `.png`, `image_13.png`.)
2. Manthan: **`public/branding/manthan-gurjar.jpeg`**
3. **Git commit + push**, phir Netlify **redeploy**.
4. Local: `npm run build` → `dist/branding/` me wahi file dikhni chahiye.

> **Case sensitive:** Netlify (Linux) pe `Founder-Sonu-Gurjar.JPG` ≠ `founder-sonu-gurjar.jpg` — naam exact match karo.

## Fix 2 — Bina git binary: Netlify env URL

1. Photo kahi bhi **https** par host karo (Drive public link nahi — direct image URL chahiye; Cloudinary / Imgur direct / your server).
2. Netlify → **Site configuration → Environment variables** → add:
   - Key: **`VITE_FOUNDER_PHOTO_URL`**
   - Value: **`https://.../your-photo.jpg`**
3. **Redeploy** (env vars sirf **nayi build** me bake hote hain).

Code: `src/components/FounderNote.tsx` — env URL, phir JPG, PNG, `image_13.png` (auto fallback).

## Face merge workflow

Real + AI composite ke liye: **`docs/FOUNDER_FACE_MERGE_WORKFLOW.md`** (repo root).
