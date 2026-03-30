import { FormEvent, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getSupabaseBrowser } from "../lib/supabaseBrowser";

export default function AuthRecovery() {
  const sb = getSupabaseBrowser();
  const [checked, setChecked] = useState(false);
  const [ready, setReady] = useState(false);
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");

  useEffect(() => {
    if (!sb) {
      setChecked(true);
      return;
    }
    void sb.auth.getSession().then(({ data: { session } }) => {
      setReady(Boolean(session));
      if (!session) setError("Invalid or expired recovery link. Request a new reset email.");
      setChecked(true);
    });
  }, [sb]);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setInfo("");
    if (!sb) return;
    if (password.length < 8) {
      setError("Use at least 8 characters.");
      return;
    }
    if (password !== password2) {
      setError("Passwords do not match.");
      return;
    }
    setBusy(true);
    try {
      const { error: err } = await sb.auth.updateUser({ password });
      if (err) {
        setError(err.message || String(err));
        return;
      }
      setInfo("Password updated. You can close this tab and sign in from the Admin gateway.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="mx-auto max-w-md px-4 py-16">
      <div className="glass-panel border border-[#0c4a6e]/35 p-8">
        <h1 className="text-center text-xl font-bold text-white">Set new password</h1>
        <p className="mt-2 text-center text-xs text-white/55">Supabase recovery session (email link).</p>

        {!sb ? (
          <p className="mt-6 text-sm text-amber-100">Gateway not configured.</p>
        ) : !checked ? (
          <p className="mt-6 text-center text-sm text-white/55">Checking recovery link…</p>
        ) : !ready ? (
          <p className="mt-6 text-sm text-red-200">{error}</p>
        ) : (
          <form onSubmit={onSubmit} className="mt-6 flex flex-col gap-4">
            <label className="block text-left">
              <span className="mb-1 block text-xs font-semibold text-white/55">New password</span>
              <input
                type="password"
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-white/15 bg-black/25 px-4 py-3 text-white outline-none focus:border-sky-400/45"
              />
            </label>
            <label className="block text-left">
              <span className="mb-1 block text-xs font-semibold text-white/55">Confirm</span>
              <input
                type="password"
                autoComplete="new-password"
                value={password2}
                onChange={(e) => setPassword2(e.target.value)}
                className="w-full rounded-xl border border-white/15 bg-black/25 px-4 py-3 text-white outline-none focus:border-sky-400/45"
              />
            </label>
            {error ? <p className="text-sm text-red-200">{error}</p> : null}
            {info ? <p className="text-sm text-emerald-200">{info}</p> : null}
            <button
              type="submit"
              disabled={busy}
              className="rounded-xl bg-gradient-to-r from-sky-600 to-sky-500 px-4 py-3 text-sm font-bold text-white disabled:opacity-50"
            >
              {busy ? "Saving…" : "Update password"}
            </button>
          </form>
        )}

        <p className="mt-8 text-center text-xs">
          <Link to="/login/admin" className="text-mas-primary hover:underline">
            ← Admin login
          </Link>
        </p>
      </div>
    </div>
  );
}
