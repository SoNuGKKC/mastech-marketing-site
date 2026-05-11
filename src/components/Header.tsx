import { Link, NavLink } from "react-router-dom";
import TrustBadge from "./TrustBadge";

const navCls = "rounded-lg px-3 py-2 text-sm font-semibold text-mas-muted transition hover:text-white";
const activeCls = "bg-white/10 text-white";

/* ── Exact Trishul SVG (from mas-trishul-seal.svg) ── */
function TrishulSeal({ className = "" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 56 80"
      fill="none"
      aria-hidden
      className={className}
    >
      <defs>
        <linearGradient
          id="masTrishulGoldHeader"
          x1="10" y1="2" x2="46" y2="78"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#fff8e7" />
          <stop offset="0.32" stopColor="#e6c66a" />
          <stop offset="0.65" stopColor="#c9a227" />
          <stop offset="1" stopColor="#4a3d12" />
        </linearGradient>
        <filter id="masTrishulGlowHeader" x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur stdDeviation="1.35" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <g
        stroke="url(#masTrishulGoldHeader)"
        strokeWidth="2.85"
        strokeLinecap="round"
        strokeLinejoin="round"
        filter="url(#masTrishulGlowHeader)"
      >
        <path d="M28 74V30" />
        <path d="M28 30V9" />
        <path d="M28 22 11 7" />
        <path d="M28 22 45 7" />
        <path d="M18 34h20" />
      </g>
    </svg>
  );
}

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-[#ffd700]/8 bg-mas-bg/55 backdrop-blur-[10px] supports-[backdrop-filter]:bg-mas-bg/40">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-3">

        {/* ── Logo ── */}
        <Link
          to="/"
          className="flex min-w-0 items-center gap-3 rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/55 focus-visible:ring-offset-2 focus-visible:ring-offset-mas-bg"
        >
          <span
            className="relative shrink-0"
            style={{
              filter:
                "drop-shadow(0 0 8px rgba(255,215,0,0.75)) drop-shadow(0 0 20px rgba(255,200,60,0.45)) drop-shadow(0 0 36px rgba(201,162,39,0.25))",
            }}
            aria-hidden
          >
            <TrishulSeal className="h-[52px] w-auto sm:h-[60px]" />
          </span>

          <div className="min-w-0 text-left">
            <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
              {/* GURJAR — gold Playfair */}
              <span
                className="bg-gradient-to-b from-[#fff9ed] via-[#ecd9a8] to-[#a88b2e] bg-clip-text text-[1.35rem] font-bold leading-none tracking-[0.14em] text-transparent drop-shadow-[0_0_14px_rgba(230,198,106,0.35)] sm:text-[1.55rem]"
                style={{ fontFamily: '"Cormorant Garamond", "Cinzel", serif' }}
              >
                GURJAR
              </span>
              {/* divider line */}
              <span
                className="hidden h-[1.1em] w-px bg-gradient-to-b from-transparent via-amber-300/90 to-transparent sm:inline-block"
                aria-hidden
              />
              {/* MAS TECH — Cinzel */}
              <span
                className="text-xs font-semibold tracking-[0.2em] text-white/95 sm:text-sm"
                style={{ fontFamily: '"Cinzel", serif' }}
              >
                MAS TECH
              </span>
            </div>
            <div
              className="mt-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-white/75"
              style={{ fontFamily: '"Cinzel", serif' }}
            >
              You ASK. We AUTOMATE.
            </div>
          </div>
        </Link>

        {/* ── Nav links ── */}
        <nav className="flex flex-wrap items-center gap-1">
          <NavLink to="/" end className={({ isActive }) => `${navCls} ${isActive ? activeCls : ""}`}>
            Home
          </NavLink>
          <NavLink to="/solutions" className={({ isActive }) => `${navCls} ${isActive ? activeCls : ""}`}>
            Solutions
          </NavLink>
          <NavLink to="/about" className={({ isActive }) => `${navCls} ${isActive ? activeCls : ""}`}>
            About
          </NavLink>
          <Link to="/#founders-note" className={navCls}>
            Founder
          </Link>
          <NavLink to="/contact" className={({ isActive }) => `${navCls} ${isActive ? activeCls : ""}`}>
            Contact
          </NavLink>
          <NavLink to="/login" className={({ isActive }) => `${navCls} ${isActive ? activeCls : ""}`}>
            Portal
          </NavLink>
        </nav>

        <div className="hidden sm:block">
          <TrustBadge />
        </div>
      </div>

      {/* Mobile trust badge */}
      <div className="border-t border-white/5 px-4 py-2 sm:hidden">
        <TrustBadge />
      </div>
    </header>
  );
}
