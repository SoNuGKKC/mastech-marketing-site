# MAS TECH — Choice B Deploy Guide
# Ye 4 files apne existing project mein replace karo

## STEP 1 — Files copy karo

Apne computer pe ye folder kholo:
D:\MAS TECH\MAS_TECH_SOLUTION\

Phir ye files REPLACE karo (purani files over-write ho jayengi):

| Ye NEW file                        | Isko YAHAN paste karo                          |
|------------------------------------|------------------------------------------------|
| src/pages/Home.tsx                 | src/pages/Home.tsx          (REPLACE)          |
| src/components/Header.tsx          | src/components/Header.tsx   (REPLACE)          |
| src/components/Footer.tsx          | src/components/Footer.tsx   (REPLACE)          |
| src/components/FounderNote.tsx     | src/components/FounderNote.tsx (REPLACE)       |
| src/index.css                      | src/index.css               (REPLACE)          |

## STEP 2 — tailwind.config.js mein fonts add karo

Apna tailwind.config.js kholo aur theme.extend mein ye add karo:

  fontFamily: {
    cinzel: ['"Cinzel"', 'serif'],
    playfair: ['"Playfair Display"', 'serif'],
    cormorant: ['"Cormorant Garamond"', 'serif'],
  },

## STEP 3 — Local test karo

VS Code terminal mein:
  cd "D:\MAS TECH\MAS_TECH_SOLUTION"
  npm run dev

Browser mein kholo: http://localhost:5174
Check karo:
  ✅ Trishul nav mein dikh raha hai
  ✅ GURJAR gold text hero mein hai
  ✅ Founder section dikh raha hai
  ✅ Footer mein "A GURJAR Enterprise" hai

## STEP 4 — Build aur deploy

  npm run build
  git add .
  git commit -m "feat: new premium design with exact Trishul + GURJAR identity"
  git push origin main

Netlify auto-deploy ho jayegi 2-3 minutes mein.

## IMPORTANT — Kuch bhi DELETE MAT KARO

Ye files TOUCH MAT KARO:
  - src/components/TrustBadge.tsx      (waise hi rakhna)
  - src/components/BookDemoSection.tsx  (waise hi rakhna)
  - src/config/canonicalLinks.ts        (waise hi rakhna)
  - src/pages/Contact.tsx               (waise hi rakhna)
  - src/pages/Solutions.tsx             (waise hi rakhna)
  - src/pages/About.tsx                 (waise hi rakhna)
  - src/pages/LoginAdmin.tsx            (waise hi rakhna)
  - src/pages/LoginField.tsx            (waise hi rakhna)
  - .env                                (KABHI DELETE MAT KARO)
  - public/branding/mas-trishul-seal.svg (already hai ✅)

## Agar kuch issue aaye

npm run dev pe error aaye to check karo:
  1. tailwind.config.js mein fontFamily add hua ya nahi
  2. src/index.css replace hua ya nahi

Jai Shree Ram 🚩
