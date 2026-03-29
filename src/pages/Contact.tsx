import { FormEvent, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import TrustBadge from "../components/TrustBadge";

function friendlySubmitError_(err: unknown): string {
  const raw = String((err as Error)?.message || err || "");
  if (!raw) return "Something went wrong. Please try again or email us directly.";
  if (raw.startsWith("{") || raw.startsWith("[") || raw.includes('"error"')) {
    return "We could not reach the form service. Please try again later or use the email below.";
  }
  if (raw.length > 180) return "We could not complete the request. Please try again or email us directly.";
  return raw;
}

export default function Contact() {
  const [params] = useSearchParams();
  const intent = params.get("intent");
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "err">("idle");
  const [msg, setMsg] = useState("");

  const endpoint = useMemo(() => (import.meta.env.VITE_CONTACT_FORM_ENDPOINT || "").trim(), []);
  const publicContactEmail = useMemo(
    () => String(import.meta.env.VITE_PUBLIC_CONTACT_EMAIL || "").trim(),
    [],
  );

  const defaultNote =
    intent === "audit"
      ? "I'd like a free automation audit for my business. Brief: \n"
      : "";

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const payload = {
      name: String(fd.get("name") || ""),
      company: String(fd.get("company") || ""),
      email: String(fd.get("email") || ""),
      phone: String(fd.get("phone") || ""),
      interest: String(fd.get("interest") || ""),
      message: String(fd.get("message") || ""),
      intent: intent || "contact",
      source: "mas-tech-solution-website",
      ts: new Date().toISOString(),
    };

    if (!endpoint) {
      setStatus("err");
      setMsg("This form is not configured yet. Please use the email on the right to reach the team.");
      return;
    }

    setStatus("sending");
    setMsg("");
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        mode: "cors",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify(payload),
      });
      const text = await res.text();
      if (!res.ok) throw new Error(text || `HTTP ${res.status}`);
      setStatus("ok");
      setMsg("Thank you — we will respond shortly.");
      form.reset();
    } catch (err) {
      setStatus("err");
      setMsg(friendlySubmitError_(err));
    }
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-14">
      <TrustBadge />
      <h1 className="mt-4 text-3xl font-black text-white md:text-5xl">Contact &amp; demo</h1>
      <p className="mt-4 max-w-2xl text-mas-muted">
        Share your context in a few lines. We respond with a clear next step — no jargon, no clutter.
      </p>

      <div className="mt-10 grid gap-10 lg:grid-cols-2">
        <form className="glass-panel space-y-4 p-8" onSubmit={onSubmit}>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-mas-muted" htmlFor="name">
              Name
            </label>
            <input
              id="name"
              name="name"
              required
              className="mt-1 w-full rounded-xl border border-white/15 bg-black/40 px-4 py-3 text-white outline-none transition-colors duration-200 focus:border-amber-400/60"
            />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-mas-muted" htmlFor="company">
              Company
            </label>
            <input
              id="company"
              name="company"
              className="mt-1 w-full rounded-xl border border-white/15 bg-black/40 px-4 py-3 text-white outline-none transition-colors duration-200 focus:border-amber-400/60"
            />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-mas-muted" htmlFor="email">
              Work email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="mt-1 w-full rounded-xl border border-white/15 bg-black/40 px-4 py-3 text-white outline-none transition-colors duration-200 focus:border-amber-400/60"
            />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-mas-muted" htmlFor="phone">
              Phone
            </label>
            <input
              id="phone"
              name="phone"
              inputMode="tel"
              className="mt-1 w-full rounded-xl border border-white/15 bg-black/40 px-4 py-3 text-white outline-none transition-colors duration-200 focus:border-amber-400/60"
            />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-mas-muted" htmlFor="interest">
              Interest
            </label>
            <select
              id="interest"
              name="interest"
              className="mt-1 w-full rounded-xl border border-white/15 bg-black/40 px-4 py-3 text-white outline-none transition-colors duration-200 focus:border-amber-400/60"
              defaultValue="audit"
            >
              <option value="audit">Free automation audit</option>
              <option value="field">Field / attendance stack</option>
              <option value="inventory">Inventory signals</option>
              <option value="enterprise">Enterprise / custom</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-mas-muted" htmlFor="message">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              defaultValue={defaultNote}
              className="mt-1 w-full rounded-xl border border-white/15 bg-black/40 px-4 py-3 text-white outline-none transition-colors duration-200 focus:border-amber-400/60"
            />
          </div>
          {msg && (
            <p className={`text-sm ${status === "ok" ? "text-emerald-400" : "text-red-300"}`} role="status">
              {msg}
            </p>
          )}
          <button
            type="submit"
            disabled={status === "sending"}
            className="w-full rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 py-4 font-black text-mas-bg shadow-lg shadow-amber-500/25 transition duration-200 hover:brightness-110 active:scale-[0.99] disabled:opacity-60"
          >
            {status === "sending" ? "Sending…" : "Submit"}
          </button>
        </form>

        <div className="space-y-6">
          <div className="glass-panel p-8">
            <h2 className="text-lg font-bold text-white">Talk to MAS TECH</h2>
            <p className="mt-3 text-sm leading-relaxed text-mas-muted">
              For executive walkthroughs and demos, use the form — we keep this page clean for stakeholders (no internal
              setup notes or raw logs).
            </p>
            {publicContactEmail ? (
              <a
                href={`mailto:${publicContactEmail}`}
                className="mt-6 inline-flex items-center justify-center rounded-xl border border-amber-400/40 bg-amber-500/10 px-5 py-3 text-sm font-bold text-amber-100 transition duration-200 hover:border-amber-400/70 hover:bg-amber-500/15"
              >
                {publicContactEmail}
              </a>
            ) : (
              <p className="mt-6 text-sm font-semibold text-white/90">
                Submit the form — our team replies from your official project channel.
              </p>
            )}
          </div>
          <div className="glass-panel p-8">
            <h2 className="text-lg font-bold text-white">What happens next</h2>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-mas-muted">
              <li>We confirm fit and timeline.</li>
              <li>You get a short agenda before any call.</li>
              <li>No pressure — clear commercial options only if it makes sense.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
