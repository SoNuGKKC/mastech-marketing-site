import { useCallback, useState } from "react";
import { feedbackAnonKey, feedbackFunctionsBase } from "../lib/feedbackConfig";

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
};

const TOKEN_KEY = "mas_feedback_admin_token";

export default function EvolutionGatekeeper() {
  const [token, setToken] = useState(() => sessionStorage.getItem(TOKEN_KEY) || "");
  const [items, setItems] = useState<Row[]>([]);
  const [msg, setMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const base = feedbackFunctionsBase();
  const anon = feedbackAnonKey();

  const loadQueue = useCallback(async () => {
    if (!base || !anon || !token.trim()) {
      setMsg("Supabase env + admin token dono chahiye.");
      return;
    }
    setLoading(true);
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
      setLoading(false);
    }
  }, [base, anon, token]);

  const approve = async (id: string) => {
    if (!base || !anon || !token.trim()) return;
    setMsg(null);
    try {
      const r = await fetch(`${base}/feedback-admin-approve`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${anon}`,
          apikey: anon,
          "Content-Type": "application/json",
          "x-feedback-admin-token": token.trim(),
        },
        body: JSON.stringify({ id, hint: "Sonu Bhai gatekeeper" }),
      });
      const j = (await r.json()) as { error?: string };
      if (!r.ok) throw new Error(j.error || "APPROVE_FAILED");
      setMsg("APPROVED — ab is diff ko repo me manually merge / deploy workflow se jodo.");
      await loadQueue();
    } catch (e) {
      setMsg(e instanceof Error ? e.message : "APPROVE_FAILED");
    }
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-16">
      <h1 className="text-2xl font-black text-white md:text-3xl">Evolution gatekeeper</h1>
      <p className="mt-2 text-sm text-mas-muted">
        Sonu Bhai: yahan se recording queue dekho. <strong>APPROVE &amp; MERGE</strong> sirf vault flag set karta hai — Git merge / Netlify
        deploy tumhara controlled step rehta hai (Laxman Rekha).
      </p>

      <div className="mt-8 flex flex-wrap items-end gap-3">
        <label className="flex min-w-[220px] flex-1 flex-col gap-1 text-xs text-mas-muted">
          Admin gate token (Supabase secret <code className="text-sky-300">FEEDBACK_ADMIN_GATE_TOKEN</code>)
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
          disabled={loading}
          className="rounded-xl bg-sky-600 px-5 py-2.5 text-sm font-bold text-white hover:bg-sky-500 disabled:opacity-50"
        >
          {loading ? "Loading…" : "Load queue"}
        </button>
      </div>

      {msg && (
        <p className="mt-4 rounded-lg border border-amber-500/30 bg-amber-500/10 px-3 py-2 text-sm text-amber-100">{msg}</p>
      )}

      <ul className="mt-10 space-y-6">
        {items.map((row) => (
          <li key={row.id} className="glass-panel p-5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-xs text-mas-muted">{new Date(row.created_at).toLocaleString()}</span>
              <span className="rounded-full border border-white/10 px-2 py-0.5 text-[10px] uppercase tracking-wider text-mas-muted">
                {row.evolution_status}
              </span>
            </div>
            <p className="mt-2 font-mono text-xs text-sky-200/90">{row.storage_path}</p>
            {row.proposed_diff && (
              <pre className="mt-3 max-h-48 overflow-auto rounded-lg bg-black/50 p-3 text-left text-xs text-white/90 whitespace-pre-wrap">
                {row.proposed_diff}
              </pre>
            )}
            {row.evolution_notes && <p className="mt-2 text-xs text-mas-muted">{row.evolution_notes}</p>}
            <div className="mt-4 flex flex-wrap gap-2">
              {!row.approved_at ? (
                <button
                  type="button"
                  onClick={() => void approve(row.id)}
                  className="rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 px-4 py-2 text-sm font-black text-white shadow-lg hover:brightness-110"
                >
                  APPROVE &amp; MERGE
                </button>
              ) : (
                <span className="text-xs font-semibold text-emerald-400">Approved {row.approved_at}</span>
              )}
            </div>
          </li>
        ))}
      </ul>

      {items.length === 0 && !loading && (
        <p className="mt-8 text-center text-sm text-mas-muted">Queue khali — pehle feedback mic se recording bhejo.</p>
      )}
    </div>
  );
}
