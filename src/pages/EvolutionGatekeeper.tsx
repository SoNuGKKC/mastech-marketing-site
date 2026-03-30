import { useCallback, useState } from "react";
import { feedbackAnonKey, feedbackFunctionsBase } from "../lib/feedbackConfig";
import {
  adminApproveFeedback,
  adminDenyFeedback,
  requestFeedbackWatchUrl,
} from "../lib/feedbackSubmit";

type Row = {
  id: string;
  created_at: string;
  storage_path: string;
  duration_ms: number | null;
  file_size_bytes: number | null;
  evolution_status: string;
  proposed_diff: string | null;
  evolution_notes: string | null;
  approved_at: string | null;
  denied_at?: string | null;
};

const TOKEN_KEY = "mas_feedback_admin_token";

export default function EvolutionGatekeeper() {
  const [token, setToken] = useState(() => sessionStorage.getItem(TOKEN_KEY) || "");
  const [items, setItems] = useState<Row[]>([]);
  const [msg, setMsg] = useState<string | null>(null);
  const [loadState, setLoadState] = useState<"idle" | "loading">("idle");
  const [learnNote, setLearnNote] = useState("");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [denyId, setDenyId] = useState<string | null>(null);
  const [denyReason, setDenyReason] = useState("");
  const [rowBusy, setRowBusy] = useState<Record<string, string>>({});

  const base = feedbackFunctionsBase();
  const anon = feedbackAnonKey();

  const setBusy = (id: string, label: string | null) => {
    setRowBusy((prev) => {
      const next = { ...prev };
      if (label) next[id] = label;
      else delete next[id];
      return next;
    });
  };

  const loadQueue = useCallback(async () => {
    if (!base || !anon || !token.trim()) {
      setMsg("Supabase env + admin token dono chahiye.");
      return;
    }
    setLoadState("loading");
    setMsg(null);
    try {
      sessionStorage.setItem(TOKEN_KEY, token.trim());
      const r = await fetch(`${base}/feedback-evolution-queue`, {
        headers: {
          Authorization: `Bearer ${anon}`,
          apikey: anon,
          "x-feedback-admin-token": token.trim(),
        },
      });
      const j = (await r.json()) as { ok?: boolean; items?: Row[]; error?: string };
      if (!r.ok) throw new Error(j.error || "LOAD_FAILED");
      setItems(j.items || []);
    } catch (e) {
      setMsg(e instanceof Error ? e.message : "LOAD_FAILED");
    } finally {
      setLoadState("idle");
    }
  }, [base, anon, token]);

  const watch = async (id: string) => {
    if (!token.trim()) return;
    setBusy(id, "Opening…");
    setMsg(null);
    try {
      const url = await requestFeedbackWatchUrl(id, token);
      window.open(url, "_blank", "noopener,noreferrer");
    } catch (e) {
      setMsg(e instanceof Error ? e.message : "WATCH_FAILED");
    } finally {
      setBusy(id, null);
    }
  };

  const approve = async (id: string) => {
    if (!token.trim()) return;
    setBusy(id, "Approve…");
    setMsg(null);
    try {
      const { github_dispatch } = await adminApproveFeedback(id, token, {
        hint: "MAS marketing gatekeeper",
        learned_summary: learnNote.trim() || undefined,
      });
      setMsg(
        github_dispatch
          ? "Approved — video removed, memory saved, GitHub workflow trigger bheja (agar repo secrets set hain)."
          : "Approved — video removed + evolution_memory save. GitHub auto-deploy: Supabase me GITHUB_FEEDBACK_DISPATCH_* set karo."
      );
      setLearnNote("");
      await loadQueue();
    } catch (e) {
      setMsg(e instanceof Error ? e.message : "APPROVE_FAILED");
    } finally {
      setBusy(id, null);
    }
  };

  const confirmDeny = async () => {
    if (!denyId || !token.trim()) return;
    const reason = denyReason.trim();
    if (reason.length < 3) {
      setMsg("Deny ke liye reason (min 3 chars) likho.");
      return;
    }
    setBusy(denyId, "Deny…");
    setMsg(null);
    try {
      await adminDenyFeedback(denyId, token, reason);
      setMsg("Denied — video delete + evolution_memory (mistake) save.");
      setDenyId(null);
      setDenyReason("");
      await loadQueue();
    } catch (e) {
      setMsg(e instanceof Error ? e.message : "DENY_FAILED");
    } finally {
      setBusy(denyId, null);
    }
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-16">
      <h1 className="text-2xl font-black text-white md:text-3xl">Sonu Bhai — Evolution command center</h1>
      <p className="mt-2 text-sm text-mas-muted">
        Open tickets only (approved/denied yahan nahi dikhte).{" "}
        <strong>Watch</strong> = short signed URL (admin token). Approve = vault cleanup + permanent memory + optional GitHub dispatch (
        <code className="text-sky-300">repository_dispatch</code>).
      </p>

      <div className="mt-8 flex flex-wrap items-end gap-3">
        <label className="flex min-w-[220px] flex-1 flex-col gap-1 text-xs text-mas-muted">
          Admin gate token (<code className="text-sky-300">FEEDBACK_ADMIN_GATE_TOKEN</code>)
          <input
            type="password"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            className="rounded-lg border border-white/15 bg-black/40 px-3 py-2 text-sm text-white"
            autoComplete="off"
          />
        </label>
        <button
          type="button"
          onClick={() => void loadQueue()}
          disabled={loadState === "loading"}
          className="rounded-xl bg-sky-600 px-5 py-2.5 text-sm font-bold text-white hover:bg-sky-500 disabled:opacity-70"
        >
          {loadState === "loading" ? "Refreshing…" : "Load queue"}
        </button>
      </div>

      <label className="mt-6 flex flex-col gap-1 text-xs text-mas-muted">
        Learning note (optional — next Approve par save hoga)
        <textarea
          value={learnNote}
          onChange={(e) => setLearnNote(e.target.value)}
          rows={2}
          className="rounded-lg border border-white/15 bg-black/40 px-3 py-2 text-sm text-white"
          placeholder="e.g. FAB ko 8px upar shift — field users ke thumb ke liye"
        />
      </label>

      {msg && (
        <p className="mt-4 rounded-lg border border-amber-500/30 bg-amber-500/10 px-3 py-2 text-sm text-amber-100">{msg}</p>
      )}

      {denyId ? (
        <div className="mt-6 rounded-xl border border-red-500/40 bg-red-950/40 p-4">
          <p className="text-sm font-bold text-red-100">Deny ticket — reason (AI memory me jayega)</p>
          <textarea
            value={denyReason}
            onChange={(e) => setDenyReason(e.target.value)}
            rows={3}
            className="mt-2 w-full rounded-lg border border-white/15 bg-black/50 px-3 py-2 text-sm text-white"
          />
          <div className="mt-2 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => void confirmDeny()}
              className="rounded-lg bg-red-600 px-4 py-2 text-sm font-bold text-white"
            >
              Confirm deny
            </button>
            <button type="button" onClick={() => setDenyId(null)} className="rounded-lg border border-white/20 px-4 py-2 text-sm text-white">
              Cancel
            </button>
          </div>
        </div>
      ) : null}

      <ul className="mt-10 space-y-6">
        {items.map((row) => {
          const busy = rowBusy[row.id];
          return (
            <li key={row.id} className="glass-panel p-5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-xs text-mas-muted">{new Date(row.created_at).toLocaleString()}</span>
                <span className="rounded-full border border-white/10 px-2 py-0.5 text-[10px] uppercase tracking-wider text-mas-muted">
                  {row.evolution_status}
                </span>
              </div>
              <p className="mt-2 font-mono text-xs text-sky-200/90">{row.storage_path}</p>
              {row.evolution_notes && <p className="mt-2 text-xs text-mas-muted">{row.evolution_notes}</p>}

              <div className="mt-4 flex flex-wrap gap-2">
                <button
                  type="button"
                  disabled={Boolean(busy)}
                  onClick={() => void watch(row.id)}
                  className="rounded-lg border border-sky-500/50 bg-sky-950/40 px-3 py-2 text-xs font-bold text-sky-100 hover:bg-sky-900/50 disabled:opacity-60"
                >
                  {busy === "Opening…" ? "Opening…" : "Watch video"}
                </button>
                <button
                  type="button"
                  onClick={() => setExpandedId((x) => (x === row.id ? null : row.id))}
                  className="rounded-lg border border-white/15 px-3 py-2 text-xs font-bold text-white hover:bg-white/5"
                >
                  {expandedId === row.id ? "Hide change" : "View proposed change"}
                </button>
                <button
                  type="button"
                  disabled={Boolean(busy)}
                  onClick={() => void approve(row.id)}
                  className="rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 px-4 py-2 text-xs font-black text-white shadow-lg hover:brightness-110 disabled:opacity-60"
                >
                  {busy === "Approve…" ? "Working…" : "Approve"}
                </button>
                <button
                  type="button"
                  disabled={Boolean(busy)}
                  onClick={() => {
                    setDenyId(row.id);
                    setDenyReason("");
                  }}
                  className="rounded-xl border border-red-400/50 bg-red-950/30 px-4 py-2 text-xs font-black text-red-100 hover:bg-red-950/50 disabled:opacity-60"
                >
                  Deny
                </button>
              </div>

              {expandedId === row.id && row.proposed_diff ? (
                <pre className="mt-3 max-h-64 overflow-auto rounded-lg bg-black/50 p-3 text-left text-xs text-white/90 whitespace-pre-wrap">
                  {row.proposed_diff}
                </pre>
              ) : null}
            </li>
          );
        })}
      </ul>

      {items.length === 0 && loadState === "idle" && (
        <p className="mt-8 text-center text-sm text-mas-muted">Queue khali — pehle Feedback Mic se recording bhejo.</p>
      )}
    </div>
  );
}
