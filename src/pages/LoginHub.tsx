import { Link } from "react-router-dom";

export default function LoginHub() {
  return (
    <div className="relative mx-auto max-w-4xl px-4 py-12 sm:py-20">
      <div
        className="pointer-events-none absolute inset-x-0 -top-32 h-72 opacity-50 blur-3xl"
        style={{
          background:
            "radial-gradient(ellipse at 30% 0%, rgba(212,175,55,0.18) 0%, transparent 55%), radial-gradient(ellipse at 70% 20%, rgba(12,74,110,0.35) 0%, transparent 50%)",
        }}
        aria-hidden
      />
      <div className="relative text-center">
        <p className="text-xs font-bold uppercase tracking-[0.28em] text-amber-200/85">Enterprise Auth Gateway</p>
        <h1
          className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl"
          style={{ fontFamily: '"Cormorant Garamond", "Cinzel", serif' }}
        >
          Universal Login
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-sm text-white/65">
          Identity-based security: field crews use mobile verification + PIN + device binding; admins use email + password + biometric MFA.
          Admins are exempt from field device binding (privileged pattern per MASTER_BRAIN).
        </p>
      </div>

      <div className="relative mt-12 grid gap-6 md:grid-cols-2">
        <Link
          to="/login/field"
          className="group glass-panel block border-amber-400/15 p-8 text-left transition hover:border-amber-400/35 hover:shadow-[0_0_40px_rgba(212,175,55,0.12)]"
        >
          <span className="text-xs font-bold uppercase tracking-wider text-sky-300/90">Route A — Field</span>
          <h2 className="mt-2 text-xl font-bold text-white">Mobile + 4-digit PIN</h2>
          <p className="mt-2 text-sm leading-relaxed text-white/60">
            SMS OTP (Supabase Phone), then PIN and browser device fingerprint binding. Web cannot read IMEI — we bind the same signals as
            Paradise field policy (UA, screen, DPR hash).
          </p>
          <span className="mt-6 inline-flex items-center text-sm font-bold text-amber-300 group-hover:text-amber-200">
            Continue →
          </span>
        </Link>

        <Link
          to="/login/admin"
          className="group glass-panel block border-[#0c4a6e]/40 bg-gradient-to-br from-[#0c1629]/90 to-mas-bg/80 p-8 text-left transition hover:border-sky-400/35"
        >
          <span className="text-xs font-bold uppercase tracking-wider text-amber-200/90">Route B — Admin</span>
          <h2 className="mt-2 text-xl font-bold text-white">Email + Password + MFA</h2>
          <p className="mt-2 text-sm leading-relaxed text-white/60">
            Forgot-password via Supabase email. After password, WebAuthn fingerprint / platform key required. Optional mobile push hook via
            server webhook (<code className="rounded bg-black/30 px-1 text-[11px]">GATEWAY_ADMIN_MFA_WEBHOOK_URL</code>).
          </p>
          <span className="mt-6 inline-flex items-center text-sm font-bold text-sky-300 group-hover:text-sky-200">
            Continue →
          </span>
        </Link>
      </div>

      <p className="mt-10 text-center text-xs text-white/45">
        <Link to="/" className="font-semibold text-mas-primary hover:underline">
          ← Public home
        </Link>
        <span className="mx-2">·</span>
        <Link to="/contact" className="hover:text-white/70">
          Contact
        </Link>
      </p>
    </div>
  );
}
