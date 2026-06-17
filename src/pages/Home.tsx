import { Link } from "react-router-dom";
import BookDemoSection from "../components/BookDemoSection";
import FounderNote from "../components/FounderNote";

// ⚠️ Set VITE_WHATSAPP_LINK in Netlify env vars with your real WhatsApp number
const wh = String(import.meta.env.VITE_WHATSAPP_LINK || "").trim() || "https://wa.me/919998887776?text=Hi%20MAS%20TECH%2C%20I%20want%20a%20demo";

/* ─── Problem Card ─── */
function PCard({ icon, title, desc, fix }: { icon: string; title: string; desc: string; fix: string }) {
  return (
    <article
      className="relative overflow-hidden rounded-2xl p-6 transition-colors"
      style={{
        background: "#0e1018",
        border: "1px solid rgba(255,255,255,0.07)",
      }}
      onMouseEnter={e => (e.currentTarget.style.borderColor = "rgba(212,168,67,0.2)")}
      onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)")}
    >
      <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: "linear-gradient(90deg,#D4A843,transparent)" }}/>
      <div className="text-2xl mb-3">{icon}</div>
      <h3 className="font-bold text-sm tracking-wider mb-2 text-white" style={{ fontFamily: '"Cinzel",serif' }}>{title}</h3>
      <p className="text-sm text-white/60 leading-relaxed mb-3">{desc}</p>
      <p className="text-sm text-emerald-400 font-semibold flex items-center gap-2">✅ {fix}</p>
    </article>
  );
}

/* ─── Dashboard Mockup ─── */
function DashboardMockup() {
  const bars = [40, 55, 35, 70, 48, 82, 90];
  return (
    <div className="rounded-2xl overflow-hidden border border-white/10 bg-[#0a0c14] shadow-2xl">
      {/* Header bar */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/8 bg-[#0e1018]">
        <span className="text-[10px] font-bold tracking-[0.12em] text-white/70" style={{ fontFamily: '"Cinzel",serif' }}>HOSPITAL OS — LIVE DASHBOARD</span>
        <span className="flex items-center gap-1.5 text-[10px] font-bold text-emerald-400">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"/>LIVE
        </span>
      </div>

      <div className="p-4 space-y-4">
        {/* Metric cards */}
        <div className="grid grid-cols-3 gap-2">
          {[
            { val: "142", label: "OPD TODAY", change: "↑12%" },
            { val: "₹84K", label: "BILLING", change: "↑8%" },
            { val: "98%", label: "UPTIME", change: "SLA" },
          ].map(m => (
            <div key={m.label} className="rounded-xl bg-[#13151f] border border-white/6 p-3 text-center">
              <div className="text-lg font-black text-[#D4A843]" style={{ fontFamily: '"Cinzel",serif' }}>{m.val}</div>
              <div className="text-[9px] text-white/40 tracking-wider mt-0.5">{m.label}</div>
              <div className="text-[9px] text-emerald-400 mt-0.5">{m.change}</div>
            </div>
          ))}
        </div>

        {/* Mini bar chart */}
        <div className="rounded-xl bg-[#13151f] border border-white/6 p-3">
          <div className="text-[9px] text-white/35 tracking-wider mb-2">WEEKLY PATIENTS</div>
          <div className="flex items-end gap-1 h-12">
            {bars.map((h, i) => (
              <div
                key={i}
                className="flex-1 rounded-sm"
                style={{
                  height: `${h}%`,
                  background: i >= 5 ? "#D4A843" : "rgba(255,255,255,0.15)",
                }}
              />
            ))}
          </div>
        </div>

        {/* Mini table */}
        <div className="rounded-xl bg-[#13151f] border border-white/6 overflow-hidden">
          <div className="grid grid-cols-3 px-3 py-1.5 border-b border-white/6">
            <span className="text-[8px] text-white/30 tracking-wider">CLIENT</span>
            <span className="text-[8px] text-white/30 tracking-wider text-right">REVENUE</span>
            <span className="text-[8px] text-white/30 tracking-wider text-right">STATUS</span>
          </div>
          {[
            { name: "Ansh Hospital", rev: "₹32K", status: "Active" },
            { name: "Gujarat Retail", rev: "₹18K", status: "Active" },
            { name: "EduPlus School", rev: "₹12K", status: "Active" },
          ].map(r => (
            <div key={r.name} className="grid grid-cols-3 px-3 py-2 border-b border-white/4 last:border-0">
              <span className="text-[9px] text-white/65">{r.name}</span>
              <span className="text-[9px] text-[#D4A843] text-right font-bold">{r.rev}</span>
              <span className="text-[9px] text-emerald-400 text-right">{r.status}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Service Bento Cards ─── */
function ServiceCard({
  icon, title, sub, bullets, href, wide, highlight,
}: {
  icon: string; title: string; sub: string; bullets: string[]; href: string;
  wide?: boolean; highlight?: boolean;
}) {
  return (
    <article
      className={`rounded-2xl overflow-hidden transition hover:-translate-y-0.5 ${wide ? "col-span-2" : ""}`}
      style={{
        background: highlight
          ? "linear-gradient(135deg,#0e1018,rgba(212,168,67,0.03))"
          : "#0e1018",
        border: highlight
          ? "1px solid rgba(212,168,67,0.2)"
          : "1px solid rgba(255,255,255,0.07)",
      }}
    >
      <div className="p-5 border-b border-white/8" style={{ background: "linear-gradient(135deg,rgba(212,168,67,0.05),transparent)" }}>
        <div className="text-3xl mb-3">{icon}</div>
        <h3 className="font-bold text-lg tracking-wider mb-1" style={{ fontFamily: '"Cinzel",serif' }}>{title}</h3>
        <p className="text-[11px] text-white/40 font-mono tracking-widest uppercase">{sub}</p>
      </div>
      <div className="p-5">
        <ul className="space-y-2 mb-5">
          {bullets.map(b => (
            <li key={b} className="flex gap-3 text-sm text-white/65">
              <span className="mt-[7px] w-[5px] h-[5px] shrink-0 rounded-full bg-[#D4A843]" aria-hidden/>
              {b}
            </li>
          ))}
        </ul>
        <Link to={href} className="text-sm font-bold text-[#D4A843] hover:text-amber-300 transition flex items-center gap-1">
          View Demo →
        </Link>
      </div>
    </article>
  );
}

/* ─── Why MAS TECH card ─── */
function WhyCard() {
  return (
    <article
      className="col-span-3 rounded-2xl p-6"
      style={{
        background: "rgba(34,197,94,0.04)",
        border: "1px solid rgba(34,197,94,0.15)",
      }}
    >
      <div className="text-3xl mb-3">🇮🇳</div>
      <h3 className="font-bold text-lg tracking-wider mb-4 text-white" style={{ fontFamily: '"Cinzel",serif' }}>WHY MAS TECH</h3>
      <ul className="grid sm:grid-cols-2 gap-3">
        {[
          "Built from Indian ground truth — not adapted from foreign templates",
          "Gujarat-based team with on-site onboarding and fast local support",
          "Single platform: Hospital OS + POS + ERP + Custom AI under one roof",
          "7-day FREE trial · Transparent pricing · No hidden costs",
        ].map(b => (
          <li key={b} className="flex gap-3 text-sm text-white/70">
            <span className="mt-1 text-emerald-400 shrink-0">✓</span>
            {b}
          </li>
        ))}
      </ul>
    </article>
  );
}

/* ─── HOME PAGE ─── */
export default function Home() {
  return (
    <div style={{ background: "#07080f" }}>

      {/* ── A. HERO — Split Layout ── */}
      <section className="relative overflow-hidden py-20 md:py-28 px-4">
        <div className="mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">

            {/* Left */}
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/25 bg-emerald-500/8 px-4 py-1.5 text-[11px] font-mono text-emerald-400 mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"/>
                GUJARAT LIVE · 15+ CLIENTS
              </div>

              <h1
                className="text-[3rem] md:text-[3.75rem] font-black leading-[1.08] tracking-tight text-white mb-5"
                style={{ fontFamily: '"Cinzel",serif' }}
              >
                AI Software for<br/>
                <span style={{ color: "#D4A843" }}>India's Real</span><br/>
                Businesses
              </h1>

              <p className="text-white/60 text-base leading-relaxed mb-8 max-w-lg">
                Hospital OS · Retail POS · School ERP · Custom AI — built from Indian ground truth. Not adapted from foreign templates.
              </p>

              <div className="flex flex-wrap gap-3">
                <a
                  href="#book-demo"
                  className="inline-flex items-center justify-center rounded-xl px-6 py-3.5 text-sm font-black uppercase tracking-wider text-[#07080f] hover:brightness-110 active:scale-[0.99]"
                  style={{ background: "#D4A843", fontFamily: '"Cinzel",serif' }}
                >
                  ⚡ Book Free Demo
                </a>
                <a
                  href={wh}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-xl bg-emerald-500 px-6 py-3.5 text-sm font-black uppercase tracking-wider text-emerald-950 shadow-lg shadow-emerald-500/25 hover:brightness-110 active:scale-[0.99]"
                >
                  💬 WhatsApp Now
                </a>
              </div>
            </div>

            {/* Right — Dashboard Mockup */}
            <div className="hidden lg:block">
              <DashboardMockup />
            </div>
          </div>
        </div>
      </section>

      {/* ── B. Stats Strip ── */}
      <div className="border-t border-b border-white/[0.06]">
        <div className="mx-auto max-w-6xl px-4 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/8">
            {[
              { num: "15+", label: "Clients" },
              { num: "99%", label: "Uptime" },
              { num: "₹50L+", label: "Revenue Powered" },
              { num: "4.9★", label: "JustDial Rating" },
            ].map(s => (
              <div key={s.label} className="px-6 py-3 text-center">
                <div className="text-2xl font-black text-[#D4A843]" style={{ fontFamily: '"Cinzel",serif' }}>{s.num}</div>
                <div className="mt-1 text-[11px] text-white/45 tracking-wide">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── C. Services Bento Grid ── */}
      <section className="py-16" id="services">
        <div className="mx-auto max-w-6xl px-4">
          <p className="text-[11px] font-mono tracking-[0.14em] text-[#D4A843] uppercase mb-3">⚡ Our Solutions</p>
          <h2 className="text-2xl font-black text-white md:text-3xl mb-3" style={{ fontFamily: '"Cinzel",serif' }}>
            4 Battle-Tested <span className="text-gradient">Software Platforms</span>
          </h2>
          <p className="text-white/55 text-sm leading-relaxed max-w-2xl mb-10">
            Each solution built for India's real conditions — designed from scratch for Gujarat first.
          </p>

          {/* Row 1 */}
          <div className="grid grid-cols-4 gap-3 mb-3">
            <ServiceCard
              wide highlight
              icon="🏥" title="HOSPITAL OS" sub="Live Demo Available"
              bullets={["OPD + patient records","Pharmacy + billing unified","Staff dashboards + alerts"]}
              href="/contact?intent=hospital"
            />
            <ServiceCard
              icon="🏪" title="RETAIL POS" sub="Inventory + Analytics"
              bullets={["Fast counter billing","Stock + purchase flows","Daily/weekly analytics"]}
              href="/contact?intent=retail"
            />
            <ServiceCard
              icon="🎓" title="SCHOOL ERP" sub="Fees + Attendance"
              bullets={["Fee cycles + receipts","Attendance + reports","Notices via WhatsApp"]}
              href="/contact?intent=school"
            />
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-4 gap-3">
            <ServiceCard
              icon="🤖" title="CUSTOM AI" sub="Chatbots + Automation"
              bullets={["Chatbots for sales/support","Internal ops copilots","Dashboards + automation"]}
              href="/contact?intent=ai"
            />
            <WhyCard />
          </div>
        </div>
      </section>

      <div className="border-t border-white/[0.06]"/>

      {/* ── D. Problems Section ── */}
      <section className="py-16" id="problems">
        <div className="mx-auto max-w-6xl px-4">
          <p className="text-[11px] font-mono tracking-[0.14em] text-[#D4A843] uppercase mb-3">⚠ The India Field Reality</p>
          <h2 className="text-2xl font-black text-white md:text-3xl mb-3" style={{ fontFamily: '"Cinzel",serif' }}>
            India's Businesses Are Running on <span className="text-gradient">WhatsApp & Excel</span>
          </h2>
          <p className="text-white/55 text-sm leading-relaxed max-w-2xl mb-10">
            Every hospital, distributor, school, and retailer faces the same invisible crisis. Here's what's really happening — and how MAS TECH fixes each one.
          </p>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <PCard icon="📍" title="FAKE ATTENDANCE & GPS" desc="Field agents marking from home. GPS faked. No store presence verification. Productivity invisible." fix="GPS-validated punch + store mapping"/>
            <PCard icon="📱" title="WHATSAPP CHAOS" desc="100+ daily messages. No tracking. Reports lost in threads. Critical updates missed." fix="Structured workflows + AI automation"/>
            <PCard icon="🏥" title="HOSPITAL PAPER CHAOS" desc="Patient records in registers. OPD queues unmanaged. Billing errors daily." fix="Hospital OS with unified patient flow"/>
            <PCard icon="🏪" title="RETAIL BLIND SPOTS" desc="No real-time inventory. Billing slow. Daily reports take hours. Owner blind to business health." fix="POS with live analytics dashboard"/>
            <PCard icon="🎓" title="SCHOOL FEE CONFUSION" desc="Manual fee registers. Late notices. Parent queries untracked. Staff overwhelmed." fix="School ERP with WhatsApp integration"/>
            <PCard icon="🤖" title="NO AI INTELLIGENCE" desc="No predictive insights. No automation. Every decision reactive. Competitors winning." fix="Custom AI chatbots + analytics"/>
          </div>
        </div>
      </section>

      <div className="border-t border-white/[0.06]"/>

      {/* ── E. Social Proof Strip ── */}
      <div className="py-10" id="trust">
        <div className="mx-auto max-w-6xl px-4">
          <p className="text-center text-[10px] font-mono tracking-[0.18em] text-white/30 uppercase mb-5">
            TRUSTED BY GUJARAT'S GROWING BUSINESSES
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {["Paradise Markcom", "Ansh Hospital", "Gujarat Retail", "EduPlus", "AI Labs"].map(name => (
              <div
                key={name}
                className="rounded-full px-5 py-2 text-sm text-white/40"
                style={{
                  background: "#13151f",
                  border: "1px solid rgba(255,255,255,0.07)",
                }}
              >
                {name}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-white/[0.06]"/>

      {/* ── F. Founder Note ── */}
      <FounderNote />

      <div className="border-t border-white/[0.06]"/>

      {/* ── G. Pricing ── */}
      <section className="py-16" id="pricing">
        <div className="mx-auto max-w-6xl px-4">
          <p className="text-[11px] font-mono tracking-[0.14em] text-[#D4A843] uppercase mb-3 text-center">💰 Simple Pricing</p>
          <h2 className="text-2xl font-black text-white md:text-3xl mb-3 text-center" style={{ fontFamily: '"Cinzel",serif' }}>
            Transparent Plans, <span className="text-gradient">No Hidden Costs</span>
          </h2>
          <p className="text-white/55 text-sm text-center mb-12">7-day FREE trial on all plans. Upgrade anytime.</p>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              { tier: "Starter", price: "₹6.5k/mo", desc: "Hospital OS starter. 7-day FREE trial included.", featured: false },
              { tier: "Pro", price: "₹15k/mo", desc: "Hospital + POS + ERP + analytics. Best for growing ops.", featured: true },
              { tier: "Enterprise", price: "Custom", desc: "SLA, custom AI, multi-branch, deep integrations.", featured: false },
            ].map(p => (
              <div
                key={p.tier}
                className="relative flex flex-col p-6 rounded-2xl"
                style={{
                  background: "#0e1018",
                  border: p.featured
                    ? "1px solid rgba(212,168,67,0.3)"
                    : "1px solid rgba(255,255,255,0.07)",
                  boxShadow: p.featured ? "0 0 0 1px rgba(212,168,67,0.2)" : "none",
                }}
              >
                {p.featured && (
                  <>
                    <div className="absolute -top-3 left-4 rounded-full bg-[#D4A843] px-2 py-0.5 text-[10px] font-black uppercase text-[#07080f]">Popular</div>
                    <div className="absolute -top-3 right-4 rounded-full bg-white px-2 py-0.5 text-[10px] font-black uppercase text-black">7-day FREE</div>
                  </>
                )}
                <div className="text-sm font-bold uppercase tracking-wider text-white/50">{p.tier}</div>
                <div className="mt-2 text-3xl font-black text-white">{p.price}</div>
                <p className="mt-4 flex-1 text-sm text-white/50">{p.desc}</p>
                <a href="#book-demo" className="mt-6 font-bold text-[#D4A843] hover:underline">Book Demo →</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── H. Book Demo ── */}
      <BookDemoSection />

      {/* ── I. Bottom CTA ── */}
      <section className="py-20 px-4 text-center">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-2xl md:text-3xl font-black text-white mb-3" style={{ fontFamily: '"Cinzel",serif' }}>
            Ready to Automate Your Business?
          </h2>
          <p className="text-white/50 text-sm mb-8">
            7-day FREE trial · No hidden costs · Gujarat-based support
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href="#book-demo"
              className="inline-flex items-center justify-center rounded-xl px-6 py-3.5 text-sm font-black uppercase tracking-wider text-[#07080f] hover:brightness-110"
              style={{ background: "#D4A843", fontFamily: '"Cinzel",serif' }}
            >
              ⚡ Book Free Demo
            </a>
            <a
              href={wh}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-xl bg-emerald-500 px-6 py-3.5 text-sm font-black uppercase tracking-wider text-emerald-950 hover:brightness-110"
            >
              💬 WhatsApp Now
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
