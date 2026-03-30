# MISTAKES_LOG — MAS TECH Solution (marketing site)

Isolated from `Paradise_markcom_pvt_ltd` operational code. Log website/dev mistakes here only.

| Date | What happened | Fix / prevention |
|------|----------------|------------------|
| 2026-03-29 | Feedback Mic: screen + mic capture | **HTTPS / secure context** required (`localhost` OK). `getDisplayMedia` + `getUserMedia` — user **deny** = catch `NotAllowedError`, friendly toast (no stack spam). **Stop order:** `MediaRecorder.stop()` **pehle**, phir `track.stop()` — warna blob corrupt. iOS Safari: screen capture often **unsupported** — detect + message. Multiple audio tracks: prefer **AudioContext** mix; fallback single mic track. |
| 2026-03-29 | Self-healing engine: 3 min cap | **Max 180s** recording — client auto-stop + server `RECORDING_TOO_LONG`. Temp videos under `temp_feedback_storage/`; watch only via admin signed URL. |
| 2026-03-30 | Universal Jadu Gateway + cross-domain session | **Different sites = different origins:** `localStorage` and default Supabase session **do not** copy from marketing Netlify URL to `paradise-app.netlify.app` / `mis-admin.netlify.app`. Browsers **block** third-party cookie tricks across unrelated `*.netlify.app` hosts. **Do not** put `access_token` / `refresh_token` in query strings (referrers, logs, analytics). **Proper SSO:** host gateway + apps as **subdomains of one custom domain** (e.g. `www.mas-tech.com`, `app.mas-tech.com`, `admin.mas-tech.com`) and use Supabase **cookie** session + `cookieOptions.domain: '.mas-tech.com'` (or server middleware) so `sb-*-auth-token` is shared — see Supabase “auth across subdomains” patterns. Until then, gateway session persists **only** on the marketing origin; redirect sends users to child URLs **without** auto-login there unless child app signs in separately or domains are unified. |
| 2026-03-30 | Enterprise Auth Gateway — WebAuthn | **`rpID` must match the sign-in hostname** (e.g. Netlify subdomain). If production uses a **custom domain**, set Edge secret **`GATEWAY_WEBAUTHN_RP_ID`** to that hostname and add the same site to Supabase Auth redirect URLs. **`GATEWAY_ADMIN_MFA_WEBHOOK_URL`** is optional `https` only — use it to trigger your mobile push pipeline; it must **not** log raw tokens. Field binding uses **browser fingerprint**, not IMEI (unavailable on web). **MASTER_BRAIN** sheet demo device bypass (**three locked userId+phone pairs**) applies to **GAS `authLogin_`**, not this Supabase gateway — gateway trusts **JWT metadata** only. |
| _(add rows as you go)_ | | |

---

**V2.2 rule:** No client project Sheet IDs, pins, or GAS `exec` URLs in this folder’s git history — use `.env` + host env vars.
