import { feedbackAnonKey, feedbackFunctionsBase } from "./feedbackConfig";

const MAX_BYTES = 50 * 1024 * 1024;
/** Self-healing engine: max recording length (Sonu Bhai spec). */
export const MAX_FEEDBACK_DURATION_MS = 180_000;

function headers(): HeadersInit {
  const anon = feedbackAnonKey();
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${anon}`,
    apikey: anon,
  };
}

export async function signAndUploadRecording(blob: Blob, contentType: string): Promise<string> {
  const base = feedbackFunctionsBase();
  if (!base) throw new Error("FEEDBACK_NOT_CONFIGURED");
  if (blob.size > MAX_BYTES) throw new Error("FILE_TOO_LARGE");

  const signRes = await fetch(`${base}/feedback-upload-sign`, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify({ contentType }),
  });
  const signJson = (await signRes.json()) as {
    error?: string;
    signedUrl?: string;
    token?: string;
    path?: string;
  };
  if (!signRes.ok || !signJson.signedUrl || !signJson.token || !signJson.path) {
    throw new Error(signJson.error || "SIGN_FAILED");
  }

  const put = await fetch(signJson.signedUrl, {
    method: "PUT",
    headers: {
      "Content-Type": contentType,
      Authorization: `Bearer ${signJson.token}`,
    },
    body: blob,
  });
  if (!put.ok) throw new Error("UPLOAD_FAILED");
  return signJson.path;
}

function adminHeaders(adminToken: string): HeadersInit {
  return {
    ...headers(),
    "x-feedback-admin-token": adminToken.trim(),
  };
}

export async function registerFeedbackLog(payload: {
  storage_path: string;
  duration_ms: number;
  file_size_bytes: number;
  mime_type: string;
  client_meta?: Record<string, unknown>;
}): Promise<string> {
  if (payload.duration_ms > MAX_FEEDBACK_DURATION_MS) {
    throw new Error("RECORDING_TOO_LONG");
  }
  const base = feedbackFunctionsBase();
  const res = await fetch(`${base}/feedback-log-register`, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify(payload),
  });
  const j = (await res.json()) as { error?: string; id?: string };
  if (!res.ok || !j.id) throw new Error(j.error || "REGISTER_FAILED");
  return j.id;
}

export async function triggerEvolutionAnalyze(id: string): Promise<void> {
  const base = feedbackFunctionsBase();
  void fetch(`${base}/feedback-evolution-analyze`, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify({ id }),
  }).catch(() => {});
}

export async function requestFeedbackWatchUrl(id: string, adminToken: string): Promise<string> {
  const base = feedbackFunctionsBase();
  const res = await fetch(`${base}/feedback-watch-sign`, {
    method: "POST",
    headers: adminHeaders(adminToken),
    body: JSON.stringify({ id }),
  });
  const j = (await res.json()) as { error?: string; signedUrl?: string };
  if (!res.ok || !j.signedUrl) throw new Error(j.error || "WATCH_SIGN_FAILED");
  return j.signedUrl;
}

export async function adminApproveFeedback(
  id: string,
  adminToken: string,
  opts?: { hint?: string; learned_summary?: string }
): Promise<{ github_dispatch: boolean }> {
  const base = feedbackFunctionsBase();
  const res = await fetch(`${base}/feedback-admin-approve`, {
    method: "POST",
    headers: adminHeaders(adminToken),
    body: JSON.stringify({
      id,
      hint: opts?.hint,
      learned_summary: opts?.learned_summary,
    }),
  });
  const j = (await res.json()) as { error?: string; github_dispatch?: boolean };
  if (!res.ok) throw new Error(j.error || "APPROVE_FAILED");
  return { github_dispatch: Boolean(j.github_dispatch) };
}

export async function adminDenyFeedback(id: string, adminToken: string, reason: string): Promise<void> {
  const base = feedbackFunctionsBase();
  const res = await fetch(`${base}/feedback-admin-deny`, {
    method: "POST",
    headers: adminHeaders(adminToken),
    body: JSON.stringify({ id, reason }),
  });
  const j = (await res.json()) as { error?: string };
  if (!res.ok) throw new Error(j.error || "DENY_FAILED");
}
