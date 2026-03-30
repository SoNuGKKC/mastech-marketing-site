import { FormEvent, useState } from "react";
import { GatewayRequestError, submitLeadDemo } from "../lib/gatewayApi";
import { Link } from "react-router-dom";

export default function BookDemoSection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState<"idle" | "ok" | "err">("idle");
  const [errMsg, setErrMsg] = useState("");

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setErrMsg("");
    setStatus("idle");
    setBusy(true);
    try {
      await submitLeadDemo({
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim() || undefined,
        company: company.trim() || undefined,
        message: message.trim() || undefined,
      });
      setStatus("ok");
      setName("");
      setEmail("");
      setPhone("");
      setCompany("");
      setMessage("");
    } catch (err) {
      setStatus("err");
      setErrMsg(err instanceof GatewayRequestError ? err.message : String(err));
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className="border-y border-amber-400/10 bg-gradient-to-b from-[#070d18] via-[#0a1628] to-mas-bg py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-amber-200/85">Not a customer?</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-white md:text-4xl">Book a Demo</h2>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-white/65">
              Tell us who you are — we’ll route your request into our lead pipeline (<code className="rounded bg-black/40 px-1 text-[11px]">lead_inquiries</code>).
              No ghost spinners: you get instant success or a clear error.
            </p>
            <p className="mt-6 text-sm text-white/45">
              Prefer email? <Link to="/contact" className="font-semibold text-sky-300 hover:text-sky-200">Contact</Link>
            </p>
          </div>

          <div className="glass-panel border border-amber-400/15 p-6 sm:p-8">
            <form onSubmit={onSubmit} className="flex flex-col gap-4">
              <label className="block text-left">
                <span className="mb-1 block text-[11px] font-bold uppercase tracking-wider text-white/50">Name *</span>
                <input
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-xl border border-white/12 bg-black/30 px-4 py-3 text-sm text-white outline-none focus:border-amber-400/40"
                  placeholder="Your name"
                />
              </label>
              <label className="block text-left">
                <span className="mb-1 block text-[11px] font-bold uppercase tracking-wider text-white/50">Work email *</span>
                <input
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border border-white/12 bg-black/30 px-4 py-3 text-sm text-white outline-none focus:border-amber-400/40"
                  placeholder="you@company.com"
                />
              </label>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block text-left">
                  <span className="mb-1 block text-[11px] font-bold uppercase tracking-wider text-white/50">Phone</span>
                  <input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full rounded-xl border border-white/12 bg-black/30 px-4 py-3 text-sm text-white outline-none focus:border-amber-400/40"
                    placeholder="+91 …"
                  />
                </label>
                <label className="block text-left">
                  <span className="mb-1 block text-[11px] font-bold uppercase tracking-wider text-white/50">Company</span>
                  <input
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className="w-full rounded-xl border border-white/12 bg-black/30 px-4 py-3 text-sm text-white outline-none focus:border-amber-400/40"
                    placeholder="Company name"
                  />
                </label>
              </div>
              <label className="block text-left">
                <span className="mb-1 block text-[11px] font-bold uppercase tracking-wider text-white/50">What should we show?</span>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={3}
                  className="w-full resize-y rounded-xl border border-white/12 bg-black/30 px-4 py-3 text-sm text-white outline-none focus:border-amber-400/40"
                  placeholder="Stores, roles, timeline…"
                />
              </label>

              {status === "ok" ? (
                <p className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm font-semibold text-emerald-100">
                  Received — we’ll get back to you.
                </p>
              ) : null}
              {status === "err" ? (
                <p className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-100">{errMsg}</p>
              ) : null}

              <button
                type="submit"
                disabled={busy}
                className="rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 px-4 py-3.5 text-sm font-black uppercase tracking-wider text-mas-bg shadow-lg shadow-amber-900/25 disabled:opacity-50"
              >
                {busy ? "Sending…" : "Request demo"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
