import { Link } from "react-router-dom";
import TrustBadge from "../components/TrustBadge";
import BookDemoSection from "../components/BookDemoSection";
import FounderNote from "../components/FounderNote";
import { motion } from "framer-motion";

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.55, ease: "easeOut" as const, delay },
});

const whatsappHref =
  String(import.meta.env.VITE_WHATSAPP_LINK || "").trim() ||
  "https://wa.me/?text=" +
    encodeURIComponent(
      "Hi MAS TECH, I want a demo for AI Software Solutions. Please share next steps."
    );

/* ─── Exact Trishul SVG paths (from mas-trishul-seal.svg) ─── */
const TRISHUL_DEFS = (id: string) => (
  <defs>
    <linearGradient
      id={`masTrishulGold${id}`}
      x1="10" y1="2" x2="46" y2="78"
      gradientUnits="userSpaceOnUse"
    >
      <stop stopColor="#fff8e7" />
      <stop offset="0.32" stopColor="#e6c66a" />
      <stop offset="0.65" stopColor="#c9a227" />
      <stop offset="1" stopColor="#4a3d12" />
    </linearGradient>
    <filter id={`masTrishulGlow${id}`} x="-80%" y="-80%" width="260%" height="260%">
      <feGaussianBlur stdDeviation="1.35" result="blur" />
      <feMerge>
        <feMergeNode in="blur" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>
  </defs>
);

const TRISHUL_PATHS = (id: string) => (
  <g
    stroke={`url(#masTrishulGold${id})`}
    strokeWidth="2.85"
    strokeLinecap="round"
    strokeLinejoin="round"
    filter={`url(#masTrishulGlow${id})`}
  >
    <path d="M28 74V30" />
    <path d="M28 30V9" />
    <path d="M28 22 11 7" />
    <path d="M28 22 45 7" />
    <path d="M18 34h20" />
  </g>
);

function TrishulIcon({
  width = 20,
  height = 24,
  opacity = 1,
  id = "t",
  className = "",
  style = {},
}: {
  width?: number;
  height?: number;
  opacity?: number;
  id?: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 56 80"
      fill="none"
      aria-hidden
      opacity={opacity}
      className={className}
      style={style}
    >
      {TRISHUL_DEFS(id)}
      {TRISHUL_PATHS(id)}
    </svg>
  );
}

/* ─── Section divider with Trishul ─── */
function TrishulDivider() {
  return (
    <div className="flex items-center gap-5 px-4 py-6 max-w-6xl mx-auto">
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#ffd700]/15 to-transparent" />
      <TrishulIcon width={16} height={20} opacity={0.3} id="div" />
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#ffd700]/15 to-transparent" />
    </div>
  );
}

/* ─── Problem card ─── */
function ProblemCard({
  icon, title, desc, fix,
}: { icon: string; title: string; desc: string; fix: string }) {
  return (
    <article className="relative overflow-hidden rounded-2xl border border-white/8 bg-white/[0.035] p-6 transition hover:border-red-500/30 hover:bg-red-500/[0.025]">
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-red-500 to-transparent" />
      <div className="text-2xl mb-3">{icon}</div>
      <h3 className="font-cinzel font-bold text-sm tracking-wider mb-2 text-white">{title}</h3>
      <p className="text-sm text-white/60 leading-relaxed mb-3">{desc}</p>
      <p className="text-sm text-emerald-400 font-semibold flex items-center gap-2">
        <span>✅</span> {fix}
      </p>
    </article>
  );
}

/* ─── Service card ─── */
function ServiceCard({
  icon, title, sub, bullets, href,
}: { icon: string; title: string; sub: string; bullets: string[]; href: string }) {
  return (
    <article className="rounded-2xl border border-white/8 bg-white/[0.035] overflow-hidden transition hover:border-[#ffd700]/20 hover:-translate-y-0.5">
      <div className="p-5 border-b border-white/8 bg-gradient-to-br from-[#ffd700]/5 to-transparent">
        <div className="text-3xl mb-3">{icon}</div>
        <h3 className="font-cinzel font-bold text-lg tracking-wider mb-1">{title}</h3>
        <p className="text-[11px] text-white/40 font-mono tracking-widest uppercase">{sub}</p>
      </div>
      <div className="p-5">
        <ul className="space-y-2 mb-5">
          {bullets.map((b) => (
            <li key={b} className="flex gap-3 text-sm text-white/65">
              <span className="mt-[7px] w-[5px] h-[5px] shrink-0 rounded-full bg-[#ffd700]" aria-hidden />
              {b}
            </li>
          ))}
        </ul>
        <Link to={href} className="text-sm font-bold text-[#ffd700] hover:text-amber-300 transition flex items-center gap-1">
          View Demo <span>→</span>
        </Link>
      </div>
    </article>
  );
}

/* ─── Workflow node ─── */
function WfNode({ icon, label, sub }: { icon: string; label: string; sub: string }) {
  return (
    <div className="shrink-0 flex flex-col items-center gap-2">
      <div className="w-16 h-16 rounded-[14px] border border-white/8 bg-white/[0.035] flex items-center justify-center text-2xl transition hover:-translate-y-1 hover:border-[#ffd700]/30 hover:shadow-[0_8px_28px_rgba(255,215,0,0.1)]">
        {icon}
      </div>
      <span className="font-cinzel text-[11px] font-semibold text-white/60 text-center w-20 tracking-wide leading-tight">{label}</span>
      <span className="text-[10px] text-white/35 text-center w-20">{sub}</span>
    </div>
  );
}

/* ─── AI feature row ─── */
function AiFeat({
  icon, title, desc, badge, badgeColor,
}: { icon: string; title: string; desc: string; badge: string; badgeColor: string }) {
  return (
    <div className="flex gap-4 p-4 rounded-xl border border-white/8 bg-white/[0.035] transition hover:border-[#ffd700]/20 hover:bg-[#ffd700]/[0.025]">
      <span className="text-xl shrink-0">{icon}</span>
      <div>
        <h4 className="font-cinzel font-bold text-[13px] tracking-wider mb-1">{title}</h4>
        <p className="text-[13px] text-white/55 leading-relaxed">{desc}</p>
        <span className={`inline-flex items-center gap-1 mt-2 text-[10px] px-2 py-0.5 rounded font-mono border ${badgeColor}`}>
          {badge}
        </span>
      </div>
    </div>
  );
}

/* ─── Testimonial card ─── */
function TestiCard({
  quote, name, org, initials,
}: { quote: string; name: string; org: string; initials: string }) {
  return (
    <div className="rounded-2xl border border-white/8 bg-white/[0.035] p-5">
      <p className="font-playfair italic text-[15px] leading-relaxed text-white/80 mb-4">
        <span className="text-[#ffd700] text-xl not-italic mr-1">&ldquo;</span>
        {quote}
      </p>
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-[#ffd700]/10 border border-[#ffd700]/25 flex items-center justify-center text-[11px] font-bold text-[#ffd700]">
          {initials}
        </div>
        <div>
          <div className="text-sm font-semibold text-white">{name}</div>
          <div className="text-[11px] text-white/40">{org}</div>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════
   MAIN HOME COMPONENT
══════════════════════════════════════ */
export default function Home() {
  return (
    <div>
      {/* ── HERO ── */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-black to-black min-h-screen flex flex-col items-center justify-center px-4 py-20 md:py-28">
        {/* Dual glow: blue (tech) + gold (heritage) */}
        <div
          className="mas-hero-anim pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% -10%, rgba(255,215,0,0.08), transparent 55%), radial-gradient(ellipse 60% 50% at 90% 20%, rgba(56,189,248,0.09), transparent 55%), radial-gradient(ellipse 70% 55% at 10% 80%, rgba(249,115,22,0.06), transparent 55%)",
          }}
          aria-hidden
        />

        {/* Trishul watermark — background */}
        <div className="pointer-events-none absolute bottom-10 right-10 opacity-[0.04]" aria-hidden>
          <TrishulIcon width={240} height={280} id="hero-wm" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          {/* Eyebrow badges */}
          <motion.div {...fade(0)} className="flex flex-wrap items-center justify-center gap-3 mb-8">
            <span
              className="inline-flex items-center rounded-full border border-[#ffd700]/25 bg-[#ffd700]/8 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-[#ffd700]/85"
              style={{ fontFamily: '"Cinzel", serif' }}
            >
              MAS TECH
            </span>
            <TrustBadge />
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/25 bg-emerald-500/8 px-3 py-1.5 text-[11px] font-mono text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.7)]" />
              GUJARAT LIVE
            </span>
          </motion.div>

          {/* Main headline */}
          <motion.h1
            {...fade(0.08)}
            className="text-4xl font-black leading-tight tracking-tight text-white md:text-6xl md:leading-[1.06]"
          >
            <span style={{ fontFamily: '"Cinzel", serif' }}>MAS TECH —{" "}</span>
            <span className="text-gradient">AI Software That Powers ₹50L+ Businesses</span>
          </motion.h1>

          {/* Tagline */}
          <motion.p
            {...fade(0.13)}
            className="mas-hero-tagline mt-4 text-xl md:text-2xl font-playfair italic"
            style={{ color: "rgba(255,215,0,0.75)" }}
          >
            &ldquo; You ASK. We AUTOMATE. &rdquo;
          </motion.p>

          {/* Sub */}
          <motion.p {...fade(0.18)} className="mt-5 text-lg text-white/75 max-w-2xl mx-auto">
            Hospital OS · Retail POS · School ERP · Custom AI — built from real Indian business
            ground truth. No generic templates. One team, full ownership.
          </motion.p>

          {/* CTAs */}
          <motion.div {...fade(0.22)} className="mt-8 flex flex-wrap justify-center gap-3">
            <a
              href="#book-demo"
              className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 px-6 py-3.5 text-sm font-black uppercase tracking-wider text-mas-bg shadow-lg shadow-amber-500/25 hover:brightness-110 active:scale-[0.99]"
              style={{ fontFamily: '"Cinzel", serif' }}
            >
              ⚡ Book Free Demo
            </a>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-xl bg-emerald-500 px-6 py-3.5 text-sm font-black uppercase tracking-wider text-emerald-950 shadow-lg shadow-emerald-500/25 transition hover:brightness-110 active:scale-[0.99]"
            >
              💬 WhatsApp Now
            </a>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center rounded-xl border border-sky-400/35 bg-sky-500/10 px-6 py-3.5 text-sm font-bold text-white transition hover:border-sky-300/55 hover:bg-sky-500/15"
            >
              Contact →
            </Link>
          </motion.div>

          {/* Metrics row */}
          <motion.div
            {...fade(0.26)}
            className="mt-10 inline-flex flex-wrap justify-center divide-x divide-white/10 rounded-2xl border border-[#ffd700]/12 bg-black/30 backdrop-blur-sm"
          >
            {[
              { k: "15+", v: "Clients" },
              { k: "99%", v: "Uptime" },
              { k: "₹50L+", v: "Revenue Generated" },
              { k: "4.9/5", v: "JustDial Rating" },
            ].map((x) => (
              <div key={x.v} className="px-5 py-3 text-center">
                <div
                  className="text-xl font-black text-[#ffd700]"
                  style={{ fontFamily: '"Cinzel", serif' }}
                >
                  {x.k}
                </div>
                <div className="mt-0.5 text-[11px] text-white/45 tracking-wide">{x.v}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── PROBLEMS ── */}
      <section className="border-y border-white/8 bg-black/20 py-16" id="problems">
        <div className="mx-auto max-w-6xl px-4">
          <div className="max-w-2xl">
            <p className="text-[11px] font-mono tracking-[0.14em] text-[#ffd700] uppercase mb-3">
              ⚠ The India Field Reality
            </p>
            <h2 className="text-2xl font-black text-white md:text-3xl mb-3" style={{ fontFamily: '"Cinzel", serif' }}>
              India's Businesses Are Running on{" "}
              <span className="text-gradient">WhatsApp & Excel</span>
            </h2>
            <p className="text-white/55 text-sm leading-relaxed">
              Every hospital, distribution company, school, and retailer faces the same invisible
              crisis. Here's what's really happening — and how MAS TECH fixes each one.
            </p>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <ProblemCard icon="📍" title="FAKE ATTENDANCE & GPS" desc="Field agents marking from home. GPS faked. No store presence verification. Productivity invisible." fix="GPS-validated punch + store mapping" />
            <ProblemCard icon="📱" title="WHATSAPP CHAOS" desc="100+ daily messages. No tracking. Reports lost in threads. Critical updates missed." fix="Structured workflows + AI automation" />
            <ProblemCard icon="🏥" title="HOSPITAL PAPER CHAOS" desc="Patient records in registers. OPD queues unmanaged. Billing errors daily." fix="Hospital OS with unified patient flow" />
            <ProblemCard icon="🏪" title="RETAIL BLIND SPOTS" desc="No real-time inventory. Billing slow. Daily reports take hours. Owner blind to business health." fix="POS with live analytics dashboard" />
            <ProblemCard icon="🎓" title="SCHOOL FEE CONFUSION" desc="Manual fee registers. Late notices. Parent queries untracked. Staff overwhelmed." fix="School ERP with WhatsApp integration" />
            <ProblemCard icon="🤖" title="NO AI INTELLIGENCE" desc="No predictive insights. No automation. Every decision reactive. Competitors winning." fix="Custom AI chatbots + analytics" />
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section className="py-16" id="services">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mx-auto max-w-3xl text-center mb-12">
            <p className="text-[11px] font-mono tracking-[0.14em] text-[#ffd700] uppercase mb-3">⚡ Our Solutions</p>
            <h2 className="text-2xl font-black text-white md:text-3xl mb-3" style={{ fontFamily: '"Cinzel", serif' }}>
              4 Battle-Tested <span className="text-gradient">Software Platforms</span>
            </h2>
            <p className="text-white/55 text-sm leading-relaxed">
              Each solution built for India's real conditions. Not adapted from foreign templates —
              designed from scratch for Gujarat first.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <ServiceCard
              icon="🏥"
              title="HOSPITAL OS"
              sub="Live Demo Available"
              bullets={["OPD + patient records", "Pharmacy + billing unified", "Staff dashboards + alerts"]}
              href="/contact?intent=hospital"
            />
            <ServiceCard
              icon="🏪"
              title="RETAIL POS"
              sub="Inventory + Analytics"
              bullets={["Fast counter billing", "Stock + purchase flows", "Daily/weekly analytics"]}
              href="/contact?intent=retail"
            />
            <ServiceCard
              icon="🎓"
              title="SCHOOL ERP"
              sub="Fees + Attendance"
              bullets={["Fee cycles + receipts", "Attendance + reports", "Notices via WhatsApp"]}
              href="/contact?intent=school"
            />
            <ServiceCard
              icon="🤖"
              title="CUSTOM AI"
              sub="Chatbots + Automation"
              bullets={["Chatbots for sales/support", "Internal ops copilots", "Dashboards + automation"]}
              href="/contact?intent=ai"
            />
          </div>
        </div>
      </section>

      <TrishulDivider />

      {/* ── FOUNDER'S NOTE ── */}
      <FounderNote />

      <TrishulDivider />

      {/* ── WORKFLOW ── */}
      <section className="border-y border-[#ffd700]/8 bg-white/[0.01] py-16">
        <div className="mx-auto max-w-6xl px-4">
          <div className="text-center mb-2">
            <p className="text-[11px] font-mono tracking-[0.14em] text-[#ffd700] uppercase mb-3">🔄 How It Flows</p>
            <h2 className="text-2xl font-black text-white md:text-3xl" style={{ fontFamily: '"Cinzel", serif' }}>
              From Your Ask to <span className="text-gradient">Live Automation</span>
            </h2>
          </div>
          <div className="flex items-center overflow-x-auto py-12 gap-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {[
              { icon: "🤝", label: "FREE AUDIT", sub: "Understand your ops" },
              { icon: "🎯", label: "DESIGN", sub: "India-fit solution" },
              { icon: "⚡", label: "BUILD", sub: "Fast delivery" },
              { icon: "🚀", label: "DEPLOY", sub: "Live + trained" },
              { icon: "🤖", label: "AI LAYER", sub: "Automation active" },
              { icon: "📈", label: "GROWTH", sub: "You scale, we support" },
            ].map((n, i, arr) => (
              <div key={n.label} className="flex items-center shrink-0">
                <WfNode {...n} />
                {i < arr.length - 1 && (
                  <div className="shrink-0 w-12 flex items-center justify-center text-[#ffd700]/25 relative">
                    <div className="absolute left-2 right-2 top-1/2 h-px bg-gradient-to-r from-transparent via-[#ffd700]/20 to-transparent" />
                    <span className="relative text-base">→</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── AI SECTION ── */}
      <section className="py-16" id="ai">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid gap-14 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="text-[11px] font-mono tracking-[0.14em] text-[#ffd700] uppercase mb-3">🧠 AI Intelligence Layer</p>
              <h2 className="text-2xl font-black text-white md:text-3xl mb-3" style={{ fontFamily: '"Cinzel", serif' }}>
                Not Just Software.<br />
                <span className="text-gradient">Thinking Systems.</span>
              </h2>
              <p className="text-white/55 text-sm leading-relaxed mb-8">
                The AI layer doesn't just collect data — it interprets, alerts, coaches, and acts.
                In Hindi, Gujarati, and English.
              </p>
              <div className="flex flex-col gap-4">
                <AiFeat icon="📞" title="AI WHATSAPP AUTOMATION" desc="Auto-send reports, alerts, and updates. Replaces manual forwards entirely." badge="● LIVE" badgeColor="border-emerald-500/30 text-emerald-400 bg-emerald-500/10" />
                <AiFeat icon="🔍" title="ANOMALY DETECTION" desc="AI flags suspicious GPS patterns, attendance anomalies, and productivity gaps before they escalate." badge="◑ BETA" badgeColor="border-[#ffd700]/25 text-[#ffd700] bg-[#ffd700]/8" />
                <AiFeat icon="🛣️" title="ROUTE INTELLIGENCE" desc="Optimal daily routes for field agents. Reduces fuel cost, maximises coverage per day." badge="◎ SOON" badgeColor="border-sky-500/25 text-sky-400 bg-sky-500/8" />
                <AiFeat icon="🌐" title="MULTILINGUAL AI" desc="Hindi · Gujarati · English — AI speaks the language of your field team." badge="◑ IN DEVELOPMENT" badgeColor="border-[#ffd700]/25 text-[#ffd700] bg-[#ffd700]/8" />
              </div>
            </div>

            {/* AI Chat demo — Hindi mode */}
            <div
              className="rounded-2xl border border-[#ffd700]/12 bg-[#06091200] p-6 relative overflow-hidden"
              style={{ background: "rgba(6,9,18,0.92)" }}
            >
              <div
                className="pointer-events-none absolute inset-0 rounded-2xl"
                style={{ background: "radial-gradient(ellipse at top right, rgba(255,215,0,0.04), transparent 60%)" }}
                aria-hidden
              />
              <div className="relative flex items-center gap-2 mb-5 font-mono text-[11px] text-[#ffd700]">
                <TrishulIcon width={12} height={14} id="ai-head" style={{ display: "inline" }} />
                MAS TECH AI — HINDI MODE
                <span className="flex items-center gap-1 text-emerald-400 text-[10px] ml-auto">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  PROTOTYPE
                </span>
              </div>
              <div className="relative flex flex-col gap-3">
                {[
                  { role: "ai", text: "Namaste! Aaj aapke zone mein 3 stores ka follow-up pending hai. Kya main Rajesh ko automatically remind karun?" },
                  { role: "user", text: "Haan, remind karo aur GPS check bhi karo ki wo actually store pe hai." },
                  { role: "ai", text: "Rajesh ko reminder bhej diya. GPS verify ho raha hai... ✅ Chandkheda store pe confirmed. Visit log ho raha hai." },
                  { role: "ai", text: "⚠️ Alert: Store #112 — 5 din se koi visit nahi. Priority follow-up recommend kar raha hun." },
                ].map((m, i) => (
                  <div key={i} className={`flex gap-2 items-start ${m.role === "user" ? "flex-row-reverse" : ""}`}>
                    <div
                      className="w-7 h-7 rounded-full shrink-0 flex items-center justify-center text-[10px] font-bold"
                      style={
                        m.role === "ai"
                          ? { background: "rgba(255,215,0,0.1)", color: "#ffd700" }
                          : { background: "rgba(59,130,246,0.15)", color: "#3b82f6" }
                      }
                    >
                      {m.role === "ai" ? "AI" : "SM"}
                    </div>
                    <div
                      className="max-w-[220px] rounded-xl px-3 py-2 text-[13px] leading-relaxed text-white"
                      style={
                        m.role === "ai"
                          ? { background: "rgba(255,215,0,0.06)", border: "1px solid rgba(255,215,0,0.15)", borderRadius: "4px 12px 12px 12px" }
                          : { background: "rgba(59,130,246,0.12)", border: "1px solid rgba(59,130,246,0.2)", borderRadius: "12px 4px 12px 12px" }
                      }
                    >
                      {m.text}
                    </div>
                  </div>
                ))}
                {/* Typing indicator */}
                <div className="flex gap-2 items-start">
                  <div className="w-7 h-7 rounded-full shrink-0 flex items-center justify-center text-[10px] font-bold" style={{ background: "rgba(255,215,0,0.1)", color: "#ffd700" }}>AI</div>
                  <div className="flex gap-1 items-center px-3 py-2 rounded-xl" style={{ background: "rgba(255,215,0,0.06)", border: "1px solid rgba(255,215,0,0.15)", borderRadius: "4px 12px 12px 12px" }}>
                    {[0, 0.2, 0.4].map((d, i) => (
                      <span key={i} className="w-1.5 h-1.5 rounded-full bg-[#ffd700] animate-bounce" style={{ animationDelay: `${d}s` }} />
                    ))}
                  </div>
                </div>
              </div>
              <div className="mt-5 pt-4 border-t border-white/8">
                <p className="text-[10px] font-mono text-white/30 mb-2 tracking-wider">LANGUAGE SUPPORT</p>
                <div className="flex flex-wrap gap-2">
                  {[
                    { l: "Hindi", c: "border-emerald-500/30 text-emerald-400 bg-emerald-500/10" },
                    { l: "English", c: "border-emerald-500/30 text-emerald-400 bg-emerald-500/10" },
                    { l: "Gujarati", c: "border-[#ffd700]/25 text-[#ffd700] bg-[#ffd700]/8" },
                    { l: "Marathi", c: "border-sky-500/25 text-sky-400 bg-sky-500/8" },
                  ].map((x) => (
                    <span key={x.l} className={`text-[10px] px-2 py-0.5 rounded font-mono border ${x.c}`}>{x.l}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TRUST ── */}
      <section className="border-y border-white/8 bg-black/15 py-16" id="trust">
        <div className="mx-auto max-w-6xl px-4">
          <div className="text-center mb-10">
            <p className="text-[11px] font-mono tracking-[0.14em] text-[#ffd700] uppercase mb-3">🛡 Trusted by Gujarat</p>
            <h2 className="text-2xl font-black text-white md:text-3xl mb-2" style={{ fontFamily: '"Cinzel", serif' }}>
              Trusted by Gujarat's <span className="text-gradient">Top Businesses</span>
            </h2>
            <p className="text-white/55 text-sm">
              <span className="font-black text-white">4.9/5</span> JustDial Rating · Reliable
              delivery · Real adoption
            </p>
          </div>

          {/* Client logos */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5 mb-12">
            {["Paradise Markcom", "Ansh Hospital", "Gujarat Retail", "EduPlus", "AI Labs"].map((x) => (
              <div key={x} className="glass-xl flex items-center justify-center px-4 py-5 text-sm font-black text-white/75">
                {x}
              </div>
            ))}
          </div>

          {/* Testimonials */}
          <div className="grid gap-4 md:grid-cols-2">
            <TestiCard quote="Within a week, field attendance became routine. No chasing. Data is finally trusted." name="Operations Head" org="Distribution — Ahmedabad" initials="OH" />
            <TestiCard quote="Patients + billing + pharmacy got unified. Staff adoption was smooth from day one." name="Hospital Admin" org="Women's Clinic — Gujarat" initials="HA" />
            <TestiCard quote="Billing is fast, stock is visible, and reports are clear. Saved hours every week." name="Retail Owner" org="Multi-store — Ahmedabad" initials="RO" />
            <TestiCard quote="Their chatbot + dashboard gave us lead clarity. We stopped losing inquiries on WhatsApp." name="Founder" org="Service Business — Gujarat" initials="FO" />
          </div>

          {/* Case study */}
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            <article className="glass-panel p-8">
              <div className="text-xs font-black uppercase tracking-wider text-mas-accent mb-2">Paradise Markcom</div>
              <h3 className="mt-2 text-2xl font-black text-white">100% Adoption in 1 Week</h3>
              <p className="mt-3 text-sm leading-relaxed text-mas-muted">
                Mobile-first attendance + visit flow designed for field reality, not
                &ldquo;office-perfect&rdquo; assumptions.
              </p>
              <a
                href="https://paradisenmarkcompvtltd.netlify.app"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center font-bold text-mas-primary hover:underline"
              >
                View LIVE demo ↗
              </a>
            </article>
            <article className="glass-panel p-8 lg:col-span-2">
              <div className="text-xs font-black uppercase tracking-wider text-amber-200/85 mb-2">Before → After</div>
              <h3 className="mt-2 text-2xl font-black text-white">Field ops clarity + discipline</h3>
              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                {[
                  { a: "Manual chasing", b: "Auto attendance + logs" },
                  { a: "Low visibility", b: "Live dashboards" },
                  { a: "Inconsistent usage", b: "100% adoption" },
                ].map((m) => (
                  <div key={m.b} className="rounded-2xl border border-white/10 bg-black/30 p-5">
                    <div className="text-xs font-bold uppercase tracking-wider text-white/50">Before</div>
                    <div className="mt-2 text-sm font-semibold text-white/80">{m.a}</div>
                    <div className="mt-4 text-xs font-bold uppercase tracking-wider text-white/50">After</div>
                    <div className="mt-2 text-sm font-black text-white">{m.b}</div>
                  </div>
                ))}
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section className="border-b border-white/10 bg-black/20 py-16" id="pricing">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mx-auto max-w-3xl text-center mb-12">
            <p className="text-[11px] font-mono tracking-[0.14em] text-[#ffd700] uppercase mb-3">💰 Simple Pricing</p>
            <h2 className="text-2xl font-black text-white md:text-3xl mb-3" style={{ fontFamily: '"Cinzel", serif' }}>
              Transparent Plans, <span className="text-gradient">No Hidden Costs</span>
            </h2>
            <p className="text-white/55 text-sm">
              Choose a plan, then we tailor features per your workflow. Upgrade any time. 7-day
              FREE trial on all plans.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                tier: "Starter",
                price: "₹6.5k/mo",
                desc: "Hospital OS starter. Includes a 7-day FREE trial.",
                featured: false,
                label: "",
              },
              {
                tier: "Pro",
                price: "₹15k/mo",
                desc: "Multi-module stack: Hospital + POS + ERP + analytics. Best for growing ops.",
                featured: true,
                label: "Popular",
              },
              {
                tier: "Enterprise",
                price: "Custom",
                desc: "SLA, custom AI, multi-branch, compliance, deep integrations.",
                featured: false,
                label: "",
              },
            ].map((p) => (
              <div
                key={p.tier}
                className={`glass-panel relative flex flex-col p-6 ${p.featured ? "border-mas-primary/40 ring-2 ring-mas-primary/30" : ""}`}
              >
                {p.label && (
                  <>
                    <div className="absolute -top-3 left-4 rounded-full bg-mas-primary px-2 py-0.5 text-[10px] font-black uppercase text-mas-bg">
                      {p.label}
                    </div>
                    <div className="absolute -top-3 right-4 rounded-full bg-white px-2 py-0.5 text-[10px] font-black uppercase text-black">
                      7-day FREE trial
                    </div>
                  </>
                )}
                <div className="text-sm font-bold uppercase tracking-wider text-mas-muted">{p.tier}</div>
                <div className="mt-2 text-3xl font-black text-white">{p.price}</div>
                <p className="mt-4 flex-1 text-sm text-mas-muted">{p.desc}</p>
                <a href="#book-demo" className="mt-6 font-bold text-mas-primary hover:underline">
                  Book Demo →
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ROADMAP ── */}
      <section className="py-16 border-b border-white/8 bg-white/[0.01]">
        <div className="mx-auto max-w-6xl px-4">
          <p className="text-[11px] font-mono tracking-[0.14em] text-[#ffd700] uppercase mb-3">🗺 Product Roadmap</p>
          <h2 className="text-2xl font-black text-white md:text-3xl mb-12" style={{ fontFamily: '"Cinzel", serif' }}>
            Building the Future of <span className="text-gradient">India Field Intelligence</span>
          </h2>
          <div className="relative flex flex-col">
            <div className="absolute left-[26px] top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#ffd700] via-sky-500 to-white/10" />
            {[
              { phase: "PHASE 1 — LIVE", title: "Core Platform Deployed", tags: ["GPS Attendance", "Hospital OS", "Retail POS", "School ERP", "Offline PWA"], dot: "done" },
              { phase: "PHASE 2 — IN PROGRESS", title: "AI Intelligence Layer", tags: ["AI Anomaly Detection", "Hindi AI Assistant", "WhatsApp AI", "Route Intelligence"], dot: "active" },
              { phase: "PHASE 3 — UPCOMING", title: "Distribution Intelligence", tags: ["Predictive Analytics", "Retailer Graph", "Auto Coaching", "Delivery AI"], dot: "soon" },
              { phase: "PHASE 4 — VISION", title: "India Operations OS", tags: ["6 Languages AI", "Retailer App", "Demand Forecasting", "Enterprise API"], dot: "soon" },
            ].map((rm, i) => (
              <div key={i} className="relative flex gap-6 pl-14 py-6">
                <div
                  className={`absolute left-[18px] top-8 w-4 h-4 rounded-full border-2 flex items-center justify-center text-[7px] ${
                    rm.dot === "done"
                      ? "bg-[#ffd700] border-[#ffd700]"
                      : rm.dot === "active"
                      ? "bg-mas-bg border-sky-400 shadow-[0_0_14px_rgba(56,189,248,0.4)]"
                      : "bg-mas-bg border-white/20"
                  }`}
                >
                  {rm.dot === "done" && "✓"}
                </div>
                <div>
                  <p className="font-mono text-[10px] text-white/30 tracking-widest mb-1">{rm.phase}</p>
                  <h3 className="font-cinzel font-bold text-[15px] tracking-wide mb-3">{rm.title}</h3>
                  <div className="flex flex-wrap gap-2">
                    {rm.tags.map((t) => (
                      <span
                        key={t}
                        className={`text-[11px] px-2.5 py-0.5 rounded border ${
                          rm.dot === "done"
                            ? "border-emerald-500/30 text-emerald-400 bg-emerald-500/6"
                            : rm.dot === "active"
                            ? "border-[#ffd700]/25 text-[#ffd700] bg-[#ffd700]/6"
                            : "border-white/10 text-white/40"
                        }`}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BOOK DEMO (Calendly) ── */}
      <BookDemoSection />
    </div>
  );
}
