import { FormEvent, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { buildGatewayDeviceFingerprint, getOrCreateGatewayDeviceId } from "../lib/deviceIdentity";
import { GatewayRequestError, postGatewayFunction } from "../lib/gatewayApi";
import { readJaduProfile, resolveJaduTargetUrl } from "../lib/jaduGateway";
import { getSupabaseBrowser } from "../lib/supabaseBrowser";
import { clearGatewaySessionFlags, setFieldGatewayVerified } from "../lib/sessionFlags";

type Step = "phone" | "otp" | "pin";

function normalizeIndiaPhone(digits: string): string | null {
  const d = digits.replace(/\D/g, "");
  if (d.length === 10) return `+91${d}`;
  if (d.startsWith("91") && d.length === 12) return `+${d}`;
  return null;
}

export default function LoginField() {
  const sb = getSupabaseBrowser();
  const [step, setStep] = useState<Step>("phone");
  const [phoneDigits, setPhoneDigits] = useState("");
  const [otp, setOtp] = useState("");
  const [pin, setPin] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");

  const fullPhone = normalizeIndiaPhone(phoneDigits);

  useEffect(() => {
    if (!sb) return;
    void sb.auth.getSession().then(({ data: { session } }) => {
      if (!session?.user) return;
      const p = readJaduProfile(session.user);
      if (p.org === "paradise" && p.role === "field") setStep("pin");
    });
  }, [sb]);

  async function sendOtp(e: FormEvent) {
    e.preventDefault();
    setError("");
    setInfo("");
    if (!sb) {
      setError("Supabase not configured.");
      return;
    }
    if (!fullPhone) {
      setError("Enter a valid 10-digit mobile number.");
      return;
    }
    setBusy(true);
    try {
      const { error: err } = await sb.auth.signInWithOtp({ phone: fullPhone, options: { channel: "sms" } });
      if (err) {
        setError(err.message || String(err));
        return;
      }
      setInfo("OTP sent via SMS (if Phone Auth is enabled in Supabase).");
      setStep("otp");
    } finally {
      setBusy(false);
    }
  }

  async function verifyOtp(e: FormEvent) {
    e.preventDefault();
    setError("");
    setInfo("");
    if (!sb || !fullPhone) return;
    const code = otp.replace(/\D/g, "");
    if (code.length < 6) {
      setError("Enter the 6-digit OTP.");
      return;
    }
    setBusy(true);
    try {
      const { error: err } = await sb.auth.verifyOtp({ phone: fullPhone, token: code, type: "sms" });
      if (err) {
        setError(err.message || String(err));
        return;
      }
      const { data: sess } = await sb.auth.getSession();
      const user = sess.session?.user;
      if (!user) {
        setError("No session after OTP.");
        return;
      }
      const p = readJaduProfile(user);
      if (p.org !== "paradise" || p.role !== "field") {
        setError("This login is for Paradise field accounts only (metadata org=paradise, role=field).");
        await sb.auth.signOut();
        return;
      }
      setStep("pin");
      setInfo("Set or enter your 4-digit PIN. Device binding applies on this route.");
    } finally {
      setBusy(false);
    }
  }

  async function verifyPinSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setInfo("");
    if (!sb) return;
    const p4 = pin.replace(/\D/g, "");
    if (!/^\d{4}$/.test(p4)) {
      setError("PIN must be exactly 4 digits.");
      return;
    }
    const { data: sess } = await sb.auth.getSession();
    const token = sess.session?.access_token;
    if (!token) {
      setError("Session expired — start again with mobile OTP.");
      setStep("phone");
      return;
    }
    setBusy(true);
    try {
      const deviceId = getOrCreateGatewayDeviceId();
      const deviceFingerprint = await buildGatewayDeviceFingerprint();
      let setup = false;
      try {
        await postGatewayFunction(
          "gateway-field-verify",
          { pin: p4, device_id: deviceId, device_fingerprint: deviceFingerprint, setup: false },
          token
        );
      } catch (err) {
        if (err instanceof GatewayRequestError && err.code === "PIN_SETUP_REQUIRED") {
          setup = true;
        } else {
          throw err;
        }
      }
      if (setup) {
        await postGatewayFunction(
          "gateway-field-verify",
          { pin: p4, device_id: deviceId, device_fingerprint: deviceFingerprint, setup: true },
          token
        );
        setInfo("PIN and device bound for first-time setup.");
      }
      setFieldGatewayVerified();
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

  return (
    <div className="relative mx-auto max-w-md px-4 py-12 sm:py-16">
      <div className="glass-panel border border-amber-400/10 p-8 sm:p-10">
        <div className="mb-6 text-center">
          <img src="/branding/mas-trishul-seal.svg" alt="" className="mx-auto mb-3 h-16 w-auto opacity-95" width={48} height={69} />
          <h1 className="text-xl font-bold text-white">Field Gateway</h1>
          <p className="mt-1 text-xs text-white/55">Route A — Mobile · PIN · Device binding</p>
        </div>

        {!sb ? (
          <p className="text-sm text-amber-100">Configure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.</p>
        ) : step === "phone" ? (
          <form onSubmit={sendOtp} className="flex flex-col gap-4">
            <label className="block text-left">
              <span className="mb-1 block text-xs font-semibold uppercase tracking-wider text-white/55">Mobile (India)</span>
              <div className="flex gap-2">
                <span className="flex items-center rounded-xl border border-white/15 bg-black/30 px-3 text-sm text-white/70">+91</span>
                <input
                  type="tel"
                  inputMode="numeric"
                  autoComplete="tel-national"
                  value={phoneDigits}
                  onChange={(e) => setPhoneDigits(e.target.value.replace(/\D/g, "").slice(0, 10))}
                  className="min-w-0 flex-1 rounded-xl border border-white/15 bg-black/25 px-4 py-3 text-white outline-none focus:border-amber-400/45 focus:ring-2 focus:ring-amber-400/25"
                  placeholder="9876543210"
                />
              </div>
            </label>
            {error ? <p className="text-sm text-red-200">{error}</p> : null}
            {info ? <p className="text-sm text-sky-200">{info}</p> : null}
            <button
              type="submit"
              disabled={busy}
              className="rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 px-4 py-3 text-sm font-bold uppercase tracking-wider text-mas-bg disabled:opacity-50"
            >
              {busy ? "Sending…" : "Send SMS code"}
            </button>
          </form>
        ) : step === "otp" ? (
          <form onSubmit={verifyOtp} className="flex flex-col gap-4">
            <label className="block text-left">
              <span className="mb-1 block text-xs font-semibold uppercase tracking-wider text-white/55">SMS code</span>
              <input
                type="text"
                inputMode="numeric"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 8))}
                className="w-full rounded-xl border border-white/15 bg-black/25 px-4 py-3 tracking-widest text-white outline-none focus:border-amber-400/45"
                placeholder="••••••"
              />
            </label>
            {error ? <p className="text-sm text-red-200">{error}</p> : null}
            {info ? <p className="text-sm text-sky-200">{info}</p> : null}
            <button
              type="submit"
              disabled={busy}
              className="rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 px-4 py-3 text-sm font-bold text-mas-bg disabled:opacity-50"
            >
              {busy ? "Verifying…" : "Verify OTP"}
            </button>
            <button type="button" className="text-xs text-white/45 hover:text-white/70" onClick={() => setStep("phone")}>
              Change number
            </button>
          </form>
        ) : (
          <form onSubmit={verifyPinSubmit} className="flex flex-col gap-4">
            <label className="block text-left">
              <span className="mb-1 block text-xs font-semibold uppercase tracking-wider text-white/55">4-digit PIN</span>
              <input
                type="password"
                inputMode="numeric"
                autoComplete="one-time-code"
                value={pin}
                onChange={(e) => setPin(e.target.value.replace(/\D/g, "").slice(0, 4))}
                className="w-full rounded-xl border border-white/15 bg-black/25 px-4 py-3 tracking-[0.4em] text-white outline-none focus:border-amber-400/45"
                placeholder="••••"
              />
            </label>
            <p className="text-[11px] leading-relaxed text-white/45">
              Device ID + fingerprint are sent to the gateway for binding (first login locks; mismatch blocks). This mirrors MASTER_BRAIN
              field policy; IMEI is not available in the browser.
            </p>
            {error ? <p className="text-sm text-red-200">{error}</p> : null}
            {info ? <p className="text-sm text-sky-200">{info}</p> : null}
            <button
              type="submit"
              disabled={busy}
              className="rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 px-4 py-3 text-sm font-bold uppercase tracking-wider text-mas-bg disabled:opacity-50"
            >
              {busy ? "Securing…" : "Unlock & continue"}
            </button>
          </form>
        )}

        <p className="mt-8 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-center text-xs text-white/45">
          <Link to="/login" className="text-mas-primary hover:underline">
            ← Gateway home
          </Link>
          {sb ? (
            <button
              type="button"
              className="text-white/50 hover:text-white/75"
              onClick={() => {
                clearGatewaySessionFlags();
                void sb.auth.signOut().then(() => setStep("phone"));
              }}
            >
              Sign out
            </button>
          ) : null}
        </p>
      </div>
    </div>
  );
}
