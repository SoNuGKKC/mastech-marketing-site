import { Link } from "react-router-dom";
import { MAS_TECH_OFFICIAL_WEBSITE } from "../config/canonicalLinks";

export default function Footer() {
  const whatsappHref = String(import.meta.env.VITE_WHATSAPP_LINK || "").trim() || "https://wa.me/?text=" + encodeURIComponent("Hi MAS TECH, I want a demo. Please share details.");
  const calendlyUrl = String(import.meta.env.VITE_CALENDLY_URL || "").trim() || "https://calendly.com/";
  const email = String(import.meta.env.VITE_PUBLIC_CONTACT_EMAIL || "").trim();

  return (
    <footer className="mt-20 border-t border-white/[0.06] bg-[#07080f]">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-10 lg:grid-cols-3">
          <div>
            <div className="text-lg font-black text-white" style={{ fontFamily:'"Cinzel",serif' }}>MAS TECH</div>
            <p className="mt-2 max-w-sm text-sm text-white/50">AI software for Hospital OS, Retail POS, School ERP, and Custom AI. Built in Ahmedabad, focused on Gujarat.</p>
            <p className="mt-4">
              <a href={MAS_TECH_OFFICIAL_WEBSITE} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 rounded-lg border border-[#e6c66a]/35 bg-[#e6c66a]/10 px-3 py-2 text-sm font-bold tracking-wide text-[#f0d78c] transition hover:border-[#e6c66a]/60 hover:text-[#fff8e1]">
                Official website — MAS TECH <span aria-hidden className="text-xs opacity-80">↗</span>
              </a>
            </p>
          </div>
          <div className="text-sm">
            <div className="font-bold text-white">Quick links</div>
            <ul className="mt-3 space-y-2 text-white/50">
              <li><a href="/#services" className="hover:text-[#D4A843] transition-colors">Services</a></li>
              <li><a href="/#trust" className="hover:text-[#D4A843] transition-colors">Trust</a></li>
              <li><a href="/#pricing" className="hover:text-[#D4A843] transition-colors">Pricing</a></li>
              <li><Link to="/contact" className="hover:text-[#D4A843] transition-colors">Contact</Link></li>
            </ul>
            <div className="mt-6 font-bold text-white">Social</div>
            <div className="mt-3 flex flex-wrap gap-2">
              <a href={String(import.meta.env.VITE_LINKEDIN_URL||"").trim()||"#"} target="_blank" rel="noopener noreferrer" className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 font-bold text-white/80 hover:bg-white/10">LinkedIn</a>
              <a href={String(import.meta.env.VITE_INSTAGRAM_URL||"").trim()||"#"} target="_blank" rel="noopener noreferrer" className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 font-bold text-white/80 hover:bg-white/10">Instagram</a>
            </div>
          </div>
          <div className="text-sm">
            <div className="font-bold text-white">Ahmedabad, Gujarat</div>
            <p className="mt-3 text-white/50">Local team. Fast support. On-site onboarding if needed.</p>
            <div className="mt-4 flex flex-wrap gap-2">
              <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="rounded-xl bg-emerald-500 px-4 py-2 font-black uppercase tracking-wider text-emerald-950 hover:brightness-110">WhatsApp</a>
              <a href={calendlyUrl} target="_blank" rel="noopener noreferrer" className="rounded-xl bg-[#D4A843] px-4 py-2 font-black uppercase tracking-wider text-[#07080f] hover:brightness-110">Calendly</a>
              {email && <a href={`mailto:${email}`} className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 font-bold text-white/80 hover:bg-white/10">Email</a>}
            </div>
            <div className="mt-5 overflow-hidden rounded-2xl border border-white/10 bg-black/30">
              <iframe title="MAS TECH location" src="https://www.google.com/maps?q=Ahmedabad%2C%20Gujarat&output=embed" loading="lazy" className="h-44 w-full" referrerPolicy="no-referrer-when-downgrade"/>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center gap-3">
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-white/50" style={{ fontFamily: '"Cinzel",serif' }}>
            GURJAR · MAS TECH SOLUTION
          </p>
          <p className="text-center text-sm text-white/40">
            © 2026 MAS TECH Automation — A{" "}
            <span className="font-semibold text-[#D4A843]">GURJAR</span> Enterprise.
          </p>
        </div>
      </div>
    </footer>
  );
}
