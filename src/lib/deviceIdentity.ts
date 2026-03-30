const DEVICE_KEY = "mas_gateway_device_id_v1";

function randomId(): string {
  const a = new Uint8Array(16);
  crypto.getRandomValues(a);
  return Array.from(a, (b) => b.toString(16).padStart(2, "0")).join("");
}

/** Stable per-browser device id (web cannot read IMEI — MASTER_BRAIN parity uses client-generated id). */
export function getOrCreateGatewayDeviceId(): string {
  try {
    const existing = localStorage.getItem(DEVICE_KEY);
    if (existing && existing.length >= 8) return existing;
    const next = `gw_${randomId()}`;
    localStorage.setItem(DEVICE_KEY, next);
    return next;
  } catch {
    return `gw_ephemeral_${randomId()}`;
  }
}

async function sha256Hex(text: string): Promise<string> {
  const enc = new TextEncoder().encode(String(text || ""));
  if (!crypto.subtle) {
    return "nohash_" + btoa(unescape(encodeURIComponent(String(text || "")))).slice(0, 200);
  }
  const buf = await crypto.subtle.digest("SHA-256", enc);
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

/** Same signal bundle as Paradise `frontend/app.js` `buildDeviceFingerprint_` (UA + platform + screen + DPR). */
export async function buildGatewayDeviceFingerprint(): Promise<string> {
  const ua = navigator.userAgent || "";
  const nav = navigator as Navigator & { userAgentData?: { platform?: string } };
  const pf = nav.userAgentData?.platform || navigator.platform || "";
  const sw = typeof screen !== "undefined" ? screen.width : 0;
  const sh = typeof screen !== "undefined" ? screen.height : 0;
  const dpr = typeof window.devicePixelRatio !== "undefined" ? window.devicePixelRatio : 1;
  try {
    return await sha256Hex([ua, pf, sw, sh, dpr].join("|"));
  } catch {
    return "fp_fallback_" + btoa(unescape(encodeURIComponent([ua, pf, sw, sh, dpr].join("|")))).slice(0, 200);
  }
}
