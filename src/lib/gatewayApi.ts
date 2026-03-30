import { feedbackAnonKey, feedbackSupabaseUrl } from "./feedbackConfig";

export type GatewayErrorBody = { error?: string; detail?: string; hint?: string };

export class GatewayRequestError extends Error {
  code: string;
  constructor(message: string, code: string) {
    super(message);
    this.code = code;
  }
}

export async function postGatewayFunction(
  functionName: string,
  body: Record<string, unknown>,
  accessToken: string
): Promise<Record<string, unknown>> {
  const base = feedbackSupabaseUrl();
  const key = feedbackAnonKey();
  if (!base || !key) throw new GatewayRequestError("Supabase not configured", "NO_SUPABASE");

  const res = await fetch(`${base}/functions/v1/${functionName}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: key,
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(body),
  });

  const data = (await res.json().catch(() => ({}))) as GatewayErrorBody & Record<string, unknown>;
  if (!res.ok) {
    const code = String(data.error || "REQUEST_FAILED");
    throw new GatewayRequestError(String(data.detail || data.hint || code), code);
  }
  return data;
}

export async function submitLeadDemo(payload: {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  message?: string;
}): Promise<void> {
  const base = feedbackSupabaseUrl();
  const key = feedbackAnonKey();
  if (!base || !key) throw new GatewayRequestError("Supabase not configured", "NO_SUPABASE");

  const res = await fetch(`${base}/functions/v1/lead-inquiry-submit`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: key,
    },
    body: JSON.stringify({ ...payload, source: "book_demo" }),
  });

  const data = (await res.json().catch(() => ({}))) as GatewayErrorBody;
  if (!res.ok) {
    throw new GatewayRequestError(String(data.detail || data.error || "Lead submit failed"), String(data.error || "FAILED"));
  }
}
