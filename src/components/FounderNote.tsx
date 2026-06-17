import { useState } from "react";

function TrishulMark({ w = 20, h = 28, op = 1, uid = "fn" }: { w?: number; h?: number; op?: number; uid?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={w} height={h} viewBox="0 0 56 80" fill="none" aria-hidden opacity={op}>
      <defs>
        <linearGradient id={`tg${uid}`} x1="10" y1="2" x2="46" y2="78" gradientUnits="userSpaceOnUse">
          <stop stopColor="#fff8e7"/><stop offset="0.32" stopColor="#e6c66a"/>
          <stop offset="0.65" stopColor="#c9a227"/><stop offset="1" stopColor="#4a3d12"/>
        </linearGradient>
        <filter id={`tgG${uid}`} x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur stdDeviation="1.35" result="blur"/>
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>
      <g stroke={`url(#tg${uid})`} strokeWidth="2.85" strokeLinecap="round" strokeLinejoin="round" filter={`url(#tgG${uid})`}>
        <path d="M28 74V30"/><path d="M28 30V9"/>
        <path d="M28 22 11 7"/><path d="M28 22 45 7"/>
        <path d="M18 34h20"/>
      </g>
    </svg>
  );
}

export default function FounderNote() {
  const [sonuErr, setSonuErr] = useState(false);
  const [manthanErr, setManthanErr] = useState(false);

  return (
    <section id="founders-note" className="border-y border-[#ffd700]/20 bg-gradient-to-b from-black/60 to-mas-card/40 py-16 md:py-20" aria-labelledby="fn-heading">
      <div className="mx-auto max-w-6xl px-4">
        <p className="text-center text-[11px] font-mono font-bold uppercase tracking-[0.35em] text-[#ffd700] drop-shadow-[0_0_12px_rgba(255,215,0,0.35)]">Founder's Note</p>

        <div className="mt-10 grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
          {/* Portraits */}
          <div className="mx-auto w-full max-w-lg lg:col-span-5 lg:mx-0">
            <div className="relative flex flex-col gap-3 rounded-2xl bg-black/20 p-3 sm:flex-row" style={{ boxShadow:"0 0 0 1px rgba(255,215,0,0.25),0 0 32px rgba(255,215,0,0.12),0 24px 60px rgba(0,0,0,0.55)" }}>
              <div className="pointer-events-none absolute bottom-2 right-2 z-10 opacity-[0.12]">
                <TrishulMark w={48} h={68} uid="port"/>
              </div>
              {/* Sonu */}
              <div className="relative flex-1 overflow-hidden rounded-xl border border-[#ffd700]/35" style={{ aspectRatio:"3/4" }}>
                {!sonuErr ? (
                  <img src="/branding/gurjar-sonu.jpeg" alt="Gurjar Sonu, Founder MAS TECH" className="h-full w-full object-cover object-center" onError={() => setSonuErr(true)}/>
                ) : (
                  <div className="flex h-full items-center justify-center bg-mas-card p-4 text-center text-xs text-mas-muted">Add photo:<br/><code className="text-[#ffd700]">public/branding/gurjar-sonu.jpeg</code></div>
                )}
                <p className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/85 to-transparent px-2 py-2 text-center text-[10px] font-bold uppercase tracking-wider text-[#ffd700]/95">Sonu Gurjar</p>
              </div>
              {/* Manthan */}
              <div className="relative flex-1 overflow-hidden rounded-xl border border-[#ffd700]/35" style={{ aspectRatio:"3/4" }}>
                {!manthanErr ? (
                  <img src="/branding/manthan-gurjar.jpeg" alt="Manthan Gurjar" className="h-full w-full object-cover object-center" onError={() => setManthanErr(true)}/>
                ) : (
                  <div className="flex h-full items-center justify-center bg-mas-card p-4 text-center text-xs text-mas-muted">Add photo:<br/><code className="text-[#ffd700]">public/branding/manthan-gurjar.jpeg</code></div>
                )}
                <p className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/85 to-transparent px-2 py-2 text-center text-[10px] font-bold uppercase tracking-wider text-[#ffd700]/95">Manthan Gurjar</p>
              </div>
              <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-[#ffd700]/20" aria-hidden/>
            </div>
          </div>

          {/* Text */}
          <div className="lg:col-span-7">
            <h2 id="fn-heading" className="text-3xl font-black tracking-tight md:text-4xl lg:text-[2.75rem]">
              <span className="bg-gradient-to-b from-[#fffef0] via-[#ffd700] to-[#b8860b] bg-clip-text text-transparent" style={{ WebkitTextFillColor:"transparent", filter:"drop-shadow(0 0 14px rgba(255,215,0,0.45))" }}>Sonu{" "}</span>
              <span className="font-playfair bg-gradient-to-b from-[#fffef0] via-[#ffd700] to-[#b8860b] bg-clip-text text-transparent tracking-[0.04em]" style={{ WebkitTextFillColor:"transparent", filter:"drop-shadow(0 0 16px rgba(255,215,0,0.5))" }}>GURJAR</span>
            </h2>
            <p className="mt-2 text-sm font-bold text-mas-muted">Founder, MAS TECH Automation · 13+ Years Distribution Ground Truth</p>

            <blockquote className="mt-7 border-l-2 border-[#ffd700]/55 pl-6">
              <p className="font-playfair text-xl italic leading-relaxed text-white/88 md:text-2xl">"Building a legacy of automation rooted in the strength and trust of the Gurjar heritage."</p>
            </blockquote>

            <p className="mt-7 max-w-2xl text-sm leading-relaxed text-mas-muted md:text-base">
              This company is built on the same principles we bring to every deployment: <strong className="text-white/90">discipline, transparency, and long-term trust</strong> — not quick hacks. When you work with MAS TECH, you work with a team that treats your operations as seriously as family honour treats its word.
            </p>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-mas-muted md:text-base">
              13 years on the Samsung distribution field. 300+ retailer relationships. Real India, real problems, real solutions — not imported SaaS templates. This is why our software doesn't just work. It <em className="text-[#ffd700]">fits</em>.
            </p>

            <div className="mt-7 inline-flex items-center gap-3 rounded-xl border border-[#ffd700]/18 bg-[#ffd700]/6 px-5 py-3">
              <TrishulMark w={16} h={22} uid="seal"/>
              <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#ffd700]/85" style={{ fontFamily:'"Cinzel",serif' }}>A GURJAR ENTERPRISE · EST. 2024</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
