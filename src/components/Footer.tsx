import { Link } from "react-router-dom";
import TrustBadge from "./TrustBadge";
import { MAS_TECH_OFFICIAL_WEBSITE } from "../config/canonicalLinks";

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-white/10 bg-black/40">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div>
            <div className="text-lg font-black text-white">MAS TECH Solution</div>
            <p className="mt-2 max-w-sm text-sm text-mas-muted">
              Automation engineering for distributors, factories, and field teams. No fluff — measurable outcomes.
            </p>
            <div className="mt-4">
              <TrustBadge />
            </div>
            <p className="mt-4">
              <a
                href={MAS_TECH_OFFICIAL_WEBSITE}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 rounded-lg border border-[#e6c66a]/35 bg-[#e6c66a]/10 px-3 py-2 text-sm font-bold tracking-wide text-[#f0d78c] shadow-[0_0_24px_rgba(230,198,106,0.15)] transition hover:border-[#e6c66a]/60 hover:bg-[#e6c66a]/18 hover:text-[#fff8e1]"
              >
                Official website — MAS TECH
                <span aria-hidden className="text-xs opacity-80">
                  ↗
                </span>
              </a>
            </p>
          </div>
          <div className="flex flex-wrap gap-8 text-sm">
            <div>
              <div className="font-bold text-white">Explore</div>
              <ul className="mt-2 space-y-2 text-mas-muted">
                <li>
                  <Link to="/solutions" className="hover:text-mas-primary">
                    Solutions
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="hover:text-mas-primary">
                    About
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="hover:text-mas-primary">
                    Contact / Demo
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <div className="font-bold text-white">Legal</div>
              <p className="mt-2 max-w-xs text-mas-muted">
                This marketing site is isolated from client operational systems. No sheet IDs or API keys ship in the bundle.
              </p>
            </div>
          </div>
        </div>
        <div className="mt-10 flex flex-col items-center justify-center gap-3">
          <div
            className="inline-flex max-w-full flex-wrap items-center justify-center gap-3 rounded-full border border-[#ffd700]/45 px-5 py-3 shadow-[0_0_28px_rgba(255,215,0,0.12),inset_0_1px_0_rgba(255,248,220,0.12)]"
            style={{
              background:
                "linear-gradient(165deg, rgba(255,215,0,0.12) 0%, rgba(40,32,8,0.35) 45%, rgba(8,10,20,0.85) 100%)",
            }}
          >
            <img
              src="/branding/mas-trishul-seal.svg"
              alt=""
              className="h-7 w-auto shrink-0 sm:h-8"
              width={28}
              height={40}
              style={{
                filter:
                  "drop-shadow(0 0 6px rgba(255,215,0,0.65)) drop-shadow(0 0 14px rgba(255,200,60,0.35))",
              }}
              aria-hidden
            />
            <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-white/90">Powered by</span>
            <a
              href={MAS_TECH_OFFICIAL_WEBSITE}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-black uppercase tracking-[0.2em] text-[#ffd700] no-underline transition hover:text-[#fff2a0]"
              style={{
                textShadow: "0 0 12px rgba(255,215,0,0.55), 0 0 24px rgba(255,200,80,0.3)",
              }}
            >
              MAS TECH
            </a>
          </div>
          <p className="text-center text-sm text-mas-muted">
            © 2026 MAS TECH Automation —{" "}
            <span className="text-white/90">A </span>
            <span className="font-playfair text-base font-semibold tracking-wide text-[#ffd700] drop-shadow-[0_0_18px_rgba(255,215,0,0.35)]">
              GURJAR
            </span>
            <span className="text-white/90"> Enterprise.</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
