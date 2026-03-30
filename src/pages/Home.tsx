import { Link } from "react-router-dom";
import TrustBadge from "../components/TrustBadge";
import BookDemoSection from "../components/BookDemoSection";
import FounderNote from "../components/FounderNote";
import HeroVideoPlayer from "../components/HeroVideoPlayer";

export default function Home() {
  return (
    <div>
      <section className="relative min-h-[min(88vh,720px)] overflow-hidden bg-mas-bg">
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_60%_at_50%_-10%,rgba(0,184,255,0.12),transparent_55%),linear-gradient(180deg,rgba(15,23,42,0.95)_0%,rgba(5,7,11,1)_45%)]"
          aria-hidden
        />
        <div className="relative z-10 mx-auto flex min-h-[min(88vh,720px)] max-w-6xl flex-col justify-center px-4 py-16 md:py-24">
          <div className="max-w-3xl">
            <div className="mb-6 flex flex-wrap items-center gap-4">
              <span
                className="relative shrink-0"
                style={{
                  filter:
                    "drop-shadow(0 0 10px rgba(255,215,0,0.8)) drop-shadow(0 0 28px rgba(0,184,255,0.35))",
                }}
                aria-hidden
              >
                <img
                  src="/branding/mas-trishul-seal.svg"
                  alt=""
                  className="h-[72px] w-auto sm:h-[84px]"
                  width={72}
                  height={104}
                />
              </span>
              <div className="min-w-0">
                <p
                  className="text-[11px] font-bold uppercase tracking-[0.28em] text-sky-200/90 sm:text-xs"
                  style={{ fontFamily: '"Cinzel", serif' }}
                >
                  MAS TECH Solution
                </p>
                <p className="mt-1 text-sm font-semibold text-white/85">Enterprise field &amp; ops automation</p>
              </div>
            </div>
            <TrustBadge />
            <h1 className="mas-hero-tagline mt-6 text-4xl font-black leading-tight tracking-tight md:text-6xl md:leading-[1.08]">
              <span className="mas-hero-ask block">You ASK.</span>
              <span className="mas-hero-automate block text-white">We AUTOMATE.</span>
            </h1>
            <p className="mt-6 text-lg text-white/90 shadow-black/80 drop-shadow-lg md:text-xl">
              MAS TECH Solution builds{" "}
              <strong className="text-white">field-grade automation</strong> — attendance intelligence, inventory signals, and
              workflows that business owners actually use every day.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                to="/contact?intent=audit"
                className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 px-6 py-3.5 text-base font-black text-mas-bg shadow-lg shadow-amber-500/30 transition duration-200 hover:brightness-110 active:scale-[0.99]"
              >
                Get Free Audit
              </Link>
              <Link
                to="/solutions"
                className="inline-flex items-center justify-center rounded-xl border border-sky-400/35 bg-sky-500/10 px-6 py-3.5 text-base font-bold text-white transition duration-200 hover:border-sky-300/55 hover:bg-sky-500/15"
              >
                View Solutions
              </Link>
            </div>
          </div>

          <div className="relative z-10 mx-auto flex w-full justify-center px-0">
            <HeroVideoPlayer />
          </div>
        </div>
      </section>

      <BookDemoSection />

      <FounderNote />

      <section className="border-y border-white/10 bg-black/30 py-16">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-center text-2xl font-black text-white md:text-3xl">Why owners say yes</h2>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              {
                t: "Zero theatre",
                d: "We ship working systems — sheets, APIs, guardrails — not slideware.",
              },
              {
                t: "Field-first security",
                d: "Device trust, geo policy, and audit trails designed for real teams on the road.",
              },
              {
                t: "SaaS-ready roadmap",
                d: "Start with one vertical; scale to multi-tenant when revenue justifies it.",
              },
            ].map((x) => (
              <div key={x.t} className="glass-panel p-6">
                <h3 className="text-lg font-bold text-mas-primary">{x.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-mas-muted">{x.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="text-2xl font-black text-white md:text-3xl">Case study — Distribution (anonymized)</h2>
        <p className="mt-2 text-mas-muted">Project Paradise Markcom pattern — no confidential numbers disclosed.</p>
        <div className="mt-8 glass-panel p-8 md:p-10">
          <ul className="space-y-4 text-mas-muted">
            <li>
              <strong className="text-white">Challenge:</strong> Field teams + back-office on calls and manual follow-ups.
            </li>
            <li>
              <strong className="text-white">What we built:</strong> Single source of truth (sheet-backed), mobile attendance &amp; visit
              flow, dashboards, and exception alerts.
            </li>
            <li>
              <strong className="text-emerald-400">Outcome narrative:</strong> Leadership reported roughly{" "}
              <strong className="text-white">2× faster</strong> daily cycle time on core field ops after stabilization — your mileage
              depends on process maturity.
            </li>
          </ul>
          <Link to="/contact" className="mt-8 inline-block font-bold text-mas-primary hover:underline">
            Book a walkthrough →
          </Link>
        </div>
      </section>

      <section className="border-t border-white/10 bg-black/20 py-16">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-center text-2xl font-black text-white md:text-3xl">Tiered engagement</h2>
          <p className="mx-auto mt-2 max-w-2xl text-center text-mas-muted">
            SMB-friendly start; enterprise depth when operations demand it.
          </p>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            <div className="glass-panel flex flex-col p-6">
              <div className="text-sm font-bold uppercase tracking-wider text-mas-muted">Starter</div>
              <div className="mt-2 text-3xl font-black text-white">Audit + blueprint</div>
              <p className="mt-4 flex-1 text-sm text-mas-muted">Free audit call, automation map, fixed-scope pilot.</p>
              <Link to="/contact?intent=audit" className="mt-6 font-bold text-mas-primary">
                Start here →
              </Link>
            </div>
            <div className="glass-panel relative flex flex-col border-mas-primary/40 p-6 ring-2 ring-mas-primary/30">
              <div className="absolute -top-3 left-4 rounded-full bg-mas-primary px-2 py-0.5 text-[10px] font-black uppercase text-mas-bg">
                Popular
              </div>
              <div className="text-sm font-bold uppercase tracking-wider text-mas-muted">Growth</div>
              <div className="mt-2 text-3xl font-black text-white">Operational stack</div>
              <p className="mt-4 flex-1 text-sm text-mas-muted">Integrated workflows, monitoring, training, and iteration sprints.</p>
              <Link to="/contact" className="mt-6 font-bold text-mas-primary">
                Talk to us →
              </Link>
            </div>
            <div className="glass-panel flex flex-col p-6">
              <div className="text-sm font-bold uppercase tracking-wider text-mas-muted">Enterprise</div>
              <div className="mt-2 text-3xl font-black text-white">Paradise-scale</div>
              <p className="mt-4 flex-1 text-sm text-mas-muted">Multi-branch policy, compliance, custom integrations, SLA.</p>
              <Link to="/contact" className="mt-6 font-bold text-mas-primary">
                Enterprise brief →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
