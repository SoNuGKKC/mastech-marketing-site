import { Link } from "react-router-dom";
import TrustBadge from "../components/TrustBadge";
import BookDemoSection from "../components/BookDemoSection";
import FounderNote from "../components/FounderNote";
import { motion } from "framer-motion";

const wh = String(import.meta.env.VITE_WHATSAPP_LINK || "").trim() || "https://wa.me/?text=" + encodeURIComponent("Hi MAS TECH, I want a demo for AI Software Solutions. Please share next steps.");

function TrishulDivider() {
  return (
    <div className="flex items-center gap-5 px-4 py-6 max-w-6xl mx-auto">
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#ffd700]/15 to-transparent"/>
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="22" viewBox="0 0 56 80" fill="none" aria-hidden opacity={0.3}>
        <defs>
          <linearGradient id="tgDiv" x1="10" y1="2" x2="46" y2="78" gradientUnits="userSpaceOnUse">
            <stop stopColor="#fff8e7"/><stop offset="0.32" stopColor="#e6c66a"/>
            <stop offset="0.65" stopColor="#c9a227"/><stop offset="1" stopColor="#4a3d12"/>
          </linearGradient>
          <filter id="tgGDiv" x="-80%" y="-80%" width="260%" height="260%">
            <feGaussianBlur stdDeviation="1.35" result="blur"/>
            <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
        </defs>
        <g stroke="url(#tgDiv)" strokeWidth="2.85" strokeLinecap="round" strokeLinejoin="round" filter="url(#tgGDiv)">
          <path d="M28 74V30"/><path d="M28 30V9"/>
          <path d="M28 22 11 7"/><path d="M28 22 45 7"/>
          <path d="M18 34h20"/>
        </g>
      </svg>
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#ffd700]/15 to-transparent"/>
    </div>
  );
}

function PCard({ icon, title, desc, fix }: { icon: string; title: string; desc: string; fix: string }) {
  return (
    <article className="relative overflow-hidden rounded-2xl border border-white/8 bg-white/[0.035] p-6 transition hover:border-red-500/30 hover:bg-red-500/[0.025]">
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-red-500 to-transparent"/>
      <div className="text-2xl mb-3">{icon}</div>
      <h3 className="font-bold text-sm tracking-wider mb-2 text-white" style={{ fontFamily:'"Cinzel",serif' }}>{title}</h3>
      <p className="text-sm text-white/60 leading-relaxed mb-3">{desc}</p>
      <p className="text-sm text-emerald-400 font-semibold flex items-center gap-2">✅ {fix}</p>
    </article>
  );
}

function SCard({ icon, title, sub, bullets, href }: { icon: string; title: string; sub: string; bullets: string[]; href: string }) {
  return (
    <article className="rounded-2xl border border-white/8 bg-white/[0.035] overflow-hidden transition hover:border-[#ffd700]/20 hover:-translate-y-0.5">
      <div className="p-5 border-b border-white/8 bg-gradient-to-br from-[#ffd700]/5 to-transparent">
        <div className="text-3xl mb-3">{icon}</div>
        <h3 className="font-bold text-lg tracking-wider mb-1" style={{ fontFamily:'"Cinzel",serif' }}>{title}</h3>
        <p className="text-[11px] text-white/40 font-mono tracking-widest uppercase">{sub}</p>
      </div>
      <div className="p-5">
        <ul className="space-y-2 mb-5">
          {bullets.map(b => <li key={b} className="flex gap-3 text-sm text-white/65"><span className="mt-[7px] w-[5px] h-[5px] shrink-0 rounded-full bg-[#ffd700]" aria-hidden/>{b}</li>)}
        </ul>
        <Link to={href} className="text-sm font-bold text-[#ffd700] hover:text-amber-300 transition flex items-center gap-1">View Demo →</Link>
      </div>
    </article>
  );
}

export default function Home() {
  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden min-h-screen flex flex-col items-center justify-center px-4 py-20 md:py-28" style={{ background:"linear-gradient(180deg,#0a0f1e 0%,#05070c 100%)" }}>
        <div className="mas-hero-anim pointer-events-none absolute inset-0" style={{ background:"radial-gradient(ellipse 80% 60% at 50% -10%,rgba(255,215,0,0.07),transparent 55%),radial-gradient(ellipse 60% 50% at 90% 20%,rgba(56,189,248,0.09),transparent 55%)" }} aria-hidden/>
        {/* Trishul watermark */}
        <div className="pointer-events-none absolute bottom-10 right-10 opacity-[0.04]" aria-hidden>
          <svg xmlns="http://www.w3.org/2000/svg" width="220" height="308" viewBox="0 0 56 80" fill="none">
            <defs>
              <linearGradient id="tgWM" x1="10" y1="2" x2="46" y2="78" gradientUnits="userSpaceOnUse">
                <stop stopColor="#fff8e7"/><stop offset="0.32" stopColor="#e6c66a"/>
                <stop offset="0.65" stopColor="#c9a227"/><stop offset="1" stopColor="#4a3d12"/>
              </linearGradient>
            </defs>
            <g stroke="url(#tgWM)" strokeWidth="2.85" strokeLinecap="round" strokeLinejoin="round">
              <path d="M28 74V30"/><path d="M28 30V9"/>
              <path d="M28 22 11 7"/><path d="M28 22 45 7"/>
              <path d="M18 34h20"/>
            </g>
          </svg>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity:0,y:14 }} animate={{ opacity:1,y:0 }} transition={{ duration:0.5 }} className="flex flex-wrap items-center justify-center gap-3 mb-8">
            <span className="inline-flex items-center rounded-full border border-[#ffd700]/25 bg-[#ffd700]/8 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-[#ffd700]/85" style={{ fontFamily:'"Cinzel",serif' }}>MAS TECH</span>
            <TrustBadge/>
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/25 bg-emerald-500/8 px-3 py-1.5 text-[11px] font-mono text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.7)]"/>GUJARAT LIVE
            </span>
          </motion.div>

          <motion.h1 initial={{ opacity:0,y:16 }} animate={{ opacity:1,y:0 }} transition={{ duration:0.55,delay:0.08 }} className="text-4xl font-black leading-tight tracking-tight text-white md:text-6xl md:leading-[1.06]" style={{ fontFamily:'"Cinzel",serif' }}>
            MAS TECH —{" "}<span className="text-gradient">AI Software That Powers ₹50L+ Businesses</span>
          </motion.h1>

          <motion.p initial={{ opacity:0,y:12 }} animate={{ opacity:1,y:0 }} transition={{ duration:0.5,delay:0.13 }} className="mas-hero-tagline mt-4 text-xl md:text-2xl font-playfair italic" style={{ color:"rgba(255,215,0,0.75)" }}>
            " You ASK. We AUTOMATE. "
          </motion.p>

          <motion.p initial={{ opacity:0,y:10 }} animate={{ opacity:1,y:0 }} transition={{ duration:0.5,delay:0.18 }} className="mt-5 text-lg text-white/70 max-w-2xl mx-auto leading-relaxed">
            Hospital OS · Retail POS · School ERP · Custom AI — built from real Indian business ground truth. No generic templates. One team, full ownership.
          </motion.p>

          <motion.div initial={{ opacity:0,y:10 }} animate={{ opacity:1,y:0 }} transition={{ duration:0.5,delay:0.22 }} className="mt-8 flex flex-wrap justify-center gap-3">
            <a href="#book-demo" className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 px-6 py-3.5 text-sm font-black uppercase tracking-wider text-mas-bg shadow-lg shadow-amber-500/25 hover:brightness-110 active:scale-[0.99]" style={{ fontFamily:'"Cinzel",serif' }}>⚡ Book Free Demo</a>
            <a href={wh} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center rounded-xl bg-emerald-500 px-6 py-3.5 text-sm font-black uppercase tracking-wider text-emerald-950 shadow-lg shadow-emerald-500/25 hover:brightness-110 active:scale-[0.99]">💬 WhatsApp Now</a>
            <Link to="/contact" className="inline-flex items-center justify-center rounded-xl border border-sky-400/35 bg-sky-500/10 px-6 py-3.5 text-sm font-bold text-white hover:border-sky-300/55 hover:bg-sky-500/15">Contact →</Link>
          </motion.div>

          <motion.div initial={{ opacity:0,y:10 }} animate={{ opacity:1,y:0 }} transition={{ duration:0.5,delay:0.26 }} className="mt-10 inline-flex flex-wrap justify-center divide-x divide-white/10 rounded-2xl border border-[#ffd700]/12 bg-black/30 backdrop-blur-sm">
            {[{k:"15+",v:"Clients"},{k:"99%",v:"Uptime"},{k:"₹50L+",v:"Revenue Generated"},{k:"4.9/5",v:"JustDial Rating"}].map(x=>(
              <div key={x.v} className="px-5 py-3 text-center">
                <div className="text-xl font-black text-[#ffd700]" style={{ fontFamily:'"Cinzel",serif' }}>{x.k}</div>
                <div className="mt-0.5 text-[11px] text-white/45 tracking-wide">{x.v}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* PROBLEMS */}
      <section className="border-y border-white/8 bg-black/20 py-16" id="problems">
        <div className="mx-auto max-w-6xl px-4">
          <p className="text-[11px] font-mono tracking-[0.14em] text-[#ffd700] uppercase mb-3">⚠ The India Field Reality</p>
          <h2 className="text-2xl font-black text-white md:text-3xl mb-3" style={{ fontFamily:'"Cinzel",serif' }}>India's Businesses Are Running on <span className="text-gradient">WhatsApp & Excel</span></h2>
          <p className="text-white/55 text-sm leading-relaxed max-w-2xl">Every hospital, distributor, school, and retailer faces the same invisible crisis. Here's what's really happening — and how MAS TECH fixes each one.</p>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <PCard icon="📍" title="FAKE ATTENDANCE & GPS" desc="Field agents marking from home. GPS faked. No store presence verification. Productivity invisible." fix="GPS-validated punch + store mapping"/>
            <PCard icon="📱" title="WHATSAPP CHAOS" desc="100+ daily messages. No tracking. Reports lost in threads. Critical updates missed." fix="Structured workflows + AI automation"/>
            <PCard icon="🏥" title="HOSPITAL PAPER CHAOS" desc="Patient records in registers. OPD queues unmanaged. Billing errors daily." fix="Hospital OS with unified patient flow"/>
            <PCard icon="🏪" title="RETAIL BLIND SPOTS" desc="No real-time inventory. Billing slow. Daily reports take hours. Owner blind to business health." fix="POS with live analytics dashboard"/>
            <PCard icon="🎓" title="SCHOOL FEE CONFUSION" desc="Manual fee registers. Late notices. Parent queries untracked. Staff overwhelmed." fix="School ERP with WhatsApp integration"/>
            <PCard icon="🤖" title="NO AI INTELLIGENCE" desc="No predictive insights. No automation. Every decision reactive. Competitors winning." fix="Custom AI chatbots + analytics"/>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="py-16" id="services">
        <div className="mx-auto max-w-6xl px-4">
          <p className="text-[11px] font-mono tracking-[0.14em] text-[#ffd700] uppercase mb-3">⚡ Our Solutions</p>
          <h2 className="text-2xl font-black text-white md:text-3xl mb-3" style={{ fontFamily:'"Cinzel",serif' }}>4 Battle-Tested <span className="text-gradient">Software Platforms</span></h2>
          <p className="text-white/55 text-sm leading-relaxed max-w-2xl mb-12">Each solution built for India's real conditions. Not adapted from foreign templates — designed from scratch for Gujarat first.</p>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <SCard icon="🏥" title="HOSPITAL OS" sub="Live Demo Available" bullets={["OPD + patient records","Pharmacy + billing unified","Staff dashboards + alerts"]} href="/contact?intent=hospital"/>
            <SCard icon="🏪" title="RETAIL POS" sub="Inventory + Analytics" bullets={["Fast counter billing","Stock + purchase flows","Daily/weekly analytics"]} href="/contact?intent=retail"/>
            <SCard icon="🎓" title="SCHOOL ERP" sub="Fees + Attendance" bullets={["Fee cycles + receipts","Attendance + reports","Notices via WhatsApp"]} href="/contact?intent=school"/>
            <SCard icon="🤖" title="CUSTOM AI" sub="Chatbots + Automation" bullets={["Chatbots for sales/support","Internal ops copilots","Dashboards + automation"]} href="/contact?intent=ai"/>
          </div>
        </div>
      </section>

      <TrishulDivider/>

      <FounderNote/>

      <TrishulDivider/>

      {/* TRUST */}
      <section className="border-y border-white/8 bg-black/15 py-16" id="trust">
        <div className="mx-auto max-w-6xl px-4">
          <p className="text-[11px] font-mono tracking-[0.14em] text-[#ffd700] uppercase mb-3 text-center">🛡 Trusted by Gujarat</p>
          <h2 className="text-2xl font-black text-white md:text-3xl mb-2 text-center" style={{ fontFamily:'"Cinzel",serif' }}>Trusted by Gujarat's <span className="text-gradient">Top Businesses</span></h2>
          <p className="text-white/55 text-sm text-center mb-10"><span className="font-black text-white">4.9/5</span> JustDial Rating · Reliable delivery · Real adoption</p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5 mb-10">
            {["Paradise Markcom","Ansh Hospital","Gujarat Retail","EduPlus","AI Labs"].map(x=>(
              <div key={x} className="glass-xl flex items-center justify-center px-4 py-5 text-sm font-black text-white/75">{x}</div>
            ))}
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {[{q:"Within a week, field attendance became routine. No chasing. Data is finally trusted.",n:"Operations Head",o:"Distribution — Ahmedabad",i:"OH"},
              {q:"Patients + billing + pharmacy got unified. Staff adoption was smooth from day one.",n:"Hospital Admin",o:"Women's Clinic — Gujarat",i:"HA"},
              {q:"Billing is fast, stock is visible, and reports are clear. Saved hours every week.",n:"Retail Owner",o:"Multi-store — Ahmedabad",i:"RO"},
              {q:"Their chatbot + dashboard gave us lead clarity. We stopped losing inquiries on WhatsApp.",n:"Founder",o:"Service Business — Gujarat",i:"FO"}
            ].map(t=>(
              <div key={t.i} className="rounded-2xl border border-white/8 bg-white/[0.035] p-5">
                <p className="font-playfair italic text-[15px] leading-relaxed text-white/80 mb-4"><span className="text-[#ffd700] text-xl not-italic mr-1">"</span>{t.q}</p>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#ffd700]/10 border border-[#ffd700]/25 flex items-center justify-center text-[11px] font-bold text-[#ffd700]">{t.i}</div>
                  <div><div className="text-sm font-semibold text-white">{t.n}</div><div className="text-[11px] text-white/40">{t.o}</div></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="border-b border-white/10 bg-black/20 py-16" id="pricing">
        <div className="mx-auto max-w-6xl px-4">
          <p className="text-[11px] font-mono tracking-[0.14em] text-[#ffd700] uppercase mb-3 text-center">💰 Simple Pricing</p>
          <h2 className="text-2xl font-black text-white md:text-3xl mb-3 text-center" style={{ fontFamily:'"Cinzel",serif' }}>Transparent Plans, <span className="text-gradient">No Hidden Costs</span></h2>
          <p className="text-white/55 text-sm text-center mb-12">7-day FREE trial on all plans. Upgrade anytime.</p>
          <div className="grid gap-6 md:grid-cols-3">
            {[{tier:"Starter",price:"₹6.5k/mo",desc:"Hospital OS starter. 7-day FREE trial included.",featured:false},
              {tier:"Pro",price:"₹15k/mo",desc:"Hospital + POS + ERP + analytics. Best for growing ops.",featured:true},
              {tier:"Enterprise",price:"Custom",desc:"SLA, custom AI, multi-branch, deep integrations.",featured:false}
            ].map(p=>(
              <div key={p.tier} className={`glass-panel relative flex flex-col p-6 ${p.featured?"border-mas-primary/40 ring-2 ring-mas-primary/30":""}`}>
                {p.featured && <>
                  <div className="absolute -top-3 left-4 rounded-full bg-mas-primary px-2 py-0.5 text-[10px] font-black uppercase text-mas-bg">Popular</div>
                  <div className="absolute -top-3 right-4 rounded-full bg-white px-2 py-0.5 text-[10px] font-black uppercase text-black">7-day FREE</div>
                </>}
                <div className="text-sm font-bold uppercase tracking-wider text-mas-muted">{p.tier}</div>
                <div className="mt-2 text-3xl font-black text-white">{p.price}</div>
                <p className="mt-4 flex-1 text-sm text-mas-muted">{p.desc}</p>
                <a href="#book-demo" className="mt-6 font-bold text-mas-primary hover:underline">Book Demo →</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <BookDemoSection/>
    </div>
  );
}
