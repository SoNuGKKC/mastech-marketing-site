# MISTAKES_LOG — MAS TECH Solution (marketing site)

Isolated from `Paradise_markcom_pvt_ltd` operational code. Log website/dev mistakes here only.

| Date | What happened | Fix / prevention |
|------|----------------|------------------|
| 2026-03-29 | Feedback Mic: screen + mic capture | **HTTPS / secure context** required (`localhost` OK). `getDisplayMedia` + `getUserMedia` — user **deny** = catch `NotAllowedError`, friendly toast (no stack spam). **Stop order:** `MediaRecorder.stop()` **pehle**, phir `track.stop()` — warna blob corrupt. iOS Safari: screen capture often **unsupported** — detect + message. Multiple audio tracks: prefer **AudioContext** mix; fallback single mic track. |
| _(add rows as you go)_ | | |

---

**V2.2 rule:** No client project Sheet IDs, pins, or GAS `exec` URLs in this folder’s git history — use `.env` + host env vars.
