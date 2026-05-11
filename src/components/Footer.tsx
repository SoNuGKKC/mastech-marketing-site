import type { CSSProperties } from "react";
import { Link } from "react-router-dom";
import TrustBadge from "./TrustBadge";
import { MAS_TECH_OFFICIAL_WEBSITE } from "../config/canonicalLinks";

function TrishulSeal({ w = 28, h = 40, style = {} }: { w?: number; h?: number; style?: CSSProperties }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={w} height={h} viewBox="0 0 56 80" fill="none" aria-hidden style={style}>
      <defs>
        <linearGradient id="tgFoot" x1="10" y1="2" x2="46" y2="78" gradientUnits="userSpaceOnUse">
          <stop stopColor="#fff8e7"/><stop offset="0.32" stopColor="#e6c66a"/>
          <stop offset="0.65" stopColor="#c9a227"/><stop offset="1" stopColor="#4a3d12"/>
        </linearGradient>
        <filter id="tgGFoot" x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur stdDeviation="1.35" result="blur"/>
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>
      <g stroke="url(#tgFoot)" strokeWidth="2.85" strokeLinecap="round" strokeLinejoin="round" filter="url(#tgGFoot)">
        <path d="M28 74V30"/><path d="M28 30V9"/>
        <path d="M28 22 11 7"/><path d="M28 22 45 7"/>
        <path d="M18 34h20"/>
      </g>
    </svg>
  );
}

export default function Footer() {
  const whatsappHref = String(import.meta.env.VITE_WHATSAPP_LINK || "").trim() || "https://wa.me/?text=" + encodeURIComponent("Hi MAS TECH, I want a demo. Please share details.");
  const calendlyUrl = String(import.meta.env.VITE_CALENDLY_URL || "").trim() || "https://calendly.com/";
  const email = String(import.meta.env.VITE_PUBLIC_CONTACT_EMAIL || "").trim();

  return (
    <footer className="mt-20 border-t border-[#ffd700]/10 bg-black/40">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-10 lg:grid-cols-3">
          <div>
            <div className="text-lg font-black text-white" style={{ fontFamily:'"Cinzel",serif' }}>MAS TECH</div>
            <p className="mt-2 max-w-sm text-sm text-mas-muted">AI software for Hospital OS, Retail POS, School ERP, and Custom AI. Built in Ahmedabad, focused on Gujarat.</p>
            <div className="mt-4"><TrustBadge /></div>
            <p className="mt-4">
              <a href={MAS_TECH_OFFICIAL_WEBSITE} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 rounded-lg border border-[#e6c66a]/35 bg-[#e6c66a]/10 px-3 py-2 text-sm font-bold tracking-wide text-[#f0d78c] transition hover:border-[#e6c66a]/60 hover:text-[#fff8e1]">
                Official website — MAS TECH <span aria-hidden className="text-xs opacity-80">↗</span>
              </a>
            </p>
          </div>
          <div className="text-sm">
            <div className="font-bold text-white">Quick links</div>
            <ul className="mt-3 space-y-2 text-mas-muted">
              <li><a href="/#services" className="hover:text-mas-primary">Services</a></li>
              <li><a href="/#trust" className="hover:text-mas-primary">Trust</a></li>
              <li><a href="/#pricing" className="hover:text-mas-primary">Pricing</a></li>
              <li><Link to="/contact" className="hover:text-mas-primary">Contact</Link></li>
            </ul>
            <div className="mt-6 font-bold text-white">Social</div>
            <div className="mt-3 flex flex-wrap gap-2">
              <a href={String(import.meta.env.VITE_LINKEDIN_URL||"").trim()||"#"} target="_blank" rel="noopener noreferrer" className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 font-bold text-white/80 hover:bg-white/10">LinkedIn</a>
              <a href={String(import.meta.env.VITE_INSTAGRAM_URL||"").trim()||"#"} target="_blank" rel="noopener noreferrer" className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 font-bold text-white/80 hover:bg-white/10">Instagram</a>
            </div>
          </div>
          <div className="text-sm">
            <div className="font-bold text-white">Ahmedabad, Gujarat</div>
            <p className="mt-3 text-mas-muted">Local team. Fast support. On-site onboarding if needed.</p>
            <div className="mt-4 flex flex-wrap gap-2">
              <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="rounded-xl bg-emerald-500 px-4 py-2 font-black uppercase tracking-wider text-emerald-950 hover:brightness-110">WhatsApp</a>
              <a href={calendlyUrl} target="_blank" rel="noopener noreferrer" className="rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 px-4 py-2 font-black uppercase tracking-wider text-mas-bg hover:brightness-110">Calendly</a>
              {email && <a href={`mailto:${email}`} className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 font-bold text-white/80 hover:bg-white/10">Email</a>}
            </div>
            <div className="mt-5 overflow-hidden rounded-2xl border border-white/10 bg-black/30">
              <iframe title="MAS TECH location" src="https://www.google.com/maps?q=Ahmedabad%2C%20Gujarat&output=embed" loading="lazy" className="h-44 w-full" referrerPolicy="no-referrer-when-downgrade"/>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center gap-3">
          <div className="inline-flex max-w-full flex-wrap items-center justify-center gap-3 rounded-full border border-[#ffd700]/45 px-5 py-3" style={{ background:"linear-gradient(165deg,rgba(255,215,0,0.12) 0%,rgba(40,32,8,0.35) 45%,rgba(8,10,20,0.85) 100%)", boxShadow:"0 0 28px rgba(255,215,0,0.12)" }}>
            <TrishulSeal style={{ filter:"drop-shadow(0 0 6px rgba(255,215,0,0.65)) drop-shadow(0 0 14px rgba(255,200,60,0.35))" }}/>
            <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-white/90">Powered by</span>
            <a href={MAS_TECH_OFFICIAL_WEBSITE} target="_blank" rel="noopener noreferrer" className="text-xs font-black uppercase tracking-[0.2em] text-[#ffd700] no-underline transition hover:text-[#fff2a0]" style={{ textShadow:"0 0 12px rgba(255,215,0,0.55)" }}>MAS TECH</a>
          </div>
          <p className="text-center text-sm text-mas-muted">
            © 2026 MAS TECH Automation —{" "}
            <span className="text-white/90">A </span>
            <span className="font-playfair text-base font-semibold tracking-wide text-[#ffd700] drop-shadow-[0_0_18px_rgba(255,215,0,0.35)]">GURJAR</span>
            <span className="text-white/90"> Enterprise.</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
