import { FormEvent, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { startAuthentication, startRegistration } from "@simplewebauthn/browser";
import { GatewayRequestError, postGatewayFunction } from "../lib/gatewayApi";
import { readJaduProfile, resolveJaduTargetUrl } from "../lib/jaduGateway";
import { getSupabaseBrowser } from "../lib/supabaseBrowser";
import { clearGatewaySessionFlags, setAdminMfaVerified } from "../lib/sessionFlags";

export default function LoginAdmin() {
  const sb = getSupabaseBrowser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phase, setPhase] = useState<"password" | "mfa">("password");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");

  const origin = typeof window !== "undefined" ? window.location.origin : "";

  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    if (q.get("resume") === "1" || q.get("oauth") === "1") {
      void sb?.auth.getSession().then(({ data: { session } }) => {
        if (session?.user) {
          const p = readJaduProfile(session.user);
          if (p.org === "paradise" && p.role === "admin") setPhase("mfa");
        }
      });
    }
  }, [sb]);

  async function runAdminMfa(accessToken: string) {
    setInfo("Complete biometric verification on this device (WebAuthn). Mobile push fires after password step when webhook is configured.");

    let authOpts: Record<string, unknown>;
    try {
      const authRes = (await postGatewayFunction(
        "gateway-webauthn",
        { action: "authentication-options", origin },
        accessToken
      )) as { options?: Record<string, unknown> };
      if (!authRes.options) throw new Error("NO_AUTH_OPTIONS");
      authOpts = authRes.options;
    } catch (err) {
      if (err instanceof GatewayRequestError && err.code === "WEBAUTHN_NOT_REGISTERED") {
        setInfo("First-time admin: register device biometrics.");
        const regRes = (await postGatewayFunction(
          "gateway-webauthn",
          { action: "registration-options", origin },
          accessToken
        )) as { options?: Record<string, unknown> };
        if (!regRes.options) throw new Error("NO_REG_OPTIONS");
        const regAtt = await startRegistration(regRes.options as unknown as Parameters<typeof startRegistration>[0]);
        await postGatewayFunction(
          "gateway-webauthn",
          { action: "registration-verify", origin, credential: regAtt as unknown as Record<string, unknown> },
          accessToken
        );
        const again = (await postGatewayFunction(
          "gateway-webauthn",
          { action: "authentication-options", origin },
          accessToken
        )) as { options?: Record<string, unknown> };
        if (!again.options) throw new Error("NO_AUTH_OPTIONS");
        authOpts = again.options;
      } else {
        throw err;
      }
    }

    const assertion = await startAuthentication(authOpts as unknown as Parameters<typeof startAuthentication>[0]);
    await postGatewayFunction(
      "gateway-webauthn",
      { action: "authentication-verify", origin, credential: assertion as unknown as Record<string, unknown> },
      accessToken
    );
    setAdminMfaVerified();
  }

  async function onPassword(e: FormEvent) {
    e.preventDefault();
    setError("");
    setInfo("");
    if (!sb) {
      setError("Supabase not configured.");
      return;
    }
    setBusy(true);
    try {
      const { error: err } = await sb.auth.signInWithPassword({ email: email.trim(), password });
      if (err) {
        setError(err.message || String(err));
        return;
      }
      const { data: sess } = await sb.auth.getSession();
      const user = sess.session?.user;
      const token = sess.session?.access_token;
      if (!user || !token) {
        setError("No session after sign-in.");
        return;
      }
      const p = readJaduProfile(user);
      if (p.org !== "paradise" || p.role !== "admin") {
        setError("This route is for Paradise admin accounts (org=paradise, role=admin).");
        await sb.auth.signOut();
        return;
      }
      void postGatewayFunction("gateway-admin-mfa-start", {}, token).catch(() => {});
      setPhase("mfa");
      setInfo("Password OK — we notified your companion hook (if configured). Complete MFA below.");
    } finally {
      setBusy(false);
    }
  }

  async function onMfaComplete(e: FormEvent) {
    e.preventDefault();
    setError("");
    setInfo("");
    if (!sb) return;
    setBusy(true);
    try {
      const { data: sess } = await sb.auth.getSession();
      const token = sess.session?.access_token;
      if (!token) {
        setError("Session expired.");
        setPhase("password");
        return;
      }
      await runAdminMfa(token);
      const { data: s2 } = await sb.auth.getSession();
      const user = s2.session?.user;
      if (user) {
        const target = resolveJaduTargetUrl(readJaduProfile(user));
        if (target) {
          window.location.assign(target);
          return;
        }
      }
      setError("No Jadu target for this account.");
    } catch (err) {
      const msg = err instanceof GatewayRequestError ? `${err.code}: ${err.message}` : String(err);
      setError(msg);
    } finally {
      setBusy(false);
    }
  }

  async function forgotPassword() {
    setError("");
    setInfo("");
    if (!sb) return;
    const em = email.trim();
    if (!em) {
      setError("Enter your email above first.");
      return;
    }
    setBusy(true);
    try {
      const { error: err } = await sb.auth.resetPasswordForEmail(em, {
        redirectTo: `${origin.replace(/\/$/, "")}/auth/recovery`,
      });
      if (err) {
        setError(err.message || String(err));
        return;
      }
      setInfo("Password reset email sent (Supabase Auth). Check inbox.");
    } finally {
      setBusy(false);
    }
  }

  async function signOutHere() {
    if (!sb) return;
    setBusy(true);
    try {
      clearGatewaySessionFlags();
      await sb.auth.signOut();
      setPhase("password");
      setInfo("Signed out.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="relative mx-auto max-w-md px-4 py-12 sm:py-16">
      <div className="glass-panel border border-[#0c4a6e]/35 bg-gradient-to-b from-[#0a1628]/95 to-mas-bg/90 p-8 sm:p-10">
        <div className="mb-6 text-center">
          <img src="/branding/mas-trishul-seal.svg" alt="" className="mx-auto mb-3 h-16 w-auto opacity-95" width={48} height={69} />
          <h1 className="text-xl font-bold text-white">Admin Gateway</h1>
          <p className="mt-1 text-xs text-white/55">Route B — No field device binding · MFA required</p>
        </div>

        {!sb ? (
          <p className="text-sm text-amber-100">Configure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.</p>
        ) : phase === "password" ? (
          <form onSubmit={onPassword} className="flex flex-col gap-4">
            <label className="block text-left">
              <span className="mb-1 block text-xs font-semibold uppercase tracking-wider text-white/55">Email</span>
              <input
                type="email"
                autoComplete="username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-white/15 bg-black/25 px-4 py-3 text-white outline-none focus:border-sky-400/45"
                required
              />
            </label>
            <label className="block text-left">
              <span className="mb-1 block text-xs font-semibold uppercase tracking-wider text-white/55">Password</span>
              <input
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-white/15 bg-black/25 px-4 py-3 text-white outline-none focus:border-sky-400/45"
                required
              />
            </label>
            {error ? <p className="text-sm text-red-200">{error}</p> : null}
            {info ? <p className="text-sm text-sky-200">{info}</p> : null}
            <button
              type="submit"
              disabled={busy}
              className="rounded-xl bg-gradient-to-r from-sky-600 to-sky-500 px-4 py-3 text-sm font-bold uppercase tracking-wider text-white disabled:opacity-50"
            >
              {busy ? "Signing in…" : "Sign in"}
            </button>
            <button
              type="button"
              disabled={busy}
              onClick={() => void forgotPassword()}
              className="text-center text-sm font-semibold text-amber-200/90 hover:text-amber-100 disabled:opacity-50"
            >
              Forgot password
            </button>
          </form>
        ) : (
          <form onSubmit={onMfaComplete} className="flex flex-col gap-4">
            <p className="text-sm leading-relaxed text-white/70">
              Approve login with your device biometric (WebAuthn). This satisfies the fingerprint gate before MIS dashboard redirect.
            </p>
            {error ? <p className="text-sm text-red-200">{error}</p> : null}
            {info ? <p className="text-sm text-sky-200">{info}</p> : null}
            <button
              type="submit"
              disabled={busy}
              className="rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 px-4 py-3 text-sm font-bold uppercase tracking-wider text-mas-bg disabled:opacity-50"
            >
              {busy ? "Verifying…" : "Verify with biometrics"}
            </button>
            <button type="button" disabled={busy} onClick={() => void signOutHere()} className="text-xs text-white/45 hover:text-white/70">
              Sign out
            </button>
          </form>
        )}

        <p className="mt-8 text-center text-xs text-white/45">
          <Link to="/login" className="text-mas-primary hover:underline">
            ← Gateway home
          </Link>
        </p>
      </div>
    </div>
  );
}
