import { useCallback, useEffect, useRef, useState } from "react";
import { feedbackEngineConfigured } from "../../lib/feedbackConfig";
import { registerFeedbackLog, signAndUploadRecording, triggerEvolutionAnalyze } from "../../lib/feedbackSubmit";
import {
  buildScreenWithVoiceStream,
  pickRecorderMime,
  startRecording as beginMediaRecorderCapture,
  type RecorderSession,
} from "../../lib/screenVoiceRecorder";

type Phase = "idle" | "recording" | "uploading" | "done" | "error";

function humanErr(code: string): string {
  switch (code) {
    case "HTTPS_REQUIRED":
      return "Screen capture ke liye HTTPS zaroori hai.";
    case "SCREEN_CAPTURE_UNAVAILABLE":
      return "Is browser / device par screen record support nahi mila.";
    case "FEEDBACK_NOT_CONFIGURED":
      return "Feedback engine abhi configure nahi — VITE_SUPABASE_* env set karo.";
    case "FILE_TOO_LARGE":
      return "Recording 50MB se chhoti honi chahiye.";
    case "NotAllowedError":
    case "PermissionDeniedError":
      return "Permission cancel / block — mic ya screen share allow karo.";
    default:
      return code || "Kuch galat ho gaya — dubara try karo.";
  }
}

export default function FeedbackMicFab() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [toast, setToast] = useState<string | null>(null);
  const [showSlowUploadHint, setShowSlowUploadHint] = useState(false);
  const sessionRef = useRef<RecorderSession | null>(null);
  const recorderRef = useRef<{ stop: () => Promise<Blob> } | null>(null);
  const startedAt = useRef(0);
  const slowHintTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearSlowTimer = () => {
    if (slowHintTimer.current) {
      clearTimeout(slowHintTimer.current);
      slowHintTimer.current = null;
    }
    setShowSlowUploadHint(false);
  };

  useEffect(() => {
    return () => {
      clearSlowTimer();
      sessionRef.current?.stopAll();
    };
  }, []);

  const stopRecording = useCallback(async () => {
    const rec = recorderRef.current;
    const sess = sessionRef.current;
    recorderRef.current = null;
    if (!rec || !sess) {
      setPhase("idle");
      return;
    }
    setPhase("uploading");
    clearSlowTimer();
    slowHintTimer.current = setTimeout(() => setShowSlowUploadHint(true), 1000);

    const duration_ms = Math.max(0, Date.now() - startedAt.current);
    let blob: Blob;
    try {
      blob = await rec.stop();
      sess.stopAll();
      sessionRef.current = null;
    } catch {
      sessionRef.current?.stopAll();
      sessionRef.current = null;
      setToast(humanErr("RECORDER_ERROR"));
      setPhase("error");
      clearSlowTimer();
      return;
    }

    if (!feedbackEngineConfigured()) {
      setToast(humanErr("FEEDBACK_NOT_CONFIGURED"));
      setPhase("error");
      clearSlowTimer();
      return;
    }

    const mime = blob.type || "video/webm";
    const ct = mime.includes("mp4") ? "video/mp4" : "video/webm";

    try {
      const path = await signAndUploadRecording(blob, ct);
      const id = await registerFeedbackLog({
        storage_path: path,
        duration_ms,
        file_size_bytes: blob.size,
        mime_type: ct,
        client_meta: {
          ua: navigator.userAgent,
          w: window.innerWidth,
          h: window.innerHeight,
          path: window.location.pathname,
        },
      });
      void triggerEvolutionAnalyze(id);
      setPhase("done");
      setToast("Feedback vault me save ho gaya. Evolution queue process ho rahi hai.");
      setTimeout(() => {
        setPhase("idle");
        setToast(null);
      }, 3200);
    } catch (e) {
      const msg = e instanceof Error ? e.message : "UPLOAD_FAILED";
      setToast(humanErr(msg));
      setPhase("error");
    } finally {
      clearSlowTimer();
    }
  }, []);

  const beginFeedbackCapture = useCallback(async () => {
    if (!feedbackEngineConfigured()) {
      setToast(humanErr("FEEDBACK_NOT_CONFIGURED"));
      setPhase("error");
      setTimeout(() => setPhase("idle"), 3000);
      return;
    }
    setToast(null);
    try {
      const sess = await buildScreenWithVoiceStream();
      sessionRef.current = sess;
      const mime = pickRecorderMime();
      recorderRef.current = beginMediaRecorderCapture(sess.stream, mime);
      startedAt.current = Date.now();
      setPhase("recording");
    } catch (e) {
      const name = e instanceof Error ? e.name : "";
      const code = e instanceof Error ? e.message : "";
      setToast(humanErr(name || code));
      setPhase("error");
      sessionRef.current?.stopAll();
      sessionRef.current = null;
      setTimeout(() => setPhase("idle"), 4000);
    }
  }, []);

  const onFabClick = () => {
    if (phase === "recording") {
      void stopRecording();
      return;
    }
    if (phase === "uploading") return;
    void beginFeedbackCapture();
  };

  if (!import.meta.env.PROD && import.meta.env.VITE_SHOW_FEEDBACK_FAB === "false") {
    return null;
  }

  return (
    <>
      {phase === "recording" && (
        <div
          className="pointer-events-none fixed inset-0 z-[90] flex items-center justify-center bg-black/45 px-4"
          aria-hidden
        >
          <div className="feedback-pulse-shell w-full max-w-3xl rounded-xl border-2 border-red-500/70 shadow-[0_0_40px_rgba(239,68,68,0.35)]">
            <div className="aspect-video w-full rounded-lg bg-black/80" />
          </div>
        </div>
      )}

      {toast && (
        <div
          role="status"
          className="fixed bottom-24 right-6 z-[95] max-w-xs rounded-lg border border-white/15 bg-mas-bg/95 px-4 py-3 text-sm text-white shadow-lg"
        >
          {toast}
        </div>
      )}

      <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end gap-2">
        {phase === "uploading" && (
          <div className="rounded-lg border border-sky-500/30 bg-black/80 px-3 py-2 text-xs text-sky-100">
            Uploading…
            {showSlowUploadHint ? <span className="ml-2 inline-block h-2 w-2 animate-pulse rounded-full bg-sky-400" /> : null}
          </div>
        )}
        <button
          type="button"
          onClick={onFabClick}
          disabled={phase === "uploading" || phase === "done"}
          className={`flex h-14 w-14 items-center justify-center rounded-full shadow-lg transition ${
            phase === "recording"
              ? "bg-red-600 text-white ring-4 ring-red-500/50 animate-pulse"
              : "bg-gradient-to-br from-amber-500 to-orange-600 text-mas-bg hover:brightness-110"
          }`}
          aria-label={phase === "recording" ? "Stop recording and upload" : "Start screen feedback recording"}
          title="MAS TECH Feedback Mic"
        >
          {phase === "recording" ? (
            <svg className="h-7 w-7" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <rect x="6" y="6" width="12" height="12" rx="2" />
            </svg>
          ) : (
            <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
              <path d="M12 14a3 3 0 0 0 3-3V5a3 3 0 0 0-6 0v6a3 3 0 0 0 3 3z" strokeLinecap="round" />
              <path d="M19 10v1a7 7 0 0 1-14 0v-1M12 18v4M8 22h8" strokeLinecap="round" />
            </svg>
          )}
        </button>
      </div>
    </>
  );
}
