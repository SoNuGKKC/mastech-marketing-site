import { feedbackAnonKey, feedbackFunctionsBase } from "./feedbackConfig";

const MAX_BYTES = 50 * 1024 * 1024;

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

export async function registerFeedbackLog(payload: {
  storage_path: string;
  duration_ms: number;
  file_size_bytes: number;
  mime_type: string;
  client_meta?: Record<string, unknown>;
}): Promise<string> {
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
