import { Link, NavLink } from "react-router-dom";
import TrustBadge from "./TrustBadge";

const nav = "rounded-lg px-3 py-2 text-sm font-semibold text-mas-muted transition hover:text-white";
const active = "bg-white/10 text-white";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-mas-bg/55 backdrop-blur-[10px] supports-[backdrop-filter]:bg-mas-bg/40">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-4">
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
            <img
              src="/branding/mas-trishul-seal.svg"
              alt=""
              className="h-[58px] w-auto sm:h-[64px]"
              width={48}
              height={69}
            />
          </span>
          <div className="min-w-0 text-left">
            <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
              <span
                className="bg-gradient-to-b from-[#fff9ed] via-[#ecd9a8] to-[#a88b2e] bg-clip-text text-[1.35rem] font-bold leading-none tracking-[0.14em] text-transparent drop-shadow-[0_0_14px_rgba(230,198,106,0.35)] sm:text-[1.55rem]"
                style={{ fontFamily: '"Cormorant Garamond", "Cinzel", serif' }}
              >
                GURJAR
              </span>
              <span
                className="hidden h-[1.1em] w-px bg-gradient-to-b from-transparent via-amber-300/90 to-transparent sm:inline-block"
                aria-hidden
              />
              <span
                className="text-xs font-semibold tracking-[0.2em] text-white/95 sm:text-sm"
                style={{ fontFamily: '"Cinzel", serif' }}
              >
                MAS TECH
              </span>
            </div>
            <div
              className="mt-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-white/85"
              style={{ fontFamily: '"Cinzel", serif' }}
            >
              A MAS TECH INNOVATION
            </div>
          </div>
        </Link>
        <nav className="flex flex-wrap items-center gap-1">
          <NavLink to="/" end className={({ isActive }) => `${nav} ${isActive ? active : ""}`}>
            Home
          </NavLink>
          <NavLink to="/solutions" className={({ isActive }) => `${nav} ${isActive ? active : ""}`}>
            Solutions
          </NavLink>
          <NavLink to="/about" className={({ isActive }) => `${nav} ${isActive ? active : ""}`}>
            About
          </NavLink>
          <Link to="/#founders-note" className={nav}>
            Founder
          </Link>
          <NavLink to="/contact" className={({ isActive }) => `${nav} ${isActive ? active : ""}`}>
            Contact
          </NavLink>
          <NavLink to="/login" className={({ isActive }) => `${nav} ${isActive ? active : ""}`}>
            Portal
          </NavLink>
        </nav>
        <div className="hidden sm:block">
          <TrustBadge />
        </div>
      </div>
      <div className="border-t border-white/5 px-4 py-2 sm:hidden">
        <TrustBadge />
      </div>
    </header>
  );
}
