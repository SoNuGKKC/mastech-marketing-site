import { Link, NavLink } from "react-router-dom";

function TrishulSeal({ className = "" }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 56 80" fill="none" aria-hidden className={className}>
      <defs>
        <linearGradient id="tgH" x1="10" y1="2" x2="46" y2="78" gradientUnits="userSpaceOnUse">
          <stop stopColor="#fff8e7"/>
          <stop offset="0.35" stopColor="#D4A843"/>
          <stop offset="1" stopColor="#7a5a10"/>
        </linearGradient>
        <filter id="tgGH" x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur stdDeviation="1.2" result="blur"/>
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>
      <g stroke="url(#tgH)" strokeWidth="2.85" strokeLinecap="round" strokeLinejoin="round" filter="url(#tgGH)">
        <path d="M28 74V30"/><path d="M28 30V9"/>
        <path d="M28 22 11 7"/><path d="M28 22 45 7"/>
        <path d="M18 34h20"/>
      </g>
    </svg>
  );
}

const navLink = "text-sm text-white/50 hover:text-white transition-colors px-3 py-2 rounded-lg hover:bg-white/5";
const activeLink = "text-white bg-white/[0.08]";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-[#07080f]/90 backdrop-blur-[12px]">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-3">

        {/* Brand */}
        <Link to="/" className="flex items-center gap-3 shrink-0">
          <span style={{ filter: "drop-shadow(0 0 8px rgba(212,168,67,0.6))" }}>
            <TrishulSeal className="h-[44px] w-auto" />
          </span>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold tracking-[0.14em] text-[#D4A843] text-[15px]" style={{ fontFamily: '"Cinzel", serif' }}>GURJAR</span>
              <span className="h-3 w-px bg-white/20"/>
              <span className="text-[12px] font-semibold tracking-[0.12em] text-white/80" style={{ fontFamily: '"Cinzel", serif' }}>MAS TECH</span>
            </div>
            <div className="text-[9px] tracking-[0.14em] text-white/40 mt-0.5" style={{ fontFamily: '"Cinzel", serif' }}>YOU ASK. WE AUTOMATE.</div>
          </div>
        </Link>

        {/* Nav */}
        <nav className="hidden md:flex items-center gap-1">
          <NavLink to="/solutions" className={({ isActive }) => `${navLink} ${isActive ? activeLink : ""}`}>Solutions</NavLink>
          <NavLink to="/about" className={({ isActive }) => `${navLink} ${isActive ? activeLink : ""}`}>About</NavLink>
          <NavLink to="/contact" className={({ isActive }) => `${navLink} ${isActive ? activeLink : ""}`}>Contact</NavLink>
        </nav>

        {/* CTA */}
        <a
          href="#book-demo"
          className="shrink-0 rounded-lg bg-[#D4A843] px-4 py-2 text-[11px] font-bold uppercase tracking-[0.1em] text-[#07080f] hover:brightness-110 transition-all"
          style={{ fontFamily: '"Cinzel", serif' }}
        >
          Book Demo
        </a>
      </div>
    </header>
  );
}
