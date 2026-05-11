import { useState, useMemo } from "react";

const SRC_SONU = "/branding/sonu_manthan.jpg";
const FALLBACK_SONU = "/branding/sonu.jpeg";
const SRC_MANTHAN = "/branding/manthan-gurjar.jpeg";

function buildSonuCandidates(): string[] {
  const out: string[] = [SRC_SONU];
  const fromEnv = import.meta.env.VITE_FOUNDER_PHOTO_URL;
  if (typeof fromEnv === "string") {
    const t = fromEnv.trim();
    if (t.length > 4 && /^https?:\/\//.test(t)) out.unshift(t);
  }
  if (!out.includes(FALLBACK_SONU)) out.push(FALLBACK_SONU);
  return out;
}

/* ── Exact Trishul SVG (from mas-trishul-seal.svg) ── */
function TrishulWatermark() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={56}
      height={80}
      viewBox="0 0 56 80"
      fill="none"
      aria-hidden
      className="pointer-events-none absolute bottom-2 right-2 z-10 h-16 w-auto opacity-[0.14] sm:h-20"
    >
      <defs>
        <linearGradient
          id="masTrishulGoldFounder"
          x1="10" y1="2" x2="46" y2="78"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#fff8e7" />
          <stop offset="0.32" stopColor="#e6c66a" />
          <stop offset="0.65" stopColor="#c9a227" />
          <stop offset="1" stopColor="#4a3d12" />
        </linearGradient>
        <filter id="masTrishulGlowFounder" x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur stdDeviation="1.35" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <g
        stroke="url(#masTrishulGoldFounder)"
        strokeWidth="2.85"
        strokeLinecap="round"
        strokeLinejoin="round"
        filter="url(#masTrishulGlowFounder)"
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

/* ── Gold portrait frame ── */
const goldFrame =
  "relative rounded-2xl p-[1px] shadow-[0_0_0_1px_rgba(255,215,0,0.25),0_0_32px_rgba(255,215,0,0.18),0_24px_60px_rgba(0,0,0,0.55)]";
const innerFrame =
  "relative aspect-[3/4] overflow-hidden rounded-2xl border border-[#ffd700]/40 bg-mas-bg shadow-[inset_0_0_0_1px_rgba(255,215,0,0.12)]";

export default function FounderNote() {
  const sonuCandidates = useMemo(() => buildSonuCandidates(), []);
  const [sonuIdx, setSonuIdx] = useState(0);
  const [sonuExhausted, setSonuExhausted] = useState(false);
  const [manthanExhausted, setManthanExhausted] = useState(false);

  const sonuSrc = sonuCandidates[sonuIdx] || FALLBACK_SONU;
  const onSonuErr = () => {
    if (sonuIdx + 1 < sonuCandidates.length) setSonuIdx((i) => i + 1);
    else setSonuExhausted(true);
  };

  return (
    <section
      id="founders-note"
      className="border-y border-[#ffd700]/25 bg-gradient-to-b from-black/60 to-mas-card/50 py-16 md:py-20"
      aria-labelledby="founders-note-heading"
    >
      <div className="mx-auto max-w-6xl px-4">
        <p className="text-center text-[11px] font-mono font-bold uppercase tracking-[0.35em] text-[#ffd700] drop-shadow-[0_0_12px_rgba(255,215,0,0.35)]">
          Founder&apos;s Note
        </p>

        <div className="mt-10 grid items-center gap-10 lg:grid-cols-12 lg:gap-12">

          {/* ── Portrait pair ── */}
          <div className="mx-auto w-full max-w-lg lg:col-span-5 lg:mx-0 lg:max-w-none">
            <div
              className={goldFrame}
              style={{
                filter:
                  "drop-shadow(0 0 10px rgba(255,215,0,0.5)) drop-shadow(0 0 24px rgba(255,200,60,0.28)) drop-shadow(0 0 40px rgba(201,162,39,0.15))",
              }}
            >
              <div className="relative flex flex-col gap-4 rounded-2xl bg-black/20 p-3 sm:flex-row sm:gap-3">
                {/* Trishul watermark inside frame */}
                <TrishulWatermark />

                {/* Sonu portrait */}
                <div className={`${innerFrame} flex-1`}>
                  {!sonuExhausted ? (
                    <img
                      key={sonuSrc}
                      src={sonuSrc}
                      alt="Gurjar Sonu, Founder & Architect, MAS TECH Automation"
                      className="h-full w-full object-cover object-center"
                      onError={onSonuErr}
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center bg-mas-card px-2 text-center text-xs text-mas-muted">
                      Add{" "}
                      <code className="text-[#ffd700]">
                        public/branding/sonu_manthan.jpg
                      </code>
                    </div>
                  )}
                  <p className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/85 to-transparent px-2 py-2 text-center text-[10px] font-bold uppercase tracking-wider text-[#ffd700]/95">
                    Sonu Gurjar
                  </p>
                </div>

                {/* Manthan portrait */}
                <div className={`${innerFrame} flex-1`}>
                  {!manthanExhausted ? (
                    <img
                      src={SRC_MANTHAN}
                      alt="Manthan Gurjar, MAS TECH"
                      className="h-full w-full object-cover object-center"
                      onError={() => setManthanExhausted(true)}
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center bg-mas-card px-2 text-center text-xs text-mas-muted">
                      Add{" "}
                      <code className="text-[#ffd700]">
                        public/branding/manthan-gurjar.jpeg
                      </code>
                    </div>
                  )}
                  <p className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/85 to-transparent px-2 py-2 text-center text-[10px] font-bold uppercase tracking-wider text-[#ffd700]/95">
                    Manthan Gurjar
                  </p>
                </div>

                {/* Ring overlay */}
                <div
                  className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-[#ffd700]/25"
                  aria-hidden
                />
              </div>
            </div>
          </div>

          {/* ── Text ── */}
          <div className="lg:col-span-7">
            {/* Name — gold Playfair */}
            <h2
              id="founders-note-heading"
              className="text-3xl font-black tracking-tight md:text-4xl lg:text-[2.75rem] lg:leading-tight"
            >
              <span
                className="bg-gradient-to-b from-[#fffef0] via-[#ffd700] to-[#b8860b] bg-clip-text font-black text-transparent drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)]"
                style={{
                  WebkitTextFillColor: "transparent",
                  filter:
                    "drop-shadow(0 0 14px rgba(255,215,0,0.45)) drop-shadow(0 0 28px rgba(255,200,80,0.25))",
                }}
              >
                Sonu{" "}
              </span>
              <span
                className="font-playfair bg-gradient-to-b from-[#fffef0] via-[#ffd700] to-[#b8860b] bg-clip-text font-black tracking-[0.04em] text-transparent"
                style={{
                  WebkitTextFillColor: "transparent",
                  filter:
                    "drop-shadow(0 0 16px rgba(255,215,0,0.5)) drop-shadow(0 0 32px rgba(255,200,80,0.28))",
                }}
              >
                GURJAR
              </span>
            </h2>

            <p className="mt-2 text-sm font-bold text-mas-muted md:text-base">
              Founder, MAS TECH Automation
            </p>

            {/* Quote */}
            <blockquote className="mt-8 border-l-2 border-[#ffd700]/60 pl-6 md:pl-8">
              <p className="font-playfair text-xl italic leading-relaxed text-white/90 md:text-2xl md:leading-snug">
                &ldquo;Building a legacy of automation rooted in the strength and trust of the
                Gurjar heritage.&rdquo;
              </p>
            </blockquote>

            <p className="mt-8 max-w-2xl text-sm leading-relaxed text-mas-muted md:text-base">
              This company is built on the same principles we bring to every deployment:{" "}
              <strong className="text-white/90">discipline, transparency, and long-term trust</strong>{" "}
              — not quick hacks. When you work with MAS TECH, you work with a team that treats your
              operations as seriously as family honour treats its word.
            </p>

            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-mas-muted md:text-base">
              13 years on the Samsung distribution field. 300+ retailer relationships. Real India,
              real problems, real solutions — not imported SaaS templates. This is why our software
              doesn&apos;t just work. It{" "}
              <em className="text-[#ffd700]">fits</em>.
            </p>

            {/* Gurjar seal badge */}
            <div className="mt-7 inline-flex items-center gap-3 rounded-xl border border-[#ffd700]/18 bg-[#ffd700]/6 px-5 py-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={18}
                height={26}
                viewBox="0 0 56 80"
                fill="none"
                aria-hidden
              >
                <defs>
                  <linearGradient id="masTrishulGoldSeal" x1="10" y1="2" x2="46" y2="78" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#fff8e7" />
                    <stop offset="0.32" stopColor="#e6c66a" />
                    <stop offset="0.65" stopColor="#c9a227" />
                    <stop offset="1" stopColor="#4a3d12" />
                  </linearGradient>
                  <filter id="masTrishulGlowSeal" x="-80%" y="-80%" width="260%" height="260%">
                    <feGaussianBlur stdDeviation="1.35" result="blur" />
                    <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                  </filter>
                </defs>
                <g stroke="url(#masTrishulGoldSeal)" strokeWidth="2.85" strokeLinecap="round" strokeLinejoin="round" filter="url(#masTrishulGlowSeal)">
                  <path d="M28 74V30" /><path d="M28 30V9" />
                  <path d="M28 22 11 7" /><path d="M28 22 45 7" />
                  <path d="M18 34h20" />
                </g>
              </svg>
              <span
                className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#ffd700]/85"
                style={{ fontFamily: '"Cinzel", serif' }}
              >
                A GURJAR ENTERPRISE · EST. 2024
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
