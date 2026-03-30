/** Field: PIN + device verify completed (this tab). Aligned with gateway-field-verify — not a cookie across domains. */
export const FIELD_GATEWAY_TS_KEY = "mas_field_gateway_v1";
/** Admin: WebAuthn step completed (this tab). Admins exempt from field device binding per gateway policy + MASTER_BRAIN privileged pattern. */
export const ADMIN_MFA_TS_KEY = "mas_admin_mfa_v1";

const FIELD_TTL_MS = 12 * 60 * 60 * 1000;
const ADMIN_TTL_MS = 8 * 60 * 60 * 1000;

export function setFieldGatewayVerified(): void {
  try {
    sessionStorage.setItem(FIELD_GATEWAY_TS_KEY, String(Date.now()));
  } catch {
    /* ignore */
  }
}

export function setAdminMfaVerified(): void {
  try {
    sessionStorage.setItem(ADMIN_MFA_TS_KEY, String(Date.now()));
  } catch {
    /* ignore */
  }
}

function readTs(key: string): number {
  try {
    const v = sessionStorage.getItem(key);
    if (!v) return 0;
    const n = Number(v);
    return Number.isFinite(n) ? n : 0;
  } catch {
    return 0;
  }
}

export function isFieldGatewayFresh(): boolean {
  const t = readTs(FIELD_GATEWAY_TS_KEY);
  return t > 0 && Date.now() - t <= FIELD_TTL_MS;
}

export function isAdminMfaFresh(): boolean {
  const t = readTs(ADMIN_MFA_TS_KEY);
  return t > 0 && Date.now() - t <= ADMIN_TTL_MS;
}

export function clearGatewaySessionFlags(): void {
  try {
    sessionStorage.removeItem(FIELD_GATEWAY_TS_KEY);
    sessionStorage.removeItem(ADMIN_MFA_TS_KEY);
  } catch {
    /* ignore */
  }
}
